export type EmotionalNumbnessLang = "en" | "id" | "de" | "fr" | "es";

export interface EmotionalNumbnessQuestion {
  id: number;
  subscale: "affective_flatness" | "dorsal_shutdown" | "anhedonia_detachment";
  prompt: Record<EmotionalNumbnessLang, string>;
  options: {
    label: Record<EmotionalNumbnessLang, string>;
    score: number; // 0 to 3
  }[];
}

export interface EmotionalNumbnessArchetype {
  level: "emotionally_fluid_vital" | "mildly_shielded_observer" | "dorsal_blunted_sentinel" | "deep_freeze_shutdown";
  badge: Record<EmotionalNumbnessLang, string>;
  title: Record<EmotionalNumbnessLang, string>;
  tagline: Record<EmotionalNumbnessLang, string>;
  description: Record<EmotionalNumbnessLang, string>;
  psychologyInsight: Record<EmotionalNumbnessLang, string>;
  actionProtocols: Record<EmotionalNumbnessLang, string[]>;
  dailyAffirmation: Record<EmotionalNumbnessLang, string>;
}

export interface EmotionalNumbnessScoreResult {
  totalScore: number;
  percentage: number;
  level: EmotionalNumbnessArchetype["level"];
  profile: EmotionalNumbnessArchetype;
  subscales: {
    affective_flatness: { score: number; percentage: number };
    dorsal_shutdown: { score: number; percentage: number };
    anhedonia_detachment: { score: number; percentage: number };
  };
}

export const EMOTIONAL_NUMBNESS_QUESTIONS: EmotionalNumbnessQuestion[] = [
  // Subscale 1: Affective Flatness (Polyvagal Dorsal Shutdown)
  {
    id: 1,
    subscale: "affective_flatness",
    prompt: {
      en: "When something major happens (good or bad news), I feel oddly neutral or hollow, like a spectator watching through thick glass.",
      id: "Saat terjadi hal besar (kabar baik atau buruk), aku merasa datar atau hampa, seperti penonton yang melihat dari balik kaca tebal.",
      de: "Wenn etwas Großes passiert (gute oder schlechte Nachrichten), fühle ich mich merkwürdig neutral oder hohl, wie ein Zuschauer hinter dickem Glas.",
      fr: "Quand un événement majeur survient (bonne ou mauvaise nouvelle), je me sens étrangement neutre ou vide, comme un spectateur derrière une vitre.",
      es: "Cuando sucede algo importante (buenas o malas noticias), me siento extrañamente neutro o vacío, como un espectador tras un cristal grueso.",
    },
    options: [
      {
        score: 0,
        label: {
          en: "Rarely — I experience vibrant, appropriate emotional responses",
          id: "Jarang — aku merasakan respons emosi yang hidup dan selaras",
          de: "Selten — ich erlebe lebendige, angemessene emotionale Reaktionen",
          fr: "Rarement — je ressens des émotions vives et appropriées",
          es: "Casi nunca — experimento emociones vívidas y congruentes",
        },
      },
      {
        score: 1,
        label: {
          en: "Sometimes after prolonged stress or when exhausted",
          id: "Kadang-kadang terutama setelah stres panjang atau sangat lelah",
          de: "Manchmal nach anhaltendem Stress oder bei Erschöpfung",
          fr: "Parfois après un stress prolongé ou une grande fatigue",
          es: "A veces tras un estrés prolongado o cuando estoy exhausto",
        },
      },
      {
        score: 2,
        label: {
          en: "Frequently — my default reaction is flat, muted composure",
          id: "Sering — respons default-ku adalah ketenangan yang datar dan redup",
          de: "Häufig — meine Standardreaktion ist flache, gedämpfte Gelassenheit",
          fr: "Souvent — ma réaction par défaut est un calme plat et émoussé",
          es: "Frecuentemente — mi reacción habitual es una calma plana y apagada",
        },
      },
      {
        score: 3,
        label: {
          en: "Almost always — I cannot remember the last time I felt pure joy or real grief",
          id: "Hampir selalu — aku lupa kapan terakhir kali merasakan sukacita murni atau duka nyata",
          de: "Fast immer — ich erinnere mich kaum daran, wann ich echte Freude oder Trauer fühlte",
          fr: "Presque toujours — je ne me rappelle plus la dernière fois où j'ai ressenti une joie ou une peine vive",
          es: "Casi siempre — no recuerdo la última vez que sentí alegría pura o tristeza auténtica",
        },
      },
    ],
  },
  {
    id: 2,
    subscale: "affective_flatness",
    prompt: {
      en: "I find myself 'acting out' emotions (laughing at jokes, acting concerned) because I know it is socially expected, not because I actually feel it.",
      id: "Aku mendapati diriku 'berakting' berekspresi (tertawa pada lelucon, menunjukkan simpati) hanya karena itu pantas secara sosial, bukan karena benar-benar merasakannya.",
      de: "Ich ertappe mich dabei, Emotionen 'nachzuspielen' (bei Witzen lachen, Anteilnahme mimen), weil es erwartet wird, nicht weil ich es fühle.",
      fr: "Je me surprends à 'jouer' des émotions (rire aux blagues, paraître ému) par convention sociale plutôt que par ressenti réel.",
      es: "Me descubro fingiendo emociones (reír con chistes, parecer conmovido) por cortesía social, no porque realmente lo sienta.",
    },
    options: [
      {
        score: 0,
        label: {
          en: "Rarely or never — my laughter and empathy are genuine",
          id: "Jarang atau tidak pernah — tawa dan empatiku tulus dari hati",
          de: "Selten oder nie — mein Lachen und Mitgefühl sind echt",
          fr: "Rarement ou jamais — mes rires et mon empathie sont authentiques",
          es: "Casi nunca — mi risa y mi empatía son genuinas",
        },
      },
      {
        score: 1,
        label: {
          en: "Occasionally in stiff professional settings or casual networking",
          id: "Sesekali hanya dalam suasana formal pekerjaan atau basa-basi sosial",
          de: "Gelegentlich im steifen beruflichen Kontext",
          fr: "Parfois dans des contextes professionnels formels",
          es: "Ocasionalmente en reuniones laborales formales",
        },
      },
      {
        score: 2,
        label: {
          en: "Often — social interactions feel like a script I must perform without emotional investment",
          id: "Sering — interaksi sosial terasa seperti skenario sandiwara tanpa keterlibatan emosi",
          de: "Oft — soziale Kontakte fühlen sich wie ein Drehbuch an, das ich emotionslos abspiele",
          fr: "Souvent — les échanges sociaux ressemblent à un script sans investissement affectif",
          es: "A menudo — la vida social se siente como un guión que interpreto sin involucrarme",
        },
      },
      {
        score: 3,
        label: {
          en: "Constantly — I feel like an emotionless robot wearing a convincing human disguise",
          id: "Terus-menerus — aku merasa seperti robot tanpa emosi yang mengenakan topeng manusia",
          de: "Ständig — ich fühle mich wie ein emotionsloser Roboter in menschlicher Verkleidung",
          fr: "Constamment — j'ai l'impression d'être un robot sans émotion sous un déguisement humain",
          es: "Constantemente — me siento como un robot desprovisto de emoción bajo un disfraz humano",
        },
      },
    ],
  },
  {
    id: 3,
    subscale: "affective_flatness",
    prompt: {
      en: "When people show deep emotional vulnerability or cry around me, I feel uncomfortably detached or analytically cold inside.",
      id: "Saat orang di dekatku menangis atau menunjukkan kerentanan emosional mendalam, aku merasa sangat dingin dan terpisah secara analitis.",
      de: "Wenn Menschen um mich herum weinen oder tief berührt sind, fühle ich mich unangenehm distanziert oder analytisch kühl.",
      fr: "Quand quelqu'un pleure ou se confie intensément près de moi, je me sens étrangement distant ou froidement analytique.",
      es: "Cuando alguien llora o muestra gran vulnerabilidad a mi lado, me siento incómodamente distante o analíticamente frío.",
    },
    options: [
      {
        score: 0,
        label: {
          en: "Rarely — I feel natural warmth, resonance, and compassionate empathy",
          id: "Jarang — aku merasakan kehangatan alami, resonansi batin, dan empati peduli",
          de: "Selten — ich spüre natürliche Wärme und mitfühlende Anteilnahme",
          fr: "Rarement — je ressens une chaleur naturelle et une empathie bienveillante",
          es: "Casi nunca — siento calidez natural y empatía compasiva",
        },
      },
      {
        score: 1,
        label: {
          en: "Occasionally if I don't know the person well",
          id: "Sesekali jika aku belum begitu mengenal orang tersebut",
          de: "Gelegentlich, wenn ich die Person kaum kenne",
          fr: "Parfois si la personne ne m'est pas proche",
          es: "Ocasionalmente si no conozco bien a la persona",
        },
      },
      {
        score: 2,
        label: {
          en: "Frequently — I analyze what to say logically while feeling zero somatic resonance",
          id: "Sering — aku menganalisis kata-kata penghibur secara logis tanpa resonansi rasa",
          de: "Häufig — ich analysiere logisch die passenden Worte, fühle aber somatisch nichts",
          fr: "Souvent — j'analyse logiquement quoi dire sans ressentir d'écho corporel",
          es: "A menudo — analizo lógicamente qué decir sin sentir resonancia física o afectiva",
        },
      },
      {
        score: 3,
        label: {
          en: "Almost always — other people's strong feelings seem foreign, bewildering, or sterile to me",
          id: "Hampir selalu — perasaan mendalam orang lain terasa asing, membingungkan, dan hampa bagiku",
          de: "Fast immer — starke Gefühle anderer wirken auf mich fremdartig und steril",
          fr: "Presque toujours — les émotions vives d'autrui me semblent étrangères et abstraites",
          es: "Casi siempre — las emociones intensas de los demás me parecen ajenas y desconcertantes",
        },
      },
    ],
  },
  {
    id: 4,
    subscale: "affective_flatness",
    prompt: {
      en: "I struggle to identify what I am feeling in my physical body (hunger, tension, anger, warmth) until it becomes extreme.",
      id: "Aku kesulitan mengenali apa yang sedang kurasakan di tubuh fisikku (lapar, tegang, marah, hangat) hingga sudah di tahap ekstrem.",
      de: "Ich kann Körpersignale (Hunger, Anspannung, Wut, Wärme) kaum spüren, bis sie extrem werden.",
      fr: "J'ai du mal à identifier mes sensations corporelles (faim, tension, colère) avant qu'elles ne soient extrêmes.",
      es: "Me cuesta identificar sensaciones corporales (hambre, tensión, enojo) hasta que son desbordantes.",
    },
    options: [
      {
        score: 0,
        label: {
          en: "Rarely — I am well-attuned to subtle interoceptive cues in my body",
          id: "Jarang — aku peka terhadap sinyal-sinyal halus tubuhku",
          de: "Selten — ich nehme feine Körpersignale gut wahr",
          fr: "Rarement — je perçois très bien les signaux internes de mon corps",
          es: "Casi nunca — estoy muy conectado con las señales sutiles de mi cuerpo",
        },
      },
      {
        score: 1,
        label: {
          en: "Sometimes when hyper-focused on work or computer screens",
          id: "Kadang-kadang saat sangat fokus pada pekerjaan atau layar laptop",
          de: "Manchmal bei starkem Fokus auf die Arbeit",
          fr: "Parfois lors de phases de travail intensif sur écran",
          es: "A veces cuando me concentro intensamente en una pantalla",
        },
      },
      {
        score: 2,
        label: {
          en: "Frequently — I am mostly a 'floating head' detached from my physical sensation",
          id: "Sering — aku seperti 'kepala yang melayang' terpisah dari sensasi fisik tubuh",
          de: "Häufig — ich lebe fast nur im Kopf, abgetrennt vom Körper",
          fr: "Souvent — j'ai l'impression d'être une tête pensante coupée de son corps",
          es: "A menudo — vivo como una cabeza pensante desconectada de las sensaciones",
        },
      },
      {
        score: 3,
        label: {
          en: "Constantly — severe interoceptive blackout until my body collapses or gets sick",
          id: "Terus-menerus — pemutusan total hingga tubuhku mendadak ambruk atau jatuh sakit",
          de: "Ständig — völliger Sinnes-Blackout, bis der Körper streikt oder krank wird",
          fr: "Constamment — déconnexion totale jusqu'à l'effondrement ou la maladie",
          es: "Constantemente — desconexión total hasta que mi cuerpo colapsa o enferma",
        },
      },
    ],
  },

  // Subscale 2: Dorsal Vagal Shutdown & Defensive Freeze
  {
    id: 5,
    subscale: "dorsal_shutdown",
    prompt: {
      en: "Under prolonged stress, rather than panicking or crying, my system powers down like a phone entering extreme battery-saver mode.",
      id: "Saat stres berkepanjangan, alih-alih panik atau menangis, energiku padam seperti HP yang masuk mode hemat baterai ekstrem.",
      de: "Bei Dauerstress fahre ich innerlich herunter wie ein Smartphone im extremen Stromsparmodus, statt zu weinen oder zu toben.",
      fr: "Sous stress prolongé, au lieu de paniquer ou pleurer, mon système s'éteint comme un téléphone en mode économie extrême.",
      es: "Bajo estrés prolongado, en lugar de llorar o entrar en pánico, mi energía se apaga como un móvil en modo ultra-ahorro.",
    },
    options: [
      {
        score: 0,
        label: {
          en: "Rarely or never — I process stress through active communication or healthy release",
          id: "Jarang atau tidak pernah — aku memproses stres melalui komunikasi aktif atau pelepasan sehat",
          de: "Selten oder nie — ich baue Stress aktiv und gesund ab",
          fr: "Rarement ou jamais — je gère le stress par le dialogue et l'expression",
          es: "Casi nunca — proceso el estrés mediante la comunicación o desahogo saludable",
        },
      },
      {
        score: 1,
        label: {
          en: "Occasionally after multiple sleepless nights or intense crises",
          id: "Sesekali setelah beberapa malam kurang tidur atau krisis berat",
          de: "Gelegentlich nach Schlafmangel oder Krisen",
          fr: "Parfois après des nuits blanches ou de rudes épreuves",
          es: "Ocasionalmente tras noches sin dormir o crisis agudas",
        },
      },
      {
        score: 2,
        label: {
          en: "Frequently — my default coping mechanism is shutdown, silence, and heavy inertia",
          id: "Sering — mekanisme pertahananku adalah mogok emosi, diam membisu, dan lemas tanpa daya",
          de: "Häufig — mein Schutzreflex ist Schweigen, Taubheit und schwere Trägheit",
          fr: "Souvent — mon réflexe est le silence, l'engourdissement et l'inertie lourde",
          es: "A menudo — mi defensa habitual es el apagón, el silencio y una densa inercia",
        },
      },
      {
        score: 3,
        label: {
          en: "Chronic state — I feel permanently trapped in a dorsal vagal freeze response",
          id: "Kondisi kronis — aku merasa terjebak permanen dalam mode pembekuan saraf (dorsal vagal freeze)",
          de: "Dauerzustand — ich fühle mich dauerhaft im dorsalen Vagus-Freeze gefangen",
          fr: "État chronique — je me sens figé en permanence dans une sidération dorsale vagale",
          es: "Estado crónico — me siento atrapado de forma continua en una parálisis dorsal vagal",
        },
      },
    ],
  },
  {
    id: 6,
    subscale: "dorsal_shutdown",
    prompt: {
      en: "I feel a heavy, dull fog in my head and limbs, making even speaking or lifting my arms feel like moving through molasses.",
      id: "Aku merasakan kabut tebal dan berat di kepala serta ototku, membuat bicara atau mengangkat tangan terasa seperti bergerak di dalam lumpur.",
      de: "Ich spüre eine schwere Benommenheit im Kopf und in den Gliedern, sodass selbst Reden oder Bewegen mühsam wie durch Sirup wirkt.",
      fr: "Je ressens une lourdeur ou un brouillard qui rend chaque mot ou geste aussi difficile qu'avancer dans de la mélasse.",
      es: "Siento una densa niebla y pesadez en el cuerpo que hace que hablar o moverme requiera un esfuerzo titánico.",
    },
    options: [
      {
        score: 0,
        label: {
          en: "Never or rarely — my physical vitality is nimble and responsive",
          id: "Tidak pernah atau jarang — fisik dan energiku lincah serta responsif",
          de: "Nie oder selten — meine körperliche Vitalität ist lebendig",
          fr: "Jamais ou rarement — mon corps est alerte et dynamique",
          es: "Nunca o casi nunca — mi vitalidad es fluida y despierta",
        },
      },
      {
        score: 1,
        label: {
          en: "Only during acute viral illness or intense physical jet lag",
          id: "Hanya saat terserang flu berat atau kelelahan fisik luar biasa",
          de: "Nur bei Infekten oder akutem Schlafmangel",
          fr: "Uniquement lors d'une infection virale ou d'un grand décalage horaire",
          es: "Solo durante cuadros virales o agotamiento físico extremo",
        },
      },
      {
        score: 2,
        label: {
          en: "Several afternoons a week, especially when facing social demands",
          id: "Beberapa siang dalam seminggu, terutama saat harus menghadapi tuntutan sosial",
          de: "Mehrmals wöchentlich, besonders bei anstrengenden sozialen Pflichten",
          fr: "Plusieurs après-midis par semaine, surtout face aux obligations sociales",
          es: "Varias tardes a la semana, en especial ante demandas sociales",
        },
      },
      {
        score: 3,
        label: {
          en: "Almost daily — a pervasive physiological stupor and leaden paralysis",
          id: "Hampir setiap hari — rasa kaku dan kelumpuhan tubuh yang menekan seperti timbal",
          de: "Fast täglich — bleierne Lähmung und anhaltende Benommenheit",
          fr: "Presque chaque jour — une stupeur physiologique pesante et paralysante",
          es: "A diario — un estupor corporal pesado y paralizante",
        },
      },
    ],
  },
  {
    id: 7,
    subscale: "dorsal_shutdown",
    prompt: {
      en: "I use endless scrolling, mindless background noise, or dissociation to avoid sitting with the emptiness inside.",
      id: "Aku menggunakan scrolling tanpa henti, suara latar TV/podcast, atau melamun untuk menghindari berhadapan dengan kehampaan di dalam diriku.",
      de: "Ich nutze Dauer-Scrollen, Hintergrundrauschen oder Wegdriften, um der inneren Leere nicht begegnen zu müssen.",
      fr: "J'utilise le scroll compulsif, des bruits de fond ou la dissociation pour fuir le vide intérieur.",
      es: "Uso el scroll infinito, ruido de fondo o la ensoñación para evitar encontrarme con el vacío interior.",
    },
    options: [
      {
        score: 0,
        label: {
          en: "Rarely — I can sit comfortably in quiet stillness without digital pacifiers",
          id: "Jarang — aku nyaman duduk dalam keheningan tanpa perlu pengalih digital",
          de: "Selten — ich kann Stille und Nichtstun gut aushalten",
          fr: "Rarement — je peux rester dans le silence et le calme sans béquille numérique",
          es: "Casi nunca — disfruto del silencio y la quietud sin pantallas",
        },
      },
      {
        score: 1,
        label: {
          en: "Occasionally when bored or relaxing on weekend evenings",
          id: "Sesekali saat bosan atau bersantai di akhir pekan",
          de: "Gelegentlich aus Langeweile am Wochenende",
          fr: "Parfois par ennui le week-end",
          es: "Ocasionalmente por aburrimiento los fines de semana",
        },
      },
      {
        score: 2,
        label: {
          en: "Frequently — silence feels threatening or suffocating, so I numb it immediately",
          id: "Sering — keheningan terasa mencekam atau menyesakkan, jadi langsung kubungkam dengan stimulasi",
          de: "Häufig — Stille fühlt sich erdrückend an, also betäube ich sie sofort",
          fr: "Souvent — le silence m'angoisse, je l'anesthésie immédiatement",
          es: "A menudo — el silencio me resulta incómodo y lo adormezco al instante",
        },
      },
      {
        score: 3,
        label: {
          en: "Constant compulsive numbing — from waking to sleeping, my mind is perpetually sedated",
          id: "Terus-menerus — sejak bangun hingga tidur, pikiranku dibius secara konsisten agar tidak merasa",
          de: "Dauerhafte Betäubung — von morgens bis abends halte ich meinen Geist künstlich sediert",
          fr: "Anesthésie constante — du réveil au coucher, mon esprit est maintenu sous sédation",
          es: "Adormecimiento constante — desde que despierto hasta que duermo, mi mente se mantiene sedada",
        },
      },
    ],
  },
  {
    id: 8,
    subscale: "dorsal_shutdown",
    prompt: {
      en: "I prefer isolating in a dark room over connecting with loved ones, because any human contact feels like an unbearable drain on my reserves.",
      id: "Aku lebih memilih mengurung diri di kamar gelap daripada berinteraksi dengan orang tersayang, karena kontak manusia terasa sangat menguras sisa energiku.",
      de: "Ich ziehe ein dunkles Zimmer Kontakten vor, weil selbst geliebte Menschen mir wie ein unerträglicher Energieentzug vorkommen.",
      fr: "Je préfère m'isoler dans l'obscurité que de voir mes proches, car le contact humain me vide instantanément.",
      es: "Prefiero encerrarme a oscuras que ver a mis seres queridos, porque el contacto humano me agota por completo.",
    },
    options: [
      {
        score: 0,
        label: {
          en: "Rarely — human warmth restores and enlivens me",
          id: "Jarang — kehangatan manusia justru memulihkan dan menyemangati jiwaku",
          de: "Selten — menschliche Nähe nährt und stärkt mich",
          fr: "Rarement — la chaleur humaine me ressource et me fait du bien",
          es: "Casi nunca — la cercanía humana me nutre y me da vitalidad",
        },
      },
      {
        score: 1,
        label: {
          en: "Sometimes when I need an introvert recharge after a busy week",
          id: "Kadang-kadang saat butuh recharge baterai introvert setelah minggu yang padat",
          de: "Manchmal, wenn ich als Introvertierter eine Pause brauche",
          fr: "Parfois pour recharger mes batteries d'introverti",
          es: "A veces cuando necesito recargar energía introvertida",
        },
      },
      {
        score: 2,
        label: {
          en: "Frequently — I cancel plans and retreat behind closed curtains for safety",
          id: "Sering — aku membatalkan janji dan bersembunyi di balik gorden tertutup demi rasa aman",
          de: "Häufig — ich sage Verabredungen ab und verkrieche mich hinter geschlossenen Vorhängen",
          fr: "Souvent — j'annule mes rendez-vous pour me cloîtrer chez moi en sécurité",
          es: "A menudo — cancelo planes para refugiarme tras las cortinas cerradas",
        },
      },
      {
        score: 3,
        label: {
          en: "Almost always — total social retreat; the world outside feels overwhelmingly abrasive",
          id: "Hampir selalu — penarikan sosial total; dunia luar terasa terlalu kasar dan menyakitkan",
          de: "Fast immer — totaler Rückzug; die Außenwelt fühlt sich schmerzhaft übergriffig an",
          fr: "Presque toujours — retrait social total ; le monde extérieur m'agresse violemment",
          es: "Casi siempre — aislamiento social total; el mundo exterior me resulta insoportable",
        },
      },
    ],
  },

  // Subscale 3: Anhedonia & Detachment
  {
    id: 9,
    subscale: "anhedonia_detachment",
    prompt: {
      en: "Hobbies, music, and food that used to bring me intense joy now feel completely flavorless and grey.",
      id: "Hobi, musik, dan makanan yang dulu memberi kenikmatan mendalam kini terasa hambar, abu-abu, dan tanpa rasa.",
      de: "Hobbys, Musik oder gutes Essen, die mir einst Freude bereiteten, wirken nun farblos und schal.",
      fr: "Les passions, la musique et les mets qui me réjouissaient me semblent aujourd'hui insipides et gris.",
      es: "Mis pasiones, la música o la comida que antes disfrutaba ahora me parecen completamente desabridas y grises.",
    },
    options: [
      {
        score: 0,
        label: {
          en: "Rarely — I regularly experience rich sensory pleasure and enthusiasm",
          id: "Jarang — aku rutin merasakan kenikmatan sensorik dan antusiasme hidup",
          de: "Selten — ich genieße Sinneseindrücke und Begeisterung regelmäßig",
          fr: "Rarement — je savoure régulièrement des plaisirs sensoriels et des élans de joie",
          es: "Casi nunca — disfruto plenamente de placeres sensoriales e ilusiones",
        },
      },
      {
        score: 1,
        label: {
          en: "Mildly during stressful work stretches",
          id: "Sedikit berkurang hanya saat fase lembur atau kelelahan kerja",
          de: "Leicht gedämpft in stressigen Phasen",
          fr: "Légèrement atténué lors de périodes de surmenage",
          es: "Levemente durante épocas de mucho trabajo",
        },
      },
      {
        score: 2,
        label: {
          en: "Noticeable anhedonia — things I loved feel like mechanical chores",
          id: "Anhedonia terasa nyata — hal yang kusukai kini terasa seperti beban tugas mekanis",
          de: "Spürbare Anhedonie — Dinge, die ich liebte, wirken wie Pflichtübungen",
          fr: "Ananhédonie nette — ce que j'aimais ressemble désormais à une corvée mécanique",
          es: "Anhedonia notable — lo que amaba ahora se siente como un trámite aburrido",
        },
      },
      {
        score: 3,
        label: {
          en: "Severe complete anhedonia — total color drain from my psychological landscape",
          id: "Anhedonia berat total — seluruh warna dan rasa telah terkuras habis dari jiwaku",
          de: "Schwere Anhedonie — vollkommener Farbverlust meiner gesamten Innenwelt",
          fr: "Anhédonie sévère — tout relief émotionnel et tout plaisir ont disparu",
          es: "Anhedonia severa — pérdida total de color y entusiasmo en mi mundo interno",
        },
      },
    ],
  },
  {
    id: 10,
    subscale: "anhedonia_detachment",
    prompt: {
      en: "I feel emotionally disconnected from my own memories, as if my past happened to someone else.",
      id: "Aku merasa terputus secara emosional dari kenangan masa laluku, seolah hidupku dialami oleh orang lain.",
      de: "Ich fühle mich von meinen eigenen Erinnerungen entfremdet, als gehörten sie einer fremden Person.",
      fr: "Je me sens déconnecté de mes souvenirs, comme si mon passé appartenait à un inconnu.",
      es: "Me siento desconectado de mis recuerdos, como si mi historia le hubiese ocurrido a otra persona.",
    },
    options: [
      {
        score: 0,
        label: {
          en: "Rarely — my autobiographical memories retain their emotional warmth and resonance",
          id: "Jarang — kenangan masa laluku masih menyimpan kehangatan dan rasa yang hidup",
          de: "Selten — meine Erinnerungen tragen lebendige emotionale Wärme",
          fr: "Rarement — mes souvenirs conservent leur charge émotionnelle et vivante",
          es: "Casi nunca — mis recuerdos conservan su calidez y emoción",
        },
      },
      {
        score: 1,
        label: {
          en: "Occasionally regarding distant childhood memories",
          id: "Sesekali hanya untuk memori masa kecil yang sangat lama",
          de: "Gelegentlich bei fernen Kindheitserinnerungen",
          fr: "Parfois pour de très vieux souvenirs d'enfance",
          es: "Ocasionalmente con recuerdos lejanos de la infancia",
        },
      },
      {
        score: 2,
        label: {
          en: "Frequently — recent milestones feel like sterile facts read from a Wikipedia article",
          id: "Sering — pencapaian hidup baruku terasa seperti fakta kering yang dibaca dari artikel Wikipedia",
          de: "Häufig — wichtige Meilensteine wirken wie nüchterne Fakten aus einem Lexikon",
          fr: "Souvent — mes réussites récentes me font l'effet d'une fiche Wikipedia impersonnelle",
          es: "A menudo — mis logros recientes parecen datos fríos leídos en una enciclopedia",
        },
      },
      {
        score: 3,
        label: {
          en: "Severe depersonalization — I feel completely alienated from my own life story",
          id: "Depersonalisasi berat — aku merasa sangat terasing dari kisah hidupku sendiri",
          de: "Schwere Depersonalisation — ich fühle mich völlig fremd im eigenen Lebenslauf",
          fr: "Dépersonnalisation sévère — je me sens totalement étranger à ma propre existence",
          es: "Depersonalización severa — me siento completamente alienado de mi propia vida",
        },
      },
    ],
  },
  {
    id: 11,
    subscale: "anhedonia_detachment",
    prompt: {
      en: "I find it hard to feel compassion or warmth toward myself when I make mistakes; instead, I feel a cold, indifferent shrugged shoulder.",
      id: "Aku sulit merasakan welas asih atau kelembutan pada diriku sendiri saat berbuat salah; yang ada hanyalah sikap dingin dan acuh tak acuh.",
      de: "Ich kann mir bei Fehlern kaum Mitgefühl schenken; stattdessen herrscht eiskalte Gleichgültigkeit.",
      fr: "J'ai du mal à faire preuve d'autocompassion ; face à l'erreur, je ne ressens qu'une froide indifférence.",
      es: "Me cuesta tener autocompasión; ante los errores solo siento una fría y apática indiferencia.",
    },
    options: [
      {
        score: 0,
        label: {
          en: "Rarely — I practice tender self-forgiveness and healthy self-care",
          id: "Jarang — aku melatih pengampunan diri yang lembut dan kepedulian sehat",
          de: "Selten — ich begegne mir mit Nachsicht und gesunder Fürsorge",
          fr: "Rarement — je me traite avec bienveillance et pardon",
          es: "Casi nunca — me trato con comprensión y autocuidado genuino",
        },
      },
      {
        score: 1,
        label: {
          en: "Occasionally when frustrated with careless blunders",
          id: "Sesekali jika kesal karena melakukan kecerobohan bodoh",
          de: "Gelegentlich bei ärgerlichen Patzern",
          fr: "Parfois après des étourderies agaçantes",
          es: "Ocasionalmente ante descuidos molestos",
        },
      },
      {
        score: 2,
        label: {
          en: "Frequently — I don't care enough about myself to even feel disappointment",
          id: "Sering — aku bahkan tidak cukup peduli pada diriku untuk merasa kecewa",
          de: "Häufig — ich liege mir selbst so fern, dass nicht einmal Enttäuschung aufkommt",
          fr: "Souvent — je ne m'importe plus assez pour ressentir de la déception",
          es: "A menudo — me importo tan poco que ni siquiera llego a decepcionarme",
        },
      },
      {
        score: 3,
        label: {
          en: "Complete internal abandonment — utter emotional apathy toward my own wellbeing",
          id: "Pengabaian batin total — apatis mutlak terhadap keselamatan dan masa depan diri sendiri",
          de: "Völlige innere Verlassenheit — absolute Apathie gegenüber meinem Schicksal",
          fr: "Abandon intérieur complet — apathie totale quant à mon avenir ou ma santé",
          es: "Abandono interno absoluto — apatía total hacia mi propio bienestar",
        },
      },
    ],
  },
  {
    id: 12,
    subscale: "anhedonia_detachment",
    prompt: {
      en: "Deep down, I suspect that becoming numb was the only way my younger self could survive overwhelm or heartbreak.",
      id: "Di lubuk hati terdalam, aku menyadari bahwa menjadi kebas adalah satu-satunya cara diriku bertahan hidup dari patah hati atau trauma masa lalu.",
      de: "Tief im Inneren ahne ich, dass emotionale Taubheit die einzige Überlebensstrategie meines jüngeren Ichs war.",
      fr: "Au fond, je sais que cette anesthésie était le seul moyen pour mon jeune moi de survivre au chaos ou à la douleur.",
      es: "En el fondo, sé que volverme insensible fue la única forma en que mi yo del pasado pudo sobrevivir al dolor.",
    },
    options: [
      {
        score: 0,
        label: {
          en: "Disagree — I never had to numb out to feel safe",
          id: "Tidak setuju — aku tidak pernah perlu mati rasa demi merasa aman",
          de: "Trifft nicht zu — ich musste mich nie taub stellen, um sicher zu sein",
          fr: "Pas d'accord — je n'ai jamais eu besoin de m'anesthésier pour survivre",
          es: "En desacuerdo — nunca necesité anestesiarme para sentirme a salvo",
        },
      },
      {
        score: 1,
        label: {
          en: "Mild resonance — I learned to swallow tears occasionally",
          id: "Agak relevan — aku kadang belajar menahan tangis di masa lalu",
          de: "Leichte Resonanz — ich habe gelernt, Tränen hinunterzuschlucken",
          fr: "Légère résonance — j'ai parfois appris à ravaler mes larmes",
          es: "Ligera resonancia — aprendí a tragarme el llanto en ocasiones",
        },
      },
      {
        score: 2,
        label: {
          en: "Strong resonance — numbness was an armor forged to survive constant emotional chaos",
          id: "Sangat relevan — kekebasan adalah baju zirah yang kutempa demi bertahan dari kekacauan emosi",
          de: "Starke Resonanz — Taubheit war die Rüstung gegen chronisches emotionales Chaos",
          fr: "Forte résonance — l'engourdissement était une armure face au chaos affectif",
          es: "Fuerte resonancia — la insensibilidad fue una armadura contra el caos emocional",
        },
      },
      {
        score: 3,
        label: {
          en: "Exact truth — my circuit breaker tripped years ago and has never flipped back on",
          id: "Tepat sekali — sekring emosiku putus bertahun-tahun lalu dan belum pernah tersambung kembali",
          de: "Exakt zutreffend — mein innerer Schutzschalter flog vor Jahren heraus und rastete nie wieder ein",
          fr: "Exactement vrai — mon disjoncteur émotionnel a sauté il y a des années et n'a jamais été réarmé",
          es: "Exacto — mi interruptor emocional saltó hace años y nunca volvió a encenderse",
        },
      },
    ],
  },
];

export const EMOTIONAL_NUMBNESS_ARCHETYPES: Record<
  EmotionalNumbnessArchetype["level"],
  EmotionalNumbnessArchetype
> = {
  emotionally_fluid_vital: {
    level: "emotionally_fluid_vital",
    badge: {
      en: "Emotionally Fluid & Vital",
      id: "Cairan Emosi Hidup & Selaras",
      de: "Emotional lebendig & verbunden",
      fr: "Vitalité & Fluidité Émotionnelle",
      es: "Fluidez Emocional y Vitalidad",
    },
    title: {
      en: "The Grounded Resonator",
      id: "Sang Resonator Selaras",
      de: "Der verbundene Resonator",
      fr: "Le Résonateur Ancré",
      es: "El Resonador Conectado",
    },
    tagline: {
      en: "Your nervous system stays supple, feeling pain and joy without triggering chronic shutdown.",
      id: "Sistem sarafmu lentur, mampu merasakan duka dan sukacita tanpa terjebak pembekuan kronis.",
      de: "Ihr Nervensystem bleibt beweglich; Sie fühlen Schmerz und Freude ohne Dauerabschaltung.",
      fr: "Votre système nerveux reste souple, accueillant joie et vulnérabilité sans sidération.",
      es: "Tu sistema nervioso se mantiene flexible, sintiendo dolor y alegría sin congelarse.",
    },
    description: {
      en: "Your score reflects healthy vagal flexibility. When stress hits, your body naturally moves through activation and returns to safety. You have not felt the need to sever connection with your emotional core or freeze your somatic sensations.",
      id: "Skormu menunjukkan fleksibilitas vagal yang sehat. Saat stres datang, tubuhmu dapat merasakannya lalu kembali ke titik aman. Kamu tidak perlu memutus kabel emosimu demi bertahan hidup.",
      de: "Ihr Ergebnis zeigt gesunde vagale Flexibilität. Nach Belastungen kehren Sie verlässlich in die Sicherheit zurück, ohne Ihre Gefühlswelt betäuben zu müssen.",
      fr: "Votre score témoigne d'une excellente régulation vagale. Face au stress, votre corps traverse l'épreuve puis retrouve son calme sans anesthésier vos ressentis.",
      es: "Tu resultado muestra una saludable regulación vagal. Atraviesas el estrés y vuelves a la calma sin necesidad de apagar tu mundo afectivo.",
    },
    psychologyInsight: {
      en: "According to Dr. Stephen Porges' Polyvagal Theory, true resilience is not immunity to pain, but the physiological speed at which you re-engage your ventral vagal social engagement system after threat has passed.",
      id: "Menurut Teori Polivagal Dr. Stephen Porges, ketangguhan sejati bukanlah kebal dari rasa sakit, melainkan kecepatan tubuh mengaktifkan kembali saraf ventral vagal (koneksi aman) setelah ancaman usai.",
      de: "Nach der Polyvagal-Theorie von Dr. Stephen Porges besteht echte Resilienz nicht im Schmerzverlust, sondern im geschmeidigen Zurückkehren in das ventrale Vagus-Sicherheitssystem.",
      fr: "Selon la théorie polyvagale du Dr Stephen Porges, la vraie résilience réside dans la capacité à réactiver rapidement son système ventral de lien après une alerte.",
      es: "Según la Teoría Polivagal del Dr. Stephen Porges, la resiliencia es la rapidez con la que el sistema nervioso recupera la seguridad y conexión tras una alarma.",
    },
    actionProtocols: {
      en: [
        "Continue daily interoceptive body scans to honor subtle physical sensations.",
        "Practice emotional naming (affect labeling) to maintain high emotional granularity.",
        "Serve as a co-regulating anchor for loved ones who struggle with freeze defenses.",
      ],
      id: [
        "Lanjutkan body scan harian untuk menjaga kepekaan sensasi fisik tubuh.",
        "Beri nama spesifik pada setiap emosi (affect labeling) agar kejernihan batin terjaga.",
        "Jadilah jangkar penenang bagi orang terdekat yang sedang mengalami respons freeze.",
      ],
      de: [
        "Körperwahrnehmung durch tägliche kurze Achtsamkeits-Scans bewahren.",
        "Gefühle präzise benennen (Affect Labeling), um emotionale Klarheit zu festigen.",
        "Als regulierender sicherer Hafen für Angehörige mit Shutdown-Tendenzen wirken.",
      ],
      fr: [
        "Poursuivre les scans corporels quotidiens pour honorer les signaux physiques.",
        "Nommer précisément chaque émotion pour entretenir votre granularité affective.",
        "Demeurer un repère apaisant pour les proches sujets au repli défensif.",
      ],
      es: [
        "Mantener escaneos corporales diarios para honrar las sensaciones sutiles.",
        "Nombrar emociones con precisión para consolidar tu claridad afectiva.",
        "Ser un ancla de calma para seres queridos que tienden al bloqueo emocional.",
      ],
    },
    dailyAffirmation: {
      en: "I welcome the full palette of human emotion. Feeling deeply is my strength, not a threat.",
      id: "Aku menyambut seluruh warna emosi manusia. Merasakan secara mendalam adalah kekuatanku, bukan ancaman.",
      de: "Ich heiße alle Farben des Fühlens willkommen. Tiefe Empfindung ist meine Kraft, keine Bedrohung.",
      fr: "J'accueille toute la palette des émotions humaines. Ressentir est ma force, non un danger.",
      es: "Doy la bienvenida a toda la paleta emocional. Sentir con intensidad es mi fortaleza.",
    },
  },

  mildly_shielded_observer: {
    level: "mildly_shielded_observer",
    badge: {
      en: "Mildly Shielded Observer",
      id: "Pengamat Berperisai Tipis",
      de: "Leicht gepanzerter Beobachter",
      fr: "Observateur Modérément Protégé",
      es: "Observador con Escudo Leve",
    },
    title: {
      en: "The Intellectualized Sentinel",
      id: "Sang Penjaga Intelektual",
      de: "Der intellektualisierende Wächter",
      fr: "La Sentinelle Intellectualisée",
      es: "El Centinela Racional",
    },
    tagline: {
      en: "You analyze feelings logically from the head to avoid unpredictable somatic pain.",
      id: "Kamu menganalisis perasaan secara rasional dari kepala demi menghindari rasa sakit fisik batin.",
      de: "Sie zerlegen Emotionen im Kopf, um unberechenbaren Körperschmerz zu umgehen.",
      fr: "Vous décortiquez vos émotions par la logique pour esquiver les secousses physiques.",
      es: "Analizas tus sentimientos desde la mente para protegerte del dolor visceral.",
    },
    description: {
      en: "Your score shows mild emotional blunting, largely manifested as hyper-intellectualization. When conflicts or heartbreaks arise, you immediately pivot to problem-solving and diagnostic mode rather than allowing your chest to ache or eyes to weep.",
      id: "Skormu menunjukkan kebas emosi tingkat ringan dalam bentuk hiper-intelektualisasi. Saat konflik atau kesedihan terjadi, pikiranmu langsung melompat mencari solusi analitis alih-alih membiarkan dadamu merasakan perihnya duka.",
      de: "Ihr Ergebnis weist auf milde emotionale Dämpfung hin. Sie flüchten bei Belastungen rasch in Analysen und Problemlösungen, statt den körperlichen Schmerz zu durchfühlen.",
      fr: "Votre score révèle un émoussement modéré via l'intellectualisation. Face aux heurts, vous passez immédiatement en mode résolution logique pour éviter de pleurer.",
      es: "Tu puntuación refleja un bloqueo leve por racionalización. Ante el dolor, saltas de inmediato al análisis lógico en lugar de permitirte sentir.",
    },
    psychologyInsight: {
      en: "Psychologists call this 'cognitive bypassing'. The brain uses abstract explanations as an emotional shock absorber. While functional at work, it starves close relationships of authentic vulnerability.",
      id: "Psikolog menyebut ini 'cognitive bypassing'. Otak menggunakan teori dan logika sebagai peredam kejut emosional. Sangat efektif untuk bekerja, namun menjauhkan keintiman mendalam dalam hubungan.",
      de: "In der Psychologie spricht man von 'kognitivem Bypassing'. Der Verstand dämpft Schocks ab; das nützt im Beruf, schwächt jedoch echte Partnerschaftsnähe.",
      fr: "Les cliniciens nomment cela 'court-circuit cognitif'. L'esprit se sert de la logique comme bouclier, ce qui protège au travail mais appauvrit l'intimité.",
      es: "La psicología lo denomina 'bypassing cognitivo'. La mente usa explicaciones frías como amortiguador, aislando tus relaciones íntimas.",
    },
    actionProtocols: {
      en: [
        "When feeling triggered, pause analysis and ask: 'Where is the tension living in my body right now?'",
        "Practice 3 minutes of uncensored voice journaling daily in Nuju without analyzing what you say.",
        "Allow yourself 60 seconds to just breathe and feel sadness before jumping into action.",
      ],
      id: [
        "Saat terpicu, hentikan analisis dan tanyakan: 'Di mana bagian tubuhku yang sedang menegang saat ini?'",
        "Lakukan voice journaling tanpa sensor selama 3 menit di Nuju tanpa perlu menganalisis artinya.",
        "Izinkan dirimu terdiam 60 detik merasakan sedih sebelum buru-buru mencari solusi.",
      ],
      de: [
        "Bei Anspannung innehalten: 'Wo genau im Körper sitzt dieser Druck gerade?'",
        "Täglich 3 Minuten ungefiltertes Sprach-Tagebuch in Nuju führen, ohne zu werten.",
        "Sich 60 Sekunden reine Trauer erlauben, bevor der Lösungsmodus anspringt.",
      ],
      fr: [
        "En cas de tension, stoppez l'analyse : 'Où se loge la sensation dans mon corps ?'",
        "Pratiquer 3 minutes de journal vocal spontané dans Nuju sans rien censurer.",
        "S'accorder 60 secondes de tristesse pure avant d'élaborer une solution.",
      ],
      es: [
        "Al sentir tensión, frena el análisis: '¿En qué parte de mi cuerpo se siente esta molestia?'",
        "Graba 3 minutos de diario de voz sin filtros en Nuju sin juzgar lo que dices.",
        "Permítete 60 segundos de tristeza sentida antes de buscar arreglos.",
      ],
    },
    dailyAffirmation: {
      en: "My heart is not an engine to be fixed. It is a garden to be felt.",
      id: "Hatiku bukanlah mesin yang harus terus diperbaiki. Ia adalah taman yang perlu dirasakan.",
      de: "Mein Herz ist kein Motor, der repariert werden muss, sondern ein Garten zum Fühlen.",
      fr: "Mon cœur n'est pas un moteur à réparer, mais un espace vivant à ressentir.",
      es: "Mi corazón no es un motor que reparar, sino un jardín que experimentar.",
    },
  },

  dorsal_blunted_sentinel: {
    level: "dorsal_blunted_sentinel",
    badge: {
      en: "Dorsal Blunted Sentinel",
      id: "Penjaga Kebas Dorsal Vagal",
      de: "Dorsal gedämpfter Wächter",
      fr: "Sentinelle en Retrait Dorsal",
      es: "Centinela en Desconexión Dorsal",
    },
    title: {
      en: "The Frosted Fortress",
      id: "Benteng Es Batin",
      de: "Die vereiste Festung",
      fr: "La Forteresse Givrée",
      es: "La Fortaleza de Escarcha",
    },
    tagline: {
      en: "You experience pervasive flatness, muted sensory joy, and heavy fatigue under stress.",
      id: "Kamu mengalami kehampaan yang meluas, hilangnya kenikmatan indra, dan rasa lelah menekan.",
      de: "Anhaltende Gefühlsleere, farbloser Alltag und bleierne Erschöpfung bei Stress.",
      fr: "Une platitude diffuse, un plaisir anesthésié et une lourde fatigue dès que le stress monte.",
      es: "Vacío afectivo persistente, placer apagado y fatiga densa ante la presión.",
    },
    description: {
      en: "Your score indicates moderate-to-severe emotional numbness driven by dorsal vagal hypo-arousal. Your nervous system has learned that feeling deeply is too costly or dangerous, deploying chronic affective anesthesia to protect your core.",
      id: "Skormu menandakan mati rasa emosional tingkat sedang-ke-berat akibat hypo-arousal dorsal vagal. Sistem sarafmu belajar bahwa merasakan secara utuh terlalu menyakitkan, sehingga mematikan saklar rasa demi keselamatanmu.",
      de: "Ihr Ergebnis zeigt deutliche emotionale Betäubung im dorsalen Vagus-Zustand. Ihr System hält Gefühle für zu riskant und schaltet das Empfinden präventiv stumm.",
      fr: "Votre score indique un engourdissement marqué lié à un sous-régime dorsal vagal. Votre système a jugé trop périlleux de ressentir et applique une anesthésie défensive.",
      es: "Tu resultado señala un bloqueo emocional importante por hipoactivación dorsal. Tu cuerpo aprendió que sentir era peligroso y activó una anestesia protectora.",
    },
    psychologyInsight: {
      en: "Ruth Lanius and Bessel van der Kolk's trauma research highlights that numbness is not the absence of feeling—it is the biological freeze response to prolonged emotional saturation. Healing requires micro-dosing safety.",
      id: "Riset trauma Ruth Lanius dan Bessel van der Kolk menunjukkan bahwa kebas bukanlah ketiadaan rasa, melainkan respons pembekuan biologis akibat kejenuhan emosional kronis. Pemulihannya butuh stimulasi rasa aman bertahap.",
      de: "Traumaforscher wie van der Kolk betonen: Taubheit ist kein Mangel an Gefühl, sondern ein biologischer Überlastungsschutz. Heilung verlangt behutsame Mikrodosen an Sicherheit.",
      fr: "Les recherches de Bessel van der Kolk rappellent que l'insensibilité n'est pas le vide, mais un réflexe de survie face à la saturation. La guérison passe par de micro-doses de sécurité.",
      es: "Las investigaciones del trauma muestran que el entumecimiento no es falta de afecto, sino un mecanismo de protección biológico ante el desborde.",
    },
    actionProtocols: {
      en: [
        "Somatic Grounding: Splash cold water on your face or hold an ice cube for 15 seconds to gently jolt the nervous system.",
        "Low-Stakes Savoring: Eat one berry or sip tea with 100% conscious attention to temperature and taste.",
        "Daily Voice Dumping: Vent 2 minutes of unedited raw thoughts into Nuju to release trapped somatic pressure.",
      ],
      id: [
        "Somatic Grounding: Percikkan air dingin ke wajah atau genggam es batu selama 15 detik untuk membangunkan saraf sensorik.",
        "Low-Stakes Savoring: Nikmati satu teguk teh hangat dengan 100% kesadaran penuh pada rasa dan suhunya.",
        "Voice Dumping: Rekam 2 menit unek-unek mentah tanpa beban di Nuju untuk melepas sumbatan tekanan tubuh.",
      ],
      de: [
        "Somatisches Erden: Kaltes Wasser ins Gesicht oder 15 Sekunden einen Eiswürfel in der Hand halten.",
        "Sanftes Genießen: Einen Schluck Tee mit voller Aufmerksamkeit für Wärme und Aroma trinken.",
        "Tägliches Aussprechen: 2 Minuten rohe Gedanken ungefiltert in Nuju aufsprechen.",
      ],
      fr: [
        "Ancrage somatique : De l'eau fraîche sur le visage ou un glaçon en main 15 secondes pour réveiller les sens.",
        "Dégustation consciente : Boire une gorgée de thé en savourant température et texture.",
        "Décharge vocale : Enregistrer 2 minutes de pensées brutes dans Nuju pour alléger la pression interne.",
      ],
      es: [
        "Anclaje somático: Agua fría en el rostro o sostener un hielo 15 segundos para despertar el sistema nervioso.",
        "Saboreo consciente: Beber un té prestando total atención a su aroma y temperatura.",
        "Vaciado vocal: Grabar 2 minutos de pensamientos espontáneos en Nuju para liberar presión interna.",
      ],
    },
    dailyAffirmation: {
      en: "It is safe to melt the frost. Slowly and gently, warmth is returning to my hands and heart.",
      id: "Aman bagiku untuk mencairkan kebekuan ini. Perlahan dan lembut, kehangatan kembali ke tangan dan hatiku.",
      de: "Es ist sicher, das Eis schmelzen zu lassen. Schritt für Schritt kehrt Wärme in mein Herz zurück.",
      fr: "Il est sans danger de dégeler. Lentement, la chaleur regagne mon corps et mon cœur.",
      es: "Es seguro descongelar el hielo. Paso a paso, la calidez vuelve a mis manos y a mi corazón.",
    },
  },

  deep_freeze_shutdown: {
    level: "deep_freeze_shutdown",
    badge: {
      en: "Deep Freeze Shutdown",
      id: "Pembekuan Disosiatif Parah",
      de: "Tiefer dissoziativer Freeze",
      fr: "Sidération & Anesthésie Sévère",
      es: "Parálisis Disociativa Severa",
    },
    title: {
      en: "The Permafrost Sanctum",
      id: "Sang Pengasing Batin",
      de: "Die Permafrost-Krypta",
      fr: "Le Sanctuaire de Permafrost",
      es: "El Abismo de Escarcha",
    },
    tagline: {
      en: "Severe dissociation, complete anhedonia, and profound disconnection from self and body.",
      id: "Disosiasi berat, kehilangan rasa total, dan keterasingan mendalam dari tubuh serta diri sendiri.",
      de: "Schwere Dissoziation, völlige Anhedonie und tiefe Entfremdung von Körper und Selbst.",
      fr: "Dissociation sévère, anhédonie totale et coupure profonde avec son propre corps.",
      es: "Disociación severa, anhedonia total y profunda desconexión del cuerpo y de uno mismo.",
    },
    description: {
      en: "Your score reflects acute, long-standing emotional numbness (dorsal vagal collapse). You feel as though your emotional self was packed in dry ice years ago. The world appears like a two-dimensional photograph, and socializing feels like mechanical puppetry.",
      id: "Skormu mencerminkan mati rasa emosi akut yang telah berlangsung lama (kolaps dorsal vagal). Kamu merasa dirimu dibekukan bertahun-tahun lalu. Dunia tampak seperti foto dua dimensi yang datar, dan interaksi terasa seperti boneka mekanis.",
      de: "Ihr Ergebnis spiegelt akute, chronische Taubheit wider. Die Welt wirkt flach wie ein Schwarzweißfoto, und das Leben wie ein mechanisches Puppentheater.",
      fr: "Votre score révèle un état de sidération aiguë et chronique. La vie semble défiler sur un écran plat et chaque échange ressemble à un jeu de marionnettes.",
      es: "Tu resultado muestra un colapso dorsal crónico. El mundo parece una fotografía en dos dimensiones y la vida cotidiana una actuación automática.",
    },
    psychologyInsight: {
      en: "This extreme numbing is the brain's ultimate neurochemical opioid surge, evolved to prevent death from shock during severe trauma or chronic developmental neglect. You are not broken—your nervous system is simply running emergency software.",
      id: "Kekebasan ekstrem ini adalah pelepasan opioid endogen otak, evolusi purba untuk mencegah kematian akibat syok saat trauma berat atau pengabaian kronis. Kamu tidak rusak—tubuhmu hanya menjalankan program darurat kelangsungan hidup.",
      de: "Dieser Zustand beruht auf körpereigenen Opioiden, die das Gehirn vor emotionalem Schock schützen sollen. Sie sind nicht defekt — Ihr Nervensystem läuft schlicht im Notfallmodus.",
      fr: "Cet état provient d'une libération massive d'endorphines protectrices pour éviter le choc émotionnel. Vous n'êtes pas brisé — votre organisme tourne en mode survie d'urgence.",
      es: "Este bloqueo extremo es una oleada neuroquímica protectora para evitar el colapso por dolor. No estás roto: tu biología está operando en modo de emergencia.",
    },
    actionProtocols: {
      en: [
        "Prioritize safety and gentle somatic therapy (SE, EMDR, or polyvagal-informed somatic counseling).",
        "Begin with tiny tactile sensations: warm blankets, heavy cushions, and gentle bilateral shoulder pats.",
        "Speak your truth without pressure: use private voice journaling to whisper one honest sentence a day.",
      ],
      id: [
        "Prioritaskan terapi somatis lembut (Somatic Experiencing, EMDR, atau konseling polivagal berlisensi).",
        "Mulai dari stimulasi sentuhan mikro: selimut tebal hangat, bantal berat, dan tepukan bahu ritmis (butterfly hug).",
        "Bicarakan rasa tanpa tuntutan: gunakan voice journal di Nuju untuk membisikkan satu kalimat jujur setiap malam.",
      ],
      de: [
        "Sanfte traumainformierte somatische Begleitung (Somatic Experiencing, EMDR) in Betracht ziehen.",
        "Mit Mikro-Tastreizen beginnen: schwere Decke, warmes Bad, sanftes bilaterales Schulterklopfen.",
        "Ohne Druck sprechen: flüstern Sie täglich einen ehrlichen Satz in Ihr privates Nuju-Journal.",
      ],
      fr: [
        "S'orienter vers un accompagnement somatique bienveillant (Somatic Experiencing, EMDR).",
        "Commencer par de micro-stimulations tactiles : couverture lestée, bain tiède, tapotements lents.",
        "Chuchoter une vérité par jour sans pression dans votre journal intime Nuju.",
      ],
      es: [
        "Buscar apoyo somático especializado (Somatic Experiencing, EMDR o terapia informada en trauma).",
        "Comenzar con microestímulos táctiles: mantas pesadas, baños tibios y suaves toques bilaterales.",
        "Susurrar una frase honesta al día en tu diario privado de Nuju sin exigencias.",
      ],
    },
    dailyAffirmation: {
      en: "I am patient with my frozen heart. Life will return when I am ready, one breath at a time.",
      id: "Aku bersabar dengan kebekuan batinku. Kehidupan akan kembali saat aku siap, satu hembusan napas demi satu.",
      de: "Ich habe Geduld mit meiner Erstarrung. Das Leben kehrt zurück, Atemzug für Atemzug.",
      fr: "Je suis patient avec mon cœur engourdi. La vie reviendra quand je serai prêt, souffle après souffle.",
      es: "Tengo paciencia con mi corazón congelado. La vida volverá cuando esté listo, respiración a respiración.",
    },
  },
};

export const calculateEmotionalNumbnessScore = (
  answers: Record<number, number>
): EmotionalNumbnessScoreResult => {
  let totalScore = 0;
  const subscaleScores = {
    affective_flatness: 0,
    dorsal_shutdown: 0,
    anhedonia_detachment: 0,
  };

  EMOTIONAL_NUMBNESS_QUESTIONS.forEach((q) => {
    const val = answers[q.id] ?? 0;
    totalScore += val;
    subscaleScores[q.subscale] += val;
  });

  const maxTotal = EMOTIONAL_NUMBNESS_QUESTIONS.length * 3; // 36
  const percentage = Math.min(100, Math.round((totalScore / maxTotal) * 100));

  let level: EmotionalNumbnessArchetype["level"] = "emotionally_fluid_vital";
  if (percentage >= 75) {
    level = "deep_freeze_shutdown";
  } else if (percentage >= 50) {
    level = "dorsal_blunted_sentinel";
  } else if (percentage >= 25) {
    level = "mildly_shielded_observer";
  }

  const maxPerSubscale = 4 * 3; // 12 points each
  const subscales = {
    affective_flatness: {
      score: subscaleScores.affective_flatness,
      percentage: Math.min(100, Math.round((subscaleScores.affective_flatness / maxPerSubscale) * 100)),
    },
    dorsal_shutdown: {
      score: subscaleScores.dorsal_shutdown,
      percentage: Math.min(100, Math.round((subscaleScores.dorsal_shutdown / maxPerSubscale) * 100)),
    },
    anhedonia_detachment: {
      score: subscaleScores.anhedonia_detachment,
      percentage: Math.min(100, Math.round((subscaleScores.anhedonia_detachment / maxPerSubscale) * 100)),
    },
  };

  return {
    totalScore,
    percentage,
    level,
    profile: EMOTIONAL_NUMBNESS_ARCHETYPES[level],
    subscales,
  };
};
