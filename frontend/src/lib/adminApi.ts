const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'

function getToken(): string {
  if (typeof window === 'undefined') return ''
  return localStorage.getItem('admin_token') || ''
}

function authHeaders(): HeadersInit {
  return {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${getToken()}`,
  }
}

async function req<T>(path: string, opts: RequestInit = {}): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, {
    ...opts,
    headers: { ...authHeaders(), ...(opts.headers || {}) },
  })
  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error(err.detail || `Request failed: ${res.status}`)
  }
  return res.json()
}

export async function adminLogin(username: string, password: string): Promise<{ token: string }> {
  const data = await req<{ token: string; username: string }>('/api/admin/login', {
    method: 'POST',
    body: JSON.stringify({ username, password }),
  })
  localStorage.setItem('admin_token', data.token)
  return data
}

export function adminLogout() {
  localStorage.removeItem('admin_token')
}

export function isAdminLoggedIn(): boolean {
  return !!getToken()
}

export interface Metrics {
  total_clicks: number
  total_orders: number
  total_revenue: number
  avg_order_value: number
  conversion_rate: number
  upsell_rate: number
  upsells_accepted: number
  clicks_by_day: Record<string, number>
  orders_by_day: Record<string, number>
  revenue_by_day: Record<string, number>
  top_products: { slug: string; clicks: number }[]
  date_from: string
  date_to: string
}

export interface AdminOrder {
  id: string
  order_id_short: string
  full_name: string
  phone: string
  city: string
  address: string
  items: unknown[]
  total_amount: number
  accepted_upsell: boolean
  upsell_product_id: string | null
  webhook_sent: boolean
  created_at: string
}

export interface OrdersResponse {
  orders: AdminOrder[]
  total: number
  page: number
  limit: number
  pages: number
}

export async function fetchMetrics(fromDate?: string, toDate?: string): Promise<Metrics> {
  const params = new URLSearchParams()
  if (fromDate) params.set('from_date', fromDate)
  if (toDate) params.set('to_date', toDate)
  return req<Metrics>(`/api/admin/metrics?${params}`)
}

export async function fetchOrders(
  fromDate?: string,
  toDate?: string,
  page = 1,
  limit = 25,
): Promise<OrdersResponse> {
  const params = new URLSearchParams({ page: String(page), limit: String(limit) })
  if (fromDate) params.set('from_date', fromDate)
  if (toDate) params.set('to_date', toDate)
  return req<OrdersResponse>(`/api/admin/orders?${params}`)
}

export async function trackClick(productSlug: string): Promise<void> {
  await fetch(`${API_URL}/api/admin/clicks`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ product_slug: productSlug, user_agent: navigator.userAgent }),
  }).catch(() => {})
}
