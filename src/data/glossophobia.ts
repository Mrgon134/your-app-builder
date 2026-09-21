export type GlossophobiaCardLang = "en" | "id" | "de" | "fr" | "es";

export interface GlossophobiaQuestion {
  id: number;
  subscale:
    | "physiological_stage_fright_tremors"
    | "catastrophic_scrutiny_blankout_dread"
    | "performance_avoidance_career_sabotage";
  text: Record<GlossophobiaCardLang, string>;
}

export interface GlossophobiaResultLevel {
  level:
    | "articulate_poised_speaker"
    | "mild_anticipatory_stage_jitters"
    | "moderate_performance_anxiety"
    | "high_clinical_glossophobia_prpsa"
    | "severe_paralyzing_podium_panic";
  scoreRange: [number, number];
  title: Record<GlossophobiaCardLang, string>;
  badge: Record<GlossophobiaCardLang, string>;
  summary: Record<GlossophobiaCardLang, string>;
  psychology: Record<GlossophobiaCardLang, string>;
  actionProtocol: Record<GlossophobiaCardLang, string[]>;
}

export const GLOSSOPHOBIA_QUESTIONS: GlossophobiaQuestion[] = [
  // 1. Physiological Stage Fright & Tremors
  {
    id: 1,
    subscale: "physiological_stage_fright_tremors",
    text: {
      en: "Before or during a speech or presentation, your heart pounds furiously in your chest, your throat constricts, and your voice visibly shakes or breaks.",
      id: "Sebelum atau saat berbicara di depan banyak orang, jantungmu berdegup kencang, tenggorokan tercekat, dan suaramu bergetar atau tercekat parah.",
      de: "Vor oder während einer Rede schlägt Ihr Herz bis zum Hals, die Kehle schnürt sich zu und Ihre Stimme zittert hörbar.",
      fr: "Avant ou pendant une prise de parole, votre cœur bat la chamade, votre gorge se noue et votre voix tremble de façon incontrôlable.",
      es: "Antes o durante una presentación, el corazón se te desboca en el pecho, la garganta se te seca y la voz te tiembla visiblemente.",
    },
  },
  // 2. Catastrophic Scrutiny & Blankout Dread
  {
    id: 2,
    subscale: "catastrophic_scrutiny_blankout_dread",
    text: {
      en: "You are terrified of suddenly 'going completely blank' in front of an audience, forgetting your words, and standing frozen in humiliating silence.",
      id: "Kamu sangat takut tiba-tiba pikiranmu 'blank total' di depan audiens, lupa materi pembicaraan, dan mematung kaku dalam keheningan yang memalukan.",
      de: "Sie haben panische Angst vor einem totalen Blackout vor Publikum, bei dem Sie den Faden verlieren und in peinlicher Stille erstarren.",
      fr: "Vous êtes terrifié à l'idée d'avoir un trou noir total devant l'auditoire, d'oublier votre texte et de rester figé dans un silence embarrassant.",
      es: "Te aterra quedarte completamente en blanco ante el público, olvidar lo que ibas a decir y quedarte paralizado en un silencio humillante.",
    },
  },
  // 3. Performance Avoidance & Career Sabotage
  {
    id: 3,
    subscale: "performance_avoidance_career_sabotage",
    text: {
      en: "You have declined promotions, leadership roles, or university presentation opportunities solely to avoid having to speak in front of groups.",
      id: "Kamu pernah menolak promosi jabatan, peran pemimpin, atau kesempatan presentasi semata-mata demi menghindari bicara di depan kelompok orang.",
      de: "Sie haben berufliche Beförderungen oder Führungsaufgaben abgelehnt, nur um Vorträgen vor Gruppen aus dem Weg zu gehen.",
      fr: "Vous avez renoncé à des promotions ou des rôles de premier plan uniquement pour éviter d'avoir à vous exprimer devant un groupe.",
      es: "Has rechazado ascensos, puestos de liderazgo o presentaciones importantes únicamente para no tener que hablar en público.",
    },
  },
  // 4. Physiological Stage Fright & Tremors
  {
    id: 4,
    subscale: "physiological_stage_fright_tremors",
    text: {
      en: "Physical symptoms like uncontrollable hand tremors, excessive sweating, hot facial flushing, or nausea strike you the moment all eyes turn to you.",
      id: "Gejala fisik seperti tangan gemetar hebat, keringat berlebih, wajah memerah panas, atau mual menyergap begitu semua mata tertuju padamu.",
      de: "Symptome wie zitternde Hände, starkes Schwitzen, plötzliche Gesichtsröte oder Übelkeit überfallen Sie, sobald alle Blicke auf Sie gerichtet sind.",
      fr: "Des tremblements de mains, des sueurs froides, des rougeurs au visage ou des nausées surviennent dès que tous les regards se posent sur vous.",
      es: "Temblor en las manos, sudoración excesiva, sofocos o náuseas te asaltan en el instante en que todas las miradas se posan en ti.",
    },
  },
  // 5. Catastrophic Scrutiny & Blankout Dread
  {
    id: 5,
    subscale: "catastrophic_scrutiny_blankout_dread",
    text: {
      en: "You perceive every audience member's subtle yawn, phone check, or whisper as undeniable proof that you are boring, foolish, or failing miserably.",
      id: "Kamu menganggap uapan kecil, lirikan ke HP, atau bisikan audiens sebagai bukti nyata bahwa kamu membosankan, bodoh, atau gagal total.",
      de: "Sie deuten jedes Gähnen, jeden Blick aufs Smartphone oder Flüstern im Publikum als Beweis dafür, dass Ihr Vortrag peinlich und langweilig ist.",
      fr: "Vous interprétez le moindre bâillement ou regard sur un téléphone dans la salle comme la preuve accablante que vous êtes incompétent.",
      es: "Interpretas cualquier bostezo o susurro en la sala como una prueba irrefutable de que estás haciendo el ridículo más absoluto.",
    },
  },
  // 6. Performance Avoidance & Career Sabotage
  {
    id: 6,
    subscale: "performance_avoidance_career_sabotage",
    text: {
      en: "In meetings or seminars, you keep brilliant insights, questions, or ideas completely to yourself because unmuting your mic or speaking up causes sheer panic.",
      id: "Di rapat atau seminar, kamu memendam ide-ide brilian atau pertanyaan penting karena menyalakan mic atau berbicara memicu rasa panik luar biasa.",
      de: "In Meetings oder Seminaren behalten Sie wertvolle Ideen für sich, weil das Einschalten des Mikrofons oder das Wort-Ergreifen Panik auslöst.",
      fr: "En réunion, vous gardez vos meilleures idées pour vous par peur panique d'activer votre micro ou de prendre la parole en public.",
      es: "En reuniones de trabajo, te callas ideas brillantes o preguntas clave porque activar el micro o pedir la palabra te desata un nudo de terror.",
    },
  },
  // 7. Physiological Stage Fright & Tremors
  {
    id: 7,
    subscale: "physiological_stage_fright_tremors",
    text: {
      en: "Days or weeks before a scheduled speech or public talk, you suffer from chronic insomnia, stomach cramps, and persistent dread.",
      id: "Berhari-hari atau berminggu-minggu sebelum jadwal presentasi, kamu tersiksa oleh susah tidur (insomnia), kram perut, dan rasa cemas mencekam.",
      de: "Tage oder Wochen vor einem Vortrag leiden Sie unter Schlaflosigkeit, Magenschmerzen und anhaltenden Angstgefühlen.",
      fr: "Des jours ou semaines avant une intervention programmée, vous souffrez d'insomnies, de maux de ventre et d'une angoisse continue.",
      es: "Días o semanas antes de una presentación programada, sufres de insomnio, cólicos estomacales y una angustia anticipatoria asfixiante.",
    },
  },
  // 8. Catastrophic Scrutiny & Blankout Dread
  {
    id: 8,
    subscale: "catastrophic_scrutiny_blankout_dread",
    text: {
      en: "You hyper-focus on your own somatic sensations (throat tightness, voice pitch, blinking rate) rather than focusing on your ideas or message.",
      id: "Kamu terlalu fokus pada sensasi fisikmu sendiri (tenggorokan kering, nada suara, kedipan mata) alih-alih fokus pada isi materi yang disampaikan.",
      de: "Sie fixieren sich zwanghaft auf Ihre körperlichen Symptome (Kloß im Hals, Stimmlage, Blickkontakt), statt auf den Inhalt Ihrer Botschaft.",
      fr: "Vous êtes hyper-focalisé sur vos sensations corporelles (gorge serrée, souffle court) au détriment du message que vous souhaitez transmettre.",
      es: "Te hiperconcentras en tus síntomas corporales (sequedad de boca, tono de voz, respiración) en lugar de centrarte en tus argumentos.",
    },
  },
  // 9. Performance Avoidance & Career Sabotage
  {
    id: 9,
    subscale: "performance_avoidance_career_sabotage",
    text: {
      en: "You have feigned sickness, invented emergency excuses, or let colleagues take full credit for projects to escape having to deliver the final presentation.",
      id: "Kamu pernah pura-pura sakit, mencari alasan darurat, atau membiarkan rekan kerja mengambil semua pujian demi terhindar dari presentasi akhir.",
      de: "Sie haben sich schon krankgemeldet oder Kollegen den Vortrag überlassen, nur um der Bühne und der Präsentation zu entkommen.",
      fr: "Vous avez déjà simulé une maladie ou laissé des collègues récolter les lauriers d'un projet pour esquiver la présentation finale.",
      es: "Has fingido estar enfermo o has dejado que otros compañeros se lleven los méritos de un trabajo con tal de no exponerlo tú.",
    },
  },
  // 10. Physiological Stage Fright & Tremors
  {
    id: 10,
    subscale: "physiological_stage_fright_tremors",
    text: {
      en: "During speaking, you rush through your slides at hyperspeed without pausing to breathe, desperate to sit down and disappear as quickly as possible.",
      id: "Saat berbicara, kamu terburu-buru membaca slide dengan kecepatan kilat tanpa jeda napas, demi bisa segera duduk dan menghilang dari pandangan.",
      de: "Während des Vortrags rasen Sie im Eiltempo durch die Folien ohne Atempausen, nur um sich so schnell wie möglich wieder hinzusetzen.",
      fr: "Quand vous parlez, vous débitez vos diapositives à toute allure sans respirer, dans l'urgence absolue de regagner votre place.",
      es: "Al hablar, aceleras a toda velocidad sin pausas ni respiración, desesperado por terminar cuanto antes y pasar inadvertido.",
    },
  },
  // 11. Catastrophic Scrutiny & Blankout Dread
  {
    id: 11,
    subscale: "catastrophic_scrutiny_blankout_dread",
    text: {
      en: "Even after a successfully completed speech, you spend hours in painful rumination, mentally replaying every stumble, pause, or imperfection.",
      id: "Bahkan setelah presentasi selesai dengan lancar, kamu menghabiskan berjam-jam meratapi dan memutar ulang setiap jeda atau kesalahan kecil.",
      de: "Selbst nach einem gelungenen Vortrag grübeln Sie stundenlang und zerpflücken jeden kleinen Versprecher oder jede Pause schonungslos.",
      fr: "Même après une présentation réussie, vous ruminez pendant des heures en rejouant mentalement chaque hésitation ou imperfection.",
      es: "Incluso tras una charla exitosa, pasas horas repasando mentalmente de forma despiadada cada tropiezo o titubeo que tuviste.",
    },
  },
  // 12. Performance Avoidance & Career Sabotage
  {
    id: 12,
    subscale: "performance_avoidance_career_sabotage",
    text: {
      en: "The thought of giving a wedding toast, introducing yourself in a circle of strangers, or speaking at a conference fills you with dread worse than physical danger.",
      id: "Membayangkan harus memberi pidato sambutan pernikahan, perkenalan diri di grup baru, atau bicara di seminar terasa lebih menakutkan daripada bahaya fisik.",
      de: "Der Gedanke an eine Hochzeitsrede, eine Vorstellungsrunde oder einen Vortrag löst in Ihnen tiefere Todesangst aus als reale Gefahren.",
      fr: "La perspective d'un discours de mariage, d'un tour de table ou d'une conférence vous inspire une terreur pire que le danger physique.",
      es: "La idea de dar un brindis en una boda, presentarte en una ronda de desconocidos o dar una conferencia te aterra más que el peligro físico.",
    },
  },
];

export const GLOSSOPHOBIA_OPTIONS = [
  {
    value: 0,
    label: {
      en: "Strongly Disagree / Never (0)",
      id: "Sangat Tidak Setuju / Tenang (0)",
      de: "Stimme überhaupt nicht zu (0)",
      fr: "Pas du tout d'accord / Jamais (0)",
      es: "Totalmente en desacuerdo (0)",
    },
  },
  {
    value: 1,
    label: {
      en: "Disagree / Mild jitter (1)",
      id: "Kurang Setuju / Sedikit grogi (1)",
      de: "Stimme eher nicht zu (1)",
      fr: "Plutôt pas d'accord / Trac léger (1)",
      es: "En desacuerdo / Leve nerviosismo (1)",
    },
  },
  {
    value: 2,
    label: {
      en: "Agree / Noticeable anxiety (2)",
      id: "Setuju / Sangat cemas & tertekan (2)",
      de: "Stimme eher zu / Deutliche Angst (2)",
      fr: "D'accord / Anxiété marquée (2)",
      es: "De acuerdo / Ansiedad evidente (2)",
    },
  },
  {
    value: 3,
    label: {
      en: "Strongly Agree / Severe terror (3)",
      id: "Sangat Setuju / Panik luar biasa (3)",
      de: "Stimme voll zu / Extreme Panik (3)",
      fr: "Tout à fait d'accord / Panique totale (3)",
      es: "Totalmente de acuerdo / Pánico extremo (3)",
    },
  },
];

export const GLOSSOPHOBIA_RESULT_LEVELS: GlossophobiaResultLevel[] = [
  {
    level: "articulate_poised_speaker",
    scoreRange: [0, 7],
    title: {
      en: "Articulate & Poised Speaker",
      id: "Pembicara Percaya Diri & Tenang (Adaptif)",
      de: "Souveräner & gelassener Redner",
      fr: "Orateur Confiant & Posé",
      es: "Orador Seguro y Sereno",
    },
    badge: {
      en: "Minimal Speaking Anxiety",
      id: "Kecemasan Bicara Minimal",
      de: "Minimale Sprechangst",
      fr: "Anxiété Oratoire Minimale",
      es: "Ansiedad Oratoria Mínima",
    },
    summary: {
      en: "You possess remarkable public speaking poise. Presenting to large groups, facilitating meetings, and answering spontaneous questions feel energizing rather than threatening.",
      id: "Kamu memiliki ketenangan berbicara di depan umum yang luar biasa. Presentasi di hadapan audiens besar, memimpin rapat, dan menjawab pertanyaan spontan terasa menyenangkan bagimu.",
      de: "Sie besitzen eine bemerkenswerte Redegewandtheit. Präsentationen vor großen Gruppen und spontane Wortbeiträge empfinden Sie als anregend statt bedrohlich.",
      fr: "Vous bénéficiez d'une aisance oratoire remarquable. Prendre la parole devant une foule ou animer une réunion constitue pour vous un défi stimulant.",
      es: "Gozas de un aplomo escénico admirable. Hablar en público, moderar debates y responder preguntas improvisadas te resulta estimulante.",
    },
    psychology: {
      en: "Your autonomic nervous system interprets audience attention as positive social engagement rather than social exclusion or predatory scrutiny. Sympathetic arousal is channeled into charisma.",
      id: "Sistem sarafmu menafsirkan perhatian audiens sebagai interaksi sosial positif, bukan ancaman pengucilan. Lonjakan adrenalin berhasil disalurkan menjadi energi karismatik.",
      de: "Ihr Gehirn wertet die Aufmerksamkeit des Publikums als positive soziale Verbindung. Adrenalinausschüttung wird in Charisma und Präsenz transformiert.",
      fr: "Votre système nerveux perçoit l'attention du public comme une opportunité de connexion, convertissant l'adrénaline en dynamisme et conviction.",
      es: "Tu sistema nervioso interpreta la mirada del público como conexión social positiva, canalizando la activación en carisma y claridad.",
    },
    actionProtocol: {
      en: [
        "Continue sharing your voice in high-impact leadership, keynote, and mentoring settings.",
        "Encourage nervous colleagues and create inclusive, psychological safety in group meetings.",
        "Use Nuju's voice journal to brainstorm and rehearse speech frameworks with natural cadence.",
      ],
      id: [
        "Teruslah berbagi wawasan dalam forum kepemimpinan, seminar, dan sesi mentoring.",
        "Ciptakan suasana rapat yang ramah dan aman bagi rekan kerja yang pemalu atau cemas.",
        "Gunakan jurnal suara Nuju untuk menyusun kerangka pidato dengan ritme alami.",
      ],
      de: [
        "Bringen Sie Ihre Stimme weiterhin in Führungs- und Mentoring-Situationen ein.",
        "Schaffen Sie in Meetings psychologische Sicherheit für zurückhaltende Kollegen.",
        "Nutzen Sie Nuju Voice Journaling, um Vortragsideen flüssig und frei einzusprechen.",
      ],
      fr: [
        "Continuez à faire entendre votre voix lors de présentations et réunions clés.",
        "Soutenez avec bienveillance vos collègues intimidés par la prise de parole.",
        "Pratiquez le journal vocal Nuju pour structurer vos discours avec fluidité.",
      ],
      es: [
        "Sigue aportando tu liderazgo en conferencias, debates y reuniones estratégicas.",
        "Fomenta la seguridad psicológica en tu equipo para quienes sufren pánico escénico.",
        "Usa las notas de voz de Nuju para ensayar discursos con naturalidad.",
      ],
    },
  },
  {
    level: "mild_anticipatory_stage_jitters",
    scoreRange: [8, 14],
    title: {
      en: "Mild Anticipatory Stage Jitters",
      id: "Grogi Panggung Antisipatif Ringan",
      de: "Leichtes Lampenfieber",
      fr: "Trac Scénique Léger",
      es: "Nerviosismo Escénico Leve",
    },
    badge: {
      en: "Manageable Performance Jitters",
      id: "Ketegangan Wajar & Terkendali",
      de: "Normales Lampenfieber",
      fr: "Trac Gérable",
      es: "Nervios Adaptativos",
    },
    summary: {
      en: "You experience normal, healthy stage butterflies before public speaking. You may feel slight heart flutter or brief dry throat, but once you start speaking, your flow takes over.",
      id: "Kamu merasakan rasa berdebar yang wajar sebelum tampil. Ada sedikit rasa tegang di tenggorokan, namun begitu mulai berbicara di menit pertama, kamu dapat menguasai suasana.",
      de: "Sie verspüren gesundes, normales Lampenfieber vor Auftritten. Nach den ersten Sätzen verfliegt die Nervosität und Sie finden in Ihren Rhythmus.",
      fr: "Vous ressentez le trac classique avant d'entrer en scène. Dès les premières phrases prononcées, la tension retombe et vous trouvez votre débit.",
      es: "Sientes los nervios normales y saludables previos a hablar. Una vez pronunciadas las primeras frases, la fluidez y el dominio toman el control.",
    },
    psychology: {
      en: "Eustress (positive stress) activates focal concentration. Your prefrontal cortex maintains cognitive access to working memory despite transient autonomic arousal.",
      id: "Stres positif (*eustress*) meningkatkan fokus konsentrasi. Korteks prefrontal tetap memiliki akses penuh ke memori kerja meski ada sedikit ketegangan fisik.",
      de: "Die leichte Erregung schärft die Aufmerksamkeit. Ihr Arbeitsgedächtnis bleibt stabil erreichbar.",
      fr: "Ce léger stress stimule la concentration sans bloquer l'accès à la mémoire de travail.",
      es: "La activación fisiológica moderada agudiza el foco sin bloquear la memoria ni la elocuencia.",
    },
    actionProtocol: {
      en: [
        "Channel adrenaline as excitement ('I am energized' rather than 'I am terrified').",
        "Take 2 deep physiological sighs (double inhale, long exhale) right before stepping up.",
        "Focus on delivering value to one warm, smiling face in the audience rather than the crowd.",
      ],
      id: [
        "Bingkai ulang rasa tegang sebagai antusiasme ('Saya sedang bersemangat', bukan 'Saya takut').",
        "Lakukan teknik *physiological sigh* (dua kali tarik napas, buang napas panjang) sebelum bicara.",
        "Arahkan pandangan ke satu audiens yang tersenyum ramah untuk membangun rasa nyaman.",
      ],
      de: [
        "Deuten Sie das Kribbeln positiv als Vorfreude und Energie um.",
        "Atmen Sie zweimal kurz ein und lange aus (Physiological Sigh) vor Beginn.",
        "Suchen Sie Blickkontakt zu einer freundlichen, nickenden Person im Raum.",
      ],
      fr: [
        "Recadrez le trac comme un élan d'énergie ('Je suis prêt et enthousiaste').",
        "Effectuez deux soupirs physiologiques profonds juste avant de commencer.",
        "Ancrez votre regard sur un visage bienveillant dans la salle.",
      ],
      es: [
        "Reencuadra la adrenalina como entusiasmo ('Estoy activado para aportar valor').",
        "Haz dos suspiros fisiológicos (doble inhalación y exhalación larga) antes de empezar.",
        "Busca la mirada de una persona cercana que asienta con amabilidad.",
      ],
    },
  },
  {
    level: "moderate_performance_anxiety",
    scoreRange: [15, 22],
    title: {
      en: "Moderate Performance Anxiety",
      id: "Kecemasan Tampil Moderat",
      de: "Moderate Vortragsangst",
      fr: "Anxiété de Performance Modérée",
      es: "Ansiedad de Rendimiento Moderada",
    },
    badge: {
      en: "Moderate PRPSA Index",
      id: "Skor PRPSA Moderat",
      de: "Moderat erhöhter PRPSA-Score",
      fr: "Indice PRPSA Modéré",
      es: "Nivel PRPSA Moderado",
    },
    summary: {
      en: "Public speaking causes significant distress. You experience shaky hands, racing pulse, dry throat, and dread making presentations, though you manage to force yourself through them.",
      id: "Berbicara di depan umum menimbulkan tekanan yang berat. Tanganmu gemetar, jantung berdegup kencang, dan tenggorokan kering. Kamu memaksakan diri tampil meski sangat tersiksa.",
      de: "Reden vor Gruppen bereitet Ihnen erhebliche Qualen. Zitternde Hände und Herzrasen belasten Sie, auch wenn Sie Präsentationen mit Mühe durchstehen.",
      fr: "Prendre la parole en public est une épreuve douloureuse. Mains moites et palpitations vous assaillent, même si vous parvenez à aller au bout.",
      es: "Hablar en público te supone un sufrimiento notable. Notas temblor en las manos y taquicardia, obligándote a un sobreesfuerzo agotador.",
    },
    psychology: {
      en: "McCroskey's PRPSA framework identifies evaluation apprehension: the spotlight effect magnifies fear of negative judgment, diverting cognitive resources to somatic self-monitoring.",
      id: "Kerangka PRPSA McCroskey menjelaskan kecemasan evaluasi sosial: efek lampu sorot (*spotlight effect*) memperbesar rasa takut dihakimi, menyedot energi otak untuk memantau tubuh sendiri.",
      de: "Die Angst vor negativer Bewertung bindet kognitive Kapazitäten. Sie beobachten Ihre eigene Stimme kritischer als das Publikum es tut.",
      fr: "L'effet de projecteur amplifie la peur du jugement, détournant vos ressources mentales vers une surveillance anxieuse de votre corps.",
      es: "El 'efecto foco' dispara el temor al juicio ajeno, desviando tu energía cognitiva a vigilar tus propios síntomas corporales.",
    },
    actionProtocol: {
      en: [
        "Rehearse speaking out loud with Nuju's voice journal until opening sentences become automatic.",
        "Slow your speaking pace by 20% and deliberately embrace 3-second pauses between key slides.",
        "Sip warm water 5 minutes before speaking to soothe sympathetic laryngeal constriction.",
      ],
      id: [
        "Latih pidatomu dengan bersuara lantang di jurnal suara Nuju hingga kalimat pembuka menjadi otomatis.",
        "Perlambat tempo bicaramu 20% dan beranikan diri memberi jeda 3 detik di antara slide.",
        "Minum air hangat 5 menit sebelum berbicara untuk melemaskan otot pita suara yang tegang.",
      ],
      de: [
        "Üben Sie Ihren Vortrag laut im Nuju Voice Journal ein, bis der Einstieg wie von selbst sitzt.",
        "Drosseln Sie Ihr Sprechtempo bewusst um 20 % und nutzen Sie 3-sekündige Denkpausen.",
        "Trinken Sie warmes Wasser vor dem Auftritt, um die Kehlkopfmuskulatur zu entspannen.",
      ],
      fr: [
        "Répétez votre intervention à voix haute sur Nuju jusqu'à ce que l'introduction soit fluide.",
        "Ralentissez votre débit de 20 % et osez des silences de 3 secondes entre vos idées.",
        "Buvez de l'eau tiède quelques minutes avant pour détendre vos cordes vocales.",
      ],
      es: [
        "Ensaya en voz alta grabando tus notas en Nuju hasta automatizar las frases de inicio.",
        "Reduce tu velocidad al hablar un 20 % y permite silencios deliberados de 3 segundos.",
        "Bebe agua templada antes de intervenir para relajar la musculatura de la garganta.",
      ],
    },
  },
  {
    level: "high_clinical_glossophobia_prpsa",
    scoreRange: [23, 29],
    title: {
      en: "High Clinical Glossophobia (PRPSA)",
      id: "Glosofobia Klinis Tinggi (Model PRPSA)",
      de: "Klinisch signifikante Glossophobie",
      fr: "Glossophobie Clinique Sévère (PRPSA)",
      es: "Glosofobia Clínica Severa (PRPSA)",
    },
    badge: {
      en: "Severe Stage Panic Threshold",
      id: "Ambang Panik Panggung Berat",
      de: "Klinische Redepanik-Schwelle",
      fr: "Seuil de Panique Oratoire",
      es: "Umbral de Pánico al Estrado",
    },
    summary: {
      en: "Public speaking induces paralyzing dread, severe voice tremors, mental blankouts, and intense nausea. You systematically avoid speaking opportunities, damaging career advancement.",
      id: "Berbicara di depan publik memicu teror yang melumpuhkan, suara bergetar parah, pikiran *blank*, dan mual hebat. Kamu secara sistematis menghindari presentasi hingga merusak karier.",
      de: "Öffentliches Reden löst lähmende Panik, Stimmversagen, Blackouts und Fluchtreflexe aus. Sie meiden Vorträge um jeden Preis, was Ihren beruflichen Aufstieg hemmt.",
      fr: "S'exprimer en public déclenche une panique paralysante, des tremblements vocaux et des trous noirs. Cet évitement freine sérieusement votre évolution professionnelle.",
      es: "Hablar en público te provoca pánico paralizante, bloqueos mentales y náuseas. Evitas sistemáticamente cualquier exposición, dañando tu desarrollo laboral.",
    },
    psychology: {
      en: "Evolutionary tribal exclusion terror: the amygdala equates standing before a scrutinizing group to being surrounded by hostile predators, triggering massive sympathetic freeze-or-flight flooding.",
      id: "Ketakutan purba pengucilan sosial: amigdala menyamakan tatapan kelompok orang sebagai ancaman predator, memicu banjir adrenalin ekstrem dan kelumpuhan respon bicara.",
      de: "Evolutionärer Ur-Instinkt: Das Gehirn interpretiert die prüfenden Blicke der Gruppe als Bedrohung durch ein feindliches Rudel und schaltet auf Flucht oder Schockstarre.",
      fr: "Peur ancestrale du rejet : le cerveau archaïque assimile les regards fixés sur vous à une menace de meute, bloquant la parole par sidération.",
      es: "Terror biológico ancestral al rechazo : el cerebro límbico interpreta la mirada colectiva como una amenaza letal, colapsando la fluidez verbal.",
    },
    actionProtocol: {
      en: [
        "Consult a CBT psychologist for systematic desensitization and public speaking exposure therapy.",
        "Record 1-minute daily speaking exercises into Nuju to rewire the brain's comfort with vocal presence.",
        "Join supportive, low-stakes speaking groups (Toastmasters or small team round-tables).",
        "Practice somatic ground-anchoring: pressing your big toes firmly into the floor during presentations.",
      ],
      id: [
        "Konsultasikan ke psikolog klinis untuk terapi desensitisasi sistematis dan eksposur berbicara.",
        "Rekam latihan bicara 1 menit setiap hari di Nuju untuk melatih otak terbiasa mendengar suaramu.",
        "Bergabunglah dengan kelompok latihan bicara yang suportif dan minim tekanan (seperti Toastmasters).",
        "Terapkan teknik penjangkaran somatik: tekan jempol kaki ke lantai untuk menyalurkan kelebihan adrenalin.",
      ],
      de: [
        "Nutzen Sie KVT-gestützte Desensibilisierung und verhaltenstherapeutisches Sprechtraining.",
        "Nehmen Sie täglich 1-minütige freie Spracheinträge in Nuju auf, um die Hemmschwelle abzubauen.",
        "Schließen Sie sich geschützten Übungsgruppen (z. B. Toastmasters) in kleiner Runde an.",
        "Nutzen Sie somatisches Grounding: Drücken Sie die Zehen fest in den Boden, um Halt zu spüren.",
      ],
      fr: [
        "Consultez un psychologue TCC pour un protocole de désensibilisation systématique.",
        "Enregistrez des prises de parole d'une minute par jour sur Nuju pour apprivoiser votre voix.",
        "Rejoignez des ateliers d'expression bienveillants à petits effectifs (type Toastmasters).",
        "Ancrez votre posture : appuyez fermement vos pieds au sol pour canaliser la décharge motrice.",
      ],
      es: [
        "Inicia psicoterapia cognitivo-conductual con desensibilización sistemática ante el estrado.",
        "Graba notas de voz de 1 minuto al día en Nuju para familiarizarte con tu propia oratoria.",
        "Únete a grupos de práctica seguros y amables (como Toastmasters o clubes de debate).",
        "Aplica anclaje corporal: presiona los dedos de los pies contra el suelo para disipar el temblor.",
      ],
    },
  },
  {
    level: "severe_paralyzing_podium_panic",
    scoreRange: [30, 36],
    title: {
      en: "Severe Paralyzing Podium Panic",
      id: "Panik Podium Melumpuhkan (Glosofobia Berat)",
      de: "Schwere immobilisierende Redepanik",
      fr: "Panique Oratoire Tétanisante & Invalidante",
      es: "Pánico Escénico Paralizante (Glosofobia Severa)",
    },
    badge: {
      en: "Incapacitating Speaking Phobia",
      id: "Fobia Bicara Melumpuhkan",
      de: "Extrem einschränkende Phobie",
      fr: "Phobie Oratoire Majeure",
      es: "Fobia Social al Estrado Extrema",
    },
    summary: {
      en: "Public speaking triggers total panic collapse. Even introducing your name in a small circle causes uncontrollable shaking, nausea, dizziness, or fainting dread. Career and social life are severely compromised.",
      id: "Berbicara di depan orang memicu serangan panik total. Sekadar menyebutkan nama di lingkaran perkenalan memicu gemetar hebat, mual, pusing, dan rasa ingin pingsan.",
      de: "Öffentliches Sprechen löst absolute Panikzustände aus. Schon eine einfache Vorstellungsrunde im Meeting erzeugt unkontrollierbares Zittern, Schwindel oder Ohnmachtsgefühle.",
      fr: "La moindre intervention orale déclenche un effondrement anxieux total. Dire votre nom lors d'un tour de table suscite des nausées et la terreur du malaise.",
      es: "Hablar en público te provoca un colapso de angustia absoluto. Presentarte en una reunión informal te causa temblores violentos, náuseas y terror a desmayarte.",
    },
    psychology: {
      en: "Severe autonomic flooding completely knocks the Broca and Wernicke language centers offline. The nervous system is caught in an acute dorsal vagal shutdown, creating literal physical mutism.",
      id: "Banjir adrenalin parah melumpuhkan area bahasa otak (Broca & Wernicke). Sistem saraf terperangkap dalam kondisi *dorsal vagal shutdown*, menciptakan kebisuan fisik akibat panik.",
      de: "Die massive Überflutung mit Stresshormonen kappt die neuronale Anbindung der Sprachzentren (Broca-Areal). Es kommt zu echtem, physiologischem Sprachversagen.",
      fr: "L'inondation d'adrénaline désactive temporairement l'aire de Broca dans le cerveau gauche, provoquant un mutisme émotionnel bien réel.",
      es: "La inundación simpática extrema desconecta los centros lingüísticos cerebrales (área de Broca), provocando un auténtico mutismo somático de terror.",
    },
    actionProtocol: {
      en: [
        "Prioritize clinical consultation with a psychiatrist or clinical psychologist specializing in social anxiety.",
        "Consider short-term beta-blocker medical consultation to block peripheral physical tremors during critical events.",
        "Begin microscopic vocal exposure: reading children's books aloud alone in a locked room.",
        "Use Nuju as a sacred, private voice sanctuary to gently build vocal confidence without any human judgment.",
      ],
      id: [
        "Segera konsultasikan ke psikiater atau psikolog klinis spesialis kecemasan sosial.",
        "Konsultasikan dengan dokter mengenai opsi medis (*beta-blocker*) untuk meredam getaran fisik saat momen krusial.",
        "Mulai dari latihan mikro: membaca buku dengan suara lantang sendirian di kamar tertutup.",
        "Jadikan Nuju sebagai tempat latihan suara yang sepenuhnya privat dan bebas penghakiman.",
      ],
      de: [
        "Suchen Sie eine fachärztliche psychiatrische oder psychotherapeutische Beratung auf.",
        "Besprechen Sie mit einem Arzt temporäre medikamentöse Optionen zur Dämpfung der körperlichen Panik.",
        "Beginnen Sie mit Mikroschritten: Lesen Sie allein im geschlossenen Raum laut aus Büchern vor.",
        "Nutzen Sie Nuju als geschützten Raum, um Ihre Stimme ohne jeden Leistungsdruck wiederzuentdecken.",
      ],
      fr: [
        "Consultez un psychiatre ou un psychologue clinicien spécialisé dans l'anxiété sociale.",
        "Évoquez avec un médecin des solutions ciblées (bêtabloquants) pour neutraliser les tremblements périphériques.",
        "Démarrez par de micro-exercices : lisez à haute voix seul dans votre chambre porte fermée.",
        "Faites de Nuju votre sanctuaire vocal bienveillant pour réapprivoiser votre voix sans jugement.",
      ],
      es: [
        "Solicita consulta con un psiquiatra o psicólogo clínico especializado en fobia social.",
        "Valora con un médico el apoyo transitorio (como betabloqueantes) para frenar el temblor físico.",
        "Comienza con microprácticas: leer en voz alta a solas en una habitación cerrada.",
        "Usa el diario de voz Nuju como refugio íntimo para recuperar la confianza en tu voz sin presiones.",
      ],
    },
  },
];

export const GLOSSOPHOBIA_SUBSCALE_INFO = {
  physiological_stage_fright_tremors: {
    title: {
      en: "Physiological Stage Fright & Tremors",
      id: "Gejala Fisik Grogi Panggung & Getaran",
      de: "Körperliches Lampenfieber & Zittern",
      fr: "Symptômes physiques & tremblements",
      es: "Pánico somático y temblores escénicos",
    },
    description: {
      en: "Tachycardia, throat constriction, shaky vocal cords, hand tremors, hot flushing, and dry mouth before or during speaking.",
      id: "Jantung berdegup liar, tenggorokan tercekat, pita suara bergetar, tangan gemetar, wajah memerah, dan mulut kering.",
      de: "Herzrasen, Kloß im Hals, zitternde Stimme, Schweißausbrüche, Mundtrockenheit und zittrige Hände.",
      fr: "Palpitations, gorge nouée, voix tremblante, tremblements des mains, bouffées de chaleur et bouche sèche.",
      es: "Taquicardia, garganta cerrada, voz quebrada, temblor de manos, sofocos y sequedad bucal.",
    },
  },
  catastrophic_scrutiny_blankout_dread: {
    title: {
      en: "Catastrophic Scrutiny & Blankouts",
      id: "Ketakutan Dihakimi & Pikiran Blank",
      de: "Bewertungsangst & Blackout-Furcht",
      fr: "Peur du jugement & trou noir",
      es: "Miedo al juicio y quedarse en blanco",
    },
    description: {
      en: "Terror of sudden mental blankouts, hyper-focusing on audience facial expressions, and catastrophic post-speech rumination.",
      id: "Ketakutan pikiran mendadak kosong (*blank*), terlalu memantau ekspresi audiens, dan memikirkan kesalahan berulang kali.",
      de: "Panik vor dem totalen Fadenverlust, ständiges Scannen des Publikums und quälendes Grübeln im Nachhinein.",
      fr: "Terreur du trou de mémoire, fixation anxieuse sur le public et rumination sans fin après la prise de parole.",
      es: "Terror a olvidar el discurso, escaneo constante de caras en la sala y rumiación punitiva posterior.",
    },
  },
  performance_avoidance_career_sabotage: {
    title: {
      en: "Performance Avoidance & Career Sabotage",
      id: "Penghindaran Tampil & Sabotase Karier",
      de: "Vermeidungsverhalten & Karrierebremse",
      fr: "Évitement oratoire & sabotage de carrière",
      es: "Evitación escénica y freno profesional",
    },
    description: {
      en: "Turning down promotions, dodging team presentations, keeping quiet in meetings, and letting others take credit.",
      id: "Menolak promosi jabatan, menghindari presentasi tim, memilih diam saat rapat, dan membiarkan orang lain dipuji.",
      de: "Ablehnen von Führungsaufgaben, Ausweichen vor Präsentationen und Schweigen in wichtigen Besprechungen.",
      fr: "Refus de promotions, fuite des réunions clés, silence en public et renoncement à la reconnaissance.",
      es: "Rechazo de ascensos, evasión de presentaciones, silencio en reuniones y pérdida de oportunidades laborales.",
    },
  },
};

export function calculateGlossophobiaSubscales(answers: Record<number, number>) {
  let tremors = 0;
  let scrutiny = 0;
  let avoidance = 0;

  GLOSSOPHOBIA_QUESTIONS.forEach((q) => {
    const val = answers[q.id] ?? 0;
    if (q.subscale === "physiological_stage_fright_tremors") tremors += val;
    if (q.subscale === "catastrophic_scrutiny_blankout_dread") scrutiny += val;
    if (q.subscale === "performance_avoidance_career_sabotage") avoidance += val;
  });

  return {
    physiological_stage_fright_tremors: tremors,
    catastrophic_scrutiny_blankout_dread: scrutiny,
    performance_avoidance_career_sabotage: avoidance,
  };
}

export function getGlossophobiaResult(score: number): GlossophobiaResultLevel {
  const match = GLOSSOPHOBIA_RESULT_LEVELS.find(
    (lvl) => score >= lvl.scoreRange[0] && score <= lvl.scoreRange[1]
  );
  return match || GLOSSOPHOBIA_RESULT_LEVELS[GLOSSOPHOBIA_RESULT_LEVELS.length - 1];
}

export const GLOSSOPHOBIA_RESULTS = GLOSSOPHOBIA_RESULT_LEVELS;

export function calculateGlossophobiaScore(answers: Record<number, number>) {
  let totalScore = 0;
  const subscales = calculateGlossophobiaSubscales(answers);

  GLOSSOPHOBIA_QUESTIONS.forEach((q) => {
    totalScore += answers[q.id] ?? 0;
  });

  const level = getGlossophobiaResult(totalScore);

  return {
    totalScore,
    maxScore: GLOSSOPHOBIA_QUESTIONS.length * 3, // 36
    level,
    subscales,
  };
}
