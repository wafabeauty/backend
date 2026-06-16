import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import CartDrawer from '@/components/cart/CartDrawer'
import CheckoutModal from '@/components/checkout/CheckoutModal'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'سياسة الخصوصية | وفاء للجمال',
  description: 'سياسة الخصوصية لوفاء للجمال — كيف نجمع بياناتك ونحميها وفقاً لنظام حماية البيانات الشخصية السعودي (PDPL)',
}

const sections = [
  {
    title: 'أولاً: المقدمة',
    content: `تلتزم شركة وفاء للجمال ("نحن" أو "الشركة") بحماية خصوصيتك وبياناتك الشخصية وفقاً لنظام حماية البيانات الشخصية السعودي (PDPL) الصادر بالمرسوم الملكي رقم م/19 بتاريخ 1443/02/09 هـ، ولوائحه التنفيذية. تصف هذه السياسة كيفية جمع بياناتك واستخدامها وحمايتها عند تعاملك مع موقعنا wafabeauty.shop.`,
  },
  {
    title: 'ثانياً: البيانات التي نجمعها',
    content: `نجمع البيانات الشخصية التالية عند إتمام طلبك:
• الاسم الكامل
• رقم الجوال
• عنوان التوصيل (المدينة، الحي، الشارع)
• بيانات الجهاز والمتصفح (عنوان IP، نوع المتصفح) لأغراض أمنية

لا نجمع بيانات بطاقات الائتمان حيث إن طريقة الدفع الوحيدة المتاحة هي الدفع عند الاستلام.`,
  },
  {
    title: 'ثالثاً: كيف نستخدم بياناتك',
    content: `نستخدم بياناتك الشخصية للأغراض التالية حصراً:
• معالجة طلبك وتأكيده
• التواصل معك لتحديد موعد التوصيل
• إرسال تحديثات تتعلق بحالة طلبك
• تحسين خدماتنا وتجربة المستخدم
• الامتثال للمتطلبات القانونية والتنظيمية في المملكة العربية السعودية`,
  },
  {
    title: 'رابعاً: مشاركة البيانات مع أطراف ثالثة',
    content: `قد نشارك بياناتك مع:
• شركات الشحن والتوصيل لإيصال طلبك
• منصات التحليل والإعلان (Meta، TikTok، Snapchat) بشكل مجهول الهوية لتحسين حملاتنا الإعلانية
• الجهات الحكومية والقضائية عند الطلب وفقاً للأنظمة السعودية

لا نبيع بياناتك الشخصية لأي طرف ثالث لأغراض تسويقية.`,
  },
  {
    title: 'خامساً: حفظ البيانات',
    content: `نحتفظ ببياناتك الشخصية لمدة لا تتجاوز (5) سنوات من تاريخ آخر تعامل لك معنا، وذلك للامتثال للمتطلبات الضريبية والتجارية. بعد انتهاء هذه المدة تُحذف بياناتك نهائياً من أنظمتنا.`,
  },
  {
    title: 'سادساً: حقوقك بموجب نظام PDPL',
    content: `يكفل لك نظام حماية البيانات الشخصية الحقوق التالية:
• الحق في الاطلاع على بياناتك الشخصية
• الحق في تصحيح البيانات غير الدقيقة
• الحق في طلب حذف بياناتك
• الحق في الاعتراض على معالجة بياناتك
• الحق في تقييد المعالجة
• الحق في نقل البيانات

لممارسة أي من هذه الحقوق، تواصل معنا عبر: contactwafabeauty@gmail.com`,
  },
  {
    title: 'سابعاً: ملفات الارتباط (Cookies)',
    content: `يستخدم موقعنا ملفات الارتباط (Cookies) للأغراض التالية:
• الحفاظ على جلستك وسلة التسوق
• تحليل أداء الموقع وتحسين تجربة المستخدم
• عرض إعلانات ذات صلة عبر منصات التواصل الاجتماعي

يمكنك تعطيل ملفات الارتباط من إعدادات متصفحك، علماً بأن ذلك قد يؤثر على بعض وظائف الموقع.`,
  },
  {
    title: 'ثامناً: أمان البيانات',
    content: `نطبق إجراءات تقنية وتنظيمية مناسبة لحماية بياناتك الشخصية من الوصول غير المصرح به أو الإفصاح أو التعديل أو الحذف. يتم نقل البيانات عبر اتصالات HTTPS مشفرة.`,
  },
  {
    title: 'تاسعاً: التواصل معنا',
    content: `إذا كان لديك أي استفسار حول هذه السياسة أو طريقة معالجتنا لبياناتك الشخصية، يرجى التواصل معنا:

البريد الإلكتروني: contactwafabeauty@gmail.com
أوقات الدعم: السبت - الخميس، 9 صباحاً - 9 مساءً`,
  },
]

export default function PrivacyPolicyPage() {
  return (
    <>
      <Header />
      <CartDrawer />
      <CheckoutModal />

      <main className="pt-32 pb-24 px-4 bg-brand-off-white min-h-screen">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-brand-gold font-bold tracking-[0.2em] uppercase text-xs mb-3 block">Legal</span>
            <h1 className="text-4xl font-black text-brand-blue mb-4">سياسة الخصوصية</h1>
            <div className="w-12 h-1 bg-brand-gold mx-auto mb-6" />
            <p className="text-slate-500 text-sm font-medium">
              آخر تحديث: يونيو 2026 — متوافقة مع نظام حماية البيانات الشخصية السعودي (PDPL)
            </p>
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
