import { mkdirSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import profile from '../src/data/profile.json';

// An occasional local authoring step, separate from the Pages build.
// Render typography from source HTML; no server or external requests needed.
const root = resolve(import.meta.dirname, '..');
const temp = resolve(root, '.cache/browser-tmp');
mkdirSync(temp, { recursive: true });
process.env.TEMP = temp;
process.env.TMP = temp;
process.env.PLAYWRIGHT_BROWSERS_PATH = resolve(root, '.cache/playwright');
const escape = (value: string) =>
  value.replace(
    /[&<>"']/g,
    (character) =>
      ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[
        character
      ]!,
  );
const font = (family: string, style = 'normal') =>
  readFileSync(
    resolve(
      root,
      `node_modules/@fontsource-variable/${family}/files/${family}-latin-wght-${style}.woff2`,
    ),
  ).toString('base64');

// Playwright reads its browser directory when the module is first loaded.
const { chromium } = await import('playwright');
const browser = await chromium.launch({ headless: true });
try {
  const page = await browser.newPage({
    viewport: { width: 1200, height: 630 },
    deviceScaleFactor: 1,
  });
  await page.setContent(`<!doctype html><html lang="en"><meta charset="utf-8"><style>
    @font-face { font-family: Sans; font-weight: 100 1000; src: url(data:font/woff2;base64,${font('dm-sans')}); }
    @font-face { font-family: Serif; font-weight: 200 900; src: url(data:font/woff2;base64,${font('literata')}); }
    @font-face { font-family: Serif; font-weight: 200 900; font-style: italic; src: url(data:font/woff2;base64,${font('literata', 'italic')}); }
    * { box-sizing: border-box; } body { margin: 0; padding: 55px 70px; background: #faf8f2; color: #252b28; font-family: Sans; }
    header { display: flex; align-items: center; gap: 18px; padding-bottom: 22px; border-bottom: 1px solid #deded3; font-size: 24px; }
    .mark { background: #254c3e; color: #faf8f2; font: 30px Serif; padding: 2px 7px; border-radius: 3px; }
    .role { margin-top: 56px; font-size: 17px; color: #61675e; letter-spacing: 1px; }
    h1 { margin: 36px 0 0; font: 450 76px/1.28 Serif; letter-spacing: -2px; } em { color: #254c3e; }
    footer { position: absolute; bottom: 40px; width: 1060px; border-top: 1px solid #deded3; padding-top: 24px; font-size: 20px; color: #61675e; }
    footer span { display: block; color: #254c3e; font-size: 17px; margin-top: 14px; }
  </style><body>
    <header><span class="mark">gs.</span>${escape(profile.name)}</header>
    <div class="role">AI engineer · ${escape(profile.location)}</div>
    <h1>${escape(profile.headline.lead)} <em>${escape(profile.headline.emphasis)}</em></h1>
    <footer>Writing · Machine-learning projects · Books · Running<span>georgesterpu.github.io</span></footer>
  </body></html>`);
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({ path: resolve(root, 'public/social-card.png') });
  console.log('Updated public/social-card.png from profile.json (1200 × 630).');
} finally {
  await browser.close();
}
