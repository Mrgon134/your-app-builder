export type ExecutiveDysfunctionCardLang = "en" | "id" | "de" | "fr" | "es";

export interface ExecutiveDysfunctionQuestion {
  id: number;
  subscale:
    | "task_initiation_activation_barrier"
    | "working_memory_object_impermanence"
    | "time_blindness_urgency_dependence";
  text: Record<ExecutiveDysfunctionCardLang, string>;
}

export interface ExecutiveDysfunctionResultLevel {
  level:
    | "optimal_executive_flow"
    | "mild_activation_friction"
    | "moderate_executive_strain"
    | "severe_executive_paralysis"
    | "acute_dopaminergic_shutdown";
  scoreRange: [number, number];
  title: Record<ExecutiveDysfunctionCardLang, string>;
  badge: Record<ExecutiveDysfunctionCardLang, string>;
  summary: Record<ExecutiveDysfunctionCardLang, string>;
  psychology: Record<ExecutiveDysfunctionCardLang, string>;
  actionProtocol: Record<ExecutiveDysfunctionCardLang, string[]>;
}

export const EXECUTIVE_DYSFUNCTION_QUESTIONS: ExecutiveDysfunctionQuestion[] = [
  // 1. Task Initiation & Activation Barrier
  {
    id: 1,
    subscale: "task_initiation_activation_barrier",
    text: {
      en: "I can sit in front of a blank screen or a simple chore for hours, desperately wanting to start, yet physically feeling like an invisible wall is holding my limbs back.",
      id: "Aku bisa duduk berjam-jam di depan layar kosong atau tugas sepele, sangat ingin memulainya, tetapi tubuhku merasa seolah ada dinding tak kasat mata yang menahan.",
      de: "Ich sitze stundenlang vor einer einfachen Aufgabe und will verzweifelt anfangen, fühle mich aber körperlich gelähmt wie vor einer unsichtbaren Mauer.",
      fr: "Je peux rester des heures devant une tâche simple en voulant désespérément commencer, bloqué par un mur invisible.",
      es: "Puedo pasar horas frente a una tarea sencilla deseando empezar, pero sintiendo un muro invisible que me paraliza físicamente.",
    },
  },
  // 2. Working Memory & Object Impermanence
  {
    id: 2,
    subscale: "working_memory_object_impermanence",
    text: {
      en: "If an item, email, or project is out of my direct line of sight, it effectively ceases to exist in my mind until an emergency erupts.",
      id: "Jika suatu barang, email, atau proyek tidak berada langsung di depan mataku, hal itu seakan lenyap dari kepalaku sampai terjadi krisis mendadak.",
      de: "Liegt ein Projekt oder eine E-Mail nicht direkt in meinem Blickfeld, existiert es für mein Gehirn praktisch nicht mehr – bis es brennt.",
      fr: "Si un dossier ou un message n'est pas sous mes yeux, il cesse littéralement d'exister pour mon esprit jusqu'à la catastrophe.",
      es: "Si un proyecto o correo no está en mi campo visual directo, deja de existir en mi mente hasta que estalla una urgencia.",
    },
  },
  // 3. Time Blindness & Urgency Dependence
  {
    id: 3,
    subscale: "time_blindness_urgency_dependence",
    text: {
      en: "My brain only recognizes two time zones: 'RIGHT NOW' and 'NOT NOW'. I struggle to start tasks until adrenaline and panic kick in.",
      id: "Otakku hanya mengenali dua zona waktu: 'SEKARANG' dan 'BELUM NANTI'. Aku kesulitan bergerak sampai adrenalin dan panik tenggat waktu menyengat.",
      de: "Mein Gehirn kennt nur zwei Zeitzonen: 'JETZT' und 'NICHT JETZT'. Ich kann mich erst aufraffen, wenn pure Panik und Adrenalin einsetzen.",
      fr: "Mon cerveau ne connaît que deux temps : 'MAINTENANT' et 'PAS MAINTENANT'. Je ne démarre qu'au pied du mur sous adrénaline.",
      es: "Mi cerebro solo reconoce dos zonas temporales: 'AHORA' y 'NO AHORA'. Solo logro activarme cuando la adrenalina y el pánico del plazo explotan.",
    },
  },
  // 4. Task Initiation & Activation Barrier
  {
    id: 4,
    subscale: "task_initiation_activation_barrier",
    text: {
      en: "Simple administrative tasks (sending an email, paying a bill, booking an appointment) cause profound internal exhaustion and dread disproportionate to their actual effort.",
      id: "Tugas administratif sepele (membalas email, membayar tagihan, membuat janji temu) memicu kelelahan batin dan rasa enggan yang luar biasa.",
      de: "Einfache Routineaufgaben (Rechnung bezahlen, Termin buchen) erzeugen eine unverhältnismäßige innere Erschöpfung und Abneigung.",
      fr: "Les corvées administratives simples me vident de mon énergie et m'inspirent un dégoût disproportionné.",
      es: "Trámites sencillos (pagar una factura, responder un correo) me provocan un agotamiento y rechazo desmedidos.",
    },
  },
  // 5. Working Memory & Object Impermanence
  {
    id: 5,
    subscale: "working_memory_object_impermanence",
    text: {
      en: "I frequently walk into a room, open a browser tab, or unlock my phone and have zero recollection of what I intended to do three seconds prior.",
      id: "Aku sering berjalan ke suatu ruangan, membuka tab browser, atau membuka ponsel, lalu lupa sama sekali apa yang ingin kulakukan tiga detik sebelumnya.",
      de: "Ich betrete einen Raum oder öffne ein Tab und habe keine Ahnung mehr, was ich vor drei Sekunden eigentlich tun wollte.",
      fr: "J'entre dans une pièce ou ouvre un onglet et oublie instantanément ce que je venais y faire trois secondes plus tôt.",
      es: "Entro en una habitación o abro una pestaña y olvido por completo lo que me disponía a hacer tres segundos antes.",
    },
  },
  // 6. Time Blindness & Urgency Dependence
  {
    id: 6,
    subscale: "time_blindness_urgency_dependence",
    text: {
      en: "I routinely underestimate how long complex tasks take, leaving me chronically late, overwhelmed, and apologizing for missed deadlines.",
      id: "Aku sering meremehkan berapa lama waktu yang dibutuhkan suatu tugas, membuatku sering terlambat dan kewalahan meminta maaf atas tenggat yang terlewat.",
      de: "Ich verschätze mich regelmäßig bei der Aufgabendauer, was zu chronischer Verspätung und Entschuldigungen führt.",
      fr: "Je sous-estime constamment le temps nécessaire, me retrouvant toujours en retard et débordé.",
      es: "Subestimo sistemáticamente el tiempo que requieren las tareas, viviendo en un estado crónico de retraso y disculpas.",
    },
  },
  // 7. Task Initiation & Activation Barrier
  {
    id: 7,
    subscale: "task_initiation_activation_barrier",
    text: {
      en: "When overwhelmed by multiple priorities, my brain completely freezes—instead of doing any of them, I spend three hours doing meaningless micro-distractions.",
      id: "Saat dibanjiri banyak prioritas, otakku membeku total—bukannya menyelesaikan salah satunya, aku malah menghabiskan 3 jam melakukan distraksi kecil tak berguna.",
      de: "Bei mehreren Prioritäten friert mein Gehirn ein – statt etwas anzupacken, verliere ich Stunden mit sinnlosen Nebensächlichkeiten.",
      fr: "Face à de multiples priorités, mon cerveau disjoncte : au lieu d'agir, je me perds dans des micro-distractions inutiles.",
      es: "Ante múltiples prioridades, mi cerebro se congela: en vez de avanzar, pierdo tres horas en micro-distracciones inútiles.",
    },
  },
  // 8. Working Memory & Object Impermanence
  {
    id: 8,
    subscale: "working_memory_object_impermanence",
    text: {
      en: "If I am interrupted in the middle of a focused activity, it takes an agonizing amount of mental energy to reconstruct where I left off.",
      id: "Jika aku diinterupsi di tengah pekerjaan yang butuh fokus, rasanya butuh energi mental yang luar biasa berat untuk kembali ke titik semula.",
      de: "Werde ich bei der Arbeit unterbrochen, kostet es quälend viel Energie, den Faden wieder aufzunehmen.",
      fr: "Si l'on m'interrompt en plein travail, il m'est extrêmement pénible de retrouver le fil.",
      es: "Si me interrumpen mientras trabajo, me cuesta una energía descomunal retomar el hilo donde lo dejé.",
    },
  },
  // 9. Time Blindness & Urgency Dependence
  {
    id: 9,
    subscale: "time_blindness_urgency_dependence",
    text: {
      en: "I cannot easily switch gears: once I finally enter a hyper-focused flow state, pulling myself away feels physically painful.",
      id: "Aku sulit beralih mode: begitu akhirnya masuk ke kondisi fokus mendalam (hyperfocus), dipaksa berhenti terasa menyakitkan secara fisik.",
      de: "Ich kann schwer umschalten: Wenn ich einmal im Hyperfokus bin, schmerzt es fast körperlich, mich herauszureißen.",
      fr: "Je n'arrive pas à changer d'activité : une fois en hyperfocus, m'interrompre est une véritable violence physique.",
      es: "Me cuesta cambiar de marcha: una vez que entro en hiperfoco, despegarme de la tarea se siente físicamente doloroso.",
    },
  },
  // 10. Task Initiation & Activation Barrier
  {
    id: 10,
    subscale: "task_initiation_activation_barrier",
    text: {
      en: "I carry a heavy internal burden of shame, constantly labeling myself as 'lazy' or 'undisciplined' despite working myself to exhaustion.",
      id: "Aku memikul rasa malu mendalam, terus-menerus melabeli diri sebagai 'pemalas' atau 'tidak disiplin' padahal sudah berjuang sampai lelah.",
      de: "Ich leide unter Schuldgefühlen und halte mich für 'faul', obwohl ich mich mental bis zur Erschöpfung verausgabe.",
      fr: "Je porte une honte tenace, me traitant de 'paresseux' alors que je m'épuise moralement à lutter contre le blocage.",
      es: "Arrastro una culpa dolorosa, tachándome de 'vago' o 'indisciplinado' aunque me agote mentalmente en el intento de rendir.",
    },
  },
  // 11. Working Memory & Object Impermanence
  {
    id: 11,
    subscale: "working_memory_object_impermanence",
    text: {
      en: "I struggle to keep multi-step instructions in mind unless they are broken down into immediate, single-action checkboxes.",
      id: "Aku kesulitan mengingat instruksi yang punya banyak langkah sekaligus, kecuali jika dipecah menjadi daftar ceklis aksi tunggal.",
      de: "Ich verliere mehrstufige Anweisungen sofort aus dem Kopf, wenn sie nicht in Einzelschritte zerlegt sind.",
      fr: "J'oublie les consignes en plusieurs étapes si elles ne sont pas découpées en micro-actions immédiates.",
      es: "Me pierdo con instrucciones de múltiples pasos a menos que estén desglosadas en casillas de verificación individuales.",
    },
  },
  // 12. Time Blindness & Urgency Dependence
  {
    id: 12,
    subscale: "time_blindness_urgency_dependence",
    text: {
      en: "I live on a feast-or-famine dopamine cycle: days of zero productivity followed by 18 hours of manic catch-up fueled by panic and caffeine.",
      id: "Aku hidup dalam siklus dopamin ekstrem: berhari-hari nol produktivitas disusul 18 jam maraton kerja membabi-buta karena panik dan kafein.",
      de: "Ich lebe in extremen Zyklen: Tage ohne jeglichen Ertrag, gefolgt von 18-Stunden-Sprints aus purer Panik und Koffein.",
      fr: "Je vis dans des cycles extrêmes : des jours de néant productif suivis de marathons épuisants sous caféine et terreur.",
      es: "Vivo en una montaña rusa de dopamina: días de productividad nula seguidos de maratones de 18 horas impulsados por pánico y cafeína.",
    },
  },
];

export const EXECUTIVE_DYSFUNCTION_RESULTS: ExecutiveDysfunctionResultLevel[] = [
  {
    level: "optimal_executive_flow",
    scoreRange: [0, 8],
    title: {
      en: "Optimal Prefrontal Flow (Healthy Executive Function)",
      id: "Aliran Prefrontal Optimal (Fungsi Eksekutif Sehat)",
      de: "Optimaler Exekutiver Flow (Gesunde Stirnhirnfunktion)",
      fr: "Fonctionnement Exécutif Fluide et Régulé",
      es: "Flujo Ejecutivo Óptimo (Función Prefrontal Saludable)",
    },
    badge: {
      en: "Regulated Prefrontal Circuit",
      id: "Sirkuit Prefrontal Teratur",
      de: "Regulierter Präfrontalkortex",
      fr: "Circuit Régulé",
      es: "Circuito Regulado",
    },
    summary: {
      en: "You possess robust dopamine regulation and intact prefrontal executive functioning. Initiating tasks, managing working memory, and pacing multi-step projects occur with natural ease and without shame.",
      id: "Kamu memiliki regulasi dopamin yang stabil dan fungsi eksekutif prefrontal yang sehat. Memulai tugas, mengelola memori kerja, dan mengatur waktu berjalan secara alami tanpa beban rasa bersalah.",
      de: "Sie verfügen über eine stabile Dopamin-Regulation. Aufgabenbeginn, Arbeitsgedächtnis und Zeitmanagement gelingen Ihnen reibungslos.",
      fr: "Votre régulation dopaminergique est équilibrée. L'initiation des tâches et la gestion du temps s'opèrent avec aisance.",
      es: "Posees una regulación dopaminérgica equilibrada. Iniciar tareas, recordar pasos y gestionar plazos fluye de manera natural.",
    },
    psychology: {
      en: "According to Dr. Russell Barkley's executive model, your working memory, internal self-speech, and hindsight/foresight systems coordinate effectively to translate intention into action without requiring emergency adrenaline.",
      id: "Menurut model Dr. Russell Barkley, sistem memori kerja dan antisipasi masa depanmu bekerja kompak mengubah niat menjadi aksi tanpa butuh sengatan adrenalin darurat.",
      de: "Ihr Gehirn übersetzt Absichten in Handlungen, ohne auf Krisen-Adrenalin angewiesen zu sein.",
      fr: "Votre système exécutif traduit vos intentions en actes sans avoir besoin de carburant d'urgence.",
      es: "Tu corteza prefrontal traduce intenciones en acciones continuas sin depender de crisis de adrenalina.",
    },
    actionProtocol: {
      en: [
        "Continue utilizing structured calendar blocks and high-friction boundaries.",
        "Maintain cognitive vitality with adequate sleep and low glycemic nutrition.",
        "Use audio reflection in Nuju to align weekly strategic intentions.",
      ],
      id: [
        "Pertahankan blok jadwal kerja yang terstruktur.",
        "Jaga vitalitas otak dengan tidur cukup dan nutrisi seimbang.",
        "Gunakan jurnal suara Nuju untuk menata tujuan mingguan.",
      ],
      de: [
        "Behalten Sie bewährte Kalender- und Arbeitsroutinen bei.",
        "Achten Sie auf ausreichend Schlaf für stabile Neurochemie.",
        "Nutzen Sie Nuju zur strategischen Wochenreflexion.",
      ],
      fr: [
        "Conservez vos habitudes de planification par blocs.",
        "Veillez à la qualité de votre sommeil pour entretenir votre clarté mentale.",
        "Utilisez le journal vocal Nuju pour aligner vos priorités.",
      ],
      es: [
        "Mantén tus bloques de tiempo estructurados.",
        "Cuida tu descanso para preservar la química prefrontal.",
        "Usa Nuju para alinear tus prioridades semanales.",
      ],
    },
  },

  {
    level: "mild_activation_friction",
    scoreRange: [9, 16],
    title: {
      en: "Mild Task Activation Friction",
      id: "Gesekan Memulai Tugas Ringan",
      de: "Leichte Anlaufverzögerung",
      fr: "Légère Friction d'Initiation",
      es: "Fricción Leve de Activación",
    },
    badge: {
      en: "Occasional Procrastination",
      id: "Gesekan Fokus Ringan",
      de: "Gelegentliches Zögern",
      fr: "Friction Passagère",
      es: "Fricción Ocasional",
    },
    summary: {
      en: "You experience occasional friction when starting dry, repetitive, or ambiguous tasks. While you generally meet your commitments, boring administrative chores induce noticeable resistance and require conscious effort to overcome.",
      id: "Kamu mengalami hambatan sesekali saat harus memulai tugas monoton atau membosankan. Meski tenggat waktu umumnya terkejar, tugas administratif menuntut energi mental yang cukup menguras.",
      de: "Sie spüren gelegentliche Anlaufschwierigkeiten bei unliebsamen oder monotonen Aufgaben, halten Deadlines aber meist ein.",
      fr: "Vous éprouvez parfois des difficultés à entamer des tâches rébarbatives, même si vous respectez vos engagements.",
      es: "Experimentas cierta resistencia para arrancar tareas aburridas o administrativas, aunque sueles cumplir tus compromisos.",
    },
    psychology: {
      en: "Dr. Thomas Brown explains that executive function is like a conductor of an orchestra. In mild friction, the conductor briefly falls asleep during low-stimulation pieces, requiring external micro-cues to re-engage.",
      id: "Dr. Thomas Brown mengibaratkan fungsi eksekutif seperti konduktor orkestra. Pada gesekan ringan, sang konduktor tertidur sesaat saat musik terasa monoton, butuh pemicu kecil untuk bangun kembali.",
      de: "Bei geringer Reizdichte benötigt das Gehirn kleine Impulse, um die Aufmerksamkeit zu bündeln.",
      fr: "Le cerveau a besoin de micro-stimulations externes pour se mobiliser sur les tâches à faible dopamine.",
      es: "El cerebro necesita pequeños detonantes externos para activar la atención en tareas poco estimulantes.",
    },
    actionProtocol: {
      en: [
        "The 5-Minute Entry Ramp: Tell yourself: 'I only have to work on this for 5 minutes. If I still want to stop, I can.'",
        "Body Doubling: Work alongside a friend, colleague, or virtual coworking room to reduce activation threshold.",
        "Speak Your Next Step in Nuju: Say aloud into Nuju: 'Right now, my only job is to open document X.' Verbalizing collapses task ambiguity.",
      ],
      id: [
        "Jalur Masuk 5 Menit: Katakan pada diri sendiri: 'Aku cuma perlu mengerjakannya selama 5 menit. Kalau masih malas, aku boleh berhenti.'",
        "Teknik Body Doubling: Kerjakan tugas di samping rekan atau ruang coworking untuk menurunkan hambatan mental.",
        "Ucapkan Langkah Pertamamu di Nuju: Bicaralah ke Nuju: 'Tugasku saat ini hanyalah membuka file X.' Mengucapkannya dengan suara meruntuhkan rasa enggan.",
      ],
      de: [
        "5-Minuten-Rampe: Nur 5 Minuten anfangen. Danach ist Aufhören erlaubt.",
        "Body Doubling: In Anwesenheit anderer arbeiten, um die Hemmschwelle zu senken.",
        "Nächsten Schritt in Nuju aussprechen, um Klarheit zu schaffen.",
      ],
      fr: [
        "Règle des 5 minutes : engagez-vous pour 5 minutes seulement.",
        "Pratiquez le 'body doubling' (travailler en présence d'autrui).",
        "Énoncez à voix haute la première micro-action dans Nuju pour briser la paralysie.",
      ],
      es: [
        "Rampa de 5 minutos: comprométete a trabajar solo 5 minutos.",
        "Aplica el 'body doubling' (trabajar junto a otra persona).",
        "Dicta a Nuju tu primer micropaso para vencer la parálisis.",
      ],
    },
  },

  {
    level: "moderate_executive_strain",
    scoreRange: [17, 24],
    title: {
      en: "Moderate Executive Dysfunction & Task Paralysis",
      id: "Disfungsi Eksekutif Sedang & Kelumpuhan Tugas",
      de: "Moderate Exekutive Dysfunktion & Aufgabenlähmung",
      fr: "Dysfonction Exécutive Modérée & Blocage",
      es: "Disfunción Ejecutiva Moderada y Parálisis de Tarea",
    },
    badge: {
      en: "Executive Friction Strain",
      id: "Beban Disfungsi Eksekutif",
      de: "Exekutive Blockade",
      fr: "Charge de Blocage",
      es: "Bloqueo Ejecutivo",
    },
    summary: {
      en: "Task paralysis, time blindness, and working memory leaks are taking a significant toll on your productivity and self-esteem. You rely on last-minute panic to trigger action, cycle through shame, and feel paralyzed by multi-step tasks.",
      id: "Kelumpuhan memulai tugas, time blindness, dan memori kerja yang bocor mulai merusak produktivitas dan kepercayaan dirimu. Kamu bergantung pada panik menit-menit akhir dan menanggung beban rasa malu.",
      de: "Aufgabenlähmung und Zeitblindheit belasten Ihren Alltag erheblich. Sie schieben Dinge auf, bis Panik ausbricht, und fühlen sich schuldig.",
      fr: "Le blocage face aux tâches et la cécité temporelle pèsent lourdement sur votre estime de soi. Vous ne fonctionnez qu'à l'urgence.",
      es: "La parálisis de inicio y la ceguera temporal sabotean tu productividad. Dependes del pánico de última hora y acumulas culpa.",
    },
    psychology: {
      en: "Dr. Russell Barkley emphasizes that executive dysfunction is not an intellectual problem, but an 'intention-to-action' deficit. Your prefrontal cortex struggles with chemical signaling (dopamine and norepinephrine), creating the 'Wall of Awful.'",
      id: "Dr. Russell Barkley menekankan disfungsi eksekutif bukanlah masalah kecerdasan, melainkan gangguan 'niat-menjadi-tindakan' akibat defisit dopamin di korteks prefrontal.",
      de: "Dr. Barkley erklärt: Es ist kein Wissensproblem, sondern ein Problem der Verhaltensumsetzung durch Dopaminmangel.",
      fr: "Il s'agit d'un déficit d'initiation neurochimique (dopamine) et non d'un défaut de volonté.",
      es: "No es un fallo de inteligencia o carácter, sino un déficit neuroquímico que desconecta la intención de la acción.",
    },
    actionProtocol: {
      en: [
        "Dismantle Tasks into 'Stupidly Small' Steps: Instead of 'Clean room', your task is 'Pick up one red sock.'",
        "Externalize Working Memory: Never rely on your brain to hold to-do lists. Put visual cues in your physical eye line.",
        "Decompress Dopamine Shame in Nuju: Speak your frustration into Nuju's encrypted audio journal: 'I am not lazy; my brain is struggling with activation chemical signaling.'",
      ],
      id: [
        "Pecah Tugas Menjadi Langkah Sangat Kecil: Jangan 'Bereskan kamar', tapi 'Ambil satu kaus kaki di lantai.'",
        "Eksternalisasi Memori Kerja: Jangan pernah mengandalkan ingatan kepala. Pasang catatan visual tepat di depan pandangan mata.",
        "Keluarkan Rasa Bersalah di Nuju: Bicaralah ke jurnal suara Nuju: 'Aku bukan pemalas; otakku sedang mengalami defisit neurotransmitter.'",
      ],
      de: [
        "Aufgaben in lächerlich kleine Mikroschritte zerlegen.",
        "Arbeitsgedächtnis externalisieren: Sichtbare Haftnotizen im Blickfeld anbringen.",
        "Entlasten Sie sich im Nuju-Sprachjournal von ungerechtfertigter Scham.",
      ],
      fr: [
        "Découpez les tâches en étapes minuscules (ex: 'ouvrir le document' et non 'rédiger le rapport').",
        "Externalisez la mémoire avec des rappels visuels physiques.",
        "Déchargez votre culpabilité dans Nuju en nommant le blocage dopaminergique.",
      ],
      es: [
        "Desglosa las tareas en micropasos absurdamente pequeños.",
        "Externaliza la memoria con recordatorios visuales físicos en tu campo de visión.",
        "Desahoga la culpa en Nuju recordando que no es pereza, sino química prefrontal.",
      ],
    },
  },

  {
    level: "severe_executive_paralysis",
    scoreRange: [25, 31],
    title: {
      en: "Severe Executive Dysfunction & Dopamine Burnout",
      id: "Disfungsi Eksekutif Berat & Burnout Dopamin",
      de: "Schwere Exekutive Dysfunktion & Dopamin-Burnout",
      fr: "Dysfonction Exécutive Sévère & Épuisement Dopaminergique",
      es: "Disfunción Ejecutiva Severa & Agotamiento Dopaminérgico",
    },
    badge: {
      en: "Severe Task Paralysis",
      id: "Kelumpuhan Tugas Parah",
      de: "Schwere Blockade",
      fr: "Paralysie Sévère",
      es: "Parálisis Severa",
    },
    summary: {
      en: "You are stuck in chronic executive gridlock. Staring at tasks for days without moving, losing critical paperwork, chronic lateness, and severe dopamine depletion dominate your life. The accumulated shame and burnout feel crushing.",
      id: "Kamu terperangkap dalam kemacetan eksekutif kronis. Menatap tugas berhari-hari tanpa bisa bergerak, dokumen penting hilang, terlambat kronis, dan rasa malu yang menumpuk membuatmu kelelahan luar biasa.",
      de: "Sie stecken in einer schweren Blockade fest. Tage vergehen, ohne dass Sie wichtige Dinge anpacken können. Scham und Frustration überwältigen Sie.",
      fr: "Vous êtes enlisé dans un blocage chronique. Des journées entières s'écoulent sans pouvoir agir, sous le poids écrasant de la honte.",
      es: "Estás atrapado en un colapso ejecutivo crónico. Pasan días mirando tareas sin poder avanzar, bajo una carga demoledora de frustración y vergüenza.",
    },
    psychology: {
      en: "This level matches clinical ADHD / Executive Function Deficit Disorder (EFDD). Constant emergency adrenaline bursts have burned out your adrenals and prefrontal receptors, resulting in chronic functional freeze.",
      id: "Tingkat ini mengindikasikan defisit fungsi eksekutif klinis (ADHD/EFDD). Penggunaan adrenalin darurat bertahun-tahun telah memicu functional freeze kronis.",
      de: "Dies entspricht klinischen ADHS-Mustern. Wiederholte Adrenalinschocks haben zu einem chronischen neurobiologischen Erschöpfungszustand geführt.",
      fr: "Ce stade correspond aux profils TDAH sévères : l'usage répété de l'adrénaline d'urgence a provoqué un figement fonctionnel.",
      es: "Refleja un patrón clínico de TDAH/déficit ejecutivo severo. El abuso de la adrenalina de última hora ha derivado en un estado de congelamiento funcional.",
    },
    actionProtocol: {
      en: [
        "Professional ADHD/Executive Evaluation: Consider assessment by a neurodevelopmental psychiatrist for medical scaffolding (stimulant/non-stimulant therapy).",
        "Sensory Task Pairing: Combine boring tasks with high-dopamine sensory inputs (listen to fast instrumental synthwave, use a walking pad, suck on sour candy).",
        "Audio Brain Dumping in Nuju: Speak your chaotic, tangled thoughts into Nuju's zero-knowledge encrypted vault. Let the voice AI synthesize your priorities into clarity.",
      ],
      id: [
        "Evaluasi Profesional ADHD: Pertimbangkan konsultasi psikiatri untuk evaluasi neurodivergen dan dukungan medis yang tepat.",
        "Sensory Task Pairing: Pasangkan tugas membosankan dengan stimulasi sensorik tinggi (musik synthwave cepat, permen asam, treadmill mini).",
        "Brain Dump Suara di Nuju: Tumpahkan benang kusut di kepalamu ke dalam brankas suara aman Nuju untuk mengurai kekacauan pikiran.",
      ],
      de: [
        "Fachärztliche ADHS-Diagnostik in Erwägung ziehen.",
        "Sensorische Koppelung: Langweilige Aufgaben mit schneller Musik oder Bewegung verbinden.",
        "Audio Brain-Dumping in Nuju zur Entwirrung des mentalen Chaos nutzen.",
      ],
      fr: [
        "Consultez un psychiatre pour un bilan TDAH de l'adulte.",
        "Associez les tâches rébarbatives à des stimulations sensorielles stimulantes.",
        "Pratiquez le déversement vocal dans Nuju pour démêler le chaos mental.",
      ],
      es: [
        "Valora una evaluación psiquiátrica especializada en TDAH adulto.",
        "Asocia tareas aburridas con estímulos sensoriales placenteros (música rítmica, movimiento).",
        "Haz un vaciado mental por voz en Nuju para ordenar el caos.",
      ],
    },
  },

  {
    level: "acute_dopaminergic_shutdown",
    scoreRange: [32, 36],
    title: {
      en: "Acute Dopaminergic Shutdown & Prefrontal Collapse",
      id: "Shutdown Dopaminergik Akut & Kolaps Prefrontal",
      de: "Akuter Dopaminerger Shutdown & Präfrontaler Kollaps",
      fr: "Effondrement Exécutif Aigu & Shutdown Dopaminergique",
      es: "Colapso Prefrontal Agudo & Shutdown Dopaminérgico",
    },
    badge: {
      en: "Executive Crisis State",
      id: "Krisis Eksekutif Ekstrem",
      de: "Exekutiver Notstand",
      fr: "Crise Exécutive Aiguë",
      es: "Crisis Ejecutiva Aguda",
    },
    summary: {
      en: "You are experiencing total neurochemical shutdown. Basic survival tasks (feeding yourself, answering urgent calls, bathing, paying rent) feel like lifting a 500-pound barbell. You are not a failure; your nervous system is in complete burnout.",
      id: "Kamu mengalami shutdown neurokimiawi total. Tugas bertahan hidup dasar (makan, membalas panggilan penting, mandi, membayar sewa) terasa seberat mengangkat beban 200 kg. Kamu bukan orang gagal; sistem sarafmu sedang mengalami kolaps energi total.",
      de: "Sie erleben einen totalen exekutiven Shutdown. Selbst Grundbedürfnisse (Essen, Anrufe, Körperpflege) wirken unüberwindbar wie Felsbrocken.",
      fr: "Vous traversez un effondrement exécutif total. Les gestes élémentaires (manger, répondre, se laver) demandent un effort surhumain.",
      es: "Vives un apagón neuroquímico total. Los actos más básicos de supervivencia se sienten como levantar una roca de 200 kilos.",
    },
    psychology: {
      en: "This state represents profound autistic or ADHD burnout combined with chronic sympathetic collapse. Prefrontal dopamine, norepinephrine, and acetylcholine reserves are depleted. Recovery requires radical resting, medical consultation, and removal of shame.",
      id: "Kondisi ini mencerminkan burnout neurodivergen (ADHD/Autistic burnout) akut. Cadangan dopamin dan noradrenalin prefrontal habis total. Pemulihan menuntut istirahat radikal dan bantuan medis profesional.",
      de: "Zustand eines tiefen neurodivergenten Burnouts. Erholung erfordert radikale Entlastung und ärztliche Begleitung.",
      fr: "Épuisement neurodivergent profond : la priorité absolue est le repos radical et le soutien médical bienveillant.",
      es: "Estado de burnout neurodivergente profundo. La recuperación exige descanso radical y apoyo médico sin reproches.",
    },
    actionProtocol: {
      en: [
        "Radical Medical Leave & Support: Involve a trusted friend, family member, or doctor immediately to handle critical logistics.",
        "Zero-Demand Recovery Days: Take 3 days of absolute zero productivity pressure to allow dopamine baseline replenishment.",
        "Emergency Audio Sanctuary in Nuju: Speak your exhausted, fractured truths into Nuju's zero-knowledge encrypted vault without having to formulate coherent sentences.",
      ],
      id: [
        "Minta Bantuan Nyata Segera: Minta bantuan keluarga, sahabat terpercaya, atau dokter untuk mengurus hal-hal darurat.",
        "Hari Pemulihan Tanpa Tuntutan: Ambil 3 hari istirahat total tanpa beban produktivitas agar cadangan dopamin otak terisi kembali.",
        "Ruang Suara Darurat di Nuju: Bicaralah ke brankas suara aman Nuju tanpa perlu menyusun kalimat rapi. Lepaskan seluruh kelelahan jiwamu.",
      ],
      de: [
        "Dringende Entlastung und ärztliche Unterstützung organisieren.",
        "Radikale Erholungstage ohne jeden Leistungsanspruch einlegen.",
        "Nutzen Sie Nuju als urteilsfreien Raum für Ihre Erschöpfung.",
      ],
      fr: [
        "Sollicitez immédiatement l'aide d'un proche ou d'un soignant pour gérer l'urgence.",
        "Accordez-vous des journées sans aucune exigence de productivité.",
        "Déposez vos paroles fragmentées dans le sanctuaire vocal Nuju.",
      ],
      es: [
        "Pide ayuda inmediata a alguien de confianza o a un profesional médico.",
        "Tómate días de descanso radical sin ninguna exigencia.",
        "Habla en el santuario seguro de Nuju para soltar el agotamiento sin filtros.",
      ],
    },
  },
];

export const EXECUTIVE_DYSFUNCTION_OPTIONS = [
  {
    value: 0,
    label: {
      en: "Never / Rarely (0 pts)",
      id: "Tidak Pernah / Jarang (0 poin)",
      de: "Nie / Selten (0 Pkt.)",
      fr: "Jamais / Rarement (0 pt)",
      es: "Nunca / Raras veces (0 pts)",
    },
  },
  {
    value: 1,
    label: {
      en: "Sometimes / Mildly (1 pt)",
      id: "Kadang-kadang / Ringan (1 poin)",
      de: "Manchmal / Leicht (1 Pkt.)",
      fr: "Parfois / Légèrement (1 pt)",
      es: "A veces / Levemente (1 pt)",
    },
  },
  {
    value: 2,
    label: {
      en: "Often / Moderately (2 pts)",
      id: "Sering / Cukup Mengganggu (2 poin)",
      de: "Oft / Mäßig störend (2 Pkt.)",
      fr: "Souvent / Modérément (2 pts)",
      es: "A menudo / Moderadamente (2 pts)",
    },
  },
  {
    value: 3,
    label: {
      en: "Almost Constantly / Severely (3 pts)",
      id: "Hampir Selalu / Sangat Menyiksa (3 poin)",
      de: "Fast ständig / Quälend (3 Pkt.)",
      fr: "Presque constamment / Sévère (3 pts)",
      es: "Casi constantemente / Severo (3 pts)",
    },
  },
];

export const EXECUTIVE_DYSFUNCTION_SUBSCALE_INFO = {
  task_initiation_activation_barrier: {
    name: {
      en: "Task Initiation & Activation Barrier",
      id: "Hambatan Memulai Tugas & Dinding Tak Kasat Mata",
      de: "Aufgabeninitiierung & Anlaufbarriere",
      fr: "Barrière d'Initiation & Blocage",
      es: "Barrera de Activación e Inicio",
    },
    description: {
      en: "The invisible neurological wall preventing you from starting simple tasks despite wanting to.",
      id: "Dinding saraf tak kasat mata yang menghalangi memulai tugas meski sangat ingin mengerjakannya.",
      de: "Die unsichtbare Barriere, die das Beginnen selbst einfacher Aufgaben blockiert.",
      fr: "Le mur invisible qui empêche de démarrer malgré la volonté d'agir.",
      es: "El muro invisible que bloquea el inicio de las tareas a pesar de desear hacerlas.",
    },
  },
  working_memory_object_impermanence: {
    name: {
      en: "Working Memory & Object Impermanence",
      id: "Memori Kerja & Hilang dari Pandangan",
      de: "Arbeitsgedächtnis & Objektpermanenz",
      fr: "Mémoire de Travail & Permanence de l'Objet",
      es: "Memoria de Trabajo y Permanencia de Objeto",
    },
    description: {
      en: "Out-of-sight-out-of-mind deficits, opening tabs and forgetting why, and severe distraction costs.",
      id: "Hilang dari mata hilang dari pikiran, lupa tujuan membuka aplikasi, dan beratnya kembali fokus saat diinterupsi.",
      de: "Aus den Augen, aus dem Sinn; plötzlicher Fadenriss und hohe Unterbrechungskosten.",
      fr: "Oubli immédiat de ce qui est hors de vue et coût mental énorme des interruptions.",
      es: "Falta de retención de lo que no está a la vista y dificultad para retomar el hilo tras interrupciones.",
    },
  },
  time_blindness_urgency_dependence: {
    name: {
      en: "Time Blindness & Urgency Dependence",
      id: "Kebutaan Waktu & Ketergantungan Adrenalin Darurat",
      de: "Zeitblindheit & Abhängigkeit von Notfall-Druck",
      fr: "Cécité Temporelle & Dépendance à l'Urgence",
      es: "Ceguera Temporal y Dependencia de la Urgencia",
    },
    description: {
      en: "Only recognizing 'Now' vs 'Not Now', chronical underestimation of time, and hyperfocus lock-in.",
      id: "Hanya mengenali waktu 'Sekarang' vs 'Belum Nanti', sering terlambat, dan ketergantungan pada panik deadline.",
      de: "Unfähigkeit, Zeitverläufe ohne Panikdruck einzuschätzen; Schwierigkeit, Hyperfokus zu verlassen.",
      fr: "Incapacité à percevoir le temps sans panique et blocage dans l'hyperfocus.",
      es: "Dificultad para percibir el paso del tiempo sin crisis y dependencia del pánico del plazo.",
    },
  },
};

export function getExecutiveDysfunctionResult(totalScore: number): ExecutiveDysfunctionResultLevel {
  const clamped = Math.max(0, Math.min(36, totalScore));
  return (
    EXECUTIVE_DYSFUNCTION_RESULTS.find(
      (r) => clamped >= r.scoreRange[0] && clamped <= r.scoreRange[1]
    ) || EXECUTIVE_DYSFUNCTION_RESULTS[0]
  );
}

export function calculateExecutiveDysfunctionSubscales(answers: Record<number, number>): {
  task_initiation_activation_barrier: number;
  working_memory_object_impermanence: number;
  time_blindness_urgency_dependence: number;
} {
  let t = 0;
  let w = 0;
  let u = 0;

  EXECUTIVE_DYSFUNCTION_QUESTIONS.forEach((q) => {
    const score = answers[q.id] ?? 0;
    if (q.subscale === "task_initiation_activation_barrier") t += score;
    if (q.subscale === "working_memory_object_impermanence") w += score;
    if (q.subscale === "time_blindness_urgency_dependence") u += score;
  });

  return {
    task_initiation_activation_barrier: t,
    working_memory_object_impermanence: w,
    time_blindness_urgency_dependence: u,
  };
}
