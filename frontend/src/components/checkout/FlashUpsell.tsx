'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { useCartStore } from '@/store/cartStore'
import { confirmUpsell } from '@/lib/api'
import { UPSELL_PRICE } from '@/lib/products'

const COUNTDOWN_SECONDS = 13

export default function FlashUpsell() {
  const router = useRouter()
  const {
    checkoutStep,
    setCheckoutStep,
    upsellProduct,
    orderId,
    clearCart,
  } = useCartStore()

  const [secondsLeft, setSecondsLeft] = useState(COUNTDOWN_SECONDS)
  const [isProcessing, setIsProcessing] = useState(false)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const isOpen = checkoutStep === 'upsell'

  const handleDecline = useCallback(async () => {
    if (isProcessing) return
    setIsProcessing(true)
    if (intervalRef.current) clearInterval(intervalRef.current)

    if (orderId) {
      await confirmUpsell(orderId, false).catch(() => {})
    }

    clearCart()
    setCheckoutStep('cart')
    router.push(`/thank-you?order=${orderId}&upsell=no`)
  }, [isProcessing, orderId, clearCart, setCheckoutStep, router])

  const handleAccept = useCallback(async () => {
    if (isProcessing) return
    setIsProcessing(true)
    if (intervalRef.current) clearInterval(intervalRef.current)

    if (orderId) {
      await confirmUpsell(orderId, true).catch(() => {})
    }

    clearCart()
    setCheckoutStep('cart')
    router.push(`/thank-you?order=${orderId}&upsell=yes`)
  }, [isProcessing, orderId, clearCart, setCheckoutStep, router])

  useEffect(() => {
    if (!isOpen) {
      setSecondsLeft(COUNTDOWN_SECONDS)
      if (intervalRef.current) clearInterval(intervalRef.current)
      return
    }

    setSecondsLeft(COUNTDOWN_SECONDS)
    intervalRef.current = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          clearInterval(intervalRef.current!)
          handleDecline()
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [isOpen, handleDecline])

  if (!isOpen || !upsellProduct) return null

  const progress = ((COUNTDOWN_SECONDS - secondsLeft) / COUNTDOWN_SECONDS) * 100
  const circumference = 2 * Math.PI * 22

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

      {/* Modal */}
      <div
        className="relative w-full max-w-sm bg-white rounded-3xl shadow-2xl overflow-hidden animate-slide-bottom"
        style={{ direction: 'rtl' }}
      >
        {/* Top banner */}
        <div className="bg-gradient-to-r from-brand-green to-brand-green-light p-4 text-white text-center">
          <p className="text-xs font-semibold text-green-100 mb-1">⚡ عرض لمرة واحدة فقط</p>
          <p className="font-black text-xl">أكملي بروتوكولك السريري!</p>
        </div>

        <div className="p-5">
          {/* Countdown */}
          <div className="flex items-center justify-center mb-5">
            <div className="relative w-14 h-14">
              <svg className="w-14 h-14 -rotate-90" viewBox="0 0 50 50">
                <circle cx="25" cy="25" r="22" fill="none" stroke="#f3f4f6" strokeWidth="4" />
                <circle
                  cx="25"
                  cy="25"
                  r="22"
                  fill="none"
                  stroke="#1A7F5A"
                  strokeWidth="4"
                  strokeDasharray={circumference}
                  strokeDashoffset={circumference * (progress / 100)}
                  strokeLinecap="round"
                  className="transition-all duration-1000"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="font-black text-brand-green text-lg leading-none">{secondsLeft}</span>
              </div>
            </div>
            <div className="mr-3">
              <p className="text-gray-500 text-xs">العرض ينتهي خلال</p>
              <p className="font-bold text-gray-700 text-sm">{secondsLeft} ثانية</p>
            </div>
          </div>

          {/* Product */}
          <div className="flex items-center gap-3 bg-gray-50 rounded-2xl p-3 mb-4">
            <div
              className="w-16 h-16 rounded-xl flex items-center justify-center text-3xl flex-shrink-0"
              style={{
                background: `linear-gradient(135deg, ${upsellProduct.gradientFrom}, ${upsellProduct.gradientTo})`,
              }}
            >
              {upsellProduct.category === 'serum' ? '💊' : upsellProduct.category === 'eye-care' ? '👁️' : '🌿'}
            </div>
            <div className="flex-1 text-right">
              <p className="font-bold text-gray-800 text-sm leading-tight line-clamp-2">
                {upsellProduct.nameAr}
              </p>
              <p className="text-gray-500 text-xs mt-1 line-clamp-1">{upsellProduct.subtitleAr}</p>
            </div>
          </div>

          {/* Offer */}
          <div className="text-center bg-brand-green/5 border border-brand-green/20 rounded-2xl p-3 mb-5">
            <p className="text-gray-600 text-xs mb-1">السعر الأصلي</p>
            <p className="text-gray-400 text-sm line-through mb-1">199 ريال</p>
            <p className="font-black text-brand-green text-3xl">{UPSELL_PRICE} ريال</p>
            <p className="text-brand-green text-xs font-semibold mt-1">
              أضيفي لبروتوكولك العلاجي بسعر خاص!
            </p>
          </div>

          {/* Action Buttons */}
          <div className="space-y-2">
            <button
              onClick={handleAccept}
              disabled={isProcessing}
              className={`w-full bg-brand-green text-white font-black py-4 rounded-xl transition-all duration-200 text-base ${
                isProcessing ? 'opacity-70 cursor-not-allowed' : 'hover:bg-brand-green-light active:scale-95 shadow-lg shadow-brand-green/25'
              }`}
            >
              {isProcessing ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  جارٍ الإضافة...
                </span>
              ) : (
                `✓ نعم! أضيفي للطلب – ${UPSELL_PRICE} ريال فقط`
              )}
            </button>

            <button
              onClick={handleDecline}
              disabled={isProcessing}
              className="w-full text-gray-400 text-xs py-2 hover:text-gray-600 transition-colors"
            >
              لا شكراً، لا أريد هذا العرض
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
