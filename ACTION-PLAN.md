# ACTION PLAN — Revital Daycare SEO

Prioritized recommendations for the live site (https://revitaldaycare.com, 14 pages, Cloudflare Workers).
**Critical** = fix immediately · **High** = within 1 week · **Medium** = within 1 month · **Low** = backlog.
Audit date: 2026-08-16 · Score: 75/100 (was 52/100 at launch).

---

## 🔴 Critical

### C1. Fix canonical tags on the 5 mismatched pages
**Effort:** 15 min · **Impact:** Restores indexation of 4 pages currently funneling signals into the homepage.
The clean URLs `/woodland-hills`, `/chatsworth`, `/canoga-park` 301-redirect to `index.html`, and `/programs` 301s to `program.html` — but the `<link rel="canonical">` tags on those pages point at those redirecting URLs. Google resolves canonicals by fetching, so it sees the homepage (or program.html) and treats the page as a duplicate.
**Fix:** point each canonical at the URL that actually returns 200:
- `woodland-hills.html` → `https://revitaldaycare.com/woodland-hills.html`
- `chatsworth.html` → `https://revitaldaycare.com/chatsworth.html`
- `canoga-park.html` → `https://revitaldaycare.com/canoga-park.html`
- `programs.html` → `https://revitaldaycare.com/program.html` (after C2 consolidates the duplication)
- 404.html keeps its self-canonical (fine with `noindex`)

### C2. Consolidate program.html vs programs.html (duplicate content)
**Effort:** 15 min · **Impact:** Ends keyword cannibalization; single URL gets full authority.
Body content is near-identical (744 vs 775 words; only title + extra ItemList schema differ).
**Fix (pick one):**
- **Option A (recommended):** delete `programs.html`, keep `program.html`, and add `programs.html` → `program.html` 301 via the Worker. Canonical on program.html already correct.
- **Option B:** make `programs` the canonical URL and 301 `program.html` → `programs` — requires adding clean-URL routing so `/programs` serves content instead of redirecting.

### C3. Add missing pages to sitemap.xml
**Effort:** 5 min · **Impact:** Guarantees discovery of 5 currently-omitted indexable pages.
Add with `<lastmod>2026-08-16</lastmod>`: `gallery.html`, `programs.html` (or remove after C2), `woodland-hills.html`, `chatsworth.html`, `canoga-park.html`.

### C4. Align review markup with visible reviews
**Effort:** 15 min · **Impact:** Avoids review-rich-result rejection / manual action risk.
[schemas.js](file:///home/amram/RevitalDayCareWebSite/schemas.js) review authors (Jessica M., David R., Sarah L., Michael K., Amanda P., Tom W.) must match the names on [parent-reviews.html](file:///home/amram/RevitalDayCareWebSite/parent-reviews.html) (Sarah Mitchell, David Kim, Jennifer Lopez, Maria Santos, Robert Chen, Amanda Rodriguez). Update the JSON-LD to the visible names — or strip the review schema entirely and rely on the visible testimonials + GBP reviews.

---

## 🟠 High

### H1. Serve the existing responsive image variants
**Effort:** 30 min · **Impact:** Cuts ~1 MB of transfers; fastest remaining LCP win.
`outdoor-play.webp` (448 KB, 5 pages), `story-time.webp` (444 KB), `team-revital.webp` (353 KB as a 140px avatar), `og-image.webp` (213 KB) are still referenced as originals. The `-400w`/`-800w` variants already exist in `images/`. Point `<img src>`/`srcset` at the variants (or add the originals' sizes to the responsive set). `og-image.webp` (213 KB) is acceptable for social but not needed in all 14 pages — consider a smaller og variant.

### H2. Add service-area schema to the 3 location pages
**Effort:** 20 min · **Impact:** Signals each city's local relevance.
Each of woodland-hills / chatsworth / canoga-park should carry `ChildCare` (or `Service` + `WebPage`) JSON-LD with its city in `areaServed`/`addressLocality`, matching the page's visible city copy.

### H3. Expand the 2 thinnest pages
**Effort:** 1–2 hrs · **Impact:** environment.html (336 words) and gallery.html (255 words) are below the ~400-word floor.
- environment: add safety protocols, classroom/yard descriptions, daily rhythm, photo captions (captions also help image SEO).
- gallery: add category intro copy + captions; group is already categorized (classrooms/activities/special moments).

### H4. Fill schema gaps on schemas.js
**Effort:** 20 min · **Impact:** Richer local + social results.
Add to the `ChildCare` object: `hasMap` (Google Maps URL), `sameAs` (GBP URL once claimed), `identifier` with license `#197312451`, and switch `openingHoursSpecification` to array form for robustness.

---

## 🟡 Medium

### M1. Meta description trims
`contact.html` (158) and `gallery.html` (158) — trim to ≤155 chars.

### M2. GBP claim + linking
Claim/verify the Google Business Profile, then drop its URL into `sameAs` (H4) and the footer. Reviews collected there become the strongest local-pack signal (review schema C4 depends on real review data).

### M3. llms.txt coverage
Add gallery + service-area page links and one line per service-area city so AI search engines can cite location pages directly.

### M4. PSI/CrUX field-data pass
PSI API was quota-blocked this run. Re-run PageSpeed Insights manually (pagespeed.web.dev) for real CrUX field data (INP especially) and record in a future audit.

---

## 🟢 Low

### L1. Duplicate alt text
`program.html` and `programs.html` share the alt "Preschoolers engaged in classroom learning activities" — differentiate after C2 dedup.

### L2. Re-audit quarterly
Re-run this audit after Critical/High items land — expect 75 → 85+.

---

## Suggested execution order

1. **Day 1 (30 min):** C1 canonicals + C2 dedup (301) + C3 sitemap + C4 review markup → deploy → technical indexation fixed.
2. **Day 1–2:** H1 responsive images + H2 service-area schema + H4 schema gaps → deploy.
3. **Week 1:** H3 content expansion (environment, gallery) + M1 meta trims.
4. **Week 2:** M2 GBP claim + M3 llms.txt + M4 CrUX pass.
5. **Month 1:** re-audit, L1/L2 cleanup.
