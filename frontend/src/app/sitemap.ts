import { MetadataRoute } from 'next'
import { PRODUCTS } from '@/lib/products'

const SITE_URL = 'https://wafabeauty.shop'

export default function sitemap(): MetadataRoute.Sitemap {
  const productUrls = PRODUCTS.map((product) => ({
    url: `${SITE_URL}/products/${product.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }))

  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    ...productUrls,
  ]
}
