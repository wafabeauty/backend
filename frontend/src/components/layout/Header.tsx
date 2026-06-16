'use client'

import Link from 'next/link'
import { useCartStore } from '@/store/cartStore'
import { useEffect, useState } from 'react'

const navLinks = [
  { href: '/', label: 'الرئيسية' },
  { href: '/products/astaxanthin-serum', label: 'البروتوكول السريري' },
  { href: '/#about', label: 'العلم وراء منتجاتنا' },
  { href: '/contact', label: 'تواصل معنا' },
]

export default function Header() {
  const { getItemCount, openDrawer } = useCartStore()
  const itemCount = getItemCount()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  return (
    <>
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b ${
          scrolled 
            ? 'bg-white/90 backdrop-blur-xl border-brand-blue/5 shadow-sm py-3' 
            : 'bg-white/60 backdrop-blur-md border-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">

            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 flex-shrink-0 group" onClick={() => setMobileOpen(false)}>
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-brand-blue flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform duration-300">
                <span className="text-brand-gold font-black text-xl md:text-2xl">و</span>
              </div>
              <div className="leading-none flex flex-col justify-center">
                <span className="font-black text-brand-blue text-lg md:text-xl tracking-tight">وفاء للجمال</span>
                <span className="text-brand-gold text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase mt-0.5">Wafa Beauty</span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-10">
              {navLinks.map((link) => (
                <Link key={link.href} href={link.href} className="text-sm font-bold text-slate-600 hover:text-brand-gold transition-colors tracking-wide">
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Right side: Cart + Hamburger */}
            <div className="flex items-center gap-3">
              <button
                onClick={openDrawer}
                className="relative flex items-center gap-2 bg-brand-blue text-white px-4 py-2.5 rounded-full hover:bg-brand-blue-light transition-all duration-300 active:scale-95 shadow-md"
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

              {/* Hamburger - mobile only */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="md:hidden w-10 h-10 rounded-full bg-brand-blue/5 flex items-center justify-center hover:bg-brand-blue/10 transition-colors"
                aria-label="القائمة"
              >
                <div className="w-5 flex flex-col gap-1.5">
                  <span className={`block h-0.5 bg-brand-blue rounded transition-all duration-300 ${mobileOpen ? 'rotate-45 translate-y-2' : ''}`} />
                  <span className={`block h-0.5 bg-brand-blue rounded transition-all duration-300 ${mobileOpen ? 'opacity-0' : ''}`} />
                  <span className={`block h-0.5 bg-brand-blue rounded transition-all duration-300 ${mobileOpen ? '-rotate-45 -translate-y-2' : ''}`} />
                </div>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-brand-blue/40 backdrop-blur-sm md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Mobile Menu Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-72 bg-white z-50 shadow-2xl transition-transform duration-400 ease-out md:hidden flex flex-col ${
          mobileOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Mobile Menu Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <button onClick={() => setMobileOpen(false)} className="w-9 h-9 rounded-full bg-brand-blue/5 flex items-center justify-center text-brand-blue">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <div className="text-right">
            <span className="font-black text-brand-blue">وفاء للجمال</span>
          </div>
        </div>

        {/* Links */}
        <nav className="flex-1 flex flex-col gap-1 p-4 overflow-y-auto">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="flex items-center justify-between px-4 py-4 rounded-2xl font-bold text-brand-blue hover:bg-brand-blue/5 hover:text-brand-gold transition-all"
            >
              <svg className="w-4 h-4 opacity-40 rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
              <span>{link.label}</span>
            </Link>
          ))}
        </nav>

        {/* Mobile Menu Footer */}
        <div className="p-6 border-t border-gray-100 space-y-3">
          <a
            href="mailto:contactwafabeauty@gmail.com"
            className="flex items-center justify-end gap-3 text-sm text-slate-500 font-medium hover:text-brand-blue transition-colors"
          >
            <span dir="ltr">contactwafabeauty@gmail.com</span>
            <svg className="w-4 h-4 flex-shrink-0 text-brand-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </a>
          <p className="text-xs text-slate-400 text-right font-medium">السبت–الخميس: 9ص–9م</p>
        </div>
      </div>
    </>
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
