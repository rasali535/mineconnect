"use client";

import Link from "next/link";

const kpis = [
  { label: "Active Suppliers", value: "342", delta: "+12 this month", trend: "up", icon: "🏭", color: "var(--brand-400)" },
  { label: "Compliance Rate", value: "97.4%", delta: "+1.2% vs last quarter", trend: "up", icon: "✅", color: "var(--success)" },
  { label: "Open Vacancies", value: "28", delta: "6 closing this week", trend: "neutral", icon: "👷", color: "var(--gold-400)" },
  { label: "Community Projects", value: "14", delta: "3 milestones due", trend: "neutral", icon: "🤝", color: "#a78bfa" },
  { label: "Contracts Value", value: "R1.8B", delta: "+R220M YTD", trend: "up", icon: "💰", color: "var(--brand-300)" },
  { label: "Risk Alerts", value: "5", delta: "2 critical, 3 medium", trend: "down", icon: "⚠️", color: "var(--danger)" },
];

const recentActivity = [
  { time: "2 min ago", action: "Supplier onboarded", detail: "Shaft Engineering (Pty) Ltd — BBBEE Level 2", type: "success" },
  { time: "14 min ago", action: "Compliance expiry", detail: "TunnelTech Contractors — ISO 45001 expires in 7 days", type: "warning" },
  { time: "1 hr ago", action: "New application", detail: "Senior Mine Surveyor position — 12 applicants", type: "info" },
  { time: "3 hrs ago", action: "Community milestone", detail: "Limpopo Youth Skills Programme — Phase 1 complete", type: "success" },
  { time: "5 hrs ago", action: "Risk flag", detail: "DrillMaster Inc — Outstanding SARS compliance certificate", type: "danger" },
];

const complianceModules = [
  { name: "SHEQ Documentation", pct: 94, color: "var(--success)" },
  { name: "B-BBEE Certifications", pct: 88, color: "var(--brand-400)" },
  { name: "Safety Permits", pct: 99, color: "var(--success)" },
  { name: "Environmental Licences", pct: 76, color: "var(--warning)" },
];

export default function DashboardPage() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.75rem" }}>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "1rem" }}>
        <div>
          <h1 style={{ fontSize: "1.625rem", fontWeight: 800, color: "var(--text-primary)" }}>Executive Dashboard</h1>
          <p style={{ color: "var(--text-secondary)", fontSize: "0.875rem", marginTop: "0.25rem" }}>
            Good morning, James. Here's your operations overview.
          </p>
        </div>
        <div style={{ display: "flex", gap: "0.75rem" }}>
          <select className="input select" style={{ width: 160 }}>
            <option>This Month</option>
            <option>This Quarter</option>
            <option>This Year</option>
          </select>
          <button className="btn btn-primary btn-sm">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3"/></svg>
            Export
          </button>
        </div>
      </div>

      {/* KPI Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: "1rem" }}>
        {kpis.map((k, i) => (
          <div
            key={k.label}
            className="stat-card animate-fade-in-up"
            style={{ animationDelay: `${i * 0.05}s` }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.875rem" }}>
              <span style={{ fontSize: "1.5rem" }}>{k.icon}</span>
              <span
                className="badge"
                style={{ background: k.trend === "up" ? "rgba(34,197,94,0.1)" : k.trend === "down" ? "rgba(239,68,68,0.1)" : "rgba(148,163,184,0.1)", color: k.trend === "up" ? "var(--success)" : k.trend === "down" ? "var(--danger)" : "var(--text-muted)", border: "none" }}
              >
                {k.trend === "up" ? "▲" : k.trend === "down" ? "▼" : "→"}
              </span>
            </div>
            <div style={{ fontSize: "2rem", fontWeight: 800, color: k.color, lineHeight: 1, marginBottom: "0.375rem" }}>
              {k.value}
            </div>
            <div style={{ fontSize: "0.8125rem", fontWeight: 600, color: "var(--text-primary)", marginBottom: "0.25rem" }}>{k.label}</div>
            <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>{k.delta}</div>
          </div>
        ))}
      </div>

      {/* Charts Row */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>
        {/* Compliance Breakdown */}
        <div className="card" style={{ padding: "1.5rem" }}>
          <h2 style={{ fontSize: "1rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: "1.25rem" }}>Compliance Overview</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {complianceModules.map((m) => (
              <div key={m.name}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.375rem" }}>
                  <span style={{ fontSize: "0.875rem", color: "var(--text-secondary)" }}>{m.name}</span>
                  <span style={{ fontSize: "0.875rem", fontWeight: 600, color: m.color }}>{m.pct}%</span>
                </div>
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: `${m.pct}%`, background: `linear-gradient(90deg, ${m.color}99, ${m.color})` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Supplier Categories */}
        <div className="card" style={{ padding: "1.5rem" }}>
          <h2 style={{ fontSize: "1rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: "1.25rem" }}>Supplier Categories</h2>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.875rem" }}>
            {[
              { name: "Engineering", count: 98, color: "var(--brand-400)" },
              { name: "Equipment", count: 74, color: "var(--gold-400)" },
              { name: "Explosives", count: 23, color: "#f87171" },
              { name: "Transport", count: 52, color: "#34d399" },
              { name: "IT & Tech", count: 41, color: "#a78bfa" },
              { name: "Catering", count: 54, color: "#fb923c" },
            ].map((cat) => (
              <div key={cat.name} style={{ background: "var(--surface-2)", borderRadius: "var(--radius-sm)", padding: "0.875rem", border: "1px solid var(--border)" }}>
                <div style={{ fontSize: "1.5rem", fontWeight: 800, color: cat.color }}>{cat.count}</div>
                <div style={{ fontSize: "0.8125rem", color: "var(--text-secondary)", marginTop: "0.25rem" }}>{cat.name}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Activity + Quick Links */}
      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "1.5rem" }}>
        {/* Activity Feed */}
        <div className="card" style={{ padding: "1.5rem" }}>
          <h2 style={{ fontSize: "1rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: "1.25rem" }}>Recent Activity</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
            {recentActivity.map((a, i) => (
              <div
                key={i}
                style={{ display: "flex", gap: "0.875rem", padding: "0.875rem 0", borderBottom: i < recentActivity.length - 1 ? "1px solid var(--border)" : "none" }}
              >
                <div style={{ width: 8, height: 8, borderRadius: "50%", marginTop: 6, flexShrink: 0, background: a.type === "success" ? "var(--success)" : a.type === "warning" ? "var(--warning)" : a.type === "danger" ? "var(--danger)" : "var(--info)" }} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: "flex", gap: "0.5rem", alignItems: "baseline", flexWrap: "wrap" }}>
                    <span style={{ fontSize: "0.875rem", fontWeight: 600, color: "var(--text-primary)" }}>{a.action}</span>
                    <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>{a.time}</span>
                  </div>
                  <p style={{ fontSize: "0.8125rem", color: "var(--text-secondary)", marginTop: "0.125rem" }}>{a.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div className="card" style={{ padding: "1.5rem" }}>
          <h2 style={{ fontSize: "1rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: "1.25rem" }}>Quick Access</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.625rem" }}>
            {[
              { href: "/dashboard/suppliers", icon: "🏭", label: "Add Supplier" },
              { href: "/dashboard/compliance", icon: "📋", label: "Run Compliance Check" },
              { href: "/dashboard/recruitment", icon: "👷", label: "Post Job" },
              { href: "/dashboard/community", icon: "🤝", label: "New CSI Project" },
              { href: "/dashboard/ai", icon: "🤖", label: "Ask MineIQ" },
            ].map((q) => (
              <Link
                key={q.href}
                href={q.href}
                style={{ display: "flex", alignItems: "center", gap: "0.75rem", padding: "0.75rem", background: "var(--surface-2)", borderRadius: "var(--radius-sm)", textDecoration: "none", color: "var(--text-secondary)", fontSize: "0.875rem", fontWeight: 500, border: "1px solid var(--border)", transition: "all 0.15s ease" }}
              >
                <span>{q.icon}</span>
                {q.label}
                <svg style={{ marginLeft: "auto", opacity: 0.5 }} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
