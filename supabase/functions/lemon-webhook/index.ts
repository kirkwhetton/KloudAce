// LemonSqueezy webhook handler
// Deploys as a Supabase Edge Function: supabase functions deploy lemon-webhook
//
// Required environment variables (set via Supabase dashboard → Settings → Edge Functions):
//   LEMON_SQUEEZY_WEBHOOK_SECRET  — from LemonSqueezy dashboard → Webhooks
//   SUPABASE_SERVICE_ROLE_KEY     — auto-injected by Supabase
//   SUPABASE_URL                  — auto-injected by Supabase
//
// LemonSqueezy events handled:
//   order_created      → set is_premium = true  (one-time purchase)
//   subscription_created → set is_premium = true
//   subscription_resumed → set is_premium = true  (after pause/un-cancel)
//   subscription_cancelled → leave is_premium = true until period ends
//                            (LemonSqueezy stops charging; access continues)

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const RELEVANT_EVENTS = new Set([
  "order_created",
  "subscription_created",
  "subscription_resumed",
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
  const sigBytes = hexToBytes(signature);
  return crypto.subtle.verify("HMAC", key, sigBytes, encoder.encode(body));
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

  if (!RELEVANT_EVENTS.has(eventName)) {
    // Acknowledge unhandled events without error
    return new Response(JSON.stringify({ received: true, handled: false }), {
      headers: { "Content-Type": "application/json" },
    });
  }

  // Extract buyer email from the payload
  const data = payload.data as Record<string, unknown>;
  const attributes = data?.attributes as Record<string, unknown>;
  const email = (attributes?.user_email ?? attributes?.customer_email) as string | undefined;

  if (!email) {
    console.error("No email found in webhook payload", JSON.stringify(payload));
    return new Response("No email in payload", { status: 422 });
  }

  // Update profiles table — set is_premium = true for this user
  const supabase = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
  );

  // Find the user by email in auth.users, then update their profile
  const { data: authUser, error: authError } = await supabase.auth.admin
    .listUsers();

  if (authError) {
    console.error("Error listing users:", authError.message);
    return new Response("Error fetching users", { status: 500 });
  }

  const user = authUser.users.find(
    (u) => u.email?.toLowerCase() === email.toLowerCase()
  );

  if (!user) {
    // User may not have signed up yet — store the order for manual follow-up
    console.warn(`Webhook received for unknown email: ${email}`);
    return new Response(
      JSON.stringify({ received: true, note: "user not found" }),
      { headers: { "Content-Type": "application/json" } }
    );
  }

  const { error: updateError } = await supabase
    .from("profiles")
    .update({ is_premium: true })
    .eq("id", user.id);

  if (updateError) {
    console.error("Error updating profile:", updateError.message);
    return new Response("Error updating profile", { status: 500 });
  }

  console.log(`✓ Granted premium to ${email} (${user.id}) via ${eventName}`);

  return new Response(
    JSON.stringify({ received: true, handled: true, email }),
    { headers: { "Content-Type": "application/json" } }
  );
});
