'use client'

import { useEffect } from 'react'
import { trackViewContent } from '@/lib/pixels'
import { trackClick } from '@/lib/adminApi'
import { Product } from '@/types'

export default function ProductTracker({ product }: { product: Product }) {
  useEffect(() => {
    trackViewContent(product.nameAr, product.price)
    trackClick(product.slug)
  }, [product.nameAr, product.price, product.slug])

  return null
}
