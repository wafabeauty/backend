'use client'

import { useEffect, useRef } from 'react'
import { useForm } from 'react-hook-form'
import { v4 as uuidv4 } from 'uuid'
import { useCartStore } from '@/store/cartStore'
import { submitOrder, validateIp } from '@/lib/api'
import { trackPurchase } from '@/lib/pixels'
import { CheckoutFormData } from '@/types'
import { getUpsellProduct } from '@/lib/products'

export default function CheckoutModal() {
  const {
    checkoutStep,
    setCheckoutStep,
    items,
    getTotalAmount,
    setCheckoutData,
    setOrderId,
    setEventId,
    setUpsellProduct,
  } = useCartStore()

  const isOpen = checkoutStep === 'checkout'
  const modalRef = useRef<HTMLDivElement>(null)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<CheckoutFormData>()

  // Close on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        setCheckoutStep('cart')
      }
    }
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      document.body.style.overflow = 'hidden'
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.body.style.overflow = ''
    }
  }, [isOpen, setCheckoutStep])

  const onSubmit = async (data: CheckoutFormData) => {
    // Validate IP before proceeding
    try {
      const ipCheck = await validateIp(data.phone)
      if (!ipCheck.allowed) {
        setError('root', { message: ipCheck.message || 'عذراً، لا يمكن إتمام الطلب من موقعك الحالي' })
        return
      }
    } catch {
      // Fail open — don't block the customer on a network error
    }

    const eventId = uuidv4()
    setEventId(eventId)
    setCheckoutData(data)

    // Fire pixel purchase event immediately for deduplication
    trackPurchase(eventId, getTotalAmount())

    try {
      const response = await submitOrder({
        fullName: data.fullName,
        phone: data.phone,
        city: data.city,
        address: data.address,
        items,
        totalAmount: getTotalAmount(),
        eventId,
        userAgent: navigator.userAgent,
      })

      setOrderId(response.orderId)

      // Determine upsell product
      const cartSlugs = items.map((i) => i.product.slug)
      const upsellProd = getUpsellProduct(cartSlugs)
      setUpsellProduct(upsellProd)

      // Show upsell
      setCheckoutStep('upsell')
    } catch (err) {
      setError('root', {
        message: err instanceof Error ? err.message : 'حدث خطأ. يرجى المحاولة مرة أخرى.',
      })
    }
  }

  if (!isOpen) return null

  const total = getTotalAmount()

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
      {/* Overlay */}
      <div className="absolute inset-0 bg-brand-blue/60 backdrop-blur-md animate-fade-in" />

      {/* Modal */}
      <div
        ref={modalRef}
        className="relative w-full sm:max-w-lg bg-brand-off-white rounded-t-[2.5rem] sm:rounded-[2.5rem] shadow-premium max-h-[95vh] overflow-y-auto animate-slide-bottom"
        style={{ direction: 'rtl' }}
      >
        {/* Header */}
        <div className="sticky top-0 bg-brand-off-white/90 backdrop-blur-xl border-b border-brand-blue/5 px-8 py-6 rounded-t-[2.5rem] z-10">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-brand-gold font-bold tracking-[0.2em] uppercase text-[10px] mb-1 block">Secure Checkout</span>
              <h2 className="font-black text-brand-blue text-2xl tracking-tight">إتمام الطلب</h2>
            </div>
            <button
              onClick={() => setCheckoutStep('cart')}
              className="w-10 h-10 rounded-full bg-white flex items-center justify-center hover:bg-gray-50 transition-colors border border-brand-blue/5 text-slate-400"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <div className="p-8 space-y-8">
          {/* Order Summary */}
          <div className="bg-white rounded-3xl p-6 border border-brand-blue/5 shadow-sm">
            <p className="font-bold text-brand-blue text-xs uppercase tracking-widest mb-4">Order Summary</p>
            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.product.id} className="flex justify-between items-center">
                  <span className="text-slate-600 text-sm font-medium line-clamp-1 flex-1">{item.product.nameAr}</span>
                  <span className="font-black text-brand-blue text-sm mr-4">{item.tier.price} SAR</span>
                </div>
              ))}
              <div className="border-t border-gray-100 pt-4 flex justify-between items-center">
                <span className="font-bold text-slate-400 uppercase tracking-widest text-xs">Total</span>
                <span className="font-black text-brand-blue text-2xl">{total} <span className="text-sm">SAR</span></span>
              </div>
            </div>
          </div>

          {/* Trust Badges */}
          <div className="flex items-center justify-between bg-white rounded-2xl p-4 border border-brand-blue/5 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-brand-gold/10 flex items-center justify-center text-brand-gold">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <div>
                <p className="font-black text-brand-blue text-sm">الدفع عند الاستلام</p>
                <p className="text-slate-400 text-xs font-medium tracking-wide">ادفعي فقط عند الاستلام</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-brand-gold font-bold text-xs uppercase tracking-widest">100% Secure</p>
            </div>
          </div>

          {/* Scarcity */}
          <div className="flex items-center gap-3 bg-red-50/50 border border-red-100/50 rounded-xl px-4 py-3">
            <span className="relative flex h-2 w-2 flex-shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
            </span>
            <p className="text-red-800 text-xs font-bold tracking-wide">
              الكمية محدودة جداً – آخر {Math.floor(Math.random() * 8) + 3} وحدات متوفرة
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Full Name */}
            <div>
              <label className="block text-xs font-bold text-brand-blue uppercase tracking-widest mb-2">
                الاسم الكامل <span className="text-brand-gold">*</span>
              </label>
              <input
                {...register('fullName', {
                  required: 'يرجى إدخال اسمك الكامل',
                  minLength: { value: 3, message: 'الاسم يجب أن يكون 3 أحرف على الأقل' },
                })}
                type="text"
                placeholder="سارة العتيبي"
                className={`w-full bg-white border-2 rounded-2xl px-5 py-4 text-right font-medium focus:outline-none focus:border-brand-gold transition-colors shadow-sm ${
                  errors.fullName ? 'border-red-400' : 'border-gray-100'
                }`}
                dir="rtl"
              />
              {errors.fullName && (
                <p className="text-red-500 text-xs mt-2 font-bold">{errors.fullName.message}</p>
              )}
            </div>

            {/* Phone */}
            <div>
              <label className="block text-xs font-bold text-brand-blue uppercase tracking-widest mb-2">
                رقم الجوال <span className="text-brand-gold">*</span>
              </label>
              <input
                {...register('phone', {
                  required: 'يرجى إدخال رقم جوالك',
                  pattern: {
                    value: /^05\d{8}$/,
                    message: 'يجب أن يبدأ الرقم بـ 05 ويتكون من 10 أرقام (مثال: 0512345678)',
                  },
                })}
                type="tel"
                placeholder="05XXXXXXXX"
                maxLength={10}
                className={`w-full bg-white border-2 rounded-2xl px-5 py-4 text-right font-medium tracking-widest focus:outline-none focus:border-brand-gold transition-colors shadow-sm ${
                  errors.phone ? 'border-red-400' : 'border-gray-100'
                }`}
                dir="ltr"
              />
              {errors.phone && (
                <p className="text-red-500 text-xs mt-2 font-bold">{errors.phone.message}</p>
              )}
              <div className="flex items-center gap-2 mt-3 text-slate-400">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <p className="text-xs font-medium">سيتصل بك مندوبنا لتأكيد الطلب خلال 24 ساعة</p>
              </div>
            </div>

            {/* City */}
            <div>
              <label className="block text-xs font-bold text-brand-blue uppercase tracking-widest mb-2">
                المدينة <span className="text-brand-gold">*</span>
              </label>
              <select
                {...register('city', { required: 'يرجى اختيار مدينتك' })}
                className={`w-full bg-white border-2 rounded-2xl px-5 py-4 text-right font-medium focus:outline-none focus:border-brand-gold transition-colors shadow-sm ${
                  errors.city ? 'border-red-400' : 'border-gray-100'
                }`}
                dir="rtl"
              >
                <option value="">اختاري مدينتك</option>
                <option value="الرياض">الرياض</option>
                <option value="جدة">جدة</option>
                <option value="مكة المكرمة">مكة المكرمة</option>
                <option value="المدينة المنورة">المدينة المنورة</option>
                <option value="الدمام">الدمام</option>
                <option value="الخبر">الخبر</option>
                <option value="الظهران">الظهران</option>
                <option value="الطائف">الطائف</option>
                <option value="تبوك">تبوك</option>
                <option value="بريدة">بريدة</option>
                <option value="خميس مشيط">خميس مشيط</option>
                <option value="حائل">حائل</option>
                <option value="نجران">نجران</option>
                <option value="جازان">جازان</option>
                <option value="الجبيل">الجبيل</option>
                <option value="أبها">أبها</option>
                <option value="ينبع">ينبع</option>
                <option value="أخرى">أخرى</option>
              </select>
              {errors.city && (
                <p className="text-red-500 text-xs mt-2 font-bold">{errors.city.message}</p>
              )}
            </div>

            {/* Address */}
            <div>
              <label className="block text-xs font-bold text-brand-blue uppercase tracking-widest mb-2">
                العنوان التفصيلي <span className="text-slate-400 font-normal normal-case">(اختياري)</span>
              </label>
              <input
                {...register('address')}
                type="text"
                placeholder="الحي، اسم الشارع..."
                className="w-full bg-white border-2 border-gray-100 rounded-2xl px-5 py-4 text-right font-medium focus:outline-none focus:border-brand-gold transition-colors shadow-sm"
                dir="rtl"
              />
            </div>

            {/* Root error */}
            {errors.root && (
              <div className="bg-red-50 border border-red-200 rounded-2xl p-4">
                <p className="text-red-600 text-sm font-bold">{errors.root.message}</p>
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full mt-4 bg-brand-blue text-white font-black py-5 rounded-full transition-all duration-300 text-lg flex items-center justify-center gap-3 ${
                isSubmitting
                  ? 'opacity-70 cursor-not-allowed'
                  : 'hover:bg-brand-blue-light active:scale-[0.98] shadow-premium'
              }`}
            >
              {isSubmitting ? (
                <>
                  <span className="w-5 h-5 border-2 border-white/30 border-t-brand-gold rounded-full animate-spin" />
                  جارٍ تأكيد طلبك...
                </>
              ) : (
                <>
                  تأكيد الطلب 
                  <svg className="w-5 h-5 rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
