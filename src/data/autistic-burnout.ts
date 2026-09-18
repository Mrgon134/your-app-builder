export type AutisticBurnoutCardLang = "en" | "id" | "de" | "fr" | "es";

export interface AutisticBurnoutQuestion {
  id: number;
  subscale: "pervasive_exhaustion" | "skill_regression" | "sensory_intolerance";
  text: {
    en: string;
    id: string;
    de: string;
    fr: string;
    es: string;
  };
}

export interface AutisticBurnoutResultLevel {
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

export const AUTISTIC_BURNOUT_QUESTIONS: AutisticBurnoutQuestion[] = [
  // 1. Pervasive Chronic Exhaustion
  {
    id: 1,
    subscale: "pervasive_exhaustion",
    text: {
      en: "I experience a bone-deep, pervasive exhaustion that 10+ hours of sleep, weekends, or vacations cannot fix.",
      id: "Saya mengalami kelelahan kronis mendalam yang tidak kunjung pulih meski sudah tidur 10+ jam, berakhir pekan, atau liburan.",
      de: "Ich leide unter einer tiefen, anhaltenden Erschöpfung, die sich weder durch langen Schlaf noch durch Wochenenden oder Urlaub bessert.",
      fr: "Je ressens un épuisement viscéral et permanent que ni 10h de sommeil ni les week-ends ou vacances ne parviennent à soulager.",
      es: "Siento un agotamiento profundo y persistente que ni diez horas de sueño ni los fines de semana o vacaciones logran reparar."
    }
  },
  {
    id: 2,
    subscale: "pervasive_exhaustion",
    text: {
      en: "Small everyday interactions (like greeting neighbors, answering phone calls, or small talk) feel like running a marathon.",
      id: "Interaksi sosial kecil sehari-hari (seperti menyapa tetangga, membalas panggilan, atau basa-basi) terasa seperti berlari maraton.",
      de: "Kleine alltägliche Interaktionen (Nachbarn grüßen, Anrufe annehmen, Smalltalk) fühlen sich an wie ein Marathonlauf.",
      fr: "Les interactions quotidiennes anodines (saluer les voisins, décrocher le téléphone, bavarder) me coûtent autant qu'un marathon.",
      es: "Interacciones sociales cotidianas mínimas (saludar vecinos, contestar llamadas, charlas triviales) se sienten como una maratón."
    }
  },
  {
    id: 3,
    subscale: "pervasive_exhaustion",
    text: {
      en: "I no longer have the mental energy to maintain social 'masking'—pretending to be neurotypical has become completely impossible.",
      id: "Saya tidak lagi memiliki kapasitas mental untuk mempertahankan 'masking' sosial—berpura-pura normal terasa mustahil.",
      de: "Ich habe nicht mehr die Energie fürs soziale 'Masking' – so zu tun, als sei ich neurotypisch, ist völlig unmöglich geworden.",
      fr: "Je n'ai plus du tout l'énergie de maintenir mon camouflage social (masking) ; prétendre être neurotypique est devenu surhumain.",
      es: "Ya no me queda energía para sostener el 'masking' social; aparentar ser neurotípico se ha vuelto una tarea imposible."
    }
  },
  {
    id: 4,
    subscale: "pervasive_exhaustion",
    text: {
      en: "After social demands or a workday, I enter a state of non-functional collapse, unable to move or form thoughts for hours.",
      id: "Setelah tuntutan sosial atau jam kerja, saya masuk ke fase kolaps total—tidak mampu bergerak atau berpikir jernih selama berjam-jam.",
      de: "Nach sozialen Anforderungen oder Arbeitstagen breche ich völlig zusammen und kann mich stundenlang weder bewegen noch klar denken.",
      fr: "Après une journée de travail ou des obligations sociales, je m'effondre dans un état d'inertie totale, incapable de bouger ou de penser.",
      es: "Tras jornadas laborales o sociales, colapso por completo y quedo inmóvil sin poder articular pensamientos durante horas."
    }
  },

  // 2. Skill Regression & Executive Dysfunction
  {
    id: 5,
    subscale: "skill_regression",
    text: {
      en: "I find myself struggling with basic daily life skills I used to do easily (e.g., cooking simple meals, showering, organizing groceries).",
      id: "Saya kesulitan melakukan tugas dasar sehari-hari yang dulu biasa saya lakukan (misalnya memasak makanan sederhana, mandi, merapikan belanjaan).",
      de: "Ich scheitere plötzlich an alltäglichen Fähigkeiten, die früher leicht fielen (z. B. einfache Mahlzeiten kochen, duschen, einkaufen).",
      fr: "J'ai soudain du mal avec des tâches de base que je maîtrisais autrefois (cuisiner un plat simple, prendre une douche, ranger).",
      es: "Me cuesta ejecutar tareas cotidianas básicas que antes resolvía sin problema (cocinar algo simple, ducharme, ordenar compras)."
    }
  },
  {
    id: 6,
    subscale: "skill_regression",
    text: {
      en: "I experience episodes of speech loss, stuttering, word-finding difficulty, or temporary selective mutism when overwhelmed.",
      id: "Saya mengalami episode kehilangan kemampuan berbicara, gagap, sulit menemukan kata-kata, atau mutisme selektif sementara saat kewalahan.",
      de: "Wenn ich überfordert bin, verliere ich zeitweise die Sprache, stottere, finde keine Worte oder werde unfreiwillig stumm.",
      fr: "Face au stress, je perds l'usage fluide de la parole : je bute sur les mots, bégaie ou deviens temporairement mutique.",
      es: "En momentos de sobrecarga experimento bloqueos del habla, tartamudeo, pérdida de vocabulario o mutismo selectivo temporal."
    }
  },
  {
    id: 7,
    subscale: "skill_regression",
    text: {
      en: "My executive function has crashed: simple decision-making, planning, and task-switching induce immediate paralysis.",
      id: "Fungsi eksekutif otak saya anjlok: mengambil keputusan sederhana, merencanakan jadwal, atau berganti tugas memicu paralisis seketika.",
      de: "Meine Exekutivfunktionen sind blockiert: Einfache Entscheidungen, Planen oder Aufgabenwechsel lösen sofortige Lähmung aus.",
      fr: "Mes fonctions exécutives sont à l'arrêt : prendre une décision basique ou changer de tâche me plonge dans une paralysie immédiate.",
      es: "Mis funciones ejecutivas están colapsadas: tomar decisiones sencillas o cambiar de tarea me genera una parálisis inmediata."
    }
  },
  {
    id: 8,
    subscale: "skill_regression",
    text: {
      en: "I forget critical information, lose track of conversations midway, and feel as though my cognitive processing speed has halved.",
      id: "Saya sering melupakan informasi penting, kehilangan fokus di tengah obrolan, dan merasa kecepatan berpikir otak menurun drastis.",
      de: "Ich vergesse wichtige Dinge, verliere mitten im Satz den Faden und habe das Gefühl, mein Gehirn arbeitet nur noch in halber Geschwindigkeit.",
      fr: "J'oublie des données cruciales, je perds le fil de mes conversations et j'ai l'impression que ma vitesse de réflexion est divisée par deux.",
      es: "Olvido datos cruciales, pierdo el hilo de las conversaciones y siento que mi velocidad de procesamiento mental se redujo a la mitad."
    }
  },

  // 3. Sensory Intolerance & Overload Vulnerability
  {
    id: 9,
    subscale: "sensory_intolerance",
    text: {
      en: "Background noises (fluorescent hums, ticking, chewing, traffic) feel physically painful and impossible to filter out.",
      id: "Suara latar (dengung lampu neon, detak jam, suara orang mengunyah, bising jalanan) terasa menyakitkan secara fisik dan tak bisa disaring.",
      de: "Hintergrundgeräusche (Summen von Lampen, Ticken, Kauen, Straßenlärm) tun mir körperlich weh und lassen sich nicht mehr filtern.",
      fr: "Les bruits de fond (bourdonnements électriques, tic-tac, bruits de mastication) me provoquent une douleur physique intolérable.",
      es: "Los ruidos de fondo (zumbidos de luces, masticación, tráfico) me causan dolor físico y me resulta imposible filtrarlos."
    }
  },
  {
    id: 10,
    subscale: "sensory_intolerance",
    text: {
      en: "Bright lights, grocery store fluorescent lighting, or visual clutter instantly trigger nausea, headaches, or intense agitation.",
      id: "Cahaya terang, lampu supermarket, atau ruangan yang berantakan langsung memicu mual, pusing, atau kecemasan luar biasa.",
      de: "Helles Licht, Supermarkt-Leuchtstoffröhren oder visuelles Chaos lösen sofort Übelkeit, Kopfschmerzen oder Wut/Panik aus.",
      fr: "Les néons des magasins, la lumière vive ou le désordre visuel me provoquent instantanément nausées, migraines ou vive agitation.",
      es: "Las luces fluorescentes, los supermercados o el desorden visual me desencadenan náuseas, dolor de cabeza o agitación extrema."
    }
  },
  {
    id: 11,
    subscale: "sensory_intolerance",
    text: {
      en: "Clothing textures, seams, tags, or sudden physical touch that used to be tolerable now feel excruciating against my skin.",
      id: "Tekstur pakaian, jahitan kain, label baju, atau sentuhan fisik mendadak yang dulu biasa saja kini terasa menyengat dan menyiksa kulit.",
      de: "Kleidungstexturen, Nähte, Etiketten oder unerwartete Berührungen, die ich früher ertrug, fühlen sich unerträglich schmerzhaft an.",
      fr: "Les coutures des vêtements, les étiquettes ou un contact tactile inattendu me semblent désormais douloureusement insupportables.",
      es: "Las etiquetas de la ropa, las costuras o roces físicos inesperados que antes toleraba ahora me resultan insoportables."
    }
  },
  {
    id: 12,
    subscale: "sensory_intolerance",
    text: {
      en: "My sensory threshold has evaporated: minor stimuli rapidly push me toward sensory meltdowns (crying/rage) or shutdowns (catatonia).",
      id: "Ambang toleransi sensorik saya habis: rangsangan sepele cepat melempar saya ke meltdown sensorik (menangis/marah) atau shutdown (membeku).",
      de: "Meine sensorische Reizschwelle existiert kaum noch: Kleinigkeiten treiben mich in sensorische Meltdowns oder apathische Shutdowns.",
      fr: "Mon seuil de tolérance sensorielle a disparu : la moindre stimulation me précipite dans un meltdown ou un shutdown catatonique.",
      es: "Mi umbral sensorial se esfumó: cualquier estímulo menor me arrastra a un colapso sensorial (llanto/furia) o a una desconexión total."
    }
  }
];

export const AUTISTIC_BURNOUT_OPTIONS = [
  {
    value: 0,
    label: {
      en: "Never / Completely Untrue",
      id: "Tidak Pernah / Sama Sekali Tidak Benar",
      de: "Nie / Völlig unzutreffend",
      fr: "Jamais / Totalement inexact",
      es: "Nunca / Totalmente falso"
    }
  },
  {
    value: 1,
    label: {
      en: "Rarely (Once a month)",
      id: "Jarang (Sebulan sekali)",
      de: "Selten (Einmal im Monat)",
      fr: "Rarement (Une fois par mois)",
      es: "Raras veces (Una vez al mes)"
    }
  },
  {
    value: 2,
    label: {
      en: "Sometimes (Weekly)",
      id: "Kadang-kadang (Mingguan)",
      de: "Manchmal (Wöchentlich)",
      fr: "Parfois (Hebdomadaire)",
      es: "A veces (Semanal)"
    }
  },
  {
    value: 3,
    label: {
      en: "Often (Most days)",
      id: "Sering (Hampir setiap hari)",
      de: "Häufig (Fast täglich)",
      fr: "Souvent (Presque tous les jours)",
      es: "A menudo (Casi a diario)"
    }
  },
  {
    value: 4,
    label: {
      en: "Constantly / All the Time",
      id: "Selalu / Sepanjang Waktu",
      de: "Ständig / Dauerhaft",
      fr: "Constamment / En permanence",
      es: "Constantemente / Todo el tiempo"
    }
  }
];

export const AUTISTIC_BURNOUT_RESULTS: AutisticBurnoutResultLevel[] = [
  {
    level: "resilient_baseline",
    scoreRange: [0, 11],
    title: {
      en: "Resilient Baseline · Sustainable Masking Load",
      id: "Kapasitas Stabil · Beban Masking Terkendali",
      de: "Stabile Belastbarkeit · Nachhaltiges Masking-Niveau",
      fr: "Équilibre Préservé · Charge de Camouflage Soutenable",
      es: "Línea Base Resiliente · Sobrecarga de Masking Sostenible"
    },
    badge: {
      en: "Resilient Reserves",
      id: "Cadangan Energi Aman",
      de: "Stabile Reserven",
      fr: "Réserves Préservées",
      es: "Reservas Estables"
    },
    summary: {
      en: "Your autonomic nervous system and sensory bandwidth are operating within safe functional margins. While you may encounter occasional fatigue from neurotypical expectations, you do not exhibit systemic autistic burnout or chronic skill loss.",
      id: "Sistem saraf otonom dan kapasitas sensorik Anda beroperasi dalam batas aman. Meskipun kadang merasa lelah oleh ekspektasi lingkungan, Anda tidak menunjukkan tanda-tanda autistic burnout sistemik atau kehilangan keterampilan.",
      de: "Ihr Nervensystem und Ihre sensorische Belastbarkeit befinden sich im grünen Bereich. Gelegentliche Müdigkeit durch soziale Anforderungen führt bei Ihnen nicht zu chronischem Skill-Verlust oder autistischem Burnout.",
      fr: "Votre système nerveux autonome et votre tolérance sensorielle demeurent stables. Vous ne présentez pas de signes de burnout autistique systémique ni de régression cognitive durable.",
      es: "Tu sistema nervioso y tolerancia sensorial operan en márgenes seguros. No muestras signos de burnout autístico sistémico ni pérdida crónica de habilidades ejecutivas."
    },
    neurobiology: {
      en: "Prefrontal executive networks and sensory gating mechanisms in the thalamus maintain homeostatic regulation. Neurodivergent masking demands remain below the threshold that triggers microglial neuroinflammation or autonomic freeze.",
      id: "Jaringan eksekutif prefrontal dan filter sensorik talamus masih bekerja harmonis. Tuntutan masking berada di bawah ambang batas yang memicu peradangan saraf atau kolaps otonom.",
      de: "Die präfrontalen Exekutivnetzwerke und die sensorische Filterung im Thalamus arbeiten stabil ohne chronische Überlastung der Neurotransmitter.",
      fr: "Les circuits exécutifs préfrontaux et les filtres sensoriels thalamiques conservent leur régulation normale sans surchauffe allostatique.",
      es: "Las redes prefrontales y los filtros sensoriales del tálamo mantienen su equilibrio sin sobrecarga alostática crónica."
    },
    actionProtocol: {
      en: [
        "Audit unmasking moments: Protect at least 60 minutes daily where zero social performance is required.",
        "Establish sensory baselines: Keep noise-canceling headphones nearby before sensory environments escalate.",
        "Use unpressured vocal decompression: Speak uncensored thoughts into Nuju to offload daily masking friction without formatting."
      ],
      id: [
        "Jadwalkan waktu unmasking: Sisihkan minimal 60 menit sehari di mana Anda sama sekali tidak perlu berpura-pura normal.",
        "Gunakan alat bantu sensorik: Siapkan headphone peredam bising sebelum memasuki tempat umum yang ramai.",
        "Dekompresi suara tanpa tekanan: Gunakan jurnal audio Nuju untuk meluapkan unek-unek tanpa perlu menyusun kata dengan rapi."
      ],
      de: [
        "Tägliche Masking-Pausen: Mindestens 60 Minuten täglich völlig ohne soziale Fassade verbringen.",
        "Sensorische Vorsorge: Noise-Cancelling-Kopfhörer griffbereit halten, bevor Reizüberflutung entsteht.",
        "Druckfreie Stimmentlastung: Gedanken unzensiert im verschlüsselten Nuju-Audio-Journal entladen."
      ],
      fr: [
        "Moments de dé-camouflage : Réservez au moins 60 minutes par jour sans aucune performance sociale.",
        "Protection sensorielle : Gardez un casque anti-bruit à portée de main avant que l'environnement ne sature.",
        "Décharge vocale spontanée : Utilisez le journal vocal chiffré de Nuju pour évacuer la tension sans filtre."
      ],
      es: [
        "Espacios sin máscara: Reserva al menos 60 minutos al día libres de cualquier exigencia social.",
        "Protección sensorial previa: Ten a mano auriculares con cancelación de ruido antes de saturarte.",
        "Descompresión por voz: Graba tus pensamientos sin censura en el diario cifrado de Nuju para liberar fatiga."
      ]
    }
  },

  {
    level: "mild_masking_strain",
    scoreRange: [12, 20],
    title: {
      en: "Mild Masking Strain · Early Compensatory Fatigue",
      id: "Tekanan Masking Ringan · Kelelahan Kompensasi Dini",
      de: "Leichte Masking-Belastung · Beginnende Erschöpfung",
      fr: "Tension Légère de Camouflage · Fatigue Compensatoire",
      es: "Tensión Leve por Masking · Fatiga Compensatoria Inicial"
    },
    badge: {
      en: "Sensory Friction",
      id: "Gesekan Sensorik",
      de: "Reiz-Friktion",
      fr: "Friction Sensorielle",
      es: "Fricción Sensorial"
    },
    summary: {
      en: "You are spending considerable cognitive bandwidth actively compensating for neurotypical social demands. Sensory hypersensitivity is rising, and routine recovery takes longer than usual, signalling the early entry into autistic burnout.",
      id: "Anda menghabiskan banyak kapasitas kognitif untuk menyesuaikan diri dengan ekspektasi sosial neurotipikal. Sensitivitas sensorik mulai meningkat dan pemulihan energi butuh waktu lebih lama.",
      de: "Sie verbrauchen erhebliche kognitive Ressourcen, um neurotypische Erwartungen zu erfüllen. Sensorische Reizempfindlichkeit steigt und Erholungsphasen dauern spürbar länger.",
      fr: "Vous dépensez une énergie cognitive considérable pour compenser les attentes sociales. L'hypersensibilité sensorielle augmente et la récupération devient plus lente.",
      es: "Consumes una cantidad notable de energía cognitiva para adaptarte a normas neurotípicas. La sensibilidad sensorial aumenta y la recuperación se vuelve más lenta."
    },
    neurobiology: {
      en: "High allostatic load in the dorsal anterior cingulate cortex from constant social monitoring. Increased auditory and visual hyper-connectivity leading to sensory gating fatigue in the thalamus.",
      id: "Beban alostatik tinggi pada korteks singulata anterior akibat pemantauan diri yang intens. Hiperkonektivitas sensorik menyebabkan kelelahan filter talamus.",
      de: "Erhöhte allostatische Last im anterioren cingulären Kortex durch permanente soziale Selbstüberwachung und beginnende Thalamus-Überlastung.",
      fr: "Charge allostatique élevée dans le cortex cingulaire antérieur due au contrôle social permanent et début de fatigue thalamique.",
      es: "Elevada carga alostática en el córtex cingulado anterior por hipervigilancia social y fatiga en los filtros sensoriales del tálamo."
    },
    actionProtocol: {
      en: [
        "Incorporate deliberate low-demand evenings: Cut out non-essential chores after high-masking social days.",
        "Embrace sensory accommodations: Dim indoor lighting, switch to soft seamless clothing, and wear earplugs in transit.",
        "Offload verbal articulation: When speaking to people feels tiring, record private raw voice memos in Nuju to process emotions without eye contact."
      ],
      id: [
        "Terapkan malam minim tuntutan: Kurangi pekerjaan rumah yang tidak mendesak setelah hari dengan beban sosial tinggi.",
        "Gunakan akomodasi sensorik: Redupkan lampu, kenakan pakaian yang nyaman tanpa label kasar, dan gunakan earplug saat bepergian.",
        "Lepaskan beban bicara: Saat lelah berbicara dengan orang lain, rekam suara Anda secara bebas di Nuju tanpa perlu kontak mata."
      ],
      de: [
        "Reizarme Abende einrichten: Nicht zwingend notwendige Pflichten nach anstrengenden Arbeitstagen rigoros streichen.",
        "Sensorische Entlastung: Licht dimmen, nahtlose bequeme Kleidung tragen und Ohrstöpsel im Nahverkehr nutzen.",
        "Sprechdruck abbauen: Wenn Reden mit Menschen erschöpft, Gefühle ohne Blickkontakt ins Nuju-Audio-Journal sprechen."
      ],
      fr: [
        "Soirées à basse exigence : Supprimez les corvées non essentielles après des journées de forte interaction.",
        "Aménagements sensoriels : Tamisez les lumières, portez des vêtements doux et utilisez des bouchons d'oreilles.",
        "Allégez la parole : Quand parler aux autres devient lourd, confiez vos pensées brutes au journal vocal Nuju sans contact visuel."
      ],
      es: [
        "Tardes de baja demanda: Elimina tareas domésticas no urgentes después de jornadas con mucho contacto social.",
        "Acomodaciones sensoriales: Atenúa las luces, usa ropa holgada y lleva tapones en transportes ruidosos.",
        "Alivia el esfuerzo verbal: Si hablar en persona te satura, exprésate libremente en el diario de voz de Nuju sin contacto visual."
      ]
    }
  },

  {
    level: "moderate_autistic_burnout",
    scoreRange: [21, 30],
    title: {
      en: "Moderate Autistic Burnout · Skill Regression & Overload",
      id: "Autistic Burnout Moderat · Regresi Keterampilan & Overload",
      de: "Moderater Autistischer Burnout · Skill-Rückgang & Überlastung",
      fr: "Burnout Autistique Modéré · Régression d'Aptitudes & Surcharge",
      es: "Burnout Autístico Moderado · Regresión de Habilidades y Sobrecarga"
    },
    badge: {
      en: "Executive Crash",
      id: "Krisis Eksekutif",
      de: "Exekutiv-Kollaps",
      fr: "Crise Exécutive",
      es: "Crisis Ejecutiva"
    },
    summary: {
      en: "You have crossed into active autistic burnout according to AASPIRE criteria. You are experiencing notable skill loss (struggling with cooking, hygiene, or decision-making), social speech exhaustion, and acute sensory hypersensitivity. Standard 'depression' advice (e.g. 'go socialize') will worsen this condition.",
      id: "Anda berada dalam fase autistic burnout aktif berdasarkan kriteria AASPIRE. Anda mengalami penurunan keterampilan nyata (kesulitan memasak, mengurus diri, atau mengambil keputusan), kelelahan bicara, dan hipersensitivitas sensorik. Nasihat depresi umum (seperti 'banyak jalan-jalan keluar') justru akan memperburuk kondisi Anda.",
      de: "Sie befinden sich nach AASPIRE-Kriterien in einem aktiven autistischen Burnout. Bemerkbarer Skill-Verlust (Schwierigkeiten beim Kochen, bei Hygiene oder Entscheidungen) und akute Reizüberflutung treten auf. Standard-Depressionstipps verschlimmern diesen Zustand.",
      fr: "Vous êtes en plein burnout autistique selon les critères AASPIRE. Vous perdez des compétences acquises (cuisine, hygiène, décisions) et subissez une hypersensibilité sensorielle accrue. Les conseils classiques pour la dépression sont contre-productifs.",
      es: "Presentas burnout autístico activo según los criterios clínicos de AASPIRE. Experimentas pérdida tangible de habilidades cotidianas, fatiga verbal y sobrecarga sensorial. Los consejos estándar para la depresión empeorarán tu cuadro."
    },
    neurobiology: {
      en: "Severe hypometabolism in the bilateral dorsolateral prefrontal cortex causing executive dysfunction. The autonomic nervous system is oscillating between dorsal vagal shutdown (inertia, catatonia) and sympathetic hyperarousal (meltdowns).",
      id: "Hipometabolisme parah pada korteks prefrontal dorsolateral yang melumpuhkan fungsi eksekutif. Sistem saraf otonom berosilasi antara dorsal vagal shutdown (beku/lemas) dan meltdown simpatik.",
      de: "Hypometabolismus im dorsolateralen präfrontalen Kortex führt zu exekutivem Funktionsverlust. Das Nervensystem pendelt zwischen dorsalem Vagus-Shutdown und Meltdowns.",
      fr: "Hypométabolisme préfrontal dorsolatéral provoquant une paralysie exécutive. Le système oscille entre le shutdown dorsal et le meltdown sympathique.",
      es: "Hipometabolismo en el córtex prefrontal dorsolateral que bloquea la función ejecutiva. El sistema oscila entre colapso vagal dorsal y crisis de ira/llanto."
    },
    actionProtocol: {
      en: [
        "Enact immediate radical rest: Stop trying to push through. Cut 50% of optional appointments for the next 14 days.",
        "Implement sensory sanctuary mode: Spend 2-3 hours daily in low-lit rooms with weighted blankets and silent environments.",
        "Zero-demand communication: Inform loved ones you are experiencing verbal fatigue. Use Nuju's encrypted voice journal to vent privately when words won't come out in social conversation."
      ],
      id: [
        "Lakukan istirahat radikal segera: Jangan dipaksakan. Batalkan 50% agenda yang tidak krusial selama 14 hari ke depan.",
        "Masuk ke mode ruang sensorik: Habiskan 2-3 jam sehari di ruangan temaram dengan selimut tebal dan ketenangan tanpa suara bising.",
        "Komunikasi tanpa tekanan bicara: Beritahu orang terdekat bahwa Anda sedang lelah berbicara. Gunakan jurnal suara Nuju untuk meluapkan isi hati secara privat tanpa perlu menyusun kalimat formal."
      ],
      de: [
        "Radikale Ruhepause anordnen: Nicht weiter durchbeißen! 50 % aller optionalen Verpflichtungen für 14 Tage streichen.",
        "Reizfreie Zuflucht schaffen: Täglich 2–3 Stunden in abgedunkelten Räumen mit Gewichtsdecke und Stille verbringen.",
        "Kommunikation auf Null fahren: Nahestehenden mitteilen, dass Sprechen erschöpft. Nutzen Sie Nuju, um Gedanken privat einzusprechen, wenn soziale Gespräche unmöglich sind."
      ],
      fr: [
        "Repos radical immédiat : Cessez de forcer. Annulez 50 % de vos obligations non vitales pendant deux semaines.",
        "Sanctuaire sensoriel : Passez 2 à 3 heures par jour dans une pièce sombre, au calme, sous une couverture lestée.",
        "Zéro pression verbale : Expliquez à vos proches votre fatigue d'élocution. Déchargez vos pensées dans Nuju sans contrainte de formulation."
      ],
      es: [
        "Descanso radical inmediato: No te fuerces más. Cancela el 50% de compromisos opcionales durante las próximas dos semanas.",
        "Santuario sensorial: Pasa 2 o 3 horas al día en penumbra, en silencio y con mantas pesadas para calmar el sistema.",
        "Cero exigencia verbal: Comunica a tus allegados tu fatiga para hablar. Graba reflexiones íntimas en Nuju sin preocuparte por la gramática ni el tono."
      ]
    }
  },

  {
    level: "severe_autistic_burnout",
    scoreRange: [31, 39],
    title: {
      en: "Severe Autistic Burnout · AASPIRE Clinical Saturation",
      id: "Autistic Burnout Berat · Saturasi Klinis AASPIRE",
      de: "Schwerer Autistischer Burnout · Klinische AASPIRE-Sättigung",
      fr: "Burnout Autistique Sévère · Saturation Clinique AASPIRE",
      es: "Burnout Autístico Severo · Saturación Clínica AASPIRE"
    },
    badge: {
      en: "Critical Overload",
      id: "Kelebihan Beban Kritis",
      de: "Kritische Überlastung",
      fr: "Surcharge Critique",
      es: "Sobrecarga Crítica"
    },
    summary: {
      en: "Your nervous system has entered deep autonomic exhaustion. You are experiencing significant skill regression (inability to prepare meals, manage hygiene, or speak comfortably), pervasive sensory agony, and long bouts of couch-lock shutdown. You require urgent neurodiversity-affirming accommodations and withdrawal from masking environments.",
      id: "Sistem saraf Anda berada dalam kondisi kelelahan otonom mendalam. Terjadi regresi kemampuan yang signifikan (sulit makan, mandi, atau berbicara lancar), nyeri sensorik hebat, dan shutdown berkepanjangan di tempat tidur. Anda butuh akomodasi unmasking mendesak.",
      de: "Ihr Nervensystem befindet sich in tiefer Erschöpfung. Gravierender Skill-Verlust (Schwierigkeiten bei Ernährung, Hygiene oder Sprechen), unerträgliche sensorische Schmerzen und apathische Shutdowns dominieren Ihren Alltag. Dringende Entlastung ist unumgänglich.",
      fr: "Votre système nerveux est en épuisement profond. Vous subissez une régression majeure de vos compétences quotidiennes, des douleurs sensorielles aiguës et de longs épisodes de shutdown catatonique. Un retrait d'urgence des exigences sociales s'impose.",
      es: "Tu sistema nervioso ha entrado en un colapso profundo. Hay una pérdida severa de habilidades de autocuidado, hablar requiere un esfuerzo colosal y sufres dolor sensorial constante con parálisis en la cama. Necesitas descompresión urgente."
    },
    neurobiology: {
      en: "Chronic neuroinflammatory state triggered by unrelenting allostatic overload. Severe microglial activation in the amygdala and anterior insula, collapsing sensory filtering and triggering involuntary dorsal vagal dissociation.",
      id: "Peradangan saraf kronis akibat beban stres alostatik berkepanjangan. Aktivasi mikroglia di amigdala dan insula anterior melumpuhkan filter sensorik serta memicu disosiasi dorsal vagal tak terkendali.",
      de: "Chronischer neuroinflammatorischer Zustand durch allostatische Dauerüberlastung. Zusammenbruch der Reizfilterung und unwillkürliche dorsale Vagus-Dissoziation.",
      fr: "État neuro-inflammatoire chronique lié à une surcharge allostatique persistante. Effondrement du filtrage sensoriel et dissociation vagale dorsale réflexe.",
      es: "Estado neuroinflamatorio crónico por sobrecarga alostática. Colapso de los filtros sensoriales que activa una disociación vagal dorsal involuntaria."
    },
    actionProtocol: {
      en: [
        "Implement non-verbal days: Communicate via text or written notes only. Eliminate vocal demands when speaking induces physical pain.",
        "Medical & workplace leave: Obtain doctor-certified leave or emergency accommodations for neurodivergent burnout.",
        "Safe somatic vocal venting: When you can whisper or hum, use Nuju's private audio sanctuary to release internal panic and thoughts without having to look at or respond to another human."
      ],
      id: [
        "Terapkan hari non-verbal: Berkomunikasilah hanya lewat teks atau pesan singkat. Hilangkan keharusan berbicara jika pita suara dan otak terasa sakit.",
        "Ambil cuti pemulihan: Ajukan izin istirahat medis atau cuti darurat untuk memulihkan fungsi sistem saraf dari burnout.",
        "Ventilasi suara privat di Nuju: Saat Anda hanya mampu berbisik atau bergumam, gunakan jurnal audio Nuju untuk mengeluarkan kekacauan pikiran tanpa beban harus berinteraksi dengan orang lain."
      ],
      de: [
        "Non-verbale Tage einlegen: Ausschließlich per Textnachricht kommunizieren. Sprechen komplett einstellen, wenn es Schmerzen bereitet.",
        "Krankmeldung erwägen: Ärztliche Krankschreibung zur Regeneration des Nervensystems einholen.",
        "Sichere Stimmentlastung: Wenn Sie nur noch flüstern oder summen können, nutzen Sie das Nuju-Audio-Tagebuch, um die innere Not ohne Gegenüber loszuwerden."
      ],
      fr: [
        "Journées non-verbales : Communiquez exclusivement par écrit. Supprimez l'obligation de parler quand cela devient physiquement douloureux.",
        "Arrêt de travail nécessaire : Prenez un arrêt médical pour régénérer votre système nerveux saturé.",
        "Journal vocal à voix basse : Utilisez le sanctuaire audio de Nuju pour murmurer et vider votre esprit sans regard extérieur."
      ],
      es: [
        "Días no verbales: Comunícate solo por texto. Suprime hablar en voz alta si te causa fatiga o dolor físico.",
        "Baja médica por agotamiento: Solicita reposo formal para frenar el colapso de tu sistema nervioso.",
        "Expresión segura en Nuju: Si solo tienes fuerza para susurrar, graba tus emociones en el diario privado de Nuju sin presiones de interacción humana."
      ]
    }
  },

  {
    level: "critical_exhaustion",
    scoreRange: [40, 48],
    title: {
      en: "Critical Neurodivergent Exhaustion · Total Collapse & Mutism Risk",
      id: "Kolaps Neurodivergen Kritis · Risiko Mutisme & Lumpuh Total",
      de: "Kritische Erschöpfung · Totaler Zusammenbruch & Mutismus-Gefahr",
      fr: "Épuisement Neurodivergent Critique · Risque de Mutisme & Effondrement",
      es: "Agotamiento Neurodivergente Crítico · Colapso Total y Riesgo de Mutismo"
    },
    badge: {
      en: "Systemic Collapse",
      id: "Kolaps Sistemik",
      de: "Systemischer Kollaps",
      fr: "Effondrement Systémique",
      es: "Colapso Sistémico"
    },
    summary: {
      en: "You are in an acute state of autistic burnout crisis. Speech is often completely blocked (situational/selective mutism), motor planning is paralyzed, and sensory inputs cause visceral agony. This is a physiological emergency of nervous system depletion requiring total cessation of masking, emergency sensory deprivation, and trusted support.",
      id: "Anda berada dalam krisis autistic burnout tingkat akut. Bicara sering terkunci total (mutisme situasional/selektif), perencanaan motorik lumpuh, dan rangsangan sensorik memicu penderitaan fisik nyata. Ini adalah kondisi darurat fisiologis yang memerlukan penghentian total masking, isolasi sensorik hening, dan bantuan orang terpercaya.",
      de: "Sie befinden sich in einer akuten Krise des autistischen Burnouts. Die Sprache ist oft blockiert (situativer Mutismus), die Motorik gelähmt und Sinneseindrücke bereiten körperliche Schmerzen. Dies ist ein neurobiologischer Notfall, der sofortigen Masking-Stopp und Reizentzug erfordert.",
      fr: "Vous traversez une crise aiguë de burnout autistique. La parole est souvent bloquée (mutisme situationnel), la planification motrice est figée et les stimuli sensoriels sont intolérables. C'est une urgence physiologique exigeant l'arrêt total du camouflage et un repos absolu.",
      es: "Te encuentras en una crisis extrema de burnout autístico. El habla está frecuentemente bloqueada (mutismo situacional), la movilidad reducida y cualquier estímulo sensorial causa dolor intolerable. Es una emergencia neurobiológica que exige aislamiento sensorial y descanso total."
    },
    neurobiology: {
      en: "Full systemic neurobiological crash. Severe suppression of the speech-motor cortex (Broca's area), catecholamine depletion, and maximal dorsal vagal immobility designed to protect the organism from lethal sensory overload.",
      id: "Kolaps neurobiologis total. Penekanan hebat pada korteks motorik wicara (area Broca), kehabisan katekolamin, dan imobilitas dorsal vagal maksimal untuk melindungi tubuh dari kelebihan beban mematikan.",
      de: "Vollständiger neurobiologischer Zusammenbruch. Massive Hemmung des Sprachzentrums (Broca-Areal), Katecholamin-Mangel und maximale dorsale Vagus-Erstarrung als Schutzreflex.",
      fr: "Effondrement neurobiologique systémique. Inhibition majeure de l'aire de Broca (parole), épuisement en catécholamines et sidération vagale dorsale protectrice maximale.",
      es: "Colapso neurobiológico total. Inhibición profunda del área de Broca (habla), agotamiento de catecolaminas y parálisis vagal dorsal extrema como mecanismo de defensa."
    },
    actionProtocol: {
      en: [
        "Total sensory cocoon: Blackout curtains, noise-canceling earmuffs, zero social demands, and liquid/pre-made simple foods.",
        "Delegate all executive decisions: Assign all paperwork, bills, and communications to a trusted neurodiversity ally.",
        "Pure unpressured expression: When able to make any sound, whisper or hum into Nuju's voice journal for autonomic self-regulation without any requirement to be coherent."
      ],
      id: [
        "Kepompong sensorik total: Tutup gorden rapat, pakai headphone peredam bising, hilangkan semua tuntutan sosial, dan konsumsi makanan sederhana yang siap santap.",
        "Delegasikan keputusan eksekutif: Serahkan urusan administrasi, pesan, dan tagihan kepada orang terdekat yang Anda percayai.",
        "Ekspresi tanpa tuntutan: Saat Anda sanggup membuat suara pelan, berbisiklah ke jurnal audio Nuju untuk meredakan ketegangan sistem saraf tanpa harus berbicara koheren."
      ],
      de: [
        "Vollständiger sensorischer Kokon: Verdunklungsvorhänge, Gehörschutz, null soziale Verpflichtungen und einfache Fertigmahlzeiten.",
        "Exekutive Aufgaben komplett abtreten: Bürokratie, Rechnungen und Nachrichten an eine vertraute Person delegieren.",
        "Reine drucklose Selbstregulation: Wenn Sie Töne hervorbringen können, flüstern oder summen Sie ins Nuju-Journal zur Beruhigung des Vagusnervs ohne Sinnanspruch."
      ],
      fr: [
        "Cocon sensoriel absolu : Rideaux occultants, casque anti-bruit, zéro obligation sociale et repas ultra-simples prêts à l'emploi.",
        "Déléguez toute la charge mentale : Confiez la paperasse, les factures et les messages à un proche de confiance.",
        "Régulation vocale instinctive : Dès que vous pouvez émettre un son, murmurez dans Nuju pour stimuler le nerf vague sans chercher à faire de phrases construites."
      ],
      es: [
        "Capullo sensorial absoluto: Habitación a oscuras, protectores auditivos, cero contacto social y comidas ya preparadas.",
        "Delegación total: Pide a un ser querido o persona de confianza que atienda tus llamadas, facturas y tareas urgentes.",
        "Autorregulación sin exigencias: Cuando logres emitir algún sonido, susurra o gime en el diario de voz de Nuju para calmar tu nervio vago sin necesidad de hilar frases."
      ]
    }
  }
];

export const AUTISTIC_BURNOUT_SUBSCALE_INFO = {
  pervasive_exhaustion: {
    name: {
      en: "Pervasive Chronic Exhaustion",
      id: "Kelebihan Beban Kronis Mendalam",
      de: "Chronische Tiefenerschöpfung",
      fr: "Épuisement Chronique Profond",
      es: "Agotamiento Crónico Profundo"
    },
    description: {
      en: "Bone-deep physical and mental depletion that sleep or weekends cannot restore, caused by constant camouflaging.",
      id: "Kelelahan fisik dan mental mendalam yang tak kunjung pulih dengan tidur biasa akibat masking sosial berkepanjangan.",
      de: "Tiefsitzende Erschöpfung durch dauerhaftes Masking, die weder durch Schlaf noch durch Urlaub behoben werden kann.",
      fr: "Épuisement viscéral lié au camouflage prolongé, insensible au repos ordinaire.",
      es: "Agotamiento profundo por masking constante que no se recupera con sueño ni vacaciones."
    }
  },
  skill_regression: {
    name: {
      en: "Skill Regression & Executive Collapse",
      id: "Regresi Keterampilan & Lumpuh Eksekutif",
      de: "Skill-Verlust & Exekutive Lähmung",
      fr: "Régression d'Aptitudes & Paralysie Exécutive",
      es: "Regresión de Habilidades y Parálisis Ejecutiva"
    },
    description: {
      en: "Loss of speech, selective mutism, inability to cook, shower, or make basic daily decisions previously mastered.",
      id: "Kehilangan kemampuan bicara, mutisme selektif, kesulitan mandi, memasak, atau membuat keputusan sehari-hari.",
      de: "Zeitweiser Sprachverlust, situativer Mutismus und Unfähigkeit, alltägliche Routinen (Kochen, Körperpflege) zu bewältigen.",
      fr: "Perte de fluidité verbale, mutisme situationnel et incapacité à gérer les tâches basiques autrefois acquises.",
      es: "Pérdida de fluidez verbal, mutismo situacional y dificultad para ejecutar rutinas básicas de autocuidado."
    }
  },
  sensory_intolerance: {
    name: {
      en: "Sensory Intolerance & Meltdown Vulnerability",
      id: "Intoleransi Sensorik & Kerentanan Meltdown",
      de: "Sensorische Intoleranz & Meltdown-Gefahr",
      fr: "Intolérance Sensorielle & Risque de Meltdown",
      es: "Intolerancia Sensorial y Riesgo de Meltdown"
    },
    description: {
      en: "Severe physical pain from lights, sounds, and textures; loss of sensory filtering pushing toward meltdowns or shutdowns.",
      id: "Nyeri fisik akibat cahaya, kebisingan, dan tekstur kain; hilangnya filter sensorik yang memicu meltdown atau shutdown.",
      de: "Körperliche Schmerzen durch Licht, Lärm und Stoffe; Zusammenbruch der Reizfilter mit hoher Meltdown-Neigung.",
      fr: "Douleur physique face aux bruits, lumières et textures ; perte de filtre menant directement au meltdown ou au shutdown.",
      es: "Dolor físico provocado por luces, sonidos y texturas; colapso de los filtros sensoriales que induce meltdowns o bloqueos."
    }
  }
};

export function getAutisticBurnoutResult(totalScore: number): AutisticBurnoutResultLevel {
  const matched = AUTISTIC_BURNOUT_RESULTS.find(
    (lvl) => totalScore >= lvl.scoreRange[0] && totalScore <= lvl.scoreRange[1]
  );
  return matched || AUTISTIC_BURNOUT_RESULTS[AUTISTIC_BURNOUT_RESULTS.length - 1];
}

export function calculateAutisticBurnoutSubscales(answers: Record<number, number>): {
  pervasive_exhaustion: number;
  skill_regression: number;
  sensory_intolerance: number;
} {
  let pervasive_exhaustion = 0;
  let skill_regression = 0;
  let sensory_intolerance = 0;

  AUTISTIC_BURNOUT_QUESTIONS.forEach((q) => {
    const val = answers[q.id] || 0;
    if (q.subscale === "pervasive_exhaustion") pervasive_exhaustion += val;
    if (q.subscale === "skill_regression") skill_regression += val;
    if (q.subscale === "sensory_intolerance") sensory_intolerance += val;
  });

  return { pervasive_exhaustion, skill_regression, sensory_intolerance };
}
