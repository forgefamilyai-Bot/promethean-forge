/* ============================================================
   LEDGER VIEW — Financial Sovereignty Tracker
   Real-time revenue tracker with manual entry, transaction log,
   live running total, and animated chart.
   Dark Forge Cosmos design: void black, forge amber, sovereign cyan.
   ============================================================ */
import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef } from "react";
import {
  ArrowDownRight,
  ArrowUpRight,
  CheckCircle,
  DollarSign,
  Plus,
  TrendingUp,
  Trash2,
  Zap,
} from "lucide-react";
import {
  Area,
  AreaChart,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { toast } from "sonner";
import ForgeSymbol from "../ForgeSymbol";

/* ── Types ─────────────────────────────────────────────── */
interface Transaction {
  id: string;
  date: string;
  time: string;
  source: string;
  amount: number;
  note: string;
  type: "income" | "expense";
  method: string;
}

/* ── Static data ────────────────────────────────────────── */
const REVENUE_TARGETS = [
  { source: "SolMate Seed Round", target: 17500, color: "oklch(0.72 0.18 72)" },
  { source: "AI Micro-Habits MVP", target: 5000, color: "oklch(0.78 0.14 195)" },
  { source: "ARPA-E CIRCULAR Grant", target: 150000, color: "oklch(0.65 0.15 150)" },
  { source: "NSF SBIR Grant", target: 256000, color: "oklch(0.60 0.16 290)" },
];

const TOTAL_TARGET = REVENUE_TARGETS.reduce((s, r) => s + r.target, 0);

const PAYMENT_METHODS = ["CashApp", "Venmo", "Bank Transfer", "Check", "PayPal", "Stripe", "Cash", "Other"];
const SOURCES = ["SolMate", "Road Oracle", "AI Marketing Toolkit", "Consulting", "Grant", "Content Revenue", "Sovereign Scout", "Other"];

const customTooltipStyle = {
  background: "oklch(0.10 0.006 285)",
  border: "1px solid oklch(0.72 0.18 72 / 0.3)",
  borderRadius: "6px",
  fontFamily: "'JetBrains Mono', monospace",
  fontSize: "0.7rem",
  color: "oklch(0.92 0.005 65)",
};

function fmt(n: number) {
  return n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function nowDate() {
  const d = new Date();
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}
function nowTime() {
  const d = new Date();
  return d.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });
}

/* ── Main Component ─────────────────────────────────────── */
export default function LedgerView() {
  /* ── State ── */
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [amount, setAmount] = useState("");
  const [source, setSource] = useState("SolMate");
  const [method, setMethod] = useState("CashApp");
  const [note, setNote] = useState("");
  const [entryType, setEntryType] = useState<"income" | "expense">("income");
  const [showForm, setShowForm] = useState(false);
  const amountRef = useRef<HTMLInputElement>(null);

  /* ── Derived ── */
  const totalIncome = transactions.filter(t => t.type === "income").reduce((s, t) => s + t.amount, 0);
  const totalExpenses = transactions.filter(t => t.type === "expense").reduce((s, t) => s + t.amount, 0);
  const netRevenue = totalIncome - totalExpenses;
  const solmateRaised = transactions.filter(t => t.type === "income" && t.source === "SolMate").reduce((s, t) => s + t.amount, 0);
  const solmatePct = Math.min(100, (solmateRaised / 17500) * 100);

  /* ── Chart data — running total over time ── */
  const chartData = (() => {
    let running = 0;
    const points = transactions
      .filter(t => t.type === "income")
      .map(t => {
        running += t.amount;
        return { label: `${t.date} ${t.time}`, total: running, amount: t.amount };
      });
    if (points.length === 0) return [{ label: "Start", total: 0, amount: 0 }];
    return [{ label: "Start", total: 0, amount: 0 }, ...points];
  })();

  /* ── Handlers ── */
  const handleAdd = () => {
    const parsed = parseFloat(amount.replace(/[^0-9.]/g, ""));
    if (!parsed || parsed <= 0) {
      toast.error("Enter a valid amount greater than $0.");
      return;
    }
    const tx: Transaction = {
      id: `tx-${Date.now()}`,
      date: nowDate(),
      time: nowTime(),
      source,
      amount: parsed,
      note: note.trim() || `${entryType === "income" ? "Revenue" : "Expense"} — ${source}`,
      type: entryType,
      method,
    };
    setTransactions(prev => [tx, ...prev]);
    setAmount("");
    setNote("");
    setShowForm(false);

    if (entryType === "income") {
      toast.success(`💰 $${fmt(parsed)} logged!`, {
        description: `${source} · ${method} · ${tx.date}`,
        duration: 5000,
      });
    } else {
      toast(`📤 Expense of $${fmt(parsed)} recorded.`, {
        description: `${source} · ${tx.date}`,
        duration: 4000,
      });
    }
  };

  const handleDelete = (id: string) => {
    setTransactions(prev => prev.filter(t => t.id !== id));
    toast("Entry removed from the Ledger.");
  };

  /* ── Render ── */
  return (
    <div className="space-y-6" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>

      {/* ── Header ── */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold" style={{ color: "oklch(0.92 0.005 65)" }}>
                The Ledger
              </h1>
              <ForgeSymbol size="sm" />
            </div>
            <p className="text-sm mt-0.5" style={{ fontFamily: "'Crimson Pro', serif", color: "oklch(0.50 0.008 285)", fontStyle: "italic" }}>
              Financial sovereignty. Every dollar tracked. Every target known.
            </p>
          </div>
          <button
            onClick={() => { setShowForm(f => !f); setTimeout(() => amountRef.current?.focus(), 80); }}
            className="flex items-center gap-2 px-4 py-2 rounded font-semibold text-sm transition-all"
            style={{
              background: showForm ? "oklch(0.72 0.18 72 / 0.2)" : "oklch(0.72 0.18 72 / 0.12)",
              border: `1px solid oklch(0.72 0.18 72 / ${showForm ? "0.5" : "0.3"})`,
              color: "oklch(0.72 0.18 72)",
            }}
          >
            <Plus size={14} /> Log Entry
          </button>
        </div>
      </motion.div>

      {/* ── Entry Form ── */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0, height: 0, y: -10 }}
            animate={{ opacity: 1, height: "auto", y: 0 }}
            exit={{ opacity: 0, height: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <div
              className="p-5 rounded-lg"
              style={{
                background: "oklch(0.10 0.005 285)",
                border: "1px solid oklch(0.72 0.18 72 / 0.3)",
                boxShadow: "0 0 24px oklch(0.72 0.18 72 / 0.06)",
              }}
            >
              <p className="text-xs font-semibold mb-4" style={{ color: "oklch(0.45 0.008 285)", fontFamily: "'JetBrains Mono', monospace", letterSpacing: "0.08em" }}>
                NEW LEDGER ENTRY
              </p>

              {/* Type toggle */}
              <div className="flex gap-2 mb-4">
                {(["income", "expense"] as const).map(t => (
                  <button
                    key={t}
                    onClick={() => setEntryType(t)}
                    className="flex-1 py-2 rounded text-sm font-semibold transition-all capitalize"
                    style={{
                      background: entryType === t
                        ? t === "income" ? "oklch(0.65 0.15 150 / 0.2)" : "oklch(0.65 0.22 25 / 0.2)"
                        : "oklch(1 0 0 / 0.04)",
                      border: `1px solid ${entryType === t
                        ? t === "income" ? "oklch(0.65 0.15 150 / 0.5)" : "oklch(0.65 0.22 25 / 0.5)"
                        : "oklch(1 0 0 / 0.08)"}`,
                      color: entryType === t
                        ? t === "income" ? "oklch(0.65 0.15 150)" : "oklch(0.65 0.22 25)"
                        : "oklch(0.45 0.008 285)",
                    }}
                  >
                    {t === "income" ? "💰 Income" : "📤 Expense"}
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                {/* Amount */}
                <div>
                  <label className="block text-xs mb-1.5" style={{ color: "oklch(0.40 0.006 285)", fontFamily: "'JetBrains Mono', monospace", fontSize: "0.65rem", letterSpacing: "0.06em" }}>
                    AMOUNT ($)
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm font-bold" style={{ color: "oklch(0.72 0.18 72)" }}>$</span>
                    <input
                      ref={amountRef}
                      type="number"
                      min="0"
                      step="0.01"
                      value={amount}
                      onChange={e => setAmount(e.target.value)}
                      onKeyDown={e => e.key === "Enter" && handleAdd()}
                      placeholder="0.00"
                      className="w-full pl-7 pr-3 py-2.5 rounded text-sm outline-none"
                      style={{
                        background: "oklch(0.08 0.004 285)",
                        border: "1px solid oklch(1 0 0 / 0.12)",
                        color: "oklch(0.92 0.005 65)",
                        fontFamily: "'JetBrains Mono', monospace",
                      }}
                    />
                  </div>
                </div>

                {/* Payment Method */}
                <div>
                  <label className="block text-xs mb-1.5" style={{ color: "oklch(0.40 0.006 285)", fontFamily: "'JetBrains Mono', monospace", fontSize: "0.65rem", letterSpacing: "0.06em" }}>
                    METHOD
                  </label>
                  <select
                    value={method}
                    onChange={e => setMethod(e.target.value)}
                    className="w-full px-3 py-2.5 rounded text-sm outline-none"
                    style={{
                      background: "oklch(0.08 0.004 285)",
                      border: "1px solid oklch(1 0 0 / 0.12)",
                      color: "oklch(0.85 0.005 65)",
                      fontFamily: "'Space Grotesk', sans-serif",
                    }}
                  >
                    {PAYMENT_METHODS.map(m => <option key={m} value={m}>{m}</option>)}
                  </select>
                </div>

                {/* Source */}
                <div>
                  <label className="block text-xs mb-1.5" style={{ color: "oklch(0.40 0.006 285)", fontFamily: "'JetBrains Mono', monospace", fontSize: "0.65rem", letterSpacing: "0.06em" }}>
                    SOURCE / PROJECT
                  </label>
                  <select
                    value={source}
                    onChange={e => setSource(e.target.value)}
                    className="w-full px-3 py-2.5 rounded text-sm outline-none"
                    style={{
                      background: "oklch(0.08 0.004 285)",
                      border: "1px solid oklch(1 0 0 / 0.12)",
                      color: "oklch(0.85 0.005 65)",
                      fontFamily: "'Space Grotesk', sans-serif",
                    }}
                  >
                    {SOURCES.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>

                {/* Note */}
                <div>
                  <label className="block text-xs mb-1.5" style={{ color: "oklch(0.40 0.006 285)", fontFamily: "'JetBrains Mono', monospace", fontSize: "0.65rem", letterSpacing: "0.06em" }}>
                    NOTE (optional)
                  </label>
                  <input
                    type="text"
                    value={note}
                    onChange={e => setNote(e.target.value)}
                    onKeyDown={e => e.key === "Enter" && handleAdd()}
                    placeholder="e.g. First CashApp ping — SolMate seed"
                    className="w-full px-3 py-2.5 rounded text-sm outline-none"
                    style={{
                      background: "oklch(0.08 0.004 285)",
                      border: "1px solid oklch(1 0 0 / 0.12)",
                      color: "oklch(0.85 0.005 65)",
                      fontFamily: "'Crimson Pro', serif",
                    }}
                  />
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={handleAdd}
                  className="flex items-center gap-2 px-5 py-2.5 rounded font-semibold text-sm transition-all"
                  style={{
                    background: entryType === "income" ? "oklch(0.65 0.15 150 / 0.2)" : "oklch(0.65 0.22 25 / 0.2)",
                    border: `1px solid ${entryType === "income" ? "oklch(0.65 0.15 150 / 0.5)" : "oklch(0.65 0.22 25 / 0.5)"}`,
                    color: entryType === "income" ? "oklch(0.65 0.15 150)" : "oklch(0.65 0.22 25)",
                  }}
                >
                  <CheckCircle size={14} /> Confirm Entry
                </button>
                <button
                  onClick={() => setShowForm(false)}
                  className="px-4 py-2.5 rounded text-sm transition-all"
                  style={{
                    background: "oklch(1 0 0 / 0.04)",
                    border: "1px solid oklch(1 0 0 / 0.08)",
                    color: "oklch(0.45 0.008 285)",
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Summary Cards ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          {
            label: "Net Revenue",
            value: `$${fmt(netRevenue)}`,
            sub: transactions.length === 0 ? "Log your first entry" : `${transactions.length} entries`,
            icon: <TrendingUp size={16} />,
            color: netRevenue >= 0 ? "oklch(0.65 0.15 150)" : "oklch(0.65 0.22 25)",
            glow: netRevenue > 0,
          },
          {
            label: "Total Income",
            value: `$${fmt(totalIncome)}`,
            sub: `${transactions.filter(t => t.type === "income").length} transactions`,
            icon: <ArrowUpRight size={16} />,
            color: "oklch(0.72 0.18 72)",
            glow: false,
          },
          {
            label: "Total Expenses",
            value: `$${fmt(totalExpenses)}`,
            sub: `${transactions.filter(t => t.type === "expense").length} transactions`,
            icon: <ArrowDownRight size={16} />,
            color: "oklch(0.65 0.22 25)",
            glow: false,
          },
          {
            label: "SolMate Progress",
            value: `${solmatePct.toFixed(1)}%`,
            sub: `$${fmt(solmateRaised)} / $17,500`,
            icon: <DollarSign size={16} />,
            color: "oklch(0.78 0.14 195)",
            glow: solmateRaised > 0,
          },
        ].map((card, i) => (
          <motion.div
            key={card.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.07 }}
            className="kpi-card"
            style={{
              "--kpi-color": card.color,
              boxShadow: card.glow ? `0 0 20px ${card.color.replace(")", " / 0.15)")}` : undefined,
            } as React.CSSProperties}
          >
            <div className="p-2 rounded inline-flex mb-3" style={{ background: `${card.color.replace(")", " / 0.15)")}`, color: card.color }}>
              {card.icon}
            </div>
            <div className="text-xl font-bold" style={{ color: card.color }}>{card.value}</div>
            <div className="text-xs font-semibold uppercase tracking-wide mt-0.5" style={{ color: "oklch(0.55 0.008 285)" }}>{card.label}</div>
            <div className="text-xs mt-0.5" style={{ fontFamily: "'Crimson Pro', serif", color: "oklch(0.40 0.006 285)" }}>{card.sub}</div>
          </motion.div>
        ))}
      </div>

      {/* ── Live Revenue Chart ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
        className="kpi-card"
        style={{ "--kpi-color": "oklch(0.72 0.18 72)" } as React.CSSProperties}
      >
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-semibold text-sm" style={{ color: "oklch(0.85 0.005 65)" }}>Revenue Trajectory</h3>
            <p className="text-xs" style={{ fontFamily: "'Crimson Pro', serif", color: "oklch(0.45 0.006 285)", fontStyle: "italic" }}>
              Live — updates with every entry
            </p>
          </div>
          {totalIncome > 0 && (
            <div className="flex items-center gap-1.5">
              <Zap size={12} style={{ color: "oklch(0.72 0.18 72)" }} />
              <span className="text-xs font-bold" style={{ color: "oklch(0.72 0.18 72)", fontFamily: "'JetBrains Mono', monospace" }}>
                ${fmt(totalIncome)} RAISED
              </span>
            </div>
          )}
        </div>
        <ResponsiveContainer width="100%" height={160}>
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="oklch(0.72 0.18 72)" stopOpacity={0.3} />
                <stop offset="95%" stopColor="oklch(0.72 0.18 72)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="label" hide />
            <YAxis hide />
            <Tooltip
              contentStyle={customTooltipStyle}
              formatter={(v: number) => [`$${fmt(v)}`, "Running Total"]}
            />
            <Area
              type="monotone"
              dataKey="total"
              stroke="oklch(0.72 0.18 72)"
              strokeWidth={2}
              fill="url(#revenueGrad)"
              dot={{ fill: "oklch(0.72 0.18 72)", r: 3 }}
              activeDot={{ r: 5, fill: "oklch(0.72 0.18 72)", stroke: "oklch(0.07 0.005 285)", strokeWidth: 2 }}
              animationDuration={600}
            />
          </AreaChart>
        </ResponsiveContainer>
        {transactions.filter(t => t.type === "income").length === 0 && (
          <p className="text-center text-xs mt-2" style={{ fontFamily: "'Crimson Pro', serif", color: "oklch(0.35 0.005 285)", fontStyle: "italic" }}>
            Log your first income entry to see the trajectory chart come alive.
          </p>
        )}
      </motion.div>

      {/* ── Transaction Log ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35 }}
        className="kpi-card"
        style={{ "--kpi-color": "oklch(0.78 0.14 195)" } as React.CSSProperties}
      >
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-semibold text-sm" style={{ color: "oklch(0.85 0.005 65)" }}>Transaction Log</h3>
            <p className="text-xs" style={{ fontFamily: "'Crimson Pro', serif", color: "oklch(0.45 0.006 285)", fontStyle: "italic" }}>
              Every entry. Every ping. Every dollar.
            </p>
          </div>
          <span className="forge-badge forge-badge-cyan">
            {transactions.length} ENTRIES
          </span>
        </div>

        {transactions.length === 0 ? (
          <div className="text-center py-8">
            <DollarSign size={28} className="mx-auto mb-2 opacity-20" style={{ color: "oklch(0.72 0.18 72)" }} />
            <p className="text-sm" style={{ fontFamily: "'Crimson Pro', serif", color: "oklch(0.40 0.006 285)", fontStyle: "italic" }}>
              No entries yet. The first CashApp ping is one conversation away.
            </p>
            <button
              onClick={() => { setShowForm(true); setTimeout(() => amountRef.current?.focus(), 80); }}
              className="mt-3 text-xs px-4 py-2 rounded transition-all"
              style={{
                background: "oklch(0.72 0.18 72 / 0.1)",
                border: "1px solid oklch(0.72 0.18 72 / 0.3)",
                color: "oklch(0.72 0.18 72)",
              }}
            >
              + Log First Entry
            </button>
          </div>
        ) : (
          <div className="space-y-2" style={{ maxHeight: "320px", overflowY: "auto" }}>
            <AnimatePresence initial={false}>
              {transactions.map((tx) => (
                <motion.div
                  key={tx.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20, height: 0 }}
                  transition={{ duration: 0.25 }}
                  className="flex items-center gap-3 p-3 rounded group"
                  style={{
                    background: "oklch(0.10 0.005 285)",
                    border: `1px solid ${tx.type === "income" ? "oklch(0.65 0.15 150 / 0.15)" : "oklch(0.65 0.22 25 / 0.15)"}`,
                    borderLeft: `3px solid ${tx.type === "income" ? "oklch(0.65 0.15 150)" : "oklch(0.65 0.22 25)"}`,
                  }}
                >
                  {/* Icon */}
                  <div
                    className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center"
                    style={{
                      background: tx.type === "income" ? "oklch(0.65 0.15 150 / 0.12)" : "oklch(0.65 0.22 25 / 0.12)",
                      color: tx.type === "income" ? "oklch(0.65 0.15 150)" : "oklch(0.65 0.22 25)",
                    }}
                  >
                    {tx.type === "income" ? <ArrowUpRight size={13} /> : <ArrowDownRight size={13} />}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold" style={{ color: "oklch(0.85 0.005 65)" }}>{tx.source}</span>
                      <span className="text-xs px-1.5 py-0.5 rounded" style={{
                        background: "oklch(1 0 0 / 0.05)", border: "1px solid oklch(1 0 0 / 0.1)",
                        color: "oklch(0.45 0.008 285)", fontFamily: "'JetBrains Mono', monospace", fontSize: "0.6rem",
                      }}>{tx.method}</span>
                    </div>
                    <p className="text-xs truncate" style={{ color: "oklch(0.50 0.008 285)", fontFamily: "'Crimson Pro', serif" }}>{tx.note}</p>
                  </div>

                  {/* Amount */}
                  <div className="text-right flex-shrink-0">
                    <div
                      className="text-sm font-bold"
                      style={{
                        fontFamily: "'JetBrains Mono', monospace",
                        color: tx.type === "income" ? "oklch(0.65 0.15 150)" : "oklch(0.65 0.22 25)",
                      }}
                    >
                      {tx.type === "income" ? "+" : "−"}${fmt(tx.amount)}
                    </div>
                    <div className="text-xs" style={{ color: "oklch(0.35 0.005 285)", fontFamily: "'JetBrains Mono', monospace" }}>
                      {tx.date} · {tx.time}
                    </div>
                  </div>

                  {/* Delete */}
                  <button
                    onClick={() => handleDelete(tx.id)}
                    className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded"
                    style={{ color: "oklch(0.50 0.008 285)" }}
                  >
                    <Trash2 size={12} />
                  </button>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </motion.div>

      {/* ── Revenue Targets ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.45 }}
          className="kpi-card lg:col-span-2"
          style={{ "--kpi-color": "oklch(0.72 0.18 72)" } as React.CSSProperties}
        >
          <h3 className="font-semibold text-sm mb-4" style={{ color: "oklch(0.85 0.005 65)" }}>Revenue Targets</h3>
          <div className="space-y-4">
            {REVENUE_TARGETS.map((target, i) => {
              const raised = i === 0 ? solmateRaised : 0;
              const pct = Math.min(100, target.target > 0 ? (raised / target.target) * 100 : 0);
              return (
                <div key={target.source}>
                  <div className="flex justify-between items-center mb-1.5">
                    <span className="text-sm font-medium" style={{ color: "oklch(0.80 0.005 65)" }}>{target.source}</span>
                    <div className="text-right">
                      <div className="text-sm font-bold" style={{ color: target.color }}>${target.target.toLocaleString()}</div>
                      <div className="text-xs" style={{ fontFamily: "'JetBrains Mono', monospace", color: "oklch(0.38 0.006 285)" }}>
                        ${fmt(raised)} raised
                      </div>
                    </div>
                  </div>
                  <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "oklch(0.14 0.008 285)" }}>
                    <motion.div
                      className="h-full rounded-full"
                      style={{
                        background: `linear-gradient(90deg, ${target.color.replace(")", " / 0.6)")}, ${target.color})`,
                        boxShadow: `0 0 8px ${target.color.replace(")", " / 0.4)")}`,
                      }}
                      initial={{ width: 0 }}
                      animate={{ width: `${Math.max(pct, pct > 0 ? 1 : 0)}%` }}
                      transition={{ duration: 0.8 }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Pie */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="kpi-card"
          style={{ "--kpi-color": "oklch(0.78 0.14 195)" } as React.CSSProperties}
        >
          <h3 className="font-semibold text-sm mb-3" style={{ color: "oklch(0.85 0.005 65)" }}>Revenue Mix</h3>
          <ResponsiveContainer width="100%" height={150}>
            <PieChart>
              <Pie data={REVENUE_TARGETS.map(r => ({ name: r.source.split(" ")[0], value: r.target, color: r.color }))} cx="50%" cy="50%" innerRadius={42} outerRadius={65} paddingAngle={3} dataKey="value">
                {REVENUE_TARGETS.map((r, idx) => <Cell key={idx} fill={r.color} stroke="none" />)}
              </Pie>
              <Tooltip contentStyle={customTooltipStyle} formatter={(v: number) => [`$${v.toLocaleString()}`, ""]} />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-1.5 mt-1">
            {REVENUE_TARGETS.map(r => (
              <div key={r.source} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full" style={{ background: r.color }} />
                  <span className="text-xs" style={{ color: "oklch(0.65 0.005 65)" }}>{r.source.split(" ")[0]}</span>
                </div>
                <span className="text-xs" style={{ fontFamily: "'JetBrains Mono', monospace", color: r.color }}>${(r.target / 1000).toFixed(0)}K</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* ── Footer ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="p-4 rounded text-center"
        style={{ background: "oklch(0.72 0.18 72 / 0.05)", border: "1px solid oklch(0.72 0.18 72 / 0.15)" }}
      >
        <p style={{ fontFamily: "'Crimson Pro', serif", color: "oklch(0.50 0.008 285)", fontStyle: "italic", fontSize: "0.9rem" }}>
          "The first CashApp ping is one conversation away. Log it here the moment it arrives."
        </p>
        <p className="mt-1 text-xs font-bold" style={{ color: "oklch(0.72 0.18 72)", fontFamily: "'JetBrains Mono', monospace" }}>
          Know Means Go · 1 ~ &gt;|&lt; ~ 1
        </p>
      </motion.div>
    </div>
  );
}
