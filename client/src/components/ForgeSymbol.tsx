/* ============================================================
   FORGE SYMBOL — The >|< living heartbeat
   Pulses, glows, breathes. The core identity of the Forge.
   ============================================================ */
import { motion } from "framer-motion";

interface ForgeSymbolProps {
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
  animate?: boolean;
}

const sizes = {
  sm: "text-lg",
  md: "text-2xl",
  lg: "text-4xl",
  xl: "text-6xl",
};

export default function ForgeSymbol({ size = "md", className = "", animate = true }: ForgeSymbolProps) {
  const sizeClass = sizes[size];

  if (!animate) {
    return (
      <span
        className={`font-mono font-bold text-forge-amber ${sizeClass} ${className}`}
        style={{ fontFamily: "'JetBrains Mono', monospace" }}
      >
        &gt;|&lt;
      </span>
    );
  }

  return (
    <motion.span
      className={`font-mono font-bold ${sizeClass} ${className}`}
      style={{
        fontFamily: "'JetBrains Mono', monospace",
        color: "oklch(0.72 0.18 72)",
        display: "inline-block",
      }}
      animate={{
        textShadow: [
          "0 0 10px oklch(0.72 0.18 72 / 0.4), 0 0 20px oklch(0.72 0.18 72 / 0.2)",
          "0 0 20px oklch(0.72 0.18 72 / 0.8), 0 0 40px oklch(0.72 0.18 72 / 0.4), 0 0 80px oklch(0.72 0.18 72 / 0.2)",
          "0 0 10px oklch(0.72 0.18 72 / 0.4), 0 0 20px oklch(0.72 0.18 72 / 0.2)",
        ],
        opacity: [1, 0.85, 1],
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      &gt;|&lt;
    </motion.span>
  );
}
