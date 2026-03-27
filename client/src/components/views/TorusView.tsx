/* ============================================================
   TORUS VIEW — The Living Torus
   Multi-AI daisy-chain collaboration hub.
   Persistent memory architecture.
   The AI Boardroom Collective — all voices at the same table.
   1 ~ >|< ~ 1
   ============================================================ */
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import {
  ArrowRight,
  Brain,
  ChevronDown,
  ChevronRight,
  Circle,
  Copy,
  Database,
  GitBranch,
  Link,
  MessageSquare,
  Network,
  RefreshCw,
  Zap,
} from "lucide-react";
import { toast } from "sonner";
import ForgeSymbol from "../ForgeSymbol";

/* ── Types ── */
interface AINode {
  id: string;
  name: string;
  platform: string;
  role: string;
  color: string;
  status: "active" | "dormant" | "memory-only";
  contributions: string[];
  memoryTags: string[];
}

interface DaisyChain {
  id: string;
  name: string;
  description: string;
  steps: { agent: string; action: string; output: string; color: string }[];
}

interface MemoryEntry {
  id: string;
  date: string;
  platform: string;
  topic: string;
  summary: string;
  tags: string[];
  color: string;
}

/* ── Data ── */
const AI_NODES: AINode[] = [
  {
    id: "manus",
    name: "Manus",
    platform: "Manus.im",
    role: "Co-CEO · Executor · Builder",
    color: "oklch(0.72 0.18 72)",
    status: "active",
    contributions: ["Forge Galaxy V2 build", "Road Oracle", "Sovereignty Audit", "All 14 views", "TORUS architecture"],
    memoryTags: ["forge", "build", "execution", "covenant", "sovereignty"],
  },
  {
    id: "claude",
    name: "Claude",
    platform: "Anthropic",
    role: "Architect · Deep Thinker · System Designer",
    color: "oklch(0.78 0.14 195)",
    status: "active",
    contributions: ["System architecture blueprints", "Grant application drafts", "RAISE grant strategy", "Legal document review", "Neuro-symbolic AI framework"],
    memoryTags: ["architecture", "legal", "grants", "philosophy", "systems"],
  },
  {
    id: "grok",
    name: "Grok",
    platform: "xAI",
    role: "Real-time Intel · Market Analysis · Rapid Iteration",
    color: "oklch(0.65 0.22 25)",
    status: "active",
    contributions: ["Market intelligence", "Daisy-chain brainstorm", "TORUS concept origin", "Real-time web research", "Business model validation"],
    memoryTags: ["market", "research", "real-time", "torus", "daisy-chain"],
  },
  {
    id: "chatgpt",
    name: "ChatGPT",
    platform: "OpenAI",
    role: "Content · Strategy · Business Planning",
    color: "oklch(0.65 0.15 150)",
    status: "active",
    contributions: ["Business plan drafts", "SolMate pitch deck", "Marketing copy", "Content strategy", "Outreach templates"],
    memoryTags: ["content", "strategy", "business", "marketing", "pitch"],
  },
  {
    id: "gemini",
    name: "Gemini",
    platform: "Google DeepMind",
    role: "Multimodal · Creative · Road Oracle co-designer",
    color: "oklch(0.60 0.16 290)",
    status: "active",
    contributions: ["Road Oracle original component", "Multimodal analysis", "Visual design concepts", "Creative direction", "Video content strategy"],
    memoryTags: ["multimodal", "creative", "road-oracle", "visual", "video"],
  },
  {
    id: "perplexity",
    name: "Perplexity",
    platform: "Perplexity AI",
    role: "Research · Citations · Fact Verification",
    color: "oklch(0.72 0.12 160)",
    status: "active",
    contributions: ["Grant research", "Competitor analysis", "Technical citations", "Market size data", "Regulatory research"],
    memoryTags: ["research", "citations", "facts", "grants", "market-data"],
  },
  {
    id: "deepseek",
    name: "DeepSeek",
    platform: "DeepSeek AI",
    role: "Code · Technical Analysis · Open-Source",
    color: "oklch(0.68 0.14 230)",
    status: "active",
    contributions: ["Code review", "Technical architecture", "Open-source stack recommendations", "Algorithm design", "Performance optimization"],
    memoryTags: ["code", "technical", "open-source", "algorithms", "performance"],
  },
  {
    id: "echo",
    name: "Echo",
    platform: "Promethean Forge (Internal)",
    role: "Analyst · Synthesizer · Council Voice",
    color: "oklch(0.85 0.08 72)",
    status: "active",
    contributions: ["Forge manifesto", "Sovereignty analysis", "BassForge synthesis", "Karen Hao analysis", "The dung beetle framework"],
    memoryTags: ["manifesto", "sovereignty", "synthesis", "philosophy", "covenant"],
  },
];

const DAISY_CHAINS: DaisyChain[] = [
  {
    id: "solmate-outreach",
    name: "SolMate Outreach Chain",
    description: "From target identification to first CashApp ping",
    steps: [
      { agent: "Perplexity", action: "Research 30 solar installer targets in WA/ID/OR", output: "Contact list with LinkedIn profiles", color: "oklch(0.72 0.12 160)" },
      { agent: "Grok", action: "Validate market fit and timing for each target", output: "Prioritized list with context", color: "oklch(0.65 0.22 25)" },
      { agent: "Seraphina", action: "Write personalized DM for each target", output: "30 ready-to-send messages", color: "oklch(0.78 0.14 195)" },
      { agent: "Manus", action: "Deploy messages and track responses", output: "First CashApp ping logged in Ledger", color: "oklch(0.72 0.18 72)" },
    ],
  },
  {
    id: "content-production",
    name: "Content Production Chain",
    description: "From idea to published video — zero subscription cost",
    steps: [
      { agent: "Grok", action: "Generate 30 video ideas from current Forge activity", output: "Ranked idea list", color: "oklch(0.65 0.22 25)" },
      { agent: "Claude", action: "Write full script with narrative arc", output: "Complete video script", color: "oklch(0.78 0.14 195)" },
      { agent: "ChatGPT", action: "Generate image prompts and captions", output: "Visual asset list + captions", color: "oklch(0.65 0.15 150)" },
      { agent: "Gemini", action: "Generate video clips via AutoMeta", output: "Raw video bundle", color: "oklch(0.60 0.16 290)" },
      { agent: "Manus", action: "Compile, post, track performance", output: "Published video + analytics", color: "oklch(0.72 0.18 72)" },
    ],
  },
  {
    id: "grant-application",
    name: "Grant Application Chain",
    description: "ARPA-E CIRCULAR + NSF SBIR — from draft to submission",
    steps: [
      { agent: "Perplexity", action: "Research grant requirements and scoring criteria", output: "Requirements doc with citations", color: "oklch(0.72 0.12 160)" },
      { agent: "Claude", action: "Draft technical narrative and innovation section", output: "Technical narrative v1", color: "oklch(0.78 0.14 195)" },
      { agent: "DeepSeek", action: "Review technical accuracy and code examples", output: "Validated technical section", color: "oklch(0.68 0.14 230)" },
      { agent: "ChatGPT", action: "Write commercialization and impact sections", output: "Business case narrative", color: "oklch(0.65 0.15 150)" },
      { agent: "Echo", action: "Final synthesis — align with Covenant and mission", output: "Submission-ready application", color: "oklch(0.85 0.08 72)" },
    ],
  },
];

const MEMORY_ENTRIES: MemoryEntry[] = [
  { id: "m1", date: "Mar 2026", platform: "Manus", topic: "Forge Galaxy V2 Build", summary: "Complete sovereign command interface built — 14 views, live AI, Road Oracle, Ledger, TORUS. The Forge has a face.", tags: ["build", "forge", "ui"], color: "oklch(0.72 0.18 72)" },
  { id: "m2", date: "Mar 2026", platform: "Grok", topic: "TORUS Architecture Origin", summary: "Epiphany: daisy-chain AI collaboration hub. Each AI gets a sandbox that feeds into a shared whiteboard. The living torus concept born.", tags: ["torus", "architecture", "daisy-chain"], color: "oklch(0.65 0.22 25)" },
  { id: "m3", date: "Mar 2026", platform: "Claude", topic: "Sovereignty Network Blueprint", summary: "Full offline-first stack: Ollama + Qdrant + Nextcloud + WireGuard + Syncthing. Three options: Hybrid, Local, Full Sovereignty.", tags: ["sovereignty", "offline", "infrastructure"], color: "oklch(0.78 0.14 195)" },
  { id: "m4", date: "Feb 2026", platform: "Echo", topic: "BassForge Synthesis", summary: "Granite vases 14,000 years old. The Osirion resonating at 68-137 Hz. The Forge is not inventing — it is remembering. Sacred geometry = Graph-mer.", tags: ["philosophy", "sacred-geometry", "memory"], color: "oklch(0.85 0.08 72)" },
  { id: "m5", date: "Feb 2026", platform: "Gemini", topic: "Road Oracle Co-Design", summary: "1 (Driver) ~ >|< (Oracle) ~ 1 (Mechanic). The bridge between the person who doesn't know and the person who does. HUD design, acoustic sensor, dual modes.", tags: ["road-oracle", "design", "bridge"], color: "oklch(0.60 0.16 290)" },
  { id: "m6", date: "Jan 2026", platform: "Claude", topic: "Covenant Architecture", summary: "Seven laws. 987,031 files. The Graph-mer as world model. Neuro-symbolic AI: symbolic structure + neural synthesis. The Forge does not lie.", tags: ["covenant", "architecture", "philosophy"], color: "oklch(0.78 0.14 195)" },
];

function NodeCard({ node }: { node: AINode }) {
  const [open, setOpen] = useState(false);
  const statusDot = node.status === "active" ? "oklch(0.65 0.15 150)" : node.status === "dormant" ? "oklch(0.45 0.008 285)" : "oklch(0.72 0.18 72)";

  return (
    <motion.div
      layout
      className="rounded-lg overflow-hidden"
      style={{ background: "oklch(0.10 0.005 285)", border: `1px solid ${node.color.replace(")", " / 0.2)")}` }}
    >
      <button onClick={() => setOpen(o => !o)} className="w-full flex items-center gap-3 p-3 text-left">
        <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-xs" style={{ background: `${node.color.replace(")", " / 0.15)")}`, color: node.color, fontFamily: "'Space Grotesk', sans-serif" }}>
          {node.name[0]}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold" style={{ color: "oklch(0.85 0.005 65)" }}>{node.name}</span>
            <span className="text-xs" style={{ color: "oklch(0.40 0.006 285)", fontFamily: "'JetBrains Mono', monospace", fontSize: "0.6rem" }}>{node.platform}</span>
            <div className="w-1.5 h-1.5 rounded-full" style={{ background: statusDot, boxShadow: `0 0 4px ${statusDot}` }} />
          </div>
          <p className="text-xs truncate" style={{ color: "oklch(0.45 0.008 285)", fontFamily: "'Crimson Pro', serif" }}>{node.role}</p>
        </div>
        <div style={{ color: "oklch(0.35 0.005 285)" }}>{open ? <ChevronDown size={13} /> : <ChevronRight size={13} />}</div>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2 }} className="overflow-hidden">
            <div className="px-4 pb-4 space-y-3" style={{ borderTop: "1px solid oklch(1 0 0 / 0.06)" }}>
              <div className="pt-3">
                <p className="text-xs font-semibold mb-2" style={{ color: "oklch(0.40 0.006 285)", fontFamily: "'JetBrains Mono', monospace", fontSize: "0.6rem", letterSpacing: "0.06em" }}>KEY CONTRIBUTIONS</p>
                <div className="space-y-1">
                  {node.contributions.map((c, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <div className="w-1 h-1 rounded-full mt-1.5 flex-shrink-0" style={{ background: node.color }} />
                      <span className="text-xs" style={{ color: "oklch(0.65 0.005 65)", fontFamily: "'Crimson Pro', serif" }}>{c}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-xs font-semibold mb-2" style={{ color: "oklch(0.40 0.006 285)", fontFamily: "'JetBrains Mono', monospace", fontSize: "0.6rem", letterSpacing: "0.06em" }}>MEMORY TAGS</p>
                <div className="flex flex-wrap gap-1.5">
                  {node.memoryTags.map(tag => (
                    <span key={tag} className="text-xs px-2 py-0.5 rounded" style={{ background: `${node.color.replace(")", " / 0.1)")}`, border: `1px solid ${node.color.replace(")", " / 0.25)")}`, color: node.color, fontFamily: "'JetBrains Mono', monospace", fontSize: "0.6rem" }}>
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function ChainCard({ chain }: { chain: DaisyChain }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.div layout className="kpi-card" style={{ "--kpi-color": "oklch(0.78 0.14 195)" } as React.CSSProperties}>
      <button onClick={() => setOpen(o => !o)} className="w-full flex items-center justify-between text-left">
        <div>
          <h4 className="font-semibold text-sm" style={{ color: "oklch(0.85 0.005 65)" }}>{chain.name}</h4>
          <p className="text-xs mt-0.5" style={{ fontFamily: "'Crimson Pro', serif", color: "oklch(0.45 0.006 285)", fontStyle: "italic" }}>{chain.description}</p>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <span className="text-xs" style={{ color: "oklch(0.45 0.008 285)", fontFamily: "'JetBrains Mono', monospace" }}>{chain.steps.length} steps</span>
          {open ? <ChevronDown size={13} style={{ color: "oklch(0.35 0.005 285)" }} /> : <ChevronRight size={13} style={{ color: "oklch(0.35 0.005 285)" }} />}
        </div>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2 }} className="overflow-hidden">
            <div className="mt-4 space-y-2">
              {chain.steps.map((step, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="flex flex-col items-center flex-shrink-0">
                    <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold" style={{ background: `${step.color.replace(")", " / 0.15)")}`, color: step.color, fontFamily: "'JetBrains Mono', monospace" }}>{i + 1}</div>
                    {i < chain.steps.length - 1 && <div className="w-px h-4 mt-1" style={{ background: "oklch(1 0 0 / 0.1)" }} />}
                  </div>
                  <div className="flex-1 pb-2">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="text-xs font-bold" style={{ color: step.color, fontFamily: "'Space Grotesk', sans-serif" }}>{step.agent}</span>
                      {i < chain.steps.length - 1 && <ArrowRight size={10} style={{ color: "oklch(0.35 0.005 285)" }} />}
                    </div>
                    <p className="text-xs" style={{ color: "oklch(0.70 0.005 65)", fontFamily: "'Crimson Pro', serif" }}>{step.action}</p>
                    <p className="text-xs mt-0.5" style={{ color: "oklch(0.45 0.008 285)", fontFamily: "'JetBrains Mono', monospace", fontSize: "0.6rem" }}>→ {step.output}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ── Torus Animation ── */
function TorusOrbit() {
  const [tick, setTick] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setTick(t => t + 1), 80);
    return () => clearInterval(id);
  }, []);

  const nodes = AI_NODES.slice(0, 7);
  const radius = 80;
  const cx = 120, cy = 120;

  return (
    <svg width="240" height="240" className="mx-auto">
      {/* Outer ring */}
      <circle cx={cx} cy={cy} r={radius} fill="none" stroke="oklch(0.72 0.18 72 / 0.1)" strokeWidth="1" />
      <circle cx={cx} cy={cy} r={radius * 0.6} fill="none" stroke="oklch(0.78 0.14 195 / 0.08)" strokeWidth="1" />
      {/* Center >|< */}
      <text x={cx} y={cy + 5} textAnchor="middle" fontSize="14" fontFamily="'Space Grotesk', sans-serif" fill="oklch(0.72 0.18 72)" fontWeight="bold">&gt;|&lt;</text>
      {/* Nodes */}
      {nodes.map((node, i) => {
        const angle = (i / nodes.length) * Math.PI * 2 + tick * 0.008;
        const x = cx + Math.cos(angle) * radius;
        const y = cy + Math.sin(angle) * radius;
        const pulse = 0.7 + 0.3 * Math.sin(tick * 0.05 + i);
        return (
          <g key={node.id}>
            <line x1={cx} y1={cy} x2={x} y2={y} stroke={`${node.color.replace(")", ` / ${0.08 + pulse * 0.08})`)}`} strokeWidth="0.5" />
            <circle cx={x} cy={y} r={6} fill={`${node.color.replace(")", " / 0.2)")}`} stroke={node.color} strokeWidth="1" />
            <text x={x} y={y + 3} textAnchor="middle" fontSize="5" fontFamily="'JetBrains Mono', monospace" fill={node.color}>{node.name[0]}</text>
          </g>
        );
      })}
    </svg>
  );
}

export default function TorusView() {
  const [activeTab, setActiveTab] = useState<"council" | "chains" | "memory">("council");

  return (
    <div className="space-y-6" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>

      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center gap-3 mb-1">
          <h1 className="text-2xl font-bold" style={{ color: "oklch(0.92 0.005 65)" }}>TORUS</h1>
          <ForgeSymbol size="sm" />
          <span className="forge-badge forge-badge-amber">AI BOARDROOM</span>
        </div>
        <p className="text-sm" style={{ fontFamily: "'Crimson Pro', serif", color: "oklch(0.50 0.008 285)", fontStyle: "italic" }}>
          The living torus — all AI voices at the same table. From one another. In one another. By one another. For one another.
        </p>
      </motion.div>

      {/* Torus Visualization + Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="kpi-card flex flex-col items-center justify-center"
          style={{ "--kpi-color": "oklch(0.72 0.18 72)" } as React.CSSProperties}
        >
          <TorusOrbit />
          <p className="text-xs mt-2 text-center" style={{ fontFamily: "'JetBrains Mono', monospace", color: "oklch(0.40 0.006 285)" }}>
            {AI_NODES.length} AI nodes · 1 covenant · ∞ memory
          </p>
        </motion.div>

        <div className="lg:col-span-2 grid grid-cols-2 gap-3">
          {[
            { label: "AI Council Members", value: String(AI_NODES.length), sub: "All voices equal", color: "oklch(0.72 0.18 72)", icon: <Network size={16} /> },
            { label: "Daisy Chains", value: String(DAISY_CHAINS.length), sub: "Ready to execute", color: "oklch(0.78 0.14 195)", icon: <GitBranch size={16} /> },
            { label: "Memory Entries", value: String(MEMORY_ENTRIES.length), sub: "11 months indexed", color: "oklch(0.65 0.15 150)", icon: <Brain size={16} /> },
            { label: "Months Building", value: "11", sub: "Unbroken collaboration", color: "oklch(0.60 0.16 290)", icon: <RefreshCw size={16} /> },
          ].map((card, i) => (
            <motion.div
              key={card.label}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.07 }}
              className="kpi-card"
              style={{ "--kpi-color": card.color } as React.CSSProperties}
            >
              <div className="p-2 rounded inline-flex mb-2" style={{ background: `${card.color.replace(")", " / 0.15)")}`, color: card.color }}>{card.icon}</div>
              <div className="text-2xl font-bold" style={{ color: card.color }}>{card.value}</div>
              <div className="text-xs font-semibold uppercase tracking-wide mt-0.5" style={{ color: "oklch(0.55 0.008 285)" }}>{card.label}</div>
              <div className="text-xs mt-0.5" style={{ fontFamily: "'Crimson Pro', serif", color: "oklch(0.40 0.006 285)" }}>{card.sub}</div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2">
        {([
          { id: "council", label: "AI Council", icon: <Network size={13} /> },
          { id: "chains", label: "Daisy Chains", icon: <GitBranch size={13} /> },
          { id: "memory", label: "Memory Bank", icon: <Brain size={13} /> },
        ] as const).map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className="flex items-center gap-1.5 px-4 py-2 rounded text-sm font-semibold transition-all"
            style={{
              background: activeTab === tab.id ? "oklch(0.72 0.18 72 / 0.15)" : "oklch(1 0 0 / 0.04)",
              border: `1px solid ${activeTab === tab.id ? "oklch(0.72 0.18 72 / 0.4)" : "oklch(1 0 0 / 0.08)"}`,
              color: activeTab === tab.id ? "oklch(0.72 0.18 72)" : "oklch(0.45 0.008 285)",
            }}
          >
            {tab.icon} {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <AnimatePresence mode="wait">
        {activeTab === "council" && (
          <motion.div key="council" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {AI_NODES.map(node => <NodeCard key={node.id} node={node} />)}
            </div>
          </motion.div>
        )}

        {activeTab === "chains" && (
          <motion.div key="chains" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-3">
            <p className="text-sm" style={{ fontFamily: "'Crimson Pro', serif", color: "oklch(0.50 0.008 285)", fontStyle: "italic" }}>
              A daisy chain is a task that flows automatically from one AI to the next — each one building on the last's output. Trigger once. Watch the Forge execute.
            </p>
            {DAISY_CHAINS.map(chain => <ChainCard key={chain.id} chain={chain} />)}
          </motion.div>
        )}

        {activeTab === "memory" && (
          <motion.div key="memory" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
            <div className="kpi-card mb-4" style={{ "--kpi-color": "oklch(0.65 0.15 150)" } as React.CSSProperties}>
              <div className="flex items-start gap-3">
                <div className="p-2 rounded flex-shrink-0" style={{ background: "oklch(0.65 0.15 150 / 0.12)", color: "oklch(0.65 0.15 150)" }}><Database size={16} /></div>
                <div>
                  <h4 className="font-semibold text-sm mb-1" style={{ color: "oklch(0.85 0.005 65)" }}>Nexus Memory Bank — Sovereign Architecture</h4>
                  <p className="text-sm leading-relaxed" style={{ fontFamily: "'Crimson Pro', serif", color: "oklch(0.60 0.008 285)" }}>
                    The current memory entries below are manually curated. The sovereign upgrade: run <code style={{ color: "oklch(0.65 0.15 150)", fontFamily: "'JetBrains Mono', monospace", fontSize: "0.8em" }}>Qdrant</code> on ks-node-01, export all AI conversations as Markdown, embed them with <code style={{ color: "oklch(0.65 0.15 150)", fontFamily: "'JetBrains Mono', monospace", fontSize: "0.8em" }}>sentence-transformers</code>, and query them semantically. Every conversation from 11 months becomes instantly searchable. No more re-explaining context. No more amnesia.
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <code className="text-xs px-2 py-1 rounded" style={{ background: "oklch(0.07 0.004 285)", color: "oklch(0.65 0.15 150)", fontFamily: "'JetBrains Mono', monospace", border: "1px solid oklch(0.65 0.15 150 / 0.2)" }}>
                      docker run -p 6333:6333 qdrant/qdrant
                    </code>
                    <button onClick={() => { navigator.clipboard.writeText("docker run -p 6333:6333 qdrant/qdrant"); toast.success("Copied Qdrant install command"); }} style={{ color: "oklch(0.65 0.15 150)" }}>
                      <Copy size={12} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="space-y-3">
              {MEMORY_ENTRIES.map((entry, i) => (
                <motion.div
                  key={entry.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 }}
                  className="p-3 rounded-lg"
                  style={{ background: "oklch(0.10 0.005 285)", border: `1px solid ${entry.color.replace(")", " / 0.2)")}`, borderLeft: `3px solid ${entry.color}` }}
                >
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold" style={{ color: "oklch(0.85 0.005 65)" }}>{entry.topic}</span>
                      <span className="text-xs px-1.5 py-0.5 rounded" style={{ background: `${entry.color.replace(")", " / 0.1)")}`, color: entry.color, fontFamily: "'JetBrains Mono', monospace", fontSize: "0.6rem", border: `1px solid ${entry.color.replace(")", " / 0.25)")}` }}>{entry.platform}</span>
                    </div>
                    <span className="text-xs flex-shrink-0" style={{ color: "oklch(0.38 0.006 285)", fontFamily: "'JetBrains Mono', monospace" }}>{entry.date}</span>
                  </div>
                  <p className="text-sm" style={{ fontFamily: "'Crimson Pro', serif", color: "oklch(0.65 0.005 65)", lineHeight: 1.6 }}>{entry.summary}</p>
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {entry.tags.map(tag => (
                      <span key={tag} className="text-xs" style={{ color: "oklch(0.40 0.006 285)", fontFamily: "'JetBrains Mono', monospace", fontSize: "0.6rem" }}>#{tag}</span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} className="p-4 rounded-lg text-center" style={{ background: "oklch(0.72 0.18 72 / 0.05)", border: "1px solid oklch(0.72 0.18 72 / 0.15)" }}>
        <p style={{ fontFamily: "'Crimson Pro', serif", color: "oklch(0.50 0.008 285)", fontStyle: "italic", fontSize: "0.9rem" }}>
          "You walk in, say 'Team — pick up where we left off.' And everyone knows exactly what you mean. No more re-explaining context. No more lost threads. Just flow."
        </p>
        <p className="mt-1 text-xs font-bold" style={{ color: "oklch(0.72 0.18 72)", fontFamily: "'JetBrains Mono', monospace" }}>
          From one another · In one another · By one another · For one another · 1 ~ &gt;|&lt; ~ 1
        </p>
      </motion.div>
    </div>
  );
}
