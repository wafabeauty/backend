interface TrustBadgesProps {
  variant?: 'light' | 'dark'
  className?: string
}

const badges = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
      </svg>
    ),
    label: 'الدفع عند الاستلام',
    sublabel: 'Cash on Delivery',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
      </svg>
    ),
    label: 'شحن سريع',
    sublabel: '2-4 أيام عمل',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
      </svg>
    ),
    label: 'مكونات معتمدة',
    sublabel: 'Clinically Tested',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    label: 'آمن على البشرة',
    sublabel: 'Hypoallergenic',
  },
]

export default function TrustBadges({ variant = 'light', className = '' }: TrustBadgesProps) {
  const textColor = variant === 'dark' ? 'text-white' : 'text-brand-blue'
  const subTextColor = variant === 'dark' ? 'text-white/60' : 'text-gray-400'
  const bgColor = variant === 'dark' ? 'bg-white/5' : 'bg-white'
  const borderColor = variant === 'dark' ? 'border-white/10' : 'border-gray-100'
  const iconColor = variant === 'dark' ? 'text-brand-gold' : 'text-brand-gold'

  return (
    <div className={`grid grid-cols-2 md:grid-cols-4 gap-4 ${className}`}>
      {badges.map((badge) => (
        <div
          key={badge.label}
          className={`flex flex-col items-center text-center p-5 rounded-2xl ${bgColor} border ${borderColor} hover:shadow-premium transition-all duration-300`}
        >
          <div className={`mb-3 ${iconColor}`}>{badge.icon}</div>
          <p className={`text-xs md:text-sm font-bold ${textColor} leading-tight tracking-wide`}>{badge.label}</p>
          <p className={`text-[10px] md:text-xs ${subTextColor} mt-1 tracking-wider uppercase`}>{badge.sublabel}</p>
        </div>
      ))}
    </div>
  )
}
