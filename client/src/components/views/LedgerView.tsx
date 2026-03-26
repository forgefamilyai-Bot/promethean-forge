/* ============================================================
   LEDGER VIEW — Financial Sovereignty Tracker
   Revenue, expenses, grants, projections
   Dark Forge Cosmos design
   ============================================================ */
import { motion } from "framer-motion";
import { ArrowDownRight, ArrowUpRight, DollarSign, TrendingUp } from "lucide-react";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import ForgeSymbol from "../ForgeSymbol";

const revenueTargets = [
  { source: "SolMate Seed Round", target: 17500, current: 0, status: "outreach", color: "oklch(0.72 0.18 72)" },
  { source: "AI Micro-Habits MVP", target: 5000, current: 0, status: "planning", color: "oklch(0.78 0.14 195)" },
  { source: "ARPA-E CIRCULAR Grant", target: 150000, current: 0, status: "drafting", color: "oklch(0.65 0.15 150)" },
  { source: "NSF SBIR Grant", target: 256000, current: 0, status: "drafting", color: "oklch(0.60 0.16 290)" },
];

const allocations = [
  { name: "LLC Filing", amount: 200, category: "Legal", color: "oklch(0.78 0.14 195)" },
  { name: "Presence Machine (Mac Mini M4)", amount: 599, category: "Hardware", color: "oklch(0.72 0.18 72)" },
  { name: "Domain & Hosting", amount: 120, category: "Infrastructure", color: "oklch(0.65 0.15 150)" },
  { name: "Marketing Tools", amount: 0, category: "Marketing", color: "oklch(0.60 0.16 290)" },
];

const pieData = [
  { name: "SolMate", value: 17500, color: "oklch(0.72 0.18 72)" },
  { name: "Micro-Habits", value: 5000, color: "oklch(0.78 0.14 195)" },
  { name: "ARPA-E", value: 150000, color: "oklch(0.65 0.15 150)" },
  { name: "NSF SBIR", value: 256000, color: "oklch(0.60 0.16 290)" },
];

const statusColors: Record<string, string> = {
  outreach: "oklch(0.72 0.18 72)",
  planning: "oklch(0.78 0.14 195)",
  drafting: "oklch(0.60 0.16 290)",
  done: "oklch(0.65 0.15 150)",
};

const customTooltipStyle = {
  background: "oklch(0.10 0.006 285)",
  border: "1px solid oklch(0.72 0.18 72 / 0.3)",
  borderRadius: "6px",
  fontFamily: "'JetBrains Mono', monospace",
  fontSize: "0.75rem",
  color: "oklch(0.92 0.005 65)",
};

export default function LedgerView() {
  const totalTarget = revenueTargets.reduce((s, r) => s + r.target, 0);

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
            The Ledger
          </h1>
          <ForgeSymbol size="sm" />
        </div>
        <p
          className="text-sm mt-0.5"
          style={{ fontFamily: "'Crimson Pro', serif", color: "oklch(0.50 0.008 285)", fontStyle: "italic" }}
        >
          Financial sovereignty. Every dollar tracked. Every target known.
        </p>
      </motion.div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Total Target", value: `$${(totalTarget / 1000).toFixed(0)}K`, sub: "All revenue streams", icon: <TrendingUp size={16} />, color: "oklch(0.72 0.18 72)" },
          { label: "Immediate Target", value: "$17,500", sub: "SolMate seed round", icon: <DollarSign size={16} />, color: "oklch(0.65 0.15 150)" },
          { label: "Current Revenue", value: "$0", sub: "Pre-revenue stage", icon: <ArrowUpRight size={16} />, color: "oklch(0.78 0.14 195)" },
          { label: "Runway Status", value: "BUILT", sub: "Ready for flight", icon: <ArrowDownRight size={16} />, color: "oklch(0.60 0.16 290)" },
        ].map((card, i) => (
          <motion.div
            key={card.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className="kpi-card"
            style={{ "--kpi-color": card.color } as React.CSSProperties}
          >
            <div
              className="p-2 rounded inline-flex mb-3"
              style={{ background: `${card.color.replace(")", " / 0.15)")}`, color: card.color }}
            >
              {card.icon}
            </div>
            <div
              className="text-xl font-bold"
              style={{ fontFamily: "'Space Grotesk', sans-serif", color: card.color }}
            >
              {card.value}
            </div>
            <div
              className="text-xs font-semibold uppercase tracking-wide mt-0.5"
              style={{ fontFamily: "'Space Grotesk', sans-serif", color: "oklch(0.55 0.008 285)" }}
            >
              {card.label}
            </div>
            <div
              className="text-xs mt-0.5"
              style={{ fontFamily: "'Crimson Pro', serif", color: "oklch(0.40 0.006 285)" }}
            >
              {card.sub}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Revenue Targets + Pie */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Revenue Targets */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="kpi-card lg:col-span-2"
          style={{ "--kpi-color": "oklch(0.72 0.18 72)" } as React.CSSProperties}
        >
          <h3
            className="font-semibold text-sm mb-4"
            style={{ fontFamily: "'Space Grotesk', sans-serif", color: "oklch(0.85 0.005 65)" }}
          >
            Revenue Targets
          </h3>
          <div className="space-y-4">
            {revenueTargets.map((target, i) => (
              <motion.div
                key={target.source}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.35 + i * 0.08 }}
              >
                <div className="flex justify-between items-center mb-1.5">
                  <div>
                    <span
                      className="text-sm font-medium"
                      style={{ fontFamily: "'Space Grotesk', sans-serif", color: "oklch(0.80 0.005 65)" }}
                    >
                      {target.source}
                    </span>
                    <span
                      className="ml-2 text-xs px-1.5 py-0.5 rounded"
                      style={{
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: "0.6rem",
                        background: `${statusColors[target.status].replace(")", " / 0.15)")}`,
                        color: statusColors[target.status],
                        border: `1px solid ${statusColors[target.status].replace(")", " / 0.3)")}`,
                      }}
                    >
                      {target.status.toUpperCase()}
                    </span>
                  </div>
                  <div className="text-right">
                    <div
                      className="text-sm font-bold"
                      style={{ fontFamily: "'Space Grotesk', sans-serif", color: target.color }}
                    >
                      ${target.target.toLocaleString()}
                    </div>
                    <div
                      className="text-xs"
                      style={{ fontFamily: "'JetBrains Mono', monospace", color: "oklch(0.38 0.006 285)" }}
                    >
                      ${target.current.toLocaleString()} raised
                    </div>
                  </div>
                </div>
                <div
                  className="h-1.5 rounded-full overflow-hidden"
                  style={{ background: "oklch(0.14 0.008 285)" }}
                >
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: target.current > 0 ? `${(target.current / target.target) * 100}%` : "2px",
                      background: `linear-gradient(90deg, ${target.color.replace(")", " / 0.6)")}, ${target.color})`,
                      boxShadow: `0 0 8px ${target.color.replace(")", " / 0.4)")}`,
                    }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Pie Chart */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.35 }}
          className="kpi-card"
          style={{ "--kpi-color": "oklch(0.78 0.14 195)" } as React.CSSProperties}
        >
          <h3
            className="font-semibold text-sm mb-4"
            style={{ fontFamily: "'Space Grotesk', sans-serif", color: "oklch(0.85 0.005 65)" }}
          >
            Revenue Mix
          </h3>
          <ResponsiveContainer width="100%" height={160}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius={45}
                outerRadius={70}
                paddingAngle={3}
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={index} fill={entry.color} stroke="none" />
                ))}
              </Pie>
              <Tooltip
                contentStyle={customTooltipStyle}
                formatter={(v: number) => [`$${v.toLocaleString()}`, ""]}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-1.5 mt-2">
            {pieData.map((item) => (
              <div key={item.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full" style={{ background: item.color }} />
                  <span
                    className="text-xs"
                    style={{ fontFamily: "'Space Grotesk', sans-serif", color: "oklch(0.65 0.005 65)" }}
                  >
                    {item.name}
                  </span>
                </div>
                <span
                  className="text-xs"
                  style={{ fontFamily: "'JetBrains Mono', monospace", color: item.color }}
                >
                  ${(item.value / 1000).toFixed(0)}K
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Allocations */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="kpi-card"
        style={{ "--kpi-color": "oklch(0.65 0.15 150)" } as React.CSSProperties}
      >
        <h3
          className="font-semibold text-sm mb-4"
          style={{ fontFamily: "'Space Grotesk', sans-serif", color: "oklch(0.85 0.005 65)" }}
        >
          Planned Allocations — Phase 1
        </h3>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {allocations.map((alloc, i) => (
            <motion.div
              key={alloc.name}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.55 + i * 0.06 }}
              className="p-3 rounded"
              style={{
                background: "oklch(0.12 0.007 285)",
                border: `1px solid ${alloc.color.replace(")", " / 0.2)")}`,
              }}
            >
              <div
                className="text-lg font-bold"
                style={{ fontFamily: "'Space Grotesk', sans-serif", color: alloc.color }}
              >
                ${alloc.amount}
              </div>
              <div
                className="text-xs font-medium"
                style={{ fontFamily: "'Space Grotesk', sans-serif", color: "oklch(0.65 0.005 65)" }}
              >
                {alloc.name}
              </div>
              <div
                className="text-xs mt-0.5"
                style={{ fontFamily: "'JetBrains Mono', monospace", color: "oklch(0.38 0.006 285)" }}
              >
                {alloc.category}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
