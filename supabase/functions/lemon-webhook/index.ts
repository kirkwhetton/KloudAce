// LemonSqueezy webhook handler
// Deploys as a Supabase Edge Function: supabase functions deploy lemon-webhook
//
// Required environment variables (set via Supabase dashboard → Settings → Edge Functions):
//   LEMON_SQUEEZY_WEBHOOK_SECRET  — from LemonSqueezy dashboard → Webhooks
//   SUPABASE_SERVICE_ROLE_KEY     — auto-injected by Supabase
//   SUPABASE_URL                  — auto-injected by Supabase
//
// LemonSqueezy events handled:
//   GRANT  — order_created, subscription_created, subscription_resumed, subscription_unpaused
//   REVOKE — subscription_expired

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const GRANT_EVENTS = new Set([
  "order_created",
  "subscription_created",
  "subscription_resumed",
  "subscription_unpaused",
]);

const REVOKE_EVENTS = new Set([
  "subscription_expired",
]);

async function verifySignature(
  body: string,
  signature: string,
  secret: string
): Promise<boolean> {
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["verify"]
  );
  return crypto.subtle.verify("HMAC", key, hexToBytes(signature), encoder.encode(body));
}

function hexToBytes(hex: string): Uint8Array {
  const bytes = new Uint8Array(hex.length / 2);
  for (let i = 0; i < hex.length; i += 2) {
    bytes[i / 2] = parseInt(hex.slice(i, i + 2), 16);
  }
  return bytes;
}

serve(async (req) => {
  if (req.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
  }

  const body = await req.text();
  const signature = req.headers.get("x-signature") ?? "";
  const secret = Deno.env.get("LEMON_SQUEEZY_WEBHOOK_SECRET") ?? "";

  if (!secret) {
    console.error("LEMON_SQUEEZY_WEBHOOK_SECRET is not set");
    return new Response("Server misconfiguration", { status: 500 });
  }

  const valid = await verifySignature(body, signature, secret);
  if (!valid) {
    console.warn("Invalid webhook signature");
    return new Response("Invalid signature", { status: 401 });
  }

  let payload: Record<string, unknown>;
  try {
    payload = JSON.parse(body);
  } catch {
    return new Response("Invalid JSON", { status: 400 });
  }

  const eventName = (payload.meta as Record<string, unknown>)?.event_name as string;

  if (!GRANT_EVENTS.has(eventName) && !REVOKE_EVENTS.has(eventName)) {
    return new Response(JSON.stringify({ received: true, handled: false }), {
      headers: { "Content-Type": "application/json" },
    });
  }

  const attributes = (payload.data as Record<string, unknown>)?.attributes as Record<string, unknown>;
  const email = ((attributes?.user_email ?? attributes?.customer_email) as string | undefined)
    ?.toLowerCase();

  if (!email) {
    console.error("No email found in webhook payload", JSON.stringify(payload));
    return new Response("No email in payload", { status: 422 });
  }

  const supabase = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
  );

  const isPremium = GRANT_EVENTS.has(eventName);

  // Look up and update by email directly — avoids listUsers() pagination limit
  const { data, error } = await supabase
    .from("profiles")
    .update({ is_premium: isPremium })
    .ilike("email", email)
    .select("id");

  if (error) {
    console.error("Error updating profile:", error.message);
    return new Response("Error updating profile", { status: 500 });
  }

  if (!data || data.length === 0) {
    console.warn(`Webhook received for unknown email: ${email}`);
    return new Response(
      JSON.stringify({ received: true, note: "user not found" }),
      { headers: { "Content-Type": "application/json" } }
    );
  }

  console.log(`✓ Set is_premium=${isPremium} for ${email} via ${eventName}`);

  return new Response(
    JSON.stringify({ received: true, handled: true, email, isPremium }),
    { headers: { "Content-Type": "application/json" } }
  );
});
