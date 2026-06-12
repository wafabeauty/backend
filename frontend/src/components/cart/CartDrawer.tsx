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
        <div className="fixed inset-0 bg-black/50 z-40 animate-fade-in" />
      )}

      {/* Drawer */}
      <div
        ref={drawerRef}
        className={`fixed top-0 left-0 h-full w-full sm:w-[420px] bg-white shadow-2xl z-50 flex flex-col transition-transform duration-300 ease-out ${
          isDrawerOpen ? 'translate-x-0' : 'translate-x-full sm:translate-x-[420px]'
        }`}
        style={{ direction: 'rtl' }}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <h2 className="font-black text-brand-blue text-lg">سلتك</h2>
            {count > 0 && (
              <span className="bg-brand-blue text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                {count}
              </span>
            )}
          </div>
          <button
            onClick={closeDrawer}
            className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
            aria-label="إغلاق السلة"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center px-6">
              <div className="text-6xl mb-4">🛒</div>
              <p className="font-bold text-gray-700 mb-2">سلتك فارغة</p>
              <p className="text-gray-400 text-sm mb-6">أضيفي منتجاتك المفضلة الآن</p>
              <button
                onClick={closeDrawer}
                className="btn-primary text-sm py-3 px-6"
              >
                تصفحي المنتجات
              </button>
            </div>
          ) : (
            <div className="p-4 space-y-4">
              {/* Cart Items */}
              <div className="space-y-3">
                {items.map((item) => (
                  <div key={`${item.product.id}-${item.isUpsell}`} className="card p-3 flex items-center gap-3">
                    {/* Product thumbnail */}
                    <div
                      className="w-16 h-16 rounded-xl flex-shrink-0 flex items-center justify-center text-2xl"
                      style={{
                        background: `linear-gradient(135deg, ${item.product.gradientFrom}, ${item.product.gradientTo})`,
                      }}
                    >
                      {item.product.category === 'serum' ? '💊' : item.product.category === 'eye-care' ? '👁️' : '🌿'}
                    </div>

                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-gray-800 text-sm leading-tight line-clamp-2">
                        {item.product.nameAr}
                      </p>
                      {item.isUpsell && (
                        <span className="text-xs bg-brand-green/10 text-brand-green font-semibold px-2 py-0.5 rounded-full">
                          عرض إضافي
                        </span>
                      )}
                      <p className="text-gray-500 text-xs mt-1">الكمية: {item.tier.quantity}</p>
                    </div>

                    <div className="text-left flex-shrink-0">
                      <p className="font-black text-brand-blue">{item.tier.price} ريال</p>
                      <button
                        onClick={() => removeItem(item.product.id)}
                        className="text-red-400 hover:text-red-600 text-xs mt-1 transition-colors"
                      >
                        حذف
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Cross-sells */}
              {crossSells.length > 0 && (
                <div className="border-t border-gray-100 pt-4">
                  <p className="font-bold text-gray-700 text-sm mb-3">
                    🎁 أكملي بروتوكولك السريري:
                  </p>
                  <div className="space-y-2">
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
          <div className="border-t border-gray-100 p-4 space-y-3">
            {/* Trust */}
            <div className="flex items-center justify-center gap-4 text-xs text-gray-400">
              <span>💳 الدفع عند الاستلام</span>
              <span>🚀 شحن سريع</span>
              <span>🛡️ ضمان الجودة</span>
            </div>

            {/* Total */}
            <div className="flex items-center justify-between bg-gray-50 rounded-xl p-3">
              <span className="font-bold text-gray-700">الإجمالي</span>
              <span className="font-black text-brand-blue text-xl">{total} ريال</span>
            </div>

            <button
              onClick={handleCheckout}
              className="w-full bg-brand-green text-white font-black py-4 rounded-xl hover:bg-brand-green-light transition-all duration-200 active:scale-95 shadow-lg shadow-brand-green/25 text-lg"
            >
              إتمام الطلب ←
            </button>
          </div>
        )}
      </div>
    </>
  )
}
