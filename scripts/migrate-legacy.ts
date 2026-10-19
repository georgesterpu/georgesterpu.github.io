import {
  cpSync,
  existsSync,
  mkdirSync,
  readFileSync,
  readdirSync,
  writeFileSync,
} from 'node:fs';
import { execFileSync } from 'node:child_process';
import { basename, join, relative, resolve } from 'node:path';

// One-time import. The checkout is read-only input; existing content is never overwritten.
const root = resolve(import.meta.dirname, '..');
const legacy = join(root, 'legacy');
const source = join(legacy, '_posts');
if (!existsSync(source))
  throw new Error('Clone the original blog into legacy/ first.');

const descriptions: Record<string, string> = {
  'first-post': 'The first hello from this little corner of the internet.',
  running:
    'A journal in pictures: race days, personal bests, and the people along the way.',
  ferris_questions:
    'My answers to the questions from Tim Ferriss’s Tribe of Mentors, on learning, community, and what matters.',
  master_of_change:
    'Five questions from Brad Stulberg on identity, expectations, and finding room for change.',
  'reading-list':
    'The books I read in 2023, with passages and ideas I wanted to remember.',
  'reading-list-2024':
    'A year of reading across psychology, business, science, and personal development.',
  'reading-list-2025':
    'Books from 2025: product thinking, communication, AI, and seeing things differently.',
  'business-books':
    'A growing bookshelf on building products, understanding people, and making businesses work.',
};

function writeNew(path: string, text: string) {
  if (existsSync(path)) {
    if (readFileSync(path, 'utf8') !== text)
      console.log(`Kept existing file: ${relative(root, path)}`);
    return;
  }
  writeFileSync(path, text, { flag: 'wx' });
}

function frontmatter(raw: string) {
  const match = raw
    .replace(/\r\n/g, '\n')
    .match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) throw new Error('Missing frontmatter in original content.');
  return { header: match[1]!, body: match[2]! };
}

function list(header: string, name: string) {
  const value =
    header.match(new RegExp(`^${name}: \\[(.*?)\\]`, 'm'))?.[1] ?? '';
  return value
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean);
}

const destination = join(root, 'src/content/posts');
mkdirSync(destination, { recursive: true });
const entries: Array<{
  source: string;
  destination: string;
  url: string;
  updated: string;
}> = [];
for (const file of readdirSync(source, { recursive: true })
  .map(String)
  .filter((file) => file.endsWith('.md'))
  .sort()) {
  const filename = basename(file);
  const match = filename.match(/^(\d{4}-\d{2}-\d{2})-(.+)\.md$/);
  if (!match) throw new Error(`Unexpected original filename: ${file}`);
  const [, date, id] = match as [string, string, string];
  const { header, body } = frontmatter(
    readFileSync(join(source, file), 'utf8'),
  );
  const title = header.match(/^title: (.+)$/m)?.[1];
  if (!title || !descriptions[id])
    throw new Error(`Review the metadata for ${file} before importing.`);
  const gitFile = `_posts/${file.replaceAll('\\', '/')}`;
  const updated = execFileSync(
    'git',
    [
      '-c',
      `safe.directory=${legacy.replaceAll('\\', '/')}`,
      '-C',
      legacy,
      'log',
      '-1',
      '--format=%cs',
      '--',
      gitFile,
    ],
    { encoding: 'utf8' },
  ).trim();
  let currentHeading = title;
  let converted = body
    .replace(/^# (.+)$/gm, '## $1')
    .replace(/^(.+)\n=+\s*$/gm, '## $1')
    .replace(/<style>[\s\S]*?<\/style>\s*/g, '')
    .replace(
      /<div style="clear: both;?"><\/div>/g,
      '<div class="book-clear"></div>',
    )
    .replace(/class="image-container"/g, 'class="book-cover"')
    .replace(/<div style="display: flex;">/g, '<div class="photo-row">')
    .replace(/\sstyle="[^"]*"/g, '')
    .replace(/^>\s*["“”]{2}\s*$/gm, '');
  converted = converted
    .replace(/<\/div>\n(?=>)/g, '</div>\n\n')
    .replace(/([^\n])\n(?=<div class="book-clear")/g, '$1\n\n')
    .replace(/^>[ \t]*$/gm, '');
  converted = converted.replace(
    /^#{2,3} (.+)$|^- \*\*(.+?)\*\*.*$|<img\b[^>]*>/gm,
    (tag, heading: string | undefined, book: string | undefined) => {
      if (heading || book) {
        currentHeading = heading || book!;
        return tag;
      }
      return tag
        .replace(/\swidth="[^"]*"/g, '')
        .replace(
          /alt="image unavailable"/,
          `alt="${currentHeading.replaceAll('&', '&amp;').replaceAll('"', '&quot;')}"`,
        )
        .replace(/>$/, ' loading="lazy" decoding="async">');
    },
  );
  if (/\{%|\{\{/.test(converted))
    throw new Error(`Liquid syntax in ${file} needs manual migration.`);
  const metadata = [
    '---',
    `title: ${JSON.stringify(title)}`,
    `description: ${JSON.stringify(descriptions[id])}`,
    `date: ${date}`,
    ...(updated && updated !== date ? [`updated: ${updated}`] : []),
    `tags: ${JSON.stringify(list(header, 'tags'))}`,
    `categories: ${JSON.stringify(list(header, 'categories'))}`,
    ...(id === 'first-post' ? ['archived: true'] : []),
    `legacySource: ${JSON.stringify(gitFile)}`,
    '---',
    '',
  ].join('\n');
  const target = join(destination, `${id}.md`);
  writeNew(target, `${metadata}${converted}`);
  entries.push({
    source: gitFile,
    destination: relative(root, target).replaceAll('\\', '/'),
    url: `/posts/${id}/`,
    updated,
  });
}

const pages = join(root, 'src/content/pages');
mkdirSync(pages, { recursive: true });
const publications = frontmatter(
  readFileSync(join(legacy, '_tabs/publications.md'), 'utf8'),
).body;
writeNew(
  join(pages, 'publications.md'),
  `---\ntitle: "Publications"\ndescription: "Research publications and open-source work by George Sterpu in multimodal learning and speech recognition."\n---\n\n${publications.replaceAll('../img/', '/img/')}`,
);
mkdirSync(join(root, 'public'), { recursive: true });
cpSync(join(legacy, 'img'), join(root, 'public/img'), {
  recursive: true,
  force: false,
});
mkdirSync(join(root, 'docs'), { recursive: true });
writeNew(
  join(root, 'docs/migration.json'),
  `${JSON.stringify({ repository: 'https://github.com/georgesterpu/georgesterpu.github.io', commit: execFileSync('git', ['-c', `safe.directory=${legacy.replaceAll('\\', '/')}`, '-C', legacy, 'rev-parse', 'HEAD'], { encoding: 'utf8' }).trim(), entries, transformations: ['Removed page-local styles and inline image sizing; shared responsive styles replace them.', 'Added lazy loading and descriptive image alt text from the surrounding heading or book title.', 'Removed empty quote placeholders; retained all written prose and quotations.', 'Copied original image and publication assets without changing their names.', 'Kept the original first post reachable in the archive.'], originalCheckout: 'legacy/ is untouched; it is not included in the deployed site.' }, null, 2)}\n`,
);
console.log(
  `Imported ${entries.length} posts, publications, and original assets. legacy/ is unchanged.`,
);
