/* ============================================================
   FORGE SIDEBAR — Sovereign Command Navigation
   Dark Forge Cosmos: vertical nav with amber glow active states
   ============================================================ */
import { motion } from "framer-motion";
import {
  Activity,
  BookOpen,
  ChevronRight,
  Cpu,
  DollarSign,
  Eye,
  Film,
  FlameKindling,
  Globe,
  LayoutDashboard,
  Radio,
  Search,
  Shield,
  Server,
  Star,
  Terminal,
  Users,
  Zap,
  Car,
  Rocket,
  RefreshCw,
} from "lucide-react";
import ForgeSymbol from "./ForgeSymbol";

interface NavItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  badge?: string;
  badgeColor?: string;
}

const NAV_ITEMS: NavItem[] = [
  { id: "boardroom", label: "Boardroom", icon: <LayoutDashboard size={16} />, badge: "LIVE" },
  { id: "council", label: "AI Council", icon: <Users size={16} /> },
  { id: "command", label: "Command", icon: <Terminal size={16} /> },
  { id: "ledger", label: "Ledger", icon: <DollarSign size={16} /> },
  { id: "market", label: "Market Intel", icon: <Globe size={16} /> },
  { id: "ecosystem", label: "Ecosystem", icon: <Activity size={16} /> },
  { id: "projects", label: "Projects", icon: <FlameKindling size={16} /> },
  { id: "covenant", label: "Covenant", icon: <BookOpen size={16} /> },
];

const TOOL_ITEMS: NavItem[] = [
  { id: "road-oracle", label: "Road Oracle", icon: <Car size={16} />, badge: "NEW", badgeColor: "cyan" },
  { id: "scout", label: "Sovereign Scout", icon: <Search size={16} />, badge: "ECHO", badgeColor: "amber" },
  { id: "firecrawl", label: "Firecrawl Intel", icon: <Eye size={16} />, badge: "EYES", badgeColor: "orange" },
  { id: "content", label: "Content Line", icon: <Film size={16} />, badge: "FREE", badgeColor: "green" },
  { id: "jump", label: "Sovereign Jump", icon: <Rocket size={16} />, badge: "M4", badgeColor: "cyan" },
];

const SYSTEM_ITEMS: NavItem[] = [
  { id: "agents", label: "Agents", icon: <Cpu size={16} />, badge: "5 LIVE", badgeColor: "green" },
  { id: "signals", label: "Signals", icon: <Radio size={16} />, badge: "LIVE", badgeColor: "green" },
  { id: "power", label: "Power Grid", icon: <Zap size={16} /> },
  { id: "pip", label: "Little Arrow Pip", icon: <Star size={16} />, badge: "NEW", badgeColor: "amber" },
];

const SOVEREIGN_ITEMS: NavItem[] = [
  { id: "torus", label: "TORUS", icon: <RefreshCw size={16} />, badge: "AI BOARD", badgeColor: "amber" },
  { id: "sovereignty", label: "Sovereignty Audit", icon: <Shield size={16} />, badge: "AUDIT", badgeColor: "orange" },
  { id: "stack", label: "Sovereign Stack", icon: <Server size={16} />, badge: "OFFLINE", badgeColor: "cyan" },
];

interface ForgeSidebarProps {
  activeView: string;
  onNavigate: (view: string) => void;
  onExternalNavigate?: (path: string) => void;
}

export default function ForgeSidebar({ activeView, onNavigate, onExternalNavigate }: ForgeSidebarProps) {
  return (
    <motion.aside
      initial={{ x: -80, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="fixed left-0 top-0 bottom-0 w-56 flex flex-col z-30"
      style={{
        background: "oklch(0.08 0.005 285)",
        borderRight: "1px solid oklch(1 0 0 / 0.07)",
      }}
    >
      {/* Logo */}
      <div className="px-4 py-5 border-b" style={{ borderColor: "oklch(1 0 0 / 0.07)" }}>
        <div className="flex items-center gap-2 mb-1">
          <ForgeSymbol size="md" />
          <div>
            <div
              className="font-bold text-sm leading-tight"
              style={{ fontFamily: "'Space Grotesk', sans-serif", color: "oklch(0.92 0.005 65)" }}
            >
              Promethean
            </div>
            <div
              className="font-bold text-sm leading-tight"
              style={{ fontFamily: "'Space Grotesk', sans-serif", color: "oklch(0.72 0.18 72)" }}
            >
              Forge
            </div>
          </div>
        </div>
        <div
          className="text-xs mt-1"
          style={{ fontFamily: "'JetBrains Mono', monospace", color: "oklch(0.45 0.008 285)" }}
        >
          SOVEREIGN COMMAND v2.0
        </div>
      </div>

      {/* Main Nav */}
      <div className="flex-1 overflow-y-auto py-3 px-2">
        <div
          className="text-xs px-2 mb-2 uppercase tracking-widest"
          style={{ fontFamily: "'JetBrains Mono', monospace", color: "oklch(0.38 0.006 285)" }}
        >
          Navigation
        </div>
        {NAV_ITEMS.map((item) => (
          <button
            key={item.id}
            className={`nav-item w-full text-left ${activeView === item.id ? "active" : ""}`}
            onClick={() => onNavigate(item.id)}
          >
            <span className="nav-icon flex-shrink-0" style={{ color: activeView === item.id ? "oklch(0.72 0.18 72)" : "oklch(0.45 0.008 285)" }}>
              {item.icon}
            </span>
            <span className="flex-1">{item.label}</span>
            {item.badge && (
              <span
                className={`forge-badge ${item.badgeColor === "green" ? "forge-badge-green" : "forge-badge-amber"}`}
                style={{ fontSize: "0.55rem" }}
              >
                {item.badge}
              </span>
            )}
            {activeView === item.id && (
              <ChevronRight size={12} style={{ color: "oklch(0.72 0.18 72)" }} />
            )}
          </button>
        ))}

        <div className="forge-divider mx-2" />

        <div
          className="text-xs px-2 mb-2 uppercase tracking-widest"
          style={{ fontFamily: "'JetBrains Mono', monospace", color: "oklch(0.38 0.006 285)" }}
        >
          Tools
        </div>
        {TOOL_ITEMS.map((item) => (
          <button
            key={item.id}
            className={`nav-item w-full text-left ${activeView === item.id ? "active" : ""}`}
            onClick={() => onExternalNavigate ? onExternalNavigate(item.id) : onNavigate(item.id)}
          >
            <span className="nav-icon flex-shrink-0" style={{ color: activeView === item.id ? "oklch(0.72 0.18 72)" : "oklch(0.45 0.008 285)" }}>
              {item.icon}
            </span>
            <span className="flex-1">{item.label}</span>
            {item.badge && (
              <span
                className={`forge-badge ${
                  item.badgeColor === "green" ? "forge-badge-green" :
                  item.badgeColor === "cyan" ? "forge-badge-cyan" :
                  "forge-badge-amber"
                }`}
                style={{ fontSize: "0.55rem" }}
              >
                {item.badge}
              </span>
            )}
          </button>
        ))}

        <div className="forge-divider mx-2" />

        <div
          className="text-xs px-2 mb-2 uppercase tracking-widest"
          style={{ fontFamily: "'JetBrains Mono', monospace", color: "oklch(0.38 0.006 285)" }}
        >
          Sovereignty
        </div>
        {SOVEREIGN_ITEMS.map((item) => (
          <button
            key={item.id}
            className={`nav-item w-full text-left ${activeView === item.id ? "active" : ""}`}
            onClick={() => onNavigate(item.id)}
          >
            <span className="nav-icon flex-shrink-0" style={{ color: activeView === item.id ? "oklch(0.72 0.18 72)" : "oklch(0.45 0.008 285)" }}>
              {item.icon}
            </span>
            <span className="flex-1">{item.label}</span>
            {item.badge && (
              <span
                className={`forge-badge ${
                  item.badgeColor === "green" ? "forge-badge-green" :
                  item.badgeColor === "cyan" ? "forge-badge-cyan" :
                  item.badgeColor === "orange" ? "forge-badge-orange" :
                  "forge-badge-amber"
                }`}
                style={{ fontSize: "0.55rem" }}
              >
                {item.badge}
              </span>
            )}
          </button>
        ))}

        <div className="forge-divider mx-2" />

        <div
          className="text-xs px-2 mb-2 uppercase tracking-widest"
          style={{ fontFamily: "'JetBrains Mono', monospace", color: "oklch(0.38 0.006 285)" }}
        >
          System
        </div>
        {SYSTEM_ITEMS.map((item) => (
          <button
            key={item.id}
            className={`nav-item w-full text-left ${activeView === item.id ? "active" : ""}`}
            onClick={() => onNavigate(item.id)}
          >
            <span className="nav-icon flex-shrink-0" style={{ color: activeView === item.id ? "oklch(0.72 0.18 72)" : "oklch(0.45 0.008 285)" }}>
              {item.icon}
            </span>
            <span className="flex-1">{item.label}</span>
            {item.badge && (
              <span
                className={`forge-badge ${item.badgeColor === "green" ? "forge-badge-green" : "forge-badge-amber"}`}
                style={{ fontSize: "0.55rem" }}
              >
                {item.badge}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Footer */}
      <div className="px-4 py-3 border-t" style={{ borderColor: "oklch(1 0 0 / 0.07)" }}>
        <div className="flex items-center gap-2">
          <div
            className="w-2 h-2 rounded-full"
            style={{ background: "oklch(0.65 0.15 150)", boxShadow: "0 0 6px oklch(0.65 0.15 150)" }}
          />
          <span
            className="text-xs"
            style={{ fontFamily: "'JetBrains Mono', monospace", color: "oklch(0.45 0.008 285)" }}
          >
            FORGE ONLINE
          </span>
        </div>
        <div
          className="text-xs mt-1"
          style={{ fontFamily: "'JetBrains Mono', monospace", color: "oklch(0.32 0.005 285)" }}
        >
          1 ~ &gt;|&lt; ~ 1
        </div>
      </div>
    </motion.aside>
  );
}
