# Deploy, audit, and Lighthouse checklist

## PR summary

Title: Upgrade homepage trust messaging with selected legacy sections

Summary:
This PR applies a low-risk homepage enhancement pass using the strongest content from the legacy Revital Daycare repos. The goal is to improve clarity, trust, and conversion without replacing the current live site structure or changing the production deployment model.

What this changes:
- Adds a concise “Why Families Choose Revital” value grid to the homepage
- Adds a clearer program overview section with parent-friendly summaries
- Adds a short testimonial block to reinforce social proof
- Adds a stronger direct-call CTA to encourage tour inquiries
- Keeps the current live site architecture, metadata, and Cloudflare Worker setup intact

Why this approach:
- The live website is already strong structurally and SEO-aware
- The legacy repos contain sharper, more parent-focused messaging
- This PR selectively promotes only the best-fit content instead of doing a broad repo overwrite

Risk level:
Low. This is a homepage content refinement only; it does not change routing, deployment, SEO base structure, or Cloudflare configuration.

Validation checklist:
- Homepage loads correctly
- CTA links still work
- No layout regressions
- No SEO metadata regressions
- `www` redirect still functions correctly
- Cloudflare deployment succeeds without configuration changes

## Cloudflare Wrangler deploy

From the repo root:

```bash
npm install
npx wrangler login
# or set env vars:
export CLOUDFLARE_API_TOKEN="..."
export CLOUDFLARE_ACCOUNT_ID="..."

npx wrangler deploy
npx wrangler deployments list
```

## Post-deploy audit

```bash
# apex should return 200
curl -I https://revitaldaycare.com/

# www should redirect to apex
curl -I https://www.revitaldaycare.com/

# inspect response headers
curl -sS -D - -o /dev/null https://revitaldaycare.com/ | egrep -i "HTTP/|content-type|cache-control|strict-transport-security|x-frame-options|x-content-type-options"

# quick look at homepage HTML
curl -sS https://revitaldaycare.com/ | head -n 40
```

Expected:
- `https://www.revitaldaycare.com/` returns `301`
- `https://revitaldaycare.com/` returns `200`
- Security headers remain present
- Homepage content includes the new trust sections
- CTA links still work

## Lighthouse checks

Install and run Lighthouse locally against the production site:

```bash
npm install -g lighthouse
lighthouse https://revitaldaycare.com/ --chrome-flags="--headless" --preset=desktop --output=json --output-path=./lighthouse-report.json
lighthouse https://revitaldaycare.com/ --chrome-flags="--headless" --preset=desktop --output=html --output-path=./lighthouse-report.html
```

Review the results for:
- Performance
- Accessibility
- Best Practices
- SEO
- Core Web Vitals

Baseline target values:
- Performance: 80+
- Accessibility: 90+
- Best Practices: 90+
- SEO: 90+

If scores are below target, check:
- image sizes and formats
- render-blocking CSS or JS
- unused heuristics or duplicate markup
- large font and asset loading
- CTA visibility and mobile layout

## Final validation checklist

- Homepage loads cleanly
- No layout break on mobile
- CTA buttons link correctly
- No SEO meta regressions
- `www` redirect still works
- Worker still serves the site with expected headers
- No Cloudflare configuration changes accidentally introduced
- Homepage copy reads clearly and is not duplicated excessively
- No issue with script or CSS load order
- Deployment succeeded via `npx wrangler deploy`
