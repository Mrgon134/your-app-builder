export type BedtimeProcrastinationLang = "en" | "id" | "de" | "fr" | "es";

export interface BedtimeProcrastinationQuestion {
  id: number;
  subscale: "autonomy_deficit" | "dopamine_chasing" | "morning_regret";
  prompt: Record<BedtimeProcrastinationLang, string>;
  options: {
    label: Record<BedtimeProcrastinationLang, string>;
    score: number; // 0 to 3
  }[];
}

export interface BedtimeProcrastinationArchetype {
  level: "circadian_grounded" | "twilight_nibbler" | "autonomy_reclaimer" | "nocturnal_hostage";
  badge: Record<BedtimeProcrastinationLang, string>;
  title: Record<BedtimeProcrastinationLang, string>;
  tagline: Record<BedtimeProcrastinationLang, string>;
  description: Record<BedtimeProcrastinationLang, string>;
  psychologyInsight: Record<BedtimeProcrastinationLang, string>;
  actionProtocols: Record<BedtimeProcrastinationLang, string[]>;
  dailyAffirmation: Record<BedtimeProcrastinationLang, string>;
}

export interface BedtimeProcrastinationScoreResult {
  totalScore: number;
  percentage: number;
  level: BedtimeProcrastinationArchetype["level"];
  profile: BedtimeProcrastinationArchetype;
  subscales: {
    autonomy_deficit: { score: number; percentage: number };
    dopamine_chasing: { score: number; percentage: number };
    morning_regret: { score: number; percentage: number };
  };
}

export const BEDTIME_PROCRASTINATION_QUESTIONS: BedtimeProcrastinationQuestion[] = [
  // Subscale 1: Daytime Autonomy Deficit (Lack of personal agency during daylight hours)
  {
    id: 1,
    subscale: "autonomy_deficit",
    prompt: {
      en: "I feel like my daytime hours belong entirely to my boss, family, or obligations, leaving late night as my only sliver of freedom.",
      id: "Aku merasa siang hariku sepenuhnya milik atasan, keluarga, atau kewajiban, sehingga larut malam adalah satu-satunya ruang kebebasanku.",
      de: "Ich habe das Gefühl, mein Tag gehört nur meinem Chef, meiner Familie oder Pflichten – die Nacht ist meine einzige Freiheit.",
      fr: "J'ai l'impression que mes journées appartiennent entièrement à mon travail ou ma famille ; la nuit est ma seule liberté.",
      es: "Siento que el día pertenece por completo a mi trabajo o familia, dejando la noche como mi único espacio de libertad.",
    },
    options: [
      {
        score: 0,
        label: {
          en: "Rarely — I integrate genuine autonomy and breaks into my daytime",
          id: "Jarang — Aku menyisipkan waktu mandiri dan istirahat di siang hari",
          de: "Selten — Ich baue tagsüber echte Freiräume und Pausen ein",
          fr: "Rarement — J'intègre des pauses d'autonomie dans ma journée",
          es: "Rara vez — Tengo momentos de verdadera libertad durante el día",
        },
      },
      {
        score: 1,
        label: {
          en: "Occasionally — on particularly hectic or demanding weekdays",
          id: "Kadang — terutama di hari kerja yang sangat sibuk atau menuntut",
          de: "Gelegentlich — an besonders hektischen Arbeitstagen",
          fr: "Parfois — lors des journées particulièrement chargées",
          es: "A veces — en días especialmente agotadores o exigentes",
        },
      },
      {
        score: 2,
        label: {
          en: "Frequently — nighttime feels like the only time nobody can demand anything from me",
          id: "Sering — malam hari terasa sebagai satu-satunya waktu di mana tak ada yang menuntutku",
          de: "Häufig — die Nacht ist die einzige Zeit, in der niemand etwas von mir will",
          fr: "Souvent — la nuit est le seul moment où personne n'exige rien de moi",
          es: "A menudo — la noche es el único momento en que nadie me exige nada",
        },
      },
      {
        score: 3,
        label: {
          en: "Every night — I fiercely guard 11 PM to 2 AM because I feel invisible and in control",
          id: "Setiap malam — Aku membela jam 11 malam hingga 2 pagi karena merasa memegang kendali penuh",
          de: "Jede Nacht — Ich verteidige 23 bis 2 Uhr verbissen, um mein Leben zu spüren",
          fr: "Chaque nuit — Je défends farouchement minuit à 2h pour reprendre le contrôle",
          es: "Cada noche — Defiendo con uñas y dientes la madrugada para sentirme dueño de mi vida",
        },
      },
    ],
  },
  {
    id: 2,
    subscale: "autonomy_deficit",
    prompt: {
      en: "Going to sleep feels like admitting the fun is over and accelerating tomorrow's stressful workday.",
      id: "Tidur terasa seperti menyerah bahwa hiburan sudah selesai dan mempercepat datangnya hari kerja besok.",
      de: "Schlafen fühlt sich an, als würde man kapitulieren und den nächsten stressigen Arbeitstag beschleunigen.",
      fr: "Aller dormir donne l'impression d'accélérer le retour d'une nouvelle journée de stress.",
      es: "Ir a dormir se siente como claudicar y acelerar la llegada de otra jornada laboral estresante.",
    },
    options: [
      {
        score: 0,
        label: {
          en: "Disagree — I view sleep as a restorative gift I look forward to",
          id: "Tidak setuju — Aku memandang tidur sebagai hadiah pemulihan yang kunanti",
          de: "Stimme nicht zu — Schlaf ist für mich eine erholsame Wohltat",
          fr: "Pas d'accord — Je vois le sommeil comme un repos bienvenu",
          es: "En desacuerdo — Veo el sueño como un descanso reparador que deseo",
        },
      },
      {
        score: 1,
        label: {
          en: "Occasionally on Sunday evenings (the 'Sunday Scaries')",
          id: "Kadang saat Minggu malam ('Sunday Scaries')",
          de: "Gelegentlich am Sonntagabend ('Sunday Scaries')",
          fr: "Parfois le dimanche soir avant la reprise",
          es: "A veces los domingos por la noche ('Sunday Scaries')",
        },
      },
      {
        score: 2,
        label: {
          en: "Often — delaying sleep is my quiet protest against tomorrow's alarm",
          id: "Sering — menunda tidur adalah bentuk protes diamku terhadap alarm besok",
          de: "Oft — Schlaf aufzuschieben ist mein stiller Protest gegen den Wecker",
          fr: "Souvent — retarder le sommeil est ma protestation silencieuse contre le réveil",
          es: "A menudo — retrasar el sueño es mi protesta secreta contra el despertador",
        },
      },
      {
        score: 3,
        label: {
          en: "Constant dread — going to bed triggers anticipatory anxiety about obligations",
          id: "Kecemasan konstan — beranjak tidur memicu kepanikan antisipasi beban besok",
          de: "Ständige Abneigung — ins Bett zu gehen löst Vorfreude-Verlust und Angst aus",
          fr: "Angoisse permanente — se coucher déclenche l'anxiété anticipatoire du lendemain",
          es: "Angustia constante — acostarme dispara la ansiedad por las tareas de mañana",
        },
      },
    ],
  },
  {
    id: 3,
    subscale: "autonomy_deficit",
    prompt: {
      en: "I know I have to wake up early tomorrow and will be miserable, yet I still cannot bring myself to close my eyes.",
      id: "Aku tahu harus bangun pagi besok dan bakal menderita, tapi tetap tidak sanggup menutup mata.",
      de: "Ich weiß genau, dass ich früh raus muss und leiden werde, kann aber trotzdem nicht abschalten.",
      fr: "Je sais que je vais le regretter demain matin, mais je suis incapable d'éteindre la lumière.",
      es: "Sé que mañana madrugo y estaré agotado, pero aun así soy incapaz de cerrar los ojos.",
    },
    options: [
      {
        score: 0,
        label: {
          en: "Disagree — my bedtime discipline is solid when early mornings loom",
          id: "Tidak setuju — disiplin jam tidurku kuat saat harus bangun pagi",
          de: "Stimme nicht zu — Bei frühen Terminen gehe ich diszipliniert schlafen",
          fr: "Pas d'accord — Ma discipline de coucher est solide si je dois me lever tôt",
          es: "En desacuerdo — Tengo disciplina para acostarme a tiempo si madrugo",
        },
      },
      {
        score: 1,
        label: {
          en: "Once or twice a month when engrossed in a movie or book",
          id: "Sekali atau dua kali sebulan saat keasyikan nonton film atau baca",
          de: "Ein- oder zweimal im Monat bei packenden Büchern oder Filmen",
          fr: "Une à deux fois par mois quand un livre ou un film me captive",
          es: "Una o dos veces al mes cuando me engancho a una serie o libro",
        },
      },
      {
        score: 2,
        label: {
          en: "Weekly — I know it is self-sabotage, but the impulse wins",
          id: "Tiap minggu — Aku sadar ini sabotase diri, tapi dorongannya menang",
          de: "Wöchentlich — Ich weiß, es schadet mir, aber der Impuls gewinnt",
          fr: "Chaque semaine — Je sais que c'est néfaste, mais l'impulsion l'emporte",
          es: "Cada semana — Sé que me saboteo, pero la inercia me puede",
        },
      },
      {
        score: 3,
        label: {
          en: "Almost every single night — chronic self-negotiation that always fails",
          id: "Hampir setiap malam — negosiasi batin yang selalu berakhir dengan begadang",
          de: "Fast jede Nacht — ständige innere Verhandlungen, die immer scheitern",
          fr: "Presque tous les soirs — un combat intérieur perdu d'avance",
          es: "Casi todas las noches — un tira y afloja interno en el que siempre pierdo",
        },
      },
    ],
  },
  {
    id: 4,
    subscale: "autonomy_deficit",
    prompt: {
      en: "I spend the daytime pleasing others or holding back my authentic feelings, which bursts into a hunger for self-indulgence at midnight.",
      id: "Sepanjang siang aku menyenangkan orang lain atau menahan perasaan asli, yang meledak jadi rasa haus memanjakan diri di tengah malam.",
      de: "Tagsüber passe ich mich an und schlucke Gefühle herunter – nachts explodiert das Verlangen nach Selbstbelohnung.",
      fr: "La journée, je prends sur moi et satisfais les autres ; la nuit, j'ai un besoin viscéral de me faire plaisir.",
      es: "Durante el día complazco a los demás o reprimo lo que siento, lo que detona un hambre de autorregalo a medianoche.",
    },
    options: [
      {
        score: 0,
        label: {
          en: "Disagree — I communicate needs and self-care throughout the day",
          id: "Tidak setuju — Aku menyuarakan kebutuhan dan merawat diri sepanjang siang",
          de: "Stimme nicht zu — Ich äußere Bedürfnisse und sorge tagsüber für mich",
          fr: "Pas d'accord — J'exprime mes limites tout au long de la journée",
          es: "En desacuerdo — Expreso mis necesidades y me cuido a lo largo del día",
        },
      },
      {
        score: 1,
        label: {
          en: "Rarely — only during high-stakes emotional performance periods",
          id: "Jarang — hanya saat masa-masa ujian atau presentasi besar",
          de: "Selten — nur in stressigen Bewährungsphasen",
          fr: "Rarement — seulement pendant les périodes intenses de performance",
          es: "Rara vez — solo en épocas de máxima exigencia social",
        },
      },
      {
        score: 2,
        label: {
          en: "Often — late night is my compensation for daytime emotional suppression",
          id: "Sering — larut malam adalah kompensasi atas penekanan emosiku di siang hari",
          de: "Oft — die Nacht ist meine Entschädigung für emotionale Selbstunterdrückung",
          fr: "Souvent — la nuit est ma récompense pour avoir pris sur moi toute la journée",
          es: "A menudo — la noche es mi recompensa por haber aguantado tanto durante el día",
        },
      },
      {
        score: 3,
        label: {
          en: "Severe link — the more polite and compliant I am by day, the later I stay awake by night",
          id: "Korelasi kuat — makin ramah dan penurut aku di siang hari, makin larut aku begadang di malam hari",
          de: "Massiv — je braver ich tagsüber funktioniere, desto exzessiver wache ich nachts",
          fr: "Lien direct — plus je suis sage le jour, plus je repousse le sommeil la nuit",
          es: "Vínculo directo — cuanto más complaciente soy de día, más tarde me duermo de noche",
        },
      },
    ],
  },

  // Subscale 2: Dopamine Chasing (Compulsive late-night stimulation)
  {
    id: 5,
    subscale: "dopamine_chasing",
    prompt: {
      en: "I lay in bed with heavy eyes, yet keep endlessly scrolling TikTok, Instagram Reels, YouTube Shorts, or Reddit.",
      id: "Mataku sudah sangat berat di tempat tidur, tapi tanganku tetap tanpa henti scroll TikTok, Reels, atau media sosial.",
      de: "Meine Augen brennen vor Müdigkeit im Bett, aber ich scrolle endlos weiter durch TikTok, Reels oder Feeds.",
      fr: "Mes yeux piquent de fatigue dans le lit, mais je continue à faire défiler TikTok, Reels ou Reddit sans fin.",
      es: "Se me cierran los ojos de sueño en la cama, pero sigo haciendo scroll infinito en TikTok, Reels o redes.",
    },
    options: [
      {
        score: 0,
        label: {
          en: "Never — phones are kept away from my bedside sanctuary",
          id: "Tidak pernah — HP kujauhkan dari jangkauan tempat tidur",
          de: "Nie — mein Smartphone bleibt außerhalb des Schlafbereichs",
          fr: "Jamais — le téléphone reste loin de mon lit",
          es: "Nunca — dejo el móvil lejos del espacio de descanso",
        },
      },
      {
        score: 1,
        label: {
          en: "Sometimes — 10 to 15 minutes before setting an alarm",
          id: "Kadang — sekitar 10 sampai 15 menit sebelum menyalakan alarm",
          de: "Manchmal — 10 bis 15 Minuten vor dem Weckerstellen",
          fr: "Parfois — 10 à 15 minutes pour vérifier les alarmes",
          es: "A veces — entre 10 y 15 minutos antes de poner la alarma",
        },
      },
      {
        score: 2,
        label: {
          en: "Frequently — I lose 1 to 2 hours in a hypnotic dopamine trance",
          id: "Sering — Aku kehilangan 1 sampai 2 jam dalam hipnosis dopamin medsos",
          de: "Häufig — Ich verliere 1 bis 2 Stunden in einer Dopamin-Trance",
          fr: "Fréquemment — Je perds 1 à 2 heures dans une transe d'écrans",
          es: "Frecuentemente — pierdo de 1 a 2 horas en un bucle hipnótico de dopamina",
        },
      },
      {
        score: 3,
        label: {
          en: "Every night — the phone literally slips from my hand as I pass out",
          id: "Tiap malam — HP sampai terjatuh dari tangan atau menimpa muka saat tertidur lemas",
          de: "Jede Nacht — das Handy fällt mir buchstäblich aus der Hand beim Einschlafen",
          fr: "Chaque nuit — le téléphone me tombe des mains quand je m'effondre de fatigue",
          es: "Cada noche — el móvil se me cae de las manos al desmayarme de sueño",
        },
      },
    ],
  },
  {
    id: 6,
    subscale: "dopamine_chasing",
    prompt: {
      en: "I tell myself 'just one more episode' or 'just five more minutes' at 11:30 PM, and suddenly it is 1:45 AM.",
      id: "Aku bilang 'satu episode lagi' atau 'lima menit lagi' jam 23.30, dan tahu-tahu waktu sudah menunjukkan jam 01.45 pagi.",
      de: "Ich sage mir um 23:30 Uhr 'nur noch eine Folge' oder '5 Minuten' – und plötzlich ist es 1:45 Uhr.",
      fr: "Je me dis 'encore un épisode' ou '5 minutes' à 23h30, et soudain il est 1h45 du matin.",
      es: "Me digo 'solo un capítulo más' o 'cinco minutos' a las 23:30, y de golpe son las 1:45.",
    },
    options: [
      {
        score: 0,
        label: {
          en: "Rarely — I respect bedtime cutoffs firmly",
          id: "Jarang — Aku disiplin dengan batas waktu tidurku",
          de: "Selten — Ich halte meine festen Bettgehzeiten ein",
          fr: "Rarement — Je respecte fermement mes heures limites",
          es: "Rara vez — Respeto con firmeza mi hora límite de descanso",
        },
      },
      {
        score: 1,
        label: {
          en: "Only on weekends when there is no morning alarm",
          id: "Hanya saat akhir pekan ketika tidak ada alarm pagi",
          de: "Nur am Wochenende, wenn kein Wecker gestellt ist",
          fr: "Seulement le week-end quand il n'y a pas d'impératif",
          es: "Solo los fines de semana cuando no hay que madrugar",
        },
      },
      {
        score: 2,
        label: {
          en: "2 to 3 times a week on regular worknights",
          id: "2 sampai 3 kali seminggu di hari kerja biasa",
          de: "2 bis 3 Mal pro Woche an ganz normalen Werktagen",
          fr: "2 à 3 fois par semaine les soirs de semaine",
          es: "2 o 3 veces por semana en días laborales",
        },
      },
      {
        score: 3,
        label: {
          en: "Chronic pattern — time perception completely dissolves after midnight",
          id: "Pola kronis — persepsi waktu lenyap total begitu lewat tengah malam",
          de: "Chronisches Muster — das Zeitgefühl löst sich nach Mitternacht komplett auf",
          fr: "Problème chronique — la notion du temps s'évapore après minuit",
          es: "Patrón crónico — la noción del tiempo desaparece tras medianoche",
        },
      },
    ],
  },
  {
    id: 7,
    subscale: "dopamine_chasing",
    prompt: {
      en: "I use multiple screens simultaneously in bed (e.g. YouTube playing in background while scrolling social media or shopping).",
      id: "Aku memakai beberapa layar sekaligus di kasur (misal YouTube menyala sementara tangan scrolling medsos atau belanja online).",
      de: "Ich nutze mehrere Bildschirme gleichzeitig im Bett (z.B. Serie läuft nebenher beim Scrollen oder Online-Shopping).",
      fr: "J'utilise plusieurs écrans au lit (une vidéo en fond sonore tout en consultant les réseaux ou en faisant du shopping).",
      es: "Uso varias pantallas a la vez en la cama (una serie de fondo mientras miro redes o tiendas online).",
    },
    options: [
      {
        score: 0,
        label: {
          en: "Never — my bedroom is a low-stimulation sanctuary",
          id: "Tidak pernah — kamarku adalah tempat minim stimulasi",
          de: "Nie — mein Schlafzimmer ist reizarm gestaltet",
          fr: "Jamais — ma chambre est un havre sans écrans",
          es: "Nunca — mi habitación es un templo de baja estimulación",
        },
      },
      {
        score: 1,
        label: {
          en: "Rarely — maybe listening to a podcast while reading an e-book",
          id: "Jarang — mungkin mendengar podcast santai sambil baca buku",
          de: "Selten — vielleicht ein Podcast beim Lesen",
          fr: "Rarement — peut-être un podcast en lisant",
          es: "Rara vez — quizá un podcast suave mientras leo",
        },
      },
      {
        score: 2,
        label: {
          en: "Often — silence feels unbearable, so I stack sensory stimuli",
          id: "Sering — keheningan terasa mencekam, jadi kutumpuk stimulasi sensorik",
          de: "Oft — Stille ist unerträglich, ich überreize mich bewusst",
          fr: "Souvent — le silence m'angoisse, je superpose les stimulations",
          es: "A menudo — el silencio me incomoda, así que acumulo estímulos",
        },
      },
      {
        score: 3,
        label: {
          en: "Constant necessity — I cannot fall asleep without audiovisual white noise drowning my thoughts",
          id: "Kebutuhan mutlak — Aku tak bisa tidur tanpa video/suara layar yang menenggelamkan pikiranku",
          de: "Dauerzustand — ohne ständiges Medienrauschen überrollen mich meine Gedanken",
          fr: "Indispensable — incapable de dormir sans un fond sonore pour étouffer mes pensées",
          es: "Imprescindible — no logro dormir sin ruido de pantalla que ahogue mis pensamientos",
        },
      },
    ],
  },
  {
    id: 8,
    subscale: "dopamine_chasing",
    prompt: {
      en: "I engage in late-night comfort snacking, online browsing, or gaming even when my stomach and body are thoroughly exhausted.",
      id: "Aku ngemil makanan manis, cuci mata belanja online, atau main game larut malam meski tubuh sudah lelah total.",
      de: "Ich snacke nachts Süßes, browse durch Online-Shops oder game, obwohl mein Körper völlig erschöpft ist.",
      fr: "Je grignote tard, fais du lèche-vitrine virtuel ou joue aux jeux vidéo alors que mon corps crie grâce.",
      es: "Pico algo tarde, miro tiendas online o juego a videojuegos aun cuando mi cuerpo no da más de cansancio.",
    },
    options: [
      {
        score: 0,
        label: {
          en: "Disagree — once tired, I transition smoothly into bedtime rituals",
          id: "Tidak setuju — saat lelah, aku langsung beralih ke ritual tidur",
          de: "Stimme nicht zu — Bei Müdigkeit leite ich direkt das Schlafritual ein",
          fr: "Pas d'accord — Dès que la fatigue arrive, je vais me coucher",
          es: "En desacuerdo — Cuando me canso, paso directamente al descanso",
        },
      },
      {
        score: 1,
        label: {
          en: "Occasionally on high-stress Friday evenings",
          id: "Sesekali di Jumat malam setelah minggu yang melelahkan",
          de: "Gelegentlich am Freitagabend nach harter Woche",
          fr: "Occasionnellement le vendredi soir pour décompresser",
          es: "Ocasionalmente los viernes para desconectar de la semana",
        },
      },
      {
        score: 2,
        label: {
          en: "Frequently — I use high-sugar snacks or screen stimulation to override my sleepy cues",
          id: "Sering — Aku sengaja makan manis atau menatap layar untuk melawan rasa kantuk",
          de: "Häufig — Ich bekämpfe die Müdigkeit künstlich mit Zucker oder Reizen",
          fr: "Fréquemment — J'utilise le sucre ou les écrans pour lutter contre la somnolence",
          es: "Frecuentemente — combato el sueño con azúcar o pantallas para seguir despierto",
        },
      },
      {
        score: 3,
        label: {
          en: "Every night — compulsive nocturnal dopamine hunting is my default escape",
          id: "Setiap malam — berburu dopamin tengah malam adalah pelarian utamaku",
          de: "Jede Nacht — die nächtliche Dopaminsuche ist meine wichtigste Flucht",
          fr: "Tous les soirs — la quête nocturne de dopamine est mon échappatoire systématique",
          es: "Cada noche — la búsqueda nocturna de dopamina es mi vía de escape habitual",
        },
      },
    ],
  },

  // Subscale 3: Morning Regret & Circadian Debt (The morning after cost)
  {
    id: 9,
    subscale: "morning_regret",
    prompt: {
      en: "Every morning when the alarm sounds, I feel an acute wave of self-blame: *'Why on earth did I stay up so late again?'*",
      id: "Setiap pagi saat alarm berbunyi, gelombang penyesalan langsung menyergap: *'Kenapa semalam aku begadang lagi?'*",
      de: "Jeden Morgen beim Weckerklingeln überrollt mich die Reue: *'Warum bin ich bloß wieder so spät schlafen gegangen?'*",
      fr: "Chaque matin au son du réveil, une vague d'auto-reproche surgit : *'Pourquoi me suis-je encore couché si tard ?'*",
      es: "Cada mañana al sonar la alarma me invade el arrepentimiento: *'¿Por qué me habré acostado tan tarde otra vez?'*",
    },
    options: [
      {
        score: 0,
        label: {
          en: "Rarely or never — I wake up feeling rested and clear-headed",
          id: "Jarang atau tidak pernah — Aku bangun dalam kondisi segar dan jernih",
          de: "Selten oder nie — Ich wache erholt und mit klarem Kopf auf",
          fr: "Rarement ou jamais — Je me réveille reposé et lucide",
          es: "Rara vez o nunca — Me despierto descansado y despejado",
        },
      },
      {
        score: 1,
        label: {
          en: "Occasionally — once every couple of weeks",
          id: "Kadang — sekali tiap beberapa minggu",
          de: "Gelegentlich — alle paar Wochen einmal",
          fr: "Parfois — une fois de temps en temps",
          es: "A veces — una vez cada varias semanas",
        },
      },
      {
        score: 2,
        label: {
          en: "Most weekdays — morning starts with heavy guilt and brain fog",
          id: "Sebagian besar hari kerja — pagi dimulai dengan rasa bersalah dan kepala berat",
          de: "Meistens unter der Woche — der Tag beginnt mit Schuldgefühlen und Nebel",
          fr: "La plupart des matins — réveil difficile avec culpabilité et brouillard mental",
          es: "Casi todos los días laborables — empiezo con culpa y niebla mental",
        },
      },
      {
        score: 3,
        label: {
          en: "Daily torture — I swear every morning I will sleep at 10 PM, then repeat the sabotage at midnight",
          id: "Siksaan harian — Tiap pagi aku berjanji tidur jam 10 malam, tapi mengulangi kebiasaan begadang lagi",
          de: "Tägliche Qual — Morgens schwöre ich, um 22 Uhr zu schlafen, nachts scheitere ich erneut",
          fr: "Supplice quotidien — Je jure chaque matin de dormir à 22h, et je recommence la nuit venue",
          es: "Tortura diaria — Cada mañana juro acostarme a las 22:00 y a medianoche vuelvo a caer",
        },
      },
    ],
  },
  {
    id: 10,
    subscale: "morning_regret",
    prompt: {
      en: "I rely on high doses of caffeine, energy drinks, or sugar throughout the morning just to achieve baseline alertness.",
      id: "Aku mengandalkan kopi bergelas-gelas, minuman energi, atau gula sepanjang pagi demi bisa berfungsi normal.",
      de: "Ich brauche Unmengen Kaffee, Energy Drinks oder Zucker am Morgen, um überhaupt funktionstüchtig zu sein.",
      fr: "Je dépends de doses massives de café ou de boissons énergisantes pour émerger le matin.",
      es: "Dependo de grandes cantidades de café o bebidas energéticas para empezar a funcionar por la mañana.",
    },
    options: [
      {
        score: 0,
        label: {
          en: "Disagree — natural wakefulness or a single morning cup is plenty",
          id: "Tidak setuju — kesegaran alami atau secangkir teh/kopi pagi sudah cukup",
          de: "Stimme nicht zu — Eine Tasse Kaffee oder natürliches Aufwachen genügt",
          fr: "Pas d'accord — Un simple café ou un réveil naturel me suffit",
          es: "En desacuerdo — Me despierto de forma natural o con un solo café",
        },
      },
      {
        score: 1,
        label: {
          en: "Mild reliance — 1 to 2 cups of coffee",
          id: "Ketergantungan ringan — 1 sampai 2 cangkir kopi",
          de: "Mäßig — 1 bis 2 Tassen Kaffee",
          fr: "Modéré — 1 à 2 tasses de café",
          es: "Moderado — 1 o 2 cafés al día",
        },
      },
      {
        score: 2,
        label: {
          en: "Substantial — 3+ cups plus afternoon energy drinks to avoid collapsing",
          id: "Cukup berat — 3 cangkir lebih ditambah minuman energi agar tidak tumbang",
          de: "Erheblich — 3+ Tassen plus Nachmittags-Koffein gegen den Absturz",
          fr: "Important — 3 cafés ou plus et des stimulants pour tenir le coup",
          es: "Considerable — 3 o más cafés y bebidas con cafeína para no dormirme",
        },
      },
      {
        score: 3,
        label: {
          en: "Severe chemical propulsion — my heart races while my brain remains completely drained",
          id: "Sangat parah — jantung berdegup kencang karena kafein, tapi otak tetap kelelahan ekstrem",
          de: "Massiv — mein Herz rast vor Koffein, aber mein Gehirn ist völlig erschöpft",
          fr: "Critique — mon cœur s'emballe de caféine alors que mon cerveau est à plat",
          es: "Grave — el corazón me va acelerado de cafeína pero el cerebro sigue agotado",
        },
      },
    ],
  },
  {
    id: 11,
    subscale: "morning_regret",
    prompt: {
      en: "My daytime focus, emotional patience, and executive function suffer noticeably because of my late-night habits.",
      id: "Fokus kerja, kesabaran emosi, dan produktivitasku di siang hari menurun drastis gara-gara begadang.",
      de: "Mein Fokus, meine Geduld und meine Leistungsfähigkeit tagsüber leiden spürbar unter dem Schlafmangel.",
      fr: "Ma concentration, ma patience et mon efficacité en journée pâtissent lourdement du manque de sommeil.",
      es: "Mi concentración, mi paciencia y mi rendimiento diurno se resienten claramente por dormir poco.",
    },
    options: [
      {
        score: 0,
        label: {
          en: "Disagree — my daytime cognitive sharpness is consistently strong",
          id: "Tidak setuju — ketajaman berpikir dan fokusku di siang hari selalu prima",
          de: "Stimme nicht zu — Meine geistige Frische ist tagsüber konstant hoch",
          fr: "Pas d'accord — Ma vivacité d'esprit est constante et performante",
          es: "En desacuerdo — Mi claridad mental y energía son estables",
        },
      },
      {
        score: 1,
        label: {
          en: "Mild afternoon dip around 2–3 PM",
          id: "Penurunan ringan sekitar jam 2–3 siang",
          de: "Leichtes Mittagstief gegen 14 Uhr",
          fr: "Léger coup de pompe vers 14h",
          es: "Ligero bajón después de comer",
        },
      },
      {
        score: 2,
        label: {
          en: "Frequently irritable, forgetful, or easily overwhelmed by minor tasks",
          id: "Sering gampang marah, pelupa, atau kewalahan menghadapi hal sepele",
          de: "Häufig gereizt, vergesslich oder schnell von Kleinigkeiten überfordert",
          fr: "Souvent irritable, distrait ou facilement submergé par les tâches simples",
          es: "A menudo irritable, olvidadizo o abrumado por cualquier detalle",
        },
      },
      {
        score: 3,
        label: {
          en: "Severe chronic brain fog — feeling like I operate through a thick, fuzzy plexiglass window all day",
          id: "Brain fog parah — merasa menjalani hari seperti di balik kaca buram tebal",
          de: "Massiver Dauerschleier — Ich funktioniere den ganzen Tag wie durch Watte",
          fr: "Brouillard mental permanent — j'ai l'impression de vivre au ralenti sous cloche",
          es: "Niebla mental severa — paso el día como si viviera detrás de un cristal borroso",
        },
      },
    ],
  },
  {
    id: 12,
    subscale: "morning_regret",
    prompt: {
      en: "I repeatedly promise myself 'tonight will be different', yet by 11:00 PM the resistance takes over again.",
      id: "Aku berulang kali berjanji 'malam ini aku tidur cepat', tapi begitu jam 11 malam, godaan begadang menang lagi.",
      de: "Ich nehme mir fest vor 'heute gehe ich früher schlafen', doch ab 23 Uhr siegt wieder die Verführung.",
      fr: "Je me promets chaque jour 'ce soir je dors tôt', mais à 23h le piège se referme à nouveau.",
      es: "Me prometo una y otra vez 'hoy me acuesto pronto', pero a las 23:00 vuelvo a caer en la trampa.",
    },
    options: [
      {
        score: 0,
        label: {
          en: "Disagree — my bedtime intentions reliably translate into action",
          id: "Tidak setuju — niat tidurku selalu selaras dengan tindakan nyata",
          de: "Stimme nicht zu — Mein Vorsatz wird verlässlich in die Tat umgesetzt",
          fr: "Pas d'accord — Mes intentions de sommeil se traduisent en actes",
          es: "En desacuerdo — Mis propósitos de descanso se cumplen sin problemas",
        },
      },
      {
        score: 1,
        label: {
          en: "Occasional slips during weekends or vacations",
          id: "Sesekali meleset saat akhir pekan atau liburan",
          de: "Gelegentliche Ausrutscher an freien Tagen",
          fr: "Quelques écarts le week-end ou en vacances",
          es: "Deslices puntuales en fines de semana o vacaciones",
        },
      },
      {
        score: 2,
        label: {
          en: "The intention-behavior gap happens 3 to 4 nights every week",
          id: "Jurang antara niat dan tindakan terjadi 3 sampai 4 malam setiap minggu",
          de: "Die Lücke zwischen Absicht und Verhalten passiert 3-4 Mal pro Woche",
          fr: "Le décalage entre bonne intention et réalité survient 3 à 4 soirs par semaine",
          es: "La brecha entre mi intención y mis actos ocurre 3 o 4 noches por semana",
        },
      },
      {
        score: 3,
        label: {
          en: "Total chronic cycle — I feel completely powerless against the late-night dopamine loop",
          id: "Siklus kronis total — Aku merasa tak berdaya melawan pusaran dopamin larut malam",
          de: "Völlige Hilflosigkeit — Ich fühle mich dem nächtlichen Dopaminsog ausgeliefert",
          fr: "Impuissance totale — Je me sens esclave de cette boucle nocturne de dopamine",
          es: "Impotencia absoluta — me siento atrapado en el bucle nocturno de dopamina",
        },
      },
    ],
  },
];

export const BEDTIME_PROCRASTINATION_ARCHETYPES: Record<
  BedtimeProcrastinationArchetype["level"],
  BedtimeProcrastinationArchetype
> = {
  circadian_grounded: {
    level: "circadian_grounded",
    badge: {
      en: "Circadian Grounded",
      id: "Sirkadian Selaras",
      de: "Zirkadian Ausgeglichen",
      fr: "Rythme Préservé",
      es: "Ritmo Circadiano Equilibrado",
    },
    title: {
      en: "The Circadian Grounded Sleeper",
      id: "Tidur Selaras Ritme Sirkadian",
      de: "Der zirkadian ausgeglichene Schläfer",
      fr: "Le Dormeur Harmonieux",
      es: "El Durmiente Equilibrado",
    },
    tagline: {
      en: "Healthy daytime boundaries allow seamless evening wind-down without resentment.",
      id: "Batasan siang hari yang sehat memungkinkan istirahat malam tanpa rasa dendam.",
      de: "Gesunde Grenzen am Tag ermöglichen entspanntes Einschlafen ohne Frust.",
      fr: "Des journées équilibrées permettent un endormissement serein sans ressentiment.",
      es: "Límites claros durante el día facilitan un descanso nocturno sin frustración.",
    },
    description: {
      en: "You treat sleep as an ally rather than an interruption. Because you carve out micro-moments of joy, autonomy, and boundary-setting during daylight hours, your subconscious does not feel the desperate urge to steal revenge hours from the midnight clock.",
      id: "Kamu memperlakukan tidur sebagai sahabat, bukan gangguan. Karena kamu menyisipkan waktu untuk diri sendiri dan menjaga batasan di siang hari, alam bawah sadarmu tidak merasa perlu 'membalas dendam' mencuri jam tidur di larut malam.",
      de: "Du betrachtest Schlaf als Verbündeten, nicht als Pflicht. Weil du dir tagsüber kleine Inseln der Freude und Selbstbestimmung nimmst, muss dein Unterbewusstsein nachts keine verlorene Zeit zurückerobern.",
      fr: "Vous voyez le sommeil comme un allié précieux. En vous accordant des pauses d'autonomie dans la journée, votre esprit n'éprouve aucun besoin de voler des heures à la nuit.",
      es: "Ves el sueño como un aliado indispensable. Al reservar espacios propios durante el día, tu mente no siente la necesidad de robarle horas a la madrugada para compensar.",
    },
    psychologyInsight: {
      en: "Dr. Floor Kroese's Bedtime Procrastination Scale demonstrates that people who experience daytime psychological self-determination sleep 65 minutes earlier on average than those experiencing chronic autonomy deficits.",
      id: "Skala Prokrastinasi Tidur Dr. Floor Kroese menunjukkan bahwa orang yang memiliki otonomi diri di siang hari tidur rata-rata 65 menit lebih cepat dibanding mereka yang mengalami defisit otonomi.",
      de: "Studien der Universität Utrecht belegen: Wer tagsüber psychologische Selbstbestimmung erlebt, schläft im Schnitt über eine Stunde früher ein als Menschen unter Dauerfremdbestimmung.",
      fr: "Les recherches sur la procrastination du sommeil prouvent que les personnes maîtresses de leur temps en journée s'endorment 65 minutes plus tôt en moyenne.",
      es: "Los estudios psicológicos demuestran que quienes gozan de autonomía durante el día se duermen de media 65 minutos antes que quienes sufren exceso de exigencias externas.",
    },
    actionProtocols: {
      en: [
        "Maintain your 30-minute pre-bed digital sunset with dim, amber lighting.",
        "Keep jotting down next-day priorities before leaving your desk to prevent bedtime rumination.",
        "Celebrate your sleep routine as an essential pillar of mental vitality and emotional resilience.",
      ],
      id: [
        "Pertahankan 'digital sunset' 30 menit sebelum tidur dengan pencahayaan temaram hangat.",
        "Tulis daftar prioritas esok hari sebelum beranjak dari meja kerja agar otak tidak memikirkannya di kasur.",
        "Syukuri rutinitas tidurmu sebagai fondasi utama ketangguhan mental dan kejernihan emosional.",
      ],
      de: [
        "Behalte deinen 30-minütigen 'digitalen Sonnenuntergang' mit warmem Licht bei.",
        "Notiere To-Dos für den nächsten Tag vor Verlassen des Schreibtischs, um Nachtgrübeln zu stoppen.",
        "Feiere deinen Schlafrhythmus als Fundament deiner seelischen Widerstandskraft.",
      ],
      fr: [
        "Conservez votre sas de déconnexion numérique 30 minutes avant le coucher avec une lumière tamisée.",
        "Notez vos priorités du lendemain avant de quitter votre poste pour libérer votre esprit.",
        "Considérez votre sommeil comme le pilier absolu de votre vitalité mentale.",
      ],
      es: [
        "Mantén tu desconexión digital 30 minutos antes de dormir con luz tenue y cálida.",
        "Apunta las tareas clave de mañana antes de cenar para vaciar la mente en la cama.",
        "Valora tu descanso como la base insustituible de tu bienestar emocional.",
      ],
    },
    dailyAffirmation: {
      en: "Rest is my fundamental right, not an earned luxury; I surrender tomorrow's worries to the night.",
      id: "Istirahat adalah hak dasarku, bukan kemewahan bersyarat; kuserahkan beban esok hari pada tenangnya malam.",
      de: "Ruhe ist mein Grundrecht, kein verdienter Luxus; ich überlasse die Sorgen von morgen der Nacht.",
      fr: "Le repos est un droit vital, pas une récompense ; je confie les soucis de demain au calme de la nuit.",
      es: "Descansar es mi derecho fundamental; entrego las preocupaciones de mañana a la paz de la noche.",
    },
  },

  twilight_nibbler: {
    level: "twilight_nibbler",
    badge: {
      en: "Twilight Nibbler",
      id: "Penunda Ringan",
      de: "Dämmerungs-Zauderer",
      fr: "Flâneur du Crépuscule",
      es: "Demorador Nocturno",
    },
    title: {
      en: "The Twilight Dopamine Nibbler",
      id: "Pencari Hiburan Senja",
      de: "Der Dämmerungs-Zauderer",
      fr: "Le Flâneur du Soir",
      es: "El Demorador Ocasional",
    },
    tagline: {
      en: "Occasional bedtime drift caused by frictionless streaming and easy phone hooks.",
      id: "Keterlambatan tidur sesekali akibat algoritma tontonan yang memikat dan godaan HP.",
      de: "Gelegentliches Herauszögern der Bettruhe durch endlose Feeds und packende Serien.",
      fr: "Glissement occasionnel de l'heure du coucher favorisé par les écrans et le streaming.",
      es: "Desfase nocturno esporádico facilitado por la inercia de las pantallas y las redes.",
    },
    description: {
      en: "You do not possess severe underlying resentment toward your day, but you are vulnerable to modern digital frictionlessness. 'Just one video' turns into a 45-minute rabbit hole, shaving off precious REM and slow-wave sleep cycles 2 to 3 times a week.",
      id: "Kamu tidak punya dendam berat pada harimu, tapi mudah terbuai oleh licinnya algoritma media sosial. 'Nonton satu video saja' berubah jadi 45 menit maraton konten, memotong jatah tidur nyenyakmu 2 sampai 3 kali seminggu.",
      de: "Du bist nicht tief frustriert vom Alltag, aber anfällig für die Verlockungen digitaler Endlosschleifen. 'Nur noch ein Clip' kostet dich wöchentlich mehrere Stunden erholsamen Tiefschlaf.",
      fr: "Vous n'avez pas de rancœur majeure contre votre travail, mais vous vous laissez happer par la fluidité des plateformes. Quelques vidéos courtes suffisent à rogner votre sommeil réparateur.",
      es: "No sientes frustración profunda hacia tu rutina, pero caes en la trampa del entretenimiento infinito. Un video lleva a otro y te roba valiosos ciclos de sueño profundo.",
    },
    psychologyInsight: {
      en: "The Stanford behavioral design model shows that late at night, prefrontal inhibitory control drops by up to 60%, making it nearly impossible to resist autoplays without physical friction.",
      id: "Model perilaku Stanford menunjukkan bahwa di larut malam, kontrol kendali diri di prefrontal cortex merosot hingga 60%, sehingga hampir mustahil melawan autoplay tanpa batas fisik.",
      de: "Hirnforscher wissen: Spät am Abend sinkt die hemmende Kontrolle des Frontallappens um bis zu 60 %, weshalb Willenskraft allein gegen Autoplay-Algorithmen chancenlos ist.",
      fr: "Le contrôle inhibiteur du cortex préfrontal diminue jusqu'à 60 % en fin de soirée, rendant la volonté impuissante face aux algorithmes sans barrières physiques.",
      es: "El autocontrol del lóbulo prefrontal disminuye drásticamente a última hora, haciendo que la pura fuerza de voluntad sea insuficiente frente al autoplay.",
    },
    actionProtocols: {
      en: [
        "Establish an analog bedtime charging station across the room so your phone is out of arm's reach.",
        "Set an automatic grayscale color filter on your phone starting at 10:00 PM to kill dopamine appeal.",
        "Replace the last scroll with 10 minutes of audio soundscapes or a voice journal brain dump in Nuju.",
      ],
      id: [
        "Letakkan colokan charger HP jauh dari kasur agar tidak bisa dijangkau sambil rebahan.",
        "Atur layar HP otomatis menjadi hitam-putih (grayscale) mulai jam 10 malam untuk mematikan daya tarik visual.",
        "Ganti kebiasaan scrolling dengan mendengarkan 10 menit soundscape atau menuangkan uneg-uneg suara di Nuju.",
      ],
      de: [
        "Lade dein Smartphone auf der gegenüberliegenden Zimmerseite, außerhalb der Reichweite des Bettes.",
        "Schalte ab 22 Uhr den Graustufen-Modus am Handy ein, um optische Dopaminreize zu neutralisieren.",
        "Ersetze den Social-Media-Feed durch 10 Minuten beruhigende Audio-Klangwelten in Nuju.",
      ],
      fr: [
        "Placez votre chargeur à l'autre bout de la pièce pour rendre le téléphone inaccessible depuis le lit.",
        "Activez le mode noir et blanc (nuances de gris) à partir de 22h pour désamorcer l'attrait visuel.",
        "Remplacez le dernier coup d'œil aux écrans par 10 minutes de paysages sonores relaxants.",
      ],
      es: [
        "Pon a cargar el móvil lejos de la cama para no alcanzarlo con la mano desde las sábanas.",
        "Configura la pantalla en blanco y negro a partir de las 22:00 para reducir el estímulo visual.",
        "Cambia el último repaso a las redes por 10 minutos de paisajes sonoros binaurales en Nuju.",
      ],
    },
    dailyAffirmation: {
      en: "No notification or video is more valuable than waking up with radiant clarity.",
      id: "Tidak ada notifikasi atau video medsos yang lebih berharga daripada bangun dengan pikiran jernih dan segar.",
      de: "Kein Video und kein Feed ist wertvoller als ein Morgen mit wacher Klarheit.",
      fr: "Aucune vidéo ni notification ne vaut plus qu'un réveil lucide et plein d'énergie.",
      es: "Ningún video ni notificación vale más que despertar con energía y lucidez mental.",
    },
  },

  autonomy_reclaimer: {
    level: "autonomy_reclaimer",
    badge: {
      en: "Autonomy Reclaimer",
      id: "Pemberontak Waktu",
      de: "Autonomie-Kämpfer",
      fr: "Revendicateur d'Autonomie",
      es: "Rebelde del Tiempo",
    },
    title: {
      en: "The Chronic Autonomy Reclaimer",
      id: "Pemberontak Waktu Larut Malam",
      de: "Der chronische Autonomie-Rebell",
      fr: "Le Revendicateur Nocturne",
      es: "El Rebelde del Descanso",
    },
    tagline: {
      en: "Late night is your emotional sanctuary—stealing sleep to reclaim the freedom daytime stole from you.",
      id: "Malam adalah suaka emosionalmu—mencuri jam tidur demi merebut kembali kebebasan yang dirampas siang hari.",
      de: "Die Nacht ist dein seelischer Zufluchtsort – du opferst Schlaf, um dir geraubte Freiheit zurückzuholen.",
      fr: "La nuit est votre refuge — vous sacrifiez votre sommeil pour reprendre la liberté volée le jour.",
      es: "La noche es tu trinchera emocional: robas horas al sueño para recuperar la libertad que te quita el día.",
    },
    description: {
      en: "Your daytime is saturated with demands: clients, bosses, family, and endless 'have-tos'. By 11 PM, when the world goes silent, you finally feel like yourself. Going to bed feels like surrendering your only personal territory, so you hold sleep hostage as an act of existential defiance.",
      id: "Siang harimu dipenuhi tuntutan: atasan, klien, keluarga, dan daftar kewajiban tak berujung. Jam 11 malam saat dunia terlelap, barulah kamu merasa menjadi dirimu seutuhnya. Beranjak tidur terasa seperti menyerahkan satu-satunya tanah merdekamu, sehingga kamu menyandera tidur sebagai bentuk perlawanan batin.",
      de: "Dein Tag ist voller Fremdbestimmung: Termine, Erwartungen, Chefs, familiäre Pflichten. Erst um 23 Uhr, wenn alle schlafen, bist du ganz bei dir. Schlafengehen fühlt sich wie Kapitulation an – deshalb verteidigst du die Nacht wie dein eigenes Territorium.",
      fr: "Vos journées sont saturées d'obligations extérieures. À 23h, quand le monde se tait, vous retrouvez enfin votre identité. Aller dormir ressemble à une défaite, alors vous prolongez la nuit par défi.",
      es: "Tus jornadas están repletas de demandas ajenas. A las 23:00, en el silencio, sientes que recuperas tu identidad. Ir a la cama te sabe a rendición, por lo que retienes la madrugada como un acto de rebeldía.",
    },
    psychologyInsight: {
      en: "Psychologists define Revenge Bedtime Procrastination (first coined in Chinese as *bàofùxìng áoyè*) as a coping mechanism where lack of perceived daytime control directly causes delayed sleep as a psychological rebellion.",
      id: "Psikolog mendefinisikan Revenge Bedtime Procrastination (awalnya dikenal di Tiongkok sebagai *bàofùxìng áoyè*) sebagai mekanisme pertahanan di mana ketiadaan kendali di siang hari memicu penundaan tidur sebagai bentuk pemberontakan psikologis.",
      de: "Das Phänomen (ursprünglich aus dem Chinesischen als *bàofùxìng áoyè* bekannt) beschreibt eine psychologische Trotzreaktion: Mangelnde Tageskontrolle zwingt das Gehirn, sich nachts gewaltsam Autonomie zu verschaffen.",
      fr: "Le concept (né en Chine sous le nom de *bàofùxìng áoyè*) traduit une révolte psychologique : l'absence de maîtrise diurne pousse à voler des heures de liberté sur son propre sommeil.",
      es: "Descrito originalmente en China como *bàofùxìng áoyè*, es una respuesta compensatoria: la falta de control durante el día empuja a rebelarse robándole horas al descanso.",
    },
    actionProtocols: {
      en: [
        "Schedule two non-negotiable 15-minute 'Guilt-Free Autonomy Windows' during the workday.",
        "Reframe bedtime: *'Going to sleep is not surrendering to work tomorrow; it is fueling my power for myself.'*",
        "Release daytime emotional suppression before bed using Nuju's private voice journal.",
      ],
      id: [
        "Jadwalkan dua jeda 15 menit tanpa rasa bersalah di tengah hari kerja khusus untuk hal yang kamu sukai.",
        "Ubah cara pandang: *'Tidur bukan berarti menyerah pada pekerjaan besok; tidur adalah caraku mengisi bahan bakar kekuatanku sendiri.'*",
        "Keluarkan kekesalan yang terpendam seharian sebelum tidur lewat rekaman curhat suara privat di Nuju.",
      ],
      de: [
        "Plane tagsüber zwei feste 15-Minuten-Inseln für Dinge ein, die dir wirklich Freude machen.",
        "Reframing: *'Schlafen ist keine Kapitulation vor dem Job, sondern mein persönlicher Kraftquell.'*",
        "Lade aufgestauten Tagesfrust vor dem Zubettgehen durch eine kurze Sprachnotiz in Nuju ab.",
      ],
      fr: [
        "Programmez deux pauses de 15 minutes d'autonomie absolue au cœur de votre journée de travail.",
        "Changez de perspective : *'Dormir n'est pas céder à demain, c'est me ressourcer pour moi-même.'*",
        "Déposez les tensions accumulées avant la nuit dans une note vocale privée sur Nuju.",
      ],
      es: [
        "Reserva dos descansos de 15 minutos en tu jornada laboral dedicados exclusivamente a ti.",
        "Cambia el enfoque: *'Dormir no es resignarme al trabajo de mañana, es recargar mi propia energía.'*",
        "Vuelca la tensión acumulada antes de acostarte en una breve nota de voz en Nuju.",
      ],
    },
    dailyAffirmation: {
      en: "I do not need to steal from my body's health to prove that my life belongs to me.",
      id: "Aku tidak perlu merampas kesehatan tubuhku hanya demi membuktikan bahwa hidup ini milikku.",
      de: "Ich muss meine Gesundheit nicht bestehlen, um zu beweisen, dass mein Leben mir gehört.",
      fr: "Je n'ai pas besoin d'abîmer ma santé pour prouver que ma vie m'appartient.",
      es: "No necesito robarle salud a mi cuerpo para demostrar que mi vida me pertenece.",
    },
  },

  nocturnal_hostage: {
    level: "nocturnal_hostage",
    badge: {
      en: "Nocturnal Hostage",
      id: "Sandera Malam",
      de: "Gefangener der Nacht",
      fr: "Otage Nocturne",
      es: "Rehén de la Noche",
    },
    title: {
      en: "The Acute Nocturnal Hostage",
      id: "Sandera Kronis Begadang",
      de: "Der Gefangene der Nacht",
      fr: "L'Otage de la Nuit",
      es: "El Rehén Nocturno Crónico",
    },
    tagline: {
      en: "Severe circadian disruption where midnight dopamine addiction and sleep dread paralyze daily life.",
      id: "Disrupsi sirkadian parah di mana kecanduan dopamin larut malam dan ketakutan akan hari esok melumpuhkan hidup.",
      de: "Schwere Störung des Schlafrhythmus durch Dopaminsucht und Angst vor dem nächsten Tag.",
      fr: "Dérèglement circadien majeur où la quête de dopamine et l'angoisse du lendemain paralysent le repos.",
      es: "Desajuste circadiano grave donde la adicción al estímulo nocturno y el temor al día siguiente paralizan el descanso.",
    },
    description: {
      en: "You are locked in a vicious biological cycle. Night after night, you stay awake until 2:30 or 4:00 AM, battling sleepiness with blue light, sugar, or multi-screen stimulation. Every morning is an agonizing emergency of exhaustion, brain fog, and self-disgust, setting up another day of depletion.",
      id: "Kamu terperangkap dalam lingkaran setan biologis. Malam demi malam kamu terjaga hingga jam 2.30 atau 4.00 subuh, melawan kantuk dengan layar HP, camilan manis, atau video bersahut-sahutan. Pagimu berubah jadi darurat kelelahan, rasa bersalah, dan kepala berkabut yang mengulang siklus kehancuran.",
      de: "Du bist in einer zermürbenden Spirale gefangen. Nacht für Nacht wachst du bis 3 oder 4 Uhr morgens, betäubst dich mit Bildschirmen und zuckerhaltigen Snacks. Jeder Morgen ist eine Qual aus Schlafmangel, Gehirnnebel und Selbstvorwürfen.",
      fr: "Vous êtes pris au piège d'un cercle vicieux. Nuit après nuit, vous repoussez le coucher jusqu'à 3h ou 4h du matin à coups d'écrans. Le réveil est un calvaire d'épuisement et de culpabilité qui plombe toute la journée.",
      es: "Estás atrapado en un bucle desgastante. Noche tras noche te quedas despierto hasta las 3 o 4 de la madrugada anestesiándote con pantallas. Las mañanas son una pesadilla de agotamiento y niebla mental.",
    },
    psychologyInsight: {
      en: "This extreme pattern combines HPA-axis exhaustion, prefrontal dopamine depletion, and severe anticipatory dread. The brain seeks rapid micro-dopamine hits to self-medicate unaddressed loneliness, burnout, or unexpressed panic.",
      id: "Pola ekstrem ini menggabungkan kelelahan HPA-axis, pengurasan dopamin prefrontal, dan kecemasan antisipasi akut. Otak mencari suntikan dopamin cepat untuk mengobati kesepian, burnout, atau kepanikan batin yang tak tersuarakan.",
      de: "Dieser Zustand ist das Resultat aus überlasteter HPA-Achse, Dopaminerschöpfung und tiefer Lebensunzufriedenheit. Das Gehirn sucht verzweifelt nach schnellen Glückskicks, um Einsamkeit oder Überlastung zu betäuben.",
      fr: "Ce profil traduit un épuisement surrénalien et une saturation émotionnelle. Le cerveau surstimule la dopamine nocturne pour compenser un burnout ou une angoisse existentielle sous-jacente.",
      es: "Este patrón evidencia agotamiento del eje HPA y saturación nerviosa. El cerebro recurre a picos rápidos de dopamina nocturna para adormecer la soledad, el burnout o la ansiedad acumulada.",
    },
    actionProtocols: {
      en: [
        "Enact a strict 'No Devices in the Bedroom' policy starting tonight—charge your phone in the kitchen.",
        "Implement a 15-minute gentle reset: turn off big lights, play delta waves on a speaker, and do 10 physiological sighs.",
        "Use Nuju's voice venting tool to release the raw, unspoken fury and sadness of your day before setting foot in bed.",
      ],
      id: [
        "Terapkan aturan tegas 'Nol Gadget di Kamar Tidur' mulai malam ini—cas HP di ruang tamu atau dapur.",
        "Lakukan reset 15 menit: matikan lampu utama, nyalakan speaker dengan suara delta wave, dan lakukan 10 kali tarikan napas ganda.",
        "Gunakan fitur curhat suara di Nuju untuk menumpahkan rasa marah dan lelah seharian sebelum naik ke kasur.",
      ],
      de: [
        "Setze ab heute ein striktes Geräteverbot im Schlafzimmer durch – das Handy lädt in der Küche.",
        "Führe ein 15-Minuten-Reset durch: Raum abdunkeln, sanfte Delta-Wellen auf Lautsprecher und 10 tiefe Seufzer.",
        "Sprich deine unzensierte Wut und Überforderung vor dem Schlafen in das verschlüsselte Nuju-Tagebuch.",
      ],
      fr: [
        "Appliquez la règle stricte zéro écran dans la chambre dès ce soir : le téléphone charge ailleurs.",
        "Adoptez un sas de 15 minutes : lumière tamisée, ondes delta sur enceinte et 10 soupirs physiologiques.",
        "Extériorisez vos colères et frustrations dans le journal vocal chiffré de Nuju avant d'aller au lit.",
      ],
      es: [
        "Aplica una política estricta de cero pantallas en el dormitorio desde hoy: carga el móvil en otra habitación.",
        "Dedica 15 minutos al apagado biológico: luz cálida indirecta, frecuencias delta y 10 suspiros fisiológicos.",
        "Desahoga tu rabia o cansancio en el diario de voz encriptado de Nuju antes de meterte en la cama.",
      ],
    },
    dailyAffirmation: {
      en: "I release the compulsive fight against the night; my body deserves deep, restorative peace.",
      id: "Kuakhiri perlawanan sia-sia melawan malam; tubuhku berhak mendapatkan kedamaian dan tidur yang menyembuhkan.",
      de: "Ich beende den Kampf gegen die Nacht; mein Körper verdient tiefen, heilenden Frieden.",
      fr: "Je renonce à lutter contre la nuit ; mon corps a droit à un sommeil profond et réparateur.",
      es: "Abandono la batalla contra la noche; mi cuerpo merece una paz profunda y reparadora.",
    },
  },
};

export function calculateBedtimeProcrastinationScore(
  answers: Record<number, number>
): BedtimeProcrastinationScoreResult {
  let totalScore = 0;
  let autonomyScore = 0;
  let dopamineScore = 0;
  let regretScore = 0;

  BEDTIME_PROCRASTINATION_QUESTIONS.forEach((q) => {
    const score = answers[q.id] ?? 0;
    totalScore += score;

    if (q.subscale === "autonomy_deficit") autonomyScore += score;
    if (q.subscale === "dopamine_chasing") dopamineScore += score;
    if (q.subscale === "morning_regret") regretScore += score;
  });

  const maxTotal = BEDTIME_PROCRASTINATION_QUESTIONS.length * 3; // 36
  const maxSubscale = 4 * 3; // 12
  const percentage = Math.round((totalScore / maxTotal) * 100);

  let level: BedtimeProcrastinationArchetype["level"];
  if (percentage <= 24) {
    level = "circadian_grounded";
  } else if (percentage <= 49) {
    level = "twilight_nibbler";
  } else if (percentage <= 74) {
    level = "autonomy_reclaimer";
  } else {
    level = "nocturnal_hostage";
  }

  return {
    totalScore,
    percentage,
    level,
    profile: BEDTIME_PROCRASTINATION_ARCHETYPES[level],
    subscales: {
      autonomy_deficit: {
        score: autonomyScore,
        percentage: Math.round((autonomyScore / maxSubscale) * 100),
      },
      dopamine_chasing: {
        score: dopamineScore,
        percentage: Math.round((dopamineScore / maxSubscale) * 100),
      },
      morning_regret: {
        score: regretScore,
        percentage: Math.round((regretScore / maxSubscale) * 100),
      },
    },
  };
}
