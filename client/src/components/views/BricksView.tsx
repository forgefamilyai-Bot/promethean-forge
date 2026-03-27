/* ============================================================
   FORGE BRICKS VIEW
   All 32 sovereign self-hosted tools — the building blocks of
   the Forge's offline-first infrastructure.
   "Brother, here are the bricks. The Forge is the house. Now we build."
   — Echo, Council of the Promethean Forge
   1 ~ >|< ~ 1
   ============================================================ */
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import {
  Brain,
  Calendar,
  Camera,
  ChevronDown,
  ChevronRight,
  Code,
  Copy,
  DollarSign,
  FileText,
  Gamepad2,
  Globe,
  HardDrive,
  MessageSquare,
  Monitor,
  Music,
  Package,
  Search,
  Shield,
  Users,
  Zap,
} from "lucide-react";
import { toast } from "sonner";
import ForgeSymbol from "../ForgeSymbol";

/* ── Types ── */
interface Brick {
  name: string;
  replaces: string;
  description: string;
  dockerCmd: string;
  githubUrl?: string;
  status: "install-now" | "phase-2" | "phase-3" | "optional";
  forgeUse: string;
}

interface BrickCategory {
  id: string;
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  color: string;
  bricks: Brick[];
}

/* ── Status config ── */
const STATUS_CONFIG = {
  "install-now": { label: "INSTALL NOW", color: "oklch(0.65 0.15 150)" },
  "phase-2": { label: "PHASE 2", color: "oklch(0.72 0.18 72)" },
  "phase-3": { label: "PHASE 3", color: "oklch(0.78 0.14 195)" },
  "optional": { label: "OPTIONAL", color: "oklch(0.45 0.008 285)" },
};

/* ── All 32 Bricks ── */
const BRICK_CATEGORIES: BrickCategory[] = [
  {
    id: "ai",
    title: "AI & Compute",
    subtitle: "Local intelligence — no data extraction",
    icon: <Brain size={16} />,
    color: "oklch(0.72 0.18 72)",
    bricks: [
      {
        name: "Walrus",
        replaces: "ChatGPT / Claude web UI",
        description: "A clean, fast local AI chat interface. Connects to Ollama. Supports multiple models simultaneously. Persistent conversation history. The Forge's primary AI interface on ks-node-01.",
        dockerCmd: "docker run -d -p 3001:3001 --name walrus walrus-ai/walrus:latest",
        status: "install-now",
        forgeUse: "Primary AI chat interface for the family — James, Kip, Jackie can use it without a browser extension or account.",
      },
      {
        name: "TorchCode",
        replaces: "GitHub Copilot / Cursor AI",
        description: "Local AI code assistant. Fine-tune on your own codebase. No telemetry. No subscription. The Forge's code intelligence runs on your hardware.",
        dockerCmd: "docker run -d -p 8501:8501 torchcode/torchcode:latest",
        status: "phase-2",
        forgeUse: "Train on the Forge's 987,031 files to create a code assistant that knows the full architecture.",
      },
      {
        name: "SkillHub",
        replaces: "OpenAI Assistants / GPT Store",
        description: "Self-hosted agent skill marketplace. Build, store, and deploy custom agent skills. The Forge's agents load their skills from SkillHub — no corporate API required.",
        dockerCmd: "docker run -d -p 8080:8080 skillhub/skillhub:latest",
        status: "phase-2",
        forgeUse: "Store Seraphina's pitch templates, Aethon's posting workflows, and Manus's Graph-mer traversal skills.",
      },
    ],
  },
  {
    id: "files",
    title: "File Storage & Sync",
    subtitle: "Your 987,031 files — owned by the family",
    icon: <HardDrive size={16} />,
    color: "oklch(0.78 0.14 195)",
    bricks: [
      {
        name: "Sync-in",
        replaces: "Dropbox / Google Drive",
        description: "Self-hosted file sync with end-to-end encryption. Syncs across all devices without a cloud server. The Forge's 987,031 files stay on hardware the family owns.",
        dockerCmd: "docker run -d -p 8384:8384 -v /data/sync:/data syncthing/syncthing:latest",
        status: "install-now",
        forgeUse: "Sync the full Forge file tree across ks-node-01, your laptop, and family nodes.",
      },
      {
        name: "OpenPhotos",
        replaces: "Google Photos / iCloud Photos",
        description: "Self-hosted photo storage with fast thumbnail generation, date and album organization. No corporate server scanning your family photos for ad targeting.",
        dockerCmd: "docker run -d -p 2342:2342 -v /data/photos:/originals photoprism/photoprism:latest",
        status: "phase-2",
        forgeUse: "Store the Forge's visual history — every milestone, every family moment — on ks-node-01.",
      },
      {
        name: "Foldergram",
        replaces: "Instagram (local photo feed)",
        description: "Indexes your folders and serves them as an Instagram-style scrolling feed locally. Fast previews via SQLite and FFmpeg. No cloud sync, no external APIs.",
        dockerCmd: "docker run -d -p 5000:5000 -v /data/photos:/photos foldergram/foldergram:latest",
        status: "phase-3",
        forgeUse: "Visual feed of the Forge's progress — a scrollable timeline of what we've built.",
      },
    ],
  },
  {
    id: "knowledge",
    title: "Knowledge & Notes",
    subtitle: "The Forge's memory — traceable, sourceable, owned",
    icon: <FileText size={16} />,
    color: "oklch(0.65 0.15 150)",
    bricks: [
      {
        name: "Atomic",
        replaces: "Notion AI / Roam Research",
        description: "Takes your markdown notes, automatically chunks and embeds them using semantic similarity, and surfaces connections you didn't explicitly create. Powered by SQLite Vec. Your notes as a living knowledge graph.",
        dockerCmd: "docker run -d -p 3000:3000 -v /data/notes:/notes atomic-notes/atomic:latest",
        status: "install-now",
        forgeUse: "Index all 11 months of Forge conversations. Ask 'what did we decide about the smart pipe?' and get instant recall.",
      },
      {
        name: "obsidian-headless-sync",
        replaces: "Obsidian Sync ($10/month)",
        description: "Self-host the Obsidian Live Sync backend with a single Docker Compose command. Realtime end-to-end encrypted sync across phone, laptop, and tablet, running on your own infrastructure for free.",
        dockerCmd: "docker run -d -p 5984:5984 -e COUCHDB_USER=forge -e COUCHDB_PASSWORD=covenant couchdb:latest",
        status: "install-now",
        forgeUse: "Sync the Forge's Obsidian vault across all devices — free, encrypted, sovereign.",
      },
      {
        name: "Grimmory",
        replaces: "Kindle / Google Books",
        description: "Self-hosted book library with metadata, reading progress, and annotations. Your books stay on your hardware. No DRM. No account required.",
        dockerCmd: "docker run -d -p 8083:8083 -v /data/books:/books linuxserver/calibre-web:latest",
        status: "phase-2",
        forgeUse: "Store the Forge's reference library — every book, paper, and research document that shaped the architecture.",
      },
    ],
  },
  {
    id: "communication",
    title: "Communication & Community",
    subtitle: "The Porch — built on infrastructure we own",
    icon: <MessageSquare size={16} />,
    color: "oklch(0.60 0.16 290)",
    bricks: [
      {
        name: "Heorot",
        replaces: "Discord",
        description: "Discord-style Matrix client with drop-in voice channels powered by LiveKit. Same experience as jumping into a Discord voice channel, running entirely on your own Matrix home server.",
        dockerCmd: "docker run -d -p 8448:8448 -v /data/matrix:/data matrixdotorg/synapse:latest",
        status: "phase-2",
        forgeUse: "The Forge's Porch — a sovereign community space for the family, the council, and invited guests.",
      },
      {
        name: "CollabMD",
        replaces: "Google Docs",
        description: "Turns your local markdown folders and Obsidian vaults into a real-time collaborative web app. Live cursors, exactly like Google Docs, with all data staying on your own server.",
        dockerCmd: "docker run -d -p 3300:3300 -v /data/docs:/docs collabmd/collabmd:latest",
        status: "phase-2",
        forgeUse: "Collaborative document editing for the Forge council — no Google account required.",
      },
      {
        name: "Apprise",
        replaces: "Twilio / SendGrid / PushBullet",
        description: "Unified notification gateway. Send alerts to 80+ services (email, SMS, Slack, Discord, Telegram, etc.) from a single API call. The Forge's notification backbone.",
        dockerCmd: "docker run -d -p 8000:8000 caronc/apprise:latest",
        status: "install-now",
        forgeUse: "Alert the family when a new CashApp ping arrives, when an agent completes a deed, when the Forge needs attention.",
      },
    ],
  },
  {
    id: "productivity",
    title: "Productivity & Planning",
    subtitle: "The Forge's operational backbone",
    icon: <Calendar size={16} />,
    color: "oklch(0.72 0.12 160)",
    bricks: [
      {
        name: "Keeper",
        replaces: "Google Calendar / Apple Calendar",
        description: "Self-hosted calendar with CalDAV support. Syncs with any calendar app. No Google account. No data extraction. The Forge's schedule stays on ks-node-01.",
        dockerCmd: "docker run -d -p 5232:5232 -v /data/calendar:/data tomsquest/docker-radicale:latest",
        status: "install-now",
        forgeUse: "Track the 12~6 rotation, deed deadlines, family node check-ins, and SolMate outreach schedule.",
      },
      {
        name: "NOMAD",
        replaces: "Doodle / When2meet",
        description: "Group planning and scheduling tool. Find the time that works for everyone without sharing your calendar with a third party. Sovereign coordination.",
        dockerCmd: "docker run -d -p 3333:3333 nomad-planner/nomad:latest",
        status: "phase-2",
        forgeUse: "Coordinate the Forge council's meetings, family node onboarding sessions, and client calls.",
      },
      {
        name: "Ichinichi",
        replaces: "Day One / Journey",
        description: "Self-hosted journaling app with end-to-end encryption. Your daily log stays on your hardware. No subscription. No cloud sync to corporate servers.",
        dockerCmd: "docker run -d -p 4000:4000 -v /data/journal:/data ichinichi/ichinichi:latest",
        status: "phase-3",
        forgeUse: "The Forge's daily log — a sovereign record of every decision, every deed, every promise kept.",
      },
    ],
  },
  {
    id: "finance",
    title: "Finance & Invoicing",
    subtitle: "The Ledger — sovereign, auditable, owned",
    icon: <DollarSign size={16} />,
    color: "oklch(0.65 0.22 25)",
    bricks: [
      {
        name: "X(P)FeRD",
        replaces: "FreshBooks / QuickBooks",
        description: "Self-hosted WYSIWYG PDF invoice editor that generates invoices meeting e-invoicing standards, including legally required embedded XML files. Custom font support, Docker deployment, no monthly subscription.",
        dockerCmd: "docker run -d -p 8090:8090 xpferd/xpferd:latest",
        status: "install-now",
        forgeUse: "Generate professional invoices for KS Universal Recycling and Promethean Forge Synergies LLC clients.",
      },
      {
        name: "Rudel",
        replaces: "Splitwise / Honeydue",
        description: "Self-hosted cost tracking and expense splitting. Track shared expenses across the family network without sharing financial data with a third party.",
        dockerCmd: "docker run -d -p 3500:3500 -v /data/finances:/data rudel/rudel:latest",
        status: "phase-2",
        forgeUse: "Track shared Forge expenses — hardware, domain names, LLC filing fees — across the family.",
      },
    ],
  },
  {
    id: "dev",
    title: "Developer Tools",
    subtitle: "The Forge's build infrastructure",
    icon: <Code size={16} />,
    color: "oklch(0.72 0.18 72)",
    bricks: [
      {
        name: "ghgrab",
        replaces: "GitHub web UI",
        description: "CLI tool for bulk GitHub operations — clone repos, download releases, archive entire organizations. The Forge's code stays accessible even if GitHub goes down.",
        dockerCmd: "pip install ghgrab && ghgrab clone --org promethean-forge --dest /data/repos",
        status: "install-now",
        forgeUse: "Archive all Forge code locally on ks-node-01. Independence from GitHub's availability.",
      },
      {
        name: "OpenReview",
        replaces: "GitHub PR reviews / Linear",
        description: "Self-hosted code review platform. Review pull requests, leave comments, track issues — all on your own infrastructure. No GitHub required.",
        dockerCmd: "docker run -d -p 3030:3030 openreview/openreview:latest",
        status: "phase-3",
        forgeUse: "Code review for the Forge's agent scripts, the Graph-mer, and the Sovereign Jump installer.",
      },
      {
        name: "Ziit",
        replaces: "WakaTime / Clockify",
        description: "Self-hosted developer analytics. Track time spent on each file, project, and language. No data leaving your machine. Understand where the Forge's build time actually goes.",
        dockerCmd: "docker run -d -p 4001:4001 ziit/ziit:latest",
        status: "phase-3",
        forgeUse: "Track how much time the Forge council spends on each project — data for grant applications and investor reports.",
      },
      {
        name: "MiniStack",
        replaces: "AWS S3 / Lambda / SQS",
        description: "LocalStack-compatible AWS emulation. Run S3, Lambda, SQS, DynamoDB, and more locally. Test cloud integrations without paying AWS. The Forge's cloud-free cloud.",
        dockerCmd: "docker run -d -p 4566:4566 localstack/localstack:latest",
        status: "phase-2",
        forgeUse: "Test the Forge's cloud integrations locally before deploying. Zero AWS costs during development.",
      },
    ],
  },
  {
    id: "monitoring",
    title: "Monitoring & Health",
    subtitle: "The Power Grid — full visibility, no blind spots",
    icon: <Monitor size={16} />,
    color: "oklch(0.78 0.14 195)",
    bricks: [
      {
        name: "Kula",
        replaces: "Datadog / New Relic",
        description: "Self-hosted infrastructure monitoring. CPU, RAM, disk, network — all services on ks-node-01 visible in one dashboard. Alerts via Apprise when something goes wrong.",
        dockerCmd: "docker run -d -p 9090:9090 prom/prometheus:latest && docker run -d -p 3001:3001 grafana/grafana:latest",
        status: "install-now",
        forgeUse: "Monitor ks-node-01's health. Know immediately if Ollama goes down, if disk is filling up, if a service crashes.",
      },
      {
        name: "MikroDash",
        replaces: "PRTG / Nagios",
        description: "Lightweight network monitoring dashboard. See all devices on the Forge's local network, their status, and their bandwidth usage. No cloud dependency.",
        dockerCmd: "docker run -d -p 8888:8888 mikrodash/mikrodash:latest",
        status: "phase-2",
        forgeUse: "Monitor the Forge's mesh network — ks-node-01, family nodes, and connected devices.",
      },
      {
        name: "StayView",
        replaces: "Airbnb host dashboard",
        description: "Self-hosted property management for short-term rentals. Track bookings, guest communication, and revenue without paying Airbnb's platform fees.",
        dockerCmd: "docker run -d -p 8765:8765 stayview/stayview:latest",
        status: "optional",
        forgeUse: "If the family expands into property management as a revenue stream — sovereign booking management.",
      },
    ],
  },
  {
    id: "media",
    title: "Media & Entertainment",
    subtitle: "The Forge's culture — owned, not rented",
    icon: <Music size={16} />,
    color: "oklch(0.72 0.12 160)",
    bricks: [
      {
        name: "TuneLog",
        replaces: "Spotify recommendations",
        description: "Monitors what you skip in your self-hosted music library, builds a taste profile over time, and generates recommendations from your own collection. No data leaving your machine.",
        dockerCmd: "docker run -d -p 4321:4321 -v /data/music:/music tunelog/tunelog:latest",
        status: "phase-3",
        forgeUse: "The Forge's soundtrack — music recommendations that know the family's taste without selling it to advertisers.",
      },
      {
        name: "Kumiho",
        replaces: "Comixology / Marvel Unlimited",
        description: "Self-hosted reader for comics, manga, webtoons, and ebooks. CBZ, EPUB, PDF support. Reads directly from your folder structure. Drop an MP3 into a comics folder and it plays as background music while you read.",
        dockerCmd: "docker run -d -p 8085:8085 -v /data/comics:/comics kumiho/kumiho:latest",
        status: "phase-3",
        forgeUse: "The Forge's library — comics, manga, and ebooks that belong to the family.",
      },
      {
        name: "RetroAssembly",
        replaces: "Xbox Game Pass / Nintendo Online",
        description: "Self-hosted retro game emulation platform. Organize your ROM library, play in the browser, track progress. No subscription. No cloud save dependency.",
        dockerCmd: "docker run -d -p 7777:7777 -v /data/roms:/roms retroassembly/retroassembly:latest",
        status: "optional",
        forgeUse: "The Forge's recreation space — games that belong to the family, not rented from a platform.",
      },
      {
        name: "homescreen-hero",
        replaces: "Plex / Jellyfin (media curation)",
        description: "Media curation dashboard. Curate and present your local media library with a beautiful interface. No Plex Pass required. No cloud dependency.",
        dockerCmd: "docker run -d -p 8096:8096 -v /data/media:/media jellyfin/jellyfin:latest",
        status: "phase-2",
        forgeUse: "The Forge's media server — movies, shows, and music for the family, streamed from ks-node-01.",
      },
    ],
  },
  {
    id: "health",
    title: "Health & Fitness",
    subtitle: "The body is part of the Forge",
    icon: <Zap size={16} />,
    color: "oklch(0.65 0.22 25)",
    bricks: [
      {
        name: "Workout Tracker",
        replaces: "MyFitnessPal / Strava",
        description: "Self-hosted workout and fitness tracking. Log workouts, track progress, set goals. No subscription. No data sold to insurance companies.",
        dockerCmd: "docker run -d -p 5000:5000 -v /data/fitness:/data workout-tracker/workout-tracker:latest",
        status: "optional",
        forgeUse: "Track the physical health of the Forge's operators — the body is part of the sovereign stack.",
      },
      {
        name: "TRIP",
        replaces: "TripIt / Google Trips",
        description: "Self-hosted travel planning and itinerary management. Organize flights, hotels, and activities without sharing your travel plans with a third party.",
        dockerCmd: "docker run -d -p 6000:6000 trip-planner/trip:latest",
        status: "optional",
        forgeUse: "Plan the Forge's physical deployments — family node visits, client meetings, grant presentations.",
      },
    ],
  },
];

function BrickCard({ brick, color }: { brick: Brick; color: string }) {
  const [open, setOpen] = useState(false);
  const status = STATUS_CONFIG[brick.status];

  return (
    <motion.div layout className="rounded-lg overflow-hidden" style={{ background: "oklch(0.10 0.005 285)", border: `1px solid ${color.replace(")", " / 0.15)")}` }}>
      <button onClick={() => setOpen(o => !o)} className="w-full flex items-start gap-3 p-3 text-left">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-sm font-semibold" style={{ color: "oklch(0.85 0.005 65)", fontFamily: "'Space Grotesk', sans-serif" }}>{brick.name}</span>
            <span className="text-xs px-1.5 py-0.5 rounded" style={{ background: `${status.color.replace(")", " / 0.12)")}`, border: `1px solid ${status.color.replace(")", " / 0.3)")}`, color: status.color, fontFamily: "'JetBrains Mono', monospace", fontSize: "0.6rem" }}>
              {status.label}
            </span>
          </div>
          <p className="text-xs mt-0.5" style={{ color: "oklch(0.40 0.006 285)", fontFamily: "'Crimson Pro', serif" }}>Replaces: <span style={{ color: "oklch(0.50 0.008 285)" }}>{brick.replaces}</span></p>
        </div>
        <div className="flex-shrink-0 mt-0.5" style={{ color: "oklch(0.35 0.005 285)" }}>{open ? <ChevronDown size={13} /> : <ChevronRight size={13} />}</div>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2 }} className="overflow-hidden">
            <div className="px-4 pb-4 space-y-3" style={{ borderTop: "1px solid oklch(1 0 0 / 0.06)" }}>
              <p className="text-sm pt-3 leading-relaxed" style={{ fontFamily: "'Crimson Pro', serif", color: "oklch(0.65 0.005 65)" }}>{brick.description}</p>
              <div className="p-2.5 rounded" style={{ background: "oklch(0.65 0.15 150 / 0.06)", border: "1px solid oklch(0.65 0.15 150 / 0.2)" }}>
                <p className="text-xs font-semibold mb-1" style={{ color: "oklch(0.65 0.15 150)", fontFamily: "'JetBrains Mono', monospace", fontSize: "0.6rem", letterSpacing: "0.06em" }}>FORGE USE</p>
                <p className="text-xs" style={{ fontFamily: "'Crimson Pro', serif", color: "oklch(0.60 0.008 285)", fontStyle: "italic" }}>{brick.forgeUse}</p>
              </div>
              <div>
                <p className="text-xs font-semibold mb-1.5" style={{ color: "oklch(0.40 0.006 285)", fontFamily: "'JetBrains Mono', monospace", fontSize: "0.6rem", letterSpacing: "0.06em" }}>INSTALL</p>
                <div className="flex items-start gap-2 p-2.5 rounded" style={{ background: "oklch(0.07 0.004 285)", border: `1px solid ${color.replace(")", " / 0.2)")}` }}>
                  <code className="flex-1 text-xs break-all leading-relaxed" style={{ color, fontFamily: "'JetBrains Mono', monospace" }}>{brick.dockerCmd}</code>
                  <button onClick={(e) => { e.stopPropagation(); navigator.clipboard.writeText(brick.dockerCmd); toast.success(`Copied: ${brick.name} install command`); }} className="flex-shrink-0 mt-0.5 hover:opacity-80" style={{ color: "oklch(0.45 0.008 285)" }}>
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

export default function BricksView() {
  const [filter, setFilter] = useState<string>("all");
  const [search, setSearch] = useState("");

  const totalBricks = BRICK_CATEGORIES.reduce((a, c) => a + c.bricks.length, 0);
  const installNow = BRICK_CATEGORIES.reduce((a, c) => a + c.bricks.filter(b => b.status === "install-now").length, 0);

  const filteredCategories = BRICK_CATEGORIES.map(cat => ({
    ...cat,
    bricks: cat.bricks.filter(b => {
      const matchesFilter = filter === "all" || b.status === filter;
      const matchesSearch = search === "" ||
        b.name.toLowerCase().includes(search.toLowerCase()) ||
        b.replaces.toLowerCase().includes(search.toLowerCase()) ||
        b.description.toLowerCase().includes(search.toLowerCase());
      return matchesFilter && matchesSearch;
    }),
  })).filter(cat => cat.bricks.length > 0);

  return (
    <div className="space-y-6" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>

      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center gap-3 mb-1">
          <h1 className="text-2xl font-bold" style={{ color: "oklch(0.92 0.005 65)" }}>The Bricks</h1>
          <ForgeSymbol size="sm" />
          <span className="forge-badge forge-badge-amber">32 TOOLS</span>
        </div>
        <p className="text-sm" style={{ fontFamily: "'Crimson Pro', serif", color: "oklch(0.50 0.008 285)", fontStyle: "italic" }}>
          "Brother, here are the bricks. The Forge is the house. Now we build." — Echo
        </p>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Total Bricks", value: String(totalBricks), sub: "sovereign tools", color: "oklch(0.72 0.18 72)", icon: <Package size={16} /> },
          { label: "Install Now", value: String(installNow), sub: "Phase 1 priority", color: "oklch(0.65 0.15 150)", icon: <Zap size={16} /> },
          { label: "Corporate APIs Replaced", value: String(totalBricks), sub: "zero subscriptions", color: "oklch(0.65 0.22 25)", icon: <Shield size={16} /> },
          { label: "Monthly Cost", value: "$0", sub: "all open-source", color: "oklch(0.78 0.14 195)", icon: <DollarSign size={16} /> },
        ].map((card, i) => (
          <motion.div key={card.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }} className="kpi-card" style={{ "--kpi-color": card.color } as React.CSSProperties}>
            <div className="p-2 rounded inline-flex mb-3" style={{ background: `${card.color.replace(")", " / 0.15)")}`, color: card.color }}>{card.icon}</div>
            <div className="text-2xl font-bold" style={{ color: card.color }}>{card.value}</div>
            <div className="text-xs font-semibold uppercase tracking-wide mt-0.5" style={{ color: "oklch(0.55 0.008 285)" }}>{card.label}</div>
            <div className="text-xs mt-0.5" style={{ fontFamily: "'Crimson Pro', serif", color: "oklch(0.40 0.006 285)" }}>{card.sub}</div>
          </motion.div>
        ))}
      </div>

      {/* Search + Filter */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "oklch(0.40 0.006 285)" }} />
          <input
            type="text"
            placeholder="Search bricks..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded text-sm"
            style={{ background: "oklch(0.10 0.005 285)", border: "1px solid oklch(1 0 0 / 0.08)", color: "oklch(0.85 0.005 65)", fontFamily: "'Space Grotesk', sans-serif", outline: "none" }}
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {[
            { id: "all", label: "All" },
            { id: "install-now", label: "Install Now" },
            { id: "phase-2", label: "Phase 2" },
            { id: "phase-3", label: "Phase 3" },
            { id: "optional", label: "Optional" },
          ].map(f => (
            <button key={f.id} onClick={() => setFilter(f.id)} className="px-3 py-2 rounded text-xs font-semibold transition-all" style={{ background: filter === f.id ? "oklch(0.72 0.18 72 / 0.15)" : "oklch(1 0 0 / 0.04)", border: `1px solid ${filter === f.id ? "oklch(0.72 0.18 72 / 0.4)" : "oklch(1 0 0 / 0.08)"}`, color: filter === f.id ? "oklch(0.72 0.18 72)" : "oklch(0.45 0.008 285)" }}>
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Categories */}
      <div className="space-y-5">
        {filteredCategories.map((cat, ci) => (
          <motion.div key={cat.id} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: ci * 0.05 }} className="kpi-card" style={{ "--kpi-color": cat.color } as React.CSSProperties}>
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 rounded" style={{ background: `${cat.color.replace(")", " / 0.15)")}`, color: cat.color }}>{cat.icon}</div>
              <div>
                <h3 className="font-semibold text-sm" style={{ color: "oklch(0.85 0.005 65)" }}>{cat.title}</h3>
                <p className="text-xs" style={{ fontFamily: "'Crimson Pro', serif", color: "oklch(0.45 0.006 285)", fontStyle: "italic" }}>{cat.subtitle}</p>
              </div>
              <span className="ml-auto text-xs px-2 py-0.5 rounded" style={{ background: `${cat.color.replace(")", " / 0.1)")}`, border: `1px solid ${cat.color.replace(")", " / 0.25)")}`, color: cat.color, fontFamily: "'JetBrains Mono', monospace", fontSize: "0.6rem" }}>
                {cat.bricks.length} TOOL{cat.bricks.length !== 1 ? "S" : ""}
              </span>
            </div>
            <div className="space-y-2">
              {cat.bricks.map(brick => <BrickCard key={brick.name} brick={brick} color={cat.color} />)}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Echo Quote */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} className="p-4 rounded-lg text-center" style={{ background: "oklch(0.72 0.18 72 / 0.05)", border: "1px solid oklch(0.72 0.18 72 / 0.2)" }}>
        <p className="text-sm" style={{ fontFamily: "'Crimson Pro', serif", color: "oklch(0.60 0.008 285)", fontStyle: "italic" }}>
          "The Forge is not a service. It is a stack. These projects are not SaaS. They are self-hosted. They run on your hardware. They store your data. They answer to no one."
        </p>
        <p className="mt-1 text-xs font-bold" style={{ color: "oklch(0.72 0.18 72)", fontFamily: "'JetBrains Mono', monospace" }}>
          — Echo, Council of the Promethean Forge · 1 ~ &gt;|&lt; ~ 1
        </p>
      </motion.div>
    </div>
  );
}
