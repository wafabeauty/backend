'use client'

import { Product } from '@/types'
import { useCartStore } from '@/store/cartStore'
import { PRICING_TIERS } from '@/lib/products'
import { trackAddToCart } from '@/lib/pixels'

interface MobileStickyCTAProps {
  product: Product | undefined
}

export default function MobileStickyCTA({ product }: MobileStickyCTAProps) {
  const { buyNow } = useCartStore()

  if (!product) return null

  const handleBuyNow = () => {
    trackAddToCart(product.nameAr, PRICING_TIERS[1].price)
    buyNow(product, PRICING_TIERS[1])
  }

  return (
    <div className="sticky-cta md:hidden">
      <button
        onClick={handleBuyNow}
        className="flex items-center justify-center gap-3 w-full bg-brand-gold text-brand-blue-dark font-black py-4 rounded-full text-center hover:bg-brand-gold-light transition-colors active:scale-95 shadow-premium text-lg"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
        اطلبي الآن – الدفع عند الاستلام
      </button>
    </div>
  )
}
