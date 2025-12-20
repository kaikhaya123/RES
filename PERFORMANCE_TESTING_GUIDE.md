# Performance Testing Guide

## Overview
This guide covers comprehensive performance testing for the R.E.S. platform, including testing on 3G/4G connections and optimizing for real-world scenarios.

## Tools & Setup

### 1. Lighthouse (Built-in)
Lighthouse is integrated into Chrome DevTools and provides automated audits.

**How to use:**
1. Open Chrome DevTools (F12)
2. Go to Lighthouse tab
3. Select "Generate report"
4. Targets: Performance, Accessibility, Best Practices, SEO

**Key Metrics:**
- **LCP (Largest Contentful Paint):** < 2.5s
- **FID (First Input Delay):** < 100ms
- **CLS (Cumulative Layout Shift):** < 0.1

### 2. WebPageTest
Online tool for detailed performance analysis: https://www.webpagetest.org/

**Setup:**
1. Go to webpagetest.org
2. Enter your site URL
3. Select test location and device
4. Run test and analyze results

### 3. Local Performance Testing with Throttling

**Chrome DevTools Network Throttling:**
```
1. Open DevTools (F12)
2. Go to Network tab
3. Click throttling dropdown (top-left)
4. Select "Fast 3G" or "Slow 3G"
```

**Network Conditions Tested:**
```
Slow 3G:
- Download: 400 Kbps
- Upload: 400 Kbps
- Latency: 400ms

Fast 3G:
- Download: 1.6 Mbps
- Upload: 750 Kbps
- Latency: 150ms

4G LTE:
- Download: 4 Mbps
- Upload: 3 Mbps
- Latency: 50ms
```

### 4. Next.js Built-in Analytics

Enable Web Vitals tracking in your Next.js app:

```typescript
// app/layout.tsx
import { useReportWebVitals } from 'next/web-vitals'

export function RootLayout({ children }) {
  useReportWebVitals((metric) => {
    console.log(metric)
  })
  
  return (
    <html>
      <body>{children}</body>
    </html>
  )
}
```

### 5. Bundle Analysis

```bash
# Analyze your Next.js bundle
npm run build -- --analyze
```

## Performance Testing Checklist

### Desktop Testing
- [ ] Test on Chrome (Latest)
- [ ] Test on Firefox (Latest)
- [ ] Test on Safari (Latest)
- [ ] Run Lighthouse audit (Target: 90+)
- [ ] Check Core Web Vitals (all green)

### Mobile Testing
- [ ] Test on iPhone (Safari)
- [ ] Test on Android (Chrome)
- [ ] Test with Fast 3G throttling
- [ ] Test with Slow 3G throttling
- [ ] Run Lighthouse audit (Target: 85+)

### Network Testing

#### Slow 3G Simulation
```
1. Open DevTools
2. Network tab → Throttling → Slow 3G
3. Load page and monitor metrics
4. Target: LCP < 3.5s on Slow 3G
```

#### Fast 3G Simulation
```
1. Open DevTools
2. Network tab → Throttling → Fast 3G
3. Load page and monitor metrics
4. Target: LCP < 2.5s on Fast 3G
```

#### 4G/LTE Simulation
```
1. Open DevTools
2. Network tab → Throttling → 4G
3. Load page and monitor metrics
4. Target: LCP < 1.5s on 4G
```

## Performance Metrics to Monitor

### Core Web Vitals (CWV)
These are the three metrics Google uses to rank sites:

| Metric | Good | Poor |
|--------|------|------|
| LCP (Largest Contentful Paint) | < 2.5s | > 4s |
| FID (First Input Delay) | < 100ms | > 300ms |
| CLS (Cumulative Layout Shift) | < 0.1 | > 0.25 |

### Additional Metrics
- **TTFB (Time to First Byte):** < 600ms
- **FCP (First Contentful Paint):** < 1.8s
- **TTI (Time to Interactive):** < 3.8s
- **Speed Index:** < 3.4s

## Testing on Real Devices

### Using Android Device
```bash
# Enable USB debugging on Android
# Connect phone via USB
# Run Chrome and navigate to chrome://inspect
# Select your phone and inspect the page
# Use DevTools as if it's a local page
```

### Using iPhone
```bash
# Connect iPhone via USB
# Open Safari → Develop → [Your iPhone] → [Page]
# Use Safari DevTools for debugging
```

## Monitoring in Production

### 1. Google Analytics 4 (GA4)
Track real-world Core Web Vitals:
```typescript
// lib/analytics.ts
export function trackWebVitals(metric) {
  // Send to GA4
  if (window.gtag) {
    window.gtag('event', metric.name, {
      value: Math.round(metric.value),
      event_category: 'Web Vitals',
    })
  }
}
```

### 2. Sentry Performance Monitoring
Real-time error and performance tracking:
```typescript
import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  tracesSampleRate: 1.0,
});
```

### 3. Speed Insights (Google)
Get detailed performance reports:
- Go to Google Search Console
- Go to "Core Web Vitals" report
- View real-world metrics from your users

## Common Performance Issues & Solutions

### Issue: Slow LCP
**Causes:**
- Large images not optimized
- Render-blocking JavaScript
- Slow server response

**Solutions:**
```typescript
// Optimize images
<Image 
  src="/image.jpg" 
  width={1200}
  height={800}
  priority={true}  // For above-fold images
/>

// Use dynamic imports for below-fold components
const HeavyComponent = dynamic(() => import('./Heavy'), {
  loading: () => <p>Loading...</p>,
})
```

### Issue: High CLS
**Causes:**
- Images without dimensions
- Ads/embeds without reserved space
- Dynamically injected content

**Solutions:**
```typescript
// Always specify image dimensions
<Image width={100} height={100} />

// Reserve space for dynamic content
<div style={{ minHeight: '100px' }}>
  {dynamicContent}
</div>
```

### Issue: Poor 3G Performance
**Causes:**
- Large bundles
- Too many requests
- Uncompressed assets

**Solutions:**
```typescript
// Enable compression
npm install compression

// Code splitting
import dynamic from 'next/dynamic'

// Lazy load images
<Image loading="lazy" />
```

## Automated Performance Testing

### GitHub Actions Workflow
```yaml
# .github/workflows/performance.yml
name: Performance Check

on: [pull_request]

jobs:
  lighthouse:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      
      - run: npm install
      - run: npm run build
      - run: npm start &
      
      - uses: treosh/lighthouse-ci-action@v10
        with:
          uploadArtifacts: true
          temporaryPublicStorage: true
```

## Performance Optimization Tips

### 1. Image Optimization
- Use Next.js Image component
- WebP format with fallbacks
- Responsive images with srcSet
- Lazy loading for below-fold images

### 2. Code Splitting
- Dynamic imports for routes
- Lazy load heavy components
- Tree-shake unused code

### 3. Caching Strategy
- Static generation (SSG)
- Incremental Static Regeneration (ISR)
- Browser caching headers
- Service Worker for offline support

### 4. Database Queries
- Use pagination
- Index frequently queried fields
- Cache query results
- Implement query timeout

### 5. Third-party Scripts
- Load async/defer
- Use Web Workers
- Implement consent-based loading

## Testing Script

```bash
#!/bin/bash
# run-performance-tests.sh

echo "Running performance tests..."

# Build
npm run build

# Start server
npm start &
SERVER_PID=$!

sleep 5

# Run Lighthouse
npx lighthouse http://localhost:3000 \
  --view \
  --output=html \
  --output-path=./lighthouse-report.html

# Run WebPageTest (requires API key)
# npm run webpagetest

kill $SERVER_PID

echo "Performance tests complete!"
```

## Resources

- [Core Web Vitals Guide](https://web.dev/vitals/)
- [Lighthouse Docs](https://developers.google.com/web/tools/lighthouse)
- [Next.js Performance](https://nextjs.org/learn/seo/introduction-to-seo/what-is-performance-seo)
- [WebPageTest Documentation](https://docs.webpagetest.org/)
- [Chrome DevTools Throttling](https://developer.chrome.com/docs/devtools/network-conditions/)

## Continuous Improvement

1. **Baseline:** Establish current performance metrics
2. **Monitor:** Track metrics over time
3. **Optimize:** Address bottlenecks identified
4. **Test:** Verify improvements
5. **Repeat:** Continuous cycle

## Target Metrics for R.E.S. Platform

| Metric | Target | Current |
|--------|--------|---------|
| Lighthouse (Desktop) | 90+ | TBD |
| Lighthouse (Mobile) | 85+ | TBD |
| LCP | < 2.5s | TBD |
| FID | < 100ms | TBD |
| CLS | < 0.1 | TBD |
| TTFB | < 600ms | TBD |
| 3G LCP | < 3.5s | TBD |
| 4G LCP | < 1.5s | TBD |

---

**Last Updated:** December 21, 2025
**Maintained by:** R.E.S. Development Team
