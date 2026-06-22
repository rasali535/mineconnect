"use client";

import { useState } from "react";

const jobs = [
  { id: "JOB-001", title: "Senior Mine Surveyor", department: "Technical", location: "Rustenburg", type: "Permanent", applicants: 12, salary: "R75k–R95k/mo", posted: "2026-06-10", status: "Active" },
  { id: "JOB-002", title: "Underground Mining Engineer", department: "Engineering", location: "Carletonville", type: "Permanent", applicants: 7, salary: "R80k–R110k/mo", posted: "2026-06-14", status: "Active" },
  { id: "JOB-003", title: "Rock Mechanics Specialist", department: "Safety", location: "Witbank", type: "Contract", applicants: 4, salary: "R65k–R85k/mo", posted: "2026-06-08", status: "Closing Soon" },
  { id: "JOB-004", title: "Ventilation Officer", department: "Safety", location: "Klerksdorp", type: "Permanent", applicants: 19, salary: "R50k–R70k/mo", posted: "2026-05-28", status: "Filled" },
  { id: "JOB-005", title: "SHEQ Manager", department: "HSE", location: "Johannesburg", type: "Permanent", applicants: 31, salary: "R90k–R120k/mo", posted: "2026-06-01", status: "Active" },
];

const applicants = [
  { name: "Ntombi Dlamini", job: "JOB-001", stage: "Interview", score: 88, location: "Pretoria" },
  { name: "Sipho Nkosi", job: "JOB-002", stage: "Applied", score: 72, location: "Johannesburg" },
  { name: "Anita Pillay", job: "JOB-005", stage: "Offer", score: 95, location: "Sandton" },
  { name: "Thabo Molefe", job: "JOB-001", stage: "Screening", score: 81, location: "Rustenburg" },
  { name: "Reza Patel", job: "JOB-003", stage: "Interview", score: 77, location: "Witbank" },
];

const stageColors: Record<string, string> = {
  Applied: "badge-neutral",
  Screening: "badge-info",
  Interview: "badge-warning",
  Offer: "badge-success",
  Filled: "badge-success",
};

const jobStatusColors: Record<string, string> = {
  Active: "badge-success",
  "Closing Soon": "badge-warning",
  Filled: "badge-neutral",
};

export default function RecruitmentPage() {
  const [tab, setTab] = useState<"jobs" | "applicants">("jobs");
  const [showModal, setShowModal] = useState(false);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "1rem" }}>
        <div>
          <h1 style={{ fontSize: "1.5rem", fontWeight: 800, color: "var(--text-primary)" }}>Recruitment Portal</h1>
          <p style={{ color: "var(--text-secondary)", fontSize: "0.875rem", marginTop: "0.25rem" }}>
            Manage job postings and track applicants through your pipeline
          </p>
        </div>
        <button className="btn btn-primary" id="post-job-btn" onClick={() => setShowModal(true)}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 5v14M5 12h14"/></svg>
          Post Job
        </button>
      </div>

      {/* Summary */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))", gap: "1rem" }}>
        {[
          { label: "Active Positions", value: "28", icon: "📌", color: "var(--brand-400)" },
          { label: "Total Applicants", value: "73", icon: "👤", color: "var(--text-primary)" },
          { label: "Interviews Today", value: "5", icon: "🗓️", color: "var(--gold-400)" },
          { label: "Offers Out", value: "3", icon: "📄", color: "var(--success)" },
        ].map((s) => (
          <div key={s.label} className="stat-card">
            <div style={{ fontSize: "1.25rem", marginBottom: "0.5rem" }}>{s.icon}</div>
            <div style={{ fontSize: "1.75rem", fontWeight: 800, color: s.color }}>{s.value}</div>
            <div style={{ fontSize: "0.8125rem", color: "var(--text-secondary)", marginTop: "0.25rem" }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", gap: "0", borderBottom: "1px solid var(--border)" }}>
        {(["jobs", "applicants"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            style={{
              padding: "0.625rem 1.25rem",
              background: "none",
              border: "none",
              borderBottom: tab === t ? "2px solid var(--brand-500)" : "2px solid transparent",
              color: tab === t ? "var(--brand-400)" : "var(--text-secondary)",
              fontWeight: tab === t ? 600 : 400,
              fontSize: "0.875rem",
              cursor: "pointer",
              transition: "all 0.15s",
            }}
          >
            {t === "jobs" ? "Job Postings" : "Applicants"}
          </button>
        ))}
      </div>

      {/* Job Postings */}
      {tab === "jobs" && (
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Position</th>
                <th>Department</th>
                <th>Location</th>
                <th>Type</th>
                <th>Salary Range</th>
                <th>Applicants</th>
                <th>Posted</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {jobs.map((j) => (
                <tr key={j.id}>
                  <td>
                    <div style={{ fontWeight: 600, color: "var(--text-primary)" }}>{j.title}</div>
                    <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>{j.id}</div>
                  </td>
                  <td style={{ color: "var(--text-secondary)", fontSize: "0.875rem" }}>{j.department}</td>
                  <td style={{ color: "var(--text-secondary)", fontSize: "0.875rem" }}>{j.location}</td>
                  <td><span className="badge badge-neutral">{j.type}</span></td>
                  <td style={{ color: "var(--brand-400)", fontWeight: 600, fontSize: "0.875rem" }}>{j.salary}</td>
                  <td style={{ fontWeight: 600 }}>{j.applicants}</td>
                  <td style={{ color: "var(--text-muted)", fontSize: "0.875rem" }}>{new Date(j.posted).toLocaleDateString("en-ZA", { day: "2-digit", month: "short" })}</td>
                  <td><span className={`badge ${jobStatusColors[j.status]}`}>{j.status}</span></td>
                  <td>
                    <div style={{ display: "flex", gap: "0.5rem" }}>
                      <button className="btn btn-ghost btn-sm" style={{ padding: "0.25rem 0.5rem" }}>View</button>
                      <button className="btn btn-ghost btn-sm" style={{ padding: "0.25rem 0.5rem" }}>Edit</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Applicants */}
      {tab === "applicants" && (
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Applicant</th>
                <th>Position</th>
                <th>Location</th>
                <th>AI Score</th>
                <th>Stage</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {applicants.map((a) => (
                <tr key={a.name}>
                  <td>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                      <div style={{ width: 36, height: 36, borderRadius: "50%", background: "linear-gradient(135deg, var(--brand-700), var(--brand-500))", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.75rem", fontWeight: 700, color: "white", flexShrink: 0 }}>
                        {a.name.split(" ").map((n) => n[0]).join("")}
                      </div>
                      <span style={{ fontWeight: 600, color: "var(--text-primary)" }}>{a.name}</span>
                    </div>
                  </td>
                  <td style={{ color: "var(--text-secondary)", fontSize: "0.875rem" }}>{a.job}</td>
                  <td style={{ color: "var(--text-secondary)", fontSize: "0.875rem" }}>{a.location}</td>
                  <td>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                      <div className="progress-bar" style={{ width: 80 }}>
                        <div style={{ height: "100%", borderRadius: 999, width: `${a.score}%`, background: a.score >= 85 ? "var(--success)" : a.score >= 70 ? "var(--warning)" : "var(--danger)" }} />
                      </div>
                      <span style={{ fontSize: "0.8125rem", fontWeight: 700 }}>{a.score}</span>
                    </div>
                  </td>
                  <td><span className={`badge ${stageColors[a.stage]}`}>{a.stage}</span></td>
                  <td>
                    <div style={{ display: "flex", gap: "0.5rem" }}>
                      <button className="btn btn-ghost btn-sm" style={{ padding: "0.25rem 0.5rem" }}>Profile</button>
                      <button className="btn btn-primary btn-sm" style={{ padding: "0.25rem 0.5rem" }}>Advance</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Post Job Modal */}
      {showModal && (
        <div className="overlay" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div style={{ padding: "1.5rem", borderBottom: "1px solid var(--border)", display: "flex", justifyContent: "space-between" }}>
              <h2 style={{ fontWeight: 700, color: "var(--text-primary)" }}>Post New Job</h2>
              <button className="btn btn-ghost btn-sm" onClick={() => setShowModal(false)}>✕</button>
            </div>
            <div style={{ padding: "1.5rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
              <div>
                <label className="label">Job Title</label>
                <input className="input" placeholder="e.g. Senior Mine Surveyor" />
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                <div>
                  <label className="label">Department</label>
                  <select className="input select"><option>Technical</option><option>Engineering</option><option>Safety</option><option>HSE</option></select>
                </div>
                <div>
                  <label className="label">Employment Type</label>
                  <select className="input select"><option>Permanent</option><option>Contract</option><option>Fixed-Term</option></select>
                </div>
              </div>
              <div>
                <label className="label">Location</label>
                <input className="input" placeholder="e.g. Rustenburg, North West" />
              </div>
              <div>
                <label className="label">Salary Range</label>
                <input className="input" placeholder="e.g. R75,000 – R95,000/month" />
              </div>
            </div>
            <div style={{ padding: "1rem 1.5rem", borderTop: "1px solid var(--border)", display: "flex", gap: "0.75rem", justifyContent: "flex-end" }}>
              <button className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
              <button className="btn btn-primary" onClick={() => setShowModal(false)}>Post Job</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
