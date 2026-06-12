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
    id: 'kojic-serum',
    slug: 'kojic-serum',
    nameAr: 'سيروم التفتيح السريري بحمض الكوجيك',
    nameEn: 'Kojic Acid Clinical Brightening Serum',
    subtitleAr: 'محلول سريري متخصص لتوحيد البشرة وعلاج البقع الداكنة',
    descriptionAr:
      'صُمِّم خصيصاً لمواجهة تأثيرات مياه التحلية القاسية والحرارة الشديدة في المملكة. تركيبة سريرية مركّزة بحمض الكوجيك 2% لعلاج التصبغات، والبقع الداكنة، والبشرة غير المتجانسة اللون.',
    price: 199,
    imagePlaceholder: '/images/kojic-serum.jpg',
    gradientFrom: '#1B3A6B',
    gradientTo: '#2A5298',
    ingredients: ['حمض الكوجيك 2%', 'نياسيناميد 5%', 'فيتامين سي المستقر', 'حمض الهيالورونيك'],
    benefits: [
      'يُفتّح البقع الداكنة في 4 أسابيع',
      'يُوحّد لون البشرة',
      'يُقلّل من أثر تضخم المسام',
      'مناسب للبشرة الحساسة',
    ],
    reviewCount: 1247,
    rating: 4.9,
    category: 'serum',
  },
  {
    id: 'caffeine-roller',
    slug: 'caffeine-roller',
    nameAr: 'رولر الكافيين والببتيد الطبي',
    nameEn: 'Medical Caffeine & Peptide Eye Roller',
    subtitleAr: 'علاج طبي متخصص للهالات السوداء والانتفاخ تحت العين',
    descriptionAr:
      'تقنية الرولر المبرّد المحمّل بالكافيين 5% والببتيدات الطبية، يُعالج الهالات السوداء والانتفاخ الناتج عن الإجهاد وقلة النوم. نتائج مرئية من الاستخدام الأول.',
    price: 199,
    imagePlaceholder: '/images/caffeine-roller.jpg',
    gradientFrom: '#0F2244',
    gradientTo: '#1B3A6B',
    ingredients: ['كافيين 5%', 'ببتيد Syn-Ake', 'مستخلص البابونج', 'فيتامين ك'],
    benefits: [
      'يُقلّل الهالات السوداء في أسبوعين',
      'يُخفّف انتفاخ العين فورياً',
      'يُشدّد جلد منطقة العين',
      'رولر مبرّد للتطبيق الفوري',
    ],
    reviewCount: 983,
    rating: 4.8,
    category: 'eye-care',
  },
  {
    id: 'sea-salt-scrub',
    slug: 'sea-salt-scrub',
    nameAr: 'مقشر الديتوكس بملح البحر العلاجي',
    nameEn: 'Therapeutic Sea Salt Detox Scalp Scrub',
    subtitleAr: 'علاج متخصص لتراكمات مياه التحلية على فروة الرأس',
    descriptionAr:
      'التركيبة الأولى المُصمَّمة لمقاومة التأثيرات الطبيعية الفريدة لمياه التحلية في الخليج العربي. يُزيل الترسبات المعدنية، يُنشّط الدورة الدموية، ويُعالج تساقط الشعر من جذوره.',
    price: 199,
    imagePlaceholder: '/images/sea-salt-scrub.jpg',
    gradientFrom: '#1A7F5A',
    gradientTo: '#22A373',
    ingredients: ['ملح البحر الميت', 'زيت الأرجان', 'مستخلص الزنجبيل', 'بيوتين'],
    benefits: [
      'يُزيل تراكمات المعادن والكالسيوم',
      'يُقلّل تساقط الشعر من أول استخدام',
      'يُطهّر فروة الرأس من القشرة',
      'يُحفّز نمو الشعر الصحي',
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
