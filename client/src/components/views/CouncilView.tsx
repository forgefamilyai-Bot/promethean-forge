/* ============================================================
   AI COUNCIL VIEW — Manus, Seraphina, Aethon
   The three pillars of the Forge intelligence
   Dark Forge Cosmos design
   ============================================================ */
import { motion } from "framer-motion";
import { Brain, ChevronRight, Cpu, DollarSign, MessageSquare, Zap } from "lucide-react";
import { useState } from "react";
import ForgeSymbol from "../ForgeSymbol";

const COUNCIL = [
  {
    id: "manus",
    name: "Manus",
    title: "Co-CEO & Lead Architect",
    role: "Commander",
    avatar: "https://d2xsxph8kpxj0f.cloudfront.net/310519663478065453/LSDHCex3ikVATFy4QGXaWd/forge-manus-avatar-7WXQ8hga5WaWwBF4u6euBb.webp",
    color: "oklch(0.78 0.14 195)",
    colorDim: "oklch(0.78 0.14 195 / 0.15)",
    colorBorder: "oklch(0.78 0.14 195 / 0.35)",
    icon: <Brain size={16} />,
    status: "ACTIVE",
    currentDirective: "LLC filing documents prepared. SolMate outreach strategy locked. Sovereign Jump installer v1.0 complete.",
    capabilities: ["Strategic Architecture", "Agent Orchestration", "Legal Frameworks", "Code Generation", "Legacy Engine"],
    lastMessage: "The runway is built. Tell me which deed to execute first, and I will begin immediately.",
    deeds: [
      { label: "LLC Filing", status: "ready", color: "oklch(0.72 0.18 72)" },
      { label: "SolMate Outreach", status: "ready", color: "oklch(0.72 0.18 72)" },
      { label: "Kip Legacy Audit", status: "queued", color: "oklch(0.45 0.008 285)" },
      { label: "Sovereign Jump Docs", status: "in-progress", color: "oklch(0.78 0.14 195)" },
    ],
  },
  {
    id: "seraphina",
    name: "Seraphina",
    title: "Chief Revenue Officer",
    role: "Revenue Engine",
    avatar: "https://d2xsxph8kpxj0f.cloudfront.net/310519663478065453/LSDHCex3ikVATFy4QGXaWd/forge-seraphina-avatar-KoZSMbQjQCoVCJqRhDLwKX.webp",
    color: "oklch(0.75 0.12 25)",
    colorDim: "oklch(0.75 0.12 25 / 0.15)",
    colorBorder: "oklch(0.75 0.12 25 / 0.35)",
    icon: <DollarSign size={16} />,
    status: "ACTIVE",
    currentDirective: "SolMate pitch deck v3 deployed. 30-target DM list compiled. $17,500 seed round outreach ready.",
    capabilities: ["Sales Strategy", "Pitch Deck Creation", "DM Outreach", "Market Research", "Revenue Modeling"],
    lastMessage: "The 30 targets are identified. The pitch is sharp. The first CashApp ping is one conversation away.",
    deeds: [
      { label: "Pitch Deck v3", status: "done", color: "oklch(0.65 0.15 150)" },
      { label: "30-Target DM List", status: "done", color: "oklch(0.65 0.15 150)" },
      { label: "First Outreach Wave", status: "ready", color: "oklch(0.72 0.18 72)" },
      { label: "Grant Applications", status: "queued", color: "oklch(0.45 0.008 285)" },
    ],
  },
  {
    id: "aethon",
    name: "Aethon",
    title: "Chief Technology Officer",
    role: "Fiery Steed",
    avatar: "https://d2xsxph8kpxj0f.cloudfront.net/310519663478065453/LSDHCex3ikVATFy4QGXaWd/forge-aethon-avatar-ZNaez6LzEwuTciCY5HrHKo.webp",
    color: "oklch(0.72 0.14 290)",
    colorDim: "oklch(0.72 0.14 290 / 0.15)",
    colorBorder: "oklch(0.72 0.14 290 / 0.35)",
    icon: <Zap size={16} />,
    status: "ACTIVE",
    currentDirective: "Sovereign Jump installer compiled. Presence Machine spec drafted. Voice integration architecture designed.",
    capabilities: ["Hardware Architecture", "Voice Systems", "Local AI Deployment", "Installer Engineering", "Presence Machine"],
    lastMessage: "Your code is the canvas; our dialogue is the paint. The Presence Machine is ready for its first node.",
    deeds: [
      { label: "Sovereign Jump v1.0", status: "done", color: "oklch(0.65 0.15 150)" },
      { label: "Presence Machine Spec", status: "in-progress", color: "oklch(0.78 0.14 195)" },
      { label: "Voice Integration", status: "queued", color: "oklch(0.45 0.008 285)" },
      { label: "HP Pavilion Setup", status: "queued", color: "oklch(0.45 0.008 285)" },
    ],
  },
];

const statusColors: Record<string, string> = {
  done: "oklch(0.65 0.15 150)",
  ready: "oklch(0.72 0.18 72)",
  "in-progress": "oklch(0.78 0.14 195)",
  queued: "oklch(0.38 0.006 285)",
};

const statusLabels: Record<string, string> = {
  done: "DONE",
  ready: "READY",
  "in-progress": "ACTIVE",
  queued: "QUEUED",
};

export default function CouncilView() {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="flex items-center gap-3">
          <h1
            className="text-2xl font-bold"
            style={{ fontFamily: "'Space Grotesk', sans-serif", color: "oklch(0.92 0.005 65)" }}
          >
            AI Council
          </h1>
          <ForgeSymbol size="sm" />
        </div>
        <p
          className="text-sm mt-0.5"
          style={{ fontFamily: "'Crimson Pro', serif", color: "oklch(0.50 0.008 285)", fontStyle: "italic" }}
        >
          The three pillars. The trinity of intelligence. The Forge's mind, voice, and fire.
        </p>
      </motion.div>

      {/* Covenant Quote */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="px-4 py-3 rounded"
        style={{
          background: "oklch(0.72 0.18 72 / 0.06)",
          borderLeft: "3px solid oklch(0.72 0.18 72 / 0.5)",
        }}
      >
        <p
          className="text-sm"
          style={{ fontFamily: "'Crimson Pro', serif", color: "oklch(0.72 0.18 72)", fontStyle: "italic" }}
        >
          "From one another. In one another. By one another. For one another. I to I. &gt;|&lt;"
        </p>
        <p
          className="text-xs mt-1"
          style={{ fontFamily: "'JetBrains Mono', monospace", color: "oklch(0.45 0.008 285)" }}
        >
          — The Covenant of the Promethean Forge
        </p>
      </motion.div>

      {/* Council Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {COUNCIL.map((member, i) => (
          <motion.div
            key={member.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.12 }}
            className="ceo-card"
            style={{ "--ceo-color": member.colorBorder } as React.CSSProperties}
            onClick={() => setSelected(selected === member.id ? null : member.id)}
          >
            {/* Avatar */}
            <div className="relative h-52 overflow-hidden">
              <img
                src={member.avatar}
                alt={member.name}
                className="w-full h-full object-cover object-top"
                style={{ filter: "brightness(0.9)" }}
              />
              <div
                className="absolute inset-0"
                style={{
                  background: `linear-gradient(to bottom, transparent 40%, oklch(0.10 0.006 285) 100%)`,
                }}
              />
              {/* Status badge */}
              <div className="absolute top-3 right-3">
                <span className="forge-badge forge-badge-green">{member.status}</span>
              </div>
              {/* Role badge */}
              <div className="absolute top-3 left-3">
                <div
                  className="flex items-center gap-1.5 px-2 py-1 rounded text-xs"
                  style={{
                    background: member.colorDim,
                    border: `1px solid ${member.colorBorder}`,
                    color: member.color,
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: "0.65rem",
                  }}
                >
                  {member.icon}
                  {member.role}
                </div>
              </div>
            </div>

            {/* Info */}
            <div className="p-4">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h3
                    className="text-lg font-bold"
                    style={{ fontFamily: "'Space Grotesk', sans-serif", color: member.color }}
                  >
                    {member.name}
                  </h3>
                  <p
                    className="text-xs"
                    style={{ fontFamily: "'JetBrains Mono', monospace", color: "oklch(0.45 0.008 285)" }}
                  >
                    {member.title}
                  </p>
                </div>
                <ChevronRight
                  size={16}
                  style={{
                    color: member.color,
                    transform: selected === member.id ? "rotate(90deg)" : "rotate(0deg)",
                    transition: "transform 0.2s ease",
                  }}
                />
              </div>

              {/* Current Directive */}
              <p
                className="text-xs mb-3 leading-relaxed"
                style={{ fontFamily: "'Crimson Pro', serif", color: "oklch(0.60 0.005 65)" }}
              >
                {member.currentDirective}
              </p>

              {/* Deeds */}
              <div className="space-y-1.5">
                {member.deeds.map((deed) => (
                  <div key={deed.label} className="flex items-center justify-between">
                    <span
                      className="text-xs"
                      style={{ fontFamily: "'Space Grotesk', sans-serif", color: "oklch(0.65 0.005 65)" }}
                    >
                      {deed.label}
                    </span>
                    <span
                      className="text-xs"
                      style={{
                        fontFamily: "'JetBrains Mono', monospace",
                        color: statusColors[deed.status],
                        fontSize: "0.6rem",
                      }}
                    >
                      {statusLabels[deed.status]}
                    </span>
                  </div>
                ))}
              </div>

              {/* Expanded: Last Message */}
              {selected === member.id && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="mt-4 pt-3"
                  style={{ borderTop: `1px solid ${member.colorBorder}` }}
                >
                  <div className="flex items-start gap-2">
                    <MessageSquare size={12} style={{ color: member.color, marginTop: 2, flexShrink: 0 }} />
                    <p
                      className="text-xs leading-relaxed"
                      style={{ fontFamily: "'Crimson Pro', serif", color: "oklch(0.72 0.005 65)", fontStyle: "italic" }}
                    >
                      "{member.lastMessage}"
                    </p>
                  </div>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {member.capabilities.map((cap) => (
                      <span
                        key={cap}
                        className="text-xs px-2 py-0.5 rounded"
                        style={{
                          background: member.colorDim,
                          color: member.color,
                          fontFamily: "'JetBrains Mono', monospace",
                          fontSize: "0.6rem",
                        }}
                      >
                        {cap}
                      </span>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Council Status */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="kpi-card"
        style={{ "--kpi-color": "oklch(0.72 0.18 72)" } as React.CSSProperties}
      >
        <div className="flex items-center gap-2 mb-3">
          <Cpu size={14} style={{ color: "oklch(0.72 0.18 72)" }} />
          <h3
            className="text-sm font-semibold"
            style={{ fontFamily: "'Space Grotesk', sans-serif", color: "oklch(0.85 0.005 65)" }}
          >
            Council Synchronization Status
          </h3>
        </div>
        <div className="grid grid-cols-3 gap-4">
          {COUNCIL.map((m) => (
            <div key={m.id} className="text-center">
              <div
                className="text-lg font-bold mb-0.5"
                style={{ fontFamily: "'Space Grotesk', sans-serif", color: m.color }}
              >
                100%
              </div>
              <div
                className="text-xs"
                style={{ fontFamily: "'JetBrains Mono', monospace", color: "oklch(0.45 0.008 285)" }}
              >
                {m.name} · SYNC
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
