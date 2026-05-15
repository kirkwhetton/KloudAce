// ─── useAuth — Local Storage implementation ──────────────────────
// This file is the ONLY thing you replace when moving to Entra ID.
// The hook always returns the same shape:
//   { user, isAuthenticated, login, register, logout, error }
//
// Entra ID swap: replace the body of this file with MSAL calls.
// The rest of the app never changes.
// ────────────────────────────────────────────────────────────────
import { useState, useCallback } from "react";

const USERS_KEY = "azfc_users";   // stored user accounts
const SESSION_KEY = "azfc_session"; // current logged-in user

// ---------- helpers ----------

function loadUsers() {
  try { return JSON.parse(localStorage.getItem(USERS_KEY)) || []; }
  catch { return []; }
}

function saveUsers(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

function loadSession() {
  try { return JSON.parse(localStorage.getItem(SESSION_KEY)) || null; }
  catch { return null; }
}

// Simple hash — NOT cryptographically secure.
// Fine for a local dev placeholder; Entra ID handles real auth.
async function hashPassword(password) {
  const buf = await crypto.subtle.digest(
    "SHA-256",
    new TextEncoder().encode(password)
  );
  return Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

// ---------- hook ----------

export function useAuth() {
  const [user, setUser] = useState(loadSession);
  const [error, setError] = useState(null);

  const isAuthenticated = user !== null;

  // Register a new account
  const register = useCallback(async ({ name, email, password }) => {
    setError(null);
    const users = loadUsers();

    if (users.find((u) => u.email.toLowerCase() === email.toLowerCase())) {
      setError("An account with that email already exists.");
      return false;
    }

    const hash = await hashPassword(password);
    const newUser = { id: crypto.randomUUID(), name, email, hash };
    saveUsers([...users, newUser]);

    // Auto-login after registration
    const session = { id: newUser.id, name: newUser.name, email: newUser.email };
    localStorage.setItem(SESSION_KEY, JSON.stringify(session));
    setUser(session);
    return true;
  }, []);

  // Login with email + password
  const login = useCallback(async ({ email, password }) => {
    setError(null);
    const users = loadUsers();
    const found = users.find((u) => u.email.toLowerCase() === email.toLowerCase());

    if (!found) {
      setError("No account found with that email.");
      return false;
    }

    const hash = await hashPassword(password);
    if (hash !== found.hash) {
      setError("Incorrect password.");
      return false;
    }

    const session = { id: found.id, name: found.name, email: found.email };
    localStorage.setItem(SESSION_KEY, JSON.stringify(session));
    setUser(session);
    return true;
  }, []);
  // Update display name / email
  const updateProfile = useCallback(async ({ name, email }) => {
    setError(null);
    const users = loadUsers();
    const idx = users.findIndex((u) => u.id === user?.id);
    if (idx === -1) { setError("User not found."); return false; }

    // Check email uniqueness (allow keeping same email)
    const conflict = users.find(
      (u) => u.email.toLowerCase() === email.toLowerCase() && u.id !== user.id
    );
    if (conflict) { setError("That email is already used by another account."); return false; }

    users[idx] = { ...users[idx], name, email };
    saveUsers(users);
    const session = { id: user.id, name, email };
    localStorage.setItem(SESSION_KEY, JSON.stringify(session));
    setUser(session);
    return true;
  }, [user]);

  // Change password
  const changePassword = useCallback(async ({ currentPassword, newPassword }) => {
    setError(null);
    const users = loadUsers();
    const idx = users.findIndex((u) => u.id === user?.id);
    if (idx === -1) { setError("User not found."); return false; }

    const currentHash = await hashPassword(currentPassword);
    if (currentHash !== users[idx].hash) {
      setError("Current password is incorrect.");
      return false;
    }

    users[idx] = { ...users[idx], hash: await hashPassword(newPassword) };
    saveUsers(users);
    return true;
  }, [user]);

  // Logout
  const logout = useCallback(() => {
    localStorage.removeItem(SESSION_KEY);
    setUser(null);
    setError(null);
  }, []);

  return { user, isAuthenticated, login, register, logout, updateProfile, changePassword, error, setError };
}
