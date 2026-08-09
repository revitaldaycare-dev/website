# SEO & Website Audit — Revital Daycare

**URL:** https://amiedri74.github.io/revitaldaycare/
**Audit date:** 2026-08-03
**Business type detected:** Local service business — licensed daycare/preschool (brick-and-mortar), Winnetka, CA 91306
**Site structure:** Single static page (GitHub Pages), freshly launched

---

## Executive Summary

### SEO Health Score: **52 / 100** (Fair — needs work)

| Category | Weight | Score |
|---|---|---|
| Technical SEO | 22% | 62 |
| Content Quality | 23% | 48 |
| On-Page SEO | 20% | 78 |
| Schema / Structured Data | 10% | 5 |
| Performance (CWV) | 10% | 50 |
| AI Search Readiness | 10% | 30 |
| Images | 5% | 55 |

### Top 5 Critical Issues
1. **No structured data (JSON-LD)** — zero schema of any kind; no LocalBusiness/ChildCare markup, so no rich results and weak local-pack eligibility.
2. **No custom domain** — site lives on `amiedri74.github.io`; Google treats subdomain-hosted sites with much lower authority, and parents won't trust a `.github.io` URL.
3. **No Google Business Profile presence** — no GBP link, no reviews, no local-pack strategy. This is the single strongest ranking factor for "preschool Winnetka" queries.
4. **Runtime CSS compiler in production** — Tailwind v4 browser build (276 KB of JS) generates CSS client-side, delaying first paint significantly.
5. **No E-E-A-T trust signals** — no license number displayed, no team/about-philosophy depth, no parent testimonials, stock photo only.

### Top 5 Quick Wins (hours, not days)
1. Add ChildCare + LocalBusiness JSON-LD (copy-paste block, ~10 min).
2. Commit `robots.txt` + `sitemap.xml` + canonical tag (~15 min).
3. Trim meta description to ≤155 chars (~2 min).
4. Add a FAQ block with real parent questions (~30 min) — wins AI citations and long-tail keywords.
5. Add explicit `width`/`height` to the hero image + publish as WebP (~30 min).

---

## Technical SEO (62/100)

| Check | Status | Notes |
|---|---|---|
| HTTPS enforced | ✅ | HSTS header present, HTTP/2 |
| Trailing-slash canonicalization | ✅ | `/revitaldaycare` → 301 → `/revitaldaycare/` |
| Viewport / mobile | ✅ | Correct meta viewport, responsive Tailwind classes |
| Language attribute | ✅ | `lang="en"` |
| robots.txt | ❌ | 404 — site still crawlable (GitHub Pages default), but no explicit directives |
| sitemap.xml | ❌ | 404 — needed for indexation confirmation |
| Canonical tag | ❌ | `/index.html` variant returns 200 → duplicate URL risk |
| Security headers | ⚠️ | HSTS ✅; no CSP / X-Content-Type-Options / Referrer-Policy (GitHub Pages limitation) |
| Custom domain | ❌ | `.github.io` subdomain caps authority and local trust |

## On-Page SEO (78/100)

| Element | Verdict |
|---|---|
| Title (60 chars) | ✅ "Preschool & Early Learning in Winnetka, CA | Revital Daycare" — keyword-rich, ideal length |
| Meta description (184 chars) | ⚠️ Too long — truncates around 155 in SERPs |
| H1 | ✅ Single H1 "Licensed Preschool & Early Learning in Winnetka, CA" |
| Heading hierarchy | ✅ 1 H1 → 4 H2 → 3 H3, logical |
| Keyword meta tag | ⚠️ Present but deprecated (harmless) |
| Local keywords | ✅ Winnetka, 91306, San Fernando Valley, kindergarten readiness covered |
| Internal linking | N/A single page; anchors to sections work |

## Content Quality (48/100)

- **Thin content:** ~431 body words — adequate for a landing page, below the ~800–1500 words typical of ranking daycare pages.
- **E-E-A-T gaps:** no licensing credential shown (a CA daycare license number is a top trust signal for parents), no educator team info, no parent testimonials/reviews, no real facility photos.
- **Strengths:** clear value prop (kindergarten readiness, social skills, safe/certified), strong scarcity copy ("Only 14 spots"), clean CTAs, phone prominent.
- **Missing blocks that would rank:** FAQ, daily schedule, curriculum detail, safety protocols, pricing hints, "why choose us vs other Winnetka daycares".

## Schema / Structured Data (5/100)

**No structured data of any kind.** Recommended (see ACTION-PLAN for ready-to-paste JSON-LD):
- `ChildCare` (subtype of `LocalBusiness`) — primary
- Nested: `openingHoursSpecification`, `telephone`, `address` (city-level), `areaServed`, `priceRange`, `image`
- Enables: rich results, local-pack eligibility, AI-assistant citations

## Performance (50/100)

| Metric | Value | Verdict |
|---|---|---|
| TTFB (HTML) | 0.29 s | ✅ Excellent (GitHub CDN) |
| Tailwind v4 browser build | 276 KB JS, **render-blocking** | ❌ CSS is compiled client-side — main LCP/paint cost |
| Font Awesome CSS | 101 KB + webfonts | ⚠️ Icons via font — moderate cost |
| Hero image (fallback) | 274 KB JPEG | ⚠️ Oversized; no WebP/AVIF; no explicit dimensions (CLS risk) |
| Map iframe | lazy-loaded | ✅ |
| Estimated first-load transfer | ~700 KB+ | ⚠️ Heavy for a landing page |

## Images (55/100)

- 1 image, alt text present ✅
- og:image configured ✅
- No explicit width/height → layout shift (CLS) risk ⚠️
- JPEG not WebP/AVIF; 274 KB fallback ⚠️
- Stock photo placeholder — real facility photos needed for trust + local credibility ❌

## AI Search Readiness (30/100)

- **No llms.txt** ❌
- **No structured data** ❌ (schema is how AI crawlers confidently extract facts)
- No FAQ/Q&A content ❌
- No verifiable claims (no license number, no review count) ❌
- Passage citability: copy is quotable and self-contained ✅ — a good base once schema + FAQ land

## Local SEO (assessed inline)

- NAP: partial (phone + city/zip + hours consistent) ✅ — full address intentionally withheld (tour-gated, typical for home-based care)
- No Google Business Profile link/embed ❌
- No local schema ❌
- No reviews ❌
- Keywords target "preschool Winnetka / daycare 91306" ✅

## Conversion / SXO

- Strong CTA hierarchy: "Book a Tour" (hero + header) + click-to-call ✅
- 24-hour response promise ✅
- Form: 9 inputs, 5 required — acceptable, slightly heavy
- **Mobile nav gap:** header links hidden on mobile with no hamburger menu — mobile parents can't reach About/Program/Location sections ❌
- No pricing, FAQ, or reviews = decision friction for price-sensitive parents ⚠️

---

## Verdict

A solid, fast-loading single-page foundation with excellent on-page fundamentals (title, headings, CTA, local keywords) — but it will not rank for local daycare queries yet. The gap is **local authority**: no custom domain, no Google Business Profile, no schema, no reviews, no E-E-A-T signals. Fix the Critical + High items in ACTION-PLAN.md and this page can realistically target the local pack within a few months.
