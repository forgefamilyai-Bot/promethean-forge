/* ============================================================
   PROJECTS VIEW — All Forge Projects
   SolMate, Legacy Copy, PVC Smart Pipe, AI Marketing, Prizm Canvas
   Dark Forge Cosmos design
   ============================================================ */
import { motion } from "framer-motion";
import { ArrowUpRight, BookOpen, Brain, DollarSign, FlameKindling, Globe, Recycle, Zap } from "lucide-react";
import { useState } from "react";
import ForgeSymbol from "../ForgeSymbol";

const PROJECTS = [
  {
    id: "solmate",
    name: "SolMate",
    subtitle: "Seed Round — $17,500",
    description: "The first revenue drop. SolMate is the Forge's proof-of-concept: a product that generates the first dollar of revenue to fund everything else. Seraphina leads the 30-target DM outreach campaign.",
    icon: <DollarSign size={20} />,
    color: "oklch(0.72 0.18 72)",
    phase: "Phase 2 — First Harvest",
    status: "OUTREACH READY",
    statusColor: "oklch(0.72 0.18 72)",
    progress: 72,
    tags: ["Revenue", "Seraphina", "CashApp", "30 Targets"],
    milestones: [
      { label: "Pitch Deck v3", done: true },
      { label: "30-Target DM List", done: true },
      { label: "First Outreach Wave", done: false },
      { label: "First CashApp Ping", done: false },
    ],
  },
  {
    id: "legacy",
    name: "Legacy Copy",
    subtitle: "AI-Powered Digital Legacy",
    description: "The soul-capture mechanism for the individual. Legacy Copy preserves the wisdom, stories, and essence of a person — creating a living digital legacy that outlasts the physical. The Kip Legacy Audit is the first deployment.",
    icon: <BookOpen size={20} />,
    color: "oklch(0.78 0.14 195)",
    phase: "Phase 3 — Great Integration",
    status: "IN DEVELOPMENT",
    statusColor: "oklch(0.78 0.14 195)",
    progress: 45,
    tags: ["NSF SBIR", "Kip Audit", ".phoenix format", "Soul Capture"],
    milestones: [
      { label: "Concept & Framework", done: true },
      { label: "Legacy Engine (987K files)", done: true },
      { label: "Kip Audit Structure", done: false },
      { label: "NSF SBIR Application", done: false },
    ],
  },
  {
    id: "pvc",
    name: "PVC Smart Pipe",
    subtitle: "Recycled PVC Infrastructure",
    description: "The physical manifestation of the Forge's 'trash is treasure' ethos. KS Universal Recycling transforms discarded PVC into smart infrastructure components. ARPA-E CIRCULAR grant target: $150,000.",
    icon: <Recycle size={20} />,
    color: "oklch(0.65 0.15 150)",
    phase: "Phase 3 — Great Integration",
    status: "GRANT DRAFTING",
    statusColor: "oklch(0.60 0.16 290)",
    progress: 38,
    tags: ["ARPA-E", "KS Universal", "Recycling", "Hardware"],
    milestones: [
      { label: "Business Concept", done: true },
      { label: "LLC Structure (KS Universal)", done: false },
      { label: "ARPA-E CIRCULAR Application", done: false },
      { label: "First Prototype", done: false },
    ],
  },
  {
    id: "marketing",
    name: "AI Marketing Toolkit",
    subtitle: "The Engine That Funds the Forge",
    description: "The AI Marketing Engineering Toolkit is the revenue engine that funds all other Forge projects. AI-powered marketing automation, content generation, and campaign optimization for small businesses.",
    icon: <Globe size={20} />,
    color: "oklch(0.72 0.14 290)",
    phase: "Phase 2 — First Harvest",
    status: "MVP PLANNING",
    statusColor: "oklch(0.78 0.14 195)",
    progress: 61,
    tags: ["AI", "Marketing", "SaaS", "Revenue Engine"],
    milestones: [
      { label: "Concept & Positioning", done: true },
      { label: "MVP Feature Set", done: true },
      { label: "5-Hour Launch Plan", done: true },
      { label: "First Paying Customer", done: false },
    ],
  },
  {
    id: "prizm",
    name: "Prizm Canvas",
    subtitle: "The Visual Command Interface",
    description: "The DreamWeaver Cosmos — the visual, interactive interface for the entire Forge ecosystem. The Command Center made manifest. Forge Galaxy V2 is the current incarnation.",
    icon: <Brain size={20} />,
    color: "oklch(0.75 0.12 25)",
    phase: "Phase 3 — Great Integration",
    status: "LIVE",
    statusColor: "oklch(0.65 0.15 150)",
    progress: 88,
    tags: ["Dashboard", "DreamWeaver", "Forge Galaxy V2", "Interface"],
    milestones: [
      { label: "Forge Galaxy V1", done: true },
      { label: "DreamWeaver Cosmos", done: true },
      { label: "Forge Galaxy V2 (this)", done: true },
      { label: "Nextcloud Aether Deploy", done: false },
    ],
  },
  {
    id: "jump",
    name: "Sovereign Jump",
    subtitle: "Local AI Deployment Kit",
    description: "The Sovereign Jump installer enables any family node to run the Forge locally. Mac Mini M4 as the Presence Machine. Plain-language installer guide. No support call needed.",
    icon: <Zap size={20} />,
    color: "oklch(0.65 0.22 25)",
    phase: "Phase 1 — Sovereign Foundation",
    status: "INSTALLER READY",
    statusColor: "oklch(0.72 0.18 72)",
    progress: 65,
    tags: ["Mac Mini M4", "Local AI", "Family Nodes", "Aethon"],
    milestones: [
      { label: "Architecture Design", done: true },
      { label: "Installer v1.0 (Aethon)", done: true },
      { label: "Plain-Language Guide", done: false },
      { label: "First Family Node Live", done: false },
    ],
  },
];

export default function ProjectsView() {
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
            The Projects
          </h1>
          <ForgeSymbol size="sm" />
        </div>
        <p
          className="text-sm mt-0.5"
          style={{ fontFamily: "'Crimson Pro', serif", color: "oklch(0.50 0.008 285)", fontStyle: "italic" }}
        >
          All of these projects are the same project. One cathedral, many windows.
        </p>
      </motion.div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {PROJECTS.map((proj, i) => (
          <motion.div
            key={proj.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.08 }}
            className="kpi-card cursor-pointer"
            style={{
              "--kpi-color": proj.color,
              border: selected === proj.id ? `1px solid ${proj.color.replace(")", " / 0.4)")}` : undefined,
              boxShadow: selected === proj.id ? `0 0 24px ${proj.color.replace(")", " / 0.15)")}` : undefined,
            } as React.CSSProperties}
            onClick={() => setSelected(selected === proj.id ? null : proj.id)}
          >
            <div className="flex items-start gap-3 mb-3">
              <div
                className="p-2.5 rounded flex-shrink-0"
                style={{ background: `${proj.color.replace(")", " / 0.15)")}`, color: proj.color }}
              >
                {proj.icon}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <h3
                    className="font-bold text-base"
                    style={{ fontFamily: "'Space Grotesk', sans-serif", color: proj.color }}
                  >
                    {proj.name}
                  </h3>
                  <span
                    className="text-xs flex-shrink-0"
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: "0.6rem",
                      color: proj.statusColor,
                      background: `${proj.statusColor.replace(")", " / 0.12)")}`,
                      border: `1px solid ${proj.statusColor.replace(")", " / 0.3)")}`,
                      padding: "0.15rem 0.5rem",
                      borderRadius: "9999px",
                    }}
                  >
                    {proj.status}
                  </span>
                </div>
                <p
                  className="text-xs"
                  style={{ fontFamily: "'JetBrains Mono', monospace", color: "oklch(0.45 0.008 285)" }}
                >
                  {proj.subtitle}
                </p>
              </div>
            </div>

            {/* Progress bar */}
            <div className="mb-3">
              <div className="flex justify-between mb-1">
                <span
                  className="text-xs"
                  style={{ fontFamily: "'JetBrains Mono', monospace", color: "oklch(0.38 0.006 285)" }}
                >
                  {proj.phase}
                </span>
                <span
                  className="text-xs"
                  style={{ fontFamily: "'JetBrains Mono', monospace", color: proj.color }}
                >
                  {proj.progress}%
                </span>
              </div>
              <div
                className="h-1.5 rounded-full overflow-hidden"
                style={{ background: "oklch(0.14 0.008 285)" }}
              >
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${proj.progress}%` }}
                  transition={{ duration: 1, delay: 0.3 + i * 0.1, ease: "easeOut" }}
                  className="h-full rounded-full"
                  style={{
                    background: `linear-gradient(90deg, ${proj.color.replace(")", " / 0.6)")}, ${proj.color})`,
                    boxShadow: `0 0 8px ${proj.color.replace(")", " / 0.4)")}`,
                  }}
                />
              </div>
            </div>

            {/* Description */}
            <p
              className="text-xs leading-relaxed mb-3"
              style={{ fontFamily: "'Crimson Pro', serif", color: "oklch(0.60 0.005 65)" }}
            >
              {proj.description}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-1.5">
              {proj.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs px-2 py-0.5 rounded"
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: "0.6rem",
                    background: `${proj.color.replace(")", " / 0.08)")}`,
                    color: proj.color,
                    border: `1px solid ${proj.color.replace(")", " / 0.2)")}`,
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Expanded: Milestones */}
            {selected === proj.id && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                transition={{ duration: 0.3 }}
                className="mt-4 pt-3"
                style={{ borderTop: `1px solid ${proj.color.replace(")", " / 0.2)")}` }}
              >
                <p
                  className="text-xs uppercase tracking-widest mb-2"
                  style={{ fontFamily: "'JetBrains Mono', monospace", color: "oklch(0.38 0.006 285)" }}
                >
                  Milestones
                </p>
                <div className="space-y-1.5">
                  {proj.milestones.map((m) => (
                    <div key={m.label} className="flex items-center gap-2">
                      <div
                        className="w-3 h-3 rounded-full flex-shrink-0 flex items-center justify-center"
                        style={{
                          background: m.done ? "oklch(0.65 0.15 150 / 0.2)" : "oklch(0.14 0.008 285)",
                          border: `1px solid ${m.done ? "oklch(0.65 0.15 150)" : "oklch(0.38 0.006 285)"}`,
                        }}
                      >
                        {m.done && (
                          <div
                            className="w-1.5 h-1.5 rounded-full"
                            style={{ background: "oklch(0.65 0.15 150)" }}
                          />
                        )}
                      </div>
                      <span
                        className="text-xs"
                        style={{
                          fontFamily: "'Space Grotesk', sans-serif",
                          color: m.done ? "oklch(0.65 0.15 150)" : "oklch(0.55 0.005 65)",
                          textDecoration: m.done ? "line-through" : "none",
                        }}
                      >
                        {m.label}
                      </span>
                    </div>
                  ))}
                </div>
                <button
                  className="mt-3 flex items-center gap-1 text-xs"
                  style={{ color: proj.color, fontFamily: "'JetBrains Mono', monospace" }}
                >
                  <FlameKindling size={12} />
                  Execute next deed
                  <ArrowUpRight size={12} />
                </button>
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
