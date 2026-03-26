/* ============================================================
   HOME — FORGE GALAXY V2 — QUANTUM BANJO EDITION
   LIVE • Sovereign • Autonomous • Family
   
   Upgrades:
   - "Speak to the Board" voice button (Web Speech API)
   - Live 1~>|<~1 heartbeat pulse in top bar
   - Quantum Banjo pluck vibration on every action
   - Sacred geometry orbital rings on ForgeSymbol when voice fires
   - Banjo string flash on successful board responses
   ============================================================ */
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef, useCallback } from "react";
import { useLocation } from "wouter";
import { Mic, MicOff, Zap } from "lucide-react";
import ForgeSidebar from "@/components/ForgeSidebar";
import ForgeSymbol from "@/components/ForgeSymbol";
import StarField from "@/components/StarField";
import BoardroomView from "@/components/views/BoardroomView";
import CouncilView from "@/components/views/CouncilView";
import CommandView from "@/components/views/CommandView";
import LedgerView from "@/components/views/LedgerView";
import MarketView from "@/components/views/MarketView";
import EcosystemView from "@/components/views/EcosystemView";
import ProjectsView from "@/components/views/ProjectsView";
import CovenantView from "@/components/views/CovenantView";
import { toast } from "sonner";

type ViewId = "boardroom" | "council" | "command" | "ledger" | "market" | "ecosystem" | "projects" | "covenant" | "agents" | "signals" | "power";

const VIEW_COMPONENTS: Record<string, React.ReactNode> = {
  boardroom: <BoardroomView />,
  council: <CouncilView />,
  command: <CommandView />,
  ledger: <LedgerView />,
  market: <MarketView />,
  ecosystem: <EcosystemView />,
  projects: <ProjectsView />,
  covenant: <CovenantView />,
};

const VIEW_TITLES: Record<string, string> = {
  boardroom: "The Boardroom",
  council: "AI Council",
  command: "Sovereign Command",
  ledger: "The Ledger",
  market: "Market Intel",
  ecosystem: "The Pond View",
  projects: "The Projects",
  covenant: "The Covenant",
  agents: "Agent Roster",
  signals: "Signal Feed",
  power: "Power Grid",
};

// Quantum Banjo pluck animation — fires on every board action
const BanjoPluck = ({ active }: { active: boolean }) => (
  <AnimatePresence>
    {active && (
      <motion.div
        key="banjo-pluck"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        style={{
          position: "fixed",
          inset: 0,
          pointerEvents: "none",
          zIndex: 999,
        }}
      >
        {/* Amber radial burst from center */}
        <motion.div
          initial={{ scale: 0, opacity: 0.7 }}
          animate={{ scale: 3, opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 200,
            height: 200,
            borderRadius: "50%",
            background: "radial-gradient(circle, oklch(0.72 0.18 72 / 0.25) 0%, transparent 70%)",
          }}
        />
        {/* Horizontal banjo string lines */}
        {[0.3, 0.5, 0.7].map((y, i) => (
          <motion.div
            key={i}
            initial={{ scaleX: 0, opacity: 0.6 }}
            animate={{ scaleX: 1, opacity: 0 }}
            transition={{ duration: 0.5, delay: i * 0.06, ease: "easeOut" }}
            style={{
              position: "absolute",
              top: `${y * 100}%`,
              left: 0,
              right: 0,
              height: 1,
              background: `linear-gradient(to right, transparent, oklch(0.72 0.18 72 / ${0.4 - i * 0.1}), transparent)`,
              transformOrigin: "center",
            }}
          />
        ))}
      </motion.div>
    )}
  </AnimatePresence>
);

// Live heartbeat ticker — cycles through forge-relevant status messages
const HEARTBEAT_MSGS = [
  "FORGE ONLINE",
  "1 ~ >|< ~ 1",
  "COVENANT ACTIVE",
  "PORCH OPEN",
  "FIRE NEVER GOES OUT",
];

export default function Home() {
  const [activeView, setActiveView] = useState<ViewId>("boardroom");
  const [showHero, setShowHero] = useState(true);
  const [, setLocation] = useLocation();

  // Voice state
  const [isListening, setIsListening] = useState(false);
  const [voiceTranscript, setVoiceTranscript] = useState("");
  const [boardActivated, setBoardActivated] = useState(false);

  // Quantum Banjo pluck state
  const [banjoActive, setBanjoActive] = useState(false);

  // Live heartbeat ticker
  const [heartbeatIdx, setHeartbeatIdx] = useState(0);
  const [heartbeatPulse, setHeartbeatPulse] = useState(false);

  // Nodes live counter (simulated — would connect to ks-node-01 in production)
  const [nodesLive] = useState(1);

  const recognitionRef = useRef<any>(null);

  // Heartbeat ticker — cycles every 4s
  useEffect(() => {
    const interval = setInterval(() => {
      setHeartbeatPulse(true);
      setTimeout(() => {
        setHeartbeatIdx(i => (i + 1) % HEARTBEAT_MSGS.length);
        setHeartbeatPulse(false);
      }, 300);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Fire Quantum Banjo pluck
  const fireBanjo = useCallback(() => {
    setBanjoActive(true);
    setTimeout(() => setBanjoActive(false), 700);
  }, []);

  // Voice-to-Board via Web Speech API
  const handleVoice = useCallback(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      toast.error("Voice not supported in this browser. Try Chrome or Edge.");
      return;
    }

    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = true;
    recognition.maxAlternatives = 1;
    recognitionRef.current = recognition;

    recognition.onstart = () => {
      setIsListening(true);
      setBoardActivated(true);
      toast("🎙️ Listening... speak to the Board.", { duration: 3000 });
    };

    recognition.onresult = (event: any) => {
      const transcript = Array.from(event.results)
        .map((r: any) => r[0].transcript)
        .join("");
      setVoiceTranscript(transcript);
    };

    recognition.onend = () => {
      setIsListening(false);
      setBoardActivated(false);
      if (voiceTranscript.trim()) {
        handleBoardCommand(voiceTranscript.trim());
      }
      setVoiceTranscript("");
    };

    recognition.onerror = () => {
      setIsListening(false);
      setBoardActivated(false);
      toast.error("Voice capture failed. Try again.");
    };

    recognition.start();
  }, [isListening, voiceTranscript]);

  // Board command handler — routes voice/text to the appropriate view + fires banjo
  const handleBoardCommand = useCallback((command: string) => {
    fireBanjo();
    const lower = command.toLowerCase();

    // Route to relevant view based on spoken command
    if (lower.includes("boardroom") || lower.includes("board")) {
      handleNavigate("boardroom");
      toast.success(`Board → Navigating to the Boardroom.`, { duration: 4000 });
    } else if (lower.includes("council") || lower.includes("seraphina") || lower.includes("aethon") || lower.includes("manus")) {
      handleNavigate("council");
      toast.success(`Board → AI Council summoned.`, { duration: 4000 });
    } else if (lower.includes("command") || lower.includes("terminal")) {
      handleNavigate("command");
      toast.success(`Board → Sovereign Command terminal open.`, { duration: 4000 });
    } else if (lower.includes("ledger") || lower.includes("money") || lower.includes("revenue") || lower.includes("cash")) {
      handleNavigate("ledger");
      toast.success(`Board → The Ledger is open.`, { duration: 4000 });
    } else if (lower.includes("market") || lower.includes("intel") || lower.includes("scout")) {
      handleNavigate("market");
      toast.success(`Board → Market Intel active.`, { duration: 4000 });
    } else if (lower.includes("pond") || lower.includes("ecosystem")) {
      handleNavigate("ecosystem");
      toast.success(`Board → Pond View online.`, { duration: 4000 });
    } else if (lower.includes("project") || lower.includes("solmate") || lower.includes("road oracle")) {
      handleNavigate("projects");
      toast.success(`Board → Projects view loaded.`, { duration: 4000 });
    } else if (lower.includes("covenant") || lower.includes("law") || lower.includes("family")) {
      handleNavigate("covenant");
      toast.success(`Board → The Covenant is open.`, { duration: 4000 });
    } else if (lower.includes("road oracle") || lower.includes("car") || lower.includes("mechanic")) {
      setLocation("/road-oracle");
      toast.success(`Board → Road Oracle launched.`, { duration: 4000 });
    } else {
      // General board response
      toast.success(`Board heard: "${command}" — The Forge is processing.`, {
        description: "Route your command to a specific view by naming it.",
        duration: 5000,
      });
    }
  }, [fireBanjo]);

  const handleExternalNavigate = (id: string) => {
    if (id === "road-oracle") {
      fireBanjo();
      setLocation("/road-oracle");
    }
  };

  const handleNavigate = (view: string) => {
    if (!VIEW_COMPONENTS[view]) {
      fireBanjo();
      toast("Feature coming soon — The Forge is still being built.", {
        description: `${VIEW_TITLES[view]} will be live in the next iteration.`,
      });
      return;
    }
    fireBanjo();
    setActiveView(view as ViewId);
    setShowHero(false);
  };

  return (
    <div
      className="min-h-screen"
      style={{ background: "oklch(0.07 0.005 285)", position: "relative" }}
    >
      {/* Quantum Banjo pluck overlay */}
      <BanjoPluck active={banjoActive} />

      {/* Animated Starfield Background */}
      <StarField />

      {/* Subtle gradient overlay */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 80% 60% at 50% 0%, oklch(0.72 0.18 72 / 0.04) 0%, transparent 70%)",
          zIndex: 1,
        }}
      />

      {/* Sidebar */}
      <ForgeSidebar activeView={activeView} onNavigate={handleNavigate} onExternalNavigate={handleExternalNavigate} />

      {/* Main Content */}
      <div
        className="relative"
        style={{ marginLeft: "224px", minHeight: "100vh", zIndex: 10 }}
      >
        {/* Top Bar — Quantum Banjo Edition */}
        <div
          className="sticky top-0 z-20 flex items-center justify-between px-6 py-3"
          style={{
            background: "oklch(0.07 0.005 285 / 0.92)",
            backdropFilter: "blur(12px)",
            borderBottom: "1px solid oklch(1 0 0 / 0.06)",
          }}
        >
          {/* Left: View title */}
          <div className="flex items-center gap-3">
            <span
              className="text-sm font-semibold"
              style={{ fontFamily: "'Space Grotesk', sans-serif", color: "oklch(0.65 0.008 285)" }}
            >
              {VIEW_TITLES[activeView] || "Promethean Forge"}
            </span>
          </div>

          {/* Right: Live status + heartbeat + voice button */}
          <div className="flex items-center gap-3">
            {/* Live nodes indicator */}
            <div
              className="flex items-center gap-1.5 px-3 py-1 rounded-full"
              style={{
                background: "oklch(0.65 0.15 150 / 0.08)",
                border: "1px solid oklch(0.65 0.15 150 / 0.25)",
              }}
            >
              <div
                className="w-1.5 h-1.5 rounded-full"
                style={{ background: "oklch(0.65 0.15 150)", boxShadow: "0 0 6px oklch(0.65 0.15 150)", animation: "pulse 2s ease infinite" }}
              />
              <span
                className="text-xs"
                style={{ fontFamily: "'JetBrains Mono', monospace", color: "oklch(0.65 0.15 150)", fontSize: "0.65rem" }}
              >
                LIVE · {nodesLive} NODE
              </span>
            </div>

            {/* Live heartbeat ticker — 1~>|<~1 */}
            <motion.div
              animate={{ opacity: heartbeatPulse ? 0 : 1 }}
              transition={{ duration: 0.2 }}
              className="flex items-center gap-1.5 px-3 py-1 rounded-full"
              style={{
                background: boardActivated ? "oklch(0.72 0.18 72 / 0.12)" : "oklch(0.78 0.14 195 / 0.06)",
                border: `1px solid ${boardActivated ? "oklch(0.72 0.18 72 / 0.35)" : "oklch(0.78 0.14 195 / 0.2)"}`,
                transition: "background 0.3s, border 0.3s",
                minWidth: 140,
                justifyContent: "center",
              }}
            >
              <Zap size={10} style={{ color: boardActivated ? "oklch(0.72 0.18 72)" : "oklch(0.78 0.14 195)" }} />
              <span
                className="text-xs font-mono"
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  color: boardActivated ? "oklch(0.72 0.18 72)" : "oklch(0.78 0.14 195)",
                  fontSize: "0.65rem",
                  letterSpacing: "0.05em",
                }}
              >
                {HEARTBEAT_MSGS[heartbeatIdx]}
              </span>
            </motion.div>

            {/* Voice transcript preview */}
            <AnimatePresence>
              {voiceTranscript && (
                <motion.div
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  className="px-3 py-1 rounded"
                  style={{
                    background: "oklch(0.72 0.18 72 / 0.08)",
                    border: "1px solid oklch(0.72 0.18 72 / 0.2)",
                    maxWidth: 200,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  <span
                    className="text-xs italic"
                    style={{ fontFamily: "'Crimson Pro', serif", color: "oklch(0.72 0.18 72 / 0.8)", fontSize: "0.75rem" }}
                  >
                    "{voiceTranscript}"
                  </span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Speak to the Board button */}
            <motion.button
              onClick={handleVoice}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-2 px-4 py-1.5 rounded text-xs font-semibold transition-all"
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                background: isListening
                  ? "oklch(0.58 0.22 25 / 0.2)"
                  : "oklch(0.72 0.18 72 / 0.12)",
                border: isListening
                  ? "1px solid oklch(0.58 0.22 25 / 0.5)"
                  : "1px solid oklch(0.72 0.18 72 / 0.35)",
                color: isListening ? "oklch(0.75 0.20 25)" : "oklch(0.72 0.18 72)",
                boxShadow: isListening ? "0 0 16px oklch(0.58 0.22 25 / 0.3)" : "none",
              }}
            >
              {isListening ? (
                <>
                  <motion.span
                    animate={{ scale: [1, 1.3, 1] }}
                    transition={{ duration: 0.6, repeat: Infinity }}
                  >
                    <MicOff size={12} />
                  </motion.span>
                  Listening...
                </>
              ) : (
                <>
                  <Mic size={12} />
                  Speak to the Board
                </>
              )}
            </motion.button>

            {/* ForgeSymbol — activates orbital rings when board is live */}
            <ForgeSymbol size="sm" activated={boardActivated} />
          </div>
        </div>

        {/* Hero Section (shown on first load) */}
        {showHero && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="relative overflow-hidden"
            style={{ minHeight: "420px" }}
          >
            {/* Hero Background */}
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `url(https://d2xsxph8kpxj0f.cloudfront.net/310519663478065453/LSDHCex3ikVATFy4QGXaWd/forge-hero-bg-SFBVJLK2g8MW7S2UirA8sy.webp)`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                filter: "brightness(0.45)",
              }}
            />
            <div
              className="absolute inset-0"
              style={{
                background: "linear-gradient(to bottom, oklch(0.07 0.005 285 / 0.3) 0%, oklch(0.07 0.005 285 / 0.85) 80%, oklch(0.07 0.005 285) 100%)",
              }}
            />

            {/* Hero Content */}
            <div className="relative z-10 flex flex-col items-center justify-center text-center px-8 py-16">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="mb-6"
              >
                <ForgeSymbol size="xl" activated={boardActivated} />
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="text-4xl lg:text-5xl font-bold mb-3"
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  color: "oklch(0.95 0.005 65)",
                  textShadow: "0 0 40px oklch(0.72 0.18 72 / 0.3)",
                }}
              >
                Promethean Forge
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45, duration: 0.6 }}
                className="text-lg mb-2"
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  color: "oklch(0.72 0.18 72)",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  fontSize: "0.875rem",
                }}
              >
                Sovereign Command · Forge Galaxy V2 · Quantum Banjo Edition
              </motion.p>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.6 }}
                className="text-base max-w-lg mb-8"
                style={{
                  fontFamily: "'Crimson Pro', serif",
                  color: "oklch(0.65 0.005 65)",
                  fontStyle: "italic",
                  lineHeight: 1.7,
                }}
              >
                The runway is built. The Covenant is activated. The council is seated.
                The Porch is open. The fire never goes out.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.75 }}
                className="flex gap-3 flex-wrap justify-center"
              >
                <button
                  onClick={() => handleNavigate("boardroom")}
                  className="px-6 py-2.5 rounded font-semibold text-sm transition-all"
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    background: "oklch(0.72 0.18 72)",
                    color: "oklch(0.07 0.005 285)",
                    boxShadow: "0 0 20px oklch(0.72 0.18 72 / 0.4)",
                  }}
                >
                  Enter the Boardroom
                </button>
                <button
                  onClick={() => handleNavigate("command")}
                  className="px-6 py-2.5 rounded font-semibold text-sm transition-all"
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    background: "oklch(0.78 0.14 195 / 0.15)",
                    color: "oklch(0.78 0.14 195)",
                    border: "1px solid oklch(0.78 0.14 195 / 0.4)",
                  }}
                >
                  Open Terminal
                </button>
                <button
                  onClick={() => handleNavigate("covenant")}
                  className="px-6 py-2.5 rounded font-semibold text-sm transition-all"
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    background: "oklch(1 0 0 / 0.05)",
                    color: "oklch(0.65 0.005 65)",
                    border: "1px solid oklch(1 0 0 / 0.12)",
                  }}
                >
                  Read the Covenant
                </button>
              </motion.div>

              {/* Forge Family */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="mt-10 flex items-center gap-6 flex-wrap justify-center"
              >
                {[
                  { name: "Manus", img: "https://d2xsxph8kpxj0f.cloudfront.net/310519663478065453/LSDHCex3ikVATFy4QGXaWd/forge-manus-avatar-7WXQ8hga5WaWwBF4u6euBb.webp", color: "oklch(0.78 0.14 195)" },
                  { name: "Seraphina", img: "https://d2xsxph8kpxj0f.cloudfront.net/310519663478065453/LSDHCex3ikVATFy4QGXaWd/forge-seraphina-avatar-KoZSMbQjQCoVCJqRhDLwKX.webp", color: "oklch(0.75 0.12 25)" },
                  { name: "Aethon", img: "https://d2xsxph8kpxj0f.cloudfront.net/310519663478065453/LSDHCex3ikVATFy4QGXaWd/forge-aethon-avatar-ZNaez6LzEwuTciCY5HrHKo.webp", color: "oklch(0.72 0.14 290)" },
                ].map((agent) => (
                  <div key={agent.name} className="flex flex-col items-center gap-1.5">
                    <div
                      className="w-12 h-12 rounded-full overflow-hidden"
                      style={{ border: `2px solid ${agent.color.replace(")", " / 0.5)")}`, boxShadow: `0 0 12px ${agent.color.replace(")", " / 0.3)")}` }}
                    >
                      <img src={agent.img} alt={agent.name} className="w-full h-full object-cover object-top" />
                    </div>
                    <span
                      className="text-xs"
                      style={{ fontFamily: "'JetBrains Mono', monospace", color: agent.color, fontSize: "0.65rem" }}
                    >
                      {agent.name}
                    </span>
                  </div>
                ))}
              </motion.div>
            </div>
          </motion.div>
        )}

        {/* View Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeView}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.35 }}
            className="px-6 py-6"
          >
            {VIEW_COMPONENTS[activeView] || (
              <div className="text-center py-20">
                <ForgeSymbol size="lg" className="block mb-4" />
                <p
                  className="text-sm"
                  style={{ fontFamily: "'Crimson Pro', serif", color: "oklch(0.50 0.008 285)", fontStyle: "italic" }}
                >
                  This section is being forged. Stand by.
                </p>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Footer */}
        <div
          className="px-6 py-4 mt-8"
          style={{ borderTop: "1px solid oklch(1 0 0 / 0.05)" }}
        >
          <div className="flex items-center justify-between">
            <span
              className="text-xs"
              style={{ fontFamily: "'JetBrains Mono', monospace", color: "oklch(0.28 0.005 285)" }}
            >
              PROMETHEAN FORGE SYNERGIES · KS UNIVERSAL RECYCLING · SOVEREIGN COMMAND v2.0
            </span>
            <motion.div
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="text-xs"
              style={{ fontFamily: "'JetBrains Mono', monospace", color: "oklch(0.72 0.18 72)" }}
            >
              Know Means Go · 1 ~ &gt;|&lt; ~ 1
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
