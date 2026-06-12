'use client'

import Link from 'next/link'
import { Product } from '@/types'
import { useCartStore } from '@/store/cartStore'
import { PRICING_TIERS } from '@/lib/products'
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
    <Link href={`/products/${product.slug}`} className="group">
      <div className="card p-4 hover:shadow-md transition-shadow duration-200">
        {/* Product Image Placeholder */}
        <div
          className={`rounded-xl mb-3 flex items-center justify-center overflow-hidden ${compact ? 'h-32' : 'h-48'}`}
          style={{
            background: `linear-gradient(135deg, ${product.gradientFrom}, ${product.gradientTo})`,
          }}
        >
          <span className="text-5xl md:text-6xl">
            {product.category === 'serum' ? '💊' : product.category === 'eye-care' ? '👁️' : '🌿'}
          </span>
        </div>

        {/* Info */}
        <div>
          <h3 className={`font-bold text-brand-blue leading-tight mb-1 group-hover:text-brand-blue-light transition-colors ${compact ? 'text-sm' : 'text-base'}`}>
            {product.nameAr}
          </h3>
          {!compact && (
            <p className="text-gray-500 text-xs mb-2 leading-relaxed line-clamp-2">
              {product.subtitleAr}
            </p>
          )}

          {/* Rating */}
          <div className="flex items-center gap-1 mb-2">
            <StarRating rating={product.rating} />
            <span className="text-xs text-gray-400">({product.reviewCount.toLocaleString('ar-SA')})</span>
          </div>

          {/* Price */}
          <div className="flex items-center justify-between">
            <span className="font-bold text-brand-blue text-lg">
              {product.price} ريال
            </span>
            {showAddButton && (
              <button
                onClick={handleQuickAdd}
                className="text-xs bg-brand-blue text-white px-3 py-1.5 rounded-lg hover:bg-brand-blue-light transition-colors active:scale-95"
              >
                + أضف
              </button>
            )}
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
          className={`w-3 h-3 ${star <= Math.round(rating) ? 'text-yellow-400' : 'text-gray-200'}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  )
}
