import React, { useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export const Magnetic: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 150, damping: 18, mass: 0.12 });
  const springY = useSpring(y, { stiffness: 150, damping: 18, mass: 0.12 });

  const handleMouse = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;

    const { height, width, left, top } = el.getBoundingClientRect();
    const middleX = e.clientX - (left + width / 2);
    const middleY = e.clientY - (top + height / 2);

    x.set(middleX * 0.1);
    y.set(middleY * 0.1);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      style={{ x: springX, y: springY }}
      className={className || "inline-block"}
    >
      {children}
    </motion.div>
  );
};
