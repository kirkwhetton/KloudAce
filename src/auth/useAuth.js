// ─── useAuth — Supabase implementation ───────────────────────────
// Auth state comes from Supabase Auth (JWT, server-signed).
// isPremium comes from the profiles table, readable by the owner
// but writable only via the service-role key (e.g. a Stripe webhook).
// ─────────────────────────────────────────────────────────────────
import { useState, useEffect, useCallback } from "react";
import { supabase } from "./supabase";

const withTimeout = (promise, ms, msg) =>
  Promise.race([promise, new Promise((_, reject) => setTimeout(() => reject(new Error(msg)), ms))]);

// Network-level errors thrown by a cold-starting Supabase instance —
// these are transient and worth retrying rather than showing to the user.
const isRetryableNetworkError = (err) => {
  const msg = (err?.message ?? "").toLowerCase();
  return msg.includes("load failed") || msg.includes("failed to fetch") || msg.includes("network");
};

// Retry an auth call up to `attempts` times with backoff, to ride out
// Supabase cold-starts (which can take 30-50 s on the free tier).
async function withAuthRetry(fn, { attempts = 3, timeoutMs = 15_000 } = {}) {
  let lastErr;
  for (let i = 0; i < attempts; i++) {
    try {
      return await withTimeout(fn(), timeoutMs, "timeout");
    } catch (err) {
      lastErr = err;
      if (err.message === "timeout" || isRetryableNetworkError(err)) {
        if (i < attempts - 1) await new Promise(r => setTimeout(r, 1_500 * (i + 1)));
        continue;
      }
      throw err;
    }
  }
  throw lastErr;
}

async function fetchProfile(supabaseUser) {
  const { data } = await withTimeout(
    supabase.from("profiles").select("name, email, is_premium, is_developer").eq("id", supabaseUser.id).single(),
    8_000,
    "profile_timeout"
  );
  return {
    id:          supabaseUser.id,
    name:        data?.name        ?? supabaseUser.user_metadata?.name ?? "",
    email:       data?.email       ?? supabaseUser.email,
    isPremium:   data?.is_premium  ?? false,
    isDeveloper: data?.is_developer ?? false,
  };
}

function friendlyError(err) {
  const msg = (err.message ?? "").toLowerCase();
  if (msg.includes("after") && msg.includes("seconds"))
    return "Too many attempts — please wait a moment and try again.";
  if (msg.includes("email rate") || msg.includes("rate limit"))
    return "Too many sign-up attempts right now — please try again in a few minutes.";
  if (msg.includes("already registered") || msg.includes("already exists"))
    return "An account with that email already exists.";
  if (msg.includes("invalid login") || msg.includes("invalid credential"))
    return "Incorrect email or password.";
  if (msg.includes("email not confirmed"))
    return "Please confirm your email address before signing in.";
  if (msg.includes("password"))
    return "Password must be at least 10 characters.";
  if (isRetryableNetworkError(err) || msg === "timeout")
    return "Couldn't reach the server — please check your connection and try again.";
  return err.message || "Something went wrong. Please try again.";
}

const GUEST_USER = { id: "guest", name: "Guest", email: "", isPremium: false, isDeveloper: false };

export function useAuth() {
  const [user,    setUser]    = useState(null);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState(null);
  const [isGuest, setIsGuest] = useState(false);

  useEffect(() => {
    let settled = false;
    const settle = () => { if (!settled) { settled = true; setLoading(false); } };

    // Hard timeout — if Supabase never responds, unblock the app after 6 s
    const timeout = setTimeout(settle, 6000);

    // onAuthStateChange fires INITIAL_SESSION on mount (from localStorage cache),
    // which covers the same ground as getSession() — so we use only one source.
    let seq = 0;
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        const mine = ++seq;
        if (session?.user) {
          try {
            const profile = await fetchProfile(session.user);
            if (mine === seq) setUser(profile);
          } catch {
            // fetchProfile failed (network/RLS issue) but the session is valid —
            // preserve any flags already loaded rather than clobbering them.
            if (mine === seq) {
              setUser(prev => ({
                id:          session.user.id,
                name:        prev?.name        ?? session.user.user_metadata?.name ?? "",
                email:       prev?.email       ?? session.user.email ?? "",
                isPremium:   prev?.isPremium   ?? false,
                isDeveloper: prev?.isDeveloper ?? false,
              }));
            }
          }
        } else {
          if (mine === seq) setUser(null);
        }
        settle();
      }
    );

    return () => { subscription.unsubscribe(); clearTimeout(timeout); };
  }, []);

  const isAuthenticated = user !== null;

  const register = useCallback(async ({ name, email, password }) => {
    setError(null);
    try {
      const { data, error: err } = await withAuthRetry(
        () => supabase.auth.signUp({ email, password, options: { data: { name } } }),
        { attempts: 3, timeoutMs: 15_000 }
      );
      if (err) { setError(friendlyError(err)); return { success: false }; }
      // If session is null, Supabase requires email confirmation before login
      const needsConfirmation = !data.session;
      return { success: true, needsConfirmation };
    } catch {
      setError("Couldn't reach the server — please check your connection and try again.");
      return { success: false };
    }
  }, []);

  const verifyOtp = useCallback(async ({ email, token }) => {
    setError(null);
    const { error: err } = await supabase.auth.verifyOtp({ email, token, type: "signup" });
    if (err) { setError("Invalid or expired code. Please check and try again."); return false; }
    return true;
  }, []);

  const login = useCallback(async ({ email, password }) => {
    setError(null);
    try {
      const { error: err } = await withAuthRetry(
        () => supabase.auth.signInWithPassword({ email, password }),
        { attempts: 3, timeoutMs: 15_000 }
      );
      if (err) { setError(friendlyError(err)); return false; }
      return true;
    } catch {
      setError("Couldn't reach the server — please check your connection and try again.");
      return false;
    }
  }, []);

  const loginAsGuest = useCallback(() => {
    setError(null);
    setIsGuest(true);
    setUser(GUEST_USER);
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    setIsGuest(false);
    supabase.auth.signOut().catch(() => {});
  }, []);

  const updateProfile = useCallback(async ({ name, email }) => {
    setError(null);
    const { error: authErr } = await supabase.auth.updateUser({ email });
    if (authErr) { setError(authErr.message); return false; }
    const { error: dbErr } = await supabase
      .from("profiles")
      .update({ name, email })
      .eq("id", user.id);
    if (dbErr) { setError(dbErr.message); return false; }
    setUser(prev => ({ ...prev, name, email }));
    return true;
  }, [user]);

  const changePassword = useCallback(async ({ currentPassword, newPassword }) => {
    setError(null);
    // Re-authenticate with current password first to verify it
    const { error: verifyErr } = await supabase.auth.signInWithPassword({
      email: user.email,
      password: currentPassword,
    });
    if (verifyErr) { setError("Current password is incorrect."); return false; }
    const { error: err } = await supabase.auth.updateUser({ password: newPassword });
    if (err) { setError(err.message); return false; }
    return true;
  }, [user]);

  return {
    user, isAuthenticated, loading,
    isGuest, loginAsGuest,
    login, register, logout, updateProfile, changePassword, verifyOtp,
    error, setError,
  };
}
