# Implementation Plan — Performance Optimization

**Date:** 2026-08-15
**Goal:** Improve Lighthouse score from ~85-90 to 95+ across all categories
**Timeline:** 4-6 hours total

---

## Phase 1: Critical Performance Fixes (1-2 hours)

### Task 1.1: Add Resource Hints to All HTML Files
**Priority:** HIGH
**Effort:** 30 minutes
**Impact:** +5-10 performance points

#### Files to Modify:
- `index.html`
- `about.html`
- `program.html`
- `contact.html`
- `gallery.html`
- `environment.html`
- `faq.html`
- `parent-reviews.html`
- `privacy.html`
- `canoga-park.html`
- `chatsworth.html`
- `woodland-hills.html`
- `404.html`

#### Changes:
Add the following to `<head>` section of each file:

```html
<!-- Performance: Resource Hints -->
<link rel="preconnect" href="https://revitaldaycare.com">
<link rel="preconnect" href="https://images.revitaldaycare.com" crossorigin>
<link rel="dns-prefetch" href="https://www.google.com">
<link rel="dns-prefetch" href="https://cloudflareinsights.com">

<!-- Preload critical resources -->
<link rel="preload" href="/styles.css" as="style">
<link rel="preload" href="/script.js" as="script">
<link rel="preload" href="/images/staff-children.webp" as="image" type="image/webp">
<link rel="preload" href="/images/og-image.webp" as="image" type="image/webp">
```

#### Verification:
```bash
# Check for resource hints
grep -l "preconnect" *.html | wc -l
# Should return 14 (all HTML files)
```

---

### Task 1.2: Add Responsive Image Sizing
**Priority:** HIGH
**Effort:** 45 minutes
**Impact:** +10-15 performance points

#### Files to Modify:
- `index.html` (hero + gallery images)
- `about.html` (team images)
- `program.html` (program images)
- `environment.html` (gallery images)
- `gallery.html` (all gallery images)

#### Changes:
Replace `<img>` tags with responsive `<picture>` elements:

**Example for hero image:**
```html
<!-- Before -->
<img src="images/staff-children.jpg" alt="..." width="1050" height="1400" loading="lazy">

<!-- After -->
<picture>
  <source 
    srcset="images/staff-children.webp 400w, images/staff-children.webp 800w, images/staff-children.webp 1200w"
    sizes="(max-width: 600px) 400px, (max-width: 1000px) 800px, 1200px"
    type="image/webp"
  >
  <img 
    src="images/staff-children.jpg" 
    srcset="images/staff-children.jpg 400w, images/staff-children.jpg 800w, images/staff-children.jpg 1200w"
    sizes="(max-width: 600px) 400px, (max-width: 1000px) 800px, 1200px"
    alt="..." 
    width="1050" 
    height="1400" 
    loading="lazy"
    decoding="async"
  >
</picture>
```

#### Generate Additional Image Sizes:
```bash
# Create optimized images
for img in images/*.webp; do
  # 400px width
  convert "$img" -resize 400x "${img%.webp}-400w.webp"
  # 800px width
  convert "$img" -resize 800x "${img%.webp}-800w.webp"
done
```

#### Verification:
```bash
# Check for responsive images
grep -l "srcset" *.html | wc -l
# Should return 5+ (HTML files with images)
```

---

### Task 1.3: Inline Critical CSS
**Priority:** HIGH
**Effort:** 45 minutes
**Impact:** +10-15 performance points

#### Files to Modify:
All 14 HTML files

#### Changes:
Add critical CSS inline and load full CSS asynchronously:

```html
<head>
  <!-- Critical CSS (inline) -->
  <style>
    :root {
      --primary: #2874A6;
      --secondary: #F4A66D;
      --accent: #F9D971;
      --cream: #FFFBF0;
      --light-gray: #F5F5F5;
      --dark-gray: #333;
      --text: #444;
      --border: #E0E0E0;
      --success: #6BBB7A;
    }
    * { margin: 0; padding: 0; box-sizing: border-box; }
    html { scroll-behavior: smooth; }
    body { font-family: 'Segoe UI', sans-serif; line-height: 1.6; color: var(--text); background: #fff; }
    .container { max-width: 1200px; margin: 0 auto; padding: 0 20px; }
    .navbar { background: white; box-shadow: 0 2px 8px rgba(0,0,0,0.1); position: sticky; top: 0; z-index: 100; }
    .hero { background: linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%); color: white; padding: 100px 20px; text-align: center; }
    .hero-content h1 { color: white; font-size: 2.8rem; margin-bottom: 1rem; }
    .btn { display: inline-block; padding: 12px 32px; border-radius: 8px; font-size: 1rem; font-weight: 600; text-align: center; cursor: pointer; transition: all 0.3s ease; border: none; text-decoration: none; }
    .btn-primary { background-color: var(--primary); color: white; }
  </style>
  
  <!-- Full CSS (asynchronous) -->
  <link rel="preload" href="/styles.css" as="style" onload="this.onload=null;this.rel='stylesheet'">
  <noscript><link rel="stylesheet" href="/styles.css"></noscript>
  
  <!-- Rest of head content -->
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  ...
</head>
```

#### Verification:
```bash
# Check for inline styles
grep -l "<style>" *.html | wc -l
# Should return 14 (all HTML files)

# Check for async CSS loading
grep -l "onload=\"this.onload=null" *.html | wc -l
# Should return 14 (all HTML files)
```

---

## Phase 2: Medium Priority Optimizations (2-3 hours)

### Task 2.1: Optimize Image Delivery in Worker
**Priority:** MEDIUM
**Effort:** 30 minutes
**Impact:** +5-10 performance points

#### File to Modify:
`src/index.js`

#### Changes:
```javascript
// Add image optimization headers
if (/\.(jpg|jpeg|png)$/i.test(url.pathname)) {
  headers.set("Accept-CH", "DPR, Width, Viewport-Width");
  headers.set("Vary", "Accept, DPR, Width, Viewport-Width");
  
  // Add cache-busting for images
  if (!url.searchParams.has('v')) {
    url.searchParams.set('v', '1');
    return Response.redirect(url.toString(), 301);
  }
}
```

#### Verification:
```bash
# Deploy worker
wrangler deploy

# Test image headers
curl -I https://revitaldaycare.com/images/staff-children.jpg
# Should include Accept-CH header
```

---

### Task 2.2: Add Service Worker
**Priority:** MEDIUM
**Effort:** 45 minutes
**Impact:** +5-10 performance points

#### New File: `sw.js`
```javascript
const CACHE_NAME = 'revital-v1';
const urlsToCache = [
  '/',
  '/styles.css',
  '/script.js',
  '/images/staff-children.webp',
  '/images/og-image.webp',
  '/images/art-space.webp',
  '/images/outdoor-playground.webp'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});
```

#### Modify HTML Files:
Add service worker registration to all HTML files:

```html
<script>
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/sw.js')
        .then(registration => {
          console.log('SW registered:', registration);
        })
        .catch(error => {
          console.log('SW registration failed:', error);
        });
    });
  }
</script>
```

#### Verification:
```bash
# Check for service worker file
ls -la sw.js

# Check for registration in HTML
grep -l "serviceWorker" *.html | wc -l
# Should return 14 (all HTML files)
```

---

### Task 2.3: Optimize JavaScript Loading
**Priority:** MEDIUM
**Effort:** 30 minutes
**Impact:** +3-5 performance points

#### Files to Modify:
All 14 HTML files

#### Changes:
```html
<!-- Before -->
<script src="schemas.js" defer></script>
<script src="script.js" defer></script>

<!-- After -->
<script src="schemas.js" defer async></script>
<script src="script.js" defer async></script>

<!-- Or use module scripts -->
<script type="module" src="schemas.js"></script>
<script type="module" src="script.js"></script>
```

#### Verification:
```bash
# Check for async/module scripts
grep -l "defer async" *.html | wc -l
# OR
grep -l "type=\"module\"" *.html | wc -l
# Should return 14 (all HTML files)
```

---

## Phase 3: Low Priority Optimizations (1-2 hours)

### Task 3.1: Add DNS Prefetch
**Priority:** LOW
**Effort:** 15 minutes
**Impact:** +1-2 performance points

#### Files to Modify:
All 14 HTML files

#### Changes:
```html
<head>
  <link rel="dns-prefetch" href="https://www.google.com">
  <link rel="dns-prefetch" href="https://www.google-analytics.com">
  <link rel="dns-prefetch" href="https://cloudflareinsights.com">
  <link rel="dns-prefetch" href="https://fonts.googleapis.com">
</head>
```

#### Verification:
```bash
# Check for DNS prefetch
grep -l "dns-prefetch" *.html | wc -l
# Should return 14 (all HTML files)
```

---

### Task 3.2: Optimize CSS Delivery
**Priority:** LOW
**Effort:** 30 minutes
**Impact:** +1-2 performance points

#### File to Modify:
`styles.css`

#### Changes:
```css
/* Add critical CSS media queries */
@media (max-width: 768px) {
  /* Mobile-first critical styles */
  .navbar .container { padding: 12px 15px; }
  .hero { padding: 60px 20px; }
  .hero-content h1 { font-size: 2rem; }
}

@media (min-width: 769px) {
  /* Desktop styles */
  .navbar .container { padding: 15px 20px; }
  .hero { padding: 100px 20px; }
  .hero-content h1 { font-size: 2.8rem; }
}
```

#### Verification:
```bash
# Check for media queries
grep -c "@media" styles.css
# Should return 2+ (mobile + desktop)
```

---

### Task 3.3: Add Third-Party Resource Hints
**Priority:** LOW
**Effort:** 15 minutes
**Impact:** +1-2 performance points

#### Files to Modify:
All 14 HTML files

#### Changes:
```html
<head>
  <link rel="preconnect" href="https://www.google-analytics.com">
  <link rel="preconnect" href="https://cloudflareinsights.com">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
</head>
```

#### Verification:
```bash
# Check for preconnect hints
grep -l "preconnect" *.html | wc -l
# Should return 14 (all HTML files)
```

---

## Testing Strategy

### 1. Local Testing
```bash
# Start local server
python3 -m http.server 8080

# Run Lighthouse
npx lighthouse http://localhost:8080/index.html --output=json --output-path=/tmp/lighthouse.json

# Check scores
cat /tmp/lighthouse.json | jq '.categories.performance.score * 100'
```

### 2. Cloudflare Worker Testing
```bash
# Deploy worker
wrangler deploy

# Test with Lighthouse
npx lighthouse https://revitaldaycare.com/ --output=json --output-path=/tmp/lighthouse.json
```

### 3. Performance Monitoring
- Use Chrome DevTools Performance panel
- Monitor Core Web Vitals (FCP, LCP, CLS, TBT)
- Track real-user metrics via Google Analytics

---

## Success Criteria

### Target Scores
- **Performance:** ≥95/100
- **Accessibility:** ≥95/100
- **Best Practices:** ≥95/100
- **SEO:** ≥90/100

### Target Metrics
- **FCP:** <1.8s (good)
- **LCP:** <2.5s (good)
- **CLS:** <0.1 (good)
- **TBT:** <200ms (good)

---

## Rollback Plan

If any changes cause issues:

1. **Resource Hints:** Remove `<link rel="preload">` tags
2. **Responsive Images:** Revert to original `<img>` tags
3. **Critical CSS:** Remove inline `<style>` and revert to external CSS
4. **Service Worker:** Delete `sw.js` and remove registration code
5. **Async Scripts:** Remove `async` attribute from script tags

---

## Next Steps After Implementation

1. **Deploy to Cloudflare** - Push optimized version
2. **Monitor performance** - Track real-user metrics
3. **A/B test** - Compare old vs new performance
4. **Iterate** - Continue optimizing based on data
5. **Document** - Update SEO-AUDIT.md with new scores

---

**Plan created:** 2026-08-15
**Implementation start:** After approval
**Expected completion:** 4-6 hours
