import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import CartDrawer from '@/components/cart/CartDrawer'
import CheckoutModal from '@/components/checkout/CheckoutModal'
import FlashUpsell from '@/components/checkout/FlashUpsell'
import PricingTiers from '@/components/product/PricingTiers'
import ProductSections from '@/components/product/ProductSections'
import TrustBadges from '@/components/ui/TrustBadges'
import ProductCard from '@/components/ui/ProductCard'
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
  return {
    title: `${product.nameAr} | وفاء للجمال`,
    description: product.descriptionAr,
  }
}

export default function ProductPage({ params }: PageProps) {
  const product = getProductBySlug(params.slug)
  if (!product) notFound()

  const crossSells = getCrossSells(params.slug)

  return (
    <>
      <Header />
      <CartDrawer />
      <CheckoutModal />
      <FlashUpsell />

      <main className="pb-24 md:pb-0">
        {/* Breadcrumb */}
        <div className="bg-white border-b border-gray-100 py-3 px-4">
          <div className="max-w-7xl mx-auto">
            <nav className="text-sm text-gray-400 flex items-center gap-2">
              <a href="/" className="hover:text-brand-blue transition-colors">الرئيسية</a>
              <span>/</span>
              <span className="text-gray-600 font-medium line-clamp-1">{product.nameAr}</span>
            </nav>
          </div>
        </div>

        {/* Product Hero */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-start">
            {/* Product Image */}
            <div className="order-1 md:order-1">
              <div
                className="rounded-3xl w-full aspect-square flex items-center justify-center shadow-2xl"
                style={{
                  background: `linear-gradient(135deg, ${product.gradientFrom}, ${product.gradientTo})`,
                }}
              >
                <div className="text-center">
                  <div className="text-9xl mb-4">
                    {product.category === 'serum' ? '💊' : product.category === 'eye-care' ? '👁️' : '🌿'}
                  </div>
                  <p className="text-white/80 font-semibold text-sm px-8 leading-relaxed">{product.nameEn}</p>
                </div>
              </div>

              {/* Ingredients tags */}
              <div className="mt-4 flex flex-wrap gap-2">
                {product.ingredients.map((ing) => (
                  <span key={ing} className="bg-brand-blue/5 text-brand-blue text-xs font-semibold px-3 py-1.5 rounded-full border border-brand-blue/10">
                    🧪 {ing}
                  </span>
                ))}
              </div>
            </div>

            {/* Pricing & CTA */}
            <div className="order-2 md:order-2 md:sticky md:top-24">
              <PricingTiers product={product} />
              <div className="mt-4">
                <TrustBadges />
              </div>
            </div>
          </div>
        </section>

        {/* Product Sections */}
        <ProductSections product={product} />

        {/* Cross-sells */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h2 className="section-title mb-8">منتجات يُشتري معها عادةً</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
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

function MobileStickyCTA({ product }: { product: ReturnType<typeof getProductBySlug> }) {
  if (!product) return null
  return (
    <div className="sticky-cta md:hidden">
      <a
        href="#top"
        onClick={(e) => {
          e.preventDefault()
          window.scrollTo({ top: 0, behavior: 'smooth' })
        }}
        className="block w-full bg-brand-blue text-white font-black py-4 rounded-xl text-center hover:bg-brand-blue-light transition-colors active:scale-95 shadow-lg"
      >
        اطلبي الآن – الدفع عند الاستلام
      </a>
    </div>
  )
}
