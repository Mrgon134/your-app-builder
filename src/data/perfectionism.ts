export type PerfectionismLang = "en" | "id" | "de" | "fr" | "es";

export interface PerfectionismQuestion {
  id: number;
  subscale: "mistake_rumination" | "personal_standards" | "socially_prescribed";
  prompt: Record<PerfectionismLang, string>;
  options: Array<{
    score: number;
    label: Record<PerfectionismLang, string>;
  }>;
}

export interface PerfectionismProfile {
  level: "paralyzed_procrastinator" | "social_prescribed" | "hyper_critical" | "healthy_striver";
  badge: Record<PerfectionismLang, string>;
  title: Record<PerfectionismLang, string>;
  tagline: Record<PerfectionismLang, string>;
  description: Record<PerfectionismLang, string>;
  psychologyInsight: Record<PerfectionismLang, string>;
  actionProtocols: Record<PerfectionismLang, string[]>;
  dailyAffirmation: Record<PerfectionismLang, string>;
}

export interface PerfectionismScoreResult {
  totalScore: number;
  maxScore: number;
  percentage: number;
  level: "paralyzed_procrastinator" | "social_prescribed" | "hyper_critical" | "healthy_striver";
  profile: PerfectionismProfile;
  subscales: {
    mistake_rumination: { score: number; max: number; percentage: number };
    personal_standards: { score: number; max: number; percentage: number };
    socially_prescribed: { score: number; max: number; percentage: number };
  };
}

export const PERFECTIONISM_QUESTIONS: PerfectionismQuestion[] = [
  // Subscale 1: Concern Over Mistakes & Paralysis (Mistake Rumination)
  {
    id: 1,
    subscale: "mistake_rumination",
    prompt: {
      en: "When starting a complex new task or creative project, how often do you delay or freeze because you want conditions to be flawless?",
      id: "Saat hendak memulai tugas baru atau proyek kreatif, seberapa sering kamu menunda karena menunggu kondisi yang benar-benar sempurna?",
      de: "Wie oft schiebst du ein neues Projekt auf oder fühlst dich blockiert, weil du auf absolut fehlerfreie Bedingungen wartest?",
      fr: "À quelle fréquence retardez-vous un projet parce que vous attendez que toutes les conditions soient absolument parfaites ?",
      es: "¿Con qué frecuencia pospones un nuevo proyecto o te bloqueas esperando condiciones totalmente perfectas?",
    },
    options: [
      { score: 0, label: { en: "Rarely; done is better than perfect for me", id: "Jarang; selesai lebih penting daripada sempurna", de: "Selten; Erledigt ist besser als perfekt", fr: "Rarement; fait vaut mieux que parfait", es: "Raramente; hecho es mejor que perfecto" } },
      { score: 1, label: { en: "Sometimes, if the stakes are especially high", id: "Kadang-kadang, jika taruhannya tinggi", de: "Manchmal, wenn viel auf dem Spiel steht", fr: "Parfois, si l'enjeu est très important", es: "A veces, cuando hay mucho en juego" } },
      { score: 2, label: { en: "Frequently; I spend excessive time preparing to avoid flaws", id: "Sering; menghabiskan waktu lama menyiapkan agar tak ada cela", de: "Häufig; bereite mich exzessiv vor, um Fehler zu meiden", fr: "Souvent; je sur-prépare pour éviter tout faux pas", es: "Frecuentemente; me preparo en exceso para evitar fallos" } },
      { score: 3, label: { en: "Almost always; fear of producing imperfect work paralyzes me completely", id: "Hampir selalu; takut hasil tidak sempurna membuatku lumpuh menunda", de: "Fast immer; die Angst vor Unvollkommenheit lähmt mich völlig", fr: "Presque toujours; la peur de l'imperfection me paralyse", es: "Casi siempre; el miedo a lo imperfecto me paraliza del todo" } },
    ],
  },
  {
    id: 2,
    subscale: "mistake_rumination",
    prompt: {
      en: "If you make a minor, harmless mistake in public or in an email, how long does the mental replay and embarrassment haunt you?",
      id: "Jika kamu melakukan kesalahan kecil yang sepele di publik atau pesan, berapa lama rasa malu dan pikiran itu menghantuimu?",
      de: "Wenn dir ein kleiner, harmloser Fehler unterläuft, wie lange beschäftigt und beschämt dich das innerlich noch?",
      fr: "Si vous commettez une petite erreur sans conséquence, combien de temps la honte et les remords vous hantent-ils ?",
      es: "¿Si cometes un error menor e inofensivo, cuánto tiempo te persigue la vergüenza o el repaso mental?",
    },
    options: [
      { score: 0, label: { en: "Seconds; I shrug it off or quickly correct it", id: "Beberapa detik; langsung cuek atau perbaiki", de: "Sekunden; ich hake es sofort gelassen ab", fr: "Quelques secondes; je passe vite à autre chose", es: "Segundos; lo corrijo o lo olvido rápido" } },
      { score: 1, label: { en: "A few minutes, then my attention moves on", id: "Beberapa menit, lalu teralihkan hal lain", de: "Wenige Minuten, dann ist es vergessen", fr: "Quelques minutes, puis mon esprit passe à autre chose", es: "Unos minutos, y luego sigo con mi día" } },
      { score: 2, label: { en: "Hours; I feel a heavy knot in my stomach replaying the moment", id: "Berjam-jam; perut tegang memutar ulang kejadian itu", de: "Stunden; inneres Unbehagen und wiederholtes Durchspielen", fr: "Plusieurs heures; nœud à l'estomac en y repensant", es: "Horas; nudo en el estómago repasando la escena" } },
      { score: 3, label: { en: "Days or weeks; I feel like my credibility and self-worth were destroyed", id: "Berhari-hari/berminggu-minggu; merasa harga diriku runtuh seketika", de: "Tage oder Wochen; Gefühl, mein ganzer Wert sei beschädigt", fr: "Des jours ou semaines; l'impression d'avoir perdu ma valeur", es: "Días o semanas; siento que mi credibilidad fue destruida" } },
    ],
  },
  {
    id: 3,
    subscale: "mistake_rumination",
    prompt: {
      en: "Do you view constructive feedback or mild revisions as a personal attack or proof of your inadequacy?",
      id: "Apakah kamu memandang masukan konstruktif atau revisi sebagai serangan pribadi atau bukti ketidakmampuanmu?",
      de: "Siehst du konstruktives Feedback oder Korrekturen als persönlichen Angriff oder Beweis deines Versagens?",
      fr: "Percevez-vous les retours constructifs comme une attaque personnelle ou la preuve de votre incompétence ?",
      es: "¿Ves el feedback constructivo o las revisiones como un ataque personal o prueba de tu insuficiencia?",
    },
    options: [
      { score: 0, label: { en: "No, feedback is valuable data to help me grow", id: "Tidak, kritik adalah data berharga untuk berkembang", de: "Nein, Feedback ist wertvoller Lernstoff", fr: "Non, les retours m'aident à progresser", es: "No, las críticas son datos útiles para mejorar" } },
      { score: 1, label: { en: "A brief sting to my ego, but I listen objectively", id: "Agak tersengat sebentar, tapi bisa mendengar objektif", de: "Kurzer Ego-Piks, aber ich nehme es sachlich an", fr: "Une petite piqûre d'ego passagère, mais j'écoute", es: "Un leve pinchazo al ego, pero escucho con calma" } },
      { score: 2, label: { en: "Strong defensiveness and silent self-criticism", id: "Merasa defensif dan mencela diri sendiri di dalam hati", de: "Starke Abwehr und innere Selbstabwertung", fr: "Forte défensive et vive dévalorisation interne", es: "Fuerte actitud defensiva y severa autocrítica" } },
      { score: 3, label: { en: "Crushing shame; any suggested edit feels like confirmation that I am an imposter", id: "Rasa malu mendalam; satu revisi terasa seperti bukti aku penipu", de: "Zermalmende Scham; jede Kritik beweist angeblich mein Hochstapler-Sein", fr: "Honte accablante; toute retouche prouve que je suis un imposteur", es: "Vergüenza abrumadora; cualquier ajuste prueba que soy un fraude" } },
    ],
  },
  {
    id: 4,
    subscale: "mistake_rumination",
    prompt: {
      en: "How often do you find yourself caught in 'All-or-Nothing' (Binary) thinking—where anything less than 100% is considered a complete failure?",
      id: "Seberapa sering kamu terjebak dalam pola pikir 'Hitam-Putih'—di mana hasil di bawah 100% dianggap sebagai kegagalan total?",
      de: "Wie oft verfällst du in Schwarz-Weiß-Denken, wo alles unter 100 % als totales Scheitern gilt?",
      fr: "À quelle fréquence tombez-vous dans la pensée 'Tout ou Rien', où moins de 100% équivaut à un échec ?",
      es: "¿Con qué frecuencia caes en el pensamiento de 'Todo o Nada', donde menos de 100% se siente un fracaso absoluto?",
    },
    options: [
      { score: 0, label: { en: "Rarely; I celebrate 80% effort and solid progress", id: "Jarang; saya merayakan progres 80% yang baik", de: "Selten; ich feiere 80 % und soliden Fortschritt", fr: "Rarement; je célèbre 80% d'effort et les progrès", es: "Raramente; celebro el 80% y el avance continuo" } },
      { score: 1, label: { en: "Only on projects that define my core identity", id: "Hanya pada hal-hal yang sangat penting bagi identitasku", de: "Nur bei Dingen, die mir extrem wichtig sind", fr: "Seulement sur mes projets les plus cruciaux", es: "Solo en proyectos que definen mi identidad" } },
      { score: 2, label: { en: "Often; if I don't follow my diet or routine 100%, I abandon it entirely", id: "Sering; jika tidak 100% disiplin, saya merasa gagal dan berhenti total", de: "Oft; wenn eine Routine nicht perfekt läuft, breche ich sie ganz ab", fr: "Souvent; si ma routine n'est pas à 100%, j'abandonne tout", es: "A menudo; si no cumplo al 100% una rutina, la abandono" } },
      { score: 3, label: { en: "Constantly; 99% success still registers in my brain as 100% defect", id: "Terus-menerus; sukses 99% tetap terasa seperti cacat total", de: "Ständig; 99 % Erfolg fühlen sich wie 100 % Niederlage an", fr: "Constamment; 99% de réussite est perçu comme un échec complet", es: "Constantemente; 99% de éxito se registra como un defecto total" } },
    ],
  },

  // Subscale 2: High Personal Standards & Relentless Goals
  {
    id: 5,
    subscale: "personal_standards",
    prompt: {
      en: "After accomplishing a major milestone or victory, do you allow yourself to genuinely celebrate and rest?",
      id: "Setelah mencapai pencapaian besar atau kemenangan, apakah kamu memberi ruang bagi diri untuk merayakan dan istirahat?",
      de: "Gönnst du dir nach einem großen Erfolg echte Erholung und ehrliche Freude?",
      fr: "Après une grande réussite, vous accordez-vous le temps de savourer et vous reposer ?",
      es: "¿Tras lograr un objetivo importante, te permites celebrar sinceramente y descansar?",
    },
    options: [
      { score: 0, label: { en: "Yes, I deeply savor achievements and recharge", id: "Ya, saya menikmati pencapaian dan mengisi ulang energi", de: "Ja, ich genieße Erfolge und tanke bewusst auf", fr: "Oui, je savoure pleinement et recharge mes batteries", es: "Sí, disfruto el logro y descanso plenamente" } },
      { score: 1, label: { en: "I take a quick breath, but feel eager to continue", id: "Tarik napas sejenak, lalu antusias melanjutkan", de: "Kurzes Durchatmen, dann geht es weiter", fr: "Une courte pause, puis je poursuis ma lancée", es: "Una breve pausa, y luego sigo con ganas" } },
      { score: 2, label: { en: "Barely; relief lasts 10 minutes before anxiety about the next goal sets in", id: "Nyaris tidak; rasa lega hanya 10 menit sebelum cemas target berikutnya", de: "Kaum; Erleichterung währt 10 Minuten vor nächster Unruhe", fr: "À peine; le soulagement dure 10 min avant la prochaine anxiété", es: "Apenas; el alivio dura 10 minutos antes de la siguiente ansiedad" } },
      { score: 3, label: { en: "Never; the goalpost instantly moves and I immediately feel behind again", id: "Tidak pernah; standar langsung dinaikkan dan merasa tertinggal lagi", de: "Nie; die Latte wird sofort höher gelegt, fühle mich im Rückstand", fr: "Jamais; la barre monte aussitôt et je me sens déjà en retard", es: "Nunca; la meta se aleja al instante y me siento rezagado de nuevo" } },
    ],
  },
  {
    id: 6,
    subscale: "personal_standards",
    prompt: {
      en: "Do your self-imposed standards for daily productivity leave you feeling chronically exhausted or guilty when relaxing?",
      id: "Apakah standar produktivitas yang kamu buat sendiri membuatmu lelah kronis atau merasa bersalah saat santai?",
      de: "Führen deine eigenen Leistungsansprüche zu chronischer Erschöpfung oder Schuldgefühlen beim Entspannen?",
      fr: "Vos propres exigences de productivité vous font-elles culpabiliser dès que vous vous détendez ?",
      es: "¿Tus propios estándares de productividad te generan culpa cada vez que intentas relajarte?",
    },
    options: [
      { score: 0, label: { en: "No, I value restorative rest without self-judgment", id: "Tidak, saya menghargai istirahat tanpa rasa bersalah", de: "Nein, ich schätze Erholung ohne schlechtes Gewissen", fr: "Non, je me repose sereinement sans culpabilité", es: "No, valoro el descanso reparador sin culpa" } },
      { score: 1, label: { en: "Occasionally I think of my to-do list, but can unplug", id: "Kadang teringat daftar tugas, tapi tetap bisa santai", de: "Denke manchmal an To-dos, kann aber abschalten", fr: "Je pense parfois à ma liste, mais je décroche", es: "A veces pienso en pendientes, pero logro desconectar" } },
      { score: 2, label: { en: "Frequently; downtime feels like 'wasted time' I must optimize", id: "Sering; waktu luang terasa seperti 'waktu terbuang' yang harus dioptimasi", de: "Häufig; Freizeit fühlt sich wie verschwendete Zeit an", fr: "Souvent; le temps libre ressemble à du temps perdu à rentabiliser", es: "A menudo; el ocio me parece tiempo perdido que debo aprovechar" } },
      { score: 3, label: { en: "Constant guilt; resting triggers deep anxiety and feelings of worthlessness", id: "Rasa bersalah konstan; rebahan memicu kecemasan bahwa aku tak berguna", de: "Dauernde Schuld; Nichtstun erzeugt Panik und Minderwertigkeitsgefühle", fr: "Culpabilité permanente; le repos provoque anxiété et sentiment de vide", es: "Culpa constante; descansar me genera ansiedad y vacío personal" } },
    ],
  },
  {
    id: 7,
    subscale: "personal_standards",
    prompt: {
      en: "Do you struggle to delegate tasks to colleagues or partners because 'nobody can do it as accurately or thoroughly as me'?",
      id: "Apakah kamu kesulitan mendelegasikan tugas ke rekan/pasangan karena merasa 'tidak ada yang bisa melakukannya serapi aku'?",
      de: "Fällt es dir schwer, Aufgaben abzugeben, weil 'niemand es so gründlich macht wie ich'?",
      fr: "Avez-vous du mal à déléguer parce que 'personne ne le fera aussi bien et minutieusement que moi' ?",
      es: "¿Te cuesta delegar tareas porque sientes que 'nadie lo hará tan bien o detallado como yo'?",
    },
    options: [
      { score: 0, label: { en: "I delegate freely and accept varying styles", id: "Mudah mendelegasikan dan menghargai gaya orang lain", de: "Ich delegiere gerne und akzeptiere andere Herangehensweisen", fr: "Je délègue aisément et accepte d'autres méthodes", es: "Delego con facilidad y acepto estilos distintos" } },
      { score: 1, label: { en: "I give clear guidelines and check in periodically", id: "Memberi arahan jelas dan mengecek berkala", de: "Gebe klare Richtlinien und schaue gelegentlich nach", fr: "Je donne des instructions claires et fais le point", es: "Doy pautas claras y reviso de vez en cuando" } },
      { score: 2, label: { en: "I micromanage or end up redoing their work late at night", id: "Sering mengecek berlebihan atau diam-diam mengulang kerjaan mereka", de: "Kontrolliere zu viel oder mache nachts heimlich alles neu", fr: "Je micro-gère ou finis par refaire le travail en douce", es: "Superviso en exceso o termino rehaciendo todo por la noche" } },
      { score: 3, label: { en: "I refuse to delegate anything; doing it all myself is the only way to avoid catastrophic errors", id: "Menolak mendelegasikan apa pun; harus kukerjakan sendiri agar tak cacat", de: "Lehne Delegieren ab; nur Selbstmachen verhindert Katastrophen", fr: "Je refuse de déléguer; tout faire moi-même est la seule issue sûre", es: "Me niego a delegar; hacerlo todo yo es la única garantía de orden" } },
    ],
  },
  {
    id: 8,
    subscale: "personal_standards",
    prompt: {
      en: "How heavily is your personal sense of worth tied to your career, output, or academic performance?",
      id: "Seberapa besar harga dirimu bergantung pada karir, output produktivitas, atau prestasi akademis?",
      de: "Wie stark ist dein Selbstwert an Karriere, Produktivität oder Leistung gekoppelt?",
      fr: "À quel point votre estime personnelle dépend-elle de vos résultats et de votre productivité ?",
      es: "¿En qué medida tu autoestima depende de tus logros laborales, académicos o productividad?",
    },
    options: [
      { score: 0, label: { en: "Hardly; my worth is intrinsic, independent of productivity", id: "Kecil; harga diriku ada terlepas dari seberapa produktif diriku", de: "Kaum; mein Wert ist unabhängig von bloßer Leistung", fr: "Peu; ma valeur existe au-delà de mes résultats", es: "Poco; mi valía es intrínseca, más allá de mis resultados" } },
      { score: 1, label: { en: "Moderately; doing good work feels great, but doesn't define me entirely", id: "Wajar; prestasi terasa menyenangkan tapi bukan segalanya", de: "Moderat; gute Arbeit freut mich, definiert mich aber nicht ganz", fr: "Modérément; j'aime réussir mais cela ne me résume pas", es: "Moderadamente; disfruto destacar pero no me define por entero" } },
      { score: 2, label: { en: "Strongly; an unproductive day makes me feel like a total failure", id: "Kuat; hari yang kurang produktif membuatku merasa payah", de: "Stark; ein unproduktiver Tag lässt mich wertlos fühlen", fr: "Fortement; une journée non productive me fait me sentir nul", es: "Fuertemente; un día improductivo me hace sentir un fracaso" } },
      { score: 3, label: { en: "Completely; I have no identity or peace outside of constant high performance", id: "Mutlak; saya tak punya ketenangan tanpa performa tinggi konstan", de: "Vollständig; ohne Höchstleistung fühle ich reine innere Leere", fr: "Complètement; sans performance permanente, je ne suis rien", es: "Totalmente; sin alto rendimiento constante no siento paz ni identidad" } },
    ],
  },

  // Subscale 3: Socially Prescribed Perfectionism (Fear of Judgment & Pleasing)
  {
    id: 9,
    subscale: "socially_prescribed",
    prompt: {
      en: "Do you believe that others (parents, boss, peers, partner) will withdraw their love, respect, or approval if you appear weak or flawed?",
      id: "Apakah kamu merasa orang lain (orang tua, atasan, pasangan) akan mengurangi rasa sayang/hormat jika kamu terlihat lemah atau cacat?",
      de: "Glaubst du, dass andere ihren Respekt oder ihre Zuneigung entziehen, wenn du Schwächen zeigst?",
      fr: "Pensez-vous que les autres vous aimeront ou vous respecteront moins si vous montrez vos failles ?",
      es: "¿Crees que los demás te retirarán su aprecio o respeto si muestras debilidades o errores?",
    },
    options: [
      { score: 0, label: { en: "No, the people in my life accept my genuine human imperfections", id: "Tidak, orang terdekat menerima ketidaksempurnaanku", de: "Nein, meine Lieben schätzen mich auch mit Fehlern", fr: "Non, mes proches m'aiment avec mes imperfections", es: "No, las personas cercanas me valoran con mis imperfecciones" } },
      { score: 1, label: { en: "Occasionally with professional acquaintances, but not loved ones", id: "Hanya sesekali di lingkungan kerja profesional", de: "Gelegentlich beruflich, aber nicht privat", fr: "Parfois au travail, mais pas dans ma vie privée", es: "A veces en el trabajo, pero no con seres queridos" } },
      { score: 2, label: { en: "Often; I wear an emotional mask so no one sees how exhausted I really am", id: "Sering; memakai topeng agar tak ada yang tahu betapa lelahnya diriku", de: "Oft; trage eine Maske, damit niemand meine Erschöpfung sieht", fr: "Souvent; je porte un masque pour cacher ma fatigue réelle", es: "A menudo; uso una máscara para que nadie note mi agotamiento" } },
      { score: 3, label: { en: "Constantly; I am convinced love is conditional upon being flawless and useful", id: "Selalu; yakin bahwa kasih sayang orang lain bersyarat pada kesempurnaan", de: "Ständig; überzeugt, dass Liebe an makellose Leistung geknüpft ist", fr: "Constamment; persuadé que l'amour dépend de ma perfection absolue", es: "Constantemente; convencido de que el afecto depende de ser intachable" } },
    ],
  },
  {
    id: 10,
    subscale: "socially_prescribed",
    prompt: {
      en: "How intense is your fear of looking foolish, unprepared, or ordinary in front of other people?",
      id: "Seberapa intens ketakutanmu terlihat bodoh, tidak siap, atau biasa-biasa saja di hadapan orang lain?",
      de: "Wie groß ist deine Angst, vor anderen unvorbereitet, dumm oder mittelmäßig zu wirken?",
      fr: "Quelle est l'intensité de votre peur de paraître ridicule, impréparé ou moyen devant autrui ?",
      es: "¿Qué tan intenso es tu miedo a parecer poco preparado, torpe o mediocre ante otros?",
    },
    options: [
      { score: 0, label: { en: "Low; I am comfortable being human and laugh at myself", id: "Rendah; santai saja dan bisa menertawakan kelucuan diri", de: "Gering; ich kann herzlich über mich selbst lachen", fr: "Faible; je ris volontiers de mes maladresses", es: "Bajo; soy humano y me río de mis tropiezos" } },
      { score: 1, label: { en: "Mild performance jitters that pass quickly", id: "Gugup wajar sebelum tampil yang cepat hilang", de: "Leichte Nervosität, die schnell verfliegt", fr: "Un petit trac classique qui s'estompe vite", es: "Nervios normales antes de exponerme que pasan rápido" } },
      { score: 2, label: { en: "High; I spend immense energy rehearsing my speech and appearance", id: "Tinggi; menghabiskan banyak energi latihan bicara & jaga penampilan", de: "Hoch; investiere viel Energie in Proben und Fassade", fr: "Élevée; je passe beaucoup d'énergie à répéter et contrôler", es: "Alto; gasto mucha energía ensayando qué decir y cómo lucir" } },
      { score: 3, label: { en: "Terrifying; looking incompetent feels like social death", id: "Sangat mengerikan; terlihat tidak kompeten terasa seperti kehancuran sosial", de: "Panisch; inkompetent zu wirken fühlt sich wie sozialer Tod an", fr: "Terrifiant; paraître incompétent ressemble à une mort sociale", es: "Aterrador; parecer incompetente se siente como la muerte social" } },
    ],
  },
  {
    id: 11,
    subscale: "socially_prescribed",
    prompt: {
      en: "Do you say 'yes' to overwhelming demands or favors because you fear saying 'no' will make people think you are incapable or selfish?",
      id: "Apakah kamu mengiyakan permintaan orang yang membebani karena takut menolak akan membuatmu dicap tidak becus atau egois?",
      de: "Sagst du zu oft 'Ja' zu Überlastung, aus Angst, als egoistisch oder unfähig zu gelten?",
      fr: "Dites-vous 'oui' à des demandes écrasantes de peur d'être jugé incapable ou égoïste en disant non ?",
      es: "¿Dices 'sí' a demandas excesivas por miedo a que un 'no' te haga ver egoísta o incapaz?",
    },
    options: [
      { score: 0, label: { en: "No, my boundaries are clean and firm", id: "Tidak, batasan saya jelas dan tegas", de: "Nein, meine Grenzen sind klar und stabil", fr: "Non, mes limites sont saines et affirmées", es: "No, mis límites son claros y firmes" } },
      { score: 1, label: { en: "Sometimes, if it's someone very dear to me", id: "Kadang-kadang, jika itu orang yang sangat dekat", de: "Manchmal bei Menschen, die mir sehr nahestehen", fr: "Parfois, envers des personnes très chères", es: "A veces, solo con personas muy queridas" } },
      { score: 2, label: { en: "Often; I sacrifice sleep and sanity to avoid disappointing anyone", id: "Sering; mengorbankan tidur demi tidak mengecewakan siapapun", de: "Oft; opfere Schlaf, um niemanden zu enttäuschen", fr: "Souvent; je sacrifie mon sommeil pour ne décevoir personne", es: "A menudo; sacrifico mi descanso para no decepcionar a nadie" } },
      { score: 3, label: { en: "Chronically; I feel responsible for everyone's happiness and opinion of me", id: "Kronis; merasa bertanggung jawab atas kebahagiaan & opini semua orang", de: "Chronisch; fühle mich für die Gefühle aller verantwortlich", fr: "Chronique; je me sens responsable du bonheur de tout le monde", es: "Crónico; me siento responsable de la felicidad y opinión de todos" } },
    ],
  },
  {
    id: 12,
    subscale: "socially_prescribed",
    prompt: {
      en: "When you observe someone else succeeding effortlessly, what is your involuntary gut reaction?",
      id: "Saat melihat orang lain sukses dengan tampak mudah, apa reaksi spontan pertamamu di dalam hati?",
      de: "Wenn du siehst, wie andere mühelos Erfolg haben, was ist deine spontane Reaktion?",
      fr: "Quand vous voyez quelqu'un réussir avec aisance, quelle est votre première réaction intérieure ?",
      es: "¿Cuando ves a alguien tener éxito sin esfuerzo aparente, cuál es tu reacción instintiva?",
    },
    options: [
      { score: 0, label: { en: "Genuine inspiration and happiness for their journey", id: "Inspirasi tulus dan ikut senang untuk mereka", de: "Ehrliche Inspiration und Mitfreude", fr: "Inspiration sincère et joie pour leur parcours", es: "Inspiración sincera y alegría por su camino" } },
      { score: 1, label: { en: "A momentary pinch of comparison, quickly replaced by perspective", id: "Sedikit membandingkan sebentar, lalu kembali objektif", de: "Kurzer Vergleich, schnell durch Vernunft relativiert", fr: "Légère comparaison passagère vite relativisée", es: "Breve comparación que relativizo con rapidez" } },
      { score: 2, label: { en: "Intense anxiety that I am falling hopelessly behind in life", id: "Kecemasan intens bahwa diriku tertinggal jauh di belakang", de: "Starke Unruhe, im Leben hoffnungslos zurückzufallen", fr: "Vive anxiété de prendre un retard irrattrapable dans la vie", es: "Fuerte angustia de estar quedándome atrás en la vida" } },
      { score: 3, label: { en: "Bitter inadequacy; their win feels like active proof of my personal failure", id: "Rasa minder menusuk; sukses mereka terasa seperti bukti kegagalanku", de: "Bittere Minderwertigkeit; ihr Sieg beweist mein Versagen", fr: "Sentiment d'infériorité cuisant; leur succès prouve mon échec", es: "Amarga inferioridad; su triunfo se siente como prueba de mi fracaso" } },
    ],
  },
];

export const PERFECTIONISM_PROFILES: Record<string, PerfectionismProfile> = {
  paralyzed_procrastinator: {
    level: "paralyzed_procrastinator",
    badge: {
      en: "THE PARALYZED PROCRASTINATOR",
      id: "PERFEKSIONIS PROKRASTINATOR (FREEZE)",
      de: "DER GELÄHMTE AUFSCHIEBER",
      fr: "LE PROCRASTINATEUR PARALYSÉ",
      es: "EL PROCRASTINADOR PARALIZADO",
    },
    title: {
      en: "Paralyzed by Perfection & Fear of Failure",
      id: "Lumpuh Prokrastinasi Akibat Takut Gagal",
      de: "Gelähmt durch Perfektionismus & Fehlerangst",
      fr: "Paralysé par le perfectionnisme & la peur d'échouer",
      es: "Paralizado por el perfeccionismo y miedo al error",
    },
    tagline: {
      en: "Your procrastination is not laziness—it is an acute emotional shield against imperfect outcomes.",
      id: "Prokrastinasimu bukan kemalasan—ini adalah perisai emosional melawan rasa takut salah.",
      de: "Dein Aufschieben ist keine Faulheit, sondern ein Schutzschild gegen Unvollkommenheit.",
      fr: "Votre procrastination n'est pas de la paresse, mais un bouclier contre l'imperfection.",
      es: "Tu procrastinación no es pereza: es un escudo emocional frente al miedo a fallar.",
    },
    description: {
      en: "You hold immensely high standards, but the terrifying prospect of producing a flawed first draft freezes your nervous system in a fight-or-flight freeze loop. You research, organize, and endlessly prepare, waiting for ideal inspiration before taking action. Underneath the delayed deadlines lies a core conviction: 'If I don't try fully, my true worth cannot be judged.'",
      id: "Kamu memiliki standar kualitas yang sangat tinggi, namun bayangan bahwa karyamu mungkin cacat membuat sarafmu masuk mode freeze. Kamu terus meneliti, merapikan meja, dan mencari inspirasi ideal sebelum berani memulai. Di balik prokrastinasi ini ada keyakinan tak sadar: 'Kalau aku belum mulai, harga diriku belum bisa dinilai.'",
      de: "Du hegst außergewöhnlich hohe Ansprüche, doch die Furcht vor unvollkommenen ersten Schritten versetzt dein Nervensystem in eine Schockstarre. Du recherchierst und organisierst endlos, um Fehler von vornherein auszuschließen. Dahinter liegt der Schutzgedanke: 'Solange ich nicht abgebe, kann mein wahrer Wert nicht angegriffen werden.'",
      fr: "Vous avez des exigences très élevées, mais l'idée même d'un premier jet imparfait paralyse votre système nerveux. Vous sur-préparez et documentez à l'infini en attendant l'instant parfait. Votre inconscient cherche à vous protéger : 'Tant que je ne produis rien, personne ne peut mesurer mes limites.'",
      es: "Tienes estándares muy altos, pero el miedo a un primer intento imperfecto congela tu sistema nervioso. Investigas y planificas sin fin esperando el momento óptimo. En el fondo opera un mecanismo de defensa: 'Si no lo intento al 100%, nadie puede juzgar mi verdadera capacidad.'",
    },
    psychologyInsight: {
      en: "Clinical research shows maladaptive perfectionists register mistakes in the Anterior Cingulate Cortex (ACC) as physical threats. Procrastination is a dopaminergic avoidance maneuver to protect self-esteem from anticipated judgment.",
      id: "Riset klinis menunjukkan bahwa perfeksionis maladaptif memproses kesalahan di Anterior Cingulate Cortex (ACC) layaknya ancaman fisik nyata. Menunda adalah manuver bawah sadar untuk melindungi harga diri dari rasa malu.",
      de: "Studien belegen, dass fehlerbezogener Perfektionismus im Gehirn als akuter Schmerzreiz feuert. Prokrastination dient dabei als unbewusste Vermeidungsstrategie, um das Ego vor Beschämung zu schützen.",
      fr: "Les neurosciences démontrent que l'erreur est perçue par le cortex cingulaire antérieur comme une menace physique. La procrastination est une esquive dopaminergique pour préserver l'estime de soi.",
      es: "La investigación clínica revela que el error se procesa en el cerebro como una amenaza física. Posponer tareas es una maniobra inconsciente para proteger la autoestima del juicio ajeno.",
    },
    actionProtocols: {
      en: [
        "The Ugly First Draft Rule: Give yourself explicit permission to write or build something objectively terrible for the first 15 minutes.",
        "Micro-Dosing Imperfection: Intentionally leave a tiny harmless typo in a personal message or unorganized drawer to desensitize your panic circuit.",
        "5-Minute Action Sprint: Set a physical visual timer for 300 seconds and commit to only starting, with zero obligation to finish.",
      ],
      id: [
        "Aturan Draft Pertama yang Jelek: Izinkan dirimu secara sadar membuat karya pertama yang berantakan selama 15 menit awal.",
        "Latihan Imun Ketidaksempurnaan: Sengaja biarkan satu hal kecil tidak sempurna (misal folder belum rapi) untuk melatih saraf menerima toleransi.",
        "Sprint 5 Menit: Pasang timer 300 detik dan fokus hanya pada sentuhan pertama tanpa beban harus langsung tuntas.",
      ],
      de: [
        "Die 'Hässlicher-Erster-Entwurf'-Regel: Gib dir bewusst die Erlaubnis, 15 Minuten lang etwas nachweislich Unvollkommenes zu schaffen.",
        "Mikrodosierung von Imperfektion: Lass bewusst eine kleine Unordnung zu, um deinen inneren Alarmfilter zu beruhigen.",
        "5-Minuten-Sprint: Stelle einen Wecker auf 300 Sekunden und fange ohne Fertigstellungsdruck an.",
      ],
      fr: [
        "La règle du premier jet imparfait : accordez-vous 15 minutes pour produire quelque chose de délibérément brouillon.",
        "Micro-exposition à l'imperfection : laissez volontairement un petit détail imparfait pour apaiser votre système d'alarme.",
        "Sprint d'action de 5 minutes : lancez un chrono de 300 secondes avec la seule consigne de commencer sans obligation de résultat.",
      ],
      es: [
        "Regla del borrador imperfecto: date permiso explícito para crear algo tosco durante los primeros 15 minutos.",
        "Microdosis de imperfección: tolera intencionalmente un detalle menor sin corregir para habituar a tu mente.",
        "Sprint de 5 minutos: activa un temporizador de 300 segundos centrado solo en arrancar, sin exigencia de terminar.",
      ],
    },
    dailyAffirmation: {
      en: "My worth is inherent, not negotiated by my output. Done and human is infinitely superior to perfect and imaginary.",
      id: "Harga diriku utuh sejak lahir, bukan ditentukan oleh hasil karyaku. Selesai dan manusiawi jauh lebih mulia daripada sempurna tapi cuma di angan-angan.",
      de: "Mein Wert ist unantastbar und hängt nicht von Ergebnissen ab. Unvollkommen vollendet ist wertvoller als perfekt erträumt.",
      fr: "Ma valeur est intrinsèque et ne dépend pas de mes exploits. Fait et imparfait vaut infiniment mieux qu'idéal et imaginaire.",
      es: "Mi valor es intrínseco y no depende de mi rendimiento. Realizado e imperfecto supera a lo perfecto imaginado.",
    },
  },

  social_prescribed: {
    level: "social_prescribed",
    badge: {
      en: "THE SOCIALLY PRESCRIBED PERFECTIONIST",
      id: "PERFEKSIONIS SOSIAL (PEOPLE-PLEASING)",
      de: "DER SOZIAL GETRIEBENE PERFEKTIONIST",
      fr: "LE PERFECTIONNISTE DÉPENDANT DU REGARD D'AUTRUI",
      es: "EL PERFECCIONISTA SOCIAL",
    },
    title: {
      en: "Hyper-Vigilant to External Expectations",
      id: "Terjebak Ekspektasi & Ketakutan Mengecewakan Orang Lain",
      de: "Getrieben von äußeren Erwartungen & Bestätigung",
      fr: "Sous le joug du regard et des attentes des autres",
      es: "Esclavo de las expectativas y la aprobación ajena",
    },
    tagline: {
      en: "You don't just want excellence—you feel a terrifying duty to never let anyone down.",
      id: "Bukan sekadar ingin bagus—kamu memikul beban mengerikan untuk tidak pernah mengecewakan siapapun.",
      de: "Es geht dir nicht nur um Qualität, sondern um die Panik, andere zu enttäuschen.",
      fr: "Votre quête n'est pas que l'excellence, c'est l'angoisse viscérale de décevoir.",
      es: "No buscas solo calidad: cargas con el terror constante de decepcionar a alguien.",
    },
    description: {
      en: "You have internalized an unyielding script: 'If I am exceptional, I am safe and loved. If I stumble, I will be rejected.' You say yes when you are drowning, rehearse conversations endlessly, and scan rooms for subtle micro-expressions of disapproval. This brand of perfectionism carries the highest statistical correlation with burnout and chronic anxiety.",
      id: "Kamu menginternalisasi keyakinan: 'Kalau aku luar biasa, aku aman dan dicintai. Kalau aku gagal, aku akan ditinggalkan.' Kamu selalu mengiyakan permintaan orang saat energimu habis, melatih kata-kata sebelum bicara, dan cemas berlebih memikirkan opini orang lain. Tipe ini paling rentan memicu burnout dan kelelahan mental.",
      de: "Tief verinnerlicht sitzt der Glaubenssatz: 'Nur wenn ich makellos leiste, bin ich liebenswert.' Du sagst 'Ja', obwohl du erschöpft bist, spielst Dialoge im Kopf durch und fürchtest jede missbilligende Miene. Dies birgt das höchste Risiko für chronischen Burnout.",
      fr: "Vous avez ancré la croyance suivante : 'Si je suis parfait, je suis en sécurité ; si je flanche, je serai rejeté'. Vous dites oui alors que vous êtes à bout de souffle et sur-analysez les moindres réactions de votre entourage.",
      es: "Has interiorizado el mandato: 'Si soy impecable, seré querido; si fallo, seré rechazado'. Dices sí estando al límite y escaneas constantemente la aprobación ajena, viviendo en tensión continua.",
    },
    psychologyInsight: {
      en: "Socially Prescribed Perfectionism (Hewitt & Flett, 1991) is an externalized locus of self-worth. It triggers continuous cortisol secretion because you are attempting to control an uncontrollable variable: other people's perceptions.",
      id: "Socially Prescribed Perfectionism adalah kondisi di mana nilai diri digantungkan ke luar. Tubuh memproduksi kortisol tinggi terus-menerus karena kamu berusaha mengontrol hal yang mustahil: persepsi dan pikiran orang lain.",
      de: "Fremdbestimmter Perfektionismus verlagert den Selbstwert komplett nach außen. Der Körper schüttet dauerhaft Cortisol aus, weil du versuchst, etwas Unkontrollierbares zu steuern: die Gedanken anderer.",
      fr: "Le perfectionnisme socialement prescrit déplace l'estime de soi vers l'extérieur, maintenant un taux de cortisol élevé pour tenter de contrôler l'incontrôlable : l'avis d'autrui.",
      es: "Este perfil sitúa el valor propio fuera de uno mismo, liberando cortisol de forma crónica al intentar controlar lo incontrolable: la mirada y opinión de los demás.",
    },
    actionProtocols: {
      en: [
        "The 24-Hour Decision Buffer: When asked for a favor, never say yes instantly. Use the script: 'Let me check my bandwidth and get back to you by tomorrow.'",
        "Disappoint Someone on Purpose: Practice minor boundary setting where someone experiences mild inconvenience without your world crumbling.",
        "Internal Worth Auditing: Write down 3 personal qualities you admire about yourself that have zero connection to your achievements or utility to others.",
      ],
      id: [
        "Jeda 24 Jam: Jangan langsung bilang ya saat diminta tolong. Gunakan kalimat: 'Aku cek jadwalku dulu ya, besok siang aku kabari.'",
        "Latihan Kecewakan Secara Sadar: Mulai tolak satu hal sepele untuk menyadarkan otakmu bahwa penolakan sehat tidak akan menghancurkan hubungan.",
        "Audit Nilai Diri: Catat 3 kualitas diri yang kamu hargai yang sama sekali tidak berhubungan dengan pekerjaan atau seberapa berguna dirimu bagi orang lain.",
      ],
      de: [
        "Die 24-Stunden-Bedenkzeit: Antworte bei Anfragen nie sofort mit Ja: 'Ich prüfe meine Kapazitäten und melde mich morgen früh.'",
        "Kleine Enttäuschungen zulassen: Setze eine klare Grenze und beobachte, dass die Welt trotz leichtem Stirnrunzeln nicht untergeht.",
        "Innerer Wert-Audit: Notiere 3 Eigenschaften an dir, die rein gar nichts mit Leistung oder Nutzen für andere zu tun haben.",
      ],
      fr: [
        "Le délai tampon de 24h : ne dites plus jamais oui immédiatement. Répondez : 'Je vérifie mes disponibilités et je te confirme demain'.",
        "Oser décevoir à petite dose : posez un refus serein sur une demande secondaire pour constater que le lien survit sans drame.",
        "Audit de valeur intrinsèque : écrivez 3 qualités personnelles qui n'ont aucun rapport avec votre utilité ou votre travail.",
      ],
      es: [
        "Pausa de 24 horas: no aceptes compromisos al instante. Responde: 'Reviso mi agenda y te confirmo mañana con calma'.",
        "Permitir decepciones menores: practica decir no a peticiones no esenciales para comprobar que el mundo no se acaba.",
        "Auditoría de valía interna: anota 3 virtudes tuyas que no tengan nada que ver con logros o con servir a otros.",
      ],
    },
    dailyAffirmation: {
      en: "I am allowed to take up space without proving my usefulness. Other people's emotional reactions are theirs to manage.",
      id: "Aku berhak ada di dunia ini tanpa harus terus membuktikan kegunaanku. Emosi dan opini orang lain adalah tanggung jawab mereka sendiri.",
      de: "Ich darf Raum einnehmen, ohne meinen Nutzen beweisen zu müssen. Die Gefühle anderer liegen in deren Verantwortung.",
      fr: "J'ai le droit d'exister sans prouver constamment mon utilité. Les réactions d'autrui leur appartiennent.",
      es: "Tengo derecho a existir sin tener que justificar mi utilidad. Las reacciones ajenas no son mi responsabilidad.",
    },
  },

  hyper_critical: {
    level: "hyper_critical",
    badge: {
      en: "THE HYPER-CRITICAL ACHIEVER",
      id: "ACHIEVER HIPER-KRITIS (MOVING GOALPOST)",
      de: "DER HYPERKRITISCHE LEISTUNGSTRÄGER",
      fr: "L'ACHIEVER HYPER-CRITIQUE",
      es: "EL TRIUNFADOR HIPER-CRÍTICO",
    },
    title: {
      en: "The Hyper-Critical Achiever & Moving Goalpost",
      id: "Sang Pencapai yang Tak Pernah Merasa Cukup",
      de: "Der unersättliche Perfektionist am wandernden Ziel",
      fr: "L'insatisfait chronique aux exigences sans fin",
      es: "El triunfador insatisfecho de metas inalcanzables",
    },
    tagline: {
      en: "You achieve extraordinary milestones, yet your brain immediately discounts them and demands more.",
      id: "Kamu meraih prestasi luar biasa, namun kepalamu langsung menganggapnya remeh dan menuntut lebih banyak.",
      de: "Du erreichst Großes, doch dein Verstand entwertet es sofort und fordert das Nächste.",
      fr: "Vous accomplissez de grandes choses, mais votre esprit les banalise aussitôt pour exiger davantage.",
      es: "Consigues logros notables, pero tu mente los minimiza de inmediato y te exige el doble.",
    },
    description: {
      en: "To the outside world, you are a machine of discipline and brilliance. Inside, however, your inner judge runs a totalitarian regime. Whenever you win, you label it luck, easy, or overdue. If you spot a 1% flaw, that 1% eclipses the 99% triumph. You suffer from chronic goalpost-shifting, meaning the feeling of peaceful satisfaction is perpetually just out of reach.",
      id: "Di mata orang luar, kamu adalah teladan disiplin dan kecerdasan. Namun di dalam kepalamu, ada hakim internal yang sangat kejam. Setiap kali kamu menang, kamu menganggapnya keberuntungan atau hal biasa. Begitu ada 1% cacat, cacat itu menelan seluruh 99% keberhasilanmu. Kamu menderita sindrom target yang terus digeser tanpa jeda istirahat.",
      de: "Nach außen wirkst du diszipliniert und bewundernswert. Innerlich herrscht jedoch ein unbarmherziger Richter. Erfolge tust du als Glück ab; jeder noch so kleine Makel überschattet das Gesamtergebnis. Die ersehnte Zufriedenheit wird stets in die Zukunft verschoben.",
      fr: "Aux yeux de tous, vous êtes un modèle d'efficacité. Intérieurement, votre critique interne ne vous laisse aucun répit. Une réussite est vite qualifiée de chance, tandis qu'un détail manqué efface 99% de satisfaction.",
      es: "Para los demás eres un ejemplo de disciplina. Por dentro, tu crítico interno nunca descansa. Un triunfo se tilda de suerte y un minúsculo detalle defectuoso eclipsa todo el esfuerzo.",
    },
    psychologyInsight: {
      en: "This pattern represents maladaptive self-oriented perfectionism. Dopamine receptors desensitize rapidly because accomplishments are never integrated emotionally through gratitude or rest, producing hedonic treadmill exhaustion.",
      id: "Pola ini mencerminkan perfeksionisme self-oriented maladaptif. Reseptor dopamin cepat kebas karena pencapaian tidak pernah diintegrasikan secara emosional lewat syukur dan rehat, memicu kelelahan pada 'treadmill kepuasan'.",
      de: "Dieses Muster kennzeichnet selbstorientierten Perfektionismus. Dopaminbelohnungen verpuffen sofort, weil Erfolge nie emotional verarbeitet werden – die klassische Tretmühlen-Erschöpfung.",
      fr: "Ce profil traduit un perfectionnisme autocentré rigide. L'absence d'intégration émotionnelle des succès épuise les circuits dopaminergiques dans une course sans fin.",
      es: "Este patrón evidencia un perfeccionismo autoimpuesto rígido. Al no asimilar emocionalmente las victorias, los receptores de dopamina se agotan en una rueda sin fin.",
    },
    actionProtocols: {
      en: [
        "The Mandatory 72-Hour Celebration Window: When an objective is met, forbid yourself from planning the next conquest for 3 full days. Practice active savoring.",
        "The Evidence Cross-Examination: When your inner critic says 'anyone could have done that', write down the factual training, hours, and skill you specifically invested.",
        "Embrace 'Good Enough' Calibration: Practice deliberately designating low-impact tasks as B-grade efforts to conserve your cognitive battery.",
      ],
      id: [
        "Jendela Selebrasi 72 Jam: Saat satu target tercapai, larang dirimu membuat target baru selama 3 hari penuh. Nikmati dan resapi pencapaian itu.",
        "Uji Bukti Fakta: Saat suara dalam kepala bilang 'itu mah biasa aja', tulis daftar jam kerja, keringat, dan keahlian nyata yang sudah kamu curahkan.",
        "Kalibrasi 'Cukup Bagus': Sengaja perlakukan tugas-tugas minor dengan kualitas standar 80% demi menghemat energi untuk hal esensial.",
      ],
      de: [
        "Die 72-Stunden-Würdigungsphase: Nach Zielerreichung ist es 3 Tage lang verboten, das nächste Großprojekt zu planen. Übe bewusstes Genießen.",
        "Fakten-Kreuzverhör: Wenn der Kritiker flüstert 'War doch leicht', notiere schwarz auf weiß die Stunden und Fähigkeiten, die du investiert hast.",
        "B-Noten-Mut: Erlaube dir bei unwichtigen Routineaufgaben ganz gezielt eine 80%-Lösung, um Energie zu sparen.",
      ],
      fr: [
        "La fenêtre de célébration de 72 heures : une fois un objectif atteint, interdisez-vous tout nouveau chantier pendant 3 jours entiers.",
        "Contre-interrogatoire des faits : notez noir sur blanc le temps et les compétences réelles mobilisées pour contredire l'idée que 'c'était facile'.",
        "Calibration 'Suffisamment bien' : attribuez délibérément une note B aux tâches secondaires pour préserver votre énergie.",
      ],
      es: [
        "Ventana de celebración de 72 horas: tras lograr una meta, prohíbete fijar la siguiente durante 3 días completos para saborearla.",
        "Contrainterrogatorio de hechos: escribe las horas y habilidades concretas que invertiste cuando sientas que 'cualquiera lo hubiera hecho'.",
        "Calibración de 'suficientemente bueno': aplica soluciones al 80% en tareas secundarias para cuidar tu energía mental.",
      ],
    },
    dailyAffirmation: {
      en: "I do not have to outrun an imaginary deficiency. I am allowed to rest in the pride of what I have already built.",
      id: "Aku tidak perlu terus berlari mengejar rasa kurang yang semu. Aku berhak beristirahat dan bangga atas apa yang telah berhasil kubangun.",
      de: "Ich muss keinem imaginären Mangel davonlaufen. Ich darf mich in dem ausruhen, was ich bereits geschaffen habe.",
      fr: "Je n'ai pas à fuir une insuffisance imaginaire. J'ai le droit de me reposer dans la fierté de ce qui est déjà accompli.",
      es: "No necesito correr huyendo de una carencia imaginaria. Puedo descansar y enorgullecerme de lo que ya he construido.",
    },
  },

  healthy_striver: {
    level: "healthy_striver",
    badge: {
      en: "THE ADAPTIVE HIGH STRIVER",
      id: "PENCAPAI ADAPTIF (HEALTHY STRIVING)",
      de: "DER ADAPTIVE LEISTUNGSTRÄGER",
      fr: "LE RECHERCHEUR D'EXCELLENCE SAINE",
      es: "EL BUSCADOR DE EXCELENCIA ADAPTATIVO",
    },
    title: {
      en: "Adaptive High Striving & Resilient Growth",
      id: "Pencapaian Berstandar Tinggi yang Sehat & Resilien",
      de: "Gesundes Streben & elastische Exzellenz",
      fr: "Excellence bienveillante & progression résiliente",
      es: "Excelencia sana y crecimiento resiliente",
    },
    tagline: {
      en: "You pursue mastery and excellence without weaponizing errors against your self-worth.",
      id: "Kamu mengejar kualitas dan kemahiran tanpa menjadikan kesalahan sebagai senjata untuk menghakimi dirimu.",
      de: "Du strebst nach Qualität, ohne Fehler gegen deinen Selbstwert zu richten.",
      fr: "Vous visez l'excellence sans faire de vos erreurs un procès contre vous-même.",
      es: "Persigues la maestría sin convertir tus errores en un ataque a tu autoestima.",
    },
    description: {
      en: "Congratulations. You exemplify healthy, adaptive perfectionism. You set inspiring benchmarks and hold yourself accountable, but you maintain psychological flexibility. When a mistake happens, you view it as data for iteration rather than a character defect. You enjoy the craft itself, rest without guilt, and protect your boundaries against external pressure.",
      id: "Selamat. Kamu mencerminkan perfeksionisme yang sehat dan adaptif. Kamu memiliki standar tinggi yang menginspirasi, namun tetap lentur secara psikologis. Saat menemui kesalahan, kamu melihatnya sebagai bahan evaluasi objektif, bukan kecacatan karakter. Kamu menikmati proses, bisa rehat tanpa bersalah, dan menjaga batasan sehat.",
      de: "Hervorragend. Du verkörperst adaptiven, gesunden Ehrgeiz. Du setzt inspirierende Maßstäbe, bleibst aber mental flexibel. Scheitern begreifst du als Lernschritt, nicht als Identitätskrise. Du kannst Erfolge feiern und dich ohne Reue erholen.",
      fr: "Félicitations. Vous incarnez une exigence saine et constructive. Vous gardez une souplesse mentale remarquable : l'erreur est une source d'apprentissage et non un défaut personnel. Vous savourez le chemin sans culpabiliser lors des temps morts.",
      es: "Enhorabuena. Reflejas un perfeccionismo adaptativo y saludable. Tienes metas ambiciosas pero flexibles; ves los fallos como datos útiles de mejora y disfrutas del proceso descansando con tranquilidad.",
    },
    psychologyInsight: {
      en: "Adaptive perfectionists demonstrate high Heart Rate Variability (HRV) and low baseline threat activation during feedback. Self-compassion acts as an emotional shock absorber that preserves stamina over decades.",
      id: "Perfeksionis adaptif menunjukkan Variabilitas Detak Jantung (HRV) yang stabil dan minim stres saat menerima masukan. Self-compassion berfungsi sebagai peredam kejut emosional yang menjaga konsistensi jangka panjang.",
      de: "Adaptive Leistungsträger weisen eine hohe Herzfrequenzvariabilität (HRV) und geringe Bedrohungsreaktionen auf. Selbstmitgefühl dient als nachhaltiger Stoßdämpfer.",
      fr: "Les perfectionnistes adaptatifs affichent une excellente résilience vagale. L'auto-compassion amortit les aléas sans entamer la motivation profonde.",
      es: "Los perfiles adaptativos muestran una respuesta parasimpática equilibrada ante las críticas. La autocompasión actúa como amortiguador para mantener la energía a largo plazo.",
    },
    actionProtocols: {
      en: [
        "Mentor Others in Adaptive Striving: Share your iterative mindset with teammates who struggle with paralyzing fear of failure.",
        "Deep Work & Creative Flow Protection: Preserve uninterrupted blocks of deep focus where curiosity matters more than metrics.",
        "Curiosity Journaling: Use Nuju's Voice Journaling to record breakthroughs and celebrate organic growth as it unfolds.",
      ],
      id: [
        "Bagikan Pola Pikir Adaptif: Bantu rekan kerja atau teman yang sering lumpuh menunda agar mereka berani merilis karya yang belum sempurna.",
        "Jaga Blok Deep Work: Pertahankan waktu fokus di mana eksplorasi dan rasa ingin tahu lebih penting daripada metrik angka.",
        "Jurnal Refleksi Suara: Gunakan fitur Voice Journal di Nuju untuk merefleksikan proses belajar dan merayakan kemenangan kecil.",
      ],
      de: [
        "Mentoring für andere: Teile deine iterative Haltung mit Kollegen, die unter lähmender Fehlerangst leiden.",
        "Schutz von Deep-Work-Phasen: Halte ungestörte Zeiten frei, in denen Freude am Schaffen vor reinen Kennzahlen steht.",
        "Reflexions-Journaling: Nutze Nuju, um Erkenntnisse festzuhalten und organisches Wachstum zu dokumentieren.",
      ],
      fr: [
        "Partagez votre philosophie : inspirez vos proches bloqués par la peur de l'échec à oser avancer par petits pas.",
        "Protégez vos plages de concentration : cultivez des moments où le plaisir du geste l'emporte sur le résultat chiffré.",
        "Journal de progression : notez vos déclics dans Nuju pour ancrer vos apprentissages dans la durée.",
      ],
      es: [
        "Sé mentor de otros: contagia tu visión iterativa a quienes se paralizan por miedo al error.",
        "Protege tus bloques de concentración: reserva espacios donde prime la curiosidad sobre las métricas.",
        "Journaling consciente: utiliza Nuju para registrar aprendizajes y disfrutar del crecimiento continuo.",
      ],
    },
    dailyAffirmation: {
      en: "I grow with grace. Excellence is my craft, compassion is my foundation, and joy is my compass.",
      id: "Aku bertumbuh dengan anggun. Kualitas adalah keahlianku, welas asih adalah pondasiku, dan kegembiraan adalah kompas hidupku.",
      de: "Ich wachse mit Gelassenheit. Exzellenz ist mein Handwerk, Mitgefühl mein Fundament und Freude mein Kompass.",
      fr: "Je grandis avec sérénité. L'excellence est mon art, la bienveillance mon socle et la joie mon guide.",
      es: "Crezco con serenidad. La excelencia es mi oficio, la compasión mi cimiento y la dicha mi brújula.",
    },
  },
};

export function calculatePerfectionismScore(answers: Record<number, number>): PerfectionismScoreResult {
  let totalScore = 0;
  let mistakeScore = 0;
  let mistakeMax = 0;
  let personalScore = 0;
  let personalMax = 0;
  let socialScore = 0;
  let socialMax = 0;

  PERFECTIONISM_QUESTIONS.forEach((q) => {
    const score = answers[q.id] ?? 0;
    totalScore += score;

    if (q.subscale === "mistake_rumination") {
      mistakeScore += score;
      mistakeMax += 3;
    } else if (q.subscale === "personal_standards") {
      personalScore += score;
      personalMax += 3;
    } else if (q.subscale === "socially_prescribed") {
      socialScore += score;
      socialMax += 3;
    }
  });

  const maxScore = PERFECTIONISM_QUESTIONS.length * 3; // 36
  const percentage = Math.round((totalScore / maxScore) * 100);

  const mistakePct = mistakeMax > 0 ? Math.round((mistakeScore / mistakeMax) * 100) : 0;
  const personalPct = personalMax > 0 ? Math.round((personalScore / personalMax) * 100) : 0;
  const socialPct = socialMax > 0 ? Math.round((socialScore / socialMax) * 100) : 0;

  // Determine Profile
  let level: "paralyzed_procrastinator" | "social_prescribed" | "hyper_critical" | "healthy_striver";

  if (totalScore <= 11 && mistakePct < 40) {
    level = "healthy_striver";
  } else if (mistakePct >= personalPct && mistakePct >= socialPct && mistakePct >= 50) {
    level = "paralyzed_procrastinator";
  } else if (socialPct >= mistakePct && socialPct >= personalPct && socialPct >= 50) {
    level = "social_prescribed";
  } else {
    level = "hyper_critical";
  }

  return {
    totalScore,
    maxScore,
    percentage,
    level,
    profile: PERFECTIONISM_PROFILES[level],
    subscales: {
      mistake_rumination: { score: mistakeScore, max: mistakeMax, percentage: mistakePct },
      personal_standards: { score: personalScore, max: personalMax, percentage: personalPct },
      socially_prescribed: { score: socialScore, max: socialMax, percentage: socialPct },
    },
  };
}
