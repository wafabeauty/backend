'use client'

import { useEffect, useRef } from 'react'
import { useForm } from 'react-hook-form'
import { v4 as uuidv4 } from 'uuid'
import { useCartStore } from '@/store/cartStore'
import { submitOrder } from '@/lib/api'
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
    const eventId = uuidv4()
    setEventId(eventId)
    setCheckoutData(data)

    // Fire pixel purchase event immediately for deduplication
    trackPurchase(eventId, getTotalAmount())

    try {
      const response = await submitOrder({
        fullName: data.fullName,
        phone: data.phone,
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
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      {/* Modal */}
      <div
        ref={modalRef}
        className="relative w-full sm:max-w-lg bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl max-h-[95vh] overflow-y-auto animate-slide-bottom"
        style={{ direction: 'rtl' }}
      >
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-100 px-5 py-4 rounded-t-3xl sm:rounded-t-3xl">
          <div className="flex items-center justify-between">
            <h2 className="font-black text-brand-blue text-xl">إتمام الطلب</h2>
            <button
              onClick={() => setCheckoutStep('cart')}
              className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <div className="p-5 space-y-5">
          {/* Order Summary */}
          <div className="bg-gray-50 rounded-2xl p-4">
            <p className="font-bold text-gray-700 text-sm mb-3">ملخص طلبك:</p>
            <div className="space-y-2">
              {items.map((item) => (
                <div key={item.product.id} className="flex justify-between items-center">
                  <span className="text-gray-600 text-sm line-clamp-1 flex-1">{item.product.nameAr}</span>
                  <span className="font-bold text-gray-800 text-sm mr-2">{item.tier.price} ريال</span>
                </div>
              ))}
              <div className="border-t border-gray-200 pt-2 flex justify-between items-center">
                <span className="font-black text-gray-800">الإجمالي</span>
                <span className="font-black text-brand-blue text-xl">{total} ريال</span>
              </div>
            </div>
          </div>

          {/* Trust Badges */}
          <div className="flex items-center justify-between bg-brand-green/5 border border-brand-green/20 rounded-xl p-3">
            <div className="flex items-center gap-2">
              <span className="text-brand-green text-xl">✓</span>
              <div>
                <p className="font-bold text-brand-green text-sm">الدفع عند الاستلام</p>
                <p className="text-gray-500 text-xs">لا تدفع قبل استلام المنتج</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-brand-green font-bold text-sm">🔒 آمن 100%</p>
            </div>
          </div>

          {/* Scarcity */}
          <div className="flex items-center gap-2 bg-red-50 border border-red-100 rounded-xl px-3 py-2">
            <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse flex-shrink-0" />
            <p className="text-red-600 text-xs font-semibold">
              الكمية محدودة جداً – آخر {Math.floor(Math.random() * 8) + 3} وحدات فقط
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Full Name */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                الاسم الكامل <span className="text-red-500">*</span>
              </label>
              <input
                {...register('fullName', {
                  required: 'يرجى إدخال اسمك الكامل',
                  minLength: { value: 3, message: 'الاسم يجب أن يكون 3 أحرف على الأقل' },
                })}
                type="text"
                placeholder="مثال: سارة العتيبي"
                className={`w-full border-2 rounded-xl px-4 py-3 text-right font-medium focus:outline-none focus:border-brand-blue transition-colors ${
                  errors.fullName ? 'border-red-400 bg-red-50' : 'border-gray-200 focus:border-brand-blue'
                }`}
                dir="rtl"
              />
              {errors.fullName && (
                <p className="text-red-500 text-xs mt-1">{errors.fullName.message}</p>
              )}
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                رقم الجوال <span className="text-red-500">*</span>
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
                className={`w-full border-2 rounded-xl px-4 py-3 text-right font-medium focus:outline-none transition-colors ${
                  errors.phone ? 'border-red-400 bg-red-50' : 'border-gray-200 focus:border-brand-blue'
                }`}
                dir="ltr"
              />
              {errors.phone && (
                <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>
              )}
              <p className="text-gray-400 text-xs mt-1">
                📞 سيتصل بك مندوبنا لتأكيد الطلب خلال 24 ساعة
              </p>
            </div>

            {/* Root error */}
            {errors.root && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-3">
                <p className="text-red-600 text-sm font-semibold">{errors.root.message}</p>
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full bg-brand-green text-white font-black py-4 rounded-xl transition-all duration-200 shadow-lg shadow-brand-green/25 text-lg ${
                isSubmitting
                  ? 'opacity-70 cursor-not-allowed'
                  : 'hover:bg-brand-green-light active:scale-95'
              }`}
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  جارٍ تأكيد طلبك...
                </span>
              ) : (
                '✓ تأكيد الطلب – الدفع عند الاستلام'
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
