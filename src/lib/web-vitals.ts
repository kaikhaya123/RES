import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals'

// Function to report Web Vitals to console and external service
export function reportWebVitals(metric: any) {
  console.log('Web Vitals:', {
    name: metric.name,
    value: Math.round(metric.value),
    rating: metric.rating,
  })

  // Send to analytics service in production
  if (process.env.NODE_ENV === 'production') {
    // Example: Send to your analytics endpoint
    const body = JSON.stringify({
      name: metric.name,
      value: metric.value,
      timestamp: new Date().toISOString(),
      page: window.location.pathname,
      userAgent: navigator.userAgent,
    })

    // Use sendBeacon for reliability
    if (navigator.sendBeacon) {
      navigator.sendBeacon('/api/analytics/vitals', body)
    }
  }
}

// Initialize all Web Vitals tracking
export function initWebVitals() {
  getCLS(reportWebVitals)
  getFID(reportWebVitals)
  getFCP(reportWebVitals)
  getLCP(reportWebVitals)
  getTTFB(reportWebVitals)
}
