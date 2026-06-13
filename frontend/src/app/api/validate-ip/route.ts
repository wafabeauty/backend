import { NextRequest, NextResponse } from 'next/server'

const MAXMIND_ACCOUNT_ID = process.env.MAXMIND_ACCOUNT_ID || ''
const MAXMIND_LICENSE_KEY = process.env.MAXMIND_LICENSE_KEY || ''

// Whitelisted phone numbers that bypass IP check (for testing)
const WHITELISTED_PHONES = ['+971558406027', '971558406027', '0558406027']

export async function POST(req: NextRequest) {
  try {
    const { phone } = await req.json()

    // Whitelist bypass
    if (phone && WHITELISTED_PHONES.some((w) => phone.replace(/\s/g, '').endsWith(w.replace(/\+/g, '')))) {
      return NextResponse.json({ allowed: true, whitelisted: true })
    }

    // Get client IP
    const ip =
      req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
      req.headers.get('x-real-ip') ||
      '127.0.0.1'

    // Skip MaxMind check for local development
    if (ip === '127.0.0.1' || ip === '::1' || ip.startsWith('192.168.') || ip.startsWith('10.')) {
      return NextResponse.json({ allowed: true, dev: true })
    }

    if (!MAXMIND_ACCOUNT_ID || !MAXMIND_LICENSE_KEY) {
      // If MaxMind is not configured, allow all (fail open)
      return NextResponse.json({ allowed: true, reason: 'maxmind_not_configured' })
    }

    const credentials = Buffer.from(`${MAXMIND_ACCOUNT_ID}:${MAXMIND_LICENSE_KEY}`).toString('base64')

    const mmRes = await fetch(`https://geoip.maxmind.com/geoip/v2.1/insights/${ip}`, {
      headers: {
        Authorization: `Basic ${credentials}`,
        Accept: 'application/json',
      },
    })

    if (!mmRes.ok) {
      // Fail open if MaxMind returns an error to avoid blocking real customers
      console.error(`MaxMind API error: ${mmRes.status}`)
      return NextResponse.json({ allowed: true, reason: 'maxmind_error' })
    }

    const data = await mmRes.json()

    const country = data?.country?.iso_code as string | undefined
    const traits = data?.traits || {}

    const isSuspicious =
      traits.is_anonymous === true ||
      traits.is_anonymous_vpn === true ||
      traits.is_tor_exit_node === true ||
      traits.is_public_proxy === true ||
      traits.is_hosting_provider === true

    if (country !== 'SA') {
      return NextResponse.json({
        allowed: false,
        reason: 'not_ksa',
        message: 'عذراً، الطلبات متاحة فقط داخل المملكة العربية السعودية',
      })
    }

    if (isSuspicious) {
      return NextResponse.json({
        allowed: false,
        reason: 'suspicious',
        message: 'تعذّر التحقق من موقعك. يرجى إيقاف تشغيل VPN والمحاولة مرة أخرى',
      })
    }

    return NextResponse.json({ allowed: true, country })
  } catch (err) {
    console.error('validate-ip error:', err)
    // Fail open to avoid blocking real customers on unexpected errors
    return NextResponse.json({ allowed: true, reason: 'error' })
  }
}
