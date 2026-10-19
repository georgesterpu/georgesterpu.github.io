# Working on this site

## Scope and architecture

- Work only inside `D:\work\new_blog`. Install tools and caches here. Never change global Git settings, PATH, or tool installations.
- Astro 7 static output, TypeScript 7, latest stable Bun (currently verified with 1.4.3). Use Bun for every project command, including the runtime: `bunfig.toml` sets `run.bun = true`. Do not use npm, npx, or Node to run project code. No server, database, React runtime, or CMS is required.
- `legacy/` is the preserved original Jekyll checkout. Treat it as read-only reference, not the new project. Do not deploy from it or add it as a submodule.
- Do not publish the supplied `cv/` directory or extracted private CV data. Public copy belongs in `src/data/profile.json`, pages, and work Markdown.
- The site targets the account-root Pages URL `https://georgesterpu.github.io/`. Links intentionally start at `/`. A project-subpath deployment requires updating the links and Markdown asset paths as well as Astro's `base`.

## Find the right file

| Task                                      | Location                            |
| ----------------------------------------- | ----------------------------------- |
| Posts                                     | `src/content/posts/*.md`            |
| Books and saved passages                  | `src/content/books/<list>/*.md`     |
| Running events and photo galleries        | `src/content/runs/*.md`             |
| Work summaries                            | `src/content/work/*.md`             |
| Profile/contact/experience                | `src/data/profile.json`             |
| Publications                              | `src/content/pages/publications.md` |
| Page structure and copy                   | `src/pages/`                        |
| Shared header/footer/metadata/fonts       | `src/layouts/SiteLayout.astro`      |
| Post/work listing components              | `src/components/`                   |
| Colours, type, spacing, responsive layout | `src/styles/global.css`             |
| Bookshelf and running layouts             | `src/styles/collections.css`        |
| Content schema and defaults               | `src/content.config.ts`             |
| Post sorting, URLs, date formatting       | `src/lib/content.ts`                |
| GitHub Pages                              | `.github/workflows/deploy.yml`      |

For writing-only requests, edit Markdown or profile data. Avoid changing application code to publish content. Use `docs/editing.md` for frontmatter examples.

## Commands

On Windows, run the project-local executable:

```powershell
.\.tools\bun.exe run dev
.\.tools\bun.exe run verify
.\.tools\bun.exe run new:post "Post title"
```

- Setup only if dependencies are missing: `powershell -NoProfile -ExecutionPolicy Bypass -File .\scripts\setup.ps1`.
- Routine installs: `.\.tools\bun.exe install --frozen-lockfile`. Cache is configured locally in `bunfig.toml`. Commit `bun.lock` when dependencies change.
- `verify` = content sync + TypeScript 7 check + static build + internal link/asset/anchor validation. Run it after a meaningful change. Do not add tests that merely duplicate static markup.
- **Type-checking limit:** Astro's current `astro check` requires TypeScript 5/6. Do not silently downgrade this project. `check` uses TypeScript 7 for `.ts` files; the production build compiles `.astro` templates but does not fully type-check their expressions. When changing templates, inspect the relevant pages in a browser as well.
- Optional browser tooling: setup with `-WithBrowser`; Playwright is a local dev dependency, Chromium lives in `.cache/playwright/`. Start the preview, then run `bun run check:browser`. Screenshots stay in `.tools/` and browser temporary files in `.cache/`.
- The homepage headline is in `src/data/profile.json`. When changing it, run `bun run social:card` with the optional browser tooling installed, inspect `public/social-card.png`, and include the regenerated image. This is a local authoring step; keep browser generation out of the Pages deployment.

## Content rules

- Do not rename published Markdown files: each filename is its `/posts/<filename>/` URL. Update `updated:` when substantially revising a post; preserve `date:`.
- Keep the eight original post URLs in `docs/migration.json` working, including underscores. Preserve `/feed.xml`, `/archives/`, `/publications/`, `/about/`, and existing topic URLs.
- `draft: true` and future dates are excluded from generated posts, indexes, and RSS. `archived: true` keeps a published post reachable but hides it from featured writing and RSS.
- Draft flags and future dates do not make source private in this public repository. Do not commit private unpublished writing on the assumption that the website's draft filter protects it. Research/editing notes in `docs/` are also public if committed.
- Work notes are based on the supplied CV and, for research, linked primary papers and code. Keep selected work newest first using its `order` frontmatter (1 appears first). The AV Align source memo is `docs/research/av-align.md`; preserve scoped metrics, collaborator credits, and the distinction between historical findings and current comparisons. Do not invent impact metrics, customers, projects, quotes, or implementation details. The current professional title is AI Engineer; FDE is a target role, not an existing job title.
- For industry work, read `docs/research/industry-work.md` before expanding claims. Company sources provide context, not evidence of George's personal results. Keep power/latency figures scoped to the reported workload, governed deployment distinct from customer rollout, and invention disclosures distinct from granted patents.
- Images go in `public/img/`. Use descriptive alt text, appropriate dimensions, and lazy loading below the first screen. Optimise new images before committing; keep filename case exact.
- Posts use normal Markdown. Books and running events are individual Markdown collection entries; don't put HTML cover grids or photo tables into the parent posts. `presentation: bookshelf` and `presentation: running-journal` select the right template.
- Add a book to `src/content/books/<list>/`: title, author, cover path, `list` (a post reference), unique `position` within the list, and `status`. The Markdown body holds saved passages or notes. An empty body creates a cover/title entry; a nonempty body automatically creates its notes page. Preserve published book filenames.
- Reading-list navigation and `/books/` are generated from published posts with `presentation: bookshelf`. Adding a new year's post and its book entries should require no template edits.
- Add runs to `src/content/runs/`: title, date, stable `legacyAnchor`, photo metadata, and Markdown results/notes. The journal automatically sorts and groups them by year. Keep old event anchors stable; do not invent distances or results.
- `draft: true` hides books and runs. Future-dated runs stay unpublished. Book notes also require their parent reading list to be published. See `docs/editing.md` for examples.
- `scripts/migrate-legacy.ts` is a one-time import, not a build step. It never overwrites edited content. Don't rerun it to publish or edit posts.

## Design and interaction

- Direction: quiet editorial. Warm paper, dark ink, restrained green, Literata headlines and DM Sans body. CSS variables live at the top of `global.css`.
- Primary path: understand George's work → inspect evidence → read or get in touch. Navigation stays Work / Writing / About.
- Prefer clear labels, readable typography, generous spacing, and progressive enhancement. No decorative animation, new frameworks, dashboards, or UI libraries for routine changes.
- Prefer concrete first-person copy over portfolio slogans. Do not invent personal anecdotes. Listing components default to `h2`; pass `headingLevel={3}` when placing them inside a section already headed by `h2`.
- Preserve keyboard focus, heading order, the skip link, semantic landmarks, mobile layout, reduced-motion behaviour, and print styling for the résumé.
- Fonts are self-hosted. Do not add external font/CDN requests or analytics as part of routine edits.

## Deployment

- The workflow installs latest stable Bun, installs with `--frozen-lockfile`, runs `verify`, and uploads `dist/` using GitHub's official Pages artifact action. Only the deployment job receives Pages and OIDC write permissions. No Node setup step.
- Pull requests build and check; only `main` can deploy. No `gh-pages` branch, personal access token, generated build commits, or custom upload script.
- Do not push, merge, or deploy unless the user has requested it. Finish the local changes and validation first.
- Keep the existing repository public unless George explicitly requests a visibility change. Do not restore the copied Chirpy root licence to the replacement Astro source; its historical notice remains in the original checkout and Git history.
- First deployment must retain the original repository's Git history. The new source currently lives beside `legacy/`; do not initialise an unrelated history or overwrite the reference checkout to force a release. Prepare the migration on a branch of the original repo when publication is requested.
- `public/sw.js` retires the original Chirpy service worker. Keep it available so returning readers can update.
