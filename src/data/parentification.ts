export type ParentificationLang = "en" | "id" | "de" | "fr" | "es";
export type ParentificationDimension = "emotional_parentification" | "instrumental_burden" | "hyper_responsibility";
export type ParentificationLevel = "severe_parentified" | "eldest_anchor" | "responsible_shield" | "sovereign_self";

export interface ParentificationQuestion {
  id: number;
  text: Record<ParentificationLang, string>;
  dimension: ParentificationDimension;
}

export interface ParentificationProfile {
  level: ParentificationLevel;
  badge: Record<ParentificationLang, string>;
  title: Record<ParentificationLang, string>;
  tagline: Record<ParentificationLang, string>;
  description: Record<ParentificationLang, string>;
  reparentingDrills: Record<ParentificationLang, string[]>;
  color: string;
}

export const PARENTIFICATION_QUESTIONS: ParentificationQuestion[] = [
  // --- EMOTIONAL PARENTIFICATION (The Parent's Confidant & Therapist) ---
  {
    id: 1,
    dimension: "emotional_parentification",
    text: {
      en: "Growing up, I felt like my parents' unofficial therapist, listening to their adult marital conflicts and emotional breakdowns.",
      id: "Saat tumbuh dewasa, saya merasa menjadi 'terapis' tidak resmi orang tua saya, mendengarkan konflik pernikahan dan curhat keputusasaan mereka.",
      de: "Als Kind fühlte ich mich wie der heimliche Therapeut meiner Eltern und hörte mir deren Eheprobleme und seelische Krisen an.",
      fr: "Enfant, j'étais le thérapeute officieux de mes parents, recueillant leurs conflits de couple et leurs détresses émotionnelles.",
      es: "De niño me sentía como el terapeuta secreto de mis padres, escuchando sus crisis matrimoniales y desahogos adultos.",
    },
  },
  {
    id: 2,
    dimension: "emotional_parentification",
    text: {
      en: "I learned very early that my emotional job was to keep the peace, soothe my parents' moods, and never cause any trouble.",
      id: "Saya belajar sejak dini bahwa tugas saya adalah meredam ketegangan rumah, menjaga mood orang tua, dan pantang membuat masalah.",
      de: "Ich lernte früh, dass meine Hauptaufgabe darin bestand, den Hausfrieden zu wahren und die Launen meiner Eltern zu besänftigen.",
      fr: "J'ai compris très jeune que ma mission était d'apaiser l'humeur de mes parents et de ne jamais faire de vagues.",
      es: "Aprendí muy pronto que mi papel era calmar el humor de mis padres y no causar jamás el más mínimo problema.",
    },
  },
  {
    id: 3,
    dimension: "emotional_parentification",
    text: {
      en: "I felt intensely guilty whenever I had needs, cried, or asked for attention, feeling like I was an unbearable burden.",
      id: "Saya merasa sangat bersalah setiap kali menangis atau meminta perhatian, seolah-olah saya adalah beban berat yang merepotkan.",
      de: "Ich fühlte mich schuldig, wenn ich eigene Bedürfnisse hatte oder weinte, als wäre ich eine unzumutbare Belastung.",
      fr: "Je culpabilisais profondément chaque fois que je pleurais ou demandais de l'attention, me percevant comme un fardeau.",
      es: "Sentía una culpa enorme cada vez que lloraba o pedía atención, creyendo que era una carga insoportable.",
    },
  },
  {
    id: 4,
    dimension: "emotional_parentification",
    text: {
      en: "Even as an adult, I feel chronically responsible for my parents' happiness and anxious when they struggle emotionally.",
      id: "Bahkan saat dewasa, saya merasa bertanggung jawab atas kebahagiaan orang tua dan cemas saat emosi mereka tidak stabil.",
      de: "Selbst als Erwachsener fühle ich mich chronisch verantwortlich für das seelische Wohlbefinden meiner Eltern.",
      fr: "Même adulte, je me sens viscéralement responsable du bonheur de mes parents et angoissé s'ils vont mal.",
      es: "Incluso de adulto, me siento responsable de la felicidad de mis padres y me angustia verlos tambalearse.",
    },
  },

  // --- INSTRUMENTAL BURDEN (Adult Responsibilities Placed on a Child) ---
  {
    id: 5,
    dimension: "instrumental_burden",
    text: {
      en: "I was forced to manage adult logistics (caring for siblings, household cooking, translating legal/medical papers, managing money) far too young.",
      id: "Saya terpaksa mengurus urusan orang dewasa (mengasuh adik, memasak, mengurus dokumen resmi/keuangan) di usia yang terlalu dini.",
      de: "Ich musste viel zu früh Erwachsenen-Aufgaben übernehmen (Geschwister erziehen, Finanzen regeln, bürokratische Dokumente übersetzen).",
      fr: "J'ai dû assumer des responsabilités d'adulte bien trop jeune (élever mes frères et sœurs, cuisine, démarches administratives, budget).",
      es: "Tuve que asumir cargas de adulto siendo un niño (cuidar hermanos, cocinar, trámites burocráticos o gestionar dinero).",
    },
  },
  {
    id: 6,
    dimension: "instrumental_burden",
    text: {
      en: "I feel like I never really got to have a carefree childhood; I had to be the 'mature, sensible adult' from age eight.",
      id: "Saya merasa tidak pernah benar-benar mencicipi masa kecil yang bebas; saya dipaksa menjadi sosok 'dewasa dan pengertian' sejak kecil.",
      de: "Ich hatte nie eine unbeschwerte Kindheit; ich musste schon im Grundschulalter der 'vernünftige Erwachsene' sein.",
      fr: "J'ai l'impression de n'avoir jamais eu d'enfance insouciante ; j'ai dû être l'adulte raisonnable dès mon plus jeune âge.",
      es: "Siento que nunca tuve una infancia libre; me vi obligado a ser el adulto sensato y maduro desde muy pequeño.",
    },
  },
  {
    id: 7,
    dimension: "instrumental_burden",
    text: {
      en: "My family relied on me to be the anchor during financial or emotional crises, expecting me to fix catastrophic adult problems.",
      id: "Keluarga saya mengandalkan saya sebagai penopang saat krisis finansial atau emosional, berharap saya membereskan masalah mereka.",
      de: "Meine Familie verließ sich in Krisen auf mich und erwartete, dass ich schwerwiegende Erwachsenen-Probleme löste.",
      fr: "Ma famille comptait sur moi comme pilier pendant les crises, attendant de moi que je répare les drames d'adultes.",
      es: "Mi familia se apoyaba en mí en las crisis financieras o de pareja, esperando que yo resolviera sus problemas.",
    },
  },
  {
    id: 8,
    dimension: "instrumental_burden",
    text: {
      en: "My personal dreams, college choices, or relocations were heavily constrained by what my family demanded of me.",
      id: "Cita-cita pribadi, pilihan kuliah, atau kepindahan kota saya sangat terkekang oleh tuntutan dan ketergantungan keluarga.",
      de: "Meine eigenen Zukunftsträume und Lebensentscheidungen wurden massiv durch die Erwartungen meiner Familie beschnitten.",
      fr: "Mes aspirations professionnelles ou mes choix d'études ont été bridés par les besoins constants de ma famille.",
      es: "Mis metas personales y mis decisiones de vida estuvieron condicionadas por las demandas continuas de mi familia.",
    },
  },

  // --- COMPULSIVE HYPER-RESPONSIBILITY (The Adult Over-Functioning Wound) ---
  {
    id: 9,
    dimension: "hyper_responsibility",
    text: {
      en: "In friendships and romance, I automatically become the 'caretaker' or 'fixer', attracting emotionally immature or needy partners.",
      id: "Dalam persahabatan dan asmara, saya otomatis menjadi 'pengasuh' atau 'penolong', kerap menarik pasangan yang kurang dewasa secara emosi.",
      de: "In Beziehungen verfalle ich automatisch in die Retter-Rolle und ziehe emotional unreife oder bedürftige Partner an.",
      fr: "En amitié comme en amour, je deviens spontanément le sauveur, attirant des partenaires immatures ou dépendants.",
      es: "En mis relaciones suelo asumir el papel de cuidador o salvador, atrayendo a personas dependientes o inmaduras.",
    },
  },
  {
    id: 10,
    dimension: "hyper_responsibility",
    text: {
      en: "I feel overwhelming anxiety and panic when doing nothing; relaxing feels deeply irresponsible and dangerous.",
      id: "Saya merasa cemas dan gelisah saat diam tanpa beban kerja; beristirahat terasa sangat tidak bertanggung jawab dan berbahaya.",
      de: "Nichtstun löst in mir Panik aus; Entspannung fühlt sich zutiefst unverantwortlich und bedrohlich an.",
      fr: "Ne rien faire me plonge dans une angoisse sourde ; me reposer me paraît coupable et dangereux.",
      es: "El descanso me produce ansiedad; parar y no ser productivo me hace sentir culpable e irresponsable.",
    },
  },
  {
    id: 11,
    dimension: "hyper_responsibility",
    text: {
      en: "I find it agonizingly difficult to ask for help or receive care from others, convinced I must always be the self-sufficient one.",
      id: "Saya merasa sangat tersiksa saat harus meminta tolong atau menerima bantuan orang lain; saya merasa harus selalu mandiri 100%.",
      de: "Es fällt mir extrem schwer, Hilfe anzunehmen; ich glaube fest, alles vollkommen allein bewältigen zu müssen.",
      fr: "Il m'est douloureux de demander de l'aide ou d'être choyé, persuadé que je dois me suffire à moi-même.",
      es: "Me resulta desgarrador pedir ayuda o dejarme cuidar, convencido de que siempre debo bastarme solo.",
    },
  },
  {
    id: 12,
    dimension: "hyper_responsibility",
    text: {
      en: "When anyone in the room is upset, I subconsciously assume it is somehow my fault and scramble to resolve their distress.",
      id: "Saat ada orang yang kesal atau murung di sekitar saya, saya otomatis merasa itu salah saya dan panik ingin membereskannya.",
      de: "Wenn jemand im Raum schlechte Laune hat, beziehe ich es sofort auf mich und versuche krampfhaft, die Stimmung zu retten.",
      fr: "Dès que quelqu'un est maussade autour de moi, je présume que c'est de ma faute et je m'évertue à le soulager.",
      es: "Si alguien a mi alrededor está molesto, asumo instintivamente que es por mi culpa y me desvivo por arreglarlo.",
    },
  },
];

export const PARENTIFICATION_OPTIONS = [
  {
    value: 0,
    label: {
      en: "Never / Rarely",
      id: "Tidak Pernah / Jarang",
      de: "Nie / Selten",
      fr: "Jamais / Rarement",
      es: "Nunca / Rara vez",
    },
  },
  {
    value: 1,
    label: {
      en: "Sometimes",
      id: "Kadang-kadang",
      de: "Manchmal",
      fr: "Parfois",
      es: "A veces",
    },
  },
  {
    value: 2,
    label: {
      en: "Often",
      id: "Sering",
      de: "Oft",
      fr: "Souvent",
      es: "A menudo",
    },
  },
  {
    value: 3,
    label: {
      en: "Almost Constantly",
      id: "Hampir Selalu / Sangat Kuat",
      de: "Fast ständig",
      fr: "Quasiment toujours",
      es: "Casi constantemente",
    },
  },
];

export const PARENTIFICATION_PROFILES: Record<ParentificationLevel, ParentificationProfile> = {
  severe_parentified: {
    level: "severe_parentified",
    badge: {
      en: "Severe Chronic Parentification / Eldest Child Syndrome",
      id: "Parentifikasi Kronis Berat / Sindrom Anak Pertama",
      de: "Schwere chronische Parentifizierung",
      fr: "Parentification Sévère / Syndrome de l'Aîné",
      es: "Parentificación Crónica Severa",
    },
    title: {
      en: "The Exhausted Family Pillar",
      id: "Pilar Keluarga yang Kelelahan",
      de: "Die erschöpfte Familiensäule",
      fr: "Le Pilier Familial Épuisé",
      es: "El Pilar Familiar Agotado",
    },
    tagline: {
      en: "A childhood stolen by adult emotional burdens, resulting in lifelong hyper-independence and burnout.",
      id: "Masa kecil yang terampas oleh beban emosi orang tua, melahirkan kemandirian ekstrem dan kepenatan batin berkepanjangan.",
      de: "Eine durch Erwachsenenlasten geraubte Kindheit, die in chronischer Überverantwortung und Erschöpfung mündet.",
      fr: "Une enfance sacrifiée sur l'autel des devoirs d'adultes, forgeant une hyper-indépendance écrasante.",
      es: "Una infancia arrebatada por cargas adultas, dejando una hiperindependencia agotadora de por vida.",
    },
    description: {
      en: "You experienced severe parentification. You were expected to be your parents' emotional confidant, sibling caretaker, or crisis manager before your brain was even fully developed. Because you had to forfeit your own childhood needs to ensure family survival, you grew into an adult who feels guilty resting, cannot receive care from others, and chronically over-functions in every relationship.",
      id: "Anda mengalami parentifikasi yang berat. Anda dituntut menjadi tempat curhat orang tua, pengasuh adik, atau pemadam krisis sebelum mental Anda siap. Karena terpaksa mengorbankan kebutuhan masa kecil demi keutuhan keluarga, Anda tumbuh menjadi orang dewasa yang merasa bersalah saat santai, sulit menerima bantuan, dan selalu memikul beban orang lain.",
      de: "Sie haben schwere seelische Rollenumkehr erlebt. Sie mussten die emotionale Stütze Ihrer Eltern sein, bevor Sie selbst erwachsen waren. Das Resultat ist ein chronisches Schuldgefühl beim Ausruhen und die Unfähigkeit, sich von anderen versorgen zu lassen.",
      fr: "Vous avez subi une inversion des rôles destructrice. Devenu le confident ou le parent de vos propres parents, vous avez étouffé vos besoins d'enfant. À l'âge adulte, cela se traduit par une culpabilité viscérale au repos et un réflexe de tout porter seul.",
      es: "Viviste una inversión de roles profunda. Te viste forzado a sostener a tus padres o criar a tus hermanos antes de tiempo. Hoy cargas con una culpa implacable cuando descansas y te cuesta enormemente dejarte cuidar.",
    },
    reparentingDrills: {
      en: [
        "The Resignation Ritual: Write a ceremonial letter resigning from the role of 'Family Fixer' and 'Emotional Custodian'. You are their child, not their parent.",
        "Deliberate Under-Functioning: When a family member or friend presents a crisis, wait a minimum of 2 hours before offering solutions. Allow them to feel and manage their own discomfort.",
        "Inner Child Reclaiming: Schedule 30 minutes every weekend for an entirely purposeless, joyful activity (coloring, gaming, wandering, swinging) strictly dedicated to your 8-year-old self.",
      ],
      id: [
        "Ritual Pelepasan Jabatan: Tulis surat pengunduran diri simbolis dari peran 'Penyelamat Keluarga' atau 'Pengasuh Orang Tua'. Anda adalah anak mereka, bukan orang tua bagi orang tua Anda.",
        "Latihan Mengurangi Campur Tangan: Saat orang terdekat mengeluhkan masalah hidup, tahan diri minimal 2 jam sebelum memberi solusi. Beri mereka ruang memproses emosi mereka sendiri.",
        "Memeluk Anak Kecil di Diri: Luangkan 30 menit setiap minggu untuk aktivitas bermain murni tanpa target (menggambar, berjalan-jalan santai, main game) khusus untuk membahagiakan diri kecil Anda.",
      ],
      de: [
        "Rücktritts-Ritual: Verfassen Sie einen symbolischen Kündigungsbrief als 'Familienretter'. Sie sind das Kind, nicht der Elternteil Ihrer Eltern.",
        "Gezieltes Loslassen: Warten Sie bei Klagen von Angehörigen mindestens 2 Stunden, bevor Sie Lösungen anbieten.",
        "Inneres-Kind-Date: Schenken Sie sich wöchentlich 30 zweckfreie Minuten rein für das eigene verspielte innere Kind.",
      ],
      fr: [
        "Lettre de Démission Symbolique : Déclarez forfait de votre rôle de 'Sauveur Familial'. Vous êtes leur enfant, pas leur tuteur émotionnel.",
        "Retrait Délibéré : Face aux plaintes d'un proche, patientez au moins 2 heures avant de proposer la moindre solution.",
        "Rendez-vous avec l'Enfant Intérieur : Réservez 30 minutes de jeu ou de flânerie sans aucun objectif d'efficacité chaque semaine.",
      ],
      es: [
        "Carta de Dimisión Emocional: Escribe una carta renunciando formalmente al papel de salvador familiar. Eres su hijo, no su protector.",
        "Pausa de Intervención: Cuando un familiar comparta un drama, espera 2 horas antes de ofrecerte a solucionarlo.",
        "Cita con tu Niño Interior: Dedica 30 minutos a la semana a una actividad puramente lúdica y sin metas productivas.",
      ],
    },
    color: "#e11d48",
  },
  eldest_anchor: {
    level: "eldest_anchor",
    badge: {
      en: "Moderate-High Parentification / The Eldest Anchor",
      id: "Parentifikasi Sedang-Tinggi / Sang Jangkar Sulung",
      de: "Mittlere bis Hohe Parentifizierung / Der Älteste Anker",
      fr: "Parentification Modérée / L'Ancre Protectrice",
      es: "Parentificación Moderada / El Ancla Protectora",
    },
    title: {
      en: "The Compulsive Caretaker",
      id: "Sang Pengasuh Kompulsif",
      de: "Der pflichtbewusste Beschützer",
      fr: "Le Protecteur Compulsif",
      es: "El Cuidador Compulsivo",
    },
    tagline: {
      en: "Conditioned to believe that love and belonging must be earned through ceaseless service.",
      id: "Terdoktrin bahwa cinta dan penerimaan hanya bisa didapatkan melalui pengorbanan tanpa henti.",
      de: "Geprägt von der Überzeugung, dass Liebe nur durch permanente Hilfsbereitschaft verdient werden kann.",
      fr: "Persuadé que l'amour et l'estime ne se méritent qu'au prix d'un dévouement sans limites.",
      es: "Condicionado a creer que el afecto solo se gana cuidando y resolviendo los problemas ajenos.",
    },
    description: {
      en: "You developed a deeply internalized sense of responsibility for the emotional weather of your household. While you may not have managed every logistical crisis, you learned that being 'low-maintenance' and emotionally self-contained earned praise. In adulthood, this manifests as boundary guilt, hyper-vigilance toward others' moods, and difficulty setting personal limits.",
      id: "Anda memiliki rasa tanggung jawab yang sangat kuat terhadap keharmonisan rumah tangga sejak dini. Anda belajar bahwa menjadi anak yang 'mandiri, penurut, dan tidak rewel' adalah satu-satunya cara mendapatkan pujian. Di usia dewasa, ini mewujud dalam rasa bersalah saat menolak permintaan orang lain dan kewaspadaan berlebih terhadap perubahan raut wajah orang di sekitar Anda.",
      de: "Sie lernten früh, dass Sie als 'pflegeleicht' und verlässlich gelobt wurden. Als Erwachsener führt dies zu schweren Schuldgefühlen beim Grenzen-Setzen und ständiger Wachsamkeit gegenüber Stimmungen anderer.",
      fr: "Vous avez intégré qu'être sage, autonome et discret était le seul moyen d'obtenir de la reconnaissance. Aujourd'hui, poser des limites vous fait culpabiliser et vous anticipez constamment les besoins d'autrui.",
      es: "Aprendiste que ser dócil y autosuficiente garantizaba la tranquilidad familiar. De adulto, esto se traduce en una dificultad tremenda para decir 'no' y un radar hipersensible al humor ajeno.",
    },
    reparentingDrills: {
      en: [
        "Boundary Script Practice: 'I love you, but I do not have the emotional capacity to hold this topic right now.'",
        "Somatic Boundary Check: When asked for a favor, check your throat and chest. If you feel constriction, the honest answer is 'No'.",
        "Receiving Practice: Allow a friend or partner to cook for you, pay for coffee, or run an errand without rushing to reciprocate immediately.",
      ],
      id: [
        "Latihan Batasan Tegas: 'Saya menyayangi kalian, namun kapasitas emosi dan pikiran saya saat ini sedang tidak mencukupi untuk membahas masalah ini.'",
        "Pengecekan Tubuh Somatik: Saat dimintai tolong, perhatikan sensasi di dada dan rahang. Jika terasa sesak atau tertekan, jawaban jujurnya adalah 'Tidak'.",
        "Latihan Menerima: Biarkan teman atau pasangan mentraktir kopi atau membantu Anda tanpa Anda buru-buru membalas budi seketika.",
      ],
      de: [
        "Grenzen formulieren: 'Ich habe euch lieb, aber meine seelische Kapazität reicht für dieses Thema im Moment nicht aus.'",
        "Körperwahrnehmung: Spüren Sie Enge in Brust oder Hals bei einer Bitte, lautet Ihre ehrliche Antwort 'Nein'.",
        "Empfangen lernen: Lassen Sie sich unterstützen, ohne sofort die Gegenleistung erbringen zu wollen.",
      ],
      fr: [
        "Formuler une Limite : 'Je tiens à toi, mais je n'ai pas la disponibilité mentale pour ce sujet aujourd'hui.'",
        "Écoute Somatique : Si votre gorge se serre face à une sollicitation, votre réponse sincère est non.",
        "Apprendre à Recevoir : Acceptez qu'on vous rende service sans chercher immédiatement à rembourser la dette.",
      ],
      es: [
        "Práctica de Límites: 'Te quiero mucho, pero ahora mismo no tengo la energía mental para abordar este tema.'",
        "Escucha Corporal: Si sientes un nudo en la garganta ante una petición, tu respuesta auténtica es 'no'.",
        "Aprender a Recibir: Deja que alguien te invite o te ayude sin salir corriendo a compensarlo al instante.",
      ],
    },
    color: "#f59e0b",
  },
  responsible_shield: {
    level: "responsible_shield",
    badge: {
      en: "Mild Parentification / The Reliable Shield",
      id: "Parentifikasi Ringan / Perisai Terpercaya",
      de: "Leichte Parentifizierung / Der verlässliche Schild",
      fr: "Parentification Légère / Le Bouclier Rassurant",
      es: "Parentificación Leve / El Escudo Protector",
    },
    title: {
      en: "The Helpful Peacemaker",
      id: "Juru Damai yang Pengertian",
      de: "Der verlässliche Friedensstifter",
      fr: "Le Conciliateur Bienveillant",
      es: "El Pacificador Generoso",
    },
    tagline: {
      en: "Periodic emotional burdening during family transitions, with healthy underlying autonomy.",
      id: "Memikul beban emosi periodik saat masa sulit keluarga, namun masih memiliki kemandirian batin.",
      de: "Zeitweise Übernahme von Verantwortung in Krisen, jedoch mit erhaltener Autonomie.",
      fr: "Responsabilités ponctuelles durant les transitions familiales, avec une autonomie globale préservée.",
      es: "Cargas emocionales puntuales en etapas de crisis, manteniendo un fondo de autonomía.",
    },
    description: {
      en: "Your parentification was mostly situational—perhaps during a parental illness, divorce, or financial squeeze. You stepped up admirably, but it occasionally created an overdeveloped sense of duty. You generally function well, but you can feel sudden surges of guilt when pursuing pure leisure or prioritizing yourself over family obligations.",
      id: "Parentifikasi yang Anda alami bersifat situasional—misalnya saat orang tua sakit, perceraian, atau kesulitan ekonomi sesaat. Anda menjalankan tugas dengan baik, namun terkadang masih menyisakan rasa bersalah saat ingin memprioritaskan diri sendiri di atas tuntutan keluarga.",
      de: "Ihre Rollenumkehr war vor allem phasenbezogen. Sie haben Verantwortung übernommen, spüren jedoch manchmal noch Reste von Schuldgefühlen, wenn Sie eigene Prioritäten setzen.",
      fr: "Votre prise de responsabilité était essentiellement contextuelle. Vous gérez bien votre vie, mais une pointe de culpabilité surgit parfois lorsque vous vous faites passer en premier.",
      es: "Tu asunción de roles fue situacional. Te desenvuelves con solidez, aunque a veces reaparece cierta culpa cuando decides priorizar tu bienestar por encima de la familia.",
    },
    reparentingDrills: {
      en: [
        "Unapologetic Rest: Take one weekend afternoon purely for yourself with phones on silent, reminding yourself: 'Rest is biological maintenance, not indulgence.'",
        "Distinguishing Empathy from Responsibility: Practice telling yourself: 'I can deeply care about their struggle without taking ownership of solving it.'",
      ],
      id: [
        "Istirahat Tanpa Minta Maaf: Nikmati satu sore di akhir pekan khusus untuk diri sendiri tanpa rasa bersalah: 'Istirahat adalah hak biologis tubuh, bukan kemalasan.'",
        "Membedakan Empati dari Tanggung Jawab: 'Saya bisa berempati pada kesulitan mereka tanpa harus menjadi pihak yang menyelesaikan masalah tersebut.'",
      ],
      de: [
        "Erholung ohne Reue: Gönnen Sie sich bewusste Auszeiten mit dem Leitsatz: 'Erholung ist kein Luxus, sondern Notwendigkeit.'",
        "Mitgefühl statt Mitleiden: 'Ich darf Anteil nehmen, ohne die Verantwortung für die Lösung zu tragen.'",
      ],
      fr: [
        "Repos Décomplexé : Prenez du temps pour vous sans vous justifier : 'Le repos est un besoin vital, pas un caprice.'",
        "Distinguer Empathie et Devoir : 'Je peux écouter avec le cœur sans me charger de régler la situation.'",
      ],
      es: [
        "Descanso sin Excusas: Regálate una tarde libre recordando: 'Descansar es salud básica, no un privilegio culpable.'",
        "Empatía sin Rescate: 'Puedo comprender su dolor sin necesidad de asumir la responsabilidad de resolverlo.'",
      ],
    },
    color: "#3b82f6",
  },
  sovereign_self: {
    level: "sovereign_self",
    badge: {
      en: "Sovereign Inner Autonomy / Low Parentification",
      id: "Kemandirian Otonom Sehat / Bebas Parentifikasi",
      de: "Gefestigte Autonomie / Geringe Parentifizierung",
      fr: "Autonomie Saine / Non Parentifié",
      es: "Autonomía Soberana / Libre de Parentificación",
    },
    title: {
      en: "The Free Sovereign",
      id: "Pribadi Mandiri yang Merdeka",
      de: "Das freie Selbst",
      fr: "L'Être Souverain",
      es: "La Persona Soberana",
    },
    tagline: {
      en: "Healthy psychological boundaries between self and family, with mutual care and freedom.",
      id: "Batasan psikologis yang sehat antara diri dan keluarga; saling peduli tanpa ketergantungan yang menjerat.",
      de: "Gesunde Grenzen zwischen Familie und eigener Identität, getragen von Respekt und Freiheit.",
      fr: "Des frontières claires et sereines entre soi et les siens, dans le respect mutuel.",
      es: "Límites psicológicos sanos con la familia, basados en el afecto sin ataduras culpabilizadoras.",
    },
    description: {
      en: "You were fortunate to grow up in an environment where adults carried adult burdens. You were allowed to be a child, express vulnerability without shame, and develop an autonomous sense of self. You can offer compassionate support to loved ones without feeling compelled to sacrifice your own physical or emotional health.",
      id: "Anda beruntung tumbuh dalam lingkungan di mana orang dewasa memikul tanggung jawab orang dewasa. Anda diizinkan menjadi anak-anak, mengekspresikan kerapuhan tanpa rasa malu, dan memiliki batasan diri yang kokoh. Anda bisa mendampingi keluarga dengan tulus tanpa mengorbankan kesehatan fisik atau mental Anda.",
      de: "Sie durften als Kind Kind sein. Sie können Angehörige liebevoll unterstützen, ohne sich selbst aufzugeben.",
      fr: "Vous avez bénéficié d'un cadre où les adultes assumaient leur rôle. Vous savez soutenir vos proches sans vous sacrifier.",
      es: "Tuviste la fortuna de vivir una infancia protegida. Sabes acompañar a los tuyos sin inmolarte en el proceso.",
    },
    reparentingDrills: {
      en: [
        "Boundary Mentorship: Model healthy boundaries and emotional differentiation for friends who struggle with family enmeshment.",
        "Gratitude Grounding: Celebrate your capacity to love deeply while maintaining peaceful personal sovereignty.",
      ],
      id: [
        "Teladan Batasan Sehat: Jadilah inspirasi batasan emosi yang matang bagi rekan yang kerap terjebak beban keluarga.",
        "Syukur Kedaulatan Batin: Rayakan kemampuan Anda mencintai orang lain tanpa kehilangan kebebasan diri sendiri.",
      ],
      de: [
        "Vorbildfunktion: Zeigen Sie Mitmenschen vor, wie gesunde Grenzziehung und echte Liebe harmonieren.",
        "Dankbarkeit: Schätzen Sie Ihre seelische Freiheit und Ihr stabiles Fundament.",
      ],
      fr: [
        "Inspiration Bienveillante : Montrez l'exemple d'une relation d'amour affranchie de la culpabilité.",
        "Gratitude : Célébrez votre capacité à aimer sans vous perdre.",
      ],
      es: [
        "Referente de Equilibrio: Muestra con tu ejemplo que es posible querer sin desgastarse.",
        "Gratitud Consciente: Honra tu libertad interior y tu serenidad relacional.",
      ],
    },
    color: "#10b981",
  },
};

export interface ParentificationScoreResult {
  totalScore: number;
  maxScore: number;
  percentage: number;
  level: ParentificationLevel;
  profile: ParentificationProfile;
  subscales: {
    emotional_parentification: { score: number; max: number; percentage: number };
    instrumental_burden: { score: number; max: number; percentage: number };
    hyper_responsibility: { score: number; max: number; percentage: number };
  };
}

export function calculateParentificationScore(answers: Record<number, number>): ParentificationScoreResult {
  let emotional_parentification = 0;
  let instrumental_burden = 0;
  let hyper_responsibility = 0;

  PARENTIFICATION_QUESTIONS.forEach((q) => {
    const val = answers[q.id] || 0;
    if (q.dimension === "emotional_parentification") emotional_parentification += val;
    if (q.dimension === "instrumental_burden") instrumental_burden += val;
    if (q.dimension === "hyper_responsibility") hyper_responsibility += val;
  });

  const totalScore = emotional_parentification + instrumental_burden + hyper_responsibility;
  const maxScore = 36;
  const percentage = Math.round((totalScore / maxScore) * 100);

  let level: ParentificationLevel = "sovereign_self";

  if (totalScore >= 26) {
    level = "severe_parentified";
  } else if (totalScore >= 18) {
    level = "eldest_anchor";
  } else if (totalScore >= 9) {
    level = "responsible_shield";
  } else {
    level = "sovereign_self";
  }

  return {
    totalScore,
    maxScore,
    percentage,
    level,
    profile: PARENTIFICATION_PROFILES[level],
    subscales: {
      emotional_parentification: {
        score: emotional_parentification,
        max: 12,
        percentage: Math.round((emotional_parentification / 12) * 100),
      },
      instrumental_burden: {
        score: instrumental_burden,
        max: 12,
        percentage: Math.round((instrumental_burden / 12) * 100),
      },
      hyper_responsibility: {
        score: hyper_responsibility,
        max: 12,
        percentage: Math.round((hyper_responsibility / 12) * 100),
      },
    },
  };
}
