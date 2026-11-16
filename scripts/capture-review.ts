import { mkdirSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

// Local visual review only. Keep each labelled iteration out of source control.
const root = resolve(import.meta.dirname, '..');
const args = process.argv.slice(2);
function option(name: string, fallback: string) {
  const index = args.indexOf(`--${name}`);
  if (index < 0) return fallback;
  const value = args[index + 1];
  if (!value || value.startsWith('--'))
    throw new Error(`Missing --${name} value`);
  return value;
}
const label = option('label', new Date().toISOString().replace(/[:.]/g, '-'));
if (!/^[a-zA-Z0-9_-]+$/.test(label))
  throw new Error('Use letters, numbers, hyphens or underscores for --label.');
const routes = {
  home: '/',
  writing: '/writing/',
  article: '/posts/ferris_questions/',
  work: '/work/edge-speech/',
  books: '/books/',
  'reading-list': '/posts/reading-list-2025/',
  running: '/posts/running/',
};
const devices = {
  desktop: { width: 1440, height: 900 },
  mobile: { width: 390, height: 844 },
  tablet: { width: 768, height: 1024 },
};
const pageChoice = option('page', 'all');
const deviceChoice = option('device', 'all');
if (pageChoice !== 'all' && !(pageChoice in routes))
  throw new Error(
    `Unknown page. Choose: all, ${Object.keys(routes).join(', ')}`,
  );
if (deviceChoice !== 'all' && !(deviceChoice in devices))
  throw new Error('Unknown device. Choose: all, desktop, mobile, tablet');
const origin = process.env.BLOG_BASE_URL ?? 'http://127.0.0.1:4321';
const directory = resolve(root, '.tools/redesign-review', label);
const temp = resolve(root, '.cache/browser-tmp');
mkdirSync(directory, { recursive: true });
mkdirSync(temp, { recursive: true });
process.env.TEMP = temp;
process.env.TMP = temp;
process.env.PLAYWRIGHT_BROWSERS_PATH = resolve(root, '.cache/playwright');
const { chromium } = await import('playwright');
const browser = await chromium.launch({ headless: true });
const captures: string[] = [];
try {
  for (const [device, viewport] of Object.entries(devices)) {
    if (deviceChoice !== 'all' && deviceChoice !== device) continue;
    const page = await browser.newPage({
      viewport,
      deviceScaleFactor: 1,
      reducedMotion: 'reduce',
    });
    for (const [name, path] of Object.entries(routes)) {
      if (pageChoice !== 'all' && pageChoice !== name) continue;
      if (deviceChoice === 'all' && device === 'tablet' && name !== 'home')
        continue;
      const response = await page.goto(origin + path, {
        waitUntil: 'networkidle',
      });
      if (response?.status() !== 200)
        throw new Error(`${path}: HTTP ${response?.status()}`);
      await page.evaluate(async () => {
        await document.fonts.ready;
        for (const img of document.images) img.loading = 'eager';
        await Promise.all(
          [...document.images].map((img) => img.decode().catch(() => {})),
        );
      });
      const filename = `${name}-${device}`;
      await page.screenshot({ path: `${directory}/${filename}-viewport.png` });
      await page.screenshot({
        path: `${directory}/${filename}-full.png`,
        fullPage: true,
      });
      captures.push(filename);
      console.log(`${filename}: ${viewport.width} × ${viewport.height}`);
    }
    await page.close();
  }
  writeFileSync(
    resolve(directory, 'index.html'),
    `<!doctype html><html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width"><title>Notebook visual review — ${label}</title><style>body{margin:32px;background:#faf8f2;color:#252b28;font:17px/1.6 system-ui}main{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,320px),1fr));gap:32px}img{width:100%;display:block;border:1px solid #deded3}a{color:#254c3e}h1{font-size:26px}h2{font-size:18px}</style><h1>Notebook visual review · ${label}</h1><p>Actual Chromium renders. Select a screenshot to open the full page.</p><main>${captures.map((name) => `<article><h2>${name}</h2><a href="${name}-full.png"><img src="${name}-viewport.png" alt="${name} first viewport" loading="lazy"></a><a href="${name}-viewport.png">First viewport</a> · <a href="${name}-full.png">Full page</a></article>`).join('')}</main></html>`,
  );
  console.log(`Review gallery: ${directory}/index.html`);
} finally {
  await browser.close();
}
