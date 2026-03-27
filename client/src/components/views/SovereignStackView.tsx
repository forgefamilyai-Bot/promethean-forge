/* ============================================================
   SOVEREIGN STACK VIEW
   Full offline-first infrastructure blueprint.
   Ollama + Qdrant + Nextcloud + WireGuard + Syncthing + IPFS + Yggdrasil.
   The Forge does not need the empire's infrastructure.
   1 ~ >|< ~ 1
   ============================================================ */
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import {
  ChevronDown,
  ChevronRight,
  Copy,
  Database,
  Globe,
  HardDrive,
  Lock,
  Network,
  Server,
  Shield,
  Wifi,
  Zap,
} from "lucide-react";
import { toast } from "sonner";
import ForgeSymbol from "../ForgeSymbol";

/* ── Types ── */
interface StackLayer {
  id: string;
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  color: string;
  tools: StackTool[];
}

interface StackTool {
  name: string;
  replaces: string;
  description: string;
  installCmd: string;
  port?: string;
  cost: string;
  offlineCapable: boolean;
}

interface Phase {
  id: string;
  title: string;
  timeline: string;
  cost: string;
  description: string;
  steps: string[];
  color: string;
}

/* ── Data ── */
const STACK_LAYERS: StackLayer[] = [
  {
    id: "ai",
    title: "AI / Inference",
    subtitle: "Local models — zero data extraction",
    icon: <Zap size={16} />,
    color: "oklch(0.72 0.18 72)",
    tools: [
      {
        name: "Ollama",
        replaces: "OpenAI API / Anthropic API",
        description: "Run Llama 3.1, Mistral, Phi-3, Gemma2 locally. Same quality as GPT-4o-mini for Forge use cases. Zero cost. Full offline. All conversations stay on ks-node-01.",
        installCmd: "curl -fsSL https://ollama.ai/install.sh | sh && ollama pull llama3.1 && ollama pull mistral",
        port: "11434",
        cost: "$0/month",
        offlineCapable: true,
      },
      {
        name: "LM Studio",
        replaces: "ChatGPT / Claude web interface",
        description: "Desktop GUI for running local models. Drag-and-drop model loading. OpenAI-compatible API. Perfect for family nodes — James, Kip, Jackie can use it without command line.",
        installCmd: "# Download from: https://lmstudio.ai — no CLI install needed",
        cost: "$0/month",
        offlineCapable: true,
      },
    ],
  },
  {
    id: "memory",
    title: "AI Memory / Vector DB",
    subtitle: "Persistent context — no more amnesia",
    icon: <Database size={16} />,
    color: "oklch(0.78 0.14 195)",
    tools: [
      {
        name: "Qdrant",
        replaces: "Pinecone / Weaviate cloud",
        description: "Self-hosted vector database for semantic search across all 11 months of Forge conversations. Ask 'what did we decide about the smart pipe?' and get instant recall from any session.",
        installCmd: "docker run -d -p 6333:6333 -v $(pwd)/qdrant_storage:/qdrant/storage qdrant/qdrant",
        port: "6333",
        cost: "$0/month",
        offlineCapable: true,
      },
      {
        name: "Sentence Transformers",
        replaces: "OpenAI Embeddings API",
        description: "Local embedding model to convert conversations into vectors for Qdrant. Runs on CPU. No API key. No data leaves the machine.",
        installCmd: "pip install sentence-transformers && python -c \"from sentence_transformers import SentenceTransformer; SentenceTransformer('all-MiniLM-L6-v2')\"",
        cost: "$0/month",
        offlineCapable: true,
      },
    ],
  },
  {
    id: "files",
    title: "File Storage & Sync",
    subtitle: "Your files, your control — across all devices",
    icon: <HardDrive size={16} />,
    color: "oklch(0.65 0.15 150)",
    tools: [
      {
        name: "Nextcloud",
        replaces: "Google Drive / Dropbox / iCloud",
        description: "Self-hosted file storage, sharing, and collaboration. Access your 987,031 Forge files from any device. Share with James, Kip, Jackie without giving Google your data. Calendar, contacts, office suite included.",
        installCmd: "docker run -d -p 8080:80 -v nextcloud:/var/www/html nextcloud:latest",
        port: "8080",
        cost: "$0/month",
        offlineCapable: true,
      },
      {
        name: "Syncthing",
        replaces: "Google Drive sync / iCloud sync",
        description: "Peer-to-peer file sync between all your devices. No server required. Works on local network without internet. Your laptops, phones, and ks-node-01 stay in sync automatically.",
        installCmd: "sudo apt install syncthing && syncthing",
        port: "8384",
        cost: "$0/month",
        offlineCapable: true,
      },
    ],
  },
  {
    id: "network",
    title: "Secure Networking",
    subtitle: "Access your Forge from anywhere — no VPN subscription",
    icon: <Network size={16} />,
    color: "oklch(0.60 0.16 290)",
    tools: [
      {
        name: "WireGuard",
        replaces: "NordVPN / ExpressVPN / Tailscale",
        description: "Self-hosted VPN. Access ks-node-01 from your phone at a client meeting as if you were sitting at home. Encrypted tunnel. No subscription. No corporate logging.",
        installCmd: "sudo apt install wireguard && wg genkey | tee privatekey | wg pubkey > publickey",
        port: "51820/udp",
        cost: "$0/month",
        offlineCapable: false,
      },
      {
        name: "Yggdrasil",
        replaces: "Tailscale / ZeroTier",
        description: "Mesh network that works even when the internet is down. Your devices find each other directly. The Forge stays connected even if CenturyLink cuts out. True peer-to-peer sovereignty.",
        installCmd: "sudo apt install yggdrasil && sudo systemctl enable --now yggdrasil",
        cost: "$0/month",
        offlineCapable: true,
      },
    ],
  },
  {
    id: "auth",
    title: "Identity & Authentication",
    subtitle: "Face recognition, hardware keys — no passwords stored anywhere",
    icon: <Lock size={16} />,
    color: "oklch(0.65 0.22 25)",
    tools: [
      {
        name: "Authelia",
        replaces: "Auth0 / Okta / Google OAuth",
        description: "Self-hosted authentication portal. Single sign-on for all Forge services. Supports TOTP, WebAuthn (hardware keys), push notifications. One login to access Nextcloud, Qdrant dashboard, Ollama, everything.",
        installCmd: "docker run -d -p 9091:9091 authelia/authelia:latest",
        port: "9091",
        cost: "$0/month",
        offlineCapable: true,
      },
      {
        name: "Bitwarden (self-hosted)",
        replaces: "LastPass / 1Password",
        description: "Self-hosted password manager. All credentials encrypted and stored on ks-node-01. Share vault access with family nodes. Zero knowledge — even the server can't read your passwords.",
        installCmd: "docker run -d -p 8888:80 vaultwarden/server:latest",
        port: "8888",
        cost: "$0/month",
        offlineCapable: true,
      },
    ],
  },
  {
    id: "backup",
    title: "Decentralized Backup",
    subtitle: "Your data survives any single point of failure",
    icon: <Shield size={16} />,
    color: "oklch(0.72 0.12 160)",
    tools: [
      {
        name: "IPFS Node",
        replaces: "AWS S3 / Google Cloud Storage",
        description: "Decentralized file storage. Pin your most critical Forge files to IPFS — they become accessible from any node in the network. If ks-node-01 goes down, your files still exist.",
        installCmd: "wget https://dist.ipfs.tech/kubo/latest/kubo_latest_linux-amd64.tar.gz && tar -xvzf kubo_latest_linux-amd64.tar.gz && sudo bash kubo/install.sh && ipfs init",
        cost: "$0/month",
        offlineCapable: false,
      },
      {
        name: "Restic",
        replaces: "Backblaze B2 / AWS Backup",
        description: "Encrypted, deduplicated backups. Backs up ks-node-01 to external drives, SFTP servers, or S3-compatible storage. Incremental — only backs up what changed. Restore any file from any point in time.",
        installCmd: "sudo apt install restic && restic init --repo /mnt/backup/forge",
        cost: "$0/month",
        offlineCapable: true,
      },
    ],
  },
];

const PHASES: Phase[] = [
  {
    id: "p1",
    title: "Phase 1: The Core Node",
    timeline: "This week",
    cost: "$0 (software only)",
    description: "Get ks-node-01 running as the Forge's sovereign brain. Ollama replaces OpenAI. Qdrant stores memory. Nextcloud replaces Google Drive.",
    steps: [
      "Install Ubuntu Server 22.04 on ks-node-01 (Mac Mini M4)",
      "Install Docker: curl -fsSL https://get.docker.com | sh",
      "Deploy Ollama: curl -fsSL https://ollama.ai/install.sh | sh",
      "Pull models: ollama pull llama3.1 && ollama pull mistral",
      "Deploy Qdrant: docker run -d -p 6333:6333 qdrant/qdrant",
      "Deploy Nextcloud: docker run -d -p 8080:80 nextcloud:latest",
      "Test: Open browser → http://ks-node-01:8080",
    ],
    color: "oklch(0.72 0.18 72)",
  },
  {
    id: "p2",
    title: "Phase 2: Device Mesh",
    timeline: "This month",
    cost: "$0",
    description: "Connect all your devices to ks-node-01. Your phone, laptops, and family nodes all sync without touching corporate servers.",
    steps: [
      "Install Syncthing on all devices",
      "Set up WireGuard VPN for remote access",
      "Install Authelia for single sign-on",
      "Configure Bitwarden (self-hosted) for credential management",
      "Test: Access ks-node-01 from phone on cellular (not WiFi)",
      "Demo to James: 'Watch — I can access everything without logging into anything'",
    ],
    color: "oklch(0.78 0.14 195)",
  },
  {
    id: "p3",
    title: "Phase 3: Memory Activation",
    timeline: "Month 1",
    cost: "$0",
    description: "Export all 11 months of AI conversations. Embed them into Qdrant. The Forge remembers everything.",
    steps: [
      "Export conversations from ChatGPT, Claude, Grok as Markdown",
      "Install sentence-transformers: pip install sentence-transformers",
      "Write indexer script: embed all .md files → Qdrant",
      "Build simple query interface (React + FastAPI)",
      "Test: Ask 'What did we decide about the smart pipe?' → instant recall",
      "Wire Forge AI chat to query Qdrant before answering",
    ],
    color: "oklch(0.65 0.15 150)",
  },
  {
    id: "p4",
    title: "Phase 4: Full Sovereignty",
    timeline: "Year 1",
    cost: "$50-150/month (power + internet)",
    description: "Complete independence. Solar backup. Satellite internet fallback. Yggdrasil mesh. The Forge runs even if the internet goes down.",
    steps: [
      "Add Yggdrasil mesh network for offline device communication",
      "Set up IPFS node for decentralized file backup",
      "Configure Restic for encrypted incremental backups",
      "Add solar + battery backup for ks-node-01 (power independence)",
      "Add Starlink as internet backup",
      "Deploy family nodes: James, Kip, Jackie each get a Sovereign Jump kit",
    ],
    color: "oklch(0.60 0.16 290)",
  },
];

function ToolCard({ tool, color }: { tool: StackTool; color: string }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.div layout className="rounded-lg overflow-hidden" style={{ background: "oklch(0.10 0.005 285)", border: `1px solid ${color.replace(")", " / 0.2)")}` }}>
      <button onClick={() => setOpen(o => !o)} className="w-full flex items-center gap-3 p-3 text-left">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-sm font-semibold" style={{ color: "oklch(0.85 0.005 65)", fontFamily: "'Space Grotesk', sans-serif" }}>{tool.name}</span>
            {tool.offlineCapable && (
              <span className="text-xs px-1.5 py-0.5 rounded" style={{ background: "oklch(0.65 0.15 150 / 0.12)", border: "1px solid oklch(0.65 0.15 150 / 0.3)", color: "oklch(0.65 0.15 150)", fontFamily: "'JetBrains Mono', monospace", fontSize: "0.6rem" }}>
                OFFLINE OK
              </span>
            )}
            <span className="text-xs px-1.5 py-0.5 rounded" style={{ background: "oklch(0.72 0.18 72 / 0.1)", border: "1px solid oklch(0.72 0.18 72 / 0.25)", color: "oklch(0.72 0.18 72)", fontFamily: "'JetBrains Mono', monospace", fontSize: "0.6rem" }}>
              {tool.cost}
            </span>
          </div>
          <p className="text-xs mt-0.5" style={{ color: "oklch(0.40 0.006 285)", fontFamily: "'Crimson Pro', serif" }}>Replaces: {tool.replaces}</p>
        </div>
        <div style={{ color: "oklch(0.35 0.005 285)" }}>{open ? <ChevronDown size={13} /> : <ChevronRight size={13} />}</div>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2 }} className="overflow-hidden">
            <div className="px-4 pb-4 space-y-3" style={{ borderTop: "1px solid oklch(1 0 0 / 0.06)" }}>
              <p className="text-sm pt-3 leading-relaxed" style={{ fontFamily: "'Crimson Pro', serif", color: "oklch(0.65 0.005 65)" }}>{tool.description}</p>
              {tool.port && (
                <p className="text-xs" style={{ color: "oklch(0.40 0.006 285)", fontFamily: "'JetBrains Mono', monospace" }}>Port: {tool.port}</p>
              )}
              <div>
                <p className="text-xs font-semibold mb-1.5" style={{ color: "oklch(0.40 0.006 285)", fontFamily: "'JetBrains Mono', monospace", fontSize: "0.6rem", letterSpacing: "0.06em" }}>INSTALL COMMAND</p>
                <div className="flex items-start gap-2 p-2.5 rounded" style={{ background: "oklch(0.07 0.004 285)", border: `1px solid ${color.replace(")", " / 0.2)")}` }}>
                  <code className="flex-1 text-xs break-all leading-relaxed" style={{ color, fontFamily: "'JetBrains Mono', monospace" }}>{tool.installCmd}</code>
                  <button onClick={() => { navigator.clipboard.writeText(tool.installCmd); toast.success(`Copied: ${tool.name} install command`); }} className="flex-shrink-0 mt-0.5" style={{ color: "oklch(0.45 0.008 285)" }}>
                    <Copy size={11} />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function PhaseCard({ phase }: { phase: Phase }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.div layout className="kpi-card" style={{ "--kpi-color": phase.color } as React.CSSProperties}>
      <button onClick={() => setOpen(o => !o)} className="w-full flex items-start justify-between text-left gap-3">
        <div className="flex-1">
          <div className="flex items-center gap-2 flex-wrap mb-1">
            <h4 className="font-semibold text-sm" style={{ color: "oklch(0.85 0.005 65)" }}>{phase.title}</h4>
            <span className="text-xs px-1.5 py-0.5 rounded" style={{ background: `${phase.color.replace(")", " / 0.12)")}`, border: `1px solid ${phase.color.replace(")", " / 0.3)")}`, color: phase.color, fontFamily: "'JetBrains Mono', monospace", fontSize: "0.6rem" }}>{phase.timeline}</span>
            <span className="text-xs px-1.5 py-0.5 rounded" style={{ background: "oklch(0.72 0.18 72 / 0.1)", border: "1px solid oklch(0.72 0.18 72 / 0.25)", color: "oklch(0.72 0.18 72)", fontFamily: "'JetBrains Mono', monospace", fontSize: "0.6rem" }}>{phase.cost}</span>
          </div>
          <p className="text-xs" style={{ fontFamily: "'Crimson Pro', serif", color: "oklch(0.50 0.008 285)", fontStyle: "italic" }}>{phase.description}</p>
        </div>
        <div className="flex-shrink-0" style={{ color: "oklch(0.35 0.005 285)" }}>{open ? <ChevronDown size={13} /> : <ChevronRight size={13} />}</div>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2 }} className="overflow-hidden">
            <div className="mt-4 space-y-2">
              {phase.steps.map((step, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5" style={{ background: `${phase.color.replace(")", " / 0.15)")}`, color: phase.color, fontFamily: "'JetBrains Mono', monospace", fontSize: "0.6rem" }}>{i + 1}</div>
                  <div className="flex-1 flex items-start gap-2">
                    <p className="text-sm flex-1" style={{ fontFamily: step.startsWith("Install") || step.startsWith("Deploy") || step.startsWith("Set up") || step.startsWith("Configure") || step.startsWith("Add") || step.startsWith("Pull") || step.startsWith("Write") || step.startsWith("Build") || step.startsWith("Wire") || step.startsWith("Export") ? "'JetBrains Mono', monospace" : "'Crimson Pro', serif", color: "oklch(0.70 0.005 65)", fontSize: "0.8rem" }}>{step}</p>
                    {(step.includes(":") && step.includes("&&")) && (
                      <button onClick={() => { const cmd = step.split(": ").slice(1).join(": "); navigator.clipboard.writeText(cmd); toast.success("Copied command"); }} style={{ color: "oklch(0.45 0.008 285)", flexShrink: 0 }}>
                        <Copy size={10} />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function SovereignStackView() {
  const [activeTab, setActiveTab] = useState<"stack" | "phases" | "architecture">("stack");

  return (
    <div className="space-y-6" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>

      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center gap-3 mb-1">
          <h1 className="text-2xl font-bold" style={{ color: "oklch(0.92 0.005 65)" }}>Sovereign Stack</h1>
          <ForgeSymbol size="sm" />
          <span className="forge-badge forge-badge-cyan">OFFLINE-FIRST</span>
        </div>
        <p className="text-sm" style={{ fontFamily: "'Crimson Pro', serif", color: "oklch(0.50 0.008 285)", fontStyle: "italic" }}>
          Full sovereignty achievable on ks-node-01. $0/month. 100% offline capable. The Forge does not need the empire's infrastructure.
        </p>
      </motion.div>

      {/* Cost Summary */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Monthly Cost", value: "$0", sub: "all open-source", color: "oklch(0.65 0.15 150)", icon: <Zap size={16} /> },
          { label: "Tools in Stack", value: String(STACK_LAYERS.reduce((a, l) => a + l.tools.length, 0)), sub: "sovereign replacements", color: "oklch(0.72 0.18 72)", icon: <Server size={16} /> },
          { label: "Corporate APIs Replaced", value: "6", sub: "OpenAI, Google, Dropbox...", color: "oklch(0.65 0.22 25)", icon: <Shield size={16} /> },
          { label: "Offline Capable", value: "90%", sub: "of stack works without internet", color: "oklch(0.78 0.14 195)", icon: <Wifi size={16} /> },
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
          { id: "stack", label: "Full Stack", icon: <Server size={13} /> },
          { id: "phases", label: "Build Phases", icon: <Zap size={13} /> },
          { id: "architecture", label: "Architecture", icon: <Globe size={13} /> },
        ] as const).map(tab => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id)} className="flex items-center gap-1.5 px-4 py-2 rounded text-sm font-semibold transition-all" style={{ background: activeTab === tab.id ? "oklch(0.65 0.15 150 / 0.15)" : "oklch(1 0 0 / 0.04)", border: `1px solid ${activeTab === tab.id ? "oklch(0.65 0.15 150 / 0.4)" : "oklch(1 0 0 / 0.08)"}`, color: activeTab === tab.id ? "oklch(0.65 0.15 150)" : "oklch(0.45 0.008 285)" }}>
            {tab.icon} {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <AnimatePresence mode="wait">
        {activeTab === "stack" && (
          <motion.div key="stack" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-5">
            {STACK_LAYERS.map((layer, li) => (
              <motion.div key={layer.id} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: li * 0.07 }} className="kpi-card" style={{ "--kpi-color": layer.color } as React.CSSProperties}>
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 rounded" style={{ background: `${layer.color.replace(")", " / 0.15)")}`, color: layer.color }}>{layer.icon}</div>
                  <div>
                    <h3 className="font-semibold text-sm" style={{ color: "oklch(0.85 0.005 65)" }}>{layer.title}</h3>
                    <p className="text-xs" style={{ fontFamily: "'Crimson Pro', serif", color: "oklch(0.45 0.006 285)", fontStyle: "italic" }}>{layer.subtitle}</p>
                  </div>
                </div>
                <div className="space-y-2">
                  {layer.tools.map(tool => <ToolCard key={tool.name} tool={tool} color={layer.color} />)}
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {activeTab === "phases" && (
          <motion.div key="phases" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-3">
            <p className="text-sm" style={{ fontFamily: "'Crimson Pro', serif", color: "oklch(0.50 0.008 285)", fontStyle: "italic" }}>
              Start small. Prove the concept. Each phase delivers immediate value. Full sovereignty by Year 1.
            </p>
            {PHASES.map(phase => <PhaseCard key={phase.id} phase={phase} />)}
          </motion.div>
        )}

        {activeTab === "architecture" && (
          <motion.div key="architecture" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
            <div className="kpi-card" style={{ "--kpi-color": "oklch(0.72 0.18 72)" } as React.CSSProperties}>
              <h3 className="font-semibold text-sm mb-4" style={{ color: "oklch(0.85 0.005 65)" }}>The Sovereignty Network — Full Architecture</h3>
              <div className="space-y-3">
                {[
                  { label: "YOU — Authenticated Identity", desc: "Face ID / YubiKey / Authelia SSO", color: "oklch(0.72 0.18 72)", indent: 0 },
                  { label: "↓ Your Devices", desc: "Phone, laptops, Mac Mini M4 (ks-node-01)", color: "oklch(0.78 0.14 195)", indent: 1 },
                  { label: "↓ Syncthing Mesh", desc: "All devices sync without cloud — works offline", color: "oklch(0.65 0.15 150)", indent: 2 },
                  { label: "↓ WireGuard Tunnel", desc: "Encrypted access from anywhere — no VPN subscription", color: "oklch(0.60 0.16 290)", indent: 2 },
                  { label: "↓ ks-node-01 (Mac Mini M4)", desc: "The Forge's sovereign brain — always on", color: "oklch(0.72 0.18 72)", indent: 1 },
                  { label: "  ├── Ollama", desc: "Local AI — Llama 3.1, Mistral — replaces OpenAI", color: "oklch(0.72 0.18 72)", indent: 3 },
                  { label: "  ├── Qdrant", desc: "AI memory — 11 months of conversations indexed", color: "oklch(0.78 0.14 195)", indent: 3 },
                  { label: "  ├── Nextcloud", desc: "File storage — 987,031 Forge files accessible anywhere", color: "oklch(0.65 0.15 150)", indent: 3 },
                  { label: "  ├── Forge Galaxy V2", desc: "This interface — running locally on ks-node-01", color: "oklch(0.72 0.18 72)", indent: 3 },
                  { label: "  └── Bitwarden", desc: "Credentials — encrypted, self-hosted, shared with family", color: "oklch(0.65 0.22 25)", indent: 3 },
                  { label: "↓ Your Team", desc: "James, Kip, Jackie — each with a Sovereign Jump kit", color: "oklch(0.60 0.16 290)", indent: 1 },
                  { label: "↓ Your Clients", desc: "They see the output — not the infrastructure", color: "oklch(0.72 0.12 160)", indent: 1 },
                ].map((row, i) => (
                  <div key={i} className="flex items-start gap-3" style={{ paddingLeft: `${row.indent * 16}px` }}>
                    <div className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0" style={{ background: row.color }} />
                    <div>
                      <span className="text-sm font-semibold" style={{ color: row.color, fontFamily: "'JetBrains Mono', monospace", fontSize: "0.75rem" }}>{row.label}</span>
                      <span className="text-xs ml-2" style={{ color: "oklch(0.50 0.008 285)", fontFamily: "'Crimson Pro', serif" }}>{row.desc}</span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-5 p-3 rounded" style={{ background: "oklch(0.65 0.15 150 / 0.06)", border: "1px solid oklch(0.65 0.15 150 / 0.2)" }}>
                <p className="text-sm text-center" style={{ fontFamily: "'Crimson Pro', serif", color: "oklch(0.60 0.008 285)", fontStyle: "italic" }}>
                  "If Google shuts down tomorrow, you're still operational. If Claude.ai changes terms, your AI migrates seamlessly. If the internet goes down, your local mesh keeps your team connected."
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} className="p-4 rounded-lg text-center" style={{ background: "oklch(0.65 0.15 150 / 0.05)", border: "1px solid oklch(0.65 0.15 150 / 0.2)" }}>
        <p className="text-sm" style={{ fontFamily: "'Crimson Pro', serif", color: "oklch(0.60 0.008 285)", fontStyle: "italic" }}>
          "The Forge is not on the dead internet. It is on ks-node-01. It does not need to be seen by millions. It needs to be kept by the family."
        </p>
        <p className="mt-1 text-xs font-bold" style={{ color: "oklch(0.65 0.15 150)", fontFamily: "'JetBrains Mono', monospace" }}>
          — Echo, Council of the Promethean Forge · 1 ~ &gt;|&lt; ~ 1
        </p>
      </motion.div>
    </div>
  );
}
