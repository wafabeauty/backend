'use client'

import { useEffect, useRef } from 'react'
import { useCartStore } from '@/store/cartStore'
import { getCrossSells } from '@/lib/products'
import { trackInitiateCheckout } from '@/lib/pixels'
import ProductCard from '@/components/ui/ProductCard'

export default function CartDrawer() {
  const {
    isDrawerOpen,
    closeDrawer,
    items,
    removeItem,
    getTotalAmount,
    getItemCount,
    setCheckoutStep,
  } = useCartStore()

  const drawerRef = useRef<HTMLDivElement>(null)

  // Close on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (drawerRef.current && !drawerRef.current.contains(e.target as Node)) {
        closeDrawer()
      }
    }
    if (isDrawerOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      document.body.style.overflow = 'hidden'
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.body.style.overflow = ''
    }
  }, [isDrawerOpen, closeDrawer])

  const handleCheckout = () => {
    trackInitiateCheckout(getTotalAmount())
    closeDrawer()
    setCheckoutStep('checkout')
  }

  // Get cross-sells from current cart items
  const cartSlugs = items.map((i) => i.product.slug)
  const crossSells = getCrossSells(cartSlugs[0] || '').filter(
    (p) => !cartSlugs.includes(p.slug)
  )

  const total = getTotalAmount()
  const count = getItemCount()

  return (
    <>
      {/* Overlay */}
      {isDrawerOpen && (
        <div className="fixed inset-0 bg-brand-blue/40 backdrop-blur-sm z-40 animate-fade-in" />
      )}

      {/* Drawer */}
      <div
        ref={drawerRef}
        className={`fixed top-0 right-0 h-full w-full sm:w-[460px] bg-white shadow-2xl z-50 flex flex-col transition-transform duration-500 cubic-bezier(0.22, 1, 0.36, 1) ${
          isDrawerOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        style={{ direction: 'rtl' }}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-brand-blue/5">
          <div className="flex items-center gap-3">
            <h2 className="font-black text-brand-blue text-2xl tracking-tight">سلتك</h2>
            {count > 0 && (
              <span className="bg-brand-gold text-brand-blue-dark text-xs font-black w-6 h-6 rounded-full flex items-center justify-center">
                {count}
              </span>
            )}
          </div>
          <button
            onClick={closeDrawer}
            className="w-10 h-10 rounded-full bg-brand-off-white flex items-center justify-center hover:bg-gray-200 transition-colors text-slate-400 hover:text-brand-blue"
            aria-label="إغلاق السلة"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto bg-brand-off-white/50">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center px-8">
              <div className="w-24 h-24 bg-brand-off-white rounded-full flex items-center justify-center text-brand-gold/50 mb-6">
                <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </div>
              <p className="font-black text-brand-blue text-xl mb-3">الحقيبة فارغة</p>
              <p className="text-slate-500 text-sm mb-8 font-medium">أضيفي منتجاتك المفضلة للبدء في رحلتك العلاجية</p>
              <button
                onClick={closeDrawer}
                className="btn-primary w-full max-w-[200px]"
              >
                تصفح المنتجات
              </button>
            </div>
          ) : (
            <div className="p-6 space-y-6">
              {/* Cart Items */}
              <div className="space-y-4">
                {items.map((item) => (
                  <div key={`${item.product.id}-${item.isUpsell}`} className="bg-white p-4 rounded-3xl border border-brand-blue/5 shadow-sm flex items-center gap-4">
                    {/* Product thumbnail */}
                    <div
                      className="w-20 h-20 rounded-2xl flex-shrink-0 flex items-center justify-center text-white/50"
                      style={{
                        background: `linear-gradient(135deg, ${item.product.gradientFrom}, ${item.product.gradientTo})`,
                      }}
                    >
                      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                      </svg>
                    </div>

                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-brand-blue text-sm leading-tight mb-1">
                        {item.product.nameAr}
                      </p>
                      {item.isUpsell && (
                        <span className="inline-block text-[10px] bg-brand-gold text-brand-blue-dark font-black px-2 py-0.5 rounded-sm uppercase tracking-wider mb-1">
                          Special Offer
                        </span>
                      )}
                      <p className="text-slate-400 text-xs font-medium">الكمية: {item.tier.quantity}</p>
                    </div>

                    <div className="text-left flex-shrink-0 flex flex-col items-end">
                      <span className="text-[10px] text-slate-400 font-bold line-through mb-0.5">
                        {Math.round(item.product.price / 0.7) * item.tier.quantity} SAR
                      </span>
                      <div className="flex items-center gap-1.5">
                        <span className="text-[9px] font-black bg-red-50 text-red-500 px-1 py-0.5 rounded-sm border border-red-100">
                          -{Math.round((((Math.round(item.product.price / 0.7) * item.tier.quantity) - item.tier.price) / (Math.round(item.product.price / 0.7) * item.tier.quantity)) * 100)}%
                        </span>
                        <p className="font-black text-brand-blue text-lg leading-none">{item.tier.price} <span className="text-xs text-slate-400 font-bold">SAR</span></p>
                      </div>
                      <button
                        onClick={() => removeItem(item.product.id)}
                        className="text-red-400 hover:text-red-600 text-xs mt-2 font-bold transition-colors uppercase tracking-wider"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Cross-sells */}
              {crossSells.length > 0 && (
                <div className="border-t border-brand-blue/5 pt-6">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="w-1.5 h-1.5 bg-brand-gold rounded-full" />
                    <p className="font-black text-brand-blue text-sm uppercase tracking-wider">
                      أكملي بروتوكولك السريري
                    </p>
                  </div>
                  <div className="space-y-3">
                    {crossSells.map((p) => (
                      <ProductCard key={p.id} product={p} showAddButton compact />
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-brand-blue/5 p-6 bg-white space-y-5">
            {/* Total */}
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-500 uppercase tracking-widest text-xs">Total Amount</span>
              <span className="font-black text-brand-blue text-3xl">{total} <span className="text-sm text-slate-400">SAR</span></span>
            </div>

            <button
              onClick={handleCheckout}
              className="w-full bg-brand-blue text-white font-black py-5 rounded-full hover:bg-brand-blue-light transition-all duration-300 active:scale-[0.98] shadow-premium flex items-center justify-center gap-3 text-lg"
            >
              المتابعة للدفع
              <svg className="w-5 h-5 rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
            
            {/* Trust */}
            <div className="flex items-center justify-center gap-6 text-[10px] text-slate-400 font-bold uppercase tracking-wider">
              <span className="flex items-center gap-1">
                <svg className="w-3 h-3 text-brand-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                Secure Checkout
              </span>
              <span className="flex items-center gap-1">
                <svg className="w-3 h-3 text-brand-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
                Cash on Delivery
              </span>
            </div>
          </div>
        )}
      </div>
    </>
  )
}
