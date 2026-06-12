interface TrustBadgesProps {
  variant?: 'light' | 'dark'
  className?: string
}

const badges = [
  {
    icon: '💳',
    label: 'الدفع عند الاستلام',
    sublabel: 'Cash on Delivery',
  },
  {
    icon: '🚀',
    label: 'شحن سريع',
    sublabel: '2-4 أيام عمل',
  },
  {
    icon: '🧪',
    label: 'مكونات معتمدة',
    sublabel: 'Dermatologist Tested',
  },
  {
    icon: '🛡️',
    label: 'آمن على البشرة',
    sublabel: 'Hypoallergenic',
  },
]

export default function TrustBadges({ variant = 'light', className = '' }: TrustBadgesProps) {
  const textColor = variant === 'dark' ? 'text-white' : 'text-gray-700'
  const subTextColor = variant === 'dark' ? 'text-blue-200' : 'text-gray-400'
  const bgColor = variant === 'dark' ? 'bg-white/10' : 'bg-white'
  const borderColor = variant === 'dark' ? 'border-white/20' : 'border-gray-100'

  return (
    <div className={`grid grid-cols-2 md:grid-cols-4 gap-3 ${className}`}>
      {badges.map((badge) => (
        <div
          key={badge.label}
          className={`flex flex-col items-center text-center p-3 rounded-xl ${bgColor} border ${borderColor} shadow-sm`}
        >
          <span className="text-2xl mb-1.5">{badge.icon}</span>
          <p className={`text-xs font-bold ${textColor} leading-tight`}>{badge.label}</p>
          <p className={`text-xs ${subTextColor} mt-0.5`}>{badge.sublabel}</p>
        </div>
      ))}
    </div>
  )
}
