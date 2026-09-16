export type DopamineLang = "en" | "id" | "de" | "fr" | "es";

export type DopamineLevel = "balanced" | "mild" | "resistant" | "burnout";

export type DopamineDimension = "compulsion" | "hedonic" | "boredom";

export interface DopamineQuestion {
  id: number;
  dimension: DopamineDimension;
  text: Record<DopamineLang, string>;
}

export const DOPAMINE_OPTIONS = [
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
      en: "Sometimes",
      id: "Kadang-kadang",
      de: "Manchmal",
      fr: "Parfois",
      es: "A veces",
    },
  },
  {
    value: 2,
    label: {
      en: "Frequently / Often",
      id: "Seringkali",
      de: "Häufig / Oft",
      fr: "Souvent",
      es: "Frecuentemente",
    },
  },
  {
    value: 3,
    label: {
      en: "Constantly / Compulsive",
      id: "Hampir Selalu / Kompulsif",
      de: "Ständig / Zwanghaft",
      fr: "Constamment / Compulsif",
      es: "Constantemente / Compulsivo",
    },
  },
];

export const DOPAMINE_QUESTIONS: DopamineQuestion[] = [
  // Dimension 1: Compulsive Screen Friction & Doomscrolling
  {
    id: 1,
    dimension: "compulsion",
    text: {
      en: "I check my phone within 5 minutes of waking up, before getting out of bed or speaking to anyone.",
      id: "Saya membuka HP dalam 5 menit pertama setelah bangun tidur, bahkan sebelum beranjak dari kasur.",
      de: "Ich greife innerhalb von 5 Minuten nach dem Aufwachen zum Smartphone, noch bevor ich aufstehe.",
      fr: "Je consulte mon téléphone dans les 5 minutes suivant mon réveil, avant même de sortir du lit.",
      es: "Miro el móvil en los primeros 5 minutos tras despertar, antes de levantarme de la cama.",
    },
  },
  {
    id: 2,
    dimension: "compulsion",
    text: {
      en: "I unlock my phone unconsciously without any specific goal, scrolling short videos or feeds on pure autopilot.",
      id: "Saya membuka kunci layar HP secara refleks tanpa tujuan jelas, lalu scrolling video pendek otomatis.",
      de: "Ich entsperre mein Telefon unbewusst ohne Ziel und scrolle mechanisch durch Feeds oder Videos.",
      fr: "Je déverrouille mon téléphone par réflexe sans but précis et fais défiler des vidéos en pilote automatique.",
      es: "Desbloqueo el móvil inconscientemente sin motivo y hago scroll en feeds o vídeos en piloto automático.",
    },
  },
  {
    id: 3,
    dimension: "compulsion",
    text: {
      en: "I feel phantom vibrations in my pocket or an itchy urgency to check notifications when my device is silent.",
      id: "Saya sering merasa HP bergetar (phantom vibration) atau gelisah ingin mengecek notifikasi meski sunyi.",
      de: "Ich spüre Phantom-Vibrationen in der Hosentasche oder einen ständigen Drang, Benachrichtigungen zu prüfen.",
      fr: "Je ressens de fausses vibrations dans ma poche ou une pulsion pressante de vérifier mes notifications.",
      es: "Siento vibraciones fantasma en el bolsillo o una urgencia constante por revisar notificaciones.",
    },
  },
  {
    id: 4,
    dimension: "compulsion",
    text: {
      en: "I watch videos or scroll social feeds while eating meals alone, unable to eat in silence.",
      id: "Saya wajib menonton video atau scrolling medsos saat makan sendirian; tidak tahan makan dalam hening.",
      de: "Ich schaue Videos oder Feeds beim Essen, unfähig, eine Mahlzeit in Stille zu genießen.",
      fr: "Je regarde des vidéos ou scrolle en mangeant seul(e), incapable de manger en silence.",
      es: "Veo vídeos o deslizo redes mientras como a solas, incapaz de comer en completo silencio.",
    },
  },

  // Dimension 2: Hedonic Adaptation & Anhedonia (Reward Resistance)
  {
    id: 5,
    dimension: "hedonic",
    text: {
      en: "Simple offline pleasures (reading a book, walking in a park, taking a quiet bath) feel flat or boring.",
      id: "Aktivitas sederhana tanpa layar (membaca buku, jalan sore di taman) terasa hambar dan membosankan.",
      de: "Einfache Freuden ohne Bildschirm (Buch lesen, Spaziergang) fühlen sich fad oder reizlos an.",
      fr: "Les plaisirs simples hors écran (lire un livre, marcher en forêt) me paraissent ternes ou ennuyeux.",
      es: "Los placeres simples sin pantallas (leer un libro, pasear) me resultan planos o insípidos.",
    },
  },
  {
    id: 6,
    dimension: "hedonic",
    text: {
      en: "I need background audio, podcasts, or television running at all times just to perform routine chores.",
      id: "Saya harus menyetel podcast, musik, atau TV setiap saat hanya untuk melakukan tugas harian biasa.",
      de: "Ich brauche ständig Hintergrundmusik oder Podcasts, um banale Hausarbeiten zu erledigen.",
      fr: "J'ai besoin de podcasts, musique ou vidéos en fond permanent pour accomplir la moindre tâche ménagère.",
      es: "Necesito ruido de fondo, podcasts o vídeos continuamente solo para realizar tareas domésticas.",
    },
  },
  {
    id: 7,
    dimension: "hedonic",
    text: {
      en: "I experience persistent brain fog, memory lapses, and severe difficulty focusing on deep work tasks.",
      id: "Saya sering mengalami brain fog (pikiran berkabut), mudah lupa, dan sangat susah fokus kerja mendalam.",
      de: "Ich leide unter geistigem Nebel (Brain Fog), Vergesslichkeit und Konzentrationsschwächen bei intensiver Arbeit.",
      fr: "Je ressens un brouillard mental tenace, des trous de mémoire et de la peine à me concentrer en profondeur.",
      es: "Padezco niebla mental constante, despistes y gran dificultad para concentrarme en tareas profundas.",
    },
  },
  {
    id: 8,
    dimension: "hedonic",
    text: {
      en: "After bingeing digital content for hours, I feel hollow, depleted, and filled with self-disgust rather than relaxed.",
      id: "Setelah berjam-jam maraton konten HP, saya merasa hampa, energi terkuras, dan kesal pada diri sendiri.",
      de: "Nach stundenlangem Medienkonsum fühle ich mich innerlich leer, erschöpft und verstimmt statt erholt.",
      fr: "Après des heures d'écrans, je me sens vidé(e), épuisé(e) et déçu(e) de moi-même plutôt que détendu(e).",
      es: "Tras horas pegado(a) a la pantalla, me siento vacío(a), drenado(a) y con culpa en vez de descansado(a).",
    },
  },

  // Dimension 3: Boredom Intolerance & Friction Avoidance
  {
    id: 9,
    dimension: "boredom",
    text: {
      en: "Whenever I wait in a 30-second line (elevator, red light, coffee shop), I instantly pull out my phone.",
      id: "Saat mengantre 30 detik (di lift, lampu merah, kasir), refleks pertama saya adalah langsung merogoh HP.",
      de: "Sobald ich 30 Sekunden warten muss (Aufzug, Ampel, Kasse), ziehe ich reflexartig mein Smartphone heraus.",
      fr: "Dès que je patiente 30 secondes (ascenseur, feu rouge, file d'attente), je sors instantanément mon portable.",
      es: "En cuanto espero 30 segundos (ascensor, semáforo, cola del café), saco el móvil por puro acto reflejo.",
    },
  },
  {
    id: 10,
    dimension: "boredom",
    text: {
      en: "I frequently switch between multiple apps or tabs every few seconds, unable to stay with one single task.",
      id: "Saya sering berpindah-pindah antar aplikasi atau tab browser tiap beberapa detik tanpa menyelesaikan apa pun.",
      de: "Ich springe im Sekundentakt zwischen Apps und Tabs hin und her, unfähig, bei einer Aufgabe zu verweilen.",
      fr: "Je zappe entre différentes applications ou onglets toutes les 10 secondes sans rester sur une tâche.",
      es: "Salto entre pestañas o aplicaciones cada pocos segundos, incapaz de sostenerme en una sola tarea.",
    },
  },
  {
    id: 11,
    dimension: "boredom",
    text: {
      en: "I delay going to sleep at night by doomscrolling in bed (Revenge Bedtime Procrastination).",
      id: "Saya menunda jam tidur malam hanya demi scrolling medsos di kasur (Revenge Bedtime Procrastination).",
      de: "Ich zögere das Einschlafen abends durch endloses Scrollen im Bett hinaus.",
      fr: "Je retarde l'heure de mon sommeil en scrollant au lit (procrastination du coucher).",
      es: "Retraso la hora de dormir haciendo scroll en la cama (procrastinación nocturna de la venganza).",
    },
  },
  {
    id: 12,
    dimension: "boredom",
    text: {
      en: "The thought of spending an entire weekend without internet or smartphone triggers acute panic or anxiety.",
      id: "Membayangkan menghabiskan akhir pekan penuh tanpa internet atau HP memicu rasa panik dan cemas di dada.",
      de: "Der Gedanke an ein ganzes Wochenende ohne Internet oder Smartphone löst echte Beklemmung in mir aus.",
      fr: "L'idée de passer un week-end complet sans internet ni smartphone provoque une angoisse palpable.",
      es: "La idea de pasar un fin de semana entero sin internet ni móvil me provoca ansiedad real en el pecho.",
    },
  },
];

export interface DopamineProfile {
  level: DopamineLevel;
  scoreRange: string;
  badge: Record<DopamineLang, string>;
  title: Record<DopamineLang, string>;
  tagline: Record<DopamineLang, string>;
  description: Record<DopamineLang, string>;
  fastingProtocol: Record<DopamineLang, string[]>;
  recoveryRituals: Record<DopamineLang, string[]>;
}

export const DOPAMINE_PROFILES: Record<DopamineLevel, DopamineProfile> = {
  balanced: {
    level: "balanced",
    scoreRange: "0 - 11",
    badge: {
      en: "Optimal Sensitivity",
      id: "Sensitivitas Optimal",
      de: "Optimale Sensibilität",
      fr: "Sensibilité Équilibrée",
      es: "Sensibilidad Óptima",
    },
    title: {
      en: "Sovereign Focus & Balanced Dopamine Tone",
      id: "Fokus Berdaulat & Regulasi Dopamin Alami",
      de: "Souveräner Fokus & Ausgeglichenes Dopamin",
      fr: "Maîtrise de l'Attention & Clarté Dopaminergique",
      es: "Enfoque Soberano & Dopamina Equilibrada",
    },
    tagline: {
      en: "You retain healthy neural receptor sensitivity. Boredom does not panic you, and your attention remains your own.",
      id: "Reseptor dopamin Anda sehat dan peka. Kebosanan tidak membuat Anda panik, dan kendali fokus tetap di tangan Anda.",
      de: "Deine Dopamin-Rezeptoren sind gesund und reaktionsfähig. Stille und Langeweile bereiten dir keine Angst.",
      fr: "Vos récepteurs dopaminergiques sont préservés. L'ennui passager ne vous effraie pas et votre attention vous appartient.",
      es: "Tus receptores dopaminérgicos están intactos. El silencio o el aburrimiento no te perturban y conservas tu concentración.",
    },
    description: {
      en: "Your relationship with digital technology is intentional and balanced. You use devices as tools rather than psychological pacifiers. Your baseline dopamine levels allow you to engage in deep reading, prolonged offline tasks, and restful sleep without persistent friction.",
      id: "Hubungan Anda dengan teknologi digital bersifat sadar dan terukur. Anda menggunakan gawai sebagai alat bantu, bukan empeng pelarian emosi. Sistem dopamin Anda mampu menikmati bacaan panjang, interaksi offline nyata, dan tidur nyenyak tanpa gangguan kompulsif.",
      de: "Dein Umgang mit digitalen Medien ist achtsam und souverän. Du nutzt Technologie als Werkzeug und nicht als emotionales Trostpflaster. Du bist fähig zu intensiver Vertiefung und erholsamer Ruhe.",
      fr: "Votre usage du numérique est sain et mesuré. Les écrans restent des outils et non des béquilles affectives. Vous conservez votre capacité de lecture soutenue et un repos authentique.",
      es: "Tu relación con la tecnología es consciente y armónica. Empleas el móvil como herramienta y no como chupete emocional. Disfrutas de momentos de lectura y descanso sin adicción al scroll.",
    },
    fastingProtocol: {
      en: [
        "Maintain a device-free first 30 minutes of the morning.",
        "Keep bedroom a dedicated offline sanctuary (charge phone outside).",
      ],
      id: [
        "Pertahankan 30 menit pertama di pagi hari tanpa menyentuh layar HP.",
        "Jadikan kamar tidur sebagai zona bebas gawai (isi daya HP di luar kamar).",
      ],
      de: [
        "Behalte die ersten 30 Minuten am Morgen strikt bildschirmfrei.",
        "Halte das Schlafzimmer als offline-Oase (lade das Telefon im Nebenzimmer).",
      ],
      fr: [
        "Préservez vos 30 premières minutes matinales sans aucun écran.",
        "Faites de votre chambre un sanctuaire déconnecté (téléphone chargé ailleurs).",
      ],
      es: [
        "Conserva los primeros 30 minutos de la mañana totalmente libres de pantallas.",
        "Mantén el dormitorio como santuario desconectado (carga el móvil fuera).",
      ],
    },
    recoveryRituals: {
      en: ["Daily 15-minute silent outdoor walk without headphones."],
      id: ["Jalan kaki 15 menit setiap hari tanpa earphone untuk menjaga kejernihan batin."],
      de: ["Täglich 15 Minuten stiller Spaziergang in der Natur ohne Kopfhörer."],
      fr: ["Marche quotidienne de 15 minutes en pleine nature sans écouteurs."],
      es: ["Paseo diario de 15 minutos en silencio y sin auriculares."],
    },
  },

  mild: {
    level: "mild",
    scoreRange: "12 - 20",
    badge: {
      en: "Mild Dopamine Drift",
      id: "Kelelahan Dopamin Ringan",
      de: "Leichte Reizüberlastung",
      fr: "Dérive Dopaminergique Modérée",
      es: "Sobrecarga Digital Leve",
    },
    title: {
      en: "The Fragmented Attention Loop",
      id: "Pola Perhatian Terfragmentasi",
      de: "Die fragmentierte Aufmerksamkeitsfalle",
      fr: "Attention Fragmentée & Dispersion Numérique",
      es: "Atención Fragmentada & Dispersión Digital",
    },
    tagline: {
      en: "Algorithms are subtly eroding your patience. You notice micro-compulsions to reach for your phone during minor pauses.",
      id: "Algoritma medsos mulai mengikis kesabaran Anda. Muncul dorongan refleks merogoh HP di setiap jeda waktu senggang.",
      de: "Algorithmen untergraben schleichend deine Geduld. Du greifst bei jeder kleinen Pause unwillkürlich zum Handy.",
      fr: "Les algorithmes érodent discrètement votre patience. Vous dégainez votre téléphone au moindre temps mort.",
      es: "Los algoritmos van mermando tu paciencia. Rebuscas el móvil por inercia en cualquier pequeña pausa del día.",
    },
    description: {
      en: "You are experiencing early-stage hedonic adaptation. While you still function well at work, simple tasks take longer due to frequent tab-switching and notification checking. You may notice subtle bedtime delays and lower motivation for offline hobbies.",
      id: "Anda mulai mengalami adaptasi hedonik tahap awal. Walau masih bisa bekerja, fokus Anda sering terbelah karena bolak-balik memeriksa HP. Anda mulai sering begadang karena scrolling dan malas memulai hobi offline.",
      de: "Du befindest dich im Anfangsstadium digitaler Reizüberlastung. Aufgaben dauern länger durch ständiges Multitasking, und die Leselust für Bücher schwindet.",
      fr: "Vous glissez vers une dispersion attentionnelle. Vos tâches s'éternisent à cause du multitâche permanent et vous retardez souvent votre coucher pour regarder des écrans.",
      es: "Comienzas a experimentar saturación de estímulos. Tardas más en culminar tareas por el cambio constante de aplicaciones y te cuesta leer textos largos.",
    },
    fastingProtocol: {
      en: [
        "Implement a 24-hour weekend Digital Mini-Fast (messaging allowed, social feeds locked).",
        "Delete infinite-scroll apps from your home screen; access only via desktop browser.",
        "Set screen color mode to Grayscale (monochrome) to neutralize algorithmic visual dopamine triggers.",
      ],
      id: [
        "Terapkan Puasa Digital 24 Jam di akhir pekan (chat esensial boleh, aplikasi medsos dikunci).",
        "Hapus aplikasi video pendek dari layar utama; hanya buka lewat browser komputer jika perlu.",
        "Ubah layar HP menjadi Grayscale (hitam putih) untuk mematikan daya tarik visual algoritma.",
      ],
      de: [
        "Führe einen 24-stündigen Wochenend-Digital-Fasten-Tag ein.",
        "Lösche Social-Media-Apps vom Homescreen und nutze sie nur über den Desktop-Browser.",
        "Schalte dein Smartphone auf Schwarz-Weiß (Graustufen), um Reize zu dämpfen.",
      ],
      fr: [
        "Instaurez un mini-jeûne numérique de 24h le week-end (messagerie utile autorisée, réseaux coupés).",
        "Désinstallez les applications de flux infinis de votre écran d'accueil.",
        "Activez l'affichage en noir et blanc (niveaux de gris) sur votre smartphone.",
      ],
      es: [
        "Aplica un ayuno digital de 24 horas en fin de semana (solo mensajería básica permitida).",
        "Elimina las aplicaciones de scroll infinito de tu pantalla de inicio.",
        "Pon la pantalla de tu móvil en escala de grises para apagar los estímulos visuales adictivos.",
      ],
    },
    recoveryRituals: {
      en: ["Replace bedtime scrolling with 10 minutes of reflective journaling in Ju."],
      id: ["Ganti scrolling malam di kasur dengan 10 menit journaling reflektif di Ju."],
      de: ["Ersetze abendliches Scrollen durch 10 Minuten Journaling im Ju Tagebuch."],
      fr: ["Remplacez le scroll du soir par 10 minutes d'écriture guidée dans Ju."],
      es: ["Sustituye el scroll en la cama por 10 minutos de diario reflexivo en Ju."],
    },
  },

  resistant: {
    level: "resistant",
    scoreRange: "21 - 28",
    badge: {
      en: "High Dopamine Resistance",
      id: "Resistensi Dopamin Tinggi",
      de: "Hohe Dopamin-Resistenz",
      fr: "Résistance Dopaminergique Élevée",
      es: "Resistencia Dopaminérgica Alta",
    },
    title: {
      en: "Chronic Dopamine Deficit & Reward Depletion",
      id: "Defisit Dopamin Kronis & Penurunan Reseptor",
      de: "Chronischer Dopamin-Mangel & Reiz-Abhängigkeit",
      fr: "Déficit Chronique & Épuisement Hédonique",
      es: "Déficit Dopaminérgico Crónico & Anhedonia",
    },
    tagline: {
      en: "Your baseline dopamine threshold has been driven dangerously high. Ordinary life feels agonizingly dull without continuous digital stimulation.",
      id: "Ambang batas dopamin otak Anda melonjak terlalu tinggi. Hidup wajar terasa membosankan tanpa asupan stimulasi layar terus-menerus.",
      de: "Deine Reizschwelle ist drastisch verschoben. Der normale Alltag fühlt sich quälend leer an ohne ständige Reizüberflutung.",
      fr: "Votre seuil de stimulation est saturé. La vie quotidienne vous semble atrocement terne sans apport numérique permanent.",
      es: "Tu umbral de gratificación está descalibrado. La vida cotidiana te resulta aburrida y vacía sin estímulos digitales continuos.",
    },
    description: {
      en: "Based on Dr. Anna Lembke's addiction model, your brain has down-regulated dopamine receptors (neuroadaptation) to protect itself from over-stimulation. As a result, you live in a chronic 'dopamine deficit state'. You suffer from procrastination, afternoon brain fog, loss of joy in creative work, and an inability to be alone with your thoughts.",
      id: "Mengacu pada model Dr. Anna Lembke, otak Anda telah memangkas reseptor dopamin (neuroadaptasi) untuk melindungi diri dari overstimulasi. Akibatnya, Anda berada dalam kondisi defisit dopamin: sering menunda tugas berat, pikiran berkabut di siang hari, dan panik saat harus hening sendirian.",
      de: "Nach dem Modell von Dr. Anna Lembke hat dein Gehirn Rezeptoren abgebaut, um sich vor Reizüberflutung zu schützen. Das Resultat: chronische Unruhe, Prokrastination, Konzentrationsverlust und Freudlosigkeit bei ruhigen Aktivitäten.",
      fr: "Selon les travaux de la Dre Anna Lembke, votre cerveau a désensibilisé ses récepteurs pour se prémunir du déluge d'informations. Vous vivez dans un déficit dopaminergique chronique marqué par la procrastination et la perte d'enthousiasme.",
      es: "Siguiendo el modelo de la Dra. Anna Lembke, tu cerebro ha reducido sus receptores para tolerar la sobrecarga. Vives en déficit crónico: postergación constante, fatiga mental y falta de gozo en tareas pausadas.",
    },
    fastingProtocol: {
      en: [
        "🚨 7-Day Dopamine Reset Protocol: Zero short-form video feeds (TikTok, Reels, Shorts) for 7 consecutive days.",
        "Institute the 'No Screens in Bed' Law: Phone stays in another room 60 minutes before bedtime.",
        "Engage in friction-based tasks: read 20 pages of a physical paper book before touching any screen in the morning.",
        "Use low-frequency Brown Noise in Ju Sound Sanctuary during work sessions instead of high-stimulus music.",
      ],
      id: [
        "🚨 Protokol Reset Dopamin 7 Hari: Nol video pendek (TikTok, Reels, Shorts) selama 7 hari berturut-turut.",
        "Terapkan Aturan Mutlak Bebas Layar di Kasur: HP ditinggal di luar kamar 60 menit sebelum tidur.",
        "Latih otak dengan tugas berfriksi: baca 10-20 halaman buku fisik sebelum membuka layar di pagi hari.",
        "Putar Brown Noise di Ju Sound Sanctuary saat bekerja daripada mendengarkan musik bertempo cepat.",
      ],
      de: [
        "🚨 7-Tage Dopamin-Reset: 7 Tage lang null Kurzvideos (TikTok, Reels, Shorts).",
        "Eiserne Schlafzimmer-Regel: Smartphone bleibt 60 Minuten vor dem Schlafen im Flur.",
        "Reibung trainieren: Lies morgens 15 Seiten in einem echten Buch vor dem ersten Display-Blick.",
        "Nutze sanftes Brown Noise im Ju Sound Sanctuary für fokussierte Arbeitsphasen.",
      ],
      fr: [
        "🚨 Protocole Reset 7 Jours: Zéro vidéo courte (TikTok, Reels, Shorts) pendant 7 jours d'affilée.",
        "Règle d'or: Le téléphone reste hors de la chambre 60 minutes avant de dormir.",
        "Réhabituez-vous à l'effort: lisez 15 pages d'un livre papier chaque matin avant tout écran.",
        "Écoutez le bruit brun dans Ju Sound Sanctuary pendant vos sessions de travail.",
      ],
      es: [
        "🚨 Protocolo de Reseteo de 7 Días: Cero vídeos cortos (TikTok, Reels, Shorts) durante 7 días seguidos.",
        "Norma inquebrantable: El teléfono duerme fuera de la habitación 60 minutos antes de acostarte.",
        "Entrena la tolerancia al esfuerzo: lee 15 páginas de un libro en papel antes de encender pantallas.",
        "Utiliza Ruido Marrón en Ju Sound Sanctuary para concentrarte en el trabajo.",
      ],
    },
    recoveryRituals: {
      en: [
        "Perform the 60-second Stanford Physiological Sigh whenever the urge to open social media strikes.",
        "Practice 15 minutes of uncensored voice journaling in Ju each night to decompress emotional residue.",
      ],
      id: [
        "Lakukan Stanford Physiological Sigh (2 tarikan napas + hembusan panjang) tiap kali tergoda scrolling.",
        "Luapkan kejenuhan batin lewat 15 menit voice journaling tanpa sensor di Ju tiap malam.",
      ],
      de: [
        "Führe das Stanford Physiological Sigh Tool aus, sobald der Reiz zum Scrollen aufkommt.",
        "Nutze allabendlich das Ju Sprachjournal für 15 Minuten ehrliche emotionale Entlastung.",
      ],
      fr: [
        "Pratiquez le Soupir Physiologique de Stanford dès qu'une pulsion de scroll vous envahit.",
        "Déchargez vos tensions chaque soir avec 15 minutes de journal vocal sans filtre sur Ju.",
      ],
      es: [
        "Aplica el Suspiro Fisiológico de Stanford cada vez que sientas el impulso compulsivo de abrir redes.",
        "Desahoga tu sobrecarga mental con 15 minutos de diario de voz sin censura en Ju cada noche.",
      ],
    },
  },

  burnout: {
    level: "burnout",
    scoreRange: "29 - 36",
    badge: {
      en: "Severe Hedonic Burnout",
      id: "Hedonic Burnout Akut",
      de: "Schwere hedonische Erschöpfung",
      fr: "Burnout Hédonique Sévère",
      es: "Agotamiento Hédonico Extremo",
    },
    title: {
      en: "The Paralyzed Doomscroller in Dopamine Collapse",
      id: "Keluarga Doomscrolling dalam Kolaps Dopamin",
      de: "Akuter Dopamin-Kollaps & Paralyse",
      fr: "L'Otages des Écrans en Rupture Dopaminergique",
      es: "La Parálisis del Scroll & Colapso Dopaminérgico",
    },
    tagline: {
      en: "Your nervous system is trapped in compulsive consumption to escape acute emotional dread. Complete dopamine fasting is required.",
      id: "Sistem saraf Anda terjebak dalam konsumsi layar kompulsif demi melarikan diri dari kecemasan batin. Anda butuh puasa dopamin darurat.",
      de: "Dein Nervensystem flieht in Dauerberieselung, um quälende innere Leere zu betäuben. Ein sofortiger Reiz-Stopp ist unumgänglich.",
      fr: "Votre système nerveux consomme compulsivement des flux pour anesthésier une angoisse sourde. Une diète numérique urgente s'impose.",
      es: "Tu sistema nervioso se refugia en el consumo compulsivo para adormecer un malestar interno profundo. Es urgente un reseteo radical.",
    },
    description: {
      en: "You are experiencing acute hedonic exhaustion. Dopamine, which evolved to motivate movement and survival, has been completely hijacked by hyper-stimulating algorithms. You likely suffer from sleep deprivation, executive paralysis, panic spikes when offline, and numbness towards real-world relationships. Immediate somatic containment and radical stimulus detox are critical.",
      id: "Sistem penghargaan otak Anda mengalami kelumpuhan akibat stimulasi algoritma yang berlebihan. Anda terjebak dalam siklus: lelah -> scrolling HP -> makin lelah -> rasa bersalah. Anda mengalami gangguan tidur parah, susah memulai tugas sederhana, dan merasa terasing dari dunia nyata. Anda butuh detoksifikasi stimulasi sekarang.",
      de: "Deine neurobiologische Motivationsachse ist zusammengebrochen. Du steckst im Teufelskreis aus Erschöpfung, stundenlangem Betäuben am Bildschirm und massiver Selbstverurteilung. Dein Geist benötigt dringend eine Auszeit und echte menschliche Erdung.",
      fr: "Votre axe motivationnel est saturé. Vous êtes enfermé(e) dans le cercle vicieux de l'épuisement, du scroll anesthésiant et de la culpabilité. Votre esprit a besoin d'un arrêt d'urgence et d'un retour aux sens.",
      es: "Tu sistema de recompensa cerebral ha colapsado. Te encuentras atrapado(a) en el ciclo de fatiga, evasión en pantallas y culpa paralizante. Tu mente exige una desconexión de emergencia y reconexión corporal.",
    },
    fastingProtocol: {
      en: [
        "🚨 RADICAL 48-HOUR DOPAMINE FAST: Complete shutdown of video feeds, social media, and entertainment browsing.",
        "Switch all smart devices to Grayscale (black and white mode) permanently.",
        "Buy a physical alarm clock; banish your phone from the bedroom completely.",
        "Daily 45-minute silent walk in a green park or forest without phone or headphones.",
        "Perform the 5-4-3-2-1 Sensory Grounding Lab immediately when offline cravings spike.",
      ],
      id: [
        "🚨 PUASA DOPAMIN RADIKAL 48 JAM: Matikan total medsos, video pendek, dan streaming hiburan.",
        "Ubah layar HP menjadi Grayscale (hitam-putih) secara permanen.",
        "Beli jam weker fisik; larang keras HP masuk ke area kamar tidur.",
        "Jalan kaki 45 menit di taman atau alam terbuka tanpa membawa HP atau earphone.",
        "Buka Laboratorium Grounding 5-4-3-2-1 saat timbul rasa gelisah ingin membuka medsos.",
      ],
      de: [
        "🚨 RADIKALES 48-STUNDEN-FASTEN: Kompletter Verzicht auf Social Media, Streaming und Feeds.",
        "Dauerhafter Graustufen-Modus auf allen Bildschirmen.",
        "Kaufe einen analogen Wecker und verbanne das Telefon dauerhaft aus dem Schlafzimmer.",
        "Täglich 45 Minuten stummer Wald- oder Parkspaziergang ohne jede Technik.",
        "Nutze das 5-4-3-2-1 Erdungs-Labor bei aufsteigenden Entzugserscheinungen.",
      ],
      fr: [
        "🚨 JEÛNE RADICAL DE 48 HEURES: Arrêt total des réseaux sociaux, vidéos et divertissements en ligne.",
        "Basculez définitivement vos écrans en mode niveaux de gris (noir et blanc).",
        "Achetez un réveil physique et bannissez le smartphone de votre chambre à coucher.",
        "Marche quotidienne de 45 minutes dans un parc sans aucun appareil électronique.",
        "Utilisez le module d'ancrage somatique 5-4-3-2-1 dès qu'une crise de manque survient.",
      ],
      es: [
        "🚨 AYUNO RADICAL DE 48 HORAS: Apagón absoluto de redes sociales, vídeos y consumo recreativo digital.",
        "Activa la escala de grises permanentemente en todos tus dispositivos.",
        "Compra un despertador analógico y prohíbe la entrada del móvil en tu dormitorio.",
        "Paseo de 45 minutos diarios en la naturaleza sin teléfono ni tecnología encima.",
        "Aplica el Laboratorio de Grounding 5-4-3-2-1 ante cualquier impulso ansioso de reconexión.",
      ],
    },
    recoveryRituals: {
      en: [
        "Breathe with the 4-7-8 Deep Sleep Pacer before bed to deactivate frantic cortisol production.",
        "Express uncensored raw frustration into Ju Voice Journal every evening to process root emotions.",
      ],
      id: [
        "Lakukan latihan napas 4-7-8 di Ju Sleep Lab sebelum tidur untuk menurunkan lonjakan kortisol.",
        "Keluarkan rasa sesak dan frustrasi lewat Ju Voice Journal setiap malam untuk memulihkan emosi asli.",
      ],
      de: [
        "Nutze die 4-7-8 Atemübung vor dem Einschlafen, um das Cortisol-Feuer zu löschen.",
        "Sprich deine unzensierten Gefühle jeden Abend in das Ju Sprachjournal ein.",
      ],
      fr: [
        "Pratiquez la respiration 4-7-8 avant le coucher pour réguler le cortisol et l'anxiété.",
        "Confiez vos ressentis sans fard au journal vocal de Ju chaque soir pour retrouver votre paix.",
      ],
      es: [
        "Respira con el pacer 4-7-8 antes de dormir para frenar los picos de cortisol nocturnos.",
        "Descarga tu frustración real en el diario de voz de Ju cada noche para sanar desde la raíz.",
      ],
    },
  },
};

export function calculateDopamineScore(answers: Record<number, number>) {
  let totalScore = 0;
  const dimensionScores: Record<DopamineDimension, number> = {
    compulsion: 0,
    hedonic: 0,
    boredom: 0,
  };

  DOPAMINE_QUESTIONS.forEach((q) => {
    const val = answers[q.id] ?? 0;
    totalScore += val;
    dimensionScores[q.dimension] += val;
  });

  let level: DopamineLevel = "balanced";
  if (totalScore >= 29) {
    level = "burnout";
  } else if (totalScore >= 21) {
    level = "resistant";
  } else if (totalScore >= 12) {
    level = "mild";
  } else {
    level = "balanced";
  }

  const profile = DOPAMINE_PROFILES[level];
  return {
    totalScore,
    maxScore: 36,
    level,
    profile,
    dimensionScores,
    percentages: {
      compulsion: Math.round((dimensionScores.compulsion / 12) * 100),
      hedonic: Math.round((dimensionScores.hedonic / 12) * 100),
      boredom: Math.round((dimensionScores.boredom / 12) * 100),
    },
  };
}
