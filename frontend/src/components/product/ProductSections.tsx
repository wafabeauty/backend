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
      title: 'البيئة الخليجية تسرق إشراقة بشرتك',
      description:
        'تعيشين في بيئة تجمع بين حرارة شديدة وأشعة شمس قاسية ومياه تحلية مليئة بالمعادن. هذا الثلاثي المدمر هو السبب الحقيقي وراء البقع الداكنة، والبشرة غير المتجانسة، وظهور التصبغات رغم العناية اليومية.',
      bullets: [
        'التعرض اليومي للشمس يُنشّط إنتاج الميلانين بشكل مفرط',
        'مياه التحلية تُجفف الجلد وتُضعف حاجزه الطبيعي',
        'الحرارة تُسبب احتقان الأوعية الدموية والبقع الحمراء',
      ],
    },
    science: {
      title: 'حمض الكوجيك والمكونات النشطة',
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
      title: 'بشرة نقية وموحدة اللون',
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
      title: 'التعب والإجهاد يظهران على وجهك',
      description:
        'الهالات السوداء والانتفاخ تحت العين لا تظهر بالصدفة. ضغوط الحياة، قلة النوم، والجينات كلها عوامل، لكن السبب الخفي الأكبر هو ضعف الدورة الدموية في منطقة العين الحساسة.',
      bullets: [
        'الإجهاد يُسبب تمدد الأوعية الدموية تحت العين',
        'قلة النوم تُضعف الليمف وتُسبب تراكم السوائل',
        'جلد منطقة العين أرق بـ 10 مرات من باقي الوجه',
      ],
    },
    science: {
      title: 'الكافيين + الببتيدات الطبية',
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
      title: 'عيون مشرقة وشابة كل يوم',
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
      title: 'مياه التحلية تدمر فروة رأسك',
      description:
        'مياه التحلية في المملكة العربية السعودية تحتوي على تركيز مرتفع من الكالسيوم والمغنيسيوم والكلور. هذه المعادن تتراكم على فروة رأسك يومياً، تسد البصيلات، وتُسبب التساقط والقشرة المزمنة.',
      bullets: [
        'ترسبات الكالسيوم تسد بصيلات الشعر وتُضعفها',
        'الكلور يُجفف فروة الرأس ويُسبب الحكة والتهيج',
        'البصيلات المسدودة لا تستطيع إنتاج شعر صحي',
      ],
    },
    science: {
      title: 'ملح البحر الميت + مجمع التجديد',
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
      title: 'شعر صحي وفروة رأس نظيفة',
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

export default function ProductSections({ product }: ProductSectionsProps) {
  const content = PRODUCT_CONTENT[product.slug]
  if (!content) return null

  const { problem, science, relief } = content

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-24">

      {/* The Problem */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        <div className="order-2 lg:order-1 text-right">
          <span className="text-brand-blue/50 font-bold tracking-[0.2em] uppercase text-[10px] mb-4 block">The Problem</span>
          <h2 className="text-3xl lg:text-4xl font-black text-brand-blue mb-6 leading-tight">{problem.title}</h2>
          <p className="text-slate-500 leading-relaxed mb-8 text-base font-medium">{problem.description}</p>
          <ul className="space-y-4">
            {problem.bullets.map((b) => (
              <li key={b} className="flex items-start gap-4 text-sm text-slate-600 font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-red-400 mt-2 flex-shrink-0" />
                <span>{b}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="order-1 lg:order-2">
          <div className="relative w-full aspect-square rounded-[2rem] bg-brand-off-white flex items-center justify-center p-8 overflow-hidden group">
            <div className="absolute inset-0 bg-[url('/noise.svg')] opacity-[0.03] mix-blend-overlay" />
            <div className="w-full h-full border border-gray-200/60 rounded-[1.5rem] flex items-center justify-center bg-white shadow-sm group-hover:shadow-premium transition-all duration-700">
              <svg className="w-32 h-32 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={0.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* The Science */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        <div>
          <div className="relative w-full aspect-square rounded-[2rem] bg-brand-blue flex items-center justify-center p-8 overflow-hidden group">
            <div className="absolute inset-0 bg-premium-gradient opacity-90" />
            <div className="absolute inset-0 bg-[url('/noise.svg')] opacity-[0.05] mix-blend-overlay" />
            <div className="w-full h-full border border-white/10 rounded-[1.5rem] flex items-center justify-center bg-white/5 backdrop-blur-md shadow-2xl group-hover:bg-white/10 transition-all duration-700 relative z-10">
              <svg className="w-32 h-32 text-brand-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={0.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
              </svg>
            </div>
          </div>
        </div>
        <div className="text-right">
          <span className="text-brand-gold font-bold tracking-[0.2em] uppercase text-[10px] mb-4 block">The Science</span>
          <h2 className="text-3xl lg:text-4xl font-black text-brand-blue mb-6 leading-tight">{science.title}</h2>
          <p className="text-slate-500 leading-relaxed mb-8 text-base font-medium">{science.description}</p>
          <ul className="space-y-4">
            {science.bullets.map((b) => (
              <li key={b} className="flex items-start gap-4 text-sm text-slate-600 font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-gold mt-2 flex-shrink-0" />
                <span>{b}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* The Relief */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        <div className="order-2 lg:order-1 text-right">
          <span className="text-brand-green font-bold tracking-[0.2em] uppercase text-[10px] mb-4 block">The Results</span>
          <h2 className="text-3xl lg:text-4xl font-black text-brand-blue mb-6 leading-tight">{relief.title}</h2>
          <p className="text-slate-500 leading-relaxed mb-8 text-base font-medium">{relief.description}</p>
          <ul className="space-y-4">
            {relief.bullets.map((b) => (
              <li key={b} className="flex items-start gap-4 text-sm text-slate-600 font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-green mt-2 flex-shrink-0" />
                <span>{b}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="order-1 lg:order-2">
          <div className="relative w-full aspect-square rounded-[2rem] bg-brand-off-white flex items-center justify-center p-8 overflow-hidden group">
            <div className="absolute inset-0 bg-brand-green/5 opacity-50" />
            <div className="w-full h-full border border-brand-green/10 rounded-[1.5rem] flex items-center justify-center bg-white shadow-sm group-hover:shadow-premium transition-all duration-700 relative z-10">
              <svg className="w-32 h-32 text-brand-green" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={0.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}
