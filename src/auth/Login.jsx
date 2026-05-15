import { useState } from "react";
import { useAuthContext } from "./AuthProvider";
import "./Login.css";

export default function Login() {
  const { login, register, error, setError } = useAuthContext();
  const [mode, setMode] = useState("login"); // "login" | "register"
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "" });

  const update = (e) => {
    setError(null);
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const switchMode = (m) => {
    setMode(m);
    setForm({ name: "", email: "", password: "", confirm: "" });
    setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (mode === "register") {
      if (form.password !== form.confirm) {
        setError("Passwords do not match.");
        setLoading(false);
        return;
      }
      await register({ name: form.name, email: form.email, password: form.password });
    } else {
      await login({ email: form.email, password: form.password });
    }

    setLoading(false);
  };

  return (
    <div className="login-page">
      <div className="login-card">
        {/* Logo */}
        <div className="login-logo">
          <span className="login-cloud">☁</span>          <h1>Azure<span className="title-ace">Ace</span></h1>
          <p>Your Azure learning & certification hub</p>
        </div>

        {/* Tabs */}
        <div className="login-tabs">
          <button
            className={`login-tab${mode === "login" ? " active" : ""}`}
            onClick={() => switchMode("login")}
          >
            Sign In
          </button>
          <button
            className={`login-tab${mode === "register" ? " active" : ""}`}
            onClick={() => switchMode("register")}
          >
            Register
          </button>
        </div>

        {/* Form */}
        <form className="login-form" onSubmit={handleSubmit} noValidate>
          {mode === "register" && (
            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <input
                id="name"
                name="name"
                type="text"
                value={form.name}
                onChange={update}
                placeholder="Your name"
                required
                autoComplete="name"
              />
            </div>
          )}

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              value={form.email}
              onChange={update}
              placeholder="you@example.com"
              required
              autoComplete="email"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              value={form.password}
              onChange={update}
              placeholder={mode === "register" ? "Choose a password" : "Your password"}
              required
              autoComplete={mode === "register" ? "new-password" : "current-password"}
            />
          </div>

          {mode === "register" && (
            <div className="form-group">
              <label htmlFor="confirm">Confirm Password</label>
              <input
                id="confirm"
                name="confirm"
                type="password"
                value={form.confirm}
                onChange={update}
                placeholder="Repeat your password"
                required
                autoComplete="new-password"
              />
            </div>
          )}

          {error && <p className="login-error">⚠️ {error}</p>}

          <button className="login-submit" type="submit" disabled={loading}>
            {loading ? "Please wait…" : mode === "login" ? "Sign In" : "Create Account"}
          </button>
        </form>

        <p className="login-note">
          🔒 Your account is stored locally on this device.
        </p>
      </div>
    </div>
  );
}
