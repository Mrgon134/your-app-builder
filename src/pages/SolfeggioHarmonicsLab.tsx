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
  ShieldCheck,
  Compass,
  ArrowRight,
  Clock,
  Radio,
} from "lucide-react";
import { motion } from "framer-motion";
import SEOHead from "@/components/SEOHead";
import AdSenseBanner from "@/components/AdSenseBanner";
import AppStoreCta from "@/components/AppStoreCta";
import { toast } from "sonner";

export type SolfeggioLang = "en" | "id" | "de" | "fr" | "es";
export type PulseMode = "pure" | "alpha" | "theta" | "delta";

interface SolfeggioPreset {
  freq: number;
  name: Record<SolfeggioLang, string>;
  subtitle: Record<SolfeggioLang, string>;
  description: Record<SolfeggioLang, string>;
  color: string;
}

const SOLFEGGIO_PRESETS: SolfeggioPreset[] = [
  {
    freq: 528,
    name: {
      en: "528 Hz · Cellular Harmony",
      id: "528 Hz · Harmoni Seluler & Transformasi",
      de: "528 Hz · Zelluläre Harmonie",
      fr: "528 Hz · Harmonie cellulaire",
      es: "528 Hz · Armonía celular y milagro",
    },
    subtitle: {
      en: "The 'Miracle Tone' for stress reduction and autonomic balance.",
      id: "Nada mukjizat untuk penurunan kortisol dan perbaikan sistem biologis.",
      de: "Der 'Wundertone' zur Stressreduktion und Regeneration.",
      fr: "La fréquence de transformation pour apaiser le système nerveux.",
      es: "Tono de transformación para la relajación profunda y el equilibrio.",
    },
    description: {
      en: "Scientific studies show 528Hz acoustic exposure significantly lowers salivary cortisol and increases cell viability in vitro while encouraging parasympathetic dominance.",
      id: "Riset membuktikan paparan frekuensi 528Hz menurunkan hormon kortisol dalam air liur dan meredam ketegangan sistem saraf simpatis.",
      de: "Wissenschaftliche Studien zeigen, dass 528 Hz den Speichelcortisolspiegel senkt und das parasympathische System aktiviert.",
      fr: "Des études cliniques démontrent que le 528 Hz diminue le cortisol et favorise la récupération parasympathique.",
      es: "Estudios científicos indican que los 528 Hz reducen el cortisol salival y promueven la serenidad corporal.",
    },
    color: "#10B981",
  },
  {
    freq: 432,
    name: {
      en: "432 Hz · Verdi Sacred Tuning",
      id: "432 Hz · Nada Alami Alam Semesta",
      de: "432 Hz · Natürliche Grundstimmung",
      fr: "432 Hz · Accord naturel de Verdi",
      es: "432 Hz · Afinación natural de Verdi",
    },
    subtitle: {
      en: "Mathematical harmony aligned with organic golden-ratio physics.",
      id: "Frekuensi organik yang selaras dengan rasio emas biologi.",
      de: "Mathematische Resonanz im Einklang mit der Natur.",
      fr: "Harmonie sonore alignée sur les lois géométriques du vivant.",
      es: "Resonancia matemática alineada con la proporción áurea.",
    },
    description: {
      en: "Double-blind clinical trials indicate 432Hz music promotes lower heart rate and blood pressure compared to standard 440Hz tuning, producing a deeply centering somatic calm.",
      id: "Uji klinis menunjukkan musik 432Hz menurunkan denyut nadi dan tekanan darah lebih efektif dibanding standar 440Hz komersial.",
      de: "Studien belegen, dass 432 Hz Herzfrequenz und Blutdruck spürbar stärker senkt als die Standardstimmung von 440 Hz.",
      fr: "Des essais cliniques prouvent que le 432 Hz ralentit le rythme cardiaque et favorise un apaisement plus profond.",
      es: "Ensayos clínicos demuestran que los 432 Hz reducen la frecuencia cardíaca y la presión arterial de forma más eficaz.",
    },
    color: "#06B6D4",
  },
  {
    freq: 396,
    name: {
      en: "396 Hz · Release Fear & Guilt",
      id: "396 Hz · Pelepasan Rasa Bersalah & Takut",
      de: "396 Hz · Befreiung von Schuld & Angst",
      fr: "396 Hz · Libération des peurs et culpabilités",
      es: "396 Hz · Liberación del miedo y la culpa",
    },
    subtitle: {
      en: "Grounding frequency to dismantle subconscious defense mechanisms.",
      id: "Frekuensi grounding untuk melarutkan trauma pertahanan bawah sadar.",
      de: "Erdende Frequenz zum Abbau unbewusster Blockaden.",
      fr: "Fréquence d'ancrage pour dissoudre les mécanismes d'angoisse inconscients.",
      es: "Frecuencia de enraizamiento para desactivar mecanismos de angustia.",
    },
    description: {
      en: "Associated with root security and grounding, 396Hz helps soothe emotional defense barriers, providing a steady acoustic anchor during grief, anxiety, or rumination.",
      id: "Menargetkan rasa aman dasar dan grounding tubuh, meredakan mekanisme pertahanan diri saat cemas, berduka, atau overthinking.",
      de: "Fördert das Gefühl von Urvertrauen und emotionaler Stabilität bei Überforderung und Grübeln.",
      fr: "Favorise le sentiment de sécurité intérieure et calme les ruminations anxieuses.",
      es: "Aporta sensación de seguridad básica y sosiega las rumiaciones mentales.",
    },
    color: "#F43F5E",
  },
  {
    freq: 639,
    name: {
      en: "639 Hz · Relational Empathy",
      id: "639 Hz · Resonansi Hati & Hubungan",
      de: "639 Hz · Zwischenmenschliche Harmonie",
      fr: "639 Hz · Connexion relationnelle et cœur",
      es: "639 Hz · Conexión interpersonal y empatía",
    },
    subtitle: {
      en: "Harmonizing frequency for interpersonal communication and warmth.",
      id: "Frekuensi harmonisasi untuk kehangatan emosional dan welas asih.",
      de: "Harmonisierende Schwingung für Empathie und Verbundenheit.",
      fr: "Onde harmonisante pour la douceur émotionnelle et la bienveillance.",
      es: "Vibración para fomentar la empatía, el perdón y el afecto.",
    },
    description: {
      en: "Tuned to encourage vagal ventral engagement, promoting feelings of connection, safety with others, and relational repair.",
      id: "Mendorong aktivasi saraf ventral vagus untuk menumbuhkan rasa aman sosial, empati, dan pengampunan luka batin.",
      de: "Aktiviert den ventralen Vagusnerv für ein Gefühl von sozialer Sicherheit und Mitgefühl.",
      fr: "Stimule le nerf vague ventral pour susciter un sentiment de confiance sociale et de sérénité.",
      es: "Favorece el estado vagal ventral para generar confianza y calidez con el entorno.",
    },
    color: "#EC4899",
  },
  {
    freq: 852,
    name: {
      en: "852 Hz · Pure Mental Clarity",
      id: "852 Hz · Kejernihan Mental & Intuisi",
      de: "852 Hz · Geistige Klarheit & Intuition",
      fr: "852 Hz · Clarté mentale et intuition",
      es: "852 Hz · Claridad mental e intuición",
    },
    subtitle: {
      en: "High-resonance tone to dissolve brain fog and intellectual fatigue.",
      id: "Nada getar tinggi untuk membersihkan kabut otak dan kelelahan kognitif.",
      de: "Hochfrequenter Ton zur Auflösung von geistigem Nebel.",
      fr: "Son cristallin pour dissiper la fatigue cognitive et le brouillard mental.",
      es: "Tono cristalino para despejar el embotamiento mental y la fatiga.",
    },
    description: {
      en: "Ideal for resetting your prefrontal cortex after grueling cognitive work, clearing mental chatter, and returning to sharp, calm awareness.",
      id: "Sangat ideal untuk mereset korteks prefrontal setelah kerja mental berjam-jam, menyapu kebisingan pikiran.",
      de: "Ideal für eine Pause nach intensiver Denkarbeit, um die Konzentration zu erneuern.",
      fr: "Parfait pour régénérer la clarté d'esprit après de longues sessions de travail intellectuel.",
      es: "Ideal para renovar la lucidez tras jornadas de alta exigencia mental.",
    },
    color: "#8B5CF6",
  },
  {
    freq: 174,
    name: {
      en: "174 Hz · Physical Tension Relief",
      id: "174 Hz · Pelepas Ketegangan Fisik",
      de: "174 Hz · Physische Entlastung",
      fr: "174 Hz · Soulagement des tensions corporelles",
      es: "174 Hz · Alivio de la tensión física",
    },
    subtitle: {
      en: "Low grounding hum acting as a natural somatic sedative.",
      id: "Dengungan nada rendah yang bekerja sebagai penenang somatik alami.",
      de: "Tiefe Schwingung zur Entspannung der Muskulatur.",
      fr: "Vibration grave pour dénouer les tensions musculaires accumulées.",
      es: "Zumbido grave para relajar la musculatura y aliviar el estrés físico.",
    },
    description: {
      en: "A deep fundamental vibration that resonates through muscle tissue and joints, encouraging full-body muscular de-armoring.",
      id: "Getaran mendalam yang merambat melalui jaringan otot dan persendian untuk mengendurkan cengkeraman fisik saat stres.",
      de: "Entspannt die Skelettmuskulatur und hilft, körperliche Anspannung nach anstrengenden Tagen loszulassen.",
      fr: "Apaise les tensions corporelles et aide à relâcher les crispations musculaires.",
      es: "Relaja la musculatura esquelética y ayuda a soltar la tensión acumulada.",
    },
    color: "#E11D48",
  },
];

const SolfeggioHarmonicsLab: React.FC = () => {
  const [lang, setLang] = useState<SolfeggioLang>("en");
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedFreq, setSelectedFreq] = useState<number>(528);
  const [pulseMode, setPulseMode] = useState<PulseMode>("pure");
  const [durationMins, setDurationMins] = useState<number>(15);
  const [secondsRemaining, setSecondsRemaining] = useState<number>(15 * 60);
  const [volume, setVolume] = useState<number>(0.75);
  const [isMuted, setIsMuted] = useState(false);

  // Web Audio Context & Synthesizer refs
  const audioCtxRef = useRef<AudioContext | null>(null);
  const masterGainRef = useRef<GainNode | null>(null);
  const osc1Ref = useRef<OscillatorNode | null>(null);
  const osc2Ref = useRef<OscillatorNode | null>(null);
  const lfoRef = useRef<OscillatorNode | null>(null);
  const lfoGainRef = useRef<GainNode | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animFrameRef = useRef<number | null>(null);

  // Update timer on duration change
  useEffect(() => {
    if (!isPlaying) {
      setSecondsRemaining(durationMins * 60);
    }
  }, [durationMins, isPlaying]);

  // Clean up Web Audio on unmount
  useEffect(() => {
    return () => {
      stopAudio();
      if (timerRef.current) clearInterval(timerRef.current);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
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

  // Canvas Cymatics Visualizer Animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let angle = 0;
    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const numRings = 7;
      const baseRadius = 35;

      for (let r = 1; r <= numRings; r++) {
        ctx.beginPath();
        const pulse = isPlaying ? Math.sin(angle * 2 + r) * 6 : 0;
        const radius = baseRadius * r + pulse;

        ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
        ctx.strokeStyle = isPlaying
          ? `rgba(16, 185, 129, ${0.15 + (r / numRings) * 0.35})`
          : "rgba(255, 255, 255, 0.08)";
        ctx.lineWidth = 1.5;
        ctx.stroke();

        // Harmonious nodes
        if (isPlaying) {
          const numNodes = r * 3;
          for (let n = 0; n < numNodes; n++) {
            const nodeAngle = angle + (n * (Math.PI * 2)) / numNodes;
            const nodeX = centerX + Math.cos(nodeAngle) * radius;
            const nodeY = centerY + Math.sin(nodeAngle) * radius;

            ctx.beginPath();
            ctx.arc(nodeX, nodeY, 2.5, 0, Math.PI * 2);
            ctx.fillStyle = "rgba(16, 185, 129, 0.6)";
            ctx.fill();
          }
        }
      }

      angle += isPlaying ? 0.015 : 0.003;
      animFrameRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [isPlaying]);

  const initAudio = () => {
    try {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new AudioContextClass();
      audioCtxRef.current = ctx;

      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(isMuted ? 0 : volume, ctx.currentTime);
      masterGain.connect(ctx.destination);
      masterGainRef.current = masterGain;

      // Pulse rate
      // Alpha: 10Hz, Theta: 6Hz, Delta: 2Hz
      let pulseRate = 0;
      if (pulseMode === "alpha") pulseRate = 10;
      if (pulseMode === "theta") pulseRate = 6;
      if (pulseMode === "delta") pulseRate = 2;

      // Main harmonic sine oscillator
      const osc1 = ctx.createOscillator();
      osc1.type = "sine";
      osc1.frequency.setValueAtTime(selectedFreq, ctx.currentTime);

      // Stereo merger for binaural/isochronic entrainment
      const merger = ctx.createChannelMerger(2);

      const osc2 = ctx.createOscillator();
      osc2.type = "sine";
      osc2.frequency.setValueAtTime(selectedFreq + (pulseRate > 0 ? pulseRate : 0.25), ctx.currentTime);

      const gainL = ctx.createGain();
      const gainR = ctx.createGain();
      gainL.gain.setValueAtTime(0.25, ctx.currentTime);
      gainR.gain.setValueAtTime(0.25, ctx.currentTime);

      osc1.connect(gainL);
      gainL.connect(merger, 0, 0); // Left

      osc2.connect(gainR);
      gainR.connect(merger, 0, 1); // Right

      // Optional Amplitude Modulation (Isochronic pulse) if selected
      if (pulseRate > 0) {
        const lfo = ctx.createOscillator();
        lfo.frequency.setValueAtTime(pulseRate, ctx.currentTime);
        const lfoGain = ctx.createGain();
        lfoGain.gain.setValueAtTime(0.08, ctx.currentTime);

        lfo.connect(lfoGain);
        lfoGain.connect(gainL.gain);
        lfoGain.connect(gainR.gain);
        lfo.start();
        lfoRef.current = lfo;
        lfoGainRef.current = lfoGain;
      }

      merger.connect(masterGain);
      osc1.start();
      osc2.start();

      osc1Ref.current = osc1;
      osc2Ref.current = osc2;
    } catch (e) {
      console.error("Web Audio initialization failed:", e);
      toast.error("Audio synthesis could not start on your browser.");
    }
  };

  const stopAudio = () => {
    try {
      if (osc1Ref.current) {
        osc1Ref.current.stop();
        osc1Ref.current.disconnect();
        osc1Ref.current = null;
      }
      if (osc2Ref.current) {
        osc2Ref.current.stop();
        osc2Ref.current.disconnect();
        osc2Ref.current = null;
      }
      if (lfoRef.current) {
        lfoRef.current.stop();
        lfoRef.current.disconnect();
        lfoRef.current = null;
      }
      if (audioCtxRef.current && audioCtxRef.current.state !== "closed") {
        audioCtxRef.current.close();
        audioCtxRef.current = null;
      }
    } catch (e) {
      console.error("Audio stop error:", e);
    }
  };

  const handleTogglePlay = () => {
    if (isPlaying) {
      stopAudio();
      if (timerRef.current) clearInterval(timerRef.current);
      setIsPlaying(false);
    } else {
      initAudio();
      setIsPlaying(true);

      timerRef.current = setInterval(() => {
        setSecondsRemaining((prev) => {
          if (prev <= 1) {
            if (timerRef.current) clearInterval(timerRef.current);
            stopAudio();
            setIsPlaying(false);
            toast.success(
              lang === "id"
                ? "Sesi Solfeggio selesai. Selamat menikmati ketenangan pikiran Anda!"
                : "Solfeggio harmonic session complete. Enjoy your centered peace!"
            );
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
  };

  const handleSelectFrequency = (freq: number) => {
    setSelectedFreq(freq);
    if (isPlaying) {
      stopAudio();
      setIsPlaying(false);
      if (timerRef.current) clearInterval(timerRef.current);
      toast.info(lang === "id" ? "Frekuensi diubah. Klik Mulai untuk mendengarkan." : "Frequency changed. Click Start to play.");
    }
  };

  const handleReset = () => {
    stopAudio();
    if (timerRef.current) clearInterval(timerRef.current);
    setIsPlaying(false);
    setSecondsRemaining(durationMins * 60);
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  const currentPreset = SOLFEGGIO_PRESETS.find((p) => p.freq === selectedFreq) || SOLFEGGIO_PRESETS[0];

  const metaTitles: Record<SolfeggioLang, string> = {
    en: "Solfeggio Harmonics & Isochronic Brainwave Lab (528Hz, 432Hz) | Ju",
    id: "Solfeggio Harmonic Audio Lab & Brainwave Generator (528Hz, 432Hz) | Ju",
    de: "Solfeggio Frequenzen & Brainwave Audio Lab (528Hz, 432Hz) | Ju",
    fr: "Générateur d'Ondes Cérébrales & Fréquences Solfeggio (528Hz) | Ju",
    es: "Generador de Frecuencias Solfeggio y Ondas Cerebrales (528Hz) | Ju",
  };

  const metaDescriptions: Record<SolfeggioLang, string> = {
    en: "Experience pure Web Audio Solfeggio frequencies (528Hz, 432Hz, 396Hz, 639Hz) paired with isochronic Alpha, Theta, and Delta pulses for deep somatic meditation and cortisol reduction.",
    id: "Generator audio frekuensi Solfeggio murni (528Hz, 432Hz, 396Hz) dengan gelombang Alpha, Theta, dan Delta untuk relaksasi mendalam, meditasi, dan menurunkan stres.",
    de: "Reine Web-Audio-Synthese von Solfeggio-Frequenzen (528Hz, 432Hz) mit isochronen Alpha- und Theta-Pulsen für Entspannung und Stressabbau.",
    fr: "Synthèse sonore pure Web Audio des fréquences sacrées du Solfège (528Hz, 432Hz) avec pulsations Alpha et Thêta pour méditer et apaiser le système nerveux.",
    es: "Generador de ondas puras Web Audio con frecuencias Solfeggio (528Hz, 432Hz, 396Hz) y pulsos isocrónicos para la meditación y el alivio del estrés.",
  };

  return (
    <>
      <SEOHead
        title={metaTitles[lang]}
        description={metaDescriptions[lang]}
        canonical="https://www.nuju.app/tools/solfeggio"
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
              name: "Ju Neuro-Acoustics Lab",
              url: "https://www.nuju.app",
            },
          },
        ]}
      />

      <div className="min-h-screen bg-[#050B0E] text-slate-100 flex flex-col selection:bg-emerald-500 selection:text-white relative overflow-hidden">
        {/* Emerald / Cyan Cymatics Ambient Glows */}
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-emerald-950/25 rounded-full blur-[150px] pointer-events-none" />
        <div className="absolute top-1/3 -right-20 w-[450px] h-[450px] bg-cyan-950/20 rounded-full blur-[130px] pointer-events-none" />
        <div className="absolute bottom-10 -left-20 w-[500px] h-[500px] bg-teal-950/20 rounded-full blur-[140px] pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto px-4 py-8 w-full flex-1 flex flex-col">
          {/* Top Bar Navigation */}
          <div className="flex items-center justify-between gap-4 mb-6">
            <Link
              to="/quiz"
              className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors bg-white/5 hover:bg-white/10 px-3.5 py-2 rounded-full border border-white/10"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>{lang === "id" ? "Semua Alat & Tes" : "All Tools & Quizzes"}</span>
            </Link>

            {/* Language Switcher */}
            <div className="flex items-center gap-1 bg-slate-900/80 border border-emerald-500/20 rounded-full p-1 text-xs">
              {(["en", "id", "de", "fr", "es"] as SolfeggioLang[]).map((l) => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  className={`px-2.5 py-1 rounded-full font-bold uppercase transition-all ${
                    lang === l
                      ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/30"
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
            <AdSenseBanner slot="solfeggio-top" format="auto" />
          </div>

          {/* Main Lab Card */}
          <div className="rounded-3xl bg-slate-900/80 border border-emerald-500/20 backdrop-blur-xl p-6 sm:p-10 shadow-2xl space-y-8 relative overflow-hidden">
            {/* Header */}
            <div className="space-y-3 text-center sm:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 text-emerald-300 text-xs font-bold uppercase tracking-wider border border-emerald-500/20">
                <Radio className="w-4 h-4 text-emerald-400" />
                <span>Pure Web Audio Neuro-Acoustics Generator</span>
              </div>
              <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
                {lang === "id"
                  ? "Solfeggio Harmonics & Brainwave Isochronic Lab"
                  : "Solfeggio Harmonics & Brainwave Isochronic Lab"}
              </h1>
              <p className="text-slate-300 text-sm sm:text-base max-w-2xl leading-relaxed">
                {lang === "id"
                  ? "Generator frekuensi akustik murni 100% via browser tanpa unduh file MP3. Pilih nada Solfeggio (528Hz, 432Hz) dan gabungkan dengan gelombang binaural Alpha atau Theta untuk relaksasi seluler."
                  : "100% browser-based pure Web Audio synthesis. Select sacred Solfeggio tones (528Hz, 432Hz) combined with isochronic Alpha and Theta pulses to restore somatic equilibrium and autonomic calm."}
              </p>
            </div>

            {/* Solfeggio Frequency Grid */}
            <div className="space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                <span>{lang === "id" ? "Pilih Frekuensi Solfeggio:" : "Select Solfeggio Frequency:"}</span>
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {SOLFEGGIO_PRESETS.map((preset) => (
                  <button
                    key={preset.freq}
                    type="button"
                    onClick={() => handleSelectFrequency(preset.freq)}
                    className={`p-4 rounded-2xl text-left transition-all border ${
                      selectedFreq === preset.freq
                        ? "bg-emerald-950/60 border-emerald-500 text-white shadow-lg shadow-emerald-900/30"
                        : "bg-white/[0.03] border-white/5 hover:bg-white/[0.06] text-slate-300"
                    }`}
                  >
                    <div className="text-lg font-black tracking-tight mb-1" style={{ color: preset.color }}>
                      {preset.freq} Hz
                    </div>
                    <div className="text-xs font-bold text-white line-clamp-1">
                      {preset.name[lang].split("·")[1]?.trim() || preset.name[lang]}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Entrainment Pulse Mode & Duration */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-slate-950/60 p-4 rounded-2xl border border-white/5 space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                  <Waves className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{lang === "id" ? "Modulasi Gelombang Otak:" : "Brainwave Pulse Modulation:"}</span>
                </span>
                <div className="grid grid-cols-4 gap-2">
                  {[
                    { id: "pure", label: "Pure", desc: "No Pulse" },
                    { id: "alpha", label: "Alpha", desc: "10Hz" },
                    { id: "theta", label: "Theta", desc: "6Hz" },
                    { id: "delta", label: "Delta", desc: "2Hz" },
                  ].map((m) => (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => {
                        setPulseMode(m.id as PulseMode);
                        if (isPlaying) {
                          stopAudio();
                          setIsPlaying(false);
                          toast.info("Click start to apply pulse mode.");
                        }
                      }}
                      className={`py-2 px-1 rounded-xl text-center text-xs font-bold transition-all ${
                        pulseMode === m.id
                          ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/30"
                          : "bg-white/[0.04] text-slate-300 hover:bg-white/[0.08]"
                      }`}
                    >
                      <div>{m.label}</div>
                      <div className="text-[10px] text-slate-400 font-normal">{m.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-slate-950/60 p-4 rounded-2xl border border-white/5 space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{lang === "id" ? "Durasi Sesi:" : "Session Timer:"}</span>
                </span>
                <div className="grid grid-cols-3 gap-2">
                  {[5, 15, 30].map((mins) => (
                    <button
                      key={mins}
                      type="button"
                      disabled={isPlaying}
                      onClick={() => !isPlaying && setDurationMins(mins)}
                      className={`py-2 px-2 rounded-xl text-center text-xs font-bold transition-all ${
                        durationMins === mins
                          ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/30"
                          : "bg-white/[0.04] text-slate-300 hover:bg-white/[0.08]"
                      } ${isPlaying ? "opacity-60 cursor-not-allowed" : ""}`}
                    >
                      {mins} Mins
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Central Cymatics Canvas Visualizer */}
            <div className="flex flex-col items-center justify-center py-4">
              <div className="relative w-64 h-64 sm:w-72 sm:h-72 flex items-center justify-center">
                <canvas
                  ref={canvasRef}
                  width={300}
                  height={300}
                  className="absolute inset-0 w-full h-full"
                />

                {/* Center Frequency & Time display */}
                <div className="relative z-10 flex flex-col items-center justify-center text-center space-y-1">
                  <span className="text-3xl sm:text-4xl font-mono font-extrabold text-white tracking-wider">
                    {formatTime(secondsRemaining)}
                  </span>
                  <span className="text-xs font-bold uppercase tracking-widest" style={{ color: currentPreset.color }}>
                    {currentPreset.freq} HZ
                  </span>
                </div>
              </div>

              {/* Master Play Controls */}
              <div className="flex items-center gap-4 mt-6">
                <button
                  type="button"
                  onClick={handleTogglePlay}
                  className="flex items-center gap-3 py-4 px-8 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-extrabold text-base transition-all shadow-xl shadow-emerald-500/25 active:scale-95"
                >
                  {isPlaying ? (
                    <>
                      <Pause className="w-5 h-5 fill-current" />
                      <span>{lang === "id" ? "Jeda Suara" : "Pause Audio"}</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-5 h-5 fill-current" />
                      <span>{lang === "id" ? "Mulai Frekuensi Harmonis" : "Start Solfeggio Audio"}</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={handleReset}
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
                  className="w-full accent-emerald-400 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
                />
              </div>
            </div>

            {/* Current Frequency Scientific Overview */}
            <div className="rounded-2xl bg-emerald-950/30 border border-emerald-500/30 p-6 space-y-2">
              <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <span className="w-3 h-3 rounded-full" style={{ backgroundColor: currentPreset.color }} />
                <span>{currentPreset.name[lang]}</span>
              </h3>
              <p className="text-xs sm:text-sm text-emerald-200/90 font-medium">
                {currentPreset.subtitle[lang]}
              </p>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed pt-1">
                {currentPreset.description[lang]}
              </p>
            </div>
          </div>

          {/* AdSense Mid Banner */}
          <div className="my-8">
            <AdSenseBanner slot="solfeggio-mid" format="auto" />
          </div>

          {/* Related Tools */}
          <div className="rounded-3xl bg-slate-900/60 border border-white/10 p-6 sm:p-8 space-y-4 mb-8">
            <div className="flex items-center gap-2 text-emerald-400 font-semibold text-xs uppercase tracking-wider">
              <Compass className="w-4 h-4" />
              <span>{lang === "id" ? "Eksplorasi Alat Terkait" : "Explore Related Neuro-Tools"}</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <Link
                to="/tools/nsdr"
                className="p-4 rounded-2xl bg-slate-800/80 hover:bg-slate-700/80 border border-cyan-500/20 flex items-center justify-between group transition-all"
              >
                <div>
                  <h4 className="font-bold text-sm text-white group-hover:text-cyan-300 transition-colors">
                    Stanford NSDR Audio Lab
                  </h4>
                  <p className="text-xs text-slate-400">Dr. Andrew Huberman 6Hz Theta restore</p>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-cyan-400 group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                to="/tools/sleep"
                className="p-4 rounded-2xl bg-slate-800/80 hover:bg-slate-700/80 border border-indigo-500/20 flex items-center justify-between group transition-all"
              >
                <div>
                  <h4 className="font-bold text-sm text-white group-hover:text-indigo-300 transition-colors">
                    4-7-8 Sleep Lab & 432Hz Drone
                  </h4>
                  <p className="text-xs text-slate-400">Deep nocturnal sleep pacer & singing bowls</p>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-indigo-400 group-hover:translate-x-1 transition-transform" />
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

export default SolfeggioHarmonicsLab;
