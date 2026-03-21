import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLang } from "@/lib/i18n";
import { Crosshair, PenLine, BrainCircuit, Check } from "lucide-react";
import juMain from "@/assets/ju-main.png";

const useReveal = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold: 0.15 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, visible };
};

const Landing: React.FC = () => {
  const { t } = useLang();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const heroReveal = useReveal();
  const stepsReveal = useReveal();
  const pricingReveal = useReveal();
  const ctaReveal = useReveal();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.includes("@")) {
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 3000);
      setEmail("");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 backdrop-blur-xl bg-background/80 border-b border-border/50">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img src={juMain} alt="Ju" className="w-8 h-8" />
            <span className="font-serif text-xl font-bold text-foreground">Nuju</span>
          </div>
          <button
            onClick={() => navigate("/app")}
            className="px-4 py-2 rounded-full bg-primary text-primary-foreground text-sm font-semibold transition-all hover:shadow-lg hover:shadow-primary/25 active:scale-[0.97]"
          >
            {t.get_early_access}
          </button>
        </div>
      </nav>

      {/* Hero */}
      <section
        ref={heroReveal.ref}
        className={`relative overflow-hidden pt-16 pb-24 px-4 transition-all duration-700 ${heroReveal.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
      >
        <div className="max-w-3xl mx-auto text-center">
          <div className="relative w-32 h-32 mx-auto mb-8">
            <div className="absolute inset-0 rounded-full bg-primary/20 animate-glow-pulse" />
            <img src={juMain} alt="Ju mascot" className="relative w-full h-full object-contain animate-ju-float" />
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-foreground leading-[1.1] mb-6 text-balance">
            {t.hero_title}
          </h1>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto mb-10 text-pretty">
            {t.hero_subtitle}
          </p>
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t.enter_email}
              className="flex-1 px-5 py-3.5 rounded-2xl bg-card border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 text-base"
            />
            <button
              type="submit"
              className="px-6 py-3.5 rounded-2xl bg-primary text-primary-foreground font-semibold text-base whitespace-nowrap transition-all hover:shadow-lg hover:shadow-primary/25 active:scale-[0.97]"
            >
              {submitted ? "✓" : t.join_waitlist}
            </button>
          </form>
          <p className="text-sm text-muted-foreground mt-4">{t.join_count}</p>
        </div>
      </section>

      {/* How it works */}
      <section ref={stepsReveal.ref} className="py-20 px-4 bg-secondary/30">
        <div className="max-w-4xl mx-auto">
          <h2 className={`font-serif text-3xl font-bold text-center mb-16 transition-all duration-700 delay-100 ${stepsReveal.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
            {t.how_it_works}
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { num: "01", title: t.step_1_title, desc: t.step_1_desc, emoji: "🎯" },
              { num: "02", title: t.step_2_title, desc: t.step_2_desc, emoji: "✍️" },
              { num: "03", title: t.step_3_title, desc: t.step_3_desc, emoji: "✨" },
            ].map((step, i) => (
              <div
                key={step.num}
                className={`text-center p-8 rounded-3xl bg-card shadow-sm shadow-primary/5 transition-all duration-700 ${stepsReveal.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
                style={{ transitionDelay: `${200 + i * 120}ms` }}
              >
                <div className="text-4xl mb-4">{step.emoji}</div>
                <div className="text-xs font-bold text-primary tracking-widest uppercase mb-2">{step.num}</div>
                <h3 className="font-serif text-xl font-semibold mb-3">{step.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section ref={pricingReveal.ref} className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className={`font-serif text-3xl font-bold text-center mb-16 transition-all duration-700 ${pricingReveal.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
            {t.pricing_title}
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { name: t.pricing_free, price: "$0", period: "/forever", features: ["3 entries/week", "Mood tracking", "1 AI coach persona", "7-day history"], highlight: false },
              { name: t.pricing_plus, price: "$4.99", period: "/month", features: ["Unlimited entries", "All 4 coach personas", "Full history", "Weekly AI reports", "Dark mode"], highlight: true },
              { name: t.pricing_pro, price: "$9.99", period: "/month", features: ["Everything in Plus", "Voice journaling", "Relationship mood map", "AI memory & patterns", "Priority support"], highlight: false },
            ].map((plan, i) => (
              <div
                key={plan.name}
                className={`relative p-8 rounded-3xl transition-all duration-700 ${plan.highlight ? "bg-primary text-primary-foreground shadow-xl shadow-primary/20 scale-[1.02]" : "bg-card border border-border shadow-sm"} ${pricingReveal.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
                style={{ transitionDelay: `${200 + i * 120}ms` }}
              >
                <h3 className="font-serif text-xl font-semibold mb-2">{plan.name}</h3>
                <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-3xl font-bold">{plan.price}</span>
                  <span className={`text-sm ${plan.highlight ? "text-primary-foreground/70" : "text-muted-foreground"}`}>{plan.period}</span>
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((f) => (
                    <li key={f} className={`text-sm flex items-center gap-2 ${plan.highlight ? "text-primary-foreground/90" : "text-muted-foreground"}`}>
                      <span className={plan.highlight ? "text-primary-foreground" : "text-primary"}>✓</span>
                      {f}
                    </li>
                  ))}
                </ul>
                <button
                  className={`w-full py-3 rounded-2xl font-semibold text-sm transition-all active:scale-[0.97] ${plan.highlight ? "bg-primary-foreground text-primary hover:shadow-lg" : "bg-secondary text-foreground hover:bg-secondary/80"}`}
                >
                  {t.start_trial}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section ref={ctaReveal.ref} className="py-20 px-4 bg-secondary/30">
        <div className={`max-w-lg mx-auto text-center transition-all duration-700 ${ctaReveal.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
          <img src={juMain} alt="Ju" className="w-20 h-20 mx-auto mb-6 animate-bounce-gentle" />
          <h2 className="font-serif text-3xl font-bold mb-4">{t.cta_final}</h2>
          <p className="text-muted-foreground mb-8">{t.cta_final_desc}</p>
          <button
            onClick={() => navigate("/app")}
            className="px-8 py-4 rounded-2xl bg-primary text-primary-foreground font-semibold text-lg transition-all hover:shadow-xl hover:shadow-primary/25 active:scale-[0.97]"
          >
            {t.onb_start}
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-border">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-3">
            <img src={juMain} alt="Ju" className="w-6 h-6" />
            <span className="font-serif font-bold">Nuju</span>
          </div>
          <p className="text-sm text-muted-foreground mb-4">{t.footer_tagline}</p>
          <p className="text-xs text-muted-foreground/60">© 2026 Nuju. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
