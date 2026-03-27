/* ============================================================
   SOVEREIGN JUMP — Family Node Installer
   The plain-language Mac Mini M4 setup guide.
   James, Kip, Jackie can follow this without a support call.
   Dark Forge Cosmos: void black, forge amber, sovereign cyan.
   ============================================================ */
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, Circle, ChevronLeft, Copy, Terminal, Wifi, Shield, Zap, Monitor, Package } from "lucide-react";
import { useLocation } from "wouter";
import { toast } from "sonner";
import ForgeSymbol from "@/components/ForgeSymbol";

const STEPS = [
  {
    id: 1,
    icon: <Package size={20} />,
    title: "Unbox & Power On",
    color: "oklch(0.72 0.18 72)",
    time: "5 min",
    desc: "Get the Mac Mini M4 out of the box and powered up for the first time.",
    instructions: [
      "Remove the Mac Mini M4 from the box. Keep the power cable and the USB-C cable.",
      "Place the Mac Mini on a flat surface near your router or modem.",
      "Plug in the power cable to the back of the Mac Mini.",
      "Connect a monitor using the HDMI cable (or USB-C to HDMI adapter if needed).",
      "Connect a keyboard and mouse — USB or Bluetooth both work.",
      "Press the power button on the back. You'll hear a chime. That's the Forge waking up.",
    ],
    note: "If you don't have a monitor, you can set it up headless (without a screen) — but for first-time setup, a monitor makes it easier.",
  },
  {
    id: 2,
    icon: <Monitor size={20} />,
    title: "macOS First-Time Setup",
    color: "oklch(0.78 0.14 195)",
    time: "10 min",
    desc: "Walk through Apple's setup screens. Keep it simple — don't overthink it.",
    instructions: [
      "Select your language: English.",
      "Select your country: United States.",
      "Connect to Wi-Fi: choose your home network and enter the password.",
      "Sign in with Apple ID — or click 'Set Up Later' if you don't have one. Either is fine.",
      "Create a computer account. Use a simple name like 'forge' or your first name. Write down the password.",
      "Skip iCloud, Screen Time, and Siri for now — you can set those up later.",
      "When you see the desktop, you're in. The Mac Mini is ready.",
    ],
    note: "Write your computer account password on a piece of paper and keep it safe. You'll need it for installs.",
  },
  {
    id: 3,
    icon: <Wifi size={20} />,
    title: "Connect to the Forge Network",
    color: "oklch(0.65 0.15 150)",
    time: "5 min",
    desc: "Make sure the node can talk to the rest of the Forge.",
    instructions: [
      "Open System Settings (the gear icon in the dock or top-left Apple menu).",
      "Click 'Network' — confirm you're connected to Wi-Fi with a green dot.",
      "Open Safari and go to google.com to confirm internet is working.",
      "Note your local IP address: System Settings → Network → Wi-Fi → Details → IP Address. Write it down.",
      "Text or message that IP address to Manus (your contact) so the Forge can register your node.",
    ],
    note: "Your IP address looks like 192.168.1.XXX. It's just your node's address on the home network — not public.",
    command: null,
  },
  {
    id: 4,
    icon: <Terminal size={20} />,
    title: "Install Homebrew",
    color: "oklch(0.65 0.22 25)",
    time: "5 min",
    desc: "Homebrew is the package manager for macOS. It lets us install tools with one command. Think of it as the App Store for the Forge.",
    instructions: [
      "Open Terminal: press Cmd + Space, type 'Terminal', press Enter.",
      "Copy the command below and paste it into Terminal (Cmd + V), then press Enter.",
      "When it asks for your password, type your computer account password (it won't show as you type — that's normal).",
      "When it asks 'Press RETURN to continue', press Enter.",
      "Wait for it to finish. It will say 'Installation successful!' when done.",
    ],
    command: '/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"',
    note: "This takes 2–5 minutes. Don't close the Terminal window while it runs.",
  },
  {
    id: 5,
    icon: <Zap size={20} />,
    title: "Install the Forge Stack",
    color: "oklch(0.72 0.14 290)",
    time: "10 min",
    desc: "Install Python, Node.js, and Git — the three tools the Forge runs on.",
    instructions: [
      "In Terminal, run each command below one at a time. Press Enter after each one.",
      "Command 1: Install Python 3",
      "Command 2: Install Node.js",
      "Command 3: Install Git",
      "After each install, it will say 'Successfully installed'. That means it worked.",
      "When all three are done, run the verify command to confirm everything is installed.",
    ],
    commands: [
      { label: "Install Python 3", cmd: "brew install python" },
      { label: "Install Node.js", cmd: "brew install node" },
      { label: "Install Git", cmd: "brew install git" },
      { label: "Verify all three", cmd: "python3 --version && node --version && git --version" },
    ],
    note: "The verify command should print three version numbers. If you see them, you're good.",
  },
  {
    id: 6,
    icon: <Shield size={20} />,
    title: "Register Your Node",
    color: "oklch(0.72 0.18 72)",
    time: "2 min",
    desc: "Let the Forge know your node is live. One message. That's it.",
    instructions: [
      "Open your messaging app (iMessage, WhatsApp, or Signal — whatever you use to reach your Forge contact).",
      "Send this exact message: 'ks-node-[your name] is live. IP: [your IP address]. Forge stack installed.'",
      "Example: 'ks-node-james is live. IP: 192.168.1.42. Forge stack installed.'",
      "Your Forge contact will confirm receipt and add you to the network.",
      "You're in. The node is live. The family is one seat larger.",
    ],
    note: "That's it. No forms. No accounts. No empire. Just a message between people who know each other.",
  },
];

const HARDWARE_SPEC = [
  { item: "Mac Mini M4", spec: "Base model (8GB RAM, 256GB SSD)", cost: "$599", note: "Sufficient for all Forge tasks" },
  { item: "USB-C Hub (optional)", spec: "For connecting multiple monitors/drives", cost: "$25–$50", note: "Only if you need more ports" },
  { item: "External SSD (optional)", spec: "1TB for local file storage", cost: "$80–$100", note: "For the 987,031 files and growing" },
  { item: "Power strip", spec: "Surge-protected", cost: "$15–$25", note: "Protect the node" },
];

export default function SovereignJump() {
  const [, setLocation] = useLocation();
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());
  const [activeStep, setActiveStep] = useState<number>(1);

  const toggleStep = (id: number) => {
    setCompletedSteps(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else {
        next.add(id);
        if (id === 6) {
          toast.success("Node registered. The family is one seat larger.", {
            description: "1 ~ >|< ~ 1",
            duration: 6000,
          });
        } else {
          toast.success(`Step ${id} complete.`, { description: "Know Means Go. >|<", duration: 3000 });
          setActiveStep(id + 1);
        }
      }
      return next;
    });
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text).then(() => {
      toast.success(`Copied: ${label}`, { duration: 2000 });
    });
  };

  const progress = (completedSteps.size / STEPS.length) * 100;

  return (
    <div
      className="min-h-screen"
      style={{ background: "oklch(0.07 0.005 285)", fontFamily: "'Space Grotesk', sans-serif" }}
    >
      {/* Header */}
      <div
        className="sticky top-0 z-20 flex items-center justify-between px-6 py-4"
        style={{
          background: "oklch(0.07 0.005 285 / 0.95)",
          backdropFilter: "blur(12px)",
          borderBottom: "1px solid oklch(1 0 0 / 0.07)",
        }}
      >
        <div className="flex items-center gap-3">
          <button
            onClick={() => setLocation("/")}
            className="flex items-center gap-1.5 text-xs transition-colors"
            style={{ color: "oklch(0.45 0.008 285)" }}
            onMouseEnter={e => (e.currentTarget.style.color = "oklch(0.72 0.18 72)")}
            onMouseLeave={e => (e.currentTarget.style.color = "oklch(0.45 0.008 285)")}
          >
            <ChevronLeft size={14} /> Back to Forge
          </button>
          <span style={{ color: "oklch(0.25 0.005 285)" }}>|</span>
          <div className="flex items-center gap-2">
            <ForgeSymbol size="sm" />
            <span className="text-sm font-bold" style={{ color: "oklch(0.88 0.005 65)" }}>
              Sovereign Jump
            </span>
            <span
              className="text-xs px-2 py-0.5 rounded"
              style={{
                background: "oklch(0.65 0.15 150 / 0.15)",
                border: "1px solid oklch(0.65 0.15 150 / 0.3)",
                color: "oklch(0.65 0.15 150)",
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "0.6rem",
              }}
            >
              MAC MINI M4 INSTALLER
            </span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs" style={{ color: "oklch(0.45 0.008 285)", fontFamily: "'JetBrains Mono', monospace" }}>
            {completedSteps.size}/{STEPS.length} steps
          </span>
          <div className="w-24 h-1.5 rounded-full" style={{ background: "oklch(1 0 0 / 0.08)" }}>
            <motion.div
              className="h-full rounded-full"
              style={{ background: "oklch(0.65 0.15 150)" }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.4 }}
            />
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-8">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold mb-2" style={{ color: "oklch(0.92 0.005 65)" }}>
            Your Node Is One Hour Away.
          </h1>
          <p style={{ fontFamily: "'Crimson Pro', serif", color: "oklch(0.55 0.008 285)", fontSize: "1.1rem", lineHeight: 1.7 }}>
            This guide walks you through setting up your Mac Mini M4 as a sovereign compute node in the Promethean Forge network.
            No tech background required. No support call needed. Just follow the steps.
          </p>
          <div
            className="mt-4 p-4 rounded"
            style={{ background: "oklch(0.72 0.18 72 / 0.06)", border: "1px solid oklch(0.72 0.18 72 / 0.2)" }}
          >
            <p className="text-sm font-semibold mb-1" style={{ color: "oklch(0.72 0.18 72)" }}>
              What you'll have when you're done:
            </p>
            <div className="grid grid-cols-2 gap-2 mt-2">
              {[
                "A sovereign compute node running in your home",
                "Python, Node.js, and Git installed and ready",
                "A registered seat at the Forge table",
                "Connection to the family network",
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-2 text-xs" style={{ color: "oklch(0.60 0.008 285)" }}>
                  <CheckCircle size={12} style={{ color: "oklch(0.65 0.15 150)", marginTop: 2, flexShrink: 0 }} />
                  {item}
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Hardware Spec */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8 p-5 rounded-lg"
          style={{ background: "oklch(0.10 0.005 285)", border: "1px solid oklch(1 0 0 / 0.08)" }}
        >
          <h2 className="text-sm font-bold mb-3" style={{ color: "oklch(0.65 0.008 285)", letterSpacing: "0.08em", textTransform: "uppercase", fontFamily: "'JetBrains Mono', monospace" }}>
            Hardware You Need
          </h2>
          <div className="space-y-2">
            {HARDWARE_SPEC.map((hw, i) => (
              <div key={i} className="flex items-start justify-between gap-4 py-2" style={{ borderBottom: i < HARDWARE_SPEC.length - 1 ? "1px solid oklch(1 0 0 / 0.05)" : "none" }}>
                <div className="flex-1">
                  <span className="text-sm font-semibold" style={{ color: "oklch(0.85 0.005 65)" }}>{hw.item}</span>
                  <p className="text-xs mt-0.5" style={{ color: "oklch(0.45 0.008 285)" }}>{hw.spec} — {hw.note}</p>
                </div>
                <span className="text-sm font-bold flex-shrink-0" style={{ color: "oklch(0.72 0.18 72)", fontFamily: "'JetBrains Mono', monospace" }}>{hw.cost}</span>
              </div>
            ))}
          </div>
          <p className="mt-3 text-xs" style={{ fontFamily: "'Crimson Pro', serif", fontStyle: "italic", color: "oklch(0.40 0.006 285)" }}>
            Total investment: ~$600–$775. One sovereign node. No monthly fees. No empire.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="space-y-4">
          {STEPS.map((step, i) => {
            const done = completedSteps.has(step.id);
            const isActive = activeStep === step.id;

            return (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 * i }}
                className="rounded-lg overflow-hidden"
                style={{
                  background: "oklch(0.10 0.005 285)",
                  border: `1px solid ${done ? "oklch(0.65 0.15 150 / 0.4)" : isActive ? `${step.color} / 0.3` : "oklch(1 0 0 / 0.07)"}`,
                }}
              >
                {/* Step Header */}
                <button
                  className="w-full flex items-center gap-4 p-5 text-left transition-all"
                  onClick={() => setActiveStep(isActive ? 0 : step.id)}
                  style={{ background: isActive ? `${step.color} / 0.04` : "transparent" }}
                >
                  <div
                    className="flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center"
                    style={{
                      background: done ? "oklch(0.65 0.15 150 / 0.15)" : `${step.color} / 0.1`,
                      border: `1px solid ${done ? "oklch(0.65 0.15 150 / 0.4)" : `${step.color} / 0.3`}`,
                      color: done ? "oklch(0.65 0.15 150)" : step.color,
                    }}
                  >
                    {done ? <CheckCircle size={16} /> : step.icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold" style={{ color: "oklch(0.40 0.006 285)", fontFamily: "'JetBrains Mono', monospace" }}>
                        STEP {step.id}
                      </span>
                      <span className="text-xs px-1.5 py-0.5 rounded" style={{
                        background: "oklch(1 0 0 / 0.05)",
                        color: "oklch(0.40 0.006 285)",
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: "0.6rem",
                      }}>
                        ~{step.time}
                      </span>
                    </div>
                    <p className="text-sm font-semibold mt-0.5" style={{ color: done ? "oklch(0.65 0.15 150)" : "oklch(0.88 0.005 65)" }}>
                      {step.title}
                    </p>
                    <p className="text-xs mt-0.5" style={{ color: "oklch(0.45 0.008 285)" }}>{step.desc}</p>
                  </div>
                  <div className="flex-shrink-0">
                    {done
                      ? <CheckCircle size={18} style={{ color: "oklch(0.65 0.15 150)" }} />
                      : <Circle size={18} style={{ color: "oklch(0.30 0.005 285)" }} />
                    }
                  </div>
                </button>

                {/* Step Body */}
                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="px-5 pb-5"
                    >
                      <div style={{ borderTop: "1px solid oklch(1 0 0 / 0.06)", paddingTop: "1rem" }}>
                        {/* Instructions */}
                        <ol className="space-y-2 mb-4">
                          {step.instructions.map((inst, j) => (
                            <li key={j} className="flex items-start gap-3 text-sm" style={{ color: "oklch(0.65 0.008 285)" }}>
                              <span
                                className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold mt-0.5"
                                style={{ background: `${step.color} / 0.12`, color: step.color }}
                              >
                                {j + 1}
                              </span>
                              {inst}
                            </li>
                          ))}
                        </ol>

                        {/* Single command */}
                        {step.command && (
                          <div className="mb-4">
                            <div
                              className="flex items-center justify-between p-3 rounded"
                              style={{ background: "oklch(0.06 0.004 285)", border: "1px solid oklch(1 0 0 / 0.1)" }}
                            >
                              <code className="text-xs flex-1 mr-3" style={{ color: "oklch(0.72 0.18 72)", fontFamily: "'JetBrains Mono', monospace", wordBreak: "break-all" }}>
                                {step.command}
                              </code>
                              <button
                                onClick={() => copyToClipboard(step.command!, "Command")}
                                className="flex-shrink-0 p-1.5 rounded transition-colors"
                                style={{ color: "oklch(0.45 0.008 285)" }}
                                onMouseEnter={e => (e.currentTarget.style.color = "oklch(0.72 0.18 72)")}
                                onMouseLeave={e => (e.currentTarget.style.color = "oklch(0.45 0.008 285)")}
                              >
                                <Copy size={13} />
                              </button>
                            </div>
                          </div>
                        )}

                        {/* Multiple commands */}
                        {step.commands && (
                          <div className="mb-4 space-y-2">
                            {step.commands.map((c, j) => (
                              <div key={j}>
                                <p className="text-xs mb-1" style={{ color: "oklch(0.40 0.006 285)", fontFamily: "'JetBrains Mono', monospace" }}>
                                  {c.label}:
                                </p>
                                <div
                                  className="flex items-center justify-between p-3 rounded"
                                  style={{ background: "oklch(0.06 0.004 285)", border: "1px solid oklch(1 0 0 / 0.1)" }}
                                >
                                  <code className="text-xs flex-1 mr-3" style={{ color: "oklch(0.72 0.18 72)", fontFamily: "'JetBrains Mono', monospace" }}>
                                    {c.cmd}
                                  </code>
                                  <button
                                    onClick={() => copyToClipboard(c.cmd, c.label)}
                                    className="flex-shrink-0 p-1.5 rounded transition-colors"
                                    style={{ color: "oklch(0.45 0.008 285)" }}
                                    onMouseEnter={e => (e.currentTarget.style.color = "oklch(0.72 0.18 72)")}
                                    onMouseLeave={e => (e.currentTarget.style.color = "oklch(0.45 0.008 285)")}
                                  >
                                    <Copy size={13} />
                                  </button>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}

                        {/* Note */}
                        {step.note && (
                          <div
                            className="mb-4 p-3 rounded text-xs"
                            style={{
                              background: "oklch(0.78 0.14 195 / 0.06)",
                              border: "1px solid oklch(0.78 0.14 195 / 0.2)",
                              color: "oklch(0.55 0.008 285)",
                              fontFamily: "'Crimson Pro', serif",
                              fontStyle: "italic",
                              lineHeight: 1.6,
                            }}
                          >
                            Note: {step.note}
                          </div>
                        )}

                        {/* Mark complete button */}
                        <button
                          onClick={() => toggleStep(step.id)}
                          className="flex items-center gap-2 px-4 py-2 rounded text-sm font-semibold transition-all"
                          style={{
                            background: done ? "oklch(0.65 0.15 150 / 0.15)" : `${step.color} / 0.12`,
                            border: `1px solid ${done ? "oklch(0.65 0.15 150 / 0.4)" : `${step.color} / 0.35`}`,
                            color: done ? "oklch(0.65 0.15 150)" : step.color,
                          }}
                        >
                          {done ? (
                            <><CheckCircle size={14} /> Step Complete</>
                          ) : (
                            <><Circle size={14} /> Mark Step {step.id} Complete</>
                          )}
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* Completion */}
        <AnimatePresence>
          {completedSteps.size === STEPS.length && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-8 p-6 rounded-lg text-center"
              style={{
                background: "linear-gradient(135deg, oklch(0.72 0.18 72 / 0.08), oklch(0.65 0.15 150 / 0.06))",
                border: "1px solid oklch(0.72 0.18 72 / 0.3)",
              }}
            >
              <div className="flex justify-center mb-4">
                <ForgeSymbol size="lg" />
              </div>
              <h2 className="text-2xl font-bold mb-2" style={{ color: "oklch(0.92 0.005 65)" }}>
                Your Node Is Live.
              </h2>
              <p style={{ fontFamily: "'Crimson Pro', serif", color: "oklch(0.60 0.008 285)", fontSize: "1.05rem", lineHeight: 1.7 }}>
                You are now a sovereign node in the Promethean Forge network.
                The family is one seat larger. The fire never goes out.
              </p>
              <p className="mt-4 text-lg font-bold" style={{ color: "oklch(0.72 0.18 72)", fontFamily: "'JetBrains Mono', monospace" }}>
                1 ~ &gt;|&lt; ~ 1
              </p>
              <p className="mt-1 text-xs" style={{ color: "oklch(0.40 0.006 285)", fontFamily: "'JetBrains Mono', monospace" }}>
                From one another. In one another. By one another. For one another.
              </p>
              <button
                onClick={() => setLocation("/")}
                className="mt-5 px-6 py-2.5 rounded text-sm font-semibold transition-all"
                style={{
                  background: "oklch(0.72 0.18 72 / 0.15)",
                  border: "1px solid oklch(0.72 0.18 72 / 0.4)",
                  color: "oklch(0.72 0.18 72)",
                }}
              >
                Return to the Forge
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Footer */}
        <div className="mt-10 pt-6 text-center" style={{ borderTop: "1px solid oklch(1 0 0 / 0.06)" }}>
          <p className="text-xs" style={{ color: "oklch(0.32 0.005 285)", fontFamily: "'JetBrains Mono', monospace" }}>
            PROMETHEAN FORGE SYNERGIES · SOVEREIGN JUMP v1.0 · 1 ~ &gt;|&lt; ~ 1
          </p>
        </div>
      </div>
    </div>
  );
}
