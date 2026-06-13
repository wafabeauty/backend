'use client'

import Link from 'next/link'
import { useCartStore } from '@/store/cartStore'
import { useEffect, useState } from 'react'

export default function Header() {
  const { getItemCount, openDrawer } = useCartStore()
  const itemCount = getItemCount()
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b ${
        scrolled 
          ? 'bg-white/80 backdrop-blur-xl border-gray-200/50 shadow-sm py-3' 
          : 'bg-white/50 backdrop-blur-md border-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">

          {/* Logo - Right Side (RTL) */}
          <Link href="/" className="flex items-center gap-4 flex-shrink-0 group">
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-brand-blue flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform duration-300">
              <span className="text-brand-gold font-black text-xl md:text-2xl">W</span>
            </div>
            <div className="leading-none flex flex-col justify-center">
              <span className="font-black text-brand-blue text-lg md:text-xl tracking-tight">وفاء للجمال</span>
              <span className="text-brand-gold text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase mt-1">Wafa Beauty</span>
            </div>
          </Link>

          {/* Navigation - Center */}
          <nav className="hidden md:flex items-center gap-10">
            <Link href="/" className="text-sm font-bold text-slate-600 hover:text-brand-gold transition-colors tracking-wide">
              الرئيسية
            </Link>
            <Link href="/products/kojic-serum" className="text-sm font-bold text-slate-600 hover:text-brand-gold transition-colors tracking-wide">
              البروتوكول السريري
            </Link>
            <Link href="/#about" className="text-sm font-bold text-slate-600 hover:text-brand-gold transition-colors tracking-wide">
              العلم وراء منتجاتنا
            </Link>
            <div className="relative group">
              <button className="text-sm font-bold text-slate-600 group-hover:text-brand-gold transition-colors tracking-wide flex items-center gap-1 cursor-pointer">
                الدعم
                <svg className="w-4 h-4 transition-transform group-hover:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {/* Dropdown Menu */}
              <div className="absolute top-full right-0 pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 w-72 z-50">
                <div className="bg-white rounded-2xl shadow-premium border border-gray-100 p-5 flex flex-col gap-4">
                  
                  {/* WhatsApp */}
                  <div className="text-right">
                    <span className="block text-xs font-bold text-slate-400 mb-1 flex items-center gap-2">
                      <svg className="w-4 h-4 text-[#25D366]" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 00-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
                      واتساب
                    </span>
                    <span className="text-sm font-bold text-slate-600 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-brand-gold animate-pulse"></span>
                      قريباً (Soon)
                    </span>
                  </div>
                  
                  <div className="h-px bg-gray-100 w-full" />
                  
                  {/* Email */}
                  <div className="text-right">
                    <span className="block text-xs font-bold text-slate-400 mb-1 flex items-center gap-2">
                      <svg className="w-4 h-4 text-brand-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                      البريد الإلكتروني
                    </span>
                    <a href="mailto:contactwafabeauty@gmail.com" className="text-sm font-bold text-brand-blue hover:text-brand-gold transition-colors block mt-1" dir="ltr">contactwafabeauty@gmail.com</a>
                  </div>
                  
                  <div className="h-px bg-gray-100 w-full" />
                  
                  {/* Timing */}
                  <div className="text-right">
                    <span className="block text-xs font-bold text-slate-400 mb-1 flex items-center gap-2">
                      <svg className="w-4 h-4 text-brand-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                      أوقات الدعم
                    </span>
                    <span className="text-sm font-medium text-slate-600 leading-relaxed block mt-1">
                      السبت - الخميس (Saturday - Thursday)<br/>
                      9:00 صباحاً - 9:00 مساءً (9 AM - 9 PM)
                    </span>
                  </div>

                </div>
              </div>
            </div>
          </nav>

          {/* Cart Icon - Left Side (RTL) */}
          <button
            onClick={openDrawer}
            className="relative flex items-center gap-3 bg-brand-blue text-white px-5 py-2.5 rounded-full hover:bg-brand-blue-light transition-all duration-300 active:scale-95 shadow-md"
            aria-label="عرض السلة"
          >
            <CartIcon />
            <span className="hidden sm:inline text-xs font-bold tracking-widest uppercase">Cart</span>
            {itemCount > 0 && (
              <span className="absolute -top-1.5 -left-1.5 w-5 h-5 bg-brand-gold text-brand-blue-dark text-[10px] font-black rounded-full flex items-center justify-center animate-bounce shadow-sm">
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
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
      />
    </svg>
  )
}
