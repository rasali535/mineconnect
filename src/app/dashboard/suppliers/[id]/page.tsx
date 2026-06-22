"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { suppliersData } from "@/lib/data";
import { useState } from "react";

const statusColors: Record<string, string> = {
  Active: "badge-success",
  Suspended: "badge-danger",
  Pending: "badge-warning",
  Completed: "badge-neutral",
};

const riskColors: Record<string, string> = {
  Low: "badge-success",
  Medium: "badge-warning",
  High: "badge-danger",
};

export default function SupplierDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const supplier = suppliersData.find((s) => s.id === id);
  const [activeTab, setActiveTab] = useState<"overview" | "contracts" | "documents" | "notes">("overview");
  const [showSuspendModal, setShowSuspendModal] = useState(false);

  if (!supplier) {
    return (
      <div style={{ textAlign: "center", padding: "4rem 2rem" }}>
        <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>🏭</div>
        <h2 style={{ color: "var(--text-primary)", marginBottom: "0.5rem" }}>Supplier not found</h2>
        <p style={{ color: "var(--text-secondary)", marginBottom: "1.5rem" }}>The supplier ID "{id}" does not exist.</p>
        <Link href="/dashboard/suppliers" className="btn btn-primary">← Back to Suppliers</Link>
      </div>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      {/* Breadcrumb */}
      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.875rem", color: "var(--text-muted)" }}>
        <Link href="/dashboard/suppliers" style={{ color: "var(--brand-400)", textDecoration: "none" }}>Suppliers</Link>
        <span>›</span>
        <span style={{ color: "var(--text-primary)" }}>{supplier.name}</span>
      </div>

      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "1rem" }}>
        <div style={{ display: "flex", gap: "1.25rem", alignItems: "flex-start" }}>
          <div style={{ width: 64, height: 64, borderRadius: "var(--radius)", background: "linear-gradient(135deg, var(--surface-4), var(--surface-3))", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "2rem", flexShrink: 0, border: "1px solid var(--border)" }}>
            🏭
          </div>
          <div>
            <h1 style={{ fontSize: "1.5rem", fontWeight: 800, color: "var(--text-primary)", marginBottom: "0.375rem" }}>{supplier.name}</h1>
            <div style={{ display: "flex", gap: "0.625rem", flexWrap: "wrap", alignItems: "center" }}>
              <span className="badge badge-neutral">{supplier.id}</span>
              <span className="badge badge-neutral">{supplier.category}</span>
              <span className={`badge ${statusColors[supplier.status]}`}>{supplier.status}</span>
              <span className={`badge ${riskColors[supplier.risk]}`}>{supplier.risk} Risk</span>
            </div>
          </div>
        </div>
        <div style={{ display: "flex", gap: "0.75rem" }}>
          <Link href={`/dashboard/suppliers/${id}/edit`} className="btn btn-secondary btn-sm">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
            Edit
          </Link>
          <button className="btn btn-danger btn-sm" id="suspend-supplier-btn" onClick={() => setShowSuspendModal(true)}>
            {supplier.status === "Suspended" ? "Reinstate" : "Suspend"}
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))", gap: "1rem" }}>
        {[
          { label: "Annual Spend", value: supplier.spend, icon: "💰", color: "var(--brand-400)" },
          { label: "B-BBEE Level", value: supplier.bbbee, icon: "📊", color: "var(--gold-400)" },
          { label: "Rating", value: `★ ${supplier.rating}/5.0`, icon: "⭐", color: "var(--gold-400)" },
          { label: "Active Contracts", value: supplier.contracts.filter(c => c.status === "Active").length, icon: "📋", color: "var(--success)" },
        ].map((m) => (
          <div key={m.label} className="stat-card">
            <div style={{ fontSize: "1.25rem", marginBottom: "0.5rem" }}>{m.icon}</div>
            <div style={{ fontSize: "1.5rem", fontWeight: 800, color: m.color }}>{m.value}</div>
            <div style={{ fontSize: "0.8125rem", color: "var(--text-secondary)", marginTop: "0.25rem" }}>{m.label}</div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", gap: 0, borderBottom: "1px solid var(--border)" }}>
        {[
          { key: "overview", label: "Overview" },
          { key: "contracts", label: `Contracts (${supplier.contracts.length})` },
          { key: "documents", label: "Documents" },
          { key: "notes", label: "Notes" },
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

      {/* Overview Tab */}
      {activeTab === "overview" && (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>
          {/* Company Info */}
          <div className="card" style={{ padding: "1.5rem" }}>
            <h3 style={{ fontSize: "0.9375rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: "1.25rem" }}>Company Information</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.875rem" }}>
              {[
                { label: "Registration No.", value: supplier.registration },
                { label: "VAT Number", value: supplier.vatNumber },
                { label: "Address", value: supplier.address },
                { label: "Contact Person", value: supplier.contactName },
                { label: "Email", value: supplier.contact },
                { label: "Phone", value: supplier.phone },
              ].map((f) => (
                <div key={f.label} style={{ display: "flex", justifyContent: "space-between", gap: "1rem" }}>
                  <span style={{ fontSize: "0.8125rem", color: "var(--text-muted)", flexShrink: 0 }}>{f.label}</span>
                  <span style={{ fontSize: "0.875rem", color: "var(--text-primary)", textAlign: "right" }}>{f.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Description & Certs */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <div className="card" style={{ padding: "1.5rem" }}>
              <h3 style={{ fontSize: "0.9375rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: "0.875rem" }}>About</h3>
              <p style={{ fontSize: "0.875rem", color: "var(--text-secondary)", lineHeight: 1.7 }}>{supplier.description}</p>
            </div>
            <div className="card" style={{ padding: "1.5rem" }}>
              <h3 style={{ fontSize: "0.9375rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: "0.875rem" }}>Certifications</h3>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                {supplier.certifications.length > 0 ? supplier.certifications.map((c) => (
                  <span key={c} className="badge badge-info">{c}</span>
                )) : (
                  <span style={{ fontSize: "0.875rem", color: "var(--text-muted)" }}>No certifications on file</span>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Contracts Tab */}
      {activeTab === "contracts" && (
        <div>
          <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "1rem" }}>
            <button className="btn btn-primary btn-sm">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 5v14M5 12h14"/></svg>
              New Contract
            </button>
          </div>
          {supplier.contracts.length === 0 ? (
            <div className="card" style={{ padding: "3rem", textAlign: "center" }}>
              <div style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>📋</div>
              <p style={{ color: "var(--text-secondary)" }}>No contracts on file for this supplier.</p>
            </div>
          ) : (
            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th>Contract ID</th>
                    <th>Description</th>
                    <th>Value</th>
                    <th>Expiry Date</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {supplier.contracts.map((c) => (
                    <tr key={c.id}>
                      <td style={{ fontWeight: 600, color: "var(--brand-400)" }}>{c.id}</td>
                      <td style={{ color: "var(--text-primary)", fontWeight: 500 }}>{c.name}</td>
                      <td style={{ fontWeight: 700, color: "var(--text-primary)" }}>{c.value}</td>
                      <td style={{ color: "var(--text-secondary)" }}>{new Date(c.expiry).toLocaleDateString("en-ZA", { day: "2-digit", month: "short", year: "numeric" })}</td>
                      <td><span className={`badge ${statusColors[c.status]}`}>{c.status}</span></td>
                      <td>
                        <div style={{ display: "flex", gap: "0.5rem" }}>
                          <button className="btn btn-ghost btn-sm" style={{ padding: "0.25rem 0.5rem" }}>View</button>
                          <button className="btn btn-ghost btn-sm" style={{ padding: "0.25rem 0.5rem" }}>Renew</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* Documents Tab */}
      {activeTab === "documents" && (
        <div className="card" style={{ padding: "1.75rem" }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "1.25rem" }}>
            <h3 style={{ fontSize: "0.9375rem", fontWeight: 700, color: "var(--text-primary)" }}>Compliance Documents</h3>
            <button className="btn btn-primary btn-sm" id="upload-doc-btn">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 5v14M5 12h14"/></svg>
              Upload Document
            </button>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            {[
              { name: "B-BBEE Certificate 2026", type: "PDF", date: "2026-01-15", status: "Valid" },
              { name: "Tax Clearance Certificate", type: "PDF", date: "2026-03-01", status: "Valid" },
              { name: "CIDB Registration", type: "PDF", date: "2025-11-20", status: "Valid" },
              { name: "Company Profile", type: "PDF", date: "2025-09-10", status: "Valid" },
            ].map((doc) => (
              <div key={doc.name} style={{ display: "flex", alignItems: "center", gap: "1rem", padding: "0.875rem", background: "var(--surface-2)", borderRadius: "var(--radius-sm)", border: "1px solid var(--border)" }}>
                <span style={{ fontSize: "1.5rem" }}>📄</span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600, fontSize: "0.875rem", color: "var(--text-primary)" }}>{doc.name}</div>
                  <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>{doc.type} · Uploaded {new Date(doc.date).toLocaleDateString("en-ZA", { day: "2-digit", month: "short", year: "numeric" })}</div>
                </div>
                <span className="badge badge-success">{doc.status}</span>
                <button className="btn btn-ghost btn-sm" style={{ padding: "0.25rem 0.5rem" }}>Download</button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Notes Tab */}
      {activeTab === "notes" && (
        <div className="card" style={{ padding: "1.75rem" }}>
          <h3 style={{ fontSize: "0.9375rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: "1.25rem" }}>Internal Notes</h3>
          <textarea
            className="input"
            style={{ width: "100%", height: 160, resize: "vertical", marginBottom: "1rem" }}
            placeholder="Add internal notes about this supplier…"
          />
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <button className="btn btn-primary btn-sm" id="save-notes-btn">Save Note</button>
          </div>
        </div>
      )}

      {/* Suspend Modal */}
      {showSuspendModal && (
        <div className="overlay" onClick={() => setShowSuspendModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()} style={{ maxWidth: 420 }}>
            <div style={{ padding: "1.5rem" }}>
              <h2 style={{ fontWeight: 700, color: "var(--danger)", marginBottom: "0.75rem" }}>⚠️ {supplier.status === "Suspended" ? "Reinstate" : "Suspend"} Supplier</h2>
              <p style={{ color: "var(--text-secondary)", fontSize: "0.875rem", marginBottom: "1.25rem" }}>
                {supplier.status === "Suspended"
                  ? `Are you sure you want to reinstate ${supplier.name}? They will regain access to submit invoices and be eligible for new contracts.`
                  : `Are you sure you want to suspend ${supplier.name}? All active procurement will be paused.`}
              </p>
              <div style={{ display: "flex", gap: "0.75rem", justifyContent: "flex-end" }}>
                <button className="btn btn-secondary" onClick={() => setShowSuspendModal(false)}>Cancel</button>
                <button className="btn btn-danger" id="confirm-suspend-btn" onClick={() => { setShowSuspendModal(false); router.push("/dashboard/suppliers"); }}>
                  Confirm {supplier.status === "Suspended" ? "Reinstate" : "Suspend"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
