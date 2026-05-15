// ─── AuthProvider ────────────────────────────────────────────────
// Wraps the whole app and makes auth available anywhere via context.
// When moving to Entra ID, wrap this with MsalProvider instead.
// ────────────────────────────────────────────────────────────────
import { createContext, useContext } from "react";
import { useAuth } from "./useAuth";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const auth = useAuth();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

// Custom hook — any component can call useAuthContext() to get auth state
export function useAuthContext() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuthContext must be used inside <AuthProvider>");
  return ctx;
}
