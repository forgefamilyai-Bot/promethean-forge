/* ============================================================
   MARKET INTEL VIEW — Business Scout Feed
   ============================================================ */
import { motion } from "framer-motion";
import { Globe, TrendingUp } from "lucide-react";
import ForgeSymbol from "../ForgeSymbol";

const INTEL = [
  { sector: "AI Productivity", signal: "STRONG BUY", trend: "+34% YoY adoption", color: "oklch(0.65 0.15 150)" },
  { sector: "Digital Legacy", signal: "EMERGING", trend: "Underserved $2.1B market", color: "oklch(0.72 0.18 72)" },
  { sector: "Recycled Materials", signal: "GRANT READY", trend: "ARPA-E CIRCULAR open", color: "oklch(0.78 0.14 195)" },
  { sector: "Local AI Deployment", signal: "RISING", trend: "Privacy-first trend accelerating", color: "oklch(0.60 0.16 290)" },
  { sector: "AI Marketing Tools", signal: "HOT", trend: "SMB adoption at inflection point", color: "oklch(0.72 0.18 72)" },
  { sector: "Sovereign Computing", signal: "PIONEER", trend: "First-mover advantage available", color: "oklch(0.75 0.12 25)" },
];

export default function MarketView() {
  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-bold" style={{ fontFamily: "'Space Grotesk', sans-serif", color: "oklch(0.92 0.005 65)" }}>
            Market Intel
          </h1>
          <ForgeSymbol size="sm" />
        </div>
        <p className="text-sm mt-0.5" style={{ fontFamily: "'Crimson Pro', serif", color: "oklch(0.50 0.008 285)", fontStyle: "italic" }}>
          Business Scout scanning. Signals from the field.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {INTEL.map((item, i) => (
          <motion.div
            key={item.sector}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className="kpi-card"
            style={{ "--kpi-color": item.color } as React.CSSProperties}
          >
            <div className="flex items-start justify-between mb-2">
              <div className="p-2 rounded" style={{ background: `${item.color.replace(")", " / 0.15)")}`, color: item.color }}>
                <Globe size={16} />
              </div>
              <span className="text-xs px-2 py-0.5 rounded" style={{
                fontFamily: "'JetBrains Mono', monospace", fontSize: "0.6rem",
                background: `${item.color.replace(")", " / 0.15)")}`, color: item.color,
                border: `1px solid ${item.color.replace(")", " / 0.3)")}`,
              }}>
                {item.signal}
              </span>
            </div>
            <h3 className="font-bold text-sm mb-1" style={{ fontFamily: "'Space Grotesk', sans-serif", color: item.color }}>
              {item.sector}
            </h3>
            <div className="flex items-center gap-1.5">
              <TrendingUp size={12} style={{ color: "oklch(0.65 0.15 150)" }} />
              <p className="text-xs" style={{ fontFamily: "'Crimson Pro', serif", color: "oklch(0.60 0.005 65)" }}>
                {item.trend}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="kpi-card"
        style={{ "--kpi-color": "oklch(0.72 0.18 72)" } as React.CSSProperties}
      >
        <p className="text-sm" style={{ fontFamily: "'Crimson Pro', serif", color: "oklch(0.60 0.005 65)", fontStyle: "italic" }}>
          "The Business Scout is always scanning. The Plinko Filter routes every signal to the right agent.
          We don't chase markets — we create them."
        </p>
        <p className="text-xs mt-2" style={{ fontFamily: "'JetBrains Mono', monospace", color: "oklch(0.38 0.006 285)" }}>
          — Manus, Lead Architect
        </p>
      </motion.div>
    </div>
  );
}
