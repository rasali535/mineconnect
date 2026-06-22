"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

const stats = [
  { value: "2,400+", label: "Mining Suppliers" },
  { value: "18,000+", label: "Active Workers" },
  { value: "R4.2B", label: "Contracts Managed" },
  { value: "99.7%", label: "Compliance Rate" },
];

const features = [
  {
    icon: "🏭",
    title: "Supplier Management",
    description:
      "Centralise your entire supplier ecosystem. Onboard, evaluate, and manage mining suppliers with automated due diligence.",
  },
  {
    icon: "📋",
    title: "Contractor Compliance",
    description:
      "Stay 100% compliant. Track certifications, SHEQ documentation, permits, and contractor assessments in real time.",
  },
  {
    icon: "👷",
    title: "Recruitment Portal",
    description:
      "Source and onboard skilled mining professionals. Manage job postings, applications, and background verifications seamlessly.",
  },
  {
    icon: "🤝",
    title: "Community Portal",
    description:
      "Foster community partnerships, social investment, and local procurement initiatives aligned with your social licence to operate.",
  },
  {
    icon: "📊",
    title: "Executive Dashboard",
    description:
      "Crystal-clear KPIs and real-time analytics for C-suite decision-making. All critical data in a single pane of glass.",
  },
  {
    icon: "🤖",
    title: "AI Assistant",
    description:
      "Ask KhoemacauIQ anything — contract summaries, compliance alerts, supplier risk scores, and market intelligence at a prompt.",
  },
];

const testimonials = [
  {
    name: "Sarah van der Merwe",
    role: "COO, Platinum Ridge Mining",
    text: "Khoemacau Connect reduced our supplier onboarding time from 6 weeks to 4 days. Our compliance team is finally ahead of the curve.",
    avatar: "SV",
  },
  {
    name: "James Mokoena",
    role: "Procurement Director, GoldVein Resources",
    text: "The AI assistant alone is worth it. It summarises 200-page supplier contracts in seconds and flags every risk clause.",
    avatar: "JM",
  },
  {
    name: "Dr. Anita Pillay",
    role: "HSE Manager, Copper Crest Operations",
    text: "We went from manual spreadsheets to a fully digital compliance system. Zero non-conformances in our last three audits.",
    avatar: "AP",
  },
];

export default function LandingPage() {
  const [scrolled, setScrolled] = useState(false);
  const [activeFeature, setActiveFeature] = useState(0);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => setActiveFeature((p) => (p + 1) % features.length), 3500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="gradient-mesh min-h-screen">
      {/* ─── NAV ─── */}
      <header
        id="nav"
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled ? "glass-strong shadow-lg" : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 h-16">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <span style={{ fontSize: "1.5rem" }}>⛏️</span>
            <span style={{ fontFamily: "var(--font-display, sans-serif)", fontWeight: 800, fontSize: "1.25rem", color: "var(--text-primary)" }}>
              Khoemacau<span className="gradient-text"> Connect</span>
            </span>
          </div>

          {/* Nav Links */}
          <nav className="hidden md:flex items-center gap-6">
            {["Features", "Solutions", "Pricing", "About"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                style={{ color: "var(--text-secondary)", fontSize: "0.875rem", fontWeight: 500, textDecoration: "none", transition: "color 0.2s" }}
                onMouseEnter={(e) => ((e.target as HTMLElement).style.color = "var(--text-primary)")}
                onMouseLeave={(e) => ((e.target as HTMLElement).style.color = "var(--text-secondary)")}
              >
                {item}
              </a>
            ))}
          </nav>

          {/* CTA */}
          <div className="flex items-center gap-3">
            <Link href="/auth/login" className="btn btn-ghost btn-sm">Log in</Link>
            <Link href="/auth/signup" className="btn btn-primary btn-sm">Get Started</Link>
          </div>
        </div>
      </header>

      {/* ─── HERO ─── */}
      <section style={{ paddingTop: "8rem", paddingBottom: "6rem", textAlign: "center", position: "relative", overflow: "hidden" }}>
        {/* Glowing orbs */}
        <div style={{ position: "absolute", top: "10%", left: "15%", width: 400, height: 400, background: "radial-gradient(circle, rgba(14,165,233,0.15) 0%, transparent 70%)", borderRadius: "50%", pointerEvents: "none" }} />
        <div style={{ position: "absolute", top: "20%", right: "10%", width: 300, height: 300, background: "radial-gradient(circle, rgba(245,158,11,0.1) 0%, transparent 70%)", borderRadius: "50%", pointerEvents: "none" }} />

        <div className="max-w-5xl mx-auto px-6 relative">
          <div className="badge badge-info animate-fade-in" style={{ display: "inline-flex", marginBottom: "1.5rem" }}>
            🚀 Now with AI-powered compliance automation
          </div>

          <h1
            className="animate-fade-in-up"
            style={{
              fontFamily: "var(--font-display, sans-serif)",
              fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
              fontWeight: 800,
              lineHeight: 1.1,
              marginBottom: "1.5rem",
              color: "var(--text-primary)",
            }}
          >
            The Operating System
            <br />
            for <span className="gradient-text">Mining Operations</span>
          </h1>

          <p
            className="animate-fade-in-up stagger-1"
            style={{ fontSize: "1.25rem", color: "var(--text-secondary)", maxWidth: 640, margin: "0 auto 2.5rem", lineHeight: 1.7 }}
          >
            Manage suppliers, contractors, compliance, recruitment, and community engagement — all from a single platform built for Africa's mining sector.
          </p>

          <div className="animate-fade-in-up stagger-2" style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/auth/signup" className="btn btn-primary btn-xl">
              Start Free Trial
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </Link>
            <Link href="/dashboard" className="btn btn-secondary btn-xl">
              View Live Demo
            </Link>
          </div>

          <p className="animate-fade-in-up stagger-3" style={{ marginTop: "1rem", fontSize: "0.8125rem", color: "var(--text-muted)" }}>
            No credit card required · Free for 30 days · Cancel anytime
          </p>
        </div>
      </section>

      {/* ─── STATS ─── */}
      <section style={{ padding: "3rem 0", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)", background: "rgba(15,22,41,0.4)" }}>
        <div className="max-w-5xl mx-auto px-6">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: "2rem", textAlign: "center" }}>
            {stats.map((s) => (
              <div key={s.value}>
                <div style={{ fontSize: "2.25rem", fontWeight: 800, background: "linear-gradient(135deg, var(--brand-300), var(--gold-400))", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                  {s.value}
                </div>
                <div style={{ fontSize: "0.875rem", color: "var(--text-secondary)", marginTop: "0.25rem" }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FEATURES ─── */}
      <section id="features" style={{ padding: "6rem 0" }}>
        <div className="max-w-7xl mx-auto px-6">
          <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
            <h2 style={{ fontSize: "clamp(1.75rem, 4vw, 2.75rem)", fontWeight: 800, color: "var(--text-primary)", marginBottom: "1rem" }}>
              Everything mining needs, nothing it doesn't
            </h2>
            <p style={{ color: "var(--text-secondary)", fontSize: "1.0625rem", maxWidth: 560, margin: "0 auto" }}>
              Purpose-built for the challenges of African mining operations — from shaft to board room.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "1.5rem" }}>
            {features.map((f, i) => (
              <div
                key={f.title}
                className={`card card-glow animate-fade-in-up`}
                style={{
                  padding: "1.75rem",
                  cursor: "pointer",
                  animationDelay: `${i * 0.05}s`,
                  border: activeFeature === i ? "1px solid rgba(14,165,233,0.4)" : undefined,
                  boxShadow: activeFeature === i ? "0 0 30px rgba(14,165,233,0.15)" : undefined,
                }}
                onMouseEnter={() => setActiveFeature(i)}
              >
                <div style={{ fontSize: "2rem", marginBottom: "1rem" }}>{f.icon}</div>
                <h3 style={{ fontWeight: 700, fontSize: "1.0625rem", color: "var(--text-primary)", marginBottom: "0.625rem" }}>{f.title}</h3>
                <p style={{ color: "var(--text-secondary)", fontSize: "0.875rem", lineHeight: 1.6 }}>{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── TESTIMONIALS ─── */}
      <section style={{ padding: "5rem 0", background: "rgba(15,22,41,0.5)", borderTop: "1px solid var(--border)" }}>
        <div className="max-w-6xl mx-auto px-6">
          <h2 style={{ textAlign: "center", fontSize: "clamp(1.5rem, 3vw, 2.25rem)", fontWeight: 800, color: "var(--text-primary)", marginBottom: "3rem" }}>
            Trusted by leading mining operations
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "1.5rem" }}>
            {testimonials.map((t) => (
              <div key={t.name} className="card" style={{ padding: "1.75rem" }}>
                <p style={{ color: "var(--text-secondary)", fontSize: "0.9375rem", lineHeight: 1.7, marginBottom: "1.5rem", fontStyle: "italic" }}>
                  &ldquo;{t.text}&rdquo;
                </p>
                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                  <div style={{ width: 40, height: 40, borderRadius: "50%", background: "linear-gradient(135deg, var(--brand-700), var(--brand-500))", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.75rem", fontWeight: 700, color: "white", flexShrink: 0 }}>
                    {t.avatar}
                  </div>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: "0.875rem", color: "var(--text-primary)" }}>{t.name}</div>
                    <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA BANNER ─── */}
      <section style={{ padding: "6rem 0" }}>
        <div className="max-w-3xl mx-auto px-6 text-center">
          <div style={{ background: "linear-gradient(135deg, rgba(14,165,233,0.15), rgba(245,158,11,0.1))", border: "1px solid rgba(14,165,233,0.2)", borderRadius: "1.5rem", padding: "3.5rem 2rem" }}>
            <h2 style={{ fontSize: "clamp(1.75rem, 4vw, 2.5rem)", fontWeight: 800, color: "var(--text-primary)", marginBottom: "1rem" }}>
              Ready to transform your mining operations?
            </h2>
            <p style={{ color: "var(--text-secondary)", fontSize: "1.0625rem", marginBottom: "2rem" }}>
              Join 500+ mining companies already using Khoemacau Connect.
            </p>
            <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
              <Link href="/auth/signup" className="btn btn-gold btn-xl">Start Free Trial</Link>
              <Link href="/dashboard" className="btn btn-secondary btn-xl">View Demo</Link>
            </div>
          </div>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer style={{ borderTop: "1px solid var(--border)", padding: "2rem 0", background: "var(--surface-1)" }}>
        <div className="max-w-7xl mx-auto px-6 flex flex-wrap items-center justify-between gap-4">
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <span style={{ fontSize: "1.25rem" }}>⛏️</span>
            <span style={{ fontWeight: 700, color: "var(--text-primary)" }}>Khoemacau Connect</span>
          </div>
          <p style={{ fontSize: "0.8125rem", color: "var(--text-muted)" }}>
            © 2026 Khoemacau Connect. Built for Africa's mining industry.
          </p>
          <div style={{ display: "flex", gap: "1.5rem" }}>
            {["Privacy", "Terms", "Contact"].map((l) => (
              <a key={l} href="#" style={{ fontSize: "0.8125rem", color: "var(--text-muted)", textDecoration: "none" }}>{l}</a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
