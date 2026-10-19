# Writing and editing

## A post is a Markdown file

Create `src/content/posts/my-post.md`:

```markdown
---
title: 'A clear, useful title'
description: 'One sentence telling the reader what they will find.'
date: 2026-10-19
tags: [engineering]
draft: true
---

Start with the thing you want to say.

## A useful section

Normal **Markdown**, links, lists, blockquotes, and fenced code blocks work here.

![Describe what the image shows](/img/my-image.jpg)
```

Or run `bun run new:post "A clear, useful title"` (use `.\.tools\bun.exe` in place of `bun` on Windows). The command creates a draft and refuses to overwrite an existing file.

Set `draft: false` when it is ready. Future dates stay unpublished until a build runs on or after that date; GitHub Pages does not schedule builds automatically.

`draft: true` and future dates control the website, not Git visibility. If committed to this public repository, a draft's source is still readable on GitHub. Keep private unpublished writing outside the tracked source until it is ready to share.

The filename becomes `/posts/my-post/`. Keep it stable once published. For a revision, keep the original `date:` and add `updated: 2026-10-20`. Tags, archive pages, reading time, RSS, and the writing index are generated automatically.

The page template supplies the `h1` title. Start sections in the body at `##` (level two).

`archived: true` is different from a draft: the URL remains public and appears in the archive, but it is not featured on the homepage or writing index, or included in RSS. The original “Under construction” post uses this.

## Other content

- **Work:** edit `src/content/work/*.md`. Frontmatter defines title, summary, company, period, tags, ordering, and the short proof label. The body uses ordinary Markdown. `order: 1` appears first; keep selected work newest first and update the order values when adding an entry. Research claims should link to primary papers or code; the AV Align source memo is `docs/research/av-align.md`.
- **Industry claims:** use `docs/research/industry-work.md` as a source guide. Public company material can explain context, but personal results must come from George's own account. Avoid adding an implied customer launch, benchmark, or patent grant.
- **Bio and contact:** `src/data/profile.json`. This also supplies the experience list on About and the résumé.
- **Home and About copy:** `src/pages/index.astro` and `src/pages/about.astro`. The presentation is deliberately small and explicit.
- **Publications:** `src/content/pages/publications.md`.
- **Images:** `public/img/`. A file here is available under `/img/`. Resize and compress photos and covers before adding them. Use exact case in paths; GitHub Pages is case-sensitive.

The homepage headline is in `profile.json` too. After changing it, run `bun run social:card` to regenerate `public/social-card.png` from the same text and inspect the result. This local authoring command uses the optional Playwright/Chromium setup; it needs no server and is not part of deployment. Commit the resulting PNG with the copy change.

Books and running use structured Markdown collections rather than HTML in a long post. The parent posts keep their existing URLs and select a presentation template. Their entries are maintained separately as described below.

## Add a book

Create a file such as `src/content/books/reading-list-2025/034-your-book.md`:

```markdown
---
title: 'Book title'
author: 'Author name'
cover: '/img/book_covers/my-book.jpg'
list: 'reading-list-2025'
position: 34
status: 'read'
---

> A passage you want to remember.

Your own thoughts can go here too.
```

The cover and title appear in that list automatically. The Markdown body becomes a separate notes page, linked from the card. Leave the body empty for a simple cover/title entry. No empty notes page or non-working button will be generated.

`status` can be `read`, `in-progress`, or `on-shelf`. Use a unique `position` within each list. `draft: true` hides an unfinished entry. Keep the filename stable once its notes page is published. All book cover paths are relative to the public site root.

For a new year's shelf, create `src/content/posts/reading-list-2026.md` with normal post metadata and `presentation: bookshelf`. Then add book files under `src/content/books/reading-list-2026/` with `list: reading-list-2026`. The bookshelf overview and year navigation update automatically; there is no list of years to maintain in code. Draft or future reading lists stay unpublished, including their book notes.

## Add a run

Create a file in `src/content/runs/`:

```markdown
---
title: 'Race or parkrun name'
date: 2026-10-19
legacyAnchor: '2026-10-19-my-event'
photos:
  - src: '/img/running/my-event.jpg'
    alt: 'Describe the moment in this photograph'
    width: 1600
    height: 1067
---

Your result, a milestone, or a few notes from the day.
```

Use the photo's actual dimensions, or `photos: []` for a text-only event. The journal groups entries by year and sorts them by date. Additional photos become an expandable gallery without a JavaScript library. `legacyAnchor` is the stable link to this event; keep it unchanged once published. Use `draft: true` while preparing an entry. Future dates remain hidden until a later build.

## Ask an agent

> Read AGENTS.md. Add a draft Markdown post called “…” using these notes. Keep the established voice, don't invent personal experiences, and run the existing checks.

> Read AGENTS.md. Update my current role in profile.json and the relevant page copy. Keep published post URLs unchanged and run verification.

## Check and publish

Run `bun run verify`, preview the affected page, then commit the source and any new assets. A pull request runs the same checks. After the initial migration is released, pushing an approved change to `main` deploys the site.
