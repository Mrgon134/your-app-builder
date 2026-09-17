export type PdaLang = "en" | "id" | "de" | "fr" | "es";

export type PdaLevel =
  | "flexible_autonomy"
  | "mild_demand_sensitivity"
  | "moderate_pda_profile"
  | "severe_autonomy_burnout";

export type PdaDimension =
  | "autonomy_threat_panic"
  | "internal_demand_paralysis"
  | "social_masking_distraction";

export interface PdaQuestion {
  id: number;
  dimension: PdaDimension;
  text: Record<PdaLang, string>;
}

export const PDA_OPTIONS = [
  {
    value: 0,
    label: {
      en: "Rarely / Not Me",
      id: "Jarang / Bukan Saya",
      de: "Selten / Trifft nicht zu",
      fr: "Rarement / Pas moi",
      es: "Rara vez / No me pasa",
    },
  },
  {
    value: 1,
    label: {
      en: "Sometimes / Mildly",
      id: "Kadang-kadang / Ringan",
      de: "Manchmal / Leicht",
      fr: "Parfois / Légèrement",
      es: "A veces / Levemente",
    },
  },
  {
    value: 2,
    label: {
      en: "Frequently / Noticeably",
      id: "Seringkali / Terasa Jelas",
      de: "Häufig / Spürbar",
      fr: "Souvent / Nettement",
      es: "Frecuentemente / Notorio",
    },
  },
  {
    value: 3,
    label: {
      en: "Almost Always / Severely",
      id: "Hampir Selalu / Sangat Intens",
      de: "Fast immer / Extrem",
      fr: "Presque toujours / Très intense",
      es: "Casi siempre / Muy severo",
    },
  },
];

export const PDA_QUESTIONS: PdaQuestion[] = [
  // Dimension 1: Autonomy Threat Panic (Q1-Q4)
  {
    id: 1,
    dimension: "autonomy_threat_panic",
    text: {
      en: "When someone directly tells me what to do—even politely—I experience an immediate physical jolt of anger, panic, or resistance.",
      id: "Ketika seseorang menyuruhku melakukan sesuatu—meskipun dengan sopan—aku merasakan sengatan amarah, panik, atau perlawanan fisik seketika.",
      de: "Wenn mir jemand direkt sagt, was ich tun soll – selbst höflich –, spüre ich sofort einen körperlichen Stich von Wut, Panik oder Abwehr.",
      fr: "Quand on me dit directement quoi faire, même poliment, je ressens une décharge physique immédiate de colère, de panique ou de refus.",
      es: "Cuando alguien me ordena directamente qué hacer, incluso con cortesía, siento una sacudida física inmediata de rabia, pánico o resistencia.",
    },
  },
  {
    id: 2,
    dimension: "autonomy_threat_panic",
    text: {
      en: "A scheduled calendar event or deadline feels like a tightening noose around my neck rather than a helpful reminder.",
      id: "Jadwal kalender atau tenggat waktu terasa seperti jerat yang mencekik leherku, bukan pengingat yang membantu.",
      de: "Ein Kalendertermin oder eine Frist fühlt sich für mich eher wie eine Schlinge um den Hals als eine nützliche Erinnerung an.",
      fr: "Un rendez-vous planifié ou une échéance me donne l'impression d'un nœud qui se resserre plutôt que d'un rappel utile.",
      es: "Un evento en el calendario o una fecha límite se siente como una soga apretándome el cuello más que como un recordatorio útil.",
    },
  },
  {
    id: 3,
    dimension: "autonomy_threat_panic",
    text: {
      en: "I would rather suffer negative consequences (fines, missed flights, bad grades) than comply with a demand that feels coercive.",
      id: "Aku lebih rela menanggung konsekuensi buruk (denda, ketinggalan pesawat, nilai jelek) daripada menuruti perintah yang terasa memaksa.",
      de: "Ich nehme lieber spürbare Nachteile in Kauf, als mich einer Forderung zu beugen, die sich erzwungen anfühlt.",
      fr: "Je préfère subir des conséquences négatives (amendes, retards) plutôt que de céder à une injonction perçue comme coercitive.",
      es: "Prefiero sufrir consecuencias negativas (multas, pérdidas) antes que acatar una exigencia que sienta impuesta a la fuerza.",
    },
  },
  {
    id: 4,
    dimension: "autonomy_threat_panic",
    text: {
      en: "The word 'MUST' or 'SHOULD'—even in my own self-talk—triggers an instant shutdown or desire to rebel.",
      id: "Kata 'HARUS' atau 'SEHARUSNYA'—bahkan dalam pikiranku sendiri—memicu mati rasa seketika atau dorongan kuat untuk memberontak.",
      de: "Die Worte 'MÜSSEN' oder 'SOLLTE' lösen in mir sofortige Blockade oder Trotz aus.",
      fr: "Les mots 'IL FAUT' ou 'JE DOIS', même dans mes pensées, déclenchent un blocage instantané ou une rébellion.",
      es: "Las palabras 'DEBO' o 'TENGO QUE', incluso en mi diálogo interno, provocan un apagón mental o ganas inmediatas de rebelarme.",
    },
  },

  // Dimension 2: Internal Demand Paralysis (Q5-Q8)
  {
    id: 5,
    dimension: "internal_demand_paralysis",
    text: {
      en: "I regularly struggle to do things I genuinely love (creative hobbies, playing music, reading) the moment they feel like an obligation.",
      id: "Aku kesulitan melakukan hal-hal yang sebenarnya sangat kusukai (hobi, bermusik, membaca) begitu kegiatan itu terasa menjadi sebuah kewajiban.",
      de: "Ich kann Dinge, die ich eigentlich liebe, oft nicht tun, sobald sie sich wie eine Pflicht anfühlen.",
      fr: "J'ai du mal à pratiquer des passions que j'adore dès l'instant où elles prennent la forme d'un devoir à accomplir.",
      es: "Me cuesta enormemente hacer cosas que amo (hobbies, arte, lectura) en cuanto se transforman en una obligación.",
    },
  },
  {
    id: 6,
    dimension: "internal_demand_paralysis",
    text: {
      en: "Basic self-care demands (brushing teeth, drinking water, taking medicine, showering) can trigger intense internal paralysis.",
      id: "Kebutuhan dasar merawat diri (sikat gigi, minum air, minum obat, mandi) bisa memicu kelumpuhan mental yang sangat melelahkan.",
      de: "Grundlegende Selbstfürsorge (Zähneputzen, Trinken, Medikamente, Duschen) löst bei mir oft regelrechte Lähmung aus.",
      fr: "Les gestes simples du quotidien (se brosser les dents, boire, se doucher) peuvent provoquer une paralysie intérieure intense.",
      es: "Las tareas básicas de autocuidado (cepillarse los dientes, beber agua, ducharse) me provocan una parálisis interna agotadora.",
    },
  },
  {
    id: 7,
    dimension: "internal_demand_paralysis",
    text: {
      en: "When I sit down to do an important task that I chose myself, my brain suddenly treats it as an enemy threat and freezes.",
      id: "Ketika aku duduk untuk mengerjakan tugas penting yang kupilih sendiri, otakku mendadak menganggapnya sebagai ancaman dan membeku.",
      de: "Sobald ich mich an eine selbstgewählte wichtige Aufgabe setze, stuft mein Gehirn sie als Gefahr ein und blockiert.",
      fr: "Dès que je m'installe pour travailler sur un projet choisi, mon cerveau le perçoit comme une menace et se fige.",
      es: "En cuanto me dispongo a avanzar en un proyecto que yo mismo elegí, mi cerebro lo percibe como una amenaza y se bloquea.",
    },
  },
  {
    id: 8,
    dimension: "internal_demand_paralysis",
    text: {
      en: "I experience intense guilt because people label me 'lazy' or 'unreliable,' yet internally I feel trapped in invisible chains.",
      id: "Aku memendam rasa bersalah besar karena dicap 'pemalas' atau 'tidak bisa diandalkan', padahal di dalam batin aku merasa terbelenggu rantai tak kasat mata.",
      de: "Ich leide unter Schuldgefühlen, weil man mich für faul hält, während ich mich innerlich wie gelähmt fühle.",
      fr: "Je culpabilise qu'on me juge 'paresseux', alors qu'intérieurement je me sens entravé par des chaînes invisibles.",
      es: "Cargo con una gran culpa cuando me tachan de 'flojo' o 'informal', cuando por dentro me siento atrapado en cadenas invisibles.",
    },
  },

  // Dimension 3: Social Masking & Distraction Tactics (Q9-Q12)
  {
    id: 9,
    dimension: "social_masking_distraction",
    text: {
      en: "I instinctively use humor, rapid topic-changing, or theatrical exaggerations to deflect or buy time when facing demands.",
      id: "Aku refleks menggunakan lelucon, mengalihkan topik secara kilat, atau melebih-lebihkan cerita untuk menghindar saat dituntut sesuatu.",
      de: "Ich weiche Forderungen instinktiv mit Humor, Themenwechseln oder übertriebener Theatralik aus.",
      fr: "J'utilise instinctivement l'humour ou le changement rapide de sujet pour désamorcer ou repousser une obligation.",
      es: "Uso instintivamente el humor o el cambio de tema para desviar la conversación cuando alguien me pide algo.",
    },
  },
  {
    id: 10,
    dimension: "social_masking_distraction",
    text: {
      en: "I develop sudden somatic symptoms (intense drowsiness, stomach cramps, sudden headaches) right when a demand is presented.",
      id: "Aku tiba-tiba merasakan gejala fisik mendadak (sangat mengantuk, perut sakit, pusing berat) tepat saat sebuah tugas disodorkan.",
      de: "Ich entwickle schlagartig körperliche Symptome (Müdigkeit, Übelkeit, Kopfschmerz), sobald eine Anforderung ansteht.",
      fr: "Je développe des symptômes physiques soudains (somnolence extrême, maux de ventre) dès qu'une tâche m'est imposée.",
      es: "Desarrollo síntomas somáticos repentinos (sueño incontrolable, dolor de cabeza o estómago) justo cuando se me exige algo.",
    },
  },
  {
    id: 11,
    dimension: "social_masking_distraction",
    text: {
      en: "I feel an absolute need to maintain equal social hierarchy—I cannot tolerate feeling inferior or being talked down to.",
      id: "Aku merasa harus mempertahankan kesetaraan hierarki sosial mutlak—aku sama sekali tidak tahan direndahkan atau diperintah sepihak.",
      de: "Ich bestehe kompromisslos auf Augenhöhe und ertrage es nicht, von oben herab behandelt oder belehrt zu werden.",
      fr: "J'ai un besoin vital d'égalité hiérarchique : je ne supporte aucune condescendance ni rapport de domination.",
      es: "Necesito una igualdad de jerarquía absoluta: no tolero que nadie me hable con condescendencia ni me dé órdenes.",
    },
  },
  {
    id: 12,
    dimension: "social_masking_distraction",
    text: {
      en: "After masking and complying with demands all day, I collapse into extreme exhaustion, anger outbursts, or total social withdrawal.",
      id: "Setelah seharian pura-pura patuh (*masking*), aku tumbang dalam kelelahan ekstrem, ledakan emosi di rumah, atau menutup diri total.",
      de: "Nachdem ich den ganzen Tag Erwartungen erfüllt habe, breche ich abends in totale Erschöpfung, Wutanfälle oder Isolation zusammen.",
      fr: "Après m'être plié aux exigences toute la journée, je m'effondre dans un épuisement total, des crises de nerfs ou le repli.",
      es: "Tras pasar el día cumpliendo demandas externas, colapso en casa con agotamiento extremo, estallidos de ira o aislamiento total.",
    },
  },
];

export interface PdaProfile {
  level: PdaLevel;
  badge: Record<PdaLang, string>;
  title: Record<PdaLang, string>;
  tagline: Record<PdaLang, string>;
  description: Record<PdaLang, string>;
  clinicalInsight: Record<PdaLang, string>;
  recoveryProtocols: Record<PdaLang, string[]>;
}

export const PDA_PROFILES: Record<PdaLevel, PdaProfile> = {
  flexible_autonomy: {
    level: "flexible_autonomy",
    badge: {
      en: "Flexible Autonomy",
      id: "Otonomi Fleksibel",
      de: "Flexible Autonomie",
      fr: "Autonomie Souple",
      es: "Autonomía Flexible",
    },
    title: {
      en: "Regulated Demand Processing",
      id: "Pemrosesan Tuntutan Teratur",
      de: "Regulierte Anforderungsverarbeitung",
      fr: "Gestion Équilibrée des Exigences",
      es: "Procesamiento Equilibrado de Demandas",
    },
    tagline: {
      en: "Demands are perceived as neutral tasks rather than existential threats to self-determination.",
      id: "Tuntutan dipersepsikan sebagai tugas netral, bukan ancaman terhadap kebebasan diri.",
      de: "Anforderungen werden als neutrale Aufgaben statt als existenzielle Bedrohung wahrgenommen.",
      fr: "Les obligations sont vécues comme des tâches neutres plutôt que comme une menace vitale.",
      es: "Las demandas se perciben como tareas neutras y no como una amenaza existencial a tu libertad.",
    },
    description: {
      en: "Your autonomic nervous system exhibits high demand tolerance. You can navigate deadlines, requests from authority figures, and routine self-care without acute fight-or-flight activations.",
      id: "Sistem saraf otonom Anda memiliki toleransi tuntutan yang baik. Anda dapat mengelola tenggat waktu, permintaan rekan kerja/atasan, dan perawatan diri tanpa panik atau perlawanan emosional hebat.",
      de: "Ihr Nervensystem verfügt über eine gesunde Anforderungstoleranz. Fristen und Anweisungen lösen keine panischen Abwehrreflexe aus.",
      fr: "Votre système nerveux tolère bien les contraintes. Vous naviguez entre plannings et sollicitations sans déclencher d'alarme de panique.",
      es: "Tu sistema nervioso procesa bien las exigencias. Puedes gestionar plazos y solicitudes sin detonar respuestas de lucha o huida.",
    },
    clinicalInsight: {
      en: "In typical nervous system profiles, the ventral vagal branch remains online during requests, interpreting social collaboration rather than coercive subjugation.",
      id: "Pada profil saraf regulasi sehat, cabang vagal ventral tetap aktif saat menerima permintaan, menafsirkannya sebagai kerja sama sosial bukan perampasan kebebasan.",
      de: "Der ventrale Vagusnerv bleibt bei Anfragen aktiv und stuft Kooperation nicht als Unterdrückung ein.",
      fr: "Le système nerveux ventral maintient la sécurité relationnelle sans interpréter la demande comme une domination.",
      es: "El nervio vago ventral permanece regulado durante las peticiones, viéndolas como colaboración y no como imposición.",
    },
    recoveryProtocols: {
      en: [
        "Maintain current healthy rhythms of work and restorative leisure.",
        "Practice empathetic boundary setting when requests genuinely infringe on personal limits.",
      ],
      id: [
        "Pertahankan ritme kerja dan istirahat yang seimbang seperti saat ini.",
        "Latih penolakan sopan saat permintaan orang lain melampaui batas energimu.",
      ],
      de: [
        "Pflegen Sie weiterhin die gesunde Balance aus Pflichten und Erholung.",
        "Setzen Sie klare, freundliche Grenzen bei überzogenen Forderungen.",
      ],
      fr: [
        "Conservez votre équilibre actuel entre responsabilités et temps libre.",
        "Posez des limites claires et sereines lorsque vos capacités sont dépassées.",
      ],
      es: [
        "Mantén tu equilibrio actual entre compromisos y momentos de ocio.",
        "Establece límites asertivos cuando una solicitud sobrepase tus capacidades.",
      ],
    },
  },

  mild_demand_sensitivity: {
    level: "mild_demand_sensitivity",
    badge: {
      en: "Mild Demand Avoidance",
      id: "Sensitivitas Tuntutan Ringan",
      de: "Leichte Anforderungsempfindlichkeit",
      fr: "Sensibilité Légère aux Contraintes",
      es: "Sensibilidad Leve a Demandas",
    },
    title: {
      en: "Situational Demand Resistance",
      id: "Resistensi Tuntutan Situasional",
      de: "Situative Anforderungswiderstände",
      fr: "Résistance Situationnelle aux Exigences",
      es: "Resistencia Situacional a Exigencias",
    },
    tagline: {
      en: "Certain authoritarian tones or cluttered schedules trigger noticeable internal friction.",
      id: "Nada bicara menggurui atau jadwal padat memicu gesekan batin dan penundaan.",
      de: "Bevormundende Töne oder überladene Terminkalender erzeugen spürbaren inneren Widerstand.",
      fr: "Le ton autoritaire ou les agendas surchargés déclenchent des réticences intérieures nettes.",
      es: "Los tonos autoritarios o las agendas recargadas generan una resistencia interna considerable.",
    },
    description: {
      en: "You experience noticeable PDA traits under stress, sensory fatigue, or when demands feel micromanaged. While you generally fulfill core life duties, forced obligations trigger procrastination loops and internal resentment.",
      id: "Anda menunjukkan kecenderungan PDA saat stres, kelelahan sensorik, atau saat diatur-atur secara berlebihan. Meski tetap menjalankan kewajiban utama, paksaan memicu prokrastinasi dan kejengkelan terpendam.",
      de: "Unter Erschöpfung oder bei Mikromanagement zeigen sich deutliche PDA-Tendenzen. Sie erfüllen Pflichten, erleben aber Verzögerungsschleifen.",
      fr: "En période de fatigue ou face au micro-management, vous manifestez des réflexes d'évitement et de la procrastination défensive.",
      es: "Bajo estrés o sobrecarga sensorial, muestras rasgos claros de evitación y procrastinación ante órdenes directas.",
    },
    clinicalInsight: {
      en: "Neurodiversity research indicates that mild PDA often overlaps with high-masking ADHD: dopamine deficit makes task initiation difficult, and external pressure adds an autonomic threat layer.",
      id: "Riset neurodiversitas menunjukkan PDA ringan kerap beririsan dengan ADHD tersamar (*high-masking*): defisit dopamin mempersulit inisiasi tugas, sementara tekanan eksternal menambah sinyal bahaya pada sistem saraf.",
      de: "Leichte PDA überschneidet sich oft mit maskiertem ADHS: Dopaminmangel hemmt den Start, und äußerer Zwang triggert das Nervensystem zusätzlich.",
      fr: "Le profil PDA modéré coïncide souvent avec le TDAH masqué : le déficit dopaminergique complique le démarrage et la contrainte extérieure bloque l'action.",
      es: "El PDA leve suele solaparse con el TDAH de alto enmascaramiento: la falta de dopamina frena el inicio y la exigencia externa añade alarma nerviosa.",
    },
    recoveryProtocols: {
      en: [
        "Transform Self-Talk to Invitations: Replace 'I must finish this report' with 'I wonder what happens if I open the doc for 5 minutes.'",
        "Declarative Collaboration: Request that colleagues or partners share facts ('The dishes are in the sink') rather than direct commands.",
        "Buffer Blocks: Build 30-minute unscheduled transition buffers between meetings to prevent autonomy panic.",
      ],
      id: [
        "Ubah Dialog Batin Menjadi Undangan: Ganti 'Aku harus selesaikan laporan ini' menjadi 'Penasaran apa jadinya kalau aku buka laptop 5 menit saja.'",
        "Komunikasi Deklaratif: Minta pasangan atau rekan kerja menyampaikan fakta ('Piringnya sudah di wastafel') alih-alih perintah langsung.",
        "Jeda Buffer: Sisipkan waktu kosong 30 menit antar aktivitas untuk mencegah kepanikan otonomi.",
      ],
      de: [
        "Einladender Selbst-Dialog: Ersetzen Sie 'Ich muss...' durch 'Ich schaue mir das mal für 5 Minuten unverbindlich an.'",
        "Deklarative Absprachen: Bitten Sie Ihr Umfeld um neutrale Hinweise statt um direkte Befehle.",
        "Pufferzeiten: Planen Sie 30 Minuten Freiraum zwischen Terminen ein, um Druck abzubauen.",
      ],
      fr: [
        "Reformulation intérieure bienveillante : remplacez 'Je dois faire ceci' par 'Et si je jetais un œil pendant 5 minutes sans obligation ?'",
        "Langage déclaratif : demandez à vos proches d'énoncer des faits plutôt que des ordres.",
        "Plages de décompression : prévoyez 30 minutes sans engagement entre vos obligations.",
      ],
      es: [
        "Diálogo interno sugerente: sustituye 'Tengo que terminar esto' por 'Voy a abrir el archivo 5 minutos a ver qué surge'.",
        "Comunicación declarativa: pide a tu entorno que exponga hechos en lugar de órdenes directas.",
        "Espacios de amortiguación: reserva 30 minutos libres entre tareas para descomprimir el estrés.",
      ],
    },
  },

  moderate_pda_profile: {
    level: "moderate_pda_profile",
    badge: {
      en: "Moderate PDA Profile",
      id: "Profil PDA Menengah",
      de: "Ausgeprägtes PDA-Profil",
      fr: "Profil PDA Modéré",
      es: "Perfil PDA Significativo",
    },
    title: {
      en: "Active Autonomy Defense System",
      id: "Sistem Pertahanan Otonomi Aktif",
      de: "Aktives Autonomie-Abwehrsystem",
      fr: "Défense Active de l'Autonomie",
      es: "Defensa Activa de la Autonomía",
    },
    tagline: {
      en: "Demands frequently trigger acute neurochemical threat, leading to somatic shutdowns and task avoidance.",
      id: "Tuntutan sering memicu sinyal ancaman neurokimiawi akut, berujung pada tubuh kaku dan penolakan tugas.",
      de: "Anforderungen lösen regelmäßige Alarmsignale im Gehirn aus, die zu Lähmung und Rückzug führen.",
      fr: "Les contraintes provoquent des réactions d'alerte neurologique avec paralysie corporelle et évitement.",
      es: "Las exigencias desatan con frecuencia respuestas de alarma que paralizan la acción y fuerzan la huida.",
    },
    description: {
      en: "You exhibit classic Pathological Demand Avoidance / Pervasive Drive for Autonomy traits. Both external expectations and self-imposed goals trigger fight-or-flight paralysis. You frequently mask through humor or excuses, suffering severe exhaustion afterward.",
      id: "Anda menunjukkan karakteristik klasik Pathological Demand Avoidance / Pervasive Drive for Autonomy. Baik ekspektasi orang lain maupun target pribadi memicu kelumpuhan mental. Anda kerap menutupi dengan lelucon atau alasan fisik, yang berujung pada kelelahan luar biasa.",
      de: "Sie zeigen ein klassisches PDA-Profil. Sowohl fremde als auch eigene Erwartungen blockieren den Handlungsantrieb. Das Maskieren im Alltag kostet enorme Energie.",
      fr: "Vous présentez le tableau typique du besoin pervasif d'autonomie. Les sollicitations externes et vos propres objectifs déclenchent un blocage protecteur intense.",
      es: "Presentas los rasgos característicos de la evitación patológica de demandas. Las expectativas externas e internas te bloquean, requiriendo un alto costo de enmascaramiento.",
    },
    clinicalInsight: {
      en: "In PDA individuals, demands do not simply trigger psychological reluctance; fMRI concepts reveal amygdala hyper-reactivity perceiving demands as a loss of biological autonomy equivalent to physical entrapment.",
      id: "Pada individu PDA, tuntutan bukan sekadar keengganan psikologis; amigdala bereaksi hiperaktif dengan menganggap hilangnya kendali diri setara dengan ancaman fisik terperangkap.",
      de: "Bei PDA interpretiert die Amygdala jede Anforderung als existenziellen Kontrollverlust, der sofortige Fluchtreflexe erzwingt.",
      fr: "Pour un profil PDA, la contrainte n'est pas un refus d'obéir mais une alerte panique de l'amygdale assimilant l'ordre à un piège.",
      es: "En el PDA, la amígdala interpreta cualquier imposición como una pérdida de control biológico equivalente a una trampa física.",
    },
    recoveryProtocols: {
      en: [
        "Adopt a Low-Demand Lifestyle: Eliminate 50% of non-essential cultural demands (e.g., rigid meal schedules, unnecessary dress codes).",
        "Declarative Only Communication: Strictly eliminate imperative commands ('Do X') in home/work arrangements.",
        "Voice Reflection Without Demands: Use Nuju voice journaling without daily streak requirements—reflect only when spontaneously inspired.",
        "Autonomy-Restoring Outlets: Engage in activities with zero external evaluation (solo hiking, freeform writing, unstructured gaming).",
      ],
      id: [
        "Terapkan Gaya Hidup Rendah Tuntutan: Singkirkan 50% aturan sosial yang tidak esensial (jadwal makan kaku, tuntutan membalas chat kilat).",
        "Terapkan Komunikasi Deklaratif: Hapus kalimat perintah langsung di rumah atau lingkungan kerja.",
        "Jurnal Suara Tanpa Paksaan: Gunakan voice journal Nuju tanpa membebani diri dengan target streak harian—curhatlah hanya saat terdorong alami.",
        "Aktivitas Pemulih Otonomi: Lakukan kegiatan tanpa penilaian orang lain (jalan santai sendirian, menulis bebas, bermain game santai).",
      ],
      de: [
        "Low-Demand-Lebensstil: Streichen Sie 50 % nicht überlebensnotwendiger Anforderungen aus Ihrem Alltag.",
        "Rein deklarative Sprache: Vermeiden Sie Befehle und nutzen Sie neutrale Tatsachenbeschreibungen.",
        "Druckfreie Reflexion: Führen Sie Ihr Audio-Tagebuch völlig ohne Pflicht zur täglichen Serie.",
        "Autonomie-Oasen: Schaffen Sie Räume ohne jegliche Leistungsbewertung.",
      ],
      fr: [
        "Mode de vie 'Low Demand' : réduisez de moitié les obligations sociales superflues pour désengorger le système.",
        "Communication strictement déclarative : bannissez les impératifs dans vos échanges quotidiens.",
        "Journal vocal sans contrainte : utilisez l'application sans objectif de série quotidienne obligatoire.",
        "Espaces de liberté absolue : pratiquez des activités sans attente de résultat.",
      ],
      es: [
        "Estilo de vida de baja demanda: elimina el 50% de obligaciones artificiales que saturan tu rutina.",
        "Lenguaje puramente declarativo: erradica las órdenes imperativas en el hogar y trabajo.",
        "Diario de voz sin presión: reflexiona sin la obligación de mantener rachas diarias obligatorias.",
        "Espacios de soberanía personal: realiza actividades libres de evaluación o juicio externo.",
      ],
    },
  },

  severe_autonomy_burnout: {
    level: "severe_autonomy_burnout",
    badge: {
      en: "Severe Autonomy Burnout",
      id: "Burnout Otonomi Berat",
      de: "Schwerer PDA-Erschöpfungszustand",
      fr: "Burnout Sévère d'Autonomie",
      es: "Colapso Severo de Autonomía",
    },
    title: {
      en: "Severe PDA Autonomic Burnout",
      id: "Burnout Otonomi PDA Tingkat Berat",
      de: "Schwerer PDA-Erschöpfungszustand",
      fr: "Burnout Aigu de l'Autonomie (PDA)",
      es: "Burnout Severo por Demanda y Pérdida de Autonomía",
    },
    tagline: {
      en: "Your nervous system has entered full catatonic or explosive burnout from chronic demand coercion.",
      id: "Sistem sarafmu telah masuk ke fase burnout total (katatonik atau meledak-ledak) akibat pemaksaan tuntutan kronis.",
      de: "Ihr Nervensystem befindet sich nach chronischer Überlastung im Zustand völliger Erschöpfung und Blockade.",
      fr: "Votre organisme est en état d'épuisement critique, alternant entre sidération catatonique et crises explosives.",
      es: "Tu sistema nervioso ha entrado en agotamiento extremo por coerción crónica, alternando entre parálisis total y estallidos.",
    },
    description: {
      en: "You are in critical PDA burnout. Even basic survival functions (eating, speaking, getting out of bed) are blocked by autonomic alarm triggers. Years of trying to comply with neurotypical societal demands have exhausted your adrenal and nervous reserves. Immediate radical low-demand triage is essential.",
      id: "Anda berada dalam fase burnout PDA yang kritis. Bahkan fungsi dasar hidup (makan, berbicara, bangkit dari kasur) terhalang oleh alarm kepanikan sistem saraf. Menuruti ekspektasi sosial selama bertahun-tahun telah menguras habis energi mental Anda. Pemulihan otonomi radikal sangat mendesak.",
      de: "Sie befinden sich im akuten PDA-Burnout. Selbst basale Handlungen wie Essen oder Aufstehen lösen Alarmsignale aus. Eine radikale Reduktion aller Anforderungen ist dringend geboten.",
      fr: "Vous traversez un épuisement autistique/TDAH majeur lié au PDA. Les gestes les plus élémentaires sont bloqués. Une décharge immédiate de toutes les contraintes s'impose.",
      es: "Estás en un estado crítico de burnout por PDA. Las funciones más básicas están bloqueadas por alarmas internas. Es imperativo aplicar una reducción radical e inmediata de exigencias.",
    },
    clinicalInsight: {
      en: "Severe PDA burnout is characterized by allostatic collapse. Traditional behavioral therapies (CBT, reward charts, ABA) will cause further psychological trauma. Co-regulation, radical acceptance of incapacitation, and uncoerced autonomy restoration are the only clinically validated remedies.",
      id: "Burnout PDA berat ditandai dengan runtuhnya sistem allostasis. Terapi konvensional berbasis target/disiplin justru memperparah trauma. Ko-regulasi tanpa paksaan dan penerimaan penuh atas kondisi jeda adalah satu-satunya obat sejati.",
      de: "Schwerer PDA-Burnout verlangt den vollständigen Verzicht auf Disziplinierungsmaßnahmen. Nur bedingungslose Entlastung und Co-Regulation ermöglichen die neuronale Regeneration.",
      fr: "Le burnout PDA critique ne tolère aucune méthode comportementale basée sur l'effort. Seul le repos absolu et l'autonomie totale permettent au système nerveux de récupérer.",
      es: "El burnout severo por PDA empeora con terapias basadas en disciplina o esfuerzo. Únicamente el reposo absoluto y la libertad de demandas permiten reiniciar el sistema.",
    },
    recoveryProtocols: {
      en: [
        "Radical Low-Demand Sanctuary: Strip life to 10% essential biological survival for the next 4 to 8 weeks.",
        "Zero Coercion Environment: Eliminate all alarm clocks, schedules, and forced conversations.",
        "Nervous System Safe-Haven: Engage only in special interests and stimming without expectations of productivity.",
        "Specialized Neurodivergent Support: Work with a PDA-affirming therapist who understands Pervasive Drive for Autonomy.",
      ],
      id: [
        "Suaka Otonomi Radikal: Pangkas hidupmu hingga hanya menyisakan 10% kebutuhan biologis dasar selama 4–8 minggu ke depan.",
        "Bebas Paksaan Mutlak: Matikan semua alarm kaku, jadwal pertemuan yang membebani, dan obrolan formal yang menguras energi.",
        "Ruang Aman Saraf: Berfokuslah hanya pada hobi favorit yang menenangkan tanpa memikirkan hasil atau produktivitas.",
        "Bantuan Psikolog Afirmatif Neurodivergen: Cari terapis/psikolog yang benar-benar memahami profil PDA dan neurodiversitas.",
      ],
      de: [
        "Radikaler Schonraum: Reduzieren Sie alle Anforderungen für 4–8 Wochen auf das absolute Existenzminimum.",
        "Absolutes Zwangsverbot: Schalten Sie Wecker und Terminkalender weitestgehend ab.",
        "Spezialinteressen ausleben: Verbringen Sie Zeit mit beruhigenden Vorlieben ohne jeden Leistungsanspruch.",
        "PDA-erfahrene Therapeuten: Konsultieren Sie Fachleute mit Spezialisierung auf neurodivergente Autonomiebedürfnisse.",
      ],
      fr: [
        "Sanctuaire de décharge radicale : réduisez les sollicitations au strict minimum biologique pendant 4 à 8 semaines.",
        "Suppression totale de la contrainte : éliminez les réveils et les agendas contraignants.",
        "Plongée dans les intérêts spécifiques : laissez libre cours à vos passions apaisantes sans obligation de résultat.",
        "Prise en charge spécialisée : consultez un thérapeute formé au profil PDA et à la neurodiversité.",
      ],
      es: [
        "Santuario radical de baja demanda: reduce las exigencias al mínimo biológico vital durante 4 a 8 semanas.",
        "Cero coerción: apaga alarmas rígidas y compromisos no indispensables.",
        "Refugio en intereses especiales: dedícate a actividades placenteras sin pretensión alguna de rendimiento.",
        "Acompañamiento especializado: busca profesionales formados en neurodiversidad afirmativa y perfil PDA.",
      ],
    },
  },
};

export interface PdaScoreResult {
  totalScore: number;
  maxScore: number;
  percentage: number;
  level: PdaLevel;
  profile: PdaProfile;
  subscales: {
    autonomy_threat_panic: { score: number; max: number; percentage: number };
    internal_demand_paralysis: { score: number; max: number; percentage: number };
    social_masking_distraction: { score: number; max: number; percentage: number };
  };
}

export function calculatePdaScore(
  answers: Record<number, number>
): PdaScoreResult {
  let totalScore = 0;
  let panicScore = 0;
  let paralysisScore = 0;
  let maskingScore = 0;

  PDA_QUESTIONS.forEach((q) => {
    const val = answers[q.id] ?? 0;
    totalScore += val;
    if (q.dimension === "autonomy_threat_panic") panicScore += val;
    if (q.dimension === "internal_demand_paralysis") paralysisScore += val;
    if (q.dimension === "social_masking_distraction") maskingScore += val;
  });

  const maxScore = PDA_QUESTIONS.length * 3; // 36
  const percentage = Math.round((totalScore / maxScore) * 100);

  let level: PdaLevel = "flexible_autonomy";
  if (totalScore >= 28) {
    level = "severe_autonomy_burnout";
  } else if (totalScore >= 19) {
    level = "moderate_pda_profile";
  } else if (totalScore >= 10) {
    level = "mild_demand_sensitivity";
  } else {
    level = "flexible_autonomy";
  }

  const profile = PDA_PROFILES[level];

  return {
    totalScore,
    maxScore,
    percentage,
    level,
    profile,
    subscales: {
      autonomy_threat_panic: {
        score: panicScore,
        max: 12,
        percentage: Math.round((panicScore / 12) * 100),
      },
      internal_demand_paralysis: {
        score: paralysisScore,
        max: 12,
        percentage: Math.round((paralysisScore / 12) * 100),
      },
      social_masking_distraction: {
        score: maskingScore,
        max: 12,
        percentage: Math.round((maskingScore / 12) * 100),
      },
    },
  };
}
