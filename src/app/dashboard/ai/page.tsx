"use client";

import { useState, useRef, useEffect } from "react";

type Message = {
  id: number;
  role: "user" | "ai";
  text: string;
  time: string;
};

const suggestions = [
  "Summarise our top 5 supplier risks",
  "Which contractors have expiring compliance documents?",
  "What is our B-BBEE scorecard status?",
  "Show me open vacancies in safety roles",
  "How many community beneficiaries do we have YTD?",
  "Identify any high-risk procurement flags",
];

const initialMessages: Message[] = [
  {
    id: 1,
    role: "ai",
    text: "👋 Hello! I'm **MineIQ**, your AI-powered mining operations assistant. I can help you with:\n\n• Supplier risk assessments\n• Compliance monitoring & alerts\n• Recruitment pipeline analysis\n• Community investment summaries\n• Contract & document queries\n\nWhat would you like to know?",
    time: new Date().toLocaleTimeString("en-ZA", { hour: "2-digit", minute: "2-digit" }),
  },
];

const mockResponses: Record<string, string> = {
  risk: "Based on your current supplier data, I've identified **5 high-risk suppliers**:\n\n1. **DrillMaster Inc** – Outstanding SARS compliance certificate\n2. **SafeRoute Logistics** – 3 outstanding vehicle roadworthy certificates\n3. **XBlast Mining** – Insurance renewal overdue by 14 days\n4. **CoreDrill SA** – Single-source dependency risk\n5. **OpenCast Civils** – SHEQ audit due in 7 days\n\n*Recommended action:* Issue immediate compliance notices to items 1 and 2.",
  compliance: "🔴 **Urgent Compliance Alerts:**\n\n• **TunnelTech Contractors** – ISO 45001 expires in **7 days**\n• **SafeRoute Logistics** – Multiple permits expired\n\n🟡 **Warnings (Next 30 Days):**\n\n• **DrillMaster Inc** – ISO renewal due Aug 15\n• **SteelCraft** – Environmental permit renewal Aug 20\n\n✅ **62 contractors** are fully compliant.",
  bbbee: "📊 **B-BBEE Scorecard Summary:**\n\nYour current portfolio breakdown:\n• Level 1: 18 suppliers (5.3%)\n• Level 2: 89 suppliers (26%)\n• Level 3: 102 suppliers (29.8%)\n• Level 4: 74 suppliers (21.6%)\n• Level 5+: 59 suppliers (17.3%)\n\n**Procurement score:** 23.4/25 points\n**Overall B-BBEE spend:** 73% from qualifying suppliers — within target.",
  default: "I've analysed your query. Based on the MineConnect data, here's what I found:\n\nYour operations currently show strong performance in supplier onboarding (+12 this month) and a high compliance rate of 97.4%. The areas needing attention are:\n\n1. 5 active risk alerts requiring immediate action\n2. 3 compliance document renewals due within 30 days\n3. 6 job vacancies closing this week\n\nWould you like me to drill down into any of these areas?",
};

function getMockResponse(input: string): string {
  const lower = input.toLowerCase();
  if (lower.includes("risk") || lower.includes("supplier")) return mockResponses.risk;
  if (lower.includes("compliance") || lower.includes("expir")) return mockResponses.compliance;
  if (lower.includes("bbbee") || lower.includes("b-bbee") || lower.includes("scorecard")) return mockResponses.bbbee;
  return mockResponses.default;
}

function parseMarkdown(text: string) {
  return text
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.+?)\*/g, "<em>$1</em>")
    .replace(/\n/g, "<br/>");
}

export default function AIPage() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async (text: string) => {
    if (!text.trim()) return;
    const userMsg: Message = { id: Date.now(), role: "user", text, time: new Date().toLocaleTimeString("en-ZA", { hour: "2-digit", minute: "2-digit" }) };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    await new Promise((r) => setTimeout(r, 1200));
    const aiMsg: Message = { id: Date.now() + 1, role: "ai", text: getMockResponse(text), time: new Date().toLocaleTimeString("en-ZA", { hour: "2-digit", minute: "2-digit" }) };
    setMessages((prev) => [...prev, aiMsg]);
    setLoading(false);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem", height: "calc(100vh - 64px - 3.5rem)" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <h1 style={{ fontSize: "1.5rem", fontWeight: 800, color: "var(--text-primary)", display: "flex", alignItems: "center", gap: "0.625rem" }}>
            🤖 MineIQ AI Assistant
          </h1>
          <p style={{ color: "var(--text-secondary)", fontSize: "0.875rem", marginTop: "0.25rem" }}>
            Ask anything about your mining operations
          </p>
        </div>
        <div className="badge badge-success" style={{ display: "flex", alignItems: "center", gap: "0.375rem" }}>
          <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--success)", display: "inline-block" }} />
          Online
        </div>
      </div>

      <div style={{ display: "flex", gap: "1.5rem", flex: 1, minHeight: 0 }}>
        {/* Chat Window */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>
          {/* Messages */}
          <div className="card scroll-area" style={{ flex: 1, padding: "1.25rem", display: "flex", flexDirection: "column", gap: "1rem", overflowY: "auto", marginBottom: "1rem" }}>
            {messages.map((m) => (
              <div key={m.id} style={{ display: "flex", flexDirection: "column", alignItems: m.role === "user" ? "flex-end" : "flex-start" }}>
                {m.role === "ai" && (
                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.375rem" }}>
                    <div style={{ width: 28, height: 28, borderRadius: "50%", background: "linear-gradient(135deg, var(--brand-700), var(--brand-500))", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.75rem" }}>
                      🤖
                    </div>
                    <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>MineIQ · {m.time}</span>
                  </div>
                )}
                <div
                  className={m.role === "user" ? "chat-bubble chat-bubble-user" : "chat-bubble chat-bubble-ai"}
                  dangerouslySetInnerHTML={{ __html: parseMarkdown(m.text) }}
                />
                {m.role === "user" && (
                  <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginTop: "0.25rem" }}>{m.time}</span>
                )}
              </div>
            ))}

            {loading && (
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <div style={{ width: 28, height: 28, borderRadius: "50%", background: "linear-gradient(135deg, var(--brand-700), var(--brand-500))", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.75rem" }}>🤖</div>
                <div className="chat-bubble chat-bubble-ai" style={{ display: "flex", gap: "4px", alignItems: "center", padding: "0.875rem 1rem" }}>
                  <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--brand-400)", animation: "pulse-glow 1s infinite" }} />
                  <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--brand-400)", animation: "pulse-glow 1s 0.2s infinite" }} />
                  <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--brand-400)", animation: "pulse-glow 1s 0.4s infinite" }} />
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div style={{ display: "flex", gap: "0.75rem" }}>
            <input
              className="input"
              id="ai-chat-input"
              placeholder="Ask MineIQ anything…"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && sendMessage(input)}
              disabled={loading}
              style={{ flex: 1 }}
            />
            <button
              className="btn btn-primary"
              id="ai-send-btn"
              onClick={() => sendMessage(input)}
              disabled={loading || !input.trim()}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/></svg>
              Send
            </button>
          </div>
        </div>

        {/* Suggestions Panel */}
        <div style={{ width: 260, flexShrink: 0 }}>
          <div className="card" style={{ padding: "1.25rem" }}>
            <h3 style={{ fontSize: "0.8125rem", fontWeight: 600, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "1rem" }}>
              Suggested Prompts
            </h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.625rem" }}>
              {suggestions.map((s) => (
                <button
                  key={s}
                  onClick={() => sendMessage(s)}
                  style={{
                    background: "var(--surface-2)", border: "1px solid var(--border)", borderRadius: "var(--radius-sm)",
                    padding: "0.625rem 0.875rem", textAlign: "left", fontSize: "0.8125rem", color: "var(--text-secondary)",
                    cursor: "pointer", transition: "all 0.15s", lineHeight: 1.4,
                  }}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div className="card" style={{ padding: "1.25rem", marginTop: "1rem" }}>
            <h3 style={{ fontSize: "0.8125rem", fontWeight: 600, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "0.875rem" }}>
              Data Sources
            </h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              {["Supplier Database", "Compliance Records", "Recruitment Pipeline", "CSI Projects", "Contract Repository"].map((d) => (
                <div key={d} style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.8125rem", color: "var(--text-secondary)" }}>
                  <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--success)", flexShrink: 0 }} />
                  {d}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
