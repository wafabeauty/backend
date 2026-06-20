'use client'
import { useEffect, useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import {
  fetchMetrics, fetchOrders, adminLogout, isAdminLoggedIn,
  Metrics, AdminOrder, OrdersResponse,
} from '@/lib/adminApi'

// ─── Helpers ─────────────────────────────────────────────────────────────────

function fmtSAR(n: number) {
  return n.toLocaleString('en-SA', { minimumFractionDigits: 0, maximumFractionDigits: 0 }) + ' SAR'
}
function fmtPct(n: number) { return n.toFixed(1) + '%' }
function fmtDate(iso: string) {
  if (!iso) return '—'
  return new Date(iso).toLocaleString('en-SA', {
    day: '2-digit', month: 'short', year: 'numeric',
    hour: '2-digit', minute: '2-digit', hour12: true,
  })
}
function slugLabel(slug: string) {
  const m: Record<string, string> = {
    'astaxanthin-serum': 'Brightening Serum',
    'grape-seed-eye-roller': 'Eye Roller',
    'scalp-serum': 'Scalp Serum',
  }
  return m[slug] || slug
}

// ─── Date presets ─────────────────────────────────────────────────────────────

const PRESETS = [
  { label: 'Today', days: 0 },
  { label: 'Yesterday', days: 1 },
  { label: '7 days', days: 7 },
  { label: '30 days', days: 30 },
  { label: '90 days', days: 90 },
]

function presetDates(days: number) {
  const to = new Date()
  const from = new Date()
  if (days === 0) {
    from.setHours(0, 0, 0, 0)
  } else if (days === 1) {
    from.setDate(from.getDate() - 1)
    from.setHours(0, 0, 0, 0)
    to.setDate(to.getDate() - 1)
    to.setHours(23, 59, 59, 999)
  } else {
    from.setDate(from.getDate() - days)
  }
  return { from: from.toISOString(), to: to.toISOString() }
}

// ─── Mini SVG Line Chart ──────────────────────────────────────────────────────

function LineChart({ data, color = '#D4AF37' }: {
  data: Record<string, number>
  color?: string
}) {
  const entries = Object.entries(data).sort(([a], [b]) => a.localeCompare(b))
  if (entries.length < 2) return (
    <div style={{ color: '#475569', fontSize: 13, textAlign: 'center', paddingTop: 24 }}>
      No data yet
    </div>
  )
  const values = entries.map(([, v]) => v)
  const max = Math.max(...values, 1)
  const min = Math.min(...values)
  const W = 600, H = 120, PAD = 10
  const pts = entries.map(([, v], i) => {
    const x = PAD + (i / (entries.length - 1)) * (W - PAD * 2)
    const y = PAD + ((max - v) / (max - min || 1)) * (H - PAD * 2)
    return `${x},${y}`
  }).join(' ')
  return (
    <svg viewBox={`0 0 ${W} ${H}`} style={{ width: '100%', height: 80 }}>
      <polyline points={pts} fill="none" stroke={color} strokeWidth="2.5"
        strokeLinejoin="round" strokeLinecap="round" />
      {entries.map(([, v], i) => {
        const x = PAD + (i / (entries.length - 1)) * (W - PAD * 2)
        const y = PAD + ((max - v) / (max - min || 1)) * (H - PAD * 2)
        return <circle key={i} cx={x} cy={y} r="3" fill={color} />
      })}
    </svg>
  )
}

// ─── Metric Card ─────────────────────────────────────────────────────────────

function MetricCard({ label, value, sub, color = '#D4AF37', trend }: {
  label: string; value: string; sub?: string; color?: string; trend?: number
}) {
  return (
    <div style={{
      background: '#1e293b', borderRadius: 14, padding: '20px 24px',
      border: '1px solid #334155', flex: 1, minWidth: 160,
    }}>
      <div style={{ color: '#64748b', fontSize: 11, fontWeight: 700,
        textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 8 }}>
        {label}
      </div>
      <div style={{ color, fontSize: 28, fontWeight: 800, lineHeight: 1 }}>{value}</div>
      {sub && <div style={{ color: '#475569', fontSize: 12, marginTop: 6 }}>{sub}</div>}
      {trend !== undefined && (
        <div style={{ color: trend >= 0 ? '#4ade80' : '#f87171', fontSize: 12, marginTop: 4, fontWeight: 700 }}>
          {trend >= 0 ? '↑' : '↓'} {Math.abs(trend).toFixed(1)}%
        </div>
      )}
    </div>
  )
}

// ─── Order Modal ─────────────────────────────────────────────────────────────

function OrderModal({ order, onClose }: { order: AdminOrder; onClose: () => void }) {
  const items = Array.isArray(order.items) ? order.items : []
  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 50, background: 'rgba(0,0,0,0.7)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20,
    }} onClick={onClose}>
      <div onClick={e => e.stopPropagation()} style={{
        background: '#1e293b', borderRadius: 18, padding: 32, maxWidth: 520, width: '100%',
        border: '1px solid #334155', maxHeight: '90vh', overflowY: 'auto',
        boxShadow: '0 25px 50px rgba(0,0,0,0.5)',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24 }}>
          <div>
            <div style={{ color: '#D4AF37', fontSize: 11, fontWeight: 700,
              textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: 6 }}>
              Order #{order.order_id_short}
            </div>
            <div style={{ color: '#94a3b8', fontSize: 13 }}>{fmtDate(order.created_at)}</div>
          </div>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            {order.webhook_sent && (
              <span style={{
                background: '#064e3b', color: '#4ade80', borderRadius: 6, padding: '4px 10px',
                fontSize: 11, fontWeight: 700,
              }}>✓ Sheet Sent</span>
            )}
            <button onClick={onClose} style={{
              background: '#334155', border: 'none', color: '#94a3b8', borderRadius: 8,
              width: 32, height: 32, cursor: 'pointer', fontSize: 18, lineHeight: 1,
            }}>×</button>
          </div>
        </div>

        {/* Customer info */}
        <div style={{
          background: '#0f172a', borderRadius: 12, padding: '16px 20px',
          marginBottom: 16, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12,
        }}>
          <div>
            <div style={{ color: '#64748b', fontSize: 11, fontWeight: 700, marginBottom: 4 }}>CUSTOMER</div>
            <div style={{ color: '#f1f5f9', fontWeight: 700 }}>{order.full_name}</div>
          </div>
          <div>
            <div style={{ color: '#64748b', fontSize: 11, fontWeight: 700, marginBottom: 4 }}>PHONE</div>
            <div style={{ color: '#f1f5f9', fontWeight: 700, direction: 'ltr' }}>{order.phone}</div>
          </div>
          <div>
            <div style={{ color: '#64748b', fontSize: 11, fontWeight: 700, marginBottom: 4 }}>CITY</div>
            <div style={{ color: '#f1f5f9' }}>{order.city || '—'}</div>
          </div>
          <div>
            <div style={{ color: '#64748b', fontSize: 11, fontWeight: 700, marginBottom: 4 }}>ADDRESS</div>
            <div style={{ color: '#f1f5f9', fontSize: 13 }}>{order.address || '—'}</div>
          </div>
        </div>

        {/* Items */}
        <div style={{ marginBottom: 16 }}>
          <div style={{ color: '#64748b', fontSize: 11, fontWeight: 700,
            textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 10 }}>
            Order Items
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {items.map((item: unknown, i: number) => {
              const it = item as Record<string, unknown>
              const prod = (it.product || {}) as Record<string, unknown>
              const tier = (it.tier || {}) as Record<string, unknown>
              const nameAr = (prod.nameAr as string) || (prod.nameEn as string) || 'Product'
              const sku = (prod.sku as string) || (prod.id as string) || '—'
              const qty = (tier.quantity as number) || (it.quantity as number) || 1
              const price = (tier.price as number) || 0
              const isUpsell = Boolean(it.isUpsell)
              return (
                <div key={i} style={{
                  background: '#0f172a', borderRadius: 10, padding: '12px 16px',
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  border: isUpsell ? '1px solid #D4AF3740' : '1px solid #1e293b',
                }}>
                  <div>
                    <div style={{ color: '#f1f5f9', fontWeight: 700, fontSize: 14 }}>
                      {nameAr}
                      {isUpsell && (
                        <span style={{
                          background: '#D4AF37', color: '#0f172a', borderRadius: 4,
                          padding: '2px 7px', fontSize: 10, fontWeight: 800,
                          marginRight: 8, verticalAlign: 'middle',
                        }}>UPSELL</span>
                      )}
                    </div>
                    <div style={{ color: '#64748b', fontSize: 12, marginTop: 2 }}>
                      SKU: {sku} · Qty: {qty}
                    </div>
                  </div>
                  <div style={{ color: '#D4AF37', fontWeight: 800 }}>{price} SAR</div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Total */}
        <div style={{
          background: '#0f172a', borderRadius: 12, padding: '16px 20px',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        }}>
          <div style={{ color: '#94a3b8', fontWeight: 700 }}>
            Total
            {order.accepted_upsell && (
              <span style={{ color: '#D4AF37', fontSize: 12, marginRight: 8 }}> · Upsell accepted</span>
            )}
          </div>
          <div style={{ color: '#D4AF37', fontSize: 22, fontWeight: 800 }}>
            {fmtSAR(order.total_amount)}
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Main Dashboard ───────────────────────────────────────────────────────────

export default function AdminDashboard() {
  const router = useRouter()
  const [tab, setTab] = useState<'overview' | 'orders'>('overview')
  const [metrics, setMetrics] = useState<Metrics | null>(null)
  const [ordersData, setOrdersData] = useState<OrdersResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const [selectedPreset, setSelectedPreset] = useState(2) // 7 days
  const [dateFrom, setDateFrom] = useState('')
  const [dateTo, setDateTo] = useState('')
  const [page, setPage] = useState(1)
  const [selectedOrder, setSelectedOrder] = useState<AdminOrder | null>(null)
  const [chartMetric, setChartMetric] = useState<'clicks' | 'orders' | 'revenue'>('clicks')

  useEffect(() => {
    if (!isAdminLoggedIn()) { router.replace('/admin'); return }
    const { from, to } = presetDates(PRESETS[selectedPreset].days === 0 ? 0 : PRESETS[selectedPreset].days)
    setDateFrom(from)
    setDateTo(to)
  }, [])

  const loadData = useCallback(async () => {
    if (!dateFrom) return
    setLoading(true)
    try {
      const [m, o] = await Promise.all([
        fetchMetrics(dateFrom, dateTo),
        fetchOrders(dateFrom, dateTo, page),
      ])
      setMetrics(m)
      setOrdersData(o)
    } catch (e: unknown) {
      if ((e as Error)?.message?.includes('401')) {
        router.replace('/admin')
      }
    } finally {
      setLoading(false)
    }
  }, [dateFrom, dateTo, page, router])

  useEffect(() => { loadData() }, [loadData])

  function applyPreset(idx: number) {
    setSelectedPreset(idx)
    const { from, to } = presetDates(PRESETS[idx].days)
    setDateFrom(from)
    setDateTo(to)
    setPage(1)
  }

  function handleLogout() {
    adminLogout()
    router.replace('/admin')
  }

  const chartData = chartMetric === 'clicks'
    ? metrics?.clicks_by_day || {}
    : chartMetric === 'orders'
      ? metrics?.orders_by_day || {}
      : metrics?.revenue_by_day || {}

  const s: Record<string, React.CSSProperties> = {
    page: { minHeight: '100vh', background: '#0f172a', color: '#f1f5f9', fontFamily: 'system-ui, sans-serif' },
    header: {
      background: '#1e293b', borderBottom: '1px solid #334155',
      padding: '0 32px', display: 'flex', alignItems: 'center',
      justifyContent: 'space-between', height: 60,
    },
    logo: { color: '#D4AF37', fontWeight: 800, fontSize: 18, display: 'flex', alignItems: 'center', gap: 10 },
    main: { maxWidth: 1200, margin: '0 auto', padding: '32px 24px' },
    row: { display: 'flex', gap: 12, flexWrap: 'wrap' as const, marginBottom: 24 },
    section: {
      background: '#1e293b', borderRadius: 14, padding: 24,
      border: '1px solid #334155', marginBottom: 24,
    },
    sectionTitle: { color: '#94a3b8', fontSize: 12, fontWeight: 700,
      textTransform: 'uppercase' as const, letterSpacing: '0.1em', marginBottom: 16 },
    tab: (active: boolean) => ({
      padding: '8px 18px', borderRadius: 8, border: 'none', cursor: 'pointer', fontWeight: 700,
      fontSize: 14, background: active ? '#D4AF37' : '#334155',
      color: active ? '#0f172a' : '#94a3b8',
    }),
    preset: (active: boolean) => ({
      padding: '6px 14px', borderRadius: 7, border: '1px solid #334155',
      cursor: 'pointer', fontSize: 13, fontWeight: 600,
      background: active ? '#334155' : 'transparent',
      color: active ? '#f1f5f9' : '#64748b',
    }),
  }

  return (
    <div style={s.page}>
      {/* Header */}
      <div style={s.header}>
        <div style={s.logo}>
          <span>⚡</span> Wafa Beauty Admin
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button onClick={handleLogout} style={{
            background: 'transparent', border: '1px solid #334155', color: '#94a3b8',
            borderRadius: 8, padding: '6px 14px', cursor: 'pointer', fontSize: 13,
          }}>
            Sign Out
          </button>
        </div>
      </div>

      <div style={s.main}>
        {/* Tabs + filters */}
        <div style={{ display: 'flex', justifyContent: 'space-between',
          alignItems: 'center', flexWrap: 'wrap', gap: 12, marginBottom: 24 }}>
          <div style={{ display: 'flex', gap: 8 }}>
            <button style={s.tab(tab === 'overview')} onClick={() => setTab('overview')}>
              Overview
            </button>
            <button style={s.tab(tab === 'orders')} onClick={() => setTab('orders')}>
              Orders {ordersData ? `(${ordersData.total})` : ''}
            </button>
          </div>
          <div style={{ display: 'flex', gap: 6, alignItems: 'center', flexWrap: 'wrap' as const }}>
            {PRESETS.map((p, i) => (
              <button key={i} style={s.preset(selectedPreset === i)} onClick={() => applyPreset(i)}>
                {p.label}
              </button>
            ))}
          </div>
        </div>

        {loading && (
          <div style={{ textAlign: 'center', color: '#64748b', padding: 60, fontSize: 16 }}>
            Loading...
          </div>
        )}

        {!loading && tab === 'overview' && metrics && (
          <>
            {/* Metric cards */}
            <div style={s.row}>
              <MetricCard label="Valid Clicks (KSA)" value={metrics.total_clicks.toLocaleString()} color="#60a5fa" />
              <MetricCard label="Orders" value={metrics.total_orders.toLocaleString()} color="#4ade80" />
              <MetricCard label="Conversion Rate" value={fmtPct(metrics.conversion_rate)} color="#D4AF37" />
              <MetricCard label="Revenue" value={fmtSAR(metrics.total_revenue)} color="#f472b6" />
              <MetricCard label="Avg Order Value" value={fmtSAR(metrics.avg_order_value)} color="#a78bfa" />
              <MetricCard label="Upsell Rate" value={fmtPct(metrics.upsell_rate)}
                sub={`${metrics.upsells_accepted} accepted`} color="#fb923c" />
            </div>

            {/* Chart */}
            <div style={s.section}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                <div style={s.sectionTitle}>Trend</div>
                <div style={{ display: 'flex', gap: 6 }}>
                  {(['clicks', 'orders', 'revenue'] as const).map(m => (
                    <button key={m} onClick={() => setChartMetric(m)}
                      style={{
                        padding: '4px 12px', borderRadius: 6, border: 'none',
                        background: chartMetric === m ? '#334155' : 'transparent',
                        color: chartMetric === m ? '#f1f5f9' : '#64748b',
                        cursor: 'pointer', fontSize: 12, fontWeight: 700, textTransform: 'capitalize',
                      }}>
                      {m}
                    </button>
                  ))}
                </div>
              </div>
              <LineChart
                data={chartData}
                color={chartMetric === 'clicks' ? '#60a5fa' : chartMetric === 'orders' ? '#4ade80' : '#D4AF37'}
              />
            </div>

            {/* Top Products */}
            <div style={s.section}>
              <div style={s.sectionTitle}>Top Products by Clicks</div>
              {metrics.top_products.length === 0 && (
                <div style={{ color: '#475569', fontSize: 14 }}>No click data yet</div>
              )}
              {metrics.top_products.map((p, i) => {
                const max = metrics.top_products[0]?.clicks || 1
                return (
                  <div key={i} style={{ marginBottom: 14 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                      <span style={{ color: '#f1f5f9', fontSize: 14 }}>{slugLabel(p.slug)}</span>
                      <span style={{ color: '#D4AF37', fontWeight: 700 }}>{p.clicks}</span>
                    </div>
                    <div style={{ background: '#0f172a', borderRadius: 4, height: 6 }}>
                      <div style={{
                        background: '#D4AF37', borderRadius: 4, height: 6,
                        width: `${(p.clicks / max) * 100}%`, transition: 'width 0.5s',
                      }} />
                    </div>
                  </div>
                )
              })}
            </div>
          </>
        )}

        {!loading && tab === 'orders' && ordersData && (
          <>
            <div style={s.section}>
              <div style={s.sectionTitle}>
                Orders — {ordersData.total} total · Page {ordersData.page}/{ordersData.pages}
              </div>
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid #334155' }}>
                      {['Order ID', 'Date', 'Customer', 'Phone', 'City', 'Products', 'Total', 'Upsell', ''].map(h => (
                        <th key={h} style={{ color: '#64748b', fontWeight: 700, fontSize: 11,
                          textTransform: 'uppercase', letterSpacing: '0.08em',
                          padding: '0 12px 12px', textAlign: 'left', whiteSpace: 'nowrap' }}>
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {ordersData.orders.map((order) => {
                      const items = Array.isArray(order.items) ? order.items : []
                      const productNames = items.map((it: unknown) => {
                        const i = it as Record<string, unknown>
                        const p = (i.product || {}) as Record<string, unknown>
                        return (p.nameAr as string) || (p.nameEn as string) || 'Product'
                      }).join(', ')

                      return (
                        <tr key={order.id} style={{ borderBottom: '1px solid #1e293b',
                          cursor: 'pointer', transition: 'background 0.1s' }}
                          onClick={() => setSelectedOrder(order)}
                          onMouseEnter={e => (e.currentTarget.style.background = '#1e293b')}
                          onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}>
                          <td style={{ padding: '14px 12px', color: '#D4AF37', fontWeight: 700, whiteSpace: 'nowrap' }}>
                            #{order.order_id_short}
                          </td>
                          <td style={{ padding: '14px 12px', color: '#94a3b8', whiteSpace: 'nowrap', fontSize: 12 }}>
                            {fmtDate(order.created_at)}
                          </td>
                          <td style={{ padding: '14px 12px', fontWeight: 600 }}>{order.full_name}</td>
                          <td style={{ padding: '14px 12px', color: '#94a3b8', direction: 'ltr', whiteSpace: 'nowrap' }}>
                            {order.phone}
                          </td>
                          <td style={{ padding: '14px 12px', color: '#94a3b8' }}>{order.city || '—'}</td>
                          <td style={{ padding: '14px 12px', color: '#94a3b8', maxWidth: 200,
                            overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                            {productNames}
                          </td>
                          <td style={{ padding: '14px 12px', color: '#D4AF37', fontWeight: 700, whiteSpace: 'nowrap' }}>
                            {fmtSAR(order.total_amount)}
                          </td>
                          <td style={{ padding: '14px 12px' }}>
                            {order.accepted_upsell
                              ? <span style={{ color: '#4ade80', fontWeight: 700, fontSize: 12 }}>✓ Yes</span>
                              : <span style={{ color: '#475569', fontSize: 12 }}>—</span>}
                          </td>
                          <td style={{ padding: '14px 12px' }}>
                            <span style={{ color: '#60a5fa', fontSize: 12 }}>View →</span>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              {ordersData.pages > 1 && (
                <div style={{ display: 'flex', gap: 8, marginTop: 20, justifyContent: 'center' }}>
                  <button
                    disabled={page <= 1}
                    onClick={() => setPage(p => p - 1)}
                    style={{ padding: '6px 14px', borderRadius: 8, border: '1px solid #334155',
                      background: 'transparent', color: page <= 1 ? '#334155' : '#94a3b8',
                      cursor: page <= 1 ? 'not-allowed' : 'pointer' }}>
                    ← Prev
                  </button>
                  <span style={{ color: '#64748b', lineHeight: '32px', fontSize: 13 }}>
                    Page {ordersData.page} of {ordersData.pages}
                  </span>
                  <button
                    disabled={page >= ordersData.pages}
                    onClick={() => setPage(p => p + 1)}
                    style={{ padding: '6px 14px', borderRadius: 8, border: '1px solid #334155',
                      background: 'transparent', color: page >= ordersData.pages ? '#334155' : '#94a3b8',
                      cursor: page >= ordersData.pages ? 'not-allowed' : 'pointer' }}>
                    Next →
                  </button>
                </div>
              )}
            </div>
          </>
        )}
      </div>

      {selectedOrder && (
        <OrderModal order={selectedOrder} onClose={() => setSelectedOrder(null)} />
      )}
    </div>
  )
}
