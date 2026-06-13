'use client'

import { Product } from '@/types'

interface MobileStickyCTAProps {
  product: Product | undefined
}

export default function MobileStickyCTA({ product }: MobileStickyCTAProps) {
  if (!product) return null
  return (
    <div className="sticky-cta md:hidden">
      <a
        href="#top"
        onClick={(e) => {
          e.preventDefault()
          window.scrollTo({ top: 0, behavior: 'smooth' })
        }}
        className="flex items-center justify-center gap-3 w-full bg-brand-blue text-white font-black py-4 rounded-full text-center hover:bg-brand-blue-light transition-colors active:scale-95 shadow-premium"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
        </svg>
        اطلبي الآن – الدفع عند الاستلام
      </a>
    </div>
  )
}
