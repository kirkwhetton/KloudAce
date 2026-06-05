# lemon-webhook

Supabase Edge Function that receives LemonSqueezy purchase webhooks and grants premium access.

## Setup

### 1. Create a LemonSqueezy account
Go to https://lemonsqueezy.com and create an account.

### 2. Create a product
- New Store → create a product named "KloudAce Premium"
- Set price to £9.99/month (monthly subscription)
- Note the **Variant ID** from the product URL

### 3. Get your checkout URL
Your checkout URL will be:
```
https://<your-store>.lemonsqueezy.com/checkout/buy/<variant-id>
```

Add this to `.env.local`:
```
VITE_LEMON_SQUEEZY_CHECKOUT_URL=https://kloudace.lemonsqueezy.com/checkout/buy/<variant-id>
```

### 4. Create a webhook
In LemonSqueezy dashboard → Settings → Webhooks:
- URL: `https://<your-supabase-project>.supabase.co/functions/v1/lemon-webhook`
- Events to subscribe: `order_created`, `subscription_created`, `subscription_resumed`, `subscription_cancelled`
- Copy the **Signing Secret**

### 5. Set Edge Function environment variables
In Supabase dashboard → Settings → Edge Functions (or via CLI):
```bash
supabase secrets set LEMON_SQUEEZY_WEBHOOK_SECRET=<your-signing-secret>
```
`SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` are injected automatically.

### 6. Deploy the function
```bash
supabase functions deploy lemon-webhook
```

## Testing
Use the LemonSqueezy webhook test button in the dashboard, or use their test mode checkout.

## Event handling
| Event | Action |
|-------|--------|
| `order_created` | Set `is_premium = true` (one-time purchase) |
| `subscription_created` | Set `is_premium = true` |
| `subscription_resumed` | Set `is_premium = true` (after cancellation reversal) |
| `subscription_cancelled` | No action — access continues until period end, LemonSqueezy stops charging |
