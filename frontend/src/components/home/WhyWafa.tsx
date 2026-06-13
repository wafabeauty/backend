const sections = [
  {
    icon: (
      <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
      </svg>
    ),
    title: 'تركيبات سريرية مُثبتة',
    description:
      'كل منتج يحتوي على تركيز فعّال من المكونات النشطة. لا نخفف التركيبات لخفض التكاليف. نستخدم ما يوصف به أطباء الجلدية فعلاً لبشرة لا تشوبها شائبة.',
    side: 'right',
  },
  {
    icon: (
      <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: 'مُصمم للبيئة الخليجية',
    description:
      'مياه التحلية والحرارة الشديدة في الخليج لها متطلبات خاصة. تركيباتنا مُطورة خصيصاً لمعالجة التأثيرات الجانبية للبيئة القاسية على البشرة والشعر بدقة متناهية.',
    side: 'left',
  },
  {
    icon: (
      <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: 'نتائج مرئية ومضمونة',
    description:
      'لسنا وعوداً فارغة. بروتوكولنا السريري يُظهر نتائج مرئية واضحة خلال أسابيع من الاستخدام المنتظم. علم حقيقي، نتائج حقيقية.',
    side: 'right',
  },
]

export default function WhyWafa() {
  return (
    <section id="about" className="py-24 px-4 bg-brand-off-white relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-brand-gold/5 blur-[100px] rounded-full" />
      <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-brand-blue/5 blur-[120px] rounded-full" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-20">
          <span className="text-brand-gold font-bold tracking-[0.2em] uppercase text-xs mb-3 block">The Science Behind Us</span>
          <h2 className="section-title">لماذا وفاء للجمال؟</h2>
          <div className="w-12 h-1 bg-brand-gold mx-auto mt-6" />
        </div>

        <div className="space-y-12 lg:space-y-24">
          {sections.map((section, index) => (
            <div
              key={section.title}
              className={`flex flex-col ${
                section.side === 'left' ? 'lg:flex-row-reverse' : 'lg:flex-row'
              } items-center gap-12 lg:gap-20`}
            >
              {/* Visual Element */}
              <div className="flex-1 flex justify-center w-full">
                <div className="relative w-full max-w-sm aspect-square">
                  <div className="absolute inset-0 bg-white rounded-full shadow-premium transform scale-90" />
                  <div className="absolute inset-0 border border-brand-gold/20 rounded-full transform scale-105 transition-transform duration-700 hover:scale-110" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-32 h-32 rounded-full bg-brand-blue flex items-center justify-center text-brand-gold shadow-inner">
                      {section.icon}
                    </div>
                  </div>
                </div>
              </div>

              {/* Text Content */}
              <div className="flex-1 text-right w-full">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-brand-gold/10 text-brand-gold font-black text-xl mb-6">
                  0{index + 1}
                </div>
                <h3 className="text-3xl font-black text-brand-blue mb-6 tracking-tight">{section.title}</h3>
                <p className="text-gray-500 leading-relaxed text-lg font-medium">{section.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
