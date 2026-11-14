# StudyMAXIN deployment readiness

No provider is selected. No deployment workflow is enabled. The existing CI only checks the project. The export contains no runtime Next server and needs no private `materials/` files.

## Build configuration

Use Node 24 and `npm ci`. Both variables are build-time settings; rebuild when either changes:

- `NEXT_PUBLIC_BASE_PATH`: empty for root hosting, `/StudyMAXIN` for the GitHub repository project site. No trailing slash. Next Link handles navigation prefixes; the search-index fetch and favicon explicitly use the same prefix. Do not add an assetPrefix.
- `SITE_ORIGIN`: the actual HTTP(S) origin, without a path or trailing slash. Leave unset until selected. No guessed production domain is emitted. Canonical/hreflang and Open Graph URLs are emitted only when configured. The default Turkish `/` entry canonically points to `/tr/`. Both language routes remain explicit; Turkish cheat sheets keep Turkish content under either shell.

Public pages are indexable by default. Preview builds should leave SITE_ORIGIN unset and use provider access controls or noindex headers if they must stay out of search engines. No sitemap or robots policy is invented. Social metadata has localized text; a dedicated social card image is still optional future artwork. The SVG monogram favicon follows the existing paper/ink/red palette. Theme-color continues following system preference.

```sh
npm ci
npm run content:check
npm run check
PLAYWRIGHT_CHROMIUM_EXECUTABLE=/usr/bin/chromium npm run test:e2e
git diff --check
```

For root preview, serve `out/` with a directory-index static server. For subpath preview, mount `out/` at `/StudyMAXIN/`, not at `/`. Confirm direct navigation and refresh for both locale lesson routes, search JSON, scripts/fonts/icon, language switching, copied Markdown links and 404 status. Never rewrite every unknown path to index.html.

## GitHub Pages (after authorization)

1. Choose project-site or custom-domain hosting. For the standard project site use `NEXT_PUBLIC_BASE_PATH=/StudyMAXIN` and `SITE_ORIGIN=https://yashdev42.github.io`. This is a provider-derived configuration example, not an asserted deployed site. For a custom domain served at root use an empty base path and the chosen origin; configure DNS and HTTPS and rebuild.
2. Enable Settings → Pages → GitHub Actions only when ready to publish.
3. Add a reviewed workflow with checkout, setup-node using `.nvmrc`, `npm ci`, `npm run check` with those build variables, and `touch out/.nojekyll`. Upload **out/** using `actions/upload-pages-artifact`; do not upload the repository or materials. Pin reviewed action versions at implementation time.
4. Deploy that artifact with `actions/deploy-pages` in a separate job depending on the build, `pages: write` and `id-token: write`, and the `github-pages` environment. Give checkout `contents: read`; serialize deployments. An initial manual workflow trigger allows controlled publication.
5. Verify HTTPS, nested `index.html` routes and `404.html` on the actual host. Do not place `/StudyMAXIN/` inside the artifact: Pages mounts the artifact at the project prefix.

Directory routes use trailing slashes; search indexes remain actual JSON files. Actions artifact publishing preserves `_next/`; `.nojekyll` also protects a future branch-based upload.

References: [Next basePath](https://nextjs.org/docs/app/api-reference/config/next-config-js/basePath), [GitHub custom workflows](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages).

## Vercel (after authorization)

1. Import `YASHDEV42/StudyMAXIN` only when deployment is authorized; importing can publish automatically.
2. Use Node 24, install `npm ci`, build `npm run build`, output directory `out`. Choose the static “Other” preset if necessary to serve the existing export directly. Keep `NEXT_PUBLIC_BASE_PATH` empty.
3. Set SITE_ORIGIN to the selected production origin. Configure preview variables separately; do not set preview canonicals to a temporary guessed domain. No server functions, `next start`, SPA catch-all rewrites or hosting dependencies are needed.
4. Confirm trailing slash/directory index behavior, JSON content type, deep-link refresh, locale switching and unknown-path 404s on a preview before promoting production. Attach a custom domain and configure DNS/HTTPS only when selected.

Reference: [Vercel build configuration](https://vercel.com/docs/builds/configure-a-build).

## Repository identity

The local directory and sibling hero worktree retain their existing names. The origin still uses the old repository path; correct it when desired with:

```sh
git remote set-url origin https://github.com/YASHDEV42/StudyMAXIN.git
```

No history or branches need rewriting. Historical issue snapshots, old handoff paths and temporary evidence filenames retain the names recorded at the time. `studylike-theme` remains the browser preference key/event to preserve existing theme choices; it is an internal compatibility identifier, never displayed as product branding.
