// ─── useAuth — Supabase implementation ───────────────────────────
// Auth state comes from Supabase Auth (JWT, server-signed).
// isPremium comes from the profiles table, readable by the owner
// but writable only via the service-role key (e.g. a Stripe webhook).
// ─────────────────────────────────────────────────────────────────
import { useState, useEffect, useCallback } from "react";
import { supabase } from "./supabase";

async function fetchProfile(supabaseUser) {
  const { data } = await supabase
    .from("profiles")
    .select("name, email, is_premium, is_developer")
    .eq("id", supabaseUser.id)
    .single();
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

export function useAuth() {
  const [user,    setUser]    = useState(null);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState(null);

  useEffect(() => {
    // Restore existing session on mount
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      if (session?.user) setUser(await fetchProfile(session.user));
      setLoading(false);
    });

    // Keep state in sync with Supabase auth events (sign-in, sign-out, token refresh)
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        if (session?.user) setUser(await fetchProfile(session.user));
        else               setUser(null);
        setLoading(false);
      }
    );

    return () => subscription.unsubscribe();
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
    const { error: err } = await supabase.auth.signInWithPassword({ email, password });
    if (err) { setError(friendlyError(err)); return false; }
    return true;
  }, []);

  const logout = useCallback(() => {
    setUser(null); // clear immediately — don't wait for network
    supabase.auth.signOut().catch(() => {}); // fire and forget
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
    login, register, logout, updateProfile, changePassword, verifyOtp,
    error, setError,
  };
}
