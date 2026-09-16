export type VagalLang = "en" | "id" | "de" | "fr" | "es";

export type VagalState = "ventral" | "sympathetic" | "dorsal" | "mixed";

export type VagalDimension = "ventral" | "sympathetic" | "dorsal";

export interface VagalQuestion {
  id: number;
  text: Record<VagalLang, string>;
  options: {
    state: VagalDimension;
    text: Record<VagalLang, string>;
    weight: number;
  }[];
}

export interface VagalProfile {
  id: VagalState;
  color: string;
  badge: Record<VagalLang, string>;
  title: Record<VagalLang, string>;
  tagline: Record<VagalLang, string>;
  description: Record<VagalLang, string>;
  somaticSymptoms: Record<VagalLang, string[]>;
  regulationDrill: Record<VagalLang, string>;
  dailyHabit: Record<VagalLang, string>;
}

export const VAGAL_PROFILES: Record<VagalState, VagalProfile> = {
  ventral: {
    id: "ventral",
    color: "#10B981",
    badge: {
      en: "Ventral Vagal (Green Zone)",
      id: "Ventral Vagal (Zona Hijau)",
      de: "Ventraler Vagus (Grüne Zone)",
      fr: "Vague Ventral (Zone Verte)",
      es: "Vago Ventral (Zona Verde)",
    },
    title: {
      en: "Social Engagement & Grounded Safety",
      id: "Rasa Aman Terhubung & Regulasi Tenang",
      de: "Soziale Verbundenheit & Innere Sicherheit",
      fr: "Engagement Social & Sécurité Somatique",
      es: "Conexión Social & Seguridad Enraizada",
    },
    tagline: {
      en: "Your nervous system is anchored in parasympathetic safety. Heart rate is rhythmic, thoughts are clear, and empathy flows easily.",
      id: "Sistem saraf Anda berada dalam zona aman parasimpatis. Detak jantung teratur, pikiran jernih, dan empati mengalir hangat.",
      de: "Dein Nervensystem ruht in sicherer Verbundenheit. Der Herzschlag ist ruhig, der Geist klar und offen.",
      fr: "Votre système nerveux est ancré dans la sécurité parasympathique. Le rythme cardiaque est apaisé et l'esprit réceptif.",
      es: "Tu sistema nervioso se encuentra anclado en la calma parasimpática. Tu pulso es sereno y tu mente está lúcida y abierta.",
    },
    description: {
      en: "You are currently in the Ventral Vagal state, the mammalian evolutionary pinnacle described by Dr. Stephen Porges. In this biological zone, blood flows freely to the prefrontal cortex, digestion is optimal, facial muscles are relaxed, and you can engage with the world with genuine curiosity and grounded compassion.",
      id: "Anda berada dalam status Ventral Vagal, puncak evolusi biologis mamalia menurut Dr. Stephen Porges. Pada zona ini, aliran darah optimal ke otak depan, pencernaan bekerja baik, otot wajah rileks, dan Anda mampu berkomunikasi dengan dunia secara hangat tanpa rasa curiga.",
      de: "Du befindest dich im ventralen Vagus-Zustand (nach Dr. Stephen Porges). Dein Organismus schüttet Oxytocin aus, die Verdauung arbeitet optimal und du begegnest Mitmenschen mit authentischer Offenheit und Gelassenheit.",
      fr: "Vous êtes dans l'état vagal ventral décrit par le Dr Stephen Porges. L'afflux sanguin irrigue le cortex préfrontal, la digestion est fluide et vous interagissez avec le monde avec curiosité et bienveillance.",
      es: "Te encuentras en el estado vagal ventral según la teoría polivagal del Dr. Stephen Porges. La digestión es óptima, los músculos faciales se relajan y te vinculas con serenidad, empatía y apertura.",
    },
    somaticSymptoms: {
      en: [
        "Gentle, rhythmic breathing with soft belly expansion",
        "Relaxed jaw, unfurrowed brow, and warm extremities",
        "Clear cognitive focus without racing dread or fog",
      ],
      id: [
        "Napas teratur dan perut mengembang lembut",
        "Rahang rileks, kening tidak berkerut, dan telapak tangan hangat",
        "Fokus pikiran jernih tanpa kepanikan atau rasa hampa",
      ],
      de: [
        "Ruhige, tiefe Bauchatmung ohne Anstrengung",
        "Entspannter Kiefer, glatte Stirn und warme Hände",
        "Geistige Klarheit ohne Gehetztsein oder Nebel",
      ],
      fr: [
        "Respiration abdominale douce et régulière",
        "Mâchoire détendue, front lisse et mains chaudes",
        "Clarté d'esprit sans fébrilité ni léthargie",
      ],
      es: [
        "Respiración abdominal suave y acompasada",
        "Mandíbula relajada, ceño despejado y manos templadas",
        "Lucidez mental libre de prisas o aturdimiento",
      ],
    },
    regulationDrill: {
      en: "Anchor this state with 3 minutes of slow somatic gratitude voice journaling in Ju to encode neurological safety memories.",
      id: "Kunci rasa aman ini dengan 3 menit voice journaling rasa syukur di Ju untuk memperkuat memori saraf parasimpatis.",
      de: "Verankere diesen Zustand mit 3 Minuten dankbarem Sprachjournaling in Ju, um das neurozeptive Sicherheitsmuster zu festigen.",
      fr: "Ancrez cet état par 3 minutes de journal vocal de gratitude sur Ju pour consolider cette sécurité somatique.",
      es: "Enraíza este bienestar con 3 minutos de diario de voz de gratitud en Ju para consolidar la memoria neurobiológica de calma.",
    },
    dailyHabit: {
      en: "Practice loving social eye contact and vocal humming (vagus phonation) daily.",
      id: "Lakukan kontak mata hangat dengan orang tersayang dan senandungkan nada lembut (vocal humming) setiap hari.",
      de: "Pflege bewussten, liebevollen Augenkontakt und sanftes Summen (Vagus-Stimulation).",
      fr: "Pratiquez le contact visuel chaleureux et le fredonnement vocal stimulant le nerf vague.",
      es: "Cultiva la mirada afectuosa y el suave tarareo vocal para tonificar el nervio vago.",
    },
  },

  sympathetic: {
    id: "sympathetic",
    color: "#F59E0B",
    badge: {
      en: "Sympathetic Arousal (Yellow/Orange Zone)",
      id: "Simpatik / Fight-or-Flight (Zona Kuning)",
      de: "Sympathikus-Aktivierung (Gelbe Zone)",
      fr: "Activation Sympathique (Zone Orange)",
      es: "Activación Simpática (Zona Amarilla/Naranja)",
    },
    title: {
      en: "Fight-or-Flight Mobilization & Hyperarousal",
      id: "Mobilisasi Fight-or-Flight & Ketegangan Saraf",
      de: "Kampf- oder Flucht-Mobilisierung",
      fr: "Mobilisation Lutte ou Fuite & Hypervigilance",
      es: "Mobilización de Lucha o Huida & Hiperalerta",
    },
    tagline: {
      en: "Your nervous system perceives an acute threat. Cortisol and adrenaline are surging, muscles are braced, and your mind is scanning for danger.",
      id: "Sistem saraf Anda mendeteksi ancaman bahaya. Kortisol dan adrenalin melonjak, otot tegang, dan pikiran waspada mencari risiko.",
      de: "Dein Nervensystem schlägt Alarm. Adrenalin flutet den Körper, die Muskeln spannen sich an und der Geist kreist um Gefahren.",
      fr: "Votre système nerveux perçoit une menace immédiate. L'adrénaline monte, vos muscles sont sous tension et votre esprit scrute le danger.",
      es: "Tu sistema nervioso percibe amenaza. La adrenalina se dispara, la musculatura se tensa y tu mente busca peligros compulsivamente.",
    },
    description: {
      en: "You are currently locked in Sympathetic Nervous System dominance. This ancient survival response prepares the body to fight off an attacker or sprint away from a predator. In the modern world, work deadlines, financial anxiety, and conflict trigger this exact same state, causing racing heart rates, shallow chest breathing, teeth clenching, and irritable defensiveness.",
      id: "Anda sedang didominasi oleh Sistem Saraf Simpatik (Fight-or-Flight). Reaksi purba ini menyiapkan tubuh untuk bertarung atau kabur. Di era modern, tenggat kerja, masalah finansial, atau chat tegang memicu reaksi yang sama: dada berdebar, napas pendek di dada atas, gigi menggertak, dan mudah tersinggung.",
      de: "Der Sympathikus hat das Steuer übernommen. Dein Organismus pumpt Blut in die Beine und Arme. Im modernen Alltag führen Deadlines oder Streitigkeiten zu exakt denselben Symptomen: Herzrasen, flache Brustatmung, Zähneknirschen und Reizbarkeit.",
      fr: "Vous êtes sous l'emprise du système nerveux sympathique. Conçu pour fuir un prédateur, ce réflexe se réveille aujourd'hui face aux e-mails urgents ou aux soucis financiers: souffle court, palpitations, mâchoire serrée et irritabilité défensive.",
      es: "Te domina el sistema simpático. Esta respuesta de supervivencia ancestral se activa ante plazos de trabajo o conflictos cotidianos: taquicardia, respiración superficial en el pecho, tensión mandibular e irritabilidad a flor de piel.",
    },
    somaticSymptoms: {
      en: [
        "Rapid or pounding heart rate; tight constricted chest",
        "Clenched jaw, tight shoulders, or stomach flutter (butterflies)",
        "Racing thoughts, urgency, irritability, and catastrophic thinking",
      ],
      id: [
        "Detak jantung cepat atau berdebar kencang; dada terasa sesak",
        "Rahang terkunci rapat, pundak naik tegang, dan perut melilit",
        "Pikiran berpacu cepat, merasa terburu-buru, dan mudah marah",
      ],
      de: [
        "Erhöhter Puls, Herzklopfen und Engegefühl in der Brust",
        "Zähnebeißen, hochgezogene Schultern und Magenkrämpfe",
        "Gedankenrasen, ständige Hektik und impulsive Reizbarkeit",
      ],
      fr: [
        "Rythme cardiaque accéléré et poitrine oppressée",
        "Mâchoires crispées, trapèzes contractés et nœud au ventre",
        "Pensées en cascade, précipitation et irritabilité vive",
      ],
      es: [
        "Taquicardia o palpitaciones con opresión en el pecho",
        "Mandíbula apretada, hombros rígidos y nudo en el estómago",
        "Pensamientos acelerados, sensación de urgencia y mal genio",
      ],
    },
    regulationDrill: {
      en: "Perform 60 seconds of the Stanford Physiological Sigh (2 quick inhales + long extended sigh) followed by 2 minutes of the EMDR Bilateral Stimulation Lab.",
      id: "Lakukan Stanford Physiological Sigh (2 tarikan napas cepat + hembusan panjang lewat mulut) lalu buka EMDR Bilateral Lab selama 2 menit.",
      de: "Führe sofort das Stanford Physiological Sigh Tool aus (doppeltes Einatmen, langer Seufzer) und nutze das EMDR Bilateral Lab.",
      fr: "Effectuez 60 secondes de Soupir Physiologique de Stanford puis 2 minutes dans le Laboratoire Bilatéral EMDR.",
      es: "Aplica de inmediato 60 segundos del Suspiro Fisiológico de Stanford y continúa 2 minutos en el Laboratorio Bilateral EMDR.",
    },
    dailyHabit: {
      en: "Discharge adrenaline through physical somatic shaking (tremoring limbs) for 90 seconds post-stress.",
      id: "Keluarkan sisa adrenalin dengan menggoyangkan seluruh tubuh (somatic shakeout) selama 90 detik setelah momen stres.",
      de: "Schüttle überschüssiges Adrenalin durch 90 Sekunden somatisches Zittern und Ausschütteln der Gliedmaßen ab.",
      fr: "Évacuez l'excès d'adrénaline en secouant vigoureusement vos membres (shaking somatique) pendant 90 secondes.",
      es: "Descarga la adrenalina sacudiendo tus brazos y piernas con fuerza (shaking somático) durante 90 segundos.",
    },
  },

  dorsal: {
    id: "dorsal",
    color: "#6366F1",
    badge: {
      en: "Dorsal Vagal Freeze (Blue Zone)",
      id: "Dorsal Vagal / Freeze & Shutdown (Zona Biru)",
      de: "Dorsaler Vagus / Schockstarre (Blaue Zone)",
      fr: "Vague Dorsal / Figement & Dissociation (Zone Bleue)",
      es: "Vago Dorsal / Congelación & Colapso (Zona Azul)",
    },
    title: {
      en: "Dorsal Vagal Freeze, Dissociation & Shutdown",
      id: "Dorsal Vagal Freeze, Disosiasi & Mati Rasa",
      de: "Dorsale Schockstarre, Erstarrung & Dissoziation",
      fr: "Figement Dorsal, Dissociation & Léthargie",
      es: "Colapso Dorsal, Disociación & Desconexión",
    },
    tagline: {
      en: "Your nervous system has pulled the emergency brake. You feel heavy, numb, disconnected from your body, and trapped in executive paralysis.",
      id: "Sistem saraf Anda menarik rem darurat. Tubuh terasa berat, hampa, mati rasa, dan lumpuh tak mampu bertindak.",
      de: "Dein Nervensystem hat die Notbremse gezogen. Du fühlst dich taub, wie betäubt, schwer und handlungsunfähig.",
      fr: "Votre système nerveux a tiré le frein de secours. Vous vous sentez lourd(e), déconnecté(e) de votre corps et paralysé(e).",
      es: "Tu sistema nervioso ha echado el freno de emergencia. Sientes pesadez corporal, anestesia emocional y parálisis ejecutiva.",
    },
    description: {
      en: "You are currently inhabiting the Dorsal Vagal Freeze state, the most primitive mammalian conservation circuit. When danger or emotional overwhelm feels too catastrophic to fight or flee, the nervous system feigns death. Your heart rate drops, metabolism slows, brain fog descends, and you feel profoundly detached from reality, scrolling blankly or unable to leave bed.",
      id: "Anda berada dalam kondisi Dorsal Vagal Freeze (Shutdown), sirkuit pertahanan tertua mamalia. Saat beban stres terasa begitu luar biasa hingga tak mampu lagi dilawan, sistem saraf memilih pura-pura mati (mati rasa). Detak jantung dan metabolisme melambat, pikiran berkabut pekat, dan Anda merasa terasing dari realitas sekitar.",
      de: "Du steckst im dorsalen Vagus-Kollaps. Wenn Stress zu überwältigend wird, schaltet der Organismus auf Totstellreflex. Blutdruck und Stoffwechsel sinken, geistige Apathie setzt ein und du fühlst dich wie hinter einer dicken Glasscheibe von der Welt getrennt.",
      fr: "Vous traversez un figement vagal dorsal. Lorsque la souffrance ou la surcharge devient insupportable, le corps se met en veille défensive. La léthargie s'installe, la réalité semble lointaine et vous vous sentez incapable d'initier le moindre mouvement.",
      es: "Te encuentras en colapso vagal dorsal. Cuando la presión supera tu umbral, el cuerpo finge la muerte para no sufrir. El metabolismo decae, baja la energía vital y sientes como si vivieras detrás de un cristal grueso, ajeno(a) a todo.",
    },
    somaticSymptoms: {
      en: [
        "Heavy limbs, feeling glued to the bed or couch; cold hands/feet",
        "Emotional numbness, flat affect, or staring blankly into space",
        "Thick brain fog, extreme low energy, and executive paralysis",
      ],
      id: [
        "Kaki dan tangan terasa sangat berat; telapak tangan dingin",
        "Mati rasa emosi, tatapan kosong menatap dinding, dan merasa hampa",
        "Brain fog pekat, energi drop total, dan tidak sanggup memulai tugas",
      ],
      de: [
        "Bleierne Schwere in den Gliedmaßen; eiskalte Hände und Füße",
        "Emotionale Taubheit, leerer Blick und Gefühl von Entfremdung",
        "Dicker Nebel im Kopf, Antriebslosigkeit und executive Dysfunktion",
      ],
      fr: [
        "Membres de plomb, sensation d'être cloué(e) au canapé et mains froides",
        "Anesthésie émotionnelle, regard vide et déconnexion affective",
        "Brouillard mental dense, apathie totale et incapacité à démarrer",
      ],
      es: [
        "Pesadez extrema en el cuerpo, manos heladas y dificultad para moverte",
        "Apatía emocional, mirada perdida en la nada y vacío interior",
        "Niebla mental impenetrable, energía por los suelos y parálisis ejecutiva",
      ],
    },
    regulationDrill: {
      en: "Do NOT force high-intensity exercise. Open the 5-4-3-2-1 Sensory Grounding Lab to gently coax your sensory channels back to safety, followed by drinking a glass of warm water.",
      id: "JANGAN paksa olahraga berat. Buka Laboratorium Grounding 5-4-3-2-1 untuk mengaktifkan indra fisik secara bertahap, lalu minum segelas air hangat.",
      de: "Erzwinge jetzt KEIN anstrengendes Workout. Nutze das 5-4-3-2-1 Erdungs-Labor, um deine Sinne sanft aufzuwecken, und trinke warmes Wasser.",
      fr: "Ne forcez PAS un effort violent. Ouvrez le module d'Ancrage 5-4-3-2-1 pour reconnecter vos sens en douceur et buvez une boisson chaude.",
      es: "NO te fuerces a hacer ejercicio intenso. Entra al Laboratorio de Grounding 5-4-3-2-1 para reactivar los sentidos con suavidad y bebe agua tibia.",
    },
    dailyHabit: {
      en: "Wrap in a weighted blanket, place a hand over your heart, and practice gentle rocking.",
      id: "Gunakan selimut tebal, letakkan tangan di atas dada, dan lakukan gerakan mengayun tubuh perlahan.",
      de: "Hülle dich in eine schwere Decke, lege die Hand aufs Herz und wiege dich sanft vor und zurück.",
      fr: "Enveloppez-vous dans un plaid chaud, posez une main sur le cœur et bercez-vous doucement.",
      es: "Cúbrete con una manta abrigada, pon la mano en el pecho y mece tu cuerpo con dulzura.",
    },
  },

  mixed: {
    id: "mixed",
    color: "#EC4899",
    badge: {
      en: "Mixed State: Freeze-Flight Overwhelm",
      id: "Kondisi Campuran: Freeze & Cemas Ekstrem",
      de: "Gemischter Zustand: Starre & Panik",
      fr: "État Mixte: Figement & Angoisse",
      es: "Estado Mixto: Pánico & Parálisis",
    },
    title: {
      en: "The High-Functioning Freeze Trap",
      id: "Jebakan High-Functioning Freeze",
      de: "Die paradoxe Erstarrungsfalle",
      fr: "Le Piège du Figement Hyperactif",
      es: "La Trampa del Colapso Funcional",
    },
    tagline: {
      en: "Foot on the gas and foot on the brake simultaneously. Your heart is racing with panic while your body feels frozen and numb.",
      id: "Menginjak pedal gas dan rem secara bersamaan. Jantung berdebar cemas namun tubuh terasa kaku lumpuh.",
      de: "Vollgas und Vollbremsung zugleich: Das Herz rast vor Unruhe, während der Körper wie gelähmt festsitzt.",
      fr: "Le pied sur l'accélérateur et sur le frein en même temps: le cœur s'emballe mais le corps reste figé.",
      es: "Acelerar y frenar al mismo tiempo: el corazón late desbocado de angustia mientras el cuerpo está paralizado.",
    },
    description: {
      en: "You are experiencing a neuroception deadlock: high sympathetic activation coupled with a dorsal vagal emergency brake. You want to scream, run, and accomplish 50 tasks, yet you cannot get off the sofa. This state is common in chronic overthinkers, late-diagnosed ADHD, and complex trauma survivors.",
      id: "Sistem saraf Anda mengalami kebuntuan: lonjakan adrenalin simpatik dihantam rem darurat dorsal vagus. Pikiran ingin berlari dan menyelesaikan puluhan tugas, namun tubuh tak sanggup beranjak. Kondisi ini sangat khas pada overthinker kronis dan individu dengan ADHD.",
      de: "Ein neurobiologischer Stau: Hohe Sympathikus-Panik trifft auf die dorsale Handbremse. Der Kopf explodiert vor Gedanken, doch der Körper verweigert die Bewegung. Häufig bei chronischem Überdenken und neurodivergenten Menschen.",
      fr: "Un blocage neurobiologique paradoxal: l'adrénaline sympathise avec le freinage dorsal. Vous bouillonnez d'urgences intérieures mais demeurez pétrifié(e). Fréquent chez les profils hypersensibles et anxieux chroniques.",
      es: "Un colapso neurobiológico simultáneo: alarma simpática frenada por la parálisis dorsal. La mente grita mil urgencias pero el cuerpo no responde. Típico en personas con sobrepensamiento crónico y trauma acumulado.",
    },
    somaticSymptoms: {
      en: [
        "Internal buzzing vibrating sensation while physically motionless",
        "Exhausted yet wired; unable to rest and unable to work",
        "Panic loops behind a stoic, expressionless face",
      ],
      id: [
        "Sensasi bergetar/berdengung di dalam dada meski tubuh terdiam kaku",
        "Sangat lelah tapi susah tidur (tired but wired); tidak bisa istirahat dan tidak bisa kerja",
        "Pikiran panik berputar di balik ekspresi wajah yang tampak datar",
      ],
      de: [
        "Inneres Vibrieren bei äußerlicher Bewegungslosigkeit",
        "Gleichzeitig völlig erschöpft und nervlich überreizt (tired but wired)",
        "Stille Panikspiralen hinter einer unbewegten Mimik",
      ],
      fr: [
        "Vibrations intérieures anxieuses dans un corps immobile",
        "Épuisé(e) mais survolté(e) (tired and wired); incapable de dormir comme d'agir",
        "Tempête d'angoisse sous un visage impassible",
      ],
      es: [
        "Vibración interna de angustia mientras permaneces inmóvil",
        "Exhausto(a) pero con los nervios de punta; incapaz de descansar y de producir",
        "Espirales de pánico interno bajo un rostro inexpresivo",
      ],
    },
    regulationDrill: {
      en: "Start with tactile grounding (put ice cubes on wrists or wash face with cold water), then breathe with the 4-4-4-4 Emergency Box Breathing tool.",
      id: "Mulai dengan stimulus dingin (tempelkan es di pergelangan tangan atau basuh wajah dengan air dingin), lalu buka Panic SOS Box Breathing.",
      de: "Setze einen sensorischen Reiz (Eiswürfel ans Handgelenk, kaltes Wasser ins Gesicht) und nutze dann die Box-Breathing SOS-Atemübung.",
      fr: "Créez un choc thermique doux (eau froide sur le visage ou glaçon sur les poignets) puis respirez avec le module SOS Panique.",
      es: "Aplica un estímulo térmico (hielo en las muñecas o agua fría en la cara) y continúa con la respiración cuadrada del SOS Panique.",
    },
    dailyHabit: {
      en: "Alternate between slow rocking and brisk physical pacing to harmonize the nervous system.",
      id: "Gantian antara mengayun tubuh perlahan dan jalan cepat untuk menyelaraskan kedua kutub saraf.",
      de: "Wechsle zwischen sanftem Wiegen und zügigem Gehen, um die Pole zu harmonisieren.",
      fr: "Alternez balancement doux et marche rythmée pour réconcilier les deux branches du système nerveux.",
      es: "Alterna balanceo pausado con pasos firmes para armonizar ambos polos del sistema nervioso.",
    },
  },
};

export const VAGAL_QUESTIONS: VagalQuestion[] = [
  {
    id: 1,
    text: {
      en: "How does your breathing and physical chest area feel right now?",
      id: "Bagaimana kondisi tarikan napas dan area dada Anda saat ini?",
      de: "Wie fühlen sich deine Atmung und dein Brustbereich im Moment an?",
      fr: "Comment ressentez-vous votre souffle et votre poitrine en cet instant ?",
      es: "¿Cómo sientes tu respiración y el pecho en este momento?",
    },
    options: [
      {
        state: "ventral",
        weight: 3,
        text: {
          en: "Deep, smooth, and effortless belly breathing; chest feels open and warm.",
          id: "Napas panjang, teratur di perut; dada terasa lapang dan rileks.",
          de: "Tief, ruhig und entspannt im Bauch; die Brust fühlt sich weit und warm an.",
          fr: "Ample, régulière et fluide dans le ventre; poitrine détendue et ouverte.",
          es: "Profunda, fluida y relajada en el vientre; pecho amplio y calmado.",
        },
      },
      {
        state: "sympathetic",
        weight: 3,
        text: {
          en: "Shallow, fast breathing trapped in upper chest; tight band across ribs.",
          id: "Napas pendek dan cepat di dada atas; dada terasa sesak atau tertekan.",
          de: "Flach, gehetzt und hoch in der Brust; ein Engegefühl schnürt die Rippen zu.",
          fr: "Courte, rapide et bloquée en haut des poumons; sensation d'oppression.",
          es: "Superficial, rápida y atrapada arriba; sensación de presión en las costillas.",
        },
      },
      {
        state: "dorsal",
        weight: 3,
        text: {
          en: "Barely noticeable, suppressed, faint breathing; chest feels numb or heavy as stone.",
          id: "Napas sangat pelan dan dangkal; dada terasa hampa atau berat seperti batu.",
          de: "Kaum spürbar, flach und wie angehalten; die Brust fühlt sich taub oder wie Blei an.",
          fr: "À peine perceptible, étouffée et lointaine; la poitrine semble anesthésiée.",
          es: "Apenas perceptible, débil y contenida; el pecho se siente pesado como plomo.",
        },
      },
    ],
  },
  {
    id: 2,
    text: {
      en: "How do your muscles and physical body feel right now?",
      id: "Bagaimana ketegangan otot dan fisik tubuh Anda saat ini?",
      de: "Wie fühlt sich deine Muskulatur und deine Körperspannung an?",
      fr: "Quel est l'état de votre tonus musculaire et de votre corps actuellement ?",
      es: "¿Cómo sientes tus músculos y la energía física de tu cuerpo?",
    },
    options: [
      {
        state: "ventral",
        weight: 3,
        text: {
          en: "Fluid, loose, and comfortable; shoulders down, jaw unclenched, hands warm.",
          id: "Lentur, rileks, dan nyaman; pundak turun santai, rahang kendur, tangan hangat.",
          de: "Locker, gelöst und angenehm; Schultern tief, Kiefer entspannt, Hände warm.",
          fr: "Souple, délié et confortable; épaules basses, mâchoire relâchée, mains chaudes.",
          es: "Flexible, suelto y cómodo; hombros caídos, mandíbula relajada, manos templadas.",
        },
      },
      {
        state: "sympathetic",
        weight: 3,
        text: {
          en: "Tense, coiled, braced for action; teeth clenching, fidgeting, restless urge to move.",
          id: "Tegang, kaku, bersiap siaga; gigi merapat kuat, gelisah tak bisa diam.",
          de: "Angespannt, sprungbereit und verkrampft; Zähneknirschen, Ruhelosigkeit.",
          fr: "Crispé, en alerte et prêt à réagir; dents serrées, agitation motrice.",
          es: "Tenso, contracturado y en guardia; mandíbula apretada, inquietud en el cuerpo.",
        },
      },
      {
        state: "dorsal",
        weight: 3,
        text: {
          en: "Lethargic, heavy as lead; glued to the chair/bed, feeling cold or physically hollow.",
          id: "Lemas lunglai, berat seperti timbal; menempel di kasur/kursi, tangan terasa dingin.",
          de: "Bleiern schwer, wie gelähmt; festgewachsen am Sitz, kraftlos und kalt.",
          fr: "Écrasé de fatigue, lourd comme du plomb; cloué au siège, froid et sans force.",
          es: "Sin energía, pesado como el plomo; pegado al asiento, frío y sin vitalidad.",
        },
      },
    ],
  },
  {
    id: 3,
    text: {
      en: "What is your mental and cognitive headspace like right now?",
      id: "Bagaimana kondisi pikiran dan kejernihan otak Anda saat ini?",
      de: "Wie ist dein mentaler Zustand und deine Gedankenwelt beschaffen?",
      fr: "Quel est l'état de vos pensées et de votre clarté mentale ?",
      es: "¿Cómo está tu mente y tu flujo de pensamientos ahora mismo?",
    },
    options: [
      {
        state: "ventral",
        weight: 3,
        text: {
          en: "Clear, grounded, and curious; able to problem-solve calmly and see nuance.",
          id: "Jernih, tenang, dan bijak; mampu berpikir jernih dan melihat solusi secara objektif.",
          de: "Klar, besonnen und neugierig; lösungsorientiert und differenziert denkend.",
          fr: "Clair, apaisé et curieux; capable de discernement et de réflexion posée.",
          es: "Lúcido, sereno y receptivo; capaz de resolver problemas con perspectiva y calma.",
        },
      },
      {
        state: "sympathetic",
        weight: 3,
        text: {
          en: "Racing, obsessive, jumping from fire to fire; scanning for errors and threats.",
          id: "Berputar cepat, overthinking kalut, loncat dari satu ketakutan ke ketakutan lain.",
          de: "Rasend, obsessiv und sprunghaft; ständig auf der Suche nach Risiken und Fehlern.",
          fr: "Agité, obsédant et en surchauffe; focalisé sur les urgences et scénarios catastrophes.",
          es: "Acelerado, disperso y en bucle; escaneando amenazas y fallos sin parar.",
        },
      },
      {
        state: "dorsal",
        weight: 3,
        text: {
          en: "Thick fog, blankness, memory blackout; feeling like thoughts are wading through molasses.",
          id: "Brain fog pekat, blank kosong; pikiran lambat seperti terjebak di lumpur hisap.",
          de: "Dichter Nebel, Leere und Blackout; Gedanken bewegen sich zäh wie Teer.",
          fr: "Brouillard épais, vide et déconnexion; les pensées avancent au ralenti complet.",
          es: "Niebla densa, mente en blanco y apatía; pensar cuesta un esfuerzo gigantesco.",
        },
      },
    ],
  },
  {
    id: 4,
    text: {
      en: "How do you feel about interacting with other human beings right now?",
      id: "Bagaimana perasaan Anda terhadap interaksi dengan orang lain saat ini?",
      de: "Wie fühlst du dich gegenüber dem Kontakt mit anderen Menschen?",
      fr: "Quelle est votre disposition vis-à-vis des autres personnes en ce moment ?",
      es: "¿Cómo te sientes respecto al contacto o interacción con otras personas?",
    },
    options: [
      {
        state: "ventral",
        weight: 3,
        text: {
          en: "Warm and receptive; genuinely open to eye contact, conversation, or listening.",
          id: "Hangat dan terbuka; nyaman bertatap mata, mengobrol santai, atau mendengarkan.",
          de: "Warmherzig und aufgeschlossen; bereit für echten Blickkontakt und Dialog.",
          fr: "Chaleureux et disponible; à l'aise pour échanger, écouter et regarder dans les yeux.",
          es: "Cálido y receptivo; cómodo(a) conversando, mirando a los ojos y conectando.",
        },
      },
      {
        state: "sympathetic",
        weight: 3,
        text: {
          en: "Guarded and prickly; easily irritated by others' voices, seeing requests as attacks.",
          id: "Waspada dan gampang tersinggung; risih mendengar suara orang, menganggap obrolan sebagai tuntutan.",
          de: "Gereizt und abwehrend; genervt von Stimmen und Forderungen anderer.",
          fr: "Sur la défensive et agacé(e); irrité(e) par la moindre sollicitation ou parole.",
          es: "A la defensiva e irritable; me molestan las voces y siento las peticiones como exigencias.",
        },
      },
      {
        state: "dorsal",
        weight: 3,
        text: {
          en: "Invisible and vanished; completely incapable of socializing, wanting to disappear.",
          id: "Menghilang total; tak sanggup bicara sepatah kata pun, ingin lenyap dari keramaian.",
          de: "Unsichtbar und abgekapselt; unfähig zur Kontaktaufnahme, Wunsch zu verschwinden.",
          fr: "Invisible et absent(e); incapable du moindre échange, envie de disparaître.",
          es: "Invisible y ausente; incapaz de pronunciar palabra, con ganas de evaporarme.",
        },
      },
    ],
  },
  {
    id: 5,
    text: {
      en: "What is your digestion and gut sensation telling you right now?",
      id: "Apa yang Anda rasakan di area perut dan sistem pencernaan saat ini?",
      de: "Was signalisiert dein Magen-Darm-Bereich im Augenblick?",
      fr: "Quelles sensations percevez-vous dans votre ventre et votre digestion ?",
      es: "¿Qué sensaciones notas en tu estómago y sistema digestivo?",
    },
    options: [
      {
        state: "ventral",
        weight: 3,
        text: {
          en: "Quiet, calm, and settled; normal hunger or peaceful satisfaction.",
          id: "Tenang, nyaman, tidak bergejolak; rasa lapar wajar atau kenyang tenteram.",
          de: "Ruhig, unbeschwert und entspannt; gesunder Appetit oder friedliche Sättigung.",
          fr: "Calme, détendu et confortable; sensation normale d'appétit ou de satiété paisible.",
          es: "Tranquilo, templado y sin molestias; apetito sano o saciedad descansada.",
        },
      },
      {
        state: "sympathetic",
        weight: 3,
        text: {
          en: "Knotted, churning, acid reflux or tight butterflies in stomach.",
          id: "Melilit, tegang, asam lambung naik, atau rasa bergejolak tidak enak di ulu hati.",
          de: "Verkrampft, nervös flatternd oder Sodbrennen; ein harter Knoten im Bauch.",
          fr: "Noué, barbouillé, reflux acide ou estomac serré comme un étau.",
          es: "Anudado, revuelto, con acidez o mariposas nerviosas desagradables.",
        },
      },
      {
        state: "dorsal",
        weight: 3,
        text: {
          en: "Completely shut down, heavy nausea, loss of appetite, or hollow numbness.",
          id: "Mati rasa, mual berat, hilang nafsu makan total, atau hampa dingin.",
          de: "Völlig lahmgelegt, Übelkeit, Appetitlosigkeit oder hohle Taubheit.",
          fr: "Système à l'arrêt, nausée sourde, perte totale d'appétit et vide froid.",
          es: "Totalmente apagado, náusea pesada, falta absoluta de apetito y vacío gélido.",
        },
      },
    ],
  },
  {
    id: 6,
    text: {
      en: "If you had to tackle a complex, demanding work project right this minute, your reaction is:",
      id: "Jika Anda harus mengerjakan proyek kerja yang rumit detik ini juga, reaksi Anda adalah:",
      de: "Wenn du jetzt sofort ein komplexes, schwieriges Projekt anpacken müsstest, reagierst du mit:",
      fr: "Si vous deviez vous atteler à un projet complexe à la seconde même, votre réaction serait :",
      es: "Si tuvieras que afrontar un proyecto difícil y exigente en este preciso instante, reaccionarías:",
    },
    options: [
      {
        state: "ventral",
        weight: 3,
        text: {
          en: "I can break it down methodically, focus with patience, and make steady progress.",
          id: "Saya bisa memecahnya jadi langkah kecil, fokus dengan sabar, dan mengerjakannya teratur.",
          de: "Ich kann es strukturiert zerlegen, konzentriert angehen und ruhig Fortschritte machen.",
          fr: "Je peux le découper avec méthode, me concentrer patiemment et avancer pas à pas.",
          es: "Puedo desglosarlo con orden, concentrarme con paciencia y avanzar con firmeza.",
        },
      },
      {
        state: "sympathetic",
        weight: 3,
        text: {
          en: "Anxious adrenaline burst; I rush frantically, multitask chaotically, and fear failing.",
          id: "Lonjakan adrenalin panik; saya terburu-buru, multitasking kacau, dan takut gagal.",
          de: "Hektischer Adrenalinschub; ich fange zehn Dinge zugleich an und fürchte Fehler.",
          fr: "Coup de stress fébrile; je me précipite dans tous les sens par peur d'échouer.",
          es: "Descarga de estrés y prisa; abro diez tareas a la vez con miedo a no llegar.",
        },
      },
      {
        state: "dorsal",
        weight: 3,
        text: {
          en: "Total executive paralysis; my brain shuts down, I stare at the screen, and feel hopelessly stuck.",
          id: "Kelumpuhan total (freeze); otak mogok, hanya bisa menatap layar bengong tanpa daya.",
          de: "Vollständige Lähmung; das Gehirn blockiert, ich starre ins Leere und kann nicht anfangen.",
          fr: "Paralysie d'action absolue; mon esprit décroche, je regarde l'écran sans pouvoir démarrer.",
          es: "Bloqueo total; mi mente se desconecta, miro la pantalla inmóvil sin poder empezar.",
        },
      },
    ],
  },
];

export function calculateVagalScore(answers: Record<number, VagalDimension>) {
  const scores: Record<VagalDimension, number> = {
    ventral: 0,
    sympathetic: 0,
    dorsal: 0,
  };

  let totalWeight = 0;
  VAGAL_QUESTIONS.forEach((q) => {
    const chosen = answers[q.id];
    if (chosen && scores[chosen] !== undefined) {
      scores[chosen] += 3;
      totalWeight += 3;
    }
  });

  const divisor = totalWeight || 1;
  const percentages: Record<VagalDimension, number> = {
    ventral: Math.round((scores.ventral / divisor) * 100),
    sympathetic: Math.round((scores.sympathetic / divisor) * 100),
    dorsal: Math.round((scores.dorsal / divisor) * 100),
  };

  let dominantState: VagalState = "ventral";

  // Check if both sympathetic and dorsal are elevated (Freeze-Flight Mixed State)
  if (percentages.sympathetic >= 35 && percentages.dorsal >= 35) {
    dominantState = "mixed";
  } else if (scores.ventral >= scores.sympathetic && scores.ventral >= scores.dorsal) {
    dominantState = "ventral";
  } else if (scores.sympathetic >= scores.dorsal) {
    dominantState = "sympathetic";
  } else {
    dominantState = "dorsal";
  }

  const profile = VAGAL_PROFILES[dominantState];

  return {
    dominantState,
    profile,
    scores,
    totalWeight,
    percentages,
  };
}
