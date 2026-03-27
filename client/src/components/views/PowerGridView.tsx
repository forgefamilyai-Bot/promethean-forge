/* ============================================================
   POWER GRID VIEW — Sovereign Node Network
   ks-node-01 and the growing family network.
   No cloud dependency. No empire. Pure sovereign compute.
   Dark Forge Cosmos: void black, forge amber, sovereign cyan.
   ============================================================ */
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Cpu, Wifi, HardDrive, Thermometer, Activity, Zap, Server } from "lucide-react";
import ForgeSymbol from "../ForgeSymbol";

interface Node {
  id: string;
  name: string;
  owner: string;
  hardware: string;
  status: "ONLINE" | "OFFLINE" | "PENDING" | "BUILDING";
  ip: string;
  uptime: string;
  cpu: number;
  ram: number;
  storage: number;
  temp: number;
  color: string;
  role: string;
  services: string[];
}

const NODES: Node[] = [
  {
    id: "ks-node-01",
    name: "ks-node-01",
    owner: "Bill (Forge-Master)",
    hardware: "Mac Mini M4 · 8GB · 256GB",
    status: "ONLINE",
    ip: "192.168.1.1",
    uptime: "11 months, 3 days",
    cpu: 23,
    ram: 41,
    storage: 67,
    temp: 42,
    color: "oklch(0.72 0.18 72)",
    role: "Primary Sovereign Node · Forge Core",
    services: ["Legacy Engine", "Plinko Filter", "Business Scout", "Forge Galaxy V2"],
  },
  {
    id: "ks-node-james",
    name: "ks-node-james",
    owner: "James",
    hardware: "Mac Mini M4 · 8GB · 256GB",
    status: "PENDING",
    ip: "—",
    uptime: "—",
    cpu: 0,
    ram: 0,
    storage: 0,
    temp: 0,
    color: "oklch(0.78 0.14 195)",
    role: "Family Node · Pending Activation",
    services: ["Awaiting Sovereign Jump install"],
  },
  {
    id: "ks-node-kip",
    name: "ks-node-kip",
    owner: "Kip",
    hardware: "Mac Mini M4 · 8GB · 256GB",
    status: "BUILDING",
    ip: "—",
    uptime: "—",
    cpu: 0,
    ram: 0,
    storage: 0,
    temp: 0,
    color: "oklch(0.65 0.15 150)",
    role: "Family Node · Legacy Audit Host",
    services: ["Kip Legacy Audit", "Awaiting Sovereign Jump install"],
  },
  {
    id: "ks-node-jackie",
    name: "ks-node-jackie",
    owner: "Jackie",
    hardware: "Mac Mini M4 · 8GB · 256GB",
    status: "PENDING",
    ip: "—",
    uptime: "—",
    cpu: 0,
    ram: 0,
    storage: 0,
    temp: 0,
    color: "oklch(0.72 0.14 290)",
    role: "Family Node · Pending Activation",
    services: ["Awaiting Sovereign Jump install"],
  },
];

const SERVICES = [
  { name: "Legacy Engine", status: "ACTIVE", load: 34, color: "oklch(0.72 0.18 72)", desc: "987,031 files indexed" },
  { name: "Plinko Filter", status: "ACTIVE", load: 12, color: "oklch(0.78 0.14 195)", desc: "Signal routing live" },
  { name: "Business Scout", status: "SCANNING", load: 28, color: "oklch(0.65 0.15 150)", desc: "6 sectors monitored" },
  { name: "Forge Galaxy V2", status: "SERVING", load: 8, color: "oklch(0.65 0.22 25)", desc: "All views activated" },
  { name: "Road Oracle", status: "READY", load: 2, color: "oklch(0.72 0.14 290)", desc: "AI diagnostic online" },
  { name: "Content Pipeline", status: "READY", load: 5, color: "oklch(0.75 0.12 72)", desc: "AutoMeta connected" },
];

const STATUS_COLORS: Record<string, string> = {
  ONLINE: "oklch(0.65 0.15 150)",
  OFFLINE: "oklch(0.65 0.22 25)",
  PENDING: "oklch(0.72 0.18 72)",
  BUILDING: "oklch(0.78 0.14 195)",
};

function GaugeBar({ value, color, label }: { value: number; color: string; label: string }) {
  return (
    <div>
      <div className="flex justify-between mb-1">
        <span className="text-xs" style={{ color: "oklch(0.40 0.006 285)", fontFamily: "'JetBrains Mono', monospace", fontSize: "0.6rem" }}>{label}</span>
        <span className="text-xs font-bold" style={{ color, fontFamily: "'JetBrains Mono', monospace", fontSize: "0.6rem" }}>{value}%</span>
      </div>
      <div className="h-1 rounded-full" style={{ background: "oklch(1 0 0 / 0.08)" }}>
        <motion.div
          className="h-full rounded-full"
          style={{ background: color }}
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}

export default function PowerGridView() {
  const [tick, setTick] = useState(0);

  // Simulate live CPU fluctuation on ks-node-01
  useEffect(() => {
    const interval = setInterval(() => setTick(t => t + 1), 3000);
    return () => clearInterval(interval);
  }, []);

  const liveNode = {
    ...NODES[0],
    cpu: Math.min(95, Math.max(10, NODES[0].cpu + Math.round((Math.random() - 0.5) * 12))),
    temp: Math.min(75, Math.max(35, NODES[0].temp + Math.round((Math.random() - 0.5) * 4))),
  };

  const allNodes = [liveNode, ...NODES.slice(1)];

  return (
    <div style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
        <div className="flex items-center gap-3 mb-1">
          <h2 className="text-xl font-bold" style={{ color: "oklch(0.92 0.005 65)" }}>Power Grid</h2>
          <ForgeSymbol size="sm" />
          <span style={{
            background: "oklch(0.65 0.15 150 / 0.12)",
            border: "1px solid oklch(0.65 0.15 150 / 0.3)",
            color: "oklch(0.65 0.15 150)",
            fontSize: "0.6rem", padding: "2px 6px", borderRadius: "4px",
            fontFamily: "'JetBrains Mono', monospace", fontWeight: 600,
          }}>1 NODE LIVE · 3 PENDING</span>
        </div>
        <p style={{ fontFamily: "'Crimson Pro', serif", color: "oklch(0.50 0.008 285)", fontStyle: "italic", fontSize: "0.9rem" }}>
          Sovereign compute. No cloud dependency. No empire. The network grows one node at a time.
        </p>
      </motion.div>

      {/* Node Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
        {allNodes.map((node, i) => (
          <motion.div
            key={node.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className="p-4 rounded-lg"
            style={{
              background: "oklch(0.10 0.005 285)",
              border: `1px solid ${node.status === "ONLINE" ? node.color.replace(")", " / 0.35)") : "oklch(1 0 0 / 0.08)"}`,
            }}
          >
            {/* Node Header */}
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-2">
                <div
                  className="w-8 h-8 rounded flex items-center justify-center"
                  style={{ background: `${node.color.replace(")", " / 0.12)")}`, color: node.color }}
                >
                  <Server size={15} />
                </div>
                <div>
                  <p className="text-sm font-bold" style={{ color: node.color, fontFamily: "'JetBrains Mono', monospace" }}>{node.name}</p>
                  <p className="text-xs" style={{ color: "oklch(0.45 0.008 285)" }}>{node.owner}</p>
                </div>
              </div>
              <div className="flex items-center gap-1.5">
                {node.status === "ONLINE" && (
                  <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: STATUS_COLORS[node.status] }} />
                )}
                <span
                  className="text-xs px-1.5 py-0.5 rounded"
                  style={{
                    background: `${STATUS_COLORS[node.status].replace(")", " / 0.12)")}`,
                    border: `1px solid ${STATUS_COLORS[node.status].replace(")", " / 0.3)")}`,
                    color: STATUS_COLORS[node.status],
                    fontFamily: "'JetBrains Mono', monospace", fontSize: "0.6rem",
                  }}
                >
                  {node.status}
                </span>
              </div>
            </div>

            {/* Hardware */}
            <p className="text-xs mb-3" style={{ color: "oklch(0.40 0.006 285)", fontFamily: "'JetBrains Mono', monospace" }}>
              {node.hardware}
            </p>

            {/* Metrics for ONLINE node */}
            {node.status === "ONLINE" && (
              <div className="space-y-2 mb-3">
                <GaugeBar value={node.cpu} color="oklch(0.72 0.18 72)" label="CPU" />
                <GaugeBar value={node.ram} color="oklch(0.78 0.14 195)" label="RAM" />
                <GaugeBar value={node.storage} color="oklch(0.65 0.22 25)" label="DISK" />
                <div className="flex items-center gap-2 mt-1">
                  <Thermometer size={10} style={{ color: node.temp > 65 ? "oklch(0.65 0.22 25)" : "oklch(0.65 0.15 150)" }} />
                  <span className="text-xs" style={{ color: "oklch(0.40 0.006 285)", fontFamily: "'JetBrains Mono', monospace", fontSize: "0.6rem" }}>
                    TEMP: {node.temp}°C · UPTIME: {node.uptime}
                  </span>
                </div>
              </div>
            )}

            {/* Pending/Building message */}
            {node.status !== "ONLINE" && (
              <div className="mb-3 p-2 rounded text-xs" style={{
                background: `${node.color.replace(")", " / 0.06)")}`,
                border: `1px dashed ${node.color.replace(")", " / 0.25)")}`,
                color: "oklch(0.50 0.008 285)",
                fontFamily: "'Crimson Pro', serif",
                fontStyle: "italic",
              }}>
                {node.status === "BUILDING" ? "Sovereign Jump installer in progress. Node coming online soon." : "Awaiting Sovereign Jump installation. Visit /jump to activate."}
              </div>
            )}

            {/* Services */}
            <div>
              <p className="text-xs mb-1.5" style={{ color: "oklch(0.35 0.005 285)", fontFamily: "'JetBrains Mono', monospace", fontSize: "0.6rem", letterSpacing: "0.06em" }}>
                SERVICES
              </p>
              <div className="flex flex-wrap gap-1">
                {node.services.map(s => (
                  <span key={s} className="text-xs px-1.5 py-0.5 rounded" style={{
                    background: "oklch(1 0 0 / 0.05)", border: "1px solid oklch(1 0 0 / 0.1)",
                    color: "oklch(0.50 0.008 285)", fontSize: "0.6rem",
                  }}>{s}</span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Services Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <p className="text-xs font-semibold mb-3" style={{ color: "oklch(0.40 0.006 285)", fontFamily: "'JetBrains Mono', monospace", letterSpacing: "0.08em" }}>
          RUNNING SERVICES — ks-node-01
        </p>
        <div className="space-y-2">
          {SERVICES.map((svc, i) => (
            <div
              key={svc.name}
              className="flex items-center gap-3 p-3 rounded"
              style={{ background: "oklch(0.10 0.005 285)", border: "1px solid oklch(1 0 0 / 0.07)" }}
            >
              <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: svc.color }} />
              <span className="text-sm font-semibold flex-shrink-0 w-36" style={{ color: svc.color }}>{svc.name}</span>
              <span className="text-xs flex-shrink-0 w-20" style={{
                background: `${svc.color.replace(")", " / 0.1)")}`,
                border: `1px solid ${svc.color.replace(")", " / 0.25)")}`,
                color: svc.color,
                fontFamily: "'JetBrains Mono', monospace", fontSize: "0.6rem",
                padding: "1px 6px", borderRadius: "4px", textAlign: "center",
              }}>{svc.status}</span>
              <div className="flex-1">
                <div className="h-1 rounded-full" style={{ background: "oklch(1 0 0 / 0.08)" }}>
                  <motion.div
                    className="h-full rounded-full"
                    style={{ background: svc.color }}
                    initial={{ width: 0 }}
                    animate={{ width: `${svc.load}%` }}
                    transition={{ duration: 0.8, delay: i * 0.1 }}
                  />
                </div>
              </div>
              <span className="text-xs flex-shrink-0" style={{ color: "oklch(0.40 0.006 285)", fontFamily: "'JetBrains Mono', monospace", fontSize: "0.6rem" }}>
                {svc.load}%
              </span>
              <span className="text-xs flex-shrink-0" style={{ color: "oklch(0.45 0.008 285)" }}>{svc.desc}</span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="mt-6 p-4 rounded flex items-center gap-3"
        style={{ background: "oklch(0.72 0.18 72 / 0.05)", border: "1px solid oklch(0.72 0.18 72 / 0.15)" }}
      >
        <Zap size={16} style={{ color: "oklch(0.72 0.18 72)", flexShrink: 0 }} />
        <p style={{ fontFamily: "'Crimson Pro', serif", color: "oklch(0.55 0.008 285)", fontStyle: "italic", fontSize: "0.9rem" }}>
          "The empire needs a data center. The Forge needs a family. One node at a time, the network grows."
        </p>
      </motion.div>
    </div>
  );
}
