"use client";

import { useState } from "react";

export default function SettingsPage() {
  const [profile, setProfile] = useState({
    name: "James Mokoena",
    email: "james.mokoena@goldvein.co.za",
    company: "GoldVein Resources",
    role: "Procurement Director",
    phone: "+27 82 555 1234",
    location: "Johannesburg, Gauteng",
  });

  const [notifications, setNotifications] = useState({
    complianceAlerts: true,
    supplierUpdates: true,
    recruitmentActivity: false,
    communityUpdates: false,
    weeklyReport: true,
    criticalAlerts: true,
  });

  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem", maxWidth: 800 }}>
      <div>
        <h1 style={{ fontSize: "1.5rem", fontWeight: 800, color: "var(--text-primary)" }}>Settings</h1>
        <p style={{ color: "var(--text-secondary)", fontSize: "0.875rem", marginTop: "0.25rem" }}>Manage your profile, notifications and account preferences</p>
      </div>

      {/* Profile */}
      <div className="card" style={{ padding: "1.75rem" }}>
        <h2 style={{ fontSize: "1rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: "1.5rem" }}>Profile Information</h2>
        <div style={{ display: "flex", gap: "1.5rem", alignItems: "flex-start", marginBottom: "1.5rem", flexWrap: "wrap" }}>
          <div style={{ width: 80, height: 80, borderRadius: "50%", background: "linear-gradient(135deg, var(--brand-700), var(--brand-500))", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.5rem", fontWeight: 800, color: "white", flexShrink: 0 }}>
            JM
          </div>
          <div style={{ flex: 1 }}>
            <button className="btn btn-secondary btn-sm">Change Avatar</button>
            <p style={{ fontSize: "0.8125rem", color: "var(--text-muted)", marginTop: "0.5rem" }}>JPG, PNG or SVG. Max 2MB.</p>
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.25rem" }}>
          {[
            { label: "Full Name", key: "name" },
            { label: "Email Address", key: "email" },
            { label: "Company", key: "company" },
            { label: "Role / Title", key: "role" },
            { label: "Phone Number", key: "phone" },
            { label: "Location", key: "location" },
          ].map(({ label, key }) => (
            <div key={key}>
              <label className="label">{label}</label>
              <input
                className="input"
                value={profile[key as keyof typeof profile]}
                onChange={(e) => setProfile((p) => ({ ...p, [key]: e.target.value }))}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Notifications */}
      <div className="card" style={{ padding: "1.75rem" }}>
        <h2 style={{ fontSize: "1rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: "1.5rem" }}>Notification Preferences</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {Object.entries(notifications).map(([key, value]) => {
            const labels: Record<string, { label: string; desc: string }> = {
              complianceAlerts: { label: "Compliance Alerts", desc: "Get notified of expiring certificates and compliance failures" },
              supplierUpdates: { label: "Supplier Updates", desc: "New supplier onboarding approvals and status changes" },
              recruitmentActivity: { label: "Recruitment Activity", desc: "New job applications and interview scheduling" },
              communityUpdates: { label: "Community Updates", desc: "CSI project milestones and community feed posts" },
              weeklyReport: { label: "Weekly Report", desc: "Receive a summary of your operations every Monday" },
              criticalAlerts: { label: "Critical Alerts", desc: "High-risk supplier or compliance issues — always delivered" },
            };
            const meta = labels[key];
            return (
              <div key={key} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0.75rem 0", borderBottom: "1px solid var(--border)" }}>
                <div>
                  <div style={{ fontSize: "0.9375rem", fontWeight: 500, color: "var(--text-primary)" }}>{meta.label}</div>
                  <div style={{ fontSize: "0.8125rem", color: "var(--text-muted)", marginTop: "0.125rem" }}>{meta.desc}</div>
                </div>
                <button
                  onClick={() => setNotifications((p) => ({ ...p, [key]: !p[key as keyof typeof p] }))}
                  style={{
                    width: 48, height: 26, borderRadius: 999, background: value ? "var(--brand-500)" : "var(--surface-4)",
                    border: "none", cursor: "pointer", position: "relative", transition: "background 0.2s", flexShrink: 0,
                  }}
                >
                  <span style={{
                    position: "absolute", top: 3, left: value ? "calc(100% - 22px)" : 3,
                    width: 20, height: 20, borderRadius: "50%", background: "white",
                    transition: "left 0.2s", display: "block",
                    boxShadow: "0 1px 4px rgba(0,0,0,0.3)",
                  }} />
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Danger Zone */}
      <div className="card" style={{ padding: "1.75rem", borderColor: "rgba(239,68,68,0.2)" }}>
        <h2 style={{ fontSize: "1rem", fontWeight: 700, color: "var(--danger)", marginBottom: "0.75rem" }}>Danger Zone</h2>
        <p style={{ fontSize: "0.875rem", color: "var(--text-secondary)", marginBottom: "1rem" }}>
          These actions are irreversible. Proceed with caution.
        </p>
        <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
          <button className="btn btn-danger btn-sm">Reset All Data</button>
          <button className="btn btn-danger btn-sm">Delete Account</button>
        </div>
      </div>

      {/* Save */}
      <div style={{ display: "flex", justifyContent: "flex-end", gap: "0.75rem" }}>
        <button className="btn btn-secondary">Discard Changes</button>
        <button className="btn btn-primary" onClick={handleSave} id="save-settings-btn">
          {saved ? "✓ Saved!" : "Save Changes"}
        </button>
      </div>
    </div>
  );
}
