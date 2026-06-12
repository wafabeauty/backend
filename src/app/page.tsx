import Link from 'next/link';

const products = [
  {
    id: "kojic-body-serum",
    name: "سيروم التفتيح السريري بحمض الكوجيك",
    tagline: "ممحاة تصبغات الجسم وجلد الفراولة",
    description: "مركب طبي مركز يعمل على تكسير الميلانين العنيد. مصمم خصيصاً للقضاء على التصبغات الداكنة، الركب، ومسام الساقين البارزة (جلد الفراولة) خلال 14 يوماً.",
    price: 199,
    originalPrice: 350,
    features: ["٢٪ حمض الكوجيك النشط", "نتائج سريرية مثبتة", "آمن للمناطق الحساسة"],
    image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: "caffeine-eye-roller",
    name: "رولر الكافيين والببتيد الطبي",
    tagline: "مصحح الهالات السوداء والانتفاخات الفوري",
    description: "امسحي آثار الإرهاق في 8 ثوانٍ. كرة الفولاذ الباردة تضخ الكافيين المركز لتقليص الأوعية الدموية وإخفاء الانتفاخات فوراً، بينما يعالج الببتيد التجاويف على المدى الطويل.",
    price: 199,
    originalPrice: 280,
    features: ["تأثير تبريد فوري", "كافيين نقي 5%", "بديل الكونسيلر اليومي"],
    image: "https://images.unsplash.com/photo-1596755389378-c31d21fd1273?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: "sea-salt-scalp-detox",
    name: "مقشر الديتوكس بملح البحر العلاجي",
    tagline: "منقي فروة الرأس من أملاح المياه العسرة",
    description: "المياه العسرة في الخليج تخنق بصيلات شعرك. هذا الديتوكس العلاجي يذيب تراكمات الكالسيوم القاسية، يوقف التساقط من الجذور، ويقضي على قشرة الرأس نهائياً.",
    price: 199,
    originalPrice: 290,
    features: ["يزيل أملاح الاستحمام", "يفتح البصيلات المغلقة", "إحساس انتعاش عميق"],
    image: "https://images.unsplash.com/photo-1608248593842-8021f11cb064?q=80&w=600&auto=format&fit=crop"
  }
];

export default function Home() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      {/* Hero Section - 180 IQ Positioning */}
      <section className="bg-white rounded-2xl p-8 md:p-12 mb-12 shadow-sm border border-gray-200 text-center relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-brand-100 rounded-full blur-3xl -z-10 opacity-60"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-brand-50 rounded-full blur-3xl -z-10 opacity-60"></div>
        
        <span className="inline-block bg-brand-100 text-brand-600 px-4 py-1.5 rounded-full text-sm font-bold mb-6 tracking-wide border border-brand-500/20">
          صُنع خصيصاً لطبيعة مناخ ومياه الخليج
        </span>
        <h1 className="text-3xl md:text-5xl font-extrabold mb-6 text-brand-900 leading-tight">
          لا تلومي جيناتك، <br/>
          <span className="text-brand-600">اللوم على البيئة والمياه.</span>
        </h1>
        <p className="text-gray-600 mb-8 max-w-2xl mx-auto text-lg leading-relaxed">
          نحن في <strong className="text-brand-900">وفا بيوتي</strong> لا نبيع "مستحضرات تجميل" عادية. نحن نقدم <span className="underline decoration-brand-500/30 decoration-4 underline-offset-4">بروتوكولات سريرية علاجية</span> مصممة علمياً لمعالجة أضرار المياه العسرة، والحرارة، والجفاف في السعودية.
        </p>
        <div className="flex flex-wrap justify-center gap-4 text-sm font-bold text-gray-700">
          <div className="bg-gray-50 px-4 py-2 rounded-lg border border-gray-200 flex items-center gap-2">
            🔬 تراكيز طبية فعالة
          </div>
          <div className="bg-gray-50 px-4 py-2 rounded-lg border border-gray-200 flex items-center gap-2">
            📦 الدفع عند الاستلام
          </div>
          <div className="bg-gray-50 px-4 py-2 rounded-lg border border-gray-200 flex items-center gap-2">
            🇸🇦 الشحن السريع للمملكة
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <div id="products" className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {products.map((product) => (
          <div key={product.id} className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-200 hover:shadow-lg transition-all duration-300 flex flex-col group">
            <div className="aspect-[4/3] bg-gray-100 overflow-hidden relative">
              <img src={product.image} alt={product.name} className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute top-3 right-3 bg-red-600 text-white text-xs font-bold px-3 py-1.5 rounded shadow-sm">
                توفير 45% اليوم
              </div>
            </div>
            <div className="p-6 flex flex-col flex-grow relative">
              <div className="text-brand-600 text-xs font-bold mb-2 tracking-wider uppercase">{product.tagline}</div>
              <h3 className="font-extrabold text-xl mb-3 text-brand-900 leading-snug">{product.name}</h3>
              <p className="text-gray-600 text-sm mb-5 leading-relaxed flex-grow">
                {product.description}
              </p>
              
              <ul className="mb-6 space-y-2">
                {product.features.map((feature, idx) => (
                  <li key={idx} className="text-xs font-bold text-gray-700 flex items-center gap-2">
                    <span className="text-brand-accent">✓</span> {feature}
                  </li>
                ))}
              </ul>

              <div className="flex items-center justify-between mb-6 pt-4 border-t border-gray-100">
                <div>
                  <span className="text-3xl font-extrabold text-brand-900">{product.price} <span className="text-sm font-bold">ر.س</span></span>
                  <div className="text-sm text-gray-400 line-through mt-1">{product.originalPrice} ر.س</div>
                </div>
              </div>
              <Link 
                href={`/checkout?product=${product.id}`}
                className="w-full block text-center bg-brand-600 text-white py-3.5 rounded-lg font-bold text-lg hover:bg-brand-500 transition shadow-md shadow-brand-500/20"
              >
                أكمل الطلب (الدفع عند الاستلام)
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}