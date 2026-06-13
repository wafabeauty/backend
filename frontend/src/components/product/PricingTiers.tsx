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
    <div className="bg-white rounded-3xl border border-brand-blue/5 shadow-premium p-8">
      {/* Rating */}
      <div className="flex items-center gap-2 mb-6">
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((s) => (
            <svg key={s} className="w-4 h-4 text-brand-gold" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
        </div>
        <span className="text-brand-blue font-black text-sm">{product.rating}</span>
        <span className="text-gray-400 text-xs font-medium tracking-wider">({product.reviewCount.toLocaleString('ar-SA')} تقييم موثق)</span>
      </div>

      <h1 className="text-2xl md:text-3xl font-black text-brand-blue mb-4 leading-[1.2] tracking-tight">
        {product.nameAr}
      </h1>
      <p className="text-slate-500 text-sm mb-8 leading-relaxed font-medium">{product.subtitleAr}</p>

      {/* Scarcity */}
      <div className="flex items-center gap-3 bg-red-50/50 border border-red-100/50 rounded-xl px-4 py-3 mb-8">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
        </span>
        <p className="text-red-800 text-xs font-bold tracking-wide">
          الكمية محدودة جداً بسبب الطلب العالي
        </p>
      </div>

      {/* Pricing Tiers */}
      <p className="text-brand-blue font-black text-sm mb-4">اختاري خطتك العلاجية:</p>
      <div className="space-y-4 mb-8">
        {PRICING_TIERS.map((tier) => (
          <button
            key={tier.quantity}
            onClick={() => setSelectedTier(tier)}
            className={clsx(
              'w-full flex items-center justify-between p-5 rounded-2xl border-2 transition-all duration-300 text-right group',
              selectedTier.quantity === tier.quantity
                ? 'border-brand-gold bg-brand-gold/5 shadow-[0_4px_20px_rgba(212,175,55,0.1)]'
                : 'border-gray-100 hover:border-brand-gold/50'
            )}
          >
            <div className="flex items-center gap-4">
              <div
                className={clsx(
                  'w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors',
                  selectedTier.quantity === tier.quantity
                    ? 'border-brand-gold'
                    : 'border-gray-300 group-hover:border-brand-gold/50'
                )}
              >
                {selectedTier.quantity === tier.quantity && (
                  <div className="w-2.5 h-2.5 rounded-full bg-brand-gold" />
                )}
              </div>
              <div className="text-right">
                <p className={clsx(
                  'font-black text-sm',
                  selectedTier.quantity === tier.quantity ? 'text-brand-blue' : 'text-slate-600'
                )}>
                  {tier.labelAr}
                </p>
                {tier.savings && (
                  <p className="text-brand-green text-xs font-bold mt-1 tracking-wide">{tier.savings}</p>
                )}
              </div>
            </div>

            <div className="text-left flex flex-col items-end">
              <p className="text-xs text-slate-400 font-bold line-through mb-0.5">
                {Math.round(product.price / 0.7) * tier.quantity} SAR
              </p>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-black bg-red-50 text-red-500 px-1.5 py-0.5 rounded-sm border border-red-100">
                  -{Math.round((((Math.round(product.price / 0.7) * tier.quantity) - tier.price) / (Math.round(product.price / 0.7) * tier.quantity)) * 100)}%
                </span>
                <p className={clsx(
                  'font-black text-xl leading-none',
                  selectedTier.quantity === tier.quantity ? 'text-brand-blue' : 'text-slate-600'
                )}>
                  {tier.price} <span className="text-xs">SAR</span>
                </p>
              </div>
              {tier.popular && (
                <span className="text-[10px] bg-brand-gold text-brand-blue-dark px-2 py-0.5 rounded-sm font-black uppercase tracking-wider mt-1.5">
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
        className="w-full bg-brand-blue text-white font-black py-5 rounded-full hover:bg-brand-blue-light hover:shadow-premium transition-all duration-300 active:scale-[0.98] shadow-lg shadow-brand-blue/20 text-lg flex items-center justify-center gap-3"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
        </svg>
        إضافة للحقيبة – {selectedTier.price} SAR
      </button>

      <div className="flex items-center justify-center gap-4 mt-6 border-t border-gray-100 pt-6">
        <div className="flex items-center gap-2 text-slate-400">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
          </svg>
          <span className="text-[10px] font-bold uppercase tracking-wider">الدفع عند الاستلام</span>
        </div>
        <span className="w-1 h-1 bg-gray-200 rounded-full" />
        <div className="flex items-center gap-2 text-slate-400">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
          </svg>
          <span className="text-[10px] font-bold uppercase tracking-wider">شحن مجاني +199</span>
        </div>
      </div>
    </div>
  )
}
