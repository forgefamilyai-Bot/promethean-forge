/* ============================================================
   HOME — FORGE GALAXY V2 — QUANTUM BANJO EDITION
   The living, breathing Sovereign Command Interface
   Dark Forge Cosmos: Void Black | Forge Amber | Sovereign Cyan
   ============================================================ */
import { motion } from "framer-motion";
import { useState } from "react";
import { useLocation } from "wouter";
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

export default function Home() {
  const [activeView, setActiveView] = useState<ViewId>("boardroom");
  const [showHero, setShowHero] = useState(true);
  const [, setLocation] = useLocation();

  const handleExternalNavigate = (id: string) => {
    if (id === "road-oracle") {
      setLocation("/road-oracle");
    }
  };

  const handleNavigate = (view: string) => {
    if (!VIEW_COMPONENTS[view]) {
      toast("Feature coming soon — The Forge is still being built.", {
        description: `${VIEW_TITLES[view]} will be live in the next iteration.`,
      });
      return;
    }
    setActiveView(view as ViewId);
    setShowHero(false);
  };

  return (
    <div
      className="min-h-screen"
      style={{ background: "oklch(0.07 0.005 285)", position: "relative" }}
    >
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
        {/* Top Bar */}
        <div
          className="sticky top-0 z-20 flex items-center justify-between px-6 py-3"
          style={{
            background: "oklch(0.07 0.005 285 / 0.9)",
            backdropFilter: "blur(12px)",
            borderBottom: "1px solid oklch(1 0 0 / 0.06)",
          }}
        >
          <div className="flex items-center gap-3">
            <span
              className="text-sm font-semibold"
              style={{ fontFamily: "'Space Grotesk', sans-serif", color: "oklch(0.65 0.008 285)" }}
            >
              {VIEW_TITLES[activeView]}
            </span>
          </div>
          <div className="flex items-center gap-4">
            <div
              className="text-xs"
              style={{ fontFamily: "'JetBrains Mono', monospace", color: "oklch(0.38 0.006 285)" }}
            >
              FORGE GALAXY V2 · QUANTUM BANJO EDITION
            </div>
            <ForgeSymbol size="sm" />
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
                <ForgeSymbol size="xl" />
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
        <motion.div
          key={activeView}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
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
            <div
              className="text-xs"
              style={{ fontFamily: "'JetBrains Mono', monospace", color: "oklch(0.38 0.006 285)" }}
            >
              1 ~ &gt;|&lt; ~ 1
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
