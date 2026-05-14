import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { getAuthenticatedUser, getServiceClient, unauthorized } from "../_shared/function-auth.ts";
import { callChatWithGroqFallback } from "../_shared/ai-fallback.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const langNames: Record<string, string> = {
  en: "English",
  id: "Indonesian (Bahasa Indonesia)",
  es: "Spanish",
  pt: "Portuguese",
  ja: "Japanese",
  ko: "Korean",
  zh: "Chinese",
  hi: "Hindi",
  ar: "Arabic",
  fr: "French",
  de: "German",
  ms: "Malay",
  th: "Thai",
  vi: "Vietnamese",
  fil: "Filipino",
};

type EntrySignal = {
  mood: number;
  text: string;
  date?: string;
  kind?: string;
  tags?: string[];
};

type MemoryRow = {
  content: string | null;
  memory_type?: string | null;
};

type RelationshipRow = {
  person_name: string | null;
  mention_count: number | null;
  themes: string[] | null;
};

type HabitRow = {
  id: string;
  name: string | null;
};

type HabitLogRow = {
  habit_id: string | null;
};

type ProgramRow = {
  program_id: string | null;
  current_day: number | null;
  completed: boolean | null;
};

const programNames: Record<string, string> = {
  "gratitude-7": "Gratitude Journey",
  "stress-relief-5": "Stress Relief Reset",
  "self-discovery-14": "Know Yourself",
  "morning-clarity-7": "Morning Clarity",
  "resilience-10": "Resilience Builder",
  calm7: "7 Days of Calm",
  rebuild14: "14 Days After a Hard Week",
  morning21: "21-Day Morning Ritual",
  sleep10: "10 Nights to Better Sleep",
};

function jsonResponse(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

function sanitizeUserName(value: unknown): string | null {
  if (typeof value !== "string") return null;
  const cleaned = value
    .replace(/[^\p{L}\p{N}\s'.-]/gu, "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 40);
  return cleaned || null;
}

function normalizeEntries(value: unknown): EntrySignal[] {
  if (!Array.isArray(value)) return [];
  return value.slice(0, 24).map((item) => {
    const raw = item && typeof item === "object" ? item as Record<string, unknown> : {};
    const tags = Array.isArray(raw.tags)
      ? raw.tags.filter((tag): tag is string => typeof tag === "string").slice(0, 6)
      : [];

    return {
      mood: typeof raw.mood === "number" ? Math.max(1, Math.min(5, Math.round(raw.mood))) : 3,
      text: typeof raw.text === "string" ? raw.text.replace(/\s+/g, " ").trim().slice(0, 260) : "",
      date: typeof raw.date === "string" ? raw.date : undefined,
      kind: typeof raw.kind === "string" ? raw.kind : undefined,
      tags,
    };
  });
}

function moodName(value: number) {
  if (value <= 1) return "rough";
  if (value === 2) return "low";
  if (value === 3) return "okay";
  if (value === 4) return "good";
  return "great";
}

function countBy(values: string[]) {
  return values.reduce<Record<string, number>>((acc, value) => {
    const key = value.trim();
    if (!key) return acc;
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {});
}

function topCounts(values: string[], limit = 4) {
  return Object.entries(countBy(values))
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
    .map(([label, count]) => `${label} ${count}x`);
}

function buildFallback(entries: EntrySignal[], userName: string | null, programs: ProgramRow[]) {
  const firstName = userName?.split(/\s+/)[0] || "";
  const prefix = firstName ? `${firstName}, ` : "";
  const moods = entries.map((entry) => entry.mood);
  const avg = moods.reduce((sum, value) => sum + value, 0) / Math.max(moods.length, 1);
  const tags = topCounts(entries.flatMap((entry) => entry.tags || []), 2);
  const activeProgram = programs.find((program) => program.program_id);
  const lines: string[] = [];

  if (avg <= 2.5) {
    lines.push(`${prefix}your recent check-ins have been carrying some weight, and Ju is slowing down with you instead of rushing to fix it.`);
  } else if (avg >= 3.8) {
    lines.push(`${prefix}there has been more light in your recent check-ins, and Ju is keeping track of what seems to help.`);
  } else {
    lines.push(`${prefix}your recent entries feel mixed, so Ju is watching for the small things that soften or sharpen the week.`);
  }

  if (tags.length) {
    lines.push(`The strongest signals around your mood lately are ${tags.join(" and ")}, which gives Ju more context than mood alone.`);
  }

  if (activeProgram?.program_id) {
    const title = programNames[activeProgram.program_id] || activeProgram.program_id;
    const day = activeProgram.current_day || 0;
    lines.push(`Your guided path matters too: ${title}${day > 0 ? ` is around day ${day}` : " has started"}, so Ju can connect that rhythm to your reflections.`);
  }

  return lines.slice(0, 3);
}

function cleanLine(value: unknown): string {
  if (typeof value !== "string") return "";
  let line = value
    .replace(/^[\s\-*0-9.)]+/, "")
    .replace(/\bThis user has\b/gi, "You have")
    .replace(/\bThis user\b/gi, "You")
    .replace(/\bthe user has\b/gi, "you have")
    .replace(/\bthe user\b/gi, "you")
    .replace(/\bThey have\b/g, "You have")
    .replace(/\bthey have\b/g, "you have")
    .replace(/\bricher capture methods\b/gi, "voice or photo reflections")
    .replace(/\bmedia-backed moments\b/gi, "moments with voice or photos")
    .replace(/\bentries average\b/gi, "recent mood rhythm")
    .replace(/\s+/g, " ")
    .trim();

  if (!line) return "";
  if (!/[.!?]$/.test(line)) line += ".";
  return line.slice(0, 220);
}

async function loadContext(userId: string) {
  const admin = getServiceClient();
  const since = new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10);

  const [
    memories,
    relationships,
    habits,
    programs,
  ] = await Promise.all([
    admin
      .from("ai_memory")
      .select("content,memory_type")
      .eq("user_id", userId)
      .eq("is_active", true)
      .order("created_at", { ascending: false })
      .limit(6),
    admin
      .from("relationships")
      .select("person_name,mention_count,themes")
      .eq("user_id", userId)
      .order("mention_count", { ascending: false })
      .limit(5),
    admin
      .from("habits")
      .select("id,name")
      .eq("user_id", userId)
      .eq("is_active", true)
      .order("created_at", { ascending: false })
      .limit(8),
    admin
      .from("user_programs")
      .select("program_id,current_day,completed")
      .eq("user_id", userId)
      .order("started_at", { ascending: false })
      .limit(6),
  ]);

  if (memories.error) throw memories.error;
  if (relationships.error) throw relationships.error;
  if (habits.error) throw habits.error;
  if (programs.error) throw programs.error;

  const habitRows = (habits.data || []) as HabitRow[];
  let habitLogRows: HabitLogRow[] = [];
  if (habitRows.length) {
    const habitIds = habitRows.map((habit) => habit.id);
    const logs = await admin
      .from("habit_logs")
      .select("habit_id")
      .eq("user_id", userId)
      .gte("logged_date", since)
      .eq("completed", true)
      .in("habit_id", habitIds);
    if (!logs.error) habitLogRows = (logs.data || []) as HabitLogRow[];
  }

  const habitCounts = countBy(habitLogRows.map((log) => log.habit_id || ""));
  const habitSummary = habitRows
    .map((habit) => `${habit.name || "habit"} ${habitCounts[habit.id] || 0}x/14d`)
    .join(", ");

  const programRows = (programs.data || []) as ProgramRow[];
  const programSummary = programRows
    .filter((program) => program.program_id)
    .map((program) => {
      const id = program.program_id || "";
      const title = programNames[id] || id;
      const day = program.current_day || 0;
      return `${title} day ${day}${program.completed ? " completed" : ""}`;
    })
    .join(", ");

  return {
    memories: (memories.data || []) as MemoryRow[],
    relationships: (relationships.data || []) as RelationshipRow[],
    habits: habitSummary,
    programs: programRows,
    programSummary,
  };
}

function buildUserPrompt(args: {
  entries: EntrySignal[];
  memories: MemoryRow[];
  relationships: RelationshipRow[];
  habits: string;
  programSummary: string;
  userName: string | null;
}) {
  const entryLines = args.entries.map((entry, index) => {
    const tags = entry.tags?.length ? ` tags=${entry.tags.join(", ")}` : "";
    const kind = entry.kind ? ` kind=${entry.kind}` : "";
    const text = entry.text ? ` note="${entry.text}"` : "";
    return `${index + 1}. ${entry.date || "recent"} mood=${moodName(entry.mood)}${kind}${tags}${text}`;
  });

  const memoryLines = args.memories
    .map((memory) => `${memory.memory_type || "memory"}: ${memory.content || ""}`)
    .filter((line) => line.trim());
  const relationshipLines = args.relationships
    .map((relationship) => {
      const themes = relationship.themes?.length ? ` around ${relationship.themes.slice(0, 3).join(", ")}` : "";
      return `${relationship.person_name || "someone"} ${relationship.mention_count || 0}x${themes}`;
    });

  return [
    `User name: ${args.userName || "unknown"}`,
    "Recent entries:",
    entryLines.join("\n") || "No detailed entry text sent.",
    "Longer memory from Supabase:",
    memoryLines.join("\n") || "No stored memory yet.",
    "Relationships:",
    relationshipLines.join("\n") || "No relationship memory yet.",
    `Habits: ${args.habits || "No active habit data yet."}`,
    `Guided paths: ${args.programSummary || "No guided path progress yet."}`,
  ].join("\n\n");
}

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const user = await getAuthenticatedUser(req);
    if (!user) return unauthorized();

    const body = await req.json();
    const lang = typeof body.lang === "string" ? body.lang : "en";
    const langName = langNames[lang] || "English";
    const userName = sanitizeUserName(body.userName);
    const entries = normalizeEntries(body.entries);
    const context = await loadContext(user.id);

    const systemPrompt = `You are Ju, Nuju's emotionally intelligent memory voice.
Return JSON only: {"memories":["...","..."]}.
Write exactly 2-3 memory lines in ${langName}.
Each line must feel personal, warm, specific, and human. Speak directly to the user as "you".
Use the user's first name naturally at most once if it helps.
Use mood, entry tags, habits, relationships, or guided path progress only when relevant.
Never say "this user", "the user", "entries average", "richer capture methods", "media-backed", "database", "Supabase", or "AI memory".
Do not diagnose or sound clinical. Do not expose counts unless they feel emotionally useful.`;

    const raw = await callChatWithGroqFallback({
      label: "ai-memory-card",
      maxTokens: 280,
      temperature: 0.75,
      responseFormat: { type: "json_object" },
      messages: [
        { role: "system", content: systemPrompt },
        {
          role: "user",
          content: buildUserPrompt({
            entries,
            memories: context.memories,
            relationships: context.relationships,
            habits: context.habits,
            programSummary: context.programSummary,
            userName,
          }),
        },
      ],
    });

    let memories: string[] = [];
    try {
      const parsed = JSON.parse(raw);
      memories = Array.isArray(parsed.memories) ? parsed.memories.map(cleanLine).filter(Boolean) : [];
    } catch {
      memories = raw.split(/\n+/).map(cleanLine).filter(Boolean);
    }

    if (!memories.length) {
      memories = buildFallback(entries, userName, context.programs);
    }

    return jsonResponse({ memories: memories.slice(0, 3) });
  } catch (error) {
    console.error("ai-memory-card error:", error);
    return jsonResponse({ error: error instanceof Error ? error.message : "Unknown error" }, 500);
  }
});
