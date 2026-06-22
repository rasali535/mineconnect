"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const getFilteredNav = (role: string) => {
  const allNav = [
    {
      label: "Overview",
      items: [
        { href: "/dashboard", icon: "📊", label: "Dashboard" },
      ],
    },
    {
      label: "Operations",
      items: [
        { href: "/dashboard/suppliers", icon: "🏭", label: "Suppliers" },
        { href: "/dashboard/compliance", icon: "📋", label: "Compliance" },
        { href: "/dashboard/recruitment", icon: "👷", label: "Recruitment" },
        { href: "/dashboard/community", icon: "🤝", label: "Community" },
        { href: "/dashboard/esg", icon: "🌱", label: "ESG" },
      ],
    },
    {
      label: "Intelligence",
      items: [
        { href: "/dashboard/ai", icon: "🤖", label: "AI Assistant" },
      ],
    },
    {
      label: "Settings",
      items: [
        { href: "/dashboard/settings", icon: "⚙️", label: "Settings" },
      ],
    },
  ];

  if (role === "admin") return allNav;
  if (role === "supplier") {
    return [
      { label: "Overview", items: [{ href: "/dashboard", icon: "📊", label: "Dashboard" }] },
      { label: "Portal", items: [
        { href: "/dashboard/suppliers", icon: "🏭", label: "My Contracts" },
        { href: "/dashboard/compliance", icon: "📋", label: "My Compliance" },
      ] },
    ];
  }
  if (role === "applicant") {
    return [
      { label: "Overview", items: [{ href: "/dashboard", icon: "📊", label: "Dashboard" }] },
      { label: "Career", items: [
        { href: "/dashboard/recruitment", icon: "👷", label: "My Applications" },
      ] },
    ];
  }
  if (role === "community") {
    return [
      { label: "Overview", items: [{ href: "/dashboard", icon: "📊", label: "Dashboard" }] },
      { label: "Impact", items: [
        { href: "/dashboard/community", icon: "🤝", label: "Community Hub" },
        { href: "/dashboard/esg", icon: "🌱", label: "Sustainability" },
      ] },
    ];
  }
  return allNav;
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [persona, setPersona] = useState("admin");

  // Only read cookie on mount to avoid hydration mismatch
  React.useEffect(() => {
    const cookies = document.cookie.split("; ");
    const roleCookie = cookies.find((row) => row.startsWith("mineconnect_persona="));
    if (roleCookie) {
      setPersona(roleCookie.split("=")[1]);
    }
  }, []);

  const navSections = getFilteredNav(persona);
  
  const getUserProfile = (role: string) => {
    switch (role) {
      case "supplier": return { name: "Shaft Engineering", title: "Supplier Portal", initials: "SE", bg: "var(--brand-700)" };
      case "applicant": return { name: "Thabo Molefe", title: "Applicant", initials: "TM", bg: "var(--success)" };
      case "community": return { name: "Bojanala Municipality", title: "Community Partner", initials: "BM", bg: "var(--warning)" };
      default: return { name: "James Mokoena", title: "Admin", initials: "JM", bg: "linear-gradient(135deg, var(--brand-700), var(--brand-500))" };
    }
  };
  
  const userProfile = getUserProfile(persona);

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "var(--surface-0)" }}>
      {/* ─── SIDEBAR ─── */}
      <aside
        style={{
          width: sidebarOpen ? 260 : 64,
          minHeight: "100vh",
          background: "var(--surface-1)",
          borderRight: "1px solid var(--border)",
          display: "flex",
          flexDirection: "column",
          flexShrink: 0,
          transition: "width 0.25s ease",
          overflow: "hidden",
          position: "sticky",
          top: 0,
          height: "100vh",
        }}
      >
        {/* Logo */}
        <div style={{ padding: "1.25rem 1rem", borderBottom: "1px solid var(--border)", display: "flex", alignItems: "center", gap: "0.75rem", height: 64, flexShrink: 0 }}>
          <span style={{ fontSize: "1.5rem", flexShrink: 0 }}>⛏️</span>
          {sidebarOpen && (
            <span style={{ fontWeight: 800, fontSize: "1.125rem", color: "var(--text-primary)", whiteSpace: "nowrap" }}>
              Mine<span className="gradient-text">Connect</span>
            </span>
          )}
        </div>

        {/* Nav */}
        <nav style={{ flex: 1, overflowY: "auto", padding: "1rem 0.75rem", display: "flex", flexDirection: "column", gap: "0.25rem" }}>
          {navSections.map((section) => (
            <div key={section.label} style={{ marginBottom: "0.5rem" }}>
              {sidebarOpen && (
                <p style={{ fontSize: "0.6875rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--text-muted)", padding: "0.5rem 0.75rem 0.375rem", marginBottom: "0.25rem" }}>
                  {section.label}
                </p>
              )}
              {section.items.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    id={`nav-${item.label.toLowerCase().replace(/\s/g, "-")}`}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.75rem",
                      padding: "0.625rem 0.75rem",
                      borderRadius: "var(--radius-sm)",
                      textDecoration: "none",
                      fontSize: "0.875rem",
                      fontWeight: 500,
                      color: isActive ? "var(--brand-400)" : "var(--text-secondary)",
                      background: isActive ? "rgba(14,165,233,0.1)" : "transparent",
                      borderLeft: isActive ? "2px solid var(--brand-500)" : "2px solid transparent",
                      transition: "all 0.15s ease",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                    }}
                  >
                    <span style={{ fontSize: "1.125rem", flexShrink: 0 }}>{item.icon}</span>
                    {sidebarOpen && item.label}
                  </Link>
                );
              })}
            </div>
          ))}
        </nav>

        {/* User */}
        <div style={{ padding: "0.75rem", borderTop: "1px solid var(--border)", flexShrink: 0 }}>
          <div
            style={{ display: "flex", alignItems: "center", gap: "0.75rem", padding: "0.625rem 0.5rem", borderRadius: "var(--radius-sm)", cursor: "pointer", position: "relative" }}
            onClick={() => setUserMenuOpen((p) => !p)}
          >
            <div style={{ width: 36, height: 36, borderRadius: "50%", background: userProfile.bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.8125rem", fontWeight: 700, color: "white", flexShrink: 0 }}>
              {userProfile.initials}
            </div>
            {sidebarOpen && (
              <div style={{ overflow: "hidden" }}>
                <div style={{ fontSize: "0.875rem", fontWeight: 600, color: "var(--text-primary)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{userProfile.name}</div>
                <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>{userProfile.title}</div>
              </div>
            )}

            {userMenuOpen && sidebarOpen && (
              <div style={{ position: "absolute", bottom: "calc(100% + 8px)", left: 0, right: 0, background: "var(--surface-2)", border: "1px solid var(--border-strong)", borderRadius: "var(--radius)", padding: "0.5rem", zIndex: 50 }}>
                <Link href="/dashboard/settings" style={{ display: "block", padding: "0.5rem 0.75rem", fontSize: "0.875rem", color: "var(--text-secondary)", textDecoration: "none", borderRadius: "var(--radius-sm)" }}>Settings</Link>
                <Link href="/auth/login" style={{ display: "block", padding: "0.5rem 0.75rem", fontSize: "0.875rem", color: "#ef4444", textDecoration: "none", borderRadius: "var(--radius-sm)" }}>Sign out</Link>
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* ─── MAIN ─── */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>
        {/* Topbar */}
        <header style={{ height: 64, borderBottom: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 1.5rem", background: "var(--surface-1)", position: "sticky", top: 0, zIndex: 30, flexShrink: 0 }}>
          <button
            id="sidebar-toggle"
            className="btn btn-ghost btn-sm"
            onClick={() => setSidebarOpen((p) => !p)}
            style={{ padding: "0.5rem" }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>

          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            {/* Search */}
            <div style={{ position: "relative" }}>
              <input
                className="input"
                placeholder="Search…"
                style={{ paddingLeft: "2.25rem", width: 240, background: "var(--surface-2)" }}
              />
              <svg style={{ position: "absolute", left: "0.75rem", top: "50%", transform: "translateY(-50%)", opacity: 0.5 }} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" />
              </svg>
            </div>

            {/* Notification bell */}
            <button className="btn btn-ghost btn-sm" style={{ padding: "0.5rem", position: "relative" }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0"/></svg>
              <span style={{ position: "absolute", top: 4, right: 4, width: 8, height: 8, background: "var(--brand-500)", borderRadius: "50%", border: "2px solid var(--surface-1)" }} />
            </button>
          </div>
        </header>

        {/* Page content */}
        <main style={{ flex: 1, padding: "1.75rem", overflowY: "auto" }}>
          {children}
        </main>
      </div>
    </div>
  );
}
