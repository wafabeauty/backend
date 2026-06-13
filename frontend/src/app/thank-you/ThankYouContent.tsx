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
      <main className="min-h-screen bg-brand-off-white pt-24">
        {/* Success Hero */}
        <section className="bg-brand-blue text-white py-20 px-4 relative overflow-hidden">
          <div className="absolute inset-0 bg-premium-gradient opacity-90" />
          <div className="absolute inset-0 bg-[url('/noise.svg')] opacity-[0.03] mix-blend-overlay" />
          
          {/* Abstract glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-gold/10 blur-[100px] rounded-full pointer-events-none" />

          <div className="relative max-w-2xl mx-auto text-center z-10">
            <div className="w-20 h-20 mx-auto bg-brand-gold rounded-full flex items-center justify-center mb-8 shadow-[0_0_40px_rgba(212,175,55,0.4)] animate-slide-bottom">
              <svg className="w-10 h-10 text-brand-blue-dark" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            
            <span className="text-brand-gold font-bold tracking-[0.2em] uppercase text-xs mb-4 block animate-slide-bottom" style={{ animationDelay: '0.1s' }}>
              Order Confirmed
            </span>
            
            <h1 className="text-4xl md:text-5xl font-black mb-6 tracking-tight animate-slide-bottom" style={{ animationDelay: '0.2s' }}>
              تم استلام طلبك بنجاح
            </h1>
            
            <p className="text-white/70 text-lg leading-relaxed mb-8 max-w-lg mx-auto font-medium animate-slide-bottom" style={{ animationDelay: '0.3s' }}>
              شكراً لثقتك بوفاء للجمال. سيتصل بك أحد خُبرائنا خلال 24 ساعة لتأكيد تفاصيل طلبك وبدء رحلتك العلاجية.
            </p>
            
            {orderId && (
              <div className="inline-flex items-center gap-3 bg-white/5 backdrop-blur-md border border-white/10 rounded-full px-6 py-3 animate-slide-bottom" style={{ animationDelay: '0.4s' }}>
                <span className="text-brand-gold text-xs font-bold uppercase tracking-widest">Order ID</span>
                <span className="w-1 h-1 bg-white/20 rounded-full" />
                <span className="font-bold text-white tracking-widest">{orderId.slice(0, 8).toUpperCase()}</span>
              </div>
            )}
          </div>
        </section>

        <section className="max-w-3xl mx-auto px-4 py-16 space-y-8 relative -mt-12 z-20">

          {/* What's next */}
          <div className="bg-white rounded-[2rem] border border-brand-blue/5 shadow-premium p-8 md:p-10">
            <h2 className="font-black text-brand-blue text-2xl mb-8 tracking-tight">ماذا يحدث الآن؟</h2>
            <div className="space-y-6">
              {[
                { 
                  icon: <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />, 
                  title: 'مكالمة التأكيد', 
                  desc: 'سيتصل بك مندوبنا خلال 24 ساعة لتأكيد الطلب والعنوان' 
                },
                { 
                  icon: <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />, 
                  title: 'التحضير والتغليف', 
                  desc: 'يتم تحضير طلبك وتغليفه بعناية فائقة لضمان الجودة' 
                },
                { 
                  icon: <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />, 
                  title: 'الشحن السريع', 
                  desc: 'يصلك طلبك خلال 2-4 أيام عمل أينما كنتِ في المملكة' 
                },
                { 
                  icon: <path strokeLinecap="round" strokeLinejoin="round" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />, 
                  title: 'الدفع عند الاستلام', 
                  desc: 'لا تدفعي شيئاً حتى تستلمي منتجاتك وتتأكدي منها بنفسك' 
                },
              ].map((item, i) => (
                <div key={item.title} className="flex items-start gap-5 group">
                  <div className="w-12 h-12 rounded-full bg-brand-off-white flex items-center justify-center flex-shrink-0 group-hover:bg-brand-blue group-hover:text-brand-gold transition-colors duration-300 border border-brand-blue/5">
                    <svg className="w-5 h-5 text-brand-blue group-hover:text-brand-gold transition-colors duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      {item.icon}
                    </svg>
                  </div>
                  <div className="pt-1">
                    <p className="font-bold text-brand-blue text-lg mb-1">{item.title}</p>
                    <p className="text-slate-500 text-sm font-medium leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Upsell confirmation */}
          {upsellAccepted && (
            <div className="bg-brand-gold/10 border border-brand-gold/20 rounded-[2rem] p-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-brand-gold/20 blur-3xl rounded-full" />
              
              <div className="flex items-start gap-5 relative z-10">
                <div className="w-12 h-12 rounded-full bg-brand-gold flex items-center justify-center flex-shrink-0 shadow-lg shadow-brand-gold/30">
                  <svg className="w-6 h-6 text-brand-blue-dark" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <span className="text-brand-gold font-bold tracking-[0.2em] uppercase text-[10px] mb-1 block">Protocol Upgraded</span>
                  <p className="font-black text-brand-blue text-xl mb-2">تم ترقية بروتوكولك بنجاح</p>
                  <p className="text-slate-600 text-sm font-medium leading-relaxed">
                    تمت إضافة المنتج الإضافي لطلبك بسعر <span className="font-bold text-brand-blue">{UPSELL_PRICE} SAR</span>. اختيارك للبروتوكول الكامل سيمنحك أفضل وأسرع النتائج.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Trust */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { 
                icon: <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />, 
                label: '100% منتجات أصلية' 
              },
              { 
                icon: <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />, 
                label: 'الدفع عند الاستلام' 
              },
              { 
                icon: <path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />, 
                label: 'مُعتمد من أطباء الجلدية' 
              },
            ].map((item) => (
              <div key={item.label} className="bg-white rounded-2xl p-6 text-center border border-brand-blue/5 shadow-sm">
                <svg className="w-8 h-8 text-brand-gold mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  {item.icon}
                </svg>
                <p className="text-brand-blue text-sm font-bold tracking-wide">{item.label}</p>
              </div>
            ))}
          </div>

          {/* Cross-sells */}
          <div className="pt-8 border-t border-brand-blue/5">
            <div className="flex items-center justify-between mb-8">
              <h2 className="font-black text-brand-blue text-2xl tracking-tight">أكملي مجموعتك</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {PRODUCTS.map((product) => (
                <div key={product.id} className="h-[280px]">
                  <ProductCard product={product} compact />
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="text-center pt-8">
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-3 bg-white border border-brand-blue/10 text-brand-blue font-bold py-4 px-10 rounded-full hover:bg-brand-blue hover:text-white transition-all duration-300 active:scale-95 shadow-sm"
            >
              العودة إلى الرئيسية
              <svg className="w-5 h-5 rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
