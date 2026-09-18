export type ChildhoodEmotionalNeglectCardLang = "en" | "id" | "de" | "fr" | "es";

export interface ChildhoodEmotionalNeglectQuestion {
  id: number;
  subscale: "emotional_invisibility" | "alexithymic_disconnection" | "fatal_flaw_shame";
  text: {
    en: string;
    id: string;
    de: string;
    fr: string;
    es: string;
  };
}

export interface ChildhoodEmotionalNeglectResultLevel {
  level: string;
  scoreRange: [number, number];
  title: {
    en: string;
    id: string;
    de: string;
    fr: string;
    es: string;
  };
  summary: {
    en: string;
    id: string;
    de: string;
    fr: string;
    es: string;
  };
  neurobiology: {
    en: string;
    id: string;
    de: string;
    fr: string;
    es: string;
  };
  actionProtocol: {
    en: string[];
    id: string[];
    de: string[];
    fr: string[];
    es: string[];
  };
  badge: {
    en: string;
    id: string;
    de: string;
    fr: string;
    es: string;
  };
}

export const CHILDHOOD_EMOTIONAL_NEGLECT_QUESTIONS: ChildhoodEmotionalNeglectQuestion[] = [
  // 1. Emotional Invisibility & Burden Phobia (Q1 - Q4)
  {
    id: 1,
    subscale: "emotional_invisibility",
    text: {
      en: "Growing up, my physical needs (food, clothing, schooling) were met, but my emotional world (sadness, fear, anger) was treated as nonexistent, dramatic, or inconvenient.",
      id: "Saat kecil, kebutuhan fisik saya (makan, pakaian, sekolah) tercukupi, tetapi emosi saya (sedih, takut, marah) dianggap tidak penting, berlebihan, atau merepotkan.",
      de: "In meiner Kindheit wurde für meine materiellen Bedürfnisse gesorgt, doch meine seelische Innenwelt (Trauer, Wut, Angst) wurde ignoriert oder als Drama abgetan.",
      fr: "Dans mon enfance, mes besoins matériels étaient comblés, mais ma détresse émotionnelle (tristesse, peur, colère) était jugée inexistante ou embarrassante.",
      es: "En mi infancia mis necesidades básicas estaban cubiertas, pero mi mundo emocional (tristeza, miedo, rabia) era ignorado o tachado de exageración."
    }
  },
  {
    id: 2,
    subscale: "emotional_invisibility",
    text: {
      en: "I learned early on that crying or expressing distress made my parents uncomfortable, angry, or withdrawn, so I hid my tears in silence.",
      id: "Saya belajar sejak dini bahwa menangis membuat orang tua saya risih, marah, atau menjauh, sehingga saya belajar menelan tangis sendirian.",
      de: "Ich lernte früh, dass Weinen meine Eltern verunsicherte oder distanzierte, weshalb ich Schmerz heimlich und im Stillen ertrug.",
      fr: "J'ai compris très tôt que pleurer mettait mes parents mal à l'aise ou en colère, alors j'ai appris à réprimer mes larmes en silence.",
      es: "Aprendí desde pequeño/a que llorar incomodaba o irritaba a mis padres, así que me acostumbré a tragarme el dolor a solas."
    }
  },
  {
    id: 3,
    subscale: "emotional_invisibility",
    text: {
      en: "I feel intense guilt or shame whenever I have to ask someone for help, comfort, or emotional support, terrified of being a 'needy burden'.",
      id: "Saya merasa sangat bersalah atau malu tiap kali harus meminta bantuan atau pelukan emosional, takut dianggap 'beban merepotkan'.",
      de: "Ich empfinde tiefe Scham oder Schuldgefühle, wenn ich um Hilfe oder Trost bitten muss, aus Angst, anderen zur Last zu fallen.",
      fr: "J'éprouve une gêne ou une honte aiguë dès que je dois demander du soutien ou du réconfort, terrifié(e) à l'idée d'être un fardeau.",
      es: "Siento una culpa o vergüenza intensa cuando necesito pedir ayuda o consuelo, aterrado/a ante la idea de ser una carga molesta."
    }
  },
  {
    id: 4,
    subscale: "emotional_invisibility",
    text: {
      en: "Whenever people ask about my childhood, I instinctively say 'It was fine/normal', but deep down I carry an unexplainable sense of emotional absence or loneliness.",
      id: "Tiap kali ditanya soal masa kecil, saya spontan menjawab 'Baik-baik saja', tetapi di lubuk hati terdalam ada rasa hampa dan kesepian pekat.",
      de: "Auf Fragen nach meiner Kindheit antworte ich reflexartig 'Alles war normal', spüre aber innerlich eine unerklärliche seelische Einsamkeit.",
      fr: "Quand on m'interroge sur mon enfance, je réponds 'Tout allait bien', mais je porte en moi un sentiment d'absence affective déroutant.",
      es: "Si me preguntan por mi infancia digo que 'fue normal', pero por dentro cargo con una soledad emocional inexplicable."
    }
  },

  // 2. Alexithymic Disconnection & Chronic Numbness (Q5 - Q8)
  {
    id: 5,
    subscale: "alexithymic_disconnection",
    text: {
      en: "When asked 'What do you feel right now?' or 'What do you want?', my mind goes completely blank, and I default to 'I don't know' or 'Whatever you prefer'.",
      id: "Saat ditanya 'Apa yang kamu rasakan?' atau 'Kamu mau apa?', kepala saya mendadak kosong dan spontan menjawab 'Terserah kamu saja'.",
      de: "Bei der Frage 'Was fühlst du gerade?' oder 'Was wünschst du dir?' herrscht Leere in mir und ich weiche auf 'Keine Ahnung' oder 'Wie du willst' aus.",
      fr: "Quand on me demande 'Que ressens-tu ?' ou 'Que veux-tu ?', c'est le trou noir et je réponds machinalement 'Comme tu veux'.",
      es: "Cuando alguien me pregunta '¿Qué sientes ahora?' o '¿Qué deseas?', me quedo en blanco y respondo 'Me da igual, lo que tú elijas'."
    }
  },
  {
    id: 6,
    subscale: "alexithymic_disconnection",
    text: {
      en: "I frequently feel like an emotionally detached observer in my own life, watching myself go through the motions without tasting genuine passion or joy.",
      id: "Saya kerap merasa seperti penonton yang terasing dalam hidup sendiri, menjalani rutinitas tanpa bisa merasakan gairah atau kegembiraan nyata.",
      de: "Ich fühle mich oft wie ein unbeteiligter Beobachter meines eigenen Lebens, der funktioniert, ohne echte Freude oder Leidenschaft zu spüren.",
      fr: "Je me sens souvent comme un spectateur anesthésié de ma propre vie, agissant par automatisme sans ressentir de joie vibrante.",
      es: "Con frecuencia me siento como un espectador desconectado de mi propia vida, funcionando en automático sin experimentar alegría viva."
    }
  },
  {
    id: 7,
    subscale: "alexithymic_disconnection",
    text: {
      en: "I find it much easier to listen to and support everyone else's emotional crises than to identify or articulate what is hurting inside me.",
      id: "Saya jauh lebih mudah mendengarkan curhat dan menolong masalah orang lain daripada menjelaskan apa yang sebenarnya sakit di dalam diri saya.",
      de: "Es fällt mir viel leichter, anderen bei seelischen Krisen beizustehen, als meine eigenen inneren Wunden in Worte zu fassen.",
      fr: "Il m'est infiniment plus facile de porter la détresse d'autrui que d'identifier ou d'exprimer ce qui me fait souffrir à l'intérieur.",
      es: "Me resulta mil veces más fácil escuchar y consolar las penas ajenas que reconocer y verbalizar mi propio dolor interno."
    }
  },
  {
    id: 8,
    subscale: "alexithymic_disconnection",
    text: {
      en: "I tend to soothe my empty feelings with solitary habits (bingeing TV, doomscrolling, compulsive eating, overworking) rather than reaching out to people.",
      id: "Saya terbiasa membius rasa hampa dengan kebiasaan soliter (maraton film, scrolling berjam-jam, ngemil berlebih, gila kerja) ketimbang menghubungi orang.",
      de: "Ich betäube innere Leere lieber mit einsamen Gewohnheiten (Serienmarathon, Binge-Eating, Überarbeitung), als Nähe zu suchen.",
      fr: "J'anesthésie mon vide intérieur par des habitudes solitaires (scrolling compulsif, séries, nourriture, surmenage) plutôt que d'appeler un proche.",
      es: "Tiendo a anestesiar el vacío con hábitos solitarios (atracones de series, redes sociales, comida o exceso de trabajo) antes que buscar afecto."
    }
  },

  // 3. Fatal Flaw Shame & Existential Emptiness (Q9 - Q12)
  {
    id: 9,
    subscale: "fatal_flaw_shame",
    text: {
      en: "Deep down, I harbor a persistent, gnawing suspicion that there is something fundamentally missing, defective, or unlovable inside me compared to normal people.",
      id: "Di lubuk hati terdalam, ada bisikan bahwa ada yang cacat, hilang, atau tak layak dicintai di dalam diri saya dibanding orang normal lainnya.",
      de: "Tief im Inneren nagt die Überzeugung, dass mit mir etwas grundlegend falsch, defekt oder unliebsam ist im Vergleich zu anderen Menschen.",
      fr: "Au fond de moi, j'ai l'intime conviction d'être fondamentalement défectueux(se) ou incapable d'être aimé(e) comme les autres.",
      es: "En lo más profundo de mi ser arrastro la sospecha constante de que algo en mí está roto, defectuoso o es incapaz de ser amado."
    }
  },
  {
    id: 10,
    subscale: "fatal_flaw_shame",
    text: {
      en: "I am fiercely independent to a fault, believing that relying on anyone emotionally is dangerous and will inevitably lead to abandonment or betrayal.",
      id: "Saya mandiri secara ekstrem hingga kaku, percaya bahwa bergantung pada orang lain itu berbahaya dan pasti berujung penolakan.",
      de: "Ich bin übertrieben unabhängig, weil ich fest glaube, dass seelische Abhängigkeit unweigerlich zu Enttäuschung oder Verlassenwerden führt.",
      fr: "Je suis d'une indépendance farouche et rigide, convaincu(e) que s'appuyer sur quelqu'un mène inévitablement à l'abandon.",
      es: "Soy exageradamente autosuficiente, convencido/a de que apoyarme emocionalmente en alguien solo traerá decepción o abandono."
    }
  },
  {
    id: 11,
    subscale: "fatal_flaw_shame",
    text: {
      en: "Even in a room full of close friends or family, a hollow ache of feeling completely unseen and emotionally isolated frequently washes over me.",
      id: "Bahkan di tengah keramaian sahabat atau keluarga, rasa hampa dan terisolasi kerap menyelinap, seolah tak seorang pun benar-benar melihat jiwa saya.",
      de: "Selbst unter Freunden oder Familie überkommt mich oft ein schmerzhaftes Gefühl, unsichtbar, fremd und seelisch isoliert zu sein.",
      fr: "Même entouré(e) d'amis ou de proches, un vide poignant me submerge, me faisant sentir invisible et profondément seul(e).",
      es: "Incluso rodeado/a de amigos o familiares queridos, me invade una dolorosa sensación de no ser visto/a y de soledad absoluta."
    }
  },
  {
    id: 12,
    subscale: "fatal_flaw_shame",
    text: {
      en: "I struggle to feel proud of my achievements; praise feels awkward, fraudulent, or slides off me as if it belongs to a stranger.",
      id: "Saya sulit merasa bangga atas pencapaian sendiri; pujian terasa canggung, palsu, atau lewat begitu saja seolah milik orang asing.",
      de: "Es fällt mir schwer, auf eigene Erfolge stolz zu sein; Lob fühlt sich unpassend an und prallt an mir ab, als gälte es jemand anderem.",
      fr: "J'ai du mal à être fier(e) de mes réussites ; les compliments me mettent mal à l'aise et glissent sur moi comme s'ils s'adressaient à un inconnu.",
      es: "Me cuesta enorgullecerme de mis logros; los cumplidos me resultan incómodos o resbalan como si pertenecieran a otra persona."
    }
  }
];

export const CHILDHOOD_EMOTIONAL_NEGLECT_OPTIONS = [
  {
    value: 0,
    label: {
      en: "Never / Untrue (Emotionally attuneful)",
      id: "Tidak Pernah / Tidak Sesuai (Emosi Dihargai)",
      de: "Nie / Trifft gar nicht zu (Emotional gehalten)",
      fr: "Jamais / Pas du tout moi (Émotions accueillies)",
      es: "Nunca / Nada que ver conmigo (Emociones validadas)"
    }
  },
  {
    value: 1,
    label: {
      en: "Rarely (Minor isolated moments)",
      id: "Jarang (Hanya Sesekali Terlintas)",
      de: "Selten (Nur vereinzelte Momente)",
      fr: "Rarement (Épisodes passagers)",
      es: "Raramente (Momentos aislados)"
    }
  },
  {
    value: 2,
    label: {
      en: "Sometimes (Moderate recurring absence)",
      id: "Kadang-kadang (Cukup Sering Terasa Hampa)",
      de: "Manchmal (Spürbare emotionale Lücke)",
      fr: "Parfois (Absence affective perceptible)",
      es: "A veces (Sensación recurrente de vacío)"
    }
  },
  {
    value: 3,
    label: {
      en: "Often (Distinct emotional loneliness)",
      id: "Sering (Pola Kesepian Batin Nyata)",
      de: "Oft (Deutliche innere Isolation)",
      fr: "Souvent (Solitude affective marquée)",
      es: "A menudo (Soledad interna pronunciada)"
    }
  },
  {
    value: 4,
    label: {
      en: "Almost Always / Constant (Pervasive hollow core)",
      id: "Hampir Selalu (Hampa & Terasing Sepanjang Hidup)",
      de: "Fast immer (Dauerhaftes Gefühl innerer Leere)",
      fr: "Presque toujours (Vide intérieur chronique)",
      es: "Casi siempre (Sensación crónica de vacío y defecto)"
    }
  }
];

export const CHILDHOOD_EMOTIONAL_NEGLECT_RESULTS: ChildhoodEmotionalNeglectResultLevel[] = [
  {
    level: "emotionally_attuned",
    scoreRange: [0, 9],
    title: {
      en: "Validated Self & Emotional Attunement",
      id: "Diri Tervalidasi & Keterhubungan Emosional Sehat",
      de: "Validierte Gefühlswelt & gesunde Bindung",
      fr: "Conscience de Soi Validée & Connexion Affective Saine",
      es: "Autovalidación Saludable y Conexión Emocional"
    },
    summary: {
      en: "Your upbringing provided sufficient emotional mirroring. You can identify your feelings, express vulnerability without overwhelming shame, and allow others to support you without feeling like a burden.",
      id: "Pengasuhan masa kecil Anda memberikan ruang emosional yang cukup. Anda mengenali perasaan diri, berani menunjukkan kerentanan tanpa rasa malu berlebih, dan nyaman menerima pertolongan orang lain.",
      de: "Ihre Kindheit bot ausreichend emotionale Resonanz. Sie können Gefühle benennen, Schwäche ohne zerstörerische Scham zeigen und Zuwendung annehmen.",
      fr: "Votre enfance a offert un miroir émotionnel suffisant. Vous identifiez vos ressentis, exprimez votre vulnérabilité sans honte et acceptez le soutien d'autrui.",
      es: "Tu infancia contó con adecuado reflejo emocional. Identificas lo que sientes, sabes pedir ayuda sin culpa y toleras la vulnerabilidad sin angustia."
    },
    neurobiology: {
      en: "Robust anterior insula and anterior cingulate interoceptive pathways allow clear somato-emotional awareness. Intact oxytocinergic bonding circuitry facilitates healthy interpersonal trust.",
      id: "Jalur interoseptif insula anterior dan korteks singulat anterior berjalan kuat, memudahkan pembacaan sinyal tubuh. Sirkuit oksitosin yang sehat membangun rasa percaya antarmanusia.",
      de: "Stabile interozeptive Vernetzung zwischen anteriorer Insula und zingulärem Kortex ermöglicht klares Körperempfinden. Intakte Oxytocin-Schleifen nähren gesundes Urvertrauen.",
      fr: "Les voies intéroceptives de l'insula antérieure et du cortex cingulaire favorisent une conscience corporelle claire et des circuits d'ocytocine sécurisants.",
      es: "Óptima integración entre la ínsula anterior y el córtex cingulado para la autoconciencia emocional. Circuitos de oxitocina estables que facilitan la confianza interpersonal."
    },
    actionProtocol: {
      en: [
        "Continue honoring your personal boundaries and emotional desires in daily decisions.",
        "Practice somatic gratitude by savoring emotional warmth in close relationships.",
        "Deepen self-dialogue: Use Nuju's encrypted audio journal to chronicle your authentic creative reflections."
      ],
      id: [
        "Pertahankan batasan sehat dan hargai apa yang benar-benar kamu inginkan setiap hari.",
        "Latih rasa syukur somatik dengan menikmati kehangatan relasi tulus bersama orang terdekat.",
        "Eksplorasi batin: Gunakan jurnal suara terenkripsi Nuju untuk merekam refleksi kreatifmu."
      ],
      de: [
        "Achten Sie weiterhin auf Ihre seelischen Bedürfnisse bei alltäglichen Entscheidungen.",
        "Genießen Sie bewusst die emotionale Geborgenheit in engen Beziehungen.",
        "Reflexionsvertiefung: Nutzen Sie Nujus verschlüsseltes Audio-Tagebuch für persönliche Gedanken."
      ],
      fr: [
        "Continuez d'honorer vos envies et limites dans vos choix du quotidien.",
        "Savourez la chaleur affective de vos liens précieux avec gratitude.",
        "Enrichissez votre vie intérieure : Confiez vos réflexions créatives au journal vocal sécurisé de Nuju."
      ],
      es: [
        "Continúa respetando tus límites y atendiendo a tus necesidades íntimas.",
        "Saborea con gratitud el afecto y la cercanía de tus relaciones de confianza.",
        "Cultiva tu diálogo interior: Utiliza el diario de voz encriptado de Nuju para tus proyectos y reflexiones."
      ]
    },
    badge: {
      en: "Emotionally Anchored",
      id: "Batin Berakar Kuat",
      de: "Emotional Verankert",
      fr: "Ancré Émotionnellement",
      es: "Emocionalmente Anclado"
    }
  },
  {
    level: "mild_emotional_invisibility",
    scoreRange: [10, 19],
    title: {
      en: "Mild Residual Invisibility & Self-Reliance Bias",
      id: "Keterasingan Emosi Ringan & Kecenderungan Mandiri Kaku",
      de: "Leichte emotionale Unsichtbarkeit & Autonomiedrang",
      fr: "Invisibilité Affective Légère & Hyper-Autonomie",
      es: "Invisibilidad Emocional Leve y Tendencia a la Autosuficiencia"
    },
    summary: {
      en: "You have minor residues of emotional neglect. You tend to downplay your needs with phrases like 'I'm fine' and feel mildly uncomfortable when the spotlight is on your personal sorrow.",
      id: "Anda memikul sisa luka pengabaian emosional ringan. Anda cenderung meremehkan kebutuhan batin dengan ucapan 'Nggak apa-apa kok' dan merasa canggung saat orang lain fokus pada kesedihan Anda.",
      de: "Sie tragen leichte Spuren emotionaler Vernachlässigung. Sie wiegeln eigene Sorgen gerne mit 'Geht schon' ab und fühlen sich unwohl, wenn andere Ihre Trauer bemerken.",
      fr: "Vous conservez des traces légères d'invisibilité infantile. Vous minimisez vos chagrins par des 'Tout va bien' et craignez d'accaparer l'attention.",
      es: "Muestras secuelas leves de desatención emocional temprana. Minimizas tu dolor con frases hechas y te incomoda que otros presten atención a tus tristezas."
    },
    neurobiology: {
      en: "Slight attenuation of anterior insula signaling during distressing affect, prompting early cognitive rationalization ('It could be worse') over somatic feeling.",
      id: "Pelemahan ringan pada sinyal insula anterior saat emosi pahit muncul, memicu rasionalisasi kognitif ('Masih mending daripada orang lain') ketimbang merasakan tubuh.",
      de: "Leichte Dämpfung interozeptiver Signale in der vorderen Insula begünstigt kognitives Herunterspielen ('Ist ja nicht so schlimm') statt emotionaler Annahme.",
      fr: "Légère atténuation du signal intéroceptif encourageant la rationalisation mentale plutôt que l'accueil des émotions brutes.",
      es: "Atenuación leve en la ínsula anterior ante el malestar, lo que favorece la intelectualización rápida del dolor en lugar de sentirlo."
    },
    actionProtocol: {
      en: [
        "Replace automatic 'I'm fine' responses with a 3-second somatic body check: 'What am I actually feeling right now?'",
        "Practice asking for one tiny favor each week to retrain your brain that needing help is safe.",
        "Voice reparenting: Speak your unacknowledged sadness privately into Nuju's zero-knowledge audio vault."
      ],
      id: [
        "Ganti ucapan otomatis 'Nggak apa-apa' dengan jeda napas 3 detik: 'Apa yang sebenarnya sedang saya rasakan?'",
        "Latih meminta satu bantuan kecil tiap minggu untuk membiasakan saraf bahwa butuh orang lain itu aman.",
        "Reparenting suara: Akui kesedihan masa lalumu di tempat paling aman: brankas audio terenkripsi Nuju."
      ],
      de: [
        "Ersetzen Sie reflexartiges 'Alles gut' durch ein 3-sekündiges Innehalten: 'Was fühle ich gerade wirklich?'",
        "Üben Sie, wöchentlich um einen kleinen Gefallen zu bitten, um Abhängigkeit als sicher zu erleben.",
        "Seelische Nachnährung: Sprechen Sie übersehene Gefühle im geschützten Nuju-Sprachraum aus."
      ],
      fr: [
        "Remplacez le réflexe 'Ça va' par un temps d'arrêt de 3 secondes : 'Que ressens-je vraiment là ?'",
        "Entraînez-vous à demander un petit service chaque semaine pour désamorcer la peur d'être un fardeau.",
        "Réconfort vocal : Exprimez vos peines oubliées dans le sanctuaire audio sécurisé de Nuju."
      ],
      es: [
        "Sustituye el automático 'Todo bien' por una pausa de 3 segundos: '¿Qué estoy sintiendo realmente aquí?'",
        "Practica pedir un pequeño favor a la semana para enseñarle a tu cuerpo que depender de alguien es seguro.",
        "Reparentalización en voz: Confiesa tus tristezas invisibles en el diario de voz confidencial de Nuju."
      ]
    },
    badge: {
      en: "Quiet Achiever",
      id: "Pekerja Keras Pendiam",
      de: "Stiller Kämpfer",
      fr: "Autonome Discret",
      es: "Luchador Silencioso"
    }
  },
  {
    level: "moderate_cen_burden",
    scoreRange: [20, 29],
    title: {
      en: "Moderate Childhood Emotional Neglect & Chronic Emptiness",
      id: "Beban Pengabaian Emosional Sedang & Hampa Menahun",
      de: "Mäßige emotionale Vernachlässigung & chronische Leere",
      fr: "Négligence Émotionnelle Modérée & Vide Chronique",
      es: "Negligencia Emocional Infantil Moderada y Vacío Crónico"
    },
    summary: {
      en: "You carry a distinct imprint of Childhood Emotional Neglect. While your physical upbringing was respectable, the emotional void has left you feeling chronically disconnected from your own desires, fierce in self-reliance, and haunted by a subtle sense of inadequacy.",
      id: "Anda memikul jejak nyata Childhood Emotional Neglect (CEN). Meski kebutuhan fisik masa kecil tercukupi, kehampaan emosi membuat Anda asing dari keinginan sendiri, mandiri berlebihan, dan dihantui rasa kurang berharga.",
      de: "Sie tragen die typischen Narben emotionaler Vernachlässigung. Trotz funktionierender Kindheit spüren Sie eine chronische innere Leere, fällt es Ihnen schwer, Wünsche zu formulieren, und Selbstgenügsamkeit ist Ihre Festung.",
      fr: "Vous portez les stigmates du manque de miroir affectif. Bien que votre enfance ait été décente, ce vide émotionnel vous coupe de vos désirs et vous enferme dans une indépendance rigide.",
      es: "Cargas con las huellas claras de la negligencia afectiva infantil. Aunque no te faltó nada material, el desierto emocional te ha desconectado de tus deseos y te ha vuelto híper-independiente."
    },
    neurobiology: {
      en: "Chronic dampening of the ventral striatum dopaminergic novelty/reward circuits during self-reflection, accompanied by default mode network (DMN) rumination focused on defectiveness.",
      id: "Pelemahan kronis sirkuit dopamin striatum ventral saat memikirkan diri sendiri, dipadu hiperaktivitas Default Mode Network (DMN) yang berputar pada rasa diri cacat.",
      de: "Dauerhafte Dämpfung dopaminerger Belohnungszentren bei Selbstwahrnehmung; das Default Mode Network verharrt in Grübelschleifen über eigene Unzulänglichkeit.",
      fr: "Désactivation partielle des circuits dopaminergiques liés au plaisir d'exister ; le réseau du mode par défaut rumine sur une défaillance imaginaire.",
      es: "Inhibición crónica de circuitos dopaminérgicos de recompensa y disfrute propio; la red neuronal por defecto (DMN) queda atrapada en la creencia de ser defectuoso/a."
    },
    actionProtocol: {
      en: [
        "Implement Dr. Jonice Webb's 'I Want / I Feel' exercise: write down 3 physical sensations and 1 personal desire every morning.",
        "Stop soothing emotional hunger with compulsive solo binges (screens, work); practice sitting with empty feelings for 10 minutes.",
        "Uncensor your inner child: Record messy rants and forgotten tears in Nuju's zero-knowledge encrypted audio sanctuary."
      ],
      id: [
        "Terapkan latihan 'Saya Ingin / Saya Merasa' dari Dr. Jonice Webb: tulis 3 sensasi tubuh dan 1 keinginan pribadi tiap pagi.",
        "Hentikan membius rasa hampa dengan kesibukan sendiri (hp, lembur kerja); latih duduk bersama rasa hampa selama 10 menit.",
        "Beri ruang bagi anak kecil di dalam dirimu: Menangis dan bicara bebas di brankas audio privat Nuju."
      ],
      de: [
        "Nutzen Sie Dr. Jonice Webbs 'Ich will / Ich fühle'-Übung: Notieren Sie jeden Morgen 3 Körpersignale und 1 eigenen Wunsch.",
        "Hören Sie auf, die innere Leere mit Arbeit oder Bildschirmen zu betäuben; halten Sie die Stille 10 Minuten bewusst aus.",
        "Schatten-Reparenting: Sprechen Sie unterdrückte Tränen und Sehnsüchte im absolut privaten Nuju-Audioarchiv aus."
      ],
      fr: [
        "Appliquez l'exercice du Dr Jonice Webb : notez chaque matin 3 sensations physiques et 1 désir personnel précis.",
        "Cessez d'anesthésier le vide par les écrans ou le travail ; apprenez à rester 10 minutes avec ce silence intérieur.",
        "Accueillez votre enfant intérieur : Confiez vos colères et sanglots enfouis au sanctuaire audio confidentiel de Nuju."
      ],
      es: [
        "Aplica el ejercicio de la Dra. Jonice Webb: anota cada mañana 3 sensaciones físicas y 1 deseo propio sincero.",
        "Deja de tapar el vacío con pantallas o trabajo compulsivo; aprende a sostener esa emoción incómoda durante 10 minutos.",
        "Abraza a tu niño/a interior: Llora y desahoga tus anhelos silenciados en el diario de voz cifrado de Nuju."
      ]
    },
    badge: {
      en: "Invisible Child",
      id: "Jiwa yang Tak Terlihat",
      de: "Unsichtbares Kind",
      fr: "Enfant Invisible",
      es: "Niño/a Invisible"
    }
  },
  {
    level: "elevated_cen_trauma",
    scoreRange: [30, 38],
    title: {
      en: "Elevated CEN & Alexithymic Emotional Ghosting",
      id: "CEN Tinggi & Keterputusan Emosional Kronis",
      de: "Ausgeprägte emotionale Vernachlässigung & Alexithymie",
      fr: "CEN Élevée & Déconnexion Affective Profonde",
      es: "Negligencia Emocional Elevada y Desconexión Alexitímica"
    },
    summary: {
      en: "You experience profound emotional phantom pain. Because your feelings were systematically ignored or dismissed in childhood, you developed a profound alexithymia: you feel like a ghost in human relationships, terrified of intimacy yet starving for connection, haunted by an inescapable 'fatal flaw'.",
      id: "Anda memikul luka hampa yang amat pekat. Karena emosi Anda dulu selalu diabaikan, Anda mengalami alexithymia berat: merasa seperti hantu dalam hubungan, takut dekat tapi mendambakan kasih, dan diyakinkan bahwa ada cacat bawaan dalam diri Anda.",
      de: "Sie leiden unter tiefer seelischer Betäubung. Da Ihre Gefühle als Kind unsichtbar blieben, fühlen Sie sich wie ein Schatten unter Menschen: unfähig zu echter Nähe, voller Sehnsucht und geplagt vom Gefühl, innerlich falsch zu sein.",
      fr: "Vous vivez dans un désert affectif profond. Vos émotions ayant été étouffées, vous errez comme un fantôme dans vos relations : terrifié(e) par l'intimité mais affamé(e) d'amour, obsédé(e) par un sentiment d'illégitimité.",
      es: "Padeces un dolor fantasma devastador. Dado que tus emociones fueron silenciadas, vives desconectado/a: anhelas afecto pero temes la intimidad, convencido/a de que hay un defecto insalvable en ti."
    },
    neurobiology: {
      en: "Marked structural hypo-connectivity between the default mode network and insular interoceptive centers; chronic blunting of medial prefrontal emotional salience pathways leading to profound depersonalization.",
      id: "Hipo-konektivitas struktural antara DMN dan pusat interoseptif insula; penumpulan kronis jalur salience emosional korteks prefrontal medial memicu depersonalisasi mendalam.",
      de: "Strukturelle Entkopplung zwischen Default Mode Network und insulären Körperzentren; neuronale Abstumpfung im medialen Präfrontalkortex erzeugt Depersonalisationserleben.",
      fr: "Hypo-connectivité prononcée entre réseau par défaut et centres insulaires ; l'émoussement des voies préfrontales entraîne une dépersonnalisation chronique.",
      es: "Hipo-conectividad acusada entre la red por defecto y los centros interoceptivos de la ínsula; aplanamiento emocional que induce estados frecuentes de despersonalización."
    },
    actionProtocol: {
      en: [
        "Engage with a psychotherapist specializing in Childhood Emotional Neglect or Emotion-Focused Therapy (EFT).",
        "Practice somatic feeling check-ins twice daily: touch your chest with your hand and ask: 'What does this body need right now?'",
        "Vocal resurrection sanctuary: Speak the unacknowledged truths of your childhood into Nuju's zero-knowledge encrypted vault."
      ],
      id: [
        "Jalani psikoterapi klinis bersama terapis yang memahami Childhood Emotional Neglect atau Emotion-Focused Therapy (EFT).",
        "Latih cek somatik dua kali sehari: letakkan tangan di dada dan tanyakan: 'Apa yang tubuh ini butuhkan sekarang?'",
        "Brankas pemulihan suara: Luapkan kebenaran masa kecil yang dulu disangkal ke dalam brankas audio terenkripsi Nuju."
      ],
      de: [
        "Suchen Sie psychotherapeutische Begleitung mit Schwerpunkt auf emotionaler Vernachlässigung oder Emotionsfokussierter Therapie (EFT).",
        "Führen Sie zweimal täglich somatische Checks durch: Hand aufs Herz legen und fragen: 'Was braucht mein Körper jetzt?'",
        "Stimmliche Wiederbelebung: Vertrauen Sie Ihre verborgenen Kindheitswahrheiten dem anonymen Nuju-Sprachtresor an."
      ],
      fr: [
        "Consultez un thérapeute formé à la négligence affective infantile ou à la thérapie centrée sur les émotions (EFT).",
        "Pratiquez deux fois par jour l'écoute somatique : posez une main sur le cœur et demandez : 'De quoi ai-je besoin ?'",
        "Résurrection vocale : Libérez les vérités interdites de votre enfance dans le sanctuaire chiffré de Nuju."
      ],
      es: [
        "Inicia psicoterapia especializada en negligencia emocional temprana o Terapia Focalizada en las Emociones (TFE).",
        "Haz un chequeo corporal dos veces al día: coloca la mano en el pecho y pregúntate: '¿Qué necesita mi cuerpo ahora?'",
        "Resurrección de la voz: Narra la verdad oculta de tu infancia en el búnker de voz cifrado de Nuju."
      ]
    },
    badge: {
      en: "Emotional Ghost",
      id: "Jiwa yang Terabaikan",
      de: "Seelischer Schatten",
      fr: "Fantôme Affectif",
      es: "Fantasma Emocional"
    }
  },
  {
    level: "severe_fatal_flaw_collapse",
    scoreRange: [39, 48],
    title: {
      en: "Severe Fatal Flaw Trauma & Existential Void Collapse",
      id: "Trauma Cacat Diri Akut & Kehampaan Eksistensial Total",
      de: "Schweres 'Fatal Flaw'-Trauma & existenzielle Entwurzelung",
      fr: "Trauma d'Indignité Sévère & Effondrement du Vide Intérieur",
      es: "Trauma Severo de Defecto Fatal y Colapso por Vacío Vital"
    },
    summary: {
      en: "Your emotional core was almost completely starved of attunement. You live with an all-consuming existential void, believing with religious certainty that you are unlovable, broken, and destined for total isolation. This state breeds intense depression, emotional paralysis, and chronic dissociation.",
      id: "Pusat emosional Anda kelaparan kasih sayang dan pengakuan secara ekstrem. Anda hidup dalam jurang kehampaan eksistensial, meyakini secara mutlak bahwa diri Anda cacat dan ditakdirkan hidup terasing. Kondisi ini memicu depresi berat, kelumpuhan emosi, dan disosiasi kronis.",
      de: "Ihr emotionaler Kern wurde in der Kindheit regelrecht ausgehungert. Sie leben mit einer quälenden existenziellen Leere und der tiefen Überzeugung, unheilbar defekt zu sein. Dies mündet in schwere Depressionen und seelische Erstarrung.",
      fr: "Votre cœur émotionnel a été totalement affamé d'amour et de présence. Vous vivez dans un néant existentiel étouffant, persuadé(e) d'être irrémédiablement brisé(e) et condamné(e) à la solitude absolue.",
      es: "Tu núcleo afectivo sufrió una inanición emocional casi absoluta. Habitas un vacío desgarrador, convencido/a de que estás irreparablemente roto/a y destinado/a a la soledad perpetua, sumido/a en depresión y disociación."
    },
    neurobiology: {
      en: "Severe developmental frontolimbic hypoplasia with persistent functional shutdown of reward circuits; deep chronic dorsal vagal collapse triggering somatic anhedonia and depersonalization.",
      id: "Hipoplasia frontolimbik perkembangan disertai penonaktifan fungsional sirkuit penghargaan; keruntuhan vagal dorsal kronis memicu anhedonia fisik dan depersonalisasi parah.",
      de: "Schwere entwicklungsbedingte Unteraktivierung frontolimbischer Schaltkreise; chronischer dorsaler Vagus-Kollaps erzeugt somatische Anhedonie und Entfremdung.",
      fr: "Sous-activation fronto-limbique sévère et extinction des circuits du plaisir ; effondrement vagal dorsal chronique induisant anhédonie et anesthésie corporelle.",
      es: "Desconexión profunda de vías frontolímbicas con apagado de circuitos de recompensa; colapso vagal dorsal persistente que provoca anhedonia y despersonalización severa."
    },
    actionProtocol: {
      en: [
        "Urgent comprehensive trauma therapy and psychiatric support for depressive and dissociative stabilization.",
        "Reparenting somatic touch: wrap yourself in a heavy weighted blanket and place warm hands over your heart daily.",
        "Zero-judgment crying sanctuary: Scream, weep, and pour out decades of suppressed emptiness into Nuju's encrypted audio vault."
      ],
      id: [
        "Segera cari bantuan psikoterapi trauma intensif dan psikiater untuk stabilisasi depresi dan disosiasi.",
        "Sentuhan somatik reparenting: gunakan selimut tebal berbobot dan letakkan kedua tangan hangat di dada setiap hari.",
        "Brankas tangis tanpa penghakiman: Menangis, menjerit, dan luapkan puluhan tahun kehampaan yang terkubur ke dalam jurnal suara terenkripsi Nuju."
      ],
      de: [
        "Dringende fachärztliche und psychotherapeutische Behandlung zur Behandlung von Depression und seelischer Erstarrung.",
        "Somatische Selbstfürsorge: Wickeln Sie sich in schwere Decken und legen Sie täglich wärmende Hände auf das Herz.",
        "Schonungsloser Schrei-Raum: Weinen und klagen Sie Jahrzehnte unterdrückter Einsamkeit im verschlüsselten Nuju-Tresor aus."
      ],
      fr: [
        "Prise en charge clinique et psychiatrique urgente pour stabiliser l'effondrement dépressif et dissociatif.",
        "Ancrage corporel réparateur : enveloppez-vous dans une couverture lestée et posez des mains chaudes sur votre cœur.",
        "Sanctuaire de larmes : Pleurez et déchargez des décennies de vide refoulé dans le coffre-fort audio de Nuju."
      ],
      es: [
        "Atención médica y psicoterapéutica urgente orientada a estabilizar la depresión profunda y los episodios disociativos.",
        "Contacto somático nutritivo: envuélvete en mantas pesadas y coloca manos cálidas sobre tu pecho a diario.",
        "Búnker de llanto sin juicio: Grita, llora y libera décadas de vacío sepultado en la soledad cifrada de Nuju."
      ]
    },
    badge: {
      en: "Severely Neglected Soul",
      id: "Jiwa Terluka Dalam",
      de: "Verlassene Seele",
      fr: "Âme Oubliée",
      es: "Alma Desatendida"
    }
  }
];

export const CHILDHOOD_EMOTIONAL_NEGLECT_SUBSCALE_INFO = {
  emotional_invisibility: {
    name: {
      en: "Emotional Invisibility & Burden Phobia",
      id: "Keterasingan Emosi & Takut Merepotkan",
      de: "Emotionale Unsichtbarkeit & Last-Phobie",
      fr: "Invisibilité Affective & Peur d'Être un Fardeau",
      es: "Invisibilidad Emocional y Terror a Molestar"
    },
    description: {
      en: "Physical needs met but feelings dismissed, learning to swallow tears in silence, guilt when asking for help, and reflexively saying 'I'm fine'.",
      id: "Kebutuhan fisik terpenuhi tapi emosi diabaikan, belajar menelan tangis sendiri, merasa bersalah minta bantuan, dan spontan bilang 'nggak apa-apa'.",
      de: "Materielle Fürsorge ohne seelische Wärme, Weinen im Verborgenen, Schuldgefühle bei Hilfebedarf und Flucht in 'Alles gut'.",
      fr: "Confort matériel mais désert affectif, larmes étouffées, culpabilité d'avoir des besoins et réflexe de dire 'Ça va'.",
      es: "Comodidad material sin calidez afectiva, llanto en soledad, culpa al pedir ayuda y reflejo automático de decir 'Estoy bien'."
    }
  },
  alexithymic_disconnection: {
    name: {
      en: "Alexithymic Disconnection & Chronic Numbness",
      id: "Keterputusan Alexithymia & Mati Rasa",
      de: "Alexithyme Entfremdung & Gefühlsleere",
      fr: "Déconnexion Alexithymique & Anesthésie",
      es: "Desconexión Alexitímica y Anestesia Afectiva"
    },
    description: {
      en: "Blank mind when asked what you feel, detached observer mode, easier to help others than feel own pain, and soothing emptiness with solitary binges.",
      id: "Kepala kosong saat ditanya perasaan, merasa seperti penonton dalam hidup sendiri, lebih mudah menolong orang lain, dan membius kehampaan dengan layar/kerja.",
      de: "Innere Leere bei Gefühlsfragen, Beobachterperspektive, Retterkomplex für andere und Betäubung durch exzessive Solitär-Gewohnheiten.",
      fr: "Incapacité à nommer ses ressentis, mode observateur détaché, soutien des autres au détriment de soi et anesthésie par le travail ou les écrans.",
      es: "Mente en blanco ante las propias emociones, sensación de ser espectador/a, salvar a otros antes que mirarse y adicción a pantallas o trabajo."
    }
  },
  fatal_flaw_shame: {
    name: {
      en: "Fatal Flaw Shame & Existential Emptiness",
      id: "Malu Cacat Diri & Kehampaan Eksistensial",
      de: "Makel-Scham & existenzielle Leere",
      fr: "Honte d'un Défaut Fatal & Vide Existentiel",
      es: "Vergüenza de un Defecto Fatal y Vacío Existencial"
    },
    description: {
      en: "Belief that something is fundamentally broken inside, fierce rigid independence, hollow loneliness in crowds, and inability to accept praise.",
      id: "Yakin ada yang cacat/hilang dalam diri, mandiri secara kaku, merasa terasing di tengah keramaian, dan canggung menerima pujian.",
      de: "Feste Überzeugung, unheilbar defekt zu sein, erzwungene Autonomie, Einsamkeit unter Menschen und Abwehr von Lob.",
      fr: "Sentiment d'anomalie fondamentale, indépendance défensive extrême, solitude même entouré(e) et malaise face aux compliments.",
      es: "Convicción de estar irremediablemente roto/a, autosuficiencia rígida, soledad entre multitudes y rechazo al elogio ajeno."
    }
  }
};

export function getChildhoodEmotionalNeglectResult(totalScore: number): ChildhoodEmotionalNeglectResultLevel {
  const matched = CHILDHOOD_EMOTIONAL_NEGLECT_RESULTS.find(
    (lvl) => totalScore >= lvl.scoreRange[0] && totalScore <= lvl.scoreRange[1]
  );
  return matched || CHILDHOOD_EMOTIONAL_NEGLECT_RESULTS[CHILDHOOD_EMOTIONAL_NEGLECT_RESULTS.length - 1];
}

export function calculateChildhoodEmotionalNeglectSubscales(answers: Record<number, number>): {
  emotional_invisibility: number;
  alexithymic_disconnection: number;
  fatal_flaw_shame: number;
} {
  let emotional_invisibility = 0;
  let alexithymic_disconnection = 0;
  let fatal_flaw_shame = 0;

  CHILDHOOD_EMOTIONAL_NEGLECT_QUESTIONS.forEach((q) => {
    const val = answers[q.id] || 0;
    if (q.subscale === "emotional_invisibility") emotional_invisibility += val;
    if (q.subscale === "alexithymic_disconnection") alexithymic_disconnection += val;
    if (q.subscale === "fatal_flaw_shame") fatal_flaw_shame += val;
  });

  return { emotional_invisibility, alexithymic_disconnection, fatal_flaw_shame };
}
