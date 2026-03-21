import React, { useState, useRef, useEffect, useCallback } from "react";
import { useLang } from "@/lib/i18n";
import { AI_PERSONAS, coachResponses } from "@/lib/constants";
import { Send } from "lucide-react";
import { JU_STICKERS } from "@/lib/stickers";
import coachGentle from "@/assets/coach-gentle.png";
import coachTough from "@/assets/coach-tough.png";
import coachWise from "@/assets/coach-wise.png";
import coachFun from "@/assets/coach-fun.png";

const COACH_ICONS: Record<string, string> = {
  gentle: coachGentle,
  tough: coachTough,
  wise: coachWise,
  fun: coachFun,
};

const CoachScreen: React.FC = () => {
  const { t } = useLang();
  const [persona, setPersona] = useState("gentle");
  const [messages, setMessages] = useState<Array<{ role: "user" | "assistant"; content: string }>>([]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [switching, setSwitching] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, typing]);

  const handlePersonaSwitch = useCallback((id: string) => {
    if (id === persona) return;
    setSwitching(true);
    setTimeout(() => {
      setPersona(id);
      setSwitching(false);
    }, 250);
  }, [persona]);

  const sendMessage = () => {
    if (!input.trim()) return;
    const userMsg = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: userMsg }]);
    setTyping(true);

    setTimeout(() => {
      const responses = coachResponses[persona] || coachResponses.gentle;
      const reply = responses[Math.floor(Math.random() * responses.length)];
      setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
      setTyping(false);
    }, 1200);
  };

  const currentPersona = AI_PERSONAS.find((p) => p.id === persona)!;

  return (
    <div className="animate-fade-up flex flex-col h-[calc(100vh-180px)]">
      <h1 className="font-serif text-2xl font-bold text-foreground mb-4">{t.ai_coach}</h1>

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
                style={{
                  background: p.color,
                  transform: isActive ? "scale(1.3)" : "scale(1)",
                }}
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
              animationDelay: `${i * 0.05}s`,
            }}
          >
            <div
              className={`max-w-[80%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                msg.role === "user"
                  ? "bg-primary text-primary-foreground rounded-br-sm"
                  : "bg-card border border-border/50 text-foreground rounded-bl-sm"
              }`}
            >
              {msg.content}
            </div>
          </div>
        ))}
        {typing && (
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

      {/* Input */}
      <div className="flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          placeholder={t.talk_to_ju}
          className="flex-1 px-5 py-3 rounded-2xl bg-card border border-border/50 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/30 text-sm transition-shadow duration-200"
        />
        <button
          onClick={sendMessage}
          disabled={!input.trim()}
          className="w-12 h-12 rounded-2xl bg-primary text-primary-foreground flex items-center justify-center transition-all duration-200 active:scale-[0.95] disabled:opacity-40"
        >
          <Send className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default CoachScreen;
