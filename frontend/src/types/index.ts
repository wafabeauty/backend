export interface Product {
  id: string
  slug: string
  nameAr: string
  nameEn: string
  subtitleAr: string
  descriptionAr: string
  price: number
  imagePlaceholder: string
  gradientFrom: string
  gradientTo: string
  ingredients: string[]
  benefits: string[]
  reviewCount: number
  rating: number
  category: string
}

export interface PricingTier {
  quantity: number
  price: number
  labelAr: string
  savings?: string
  popular?: boolean
}

export interface CartItem {
  product: Product
  quantity: number
  tier: PricingTier
  isUpsell?: boolean
}

export interface CheckoutFormData {
  fullName: string
  phone: string
  city: string
  address: string
  agreedToTerms: boolean
}

export interface OrderPayload {
  fullName: string
  phone: string
  address: string
  items: CartItem[]
  totalAmount: number
  eventId: string
  clientIp?: string
  userAgent?: string
  acceptedUpsell?: boolean
  upsellProduct?: Product | null
}

export interface OrderResponse {
  orderId: string
  success: boolean
  message: string
}

export type UpsellState = 'idle' | 'showing' | 'accepted' | 'declined'
export type CheckoutStep = 'cart' | 'checkout' | 'upsell' | 'thankyou'
