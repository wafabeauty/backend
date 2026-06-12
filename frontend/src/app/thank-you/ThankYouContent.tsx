'use client'

import { useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { PRODUCTS, UPSELL_PRICE } from '@/lib/products'
import ProductCard from '@/components/ui/ProductCard'

export default function ThankYouContent() {
  const searchParams = useSearchParams()
  const orderId = searchParams.get('order')
  const upsellAccepted = searchParams.get('upsell') === 'yes'

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <>
      <Header />
      <main className="min-h-screen bg-brand-off-white">
        {/* Success Hero */}
        <section className="bg-gradient-to-br from-brand-green to-brand-green-light text-white py-16 px-4">
          <div className="max-w-2xl mx-auto text-center">
            <div className="text-7xl mb-6 animate-bounce">🎉</div>
            <h1 className="text-3xl md:text-4xl font-black mb-4">
              تم استلام طلبك بنجاح!
            </h1>
            <p className="text-green-100 text-base leading-relaxed mb-4">
              شكراً لثقتك بوفاء للجمال. سيتصل بك أحد مندوبينا خلال 24 ساعة لتأكيد الطلب.
            </p>
            {orderId && (
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full px-4 py-2">
                <span className="text-green-100 text-sm">رقم طلبك:</span>
                <span className="font-bold text-white text-sm">#{orderId.slice(0, 8).toUpperCase()}</span>
              </div>
            )}
          </div>
        </section>

        <section className="max-w-2xl mx-auto px-4 py-12 space-y-6">

          {/* What's next */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <h2 className="font-black text-brand-blue text-lg mb-5">ماذا يحدث الآن؟</h2>
            <div className="space-y-4">
              {[
                { icon: '📞', title: 'مكالمة التأكيد', desc: 'سيتصل بك مندوبنا خلال 24 ساعة لتأكيد الطلب والعنوان' },
                { icon: '📦', title: 'التحضير والتغليف', desc: 'يتم تحضير طلبك وتغليفه بعناية خلال 1-2 يوم عمل' },
                { icon: '🚀', title: 'الشحن والتوصيل', desc: 'يصلك طلبك خلال 2-4 أيام عمل على باب منزلك' },
                { icon: '💳', title: 'الدفع عند الاستلام', desc: 'تدفعين فقط عند استلام المنتج وتأكدك منه' },
              ].map((item) => (
                <div key={item.title} className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-brand-blue/10 flex items-center justify-center flex-shrink-0">
                    <span className="text-xl">{item.icon}</span>
                  </div>
                  <div>
                    <p className="font-bold text-gray-800 text-sm">{item.title}</p>
                    <p className="text-gray-500 text-xs mt-0.5 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Upsell confirmation */}
          {upsellAccepted && (
            <div className="bg-brand-green/5 border border-brand-green/20 rounded-2xl p-5">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-3xl">✅</span>
                <div>
                  <p className="font-bold text-brand-green">تمت إضافة منتج العرض الخاص!</p>
                  <p className="text-gray-600 text-xs">تم إضافة منتج الـ {UPSELL_PRICE} ريال لطلبك</p>
                </div>
              </div>
              <p className="text-gray-600 text-sm">
                رائع! البروتوكول الكامل سيعطيك أفضل النتائج في أقصر وقت ممكن.
              </p>
            </div>
          )}

          {/* Trust */}
          <div className="grid grid-cols-3 gap-3">
            {[
              { icon: '💳', label: 'الدفع عند الاستلام' },
              { icon: '↩️', label: 'ضمان الجودة' },
              { icon: '🛡️', label: 'منتجات أصلية 100%' },
            ].map((item) => (
              <div key={item.label} className="bg-white rounded-xl p-3 text-center border border-gray-100 shadow-sm">
                <span className="text-2xl">{item.icon}</span>
                <p className="text-gray-600 text-xs font-semibold mt-1 leading-tight">{item.label}</p>
              </div>
            ))}
          </div>

          {/* Cross-sells */}
          <div>
            <h2 className="font-black text-brand-blue text-lg mb-4">أكملي مجموعتك السريرية:</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {PRODUCTS.map((product) => (
                <ProductCard key={product.id} product={product} compact />
              ))}
            </div>
          </div>

          <div className="text-center">
            <Link
              href="/"
              className="inline-block bg-brand-blue text-white font-bold py-3 px-8 rounded-xl hover:bg-brand-blue-light transition-colors active:scale-95"
            >
              العودة إلى الرئيسية
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
