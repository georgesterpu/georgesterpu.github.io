import { mkdirSync, writeFileSync } from 'node:fs';
import { resolve, join } from 'node:path';

const title = process.argv
  .slice(2)
  .filter((value) => value !== '--')
  .join(' ')
  .trim();
if (!title) throw new Error('Usage: bun run new:post "Your post title"');
const slug = title
  .normalize('NFKD')
  .replace(/[\u0300-\u036f]/g, '')
  .toLowerCase()
  .replace(/[^a-z0-9]+/g, '-')
  .replace(/^-|-$/g, '');
if (!slug) throw new Error('Use a title containing letters or numbers.');
const directory = resolve(import.meta.dirname, '../src/content/posts');
mkdirSync(directory, { recursive: true });
const path = join(directory, `${slug}.md`);
writeFileSync(
  path,
  `---\ntitle: ${JSON.stringify(title)}\ndescription: "Add a useful one-sentence description."\ndate: ${new Date().toISOString().slice(0, 10)}\ntags: []\ndraft: true\n---\n\nStart writing here.\n`,
  { flag: 'wx' },
);
console.log(
  `Created src/content/posts/${slug}.md (draft). Set draft: false when ready.`,
);
