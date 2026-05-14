import React, { useEffect, useMemo, useState } from "react";
import { hasPlusAccess, hasProAccess } from "@/lib/trial";
import { useLang } from "@/lib/i18n";
import { MOODS } from "@/lib/constants";
import MoodIcon from "@/components/MoodIcon";
import { Lock, Loader2, CalendarDays, Flame, Target, ArrowRight, Sparkles } from "lucide-react";
import HistoryLock from "@/components/app/HistoryLock";
import MoodTrendChart from "@/components/app/MoodTrendChart";
import AiMemoryCard from "@/components/app/AiMemoryCard";
import ShareMenu from "@/components/app/ShareMenu";
import SmartNotificationsPanel from "@/components/insights/SmartNotificationsPanel";
import { JU_STICKERS } from "@/lib/stickers";
import { SUPABASE_URL } from "@/integrations/supabase/client";
import { getJsonFunctionHeaders } from "@/lib/function-auth";
import { EntryRow } from "@/lib/api";
import MoodCalendar from "@/components/app/MoodCalendar";
import { getMoodHighlight } from "@/lib/mood-highlights";
import { type ShellMode } from "@/hooks/use-shell-mode";

interface InsightsScreenProps {
  shellMode?: ShellMode;
  entries: EntryRow[];
  streak?: number;
  onUpgrade: () => void;
  onNavigate?: (screen: string) => void;
  plan?: string | null;
  trialStartedAt?: string | null;
  displayName?: string | null;
}

const FREE_HISTORY_DAYS = 7;

const InsightsScreen: React.FC<InsightsScreenProps> = ({
  shellMode = "phone",
  entries,
  streak = 0,
  onUpgrade,
  onNavigate,
  plan = "free",
  trialStartedAt = null,
  displayName = null,
}) => {
  const { t, lang } = useLang();
  const [aiSummary, setAiSummary] = useState<string | null>(null);
  const [summaryLoading, setSummaryLoading] = useState(false);
  const hasPremiumInsights = hasPlusAccess(plan ?? null, trialStartedAt ?? null);
  const hasPremiumCoach = hasProAccess(plan ?? null, trialStartedAt ?? null);

  const visibleEntries = useMemo(() => {
    if (hasPremiumInsights) return entries;

    const cutoff = new Date();
    cutoff.setHours(0, 0, 0, 0);
    cutoff.setDate(cutoff.getDate() - (FREE_HISTORY_DAYS - 1));

    return entries.filter((entry) => {
      const entryDate = new Date(entry.entry_date);
      return entryDate >= cutoff;
    });
  }, [entries, hasPremiumInsights]);

  const hiddenEntryCount = Math.max(0, entries.length - visibleEntries.length);

  useEffect(() => {
    let cancelled = false;

    if (!hasPremiumInsights || visibleEntries.length < 2) {
      setAiSummary(null);
      setSummaryLoading(false);
      return () => {
        cancelled = true;
      };
    }

    const fetchSummary = async () => {
      setSummaryLoading(true);
      try {
        const resp = await fetch(`${SUPABASE_URL}/functions/v1/ai-weekly-summary`, {
          method: "POST",
          headers: await getJsonFunctionHeaders(),
          body: JSON.stringify({ entries: visibleEntries.slice(0, 7), lang }),
        });

        if (!cancelled && resp.ok) {
          const data = await resp.json();
          if (data.summary) setAiSummary(data.summary);
        }
      } catch (error) {
        if (!cancelled) {
          console.error("Weekly summary failed:", error);
        }
      } finally {
        if (!cancelled) {
          setSummaryLoading(false);
        }
      }
    };

    fetchSummary();

    return () => {
      cancelled = true;
    };
  }, [hasPremiumInsights, lang, visibleEntries]);

  const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const weekMoods = visibleEntries.slice(0, 7).map((entry) => entry.mood);

  const avgMood =
    weekMoods.length > 0
      ? (weekMoods.reduce((sum, mood) => sum + mood, 0) / weekMoods.length).toFixed(1)
      : "0";

  const getMoodTrend = (): { direction: "up" | "down" | "stable" | "seed" | "first" } => {
    if (visibleEntries.length < 3) return { direction: "seed" };

    const recent = visibleEntries.slice(0, Math.min(7, visibleEntries.length)).map((entry) => entry.mood);
    const older = visibleEntries
      .slice(Math.min(7, visibleEntries.length), Math.min(14, visibleEntries.length))
      .map((entry) => entry.mood);
    const recentAvg = recent.reduce((sum, mood) => sum + mood, 0) / recent.length;

    if (older.length === 0) return { direction: "first" };

    const olderAvg = older.reduce((sum, mood) => sum + mood, 0) / older.length;
    const diff = recentAvg - olderAvg;

    if (diff >= 0.5) return { direction: "up" };
    if (diff <= -0.5) return { direction: "down" };
    return { direction: "stable" };
  };

  const moodTrend = getMoodTrend();
  const moodTrendMessages: Record<string, string> = {
    seed: t.mood_trend_seed || "Keep checking in. Ju needs a few honest moments before patterns can show.",
    first: t.mood_trend_first || "You have been showing up enough for the first thread to appear.",
    up: t.mood_trend_up || "Something has been helping this week. Ju can help you name what changed.",
    down: t.mood_trend_down || "Things have been heavier lately. You do not have to turn that into insight alone.",
    stable: t.mood_trend_stable || "Your mood has been steady. That steadiness is still information.",
  };

  const moodHighlight = getMoodHighlight(visibleEntries, t);
  const highlightMoodData = MOODS.find((mood) => mood.value === moodHighlight.mood) || MOODS[2];
  const isLargeShell = shellMode !== "phone";

  const getBestDayOfWeek = () => {
    if (visibleEntries.length < 5) return null;

    const dayScores: Record<number, number[]> = {};
    visibleEntries.forEach((entry) => {
      const day = new Date(entry.entry_date).getDay();
      if (!dayScores[day]) dayScores[day] = [];
      dayScores[day].push(entry.mood);
    });

    let bestDayIdx = -1;
    let maxAvg = 0;

    Object.entries(dayScores).forEach(([dayStr, scores]) => {
      if (scores.length >= 2) {
        const avg = scores.reduce((sum, mood) => sum + mood, 0) / scores.length;
        if (avg > maxAvg) {
          maxAvg = avg;
          bestDayIdx = Number(dayStr);
        }
      }
    });

    if (bestDayIdx === -1 || maxAvg < 4) return null;

    const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    return dayNames[bestDayIdx];
  };

  const bestDayOfWeek = getBestDayOfWeek();

  const getPrediction = () => {
    if (visibleEntries.length < 14) return null;

    const recent = visibleEntries.slice(0, 3).map((entry) => entry.mood).reduce((sum, mood) => sum + mood, 0) / 3;
    const past = visibleEntries.slice(3, 14).map((entry) => entry.mood).reduce((sum, mood) => sum + mood, 0) / 11;

    if (recent < past - 0.4) {
      return "Tomorrow may need a softer landing. Want to prepare a small check-in tonight?";
    }

    if (recent > past + 0.5) {
      return "Your energy has been lifting. Want to name what has been giving you room?";
    }

    return null;
  };

  const prediction = getPrediction();

  const renderPlusInsightsLock = (title: string, description: string) => (
    <div className="relative overflow-hidden rounded-3xl">
      <div
        className="rounded-3xl border border-border/50 bg-card p-5 opacity-30 blur-[3px]"
        aria-hidden
      >
        <div className="mb-4 h-3.5 w-32 rounded-full bg-foreground/10" />
        <div className="mb-4 h-32 rounded-2xl bg-foreground/5" />
        <div className="grid grid-cols-3 gap-3">
          {[1, 2, 3].map((item) => (
            <div key={item} className="rounded-2xl bg-foreground/5 p-4">
              <div className="mx-auto h-5 w-10 rounded-full bg-foreground/10" />
              <div className="mx-auto mt-2 h-2.5 w-14 rounded-full bg-foreground/10" />
            </div>
          ))}
        </div>
      </div>

      <div className="absolute inset-0 flex flex-col items-center justify-center rounded-3xl border border-primary/15 bg-card/88 p-6 text-center backdrop-blur-sm">
        <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10">
          <Lock className="h-5 w-5 text-primary" />
        </div>
        <p className="text-[15px] font-semibold text-foreground">{title}</p>
        <p className="mt-2 max-w-[260px] text-[12px] leading-relaxed text-muted-foreground">
          {description}
        </p>
        <button
          onClick={onUpgrade}
          className="mt-4 inline-flex h-[40px] items-center gap-2 rounded-xl bg-primary px-5 text-[13px] font-semibold text-primary-foreground shadow-[0_2px_12px_-3px_hsl(var(--primary)/0.35)] transition-all active:scale-[0.97]"
        >
          <Sparkles className="h-3.5 w-3.5" />
          {t.unlock_plus || t.unlock_ju || "Open longer patterns"}
        </button>
      </div>
    </div>
  );

  if (entries.length === 0) {
    return (
      <div className="animate-page-slide-in flex flex-col items-center justify-center px-6 py-16 text-center">
        <div className="relative mb-6 h-28 w-28">
          <div className="absolute inset-[-12px] rounded-full bg-primary/8 animate-glow-pulse" />
          <img src={JU_STICKERS.diary} alt="Ju" className="relative h-full w-full animate-ju-float object-contain" />
        </div>
        <h2 className="mb-2 font-serif text-[22px] font-bold text-foreground">
          {t.insights_empty_title || "Your story starts here"}
        </h2>
        <p className="mb-8 max-w-[260px] text-[15px] leading-relaxed text-muted-foreground">
          {t.insights_empty_desc || "Write your first entry and Ju will start discovering patterns in your mood and energy."}
        </p>
        {onNavigate && (
          <button
            onClick={() => onNavigate("home")}
            className="h-[52px] rounded-2xl bg-primary px-8 text-[15px] font-semibold text-primary-foreground shadow-[0_4px_20px_-4px_hsl(var(--primary)/0.4)] press-spring"
          >
            {t.insights_empty_cta || "Write first entry"}
          </button>
        )}
      </div>
    );
  }

  if (visibleEntries.length === 0 && !hasPremiumInsights) {
    return (
      <div className="animate-page-slide-in flex flex-col items-center justify-center px-6 py-16 text-center">
        <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-[20px] bg-primary/10">
          <Lock className="h-6 w-6 text-primary" />
        </div>
        <h2 className="mb-2 font-serif text-[22px] font-bold text-foreground">
          {t.history_locked || "Your older patterns are waiting"}
        </h2>
        <p className="mb-6 max-w-[280px] text-[15px] leading-relaxed text-muted-foreground">
          {t.history_locked_desc || "Free keeps the last 7 days. Plus opens the longer thread so Ju can spot what repeats."}
        </p>
        <button
          onClick={onUpgrade}
          className="inline-flex h-[48px] items-center gap-2 rounded-2xl bg-primary px-6 text-[14px] font-semibold text-primary-foreground transition-all active:scale-[0.97]"
        >
          <Sparkles className="h-4 w-4" />
          {t.unlock_plus || t.unlock_ju || "Open longer patterns"}
        </button>
      </div>
    );
  }

  return (
    <div className={`animate-page-slide-in space-y-5 ${isLargeShell ? "mx-auto max-w-app-content" : ""}`}>
      <div className="mb-2 flex items-center justify-between">
        <h1 className="text-[34px] font-bold tracking-tight text-foreground">{t.mind_gallery}</h1>
        <div className="flex gap-2">
          {visibleEntries.length > 0 && (
            <ShareMenu
              type="daily"
              data={{ mood: visibleEntries[0].mood, date: visibleEntries[0].entry_date, text: visibleEntries[0].text }}
              label={t.share_mood || "Share"}
            />
          )}
        </div>
      </div>

      {!hasPremiumInsights && hiddenEntryCount > 0 && (
        <div className="rounded-2xl border border-primary/15 bg-primary/6 px-4 py-4">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-primary/10">
              <Lock className="h-5 w-5 text-primary" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold text-foreground">
                {t.history_locked || "Your older patterns are waiting"}
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                {t.history_locked_desc || "Free keeps the last 7 days. Plus opens the longer thread so Ju can spot what repeats."}
              </p>
            </div>
            <button
              onClick={onUpgrade}
              className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-3 py-2 text-xs font-semibold text-primary-foreground transition-transform active:scale-[0.98]"
            >
              <Sparkles className="h-3.5 w-3.5" />
              {t.upgrade || "Upgrade"}
            </button>
          </div>
        </div>
      )}

      <div className={isLargeShell ? "grid gap-5 xl:grid-cols-[minmax(0,1.15fr)_minmax(320px,0.85fr)]" : "space-y-5"}>
        <div className="space-y-5">
          {hasPremiumInsights ? (
            <MoodTrendChart entries={visibleEntries} />
          ) : (
            renderPlusInsightsLock(
              t.mood_trend || "30-day mood thread",
              t.plus_feature_3_v2 || "Open the longer view so Ju can notice what keeps repeating."
            )
          )}

          <div className="glass-card rounded-2xl p-5">
            <p className="mb-4 text-[11px] font-semibold uppercase tracking-widest text-primary">
              {t.weekly_mood}
            </p>
            <div className="flex h-28 items-end justify-between gap-2">
              {weekMoods.map((mood, index) => {
                const moodData = MOODS.find((item) => item.value === mood) || MOODS[2];
                const barHeight = Math.max(mood * 16, 10);

                return (
                  <div key={index} className="flex flex-1 flex-col items-center gap-1.5">
                    <div
                      className="w-full rounded-lg transition-all duration-500"
                      style={{
                        height: `${barHeight}px`,
                        background: moodData.color,
                        opacity: 0.85,
                        animationDelay: `${index * 0.08}s`,
                      }}
                    />
                    <span className="text-[10px] font-medium text-muted-foreground">{weekDays[index]}</span>
                  </div>
                );
              })}
            </div>
            <div className="mt-3 flex justify-end">
              <ShareMenu
                type="weekly"
                data={{ moods: weekMoods, avgMood: parseFloat(avgMood), totalEntries: visibleEntries.length }}
                label={t.share_week || "Share week"}
                className="text-xs"
              />
            </div>
          </div>

          {visibleEntries.length >= 3 && (
            <div className="glass-card flex items-start gap-3 rounded-2xl p-5">
              <img
                src={
                  moodTrend.direction === "up"
                    ? JU_STICKERS.yay
                    : moodTrend.direction === "down"
                      ? JU_STICKERS.zen
                      : JU_STICKERS.goodjob
                }
                alt="Ju"
                className="mt-0.5 h-9 w-9 flex-shrink-0"
              />
              <div>
                <p className="mb-1.5 text-[11px] font-semibold uppercase tracking-widest text-primary">Ju noticed</p>
                <p className="text-[14px] leading-relaxed text-foreground">
                  {moodTrendMessages[moodTrend.direction]}
                </p>
              </div>
            </div>
          )}

          <div className="grid grid-cols-3 gap-3">
            <div className="glass-card rounded-2xl p-4 text-center">
              <p className="text-[22px] font-bold tracking-tight text-foreground">{avgMood}</p>
              <p className="mt-0.5 text-[10px] font-medium text-muted-foreground">{t.mood_avg}</p>
            </div>
            <div className="glass-card rounded-2xl p-4 text-center">
              <p className="text-[22px] font-bold tracking-tight text-foreground">{visibleEntries.length}</p>
              <p className="mt-0.5 text-[10px] font-medium text-muted-foreground">{t.entries_total}</p>
            </div>
            <div className="glass-card flex flex-col items-center justify-center rounded-2xl p-4 text-center">
              <MoodIcon value={moodHighlight.mood} color={highlightMoodData.color} size={26} />
              <p className="mt-1 text-[10px] font-medium text-muted-foreground">{moodHighlight.label}</p>
            </div>
          </div>

          {streak >= 7 && (
            <div className="glass-card flex items-center justify-between rounded-2xl p-5">
              <div>
                <p className="mb-0.5 flex items-center gap-1 text-[11px] font-semibold uppercase tracking-widest text-primary">
                  <Flame className="h-3.5 w-3.5" /> {t.streak_milestone || "You kept the thread"}
                </p>
                <p className="text-[22px] font-bold tracking-tight text-foreground">
                  {streak} {t.days_streak || "days"}
                </p>
              </div>
              <ShareMenu type="streak" data={{ streak }} label={t.share_streak || "Share"} />
            </div>
          )}

          {hasPremiumInsights ? (
            <div className="glass-card rounded-2xl p-5">
              <div className="mb-3 flex items-center gap-2.5">
                <img src={JU_STICKERS.goodjob} alt="Ju" className="h-8 w-8" />
                <p className="text-[11px] font-semibold uppercase tracking-widest text-primary">
                  {t.weekly_summary}
                </p>
              </div>
              {summaryLoading ? (
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span className="text-[13px]">{t.analyzing_week || "Reading the week gently..."}</span>
                </div>
              ) : (
                <p className="text-[14px] leading-relaxed text-foreground">
                  {aiSummary || (visibleEntries.length > 0 ? t.summary_has_entries : t.summary_no_entries)}
                </p>
              )}

              {visibleEntries.length > 2 && onNavigate && (
                <button
                  onClick={() => onNavigate("coach")}
                  className="mt-4 flex w-full items-center justify-between rounded-xl bg-primary/10 p-3 text-primary transition-colors hover:bg-primary/15"
                >
                  <span className="text-[13px] font-semibold">Ask Ju what this week was trying to show you</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              )}
            </div>
          ) : (
            renderPlusInsightsLock(
              t.weekly_summary || "Ju's weekly summary",
              t.plus_feature_3_v2 || "Open the longer view so Ju can notice what keeps repeating."
            )
          )}

          <SmartNotificationsPanel
            entries={entries}
            onUpgrade={onUpgrade}
            hasProAccess={hasPremiumCoach}
          />
        </div>

        <div className="space-y-5">
          {bestDayOfWeek && (
            <div className="glass-card rounded-2xl p-5">
              <p className="mb-3 text-[11px] font-semibold uppercase tracking-widest text-primary">A small pattern</p>
              <p className="text-[15px] font-medium leading-relaxed text-foreground">
                You tend to have your best days on <span className="font-bold text-primary">{bestDayOfWeek}s</span>.
              </p>
              {onNavigate && (
                <button
                  onClick={() => onNavigate("coach")}
                  className="mt-4 flex items-center gap-1.5 text-[13px] font-semibold text-muted-foreground transition-colors hover:text-foreground"
                >
                  Ask Ju why <ArrowRight className="h-3.5 w-3.5" />
                </button>
              )}
            </div>
          )}

          {prediction && (
            <div
              className="glass-card rounded-2xl border border-primary/20 p-5"
              style={{ background: "linear-gradient(180deg, hsl(var(--primary)/0.05) 0%, transparent 100%)" }}
            >
              <div className="mb-3 flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-primary" />
                <p className="text-[11px] font-semibold uppercase tracking-widest text-primary">A gentle heads-up</p>
              </div>
              <p className="text-[15px] font-medium leading-relaxed text-foreground">{prediction}</p>
              {onNavigate && (
                <button
                  onClick={() => onNavigate("coach")}
                  className="mt-4 w-full rounded-xl bg-primary py-2.5 text-[13px] font-semibold text-primary-foreground transition-transform active:scale-95"
                >
                  Plan a softer check-in
                </button>
              )}
            </div>
          )}

          <AiMemoryCard entries={entries} hasProAccess={hasPremiumCoach} userName={displayName} />

          <div className={`grid gap-3 ${isLargeShell ? "sm:grid-cols-2" : "grid-cols-2"}`}>
            <button
              onClick={() => onNavigate?.("programs")}
              className="glass-card flex flex-col items-start gap-2 rounded-2xl p-4 text-left press-spring"
            >
              <Target className="h-6 w-6 text-primary" />
              <div>
                <p className="text-[14px] font-semibold text-foreground">
                  {t.guided_programs_title || "Guided paths"}
                </p>
                <p className="mt-0.5 text-[11px] text-muted-foreground">
                  {t.guided_programs_sub || "Small rituals for hard weeks"}
                </p>
              </div>
            </button>
            <button
              onClick={() => onNavigate?.("year-review")}
              className="glass-card flex flex-col items-start gap-2 rounded-2xl p-4 text-left press-spring"
            >
              <CalendarDays className="h-6 w-6 text-primary" />
              <div>
                <p className="text-[14px] font-semibold text-foreground">
                  {t.year_card_title || "Year in Review"}
                </p>
                <p className="mt-0.5 text-[11px] text-muted-foreground">
                  {(t.year_card_sub || "{year} recap").replace("{year}", String(new Date().getFullYear()))}
                </p>
              </div>
            </button>
          </div>

          <MoodCalendar entries={visibleEntries} />

          <HistoryLock onUpgrade={onUpgrade} plan={plan} trialStartedAt={trialStartedAt} />

          {!hasPremiumCoach && (
            <div className="glass-card rounded-2xl p-6 text-center">
              <Lock className="mx-auto mb-3 h-7 w-7 text-muted-foreground/30" />
              <p className="mb-1 text-[17px] font-semibold text-foreground">{t.relationship_map}</p>
              <p className="mb-4 text-[13px] text-muted-foreground">{t.rel_desc}</p>
              <button
                onClick={onUpgrade}
                className="rounded-xl bg-primary/8 px-5 py-2.5 text-[13px] font-semibold text-primary transition-all active:scale-[0.97]"
              >
                {t.unlock_pro}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default InsightsScreen;
