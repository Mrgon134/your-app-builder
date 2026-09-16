import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  Play,
  Pause,
  RotateCcw,
  Volume2,
  VolumeX,
  Sparkles,
  Waves,
  Brain,
  Wind,
  ShieldCheck,
  CheckCircle2,
  Info,
  Clock,
  Compass,
  ArrowRight,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import SEOHead from "@/components/SEOHead";
import AdSenseBanner from "@/components/AdSenseBanner";
import AppStoreCta from "@/components/AppStoreCta";
import { toast } from "sonner";

export type NsdrLang = "en" | "id" | "de" | "fr" | "es";
export type NsdrMode = "theta" | "delta" | "gamma";

interface BodyScanStep {
  region: Record<NsdrLang, string>;
  prompt: Record<NsdrLang, string>;
}

const BODY_SCAN_STEPS: BodyScanStep[] = [
  {
    region: {
      en: "Forehead, Jaw & Tongue",
      id: "Dahi, Rahang & Lidah",
      de: "Stirn, Kiefer & Zunge",
      fr: "Front, mâchoire & langue",
      es: "Frente, mandíbula y lengua",
    },
    prompt: {
      en: "Release tension behind your eyes. Unclench your teeth and let your tongue rest loosely on the floor of your mouth.",
      id: "Lepaskan ketegangan di belakang kelopak mata. Kendurkan rahang gigi dan biarkan lidah rileks menyentuh dasar mulut.",
      de: "Lösen Sie die Anspannung hinter den Augen. Entspannen Sie den Kiefer und lassen Sie die Zunge locker ruhen.",
      fr: "Relâchez la tension derrière les yeux. Desserrez la mâchoire et laissez la langue reposer au fond de la bouche.",
      es: "Suelte la tensión detrás de los ojos. Desapriete la mandíbula y deje que la lengua descanse suavemente.",
    },
  },
  {
    region: {
      en: "Neck, Trapezius & Shoulders",
      id: "Leher, Trapezius & Bahu",
      de: "Nacken, Trapez & Schultern",
      fr: "Nuque, trapèzes & épaules",
      es: "Cuello, trapecio y hombros",
    },
    prompt: {
      en: "Allow your shoulders to melt down away from your ears. Feel the contact points of gravity supporting your upper spine.",
      id: "Biarkan bahu Anda turun menjauh dari telinga. Rasakan tarikan gravitasi menopang tulang punggung bagian atas.",
      de: "Lassen Sie die Schultern sinken. Spüren Sie die Schwerkraft, die Ihre obere Wirbelsäule mühelos trägt.",
      fr: "Laissez vos épaules s'affaisser loin des oreilles. Sentez la gravité soutenir le haut de votre dos.",
      es: "Permita que los hombros caigan lejos de las orejas. Sienta la gravedad apoyando la parte superior de su columna.",
    },
  },
  {
    region: {
      en: "Chest, Diaphragm & Heart",
      id: "Dada, Diafragma & Jantung",
      de: "Brustkorb, Zwerchfell & Herz",
      fr: "Poitrine, diaphragme & cœur",
      es: "Pecho, diafragma y corazón",
    },
    prompt: {
      en: "Perform a physiological sigh: two deep inhales through your nose, followed by one long, slow sigh out through your mouth.",
      id: "Lakukan physiological sigh: dua kali hirup napas dalam via hidung, dilanjutkan satu hembusan napas panjang lewat mulut.",
      de: "Physiologischer Seufzer: Zweimal tief durch die Nase einatmen, dann lang und entspannt durch den Mund ausatmen.",
      fr: "Soupir physiologique : deux inspirations profondes par le nez, suivies d'une longue expiration par la bouche.",
      es: "Suspiro fisiológico: dos inhalaciones profundas por la nariz, seguidas de una exhalación lenta por la boca.",
    },
  },
  {
    region: {
      en: "Abdomen & Pelvic Floor",
      id: "Perut & Panggul Bawah",
      de: "Bauch & Beckenboden",
      fr: "Ventre & plancher pelvien",
      es: "Abdomen y suelo pélvico",
    },
    prompt: {
      en: "Let your belly expand softly with no holding or bracing. Your autonomic nervous system is safely entering parasympathetic tone.",
      id: "Biarkan perut mengembang lembut tanpa ditahan. Sistem saraf otonom Anda sedang memasuki mode parasimpatis yang aman.",
      de: "Lassen Sie den Bauch weich werden. Ihr vegetatives Nervensystem schaltet in den erholsamen Parasympathikus.",
      fr: "Laissez votre ventre se détendre librement. Votre système nerveux entre en mode parasympathique réparateur.",
      es: "Deje que su vientre se expanda con suavidad. Su sistema nervioso autónomo entra en estado parasimpático.",
    },
  },
  {
    region: {
      en: "Hips, Legs & Feet",
      id: "Pinggul, Kaki & Telapak Kaki",
      de: "Hüften, Beine & Füße",
      fr: "Hanches, jambes & pieds",
      es: "Caderas, piernas y pies",
    },
    prompt: {
      en: "Feel the weight of your thighs, calves, and heels sinking into the floor or mattress. You have nowhere else you need to be.",
      id: "Rasakan bobot paha, betis, dan tumit tenggelam ke kasur atau lantai. Anda berada di tempat yang tenang dan aman.",
      de: "Spüren Sie das schwere, angenehme Gewicht Ihrer Beine und Fersen. Sie müssen im Moment nichts tun.",
      fr: "Sentez la lourdeur agréable de vos jambes et de vos talons. Rien d'autre ne requiert votre attention.",
      es: "Sienta el peso agradable de sus muslos, pantorrillas y talones hundiéndose. No hay nada más que hacer ahora.",
    },
  },
  {
    region: {
      en: "Whole-Body Somatic Stillness",
      id: "Keheningan Somatik Seluruh Tubuh",
      de: "Ganzkörperliche Tiefenruhe",
      fr: "Immobilité somatique globale",
      es: "Quietud somática total",
    },
    prompt: {
      en: "Maintain passive awareness of sound while your brain waves slow down. Dopamine reserves and neurochemical equilibrium are restoring.",
      id: "Pertahankan kesadaran hening terhadap suara sembari gelombang otak melambat. Cadangan dopamin dan energi seluler sedang terisi kembali.",
      de: "Bleiben Sie passiv gewahr, während sich Ihre Gehirnwellen verlangsamen. Dopamin- und Energiereserven regenerieren sich.",
      fr: "Demeurez dans une conscience passive des sons. Vos ondes cérébrales ralentissent et reconstituent vos réserves de dopamine.",
      es: "Mantenga una atención relajada al sonido mientras sus ondas cerebrales desaceleran y restauran su dopamina.",
    },
  },
];

const NsdrAudioLab: React.FC = () => {
  const [lang, setLang] = useState<NsdrLang>("en");
  const [isPlaying, setIsPlaying] = useState(false);
  const [durationMinutes, setDurationMinutes] = useState<number>(10);
  const [secondsRemaining, setSecondsRemaining] = useState<number>(10 * 60);
  const [volume, setVolume] = useState<number>(0.75);
  const [isMuted, setIsMuted] = useState(false);
  const [mode, setMode] = useState<NsdrMode>("theta");
  const [activeStepIndex, setActiveStepIndex] = useState(0);

  // Web Audio Context & Synthesizer references
  const audioCtxRef = useRef<AudioContext | null>(null);
  const masterGainRef = useRef<GainNode | null>(null);
  const leftOscRef = useRef<OscillatorNode | null>(null);
  const rightOscRef = useRef<OscillatorNode | null>(null);
  const noiseSourceRef = useRef<AudioBufferSourceNode | null>(null);

  // Interval timer ref
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Update secondsRemaining when durationMinutes changes if not playing
  useEffect(() => {
    if (!isPlaying) {
      setSecondsRemaining(durationMinutes * 60);
      setActiveStepIndex(0);
    }
  }, [durationMinutes, isPlaying]);

  // Clean up Audio on unmount
  useEffect(() => {
    return () => {
      stopAudioSynthesis();
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  // Update volume
  useEffect(() => {
    if (masterGainRef.current && audioCtxRef.current) {
      masterGainRef.current.gain.setTargetAtTime(
        isMuted ? 0 : volume,
        audioCtxRef.current.currentTime,
        0.05
      );
    }
  }, [volume, isMuted]);

  // Body scan step progression based on elapsed time
  useEffect(() => {
    const totalSeconds = durationMinutes * 60;
    const elapsed = totalSeconds - secondsRemaining;
    const stepDuration = totalSeconds / BODY_SCAN_STEPS.length;
    const currentStep = Math.min(
      Math.floor(elapsed / stepDuration),
      BODY_SCAN_STEPS.length - 1
    );
    setActiveStepIndex(currentStep);
  }, [secondsRemaining, durationMinutes]);

  const initAudioSynthesis = () => {
    try {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new AudioContextClass();
      audioCtxRef.current = ctx;

      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(isMuted ? 0 : volume, ctx.currentTime);
      masterGain.connect(ctx.destination);
      masterGainRef.current = masterGain;

      // Determine frequency pair based on mode
      // Theta: 108Hz (L) & 114Hz (R) -> 6Hz Theta (Dr. Huberman NSDR standard)
      // Delta: 100Hz (L) & 102.5Hz (R) -> 2.5Hz Delta (Sleep transition)
      // Gamma: 200Hz (L) & 240Hz (R) -> 40Hz Gamma (Cognitive Reset)
      let baseFreq = 108;
      let diff = 6;
      if (mode === "delta") {
        baseFreq = 100;
        diff = 2.5;
      } else if (mode === "gamma") {
        baseFreq = 200;
        diff = 40;
      }

      // Binaural Stereo Panning
      const merger = ctx.createChannelMerger(2);

      const leftOsc = ctx.createOscillator();
      leftOsc.type = "sine";
      leftOsc.frequency.setValueAtTime(baseFreq, ctx.currentTime);

      const rightOsc = ctx.createOscillator();
      rightOsc.type = "sine";
      rightOsc.frequency.setValueAtTime(baseFreq + diff, ctx.currentTime);

      const toneGain = ctx.createGain();
      toneGain.gain.setValueAtTime(0.2, ctx.currentTime);

      leftOsc.connect(merger, 0, 0); // Left channel
      rightOsc.connect(merger, 0, 1); // Right channel
      merger.connect(toneGain);
      toneGain.connect(masterGain);

      leftOsc.start();
      rightOsc.start();
      leftOscRef.current = leftOsc;
      rightOscRef.current = rightOsc;

      // Soft Pink Noise Acoustic Bed for sensory isolation
      const bufferSize = 2 * ctx.sampleRate;
      const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        b0 = 0.99886 * b0 + white * 0.0555179;
        b1 = 0.99332 * b1 + white * 0.0750759;
        b2 = 0.96900 * b2 + white * 0.1538520;
        b3 = 0.86650 * b3 + white * 0.3104856;
        b4 = 0.55000 * b4 + white * 0.5329522;
        b5 = -0.7616 * b5 - white * 0.0168980;
        output[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.04;
        b6 = white * 0.115926;
      }

      const noiseSource = ctx.createBufferSource();
      noiseSource.buffer = noiseBuffer;
      noiseSource.loop = true;

      // Low-pass filter noise bed for warm soothing texture
      const filter = ctx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.setValueAtTime(450, ctx.currentTime);

      noiseSource.connect(filter);
      filter.connect(masterGain);
      noiseSource.start();
      noiseSourceRef.current = noiseSource;

      // Play soft initial Tibetan bell chime
      playTibetanChime(ctx, masterGain);
    } catch (err) {
      console.error("Web Audio initialization error:", err);
      toast.error("Could not start audio synthesis on your browser.");
    }
  };

  const playTibetanChime = (ctx: AudioContext, destination: GainNode) => {
    try {
      const chimeGain = ctx.createGain();
      chimeGain.gain.setValueAtTime(0, ctx.currentTime);
      chimeGain.gain.linearRampToValueAtTime(0.35, ctx.currentTime + 0.08);
      chimeGain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 4.5);
      chimeGain.connect(destination);

      const freqs = [432, 864, 1296];
      freqs.forEach((f) => {
        const osc = ctx.createOscillator();
        osc.type = "sine";
        osc.frequency.setValueAtTime(f, ctx.currentTime);
        osc.connect(chimeGain);
        osc.start(ctx.currentTime);
        osc.stop(ctx.currentTime + 4.6);
      });
    } catch (e) {
      console.warn("Chime failed", e);
    }
  };

  const stopAudioSynthesis = () => {
    try {
      if (leftOscRef.current) {
        leftOscRef.current.stop();
        leftOscRef.current.disconnect();
        leftOscRef.current = null;
      }
      if (rightOscRef.current) {
        rightOscRef.current.stop();
        rightOscRef.current.disconnect();
        rightOscRef.current = null;
      }
      if (noiseSourceRef.current) {
        noiseSourceRef.current.stop();
        noiseSourceRef.current.disconnect();
        noiseSourceRef.current = null;
      }
      if (audioCtxRef.current && audioCtxRef.current.state !== "closed") {
        audioCtxRef.current.close();
        audioCtxRef.current = null;
      }
    } catch (err) {
      console.error("Error stopping audio synthesis:", err);
    }
  };

  const handleTogglePlay = () => {
    if (isPlaying) {
      // Pause
      stopAudioSynthesis();
      if (timerRef.current) clearInterval(timerRef.current);
      setIsPlaying(false);
    } else {
      // Start
      initAudioSynthesis();
      setIsPlaying(true);

      timerRef.current = setInterval(() => {
        setSecondsRemaining((prev) => {
          if (prev <= 1) {
            if (timerRef.current) clearInterval(timerRef.current);
            stopAudioSynthesis();
            setIsPlaying(false);
            toast.success(
              lang === "id"
                ? "Sesi NSDR selesai. Selamat merasakan kejernihan saraf baru!"
                : "NSDR session complete. Enjoy your replenished neurochemical clarity!"
            );
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
  };

  const handleResetSession = () => {
    stopAudioSynthesis();
    if (timerRef.current) clearInterval(timerRef.current);
    setIsPlaying(false);
    setSecondsRemaining(durationMinutes * 60);
    setActiveStepIndex(0);
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  const currentStep = BODY_SCAN_STEPS[activeStepIndex];

  const metaTitles: Record<NsdrLang, string> = {
    en: "Stanford NSDR Lab (Non-Sleep Deep Rest) & Yoga Nidra Audio | Ju",
    id: "Stanford NSDR Audio Lab & Yoga Nidra Gratis (Gelombang Theta 6Hz) | Ju",
    de: "Stanford NSDR Audio Lab: Kostenlose Yoga Nidra & Theta-Wellen | Ju",
    fr: "Laboratoire Audio NSDR Stanford & Yoga Nidra Gratuit (Ondes Thêta) | Ju",
    es: "Laboratorio de Audio NSDR Stanford y Yoga Nidra Gratis (Ondas Theta) | Ju",
  };

  const metaDescriptions: Record<NsdrLang, string> = {
    en: "Restore dopamine reserves, down-regulate cortisol, and achieve parasympathetic recovery in 10-20 minutes with our pure Web Audio Stanford NSDR and Yoga Nidra generator.",
    id: "Pulihkan cadangan dopamin dan reset sistem saraf dalam 10-20 menit dengan generator audio Stanford NSDR murni berbasis Web Audio API (Theta 6Hz, body scan Dr. Huberman).",
    de: "Regenerieren Sie Dopamin und senken Sie Stresshormone mit Dr. Andrew Hubermans Stanford NSDR-Protokoll. Reine Web Audio Theta-Wellen (6Hz) und Körperscan.",
    fr: "Restaurez vos réserves de dopamine et régulez votre système nerveux avec le protocole NSDR de Stanford. Synthèse audio pure Web Audio 6Hz Thêta.",
    es: "Restaure sus reservas de dopamina y alivie el estrés con el protocolo NSDR de Stanford del Dr. Huberman. Generador de ondas Theta 6Hz sin descargas.",
  };

  return (
    <>
      <SEOHead
        title={metaTitles[lang]}
        description={metaDescriptions[lang]}
        canonical="https://www.nuju.app/tools/nsdr"
        language={lang}
        schema={[
          {
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: metaTitles[lang],
            applicationCategory: "HealthApplication",
            operatingSystem: "All",
            description: metaDescriptions[lang],
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "USD",
            },
            provider: {
              "@type": "Organization",
              name: "Ju Somatic Neuroscience Lab",
              url: "https://www.nuju.app",
            },
          },
        ]}
      />

      <div className="min-h-screen bg-[#050811] text-slate-100 flex flex-col selection:bg-cyan-500 selection:text-white relative overflow-hidden">
        {/* Deep Oceanic Ambient Glows */}
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-cyan-950/25 rounded-full blur-[150px] pointer-events-none" />
        <div className="absolute top-1/3 -right-20 w-[450px] h-[450px] bg-teal-950/20 rounded-full blur-[130px] pointer-events-none" />
        <div className="absolute bottom-10 -left-20 w-[500px] h-[500px] bg-indigo-950/20 rounded-full blur-[140px] pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto px-4 py-8 w-full flex-1 flex flex-col">
          {/* Top Navigation */}
          <div className="flex items-center justify-between gap-4 mb-6">
            <Link
              to="/quiz"
              className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors bg-white/5 hover:bg-white/10 px-3.5 py-2 rounded-full border border-white/10"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>{lang === "id" ? "Semua Alat & Tes" : "All Tools & Quizzes"}</span>
            </Link>

            {/* Language Switcher */}
            <div className="flex items-center gap-1 bg-slate-900/80 border border-cyan-500/20 rounded-full p-1 text-xs">
              {(["en", "id", "de", "fr", "es"] as NsdrLang[]).map((l) => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  className={`px-2.5 py-1 rounded-full font-bold uppercase transition-all ${
                    lang === l
                      ? "bg-cyan-600 text-white shadow-md shadow-cyan-600/30"
                      : "text-slate-400 hover:text-slate-200"
                  }`}
                >
                  {l}
                </button>
              ))}
            </div>
          </div>

          {/* AdSense Top Banner */}
          <div className="mb-6">
            <AdSenseBanner slot="nsdr-top" format="auto" />
          </div>

          {/* Main Lab Container */}
          <div className="rounded-3xl bg-slate-900/80 border border-cyan-500/20 backdrop-blur-xl p-6 sm:p-10 shadow-2xl space-y-8 relative overflow-hidden">
            {/* Header Title */}
            <div className="space-y-3 text-center sm:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 text-cyan-300 text-xs font-bold uppercase tracking-wider border border-cyan-500/20">
                <Brain className="w-4 h-4 text-cyan-400" />
                <span>Stanford Neurobiology Protocol · Dr. Andrew Huberman</span>
              </div>
              <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
                {lang === "id"
                  ? "Non-Sleep Deep Rest (NSDR) & Yoga Nidra Somatic Lab"
                  : "Non-Sleep Deep Rest (NSDR) & Yoga Nidra Somatic Lab"}
              </h1>
              <p className="text-slate-300 text-sm sm:text-base max-w-2xl leading-relaxed">
                {lang === "id"
                  ? "Generator audio gelombang otak murni (Pure Web Audio API) tanpa download MP3. Menggabungkan binaural beat 6Hz Theta dengan pink noise hangat untuk pemulihan dopamin dan penurunan kortisol instan."
                  : "Pure Web Audio synthesis with zero external MP3s. Combines precise 6Hz Theta binaural entrainment with warm pink noise and a somatic body scan to restore cellular energy and dopamine reserves."}
              </p>
            </div>

            {/* Mode & Duration Selectors */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {/* Duration Buttons */}
              <div className="bg-slate-950/60 p-4 rounded-2xl border border-white/5 space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-cyan-400" />
                  <span>{lang === "id" ? "Durasi Sesi:" : "Session Length:"}</span>
                </span>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { mins: 10, labelEn: "10 Min (Quick Reset)", labelId: "10 Menit (Reset Cepat)" },
                    { mins: 20, labelEn: "20 Min (Deep Restoration)", labelId: "20 Menit (Restorasi Total)" },
                  ].map((d) => (
                    <button
                      key={d.mins}
                      onClick={() => !isPlaying && setDurationMinutes(d.mins)}
                      disabled={isPlaying}
                      className={`py-2.5 px-3 rounded-xl text-xs font-semibold transition-all ${
                        durationMinutes === d.mins
                          ? "bg-cyan-600 text-white shadow-md shadow-cyan-600/30"
                          : "bg-white/[0.04] text-slate-300 hover:bg-white/[0.08]"
                      } ${isPlaying ? "opacity-60 cursor-not-allowed" : ""}`}
                    >
                      {lang === "id" ? d.labelId : d.labelEn}
                    </button>
                  ))}
                </div>
              </div>

              {/* Frequency Mode Buttons */}
              <div className="bg-slate-950/60 p-4 rounded-2xl border border-white/5 space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                  <Waves className="w-3.5 h-3.5 text-cyan-400" />
                  <span>{lang === "id" ? "Gelombang Otak:" : "Brainwave Target:"}</span>
                </span>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: "theta", label: "Theta 6Hz", desc: "NSDR" },
                    { id: "delta", label: "Delta 2Hz", desc: "Sleep" },
                    { id: "gamma", label: "Gamma 40Hz", desc: "Focus" },
                  ].map((m) => (
                    <button
                      key={m.id}
                      onClick={() => !isPlaying && setMode(m.id as NsdrMode)}
                      disabled={isPlaying}
                      className={`py-2 px-2 rounded-xl text-center transition-all ${
                        mode === m.id
                          ? "bg-cyan-600 text-white shadow-md shadow-cyan-600/30"
                          : "bg-white/[0.04] text-slate-300 hover:bg-white/[0.08]"
                      } ${isPlaying ? "opacity-60 cursor-not-allowed" : ""}`}
                    >
                      <div className="text-xs font-bold">{m.label}</div>
                      <div className="text-[10px] text-slate-400">{m.desc}</div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Central Visualizer & Countdown Orb */}
            <div className="flex flex-col items-center justify-center py-6">
              <div className="relative w-64 h-64 sm:w-72 sm:h-72 flex items-center justify-center">
                {/* Outer Pulsing Glow */}
                <motion.div
                  animate={{
                    scale: isPlaying ? [1, 1.12, 1] : 1,
                    opacity: isPlaying ? [0.35, 0.75, 0.35] : 0.2,
                  }}
                  transition={{
                    duration: 4.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="absolute inset-0 rounded-full bg-gradient-to-tr from-cyan-500/30 to-teal-500/30 blur-2xl pointer-events-none"
                />

                {/* Concentric rings */}
                <div className="absolute inset-4 rounded-full border border-cyan-500/20" />
                <div className="absolute inset-10 rounded-full border border-cyan-500/10" />

                {/* Core Center Display */}
                <div className="relative z-10 flex flex-col items-center justify-center text-center space-y-1">
                  <span className="text-4xl sm:text-5xl font-mono font-extrabold text-white tracking-wider">
                    {formatTime(secondsRemaining)}
                  </span>
                  <span className="text-xs font-semibold text-cyan-300 uppercase tracking-widest">
                    {isPlaying
                      ? lang === "id"
                        ? "Sesi Sedang Berjalan"
                        : "Active Entrainment"
                      : lang === "id"
                      ? "Siap Mulai"
                      : "Ready to Begin"}
                  </span>
                </div>
              </div>

              {/* Master Play / Pause / Reset Controls */}
              <div className="flex items-center gap-4 mt-6">
                <button
                  type="button"
                  onClick={handleTogglePlay}
                  className="flex items-center gap-3 py-4 px-8 rounded-2xl bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-400 hover:to-teal-400 text-slate-950 font-extrabold text-base transition-all shadow-xl shadow-cyan-500/25 active:scale-95"
                >
                  {isPlaying ? (
                    <>
                      <Pause className="w-5 h-5 fill-current" />
                      <span>{lang === "id" ? "Jeda Sesi" : "Pause Session"}</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-5 h-5 fill-current" />
                      <span>{lang === "id" ? "Mulai Protokol NSDR" : "Start NSDR Protocol"}</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={handleResetSession}
                  className="p-4 rounded-2xl bg-white/[0.05] hover:bg-white/[0.1] text-slate-300 hover:text-white transition-all border border-white/10"
                  title="Reset Timer"
                >
                  <RotateCcw className="w-5 h-5" />
                </button>
              </div>

              {/* Volume Slider */}
              <div className="flex items-center gap-3 mt-6 w-full max-w-xs bg-slate-950/40 px-4 py-2.5 rounded-full border border-white/5">
                <button
                  type="button"
                  onClick={() => setIsMuted(!isMuted)}
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                </button>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={isMuted ? 0 : volume}
                  onChange={(e) => {
                    setVolume(parseFloat(e.target.value));
                    if (isMuted) setIsMuted(false);
                  }}
                  className="w-full accent-cyan-400 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
                />
              </div>
            </div>

            {/* Somatic Body Scan Guide Stage */}
            <div className="rounded-2xl bg-cyan-950/30 border border-cyan-500/30 p-6 space-y-3">
              <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-cyan-300">
                <span className="flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-cyan-400" />
                  <span>
                    {lang === "id"
                      ? `Panduan Somatik Tahap ${activeStepIndex + 1} / ${BODY_SCAN_STEPS.length}`
                      : `Somatic Stage ${activeStepIndex + 1} of ${BODY_SCAN_STEPS.length}`}
                  </span>
                </span>
                <span className="text-slate-400">{currentStep.region[lang]}</span>
              </div>

              <h3 className="text-lg sm:text-xl font-bold text-white">
                {currentStep.region[lang]}
              </h3>

              <p className="text-sm sm:text-base text-slate-200 leading-relaxed italic">
                &ldquo;{currentStep.prompt[lang]}&rdquo;
              </p>
            </div>

            {/* Scientific Guide: Physiological Sigh & Stanford Evidence */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-cyan-300 flex items-center gap-1.5">
                  <Wind className="w-4 h-4 text-cyan-400" />
                  <span>Physiological Sigh Breathing Protocol</span>
                </h4>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {lang === "id"
                    ? "Tarik napas dalam 2 kali berturut-turut melalui hidung (tarikan kedua memaksimalkan pembukaan alveoli paru-paru), lalu hembuskan perlahan dan panjang lewat mulut hingga paru-paru kosong."
                    : "Two consecutive inhales through the nose (the second reinflates collapsed alveoli), followed by one long, slow exhalation through the mouth to instantly reset your heart rate variability."}
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-cyan-300 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-cyan-400" />
                  <span>Neurobiological Mechanism</span>
                </h4>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {lang === "id"
                    ? "Penelitian di Stanford School of Medicine menunjukkan 20 menit NSDR mengembalikan dopamin basal di striatum otak mirip dengan 2-3 jam tidur dalam tanpa inersia tidur."
                    : "Stanford research indicates that 20 minutes of NSDR restores baseline dopamine in the striatum comparable to several hours of slow-wave sleep without post-nap grogginess."}
                </p>
              </div>
            </div>
          </div>

          {/* AdSense Mid Banner */}
          <div className="my-8">
            <AdSenseBanner slot="nsdr-mid" format="auto" />
          </div>

          {/* Related Assessments Navigation */}
          <div className="rounded-3xl bg-slate-900/60 border border-white/10 p-6 sm:p-8 space-y-4 mb-8">
            <div className="flex items-center gap-2 text-cyan-400 font-semibold text-xs uppercase tracking-wider">
              <Compass className="w-4 h-4" />
              <span>{lang === "id" ? "Tes Terkait Kesehatan Mental" : "Pair With Clinical Assessments"}</span>
            </div>
            <h3 className="text-xl font-bold text-white">
              {lang === "id"
                ? "Eksplorasi Kondisi Sistem Saraf & Pola Pikir Anda"
                : "Explore Your Autonomic State & Cognitive Patterns"}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <Link
                to="/quiz/cognitive-distortions"
                className="p-4 rounded-2xl bg-slate-800/80 hover:bg-slate-700/80 border border-indigo-500/20 flex items-center justify-between group transition-all"
              >
                <div>
                  <h4 className="font-bold text-sm text-white group-hover:text-indigo-300 transition-colors">
                    Cognitive Distortions Test
                  </h4>
                  <p className="text-xs text-slate-400">Spot your automatic negative thought loops</p>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-indigo-400 group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                to="/quiz/rsd"
                className="p-4 rounded-2xl bg-slate-800/80 hover:bg-slate-700/80 border border-rose-500/20 flex items-center justify-between group transition-all"
              >
                <div>
                  <h4 className="font-bold text-sm text-white group-hover:text-rose-300 transition-colors">
                    Rejection Sensitive Dysphoria Screener
                  </h4>
                  <p className="text-xs text-slate-400">Evaluate emotional sensitivity & criticism pain</p>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-rose-400 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          {/* App Store CTA */}
          <AppStoreCta />
        </div>
      </div>
    </>
  );
};

export default NsdrAudioLab;
