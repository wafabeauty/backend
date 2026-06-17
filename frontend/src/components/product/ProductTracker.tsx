'use client'

import { useEffect } from 'react'
import { trackViewContent } from '@/lib/pixels'
import { Product } from '@/types'

export default function ProductTracker({ product }: { product: Product }) {
  useEffect(() => {
    trackViewContent(product.nameAr, product.price)
  }, [product.nameAr, product.price])

  return null
}
