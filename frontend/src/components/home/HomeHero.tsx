import Link from 'next/link'

export default function HomeHero() {
  return (
    <section className="relative bg-gradient-to-br from-brand-blue via-brand-blue-light to-brand-blue-dark text-white overflow-hidden">
      {/* Decorative circles */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-white/5 rounded-full -translate-x-32 -translate-y-32" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/5 rounded-full translate-x-48 translate-y-48" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="text-right">
            {/* Clinical badge */}
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-2 mb-6">
              <span className="w-2 h-2 bg-brand-green rounded-full animate-pulse" />
              <span className="text-sm font-medium text-blue-100">حلول سريرية للبيئة الخليجية</span>
            </div>

            <h1 className="text-3xl md:text-5xl font-black leading-tight mb-6">
              بشرتك تستحق
              <br />
              <span className="text-yellow-300">حلاً طبياً</span>
              <br />
              لا مجرد منتج
            </h1>

            <p className="text-blue-100 text-base md:text-lg leading-relaxed mb-4">
              مياه التحلية القاسية والحرارة الشديدة تؤثران على بشرتك يومياً.
              <br />
              <strong className="text-white">ليس خطأك. إنها البيئة.</strong>
            </p>
            <p className="text-blue-200 text-sm leading-relaxed mb-8">
              صممنا بروتوكولاً سريرياً ثلاثياً مستوحى من أحدث أبحاث الجلدية
              لمواجهة تحديات البيئة الخليجية بشكل مباشر.
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/products/kojic-serum"
                className="bg-white text-brand-blue font-bold py-4 px-8 rounded-xl hover:bg-blue-50 transition-all duration-200 active:scale-95 shadow-xl text-center"
              >
                اكتشفي البروتوكول الآن
              </Link>
              <Link
                href="#products"
                className="border-2 border-white/40 text-white font-semibold py-4 px-8 rounded-xl hover:bg-white/10 transition-all duration-200 text-center"
              >
                تعرفي على المنتجات
              </Link>
            </div>

            {/* Social Proof Mini */}
            <div className="flex items-center gap-3 mt-8">
              <div className="flex -space-x-2 space-x-reverse">
                {['س', 'ن', 'م', 'ف'].map((letter, i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full bg-gradient-to-br from-yellow-300 to-yellow-500 border-2 border-white flex items-center justify-center text-brand-blue font-bold text-xs"
                  >
                    {letter}
                  </div>
                ))}
              </div>
              <div>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <span key={s} className="text-yellow-400 text-xs">★</span>
                  ))}
                </div>
                <p className="text-blue-200 text-xs">+3,800 عميلة سعيدة</p>
              </div>
            </div>
          </div>

          {/* Visual */}
          <div className="hidden md:flex items-center justify-center">
            <div className="relative">
              {/* Main product visual */}
              <div className="w-72 h-72 rounded-3xl bg-white/10 border border-white/20 backdrop-blur-sm flex items-center justify-center shadow-2xl">
                <div className="text-center">
                  <div className="text-8xl mb-4">✨</div>
                  <p className="text-white font-bold text-lg">البروتوكول السريري</p>
                  <p className="text-blue-200 text-sm">الثلاثي الذهبي</p>
                </div>
              </div>

              {/* Floating badges */}
              <div className="absolute -top-4 -right-4 bg-brand-green text-white text-xs font-bold px-3 py-2 rounded-xl shadow-lg">
                🧪 مكونات معتمدة طبياً
              </div>
              <div className="absolute -bottom-4 -left-4 bg-white text-brand-blue text-xs font-bold px-3 py-2 rounded-xl shadow-lg">
                💳 الدفع عند الاستلام
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
