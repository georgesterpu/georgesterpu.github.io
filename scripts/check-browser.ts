import { chromium } from 'playwright';
import { mkdirSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import assert from 'node:assert/strict';

// Run against an existing local dev/preview server; this is deliberately
// separate from the small Pages build and does not require a CI browser.
const root = resolve(import.meta.dirname, '..');
const artifacts = resolve(root, '.tools/screenshots');
const temp = resolve(root, '.cache/browser-tmp');
mkdirSync(artifacts, { recursive: true });
mkdirSync(temp, { recursive: true });
process.env.TEMP = temp;
process.env.TMP = temp;
const origin = process.env.BLOG_BASE_URL ?? 'http://127.0.0.1:4321';
const browser = await chromium.launch({ headless: true });
const context = await browser.newContext({
  viewport: { width: 1440, height: 1050 },
  deviceScaleFactor: 1,
});
const page = await context.newPage();
const errors: string[] = [];
page.on('pageerror', (error) => errors.push(error.message));

async function visit(path: string) {
  const response = await page.goto(`${origin}${path}`, {
    waitUntil: 'networkidle',
  });
  assert.equal(response?.status(), 200, `HTTP status for ${path}`);
  await page.evaluate(() => document.fonts.ready);
  assert.equal(
    await page.locator('main h1').count(),
    1,
    `One page title on ${path}`,
  );
  assert.equal(
    await page.locator('main').count(),
    1,
    `One main landmark on ${path}`,
  );
  assert.ok(await page.title(), `Document title on ${path}`);
  assert.ok(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= window.innerWidth,
    ),
    `No horizontal overflow on ${path}`,
  );
}

async function loadImages() {
  const broken = await page.evaluate(async () => {
    for (const image of document.images) image.loading = 'eager';
    await Promise.all(
      [...document.images].map((image) => image.decode().catch(() => {})),
    );
    return [...document.images]
      .filter((image) => image.naturalWidth === 0)
      .map((image) => image.src);
  });
  assert.deepEqual(broken, [], 'Images load in the browser');
}

try {
  await visit('/');
  await loadImages();
  await page.screenshot({
    path: `${artifacts}/home-desktop.png`,
    fullPage: true,
  });
  await page.screenshot({ path: `${artifacts}/home-first-screen.png` });
  await page.keyboard.press('Tab');
  assert.equal(
    await page
      .locator('.skip-link')
      .evaluate((element) => element === document.activeElement),
    true,
    'Skip link is the first keyboard stop',
  );
  await page.keyboard.press('Enter');
  assert.equal(
    await page
      .locator('main')
      .evaluate((element) => element === document.activeElement),
    true,
    'Skip link focuses main',
  );

  await visit('/writing/');
  const postCount = await page.locator('[data-post]:visible').count();
  assert.ok(postCount >= 7);
  await page.getByRole('button', { name: 'running', exact: true }).click();
  assert.ok((await page.locator('[data-post]:visible').count()) >= 1);
  await page.getByRole('button', { name: 'All writing', exact: true }).click();
  await page.getByRole('searchbox').fill('Tribe of Mentors questions');
  assert.equal(await page.locator('[data-post]:visible').count(), 1);
  await page.getByRole('searchbox').fill('no-such-entry-001');
  assert.equal(await page.locator('[data-post]:visible').count(), 0);
  assert.equal(await page.locator('#no-results').isVisible(), true);
  await page.getByRole('searchbox').clear();
  await page.screenshot({
    path: `${artifacts}/writing-desktop.png`,
    fullPage: true,
  });

  await visit('/posts/reading-list-2025/');
  const bookCount = await page.locator('[data-book]').count();
  assert.ok(bookCount >= 33, 'All original 2025 books are on the shelf');
  await page.getByRole('searchbox').fill('Cagan');
  assert.ok(
    (await page.locator('[data-book]:visible').count()) >= 1,
    'Books can be found by author',
  );
  await page.getByRole('searchbox').fill('no-book-001');
  assert.equal(await page.locator('[data-book-empty]').isVisible(), true);
  await page.getByRole('searchbox').clear();
  await page.getByRole('searchbox').blur();
  await loadImages();
  await page.screenshot({ path: `${artifacts}/books-desktop.png` });
  await visit('/books/');
  await loadImages();
  await page.screenshot({ path: `${artifacts}/bookshelf-desktop.png` });
  await visit('/posts/running/');
  assert.ok(
    (await page.locator('.run-card').count()) >= 33,
    'Every original running event is preserved',
  );
  await page.locator('.run-gallery summary').first().click();
  assert.equal(
    await page.locator('.run-gallery').first().getAttribute('open'),
    '',
  );
  await loadImages();
  await page.locator('.run-gallery summary').first().click();
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
  await page.screenshot({ path: `${artifacts}/running-desktop.png` });

  const migration = JSON.parse(
    readFileSync(resolve(root, 'docs/migration.json'), 'utf8'),
  ) as { entries: { url: string }[] };
  const routes = [
    '/books/',
    '/books/notes/reading-list-2024/001-entrepreneur-revolution/',
    '/work/',
    '/work/building-automation/',
    '/work/av-align/',
    '/work/edge-speech/',
    '/about/',
    '/cv/',
    '/publications/',
    '/archives/',
    '/tags/',
    '/tags/books/',
    '/categories/books/',
    ...migration.entries.map((item) => item.url),
  ];
  for (const path of routes) await visit(path);

  await visit('/cv/');
  assert.equal(
    await page.locator('#print-cv').isVisible(),
    true,
    'Print is available with JavaScript',
  );
  await visit('/posts/ferris_questions/');
  await page.locator('.article-contents summary').click();
  const firstSection = page.locator('.article-contents a').first();
  const sectionHash = await firstSection.getAttribute('href');
  await firstSection.click();
  assert.equal(
    new URL(page.url()).hash,
    sectionHash,
    'Question navigation reaches its section',
  );

  await page.setViewportSize({ width: 390, height: 844 });
  for (const path of [
    '/',
    '/writing/',
    '/work/',
    '/work/av-align/',
    '/about/',
    '/cv/',
    '/publications/',
    '/posts/reading-list-2024/',
    '/books/',
    '/books/notes/reading-list-2024/001-entrepreneur-revolution/',
    '/posts/running/',
  ]) {
    await visit(path);
    if (path === '/') {
      await loadImages();
      await page.screenshot({
        path: `${artifacts}/home-mobile.png`,
        fullPage: true,
      });
    }
    if (path === '/posts/reading-list-2024/')
      await page.screenshot({ path: `${artifacts}/reading-mobile.png` });
    if (path === '/posts/running/')
      await page.screenshot({ path: `${artifacts}/running-mobile.png` });
    if (path === '/work/av-align/')
      await page.screenshot({
        path: `${artifacts}/av-align-mobile.png`,
        fullPage: true,
      });
  }
  await page.setViewportSize({ width: 768, height: 1024 });
  await visit('/');
  await page.screenshot({ path: `${artifacts}/home-tablet.png` });
  await page.setViewportSize({ width: 320, height: 740 });
  await visit('/');
  await visit('/writing/');
  await visit('/books/');
  await visit('/posts/reading-list-2025/');
  await visit('/books/notes/reading-list-2024/001-entrepreneur-revolution/');

  const noJs = await browser.newContext({
    javaScriptEnabled: false,
    viewport: { width: 390, height: 844 },
  });
  const staticPage = await noJs.newPage();
  await staticPage.goto(`${origin}/writing/`);
  assert.equal(
    await staticPage.locator('[data-post]').count(),
    postCount,
    'Writing works without JavaScript',
  );
  assert.equal(
    await staticPage.locator('#writing-tools').isVisible(),
    false,
    'No non-working search controls without JavaScript',
  );
  await staticPage.goto(`${origin}/posts/reading-list-2025/`);
  assert.equal(
    await staticPage.locator('[data-book]').count(),
    bookCount,
    'The bookshelf works without JavaScript',
  );
  assert.ok(
    (await staticPage.locator('main').innerText()).includes('Transformed'),
  );
  await staticPage.goto(`${origin}/cv/`);
  assert.equal(
    await staticPage.locator('#print-cv').isVisible(),
    false,
    'No non-working print button without JavaScript',
  );
  await noJs.close();
  assert.deepEqual(errors, [], 'No browser JavaScript errors');
  console.log(
    `Browser checks passed: original post routes, key pages, desktop/mobile/tablet overflow, search, filters, empty state, keyboard skip link, and no-JavaScript reading. Screenshots: .tools/screenshots/`,
  );
} finally {
  await context.close();
  await browser.close();
}
