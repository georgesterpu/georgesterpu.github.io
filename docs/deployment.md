# GitHub Pages

The target is the existing account-root site, **https://georgesterpu.github.io/**, in `georgesterpu/georgesterpu.github.io`. This is a static build with no application server or hosting service beyond GitHub Pages.

The workflow follows GitHub's official [Pages artifact/deployment model](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages), with latest stable Bun as the project runtime. It uses `actions/checkout@v7`, `oven-sh/setup-bun@v2`, `actions/upload-pages-artifact@v5`, and `actions/deploy-pages@v5`.

## The whole pipeline

1. A push to `main`, pull request, or manual run builds and validates the site through `bun run verify`.
2. Bun installs dependencies with `--frozen-lockfile` using the committed `bun.lock`. After verification, the official upload action packages `dist/` as the Pages artifact.
3. Only `main` can deploy, and only the deployment job gets `pages: write` and `id-token: write`.

There are two jobs and no custom deployment script, personal access token, `gh-pages` branch, generated-file commit, or Node setup step. CI uses latest stable Bun, as requested. `bunfig.toml` forces package executables to use Bun too. Concurrent runs of the same branch supersede older builds.

## First release

The original checkout is in `legacy/`, untouched. The new source in this directory has not yet been pushed or published. When the design and copy are approved, prepare a migration branch based on the original repository, preserve its Git history, and replace its Jekyll source with the reviewed Astro source. Do not copy the nested `legacy/`, supplied `cv/`, `.tools/`, caches, `node_modules/`, or `dist/` into the released source.

For the initial release in this restricted session, a separate local checkout can be prepared at `.tools/release/` on `relaunch-astro`. It contains the reviewed source snapshot and the original repository history, with the remote set to the existing GitHub repository. The parent directory remains the editable workspace, and `legacy/` remains read-only. If terminal networking prevents publishing, the local commit can be pushed from a normal PowerShell. Do not force-push: a rejection means the remote has changes that must be integrated first. Keep the release snapshot in sync before publishing if the parent source changes.

In the existing GitHub repository, select **Settings → Pages → Build and deployment → Source → GitHub Actions**. Replace the original Jekyll workflow with the new workflow; do not keep two competing Pages deployments. Merge the reviewed migration to `main` and check the build/deploy results.

The configured `site` and root-relative links are for an account-root Pages site. Deploying under a different repository subpath requires a separate base-path migration, including Markdown image paths.

## What is published

Only `dist/`: HTML, CSS, small interaction scripts, self-hosted fonts, optimised images, publication PDFs, sitemap, RSS, and the worker that retires the original PWA. No credentials or runtime environment variables are needed.

The source repository also contains `src/`, `public/`, `scripts/`, `docs/`, `AGENTS.md`, the workflow, configuration, and `bun.lock`. In a public repository, these source files and documentation are publicly readable even though Pages serves only the build output. The migration does not change repository visibility; the existing repository remains public.

Before the first commit, inspect `git add --all --dry-run`, then review `git diff --cached --name-status` after staging. The migration should delete the old Jekyll source and workflow and add the Astro source. `.gitignore` excludes the supplied `cv/`, `legacy/`, dependencies, generated output, local tools/caches, environment files, and local editor/agent/cloud settings. Ignore rules do not untrack files that were previously committed.

The pre-release source audit on 19 October 2026 listed 490 eligible files, approximately 20.4 MiB, with no supplied CV, tools, caches, dependencies, build output or legacy checkout in that list. The local inventory is `.tools/release-files.txt`; it is an ignored review artifact, not a permanent manifest. The copied Chirpy licence has been removed from the new source: the Astro site replaces the template, and the original notice remains with the unchanged historical checkout. Keep the preserved checkout and local tools; deleting them is unnecessary for release. Do not copy `legacy/LICENSE` back into the new site during migration.

## Validation boundaries

Local verification checks content schemas, TypeScript 7 `.ts` files, production compilation, and all internal links, assets, and fragment IDs, including case. It does not check external website availability or fully type-check Astro template expressions. Browser checks should cover changed templates at mobile and desktop widths.

The GitHub-hosted Linux workflow cannot be exercised fully from this restricted Windows session until the source is pushed to a branch. The workflow uses the documented official actions; its hosted result must be checked during the first release.
