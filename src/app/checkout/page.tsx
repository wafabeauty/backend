"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

const products = {
  "kojic-body-serum": { 
    name: "سيروم التفتيح السريري بحمض الكوجيك", 
    price: 195, 
    upsellId: "caffeine-eye-roller", 
    upsellName: "رولر الكافيين والببتيد للهالات", 
    upsellPrice: 99 // Discounted from 145
  },
  "caffeine-eye-roller": { 
    name: "رولر الكافيين والببتيد الطبي", 
    price: 145,
    upsellId: "kojic-body-serum", 
    upsellName: "سيروم التفتيح السريري بحمض الكوجيك", 
    upsellPrice: 139 // Discounted from 195
  },
  "sea-salt-scalp-detox": { 
    name: "مقشر الديتوكس بملح البحر العلاجي", 
    price: 165,
    upsellId: "caffeine-eye-roller", 
    upsellName: "رولر الكافيين والببتيد للهالات", 
    upsellPrice: 99 // Discounted from 145
  },
};

function CheckoutForm() {
  const searchParams = useSearchParams();
  const productId = searchParams.get("product");
  const baseProduct = productId ? products[productId as keyof typeof products] : null;

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [acceptUpsell, setAcceptUpsell] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call to save order
    setTimeout(() => {
      setLoading(false);
      setIsSubmitted(true);
    }, 1500);
  };

  if (!baseProduct) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold mb-4 text-gray-900">المنتج غير موجود</h2>
        <Link href="/" className="text-blue-600 underline font-bold">العودة للرئيسية</Link>
      </div>
    );
  }

  const finalPrice = acceptUpsell ? baseProduct.price + baseProduct.upsellPrice : baseProduct.price;

  if (isSubmitted) {
    return (
      <div className="max-w-md mx-auto bg-white p-8 rounded-2xl shadow-lg border border-gray-200 text-center my-12">
        <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6 text-4xl">✓</div>
        <h2 className="text-2xl font-extrabold mb-3 text-gray-900">تم استلام طلبك بنجاح!</h2>
        <div className="bg-gray-50 p-4 rounded-xl mb-6 border border-gray-100 text-right">
          <p className="font-bold text-gray-800 mb-2">الملخص:</p>
          <p className="text-sm text-gray-600 flex justify-between"><span>{baseProduct.name}</span></p>
          {acceptUpsell && <p className="text-sm text-green-600 flex justify-between mt-1"><span>+ {baseProduct.upsellName} (عرض خاص)</span></p>}
          <div className="border-t border-gray-200 mt-3 pt-3 flex justify-between font-extrabold text-lg text-gray-900">
            <span>المبلغ المطلوب عند الاستلام:</span>
            <span>{finalPrice} ر.س</span>
          </div>
        </div>
        <p className="text-gray-600 mb-8 font-medium">
          سيقوم أخصائي خدمة العملاء بالتواصل معك عبر الواتساب لتأكيد موعد الشحن.
        </p>
        <Link href="/" className="bg-blue-600 text-white px-8 py-3.5 rounded-xl font-bold inline-block hover:bg-blue-700 transition shadow-md">
          العودة للمتجر
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-lg mx-auto bg-white p-6 md:p-8 rounded-2xl shadow-lg border border-gray-200 my-8">
      <div className="mb-6 pb-6 border-b border-gray-100">
        <h1 className="text-2xl font-extrabold mb-2 text-gray-900">إتمام الطلب بأمان</h1>
        <p className="text-gray-500 font-medium">الدفع عند الاستلام - لا داعي لبطاقة ائتمانية</p>
      </div>

      <div className="bg-blue-50 p-5 rounded-xl mb-6 border border-blue-100 flex justify-between items-center">
        <div>
          <h3 className="font-extrabold text-gray-900">{baseProduct.name}</h3>
          <p className="text-sm text-gray-500 mt-1 font-bold">الكمية: 1</p>
        </div>
        <div className="text-left font-extrabold text-xl text-blue-900">
          {baseProduct.price} ر.س
        </div>
      </div>

      {/* THE 180-IQ PRE-PURCHASE UPSELL */}
      <div className={`p-5 rounded-xl mb-8 border-2 transition-all cursor-pointer ${acceptUpsell ? 'border-green-500 bg-green-50' : 'border-dashed border-red-300 bg-red-50 hover:bg-red-100'}`} onClick={() => setAcceptUpsell(!acceptUpsell)}>
        <div className="flex items-start gap-3">
          <div className="mt-1">
            <input 
              type="checkbox" 
              checked={acceptUpsell} 
              onChange={() => setAcceptUpsell(!acceptUpsell)}
              className="w-5 h-5 rounded border-gray-300 text-green-600 focus:ring-green-500 cursor-pointer"
            />
          </div>
          <div>
            <span className="bg-red-600 text-white text-[10px] font-bold px-2 py-1 rounded uppercase mb-2 inline-block tracking-wider">عرض لمرة واحدة</span>
            <h4 className="font-extrabold text-gray-900 text-sm">أضف {baseProduct.upsellName} إلى بروتوكولك العلاجي!</h4>
            <p className="text-xs text-gray-600 mt-1 font-medium leading-relaxed">
              احصلي عليه الآن بسعر <span className="text-red-600 font-bold">{baseProduct.upsellPrice} ر.س فقط</span>. ضاعفي النتائج السريرية ووفرّي تكاليف الشحن.
            </p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-extrabold text-gray-700 mb-1.5">الاسم الكامل</label>
          <input 
            type="text" 
            required 
            placeholder="أدخل اسمك الكريم"
            className="w-full px-4 py-3.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-gray-50 focus:bg-white transition"
          />
        </div>

        <div>
          <label className="block text-sm font-extrabold text-gray-700 mb-1.5">رقم الواتساب للتأكيد</label>
          <input 
            type="tel" 
            required 
            dir="ltr"
            placeholder="05X XXX XXXX"
            className="w-full px-4 py-3.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-right bg-gray-50 focus:bg-white transition"
          />
        </div>

        <div>
          <label className="block text-sm font-extrabold text-gray-700 mb-1.5">المدينة</label>
          <select required className="w-full px-4 py-3.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none bg-gray-50 focus:bg-white transition cursor-pointer">
            <option value="">اختر مدينتك...</option>
            <option value="riyadh">الرياض (توصيل خلال 24 ساعة)</option>
            <option value="jeddah">جدة (توصيل خلال 24-48 ساعة)</option>
            <option value="dammam">الدمام (توصيل خلال 48 ساعة)</option>
            <option value="mecca">مكة المكرمة</option>
            <option value="medina">المدينة المنورة</option>
            <option value="other">مدينة أخرى (3-5 أيام)</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-extrabold text-gray-700 mb-1.5">العنوان بالتفصيل</label>
          <textarea 
            required 
            rows={3}
            placeholder="اسم الحي، الشارع، أقرب معلم"
            className="w-full px-4 py-3.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none bg-gray-50 focus:bg-white transition"
          ></textarea>
        </div>

        <div className="pt-4 mt-2 border-t border-gray-100 flex justify-between items-center mb-6">
          <span className="font-bold text-gray-600">المجموع الإجمالي:</span>
          <span className="font-extrabold text-2xl text-gray-900">{finalPrice} ر.س</span>
        </div>

        <button 
          type="submit" 
          disabled={loading}
          className="w-full bg-blue-600 text-white py-4 rounded-xl font-extrabold text-lg hover:bg-blue-700 transition disabled:opacity-70 flex justify-center items-center shadow-lg shadow-blue-200"
        >
          {loading ? "جاري تشفير البيانات..." : `أكد الطلب بقيمة ${finalPrice} ر.س`}
        </button>

        <p className="text-xs text-center text-gray-500 mt-4 flex items-center justify-center gap-1.5 font-medium">
          🔒 بياناتك مشفرة وفقاً لمعايير الخصوصية السعودية
        </p>
      </form>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <div className="min-h-[80vh] px-4">
      <Suspense fallback={<div className="text-center py-20 text-gray-500 font-bold">جاري تحميل بروتوكولك العلاجي...</div>}>
        <CheckoutForm />
      </Suspense>
    </div>
  );
}