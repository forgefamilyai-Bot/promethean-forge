/* ============================================================
   STARFIELD — Animated cosmic background canvas
   Dark Forge Cosmos design: twinkling stars, slow drift
   ============================================================ */
import { useEffect, useRef } from "react";

interface Star {
  x: number;
  y: number;
  size: number;
  opacity: number;
  opacityTarget: number;
  opacitySpeed: number;
  vx: number;
  vy: number;
  color: string;
}

const STAR_COLORS = [
  "255,220,150",   // warm amber
  "150,220,255",   // cool cyan
  "255,255,255",   // white
  "200,180,255",   // soft violet
];

export default function StarField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const starsRef = useRef<Star[]>([]);
  const animRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initStars();
    };

    const initStars = () => {
      const count = Math.floor((canvas.width * canvas.height) / 4000);
      starsRef.current = Array.from({ length: count }, () => {
        const opacity = Math.random() * 0.6 + 0.1;
        return {
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 1.5 + 0.3,
          opacity,
          opacityTarget: Math.random() * 0.8 + 0.1,
          opacitySpeed: Math.random() * 0.005 + 0.001,
          vx: (Math.random() - 0.5) * 0.08,
          vy: (Math.random() - 0.5) * 0.08,
          color: STAR_COLORS[Math.floor(Math.random() * STAR_COLORS.length)],
        };
      });
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (const star of starsRef.current) {
        // Twinkle
        if (star.opacity < star.opacityTarget) {
          star.opacity = Math.min(star.opacity + star.opacitySpeed, star.opacityTarget);
        } else {
          star.opacity = Math.max(star.opacity - star.opacitySpeed, 0.05);
          if (star.opacity <= 0.05) {
            star.opacityTarget = Math.random() * 0.8 + 0.1;
          }
        }

        // Drift
        star.x += star.vx;
        star.y += star.vy;
        if (star.x < 0) star.x = canvas.width;
        if (star.x > canvas.width) star.x = 0;
        if (star.y < 0) star.y = canvas.height;
        if (star.y > canvas.height) star.y = 0;

        // Draw
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${star.color},${star.opacity})`;
        ctx.fill();

        // Glow for larger stars
        if (star.size > 1.2) {
          ctx.beginPath();
          ctx.arc(star.x, star.y, star.size * 2.5, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${star.color},${star.opacity * 0.15})`;
          ctx.fill();
        }
      }

      animRef.current = requestAnimationFrame(draw);
    };

    resize();
    draw();
    window.addEventListener("resize", resize);

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
}
