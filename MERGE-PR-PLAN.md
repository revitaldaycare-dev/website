# Legacy merge shortlist and PR plan

## Goal
Select the strongest content from the legacy repos and promote only the parts that improve the current `revitaldaycare-dev/website` experience without breaking the production site structure.

## Content comparison summary

### Best legacy sections
1. `Why Choose Revital?` feature grid
   - Clear, benefit-driven messaging
   - Best match for a fast homepage decision moment
   - Already aligned with the current site tone and conversion goals

2. `Our Programs` preview cards
   - Concise, parent-friendly, easy to scan
   - Strong fit for homepage and program navigation
   - Good source for summarizing age ranges and care offerings

3. Parent testimonial quotes
   - Powerful social proof
   - Short and credible
   - Easy to add without cluttering the page

4. CTA section
   - Simple, direct action step
   - Keeps the conversion flow focused on booking a tour

### Sections to keep out for now
- Large legacy multi-page structure that duplicates the live site pages
- Uncurated gallery and marketing-heavy blocks that are not yet integrated or optimized for the current production site
- Any content that conflicts with the already-mature live website copy or SEO structure

## Curated adoption plan

### PR 1 — Homepage improvement pass
- Add selected legacy value props to the homepage
- Keep the current live site hero, sitemap, and canonical SEO structure
- Add a concise feature grid and program preview cards near the top fold

### PR 2 — Program page polish
- Reuse the legacy program cards for a more digestible overview
- Align language with the existing `program.html` page and current brand voice

### PR 3 — Testimonial/social proof
- Add or refine testimonial blocks on homepage and review pages
- Keep the copy concise and authentic

### PR 4 — Final cleanup
- Remove or archive unused legacy merge artifacts
- Ensure the website stays on the canonical production branch and does not regress from the Cloudflare Worker configuration

## Acceptance criteria
- No production site regression
- Homepage remains fast and readable
- CTA conversion remains obvious
- Legacy content is used only as a reference and selective enhancement, not as a full overwrite

## Current state on this branch
- The live repo remains authoritative.
- Selected legacy snippets have been merged to this branch for comparison and promotion.
- The homepage now contains the most valuable legacy sections selected for a low-risk enhancement pass.
