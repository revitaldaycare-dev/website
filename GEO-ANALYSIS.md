# GEO / AI Search Readiness — Revital Daycare

**Date:** 2026-06-28 (revised)
**Analysis:** Generative Engine Optimization (AEO/GEO) — source audit (site not deployed)
**AI surfaces:** Google AI Overviews, ChatGPT web search, Perplexity, Claude

---

## GEO Readiness Score: 76/100 ▲ (+1)

| Category | Weight | Score | Notes |
|----------|--------|-------|-------|
| Citability | 25% | 67 | Homepage expanded, FAQ strong; staff bios enhanced |
| Structural Readability | 20% | 87 | Clean heading hierarchy (h1→h2→h3, no skips), lists, FAQ |
| Multi-Modal Content | 15% | 75 | 22 photos deployed with descriptive alt text |
| Authority & Brand Signals | 20% | 65 | Real staff names, contact info, JSON-LD schemas, but no external presence |
| Technical Accessibility | 20% | 90 | Static HTML (SSR-native), AI crawlers allowed, llms.txt, canonical tags |

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

✅ `llms.txt` exists with structured key facts, navigation, and business details.

---

## Structured Data (All 5 Pages)

| Page | Schema Type | Key Properties | Status |
|------|------------|----------------|--------|
| index.html | ChildCare | name, address, telephone, url, openingHours | ✅ |
| about.html | Organization | name, address, telephone, email, url, founder, employee | ✅ |
| programs.html | WebPage + ItemList | name, description, url, Service items | ✅ (new) |
| gallery.html | WebPage | name, description, url | ✅ (new) |
| contact.html | LocalBusiness | name, address, telephone, email, url, geo, openingHours | ✅ |

---

## E-E-A-T Assessment (Google's Who/How/Why Test)

| Question | Score | Detail |
|----------|-------|--------|
| **Who** created the content? | 6/10 | Founder named (Revital Edry) but no bio page, credentials, or LinkedIn |
| **How** was it created? | 5/10 | Generic "play-based, child-centered" description. No methodology specifics |
| **Why** does it exist? | 8/10 | Clear service purpose: quality daycare to Winnetka families |

---

## Passage-Level Citability

### Strong candidates (134-167 word answer blocks):
- **Program descriptions** — Each program starts with a clear positioning statement
- **FAQ section** — 6 Q&A pairs in clear question-answer format
- **Pricing** — Specific dollar amounts ($1,300-$1,800/mo) are concrete, citable data

### Needs improvement:
- **Homepage** — No 134-167 word answer block. Add a definition statement in first 60 words
- **About story** — Expand to include a clear mission definition in first 60 words

---

## Platform-Specific Assessment

| Platform | Score | Key Gap |
|----------|-------|---------|
| Google AI Overviews | 75 | Needs traditional SEO foundation first (deploy, images) |
| ChatGPT | 60 | No Wikipedia/Reddit/LinkedIn brand presence |
| Perplexity | 60 | No Reddit/community validation signals |
| Claude | 70 | Well-structured content, good for direct citation |

---

## Top 5 Recommendations

| # | Action | Effort | Impact |
|---|--------|--------|--------|
| 1 | **Add real images** — 156% higher AI selection rate with multi-modal content | 30 min | Very High |
| 2 | **Add original data point** — Unique stat (e.g., "95% kindergarten readiness") | 10 min | High |
| 3 | **Expand homepage** — 134-167 word "About Revital Daycare" section | 20 min | High |
| 4 | **Build brand mentions** — GBP, LinkedIn, local directories | 1-2 hrs | High |
| 5 | **Expand staff bios** — Credentials, years, LinkedIn profiles | 15 min | Medium |

---

## Quick Wins (Applied)

- [x] robots.txt allows GPTBot, OAI-SearchBot, ClaudeBot, PerplexityBot
- [x] llms.txt created with structured content overview
- [x] Staff names updated to real people (Revital Edry, Itamar Nadjar)
- [x] Contact info (NAP) consistent across all 5 pages
- [x] FAQ section on contact.html with clear Q&A format
- [x] JSON-LD on all 5 pages (ChildCare, Organization, WebPage, LocalBusiness)
- [x] Canonical tags on all pages
- [x] Geo coordinates in LocalBusiness schema
- [x] OG/Twitter cards complete on all pages
- [x] <main> landmark on all pages
