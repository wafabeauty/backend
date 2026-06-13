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
  const circumference = 2 * Math.PI * 26

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Overlay */}
      <div className="absolute inset-0 bg-brand-blue/90 backdrop-blur-xl" />

      {/* Modal */}
      <div
        className="relative w-full max-w-sm bg-brand-off-white rounded-[2.5rem] shadow-premium overflow-hidden animate-slide-bottom border border-white/10"
        style={{ direction: 'rtl' }}
      >
        {/* Top banner */}
        <div className="bg-brand-gold p-6 text-brand-blue-dark text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('/noise.svg')] opacity-10 mix-blend-overlay" />
          <p className="text-[10px] font-black tracking-[0.3em] uppercase mb-2 opacity-80">One Time Offer</p>
          <p className="font-black text-2xl tracking-tight">أكملي بروتوكولك السريري!</p>
        </div>

        <div className="p-8">
          {/* Countdown */}
          <div className="flex items-center justify-center mb-8">
            <div className="relative w-16 h-16 mr-4">
              <svg className="w-16 h-16 -rotate-90" viewBox="0 0 60 60">
                <circle cx="30" cy="30" r="26" fill="none" stroke="#EFEBE3" strokeWidth="3" />
                <circle
                  cx="30"
                  cy="30"
                  r="26"
                  fill="none"
                  stroke="#D4AF37"
                  strokeWidth="3"
                  strokeDasharray={circumference}
                  strokeDashoffset={circumference * (progress / 100)}
                  strokeLinecap="round"
                  className="transition-all duration-1000"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="font-black text-brand-blue text-xl leading-none">{secondsLeft}</span>
              </div>
            </div>
            <div>
              <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mb-1">Offer Expires In</p>
              <p className="font-black text-brand-blue text-lg">{secondsLeft} ثانية</p>
            </div>
          </div>

          {/* Product */}
          <div className="flex items-center gap-4 bg-white rounded-2xl p-4 border border-brand-blue/5 shadow-sm mb-6">
            <div
              className="w-20 h-20 rounded-xl flex items-center justify-center text-white/50 flex-shrink-0"
              style={{
                background: `linear-gradient(135deg, ${upsellProduct.gradientFrom}, ${upsellProduct.gradientTo})`,
              }}
            >
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
              </svg>
            </div>
            <div className="flex-1 text-right">
              <p className="font-black text-brand-blue text-sm leading-tight mb-1">
                {upsellProduct.nameAr}
              </p>
              <p className="text-slate-400 text-xs font-medium line-clamp-2 leading-relaxed">{upsellProduct.subtitleAr}</p>
            </div>
          </div>

          {/* Offer */}
          <div className="text-center bg-brand-gold/5 border border-brand-gold/20 rounded-2xl p-5 mb-8">
            <div className="flex items-center justify-center gap-3 mb-2">
              <span className="text-[10px] font-black bg-red-50 text-red-500 px-1.5 py-0.5 rounded-sm border border-red-100">
                -{Math.round((((Math.round(upsellProduct.price / 0.7)) - UPSELL_PRICE) / (Math.round(upsellProduct.price / 0.7))) * 100)}%
              </span>
              <span className="text-slate-400 text-sm line-through font-bold">{Math.round(upsellProduct.price / 0.7)} SAR</span>
              <svg className="w-4 h-4 text-brand-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
              <span className="font-black text-brand-blue text-3xl">{UPSELL_PRICE} <span className="text-sm">SAR</span></span>
            </div>
            <p className="text-brand-gold font-bold text-xs uppercase tracking-widest mt-2">
              Exclusive Protocol Addition
            </p>
          </div>

          {/* Action Buttons */}
          <div className="space-y-4">
            <button
              onClick={handleAccept}
              disabled={isProcessing}
              className={`w-full bg-brand-blue text-white font-black py-5 rounded-full transition-all duration-300 text-lg flex items-center justify-center gap-3 ${
                isProcessing ? 'opacity-70 cursor-not-allowed' : 'hover:bg-brand-blue-light hover:shadow-premium active:scale-[0.98]'
              }`}
            >
              {isProcessing ? (
                <span className="w-5 h-5 border-2 border-white/30 border-t-brand-gold rounded-full animate-spin" />
              ) : (
                <>
                  أضيفي للطلب بسعر خاص
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                  </svg>
                </>
              )}
            </button>

            <button
              onClick={handleDecline}
              disabled={isProcessing}
              className="w-full text-slate-400 text-xs font-bold uppercase tracking-widest py-3 hover:text-brand-blue transition-colors"
            >
              No Thanks, Skip Offer
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
