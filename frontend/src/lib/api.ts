import { OrderPayload, OrderResponse } from '@/types'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'

export async function submitOrder(payload: OrderPayload): Promise<OrderResponse> {
  const response = await fetch(`${API_URL}/api/orders`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'حدث خطأ، يرجى المحاولة مرة أخرى' }))
    throw new Error(error.message || 'فشل إرسال الطلب')
  }

  return response.json()
}

export async function confirmUpsell(orderId: string, accepted: boolean): Promise<void> {
  await fetch(`${API_URL}/api/orders/${orderId}/upsell`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ accepted }),
  })
}
