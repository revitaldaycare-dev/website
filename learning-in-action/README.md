# Learning in Action

A warm, editorial showcase site for a hands-on early childhood program. The site presents five learning areas — exploring nature, life skills, loose parts, process art and science — through a filterable photo gallery with an accessible lightbox.

Built as a **static site with no build step**. Deployed to **Cloudflare** (Pages, via Workers static assets) and version-controlled on **GitHub**.

**Live site:** <https://learning-in-action.revitaldaycare.workers.dev>

## What's inside

```
.
├─ public/                     # Everything Cloudflare serves
│  ├─ index.html               # One-page site
│  ├─ 404.html                 # Friendly not-found page
│  ├─ favicon.svg
│  ├─ robots.txt
│  ├─ _headers                 # Security + cache headers (Cloudflare Pages)
│  └─ assets/
│     ├─ css/styles.css
│     ├─ js/main.js
│     └─ images/
│        ├─ exploring-nature/  # 1 photo
│        ├─ life-skills/       # 6 photos
│        ├─ loose-parts/       # 7 photos
│        ├─ process-art/       # 4 photos
│        └─ science/           # 12 photos
├─ wrangler.jsonc              # Cloudflare deploy config (assets = public/)
├─ deploy/github-workflow.yml.example
├─ package.json
└─ README.md
```

The site has no runtime dependencies, no framework and no build command. `npm` is only used for the optional local preview and manual deploy scripts.

## Preview locally

```bash
npm run dev
```

This serves `public/` at <http://localhost:3000>. Any static server works, for example:

```bash
npx serve public
# or
python -m http.server 8000 --directory public
```

## Deploying

The site deploys to the Cloudflare Worker `learning-in-action`, which serves `public/` as static assets using the latest Cloudflare Pages platform (Workers static assets). Configuration lives in `wrangler.jsonc`.

### Automatic deploys (GitHub Actions, optional)

The repository does not yet include a workflow file. To enable deploy-on-push, add
`.github/workflows/deploy.yml` using the example at
`deploy/github-workflow.yml.example`, then add these repository secrets
(Settings → Secrets and variables → Actions):

| Secret | Where to find it |
| --- | --- |
| `CLOUDFLARE_API_TOKEN` | Cloudflare dashboard → My Profile → API Tokens → Create Token → **Edit Cloudflare Workers** |
| `CLOUDFLARE_ACCOUNT_ID` | Cloudflare dashboard → Workers & Pages → Account ID (right sidebar) |

### Manual deploy

```bash
npm install
npm run deploy
```

This runs `wrangler deploy`, which uploads `public/` and publishes to
<https://learning-in-action.revitaldaycare.workers.dev>. Authenticate first with
`npx wrangler login` (or set `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID`).

### Deploy from the Cloudflare dashboard

Workers & Pages → Create application → Connect to Git → choose the repository, then use:

- **Build command:** *(leave empty)*
- **Deploy command:** `npx wrangler deploy`

## Customizing

- **Contact email** — replace `hello@learninginaction.com` (it appears in the visit section, footer, and `mailto:` links) with your real address.
- **Program name and copy** — edit `public/index.html`. The brand name appears in the header, footer and page title.
- **Colours** — edit the CSS custom properties at the top of `public/assets/css/styles.css` (`--green`, `--clay`, `--sun`, `--cream`, etc.).
- **Photos** — replace files in `public/assets/images/<area>/`. Keep the existing filenames or update the `src`, `width`, `height` and lightbox data in `public/index.html`.
- **Social preview** — `og:image`, `og:url` and the canonical link already use the production domain. Update them if you connect a custom domain.
- **Headers** — CSP, cache rules and security headers live in `public/_headers`. The strict CSP assumes no third-party scripts or styles; update it if you add analytics or a font service.

## Photo and privacy checklist

These photos show children's learning, so treat consent as part of publishing:

- Confirm you have permission from families for every image used publicly.
- Crop or blur faces if consent does not cover public web use.
- Keep originals somewhere private; do not commit images you would not publish.
- The original `Science - Copy/` folder is a duplicate and is excluded by `.gitignore`. It is not part of the site.

## Notes

- No cookies, analytics or third-party requests are included.
- The gallery is keyboard accessible; the lightbox supports arrow keys and Escape.
- Images are lazy-loaded, with intrinsic dimensions set to avoid layout shift.
