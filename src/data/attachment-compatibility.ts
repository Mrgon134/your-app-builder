export type AttachmentCompatibilityLang = "en" | "id" | "de" | "fr" | "es";

export interface AttachmentCompatibilityQuestion {
  id: number;
  subscale: "anxious_pursuit" | "avoidant_deactivation" | "protest_behavior";
  prompt: Record<AttachmentCompatibilityLang, string>;
  options: {
    label: Record<AttachmentCompatibilityLang, string>;
    score: number; // 0 to 3
  }[];
}

export interface AttachmentCompatibilityArchetype {
  level: "earned_secure_harmonizer" | "cautious_relational_balancer" | "anxious_pursuer_spiral" | "anxious_avoidant_rollercoaster";
  badge: Record<AttachmentCompatibilityLang, string>;
  title: Record<AttachmentCompatibilityLang, string>;
  tagline: Record<AttachmentCompatibilityLang, string>;
  description: Record<AttachmentCompatibilityLang, string>;
  psychologyInsight: Record<AttachmentCompatibilityLang, string>;
  actionProtocols: Record<AttachmentCompatibilityLang, string[]>;
  dailyAffirmation: Record<AttachmentCompatibilityLang, string>;
}

export interface AttachmentCompatibilityScoreResult {
  totalScore: number;
  percentage: number;
  level: AttachmentCompatibilityArchetype["level"];
  profile: AttachmentCompatibilityArchetype;
  subscales: {
    anxious_pursuit: { score: number; percentage: number };
    avoidant_deactivation: { score: number; percentage: number };
    protest_behavior: { score: number; percentage: number };
  };
}

export const ATTACHMENT_COMPATIBILITY_QUESTIONS: AttachmentCompatibilityQuestion[] = [
  // Subscale 1: Anxious Pursuit (Levine & Heller Attachment Theory)
  {
    id: 1,
    subscale: "anxious_pursuit",
    prompt: {
      en: "When my partner takes hours to reply to my message, my mind immediately jumps to catastrophic thoughts (they are losing interest, upset with me, or pulling away).",
      id: "Saat pasangan butuh berjam-jam untuk membalas chat, pikiranku langsung panik (mereka mulai bosan, marah, atau berniat menjauh).",
      de: "Wenn mein Partner Stunden braucht, um zu antworten, denke ich sofort an das Schlimmste (Desinteresse, Wut oder emotionaler Rückzug).",
      fr: "Quand mon partenaire met des heures à répondre, mon esprit imagine immédiatement le pire (perte d'intérêt, colère ou prise de distance).",
      es: "Cuando mi pareja tarda horas en responder, mi mente salta de inmediato a pensamientos catastróficos (desinterés, enojo o distanciamiento).",
    },
    options: [
      {
        score: 0,
        label: {
          en: "Disagree — people are busy; I remain calm and unbothered",
          id: "Tidak setuju — orang punya kesibukan masing-masing; aku tetap tenang dan santai",
          de: "Stimme nicht zu — Menschen sind beschäftigt; ich bleibe gelassen",
          fr: "Pas d'accord — les gens ont leurs occupations; je reste serein",
          es: "En desacuerdo — la gente tiene ocupaciones; mantengo la calma",
        },
      },
      {
        score: 1,
        label: {
          en: "Slightly — mild curiosity, but I continue with my day",
          id: "Sedikit — sekadar penasaran biasa, tapi aku tetap lanjut beraktivitas",
          de: "Etwas — leichte Neugier, aber ich gehe meinem Alltag nach",
          fr: "Un peu — une légère curiosité, mais je poursuis ma journée",
          es: "Un poco — ligera curiosidad, pero sigo con mi día",
        },
      },
      {
        score: 2,
        label: {
          en: "Frequently — noticeable physical anxiety, checking 'last active' status",
          id: "Sering — ada rasa cemas di dada, bolak-balik mengecek status 'last seen' atau online",
          de: "Häufig — spürbare Unruhe, wiederholtes Prüfen des Online-Status",
          fr: "Souvent — anxiété physique perceptible, vérification répétée du statut en ligne",
          es: "A menudo — ansiedad física notable, comprobando la última hora de conexión",
        },
      },
      {
        score: 3,
        label: {
          en: "Always — visceral panic spiral, unable to focus on work until they reply",
          id: "Selalu — panik hebat dan sesak napas, tidak bisa fokus kerja sampai chat dibalas",
          de: "Immer — intensive Panikspirale, völlige Blockade bis zur Antwort",
          fr: "Toujours — spirale de panique aiguë, incapable de me concentrer avant sa réponse",
          es: "Siempre — espiral de pánico total, incapaz de concentrarme hasta que me responda",
        },
      },
    ],
  },
  {
    id: 2,
    subscale: "anxious_pursuit",
    prompt: {
      en: "I find myself craving constant verbal reassurance ('Do you still love me?', 'Are we okay?') to feel secure.",
      id: "Aku sering butuh validasi verbal berulang kali ('Kamu masih sayang aku kan?', 'Kita baik-baik aja kan?') agar merasa aman.",
      de: "Ich brauche ständig verbale Bestätigung ('Liebst du mich noch?', 'Ist alles gut?'), um mich sicher zu fühlen.",
      fr: "J'ai besoin de réassurances verbales constantes pour me sentir en sécurité dans mon couple.",
      es: "Necesito confirmación verbal constante para sentirme seguro y en paz en la relación.",
    },
    options: [
      {
        score: 0,
        label: {
          en: "Rarely or never — our emotional foundation feels solid without prompts",
          id: "Jarang atau tidak pernah — rasa saling percaya kami sudah sangat kokoh",
          de: "Selten oder nie — unser Vertrauen ist auch ohne ständige Bestätigung stabil",
          fr: "Rarement ou jamais — notre lien est solide sans nécessiter de questions",
          es: "Casi nunca — nuestra confianza es sólida sin necesidad de preguntar",
        },
      },
      {
        score: 1,
        label: {
          en: "Occasionally after stressful arguments or long separations",
          id: "Sesekali hanya setelah ada pertengkaran atau lama tidak bertemu",
          de: "Gelegentlich nach Streitigkeiten oder längerer Trennung",
          fr: "Parfois après une dispute ou une absence prolongée",
          es: "Ocasionalmente tras una discusión o tiempo distanciados",
        },
      },
      {
        score: 2,
        label: {
          en: "Often — a lingering doubt whispers that their feelings are fading",
          id: "Sering — ada bisikan ragu bahwa perasaannya padaku mulai berkurang",
          de: "Oft — ein nagender Zweifel flüstert, ihre Gefühle könnten nachlassen",
          fr: "Souvent — un doute insidieux me fait craindre l'érosion de ses sentiments",
          es: "A menudo — una duda persistente me dice que sus sentimientos están disminuyendo",
        },
      },
      {
        score: 3,
        label: {
          en: "Constantly — without explicit daily validation, my nervous system spirals",
          id: "Terus-menerus — tanpa kata-kata mesra setiap hari, sistem sarafku langsung drop",
          de: "Ständig — ohne tägliche Bestätigung gerät mein Nervensystem in Aufruhr",
          fr: "Constamment — sans validation quotidienne explicite, mon anxiété explose",
          es: "Constantemente — sin validación verbal diaria, mi sistema nervioso colapsa",
        },
      },
    ],
  },
  {
    id: 3,
    subscale: "anxious_pursuit",
    prompt: {
      en: "I tend to prioritize my partner's needs, moods, and schedule so heavily that my own identity and hobbies dissolve.",
      id: "Aku sering memprioritaskan mood dan jadwal pasangan hingga melupakan hobi dan identitas pribadiku.",
      de: "Ich passe mich den Launen und Terminen meines Partners so sehr an, dass meine eigene Identität verblasst.",
      fr: "J'adapte tellement mes besoins et mon emploi du temps à mon partenaire que mes propres passions disparaissent.",
      es: "Priorizo tanto las necesidades y horarios de mi pareja que termino perdiendo mis propios pasatiempos e identidad.",
    },
    options: [
      {
        score: 0,
        label: {
          en: "Not at all — I maintain rich personal friendships, hobbies, and autonomous goals",
          id: "Sama sekali tidak — aku punya lingkaran teman, hobi, dan target pribadi yang mandiri",
          de: "Gar nicht — ich pflege eigene Freundschaften, Hobbys und Ziele eigenständig",
          fr: "Pas du tout — je conserve mes amis, mes activités et mon autonomie intacts",
          es: "Para nada — mantengo mis amistades, proyectos y tiempo propio con total independencia",
        },
      },
      {
        score: 1,
        label: {
          en: "Slightly — I make compromises, but preserve essential personal boundaries",
          id: "Sedikit — aku berkompromi secara wajar tanpa mengorbankan batasan utama",
          de: "Etwas — ich mache Kompromisse, wahre aber wesentliche Grenzen",
          fr: "Un peu — je fais des concessions sans renoncer à mes limites clés",
          es: "Un poco — cedo en ocasiones pero mantengo mis límites personales",
        },
      },
      {
        score: 2,
        label: {
          en: "Frequently — I cancel plans with my own friends if my partner suddenly becomes free",
          id: "Sering — aku membatalkan janji dengan teman sendiri jika pasangan mendadak mengajak kumpul",
          de: "Häufig — ich sage Freunden ab, sobald mein Partner überraschend Zeit hat",
          fr: "Souvent — j'annule mes sorties amicales si mon partenaire se libère à l'improviste",
          es: "A menudo — cancelo planes con amigos si mi pareja repentinamente tiene tiempo libre",
        },
      },
      {
        score: 3,
        label: {
          en: "Total enmeshment — my emotional state is 100% hostage to how they treat me today",
          id: "Peleburan total — suasana hatiku 100% disandera oleh bagaimana dia memperlakukanku hari ini",
          de: "Völlige Verschmelzung — meine Stimmung hängt zu 100 % von ihrem Verhalten ab",
          fr: "Fusion complète — mon humeur est totalement otage de son attitude envers moi",
          es: "Fusión total — mi bienestar emocional depende al 100% de la atención que me brinda hoy",
        },
      },
    ],
  },
  {
    id: 4,
    subscale: "anxious_pursuit",
    prompt: {
      en: "Any subtle shift in tone, brief text replies, or lack of emojis feels like an existential relational threat.",
      id: "Perubahan nada bicara, balasan chat yang singkat, atau hilangnya emoji terasa seperti ancaman perpisahan.",
      de: "Jede minimale Tonfalländerung, kurze Nachrichten oder fehlende Emojis wirken wie eine existenzielle Bedrohung.",
      fr: "Le moindre changement de ton ou un message sans émoji est interprété comme un signe de rupture imminent.",
      es: "Cualquier cambio de tono, respuestas cortas o falta de emoticonos me parece una señal de ruptura inminente.",
    },
    options: [
      {
        score: 0,
        label: {
          en: "Never — people communicate differently depending on work stress",
          id: "Tidak pernah — gaya chat orang bisa berbeda-beda tergantung tingkat kesibukan",
          de: "Nie — Kommunikationsstile variieren je nach Alltagsstress ganz normal",
          fr: "Jamais — le style de message varie selon la fatigue ou le travail",
          es: "Nunca — el estilo de comunicación varía según el cansancio del día",
        },
      },
      {
        score: 1,
        label: {
          en: "Rarely — only if accompanied by cold body language in person",
          id: "Jarang — hanya jika disertai sikap tubuh yang benar-benar dingin saat bertemu",
          de: "Selten — nur wenn in Person eine deutliche Distanz spürbar ist",
          fr: "Rarement — seulement si l'attitude physique en direct est froide",
          es: "Rara vez — únicamente si hay una actitud corporal distante en persona",
        },
      },
      {
        score: 2,
        label: {
          en: "Often — I analyze punctuation and timestamp gaps looking for hidden anger",
          id: "Sering — aku menganalisis tanda baca dan jeda menit mencari-cari tanda kekesalan",
          de: "Oft — ich analysiere Satzzeichen und Zeitabstände auf verborgene Wut",
          fr: "Souvent — j'analyse la ponctuation et les délais à la recherche d'une rancœur",
          es: "A menudo — analizo la puntuación y los tiempos buscando señales de enfado",
        },
      },
      {
        score: 3,
        label: {
          en: "Severe hypervigilance — an abbreviated 'ok' can ruin my entire afternoon",
          id: "Kewaspadaan ekstrem — balasan 'ok' tanpa titik bisa merusak mood seharian penuh",
          de: "Extreme Überempfindlichkeit — ein kurzes 'ok' ruiniert meinen ganzen Tag",
          fr: "Hypervigilance aiguë — un simple 'ok' peut anéantir mon après-midi",
          es: "Hipervigilancia extrema — un simple 'ok' puede arruinarme el día entero",
        },
      },
    ],
  },

  // Subscale 2: Avoidant Deactivation (Sue Johnson EFT & Deactivation Strategies)
  {
    id: 5,
    subscale: "avoidant_deactivation",
    prompt: {
      en: "When a partner wants to discuss deep feelings, future commitments, or relationship problems, my instinct is to shut down or physically escape.",
      id: "Saat pasangan mengajak membicarakan perasaan mendalam, komitmen masa depan, atau konflik, instingku adalah membisu atau menghindar.",
      de: "Wenn mein Partner über tiefe Gefühle, Zukunftspläne oder Probleme reden will, ziehe ich mich innerlich oder räumlich zurück.",
      fr: "Quand mon partenaire veut aborder des sujets émotionnels profonds ou l'avenir, j'ai envie de fuir ou de me murer dans le silence.",
      es: "Cuando mi pareja quiere hablar de sentimientos profundos o compromiso futuro, mi primer impulso es encerrarme o huir.",
    },
    options: [
      {
        score: 0,
        label: {
          en: "Disagree — I welcome vulnerability and constructive relationship dialogues",
          id: "Tidak setuju — aku menyambut baik keterbukaan dan diskusi hubungan yang sehat",
          de: "Stimme nicht zu — ich schätze Verwundbarkeit und konstruktiven Dialog",
          fr: "Pas d'accord — j'accueille la vulnérabilité et les échanges constructifs",
          es: "En desacuerdo — recibo bien la vulnerabilidad y las conversaciones sinceras",
        },
      },
      {
        score: 1,
        label: {
          en: "Slightly — uncomfortable at first, but I stay present and talk through it",
          id: "Sedikit — agak canggung di awal, tapi aku tetap bertahan dan berdiskusi",
          de: "Etwas — anfangs ungewohnt, aber ich bleibe im Gespräch",
          fr: "Un peu — inconfortable au début, mais je reste présent pour échanger",
          es: "Un poco — incómodo al inicio, pero me quedo a dialogar",
        },
      },
      {
        score: 2,
        label: {
          en: "Frequently — I feel suffocated, give one-word answers, or change the subject",
          id: "Sering — merasa sesak napas/tercekik, menjawab singkat satu kata, atau mengalihkan topik",
          de: "Häufig — ich fühle mich eingeengt, antworte einsilbig oder wechsle das Thema",
          fr: "Souvent — je me sens étouffé, réponds par monosyllabes ou change de sujet",
          es: "A menudo — siento asfixia emocional, respondo con monosílabos o cambio de tema",
        },
      },
      {
        score: 3,
        label: {
          en: "Always — full stonewalling; I mentally dissociate or walk out of the room",
          id: "Selalu — silent treatment total; aku melamun/mati rasa atau langsung pergi keluar ruangan",
          de: "Immer — totale Blockade; ich dissoziiere emotional oder verlasse den Raum",
          fr: "Toujours — fermeture hermétique; je me dissocie mentalement ou quitte la pièce",
          es: "Siempre — muro de silencio absoluto; me disocio emocionalmente o me voy",
        },
      },
    ],
  },
  {
    id: 6,
    subscale: "avoidant_deactivation",
    prompt: {
      en: "I cherish my independence so fiercely that allowing someone to take care of me feels weak or dangerous.",
      id: "Aku sangat mendewakan kemandirianku hingga membiarkan orang lain merawat atau membantuku terasa seperti kelemahan.",
      de: "Ich verteidige meine Unabhängigkeit so vehement, dass Fürsorge von anderen sich wie Schwäche anfühlt.",
      fr: "Je chéris tellement mon indépendance que laisser quelqu'un prendre soin de moi ressemble à une faiblesse.",
      es: "Valoro tanto mi independencia que dejar que alguien me cuide o me ayude se siente como una debilidad peligrosa.",
    },
    options: [
      {
        score: 0,
        label: {
          en: "Never — interdependence is beautiful; giving and receiving care feels natural",
          id: "Tidak pernah — saling bergantung itu indah; memberi dan menerima bantuan terasa alami",
          de: "Nie — gegenseitige Fürsorge ist heilsam und fühlt sich natürlich an",
          fr: "Jamais — l'interdépendance est saine; donner et recevoir est fluide",
          es: "Nunca — la interdependencia es sana; dar y recibir cuidado es natural",
        },
      },
      {
        score: 1,
        label: {
          en: "Rarely — I prefer solving my own issues, but accept loving help easily",
          id: "Jarang — aku lebih suka mandiri, tapi menerima bantuan dengan senang hati",
          de: "Selten — ich löse Dinge gern selbst, nehme Hilfe aber dankbar an",
          fr: "Rarement — je préfère me débrouiller, mais j'accepte l'aide avec gratitude",
          es: "Rara vez — prefiero resolver mis cosas, pero acepto apoyo con agrado",
        },
      },
      {
        score: 2,
        label: {
          en: "Often — when someone gets too close, I start spotting minor flaws to justify distancing myself",
          id: "Sering — saat seseorang makin dekat, aku mulai mencari-cari kekurangannya agar punya alasan menjauh",
          de: "Oft — wird es zu intim, suche ich nach Makeln, um Distanz zu rechtfertigen",
          fr: "Souvent — quand la proximité grandit, je cherche des défauts pour justifier un recul",
          es: "A menudo — si la intimidad aumenta, empiezo a buscar defectos para justificar distanciarme",
        },
      },
      {
        score: 3,
        label: {
          en: "Chronically — 'Phantom Ex' or 'Lone Wolf' syndrome; I believe relying on anyone will inevitably destroy me",
          id: "Kronis — sindrom serigala penyendiri; yakin bahwa bergantung pada orang lain pasti akan menghancurkanku",
          de: "Chronisch — 'Einsamer Wolf'; ich glaube fest daran, dass Nähe mich zerstören wird",
          fr: "Chronique — réflexe du loup solitaire; je suis convaincu que dépendre d'autrui mène à la ruine",
          es: "Crónico — síndrome del lobo solitario; tengo la certeza de que depender de alguien me destruirá",
        },
      },
    ],
  },
  {
    id: 7,
    subscale: "avoidant_deactivation",
    prompt: {
      en: "When a relationship begins to feel deeply serious, I experience a sudden urge to break free, travel alone, or reclaim 'my space'.",
      id: "Saat hubungan mulai mengarah ke jenjang serius, mendadak muncul dorongan kuat untuk kabur, bepergian sendiri, atau 'butuh ruang'.",
      de: "Sobald eine Beziehung ernst wird, spüre ich den drängenden Wunsch auszubrechen oder allein zu verreisen.",
      fr: "Dès qu'une relation devient très sérieuse, j'éprouve l'envie soudaine de m'échapper ou de réclamer mon espace.",
      es: "En cuanto la relación se vuelve formal y seria, siento el impulso repentino de escapar, viajar solo o pedir espacio.",
    },
    options: [
      {
        score: 0,
        label: {
          en: "Not at all — deepening commitment brings peace, safety, and joy",
          id: "Sama sekali tidak — komitmen yang mendalam membawa rasa damai, aman, dan bahagia",
          de: "Gar nicht — wachsende Verbindlichkeit bringt mir Ruhe und Geborgenheit",
          fr: "Pas du tout — l'engagement profond m'apporte sérénité et joie",
          es: "Para nada — el compromiso profundo me aporta serenidad y alegría",
        },
      },
      {
        score: 1,
        label: {
          en: "Occasional healthy desire for solo recharge time",
          id: "Sesekali hanya butuh waktu 'me-time' yang sehat untuk mengisi energi",
          de: "Gelegentliches gesundes Bedürfnis nach Zeit für mich allein",
          fr: "Un simple besoin ponctuel et sain de me ressourcer en solo",
          es: "Una necesidad puntual y saludable de tiempo para mí",
        },
      },
      {
        score: 2,
        label: {
          en: "Frequently — panic feeling of being trapped like a caged animal",
          id: "Sering — panik merasa terjebak seperti hewan dalam sangkar",
          de: "Häufig — ein beklemmendes Gefühl, wie in einer Falle zu sitzen",
          fr: "Souvent — une sensation d'étouffement comme pris au piège",
          es: "Frecuentemente — sensación opresiva de estar atrapado en una jaula",
        },
      },
      {
        score: 3,
        label: {
          en: "Pattern of sabotage — I end promising relationships right when true intimacy takes root",
          id: "Pola sabotase — aku sering memutuskan hubungan saat hubungan itu mulai tumbuh intim",
          de: "Sabotagemuster — ich beende Beziehungen genau dann, wenn echte Nähe entsteht",
          fr: "Sabotage systématique — je romps au moment précis où l'intimité véritable s'installe",
          es: "Patrón de autosabotaje — termino relaciones justo cuando nace la intimidad auténtica",
        },
      },
    ],
  },
  {
    id: 8,
    subscale: "avoidant_deactivation",
    prompt: {
      en: "I keep emotional secrets or maintain private fallback options so I never feel entirely at my partner's mercy.",
      id: "Aku menyimpan rahasia emosional atau menyiapkan rencana cadangan agar tidak pernah merasa sepenuhnya bergantung pada pasangan.",
      de: "Ich halte emotionale Geheimnisse oder Notfallpläne zurück, um nie ausgeliefert zu sein.",
      fr: "Je garde des jardins secrets ou des plans de secours pour ne jamais être à la merci de l'autre.",
      es: "Guardo secretos emocionales o mantengo salidas de emergencia para no sentirme nunca a merced de mi pareja.",
    },
    options: [
      {
        score: 0,
        label: {
          en: "Never — transparency and emotional surrender are core to my bond",
          id: "Tidak pernah — kejujuran dan keterbukaan total adalah fondasi utamaku",
          de: "Nie — Transparenz und Vertrauen sind der Kern meiner Partnerschaft",
          fr: "Jamais — la transparence totale est au cœur de notre alliance",
          es: "Nunca — la transparencia y la entrega son esenciales para mí",
        },
      },
      {
        score: 1,
        label: {
          en: "Rarely — basic financial prudence, but emotionally completely open",
          id: "Jarang — sekadar kehati-hatian finansial biasa, tapi hati sangat terbuka",
          de: "Selten — vernünftige Vorsorge, aber emotional völlig offen",
          fr: "Rarement — simple prudence financière, mais cœur grand ouvert",
          es: "Rara vez — prudencia lógica, pero apertura emocional completa",
        },
      },
      {
        score: 2,
        label: {
          en: "Often — I hold back my deepest dreams and fears as an insurance policy",
          id: "Sering — aku menahan impian dan ketakutan terdalamku sebagai 'asuransi' diri",
          de: "Oft — ich halte Träume und Ängste zurück als emotionale Versicherung",
          fr: "Souvent — je tais mes peurs et désirs profonds par mesure de sécurité",
          es: "A menudo — me reservo mis anhelos y miedos más hondos como escudo preventivo",
        },
      },
      {
        score: 3,
        label: {
          en: "Always — one foot always out the door; keeping exit strategies perpetually ready",
          id: "Selalu — satu kakiku selalu siap di pintu keluar; selalu punya strategi kabur",
          de: "Immer — ein Fuß steht immer in der Tür; die Fluchtroute ist vorbereitet",
          fr: "Toujours — un pied toujours dehors; une porte de sortie en permanence prête",
          es: "Siempre — un pie siempre fuera de la puerta; listo para salir en cualquier momento",
        },
      },
    ],
  },

  // Subscale 3: Protest Behavior (Passive Aggression, Tests, & Conflict Escalation)
  {
    id: 9,
    subscale: "protest_behavior",
    prompt: {
      en: "When hurt or feeling neglected by my partner, I deliberately ignore their calls, give short answers, or pretend I'm busy to 'make them feel what I felt'.",
      id: "Saat merasa diabaikan, aku sengaja menolak panggilannya, membalas cuek, atau pura-pura sibuk agar 'dia merasakan apa yang kurasakan'.",
      de: "Wenn ich mich gekränkt fühle, ignoriere ich Anrufe oder tue beschäftigt, damit der andere spürt, wie weh das tut.",
      fr: "Blessé ou négligé, j'ignore délibérément ses appels ou feins l'indifférence pour lui faire payer son attitude.",
      es: "Cuando me siento ignorado, no atiendo llamadas o finjo estar ocupado para que 'sienta lo mismo que yo sentí'.",
    },
    options: [
      {
        score: 0,
        label: {
          en: "Never — I express my hurt directly and calmly: 'When you did X, I felt hurt'",
          id: "Tidak pernah — aku menyampaikan lukaku secara lugas: 'Saat kamu melakukan hal itu, aku merasa sedih'",
          de: "Nie — ich spreche Kränkungen direkt und ruhig an",
          fr: "Jamais — j'exprime ma peine clairement et sereinement",
          es: "Nunca — expreso lo que me dolió de forma clara y directa",
        },
      },
      {
        score: 1,
        label: {
          en: "Rarely — a brief 10-minute sulk before initiating a clear conversation",
          id: "Jarang — paling ngambek 10 menit sebelum akhirnya mengajak ngobrol baik-baik",
          de: "Selten — kurzer 10-minütiger Schmollmoment, dann offenes Gespräch",
          fr: "Rarement — un léger retrait de dix minutes avant d'en parler calmement",
          es: "Rara vez — un breve enfado de diez minutos antes de dialogar con calma",
        },
      },
      {
        score: 2,
        label: {
          en: "Often — passive-aggressive silence, slammed doors, or withholding affection until they beg",
          id: "Sering — diam mendiamkan (silent treatment) atau bersikap dingin sampai dia memohon-mohon",
          de: "Oft — passiv-aggressives Schweigen oder Liebesentzug, bis gebettelt wird",
          fr: "Souvent — silence passif-agressif ou retrait d'affection jusqu'à ce qu'il vienne s'excuser",
          es: "A menudo — silencio pasivo-agresivo o retirar el afecto hasta que me busque insistentemente",
        },
      },
      {
        score: 3,
        label: {
          en: "Extreme protest cycle — manipulating jealousy, flirting with others, or threatening breakups to force a reaction",
          id: "Perilaku protes ekstrem — memancing kecemburuan atau mengancam putus demi memaksa reaksinya",
          de: "Extrem — Eifersucht schüren oder mit Trennung drohen, um eine Reaktion zu erzwingen",
          fr: "Comportement de protestation aigu — provoquer la jalousie ou menacer de rompre pour forcer l'attention",
          es: "Conducta de protesta severa — provocar celos o amenazar con romper para exigir una reacción",
        },
      },
    ],
  },
  {
    id: 10,
    subscale: "protest_behavior",
    prompt: {
      en: "I create secret 'tests' for my partner (e.g., waiting to see if they remember small details or notice my mood) without telling them what I need.",
      id: "Aku sering membuat 'tes rahasia' untuk pasangan (misal menunggu apakah dia ingat detail kecil atau peka pada mood-ku) tanpa memberitahunya.",
      de: "Ich stelle meinem Partner geheime Prüfungen (ob er Details bemerkt), ohne meine Wünsche auszusprechen.",
      fr: "Je fais passer des 'tests secrets' à mon partenaire pour voir s'il devine mes attentes sans que j'aie à parler.",
      es: "Pongo 'pruebas secretas' a mi pareja (esperando a ver si nota mi estado) sin decirle claramente lo que necesito.",
    },
    options: [
      {
        score: 0,
        label: {
          en: "Never — testing partners is unfair; clear communication is my rule",
          id: "Tidak pernah — mengetes pasangan itu tidak adil; komunikasi jelas adalah prinsipku",
          de: "Nie — Prüfungen sind unfair; klare Kommunikation ist mein Standard",
          fr: "Jamais — piéger l'autre est injuste; la clarté prime toujours",
          es: "Nunca — poner a prueba es desleal; la comunicación abierta es mi norma",
        },
      },
      {
        score: 1,
        label: {
          en: "Rarely — occasionally hoping for romantic mind-reading, but quickly clarifying",
          id: "Jarang — sesekali berharap dia peka, tapi cepat kusampaikan langsung",
          de: "Selten — manchmal hoffe ich auf Gedankenlesen, kläre es aber schnell auf",
          fr: "Rarement — j'espère parfois de la télépathie, mais je clarifie vite",
          es: "Rara vez — a veces desearía que fuera adivino, pero lo aclaro pronto",
        },
      },
      {
        score: 2,
        label: {
          en: "Frequently — if they fail my unspoken test, I conclude they don't truly care about me",
          id: "Sering — kalau dia gagal menebak, aku menyimpulkan dia sudah tidak peduli padaku",
          de: "Häufig — besteht er den stummen Test nicht, schließe ich auf mangelnde Liebe",
          fr: "Souvent — s'il rate mon test silencieux, j'en déduis qu'il ne m'aime pas vraiment",
          es: "A menudo — si falla mi prueba no dicha, concluyo que ya no le importo",
        },
      },
      {
        score: 3,
        label: {
          en: "Chronic relational trap — constantly setting emotional traps that inevitably lead to fights and disappointment",
          id: "Jebakan kronis — terus-menerus memasang jebakan ekspektasi yang berujung pada pertengkaran",
          de: "Dauerschleife — ständiges Aufstellen emotionaler Fallen, die zu Streit führen",
          fr: "Piège permanent — fabrication constante de tests impossibles qui mènent à la rupture",
          es: "Trampa constante — crear trampas emocionales continuas que terminan en discusiones dolorosas",
        },
      },
    ],
  },
  {
    id: 11,
    subscale: "protest_behavior",
    prompt: {
      en: "In heated arguments, I find myself bringing up grievances and mistakes from months or years ago.",
      id: "Saat bertengkar hebat, aku sering mengungkit-ungkit kesalahan dan luka masa lalu yang sudah berbulan-bulan lewat.",
      de: "Bei hitzigen Auseinandersetzungen hole ich alte Fehler und Kränkungen aus der Vergangenheit hervor.",
      fr: "Lors des disputes intenses, je ressors de vieilles rancœurs et des erreurs passées vieilles de plusieurs mois.",
      es: "En discusiones acaloradas, saco a relucir reproches y errores del pasado de hace meses o años.",
    },
    options: [
      {
        score: 0,
        label: {
          en: "Never — we strictly stay on the topic and present problem at hand",
          id: "Tidak pernah — kami fokus menyelesaikan masalah saat ini tanpa mengungkit masa lalu",
          de: "Nie — wir bleiben strikt beim aktuellen Thema und lösen es sachlich",
          fr: "Jamais — nous restons concentrés uniquement sur le sujet du moment",
          es: "Nunca — nos centramos estrictamente en el asunto presente",
        },
      },
      {
        score: 1,
        label: {
          en: "Rarely — only when a repeating pattern directly mirrors an unhealed wound",
          id: "Jarang — hanya jika pola yang sama persis berulang kembali",
          de: "Selten — nur wenn sich ein Muster exakt identisch wiederholt",
          fr: "Rarement — seulement si le schéma est une répétition exacte",
          es: "Raras veces — solo si el patrón actual es idéntico a una herida previa",
        },
      },
      {
        score: 2,
        label: {
          en: "Often — a dam breaks and every past slight pours out in anger",
          id: "Sering — bendungan emosi jebol dan semua kekecewaan masa lalu tumpah ruah",
          de: "Oft — ein Damm bricht und alle alten Kränkungen brechen hervor",
          fr: "Souvent — la digue cède et tous les griefs accumulés ressortent",
          es: "A menudo — se rompe la presa y salen a la luz agravios del pasado",
        },
      },
      {
        score: 3,
        label: {
          en: "Destructive tallying — keeping a mental ledger of debts to use as emotional ammunition",
          id: "Pencatatan dendam — menyimpan buku catatan dosa pasangan untuk dijadikan peluru perang kata-kata",
          de: "Destruktive Buchführung — Führen einer mentalen Schuldenliste als Munition",
          fr: "Comptabilité destructrice — tenue d'un registre de fautes utilisé comme munition",
          es: "Contabilidad tóxica — guardar un libro mental de ofensas para usarlo como munición en cada pelea",
        },
      },
    ],
  },
  {
    id: 12,
    subscale: "protest_behavior",
    prompt: {
      en: "I feel an irresistible urge to immediately 'fix' conflict or demand resolution, unable to let either person cool off for even an hour.",
      id: "Aku merasa harus segera 'membereskan' konflik detik itu juga, tidak tahan membiarkan jeda cooling down meski cuma satu jam.",
      de: "Ich spüre den Zwang, Konflikte sofort zu klären; ich ertrage keine Stunde Bedenkzeit.",
      fr: "J'éprouve le besoin compulsif de régler la dispute sur-le-champ, incapable d'accorder une heure de répit.",
      es: "Siento la urgencia desesperada de resolver el conflicto al instante, incapaz de tolerar una pausa para calmarse.",
    },
    options: [
      {
        score: 0,
        label: {
          en: "Immune — I respect mutual pauses: 'Let's take 30 minutes to breathe and reconvene'",
          id: "Mampu mengendalikan diri — aku menghormati jeda: 'Mari kita ambil 30 menit untuk tenang lalu bicara lagi'",
          de: "Gelassen — ich respektiere Pausen: 'Lass uns 30 Minuten durchatmen und neu ansetzen'",
          fr: "Serein — je respecte les pauses : 'Prenons 30 minutes pour souffler avant de reprendre'",
          es: "Sereno — respeto las pausas: 'Tomemos 30 minutos para respirar y retomamos'",
        },
      },
      {
        score: 1,
        label: {
          en: "Manageable — slight restlessness, but I give space if asked respectfully",
          id: "Bisa diatur — ada sedikit gelisah, tapi aku memberi ruang jika diminta dengan baik",
          de: "Machbar — leichte Unruhe, aber ich gebe Raum, wenn darum gebeten wird",
          fr: "Gérable — légère impatience, mais j'accorde l'espace demandé",
          es: "Llevadero — algo de inquietud, pero cedo el espacio si se me pide amablemente",
        },
      },
      {
        score: 2,
        label: {
          en: "Difficult — an unfinished argument feels like an emergency; I send 20 text messages in a row",
          id: "Sulit — konflik yang tertunda terasa seperti kondisi darurat; aku mengirim puluhan chat beruntun",
          de: "Schwer — ungelöste Konflikte fühlen sich wie Notfälle an; ich schicke Dutzende Nachrichten",
          fr: "Difficile — le conflit non résolu me semble urgent; j'envoie une rafale de messages",
          es: "Difícil — una discusión abierta se siente como una emergencia; envío decenas de mensajes seguidos",
        },
      },
      {
        score: 3,
        label: {
          en: "Frantic pursuit — banging on doors, calling repeatedly, unable to sleep until they concede and soothe me",
          id: "Pengejaran panik — terus menelepon berkali-kali, tidak bisa tidur sampai pasangan mau memeluk atau menenangkanku",
          de: "Panische Verfolgung — pausenlose Anrufe, Schlaflosigkeit bis zur Versöhnung",
          fr: "Poursuite panique — appels répétés, impossible de dormir sans apaisement immédiat",
          es: "Persecución desesperada — llamadas incesantes, incapaz de conciliar el sueño hasta obtener calma",
        },
      },
    ],
  },
];

export const ATTACHMENT_COMPATIBILITY_ARCHETYPES: Record<
  AttachmentCompatibilityArchetype["level"],
  AttachmentCompatibilityArchetype
> = {
  earned_secure_harmonizer: {
    level: "earned_secure_harmonizer",
    badge: {
      en: "Earned Secure Harmonizer",
      id: "Harmonisator Secure: Dewasa & Berakar",
      de: "Sicherer Beziehungs-Harmonisierer",
      fr: "Harmonisateur Sécurisé",
      es: "Armonizador Seguro y Maduro",
    },
    title: {
      en: "Secure Anchoring & Collaborative Intimacy",
      id: "Jangkar Aman & Intimitas Kolaboratif",
      de: "Sichere Verankerung & Partnerschaftliche Intimität",
      fr: "Ancrage Serein & Intimité Partagée",
      es: "Anclaje Seguro e Intimidad Consciente",
    },
    tagline: {
      en: "You navigate closeness and independence with calm confidence, speaking truth without weaponizing silence or panic.",
      id: "Kamu mengarungi kedekatan dan kemandirian dengan ketenangan batin, berbicara jujur tanpa senjata diam atau panik.",
      de: "Du meisterst Nähe und Freiheit mit Gelassenheit – ohne verletzendes Schweigen oder panisches Klammern.",
      fr: "Vous conjuguez intimité et autonomie avec sérénité, sans recourir au silence vengeur ni à la panique.",
      es: "Navegas entre la cercanía y la autonomía con calma, comunicando tus necesidades sin silencios castigadores ni angustia.",
    },
    description: {
      en: "You possess a mature, emotionally regulated relational baseline. You view vulnerability not as a liability or trap, but as the authentic bridge to mutual connection. When your partner needs space, your nervous system remains steady; when conflict arises, you seek resolution rather than winning. You hold boundaries without hostility.",
      id: "Kamu memiliki kedewasaan emosional yang stabil dalam berhubungan. Kamu memandang keterbukaan bukan sebagai kelemahan atau jebakan, melainkan jembatan menuju koneksi yang tulus. Saat pasangan butuh ruang, kamu tidak panik; saat ada konflik, kamu mencari solusi, bukan kemenangan ego. Kamu tegas menjaga batasan tanpa bermusuhan.",
      de: "Du verfügst über eine reife, emotional regulierte Beziehungsbasis. Nähe empfindest du nicht als Einengung, sondern als bereichernde Verbindung. Braucht dein Partner Raum, gerätst du nicht in Panik; in Konflikten suchst du nach Lösungen statt nach Siegen.",
      fr: "Vous possédez une assise relationnelle mature et régulée. Vous accueillez la vulnérabilité comme un pont vers l'autre plutôt qu'une menace. Quand votre partenaire a besoin d'air, votre système nerveux reste paisible; vous cherchez la réparation et non la victoire.",
      es: "Posees una base relacional madura y regulada. No percibes la vulnerabilidad como una trampa sino como un puente de conexión real. Cuando tu pareja necesita espacio, mantienes la calma; en los conflictos buscas la resolución y no tener la razón.",
    },
    psychologyInsight: {
      en: "Based on Dr. Sue Johnson's Emotionally Focused Therapy (EFT) and Dr. Amir Levine's attachment research, secure individuals possess an integrated ARE (Accessibility, Responsiveness, Engagement) cycle that prevents both defensive deactivation and protest explosions.",
      id: "Berdasarkan Emotionally Focused Therapy (EFT) Dr. Sue Johnson dan riset attachment Dr. Amir Levine, individu secure memiliki siklus ARE (Accessibility, Responsiveness, Engagement) yang matang, mencegah penarikan diri defensif maupun ledakan protes.",
      de: "Gemäß Sue Johnsons emotionsfokussierter Therapie (EFT) verfügen sichere Partner über einen stabilen ARE-Kreislauf (Erreichbarkeit, Feinfühligkeit, Engagement), der Abwehrreaktionen und Klammerverhalten verhindert.",
      fr: "Selon l'EFT de Sue Johnson et les travaux d'Amir Levine, les profils sécures déploient une disponibilité émotionnelle (ARE) qui désamorce à la fois le repli défensif et les protestations agressives.",
      es: "Con base en la Terapia Focalizada en las Emociones (TFE) de Sue Johnson y los estudios de Amir Levine, los perfiles seguros mantienen una accesibilidad emocional que previene tanto la frialdad defensiva como las explosiones de angustia.",
    },
    actionProtocols: {
      en: [
        "Model Explicit Emotional Needs: Continue using 'I-statements' without assuming telepathy ('I felt disconnected today, can we cuddle for 15 minutes?').",
        "Offer Predictable Anchors: When taking personal space, always state your return time to soothe anxious partner triggers.",
        "Hold Boundary Compassion: Maintain your individual hobbies without feeling guilty for taking private recharge time.",
      ],
      id: [
        "Komunikasikan Kebutuhan Secara Gamblang: Tetap gunakan kalimat 'Saya' tanpa menuntut pasangan jadi cenayang ('Aku rindu ngobrol berdua, yuk ngopi 15 menit').",
        "Beri Kepastian Saat Butuh Ruang: Saat butuh waktu sendiri, selalu sebutkan kapan kamu akan kembali ('Aku butuh istirahat 1 jam ya, nanti jam 8 kita makan bareng').",
        "Jaga Kemandirian Sehat: Terus rawat lingkaran pertemanan dan hobimu tanpa rasa bersalah.",
      ],
      de: [
        "Bedürfnisse klar benennen: Weiterhin klare 'Ich-Botschaften' nutzen, statt stummes Gedankenlesen zu erwarten.",
        "Berechenbare Rückkehr ankündigen: Bei Rückzug stets den Zeitpunkt der Rückkehr nennen, um Ängste des Partners zu lindern.",
        "Gesunde Eigenständigkeit wahren: Eigene Interessen ohne schlechtes Gewissen weiterverfolgen.",
      ],
      fr: [
        "Exprimer clairement ses besoins : continuer à formuler des demandes précises sans attendre que l'autre devine.",
        "Rassurer lors des pauses : mentionnez toujours l'heure de votre retour pour apaiser l'anxiété du partenaire.",
        "Préserver son autonomie : cultivez vos passions personnelles sans aucune culpabilité.",
      ],
      es: [
        "Comunicar necesidades con claridad: usar frases en primera persona sin exigir telepatía ('Me siento algo desconectado hoy, ¿charlamos un rato?').",
        "Avisar el regreso al pedir espacio: indicar siempre cuándo retomarás la conversación para no disparar la ansiedad del otro.",
        "Cuidar tu autonomía: mantener tus pasatiempos y amigos sin culpa alguna.",
      ],
    },
    dailyAffirmation: {
      en: "I am worthy of profound love. I can love completely without losing myself, and let another be free without feeling abandoned.",
      id: "Aku layak dicintai dengan tulus. Aku bisa mencintai sepenuhnya tanpa kehilangan diriku, dan membiarkan dia bebas tanpa merasa ditinggalkan.",
      de: "Ich bin tiefer Liebe wert. Ich kann mich ganz hingeben, ohne mich selbst zu verlieren, und Freiheit schenken, ohne Angst vor Verlassenheit.",
      fr: "Je suis digne d'un amour profond. Je peux aimer pleinement sans me perdre, et laisser l'autre libre sans me sentir abandonné.",
      es: "Merezco un amor profundo y sincero. Puedo amar sin perderme a mí mismo, y dar libertad al otro sin sentirme abandonado.",
    },
  },

  cautious_relational_balancer: {
    level: "cautious_relational_balancer",
    badge: {
      en: "Cautious Relational Balancer",
      id: "Penyeimbang Waspada: Rentan Pemicu",
      de: "Vorsichtiger Beziehungs-Balancer",
      fr: "Équilibriste Prudent",
      es: "Equilibrista Relacional Prudente",
    },
    title: {
      en: "Mild Attachment Sensitivities",
      id: "Sensitivitas Attachment Ringan",
      de: "Leichte Bindungssensibilität",
      fr: "Sensibilité Attachement Modérée",
      es: "Sensibilidad de Apego Moderada",
    },
    tagline: {
      en: "You are mostly secure, but high fatigue, conflict, or inconsistent partner cues activate mild anxiety or temporary withdrawal.",
      id: "Secara umum kamu aman, namun saat lelah atau pasangan bersikap tidak konsisten, rasa cemas atau ingin menjauh sesekali menyergap.",
      de: "Im Grunde stabil, doch bei Übermüdung oder unklaren Signalen kippst du in leichte Unruhe oder defensiven Rückzug.",
      fr: "Globalement équilibré, mais la fatigue ou l'ambiguïté de l'autre réveillent chez vous de légers réflexes d'anxiété ou de repli.",
      es: "Generalmente equilibrado, pero el agotamiento o las señales ambiguas de tu pareja activan pequeñas dudas o distanciamiento defensivo.",
    },
    description: {
      en: "You navigate romantic partnerships well under calm conditions, but your relational armor has subtle fault lines. When an argument drags out or communication lags, you alternate between wanting immediate reassurance and feeling an urge to detach and protect yourself. Learning to regulate bodily stress before responding keeps you firmly anchored.",
      id: "Kamu mengelola hubungan dengan baik di situasi normal, namun benteng emosionalmu memiliki celah halus saat ada badai. Saat obrolan macet atau balasan chat tertunda lama, kamu terombang-ambing antara ingin buru-buru menuntut kejelasan atau justru ingin mati rasa dan menutup diri. Belajar menenangkan fisik sebelum merespons akan menjaga stabilitasmu.",
      de: "In ruhigen Zeiten bist du ein fürsorglicher Partner, doch bei emotionaler Turbulenz neigst du abwechselnd zu Kontrollbedürfnis und plötzlichem innerem Rückzug. Körperliche Beruhigung vor dem Sprechen verhindert Eskalationen.",
      fr: "Vous gérez bien vos relations en temps ordinaire, mais le stress relationnel fissure vos certitudes. Vous hésitez alors entre insistance anxieuse et repli protecteur. Vous calmer corporellement avant d'interagir restaure votre équilibre.",
      es: "Te desenvuelves con soltura en la calma, pero las fricciones prolongadas despiertan contradicciones internas: unas veces exiges respuestas rápidas y otras prefieres desconectarte para protegerte. La autorregulación física previa al diálogo es tu mejor aliada.",
    },
    psychologyInsight: {
      en: "Couples therapy research demonstrates that attachment styles are malleable spectrums. Under severe autonomic stress, individuals revert to childhood survival scripts unless conscious somatic pauses interrupt the loop.",
      id: "Riset terapi pasangan menunjukkan bahwa attachment style adalah spektrum dinamis. Di bawah stres saraf akut, seseorang otomatis kembali ke skrip pertahanan masa kecil kecuali ada jeda somatik sadar yang memutus siklusnya.",
      de: "Paarforscher betonen, dass Bindungsmuster flexibel sind. Unter akutem Stress verfallen Menschen in kindliche Schutzmuster, wenn nicht gezielte somatische Pausen intervenieren.",
      fr: "Les recherches démontrent que les styles d'attachement sont fluides. Sous stress intense, les vieux réflexes de défense resurgissent sauf si une pause corporelle consciente s'interpose.",
      es: "Los estudios de pareja revelan que el estilo de apego es un espectro dinámico. Bajo estrés elevado, el cerebro recurre a defensas infantiles si no se introduce una pausa somática deliberada.",
    },
    actionProtocols: {
      en: [
        "The 20-Minute Autonomic Timeout: When a conversation becomes heated, request a 20-minute physiological cooldown before continuing.",
        "Ban Mind-Reading Tests: If you catch yourself testing your partner with silence, verbalize the underlying vulnerable feeling within 60 seconds.",
        "Distinguish Intent from Impact: Remember that your partner's late reply is almost certainly about their busyness, not a referendum on your worth.",
      ],
      id: [
        "Jeda Cooling Down 20 Menit: Saat tensi obrolan memanas, sepakati jeda 20 menit untuk mengatur napas sebelum melanjutkan.",
        "Hentikan Tes Diam-Diam: Jika kamu mendapati dirimu mengetes pasangan dengan membisu, ubah menjadi ungkapan jujur dalam 60 detik.",
        "Bedakan Niat dan Efek: Ingatlah bahwa chat yang telat dibalas hampir pasti karena kesibukan mereka, bukan tanda mereka berhenti mencintaimu.",
      ],
      de: [
        "20-Minuten-Pause vereinbaren: Bei Überhitzung eine 20-minütige körperliche Beruhigungspause einlegen.",
        "Gedankenlese-Tests stoppen: Stumme Prüfungen innerhalb einer Minute durch ein ehrliches Wort ersetzen.",
        "Absicht von Wirkung trennen: Eine späte Nachricht bedeutet meist Arbeitsstress, keine Abwertung deiner Person.",
      ],
      fr: [
        "Trêve somatique de 20 minutes : convenez d'une pause respiratoire de vingt minutes dès que le ton monte.",
        "Bannir les tests silencieux : verbalisez votre ressenti vulnérable dès que vous vous surprenez à bouder.",
        "Distinguer intention et maladresse : un message tardif traduit un emploi du temps chargé, pas un désamour.",
      ],
      es: [
        "Tregua fisiológica de 20 minutos: acuerden una pausa de enfriamiento cuando la conversación se torne tensa.",
        "Eliminar pruebas silenciosas: si te sorprendes probando a tu pareja, expresa lo que sientes antes de que pase un minuto.",
        "Separar intención de efecto: un retraso al contestar suele deberse al trabajo y no a un rechazo hacia ti.",
      ],
    },
    dailyAffirmation: {
      en: "I do not need to panic to be heard. I can ask for connection with grace, and receive space with peace.",
      id: "Aku tidak perlu panik agar didengarkan. Aku bisa meminta kehangatan dengan tenang, dan menerima ruang dengan damai.",
      de: "Ich muss nicht in Panik verfallen, um gehört zu werden. Ich darf ruhig um Nähe bitten und Gelassenheit im Freiraum finden.",
      fr: "Je n'ai pas besoin de paniquer pour être entendu. Je demande de la tendresse avec calme et accueille l'espace avec sérénité.",
      es: "No necesito entrar en pánico para ser escuchado. Puedo pedir cercanía con serenidad y aceptar el espacio con paz.",
    },
  },

  anxious_pursuer_spiral: {
    level: "anxious_pursuer_spiral",
    badge: {
      en: "Anxious Pursuer Spiral",
      id: "Pengejar Cemas: Spiral Panik Kedekatan",
      de: "Ängstlicher Verfolger-Strudel",
      fr: "Poursuivant Anxieux",
      es: "Perseguidor Ansioso en Espiral",
    },
    title: {
      en: "Hyper-Activated Attachment & Abandonment Panic",
      id: "Attachment Hiper-Aktif & Teror Ditinggalkan",
      de: "Hyperaktivierte Bindung & Verlassensangst",
      fr: "Hyperactivation & Terreur de l'Abandon",
      es: "Hiperactivación y Pánico al Abandono",
    },
    tagline: {
      en: "Your nervous system interprets any relational distance as imminent abandonment, triggering frantic pursuit, reassurance seeking, or protest behavior.",
      id: "Sistem sarafmu mengartikan jarak sedikit saja sebagai sinyal ditinggalkan, memicu pencarian validasi panik atau perilaku protes.",
      de: "Dein Nervensystem deutet jede Distanz als drohenden Beziehungsabbruch und treibt dich in panisches Klammern oder Vorwürfe.",
      fr: "Votre système nerveux perçoit le moindre éloignement comme un abandon mortel, déclenchant des poursuites oppressantes et des reproches.",
      es: "Tu sistema nervioso interpreta cualquier distancia como un abandono inminente, empujándote a buscar validación desesperada o reclamos.",
    },
    description: {
      en: "You have a hyper-activated attachment system. When your partner is quiet, slow to respond, or requests alone time, your amygdala floods your body with adrenaline. You feel an agonizing, visceral urgency to resolve the distance immediately—often leading to multiple texts, interrogation questioning, emotional tests, or sleepless panic spirals.",
      id: "Sistem attachment-mu berada dalam status siaga tinggi (hiperaktif). Saat pasangan sedang diam, lambat membalas, atau butuh waktu sendiri, amigdalamu membanjiri tubuh dengan adrenalin. Kamu merasakan desakan fisik yang menyiksa untuk segera menutup jarak itu—sering kali berujung pada spam chat, pertanyaan menginterogasi, atau sulit tidur karena overthinking.",
      de: "Dein Bindungssystem ist in dauerhafter Alarmbereitschaft. Reagiert der Partner verzögert oder braucht Zeit für sich, schlägt deine Amygdala an. Der unerträgliche Druck, Nähe sofort wiederherzustellen, mündet in Textfluten, Beziehungs-Verhören oder schlaflosen Grübelattacken.",
      fr: "Votre système d'attachement est en hypervigilance continue. Tout silence de l'autre est vécu comme une urgence vitale. Ce besoin viscéral de rétablir le contact entraîne des messages répétés, des interrogatoires anxieux et des insomnies douloureuses.",
      es: "Tu sistema de apego vive en alerta máxima. Cualquier silencio o tardanza de tu pareja es percibido por tu amígdala como un peligro inminente. La necesidad apremiante de restablecer el contacto te lleva a enviar mensajes continuos, interrogar o pasar noches en vela.",
    },
    psychologyInsight: {
      en: "Attachment literature (Bowlby, Ainsworth, Mikulincer & Shaver) identifies this as 'hyper-activating strategies': the subconscious belief that only by escalating distress and relentlessly pursuing can one force the caregiver or partner to remain engaged.",
      id: "Literatur attachment (Bowlby, Ainsworth, Mikulincer & Shaver) menyebut ini sebagai 'strategi hiper-aktivasi': keyakinan bawah sadar bahwa hanya dengan memperbesar kepanikan dan mengejar tanpa henti, pasangan akan terpaksa tinggal dan peduli.",
      de: "Die Bindungsforschung bezeichnet dies als 'Hyperaktivierungsstrategie': den unbewussten Glauben, Bindungspersonen nur durch permanente emotionale Eskalation und Drängen halten zu können.",
      fr: "La théorie de l'attachement nomme cela une 'stratégie d'hyperactivation' : la croyance inconsciente que seule l'insistance désespérée garantit la présence de l'autre.",
      es: "La psicología del apego define esto como 'estrategia de hiperactivación': la convicción inconsciente de que solo intensificando la angustia y persiguiendo se logra retener a la pareja.",
    },
    actionProtocols: {
      en: [
        "Institute the 15-Minute Device Lock: When text panic hits, lock your phone away and perform 3 minutes of Box Breathing before drafting any response.",
        "Somatic Self-Soothing: Place one hand on your heart and one on your belly; say aloud: 'I am safe in my own body right now, even in silence.'",
        "Replace Demands with Soft Vulnerability: Shift from 'Why do you always ignore me?' to 'I am feeling a little anxious right now and would love a hug when you're free.'",
      ],
      id: [
        "Terapkan Kunci HP 15 Menit: Saat panik chat melanda, kunci ponsel di laci dan lakukan 3 menit Box Breathing sebelum mengetik pesan apapun.",
        "Menenangkan Diri Secara Somatik: Letakkan satu tangan di dada dan satu di perut; katakan: 'Saat ini aku aman di tubuhku sendiri, meski sedang hening.'",
        "Ganti Tuntutan dengan Kelembutan: Ubah 'Kenapa sih kamu cuek banget?' menjadi 'Aku lagi agak cemas hari ini, kalau kamu sudah senggang, peluk aku ya.'",
      ],
      de: [
        "15-Minuten-Handysperre: Bei Textpanik das Smartphone wegsperren und 3 Minuten Box-Breathing machen, bevor getippt wird.",
        "Somatische Selbstberuhigung: Eine Hand aufs Herz, eine auf den Bauch: 'Ich bin hier und jetzt in Sicherheit, auch in der Stille.'",
        "Vorwürfe in weiche Wünsche verwandeln: Statt 'Nie hast du Zeit!' sagen: 'Ich fühle mich gerade etwas verunsichert und würde mich über eine Umarmung freuen.'",
      ],
      fr: [
        "Règle des 15 minutes sans écran : en cas de panique face au silence, posez le téléphone et faites 3 minutes de cohérence cardiaque avant d'écrire.",
        "Auto-apaisement corporel : une main sur le cœur, une sur le ventre : 'Je suis en sécurité dans mon corps, même dans le silence.'",
        "Exprimer la vulnérabilité sans attaquer : troquez les reproches contre : 'Je me sens un peu vulnérable aujourd'hui, j'aimerais qu'on prenne un moment tout à l'heure.'",
      ],
      es: [
        "Bloqueo voluntario de 15 minutos: al sentir angustia por una respuesta tardía, guarda el móvil e inhala profundamente durante 3 minutos antes de escribir.",
        "Autorregulación somática: coloca una mano en el pecho y otra en el abdomen: 'Estoy a salvo en mi propio cuerpo, aun en medio del silencio.'",
        "Cambiar el reclamo por ternura: sustituye el reproche por: 'Me siento algo vulnerable hoy, me encantaría un abrazo cuando te desocupes.'",
      ],
    },
    dailyAffirmation: {
      en: "My partner's silence is not my abandonment. I can hold my own center while another person breathes.",
      id: "Keheningan pasanganku bukanlah tanda perpisahan. Aku mampu berdiri tegak di pusat diriku saat dia butuh ruang bernapas.",
      de: "Die Stille meines Partners bedeutet nicht mein Verlassenwerden. Ich bleibe in meiner Mitte verankert.",
      fr: "Le silence de l'autre n'est pas mon abandon. Je demeure solide en mon centre tandis que l'autre respire.",
      es: "El silencio de mi pareja no es mi abandono. Puedo permanecer en mi propio centro mientras la otra persona respira.",
    },
  },

  anxious_avoidant_rollercoaster: {
    level: "anxious_avoidant_rollercoaster",
    badge: {
      en: "Anxious-Avoidant Trap",
      id: "Perangkap Cemas-Menghindar: Rollercoaster",
      de: "Ängstlich-Vermeidende Achterbahn",
      fr: "Piège Anxieux-Évitant",
      es: "Trampa Ansioso-Evitativa",
    },
    title: {
      en: "Disorganized Attachment & The Push-Pull Polarization Trap",
      id: "Attachment Disorganized & Jebakan Tarik-Ulur",
      de: "Desorganisierte Bindung & Push-Pull-Falle",
      fr: "Attachement Désorganisé & Cycle Rapprochement-Fuite",
      es: "Apego Desorganizado y Dinámica de Empuje y Retirada",
    },
    tagline: {
      en: "You crave deep intimacy yet feel terrified when it arrives—trapping you in an agonizing push-pull cycle where distance sparks panic and closeness sparks suffocation.",
      id: "Kamu mendambakan kehangatan mendalam namun panik saat itu datang—terjebak siklus tarik-ulur di mana jarak memicu panik dan kedekatan memicu rasa tercekik.",
      de: "Du sehnst dich nach tiefer Nähe, doch sobald sie eintritt, überrollt dich Fluchtangst – ein schmerzhafter Teufelskreis aus Klammern und Wegstoßen.",
      fr: "Vous rêvez d'une intimité fusionnelle mais paniquez dès qu'elle se concrétise, oscillant sans cesse entre détresse d'être seul et terreur d'être envahi.",
      es: "Anhelas una conexión íntima pero te asusta cuando ocurre, atrapándote en un doloroso vaivén: la distancia te angustia y la cercanía te asfixia.",
    },
    description: {
      en: "You are caught in the classic disorganized (fearful-avoidant) attachment dilemma. When someone pulls away, your anxious side explodes into frantic pursuit; but the moment they turn around and offer real vulnerability or commitment, your avoidant alarm fires, screaming that you are about to lose your autonomy. This leads to exhausting cycles of breakups, reconciliations, and chronic relational turbulence.",
      id: "Kamu terjebak dalam dilema klasik disorganized (fearful-avoidant) attachment. Saat pasangan menjauh, sisi cemasmu panik mengejar; namun begitu mereka berbalik memberikan komitmen dan kehangatan tulus, alarm penghindarmu menjerit ketakutan kehilangan kebebasan. Ini berujung pada siklus putus-nyambung yang sangat menguras batin.",
      de: "Du steckst im klassischen furchtsam-vermeidenden Bindungskonflikt. Zieht sich der Partner zurück, willst du ihn mit aller Macht halten; kommt er dir nah, schnürt es dir die Kehle zu. Dies führt zu zermürbenden On-Off-Beziehungen und emotionaler Erschöpfung.",
      fr: "Vous êtes pris au piège de l'attachement craintif-évitant. Quand l'autre s'éloigne, vous le pourchassez; dès qu'il s'engage, vous étouffez et sabotez le lien. Cette valse épuisante engendre ruptures à répétition et chaos intérieur.",
      es: "Vives en el dilema del apego desorganizado (temeroso-evitativo). Cuando tu pareja se distancia, tu lado ansioso corre tras ella; pero en cuanto se entrega y busca compromiso, tu lado evitativo se alarma y teme perder el control. Esto provoca dolorosos ciclos de rupturas y reconciliaciones.",
    },
    psychologyInsight: {
      en: "In clinical trauma psychology (van der Kolk, Main & Solomon), disorganized attachment originates from biological biological paradox: the relational source of safety was simultaneously the perceived source of threat, conditioning the amygdala to equate intimacy with entrapment.",
      id: "Dalam psikologi trauma klinis (van der Kolk, Main & Solomon), attachment disorganized berakar dari paradoks biologis masa kecil: sosok yang seharusnya menjadi sumber rasa aman sekaligus menjadi sumber ketakutan, mengondisikan otak untuk menganggap kedekatan sama dengan bahaya.",
      de: "In der Traumapsychologie beruht dies auf einem Bindungsparadoxon der Kindheit: Die Quelle des Trostes war zugleich Quelle von Bedrohung, weshalb das Gehirn Nähe unbewusst mit Gefahr verknüpft.",
      fr: "En psychologie du trauma, l'attachement désorganisé découle d'un paradoxe précoce où la figure d'attachement était à la fois refuge et source de peur, associant intimité et danger.",
      es: "En la psicología del trauma, el apego desorganizado surge de una paradoja temprana: la figura que debía brindar protección era también fuente de temor, enseñando al cerebro a asociar intimidad con peligro.",
    },
    actionProtocols: {
      en: [
        "Map Your Polarization Triggers: Identify whether you are currently in your 'Anxious Chase' or 'Avoidant Eject' phase before making any relationship decisions.",
        "Enforce a 72-Hour Truce on Breakup Threats: Never threaten to end the relationship during emotional overwhelm; sleep on it for 3 full days.",
        "Somatic Pendulation Practice: Slowly toggle your attention between bodily sensations of tension and areas of neutral calm to expand your window of tolerance.",
      ],
      id: [
        "Petakan Fase Emosimu: Sadari apakah kamu sedang berada di fase 'Mengejar Panik' atau fase 'Menjauh Dingin' sebelum mengambil keputusan apapun.",
        "Gencatan Senjata 72 Jam Soal Putus: Jangan pernah mengancam putus saat emosi sedang meluap; tunda keputusan perpisahan minimal 3 hari.",
        "Latihan Toleransi Kedekatan: Rasakan kehangatan hubungan secara bertahap dalam dosis kecil tanpa langsung kabur atau menuntut segalanya.",
      ],
      de: [
        "Trigger-Phasen kartieren: Erkenne bewusst, ob du dich gerade im 'Verfolgungs-' oder 'Fluchtmodus' befindest, bevor du handelst.",
        "72-Stunden-Moratorium bei Trennungsgedanken: Bei Überforderung niemals spontan Schluss machen; mindestens 3 Tage Bedenkzeit erzwingen.",
        "Somatische Toleranz schulen: Lerne durch körperliche Erdung, Nähe in kleinen, sicheren Dosen zuzulassen, ohne zu flüchten.",
      ],
      fr: [
        "Cartographier vos phases : identifiez si vous êtes en mode 'Poursuite' ou en mode 'Fuite' avant de réagir.",
        "Moratoire de 72 heures sur les ruptures : interdisez-vous de menacer de rompre sur le coup de l'émotion; attendez 3 jours de calme.",
        "Apprivoiser la proximité par paliers : vivez des moments tendres courts et réguliers pour réhabituer votre système nerveux à la sécurité.",
      ],
      es: [
        "Identificar tu fase activa: reconoce si estás actuando desde la 'persecución ansiosa' o desde la 'retirada evitativa' antes de hablar.",
        "Moratoria de 72 horas para rupturas: prohíbete amenazar con terminar en pleno desborde; espera 3 días completos antes de decidir.",
        "Dosificar la intimidad de forma gradual: acostumbra a tu sistema nervioso a compartir momentos cercanos breves y seguros sin salir corriendo.",
      ],
    },
    dailyAffirmation: {
      en: "Closeness is safe. Freedom is safe. I can belong to someone without losing my soul.",
      id: "Kedekatan itu aman. Kebebasan itu aman. Aku bisa mencintai seseorang tanpa kehilangan jiwaku.",
      de: "Nähe ist sicher. Freiheit ist sicher. Ich kann mich binden, ohne mich selbst aufzugeben.",
      fr: "L'intimité est sûre. La liberté est sûre. Je peux aimer quelqu'un sans renoncer à mon être.",
      es: "La cercanía es segura. La libertad es segura. Puedo unirme a alguien sin perder mi propia alma.",
    },
  },
};

export function calculateAttachmentCompatibilityScore(
  answers: Record<number, number>
): AttachmentCompatibilityScoreResult {
  let totalScore = 0;
  let pursuitScore = 0;
  let deactivationScore = 0;
  let protestScore = 0;

  ATTACHMENT_COMPATIBILITY_QUESTIONS.forEach((q) => {
    const score = answers[q.id] ?? 0;
    totalScore += score;

    if (q.subscale === "anxious_pursuit") pursuitScore += score;
    if (q.subscale === "avoidant_deactivation") deactivationScore += score;
    if (q.subscale === "protest_behavior") protestScore += score;
  });

  const maxTotal = ATTACHMENT_COMPATIBILITY_QUESTIONS.length * 3; // 36
  const maxSubscale = 4 * 3; // 12
  const percentage = Math.round((totalScore / maxTotal) * 100);

  let level: AttachmentCompatibilityArchetype["level"];
  if (percentage <= 24) {
    level = "earned_secure_harmonizer";
  } else if (percentage <= 49) {
    level = "cautious_relational_balancer";
  } else if (pursuitScore >= 7 && deactivationScore >= 7) {
    level = "anxious_avoidant_rollercoaster";
  } else if (pursuitScore > deactivationScore) {
    level = "anxious_pursuer_spiral";
  } else {
    level = "cautious_relational_balancer";
  }

  return {
    totalScore,
    percentage,
    level,
    profile: ATTACHMENT_COMPATIBILITY_ARCHETYPES[level],
    subscales: {
      anxious_pursuit: {
        score: pursuitScore,
        percentage: Math.round((pursuitScore / maxSubscale) * 100),
      },
      avoidant_deactivation: {
        score: deactivationScore,
        percentage: Math.round((deactivationScore / maxSubscale) * 100),
      },
      protest_behavior: {
        score: protestScore,
        percentage: Math.round((protestScore / maxSubscale) * 100),
      },
    },
  };
}
