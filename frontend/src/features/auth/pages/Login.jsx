import { useState } from "react";

const EyeIcon = ({ open }) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    {open ? (
      <>
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
        <circle cx="12" cy="12" r="3" />
      </>
    ) : (
      <>
        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
        <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
        <line x1="1" y1="1" x2="23" y2="23" />
      </>
    )}
  </svg>
);

const GoogleIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24">
    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
  </svg>
);

const GithubIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);
  const [emailFocused, setEmailFocused] = useState(false);
  const [passFocused, setPassFocused] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => setLoading(false), 2000);
  };

  const inputStyle = (focused) => ({
    width: "100%",
    background: "rgba(255,255,255,0.07)",
    border: `1px solid ${focused ? "rgba(139,92,246,0.7)" : "rgba(255,255,255,0.12)"}`,
    borderRadius: 12,
    padding: "12px 16px",
    color: "#ffffff",
    fontSize: 14,
    outline: "none",
    boxSizing: "border-box",
    boxShadow: focused ? "0 0 0 3px rgba(139,92,246,0.18)" : "none",
    transition: "all 0.2s",
  });

  return (
    <div style={{
      minHeight: "100vh",
      background: "#0b0b12",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: 24,
      fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
      position: "relative",
      overflow: "hidden",
    }}>
      {/* Ambient glows */}
      <div style={{ position: "absolute", top: "-10%", left: "-5%", width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle, rgba(124,58,237,0.18) 0%, transparent 70%)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: "-10%", right: "-5%", width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle, rgba(99,102,241,0.14) 0%, transparent 70%)", pointerEvents: "none" }} />

      <div style={{ position: "relative", width: "100%", maxWidth: 420 }}>
        <div style={{
          background: "rgba(255,255,255,0.04)",
          border: "1px solid rgba(255,255,255,0.1)",
          borderRadius: 20,
          padding: "36px 32px 32px",
        }}>

          {/* Logo */}
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 28 }}>
            <div style={{
              width: 38, height: 38, borderRadius: 10,
              background: "linear-gradient(135deg, #7c3aed, #4338ca)",
              display: "flex", alignItems: "center", justifyContent: "center",
              boxShadow: "0 4px 16px rgba(124,58,237,0.4)",
            }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M12 2L2 7l10 5 10-5-10-5z" fill="white" />
                <path d="M2 17l10 5 10-5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M2 12l10 5 10-5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <span style={{ color: "#ffffff", fontWeight: 700, fontSize: 18, letterSpacing: "-0.3px" }}>Nucleus</span>
          </div>

          {/* Heading */}
          <h1 style={{ color: "#ffffff", fontSize: 26, fontWeight: 700, margin: "0 0 6px", letterSpacing: "-0.5px" }}>Welcome back</h1>
          <p style={{ color: "rgba(255,255,255,0.45)", fontSize: 14, margin: "0 0 28px", fontWeight: 400 }}>Sign in to continue to your workspace</p>

          {/* Social buttons */}
          <div style={{ display: "flex", gap: 10, marginBottom: 22 }}>
            {[
              { icon: <GoogleIcon />, label: "Google" },
              { icon: <GithubIcon />, label: "GitHub" },
            ].map(({ icon, label }) => (
              <button key={label} style={{
                flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                padding: "10px 14px", borderRadius: 12,
                border: "1px solid rgba(255,255,255,0.1)",
                background: "rgba(255,255,255,0.05)",
                color: "rgba(255,255,255,0.8)", fontSize: 13.5, fontWeight: 500,
                cursor: "pointer",
              }}>
                {icon} {label}
              </button>
            ))}
          </div>

          {/* Divider */}
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 22 }}>
            <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.08)" }} />
            <span style={{ color: "rgba(255,255,255,0.3)", fontSize: 11, fontWeight: 500, letterSpacing: "0.08em", textTransform: "uppercase" }}>or</span>
            <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.08)" }} />
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit}>

            {/* Email */}
            <div style={{ marginBottom: 16 }}>
              <label style={{ display: "block", color: "rgba(255,255,255,0.55)", fontSize: 11, fontWeight: 600, letterSpacing: "0.07em", textTransform: "uppercase", marginBottom: 7 }}>
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                onFocus={() => setEmailFocused(true)}
                onBlur={() => setEmailFocused(false)}
                placeholder="you@example.com"
                style={inputStyle(emailFocused)}
              />
            </div>

            {/* Password */}
            <div style={{ marginBottom: 16 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 7 }}>
                <label style={{ color: "rgba(255,255,255,0.55)", fontSize: 11, fontWeight: 600, letterSpacing: "0.07em", textTransform: "uppercase" }}>
                  Password
                </label>
                <a href="#" style={{ color: "#a78bfa", fontSize: 12, textDecoration: "none", fontWeight: 500 }}>Forgot password?</a>
              </div>
              <div style={{ position: "relative" }}>
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  onFocus={() => setPassFocused(true)}
                  onBlur={() => setPassFocused(false)}
                  placeholder="••••••••"
                  style={{ ...inputStyle(passFocused), paddingRight: 44 }}
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} style={{
                  position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)",
                  background: "none", border: "none", color: "rgba(255,255,255,0.4)",
                  cursor: "pointer", padding: 2, display: "flex", alignItems: "center",
                }}>
                  <EyeIcon open={showPassword} />
                </button>
              </div>
            </div>

            {/* Remember me */}
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 22 }}>
              <div onClick={() => setRemember(!remember)} style={{
                width: 18, height: 18, borderRadius: 5, flexShrink: 0,
                border: `1.5px solid ${remember ? "#7c3aed" : "rgba(255,255,255,0.2)"}`,
                background: remember ? "#7c3aed" : "rgba(255,255,255,0.05)",
                display: "flex", alignItems: "center", justifyContent: "center",
                cursor: "pointer", transition: "all 0.2s",
                boxShadow: remember ? "0 0 10px rgba(124,58,237,0.45)" : "none",
              }}>
                {remember && (
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                    <path d="M2 5l2.5 2.5 3.5-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </div>
              <span style={{ color: "rgba(255,255,255,0.45)", fontSize: 13.5, userSelect: "none" }}>Keep me signed in</span>
            </div>

            {/* Submit */}
            <button type="submit" disabled={loading} style={{
              width: "100%", padding: "13px 20px", borderRadius: 12, border: "none",
              background: "linear-gradient(135deg, #7c3aed, #4338ca)",
              color: "#ffffff", fontSize: 14, fontWeight: 600, cursor: "pointer",
              boxShadow: "0 4px 20px rgba(124,58,237,0.4)",
              display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
              opacity: loading ? 0.8 : 1,
            }}>
              {loading ? (
                <>
                  <svg style={{ animation: "spin 1s linear infinite" }} width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" stroke="rgba(255,255,255,0.3)" strokeWidth="4" />
                    <path fill="white" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Signing in...
                </>
              ) : (
                <>
                  Sign in
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </>
              )}
            </button>
          </form>

          <p style={{ textAlign: "center", color: "rgba(255,255,255,0.35)", fontSize: 13, marginTop: 22 }}>
            Don't have an account?{" "}
            <a href="/register" style={{ color: "#a78bfa", textDecoration: "none", fontWeight: 500 }}>Create one free</a>
          </p>
        </div>

        <p style={{ textAlign: "center", color: "rgba(255,255,255,0.15)", fontSize: 11, marginTop: 18 }}>
          Protected by 256-bit encryption · SOC 2 certified
        </p>
      </div>

      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        input::placeholder { color: rgba(255,255,255,0.22) !important; }
        input:-webkit-autofill { -webkit-box-shadow: 0 0 0 100px #1a1030 inset !important; -webkit-text-fill-color: #fff !important; }
      `}</style>
    </div>
  );
}