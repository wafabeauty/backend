import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import CartDrawer from '@/components/cart/CartDrawer'
import CheckoutModal from '@/components/checkout/CheckoutModal'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'الشروط والأحكام | وفاء للجمال',
  description: 'الشروط والأحكام العامة لاستخدام موقع وفاء للجمال وإجراء عمليات الشراء',
}

const sections = [
  {
    title: 'أولاً: القبول بالشروط',
    content: `باستخدامك لموقع وفاء للجمال (wafabeauty.shop) أو إجرائك لأي عملية شراء، فإنك تقر بقراءة هذه الشروط والأحكام وفهمها والموافقة عليها. إذا كنت لا توافق على أي من هذه الشروط، يرجى عدم استخدام الموقع.`,
  },
  {
    title: 'ثانياً: المنتجات والأسعار',
    content: `• جميع المنتجات المعروضة هي منتجات تجميلية مخصصة للاستخدام الخارجي.
• الأسعار المعروضة بالريال السعودي (SAR) وتشمل ضريبة القيمة المضافة 15%.
• نحتفظ بحق تعديل الأسعار دون إشعار مسبق. لن يؤثر ذلك على الطلبات المؤكدة مسبقاً.
• الكميات محدودة، ولا يُعدّ عرض المنتج على الموقع ضماناً بتوفره الدائم.`,
  },
  {
    title: 'ثالثاً: الطلب والدفع',
    content: `• طريقة الدفع الوحيدة المتاحة هي الدفع عند الاستلام (Cash on Delivery - COD).
• يُعتبر طلبك مؤكداً بعد اتصال مندوبنا بك وتأكيده هاتفياً.
• يحق لنا رفض أي طلب أو إلغاؤه دون ذكر الأسباب في حالات الاشتباه بالاحتيال أو الطلبات المتعددة غير المبررة.
• نحتفظ بحق تعديل الطلب أو إلغائه في حال تعذّر التواصل معك خلال 48 ساعة من تقديمه.`,
  },
  {
    title: 'رابعاً: الشحن والتوصيل',
    content: `• نوفر الشحن لجميع مناطق المملكة العربية السعودية.
• المدة المتوقعة للتوصيل: 2-5 أيام عمل من تأكيد الطلب.
• التوصيل مجاني للطلبات التي تساوي أو تزيد عن 199 ريال.
• لسنا مسؤولين عن التأخيرات الناجمة عن قصور شركة الشحن أو ظروف قاهرة.`,
  },
  {
    title: 'خامساً: استخدام المنتجات',
    content: `• منتجاتنا مخصصة للاستخدام الخارجي فقط.
• يُنصح بإجراء اختبار الحساسية قبل الاستخدام الكامل، خاصةً لأصحاب البشرة الحساسة.
• تُعدّ النتائج فردية وتتفاوت من شخص لآخر بحسب نوع البشرة والاستخدام المنتظم.
• المنتجات ليست أدوية ولا تُغني عن استشارة طبيب الجلدية في الحالات المرضية.`,
  },
  {
    title: 'سادساً: الملكية الفكرية',
    content: `جميع المحتويات المنشورة على الموقع بما في ذلك النصوص والصور والشعارات والتصاميم هي ملكية حصرية لوفاء للجمال ومحمية بموجب أنظمة الملكية الفكرية في المملكة العربية السعودية. يُحظر نسخ أو إعادة نشر أي محتوى دون إذن كتابي مسبق.`,
  },
  {
    title: 'سابعاً: تحديد المسؤولية',
    content: `• لا تتجاوز مسؤوليتنا في أي حال من الأحوال قيمة الطلب الذي تقدمت به.
• لسنا مسؤولين عن أي أضرار غير مباشرة أو تبعية ناجمة عن استخدام منتجاتنا.
• في حال وجود حساسية معروفة لأي من المكونات المذكورة، يقع على عاتق العميل التحقق من ذلك قبل الشراء.`,
  },
  {
    title: 'ثامناً: القانون المطبّق',
    content: `تخضع هذه الشروط والأحكام لأنظمة ولوائح المملكة العربية السعودية. أي نزاع ينشأ عن هذه الشروط يُحسم أمام المحاكم المختصة في المملكة العربية السعودية.`,
  },
  {
    title: 'تاسعاً: التواصل والشكاوى',
    content: `للشكاوى والاستفسارات المتعلقة بهذه الشروط، تواصل معنا:
البريد الإلكتروني: contactwafabeauty@gmail.com
أوقات الدعم: السبت - الخميس، 9 صباحاً - 9 مساءً`,
  },
]

export default function TermsPage() {
  return (
    <>
      <Header />
      <CartDrawer />
      <CheckoutModal />

      <main className="pt-32 pb-24 px-4 bg-brand-off-white min-h-screen">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-brand-gold font-bold tracking-[0.2em] uppercase text-xs mb-3 block">Legal</span>
            <h1 className="text-4xl font-black text-brand-blue mb-4">الشروط والأحكام</h1>
            <div className="w-12 h-1 bg-brand-gold mx-auto mb-6" />
            <p className="text-slate-500 text-sm font-medium">آخر تحديث: يونيو 2026</p>
          </div>

          <div className="space-y-6">
            {sections.map((section) => (
              <div key={section.title} className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
                <h2 className="font-black text-brand-blue text-lg mb-4">{section.title}</h2>
                <p className="text-slate-600 text-sm leading-[2] font-medium whitespace-pre-line">{section.content}</p>
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </>
  )
}
