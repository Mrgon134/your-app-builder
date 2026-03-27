import React, { useState, useEffect } from "react";
import { Plus, Check, X } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth";
import { toast } from "sonner";

interface Habit {
  id: string;
  name: string;
  emoji: string;
  color: string;
}

interface HabitSectionProps {
  onUpgrade?: () => void;
  plan?: string | null;
}

const PRESET_HABITS = [
  { name: "Exercise", emoji: "🏃", color: "#4ECDC4" },
  { name: "Meditate", emoji: "🧘", color: "#7C6EDB" },
  { name: "Read", emoji: "📚", color: "#FFB347" },
  { name: "Drink water", emoji: "💧", color: "#6C9BCF" },
  { name: "Sleep 8h", emoji: "😴", color: "#B8C4F0" },
  { name: "No sugar", emoji: "🚫🍬", color: "#E8878C" },
];

const today = new Date().toISOString().split("T")[0];

const HabitSection: React.FC<HabitSectionProps> = ({ onUpgrade, plan }) => {
  const { user } = useAuth();
  const [habits, setHabits] = useState<Habit[]>([]);
  const [completedToday, setCompletedToday] = useState<Set<string>>(new Set());
  const [showAdd, setShowAdd] = useState(false);
  const [newName, setNewName] = useState("");
  const [newEmoji, setNewEmoji] = useState("✨");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    const load = async () => {
      const [{ data: habitsData }, { data: logsData }] = await Promise.all([
        supabase.from("habits").select("id, name, emoji, color").eq("user_id", user.id).eq("is_active", true).order("sort_order"),
        supabase.from("habit_logs").select("habit_id").eq("user_id", user.id).eq("date", today),
      ]);
      setHabits(habitsData || []);
      setCompletedToday(new Set((logsData || []).map((l: any) => l.habit_id)));
      setLoading(false);
    };
    load();
  }, [user]);

  const toggleHabit = async (habitId: string) => {
    if (!user) return;
    const done = completedToday.has(habitId);
    if (done) {
      await supabase.from("habit_logs").delete().eq("habit_id", habitId).eq("date", today);
      setCompletedToday((prev) => { const s = new Set(prev); s.delete(habitId); return s; });
    } else {
      await supabase.from("habit_logs").insert({ user_id: user.id, habit_id: habitId, date: today });
      setCompletedToday((prev) => new Set([...prev, habitId]));
      if (navigator.vibrate) navigator.vibrate([10, 30, 10]);
    }
  };

  const addPreset = async (preset: typeof PRESET_HABITS[0]) => {
    if (!user) return;
    if (habits.length >= 6 && plan === "free") {
      toast.error("Upgrade to add more habits");
      onUpgrade?.();
      return;
    }
    const { data } = await supabase.from("habits").insert({ user_id: user.id, name: preset.name, emoji: preset.emoji, color: preset.color }).select("id, name, emoji, color").single();
    if (data) setHabits((prev) => [...prev, data]);
    setShowAdd(false);
  };

  const addCustom = async () => {
    if (!user || !newName.trim()) return;
    const { data } = await supabase.from("habits").insert({ user_id: user.id, name: newName.trim(), emoji: newEmoji, color: "#7C6EDB" }).select("id, name, emoji, color").single();
    if (data) setHabits((prev) => [...prev, data]);
    setNewName("");
    setShowAdd(false);
  };

  const removeHabit = async (habitId: string) => {
    if (!user) return;
    await supabase.from("habits").update({ is_active: false }).eq("id", habitId);
    setHabits((prev) => prev.filter((h) => h.id !== habitId));
  };

  if (loading) return null;

  const doneCount = completedToday.size;
  const total = habits.length;

  return (
    <div className="glass-card rounded-2xl p-5">
      <div className="flex items-center justify-between mb-3">
        <div>
          <p className="text-[11px] font-semibold text-primary uppercase tracking-[0.12em]">Today's Habits</p>
          {total > 0 && (
            <p className="text-[12px] text-muted-foreground mt-0.5">{doneCount}/{total} done</p>
          )}
        </div>
        <button
          onClick={() => setShowAdd(!showAdd)}
          className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center press-spring"
        >
          <Plus className="w-3.5 h-3.5 text-primary" />
        </button>
      </div>

      {/* Progress bar */}
      {total > 0 && (
        <div className="w-full h-1.5 bg-border rounded-full mb-4 overflow-hidden">
          <div
            className="h-full rounded-full bg-primary transition-all duration-500"
            style={{ width: `${total > 0 ? (doneCount / total) * 100 : 0}%` }}
          />
        </div>
      )}

      {/* Habit chips */}
      {habits.length > 0 ? (
        <div className="flex flex-wrap gap-2">
          {habits.map((habit) => {
            const done = completedToday.has(habit.id);
            return (
              <button
                key={habit.id}
                onClick={() => toggleHabit(habit.id)}
                onLongPress={() => removeHabit(habit.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[13px] font-medium transition-all duration-200 press-spring ${
                  done
                    ? "text-white shadow-sm"
                    : "bg-foreground/[0.05] text-foreground"
                }`}
                style={done ? { background: habit.color } : {}}
              >
                <span>{habit.emoji}</span>
                <span>{habit.name}</span>
                {done && <Check className="w-3 h-3" />}
              </button>
            );
          })}
        </div>
      ) : (
        <p className="text-[13px] text-muted-foreground text-center py-2">Tap + to add habits to track daily</p>
      )}

      {/* Add habit panel */}
      {showAdd && (
        <div className="mt-4 pt-4 border-t border-border/30">
          <p className="text-[12px] font-medium text-muted-foreground mb-2">Quick add:</p>
          <div className="flex flex-wrap gap-1.5 mb-3">
            {PRESET_HABITS.filter((p) => !habits.find((h) => h.name === p.name)).map((preset) => (
              <button
                key={preset.name}
                onClick={() => addPreset(preset)}
                className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-foreground/[0.05] text-[12px] text-foreground press-spring"
              >
                {preset.emoji} {preset.name}
              </button>
            ))}
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              placeholder="Custom habit..."
              className="flex-1 px-3 py-2 rounded-xl bg-background border border-border text-[14px] focus:outline-none focus:ring-2 focus:ring-primary/20"
              onKeyDown={(e) => e.key === "Enter" && addCustom()}
            />
            <input
              type="text"
              value={newEmoji}
              onChange={(e) => setNewEmoji(e.target.value)}
              className="w-12 px-2 py-2 rounded-xl bg-background border border-border text-[14px] text-center focus:outline-none"
              maxLength={2}
            />
            <button onClick={addCustom} className="px-3 py-2 rounded-xl bg-primary text-white text-[13px] font-medium press-spring">
              Add
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default HabitSection;
