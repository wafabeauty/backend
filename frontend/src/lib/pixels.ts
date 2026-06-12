'use client'

declare global {
  interface Window {
    fbq: (...args: unknown[]) => void
    ttq: {
      track: (event: string, params?: Record<string, unknown>) => void
      identify: (params: Record<string, unknown>) => void
    }
    snaptr: (action: string, event: string, params?: Record<string, unknown>) => void
  }
}

export function trackPageView() {
  if (typeof window === 'undefined') return
  if (window.fbq) window.fbq('track', 'PageView')
  if (window.ttq) window.ttq.track('Pageview')
  if (window.snaptr) window.snaptr('track', 'PAGE_VIEW')
}

export function trackViewContent(productName: string, price: number, currency = 'SAR') {
  if (typeof window === 'undefined') return
  if (window.fbq) {
    window.fbq('track', 'ViewContent', {
      content_name: productName,
      content_type: 'product',
      value: price,
      currency,
    })
  }
  if (window.ttq) {
    window.ttq.track('ViewContent', {
      content_name: productName,
      value: price,
      currency,
    })
  }
  if (window.snaptr) {
    window.snaptr('track', 'VIEW_CONTENT', { price, currency })
  }
}

export function trackAddToCart(productName: string, price: number, currency = 'SAR') {
  if (typeof window === 'undefined') return
  if (window.fbq) {
    window.fbq('track', 'AddToCart', {
      content_name: productName,
      value: price,
      currency,
    })
  }
  if (window.ttq) {
    window.ttq.track('AddToCart', {
      content_name: productName,
      value: price,
      currency,
    })
  }
  if (window.snaptr) {
    window.snaptr('track', 'ADD_CART', { price, currency })
  }
}

export function trackInitiateCheckout(value: number, currency = 'SAR') {
  if (typeof window === 'undefined') return
  if (window.fbq) {
    window.fbq('track', 'InitiateCheckout', { value, currency })
  }
  if (window.ttq) {
    window.ttq.track('InitiateCheckout', { value, currency })
  }
  if (window.snaptr) {
    window.snaptr('track', 'START_CHECKOUT', { price: value, currency })
  }
}

export function trackPurchase(eventId: string, value: number, currency = 'SAR') {
  if (typeof window === 'undefined') return
  if (window.fbq) {
    window.fbq('track', 'Purchase', { value, currency }, { eventID: eventId })
  }
  if (window.ttq) {
    window.ttq.track('CompletePayment', { value, currency, event_id: eventId })
  }
  if (window.snaptr) {
    window.snaptr('track', 'PURCHASE', { price: value, currency, transaction_id: eventId })
  }
}
