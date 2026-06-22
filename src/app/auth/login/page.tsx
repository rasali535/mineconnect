"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("admin@khoemacau.com");
  const [password, setPassword] = useState("Debswana2026!");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    // Mock auth — replace with Supabase when credentials are configured
    await new Promise((r) => setTimeout(r, 900));
    if (email && password) {
      let persona = "admin";
      if (email.includes("supplier")) persona = "supplier";
      if (email.includes("applicant")) persona = "applicant";
      if (email.includes("community")) persona = "community";
      
      document.cookie = `debswanaconnect_persona=${persona}; path=/`;
      router.push("/dashboard");
    } else {
      setError("Please enter your email and password.");
      setLoading(false);
    }
  };

  return (
    <div
      className="gradient-mesh"
      style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem" }}
    >
      {/* Glow orbs */}
      <div style={{ position: "fixed", top: "20%", left: "20%", width: 400, height: 400, background: "radial-gradient(circle, rgba(14,165,233,0.12) 0%, transparent 70%)", borderRadius: "50%", pointerEvents: "none" }} />
      <div style={{ position: "fixed", bottom: "20%", right: "20%", width: 300, height: 300, background: "radial-gradient(circle, rgba(245,158,11,0.08) 0%, transparent 70%)", borderRadius: "50%", pointerEvents: "none" }} />

      <div style={{ width: "100%", maxWidth: 440, position: "relative" }}>
        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <Link href="/" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", textDecoration: "none" }}>
            <span style={{ fontSize: "2rem" }}>⛏️</span>
            <span style={{ fontWeight: 800, fontSize: "1.5rem", color: "var(--text-primary)" }}>
              Debswana<span className="gradient-text"> Connect</span>
            </span>
          </Link>
        </div>

        <div className="glass-strong" style={{ borderRadius: "var(--radius-xl)", padding: "2.5rem" }}>
          <h1 style={{ fontSize: "1.5rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: "0.5rem" }}>
            Welcome back
          </h1>
          <p style={{ color: "var(--text-secondary)", fontSize: "0.875rem", marginBottom: "2rem" }}>
            Sign in to your Debswana Connect account
          </p>

          {error && (
            <div style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.2)", borderRadius: "var(--radius-sm)", padding: "0.75rem 1rem", marginBottom: "1.25rem", color: "#ef4444", fontSize: "0.875rem" }}>
              {error}
            </div>
          )}

          <div style={{ marginBottom: "1.5rem" }}>
            <p style={{ fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--text-muted)", marginBottom: "0.5rem", fontWeight: 600 }}>Demo Accounts</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
              <button 
                type="button" 
                className="badge badge-neutral" 
                style={{ cursor: "pointer", border: "1px solid var(--border)", background: email === "admin@khoemacau.com" ? "var(--surface-3)" : "var(--surface-2)" }}
                onClick={() => { setEmail("admin@khoemacau.com"); setPassword("Debswana2026!"); }}
              >👑 Admin</button>
              <button 
                type="button" 
                className="badge badge-neutral" 
                style={{ cursor: "pointer", border: "1px solid var(--border)", background: email === "supplier@shafteng.co.za" ? "var(--surface-3)" : "var(--surface-2)" }}
                onClick={() => { setEmail("supplier@shafteng.co.za"); setPassword("Debswana2026!"); }}
              >🏭 Supplier</button>
              <button 
                type="button" 
                className="badge badge-neutral" 
                style={{ cursor: "pointer", border: "1px solid var(--border)", background: email === "applicant@email.com" ? "var(--surface-3)" : "var(--surface-2)" }}
                onClick={() => { setEmail("applicant@email.com"); setPassword("Debswana2026!"); }}
              >👷 Applicant</button>
              <button 
                type="button" 
                className="badge badge-neutral" 
                style={{ cursor: "pointer", border: "1px solid var(--border)", background: email === "community@rustenburg.gov.za" ? "var(--surface-3)" : "var(--surface-2)" }}
                onClick={() => { setEmail("community@rustenburg.gov.za"); setPassword("Debswana2026!"); }}
              >🤝 Community</button>
            </div>
          </div>

          <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            <div>
              <label className="label">Email address</label>
              <input
                type="email"
                className="input"
                placeholder="you@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                id="email"
              />
            </div>
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.375rem" }}>
                <label className="label" style={{ marginBottom: 0 }}>Password</label>
                <a href="#" style={{ fontSize: "0.8125rem", color: "var(--brand-400)", textDecoration: "none" }}>Forgot password?</a>
              </div>
              <input
                type="password"
                className="input"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                id="password"
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary"
              id="login-btn"
              style={{ width: "100%", justifyContent: "center", marginTop: "0.5rem" }}
              disabled={loading}
            >
              {loading ? (
                <>
                  <svg style={{ animation: "spin 1s linear infinite" }} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 12a9 9 0 11-6.219-8.56"/></svg>
                  Signing in…
                </>
              ) : (
                "Sign in"
              )}
            </button>
          </form>

          <div className="divider" style={{ margin: "1.5rem 0" }}>
            <div style={{ position: "relative", textAlign: "center" }}>
              <span style={{ position: "absolute", top: -9, left: "50%", transform: "translateX(-50%)", background: "rgba(15,22,41,0.85)", padding: "0 0.75rem", fontSize: "0.8125rem", color: "var(--text-muted)" }}>
                or continue with
              </span>
            </div>
          </div>

          <button
            className="btn btn-secondary"
            style={{ width: "100%", justifyContent: "center" }}
            onClick={() => router.push("/dashboard")}
          >
            <svg width="18" height="18" viewBox="0 0 48 48"><path fill="#4285F4" d="M43.6 20H24v8h11.3C33.9 32.9 29.4 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3 0 5.8 1.1 7.9 3l5.7-5.7C34 6.5 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20c11 0 19.7-8 19.7-20 0-1.3-.1-2.7-.1-4z"/></svg>
            Continue with Google
          </button>

          <p style={{ textAlign: "center", marginTop: "1.75rem", fontSize: "0.875rem", color: "var(--text-secondary)" }}>
            Need access? Contact your system administrator.
          </p>
        </div>
      </div>
    </div>
  );
}
