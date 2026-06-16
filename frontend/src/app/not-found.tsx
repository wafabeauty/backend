import Link from 'next/link'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-brand-off-white flex items-center justify-center px-4 pt-20">
        <div className="text-center max-w-lg">
          <div className="w-32 h-32 rounded-full bg-brand-blue/5 flex items-center justify-center mx-auto mb-8">
            <span className="text-6xl font-black text-brand-blue/20">404</span>
          </div>
          <h1 className="text-3xl font-black text-brand-blue mb-4">الصفحة غير موجودة</h1>
          <p className="text-slate-500 text-base font-medium leading-relaxed mb-10">
            يبدو أن الصفحة التي تبحثين عنها لم تعد موجودة أو تم تغيير رابطها.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/"
              className="bg-brand-blue text-white font-bold py-4 px-10 rounded-full hover:bg-brand-blue-light transition-colors shadow-premium"
            >
              العودة للرئيسية
            </Link>
            <Link
              href="/contact"
              className="border border-brand-blue/20 text-brand-blue font-bold py-4 px-10 rounded-full hover:bg-brand-blue hover:text-white transition-all"
            >
              تواصل معنا
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
