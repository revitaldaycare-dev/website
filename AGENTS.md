# Revital Daycare — Agent Guide

## Project
Static daycare site — 5 flat HTML pages, 1 CSS, 1 JS. Open files directly in browser. No build step, no package.json.

## Current state
- All 22 images, favicon.ico, and og-image.jpg exist
- No remaining placeholders in HTML
- **Domain is still placeholder** `revitaldaycare.com` — must update in: `robots.txt`, `sitemap.xml`, OG URLs in all HTML `<head>`s, JSON-LD `url` fields
- **Staff**: Revital Edry (Teacher, founder) and Itamar Nadjar (Assistant)
- **Contact**: 20628 Londelius St, Winnetka, CA 91306 | (818) 943-5983 | revitaldaycare@gmail.com
- **Hours**: Mon-Fri 6:30 AM - 6:00 PM
- SEO score: **81/100** | GEO score: **76/100**

## Audit results
- `SEO-AUDIT.md` — Score 81/100, deployment checklist
- `GEO-ANALYSIS.md` — Score 76/100, AI search readiness

## Contact form
Uses `mailto:revitaldaycare@gmail.com` via JavaScript — opens email app. No server-side submission.

## Images
All 22 photos exist in `images/` with descriptive alt text and proper dimensions. Gallery organized into 3 categories (classrooms, activities, special moments).

## SEO files
- `robots.txt` — allows GPTBot, OAI-SearchBot, ClaudeBot, PerplexityBot; blocks CCBot, anthropic-ai
- `sitemap.xml` — 5 URLs, lastmod 2026-06-27
- `llms.txt` — AI crawler content summary with key business facts
- `GEMINI.md` — empty file, likely unused

## Theming
CSS variables in `styles.css :root`:
- `--primary` (#2874A6), `--secondary` (#F4A66D), `--accent` (#F9D971)

## Lighthouse
index.html: 100/100/100/100 (Perf/A11y/BP/SEO)
Other pages: 85-99 across categories

## Deploy blockers
1. Domain `revitaldaycare.com` is a placeholder (31 locations)
2. No privacy policy page
3. Contact form uses mailto: (no server-side tracking)
