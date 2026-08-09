# ACTION PLAN — Revital Daycare SEO

Prioritized recommendations. **Critical** = fix immediately · **High** = within 1 week · **Medium** = within 1 month · **Low** = backlog.

---

## 🔴 Critical

### C1. Add ChildCare / LocalBusiness structured data (JSON-LD)
**Effort:** 10 min · **Impact:** Highest cheap win — enables rich results, local-pack eligibility, AI citations.
Add to `<head>` of `index.html`:
```json
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "ChildCare",
  "name": "Revital Daycare",
  "description": "Licensed, women-owned preschool and daycare in Winnetka, CA serving ages 3-5 with kindergarten readiness, social skills, and creative play.",
  "telephone": "+18189435983",
  "email": "revitaldaycare@gmail.com",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Winnetka",
    "addressRegion": "CA",
    "postalCode": "91306",
    "addressCountry": "US"
  },
  "areaServed": "San Fernando Valley",
  "priceRange": "$$",
  "image": "https://amiedri74.github.io/revitaldaycare/images/facility.jpg",
  "openingHoursSpecification": {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday"],
    "opens": "07:00",
    "closes": "18:00"
  },
  "sameAs": []
}
</script>
```
*(Replace `sameAs` with your Google Business Profile and social URLs when created.)*

### C2. Register a custom domain (e.g., revitaldaycare.com)
**Effort:** ~$10–15/yr · **Impact:** Removes `.github.io` authority cap; critical for brand trust and local rankings. Use the DNS prompt provided earlier to point it at GitHub Pages, then update `og:image` URLs.

### C3. Create & claim a Google Business Profile
**Effort:** 1–2 hrs · **Impact:** The #1 factor for "preschool Winnetka" local rankings.
- Claim at business.google.com (category: **Day Care / Preschool**), use the exact NAP from the site, add photos, hours, phone.
- Link it from the site (Location section + footer) and paste the URL into the `sameAs` array in C1.
- Begin collecting parent reviews (ask every touring family) — reviews are the strongest local trust signal.

### C4. Replace the Tailwind runtime CSS compiler
**Effort:** 1–2 hrs · **Impact:** Largest performance gain — removes 276 KB of render-blocking JS.
Options:
- **Best:** Build Tailwind once (`npx @tailwindcss/cli` or a 5-line GitHub Actions workflow) and deploy a static `styles.css`; remove the CDN script.
- **Cheapest:** Use Tailwind Play CDN's `cdn.tailwindcss.com` v3 build (~97 KB) with a `<script src="https://cdn.tailwindcss.com"></script>` and no config needs — roughly 3× lighter than the current v4 browser build.
- I can do either for you.

### C5. Add trust signals to the page
**Effort:** varies · **Impact:** E-E-A-T + parent conversion.
- Display your **CA daycare license number** (parents actively look for it; also add it to schema's `identifier`).
- Add 2–3 short **parent testimonials** (names + relation) in a new section.
- Replace the stock hero with **real facility photos**.

---

## 🟠 High

### H1. robots.txt + sitemap.xml + canonical tag
**Effort:** 15 min — commit 3 small files to the repo root:
- `robots.txt`: `User-agent: *\nAllow: /` (+ `Sitemap:` line once domain is live)
- `sitemap.xml`: single `<url>` → `https://amiedri74.github.io/revitaldaycare/`
- In `<head>`: `<link rel="canonical" href="https://amiedri74.github.io/revitaldaycare/">`

### H2. Add a FAQ section
**Effort:** 30 min · **Impact:** AI-search citations, long-tail keywords, conversion.
5–7 parent questions with short answers, e.g.: *What ages do you accept? Are you licensed? What's your teacher-to-child ratio? What does a typical day look like? Do you provide meals? How does kindergarten prep work? How do I schedule a tour?* Use `<h2>` + Q&A markup so it's quotable.

### H3. Optimize images
**Effort:** 30 min · **Impact:** CLS fix + faster LCP.
- Export the facility photo as **WebP** (or JPEG quality ≤80), width ~1200px, target <200 KB.
- Add explicit `width="1200" height="800"` to the hero `<img>` to kill layout shift.
- Update `og:image` to the final file.

### H4. Mobile navigation
**Effort:** 30 min · **Impact:** Mobile parents currently can't reach section links (hidden, no hamburger). Add a simple mobile menu or move the section links under a collapsible menu.

### H5. Meta description trim
**Effort:** 2 min — shorten to ≤155 chars, keep the phone/scarcity hook.

### H6. Add llms.txt
**Effort:** 10 min — `llms.txt` at site root with a 3-sentence business summary + key facts (ages, license, hours, phone, location). Lowers AI-hallucination risk and helps AI crawlers cite you correctly.

---

## 🟡 Medium

### M1. Expand content to 800+ words
Add short sections: **Curriculum details** (literacy/math/motor activities), **Daily schedule**, **Safety protocols**, **Why families choose us**. Answer actual parent questions verbatim.

### M2. Google Business Profile reviews strategy
Set a goal (e.g., 20 reviews in 3 months), link GBP, embed a reviews snippet on the page when available.

### M3. Section content depth on the page
Add real detail under About (philosophy, years in business, educator credentials) — depth signals authority.

### M4. Response-time automation
Form already promises 24h reply — set up a Gmail filter/label for `revitaldaycare@gmail.com` tour inquiries so nothing is missed.

---

## 🟢 Low

### L1. Remove deprecated `<meta name="keywords">`
### L2. Add `referrerpolicy` / CSP via meta where GitHub Pages allows (limited)
### L3. 404 page
GitHub Pages serves a generic 404; commit a branded `404.html` so lost parents see your phone number + tour link.
### L4. Quarterly re-audit
Re-run this audit after the Critical/High items land — expect 52 → 70+.

---

## Suggested execution order (what to do this week)

1. **Day 1:** C1 (schema) + C4 (CSS) + H1 (robots/sitemap/canonical) + H5 (meta trim) → push → instant technical cleanup. *(I can implement all of these for you.)*
2. **Day 1–2:** C2 custom domain (buy + DNS prompt) + C3 Google Business Profile claim.
3. **Day 2–3:** H2 FAQ + H3 photos + H4 mobile nav + C5 testimonials/license.
4. **Week 2:** M1 content expansion, M2 review collection begins.
5. **Month 1:** re-audit.
