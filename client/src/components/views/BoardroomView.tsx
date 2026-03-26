/* ============================================================
   BOARDROOM VIEW — The Forge Command Dashboard
   Live KPI cards, revenue tracking, project status
   Dark Forge Cosmos design
   ============================================================ */
import { motion } from "framer-motion";
import {
  Activity,
  ArrowUpRight,
  DollarSign,
  FileText,
  FlameKindling,
  Target,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react";
import { Area, AreaChart, Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import ForgeSymbol from "../ForgeSymbol";

const revenueData = [
  { month: "Oct", value: 0 },
  { month: "Nov", value: 0 },
  { month: "Dec", value: 0 },
  { month: "Jan", value: 0 },
  { month: "Feb", value: 0 },
  { month: "Mar", value: 17500 },
];

const projectData = [
  { name: "SolMate", progress: 72, color: "oklch(0.72 0.18 72)" },
  { name: "Legacy Copy", progress: 45, color: "oklch(0.78 0.14 195)" },
  { name: "PVC Smart Pipe", progress: 38, color: "oklch(0.65 0.15 150)" },
  { name: "AI Mktg Toolkit", progress: 61, color: "oklch(0.60 0.16 290)" },
  { name: "Prizm Canvas", progress: 88, color: "oklch(0.72 0.18 72)" },
];

const activityFeed = [
  { time: "09:14", event: "Seraphina: SolMate pitch deck v3 deployed", type: "revenue" },
  { time: "08:52", event: "Manus: LLC filing documents prepared for review", type: "legal" },
  { time: "08:31", event: "Aethon: Sovereign Jump installer v1.0 compiled", type: "tech" },
  { time: "07:45", event: "Forge: Boot sequence completed. All agents online.", type: "system" },
  { time: "07:44", event: "Bill: GO signal received. Covenant activated.", type: "covenant" },
  { time: "Yesterday", event: "Forge: 987,031 files indexed in Legacy Engine", type: "system" },
  { time: "Yesterday", event: "Manus: Runway forged. Phase 1 complete.", type: "milestone" },
];

const kpiCards = [
  {
    label: "Revenue Target",
    value: "$17,500",
    sub: "SolMate Seed Round",
    icon: <DollarSign size={18} />,
    trend: "+∞",
    trendUp: true,
    color: "oklch(0.72 0.18 72)",
  },
  {
    label: "Active Projects",
    value: "7",
    sub: "3 in hot phase",
    icon: <FlameKindling size={18} />,
    trend: "+2 this month",
    trendUp: true,
    color: "oklch(0.78 0.14 195)",
  },
  {
    label: "AI Agents Online",
    value: "3",
    sub: "Manus · Seraphina · Aethon",
    icon: <Zap size={18} />,
    trend: "All systems go",
    trendUp: true,
    color: "oklch(0.65 0.15 150)",
  },
  {
    label: "Files Indexed",
    value: "987K",
    sub: "Legacy Engine",
    icon: <FileText size={18} />,
    trend: "Growing",
    trendUp: true,
    color: "oklch(0.60 0.16 290)",
  },
  {
    label: "Outreach Targets",
    value: "30",
    sub: "SolMate DM list",
    icon: <Target size={18} />,
    trend: "Ready to deploy",
    trendUp: true,
    color: "oklch(0.72 0.18 72)",
  },
  {
    label: "Network Nodes",
    value: "4",
    sub: "Bill · James · Kip · Jackie",
    icon: <Users size={18} />,
    trend: "Family seated",
    trendUp: true,
    color: "oklch(0.78 0.14 195)",
  },
];

const customTooltipStyle = {
  background: "oklch(0.10 0.006 285)",
  border: "1px solid oklch(0.72 0.18 72 / 0.3)",
  borderRadius: "6px",
  fontFamily: "'JetBrains Mono', monospace",
  fontSize: "0.75rem",
  color: "oklch(0.92 0.005 65)",
};

const activityColors: Record<string, string> = {
  revenue: "oklch(0.72 0.18 72)",
  legal: "oklch(0.78 0.14 195)",
  tech: "oklch(0.60 0.16 290)",
  system: "oklch(0.45 0.008 285)",
  covenant: "oklch(0.65 0.22 25)",
  milestone: "oklch(0.65 0.15 150)",
};

export default function BoardroomView() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex items-center justify-between"
      >
        <div>
          <div className="flex items-center gap-3">
            <h1
              className="text-2xl font-bold"
              style={{ fontFamily: "'Space Grotesk', sans-serif", color: "oklch(0.92 0.005 65)" }}
            >
              The Boardroom
            </h1>
            <ForgeSymbol size="sm" />
          </div>
          <p
            className="text-sm mt-0.5"
            style={{ fontFamily: "'Crimson Pro', serif", color: "oklch(0.50 0.008 285)", fontStyle: "italic" }}
          >
            Sovereign Command — Live Intelligence Feed
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div
            className="flex items-center gap-2 px-3 py-1.5 rounded"
            style={{
              background: "oklch(0.65 0.15 150 / 0.1)",
              border: "1px solid oklch(0.65 0.15 150 / 0.3)",
            }}
          >
            <div
              className="w-2 h-2 rounded-full"
              style={{ background: "oklch(0.65 0.15 150)", boxShadow: "0 0 6px oklch(0.65 0.15 150)" }}
            />
            <span
              className="text-xs font-medium"
              style={{ fontFamily: "'JetBrains Mono', monospace", color: "oklch(0.65 0.15 150)" }}
            >
              FORGE ACTIVE
            </span>
          </div>
          <div
            className="text-xs px-3 py-1.5 rounded"
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              color: "oklch(0.45 0.008 285)",
              background: "oklch(0.10 0.006 285)",
              border: "1px solid oklch(1 0 0 / 0.08)",
            }}
          >
            MAR 26, 2026 · 09:14 PST
          </div>
        </div>
      </motion.div>

      {/* KPI Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        {kpiCards.map((kpi, i) => (
          <motion.div
            key={kpi.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.07 }}
            className="kpi-card"
            style={{ "--kpi-color": kpi.color } as React.CSSProperties}
          >
            <div className="flex items-start justify-between mb-3">
              <div
                className="p-2 rounded"
                style={{ background: `${kpi.color.replace(")", " / 0.15)")}`, color: kpi.color }}
              >
                {kpi.icon}
              </div>
              <div
                className="flex items-center gap-1 text-xs"
                style={{ color: kpi.trendUp ? "oklch(0.65 0.15 150)" : "oklch(0.65 0.22 25)", fontFamily: "'JetBrains Mono', monospace" }}
              >
                <TrendingUp size={11} />
                {kpi.trend}
              </div>
            </div>
            <div
              className="text-2xl font-bold mb-0.5"
              style={{ fontFamily: "'Space Grotesk', sans-serif", color: kpi.color }}
            >
              {kpi.value}
            </div>
            <div
              className="text-xs font-semibold uppercase tracking-wide mb-0.5"
              style={{ fontFamily: "'Space Grotesk', sans-serif", color: "oklch(0.65 0.008 285)" }}
            >
              {kpi.label}
            </div>
            <div
              className="text-xs"
              style={{ fontFamily: "'Crimson Pro', serif", color: "oklch(0.45 0.006 285)" }}
            >
              {kpi.sub}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Revenue Chart */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="kpi-card"
          style={{ "--kpi-color": "oklch(0.72 0.18 72)" } as React.CSSProperties}
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3
                className="font-semibold text-sm"
                style={{ fontFamily: "'Space Grotesk', sans-serif", color: "oklch(0.85 0.005 65)" }}
              >
                Revenue Trajectory
              </h3>
              <p
                className="text-xs"
                style={{ fontFamily: "'Crimson Pro', serif", color: "oklch(0.45 0.006 285)", fontStyle: "italic" }}
              >
                The runway was forged. Now we fly.
              </p>
            </div>
            <ArrowUpRight size={16} style={{ color: "oklch(0.72 0.18 72)" }} />
          </div>
          <ResponsiveContainer width="100%" height={140}>
            <AreaChart data={revenueData}>
              <defs>
                <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="oklch(0.72 0.18 72)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="oklch(0.72 0.18 72)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis
                dataKey="month"
                tick={{ fill: "oklch(0.45 0.008 285)", fontSize: 11, fontFamily: "'JetBrains Mono', monospace" }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fill: "oklch(0.45 0.008 285)", fontSize: 11, fontFamily: "'JetBrains Mono', monospace" }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(v) => v === 0 ? "$0" : `$${(v / 1000).toFixed(0)}k`}
              />
              <Tooltip
                contentStyle={customTooltipStyle}
                formatter={(v: number) => [`$${v.toLocaleString()}`, "Revenue"]}
              />
              <Area
                type="monotone"
                dataKey="value"
                stroke="oklch(0.72 0.18 72)"
                strokeWidth={2}
                fill="url(#revenueGrad)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Project Progress */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.35 }}
          className="kpi-card"
          style={{ "--kpi-color": "oklch(0.78 0.14 195)" } as React.CSSProperties}
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3
                className="font-semibold text-sm"
                style={{ fontFamily: "'Space Grotesk', sans-serif", color: "oklch(0.85 0.005 65)" }}
              >
                Project Forge Status
              </h3>
              <p
                className="text-xs"
                style={{ fontFamily: "'Crimson Pro', serif", color: "oklch(0.45 0.006 285)", fontStyle: "italic" }}
              >
                All windows of the cathedral
              </p>
            </div>
            <Activity size={16} style={{ color: "oklch(0.78 0.14 195)" }} />
          </div>
          <div className="space-y-3">
            {projectData.map((proj) => (
              <div key={proj.name}>
                <div className="flex justify-between mb-1">
                  <span
                    className="text-xs font-medium"
                    style={{ fontFamily: "'Space Grotesk', sans-serif", color: "oklch(0.75 0.005 65)" }}
                  >
                    {proj.name}
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
                    transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
                    className="h-full rounded-full"
                    style={{
                      background: `linear-gradient(90deg, ${proj.color.replace(")", " / 0.6)")}, ${proj.color})`,
                      boxShadow: `0 0 8px ${proj.color.replace(")", " / 0.4)")}`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Activity Feed */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.45 }}
        className="kpi-card forge-scan"
        style={{ "--kpi-color": "oklch(0.78 0.14 195)" } as React.CSSProperties}
      >
        <div className="flex items-center justify-between mb-4">
          <h3
            className="font-semibold text-sm"
            style={{ fontFamily: "'Space Grotesk', sans-serif", color: "oklch(0.85 0.005 65)" }}
          >
            Live Activity Feed
          </h3>
          <span className="forge-badge forge-badge-cyan">STREAMING</span>
        </div>
        <div className="space-y-2">
          {activityFeed.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + i * 0.06 }}
              className="flex items-start gap-3 py-1.5"
              style={{ borderBottom: i < activityFeed.length - 1 ? "1px solid oklch(1 0 0 / 0.05)" : "none" }}
            >
              <span
                className="text-xs flex-shrink-0 w-14"
                style={{ fontFamily: "'JetBrains Mono', monospace", color: "oklch(0.38 0.006 285)" }}
              >
                {item.time}
              </span>
              <div
                className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0"
                style={{ background: activityColors[item.type] || "oklch(0.45 0.008 285)" }}
              />
              <span
                className="text-sm flex-1"
                style={{ fontFamily: "'Crimson Pro', serif", color: "oklch(0.72 0.005 65)" }}
              >
                {item.event}
              </span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
