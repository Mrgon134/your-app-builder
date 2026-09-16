import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  Volume2,
  VolumeX,
  Sparkles,
  CheckCircle2,
  RotateCcw,
  Eye,
  Hand,
  Headphones,
  Flower2,
  Heart,
  ChevronRight,
  ShieldCheck,
  Feather,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import SEOHead from "@/components/SEOHead";
import AdSenseBanner from "@/components/AdSenseBanner";
import AppStoreCta from "@/components/AppStoreCta";
import { toast } from "sonner";

export type GroundingLang = "en" | "id" | "de" | "fr" | "es";

interface GroundingStep {
  step: number;
  count: number;
  icon: typeof Eye;
  sensory: string;
  title: Record<GroundingLang, string>;
  instructions: Record<GroundingLang, string>;
  examples: Record<GroundingLang, string[]>;
}

const GROUNDING_STEPS: GroundingStep[] = [
  {
    step: 1,
    count: 5,
    icon: Eye,
    sensory: "sight",
    title: {
      en: "5 Things You Can See",
      id: "5 Hal yang Bisa Anda Lihat",
      de: "5 Dinge, die du sehen kannst",
      fr: "5 choses que vous pouvez voir",
      es: "5 cosas que puedes ver",
    },
    instructions: {
      en: "Look around your space slowly. Find 5 distinct visual details: a specific color, a pattern on the wall, a reflection of light, or an everyday object.",
      id: "Lihatlah sekeliling ruangan dengan tenang. Temukan 5 objek nyata: bayangan cahaya, motif dinding, sudut meja, atau warna tertentu.",
      de: "Blicke dich langsam um. Finde 5 konkrete visuelle Details: eine Lichtreflexion, ein Muster, eine Kontur oder einen Gegenstand.",
      fr: "Regardez lentement autour de vous. Repérez 5 détails précis: un reflet de lumière, une texture murale ou un objet du quotidien.",
      es: "Observa despacio tu alrededor. Identifica 5 detalles concretos: un reflejo de luz, un color particular o un objeto cercano.",
    },
    examples: {
      en: ["A reflection on glass", "The grain of wooden desk", "A patch of shadow", "A green houseplant", "The shape of a mug"],
      id: ["Pantulan cahaya di kaca", "Tekstur serat kayu meja", "Garis bayangan di lantai", "Warna tanaman hias", "Bentuk cangkir kopi"],
      de: ["Spiegelung auf Glas", "Holzmaserung des Tisches", "Ein Schatten an der Wand", "Grüne Zimmerpflanze", "Form einer Kaffeetasse"],
      fr: ["Reflet sur une vitre", "Grain du bois d'une table", "Une ombre sur le mur", "Une plante verte", "La forme d'une tasse"],
      es: ["Reflejo en la ventana", "Veta de madera de la mesa", "Una sombra en el suelo", "Una planta de interior", "La forma de una taza"],
    },
  },
  {
    step: 2,
    count: 4,
    icon: Hand,
    sensory: "touch",
    title: {
      en: "4 Things You Can Physically Feel",
      id: "4 Hal yang Bisa Anda Raba / Rasakan",
      de: "4 Dinge, die du spüren kannst",
      fr: "4 choses que vous pouvez toucher",
      es: "4 cosas que puedes tocar o sentir",
    },
    instructions: {
      en: "Notice tactile sensations in your body right now: the weight of your feet on the floor, texture of clothing, coolness of air on your skin, or back against the chair.",
      id: "Arahkan perhatian ke sensasi fisik tubuh: pijakan telapak kaki di lantai, tekstur baju yang Anda kenakan, sandaran kursi, atau suhu sejuk udara.",
      de: "Achte auf körperliche Berührungen: das Gewicht der Füße am Boden, der Stoff deiner Kleidung, kühle Luft oder die Stuhllehne.",
      fr: "Portez attention aux sensations tactiles: le contact des pieds au sol, la texture de votre vêtement ou l'appui du dossier.",
      es: "Siente el contacto físico: la firmeza de tus pies en el suelo, la textura de tu ropa o la temperatura del aire en tu piel.",
    },
    examples: {
      en: ["Feet planted on floor", "Texture of your denim/shirt", "Firmness of seat cushion", "Cool breeze on palms"],
      id: ["Kaki menapak kokoh di lantai", "Serat kain baju yang dipakai", "Empuknya bantalan kursi", "Hawa sejuk di telapak tangan"],
      de: ["Füße fest am Boden", "Stoff deiner Kleidung", "Halt der Stuhllehne", "Kühle Luft an den Händen"],
      fr: ["Pieds ancrés dans le sol", "Douceur de votre vêtement", "Soutien de votre siège", "Air frais sur vos mains"],
      es: ["Pies apoyados en el suelo", "Tejido de tu camisa", "Soporte de la silla", "Frescor del aire en las manos"],
    },
  },
  {
    step: 3,
    count: 3,
    icon: Headphones,
    sensory: "hearing",
    title: {
      en: "3 Things You Can Hear",
      id: "3 Suara yang Bisa Anda Dengar",
      de: "3 Geräusche, die du hören kannst",
      fr: "3 sons que vous pouvez entendre",
      es: "3 sonidos que puedes escuchar",
    },
    instructions: {
      en: "Close your eyes for 5 seconds and listen beyond the room: traffic outside, the hum of an air conditioner, a ticking clock, or your own slow breath.",
      id: "Tutup mata sejenak selama 5 detik. Dengarkan suara sekitar: desau angin pendingin ruangan, kendaraan sayup di kejauhan, atau tarikan napas Anda.",
      de: "Lausche aufmerksam in die Umgebung: das Summen eines Lüfters, entfernter Straßenlärm, das Ticken einer Uhr oder dein Atem.",
      fr: "Fermez les yeux 5 secondes et écoutez attentivement: un moteur lointain, le souffle de la ventilation ou votre respiration.",
      es: "Cierra los ojos 5 segundos y atiende a los sonidos: el zumbido de un aparato, el rumor lejano de la calle o tu respiración.",
    },
    examples: {
      en: ["The hum of refrigerator/AC", "Distant street sounds", "The rhythm of your breathing"],
      id: ["Desau hembusan pendingin ruangan", "Suara sayup kendaraan luar", "Irama tarikan napas Anda sendiri"],
      de: ["Kühlschrank-/Lüftersummen", "Entfernter Straßenverkehr", "Der Rhythmus deines Atems"],
      fr: ["Le bourdonnement d'un appareil", "Bruits de pas ou de circulation", "Le souffle de votre respiration"],
      es: ["El zumbido del aire acondicionado", "Sonido lejano del tráfico", "El ritmo de tu propia respiración"],
    },
  },
  {
    step: 4,
    count: 2,
    icon: Flower2,
    sensory: "smell",
    title: {
      en: "2 Things You Can Smell",
      id: "2 Aroma yang Bisa Anda Cium",
      de: "2 Gerüche, die du riechen kannst",
      fr: "2 odeurs que vous pouvez sentir",
      es: "2 aromas que puedes oler",
    },
    instructions: {
      en: "Inhale gently through your nose. Notice any subtle ambient scent: coffee, soap on your hands, fresh rain, paper, or the smell of your sweater.",
      id: "Tarik napas lembut melalui hidung. Sadari aroma tipis di sekitar: aroma pakaian bersih, wangi sabun tangan, kopi, atau udara segar.",
      de: "Atme sanft durch die Nase ein. Nimm subtile Düfte wahr: Kaffee, Seifengeruch an deinen Händen, frische Luft oder Papier.",
      fr: "Inspirez doucement par le nez. Captez les effluves discrets: savon sur vos mains, une odeur de café ou l'air frais.",
      es: "Inhala suavemente por la nariz. Percibe algún aroma sutil: jabón en tus manos, café recién hecho o el aire de la sala.",
    },
    examples: {
      en: ["Scent of clean laundry/sweater", "Soap on your wrists"],
      id: ["Wangi pakaian atau baju hangat", "Aroma sabun lembut di pergelangan tangan"],
      de: ["Duft frisch gewaschener Kleidung", "Seifenduft an den Handgelenken"],
      fr: ["Odeur de votre vêtement propre", "Parfum discret d'un savon"],
      es: ["Aroma a ropa limpia", "Olor sutil a jabón en tus muñecas"],
    },
  },
  {
    step: 5,
    count: 1,
    icon: Heart,
    sensory: "taste_gratitude",
    title: {
      en: "1 Thing You Savor or Appreciate",
      id: "1 Hal yang Anda Syukuri / Nikmati",
      de: "1 Sache, die du schätzt oder schmeckst",
      fr: "1 chose que vous savourez ou appréciez",
      es: "1 cosa que saboreas o agradeces",
    },
    instructions: {
      en: "Notice any residual taste in your mouth (mint, water, tea), or rest your hand on your heart and name 1 safe truth you are deeply grateful for right now.",
      id: "Sadari rasa di lidah (air putih, mint, teh), atau letakkan tangan di dada dan sebutkan 1 hal baik yang Anda syukuri dengan tulus saat ini.",
      de: "Spüre einen Geschmack im Mund (Wasser, Tee, Minze) oder lege die Hand aufs Herz und benenne eine Sache, für die du dankbar bist.",
      fr: "Percevez le goût dans votre bouche (eau, thé, menthe) ou posez une main sur le cœur et nommez 1 chose précieuse pour vous.",
      es: "Siente el sabor en tu boca (agua, té, menta) o posa la mano en tu pecho y reconoce 1 motivo de gratitud sincera en este instante.",
    },
    examples: {
      en: ["The steady warmth inside your chest right now"],
      id: ["Rasa hangat dan napas aman di dalam dada Anda saat ini"],
      de: ["Die ruhige Wärme in deiner Brust in diesem Augenblick"],
      fr: ["La chaleur tranquille dans votre poitrine en cet instant"],
      es: ["La calidez serena en tu pecho en este mismo instante"],
    },
  },
];

const SensoryGroundingLab: React.FC = () => {
  const [lang, setLang] = useState<GroundingLang>("en");
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [checkedItems, setCheckedItems] = useState<Record<number, boolean[]>>({
    1: [false, false, false, false, false],
    2: [false, false, false, false],
    3: [false, false, false],
    4: [false, false],
    5: [false],
  });
  const [isAudioEnabled, setIsAudioEnabled] = useState(true);
  const [isCompleted, setIsCompleted] = useState(false);

  const audioCtxRef = useRef<AudioContext | null>(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentStepIndex, isCompleted]);

  // Pure Web Audio Chime Synthesis (Zero MP3 files)
  const playHarmonicChime = (pitchFactor: number = 1.0) => {
    if (!isAudioEnabled) return;
    try {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (!audioCtxRef.current) {
        audioCtxRef.current = new AudioContextClass();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === "suspended") {
        ctx.resume();
      }

      const now = ctx.currentTime;

      // Base Frequency (528 Hz Solfeggio Root scaled)
      const baseFreq = 528 * pitchFactor;

      // Primary Gentle Sine
      const osc1 = ctx.createOscillator();
      const gain1 = ctx.createGain();
      osc1.type = "sine";
      osc1.frequency.setValueAtTime(baseFreq, now);

      gain1.gain.setValueAtTime(0.001, now);
      gain1.gain.exponentialRampToValueAtTime(0.18, now + 0.04);
      gain1.gain.exponentialRampToValueAtTime(0.0001, now + 1.2);

      osc1.connect(gain1);
      gain1.connect(ctx.destination);
      osc1.start(now);
      osc1.stop(now + 1.2);

      // Bell Harmonic Overtone (Double Frequency)
      const osc2 = ctx.createOscillator();
      const gain2 = ctx.createGain();
      osc2.type = "sine";
      osc2.frequency.setValueAtTime(baseFreq * 2, now);

      gain2.gain.setValueAtTime(0.001, now);
      gain2.gain.exponentialRampToValueAtTime(0.06, now + 0.02);
      gain2.gain.exponentialRampToValueAtTime(0.0001, now + 0.8);

      osc2.connect(gain2);
      gain2.connect(ctx.destination);
      osc2.start(now);
      osc2.stop(now + 0.8);
    } catch (e) {
      console.warn("Web Audio chime synthesis not supported", e);
    }
  };

  const currentStep = GROUNDING_STEPS[currentStepIndex];
  const stepChecks = checkedItems[currentStep.step] || [];
  const allCurrentChecked = stepChecks.every(Boolean);

  const toggleCheck = (idx: number) => {
    const updated = [...stepChecks];
    updated[idx] = !updated[idx];
    setCheckedItems((prev) => ({ ...prev, [currentStep.step]: updated }));

    if (updated[idx]) {
      // Play uplifting ascending pitch per item
      playHarmonicChime(0.85 + idx * 0.12);
    }
  };

  const handleNextStep = () => {
    playHarmonicChime(1.5);
    if (currentStepIndex < GROUNDING_STEPS.length - 1) {
      setCurrentStepIndex((prev) => prev + 1);
    } else {
      setIsCompleted(true);
    }
  };

  const handleReset = () => {
    setCheckedItems({
      1: [false, false, false, false, false],
      2: [false, false, false, false],
      3: [false, false, false],
      4: [false, false],
      5: [false],
    });
    setCurrentStepIndex(0);
    setIsCompleted(false);
  };

  const metaTitles: Record<GroundingLang, string> = {
    en: "5-4-3-2-1 Sensory Grounding Lab | Anxiety & Panic Reset Tool",
    id: "Teknik Grounding 5-4-3-2-1 Interaktif | Redakan Cemas & Panik Cepat",
    de: "5-4-3-2-1 Erdungs-Übung | Soforthilfe bei Panikattacken & Angst",
    fr: "Méthode d'Ancrage 5-4-3-2-1 en Ligne | Calmer l'Angoisse et la Panique",
    es: "Técnica de Enraizamiento 5-4-3-2-1 | Calmar la Ansiedad y Pánico",
  };

  const metaDescriptions: Record<GroundingLang, string> = {
    en: "Clinically proven interactive 5-4-3-2-1 somatic grounding tool. Reset your nervous system with step-by-step visual, tactile, and auditory sensory anchors with calming synthesized sound chimes.",
    id: "Latihan somatik interaktif 5-4-3-2-1 untuk mengatasi serangan panik, kecemasan akut, dan dissociative freeze secara bertahap dengan chime solfeggio murni.",
    de: "Interaktives 5-4-3-2-1 Erdungstool zur Beruhigung des Nervensystems bei akutem Stress, Überforderung oder Panik. Mit sanften Klangchimes.",
    fr: "Outil interactif d'ancrage somatique 5-4-3-2-1. Régulez votre système nerveux étape par étape grâce à vos 5 sens et des carillons harmoniques apaisants.",
    es: "Herramienta interactiva de grounding somático 5-4-3-2-1 para apaciguar ataques de pánico y sobrecarga sensorial con campanas relajantes.",
  };

  const webAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: metaTitles[lang],
    description: metaDescriptions[lang],
    applicationCategory: "HealthApplication",
    operatingSystem: "Any",
    browserRequirements: "Requires JavaScript and HTML5 Web Audio support",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "How does the 5-4-3-2-1 grounding technique calm panic attacks?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "The 5-4-3-2-1 method engages the prefrontal cortex and activates the ventral vagal parasympathetic branch of the nervous system. By systematically redirecting attention to tangible sensory data in the present moment, it signals to the amygdala that there is no immediate physical threat, stopping panic spirals.",
        },
      },
      {
        "@type": "Question",
        name: "When should I use this sensory grounding tool?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Use this tool whenever you experience racing thoughts, hyperventilation, sensory overload from ADHD/HSP, emotional numbness (dissociation), or difficulty falling asleep.",
        },
      },
    ],
  };

  return (
    <>
      <SEOHead
        title={metaTitles[lang]}
        description={metaDescriptions[lang]}
        keywords={[
          "5-4-3-2-1 grounding technique",
          "somatic sensory grounding",
          "panic attack reset",
          "teknik grounding 54321 indonesia",
          "5-4-3-2-1 erdungsübung deutsch",
          "ancrage somatique 5-4-3-2-1",
          "tecnica 5 4 3 2 1 ansiedad",
        ]}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="min-h-screen bg-background text-foreground flex flex-col items-center px-4 py-8 md:py-12 selection:bg-teal-500/20">
        <div className="w-full max-w-2xl">
          {/* Top Header */}
          <div className="flex items-center justify-between mb-6">
            <Link
              to="/quiz"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>{lang === "id" ? "Semua Alat" : "All Tools"}</span>
            </Link>

            <div className="flex items-center gap-2">
              {/* Sound Toggle */}
              <button
                onClick={() => setIsAudioEnabled(!isAudioEnabled)}
                className={`p-2 rounded-xl border transition-colors ${
                  isAudioEnabled
                    ? "bg-teal-500/20 text-teal-400 border-teal-500/40"
                    : "bg-muted/30 text-muted-foreground border-border/40"
                }`}
                title={isAudioEnabled ? "Mute chimes" : "Enable chimes"}
              >
                {isAudioEnabled ? (
                  <Volume2 className="w-4 h-4" />
                ) : (
                  <VolumeX className="w-4 h-4" />
                )}
              </button>

              {/* Language Switcher */}
              <div className="flex items-center gap-1 bg-muted/30 p-1 rounded-xl border border-border/40 backdrop-blur-sm text-xs font-semibold">
                {(["en", "id", "de", "fr", "es"] as GroundingLang[]).map((l) => (
                  <button
                    key={l}
                    onClick={() => setLang(l)}
                    className={`px-2.5 py-1 rounded-lg uppercase tracking-wider transition-all ${
                      lang === l
                        ? "bg-teal-500/20 text-teal-300 border border-teal-500/30"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {l === "en"
                      ? "EN 🇬🇧"
                      : l === "id"
                      ? "ID 🇮🇩"
                      : l === "de"
                      ? "DE 🇩🇪"
                      : l === "fr"
                      ? "FR 🇫🇷"
                      : "ES 🇪🇸"}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* AdSense Top Banner */}
          <div className="mb-6">
            <AdSenseBanner slot="grounding-top" format="auto" />
          </div>

          {!isCompleted ? (
            /* ================= INTERACTIVE GROUNDING STEP ================= */
            <div className="space-y-6">
              {/* Step indicator pills */}
              <div className="flex items-center justify-between gap-1.5">
                {GROUNDING_STEPS.map((s, idx) => {
                  const isPast = idx < currentStepIndex;
                  const isCurrent = idx === currentStepIndex;
                  return (
                    <div
                      key={s.step}
                      className={`flex-1 h-2 rounded-full transition-all duration-300 ${
                        isCurrent
                          ? "bg-teal-400 shadow-sm shadow-teal-400/50"
                          : isPast
                          ? "bg-teal-500/40"
                          : "bg-muted/40"
                      }`}
                    />
                  );
                })}
              </div>

              {/* Step Card */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStep.step}
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.3 }}
                  className="p-6 md:p-8 rounded-3xl bg-card/60 backdrop-blur-xl border border-teal-500/25 shadow-2xl shadow-teal-950/20 space-y-6 relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500/10 rounded-full blur-3xl pointer-events-none -mr-16 -mt-16" />

                  {/* Header Badge */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-10 h-10 rounded-2xl bg-teal-500/15 text-teal-400 border border-teal-500/30 flex items-center justify-center font-black text-lg">
                        {currentStep.count}
                      </div>
                      <span className="text-xs font-bold uppercase tracking-widest text-teal-400">
                        {lang === "id"
                          ? `Langkah ${currentStep.step} dari 5`
                          : `Step ${currentStep.step} of 5`}
                      </span>
                    </div>

                    <div className="text-xs font-semibold text-muted-foreground">
                      {stepChecks.filter(Boolean).length} / {currentStep.count}{" "}
                      {lang === "id" ? "ditemukan" : "grounded"}
                    </div>
                  </div>

                  <div>
                    <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-foreground">
                      {currentStep.title[lang]}
                    </h2>
                    <p className="text-sm md:text-base text-muted-foreground mt-2 leading-relaxed">
                      {currentStep.instructions[lang]}
                    </p>
                  </div>

                  {/* Interactive Checklist Anchors */}
                  <div className="space-y-3 pt-2">
                    {stepChecks.map((isChecked, idx) => {
                      const exampleLabel =
                        currentStep.examples[lang][idx] ||
                        `${lang === "id" ? "Titik fokus" : "Sensory anchor"} #${idx + 1}`;
                      return (
                        <motion.button
                          key={idx}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => toggleCheck(idx)}
                          className={`w-full p-4 rounded-2xl text-left font-medium transition-all flex items-center justify-between border ${
                            isChecked
                              ? "bg-teal-500/15 border-teal-500/50 text-foreground shadow-sm"
                              : "bg-muted/15 border-border/40 hover:bg-muted/30 text-muted-foreground hover:text-foreground"
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div
                              className={`w-6 h-6 rounded-full border flex items-center justify-center transition-colors ${
                                isChecked
                                  ? "bg-teal-500 border-teal-500 text-slate-950 font-bold"
                                  : "border-muted-foreground/40 bg-background/50"
                              }`}
                            >
                              {isChecked && <CheckCircle2 className="w-4 h-4" />}
                            </div>
                            <span className="text-sm md:text-base">
                              {exampleLabel}
                            </span>
                          </div>

                          <span className="text-xs font-semibold text-teal-400/80">
                            {isChecked
                              ? lang === "id"
                                ? "Tersadar"
                                : "Anchored"
                              : lang === "id"
                              ? "Ketuk untuk jangkar"
                              : "Tap to anchor"}
                          </span>
                        </motion.button>
                      );
                    })}
                  </div>

                  {/* Advance CTA */}
                  <div className="pt-4 border-t border-border/40 flex items-center justify-between">
                    {currentStepIndex > 0 ? (
                      <button
                        onClick={() => setCurrentStepIndex((prev) => prev - 1)}
                        className="text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors"
                      >
                        ← {lang === "id" ? "Langkah Sebelumnya" : "Previous Step"}
                      </button>
                    ) : <div />}

                    <button
                      onClick={handleNextStep}
                      disabled={!allCurrentChecked}
                      className={`py-3 px-6 rounded-xl font-bold text-sm flex items-center gap-2 transition-all ${
                        allCurrentChecked
                          ? "bg-gradient-to-r from-teal-500 to-emerald-500 text-slate-950 shadow-lg shadow-teal-500/25 hover:from-teal-400 hover:to-emerald-400 cursor-pointer"
                          : "bg-muted/40 text-muted-foreground border border-border/40 opacity-60 cursor-not-allowed"
                      }`}
                    >
                      <span>
                        {currentStepIndex === GROUNDING_STEPS.length - 1
                          ? lang === "id"
                            ? "Selesaikan Grounding"
                            : "Complete Grounding"
                          : lang === "id"
                          ? "Lanjut ke Langkah Berikutnya"
                          : "Next Sensory Anchor"}
                      </span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Mid banner */}
              <div className="pt-2">
                <AdSenseBanner slot="grounding-mid" format="auto" />
              </div>
            </div>
          ) : (
            /* ================= COMPLETION SCREEN ================= */
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="space-y-6"
            >
              <div className="p-6 md:p-8 rounded-3xl bg-card/70 backdrop-blur-xl border border-teal-500/30 shadow-2xl shadow-teal-950/20 space-y-6 text-center relative overflow-hidden">
                <div className="w-16 h-16 rounded-full bg-teal-500/20 border border-teal-500/40 text-teal-400 flex items-center justify-center mx-auto mb-2">
                  <ShieldCheck className="w-8 h-8" />
                </div>

                <div>
                  <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-foreground">
                    {lang === "id"
                      ? "Sistem Saraf Anda Telah Berlabuh"
                      : "Your Nervous System is Grounded"}
                  </h1>
                  <p className="text-sm md:text-base text-teal-300/90 font-medium mt-2 leading-relaxed">
                    {lang === "id"
                      ? "Anda berhasil mengaktifkan saraf vagus ventral dan kembali ke realitas fisik yang aman saat ini."
                      : "You have successfully reactivated your ventral vagal brake and returned to safe physical reality."}
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-teal-500/10 border border-teal-500/20 text-left space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-teal-400 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>
                      {lang === "id"
                        ? "Catatan Pemulihan Somatik"
                        : "Somatic Integration Notes"}
                    </span>
                  </h4>
                  <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
                    {lang === "id"
                      ? "Perhatikan penurunan detak jantung dan rileksnya otot bahu Anda. Napas panjang alami menandakan sistem saraf Anda tidak lagi berada dalam ancaman."
                      : "Notice the drop in resting heart rate and the softening in your jaw and shoulders. A spontaneous deep sigh confirms your amygdala has de-escalated."}
                  </p>
                </div>

                {/* CTAs */}
                <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                  <Link
                    to="/app"
                    className="flex-1 min-w-[200px] py-3.5 px-6 rounded-xl bg-teal-500 hover:bg-teal-600 text-slate-950 font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-teal-500/25 transition-all"
                  >
                    <Feather className="w-4 h-4" />
                    <span>
                      {lang === "id"
                        ? "Tulis Refleksi di Jurnal Ju"
                        : "Journal Your Calm in Ju"}
                    </span>
                  </Link>

                  <button
                    onClick={handleReset}
                    className="py-3.5 px-6 rounded-xl bg-muted/40 hover:bg-muted/70 text-foreground font-semibold text-sm border border-border/50 flex items-center gap-2 transition-colors"
                  >
                    <RotateCcw className="w-4 h-4 text-muted-foreground" />
                    <span>{lang === "id" ? "Ulangi Latihan" : "Repeat Exercise"}</span>
                  </button>
                </div>
              </div>

              {/* Somatic Tools Cross-Links */}
              <div className="p-6 rounded-3xl bg-muted/20 border border-border/40 space-y-4">
                <h3 className="font-bold text-base text-foreground flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-teal-400" />
                  <span>
                    {lang === "id"
                      ? "Eksplorasi Somatik Lanjutan"
                      : "Explore Next Somatic Tools"}
                  </span>
                </h3>
                <div className="grid sm:grid-cols-2 gap-3">
                  <Link
                    to="/tools/bilateral"
                    className="p-4 rounded-2xl bg-card/60 border border-purple-500/20 hover:border-purple-500/40 transition-all flex items-start gap-3 group"
                  >
                    <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center shrink-0">
                      <Eye className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm group-hover:text-purple-400 transition-colors">
                        EMDR Bilateral Lab
                      </h4>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        Stereo alternating audio & tracking orb for trauma decompression.
                      </p>
                    </div>
                  </Link>

                  <Link
                    to="/soundscapes"
                    className="p-4 rounded-2xl bg-card/60 border border-cyan-500/20 hover:border-cyan-500/40 transition-all flex items-start gap-3 group"
                  >
                    <div className="w-10 h-10 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center shrink-0">
                      <Headphones className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm group-hover:text-cyan-400 transition-colors">
                        Ju Sound Sanctuary
                      </h4>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        Brown noise, rain & 528Hz alpha wave entrainment.
                      </p>
                    </div>
                  </Link>
                </div>
              </div>

              {/* App CTA */}
              <AppStoreCta />
            </motion.div>
          )}
        </div>
      </div>
    </>
  );
};

export default SensoryGroundingLab;
