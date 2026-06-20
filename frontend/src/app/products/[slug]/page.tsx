import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Script from 'next/script'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import CartDrawer from '@/components/cart/CartDrawer'
import CheckoutModal from '@/components/checkout/CheckoutModal'
import FlashUpsell from '@/components/checkout/FlashUpsell'
import PricingTiers from '@/components/product/PricingTiers'
import ProductSections from '@/components/product/ProductSections'
import TrustBadges from '@/components/ui/TrustBadges'
import ProductCard from '@/components/ui/ProductCard'
import MobileStickyCTA from '@/components/product/MobileStickyCTA'
import ProductTracker from '@/components/product/ProductTracker'
import ProductFAQ from '@/components/product/ProductFAQ'
import BeforeAfter from '@/components/product/BeforeAfter'
import { getProductBySlug, getCrossSells, PRODUCTS } from '@/lib/products'

interface PageProps {
  params: { slug: string }
}

export async function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const product = getProductBySlug(params.slug)
  if (!product) return { title: 'المنتج غير موجود' }
  const url = `https://wafabeauty.shop/products/${product.slug}`
  return {
    title: `${product.nameAr} | وفاء للجمال`,
    description: product.descriptionAr,
    keywords: [product.nameAr, product.nameEn, 'وفاء للجمال', 'Wafa Beauty', 'السعودية', 'KSA', ...product.ingredients],
    alternates: { canonical: url },
    openGraph: {
      title: `${product.nameAr} | وفاء للجمال`,
      description: product.descriptionAr,
      url,
      type: 'website',
      locale: 'ar_SA',
      siteName: 'وفاء للجمال',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${product.nameAr} | وفاء للجمال`,
      description: product.descriptionAr,
    },
  }
}

export default function ProductPage({ params }: PageProps) {
  const product = getProductBySlug(params.slug)
  if (!product) notFound()

  const crossSells = getCrossSells(params.slug)

  const productJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.nameAr,
    description: product.descriptionAr,
    brand: { '@type': 'Brand', name: 'وفاء للجمال' },
    offers: {
      '@type': 'Offer',
      price: product.price,
      priceCurrency: 'SAR',
      availability: 'https://schema.org/InStock',
      url: `https://wafabeauty.shop/products/${product.slug}`,
      seller: { '@type': 'Organization', name: 'وفاء للجمال' },
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: product.rating,
      reviewCount: product.reviewCount,
      bestRating: 5,
    },
  }

  return (
    <>
      <Script id={`product-jsonld-${product.slug}`} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }} />
      <ProductTracker product={product} />
      <Header />
      <CartDrawer />
      <CheckoutModal />
      <FlashUpsell />

      <main className="pb-24 md:pb-0 pt-20">
        {/* Breadcrumb */}
        <div className="bg-brand-off-white border-b border-brand-blue/5 py-3 px-4">
          <div className="max-w-7xl mx-auto">
            <nav className="text-xs text-slate-400 flex items-center gap-2 font-bold tracking-wide uppercase">
              <a href="/" className="hover:text-brand-gold transition-colors">Home</a>
              <span>/</span>
              <span className="text-brand-blue">{product.nameAr}</span>
            </nav>
          </div>
        </div>

        {/* Product Hero */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-16 items-start">
            
            {/* Product Image */}
            <div className="md:col-span-6 lg:col-span-7 order-1 md:order-1 relative group">
              <div className="absolute inset-0 bg-brand-gold/10 blur-[80px] rounded-full group-hover:bg-brand-gold/20 transition-all duration-700 pointer-events-none" />
              <div
                className="relative rounded-[2.5rem] w-full aspect-square flex items-center justify-center shadow-premium overflow-hidden border border-brand-blue/5 group-hover:scale-[1.02] transition-transform duration-700"
                style={{
                  background: `linear-gradient(135deg, ${product.gradientFrom}, ${product.gradientTo})`,
                }}
              >
                <div className="absolute inset-0 bg-[url('/noise.svg')] opacity-[0.03] mix-blend-overlay" />
                <div className="text-center relative z-10">
                  <div className="text-white/20 mb-6 flex justify-center">
                    <svg className="w-40 h-40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={0.5}>
                      {product.category === 'serum' && <path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />}
                      {product.category === 'eye-care' && <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />}
                      {product.category === 'hair-care' && <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />}
                    </svg>
                  </div>
                  <p className="text-white/80 font-bold text-sm px-8 tracking-[0.2em] uppercase">{product.nameEn}</p>
                </div>
              </div>

              {/* Ingredients tags */}
              <div className="mt-8 flex flex-wrap gap-3 justify-center">
                {product.ingredients.map((ing) => (
                  <span key={ing} className="bg-brand-blue/5 text-brand-blue text-xs font-bold px-4 py-2 rounded-full border border-brand-blue/10 tracking-wide flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-brand-gold rounded-full" />
                    {ing}
                  </span>
                ))}
              </div>
            </div>

            {/* Pricing & CTA */}
            <div className="md:col-span-6 lg:col-span-5 order-2 md:order-2 md:sticky md:top-28">
              <PricingTiers product={product} />
              <div className="mt-6">
                <TrustBadges />
              </div>
            </div>
          </div>
        </section>

        {/* Product Sections */}
        <ProductSections product={product} />

        {/* Before & After */}
        <BeforeAfter slug={params.slug} />

        {/* FAQ */}
        <div className="border-t border-brand-blue/5 bg-brand-off-white">
          <ProductFAQ slug={params.slug} />
        </div>

        {/* Cross-sells */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 bg-brand-off-white/50 border-t border-brand-blue/5">
          <div className="text-center mb-12">
            <span className="text-brand-gold font-bold tracking-[0.2em] uppercase text-xs mb-3 block">Complete The Protocol</span>
            <h2 className="text-3xl font-black text-brand-blue">منتجات يُشتري معها عادةً</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 lg:gap-12">
            {crossSells.map((p) => (
              <ProductCard key={p.id} product={p} showAddButton />
            ))}
          </div>
        </section>
      </main>

      {/* Mobile Sticky CTA */}
      <MobileStickyCTA product={product} />

      <Footer />
    </>
  )
}

