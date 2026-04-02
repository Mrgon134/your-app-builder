import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, Check, PenLine } from "lucide-react";
import { PROMPT_PACKS, getPackProgress, markPromptDone, type PromptPack } from "@/lib/prompt-packs";

interface PromptPacksScreenProps {
  onWritePrompt?: (prompt: string) => void;
}

const PromptPacksScreen: React.FC<PromptPacksScreenProps> = ({ onWritePrompt }) => {
  const [selectedPack, setSelectedPack] = useState<PromptPack | null>(null);
  const [completedMap, setCompletedMap] = useState<Record<string, number[]>>(() => {
    const map: Record<string, number[]> = {};
    PROMPT_PACKS.forEach((p) => { map[p.id] = getPackProgress(p.id); });
    return map;
  });

  const handleComplete = (packId: string, index: number, prompt: string) => {
    markPromptDone(packId, index);
    setCompletedMap((prev) => ({
      ...prev,
      [packId]: [...(prev[packId] || []), index],
    }));
    if (onWritePrompt) {
      onWritePrompt(prompt);
    }
  };

  if (selectedPack) {
    const completed = completedMap[selectedPack.id] || [];
    return (
      <div className="space-y-3">
        <button
          onClick={() => setSelectedPack(null)}
          className="text-[13px] text-muted-foreground font-medium press-spring mb-2"
        >
          ← All packs
        </button>

        <div className="rounded-2xl p-4" style={{ background: `${selectedPack.color}10`, border: `1px solid ${selectedPack.color}20` }}>
          <div className="flex items-center gap-3 mb-1">
            <span className="text-2xl">{selectedPack.icon}</span>
            <div>
              <p className="text-[16px] font-bold text-foreground">{selectedPack.title}</p>
              <p className="text-[12px] text-muted-foreground">{completed.length}/{selectedPack.prompts.length} completed</p>
            </div>
          </div>
          {/* Progress bar */}
          <div className="mt-3 h-1.5 rounded-full bg-foreground/5 overflow-hidden">
            <motion.div
              className="h-full rounded-full"
              style={{ background: selectedPack.color }}
              initial={{ width: 0 }}
              animate={{ width: `${(completed.length / selectedPack.prompts.length) * 100}%` }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            />
          </div>
        </div>

        <div className="space-y-2">
          {selectedPack.prompts.map((prompt, i) => {
            const isDone = completed.includes(i);
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04 }}
                className="rounded-xl p-4 flex items-start gap-3"
                style={{
                  background: isDone ? `${selectedPack.color}08` : "hsl(var(--foreground)/0.02)",
                  border: `1px solid ${isDone ? `${selectedPack.color}15` : "hsl(var(--border)/0.3)"}`,
                }}
              >
                {isDone ? (
                  <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5" style={{ background: `${selectedPack.color}20` }}>
                    <Check className="w-3.5 h-3.5" style={{ color: selectedPack.color }} />
                  </div>
                ) : (
                  <span className="w-6 h-6 flex items-center justify-center text-[12px] font-bold text-muted-foreground/40 flex-shrink-0 mt-0.5">
                    {i + 1}
                  </span>
                )}
                <div className="flex-1 min-w-0">
                  <p className={`text-[13px] leading-relaxed ${isDone ? "text-muted-foreground" : "text-foreground"}`}>
                    {prompt}
                  </p>
                </div>
                {!isDone && (
                  <button
                    onClick={() => handleComplete(selectedPack.id, i, prompt)}
                    className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center press-spring"
                    style={{ background: `${selectedPack.color}12` }}
                  >
                    <PenLine className="w-3.5 h-3.5" style={{ color: selectedPack.color }} />
                  </button>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    );
  }

  // Pack list
  return (
    <div className="space-y-3">
      {PROMPT_PACKS.map((pack, i) => {
        const completed = completedMap[pack.id] || [];
        const progress = completed.length / pack.prompts.length;
        return (
          <motion.button
            key={pack.id}
            onClick={() => setSelectedPack(pack)}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            whileTap={{ scale: 0.97 }}
            className="w-full rounded-2xl p-4 flex items-center gap-4 text-left press-spring"
            style={{
              background: `${pack.color}08`,
              border: `1px solid ${pack.color}15`,
            }}
          >
            <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl" style={{ background: `${pack.color}12` }}>
              {pack.icon}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[14px] font-semibold text-foreground">{pack.title}</p>
              <p className="text-[12px] text-muted-foreground">{pack.description}</p>
              <div className="mt-2 h-1 rounded-full bg-foreground/5 overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{ background: pack.color, width: `${progress * 100}%` }}
                />
              </div>
              <p className="text-[10px] text-muted-foreground mt-1">{completed.length}/{pack.prompts.length} prompts</p>
            </div>
            <ChevronRight className="w-4 h-4 text-muted-foreground/40 flex-shrink-0" />
          </motion.button>
        );
      })}
    </div>
  );
};

export default PromptPacksScreen;
