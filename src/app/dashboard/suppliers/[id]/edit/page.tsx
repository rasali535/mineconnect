"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { suppliersData } from "@/lib/data";
import { useState } from "react";

export default function EditSupplierPage() {
  const { id } = useParams();
  const supplier = suppliersData.find((s) => s.id === id);
  const [saved, setSaved] = useState(false);
  const [form, setForm] = useState({
    name: supplier?.name ?? "",
    category: supplier?.category ?? "",
    bbbee: supplier?.bbbee ?? "Level 1",
    contact: supplier?.contact ?? "",
    contactName: supplier?.contactName ?? "",
    phone: supplier?.phone ?? "",
    address: supplier?.address ?? "",
    registration: supplier?.registration ?? "",
    vatNumber: supplier?.vatNumber ?? "",
    description: supplier?.description ?? "",
  });

  if (!supplier) {
    return (
      <div style={{ textAlign: "center", padding: "4rem" }}>
        <p style={{ color: "var(--text-secondary)", marginBottom: "1rem" }}>Supplier not found.</p>
        <Link href="/dashboard/suppliers" className="btn btn-primary">← Back</Link>
      </div>
    );
  }

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem", maxWidth: 720 }}>
      {/* Breadcrumb */}
      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.875rem", color: "var(--text-muted)" }}>
        <Link href="/dashboard/suppliers" style={{ color: "var(--brand-400)", textDecoration: "none" }}>Suppliers</Link>
        <span>›</span>
        <Link href={`/dashboard/suppliers/${id}`} style={{ color: "var(--brand-400)", textDecoration: "none" }}>{supplier.name}</Link>
        <span>›</span>
        <span style={{ color: "var(--text-primary)" }}>Edit</span>
      </div>

      <h1 style={{ fontSize: "1.5rem", fontWeight: 800, color: "var(--text-primary)" }}>Edit Supplier</h1>

      <div className="card" style={{ padding: "1.75rem", display: "flex", flexDirection: "column", gap: "1.25rem" }}>
        <h2 style={{ fontSize: "1rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: "0.25rem" }}>Company Details</h2>
        <div>
          <label className="label">Company Name *</label>
          <input className="input" value={form.name} onChange={(e) => setForm(p => ({ ...p, name: e.target.value }))} />
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
          <div>
            <label className="label">Category</label>
            <select className="input select" value={form.category} onChange={(e) => setForm(p => ({ ...p, category: e.target.value }))}>
              {["Engineering", "Equipment", "Explosives", "Transport", "IT & Tech", "Catering"].map(c => <option key={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label className="label">B-BBEE Level</label>
            <select className="input select" value={form.bbbee} onChange={(e) => setForm(p => ({ ...p, bbbee: e.target.value }))}>
              {["Level 1", "Level 2", "Level 3", "Level 4", "Level 5", "Non-compliant"].map(l => <option key={l}>{l}</option>)}
            </select>
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
          <div>
            <label className="label">Registration Number</label>
            <input className="input" value={form.registration} onChange={(e) => setForm(p => ({ ...p, registration: e.target.value }))} />
          </div>
          <div>
            <label className="label">VAT Number</label>
            <input className="input" value={form.vatNumber} onChange={(e) => setForm(p => ({ ...p, vatNumber: e.target.value }))} />
          </div>
        </div>
        <div>
          <label className="label">Physical Address</label>
          <input className="input" value={form.address} onChange={(e) => setForm(p => ({ ...p, address: e.target.value }))} />
        </div>
        <div>
          <label className="label">Description</label>
          <textarea className="input" style={{ height: 100, resize: "vertical" }} value={form.description} onChange={(e) => setForm(p => ({ ...p, description: e.target.value }))} />
        </div>
      </div>

      <div className="card" style={{ padding: "1.75rem", display: "flex", flexDirection: "column", gap: "1.25rem" }}>
        <h2 style={{ fontSize: "1rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: "0.25rem" }}>Contact Information</h2>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
          <div>
            <label className="label">Contact Person</label>
            <input className="input" value={form.contactName} onChange={(e) => setForm(p => ({ ...p, contactName: e.target.value }))} />
          </div>
          <div>
            <label className="label">Phone Number</label>
            <input className="input" value={form.phone} onChange={(e) => setForm(p => ({ ...p, phone: e.target.value }))} />
          </div>
        </div>
        <div>
          <label className="label">Email Address</label>
          <input className="input" type="email" value={form.contact} onChange={(e) => setForm(p => ({ ...p, contact: e.target.value }))} />
        </div>
      </div>

      <div style={{ display: "flex", gap: "0.75rem", justifyContent: "flex-end" }}>
        <Link href={`/dashboard/suppliers/${id}`} className="btn btn-secondary">Cancel</Link>
        <button className="btn btn-primary" id="save-supplier-btn" onClick={handleSave}>
          {saved ? "✓ Saved!" : "Save Changes"}
        </button>
      </div>
    </div>
  );
}
