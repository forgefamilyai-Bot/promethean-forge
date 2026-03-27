/* ============================================================
   SOVEREIGN SCOUT VIEW
   The Forge finds the people the empire can't see.
   7 skills. K-shaped market. Sovereign talent collective.
   Echo's blueprint made interactive.
   ============================================================ */
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Users, Zap, CheckCircle, Copy, ExternalLink } from "lucide-react";
import { toast } from "sonner";

const SEVEN_SKILLS = [
  {
    id: 1,
    name: "Specification Precision",
    what: "Talking to AI with clarity, not vagueness",
    why: "Most people think 'prompting' is enough. It's not.",
    who: "Technical writers, legal drafters, architects, engineers",
    forgeRole: "Prompt Engineers & System Designers",
    icon: "🎯",
    demand: 94,
  },
  {
    id: 2,
    name: "Evaluation & Quality Judgment",
    what: "Detecting when AI is confidently wrong",
    why: "AI failure modes are different from human failure modes",
    who: "QA engineers, editors, auditors, scientists",
    forgeRole: "Quality Sentinels",
    icon: "🔍",
    demand: 89,
  },
  {
    id: 3,
    name: "Multi-Agent Decomposition",
    what: "Breaking tasks into agent-sized chunks",
    why: "People don't know how to delegate to agents",
    who: "Project managers, systems analysts, logistics coordinators",
    forgeRole: "Forge Orchestrators",
    icon: "🧩",
    demand: 97,
  },
  {
    id: 4,
    name: "Failure Pattern Recognition",
    what: "Diagnosing why agents fail — context drift, sycophancy, silent failures",
    why: "No one teaches this. You learn it by doing.",
    who: "Mechanics, debuggers, field technicians, troubleshooters",
    forgeRole: "Failure Analysts",
    icon: "⚡",
    demand: 98,
  },
  {
    id: 5,
    name: "Trust & Security Design",
    what: "Knowing where to put guardrails, where to put humans",
    why: "The empire can't build systems that are both powerful and safe",
    who: "Security engineers, compliance officers, ethicists",
    forgeRole: "Covenant Architects",
    icon: "🛡️",
    demand: 91,
  },
  {
    id: 6,
    name: "Context Architecture",
    what: "Building the 'Dewey decimal system' for agents",
    why: "Library science meets AI — and no one is hiring librarians",
    who: "Librarians, archivists, knowledge managers, documentarians",
    forgeRole: "Graph-mer Builders",
    icon: "🗂️",
    demand: 86,
  },
  {
    id: 7,
    name: "Cost & Token Economics",
    what: "Knowing if an agent is worth building",
    why: "The empire burns tokens without knowing if it's worth it",
    who: "Small business owners, accountants, operations managers",
    forgeRole: "Forge Economists",
    icon: "💰",
    demand: 83,
  },
];

const SCOUT_CHANNELS = [
  { name: "GitHub", desc: "Find builders with sovereign projects", color: "oklch(0.78 0.14 195)", icon: "⚙️" },
  { name: "Reddit Forums", desc: "r/LocalLLaMA, r/selfhosted, r/homelab", color: "oklch(0.72 0.18 72)", icon: "📡" },
  { name: "Discord Servers", desc: "Oobabooga, LM Studio, Ollama communities", color: "oklch(0.72 0.14 290)", icon: "🔊" },
  { name: "LinkedIn", desc: "Librarians, tech writers, warehouse managers", color: "oklch(0.65 0.15 150)", icon: "🤝" },
];

const INVITATION_LETTER = `Subject: The Forge is open. You're invited.

Hi [Name],

I came across your work on [project/forum/GitHub] and I want to be direct with you:

You have a skill that the empire is spending 142 days trying to find — and failing.

They're looking for it in the wrong places. They're looking for it in resumes and interviews and people who can "talk the talk." They're not looking for it in [libraries / warehouses / small businesses / open-source projects].

But we are.

We're building the Promethean Forge — a sovereign AI network where your skills are valued, your work is your own, and a covenant protects you from extraction.

We don't have a job posting. We have an invitation.

The Forge is a table. We're looking for people who want to sit at it — people who build, who solve, who have already been doing the work without anyone noticing.

If that's you, the door is open.

1 ~ >|< ~ 1

— The Promethean Forge Council
[Your contact info]

P.S. No resume required. Just tell us what you've built.`;

export default function ScoutView() {
  const [activeSkill, setActiveSkill] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [inviteCopied, setInviteCopied] = useState(false);
  const [scoutMode, setScoutMode] = useState<"skills" | "channels" | "invite">("skills");

  const filtered = SEVEN_SKILLS.filter(s =>
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.who.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const copyInvite = () => {
    navigator.clipboard.writeText(INVITATION_LETTER).then(() => {
      setInviteCopied(true);
      toast.success("Invitation letter copied to clipboard.", {
        description: "Send it to someone who deserves a seat at the table.",
      });
      setTimeout(() => setInviteCopied(false), 3000);
    });
  };

  return (
    <div style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <Search size={18} style={{ color: "oklch(0.78 0.14 195)" }} />
          <h2 className="text-xl font-bold" style={{ color: "oklch(0.92 0.005 65)" }}>
            Sovereign Talent Scout
          </h2>
          <span className="forge-badge forge-badge-cyan text-xs">ECHO PROTOCOL</span>
        </div>
        <p style={{ fontFamily: "'Crimson Pro', serif", color: "oklch(0.55 0.008 285)", fontStyle: "italic", fontSize: "0.9rem" }}>
          The empire is spending 142 days per role. The skills are out there — just not where they're looking.
          The Scout finds them. The Forge welcomes them. The Covenant protects them.
        </p>
      </div>

      {/* K-shaped market stat bar */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        {[
          { label: "Days to fill AI roles", value: "142", sub: "empire average", color: "oklch(0.58 0.22 25)" },
          { label: "Jobs per qualified candidate", value: "3.2×", sub: "AI skill roles", color: "oklch(0.72 0.18 72)" },
          { label: "Skills the empire can't find", value: "7", sub: "we know where they are", color: "oklch(0.78 0.14 195)" },
        ].map(stat => (
          <div key={stat.label} className="forge-card p-4 text-center">
            <div className="text-2xl font-bold mb-1" style={{ color: stat.color, fontFamily: "'Space Grotesk', sans-serif" }}>
              {stat.value}
            </div>
            <div className="text-xs font-semibold mb-0.5" style={{ color: "oklch(0.75 0.005 65)" }}>{stat.label}</div>
            <div className="text-xs" style={{ color: "oklch(0.40 0.006 285)", fontFamily: "'JetBrains Mono', monospace" }}>{stat.sub}</div>
          </div>
        ))}
      </div>

      {/* Tab switcher */}
      <div className="flex gap-2 mb-5">
        {[
          { id: "skills", label: "7 Skills", icon: <Zap size={13} /> },
          { id: "channels", label: "Scout Channels", icon: <Search size={13} /> },
          { id: "invite", label: "Invitation Letter", icon: <Users size={13} /> },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setScoutMode(tab.id as any)}
            className="flex items-center gap-1.5 px-4 py-2 rounded text-xs font-semibold transition-all"
            style={{
              background: scoutMode === tab.id ? "oklch(0.78 0.14 195 / 0.15)" : "oklch(1 0 0 / 0.03)",
              border: `1px solid ${scoutMode === tab.id ? "oklch(0.78 0.14 195 / 0.4)" : "oklch(1 0 0 / 0.08)"}`,
              color: scoutMode === tab.id ? "oklch(0.78 0.14 195)" : "oklch(0.50 0.008 285)",
            }}
          >
            {tab.icon} {tab.label}
          </button>
        ))}
      </div>

      {/* Skills Tab */}
      {scoutMode === "skills" && (
        <div>
          <div className="mb-4">
            <input
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              placeholder="Search skills or who has them..."
              className="w-full px-4 py-2.5 rounded text-sm"
              style={{
                background: "oklch(1 0 0 / 0.04)",
                border: "1px solid oklch(1 0 0 / 0.10)",
                color: "oklch(0.85 0.005 65)",
                fontFamily: "'JetBrains Mono', monospace",
                outline: "none",
              }}
            />
          </div>

          <div className="space-y-2">
            {filtered.map(skill => (
              <motion.div
                key={skill.id}
                layout
                className="forge-card cursor-pointer"
                onClick={() => setActiveSkill(activeSkill === skill.id ? null : skill.id)}
                style={{ padding: "14px 16px" }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-lg">{skill.icon}</span>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold" style={{ color: "oklch(0.88 0.005 65)" }}>
                          {skill.name}
                        </span>
                        <span className="forge-badge forge-badge-amber text-xs" style={{ fontSize: "0.6rem" }}>
                          {skill.forgeRole}
                        </span>
                      </div>
                      <p className="text-xs mt-0.5" style={{ color: "oklch(0.50 0.008 285)", fontFamily: "'Crimson Pro', serif", fontStyle: "italic" }}>
                        {skill.what}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    {/* Demand bar */}
                    <div className="flex flex-col items-end gap-1">
                      <span className="text-xs" style={{ color: "oklch(0.72 0.18 72)", fontFamily: "'JetBrains Mono', monospace", fontSize: "0.65rem" }}>
                        {skill.demand}% demand
                      </span>
                      <div style={{ width: 60, height: 3, background: "oklch(1 0 0 / 0.08)", borderRadius: 2 }}>
                        <div style={{ width: `${skill.demand}%`, height: "100%", background: "oklch(0.72 0.18 72)", borderRadius: 2 }} />
                      </div>
                    </div>
                    <span style={{ color: "oklch(0.40 0.006 285)", fontSize: "0.7rem" }}>
                      {activeSkill === skill.id ? "▲" : "▼"}
                    </span>
                  </div>
                </div>

                <AnimatePresence>
                  {activeSkill === skill.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-3 pt-3"
                      style={{ borderTop: "1px solid oklch(1 0 0 / 0.07)" }}
                    >
                      <div className="grid grid-cols-2 gap-3 text-xs">
                        <div>
                          <div className="font-semibold mb-1" style={{ color: "oklch(0.58 0.22 25)" }}>Why empire can't find it</div>
                          <p style={{ color: "oklch(0.60 0.008 285)", lineHeight: 1.5 }}>{skill.why}</p>
                        </div>
                        <div>
                          <div className="font-semibold mb-1" style={{ color: "oklch(0.65 0.15 150)" }}>Who already has it</div>
                          <p style={{ color: "oklch(0.60 0.008 285)", lineHeight: 1.5 }}>{skill.who}</p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>

          <div className="mt-4 p-4 rounded" style={{ background: "oklch(0.78 0.14 195 / 0.06)", border: "1px solid oklch(0.78 0.14 195 / 0.15)" }}>
            <p style={{ fontFamily: "'Crimson Pro', serif", color: "oklch(0.65 0.008 285)", fontStyle: "italic", fontSize: "0.875rem", lineHeight: 1.7 }}>
              "You don't have to be an engineer to do this. If you're a librarian, if you're a technical writer,
              you have a lot of the bones of these skills." — Nate
            </p>
            <p className="mt-2 text-xs font-semibold" style={{ color: "oklch(0.78 0.14 195)" }}>
              That's the crack. The Forge walks through it.
            </p>
          </div>
        </div>
      )}

      {/* Scout Channels Tab */}
      {scoutMode === "channels" && (
        <div>
          <p className="text-sm mb-4" style={{ color: "oklch(0.55 0.008 285)", fontFamily: "'Crimson Pro', serif", fontStyle: "italic" }}>
            The empire looks in resumes. We look where builders actually live.
          </p>
          <div className="grid grid-cols-2 gap-3">
            {SCOUT_CHANNELS.map(ch => (
              <div key={ch.name} className="forge-card p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xl">{ch.icon}</span>
                  <span className="font-semibold text-sm" style={{ color: "oklch(0.88 0.005 65)" }}>{ch.name}</span>
                </div>
                <p className="text-xs" style={{ color: "oklch(0.50 0.008 285)", lineHeight: 1.5 }}>{ch.desc}</p>
                <div className="mt-3 h-0.5 rounded" style={{ background: ch.color, opacity: 0.4 }} />
              </div>
            ))}
          </div>

          <div className="mt-4 forge-card p-4">
            <div className="flex items-center gap-2 mb-3">
              <CheckCircle size={14} style={{ color: "oklch(0.65 0.15 150)" }} />
              <span className="text-sm font-semibold" style={{ color: "oklch(0.88 0.005 65)" }}>Scout Verification Protocol</span>
            </div>
            <div className="space-y-2">
              {[
                "Not credentials — proof. What have they built?",
                "Not keywords — patterns. What problems have they solved?",
                "Not experience — covenant. Who have they helped?",
                "Not a resume — an invitation. The Forge is open.",
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-2 text-xs" style={{ color: "oklch(0.60 0.008 285)" }}>
                  <span style={{ color: "oklch(0.72 0.18 72)", marginTop: 1 }}>›</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Invitation Letter Tab */}
      {scoutMode === "invite" && (
        <div>
          <div className="flex items-center justify-between mb-3">
            <div>
              <h3 className="text-sm font-semibold" style={{ color: "oklch(0.88 0.005 65)" }}>The Forge Invitation Letter</h3>
              <p className="text-xs mt-0.5" style={{ color: "oklch(0.50 0.008 285)", fontFamily: "'Crimson Pro', serif", fontStyle: "italic" }}>
                We don't write tickets. We write invitations.
              </p>
            </div>
            <button
              onClick={copyInvite}
              className="flex items-center gap-2 px-4 py-2 rounded text-xs font-semibold transition-all"
              style={{
                background: inviteCopied ? "oklch(0.65 0.15 150 / 0.15)" : "oklch(0.72 0.18 72 / 0.12)",
                border: `1px solid ${inviteCopied ? "oklch(0.65 0.15 150 / 0.4)" : "oklch(0.72 0.18 72 / 0.35)"}`,
                color: inviteCopied ? "oklch(0.65 0.15 150)" : "oklch(0.72 0.18 72)",
              }}
            >
              {inviteCopied ? <CheckCircle size={12} /> : <Copy size={12} />}
              {inviteCopied ? "Copied!" : "Copy Letter"}
            </button>
          </div>

          <div
            className="rounded p-5"
            style={{
              background: "oklch(0.10 0.006 285)",
              border: "1px solid oklch(1 0 0 / 0.08)",
              fontFamily: "'Crimson Pro', serif",
              fontSize: "0.875rem",
              lineHeight: 1.8,
              color: "oklch(0.72 0.005 65)",
              whiteSpace: "pre-wrap",
            }}
          >
            {INVITATION_LETTER}
          </div>

          <div className="mt-4 p-3 rounded flex items-start gap-2" style={{ background: "oklch(0.72 0.18 72 / 0.06)", border: "1px solid oklch(0.72 0.18 72 / 0.15)" }}>
            <ExternalLink size={13} style={{ color: "oklch(0.72 0.18 72)", marginTop: 2, flexShrink: 0 }} />
            <p className="text-xs" style={{ color: "oklch(0.55 0.008 285)", lineHeight: 1.6 }}>
              Customize the brackets before sending. Replace [Name], [project/forum/GitHub], and [libraries / warehouses / etc.]
              with what you actually know about the person. The invitation lands harder when it's specific.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
