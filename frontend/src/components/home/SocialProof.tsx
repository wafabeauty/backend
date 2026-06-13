const reviews = [
  {
    name: 'سارة العتيبي',
    city: 'الرياض',
    rating: 5,
    product: 'سيروم الكوجيك',
    text: 'والله ما توقعت النتيجة تكون بهذا الشكل! بعد أسبوعين بدأت أشوف فرقاً واضحاً في لون بشرتي. الجلسات الليزر ما حققت نفس النتيجة.',
    verified: true,
  },
  {
    name: 'نورة م.',
    city: 'جدة',
    rating: 5,
    product: 'رولر الكافيين',
    text: 'أخيراً حل للهالات السوداء! جربت منتجات كثيرة ما نفعت. هذا الرولر من أول يوم حسيت بفرق. أنصح فيه كل بنت.',
    verified: true,
  },
  {
    name: 'لولو الشمري',
    city: 'الدمام',
    rating: 5,
    product: 'مقشر ملح البحر',
    text: 'شعري كان يتساقط بشكل مخيف بسبب المياه. بعد شهر من المقشر تقلّص التساقط بشكل كبير جداً. ناصحة كل بنت تجربه.',
    verified: true,
  },
]

export default function SocialProof() {
  return (
    <section className="py-24 px-4 bg-white relative">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-brand-gold font-bold tracking-[0.2em] uppercase text-xs mb-3 block">Verified Results</span>
          <h2 className="section-title">نتائج حقيقية لعميلاتنا</h2>
          <div className="flex items-center justify-center gap-3 mt-6">
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((s) => (
                <svg key={s} className="w-5 h-5 text-brand-gold" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="text-brand-blue font-black text-lg">4.9/5</span>
            <span className="text-gray-400 text-sm font-medium border-r border-gray-300 pr-3">من أكثر من 3,800 تقييم</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((review) => (
            <div key={review.name} className="card p-8 bg-brand-off-white border-none group">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-brand-blue text-brand-gold flex items-center justify-center font-black text-lg shadow-inner">
                    {review.name[0]}
                  </div>
                  <div>
                    <p className="font-bold text-brand-blue">{review.name}</p>
                    <p className="text-gray-400 text-xs font-semibold">{review.city}</p>
                  </div>
                </div>
                {review.verified && (
                  <div className="flex items-center gap-1 bg-brand-green/10 text-brand-green px-2 py-1 rounded-md">
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-[10px] font-bold uppercase tracking-wider">موثّق</span>
                  </div>
                )}
              </div>

              <div className="flex items-center gap-1 mb-4">
                {[1, 2, 3, 4, 5].map((s) => (
                  <svg key={s} className="w-4 h-4 text-brand-gold" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              <p className="text-slate-600 text-sm leading-relaxed mb-6 font-medium">"{review.text}"</p>

              <div className="pt-4 border-t border-gray-200/60 mt-auto">
                <span className="text-brand-blue text-xs font-bold tracking-wide">
                  منتج المراجعة: <span className="text-brand-gold font-black">{review.product}</span>
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
