import { defineCollection, reference } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const posts = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/posts' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    showDescription: z.boolean().default(true),
    date: z.coerce.date(),
    updated: z.coerce.date().optional(),
    tags: z.array(z.string()).default([]),
    categories: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
    archived: z.boolean().default(false),
    legacySource: z.string().optional(),
    presentation: z
      .enum(['article', 'bookshelf', 'running-journal', 'poem'])
      .default('article'),
    illustration: z
      .object({
        src: z.string(),
        alt: z.string(),
        width: z.number().int().positive(),
        height: z.number().int().positive(),
      })
      .optional(),
    printable: z.string().optional(),
  }),
});

const work = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/work' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    company: z.string(),
    period: z.string(),
    category: z.string(),
    order: z.number(),
    proof: z.string(),
    tags: z.array(z.string()),
    draft: z.boolean().default(false),
  }),
});

const pages = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/pages' }),
  schema: z.object({ title: z.string(), description: z.string() }),
});

const books = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/books' }),
  schema: z.object({
    title: z.string(),
    author: z.string(),
    cover: z.string(),
    list: reference('posts'),
    position: z.number().int().positive(),
    status: z.enum(['read', 'on-shelf', 'in-progress']).default('read'),
    draft: z.boolean().default(false),
  }),
});

const runs = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/runs' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    legacyAnchor: z.string(),
    photos: z.array(
      z.object({
        src: z.string(),
        alt: z.string(),
        width: z.number(),
        height: z.number(),
      }),
    ),
    draft: z.boolean().default(false),
  }),
});

export const collections = { posts, work, pages, books, runs };
