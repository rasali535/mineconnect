"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const [form, setForm] = useState({ name: "", company: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1000));
    router.push("/dashboard");
  };

  return (
    <div
      className="gradient-mesh"
      style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem" }}
    >
      <div style={{ position: "fixed", top: "20%", right: "20%", width: 350, height: 350, background: "radial-gradient(circle, rgba(245,158,11,0.1) 0%, transparent 70%)", borderRadius: "50%", pointerEvents: "none" }} />

      <div style={{ width: "100%", maxWidth: 480, position: "relative" }}>
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <Link href="/" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", textDecoration: "none" }}>
            <span style={{ fontSize: "2rem" }}>⛏️</span>
            <span style={{ fontWeight: 800, fontSize: "1.5rem", color: "var(--text-primary)" }}>
              Mine<span className="gradient-text">Connect</span>
            </span>
          </Link>
        </div>

        <div className="glass-strong" style={{ borderRadius: "var(--radius-xl)", padding: "2.5rem" }}>
          <h1 style={{ fontSize: "1.5rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: "0.5rem" }}>
            Create your account
          </h1>
          <p style={{ color: "var(--text-secondary)", fontSize: "0.875rem", marginBottom: "2rem" }}>
            Free for 30 days. No credit card required.
          </p>

          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.125rem" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
              <div>
                <label className="label">Full name</label>
                <input className="input" type="text" name="name" placeholder="Jane Smith" value={form.name} onChange={handleChange} required />
              </div>
              <div>
                <label className="label">Company</label>
                <input className="input" type="text" name="company" placeholder="Mining Co." value={form.company} onChange={handleChange} required />
              </div>
            </div>
            <div>
              <label className="label" style={{ marginBottom: "0.375rem" }}>Work email</label>
              <input className="input" type="email" name="email" placeholder="jane@company.com" value={form.email} onChange={handleChange} required />
            </div>
            <div>
              <label className="label">Password</label>
              <input className="input" type="password" name="password" placeholder="Minimum 8 characters" value={form.password} onChange={handleChange} required minLength={8} />
            </div>

            <button type="submit" className="btn btn-primary" style={{ width: "100%", justifyContent: "center", marginTop: "0.5rem" }} disabled={loading}>
              {loading ? (
                <>
                  <svg style={{ animation: "spin 1s linear infinite" }} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 12a9 9 0 11-6.219-8.56"/></svg>
                  Creating account…
                </>
              ) : (
                "Create account"
              )}
            </button>
          </form>

          <p style={{ textAlign: "center", marginTop: "1.75rem", fontSize: "0.8125rem", color: "var(--text-muted)" }}>
            By signing up you agree to our{" "}
            <a href="#" style={{ color: "var(--brand-400)" }}>Terms</a> and{" "}
            <a href="#" style={{ color: "var(--brand-400)" }}>Privacy Policy</a>.
          </p>

          <p style={{ textAlign: "center", marginTop: "1rem", fontSize: "0.875rem", color: "var(--text-secondary)" }}>
            Already have an account?{" "}
            <Link href="/auth/login" style={{ color: "var(--brand-400)", textDecoration: "none", fontWeight: 500 }}>Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
