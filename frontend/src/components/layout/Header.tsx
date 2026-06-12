'use client'

import Link from 'next/link'
import { useCartStore } from '@/store/cartStore'

export default function Header() {
  const { getItemCount, openDrawer } = useCartStore()
  const itemCount = getItemCount()

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">

          {/* Logo - Right Side (RTL) */}
          <Link href="/" className="flex items-center gap-3 flex-shrink-0">
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-brand-blue flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-lg md:text-xl">N</span>
            </div>
            <div className="leading-tight">
              <p className="font-bold text-brand-blue text-base md:text-lg leading-none">وفاء للجمال</p>
              <p className="text-gray-400 text-xs font-medium tracking-wide">Nama Beauty</p>
            </div>
          </Link>

          {/* Navigation - Center */}
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-gray-600 hover:text-brand-blue font-medium transition-colors text-sm">
              الرئيسية
            </Link>
            <Link href="/products/kojic-serum" className="text-gray-600 hover:text-brand-blue font-medium transition-colors text-sm">
              المنتجات
            </Link>
            <Link href="/#about" className="text-gray-600 hover:text-brand-blue font-medium transition-colors text-sm">
              عن العلامة
            </Link>
            <Link href="/#contact" className="text-gray-600 hover:text-brand-blue font-medium transition-colors text-sm">
              تواصل معنا
            </Link>
          </nav>

          {/* Cart Icon - Left Side (RTL) */}
          <button
            onClick={openDrawer}
            className="relative flex items-center gap-2 bg-brand-blue text-white px-4 py-2 rounded-xl hover:bg-brand-blue-light transition-all duration-200 active:scale-95"
            aria-label="عرض السلة"
          >
            <CartIcon />
            <span className="hidden sm:inline text-sm font-semibold">السلة</span>
            {itemCount > 0 && (
              <span className="absolute -top-2 -left-2 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center animate-bounce">
                {itemCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  )
}

function CartIcon() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
      />
    </svg>
  )
}
