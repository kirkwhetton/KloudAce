import { useState, useEffect, useRef } from "react";
import { useAuthContext } from "./AuthProvider";
import { wakeSupabase } from "../lib/cardLoader";
import { WarningIcon } from "../components/Icons";
import "./Login.css";

export default function Login({ onBack }) {
  const { login, register, verifyOtp, loginAsGuest, requestPasswordReset, resetPassword, error, setError } = useAuthContext();
  const [mode, setMode] = useState("login"); // "login" | "register" | "forgot"
  const [loading, setLoading] = useState(false);
  const [slowWarning, setSlowWarning] = useState(false);
  const slowTimer = useRef(null);
  const [confirming, setConfirming] = useState(false); // awaiting OTP confirmation (signup)
  // forgot-password sub-steps: "request" -> "code" -> "newPassword" -> "done"
  const [forgotStep, setForgotStep] = useState("request");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [newPw, setNewPw] = useState("");
  const [confirmPw, setConfirmPw] = useState("");

  const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "" });

  // Warm up Supabase as soon as the login screen appears, so the first
  // sign-in attempt doesn't hit a cold-starting instance.
  useEffect(() => { wakeSupabase(); }, []);

  const update = (e) => {
    setError(null);
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const switchMode = (m) => {
    setMode(m);
    setConfirming(false);
    setForgotStep("request");
    setOtp(["", "", "", "", "", ""]);
    setNewPw("");
    setConfirmPw("");
    setForm({ name: "", email: "", password: "", confirm: "" });
    setError(null);
  };

  const handleOtpChange = (i, val) => {
    if (!/^\d?$/.test(val)) return;
    const next = [...otp];
    next[i] = val;
    setOtp(next);
    if (val && i < 5) document.getElementById(`otp-${i + 1}`)?.focus();
  };

  const handleOtpKeyDown = (i, e) => {
    if (e.key === "Backspace" && !otp[i] && i > 0) document.getElementById(`otp-${i - 1}`)?.focus();
  };

  const handleOtpPaste = (e) => {
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    if (pasted.length === 6) {
      setOtp(pasted.split(""));
      document.getElementById("otp-5")?.focus();
      e.preventDefault();
    }
  };

  const handleVerify = async () => {
    const token = otp.join("");
    if (token.length < 6) { setError("Please enter the full 6-digit code."); return; }
    setLoading(true);
    setError(null);
    const ok = await verifyOtp({ email: form.email, token, type: "signup" });
    if (!ok) setLoading(false);
    // if ok, onAuthStateChange handles navigation automatically
  };

  const handleForgotSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const ok = await requestPasswordReset({ email: form.email });
    setLoading(false);
    if (ok) setForgotStep("code");
  };

  const handleVerifyRecoveryCode = async () => {
    const token = otp.join("");
    if (token.length < 6) { setError("Please enter the full 6-digit code."); return; }
    setLoading(true);
    setError(null);
    const ok = await verifyOtp({ email: form.email, token, type: "recovery" });
    setLoading(false);
    if (ok) setForgotStep("newPassword");
  };

  const handleSetNewPassword = async (e) => {
    e.preventDefault();
    setError(null);
    if (newPw.length < 10) { setError("Password must be at least 10 characters."); return; }
    if (newPw !== confirmPw) { setError("Passwords do not match."); return; }
    setLoading(true);
    const ok = await resetPassword({ newPassword: newPw });
    setLoading(false);
    if (ok) setForgotStep("done");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSlowWarning(false);
    slowTimer.current = setTimeout(() => setSlowWarning(true), 5000);

    if (mode === "register") {
      if (form.password !== form.confirm) {
        setError("Passwords do not match.");
        setLoading(false);
        clearTimeout(slowTimer.current);
        setSlowWarning(false);
        return;
      }
      const result = await register({ name: form.name, email: form.email, password: form.password });
      if (result?.needsConfirmation) setConfirming(true);
    } else {
      await login({ email: form.email, password: form.password });
    }

    setLoading(false);
    clearTimeout(slowTimer.current);
    setSlowWarning(false);
  };

  return (
    <div className="login-page">
      {onBack && (
        <button className="login-back-btn" onClick={onBack}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/>
          </svg>
          Back
        </button>
      )}
      <div className="login-card">
        {/* Logo */}
        <div className="login-logo">
          <div className="login-cloud-logo">
            <svg className="login-cloud-svg" viewBox="0 0 260 165" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <defs>
                <path id="loginCloud" d="M50 115C30 115 15 100 15 82C15 66 27 53 43 51C45 30 63 14 85 14C102 14 117 24 124 39C129 36 135 34 141 34C159 34 174 49 174 67C188 69 199 81 199 95C199 106 191 115 180 115Z"/>
              </defs>
              <use href="#loginCloud" x="20" y="27" fill="#185FA5"/>
              <use href="#loginCloud" x="40" y="47" fill="#ffffff" stroke="#2980D9" strokeWidth="5"/>
            </svg>
            <div className="login-cloud-text">
              <span className="login-cloud-brand">Kloud<span className="title-ace">Ace</span></span>
            </div>
          </div>
          <p className="login-cloud-tagline">Your cloud learning and certification hub</p>
        </div>

        {/* OTP confirmation screen */}
        {confirming && (
          <div className="login-confirm-screen">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="login-confirm-icon">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
              <polyline points="22,6 12,13 2,6"/>
            </svg>
            <h2>Check your email</h2>
            <p>We sent a 6-digit code to <strong>{form.email}</strong>. Enter it below to activate your account.</p>
            <div className="otp-inputs" onPaste={handleOtpPaste}>
              {otp.map((digit, i) => (
                <input
                  key={i}
                  id={`otp-${i}`}
                  className="otp-box"
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleOtpChange(i, e.target.value)}
                  onKeyDown={(e) => handleOtpKeyDown(i, e)}
                  autoFocus={i === 0}
                />
              ))}
            </div>
            {error && <p className="login-error"><WarningIcon /> {error}</p>}
            <button className="login-submit" onClick={handleVerify} disabled={loading}>
              {loading ? "Verifying…" : "Verify Code"}
            </button>
            <button className="login-text-btn" onClick={() => switchMode("login")}>
              Back to Sign In
            </button>
          </div>
        )}

        {/* Forgot-password flow */}
        {mode === "forgot" && (
          <div className="login-confirm-screen">
            {forgotStep === "request" && (
              <>
                <h2>Reset your password</h2>
                <p>Enter your email and we'll send you a 6-digit code to reset your password.</p>
                <form className="login-form" onSubmit={handleForgotSubmit} noValidate>
                  <div className="form-group">
                    <label htmlFor="forgot-email">Email</label>
                    <input
                      id="forgot-email"
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={update}
                      placeholder="you@example.com"
                      required
                      autoComplete="email"
                    />
                  </div>
                  {error && <p className="login-error"><WarningIcon /> {error}</p>}
                  <button className="login-submit" type="submit" disabled={loading}>
                    {loading ? "Sending…" : "Send Reset Code"}
                  </button>
                </form>
                <button className="login-text-btn" onClick={() => switchMode("login")}>
                  Back to Sign In
                </button>
              </>
            )}

            {forgotStep === "code" && (
              <>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="login-confirm-icon">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
                <h2>Check your email</h2>
                <p>We sent a 6-digit code to <strong>{form.email}</strong>. Enter it below to continue.</p>
                <div className="otp-inputs" onPaste={handleOtpPaste}>
                  {otp.map((digit, i) => (
                    <input
                      key={i}
                      id={`otp-${i}`}
                      className="otp-box"
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleOtpChange(i, e.target.value)}
                      onKeyDown={(e) => handleOtpKeyDown(i, e)}
                      autoFocus={i === 0}
                    />
                  ))}
                </div>
                {error && <p className="login-error"><WarningIcon /> {error}</p>}
                <button className="login-submit" onClick={handleVerifyRecoveryCode} disabled={loading}>
                  {loading ? "Verifying…" : "Verify Code"}
                </button>
                <button className="login-text-btn" onClick={() => switchMode("login")}>
                  Back to Sign In
                </button>
              </>
            )}

            {forgotStep === "newPassword" && (
              <>
                <h2>Choose a new password</h2>
                <p>Your code is verified — set a new password below.</p>
                <form className="login-form" onSubmit={handleSetNewPassword} noValidate>
                  <div className="form-group">
                    <label htmlFor="new-password">New password</label>
                    <input
                      id="new-password"
                      type="password"
                      value={newPw}
                      onChange={(e) => setNewPw(e.target.value)}
                      placeholder="Choose a password"
                      required
                      autoComplete="new-password"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="confirm-new-password">Confirm new password</label>
                    <input
                      id="confirm-new-password"
                      type="password"
                      value={confirmPw}
                      onChange={(e) => setConfirmPw(e.target.value)}
                      placeholder="Repeat your password"
                      required
                      autoComplete="new-password"
                    />
                  </div>
                  {error && <p className="login-error"><WarningIcon /> {error}</p>}
                  <button className="login-submit" type="submit" disabled={loading}>
                    {loading ? "Saving…" : "Save New Password"}
                  </button>
                </form>
              </>
            )}

            {forgotStep === "done" && (
              <>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="login-confirm-icon">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
                <h2>Password updated</h2>
                <p>Your password has been changed. You're now signed in.</p>
                <button className="login-text-btn" onClick={() => switchMode("login")}>
                  Continue
                </button>
              </>
            )}
          </div>
        )}

        {/* Tabs + form — hidden while awaiting email confirmation or password reset */}
        {!confirming && mode !== "forgot" && <><div className="login-tabs">
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
            {mode === "login" && (
              <button type="button" className="login-text-btn login-forgot-link" onClick={() => switchMode("forgot")}>
                Forgot password?
              </button>
            )}
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

          {error && <p className="login-error"><WarningIcon /> {error}</p>}

          <button className="login-submit" type="submit" disabled={loading}>
            {loading ? "Please wait…" : mode === "login" ? "Sign In" : "Create Account"}
          </button>
          {slowWarning && (
            <p style={{ fontSize: "0.8rem", color: "var(--text-muted)", textAlign: "center", marginTop: "0.5rem" }}>
              Still connecting — Supabase may be waking up, please hold on…
            </p>
          )}
        </form></>}

        {!confirming && (
          <div className="login-guest-section">
            <div className="login-guest-divider"><span>or</span></div>
            <button className="login-guest-btn" onClick={loginAsGuest}>
              Continue as Guest
            </button>
            <p className="login-guest-hint">30 cards per deck · no account needed · <strong>sign up free</strong> to unlock everything</p>
          </div>
        )}

        {!confirming && (
          <p className="login-note">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" style={{width:12,height:12,display:"inline",verticalAlign:"middle",marginRight:"0.3rem"}}>
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
            </svg>
            Secured by Supabase
          </p>
        )}
      </div>
    </div>
  );
}
