export type ExistentialDepressionCardLang = "en" | "id" | "de" | "fr" | "es";

export interface ExistentialDepressionQuestion {
  id: number;
  subscale: "existential_alienation_dread" | "overexcitability_intensity" | "positive_disintegration_crisis";
  text: {
    en: string;
    id: string;
    de: string;
    fr: string;
    es: string;
  };
}

export interface ExistentialDepressionResultLevel {
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
  psychology: {
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

export const EXISTENTIAL_DEPRESSION_QUESTIONS: ExistentialDepressionQuestion[] = [
  // 1. Existential Alienation & Cosmic Dread (Q1 - Q4)
  {
    id: 1,
    subscale: "existential_alienation_dread",
    text: {
      en: "I look at conventional societal milestones (titles, consumerism, social climbing) and feel an overwhelming sense of arbitrariness, emptiness, or absurdity.",
      id: "Aku melihat pencapaian standar masyarakat (jabatan, belanja konsumtif, gengsi sosial) dan merasa semuanya hampa, absurd, atau tidak bermakna sejati.",
      de: "Wenn ich gesellschaftliche Standardziele (Karriere, Konsum, Status) betrachte, empfinde ich oft eine tiefe Sinnleere, Belanglosigkeit oder Absurdität.",
      fr: "En observant les étapes conventionnelles de la société (statut, consommation, réussite matérielle), je ressens une impression pesante d'absurdité et de vide.",
      es: "Miro las metas sociales convencionales (estatus, consumismo, apariencias) y experimento una abrumadora sensación de vacío, futilidad o absurdo."
    }
  },
  {
    id: 2,
    subscale: "existential_alienation_dread",
    text: {
      en: "I experience a deep, chronic 'cosmic loneliness'—a feeling that I am an alien observer fundamentally out of sync with the people around me.",
      id: "Aku sering merasakan 'kesepian kosmik' yang mendalam—merasa seperti alien atau pengamat asing yang tidak bisa benar-benar selaras dengan orang sekitarku.",
      de: "Ich erlebe eine chronische 'kosmische Einsamkeit' – das Gefühl, ein fremder Beobachter zu sein, der fundamental nicht in diese Welt passt.",
      fr: "J'éprouve une solitude existentielle tenace, comme si j'étais un observateur étranger fondamentalement déconnecté des codes du monde ordinaire.",
      es: "Siento una profunda soledad cósmica: la sensación de ser un observador forastero incapaz de encajar genuinamente con el ritmo de quienes me rodean."
    }
  },
  {
    id: 3,
    subscale: "existential_alienation_dread",
    text: {
      en: "I am frequently haunted by the brevity of human existence, mortality, and the poignant awareness that everything we build will eventually turn to dust.",
      id: "Pikiranku sering dihantui kefanaan waktu, kematian, dan kesadaran bahwa apa pun yang dibangun manusia pada akhirnya akan lenyap tak berbekas.",
      de: "Mich beschäftigt häufig die Vergänglichkeit des Daseins, die eigene Endlichkeit und das Bewusstsein, dass alles Erschaffene eines Tages verblasst.",
      fr: "Je suis souvent hanté par la brièveté de la vie, la mort et l'amère lucidité que toutes nos créations finiront par disparaître dans le néant.",
      es: "Me persigue con frecuencia la brevedad de la existencia humana, la mortalidad y la certeza de que todo lo construido terminará desvaneciéndose."
    }
  },
  {
    id: 4,
    subscale: "existential_alienation_dread",
    text: {
      en: "I experience acute emotional ache over global injustices, ecological destruction, or collective cruelty that most people seem able to shrug off.",
      id: "Hatiku terasa ngilu dan remuk melihat ketidakadilan global, kerusakan bumi, atau kekejaman dunia yang tampak diabaikan begitu saja oleh orang lain.",
      de: "Ich leide körperlich und seelisch unter weltweiten Ungerechtigkeiten, Naturzerstörung und Grausamkeiten, die andere einfach achselzuckend hinnehmen.",
      fr: "Je ressens une douleur viscérale face aux injustices mondiales, à la destruction de la nature ou à la cruauté humaine que la plupart semblent ignorer.",
      es: "Sufro un dolor lacerante ante las injusticias globales, el daño ecológico o la crueldad colectiva que los demás parecen tolerar con indiferencia."
    }
  },

  // 2. Neuro-Emotional Over-Excitability & Intensity (Q5 - Q8)
  {
    id: 5,
    subscale: "overexcitability_intensity",
    text: {
      en: "My mind operates in rapid hyper-drive, obsessively deconstructing the 'why behind the why' to the point of intellectual and physical exhaustion.",
      id: "Pikiranku bekerja dengan kecepatan tinggi yang melelahkan, terus membedah 'alasan di balik alasan' hingga energi fisik dan mentalku terkuras habis.",
      de: "Mein Verstand läuft permanent auf Hochtouren und hinterfragt zwanghaft das 'Warum hinter dem Warum', bis zur völligen geistigen Erschöpfung.",
      fr: "Mon esprit tourne à un rythme effréné, déconstruisant sans fin le « pourquoi du pourquoi » jusqu'à l'épuisement mental et physique.",
      es: "Mi mente funciona a una velocidad hiperactiva, desarmando obsesivamente el 'porqué del porqué' hasta el agotamiento mental y corporal."
    }
  },
  {
    id: 6,
    subscale: "overexcitability_intensity",
    text: {
      en: "I feel an intense, visceral revulsion toward hypocrisy, double standards, or superficial small talk, finding it almost impossible to fake enthusiasm.",
      id: "Aku merasakan mual atau muak batin terhadap kemunafikan, standar ganda, atau obrolan basa-basi, dan sangat tersiksa jika harus berpura-pura ramah.",
      de: "Ich empfinde eine körperliche Abneigung gegen Heuchelei, Doppelmoral und seichten Smalltalk; es fällt mir schwer, Begeisterung vorzutäuschen.",
      fr: "J'éprouve un rejet viscéral envers l'hypocrisie, les doubles discours et le bavardage superficiel, étant incapable de feindre l'intérêt.",
      es: "Siento un rechazo físico ante la hipocresía, la doble moral y la charla banal, resultándome casi imposible fingir entusiasmo o cordialidad fingida."
    }
  },
  {
    id: 7,
    subscale: "overexcitability_intensity",
    text: {
      en: "I absorb the emotional atmosphere of rooms and the hidden vulnerabilities of people around me like an emotional lightning rod.",
      id: "Aku menyerap getaran emosi ruangan dan penderitaan tersembunyi orang lain seperti spons atau penangkal petir emosional.",
      de: "Ich nehme unausgesprochene Spannungen, Schmerzen und Atmosphären anderer Menschen wie ein emotionaler Blitzableiter in mich auf.",
      fr: "J'absorbe la tension émotionnelle d'une pièce et les fardeaux silencieux des autres comme un paratonnerre émotionnel hypersensible.",
      es: "Absorbo el clima emocional de cualquier espacio y el dolor oculto de los demás como una antena de alta sensibilidad."
    }
  },
  {
    id: 8,
    subscale: "overexcitability_intensity",
    text: {
      en: "I carry an excruciating gap between my internal vision of truth, beauty, and justice, versus the messy, compromised reality of human society.",
      id: "Ada jurang yang menyakitkan di dadaku antara standar kebenaran, keindahan, dan keadilan idealku dengan kenyataan dunia yang penuh kompromi kotor.",
      de: "Ich leide unter der schmerzhaften Kluft zwischen meiner Vision von Wahrhaftigkeit, Gerechtigkeit und Schönheit und der fehlerhaften Alltagsrealität.",
      fr: "Je souffre du fossé déchirant entre mon idéal de justice, de vérité et de pureté et la réalité terne et corrompue du monde quotidien.",
      es: "Vivo atrapado en una brecha dolorosa entre mis ideales de justicia y autenticidad frente a la realidad mediocre y resignada de la sociedad."
    }
  },

  // 3. Positive Disintegration & Values Crisis (Q9 - Q12)
  {
    id: 9,
    subscale: "positive_disintegration_crisis",
    text: {
      en: "I feel that the conventional identity I constructed to fit into school or career has collapsed, and I cannot force myself to wear the mask again.",
      id: "Aku merasa topeng identitas yang kubangun untuk berbaur di kantor atau sekolah sudah runtuh, dan aku tak sanggup lagi memaksakan diri memakainya.",
      de: "Die soziale Maske, die ich für Karriere oder Umfeld aufgebaut hatte, ist zerbrochen – und ich kann mich nicht zwingen, sie wieder aufzusetzen.",
      fr: "L'identité sociale que j'avais construite pour m'intégrer s'est effondrée, et je suis incapable de me forcer à porter ce masque à nouveau.",
      es: "La máscara que construí para encajar en el trabajo o la sociedad se ha resquebrajado, y no tengo fuerzas ni ganas de volver a ponérmela."
    }
  },
  {
    id: 10,
    subscale: "positive_disintegration_crisis",
    text: {
      en: "I experience intense 'disquietude with myself'—torment over who I currently am compared to who my conscience demands that I become.",
      id: "Aku mengalami kegelisahan batin yang parah—merasa gelisah dan tersiksa melihat siapa diriku saat ini dibanding panggilan nurani tentang siapa yang seharusnya.",
      de: "Ich erlebe eine quälende Selbstunruhe: Die Diskrepanz zwischen dem, wer ich heute bin, und dem, wer ich laut meinem Gewissen sein müsste.",
      fr: "Je ressens une intense inquiétude intérieure : un tourment entre ce que je suis actuellement et ce que ma conscience m'ordonne de devenir.",
      es: "Sufro una dolorosa inquietud interior por la distancia entre la persona que soy hoy y la que mi conciencia me exige llegar a ser."
    }
  },
  {
    id: 11,
    subscale: "positive_disintegration_crisis",
    text: {
      en: "Simplistic advice, toxic positivity clichés ('just choose happiness!'), or dogmatic doctrines feel insulting and completely inadequate for my depth of questioning.",
      id: "Nasihat klise seperti 'pikir positif saja!' atau doktrin dogmatis terasa menghina akal sehat dan tidak mampu menjawab kedalaman pertanyaanku.",
      de: "Platte Ratschläge, toxische Positivität ('Denk einfach positiv!') und Dogmen wirken beleidigend und reichen nicht an meine Tiefe heran.",
      fr: "Les clichés de positivité toxique (« souris à la vie ! ») et les dogmes simplistes me semblent réducteurs et insultants pour ma soif de sens.",
      es: "Las frases hechas de positividad tóxica ('¡elige ser feliz!') o los dogmas fáciles me resultan ofensivos y totalmente incapaces de calmar mi búsqueda."
    }
  },
  {
    id: 12,
    subscale: "positive_disintegration_crisis",
    text: {
      en: "I am walking through a prolonged 'dark night of the soul', desperately seeking a self-chosen, authentic reason to live rather than mindless conformity.",
      id: "Aku sedang melewati masa 'malam gelap jiwa' (dark night of the soul), berjuang menemukan alasan hidup sejati pilihan sendiri ketimbang sekadar ikut arus.",
      de: "Ich gehe durch eine 'dunkle Nacht der Seele', auf der Suche nach einem wahrhaftigen, selbstgewählten Lebenssinn jenseits von blindem Mitlaufen.",
      fr: "Je traverse une véritable « nuit noire de l'âme », cherchant désespérément un sens authentique à mon existence plutôt qu'un conformisme aveugle.",
      es: "Atravieso una prolongada 'noche oscura del alma', buscando con urgencia un propósito auténtico y propio en lugar de una conformidad ciega."
    }
  }
];

export const EXISTENTIAL_DEPRESSION_RESULTS: ExistentialDepressionResultLevel[] = [
  {
    level: "grounded_pragmatism",
    scoreRange: [0, 9],
    title: {
      en: "Grounded Pragmatism & Low Existential Friction",
      id: "Pragmatisme Realistis & Gesekan Eksistensial Rendah",
      de: "Geerdeter Pragmatismus & Geringe existenzielle Reibung",
      fr: "Pragmatisme Ancré & Faible Friction Existentielle",
      es: "Pragmatismo Anclado y Baja Fricción Existencial"
    },
    summary: {
      en: "Your nervous system is comfortably anchored in immediate, pragmatic reality. While you may occasionally wonder about the universe, existential concerns do not impair your daily emotional equilibrium or sense of purpose.",
      id: "Sistem sarafmu berlabuh kokoh dalam realitas praktis sehari-hari. Meski sesekali memikirkan makna hidup, pertanyaan eksistensial tidak merusak stabilitas emosi atau semangat kerjamu.",
      de: "Ihr Nervensystem ist stabil in der alltäglichen Realität verankert. Existenzielle Fragen werfen Sie nicht aus der Bahn und behindern nicht Ihren Alltag.",
      fr: "Votre esprit est solidement ancré dans le concret. Les questionnements philosophiques ne perturbent pas votre équilibre émotionnel quotidien.",
      es: "Tu sistema nervioso se mantiene firmemente apoyado en la realidad práctica. Las dudas sobre la existencia no desestabilizan tu día a día."
    },
    psychology: {
      en: "Primary integration within conventional societal scripts. You find sufficient fulfillment in functional relationships, tangible work outcomes, and everyday pleasures without being consumed by cosmic dread.",
      id: "Integrasi primer dalam tatanan sosial yang stabil. Kamu menemukan kepuasan dari relasi yang sehat, hasil kerja nyata, dan kesenangan sederhana tanpa tersiksa oleh kehampaan kosmik.",
      de: "Primäre Integration im gesellschaftlichen Gefüge. Zufriedenheit entsteht aus realen Beziehungen, beruflichen Erfolgen und pragmatischen Lebenszielen.",
      fr: "Intégration primaire harmonieuse. Vous trouvez votre satisfaction dans les relations directes et les projets concrets sans être submergé par l'absurde.",
      es: "Integración funcional en el entorno social. Encuentras sentido en tus vínculos, logros tangibles y placeres cotidianos sin angustia cósmica."
    },
    actionProtocol: {
      en: [
        "Preserve your grounding rituals: physical exercise, tangible creation, and nature connection.",
        "Cultivate empathy for deep-thinking friends who struggle with existential paralysis.",
        "Use Nuju voice journaling for regular emotional check-ins and gratitude reflection."
      ],
      id: [
        "Pertahankan kebiasaan membumi: olahraga fisik, karya nyata, dan interaksi dengan alam.",
        "Bangun empati pada orang di sekitarmu yang sedang terjebak dalam krisis makna hidup.",
        "Gunakan jurnal suara Nuju untuk mengevaluasi emosi harian dan merawat rasa syukur."
      ],
      de: [
        "Pflegen Sie erdende Gewohnheiten: Bewegung, handwerkliches Schaffen und Naturaufenthalte.",
        "Bringen Sie Verständnis für hochsensible Freunde auf, die unter existenzieller Leere leiden.",
        "Nutzen Sie das Nuju-Sprachjournal für tägliche emotionale Bestandsaufnahmen."
      ],
      fr: [
        "Maintenez vos ancrages concrets : sport, activités créatives et immersion dans la nature.",
        "Développez de l'empathie pour les esprits tourmentés par les grandes questions de la vie.",
        "Utilisez le journal vocal Nuju pour clarifier vos ressentis quotidiens et cultiver la gratitude."
      ],
      es: [
        "Mantén tus anclajes prácticos: actividad física, creatividad tangible y contacto con la naturaleza.",
        "Fomenta la comprensión hacia amigos intensos que lidian con el peso del vacío existencial.",
        "Usa el diario de voz Nuju para tus chequeos emocionales habituales y cultivar la gratitud."
      ]
    },
    badge: {
      en: "PRAGMATIC ANCHOR",
      id: "JANGKAR PRAGMATIS",
      de: "PRAGMATISCHER ANKER",
      fr: "ANCRAGE PRAGMATIQUE",
      es: "ANCLA PRAGMÁTICA"
    }
  },
  {
    level: "philosophical_inquiry",
    scoreRange: [10, 17],
    title: {
      en: "Philosophical Inquiry & Mild Existential Wonder",
      id: "Inkuiri Filosofis & Rasa Ingin Tahu Eksistensial",
      de: "Philosophische Neugier & Mildes Existenzielles Staunen",
      fr: "Curiosité Philosophique & Émerveillement Existentiel",
      es: "Inquietud Filosófica y Asombro Moderado"
    },
    summary: {
      en: "You possess a rich inner life and an appetite for deep contemplation. You occasionally feel detached from superficial norms, but you harness this curiosity creatively without descending into prolonged nihilistic paralysis.",
      id: "Kamu memiliki dunia batin yang kaya dan gemar merenungkan makna hidup. Terkadang kamu merasa jengah dengan kepalsuan sosial, namun kamu mampu menyalurkannya secara sehat ke hal kreatif.",
      de: "Sie besitzen eine reiche Innenwelt und einen Drang zu tiefen Gedanken. Oberflächliche Normen langweilen Sie zuweilen, führen jedoch selten zu tiefer Verzweiflung.",
      fr: "Vous avez une vie intérieure riche et un goût pour la réflexion. Les mondanités superficielles vous lassent parfois, mais sans vous plonger dans le désespoir.",
      es: "Posees un mundo interior reflexivo y un aprecio por el pensamiento profundo. La superficialidad te aburre a veces, pero logras canalizarlo de forma constructiva."
    },
    psychology: {
      en: "Healthy intellectual curiosity. Dąbrowski's theory notes this as a precursor to positive disintegration—where the unexamined life begins to show cracks, prompting you to curate authentic values.",
      id: "Keingintahuan intelektual yang sehat. Teori Dąbrowski mencatat ini sebagai fase awal disintegrasi positif—ketika kehidupan tanpa refleksi mulai terasa kurang, mendorongmu mencari nilai sejati.",
      de: "Gesunde geistige Offenheit. Vorstufe zur positiven Desintegration nach Dąbrowski: Das unreflektierte Leben wird hinterfragt, um eigene Werte zu formen.",
      fr: "Curiosité intellectuelle féconde. Selon Dąbrowski, c'est l'amorce de la désintégration positive, où le besoin de cohérence personnelle s'éveille.",
      es: "Curiosidad intelectual sana. Dąbrowski define esta etapa como la antesala de la desintegración positiva, donde cuestionas lo dado para definir tu rumbo."
    },
    actionProtocol: {
      en: [
        "Channel existential questioning into art, writing, philosophy, or social contribution.",
        "Set cognitive boundaries around late-night doom-thinking or endless philosophical rabbit holes.",
        "Vent uncensored philosophical musings into Nuju's encrypted voice vault."
      ],
      id: [
        "Salurkan perenungan filosofismu ke tulisan, karya seni, atau kontribusi sosial nyata.",
        "Batasi overthinking tengah malam agar tidak larut dalam lubang kelinci yang melelahkan.",
        "Rekam pemikiran filosofismu yang terdalam di brankas audio terenkripsi Nuju."
      ],
      de: [
        "Kanalisieren Sie philosophische Fragen in Kunst, Schreiben oder soziales Engagement.",
        "Setzen Sie gedankliche Stopps bei nächtlichen Grübelspiralen ohne pragmatischen Nutzen.",
        "Sprechen Sie freie Gedanken in den verschlüsselten Nuju-Sprachraum ein."
      ],
      fr: [
        "Canalisez vos réflexions dans l'écriture, l'art ou un engagement porteur de sens.",
        "Fixez des limites aux ruminations nocturnes qui n'aboutissent à aucune action concrète.",
        "Exprimez vos méditations existentielles dans l'espace vocal chiffré de Nuju."
      ],
      es: [
        "Canaliza tus dudas filosóficas en la escritura, el arte o iniciativas de impacto social.",
        "Pon límites a las espirales reflexivas de madrugada que te dejan sin energía para actuar.",
        "Vuelca tus reflexiones sin censura en la bóveda privada de voz de Nuju."
      ]
    },
    badge: {
      en: "THINKER & EXPLORER",
      id: "PEMIKIR & PENJELAJAH",
      de: "DENKER & FORSCHER",
      fr: "PENSEUR & EXPLORATEUR",
      es: "PENSADOR Y EXPLORADOR"
    }
  },
  {
    level: "acute_overexcitability",
    scoreRange: [18, 25],
    title: {
      en: "Acute Over-Excitability & Existential Weariness",
      id: "Overexcitability Akut & Kelelahan Eksistensial",
      de: "Akute Übererregbarkeit & Existenzielle Erschöpfung",
      fr: "Hyper-Excitabilité Aiguë & Lassitude Existentielle",
      es: "Sobreexcitabilidad Aguda y Fatiga Existencial"
    },
    summary: {
      en: "Your nervous system perceives the universe with amplified intensity. You suffer from emotional and intellectual overexcitability: feeling moral hypocrisy as a physical punch, mourning injustice intensely, and feeling isolated among peers.",
      id: "Sistem sarafmu menyerap dunia dengan intensitas 10 kali lebih kuat. Kamu mengalami kelelahan akibat overexcitability emosional dan intelektual: muak melihat kemunafikan dan merasa terasing.",
      de: "Ihr Nervensystem nimmt Reize mit extremer Intensität auf. Sie leiden unter emotionaler und intellektueller Übererregbarkeit; Ungerechtigkeiten treffen Sie wie ein Schlag.",
      fr: "Votre système nerveux capte le monde avec une sensibilité décuplée. L'hypocrisie et la souffrance collective vous affectent physiquement, créant une fatigue morale tenace.",
      es: "Tu sistema nervioso procesa el mundo con una intensidad multiplicada. Experimentas una sobreexcitabilidad emocional e intelectual que te agota frente a la injusticia ajena."
    },
    psychology: {
      en: "Dr. James T. Webb's model of Existential Depression in gifted/intense individuals. The gap between your profound moral clarity and the world's indifference creates chronic psychic depletion and 'weltschmerz' (world-weariness).",
      id: "Model Depresi Eksistensial Dr. James T. Webb pada individu berpikiran mendalam. Jurang antara standar moralmu dengan kenyataan dunia memicu kelelahan psikis kronis dan 'weltschmerz'.",
      de: "Modell der existenziellen Depression nach Dr. James T. Webb. Die Diskrepanz zwischen moralischem Ideal und Weltgeschehen erzeugt tiefen Weltschmerz.",
      fr: "Modèle de dépression existentielle du Dr James T. Webb. L'écart entre vos idéaux et la banalité du monde génère une usure psychique et un lourd weltschmerz.",
      es: "Modelo de Depresión Existencial de Dr. James T. Webb. La disparidad entre tu lucidez ética y la indiferencia circundante genera un desgaste llamado weltschmerz."
    },
    actionProtocol: {
      en: [
        "Implement 'Input Fasting': Strictly limit consumption of 24/7 catastrophe news and polarizing debates.",
        "Locate an 'Intellectual Tribe': Find 1 or 2 peers who can meet your depth without calling you 'too intense'.",
        "Somatic Grounding in Nuju: Speak your heavy world-grief out loud into Nuju to release the somatic burden from your chest."
      ],
      id: [
        "Terapkan 'Puasa Informasi': Batasi konsumsi berita bencana global dan perdebatan medsos yang tak ada ujungnya.",
        "Cari 'Lingkaran Seirama': Temukan 1 atau 2 teman yang mampu diajak bicara mendalam tanpa menghakimimu 'terlalu lebay'.",
        "Pelepasan Somatik di Nuju: Bicarakan rasa sesak melihat dunia ke jurnal suara Nuju agar beban fisik di dadamu terangkat."
      ],
      de: [
        "Führen Sie 'Informations-Fasten' ein: Meiden Sie reißerische Dauernachrichten und sinnlose Debatten.",
        "Suchen Sie 'Gleichgesinnte': Finden Sie Menschen, die Ihre Tiefe teilen, ohne Sie als 'anstrengend' abzustempeln.",
        "Somatische Entlastung mit Nuju: Sprechen Sie Ihren Weltschmerz laut aus, um die Last von der Brust zu nehmen."
      ],
      fr: [
        "Adoptez un jeûne informationnel : coupez les flux d'actualités anxiogènes et les polémiques creuses.",
        "Recherchez votre tribu : échangez avec des esprits capables de comprendre votre intensité sans jugement.",
        "Libération vocale avec Nuju : verbalisez le poids du monde dans Nuju pour alléger la tension qui vous oppresse."
      ],
      es: [
        "Practica un ayuno informativo estricto: desconecta de las noticias sensacionalistas y polémicas estériles.",
        "Encuentra a tu tribu: busca personas que resuenen con tu intensidad sin tacharte de 'exagerado'.",
        "Descarga somática en Nuju: verbaliza tu angustia por el mundo en Nuju para desahogar la opresión en el pecho."
      ]
    },
    badge: {
      en: "INTENSE SENSITIVE",
      id: "SENSITIF INTENS",
      de: "HOCHINTENSIV",
      fr: "HYPERSENSIBLE INTENSE",
      es: "INTENSIDAD PROFUNDA"
    }
  },
  {
    level: "positive_disintegration",
    scoreRange: [26, 31],
    title: {
      en: "Spontaneous Positive Disintegration & Values Crisis",
      id: "Disintegrasi Positif Spontan & Krisis Nilai Batin",
      de: "Positive Desintegration & Wertkrise",
      fr: "Désintégration Positive Spontanée & Crise de Valeurs",
      es: "Desintegración Positiva y Crisis de Valores"
    },
    summary: {
      en: "You are currently living through what Kazimierz Dąbrowski called 'Multilevel Positive Disintegration'. The conditioned personality you built to survive social expectations has shattered. You feel in pieces, but this crisis is the fertile soil of genuine self-creation.",
      id: "Kamu sedang berada dalam fase yang oleh Kazimierz Dąbrowski disebut 'Disintegrasi Positif Multilevel'. Kepribadian lamamu yang terbentuk demi memenuhi tuntutan sosial telah hancur. Ini menyakitkan, namun merupakan awal lahirnya jati diri sejati.",
      de: "Sie durchleben eine 'multilevel positive Desintegration' nach Dąbrowski. Ihre bisherige Anpassungsidentität ist zerbrochen. Die Krise ist schmerzhaft, birgt aber den Keim wahrer Reifung.",
      fr: "Vous traversez une désintégration positive multiniveau selon Dąbrowski. Votre fausse identité d'adaptation s'est effondrée. C'est douloureux, mais c'est le creuset d'une renaissance authentique.",
      es: "Estás atravesando lo que Kazimierz Dąbrowski llamó 'Desintegración Positiva Multinivel'. Tu personaje de adaptación ha colapsado; el dolor actual es el suelo fértil de tu verdadera madurez."
    },
    psychology: {
      en: "Dąbrowski's Theory of Positive Disintegration (TPD). True psychological autonomy requires the destruction of the primitive, conformist self (Level I) before one can deliberately construct an autonomous hierarchy of values (Level IV/V).",
      id: "Teori Disintegrasi Positif (TPD) Dąbrowski. Kemerdekaan psikologis menuntut hancurnya kepribadian konformis (Level I) sebelum kamu bisa membangun tatanan nilai autentik pilihan sendiri (Level IV/V).",
      de: "Theorie der Positiven Desintegration (TPD). Psychologische Autonomie verlangt das Aufbrechen des rein angepassten Ichs, um frei gewählte Werte aufzubauen.",
      fr: "Théorie de la Désintégration Positive (TDP). L'autonomie véritable exige l'effondrement de l'ego conformiste pour reconstruire une échelle de valeurs souveraine.",
      es: "Teoría de la Desintegración Positiva de Dąbrowski. La autonomía requiere que el yo sumiso se rompa para erigir una jerarquía propia de valores elegidos."
    },
    actionProtocol: {
      en: [
        "Reframe the breakdown: Recognize that feeling 'broken' is not pathology, but the courageous shedding of a false self.",
        "Draft your 'Inner Constitution': Write down 3 non-negotiable core values that matter more to you than social applause.",
        "Voice journaling as a midwife: Use Nuju's zero-knowledge encrypted voice sanctuary to process identity grief without fear of judgment."
      ],
      id: [
        "Ubah cara pandangmu: Menyadari bahwa merasa hancur bukanlah penyakit gila, melainkan pelepasan topeng lama yang palsu.",
        "Susun 'Konstitusi Batin': Tulis 3 nilai prinsipil yang jauh lebih berharga bagimu daripada pujian orang lain.",
        "Jadikan Nuju teman persalinan jiwa: Curahkan rasa bingung dan duka identitas ke jurnal suara Nuju tanpa takut dinilai siapa pun."
      ],
      de: [
        "Krisen-Reframing: Das Gefühl des Zerbrechens ist keine Schwäche, sondern das notwendige Abstreifen einer fremdbestimmten Hülle.",
        "Eigene Wertehierarchie definieren: Schreiben Sie 3 Kernwerte auf, die Ihnen wichtiger sind als fremde Bestätigung.",
        "Das Nuju-Sprachjournal als Wegbegleiter: Nutzen Sie den geschützten Sprachraum, um Identitätskrisen ohne Scham zu verarbeiten."
      ],
      fr: [
        "Recadrez la crise : cet effondrement n'est pas une anomalie, c'est le dépouillement nécessaire de vos faux faux-semblants.",
        "Rédigez votre constitution intérieure : définissez 3 valeurs fondamentales supérieures à l'approbation sociale.",
        "Le journal vocal Nuju comme sanctuaire : déposez vos doutes et votre reconstruction dans Nuju en toute confidentialité."
      ],
      es: [
        "Reencuadra la crisis: sentirse roto no es una enfermedad, sino la muda indispensable de un personaje que ya no te sirve.",
        "Define tu constitución interior: establece 3 valores inviolables más importantes para ti que el aplauso ajeno.",
        "El diario de voz Nuju como refugio: procesa el duelo de tu vieja identidad en el santuario cifrado de Nuju con total libertad."
      ]
    },
    badge: {
      en: "POSITIVE DISINTEGRATION",
      id: "DISINTEGRASI POSITIF",
      de: "POSITIVE DESINTEGRATION",
      fr: "DÉSINTÉGRATION POSITIVE",
      es: "DESINTEGRACIÓN POSITIVA"
    }
  },
  {
    level: "profound_existential_angst",
    scoreRange: [32, 36],
    title: {
      en: "Profound Existential Alienation & Paralysis",
      id: "Keterasingan Eksistensial Berat & Kelumpuhan Batin",
      de: "Tiefe Existenzielle Entfremdung & Lähmung",
      fr: "Aliénation Existentielle Profonde & Paralysie",
      es: "Alienación Existencial Profunda y Parálisis"
    },
    summary: {
      en: "You are experiencing profound existential angst and cosmic dread. The weight of meaninglessness, moral outrage, and isolation has brought your emotional system to a standstill. You feel entirely foreign to human society, stranded in an unmapped dark night of the soul.",
      id: "Kamu sedang berada dalam jurang keterasingan eksistensial yang sangat pekat. Beban kehampaan, kemarahan moral, dan kesepian kosmik membuat motormu lumpuh. Kamu merasa terdampar di planet asing tanpa kompas.",
      de: "Sie befinden sich in einem Zustand tiefer existenzieller Lähmung. Das Gefühl der Sinnlosigkeit, Weltschmerz und Einsamkeit blockiert Ihren Lebensantrieb fast vollständig.",
      fr: "Vous traversez une crise existentielle majeure doublée d'un sentiment de néant et d'isolement total. La charge du monde paralyse votre élan vital au quotidien.",
      es: "Te encuentras sumido en una profunda angustia existencial y parálisis. El peso del vacío, la rabia moral y la soledad cósmica han bloqueado tu motor vital."
    },
    psychology: {
      en: "Severe existential crisis combined with deep alienation. Conventional psychiatric models frequently misdiagnose this as major depression or borderline dysregulation, missing the profound philosophical and moral overexcitability driving the crisis.",
      id: "Krisis eksistensial berat disertai keterasingan total. Model psikiatri biasa sering keliru mendiagnosis ini sebagai depresi biasa, mengabaikan dorongan moral dan sensitivitas filosofis tinggi yang menjadi pemicunya.",
      de: "Schwere existenzielle Krise. Wird in der klassischen Psychiatrie oft fälschlich als reine Depression fehldiagnostiziert, da die zugrunde liegende Hochbegabung/Intensität übersehen wird.",
      fr: "Crise existentielle aiguë avec aliénation. Souvent confondue avec une dépression classique, alors qu'elle découle d'une hyper-lucidité éthique et philosophique non accompagnée.",
      es: "Crisis existencial severa. A menudo se diagnostica erróneamente como depresión clínica común, pasando por alto la intensa sobreexcitabilidad ética y filosófica que la provoca."
    },
    actionProtocol: {
      en: [
        "Prioritize radical somatic safety: sleep, warm nourishment, tactile grounding, and walking in old-growth forests.",
        "Connect with an Existential or Gifted-Specialized Therapist who understands Kazimierz Dąbrowski and high intensity.",
        "Release raw despair in Nuju: Speak your existential dread aloud into Nuju's zero-knowledge voice vault. Giving voice to cosmic isolation prevents it from turning into toxic self-destruction."
      ],
      id: [
        "Prioritaskan pemulihan somatik mendasar: tidur cukup, makanan bergizi hangat, dan berjalan di bawah pepohonan rindang.",
        "Konsultasikan dengan psikolog atau terapis eksistensial yang memahami konsep giftedness dan overexcitability.",
        "Keluarkan rasa sesakmu di Nuju: Bicarakan keputusasaan eksistensialmu ke jurnal suara Nuju agar beban kosmik ini tidak menjadi racun yang merusak fisikmu."
      ],
      de: [
        "Radikale somatische Fürsorge: Ausreichend Schlaf, warme Mahlzeiten und Bewegung im Wald zur Erdung.",
        "Konsultieren Sie Therapeuten mit Schwerpunkt auf Hochbegabung, Hochsensibilität oder existenzieller Psychologie.",
        "Den Weltschmerz bei Nuju entladen: Sprechen Sie Ihre Verzweiflung im verschlüsselten Sprachraum aus, um seelischen Druck abzubauen."
      ],
      fr: [
        "Prenez soin de votre corps en priorité : sommeil réparateur, alimentation réconfortante et marches en forêt.",
        "Consultez un thérapeute spécialisé dans la douance, l'hypersensibilité ou la psychologie existentielle.",
        "Déchargez l'angoisse dans Nuju : parlez librement dans le journal vocal chiffré de Nuju pour ne pas laisser le vide vous ronger."
      ],
      es: [
        "Prioriza el cuidado somático radical: descanso de calidad, comida caliente y paseos conscientes en la naturaleza.",
        "Busca el acompañamiento de un psicólogo con enfoque existencial o especializado en altas capacidades e intensidad.",
        "Desahoga tu desgarro en Nuju: habla de tu angustia existencial en el diario de voz privado de Nuju para liberar la presión interna."
      ]
    },
    badge: {
      en: "COSMIC STRANGER",
      id: "PENGEMBARA KOSMIK",
      de: "KOSMISCHER FREMDER",
      fr: "ÉTRANGER DU COSMOS",
      es: "EXTRANJERO CÓSMICO"
    }
  }
];

export const EXISTENTIAL_DEPRESSION_OPTIONS = [
  {
    value: 0,
    label: {
      en: "Never / Rarely",
      id: "Tidak Pernah / Jarang",
      de: "Nie / Selten",
      fr: "Jamais / Rarement",
      es: "Nunca / Rara vez"
    }
  },
  {
    value: 1,
    label: {
      en: "Sometimes",
      id: "Kadang-kadang",
      de: "Manchmal",
      fr: "Parfois",
      es: "A veces"
    }
  },
  {
    value: 2,
    label: {
      en: "Often",
      id: "Sering",
      de: "Oft",
      fr: "Souvent",
      es: "A menudo"
    }
  },
  {
    value: 3,
    label: {
      en: "Almost Always / Constant",
      id: "Hampir Selalu / Terus-menerus",
      de: "Fast immer / Ständig",
      fr: "Presque toujours / En permanence",
      es: "Casi siempre / Constante"
    }
  }
];

export const EXISTENTIAL_DEPRESSION_SUBSCALE_INFO = {
  existential_alienation_dread: {
    name: {
      en: "Existential Alienation & Cosmic Dread",
      id: "Keterasingan Eksistensial & Kehampaan Kosmik",
      de: "Existenzielle Entfremdung & Kosmische Leere",
      fr: "Aliénation Existentielle & Angoisse Cosmique",
      es: "Alienación Existencial y Vacío Cósmico"
    },
    description: {
      en: "Absurdity of societal scripts, cosmic loneliness, consciousness of mortality, and ache over global suffering.",
      id: "Perasaan absurd terhadap norma sosial, kesepian kosmik, kesadaran tajam akan kefanaan, dan ngilu melihat penderitaan dunia.",
      de: "Absurdität gesellschaftlicher Konventionen, kosmische Einsamkeit, Vergänglichkeit und Leid an weltweiten Ungerechtigkeiten.",
      fr: "Absurdité des codes sociaux, solitude existentielle, conscience aiguë de la mort et douleur face au sort du monde.",
      es: "Absurdo de las metas sociales, soledad cósmica, lucidez ante la mortalidad y dolor por las injusticias globales."
    }
  },
  overexcitability_intensity: {
    name: {
      en: "Neuro-Emotional Over-Excitability & Moral Intensity",
      id: "Overexcitability Sensorik & Intensitas Moral",
      de: "Neuro-emotionale Übererregbarkeit & Ethische Intensität",
      fr: "Hyper-Excitabilité Émotionnelle & Intensité Morale",
      es: "Sobreexcitabilidad Emocional e Intensidad Moral"
    },
    description: {
      en: "Hyper-speed questioning of 'why', visceral disgust at hypocrisy, emotional sponge tendencies, and idealist pain.",
      id: "Pikiran hiperaktif membedah 'mengapa', muak fisik pada kemunafikan, menyerap emosi orang lain, dan pedihnya jurang idealisme.",
      de: "Rastloses Hinterfragen, Ekel vor Heuchelei, emotionale Schwammfunktion und Schmerz an der fehlerhaften Welt.",
      fr: "Questionnement permanent, rejet viscéral de l'hypocrisie, absorption des tensions d'autrui et souffrance de l'idéal.",
      es: "Cuestionamiento incesante, aversión visceral a la hipocresía, absorción del dolor ajeno y sufrimiento por los ideales rotos."
    }
  },
  positive_disintegration_crisis: {
    name: {
      en: "Positive Disintegration & Autonomous Values Crisis",
      id: "Disintegrasi Positif & Krisis Nilai Otonom",
      de: "Positive Desintegration & Autonome Wertkrise",
      fr: "Désintégration Positive & Crise de Valeurs Souveraines",
      es: "Desintegración Positiva y Crisis de Valores Propios"
    },
    description: {
      en: "Collapse of conventional mask, disquietude with current self, rejecting toxic positivity, and seeking authentic meaning.",
      id: "Runtuhnya topeng adaptasi sosial, kegelisahan terhadap diri sendiri, menolak positif toksik, dan mencari makna hidup sejati.",
      de: "Zerbrechen der Anpassungsmaske, quälende Selbstunruhe, Ablehnung plumper Phrasen und Suche nach eigenem Sinn.",
      fr: "Effondrement du masque social, tourment intérieur, rejet des platitudes positives et quête d'un sens souverain.",
      es: "Colapso de la máscara adaptativa, insatisfacción profunda con uno mismo, rechazo del positivismo superficial y búsqueda de sentido."
    }
  }
};

export function getExistentialDepressionResult(totalScore: number): ExistentialDepressionResultLevel {
  const matched = EXISTENTIAL_DEPRESSION_RESULTS.find(
    (lvl) => totalScore >= lvl.scoreRange[0] && totalScore <= lvl.scoreRange[1]
  );
  return matched || EXISTENTIAL_DEPRESSION_RESULTS[EXISTENTIAL_DEPRESSION_RESULTS.length - 1];
}

export function calculateExistentialDepressionSubscales(answers: Record<number, number>): {
  existential_alienation_dread: number;
  overexcitability_intensity: number;
  positive_disintegration_crisis: number;
} {
  let existential_alienation_dread = 0;
  let overexcitability_intensity = 0;
  let positive_disintegration_crisis = 0;

  EXISTENTIAL_DEPRESSION_QUESTIONS.forEach((q) => {
    const val = answers[q.id] || 0;
    if (q.subscale === "existential_alienation_dread") existential_alienation_dread += val;
    if (q.subscale === "overexcitability_intensity") overexcitability_intensity += val;
    if (q.subscale === "positive_disintegration_crisis") positive_disintegration_crisis += val;
  });

  return { existential_alienation_dread, overexcitability_intensity, positive_disintegration_crisis };
}
