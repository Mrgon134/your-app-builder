export type EmotionalAvailabilityLang = "en" | "id" | "de" | "fr" | "es";

export interface EmotionalAvailabilityQuestion {
  id: number;
  subscale: "vulnerability_tolerance" | "defensive_stonewalling" | "autonomy_anxiety";
  prompt: Record<EmotionalAvailabilityLang, string>;
  options: {
    label: Record<EmotionalAvailabilityLang, string>;
    score: number; // 0 to 3
  }[];
}

export interface EmotionalAvailabilityArchetype {
  level: "securely_open" | "guarded_pragmatist" | "counter_dependent" | "anxious_compensator";
  badge: Record<EmotionalAvailabilityLang, string>;
  title: Record<EmotionalAvailabilityLang, string>;
  tagline: Record<EmotionalAvailabilityLang, string>;
  description: Record<EmotionalAvailabilityLang, string>;
  psychologyInsight: Record<EmotionalAvailabilityLang, string>;
  actionProtocols: Record<EmotionalAvailabilityLang, string[]>;
  dailyAffirmation: Record<EmotionalAvailabilityLang, string>;
}

export interface EmotionalAvailabilityScoreResult {
  totalScore: number;
  percentage: number;
  level: EmotionalAvailabilityArchetype["level"];
  profile: EmotionalAvailabilityArchetype;
  subscales: {
    vulnerability_tolerance: { score: number; percentage: number };
    defensive_stonewalling: { score: number; percentage: number };
    autonomy_anxiety: { score: number; percentage: number };
  };
}

export const EMOTIONAL_AVAILABILITY_QUESTIONS: EmotionalAvailabilityQuestion[] = [
  // Subscale 1: Vulnerability Tolerance (Fear of emotional exposure)
  {
    id: 1,
    subscale: "vulnerability_tolerance",
    prompt: {
      en: "When I start feeling intense affection or attachment toward someone, my first instinct is to pull back or find flaws in them.",
      id: "Saat mulai merasakan kasih sayang mendalam pada seseorang, insting pertamaku adalah menarik diri atau mencari-cari kekurangannya.",
      de: "Wenn ich tiefe Zuneigung zu jemandem entwickle, ist mein erster Instinkt, mich zurückzuziehen oder nach Fehlern zu suchen.",
      fr: "Lorsque je commence à ressentir un attachement profond envers quelqu'un, mon premier réflexe est de reculer ou de lui trouver des défauts.",
      es: "Cuando empiezo a sentir un apego profundo hacia alguien, mi primer instinto es distanciarme o buscarle defectos.",
    },
    options: [
      {
        score: 0,
        label: {
          en: "Rarely or never — I welcome emotional depth comfortably",
          id: "Jarang atau tidak pernah — Aku nyaman dengan kedalaman emosi",
          de: "Selten oder nie — Ich begrüße emotionale Tiefe",
          fr: "Rarement ou jamais — J'accueille la profondeur émotionnelle",
          es: "Rara vez o nunca — Disfruto la profundidad emocional",
        },
      },
      {
        score: 1,
        label: {
          en: "Occasionally — only if the relationship moves too fast",
          id: "Kadang-kadang — hanya jika hubungan terasa terlalu cepat",
          de: "Gelegentlich — nur wenn es zu schnell geht",
          fr: "Parfois — seulement si les choses vont trop vite",
          es: "A veces — solo si la relación avanza muy rápido",
        },
      },
      {
        score: 2,
        label: {
          en: "Often — intimacy feels like an impending loss of control",
          id: "Sering — keintiman terasa seperti ancaman kehilangan kontrol",
          de: "Oft — Intimität fühlt sich wie Kontrollverlust an",
          fr: "Souvent — l'intimité ressemble à une perte de contrôle",
          es: "A menudo — la intimidad se siente como pérdida de control",
        },
      },
      {
        score: 3,
        label: {
          en: "Almost always — I sabotage or flee when intimacy gets real",
          id: "Hampir selalu — Aku sabotase atau kabur saat hubungan mulai serius",
          de: "Fast immer — Ich sabotiere oder fliehe vor echter Nähe",
          fr: "Presque toujours — Je sabote ou fuis quand c'est sérieux",
          es: "Casi siempre — Saboteo o huyo cuando la intimidad es real",
        },
      },
    ],
  },
  {
    id: 2,
    subscale: "vulnerability_tolerance",
    prompt: {
      en: "Sharing my secret fears, sadness, or deep needs makes me feel weak and physically uncomfortable.",
      id: "Menceritakan ketakutan terdalam, kesedihan, atau kebutuhanku membuatku merasa lemah dan tidak nyaman secara fisik.",
      de: "Meine tiefsten Ängste oder Traurigkeit zu teilen, fühlt sich schwach und körperlich unangenehm an.",
      fr: "Partager mes peurs secrètes ou mes tristesses me fait me sentir faible et physiquement mal à l'aise.",
      es: "Compartir mis miedos más profundos o mi tristeza me hace sentir débil e incómodo físicamente.",
    },
    options: [
      {
        score: 0,
        label: {
          en: "Disagree — vulnerability is part of human bonding",
          id: "Tidak setuju — kerentanan adalah bagian alami ikatan emosional",
          de: "Stimme nicht zu — Verletzlichkeit gehört zu echter Verbindung",
          fr: "Pas d'accord — la vulnérabilité fait partie du lien humain",
          es: "En desacuerdo — la vulnerabilidad crea conexión real",
        },
      },
      {
        score: 1,
        label: {
          en: "Slightly agree — I need immense trust before sharing",
          id: "Agak setuju — Aku butuh kepercayaan sangat tinggi sebelum terbuka",
          de: "Stimme eher zu — Ich brauche extremes Vertrauen",
          fr: "Plutôt d'accord — Il me faut une immense confiance",
          es: "Algo de acuerdo — Necesito muchísima confianza para abrirme",
        },
      },
      {
        score: 2,
        label: {
          en: "Moderately agree — I usually divert conversation with humor",
          id: "Cukup setuju — Aku sering mengalihkan topik dengan lelucon",
          de: "Ziemlich — Ich lenke ernste Themen meist mit Humor ab",
          fr: "Assez d'accord — Je détourne souvent le sujet avec l'humour",
          es: "Bastante — Suelo desviar las conversaciones íntimas con humor",
        },
      },
      {
        score: 3,
        label: {
          en: "Strongly agree — I keep an absolute emotional steel wall",
          id: "Sangat setuju — Aku membangun dinding baja emosional yang rapat",
          de: "Stimme voll zu — Ich halte eine eiserne emotionale Mauer aufrecht",
          fr: "Tout à fait d'accord — J'ai un mur émotionnel infranchissable",
          es: "Totalmente de acuerdo — Mantengo un muro emocional blindado",
        },
      },
    ],
  },
  {
    id: 3,
    subscale: "vulnerability_tolerance",
    prompt: {
      en: "I pride myself on 'not needing anyone' and avoid asking for emotional support even during painful crises.",
      id: "Aku bangga dengan prinsip 'tidak butuh siapa pun' dan enggan minta bantuan emosional meski sedang krisis.",
      de: "Ich bin stolz darauf, 'niemanden zu brauchen', und bitte selbst in schweren Krisen nie um Trost.",
      fr: "Je suis fier de 'n'avoir besoin de personne' et j'évite de demander du soutien même en pleine crise.",
      es: "Me enorgullece 'no necesitar a nadie' y evito pedir apoyo incluso en momentos dolorosos.",
    },
    options: [
      {
        score: 0,
        label: {
          en: "Disagree — healthy interdependence is natural to me",
          id: "Tidak setuju — saling bergantung secara sehat adalah hal wajar",
          de: "Stimme nicht zu — gesunde Interdependenz ist normal für mich",
          fr: "Pas d'accord — l'interdépendance saine est naturelle pour moi",
          es: "En desacuerdo — la interdependencia sana es natural para mí",
        },
      },
      {
        score: 1,
        label: {
          en: "Sometimes — I prefer solving problems alone first",
          id: "Kadang — Aku lebih suka menyelesaikan masalah sendiri dulu",
          de: "Manchmal — Ich löse Probleme lieber erst allein",
          fr: "Parfois — Je préfère résoudre mes problèmes seul d'abord",
          es: "A veces — Prefiero resolver las cosas por mi cuenta primero",
        },
      },
      {
        score: 2,
        label: {
          en: "Frequently — admitting I need someone feels like a defeat",
          id: "Sering — mengakui bahwa aku butuh seseorang terasa seperti kekalahan",
          de: "Häufig — zuzugeben, dass ich Hilfe brauche, fühlt sich wie Niederlage an",
          fr: "Fréquemment — admettre que j'ai besoin d'aide ressemble à un échec",
          es: "Frecuentemente — admitir que necesito a alguien se siente como derrota",
        },
      },
      {
        score: 3,
        label: {
          en: "Always — extreme hyper-independence is my absolute rule",
          id: "Selalu — kemandirian ekstrem adalah prinsip mutlakku",
          de: "Immer — extreme Hyperunabhängigkeit ist meine eherne Regel",
          fr: "Toujours — l'hyper-indépendance extrême est ma règle absolue",
          es: "Siempre — la hiper-independencia extrema es mi norma fija",
        },
      },
    ],
  },
  {
    id: 4,
    subscale: "vulnerability_tolerance",
    prompt: {
      en: "I am attracted to people who are emotionally unavailable, long-distance, or inconsistent, while losing interest when someone is openly affectionate.",
      id: "Aku tertarik pada orang yang cuek, jauh, atau tidak konsisten, tapi mendadak hilang minat saat seseorang jujur menyukaiku.",
      de: "Ich fühle mich zu emotional unerreichbaren Menschen hingezogen, verliere aber das Interesse, wenn jemand offen liebevoll ist.",
      fr: "Je suis attiré par les personnes indisponibles ou distantes, mais je perds tout intérêt quand quelqu'un est ouvertement affectueux.",
      es: "Me atraen personas no disponibles o distantes, pero pierdo el interés si alguien muestra afecto genuino y constante.",
    },
    options: [
      {
        score: 0,
        label: {
          en: "Disagree — consistent warmth and emotional clarity attract me",
          id: "Tidak setuju — kehangatan konsisten dan kepastian yang menarik buatku",
          de: "Stimme nicht zu — Konsistenz und emotionale Klarheit ziehen mich an",
          fr: "Pas d'accord — la chaleur constante et la clarté m'attirent",
          es: "En desacuerdo — me atrae la calidez constante y la claridad",
        },
      },
      {
        score: 1,
        label: {
          en: "Rarely — occasionally fell for an aloof person in the past",
          id: "Jarang — sesekali pernah terpikat orang dingin di masa lalu",
          de: "Selten — war in der Vergangenheit vereinzelt der Fall",
          fr: "Rarement — cela m'est arrivé exceptionnellement par le passé",
          es: "Rara vez — me ocurrió alguna vez en el pasado",
        },
      },
      {
        score: 2,
        label: {
          en: "Often — emotional safety feels 'boring' while chasing feels exciting",
          id: "Sering — rasa aman terasa 'membosankan', sedangkan mengejar terasa seru",
          de: "Oft — Sicherheit fühlt sich langweilig an, der Jagdtrieb reizt mich",
          fr: "Souvent — la sécurité semble ennuyeuse, la poursuite est excitante",
          es: "A menudo — la seguridad parece aburrida, perseguir me estimula",
        },
      },
      {
        score: 3,
        label: {
          en: "Very strong pattern — available partners trigger instant suffocating 'ick'",
          id: "Pola sangat kuat — orang yang setia dan siap langsung memicu rasa risih/jengah",
          de: "Sehr starkes Muster — liebevolle Partner lösen sofort Fluchtreflexe aus",
          fr: "Modèle très marqué — un partenaire disponible déclenche un rejet immédiat",
          es: "Patrón muy fuerte — alguien disponible me genera rechazo inmediato",
        },
      },
    ],
  },

  // Subscale 2: Defensive Stonewalling (Conflict shutdown & avoidance)
  {
    id: 5,
    subscale: "defensive_stonewalling",
    prompt: {
      en: "During relationship disagreements, I shut down, give the silent treatment, or physically leave the room rather than discuss feelings.",
      id: "Saat terjadi konflik hubungan, aku mendadak bungkam, memberi silent treatment, atau keluar ruangan daripada membahas perasaan.",
      de: "Bei Streitigkeiten schalte ich ab, schweige eisig oder verlasse den Raum, statt Gefühle zu besprechen.",
      fr: "Lors des conflits, je me mure dans le silence ou je quitte la pièce plutôt que de parler de mes émotions.",
      es: "Durante las discusiones, me bloqueo, aplico la ley del hielo o salgo de la habitación en vez de hablar.",
    },
    options: [
      {
        score: 0,
        label: {
          en: "Disagree — I can regulate and communicate even when upset",
          id: "Tidak setuju — Aku bisa mengendalikan diri dan berkomunikasi saat kesal",
          de: "Stimme nicht zu — Ich bleibe im Dialog, auch wenn es schwer ist",
          fr: "Pas d'accord — Je reste capable d'échanger même contrarié",
          es: "En desacuerdo — Me mantengo en el diálogo aunque esté molesto",
        },
      },
      {
        score: 1,
        label: {
          en: "Sometimes — I need a brief 10-minute timeout before talking",
          id: "Kadang — Aku butuh jeda 10 menit sebelum lanjut bicara",
          de: "Manchmal — Ich brauche eine kurze Pause von 10 Minuten",
          fr: "Parfois — J'ai besoin de 10 minutes de pause avant de parler",
          es: "A veces — Necesito una pausa de 10 minutos antes de continuar",
        },
      },
      {
        score: 2,
        label: {
          en: "Often — I go cold for hours or days to protect myself",
          id: "Sering — Aku mendiamkannya berjam-jam atau berhari-hari demi membentengi diri",
          de: "Oft — Ich werde für Stunden oder Tage kalt, um mich zu schützen",
          fr: "Souvent — Je deviens froid pendant des heures ou des jours",
          es: "A menudo — Me muestro frío durante horas o días para protegerme",
        },
      },
      {
        score: 3,
        label: {
          en: "Severe — complete emotional stonewalling is my default conflict defense",
          id: "Parah — bungkam total (stonewalling) adalah pertahanan utamaku saat ribut",
          de: "Massiv — Stonewalling ist meine automatische Standardreaktion",
          fr: "Sévère — le blocage total est ma réaction automatique par défaut",
          es: "Grave — el bloqueo absoluto es mi respuesta defensiva predeterminada",
        },
      },
    ],
  },
  {
    id: 6,
    subscale: "defensive_stonewalling",
    prompt: {
      en: "I keep communication surface-level (memes, work, superficial updates) to avoid raw conversations about where we stand.",
      id: "Aku menjaga obrolan tetap di permukaan (meme, pekerjaan, basa-basi) agar tidak membahas status dan perasaan sebenarnya.",
      de: "Ich halte Gespräche oberflächlich (Memes, Job, Smalltalk), um tiefere Beziehungsgespräche zu vermeiden.",
      fr: "Je maintiens la conversation superficielle (mèmes, travail) pour éviter de parler de nos sentiments réels.",
      es: "Mantengo las conversaciones a nivel superficial (memes, trabajo) para evitar hablar de lo que sentimos.",
    },
    options: [
      {
        score: 0,
        label: {
          en: "Disagree — I enjoy exploring emotional depths with partners",
          id: "Tidak setuju — Aku suka mendalami emosi dan kepastian bersama pasangan",
          de: "Stimme nicht zu — Ich liebe tiefgründige Gespräche über unsere Gefühle",
          fr: "Pas d'accord — J'apprécie aborder la profondeur émotionnelle",
          es: "En desacuerdo — Me gusta profundizar sobre lo que sentimos",
        },
      },
      {
        score: 1,
        label: {
          en: "Occasionally — when I am tired from work",
          id: "Sesekali — terutama saat sedang lelah kerja",
          de: "Gelegentlich — besonders nach stressigen Arbeitstagen",
          fr: "Occasionnellement — surtout quand je suis épuisé",
          es: "Ocasionalmente — sobre todo cuando estoy muy cansado",
        },
      },
      {
        score: 2,
        label: {
          en: "Often — discussing the relationship feels heavy and suffocating",
          id: "Sering — membahas hubungan terasa berat dan menyesakkan",
          de: "Oft — Beziehungsgespräche fühlen sich erdrückend und schwer an",
          fr: "Souvent — parler de la relation semble lourd et étouffant",
          es: "A menudo — hablar de la relación se siente pesado y agobiante",
        },
      },
      {
        score: 3,
        label: {
          en: "Always — I deflect any question regarding future commitment",
          id: "Selalu — Aku menangkis segala pertanyaan tentang komitmen masa depan",
          de: "Immer — Ich wehre jede Frage nach Zukunftsverbindlichkeit ab",
          fr: "Toujours — Je détourne toute question d'engagement futur",
          es: "Siempre — Esquivo cualquier pregunta sobre compromiso futuro",
        },
      },
    ],
  },
  {
    id: 7,
    subscale: "defensive_stonewalling",
    prompt: {
      en: "When someone cries or expresses deep emotional pain around me, I feel annoyed or numb rather than compassionate.",
      id: "Saat seseorang menangis atau mengekspresikan kesedihan mendalam di dekatku, aku merasa risih/mati rasa daripada bersimpati.",
      de: "Wenn jemand in meiner Nähe weint oder tiefen Schmerz zeigt, reagiere ich eher genervt oder taub als empathisch.",
      fr: "Quand quelqu'un pleure ou exprime une grande détresse, je me sens agacé ou anesthésié plutôt qu'empathique.",
      es: "Cuando alguien llora o muestra gran dolor emocional, me siento incómodo o anestesiado en vez de empático.",
    },
    options: [
      {
        score: 0,
        label: {
          en: "Disagree — I can hold empathetic space for other people's tears",
          id: "Tidak setuju — Aku bisa memberi ruang empati bagi air mata orang lain",
          de: "Stimme nicht zu — Ich kann mitfühlenden Raum für Tränen halten",
          fr: "Pas d'accord — Je sais offrir un espace d'écoute bienveillant",
          es: "En desacuerdo — Puedo sostener un espacio empático ante el dolor ajeno",
        },
      },
      {
        score: 1,
        label: {
          en: "Slightly — I immediately look for practical solutions to stop the tears",
          id: "Sedikit — Aku langsung mencari solusi praktis agar tangisnya reda",
          de: "Etwas — Ich suche sofort pragmatische Lösungen, um Tränen zu stoppen",
          fr: "Un peu — Je cherche tout de suite des solutions concrètes",
          es: "Un poco — Busco de inmediato soluciones prácticas para cortar el llanto",
        },
      },
      {
        score: 2,
        label: {
          en: "Moderately — intense emotions make me freeze and want to leave",
          id: "Cukup — emosi yang meluap membuatku beku dan ingin lekas pergi",
          de: "Ziemlich — starke Gefühle anderer lassen mich innerlich einfrieren",
          fr: "Assez — les émotions intenses me figent et me donnent envie de fuir",
          es: "Bastante — las emociones intensas me paralizan y quiero marcharme",
        },
      },
      {
        score: 3,
        label: {
          en: "Strongly — emotional displays trigger internal resentment and detachment",
          id: "Sangat kuat — tangisan orang lain memicu rasa kesal dan mati rasa seketika",
          de: "Stark — emotionale Ausbrüche lösen Abneigung und völlige Kälte in mir aus",
          fr: "Fortement — les pleurs provoquent du ressentiment et un détachement total",
          es: "Muy fuerte — las muestras de llanto me provocan rechazo y desconexión",
        },
      },
    ],
  },
  {
    id: 8,
    subscale: "defensive_stonewalling",
    prompt: {
      en: "I keep backup options, exes on the backburner, or secret exits so I never feel completely committed to one person.",
      id: "Aku menyimpan opsi cadangan, mantan di 'backburner', atau pintu darurat rahasia agar tidak terikat 100% pada satu orang.",
      de: "Ich halte mir heimliche Hintertüren oder alte Kontakte warm, um mich nie voll festlegen zu müssen.",
      fr: "Je garde des options de secours ou des ex sous le coude pour ne jamais être engagé à 100%.",
      es: "Mantengo opciones de reserva o exparejas cerca para no comprometerme jamás al 100%.",
    },
    options: [
      {
        score: 0,
        label: {
          en: "Disagree — when I choose someone, I close external doors wholeheartedly",
          id: "Tidak setuju — saat memilih seseorang, aku menutup opsi lain sepenuh hati",
          de: "Stimme nicht zu — Wenn ich mich entscheide, dann ganz",
          fr: "Pas d'accord — Quand je choisis quelqu'un, je m'investis pleinement",
          es: "En desacuerdo — Cuando elijo a alguien, me comprometo por entero",
        },
      },
      {
        score: 1,
        label: {
          en: "Rarely — only when feeling unappreciated or insecure",
          id: "Jarang — hanya saat merasa tidak dihargai atau kurang aman",
          de: "Selten — nur wenn ich mich unsicher oder ungeschätzt fühle",
          fr: "Rarement — seulement si je me sens délaissé",
          es: "Rara vez — únicamente si me siento poco valorado",
        },
      },
      {
        score: 2,
        label: {
          en: "Often — knowing I have an exit strategy calms my claustrophobia",
          id: "Sering — mengetahui aku punya jalur keluar meredakan rasa terkekangku",
          de: "Oft — ein Notausgang beruhigt meine Beziehungsangst",
          fr: "Souvent — savoir que j'ai une porte de sortie calme ma peur d'étouffer",
          es: "A menudo — saber que tengo una salida alivia mi sensación de agobio",
        },
      },
      {
        score: 3,
        label: {
          en: "Always — I never surrender my total independence to anyone",
          id: "Selalu — Aku tidak akan pernah menyerahkan independensiku pada siapa pun",
          de: "Immer — Ich gebe meine Unabhängigkeit unter keinen Umständen auf",
          fr: "Toujours — Je ne renonce jamais à ma totale liberté pour personne",
          es: "Siempre — Jamás cedo mi independencia absoluta ante nadie",
        },
      },
    ],
  },

  // Subscale 3: Autonomy Anxiety (Fear of engulfment & dependency)
  {
    id: 9,
    subscale: "autonomy_anxiety",
    prompt: {
      en: "When a partner wants to spend several consecutive days together, I feel suffocated and desperate for solitary air.",
      id: "Saat pasangan ingin menghabiskan beberapa hari berturut-turut bersamaku, aku merasa sesak dan mendambakan ruang sendiri.",
      de: "Wenn ein Partner mehrere Tage am Stück mit mir verbringen will, fühle ich mich erstickt und brauche dringend Distanz.",
      fr: "Quand un partenaire veut passer plusieurs jours d'affilée ensemble, je me sens étouffé et j'ai besoin d'air.",
      es: "Cuando una pareja quiere pasar varios días seguidos conmigo, siento asfixia y una necesidad urgente de espacio.",
    },
    options: [
      {
        score: 0,
        label: {
          en: "Disagree — I enjoy shared time and communicate space needs smoothly",
          id: "Tidak setuju — Aku menikmati kebersamaan dan bisa meminta me-time santai",
          de: "Stimme nicht zu — Ich genieße gemeinsame Zeit und kommuniziere Pausen entspannt",
          fr: "Pas d'accord — J'apprécie le temps partagé et j'exprime mes besoins calmement",
          es: "En desacuerdo — Disfruto el tiempo juntos y pido mi espacio sin conflicto",
        },
      },
      {
        score: 1,
        label: {
          en: "Sometimes — as an introvert I just need quiet recharge hours",
          id: "Kadang — sebagai introvert aku cuma butuh beberapa jam hening",
          de: "Manchmal — als Introvertierter brauche ich einfach etwas Ruhe",
          fr: "Parfois — en tant qu'introverti, j'ai juste besoin de recharger mes batteries",
          es: "A veces — como introvertido solo necesito un rato de silencio",
        },
      },
      {
        score: 2,
        label: {
          en: "Frequently — proximity feels like an obligation that consumes my identity",
          id: "Sering — kedekatan terasa seperti kewajiban yang mengikis jati diriku",
          de: "Häufig — ständige Nähe fühlt sich wie der Verlust meiner Autonomie an",
          fr: "Fréquemment — la proximité ressemble à une obligation qui efface mon identité",
          es: "Frecuentemente — la cercanía se siente como una carga que borra mi identidad",
        },
      },
      {
        score: 3,
        label: {
          en: "Severely — any consistent intimacy triggers visceral panic and resentment",
          id: "Sangat parah — keintiman intens memicu kepanikan fisik dan rasa benci",
          de: "Extrem — verbindliche Nähe löst fast panische Fluchtgedanken aus",
          fr: "Sévèrement — l'intimité continue déclenche une panique viscérale",
          es: "Muy grave — la intimidad constante me genera pánico y resentimiento visceral",
        },
      },
    ],
  },
  {
    id: 10,
    subscale: "autonomy_anxiety",
    prompt: {
      en: "I find myself nitpicking trivial flaws in partners (the way they chew, their laugh, their shoes) as an excuse to disengage.",
      id: "Aku sering mempermasalahkan hal sepele pada pasangan (cara mengunyah, tawanya, sepatunya) sebagai alasan untuk menjauh.",
      de: "Ich suche nach absurden Kleinigkeiten (Lachen, Essgewohnheiten), um innerlich Distanz aufzubauen.",
      fr: "Je m'arrête sur des détails insignifiants (sa façon de manger, son rire) pour justifier de m'éloigner.",
      es: "Me obsesiono con defectos insignificantes (su risa, cómo mastica) como excusa para enfriar la relación.",
    },
    options: [
      {
        score: 0,
        label: {
          en: "Disagree — I accept human quirks without losing affection",
          id: "Tidak setuju — Aku menerima kebiasaan unik manusia tanpa hilang rasa",
          de: "Stimme nicht zu — Ich akzeptiere Eigenheiten ohne Liebesverlust",
          fr: "Pas d'accord — J'accepte les petites manies sans perdre mes sentiments",
          es: "En desacuerdo — Acepto las manías humanas sin perder el cariño",
        },
      },
      {
        score: 1,
        label: {
          en: "Rarely — only when stressed about other life areas",
          id: "Jarang — hanya saat sedang stres urusan hidup lain",
          de: "Selten — nur unter allgemeinem Lebensstress",
          fr: "Rarement — seulement si je suis stressé par ailleurs",
          es: "Rara vez — solo si estoy estresado por otros motivos",
        },
      },
      {
        score: 2,
        label: {
          en: "Often — the 'phantom ex' or idealized fictional partner looks better than reality",
          id: "Sering — bayangan 'mantan sempurna' atau pasangan fiktif terasa lebih menarik",
          de: "Oft — ein idealisierter 'Phantom-Ex' scheint mir verlockender als die Realität",
          fr: "Souvent — le mythe de l'ex parfait ou de l'idéal inaccessible me rassure",
          es: "A menudo — la expareja idealizada o una fantasía me parece mejor que la realidad",
        },
      },
      {
        score: 3,
        label: {
          en: "Constantly — microscopic flaws instantly kill my emotional connection",
          id: "Terus-menerus — kekurangan sekecil apa pun langsung mematikan rasa cintaku",
          de: "Ständig — mikroskopische Makel zerstören meine Zuneigung schlagartig",
          fr: "Constamment — le moindre détail tue immédiatement ma connexion émotionnelle",
          es: "Constantemente — el defecto más diminuto destruye de golpe mi conexión",
        },
      },
    ],
  },
  {
    id: 11,
    subscale: "autonomy_anxiety",
    prompt: {
      en: "I secretly fear that if someone truly gets to know the real me, they will be disgusted, bored, or disappointed.",
      id: "Diam-diam aku takut jika seseorang benar-benar mengenal diriku yang asli, mereka akan muak, bosan, atau kecewa.",
      de: "Ich fürchte insgeheim, dass andere gelangweilt oder enttäuscht sind, wenn sie mein wahres Ich sehen.",
      fr: "Au fond, je crains que si quelqu'un découvre qui je suis vraiment, il sera déçu ou s'ennuiera.",
      es: "En el fondo temo que si alguien me conoce de verdad, se aburrirá o se sentirá profundamente decepcionado.",
    },
    options: [
      {
        score: 0,
        label: {
          en: "Disagree — I feel worthy of love as an authentic, imperfect human",
          id: "Tidak setuju — Aku merasa layak dicintai apa adanya dengan segala kekuranganku",
          de: "Stimme nicht zu — Ich fühle mich liebenswert, so unvollkommen ich bin",
          fr: "Pas d'accord — Je me sens digne d'être aimé avec mes imperfections",
          es: "En desacuerdo — Me siento digno de amor con mis imperfecciones",
        },
      },
      {
        score: 1,
        label: {
          en: "Occasionally — mild imposter feelings in new romances",
          id: "Kadang — sedikit rasa minder saat memulai hubungan baru",
          de: "Gelegentlich — leichte Selbstzweifel am Anfang neuer Beziehungen",
          fr: "Parfois — un léger syndrome de l'imposteur au début",
          es: "A veces — ligera inseguridad al empezar algo nuevo",
        },
      },
      {
        score: 2,
        label: {
          en: "Frequently — I wear a polished persona to conceal emotional shame",
          id: "Sering — Aku memasang persona sempurna demi menyembunyikan rasa malu batin",
          de: "Häufig — Ich trage eine glänzende Maske, um Scham zu verbergen",
          fr: "Fréquemment — Je porte un masque impeccable pour cacher mes failles",
          es: "Frecuentemente — Uso una fachada perfecta para ocultar mis inseguridades",
        },
      },
      {
        score: 3,
        label: {
          en: "Extremely deep — keeping people at arm's length is my only way to survive",
          id: "Sangat dalam — menjaga jarak adalah satu-satunya caraku bertahan hidup",
          de: "Extrem tief — emotionale Distanz ist meine einzige Überlebensstrategie",
          fr: "Extrêmement profond — garder mes distances est ma seule façon de survivre",
          es: "Muy profundo — mantener las distancias es mi única forma de sobrevivir",
        },
      },
    ],
  },
  {
    id: 12,
    subscale: "autonomy_anxiety",
    prompt: {
      en: "When a relationship ends, I feel an immediate wave of intense relief and freedom before any sadness registers.",
      id: "Saat hubungan berakhir, hal pertama yang kurasakan adalah kelegaan luar biasa dan kebebasan sebelum rasa sedih muncul.",
      de: "Wenn eine Beziehung endet, fühle ich zuerst riesige Erleichterung und Freiheit, bevor Trauer einsetzt.",
      fr: "Quand une relation se termine, je ressens d'abord un immense soulagement avant toute tristesse.",
      es: "Cuando termina una relación, siento un alivio inmenso y libertad antes de que aparezca la tristeza.",
    },
    options: [
      {
        score: 0,
        label: {
          en: "Disagree — breakups evoke grief, sadness, and healthy mourning",
          id: "Tidak setuju — putus cinta memicu rasa duka, sedih, dan proses berduka wajar",
          de: "Stimme nicht zu — Trennungen tun weh und erfordern echte Trauerarbeit",
          fr: "Pas d'accord — les ruptures provoquent une peine normale et du chagrin",
          es: "En desacuerdo — las rupturas duelen y requieren un duelo honesto",
        },
      },
      {
        score: 1,
        label: {
          en: "Only if the relationship was toxic or draining",
          id: "Hanya jika hubungan tersebut memang toksik atau menguras tenaga",
          de: "Nur wenn die Beziehung toxisch oder extrem kräftezehrend war",
          fr: "Seulement si la relation était devenue toxique ou étouffante",
          es: "Solo si la relación era tóxica o agotadora",
        },
      },
      {
        score: 2,
        label: {
          en: "Often — I celebrate regaining my solitary sanctuary and control",
          id: "Sering — Aku merayakan kembalinya kendali dan kesendirianku",
          de: "Oft — Ich feiere die Rückkehr meiner totalen Kontrolle und Autonomie",
          fr: "Souvent — Je célèbre le retour de ma liberté et de mon contrôle",
          es: "A menudo — Celebro recuperar el control y mi soledad",
        },
      },
      {
        score: 3,
        label: {
          en: "Always — ending commitment feels like escaping an emotional cage",
          id: "Selalu — mengakhiri komitmen terasa seperti kabur dari sangkar emosional",
          de: "Immer — das Ende fühlt sich wie der Ausbruch aus einem emotionalen Gefängnis an",
          fr: "Toujours — la fin ressemble à une évasion d'une prison affective",
          es: "Siempre — terminar se siente como escapar de una cárcel emocional",
        },
      },
    ],
  },
];

export const EMOTIONAL_AVAILABILITY_ARCHETYPES: Record<
  EmotionalAvailabilityArchetype["level"],
  EmotionalAvailabilityArchetype
> = {
  securely_open: {
    level: "securely_open",
    badge: {
      en: "Secure & Available",
      id: "Terbuka & Aman",
      de: "Sicher & Nahbar",
      fr: "Sécurisant & Disponible",
      es: "Seguro y Accesible",
    },
    title: {
      en: "Securely Available & Boundaried",
      id: "Ketersediaan Emosional Sehat & Berbatas",
      de: "Sicher verfügbar & gesund abgegrenzt",
      fr: "Disponible et Émotionnellement Ancré",
      es: "Emocionalmente Disponible y Seguro",
    },
    tagline: {
      en: "High vulnerability tolerance paired with healthy self-soothing and clear boundaries.",
      id: "Toleransi kerentanan tinggi dengan regulasi mandiri dan batasan diri yang kokoh.",
      de: "Hohe emotionale Nahbarkeit gepaart mit gesunder Abgrenzung und Selbstberuhigung.",
      fr: "Excellente tolérance à l'intimité, régulation autonome et limites respectées.",
      es: "Alta tolerancia a la vulnerabilidad, límites claros y seguridad interna.",
    },
    description: {
      en: "You view intimacy not as a trap, but as an expansive terrain of mutual growth. You are capable of sharing fears, holding compassionate space for partner distress, and asking for support without shame. Conflict is an opportunity for repair rather than an excuse to flee.",
      id: "Kamu memandang keintiman bukan sebagai jebakan, melainkan ruang bertumbuh bersama. Kamu mampu membagikan ketakutan, menampung kesedihan pasangan, dan meminta bantuan tanpa rasa minder. Konflik bagimu adalah momen rekonsiliasi, bukan alasan untuk kabur.",
      de: "Du siehst Intimität nicht als Falle, sondern als Raum für echtes Wachstum. Du kannst Schwächen zeigen, emotionale Stürme des Partners halten und um Trost bitten. Konflikte sind für dich eine Einladung zur Versöhnung, nicht zur Flucht.",
      fr: "Vous ne voyez pas l'intimité comme un piège, mais comme un espace d'épanouissement. Vous pouvez exprimer vos doutes, écouter sans fuir et demander de l'aide sans honte.",
      es: "Ves la intimidad como un espacio seguro y no como una trampa. Sabes expresar tus temores, sostener las emociones del otro y pedir apoyo con tranquilidad.",
    },
    psychologyInsight: {
      en: "According to Dr. John Gottman and Sue Johnson's Emotionally Focused Therapy (EFT), secure availability stems from an internalized belief that vulnerability will be met with acceptance rather than punishment or abandonment.",
      id: "Berdasarkan riset Dr. John Gottman dan Emotionally Focused Therapy (EFT), ketersediaan emosional lahir dari keyakinan bahwa kerentanan diri akan disambut dengan penerimaan, bukan hukuman atau penolakan.",
      de: "Nach der emotionsfokussierten Therapie (EFT) von Sue Johnson basiert sichere Bindung auf der inneren Gewissheit, dass Verletzlichkeit mit Zuwendung statt Verurteilung beantwortet wird.",
      fr: "Selon la thérapie basée sur l'attachement (EFT), la disponibilité affective repose sur la conviction intime que la vulnérabilité sera accueillie avec bienveillance.",
      es: "Según la terapia focalizada en las emociones (EFT), la disponibilidad segura surge de la certeza de que mostrar vulnerabilidad será recibido con cariño y no con castigo.",
    },
    actionProtocols: {
      en: [
        "Continue practicing intentional check-ins with your partner regarding unmet emotional needs.",
        "Model vulnerable communication without forcing partners to open up before they feel safe.",
        "Maintain your solitary hobbies and friendships to safeguard your healthy sense of self.",
      ],
      id: [
        "Lanjutkan kebiasaan check-in emosional berkala untuk mengecek kebutuhan yang belum tersampaikan.",
        "Jadilah teladan komunikasi yang jujur tanpa memaksakan pasangan membuka diri sebelum mereka merasa aman.",
        "Tetap rawat hobi dan pertemanan mandiri agar identitas individumu selalu terjaga.",
      ],
      de: [
        "Führe weiterhin regelmäßige emotionale Check-ins für unausgesprochene Bedürfnisse durch.",
        "Lebe verletzliche Kommunikation vor, ohne den Partner zu bedrängen.",
        "Pflege eigene Interessen und Freundschaften, um deine gesunde Autonomie zu bewahren.",
      ],
      fr: [
        "Continuez les check-ins réguliers sur vos besoins affectifs mutuels.",
        "Incarnez une communication vulnérable sans forcer l'autre s'il n'est pas prêt.",
        "Conservez vos centres d'intérêt personnels pour préserver votre identité.",
      ],
      es: [
        "Mantén conversaciones periódicas sobre necesidades emocionales no satisfechas.",
        "Comunica tu vulnerabilidad sin presionar a tu pareja si necesita más tiempo.",
        "Cuida tus espacios individuales y amistades para alimentar tu autonomía.",
      ],
    },
    dailyAffirmation: {
      en: "I can be deeply close to someone while remaining entirely whole and free.",
      id: "Aku bisa dekat secara mendalam dengan seseorang tanpa kehilangan keutuhan dan kebebasanku.",
      de: "Ich kann tief mit jemandem verbunden sein und gleichzeitig völlig frei und ganz bleiben.",
      fr: "Je peux être profondément proche de quelqu'un tout en restant libre et entier.",
      es: "Puedo estar profundamente conectado con alguien sin perder mi libertad e integridad.",
    },
  },

  guarded_pragmatist: {
    level: "guarded_pragmatist",
    badge: {
      en: "Guarded Pragmatist",
      id: "Pragmatis Waspada",
      de: "Vorsichtiger Pragmatiker",
      fr: "Pragmatique Prudent",
      es: "Pragmático Cauteloso",
    },
    title: {
      en: "The Guarded Pragmatist",
      id: "Sang Pragmatis yang Membentengi Diri",
      de: "Der vorsichtige Pragmatiker",
      fr: "Le Pragmatique Réservé",
      es: "El Pragmático Prudente",
    },
    tagline: {
      en: "Selective emotional investor who requires long proof before lowering the drawbridge.",
      id: "Investor emosi selektif yang butuh bukti panjang sebelum menurunkan jembatan benteng.",
      de: "Selektiver Bindungspartner, der lange Beweise verlangt, bevor die Zugbrücke fällt.",
      fr: "Investisseur émotionnel prudent qui exige des preuves durables avant d'ouvrir la porte.",
      es: "Inversor emocional selectivo que pide pruebas consistentes antes de bajar la guardia.",
    },
    description: {
      en: "You are not anti-love, but you treat intimacy with intellectual caution. You have experienced past emotional stings or broken promises, so you measure trust in drops. You show love through practical acts of service and reliability rather than raw verbal intimacy.",
      id: "Kamu bukan anti-cinta, namun mendekati keintiman dengan kehati-hatian rasional. Kamu pernah tersakiti di masa lalu, sehingga meneteskan kepercayaan sedikit demi sedikit. Kamu lebih suka menunjukkan rasa sayang lewat tindakan nyata ketimbang kata-kata mesra.",
      de: "Du bist nicht beziehungsunfähig, aber du begegnest Nähe mit analytischer Vorsicht. Frühere Enttäuschungen lassen dich Vertrauen nur tröpfchenweise vergeben. Deine Liebe zeigst du eher durch Taten als durch verletzliche Worte.",
      fr: "Vous n'êtes pas insensible, mais vous abordez l'intimité avec prudence. Marquée par des déceptions passées, votre confiance se mérite au compte-gouttes. Vous montrez votre attachement par les actes plutôt que par les mots.",
      es: "No rechazas el amor, pero te aproximas a él con cautela mental. Heridas pasadas te hacen dosificar la confianza con cuentagotas. Prefieres demostrar afecto con hechos prácticos antes que con palabras vulnerables.",
    },
    psychologyInsight: {
      en: "This style operates on risk-mitigation: intellectualizing feelings shields the nervous system from the perceived humiliation of one-sided emotional exposure.",
      id: "Gaya ini beroperasi atas prinsip mitigasi risiko: merasionalkan emosi melindungi sistem saraf dari rasa malu akibat kerentanan sepihak.",
      de: "Dieser Stil dient der Risikominimierung: Das Rationalisieren von Gefühlen schützt das Nervensystem vor vermeintlicher Demütigung.",
      fr: "Ce fonctionnement vise à réduire les risques : intellectualiser les émotions protège contre la peur du rejet.",
      es: "Este estilo opera reduciendo riesgos: intelectualizar lo que sientes protege al sistema nervioso del temor al rechazo.",
    },
    actionProtocols: {
      en: [
        "Practice sharing one uncomfortable truth or micro-fear per week without softening it with humor.",
        "Catch the urge to solve problems when a partner just wants you to listen and nod.",
        "Recognize that unconditional trust is built through mutual micro-risks, not guaranteed contracts.",
      ],
      id: [
        "Latih membagikan satu ketakutan kecil per minggu tanpa dibalut lelucon.",
        "Sadari dorongan untuk segera 'memberi solusi' saat pasangan hanya ingin didengarkan.",
        "Pahami bahwa kepercayaan tulus dibangun lewat keberanian mengambil risiko kecil bersama.",
      ],
      de: [
        "Übe, einmal pro Woche eine unangenehme Wahrheit zu teilen, ohne sie mit Humor abzumildern.",
        "Widerstehe dem Drang, sofort Lösungen zu bieten, wenn dein Gegenüber nur Trost sucht.",
        "Erkenne an, dass Vertrauen durch kleine gegenseitige Wagnisse wächst, nicht durch Garantien.",
      ],
      fr: [
        "Partagez une vérité intime ou une petite peur par semaine sans la masquer derrière une plaisanterie.",
        "Freinez l'envie d'apporter des solutions quand l'autre cherche simplement de l'écoute.",
        "Rappelez-vous que la confiance se construit par de micro-prises de risque mutuelles.",
      ],
      es: [
        "Comparte una pequeña inquietud sincera a la semana sin disimularla con bromas.",
        "Frena el impulso de resolver problemas cuando tu pareja solo necesita ser escuchada.",
        "Recuerda que la confianza se forja asumiendo pequeños riesgos compartidos día a día.",
      ],
    },
    dailyAffirmation: {
      en: "Opening my heart step-by-step is an act of courageous strength, not foolish weakness.",
      id: "Membuka hati selangkah demi selangkah adalah bukti keberanian sejati, bukan kelemahan bodoh.",
      de: "Mein Herz schrittweise zu öffnen, ist ein Zeichen von Mut, nicht von Schwäche.",
      fr: "Ouvrir mon cœur pas à pas est une preuve de courage, pas une faiblesse.",
      es: "Abrir mi corazón paso a paso es una muestra de valentía, jamás de debilidad.",
    },
  },

  counter_dependent: {
    level: "counter_dependent",
    badge: {
      en: "Lone Fortress",
      id: "Benteng Mandiri",
      de: "Einsame Festung",
      fr: "Forteresse Solitaire",
      es: "Fortaleza Solitaria",
    },
    title: {
      en: "The Counter-Dependent Lone Fortress",
      id: "Benteng Pertahanan Counter-Dependent",
      de: "Die gegenabhängige Festung",
      fr: "La Forteresse Contre-Dépendante",
      es: "La Fortaleza Contradependiente",
    },
    tagline: {
      en: "Extreme hyper-independence used as a shield against the dread of being controlled or consumed.",
      id: "Kemandirian ekstrem sebagai perisai dari ketakutan dikendalikan atau ditelan hubungan.",
      de: "Extreme Hyperunabhängigkeit als Schutzschild gegen Kontrollverlust und Enge.",
      fr: "Hyper-indépendance farouche érigée en rempart contre la peur d'être envahi.",
      es: "Hiperindependencia extrema como escudo frente al pánico de sentirse controlado.",
    },
    description: {
      en: "You have perfected the art of the emotional ejector seat. When genuine intimacy approaches, your subconscious sounds a red alert: suffocating 'ick', sudden repulsion over trivial partner flaws, or an urgent compulsion to flee. You confuse closeness with captivity.",
      id: "Kamu sangat ahli dalam menarik tuas kursi pelontar emosional. Saat keintiman sejati mendekat, alarm bawah sadarmu menyala merah: rasa risih mendadak, fokus pada kekurangan sepele pasangan, atau dorongan mendesak untuk kabur. Kamu menyamakan kedekatan dengan penjara.",
      de: "Du beherrschst den emotionalen Schleudersitz perfekt. Sobald echte Nähe droht, schlägt dein Alarmsystem an: Ekelgefühle über Kleinigkeiten, Fluchtimpulse oder eisiges Schweigen. Für dich bedeutet Nähe unbewusst Freiheitsberaubung.",
      fr: "Vous maîtrisez le bouton d'éjection émotionnelle. Dès que l'intimité devient réelle, une alarme retentit : sentiment d'étouffement, rejet soudain pour un détail anodin et besoin vital de fuir.",
      es: "Dominas el botón de eyección emocional. En cuanto la intimidad se intensifica, tu sistema entra en pánico: sensación de agobio, rechazo instantáneo por manías ajenas y urgencia de escapar.",
    },
    psychologyInsight: {
      en: "Psychologist Harriet Goldhor Lerner identifies counter-dependency as an avoidant attachment trauma armor: early childhood boundaries were likely smothered or conditional, teaching the child that closeness equals total loss of identity.",
      id: "Pakar psikologi Harriet Goldhor Lerner mengidentifikasi counter-dependency sebagai trauma perlekatan menghindar (avoidant): batasan masa kecil mungkin pernah dilanggar, menanamkan keyakinan bahwa kedekatan berarti hilangnya jati diri.",
      de: "Psychologen identifizieren Gegenabhängigkeit als Vermeidungs-Traumapanzer: In der Kindheit wurden Grenzen oft missachtet, weshalb Nähe heute als Bedrohung der eigenen Existenz erlebt wird.",
      fr: "Ce profil correspond à un attachement évitant marqué : l'enfant a appris que la proximité rimait avec étouffement et perte de soi.",
      es: "Este perfil refleja un apego evitativo arraigado: en la infancia las fronteras personales fueron vulneradas, asociando cercanía con asfixia.",
    },
    actionProtocols: {
      en: [
        "When the urge to break up or pull away spikes, institute a mandatory 72-hour pause before acting.",
        "Label the physical sensation: tell yourself *'My nervous system is in fear-flight, not falling out of love.'*",
        "Communicate boundaries explicitly instead of using stonewalling or ghosting as exit strategies.",
      ],
      id: [
        "Saat dorongan untuk menyudahi hubungan memuncak, terapkan jeda wajib 72 jam sebelum mengambil keputusan.",
        "Beri label pada sensasi tubuh: katakan *'Sarafku sedang panik ingin kabur, ini bukan berarti cintaku hilang.'*",
        "Ungkapkan batasan diri secara verbal alih-alih melakukan silent treatment atau menghilang (ghosting).",
      ],
      de: [
        "Wenn der Flucht- oder Trennungsimpuls aufsteigt, halte eine verbindliche 72-Stunden-Pause ein.",
        "Benenne das Gefühl: *'Mein Nervensystem hat Angst vor Nähe, das ist kein Verlust von Liebe.'*",
        "Setze klare verbale Grenzen, statt dich in Schweigen oder Ghosting zu flüchten.",
      ],
      fr: [
        "Lorsque l'envie de fuir ou de rompre surgit, imposez-vous un délai de réflexion de 72 heures.",
        "Nommez la réaction : *'Mon système nerveux est en alerte, ce n'est pas un manque d'amour.'*",
        "Exprimez vos besoins d'espace calmement au lieu de disparaître ou de vous murer dans le silence.",
      ],
      es: [
        "Cuando sientas la urgencia de huir o romper, date una pausa obligatoria de 72 horas antes de actuar.",
        "Ponle nombre a la alarma corporal: *'Mi sistema nervioso siente miedo, no es que haya dejado de querer.'*",
        "Pide espacio verbalmente con serenidad en vez de aplicar la ley del hielo o desaparecer.",
      ],
    },
    dailyAffirmation: {
      en: "Connection is not a cage; I have the power to protect my space while holding someone close.",
      id: "Koneksi bukan sangkar penjara; aku berkuasa menjaga ruang pribadiku sambil tetap menyayangi.",
      de: "Nähe ist kein Käfig; ich habe die Kraft, meinen Raum zu wahren und dennoch zu lieben.",
      fr: "L'amour n'est pas une prison ; je peux protéger mon espace tout en restant proche.",
      es: "La cercanía no es una jaula; puedo cuidar mi espacio personal y amar al mismo tiempo.",
    },
  },

  anxious_compensator: {
    level: "anxious_compensator",
    badge: {
      en: "Anxious Over-Giver",
      id: "Pemberi Cemas",
      de: "Ängstlicher Über-Geber",
      fr: "Surinvesti Anxieux",
      es: "Sobreentregado Ansioso",
    },
    title: {
      en: "The Anxious Over-Compensator",
      id: "Sang Pemberi yang Mengorbankan Diri",
      de: "Der ängstliche Über-Geber",
      fr: "Le Surinvesti Anxieux",
      es: "El Sobreentregado Ansioso",
    },
    tagline: {
      en: "Appears emotionally available on the surface, but hides true needs beneath people-pleasing and protest behavior.",
      id: "Tampak sangat terbuka di permukaan, namun menyembunyikan kebutuhan asli di balik people-pleasing dan kepanikan.",
      de: "Wirkt oberflächlich extrem verfügbar, versteckt aber eigene Bedürfnisse hinter People-Pleasing.",
      fr: "Semble très disponible en surface, mais masque ses vrais besoins derrière le sacrifice de soi.",
      es: "Parece muy abierto en la superficie, pero esconde sus necesidades reales bajo la complacencia.",
    },
    description: {
      en: "You crave deep connection intensely, but your availability is often distorted by fear of abandonment. You over-give, monitor your partner's micro-expressions obsessively, and struggle to articulate your own boundaries. True vulnerability requires showing your authentic, non-pleasing self.",
      id: "Kamu sangat mendambakan koneksi mendalam, namun keterbukaanmu terdistorsi oleh ketakutan akan ditinggalkan. Kamu memberi berlebihan, memantau perubahan ekspresi pasangan dengan cemas, dan sulit menyuarakan batasanmu sendiri. Keterbukaan sejati menuntutmu berani tidak selalu menyenangkan orang lain.",
      de: "Du sehnst dich nach bedingungsloser Nähe, doch deine Verfügbarkeit wird von Verlustangst beherrscht. Du gibst zu viel, scannst jede Mimik deines Partners und traust dich nicht, Grenzen zu setzen. Echte Nähe bedeutet auch, den Mut zum Neinsagen zu haben.",
      fr: "Vous aspirez profondément à l'amour, mais votre disponibilité est teintée par la peur de l'abandon. Vous donnez trop, scrutez chaque micro-réaction de l'autre et taisez vos limites.",
      es: "Anhelas una conexión profunda, pero tu entrega está condicionada por el miedo al abandono. Das en exceso, vigilas cada gesto del otro y te cuesta poner límites por temor a que se alejen.",
    },
    psychologyInsight: {
      en: "In attachment psychology, 'pseudo-availability' can mask a deep fear of real intimacy: by focusing 100% on managing the partner's emotional state, the anxious person avoids facing their own vulnerability and unhealed wounds.",
      id: "Dalam psikologi relasional, 'pseudo-availability' menutupi ketakutan akan keintiman nyata: dengan sibuk mengatur emosi pasangan, orang cemas menghindari luka batin mereka sendiri.",
      de: "In der Bindungsforschung tarnt Über-Verfügbarkeit oft eigene Angst vor wahrer Intimität: Wer nur den Partner managt, muss den eigenen verletzten Kern nicht spüren.",
      fr: "Dans la psychologie de l'attachement, le surinvestissement masque la peur d'être réellement vu : en s'oubliant pour l'autre, on évite d'exposer ses propres blessures.",
      es: "En la psicología del apego, la sobreentrega camufla el miedo a mostrarse vulnerable: centrarse solo en la pareja evita mirar las propias heridas.",
    },
    actionProtocols: {
      en: [
        "Practice letting a partner come toward you without initiating texts or fixing their mood.",
        "State a boundary or a disagreement without apologizing or explaining for ten minutes.",
        "Anchor in self-soothing tools like breathwork before sending reactive anxious messages.",
      ],
      id: [
        "Latih membiarkan pasangan berinisiatif menghubungimu tanpa kamu selalu mendahului.",
        "Sampaikan ketidaksetujuan atau batasan tanpa meminta maaf berkali-kali.",
        "Gunakan teknik pernapasan untuk menenangkan diri sebelum mengirim pesan panjang saat cemas.",
      ],
      de: [
        "Übe, den Partner auf dich zukommen zu lassen, ohne Nachrichtenfluten zu starten.",
        "Sprich ein Nein oder eine Meinungsverschiedenheit aus, ohne dich minutenlang zu rechtfertigen.",
        "Nutze somatische Atemübungen, bevor du aus Panik heraus impulsiv reagierst.",
      ],
      fr: [
        "Laissez le partenaire venir vers vous sans envoyer de messages de relance compulsifs.",
        "Posez une limite claire sans vous excuser ni vous justifier pendant des heures.",
        "Apaisez votre système nerveux par la respiration avant de réagir sous le coup de l'angoisse.",
      ],
      es: [
        "Permite que tu pareja dé el paso de buscarte sin anticiparte por ansiedad.",
        "Expresa un desacuerdo o un límite sin pedir disculpas ni justificarte en exceso.",
        "Respira y calma tu cuerpo antes de enviar mensajes largos motivados por el pánico.",
      ],
    },
    dailyAffirmation: {
      en: "I do not need to earn love through constant self-sacrifice; I am worthy as I am.",
      id: "Aku tidak perlu membeli cinta dengan terus mengorbankan diri; aku layak dicintai apa adanya.",
      de: "Ich muss Liebe nicht durch Selbstaufgabe verdienen; ich bin wertvoll, so wie ich bin.",
      fr: "Je n'ai pas besoin d'acheter l'amour en me sacrifiant ; je mérite d'être aimé tel que je suis.",
      es: "No necesito ganarme el amor sacrificándome sin cesar; soy digno de afecto tal y como soy.",
    },
  },
};

export function calculateEmotionalAvailabilityScore(
  answers: Record<number, number>
): EmotionalAvailabilityScoreResult {
  let totalScore = 0;
  let vulnerabilityScore = 0;
  let stonewallingScore = 0;
  let autonomyScore = 0;

  EMOTIONAL_AVAILABILITY_QUESTIONS.forEach((q) => {
    const score = answers[q.id] ?? 0;
    totalScore += score;

    if (q.subscale === "vulnerability_tolerance") vulnerabilityScore += score;
    if (q.subscale === "defensive_stonewalling") stonewallingScore += score;
    if (q.subscale === "autonomy_anxiety") autonomyScore += score;
  });

  const maxTotal = EMOTIONAL_AVAILABILITY_QUESTIONS.length * 3; // 36
  const maxSubscale = 4 * 3; // 12
  const percentage = Math.round((totalScore / maxTotal) * 100);

  let level: EmotionalAvailabilityArchetype["level"];
  if (percentage <= 24) {
    level = "securely_open";
  } else if (percentage <= 49) {
    level = "guarded_pragmatist";
  } else if (percentage <= 74) {
    level = "anxious_compensator";
  } else {
    level = "counter_dependent";
  }

  return {
    totalScore,
    percentage,
    level,
    profile: EMOTIONAL_AVAILABILITY_ARCHETYPES[level],
    subscales: {
      vulnerability_tolerance: {
        score: vulnerabilityScore,
        percentage: Math.round((vulnerabilityScore / maxSubscale) * 100),
      },
      defensive_stonewalling: {
        score: stonewallingScore,
        percentage: Math.round((stonewallingScore / maxSubscale) * 100),
      },
      autonomy_anxiety: {
        score: autonomyScore,
        percentage: Math.round((autonomyScore / maxSubscale) * 100),
      },
    },
  };
}
