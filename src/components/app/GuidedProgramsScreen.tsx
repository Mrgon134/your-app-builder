import React, { useState, useEffect } from "react";
import { ArrowLeft, CheckCircle2, ChevronRight, Lock, Heart, Wind, Compass, Sun, Zap } from "lucide-react";
import { GUIDED_PROGRAMS, getProgramById } from "@/lib/programs";
import { useAuth } from "@/lib/auth";
import { hasPlusAccess } from "@/lib/trial";
import { toast } from "sonner";
import { useLang } from "@/lib/i18n";
import { fetchUserPrograms, upsertUserProgram, UserProgramRow } from "@/lib/api";

const PROGRAM_ICONS: Record<string, React.FC<{ size?: number; color?: string }>> = {
  "gratitude-7": ({ size = 22, color }) => <Heart size={size} color={color} />,
  "stress-relief-5": ({ size = 22, color }) => <Wind size={size} color={color} />,
  "self-discovery-14": ({ size = 22, color }) => <Compass size={size} color={color} />,
  "morning-clarity-7": ({ size = 22, color }) => <Sun size={size} color={color} />,
  "resilience-10": ({ size = 22, color }) => <Zap size={size} color={color} />,
};

const ProgramIcon: React.FC<{ id: string; color: string; size?: number }> = ({ id, color, size = 22 }) => {
  const Icon = PROGRAM_ICONS[id];
  if (!Icon) return null;
  return <Icon size={size} color={color} />;
};

const STORAGE_KEY = "nuju-user-programs";

interface UserProgram {
  program_id: string;
  current_day: number;
  completed: boolean;
  started_at: string;
}

interface GuidedProgramsScreenProps {
  onBack: () => void;
  onWritePrompt: (prompt: string) => void;
  plan?: string | null;
  trialStartedAt?: string | null;
  onUpgrade?: () => void;
}

const loadPrograms = (): UserProgram[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

const savePrograms = (programs: UserProgram[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(programs));
};

const GuidedProgramsScreen: React.FC<GuidedProgramsScreenProps> = ({
  onBack,
  onWritePrompt,
  plan,
  trialStartedAt,
  onUpgrade,
}) => {
  const { user } = useAuth();
  const { t } = useLang();
  const [userPrograms, setUserPrograms] = useState<UserProgram[]>([]);
  const [activeProgram, setActiveProgram] = useState<string | null>(null);

  const isPro = hasPlusAccess(plan, trialStartedAt);

  useEffect(() => {
    if (user) {
      fetchUserPrograms(user.id).then((data) => {
        if (data.length > 0) {
          setUserPrograms(data);
          savePrograms(data);
        } else {
          setUserPrograms(loadPrograms());
        }
      });
    } else {
      setUserPrograms(loadPrograms());
    }
  }, [user]);

  const joinProgram = (programId: string) => {
    const exists = userPrograms.find((p) => p.program_id === programId);
    if (exists) {
      setActiveProgram(programId);
      return;
    }
    const newProgram: UserProgram = {
      program_id: programId,
      current_day: 1,
      completed: false,
      started_at: new Date().toISOString(),
    };
    const updated = [...userPrograms, newProgram];
    setUserPrograms(updated);
    savePrograms(updated);
    if (user) upsertUserProgram(user.id, newProgram);
    setActiveProgram(programId);
    toast.success(t.programs_started || "Program started!");
  };

  const startTodayPrompt = (programId: string) => {
    const up = userPrograms.find((p) => p.program_id === programId);
    const program = getProgramById(programId);
    if (!up || !program) return;

    const promptIdx = Math.min(up.current_day - 1, program.prompts.length - 1);
    const prompt = program.prompts[promptIdx];

    const nextDay = up.current_day + 1;
    const completed = nextDay > program.days;

    const updated = userPrograms.map((p) =>
      p.program_id === programId ? { ...p, current_day: nextDay, completed } : p
    );
    setUserPrograms(updated);
    savePrograms(updated);
    if (user) {
      const updatedProgram = updated.find(p => p.program_id === programId);
      if (updatedProgram) upsertUserProgram(user.id, updatedProgram);
    }

    onWritePrompt(prompt);
    onBack();
    if (completed) toast.success(`${t.programs_complete_desc || "Amazing work finishing"} ${program.title}!`);
  };

  // Show active program detail
  if (activeProgram) {
    const program = getProgramById(activeProgram);
    const up = userPrograms.find((p) => p.program_id === activeProgram);
    if (!program || !up) return null;

    const progressPct = Math.min(((up.current_day - 1) / program.days) * 100, 100);
    const todayPrompt = program.prompts[Math.min(up.current_day - 1, program.prompts.length - 1)];

    return (
      <div className="animate-page-slide-in">
        <button onClick={() => setActiveProgram(null)} className="flex items-center gap-1 text-primary mb-5 press-spring">
          <ArrowLeft className="w-5 h-5" />
          <span className="text-[15px] font-medium">{t.programs_title || "Programs"}</span>
        </button>

        <div className="flex items-center gap-4 mb-6">
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg flex-shrink-0"
            style={{ background: `linear-gradient(135deg, ${program.color}30, ${program.color}18)`, border: `1.5px solid ${program.color}40` }}
          >
            <ProgramIcon id={program.id} color={program.color} size={26} />
          </div>
          <div>
            <h2 className="text-[22px] font-bold text-foreground">{program.title}</h2>
            <p className="text-[13px] text-muted-foreground">{t.programs_day || "Day"} {Math.min(up.current_day, program.days)} / {program.days}</p>
          </div>
        </div>

        {/* Progress */}
        <div className="glass-card rounded-2xl p-5 mb-4">
          <div className="flex justify-between text-[12px] text-muted-foreground mb-2">
            <span>{t.programs_progress || "Progress"}</span>
            <span>{Math.round(progressPct)}%</span>
          </div>
          <div className="w-full h-2 bg-border rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-700"
              style={{ width: `${progressPct}%`, background: program.color }}
            />
          </div>
          <div className="flex gap-1 mt-3 flex-wrap">
            {Array.from({ length: program.days }, (_, i) => (
              <div
                key={i}
                className="w-5 h-5 rounded-full flex items-center justify-center text-[9px]"
                style={{
                  background: i < up.current_day - 1 ? program.color : i === up.current_day - 1 ? `${program.color}40` : "transparent",
                  border: `1.5px solid ${i < up.current_day ? program.color : "#e5e7eb"}`,
                }}
              >
                {i < up.current_day - 1 && "✓"}
              </div>
            ))}
          </div>
        </div>

        {/* Today's prompt */}
        {!up.completed ? (
          <div className="glass-card rounded-2xl p-5 mb-4">
            <p className="text-[11px] font-semibold text-primary uppercase tracking-widest mb-2">{t.programs_todays_prompt || "Today's Prompt"}</p>
            <p className="text-[16px] text-foreground leading-relaxed font-medium mb-5">{todayPrompt}</p>
            <button
              onClick={() => startTodayPrompt(activeProgram)}
              className="w-full h-[52px] rounded-2xl font-semibold text-[15px] text-white press-spring shadow-lg"
              style={{ background: program.color }}
            >
              {t.programs_write_entry || "Write today's entry"} →
            </button>
          </div>
        ) : (
          <div className="text-center py-8">
            <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: `${program.color}18`, border: `2px solid ${program.color}40` }}>
              <CheckCircle2 className="w-9 h-9" style={{ color: program.color }} />
            </div>
            <h3 className="text-[20px] font-bold text-foreground mb-1">{t.programs_complete_title || "Program Complete"}</h3>
            <p className="text-[14px] text-muted-foreground">{t.programs_complete_desc || "Amazing work finishing"} {program.title}.</p>
          </div>
        )}
      </div>
    );
  }

  const activePrograms = userPrograms.filter((p) => !p.completed);
  const completedPrograms = userPrograms.filter((p) => p.completed);

  return (
    <div className="animate-page-slide-in">
      <button onClick={onBack} className="flex items-center gap-1 text-primary mb-5 press-spring">
        <ArrowLeft className="w-5 h-5" />
        <span className="text-[15px] font-medium">{t.programs_back || "Back"}</span>
      </button>

      <h1 className="text-[34px] font-bold text-foreground tracking-tight mb-1">{t.programs_title || "Programs"}</h1>
      <p className="text-[15px] text-muted-foreground mb-6">{t.programs_subtitle || "Guided journaling challenges"}</p>

      {/* Active programs */}
      {activePrograms.length > 0 && (
        <div className="mb-6">
          <p className="text-[13px] font-semibold text-muted-foreground uppercase tracking-wider mb-3">{t.programs_in_progress || "In Progress"}</p>
          <div className="space-y-3">
            {activePrograms.map((up) => {
              const program = getProgramById(up.program_id);
              if (!program) return null;
              const pct = Math.round(((up.current_day - 1) / program.days) * 100);
              return (
                <button
                  key={up.program_id}
                  onClick={() => setActiveProgram(up.program_id)}
                  className="w-full glass-card rounded-2xl p-4 flex items-center gap-4 press-spring text-left"
                >
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: `linear-gradient(135deg, ${program.color}28, ${program.color}14)`, border: `1.5px solid ${program.color}35` }}
                  >
                    <ProgramIcon id={program.id} color={program.color} size={20} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-foreground text-[15px]">{program.title}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="flex-1 h-1.5 bg-border rounded-full overflow-hidden">
                        <div className="h-full rounded-full" style={{ width: `${pct}%`, background: program.color }} />
                      </div>
                      <span className="text-[12px] text-muted-foreground">{t.programs_day || "Day"} {up.current_day}/{program.days}</span>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-muted-foreground/50" />
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* All programs */}
      <p className="text-[13px] font-semibold text-muted-foreground uppercase tracking-wider mb-3">{t.programs_all || "All Programs"}</p>
      <div className="space-y-3">
        {GUIDED_PROGRAMS.map((program, idx) => {
          const up = userPrograms.find((p) => p.program_id === program.id);
          const isLocked = !isPro && idx > 1;

          return (
            <button
              key={program.id}
              onClick={() => {
                if (isLocked) { onUpgrade?.(); return; }
                joinProgram(program.id);
              }}
              className="w-full glass-card rounded-2xl p-4 flex items-center gap-4 press-spring text-left relative overflow-hidden"
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: `linear-gradient(135deg, ${program.color}28, ${program.color}14)`, border: `1.5px solid ${program.color}35` }}
              >
                <ProgramIcon id={program.id} color={program.color} size={22} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="font-semibold text-foreground text-[15px]">{program.title}</p>
                  {up?.completed && <CheckCircle2 className="w-4 h-4 text-green-500" />}
                  {isLocked && <Lock className="w-3.5 h-3.5 text-muted-foreground" />}
                </div>
                <p className="text-[12px] text-muted-foreground mt-0.5 line-clamp-1">{program.description}</p>
                <p className="text-[11px] font-medium mt-1" style={{ color: program.color }}>{program.days} days · {program.category}</p>
              </div>
              {!isLocked && <ChevronRight className="w-4 h-4 text-muted-foreground/50 flex-shrink-0" />}
            </button>
          );
        })}
      </div>

      {!isPro && (
        <div className="mt-4 p-4 rounded-2xl border border-primary/20 bg-primary/5 text-center">
          <p className="text-[13px] text-muted-foreground mb-2">3 {t.programs_unlock || "more programs unlocked with Plus"}</p>
          <button onClick={onUpgrade} className="text-[13px] font-semibold text-primary press-spring">{t.programs_upgrade || "Upgrade"} →</button>
        </div>
      )}

      <div className="h-6" />
    </div>
  );
};

export default GuidedProgramsScreen;
