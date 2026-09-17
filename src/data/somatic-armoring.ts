export interface SomaticArmoringQuestion {
  id: number;
  segment: 'cervical_oral' | 'thoracic_diaphragm' | 'pelvic_psoas';
  text: {
    en: string;
    id: string;
    de: string;
    fr: string;
    es: string;
  };
}

export interface SomaticArmoringResultLevel {
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
  somaticMechanisms: {
    en: string;
    id: string;
    de: string;
    fr: string;
    es: string;
  };
  releaseProtocols: {
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

export const SOMATIC_ARMORING_QUESTIONS: SomaticArmoringQuestion[] = [
  {
    id: 1,
    segment: 'cervical_oral',
    text: {
      en: "I frequently catch myself clenching my jaw, grinding my teeth, or pressing my tongue hard against the roof of my mouth.",
      id: "Saya sering mendapati diri saya mengatupkan rahang kencang, menggertakkan gigi, atau menekan lidah kuat-kuat ke langit-langit mulut.",
      de: "Ich ertappe mich häufig beim Zähne zusammenbeißen, Zähneknirschen oder festen Drücken der Zunge gegen den Gaumen.",
      fr: "Je me surprends souvent à serrer les mâchoires, grincer des dents ou plaquer fortement ma langue contre le palais.",
      es: "A menudo me sorprendo apretando la mandíbula, rechinando los dientes o presionando la lengua contra el paladar."
    }
  },
  {
    id: 2,
    segment: 'thoracic_diaphragm',
    text: {
      en: "My chest feels tight or constricted, and I habitually take shallow breaths into my upper chest rather than deep into my belly.",
      id: "Dada saya terasa sesak atau tertekan, dan saya terbiasa bernapas pendek di dada bagian atas daripada bernapas dalam ke perut.",
      de: "Meine Brust fühlt sich beengt an; ich atme gewohnheitsmäßig flach in die obere Brust statt tief in den Bauch.",
      fr: "Ma poitrine me semble oppressée ou serrée, et je respire superficiellement par le haut du thorax plutôt que par le ventre.",
      es: "Siento opresión o rigidez en el pecho y suelo respirar de forma superficial en el pecho superior en vez de en el abdomen."
    }
  },
  {
    id: 3,
    segment: 'pelvic_psoas',
    text: {
      en: "My hips, lower back, or glutes remain locked and rigid even when lying in bed attempting to sleep.",
      id: "Pinggul, punggung bawah, atau otot bokong saya tetap terkunci kaku bahkan saat berbaring di tempat tidur mencoba tidur.",
      de: "Meine Hüften, der untere Rücken oder die Gesäßmuskeln bleiben bretthart verspannt, selbst wenn ich im Bett liege.",
      fr: "Mes hanches, le bas de mon dos ou mes fessiers restent raides et contractés même allongé dans mon lit.",
      es: "Mis caderas, lumbares o glúteos permanecen tensos y rígidos incluso cuando estoy acostado intentando dormir."
    }
  },
  {
    id: 4,
    segment: 'cervical_oral',
    text: {
      en: "I experience a chronic 'lump in my throat' (globus sensation) or difficulty swallowing when suppressing emotional distress.",
      id: "Saya merasakan sensasi tercekat atau 'ada gumpalan di tenggorokan' saat menahan tangis atau kemarahan.",
      de: "Ich spüre oft einen Kloß im Hals oder Schluckbeschwerden, wenn ich emotionale Anspannung oder Tränen unterdrücke.",
      fr: "Je ressens une sensation de boule dans la gorge ou une gêne pour déglutir lorsque je retiens des larmes ou de la colère.",
      es: "Siento un nudo persistente en la garganta o dificultad para tragar cuando reprimo el llanto o la frustración."
    }
  },
  {
    id: 5,
    segment: 'thoracic_diaphragm',
    text: {
      en: "I involuntarily hold my breath when focusing on screens, reading emails, or performing routine cognitive tasks.",
      id: "Saya tanpa sadar sering menahan napas saat menatap layar gawai, membaca email, atau mengerjakan tugas kognitif harian.",
      de: "Ich halte unwillkürlich den Atem an, wenn ich auf Bildschirme schaue, E-Mails lese oder mich konzentriere.",
      fr: "Je retiens inconsciemment ma respiration en fixant un écran, en lisant mes e-mails ou lors d'un effort d'attention.",
      es: "Aguanto la respiración de manera involuntaria al mirar pantallas, leer correos o concentrarme en tareas rutinarias."
    }
  },
  {
    id: 6,
    segment: 'pelvic_psoas',
    text: {
      en: "My body feels coiled like a compressed spring, as if physically ready to leap away from an invisible sudden impact.",
      id: "Tubuh saya terasa seperti per yang ditekan kencang, seolah-olah secara fisik siap melompat menghindari benturan mendadak.",
      de: "Mein Körper fühlt sich an wie eine gespannte Stahlfeder, allzeit bereit, vor einem plötzlichen Schlag auszuweichen.",
      fr: "Mon corps se sent tendu comme un ressort compressé, comme prêt physiquement à bondir face à un danger imminent.",
      es: "Mi cuerpo se siente como un muelle comprimido, físicamente en guardia para esquivar un impacto inesperado."
    }
  },
  {
    id: 7,
    segment: 'cervical_oral',
    text: {
      en: "My shoulders constantly migrate upward toward my ears, requiring conscious muscular effort to drop them down.",
      id: "Bahu saya terus-menerus naik mendekati telinga, membutuhkan usaha sadar yang melelahkan untuk menurunkannya kembali.",
      de: "Meine Schultern wandern unbemerkt nach oben zu den Ohren; ich muss sie ganz bewusst aktiv absenken.",
      fr: "Mes épaules remontent continuellement vers mes oreilles, nécessitant un effort conscient pour les relâcher.",
      es: "Mis hombros se suben constantemente hacia las orejas, necesitando un esfuerzo consciente para bajarlos."
    }
  },
  {
    id: 8,
    segment: 'thoracic_diaphragm',
    text: {
      en: "Deep breathing exercises sometimes induce mild panic or anxiety rather than relaxation, feeling like my ribs cannot expand.",
      id: "Latihan napas dalam terkadang justru memicu kecemasan atau panik ringan alih-alih rileks, terasa seperti tulang rusuk saya terkunci.",
      de: "Tiefes Einatmen löst bei mir manchmal Unruhe oder Beklemmung aus, als könnten sich meine Rippen nicht dehnen.",
      fr: "Les respirations profondes déclenchent parfois chez moi de l'angoisse plutôt que du calme, comme si ma cage thoracique était bridée.",
      es: "Respirar hondo a veces me genera inquietud o pánico en lugar de relajarme, sintiendo la caja torácica aprisionada."
    }
  },
  {
    id: 9,
    segment: 'pelvic_psoas',
    text: {
      en: "I suffer from unexplained gastrointestinal bloating, stomach knots, or abdominal hardness during stressful periods.",
      id: "Saya mengalami kembung, begah, perut melilit, atau perut mengeras tanpa sebab medis jelas saat periode penuh tekanan.",
      de: "Ich leide unter ungeklärten Blähungen, Magenkrämpfen oder einer verhärteten Bauchdecke unter Stress.",
      fr: "Je souffre de ballonnements inexpliqués, d'estomac noué ou d'un ventre dur et douloureux en période de stress.",
      es: "Sufro de hinchazón abdominal inexplicable, nudos en el estómago o abdomen endurecido durante épocas de estrés."
    }
  },
  {
    id: 10,
    segment: 'cervical_oral',
    text: {
      en: "Massaging my neck, occiput (base of skull), or temple muscles immediately triggers sharp tenderness or headache release.",
      id: "Memijat leher, pangkal tengkorak belakang, atau pelipis saya langsung memicu rasa ngilu tajam atau rasa sakit yang tertahan.",
      de: "Massagen an Nacken, Schädelbasis oder Schläfen schmerzen sofort stechend und zeigen massive Verhärtungen.",
      fr: "Masser ma nuque, la base de mon crâne ou mes tempes déclenche immédiatement une vive douleur de tension accumulée.",
      es: "Masajear mi cuello, la base del cráneo o las sienes desencadena una molestia aguda revelando contracturas crónicas."
    }
  },
  {
    id: 11,
    segment: 'thoracic_diaphragm',
    text: {
      en: "I find it exceedingly difficult to fully exhale all the air from my lungs without coughing, sighing, or feeling physically hollow.",
      id: "Saya merasa sangat sulit menghembuskan seluruh udara dari paru-paru tanpa batuk, menghela napas tersendat, atau merasa hampa.",
      de: "Ich kann kaum vollständig ausatmen, ohne husten zu müssen, zu stocken oder ein beklemmendes Leeregefühl zu spüren.",
      fr: "J'ai du mal à expirer complètement tout l'air de mes poumons sans tousser, soupirer de façon saccadée ou ressentir un vide oppressant.",
      es: "Me cuesta vaciar los pulmones al exhalar por completo sin toser, suspirar entrecortadamente o sentir una sensación de vacío."
    }
  },
  {
    id: 12,
    segment: 'pelvic_psoas',
    text: {
      en: "When I finally sit or lie down, my nervous system cannot surrender to gravity; my muscles continue hovering and bracing.",
      id: "Ketika saya akhirnya duduk atau berbaring, tubuh saya tidak bisa pasrah pada gravitasi; otot-otot tetap menahan beban seolah melayang.",
      de: "Wenn ich mich hinlege, kann mein Körper sich der Schwerkraft nicht überlassen; die Muskeln halten die Spannung unbewusst aufrecht.",
      fr: "Quand je m'allonge enfin, mon corps refuse de s'abandonner à la gravité ; mes muscles continuent de résister et de se contracter.",
      es: "Cuando por fin me recuesto, mi cuerpo es incapaz de abandonarse a la gravedad; mis músculos siguen resistiendo en vilo."
    }
  }
];

export const SOMATIC_ARMORING_LEVELS: SomaticArmoringResultLevel[] = [
  {
    level: "somatic_fluidity",
    scoreRange: [0, 9],
    title: {
      en: "Somatic Fluidity & Dynamic Tone",
      id: "Fluiditas Somatis & Tonus Fleksibel",
      de: "Somatische Fluidität & elastischer Muskeltonus",
      fr: "Fluidité somatique et tonus souple",
      es: "Fluidez somática y tono muscular adaptable"
    },
    badge: {
      en: "Fluid Nervous System",
      id: "Tubuh Adaptif",
      de: "Fließende Dynamik",
      fr: "Corps fluide",
      es: "Cuerpo fluido"
    },
    summary: {
      en: "Your musculature contracts to mobilize when needed and surrenders fully into relaxation upon resting. You possess healthy interoceptive dialogue and minimal chronic armor.",
      id: "Otot-otot Anda berkontraksi saat dibutuhkan dan mampu melepas ketegangan sepenuhnya saat beristirahat. Anda memiliki kesadaran tubuh yang sehat tanpa zirah ketegangan kronis.",
      de: "Deine Muskulatur spannt sich bei Bedarf kraftvoll an und entspannt sich im Ruhezustand vollkommen. Du trägst kaum chronische Panzerung.",
      fr: "Votre corps contracte ses muscles à bon escient et relâche totalement l'effort au repos. Votre écoute intérieure est équilibrée.",
      es: "Tu musculatura responde con precisión al esfuerzo y se relaja por completo en reposo, sin retener corazas crónicas de estrés."
    },
    somaticMechanisms: {
      en: "Healthy fascial glide and low baseline sympathetic tone. The muscular segments described by Wilhelm Reich (ocular, oral, cervical, thoracic, diaphragmatic, abdominal, pelvic) remain permeable to emotional circulation.",
      id: "Lapisan fasia tubuh memiliki elastisitas baik dengan tonus simpatik basal yang seimbang. Segmen tubuh Wilhelm Reich tetap dapat mengalirkan emosi tanpa terhalang simpul ketegangan.",
      de: "Gesunde Faszienelastizität und minimale sympathische Grundanspannung. Die Körpersegmente nach Wilhelm Reich bleiben durchlässig für vegetative Strömungen.",
      fr: "Bonne élasticité fasciale et faible tonus sympathique résiduel. Les segments corporels de Reich restent perméables à la circulation affective.",
      es: "Elasticidad fascial óptima y tono simpático basal bajo. Los segmentos musculares de Reich permiten la circulación vegetativa sin bloqueos."
    },
    releaseProtocols: {
      en: [
        "Continue intuitive stretching and diaphragmatic breathing.",
        "Voice journal daily in Nuju to discharge subtle emotional residue before it somatizes.",
        "Maintain restorative physical movement (swimming, yoga, walks in nature)."
      ],
      id: [
        "Lanjutkan peregangan intuitif dan pernapasan diafragma harian.",
        "Rekam voice journal di Nuju untuk melepaskan sisa emosi harian sebelum mengkristal di otot.",
        "Jaga gerakan fisik pemulihan (berenang, yoga, jalan santai di alam)."
      ],
      de: [
        "Intuitive Dehnung und Zwerchfellatmung beibehalten.",
        "Tägliche Sprachreflexion in Nuju, um emotionale Nuancen direkt auszusprechen.",
        "Regenerative Bewegung wie Schwimmen, Yoga oder Waldspaziergänge pflegen."
      ],
      fr: [
        "Maintenir des étirements intuitifs et une respiration abdominale.",
        "Décharger les micro-tensions quotidiennes via le journal vocal Nuju.",
        "Pratiquer des activités douces régulières (marche, yoga, natation)."
      ],
      es: [
        "Mantener estiramientos intuitivos y respiración diafragmática.",
        "Grabar reflexiones de voz en Nuju para descargar tensiones antes de somatizarlas.",
        "Preservar movimientos regenerativos como natación, yoga o paseos al aire libre."
      ]
    }
  },
  {
    level: "localized_muscular_tension",
    scoreRange: [10, 18],
    title: {
      en: "Localized Muscular Armoring & Segmental Guarding",
      id: "Ketegangan Muscular Terlokalisir & Penjagaan Segmental",
      de: "Lokalisierte Muskelpanzerung & segmentale Verspannung",
      fr: "Cuirasse musculaire localisée et tensions segmentaires",
      es: "Coraza muscular localizada y tensión segmentaria"
    },
    badge: {
      en: "Localized Guarding",
      id: "Penjagaan Terlokalisir",
      de: "Lokale Panzerung",
      fr: "Armure partielle",
      es: "Tensión sectorizada"
    },
    summary: {
      en: "You carry concentrated somatic holding patterns—typically in the jaw, neck, or diaphragm. While not fully rigid, these segments brace involuntarily during cognitive pressure.",
      id: "Anda menahan pola ketegangan terkonsentrasi di bagian tubuh tertentu—umumnya rahang, leher, atau diafragma. Otot-otot ini mengunci secara otomatis saat stres kognitif meningkat.",
      de: "Du trägst spezifische Verspannungsinseln in dir – meist in Kiefer, Nacken oder Zwerchfell, die bei Belastung automatisch verhärten.",
      fr: "Vous accumulez des poches de tension bien ciblées, généralement dans les mâchoires, la nuque ou le diaphragme.",
      es: "Retienes contracturas específicas en puntos clave como la mandíbula, cuello o diafragma, activadas bajo presión mental."
    },
    somaticMechanisms: {
      en: "Fascial densification and hypertonic motor unit recruitment in specific Reichian segments. Suppressed vocal assertiveness often solidifies in the cervical/oral segment, while suppressed panic constricts the diaphragm.",
      id: "Penebalan jaringan fasia pada segmen tubuh tertentu. Ketidakmampuan mengungkapkan uneg-uneg vokal mengeras di rahang dan leher, sedangkan kecemasan yang ditekan mengunci diafragma.",
      de: "Fasziale Verdichtungen im Zervikal- und Zwerchfellsegment. Unausgesprochene Frustration schlägt sich in Kiefer und Kehle nieder.",
      fr: "Densification des fascias au niveau cervical ou thoracique. Les non-dits se cristallisent dans les mâchoires et le souffle.",
      es: "Adherencias fasciales en los segmentos cervical y diafragmático. La expresión reprimida endurece la mandíbula y el tórax."
    },
    releaseProtocols: {
      en: [
        "Incorporate targeted myofascial release for the suboccipitals and masseter muscles.",
        "Perform physiological sighing (double inhale through nose, extended audible mouth sigh).",
        "Use Nuju's voice journal to verbally ventilate unspoken boundaries before sleep."
      ],
      id: [
        "Lakukan pelepasan miofasial ringan untuk otot rahang (masseter) dan pangkal leher.",
        "Terapkan physiological sigh (dua tarikan napas cepat lewat hidung, satu desah panjang lewat mulut).",
        "Gunakan voice journal Nuju untuk meluapkan batasan diri yang belum sempat terucap sebelum tidur."
      ],
      de: [
        "Gezielte Faszienmassage für Kiefer- (Masseter) und Nackenmuskeln.",
        "Physiologischen Seufzer mehrmals täglich praktizieren.",
        "Im Nuju Sprachjournal unausgesprochene Grenzen laut artikulieren."
      ],
      fr: [
        "Automassage des muscles masséters et de la base du crâne.",
        "Pratiquer le double soupir physiologique plusieurs fois par jour.",
        "Nommer à haute voix dans Nuju les colères retenues pour libérer la gorge."
      ],
      es: [
        "Liberación miofascial suave de los maseteros y base del cráneo.",
        "Ejecutar el doble suspiro fisiológico con exhalación sonora.",
        "Desahogar en Nuju los límites que no te atreviste a poner durante el día."
      ]
    }
  },
  {
    level: "systemic_body_armoring",
    scoreRange: [19, 27],
    title: {
      en: "Systemic Body Armoring (Multi-Segmental Holding)",
      id: "Zirah Tubuh Sistemik (Ketegangan Multi-Segmental)",
      de: "Systemische Körperpanzerung (Multisegmentale Blockade)",
      fr: "Cuirasse corporelle systémique (Blocages multisegmentaires)",
      es: "Coraza corporal sistémica (Bloqueo multisegmentario)"
    },
    badge: {
      en: "Solid Body Armor",
      id: "Zirah Tubuh Kaku",
      de: "Solider Panzer",
      fr: "Cuirasse dense",
      es: "Coraza sólida"
    },
    summary: {
      en: "Your nervous system has wrapped your body in a full defensive casing. Chronic held breath, rigid hips, clenched jaw, and gastrointestinal tension operate continuously, draining physical stamina.",
      id: "Sistem saraf Anda membungkus tubuh dalam zirah pertahanan menyeluruh. Napas tertahan, pinggul kaku, rahang mengatup, dan perut tegang berlangsung nonstop, menguras energi vital.",
      de: "Dein Nervensystem hat deinen Körper in ein massives Schutzschild gehüllt. Flacher Atem, blockierte Hüften und Zähneknirschen zehren an deinen Kräften.",
      fr: "Votre corps est verrouillé dans un corset musculaire protecteur continu : souffle court, hanches rigides et mâchoires verrouillées.",
      es: "Tu sistema nervioso ha blindado tu cuerpo con una coraza rígida incesante: respiración bloqueada, caderas tensas y mandíbula apretada."
    },
    somaticMechanisms: {
      en: "Cross-segmental sympathetic co-contraction. The body is in continuous protective bracing, freezing the psoas, immobilizing the rib cage, and clamping the vocal tract to inhibit perceived catastrophic vulnerability.",
      id: "Ko-kontraksi simpatik lintas segmen tubuh. Otot psoas mengunci, tulang rusuk menyempit, dan laring tercekik untuk mencegah meluapnya kerapuhan emosional yang ditakuti.",
      de: "Dauerspannung über mehrere Segmente hinweg. Der Psoas ist verkürzt, der Brustkorb unbeweglich und die Stimmbänder stehen unter ständiger Abwehrbereitschaft.",
      fr: "Co-contraction sympathique étendue. Le psoas se fige, la cage thoracique s'immobilise et la gorge s'étouffe pour verrouiller la vulnérabilité.",
      es: "Co-contracción simpática global. El psoas permanece acortado, las costillas rígidas y la laringe comprimida para blindar la emoción."
    },
    releaseProtocols: {
      en: [
        "Practice somatic vocal tremors: long low-frequency humming to vibrate thoracic fascia.",
        "Engage in passive psoas release (constructive rest position with knees bent and supported).",
        "Express unedited emotions into Nuju voice journal without worrying about tone or vocabulary.",
        "Explore bodywork modalities like Rolfing, Somatic Experiencing, or Feldenkrais."
      ],
      id: [
        "Latih getaran vokal somatis: bersenandung (humming) nada rendah panjang untuk menggetarkan fasia dada.",
        "Lakukan peregangan psoas pasif (posisi constructive rest dengan lutut ditekuk ditopang bantal).",
        "Curahkan perasaan mentah ke Nuju voice journal tanpa memikirkan kerapian kata-kata.",
        "Pertimbangkan terapi tubuh somatik seperti Somatic Experiencing, Rolfing, atau Feldenkrais."
      ],
      de: [
        "Somatisches Vokalbrummen: Tiefes Summen zur Erschütterung des Brustraum-Fasziennetzes.",
        "Psoas-Entlastungslagerung (Beine auf einem Hocker ablegen in Rückenlage).",
        "Ungeschöntes Aussprechen von Wut und Trauer im Nuju Sprachjournal.",
        "Begleitung durch Somatic Experiencing oder körperorientierte Traumatherapie."
      ],
      fr: [
        "Vibrations vocales somatiques : bourdonnement grave continu pour faire vibrer la cage thoracique.",
        "Posture de repos constructif pour désamorcer le psoas en douceur.",
        "Déposer ses ressentis bruts dans le journal vocal Nuju sans filtre intellectuel.",
        "Explorer la méthode Feldenkrais ou le Somatic Experiencing."
      ],
      es: [
        "Vibración vocal somática: tarareos graves prolongados para destensar la fascia torácica.",
        "Postura de descanso constructivo para aflojar el músculo psoas de forma pasiva.",
        "Hablar sin censura en el diario de voz Nuju sin cuidar la compostura.",
        "Valorar el apoyo de disciplinas somáticas como Somatic Experiencing o Rolfing."
      ]
    }
  },
  {
    level: "deep_muscular_lockdown",
    scoreRange: [28, 36],
    title: {
      en: "Severe Muscular Lockdown & Somatized Trauma Armor",
      id: "Lockdown Muscular Berat & Zirah Trauma Tersomatisasi",
      de: "Schwerer muskulärer Lockdown & somatisierter Traumapanzer",
      fr: "Verrouillage musculaire sévère et armure traumatique incrustée",
      es: "Bloqueo muscular severo y coraza traumática somatizada"
    },
    badge: {
      en: "Impenetrable Armor",
      id: "Zirah Besi Kedap",
      de: "Eiserner Panzer",
      fr: "Cuirasse de pierre",
      es: "Blindaje total"
    },
    summary: {
      en: "Your body has lived in survival defense for so long that chronic tension feels like normal baseline. You suffer from frequent muscle spasms, headaches, numbness, or breathing restriction.",
      id: "Tubuh Anda telah hidup dalam mode bertahan hidup begitu lama sehingga ketegangan kronis terasa seperti kondisi normal. Anda kerap mengalami migrain, kebas, atau sesak napas.",
      de: "Dein Körper befindet sich seit Jahren im Ausnahmezustand. Die chronische Erstarrung wird fälschlicherweise als Normalzustand wahrgenommen, führt aber zu Schmerzen und Taubheit.",
      fr: "Votre corps est en alerte maximale depuis si longtemps que la tension est devenue votre état par défaut, entraînant migraines, névralgies et sensation d'étouffement.",
      es: "Tu organismo lleva tanto tiempo en modo trinchera que la tensión crónica se ha vuelto tu estado basal, provocando migrañas crónicas, contracturas y fatiga."
    },
    somaticMechanisms: {
      en: "Deep neuro-fascial contracture across all Reichian segments with high sympathetic-dorsal co-activation. Chronic hypercortisolemia and inflammatory cytokine activity degrade connective tissue compliance.",
      id: "Kontraktur neuro-fasial mendalam di seluruh segmen tubuh dengan ko-aktivasi simpatik-dorsal tinggi. Penumpukan kortisol kronis mengurangi kelenturan jaringan ikat.",
      de: "Tiefe neurofasziale Kontrakturen über alle Körpersegmente mit hoher Erschöpfung des Bindegewebes durch chronische Stresshormone.",
      fr: "Contracture neuro-fasciale généralisée figeant tous les segments du corps, épuisant la souplesse des tissus conjonctifs.",
      es: "Contractura neurofascial profunda en todos los segmentos corporales, cronificando el agotamiento tisular y la rigidez neuromuscular."
    },
    releaseProtocols: {
      en: [
        "Warmth and sensory anchoring: hot baths, heating pads on the sacrum and diaphragm.",
        "Neurogenic micro-tremoring: allow small tremors in the legs while supported on a soft mattress.",
        "Low-pressure vocal whispers: use Nuju to whisper thoughts without any expectation of coherence.",
        "Engage with a licensed somatic trauma psychotherapist (SEP) or craniosacral therapist."
      ],
      id: [
        "Stimulus hangat dan penjangkaran sensorik: mandi air hangat, bantalan pemanas di tulang ekor dan diafragma.",
        "Tremor mikro neurogenik: biarkan getaran halus terjadi di kaki saat berbaring di kasur yang empuk.",
        "Bisikan vokal bebas: gunakan Nuju untuk berbisik santai tanpa tuntutan kalimat teratur.",
        "Konsultasikan dengan terapis psikotrauma somatik berlisensi atau praktisi craniosacral."
      ],
      de: [
        "Wärme und sensorische Reize: Heiße Bäder, Wärmflaschen auf Kreuzbein und Zwerchfell.",
        "Neurogenes Zittern zulassen: Sanfte Zitterreaktionen der Beine im geschützten Bett erlauben.",
        "Flüstern im Nuju Sprachjournal ohne Zwang zu Vollständigkeit oder Logik.",
        "Professionelle somatische Traumatherapie (Somatic Experiencing, Craniosacral) aufsuchen."
      ],
      fr: [
        "Apport de chaleur et sécurité : bains chauds, bouillotte sur le sacrum et le plexus solaire.",
        "Micro-tremblements neurogéniques doux sur un lit confortable pour décharger la moelle épinière.",
        "Chuchoter ses pensées dans Nuju pour libérer le souffle en toute discrétion.",
        "Consulter un thérapeute spécialisé en Somatic Experiencing ou thérapie cranio-sacrée."
      ],
      es: [
        "Estímulos térmicos reconfortantes: baños calientes y almohadillas térmicas en el diafragma y sacro.",
        "Micro-temblores neurogénicos: permitir que las piernas vibren suavemente sobre una superficie acolchada.",
        "Susurrar en el diario de voz Nuju sin exigencias de coherencia ni lógica.",
        "Buscar apoyo con un psicoterapeuta especializado en Somatic Experiencing o terapia craneosacral."
      ]
    }
  }
];
