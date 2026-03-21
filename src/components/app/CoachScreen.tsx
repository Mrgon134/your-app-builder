import React, { useState, useRef, useEffect } from "react";
import { useLang } from "@/lib/i18n";
import { AI_PERSONAS, coachResponses } from "@/lib/constants";
import { Send } from "lucide-react";

const CoachScreen: React.FC = () => {
  const { t } = useLang();
  const [persona, setPersona] = useState("gentle");
  const [messages, setMessages] = useState<Array<{ role: "user" | "assistant"; content: string }>>([]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, typing]);

  const sendMessage = () => {
    if (!input.trim()) return;
    const userMsg = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: userMsg }]);
    setTyping(true);

    // Mock AI response
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
        {AI_PERSONAS.map((p) => (
          <button
            key={p.id}
            onClick={() => setPersona(p.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all active:scale-[0.95] ${
              persona === p.id
                ? "shadow-md text-foreground"
                : "bg-secondary text-muted-foreground"
            }`}
            style={persona === p.id ? { background: `${p.color}30`, borderColor: p.color } : {}}
          >
            <span className="w-3 h-3 rounded-full" style={{ background: p.color }} />
            {p.name}
          </button>
        ))}
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto space-y-3 mb-4">
        {messages.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center" style={{ background: `${currentPersona.color}20` }}>
              <span className="text-2xl">💬</span>
            </div>
            <p className="text-sm text-muted-foreground">{currentPersona.desc}</p>
          </div>
        )}
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
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
          <div className="flex justify-start">
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
          className="flex-1 px-5 py-3 rounded-2xl bg-card border border-border/50 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/30 text-sm"
        />
        <button
          onClick={sendMessage}
          disabled={!input.trim()}
          className="w-12 h-12 rounded-2xl bg-primary text-primary-foreground flex items-center justify-center transition-all active:scale-[0.95] disabled:opacity-40"
        >
          <Send className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default CoachScreen;
