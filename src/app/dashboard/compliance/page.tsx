"use client";

import { useState } from "react";

const contractors = [
  { id: "CON-001", name: "TunnelTech Contractors", type: "Civils", expiry: "2026-08-15", sheq: true, iso: true, permits: true, env: false, status: "Compliant", score: 94 },
  { id: "CON-002", name: "DrillMaster Inc", type: "Drilling", expiry: "2026-07-01", sheq: true, iso: false, permits: true, env: true, status: "Warning", score: 71 },
  { id: "CON-003", name: "BlastPro Solutions", type: "Blasting", expiry: "2027-01-20", sheq: true, iso: true, permits: true, env: true, status: "Compliant", score: 98 },
  { id: "CON-004", name: "SafeRoute Logistics", type: "Transport", expiry: "2026-06-30", sheq: false, iso: false, permits: true, env: false, status: "Non-Compliant", score: 42 },
  { id: "CON-005", name: "SteelCraft Fabricators", type: "Engineering", expiry: "2026-12-10", sheq: true, iso: true, permits: false, env: true, status: "Warning", score: 78 },
];

const checkColors: Record<string, string> = {
  Compliant: "badge-success",
  Warning: "badge-warning",
  "Non-Compliant": "badge-danger",
};

function ScoreBar({ score }: { score: number }) {
  const color = score >= 85 ? "var(--success)" : score >= 60 ? "var(--warning)" : "var(--danger)";
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "0.625rem" }}>
      <div className="progress-bar" style={{ flex: 1 }}>
        <div style={{ height: "100%", borderRadius: 999, width: `${score}%`, background: `linear-gradient(90deg, ${color}99, ${color})`, transition: "width 0.6s" }} />
      </div>
      <span style={{ fontSize: "0.8125rem", fontWeight: 700, color, minWidth: 32 }}>{score}%</span>
    </div>
  );
}

function Check({ ok }: { ok: boolean }) {
  return (
    <span style={{ fontSize: "1rem" }}>{ok ? "✅" : "❌"}</span>
  );
}

export default function CompliancePage() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const statuses = ["All", "Compliant", "Warning", "Non-Compliant"];
  const filtered = contractors.filter(
    (c) =>
      (filter === "All" || c.status === filter) &&
      (search === "" || c.name.toLowerCase().includes(search.toLowerCase()))
  );

  const counts = {
    Compliant: contractors.filter((c) => c.status === "Compliant").length,
    Warning: contractors.filter((c) => c.status === "Warning").length,
    "Non-Compliant": contractors.filter((c) => c.status === "Non-Compliant").length,
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      <div>
        <h1 style={{ fontSize: "1.5rem", fontWeight: 800, color: "var(--text-primary)" }}>Contractor Compliance</h1>
        <p style={{ color: "var(--text-secondary)", fontSize: "0.875rem", marginTop: "0.25rem" }}>
          Monitor SHEQ, ISO, permits, and environmental licences across all contractors
        </p>
      </div>

      {/* Status Summary */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1rem" }}>
        {[
          { label: "Compliant", count: counts.Compliant, color: "var(--success)", bg: "rgba(34,197,94,0.08)", border: "rgba(34,197,94,0.2)" },
          { label: "Warning", count: counts.Warning, color: "var(--warning)", bg: "rgba(245,158,11,0.08)", border: "rgba(245,158,11,0.2)" },
          { label: "Non-Compliant", count: counts["Non-Compliant"], color: "var(--danger)", bg: "rgba(239,68,68,0.08)", border: "rgba(239,68,68,0.2)" },
        ].map((s) => (
          <div key={s.label} style={{ background: s.bg, border: `1px solid ${s.border}`, borderRadius: "var(--radius)", padding: "1.25rem" }}>
            <div style={{ fontSize: "2rem", fontWeight: 800, color: s.color }}>{s.count}</div>
            <div style={{ fontSize: "0.875rem", color: "var(--text-secondary)", marginTop: "0.25rem" }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
        <div style={{ position: "relative", flex: "1 1 240px" }}>
          <input className="input" placeholder="Search contractors…" value={search} onChange={(e) => setSearch(e.target.value)} style={{ paddingLeft: "2.25rem" }} />
          <svg style={{ position: "absolute", left: "0.75rem", top: "50%", transform: "translateY(-50%)", opacity: 0.5 }} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
        </div>
        {statuses.map((s) => (
          <button key={s} className={`btn btn-sm ${filter === s ? "btn-primary" : "btn-secondary"}`} onClick={() => setFilter(s)}>{s}</button>
        ))}
        <button className="btn btn-secondary btn-sm" style={{ marginLeft: "auto" }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3"/></svg>
          Export Report
        </button>
      </div>

      {/* Table */}
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Contractor</th>
              <th>Type</th>
              <th>SHEQ</th>
              <th>ISO 45001</th>
              <th>Permits</th>
              <th>Environmental</th>
              <th>Licence Expiry</th>
              <th>Compliance Score</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((c) => (
              <tr key={c.id}>
                <td>
                  <div style={{ fontWeight: 600, color: "var(--text-primary)" }}>{c.name}</div>
                  <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>{c.id}</div>
                </td>
                <td><span className="badge badge-neutral">{c.type}</span></td>
                <td><Check ok={c.sheq} /></td>
                <td><Check ok={c.iso} /></td>
                <td><Check ok={c.permits} /></td>
                <td><Check ok={c.env} /></td>
                <td style={{ fontSize: "0.875rem", color: new Date(c.expiry) < new Date() ? "var(--danger)" : "var(--text-secondary)" }}>
                  {new Date(c.expiry).toLocaleDateString("en-ZA", { day: "2-digit", month: "short", year: "numeric" })}
                </td>
                <td style={{ minWidth: 160 }}><ScoreBar score={c.score} /></td>
                <td><span className={`badge ${checkColors[c.status]}`}>{c.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
