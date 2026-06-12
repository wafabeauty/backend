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
  {
    name: 'منى القحطاني',
    city: 'الرياض',
    rating: 5,
    product: 'سيروم الكوجيك',
    text: 'المنتج يستاهل كل ريال. كنت متشككة في البداية بس بعد ما جربت ما راح أوقف. بشرتي صارت أكثر إشراقاً بشكل واضح.',
    verified: true,
  },
  {
    name: 'فاطمة العمري',
    city: 'مكة المكرمة',
    rating: 5,
    product: 'رولر الكافيين',
    text: 'أنصح فيه لأي أم مشغولة. النوم الناقص يبيّن على وجهي كثير. هذا الرولر يخفي التعب بشكل سحري. شكراً وفاء للجمال!',
    verified: true,
  },
  {
    name: 'ريم السبيعي',
    city: 'الرياض',
    rating: 5,
    product: 'مقشر ملح البحر',
    text: 'من أفضل مشترياتي أونلاين. رائحته رائعة والنتيجة أروع. فروة رأسي صارت أهدأ كثيراً من قبل.',
    verified: true,
  },
]

export default function SocialProof() {
  return (
    <section className="py-20 px-4 bg-brand-off-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="section-title">ماذا تقول عميلاتنا؟</h2>
          <div className="flex items-center justify-center gap-2 mt-3">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((s) => (
                <span key={s} className="text-yellow-400 text-xl">★</span>
              ))}
            </div>
            <span className="text-gray-600 font-bold">4.9/5</span>
            <span className="text-gray-400 text-sm">من أكثر من 3,800 تقييم</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {reviews.map((review) => (
            <div key={review.name} className="card p-5">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-brand-blue to-brand-blue-light flex items-center justify-center text-white font-bold text-sm">
                    {review.name[0]}
                  </div>
                  <div>
                    <p className="font-bold text-gray-800 text-sm">{review.name}</p>
                    <p className="text-gray-400 text-xs">{review.city}</p>
                  </div>
                </div>
                {review.verified && (
                  <span className="badge bg-brand-green/10 text-brand-green text-xs">
                    ✓ موثّق
                  </span>
                )}
              </div>

              <div className="flex items-center gap-1 mb-2">
                {[1, 2, 3, 4, 5].map((s) => (
                  <span key={s} className="text-yellow-400 text-sm">★</span>
                ))}
              </div>

              <p className="text-gray-600 text-sm leading-relaxed mb-3">{review.text}</p>

              <p className="text-brand-blue text-xs font-semibold bg-brand-blue/5 rounded-lg px-2 py-1 inline-block">
                {review.product}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
