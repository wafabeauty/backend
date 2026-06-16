import { Product } from '@/types'

interface ProductSectionsProps {
  product: Product
}

const PRODUCT_CONTENT: Record<string, {
  problem: { title: string; description: string; bullets: string[] }
  science: { title: string; description: string; bullets: string[] }
  relief: { title: string; description: string; bullets: string[] }
}> = {
  'astaxanthin-serum': {
    problem: {
      title: 'البقع الداكنة لا تختفي — لأنك تعالجين العَرَض لا السبب',
      description:
        'حمض الكوجيك، فيتامين سي، الأرجان — كلها تُفتّح لكن لا توقف. السبب الحقيقي هو إنزيم التيروسيناز الذي يُنتج الميلانين يومياً بفعل الشمس الشديدة ومياه التحلية. ما لم توقفيه من جذوره، تعودين للنقطة صفر بعد كل صيف.',
      bullets: [
        'أشعة الشمس في المملكة تُنشّط إنزيم التيروسيناز بمعدل 3× مقارنة بمناطق أخرى',
        'مياه التحلية ترفع درجة الحموضة وتُضاعف حساسية البشرة للتصبغ',
        'السيرومات العادية تُفتّح الموجود لكن لا تمنع الجديد',
      ],
    },
    science: {
      title: 'الأستاكسانثين + حمض الترانيكساميك — التركيبة التي غيّرت قواعد اللعبة',
      description:
        'الأستاكسانثين مضاد أكسدة طبيعي أقوى من فيتامين سي بـ 6,000 مرة — يحمي الخلايا من التلف الذي يُطلق إنتاج الميلانين. حمض الترانيكساميك 3% يُثبّط إنزيم التيروسيناز مباشرة. النتيجة: لا إنتاج جديد + محو ما هو موجود في آنٍ واحد.',
      bullets: [
        'الأستاكسانثين يحمي الخلايا من التلف الضوئي قبل أن يبدأ التصبغ',
        'حمض الترانيكساميك يُثبّط التيروسيناز — نفس المكون الذي تصفه طبيبات الجلدية',
        'النياسيناميد 5% يمنع انتقال الميلانين الموجود إلى سطح الجلد',
        'فيتامين سي المستقر يجدد الخلايا ويُعزز تأثير المكونات الأخرى',
      ],
    },
    relief: {
      title: 'بشرة موحدة اللون — حتى بعد الصيف',
      description:
        'الفرق الحقيقي ليس في الأسابيع الأولى فقط — بل في أن بشرتك تبقى نظيفة حتى مع التعرض للشمس. لأن التركيبة لا تُفتّح فحسب، بل تمنع التصبغ من الحدوث من الأساس.',
      bullets: [
        'تفتيح ملحوظ للبقع الداكنة في 4 أسابيع',
        'توحيد لون البشرة حتى في فصل الصيف',
        'بشرة أكثر إشراقاً ونعومة من أول أسبوع',
        'حماية استباقية تمنع ظهور بقع جديدة',
      ],
    },
  },
  'grape-seed-eye-roller': {
    problem: {
      title: 'الهالات لا تُعالَج بالكريم — والسبب واضح',
      description:
        'الهالات السوداء سببها ضعف الأوعية الدموية الدقيقة تحت العين — تتمدد وتتسرب وتُظهر اللون الأرجواني والبني. الكافيين يُضيّق مؤقتاً، الكريم يُخفي مؤقتاً. لكن لا شيء كان يعالج هذه الأوعية من الداخل — حتى الآن.',
      bullets: [
        'الأوعية الدموية الضعيفة تتمدد وتُظهر الهالات الأرجوانية',
        'ضعف الليمف يُسبب تراكم السوائل والانتفاخ الصباحي',
        'جلد منطقة العين أرق بـ 10 مرات — يُظهر كل شيء تحته',
      ],
    },
    science: {
      title: 'مستخلص بذور العنب OPC + إنزيم SOD — الحل من الجذور',
      description:
        'مستخلص بذور العنب OPC يُقوّي جدران الأوعية الدموية الدقيقة ويُحسّن الدورة الدموية تحت العين مباشرة. إنزيم SOD من البطيخ الفرنسي يُحيّد الجذور الحرة التي تُدمر الجلد الرقيق. هذه التركيبة — المعروفة بـ SkinAx2 في الأبحاث الدولية — خفّضت الهالات 19% في تجربة سريرية خاضعة للرقابة.',
      bullets: [
        'OPC يُقوّي جدران الأوعية الدموية ويمنع التسريب الذي يُسبب الهالات',
        'SOD يحمي الجلد الرقيق من التلف التأكسدي اليومي',
        'فيتامين ك يُقلص الأوعية المتمددة ويُخفف اللون الأرجواني',
        'الرولر المبرد يُنشط تدفق الليمف ويُقلص الانتفاخ فوراً',
      ],
    },
    relief: {
      title: 'عيون تبدو مرتاحة — حتى في أصعب الأيام',
      description:
        'من الأسبوع الأول ستشعرين بتحسن في الانتفاخ الصباحي. بعد أسبوعين ستُلاحظين أن الهالات أفتح. وبعد 8 أسابيع، الناس يسألون: "صارلك شي تغيّر؟" — لأن الجذور اتعالجت فعلاً.',
      bullets: [
        'تقليص الانتفاخ الصباحي من أول استخدام',
        'تفتيح الهالات السوداء -19% في 8 أسابيع (مُثبت سريرياً)',
        'تشديد وترطيب جلد منطقة العين الرقيق',
        'نتائج تتراكم وتتحسن مع الوقت — لا تعود للنقطة صفر',
      ],
    },
  },
  'scalp-serum': {
    problem: {
      title: 'التساقط مش من البيوتين — وهذا لماذا ما توقف',
      description:
        'البيوتين يُساعد فقط من يعانون من نقصه — وهو نادر جداً. السبب الحقيقي لتساقط الشعر عند المرأة هو هرمون DHT الذي يُصغّر البصيلات تدريجياً حتى تتوقف عن إنتاج الشعر. ما لم تُوقفي DHT، كل علاج آخر هو مؤقت.',
      bullets: [
        'DHT يُصغّر البصيلة تدريجياً حتى تُنتج شعرة أرفع ثم تتوقف كلياً',
        'مياه التحلية تُضعف فروة الرأس وتُسرّع تأثير DHT',
        'البيوتين لا يحجب DHT — يُقوّي الشعرة الموجودة لكن لا يوقف التساقط',
      ],
    },
    science: {
      title: 'مستخلص ثمار المنشار + التوكوترينول — السلاح الحقيقي ضد التساقط',
      description:
        'مستخلص ثمار المنشار (Saw Palmetto) يُثبّط إنزيم 5-ألفا ريدكتاز الذي يحوّل التستوستيرون إلى DHT مباشرة — نفس آلية عمل الأدوية الطبية لكن بشكل طبيعي وبدون آثار جانبية. التوكوترينول (فيتامين هـ المتقدم) يحمي خلايا البصيلات من التلف التأكسدي. دراسة 2025: -70% تساقط في 90 يوماً عند المرأة.',
      bullets: [
        'ثمار المنشار يحجب تحول التستوستيرون إلى DHT في فروة الرأس مباشرة',
        'التوكوترينول رفع كثافة الشعر 34.5% في تجربة سريرية معشاة محكومة',
        'زيت بذور اليقطين مُثبّط إضافي لـ DHT يُعزز تأثير ثمار المنشار',
        'فيتامين د3 يُنشّط البصيلات الخاملة ويُحفّز مرحلة النمو',
      ],
    },
    relief: {
      title: 'شعر أكثف — لأن السبب اتعالج فعلاً',
      description:
        'بعد 30 يوماً ستُلاحظين أقل تساقطاً في المشط. بعد 90 يوماً ستُلاحظين فروة رأس أكثف وشعراً جديداً ينمو عند الفرق. لأن البصيلات تنفسّت أخيراً.',
      bullets: [
        'تقليل التساقط بنسبة 70% في 90 يوماً (دراسة 2025 على المرأة)',
        'رفع كثافة الشعر +34.5% في 8 أشهر',
        'نمو ملحوظ عند فرق الشعر والمناطق المُصابة',
        'فروة رأس أكثر صحة ومرونة من أول شهر',
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
