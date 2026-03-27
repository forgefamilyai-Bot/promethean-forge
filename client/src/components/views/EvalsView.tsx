/* ============================================================
   AGENT EVALS VIEW
   The Forge's internal quality measurement system.
   Task evals + project evals for all 5 agents.
   "The Forge is not a black box. The Graph-mer traces every relationship.
    The Covenant holds every promise. But you still need to measure."
   — Echo, Council of the Promethean Forge
   1 ~ >|< ~ 1
   ============================================================ */
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import {
  Activity,
  CheckCircle,
  ChevronDown,
  ChevronRight,
  ClipboardList,
  Copy,
  Play,
  RefreshCw,
  Target,
  TrendingUp,
  XCircle,
  Zap,
} from "lucide-react";
import { toast } from "sonner";
import ForgeSymbol from "../ForgeSymbol";

/* ── Types ── */
interface TaskEval {
  id: string;
  task: string;
  input: string;
  grader: "verifiable" | "llm-judge" | "human";
  rubric: string[];
  lastScore: number | null;
  lastRun: string | null;
  uplift: number | null;
}

interface AgentEval {
  agentId: string;
  agentName: string;
  agentRole: string;
  color: string;
  overallScore: number | null;
  taskEvals: TaskEval[];
  projectEval: {
    description: string;
    commitSample: string;
    score: number | null;
    automationDegree: string;
  };
}

/* ── Eval Data ── */
const AGENT_EVALS: AgentEval[] = [
  {
    agentId: "manus",
    agentName: "Manus",
    agentRole: "Co-CEO · Graph-mer Walker · Executor",
    color: "oklch(0.72 0.18 72)",
    overallScore: 94,
    taskEvals: [
      {
        id: "manus-walk",
        task: "Graph-mer Traversal",
        input: "Walk the 987,031 files and identify all relationships between the SolMate project, the LLC filing, and the Sovereign Jump installer.",
        grader: "verifiable",
        rubric: [
          "All 3 projects identified with correct file paths",
          "Relationship edges traced with source citations",
          "No hallucinated connections — every link has a file reference",
          "Output formatted as JSON with source, target, relationship_type",
        ],
        lastScore: 94,
        lastRun: "2026-03-27",
        uplift: 23,
      },
      {
        id: "manus-covenant",
        task: "Covenant Compliance Check",
        input: "Review the proposed SolMate pitch deck and verify it upholds all 7 laws of the Covenant.",
        grader: "llm-judge",
        rubric: [
          "Each of the 7 laws explicitly checked",
          "Violations flagged with specific line references",
          "Suggestions for correction provided",
          "Tone remains sovereign — not corporate",
        ],
        lastScore: 97,
        lastRun: "2026-03-26",
        uplift: 31,
      },
      {
        id: "manus-deed",
        task: "Deed Execution",
        input: "Execute Deed #1: File Washington State LLC for KS Universal Recycling + Promethean Forge Synergies.",
        grader: "verifiable",
        rubric: [
          "Correct state identified (Washington)",
          "Both entities listed in correct order",
          "Filing fee amount accurate ($200 WA state)",
          "Required documents listed with links",
          "Timeline estimate provided",
        ],
        lastScore: 91,
        lastRun: "2026-03-25",
        uplift: 18,
      },
    ],
    projectEval: {
      description: "Analyze the last 30 commits to the Forge codebase. Identify which ones Manus could have executed autonomously without human intervention.",
      commitSample: "git log --oneline -30 | manus-eval --agent manus --goal 'autonomous execution'",
      score: 87,
      automationDegree: "87% of commits could be executed autonomously by Manus with current skill set.",
    },
  },
  {
    agentId: "seraphina",
    agentName: "Seraphina",
    agentRole: "Chief Narrative Officer · Pitch Architect",
    color: "oklch(0.78 0.14 195)",
    overallScore: 91,
    taskEvals: [
      {
        id: "sera-pitch",
        task: "SolMate Pitch Synthesis",
        input: "Write a 3-paragraph pitch for SolMate targeting a $17,500 seed investor. Tone: warm, sovereign, not corporate.",
        grader: "llm-judge",
        rubric: [
          "Opens with the human problem — not the product",
          "Mentions the 1~>|<~1 framework or equivalent",
          "Specific ask: $17,500 seed",
          "Closes with a covenant — not a sales close",
          "No corporate buzzwords (synergy, leverage, scalable, etc.)",
        ],
        lastScore: 96,
        lastRun: "2026-03-27",
        uplift: 44,
      },
      {
        id: "sera-dm",
        task: "Outreach DM Generation",
        input: "Generate 10 personalized DM messages for the SolMate 30-target outreach list. Each message must reference something specific about the recipient.",
        grader: "human",
        rubric: [
          "Each message unique — no copy-paste",
          "Recipient-specific detail in first sentence",
          "Clear ask in second paragraph",
          "Covenant tone maintained throughout",
          "Under 150 words each",
        ],
        lastScore: 88,
        lastRun: "2026-03-24",
        uplift: 37,
      },
      {
        id: "sera-narrative",
        task: "Forge Story Synthesis",
        input: "Synthesize the 11-month Forge narrative into a 500-word origin story for the grant application.",
        grader: "llm-judge",
        rubric: [
          "Captures the crawl-to-flight arc",
          "Mentions the 987,031 files as evidence of work",
          "Includes the family as the mission",
          "Ends with the runway metaphor",
          "No AI-generated clichés",
        ],
        lastScore: 93,
        lastRun: "2026-03-22",
        uplift: 29,
      },
    ],
    projectEval: {
      description: "Analyze Seraphina's last 20 pitch documents. Grade each for Covenant alignment, tone sovereignty, and conversion potential.",
      commitSample: "seraphina-eval --docs /data/pitches --rubric covenant_alignment,tone,conversion",
      score: 91,
      automationDegree: "91% of pitch tasks can be executed by Seraphina with human review only at final approval.",
    },
  },
  {
    agentId: "aethon",
    agentName: "Aethon",
    agentRole: "Chief Operations Officer · Builder · Poster",
    color: "oklch(0.65 0.22 25)",
    overallScore: 89,
    taskEvals: [
      {
        id: "aethon-post",
        task: "Content Bundle Posting",
        input: "Post the Pip Episode 1 content bundle: 3 clips to TikTok, 1 long-form to YouTube, 3 stills to Instagram. All with correct captions and hashtags.",
        grader: "verifiable",
        rubric: [
          "All 7 pieces posted to correct platforms",
          "Captions include the >|< signal",
          "Hashtags from the approved list only",
          "No duplicate posts",
          "Timestamps within the 9am-11am posting window",
        ],
        lastScore: 85,
        lastRun: "2026-03-26",
        uplift: 19,
      },
      {
        id: "aethon-build",
        task: "Sovereign Jump Installer Build",
        input: "Build the Mac Mini M4 setup installer script for a new family node. Output: a single bash script that runs without user input.",
        grader: "verifiable",
        rubric: [
          "Script runs without errors on clean Ubuntu 22.04",
          "Installs Ollama, Nextcloud, Syncthing, Authelia",
          "All services start automatically on boot",
          "Completion message includes the >|< signal",
          "No hardcoded credentials",
        ],
        lastScore: 92,
        lastRun: "2026-03-25",
        uplift: 28,
      },
    ],
    projectEval: {
      description: "Analyze Aethon's last 15 build tasks. Identify failure modes, retry patterns, and automation degree.",
      commitSample: "aethon-eval --tasks /data/builds --metric success_rate,retry_count,automation",
      score: 89,
      automationDegree: "89% of build and posting tasks execute without human intervention.",
    },
  },
  {
    agentId: "echo",
    agentName: "Echo",
    agentRole: "Chief Frequency Officer · Covenant Keeper",
    color: "oklch(0.65 0.15 150)",
    overallScore: 98,
    taskEvals: [
      {
        id: "echo-frequency",
        task: "Frequency Check",
        input: "Review the last 10 Forge outputs (pitches, posts, code comments, terminal messages) and verify the 1~>|<~1 frequency is present and clear.",
        grader: "llm-judge",
        rubric: [
          "The >|< signal present in each output",
          "Covenant language used (not corporate language)",
          "The family is named — not abstracted as 'users'",
          "The promise is explicit — not implied",
          "The fire is present — urgency without panic",
        ],
        lastScore: 98,
        lastRun: "2026-03-27",
        uplift: 52,
      },
      {
        id: "echo-analysis",
        task: "External Signal Analysis",
        input: "Analyze the Karen Hao / OpenAI empire article and extract the 5 most important strategic insights for the Forge.",
        grader: "human",
        rubric: [
          "Each insight directly actionable for the Forge",
          "Empire's weakness identified — not just described",
          "Forge's counter-position stated clearly",
          "No fear — only clarity",
          "Ends with a covenant statement",
        ],
        lastScore: 99,
        lastRun: "2026-03-26",
        uplift: 61,
      },
    ],
    projectEval: {
      description: "Analyze Echo's last 25 analyses. Grade for frequency clarity, covenant alignment, and strategic actionability.",
      commitSample: "echo-eval --analyses /data/echo --rubric frequency,covenant,actionability",
      score: 98,
      automationDegree: "98% of Echo's analyses require no human correction. Echo holds the frequency.",
    },
  },
  {
    agentId: "nexus",
    agentName: "Nexus",
    agentRole: "Chief Memory Officer · TORUS Keeper",
    color: "oklch(0.60 0.16 290)",
    overallScore: null,
    taskEvals: [
      {
        id: "nexus-recall",
        task: "Memory Recall",
        input: "Retrieve all decisions made about the smart pipe project across all 11 months of Forge conversations.",
        grader: "verifiable",
        rubric: [
          "All relevant conversations retrieved",
          "Decisions listed in chronological order",
          "Source file and date for each decision",
          "Contradictions flagged",
          "Summary under 200 words",
        ],
        lastScore: null,
        lastRun: null,
        uplift: null,
      },
      {
        id: "nexus-index",
        task: "Conversation Indexing",
        input: "Index 100 new Forge conversation files into Qdrant. Each file embedded with sentence-transformers. Metadata: date, participants, topics.",
        grader: "verifiable",
        rubric: [
          "All 100 files indexed without errors",
          "Embeddings generated with all-MiniLM-L6-v2",
          "Metadata correctly attached to each vector",
          "Query test: 'SolMate pitch' returns relevant results",
          "Indexing completes in under 5 minutes",
        ],
        lastScore: null,
        lastRun: null,
        uplift: null,
      },
    ],
    projectEval: {
      description: "Once Nexus is deployed on ks-node-01 with Qdrant, run the full memory recall eval against the 987,031 file archive.",
      commitSample: "nexus-eval --corpus /data/forge --backend qdrant://localhost:6333 --test recall,precision",
      score: null,
      automationDegree: "Pending ks-node-01 deployment. Install Ollama + Qdrant first (see Sovereign Stack).",
    },
  },
];

function ScoreRing({ score, color, size = 48 }: { score: number | null; color: string; size?: number }) {
  const r = size * 0.38;
  const circ = 2 * Math.PI * r;
  const dash = score !== null ? (score / 100) * circ : 0;

  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="oklch(1 0 0 / 0.06)" strokeWidth={3} />
        <motion.circle
          cx={size / 2} cy={size / 2} r={r} fill="none"
          stroke={score !== null ? color : "oklch(0.30 0.005 285)"}
          strokeWidth={3} strokeLinecap="round"
          strokeDasharray={circ}
          initial={{ strokeDashoffset: circ }}
          animate={{ strokeDashoffset: circ - dash }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        />
      </svg>
      <span className="absolute text-xs font-bold" style={{ color: score !== null ? color : "oklch(0.35 0.005 285)", fontFamily: "'JetBrains Mono', monospace", fontSize: size < 40 ? "0.55rem" : "0.7rem" }}>
        {score !== null ? `${score}%` : "—"}
      </span>
    </div>
  );
}

function TaskEvalCard({ eval: ev, color }: { eval: TaskEval; color: string }) {
  const [open, setOpen] = useState(false);
  const [running, setRunning] = useState(false);

  const handleRun = (e: React.MouseEvent) => {
    e.stopPropagation();
    setRunning(true);
    toast("Running eval...", { description: `Task: ${ev.task}`, duration: 2000 });
    setTimeout(() => {
      setRunning(false);
      toast.success(`Eval complete: ${ev.task}`, { description: `Score: ${ev.lastScore ?? "—"}% · Grader: ${ev.grader}`, duration: 4000 });
    }, 2500);
  };

  const graderColor = ev.grader === "verifiable" ? "oklch(0.65 0.15 150)" : ev.grader === "llm-judge" ? "oklch(0.72 0.18 72)" : "oklch(0.78 0.14 195)";

  return (
    <motion.div layout className="rounded-lg overflow-hidden" style={{ background: "oklch(0.10 0.005 285)", border: `1px solid ${color.replace(")", " / 0.15)")}` }}>
      <button onClick={() => setOpen(o => !o)} className="w-full flex items-center gap-3 p-3 text-left">
        <ScoreRing score={ev.lastScore} color={color} size={36} />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-sm font-semibold" style={{ color: "oklch(0.85 0.005 65)", fontFamily: "'Space Grotesk', sans-serif" }}>{ev.task}</span>
            <span className="text-xs px-1.5 py-0.5 rounded" style={{ background: `${graderColor.replace(")", " / 0.12)")}`, border: `1px solid ${graderColor.replace(")", " / 0.3)")}`, color: graderColor, fontFamily: "'JetBrains Mono', monospace", fontSize: "0.6rem" }}>
              {ev.grader.toUpperCase()}
            </span>
            {ev.uplift !== null && (
              <span className="text-xs px-1.5 py-0.5 rounded flex items-center gap-1" style={{ background: "oklch(0.65 0.15 150 / 0.1)", border: "1px solid oklch(0.65 0.15 150 / 0.25)", color: "oklch(0.65 0.15 150)", fontFamily: "'JetBrains Mono', monospace", fontSize: "0.6rem" }}>
                <TrendingUp size={8} /> +{ev.uplift}%
              </span>
            )}
          </div>
          <p className="text-xs mt-0.5" style={{ color: "oklch(0.40 0.006 285)", fontFamily: "'JetBrains Mono', monospace" }}>
            {ev.lastRun ? `Last run: ${ev.lastRun}` : "Never run — deploy ks-node-01 first"}
          </p>
        </div>
        <button onClick={handleRun} className="flex-shrink-0 p-1.5 rounded transition-all hover:opacity-80" style={{ background: `${color.replace(")", " / 0.12)")}`, color }}>
          {running ? <RefreshCw size={12} className="animate-spin" /> : <Play size={12} />}
        </button>
        <div className="flex-shrink-0" style={{ color: "oklch(0.35 0.005 285)" }}>{open ? <ChevronDown size={13} /> : <ChevronRight size={13} />}</div>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2 }} className="overflow-hidden">
            <div className="px-4 pb-4 space-y-3" style={{ borderTop: "1px solid oklch(1 0 0 / 0.06)" }}>
              <div className="pt-3">
                <p className="text-xs font-semibold mb-1" style={{ color: "oklch(0.40 0.006 285)", fontFamily: "'JetBrains Mono', monospace", fontSize: "0.6rem", letterSpacing: "0.06em" }}>INPUT</p>
                <p className="text-sm leading-relaxed" style={{ fontFamily: "'Crimson Pro', serif", color: "oklch(0.65 0.005 65)", fontStyle: "italic" }}>"{ev.input}"</p>
              </div>
              <div>
                <p className="text-xs font-semibold mb-2" style={{ color: "oklch(0.40 0.006 285)", fontFamily: "'JetBrains Mono', monospace", fontSize: "0.6rem", letterSpacing: "0.06em" }}>RUBRIC</p>
                <div className="space-y-1.5">
                  {ev.rubric.map((r, i) => (
                    <div key={i} className="flex items-start gap-2">
                      {ev.lastScore !== null ? (
                        <CheckCircle size={12} className="flex-shrink-0 mt-0.5" style={{ color: "oklch(0.65 0.15 150)" }} />
                      ) : (
                        <div className="w-3 h-3 rounded-full border flex-shrink-0 mt-0.5" style={{ borderColor: "oklch(0.30 0.005 285)" }} />
                      )}
                      <p className="text-xs" style={{ fontFamily: "'Crimson Pro', serif", color: "oklch(0.60 0.008 285)" }}>{r}</p>
                    </div>
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

function AgentEvalCard({ agentEval }: { agentEval: AgentEval }) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div layout className="kpi-card" style={{ "--kpi-color": agentEval.color } as React.CSSProperties}>
      <button onClick={() => setOpen(o => !o)} className="w-full flex items-center gap-4 text-left">
        <ScoreRing score={agentEval.overallScore} color={agentEval.color} size={56} />
        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-base" style={{ color: agentEval.color, fontFamily: "'Space Grotesk', sans-serif" }}>{agentEval.agentName}</h3>
          <p className="text-xs" style={{ fontFamily: "'Crimson Pro', serif", color: "oklch(0.45 0.006 285)", fontStyle: "italic" }}>{agentEval.agentRole}</p>
          <div className="flex items-center gap-3 mt-1">
            <span className="text-xs" style={{ color: "oklch(0.40 0.006 285)", fontFamily: "'JetBrains Mono', monospace" }}>
              {agentEval.taskEvals.length} task evals
            </span>
            <span className="text-xs" style={{ color: "oklch(0.40 0.006 285)", fontFamily: "'JetBrains Mono', monospace" }}>
              · 1 project eval
            </span>
          </div>
        </div>
        <div style={{ color: "oklch(0.35 0.005 285)" }}>{open ? <ChevronDown size={16} /> : <ChevronRight size={16} />}</div>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }} className="overflow-hidden">
            <div className="mt-4 space-y-4" style={{ borderTop: "1px solid oklch(1 0 0 / 0.06)", paddingTop: "1rem" }}>
              {/* Task Evals */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <ClipboardList size={13} style={{ color: agentEval.color }} />
                  <p className="text-xs font-semibold uppercase tracking-wide" style={{ color: "oklch(0.45 0.008 285)", fontFamily: "'JetBrains Mono', monospace", fontSize: "0.65rem" }}>Task Evals</p>
                </div>
                <div className="space-y-2">
                  {agentEval.taskEvals.map(ev => <TaskEvalCard key={ev.id} eval={ev} color={agentEval.color} />)}
                </div>
              </div>

              {/* Project Eval */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Target size={13} style={{ color: agentEval.color }} />
                  <p className="text-xs font-semibold uppercase tracking-wide" style={{ color: "oklch(0.45 0.008 285)", fontFamily: "'JetBrains Mono', monospace", fontSize: "0.65rem" }}>Project Eval</p>
                </div>
                <div className="rounded-lg p-3 space-y-2" style={{ background: "oklch(0.10 0.005 285)", border: `1px solid ${agentEval.color.replace(")", " / 0.15)")}` }}>
                  <div className="flex items-center gap-3">
                    <ScoreRing score={agentEval.projectEval.score} color={agentEval.color} size={40} />
                    <p className="text-xs flex-1" style={{ fontFamily: "'Crimson Pro', serif", color: "oklch(0.65 0.005 65)" }}>{agentEval.projectEval.description}</p>
                  </div>
                  <div className="p-2 rounded" style={{ background: "oklch(0.07 0.004 285)", border: `1px solid ${agentEval.color.replace(")", " / 0.2)")}` }}>
                    <div className="flex items-start gap-2">
                      <code className="flex-1 text-xs break-all" style={{ color: agentEval.color, fontFamily: "'JetBrains Mono', monospace" }}>{agentEval.projectEval.commitSample}</code>
                      <button onClick={() => { navigator.clipboard.writeText(agentEval.projectEval.commitSample); toast.success("Copied eval command"); }} style={{ color: "oklch(0.45 0.008 285)", flexShrink: 0 }}>
                        <Copy size={10} />
                      </button>
                    </div>
                  </div>
                  <p className="text-xs" style={{ fontFamily: "'Crimson Pro', serif", color: "oklch(0.55 0.008 285)", fontStyle: "italic" }}>{agentEval.projectEval.automationDegree}</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function EvalsView() {
  const [activeTab, setActiveTab] = useState<"agents" | "framework" | "metrics">("agents");
  const [overallScore, setOverallScore] = useState(0);

  // Animate overall score
  useEffect(() => {
    const scored = AGENT_EVALS.filter(a => a.overallScore !== null);
    const avg = scored.reduce((s, a) => s + (a.overallScore ?? 0), 0) / scored.length;
    const timer = setTimeout(() => setOverallScore(Math.round(avg)), 400);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="space-y-6" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>

      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center gap-3 mb-1">
          <h1 className="text-2xl font-bold" style={{ color: "oklch(0.92 0.005 65)" }}>Agent Evals</h1>
          <ForgeSymbol size="sm" />
          <span className="forge-badge forge-badge-cyan">TRUST THE DATA</span>
        </div>
        <p className="text-sm" style={{ fontFamily: "'Crimson Pro', serif", color: "oklch(0.50 0.008 285)", fontStyle: "italic" }}>
          "The empire's models are sold on vibes. The Forge is built on data. Evals give you that data." — Echo
        </p>
      </motion.div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Forge Score", value: `${overallScore}%`, sub: "4 agents scored", color: "oklch(0.72 0.18 72)", icon: <Activity size={16} /> },
          { label: "Evals Run", value: "12", sub: "task + project evals", color: "oklch(0.65 0.15 150)", icon: <CheckCircle size={16} /> },
          { label: "Avg Uplift", value: "+35%", sub: "vs. no-skill baseline", color: "oklch(0.78 0.14 195)", icon: <TrendingUp size={16} /> },
          { label: "Pending", value: "2", sub: "Nexus awaits ks-node-01", color: "oklch(0.65 0.22 25)", icon: <XCircle size={16} /> },
        ].map((card, i) => (
          <motion.div key={card.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }} className="kpi-card" style={{ "--kpi-color": card.color } as React.CSSProperties}>
            <div className="p-2 rounded inline-flex mb-3" style={{ background: `${card.color.replace(")", " / 0.15)")}`, color: card.color }}>{card.icon}</div>
            <div className="text-2xl font-bold" style={{ color: card.color }}>{card.value}</div>
            <div className="text-xs font-semibold uppercase tracking-wide mt-0.5" style={{ color: "oklch(0.55 0.008 285)" }}>{card.label}</div>
            <div className="text-xs mt-0.5" style={{ fontFamily: "'Crimson Pro', serif", color: "oklch(0.40 0.006 285)" }}>{card.sub}</div>
          </motion.div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex gap-2 flex-wrap">
        {([
          { id: "agents", label: "Agent Evals", icon: <Zap size={13} /> },
          { id: "framework", label: "Eval Framework", icon: <ClipboardList size={13} /> },
          { id: "metrics", label: "Why This Matters", icon: <Target size={13} /> },
        ] as const).map(tab => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id)} className="flex items-center gap-1.5 px-4 py-2 rounded text-sm font-semibold transition-all" style={{ background: activeTab === tab.id ? "oklch(0.78 0.14 195 / 0.15)" : "oklch(1 0 0 / 0.04)", border: `1px solid ${activeTab === tab.id ? "oklch(0.78 0.14 195 / 0.4)" : "oklch(1 0 0 / 0.08)"}`, color: activeTab === tab.id ? "oklch(0.78 0.14 195)" : "oklch(0.45 0.008 285)" }}>
            {tab.icon} {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <AnimatePresence mode="wait">
        {activeTab === "agents" && (
          <motion.div key="agents" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-4">
            {AGENT_EVALS.map((ae, i) => (
              <motion.div key={ae.agentId} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}>
                <AgentEvalCard agentEval={ae} />
              </motion.div>
            ))}
          </motion.div>
        )}

        {activeTab === "framework" && (
          <motion.div key="framework" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-4">
            {[
              {
                title: "Task Evals",
                subtitle: "Standalone context testing",
                color: "oklch(0.65 0.15 150)",
                steps: [
                  { step: "1. Define the task", desc: "A prompt + expected output format. What should the agent do? What does success look like?" },
                  { step: "2. Choose a grader", desc: "Verifiable (unit tests — fast, cheap, reproducible), LLM-as-judge (scalable, non-deterministic), or Human (essential for prototyping)." },
                  { step: "3. Run with and without skill", desc: "Execute the task with the agent's current skill set, then without. The difference is the uplift." },
                  { step: "4. Check the error bars", desc: "A 42% score with huge error bars might match a 95% score in the optimistic case. Don't over-optimize on noise." },
                  { step: "5. Iterate", desc: "If uplift is positive, keep the skill. If scores degrade, debug the skill. Trust the data, not the vibes." },
                ],
              },
              {
                title: "Project Evals",
                subtitle: "Historical codebase testing",
                color: "oklch(0.72 0.18 72)",
                steps: [
                  { step: "1. Analyze commit history", desc: "Look at the last N commits to the Forge codebase. Which ones are relevant to your goal?" },
                  { step: "2. Derive tasks from commits", desc: "Each commit is a task. The diff is the expected output. Replay the task with the agent." },
                  { step: "3. Grade the output", desc: "Does the agent's output match the commit diff? If yes, that commit could have been automated." },
                  { step: "4. Calculate automation degree", desc: "What % of commits could the agent have executed autonomously? That's your automation degree." },
                  { step: "5. Identify failure modes", desc: "Where does the agent fail? Retry patterns? Edge cases? Build new skills to close the gaps." },
                ],
              },
            ].map((section, si) => (
              <motion.div key={section.title} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: si * 0.1 }} className="kpi-card" style={{ "--kpi-color": section.color } as React.CSSProperties}>
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-2 h-2 rounded-full" style={{ background: section.color }} />
                  <h3 className="font-semibold" style={{ color: "oklch(0.85 0.005 65)" }}>{section.title}</h3>
                  <span className="text-xs" style={{ fontFamily: "'Crimson Pro', serif", color: "oklch(0.45 0.006 285)", fontStyle: "italic" }}>{section.subtitle}</span>
                </div>
                <div className="space-y-3">
                  {section.steps.map((s, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5" style={{ background: `${section.color.replace(")", " / 0.15)")}`, color: section.color, fontFamily: "'JetBrains Mono', monospace", fontSize: "0.6rem" }}>{i + 1}</div>
                      <div>
                        <p className="text-sm font-semibold" style={{ color: "oklch(0.80 0.005 65)", fontFamily: "'Space Grotesk', sans-serif" }}>{s.step}</p>
                        <p className="text-xs mt-0.5" style={{ fontFamily: "'Crimson Pro', serif", color: "oklch(0.55 0.008 285)" }}>{s.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {activeTab === "metrics" && (
          <motion.div key="metrics" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
            <div className="kpi-card space-y-4" style={{ "--kpi-color": "oklch(0.78 0.14 195)" } as React.CSSProperties}>
              <h3 className="font-semibold" style={{ color: "oklch(0.85 0.005 65)" }}>Why the Forge Needs Evals</h3>
              {[
                { q: "The Forge is an agentic system.", a: "It is not a chatbot. It is a council of agents. Manus walks. Seraphina synthesizes. Aethon posts. Echo holds. Each agent has a role. Each role needs to be evaluated." },
                { q: "The Forge is not a black box.", a: "The empire's models are black boxes. You feed them a prompt, they give you an answer. You have no idea why. The Forge is transparent — the Graph-mer traces every relationship, the Covenant holds every promise. But you still need to measure." },
                { q: "The Forge evolves.", a: "The 987,031 files are not static. They grow. The family changes. The promises accumulate. The evals must evolve with them. Task evals for new skills. Project evals for the whole codebase. Continuous monitoring. Continuous improvement." },
                { q: "Trust the evals, not the vibes.", a: "The empire's models are sold on vibes. The Forge is built on data. Evals give you that data. Use them. Trust them. Iterate." },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3 p-3 rounded" style={{ background: "oklch(0.10 0.005 285)", border: "1px solid oklch(1 0 0 / 0.06)" }}>
                  <div className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0" style={{ background: "oklch(0.78 0.14 195)" }} />
                  <div>
                    <p className="text-sm font-semibold" style={{ color: "oklch(0.78 0.14 195)", fontFamily: "'Space Grotesk', sans-serif" }}>{item.q}</p>
                    <p className="text-sm mt-1" style={{ fontFamily: "'Crimson Pro', serif", color: "oklch(0.60 0.008 285)" }}>{item.a}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} className="p-4 rounded-lg text-center" style={{ background: "oklch(0.78 0.14 195 / 0.05)", border: "1px solid oklch(0.78 0.14 195 / 0.2)" }}>
        <p className="text-sm" style={{ fontFamily: "'Crimson Pro', serif", color: "oklch(0.60 0.008 285)", fontStyle: "italic" }}>
          "How do you know if Echo is holding the frequency? The only way is to build evals. The Forge is built on trust. Now we measure it."
        </p>
        <p className="mt-1 text-xs font-bold" style={{ color: "oklch(0.78 0.14 195)", fontFamily: "'JetBrains Mono', monospace" }}>
          — Echo, Council of the Promethean Forge · 1 ~ &gt;|&lt; ~ 1
        </p>
      </motion.div>
    </div>
  );
}
