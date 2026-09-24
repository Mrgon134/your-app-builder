import { BlogPost, getPostLanguage } from "./blog-posts";

export interface BlogQuizToolTarget {
  id: string;
  type: "quiz" | "tool";
  quizTitle: string;
  quizEyebrow: string;
  quizDescription: string;
  quizBadge: string;
  quizHref: string;
  primaryButtonLabel: string;
  title: string;
  description: string;
  badge: string;
  href: string;
  buttonText: string;
  topic: string;
  sourceContext: string;
  mascotMood?: "great" | "good" | "okay" | "rough" | "low";
  secondaryTool?: {
    title: string;
    description: string;
    href: string;
    buttonLabel: string;
    type: "tool" | "app";
  };
}

interface TopicConfig {
  id: string;
  // Patterns to match against slug, keywords, title, or category
  patterns: (string | RegExp)[];
  en: {
    quizTitle: string;
    quizEyebrow: string;
    quizDescription: string;
    quizBadge: string;
    quizHref: string;
    primaryButtonLabel: string;
    secondaryTool?: {
      title: string;
      description: string;
      href: string;
      buttonLabel: string;
      type: "tool" | "app";
    };
  };
  idLang: {
    quizTitle: string;
    quizEyebrow: string;
    quizDescription: string;
    quizBadge: string;
    quizHref: string;
    primaryButtonLabel: string;
    secondaryTool?: {
      title: string;
      description: string;
      href: string;
      buttonLabel: string;
      type: "tool" | "app";
    };
  };
}

const TOPIC_CONFIGS: TopicConfig[] = [
  // 1. Acrophobia (Fear of Heights)
  {
    id: "acrophobia",
    patterns: ["acrophobia", "akrofobia", "cohen-aq", "fear-of-heights", "takut-ketinggian", "height-vertigo", "visual-height"],
    en: {
      quizTitle: "Cohen's Acrophobia Questionnaire (AQ)",
      quizEyebrow: "Validated Clinical Assessment",
      quizDescription: "Assess your visual height intolerance, postural sway anxiety, and specific height panic triggers in 90 seconds.",
      quizBadge: "⏱️ 90 Seconds · Clinical Screener · 100% Free",
      quizHref: "/quiz/acrophobia",
      primaryButtonLabel: "Take the Acrophobia Test Free",
      secondaryTool: {
        title: "Physiological Sigh Breathwork",
        description: "2-minute rapid neuro-vagal reset to halt autonomic height panic on demand.",
        href: "/tools/physiological-sigh",
        buttonLabel: "Try Breathwork Tool",
        type: "tool",
      },
    },
    idLang: {
      quizTitle: "Tes Skrining Akrofobia (Cohen AQ)",
      quizEyebrow: "Tes Klinis Interaktif",
      quizDescription: "Ukur tingkat kecemasan ketinggian, sensasi vertigo visual, dan refleks panikmu lewat tes Cohen AQ 90 detik yang tervalidasi.",
      quizBadge: "⏱️ 90 Detik · Skrining Klinis · 100% Gratis",
      quizHref: "/tes-akrofobia",
      primaryButtonLabel: "Mulai Tes Akrofobia Gratis",
      secondaryTool: {
        title: "Latihan Napas Physiological Sigh",
        description: "Regulasi detak jantung cepat dan ketegangan saraf dalam 2 menit saat panik melanda.",
        href: "/tools/physiological-sigh",
        buttonLabel: "Buka Alat Pernapasan",
        type: "tool",
      },
    },
  },

  // 2. Glossophobia (Public Speaking Anxiety)
  {
    id: "glossophobia",
    patterns: ["glossophobia", "glosofobia", "prpsa", "mccroskey", "public-speaking", "bicara-di-depan-umum", "stage-fright"],
    en: {
      quizTitle: "McCroskey PRPSA Public Speaking Screener",
      quizEyebrow: "Validated Performance Assessment",
      quizDescription: "Screen your audience-size sensitivity, somatic tremor triggers, and vocal block vulnerability with the clinical PRPSA scale.",
      quizBadge: "⏱️ 90 Seconds · Evidence-Based · 100% Free",
      quizHref: "/quiz/glossophobia",
      primaryButtonLabel: "Take the Glossophobia Test",
      secondaryTool: {
        title: "Vocal Toning & Vagal Humming",
        description: "Somatic vocal cord exercise to relax laryngeal tension and stabilize your voice before speaking.",
        href: "/tools/vocal-toning",
        buttonLabel: "Open Vocal Lab",
        type: "tool",
      },
    },
    idLang: {
      quizTitle: "Tes Skrining Glosofobia (McCroskey PRPSA)",
      quizEyebrow: "Tes Klinis Interaktif",
      quizDescription: "Deteksi tingkat kecemasan bicara di depan umum, gemetar panggung, dan blokade suara lewat skala klinis PRPSA 90 detik.",
      quizBadge: "⏱️ 90 Detik · Skrining Klinis · 100% Gratis",
      quizHref: "/quiz/glossophobia",
      primaryButtonLabel: "Mulai Tes Glosofobia Gratis",
      secondaryTool: {
        title: "Vocal Toning & Vagal Humming",
        description: "Latihan getaran pita suara untuk meredakan ketegangan tenggorokan sebelum presentasi.",
        href: "/tools/vocal-toning",
        buttonLabel: "Buka Latihan Suara",
        type: "tool",
      },
    },
  },

  // 3. Claustrophobia (Fear of Enclosed Spaces)
  {
    id: "claustrophobia",
    patterns: ["claustrophobia", "klaustrofobia", "rachman-clq", "ruang-sempit", "elevator", "lift-panic", "enclosed-spaces"],
    en: {
      quizTitle: "Rachman Claustrophobia Questionnaire (CLQ)",
      quizEyebrow: "Validated Clinical Assessment",
      quizDescription: "Measure your suffocation anxiety, restriction avoidance, and elevator fear severity in under 90 seconds.",
      quizBadge: "⏱️ 90 Seconds · Clinical Screener · 100% Free",
      quizHref: "/quiz/claustrophobia",
      primaryButtonLabel: "Take the Claustrophobia Test",
      secondaryTool: {
        title: "Box Breathing Pacer",
        description: "4x4 rhythmic breath stabilization to prevent respiratory alkalosis in tight spaces.",
        href: "/tools/box-breathing",
        buttonLabel: "Open Box Breathing",
        type: "tool",
      },
    },
    idLang: {
      quizTitle: "Tes Skrining Klaustrofobia (Rachman CLQ)",
      quizEyebrow: "Tes Klinis Interaktif",
      quizDescription: "Ketahui tingkat ketakutanmu terhadap ruang tertutup, lift sempit, atau rasa terkunci lewat tes klinis Rachman CLQ 90 detik.",
      quizBadge: "⏱️ 90 Detik · Skrining Klinis · 100% Gratis",
      quizHref: "/quiz/claustrophobia",
      primaryButtonLabel: "Mulai Tes Klaustrofobia Gratis",
      secondaryTool: {
        title: "Box Breathing 4x4",
        description: "Latihan napas terstruktur untuk menenangkan rasa sesak dan panik saat berada di ruangan sempit.",
        href: "/tools/box-breathing",
        buttonLabel: "Buka Box Breathing",
        type: "tool",
      },
    },
  },

  // 4. Cyberchondria & Online Health Anxiety
  {
    id: "cyberchondria",
    patterns: ["cyberchondria", "starcevic-css", "health-anxiety", "cemas-penyakit", "gejala-google", "hypochondria", "health-searches"],
    en: {
      quizTitle: "Cyberchondria Severity Scale (CSS)",
      quizEyebrow: "Digital Psychology Screener",
      quizDescription: "Screen compulsive symptom searching, medical reassurance addiction, and hypochondriac anxiety cycles.",
      quizBadge: "⏱️ 90 Seconds · Validated Research · 100% Free",
      quizHref: "/quiz/cyberchondria",
      primaryButtonLabel: "Take the Cyberchondria Test",
      secondaryTool: {
        title: "5-4-3-2-1 Sensory Grounding",
        description: "Interrupt symptom-spiraling and return your senses to immediate tangible reality.",
        href: "/tools/grounding",
        buttonLabel: "Start Sensory Grounding",
        type: "tool",
      },
    },
    idLang: {
      quizTitle: "Tes Skrining Cyberchondria (Skala CSS)",
      quizEyebrow: "Tes Psikologi Digital",
      quizDescription: "Deteksi apakah kebiasaan mencari gejala penyakit di Google sudah masuk kategori kecemasan kesehatan kompulsif (Cyberchondria).",
      quizBadge: "⏱️ 90 Detik · Riset Tervalidasi · 100% Gratis",
      quizHref: "/quiz/cyberchondria",
      primaryButtonLabel: "Mulai Tes Cyberchondria Gratis",
      secondaryTool: {
        title: "Grounding Sensorik 5-4-3-2-1",
        description: "Hentikan overthinking penyakit dan jangkar kembali kesadaranmu pada dunia nyata.",
        href: "/tools/grounding",
        buttonLabel: "Buka Sensory Grounding",
        type: "tool",
      },
    },
  },

  // 5. Emetophobia (Fear of Vomiting)
  {
    id: "emetophobia",
    patterns: ["emetophobia", "emetofobia", "spovi", "veale", "fear-of-vomiting", "takut-muntah", "gastro-anxiety"],
    en: {
      quizTitle: "Veale SPOVI Emetophobia Screener",
      quizEyebrow: "Specific Phobia Screener",
      quizDescription: "Assess stomach vigilance, contamination rituals, and nausea-related panic with the clinical SPOVI scale.",
      quizBadge: "⏱️ 90 Seconds · Clinical Metric · 100% Free",
      quizHref: "/quiz/emetophobia",
      primaryButtonLabel: "Take the Emetophobia Test",
      secondaryTool: {
        title: "Physiological Sigh Breathwork",
        description: "Relieve somatic gut spasms by activating gentle parasympathetic tone.",
        href: "/tools/physiological-sigh",
        buttonLabel: "Try Calm Breathwork",
        type: "tool",
      },
    },
    idLang: {
      quizTitle: "Tes Skrining Emetofobia (Skala SPOVI)",
      quizEyebrow: "Tes Fobia Spesifik",
      quizDescription: "Ukur sensitivitas ketakutan ekstrem terhadap mual, muntah, dan kecemasan pencernaan lewat skrining klinis SPOVI.",
      quizBadge: "⏱️ 90 Detik · Skrining Klinis · 100% Gratis",
      quizHref: "/quiz/emetophobia",
      primaryButtonLabel: "Mulai Tes Emetofobia Gratis",
      secondaryTool: {
        title: "Latihan Napas Physiological Sigh",
        description: "Tenangkan kram perut akibat stres dan rilekskan sistem saraf secara cepat.",
        href: "/tools/physiological-sigh",
        buttonLabel: "Buka Latihan Napas",
        type: "tool",
      },
    },
  },

  // 6. Nomophobia (Smartphone Separation Anxiety)
  {
    id: "nomophobia",
    patterns: ["nomophobia", "nomofobia", "nmpq", "yildirim", "smartphone-separation", "ketergantungan-hp", "screen-addiction", "battery-panic"],
    en: {
      quizTitle: "Yildirim NMP-Q Nomophobia Screener",
      quizEyebrow: "Behavioral Addiction Assessment",
      quizDescription: "Screen your device dependency, notification panic, and disconnection dread in 90 seconds.",
      quizBadge: "⏱️ 90 Seconds · Academic Validated · 100% Free",
      quizHref: "/quiz/nomophobia",
      primaryButtonLabel: "Take the Nomophobia Test",
      secondaryTool: {
        title: "NSDR Deep Rest Protocol",
        description: "A 10-minute audio protocol to recharge mental bandwidth without screen exposure.",
        href: "/tools/nsdr",
        buttonLabel: "Try NSDR Session",
        type: "tool",
      },
    },
    idLang: {
      quizTitle: "Tes Skrining Nomofobia (NMP-Q)",
      quizEyebrow: "Tes Adiksi Perilaku Digital",
      quizDescription: "Ketahui seberapa parah kecemasanmu saat terpisah dari ponsel atau kehabisan baterai lewat skala ilmiah NMP-Q.",
      quizBadge: "⏱️ 90 Detik · Skala Ilmiah · 100% Gratis",
      quizHref: "/quiz/nomophobia",
      primaryButtonLabel: "Mulai Tes Nomofobia Gratis",
      secondaryTool: {
        title: "NSDR (Non-Sleep Deep Rest)",
        description: "Relaksasi mendalam 10 menit tanpa layar untuk memulihkan energi otak yang jenuh.",
        href: "/tools/nsdr",
        buttonLabel: "Buka Sesi NSDR",
        type: "tool",
      },
    },
  },

  // 7. Night Eating Syndrome (NES)
  {
    id: "night-eating",
    patterns: ["night-eating", "kebiasaan-makan-malam", "neq", "nocturnal-eating", "makan-tengah-malam", "insomnia-eating"],
    en: {
      quizTitle: "Birketvedt & Stunkard NEQ Night Eating Screener",
      quizEyebrow: "Circadian Eating Screener",
      quizDescription: "Assess nocturnal hyperphagia, morning anorexia, and circadian leptin/melatonin dysregulation markers.",
      quizBadge: "⏱️ 90 Seconds · Clinical Framework · 100% Free",
      quizHref: "/quiz/night-eating",
      primaryButtonLabel: "Take the Night Eating Test",
      secondaryTool: {
        title: "Sleep Pacer (4-7-8 Breathing)",
        description: "Promote natural pre-sleep melatonin release without grazing in the kitchen.",
        href: "/tools/sleep",
        buttonLabel: "Open Sleep Pacer",
        type: "tool",
      },
    },
    idLang: {
      quizTitle: "Tes Night Eating Syndrome (Skala NEQ)",
      quizEyebrow: "Tes Skrining Sirkadian",
      quizDescription: "Deteksi apakah kebiasaan terbangun dan mencari camilan di tengah malam berkaitan dengan disregulasi hormon tidur.",
      quizBadge: "⏱️ 90 Detik · Skrining Klinis · 100% Gratis",
      quizHref: "/quiz/night-eating",
      primaryButtonLabel: "Mulai Tes Night Eating Gratis",
      secondaryTool: {
        title: "Sleep Pacer 4-7-8",
        description: "Panduan napas ritmik untuk merangsang kantuk alami tanpa godaan ngemil tengah malam.",
        href: "/tools/sleep",
        buttonLabel: "Buka Sleep Pacer",
        type: "tool",
      },
    },
  },

  // 8. PMDD (Premenstrual Dysphoric Disorder)
  {
    id: "pmdd",
    patterns: ["pmdd", "premenstrual-dysphoric", "drsp", "haid-ekstrem", "luteal-phase", "pms-severe"],
    en: {
      quizTitle: "Endicott DRSP Premenstrual Dysphoric Screener",
      quizEyebrow: "Endocrine & Mood Assessment",
      quizDescription: "Screen severe luteal-phase mood crashes, dysphoric anger, and allopregnanolone sensitivity markers.",
      quizBadge: "⏱️ 90 Seconds · Diagnostic Criterion · 100% Free",
      quizHref: "/quiz/pmdd",
      primaryButtonLabel: "Take the PMDD Screener",
      secondaryTool: {
        title: "EMDR Bilateral Stimulation",
        description: "Bilateral acoustic stimulation to gently modulate acute luteal mood swings.",
        href: "/tools/bilateral",
        buttonLabel: "Try Bilateral Lab",
        type: "tool",
      },
    },
    idLang: {
      quizTitle: "Tes Skrining PMDD (Skala DRSP)",
      quizEyebrow: "Tes Gangguan Mood Hormonal",
      quizDescription: "Ukur apakah gejala emosional menjelang menstruasi sudah mengarah pada Premenstrual Dysphoric Disorder (PMDD).",
      quizBadge: "⏱️ 90 Detik · Kriteria Diagnostik · 100% Gratis",
      quizHref: "/quiz/pmdd",
      primaryButtonLabel: "Mulai Tes PMDD Gratis",
      secondaryTool: {
        title: "Stimulasi Bilateral EMDR",
        description: "Audio ritmis kiri-kanan untuk meredakan ledakan emosi dan kecemasan intens fase luteal.",
        href: "/tools/bilateral",
        buttonLabel: "Buka Lab Bilateral",
        type: "tool",
      },
    },
  },

  // 9. BFRB (Body-Focused Repetitive Behaviors)
  {
    id: "bfrb",
    patterns: ["bfrb", "skin-picking", "hair-pulling", "trichotillomania", "dermatillomania", "kebiasaan-kulit-rambut", "excoriation"],
    en: {
      quizTitle: "MGH-HPS / BFRB Repetitive Behavior Screener",
      quizEyebrow: "Habit Reversal Assessment",
      quizDescription: "Assess unconscious skin picking, hair pulling urges, and sensory tension relief cycles in 90 seconds.",
      quizBadge: "⏱️ 90 Seconds · Clinical Protocol · 100% Free",
      quizHref: "/quiz/bfrb",
      primaryButtonLabel: "Take the BFRB Screener",
      secondaryTool: {
        title: "Sensory Grounding Protocol",
        description: "Engage tactile awareness to safely displace repetitive picking impulses.",
        href: "/tools/grounding",
        buttonLabel: "Try Sensory Grounding",
        type: "tool",
      },
    },
    idLang: {
      quizTitle: "Tes Skrining BFRB (Kebiasaan Kulit & Rambut)",
      quizEyebrow: "Tes Perilaku Kompulsif",
      quizDescription: "Evaluasi dorongan mencabut rambut, mengelupas kulit, atau memencet jerawat saat cemas/melamun.",
      quizBadge: "⏱️ 90 Detik · Protokol Klinis · 100% Gratis",
      quizHref: "/quiz/bfrb",
      primaryButtonLabel: "Mulai Tes BFRB Gratis",
      secondaryTool: {
        title: "Sensory Grounding 5-4-3-2-1",
        description: "Latihan taktil untuk mengalihkan jari dari dorongan menyentuh kulit atau rambut.",
        href: "/tools/grounding",
        buttonLabel: "Buka Sensory Grounding",
        type: "tool",
      },
    },
  },

  // 10. Orthorexia (Clean Eating Obsession)
  {
    id: "orthorexia",
    patterns: ["orthorexia", "ortoreksia", "clean-eating-obsession", "bratman", "makan-sehat-ekstrem", "food-anxiety"],
    en: {
      quizTitle: "Düsseldorf DOS Orthorexia Screener",
      quizEyebrow: "Nutritional Psychology Screener",
      quizDescription: "Screen unhealthy fixation on dietary purity, social food isolation, and guilt-driven nutritional anxiety.",
      quizBadge: "⏱️ 90 Seconds · DOS Clinical Scale · 100% Free",
      quizHref: "/quiz/orthorexia",
      primaryButtonLabel: "Take the Orthorexia Screener",
      secondaryTool: {
        title: "AI Reflection Companion",
        description: "Unpack cognitive food rules and guilt narratives with non-judgmental guidance.",
        href: "/ai-journal",
        buttonLabel: "Open AI Journal",
        type: "app",
      },
    },
    idLang: {
      quizTitle: "Tes Skrining Ortoreksia (Skala DOS)",
      quizEyebrow: "Tes Psikologi Nutrisi",
      quizDescription: "Cari tahu apakah standar makan bersihmu sudah berubah menjadi kecemasan berlebih dan obsesi yang melelahkan jiwa.",
      quizBadge: "⏱️ 90 Detik · Skala Klinis DOS · 100% Gratis",
      quizHref: "/quiz/orthorexia",
      primaryButtonLabel: "Mulai Tes Ortoreksia Gratis",
      secondaryTool: {
        title: "Jurnal Refleksi AI Nuju",
        description: "Uraikan rasa bersalah seputar makanan dengan teman curhat AI tanpa penghakiman.",
        href: "/ai-journal",
        buttonLabel: "Buka Jurnal AI",
        type: "app",
      },
    },
  },

  // 11. Toxic Positivity & Emotional Invalidation
  {
    id: "toxic-positivity",
    patterns: ["toxic-positivity", "positivitas-beracun", "validasi-emosi", "emotional-invalidation", "semangat-ya", "toxic-positive"],
    en: {
      quizTitle: "Toxic Positivity & Emotional Invalidation Screener",
      quizEyebrow: "Psychological Defense Screener",
      quizDescription: "Discover whether suppressed negative emotions and forced optimism are secretly elevating your chronic stress baseline.",
      quizBadge: "⏱️ 90 Seconds · CBT Framework · 100% Free",
      quizHref: "/quiz/toxic-positivity",
      primaryButtonLabel: "Take the Toxic Positivity Test",
      secondaryTool: {
        title: "Voice Venting & Validation Space",
        description: "Speak your raw feelings out loud in Nuju without being told to 'stay positive'.",
        href: "/voice-journaling",
        buttonLabel: "Try Voice Venting",
        type: "app",
      },
    },
    idLang: {
      quizTitle: "Tes Skrining Toxic Positivity (Validasi Emosi)",
      quizEyebrow: "Tes Kesehatan Emosional",
      quizDescription: "Deteksi apakah kamu kerap memaksakan diri tersenyum palsu atau menolak emosi sedih hingga menumpuk stres kronis.",
      quizBadge: "⏱️ 90 Detik · Kerangka CBT · 100% Gratis",
      quizHref: "/quiz/toxic-positivity",
      primaryButtonLabel: "Mulai Tes Toxic Positivity Gratis",
      secondaryTool: {
        title: "Voice Journaling Tanpa Sensor",
        description: "Luapkan rasa lelah dan marah apa adanya ke aplikasi Nuju tanpa takut dihakimi.",
        href: "/voice-journaling",
        buttonLabel: "Coba Voice Journaling",
        type: "app",
      },
    },
  },

  // 12. Comparison Trap & Social Media Envy
  {
    id: "comparison-trap",
    patterns: ["comparison-trap", "social-media-envy", "iri-hati-medsos", "perbandingan-sosial", "fostering-envy", "feeling-behind"],
    en: {
      quizTitle: "Social Comparison & Envy Trap Screener",
      quizEyebrow: "Self-Worth Assessment",
      quizDescription: "Assess how scrolling feeds, comparing career milestones, and feeling behind trigger imposter spirals.",
      quizBadge: "⏱️ 90 Seconds · Festinger Model · 100% Free",
      quizHref: "/quiz/comparison-trap",
      primaryButtonLabel: "Take the Comparison Test",
      secondaryTool: {
        title: "Daily Oracle & Perspective Shift",
        description: "Pull an archetype card to re-center on your personal lane and intrinsic values.",
        href: "/game/daily-card",
        buttonLabel: "Pull Daily Oracle",
        type: "tool",
      },
    },
    idLang: {
      quizTitle: "Tes Skrining Comparison Trap (Jebakan Perbandingan)",
      quizEyebrow: "Tes Evaluasi Diri",
      quizDescription: "Ukur seberapa dalam perasaan tertinggal atau minder saat melihat pencapaian teman di media sosial.",
      quizBadge: "⏱️ 90 Detik · Model Festinger · 100% Gratis",
      quizHref: "/quiz/comparison-trap",
      primaryButtonLabel: "Mulai Tes Comparison Trap",
      secondaryTool: {
        title: "Daily Oracle Card Nuju",
        description: "Tarik kartu refleksi harian untuk mengembalikan fokus pada perjalanan autentik dirimu sendiri.",
        href: "/game/daily-card",
        buttonLabel: "Tarik Kartu Harian",
        type: "tool",
      },
    },
  },

  // 13. Dopamine Deficit & Reset
  {
    id: "dopamine-reset",
    patterns: [
      "dopamine",
      "dopamin",
      "reset-dopamin",
      "dopamine-reset",
      "dopamine-deficit",
      "anna-lembke",
      "dopamine-burnout",
      "dopamine-detox",
      "kejenuhan-dopamin",
      "detoks-digital",
      "digital-detox",
      "pleasure-pain",
      "scrolling-addiction",
      "cheap-dopamine",
    ],
    en: {
      quizTitle: "Dopamine Burnout & Deficit Baseline Screener",
      quizEyebrow: "Stanford Neuroscience Model",
      quizDescription: "Determine where your pleasure-pain seesaw sits and how deeply screen stimulation has depleted your baseline focus.",
      quizBadge: "⏱️ 90 Seconds · Neurochemical Check · 100% Free",
      quizHref: "/quiz/dopamine-detox",
      primaryButtonLabel: "Screen Your Dopamine State",
      secondaryTool: {
        title: "NSDR Deep Reset Audio",
        description: "Andrew Huberman-endorsed protocol to restore baseline dopamine without stimulants.",
        href: "/tools/nsdr",
        buttonLabel: "Start NSDR Session",
        type: "tool",
      },
    },
    idLang: {
      quizTitle: "Tes Kejenuhan & Defisit Dopamin",
      quizEyebrow: "Model Neurosains Stanford",
      quizDescription: "Ketahui apakah rasa malas, cemas hampa, dan sulit fokusmu disebabkan oleh sindrom defisit dopamin akibat scrolling berlebih.",
      quizBadge: "⏱️ 90 Detik · Analisis Neurokimia · 100% Gratis",
      quizHref: "/quiz/dopamine-detox",
      primaryButtonLabel: "Mulai Tes Dopamin Gratis",
      secondaryTool: {
        title: "Audio Protokol NSDR",
        description: "Relaksasi berbasis sains untuk memulihkan reseptor dopamin dan menjernihkan pikiran.",
        href: "/tools/nsdr",
        buttonLabel: "Buka Audio NSDR",
        type: "tool",
      },
    },
  },

  // 14. Rumination & Overthinking Loops
  {
    id: "rumination",
    patterns: [
      "rumination",
      "ruminasi",
      "gruebeln",
      "gedankenschleifen",
      "rumination-mentale",
      "overthinking-loop",
      "overthinking",
      "default-mode-network",
      "dmn",
      "nighttime-replay",
      "nolen-hoeksema",
      "boucle-pensee",
      "trapnell",
    ],
    en: {
      quizTitle: "Trapnell Rumination & Overthinking Screener",
      quizEyebrow: "Cognitive Psychology Screener",
      quizDescription: "Screen perseverative rumination cycles, midnight mental replays, and cognitive inflexibility severity.",
      quizBadge: "⏱️ 90 Seconds · Trapnell Scale · 100% Free",
      quizHref: "/quiz/rumination",
      primaryButtonLabel: "Take Rumination Test",
      secondaryTool: {
        title: "Cognitive Brain Dump Journal",
        description: "Externalize mental loops in 60 seconds with Ju's CBT-aligned cognitive reframing.",
        href: "/ai-journal",
        buttonLabel: "Start Brain Dump",
        type: "app",
      },
    },
    idLang: {
      quizTitle: "Tes Skrining Ruminasi & Overthinking",
      quizEyebrow: "Tes Pola Pikir Kognitif",
      quizDescription: "Ukur seberapa parah siklus overthinking berulang yang sering memutar skenario buruk di kepalamu saat malam.",
      quizBadge: "⏱️ 90 Detik · Skala Trapnell · 100% Gratis",
      quizHref: "/quiz/rumination",
      primaryButtonLabel: "Mulai Tes Ruminasi Gratis",
      secondaryTool: {
        title: "Brain Dump Journaling AI",
        description: "Tumpahkan riak pikiran kusut dalam 60 detik dan biarkan AI Ju membantu mengurainya.",
        href: "/ai-journal",
        buttonLabel: "Buka Jurnal AI",
        type: "app",
      },
    },
  },

  // 15. Somniphobia & Sleep Dread
  {
    id: "somniphobia",
    patterns: [
      "somniphobia",
      "somniphobie",
      "somnifobia",
      "takut-tidur",
      "sleep-dread",
      "bedtime-anxiety",
      "schlafangst",
      "einschlafen",
      "suimin",
      "peur-de-dormir",
      "insomnia",
      "3am-anxiety",
      "morin",
    ],
    en: {
      quizTitle: "Somniphobia & Sleep Anxiety Screener",
      quizEyebrow: "Sleep Psychology Assessment",
      quizDescription: "Assess sleep avoidance, bedtime intrusive thoughts, and nocturnal tachycardia markers in 90 seconds.",
      quizBadge: "⏱️ 90 Seconds · Circadian Assessment · 100% Free",
      quizHref: "/quiz/somniphobia",
      primaryButtonLabel: "Take Sleep Anxiety Test",
      secondaryTool: {
        title: "4-7-8 Sleep Breathwork Lab",
        description: "Harmonize vagal nerve tone to slide effortlessly into parasympathetic sleep.",
        href: "/tools/sleep",
        buttonLabel: "Open Sleep Pacer",
        type: "tool",
      },
    },
    idLang: {
      quizTitle: "Tes Skrining Somnifobia & Cemas Tidur",
      quizEyebrow: "Tes Kualitas Tidur Mental",
      quizDescription: "Deteksi mengapa kamu sering menunda tidur atau merasa gelisah saat lampu kamar mulai dipadamkan.",
      quizBadge: "⏱️ 90 Detik · Penilaian Sirkadian · 100% Gratis",
      quizHref: "/quiz/somniphobia",
      primaryButtonLabel: "Mulai Tes Cemas Tidur Gratis",
      secondaryTool: {
        title: "Sleep Pacer 4-7-8",
        description: "Latihan napas relaksasi parasimpatis untuk memudahkanmu tertidur lelap tanpa overthinking.",
        href: "/tools/sleep",
        buttonLabel: "Buka Sleep Pacer",
        type: "tool",
      },
    },
  },

  // 16. Burnout & Emotional Exhaustion
  {
    id: "burnout",
    patterns: ["burnout", "kelelahan-mental", "emotional-exhaustion", "maslach", "workplace-stress", "feierabend"],
    en: {
      quizTitle: "Clinical Burnout & Exhaustion Screener",
      quizEyebrow: "Maslach Burnout Inventory Model",
      quizDescription: "Measure your emotional exhaustion, cynicism towards tasks, and personal efficacy decline.",
      quizBadge: "⏱️ 90 Seconds · MBI Framework · 100% Free",
      quizHref: "/quiz/burnout",
      primaryButtonLabel: "Take Free Burnout Test",
      secondaryTool: {
        title: "NSDR 10-Minute Recharge",
        description: "Neuroscience-backed deep rest session to recover from chronic mental burnout.",
        href: "/tools/nsdr",
        buttonLabel: "Try NSDR Lab",
        type: "tool",
      },
    },
    idLang: {
      quizTitle: "Tes Skrining Burnout & Kelelahan Mental",
      quizEyebrow: "Model Klinis Maslach",
      quizDescription: "Cari tahu apakah rasa lelah berkepanjanganmu saat ini sudah memasuki fase burnout klinis yang butuh penanganan.",
      quizBadge: "⏱️ 90 Detik · Standar Maslach · 100% Gratis",
      quizHref: "/quiz/burnout",
      primaryButtonLabel: "Mulai Tes Burnout Gratis",
      secondaryTool: {
        title: "Audio Deep Rest NSDR",
        description: "Istirahat otak 10 menit tanpa tidur untuk merestart fokus dan meredakan kepenatan kerja.",
        href: "/tools/nsdr",
        buttonLabel: "Buka Lab NSDR",
        type: "tool",
      },
    },
  },

  // 17. Adult ADHD & Executive Dysfunction
  {
    id: "adhd",
    patterns: ["adhd", "executive-dysfunction", "task-paralysis", "disfungsi-eksekutif", "asrs", "focus-trouble", "distraction"],
    en: {
      quizTitle: "WHO ASRS-v1.1 Adult ADHD Screener",
      quizEyebrow: "WHO Clinical Screener",
      quizDescription: "Screen inattention traits, executive task paralysis, and dopamine deficiency patterns in adults.",
      quizBadge: "⏱️ 90 Seconds · WHO Benchmark · 100% Free",
      quizHref: "/quiz/adhd-screener",
      primaryButtonLabel: "Take the Adult ADHD Test",
      secondaryTool: {
        title: "Audio Voice Journaling",
        description: "Bypass typing friction and organize messy thoughts hands-free in seconds.",
        href: "/voice-journaling",
        buttonLabel: "Try Voice Journal",
        type: "app",
      },
    },
    idLang: {
      quizTitle: "Tes Skrining ADHD Dewasa (WHO ASRS-v1.1)",
      quizEyebrow: "Standar Klinis WHO",
      quizDescription: "Deteksi ciri-ciri ADHD dewasa, kelumpuhan memulai tugas (task paralysis), dan kesulitan konsentrasi harian.",
      quizBadge: "⏱️ 90 Detik · Standar Klinis WHO · 100% Gratis",
      quizHref: "/quiz/adhd-screener",
      primaryButtonLabel: "Mulai Tes ADHD Dewasa Gratis",
      secondaryTool: {
        title: "Voice Journaling Ringan",
        description: "Bicara langsung tanpa beban mengetik untuk mendokumentasikan ide tanpa terdistraksi.",
        href: "/voice-journaling",
        buttonLabel: "Coba Voice Journal",
        type: "app",
      },
    },
  },

  // 18. Attachment Style & Relationships
  {
    id: "attachment-style",
    patterns: ["attachment-style", "anxious-avoidant", "gaya-kelekatan", "ecr-r", "fear-of-abandonment", "relationship-attachment", "parasocial", "parasosial", "oshi-streamer", "horton"],
    en: {
      quizTitle: "ECR-R Adult Attachment Style Assessment",
      quizEyebrow: "Relationship Psychology Assessment",
      quizDescription: "Decode your relationship patterns: Anxious, Avoidant, Disorganized, or Secure.",
      quizBadge: "⏱️ 2 Minutes · Validated ECR-R · 100% Free",
      quizHref: "/quiz/attachment-style",
      primaryButtonLabel: "Take Attachment Test Free",
      secondaryTool: {
        title: "Emotional Clarity Journal",
        description: "Identify relationship triggers and clarify boundaries with AI reflection.",
        href: "/ai-journal",
        buttonLabel: "Open AI Journal",
        type: "app",
      },
    },
    idLang: {
      quizTitle: "Tes Gaya Kelekatan Hubungan (Attachment Style)",
      quizEyebrow: "Psikologi Hubungan Asmara",
      quizDescription: "Pahami dinamika emosimu dalam hubungan: apakah kamu cemas (Anxious), menghindar (Avoidant), atau Aman (Secure).",
      quizBadge: "⏱️ 2 Menit · Skala ECR-R · 100% Gratis",
      quizHref: "/quiz/attachment-style",
      primaryButtonLabel: "Mulai Tes Attachment Style",
      secondaryTool: {
        title: "Jurnal Refleksi Hubungan",
        description: "Pahami pemicu emosi saat pasangan menjauh dan latih komunikasi yang lebih sehat.",
        href: "/ai-journal",
        buttonLabel: "Buka Jurnal AI",
        type: "app",
      },
    },
  },

  // 19. General Mental Health & Anxiety (DASS-21)
  {
    id: "dass-21",
    patterns: ["mental-health", "kesehatan-mental", "dass-21", "depression-anxiety-stress", "tes-kesehatan-mental", "anxiety-test", "stress-level"],
    en: {
      quizTitle: "DASS-21 Clinical Mental Health Screener",
      quizEyebrow: "Gold Standard Assessment",
      quizDescription: "Get a comprehensive, evidence-based breakdown of your Depression, Anxiety, and Stress scores in under 2 minutes.",
      quizBadge: "⏱️ 2 Minutes · Lovibond Standard · 100% Free",
      quizHref: "/quiz/mental-health-test",
      primaryButtonLabel: "Take Free DASS-21 Test",
      secondaryTool: {
        title: "Panic SOS Grounding Protocol",
        description: "Emergency multi-sensory stabilization for high acute anxiety moments.",
        href: "/tools/panic-sos",
        buttonLabel: "Open Panic SOS",
        type: "tool",
      },
    },
    idLang: {
      quizTitle: "Tes Kesehatan Mental Mandiri (DASS-21)",
      quizEyebrow: "Standar Klinis Global",
      quizDescription: "Ukur tingkat Depresi, Kecemasan, dan Stres harianmu dengan instrumen ilmiah DASS-21 tervalidasi.",
      quizBadge: "⏱️ 2 Menit · Standar Lovibond · 100% Gratis",
      quizHref: "/quiz/tes-kesehatan-mental",
      primaryButtonLabel: "Mulai Tes DASS-21 Gratis",
      secondaryTool: {
        title: "Protokol Panic SOS Nuju",
        description: "Panduan interaktif darurat untuk meredakan serangan panik dan detak jantung kencang.",
        href: "/tools/panic-sos",
        buttonLabel: "Buka Panic SOS",
        type: "tool",
      },
    },
  },

  // 20. Social & Emotional Battery
  {
    id: "mood-battery",
    patterns: [
      "mood-tracking",
      "baterai-emosi",
      "baterai-sosial",
      "social-battery",
      "emotional-battery",
      "mood-tracker",
      "daily-mood",
      "aplikasi-mood",
      "introvert-hangover",
      "social-exhaustion",
      "akku-leer",
      "soziale-batterie",
    ],
    en: {
      quizTitle: "Social Battery & Emotional Capacity Check",
      quizEyebrow: "Daily Bandwidth Screener",
      quizDescription: "Find out your remaining social bandwidth and introvert threshold before hitting sensory overload or shutdown.",
      quizBadge: "⏱️ 60 Seconds · Self-Assessment · 100% Free",
      quizHref: "/quiz/social-battery",
      primaryButtonLabel: "Take Social Battery Test",
      secondaryTool: {
        title: "Interactive Mood Tracker",
        description: "Track moods with zero friction and see longitudinal emotional patterns over time.",
        href: "/mood-tracker",
        buttonLabel: "Open Mood Tracker",
        type: "app",
      },
    },
    idLang: {
      quizTitle: "Cek Sisa Baterai Sosial & Emosimu 🔋",
      quizEyebrow: "Deteksi Kapasitas Mental",
      quizDescription: "Ketahui sisa kapasitas mental dan energimu sebelum mencapai fase overload dan kelelahan sosial kritis.",
      quizBadge: "⏱️ 60 Detik · Skrining Cepat · 100% Gratis",
      quizHref: "/tes-baterai-sosial",
      primaryButtonLabel: "Cek Baterai Sekarang",
      secondaryTool: {
        title: "Pelacak Mood Nuju",
        description: "Catat suasana hati harian dalam 30 detik untuk mengenali pemicu naik-turun emosimu.",
        href: "/mood-tracker",
        buttonLabel: "Buka Mood Tracker",
        type: "app",
      },
    },
  },

  // 21. Imposter Syndrome
  {
    id: "imposter-syndrome",
    patterns: ["imposter", "impostor", "fraud-syndrome", "clance", "fake-feeling", "penipu", "hochstapler", "syndrome-imposteur"],
    en: {
      quizTitle: "Clance Imposter Phenomenon Scale (CIPS)",
      quizEyebrow: "Workplace Psychology Assessment",
      quizDescription: "Assess intellectual self-doubt, fear of being exposed as a fraud, and success discounting in 90 seconds.",
      quizBadge: "⏱️ 90 Seconds · Clance Scale · 100% Free",
      quizHref: "/quiz/imposter-syndrome",
      primaryButtonLabel: "Take Imposter Syndrome Test",
      secondaryTool: {
        title: "Cognitive Journaling AI",
        description: "Reframe irrational inadequacy thoughts with Ju's evidence-based reflections.",
        href: "/ai-journal",
        buttonLabel: "Start AI Journaling",
        type: "app",
      },
    },
    idLang: {
      quizTitle: "Tes Skrining Imposter Syndrome (Clance CIPS)",
      quizEyebrow: "Tes Psikologi Klinis",
      quizDescription: "Ukur seberapa dalam keraguan diri intelektual dan rasa takut dicap 'penipu' membatasi potensi kariermu.",
      quizBadge: "⏱️ 90 Detik · Skala Clance · 100% Gratis",
      quizHref: "/tes-imposter-syndrome",
      primaryButtonLabel: "Mulai Tes Imposter Gratis",
      secondaryTool: {
        title: "Jurnal Refleksi AI Nuju",
        description: "Urai distorsi kognitif rasa tidak pantas dengan refleksi empatik AI Ju.",
        href: "/ai-journal",
        buttonLabel: "Buka Jurnal AI",
        type: "app",
      },
    },
  },

  // 22. People Pleasing & Boundary Setting
  {
    id: "people-pleasing",
    patterns: ["people-pleas", "people-pleaser", "fawning", "boundary", "boundaries", "susah-menolak", "gak-enak-an", "jujue-kunan", "taohao-xing", "grenzen-setzen"],
    en: {
      quizTitle: "People Pleasing & Boundary Health Assessment",
      quizEyebrow: "Trauma Response Screener",
      quizDescription: "Determine whether your chronic compliance is a nervous system fawning reflex and evaluate boundary assertiveness.",
      quizBadge: "⏱️ 90 Seconds · Boundary Profiler · 100% Free",
      quizHref: "/quiz/people-pleasing",
      primaryButtonLabel: "Take People Pleaser Test",
      secondaryTool: {
        title: "Assertive Boundary Prompts",
        description: "Practice saying no without crippling guilt using guided journaling exercises.",
        href: "/ai-journal",
        buttonLabel: "Practice Boundaries",
        type: "app",
      },
    },
    idLang: {
      quizTitle: "Tes Sindrom People Pleaser & Batasan Diri",
      quizEyebrow: "Skrining Respon Trauma",
      quizDescription: "Cari tahu apakah rasa bersalah saat berkata 'tidak' berakar dari trauma masa lalu atau fawning response.",
      quizBadge: "⏱️ 90 Detik · Evaluasi Batasan · 100% Gratis",
      quizHref: "/tes-people-pleaser",
      primaryButtonLabel: "Mulai Tes People Pleaser",
      secondaryTool: {
        title: "Prompt Latihan Batasan Sehat",
        description: "Latih keberanian menetapkan batasan tanpa rasa cemas berlebih.",
        href: "/ai-journal",
        buttonLabel: "Buka Jurnal Batasan",
        type: "app",
      },
    },
  },

  // 23. Inner Child Healing
  {
    id: "inner-child",
    patterns: ["inner-child", "luka-batin", "luka-masa-kecil", "reparenting", "childhood-trauma", "inneres-kind", "enfant-interieur", "family-scapegoat", "bouc-emissaire", "narcissistic-family", "famille-toxique", "family-trauma", "mandeville"],
    en: {
      quizTitle: "Inner Child Wounding & Reparenting Assessment",
      quizEyebrow: "Psychodynamic Attachment Screener",
      quizDescription: "Identify whether unmet childhood needs (abandonment, shame, guilt, neglect) still dictate your adult triggers.",
      quizBadge: "⏱️ 2 Minutes · Clinical Framework · 100% Free",
      quizHref: "/quiz/inner-child",
      primaryButtonLabel: "Take Inner Child Test",
      secondaryTool: {
        title: "Reparenting Dialogue Journal",
        description: "Hold safe conversations between your adult self and younger self inside Nuju.",
        href: "/ai-journal",
        buttonLabel: "Start Reparenting",
        type: "app",
      },
    },
    idLang: {
      quizTitle: "Tes Skrining Luka Batin Inner Child",
      quizEyebrow: "Tes Psikodinamika Mandiri",
      quizDescription: "Identifikasi luka pengabaian, kritik keras, atau pengorbanan masa kecil yang masih memicu kecemasan dewasamu.",
      quizBadge: "⏱️ 2 Menit · Asesmen Mendalam · 100% Gratis",
      quizHref: "/quiz/luka-inner-child",
      primaryButtonLabel: "Mulai Tes Inner Child",
      secondaryTool: {
        title: "Dialog Pemulihan Inner Child",
        description: "Beri ruang aman bagi bagian dirimu yang terluka untuk didengar.",
        href: "/ai-journal",
        buttonLabel: "Buka Jurnal Pemulihan",
        type: "app",
      },
    },
  },

  // 24. Polyvagal & Nervous System
  {
    id: "nervous-system",
    patterns: [
      "nervous-system",
      "polyvagal",
      "sistem-saraf",
      "fight-or-flight",
      "freeze-response",
      "dorsal-vagal",
      "ventral-vagal",
      "stephen-porges",
      "autonomic-nervous",
      "vagustherapie",
    ],
    en: {
      quizTitle: "Polyvagal Nervous System State Screener",
      quizEyebrow: "Stephen Porges Autonomic Model",
      quizDescription: "Map whether your body is stuck in hyperarousal (fight/flight), hypoarousal (dorsal freeze), or social engagement.",
      quizBadge: "⏱️ 90 Seconds · Autonomic Check · 100% Free",
      quizHref: "/quiz/nervous-system",
      primaryButtonLabel: "Map My Nervous System",
      secondaryTool: {
        title: "Physiological Sigh Breathwork",
        description: "Instant autonomic down-regulation to stimulate the ventral vagal brake.",
        href: "/tools/physiological-sigh",
        buttonLabel: "Try Breathwork Tool",
        type: "tool",
      },
    },
    idLang: {
      quizTitle: "Tes Regulasi Sistem Saraf & Teori Polivagal",
      quizEyebrow: "Model Stephen Porges",
      quizDescription: "Ketahui apakah tubuhmu terjebak dalam mode fight-or-flight (hiperaktif) atau dorsal freeze (mati rasa & lemas).",
      quizBadge: "⏱️ 90 Detik · Pemetaan Otonom · 100% Gratis",
      quizHref: "/tes-saraf",
      primaryButtonLabel: "Mulai Tes Sistem Saraf",
      secondaryTool: {
        title: "Latihan Napas Physiological Sigh",
        description: "Turunkan ketegangan saraf simpatik seketika lewat tarikan napas ganda.",
        href: "/tools/physiological-sigh",
        buttonLabel: "Coba Latihan Napas",
        type: "tool",
      },
    },
  },

  // 25. Rejection Sensitive Dysphoria (RSD)
  {
    id: "rsd",
    patterns: ["rejection-sensitive", "rsd", "dysphoria", "fear-of-rejection", "takut-ditolak", "sensitif-penolakan", "william-dodson"],
    en: {
      quizTitle: "Rejection Sensitive Dysphoria (RSD) Screener",
      quizEyebrow: "Neurodivergent Emotional Screener",
      quizDescription: "Screen for acute physical and emotional vulnerability to perceived criticism, failure, or social rejection.",
      quizBadge: "⏱️ 90 Seconds · Clinical Screener · 100% Free",
      quizHref: "/quiz/rsd",
      primaryButtonLabel: "Take RSD Screener",
      secondaryTool: {
        title: "Sensory Grounding Lab",
        description: "Anchor autonomic spike through tactile 5-4-3-2-1 bilateral focus.",
        href: "/tools/grounding",
        buttonLabel: "Open Grounding Lab",
        type: "tool",
      },
    },
    idLang: {
      quizTitle: "Tes Skrining Rejection Sensitive Dysphoria (RSD)",
      quizEyebrow: "Asesmen Neurodivergen",
      quizDescription: "Ukur intensitas rasa sakit fisik-emosional yang muncul seketika saat kamu merasa dikritik atau diabaikan.",
      quizBadge: "⏱️ 90 Detik · Evaluasi Sensitivitas · 100% Gratis",
      quizHref: "/tes-rsd",
      primaryButtonLabel: "Mulai Tes RSD Gratis",
      secondaryTool: {
        title: "Sensory Grounding 5-4-3-2-1",
        description: "Redakan ledakan emosi mendadak dengan stimulasi indra.",
        href: "/tools/grounding",
        buttonLabel: "Buka Grounding Lab",
        type: "tool",
      },
    },
  },

  // 26. Highly Sensitive Person (HSP)
  {
    id: "hsp",
    patterns: [
      "highly-sensitive",
      "hsp",
      "elaine-aron",
      "sensory-processing-sensitivity",
      "sps",
      "terlalu-sensitif",
      "hochsensibel",
      "hochsensibilitaet",
      "hypersensible",
    ],
    en: {
      quizTitle: "Elaine Aron Highly Sensitive Person (HSP) Scale",
      quizEyebrow: "Sensory Processing Sensitivity Test",
      quizDescription: "Assess sensory threshold, emotional empathy depth, and overwhelm triggers across 12 psychometric markers.",
      quizBadge: "⏱️ 90 Seconds · Elaine Aron Scale · 100% Free",
      quizHref: "/quiz/hsp",
      primaryButtonLabel: "Take Free HSP Test",
      secondaryTool: {
        title: "Ambient Sound Sanctuary",
        description: "Curated pink and brown noise landscapes to soothe sensory overload.",
        href: "/tools/soundscapes",
        buttonLabel: "Enter Sound Sanctuary",
        type: "tool",
      },
    },
    idLang: {
      quizTitle: "Tes Skala Highly Sensitive Person (HSP)",
      quizEyebrow: "Model Dr. Elaine Aron",
      quizDescription: "Ketahui apakah kamu memiliki tipe kepribadian HSP dengan kepekaan sensori tinggi dan empati mendalam.",
      quizBadge: "⏱️ 90 Detik · Skala Elaine Aron · 100% Gratis",
      quizHref: "/tes-hsp",
      primaryButtonLabel: "Mulai Tes HSP Gratis",
      secondaryTool: {
        title: "Sound Sanctuary Nuju",
        description: "Frekuensi suara menenangkan untuk meredakan stimulasi berlebih.",
        href: "/tools/soundscapes",
        buttonLabel: "Buka Sound Sanctuary",
        type: "tool",
      },
    },
  },

  // 27. Perfectionism & Fear of Failure
  {
    id: "perfectionism",
    patterns: [
      "perfectionism",
      "perfeksionis",
      "maladaptive-perfectionism",
      "frost-mps",
      "fear-of-failure",
      "takut-gagal",
      "perfektionismus",
      "syndrome-bon-eleve",
      "wanbyeokjuui",
    ],
    en: {
      quizTitle: "Frost Multidimensional Perfectionism Scale (FMPS)",
      quizEyebrow: "Cognitive Behavioral Assessment",
      quizDescription: "Determine whether your perfectionism is healthy striving or paralyzing maladaptive self-sabotage.",
      quizBadge: "⏱️ 90 Seconds · Frost Scale · 100% Free",
      quizHref: "/quiz/perfectionism",
      primaryButtonLabel: "Take Perfectionism Test",
      secondaryTool: {
        title: "Self-Compassion AI Reflection",
        description: "Dismantle harsh internal critics through Kristin Neff's self-compassion framework.",
        href: "/ai-journal",
        buttonLabel: "Practice Self-Compassion",
        type: "app",
      },
    },
    idLang: {
      quizTitle: "Tes Skala Perfeksionisme Maladaptif (Frost MPS)",
      quizEyebrow: "Asesmen Kognitif Perilaku",
      quizDescription: "Cari tahu apakah standar tinggi yang kamu tetapkan memacumu bertumbuh atau justru memicu prokrastinasi ekstrem.",
      quizBadge: "⏱️ 90 Detik · Skala Frost · 100% Gratis",
      quizHref: "/tes-perfeksionisme",
      primaryButtonLabel: "Mulai Tes Perfeksionisme",
      secondaryTool: {
        title: "Jurnal Self-Compassion AI",
        description: "Redakan suara kritik batin yang kejam dengan belas kasih pada diri sendiri.",
        href: "/ai-journal",
        buttonLabel: "Buka Jurnal AI",
        type: "app",
      },
    },
  },

  // 28. Trauma Bonding & Intermittent Reinforcement
  {
    id: "trauma-bonding",
    patterns: [
      "trauma-bond",
      "trauma-bonding",
      "intermittent-reinforcement",
      "toxic-relationship",
      "hubungan-toksik",
      "patrick-carnes",
      "traumabindung",
    ],
    en: {
      quizTitle: "Trauma Bonding & Intermittent Reinforcement Screener",
      quizEyebrow: "Dr. Patrick Carnes Model",
      quizDescription: "Assess biological attachment to harmful dynamics, reward-punishment addiction, and breakup withdrawal.",
      quizBadge: "⏱️ 90 Seconds · Clinical Screener · 100% Free",
      quizHref: "/quiz/trauma-bonding",
      primaryButtonLabel: "Take Trauma Bond Screener",
      secondaryTool: {
        title: "Emotional Clarity Journal",
        description: "Track reality vs fantasy projections in toxic relationships.",
        href: "/ai-journal",
        buttonLabel: "Start Clarity Entry",
        type: "app",
      },
    },
    idLang: {
      quizTitle: "Tes Skrining Keterikatan Trauma (Trauma Bonding)",
      quizEyebrow: "Model Dr. Patrick Carnes",
      quizDescription: "Pahami apakah siklus putus-nyambung yang menyiksa merupakan adiksi neurokimia penguatan intermiten.",
      quizBadge: "⏱️ 90 Detik · Evaluasi Relasi · 100% Gratis",
      quizHref: "/tes-trauma-bonding",
      primaryButtonLabel: "Mulai Tes Trauma Bonding",
      secondaryTool: {
        title: "Jurnal Kejernihan Relasi",
        description: "Dokumentasikan fakta emosional untuk melepaskan diri dari siklus manipulasi.",
        href: "/ai-journal",
        buttonLabel: "Buka Jurnal Relasi",
        type: "app",
      },
    },
  },

  // 29. Cortisol & Somatic Stress
  {
    id: "cortisol-stress",
    patterns: [
      "cortisol",
      "kortisol",
      "adrenal",
      "chronic-stress-body",
      "allostatic-load",
      "hpa-axis",
      "morning-dread",
      "allostatic",
    ],
    en: {
      quizTitle: "Cortisol Dysregulation & Somatic Stress Check",
      quizEyebrow: "Neuroendocrine Stress Index",
      quizDescription: "Screen for physical signs of elevated morning cortisol, HPA-axis burnout, and chronic somatic strain.",
      quizBadge: "⏱️ 90 Seconds · Somatic Check · 100% Free",
      quizHref: "/quiz/cortisol-stress",
      primaryButtonLabel: "Check My Cortisol State",
      secondaryTool: {
        title: "NSDR Neuro-Reset Audio",
        description: "Down-regulate sympathetic adrenal tone in 10 minutes without stimulants.",
        href: "/tools/nsdr",
        buttonLabel: "Start NSDR Reset",
        type: "tool",
      },
    },
    idLang: {
      quizTitle: "Tes Tingkat Stres Kortisol & Beban Somatik",
      quizEyebrow: "Indeks Stres Neuroendokrin",
      quizDescription: "Deteksi tanda-tanda fisik lonjakan hormon kortisol kronis, kabut otak pagi hari, dan kelelahan kelenjar adrenal.",
      quizBadge: "⏱️ 90 Detik · Skrining Somatik · 100% Gratis",
      quizHref: "/tes-stres-kortisol",
      primaryButtonLabel: "Mulai Tes Kortisol",
      secondaryTool: {
        title: "Audio Protokol NSDR",
        description: "Istirahat restoratif mendalam untuk menstabilkan poros stres HPA.",
        href: "/tools/nsdr",
        buttonLabel: "Buka Audio NSDR",
        type: "tool",
      },
    },
  },

  // 30. Revenge Bedtime Procrastination
  {
    id: "sleep-procrastination",
    patterns: [
      "revenge-bedtime",
      "prokrastinasi-tidur",
      "sleep-procrastination",
      "stay-up-late",
      "begadang",
      "midnight-scrolling",
      "bedtime-delay",
    ],
    en: {
      quizTitle: "Bedtime Procrastination Scale (BPS)",
      quizEyebrow: "Kroese Behavioral Sleep Model",
      quizDescription: "Evaluate the unconscious drive to reclaim autonomy through midnight scrolling and late-night sleep delay.",
      quizBadge: "⏱️ 90 Seconds · BPS Framework · 100% Free",
      quizHref: "/quiz/revenge-bedtime-procrastination",
      primaryButtonLabel: "Take Sleep Delay Screener",
      secondaryTool: {
        title: "Sleep Pacer Breathwork",
        description: "Sync heart-rate variability for deep, effortless sleep transition.",
        href: "/tools/sleep",
        buttonLabel: "Start Sleep Pacer",
        type: "tool",
      },
    },
    idLang: {
      quizTitle: "Tes Revenge Bedtime Procrastination (Skala BPS)",
      quizEyebrow: "Model Tidur Dr. Floor Kroese",
      quizDescription: "Cari tahu mengapa kamu enggan tidur meski mengantuk berat dan terus menatap layar ponsel hingga larut malam.",
      quizBadge: "⏱️ 90 Detik · Skala BPS · 100% Gratis",
      quizHref: "/tes-prokrastinasi-tidur",
      primaryButtonLabel: "Mulai Tes Begadang",
      secondaryTool: {
        title: "Sleep Pacer Pernapasan",
        description: "Panduan ritme napas untuk mengantuk secara alami.",
        href: "/tools/sleep",
        buttonLabel: "Buka Sleep Pacer",
        type: "tool",
      },
    },
  },

  // 31. Depersonalization / Derealization (DPDR)
  {
    id: "dpdr",
    patterns: [
      "dpdr",
      "dissociation",
      "depersonalization",
      "derealization",
      "disosiasi",
      "mati-rasa-dunia",
      "brain-fog-unreal",
    ],
    en: {
      quizTitle: "Cambridge Depersonalization Scale (CDS) Screener",
      quizEyebrow: "Dissociative State Assessment",
      quizDescription: "Screen feeling detached from your body, emotional numbness, and perception of the world as dreamlike.",
      quizBadge: "⏱️ 90 Seconds · Clinical CDS Scale · 100% Free",
      quizHref: "/quiz/dpdr",
      primaryButtonLabel: "Take the DPDR Screener",
      secondaryTool: {
        title: "5-4-3-2-1 Sensory Grounding",
        description: "Tactile reality anchoring to pull consciousness back into your physical body.",
        href: "/tools/grounding",
        buttonLabel: "Start Sensory Grounding",
        type: "tool",
      },
    },
    idLang: {
      quizTitle: "Tes Skrining Depersonalisasi & Derealisasi (DPDR)",
      quizEyebrow: "Skala Disosiasi Klinis",
      quizDescription: "Evaluasi perasaan terpisah dari tubuh sendiri atau sensasi hidup seperti dalam mimpi dan autopilot.",
      quizBadge: "⏱️ 90 Detik · Skrining Klinis · 100% Gratis",
      quizHref: "/tes-dpdr",
      primaryButtonLabel: "Mulai Tes DPDR Gratis",
      secondaryTool: {
        title: "Grounding Sensorik 5-4-3-2-1",
        description: "Jangkar fisik untuk mengembalikan kesadaran penuh ke dalam raga.",
        href: "/tools/grounding",
        buttonLabel: "Buka Sensory Grounding",
        type: "tool",
      },
    },
  },

  // 32. Shadow Work & Repressed Archetypes
  {
    id: "shadow-work",
    patterns: [
      "shadow-work",
      "shadow-test",
      "bayangan-diri",
      "schattenarbeit",
      "jungian-shadow",
      "proyeksi-psikologis",
    ],
    en: {
      quizTitle: "Jungian Shadow Archetype Diagnostic",
      quizEyebrow: "Analytical Depth Psychology",
      quizDescription: "Uncover unconscious behavioral sabotage, repressed emotions, and projection blindspots.",
      quizBadge: "⏱️ 90 Seconds · Jungian Archetype · 100% Free",
      quizHref: "/quiz/shadow-work",
      primaryButtonLabel: "Reveal My Shadow Archetype",
      secondaryTool: {
        title: "EMDR Bilateral Acoustic Lab",
        description: "Process unconscious emotional resistance with bilateral audio entrainment.",
        href: "/tools/bilateral",
        buttonLabel: "Try Bilateral Lab",
        type: "tool",
      },
    },
    idLang: {
      quizTitle: "Tes Arketipe Bayangan Diri (Jungian Shadow Work)",
      quizEyebrow: "Psikologi Kedalaman Carl Jung",
      quizDescription: "Bongkar pemicu emosi bawah sadar, rasa benci yang tak beralasan pada orang lain, dan bagian diri yang kamu sembunyikan.",
      quizBadge: "⏱️ 90 Detik · Model Jungian · 100% Gratis",
      quizHref: "/tes-shadow-work",
      primaryButtonLabel: "Mulai Tes Shadow Work",
      secondaryTool: {
        title: "Stimulasi Bilateral EMDR",
        description: "Integrasikan emosi bawah sadar dengan stimulasi pendengaran bilateral yang menenangkan.",
        href: "/tools/bilateral",
        buttonLabel: "Buka Lab Bilateral",
        type: "tool",
      },
    },
  },
];

export const MULTILINGUAL_FRAMES: Record<string, {
  eyebrow: string;
  badge: string;
  buttonLabel: string;
  toolButtonLabel: string;
}> = {
  en: {
    eyebrow: "Validated Clinical Assessment",
    badge: "⏱️ 90 Seconds · Clinical Screener · 100% Free",
    buttonLabel: "Take Free Test",
    toolButtonLabel: "Try Tool",
  },
  id: {
    eyebrow: "Tes Klinis Interaktif",
    badge: "⏱️ 90 Detik · Skrining Klinis · 100% Gratis",
    buttonLabel: "Mulai Tes Gratis",
    toolButtonLabel: "Buka Alat",
  },
  de: {
    eyebrow: "Klinischer Selbsttest",
    badge: "⏱️ 90 Sekunden · Wissenschaftlich fundiert · 100% Kostenlos",
    buttonLabel: "Kostenlosen Test starten",
    toolButtonLabel: "Tool ausprobieren",
  },
  fr: {
    eyebrow: "Évaluation Clinique Gratuite",
    badge: "⏱️ 90 Secondes · Basé sur la science · 100% Gratuit",
    buttonLabel: "Commencer le test gratuit",
    toolButtonLabel: "Essayer l'outil",
  },
  es: {
    eyebrow: "Evaluación Clínica Gratuita",
    badge: "⏱️ 90 Segundos · Basado en evidencia · 100% Gratis",
    buttonLabel: "Comenzar test gratis",
    toolButtonLabel: "Probar herramienta",
  },
  ja: {
    eyebrow: "無料セルフ心理診断",
    badge: "⏱️ 90秒 · 科学的根拠 · 完全無料",
    buttonLabel: "無料診断をスタート",
    toolButtonLabel: "ツールを開く",
  },
  ko: {
    eyebrow: "전문 심리 자가진단",
    badge: "⏱️ 90초 · 임상 기반 · 100% 무료",
    buttonLabel: "무료 진단 시작하기",
    toolButtonLabel: "도구 열기",
  },
  zh: {
    eyebrow: "专业心理自我评估",
    badge: "⏱️ 90秒 · 科学循证 · 100% 免费",
    buttonLabel: "开始免费测评",
    toolButtonLabel: "体验练习工具",
  },
};

const MULTILINGUAL_TOOLS: Record<string, Record<string, { title: string; description: string; buttonLabel: string }>> = {
  "physiological-sigh": {
    en: {
      title: "Physiological Sigh Breathwork",
      description: "2-minute rapid neuro-vagal reset to halt autonomic panic on demand.",
      buttonLabel: "Try Breathwork Tool",
    },
    id: {
      title: "Latihan Napas Physiological Sigh",
      description: "Regulasi detak jantung cepat dan ketegangan saraf dalam 2 menit saat panik melanda.",
      buttonLabel: "Buka Alat Pernapasan",
    },
    de: {
      title: "Physiological Sigh Atemübung",
      description: "2-Minuten-Neuro-Vagus-Reset zur sofortigen Beruhigung des Nervensystems bei Panik.",
      buttonLabel: "Atemübung öffnen",
    },
    fr: {
      title: "Respiration du Soupir Physiologique",
      description: "Réinitialisation neuro-vagale rapide en 2 minutes pour stopper l'anxiété aiguë.",
      buttonLabel: "Essayer l'exercice",
    },
    es: {
      title: "Respiración del Suspiro Fisiológico",
      description: "Reinicio neuro-vagal rápido en 2 minutos para calmar el pánico y la taquicardia.",
      buttonLabel: "Probar respiración",
    },
    ja: {
      title: "生理的ため息 (呼吸エクササイズ)",
      description: "自律神経を整え、突発的なパニックや動悸を2分でリセットします。",
      buttonLabel: "呼吸ツールを開く",
    },
    ko: {
      title: "생리적 한숨 (호흡 리셋 훈련)",
      description: "2분 만에 자율신경계를 안정시키고 급성 불안을 가라앉히는 호흡 프로토콜.",
      buttonLabel: "호흡 도구 열기",
    },
    zh: {
      title: "生理性叹息呼吸练习",
      description: "2分钟快速迷走神经复位，即时平息突发性惊恐与心跳加速。",
      buttonLabel: "体验呼吸引导",
    },
  },
  "box-breathing": {
    en: {
      title: "Box Breathing Pacer",
      description: "4x4 rhythmic breath stabilization to prevent respiratory distress in tight spaces.",
      buttonLabel: "Open Box Breathing",
    },
    id: {
      title: "Box Breathing 4x4",
      description: "Latihan napas terstruktur untuk menenangkan rasa sesak dan panik di situasi tegang.",
      buttonLabel: "Buka Box Breathing",
    },
    de: {
      title: "Box Breathing 4x4 Taktgeber",
      description: "4x4-Rhythmus-Atemstabilisierung zur Beruhigung von Herzrasen und Engegefühlen.",
      buttonLabel: "Box Breathing öffnen",
    },
    fr: {
      title: "Respiration Carrée 4x4",
      description: "Stabilisation respiratoire rythmée 4x4 pour apaiser l'oppression et l'anxiété.",
      buttonLabel: "Ouvrir Respiration Carrée",
    },
    es: {
      title: "Respiración Cuadrada 4x4",
      description: "Estabilización rítmica 4x4 para prevenir la hiperventilación y calmar la tensión.",
      buttonLabel: "Abrir respiración cuadrada",
    },
    ja: {
      title: "ボックスブリージング (4x4 呼吸法)",
      description: "4秒吸って4秒止めるリズミカルな呼吸で、閉塞感や高ぶった神経を鎮めます。",
      buttonLabel: "呼吸法を開く",
    },
    ko: {
      title: "박스 호흡법 4x4",
      description: "규칙적인 4x4 호흡 페이서로 답답함과 교감신경의 긴장을 완화합니다.",
      buttonLabel: "박스 호흡 열기",
    },
    zh: {
      title: "四方呼吸节律练习 4x4",
      description: "4x4 节奏呼吸稳定法，防止过度通气，迅速平复窒息感与焦虑。",
      buttonLabel: "打开四方呼吸",
    },
  },
  "grounding": {
    en: {
      title: "5-4-3-2-1 Sensory Grounding",
      description: "Interrupt symptom-spiraling and return your senses to immediate tangible reality.",
      buttonLabel: "Start Sensory Grounding",
    },
    id: {
      title: "Sensory Grounding 5-4-3-2-1",
      description: "Hentikan overthinking liar dan jangkar kembali kesadaranmu pada dunia nyata.",
      buttonLabel: "Buka Sensory Grounding",
    },
    de: {
      title: "5-4-3-2-1 Sensorische Erdung",
      description: "Unterbrechen Sie Gedankenspiralen und verankern Sie Ihre Sinne im Hier und Jetzt.",
      buttonLabel: "Sensorische Erdung starten",
    },
    fr: {
      title: "Ancrage Sensoriel 5-4-3-2-1",
      description: "Interrompez la spirale mentale et ancrez vos sens dans la réalité tangible.",
      buttonLabel: "Démarrer l'ancrage",
    },
    es: {
      title: "Anclaje Sensorial 5-4-3-2-1",
      description: "Interrumpe la espiral catastrófica y ancla tus sentidos en el presente tangible.",
      buttonLabel: "Iniciar anclaje sensorial",
    },
    ja: {
      title: "5-4-3-2-1 感覚グラウンディング",
      description: "暴走する思考ループを断ち切り、五感を今ここにある現実に引き戻します。",
      buttonLabel: "グラウンディングを開始",
    },
    ko: {
      title: "5-4-3-2-1 감각 그라운딩",
      description: "통제 불능의 생각 소용돌이를 멈추고 오감을 통해 현재로 주의를 되돌립니다.",
      buttonLabel: "감각 그라운딩 시작",
    },
    zh: {
      title: "5-4-3-2-1 感官着陆练习",
      description: "打断内耗联想，将注意力牢牢锚定在可触碰的当下现实。",
      buttonLabel: "开始感官着陆",
    },
  },
  "nsdr": {
    en: {
      title: "NSDR Deep Rest Protocol",
      description: "A 10-minute audio protocol to recharge mental bandwidth without screen exposure.",
      buttonLabel: "Try NSDR Session",
    },
    id: {
      title: "NSDR (Non-Sleep Deep Rest)",
      description: "Relaksasi mendalam 10 menit tanpa layar untuk memulihkan energi otak yang jenuh.",
      buttonLabel: "Buka Sesi NSDR",
    },
    de: {
      title: "NSDR Tiefenentspannungs-Protokoll",
      description: "10-minütige neurobiologische Ruhepause zur Wiederherstellung geistiger Klarheit ohne Bildschirm.",
      buttonLabel: "NSDR-Sitzung starten",
    },
    fr: {
      title: "Protocole de Repos Profond NSDR",
      description: "10 minutes de récupération audio profonde pour restaurer votre clarté mentale sans écran.",
      buttonLabel: "Lancer la session NSDR",
    },
    es: {
      title: "Protocolo de Descanso Profundo NSDR",
      description: "10 minutos de reinicio neurobiológico sin pantalla para recuperar energía mental.",
      buttonLabel: "Probar sesión NSDR",
    },
    ja: {
      title: "NSDR (非睡眠性ディープ・レスト)",
      description: "画面を見ずに10分間聴くだけで脳の疲労を急速回復させるリセット音源。",
      buttonLabel: "NSDRセッションを開く",
    },
    ko: {
      title: "NSDR (비수면 깊은 휴식)",
      description: "화면 없이 10분 동안 뇌의 인지 대역폭과 집중력을 회복시키는 오디오 휴식법.",
      buttonLabel: "NSDR 세션 시작",
    },
    zh: {
      title: "NSDR 非睡眠深层休息方案",
      description: "无需屏幕接触的10分钟音频复位，恢复多巴胺与认知带宽。",
      buttonLabel: "开启 NSDR 休息",
    },
  },
  "sleep": {
    en: {
      title: "Sleep Pacer (4-7-8 Breathing)",
      description: "Promote natural pre-sleep melatonin release without grazing or screen stimulation.",
      buttonLabel: "Open Sleep Pacer",
    },
    id: {
      title: "Sleep Pacer 4-7-8",
      description: "Panduan napas ritmik untuk merangsang kantuk alami tanpa godaan ngemil tengah malam.",
      buttonLabel: "Buka Sleep Pacer",
    },
    de: {
      title: "Sleep Pacer (4-7-8 Atemübung)",
      description: "Sanfter Einschlafbegleiter zur Aktivierung der natürlichen Melatoninausschüttung.",
      buttonLabel: "Sleep Pacer öffnen",
    },
    fr: {
      title: "Guide de Sommeil (Respiration 4-7-8)",
      description: "Rythme respiratoire apaisant pour faciliter l'endormissement naturel sans écran.",
      buttonLabel: "Ouvrir le guide sommeil",
    },
    es: {
      title: "Guía de Sueño (Respiración 4-7-8)",
      description: "Ritmo respiratorio relajante para activar el sistema parasimpático y conciliar el sueño.",
      buttonLabel: "Abrir guía de sueño",
    },
    ja: {
      title: "スリープペーサー (4-7-8 睡眠呼吸)",
      description: "就寝前の副交感神経を優位にし、自然な入眠を促す呼吸ガイド。",
      buttonLabel: "スリープペーサーを開く",
    },
    ko: {
      title: "수면 페이서 (4-7-8 수면 호흡)",
      description: "부교감신경을 자극하여 자연스러운 졸음을 유도하는 취침 전 호흡 가이드.",
      buttonLabel: "수면 페이서 열기",
    },
    zh: {
      title: "助眠节律器 (4-7-8 呼吸引导)",
      description: "温和的睡前节律呼吸引导，激活副交感神经，帮助自然入眠。",
      buttonLabel: "打开助眠节律器",
    },
  },
  "bilateral": {
    en: {
      title: "EMDR Bilateral Audio Lab",
      description: "Bilateral acoustic stimulation to gently modulate acute emotional dysregulation.",
      buttonLabel: "Try Bilateral Lab",
    },
    id: {
      title: "Stimulasi Bilateral EMDR",
      description: "Audio ritmis kiri-kanan untuk meredakan ledakan emosi dan kecemasan intens.",
      buttonLabel: "Buka Lab Bilateral",
    },
    de: {
      title: "EMDR Bilaterale Stimulation",
      description: "Rhythmisches akustisches Signal zur Beruhigung emotionaler Übererregung.",
      buttonLabel: "Bilaterales Lab öffnen",
    },
    fr: {
      title: "Stimulation Bilatérale EMDR",
      description: "Stimulation sonore alternée gauche-droite pour apaiser l'hyper-activation émotionnelle.",
      buttonLabel: "Ouvrir le Lab Bilatéral",
    },
    es: {
      title: "Estimulación Bilateral EMDR",
      description: "Estimulación acústica alterna izquierda-derecha para reducir la sobrecarga emocional.",
      buttonLabel: "Abrir Lab Bilateral",
    },
    ja: {
      title: "EMDR 両側性音響刺激ラボ",
      description: "左右交互のリズム音で扁桃体の興奮を鎮め、感情の過負荷を解消します。",
      buttonLabel: "音響刺激ラボを開く",
    },
    ko: {
      title: "EMDR 양측성 청각 자극",
      description: "좌우 교대 음향 자극으로 편도체의 과열된 흥분을 가라앉히는 감정 조절 도구.",
      buttonLabel: "양측성 자극 열기",
    },
    zh: {
      title: "EMDR 双侧声学刺激练习",
      description: "左右交替的双耳节律声学刺激，舒缓过度激活的情绪警报系统。",
      buttonLabel: "体验双侧声学刺激",
    },
  },
  "vocal-toning": {
    en: {
      title: "Vocal Toning & Vagal Humming",
      description: "Somatic vocal cord exercise to relax laryngeal tension and stabilize your voice.",
      buttonLabel: "Open Vocal Lab",
    },
    id: {
      title: "Vocal Toning & Vagal Humming",
      description: "Latihan getaran pita suara untuk meredakan ketegangan tenggorokan sebelum bicara.",
      buttonLabel: "Buka Latihan Suara",
    },
    de: {
      title: "Vocal Toning & Vagus-Summen",
      description: "Somatische Kehlkopfvibrationen zur gezielten Aktivierung des Vagusnervs.",
      buttonLabel: "Vocal Lab öffnen",
    },
    fr: {
      title: "Vocal Toning & Bourdonnement Vagal",
      description: "Vibrations laryngées somatiques pour stimuler directement le nerf vague.",
      buttonLabel: "Ouvrir le Vocal Lab",
    },
    es: {
      title: "Tono Vocal y Zumbido Vagal",
      description: "Vibraciones laríngeas somáticas para activar directamente el nervio vago.",
      buttonLabel: "Abrir laboratorio vocal",
    },
    ja: {
      title: "発声トーニング & 迷走神経ハミング",
      description: "声帯の微細な振動を通じて迷走神経を刺激し、体のこわばりをほぐすワーク。",
      buttonLabel: "発声ラボを開く",
    },
    ko: {
      title: "보컬 토닝 & 미주신경 허밍",
      description: "성대 진동을 통해 미주신경을 직접 자극하여 목과 가슴의 긴장을 이완합니다.",
      buttonLabel: "보컬 랩 열기",
    },
    zh: {
      title: "发声调律与迷走神经嗡鸣练习",
      description: "利用喉部声带震动自主激活迷走神经，放松咽喉与胸部紧绷感。",
      buttonLabel: "打开调律练习",
    },
  },
};

const MULTILINGUAL_TOPIC_DATA: Record<string, Record<string, { quizTitle: string; quizDescription: string; primaryButtonLabel?: string }>> = {
  "burnout": {
    de: {
      quizTitle: "Burnout- & Erschöpfungstest (MBI-Methode)",
      quizDescription: "Messen Sie emotionale Erschöpfung, Zynismus und Leistungsabfall in 90 Sekunden.",
      primaryButtonLabel: "Kostenlosen Burnout-Test starten",
    },
    fr: {
      quizTitle: "Test d'Épuisement & Burnout (MBI)",
      quizDescription: "Évaluez votre épuisement émotionnel, dépersonnalisation et baisse d'efficacité en 90 secondes.",
      primaryButtonLabel: "Faire le test de burnout",
    },
    es: {
      quizTitle: "Test de Burnout y Agotamiento Emocional (MBI)",
      quizDescription: "Evalúa tu desgaste profesional, cinismo y eficacia laboral en 90 segundos.",
      primaryButtonLabel: "Hacer test de burnout",
    },
    ja: {
      quizTitle: "バーンアウト・燃え尽き症候群 診断 (MBI)",
      quizDescription: "感情的消耗、仕事への冷淡さ、自己効力感の低下を90秒で測定します。",
      primaryButtonLabel: "バーンアウト診断をスタート",
    },
    ko: {
      quizTitle: "번아웃 증후군 & 만성 피로 자가진단 (MBI)",
      quizDescription: "정서적 고갈, 업무 냉소주의, 직무 효능감 저하를 90초 만에 측정해 보세요.",
      primaryButtonLabel: "번아웃 진단 시작하기",
    },
    zh: {
      quizTitle: "职业倦怠与身心耗竭测试 (MBI)",
      quizDescription: "在90秒内评估您的情绪衰竭、去人性化倾向与个人成就感。",
      primaryButtonLabel: "开始倦怠测评",
    },
  },
  "depressive-rumination": {
    de: {
      quizTitle: "Grübel- & Overthinking-Test (RRS-Skala)",
      quizDescription: "Erkennen Sie chronische Gedankenschleifen, nächtliches Grübeln und mentale Blockaden in 90 Sekunden.",
      primaryButtonLabel: "Overthinking-Test starten",
    },
    fr: {
      quizTitle: "Test de Rumination & Overthinking (RRS)",
      quizDescription: "Détectez les boucles de pensées répétitives et l'overthinking nocturne en 90 secondes.",
      primaryButtonLabel: "Faire le test de rumination",
    },
    es: {
      quizTitle: "Test de Rumiación y Sobrepensamiento (RRS)",
      quizDescription: "Mide tus bucles mentales obsesivos y sobrepensamiento nocturno en 90 segundos.",
      primaryButtonLabel: "Hacer test de sobrepensamiento",
    },
    ja: {
      quizTitle: "反芻思考・夜の反省会 診断 (RRS)",
      quizDescription: "頭から離れないネガティブ思考のループや夜の過剰思考を90秒で測定します。",
      primaryButtonLabel: "反芻思考診断をスタート",
    },
    ko: {
      quizTitle: "반추 사고 & 야간 오버씽킹 자가진단 (RRS)",
      quizDescription: "머릿속을 맴도는 반복적인 후회와 새벽의 부정적 생각 고리를 90초 만에 진단하세요.",
      primaryButtonLabel: "오버씽킹 진단 시작하기",
    },
    zh: {
      quizTitle: "思维反刍与精神内耗自评 (RRS)",
      quizDescription: "在90秒内识别夜间反刍、思维停滞与习惯性自我苛责。",
      primaryButtonLabel: "开始内耗测评",
    },
  },
  "dass-21": {
    de: {
      quizTitle: "DASS-21 Selbsttest (Depression, Angst, Stress)",
      quizDescription: "Klinisch validierter 90-Sekunden-Screening-Test zur Erfassung Ihrer emotionalen Belastung.",
      primaryButtonLabel: "Kostenlosen DASS-21 Test starten",
    },
    fr: {
      quizTitle: "Test DASS-21 (Dépression, Anxiété, Stress)",
      quizDescription: "Évaluation clinique rapide de 90 secondes pour mesurer vos niveaux de stress et d'anxiété.",
      primaryButtonLabel: "Faire le test DASS-21",
    },
    es: {
      quizTitle: "Test DASS-21 (Depresión, Ansiedad y Estrés)",
      quizDescription: "Evaluación clínica rápida de 90 segundos para medir tus niveles de sobrecarga emocional.",
      primaryButtonLabel: "Hacer test DASS-21",
    },
    ja: {
      quizTitle: "DASS-21 メンタルヘルス診断 (不安・ストレス・抑うつ)",
      quizDescription: "90秒で現在のストレス値、不安レベル、気分の落ち込みを可視化します。",
      primaryButtonLabel: "DASS-21 診断をスタート",
    },
    ko: {
      quizTitle: "DASS-21 멘탈헬스 자가진단 (우울·불안·스트레스)",
      quizDescription: "90초 만에 현재의 정서적 스트레스, 불안 수치, 피로도를 객관적으로 확인하세요.",
      primaryButtonLabel: "멘탈헬스 진단 시작하기",
    },
    zh: {
      quizTitle: "DASS-21 心理健康量表 (抑郁·焦虑·压力)",
      quizDescription: "国际通用的90秒临床评估工具，清晰呈现您当下的情绪压力负荷。",
      primaryButtonLabel: "开始心理健康测评",
    },
  },
  "mood-battery": {
    de: {
      quizTitle: "Emotionale Batterie & Energie-Check",
      quizDescription: "Finden Sie in 60 Sekunden heraus, wo Ihre mentale Energie versiegt und wie Sie sie regenerieren.",
      primaryButtonLabel: "Energie-Check starten",
    },
    fr: {
      quizTitle: "Bilan de Batterie Émotionnelle",
      quizDescription: "Découvrez où s'échappe votre énergie mentale et comment recharger vos réserves en 60 secondes.",
      primaryButtonLabel: "Faire le bilan d'énergie",
    },
    es: {
      quizTitle: "Chequeo de Batería Emocional y Energía",
      quizDescription: "Descubre en 60 segundos por qué sientes agotamiento y cómo recargar tu energía mental.",
      primaryButtonLabel: "Comprobar batería emocional",
    },
    ja: {
      quizTitle: "メンタル・エネルギーバッテリー診断",
      quizDescription: "今の心のエネルギー残量と、気力を奪っている原因を60秒で測定します。",
      primaryButtonLabel: "バッテリー診断をスタート",
    },
    ko: {
      quizTitle: "멘탈 에너지 배터리 진단",
      quizDescription: "내 마음의 에너지 잔여량과 멘탈 소진 원인을 60초 만에 확인해 보세요.",
      primaryButtonLabel: "배터리 진단 시작하기",
    },
    zh: {
      quizTitle: "情绪电量与精神能量自测",
      quizDescription: "在60秒内了解自己当下的心理电量储备，找到能量流失的关键源头。",
      primaryButtonLabel: "自测心理电量",
    },
  },
  "adhd": {
    de: {
      quizTitle: "ADHS-Screening für Erwachsene (ASRS v1.1)",
      quizDescription: "Erkennen Sie exekutive Dysfunktion, Reizüberflutung und Hyperfokus-Zyklen in 90 Sekunden.",
      primaryButtonLabel: "ADHS-Test starten",
    },
    fr: {
      quizTitle: "Dépistage TDAH Adulte (ASRS v1.1)",
      quizDescription: "Évaluez la dysfonction exécutive, la surcharge sensorielle et l'inattention en 90 secondes.",
      primaryButtonLabel: "Faire le test TDAH",
    },
    es: {
      quizTitle: "Test de TDAH en Adultos (ASRS v1.1)",
      quizDescription: "Detecta disfunción ejecutiva, sobrecarga sensorial y dispersión mental en 90 segundos.",
      primaryButtonLabel: "Hacer test TDAH",
    },
    ja: {
      quizTitle: "大人のADHD・注意欠如多動症 診断 (ASRS)",
      quizDescription: "実行機能の低下、先延ばし、集中困難の傾向を90秒でセルフチェックします。",
      primaryButtonLabel: "ADHD診断をスタート",
    },
    ko: {
      quizTitle: "성인 ADHD 선별검사 (ASRS v1.1)",
      quizDescription: "집행기능 저하, 만성 미루기, 주의력 분산 경향을 90초 만에 확인하세요.",
      primaryButtonLabel: "ADHD 검사 시작하기",
    },
    zh: {
      quizTitle: "成人注意力缺陷自测 (ASRS v1.1)",
      quizDescription: "在90秒内测查执行功能受损、注意力涣散与习惯性拖延。",
      primaryButtonLabel: "开始ADHD自测",
    },
  },
  "attachment-style": {
    de: {
      quizTitle: "Bindungsstil-Test (ECR-R)",
      quizDescription: "Verstehen Sie Ihre Beziehungsmuster (ängstlich, vermeidend, sicher) in 90 Sekunden.",
      primaryButtonLabel: "Bindungs-Test starten",
    },
    fr: {
      quizTitle: "Test du Style d'Attachement (ECR-R)",
      quizDescription: "Comprenez vos mécanismes relationnels (anxieux, évitant ou sécurisant) en 90 secondes.",
      primaryButtonLabel: "Faire le test d'attachement",
    },
    es: {
      quizTitle: "Test de Estilos de Apego (ECR-R)",
      quizDescription: "Descubre tu estilo de apego (ansioso, evitativo o seguro) y cómo afecta a tus vínculos.",
      primaryButtonLabel: "Hacer test de apego",
    },
    ja: {
      quizTitle: "愛着スタイル診断 (不安型・回避型・安定型)",
      quizDescription: "対人関係や恋愛における心の距離感と愛着パターンを90秒で分析します。",
      primaryButtonLabel: "愛着スタイル診断をスタート",
    },
    ko: {
      quizTitle: "애착유형 검사 (불안형·회피형·안정형)",
      quizDescription: "연인 및 대인관계에서 나타나는 무의식적 애착 패턴을 90초 만에 파악하세요.",
      primaryButtonLabel: "애착유형 검사 시작하기",
    },
    zh: {
      quizTitle: "亲密关系依恋风格测评 (ECR-R)",
      quizDescription: "在90秒内探究您的依恋模式（焦虑型、回避型或安全型）。",
      primaryButtonLabel: "开始依恋模式测评",
    },
  },
  "inner-child": {
    de: {
      quizTitle: "Inneres-Kind-Test",
      quizDescription: "Erkennen Sie unbewusste emotionale Wunden aus der Vergangenheit und deren Einfluss auf heute.",
      primaryButtonLabel: "Inneres-Kind-Test starten",
    },
    fr: {
      quizTitle: "Test des Blessures de l'Enfant Intérieur",
      quizDescription: "Identifiez les blessures émotionnelles précoces et leur impact sur vos réactions actuelles.",
      primaryButtonLabel: "Faire le test enfant intérieur",
    },
    es: {
      quizTitle: "Test del Niño Interior y Heridas Emocionales",
      quizDescription: "Identifica heridas infantiles no resueltas que condicionan tus relaciones actuales.",
      primaryButtonLabel: "Hacer test niño interior",
    },
    ja: {
      quizTitle: "インナーチャイルド・トラウマ診断",
      quizDescription: "幼少期の感情の満たされなさが現在の不安や対人関係に与えている影響を測定します。",
      primaryButtonLabel: "診断をスタート",
    },
    ko: {
      quizTitle: "내면아이 상처 & 애착 결핍 자가진단",
      quizDescription: "어릴 적 미해결된 감정의 상처가 현재의 자존감과 관계에 미치는 영향을 확인하세요.",
      primaryButtonLabel: "내면아이 검사 시작하기",
    },
    zh: {
      quizTitle: "内在小孩伤痛与情绪模式自测",
      quizDescription: "探索成长经历中的未竟创伤，了解其对当前亲密关系与自尊的影响。",
      primaryButtonLabel: "开始内在小孩测评",
    },
  },
  "people-pleaser": {
    de: {
      quizTitle: "People-Pleaser & Grenzen-Test",
      quizDescription: "Prüfen Sie, ob die Angst vor Ablehnung Sie dazu bringt, Ihre eigenen Bedürfnisse zu vernachlässigen.",
      primaryButtonLabel: "Grenzen-Test starten",
    },
    fr: {
      quizTitle: "Test du People-Pleasing & Limites",
      quizDescription: "Découvrez si la peur de décevoir vous empêche de poser des limites saines.",
      primaryButtonLabel: "Faire le test limites",
    },
    es: {
      quizTitle: "Test de Complacencia y Límites Personales",
      quizDescription: "Evalúa si el miedo al rechazo te impide decir 'no' y cuidar de ti mismo.",
      primaryButtonLabel: "Hacer test de complacencia",
    },
    ja: {
      quizTitle: "いい人・気遣い疲れ 診断 (境界線テスト)",
      quizDescription: "断れない性格、他人の顔色伺い、自己犠牲のパターンを90秒で診断します。",
      primaryButtonLabel: "気遣い疲れ診断をスタート",
    },
    ko: {
      quizTitle: "착한 사람 콤플렉스 & 눈치 피로도 진단",
      quizDescription: "거절에 대한 두려움과 과도한 타인 배려로 지친 마음을 객관적으로 점검하세요.",
      primaryButtonLabel: "피로도 진단 시작하기",
    },
    zh: {
      quizTitle: "讨好型人格与人际边界评估",
      quizDescription: "在90秒内测查难以拒绝、过度顾及他人脸色与自我压抑倾向。",
      primaryButtonLabel: "开始边界测评",
    },
  },
  "sleep-procrastination": {
    de: {
      quizTitle: "Revenge Bedtime Prokrastinations-Test",
      quizDescription: "Verstehen Sie, warum Sie trotz Müdigkeit bis spät in die Nacht am Smartphone kleben.",
      primaryButtonLabel: "Schlaf-Test starten",
    },
    fr: {
      quizTitle: "Test de Procrastination du Sommeil",
      quizDescription: "Comprenez pourquoi vous repoussez le coucher devant un écran malgré la fatigue.",
      primaryButtonLabel: "Faire le test sommeil",
    },
    es: {
      quizTitle: "Test de Procrastinación del Sueño",
      quizDescription: "Descubre por qué sacrificas horas de sueño frente a la pantalla a pesar de estar agotado.",
      primaryButtonLabel: "Hacer test de sueño",
    },
    ja: {
      quizTitle: "リベンジ夜更かし・睡眠先延ばし 診断",
      quizDescription: "眠いのにスマホを手放せず夜更かししてしまう心理的要因を90秒で診断します。",
      primaryButtonLabel: "夜更かし診断をスタート",
    },
    ko: {
      quizTitle: "수면 미루기(취침 보상 지연) 자가진단",
      quizDescription: "피곤한데도 잠들지 못하고 스마트폰을 보며 밤을 지새우는 이유를 확인하세요.",
      primaryButtonLabel: "수면 미루기 진단 시작하기",
    },
    zh: {
      quizTitle: "报复性熬夜与睡眠拖延测评",
      quizDescription: "在90秒内测查身心俱疲却无法放下手机入睡的心理机制。",
      primaryButtonLabel: "开始睡眠拖延测评",
    },
  },
  "imposter-syndrome": {
    de: {
      quizTitle: "Hochstapler-Syndrom Test (CIPS)",
      quizDescription: "Erfahren Sie, ob Sie Ihre eigenen Erfolge dem Zufall zuschreiben und Angst haben aufzufliegen.",
      primaryButtonLabel: "Hochstapler-Test starten",
    },
    fr: {
      quizTitle: "Test du Syndrome de l'Imposteur (CIPS)",
      quizDescription: "Déterminez si vous doutez constamment de vos réussites légitimes en 90 secondes.",
      primaryButtonLabel: "Faire le test imposteur",
    },
    es: {
      quizTitle: "Test del Síndrome del Impostor (CIPS)",
      quizDescription: "Descubre si atribuyes tus logros a la suerte y temes ser 'descubierto'.",
      primaryButtonLabel: "Hacer test del impostor",
    },
    ja: {
      quizTitle: "インポスター症候群 診断 (CIPS)",
      quizDescription: "実力不足がいつか周囲にバレるのではという不安を90秒で測定します。",
      primaryButtonLabel: "インポスター診断をスタート",
    },
    ko: {
      quizTitle: "가면 증후군(임포스터 신드롬) 자가진단 (CIPS)",
      quizDescription: "자신의 성취를 운으로 돌리고 능력을 의심하는 심리 상태를 90초 만에 점검하세요.",
      primaryButtonLabel: "가면증후군 검사 시작하기",
    },
    zh: {
      quizTitle: "冒名顶替综合征评估 (CIPS)",
      quizDescription: "评估您是否习惯性低估自身能力、将成功归咎于运气并害怕被拆穿。",
      primaryButtonLabel: "开始冒名顶替自评",
    },
  },
  "toxic-positivity": {
    de: {
      quizTitle: "Toxische Positivität & Emotionsunterdrückungs-Test",
      quizDescription: "Prüfen Sie, ob falsche Zuversicht Ihre echten Gefühle blockiert.",
      primaryButtonLabel: "Test starten",
    },
    fr: {
      quizTitle: "Test de Positivité Toxique & Déni Émotionnel",
      quizDescription: "Découvrez si l'obligation d'aller bien masque vos réelles blessures.",
      primaryButtonLabel: "Faire le test",
    },
    es: {
      quizTitle: "Test de Positividad Tóxica e Invalidación Emocional",
      quizDescription: "Evalúa si la positividad forzada está reprimiendo tus emociones genuinas.",
      primaryButtonLabel: "Hacer test",
    },
    ja: {
      quizTitle: "有害なポジティブ思考 (トキシック・ポジティビティ) 診断",
      quizDescription: "「ポジティブでいなきゃ」という重圧が本音を押し殺していないか診断します。",
      primaryButtonLabel: "診断をスタート",
    },
    ko: {
      quizTitle: "독성 긍정주의(Toxic Positivity) 자가진단",
      quizDescription: "억지 긍정과 감정 억압이 마음 건강을 해치고 있는지 90초 만에 진단하세요.",
      primaryButtonLabel: "진단 시작하기",
    },
    zh: {
      quizTitle: "毒性积极与情绪压抑测试",
      quizDescription: "评估强迫性积极乐观是否正在屏蔽您的真实负面感受与情感需要。",
      primaryButtonLabel: "开始测评",
    },
  },
  "dopamine-detox": {
    de: {
      quizTitle: "Dopamin-Erschöpfungs- & Bildschirmzeit-Test",
      quizDescription: "Erfassen Sie digitale Reizüberflutung und verminderte Belohnungssensitivität in 90 Sekunden.",
      primaryButtonLabel: "Dopamin-Test starten",
    },
    fr: {
      quizTitle: "Test de Détox Dopamine & Dépendance aux Écrans",
      quizDescription: "Mesurez la désensibilisation au plaisir simple et l'addiction aux notifications.",
      primaryButtonLabel: "Faire le test dopamine",
    },
    es: {
      quizTitle: "Test de Sobrecarga de Dopamina y Adicción Digital",
      quizDescription: "Evalúa tu tolerancia a la sobreestimulación y necesidad de reseteo neuroquímico.",
      primaryButtonLabel: "Hacer test de dopamina",
    },
    ja: {
      quizTitle: "ドーパミン過負荷・デジタルデトックス 診断",
      quizDescription: "スマホ依存による脳の慢性疲労と集中力低下を90秒で測定します。",
      primaryButtonLabel: "ドーパミン診断をスタート",
    },
    ko: {
      quizTitle: "도파민 고갈 & 디지털 디톡스 자가진단",
      quizDescription: "스마트폰 과몰입과 즉각적 자극 추구로 무기력해진 뇌를 점검하세요.",
      primaryButtonLabel: "도파민 진단 시작하기",
    },
    zh: {
      quizTitle: "多巴胺耐受阈值与数字戒断测评",
      quizDescription: "评估屏幕过度暴露导致的奖赏通路脱敏与注意力持续性崩溃。",
      primaryButtonLabel: "开始多巴胺测评",
    },
  },
  "acrophobia": {
    de: {
      quizTitle: "Akrophobie-Selbsttest (Cohen AQ)",
      quizDescription: "Erfassen Sie Höhenangst, visuelle Höhenintoleranz und Panikreflexe in 90 Sekunden.",
      primaryButtonLabel: "Höhenangst-Test starten",
    },
    fr: {
      quizTitle: "Test d'Acrophobie (Échelle Cohen AQ)",
      quizDescription: "Évaluez votre vertige visuel, peur du vide et réflexes de panique en 90 secondes.",
      primaryButtonLabel: "Faire le test d'acrophobie",
    },
    es: {
      quizTitle: "Test de Acrofobia (Cuestionario Cohen AQ)",
      quizDescription: "Mide tu intolerancia a las alturas, vértigo visual y ataques de pánico en 90 segundos.",
      primaryButtonLabel: "Hacer test de acrofobia",
    },
    ja: {
      quizTitle: "高所恐怖症 診断 (Cohen AQ スケール)",
      quizDescription: "視覚的な高所不耐性や揺れへの恐怖、パニック反応を90秒で測定します。",
      primaryButtonLabel: "高所恐怖症診断をスタート",
    },
    ko: {
      quizTitle: "고소공포증 자가진단 (Cohen AQ 척도)",
      quizDescription: "시각적 고소 불내증, 어지럼증, 공황 유발 요인을 90초 만에 평가하세요.",
      primaryButtonLabel: "고소공포증 검사 시작하기",
    },
    zh: {
      quizTitle: "恐高症临床筛查测试 (Cohen AQ)",
      quizDescription: "在90秒内评估您的视觉高度不耐受、姿势摇摆焦虑及高度恐慌发作诱因。",
      primaryButtonLabel: "开始恐高症测评",
    },
  },
  "glossophobia": {
    de: {
      quizTitle: "Glossophobie-Selbsttest (PRPSA-Skala)",
      quizDescription: "Messen Sie Redeangst, Lampenfieber und Stimmblockaden vor Publikum in 90 Sekunden.",
      primaryButtonLabel: "Redeangst-Test starten",
    },
    fr: {
      quizTitle: "Test de Glossophobie (Échelle PRPSA)",
      quizDescription: "Évaluez l'anxiété de parler en public, le trac et les blocages vocaux en 90 secondes.",
      primaryButtonLabel: "Faire le test de prise de parole",
    },
    es: {
      quizTitle: "Test de Glosofobia (Escala PRPSA)",
      quizDescription: "Mide el pánico escénico, temblor vocal y miedo a hablar en público en 90 segundos.",
      primaryButtonLabel: "Hacer test de glosofobia",
    },
    ja: {
      quizTitle: "社交不安・人前でのスピーチ恐怖 診断 (PRPSA)",
      quizDescription: "人前で話す際の声の震え、あがり症、頭が真っ白になる緊張度を測定します。",
      primaryButtonLabel: "スピーチ恐怖診断をスタート",
    },
    ko: {
      quizTitle: "발표 불안증(글로소포비아) 자가진단 (PRPSA)",
      quizDescription: "대중 앞 발표 시 목소리 떨림, 무대 공포, 멘탈 블록 취약성을 90초 만에 진단하세요.",
      primaryButtonLabel: "발표 불안 검사 시작하기",
    },
    zh: {
      quizTitle: "公众演讲焦虑症评估 (PRPSA 量表)",
      quizDescription: "测查受众规模敏感度、躯体震颤诱因及当众发声言语阻滞倾向。",
      primaryButtonLabel: "开始演讲焦虑测评",
    },
  },
  "claustrophobia": {
    de: {
      quizTitle: "Klaustrophobie-Selbsttest (Rachman CLQ)",
      quizDescription: "Messen Sie Beklemmungsgefühle, Enge-Vermeidung und Panik in Aufzügen in 90 Sekunden.",
      primaryButtonLabel: "Klaustrophobie-Test starten",
    },
    fr: {
      quizTitle: "Test de Claustrophobie (Questionnaire CLQ)",
      quizDescription: "Évaluez votre anxiété dans les espaces clos, ascenseurs et sentiment d'enfermement en 90 secondes.",
      primaryButtonLabel: "Faire le test de claustrophobie",
    },
    es: {
      quizTitle: "Test de Claustrofobia (Cuestionario Rachman CLQ)",
      quizDescription: "Mide tu ansiedad por asfixia, miedo a ascensores y espacios cerrados en 90 segundos.",
      primaryButtonLabel: "Hacer test de claustrofobia",
    },
    ja: {
      quizTitle: "閉所恐怖症 診断 (Rachman CLQ スケール)",
      quizDescription: "エレベーターや狭い空間での窒息感、パニック傾向を90秒で測定します。",
      primaryButtonLabel: "閉所恐怖症診断をスタート",
    },
    ko: {
      quizTitle: "폐쇄공포증 자가진단 (Rachman CLQ)",
      quizDescription: "엘리베이터나 밀폐된 좁은 공간에서의 질식 불안과 회피 정도를 90초 만에 측정하세요.",
      primaryButtonLabel: "폐쇄공포증 검사 시작하기",
    },
    zh: {
      quizTitle: "幽闭恐惧症筛查量表 (Rachman CLQ)",
      quizDescription: "在90秒内测查狭小空间窒息焦虑、行为回避与电梯密闭恐慌程度。",
      primaryButtonLabel: "开始幽闭恐惧测评",
    },
  },
  "cyberchondria": {
    de: {
      quizTitle: "Cyberchondrie & Krankheitsangst-Test (CSS)",
      quizDescription: "Prüfen Sie, ob zwanghaftes Symptom-Googeln Ihre Gesundheitsangst befeuert.",
      primaryButtonLabel: "Cyberchondrie-Test starten",
    },
    fr: {
      quizTitle: "Test de Cyberchondrie (Échelle CSS)",
      quizDescription: "Déterminez si la recherche compulsive de symptômes sur internet alimente votre hypocondrie.",
      primaryButtonLabel: "Faire le test de cyberchondrie",
    },
    es: {
      quizTitle: "Test de Cibercondría y Ansiedad por la Salud (CSS)",
      quizDescription: "Evalúa si buscar síntomas en internet está alimentando tu ciclo de hipocondría.",
      primaryButtonLabel: "Hacer test de cibercondría",
    },
    ja: {
      quizTitle: "サイバーコンドリア・健康不安 診断 (CSS)",
      quizDescription: "ネットでの病気検索がやめられない強迫的な健康不安ループを90秒で測定します。",
      primaryButtonLabel: "健康不安診断をスタート",
    },
    ko: {
      quizTitle: "사이버콘드리아(인터넷 건강염려증) 진단 (CSS)",
      quizDescription: "강박적인 증상 검색과 안심 추구 악순환을 90초 만에 점검하세요.",
      primaryButtonLabel: "건강염려증 검사 시작하기",
    },
    zh: {
      quizTitle: "网络疑病症与健康焦虑量表 (CSS)",
      quizDescription: "评估强迫性病症搜索、反复寻求医疗安慰与疑病焦虑恶性循环。",
      primaryButtonLabel: "开始网络疑病测评",
    },
  },
  "emetophobia": {
    de: {
      quizTitle: "Emetophobie-Selbsttest (SPOVI)",
      quizDescription: "Messen Sie Angst vor Übelkeit, Vermeidung bestimmter Speisen und Panik vor Kontrollverlust in 90 Sekunden.",
      primaryButtonLabel: "Emetophobie-Test starten",
    },
    fr: {
      quizTitle: "Test d'Émétophobie & Peur de Vomir (SPOVI)",
      quizDescription: "Évaluez l'hypervigilance gastrique, l'anxiété de nausée et les conduites d'évitement en 90 secondes.",
      primaryButtonLabel: "Faire le test émétophobie",
    },
    es: {
      quizTitle: "Test de Emetofobia y Miedo a Vomitar (SPOVI)",
      quizDescription: "Evalúa la ansiedad por náuseas, conductas de evitación y fobia al malestar gástrico en 90 segundos.",
      primaryButtonLabel: "Hacer test de emetofobia",
    },
    ja: {
      quizTitle: "嘔吐恐怖症 (エメトフォビア) 診断 (SPOVI)",
      quizDescription: "吐き気への強い予期不安、会食や乗り物への回避行動を90秒でセルフチェックします。",
      primaryButtonLabel: "嘔吐恐怖診断をスタート",
    },
    ko: {
      quizTitle: "구토공포증(에메토포비아) 자가진단 (SPOVI)",
      quizDescription: "속 메스꺼움에 대한 과도한 불안, 외식이나 대중교통 회피 성향을 90초 만에 점검하세요.",
      primaryButtonLabel: "구토공포증 검사 시작하기",
    },
    zh: {
      quizTitle: "呕吐恐惧症量表 (SPOVI)",
      quizDescription: "在90秒内评估对恶心感的不耐受、进食防御行为与回避公共场所的恐慌倾向。",
      primaryButtonLabel: "开始呕吐恐惧测评",
    },
  },
  "nomophobia": {
    de: {
      quizTitle: "Nomophobie & Smartphone-Abhängigkeit Test (NMP-Q)",
      quizDescription: "Prüfen Sie Panik bei leerem Akku, fehlendem Netz und Trennungsangst vom Smartphone in 90 Sekunden.",
      primaryButtonLabel: "Nomophobie-Test starten",
    },
    fr: {
      quizTitle: "Test de Nomophobie & Dépendance au Smartphone (NMP-Q)",
      quizDescription: "Mesurez l'angoisse de séparation avec votre téléphone, la batterie faible et l'hyper-connexion.",
      primaryButtonLabel: "Faire le test nomophobie",
    },
    es: {
      quizTitle: "Test de Nomofobia y Ansiedad por el Móvil (NMP-Q)",
      quizDescription: "Mide el pánico a quedarte sin cobertura o batería y la desconexión involuntaria del mundo digital.",
      primaryButtonLabel: "Hacer test de nomofobia",
    },
    ja: {
      quizTitle: "ノモフォビア (スマホ不携帯恐怖症) 診断 (NMP-Q)",
      quizDescription: "スマホが手元にない時の強い不安、バッテリー切れへの焦りを90秒で測定します。",
      primaryButtonLabel: "ノモフォビア診断をスタート",
    },
    ko: {
      quizTitle: "노모포비아(스마트폰 중독 불안) 자가진단 (NMP-Q)",
      quizDescription: "휴대폰이 없거나 배터리가 닳았을 때 겪는 고립 불안과 초조함을 90초 만에 진단하세요.",
      primaryButtonLabel: "노모포비아 검사 시작하기",
    },
    zh: {
      quizTitle: "无手机恐惧症测试 (NMP-Q)",
      quizDescription: "在90秒内测查手机离开视线时的戒断焦虑、低电量惊慌与强迫性信息确认行为。",
      primaryButtonLabel: "开始无手机恐惧测评",
    },
  },
  "night-eating": {
    de: {
      quizTitle: "Night Eating Syndrom (NES) Test",
      quizDescription: "Erkennen Sie nächtliche Essanfälle, Schlaflosigkeit ohne Nahrung und emotionale Heißhungerzyklen.",
      primaryButtonLabel: "NES-Test starten",
    },
    fr: {
      quizTitle: "Test du Syndrome d'Alimentation Nocturne (NES)",
      quizDescription: "Mesurez les fringales nocturnes incontrôlables et l'incapacité à dormir sans manger en 90 secondes.",
      primaryButtonLabel: "Faire le test NES",
    },
    es: {
      quizTitle: "Test del Síndrome de Comedor Nocturno (NES)",
      quizDescription: "Evalúa los atracones nocturnos involuntarios y la dificultad para conciliar el sueño sin comer.",
      primaryButtonLabel: "Hacer test NES",
    },
    ja: {
      quizTitle: "夜間摂食症候群 (NES) 診断",
      quizDescription: "夜中に目が覚めて食べてしまう、朝食欲が湧かないなどの夜間過食傾向を90秒で測定します。",
      primaryButtonLabel: "夜間摂食診断をスタート",
    },
    ko: {
      quizTitle: "야식증후군(NES) 자가진단",
      quizDescription: "밤늦게 무의식적으로 음식을 찾거나 먹지 않으면 잠들지 못하는 수면 섭식 패턴을 점검하세요.",
      primaryButtonLabel: "야식증후군 검사 시작하기",
    },
    zh: {
      quizTitle: "夜间进食综合征测评 (NES)",
      quizDescription: "在90秒内测查夜间强迫性进食、晨起厌食与情绪性高碳水渴望。",
      primaryButtonLabel: "开始夜间进食测评",
    },
  },
  "pmdd": {
    de: {
      quizTitle: "PMDD & Prämenstruelle Dysphorie Test (DRSP)",
      quizDescription: "Messen Sie extreme prämenstruelle Stimmungsschwankungen, Reizbarkeit und depressive Tiefs in 90 Sekunden.",
      primaryButtonLabel: "PMDD-Test starten",
    },
    fr: {
      quizTitle: "Test du Trouble Dysphorique Prémenstruel (TDPM / PMDD)",
      quizDescription: "Évaluez les effondrements émotionnels, l'anxiété aiguë et la rage prémenstruelle en 90 secondes.",
      primaryButtonLabel: "Faire le test PMDD",
    },
    es: {
      quizTitle: "Test de Trastorno Disfórico Premenstrual (TDPM / PMDD)",
      quizDescription: "Mide la gravedad de la irritabilidad extrema, depresión y desregulación emocional premenstrual.",
      primaryButtonLabel: "Hacer test PMDD",
    },
    ja: {
      quizTitle: "月経前不快気分障害 (PMDD) 診断 (DRSP)",
      quizDescription: "生理前の急激な気分の落ち込み、激しいイライラ、感情のコントロール喪失を測定します。",
      primaryButtonLabel: "PMDD診断をスタート",
    },
    ko: {
      quizTitle: "월경전 불쾌장애(PMDD) 자가진단 (DRSP)",
      quizDescription: "생리 전 극심한 감정 기복, 분노, 무기력증 및 우울감을 90초 만에 점검하세요.",
      primaryButtonLabel: "PMDD 검사 시작하기",
    },
    zh: {
      quizTitle: "经前期烦躁障碍测评 (PMDD / DRSP)",
      quizDescription: "在90秒内评估经期前突发性绝望情绪、无法自控的愤怒与严重的情绪解体。",
      primaryButtonLabel: "开始PMDD测评",
    },
  },
  "bfrb": {
    de: {
      quizTitle: "BFRB & Repetitive Verhaltensmuster Test (MGH-HPS)",
      quizDescription: "Erfassen Sie zwanghaftes Hautzupfen (Skin-Picking), Haareausreißen (Trichotillomanie) und Nägelkauen.",
      primaryButtonLabel: "BFRB-Test starten",
    },
    fr: {
      quizTitle: "Test BFRB & Comportements Répétitifs Centrés sur le Corps",
      quizDescription: "Détectez la dermatillomanie, la trichotillomanie et l'onychophagie compulsive en 90 secondes.",
      primaryButtonLabel: "Faire le test BFRB",
    },
    es: {
      quizTitle: "Test de Conductas Repetitivas Centradas en el Cuerpo (BFRB)",
      quizDescription: "Evalúa el rascado compulsivo de la piel, arrancamiento de cabello y mordedura de uñas.",
      primaryButtonLabel: "Hacer test BFRB",
    },
    ja: {
      quizTitle: "身体集中反復行動症 (BFRB) セルフチェック",
      quizDescription: "抜毛症、皮膚むしり症、爪噛みなどの無意識の衝動的行動を90秒で測定します。",
      primaryButtonLabel: "BFRB診断をスタート",
    },
    ko: {
      quizTitle: "신체중심 반복행동(BFRB) 자가진단",
      quizDescription: "피부 뜯기(Dermatillomania), 발모벽(Trichotillomania) 등 억제하기 힘든 충동을 점검하세요.",
      primaryButtonLabel: "BFRB 검사 시작하기",
    },
    zh: {
      quizTitle: "聚焦于身体的重复行为测试 (BFRB)",
      quizDescription: "在90秒内评估拔毛癖、抠皮症和咬指甲等无法自控的神经性冲动反应。",
      primaryButtonLabel: "开始BFRB测评",
    },
  },
  "orthorexia": {
    de: {
      quizTitle: "Orthorexie & Zwanghafte Ernährung Test (ORTO-15)",
      quizDescription: "Prüfen Sie, ob der Zwang zu 'perfekter' Ernährung Ihre Lebensqualität und mentale Freiheit einschränkt.",
      primaryButtonLabel: "Orthorexie-Test starten",
    },
    fr: {
      quizTitle: "Test d'Orthorexie & Obsession Alimentaire (ORTO-15)",
      quizDescription: "Déterminez si la quête obsessionnelle d'une nourriture 'pure' et saine nuit à votre équilibre psychologique.",
      primaryButtonLabel: "Faire le test orthorexie",
    },
    es: {
      quizTitle: "Test de Ortorexia Nerviosa (ORTO-15)",
      quizDescription: "Evalúa si la obsesión por comer 'limpio' y perfecto se ha convertido en una fuente de ansiedad severa.",
      primaryButtonLabel: "Hacer test de ortorexia",
    },
    ja: {
      quizTitle: "オルトレキシア (健康食執着症) 診断 (ORTO-15)",
      quizDescription: "「完璧に健康な食事」への強迫的なこだわりが心の負担になっていないか測定します。",
      primaryButtonLabel: "オルトレキシア診断をスタート",
    },
    ko: {
      quizTitle: "건강 음식 강박증(오소렉시아) 자가진단 (ORTO-15)",
      quizDescription: "완벽하게 깨끗한 음식만 고집하느라 일상과 대인관계가 위축되고 있는지 90초 만에 점검하세요.",
      primaryButtonLabel: "건강식 강박 검사 시작하기",
    },
    zh: {
      quizTitle: "健康饮食强迫症自测 (ORTO-15)",
      quizDescription: "评估对“绝对纯净健康食物”的过激执念是否已经侵蚀您的心理自由与社交生活。",
      primaryButtonLabel: "开始健康饮食强迫自测",
    },
  },
  "comparison-trap": {
    de: {
      quizTitle: "Vergleichsfalle & Social-Media-Neid Test",
      quizDescription: "Messen Sie, wie stark der Vergleich mit scheinbar perfekten Leben in sozialen Medien Ihr Selbstwertgefühl mindert.",
      primaryButtonLabel: "Vergleichs-Test starten",
    },
    fr: {
      quizTitle: "Test du Piège de la Comparaison & Envie",
      quizDescription: "Évaluez l'impact du défilement des réseaux sociaux sur votre sentiment de retard dans la vie.",
      primaryButtonLabel: "Faire le test comparaison",
    },
    es: {
      quizTitle: "Test de la Trampa de la Comparación y Envidia Digital",
      quizDescription: "Mide cuánto afecta el éxito ajeno en redes a tu propia autoestima y sensación de insuficiencia.",
      primaryButtonLabel: "Hacer test de comparación",
    },
    ja: {
      quizTitle: "他人との比較・SNS嫉妬 診断 (フェスティンガーモデル)",
      quizDescription: "SNSを見て他人と自分を比べ、「取り残されている」と感じる焦りを90秒で測定します。",
      primaryButtonLabel: "比較癖診断をスタート",
    },
    ko: {
      quizTitle: "비교 함정 & SNS 박탈감 자가진단",
      quizDescription: "소셜미디어를 보며 남들의 하이라이트와 나의 일상을 비교해 무력해지는 정도를 점검하세요.",
      primaryButtonLabel: "비교 함정 검사 시작하기",
    },
    zh: {
      quizTitle: "社会比较陷阱与社交媒体嫉羡测试",
      quizDescription: "在90秒内评估在朋友圈和社交网络中频繁感到落后、焦虑与自卑的心理阈值。",
      primaryButtonLabel: "开始社会比较测评",
    },
  },
  "somniphobia": {
    de: {
      quizTitle: "Somniphobie & Schlafangst-Test (Morin)",
      quizDescription: "Messen Sie Panik vor dem Einschlafen, nächtliche Hypervigilanz und Schlafangst in 90 Sekunden.",
      primaryButtonLabel: "Schlafangst-Test starten",
    },
    fr: {
      quizTitle: "Test de Somniphobie & Peur du Sommeil (Morin)",
      quizDescription: "Évaluez l'anxiété au coucher, la panique nocturne et la peur de s'endormir en 90 secondes.",
      primaryButtonLabel: "Faire le test somniphobie",
    },
    es: {
      quizTitle: "Test de Somnifobia y Miedo a Dormir (Morin)",
      quizDescription: "Evalúa el pánico nocturno, la hipervigilancia al acostarte y la ansiedad previa al sueño.",
      primaryButtonLabel: "Hacer test de somnifobia",
    },
    ja: {
      quizTitle: "睡眠恐怖症 (ソムニフォビア) 診断",
      quizDescription: "眠ることへの恐怖、寝入りばなの動悸やパニックを90秒で測定します。",
      primaryButtonLabel: "睡眠恐怖診断をスタート",
    },
    ko: {
      quizTitle: "수면공포증(취침 불안) 자가진단",
      quizDescription: "잠드는 것이 두렵거나 밤마다 찾아오는 수면 발작 불안을 90초 만에 점검하세요.",
      primaryButtonLabel: "수면공포증 검사 시작하기",
    },
    zh: {
      quizTitle: "睡眠恐惧症与入睡焦虑测评",
      quizDescription: "在90秒内测查入睡前惊恐发作、过度警觉与睡眠抗拒心理。",
      primaryButtonLabel: "开始睡眠恐惧测评",
    },
  },
  "nervous-system": {
    de: {
      quizTitle: "Nervensystem-Dysregulations-Check (Polyvagal)",
      quizDescription: "Erkennen Sie, ob Ihr Körper in Dauerstress (Fight/Flight) oder Taubheit (Freeze/Shutdown) gefangen ist.",
      primaryButtonLabel: "Nervensystem-Check starten",
    },
    fr: {
      quizTitle: "Bilan de Dérégulation du Système Nerveux (Polyvagal)",
      quizDescription: "Découvrez si votre système nerveux est bloqué en mode combat/fuite ou en sidération émotionnelle.",
      primaryButtonLabel: "Faire le bilan nerveux",
    },
    es: {
      quizTitle: "Test de Desregulación del Sistema Nervioso (Polivagal)",
      quizDescription: "Identifica si tu cuerpo está atrapado en lucha/huida crónica o congelamiento funcional (freeze).",
      primaryButtonLabel: "Comprobar sistema nervioso",
    },
    ja: {
      quizTitle: "自律神経の乱れ・ポリヴェーガル理論 診断",
      quizDescription: "交感神経の過緊張（闘争逃走）や無気力なフリーズ状態を90秒で可視化します。",
      primaryButtonLabel: "神経系チェックをスタート",
    },
    ko: {
      quizTitle: "자율신경계 불균형 & 다미주신경 자가진단",
      quizDescription: "내 몸이 만성 투쟁-도피(각성) 상태인지 무기력한 동결(Freeze) 상태인지 90초 만에 확인하세요.",
      primaryButtonLabel: "신경계 진단 시작하기",
    },
    zh: {
      quizTitle: "自主神经系统失调自测 (多重迷走神经模型)",
      quizDescription: "在90秒内识别身心是否陷入慢性战斗/逃跑过度警觉，或情感麻木解离的冻结状态。",
      primaryButtonLabel: "开始神经系统自测",
    },
  },
  "rsd": {
    de: {
      quizTitle: "RSD-Test: Ablehnungssensitivität (ADHS-Dysphorie)",
      quizDescription: "Messen Sie intensive emotionale Schmerzen bei tatsächlicher oder wahrgenommener Kritik und Ablehnung.",
      primaryButtonLabel: "RSD-Test starten",
    },
    fr: {
      quizTitle: "Test RSD: Dysphorie Sensible au Rejet",
      quizDescription: "Évaluez la douleur émotionnelle démesurée ressentie face à la critique ou au rejet perçu.",
      primaryButtonLabel: "Faire le test RSD",
    },
    es: {
      quizTitle: "Test de Disforia Sensible al Rechazo (RSD)",
      quizDescription: "Mide el dolor emocional abrumador desencadenado por la crítica o el rechazo percibido.",
      primaryButtonLabel: "Hacer test RSD",
    },
    ja: {
      quizTitle: "拒絶過敏性不快感 (RSD) セルフチェック",
      quizDescription: "批判や拒絶に対する激しい精神的苦痛、他人の反応への過剰な恐怖を測定します。",
      primaryButtonLabel: "RSD診断をスタート",
    },
    ko: {
      quizTitle: "거절민감성 불쾌감(RSD) 자가진단",
      quizDescription: "사소한 지적이나 거절에 견디기 힘든 정서적 고통을 느끼는 심리 패턴을 90초 만에 점검하세요.",
      primaryButtonLabel: "RSD 검사 시작하기",
    },
    zh: {
      quizTitle: "拒绝敏感性烦躁不安量表 (RSD)",
      quizDescription: "在90秒内评估面对微小批评、被拒绝或被忽视时触发的剧烈躯体化心理刺痛。",
      primaryButtonLabel: "开始RSD测评",
    },
  },
  "hsp": {
    de: {
      quizTitle: "Hochsensibilität-Selbsttest (Aron HSP-Skala)",
      quizDescription: "Prüfen Sie, ob Ihre hohe Reizempfindlichkeit und tiefe Empathie Zeichen eines hochsensiblen Nervensystems sind.",
      primaryButtonLabel: "HSP-Test starten",
    },
    fr: {
      quizTitle: "Test d'Hypersensibilité Sensorielle (Échelle Aron HSP)",
      quizDescription: "Mesurez votre sensibilité au bruit, à la foule et votre profondeur de traitement émotionnel.",
      primaryButtonLabel: "Faire le test HSP",
    },
    es: {
      quizTitle: "Test de Persona Altamente Sensible (PAS / HSP)",
      quizDescription: "Descubre si tu empatía profunda y saturación ante ruidos o luces indican un sistema nervioso PAS.",
      primaryButtonLabel: "Hacer test PAS",
    },
    ja: {
      quizTitle: "HSP (ハイリー・センシティブ・パーソン) 診断 (アーロン尺度)",
      quizDescription: "人混みでの疲れやすさ、音や光への過敏さ、他人の感情に影響されやすい度合いを測定します。",
      primaryButtonLabel: "HSP診断をスタート",
    },
    ko: {
      quizTitle: "HSP(매우 민감한 사람) 자가진단 (아론 척도)",
      quizDescription: "소음과 시각 자극에 쉽게 피로해지고 타인의 감정을 스펀지처럼 흡수하는 민감성을 점검하세요.",
      primaryButtonLabel: "HSP 검사 시작하기",
    },
    zh: {
      quizTitle: "高敏感人群自测量表 (HSP / Aron模型)",
      quizDescription: "在90秒内测查对声光环境的感官处理敏感性、深度同理心与刺激过载阈值。",
      primaryButtonLabel: "开始HSP高敏感自测",
    },
  },
  "perfectionism": {
    de: {
      quizTitle: "Perfektionismus & Fehlerangst-Test (FMPS)",
      quizDescription: "Erkennen Sie, ob überhöhte Maßstäbe und Angst vor Fehlern Sie lähmen und auslaugen.",
      primaryButtonLabel: "Perfektionismus-Test starten",
    },
    fr: {
      quizTitle: "Test de Perfectionnisme Dysfonctionnel (FMPS)",
      quizDescription: "Découvrez si l'exigence de perfection et la peur panique de l'échec sabotent vos projets.",
      primaryButtonLabel: "Faire le test perfectionnisme",
    },
    es: {
      quizTitle: "Test de Perfeccionismo y Miedo al Error (FMPS)",
      quizDescription: "Evalúa si la búsqueda de perfección absoluta te paraliza mediante procrastinación ansiosa.",
      primaryButtonLabel: "Hacer test de perfeccionismo",
    },
    ja: {
      quizTitle: "完璧主義・失敗恐怖 診断 (FMPS)",
      quizDescription: "「完璧にできないならやりたくない」という先延ばしや自己批判のループを測定します。",
      primaryButtonLabel: "完璧主義診断をスタート",
    },
    ko: {
      quizTitle: "부적응적 완벽주의 & 실수 공포 진단 (FMPS)",
      quizDescription: "완벽에 대한 집착이 오히려 만성적인 시작 미루기와 자책을 부르고 있는지 점검하세요.",
      primaryButtonLabel: "완벽주의 검사 시작하기",
    },
    zh: {
      quizTitle: "功能失调性完美主义量表 (FMPS)",
      quizDescription: "在90秒内测查过高自我苛求、对错误的灾难化恐惧与拖延麻痹机制。",
      primaryButtonLabel: "开始完美主义测评",
    },
  },
  "trauma-bonding": {
    de: {
      quizTitle: "Trauma-Bonding & Toxische Bindung Test",
      quizDescription: "Prüfen Sie, ob Sie in einer emotionalen Achterbahn aus Zuneigung, Abwertung und Abhängigkeit gefangen sind.",
      primaryButtonLabel: "Bindungstest starten",
    },
    fr: {
      quizTitle: "Test de Trauma-Bonding & Dépendance Toxique",
      quizDescription: "Détectez si vous êtes piégé dans un cycle d'alternance affection-maltraitance impossible à rompre.",
      primaryButtonLabel: "Faire le test d'emprise",
    },
    es: {
      quizTitle: "Test de Trauma Bonding y Vínculo Traumático",
      quizDescription: "Descubre si estás atrapado en un ciclo intermitente de refuerzo positivo y devaluación emocional.",
      primaryButtonLabel: "Hacer test de trauma bond",
    },
    ja: {
      quizTitle: "トラウマ・ボンディング (共依存的トラウマ結合) 診断",
      quizDescription: "優しさと冷たさの激しい落差に振り回され、離れられない関係の心理を90秒で測定します。",
      primaryButtonLabel: "トラウマ結合診断をスタート",
    },
    ko: {
      quizTitle: "트라우마 본딩(유해한 유대감) 자가진단",
      quizDescription: "상처를 받으면서도 관계를 끊지 못하고 집착하게 만드는 간헐적 보상 심리를 점검하세요.",
      primaryButtonLabel: "트라우마 결속 검사 시작하기",
    },
    zh: {
      quizTitle: "创伤性联结与有毒关系自评",
      quizDescription: "在90秒内识别是否深陷打一巴掌给个甜枣的断续强化陷阱，无法抽身。",
      primaryButtonLabel: "开始创伤联结自评",
    },
  },
  "cortisol-stress": {
    de: {
      quizTitle: "Cortisol- & Chronischer Stress-Test",
      quizDescription: "Erfassen Sie körperliche Symptome von Cortisol-Überschuss: flache Atmung, Schlafstörungen und innere Unruhe.",
      primaryButtonLabel: "Cortisol-Test starten",
    },
    fr: {
      quizTitle: "Test de Cortisol & Stress Chronique Somatique",
      quizDescription: "Mesurez l'empreinte physique du stress chronique: sommeil fragmenté, tension corporelle et agitation.",
      primaryButtonLabel: "Faire le test cortisol",
    },
    es: {
      quizTitle: "Test de Cortisol y Estrés Crónico Somático",
      quizDescription: "Detecta señales corporales de sobrecarga de cortisol: respiración superficial, insomnio y tensión.",
      primaryButtonLabel: "Hacer test de cortisol",
    },
    ja: {
      quizTitle: "コルチゾール過多・慢性ストレス 診断",
      quizDescription: "浅い呼吸、不眠、イライラなど、高コルチゾール状態による身体的ストレス兆候を測定します。",
      primaryButtonLabel: "コルチゾール診断をスタート",
    },
    ko: {
      quizTitle: "코르티솔 과부하 & 만성 스트레스 자가진단",
      quizDescription: "얕은 호흡, 자고 일어나도 개운치 않은 피로 등 신체가 보내는 스트레스 경고를 확인하세요.",
      primaryButtonLabel: "스트레스 진단 시작하기",
    },
    zh: {
      quizTitle: "皮质醇过载与慢性压力体征测评",
      quizDescription: "在90秒内测查浅呼吸、腹部脂肪堆积、下半夜惊醒与自主神经高负荷体征。",
      primaryButtonLabel: "开始皮质醇体征测评",
    },
  },
  "dpdr": {
    de: {
      quizTitle: "DPDR & Dissoziations-Screening (CDS)",
      quizDescription: "Prüfen Sie, ob Sie sich von Ihrem Körper entfremdet fühlen oder die Welt wie hinter einer Glasscheibe wahrnehmen.",
      primaryButtonLabel: "DPDR-Test starten",
    },
    fr: {
      quizTitle: "Test de Dépersonnalisation & Déréalisation (CDS)",
      quizDescription: "Évaluez l'impression d'être déconnecté de votre corps ou de vivre dans un décor de cinéma irréel.",
      primaryButtonLabel: "Faire le test DPDR",
    },
    es: {
      quizTitle: "Test de Despersonalización y Desrealización (CDS)",
      quizDescription: "Mide la sensación de desconexión corporal, mente nublada y percepción del entorno como un sueño.",
      primaryButtonLabel: "Hacer test DPDR",
    },
    ja: {
      quizTitle: "離人症・現実感喪失症 (DPDR) 診断 (CDS)",
      quizDescription: "自分の体が自分のものでない感覚や、世界が映画のスクリーンのように見える状態を測定します。",
      primaryButtonLabel: "DPDR診断をスタート",
    },
    ko: {
      quizTitle: "이인증 & 비현실감(DPDR) 자가진단 (CDS)",
      quizDescription: "내 몸이 낯설게 느껴지거나 주변 세상이 꿈속이나 유리벽 너머처럼 비현실적인 증상을 점검하세요.",
      primaryButtonLabel: "이인증 검사 시작하기",
    },
    zh: {
      quizTitle: "人格解体与现实解体量表 (DPDR / CDS)",
      quizDescription: "在90秒内评估灵魂出窍感、身体异己感及世界如虚幻布景般的解离感知体验。",
      primaryButtonLabel: "开始DPDR解体测评",
    },
  },
  "shadow-work": {
    de: {
      quizTitle: "Jungianischer Schatten-Archetypen-Test",
      quizDescription: "Entdecken Sie unbewusste Verhaltenssabotage, unterdrückte Impulse und psychologische Projektionen.",
      primaryButtonLabel: "Schatten-Test starten",
    },
    fr: {
      quizTitle: "Test des Archétypes de l'Ombre Jungienne",
      quizDescription: "Explorez vos mécanismes d'auto-sabotage inconscients, blessures refoulées et projections.",
      primaryButtonLabel: "Faire le test de l'ombre",
    },
    es: {
      quizTitle: "Test del Arquetipo de la Sombra Junguiana",
      quizDescription: "Descubre patrones inconscientes de autosabotaje, emociones reprimidas y puntos ciegos proyectados.",
      primaryButtonLabel: "Hacer test de la sombra",
    },
    ja: {
      quizTitle: "ユング派シャドウ・アーキタイプ (影の心理) 診断",
      quizDescription: "無意識のうちに抑圧している感情、他人に投影してしまう苛立ちの正体を90秒で探ります。",
      primaryButtonLabel: "シャドウ診断をスタート",
    },
    ko: {
      quizTitle: "융 심리학 그림자(Shadow) 아키타입 진단",
      quizDescription: "무의식 속에 억압된 감정, 타인에게 투사하는 미움, 나도 모르게 반복하는 자기파괴 행동을 점검하세요.",
      primaryButtonLabel: "그림자 진단 시작하기",
    },
    zh: {
      quizTitle: "荣格阴影原型深度心理测评",
      quizDescription: "在90秒内探寻潜意识中的自我破坏行为、被压抑的愤怒冲动与心理投射盲区。",
      primaryButtonLabel: "开始阴影原型测评",
    },
  },
};

export const TOPIC_ALIASES: Record<string, string> = {
  "rumination": "depressive-rumination",
  "depressive-rumination": "rumination",
  "dopamine-reset": "dopamine-detox",
  "dopamine-detox": "dopamine-reset",
  "people-pleasing": "people-pleaser",
  "people-pleaser": "people-pleasing",
};


/**
 * Resolves the most relevant Quiz or Somatic Tool for a given blog post.
 * Matches against slug, category, keywords, and title across all languages.
 */
export function getBlogQuizOrTool(
  post: BlogPost,
  overrideLang?: string
): BlogQuizToolTarget {
  const language = (overrideLang || getPostLanguage(post) || "en").toLowerCase();
  const langKey = (["id", "de", "fr", "es", "ja", "ko", "zh"].includes(language)
    ? language
    : "en") as string;

  const searchTarget = [
    post.slug,
    post.category,
    post.title,
    ...(post.keywords || []),
  ]
    .join(" ")
    .toLowerCase();

  // Find the best matching config
  let matchedConfig: TopicConfig | undefined;

  for (const config of TOPIC_CONFIGS) {
    const isMatch = config.patterns.some((pattern) => {
      if (typeof pattern === "string") {
        return searchTarget.includes(pattern.toLowerCase());
      }
      return pattern.test(searchTarget);
    });

    if (isMatch) {
      matchedConfig = config;
      break;
    }
  }

  // Fallback to DASS-21 Mental Health Test if anxiety/mental wellness category,
  // or Emotional Battery test for other topics
  if (!matchedConfig) {
    if (
      searchTarget.includes("anxiety") ||
      searchTarget.includes("stress") ||
      searchTarget.includes("mental") ||
      searchTarget.includes("cemas") ||
      searchTarget.includes("angst") ||
      searchTarget.includes("anxiete") ||
      searchTarget.includes("ansiedad") ||
      searchTarget.includes("depress") ||
      searchTarget.includes("불안") ||
      searchTarget.includes("不安") ||
      searchTarget.includes("焦虑")
    ) {
      matchedConfig = TOPIC_CONFIGS.find((c) => c.id === "dass-21")!;
    } else {
      matchedConfig = TOPIC_CONFIGS.find((c) => c.id === "mood-battery")!;
    }
  }

  const frames = MULTILINGUAL_FRAMES[langKey] ?? MULTILINGUAL_FRAMES.en;

  // 1. Indonesian resolution
  if (langKey === "id") {
    const idData = matchedConfig.idLang;
    return {
      id: matchedConfig.id,
      type: "quiz",
      quizTitle: idData.quizTitle,
      quizEyebrow: idData.quizEyebrow || frames.eyebrow,
      quizDescription: idData.quizDescription,
      quizBadge: idData.quizBadge || frames.badge,
      quizHref: idData.quizHref || matchedConfig.en.quizHref,
      primaryButtonLabel: idData.primaryButtonLabel || frames.buttonLabel,
      title: idData.quizTitle,
      description: idData.quizDescription,
      badge: idData.quizBadge || frames.badge,
      href: idData.quizHref || matchedConfig.en.quizHref,
      buttonText: idData.primaryButtonLabel || frames.buttonLabel,
      topic: matchedConfig.id,
      sourceContext: `blog_article_${matchedConfig.id}`,
      secondaryTool: idData.secondaryTool,
    };
  }

  // 2. English resolution
  if (langKey === "en") {
    const enData = matchedConfig.en;
    return {
      id: matchedConfig.id,
      type: "quiz",
      quizTitle: enData.quizTitle,
      quizEyebrow: enData.quizEyebrow || frames.eyebrow,
      quizDescription: enData.quizDescription,
      quizBadge: enData.quizBadge || frames.badge,
      quizHref: enData.quizHref,
      primaryButtonLabel: enData.primaryButtonLabel || frames.buttonLabel,
      title: enData.quizTitle,
      description: enData.quizDescription,
      badge: enData.quizBadge || frames.badge,
      href: enData.quizHref,
      buttonText: enData.primaryButtonLabel || frames.buttonLabel,
      topic: matchedConfig.id,
      sourceContext: `blog_article_${matchedConfig.id}`,
      secondaryTool: enData.secondaryTool,
    };
  }

  // 3. Other languages (de, fr, es, ja, ko, zh)
  const aliasId = TOPIC_ALIASES[matchedConfig.id];
  const overlay =
    MULTILINGUAL_TOPIC_DATA[matchedConfig.id]?.[langKey] ||
    (aliasId ? MULTILINGUAL_TOPIC_DATA[aliasId]?.[langKey] : undefined);
  const enData = matchedConfig.en;

  const resolvedTitle = overlay?.quizTitle || enData.quizTitle;
  const resolvedDesc = overlay?.quizDescription || enData.quizDescription;
  const resolvedBtn = overlay?.primaryButtonLabel || frames.buttonLabel;

  // Localize secondary tool if available
  let localizedSecondaryTool = enData.secondaryTool;
  if (enData.secondaryTool) {
    // Find tool key from href
    const toolMatch = enData.secondaryTool.href.match(/\/tools\/([a-z0-9-]+)/);
    const toolKey = toolMatch ? toolMatch[1] : null;
    const toolTrans = toolKey ? MULTILINGUAL_TOOLS[toolKey]?.[langKey] : null;

    if (toolTrans) {
      localizedSecondaryTool = {
        title: toolTrans.title,
        description: toolTrans.description,
        href: enData.secondaryTool.href,
        buttonLabel: toolTrans.buttonLabel,
        type: enData.secondaryTool.type,
      };
    } else {
      localizedSecondaryTool = {
        ...enData.secondaryTool,
        buttonLabel: frames.toolButtonLabel,
      };
    }
  }

  return {
    id: matchedConfig.id,
    type: "quiz",
    quizTitle: resolvedTitle,
    quizEyebrow: frames.eyebrow,
    quizDescription: resolvedDesc,
    quizBadge: frames.badge,
    quizHref: enData.quizHref,
    primaryButtonLabel: resolvedBtn,
    title: resolvedTitle,
    description: resolvedDesc,
    badge: frames.badge,
    href: enData.quizHref,
    buttonText: resolvedBtn,
    topic: matchedConfig.id,
    sourceContext: `blog_article_${matchedConfig.id}`,
    secondaryTool: localizedSecondaryTool,
  };
}
