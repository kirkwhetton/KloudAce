import { describe, it, expect } from 'vitest'

// ── Pure logic extracted from supabase/functions/lemon-webhook/index.ts ──
// These functions have no Deno or Supabase dependencies.

function hexToBytes(hex) {
  const bytes = new Uint8Array(hex.length / 2)
  for (let i = 0; i < hex.length; i += 2) {
    bytes[i / 2] = parseInt(hex.slice(i, i + 2), 16)
  }
  return bytes
}

const GRANT_EVENTS = new Set([
  'order_created',
  'subscription_created',
  'subscription_resumed',
  'subscription_unpaused',
])

const REVOKE_EVENTS = new Set([
  'subscription_expired',
])

function extractEmail(payload) {
  const attributes = payload?.data?.attributes
  return (attributes?.user_email ?? attributes?.customer_email)?.toLowerCase() ?? null
}

// ── hexToBytes ────────────────────────────────────────────────────

describe('hexToBytes', () => {
  it('converts a known hex string to the correct bytes', () => {
    const bytes = hexToBytes('deadbeef')
    expect(Array.from(bytes)).toEqual([0xde, 0xad, 0xbe, 0xef])
  })

  it('returns an empty array for an empty string', () => {
    expect(hexToBytes('').length).toBe(0)
  })

  it('handles a 40-char hex string (20 bytes — max LemonSqueezy secret)', () => {
    const hex = 'a'.repeat(40)
    expect(hexToBytes(hex).length).toBe(20)
  })
})

// ── Event classification ──────────────────────────────────────────

describe('grant events', () => {
  it.each(['order_created', 'subscription_created', 'subscription_resumed', 'subscription_unpaused'])(
    'grants premium for %s',
    (event) => expect(GRANT_EVENTS.has(event)).toBe(true)
  )
})

describe('revoke events', () => {
  it('revokes premium for subscription_expired', () => {
    expect(REVOKE_EVENTS.has('subscription_expired')).toBe(true)
  })
})

describe('ignored events', () => {
  it.each(['subscription_cancelled', 'subscription_paused', 'order_refunded', 'ping'])(
    'ignores %s (neither grants nor revokes)',
    (event) => {
      expect(GRANT_EVENTS.has(event)).toBe(false)
      expect(REVOKE_EVENTS.has(event)).toBe(false)
    }
  )
})

// ── extractEmail ──────────────────────────────────────────────────

describe('extractEmail', () => {
  it('reads user_email from order_created payload', () => {
    const payload = { data: { attributes: { user_email: 'kirk@example.com' } } }
    expect(extractEmail(payload)).toBe('kirk@example.com')
  })

  it('falls back to customer_email when user_email is absent', () => {
    const payload = { data: { attributes: { customer_email: 'kirk@example.com' } } }
    expect(extractEmail(payload)).toBe('kirk@example.com')
  })

  it('prefers user_email over customer_email when both are present', () => {
    const payload = {
      data: { attributes: { user_email: 'a@example.com', customer_email: 'b@example.com' } },
    }
    expect(extractEmail(payload)).toBe('a@example.com')
  })

  it('returns null when neither email field is present', () => {
    const payload = { data: { attributes: {} } }
    expect(extractEmail(payload)).toBeNull()
  })

  it('returns null for a malformed payload', () => {
    expect(extractEmail({})).toBeNull()
    expect(extractEmail(null)).toBeNull()
  })

  it('lowercases the returned email', () => {
    const payload = { data: { attributes: { user_email: 'Kirk@Example.COM' } } }
    expect(extractEmail(payload)).toBe('kirk@example.com')
  })
})

// ── HMAC signature verification ───────────────────────────────────
// Uses the Web Crypto API (available in Node 19+ / jsdom)

async function verifySignature(body, signature, secret) {
  const encoder = new TextEncoder()
  const key = await crypto.subtle.importKey(
    'raw',
    encoder.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['verify']
  )
  const sigBytes = hexToBytes(signature)
  return crypto.subtle.verify('HMAC', key, sigBytes, encoder.encode(body))
}

async function sign(body, secret) {
  const encoder = new TextEncoder()
  const key = await crypto.subtle.importKey(
    'raw',
    encoder.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  )
  const sig = await crypto.subtle.sign('HMAC', key, encoder.encode(body))
  return Array.from(new Uint8Array(sig)).map(b => b.toString(16).padStart(2, '0')).join('')
}

describe('verifySignature', () => {
  const SECRET = 'test-webhook-secret'
  const BODY   = JSON.stringify({ meta: { event_name: 'order_created' } })

  it('returns true for a valid signature', async () => {
    const sig = await sign(BODY, SECRET)
    expect(await verifySignature(BODY, sig, SECRET)).toBe(true)
  })

  it('returns false when the body has been tampered with', async () => {
    const sig = await sign(BODY, SECRET)
    expect(await verifySignature(BODY + ' ', sig, SECRET)).toBe(false)
  })

  it('returns false when the signature is wrong', async () => {
    const wrongSig = await sign(BODY, 'different-secret')
    expect(await verifySignature(BODY, wrongSig, SECRET)).toBe(false)
  })

  it('returns false for a zeroed signature', async () => {
    const zeroSig = '0'.repeat(64)
    expect(await verifySignature(BODY, zeroSig, SECRET)).toBe(false)
  })
})
