"use client";

import React from "react";
import { Plus } from "lucide-react";
import { motion } from "framer-motion";

interface MomentCaptureButtonProps {
  onClick: () => void;
  hasProAccess: boolean;
}

const MomentCaptureButton: React.FC<MomentCaptureButtonProps> = ({
  onClick,
  hasProAccess,
}) => {
  return (
    <motion.button
      onClick={onClick}
      className={`fixed bottom-28 right-6 z-30 w-14 h-14 rounded-full text-white shadow-[0_8px_24px_-6px_hsl(var(--primary)/0.4)] flex items-center justify-center ${
        hasProAccess
          ? "bg-gradient-to-br from-primary to-primary/80"
          : "bg-gradient-to-br from-primary/60 to-primary/40"
      }`}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{
        type: "spring",
        stiffness: 400,
        damping: 25,
        delay: 0.3,
      }}
    >
      <Plus className="w-6 h-6" />
    </motion.button>
  );
};

export default MomentCaptureButton;
