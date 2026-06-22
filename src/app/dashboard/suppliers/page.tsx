"use client";

import Link from "next/link";
import { useState } from "react";
import { suppliersData } from "@/lib/data";

const categories = ["All", "Engineering", "Equipment", "Explosives", "Transport", "IT & Tech", "Catering"];

const riskColors: Record<string, string> = {
  Low: "badge-success",
  Medium: "badge-warning",
  High: "badge-danger",
};

const statusColors: Record<string, string> = {
  Active: "badge-success",
  Suspended: "badge-danger",
  Pending: "badge-warning",
};

export default function SuppliersPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ name: "", category: "Engineering", contact: "", bbbee: "Level 1" });
  const [saved, setSaved] = useState(false);

  const filtered = suppliersData.filter(
    (s) =>
      (category === "All" || s.category === category) &&
      (search === "" ||
        s.name.toLowerCase().includes(search.toLowerCase()) ||
        s.id.toLowerCase().includes(search.toLowerCase()))
  );

  const handleAddSupplier = () => {
    setSaved(true);
    setTimeout(() => { setSaved(false); setShowModal(false); }, 1500);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "1rem" }}>
        <div>
          <h1 style={{ fontSize: "1.5rem", fontWeight: 800, color: "var(--text-primary)" }}>Supplier Management</h1>
          <p style={{ color: "var(--text-secondary)", fontSize: "0.875rem", marginTop: "0.25rem" }}>
            {filtered.length} of {suppliersData.length} suppliers · Click any row to view details
          </p>
        </div>
        <div style={{ display: "flex", gap: "0.75rem" }}>
          <button className="btn btn-secondary btn-sm" id="export-suppliers-btn">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3"/></svg>
            Export CSV
          </button>
          <button className="btn btn-primary" id="add-supplier-btn" onClick={() => setShowModal(true)}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 5v14M5 12h14"/></svg>
            Add Supplier
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))", gap: "1rem" }}>
        {[
          { label: "Total", value: suppliersData.length, color: "var(--brand-400)" },
          { label: "Active", value: suppliersData.filter(s => s.status === "Active").length, color: "var(--success)" },
          { label: "Suspended", value: suppliersData.filter(s => s.status === "Suspended").length, color: "var(--danger)" },
          { label: "Pending", value: suppliersData.filter(s => s.status === "Pending").length, color: "var(--warning)" },
          { label: "High Risk", value: suppliersData.filter(s => s.risk === "High").length, color: "var(--danger)" },
        ].map((s) => (
          <div key={s.label} className="stat-card">
            <div style={{ fontSize: "1.75rem", fontWeight: 800, color: s.color }}>{s.value}</div>
            <div style={{ fontSize: "0.8125rem", color: "var(--text-secondary)", marginTop: "0.25rem" }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", alignItems: "center" }}>
        <div style={{ position: "relative", flex: "1 1 240px" }}>
          <input
            className="input"
            placeholder="Search suppliers, IDs…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ paddingLeft: "2.25rem" }}
          />
          <svg style={{ position: "absolute", left: "0.75rem", top: "50%", transform: "translateY(-50%)", opacity: 0.5 }} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
        </div>
        <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
          {categories.map((c) => (
            <button
              key={c}
              className={`btn btn-sm ${category === c ? "btn-primary" : "btn-secondary"}`}
              onClick={() => setCategory(c)}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Supplier</th>
              <th>Category</th>
              <th>B-BBEE</th>
              <th>Annual Spend</th>
              <th>Risk</th>
              <th>Rating</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((s) => (
              <tr
                key={s.id}
                style={{ cursor: "pointer" }}
                onClick={() => window.location.href = `/dashboard/suppliers/${s.id}`}
              >
                <td>
                  <div style={{ fontWeight: 600, color: "var(--text-primary)" }}>{s.name}</div>
                  <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>{s.id} · {s.contact}</div>
                </td>
                <td><span className="badge badge-neutral">{s.category}</span></td>
                <td style={{ fontWeight: 600, color: "var(--brand-400)" }}>{s.bbbee}</td>
                <td style={{ fontWeight: 600, color: "var(--text-primary)" }}>{s.spend}</td>
                <td><span className={`badge ${riskColors[s.risk]}`}>{s.risk}</span></td>
                <td>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.375rem" }}>
                    <span style={{ color: "var(--gold-400)", fontWeight: 700 }}>★</span>
                    <span style={{ fontWeight: 600 }}>{s.rating}</span>
                  </div>
                </td>
                <td><span className={`badge ${statusColors[s.status]}`}>{s.status}</span></td>
                <td onClick={(e) => e.stopPropagation()}>
                  <div style={{ display: "flex", gap: "0.5rem" }}>
                    <Link href={`/dashboard/suppliers/${s.id}`} className="btn btn-ghost btn-sm" style={{ padding: "0.25rem 0.625rem" }}>View</Link>
                    <Link href={`/dashboard/suppliers/${s.id}/edit`} className="btn btn-secondary btn-sm" style={{ padding: "0.25rem 0.625rem" }}>Edit</Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Supplier Modal */}
      {showModal && (
        <div className="overlay" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()} style={{ maxWidth: 560 }}>
            <div style={{ padding: "1.5rem", borderBottom: "1px solid var(--border)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <h2 style={{ fontSize: "1.125rem", fontWeight: 700, color: "var(--text-primary)" }}>Add New Supplier</h2>
              <button className="btn btn-ghost btn-sm" onClick={() => setShowModal(false)} style={{ padding: "0.25rem 0.5rem" }}>✕</button>
            </div>
            <div style={{ padding: "1.5rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
              <div>
                <label className="label">Company Name *</label>
                <input className="input" placeholder="e.g. Shaft Engineering (Pty) Ltd" value={form.name} onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))} />
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                <div>
                  <label className="label">Category *</label>
                  <select className="input select" value={form.category} onChange={(e) => setForm((p) => ({ ...p, category: e.target.value }))}>
                    {categories.filter((c) => c !== "All").map((c) => <option key={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="label">B-BBEE Level *</label>
                  <select className="input select" value={form.bbbee} onChange={(e) => setForm((p) => ({ ...p, bbbee: e.target.value }))}>
                    {["Level 1", "Level 2", "Level 3", "Level 4", "Level 5", "Non-compliant"].map((l) => <option key={l}>{l}</option>)}
                  </select>
                </div>
              </div>
              <div>
                <label className="label">Contact Email *</label>
                <input className="input" type="email" placeholder="procurement@supplier.co.za" value={form.contact} onChange={(e) => setForm((p) => ({ ...p, contact: e.target.value }))} />
              </div>
              <div>
                <label className="label">Physical Address</label>
                <input className="input" placeholder="12 Industrial Rd, Centurion, Gauteng" />
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                <div>
                  <label className="label">Registration Number</label>
                  <input className="input" placeholder="2002/034521/07" />
                </div>
                <div>
                  <label className="label">VAT Number</label>
                  <input className="input" placeholder="4120987654" />
                </div>
              </div>
            </div>
            <div style={{ padding: "1rem 1.5rem", borderTop: "1px solid var(--border)", display: "flex", gap: "0.75rem", justifyContent: "flex-end" }}>
              <button className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
              <button className="btn btn-primary" onClick={handleAddSupplier}>
                {saved ? "✓ Supplier Added!" : "Add Supplier"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
