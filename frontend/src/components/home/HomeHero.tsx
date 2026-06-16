import Link from 'next/link'

export default function HomeHero() {
  return (
    <section className="relative min-h-[90vh] bg-brand-blue flex items-center overflow-hidden">
      {/* Premium Background Elements */}
      <div className="absolute inset-0 bg-premium-gradient opacity-90" />
      <div className="absolute inset-0 bg-[url('/noise.svg')] opacity-[0.03] mix-blend-overlay" />
      
      {/* Abstract Glowing Orbs */}
      <div className="absolute top-1/4 -right-1/4 w-[800px] h-[800px] bg-brand-gold/20 rounded-full blur-[120px] mix-blend-screen animate-pulse" style={{ animationDuration: '8s' }} />
      <div className="absolute -bottom-1/4 -left-1/4 w-[600px] h-[600px] bg-brand-sand/30 rounded-full blur-[100px] mix-blend-screen" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-white/5 rounded-full blur-[80px]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Text Content */}
          <div className="text-right lg:pr-10">
            {/* Elegant Top Badge */}
            <div className="flex justify-center mb-8 w-full">
              <div className="inline-flex items-center gap-3 bg-white/8 backdrop-blur-md border border-brand-gold/30 rounded-full px-5 py-2 animate-slide-bottom" style={{ animationDelay: '0.1s' }}>
                <span className="w-1.5 h-1.5 bg-brand-gold rounded-full animate-pulse" />
                <span className="text-xs font-bold text-brand-gold uppercase tracking-[0.2em]">✦ حلول سريرية معتمدة ✦</span>
                <span className="w-1.5 h-1.5 bg-brand-gold rounded-full animate-pulse" />
              </div>
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black leading-[1.1] mb-6 text-white animate-slide-bottom" style={{ animationDelay: '0.2s' }}>
              بشرتك تستحق
              <br />
              <span className="text-transparent bg-clip-text bg-gold-gradient">
                حلاً طبياً
              </span>
              <br />
              لا مجرد منتج
            </h1>

            <div className="w-20 h-1 bg-brand-gold mb-8 animate-slide-bottom" style={{ animationDelay: '0.3s' }} />

            <p className="text-white/80 text-lg md:text-xl leading-relaxed mb-6 font-medium animate-slide-bottom" style={{ animationDelay: '0.4s' }}>
              مياه التحلية القاسية والحرارة الشديدة تؤثران على بشرتك يومياً.
              <span className="block text-white mt-2">ليس خطأك. إنها البيئة.</span>
            </p>

            <p className="text-white/60 text-sm md:text-base leading-relaxed mb-10 max-w-lg animate-slide-bottom" style={{ animationDelay: '0.5s' }}>
              صممنا بروتوكولاً سريرياً ثلاثياً مستوحى من أحدث أبحاث الجلدية،
              لمواجهة تحديات البيئة الخليجية بشكل مباشر وبنتائج مُثبتة.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 animate-slide-bottom" style={{ animationDelay: '0.6s' }}>
              <Link href="/products/astaxanthin-serum" className="btn-gold text-center">
                اكتشفي البروتوكول
              </Link>
              <Link href="#products" className="bg-white/5 backdrop-blur-md border border-white/20 text-white font-bold py-4 px-10 rounded-full hover:bg-white/10 transition-all duration-300 text-center">
                تصفح المنتجات
              </Link>
            </div>

            {/* Premium Social Proof */}
            <div className="flex items-center gap-6 mt-12 pt-8 border-t border-white/10 animate-slide-bottom" style={{ animationDelay: '0.7s' }}>
              <div className="flex -space-x-4 space-x-reverse">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="w-12 h-12 rounded-full border-2 border-brand-blue bg-white/10 backdrop-blur-md flex items-center justify-center">
                    <svg className="w-5 h-5 text-white/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                ))}
              </div>
              <div>
                <div className="flex items-center gap-1 mb-1">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <svg key={s} className="w-4 h-4 text-brand-gold" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-white/60 text-xs font-semibold tracking-wider uppercase">Over 3,800+ Verified Reviews</p>
              </div>
            </div>
          </div>

          {/* Visual Side */}
          <div className="hidden lg:flex items-center justify-center relative h-full min-h-[600px] animate-slide-right">
            {/* The Glass Product Display */}
            <div className="relative w-full max-w-md aspect-[4/5] rounded-[2.5rem] bg-white/5 backdrop-blur-2xl border border-white/20 shadow-2xl overflow-hidden p-8 flex flex-col items-center justify-center">
              
              {/* Floating Element 1 */}
              <div className="absolute top-10 right-10 animate-float" style={{ animationDelay: '0s' }}>
                <div className="w-16 h-16 rounded-full bg-brand-gold/20 backdrop-blur-md flex items-center justify-center border border-brand-gold/30 shadow-lg">
                  <svg className="w-6 h-6 text-brand-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                  </svg>
                </div>
              </div>

              {/* Center Abstract Product Representation */}
              <div className="relative z-10 text-center animate-float" style={{ animationDelay: '2s' }}>
                <div className="w-48 h-48 rounded-full bg-gradient-to-tr from-brand-gold/40 to-brand-gold/10 blur-md absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10" />
                <div className="w-40 h-56 rounded-t-full rounded-b-3xl bg-white/10 border-2 border-brand-gold/40 backdrop-blur-md mx-auto flex items-center justify-center shadow-[inset_0_0_30px_rgba(201,164,126,0.15)]">
                  <span className="text-brand-gold font-black text-5xl drop-shadow-lg">و</span>
                </div>
              </div>

              <div className="mt-12 text-center relative z-10">
                <p className="text-white font-bold text-xl tracking-wide">وفاء للجمال</p>
                <p className="text-brand-gold text-sm tracking-[0.3em] uppercase mt-2">✦ Dermatologist Approved ✦</p>
              </div>

              {/* Floating Element 2 */}
              <div className="absolute bottom-10 left-10 animate-float" style={{ animationDelay: '4s' }}>
                <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 shadow-lg">
                  <span className="text-white font-bold text-xs tracking-widest">KSA</span>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
