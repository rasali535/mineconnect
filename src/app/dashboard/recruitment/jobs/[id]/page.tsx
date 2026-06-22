"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { jobsData, applicantsData } from "@/lib/data";
import { useState } from "react";

const stageColors: Record<string, string> = {
  Applied: "badge-neutral",
  Screening: "badge-info",
  Interview: "badge-warning",
  Offer: "badge-success",
};

export default function JobDetailPage() {
  const { id } = useParams();
  const job = jobsData.find((j) => j.id === id);
  const jobApplicants = applicantsData.filter((a) => a.job === id);
  const [showAddModal, setShowAddModal] = useState(false);
  const [saved, setSaved] = useState(false);

  if (!job) {
    return (
      <div style={{ textAlign: "center", padding: "4rem 2rem" }}>
        <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>💼</div>
        <h2 style={{ color: "var(--text-primary)", marginBottom: "0.5rem" }}>Job not found</h2>
        <p style={{ color: "var(--text-secondary)", marginBottom: "1.5rem" }}>ID "{id}" does not exist.</p>
        <Link href="/dashboard/recruitment" className="btn btn-primary">← Back to Recruitment</Link>
      </div>
    );
  }

  const statusBadge: Record<string, string> = {
    Active: "badge-success",
    "Closing Soon": "badge-warning",
    Filled: "badge-neutral",
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      {/* Breadcrumb */}
      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.875rem", color: "var(--text-muted)" }}>
        <Link href="/dashboard/recruitment" style={{ color: "var(--brand-400)", textDecoration: "none" }}>Recruitment</Link>
        <span>›</span>
        <span style={{ color: "var(--text-primary)" }}>{job.title}</span>
      </div>

      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "1rem" }}>
        <div>
          <h1 style={{ fontSize: "1.5rem", fontWeight: 800, color: "var(--text-primary)", marginBottom: "0.375rem" }}>{job.title}</h1>
          <div style={{ display: "flex", gap: "0.625rem", flexWrap: "wrap", alignItems: "center" }}>
            <span className="badge badge-neutral">{job.id}</span>
            <span className="badge badge-neutral">{job.department}</span>
            <span className="badge badge-neutral">📍 {job.location}</span>
            <span className="badge badge-neutral">📅 {job.type}</span>
            <span className={`badge ${statusBadge[job.status]}`}>{job.status}</span>
          </div>
        </div>
        <div style={{ display: "flex", gap: "0.75rem" }}>
          <button className="btn btn-secondary btn-sm" id="close-job-btn">Close Job</button>
          <button className="btn btn-primary btn-sm" id="add-applicant-btn" onClick={() => setShowAddModal(true)}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 5v14M5 12h14"/></svg>
            Add Applicant
          </button>
        </div>
      </div>

      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))", gap: "1rem" }}>
        {[
          { label: "Total Applicants", value: jobApplicants.length || job.applicants, color: "var(--brand-400)" },
          { label: "In Interview", value: jobApplicants.filter(a => a.stage === "Interview").length, color: "var(--warning)" },
          { label: "Offers Extended", value: jobApplicants.filter(a => a.stage === "Offer").length, color: "var(--success)" },
          { label: "Salary Range", value: job.salary, color: "var(--gold-400)" },
        ].map((s) => (
          <div key={s.label} className="stat-card">
            <div style={{ fontSize: s.label === "Salary Range" ? "1rem" : "1.75rem", fontWeight: 800, color: s.color }}>{s.value}</div>
            <div style={{ fontSize: "0.8125rem", color: "var(--text-secondary)", marginTop: "0.25rem" }}>{s.label}</div>
          </div>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "1.5rem" }}>
        {/* Applicants Table */}
        <div>
          <h2 style={{ fontSize: "1rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: "1rem" }}>
            Applicants ({jobApplicants.length || job.applicants})
          </h2>
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Applicant</th>
                  <th>AI Score</th>
                  <th>Stage</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {jobApplicants.length > 0 ? jobApplicants.map((a) => (
                  <tr key={a.id} style={{ cursor: "pointer" }} onClick={() => window.location.href = `/dashboard/recruitment/applicants/${a.id}`}>
                    <td>
                      <div style={{ fontWeight: 600, color: "var(--text-primary)" }}>{a.name}</div>
                      <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>{a.location} · {a.experience}</div>
                    </td>
                    <td>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                        <div style={{ width: 48, height: 6, background: "var(--surface-3)", borderRadius: 3, overflow: "hidden" }}>
                          <div style={{ width: `${a.score}%`, height: "100%", background: a.score >= 85 ? "var(--success)" : a.score >= 70 ? "var(--warning)" : "var(--danger)", borderRadius: 3 }} />
                        </div>
                        <span style={{ fontWeight: 700, fontSize: "0.875rem", color: "var(--text-primary)" }}>{a.score}%</span>
                      </div>
                    </td>
                    <td><span className={`badge ${stageColors[a.stage]}`}>{a.stage}</span></td>
                    <td onClick={(e) => e.stopPropagation()}>
                      <Link href={`/dashboard/recruitment/applicants/${a.id}`} className="btn btn-ghost btn-sm" style={{ padding: "0.25rem 0.5rem" }}>View</Link>
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan={4} style={{ textAlign: "center", color: "var(--text-muted)", padding: "2rem" }}>
                      No applicants tracked yet for this role. Applicants submitted externally: {job.applicants}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Job Info */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <div className="card" style={{ padding: "1.5rem" }}>
            <h3 style={{ fontSize: "0.9375rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: "1rem" }}>Job Description</h3>
            <p style={{ fontSize: "0.875rem", color: "var(--text-secondary)", lineHeight: 1.7 }}>{job.description}</p>
          </div>
          <div className="card" style={{ padding: "1.5rem" }}>
            <h3 style={{ fontSize: "0.9375rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: "1rem" }}>Requirements</h3>
            <ul style={{ paddingLeft: "1.25rem", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              {job.requirements.map((r) => (
                <li key={r} style={{ fontSize: "0.875rem", color: "var(--text-secondary)", lineHeight: 1.6 }}>{r}</li>
              ))}
            </ul>
          </div>
          <div className="card" style={{ padding: "1.5rem" }}>
            <h3 style={{ fontSize: "0.9375rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: "0.75rem" }}>Job Details</h3>
            {[
              { label: "Posted", value: new Date(job.posted).toLocaleDateString("en-ZA", { day: "2-digit", month: "long", year: "numeric" }) },
              { label: "Department", value: job.department },
              { label: "Location", value: job.location },
              { label: "Employment Type", value: job.type },
              { label: "Salary Range", value: job.salary },
            ].map((f) => (
              <div key={f.label} style={{ display: "flex", justifyContent: "space-between", padding: "0.5rem 0", borderBottom: "1px solid var(--border)" }}>
                <span style={{ fontSize: "0.8125rem", color: "var(--text-muted)" }}>{f.label}</span>
                <span style={{ fontSize: "0.875rem", fontWeight: 500, color: "var(--text-primary)" }}>{f.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Add Applicant Modal */}
      {showAddModal && (
        <div className="overlay" onClick={() => setShowAddModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()} style={{ maxWidth: 520 }}>
            <div style={{ padding: "1.5rem", borderBottom: "1px solid var(--border)", display: "flex", justifyContent: "space-between" }}>
              <h2 style={{ fontWeight: 700, color: "var(--text-primary)" }}>Add Applicant</h2>
              <button className="btn btn-ghost btn-sm" onClick={() => setShowAddModal(false)}>✕</button>
            </div>
            <div style={{ padding: "1.5rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                <div><label className="label">Full Name *</label><input className="input" placeholder="First & Last name" /></div>
                <div><label className="label">Email *</label><input type="email" className="input" placeholder="applicant@email.com" /></div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                <div><label className="label">Phone</label><input className="input" placeholder="+27 82 xxx xxxx" /></div>
                <div><label className="label">Location</label><input className="input" placeholder="City, Province" /></div>
              </div>
              <div><label className="label">Years of Experience</label><input className="input" placeholder="e.g. 5 years" /></div>
              <div><label className="label">Brief Summary</label><textarea className="input" style={{ height: 80, resize: "none" }} placeholder="Briefly describe the candidate…" /></div>
            </div>
            <div style={{ padding: "1rem 1.5rem", borderTop: "1px solid var(--border)", display: "flex", gap: "0.75rem", justifyContent: "flex-end" }}>
              <button className="btn btn-secondary" onClick={() => setShowAddModal(false)}>Cancel</button>
              <button className="btn btn-primary" onClick={() => { setSaved(true); setTimeout(() => { setSaved(false); setShowAddModal(false); }, 1500); }}>
                {saved ? "✓ Added!" : "Add Applicant"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
