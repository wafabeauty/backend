import { create } from 'zustand'
import { CartItem, CheckoutFormData, Product, PricingTier, UpsellState, CheckoutStep } from '@/types'
import { PRICING_TIERS } from '@/lib/products'

interface CartStore {
  items: CartItem[]
  isDrawerOpen: boolean
  checkoutStep: CheckoutStep
  upsellState: UpsellState
  orderId: string | null
  checkoutData: CheckoutFormData | null
  eventId: string | null
  upsellProduct: Product | null

  openDrawer: () => void
  closeDrawer: () => void
  addItem: (product: Product, tier?: PricingTier) => void
  addCrossSell: (product: Product) => void
  removeItem: (productId: string) => void
  clearCart: () => void
  getTotalAmount: () => number
  getItemCount: () => number

  setCheckoutStep: (step: CheckoutStep) => void
  setCheckoutData: (data: CheckoutFormData) => void
  setOrderId: (id: string) => void
  setEventId: (id: string) => void
  setUpsellProduct: (product: Product | null) => void
  setUpsellState: (state: UpsellState) => void
}

export const useCartStore = create<CartStore>((set, get) => ({
  items: [],
  isDrawerOpen: false,
  checkoutStep: 'cart',
  upsellState: 'idle',
  orderId: null,
  checkoutData: null,
  eventId: null,
  upsellProduct: null,

  openDrawer: () => set({ isDrawerOpen: true }),
  closeDrawer: () => set({ isDrawerOpen: false }),

  addItem: (product: Product, tier?: PricingTier) => {
    const selectedTier = tier || PRICING_TIERS[0]
    set((state) => {
      const existing = state.items.find((i) => i.product.id === product.id && !i.isUpsell)
      if (existing) {
        return {
          items: state.items.map((i) =>
            i.product.id === product.id && !i.isUpsell
              ? { ...i, tier: selectedTier, quantity: selectedTier.quantity }
              : i
          ),
          isDrawerOpen: true,
        }
      }
      return {
        items: [...state.items, { product, quantity: selectedTier.quantity, tier: selectedTier }],
        isDrawerOpen: true,
      }
    })
  },

  addCrossSell: (product: Product) => {
    set((state) => {
      const existing = state.items.find((i) => i.product.id === product.id)
      if (existing) return state
      return {
        items: [
          ...state.items,
          { product, quantity: 1, tier: PRICING_TIERS[0] },
        ],
      }
    })
  },

  removeItem: (productId: string) => {
    set((state) => ({
      items: state.items.filter((i) => i.product.id !== productId),
    }))
  },

  clearCart: () => set({ items: [] }),

  getTotalAmount: () => {
    return get().items.reduce((sum, item) => sum + item.tier.price, 0)
  },

  getItemCount: () => {
    return get().items.reduce((sum, item) => sum + item.tier.quantity, 0)
  },

  setCheckoutStep: (step) => set({ checkoutStep: step }),
  setCheckoutData: (data) => set({ checkoutData: data }),
  setOrderId: (id) => set({ orderId: id }),
  setEventId: (id) => set({ eventId: id }),
  setUpsellProduct: (product) => set({ upsellProduct: product }),
  setUpsellState: (state) => set({ upsellState: state }),
}))
