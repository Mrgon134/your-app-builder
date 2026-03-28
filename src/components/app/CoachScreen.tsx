import React, { useState, useRef, useEffect, useCallback } from "react";
import { useLang } from "@/lib/i18n";
import { AI_PERSONAS } from "@/lib/constants";
import { Send } from "lucide-react";
import { JU_STICKERS } from "@/lib/stickers";
import { useAuth } from "@/lib/auth";
import { saveCoachMessage, fetchCoachMessages, checkCoachLimit, countCoachMessagesThisWeek, fetchProfile } from "@/lib/api";
import { hasPlusAccess } from "@/lib/trial";
import { toast } from "sonner";
import { Lock } from "lucide-react";
import coachGentle from "@/assets/coach-gentle.webp";
import coachTough from "@/assets/coach-tough.webp";
import coachWise from "@/assets/coach-wise.webp";
import coachFun from "@/assets/coach-fun.webp";

const PERSONA_GREETINGS: Record<string, string> = {
  gentle: "Hey, I'm here now. Take your time — what's on your heart?",
  tough: "Let's get real with each other. What are we actually dealing with?",
  wise: "I'm glad you found me. Every shift in perspective is its own kind of wisdom.",
  fun: "Okay, new energy! Let's shake things up — what's going on?",
};

const COACH_ICONS: Record<string, string> = {
  gentle: coachGentle,
  tough: coachTough,
  wise: coachWise,
  fun: coachFun,
};

type Msg = { role: "user" | "assistant"; content: string };

const AI_BASE = "https://sxgmlnlqmdjjfmcypivi.supabase.co";
const AI_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN4Z21sbmxxbWRqamZtY3lwaXZpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQwMTEyNDYsImV4cCI6MjA4OTU4NzI0Nn0.kUM2J00vmkRd55MmQw5AAadS8XGZKeLY0mgGg8aAVFg";
const CHAT_URL = `${AI_BASE}/functions/v1/ai-coach`;

async function streamChat({
  messages,
  persona,
  lang,
  onDelta,
  onDone,
  onError,
}: {
  messages: Msg[];
  persona: string;
  lang: string;
  onDelta: (text: string) => void;
  onDone: () => void;
  onError: (msg: string) => void;
}) {
  const resp = await fetch(CHAT_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${AI_KEY}`,
    },
    body: JSON.stringify({ messages, persona, lang }),
  });

  if (!resp.ok) {
    const errBody = await resp.json().catch(() => ({ error: "Request failed" }));
    onError(errBody.error || `Error ${resp.status}`);
    return;
  }

  if (!resp.body) {
    onError("No response body");
    return;
  }

  const reader = resp.body.getReader();
  const decoder = new TextDecoder();
  let textBuffer = "";
  let streamDone = false;

  while (!streamDone) {
    const { done, value } = await reader.read();
    if (done) break;
    textBuffer += decoder.decode(value, { stream: true });

    let newlineIndex: number;
    while ((newlineIndex = textBuffer.indexOf("\n")) !== -1) {
      let line = textBuffer.slice(0, newlineIndex);
      textBuffer = textBuffer.slice(newlineIndex + 1);

      if (line.endsWith("\r")) line = line.slice(0, -1);
      if (line.startsWith(":") || line.trim() === "") continue;
      if (!line.startsWith("data: ")) continue;

      const jsonStr = line.slice(6).trim();
      if (jsonStr === "[DONE]") {
        streamDone = true;
        break;
      }

      try {
        const parsed = JSON.parse(jsonStr);
        const content = parsed.choices?.[0]?.delta?.content as string | undefined;
        if (content) onDelta(content);
      } catch {
        textBuffer = line + "\n" + textBuffer;
        break;
      }
    }
  }

  // Flush remaining buffer
  if (textBuffer.trim()) {
    for (let raw of textBuffer.split("\n")) {
      if (!raw) continue;
      if (raw.endsWith("\r")) raw = raw.slice(0, -1);
      if (raw.startsWith(":") || raw.trim() === "") continue;
      if (!raw.startsWith("data: ")) continue;
      const jsonStr = raw.slice(6).trim();
      if (jsonStr === "[DONE]") continue;
      try {
        const parsed = JSON.parse(jsonStr);
        const content = parsed.choices?.[0]?.delta?.content as string | undefined;
        if (content) onDelta(content);
      } catch { /* ignore */ }
    }
  }

  onDone();
}

const CoachScreen: React.FC<{ onUpgrade?: () => void; plan?: string | null; trialStartedAt?: string | null }> = ({ onUpgrade, plan: propPlan, trialStartedAt: propTrialStartedAt }) => {
  const { t, lang } = useLang();
  const { user } = useAuth();
  const [persona, setPersona] = useState("gentle");
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [switching, setSwitching] = useState(false);
  const [canSend, setCanSend] = useState(true);
  const [userPlan, setUserPlan] = useState("free");
  const [messagesUsed, setMessagesUsed] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Load previous messages + check limit — use allSettled so DB errors don't break the screen
  useEffect(() => {
    if (!user) return;
    Promise.allSettled([
      fetchCoachMessages(user.id, 50),
      checkCoachLimit(user.id),
      fetchProfile(user.id),
      countCoachMessagesThisWeek(user.id),
    ]).then(([msgsResult, limitResult, profileResult, countResult]) => {
      if (msgsResult.status === "fulfilled" && msgsResult.value.length > 0) {
        setMessages(msgsResult.value.map((m) => ({ role: m.role as "user" | "assistant", content: m.content })));
        if ((msgsResult.value[0] as any)?.persona) setPersona((msgsResult.value[0] as any).persona);
      }
      setCanSend(limitResult.status === "fulfilled" ? limitResult.value : true);
      setUserPlan(profileResult.status === "fulfilled" ? profileResult.value?.plan || "free" : "free");
      setMessagesUsed(countResult.status === "fulfilled" ? countResult.value : 0);
    });
  }, [user]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, isLoading]);

  const handlePersonaSwitch = useCallback(
    (id: string) => {
      if (id === persona) return;
      setSwitching(true);
      setTimeout(() => {
        setPersona(id);
        setSwitching(false);
        // Inject warm transition greeting when there are existing messages
        if (messages.length > 0) {
          const greeting = PERSONA_GREETINGS[id];
          if (greeting) {
            setMessages((prev) => [...prev, { role: "assistant", content: greeting }]);
          }
        }
      }, 250);
    },
    [persona, messages.length]
  );

  const sendMessage = async () => {
    if (!input.trim() || isLoading || !canSend) return;
    const userMsg = input.trim();
    setInput("");

    const newMessages: Msg[] = [...messages, { role: "user", content: userMsg }];
    setMessages(newMessages);
    setIsLoading(true);

    // Save user message to DB
    if (user) {
      saveCoachMessage(user.id, "user", userMsg, persona).catch(console.error);
    }

    let assistantSoFar = "";

    const upsertAssistant = (chunk: string) => {
      assistantSoFar += chunk;
      setMessages((prev) => {
        const last = prev[prev.length - 1];
        if (last?.role === "assistant" && prev.length === newMessages.length + 1) {
          return prev.map((m, i) => (i === prev.length - 1 ? { ...m, content: assistantSoFar } : m));
        }
        return [...prev, { role: "assistant", content: assistantSoFar }];
      });
    };

    try {
      await streamChat({
        messages: newMessages.slice(-20), // last 20 messages for context
        persona,
        lang,
        onDelta: upsertAssistant,
        onDone: () => {
          setIsLoading(false);
          // Save assistant message to DB
          if (user && assistantSoFar) {
            saveCoachMessage(user.id, "assistant", assistantSoFar, persona).catch(console.error);
          }
          // Re-check limit after sending
          if (user) {
            checkCoachLimit(user.id).then(setCanSend).catch(console.error);
            countCoachMessagesThisWeek(user.id).then(setMessagesUsed).catch(console.error);
          }
        },
        onError: (msg) => {
          setIsLoading(false);
          toast.error(msg);
        },
      });
    } catch (e) {
      console.error(e);
      setIsLoading(false);
      toast.error("Failed to get AI response");
    }
  };

  const currentPersona = AI_PERSONAS.find((p) => p.id === persona)!;

  return (
    <div className="animate-page-slide-in flex flex-col h-[calc(100vh-180px)]">
      <h1 className="text-[34px] font-bold text-foreground tracking-tight mb-4">{t.ai_coach}</h1>

      {/* Persona pills */}
      <div className="flex flex-wrap gap-2 mb-4 pb-2">
        {AI_PERSONAS.map((p) => {
          const isActive = persona === p.id;
          return (
            <button
              key={p.id}
              onClick={() => handlePersonaSwitch(p.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-300 ease-out active:scale-[0.95] ${
                isActive
                  ? "shadow-md text-foreground scale-[1.03]"
                  : "bg-secondary text-muted-foreground hover:scale-[1.02]"
              }`}
              style={isActive ? { background: `${p.color}30`, boxShadow: `0 4px 14px ${p.color}25` } : {}}
            >
              <span
                className="w-3 h-3 rounded-full transition-transform duration-300"
                style={{ background: p.color, transform: isActive ? "scale(1.3)" : "scale(1)" }}
              />
              {p.name}
            </button>
          );
        })}
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto space-y-3 mb-4">
        {messages.length === 0 && (
          <div
            className="text-center py-12 transition-all duration-500 ease-out"
            style={{ opacity: switching ? 0 : 1, transform: switching ? "translateY(8px) scale(0.97)" : "translateY(0) scale(1)" }}
          >
            <div
              className="w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center transition-all duration-500 ease-out overflow-hidden"
              style={{
                background: `${currentPersona.color}15`,
                boxShadow: `0 0 28px ${currentPersona.color}20`,
              }}
            >
              <img
                src={COACH_ICONS[persona]}
                alt={currentPersona.name}
                className="w-16 h-16 object-contain transition-all duration-500"
              />
            </div>
            <p className="text-sm text-muted-foreground transition-all duration-300">{currentPersona.desc}</p>
          </div>
        )}
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            style={{
              animation: `msg-enter 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards`,
              opacity: 0,
              animationDelay: `${Math.min(i * 0.05, 0.5)}s`,
            }}
          >
            <div
              className={`max-w-[80%] px-4 py-3 rounded-2xl text-[14px] leading-relaxed ${
                msg.role === "user"
                  ? "bg-primary text-primary-foreground rounded-br-md"
                  : "bg-card border border-border/40 text-foreground rounded-bl-md shadow-[0_1px_2px_rgba(0,0,0,0.04)]"
              }`}
            >
              {msg.content}
            </div>
          </div>
        ))}
        {isLoading && messages[messages.length - 1]?.role !== "assistant" && (
          <div className="flex justify-start items-end gap-2" style={{ animation: "msg-enter 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards" }}>
            <img src={JU_STICKERS.hmm} alt="Thinking" className="w-8 h-8 animate-[ju-float_2s_ease-in-out_infinite]" />
            <div className="bg-card border border-border/50 px-4 py-3 rounded-2xl rounded-bl-sm flex gap-1">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="w-2 h-2 rounded-full bg-muted-foreground/50"
                  style={{ animation: `typing-dots 1.2s ${i * 0.2}s infinite` }}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Paywall banner when limit reached */}
      {!canSend && !hasPlusAccess(propPlan || userPlan, propTrialStartedAt || null) && (
        <div className="bg-primary/10 border border-primary/20 rounded-2xl p-4 mb-3 text-center animate-fade-up">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Lock className="w-4 h-4 text-primary" />
            <span className="text-sm font-semibold text-foreground">{t.coach_limit_title || "Weekly limit reached"}</span>
          </div>
          <p className="text-xs text-muted-foreground mb-3">
            {t.coach_limit_desc || "Free plan includes 5 messages per week. Upgrade for unlimited coaching."}
          </p>
          {onUpgrade && (
            <button
              onClick={onUpgrade}
              className="px-6 py-2.5 rounded-2xl bg-primary text-primary-foreground text-sm font-semibold transition-all active:scale-[0.97] hover:shadow-lg hover:shadow-primary/20"
            >
              {t.unlock_ju}
            </button>
          )}
        </div>
      )}

      {/* Free user message counter */}
      {canSend && !hasPlusAccess(propPlan || userPlan, propTrialStartedAt || null) && (
        <div className={`flex items-center justify-center gap-1.5 mb-2 transition-all duration-300 ${messagesUsed >= 4 ? "animate-pulse" : ""}`}>
          <div className={`text-xs font-medium px-3 py-1 rounded-full ${
            messagesUsed >= 4
              ? "bg-destructive/10 text-destructive"
              : messagesUsed >= 3
                ? "bg-amber-500/10 text-amber-600 dark:text-amber-400"
                : "bg-muted text-muted-foreground"
          }`}>
            {(t.coach_messages_left || "{used} / 5 messages left this week").replace("{used}", String(5 - messagesUsed))}
          </div>
        </div>
      )}

      {/* Input */}
      <div className="flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          placeholder={!canSend && !hasPlusAccess(propPlan || userPlan, propTrialStartedAt || null) ? "Upgrade to keep chatting..." : t.talk_to_ju}
          disabled={isLoading || (!canSend && !hasPlusAccess(propPlan || userPlan, propTrialStartedAt || null))}
          className="flex-1 px-5 h-[48px] rounded-xl bg-card border border-border/40 text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary/15 focus:border-primary/30 text-[15px] transition-all disabled:opacity-50"
        />
        <button
          onClick={sendMessage}
          disabled={!input.trim() || isLoading || (!canSend && !hasPlusAccess(propPlan || userPlan, propTrialStartedAt || null))}
          className="w-12 h-12 rounded-xl bg-primary text-primary-foreground flex items-center justify-center transition-all duration-150 active:scale-[0.93] disabled:opacity-40 shadow-[0_2px_12px_-3px_hsl(var(--primary)/0.35)]"
        >
          <Send className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default CoachScreen;
