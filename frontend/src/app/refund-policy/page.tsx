import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import CartDrawer from '@/components/cart/CartDrawer'
import CheckoutModal from '@/components/checkout/CheckoutModal'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'سياسة الإرجاع والاسترداد | وفاء للجمال',
  description: 'سياسة إرجاع واسترداد المنتجات لوفاء للجمال — ضمان رضاك التام',
}

const steps = [
  { num: '01', title: 'تواصل معنا', desc: 'أرسل لنا بريداً إلكترونياً على contactwafabeauty@gmail.com مع رقم طلبك وسبب الإرجاع خلال 7 أيام من الاستلام.' },
  { num: '02', title: 'مراجعة الطلب', desc: 'يراجع فريقنا طلب الإرجاع خلال 24-48 ساعة عمل ويتواصل معك لتأكيده وترتيب الاستلام.' },
  { num: '03', title: 'الاستلام والفحص', desc: 'يتوجه مندوبنا لاستلام المنتج وفحصه للتأكد من استيفاء شروط الإرجاع.' },
  { num: '04', title: 'استرداد المبلغ', desc: 'يُستردّ المبلغ نقداً فور تأكيد الاستلام والفحص، أو يُحسم من أي طلب مستقبلي حسب تفضيلك.' },
]

export default function RefundPolicyPage() {
  return (
    <>
      <Header />
      <CartDrawer />
      <CheckoutModal />

      <main className="pt-32 pb-24 px-4 bg-brand-off-white min-h-screen">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-brand-gold font-bold tracking-[0.2em] uppercase text-xs mb-3 block">Returns & Refunds</span>
            <h1 className="text-4xl font-black text-brand-blue mb-4">سياسة الإرجاع والاسترداد</h1>
            <div className="w-12 h-1 bg-brand-gold mx-auto mb-6" />
            <p className="text-slate-500 text-sm font-medium max-w-xl mx-auto leading-relaxed">
              رضاك هو أولويتنا. إذا لم تكوني راضية تماماً عن منتجاتنا، يسعدنا مساعدتك.
            </p>
          </div>

          {/* Guarantee Banner */}
          <div className="bg-brand-blue rounded-3xl p-8 mb-10 text-white text-center">
            <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-brand-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h2 className="font-black text-2xl mb-2">ضمان الرضا 7 أيام</h2>
            <p className="text-white/70 text-sm font-medium leading-relaxed max-w-md mx-auto">
              نضمن جودة منتجاتنا بشكل كامل. لديك 7 أيام من تاريخ الاستلام لطلب الإرجاع.
            </p>
          </div>

          <div className="space-y-6 mb-10">
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
              <h2 className="font-black text-brand-blue text-xl mb-6">شروط قبول الإرجاع</h2>
              <div className="space-y-4">
                {[
                  { ok: true, text: 'المنتج في حالته الأصلية غير مفتوح ولم يُستخدم' },
                  { ok: true, text: 'الإرجاع خلال 7 أيام من تاريخ الاستلام' },
                  { ok: true, text: 'عيب مصنعي أو تلف في المنتج عند التسليم' },
                  { ok: true, text: 'منتج مختلف عما تم طلبه' },
                  { ok: false, text: 'المنتج مفتوح أو مستخدم جزئياً (لأسباب صحية وسلامة العملاء)' },
                  { ok: false, text: 'انتهاء فترة الـ 7 أيام المحددة' },
                  { ok: false, text: 'المنتج تالف بسبب سوء الاستخدام' },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className={`w-6 h-6 rounded-full flex-shrink-0 flex items-center justify-center mt-0.5 ${item.ok ? 'bg-brand-green/10 text-brand-green' : 'bg-red-50 text-red-500'}`}>
                      {item.ok ? (
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      ) : (
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      )}
                    </div>
                    <p className={`text-sm font-medium ${item.ok ? 'text-slate-700' : 'text-slate-400'}`}>{item.text}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Steps */}
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
              <h2 className="font-black text-brand-blue text-xl mb-8">خطوات الإرجاع</h2>
              <div className="space-y-8">
                {steps.map((step, i) => (
                  <div key={i} className="flex gap-6 items-start">
                    <div className="w-14 h-14 rounded-2xl bg-brand-blue flex items-center justify-center text-brand-gold font-black text-lg flex-shrink-0">
                      {step.num}
                    </div>
                    <div>
                      <h3 className="font-black text-brand-blue text-base mb-2">{step.title}</h3>
                      <p className="text-slate-500 text-sm font-medium leading-relaxed">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
              <h2 className="font-black text-brand-blue text-xl mb-4">الاستثناءات الخاصة</h2>
              <p className="text-slate-600 text-sm font-medium leading-relaxed">
                بسبب طبيعة منتجات العناية بالبشرة والصحة العامة، لا نقبل إرجاع المنتجات المفتوحة أو المستخدمة حتى ولو جزئياً — إلا في حالة وجود عيب مصنعي مثبت أو تفاعل جلدي موثق من قِبل طبيب مختص. في هذه الحالات، يرجى التواصل معنا فوراً ونتعامل مع كل حالة باهتمام وعناية.
              </p>
            </div>

            {/* CTA */}
            <div className="bg-brand-sand rounded-3xl p-8 text-center">
              <h3 className="font-black text-brand-blue text-lg mb-2">هل تحتاجين مساعدة؟</h3>
              <p className="text-slate-500 text-sm mb-6 font-medium">فريقنا جاهز للمساعدة في أي وقت</p>
              <a
                href="mailto:contactwafabeauty@gmail.com"
                className="inline-flex items-center gap-2 bg-brand-blue text-white font-bold px-8 py-3 rounded-full hover:bg-brand-blue-light transition-colors"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                contactwafabeauty@gmail.com
              </a>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  )
}
