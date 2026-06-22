"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { contractorsData } from "@/lib/data";
import { useState } from "react";

function Check({ ok }: { ok: boolean }) {
  return (
    <span style={{ fontSize: "1.125rem", display: "flex", alignItems: "center", gap: "0.375rem", color: ok ? "var(--success)" : "var(--danger)" }}>
      {ok ? "✅" : "❌"} <span style={{ fontSize: "0.8125rem", fontWeight: 500 }}>{ok ? "Compliant" : "Non-compliant"}</span>
    </span>
  );
}

function ScoreGauge({ score }: { score: number }) {
  const color = score >= 85 ? "var(--success)" : score >= 60 ? "var(--warning)" : "var(--danger)";
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.5rem" }}>
      <div style={{ position: "relative", width: 120, height: 120 }}>
        <svg viewBox="0 0 120 120" style={{ transform: "rotate(-90deg)", width: 120, height: 120 }}>
          <circle cx="60" cy="60" r="50" fill="none" stroke="var(--surface-3)" strokeWidth="12" />
          <circle cx="60" cy="60" r="50" fill="none" stroke={color} strokeWidth="12"
            strokeDasharray={`${score * 3.14} 314`} strokeLinecap="round" />
        </svg>
        <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column" }}>
          <span style={{ fontSize: "1.75rem", fontWeight: 800, color }}>{score}</span>
          <span style={{ fontSize: "0.6875rem", color: "var(--text-muted)" }}>/ 100</span>
        </div>
      </div>
      <span style={{ fontSize: "0.875rem", color: "var(--text-secondary)" }}>Compliance Score</span>
    </div>
  );
}

export default function ContractorDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const contractor = contractorsData.find((c) => c.id === id);
  const [activeTab, setActiveTab] = useState<"overview" | "documents" | "audits">("overview");
  const [showActionModal, setShowActionModal] = useState<string | null>(null);

  if (!contractor) {
    return (
      <div style={{ textAlign: "center", padding: "4rem 2rem" }}>
        <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>📋</div>
        <h2 style={{ color: "var(--text-primary)", marginBottom: "0.5rem" }}>Contractor not found</h2>
        <p style={{ color: "var(--text-secondary)", marginBottom: "1.5rem" }}>ID "{id}" does not exist.</p>
        <Link href="/dashboard/compliance" className="btn btn-primary">← Back to Compliance</Link>
      </div>
    );
  }

  const statusColors: Record<string, string> = {
    Compliant: "badge-success",
    Warning: "badge-warning",
    "Non-Compliant": "badge-danger",
  };

  const checks = [
    { label: "SHEQ Documentation", ok: contractor.sheq, desc: "Safety, Health, Environment & Quality management system documentation" },
    { label: "ISO 45001:2018", ok: contractor.iso, desc: "Occupational health and safety management system certification" },
    { label: "Mining Permits", ok: contractor.permits, desc: "Valid operating permits for all declared work scopes" },
    { label: "Environmental Licence", ok: contractor.env, desc: "NEMA/EIA compliance and environmental management plan" },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      {/* Breadcrumb */}
      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.875rem", color: "var(--text-muted)" }}>
        <Link href="/dashboard/compliance" style={{ color: "var(--brand-400)", textDecoration: "none" }}>Compliance</Link>
        <span>›</span>
        <span style={{ color: "var(--text-primary)" }}>{contractor.name}</span>
      </div>

      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "1rem" }}>
        <div>
          <h1 style={{ fontSize: "1.5rem", fontWeight: 800, color: "var(--text-primary)", marginBottom: "0.375rem" }}>{contractor.name}</h1>
          <div style={{ display: "flex", gap: "0.625rem", flexWrap: "wrap", alignItems: "center" }}>
            <span className="badge badge-neutral">{contractor.id}</span>
            <span className="badge badge-neutral">{contractor.type}</span>
            <span className={`badge ${statusColors[contractor.status]}`}>{contractor.status}</span>
          </div>
        </div>
        <div style={{ display: "flex", gap: "0.75rem" }}>
          <button className="btn btn-secondary btn-sm" id="run-audit-btn" onClick={() => setShowActionModal("audit")}>Run Audit</button>
          <button className="btn btn-primary btn-sm" id="send-notice-btn" onClick={() => setShowActionModal("notice")}>Send Notice</button>
        </div>
      </div>

      {/* Score + Quick Checks */}
      <div style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: "1.5rem", alignItems: "start" }}>
        <div className="card" style={{ padding: "1.75rem", display: "flex", flexDirection: "column", alignItems: "center" }}>
          <ScoreGauge score={contractor.score} />
          <div style={{ marginTop: "1.25rem", textAlign: "center" }}>
            <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginBottom: "0.25rem" }}>Licence Expiry</div>
            <div style={{ fontWeight: 700, color: new Date(contractor.expiry) < new Date(Date.now() + 30*24*60*60*1000) ? "var(--warning)" : "var(--text-primary)" }}>
              {new Date(contractor.expiry).toLocaleDateString("en-ZA", { day: "2-digit", month: "long", year: "numeric" })}
            </div>
            <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginTop: "0.25rem" }}>{contractor.contact}</div>
            <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>{contractor.phone}</div>
          </div>
        </div>

        <div className="card" style={{ padding: "1.5rem" }}>
          <h3 style={{ fontSize: "0.9375rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: "1.25rem" }}>Compliance Checklist</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {checks.map((c) => (
              <div key={c.label} style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", padding: "0.875rem", background: "var(--surface-2)", borderRadius: "var(--radius-sm)", border: "1px solid var(--border)" }}>
                <div>
                  <div style={{ fontWeight: 600, fontSize: "0.875rem", color: "var(--text-primary)", marginBottom: "0.25rem" }}>{c.label}</div>
                  <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>{c.desc}</div>
                </div>
                <div style={{ flexShrink: 0, marginLeft: "1rem" }}>
                  <Check ok={c.ok} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", gap: 0, borderBottom: "1px solid var(--border)" }}>
        {[
          { key: "overview", label: "Overview" },
          { key: "documents", label: "Documents" },
          { key: "audits", label: "Audit History" },
        ].map((t) => (
          <button
            key={t.key}
            onClick={() => setActiveTab(t.key as typeof activeTab)}
            style={{
              padding: "0.625rem 1.25rem", background: "none", border: "none",
              borderBottom: activeTab === t.key ? "2px solid var(--brand-500)" : "2px solid transparent",
              color: activeTab === t.key ? "var(--brand-400)" : "var(--text-secondary)",
              fontWeight: activeTab === t.key ? 600 : 400, fontSize: "0.875rem", cursor: "pointer",
            }}
          >
            {t.label}
          </button>
        ))}
      </div>

      {activeTab === "overview" && (
        <div className="card" style={{ padding: "1.5rem" }}>
          <h3 style={{ fontSize: "0.9375rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: "1rem" }}>Recommendations</h3>
          {!contractor.sheq && <div style={{ padding: "0.875rem", background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.2)", borderRadius: "var(--radius-sm)", marginBottom: "0.75rem", fontSize: "0.875rem", color: "var(--text-secondary)" }}>⚠️ <strong>SHEQ:</strong> Request updated SHEQ documentation package from contractor immediately.</div>}
          {!contractor.iso && <div style={{ padding: "0.875rem", background: "rgba(245,158,11,0.08)", border: "1px solid rgba(245,158,11,0.2)", borderRadius: "var(--radius-sm)", marginBottom: "0.75rem", fontSize: "0.875rem", color: "var(--text-secondary)" }}>⚠️ <strong>ISO 45001:</strong> Contractor must submit valid ISO 45001 certificate or commence certification process.</div>}
          {!contractor.env && <div style={{ padding: "0.875rem", background: "rgba(245,158,11,0.08)", border: "1px solid rgba(245,158,11,0.2)", borderRadius: "var(--radius-sm)", marginBottom: "0.75rem", fontSize: "0.875rem", color: "var(--text-secondary)" }}>⚠️ <strong>Environmental:</strong> Environmental management plan must be submitted and approved.</div>}
          {contractor.sheq && contractor.iso && contractor.permits && contractor.env && (
            <div style={{ padding: "0.875rem", background: "rgba(34,197,94,0.08)", border: "1px solid rgba(34,197,94,0.2)", borderRadius: "var(--radius-sm)", fontSize: "0.875rem", color: "var(--text-secondary)" }}>✅ All compliance requirements are currently met. Next review scheduled on licence expiry date.</div>
          )}
        </div>
      )}

      {activeTab === "documents" && (
        <div className="card" style={{ padding: "1.75rem" }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "1.25rem" }}>
            <h3 style={{ fontSize: "0.9375rem", fontWeight: 700, color: "var(--text-primary)" }}>Submitted Documents</h3>
            <button className="btn btn-primary btn-sm">Upload Document</button>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            {["SHEQ Management Plan 2026", "Operating Licence", "B-BBEE Certificate"].map((doc) => (
              <div key={doc} style={{ display: "flex", alignItems: "center", gap: "1rem", padding: "0.875rem", background: "var(--surface-2)", borderRadius: "var(--radius-sm)", border: "1px solid var(--border)" }}>
                <span style={{ fontSize: "1.5rem" }}>📄</span>
                <span style={{ flex: 1, fontWeight: 500, fontSize: "0.875rem", color: "var(--text-primary)" }}>{doc}</span>
                <span className="badge badge-success">Valid</span>
                <button className="btn btn-ghost btn-sm" style={{ padding: "0.25rem 0.5rem" }}>Download</button>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === "audits" && (
        <div className="card" style={{ padding: "1.75rem" }}>
          <h3 style={{ fontSize: "0.9375rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: "1.25rem" }}>Audit History</h3>
          <div className="table-container">
            <table>
              <thead><tr><th>Date</th><th>Auditor</th><th>Score</th><th>Findings</th><th>Status</th></tr></thead>
              <tbody>
                {[
                  { date: "2026-03-15", auditor: "J. van Tonder", score: contractor.score, findings: "0 critical, 1 minor", status: "Passed" },
                  { date: "2025-09-10", auditor: "A. Sithole", score: Math.max(40, contractor.score - 8), findings: "0 critical, 3 minor", status: "Passed" },
                  { date: "2025-03-22", auditor: "J. van Tonder", score: Math.max(40, contractor.score - 15), findings: "1 major, 2 minor", status: "Conditional" },
                ].map((a) => (
                  <tr key={a.date}>
                    <td style={{ color: "var(--text-secondary)" }}>{new Date(a.date).toLocaleDateString("en-ZA", { day: "2-digit", month: "short", year: "numeric" })}</td>
                    <td style={{ color: "var(--text-primary)" }}>{a.auditor}</td>
                    <td style={{ fontWeight: 700, color: a.score >= 80 ? "var(--success)" : "var(--warning)" }}>{a.score}%</td>
                    <td style={{ color: "var(--text-secondary)", fontSize: "0.8125rem" }}>{a.findings}</td>
                    <td><span className={`badge ${a.status === "Passed" ? "badge-success" : "badge-warning"}`}>{a.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Action Modal */}
      {showActionModal && (
        <div className="overlay" onClick={() => setShowActionModal(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()} style={{ maxWidth: 480 }}>
            <div style={{ padding: "1.5rem", borderBottom: "1px solid var(--border)" }}>
              <h2 style={{ fontWeight: 700, color: "var(--text-primary)" }}>
                {showActionModal === "audit" ? "🔍 Schedule Audit" : "📧 Send Compliance Notice"}
              </h2>
            </div>
            <div style={{ padding: "1.5rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
              {showActionModal === "audit" ? (
                <>
                  <div><label className="label">Scheduled Date</label><input type="date" className="input" /></div>
                  <div><label className="label">Lead Auditor</label><input className="input" placeholder="e.g. J. van Tonder" /></div>
                  <div><label className="label">Audit Scope</label><textarea className="input" style={{ height: 80, resize: "none" }} placeholder="Describe the audit scope…" /></div>
                </>
              ) : (
                <>
                  <div><label className="label">Notice Type</label>
                    <select className="input select"><option>Compliance Warning</option><option>Document Request</option><option>Suspension Notice</option></select>
                  </div>
                  <div><label className="label">Message</label><textarea className="input" style={{ height: 100, resize: "none" }} defaultValue={`Dear ${contractor.name},\n\nThis is to notify you that your compliance records require immediate attention…`} /></div>
                </>
              )}
            </div>
            <div style={{ padding: "1rem 1.5rem", borderTop: "1px solid var(--border)", display: "flex", gap: "0.75rem", justifyContent: "flex-end" }}>
              <button className="btn btn-secondary" onClick={() => setShowActionModal(null)}>Cancel</button>
              <button className="btn btn-primary" onClick={() => setShowActionModal(null)}>
                {showActionModal === "audit" ? "Schedule Audit" : "Send Notice"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
