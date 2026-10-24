# GitHub Pages

The target is the existing account-root site, **https://georgesterpu.github.io/**, in `georgesterpu/georgesterpu.github.io`. This is a static build with no application server or hosting service beyond GitHub Pages.

The workflow follows GitHub's official [Pages artifact/deployment model](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages), with latest stable Bun as the project runtime. It uses `actions/checkout@v7`, `oven-sh/setup-bun@v2`, `actions/upload-pages-artifact@v5`, and `actions/deploy-pages@v5`.

## The whole pipeline

1. A push to `main`, pull request, or manual run builds and validates the site through `bun run verify`.
2. Bun installs dependencies with `--frozen-lockfile` using the committed `bun.lock`. After verification, the official upload action packages `dist/` as the Pages artifact.
3. Only `main` can deploy, and only the deployment job gets `pages: write` and `id-token: write`.

There are two jobs and no custom deployment script, personal access token, `gh-pages` branch, generated-file commit, or Node setup step. CI uses latest stable Bun, as requested. `bunfig.toml` forces package executables to use Bun too. Concurrent runs of the same branch supersede older builds.

## Working copy and publishing

The Astro migration is already on `main` in the public repository. The project root, `D:\work\new_blog`, is now the Git checkout, with the original repository history and remote preserved. Edit and commit here on `main`; do not initialise a new repository or work in `legacy/`.

`.tools/release/` was a temporary source checkout used to prepare the migration without changing the preserved Jekyll checkout. Its Git directory has been moved to the project root. The remaining files there are an ignored local snapshot, not the build output and not a second working copy. No copying is needed for future changes.

After editing, run `.\.tools\bun.exe run verify`, inspect any changed templates in a browser, review `git diff`, and commit the reviewed source. When a push is authorized, `git push origin main` triggers the online build and deployment. There is no need to upload HTML manually. If the terminal session cannot reach GitHub, run the push from a normal PowerShell. Do not force-push; integrate remote changes first if Git rejects the update.

Keep **Settings → Pages → Build and deployment → Source** set to **GitHub Actions**. Follow the repository's Actions runs to confirm the build and deployment succeeded.

The configured `site` and root-relative links are for an account-root Pages site. Deploying under a different repository subpath requires a separate base-path migration, including Markdown image paths.

## What is published

Only `dist/`: HTML, CSS, small interaction scripts, self-hosted fonts, optimised images, publication PDFs, sitemap, RSS, and the worker that retires the original PWA. No credentials or runtime environment variables are needed.

The source repository also contains `src/`, `public/`, `scripts/`, `docs/`, `AGENTS.md`, the workflow, configuration, and `bun.lock`. In a public repository, these source files and documentation are publicly readable even though Pages serves only the build output. The migration does not change repository visibility; the existing repository remains public.

Before committing, review `git status` and `git diff --cached --name-status` after staging. `.gitignore` excludes the supplied `cv/`, `legacy/`, temporary authoring sources in `tmp/`, dependencies, generated output, local tools/caches, environment files, and local editor/agent/cloud settings. Ignore rules do not untrack files that were previously committed.

The pre-release source audit on 19 October 2026 listed 490 eligible files, approximately 20.4 MiB, with no supplied CV, tools, caches, dependencies, build output or legacy checkout in that list. The local inventory is `.tools/release-files.txt`; it is an ignored review artifact, not a permanent manifest. The copied Chirpy licence has been removed from the new source: the Astro site replaces the template, and the original notice remains with the unchanged historical checkout. Keep the preserved checkout and local tools; deleting them is unnecessary for release. Do not copy `legacy/LICENSE` back into the new site during migration.

## Validation boundaries

Local verification checks content schemas, TypeScript 7 `.ts` files, production compilation, and all internal links, assets, and fragment IDs, including case. It does not check external website availability or fully type-check Astro template expressions. Browser checks should cover changed templates at mobile and desktop widths.

The GitHub-hosted Linux workflow runs after a push. Local verification does not substitute for checking its build and deployment results.
