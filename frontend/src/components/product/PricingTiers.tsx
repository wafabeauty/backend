'use client'

import { useState } from 'react'
import { Product, PricingTier } from '@/types'
import { PRICING_TIERS } from '@/lib/products'
import { useCartStore } from '@/store/cartStore'
import { trackAddToCart } from '@/lib/pixels'
import clsx from 'clsx'

interface PricingTiersProps {
  product: Product
}

export default function PricingTiers({ product }: PricingTiersProps) {
  const [selectedTier, setSelectedTier] = useState<PricingTier>(PRICING_TIERS[1])
  const { addItem } = useCartStore()

  const handleAddToCart = () => {
    addItem(product, selectedTier)
    trackAddToCart(product.nameAr, selectedTier.price)
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
      {/* Rating */}
      <div className="flex items-center gap-2 mb-4">
        <div className="flex">
          {[1, 2, 3, 4, 5].map((s) => (
            <span key={s} className="text-yellow-400">★</span>
          ))}
        </div>
        <span className="text-gray-700 font-semibold">{product.rating}</span>
        <span className="text-gray-400 text-sm">({product.reviewCount.toLocaleString('ar-SA')} تقييم)</span>
      </div>

      <h1 className="text-xl md:text-2xl font-black text-brand-blue mb-2 leading-tight">
        {product.nameAr}
      </h1>
      <p className="text-gray-500 text-sm mb-6 leading-relaxed">{product.subtitleAr}</p>

      {/* Scarcity */}
      <div className="flex items-center gap-2 bg-red-50 border border-red-100 rounded-lg px-3 py-2 mb-6">
        <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse flex-shrink-0" />
        <p className="text-red-600 text-xs font-semibold">
          الكمية محدودة جداً بسبب الطلب العالي – اطلبي الآن
        </p>
      </div>

      {/* Pricing Tiers */}
      <p className="text-gray-700 font-bold text-sm mb-3">اختاري الكمية المناسبة:</p>
      <div className="space-y-3 mb-6">
        {PRICING_TIERS.map((tier) => (
          <button
            key={tier.quantity}
            onClick={() => setSelectedTier(tier)}
            className={clsx(
              'w-full flex items-center justify-between p-4 rounded-xl border-2 transition-all duration-200 text-right',
              selectedTier.quantity === tier.quantity
                ? 'border-brand-blue bg-brand-blue/5 shadow-sm'
                : 'border-gray-200 hover:border-gray-300'
            )}
          >
            <div className="flex items-center gap-3">
              <div
                className={clsx(
                  'w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0',
                  selectedTier.quantity === tier.quantity
                    ? 'border-brand-blue'
                    : 'border-gray-300'
                )}
              >
                {selectedTier.quantity === tier.quantity && (
                  <div className="w-2.5 h-2.5 rounded-full bg-brand-blue" />
                )}
              </div>
              <div className="text-right">
                <p className={clsx(
                  'font-bold text-sm',
                  selectedTier.quantity === tier.quantity ? 'text-brand-blue' : 'text-gray-700'
                )}>
                  {tier.labelAr}
                </p>
                {tier.savings && (
                  <p className="text-brand-green text-xs font-semibold mt-0.5">🎁 {tier.savings}</p>
                )}
              </div>
            </div>

            <div className="text-left">
              <p className={clsx(
                'font-black text-lg',
                selectedTier.quantity === tier.quantity ? 'text-brand-blue' : 'text-gray-700'
              )}>
                {tier.price} ريال
              </p>
              {tier.popular && (
                <span className="text-xs bg-brand-green text-white px-2 py-0.5 rounded-full font-bold">
                  الأكثر طلباً
                </span>
              )}
            </div>
          </button>
        ))}
      </div>

      {/* CTA Button */}
      <button
        onClick={handleAddToCart}
        className="w-full bg-brand-blue text-white font-black py-4 rounded-xl hover:bg-brand-blue-light transition-all duration-200 active:scale-95 shadow-lg shadow-brand-blue/25 text-lg"
      >
        🛒 أضف إلى السلة – {selectedTier.price} ريال
      </button>

      <p className="text-center text-gray-400 text-xs mt-3">
        الدفع عند الاستلام | شحن مجاني للطلبات أكثر من 199 ريال
      </p>
    </div>
  )
}
