import React, { useState, useEffect } from "react";
import { Plus, Check, Dumbbell, Wind, BookOpen, Droplets, Moon, Ban } from "lucide-react";
import { toast } from "sonner";

interface Habit {
  id: string;
  name: string;
  iconKey: string;
  color: string;
}

interface HabitSectionProps {
  onUpgrade?: () => void;
  plan?: string | null;
}

const HABIT_ICONS: Record<string, React.FC<{ size?: number; color?: string; strokeWidth?: number }>> = {
  dumbbell: ({ size = 14, color, strokeWidth = 1.8 }) => <Dumbbell size={size} color={color} strokeWidth={strokeWidth} />,
  wind: ({ size = 14, color, strokeWidth = 1.8 }) => <Wind size={size} color={color} strokeWidth={strokeWidth} />,
  book: ({ size = 14, color, strokeWidth = 1.8 }) => <BookOpen size={size} color={color} strokeWidth={strokeWidth} />,
  droplets: ({ size = 14, color, strokeWidth = 1.8 }) => <Droplets size={size} color={color} strokeWidth={strokeWidth} />,
  moon: ({ size = 14, color, strokeWidth = 1.8 }) => <Moon size={size} color={color} strokeWidth={strokeWidth} />,
  ban: ({ size = 14, color, strokeWidth = 1.8 }) => <Ban size={size} color={color} strokeWidth={strokeWidth} />,
};

const PRESET_HABITS: { name: string; iconKey: string; color: string }[] = [
  { name: "Exercise", iconKey: "dumbbell", color: "#4ECDC4" },
  { name: "Meditate", iconKey: "wind", color: "#7C6EDB" },
  { name: "Read", iconKey: "book", color: "#FFB347" },
  { name: "Drink water", iconKey: "droplets", color: "#6C9BCF" },
  { name: "Sleep 8h", iconKey: "moon", color: "#B8C4F0" },
  { name: "No sugar", iconKey: "ban", color: "#E8878C" },
];

const STORAGE_KEY = "nuju-habits";
const LOGS_KEY = "nuju-habit-logs";

const today = new Date().toISOString().split("T")[0];

const loadHabits = (): Habit[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

const saveHabitsToStorage = (habits: Habit[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(habits));
};

const loadLogs = (): Record<string, string[]> => {
  try {
    const raw = localStorage.getItem(LOGS_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
};

const saveLogsToStorage = (logs: Record<string, string[]>) => {
  localStorage.setItem(LOGS_KEY, JSON.stringify(logs));
};

const HabitIcon: React.FC<{ iconKey: string; color: string; active: boolean }> = ({ iconKey, color, active }) => {
  const Icon = HABIT_ICONS[iconKey] || HABIT_ICONS["dumbbell"];
  return <Icon size={14} color={active ? "#fff" : color} strokeWidth={active ? 2.2 : 1.8} />;
};

const HabitSection: React.FC<HabitSectionProps> = ({ onUpgrade, plan }) => {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [completedToday, setCompletedToday] = useState<Set<string>>(new Set());
  const [showAdd, setShowAdd] = useState(false);
  const [newName, setNewName] = useState("");

  useEffect(() => {
    const storedHabits = loadHabits();
    const logs = loadLogs();
    const todayLogs = logs[today] || [];
    setHabits(storedHabits);
    setCompletedToday(new Set(todayLogs));
  }, []);

  const toggleHabit = (habitId: string) => {
    const done = completedToday.has(habitId);
    const logs = loadLogs();
    const todayLogs = new Set(logs[today] || []);

    if (done) {
      todayLogs.delete(habitId);
    } else {
      todayLogs.add(habitId);
      if (navigator.vibrate) navigator.vibrate([10, 30, 10]);
    }

    logs[today] = Array.from(todayLogs);
    saveLogsToStorage(logs);
    setCompletedToday(new Set(todayLogs));
  };

  const addPreset = (preset: typeof PRESET_HABITS[0]) => {
    if (habits.length >= 6 && plan === "free") {
      toast.error("Upgrade to add more habits");
      onUpgrade?.();
      return;
    }
    const newHabit: Habit = {
      id: `habit-${Date.now()}`,
      name: preset.name,
      iconKey: preset.iconKey,
      color: preset.color,
    };
    const updated = [...habits, newHabit];
    setHabits(updated);
    saveHabitsToStorage(updated);
    setShowAdd(false);
  };

  const addCustom = () => {
    if (!newName.trim()) return;
    const newHabit: Habit = {
      id: `habit-${Date.now()}`,
      name: newName.trim(),
      iconKey: "dumbbell",
      color: "#7C6EDB",
    };
    const updated = [...habits, newHabit];
    setHabits(updated);
    saveHabitsToStorage(updated);
    setNewName("");
    setShowAdd(false);
  };

  const removeHabit = (habitId: string) => {
    const updated = habits.filter((h) => h.id !== habitId);
    setHabits(updated);
    saveHabitsToStorage(updated);
  };

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
                onContextMenu={(e) => { e.preventDefault(); removeHabit(habit.id); }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[13px] font-medium transition-all duration-200 press-spring ${
                  done
                    ? "text-white shadow-sm"
                    : "bg-foreground/[0.05] text-foreground"
                }`}
                style={done ? { background: habit.color } : {}}
              >
                <HabitIcon iconKey={habit.iconKey} color={habit.color} active={done} />
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
            {PRESET_HABITS.filter((p) => !habits.find((h) => h.name === p.name)).map((preset) => {
              const Icon = HABIT_ICONS[preset.iconKey];
              return (
                <button
                  key={preset.name}
                  onClick={() => addPreset(preset)}
                  className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-foreground/[0.05] text-[12px] text-foreground press-spring"
                >
                  <Icon size={12} color={preset.color} strokeWidth={1.8} />
                  {preset.name}
                </button>
              );
            })}
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
