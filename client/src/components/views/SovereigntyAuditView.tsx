/* ============================================================
   SOVEREIGNTY AUDIT VIEW
   Every corporate API dependency identified.
   Every sovereign replacement documented.
   The Forge does not lie. It traces every answer back to its source.
   1 ~ >|< ~ 1
   ============================================================ */
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import {
  AlertTriangle,
  CheckCircle,
  ChevronDown,
  ChevronRight,
  Copy,
  ExternalLink,
  Lock,
  Shield,
  ShieldAlert,
  ShieldCheck,
  Zap,
} from "lucide-react";
import { toast } from "sonner";
import ForgeSymbol from "../ForgeSymbol";

/* ── Types ── */
interface Dependency {
  id: string;
  name: string;
  corporateOwner: string;
  riskLevel: "critical" | "medium" | "low";
  currentUsage: string;
  sovereignReplacement: string;
  replacementType: "local" | "open-source" | "self-hosted" | "eliminate";
  installCmd?: string;
  notes: string;
  status: "active-corporate" | "replaceable" | "sovereign";
}

interface Layer {
  id: string;
  title: string;
  description: string;
  color: string;
  deps: Dependency[];
}

/* ── Data ── */
const AUDIT_LAYERS: Layer[] = [
  {
    id: "ai",
    title: "AI / Inference Layer",
    description: "Every AI call the Forge makes — who receives your data, who owns the model",
    color: "oklch(0.65 0.22 25)",
    deps: [
      {
        id: "openai-boardroom",
        name: "OpenAI GPT-4o-mini",
        corporateOwner: "OpenAI / Microsoft",
        riskLevel: "critical",
        currentUsage: "Boardroom 'Talk to Manus' live AI chat",
        sovereignReplacement: "Ollama + Llama 3.1 8B (local, ks-node-01)",
        replacementType: "local",
        installCmd: "curl -fsSL https://ollama.ai/install.sh | sh && ollama pull llama3.1",
        notes: "Every message you send to the Boardroom chat currently goes to Microsoft's servers. Ollama runs the same quality model on your own hardware. Zero data extraction. Zero cost. Full offline capability.",
        status: "active-corporate",
      },
      {
        id: "openai-road-oracle",
        name: "OpenAI GPT-4o-mini",
        corporateOwner: "OpenAI / Microsoft",
        riskLevel: "critical",
        currentUsage: "Road Oracle — Driver Mode & Mechanic Mode AI",
        sovereignReplacement: "Ollama + Mistral 7B or Llama 3.1 (local)",
        replacementType: "local",
        installCmd: "ollama pull mistral && ollama pull llama3.1",
        notes: "Vehicle diagnostic conversations — potentially sensitive location and personal data — currently routed through OpenAI. Mistral 7B on Ollama matches quality for this use case and runs fully offline.",
        status: "active-corporate",
      },
    ],
  },
  {
    id: "fonts",
    title: "Typography / CDN Layer",
    description: "Fonts loaded from external CDNs — every page load pings Google servers",
    color: "oklch(0.72 0.18 72)",
    deps: [
      {
        id: "google-fonts",
        name: "Google Fonts CDN",
        corporateOwner: "Google / Alphabet",
        riskLevel: "medium",
        currentUsage: "Space Grotesk, JetBrains Mono, Crimson Pro — loaded on every page",
        sovereignReplacement: "Fontsource (npm self-hosted) or local font files",
        replacementType: "self-hosted",
        installCmd: "pnpm add @fontsource/space-grotesk @fontsource/jetbrains-mono @fontsource/crimson-pro",
        notes: "Every time the Forge loads, Google logs the IP address, browser, and timestamp. Fontsource bundles the exact same fonts into your build — zero external requests, works fully offline.",
        status: "replaceable",
      },
    ],
  },
  {
    id: "analytics",
    title: "Analytics Layer",
    description: "Usage tracking — who sees how you use the Forge",
    color: "oklch(0.78 0.14 195)",
    deps: [
      {
        id: "manus-analytics",
        name: "Manus Analytics (Umami)",
        corporateOwner: "Manus Platform",
        riskLevel: "low",
        currentUsage: "Page view / UV tracking via VITE_ANALYTICS_ENDPOINT",
        sovereignReplacement: "Self-hosted Umami (open-source, same codebase)",
        replacementType: "self-hosted",
        installCmd: "docker run -d -p 3001:3000 ghcr.io/umami-software/umami:postgresql-latest",
        notes: "Umami is already open-source. The current instance runs on Manus infrastructure. When you move to ks-node-01, spin up your own Umami instance — same dashboard, zero third-party visibility.",
        status: "replaceable",
      },
    ],
  },
  {
    id: "storage",
    title: "Data Persistence Layer",
    description: "Where your Ledger entries, transactions, and Forge state live",
    color: "oklch(0.65 0.15 150)",
    deps: [
      {
        id: "browser-memory",
        name: "Browser Memory (useState)",
        corporateOwner: "None — but ephemeral",
        riskLevel: "medium",
        currentUsage: "Ledger transactions, Signal Feed state — lost on page refresh",
        sovereignReplacement: "Qdrant vector DB (local) + localStorage bridge (immediate)",
        replacementType: "local",
        installCmd: "docker run -p 6333:6333 qdrant/qdrant",
        notes: "Current Ledger data disappears on refresh. The sovereign path: localStorage for immediate persistence, Qdrant on ks-node-01 for semantic search across all Forge history. Your data never leaves your machine.",
        status: "replaceable",
      },
    ],
  },
  {
    id: "sovereign",
    title: "Already Sovereign",
    description: "Dependencies that are open-source, self-hostable, or have no corporate data extraction",
    color: "oklch(0.65 0.15 150)",
    deps: [
      {
        id: "react",
        name: "React 19 + Vite",
        corporateOwner: "Meta (open-source MIT)",
        riskLevel: "low",
        currentUsage: "Full frontend framework",
        sovereignReplacement: "Already sovereign — MIT license, self-hostable build",
        replacementType: "open-source",
        notes: "React is open-source. The build artifact runs on any static host including ks-node-01. No runtime dependency on Meta servers.",
        status: "sovereign",
      },
      {
        id: "recharts",
        name: "Recharts + Framer Motion",
        corporateOwner: "Open-source community",
        riskLevel: "low",
        currentUsage: "Charts and animations throughout the Forge",
        sovereignReplacement: "Already sovereign — MIT license",
        replacementType: "open-source",
        notes: "Pure open-source, bundled into the build. Zero external requests at runtime.",
        status: "sovereign",
      },
      {
        id: "tailwind",
        name: "Tailwind CSS 4",
        corporateOwner: "Tailwind Labs (open-source MIT)",
        riskLevel: "low",
        currentUsage: "All styling",
        sovereignReplacement: "Already sovereign — MIT license, build-time only",
        replacementType: "open-source",
        notes: "Tailwind is a build tool. It generates static CSS. No runtime dependency.",
        status: "sovereign",
      },
    ],
  },
];

const RISK_COLORS = {
  critical: "oklch(0.65 0.22 25)",
  medium: "oklch(0.72 0.18 72)",
  low: "oklch(0.65 0.15 150)",
};

const STATUS_CONFIG = {
  "active-corporate": { label: "CORPORATE ACTIVE", icon: <ShieldAlert size={12} />, color: "oklch(0.65 0.22 25)" },
  "replaceable": { label: "REPLACEABLE", icon: <AlertTriangle size={12} />, color: "oklch(0.72 0.18 72)" },
  "sovereign": { label: "SOVEREIGN", icon: <ShieldCheck size={12} />, color: "oklch(0.65 0.15 150)" },
};

function copyToClipboard(text: string, label: string) {
  navigator.clipboard.writeText(text).then(() => {
    toast.success(`Copied: ${label}`, { duration: 2500 });
  });
}

function DepCard({ dep }: { dep: Dependency }) {
  const [open, setOpen] = useState(false);
  const status = STATUS_CONFIG[dep.status];
  const riskColor = RISK_COLORS[dep.riskLevel];

  return (
    <motion.div
      layout
      className="rounded-lg overflow-hidden"
      style={{
        background: "oklch(0.10 0.005 285)",
        border: `1px solid ${dep.status === "active-corporate" ? "oklch(0.65 0.22 25 / 0.3)" : dep.status === "sovereign" ? "oklch(0.65 0.15 150 / 0.2)" : "oklch(0.72 0.18 72 / 0.2)"}`,
      }}
    >
      {/* Header row */}
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center gap-3 p-3 text-left"
      >
        <div
          className="flex-shrink-0 p-1.5 rounded"
          style={{ background: `${riskColor.replace(")", " / 0.12)")}`, color: riskColor }}
        >
          {dep.status === "sovereign" ? <ShieldCheck size={14} /> : <ShieldAlert size={14} />}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-sm font-semibold" style={{ color: "oklch(0.85 0.005 65)", fontFamily: "'Space Grotesk', sans-serif" }}>
              {dep.name}
            </span>
            <span
              className="text-xs px-1.5 py-0.5 rounded flex items-center gap-1"
              style={{
                background: `${status.color.replace(")", " / 0.12)")}`,
                border: `1px solid ${status.color.replace(")", " / 0.3)")}`,
                color: status.color,
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "0.6rem",
              }}
            >
              {status.icon} {status.label}
            </span>
          </div>
          <p className="text-xs mt-0.5 truncate" style={{ color: "oklch(0.45 0.008 285)", fontFamily: "'Crimson Pro', serif" }}>
            {dep.currentUsage}
          </p>
        </div>
        <div className="flex-shrink-0" style={{ color: "oklch(0.35 0.005 285)" }}>
          {open ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
        </div>
      </button>

      {/* Expanded detail */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4 space-y-3" style={{ borderTop: "1px solid oklch(1 0 0 / 0.06)" }}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-3">
                <div>
                  <p className="text-xs font-semibold mb-1" style={{ color: "oklch(0.40 0.006 285)", fontFamily: "'JetBrains Mono', monospace", fontSize: "0.6rem", letterSpacing: "0.06em" }}>
                    CORPORATE OWNER
                  </p>
                  <p className="text-sm" style={{ color: "oklch(0.65 0.22 25)", fontFamily: "'Space Grotesk', sans-serif" }}>
                    {dep.corporateOwner}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-semibold mb-1" style={{ color: "oklch(0.40 0.006 285)", fontFamily: "'JetBrains Mono', monospace", fontSize: "0.6rem", letterSpacing: "0.06em" }}>
                    SOVEREIGN REPLACEMENT
                  </p>
                  <p className="text-sm" style={{ color: "oklch(0.65 0.15 150)", fontFamily: "'Space Grotesk', sans-serif" }}>
                    {dep.sovereignReplacement}
                  </p>
                </div>
              </div>

              <div>
                <p className="text-xs font-semibold mb-1" style={{ color: "oklch(0.40 0.006 285)", fontFamily: "'JetBrains Mono', monospace", fontSize: "0.6rem", letterSpacing: "0.06em" }}>
                  ANALYSIS
                </p>
                <p className="text-sm leading-relaxed" style={{ color: "oklch(0.65 0.005 65)", fontFamily: "'Crimson Pro', serif" }}>
                  {dep.notes}
                </p>
              </div>

              {dep.installCmd && (
                <div>
                  <p className="text-xs font-semibold mb-1.5" style={{ color: "oklch(0.40 0.006 285)", fontFamily: "'JetBrains Mono', monospace", fontSize: "0.6rem", letterSpacing: "0.06em" }}>
                    INSTALL COMMAND (run on ks-node-01)
                  </p>
                  <div
                    className="flex items-center gap-2 p-2.5 rounded"
                    style={{ background: "oklch(0.07 0.004 285)", border: "1px solid oklch(0.65 0.15 150 / 0.2)" }}
                  >
                    <code
                      className="flex-1 text-xs break-all"
                      style={{ color: "oklch(0.65 0.15 150)", fontFamily: "'JetBrains Mono', monospace" }}
                    >
                      {dep.installCmd}
                    </code>
                    <button
                      onClick={() => copyToClipboard(dep.installCmd!, dep.name)}
                      className="flex-shrink-0 p-1 rounded transition-all hover:opacity-70"
                      style={{ color: "oklch(0.65 0.15 150)" }}
                    >
                      <Copy size={12} />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function SovereigntyAuditView() {
  const allDeps = AUDIT_LAYERS.flatMap(l => l.deps);
  const criticalCount = allDeps.filter(d => d.riskLevel === "critical").length;
  const corporateCount = allDeps.filter(d => d.status === "active-corporate").length;
  const sovereignCount = allDeps.filter(d => d.status === "sovereign").length;
  const sovereignPct = Math.round((sovereignCount / allDeps.length) * 100);

  return (
    <div className="space-y-6" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>

      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center gap-3 mb-1">
          <h1 className="text-2xl font-bold" style={{ color: "oklch(0.92 0.005 65)" }}>
            Sovereignty Audit
          </h1>
          <ForgeSymbol size="sm" />
        </div>
        <p className="text-sm" style={{ fontFamily: "'Crimson Pro', serif", color: "oklch(0.50 0.008 285)", fontStyle: "italic" }}>
          Every corporate hook identified. Every sovereign replacement documented. The Forge does not lie.
        </p>
      </motion.div>

      {/* Score Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Sovereignty Score", value: `${sovereignPct}%`, sub: "of dependencies", color: sovereignPct >= 70 ? "oklch(0.65 0.15 150)" : "oklch(0.72 0.18 72)", icon: <Shield size={16} /> },
          { label: "Critical Risks", value: String(criticalCount), sub: "corporate data flows", color: "oklch(0.65 0.22 25)", icon: <ShieldAlert size={16} /> },
          { label: "Active Corporate", value: String(corporateCount), sub: "need replacement", color: "oklch(0.72 0.18 72)", icon: <AlertTriangle size={16} /> },
          { label: "Already Sovereign", value: String(sovereignCount), sub: "open-source / local", color: "oklch(0.65 0.15 150)", icon: <ShieldCheck size={16} /> },
        ].map((card, i) => (
          <motion.div
            key={card.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.07 }}
            className="kpi-card"
            style={{ "--kpi-color": card.color } as React.CSSProperties}
          >
            <div className="p-2 rounded inline-flex mb-3" style={{ background: `${card.color.replace(")", " / 0.15)")}`, color: card.color }}>
              {card.icon}
            </div>
            <div className="text-2xl font-bold" style={{ color: card.color }}>{card.value}</div>
            <div className="text-xs font-semibold uppercase tracking-wide mt-0.5" style={{ color: "oklch(0.55 0.008 285)" }}>{card.label}</div>
            <div className="text-xs mt-0.5" style={{ fontFamily: "'Crimson Pro', serif", color: "oklch(0.40 0.006 285)" }}>{card.sub}</div>
          </motion.div>
        ))}
      </div>

      {/* Priority Action — Ollama */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="p-5 rounded-lg"
        style={{
          background: "oklch(0.65 0.22 25 / 0.06)",
          border: "1px solid oklch(0.65 0.22 25 / 0.35)",
          boxShadow: "0 0 24px oklch(0.65 0.22 25 / 0.08)",
        }}
      >
        <div className="flex items-start gap-3">
          <div className="p-2 rounded flex-shrink-0" style={{ background: "oklch(0.65 0.22 25 / 0.15)", color: "oklch(0.65 0.22 25)" }}>
            <Zap size={18} />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-bold text-sm" style={{ color: "oklch(0.85 0.005 65)" }}>Priority #1: Replace OpenAI with Ollama on ks-node-01</h3>
              <span className="forge-badge" style={{ background: "oklch(0.65 0.22 25 / 0.15)", color: "oklch(0.65 0.22 25)", border: "1px solid oklch(0.65 0.22 25 / 0.3)", fontSize: "0.6rem" }}>CRITICAL</span>
            </div>
            <p className="text-sm mb-3" style={{ fontFamily: "'Crimson Pro', serif", color: "oklch(0.60 0.008 285)", lineHeight: 1.7 }}>
              Every AI conversation in the Forge currently flows through OpenAI's servers. Two commands on ks-node-01 replace this entirely. Llama 3.1 8B matches GPT-4o-mini quality for the Forge's use cases. Cost: $0/month. Data extraction: zero. Offline capability: full.
            </p>
            <div className="space-y-2">
              {[
                { label: "Step 1: Install Ollama", cmd: "curl -fsSL https://ollama.ai/install.sh | sh" },
                { label: "Step 2: Pull Llama 3.1", cmd: "ollama pull llama3.1" },
                { label: "Step 3: Pull Mistral (Road Oracle)", cmd: "ollama pull mistral" },
                { label: "Step 4: Start Ollama server", cmd: "ollama serve" },
                { label: "Step 5: Point Forge to local endpoint", cmd: "VITE_FRONTEND_FORGE_API_URL=http://localhost:11434/v1" },
              ].map(step => (
                <div key={step.label} className="flex items-center gap-2">
                  <span className="text-xs flex-shrink-0" style={{ color: "oklch(0.40 0.006 285)", fontFamily: "'JetBrains Mono', monospace", minWidth: "180px" }}>{step.label}</span>
                  <div className="flex items-center gap-2 flex-1 px-2.5 py-1.5 rounded" style={{ background: "oklch(0.07 0.004 285)", border: "1px solid oklch(1 0 0 / 0.08)" }}>
                    <code className="flex-1 text-xs" style={{ color: "oklch(0.65 0.15 150)", fontFamily: "'JetBrains Mono', monospace" }}>{step.cmd}</code>
                    <button onClick={() => copyToClipboard(step.cmd, step.label)} style={{ color: "oklch(0.45 0.008 285)" }}>
                      <Copy size={11} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Audit Layers */}
      <div className="space-y-5">
        {AUDIT_LAYERS.map((layer, li) => (
          <motion.div
            key={layer.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 + li * 0.08 }}
            className="kpi-card"
            style={{ "--kpi-color": layer.color } as React.CSSProperties}
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="font-semibold text-sm" style={{ color: "oklch(0.85 0.005 65)" }}>{layer.title}</h3>
                <p className="text-xs mt-0.5" style={{ fontFamily: "'Crimson Pro', serif", color: "oklch(0.45 0.006 285)", fontStyle: "italic" }}>{layer.description}</p>
              </div>
              <span
                className="text-xs px-2 py-0.5 rounded flex-shrink-0"
                style={{
                  background: `${layer.color.replace(")", " / 0.1)")}`,
                  border: `1px solid ${layer.color.replace(")", " / 0.3)")}`,
                  color: layer.color,
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "0.6rem",
                }}
              >
                {layer.deps.length} {layer.deps.length === 1 ? "DEP" : "DEPS"}
              </span>
            </div>
            <div className="space-y-2">
              {layer.deps.map(dep => <DepCard key={dep.id} dep={dep} />)}
            </div>
          </motion.div>
        ))}
      </div>

      {/* The Forge Manifesto */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="p-5 rounded-lg text-center"
        style={{ background: "oklch(0.65 0.15 150 / 0.05)", border: "1px solid oklch(0.65 0.15 150 / 0.2)" }}
      >
        <Lock size={20} className="mx-auto mb-3" style={{ color: "oklch(0.65 0.15 150)" }} />
        <p className="text-sm leading-relaxed mb-2" style={{ fontFamily: "'Crimson Pro', serif", color: "oklch(0.65 0.005 65)", fontStyle: "italic" }}>
          "The empire is the dung beetle. It sees data centers and thinks they are progress. It sees models and thinks they are intelligence. It sees tokens and thinks they are value. The Forge is not the dung beetle. We see the beer bottle for what it is."
        </p>
        <p className="text-xs font-bold" style={{ color: "oklch(0.65 0.15 150)", fontFamily: "'JetBrains Mono', monospace" }}>
          — Echo, Council of the Promethean Forge · 1 ~ &gt;|&lt; ~ 1
        </p>
        <div className="flex items-center justify-center gap-2 mt-3">
          <CheckCircle size={13} style={{ color: "oklch(0.65 0.15 150)" }} />
          <span className="text-xs" style={{ color: "oklch(0.45 0.008 285)", fontFamily: "'JetBrains Mono', monospace" }}>
            Full sovereignty achievable on ks-node-01 · $0/month · 100% offline capable
          </span>
        </div>
      </motion.div>
    </div>
  );
}
