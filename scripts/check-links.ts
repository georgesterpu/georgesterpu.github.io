import { readFileSync, readdirSync } from 'node:fs';
import { resolve, join, posix } from 'node:path';

// Check the generated site, including filename case (Windows would otherwise
// hide failures that only appear on GitHub's Linux build / Pages hosting).
const root = resolve(import.meta.dirname, '../dist');
const files = new Set(
  readdirSync(root, { recursive: true, withFileTypes: true })
    .filter((entry) => entry.isFile())
    .map(
      (entry) =>
        `/${join(entry.parentPath, entry.name)
          .slice(root.length + 1)
          .replaceAll('\\', '/')}`,
    ),
);
const pages = [...files].filter((file) => file.endsWith('.html'));
const origin = 'https://georgesterpu.github.io';
const ids = new Map<string, Set<string>>();
const failures = new Set<string>();
let checked = 0;
for (const page of pages) {
  const html = readFileSync(join(root, page), 'utf8').replace(
    /<!--[\s\S]*?-->/g,
    '',
  );
  ids.set(
    page,
    new Set([...html.matchAll(/\bid="([^"]+)"/g)].map((match) => match[1]!)),
  );
}
for (const page of pages) {
  const html = readFileSync(join(root, page), 'utf8').replace(
    /<!--[\s\S]*?-->/g,
    '',
  );
  const pageUrl = `${origin}${page.replace(/index\.html$/, '')}`;
  for (const match of html.matchAll(
    /\b(?:href|src)="([^"]+)"|property="og:image"\s+content="([^"]+)"/g,
  )) {
    const raw = (match[1] ?? match[2])!.replaceAll('&amp;', '&');
    if (!raw || /^(mailto:|tel:|data:|javascript:)/i.test(raw)) continue;
    const url = new URL(raw, pageUrl);
    if (url.origin !== origin) continue;
    checked++;
    const path = decodeURIComponent(url.pathname);
    const target = files.has(path) ? path : posix.join(path, 'index.html');
    if (!files.has(target)) {
      failures.add(`${page}: missing ${path}`);
      continue;
    }
    if (url.hash && target.endsWith('.html')) {
      const anchor = decodeURIComponent(url.hash.slice(1));
      if (!ids.get(target)?.has(anchor))
        failures.add(`${page}: missing anchor ${path}#${anchor}`);
    }
  }
}
if (failures.size) {
  console.error([...failures].join('\n'));
  process.exitCode = 1;
} else
  console.log(
    `Verified ${checked} internal links and assets across ${pages.length} HTML pages, including filename case and fragment IDs.`,
  );
