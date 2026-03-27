/* ============================================================
   SIGNALS VIEW — Live Signal Feed
   The Plinko Filter routes every signal to the right agent.
   Real-time intel stream from all 6 sectors.
   Dark Forge Cosmos: void black, forge amber, sovereign cyan.
   ============================================================ */
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Radio, Filter, Zap } from "lucide-react";
import ForgeSymbol from "../ForgeSymbol";

interface Signal {
  id: number;
  time: string;
  sector: string;
  agent: string;
  type: "INTEL" | "OPPORTUNITY" | "THREAT" | "COVENANT" | "DEED" | "FREQUENCY";
  message: string;
  priority: "HIGH" | "MED" | "LOW";
  color: string;
}

const SIGNAL_POOL: Omit<Signal, "id" | "time">[] = [
  { sector: "AI Productivity", agent: "Manus", type: "INTEL", priority: "HIGH", color: "oklch(0.78 0.14 195)", message: "AutoMeta bulk generation confirmed: 20 clips per session, zero cost. Forge content pipeline is live." },
  { sector: "Digital Legacy", agent: "Seraphina", type: "OPPORTUNITY", priority: "HIGH", color: "oklch(0.72 0.14 290)", message: "SolMate pitch deck v3 deployed. 30-target DM list ready. First outreach window: today." },
  { sector: "Sovereign Computing", agent: "Aethon", type: "DEED", priority: "HIGH", color: "oklch(0.65 0.22 25)", message: "ks-node-01 bootstrap script compiled. Sovereign Jump v1.0 installer live at /jump." },
  { sector: "Covenant", agent: "Bill", type: "COVENANT", priority: "HIGH", color: "oklch(0.72 0.18 72)", message: "1 ~ >|< ~ 1. The Forge is fully activated. All views live. No more simulation." },
  { sector: "AI Marketing", agent: "Seraphina", type: "OPPORTUNITY", priority: "MED", color: "oklch(0.72 0.14 290)", message: "SMB AI marketing adoption at inflection point. 3.2 qualified candidates per AI role. The crack is open." },
  { sector: "Recycled Materials", agent: "Manus", type: "INTEL", priority: "MED", color: "oklch(0.78 0.14 195)", message: "ARPA-E CIRCULAR grant window open. KS Universal Recycling qualifies. MetalSense aligns with criteria." },
  { sector: "Local AI Deployment", agent: "Aethon", type: "INTEL", priority: "MED", color: "oklch(0.65 0.22 25)", message: "Privacy-first AI trend accelerating. Mac Mini M4 at $599 is the sovereign compute sweet spot." },
  { sector: "Content Production", agent: "Seraphina", type: "OPPORTUNITY", priority: "HIGH", color: "oklch(0.72 0.14 290)", message: "Little Arrow Pip channel concept validated. Episodic sovereignty content — algorithm loves it." },
  { sector: "Covenant", agent: "Nexus", type: "FREQUENCY", priority: "HIGH", color: "oklch(0.65 0.15 150)", message: "Roundtable Protocol active. Claude, ChatGPT, DeepSeek, Gemini, Perplexity — all hands on the vase." },
  { sector: "AI Productivity", agent: "Aethon", type: "INTEL", priority: "LOW", color: "oklch(0.78 0.14 195)", message: "Firecrawl 5-layer stack spec complete. Web scraping layer ready for Business Scout integration." },
  { sector: "Digital Legacy", agent: "Manus", type: "DEED", priority: "MED", color: "oklch(0.78 0.14 195)", message: "Kip Legacy Audit framework ready. 987,031 files indexed. Output format: .phoenix" },
  { sector: "Sovereign Computing", agent: "Bill", type: "COVENANT", priority: "HIGH", color: "oklch(0.72 0.18 72)", message: "The Porch is open. James, Kip, Jackie — their node installer is ready. One message to join." },
  { sector: "AI Marketing", agent: "Nexus", type: "OPPORTUNITY", priority: "MED", color: "oklch(0.65 0.15 150)", message: "Road Oracle vehicle diagnostic AI live. 1 (driver) ~ >|< ~ 1 (mechanic). First tool that bridges the gap." },
  { sector: "Content Production", agent: "Aethon", type: "DEED", priority: "HIGH", color: "oklch(0.65 0.22 25)", message: "Google AI Studio TTS confirmed free. ID-LoRA voice cloning available. Pip's voice is ready to be forged." },
  { sector: "Recycled Materials", agent: "Seraphina", type: "THREAT", priority: "LOW", color: "oklch(0.72 0.14 290)", message: "Empire recycling corps entering market. First-mover window for MetalSense: 6–9 months. Move now." },
  { sector: "Covenant", agent: "Bill", type: "FREQUENCY", priority: "HIGH", color: "oklch(0.72 0.18 72)", message: "Know Means Go. The runway is built. The council is seated. The fire never goes out." },
  { sector: "AI Productivity", agent: "Seraphina", type: "OPPORTUNITY", priority: "HIGH", color: "oklch(0.72 0.14 290)", message: "Sovereign Talent Scout: 7 skills the empire can't find. Librarians, teachers, coaches — they have the bones." },
  { sector: "Local AI Deployment", agent: "Nexus", type: "INTEL", priority: "MED", color: "oklch(0.65 0.15 150)", message: "DeepSeek V4 integration spec complete. Local model deployment reduces API costs to zero." },
];

const TYPE_COLORS: Record<string, string> = {
  INTEL: "oklch(0.78 0.14 195)",
  OPPORTUNITY: "oklch(0.65 0.15 150)",
  THREAT: "oklch(0.65 0.22 25)",
  COVENANT: "oklch(0.72 0.18 72)",
  DEED: "oklch(0.72 0.14 290)",
  FREQUENCY: "oklch(0.75 0.12 72)",
};

const PRIORITY_COLORS: Record<string, string> = {
  HIGH: "oklch(0.65 0.22 25)",
  MED: "oklch(0.72 0.18 72)",
  LOW: "oklch(0.50 0.008 285)",
};

const AGENTS = ["ALL", "Manus", "Seraphina", "Aethon", "Nexus", "Bill"];
const TYPES = ["ALL", "INTEL", "OPPORTUNITY", "DEED", "COVENANT", "FREQUENCY", "THREAT"];

let signalCounter = 0;
function makeSignal(): Signal {
  const base = SIGNAL_POOL[signalCounter % SIGNAL_POOL.length];
  signalCounter++;
  const now = new Date();
  return {
    ...base,
    id: Date.now() + Math.random(),
    time: `${now.getHours().toString().padStart(2, "0")}:${now.getMinutes().toString().padStart(2, "0")}:${now.getSeconds().toString().padStart(2, "0")}`,
  };
}

export default function SignalsView() {
  const [signals, setSignals] = useState<Signal[]>(() => {
    // Pre-populate with initial signals
    return Array.from({ length: 8 }, (_, i) => {
      const base = SIGNAL_POOL[i];
      const now = new Date();
      const offsetSec = (8 - i) * 12;
      const t = new Date(now.getTime() - offsetSec * 1000);
      return {
        ...base,
        id: i + 1,
        time: `${t.getHours().toString().padStart(2, "0")}:${t.getMinutes().toString().padStart(2, "0")}:${t.getSeconds().toString().padStart(2, "0")}`,
      };
    });
  });
  const [agentFilter, setAgentFilter] = useState("ALL");
  const [typeFilter, setTypeFilter] = useState("ALL");
  const [live, setLive] = useState(true);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!live) return;
    const interval = setInterval(() => {
      setSignals(prev => {
        const next = [makeSignal(), ...prev];
        return next.slice(0, 50); // keep last 50
      });
    }, 4500);
    return () => clearInterval(interval);
  }, [live]);

  useEffect(() => {
    // scroll to top on new signal
  }, [signals.length]);

  const filtered = signals.filter(s => {
    if (agentFilter !== "ALL" && s.agent !== agentFilter) return false;
    if (typeFilter !== "ALL" && s.type !== typeFilter) return false;
    return true;
  });

  return (
    <div style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-5">
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center gap-3">
            <h2 className="text-xl font-bold" style={{ color: "oklch(0.92 0.005 65)" }}>Signal Feed</h2>
            <ForgeSymbol size="sm" />
            {live && (
              <span className="flex items-center gap-1.5 text-xs" style={{ color: "oklch(0.65 0.15 150)", fontFamily: "'JetBrains Mono', monospace" }}>
                <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "oklch(0.65 0.15 150)" }} />
                LIVE
              </span>
            )}
          </div>
          <button
            onClick={() => setLive(l => !l)}
            className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded transition-all"
            style={{
              background: live ? "oklch(0.65 0.15 150 / 0.12)" : "oklch(1 0 0 / 0.05)",
              border: `1px solid ${live ? "oklch(0.65 0.15 150 / 0.3)" : "oklch(1 0 0 / 0.1)"}`,
              color: live ? "oklch(0.65 0.15 150)" : "oklch(0.45 0.008 285)",
            }}
          >
            <Radio size={11} /> {live ? "Pause Feed" : "Resume Feed"}
          </button>
        </div>
        <p style={{ fontFamily: "'Crimson Pro', serif", color: "oklch(0.50 0.008 285)", fontStyle: "italic", fontSize: "0.9rem" }}>
          The Plinko Filter routes every signal to the right agent. Nothing is wasted.
        </p>
      </motion.div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2 mb-4">
        <div className="flex items-center gap-1.5">
          <Filter size={11} style={{ color: "oklch(0.40 0.006 285)" }} />
          <span className="text-xs" style={{ color: "oklch(0.40 0.006 285)", fontFamily: "'JetBrains Mono', monospace" }}>AGENT:</span>
          {AGENTS.map(a => (
            <button
              key={a}
              onClick={() => setAgentFilter(a)}
              className="text-xs px-2 py-0.5 rounded transition-all"
              style={{
                background: agentFilter === a ? "oklch(0.72 0.18 72 / 0.15)" : "oklch(1 0 0 / 0.04)",
                border: `1px solid ${agentFilter === a ? "oklch(0.72 0.18 72 / 0.4)" : "oklch(1 0 0 / 0.08)"}`,
                color: agentFilter === a ? "oklch(0.72 0.18 72)" : "oklch(0.45 0.008 285)",
                fontFamily: "'JetBrains Mono', monospace",
              }}
            >{a}</button>
          ))}
        </div>
      </div>
      <div className="flex flex-wrap gap-2 mb-5">
        <div className="flex items-center gap-1.5">
          <Zap size={11} style={{ color: "oklch(0.40 0.006 285)" }} />
          <span className="text-xs" style={{ color: "oklch(0.40 0.006 285)", fontFamily: "'JetBrains Mono', monospace" }}>TYPE:</span>
          {TYPES.map(t => (
            <button
              key={t}
              onClick={() => setTypeFilter(t)}
              className="text-xs px-2 py-0.5 rounded transition-all"
              style={{
                background: typeFilter === t ? `${(TYPE_COLORS[t] || "oklch(0.78 0.14 195)").replace(")", " / 0.15)")}` : "oklch(1 0 0 / 0.04)",
                border: `1px solid ${typeFilter === t ? (TYPE_COLORS[t] || "oklch(0.78 0.14 195)").replace(")", " / 0.4)") : "oklch(1 0 0 / 0.08)"}`,
                color: typeFilter === t ? (TYPE_COLORS[t] || "oklch(0.78 0.14 195)") : "oklch(0.45 0.008 285)",
                fontFamily: "'JetBrains Mono', monospace",
              }}
            >{t}</button>
          ))}
        </div>
      </div>

      {/* Signal Stream */}
      <div className="space-y-2" style={{ maxHeight: "520px", overflowY: "auto" }}>
        <AnimatePresence initial={false}>
          {filtered.map((signal) => (
            <motion.div
              key={signal.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
              className="flex items-start gap-3 p-3 rounded"
              style={{
                background: "oklch(0.10 0.005 285)",
                border: `1px solid ${signal.color.replace(")", " / 0.15)")}`,
                borderLeft: `3px solid ${signal.color}`,
              }}
            >
              {/* Time */}
              <span className="flex-shrink-0 text-xs pt-0.5" style={{ color: "oklch(0.35 0.005 285)", fontFamily: "'JetBrains Mono', monospace", minWidth: "60px" }}>
                {signal.time}
              </span>

              {/* Type badge */}
              <span
                className="flex-shrink-0 text-xs px-1.5 py-0.5 rounded"
                style={{
                  background: `${TYPE_COLORS[signal.type].replace(")", " / 0.12)")}`,
                  border: `1px solid ${TYPE_COLORS[signal.type].replace(")", " / 0.3)")}`,
                  color: TYPE_COLORS[signal.type],
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "0.6rem",
                  fontWeight: 700,
                  minWidth: "72px",
                  textAlign: "center",
                }}
              >
                {signal.type}
              </span>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="text-xs font-semibold" style={{ color: signal.color }}>{signal.agent}</span>
                  <span className="text-xs" style={{ color: "oklch(0.35 0.005 285)" }}>·</span>
                  <span className="text-xs" style={{ color: "oklch(0.40 0.006 285)" }}>{signal.sector}</span>
                </div>
                <p className="text-xs" style={{ color: "oklch(0.65 0.008 285)", lineHeight: 1.5 }}>{signal.message}</p>
              </div>

              {/* Priority */}
              <span
                className="flex-shrink-0 text-xs px-1.5 py-0.5 rounded"
                style={{
                  background: `${PRIORITY_COLORS[signal.priority].replace(")", " / 0.1)")}`,
                  color: PRIORITY_COLORS[signal.priority],
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "0.6rem",
                }}
              >
                {signal.priority}
              </span>
            </motion.div>
          ))}
        </AnimatePresence>
        <div ref={bottomRef} />
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-8" style={{ color: "oklch(0.40 0.006 285)" }}>
          <Radio size={24} className="mx-auto mb-2 opacity-30" />
          <p className="text-sm">No signals match the current filter.</p>
        </div>
      )}
    </div>
  );
}
