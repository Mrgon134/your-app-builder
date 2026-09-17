export type ChronicGuiltLang = "en" | "id" | "de" | "fr" | "es";

export interface ChronicGuiltQuestion {
  id: number;
  subscale: "omnipotent_responsibility" | "punitive_self_sabotage" | "unworthiness_anxiety";
  prompt: Record<ChronicGuiltLang, string>;
  options: {
    label: Record<ChronicGuiltLang, string>;
    score: number; // 0 to 3
  }[];
}

export interface ChronicGuiltArchetype {
  level: "grounded_accountable" | "mild_empathy_carrier" | "omnipotent_rescuer" | "punitive_penitent";
  badge: Record<ChronicGuiltLang, string>;
  title: Record<ChronicGuiltLang, string>;
  tagline: Record<ChronicGuiltLang, string>;
  description: Record<ChronicGuiltLang, string>;
  psychologyInsight: Record<ChronicGuiltLang, string>;
  actionProtocols: Record<ChronicGuiltLang, string[]>;
  dailyAffirmation: Record<ChronicGuiltLang, string>;
}

export interface ChronicGuiltScoreResult {
  totalScore: number;
  percentage: number;
  level: ChronicGuiltArchetype["level"];
  profile: ChronicGuiltArchetype;
  subscales: {
    omnipotent_responsibility: { score: number; percentage: number };
    punitive_self_sabotage: { score: number; percentage: number };
    unworthiness_anxiety: { score: number; percentage: number };
  };
}

export const CHRONIC_GUILT_QUESTIONS: ChronicGuiltQuestion[] = [
  // Subscale 1: Omnipotent Responsibility (Feeling responsible for everyone else's happiness)
  {
    id: 1,
    subscale: "omnipotent_responsibility",
    prompt: {
      en: "If a friend, partner, or family member is in a bad mood, I instinctively assume it is somehow my fault.",
      id: "Jika teman, pasangan, atau anggota keluarga sedang bad mood, insting pertamaku adalah menganggap itu kesalahanku.",
      de: "Wenn ein Freund oder Partner schlechte Laune hat, gehe ich automatisch davon aus, dass ich schuld bin.",
      fr: "Si un proche est de mauvaise humeur, mon premier réflexe est de penser que c'est de ma faute.",
      es: "Si un amigo o mi pareja está de mal humor, asumo de inmediato que de algún modo es culpa mía.",
    },
    options: [
      {
        score: 0,
        label: {
          en: "Disagree — people own their own emotional states",
          id: "Tidak setuju — setiap orang bertanggung jawab atas emosi mereka sendiri",
          de: "Stimme nicht zu — jeder ist für seine eigenen Gefühle verantwortlich",
          fr: "Pas d'accord — chacun est responsable de ses propres émotions",
          es: "En desacuerdo — cada quien es responsable de sus propias emociones",
        },
      },
      {
        score: 1,
        label: {
          en: "Occasionally — only if we recently had a disagreement",
          id: "Kadang — hanya jika kami baru saja berselisih paham",
          de: "Gelegentlich — nur wenn wir vorher eine Meinungsverschiedenheit hatten",
          fr: "Parfois — seulement si nous venons d'avoir un désaccord",
          es: "A veces — solo si hemos tenido un desencuentro reciente",
        },
      },
      {
        score: 2,
        label: {
          en: "Frequently — I scramble to fix their mood so I can stop feeling guilty",
          id: "Sering — Aku buru-buru menghibur mereka agar rasa bersalahku reda",
          de: "Häufig — Ich versuche hektisch, ihre Laune zu bessern, um mein Schuldgefühl zu stoppen",
          fr: "Souvent — Je m'empresse d'arranger leur humeur pour calmer ma culpabilité",
          es: "A menudo — Me desvivo por mejorar su humor para aliviar mi culpa",
        },
      },
      {
        score: 3,
        label: {
          en: "Constant reflex — I feel hyper-responsible for the emotional climate of any room I enter",
          id: "Refleks konstan — Aku merasa bertanggung jawab penuh atas suasana emosi ruangan mana pun",
          de: "Dauerzustand — Ich fühle mich für die Stimmung jedes Raumes verantwortlich",
          fr: "Réflexe permanent — Je me sens responsable du climat émotionnel de toute pièce où j'entre",
          es: "Reflejo constante — Siento que la atmósfera emocional de cualquier lugar depende de mí",
        },
      },
    ],
  },
  {
    id: 2,
    subscale: "omnipotent_responsibility",
    prompt: {
      en: "I feel intense guilt when resting, taking a day off, or spending money on myself when others are struggling.",
      id: "Aku merasa sangat bersalah saat istirahat, ambil cuti, atau belanja untuk diri sendiri sementara orang lain sedang susah.",
      de: "Ich fühle massive Schuldgefühle, wenn ich mich ausruhe oder mir etwas gönne, während andere kämpfen.",
      fr: "Je ressens une vive culpabilité quand je me repose ou me fais plaisir alors que d'autres souffrent.",
      es: "Siento una culpa tremenda al descansar, tomarme un día libre o gastar en mí mientras otros lo pasan mal.",
    },
    options: [
      {
        score: 0,
        label: {
          en: "Disagree — healthy self-care and enjoyment are natural rights",
          id: "Tidak setuju — merawat diri dan menikmati hidup adalah hak wajar",
          de: "Stimme nicht zu — Selbstfürsorge und Genuss sind normale Rechte",
          fr: "Pas d'accord — prendre soin de soi et profiter de la vie sont des droits légitimes",
          es: "En desacuerdo — cuidarse y disfrutar son derechos fundamentales",
        },
      },
      {
        score: 1,
        label: {
          en: "Mild twinge of guilt, but I can shake it off",
          id: "Ada sedikit rasa bersalah, tapi bisa kutepis dengan tenang",
          de: "Leises Schuldgefühl, das ich aber abschütteln kann",
          fr: "Un léger pincement au cœur, mais je passe outre",
          es: "Una leve punzada de culpa que logro disipar",
        },
      },
      {
        score: 2,
        label: {
          en: "Often — relaxing feels 'lazy' or 'selfish' unless completely exhausted",
          id: "Sering — istirahat terasa 'malas' atau 'egois' kecuali tubuh sudah tumbang",
          de: "Oft — Entspannung fühlt sich faul oder egoistisch an, außer bei Erschöpfung",
          fr: "Souvent — me détendre me paraît égoïste ou paresseux sauf si je suis épuisé",
          es: "A menudo — relajarme me parece egoísta a menos que esté totalmente rendido",
        },
      },
      {
        score: 3,
        label: {
          en: "Severe — I feel existential shame if I am happy while family members are unhappy",
          id: "Sangat parah — Aku merasa malu dan bersalah jika bahagia sementara keluargaku susah",
          de: "Massiv — Ich schäme mich regelrecht dafür, glücklich zu sein, wenn andere leiden",
          fr: "Sévère — J'éprouve une honte profonde d'aller bien si mes proches ne vont pas bien",
          es: "Muy severo — Siento vergüenza existencial por ser feliz si mi familia está mal",
        },
      },
    ],
  },
  {
    id: 3,
    subscale: "omnipotent_responsibility",
    prompt: {
      en: "Saying 'no' to a request causes me days of mental agony and obsessive rumination.",
      id: "Menolak permintaan orang membuatku tersiksa berhari-hari dan terus memikirkannya.",
      de: "Eine Bitte abzulehnen, quält mich tagelang mit Grübelschleifen.",
      fr: "Dire 'non' à une sollicitation me plonge dans des jours d'angoisse et de remords.",
      es: "Decir 'no' a una petición me provoca días de tormento mental y remordimientos.",
    },
    options: [
      {
        score: 0,
        label: {
          en: "Disagree — boundaries are normal and I decline politely without agonizing",
          id: "Tidak setuju — batasan itu wajar dan aku menolak sopan tanpa gelisah",
          de: "Stimme nicht zu — Grenzen sind gesund, ich sage freundlich Nein",
          fr: "Pas d'accord — poser des limites est sain, je décline sans angoisse",
          es: "En desacuerdo — los límites son sanos, me niego con cortesía y tranquilidad",
        },
      },
      {
        score: 1,
        label: {
          en: "Brief discomfort for an hour, then I move on",
          id: "Sedikit tidak enak selama sejam, lalu lupa",
          de: "Kurzes Unbehagen für eine Stunde, dann ist es gut",
          fr: "Un bref malaise d'une heure, puis j'avance",
          es: "Incomodidad durante una hora, luego lo supero",
        },
      },
      {
        score: 2,
        label: {
          en: "Substantial — I draft long over-apologetic excuses to justify my 'no'",
          id: "Cukup berat — Aku mengarang alasan panjang penuh maaf demi menjustifikasi penolakanku",
          de: "Erheblich — Ich erfinde lange Rechtfertigungen und entschuldige mich endlos",
          fr: "Marqué — J'écris de longues excuses embarrassées pour justifier mon refus",
          es: "Considerable — Redacto largas justificaciones disculpándome una y otra vez",
        },
      },
      {
        score: 3,
        label: {
          en: "Debilitating — I almost never say no because the guilt feels physically unbearable",
          id: "Melumpuhkan — Aku hampir tak pernah bisa menolak karena rasa bersalahnya menyiksa fisik",
          de: "Lähmend — Ich sage fast nie Nein, weil die Schuldgefühle unerträglich sind",
          fr: "Paralysant — Je ne dis presque jamais non tant la culpabilité m'est insupportable",
          es: "Incapacitante — Casi nunca digo no porque la culpa se me hace insufrible",
        },
      },
    ],
  },
  {
    id: 4,
    subscale: "omnipotent_responsibility",
    prompt: {
      en: "I feel like an imposter who will eventually be exposed as bad, flawed, or morally deficient.",
      id: "Aku merasa seperti penipu yang cepat atau lambat akan terbongkar sebagai orang buruk, cacat, atau hina.",
      de: "Ich fühle mich wie ein Betrüger, der eines Tages als schlechter Mensch entlarvt wird.",
      fr: "J'ai l'impression d'être un imposteur qui sera un jour démasqué comme quelqu'un de mauvais.",
      es: "Me siento como un impostor que algún día será desenmascarado como una mala persona.",
    },
    options: [
      {
        score: 0,
        label: {
          en: "Disagree — I accept my human imperfections with self-compassion",
          id: "Tidak setuju — Aku menerima ketidaksempurnaan manusiawiku dengan welas asih",
          de: "Stimme nicht zu — Ich nehme meine menschlichen Fehler mit Selbstmitgefühl an",
          fr: "Pas d'accord — J'accepte mes imperfections avec bienveillance envers moi-même",
          es: "En desacuerdo — Acepto mis defectos humanos con autocompasión",
        },
      },
      {
        score: 1,
        label: {
          en: "Rarely — only when experiencing acute professional failure",
          id: "Jarang — hanya saat mengalami kegagalan kerja yang telak",
          de: "Selten — nur nach schweren beruflichen Rückschlägen",
          fr: "Rarement — seulement après un échec cuisant",
          es: "Rara vez — solo tras algún tropiezo laboral importante",
        },
      },
      {
        score: 2,
        label: {
          en: "Often — I carry a persistent baseline sensation that I am fundamentally indebted",
          id: "Sering — Aku membawa rasa bersalah mendalam seolah berutang pada semua orang",
          de: "Oft — Ich trage ein Grundgefühl mit mir, anderen immer etwas schuldig zu sein",
          fr: "Souvent — J'ai le sentiment persistant d'être toujours en dette envers les autres",
          es: "A menudo — Llevo una sensación de fondo de estar siempre en deuda con los demás",
        },
      },
      {
        score: 3,
        label: {
          en: "Chronic moral dread — an internal jury perpetually convicts me of inadequacy",
          id: "Kecemasan moral kronis — ada hakim batin yang selalu memvonisku bersalah dan tak layak",
          de: "Chronische Moralangst — ein innerer Richter verurteilt mich ununterbrochen",
          fr: "Peur morale permanente — un juge intérieur me condamne sans cesse",
          es: "Tormento moral constante — un tribunal interno me declara culpable a todas horas",
        },
      },
    ],
  },

  // Subscale 2: Punitive Self-Sabotage (Subconsciously destroying good outcomes)
  {
    id: 5,
    subscale: "punitive_self_sabotage",
    prompt: {
      en: "Whenever things are going exceptionally well in my life, an irrational sense of dread whispers: *'Something terrible is about to happen.'*",
      id: "Saat hidupku sedang berjalan sangat lancar, ada kecemasan tak masuk akal berbisik: *'Pasti sebentar lagi ada musibah buruk.'*",
      de: "Wenn alles im Leben rundläuft, flüstert eine irrationale Angst: *'Gleich passiert etwas Schreckliches.'*",
      fr: "Dès que tout va bien dans ma vie, une sourde angoisse me murmure : *'Quelque chose de terrible va arriver.'*",
      es: "Cuando todo va de maravilla, un miedo irracional me susurra: *'Pronto va a ocurrir algo terrible.'*",
    },
    options: [
      {
        score: 0,
        label: {
          en: "Disagree — I savor good fortune without waiting for the other shoe to drop",
          id: "Tidak setuju — Aku menikmati keberuntungan tanpa mencemaskan musibah",
          de: "Stimme nicht zu — Ich genieße mein Glück ohne Unheilsahnung",
          fr: "Pas d'accord — Je savoure mon bonheur sans attendre la catastrophe",
          es: "En desacuerdo — Disfruto de los buenos momentos sin esperar un golpe",
        },
      },
      {
        score: 1,
        label: {
          en: "Occasional superstitious hesitation during major life breakthroughs",
          id: "Sesekali ragu secara takhayul saat mencapai terobosan besar",
          de: "Gelegentlicher Aberglaube bei großen Meilensteinen",
          fr: "Superstition passagère lors des grandes réussites",
          es: "Superstición pasajera al lograr algún éxito relevante",
        },
      },
      {
        score: 2,
        label: {
          en: "Frequently — I brace for catastrophe because joy feels unsafe",
          id: "Sering — Aku bersiap menghadapi bencana karena bahagia terasa tidak aman",
          de: "Häufig — Ich wappne mich gegen Katastrophen, weil Freude sich unsicher anfühlt",
          fr: "Souvent — Je m'attends au pire car le bonheur me semble précaire",
          es: "A menudo — Me preparo para lo peor porque la alegría me parece insegura",
        },
      },
      {
        score: 3,
        label: {
          en: "Constant Upper Limit Problem — joy immediately triggers panic and self-sabotage",
          id: "Upper Limit Problem kronis — rasa bahagia langsung memicu kepanikan dan sabotase diri",
          de: "Massives Upper Limit Problem — Glück führt reflexartig zu Selbstsabotage",
          fr: "Syndrome du seuil de bonheur — la joie déclenche aussitôt un autosabotage",
          es: "Límite superior patológico — la dicha dispara pánico y autosabotaje inmediato",
        },
      },
    ],
  },
  {
    id: 6,
    subscale: "punitive_self_sabotage",
    prompt: {
      en: "I find myself picking unnecessary fights with partners, procrastinating on dream projects, or making careless mistakes right when on the verge of success.",
      id: "Aku sering memicu pertengkaran sepele, menunda proyek impian, atau bikin teledor justru saat sudah di ambang kesuksesan.",
      de: "Ich zettele unnötigen Streit an oder trödle bei Herzensprojekten, genau wenn der Erfolg greifbar ist.",
      fr: "Je déclenche des disputes inutiles ou sabote mes projets au moment exact où la réussite est à portée de main.",
      es: "Empiezo discusiones absurdas o procrastino proyectos clave justo cuando estoy a punto de triunfar.",
    },
    options: [
      {
        score: 0,
        label: {
          en: "Disagree — I celebrate momentum and follow through on achievements",
          id: "Tidak setuju — Aku merayakan momentum dan menuntaskan pencapaian",
          de: "Stimme nicht zu — Ich nutze meinen Schwung und ziehe Erfolge durch",
          fr: "Pas d'accord — Je maintiens mon élan et savoure mes victoires",
          es: "En desacuerdo — Aprovecho el impulso y culmino mis metas con satisfacción",
        },
      },
      {
        score: 1,
        label: {
          en: "Rarely — minor hesitation when entering uncharted success",
          id: "Jarang — sedikit ragu hanya saat menghadapi kesuksesan baru",
          de: "Selten — leichtes Zögern vor ganz neuen Schritten",
          fr: "Rarement — simple hésitation face à la nouveauté",
          es: "Rara vez — leves dudas ante retos completamente nuevos",
        },
      },
      {
        score: 2,
        label: {
          en: "Frequently — when relationships or career reach peaceful levels, I unconsciously shake things up",
          id: "Sering — saat hubungan atau karier sedang adem ayem, alam bawah sadarku memicu kekacauan",
          de: "Häufig — Wenn Ruhe einkehrt, provoziere ich unbewusst Chaos",
          fr: "Souvent — Quand le calme s'installe, je provoque inconsciemment des remous",
          es: "A menudo — Cuando hay calma y armonía, provoco caos de forma inconsciente",
        },
      },
      {
        score: 3,
        label: {
          en: "Chronic self-sabotage cycle — I cannot tolerate thriving without punishing myself",
          id: "Siklus sabotase diri kronis — Aku tak sanggup melihat diriku maju tanpa menghukum diri",
          de: "Chronischer Sabotage-Zyklus — Ich ertrage Erfolg nur mit anschließender Selbstbestrafung",
          fr: "Cercle vicieux — Je ne supporte pas d'être heureux sans m'auto-punir ensuite",
          es: "Bucle destructivo constante — No tolero prosperar sin castigarme después",
        },
      },
    ],
  },
  {
    id: 7,
    subscale: "punitive_self_sabotage",
    prompt: {
      en: "I feel guilty about surpassing my parents, siblings, or childhood peers in wealth, stability, or happiness (Survivor's Guilt).",
      id: "Aku merasa bersalah karena lebih sukses, stabil, atau bahagia dibanding orang tua, saudara, atau teman masa kecilku (Survivor's Guilt).",
      de: "Ich fühle mich schuldig, wenn ich meine Eltern oder Geschwister an Erfolg oder Glück übertreffe.",
      fr: "Je me sens coupable d'avoir mieux réussi ou d'être plus heureux que mes parents ou mes frères et sœurs.",
      es: "Siento culpa por tener más éxito, estabilidad o felicidad que mis padres, hermanos o amigos de la infancia.",
    },
    options: [
      {
        score: 0,
        label: {
          en: "Disagree — my growth does not harm others; I celebrate my blessings",
          id: "Tidak setuju — kemajuanku tidak merugikan siapa pun; aku mensyukuri rezekiku",
          de: "Stimme nicht zu — Mein Erfolg schadet niemandem; ich bin dankbar",
          fr: "Pas d'accord — Ma réussite ne blesse personne ; j'en suis reconnaissant",
          es: "En desacuerdo — Mi progreso no perjudica a nadie; agradezco mis logros",
        },
      },
      {
        score: 1,
        label: {
          en: "Slight awareness, so I avoid boasting in front of them",
          id: "Sedikit sadar, jadi aku tidak menyombong di depan mereka",
          de: "Leichtes Mitgefühl, daher vermeide ich Prahlen",
          fr: "Sensibilité légère, j'évite simplement d'étaler ma réussite",
          es: "Ligera discreción, evito presumir ante ellos",
        },
      },
      {
        score: 2,
        label: {
          en: "Substantial — I downplay my accomplishments or hide financial success to avoid making them feel bad",
          id: "Cukup berat — Aku mengecilkan prestasiku atau merahasiakan pencapaian agar mereka tidak minder",
          de: "Erheblich — Ich spiele Erfolge herunter oder verstecke Geld, um niemanden zu kränken",
          fr: "Marqué — Je minimise mes victoires ou cache mes revenus pour ne pas les blesser",
          es: "Considerable — Minimizo mis logros u oculto mis éxitos para que no se sientan mal",
        },
      },
      {
        score: 3,
        label: {
          en: "Severe separation guilt — I hold myself back from my full potential because thriving feels like betrayal",
          id: "Separation guilt parah — Aku sengaja menahan potensiku karena sukses terasa seperti mengkhianati keluarga",
          de: "Schwere Trennungsschuld — Ich bremse mich selbst aus, weil Erfolg sich wie Verrat anfühlt",
          fr: "Culpabilité de séparation aiguë — Je m'auto-limite car réussir ressemble à une trahison",
          es: "Culpa de separación severa — Me freno a mí mismo porque triunfar me sabe a traición familiar",
        },
      },
    ],
  },
  {
    id: 8,
    subscale: "punitive_self_sabotage",
    prompt: {
      en: "When given genuine compliments or praise, I immediately deflect them, point out my hidden flaws, or feel like a fraud.",
      id: "Saat menerima pujian tulus, aku langsung menangkisnya, menyebut kekuranganku, atau merasa seperti penipu.",
      de: "Bekomme ich ehrliches Lob, wehre ich es sofort ab oder zähle heimliche Makel auf.",
      fr: "Face à un compliment sincère, je le rejette aussitôt ou énumère mes failles cachées.",
      es: "Ante un elogio sincero, lo desvío al instante, destaco mis fallos o me siento farsante.",
    },
    options: [
      {
        score: 0,
        label: {
          en: "Disagree — I receive compliments with a gracious 'Thank you'",
          id: "Tidak setuju — Aku menerima pujian dengan ucapan terima kasih yang tulus",
          de: "Stimme nicht zu — Ich nehme Komplimente dankbar an",
          fr: "Pas d'accord — Je reçois les compliments avec un simple merci",
          es: "En desacuerdo — Recibo los elogios con un sincero 'gracias'",
        },
      },
      {
        score: 1,
        label: {
          en: "Mild modesty — a brief moment of shyness",
          id: "Sedikit sungkan — rasa malu sekilas",
          de: "Leichte Bescheidenheit — kurze Verlegenheit",
          fr: "Pudeur passagère — courte gêne polie",
          es: "Modestia pasajera — un instante de timidez",
        },
      },
      {
        score: 2,
        label: {
          en: "Often — I attribute my wins entirely to luck, timing, or help from others",
          id: "Sering — Aku menganggap keberhasilanku murni karena hoki, waktu, atau bantuan orang lain",
          de: "Oft — Ich schiebe Erfolge komplett auf Glück, Zufall oder andere",
          fr: "Souvent — J'attribue mes réussites à la chance ou au timing uniquement",
          es: "A menudo — Atribuyo mis triunfos exclusivamente a la suerte o a la ayuda ajena",
        },
      },
      {
        score: 3,
        label: {
          en: "Visceral rejection — praise makes my skin crawl because I feel undeserving",
          id: "Penolakan fisik — pujian membuatku risih dan mual karena merasa tak pantas",
          de: "Körperliche Abwehr — Lob löst fast Ekel aus, weil ich mich unvollkommen fühle",
          fr: "Rejet viscéral — les éloges me mettent mal à l'aise tant je me sens illégitime",
          es: "Rechazo visceral — los cumplidos me incomodan físicamente porque no me siento digno",
        },
      },
    ],
  },

  // Subscale 3: Unworthiness & Punitive Inner Judge
  {
    id: 9,
    subscale: "unworthiness_anxiety",
    prompt: {
      en: "I keep mental scorecards of past mistakes from 5 or 10 years ago and replay them at night with acute embarrassment.",
      id: "Aku menyimpan catatan kesalahan 5 atau 10 tahun lalu dan memutarnya ulang di malam hari dengan rasa malu menusuk.",
      de: "Ich halte alte Fehler von vor Jahren im Kopf fest und erlebe nachts akute Scham.",
      fr: "Je garde en mémoire des erreurs vieilles de 5 ou 10 ans et les ressasse la nuit avec honte.",
      es: "Guardo una lista mental de errores de hace años y los revivo de noche con punzante vergüenza.",
    },
    options: [
      {
        score: 0,
        label: {
          en: "Disagree — the past is forgiven and integrated as growth",
          id: "Tidak setuju — masa lalu sudah dimaafkan dan dijadikan pelajaran bertumbuh",
          de: "Stimme nicht zu — Vergangenes ist vergeben und Teil meines Wachstums",
          fr: "Pas d'accord — le passé est pardonné et intégré comme expérience",
          es: "En desacuerdo — el pasado está perdonado y sirve como aprendizaje",
        },
      },
      {
        score: 1,
        label: {
          en: "Occasionally when reminded by an old photo or memory",
          id: "Sesekali saat teringat foto lama atau memori tertentu",
          de: "Gelegentlich, wenn ein altes Foto Erinnerungen weckt",
          fr: "De temps en temps en revoyant une ancienne photo",
          es: "Ocasionalmente si un recuerdo me viene a la cabeza",
        },
      },
      {
        score: 2,
        label: {
          en: "Frequently — random cringe memories make me physically wince or murmur to myself",
          id: "Sering — ingatan memalukan tiba-tiba membuatku meringis atau bergumam sendiri",
          de: "Häufig — plötzliche Schammomente lassen mich innerlich zusammenzucken",
          fr: "Souvent — des souvenirs gênants me font grimacer ou soupirer tout seul",
          es: "A menudo — recuerdos bochornosos me hacen estremecer o quejarme en voz alta",
        },
      },
      {
        score: 3,
        label: {
          en: "Unforgiving loop — I cannot let myself off the hook for human missteps",
          id: "Pusaran tanpa ampun — Aku tak pernah bisa memaafkan diriku atas kekhilafan masa lalu",
          de: "Erbarmungslose Schleife — Ich kann mir menschliche Fehler niemals verzeihen",
          fr: "Boucle impitoyable — Je suis incapable de me pardonner mes faux pas passés",
          es: "Bucle despiadado — Soy incapaz de perdonarme los errores que cometí",
        },
      },
    ],
  },
  {
    id: 10,
    subscale: "unworthiness_anxiety",
    prompt: {
      en: "I tolerate mistreatment, late payments, or emotional neglect because deep down I feel I deserve it.",
      id: "Aku memaklumi perlakuan buruk, upah telat, atau diabaikan karena merasa memang pantas menerimanya.",
      de: "Ich ertrage schlechte Behandlung oder emotionale Kälte, weil ich unbewusst glaube, es nicht besser zu verdienen.",
      fr: "Je tolère d'être mal traité ou négligé car au fond je pense le mériter.",
      es: "Tolero malos tratos, desplantes o retrasos en pagos porque en el fondo siento que me lo merezco.",
    },
    options: [
      {
        score: 0,
        label: {
          en: "Disagree — I expect respect and address boundary violations promptly",
          id: "Tidak setuju — Aku mengharapkan rasa hormat dan segera menegur pelanggaran batas",
          de: "Stimme nicht zu — Ich erwarte Respekt und spreche Grenzüberschreitungen an",
          fr: "Pas d'accord — J'exige le respect et recadre immédiatement les débordements",
          es: "En desacuerdo — Exijo respeto y señalo las faltas de consideración de inmediato",
        },
      },
      {
        score: 1,
        label: {
          en: "Sometimes — I tolerate minor inconvenience to keep harmony",
          id: "Kadang — Aku memaklumi hal kecil demi menjaga kerukunan",
          de: "Manchmal — Ich schlucke Kleinigkeiten des Friedens willen",
          fr: "Parfois — Je tolère des broutilles pour préserver la paix",
          es: "A veces — Transijo con cosas pequeñas por no crear tensión",
        },
      },
      {
        score: 2,
        label: {
          en: "Frequently — fighting for what is owed to me feels aggressive and shameful",
          id: "Sering — menuntut hakku terasa terlalu agresif dan memalukan",
          de: "Häufig — Mein Recht einzufordern, fühlt sich unverschämt oder gierig an",
          fr: "Souvent — Réclamer ce qui m'est dû me semble agressif et honteux",
          es: "A menudo — Pelear por lo que me corresponde me parece agresivo o descarado",
        },
      },
      {
        score: 3,
        label: {
          en: "Severe self-abnegation — I repeatedly accept crumbs because I feel fundamentally unlovable",
          id: "Pengorbanan diri parah — Aku berulang kali menerima remahan karena merasa tak layak dicintai",
          de: "Massive Selbstaufgabe — Ich begnüge mich mit Brosamen, weil ich mich ungeliebt fühle",
          fr: "Abnégation totale — Je me contente de miettes car je me sens indigne d'être aimé",
          es: "Autoanulación severa — Me conformo con migajas porque me siento indigno de amor",
        },
      },
    ],
  },
  {
    id: 11,
    subscale: "unworthiness_anxiety",
    prompt: {
      en: "I find myself excessively over-apologizing and buying gifts or offering favors to 'make up' for imaginary wrongs.",
      id: "Aku meminta maaf berlebihan dan suka membelikan hadiah/bantuan demi menebus kesalahan fiktif.",
      de: "Ich entschuldige mich übermäßig und mache Geschenke, um eingebildete Fehler wiedergutzumachen.",
      fr: "Je m'excuse sans fin et offre des cadeaux ou des services pour réparer des torts imaginaires.",
      es: "Me disculpo en exceso y hago regalos o favores para compensar faltas que solo están en mi cabeza.",
    },
    options: [
      {
        score: 0,
        label: {
          en: "Disagree — I apologize only when genuinely at fault",
          id: "Tidak setuju — Aku hanya meminta maaf jika benar-benar bersalah",
          de: "Stimme nicht zu — Ich bitte nur um Entschuldigung, wenn ich wirklich im Unrecht war",
          fr: "Pas d'accord — Je m'excuse uniquement quand j'ai réellement commis une faute",
          es: "En desacuerdo — Solo pido perdón cuando me he equivocado de verdad",
        },
      },
      {
        score: 1,
        label: {
          en: "Occasionally to grease polite social interactions",
          id: "Sesekali untuk memperlancar etika sosial",
          de: "Gelegentlich aus reiner Höflichkeit",
          fr: "Parfois par simple politesse sociale",
          es: "De vez en cuando por pura cortesía",
        },
      },
      {
        score: 2,
        label: {
          en: "Frequently — I constantly fear someone is harboring hidden resentment toward me",
          id: "Sering — Aku selalu takut orang lain diam-diam menyimpan dendam padaku",
          de: "Häufig — Ich fürchte ständig, jemand hege heimlichen Groll gegen mich",
          fr: "Souvent — Je redoute en permanence que quelqu'un m'en veuille en secret",
          es: "A menudo — Temo constantemente que alguien me guarde resentimiento secreto",
        },
      },
      {
        score: 3,
        label: {
          en: "Compulsive appeasement — I constantly bribe the world to forgive my existence",
          id: "Appeasement kompulsif — Aku terus-menerus menyogok dunia agar memaafkan keberadaanku",
          de: "Zwanghafte Beschwichtigung — Ich erkaufe mir die Erlaubnis, existieren zu dürfen",
          fr: "Apaisement compulsif — J'achète en permanence le pardon d'exister",
          es: "Aplaque compulsivo — Intento comprar constantemente el perdón por el mero hecho de existir",
        },
      },
    ],
  },
  {
    id: 12,
    subscale: "unworthiness_anxiety",
    prompt: {
      en: "I secretly believe that suffering and hardship are noble, while ease and comfort make a person corrupt or weak.",
      id: "Diam-diam aku percaya penderitaan itu mulia, sedangkan kemudahan dan kenyamanan membuat orang jadi manja/lemah.",
      de: "Ich glaube insgeheim, dass Leiden edel ist, während Leichtigkeit und Genuss schwach machen.",
      fr: "Au fond, je crois que souffrir est noble, tandis que la facilité et le confort rendent mou et égoïste.",
      es: "En el fondo creo que sufrir es noble, mientras que la comodidad y el disfrute ablandan o corrompen.",
    },
    options: [
      {
        score: 0,
        label: {
          en: "Disagree — ease, joy, and peace are wonderful gifts to embrace",
          id: "Tidak setuju — ketenangan, kegembiraan, dan kemudahan adalah berkah indah",
          de: "Stimme nicht zu — Leichtigkeit und Freude sind wunderbare Geschenke",
          fr: "Pas d'accord — la sérénité et la joie sont de magnifiques cadeaux",
          es: "En desacuerdo — la tranquilidad y el disfrute son regalos maravillosos",
        },
      },
      {
        score: 1,
        label: {
          en: "Mild work-ethic pride, but I enjoy vacations fully",
          id: "Etos kerja wajar, tapi aku tetap menikmati liburan sepenuh hati",
          de: "Gesunder Fleiß, aber ich kann Urlaub voll genießen",
          fr: "Fierté du travail bien fait, mais je sais savourer mes vacances",
          es: "Ética de trabajo sana, pero sé desconectar en vacaciones",
        },
      },
      {
        score: 2,
        label: {
          en: "Often — if something comes easily to me, I feel guilty charging or taking credit for it",
          id: "Sering — jika ada hal yang terasa mudah bagiku, aku merasa bersalah meminta bayaran/pujian",
          de: "Oft — Was mir leichtfällt, wage ich kaum in Rechnung zu stellen",
          fr: "Souvent — Ce qui m'est facile me fait honte de le facturer ou d'en tirer gloire",
          es: "A menudo — Si algo me resulta fácil, me da culpa cobrar por ello o valorarlo",
        },
      },
      {
        score: 3,
        label: {
          en: "Martyr complex — I only feel worthy of respect when visibly exhausted and sacrificing myself",
          id: "Martyr complex — Aku hanya merasa layak dihormati saat tampak kelelahan dan berkorban",
          de: "Märtyrer-Komplex — Ich fühle mich nur wertvoll, wenn ich mich völlig aufopfert habe",
          fr: "Complexe du martyr — Je ne me sens digne de respect que quand je m'épuise pour les autres",
          es: "Complejo de mártir — Solo me siento respetable cuando estoy exhausto y sacrificándome",
        },
      },
    ],
  },
];

export const CHRONIC_GUILT_ARCHETYPES: Record<
  ChronicGuiltArchetype["level"],
  ChronicGuiltArchetype
> = {
  grounded_accountable: {
    level: "grounded_accountable",
    badge: {
      en: "Grounded & Free",
      id: "Bebas & Seimbang",
      de: "Frei & Verantwortlich",
      fr: "Libéré & Équilibré",
      es: "Libre y Consciente",
    },
    title: {
      en: "Grounded & Compassionately Accountable",
      id: "Tanggung Jawab Sehat Tanpa Beban Bersalah",
      de: "Gesund verantwortlich ohne falsche Schuld",
      fr: "Responsable et Émotionnellement Libre",
      es: "Consciente y Libre de Culpa Tóxica",
    },
    tagline: {
      en: "You take ownership of your actions without carrying the emotional weight of the entire universe.",
      id: "Kamu bertanggung jawab atas tindakanmu sendiri tanpa memikul beban emosional seluruh alam semesta.",
      de: "Du übernimmst Verantwortung für dein Tun, ohne die emotionale Last der ganzen Welt zu tragen.",
      fr: "Vous assumez vos actes sans porter le fardeau émotionnel du monde entier sur vos épaules.",
      es: "Asumes tus actos sin cargar con el peso emocional de todo el universo.",
    },
    description: {
      en: "You distinguish clearly between clean, constructive remorse (repairing real harm) and dirty, neurotic guilt (self-sabotage and omnipotent responsibility). You celebrate success, set boundaries without agonizing, and allow others to experience their own emotional journeys.",
      id: "Kamu bisa membedakan secara jernih antara penyesalan bersih yang konstruktif (memperbaiki kekhilafan nyata) dan rasa bersalah neurotik yang beracun (sabotase diri dan merasa bertanggung jawab atas segalanya). Kamu merayakan keberhasilan dan menetapkan batasan diri tanpa rasa bersalah.",
      de: "Du unterscheidest klar zwischen konstruktiver Reue und neurotischen Schuldgefühlen. Du kannst Erfolge genießen, Grenzen ohne Qualen setzen und erlaubst anderen, ihre eigenen Gefühle zu tragen.",
      fr: "Vous distinguez clairement le regret constructif de la culpabilité toxique. Vous savourez vos réussites et posez des limites saines sans remords.",
      es: "Distingues con claridad el arrepentimiento constructivo de la culpa neurótica. Sabes disfrutar tus logros y poner límites sin torturarte.",
    },
    psychologyInsight: {
      en: "Clinical psychologists call this 'Differentiated Empathy': the ability to care deeply about another person's pain without feeling responsible for having caused it or being required to fix it.",
      id: "Psikolog klinis menyebut kondisi ini sebagai 'Differentiated Empathy': kemampuan berempati mendalam pada kesedihan orang lain tanpa merasa bersalah telah menyebabkannya atau wajib membereskannya.",
      de: "Psychologen nennen dies 'differenzierte Empathie': Mitfühlen können, ohne sich für die Rettung oder Verursachung des fremden Schmerzes verantwortlich zu fühlen.",
      fr: "Les psychologues nomment cela 'l'empathie différenciée' : compatir sincèrement sans se sentir coupable ni obligé de tout réparer.",
      es: "La psicología clínica llama a esto 'empatía diferenciada': conmoverse ante el dolor ajeno sin sentirse culpable de haberlo provocado ni obligado a resolverlo.",
    },
    actionProtocols: {
      en: [
        "Continue receiving compliments and gifts with a simple, gracious 'Thank you'.",
        "Maintain the distinction between your responsibilities (your behavior) and others' responsibilities (their feelings).",
        "Model boundary-setting without over-explaining or apologizing.",
      ],
      id: [
        "Lanjutkan kebiasaan menerima pujian dan hadiah dengan ucapan 'Terima kasih' yang tulus.",
        "Jaga batas jernih antara tanggung jawabmu (perilakumu) dan tanggung jawab orang lain (reaksi emosi mereka).",
        "Jadilah teladan dalam menetapkan batasan tanpa perlu memberi alasan berbelit atau minta maaf.",
      ],
      de: [
        "Nimm Geschenke und Komplimente weiterhin mit einem schlichten 'Danke' an.",
        "Halte die Grenze zwischen deinem Verhalten und den emotionalen Reaktionen anderer aufrecht.",
        "Setze Grenzen vor, ohne dich minutenlang zu rechtfertigen.",
      ],
      fr: [
        "Continuez d'accueillir les éloges d'un simple et chaleureux 'Merci'.",
        "Distinguez vos responsabilités (vos actes) de celles d'autrui (leurs ressentis).",
        "Incarnez des limites claires sans éprouver le besoin de vous justifier.",
      ],
      es: [
        "Sigue recibiendo los cumplidos con un sincero y agradecido 'Gracias'.",
        "Mantén la separación entre tus actos y las reacciones emocionales ajenas.",
        "Marca tus límites sin necesidad de justificarte ni pedir perdón.",
      ],
    },
    dailyAffirmation: {
      en: "I am responsible to people, not for people; my peace of mind is my birthright.",
      id: "Aku bertanggung jawab bersikap baik pada sesama, bukan bertanggung jawab atas hidup mereka; kedamaian batin adalah hak asliku.",
      de: "Ich bin für mein Handeln verantwortlich, nicht für die Gefühle anderer; mein innerer Frieden gehört mir.",
      fr: "Je suis responsable de mes actes, pas du bonheur des autres ; ma paix intérieure est légitime.",
      es: "Soy responsable de mis actos, no de la felicidad ajena; mi paz mental es un derecho propio.",
    },
  },

  mild_empathy_carrier: {
    level: "mild_empathy_carrier",
    badge: {
      en: "Empathy Carrier",
      id: "Penyerap Emosi",
      de: "Empathie-Träger",
      fr: "Éponge Empathique",
      es: "Portador de Empatía",
    },
    title: {
      en: "The Sensitive Empathy Carrier",
      id: "Penyerap Emosi yang Perasa",
      de: "Der feinfühlige Empathie-Träger",
      fr: "Le Porteur d'Empathie Sensible",
      es: "El Empático Sensible",
    },
    tagline: {
      en: "Occasional guilt flares when saying no, but generally functional self-worth.",
      id: "Sesekali tersengat rasa bersalah saat menolak, namun memiliki harga diri yang cukup stabil.",
      de: "Gelegentliche Schuldattacken beim Neinsagen, aber im Wesentlichen intakter Selbstwert.",
      fr: "Quelques sursauts de culpabilité en disant non, mais une estime de soi globalement saine.",
      es: "Ocasionales punzadas de culpa al poner límites, pero con buena autoestima de base.",
    },
    description: {
      en: "You have a big heart and a sensitive conscience. While you don't actively sabotage yourself, you frequently feel a twinge of guilt when leaving work on time, treating yourself to something expensive, or declining a social invite. You recover, but the initial reflex is to apologize.",
      id: "Kamu memiliki hati yang lembut dan nurani yang sangat peka. Meski tidak secara terang-terangan menyabotase diri, kamu kerap merasa bersalah saat pulang kantor tepat waktu, memanjakan diri dengan barang mahal, atau menolak ajakan kumpul teman. Kamu bisa pulih, namun refleks pertamamu masih sering meminta maaf.",
      de: "Du besitzt ein warmes Herz und ein sensibles Gewissen. Du sabotierst dich nicht mutwillig, spürst aber Schuld, wenn du pünktlich Feierabend machst oder Einladungen ausschlägst.",
      fr: "Vous avez un grand cœur et une conscience délicate. Vous ne vous détruisez pas, mais culpabilisez encore de partir à l'heure du travail ou de vous faire plaisir.",
      es: "Tienes un corazón noble y gran sensibilidad. No te saboteas, pero sientes cierta culpa al salir puntual del trabajo o darte un capricho.",
    },
    psychologyInsight: {
      en: "This reflects conditioned 'politeness training' common in conscientious eldest children and highly sensitive individuals (HSP).",
      id: "Kondisi ini merupakan cerminan dari 'pengkondisian kesopanan' yang lazim dialami anak pertama yang berbakti serta orang sensitif (HSP).",
      de: "Dies spiegelt typische Höflichkeitsprägungen gewissenhafter Erstgeborener und hochsensibler Persönlichkeiten (HSP) wider.",
      fr: "Ce fonctionnement provient d'un conditionnement à la gentillesse typique des aînés ou des personnes très sensibles (HSP).",
      es: "Refleja la educación en la cortesía excesiva propia de hermanos mayores o personas con alta sensibilidad (PAS).",
    },
    actionProtocols: {
      en: [
        "Replace 'I am sorry for the inconvenience' with 'Thank you for your understanding'.",
        "Schedule one unapologetic solo indulgence per week and practice sitting with the joy.",
        "Pause for 10 seconds before agreeing to sudden favor requests.",
      ],
      id: [
        "Ganti kalimat 'Maaf merepotkan' dengan 'Terima kasih atas pengertianmu'.",
        "Jadwalkan satu sesi memanjakan diri tanpa rasa bersalah per minggu dan nikmati rasa senangnya.",
        "Tarik napas dan beri jeda 10 detik sebelum mengiyakan permintaan tolong mendadak.",
      ],
      de: [
        "Ersetze 'Tut mir leid für die Umstände' durch 'Danke für dein Verständnis'.",
        "Gönne dir einmal pro Woche eine bewusste Auszeit und genieße sie ohne Reue.",
        "Atme 10 Sekunden durch, bevor du spontanen Bitten reflexartig zustimmst.",
      ],
      fr: [
        "Remplacez 'Désolé pour le dérangement' par 'Merci pour votre compréhension'.",
        "Offrez-vous un plaisir solitaire par semaine et savourez-le pleinement.",
        "Accordez-vous 10 secondes de pause avant de répondre oui à une sollicitation.",
      ],
      es: [
        "Sustituye 'Siento las molestias' por 'Gracias por tu comprensión'.",
        "Regálate un momento para ti a la semana y disfrútalo sin remordimientos.",
        "Tómate 10 segundos antes de acceder a favores imprevistos.",
      ],
    },
    dailyAffirmation: {
      en: "My joy and rest do not deprive anyone else of theirs; it is safe for me to be happy.",
      id: "Kebahagiaan dan istirahatku tidak merampas hak siapa pun; sangat aman bagiku untuk merasa bahagia.",
      de: "Meine Freude und Erholung nehmen niemandem etwas weg; es ist sicher für mich, glücklich zu sein.",
      fr: "Mon repos ne prive personne du sien ; j'ai le droit légitime d'être heureux.",
      es: "Mi alegría y mi descanso no le quitan nada a nadie; es completamente seguro ser feliz.",
    },
  },

  omnipotent_rescuer: {
    level: "omnipotent_rescuer",
    badge: {
      en: "Omnipotent Rescuer",
      id: "Penyelamat Serba Bisa",
      de: "Allmächtiger Retter",
      fr: "Sauveur Omnipotent",
      es: "Salvador Omnipotente",
    },
    title: {
      en: "The Omnipotent Rescuer",
      id: "Sang Penyelamat yang Menanggung Segalanya",
      de: "Der allmächtige Retter",
      fr: "Le Sauveur Sacrificiel",
      es: "El Salvador Compulsivo",
    },
    tagline: {
      en: "Believes self-worth requires keeping everyone happy, suffering from acute survivor's guilt.",
      id: "Merasa hanya berharga jika bisa membahagiakan semua orang, memikul survivor's guilt yang berat.",
      de: "Glaubt, erst dann wertvoll zu sein, wenn alle versorgt sind; leidet unter Trennungsschuld.",
      fr: "Se sent coupable dès que les autres vont mal, prisonnier d'un dévouement sacrificiel.",
      es: "Siente que su valor depende de salvar a todos, cargando con una abrumadora culpa de superviviente.",
    },
    description: {
      en: "You have an overactive moral compass that constantly sounds the alarm. If a family member is depressed, you feel like a criminal for feeling joy. You downplay your career milestones, hide good news, and exhaust your finances helping others, terrified that thriving is a betrayal of those left behind.",
      id: "Nurani moralmu bekerja overaktif dan terus membunyikan alarm bahaya. Jika ada keluarga yang murung, kamu merasa seperti penjahat saat merasa bahagia. Kamu mengecilkan pencapaian kariermu, menyembunyikan kabar baik, dan menguras tabungan demi menolong orang lain karena takut suksesmu dianggap mengkhianati mereka.",
      de: "Dein innerer moralischer Kompass schlägt permanent Alarm. Geht es Familienmitgliedern schlecht, fühlst du dich bei eigener Freude fast wie ein Verräter. Du versteckst Erfolge und erschöpfst deine Kräfte, um andere zu stützen.",
      fr: "Votre boussole morale est en surchauffe. Si un proche va mal, vous vous sentez criminel d'être heureux. Vous minimisez vos réussites et vous ruinez pour aider les autres par peur de trahir.",
      es: "Tu brújula moral vive en estado de alarma. Si alguien de tu entorno sufre, te sientes culpable por sonreír. Minimizas tus logros y te desgastas ayudando a todos por no sentirte desleal.",
    },
    psychologyInsight: {
      en: "Interpersonal psychoanalyst Joseph Weiss defines 'Omnipotent Guilt' as an unconscious childhood belief that one's own happiness, autonomy, and success inevitably harm parents or siblings.",
      id: "Psikoanalis relasional Joseph Weiss mendefinisikan 'Omnipotent Guilt' sebagai keyakinan bawah sadar masa kecil bahwa kebahagiaan, kemandirian, dan kesuksesan diri sendiri akan melukai orang tua atau saudara.",
      de: "Die Psychologie beschreibt 'allmächtige Schuld' als kindliche Überzeugung, dass das eigene Wohlergehen den Eltern oder Geschwistern Energie raubt oder sie beschämt.",
      fr: "L'analyste Joseph Weiss définit la culpabilité omnipotente comme la croyance inconsciente que notre réussite fait souffrir notre entourage.",
      es: "El psicoanálisis define la culpa omnipotente como la creencia inconsciente de que el propio éxito hiere inevitablemente a los seres queridos.",
    },
    actionProtocols: {
      en: [
        "Acknowledge the boundary: write down *'Their emotional struggle is their sacred journey, not my debt to pay.'*",
        "Stop hiding your wins; share accomplishments without softening or downplaying them.",
        "Practice releasing family emotional baggage in Nuju's private voice journal before bed.",
      ],
      id: [
        "Tegaskan batasan batin: tulis *'Perjuangan emosi mereka adalah proses hidup mereka, bukan utang yang harus kubayar.'*",
        "Berhenti menyembunyikan prestasimu; bagikan kabar baik tanpa perlu mengecilkan nilainya.",
        "Tuangkan beban rasa bersalah keluarga ke dalam rekaman curhat suara privat di Nuju sebelum tidur.",
      ],
      de: [
        "Grenze dich ab: Notiere *'Ihr Schmerz ist ihr Lebensweg, nicht meine offene Schuld.'*",
        "Höre auf, Erfolge zu verstecken; teile gute Nachrichten ungeschminkt.",
        "Entlade familiären Schuldballast abends als kurze Sprachnotiz im privaten Nuju-Tagebuch.",
      ],
      fr: [
        "Posez la frontière mentale : *'Leurs difficultés leur appartiennent, je n'ai pas à payer pour eux.'*",
        "Cessez de cacher vos réussites ; partagez vos victoires sans fausse modestie.",
        "Déposez la culpabilité familiale dans une note vocale sur Nuju avant de dormir.",
      ],
      es: [
        "Establece el límite interno: *'Sus batallas son su camino, no una deuda que yo deba saldar.'*",
        "Deja de ocultar tus triunfos; comparte tus alegrías sin restarles mérito.",
        "Vuelca la carga familiar en el diario de voz de Nuju antes de meterte en la cama.",
      ],
    },
    dailyAffirmation: {
      en: "Dimming my light does not brighten anyone else's path; I permit myself to thrive.",
      id: "Meredupkan cahayaku tidak akan menerangi jalan orang lain; aku mengizinkan diriku untuk bersinar dan sukses.",
      de: "Mein Licht zu dimmen, macht den Weg anderer nicht heller; ich erlaube mir, voll aufzublühen.",
      fr: "Éteindre ma lumière n'éclaire le chemin de personne ; je m'autorise à briller.",
      es: "Apagar mi luz no alumbra el camino de nadie; me doy permiso para florecer en plenitud.",
    },
  },

  punitive_penitent: {
    level: "punitive_penitent",
    badge: {
      en: "Punitive Penitent",
      id: "Penghukum Diri",
      de: "Selbstbestrafer",
      fr: "Pénitent Punitif",
      es: "Castigador Interno",
    },
    title: {
      en: "The Punitive Self-Saboteur",
      id: "Sang Penghukum Diri Kronis",
      de: "Der punitive Selbstsaboteur",
      fr: "L'Auto-Saboteur Punitif",
      es: "El Autosaboteador Punitivo",
    },
    tagline: {
      en: "Severe Upper Limit Problem where peace triggers panic, repeatedly destroying good opportunities.",
      id: "Upper Limit Problem parah di mana kedamaian memicu panik, berulang kali merusak peluang emas.",
      de: "Massives Upper Limit Problem: Ruhe löst Panik aus und zerstört Erfolge kurz vor dem Ziel.",
      fr: "Syndrome de rupture du bonheur : la paix déclenche la panique et détruit les opportunités.",
      es: "Autosabotaje severo: la tranquilidad provoca angustia y arruina oportunidades a las puertas del éxito.",
    },
    description: {
      en: "You are locked in Gay Hendricks' 'Upper Limit Problem'. Whenever your relationship reaches true emotional intimacy or your career achieves stability, an internal punitive alarm detonates. You pick fights, overspend recklessly, make careless mistakes, or trigger physical ailments to bring your happiness back down to familiar misery.",
      id: "Kamu terperangkap dalam 'Upper Limit Problem' (Gay Hendricks). Setiap kali hubunganmu mencapai keintiman sejati atau kariermu stabil makmur, alarm penghukum batin meledak. Kamu memicu ribut, boros tak terkendali, bikin teledor, atau mendadak sakit demi menurunkan kembali bahagiamu ke level penderitaan yang familier.",
      de: "Du steckst im 'Upper Limit Problem' fest. Sobald Liebe echt wird oder Erfolg eintritt, detoniert ein innerer Saboteur. Du provozierst Streit, machst Leichtsinnsfehler oder wirst krank, um dein Glück auf das gewohnte Maß an Leid zurückzudrücken.",
      fr: "Vous êtes prisonnier du plafond de verre intérieur. Dès que l'amour ou la réussite s'installe, une alarme saboteuse explose. Vous créez des disputes ou accumulez les erreurs pour ramener votre bonheur à un niveau familier de souffrance.",
      es: "Vives atrapado en el 'Upper Limit Problem'. Cuando la relación o el trabajo alcanzan la paz, un detonador interno explota. Provocas discusiones o cometes fallos absurdos para devolver tu vida al sufrimiento conocido.",
    },
    psychologyInsight: {
      en: "Freudian and modern neuro-psychoanalytic research identifies this as an aggressive, internalized punitive Superego: the unconscious mind equates unearned ease with mortal vulnerability, so it pre-emptively ruins good things to maintain illusory control.",
      id: "Riset psikoanalisis modern mengidentifikasi pola ini sebagai 'Superego Penghukum' yang terinternalisasi: pikiran bawah sadar menganggap hidup tanpa derita sebagai ancaman bahaya, sehingga sengaja merusak hal baik demi mempertahankan kendali semu.",
      de: "Die Neuropsychologie sieht hier ein überstarkes strafendes Über-Ich: Das Gehirn hält unverdientes Glück für gefährlich und zerstört es lieber selbst, um die Kontrolle nicht zu verlieren.",
      fr: "Cette dynamique correspond à un surmoi punitif impitoyable : l'inconscient associe le bonheur immérité au danger et préfère saboter la situation pour garder la maîtrise.",
      es: "La neuropsicología identifica esto como un superyó punitivo: la mente inconsciente asocia la dicha con la vulnerabilidad extrema y prefiere destruirla antes de perder el control.",
    },
    actionProtocols: {
      en: [
        "Catch the Upper Limit surge: when joy appears, say out loud: *'I expand in abundance, success, and love, and I inspire others to do the same.'*",
        "Do not act on fight-or-flight impulses within 48 hours of receiving good news or deep connection.",
        "Reset your vagus nerve with daily Stanford Physiological Sighs: [Open Breath Pacer](/tools/physiological-sigh).",
      ],
      id: [
        "Tangkap lonjakan Upper Limit: saat rasa senang datang, ucapkan lantang: *'Aku memperluas kapasitas bahagiaku, kesuksesanku, dan cintaku, serta menginspirasi sesama.'*",
        "Jangan ambil tindakan impulsif apa pun dalam 48 jam pertama setelah menerima kabar baik atau keintiman mendalam.",
        "Lakukan reset saraf vagus lewat teknik napas ganda harian Stanford: [Buka Pacer Napas](/tools/physiological-sigh).",
      ],
      de: [
        "Entlarve den Saboteur: Wenn Freude aufsteigt, sprich laut: *'Ich erlaube mir Fülle, Liebe und Erfolg.'*",
        "Triff nach guten Nachrichten oder tiefen Momenten 48 Stunden lang keine impulsiven Entscheidungen.",
        "Reguliere dein Nervensystem täglich mit dem physiologischen Seufzer: [Atem-Pacer öffnen](/tools/physiological-sigh).",
      ],
      fr: [
        "Démasquez le réflexe : quand la joie surgit, répétez : *'J'accueille l'abondance et l'amour sans peur.'*",
        "Ne prenez aucune décision impulsive dans les 48 heures suivant une bonne nouvelle.",
        "Apaisez votre système nerveux par le soupir physiologique : [Ouvrir l'Exercice](/tools/physiological-sigh).",
      ],
      es: [
        "Frena el autosabotaje: cuando sientas alegría, di en voz alta: *'Acepto la plenitud, el éxito y el amor.'*",
        "No tomes decisiones impulsivas en las 48 horas posteriores a una gran noticia o momento íntimo.",
        "Regula tu sistema nervioso con el suspiro fisiológico diario: [Abrir Guía de Respiración](/tools/physiological-sigh).",
      ],
    },
    dailyAffirmation: {
      en: "It is safe for things to be easy; it is safe for me to be happy and peaceful.",
      id: "Sangat aman jika hidup terasa mudah; sangat aman bagiku untuk hidup bahagia dan damai.",
      de: "Es ist sicher, dass das Leben leicht sein darf; es ist sicher für mich, glücklich und in Frieden zu sein.",
      fr: "Il est sans danger que la vie soit douce ; je suis en sécurité dans le bonheur et la paix.",
      es: "Es completamente seguro que las cosas fluyan fácil; es seguro ser feliz y vivir en paz.",
    },
  },
};

export function calculateChronicGuiltScore(
  answers: Record<number, number>
): ChronicGuiltScoreResult {
  let totalScore = 0;
  let omnipotentScore = 0;
  let sabotageScore = 0;
  let unworthinessScore = 0;

  CHRONIC_GUILT_QUESTIONS.forEach((q) => {
    const score = answers[q.id] ?? 0;
    totalScore += score;

    if (q.subscale === "omnipotent_responsibility") omnipotentScore += score;
    if (q.subscale === "punitive_self_sabotage") sabotageScore += score;
    if (q.subscale === "unworthiness_anxiety") unworthinessScore += score;
  });

  const maxTotal = CHRONIC_GUILT_QUESTIONS.length * 3; // 36
  const maxSubscale = 4 * 3; // 12
  const percentage = Math.round((totalScore / maxTotal) * 100);

  let level: ChronicGuiltArchetype["level"];
  if (percentage <= 24) {
    level = "grounded_accountable";
  } else if (percentage <= 49) {
    level = "mild_empathy_carrier";
  } else if (percentage <= 74) {
    level = "omnipotent_rescuer";
  } else {
    level = "punitive_penitent";
  }

  return {
    totalScore,
    percentage,
    level,
    profile: CHRONIC_GUILT_ARCHETYPES[level],
    subscales: {
      omnipotent_responsibility: {
        score: omnipotentScore,
        percentage: Math.round((omnipotentScore / maxSubscale) * 100),
      },
      punitive_self_sabotage: {
        score: sabotageScore,
        percentage: Math.round((sabotageScore / maxSubscale) * 100),
      },
      unworthiness_anxiety: {
        score: unworthinessScore,
        percentage: Math.round((unworthinessScore / maxSubscale) * 100),
      },
    },
  };
}
