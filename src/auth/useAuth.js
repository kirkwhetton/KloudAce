// ─── useAuth — Supabase implementation ───────────────────────────
// Auth state comes from Supabase Auth (JWT, server-signed).
// isPremium comes from the profiles table, readable by the owner
// but writable only via the service-role key (e.g. a Stripe webhook).
// ─────────────────────────────────────────────────────────────────
import { useState, useEffect, useCallback } from "react";
import { supabase } from "./supabase";

const withTimeout = (promise, ms, msg) =>
  Promise.race([promise, new Promise((_, reject) => setTimeout(() => reject(new Error(msg)), ms))]);

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
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        if (session?.user) {
          try {
            setUser(await fetchProfile(session.user));
          } catch {
            // fetchProfile failed (network/RLS issue) but the session is valid —
            // fall back to basic Supabase auth data so the user isn't logged out.
            setUser({
              id:          session.user.id,
              name:        session.user.user_metadata?.name ?? "",
              email:       session.user.email ?? "",
              isPremium:   false,
              isDeveloper: false,
            });
          }
        } else {
          setUser(null);
        }
        settle();
      }
    );

    return () => { subscription.unsubscribe(); clearTimeout(timeout); };
  }, []);

  const isAuthenticated = user !== null;

  const register = useCallback(async ({ name, email, password }) => {
    setError(null);
    const { data, error: err } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { name } },
    });
    if (err) { setError(friendlyError(err)); return { success: false }; }
    // If session is null, Supabase requires email confirmation before login
    const needsConfirmation = !data.session;
    return { success: true, needsConfirmation };
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
      const { error: err } = await withTimeout(
        supabase.auth.signInWithPassword({ email, password }),
        20_000,
        "timeout"
      );
      if (err) { setError(friendlyError(err)); return false; }
      return true;
    } catch {
      setError("Sign in is taking too long — check your connection and try again.");
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
