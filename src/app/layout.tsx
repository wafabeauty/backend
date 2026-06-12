import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "وفا بيوتي | Wafa Beauty KSA",
  description: "حلول جلدية سريرية مصممة لبيئة الخليج - الدفع عند الاستلام",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <body className="antialiased min-h-screen flex flex-col bg-[#F9FAFB] text-[#1E293B]">
        <header className="bg-white border-b border-brand-100 sticky top-0 z-50 shadow-sm">
          <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
            <div className="text-2xl font-bold tracking-tight text-brand-900 flex items-center gap-2">
              <span className="bg-brand-600 text-white w-8 h-8 rounded flex items-center justify-center text-lg">+</span>
              وفا بيوتي <span className="font-light text-brand-500 text-lg">| Wafa Beauty</span>
            </div>
            <div className="hidden md:flex items-center gap-4 text-sm font-medium text-gray-600">
              <span className="flex items-center gap-1"><span className="text-brand-accent">✓</span> معتمد طبياً</span>
              <span className="flex items-center gap-1"><span className="text-brand-accent">✓</span> الدفع عند الاستلام</span>
            </div>
          </div>
        </header>
        <main className="flex-grow">
          {children}
        </main>
        <footer className="bg-white border-t border-gray-200 mt-12 py-10">
          <div className="max-w-5xl mx-auto px-4 text-center text-sm text-gray-500">
            <div className="flex justify-center gap-6 mb-6 opacity-60 grayscale">
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Mada_Logo.svg/1024px-Mada_Logo.svg.png" alt="Mada" className="h-6" />
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Apple_logo_black.svg/512px-Apple_logo_black.svg.png" alt="Apple Pay" className="h-6" />
            </div>
            <p className="font-bold text-gray-800 mb-2">وفا بيوتي - حلول علمية مثبتة</p>
            <p>جميع الحقوق محفوظة &copy; 2026 وفا بيوتي السعودية</p>
            <p className="mt-2 text-xs">إخلاء مسؤولية: النتائج قد تختلف من شخص لآخر. جميع منتجاتنا مصممة للاستخدام الخارجي فقط.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}