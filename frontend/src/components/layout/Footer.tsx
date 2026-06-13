import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-brand-blue text-white pt-20 pb-10 border-t border-brand-blue-light/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-8 mb-16">

          {/* Brand Info */}
          <div className="md:col-span-5">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-full bg-brand-gold flex items-center justify-center">
                <span className="text-brand-blue-dark font-black text-2xl">N</span>
              </div>
              <div className="leading-none flex flex-col justify-center">
                <span className="font-black text-white text-xl tracking-tight">وفاء للجمال</span>
                <span className="text-brand-gold text-xs font-bold tracking-[0.2em] uppercase mt-1">Wafa Beauty</span>
              </div>
            </div>
            <p className="text-white/60 text-sm leading-relaxed max-w-sm font-medium">
              حلول تجميلية سريرية مُصممة بدقة لمواجهة تحديات البيئة الخليجية. علم حقيقي، نتائج حقيقية، لبشرة لا تشوبها شائبة.
            </p>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 lg:col-start-7">
            <h3 className="font-bold text-white mb-6 text-sm tracking-widest uppercase">البروتوكول السريري</h3>
            <ul className="space-y-4">
              <li>
                <Link href="/products/kojic-serum" className="text-white/60 hover:text-brand-gold transition-colors text-sm font-medium flex items-center gap-2">
                  <span className="w-1 h-1 bg-brand-gold rounded-full" />
                  سيروم الكوجيك للتفتيح
                </Link>
              </li>
              <li>
                <Link href="/products/caffeine-roller" className="text-white/60 hover:text-brand-gold transition-colors text-sm font-medium flex items-center gap-2">
                  <span className="w-1 h-1 bg-brand-gold rounded-full" />
                  رولر الكافيين للعين
                </Link>
              </li>
              <li>
                <Link href="/products/sea-salt-scrub" className="text-white/60 hover:text-brand-gold transition-colors text-sm font-medium flex items-center gap-2">
                  <span className="w-1 h-1 bg-brand-gold rounded-full" />
                  مقشر الديتوكس للشعر
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal and Support */}
          <div className="md:col-span-4 lg:col-span-4">
            <details className="group cursor-pointer">
              <summary className="font-bold text-white text-sm tracking-widest uppercase flex items-center justify-between list-none [&::-webkit-details-marker]:hidden">
                <span>الدعم والخدمات</span>
                <svg className="w-5 h-5 transition-transform group-open:rotate-180 text-brand-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <div className="pt-6">
                <ul className="space-y-5">
                  <li className="text-white/60 text-sm font-medium">
                    <span className="block text-white mb-1 font-bold">البريد الإلكتروني</span>
                    <a href="mailto:contactwafabeauty@gmail.com" className="hover:text-brand-gold transition-colors block mt-1" dir="ltr">
                      contactwafabeauty@gmail.com
                    </a>
                  </li>
                  <li className="text-white/60 text-sm font-medium">
                    <span className="block text-white mb-1 font-bold">واتساب</span>
                    <span className="flex items-center gap-2 mt-1" dir="ltr">
                      <span className="w-2 h-2 rounded-full bg-brand-gold animate-pulse"></span>
                      قريباً (Soon)
                    </span>
                  </li>
                  <li className="text-white/60 text-sm font-medium">
                    <span className="block text-white mb-1 font-bold">ساعات العمل</span>
                    <span className="block leading-relaxed mt-1">
                      السبت - الخميس (Saturday - Thursday)<br />
                      9:00 صباحاً - 9:00 مساءً (9 AM - 9 PM)
                    </span>
                  </li>
                  <li className="pt-5 mt-5 border-t border-white/10">
                    <div className="flex flex-col gap-3">
                      <Link href="/contact" className="text-brand-gold hover:text-white transition-colors text-sm font-bold flex items-center gap-2">
                        صفحة الدعم التفصيلية
                        <svg className="w-4 h-4 rtl:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </Link>
                      <Link href="/privacy-policy" className="text-white/60 hover:text-white transition-colors text-sm font-medium">
                        سياسة الخصوصية
                      </Link>
                      <Link href="/terms" className="text-white/60 hover:text-white transition-colors text-sm font-medium">
                        الشروط والأحكام
                      </Link>
                      <Link href="/refund-policy" className="text-white/60 hover:text-white transition-colors text-sm font-medium">
                        سياسة الاسترجاع
                      </Link>
                    </div>
                  </li>
                </ul>
              </div>
            </details>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-white/40 text-xs font-medium tracking-wide">
            © {new Date().getFullYear()} WAFA BEAUTY. ALL RIGHTS RESERVED.
          </p>
          
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-2 text-white/50 text-xs font-bold uppercase tracking-wider">
              <svg className="w-4 h-4 text-brand-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
              </svg>
              الدفع عند الاستلام
            </span>
            <span className="w-1 h-1 bg-white/20 rounded-full" />
            <span className="flex items-center gap-2 text-white/50 text-xs font-bold uppercase tracking-wider">
              <svg className="w-4 h-4 text-brand-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
              </svg>
              شحن لجميع المناطق
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}
