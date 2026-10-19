import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { publishedPosts, postUrl } from '../lib/content';
import profile from '../data/profile.json';

export async function GET(context: APIContext) {
  return rss({
    title: `${profile.name} — Writing`,
    description:
      'Books, ideas, running, and learning. A notebook by George Sterpu.',
    site: context.site!,
    items: (await publishedPosts())
      .filter((post) => !post.data.archived)
      .map((post) => ({
        title: post.data.title,
        description: post.data.description,
        pubDate: post.data.date,
        link: postUrl(post),
        categories: post.data.tags,
      })),
    customData: '<language>en-ie</language>',
  });
}
