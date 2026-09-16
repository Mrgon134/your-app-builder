export type AgilityLang = "en" | "id" | "de" | "fr" | "es";
export type AgilityDimension = "bottling" | "brooding" | "values";
export type AgilityLevel = "fragile_fused" | "guarded_bottler" | "spiraling_brooder" | "agile_aligned";

export interface AgilityQuestion {
  id: number;
  text: Record<AgilityLang, string>;
  dimension: AgilityDimension;
}

export interface AgilityProfile {
  level: AgilityLevel;
  badge: Record<AgilityLang, string>;
  title: Record<AgilityLang, string>;
  tagline: Record<AgilityLang, string>;
  description: Record<AgilityLang, string>;
  protocolDrills: Record<AgilityLang, string[]>;
  color: string;
}

export const AGILITY_QUESTIONS: AgilityQuestion[] = [
  // --- BOTTLING (Emotional Suppression & Avoidance) ---
  {
    id: 1,
    dimension: "bottling",
    text: {
      en: "I push away unpleasant emotions (sadness, anger, fear) and pretend everything is totally fine.",
      id: "Saya menekan atau membuang emosi tidak nyaman (sedih, marah, takut) dan berpura-pura semuanya baik-baik saja.",
      de: "Ich dränge unangenehme Emotionen (Trauer, Wut, Angst) beiseite und tue so, als sei alles in bester Ordnung.",
      fr: "Je refoule mes émotions pénibles (tristesse, colère, peur) et fais semblant que tout va pour le mieux.",
      es: "Reprimo las emociones desagradables (tristeza, rabia, miedo) y finjo que todo marcha a la perfección.",
    },
  },
  {
    id: 2,
    dimension: "bottling",
    text: {
      en: "I force myself to think positively or smile even when I feel overwhelmed and broken inside.",
      id: "Saya memaksakan diri untuk berpikir positif atau tersenyum saat hati sebenarnya hancur dan kewalahan.",
      de: "Ich zwinge mich zu toxischer Positivität, selbst wenn ich mich innerlich völlig erschöpft fühle.",
      fr: "Je me force à positiver ou à sourire alors que je suis intérieurement submergé et vidé.",
      es: "Me obligo a pensar en positivo o sonreír aunque por dentro me sienta completamente desbordado.",
    },
  },
  {
    id: 3,
    dimension: "bottling",
    text: {
      en: "I swallow my honest frustration or boundaries to avoid conflict or protect others' comfort.",
      id: "Saya menelan rasa frustrasi atau batasan diri demi menghindari konflik atau menjaga perasaan orang lain.",
      de: "Ich schlucke meinen echten Frust herunter, um Konflikte zu vermeiden und andere nicht zu verunsichern.",
      fr: "J'avale ma frustration et mes limites pour éviter les conflits ou ménager les autres.",
      es: "Me trago mi frustración genuina y mis límites para evitar roces o no incomodar a los demás.",
    },
  },
  {
    id: 4,
    dimension: "bottling",
    text: {
      en: "I distract myself with endless work, screen scrolling, or chores rather than feeling my grief or stress.",
      id: "Saya menyibukkan diri dengan kerja berlebihan, medsos, atau kesibukan agar tidak merasakan duka atau stres.",
      de: "Ich lenke mich mit pausenloser Arbeit oder endlosem Scrollen ab, um meinen Schmerz nicht spüren zu müssen.",
      fr: "Je m'étourdis dans le travail effréné ou le scroll infini pour ne pas ressentir ma peine ou mon stress.",
      es: "Me distraigo con trabajo compulsivo o pantallas para no tener que sentir el dolor o el estrés.",
    },
  },

  // --- BROODING (Rumination & Cognitive Fusion) ---
  {
    id: 5,
    dimension: "brooding",
    text: {
      en: "When something goes wrong, I replay the painful event obsessively in my mind for hours or days.",
      id: "Saat ada yang keliru, saya memutar ulang kejadian menyakitkan itu berulang kali di kepala selama berjam-jam atau berhari-hari.",
      de: "Wenn etwas schiefgeht, spiele ich die schmerzhafte Situation tagelang in einer Endlosschleife im Kopf durch.",
      fr: "Quand un événement tourne mal, je rejoue la scène en boucle dans ma tête pendant des heures ou des jours.",
      es: "Cuando algo sale mal, revivo la escena obsesivamente en mi mente durante horas o días.",
    },
  },
  {
    id: 6,
    dimension: "brooding",
    text: {
      en: "I get hooked by self-critical thoughts ('I always ruin things', 'I am inadequate') and believe they define me.",
      id: "Saya tersangkut oleh bisikan kritik diri ('Aku selalu merusak segalanya', 'Aku tidak kompeten') dan menganggapnya fakta mutlak.",
      de: "Ich verfange mich in harten Selbstanklagen ('Ich vermassle alles') und halte sie für die absolute Wahrheit.",
      fr: "Je me laisse happer par des pensées d'autocritique féroces en croyant qu'elles définissent ma valeur réelle.",
      es: "Me engancho a juicios autocríticos demoledores y creo ciegamente que definen mi identidad.",
    },
  },
  {
    id: 7,
    dimension: "brooding",
    text: {
      en: "I spend excessive mental energy analyzing why I feel bad, getting trapped in analytical paralysis.",
      id: "Saya menghabiskan energi mental untuk menganalisis mengapa saya merasa buruk, hingga terjebak kelumpuhan berpikir.",
      de: "Ich analysiere endlos, warum ich mich schlecht fühle, bis ich in rationaler Schockstarre verharre.",
      fr: "Je dépense une énergie folle à disséquer le pourquoi de mon malaise, bloqué dans une paralysie mentale.",
      es: "Gasto una energía inmensa analizando por qué me siento mal, quedando atrapado en parálisis por análisis.",
    },
  },
  {
    id: 8,
    dimension: "brooding",
    text: {
      en: "Difficult emotions paralyze my decision-making and prevent me from taking necessary risks.",
      id: "Emosi yang sulit melumpuhkan keberanian saya mengambil keputusan dan mencoba tantangan baru.",
      de: "Schwere Emotionen blockieren meine Entschlüsse und hindern mich daran, nötige Schritte zu wagen.",
      fr: "Les émotions difficiles paralysent mes choix et m'empêchent d'oser les changements nécessaires.",
      es: "Las emociones dolorosas paralizan mis decisiones y me frenan ante cualquier riesgo constructivo.",
    },
  },

  // --- VALUES-ALIGNED ACTION (Agile Mindset & Defusion) ---
  {
    id: 9,
    dimension: "values",
    text: {
      en: "I can observe my difficult feelings with gentle curiosity without letting them dictate my actions.",
      id: "Saya mampu mengamati emosi sulit dengan rasa ingin tahu yang lembut tanpa membiarkannya menyetir tindakan saya.",
      de: "Ich kann schwere Gefühle mit achtsamer Neugier wahrnehmen, ohne dass sie mein Verhalten diktieren.",
      fr: "Je peux observer mes émotions désagréables avec bienveillance sans les laisser dicter ma conduite.",
      es: "Puedo observar mis emociones difíciles con curiosidad compasiva sin que determinen mis actos.",
    },
  },
  {
    id: 10,
    dimension: "values",
    text: {
      en: "I take bold, meaningful steps toward what truly matters to me, even when anxiety or self-doubt is present.",
      id: "Saya berani melangkah nyata menuju hal yang bernilai bagi hidup saya, meski rasa cemas atau ragu tetap membayangi.",
      de: "Ich handle beherzt nach meinen wahren Werten, selbst wenn Zweifel und Unbehagen im Gepäck sind.",
      fr: "J'agis courageusement selon mes valeurs profondes, même lorsque le doute ou l'anxiété m'accompagnent.",
      es: "Doy pasos decididos hacia lo que verdaderamente me importa, aun cuando la incertidumbre esté presente.",
    },
  },
  {
    id: 11,
    dimension: "values",
    text: {
      en: "I recognize that emotions are valuable signposts pointing to my deeper desires, not emergencies to fix.",
      id: "Saya menyadari bahwa emosi adalah penunjuk arah berharga tentang apa yang saya pedulikan, bukan bencana darurat.",
      de: "Ich verstehe Emotionen als wertvolle Wegweiser zu meinen Prioritäten, nicht als akute Krisen.",
      fr: "Je considère mes émotions comme des messagères éclairant mes besoins, et non comme des anomalies à éteindre.",
      es: "Comprendo que mis emociones son brújulas que señalan lo que aprecio, no urgencias que silenciar.",
    },
  },
  {
    id: 12,
    dimension: "values",
    text: {
      en: "When setbacks occur, I adapt my approach with self-compassion rather than harsh punishment.",
      id: "Saat mengalami kegagalan, saya menyesuaikan strategi dengan welas asih pada diri sendiri, bukan hukuman batin.",
      de: "Bei Rückschlägen passe ich meinen Kurs mit Selbstmitgefühl an, statt mich schonungslos zu verurteilen.",
      fr: "Face aux revers, j'adapte ma trajectoire avec auto-compassion plutôt que de m'accabler de reproches.",
      es: "Ante los contratiempos, reajusto mi rumbo con autocompasión en vez de castigarme con dureza.",
    },
  },
];

export const AGILITY_OPTIONS = [
  {
    value: 0,
    label: {
      en: "Rarely / Never",
      id: "Jarang / Tidak Pernah",
      de: "Selten / Nie",
      fr: "Rarement / Jamais",
      es: "Rara vez / Nunca",
    },
  },
  {
    value: 1,
    label: {
      en: "Occasionally",
      id: "Kadang-kadang",
      de: "Gelegentlich",
      fr: "Occasionnellement",
      es: "De vez en cuando",
    },
  },
  {
    value: 2,
    label: {
      en: "Often",
      id: "Sering",
      de: "Häufig",
      fr: "Souvent",
      es: "A menudo",
    },
  },
  {
    value: 3,
    label: {
      en: "Almost Always",
      id: "Hampir Selalu",
      de: "Fast immer",
      fr: "Presque toujours",
      es: "Casi siempre",
    },
  },
];

export const AGILITY_PROFILES: Record<AgilityLevel, AgilityProfile> = {
  fragile_fused: {
    level: "fragile_fused",
    badge: {
      en: "Experiential Avoidance & Fusion Spiral",
      id: "Kelekatan Emosional & Penghindaran Tinggi",
      de: "Erlebnismeidung & Emotionale Verschmelzung",
      fr: "Évitement Expérientiel & Fusion Émotionnelle",
      es: "Fusión Cognitiva & Evitación Experiencial",
    },
    title: {
      en: "The Fused Storm",
      id: "Badai Kelekatan Batin",
      de: "Der Fusionssturm",
      fr: "La Tempête de Fusion",
      es: "La Tormenta de Fusión",
    },
    tagline: {
      en: "Torn between desperate emotional suppression and exhausting rumination spirals.",
      id: "Terombang-ambing antara menahan emosi rapat-rapat dan siklus overthinking yang menguras energi.",
      de: "Hin- und hergerissen zwischen rigider Unterdrückung und zermürbenden Grübelschleifen.",
      fr: "Déchiré entre l'étouffement des ressentis et des spirales d'analyse épuisantes.",
      es: "Dividido entre reprimir lo que duele y perderte en bucles mentales desgastantes.",
    },
    description: {
      en: "Your psychological energy is currently trapped in a double bind: trying fiercely not to feel difficult emotions (bottling), while simultaneously getting hooked and dragged down whenever they inevitably erupt (brooding). You often treat thoughts as absolute facts rather than passing neurological weather.",
      id: "Energi psikologis Anda sedang tersedot dalam dua perangkap: berusaha sekuat tenaga menolak rasa sakit (bottling), namun langsung tersapu pusaran saat emosi itu meluap (brooding). Pikiran kritis Anda kerap dianggap sebagai kebenaran mutlak, bukan sekadar cuaca mental sementara.",
      de: "Ihre mentale Energie ist in einer Doppelkrise gefangen: Sie versuchen Gefühle mit aller Kraft wegzudrücken, werden jedoch sofort von Grübelspiralen überwältigt, sobald der Damm bricht. Gedanken werden als Tatsachen statt als flüchtige mentale Ereignisse erlebt.",
      fr: "Votre énergie psychique s'épuise dans un double piège : tenter de museler la douleur, tout en étant submergé par des ruminations obsessionnelles dès qu'elle réapparaît. Vos pensées sont perçues comme des vérités absolues plutôt que comme une météo intérieure passagère.",
      es: "Tu energía mental se agota en una doble trampa: esforzarte en silenciar tus emociones, pero quedar atrapado en espirales de rumiación en cuanto emergen. Percibes tus pensamientos como hechos irrefutables en lugar de estados pasajeros.",
    },
    protocolDrills: {
      en: [
        "Un-hooking Practice: When an agonizing thought strikes ('I can't handle this'), prefix it with: 'I notice I am having the thought that I can't handle this.'",
        "Emotional Granularity: Replace vague words like 'I'm bad' with precise labels: 'I feel humiliated, unheard, and physically depleted.'",
        "Compassionate Expansion: Breathe gently into the physical tightness in your chest rather than trying to push it down.",
      ],
      id: [
        "Latihan Pelepasan (Defusion): Saat pikiran kejam muncul ('Aku gagal total'), ubah menjadi: 'Saya menyadari bahwa pikiran saya sedang mengatakan bahwa saya gagal.'",
        "Granularitas Emosi: Hindari kata 'stres' atau 'hancur'. Ganti dengan istilah presisi: 'Saya merasa tidak didengar, kecewa, dan lelah secara fisik.'",
        "Ruang Welas Asih: Bernapaslah perlahan ke bagian tubuh yang tegang (dada atau rahang) tanpa memaksanya hilang seketika.",
      ],
      de: [
        "Defusions-Übung: Formulieren Sie harte Urteile um zu: 'Ich bemerke gerade den Gedanken, dass ich überfordert bin.'",
        "Emotionale Granularität: Nennen Sie das Gefühl beim präzisen Namen (z. B. 'tiefe Enttäuschung' statt 'Stress').",
        "Körperliche Akzeptanz: Atmen Sie sanft in das Engegefühl im Brustkorb, ohne es gewaltsam vertreiben zu wollen.",
      ],
      fr: [
        "Défusion Cognitive : Reformulez les jugements sévères en disant : 'Je remarque que j'ai la pensée que je n'y arriverai pas.'",
        "Granularité Émotionnelle : Nommez l'émotion avec exactitude ('désillusion' ou 'sentiment d'impuissance' au lieu d'un vague 'stress').",
        "Espace d'Accueil : Respirez calmement au cœur de la tension physique sans chercher à la faire disparaître immédiatement.",
      ],
      es: [
        "Ejercicio de Defusión: Transforma el juicio destructivo en: 'Noto que estoy teniendo el pensamiento de que todo saldrá mal.'",
        "Granularidad Emocional: Pon nombre exacto al dolor (ej. 'desilusión profunda' en vez de un genérico 'estoy mal').",
        "Espacio de Apertura: Respira con suavidad hacia la opresión en tu pecho sin exigirte eliminarla de golpe.",
      ],
    },
    color: "#e11d48",
  },
  guarded_bottler: {
    level: "guarded_bottler",
    badge: {
      en: "Emotional Bottler / Stoic Armor",
      id: "Penahan Emosi / Zirah Ketabahan Semu",
      de: "Gefühlsunterdrückung / Stoiker-Panzer",
      fr: "Refoulement Protecteur / Armure Stoïque",
      es: "Embotellamiento Emocional / Coraza Estoica",
    },
    title: {
      en: "The Guarded Fortress",
      id: "Benteng Kedap Rasa",
      de: "Die Festung des Schweigens",
      fr: "La Forteresse Impénétrable",
      es: "La Fortaleza Blindada",
    },
    tagline: {
      en: "Locking away tears, anger, and fatigue to maintain flawless outward control.",
      id: "Mengunci rapat air mata, amarah, dan letih demi mempertahankan kendali luar yang sempurna.",
      de: "Tränen, Wut und Schwäche werden eingesperrt, um makellose Kontrolle nach außen zu wahren.",
      fr: "Enfermer larmes, fatigue et colère pour afficher un contrôle extérieur sans faille.",
      es: "Encerrar lágrimas y vulnerabilidad para proyectar un control exterior inquebrantable.",
    },
    description: {
      en: "You are exceptionally skilled at keeping composure under pressure, but your primary coping mechanism is suppression. You sweep difficult emotions under the rug, distract yourself with duty, or put on a toxic positive smile. Research shows that bottled emotions do not die; they resurface as chronic somatic tension, sleep disturbances, or sudden outbursts.",
      id: "Anda sangat lihai menjaga ketenangan di depan orang lain, namun strategi utama Anda adalah penolakan emosi. Anda menyapu rasa sedih ke balik karpet, menenggelamkan diri dalam tanggung jawab, atau tersenyum palsu. Emosi yang dibungkam tidak pernah hilang; mereka bertransformasi menjadi migrain, insomnia, atau ledakan amarah tiba-tiba.",
      de: "Sie wirken nach außen extrem belastbar und kontrolliert, doch Ihr Hauptmechanismus ist das Verdrängen. Unterdrückte Gefühle verschwinden jedoch nicht; sie manifestieren sich in chronischen Muskelverspannungen, Schlafproblemen oder plötzlichen Erschöpfungskrisen.",
      fr: "Vous brillez par votre calme apparent, mais votre réflexe central est le déni émotionnel. Or, les ressentis refoulés ne disparaissent jamais d'eux-mêmes : ils se transforment en tensions physiques chroniques, insomnies ou explosions imprévues.",
      es: "Destacas por tu templanza exterior, pero tu mecanismo preferido es la supresión. Las emociones embotelladas no mueren en silencio; suelen reaparecer como fatiga crónica, dolores tensionales o colapsos emocionales inesperados.",
    },
    protocolDrills: {
      en: [
        "Somatic Permission: Dedicate 3 minutes daily to close your eyes, drop your shoulders, and ask: 'What emotion am I actively running away from right now?'",
        "Micro-Vulnerability: Share one honest, unpolished feeling with a trusted person instead of defaulting to 'I'm totally fine.'",
        "Values Re-anchoring: What is your stoicism costing you in authentic intimacy and physical health?",
      ],
      id: [
        "Izin Somatik: Luangkan 3 menit setiap hari untuk memejamkan mata, mengendurkan rahang, dan bertanya: 'Rasa apa yang sebenarnya sedang berusaha saya hindari saat ini?'",
        "Mikro-Kerapuhan: Bagikan satu perasaan jujur tanpa filter kepada orang terpercaya, bukan sekadar menjawab 'Aku baik-baik aja.'",
        "Audit Nilai: Berapa harga yang harus Anda bayar untuk ketabahan semu ini dalam hal keintiman hubungan dan kesehatan fisik?",
      ],
      de: [
        "Körperliche Erlaubnis: Halten Sie täglich 3 Minuten inne, senken Sie die Schultern und fragen Sie sich: 'Welches Gefühl versuche ich gerade wegzudrücken?'",
        "Mikro-Verletzlichkeit: Sprechen Sie ein ungeschminktes Gefühl gegenüber einer Vertrauensperson aus, statt 'Alles super' zu sagen.",
        "Werte-Inventur: Was kostet Sie diese ständige Fassade an echter Nähe und körperlicher Gesundheit?",
      ],
      fr: [
        "Permission Corporelle : Prenez 3 minutes par jour pour relâcher les mâchoires et demander : 'Quelle émotion suis-je en train de fuir ?'",
        "Micro-Vulnérabilité : Exprimez un ressenti sincère sans filtre à un proche au lieu du classique 'Ça va, t'inquiète'.",
        "Bilan d'Énergie : Quel est le coût réel de cette armure sur votre santé et votre intimité relationnelle ?",
      ],
      es: [
        "Permiso Somático: Dedica 3 minutos al día a relajar los hombros y preguntarte: '¿Qué emoción estoy intentando evitar en este instante?'",
        "Micro-Vulnerabilidad: Comparte un sentimiento honesto y sin pulir con alguien de confianza en lugar de decir 'todo bien'.",
        "Coste de la Coraza: ¿Qué precio estás pagando en salud física e intimidad por mantener esta fachada?",
      ],
    },
    color: "#f59e0b",
  },
  spiraling_brooder: {
    level: "spiraling_brooder",
    badge: {
      en: "Chronic Brooder / Rumination Loop",
      id: "Pemikir Berputar / Pusaran Ruminasi",
      de: "Chronischer Grübler / Gedankenspirale",
      fr: "Ruminateur Chronique / Boucle Mentale",
      es: "Rumiador Crónico / Espiral Mental",
    },
    title: {
      en: "The Spiraling Echo",
      id: "Gema Pikiran Berputar",
      de: "Das kreisende Echo",
      fr: "L'Écho Ruminatif",
      es: "El Eco Infinito",
    },
    tagline: {
      en: "Obsessively analyzing every emotional ripple until action becomes impossible.",
      id: "Terobsesi membedah setiap gelombang emosi hingga kehilangan daya untuk melangkah nyata.",
      de: "Zwanghaftes Analysieren jedes emotionalen Impulses, bis jede Tatkraft erlischt.",
      fr: "Analyser compulsivement chaque vague intérieure au point de paralyser toute initiative.",
      es: "Analizar obsesivamente cada fluctuación emocional hasta quedar atrapado sin actuar.",
    },
    description: {
      en: "You don't hide from your emotions; you drown in them. When upset, you turn inward and dissect your feelings over and over, mistaking rumination for problem-solving. This keeps your amygdala on high alert and blinds you to the concrete values-driven actions that would actually change your life.",
      id: "Anda tidak lari dari emosi; Anda justru tenggelam di dalamnya. Saat terluka, Anda membedah luka itu tanpa henti, mengira ruminasi adalah solusi masalah. Pola ini membuat otak emosional terus terpicu dan menjauhkan Anda dari tindakan nyata yang selaras dengan nilai hidup.",
      de: "Sie verdrängen Ihre Gefühle nicht, sondern versinken in ihnen. Sie verwechseln stundenlanges Analysieren mit konstruktiver Problemlösung. Dies hält Ihr Nervensystem in Alarmbereitschaft und hindert Sie an echten Schritten nach vorne.",
      fr: "Vous ne fuyez pas vos émotions : vous vous y noyez. Vous confondez rumination stérile et résolution de problèmes, maintenant votre cerveau en alerte permanente et vous coupant de toute action alignée.",
      es: "No huyes de lo que sientes; te sumerges en ello hasta ahogarte. Confundes rumiar en círculos con resolver problemas, manteniendo tu sistema nervioso en tensión continua e impidiéndote avanzar.",
    },
    protocolDrills: {
      en: [
        "Thought Labeling: When circling a mistake, say aloud: 'Ah, my mind is playing the Failure Radio station again.'",
        "The 5-Minute Rumination Timer: If you must analyze, set a timer for 5 minutes. When it dings, stand up and change physical environments.",
        "Tiny Values-Action: Ask: 'What is one concrete 2-minute physical action aligned with my deepest value that I can do right now?'",
      ],
      id: [
        "Pelabelan Pikiran: Saat terjebak menganalisis masa lalu, katakan: 'Pikiran saya sedang memutar siaran radio kegagalan lama.'",
        "Timer Ruminasi 5 Menit: Jika ingin menganalisis, beri batas waktu 5 menit. Saat berbunyi, segera berdiri dan ganti ruangan.",
        "Aksi Nilai Mikro: Tanyakan: 'Apa satu tindakan fisik konkret berdurasi 2 menit yang mencerminkan nilai hidup saya yang bisa saya lakukan sekarang?'",
      ],
      de: [
        "Gedanken-Etikettierung: Benennen Sie das Muster distanziert: 'Da läuft wieder mein gewohntes Sorgen-Hörspiel.'",
        "5-Minuten-Timer: Setzen Sie sich ein strenges Zeitlimit fürs Grübeln. Stehen Sie danach sofort auf und wechseln Sie den Raum.",
        "Werteorientierte Kleinsthandlung: 'Welche 2-minütige Handlung im Einklang mit meinen Werten kann ich jetzt sofort ausführen?'",
      ],
      fr: [
        "Étiquetage Mental : Dites-vous avec légèreté : 'Tiens, voilà mon cerveau qui remet son disque de culpabilité.'",
        "Sablier de Rumination : Accordez-vous 5 minutes de décorticage chronométrées, puis levez-vous immédiatement pour bouger.",
        "Micro-Action Alignée : 'Quelle action concrète de 2 minutes en accord avec mes valeurs puis-je poser ici et maintenant ?'",
      ],
      es: [
        "Etiquetado Consciente: Reconoce el bucle con distancia: 'Ahí está mi mente sintonizando otra vez la radio de las culpas.'",
        "Cronómetro de 5 Minutos: Pon un límite estricto para darle vueltas a algo. Al sonar, ponte de pie y camina.",
        "Micro-Acción de Valores: '¿Qué paso físico concreto de 2 minutos puedo dar ahora mismo que honre mis prioridades?'",
      ],
    },
    color: "#6366f1",
  },
  agile_aligned: {
    level: "agile_aligned",
    badge: {
      en: "High Emotional Agility & Value Alignment",
      id: "Kelincahan Emosi Tinggi & Selaras Nilai",
      de: "Hohe Emotionale Agilität & Werte-Klarheit",
      fr: "Haute Agilité Émotionnelle & Clarté de Valeurs",
      es: "Alta Agilidad Emocional & Coherencia Vital",
    },
    title: {
      en: "The Grounded Navigator",
      id: "Sang Navigator Tangguh",
      de: "Der geerdete Navigator",
      fr: "Le Navigateur Aligné",
      es: "El Navegante Consciente",
    },
    tagline: {
      en: "Holding difficult emotions with curiosity while moving steadfastly toward core values.",
      id: "Merengkuh emosi sulit dengan lapang dada sembari melangkah teguh menuju nilai hidup sejati.",
      de: "Hält schwere Gefühle mit Neugier aus und steuert unbeirrt auf die eigenen Kernwerte zu.",
      fr: "Accueille les émotions complexes avec lucidité tout en avançant résolument vers ses valeurs.",
      es: "Sostiene emociones complejas con apertura mientras camina con firmeza hacia sus valores.",
    },
    description: {
      en: "You possess high psychological flexibility. You neither bottle your discomfort nor let it drown your rationale. You treat emotions as useful data points about what you care about, stepping back to choose responses based on your deepest commitments rather than immediate impulses.",
      id: "Anda memiliki fleksibilitas psikologis yang sangat matang. Anda tidak menolak ketidaknyamanan batin, namun juga tidak membiarkannya menenggelamkan logika Anda. Anda melihat emosi sebagai kompas tentang apa yang penting bagi Anda, lalu memilih tindakan berdasarkan komitmen jangka panjang.",
      de: "Sie besitzen eine bemerkenswerte seelische Beweglichkeit. Weder mauern Sie Ihre Gefühle ein, noch lassen Sie sich von ihnen überrollen. Sie betrachten Emotionen als wertvolle Informationsquellen und handeln selbstbestimmt nach Ihren Idealen.",
      fr: "Vous faites preuve d'une formidable souplesse psychologique. Vous n'étouffez pas vos zones d'ombre et ne vous y perdez pas non plus. Vous traitez les émotions comme des indicateurs précieux et agissez selon vos idéaux profonds.",
      es: "Posees una notable flexibilidad psicológica. Ni reprimes tus sombras ni te dejas arrastrar por ellas. Entiendes las emociones como señales valiosas y respondes guiado por tus convicciones más auténticas.",
    },
    protocolDrills: {
      en: [
        "Values Horizon: Continuously calibrate your daily schedule so that your time reflects what you hold most dear.",
        "Courageous Discomfort: Willingly step into discomfort whenever growth and meaningful relationships demand it.",
        "Compassionate Mentorship: Use your grounded presence to help others navigate their emotional storms without judgment.",
      ],
      id: [
        "Kalibrasi Nilai: Terus tinjau jadwal harian Anda agar energi Anda dialokasikan untuk hal-hal yang benar-benar bermakna.",
        "Ketidaknyamanan Bernilai: Rela melangkah ke dalam rasa canggung atau takut saat hal itu diperlukan untuk pertumbuhan diri dan relasi mendalam.",
        "Dukungan Berempati: Manfaatkan ketenangan batin Anda untuk menemani orang terdekat melewati badai emosi tanpa menghakimi.",
      ],
      de: [
        "Werte-Kalibrierung: Richten Sie Ihren Alltag kontinuierlich an Ihren tiefsten Lebensprinzipien aus.",
        "Mutiges Unbehagen: Gehen Sie bereitwillig durch schwierige Situationen, wenn persönliches Wachstum es verlangt.",
        "Achtsame Präsenz: Unterstützen Sie Mitmenschen in deren Gefühlskrisen durch ruhiges, wertfreies Zuhören.",
      ],
      fr: [
        "Alignement Quotidien : Veillez à ce que votre emploi du temps reflète ce qui compte réellement pour votre cœur.",
        "Inconfort Fécond : Acceptez de traverser l'inconfort chaque fois que vos relations ou votre évolution l'exigent.",
        "Présence Bienveillante : Offrez votre stabilité émotionnelle à vos proches sans chercher à résoudre leurs états à leur place.",
      ],
      es: [
        "Calibración Vital: Asegúrate de que tu agenda diaria refleje con coherencia aquello que más valoras.",
        "Incomodidad Fructífera: Acepta transitar la vulnerabilidad siempre que el crecimiento personal lo demande.",
        "Presencia Serena: Comparte tu calma interior para acompañar a otros en sus tormentas sin juzgar.",
      ],
    },
    color: "#10b981",
  },
};

export interface AgilityScoreResult {
  totalScore: number;
  maxScore: number;
  percentage: number;
  level: AgilityLevel;
  profile: AgilityProfile;
  subscales: {
    bottling: { score: number; max: number; percentage: number };
    brooding: { score: number; max: number; percentage: number };
    values: { score: number; max: number; percentage: number };
  };
}

export function calculateAgilityScore(answers: Record<number, number>): AgilityScoreResult {
  let bottling = 0;
  let brooding = 0;
  let values = 0;

  AGILITY_QUESTIONS.forEach((q) => {
    const val = answers[q.id] || 0;
    if (q.dimension === "bottling") bottling += val;
    if (q.dimension === "brooding") brooding += val;
    if (q.dimension === "values") values += val;
  });

  const totalScore = bottling + brooding + (12 - values); // Inverted values for avoidance composite
  const maxScore = 36;
  const percentage = Math.round((totalScore / maxScore) * 100);

  let level: AgilityLevel = "agile_aligned";

  if (values >= 9 && bottling <= 5 && brooding <= 5) {
    level = "agile_aligned";
  } else if (bottling >= 7 && brooding >= 7) {
    level = "fragile_fused";
  } else if (bottling > brooding && bottling >= 6) {
    level = "guarded_bottler";
  } else if (brooding >= 6) {
    level = "spiraling_brooder";
  } else if (totalScore >= 18) {
    level = "fragile_fused";
  } else {
    level = "agile_aligned";
  }

  return {
    totalScore,
    maxScore,
    percentage,
    level,
    profile: AGILITY_PROFILES[level],
    subscales: {
      bottling: {
        score: bottling,
        max: 12,
        percentage: Math.round((bottling / 12) * 100),
      },
      brooding: {
        score: brooding,
        max: 12,
        percentage: Math.round((brooding / 12) * 100),
      },
      values: {
        score: values,
        max: 12,
        percentage: Math.round((values / 12) * 100),
      },
    },
  };
}
