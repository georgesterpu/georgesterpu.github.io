import { getCollection, type CollectionEntry } from 'astro:content';

export const publishedPosts = async () =>
  (
    await getCollection(
      'posts',
      ({ data }) => !data.draft && data.date <= new Date(),
    )
  ).sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());

export const selectedWork = async () =>
  (await getCollection('work', ({ data }) => !data.draft)).sort(
    (a, b) => a.data.order - b.data.order,
  );

export const readingShelves = async () =>
  (await publishedPosts())
    .filter((post) => post.data.presentation === 'bookshelf')
    .sort(
      (a, b) =>
        Number(b.data.title.match(/^(\d{4}) Reading List$/)?.[1] ?? 0) -
        Number(a.data.title.match(/^(\d{4}) Reading List$/)?.[1] ?? 0),
    );
export const shelfLabel = (title: string) =>
  title.replace(/ Reading List$/, '');

export const publishedBooks = async () => {
  const lists = new Set((await publishedPosts()).map((post) => post.id));
  const books = await getCollection(
    'books',
    ({ data }) => !data.draft && lists.has(data.list.id),
  );
  const positions = new Set<string>();
  for (const book of books) {
    const key = `${book.data.list.id}:${book.data.position}`;
    if (positions.has(key))
      throw new Error(
        `Duplicate book position ${key}. Give each book a unique position within its reading list.`,
      );
    positions.add(key);
  }
  return books.sort((a, b) => a.data.position - b.data.position);
};
export const bookUrl = (book: CollectionEntry<'books'>) =>
  `/books/notes/${book.id}/`;
export const hasBookNotes = (book: CollectionEntry<'books'>) =>
  Boolean(book.body?.trim());

export const postUrl = (post: CollectionEntry<'posts'>) => `/posts/${post.id}/`;
export const workUrl = (work: CollectionEntry<'work'>) => `/work/${work.id}/`;
export const tagSlug = (tag: string) =>
  tag.toLowerCase().replace(/[^a-z0-9_-]+/g, '-');
export const formatDate = (date: Date) =>
  new Intl.DateTimeFormat('en-IE', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(date);
export const readingTime = (body = '') =>
  Math.max(
    1,
    Math.ceil(
      body
        .replace(/<[^>]*>/g, ' ')
        .split(/\s+/)
        .filter(Boolean).length / 220,
    ),
  );
