'use client'

import Image from 'next/image'

interface BeforeAfterPair {
  before?: string
  after?: string
  label?: string
}

interface Props {
  slug: string
}

// Fill in image paths here when ready: { before: '/images/before-after/slug-1-before.jpg', after: '...' }
const BEFORE_AFTER: Record<string, BeforeAfterPair[]> = {
  default: [
    { label: 'النتيجة الأولى' },
    { label: 'النتيجة الثانية' },
    { label: 'النتيجة الثالثة' },
  ],
}

function ImagePlaceholder({ src, label, side }: { src?: string; label: string; side: 'before' | 'after' }) {
  const isAfter = side === 'after'

  return (
    <div className="flex flex-col items-center gap-3">
      <div
        className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden border border-brand-blue/10 shadow-md"
        style={{
          background: isAfter
            ? 'linear-gradient(145deg, #e8f4f0 0%, #c8e6d8 100%)'
            : 'linear-gradient(145deg, #f0f0f0 0%, #dde3ed 100%)',
        }}
      >
        {src ? (
          <Image src={src} alt={label} fill className="object-cover" />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-center px-4">
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center"
              style={{ background: isAfter ? 'rgba(52,168,102,0.15)' : 'rgba(30,58,138,0.08)' }}
            >
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke={isAfter ? '#34a866' : '#9aa5b4'} strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3 20.25h18M12 3v2.25m0 0V7.5" />
              </svg>
            </div>
            <p className="text-xs font-bold tracking-wide" style={{ color: isAfter ? '#34a866' : '#9aa5b4' }}>
              الصورة قريبًا
            </p>
          </div>
        )}

        {/* Side badge */}
        <span
          className="absolute top-3 right-3 text-[10px] font-black tracking-widest uppercase px-3 py-1 rounded-full"
          style={{
            background: isAfter ? '#34a866' : '#1e3a8a',
            color: '#fff',
          }}
        >
          {isAfter ? 'بعد' : 'قبل'}
        </span>
      </div>
    </div>
  )
}

export default function BeforeAfter({ slug }: Props) {
  const pairs = BEFORE_AFTER[slug] ?? BEFORE_AFTER['default']

  return (
    <section className="border-t border-brand-blue/5 bg-white" dir="rtl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="text-brand-gold font-bold tracking-[0.2em] uppercase text-xs mb-3 block">
            Real Results
          </span>
          <h2 className="text-3xl md:text-4xl font-black text-brand-blue mb-4">
            النتائج قبل وبعد
          </h2>
          <p className="text-slate-500 text-sm max-w-md mx-auto leading-relaxed">
            نتائج حقيقية من عملائنا — صور أصلية بدون تعديل
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {pairs.map((pair, i) => (
            <div key={i} className="flex flex-col gap-4">
              {/* Result label */}
              <p className="text-center text-xs font-bold tracking-widest text-slate-400 uppercase">
                {pair.label ?? `نتيجة ${i + 1}`}
              </p>

              {/* Before / After side by side */}
              <div className="grid grid-cols-2 gap-3">
                <ImagePlaceholder src={pair.before} label="قبل الاستخدام" side="before" />
                <ImagePlaceholder src={pair.after} label="بعد الاستخدام" side="after" />
              </div>
            </div>
          ))}
        </div>

        {/* Disclaimer */}
        <p className="text-center text-[11px] text-slate-300 mt-10 tracking-wide">
          * النتائج تختلف من شخص لآخر حسب طبيعة البشرة والاستخدام المنتظم
        </p>
      </div>
    </section>
  )
}
