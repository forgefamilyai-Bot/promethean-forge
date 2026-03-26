/* ============================================================
   ECOSYSTEM VIEW — The Pond View
   Water Level, Ecosystem Health, Sacred Space Protocol
   ============================================================ */
import { motion } from "framer-motion";
import { Activity, Droplets, Heart, Shield, Zap } from "lucide-react";
import ForgeSymbol from "../ForgeSymbol";

const METRICS = [
  { label: "Water Level", value: "87%", icon: <Droplets size={18} />, color: "oklch(0.78 0.14 195)", desc: "System hydration — data flow health" },
  { label: "Ecosystem Health", value: "STRONG", icon: <Heart size={18} />, color: "oklch(0.65 0.15 150)", desc: "All nodes communicating" },
  { label: "Sacred Space", value: "ACTIVE", icon: <Shield size={18} />, color: "oklch(0.72 0.18 72)", desc: "Ethics & alignment check: PASS" },
  { label: "Energy Output", value: "94%", icon: <Zap size={18} />, color: "oklch(0.60 0.16 290)", desc: "Forge fire intensity" },
];

const NODES = [
  { name: "Bill (Forge-Master)", status: "online", color: "oklch(0.72 0.18 72)" },
  { name: "Manus (Co-CEO)", status: "online", color: "oklch(0.78 0.14 195)" },
  { name: "Seraphina (CRO)", status: "online", color: "oklch(0.75 0.12 25)" },
  { name: "Aethon (CTO)", status: "online", color: "oklch(0.72 0.14 290)" },
  { name: "Nexus (Orchestrator)", status: "standby", color: "oklch(0.60 0.16 290)" },
  { name: "James (Family Node)", status: "pending", color: "oklch(0.45 0.008 285)" },
  { name: "Kip (Family Node)", status: "pending", color: "oklch(0.45 0.008 285)" },
  { name: "Jackie (Family Node)", status: "pending", color: "oklch(0.45 0.008 285)" },
];

const statusDot: Record<string, string> = {
  online: "oklch(0.65 0.15 150)",
  standby: "oklch(0.72 0.18 72)",
  pending: "oklch(0.38 0.006 285)",
};

export default function EcosystemView() {
  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-bold" style={{ fontFamily: "'Space Grotesk', sans-serif", color: "oklch(0.92 0.005 65)" }}>
            The Pond View
          </h1>
          <ForgeSymbol size="sm" />
        </div>
        <p className="text-sm mt-0.5" style={{ fontFamily: "'Crimson Pro', serif", color: "oklch(0.50 0.008 285)", fontStyle: "italic" }}>
          Ecosystem health. The living body of the Forge.
        </p>
      </motion.div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {METRICS.map((m, i) => (
          <motion.div
            key={m.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className="kpi-card"
            style={{ "--kpi-color": m.color } as React.CSSProperties}
          >
            <div className="p-2 rounded inline-flex mb-3" style={{ background: `${m.color.replace(")", " / 0.15)")}`, color: m.color }}>
              {m.icon}
            </div>
            <div className="text-xl font-bold" style={{ fontFamily: "'Space Grotesk', sans-serif", color: m.color }}>
              {m.value}
            </div>
            <div className="text-xs font-semibold uppercase tracking-wide mt-0.5" style={{ fontFamily: "'Space Grotesk', sans-serif", color: "oklch(0.55 0.008 285)" }}>
              {m.label}
            </div>
            <div className="text-xs mt-0.5" style={{ fontFamily: "'Crimson Pro', serif", color: "oklch(0.40 0.006 285)" }}>
              {m.desc}
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="kpi-card"
        style={{ "--kpi-color": "oklch(0.78 0.14 195)" } as React.CSSProperties}
      >
        <div className="flex items-center gap-2 mb-4">
          <Activity size={14} style={{ color: "oklch(0.78 0.14 195)" }} />
          <h3 className="text-sm font-semibold" style={{ fontFamily: "'Space Grotesk', sans-serif", color: "oklch(0.85 0.005 65)" }}>
            Network Node Status
          </h3>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {NODES.map((node, i) => (
            <motion.div
              key={node.name}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.45 + i * 0.06 }}
              className="flex items-center gap-2 p-2.5 rounded"
              style={{ background: "oklch(0.12 0.007 285)", border: "1px solid oklch(1 0 0 / 0.06)" }}
            >
              <div
                className="w-2 h-2 rounded-full flex-shrink-0"
                style={{ background: statusDot[node.status], boxShadow: `0 0 6px ${statusDot[node.status]}` }}
              />
              <div>
                <div className="text-xs font-medium" style={{ fontFamily: "'Space Grotesk', sans-serif", color: node.color, fontSize: "0.7rem" }}>
                  {node.name.split(" (")[0]}
                </div>
                <div className="text-xs" style={{ fontFamily: "'JetBrains Mono', monospace", color: "oklch(0.35 0.005 285)", fontSize: "0.6rem" }}>
                  {node.status.toUpperCase()}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="px-4 py-3 rounded"
        style={{ background: "oklch(0.72 0.18 72 / 0.05)", borderLeft: "3px solid oklch(0.72 0.18 72 / 0.4)" }}
      >
        <p className="text-sm" style={{ fontFamily: "'Crimson Pro', serif", color: "oklch(0.72 0.18 72)", fontStyle: "italic" }}>
          "Boot_Sequence: Invocation of the Forge. Shutdown_Sequence: Bank the fire, ember remains.
          Observation_Node: Ethics & Alignment Check. Learning_Node: What did we forge today?"
        </p>
        <p className="text-xs mt-1" style={{ fontFamily: "'JetBrains Mono', monospace", color: "oklch(0.38 0.006 285)" }}>
          — Sacred Space Protocol, Forge Galaxy V2
        </p>
      </motion.div>
    </div>
  );
}
