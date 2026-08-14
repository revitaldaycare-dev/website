# GEO / AI Search Readiness — Revital Daycare

**Date:** 2026-08-14 (revised)
**Analysis:** Generative Engine Optimization (AEO/GEO) — live deployed site
**AI surfaces:** Google AI Overviews, ChatGPT web search, Perplexity, Claude
**Domain:** https://revitaldaycare.com

---

## GEO Readiness Score: 81/100 ▲ (+5)

| Category | Weight | Prior | Now | Notes |
|----------|--------|-------|-----|-------|
| Citability | 25% | 67 | 78 | Specific pricing ($1,500/mo), 6:1 ratio, exact hours, age bands 3–4/4–5, 6 FAQ Q&As |
| Structural Readability | 20% | 87 | 90 | Clean h1→h2→h3, lists, FAQ; refocus made age messaging coherent |
| Multi-Modal Content | 15% | 75 | 78 | 22 photos with descriptive alt; service pages differentiated |
| Authority & Brand Signals | 20% | 65 | 68 | Real staff (Revital Edry, Itamar Nadjar), NAP consistent, enriched JSON-LD; still no external presence |
| Technical Accessibility | 20% | 90 | 93 | Static SSR HTML, AI crawlers allowed, llms.txt, HSTS, immutable asset caching |

**Weighted score:** 81.4 → **81/100**

---

## AI Crawler Access

| Crawler | robots.txt | Purpose |
|---------|-----------|---------|
| GPTBot | ✅ Allowed | ChatGPT web search + training |
| OAI-SearchBot | ✅ Allowed | OpenAI search features |
| ClaudeBot | ✅ Allowed | Claude web features |
| PerplexityBot | ✅ Allowed | Perplexity AI search |
| CCBot | ❌ Blocked | Training data |
| anthropic-ai | ❌ Blocked | Claude training only |

✅ `llms.txt` exists, Last-Modified 2026-08-14, states ages 3–5 + 6:1 ratio + full NAP.

---

## Structured Data (All 9 Pages)

| Page | Schema Type | Key Properties | Status |
|------|------------|----------------|--------|
| index.html | ChildCare | name, address, telephone, url, geo, openingHours, founder, employee, sameAs | ✅ |
| about.html | WebPage + Organization | founder (Revital Edry), employees (Edry + Nadjar), NAP, sameAs | ✅ (enriched) |
| programs.html | WebPage + ItemList | 2 Service items (Preschool 3–4, Pre-K 4–5) | ✅ |
| gallery.html / privacy.html | WebPage | name, description, url | ✅ |
| contact.html | WebPage + ChildCare + FAQPage | self-contained ChildCare w/ geo + hours; 6 Q&A | ✅ (enriched) |
| woodland-hills / canoga-park / chatsworth | ChildCare | areaDserved: City name | ✅ |

---

## Passage-Level Citability

### Citable blocks (concrete, query-answering):
- **Pricing** — "$1,500/month full-time, 10% sibling discount"
- **Ratio** — "6:1 child-to-staff ratio"
- **Hours** — "Monday–Friday, 6:30 AM–6:00 PM"
- **Age bands** — "Preschool (3–4 years) and Pre-K (4–5 years)"
- **FAQ** — 6 Q&A pairs in clean question-answer format
- **NAP** — address + phone + email consistent across all 9 pages

### Needs improvement:
- **Homepage** — no dedicated 134–167 word "About" definitional block in first 60 words.

---

## E-E-A-T Assessment

| Question | Score | Detail |
|----------|-------|--------|
| **Who** created the content? | 6/10 | Founder named (Revital Edry) with credentials; no bio page or LinkedIn |
| **How** was it created? | 5/10 | "Play-based, Reggio-inspired" description; no methodology specifics or stats |
| **Why** does it exist? | 8/10 | Clear: quality preschool (3–5) to Winnetka + service-area families |

---

## Platform-Specific Assessment

| Platform | Score | Key Gap |
|----------|-------|---------|
| Google AI Overviews | 80 | Strong structured data + FAQ; needs more homepage depth |
| ChatGPT | 60 | No Wikipedia/Reddit/LinkedIn brand presence |
| Perplexity | 60 | No Reddit/community validation signals |
| Claude | 72 | Well-structured, citable content |

---

## Top 5 Recommendations

| # | Action | Effort | Impact |
|---|--------|--------|--------|
| 1 | **Add Google Business Profile** + verify | 30 min | Very High (local + AI citations) |
| 2 | **Add original data point** — e.g., "95% kindergarten readiness" stat | 10 min | High |
| 3 | **Expand homepage** — 134–167 word definitional block in first 60 words | 20 min | High |
| 4 | **Add IndexNow + pings on deploy** | 15 min | Medium |
| 5 | **Expand service-area pages** — unique local content per city | 1-2 hr | Medium |

---

## Quick Wins (Applied)

- [x] robots.txt allows GPTBot, OAI-SearchBot, ClaudeBot, PerplexityBot
- [x] llms.txt updated: ages 3–5, 6:1 ratio, Last-Modified 2026-08-14
- [x] Site refocused to preschool ages 3–5 (infant/toddler content removed)
- [x] Pricing corrected to $1,500/month on live pages
- [x] JSON-LD enriched on about (Organization) + contact (self-contained ChildCare)
- [x] NAP consistent across all 9 pages
- [x] FAQ section (6 Q&A) on contact with FAQPage schema
- [x] Canonical tags + OG/Twitter cards on all pages
- [x] Security headers (HSTS etc.) added — improves trust/authority signals