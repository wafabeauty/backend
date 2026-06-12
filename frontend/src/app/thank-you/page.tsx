import { Suspense } from 'react'
import ThankYouContent from './ThankYouContent'

export default function ThankYouPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-brand-blue/30 border-t-brand-blue rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-500">جارٍ التحميل...</p>
        </div>
      </div>
    }>
      <ThankYouContent />
    </Suspense>
  )
}
