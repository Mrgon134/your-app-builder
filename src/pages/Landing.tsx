import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLang } from "@/lib/i18n";
import { useGeoPricing } from "@/hooks/use-geo-pricing";
import { Crosshair, PenLine, BrainCircuit, Check, Shield, Zap, Heart, Star, Quote, Globe, Download, BellRing, Smartphone, LifeBuoy, ArrowRight, Sparkles } from "lucide-react";
import juMain from "@/assets/ju-main.webp";
import { toast } from "sonner";

const useReveal = <T extends HTMLElement = HTMLDivElement>() => {
  const ref = useRef<T>(null);
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
  const geo = useGeoPricing();
  const weeklyPrice = (amount: number) => geo.formatPrice(Math.round((amount / 4.345) * 100) / 100);
  const heroReveal = useReveal();
  const socialReveal = useReveal();
  const stepsReveal = useReveal();
  const comparisonReveal = useReveal();
  const testimonialsReveal = useReveal();
  const pricingReveal = useReveal<HTMLElement>();
  const ctaReveal = useReveal();
  const advancedFeaturesReveal = useReveal();
  const pricingSectionRef = useRef<HTMLElement>(null);

  const scrollToPricing = () => pricingSectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });

  const testimonials = [
    { name: "Sarah K.", role: "Designer", text: "Nuju helped me understand why Mondays felt so heavy. Now I have a plan for it.", rating: 5 },
    { name: "Rafi A.", role: "Student", text: "Ju feels like a friend who actually gets it. I journal every single night now.", rating: 5 },
    { name: "Maya L.", role: "Product Manager", text: "The relationship mood map blew my mind. I didn't realize how much my team dynamics affected me.", rating: 5 },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* 1. Navbar */}
      <nav className="sticky top-0 z-50 backdrop-blur-xl bg-background/80 border-b border-border/50">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img src={juMain} alt="Ju" className="w-8 h-8" width={32} height={32} />
            <span className="font-serif text-xl font-bold text-foreground">Nuju</span>
          </div>
          <button
            onClick={() => navigate("/auth")}
            className="px-5 py-2.5 rounded-full bg-primary text-primary-foreground text-sm font-semibold transition-all hover:shadow-lg hover:shadow-primary/25 active:scale-[0.97]"
          >
            Start for Free
          </button>
        </div>
      </nav>

      {/* 2. Hero + Waitlist */}
      <section
        ref={heroReveal.ref}
        className={`relative overflow-hidden pt-16 pb-20 px-4 transition-all duration-700 ${heroReveal.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
      >
        <div className="max-w-3xl mx-auto text-center">
          <div className="relative w-32 h-32 mx-auto mb-8">
            <div className="absolute inset-0 rounded-full bg-primary/20 animate-glow-pulse" />
            <img src={juMain} alt="Ju mascot" className="relative w-full h-full object-contain animate-ju-float" width={128} height={128} fetchPriority="high" />
          </div>
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-primary/8 px-4 py-2 text-sm font-medium text-primary mb-6">
            <Sparkles className="w-4 h-4" />
            {t.hero_badge_v2 || "Start free in 30 seconds"}
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-foreground leading-[1.1] mb-6 text-balance">
            {t.hero_title_v2 || t.hero_title}
          </h1>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto mb-10 text-pretty">
            {t.hero_subtitle_v2 || t.hero_subtitle}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
            <button
              onClick={() => navigate("/auth")}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-primary text-primary-foreground font-semibold text-lg transition-all hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-0.5 active:scale-[0.97]"
            >
              Start Journaling — It's Free
            </button>
            <button
              onClick={scrollToPricing}
              className="inline-flex items-center gap-2 px-6 py-4 rounded-2xl border border-border bg-card text-foreground font-semibold text-base transition-all hover:border-primary/30 hover:bg-primary/[0.04] active:scale-[0.97]"
            >
              {t.hero_secondary_cta || "See plans first"}
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
          <p className="text-sm text-muted-foreground mt-4 font-medium">
            {t.hero_microcopy_v2 || "No credit card required. Start free, keep journaling, upgrade only if it helps."}
          </p>
          <div className="grid sm:grid-cols-3 gap-3 mt-8 max-w-3xl mx-auto">
            {[
              { label: t.hero_trust_1 || "No credit card to start", icon: Shield },
              { label: t.hero_trust_2 || "Voice + AI insights when you want more", icon: BrainCircuit },
              { label: t.hero_trust_3 || "Designed to feel useful from day one", icon: Heart },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <div
                  key={i}
                  className="flex items-center justify-center gap-2 rounded-2xl border border-border/60 bg-card/70 px-4 py-3 text-sm text-foreground shadow-sm"
                >
                  <Icon className="w-4 h-4 text-primary" />
                  <span>{item.label}</span>
                </div>
              );
            })}
          </div>

          {/* App Preview Mockup */}
          <div className="relative w-full max-w-4xl mx-auto mt-16 sm:mt-24 px-2 sm:px-0">
            {/* Decorative blurs */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4/5 h-4/5 bg-primary/20 blur-[120px] rounded-full pointer-events-none" />
            
            <div className="relative rounded-[2.5rem] bg-card/60 backdrop-blur-3xl border border-border/50 shadow-2xl overflow-hidden min-h-[400px] flex flex-col md:flex-row p-6 sm:p-10 gap-8">
              
              {/* Left Column: Voice Journaling Mock */}
              <div className="flex-1 flex flex-col gap-4">
                <div className="flex items-center gap-3 mb-2 px-2">
                  <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center shadow-inner">
                    <img src={juMain} alt="Ju" className="w-[26px] h-[26px]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground text-lg">Voice Journal</h3>
                    <p className="text-xs text-muted-foreground font-medium">Recording safe & secure...</p>
                  </div>
                </div>
                
                <div className="glass-card rounded-[2rem] p-6 flex flex-col items-center justify-center flex-1 min-h-[240px] border border-primary/15 relative overflow-hidden shadow-sm">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent" />
                  <div className="w-20 h-20 rounded-full bg-primary flex items-center justify-center shadow-xl shadow-primary/30 mb-8 relative z-10 animate-pulse">
                    <div className="absolute inset-0 rounded-full bg-primary animate-ping opacity-30" style={{ animationDuration: '2s' }}></div>
                    <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                    </svg>
                  </div>
                  
                  {/* Fake waveform */}
                  <div className="flex items-center gap-[3px] z-10 h-8">
                    {[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15].map(i => (
                      <div 
                        key={i} 
                        className="w-[4px] rounded-full bg-primary/40" 
                        style={{ 
                          height: `${20 + Math.random() * 80}%`, 
                          animation: `typing-dots 1.5s ease-in-out infinite alternate`,
                          animationDelay: `${i * 0.1}s` 
                        }} 
                      />
                    ))}
                  </div>
                  <p className="text-sm font-medium text-foreground mt-8 z-10 px-4 text-center italic opacity-80">
                    "Honestly, today was overwhelming but writing this down helps..."
                  </p>
                </div>
              </div>

              {/* Right Column: AI Memory Mock */}
              <div className="flex-1 flex flex-col gap-5 mt-6 md:mt-12 justify-center">
                <div className="glass-card rounded-[2rem] p-6 border border-border shadow-lg shadow-black/5 transform transition-all hover:-translate-y-1 bg-gradient-to-br from-card to-card/50">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-9 h-9 rounded-xl bg-[#4ECDC4]/20 flex items-center justify-center">
                      <BrainCircuit className="w-4.5 h-4.5 text-[#4ECDC4]" />
                    </div>
                    <span className="text-xs font-bold text-[#4ECDC4] tracking-wider uppercase">Ju Remembers</span>
                  </div>
                  <div className="border-l-[3px] border-[#4ECDC4]/40 pl-4 py-1">
                    <p className="text-base font-writing text-foreground leading-relaxed italic opacity-90">
                      "You tend to reflect more when you're feeling anxious. That's a powerful and healthy outlet. Keep going, I'm here for you."
                    </p>
                  </div>
                </div>

                <div className="glass-card rounded-[2rem] p-5 border border-border/50 opacity-90 scale-95 origin-top ml-4 bg-gradient-to-r from-card/80 to-transparent">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-7 h-7 rounded-lg bg-[#FFD166]/20 flex items-center justify-center">
                      <Star className="w-3.5 h-3.5 text-[#FFD166]" />
                    </div>
                    <span className="text-[11px] font-bold text-foreground/80 tracking-wider uppercase">Mood Pattern</span>
                  </div>
                  <div className="flex gap-1.5 w-full mb-3">
                    {/* Simulated pixel grid */}
                    {[1,2,3,4,5,6,7].map(i => (
                      <div key={i} className={`h-8 flex-1 rounded-md ${i > 4 ? 'bg-primary' : i > 2 ? 'bg-[#4ECDC4]' : 'bg-muted'} opacity-${20 + (i*10)}`}></div>
                    ))}
                  </div>
                  <p className="text-xs text-muted-foreground font-medium">Your mood trend is glowing up this week! ✨</p>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* 3. Social Proof */}
      <section
        ref={socialReveal.ref}
        className={`py-12 px-4 transition-all duration-700 ${socialReveal.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
      >
        <div className="max-w-3xl mx-auto flex flex-wrap items-center justify-center gap-6 sm:gap-10">
          {[
            { icon: Shield, label: "Privacy-first", sublabel: "Your data stays yours" },
            { icon: Zap, label: "30 seconds", sublabel: "To journal daily" },
            { icon: Heart, label: "AI-powered", sublabel: "Insights that matter" },
            { icon: Smartphone, label: "Install Anywhere", sublabel: "PWA ready app" },
          ].map((badge, i) => {
            const Icon = badge.icon;
            return (
              <div
                key={i}
                className="flex items-center gap-3 transition-all duration-500"
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">{badge.label}</p>
                  <p className="text-xs text-muted-foreground">{badge.sublabel}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. How it works — 3 Steps */}
      <section ref={stepsReveal.ref} className="py-20 px-4 bg-secondary/30">
        <div className="max-w-4xl mx-auto">
          <h2 className={`font-serif text-3xl font-bold text-center mb-16 transition-all duration-700 delay-100 ${stepsReveal.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
            {t.how_it_works}
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { num: "01", title: t.step_1_title, desc: t.step_1_desc, icon: Crosshair, iconBg: "bg-primary/10", iconColor: "text-primary" },
              { num: "02", title: t.step_2_title, desc: t.step_2_desc, icon: PenLine, iconBg: "bg-mood-good/15", iconColor: "text-mood-good" },
              { num: "03", title: t.step_3_title, desc: t.step_3_desc, icon: BrainCircuit, iconBg: "bg-mood-okay/15", iconColor: "text-mood-okay" },
            ].map((step, i) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.num}
                  className={`text-center p-8 rounded-3xl bg-card shadow-sm shadow-primary/5 transition-all duration-700 ${stepsReveal.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
                  style={{ transitionDelay: `${200 + i * 120}ms` }}
                >
                  <div className={`w-14 h-14 mx-auto rounded-2xl ${step.iconBg} flex items-center justify-center mb-4`}>
                    <Icon className={`w-7 h-7 ${step.iconColor}`} />
                  </div>
                  <div className="text-xs font-bold text-primary tracking-widest uppercase mb-2">{step.num}</div>
                  <h3 className="font-serif text-xl font-semibold mb-3">{step.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{step.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4.5 Advanced Features */}
      <section ref={advancedFeaturesReveal.ref} className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className={`font-serif text-3xl font-bold text-center mb-16 transition-all duration-700 delay-100 ${advancedFeaturesReveal.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
            Empowering Features
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "SOS Mode", desc: "Instant relief for moments of anxiety or low mood. Guided to bring you back to center.", icon: LifeBuoy, iconBg: "bg-red-500/10", iconColor: "text-red-500" },
              { title: "Proactive Care", desc: "Ju checks in when you need it most based on your emotional patterns and habits.", icon: BellRing, iconBg: "bg-blue-500/10", iconColor: "text-blue-500" },
              { title: "Data Export", desc: "Export your entries to TXT format anytime. Your data, completely within your control.", icon: Download, iconBg: "bg-green-500/10", iconColor: "text-green-500" },
              { title: "Install Anywhere", desc: "Add Nuju directly to your home screen for quick, frictionless journaling anywhere.", icon: Smartphone, iconBg: "bg-purple-500/10", iconColor: "text-purple-500" },
            ].map((feat, i) => {
              const Icon = feat.icon;
              return (
                <div
                  key={feat.title}
                  className={`p-6 rounded-3xl bg-card border border-border shadow-sm transition-all duration-700 ${advancedFeaturesReveal.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
                  style={{ transitionDelay: `${200 + i * 100}ms` }}
                >
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${feat.iconBg}`}>
                    <Icon className={`w-6 h-6 ${feat.iconColor}`} />
                  </div>
                  <h3 className="font-serif text-lg font-semibold mb-2">{feat.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{feat.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. Feature Comparison */}
      <section ref={comparisonReveal.ref} className="py-20 px-4">
        <div className={`max-w-3xl mx-auto transition-all duration-700 ${comparisonReveal.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
          <h2 className="font-serif text-3xl font-bold text-center mb-12">
            Why Nuju?
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Feature</th>
                  <th className="py-3 px-4 font-semibold text-primary">Nuju</th>
                  <th className="py-3 px-4 font-medium text-muted-foreground">Paper Journal</th>
                  <th className="py-3 px-4 font-medium text-muted-foreground">Therapy Apps</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Time to journal", "30 sec", "5-15 min", "15-30 min"],
                  ["AI insights", "✓", "✗", "Limited"],
                  ["Mood tracking", "✓", "Manual", "✓"],
                  ["Emergency support", "SOS Mode", "✗", "Crisis Line"],
                  ["Relationship mapping", "✓", "✗", "✗"],
                  ["Coach personas", "4 styles", "✗", "1 generic"],
                  ["Data export", "TXT format", "N/A", "Limited"],
                  ["Cost", "Free start", "Free", "$50-200/mo"],
                ].map(([feature, nuju, paper, therapy], i) => (
                  <tr key={i} className="border-b border-border/50">
                    <td className="py-3 px-4 text-foreground font-medium">{feature}</td>
                    <td className="py-3 px-4 text-center font-semibold text-primary">{nuju}</td>
                    <td className="py-3 px-4 text-center text-muted-foreground">{paper}</td>
                    <td className="py-3 px-4 text-center text-muted-foreground">{therapy}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 6. Testimonials */}
      <section ref={testimonialsReveal.ref} className="py-20 px-4 bg-secondary/30">
        <div className="max-w-4xl mx-auto">
          <h2 className={`font-serif text-3xl font-bold text-center mb-12 transition-all duration-700 ${testimonialsReveal.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
            Loved by early users
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((item, i) => (
              <div
                key={i}
                className={`bg-card rounded-3xl p-6 shadow-sm border border-border/50 transition-all duration-700 ${testimonialsReveal.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
                style={{ transitionDelay: `${200 + i * 120}ms` }}
              >
                <Quote className="w-5 h-5 text-primary/30 mb-3" />
                <p className="text-sm text-foreground leading-relaxed mb-4">{item.text}</p>
                <div className="flex items-center gap-1 mb-3">
                  {Array.from({ length: item.rating }).map((_, j) => (
                    <Star key={j} className="w-3.5 h-3.5 fill-mood-okay text-mood-okay" />
                  ))}
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">{item.name}</p>
                  <p className="text-xs text-muted-foreground">{item.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        ref={(node) => {
          pricingReveal.ref.current = node;
          pricingSectionRef.current = node;
        }}
        className="py-20 px-4"
      >
        <div className="max-w-4xl mx-auto">
          <h2 className={`font-serif text-3xl font-bold text-center mb-4 transition-all duration-700 ${pricingReveal.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
            {t.pricing_title}
          </h2>
          <p className={`text-center text-muted-foreground max-w-2xl mx-auto mb-8 transition-all duration-700 ${pricingReveal.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
            {t.pricing_promise_v2 || "Most people start free. Upgrade only if you want voice journaling, AI memory, and deeper coaching."}
          </p>
          {geo.currency !== "USD" && (
            <div className="flex items-center justify-center gap-1.5 mb-12">
              <Globe className="w-3.5 h-3.5 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">Prices shown in {geo.currency}</span>
            </div>
          )}
          {geo.currency === "USD" && <div className="mb-12" />}
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                name: t.pricing_free,
                price: geo.formatPrice(0),
                period: "/forever",
                weekly: null as string | null,
                button: t.start_free || "Start free",
                badge: null as string | null,
                features: [
                  t.free_feature_1 || "Unlimited journal entries",
                  t.free_feature_2_v2 || "Mood + energy tracking",
                  t.free_feature_4_v2 || "Gentle coach (5 msgs/week)",
                  t.free_feature_3 || "7-day history",
                ],
                highlight: false,
              },
              {
                name: t.pricing_plus,
                price: geo.formatPrice(geo.rates.plusMonthly),
                period: "/month",
                weekly: (t.per_week || "~{price}/week").replace("{price}", weeklyPrice(geo.rates.plusMonthly)),
                button: t.get_plus || "Unlock Plus",
                badge: t.plus_badge || "Best everyday value",
                features: [
                  t.plus_feature_1_v2 || "AI insight after every entry",
                  t.plus_feature_2_v2 || "Unlimited history",
                  t.plus_feature_3_v2 || "30-day mood trends + weekly summaries",
                  t.plus_feature_4_v2 || "All 4 coach personas",
                  t.plus_feature_5_v2 || "Unlimited AI coach chats",
                ],
                highlight: false,
              },
              {
                name: t.pricing_pro,
                price: geo.formatPrice(geo.rates.proMonthly),
                period: "/month",
                weekly: (t.per_week || "~{price}/week").replace("{price}", weeklyPrice(geo.rates.proMonthly)),
                button: t.start_pro_trial_cta || "Start 7-day Pro trial",
                badge: t.pro_trial_badge || "Includes 7-day free trial",
                features: [
                  t.pro_feature_1_v2 || "Everything in Plus",
                  t.pro_feature_2_v2 || "Voice journaling + transcription",
                  t.pro_feature_3_v2 || "AI memory + recurring pattern cards",
                  t.pro_feature_4_v2 || "Relationship mood map",
                  t.pro_feature_5_v2 || "Priority access to new premium features",
                ],
                highlight: true,
              },
            ].map((plan, i) => (
              <div
                key={plan.name}
                className={`relative p-8 rounded-3xl transition-all duration-700 ${plan.highlight ? "bg-primary text-primary-foreground shadow-xl shadow-primary/20 scale-[1.02]" : "bg-card border border-border shadow-sm"} ${pricingReveal.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
                style={{ transitionDelay: `${200 + i * 120}ms` }}
              >
                {plan.badge && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-mood-okay text-xs font-bold text-white">
                    {plan.badge}
                  </div>
                )}
                <h3 className="font-serif text-xl font-semibold mb-2">{plan.name}</h3>
                <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-3xl font-bold">{plan.price === geo.formatPrice(0) ? "Free" : plan.price}</span>
                  {plan.price !== geo.formatPrice(0) && (
                    <span className={`text-sm ${plan.highlight ? "text-primary-foreground/70" : "text-muted-foreground"}`}>{plan.period}</span>
                  )}
                </div>
                {plan.weekly && (
                  <p className={`text-xs mb-6 font-medium ${plan.highlight ? "text-primary-foreground/80" : "text-primary/80"}`}>
                    {plan.weekly}
                  </p>
                )}
                <ul className="space-y-3 mb-8">
                  {plan.features.map((f) => (
                    <li key={f} className={`text-sm flex items-center gap-2 ${plan.highlight ? "text-primary-foreground/90" : "text-muted-foreground"}`}>
                      <Check className={`w-4 h-4 flex-shrink-0 ${plan.highlight ? "text-primary-foreground" : "text-primary"}`} />
                      {f}
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => navigate("/auth")}
                  className={`w-full py-3 rounded-2xl font-semibold text-sm transition-all active:scale-[0.97] ${plan.highlight ? "bg-primary-foreground text-primary hover:shadow-lg" : "bg-secondary text-foreground hover:bg-secondary/80"}`}
                >
                  {plan.button}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. Final CTA */}
      <section ref={ctaReveal.ref} className="py-20 px-4 bg-secondary/30">
        <div className={`max-w-lg mx-auto text-center transition-all duration-700 ${ctaReveal.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
          <img src={juMain} alt="Ju" className="w-20 h-20 mx-auto mb-6 animate-bounce-gentle" />
          <h2 className="font-serif text-3xl font-bold mb-4">{t.cta_final_v2 || t.cta_final}</h2>
          <p className="text-muted-foreground mb-8">{t.cta_final_desc_v2 || t.cta_final_desc}</p>
          <div className="flex justify-center mt-8">
            <button
              onClick={() => navigate("/auth")}
              className="px-8 py-4 rounded-2xl bg-primary text-primary-foreground font-semibold text-lg transition-all hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-0.5 active:scale-[0.97]"
            >
              Start Journaling — It's Free
            </button>
          </div>
          <p className="text-xs text-muted-foreground mt-4">
            {t.hero_microcopy_v2 || "No credit card required. Start free, keep journaling, upgrade only if it helps."}
          </p>
        </div>
      </section>

      {/* 9. Footer */}
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
