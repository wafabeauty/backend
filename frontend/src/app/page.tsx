import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import CartDrawer from '@/components/cart/CartDrawer'
import CheckoutModal from '@/components/checkout/CheckoutModal'
import FlashUpsell from '@/components/checkout/FlashUpsell'
import HomeHero from '@/components/home/HomeHero'
import ProductsGrid from '@/components/home/ProductsGrid'
import WhyWafa from '@/components/home/WhyWafa'
import SocialProof from '@/components/home/SocialProof'
import TrustBadges from '@/components/ui/TrustBadges'

export default function HomePage() {
  return (
    <>
      <Header />
      <CartDrawer />
      <CheckoutModal />
      <FlashUpsell />

      <main>
        <HomeHero />

        {/* Trust Badges Bar */}
        <section className="bg-white py-8 border-b border-gray-100">
          <div className="max-w-4xl mx-auto px-4">
            <TrustBadges />
          </div>
        </section>

        {/* Products Section */}
        <section id="products" className="py-16 px-4">
          <div className="max-w-7xl mx-auto">
            <h2 className="section-title">بروتوكولنا السريري الثلاثي</h2>
            <p className="text-center text-gray-500 mb-10 text-sm max-w-xl mx-auto">
              ثلاثة حلول مُصممة بدقة لمواجهة المشكلات الجلدية الناتجة عن بيئتنا الخليجية الفريدة
            </p>
            <ProductsGrid />
          </div>
        </section>

        <WhyWafa />
        <SocialProof />

        {/* CTA Section */}
        <section className="bg-brand-blue py-16 px-4 text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              ابدئي بروتوكولك السريري اليوم
            </h2>
            <p className="text-blue-200 mb-8 text-sm leading-relaxed">
              انضمي إلى آلاف النساء السعوديات اللواتي استعدن ثقتهن ببشرتهن
            </p>
            <a
              href="/products/kojic-serum"
              className="inline-block bg-white text-brand-blue font-bold py-4 px-10 rounded-xl hover:bg-blue-50 transition-all duration-200 active:scale-95 shadow-xl"
            >
              اطلبي الآن – الدفع عند الاستلام
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
