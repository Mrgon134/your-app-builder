import juGreat from "@/assets/ju-great.webp";
import juGood from "@/assets/ju-good.webp";
import juOkay from "@/assets/ju-okay.webp";
import juRough from "@/assets/ju-rough.webp";
import juLow from "@/assets/ju-low.webp";

export type DassPillar = "depression" | "anxiety" | "stress";
export type SeverityLevel = "normal" | "mild" | "moderate" | "severe" | "extremely_severe";
export type SupportedLang = "en" | "de" | "fr" | "es" | "id";

export interface DassItem {
  id: number;
  pillar: DassPillar;
  prompt: Record<SupportedLang, string>;
  subprompt?: Record<SupportedLang, string>;
}

export interface DassOption {
  score: number;
  label: Record<SupportedLang, string>;
  sublabel: Record<SupportedLang, string>;
  icon: string;
}

export interface PillarScoreResult {
  raw: number;
  score: number; // raw * 2 standard DASS-21 score
  maxScore: 42;
  percentage: number;
  severity: SeverityLevel;
  severityLabel: string;
  colorClass: string;
  textColorClass: string;
  badgeBgClass: string;
  description: string;
}

export interface DassEvaluationResult {
  depression: PillarScoreResult;
  anxiety: PillarScoreResult;
  stress: PillarScoreResult;
  wellnessIndex: number; // 0 - 100
  primaryConcernPillar: DassPillar | "balanced";
  highestSeverity: SeverityLevel;
  title: string;
  tagline: string;
  summary: string;
  cbtInsights: string[];
  actionSteps: string[];
  recommendedJournalPrompt: string;
  mascotMood: "great" | "good" | "okay" | "rough" | "low";
  mascotImage: string;
  shareSummaryText: string;
}

export const DASS21_OPTIONS: DassOption[] = [
  {
    score: 0,
    label: {
      en: "Did not apply to me at all",
      de: "Traf gar nicht auf mich zu",
      fr: "Ne s'est pas du tout appliqué à moi",
      es: "No se aplicó a mí en absoluto",
      id: "Tidak pernah sama sekali",
    },
    sublabel: {
      en: "Never or not at all in the past 7 days",
      de: "Nie oder überhaupt nicht in den letzten 7 Tagen",
      fr: "Jamais ou pas du tout au cours des 7 derniers jours",
      es: "Nunca o en absoluto en los últimos 7 días",
      id: "Tidak pernah terasa selama 7 hari terakhir",
    },
    icon: "⚪",
  },
  {
    score: 1,
    label: {
      en: "Applied to some degree",
      de: "Traf bis zu einem gewissen Grad zu",
      fr: "S'est appliqué à un certain degré",
      es: "Se aplicó hasta cierto punto",
      id: "Kadang-kadang terjadi",
    },
    sublabel: {
      en: "Occasionally or some of the time",
      de: "Gelegentlich oder zeitweise",
      fr: "Parfois ou de temps en temps",
      es: "Ocasionalmente o alguna parte del tiempo",
      id: "Sedikit atau sesekali dalam beberapa hari",
    },
    icon: "🟡",
  },
  {
    score: 2,
    label: {
      en: "Applied to a considerable degree",
      de: "Traf in beträchtlichem Maße zu",
      fr: "S'est appliqué à un degré considérable",
      es: "Se aplicó en un grado considerable",
      id: "Sering terjadi",
    },
    sublabel: {
      en: "A good part of the time",
      de: "Einen guten Teil der Zeit",
      fr: "Une bonne partie du temps",
      es: "Gran parte del tiempo",
      id: "Cukup sering terasa sebagian besar waktu",
    },
    icon: "🟠",
  },
  {
    score: 3,
    label: {
      en: "Applied very much or most of the time",
      de: "Traf sehr stark oder meistens zu",
      fr: "S'est appliqué presque tout le temps",
      es: "Se aplicó mucho o la mayor parte del tiempo",
      id: "Hampir selalu terjadi",
    },
    sublabel: {
      en: "Continuously or almost constantly",
      de: "Fortlaufend oder fast ständig",
      fr: "Continuellement ou presque constamment",
      es: "Continuamente o casi constantemente",
      id: "Terus-menerus atau hampir sepanjang waktu",
    },
    icon: "🔴",
  },
];

export const DASS21_ITEMS: DassItem[] = [
  {
    id: 1,
    pillar: "stress",
    prompt: {
      en: "I found it hard to wind down and relax.",
      de: "Es fiel mir schwer, mich zu beruhigen und abzuschalten.",
      fr: "J'ai eu du mal à décompresser et à me détendre.",
      es: "Me costó mucho calmarme y relajarme.",
      id: "Saya merasa sulit untuk menenangkan diri atau relaks.",
    },
    subprompt: {
      en: "Difficulty disengaging from internal tension or overstimulation.",
      de: "Schwierigkeit, innere Anspannung oder Reizüberflutung loszulassen.",
      fr: "Difficulté à relâcher la tension interne ou la surstimulation.",
      es: "Dificultad para desconectar de la tensión interna o sobreestimulación.",
      id: "Sulit melepaskan ketegangan batin setelah beraktivitas.",
    },
  },
  {
    id: 2,
    pillar: "anxiety",
    prompt: {
      en: "I was aware of dryness of my mouth.",
      de: "Ich bemerkte, dass mein Mund trocken war.",
      fr: "J'avais conscience d'avoir la bouche sèche.",
      es: "Fui consciente de tener la boca seca.",
      id: "Saya menyadari mulut saya terasa kering.",
    },
    subprompt: {
      en: "Autonomic nervous system arousal unrelated to thirst or food.",
      de: "Erregung des vegetativen Nervensystems, unabhängig von Durst.",
      fr: "Activation du système nerveux autonome sans lien avec la soif.",
      es: "Activación del sistema nervioso autónomo no relacionada con la sed.",
      id: "Reaksi saraf otonom yang tidak berkaitan dengan dehidrasi/makanan.",
    },
  },
  {
    id: 3,
    pillar: "depression",
    prompt: {
      en: "I couldn't seem to experience any positive feeling at all.",
      de: "Ich schien überhaupt keine positiven Gefühle empfinden zu können.",
      fr: "Je semblais incapable d'éprouver le moindre sentiment positif.",
      es: "Parecía incapaz de experimentar ningún sentimiento positivo.",
      id: "Saya merasa tidak dapat merasakan perasaan positif sama sekali.",
    },
    subprompt: {
      en: "Loss of joy, emotional numbness, or anhedonia.",
      de: "Verlust von Freude, emotionale Taubheit oder Anhedonie.",
      fr: "Perte de joie, engourdissement émotionnel ou anhédonie.",
      es: "Pérdida de alegría, entumecimiento emocional o anhedonia.",
      id: "Sulit merasakan kegembiraan atau kehampaan emosi.",
    },
  },
  {
    id: 4,
    pillar: "anxiety",
    prompt: {
      en: "I experienced breathing difficulty without physical exertion.",
      de: "Ich hatte Atembeschwerden ohne jede körperliche Anstrengung.",
      fr: "J'ai eu des difficultés à respirer sans effort physique.",
      es: "Experimenté dificultad para respirar sin hacer esfuerzo físico.",
      id: "Saya mengalami kesulitan bernapas tanpa adanya aktivitas fisik berat.",
    },
    subprompt: {
      en: "Excessively rapid breathing, shortness of breath, or sighing.",
      de: "Schnelle Atmung, Kurzatmigkeit oder auffälliges Seufzen.",
      fr: "Respiration excessivement rapide, essoufflement ou soupirs.",
      es: "Respiración acelerada, falta de aire o suspiros constantes.",
      id: "Napas memburu, sesak di dada, atau tarikan napas berat tiba-tiba.",
    },
  },
  {
    id: 5,
    pillar: "depression",
    prompt: {
      en: "I found it difficult to work up the initiative to do things.",
      de: "Es fiel mir schwer, die Initiative für Aktivitäten zu ergreifen.",
      fr: "J'ai trouvé difficile de prendre l'initiative de faire les choses.",
      es: "Me resultó difícil tomar la iniciativa para hacer cosas.",
      id: "Saya merasa sulit untuk memulai inisiatif melakukan hal-hal harian.",
    },
    subprompt: {
      en: "Lack of motivational drive or behavioral activation.",
      de: "Fehlender Antrieb oder verminderte Handlungsfähigkeit.",
      fr: "Manque d'élan motivationnel ou d'activation comportementale.",
      es: "Falta de impulso motivacional o activación conductual.",
      id: "Kehilangan dorongan motivasi bahkan untuk tugas sederhana.",
    },
  },
  {
    id: 6,
    pillar: "stress",
    prompt: {
      en: "I tended to over-react to situations.",
      de: "Ich neigte dazu, auf Situationen überzureagieren.",
      fr: "J'avais tendance à réagir de façon excessive aux situations.",
      es: "Tendí a reaccionar exageradamente ante las situaciones.",
      id: "Saya cenderung bereaksi berlebihan terhadap situasi.",
    },
    subprompt: {
      en: "Losing temper, heightened irritability, or emotional impatience.",
      de: "Reizbarkeit, schnelle Wut oder emotionale Ungeduld.",
      fr: "Irritabilité accrue, colère rapide ou impatience émotionnelle.",
      es: "Irritabilidad intensa, pérdida de paciencia o enfado rápido.",
      id: "Mudah terpancing, gampang kesal, atau kurang sabar menghadapi hal kecil.",
    },
  },
  {
    id: 7,
    pillar: "anxiety",
    prompt: {
      en: "I experienced trembling or shakiness (e.g. in my hands).",
      de: "Ich zitterte (z. B. an den Händen).",
      fr: "J'ai ressenti des tremblements (par exemple dans les mains).",
      es: "Experimenté temblores (por ejemplo, en las manos).",
      id: "Saya merasa gemetar pada anggota tubuh (misalnya pada tangan).",
    },
    subprompt: {
      en: "Physical tremors linked to internal nervous apprehension.",
      de: "Körperliches Zittern durch innere nervöse Unruhe.",
      fr: "Tremblements physiques liés à une appréhension nerveuse interne.",
      es: "Temblores físicos vinculados a la inquietud nerviosa interna.",
      id: "Sensasi getaran fisik akibat kegelisahan saraf.",
    },
  },
  {
    id: 8,
    pillar: "stress",
    prompt: {
      en: "I felt that I was using a lot of nervous energy.",
      de: "Ich hatte das Gefühl, viel nervöse Energie zu verbrauchen.",
      fr: "J'avais l'impression de dépenser beaucoup d'énergie nerveuse.",
      es: "Sentí que estaba gastando mucha energía nerviosa.",
      id: "Saya merasa banyak menghabiskan energi untuk rasa gelisah dan tegang.",
    },
    subprompt: {
      en: "Being on edge, feeling wound up, or running on adrenaline.",
      de: "Ständige Anspannung, Rastlosigkeit oder Laufen auf Hochtouren.",
      fr: "Être sur les nerfs, sous pression ou carburant à l'adrénaline.",
      es: "Estar al límite, con los nervios de punta o con exceso de adrenalina.",
      id: "Merasa selalu waspada, tegang, atau menguras daya mental.",
    },
  },
  {
    id: 9,
    pillar: "anxiety",
    prompt: {
      en: "I was worried about situations in which I might panic and make a fool of myself.",
      de: "Ich machte mir Sorgen über Situationen, in denen ich in Panik geraten könnte.",
      fr: "Je m'inquiétais des situations où je pourrais paniquer et me ridiculiser.",
      es: "Me preocupaban las situaciones en las que pudiera entrar en pánico.",
      id: "Saya khawatir akan situasi di mana saya bisa panik atau mempermalukan diri.",
    },
    subprompt: {
      en: "Anticipatory dread, fear of social exposure, or loss of composure.",
      de: "Vorahnende Angst oder Furcht vor Kontrollverlust in der Öffentlichkeit.",
      fr: "Crainte anticipatoire ou peur de perdre contenance en public.",
      es: "Temor anticipatorio o miedo a perder la compostura en público.",
      id: "Kecemasan antisipatif atau ketakutan kehilangan kendali diri.",
    },
  },
  {
    id: 10,
    pillar: "depression",
    prompt: {
      en: "I felt that I had nothing to look forward to.",
      de: "Ich hatte das Gefühl, nichts zu haben, worauf ich mich freuen konnte.",
      fr: "J'avais le sentiment de n'avoir rien de réjouissant devant moi.",
      es: "Sentí que no tenía nada por lo que ilusionarme.",
      id: "Saya merasa tidak ada hal baik yang dapat saya harapkan di masa depan.",
    },
    subprompt: {
      en: "Pessimism regarding upcoming days or life trajectory.",
      de: "Pessimismus bezüglich der Zukunft oder des eigenen Lebenswegs.",
      fr: "Pessimisme concernant l'avenir ou la trajectoire de vie.",
      es: "Pesimismo sobre el futuro o la trayectoria de vida.",
      id: "Rasa pesimistis atau pandangan suram terhadap hari esok.",
    },
  },
  {
    id: 11,
    pillar: "stress",
    prompt: {
      en: "I found myself getting agitated or easily ruffled.",
      de: "Ich merkte, dass ich leicht unruhig und gereizt wurde.",
      fr: "Je me suis retrouvé agité(e) ou facilement contrarié(e).",
      es: "Me encontré agitado(a) o fácilmente inquieto(a).",
      id: "Saya mendapati diri saya mudah gelisah atau resah.",
    },
    subprompt: {
      en: "Low tolerance for minor interruptions or unexpected delays.",
      de: "Geringe Frustrationstoleranz bei kleinen Unterbrechungen.",
      fr: "Faible tolérance aux interruptions mineures ou retards imprévus.",
      es: "Baja tolerancia a pequeñas interrupciones o retrasos.",
      id: "Toleransi rendah terhadap gangguan kecil atau hambatan rencana.",
    },
  },
  {
    id: 12,
    pillar: "stress",
    prompt: {
      en: "I found it difficult to relax or switch off my thoughts.",
      de: "Es fiel mir schwer, mich zu entspannen und die Gedanken abzustellen.",
      fr: "J'ai eu du mal à me détendre ou à calmer mes pensées.",
      es: "Me resultó difícil relajarme o desconectar la mente.",
      id: "Saya merasa sulit untuk benar-benar relaks atau mengistirahatkan pikiran.",
    },
    subprompt: {
      en: "Mental gears continually spinning even in bed or during breaks.",
      de: "Gedankenkarussell, das auch in Ruhephasen weiterdreht.",
      fr: "Le cerveau tourne en boucle même au lit ou en pause.",
      es: "Pensamientos que no paran de dar vueltas incluso al descansar.",
      id: "Kepala terus berputar memikirkan urusan bahkan saat istirahat.",
    },
  },
  {
    id: 13,
    pillar: "depression",
    prompt: {
      en: "I felt down-hearted, blue, and dispirited.",
      de: "Ich fühlte mich niedergeschlagen, traurig und entmutigt.",
      fr: "Je me sentais abattu(e), triste et découragé(e).",
      es: "Me sentí desanimado(a), triste y abatido(a).",
      id: "Saya merasa sedih, murung, dan kehilangan semangat batin.",
    },
    subprompt: {
      en: "Persistent low mood or psychological heaviness.",
      de: "Anhaltend gedrückte Stimmung oder seelische Schwere.",
      fr: "Humeur basse persistante ou lourdeur psychologique.",
      es: "Bajo estado de ánimo persistente o pesadez emocional.",
      id: "Perasaan hampa, lesu, atau kesedihan yang menetap.",
    },
  },
  {
    id: 14,
    pillar: "stress",
    prompt: {
      en: "I was intolerant of anything that kept me from getting on with what I was doing.",
      de: "Ich war ungeduldig bei allem, was mich bei meiner Arbeit aufhielt.",
      fr: "Je ne supportais rien qui m'empêchait d'avancer dans ce que je faisais.",
      es: "Fui intolerante con cualquier cosa que me impidiera continuar con lo que hacía.",
      id: "Saya tidak sabar terhadap hal apa pun yang menghambat pekerjaan saya.",
    },
    subprompt: {
      en: "Frustration when progress is slowed by trivial obstacles.",
      de: "Frustration, wenn der Fortschritt durch Kleinigkeiten gehemmt wird.",
      fr: "Frustration intense face aux petits obstacles du quotidien.",
      es: "Frustración cuando el progreso se frena por obstáculos menores.",
      id: "Kekesalan mendalam ketika rencana berjalan lambat.",
    },
  },
  {
    id: 15,
    pillar: "anxiety",
    prompt: {
      en: "I felt I was close to panic or losing my footing.",
      de: "Ich hatte das Gefühl, einer Panik nahe zu sein.",
      fr: "J'avais l'impression d'être proche de la panique.",
      es: "Sentí que estaba cerca del pánico o perdiendo el control.",
      id: "Saya merasa sangat dekat dengan kepanikan.",
    },
    subprompt: {
      en: "Sudden surges of acute panic or overwhelming alarm.",
      de: "Plötzliche Wellen akuter Panik oder Überwältigung.",
      fr: "Vagues soudaines de panique aiguë ou alarme interne intense.",
      es: "Oleadas repentinas de pánico agudo o alarma abrumadora.",
      id: "Gelombang panik yang tiba-tiba datang tanpa peringatan.",
    },
  },
  {
    id: 16,
    pillar: "depression",
    prompt: {
      en: "I was unable to become enthusiastic about anything.",
      de: "Ich konnte mich für nichts begeistern.",
      fr: "J'étais incapable de m'enthousiasmer pour quoi que ce soit.",
      es: "Fui incapaz de entusiasmarme por nada.",
      id: "Saya tidak mampu merasa antusias tentang hal apa pun.",
    },
    subprompt: {
      en: "Apathy toward hobbies, work, or social connections.",
      de: "Gleichgültigkeit gegenüber Hobbys, Arbeit oder Freundschaften.",
      fr: "Apathie envers les passions, le travail ou les proches.",
      es: "Apatía hacia pasatiempos, trabajo o relaciones sociales.",
      id: "Ketidakmampuan menikmati hobi, karya, atau perjumpaan sosial.",
    },
  },
  {
    id: 17,
    pillar: "depression",
    prompt: {
      en: "I felt I wasn't worth much as a person.",
      de: "Ich fühlte mich als Mensch nicht viel wert.",
      fr: "J'avais l'impression de ne pas valoir grand-chose en tant que personne.",
      es: "Sentí que no valía mucho como persona.",
      id: "Saya merasa diri saya tidak berharga.",
    },
    subprompt: {
      en: "Harsh self-criticism, self-devaluation, or feelings of inadequacy.",
      de: "Harte Selbstkritik, Entwertung oder Gefühle der Unzulänglichkeit.",
      fr: "Autocritique sévère, dévalorisation de soi ou sentiment d'inutilité.",
      es: "Autocrítica severa, desvalorización o sentimientos de insuficiencia.",
      id: "Suara kritik diri yang keras dan perasaan tidak cukup baik.",
    },
  },
  {
    id: 18,
    pillar: "stress",
    prompt: {
      en: "I felt that I was rather touchy and easily provoked.",
      de: "Ich fühlte mich ziemlich empfindlich und leicht reizbar.",
      fr: "Je me sentais plutôt susceptible et facilement irritable.",
      es: "Sentí que estaba bastante susceptible y que me molestaba con facilidad.",
      id: "Saya merasa diri saya agak sensitif dan mudah tersinggung.",
    },
    subprompt: {
      en: "Heightened emotional reactivity to feedback or trivial comments.",
      de: "Erhöhte Reaktivität auf Rückmeldungen oder beiläufige Bemerkungen.",
      fr: "Réactivité émotionnelle accrue face aux remarques ordinaires.",
      es: "Alta reactividad emocional ante comentarios o críticas menores.",
      id: "Reaktivitas emosional yang tinggi terhadap komentar orang lain.",
    },
  },
  {
    id: 19,
    pillar: "anxiety",
    prompt: {
      en: "I was aware of my heart pounding or racing without physical exercise.",
      de: "Ich spürte mein Herz rasen oder klopfen, ohne körperliche Anstrengung.",
      fr: "Je sentais les battements de mon cœur s'accélérer sans effort physique.",
      es: "Noté que el corazón me latía con fuerza o rapidez sin ejercicio físico.",
      id: "Saya merasakan detak jantung berdebar kencang tanpa aktivitas fisik.",
    },
    subprompt: {
      en: "Palpitations, missed beats, or awareness of elevated heart rate.",
      de: "Herzklopfen, unregelmäßiger Schlag oder spürbar hoher Puls.",
      fr: "Palpitations cardiaques ou sensation de battements rapides au repos.",
      es: "Palpitaciones o sensación de taquicardia estando en reposo.",
      id: "Sensasi jantung berdegup kencang saat duduk diam.",
    },
  },
  {
    id: 20,
    pillar: "anxiety",
    prompt: {
      en: "I felt scared or terrified without any clear reason.",
      de: "Ich fühlte mich ängstlich oder erschrocken, ohne klaren Grund.",
      fr: "J'avais peur ou j'étais effrayé(e) sans raison valable.",
      es: "Sentí miedo o terror sin una razón clara.",
      id: "Saya merasa takut atau ngeri tanpa alasan yang jelas.",
    },
    subprompt: {
      en: "Free-floating dread, feeling like something terrible is about to occur.",
      de: "Diffuses Angstgefühl, als stünde eine Katastrophe bevor.",
      fr: "Sentiment diffus de panique ou d'angoisse sans cause évidente.",
      es: "Angustia difusa, como si algo terrible fuera a ocurrir.",
      id: "Kecemasan mengambang seolah ada hal buruk yang akan menimpa.",
    },
  },
  {
    id: 21,
    pillar: "depression",
    prompt: {
      en: "I felt that life was meaningless or devoid of purpose.",
      de: "Ich hatte das Gefühl, dass das Leben sinnlos oder ohne Zweck war.",
      fr: "J'avais le sentiment que la vie n'avait aucun sens ni but.",
      es: "Sentí que la vida no tenía sentido ni propósito.",
      id: "Saya merasa hidup ini tidak ada artinya atau hampa.",
    },
    subprompt: {
      en: "Existential exhaustion or profound discouragement.",
      de: "Existentielle Erschöpfung oder tiefe Sinnkrise.",
      fr: "Épuisement existentiel ou profond découragement intérieur.",
      es: "Agotamiento existencial o profundo desánimo vital.",
      id: "Kelelahan batin eksistensial dan hilangnya arah makna hidup.",
    },
  },
];

export function evaluatePillar(
  rawScore: number,
  pillar: DassPillar,
  lang: SupportedLang
): PillarScoreResult {
  const scaledScore = rawScore * 2;
  const percentage = Math.min(100, Math.round((scaledScore / 42) * 100));

  let severity: SeverityLevel = "normal";

  if (pillar === "depression") {
    if (scaledScore <= 9) severity = "normal";
    else if (scaledScore <= 13) severity = "mild";
    else if (scaledScore <= 20) severity = "moderate";
    else if (scaledScore <= 27) severity = "severe";
    else severity = "extremely_severe";
  } else if (pillar === "anxiety") {
    if (scaledScore <= 7) severity = "normal";
    else if (scaledScore <= 9) severity = "mild";
    else if (scaledScore <= 14) severity = "moderate";
    else if (scaledScore <= 19) severity = "severe";
    else severity = "extremely_severe";
  } else {
    // stress
    if (scaledScore <= 14) severity = "normal";
    else if (scaledScore <= 18) severity = "mild";
    else if (scaledScore <= 25) severity = "moderate";
    else if (scaledScore <= 33) severity = "severe";
    else severity = "extremely_severe";
  }

  const severityLabels: Record<SupportedLang, Record<SeverityLevel, string>> = {
    en: {
      normal: "Normal (Balanced)",
      mild: "Mild",
      moderate: "Moderate",
      severe: "Severe",
      extremely_severe: "Extremely Severe",
    },
    de: {
      normal: "Normal (Ausgeglichen)",
      mild: "Leicht",
      moderate: "Mäßig",
      severe: "Schwer",
      extremely_severe: "Sehr schwer",
    },
    fr: {
      normal: "Normal (Équilibré)",
      mild: "Léger",
      moderate: "Modéré",
      severe: "Sévère",
      extremely_severe: "Extrêmement sévère",
    },
    es: {
      normal: "Normal (Equilibrado)",
      mild: "Leve",
      moderate: "Moderado",
      severe: "Severo",
      extremely_severe: "Extremadamente severo",
    },
    id: {
      normal: "Normal (Seimbang)",
      mild: "Ringan",
      moderate: "Sedang",
      severe: "Berat",
      extremely_severe: "Sangat Berat",
    },
  };

  const colors: Record<SeverityLevel, { colorClass: string; textColorClass: string; badgeBgClass: string }> = {
    normal: {
      colorClass: "bg-emerald-500",
      textColorClass: "text-emerald-700 dark:text-emerald-400",
      badgeBgClass: "bg-emerald-100 text-emerald-800 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800",
    },
    mild: {
      colorClass: "bg-amber-400",
      textColorClass: "text-amber-700 dark:text-amber-400",
      badgeBgClass: "bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-800",
    },
    moderate: {
      colorClass: "bg-orange-500",
      textColorClass: "text-orange-700 dark:text-orange-400",
      badgeBgClass: "bg-orange-100 text-orange-800 border-orange-200 dark:bg-orange-950/40 dark:text-orange-300 dark:border-orange-800",
    },
    severe: {
      colorClass: "bg-rose-500",
      textColorClass: "text-rose-700 dark:text-rose-400",
      badgeBgClass: "bg-rose-100 text-rose-800 border-rose-200 dark:bg-rose-950/40 dark:text-rose-300 dark:border-rose-800",
    },
    extremely_severe: {
      colorClass: "bg-purple-600",
      textColorClass: "text-purple-700 dark:text-purple-400",
      badgeBgClass: "bg-purple-100 text-purple-800 border-purple-200 dark:bg-purple-950/40 dark:text-purple-300 dark:border-purple-800",
    },
  };

  const pillarDescriptions: Record<SupportedLang, Record<DassPillar, Record<SeverityLevel, string>>> = {
    en: {
      depression: {
        normal: "Your emotional vitality is in a healthy, grounded range. You experience baseline optimism.",
        mild: "Mild dip in enthusiasm or temporary emotional fatigue. Responds well to gentle reflection.",
        moderate: "Moderate heaviness, reduced drive, and self-criticism. Requires intentional cognitive reframing.",
        severe: "Significant emotional depletion, apathy, and difficulty finding hope.",
        extremely_severe: "Profound psychological exhaustion. We strongly recommend professional consultation.",
      },
      anxiety: {
        normal: "Your sympathetic nervous system is regulated. Physical apprehension is at healthy baseline.",
        mild: "Slight somatic restlessness or situational nervousness common during demanding weeks.",
        moderate: "Noticeable physiological tension (racing thoughts, rapid pulse). Nervous system in alert mode.",
        severe: "Heightened autonomic activation, frequent sudden alarms, and somatic distress.",
        extremely_severe: "Overwhelming anxiety spikes or chronic panic state. Reach out to healthcare professionals.",
      },
      stress: {
        normal: "Healthy stress resilience. You adapt flexibly to daily friction and return smoothly to calm.",
        mild: "Mild tension and difficulty switching off after work. Early indicator of cognitive overload.",
        moderate: "Noticeable irritability, impatience, and feeling wound-up. Boundaries are urgently needed.",
        severe: "High chronic tension and near-burnout exhaustion. Mind struggles to process extra stimuli.",
        extremely_severe: "Extreme sensory and nervous overload. Immediate rest and professional support advised.",
      },
    },
    de: {
      depression: {
        normal: "Deine emotionale Vitalität ist im gesunden Bereich. Du hast eine stabile Grundmotivation.",
        mild: "Leichter Rückgang der Begeisterung oder vorübergehende Erschöpfung. Guter Zeitpunkt für Journaling.",
        moderate: "Spürbare Schwere, verminderter Antrieb und Selbstkritik. Benötigt achtsame kognitive Entlastung.",
        severe: "Erhebliche emotionale Erschöpfung und Niedergeschlagenheit. Priorisiere seelische Fürsorge.",
        extremely_severe: "Tiefe seelische Erschöpfung. Wir empfehlen dringend die Rücksprache mit Fachkräften.",
      },
      anxiety: {
        normal: "Dein Nervensystem ist ruhig und reguliert. Körperliche Anspannung liegt im Normalbereich.",
        mild: "Leichte innere Unruhe oder situative Nervosität bei anstehenden Herausforderungen.",
        moderate: "Spürbare physiologische Anspannung (schneller Puls, flache Atmung). Wachsamer Alarmzustand.",
        severe: "Hohe nervöse Aktivierung und wiederkehrende Angstgefühle. Benötigt gezielte Atemübungen.",
        extremely_severe: "Akute Panikzustände oder überwältigende Angst. Bitte suche professionelle Hilfe.",
      },
      stress: {
        normal: "Sehr gute Stressresilienz. Du verarbeitest alltägliche Reibungspunkte flexibel und gelassen.",
        mild: "Leichte Anspannung und Schwierigkeiten, nach der Arbeit abzuschalten. Frühwarnsignal.",
        moderate: "Erhöhte Reizbarkeit, Ungeduld und ständige Hetze. Zeit für klare persönliche Grenzen.",
        severe: "Chronische Überlastung und Burnout-Gefahr. Dein Gehirn benötigt dringend Erholung.",
        extremely_severe: "Extreme nervliche Überlastung. Sofortige Auszeit und Begleitung ratsam.",
      },
    },
    fr: {
      depression: {
        normal: "Votre vitalité émotionnelle est saine et équilibrée. Vous disposez d'un bon optimisme de base.",
        mild: "Légère baisse d'enthousiasme ou fatigue passagère. Répond bien à un repos de qualité.",
        moderate: "Lourdeur modérée, manque d'élan et autocritique. Nécessite une bienveillance envers soi-même.",
        severe: "Épuisement émotionnel important et apathie. Signal clair pour déposer votre fardeau.",
        extremely_severe: "Profonde détresse psychologique. Nous vous encourageons à consulter un professionnel.",
      },
      anxiety: {
        normal: "Votre système nerveux est apaisé. L'appréhension physique se situe au niveau normal.",
        mild: "Légère nervosité ou agitation somatique courante en période de pression.",
        moderate: "Tension physique marquée (pensées qui tournent, pouls rapide). Système en alerte.",
        severe: "Activation intense de l'anxiété et alarmes corporelles fréquentes. Nécessite de la régulation.",
        extremely_severe: "Angoisse aiguë ou état de panique persistant. Consultez un médecin ou psychologue.",
      },
      stress: {
        normal: "Excellente résilience au stress. Vous vous adaptez souplement aux imprévus quotidiens.",
        mild: "Tension modérée et difficulté à déconnecter après le travail. Signal précoce de surcharge.",
        moderate: "Irritabilité, impatience et sentiment d'urgence constant. Besoin urgent de limites claires.",
        severe: "Forte tension chronique et état proche du burn-out. L'esprit a du mal à tout absorber.",
        extremely_severe: "Surcharge nerveuse extrême. Un repos complet et un soutien médical sont nécessaires.",
      },
    },
    es: {
      depression: {
        normal: "Tu vitalidad emocional se encuentra en un rango saludable. Mantienes una buena motivación.",
        mild: "Leve bajón de entusiasmo o cansancio pasajero. Responde muy bien a pausas de calidad.",
        moderate: "Pesadez moderada, desánimo y autocrítica. Requiere reestructuración cognitiva y descanso.",
        severe: "Agotamiento emocional significativo y desilusión. Señal importante de buscar apoyo.",
        extremely_severe: "Agotamiento anímico profundo. Te recomendamos consultar con un profesional de la salud.",
      },
      anxiety: {
        normal: "Tu sistema nervioso se encuentra regulado y en calma. La sensación de alarma está equilibrada.",
        mild: "Inquietud somática leve o nerviosismo situacional ante tareas exigentes.",
        moderate: "Tensión fisiológica notable (taquicardia, respiración superficial). Sistema en modo alerta.",
        severe: "Alta activación nerviosa, sensación de sobresalto y desasosiego corporal constante.",
        extremely_severe: "Crisis de ansiedad intensa o pánico continuo. Te sugerimos contactar a un especialista.",
      },
      stress: {
        normal: "Excelente resiliencia ante el estrés. Te adaptas con flexibilidad y recuperas la calma rápido.",
        mild: "Tensión leve y cierta dificultad para desconectar después del trabajo. Señal de aviso.",
        moderate: "Irritabilidad, impaciencia y sensación de prisa constante. Momento de establecer límites.",
        severe: "Tensión crónica alta y riesgo de agotamiento extremo (burnout). La mente pide pausa.",
        extremely_severe: "Sobrecarga nerviosa y sensorial crítica. Se aconseja descanso total y ayuda médica.",
      },
    },
    id: {
      depression: {
        normal: "Suasana hati dan energi emosionalmu berada dalam rentang yang sehat dan seimbang.",
        mild: "Penurunan antusiasme ringan atau keletihan sementara. Mudah dipulihkan lewat refleksi.",
        moderate: "Beban emosi sedang, penurunan motivasi, dan kritik diri yang mulai mengganggu.",
        severe: "Keletihan emosional yang berat, keputusasaan, dan rasa hampa. Sinyal mencari bantuan.",
        extremely_severe: "Kelelahan batin yang sangat mendalam. Sangat disarankan berkonsultasi dengan profesional.",
      },
      anxiety: {
        normal: "Sistem sarafmu dalam kondisi tenang dan seimbang. Sensasi fisik berada pada batas wajar.",
        mild: "Kegelisahan ringan atau kekhawatiran situasional biasa saat menghadapi tenggat waktu.",
        moderate: "Ketegangan fisik terasa (napas pendek, detak jantung cepat). Saraf dalam mode waspada.",
        severe: "Aktivasi saraf tinggi, rasa waswas berlebih, dan rentan panik. Butuh relaksasi pernapasan.",
        extremely_severe: "Kecemasan akut yang intens dan melelahkan fisik. Dianjurkan berkonsultasi ke psikolog.",
      },
      stress: {
        normal: "Ketahanan stresmu sangat baik. Kamu mampu beradaptasi fleksibel menghadapi hambatan.",
        mild: "Ketegangan ringan dan sedikit sulit melepas pikiran kerja. Sinyal mengambil jeda sejenak.",
        moderate: "Mudah tersinggung, kurang sabar, dan terburu-buru. Waktunya mengatur batasan kerja.",
        severe: "Tegangan kronis tinggi mendekati burnout. Pikiran kesulitan menyerap stimulasi tambahan.",
        extremely_severe: "Kelebihan beban kognitif ekstrem. Butuh istirahat total dan pendampingan ahli.",
      },
    },
  };

  const currentLang = severityLabels[lang] ? lang : "en";

  return {
    raw: rawScore,
    score: scaledScore,
    maxScore: 42,
    percentage,
    severity,
    severityLabel: severityLabels[currentLang][severity],
    colorClass: colors[severity].colorClass,
    textColorClass: colors[severity].textColorClass,
    badgeBgClass: colors[severity].badgeBgClass,
    description: pillarDescriptions[currentLang][pillar][severity],
  };
}

export function calculateDass21Result(
  answers: Record<number, number>,
  lang: SupportedLang = "en"
): DassEvaluationResult {
  let depRaw = 0;
  let anxRaw = 0;
  let strRaw = 0;

  DASS21_ITEMS.forEach((item) => {
    const score = answers[item.id] ?? 0;
    if (item.pillar === "depression") depRaw += score;
    else if (item.pillar === "anxiety") anxRaw += score;
    else if (item.pillar === "stress") strRaw += score;
  });

  const depression = evaluatePillar(depRaw, "depression", lang);
  const anxiety = evaluatePillar(anxRaw, "anxiety", lang);
  const stress = evaluatePillar(strRaw, "stress", lang);

  const totalScaled = depression.score + anxiety.score + stress.score;
  const distressPercentage = Math.round((totalScaled / 126) * 100);
  const wellnessIndex = Math.max(5, Math.min(100, 100 - distressPercentage));

  const severityRank: Record<SeverityLevel, number> = {
    normal: 0,
    mild: 1,
    moderate: 2,
    severe: 3,
    extremely_severe: 4,
  };

  let highestSeverity: SeverityLevel = depression.severity;
  let primaryConcernPillar: DassPillar | "balanced" = "depression";
  let maxRank = severityRank[depression.severity];

  if (severityRank[anxiety.severity] > maxRank) {
    highestSeverity = anxiety.severity;
    primaryConcernPillar = "anxiety";
    maxRank = severityRank[anxiety.severity];
  } else if (severityRank[anxiety.severity] === maxRank && anxiety.score > depression.score) {
    primaryConcernPillar = "anxiety";
  }

  if (severityRank[stress.severity] > maxRank) {
    highestSeverity = stress.severity;
    primaryConcernPillar = "stress";
    maxRank = severityRank[stress.severity];
  } else if (
    severityRank[stress.severity] === maxRank &&
    stress.score > (primaryConcernPillar === "anxiety" ? anxiety.score : depression.score)
  ) {
    primaryConcernPillar = "stress";
  }

  if (
    depression.severity === "normal" &&
    anxiety.severity === "normal" &&
    stress.severity === "normal"
  ) {
    primaryConcernPillar = "balanced";
  }

  let mascotMood: "great" | "good" | "okay" | "rough" | "low" = "good";
  let mascotImage = juGood;

  if (wellnessIndex >= 85) {
    mascotMood = "great";
    mascotImage = juGreat;
  } else if (wellnessIndex >= 70) {
    mascotMood = "good";
    mascotImage = juGood;
  } else if (wellnessIndex >= 50) {
    mascotMood = "okay";
    mascotImage = juOkay;
  } else if (wellnessIndex >= 30) {
    mascotMood = "rough";
    mascotImage = juRough;
  } else {
    mascotMood = "low";
    mascotImage = juLow;
  }

  // Multilingual insight definitions
  const titles: Record<SupportedLang, Record<string, string>> = {
    en: {
      balanced: "Optimal Mental Vitality & Balance 🌿",
      stress: "High Cognitive Load & Friction Zone ⚡",
      anxiety: "Overactive Threat Radar & Nervous Tension 🌪️",
      depression: "Low Emotional Battery & Depleted Motivation 🌧️",
    },
    de: {
      balanced: "Optimale seelische Balance & Vitalität 🌿",
      stress: "Hohe kognitive Last & Reibungszone ⚡",
      anxiety: "Überaktives Alarmsystem & Nervosität 🌪️",
      depression: "Niedrige emotionale Batterie & Erschöpfung 🌧️",
    },
    fr: {
      balanced: "Vitalité mentale optimale & équilibre 🌿",
      stress: "Charge cognitive élevée & zone de tension ⚡",
      anxiety: "Radar d'alerte hyperactif & tension nerveuse 🌪️",
      depression: "Batterie émotionnelle basse & démotivation 🌧️",
    },
    es: {
      balanced: "Vitalidad mental óptima y equilibrio 🌿",
      stress: "Alta carga cognitiva y zona de fricción ⚡",
      anxiety: "Radar de alerta hiperactivo y tensión nerviosa 🌪️",
      depression: "Batería emocional baja y motivación agotada 🌧️",
    },
    id: {
      balanced: "Vitalitas Mental Seimbang & Kokoh 🌿",
      stress: "Beban Kognitif Tinggi & Zona Gesekan ⚡",
      anxiety: "Radar Ancaman Aktif & Ketegangan Saraf 🌪️",
      depression: "Baterai Emosi Kritis & Keletihan Motivasi 🌧️",
    },
  };

  const taglines: Record<SupportedLang, Record<string, string>> = {
    en: {
      balanced: "Your emotional equilibrium is calm, grounded, and well-regulated.",
      stress: "Your nervous system is carrying elevated tension and running low on patience.",
      anxiety: "Your somatic alarm system is hypervigilant, searching for worst-case outcomes.",
      depression: "You are experiencing emotional heaviness, anhedonia, and depleted reserves.",
    },
    de: {
      balanced: "Dein seelisches Gleichgewicht ist ruhig, stabil und gut reguliert.",
      stress: "Dein Nervensystem steht unter Dauerstrom und Geduldsreserven sind knapp.",
      anxiety: "Dein Alarmsystem ist überwachsam und rechnet mit dem Schlimmsten.",
      depression: "Du erlebst eine seelische Schwere und deine Energiereserven sind erschöpft.",
    },
    fr: {
      balanced: "Votre équilibre émotionnel est calme, ancré et bien régulé.",
      stress: "Votre système nerveux accumule une tension élevée et manque de patience.",
      anxiety: "Votre système d'alerte somatique est hypervigilant et anticipe le pire.",
      depression: "Vous ressentez une lourdeur émotionnelle et une énergie épuisée.",
    },
    es: {
      balanced: "Tu equilibrio emocional está en calma, estable y bien regulado.",
      stress: "Tu sistema nervioso soporta tensión acumulada y poca paciencia.",
      anxiety: "Tu sistema de alarma somática está hipervigilante y teme lo peor.",
      depression: "Estás experimentando pesadez emocional y reservas de energía vacías.",
    },
    id: {
      balanced: "Keseimbangan emosimu berada dalam kondisi tenang, sehat, dan terjaga baik.",
      stress: "Sistem sarafmu memikul ketegangan berlebih dan kehabisan kesabaran.",
      anxiety: "Sistem alarm tubuhmu sedang hiper-waspada mengantisipasi skenario terburuk.",
      depression: "Kamu sedang mengalami beban emosi berat dan terkurasnya daya hidup.",
    },
  };

  const prompts: Record<SupportedLang, Record<string, string>> = {
    en: {
      balanced: "What three micro-moments gave me genuine peace or joy today, and what made them possible?",
      stress: "What is one expectation I placed on myself today that I can safely postpone or let go of?",
      anxiety: "What is the worst-case fear looping in my mind, and what is the realistic best-case scenario?",
      depression: "If a compassionate friend were watching me struggle right now, what kind words would they whisper to me?",
    },
    de: {
      balanced: "Welche drei kleinen Momente haben mir heute echten Frieden geschenkt und warum?",
      stress: "Welche Erwartung an mich selbst kann ich heute ruhigen Gewissens aufschieben oder loslassen?",
      anxiety: "Welche Katastrophenfantasie kreist in meinem Kopf, und was ist die realistische beste Möglichkeit?",
      depression: "Wenn ein verständnisvoller Freund mich jetzt sehen würde, welche tröstenden Worte würde er mir sagen?",
    },
    fr: {
      balanced: "Quels trois micro-moments m'ont apporté une paix sincère aujourd'hui et pourquoi ?",
      stress: "Quelle attente envers moi-même puis-je raisonnablement reporter ou abandonner ce soir ?",
      anxiety: "Quelle est la pire peur qui tourne dans ma tête, et quel est le scénario réaliste plus doux ?",
      depression: "Si un ami bienveillant me voyait lutter en ce moment, quels mots doux me chuchoterait-il ?",
    },
    es: {
      balanced: "¿Qué tres pequeños momentos me dieron paz genuina hoy y qué los hizo posibles?",
      stress: "¿Qué autoexigencia que me impuse hoy puedo posponer o soltar con tranquilidad?",
      anxiety: "¿Cuál es el peor temor que se repite en mi mente y cuál es el escenario realista favorable?",
      depression: "Si un amigo comprensivo me viera esforzarme ahora, ¿qué palabras amables me diría?",
    },
    id: {
      balanced: "Tiga hal kecil apa yang memberikan rasa damai atau kepuasan batin hari ini, dan apa yang membuatnya istimewa?",
      stress: "Satu tuntutan apa yang saya bebankan pada diri sendiri hari ini yang sebenarnya bisa saya tunda atau relakan?",
      anxiety: "Ketakutan terburuk apa yang sedang berputar di kepalaku, dan kemungkinan realistis apa yang saya abaikan?",
      depression: "Jika seorang sahabat yang penyayang sedang melihat saya berjuang, kalimat lembut apa yang akan ia bisikkan ke telinga saya?",
    },
  };

  const activeLang = titles[lang] ? lang : "en";
  const pillarKey = primaryConcernPillar;

  const title = titles[activeLang][pillarKey];
  const tagline = taglines[activeLang][pillarKey];
  const recommendedJournalPrompt = prompts[activeLang][pillarKey];

  // Build summary based on language
  let summary = "";
  if (activeLang === "en") {
    summary = `Your overall Mental Wellness Index is ${wellnessIndex}/100. Depression is ${depression.score}/42 (${depression.severityLabel}), Anxiety is ${anxiety.score}/42 (${anxiety.severityLabel}), and Stress is ${stress.score}/42 (${stress.severityLabel}).`;
  } else if (activeLang === "de") {
    summary = `Dein seelischer Vitalitätsindex liegt bei ${wellnessIndex}/100. Depression: ${depression.score}/42 (${depression.severityLabel}), Angst: ${anxiety.score}/42 (${anxiety.severityLabel}), Stress: ${stress.score}/42 (${stress.severityLabel}).`;
  } else if (activeLang === "fr") {
    summary = `Votre indice de bien-être mental global est de ${wellnessIndex}/100. Dépression : ${depression.score}/42 (${depression.severityLabel}), Anxiété : ${anxiety.score}/42 (${anxiety.severityLabel}), Stress : ${stress.score}/42 (${stress.severityLabel}).`;
  } else if (activeLang === "es") {
    summary = `Tu índice de bienestar mental global es de ${wellnessIndex}/100. Depresión: ${depression.score}/42 (${depression.severityLabel}), Ansiedad: ${anxiety.score}/42 (${anxiety.severityLabel}), Estrés: ${stress.score}/42 (${stress.severityLabel}).`;
  } else {
    summary = `Indeks Kesehatan Mental Nujumu mencapai ${wellnessIndex}/100. Depresi: ${depression.score}/42 (${depression.severityLabel}), Cemas: ${anxiety.score}/42 (${anxiety.severityLabel}), Stres: ${stress.score}/42 (${stress.severityLabel}).`;
  }

  // CBT Insights
  const cbtMap: Record<SupportedLang, string[]> = {
    en: [
      "Your nervous system responds adaptively to accumulated demands; symptoms are biological signals, not flaws.",
      "Labeling intense thoughts as 'hypothetical mental events' rather than urgent facts halts cognitive spirals.",
      "Journaling externalizes chaotic rumination into structured narrative clarity.",
    ],
    de: [
      "Dein Nervensystem reagiert auf Belastungen; Anspannung ist ein biologisches Signal, kein persönliches Versagen.",
      "Das Benennen von Katastrophengedanken als bloße 'Hypothesen' stoppt Gedankenspiralen effektiv.",
      "Gezieltes Schreiben entlastet das Gehirn und schafft seelischen Abstand zu inneren Antreibern.",
    ],
    fr: [
      "Votre système nerveux répond aux charges accumulées : les symptômes sont des signaux physiologiques, pas des faiblesses.",
      "Distinguer les pensées anxiogènes des faits réels désamorce la boucle de panique.",
      "L'écriture expressive permet de clarifier le flot mental et de libérer la surcharge cognitive.",
    ],
    es: [
      "Tu sistema nervioso responde a la presión acumulada; los síntomas son señales biológicas, no fallos personales.",
      "Nombrar los pensamientos catastróficos como 'hipótesis temporales' frena el ciclo de preocupación.",
      "Escribir sobre tus emociones exterioriza el ruido mental y aporta claridad inmediata.",
    ],
    id: [
      "Sistem sarafmu merespons beban yang menumpuk; gejala ketegangan adalah sinyal biologis alami, bukan kelemahan.",
      "Melabeli pikiran cemas sebagai 'asumsi pikiran' bukan 'fakta nyata' meredakan siklus panik.",
      "Menulis jurnal secara rutin mengurai benang kusut di kepala menjadi kejelasan langkah.",
    ],
  };

  const actionMap: Record<SupportedLang, string[]> = {
    en: [
      "Physiological Sigh: Inhale twice through nose, long slow exhale through mouth (repeat 5 times).",
      "Set a strict Shutdown Ritual at the end of your day to consciously park lingering obligations.",
      "Spend 5 minutes doing an unedited brain-dump into Nuju before attempting to sleep.",
    ],
    de: [
      "Physiologischer Seufzer: 2x kurz durch die Nase einatmen, 1x lang durch den Mund ausatmen (5x wiederholen).",
      "Feierabend-Ritual etablieren: Schließe alle offenen Arbeitsfenster bewusst ab.",
      "5 Minuten unzensiertes Gedankenabladen in dein Tagebuch vor dem Schlafengehen.",
    ],
    fr: [
      "Soupir physiologique : 2 inspirations rapides par le nez, 1 longue expiration par la bouche (5 fois).",
      "Rituel de déconnexion : fermez consciemment vos dossiers en fin de journée pour libérer l'esprit.",
      "5 minutes de vidage de tête par écrit dans Nuju avant de vous endormir.",
    ],
    es: [
      "Suspiro fisiológico: 2 inhalaciones cortas por la nariz y 1 exhalación lenta por la boca (repetir 5 veces).",
      "Ritual de cierre laboral: desconecta conscientemente tus tareas al terminar la jornada.",
      "Dedica 5 minutos a un vaciado mental en tu diario antes de irte a dormir.",
    ],
    id: [
      "Physiological Sigh: Tarik napas 2x pendek lewat hidung, hembuskan 1x panjang lewat mulut (ulangi 5 kali).",
      "Terapkan ritual penutupan kerja agar pikiran sadar kapan waktu istirahat dimulai.",
      "Tuliskan seluruh uneg-uneg kepala selama 5 menit ke dalam jurnal Nuju sebelum tidur.",
    ],
  };

  const shareMap: Record<SupportedLang, string> = {
    en: `I scored ${wellnessIndex}/100 on the Nuju DASS-21 Mental Health Checkup! Check your 3-pillar emotional balance:`,
    de: `Mein Ergebnis beim Nuju DASS-21 Seelencheck: ${wellnessIndex}/100! Überprüfe deine 3 Säulen:`,
    fr: `J'ai obtenu ${wellnessIndex}/100 au bilan DASS-21 sur Nuju ! Évaluez vos 3 piliers émotionnels :`,
    es: `¡Obtuve ${wellnessIndex}/100 en el test DASS-21 de Nuju! Revisa tu equilibrio emocional en 3 pilares:`,
    id: `Hasil tes DASS-21 Nuju saya adalah ${wellnessIndex}/100! Cek kondisi kesehatan mentalmu di:`,
  };

  return {
    depression,
    anxiety,
    stress,
    wellnessIndex,
    primaryConcernPillar,
    highestSeverity,
    title,
    tagline,
    summary,
    cbtInsights: cbtMap[activeLang] || cbtMap.en,
    actionSteps: actionMap[activeLang] || actionMap.en,
    recommendedJournalPrompt,
    mascotMood,
    mascotImage,
    shareSummaryText: shareMap[activeLang] || shareMap.en,
  };
}

export interface CrisisResource {
  country: string;
  name: string;
  contact: string;
  description: string;
  hours: string;
}

export const CRISIS_RESOURCES: Record<SupportedLang, CrisisResource[]> = {
  en: [
    {
      country: "🇺🇸 United States & Canada",
      name: "988 Suicide & Crisis Lifeline",
      contact: "Call or text 988",
      description: "Free, confidential 24/7 support for anyone in suicidal crisis or emotional distress.",
      hours: "24/7 / Free & Confidential",
    },
    {
      country: "🇺🇸 US & UK & Canada",
      name: "Crisis Text Line",
      contact: "Text HOME to 741741 (US/CA) or 85258 (UK)",
      description: "Connect with a trained crisis counselor via SMS for free crisis intervention.",
      hours: "24/7 / Free via SMS",
    },
    {
      country: "🇬🇧 United Kingdom",
      name: "Samaritans UK",
      contact: "Call 116 123",
      description: "Whatever you're going through, a Samaritan will face it with you.",
      hours: "24/7 / Free from any phone",
    },
    {
      country: "🌍 Worldwide / International",
      name: "Befrienders Worldwide & IASP",
      contact: "befrienders.org / iasp.info",
      description: "Global directory of verified emotional support helplines in over 40 countries.",
      hours: "Online Directory",
    },
  ],
  de: [
    {
      country: "🇩🇪 Deutschland",
      name: "TelefonSeelsorge Deutschland",
      contact: "0800 111 0 111 oder 0800 111 0 222 (oder 116 123)",
      description: "Kostenlose, vertrauliche und anonyme Beratung rund um die Uhr bei allen seelischen Krisen.",
      hours: "24/7 / Kostenfrei & Anonym",
    },
    {
      country: "🇩🇪 Deutschland (Kinder & Jugend)",
      name: "Nummer gegen Kummer",
      contact: "116 111 (Kinder/Jugend) / 0800 111 0 550 (Eltern)",
      description: "Kostenfreie und anonyme Beratung bei Sorgen, Ängsten und familiären Belastungen.",
      hours: "Mo–Sa 14:00–20:00 Uhr",
    },
    {
      country: "🇨🇭 Schweiz / 🇦🇹 Österreich",
      name: "Die Dargebotene Hand (CH) / TelefonSeelsorge (AT)",
      contact: "Tel. 143 (Schweiz) / Tel. 142 (Österreich)",
      description: "Rund um die Uhr ein offenes Ohr für alle seelischen Notlagen und akuten Krisen.",
      hours: "24/7 / Kostenfrei",
    },
    {
      country: "🌍 Europa & Weltweit",
      name: "Befrienders Worldwide",
      contact: "befrienders.org",
      description: "Internationales Netzwerk zur suizidpräventiven und seelischen Unterstützung.",
      hours: "Online Verzeichnis",
    },
  ],
  fr: [
    {
      country: "🇫🇷 France (National)",
      name: "Numéro National de Prévention du Suicide",
      contact: "Composez le 3114",
      description: "Ligne nationale d'écoute pour toute personne en détresse ou confrontée à des idées suicidaires.",
      hours: "24h/24, 7j/7 / Gratuit et confidentiel",
    },
    {
      country: "🇫🇷 France (Écoute bénévole)",
      name: "SOS Amitié",
      contact: "09 72 39 40 50",
      description: "Écoute bienveillante, anonyme et attentive pour rompre la solitude et apaiser la détresse.",
      hours: "24h/24, 7j/7",
    },
    {
      country: "🇧🇪 Belgique / 🇨🇭 Suisse",
      name: "Télé-Accueil (BE) / La Main Tendue (CH)",
      contact: "Composez le 107 (Belgique) / Composez le 143 (Suisse)",
      description: "Service d'écoute gratuit, disponible jour et nuit pour parler librement de toute difficulté.",
      hours: "24h/24, 7j/7",
    },
    {
      country: "🌍 International",
      name: "Befrienders Worldwide",
      contact: "befrienders.org",
      description: "Réseau mondial d'aide émotionnelle et de prévention des crises.",
      hours: "Annuaire en ligne",
    },
  ],
  es: [
    {
      country: "🇪🇸 España (Nacional)",
      name: "Línea 024 - Atención a la Conducta Suicida",
      contact: "Llama al 024",
      description: "Línea telefónica oficial del Ministerio de Sanidad para personas con crisis emocionales o ideación suicida.",
      hours: "24 horas, 7 días / Gratuita y confidencial",
    },
    {
      country: "🇪🇸 España (Teléfono de la Esperanza)",
      name: "Teléfono de la Esperanza",
      contact: "717 003 717 o 91 459 00 55",
      description: "Orientación psicológica en situaciones de soledad, ansiedad, depresión y crisis emocional.",
      hours: "24 horas / Gratuita",
    },
    {
      country: "🇲🇽 México / Latinoamérica",
      name: "Línea de la Vida (México)",
      contact: "800 911 2000",
      description: "Atención personalizada a problemas asociados a la salud mental, depresión y crisis en México.",
      hours: "24/7 / Gratuita",
    },
    {
      country: "🌍 Internacional",
      name: "Befrienders Worldwide",
      contact: "befrienders.org",
      description: "Directorio global de líneas de ayuda emocional y prevención del suicidio en español.",
      hours: "Directorio Online",
    },
  ],
  id: [
    {
      country: "🇮🇩 Indonesia (Kemenkes RI)",
      name: "Layanan Sejiwa - Kemenkes RI",
      contact: "Telepon 119 (ext. 8)",
      description: "Layanan resmi Kementerian Kesehatan RI untuk pertolongan pertama kesehatan jiwa dan konseling krisis.",
      hours: "24 Jam / Bebas Pulsa",
    },
    {
      country: "🇮🇩 Indonesia (Yayasan Pulih)",
      name: "Yayasan Pulih",
      contact: "WhatsApp: +62 811-8436-633 / Tel: (021) 788-42580",
      description: "Layanan konseling psikologis pemulihan trauma dan krisis emosional terpercaya.",
      hours: "Senin – Jumat (Jam Kerja)",
    },
    {
      country: "🇮🇩 Indonesia (Komunitas)",
      name: "Into The Light Indonesia",
      contact: "intothelightid.org / Halo Kemenkes 1500-567",
      description: "Pusat edukasi pencegahan bunuh diri dan advokasi kesehatan mental berbasis bukti ilmiah di Indonesia.",
      hours: "Informasi & Rujukan Online",
    },
    {
      country: "🌍 Internasional",
      name: "Befrienders Worldwide",
      contact: "befrienders.org",
      description: "Direktori layanan pendampingan krisis emosional sukarela di seluruh dunia.",
      hours: "Direktori Global",
    },
  ],
};
