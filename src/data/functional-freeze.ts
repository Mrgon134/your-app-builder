export interface FunctionalFreezeQuestion {
  id: number;
  subscale: 'dorsal_vagal' | 'somatic_armoring' | 'interoceptive_dissociation';
  text: {
    en: string;
    id: string;
    de: string;
    fr: string;
    es: string;
  };
}

export interface FunctionalFreezeResultLevel {
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

export const FUNCTIONAL_FREEZE_QUESTIONS: FunctionalFreezeQuestion[] = [
  {
    id: 1,
    subscale: 'dorsal_vagal',
    text: {
      en: "I go through the motions of work and life appearing productive on the outside, but internally I feel completely detached, hollow, or numb.",
      id: "Saya menjalani rutinitas kerja dan hidup tampak produktif dari luar, tetapi di dalam saya merasa benar-benar hampa, mati rasa, atau terputus.",
      de: "Ich funktioniere im Alltag und bei der Arbeit nach außen hin produktiv, fühle mich innerlich jedoch völlig betäubt, hohl oder abgetrennt.",
      fr: "J'accomplis mes tâches quotidiennes et professionnelles en paraissant productif, mais intérieurement je me sens totalement détaché ou vide.",
      es: "Cumplo con mi trabajo y vida diaria pareciendo productivo por fuera, pero por dentro me siento completamente desconectado, vacío o entumecido."
    }
  },
  {
    id: 2,
    subscale: 'somatic_armoring',
    text: {
      en: "My body holds unconscious chronic tension (clenched jaw, locked diaphragm, tight psoas or shoulders) even when I try to rest.",
      id: "Tubuh saya menahan ketegangan kronis tanpa sadar (rahang mengatup kencang, diafragma terkunci, bahu kaku) bahkan ketika saya mencoba beristirahat.",
      de: "Mein Körper hält unbewusst chronische Verspannungen (zusammengebissene Zähne, blockiertes Zwerchfell, verspannte Schultern) selbst beim Ausruhen.",
      fr: "Mon corps accumule des tensions chroniques inconscientes (mâchoires serrées, diaphragme bloqué, épaules rigides) même au repos.",
      es: "Mi cuerpo retiene tensiones crónicas inconscientes (mandíbula apretada, diafragma bloqueado, hombros rígidos) incluso al intentar descansar."
    }
  },
  {
    id: 3,
    subscale: 'interoceptive_dissociation',
    text: {
      en: "I struggle to identify what I am feeling physically until exhaustion, migraines, or gastrointestinal pain forces me to stop.",
      id: "Saya sulit menyadari apa yang saya rasakan secara fisik hingga kelelahan ekstrem, migrain, atau gangguan pencernaan memaksa saya berhenti.",
      de: "Ich nehme körperliche Signale kaum wahr, bis extreme Erschöpfung, Migräne oder Magen-Darm-Schmerzen mich zum Stillstand zwingen.",
      fr: "J'ai du mal à identifier ce que je ressens physiquement jusqu'à ce que l'épuisement ou la douleur physique me force à m'arrêter.",
      es: "Me cuesta identificar lo que siento físicamente hasta que el agotamiento extremo, migrañas o dolor físico me obligan a frenar."
    }
  },
  {
    id: 4,
    subscale: 'dorsal_vagal',
    text: {
      en: "When overwhelmed, instead of fighting or fleeing, I freeze: I scroll endlessly, stare at a wall, or sleep for hours without feeling refreshed.",
      id: "Ketika kewalahan, alih-alih melawan atau lari, saya membeku: scrolling medsos berjam-jam, menatap dinding kosong, atau tidur lama tanpa merasa segar.",
      de: "Bei Überforderung reagiere ich weder mit Kampf noch Flucht, sondern erstarre: stundenlanges Scrollen, ins Leere starren oder ermüdender Schlaf.",
      fr: "Face au stress, je me fige : défilement passif sur les écrans pendant des heures, regard dans le vide ou sommeil non réparateur.",
      es: "Cuando el estrés me desborda, me congelo: paso horas mirando la pantalla, mirando a la nada o durmiendo sin lograr descansar."
    }
  },
  {
    id: 5,
    subscale: 'somatic_armoring',
    text: {
      en: "My breath is habitually shallow or held in without me noticing, feeling like I never get a full, deep lung expansion.",
      id: "Napas saya biasanya dangkal atau sering tertahan tanpa saya sadari, terasa seperti saya tidak pernah bisa bernapas lega dan dalam.",
      de: "Meine Atmung ist unbemerkt flach oder angehalten; ich habe das Gefühl, nie tief und vollständig durchatmen zu können.",
      fr: "Ma respiration est souvent superficielle ou bloquée sans que je m'en aperçoive, comme si je ne pouvais jamais respirer à fond.",
      es: "Mi respiración suele ser superficial o se corta inconscientemente, sintiendo que nunca puedo llenar mis pulmones por completo."
    }
  },
  {
    id: 6,
    subscale: 'interoceptive_dissociation',
    text: {
      en: "When people ask 'How are you feeling?', I give an intellectual or analytical response because I cannot locate physical emotions in my body.",
      id: "Ketika orang bertanya 'Bagaimana perasaanmu?', saya menjawab secara intelektual atau analitis karena saya tidak bisa merasakan emosi di tubuh.",
      de: "Auf die Frage 'Wie fühlst du dich?' antworte ich rein analytisch, da ich körperliche Emotionen kaum lokalisieren kann.",
      fr: "Quand on me demande 'Comment vas-tu ?', je réponds de façon cérébrale car je ne parviens pas à localiser mes émotions dans mon corps.",
      es: "Cuando me preguntan '¿Cómo te sientes?', respondo analíticamente porque no logro localizar sensaciones emocionales en mi cuerpo."
    }
  },
  {
    id: 7,
    subscale: 'dorsal_vagal',
    text: {
      en: "I feel an overwhelming inertia when faced with personal tasks that matter to me, as if an invisible brake is pushed down in my nervous system.",
      id: "Saya merasakan kelembaman luar biasa saat menghadapi tugas pribadi yang penting, seolah ada rem tak terlihat yang diinjak di saraf saya.",
      de: "Ich spüre eine bleierne Trägheit bei wichtigen persönlichen Aufgaben, als ob eine unsichtbare Notbremse in meinem Nervensystem aktiviert ist.",
      fr: "Je ressens une lourdeur paralysante face à des projets personnels qui me tiennent à cœur, comme un frein d'urgence enclenché.",
      es: "Siento una inercia pesada ante tareas personales importantes, como si un freno invisible estuviera pisado en mi sistema nervioso."
    }
  },
  {
    id: 8,
    subscale: 'somatic_armoring',
    text: {
      en: "I feel disconnected from my vocal cords; my voice feels flat, quiet, monotone, or strained when I am experiencing stress.",
      id: "Saya merasa terputus dari pita suara saya; suara saya terdengar datar, kecil, monoton, atau tercekat saat saya mengalami stres.",
      de: "Meine Stimme wirkt bei Stress flach, monoton, leise oder gepresst; ich fühle mich von meiner Kehle entfremdet.",
      fr: "Ma voix devient monocorde, étouffée ou bloquée sous l'effet du stress, comme coupée de mon corps.",
      es: "Bajo estrés mi voz suena plana, baja, monótona o comprimida, sintiéndome desconectado de mis cuerdas vocales."
    }
  },
  {
    id: 9,
    subscale: 'interoceptive_dissociation',
    text: {
      en: "Pleasure, excitement, and genuine joy feel muted or distant, like watching life through soundproof thick glass.",
      id: "Rasa senang, antusiasme, dan kegembiraan terasa teredam atau jauh, seperti melihat kehidupan dari balik kaca tebal kedap suara.",
      de: "Freude, Begeisterung und Lebendigkeit wirken gedämpft und fern, als würde ich mein Leben hinter dickem Panzerglas beobachten.",
      fr: "Le plaisir, l'enthousiasme et la joie semblent étouffés, comme si je regardais ma propre vie à travers une vitre insonorisée.",
      es: "El placer, el entusiasmo y la alegría se sienten apagados, como si observara mi vida detrás de un cristal insonorizado."
    }
  },
  {
    id: 10,
    subscale: 'dorsal_vagal',
    text: {
      en: "Socializing drains me so rapidly that my default impulse is total isolation, hiding in a dark room to shut down all sensory inputs.",
      id: "Bersosialisasi menguras energi saya begitu cepat sehingga dorongan utama saya adalah isolasi total, bersembunyi di ruangan gelap.",
      de: "Soziale Kontakte erschöpfen mich so rasant, dass mein Hauptimpuls totale Isolation und das Abschalten aller Sinnesreize ist.",
      fr: "Les interactions sociales m'épuisent si vite que mon réflexe premier est l'isolement complet pour couper tout stimulus.",
      es: "Socializar me drena tan rápido que mi impulso automático es el aislamiento total, apagando cualquier estímulo sensorial."
    }
  },
  {
    id: 11,
    subscale: 'somatic_armoring',
    text: {
      en: "I struggle to relax without feeling guilty or hyper-alert, as if dropping my physical guard will invite catastrophe.",
      id: "Saya kesulitan rileks tanpa merasa bersalah atau waspada berlebihan, seolah menurunkan kesiagaan fisik akan mengundang bencana.",
      de: "Ich kann kaum entspannen, ohne Schuldgefühle oder Alarmbereitschaft zu verspüren, als wäre Loslassen lebensgefährlich.",
      fr: "J'ai du mal à me détendre sans culpabiliser ou rester en hypervigilance, comme si baisser la garde était dangereux.",
      es: "Me cuesta relajarme sin sentir culpa o hiperalerta, como si bajar la guardia corporal fuera a provocar una catástrofe."
    }
  },
  {
    id: 12,
    subscale: 'interoceptive_dissociation',
    text: {
      en: "When intense emotions surge, my reflex is to dissociate, numb out with food, screen time, or work, rather than feeling the physical sensation.",
      id: "Saat emosi intens meluap, refleks saya adalah disosiasi, mematikan rasa dengan makanan, layar gawai, atau kerjaan daripada merasakan sensasinya.",
      de: "Bei intensiven Gefühlen dissziiere ich reflexartig oder betäube mich mit Bildschirmen, Essen oder Arbeit, statt sie körperlich zuzulassen.",
      fr: "Quand des émotions fortes surgissent, mon réflexe est de me dissocier ou d'anesthésier la sensation avec les écrans ou le travail.",
      es: "Ante emociones intensas, mi reflejo es disociarme o adormecer el cuerpo con pantallas, comida o trabajo en lugar de sentirlo."
    }
  }
];

export const FUNCTIONAL_FREEZE_LEVELS: FunctionalFreezeResultLevel[] = [
  {
    level: "regulated_ventral",
    scoreRange: [0, 9],
    title: {
      en: "Regulated Ventral Vagal State",
      id: "Kondisi Ventral Vagal Teregulasi",
      de: "Regulierter ventral-vagaler Zustand",
      fr: "État vagal ventral régulé",
      es: "Estado vagal ventral regulado"
    },
    badge: {
      en: "Somatic Flow",
      id: "Aliran Somatis",
      de: "Somatischer Fluss",
      fr: "Fluidité somatique",
      es: "Fluidez somática"
    },
    summary: {
      en: "Your nervous system maintains healthy flexibility between activation and rest. You rarely fall into chronic freeze or bodily armoring, retaining access to bodily sensations and relational safety.",
      id: "Sistem saraf Anda memiliki fleksibilitas sehat antara aktivasi dan istirahat. Anda jarang terjebak freeze kronis atau ketegangan tubuh berkepanjangan.",
      de: "Dein Nervensystem verfügt über eine gesunde Balance zwischen Aktivierung und Ruhe. Du gleitest selten in Erstarrung ab.",
      fr: "Votre système nerveux conserve une bonne souplesse entre action et repos, avec un bon ancrage corporel.",
      es: "Tu sistema nervioso mantiene una flexibilidad saludable entre la activación y el descanso, con buena propiocepción."
    },
    neurobiology: {
      en: "According to Stephen Porges' Polyvagal Theory, your ventral vagal complex operates effectively, modulating your heart rate variability (HRV) and maintaining social engagement without collapsing into dorsal shutdown.",
      id: "Berdasarkan Teori Polyvagal Stephen Porges, kompleks ventral vagal Anda berfungsi efektif menjaga Heart Rate Variability (HRV) tanpa terjatuh ke shutdown dorsal vagal.",
      de: "Nach Stephen Porges' Polyvagal-Theorie steuert dein ventraler Vagusnerv dein Herz-Kreislauf-System elastisch und verhindert das Abgleiten in den dorsalen Freeze.",
      fr: "Selon la théorie polyvagale, votre branche vagale ventrale module efficacement votre variabilité cardiaque et préserve le lien social.",
      es: "Según la teoría polivagal de Porges, tu complejo vagal ventral modula adecuadamente tu frecuencia cardíaca evitando el bloqueo dorsal."
    },
    actionProtocol: {
      en: [
        "Continue daily interoceptive check-ins through voice journaling to track emotional micro-shifts.",
        "Practice mindful somatic stretching (psoas and diaphragm release) after intense cognitive work.",
        "Protect restorative rest windows to prevent allostatic load creep."
      ],
      id: [
        "Lanjutkan check-in somatis harian melalui voice journal untuk merekam pergeseran emosi halus.",
        "Lakukan peregangan somatis (otot psoas dan diafragma) setelah fokus kerja kognitif tinggi.",
        "Jaga jendela istirahat pemulihan untuk mencegah penumpukan beban alostatik."
      ],
      de: [
        "Tägliche somatische Audionotizen zur Reflexion beibehalten.",
        "Regelmäßige Dehnungen des Psoas und Zwerchfells nach konzentrierter Bildschirmarbeit.",
        "Schlaf- und Erholungsfenster konsequent schützen."
      ],
      fr: [
        "Poursuivre les bilans somatiques quotidiens par enregistrement vocal.",
        "Étirements doux du psoas et ouverture du diaphragme après l'effort mental.",
        "Préserver des plages de repos réparateur régulières."
      ],
      es: [
        "Mantener chequeos somáticos diarios mediante diario de voz.",
        "Estiramientos suaves de diafragma y psoas tras jornadas de trabajo cognitivo.",
        "Proteger los descansos reparadores para evitar la fatiga acumulada."
      ]
    }
  },
  {
    level: "mild_somatic_fatigue",
    scoreRange: [10, 18],
    title: {
      en: "Mild Somatic Strain & Habitual Guarding",
      id: "Ketegangan Somatis Ringan & Kesiagaan Otomatis",
      de: "Leichte somatische Anspannung & Schutzhaltung",
      fr: "Tension somatique légère et posture défensive",
      es: "Tensión somática leve y coraza postural"
    },
    badge: {
      en: "Hyper-Alert Reserve",
      id: "Kesiagaan Terselubung",
      de: "Alarmbereitschaft",
      fr: "Garde active",
      es: "Alerta latente"
    },
    summary: {
      en: "You experience intermittent physical guarding, clenched jaws, and occasional mental paralysis during stress peaks, though you can still mobilize energy to fulfill responsibilities.",
      id: "Anda mengalami ketegangan fisik berkala, rahang terkunci, dan kebekuan mental sesekali di puncak stres, meski masih bisa menjalankan tanggung jawab harian.",
      de: "Du spürst temporäre Verspannungen, Zähneknirschen und gelegentliche Blockaden unter Belastung, bleibst aber handlungsfähig.",
      fr: "Vous ressentez des tensions récurrentes et une léthargie passagère lors des pics de stress, tout en maintenant vos engagements.",
      es: "Sientes contracturas intermitentes y parálisis puntual ante el estrés intenso, aunque mantienes tu funcionamiento habitual."
    },
    neurobiology: {
      en: "Your sympathetic nervous system toggles rapidly with early dorsal vagal deceleration. While not in full immobility, the body is bracing for threat, elevating muscular tone and reducing deep tidal volume breathing.",
      id: "Sistem saraf simpatik Anda bertukar cepat dengan deselerasi dorsal vagal awal. Tubuh menahan kesiagaan tinggi, meningkatkan tonus otot dan mempersempit volume napas.",
      de: "Dein sympathisches Nervensystem wechselt rasch in frühe dorsale Verlangsamung; die Muskulatur versteift sich zur Abwehr imaginierter Bedrohungen.",
      fr: "Votre système sympathique alterne avec un début de frein dorsal ; le corps s'arme préventivement, limitant l'amplitude respiratoire.",
      es: "Tu sistema simpático oscila con desaceleraciones dorsales; la musculatura se tensa preventivamente reduciendo la oxigenación profunda."
    },
    actionProtocol: {
      en: [
        "Incorporate 2-minute physiological sighs (double inhale through nose, long audible mouth sigh) twice daily.",
        "Use voice journaling to express uncensored frustration before it hardens into somatic tension.",
        "Perform jaw and suboccipital releases (gentle neck tilting and jaw drops) before sleep."
      ],
      id: [
        "Lakukan physiological sigh 2 menit (dua tarikan napas hidung, hembusan panjang lewat mulut) dua kali sehari.",
        "Gunakan voice journal untuk meluapkan uneg-uneg sebelum mengkristal jadi nyeri otot.",
        "Lepaskan ketegangan rahang dan pangkal leher dengan gerakan lembut sebelum tidur."
      ],
      de: [
        "Zweimal täglich 2 Minuten 'Physiological Sighs' (doppeltes Einatmen, langes Ausatmen).",
        "Ungeschöntes Aussprechen von Frustration im Sprachjournal, um Verspannungen vorzubeugen.",
        "Kiefer- und Nackenlockerungen vor dem Schlafengehen etablieren."
      ],
      fr: [
        "Pratiquer le double soupir physiologique 2 minutes deux fois par jour.",
        "Exprimer vocalement ses émotions sans filtre via un journal vocal pour décharger la tension.",
        "Détendre les mâchoires et la base du crâne avant le coucher."
      ],
      es: [
        "Practicar el suspiro fisiológico (doble inhalación, exhalación larga) 2 minutos al día.",
        "Desahogar emociones en un diario de voz antes de que se somatizen en contracturas.",
        "Liberar tensión mandibular y cervical antes de dormir."
      ]
    }
  },
  {
    level: "moderate_functional_freeze",
    scoreRange: [19, 27],
    title: {
      en: "Moderate Functional Freeze (High-Functioning Dissociation)",
      id: "Functional Freeze Menengah (Disosiasi Berfungsi Tinggi)",
      de: "Moderater funktionaler Freeze (Funktionale Dissoziation)",
      fr: "Figement fonctionnel modéré (Dissociation active)",
      es: "Congelación funcional moderada (Disociación funcional)"
    },
    badge: {
      en: "Functional Freeze",
      id: "Freeze Fungsional",
      de: "Funktionaler Freeze",
      fr: "Figement actif",
      es: "Bloqueo funcional"
    },
    summary: {
      en: "You are visibly functional to colleagues and family, yet feeling empty, exhausted, and somatically locked inside. Procrastination feels like physical paralysis rather than laziness.",
      id: "Anda tampak produktif bagi rekan kerja dan keluarga, namun merasa kosong, lelah berkepanjangan, dan terkunci dari dalam. Menunda tugas terasa seperti kelumpuhan fisik nyata.",
      de: "Du wirkst nach außen hin erfolgreich und zuverlässig, fühlst dich innerlich jedoch betäubt, wie ferngesteuert und chronisch erschöpft.",
      fr: "Vous donnez l'impression de maîtriser votre quotidien mais ressentez un vide profond. Procrastiner devient une véritable paralysie motrice.",
      es: "Das la impresión de rendir al máximo mientras por dentro estás apagado y exhausto. Postergar se siente como parálisis física real."
    },
    neurobiology: {
      en: "Co-activation of the sympathetic nervous system and the unmyelinated dorsal vagal nerve (the 'gas pedal and emergency handbrake simultaneously'). Metabolic resources drop, visceral awareness decreases, and social masking drains your vital energy.",
      id: "Terjadi ko-aktivasi antara saraf simpatik dan cabang dorsal vagal tanpa mielin (menginjak pedal gas dan rem tangan darurat sekaligus). Energi metabolik anjlok dan penopengan sosial menguras baterai mental.",
      de: "Gleichzeitige Aktivierung von Gaspedal (Sympathikus) und Notbremse (dorsaler Vagus). Der Körper brennt innerlich auf Sparflamme, während die Maskerade enorme Energie frisst.",
      fr: "Co-activation du système sympathique et du nerf vague dorsal non myélinisé (accélérateur et frein d'urgence en même temps). L'organisme fonctionne en sous-régime thermique.",
      es: "Activación simultánea del acelerador simpático y el freno de emergencia vagal dorsal. El cuerpo funciona en modo de reserva mientras la máscara social agota la vitalidad."
    },
    actionProtocol: {
      en: [
        "Break the freeze loop with somatic orientation: look around the room, slowly name 5 colors, and touch textured surfaces.",
        "Engage in low-demand vocalization (humming, singing, speaking softly into Nuju) to stimulate the auricular and laryngeal branches of the vagus nerve.",
        "Stop forcing high-intensity workouts; replace with gentle somatic rocking or restorative walking."
      ],
      id: [
        "Putus lingkaran freeze dengan orientasi somatis: amati sekeliling ruangan, sebutkan 5 warna secara perlahan, dan raba permukaan benda bertekstur.",
        "Lakukan stimulasi vokal berbeban rendah (humming mendengung, berbicara santai di Nuju) untuk mengaktifkan cabang saraf vagus laringeal.",
        "Hentikan olahraga intensitas tinggi yang memaksa tubuh; gantikan dengan peregangan goyang somatis atau jalan santai."
      ],
      de: [
        "Freeze-Kreislauf durch Orientierung im Raum unterbrechen: 5 Farben benennen, feste Gegenstände berühren.",
        "Sanfte Stimmaktivierung (Summen, leises Sprechen in Nuju), um den Vagusnerv an Kehle und Ohren anzusprechen.",
        "Harte Workouts vorübergehend durch somatisches Wiegen und ruhige Spaziergänge ersetzen."
      ],
      fr: [
        "Rompre le figement par l'ancrage sensoriel : nommer 5 couleurs autour de soi, toucher des textures concrètes.",
        "Vocalisations douces (bourdonnement, expression orale dans Nuju) pour stimuler les branches laryngées du nerf vague.",
        "Privilégier la marche consciente et les micromouvements plutôt que le sport cardio épuisant."
      ],
      es: [
        "Interrumpir el bloqueo mediante orientación espacial: nombrar 5 colores del entorno y palpar texturas físicas.",
        "Vocalización suave (tarareo continuo, hablar con calma en Nuju) para estimular el nervio vago laríngeo.",
        "Sustituir el ejercicio extremo por balanceos somáticos y caminatas suaves regenerativas."
      ]
    }
  },
  {
    level: "severe_dorsal_shutdown",
    scoreRange: [28, 36],
    title: {
      en: "Severe Dorsal Vagal Shutdown & Chronic Numbness",
      id: "Shutdown Dorsal Vagal Berat & Mati Rasa Kronis",
      de: "Schwere dorsale Vagus-Erstarrung & chronische Betäubung",
      fr: "Effondrement vagal dorsal sévère & anesthésie chronique",
      es: "Colapso vagal dorsal severo & anestesia emocional crónica"
    },
    badge: {
      en: "Deep Dorsal Freeze",
      id: "Freeze Dorsal Dalam",
      de: "Tiefer Freeze",
      fr: "Figement profond",
      es: "Congelación profunda"
    },
    summary: {
      en: "Your nervous system has retreated into its ancient reptilian defense: profound emotional numbness, visceral detachment, extreme inertia, and social withdrawal. You feel like a ghost drifting through your own life.",
      id: "Sistem saraf Anda mundur ke mode pertahanan primitif: mati rasa emosional mendalam, keterputusan fisik, inersia berat, dan dorongan menarik diri total dari dunia luar.",
      de: "Dein Nervensystem befindet sich in der tiefsten Schutzreaktion: emotionale Betäubung, vollkommene Antriebslosigkeit und der Drang nach totaler Abschottung.",
      fr: "Votre organisme s'est replié dans une défense de repli archaïque : anesthésie affective complète, léthargie musculaire et retrait du monde.",
      es: "Tu sistema nervioso se ha refugiado en el mecanismo primitivo de colapso: entumecimiento afectivo profundo, pesadez motora y aislamiento total."
    },
    neurobiology: {
      en: "Full dorsal vagal dominance (parasympathetic shock). Endogenous endorphins dampen bodily pain and sensations, inducing depersonalization or derealization. The prefrontal cortex experiences severe hypoactivation.",
      id: "Dominasi penuh dorsal vagal (syok parasimpatis). Pelepasan endorfin endogen mematikan sensasi tubuh dan rasa sakit, memicu depersonalisasi dan hipoaktivasi korteks prefrontal.",
      de: "Vollständige Dominanz des dorsalen Vagus (Parasympathischer Schock). Endogene Opioide betäuben Körpersensationen und erzeugen Entfremdungsgefühle.",
      fr: "Dominance complète du vague dorsal (choc parasympathique). La libération d'endorphines endogènes éteint la sensibilité corporelle, entraînant dépersonnalisation et hypoactivation cérébrale.",
      es: "Predominio absoluto del vago dorsal (shock parasimpático). Se anestesian las sensaciones viscerales generando despersonalización y desconexión ejecutiva."
    },
    actionProtocol: {
      en: [
        "Prioritize warm somatic inputs: warm baths, heavy blankets, holding a hot mug of tea to send primal cues of physical safety.",
        "Do not force yourself to solve your life problems today; focus exclusively on tiny micro-movements (wiggling toes, rotating wrists).",
        "Use low-pressure voice journaling in Nuju to whisper thoughts without any expectation of coherence or perfection.",
        "Consider consulting a somatic experiencing practitioner or trauma-informed somatic psychotherapist."
      ],
      id: [
        "Utamakan stimulus somatis yang hangat: mandi air hangat, selimut tebal, atau memegang cangkir teh panas untuk mengirim sinyal rasa aman fisik.",
        "Jangan memaksakan diri menyelesaikan masalah besar hari ini; fokuslah pada gerakan mikro (goyangkan jari kaki, putar pergelangan tangan).",
        "Gunakan voice journaling di Nuju untuk berbisik santai tanpa tuntutan kalimat teratur atau sempurna.",
        "Pertimbangkan berkonsultasi dengan terapis somatik atau psikolog berorientasi trauma tubuh."
      ],
      de: [
        "Wärmereize zuführen: warme Bäder, Gewichtsdecken oder eine heiße Tasse Tee vermitteln primäre körperliche Sicherheit.",
        "Keine lebensverändernden Entscheidungen erzwingen; beginne mit Mikrobewegungen (Zehen wackeln, Hände sanft öffnen).",
        "Sprachnotizen in Nuju zum sanften Flüstern nutzen – ohne Zwang zu Vollständigkeit oder Sinnhaftigkeit.",
        "Begleitung durch Traumatherapeuten (Somatic Experiencing) in Betracht ziehen."
      ],
      fr: [
        "Rechercher des signaux de chaleur et de sécurité : bain chaud, plaid lesté, tasse de thé chaud entre les mains.",
        "Ne rien forcer : commencer par des micro-mouvements simples (bouger les orteils, relâcher les épaules).",
        "Chuchoter ses pensées dans Nuju sans obligation de logique ou de performance.",
        "Consulter un thérapeute spécialisé en approche somatique (Somatic Experiencing)."
      ],
      es: [
        "Aplicar estímulos térmicos reconfortantes: mantas pesadas, duchas calientes o una taza tibia entre las manos para emitir calma neuroceptiva.",
        "Evitar presiones decisionales; comenzar con micromovimientos sutiles (mover los dedos de los pies, rotar muñecas).",
        "Susurrar pensamientos en Nuju sin exigencia de elocuencia ni coherencia.",
        "Valorar el apoyo de un profesional especializado en Somatic Experiencing."
      ]
    }
  }
];
