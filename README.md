# George Sterpu

A personal site and blog built with **Astro 7, TypeScript 7, Bun, and Markdown**. Fully static; hosted on GitHub Pages at `https://georgesterpu.github.io`.

## Run locally

All tools and caches stay in this directory. On Windows, run the setup once:

```powershell
powershell -NoProfile -ExecutionPolicy Bypass -File .\scripts\setup.ps1
.\.tools\bun.exe run dev
```

Then open the localhost URL printed by Astro. If Bun is already installed in this project, the second command is all you need. On other platforms, use latest stable Bun and run `bun install --frozen-lockfile` followed by `bun run dev`. `bunfig.toml` forces Bun as the runtime for package commands too; no npm or Node commands are needed.

To update the local runtime later, use `.\.tools\bun.exe upgrade`. The executable stays here.

## Edit

Books live in `src/content/books/<list>/*.md`; running events live in `src/content/runs/*.md`. Each entry is an independent Markdown file. The reading guide below documents their metadata, and templates generate the shelves and journal automatically.

| Change                               | File                                |
| ------------------------------------ | ----------------------------------- |
| Write a post                         | `src/content/posts/*.md`            |
| Edit a work summary                  | `src/content/work/*.md`             |
| Update contact details or experience | `src/data/profile.json`             |
| Edit publications                    | `src/content/pages/publications.md` |
| Change a page                        | `src/pages/*.astro`                 |
| Change the design                    | `src/styles/global.css`             |

Start a draft:

```powershell
.\.tools\bun.exe run new:post "An idea worth writing down"
```

Before committing:

```powershell
.\.tools\bun.exe run verify
```

This syncs and validates content, checks `.ts` files with TypeScript 7, builds the static site, and checks internal links, images, and fragment IDs, including filename case.

See [the writing guide](docs/editing.md), [deployment](docs/deployment.md), and [agent instructions](AGENTS.md).

## Original blog

The original Jekyll repository is preserved in `legacy/`, with its Git history untouched. The migration imported all eight posts, publications, and image assets. Existing post, tag, category, archive, and feed URLs remain available. [The migration manifest](docs/migration.json) records the source commit and transformations.

`legacy/`, the supplied `cv/`, local tools, caches, and build output are ignored by Git and are not part of the deployed site. Only `dist/` is published. The public résumé is a separate web page, maintained from the supplied CV.
