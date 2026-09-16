export type AdhdLanguage = "en" | "id" | "de" | "fr" | "es";

export interface AdhdQuestion {
  id: number;
  part: "A" | "B"; // Part A = Core ASRS v1.1 screening, Part B = Executive & Dopamine fatigue
  text: Record<AdhdLanguage, string>;
  category: "inattention" | "hyperactivity" | "dopamine_fatigue";
}

export interface AdhdOption {
  value: number; // 0 = Never, 1 = Rarely, 2 = Sometimes, 3 = Often, 4 = Very Often
  label: Record<AdhdLanguage, string>;
}

export const ADHD_OPTIONS: AdhdOption[] = [
  {
    value: 0,
    label: {
      en: "Never",
      id: "Tidak Pernah",
      de: "Nie",
      fr: "Jamais",
      es: "Nunca",
    },
  },
  {
    value: 1,
    label: {
      en: "Rarely",
      id: "Jarang",
      de: "Selten",
      fr: "Rarement",
      es: "Raramente",
    },
  },
  {
    value: 2,
    label: {
      en: "Sometimes",
      id: "Kadang-kadang",
      de: "Manchmal",
      fr: "Parfois",
      es: "A veces",
    },
  },
  {
    value: 3,
    label: {
      en: "Often",
      id: "Sering",
      de: "Oft",
      fr: "Souvent",
      es: "A menudo",
    },
  },
  {
    value: 4,
    label: {
      en: "Very Often",
      id: "Sangat Sering",
      de: "Sehr oft",
      fr: "Très souvent",
      es: "Muy a menudo",
    },
  },
];

export const ADHD_QUESTIONS: AdhdQuestion[] = [
  // PART A: Core Inattention & Focus
  {
    id: 1,
    part: "A",
    category: "inattention",
    text: {
      en: "How often do you have trouble wrapping up the final details of a project once the challenging parts have been done?",
      id: "Seberapa sering Anda kesulitan menyelesaikan detail akhir suatu tugas setelah bagian menantangnya selesai?",
      de: "Wie oft haben Sie Schwierigkeiten, die letzten Details eines Projekts zu beenden, nachdem die kniffligen Teile erledigt sind?",
      fr: "À quelle fréquence avez-vous du mal à finaliser les détails d'un projet une fois les parties stimulantes terminées ?",
      es: "¿Con qué frecuencia le cuesta rematar los detalles finales de un proyecto una vez superadas las partes más difíciles?",
    },
  },
  {
    id: 2,
    part: "A",
    category: "inattention",
    text: {
      en: "How often do you find it hard to get things in order when you have to do a task that requires organization?",
      id: "Seberapa sering Anda merasa sulit mengatur alur kerja ketika harus mengerjakan tugas yang butuh perencanaan?",
      de: "Wie oft fällt es Ihnen schwer, Ordnung zu schaffen, wenn Sie eine Aufgabe organisieren müssen?",
      fr: "À quelle fréquence avez-vous du mal à vous organiser pour une tâche nécessitant de la méthode ?",
      es: "¿Con qué frecuencia le resulta difícil ordenar las cosas cuando debe realizar una tarea organizativa?",
    },
  },
  {
    id: 3,
    part: "A",
    category: "inattention",
    text: {
      en: "How often do you have problems remembering appointments, deadlines, or daily obligations?",
      id: "Seberapa sering Anda lupa janji temu, tenggat waktu (deadline), atau kewajiban harian?",
      de: "Wie oft vergessen Sie Termine, Fristen oder alltägliche Verpflichtungen?",
      fr: "À quelle fréquence oubliez-vous des rendez-vous, des échéances ou vos engagements quotidiens ?",
      es: "¿Con qué frecuencia tiene problemas para recordar citas, fechas límite u obligaciones diarias?",
    },
  },
  {
    id: 4,
    part: "A",
    category: "inattention",
    text: {
      en: "When you have a task that requires a lot of sustained mental effort, how often do you avoid or delay getting started?",
      id: "Ketika ada tugas yang menuntut konsentrasi mental mendalam, seberapa sering Anda menunda-nunda memulainya?",
      de: "Wenn eine Aufgabe viel geistige Anstrengung erfordert, wie oft schieben Sie den Beginn auf (Prokrastination)?",
      fr: "Face à une tâche exigeant un effort mental soutenu, à quelle fréquence évitez-vous ou repoussez-vous le début ?",
      es: "Ante una tarea que exige un esfuerzo mental sostenido, ¿con qué frecuencia posterga o evita empezar?",
    },
  },

  // PART A: Hyperactivity & Restlessness
  {
    id: 5,
    part: "A",
    category: "hyperactivity",
    text: {
      en: "How often do you fidget or squirm with your hands or feet when you have to sit down for a long time?",
      id: "Seberapa sering Anda gelisah, memainkan tangan atau kaki saat harus duduk diam dalam waktu lama?",
      de: "Wie oft zappeln Sie mit Händen oder Füßen, wenn Sie längere Zeit ruhig sitzen müssen?",
      fr: "À quelle fréquence remuez-vous les mains ou les pieds lorsque vous devez rester assis longtemps ?",
      es: "¿Con qué frecuencia juguetea con las manos o mueve los pies cuando debe permanecer sentado mucho tiempo?",
    },
  },
  {
    id: 6,
    part: "A",
    category: "hyperactivity",
    text: {
      en: "How often do you feel overly active and compelled to do things, as if driven by an inner motor?",
      id: "Seberapa sering Anda merasa terlalu aktif atau terdorong melakukan sesuatu seolah digerakkan oleh motor mesin di dalam diri?",
      de: "Wie oft fühlen Sie sich innerlich unruhig oder angetrieben, als wären Sie von einem Motor gesteuert?",
      fr: "À quelle fréquence vous sentez-vous hyperactif(ve) ou poussé(e) à agir comme animé(e) par un moteur intérieur ?",
      es: "¿Con qué frecuencia se siente excesivamente activo(a), impulsado(a) como si tuviera un motor interno?",
    },
  },

  // PART B: Dopamine Fatigue, Phone Addiction & Executive Overload
  {
    id: 7,
    part: "B",
    category: "dopamine_fatigue",
    text: {
      en: "How often do you feel an irresistible urge to check your phone or switch browser tabs when a task gets slightly boring or difficult?",
      id: "Seberapa sering Anda terdorong membuka HP atau berpindah tab browser segera saat tugas terasa sedikit membosankan?",
      de: "Wie oft verspüren Sie den Drang, aufs Smartphone zu schauen oder Tabs zu wechseln, sobald eine Aufgabe eintönig wird?",
      fr: "À quelle fréquence ressentez-vous le besoin irrépressible de consulter votre téléphone dès qu'une tâche devient monotone ?",
      es: "¿Con qué frecuencia siente la necesidad compulsiva de mirar el móvil o cambiar de pestaña cuando una tarea se vuelve aburrida?",
    },
  },
  {
    id: 8,
    part: "B",
    category: "dopamine_fatigue",
    text: {
      en: "How often do you experience 'brain fog' where you feel mentally exhausted despite not having completed much physical work?",
      id: "Seberapa sering Anda mengalami 'brain fog' (kabut otak) atau lelah mental berlebih padahal belum banyak beraktivitas fisik?",
      de: "Wie oft erleben Sie 'Gehirnnebel' (Brain Fog) und geistige Erschöpfung, ohne körperlich schwer gearbeitet zu haben?",
      fr: "À quelle fréquence ressentez-vous un 'brouillard mental' et un épuisement cognitif sans effort physique intense ?",
      es: "¿Con qué frecuencia experimenta 'niebla mental' y cansancio cognitivo sin haber realizado esfuerzo físico real?",
    },
  },
  {
    id: 9,
    part: "B",
    category: "inattention",
    text: {
      en: "How often do you lose track of time while hyperfocusing on a non-priority interest (like researching random topics or scrolling)?",
      id: "Seberapa sering Anda lupa waktu karena terjebak 'hyperfocus' pada hal non-prioritas (misal scrolling atau riset topik acak)?",
      de: "Wie oft verlieren Sie jedes Zeitgefühl, während Sie sich in nebensächliche Themen vertiefen (Hyperfokus)?",
      fr: "À quelle fréquence perdez-vous la notion du temps en hyperfocalisant sur une activité secondaire (recherches futiles, réseaux) ?",
      es: "¿Con qué frecuencia pierde la noción del tiempo por hiperconcentrarse en actividades no prioritarias o navegación?",
    },
  },
  {
    id: 10,
    part: "B",
    category: "hyperactivity",
    text: {
      en: "How often do you find yourself interrupting people or finishing their sentences before they have finished speaking?",
      id: "Seberapa sering Anda memotong pembicaraan orang lain atau menyelesaikan kalimat mereka sebelum mereka selesai bicara?",
      de: "Wie oft unterbrechen Sie andere im Gespräch oder beenden deren Sätze, bevor sie ausgeredet haben?",
      fr: "À quelle fréquence interrompez-vous vos interlocuteurs ou finissez-vous leurs phrases avant qu'ils n'aient terminé ?",
      es: "¿Con qué frecuencia interrumpe a los demás o termina sus frases antes de que hayan concluido?",
    },
  },
  {
    id: 11,
    part: "B",
    category: "dopamine_fatigue",
    text: {
      en: "How often do you feel completely unmotivated to start ordinary daily routines unless there is extreme urgency or deadline panic?",
      id: "Seberapa sering Anda merasa sama sekali tidak punya motivasi kecuali ada kepanikan deadline atau situasi darurat?",
      de: "Wie oft fehlt Ihnen jeglicher Antrieb für Routineaufgaben, es sei denn, es herrscht akute Fristpanik?",
      fr: "À quelle fréquence manquez-vous totalement de motivation sauf en cas d'urgence absolue ou de panique de dernière minute ?",
      es: "¿Con qué frecuencia carece de motivación para tareas habituales a menos que exista una urgencia extrema o pánico?",
    },
  },
  {
    id: 12,
    part: "B",
    category: "dopamine_fatigue",
    text: {
      en: "How often do you start multiple exciting projects simultaneously, only to abandon them halfway through?",
      id: "Seberapa sering Anda memulai banyak proyek menarik sekaligus, namun meninggalkannya terbengkalai di tengah jalan?",
      de: "Wie oft starten Sie mehrere begeisternde Projekte gleichzeitig, nur um sie dann unvollendet liegenzulassen?",
      fr: "À quelle fréquence lancez-vous plusieurs projets stimulants à la fois pour finalement les abandonner à mi-chemin ?",
      es: "¿Con qué frecuencia inicia múltiples proyectos apasionantes a la vez para luego abandonarlos a mitad de camino?",
    },
  },
];

export interface AdhdResultProfile {
  level: "low" | "mild" | "moderate" | "high";
  title: Record<AdhdLanguage, string>;
  headline: Record<AdhdLanguage, string>;
  description: Record<AdhdLanguage, string>;
  dopamineState: Record<AdhdLanguage, string>;
  strategies: Record<AdhdLanguage, string[]>;
  recommendedTool: {
    name: string;
    path: string;
    actionText: Record<AdhdLanguage, string>;
  };
}

export const ADHD_RESULT_PROFILES: Record<string, AdhdResultProfile> = {
  low: {
    level: "low",
    title: {
      en: "Optimal Executive Flow (Low Probability)",
      id: "Fungsi Eksekutif Optimal (Risiko Rendah)",
      de: "Optimaler exekutiver Fluss (Geringe Wahrscheinlichkeit)",
      fr: "Fonctionnement exécutif optimal (Faible probabilité)",
      es: "Flujo ejecutivo óptimo (Baja probabilidad)",
    },
    headline: {
      en: "Your attention regulation and dopamine baseline are steady.",
      id: "Regulasi atensi dan baseline dopamin Anda dalam kondisi stabil.",
      de: "Ihre Aufmerksamkeitssteuerung und Ihr Dopamin-Haushalt sind stabil.",
      fr: "Votre régulation attentionnelle et vos niveaux de dopamine sont équilibrés.",
      es: "Su regulación de la atención y su línea base de dopamina están equilibradas.",
    },
    description: {
      en: "Your responses suggest standard neurotypical attention control. You may experience occasional distraction under high fatigue or stress, but you possess healthy executive prioritization.",
      id: "Hasil Anda menunjukkan kontrol atensi yang sehat. Anda mungkin sesekali terdistraksi saat lelah atau stres, namun secara umum mampu mengelola fokus dan tanggung jawab harian dengan baik.",
      de: "Ihre Antworten weisen auf eine gesunde Aufmerksamkeitskontrolle hin. Ablenkungen treten meist nur bei starker Müdigkeit oder chronischem Stress auf.",
      fr: "Vos réponses indiquent un contrôle attentionnel sain. Les baisses de concentration sont principalement liées à la fatigue ponctuelle.",
      es: "Sus respuestas reflejan un control atencional saludable. Las distracciones ocasionales se deben a fatiga normal o estrés pasajero.",
    },
    dopamineState: {
      en: "Balanced Dopamine Receptor Sensitivity: Easy transition between tasks without compulsive digital escapes.",
      id: "Sensitivitas Reseptor Dopamin Seimbang: Mampu berpindah tugas tanpa pelarian impulsif ke gawai.",
      de: "Ausgeglichene Dopaminsensitivität: Gesunder Wechsel zwischen Aufgaben ohne digitale Flucht.",
      fr: "Sensibilité dopaminergique équilibrée : transitions fluides sans échappatoire numérique compulsive.",
      es: "Sensibilidad dopaminérgica equilibrada: transiciones fluidas entre tareas sin escape digital compulsivo.",
    },
    strategies: {
      en: [
        "Maintain circadian rhythm: get 10-15 minutes of natural morning sunlight within 1 hour of waking.",
        "Practice single-tasking during deep work blocks to protect your sustained attention span.",
        "Use Ju's Sound Sanctuary with 528Hz or Brown Noise to enter flow states effortlessly.",
      ],
      id: [
        "Jaga ritme sirkadian: dapatkan sinar matahari pagi 10-15 menit dalam 1 jam pertama setelah bangun.",
        "Terapkan teknik single-tasking (fokus satu hal) untuk menjaga ketajaman konsentrasi.",
        "Gunakan Ju's Sound Sanctuary dengan Brown Noise untuk masuk ke kondisi flow kerja mendalam.",
      ],
      de: [
        "Morgenlicht tanken: 10-15 Minuten Sonnenlicht innerhalb der ersten Stunde nach dem Aufstehen.",
        "Single-Tasking priorisieren: Tiefenarbeitsphasen ohne parallele Chats schützen.",
        "Nutzen Sie die Sound Sanctuary mit Brown Noise für mühelosen Arbeitsfokus.",
      ],
      fr: [
        "Exposition lumineuse matinale : 10 à 15 minutes de lumière du jour dès le réveil.",
        "Privilégiez le monotâche pour préserver votre endurance cognitive.",
        "Utilisez le Sanctuaire Sonore Ju avec du bruit brun pour vos sessions d'immersion.",
      ],
      es: [
        "Aproveche la luz natural matutina durante 10-15 minutos tras despertarse.",
        "Practique la monotarea durante sus bloques de trabajo profundo.",
        "Utilice el Santuario Sonoro Ju con ruido marrón para entrar en estado de flujo.",
      ],
    },
    recommendedTool: {
      name: "Sound Sanctuary",
      path: "/soundscapes",
      actionText: {
        en: "Try ADHD Focus Soundscapes",
        id: "Coba Soundscape Fokus Ju",
        de: "Fokus-Soundscape starten",
        fr: "Lancer le Sanctuaire Sonore",
        es: "Probar Sonidos de Enfoque",
      },
    },
  },
  mild: {
    level: "mild",
    title: {
      en: "Mild Dopamine Fatigue & Digital Friction",
      id: "Kelelahan Dopamin Ringan & Distraksi Digital",
      de: "Leichte Dopamin-Ermüdung & Reizüberflutung",
      fr: "Fatigue dopaminergique légère et dispersion",
      es: "Fatiga dopaminérgica leve y fricción digital",
    },
    headline: {
      en: "Your brain is signaling mild sensory overload and dopamine resistance.",
      id: "Otak Anda mulai menunjukkan tanda kelelahan sensorik dan resistensi dopamin.",
      de: "Ihr Gehirn signalisiert beginnende Reizüberflutung und digitale Erschöpfung.",
      fr: "Votre cerveau montre des signes de surstimulation sensorielle et de fatigue numérique.",
      es: "Su cerebro muestra señales de sobrecarga sensorial y fatiga digital.",
    },
    description: {
      en: "You are experiencing modern digital attention residue. Constant notifications, short-form video consumption, and context-switching have lowered your frustration tolerance for low-stimulation tasks.",
      id: "Anda mengalami 'attention residue' akibat ritme digital modern. Notifikasi konstan, video pendek, dan perpindahan tugas cepat telah menurunkan daya tahan fokus Anda pada tugas yang butuh kesabaran.",
      de: "Sie leiden unter digitaler Aufmerksamkeitszersplitterung. Kurzv Videos, ständige Benachrichtigungen und Multitasking senken Ihre Reizschwelle für ruhige Tätigkeiten.",
      fr: "Vous subissez la dispersion attentionnelle moderne. Les notifications continues et le zapping réduisent votre tolérance aux tâches calmes.",
      es: "Experimenta la fragmentación digital moderna. Las notificaciones y el contenido breve reducen su paciencia ante tareas prolongadas.",
    },
    dopamineState: {
      en: "Mild Desensitization: You find low-stimulation beginnings difficult and crave quick dopamine hits.",
      id: "Desensitisasi Ringan: Memulai tugas biasa terasa berat dan Anda secara otomatis mendambakan rangsangan instan gawai.",
      de: "Leichte Desensibilisierung: Einstieg in monotone Aufgaben fällt schwer; Verlangen nach rascher Stimulation.",
      fr: "Désensibilisation modérée : début de tâche ardu, recherche de gratification rapide.",
      es: "Desensibilización leve: inicio de tareas arduo con búsqueda de recompensas instantáneas.",
    },
    strategies: {
      en: [
        "Implement a 30-Minute Low-Dopamine Morning: No phone browsing or social media until after breakfast.",
        "Adopt the '2-Minute Initiation Rule': Commit to working on a boring task for only 120 seconds before allowing a pause.",
        "Use Ju's Zen Bubble game or mindful breathing to release physical tension when feeling restless.",
      ],
      id: [
        "Terapkan 'Low-Dopamine Morning' 30 Menit: Jangan sentuh media sosial atau video pendek sampai sarapan selesai.",
        "Gunakan 'Aturan Memulai 2 Menit': Cukup komitmen kerjakan tugas sulit selama 120 detik pertama.",
        "Gunakan game Zen Bubble atau latihan napas untuk melepaskan kegelisahan fisik saat sulit fokus.",
      ],
      de: [
        "30 Minuten reizarmer Morgen: Kein Social Media oder News-Scraping vor dem Frühstück.",
        "2-Minuten-Anfangsregel: Verpflichten Sie sich, eine schwierige Aufgabe nur für 120 Sekunden anzufangen.",
        "Spielen Sie das Zen-Bubble-Achtsamkeitsspiel zur gezielten Entlastung des Nervensystems.",
      ],
      fr: [
        "Matinée sans dopamine rapide : aucun réseau social avant le premier repas.",
        "Règle des 2 minutes : engagez-vous à démarrer une tâche rébarbative pendant seulement 120 secondes.",
        "Testez le jeu Zen Bubble pour calmer l'agitation mentale et physique.",
      ],
      es: [
        "Mañana baja en dopamina: cero redes sociales antes del desayuno.",
        "Regla de los 2 minutos: comprométase a comenzar una tarea difícil por solo 120 segundos.",
        "Use el juego Zen Bubble para liberar tensión física y serenar la mente.",
      ],
    },
    recommendedTool: {
      name: "Zen Bubble Popper",
      path: "/game/zen-pop",
      actionText: {
        en: "Play Zen Bubble Popper",
        id: "Mainkan Zen Bubble Popper",
        de: "Zen-Bubble Spiel starten",
        fr: "Jouer au jeu Zen Bubble",
        es: "Jugar a Zen Bubble",
      },
    },
  },
  moderate: {
    level: "moderate",
    title: {
      en: "Moderate ADHD Tendencies & Executive Dysfunction",
      id: "Kecenderungan ADHD Sedang & Disfungsi Eksekutif",
      de: "Mäßige ADHS-Tendenzen & Exekutive Dysfunktion",
      fr: "Tendances TDAH modérées & Dysfonction exécutive",
      es: "Tendencias TDAH moderadas y disfunción ejecutiva",
    },
    headline: {
      en: "Significant executive friction detected across attention sustainment and task completion.",
      id: "Terdeteksi hambatan eksekutif nyata dalam mempertahankan fokus dan menyelesaikan tugas.",
      de: "Deutliche exekutive Reibung bei Ausdauer, Zeitgefühl und Aufgabenabschluss festgestellt.",
      fr: "Friction exécutive notable observée sur l'endurance et l'achèvement des projets.",
      es: "Fricción ejecutiva apreciable en el mantenimiento del foco y la finalización de tareas.",
    },
    description: {
      en: "Your scores reflect notable patterns of adult inattention, restlessness, and executive delay. You likely experience intense bursts of hyperfocus alternating with periods of paralysis where starting even simple tasks feels overwhelming.",
      id: "Skor Anda menunjukkan pola atensi orang dewasa yang terpecah, kegelisahan, dan prokrastinasi eksekutif. Anda sering mengalami ledakan fokus intens (hyperfocus) bergantian dengan fase 'paralisis' di mana memulai tugas terasa sangat berat.",
      de: "Ihre Ergebnisse zeigen typische Muster von Aufmerksamkeitsdefiziten und innerer Getriebenheit. Vermutlich wechseln sich intensive Hyperfokus-Phasen mit Phasen von Handlungsblockaden ab.",
      fr: "Vos résultats mettent en évidence des motifs d'inattention et d'impulsivité. Vous alternez probablement entre hyperfocalisation intense et blocage devant les tâches simples.",
      es: "Sus resultados reflejan patrones de inatención y desasosiego. Es muy común la alternancia entre hiperfoco y parálisis ejecutiva.",
    },
    dopamineState: {
      en: "Dopamine Hunger: Your nervous system requires high novelty or immediate urgency to initiate action.",
      id: "Dopamine Hunger (Lapar Dopamin): Sistem saraf Anda butuh stimulasi hal baru atau urgensi tenggat waktu ekstrem untuk bisa bergerak.",
      de: "Dopamin-Defizit-Signal: Ihr Nervensystem verlangt extreme Neuartigkeit oder Zeitdruck, um in die Gänge zu kommen.",
      fr: "Faim dopaminergique : besoin constant de nouveauté ou d'urgence pour enclencher l'action.",
      es: "Apetito dopaminérgico: necesidad de novedad o urgencia extrema para activar la acción.",
    },
    strategies: {
      en: [
        "Body Doubling: Work alongside another person, ambient video stream, or collaborative timer.",
        "Externalize Working Memory: Never keep to-do lists in your head. Write down the immediate 'Next 1 Micro-Action'.",
        "Dopamine Micro-Rewards: Pair dull tasks with sensory pleasures (e.g., listening to Brown Noise or a pleasant beverage).",
        "Consider discussing these findings with a licensed psychologist or psychiatrist specializing in adult ADHD.",
      ],
      id: [
        "Body Doubling: Kerjakan tugas bersama rekan kerja, live focus stream, atau timer terstruktur.",
        "Eksternalisasi Memori Kerja: Jangan simpan to-do list di kepala. Tulis hanya '1 Langkah Mikro Berikutnya' di kertas.",
        "Dopamine Pairing: Pasangkan tugas membosankan dengan stimulasi sensorik positif (seperti Brown Noise atau minuman favorit).",
        "Pertimbangkan berkonsultasi dengan psikolog klinis atau psikiater untuk evaluasi komprehensif.",
      ],
      de: [
        "Body-Doubling nutzen: Gemeinsam mit Kollegen oder virtuellen Fokus-Räumen arbeiten.",
        "Arbeitsgedächtnis entlasten: To-Dos niemals im Kopf behalten; stets den nächsten Einzelschritt notieren.",
        "Dopamin-Kopplung: Öde Aufgaben mit angenehmen sensorischen Reizen (z.B. Brown Noise) kombinieren.",
        "Erwägen Sie ein Beratungsgespräch mit einem auf adultes ADHS spezialisierten Arzt oder Psychologen.",
      ],
      fr: [
        "Effet miroir (Body Doubling) : travaillez en présence d'un tiers ou d'une vidéo d'étude.",
        "Externalisez la mémoire de travail : notez immédiatement la toute prochaine micro-action.",
        "Associez les tâches rébarbatives à un soutien sensoriel doux (bruit brun ou thé chaud).",
        "Envisagez une consultation auprès d'un professionnel de santé spécialisé dans le TDAH adulte.",
      ],
      es: [
        "Efecto espejo (Body Doubling): trabaje junto a un compañero o temporizador colaborativo.",
        "Externalice la memoria de trabajo: anote en papel la próxima microacción inmediata.",
        "Emparejamiento sensorial: combine tareas monótonas con ruido marrón o una infusión agradable.",
        "Considere una consulta orientativa con un especialista en TDAH en adultos.",
      ],
    },
    recommendedTool: {
      name: "DASS-21 Mental Health Screener",
      path: "/quiz/mental-health-test",
      actionText: {
        en: "Take Free DASS-21 Test",
        id: "Ambil Tes DASS-21 Lengkap",
        de: "DASS-21 Selbsttest machen",
        fr: "Faire le Test DASS-21",
        es: "Hacer el Test DASS-21",
      },
    },
  },
  high: {
    level: "high",
    title: {
      en: "High Probability Adult ADHD & Dopamine Burnout",
      id: "Indikasi Tinggi ADHD Dewasa & Dopamine Burnout",
      de: "Hohe Wahrscheinlichkeit für adultes ADHS & Dopamin-Burnout",
      fr: "Forte probabilité de TDAH adulte & Épuisement dopaminergique",
      es: "Alta probabilidad de TDAH en adultos y agotamiento dopaminérgico",
    },
    headline: {
      en: "Your scores strongly align with clinical WHO ASRS v1.1 criteria for adult ADHD.",
      id: "Skor Anda sangat sejalan dengan kriteria klinis skrining ADHD dewasa WHO ASRS v1.1.",
      de: "Ihre Ergebnisse stimmen signifikant mit den Kriterien des WHO ASRS v1.1 für ADHS im Erwachsenenalter überein.",
      fr: "Vos scores correspondent étroitement aux critères de dépistage OMS ASRS v1.1 pour le TDAH adulte.",
      es: "Sus puntuaciones coinciden estrechamente con los criterios de cribado OMS ASRS v1.1 para TDAH en adultos.",
    },
    description: {
      en: "You are dealing with pervasive executive dysfunction, acute dopamine depletion, and persistent challenges with focus, emotional regulation, and task inertia. This is a neurobiological wiring difference, not a failure of character or willpower.",
      id: "Anda menghadapi disfungsi eksekutif intensif, defisit dopamin, serta tantangan kronis dalam fokus, regulasi emosi, dan memulai tugas. Ini adalah perbedaan sirkuit neurobiologis, BUKAN kelemahan karakter atau kemalasan.",
      de: "Sie erleben gravierende exekutive Blockaden, chronische Dopamin-Erschöpfung und anhaltende Reizfilterschwäche. Dies ist eine neurobiologische Veranlagung - keine Frage von mangelnder Willenskraft.",
      fr: "Vous faites face à une dysfonction exécutive marquée et un épuisement dopaminergique sévère. Il s'agit d'une spécificité neurobiologique, et aucunement d'un manque de volonté.",
      es: "Afronta una disfunción ejecutiva importante y agotamiento dopaminérgico marcado. Se trata de una característica neurobiológica, no de pereza ni falta de voluntad.",
    },
    dopamineState: {
      en: "Acute Dopamine Exhaustion: Deep inertia, frequent paralysis before important tasks, and rapid burnout from over-masking.",
      id: "Kelelahan Dopamin Akut: Inersia berat, sering merasa 'lumpuh' sebelum tugas penting, dan burnout akibat memaksakan diri tampil normal (masking).",
      de: "Akute Dopamin-Erschöpfung: Schwere Handlungsunfähigkeit vor Terminen und rascher Burnout durch chronisches Masking.",
      fr: "Épuisement dopaminergique aigu : inertie pesante et épuisement rapide lié à la compensation constante.",
      es: "Agotamiento dopaminérgico agudo: inercia severa, parálisis ante tareas cruciales y sobreesfuerzo constante.",
    },
    strategies: {
      en: [
        "Professional Evaluation: We strongly encourage scheduling an appointment with a neurodevelopmental psychologist or psychiatrist.",
        "Radical De-Cluttering: Remove visual chaos from your primary workspace to reduce cognitive micro-fatigue.",
        "Time-Blindness Hacks: Use analog timers, visual countdown clocks, and alarms set 10 minutes prior to transitions.",
        "Non-Sleep Deep Rest (NSDR): Use 10-20 minutes of guided body scan or Ju's Sound Sanctuary to reset your autonomic nervous system daily.",
      ],
      id: [
        "Konsultasi Profesional: Kami sangat menyarankan konsultasi dengan psikolog klinis atau psikiater untuk asesmen resmi.",
        "Radical De-Cluttering: Bersihkan meja kerja dari barang-barang berserakan untuk memangkas 'kelelahan kognitif mikro'.",
        "Atasi Time-Blindness (Buta Waktu): Gunakan timer visual fisik atau alarm 10 menit sebelum pergantian aktivitas.",
        "Non-Sleep Deep Rest (NSDR): Dengarkan audio relaksasi atau Ju's Sound Sanctuary selama 15 menit untuk merestart sistem saraf.",
      ],
      de: [
        "Fachärztliche Diagnostik: Vereinbaren Sie einen Termin bei einem Facharzt für Psychiatrie oder Psychotherapie.",
        "Visuelle Reizreduktion: Halten Sie Ihren Arbeitsplatz radikal frei von herumliegenden Gegenständen.",
        "Visuelle Timer gegen Zeitblindheit: Nutzen Sie Time-Timer mit farbiger Restzeitanzeige.",
        "Non-Sleep Deep Rest (NSDR): Tägliche 15-minütige Entspannungspausen zur Erholung des Nervensystems.",
      ],
      fr: [
        "Bilan spécialisé : nous vous recommandons vivement de consulter un médecin psychiatre ou un neuropsychologue.",
        "Épuration visuelle : désencombrez votre bureau pour réduire la fatigue cognitive passive.",
        "Outils contre la cécité temporelle : utilisez des minuteurs visuels analogiques.",
        "Repos profond sans sommeil (NSDR) : 15 minutes d'écoute guidée pour réinitialiser le système nerveux.",
      ],
      es: [
        "Evaluación especializada: le recomendamos acudir a un psiquiatra o neuropsicólogo clínico.",
        "Despeje visual radical: mantenga su espacio de trabajo libre de desorden para evitar fatiga mental.",
        "Herramientas contra la ceguera temporal: utilice temporizadores visuales de cuenta regresiva.",
        "Descanso profundo sin dormir (NSDR): 15 minutos diarios con Ju Sound Sanctuary para calmar el sistema nervioso.",
      ],
    },
    recommendedTool: {
      name: "Ju Panic SOS & Grounding Lab",
      path: "/emergency",
      actionText: {
        en: "Open SOS Grounding Lab",
        id: "Buka Lab Relaksasi SOS",
        de: "SOS-Erdungslabor öffnen",
        fr: "Ouvrir l'Espace SOS",
        es: "Abrir Laboratorio SOS",
      },
    },
  },
};

export const calculateAdhdScore = (answers: Record<number, number>) => {
  let totalScore = 0;
  let inattentionScore = 0;
  let hyperactivityScore = 0;
  let dopamineScore = 0;

  // ASRS v1.1 Part A significant threshold check:
  // For Q1-Q3: Often (3) or Very Often (4) counts as positive
  // For Q4-Q6: Sometimes (2), Often (3), or Very Often (4) counts as positive
  let asrsPartAPositiveCount = 0;

  for (const q of ADHD_QUESTIONS) {
    const val = answers[q.id] ?? 0;
    totalScore += val;

    if (q.category === "inattention") inattentionScore += val;
    if (q.category === "hyperactivity") hyperactivityScore += val;
    if (q.category === "dopamine_fatigue") dopamineScore += val;

    if (q.part === "A") {
      if (q.id <= 3 && val >= 3) asrsPartAPositiveCount++;
      if (q.id >= 4 && q.id <= 6 && val >= 2) asrsPartAPositiveCount++;
    }
  }

  let profileKey: "low" | "mild" | "moderate" | "high" = "low";

  if (asrsPartAPositiveCount >= 4 || totalScore >= 34) {
    profileKey = "high";
  } else if (asrsPartAPositiveCount >= 2 || totalScore >= 22) {
    profileKey = "moderate";
  } else if (totalScore >= 12) {
    profileKey = "mild";
  } else {
    profileKey = "low";
  }

  return {
    totalScore,
    maxScore: 48,
    percentage: Math.round((totalScore / 48) * 100),
    inattentionScore,
    hyperactivityScore,
    dopamineScore,
    asrsPartAPositiveCount,
    profile: ADHD_RESULT_PROFILES[profileKey],
  };
};
