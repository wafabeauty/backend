import { Product } from '@/types'

interface ProductSectionsProps {
  product: Product
}

const PRODUCT_CONTENT: Record<string, {
  problem: { title: string; description: string; bullets: string[] }
  science: { title: string; description: string; bullets: string[] }
  relief: { title: string; description: string; bullets: string[] }
}> = {
  'kojic-serum': {
    problem: {
      title: 'المشكلة: البيئة الخليجية تسرق إشراقة بشرتك',
      description:
        'تعيشين في بيئة تجمع بين حرارة شديدة وأشعة شمس قاسية ومياه تحلية مليئة بالمعادن. هذا الثلاثي المدمر هو السبب الحقيقي وراء البقع الداكنة، والبشرة غير المتجانسة، وظهور التصبغات رغم العناية اليومية.',
      bullets: [
        'التعرض اليومي للشمس يُنشّط إنتاج الميلانين بشكل مفرط',
        'مياه التحلية تُجفف الجلد وتُضعف حاجزه الطبيعي',
        'الحرارة تُسبب احتقان الأوعية الدموية والبقع الحمراء',
      ],
    },
    science: {
      title: 'العلم: حمض الكوجيك والمكونات النشطة',
      description:
        'سيرومنا يحتوي على تركيز 2% من حمض الكوجيك - المكون الأكثر إثباتاً علمياً لتثبيط إنتاج الميلانين. بالإضافة إلى النياسيناميد 5% لتقليل المسام وفيتامين سي المستقر لتوحيد لون البشرة.',
      bullets: [
        'حمض الكوجيك يُثبّط إنزيم التيروسيناز المسؤول عن التصبغ',
        'النياسيناميد يُقلل انتقال الميلانين إلى خلايا الجلد',
        'فيتامين سي يُجدد خلايا الجلد ويمنح الإشراقة',
        'حمض الهيالورونيك يُحافظ على ترطيب البشرة طوال اليوم',
      ],
    },
    relief: {
      title: 'النتيجة: بشرة نقية وموحدة اللون',
      description:
        'في خلال 4 أسابيع من الاستخدام المنتظم، ستلاحظين تفتيحاً ملحوظاً للبقع الداكنة، وتوحيداً للون البشرة، وإشراقة طبيعية صحية. نتائج مُثبتة سريرياً على بشرة المرأة الخليجية.',
      bullets: [
        'تفتيح البقع الداكنة بنسبة تصل إلى 60% في 4 أسابيع',
        'توحيد لون البشرة ومحو آثار التصبغ',
        'إشراقة طبيعية بدون مكياج',
        'بشرة أكثر نعومة ومرونة',
      ],
    },
  },
  'caffeine-roller': {
    problem: {
      title: 'المشكلة: التعب والإجهاد يظهران على وجهك',
      description:
        'الهالات السوداء والانتفاخ تحت العين لا تظهر بالصدفة. ضغوط الحياة، قلة النوم، والجينات كلها عوامل، لكن السبب الخفي الأكبر هو ضعف الدورة الدموية في منطقة العين الحساسة.',
      bullets: [
        'الإجهاد يُسبب تمدد الأوعية الدموية تحت العين',
        'قلة النوم تُضعف الليمف وتُسبب تراكم السوائل',
        'جلد منطقة العين أرق بـ 10 مرات من باقي الوجه',
      ],
    },
    science: {
      title: 'العلم: الكافيين + الببتيدات الطبية',
      description:
        'الكافيين 5% يُضيّق الأوعية الدموية ويُقلل تراكم السوائل بشكل فوري. ببتيد Syn-Ake يُقلل التجاعيد ويُشدد الجلد. الرولر المبرد يُعزز تدفق الليمف ويُقلص الانتفاخ من أول لمسة.',
      bullets: [
        'الكافيين يُضيّق الأوعية ويُقلل الاحتقان فوراً',
        'Syn-Ake ببتيد معتمد من جمعيات الجلدية الدولية',
        'البابونج يُهدّئ الجلد الحساس ويُقلل الاحمرار',
        'فيتامين ك يُقوّي جدار الأوعية الدموية',
      ],
    },
    relief: {
      title: 'النتيجة: عيون مشرقة وشابة كل يوم',
      description:
        'من الاستخدام الأول ستشعرين بالفرق. الانتفاخ يتقلص، والهالات تبدأ في التفتيح. بعد أسبوعين ستكتشفين أن أصدقاءك يسألون "نمتِ زين؟" في كل مرة يرونك.',
      bullets: [
        'تقليص الانتفاخ من الاستخدام الأول',
        'تفتيح الهالات السوداء في أسبوعين',
        'تشديد وترطيب جلد منطقة العين',
        'نتائج تدوم طوال اليوم',
      ],
    },
  },
  'sea-salt-scrub': {
    problem: {
      title: 'المشكلة: مياه التحلية تدمر فروة رأسك',
      description:
        'مياه التحلية في المملكة العربية السعودية تحتوي على تركيز مرتفع من الكالسيوم والمغنيسيوم والكلور. هذه المعادن تتراكم على فروة رأسك يومياً، تسد البصيلات، وتُسبب التساقط والقشرة المزمنة.',
      bullets: [
        'ترسبات الكالسيوم تسد بصيلات الشعر وتُضعفها',
        'الكلور يُجفف فروة الرأس ويُسبب الحكة والتهيج',
        'البصيلات المسدودة لا تستطيع إنتاج شعر صحي',
      ],
    },
    science: {
      title: 'العلم: ملح البحر الميت + مجمع التجديد',
      description:
        'تركيبتنا تجمع بين القوة الميكانيكية لملح البحر الميت لإزالة الترسبات، وحمض السيتريك لموازنة درجة الحموضة، وزيت الأرجان لترطيب البصيلات، وبيوتين لتحفيز النمو.',
      bullets: [
        'ملح البحر الميت يُزيل الترسبات المعدنية الصلبة',
        'الزنجبيل يُنشّط الدورة الدموية في فروة الرأس',
        'البيوتين يُغذي البصيلات ويُقوي ساق الشعرة',
        'زيت الأرجان يُرطب ويُحمي من الكسر',
      ],
    },
    relief: {
      title: 'النتيجة: شعر صحي وفروة رأس نظيفة',
      description:
        'من الاستخدام الأول ستشعرين بخفة فروة الرأس ونظافتها. بعد شهر ستلاحظين تقلصاً واضحاً في التساقط وبدء نمو شعر جديد. فروة رأسك ستتنفس مجدداً.',
      bullets: [
        'تقليل التساقط بنسبة تصل إلى 70% في 4 أسابيع',
        'إزالة القشرة والترسبات من الاستخدام الأول',
        'تحفيز نمو شعر جديد وصحي',
        'فروة رأس منتعشة ومرطبة',
      ],
    },
  },
}

const reviews = [
  { name: 'سارة ع.', rating: 5, text: 'نتيجة رائعة! ما توقعت يكون فرق بهذا الشكل.' },
  { name: 'نورة م.', rating: 5, text: 'أفضل منتج جربته. أنصح فيه كل بنت.' },
  { name: 'منى ق.', rating: 5, text: 'يستاهل كل ريال. سأعيد الطلب بالتأكيد.' },
]

export default function ProductSections({ product }: ProductSectionsProps) {
  const content = PRODUCT_CONTENT[product.slug]
  if (!content) return null

  const { problem, science, relief } = content

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 py-8">

      {/* The Problem */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="order-2 md:order-1 text-right">
          <span className="badge bg-red-100 text-red-600 mb-4">❌ المشكلة</span>
          <h2 className="text-xl md:text-2xl font-black text-gray-800 mb-4 leading-tight">{problem.title}</h2>
          <p className="text-gray-600 leading-relaxed mb-5 text-sm">{problem.description}</p>
          <ul className="space-y-2">
            {problem.bullets.map((b) => (
              <li key={b} className="flex items-start gap-2 text-sm text-gray-600">
                <span className="text-red-500 mt-0.5 flex-shrink-0">⚠️</span>
                <span>{b}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="order-1 md:order-2 flex justify-center">
          <div className="w-48 h-48 md:w-64 md:h-64 rounded-3xl bg-red-50 border-2 border-red-100 flex items-center justify-center">
            <span className="text-7xl md:text-8xl">😰</span>
          </div>
        </div>
      </section>

      {/* The Science */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="flex justify-center">
          <div className="w-48 h-48 md:w-64 md:h-64 rounded-3xl bg-brand-blue/5 border-2 border-brand-blue/10 flex items-center justify-center">
            <span className="text-7xl md:text-8xl">🔬</span>
          </div>
        </div>
        <div className="text-right">
          <span className="badge bg-brand-blue/10 text-brand-blue mb-4">🧪 العلم والتركيبة</span>
          <h2 className="text-xl md:text-2xl font-black text-gray-800 mb-4 leading-tight">{science.title}</h2>
          <p className="text-gray-600 leading-relaxed mb-5 text-sm">{science.description}</p>
          <ul className="space-y-2">
            {science.bullets.map((b) => (
              <li key={b} className="flex items-start gap-2 text-sm text-gray-600">
                <span className="text-brand-blue mt-0.5 flex-shrink-0">✓</span>
                <span>{b}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* The Relief */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="order-2 md:order-1 text-right">
          <span className="badge bg-brand-green/10 text-brand-green mb-4">✨ النتيجة</span>
          <h2 className="text-xl md:text-2xl font-black text-gray-800 mb-4 leading-tight">{relief.title}</h2>
          <p className="text-gray-600 leading-relaxed mb-5 text-sm">{relief.description}</p>
          <ul className="space-y-2">
            {relief.bullets.map((b) => (
              <li key={b} className="flex items-start gap-2 text-sm text-gray-600">
                <span className="text-brand-green mt-0.5 flex-shrink-0">🌟</span>
                <span>{b}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="order-1 md:order-2 flex justify-center">
          <div className="w-48 h-48 md:w-64 md:h-64 rounded-3xl bg-brand-green/5 border-2 border-brand-green/10 flex items-center justify-center">
            <span className="text-7xl md:text-8xl">✨</span>
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section>
        <h2 className="section-title mb-8">ماذا تقول عميلاتنا؟</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {reviews.map((r) => (
            <div key={r.name} className="card p-4">
              <div className="flex items-center gap-1 mb-2">
                {[1, 2, 3, 4, 5].map((s) => (
                  <span key={s} className="text-yellow-400 text-sm">★</span>
                ))}
              </div>
              <p className="text-gray-600 text-sm leading-relaxed mb-3">{r.text}</p>
              <p className="font-bold text-gray-800 text-sm">{r.name}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
