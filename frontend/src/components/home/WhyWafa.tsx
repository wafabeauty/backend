const sections = [
  {
    icon: '🔬',
    title: 'تركيبات سريرية مُثبتة',
    description:
      'كل منتج يحتوي على تركيز فعّال من المكونات النشطة. لا نخفف التركيبات لخفض التكاليف. نستخدم ما يوصف به أطباء الجلدية فعلاً.',
    side: 'right',
  },
  {
    icon: '🌊',
    title: 'مُصمم للبيئة الخليجية',
    description:
      'مياه التحلية في المملكة تحتوي على تركيزات عالية من الكالسيوم والمعادن. تركيباتنا مُطورة خصيصاً لمعالجة التأثيرات الجانبية لهذه المياه على البشرة والشعر.',
    side: 'left',
  },
  {
    icon: '⚡',
    title: 'نتائج مرئية في أسابيع',
    description:
      'لسنا وعوداً فارغة. بروتوكولنا السريري يُظهر نتائج مرئية خلال 2-4 أسابيع من الاستخدام المنتظم، أو نسترجع لك المبلغ كاملاً.',
    side: 'right',
  },
]

export default function WhyWafa() {
  return (
    <section id="about" className="py-20 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="section-title">لماذا وفاء للجمال؟</h2>
          <p className="text-gray-500 text-sm max-w-lg mx-auto">
            نحن لا نبيع جمال. نبيع علماً مُطبّقاً على واقع حياتك في الخليج.
          </p>
        </div>

        <div className="space-y-16">
          {sections.map((section, index) => (
            <div
              key={section.title}
              className={`flex flex-col ${
                section.side === 'left' ? 'md:flex-row-reverse' : 'md:flex-row'
              } items-center gap-10`}
            >
              {/* Visual */}
              <div className="flex-1 flex justify-center">
                <div className="w-48 h-48 md:w-64 md:h-64 rounded-3xl bg-gradient-to-br from-brand-blue to-brand-blue-light flex items-center justify-center shadow-2xl shadow-brand-blue/20">
                  <span className="text-7xl md:text-8xl">{section.icon}</span>
                </div>
              </div>

              {/* Text */}
              <div className="flex-1 text-right">
                <div className="inline-flex items-center gap-2 bg-brand-blue/5 border border-brand-blue/10 rounded-full px-3 py-1 mb-4">
                  <span className="text-brand-blue text-xs font-semibold">#{index + 1} ميزة فريدة</span>
                </div>
                <h3 className="text-2xl font-bold text-brand-blue mb-4">{section.title}</h3>
                <p className="text-gray-600 leading-relaxed text-base">{section.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
