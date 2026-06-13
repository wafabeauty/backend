'use client'

import Link from 'next/link'
import { Product } from '@/types'
import { useCartStore } from '@/store/cartStore'
import { trackAddToCart } from '@/lib/pixels'

interface ProductCardProps {
  product: Product
  showAddButton?: boolean
  compact?: boolean
}

export default function ProductCard({ product, showAddButton = false, compact = false }: ProductCardProps) {
  const { addCrossSell } = useCartStore()

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault()
    addCrossSell(product)
    trackAddToCart(product.nameAr, product.price)
  }

  return (
    <Link href={`/products/${product.slug}`} className="group block h-full">
      <div className="card h-full flex flex-col overflow-hidden relative p-5 group-hover:-translate-y-1 transition-all duration-500">
        
        {/* Category Label */}
        <div className="absolute top-5 right-5 z-10">
          <span className="bg-white/90 backdrop-blur-md text-brand-blue text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest shadow-sm">
            {product.category === 'serum' ? 'Serum' : product.category === 'eye-care' ? 'Eye Care' : 'Hair Care'}
          </span>
        </div>

        {/* Product Image Placeholder */}
        <div
          className={`rounded-2xl mb-5 flex items-center justify-center overflow-hidden transition-transform duration-700 group-hover:scale-[1.02] ${compact ? 'h-40' : 'h-64'}`}
          style={{
            background: `linear-gradient(135deg, ${product.gradientFrom}, ${product.gradientTo})`,
          }}
        >
          <div className="text-white/20">
            <svg className="w-24 h-24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={0.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
            </svg>
          </div>
        </div>

        {/* Info */}
        <div className="flex-1 flex flex-col">
          <h3 className={`font-black text-brand-blue leading-tight mb-2 group-hover:text-brand-gold transition-colors ${compact ? 'text-sm' : 'text-lg'}`}>
            {product.nameAr}
          </h3>
          {!compact && (
            <p className="text-gray-500 text-sm mb-4 leading-relaxed line-clamp-2 font-medium">
              {product.subtitleAr}
            </p>
          )}

          <div className="mt-auto">
            {/* Rating */}
            <div className="flex items-center gap-1.5 mb-4">
              <StarRating rating={product.rating} />
              <span className="text-xs text-gray-400 font-semibold tracking-wider">({product.reviewCount.toLocaleString('ar-SA')})</span>
            </div>

            {/* Price & CTA */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
              <div className="flex flex-col">
                <span className="text-xs text-gray-400 font-bold line-through mb-0.5">
                  {Math.round(product.price / 0.7)} SAR
                </span>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-black bg-red-50 text-red-500 px-1.5 py-0.5 rounded-sm border border-red-100">
                    -30%
                  </span>
                  <span className="font-black text-brand-blue text-xl leading-none">
                    {product.price} <span className="text-sm font-bold text-gray-400">SAR</span>
                  </span>
                </div>
              </div>
              {showAddButton ? (
                <button
                  onClick={handleQuickAdd}
                  className="bg-brand-blue text-white px-5 py-2 rounded-full text-sm font-bold hover:bg-brand-gold hover:text-brand-blue transition-colors duration-300 shadow-md"
                >
                  إضافة
                </button>
              ) : (
                <span className="text-brand-gold group-hover:translate-x-[-4px] transition-transform duration-300">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          className={`w-3.5 h-3.5 ${star <= Math.round(rating) ? 'text-brand-gold' : 'text-gray-200'}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  )
}
