import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  Sparkles,
  RotateCcw,
  Copy,
  Share2,
  BookOpen,
  Feather,
  Heart,
  Moon,
  Sun,
  Flame,
  Shield,
  Compass,
  Star,
  Zap,
  CheckCircle2,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import SEOHead from "@/components/SEOHead";
import AdSenseBanner from "@/components/AdSenseBanner";
import AppStoreCta from "@/components/AppStoreCta";
import { toast } from "sonner";

type OracleLang = "en" | "id" | "de" | "fr" | "es";

interface OracleCard {
  id: number;
  name: Record<OracleLang, string>;
  element: string;
  badge: Record<OracleLang, string>;
  color: string;
  affirmation: Record<OracleLang, string>;
  message: Record<OracleLang, string>;
  journalPrompt: Record<OracleLang, string>;
  microRitual: Record<OracleLang, string>;
}

const ORACLE_CARDS: OracleCard[] = [
  {
    id: 1,
    name: {
      en: "The Quiet Sage",
      id: "Sang Resi Hening",
      de: "Der stille Weise",
      fr: "Le Sage Silencieux",
      es: "El Sabio Silencioso",
    },
    element: "Ether",
    badge: {
      en: "Clarity & Solitude",
      id: "Kejernihan & Kesendirian",
      de: "Klarheit & Stille",
      fr: "Clarté & Solitude",
      es: "Claridad y Soledad",
    },
    color: "from-indigo-600 via-purple-600 to-slate-900",
    affirmation: {
      en: "In the pause between thoughts, my truth reveals itself.",
      id: "Dalam jeda di antara riuh pikiran, kebenaran sejatiku menampakkan diri.",
      de: "In der Pause zwischen den Gedanken offenbart sich meine Wahrheit.",
      fr: "Dans le silence entre deux pensées, ma vérité se dévoile.",
      es: "En la pausa entre pensamientos, mi verdad se revela.",
    },
    message: {
      en: "You do not need to rush an answer today. The world pressures you to react, but your power lies in observation. Step back from the noise.",
      id: "Hari ini Anda tidak perlu terburu-buru memberikan jawaban. Dunia mungkin mendesak Anda bereaksi, namun kekuatan terbesar Anda adalah mengamati dari kejauhan.",
      de: "Sie müssen heute keine voreiligen Antworten erzwingen. Ihre wahre Kraft liegt in der stillen Beobachtung.",
      fr: "Inutile de précipiter vos réponses aujourd'hui. Votre force réside dans le recul et l'observation bienveillante.",
      es: "Hoy no necesita apresurar ninguna respuesta. Su fortaleza radica en la observación serena.",
    },
    journalPrompt: {
      en: "What is one conversation or decision where I need to listen more and speak less today?",
      id: "Keputusan atau percakapan apa yang hari ini menuntutku untuk lebih banyak mendengar daripada berbicara?",
      de: "Bei welcher Entscheidung sollte ich heute erst einmal nur zuhören?",
      fr: "Dans quelle situation ai-je besoin d'écouter davantage aujourd'hui ?",
      es: "¿En qué asunto o conversación necesito escuchar más y juzgar menos hoy?",
    },
    microRitual: {
      en: "Take 3 deep breaths before responding to your next text or email.",
      id: "Tarik napas dalam 3 kali sebelum membalas pesan atau email berikutnya.",
      de: "Atmen Sie dreimal tief durch, bevor Sie auf die nächste Nachricht antworten.",
      fr: "Prenez 3 respirations conscientes avant de répondre au prochain message.",
      es: "Respire hondo 3 veces antes de responder a su próximo mensaje.",
    },
  },
  {
    id: 2,
    name: {
      en: "The Grounded Oak",
      id: "Pohon Ek yang Berakar",
      de: "Die verwurzelte Eiche",
      fr: "Le Chêne Enraciné",
      es: "El Roble Enraizado",
    },
    element: "Earth",
    badge: {
      en: "Steadiness & Resilience",
      id: "Keteguhan & Ketahanan",
      de: "Beständigkeit & Kraft",
      fr: "Stabilité & Ancrage",
      es: "Firmeza y Resiliencia",
    },
    color: "from-emerald-700 via-amber-800 to-slate-900",
    affirmation: {
      en: "Storms shake the branches, but my roots remain unbreakable.",
      id: "Badai mungkin mengguncang dedaunan, namun akarku tetap kokoh tak tergoyahkan.",
      de: "Stürme biegen die Zweige, doch meine Wurzeln halten mich fest.",
      fr: "Les tempêtes secouent les branches, mais mes racines sont inébranlables.",
      es: "Las tormentas agitan las ramas, pero mis raíces permanecen firmes.",
    },
    message: {
      en: "External chaos is temporary. Anchor into your fundamental values. You have weathered difficult seasons before; this moment is no exception.",
      id: "Kekacauan di luar dirimu bersifat sementara. Berlabuhlah pada nilai-nilai dasarmu. Anda telah melewati masa-masa sulit sebelumnya; saat ini pun Anda sanggup melaluinya.",
      de: "Äußeres Chaos ist vergänglich. Besinnen Sie sich auf Ihr Fundament und Ihre gewachsene Stärke.",
      fr: "Le tumulte extérieur est éphémère. Ancrez-vous dans vos valeurs fondamentales.",
      es: "El caos exterior es transitorio. Apóyese en sus valores profundos y en su solidez.",
    },
    journalPrompt: {
      en: "What is an unchanging truth about my strength that I tend to forget when anxious?",
      id: "Kekuatan apa dalam diriku yang sering kulupakan saat rasa cemas mulai datang?",
      de: "Welche persönliche Stärke vergesse ich oft, wenn Sorgen auftauchen?",
      fr: "Quelle est la force intérieure que j'ai tendance à oublier sous l'effet du stress ?",
      es: "¿Qué fortaleza propia suelo olvidar cuando aparece la ansiedad?",
    },
    microRitual: {
      en: "Place both feet flat on the floor, push down gently, and feel the solid ground beneath you for 60 seconds.",
      id: "Pijakkan kedua kaki rata di lantai, rasakan bumi menopang tubuhmu selama 60 detik.",
      de: "Stellen Sie beide Füße fest auf den Boden und spüren Sie für 60 Sekunden den festen Halt.",
      fr: "Posez vos deux pieds à plat au sol et ressentez l'ancrage de la terre pendant 60 secondes.",
      es: "Apoye firmemente ambos pies en el suelo y sienta la estabilidad durante 60 segundos.",
    },
  },
  {
    id: 3,
    name: {
      en: "The Phoenix",
      id: "Sang Burung Phoenix",
      de: "Der Phönix",
      fr: "Le Phénix",
      es: "El Fénix",
    },
    element: "Fire",
    badge: {
      en: "Rebirth & Transformation",
      id: "Kelahiran Kembali & Transformasi",
      de: "Neubeginn & Wandlung",
      fr: "Renaissance & Métamorphose",
      es: "Renacimiento y Transformación",
    },
    color: "from-red-600 via-amber-600 to-slate-900",
    affirmation: {
      en: "I release the past with grace. Every ending is fertile ground for new life.",
      id: "Kulepaskan masa lalu dengan lapang. Setiap akhir adalah tanah subur bagi awal baru.",
      de: "Ich lasse Altes in Würde los. Jeder Abschluss birgt den Samen eines Neubeginns.",
      fr: "Je libère le passé avec sérénité. Chaque fin prépare un renouveau puissant.",
      es: "Suelto el pasado con gratitud. Cada final es tierra fértil para un nuevo comienzo.",
    },
    message: {
      en: "Something in your life is asking to be surrendered — an outdated expectation, a past resentment, or an unrealistic standard. Let it burn away to reveal who you are becoming.",
      id: "Ada sesuatu dalam hidupmu yang meminta untuk dilepaskan — ekspektasi usang, dendam lama, atau standar yang membebani. Biarkan ia luruh agar dirimu yang baru dapat bangkit.",
      de: "Etwas Altes darf jetzt losgelassen werden: ein überhöhter Anspruch oder ein vergangener Groll.",
      fr: "Quelque chose demande à être relâché : une attente obsolète ou un perfectionnisme stérile.",
      es: "Algo en su vida pide ser soltado: una expectativa rígida o una culpa superada.",
    },
    journalPrompt: {
      en: "What belief about myself am I finally ready to lay down and stop carrying?",
      id: "Keyakinan membatasi apa tentang diriku yang hari ini siap kuletakkan dan tidak lagi kubawa?",
      de: "Welche überholte Überzeugung über mich selbst bin ich bereit abzulegen?",
      fr: "Quelle croyance limitante sur moi-même suis-je enfin prêt(e) à abandonner ?",
      es: "¿Qué creencia limitante sobre mí mismo estoy listo para soltar hoy?",
    },
    microRitual: {
      en: "Write one negative thought on a scrap piece of paper, crumple it tightly, and discard it intentionally.",
      id: "Tulis satu beban pikiran di secarik kertas kecil, remas kuat-kuat, lalu buang ke tempat sampah.",
      de: "Schreiben Sie eine belastende Sorge auf einen Zettel, zerknüllen Sie ihn und werfen Sie ihn bewusst weg.",
      fr: "Notez une pensée toxique sur un papier, froissez-le fermement et jetez-le avec intention.",
      es: "Escriba un pensamiento pesado en un papel, arrúguelo con fuerza y tírelo a la papelera.",
    },
  },
  {
    id: 4,
    name: {
      en: "The Still Lake",
      id: "Danau yang Tenang",
      de: "Der stille Bergsee",
      fr: "Le Lac Paisible",
      es: "El Lago Sereno",
    },
    element: "Water",
    badge: {
      en: "Emotional Peace & Acceptance",
      id: "Kedamaian Emosional & Penerimaan",
      de: "Seelenfrieden & Annahme",
      fr: "Paix Émotionnelle & Accueil",
      es: "Paz Emocional y Aceptación",
    },
    color: "from-cyan-600 via-blue-700 to-slate-900",
    affirmation: {
      en: "Like water, I allow feelings to ripple without disturbing my deep core.",
      id: "Seperti air, kubiarkan riak emosi lewat tanpa merusak kedamaian relung jiwaku.",
      de: "Wie stilles Wasser lasse ich Wellen zu, ohne meine innere Tiefe zu verlieren.",
      fr: "Comme l'eau limpide, je laisse passer les vagues sans troubler ma profondeur.",
      es: "Como el agua transparente, permito que las olas pasen sin alterar mi calma profunda.",
    },
    message: {
      en: "Do not fight your emotions today. Resistance amplifies tension. Acknowledge what arises, name it gently, and watch it dissolve on its own.",
      id: "Jangan melawan emosi yang muncul hari ini. Perlawanan hanya memperbesar ketegangan. Sadari apa yang Anda rasakan, berikan nama dengan lembut, dan biarkan ia mereda dengan sendirinya.",
      de: "Kämpfen Sie heute nicht gegen Gefühle an. Nehmen Sie wahr, was da ist, ohne es zu bewerten.",
      fr: "Ne luttez pas contre vos ressentis. Accueillez-les simplement : ils finiront par s'estomper.",
      es: "No luche contra sus emociones hoy. Acéptelas con ternura y verá cómo se disipan.",
    },
    journalPrompt: {
      en: "What feeling have I been judging or pushing away lately?",
      id: "Emosi apa yang belakangan ini kerap kuhakimi atau coba kutolak?",
      de: "Welches Gefühl habe ich in letzter Zeit verdrängt oder verurteilt?",
      fr: "Quel sentiment ai-je tenté de refouler récemment ?",
      es: "¿Qué sentimiento he estado reprimiendo o juzgando últimamente?",
    },
    microRitual: {
      en: "Drink a tall glass of cool water mindfully, noticing every cool sensation as it flows.",
      id: "Minum segelas air putih secara perlahan, rasakan kesegarannya membasahi kerongkongan.",
      de: "Trinken Sie achtsam ein Glas frisches Wasser und spüren Sie die belebende Kühle.",
      fr: "Buvez un verre d'eau en pleine conscience, en prêtant attention à chaque gorgée.",
      es: "Beba un vaso de agua fresca lentamente, prestando atención a cada sorbo.",
    },
  },
  {
    id: 5,
    name: {
      en: "The Gentle Protector",
      id: "Sang Pelindung Welas Asih",
      de: "Der sanfte Beschützer",
      fr: "Le Protecteur Bienveillant",
      es: "El Protector Amable",
    },
    element: "Heart",
    badge: {
      en: "Healthy Boundaries & Self-Honor",
      id: "Batasan Sehat & Menghargai Diri",
      de: "Grenzen & Selbstfürsorge",
      fr: "Limites Saines & Respect de Soi",
      es: "Límites Sanos y Autorespeto",
    },
    color: "from-rose-600 via-pink-700 to-slate-900",
    affirmation: {
      en: "Saying 'no' to others is how I say an honest 'yes' to my well-being.",
      id: "Mengatakan 'tidak' pada hal yang membebani adalah caraku berkata 'ya' pada kesehatan mentalku.",
      de: "Ein klares 'Nein' zu Überforderung ist ein ehrliches 'Ja' zu mir selbst.",
      fr: "Dire 'non' aux sollicitations excessives, c'est dire un vrai 'oui' à mon équilibre.",
      es: "Decir 'no' a lo que me desgasta es decir 'sí' a mi bienestar interior.",
    },
    message: {
      en: "Your empathy is a gift, but without boundaries, it drains your spirit. You are not obligated to carry responsibilities that belong to other people.",
      id: "Empatimu adalah anugerah indah, namun tanpa batasan, energimu akan terkuras. Anda tidak berkewajiban memikul beban emosional yang bukan tanggung jawab Anda.",
      de: "Ihre Hilfsbereitschaft ist wertvoll, aber Sie dürfen sich nicht selbst aufopfern.",
      fr: "Votre générosité est précieuse, mais préservez votre propre réservoir d'énergie.",
      es: "Su empatía es admirable, pero no tiene por qué cargar con problemas ajenos.",
    },
    journalPrompt: {
      en: "Where do I need to establish a firmer, kinder boundary this week?",
      id: "Di area mana aku perlu menetapkan batasan yang lebih tegas namun tetap santun minggu ini?",
      de: "Wo muss ich diese Woche eine liebevolle, aber deutliche Grenze ziehen?",
      fr: "Où ai-je besoin de poser une limite claire et bienveillante cette semaine ?",
      es: "¿En qué ámbito necesito poner un límite claro y respetuoso esta semana?",
    },
    microRitual: {
      en: "Cross your arms gently over your chest, breathe in warmth, and whisper: 'I am safe to rest.'",
      id: "Dekap kedua lenganmu di dada dengan lembut, tarik napas, dan bisikkan: 'Aku berhak untuk beristirahat.'",
      de: "Umarme dich selbst sanft für einen Moment und erlaube dir, zur Ruhe zu kommen.",
      fr: "Posez vos mains sur votre cœur et rappelez-vous : 'J'ai le droit de ralentir.'",
      es: "Cruce los brazos sobre el pecho y regálese un abrazo reconfortante de descanso.",
    },
  },
  {
    id: 6,
    name: {
      en: "The Electric Pioneer",
      id: "Sang Pelopor Energik",
      de: "Der mutige Pionier",
      fr: "Le Pionnier Électrique",
      es: "El Pionero Audaz",
    },
    element: "Lightning",
    badge: {
      en: "Courage & Decisive Action",
      id: "Keberanian & Aksi Nyata",
      de: "Mut & Tatkraft",
      fr: "Courage & Élan",
      es: "Coraje y Determinación",
    },
    color: "from-amber-500 via-orange-600 to-slate-900",
    affirmation: {
      en: "Action cures overthinking. I take the first brave imperfect step.",
      id: "Tindakan nyata menyembuhkan overthinking. Aku berani mengambil langkah pertama meski belum sempurna.",
      de: "Handeln beendet Grübeln. Ich gehe den ersten unvollkommenen Schritt.",
      fr: "L'action dissipe le doute. Je fais le premier pas, même imparfait.",
      es: "La acción vence a la indecisión. Doy el primer paso con valentía.",
    },
    message: {
      en: "You have analyzed enough. Perfectionism is merely fear disguised as high standards. Break through the paralysis by doing something small and decisive right now.",
      id: "Anda sudah cukup banyak menganalisis. Perfeksionisme sering kali hanya rasa takut yang berkedok standar tinggi. Dobrak kebuntuan itu dengan melakukan satu tindakan kecil yang nyata saat ini juga.",
      de: "Genug nachgedacht! Perfektionismus ist oft nur getarnte Angst. Wagen Sie den Anfang.",
      fr: "Vous avez assez analysé. Le perfectionnisme n'est que de la peur déguisée. Lancez-vous.",
      es: "Ha reflexionado bastante. El perfeccionismo es solo miedo disfrazado. Actúe hoy.",
    },
    journalPrompt: {
      en: "What is one task I have delayed that will take less than 10 minutes to finish?",
      id: "Tugas apa yang selama ini kutunda padahal hanya butuh waktu kurang dari 10 menit?",
      de: "Welche 10-Minuten-Aufgabe habe ich zu lange vor mir hergeschoben?",
      fr: "Quelle tâche de moins de 10 minutes ai-je repoussée inutilement ?",
      es: "¿Qué tarea pendiente de menos de 10 minutos puedo resolver ahora mismo?",
    },
    microRitual: {
      en: "Do a 5-second countdown: 5-4-3-2-1, stand up, and immediately begin your primary task.",
      id: "Hitung mundur 5 detik: 5-4-3-2-1, berdiri, dan langsung mulai tugas utamamu.",
      de: "Zählen Sie 5-4-3-2-1 herunter, stehen Sie auf und beginnen Sie sofort.",
      fr: "Comptez 5-4-3-2-1, levez-vous et démarrez immédiatement sans hésiter.",
      es: "Cuente 5-4-3-2-1, levántese y empiece su tarea sin pensarlo dos veces.",
    },
  },
];

const DailyOracleGame: React.FC = () => {
  const [lang, setLang] = useState<OracleLang>("en");
  const [pulledCard, setPulledCard] = useState<OracleCard | null>(null);
  const [isFlipping, setIsFlipping] = useState(false);
  const [hasDrawnToday, setHasDrawnToday] = useState(false);

  // Check if drawn today
  useEffect(() => {
    const saved = localStorage.getItem("ju_daily_oracle_date");
    const today = new Date().toISOString().slice(0, 10);
    if (saved === today) {
      const savedCardId = localStorage.getItem("ju_daily_oracle_id");
      if (savedCardId) {
        const found = ORACLE_CARDS.find((c) => c.id === parseInt(savedCardId, 10));
        if (found) {
          setPulledCard(found);
          setHasDrawnToday(true);
        }
      }
    }
  }, []);

  const drawCard = () => {
    if (isFlipping) return;
    setIsFlipping(true);

    setTimeout(() => {
      // Pick random card
      const randomIndex = Math.floor(Math.random() * ORACLE_CARDS.length);
      const card = ORACLE_CARDS[randomIndex];
      setPulledCard(card);
      setIsFlipping(false);
      setHasDrawnToday(true);

      const today = new Date().toISOString().slice(0, 10);
      localStorage.setItem("ju_daily_oracle_date", today);
      localStorage.setItem("ju_daily_oracle_id", card.id.toString());
    }, 800);
  };

  const redrawCard = () => {
    setPulledCard(null);
    setHasDrawnToday(false);
    localStorage.removeItem("ju_daily_oracle_date");
    localStorage.removeItem("ju_daily_oracle_id");
  };

  const copyCardWisdom = () => {
    if (!pulledCard) return;
    const text = `✨ Today's Oracle Archetype: ${pulledCard.name[lang]}\nAffirmation: "${pulledCard.affirmation[lang]}"\nDaily Prompt: ${pulledCard.journalPrompt[lang]}\nMicro-Ritual: ${pulledCard.microRitual[lang]}\nDraw your daily card at: ${window.location.origin}/game/oracle`;
    navigator.clipboard.writeText(text);
    toast.success(lang === "id" ? "Pesan oracle berhasil disalin!" : "Oracle wisdom copied to clipboard!");
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-amber-500 selection:text-slate-950">
      <SEOHead
        title={
          lang === "id"
            ? "Daily Mood Oracle: Tarik Kartu Arketipe & Refleksi Harian"
            : lang === "de"
            ? "Daily Mood Oracle: Tägliche Archetypen-Karte & Achtsamkeitsimpuls"
            : lang === "fr"
            ? "Oracle Quotidien des Humeurs : Tirage d'Archétype & Réflexion"
            : lang === "es"
            ? "Oráculo Diario del Estado de Ánimo: Tirada de Carta y Reflexión"
            : "Daily Mood Oracle: Archetype Card Pull & Mindful Prompt"
        }
        description={
          lang === "id"
            ? "Tarik kartu refleksi harianmu. Temukan arketipe jiwamu, afirmasi hari ini, dan prompt journaling untuk menata pikiran dengan tenang."
            : lang === "de"
            ? "Ziehen Sie Ihre tägliche Seelenkarte. Archetypen, Affirmationen und Journaling-Impulse für innere Klarheit."
            : lang === "fr"
            ? "Tirez votre carte du jour. Découvrez votre archétype, votre affirmation et un rituel de pleine conscience."
            : lang === "es"
            ? "Saque su carta diaria de arquetipo. Afirmaciones, sabiduría consciente y preguntas de introspección."
            : "Draw your daily mindful archetype card. Receive custom affirmations, grounding wisdom, and a powerful daily journaling prompt."
        }
        canonicalUrl="https://ju-journal.com/game/oracle"
      />

      {/* Header */}
      <header className="border-b border-slate-800/80 bg-slate-900/60 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link
            to="/quiz"
            className="inline-flex items-center gap-2 text-xs md:text-sm font-medium text-slate-400 hover:text-slate-200 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{lang === "id" ? "Semua Tes & Game" : "All Tests & Tools"}</span>
          </Link>

          <div className="flex items-center gap-3">
            <div className="flex items-center bg-slate-800/80 rounded-full p-0.5 border border-slate-700/60 text-xs">
              {(["en", "id", "de", "fr", "es"] as OracleLang[]).map((l) => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  className={`px-2 py-1 rounded-full uppercase font-bold text-[10px] md:text-xs transition-all ${
                    lang === l
                      ? "bg-amber-500 text-slate-950 shadow-sm"
                      : "text-slate-400 hover:text-slate-200"
                  }`}
                >
                  {l === "en"
                    ? "🇬🇧 EN"
                    : l === "id"
                    ? "🇮🇩 ID"
                    : l === "de"
                    ? "🇩🇪 DE"
                    : l === "fr"
                    ? "🇫🇷 FR"
                    : "🇪🇸 ES"}
                </button>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* Top Banner */}
      <div className="max-w-4xl mx-auto w-full px-4 pt-4">
        <AdSenseBanner slot="oracle-top" format="horizontal" />
      </div>

      <main className="flex-1 max-w-4xl mx-auto w-full px-4 py-8 md:py-12">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-400 text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Intuitive Wisdom & Daily Reflection</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white mb-3">
            {lang === "id"
              ? "Daily Mood Oracle: Tarik Kartu Hari Ini"
              : lang === "de"
              ? "Tägliches Seelen-Orakel"
              : lang === "fr"
              ? "Oracle Quotidien des Émotions"
              : lang === "es"
              ? "Oráculo Diario de Serenidad"
              : "Daily Mood Oracle & Archetype Card"}
          </h1>
          <p className="text-sm md:text-base text-slate-400">
            {lang === "id"
              ? "Tarik satu kartu untuk menyelaraskan suasana hati, menerima petunjuk refleksi, dan menemukan kedamaian batin hari ini."
              : lang === "de"
              ? "Ziehen Sie eine Karte für Ausgeglichenheit, tägliche Reflexion und innere Ruhe."
              : lang === "fr"
              ? "Tirez une carte pour aligner votre énergie, recevoir votre conseil du jour et apaiser votre esprit."
              : lang === "es"
              ? "Tome una carta para armonizar su día, recibir una guía reflexiva y reconectar con su calma."
              : "Draw your card to align your focus, receive timeless wisdom, and ground your emotional state for the day."}
          </p>
        </div>

        {/* Card Draw Section */}
        <div className="flex flex-col items-center justify-center my-8">
          {!pulledCard ? (
            <motion.div
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              onClick={drawCard}
              className={`w-64 h-96 sm:w-72 sm:h-[26rem] rounded-3xl cursor-pointer bg-gradient-to-br from-indigo-900 via-purple-950 to-slate-950 border-2 border-purple-500/40 shadow-2xl flex flex-col items-center justify-center p-6 text-center relative overflow-hidden group ${
                isFlipping ? "animate-pulse" : ""
              }`}
            >
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-500/10 via-transparent to-transparent opacity-60" />

              <div className="w-20 h-20 rounded-full border border-purple-400/30 flex items-center justify-center mb-6 group-hover:border-amber-400 transition-colors">
                <Sparkles className="w-10 h-10 text-amber-400 group-hover:rotate-12 transition-transform" />
              </div>

              <h3 className="text-lg font-bold text-white mb-2">
                {isFlipping
                  ? lang === "id"
                    ? "Menyelaraskan Jiwa..."
                    : "Aligning Frequencies..."
                  : lang === "id"
                  ? "Sentuh untuk Menarik Kartu"
                  : "Tap to Draw Your Card"}
              </h3>
              <p className="text-xs text-slate-400">
                {lang === "id"
                  ? "Tarik napas dalam sejenak sebelum menyentuh"
                  : "Take a deep breath and set an intention"}
              </p>
            </motion.div>
          ) : (
            /* Card Revealed */
            <motion.div
              initial={{ rotateY: 90, opacity: 0 }}
              animate={{ rotateY: 0, opacity: 1 }}
              transition={{ duration: 0.6, type: "spring" }}
              className="w-full max-w-xl"
            >
              <div
                className={`rounded-3xl p-6 md:p-8 bg-gradient-to-br ${pulledCard.color} border border-slate-700/80 shadow-2xl relative overflow-hidden backdrop-blur-md`}
              >
                <div className="flex items-center justify-between gap-4 mb-6">
                  <span className="px-3 py-1 rounded-full bg-white/10 border border-white/20 text-white text-xs font-bold uppercase tracking-wider">
                    {pulledCard.badge[lang]}
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={copyCardWisdom}
                      className="p-2 rounded-xl bg-black/30 border border-white/10 text-slate-200 hover:text-white transition-colors"
                      title="Copy Card"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                    <button
                      onClick={redrawCard}
                      className="p-2 rounded-xl bg-black/30 border border-white/10 text-slate-200 hover:text-white transition-colors"
                      title="Draw Again"
                    >
                      <RotateCcw className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <h2 className="text-2xl md:text-3xl font-black text-white mb-3 tracking-tight">
                  {pulledCard.name[lang]}
                </h2>

                {/* Affirmation Box */}
                <div className="bg-black/40 border border-white/10 rounded-2xl p-4 mb-6 backdrop-blur-sm">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-amber-300 mb-1 flex items-center gap-1.5">
                    <Star className="w-3.5 h-3.5 fill-current" />
                    <span>{lang === "id" ? "Afirmasi Hari Ini" : "Daily Affirmation"}</span>
                  </div>
                  <p className="text-base md:text-lg font-medium text-white italic">
                    "{pulledCard.affirmation[lang]}"
                  </p>
                </div>

                {/* Core Wisdom */}
                <div className="text-sm md:text-base text-slate-200 leading-relaxed mb-6">
                  {pulledCard.message[lang]}
                </div>

                {/* Journal Prompt & Micro Ritual */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-6 border-t border-white/10">
                  <div className="bg-black/30 rounded-xl p-3.5 border border-white/10">
                    <div className="text-xs font-bold text-amber-300 flex items-center gap-1.5 mb-1.5">
                      <BookOpen className="w-3.5 h-3.5" />
                      <span>{lang === "id" ? "Pertanyaan Jurnal:" : "Journaling Prompt:"}</span>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {pulledCard.journalPrompt[lang]}
                    </p>
                  </div>

                  <div className="bg-black/30 rounded-xl p-3.5 border border-white/10">
                    <div className="text-xs font-bold text-emerald-300 flex items-center gap-1.5 mb-1.5">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>{lang === "id" ? "Ritual 60 Detik:" : "60-Second Ritual:"}</span>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {pulledCard.microRitual[lang]}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>

        {/* AdSense Mid Banner */}
        <div className="my-8">
          <AdSenseBanner slot="oracle-result-mid" format="horizontal" />
        </div>

        {/* Explore More Tools */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <Link
            to="/soundscapes"
            className="bg-slate-900 border border-slate-800 hover:border-slate-700 p-5 rounded-2xl transition-all group"
          >
            <Sparkles className="w-6 h-6 text-amber-400 mb-2 group-hover:scale-110 transition-transform" />
            <h4 className="text-sm font-bold text-white mb-1">Sound Sanctuary</h4>
            <p className="text-xs text-slate-400">
              Brown noise, gentle rain, and 528Hz Alpha tones.
            </p>
          </Link>

          <Link
            to="/game/zen-pop"
            className="bg-slate-900 border border-slate-800 hover:border-slate-700 p-5 rounded-2xl transition-all group"
          >
            <Heart className="w-6 h-6 text-emerald-400 mb-2 group-hover:scale-110 transition-transform" />
            <h4 className="text-sm font-bold text-white mb-1">Zen Bubble Game</h4>
            <p className="text-xs text-slate-400">
              Mindful bubble popper with crystal chime harmonics.
            </p>
          </Link>

          <Link
            to="/quiz/attachment-style"
            className="bg-slate-900 border border-slate-800 hover:border-slate-700 p-5 rounded-2xl transition-all group"
          >
            <Compass className="w-6 h-6 text-pink-400 mb-2 group-hover:scale-110 transition-transform" />
            <h4 className="text-sm font-bold text-white mb-1">Attachment Quiz</h4>
            <p className="text-xs text-slate-400">
              Discover your relational style (Secure, Anxious, Avoidant).
            </p>
          </Link>
        </div>

        <AppStoreCta />
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 bg-slate-950 py-8 text-center text-xs text-slate-500">
        <div className="max-w-5xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} Ju Journal. Mindful reflection games.</p>
          <div className="flex items-center gap-4 text-slate-400">
            <Link to="/privacy" className="hover:text-slate-200">
              Privacy
            </Link>
            <Link to="/terms" className="hover:text-slate-200">
              Terms
            </Link>
            <Link to="/medical-disclaimer" className="hover:text-slate-200">
              Disclaimer
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default DailyOracleGame;
