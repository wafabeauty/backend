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

      <main className="overflow-hidden">
        <HomeHero />

        {/* Trust Badges Bar */}
        <section className="bg-white py-10 border-b border-gray-100">
          <div className="max-w-5xl mx-auto px-4">
            <TrustBadges />
          </div>
        </section>

        {/* Products Section */}
        <section id="products" className="py-24 px-4 bg-brand-off-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <span className="text-brand-gold font-bold tracking-[0.2em] uppercase text-xs mb-3 block">Our Collection</span>
              <h2 className="section-title">البروتوكول السريري الثلاثي</h2>
              <div className="w-12 h-1 bg-brand-gold mx-auto mt-6 mb-6" />
              <p className="text-slate-500 text-base max-w-2xl mx-auto font-medium leading-relaxed">
                ثلاثة حلول مُصممة بدقة لمواجهة المشكلات الجلدية الناتجة عن بيئتنا الخليجية الفريدة
              </p>
            </div>
            <ProductsGrid />
          </div>
        </section>

        <WhyWafa />
        <SocialProof />

        {/* CTA Section */}
        <section className="relative bg-brand-blue py-32 px-4 text-center overflow-hidden">
          <div className="absolute inset-0 bg-premium-gradient opacity-90" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl aspect-square bg-brand-gold/5 blur-[120px] rounded-full pointer-events-none" />
          
          <div className="relative max-w-3xl mx-auto z-10">
            <span className="text-brand-gold font-bold tracking-[0.2em] uppercase text-xs mb-6 block">Ready for the change?</span>
            <h2 className="text-3xl md:text-5xl font-black text-white mb-6 leading-tight">
              ابدئي بروتوكولك السريري اليوم
            </h2>
            <p className="text-white/70 mb-12 text-lg leading-relaxed max-w-xl mx-auto font-medium">
              انضمي إلى آلاف النساء السعوديات اللواتي استعدن ثقتهن ببشرتهن من خلال حلول طبية مُثبتة.
            </p>
            <a
              href="/products/kojic-serum"
              className="inline-block bg-brand-gold text-brand-blue-dark font-black text-lg py-5 px-12 rounded-full hover:bg-brand-gold-light hover:shadow-[0_0_40px_rgba(212,175,55,0.3)] transition-all duration-300 active:scale-95"
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
