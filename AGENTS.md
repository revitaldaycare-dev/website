# Revital Daycare — AGENTS.md

## Project
Static HTML daycare site (ages 3–5, Reggio Emilia) served via **Cloudflare Workers** (`wrangler.jsonc`, assets from repo root). No build step, no framework, no tests.

- Repo: `revitaldaycare-dev/website` (`main` branch, origin `https://github.com/revitaldaycare-dev/website.git`)
- Domains: `revitaldaycare.com` (apex) + `www.revitaldaycare.com` → **301 to apex** (Worker `src/index.js`)
- Owner: Revital Edry / Itamar Nadjar — 20628 Londelius St, Winnetka, CA 91306 | (818) 943-5983 | revitaldaycare@gmail.com

## Stack & Wiring
- Worker: [`src/index.js`](file:///home/amram/RevitalDayCareWebSite/src/index.js) — www redirect, `POST /api/contact`, security/CSP/cache headers, `env.ASSETS` fallback. `src/lighthouse-worker.js` is a stale duplicate — do not wire as `main`.
- Config: [`wrangler.jsonc`](file:///home/amram/RevitalDayCareWebSite/wrangler.jsonc) — `assets.directory="./"`, `run_worker_first:true`, `not_found_handling:"404-page"`, custom domains for apex + www.
- Static: `*.html` (16 pages, clean URLs via [`_redirects`](file:///home/amram/RevitalDayCareWebSite/_redirects)), `styles.css` (`:root` `--primary #2874A6 --secondary #F4A66D --accent #F9D971`), `script.js`, `schemas.js`, `sw.js`, `images/` (22 WebP/JPG, responsive `-400w`/`-800w` variants), `404.html`.
- SEO: `sitemap.xml` (16 URLs), `robots.txt` (allows GPTBot/OAI-SearchBot/ClaudeBot/PerplexityBot; blocks CCBot/anthropic-ai), `llms.txt`, JSON-LD `ChildCare`/`FAQPage`/`BreadcrumbList` in HTML.

## Commands
```bash
npx wrangler dev          # local dev (Worker + assets)
npx wrangler deploy       # deploy to Cloudflare (needs CLOUDFLARE_API_TOKEN + CLOUDFLARE_ACCOUNT_ID)
npx wrangler deployments list  # verify deploy
curl -I https://revitaldaycare.com/          # check apex 200 + security headers
curl -I https://www.revitaldaycare.com/      # must be 301 → https://revitaldaycare.com/
```

No `npm test` / `lint` / `typecheck` — only dep is `wrangler ^4.120.0`.

## Deploy & Verify (GitHub)

**Deploy path is GitHub → Workers** (not `wrangler deploy` from laptop alone). Push to `main` triggers CI.

- Workflow: [`.github/workflows/deploy-and-check.yml`](file:///home/amram/RevitalDayCareWebSite/.github/workflows/deploy-and-check.yml) — `deploy` job (`npm ci` + `npx wrangler deploy`) then `check` job (waits 30s, curls apex `200` for `/`, `/about`, `/contact`, `/sitemap.xml`, `/robots.txt`; asserts `www` is `301`; asserts HSTS/CSP/X-Content-Type-Options).
- Secrets required in GitHub repo settings: `CLOUDFLARE_API_TOKEN`, `CLOUDFLARE_ACCOUNT_ID`.
- Manual trigger: `gh workflow run deploy-and-check.yml` or Actions tab → Run workflow.
- If workflow missing locally, recreate from the file above — do not switch to Cloudflare Pages.

## Constraints — Do Not Break
- **www 301** must stay in [`src/index.js`](file:///home/amram/RevitalDayCareWebSite/src/index.js) — apex is canonical, `www` is `routes` custom_domain but Worker does the redirect.
- **No critical-CSS inlining** — previously rejected, do not re-add.
- **CSP**: `script-src 'self' https://static.cloudflareinsights.com` (no `unsafe-inline` for scripts). `style-src` keeps `'unsafe-inline'` (too many inline styles to remove). Defined in `src/index.js` — keep in sync if you add external scripts.
- **_redirects**: clean URLs (`/about` → `/about.html` `200`, legacy `/programs` → `301`). `404.html` is served via `not_found_handling`.
- **Contact form**: `POST /api/contact` in Worker (validates name/email/message, forwards to `env.CONTACT_WEBHOOK` if set, else returns `{success:true}` directly). Client `script.js` also has `mailto:` fallback — keep both.

## Gotchas
- [`.assetsignore`](file:///home/amram/RevitalDayCareWebSite/.assetsignore) **excludes from deploys**: `*.md`, `package.json`, `wrangler.jsonc`, `src/`, `.omo/`, `.codegraph/`, `.wrangler/`, retired `images/infant-*` + `images/toddler-*`. Editing an `.md` or `src/lighthouse-worker.js` does NOT change the live site — verify with `npx wrangler deploy` vs. what assets actually upload.
- [`.pagesignore`](file:///home/amram/RevitalDayCareWebSite/.pagesignore) is legacy (Pages not used) — ignore it.
- Cache headers are set in Worker, not `_headers`: images/css/js `immutable` 1y; html `max-age=3600 must-revalidate` + `Link: preload` for `styles.css` + hero image.
- No lock-step `lint→typecheck→test` — just `wrangler deploy` + curl checks. If you touch Worker code, manually test `POST /api/contact` with both `application/json` and `multipart/form-data`.
- Private folders `drive-download-…/` and `science /` are gitignored and never deployed — do not commit.
