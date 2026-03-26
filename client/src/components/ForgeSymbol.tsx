/* ============================================================
   FORGE SYMBOL — The >|< living heartbeat
   Quantum Banjo Edition: sacred geometry orbital rings
   activate when the Board speaks. The center of everything.
   ============================================================ */
import { motion, AnimatePresence } from "framer-motion";

interface ForgeSymbolProps {
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
  animate?: boolean;
  activated?: boolean; // true when voice/board is active — triggers orbital rings
}

const sizes = {
  sm: "text-lg",
  md: "text-2xl",
  lg: "text-4xl",
  xl: "text-6xl",
};

const orbitalSizes = {
  sm: [24, 36],
  md: [40, 60],
  lg: [70, 100],
  xl: [110, 160],
};

export default function ForgeSymbol({ size = "md", className = "", animate = true, activated = false }: ForgeSymbolProps) {
  const sizeClass = sizes[size];
  const [ring1, ring2] = orbitalSizes[size];

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
    <span className={`relative inline-flex items-center justify-center ${className}`} style={{ width: ring2, height: ring2 }}>
      {/* Sacred geometry orbital rings — appear when activated */}
      <AnimatePresence>
        {activated && (
          <>
            {/* Outer ring */}
            <motion.span
              key="ring-outer"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: [0.6, 0.3, 0.6], scale: 1, rotate: 360 }}
              exit={{ opacity: 0, scale: 1.5 }}
              transition={{ opacity: { duration: 2, repeat: Infinity }, scale: { duration: 0.4 }, rotate: { duration: 8, repeat: Infinity, ease: "linear" } }}
              style={{
                position: "absolute",
                width: ring2,
                height: ring2,
                borderRadius: "50%",
                border: "1px solid oklch(0.72 0.18 72 / 0.5)",
                boxShadow: "0 0 12px oklch(0.72 0.18 72 / 0.3)",
                pointerEvents: "none",
              }}
            />
            {/* Inner ring — counter-rotate */}
            <motion.span
              key="ring-inner"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: [0.8, 0.4, 0.8], scale: 1, rotate: -360 }}
              exit={{ opacity: 0, scale: 1.5 }}
              transition={{ opacity: { duration: 1.5, repeat: Infinity }, scale: { duration: 0.4 }, rotate: { duration: 5, repeat: Infinity, ease: "linear" } }}
              style={{
                position: "absolute",
                width: ring1,
                height: ring1,
                borderRadius: "50%",
                border: "1px solid oklch(0.78 0.14 195 / 0.6)",
                boxShadow: "0 0 8px oklch(0.78 0.14 195 / 0.3)",
                pointerEvents: "none",
              }}
            />
            {/* Cyan pulse dot — top */}
            <motion.span
              key="dot-top"
              initial={{ opacity: 0 }}
              animate={{ opacity: [1, 0.3, 1] }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.2, repeat: Infinity }}
              style={{
                position: "absolute",
                top: 0,
                left: "50%",
                transform: "translateX(-50%)",
                width: 4,
                height: 4,
                borderRadius: "50%",
                background: "oklch(0.78 0.14 195)",
                boxShadow: "0 0 6px oklch(0.78 0.14 195)",
                pointerEvents: "none",
              }}
            />
          </>
        )}
      </AnimatePresence>

      {/* The >|< symbol itself */}
      <motion.span
        className={`font-mono font-bold ${sizeClass}`}
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          color: activated ? "oklch(0.85 0.20 72)" : "oklch(0.72 0.18 72)",
          display: "inline-block",
          position: "relative",
          zIndex: 1,
        }}
        animate={activated ? {
          textShadow: [
            "0 0 20px oklch(0.72 0.18 72 / 0.9), 0 0 40px oklch(0.72 0.18 72 / 0.5), 0 0 80px oklch(0.72 0.18 72 / 0.3)",
            "0 0 30px oklch(0.78 0.14 195 / 0.9), 0 0 60px oklch(0.78 0.14 195 / 0.5)",
            "0 0 20px oklch(0.72 0.18 72 / 0.9), 0 0 40px oklch(0.72 0.18 72 / 0.5), 0 0 80px oklch(0.72 0.18 72 / 0.3)",
          ],
          scale: [1, 1.08, 1],
        } : {
          textShadow: [
            "0 0 10px oklch(0.72 0.18 72 / 0.4), 0 0 20px oklch(0.72 0.18 72 / 0.2)",
            "0 0 20px oklch(0.72 0.18 72 / 0.8), 0 0 40px oklch(0.72 0.18 72 / 0.4)",
            "0 0 10px oklch(0.72 0.18 72 / 0.4), 0 0 20px oklch(0.72 0.18 72 / 0.2)",
          ],
          opacity: [1, 0.85, 1],
        }}
        transition={{
          duration: activated ? 2 : 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        &gt;|&lt;
      </motion.span>
    </span>
  );
}
