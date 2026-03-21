import React, { useEffect, useRef } from "react";

const COLORS = ["#7C6EDB", "#4ECDC4", "#FFB347", "#E8878C", "#95E1D3", "#B8C4F0", "#A8E6CF"];
const PARTICLE_COUNT = 60;

interface ConfettiProps {
  active: boolean;
  onComplete?: () => void;
}

const Confetti: React.FC<ConfettiProps> = ({ active, onComplete }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!active) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = Array.from({ length: PARTICLE_COUNT }, () => ({
      x: Math.random() * canvas.width,
      y: -10 - Math.random() * 100,
      w: 4 + Math.random() * 4,
      h: 6 + Math.random() * 8,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      vx: (Math.random() - 0.5) * 4,
      vy: 2 + Math.random() * 4,
      spin: (Math.random() - 0.5) * 0.2,
      angle: Math.random() * Math.PI * 2,
      gravity: 0.08 + Math.random() * 0.04,
    }));

    let frame: number;
    let elapsed = 0;
    const duration = 1500;
    const start = performance.now();

    const animate = (now: number) => {
      elapsed = now - start;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const fade = elapsed > 1000 ? Math.max(0, 1 - (elapsed - 1000) / 500) : 1;
      ctx.globalAlpha = fade;

      for (const p of particles) {
        p.vy += p.gravity;
        p.x += p.vx;
        p.y += p.vy;
        p.angle += p.spin;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.angle);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
        ctx.restore();
      }

      if (elapsed < duration) {
        frame = requestAnimationFrame(animate);
      } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        onComplete?.();
      }
    };

    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [active, onComplete]);

  if (!active) return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 9999 }}
    />
  );
};

export default Confetti;
