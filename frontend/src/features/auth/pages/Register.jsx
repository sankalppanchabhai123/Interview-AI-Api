import { useState } from "react";

const Eye = ({ open }) => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        {open ? (<><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></>) : (<><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" /><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" /><line x1="1" y1="1" x2="23" y2="23" /></>)}
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

const strengthLabel = ["", "Weak", "Fair", "Good", "Strong"];
const strengthColor = ["", "#ef4444", "#f97316", "#eab308", "#22c55e"];

const getStrength = (pw) => [pw.length >= 8, /[A-Z]/.test(pw), /[0-9]/.test(pw), /[^A-Za-z0-9]/.test(pw)].filter(Boolean).length;

const requirements = [
    { label: "8+ characters", test: (pw) => pw.length >= 8 },
    { label: "Uppercase letter", test: (pw) => /[A-Z]/.test(pw) },
    { label: "Number", test: (pw) => /[0-9]/.test(pw) },
    { label: "Special character", test: (pw) => /[^A-Za-z0-9]/.test(pw) },
];

export default function Register() {
    const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "" });
    const [showPw, setShowPw] = useState(false);
    const [showCf, setShowCf] = useState(false);
    const [focused, setFocused] = useState("");
    const [agreed, setAgreed] = useState(false);
    const [loading, setLoading] = useState(false);
    const [done, setDone] = useState(false);

    const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));
    const strength = getStrength(form.password);
    const match = form.confirm.length > 0 && form.password === form.confirm;
    const mismatch = form.confirm.length > 0 && form.password !== form.confirm;

    const inp = (key, extra = {}) => ({
        width: "100%", background: "rgba(255,255,255,0.07)", borderRadius: 12,
        padding: "11px 16px", color: "#fff", fontSize: 14, outline: "none",
        boxSizing: "border-box", transition: "all 0.2s",
        border: `1px solid ${focused === key ? "rgba(139,92,246,0.7)" : "rgba(255,255,255,0.11)"}`,
        boxShadow: focused === key ? "0 0 0 3px rgba(139,92,246,0.18)" : "none",
        ...extra,
    });

    const focus = (key) => ({ onFocus: () => setFocused(key), onBlur: () => setFocused("") });

    const lbl = { display: "block", color: "rgba(255,255,255,0.5)", fontSize: 11, fontWeight: 600, letterSpacing: "0.07em", textTransform: "uppercase", marginBottom: 7 };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!agreed) return;
        setLoading(true);
        setTimeout(() => { setLoading(false); setDone(true); }, 2000);
    };

    if (done) return (
        <div style={{ minHeight: "100vh", background: "#0b0b12", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Inter', system-ui, sans-serif" }}>
            <div style={{ textAlign: "center", maxWidth: 340, padding: 24 }}>
                <div style={{ width: 72, height: 72, borderRadius: "50%", background: "linear-gradient(135deg, #7c3aed, #4338ca)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px", boxShadow: "0 0 40px rgba(124,58,237,0.4)" }}>
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5" /></svg>
                </div>
                <h2 style={{ color: "#fff", fontSize: 24, fontWeight: 700, margin: "0 0 10px" }}>Account created!</h2>
                <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 14, lineHeight: 1.6, margin: "0 0 28px" }}>Welcome aboard! Check your inbox to verify your email before signing in.</p>
                <button onClick={() => setDone(false)} style={{ padding: "11px 28px", borderRadius: 12, border: "none", background: "linear-gradient(135deg, #7c3aed, #4338ca)", color: "#fff", fontSize: 14, fontWeight: 600, cursor: "pointer" }}>Go to Login</button>
            </div>
        </div>
    );

    return (
        <div style={{ minHeight: "100vh", background: "#0b0b12", display: "flex", alignItems: "center", justifyContent: "center", padding: 24, fontFamily: "'Inter', system-ui, sans-serif", position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", top: "-15%", right: "-5%", width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle, rgba(124,58,237,0.16) 0%, transparent 70%)", pointerEvents: "none" }} />
            <div style={{ position: "absolute", bottom: "-10%", left: "-5%", width: 420, height: 420, borderRadius: "50%", background: "radial-gradient(circle, rgba(79,70,229,0.13) 0%, transparent 70%)", pointerEvents: "none" }} />

            <div style={{ position: "relative", width: "100%", maxWidth: 440 }}>
                <div style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 20, padding: "36px 32px 32px" }}>

                    {/* Logo */}
                    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 26 }}>
                        <div style={{ width: 38, height: 38, borderRadius: 10, background: "linear-gradient(135deg, #7c3aed, #4338ca)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 16px rgba(124,58,237,0.4)" }}>
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                                <path d="M12 2L2 7l10 5 10-5-10-5z" fill="white" />
                                <path d="M2 17l10 5 10-5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M2 12l10 5 10-5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>
                        <span style={{ color: "#fff", fontWeight: 700, fontSize: 18, letterSpacing: "-0.3px" }}>Nucleus</span>
                    </div>

                    <h1 style={{ color: "#fff", fontSize: 25, fontWeight: 700, margin: "0 0 6px", letterSpacing: "-0.5px" }}>Create your account</h1>
                    <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 14, margin: "0 0 26px" }}>Join thousands of teams already using Nucleus</p>

                    {/* Social */}
                    <div style={{ display: "flex", gap: 10, marginBottom: 22 }}>
                        {[{ icon: <GoogleIcon />, label: "Google" }, { icon: <GithubIcon />, label: "GitHub" }].map(({ icon, label }) => (
                            <button key={label} style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 8, padding: "10px 14px", borderRadius: 12, border: "1px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.05)", color: "rgba(255,255,255,0.8)", fontSize: 13.5, fontWeight: 500, cursor: "pointer" }}>
                                {icon} {label}
                            </button>
                        ))}
                    </div>

                    {/* Divider */}
                    <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 22 }}>
                        <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.08)" }} />
                        <span style={{ color: "rgba(255,255,255,0.28)", fontSize: 11, fontWeight: 500, letterSpacing: "0.08em", textTransform: "uppercase" }}>or sign up with email</span>
                        <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.08)" }} />
                    </div>

                    <form onSubmit={handleSubmit}>

                        {/* Name & Email */}
                        {[{ key: "name", label: "Full name", type: "text", placeholder: "Jane Smith" }, { key: "email", label: "Email address", type: "email", placeholder: "you@example.com" }].map(({ key, label, type, placeholder }) => (
                            <div key={key} style={{ marginBottom: 14 }}>
                                <label style={lbl}>{label}</label>
                                <input type={type} value={form[key]} onChange={set(key)} placeholder={placeholder} style={inp(key)} {...focus(key)} />
                            </div>
                        ))}

                        {/* Password */}
                        <div style={{ marginBottom: 14 }}>
                            <label style={lbl}>Password</label>
                            <div style={{ position: "relative" }}>
                                <input type={showPw ? "text" : "password"} value={form.password} onChange={set("password")} placeholder="Min. 8 characters" style={inp("password", { paddingRight: 44 })} {...focus("password")} />
                                <button type="button" onClick={() => setShowPw(!showPw)} style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", color: "rgba(255,255,255,0.4)", cursor: "pointer", display: "flex" }}>
                                    <Eye open={showPw} />
                                </button>
                            </div>
                            {form.password.length > 0 && (
                                <div style={{ marginTop: 10 }}>
                                    <div style={{ display: "flex", gap: 4, marginBottom: 6 }}>
                                        {[1, 2, 3, 4].map(i => <div key={i} style={{ flex: 1, height: 3, borderRadius: 99, background: i <= strength ? strengthColor[strength] : "rgba(255,255,255,0.1)", transition: "background 0.3s" }} />)}
                                    </div>
                                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                                        <span style={{ color: "rgba(255,255,255,0.35)", fontSize: 11 }}>Password strength</span>
                                        <span style={{ color: strengthColor[strength], fontSize: 11, fontWeight: 600 }}>{strengthLabel[strength]}</span>
                                    </div>
                                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4px 12px", marginTop: 10 }}>
                                        {requirements.map(({ label, test }) => {
                                            const pass = test(form.password);
                                            return (
                                                <div key={label} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                                                    <div style={{ width: 14, height: 14, borderRadius: "50%", flexShrink: 0, background: pass ? "#22c55e" : "rgba(255,255,255,0.08)", border: `1px solid ${pass ? "#22c55e" : "rgba(255,255,255,0.15)"}`, display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.2s" }}>
                                                        {pass && <svg width="8" height="8" viewBox="0 0 8 8" fill="none"><path d="M1.5 4l1.8 1.8 3.2-3.6" stroke="white" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" /></svg>}
                                                    </div>
                                                    <span style={{ color: pass ? "rgba(255,255,255,0.6)" : "rgba(255,255,255,0.3)", fontSize: 11 }}>{label}</span>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Confirm Password */}
                        <div style={{ marginBottom: 16 }}>
                            <label style={lbl}>Confirm password</label>
                            <div style={{ position: "relative" }}>
                                <input type={showCf ? "text" : "password"} value={form.confirm} onChange={set("confirm")} placeholder="Repeat your password"
                                    style={inp("confirm", { paddingRight: 44, border: mismatch ? "1px solid rgba(239,68,68,0.6)" : match ? "1px solid rgba(34,197,94,0.6)" : undefined, boxShadow: mismatch ? "0 0 0 3px rgba(239,68,68,0.12)" : match ? "0 0 0 3px rgba(34,197,94,0.12)" : undefined })}
                                    {...focus("confirm")} />
                                <button type="button" onClick={() => setShowCf(!showCf)} style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", color: "rgba(255,255,255,0.4)", cursor: "pointer", display: "flex" }}>
                                    <Eye open={showCf} />
                                </button>
                                {match && <div style={{ position: "absolute", right: 40, top: "50%", transform: "translateY(-50%)", color: "#22c55e" }}><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5" /></svg></div>}
                            </div>
                            {mismatch && <p style={{ color: "#f87171", fontSize: 12, marginTop: 6, marginBottom: 0 }}>Passwords do not match</p>}
                        </div>

                        {/* Terms */}
                        <div style={{ display: "flex", alignItems: "flex-start", gap: 10, marginBottom: 22 }}>
                            <div onClick={() => setAgreed(!agreed)} style={{ width: 18, height: 18, borderRadius: 5, flexShrink: 0, marginTop: 1, border: `1.5px solid ${agreed ? "#7c3aed" : "rgba(255,255,255,0.2)"}`, background: agreed ? "#7c3aed" : "rgba(255,255,255,0.05)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", transition: "all 0.2s", boxShadow: agreed ? "0 0 10px rgba(124,58,237,0.4)" : "none" }}>
                                {agreed && <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M2 5.5l2.5 2.5 4.5-5" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>}
                            </div>
                            <span style={{ color: "rgba(255,255,255,0.4)", fontSize: 13, lineHeight: 1.5 }}>
                                I agree to the <a href="#" style={{ color: "#a78bfa", textDecoration: "none", fontWeight: 500 }}>Terms of Service</a> and <a href="#" style={{ color: "#a78bfa", textDecoration: "none", fontWeight: 500 }}>Privacy Policy</a>
                            </span>
                        </div>

                        {/* Submit */}
                        <button type="submit" disabled={loading || !agreed} style={{ width: "100%", padding: "13px 20px", borderRadius: 12, border: "none", background: agreed ? "linear-gradient(135deg, #7c3aed, #4338ca)" : "rgba(255,255,255,0.07)", color: agreed ? "#fff" : "rgba(255,255,255,0.3)", fontSize: 14, fontWeight: 600, cursor: agreed ? "pointer" : "not-allowed", boxShadow: agreed ? "0 4px 20px rgba(124,58,237,0.35)" : "none", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, transition: "all 0.2s" }}>
                            {loading ? (
                                <><svg style={{ animation: "spin 1s linear infinite" }} width="16" height="16" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="rgba(255,255,255,0.3)" strokeWidth="4" /><path fill="white" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg> Creating account...</>
                            ) : (
                                <>Create account <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg></>
                            )}
                        </button>
                    </form>

                    <p style={{ textAlign: "center", color: "rgba(255,255,255,0.35)", fontSize: 13, marginTop: 22 }}>
                        Already have an account? <a href="/login" style={{ color: "#a78bfa", textDecoration: "none", fontWeight: 500 }}>Sign in</a>
                    </p>
                </div>

                {/* Trust badges */}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 18, marginTop: 18 }}>
                    {["SOC 2 Certified", "256-bit SSL", "GDPR Ready"].map(badge => (
                        <span key={badge} style={{ color: "rgba(255,255,255,0.18)", fontSize: 11, display: "flex", alignItems: "center", gap: 5 }}>
                            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
                            {badge}
                        </span>
                    ))}
                </div>
            </div>

            <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        input::placeholder { color: rgba(255,255,255,0.2) !important; }
        input:-webkit-autofill { -webkit-box-shadow: 0 0 0 100px #1a1030 inset !important; -webkit-text-fill-color: #fff !important; }
      `}</style>
        </div>
    );
}