import { Product, PricingTier } from '@/types'

export const PRICING_TIERS: PricingTier[] = [
  {
    quantity: 1,
    price: 199,
    labelAr: 'قطعة واحدة',
  },
  {
    quantity: 2,
    price: 279,
    labelAr: 'قطعتان',
    savings: 'وفري 119 ريال',
    popular: true,
  },
  {
    quantity: 3,
    price: 349,
    labelAr: 'ثلاث قطع',
    savings: 'وفري 248 ريال',
  },
]

export const UPSELL_PRICE = 99

export const PRODUCTS: Product[] = [
  {
    id: 'astaxanthin-serum',
    slug: 'astaxanthin-serum',
    nameAr: 'سيروم الأستاكسانثين وحمض الترانيكساميك',
    nameEn: 'Astaxanthin + Tranexamic Acid Brightening Serum',
    subtitleAr: 'المزيج الطبي الجديد لعلاج البقع الداكنة والتصبغات — أقوى بـ 6,000× من فيتامين سي',
    descriptionAr:
      'المرة الأولى في السوق: تركيبة تجمع الأستاكسانثين — ملكة مضادات الأكسدة — مع حمض الترانيكساميك 3% الذي باتت تصفه جميع طبيبات الجلدية في المملكة. يعمل على مستويين: يوقف إنتاج الميلانين من جذوره، ويمحو البقع الموجودة بسرعة مضاعفة.',
    price: 199,
    imagePlaceholder: '/images/astaxanthin-serum.jpg',
    gradientFrom: '#7B2D3E',
    gradientTo: '#C9A47E',
    ingredients: ['أستاكسانثين 0.5%', 'حمض الترانيكساميك 3%', 'نياسيناميد 5%', 'فيتامين سي المستقر'],
    benefits: [
      'يوقف إنتاج الميلانين من جذوره في أسبوع واحد',
      'يُفتّح البقع الداكنة بنسبة تصل إلى 60% في 4 أسابيع',
      'الأستاكسانثين أقوى من فيتامين سي بـ 6,000 مرة',
      'مناسب لجميع أنواع البشرة بما فيها الحساسة',
    ],
    reviewCount: 1247,
    rating: 4.9,
    category: 'serum',
  },
  {
    id: 'grape-seed-eye-roller',
    slug: 'grape-seed-eye-roller',
    nameAr: 'رولر بذور العنب الطبي للهالات السوداء',
    nameEn: 'Grape Seed OPC Medical Dark Circle Roller',
    subtitleAr: 'العلاج الوحيد الذي يعالج السبب الحقيقي للهالات — لا الكريمات ولا الكافيين',
    descriptionAr:
      'مستخلص بذور العنب OPC مع إنزيم SOD من البطيخ الفرنسي — التركيبة الحائزة على جوائز دولية والمثبتة سريرياً بتقليل الهالات 19% في 8 أسابيع. يعمل على تحسين الدورة الدموية الدقيقة تحت العين مباشرة، وهي السبب الجذري للهالات التي لم يعالجها أي رولر من قبل.',
    price: 199,
    imagePlaceholder: '/images/grape-seed-eye-roller.jpg',
    gradientFrom: '#521D29',
    gradientTo: '#9B3A50',
    ingredients: ['مستخلص بذور العنب OPC 300mg', 'إنزيم SOD من البطيخ الفرنسي', 'فيتامين ك', 'ببتيدات مضادة للتجاعيد'],
    benefits: [
      'يُحسّن الدورة الدموية تحت العين مباشرة من اللمسة الأولى',
      'تقليل الهالات السوداء -19% مُثبت سريرياً',
      'يُقلص الانتفاخ ويُشدّد جلد منطقة العين',
      'نتائج مرئية من الأسبوع الثاني',
    ],
    reviewCount: 983,
    rating: 4.8,
    category: 'eye-care',
  },
  {
    id: 'scalp-serum',
    slug: 'scalp-serum',
    nameAr: 'سيروم فروة الرأس بثمار المنشار والتوكوترينول',
    nameEn: 'Saw Palmetto & Tocotrienol Scalp Growth Serum',
    subtitleAr: 'البديل السريري للبيوتين — لأن شعرك يستحق ما هو أقوى وأثبت علمياً',
    descriptionAr:
      'بيوتين؟ جربتِه ولم يُجدِ. لأن تساقط الشعر له سبب أعمق: هرمون DHT الذي يُصغّر البصيلات ويُضعفها. سيرومنا يحتوي على مستخلص ثمار المنشار — المثبط الطبيعي الأول لـ DHT — إلى جانب التوكوترينول الذي رفع كثافة الشعر بنسبة 34.5% في تجربة سريرية معشاة محكومة.',
    price: 199,
    imagePlaceholder: '/images/scalp-serum.jpg',
    gradientFrom: '#C9A47E',
    gradientTo: '#DEC4A8',
    ingredients: ['مستخلص ثمار المنشار 160mg', 'توكوترينول فيتامين هـ', 'زيت بذور اليقطين', 'فيتامين د3'],
    benefits: [
      'يحجب DHT — الهرمون المسبب الأول لتساقط الشعر — مباشرة',
      'تقليل التساقط 70% في 90 يوماً — مُثبت في دراسة 2026',
      'رفع كثافة الشعر +34.5% في 8 أشهر بدون بيوتين',
      'خالٍ من البيوتين — لأن جسمك لا يحتاجه',
    ],
    reviewCount: 1589,
    rating: 4.9,
    category: 'hair-care',
  },
]

export function getProductBySlug(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug)
}

export function getCrossSells(currentSlug: string): Product[] {
  return PRODUCTS.filter((p) => p.slug !== currentSlug)
}

export function getUpsellProduct(cartSlugs: string[]): Product | null {
  const notInCart = PRODUCTS.find((p) => !cartSlugs.includes(p.slug))
  return notInCart || null
}
