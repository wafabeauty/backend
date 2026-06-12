import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-brand-blue text-white mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
                <span className="text-brand-blue font-bold text-lg">N</span>
              </div>
              <div>
                <p className="font-bold text-white text-base">وفاء للجمال</p>
                <p className="text-blue-200 text-xs">Nama Beauty</p>
              </div>
            </div>
            <p className="text-blue-200 text-sm leading-relaxed">
              حلول تجميلية سريرية مصممة خصيصاً لمواجهة تحديات البيئة الخليجية.
              نحن لا نبيع منتجات تجميل، نحن نوفر حلولاً طبية.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-white mb-4 text-base">روابط سريعة</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/products/kojic-serum" className="text-blue-200 hover:text-white transition-colors text-sm">
                  سيروم الكوجيك
                </Link>
              </li>
              <li>
                <Link href="/products/caffeine-roller" className="text-blue-200 hover:text-white transition-colors text-sm">
                  رولر الكافيين
                </Link>
              </li>
              <li>
                <Link href="/products/sea-salt-scrub" className="text-blue-200 hover:text-white transition-colors text-sm">
                  مقشر ملح البحر
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-bold text-white mb-4 text-base">المعلومات القانونية</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/privacy-policy" className="text-blue-200 hover:text-white transition-colors text-sm">
                  سياسة الخصوصية
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-blue-200 hover:text-white transition-colors text-sm">
                  الشروط والأحكام
                </Link>
              </li>
              <li>
                <Link href="/refund-policy" className="text-blue-200 hover:text-white transition-colors text-sm">
                  سياسة الاسترجاع
                </Link>
              </li>
              <li>
                <Link href="/#contact" className="text-blue-200 hover:text-white transition-colors text-sm">
                  تواصل معنا
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-blue-700 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-blue-200 text-sm">
            © 2026 وفاء للجمال. جميع الحقوق محفوظة.
          </p>
          <div className="flex items-center gap-2">
            <span className="text-blue-200 text-xs">الدفع عند الاستلام</span>
            <span className="text-blue-400">|</span>
            <span className="text-blue-200 text-xs">شحن لجميع مناطق المملكة</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
