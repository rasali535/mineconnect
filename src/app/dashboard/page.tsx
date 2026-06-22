import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";

export default async function DashboardPage() {
  const supabase = await createClient();

  // Fetch real KPI data
  const [
    { count: suppliersCount },
    { count: contractorsCount },
    { count: compliantContractors },
    { count: jobsCount },
    { count: communityCount },
  ] = await Promise.all([
    supabase.from("suppliers").select("*", { count: "exact", head: true }).in('status', ['Active', 'Approved', 'Pending', 'Under Review']),
    supabase.from("contractors").select("*", { count: "exact", head: true }),
    supabase.from("contractors").select("*", { count: "exact", head: true }).eq('status', 'Compliant'),
    supabase.from("jobs").select("*", { count: "exact", head: true }).eq('status', 'Active'),
    supabase.from("community_requests").select("*", { count: "exact", head: true }).in('status', ['Submitted', 'Reviewing']),
  ]);

  const complianceRate = contractorsCount ? Math.round((compliantContractors! / contractorsCount!) * 100) : 0;

  const cookieStore = await cookies();
  const persona = cookieStore.get("debswanaconnect_persona")?.value || "admin";

  let kpis = [];
  let quickLinks = [];
  let dashboardTitle = "Executive Dashboard";

  if (persona === "supplier") {
    dashboardTitle = "Supplier Portal";
    kpis = [
      { label: "Active Contracts", value: 2, delta: "in progress", trend: "up", icon: "📄", color: "var(--brand-400)" },
      { label: "Compliance Status", value: "Valid", delta: "expires 2026", trend: "up", icon: "✅", color: "var(--success)" },
      { label: "Pending Invoices", value: "R 245K", delta: "awaiting payment", trend: "neutral", icon: "💰", color: "var(--gold-400)" },
    ];
    quickLinks = [
      { href: "/dashboard/suppliers", icon: "🏭", label: "My Contracts" },
      { href: "/dashboard/compliance", icon: "📋", label: "Compliance Certificates" },
    ];
  } else if (persona === "applicant") {
    dashboardTitle = "Applicant Portal";
    kpis = [
      { label: "Active Applications", value: 1, delta: "Screening phase", trend: "up", icon: "📄", color: "var(--brand-400)" },
      { label: "Profile Match", value: "81%", delta: "for Mine Surveyor", trend: "up", icon: "🎯", color: "var(--success)" },
    ];
    quickLinks = [
      { href: "/dashboard/recruitment", icon: "👷", label: "My Applications" },
    ];
  } else if (persona === "community") {
    dashboardTitle = "Community Partner Dashboard";
    kpis = [
      { label: "Active Projects", value: 3, delta: "funded", trend: "up", icon: "🏗️", color: "var(--brand-400)" },
      { label: "Pending Requests", value: communityCount || 0, delta: "awaiting review", trend: "neutral", icon: "🤝", color: "#a78bfa" },
      { label: "ESG Score", value: "A-", delta: "improving", trend: "up", icon: "🌱", color: "var(--success)" },
    ];
    quickLinks = [
      { href: "/dashboard/community", icon: "🤝", label: "Community Impact Hub" },
      { href: "/dashboard/esg", icon: "🌱", label: "Sustainability KPIs" },
    ];
  } else {
    // Admin
    kpis = [
      { label: "Active Suppliers", value: suppliersCount || 0, delta: "vs last month", trend: "up", icon: "🏭", color: "var(--brand-400)" },
      { label: "Compliance Rate", value: `${complianceRate}%`, delta: "vs last quarter", trend: complianceRate > 80 ? "up" : "down", icon: "✅", color: complianceRate > 80 ? "var(--success)" : "var(--warning)" },
      { label: "Open Vacancies", value: jobsCount || 0, delta: "currently active", trend: "neutral", icon: "👷", color: "var(--gold-400)" },
      { label: "Pending Community Requests", value: communityCount || 0, delta: "awaiting review", trend: "neutral", icon: "🤝", color: "#a78bfa" },
    ];
    quickLinks = [
      { href: "/dashboard/suppliers", icon: "🏭", label: "Supplier Network" },
      { href: "/dashboard/compliance", icon: "📋", label: "Compliance & Safety Hub" },
      { href: "/dashboard/recruitment", icon: "👷", label: "Careers & Talent Portal" },
      { href: "/dashboard/community", icon: "🤝", label: "Community Impact Hub" },
      { href: "/dashboard/ai", icon: "🤖", label: "Intelligence Assistant" },
    ];
  }

  const recentActivity = [
    { time: "Just now", action: "System Update", detail: "Debswana Connect MVP Initialized", type: "info" },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.75rem" }}>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "1rem" }}>
        <div>
          <h1 style={{ fontSize: "1.625rem", fontWeight: 800, color: "var(--text-primary)" }}>{dashboardTitle}</h1>
          <p style={{ color: "var(--text-secondary)", fontSize: "0.875rem", marginTop: "0.25rem" }}>
            Good morning. Here's your operations overview.
          </p>
        </div>
        <div style={{ display: "flex", gap: "0.75rem" }}>
          <select className="input select" style={{ width: 160 }} defaultValue="This Month">
            <option value="This Month">This Month</option>
            <option value="This Quarter">This Quarter</option>
            <option value="This Year">This Year</option>
          </select>
          <button className="btn btn-primary btn-sm" style={{ background: "var(--brand-500)", border: "none", color: "white" }}>
            Export
          </button>
        </div>
      </div>

      {/* KPI Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: "1rem" }}>
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

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>
        {/* Quick Links */}
        <div className="card" style={{ padding: "1.5rem" }}>
          <h2 style={{ fontSize: "1rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: "1.25rem" }}>Quick Access</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.625rem" }}>
            {quickLinks.map((q) => (
              <Link
                key={q.href}
                href={q.href}
                style={{ display: "flex", alignItems: "center", gap: "0.75rem", padding: "0.75rem", background: "var(--surface-2)", borderRadius: "var(--radius-sm)", textDecoration: "none", color: "var(--text-secondary)", fontSize: "0.875rem", fontWeight: 500, border: "1px solid var(--border)", transition: "all 0.15s ease" }}
              >
                <span>{q.icon}</span>
                {q.label}
                <span style={{ marginLeft: "auto", opacity: 0.5 }}>→</span>
              </Link>
            ))}
          </div>
        </div>

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
      </div>
    </div>
  );
}
