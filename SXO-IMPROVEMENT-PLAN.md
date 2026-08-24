# Revital Daycare — SXO Improvement Plan

**Date:** August 22, 2026
**Baseline SXO Score:** 82/100
**Target SXO Score:** 90+/100

---

## Priority Issues (Ranked by Impact)

### 1. Curriculum Depth Gap (Quality-Focused Parent: 66/100) — HIGHEST IMPACT

**Problem:** Parents searching for preschools want to understand *what* their child will learn, not just that "play-based learning" happens. Current content is vague on learning outcomes.

**Fix:** Add a dedicated "Our Curriculum" section to homepage OR expand program.html with specific learning objectives.

#### Actions:
1. **Create `curriculum.html`** — New page with detailed curriculum breakdown
   - Learning philosophy (Reggio Emilia inspired, play-based)
   - Age-specific learning objectives (3-4 vs 4-5)
   - Assessment methods ( observational assessments, portfolio-based)
   - Kindergarten readiness milestones
   - Sample daily schedule with learning goals per activity

2. **Update `index.html`** — Add "Curriculum Highlights" section after "Revital Difference"
   - 3-4 bullet points on learning outcomes
   - Link to curriculum.html for full details
   - Add schema: EducationalOrganization or Course schema

3. **Update `program.html`** — Expand program descriptions
   - Add "What Your Child Will Learn" subsections
   - Include specific skills (literacy, numeracy, social-emotional)
   - Add kindergarten readiness checklist

#### Expected Impact:
- Quality-Focused Parent score: 66 → 80+
- Content Depth dimension: 12/15 → 14/15
- SXO Score: 82 → 87

---

### 2. Trust Signals Gap (Safety-Conscious Parent: 74/100) — HIGH IMPACT

**Problem:** First-time parents need strong safety signals. Current site has licensing info but lacks detailed safety protocols and certifications.

**Fix:** Add a "Safety & Certifications" section or page with comprehensive trust signals.

#### Actions:
1. **Create `safety.html`** — New page with safety details
   - CPR/First Aid certification (who, when renewed)
   - Staff background check policy
   - Emergency procedures (fire, earthquake, lockdown)
   - Sanitization and health protocols
   - Allergy management procedures
   - Insurance and liability coverage

2. **Update `index.html`** — Add "Safety First" section
   - Key safety highlights (3-4 bullet points)
   - Link to safety.html
   - Trust badges (licensed, CPR certified, insured)

3. **Update `about.html`** — Add staff credentials section
   - Teacher qualifications and training
   - Years of experience
   - Professional development commitment

#### Expected Impact:
- Safety-Conscious Parent score: 74 → 85+
- Trust dimension (all personas): +2-3 points
- SXO Score: 82 → 88

---

### 3. Freshness Gap (Blog Content: 5/10) — MEDIUM IMPACT

**Problem:** Blog articles are 6+ months old. No "last updated" signals. Freshness is a ranking factor and trust signal.

**Fix:** Update existing blog content and add new relevant articles.

#### Actions:
1. **Update existing blog articles**
   - Add "Last Updated: August 2026" to all articles
   - Refresh any outdated information
   - Add internal links to new curriculum/safety pages

2. **Add 2-3 new blog articles**
   - "How to Choose a Preschool in Winnetka: A Parent's Guide"
   - "What to Look for in a Daycare: 10 Questions to Ask"
   - "Preparing Your Child for Their First Day of Preschool"

3. **Add schema: BlogPosting** with dateModified to all articles

#### Expected Impact:
- Freshness dimension: 5/10 → 8/10
- SXO Score: 82 → 85

---

### 4. Local Community Gap (Embedded Map: 81/100) — LOW IMPACT

**Problem:** No Google Maps embed. Parents want to see exact location and get directions.

**Fix:** Add embedded Google Map to contact section or footer.

#### Actions:
1. **Update `contact.html`** — Add Google Maps embed
   - Embed showing 20628 Londelius St, Winnetka, CA 91306
   - Add "Directions from [neighborhood]" text
   - Include parking information if available

2. **Update `index.html`** — Add mini-map in service areas section
   - Small embedded map showing location relative to service areas

#### Expected Impact:
- Local Community Parent score: 81 → 90+
- UX Signals dimension: 13/15 → 14/15
- SXO Score: 82 → 84

---

## Implementation Timeline

### Phase 1: High-Impact Fixes (Week 1)
- [ ] Day 1-2: Create `curriculum.html` with detailed curriculum content
- [ ] Day 2-3: Create `safety.html` with safety protocols
- [ ] Day 3-4: Update `index.html` with new sections
- [ ] Day 4-5: Update `program.html` with expanded content
- [ ] Day 5: Deploy and test

### Phase 2: Content Refresh (Week 2)
- [ ] Day 1-2: Update existing blog articles with fresh dates
- [ ] Day 2-3: Write "How to Choose a Preschool" article
- [ ] Day 3-4: Write "What to Look for in a Daycare" article
- [ ] Day 4-5: Deploy and test

### Phase 3: Local Enhancement (Week 3)
- [ ] Day 1: Add Google Maps embed to contact.html
- [ ] Day 2: Add mini-map to index.html service areas
- [ ] Day 3: Deploy and test

---

## Expected Final Scores

| Persona | Before | After | Change |
|---------|--------|-------|--------|
| Working Parent | 85/100 | 87/100 | +2 |
| Researching Parent | 82/100 | 86/100 | +4 |
| Local Community Parent | 81/100 | 90/100 | +9 |
| Safety-Conscious Parent | 74/100 | 85/100 | +11 |
| Quality-Focused Parent | 66/100 | 82/100 | +16 |

| Dimension | Before | After | Change |
|-----------|--------|-------|--------|
| Page Type | 14/15 | 15/15 | +1 |
| Content Depth | 12/15 | 14/15 | +2 |
| UX Signals | 13/15 | 14/15 | +1 |
| Schema Markup | 15/15 | 15/15 | — |
| Media Richness | 11/15 | 11/15 | — |
| Authority Signals | 12/15 | 14/15 | +2 |
| Freshness | 5/10 | 8/10 | +3 |

**Final SXO Score: 82 → 91/100** (+9 points)

---

## Files to Create
- `curriculum.html` — Detailed curriculum page
- `safety.html` — Safety and certifications page

## Files to Modify
- `index.html` — Add curriculum highlights, safety section, mini-map
- `program.html` — Expand program descriptions with learning outcomes
- `contact.html` — Add Google Maps embed
- `blog.html` — Update article dates, add new articles
- `sitemap.xml` — Add new pages
- `robots.txt` — No changes needed

---

## Technical Notes

1. **Schema additions:**
   - EducationalOrganization or Course schema for curriculum page
   - BlogPosting with dateModified for blog articles
   - No changes to existing ChildCare schema (already strong)

2. **Internal linking:**
   - Link curriculum.html from program.html, index.html, blog articles
   - Link safety.html from about.html, index.html, FAQ
   - Cross-link blog articles to relevant pages

3. **Performance considerations:**
   - Google Maps embed adds ~50KB (acceptable)
   - New pages are static HTML (no performance impact)
   - Keep image-heavy pages optimized (already doing this)

---

## Success Metrics

1. **SXO Score:** 82 → 90+ (measured via re-analysis)
2. **Lighthouse Accessibility:** Maintain 100
3. **Lighthouse SEO:** Maintain 100
4. **Lighthouse Performance:** Maintain 95+
5. **Keyword rankings:** Monitor "preschool winnetka ca" position

---

## Next Steps After Implementation

1. Re-run SXO analysis to verify score improvement
2. Monitor Google Search Console for ranking changes
3. Collect user feedback on new content
4. Consider video tour (Phase 4 — requires production)
