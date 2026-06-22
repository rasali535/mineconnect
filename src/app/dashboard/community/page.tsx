"use client";

import { useState } from "react";

const projects = [
  { id: "CSI-001", name: "Limpopo Youth Skills Programme", category: "Skills Development", budget: "R2.4M", spent: "R1.8M", beneficiaries: 340, status: "Active", phase: "Phase 2", location: "Polokwane" },
  { id: "CSI-002", name: "Rustenburg Water Infrastructure", category: "Infrastructure", budget: "R5.1M", spent: "R5.1M", beneficiaries: 4200, status: "Completed", phase: "Done", location: "Rustenburg" },
  { id: "CSI-003", name: "Local SMME Procurement Drive", category: "Enterprise Dev.", budget: "R800k", spent: "R320k", beneficiaries: 18, status: "Active", phase: "Phase 1", location: "Carletonville" },
  { id: "CSI-004", name: "Mine Community Health Clinic", category: "Healthcare", budget: "R3.8M", spent: "R1.2M", beneficiaries: 8600, status: "Planning", phase: "Pre-Build", location: "Witbank" },
  { id: "CSI-005", name: "Women in Mining Bursary Fund", category: "Education", budget: "R1.2M", spent: "R600k", beneficiaries: 24, status: "Active", phase: "Ongoing", location: "Nationwide" },
];

const posts = [
  { author: "Maria Sithole", role: "Community Liaison", time: "2 hours ago", text: "The Phase 2 launch of the Youth Skills Programme was a huge success! 120 new learners enrolled today. 🎉", likes: 24, comments: 8 },
  { author: "John Khumalo", role: "SMME Coordinator", time: "Yesterday", text: "New supplier development workshop scheduled for next Tuesday at Carletonville community hall. All local businesses are welcome to join.", likes: 17, comments: 5 },
  { author: "Community Admin", role: "Admin", time: "3 days ago", text: "Rustenburg Water Project final inspection passed! Clean water now reaches 4,200 households. Proud of the entire team.", likes: 89, comments: 32 },
];

const statusColors: Record<string, string> = {
  Active: "badge-success",
  Completed: "badge-neutral",
  Planning: "badge-info",
};

export default function CommunityPage() {
  const [tab, setTab] = useState<"projects" | "feed">("projects");
  const [postText, setPostText] = useState("");

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      <div>
        <h1 style={{ fontSize: "1.5rem", fontWeight: 800, color: "var(--text-primary)" }}>Community Portal</h1>
        <p style={{ color: "var(--text-secondary)", fontSize: "0.875rem", marginTop: "0.25rem" }}>
          Social investment projects, local procurement, and community engagement
        </p>
      </div>

      {/* Impact Summary */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))", gap: "1rem" }}>
        {[
          { label: "Total CSI Spend", value: "R9.1M", icon: "💰", color: "var(--gold-400)" },
          { label: "Beneficiaries", value: "13,182", icon: "👥", color: "var(--brand-400)" },
          { label: "Active Projects", value: "3", icon: "🏗️", color: "var(--success)" },
          { label: "SLP Compliance", value: "98%", icon: "📋", color: "var(--success)" },
        ].map((s) => (
          <div key={s.label} className="stat-card">
            <div style={{ fontSize: "1.25rem", marginBottom: "0.5rem" }}>{s.icon}</div>
            <div style={{ fontSize: "1.75rem", fontWeight: 800, color: s.color }}>{s.value}</div>
            <div style={{ fontSize: "0.8125rem", color: "var(--text-secondary)", marginTop: "0.25rem" }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", gap: 0, borderBottom: "1px solid var(--border)" }}>
        {[{ key: "projects", label: "CSI Projects" }, { key: "feed", label: "Community Feed" }].map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key as "projects" | "feed")}
            style={{
              padding: "0.625rem 1.25rem", background: "none", border: "none",
              borderBottom: tab === t.key ? "2px solid var(--brand-500)" : "2px solid transparent",
              color: tab === t.key ? "var(--brand-400)" : "var(--text-secondary)",
              fontWeight: tab === t.key ? 600 : 400, fontSize: "0.875rem", cursor: "pointer",
            }}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Projects */}
      {tab === "projects" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {projects.map((p) => {
            const pct = Math.round((parseFloat(p.spent.replace(/[R,kM]/g, "").replace("k", "00").replace("M", "000")) / parseFloat(p.budget.replace(/[R,kM]/g, "").replace("k", "00").replace("M", "000"))) * 100);
            const budgetNum = parseFloat(p.budget.replace("R", "").replace("k", "000").replace("M", "000000").replace(",", ""));
            const spentNum = parseFloat(p.spent.replace("R", "").replace("k", "000").replace("M", "000000").replace(",", ""));
            const spentPct = Math.min(100, Math.round((spentNum / budgetNum) * 100));

            return (
              <div key={p.id} className="card" style={{ padding: "1.375rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "0.75rem", marginBottom: "1rem" }}>
                  <div>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.25rem" }}>
                      <span style={{ fontWeight: 700, fontSize: "1rem", color: "var(--text-primary)" }}>{p.name}</span>
                      <span className={`badge ${statusColors[p.status]}`}>{p.status}</span>
                    </div>
                    <div style={{ fontSize: "0.8125rem", color: "var(--text-muted)" }}>
                      {p.id} · {p.category} · {p.location} · {p.phase}
                    </div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginBottom: "0.125rem" }}>Budget spent</div>
                    <div style={{ fontWeight: 700, color: "var(--brand-400)" }}>{p.spent} / {p.budget}</div>
                  </div>
                </div>

                <div style={{ display: "flex", gap: "2rem", marginBottom: "1rem" }}>
                  <div>
                    <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>Beneficiaries</div>
                    <div style={{ fontWeight: 700, color: "var(--text-primary)" }}>{p.beneficiaries.toLocaleString()}</div>
                  </div>
                </div>

                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.375rem" }}>
                    <span style={{ fontSize: "0.8125rem", color: "var(--text-muted)" }}>Budget utilisation</span>
                    <span style={{ fontSize: "0.8125rem", fontWeight: 600, color: spentPct >= 90 ? "var(--warning)" : "var(--success)" }}>{spentPct}%</span>
                  </div>
                  <div className="progress-bar">
                    <div style={{ height: "100%", width: `${spentPct}%`, background: `linear-gradient(90deg, var(--brand-700), var(--brand-400))`, borderRadius: 999 }} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Feed */}
      {tab === "feed" && (
        <div style={{ maxWidth: 680, display: "flex", flexDirection: "column", gap: "1rem" }}>
          {/* Post composer */}
          <div className="card" style={{ padding: "1.25rem" }}>
            <div style={{ display: "flex", gap: "0.875rem" }}>
              <div style={{ width: 36, height: 36, borderRadius: "50%", background: "linear-gradient(135deg, var(--brand-700), var(--brand-500))", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.75rem", fontWeight: 700, color: "white", flexShrink: 0 }}>
                JM
              </div>
              <div style={{ flex: 1 }}>
                <textarea
                  className="input"
                  placeholder="Share an update with your community…"
                  value={postText}
                  onChange={(e) => setPostText(e.target.value)}
                  style={{ resize: "none", height: 80, marginBottom: "0.75rem" }}
                />
                <div style={{ display: "flex", justifyContent: "flex-end" }}>
                  <button className="btn btn-primary btn-sm" onClick={() => setPostText("")}>Post Update</button>
                </div>
              </div>
            </div>
          </div>

          {/* Posts */}
          {posts.map((p, i) => (
            <div key={i} className="card" style={{ padding: "1.375rem" }}>
              <div style={{ display: "flex", gap: "0.875rem", marginBottom: "0.875rem" }}>
                <div style={{ width: 40, height: 40, borderRadius: "50%", background: "linear-gradient(135deg, var(--surface-4), var(--surface-3))", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.8125rem", fontWeight: 700, color: "var(--brand-400)", flexShrink: 0 }}>
                  {p.author.split(" ").map((n) => n[0]).join("")}
                </div>
                <div>
                  <div style={{ fontWeight: 600, fontSize: "0.9375rem", color: "var(--text-primary)" }}>{p.author}</div>
                  <div style={{ fontSize: "0.8125rem", color: "var(--text-muted)" }}>{p.role} · {p.time}</div>
                </div>
              </div>
              <p style={{ color: "var(--text-secondary)", fontSize: "0.9375rem", lineHeight: 1.6, marginBottom: "1rem" }}>{p.text}</p>
              <div style={{ display: "flex", gap: "1rem", fontSize: "0.8125rem", color: "var(--text-muted)" }}>
                <button style={{ background: "none", border: "none", color: "var(--text-muted)", cursor: "pointer", display: "flex", alignItems: "center", gap: "0.375rem" }}>
                  👍 {p.likes}
                </button>
                <button style={{ background: "none", border: "none", color: "var(--text-muted)", cursor: "pointer", display: "flex", alignItems: "center", gap: "0.375rem" }}>
                  💬 {p.comments}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
