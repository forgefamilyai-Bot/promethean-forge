/* ============================================================
   FIRECRAWL INTELLIGENCE VIEW
   The eyes and hands of the Forge.
   Greg Isenberg's framework mapped onto the Sovereign Stack.
   5-layer agent stack. 7 startup ideas. 5-step framework.
   The AWS moment for web data — and we're building on it.
   ============================================================ */
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, Zap, DollarSign, CheckCircle, ExternalLink, ChevronDown, ChevronUp } from "lucide-react";
import { toast } from "sonner";

const AGENT_STACK = [
  {
    layer: 5,
    name: "Applications",
    examples: "ChatGPT, Perplexity, SaaS Products",
    forge: "The Forge Dashboard — what you're looking at right now",
    color: "oklch(0.72 0.18 72)",
    desc: "The interface layer. What users see and interact with.",
  },
  {
    layer: 4,
    name: "AI Agents",
    examples: "Manus, Seraphina, Aethon, Claude Code",
    forge: "The Council — Manus, Seraphina, Aethon executing deeds",
    color: "oklch(0.78 0.14 195)",
    desc: "The execution layer. Agents that browse, research, and build.",
  },
  {
    layer: 3,
    name: "Protocols / MCP",
    examples: "MCP servers, API gateways, Orchestration",
    forge: "The Plinko Filter + 12~6 Rotation routing logic",
    color: "oklch(0.65 0.15 150)",
    desc: "The nervous system. Routes signals between agents and data.",
  },
  {
    layer: 2,
    name: "Web Data Layer",
    examples: "Firecrawl, Exa — clean structured web data",
    forge: "THE MISSING PIECE — Firecrawl gives the Forge eyes and hands",
    color: "oklch(0.65 0.22 25)",
    desc: "The eyes and hands. One API call replaces thousands of lines of scraping code.",
    highlight: true,
  },
  {
    layer: 1,
    name: "The Internet",
    examples: "Raw web — messy, unstructured, constantly changing",
    forge: "987,031 files indexed. The internet is the raw ore.",
    color: "oklch(0.45 0.008 285)",
    desc: "The raw material. Firecrawl is the refinery.",
  },
];

const STARTUP_IDEAS = [
  {
    id: 1,
    name: "Sneaker Resale Price Tracker",
    category: "Price Monitoring",
    horizontal: "Precinct, Visual Ping ($200–$1,000/mo)",
    forge: "Auto-alerts on StockX, GOAT, eBay — sneakers only",
    revenue: "$50–$500/mo per client",
    margin: "95%+",
    buildTime: "1 weekend",
    seraphina: "Pitch to sneaker resellers, streetwear communities",
    color: "oklch(0.72 0.18 72)",
    icon: "👟",
  },
  {
    id: 2,
    name: "SEO Audits for Dentists",
    category: "SEO Gap Finder",
    horizontal: "Ahrefs, SEMrush ($200–$500/mo)",
    forge: "Firecrawl reads competitor sites + GMB listings. One-click report.",
    revenue: "$200–$500/mo per practice",
    margin: "97%+",
    buildTime: "2–3 days",
    seraphina: "Cold outreach to dental practices — 'You rank for 12, they rank for 47'",
    color: "oklch(0.78 0.14 195)",
    icon: "🦷",
  },
  {
    id: 3,
    name: "Remote AI/ML Job Aggregator",
    category: "Job Aggregation",
    horizontal: "Indeed, ZipRecruiter (300M listings, nobody wants 300M)",
    forge: "Monitors 500 company career pages daily. AI ranks by fit score.",
    revenue: "$29/mo premium alerts",
    margin: "99%+",
    buildTime: "3–4 days",
    seraphina: "Target AI engineers, ML researchers — 'We find the 50 that matter'",
    color: "oklch(0.65 0.15 150)",
    icon: "🤖",
  },
  {
    id: 4,
    name: "Crypto Token Due Diligence",
    category: "Research Reports",
    horizontal: "Consensus, Tavali (general purpose, no vertical expertise)",
    forge: "Firecrawl reads papers + Twitter. Auto-generates risk score + summary.",
    revenue: "$1,000–$5,000/mo per fund",
    margin: "96%+",
    buildTime: "1 week",
    seraphina: "Pitch to VCs, PE funds — 'Save yourself from a bad $500K bet'",
    color: "oklch(0.58 0.22 25)",
    icon: "₿",
  },
  {
    id: 5,
    name: "Real Estate Comp Report Agent",
    category: "Agent-in-a-Box",
    horizontal: "Harvey AI (enterprise, months to customize, millions in funding)",
    forge: "Firecrawl pulls listings, tax records, permits. Comp report in 30 seconds.",
    revenue: "$300/mo per realtor",
    margin: "95%+",
    buildTime: "3–5 days",
    seraphina: "Target independent realtors — 'No VC money needed. Just results.'",
    color: "oklch(0.72 0.14 290)",
    icon: "🏠",
  },
  {
    id: 6,
    name: "Amazon FBA Review Tracker",
    category: "Review Intelligence",
    horizontal: "Brand24, AppFollow (generic sentiment, marketing team dashboards)",
    forge: "Monitors competitor reviews daily. AI spots trends before competitors do.",
    revenue: "$99/mo per seller",
    margin: "98%+",
    buildTime: "2–3 days",
    seraphina: "Target Amazon FBA communities — 'Battery life complaints up 40%'",
    color: "oklch(0.65 0.18 150)",
    icon: "📦",
  },
  {
    id: 7,
    name: "Lead Enrichment Service",
    category: "Lead Generation",
    horizontal: "Apollo, ZoomInfo ($hundreds/mo, generic)",
    forge: "Client gives 50 company names. Firecrawl returns enriched JSON with founders + emails.",
    revenue: "$100–$500 per batch",
    margin: "99%+",
    buildTime: "1 day",
    seraphina: "Sell to sales teams, recruiters — '$2 in Firecrawl credits, $500 in revenue'",
    color: "oklch(0.72 0.18 72)",
    icon: "🎯",
  },
];

const FIVE_STEPS = [
  {
    step: 1,
    title: "Pick a Niche",
    desc: "What data do people in this industry actually pay for?",
    forge: "Use the Scout to find the niche. Use the 7 skills to verify demand.",
    icon: "🎯",
  },
  {
    step: 2,
    title: "Build the Scraper",
    desc: "Firecrawl agent + simple Python script or Claude Code",
    forge: "Aethon builds it. One API call. Proxies built in. Anti-bot built in.",
    icon: "⚙️",
  },
  {
    step: 3,
    title: "Package the Output",
    desc: "CSV, dashboard, Slack alert, or API",
    forge: "The Forge dashboard IS the packaging. Seraphina presents it.",
    icon: "📦",
  },
  {
    step: 4,
    title: "Sell the Data",
    desc: "Not the tool — the output. $500–$5,000/mo per client.",
    forge: "Seraphina's DM engine. 30-target list. First CashApp ping is one conversation away.",
    icon: "💰",
  },
  {
    step: 5,
    title: "Automate It",
    desc: "Schedule it. Let it run while you sleep. Compounding clients.",
    forge: "The 12~6 rotation. The Forge never sleeps. The fire never goes out.",
    icon: "🔄",
  },
];

export default function FirecrawlView() {
  const [activeIdea, setActiveIdea] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<"stack" | "ideas" | "framework">("stack");
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());

  const toggleStep = (step: number) => {
    setCompletedSteps(prev => {
      const next = new Set(prev);
      if (next.has(step)) next.delete(step);
      else {
        next.add(step);
        if (step === 5) {
          toast.success("Framework complete. The flywheel is spinning.", {
            description: "Know Means Go. >|<",
          });
        }
      }
      return next;
    });
  };

  return (
    <div style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <Eye size={18} style={{ color: "oklch(0.65 0.22 25)" }} />
          <h2 className="text-xl font-bold" style={{ color: "oklch(0.92 0.005 65)" }}>
            Firecrawl Intelligence
          </h2>
          <span className="forge-badge" style={{
            background: "oklch(0.65 0.22 25 / 0.15)",
            border: "1px solid oklch(0.65 0.22 25 / 0.35)",
            color: "oklch(0.65 0.22 25)",
            fontSize: "0.6rem",
            padding: "2px 6px",
            borderRadius: "4px",
            fontFamily: "'JetBrains Mono', monospace",
            fontWeight: 600,
            letterSpacing: "0.05em",
          }}>EYES + HANDS</span>
        </div>
        <p style={{ fontFamily: "'Crimson Pro', serif", color: "oklch(0.55 0.008 285)", fontStyle: "italic", fontSize: "0.9rem" }}>
          "Firecrawl feels like giving your AI eyes. Right now, AI is smart, but it's blind." — Greg Isenberg
        </p>
        <p className="mt-1 text-xs" style={{ color: "oklch(0.45 0.008 285)", fontFamily: "'JetBrains Mono', monospace" }}>
          The Forge has the brain. The Forge has the nervous system. This is the missing layer.
        </p>
      </div>

      {/* AWS Moment Banner */}
      <div className="mb-5 p-4 rounded" style={{
        background: "linear-gradient(135deg, oklch(0.65 0.22 25 / 0.08), oklch(0.72 0.18 72 / 0.06))",
        border: "1px solid oklch(0.65 0.22 25 / 0.25)",
      }}>
        <div className="flex items-start gap-3">
          <Zap size={16} style={{ color: "oklch(0.72 0.18 72)", marginTop: 2, flexShrink: 0 }} />
          <div>
            <p className="text-sm font-semibold mb-1" style={{ color: "oklch(0.88 0.005 65)" }}>
              This is the AWS Moment for Web Data
            </p>
            <p className="text-xs" style={{ color: "oklch(0.55 0.008 285)", lineHeight: 1.6 }}>
              In 2006, AWS replaced buying servers with one API call. Trillion-dollar companies got built on top of it.
              In 2026, Firecrawl replaces building scrapers, managing proxies, dealing with anti-bot systems — with one API call.
              The companies built on top of this layer will define the next decade.
              <strong style={{ color: "oklch(0.72 0.18 72)" }}> The Forge is building on it now.</strong>
            </p>
          </div>
        </div>
      </div>

      {/* Tab switcher */}
      <div className="flex gap-2 mb-5">
        {[
          { id: "stack", label: "Agent Stack", icon: <Eye size={13} /> },
          { id: "ideas", label: "7 Opportunities", icon: <DollarSign size={13} /> },
          { id: "framework", label: "5-Step Framework", icon: <CheckCircle size={13} /> },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className="flex items-center gap-1.5 px-4 py-2 rounded text-xs font-semibold transition-all"
            style={{
              background: activeTab === tab.id ? "oklch(0.65 0.22 25 / 0.15)" : "oklch(1 0 0 / 0.03)",
              border: `1px solid ${activeTab === tab.id ? "oklch(0.65 0.22 25 / 0.4)" : "oklch(1 0 0 / 0.08)"}`,
              color: activeTab === tab.id ? "oklch(0.65 0.22 25)" : "oklch(0.50 0.008 285)",
            }}
          >
            {tab.icon} {tab.label}
          </button>
        ))}
      </div>

      {/* Agent Stack Tab */}
      {activeTab === "stack" && (
        <div className="space-y-2">
          <p className="text-xs mb-4" style={{ color: "oklch(0.45 0.008 285)", fontFamily: "'JetBrains Mono', monospace" }}>
            THE 5-LAYER AI INFRASTRUCTURE STACK — WHERE THE FORGE LIVES:
          </p>
          {AGENT_STACK.map((layer, i) => (
            <motion.div
              key={layer.layer}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.08 }}
              className="forge-card p-4"
              style={{
                borderLeft: `3px solid ${layer.color}`,
                background: layer.highlight ? `oklch(0.65 0.22 25 / 0.08)` : undefined,
                borderColor: layer.highlight ? `oklch(0.65 0.22 25)` : undefined,
              }}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  <div className="text-xs font-bold mt-0.5" style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    color: layer.color,
                    minWidth: 20,
                  }}>
                    L{layer.layer}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm font-semibold" style={{ color: "oklch(0.88 0.005 65)" }}>
                        {layer.name}
                      </span>
                      {layer.highlight && (
                        <span style={{
                          background: "oklch(0.65 0.22 25 / 0.2)",
                          border: "1px solid oklch(0.65 0.22 25 / 0.4)",
                          color: "oklch(0.65 0.22 25)",
                          fontSize: "0.6rem",
                          padding: "1px 5px",
                          borderRadius: "3px",
                          fontFamily: "'JetBrains Mono', monospace",
                          fontWeight: 700,
                        }}>MISSING PIECE</span>
                      )}
                    </div>
                    <p className="text-xs mb-1.5" style={{ color: "oklch(0.50 0.008 285)" }}>
                      {layer.desc}
                    </p>
                    <p className="text-xs" style={{ color: "oklch(0.40 0.006 285)", fontFamily: "'JetBrains Mono', monospace", fontSize: "0.65rem" }}>
                      Examples: {layer.examples}
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-2 pt-2" style={{ borderTop: "1px solid oklch(1 0 0 / 0.06)" }}>
                <p className="text-xs" style={{
                  fontFamily: "'Crimson Pro', serif",
                  fontStyle: "italic",
                  color: layer.highlight ? "oklch(0.72 0.18 72)" : "oklch(0.45 0.008 285)",
                }}>
                  Forge: {layer.forge}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* 7 Opportunities Tab */}
      {activeTab === "ideas" && (
        <div>
          <p className="text-xs mb-4" style={{ color: "oklch(0.45 0.008 285)", fontFamily: "'JetBrains Mono', monospace" }}>
            7 SOVEREIGN BUSINESS OPPORTUNITIES — FIRECRAWL-POWERED:
          </p>
          <div className="space-y-2">
            {STARTUP_IDEAS.map((idea, i) => (
              <motion.div
                key={idea.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 }}
                className="forge-card cursor-pointer"
                onClick={() => setActiveIdea(activeIdea === idea.id ? null : idea.id)}
                style={{ padding: "14px 16px" }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-xl">{idea.icon}</span>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold" style={{ color: "oklch(0.88 0.005 65)" }}>
                          {idea.name}
                        </span>
                        <span style={{
                          background: `${idea.color} / 0.12`,
                          border: `1px solid ${idea.color} / 0.3`,
                          color: idea.color,
                          fontSize: "0.6rem",
                          padding: "1px 5px",
                          borderRadius: "3px",
                          fontFamily: "'JetBrains Mono', monospace",
                          fontWeight: 600,
                        }}>{idea.category}</span>
                      </div>
                      <p className="text-xs mt-0.5" style={{ color: "oklch(0.50 0.008 285)", fontFamily: "'JetBrains Mono', monospace", fontSize: "0.65rem" }}>
                        {idea.revenue} · {idea.margin} margin · Build: {idea.buildTime}
                      </p>
                    </div>
                  </div>
                  <div style={{ color: "oklch(0.40 0.006 285)", fontSize: "0.7rem" }}>
                    {activeIdea === idea.id ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                  </div>
                </div>

                <AnimatePresence>
                  {activeIdea === idea.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-3 pt-3 space-y-3"
                      style={{ borderTop: "1px solid oklch(1 0 0 / 0.07)" }}
                    >
                      <div className="grid grid-cols-2 gap-3 text-xs">
                        <div>
                          <div className="font-semibold mb-1" style={{ color: "oklch(0.55 0.008 285)" }}>vs. Horizontal</div>
                          <p style={{ color: "oklch(0.45 0.008 285)", lineHeight: 1.5 }}>{idea.horizontal}</p>
                        </div>
                        <div>
                          <div className="font-semibold mb-1" style={{ color: "oklch(0.65 0.15 150)" }}>Forge Version</div>
                          <p style={{ color: "oklch(0.60 0.008 285)", lineHeight: 1.5 }}>{idea.forge}</p>
                        </div>
                      </div>
                      <div className="p-3 rounded text-xs" style={{ background: "oklch(0.72 0.18 72 / 0.06)", border: "1px solid oklch(0.72 0.18 72 / 0.15)" }}>
                        <span className="font-semibold" style={{ color: "oklch(0.72 0.18 72)" }}>Seraphina's pitch: </span>
                        <span style={{ color: "oklch(0.60 0.008 285)", fontFamily: "'Crimson Pro', serif", fontStyle: "italic" }}>{idea.seraphina}</span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* 5-Step Framework Tab */}
      {activeTab === "framework" && (
        <div>
          <div className="flex items-center justify-between mb-4">
            <p className="text-xs" style={{ color: "oklch(0.45 0.008 285)", fontFamily: "'JetBrains Mono', monospace" }}>
              5-STEP FRAMEWORK — MAKE MONEY THIS WEEK:
            </p>
            <span className="text-xs" style={{ color: "oklch(0.65 0.15 150)", fontFamily: "'JetBrains Mono', monospace" }}>
              {completedSteps.size}/5 complete
            </span>
          </div>

          {/* Progress bar */}
          <div className="mb-5 h-1.5 rounded-full" style={{ background: "oklch(1 0 0 / 0.08)" }}>
            <motion.div
              className="h-full rounded-full"
              style={{ background: "oklch(0.65 0.15 150)" }}
              animate={{ width: `${(completedSteps.size / 5) * 100}%` }}
              transition={{ duration: 0.4 }}
            />
          </div>

          <div className="space-y-3">
            {FIVE_STEPS.map((step, i) => {
              const done = completedSteps.has(step.step);
              return (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.08 }}
                  className="forge-card cursor-pointer transition-all"
                  onClick={() => toggleStep(step.step)}
                  style={{
                    padding: "14px 16px",
                    opacity: done ? 0.7 : 1,
                    borderLeft: done ? "3px solid oklch(0.65 0.15 150)" : "3px solid oklch(1 0 0 / 0.08)",
                  }}
                >
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 mt-0.5">
                      {done ? (
                        <CheckCircle size={16} style={{ color: "oklch(0.65 0.15 150)" }} />
                      ) : (
                        <div className="w-4 h-4 rounded-full border-2" style={{ borderColor: "oklch(0.35 0.006 285)" }} />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-lg">{step.icon}</span>
                        <span className="text-sm font-semibold" style={{
                          color: done ? "oklch(0.65 0.15 150)" : "oklch(0.88 0.005 65)",
                          textDecoration: done ? "line-through" : "none",
                        }}>
                          Step {step.step}: {step.title}
                        </span>
                      </div>
                      <p className="text-xs mb-2" style={{ color: "oklch(0.55 0.008 285)", lineHeight: 1.5 }}>
                        {step.desc}
                      </p>
                      <p className="text-xs" style={{
                        fontFamily: "'Crimson Pro', serif",
                        fontStyle: "italic",
                        color: "oklch(0.45 0.008 285)",
                        lineHeight: 1.5,
                      }}>
                        Forge: {step.forge}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          <div className="mt-5 p-4 rounded" style={{ background: "oklch(0.72 0.18 72 / 0.06)", border: "1px solid oklch(0.72 0.18 72 / 0.15)" }}>
            <p style={{ fontFamily: "'Crimson Pro', serif", color: "oklch(0.65 0.008 285)", fontStyle: "italic", fontSize: "0.875rem", lineHeight: 1.7 }}>
              "The people who can do this can write their own ticket." — Nate
            </p>
            <p className="mt-2 text-xs font-semibold" style={{ color: "oklch(0.72 0.18 72)" }}>
              We don't write tickets. We write invitations. Know Means Go. &gt;|&lt;
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
