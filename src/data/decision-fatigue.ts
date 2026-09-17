export type DecisionFatigueLang = "en" | "id" | "de" | "fr" | "es";

export interface DecisionFatigueQuestion {
  id: number;
  subscale: "choice_paralysis" | "cognitive_saturation" | "willpower_depletion";
  prompt: Record<DecisionFatigueLang, string>;
  options: {
    label: Record<DecisionFatigueLang, string>;
    score: number; // 0 to 3
  }[];
}

export interface DecisionFatigueArchetype {
  level: "cognitively_resilient" | "midday_fog_drifter" | "choice_paralyzed_staller" | "executive_burnout_collapse";
  badge: Record<DecisionFatigueLang, string>;
  title: Record<DecisionFatigueLang, string>;
  tagline: Record<DecisionFatigueLang, string>;
  description: Record<DecisionFatigueLang, string>;
  psychologyInsight: Record<DecisionFatigueLang, string>;
  actionProtocols: Record<DecisionFatigueLang, string[]>;
  dailyAffirmation: Record<DecisionFatigueLang, string>;
}

export interface DecisionFatigueScoreResult {
  totalScore: number;
  percentage: number;
  level: DecisionFatigueArchetype["level"];
  profile: DecisionFatigueArchetype;
  subscales: {
    choice_paralysis: { score: number; percentage: number };
    cognitive_saturation: { score: number; percentage: number };
    willpower_depletion: { score: number; percentage: number };
  };
}

export const DECISION_FATIGUE_QUESTIONS: DecisionFatigueQuestion[] = [
  // Subscale 1: Choice Paralysis (Struggling with simple everyday selections)
  {
    id: 1,
    subscale: "choice_paralysis",
    prompt: {
      en: "Choosing what to eat for dinner or what to watch on Netflix feels genuinely exhausting and stressful.",
      id: "Memilih mau makan apa atau mau nonton apa di Netflix terasa sangat melelahkan dan membuat stres.",
      de: "Die Entscheidung, was ich zu Abend essen oder auf Netflix schauen soll, fühlt sich anstrengend und zermürbend an.",
      fr: "Choisir quoi manger pour le dîner ou quel film regarder me paraît épuisant et stressant.",
      es: "Elegir qué cenar o qué película ver me resulta verdaderamente agotador y abrumador.",
    },
    options: [
      {
        score: 0,
        label: {
          en: "Disagree — simple choices take me less than a minute",
          id: "Tidak setuju — pilihan sederhana kuputuskan dalam waktu kurang dari satu menit",
          de: "Stimme nicht zu — einfache Entscheidungen treffe ich in unter einer Minute",
          fr: "Pas d'accord — je me décide en moins d'une minute",
          es: "En desacuerdo — decido cosas sencillas en menos de un minuto",
        },
      },
      {
        score: 1,
        label: {
          en: "Occasionally — only when I have had an unusually hectic workday",
          id: "Kadang — hanya jika seharian bekerja sangat padat",
          de: "Gelegentlich — nur nach extrem stressigen Arbeitstagen",
          fr: "Parfois — seulement après une journée de travail particulièrement chargée",
          es: "A veces — solo tras una jornada de trabajo extenuante",
        },
      },
      {
        score: 2,
        label: {
          en: "Frequently — I spend 30+ minutes scrolling food apps without ordering",
          id: "Sering — aku bisa scrolling aplikasi makanan lebih dari 30 menit tanpa memutuskan",
          de: "Häufig — ich scrolle 30 Minuten durch Liefer-Apps, ohne zu bestellen",
          fr: "Souvent — je passe 30 minutes à faire défiler les menus sans commander",
          es: "Frecuentemente — paso media hora en apps de comida sin elegir nada",
        },
      },
      {
        score: 3,
        label: {
          en: "Constantly — I would rather skip dinner or hand my phone to someone else than make one more choice",
          id: "Selalu — aku lebih memilih melewatkan makan atau meminta orang lain memilihkan daripada harus membuat satu keputusan lagi",
          de: "Ständig — ich verzichte lieber aufs Essen oder lasse andere entscheiden, als noch eine Wahl zu treffen",
          fr: "Constamment — je préfère sauter un repas que d'avoir à faire un choix de plus",
          es: "Constantemente — prefiero no cenar o que otro elija con tal de no tomar otra decisión",
        },
      },
    ],
  },
  {
    id: 2,
    subscale: "choice_paralysis",
    prompt: {
      en: "When faced with multiple work tasks, I freeze and struggle to determine which one is truly the top priority.",
      id: "Saat dihadapkan pada banyak tugas kerja, aku mendadak 'freeze' dan bingung menentukan mana prioritas utama.",
      de: "Wenn mehrere Aufgaben anstehen, blockiere ich und kann kaum priorisieren, was am wichtigsten ist.",
      fr: "Face à plusieurs tâches professionnelles, je me bloque et peine à identifier la priorité absolue.",
      es: "Ante múltiples tareas de trabajo, me bloqueo y me cuesta definir cuál es la prioridad real.",
    },
    options: [
      {
        score: 0,
        label: {
          en: "Never — I prioritize easily and execute in sequence",
          id: "Tidak pernah — aku mudah memprioritaskan dan mengeksekusi satu per satu",
          de: "Nie — ich priorisiere mühelos und arbeite der Reihe nach ab",
          fr: "Jamais — je priorise facilement et j'enchaîne les tâches",
          es: "Nunca — priorizo con facilidad y ejecuto en orden",
        },
      },
      {
        score: 1,
        label: {
          en: "Briefly — slight hesitation that clears with a quick to-do list",
          id: "Sebentar — sedikit ragu lalu lancar setelah membuat to-do list singkat",
          de: "Kurz — eine kurze To-Do-Liste schafft schnell Klarheit",
          fr: "Brièvement — une petite to-do list suffit à me débloquer",
          es: "Brevemente — una lista rápida aclara mis dudas",
        },
      },
      {
        score: 2,
        label: {
          en: "Frequently — I open multiple browser tabs and stare blankly between them",
          id: "Sering — aku membuka puluhan tab browser lalu menatap kosong bergantian",
          de: "Häufig — ich öffne unzählige Tabs und starre planlos dazwischen hin und her",
          fr: "Souvent — j'ouvre 20 onglets et reste bloqué à les regarder dans le vide",
          es: "Frecuentemente — abro decenas de pestañas y me quedo mirándolas sin actuar",
        },
      },
      {
        score: 3,
        label: {
          en: "Severe paralysis — total executive dysfunction; I abandon the work and escape into mindless scrolling",
          id: "Kelumpuhan parah — disfungsi eksekutif total; aku meninggalkan pekerjaan dan kabur ke scrolling medsos",
          de: "Schwere Blockade — ich gebe frustriert auf und flüchte ins sinnlose Scrollen",
          fr: "Paralysie totale — abandon complet de la tâche pour scroller machinalement sur mon téléphone",
          es: "Bloqueo severo — disfunción ejecutiva total; abandono la tarea y me evado en las redes",
        },
      },
    ],
  },
  {
    id: 3,
    subscale: "choice_paralysis",
    prompt: {
      en: "Trivial questions from colleagues or family ('Which font looks better?', 'What time should we meet?') spark sudden irritability.",
      id: "Pertanyaan sepele dari rekan kerja atau keluarga ('Bagusan font ini atau itu?', 'Jam berapa ketemuan?') memicu kekesalan mendadak.",
      de: "Nebensächliche Fragen ('Welche Schriftart?', 'Wann treffen wir uns?') lösen plötzliche Gereiztheit in mir aus.",
      fr: "Des questions anodines ('Quelle police d'écriture ?', 'À quelle heure se voit-on ?') provoquent chez moi une vive irritation.",
      es: "Preguntas triviales ('¿Qué letra queda mejor?', '¿A qué hora nos vemos?') me generan una irritación súbita.",
    },
    options: [
      {
        score: 0,
        label: {
          en: "Disagree — I answer minor logistical queries with patience",
          id: "Tidak setuju — aku menjawab pertanyaan logistik ringan dengan santai dan sabar",
          de: "Stimme nicht zu — ich beantworte Alltagsfragen geduldig",
          fr: "Pas d'accord — je réponds aux questions du quotidien avec patience",
          es: "En desacuerdo — respondo preguntas cotidianas con paciencia",
        },
      },
      {
        score: 1,
        label: {
          en: "Mildly — occasional annoyance if I am deeply in deep work flow",
          id: "Ringan — sedikit terganggu hanya jika sedang fokus mendalam",
          de: "Leicht — nur störend, wenn ich gerade im Tiefenfokus bin",
          fr: "Légèrement — seulement si j'étais en plein travail intense",
          es: "Levemente — solo si estoy en plena concentración",
        },
      },
      {
        score: 2,
        label: {
          en: "Frequently — I internally scream: 'Stop asking me to make decisions!'",
          id: "Sering — batinku berteriak: 'Jangan suruh aku mikir dan milih lagi dong!'",
          de: "Häufig — innerlich schreie ich: 'Entscheidet das bitte ohne mich!'",
          fr: "Souvent — je crie intérieurement : 'Arrêtez de me demander de choisir !'",
          es: "Frecuentemente — por dentro grito: '¡Dejad de hacerme tomar decisiones!'",
        },
      },
      {
        score: 3,
        label: {
          en: "Constantly — any choice demanded of me by 4 PM feels like emotional assault",
          id: "Selalu — keputusan apa pun yang diminta setelah jam 4 sore terasa seperti siksaan emosional",
          de: "Ständig — jede Entscheidung nach 16 Uhr fühlt sich wie ein Übergriff an",
          fr: "Constamment — le moindre choix imposé en fin d'après-midi m'est insupportable",
          es: "Constantemente — cualquier decisión requerida después de las 4 PM me agota al extremo",
        },
      },
    ],
  },
  {
    id: 4,
    subscale: "choice_paralysis",
    prompt: {
      en: "I delay or avoid replying to messages simply because drafting an answer requires cognitive effort I don't possess.",
      id: "Aku menunda membalas pesan hanya karena merangkai jawaban membutuhkan energi otak yang sudah habis.",
      de: "Ich antworte nicht auf Nachrichten, weil das Formulieren einer Antwort zu viel Denkarbeit erfordert.",
      fr: "Je repousse mes réponses aux messages car formuler une phrase demande une énergie cognitive que je n'ai plus.",
      es: "Pospego responder mensajes simplemente porque redactar una respuesta exige un esfuerzo mental que no tengo.",
    },
    options: [
      {
        score: 0,
        label: {
          en: "Never — I clear my communications promptly",
          id: "Tidak pernah — aku membalas dan merapikan pesan dengan cepat",
          de: "Nie — ich erledige Nachrichten zeitnah",
          fr: "Jamais — je traite mes messages rapidement",
          es: "Nunca — respondo a mis mensajes con prontitud",
        },
      },
      {
        score: 1,
        label: {
          en: "Rarely — only for very long, emotionally complex emails",
          id: "Jarang — hanya untuk email yang sangat panjang atau kompleks",
          de: "Selten — nur bei langen, komplizierten Texten",
          fr: "Rarement — seulement pour les e-mails longs et complexes",
          es: "Rara vez — solo ante correos muy extensos o difíciles",
        },
      },
      {
        score: 2,
        label: {
          en: "Frequently — unread messages pile up; the thought of deciding what to write makes me avoid my inbox",
          id: "Sering — pesan menumpuk tak terbaca; memikirkan harus balas apa membuatku enggan buka inbox",
          de: "Häufig — ungelesene Nachrichten stauen sich, weil ich die Denkleistung meide",
          fr: "Souvent — les messages s'accumulent car décider quoi écrire m'épuise",
          es: "Frecuentemente — los mensajes se acumulan porque pensar qué responder me drena",
        },
      },
      {
        score: 3,
        label: {
          en: "Paralyzing — I leave texts unread for weeks, leading to intense guilt and professional friction",
          id: "Sangat parah — aku membiarkan pesan terbengkalai berminggu-minggu hingga menimbulkan rasa bersalah dan masalah kerjaan",
          de: "Lähmend — Nachrichten bleiben wochenlang liegen, was zu Streit und Schuldgefühlen führt",
          fr: "Paralysant — je laisse des messages en suspens des semaines entières par épuisement",
          es: "Paralizante — dejo mensajes sin responder semanas enteras por puro agotamiento",
        },
      },
    ],
  },

  // Subscale 2: Cognitive Saturation (Brain fog, memory retention failure, processing lag)
  {
    id: 5,
    subscale: "cognitive_saturation",
    prompt: {
      en: "Around 2:00 PM to 4:00 PM, my brain enters a heavy, impenetrable fog where reading a single paragraph requires multiple attempts.",
      id: "Sekitar jam 2 sampai 4 sore, otakku dilanda kabut tebal (brain fog) hingga membaca satu paragraf saja harus diulang berkali-kali.",
      de: "Zwischen 14:00 und 16:00 Uhr vernebelt sich mein Gehirn so stark, dass ich einen Absatz dreimal lesen muss.",
      fr: "Entre 14h et 16h, un brouillard cérébral épais m'oblige à relire trois fois le même paragraphe.",
      es: "Entre las 2:00 y las 4:00 PM, mi mente se sume en una niebla densa donde tengo que releer el mismo párrafo varias veces.",
    },
    options: [
      {
        score: 0,
        label: {
          en: "Disagree — my mental stamina remains consistent throughout the day",
          id: "Tidak setuju — stamina mental dan fokusku stabil sepanjang hari",
          de: "Stimme nicht zu — meine Konzentration bleibt den Tag über stabil",
          fr: "Pas d'accord — mon endurance mentale est constante",
          es: "En desacuerdo — mi rendimiento mental se mantiene firme todo el día",
        },
      },
      {
        score: 1,
        label: {
          en: "Mildly — standard post-lunch dip that resolves with a walk or water",
          id: "Ringan — kantuk wajar pasca makan siang yang segar kembali setelah minum air",
          de: "Leicht — das normale Mittagstief, das nach einem Spaziergang weicht",
          fr: "Légèrement — le coup de barre classique vite dissipé",
          es: "Levemente — el típico bajón tras comer que se pasa paseando",
        },
      },
      {
        score: 2,
        label: {
          en: "Frequently — my eyes scan words but zero meaning is absorbed into my working memory",
          id: "Sering — mataku membaca tulisan tapi otakku tidak memproses maknanya sama sekali",
          de: "Häufig — meine Augen überfliegen Wörter, aber im Kopf kommt nichts an",
          fr: "Souvent — mes yeux lisent les mots mais mon cerveau n'enregistre rien",
          es: "Frecuentemente — mis ojos leen las palabras pero mi memoria no retiene nada",
        },
      },
      {
        score: 3,
        label: {
          en: "Severe crash — complete cognitive shutdown; I feel intoxicated from mental exhaustion",
          id: "Crash parah — otak mati total; rasanya seperti mabuk saking lelahnya fungsi kognitifku",
          de: "Schwerer Absturz — totaler geistiger Shutdown; ich fühle mich wie benebelt vor Erschöpfung",
          fr: "Effondrement total — arrêt complet du système; je me sens comme anesthésié de fatigue",
          es: "Colapso total — apagón cognitivo; me siento aturdido por puro agotamiento mental",
        },
      },
    ],
  },
  {
    id: 6,
    subscale: "cognitive_saturation",
    prompt: {
      en: "I find myself walking into a room or opening a new browser tab and having absolutely no recollection of why I did so.",
      id: "Aku sering berjalan ke suatu ruangan atau membuka tab baru dan sama sekali lupa untuk apa aku ke sana.",
      de: "Ich betrete einen Raum oder öffne einen Tab und habe keine Ahnung mehr, was ich eigentlich wollte.",
      fr: "J'entre dans une pièce ou ouvre un onglet en oubliant instantanément ce que j'étais venu y faire.",
      es: "Entro a una habitación o abro una pestaña y no tengo la menor idea de para qué lo hice.",
    },
    options: [
      {
        score: 0,
        label: {
          en: "Rarely — happens once a month or less",
          id: "Jarang — terjadi sebulan sekali atau kurang",
          de: "Selten — passiert höchstens einmal im Monat",
          fr: "Rarement — cela m'arrive une fois par mois tout au plus",
          es: "Rara vez — me pasa una vez al mes o menos",
        },
      },
      {
        score: 1,
        label: {
          en: "Occasionally — once a week when juggling multiple tasks",
          id: "Kadang — seminggu sekali saat mengerjakan beberapa hal sekaligus",
          de: "Gelegentlich — einmal pro Woche bei hohem Multitasking",
          fr: "Parfois — une fois par semaine en cas de multitâche",
          es: "A veces — una vez por semana al hacer varias cosas a la vez",
        },
      },
      {
        score: 2,
        label: {
          en: "Multiple times daily — my short-term working memory feels severely degraded",
          id: "Beberapa kali sehari — memori jangka pendekku terasa sangat menurun dan kacau",
          de: "Mehrmals täglich — mein Kurzzeitgedächtnis fühlt sich überlastet an",
          fr: "Plusieurs fois par jour — ma mémoire de travail immédiate est saturée",
          es: "Varias veces al día — mi memoria inmediata parece completamente desbordada",
        },
      },
      {
        score: 3,
        label: {
          en: "Constantly — alarming cognitive lapses; I forget basic names, words, and passwords throughout the day",
          id: "Selalu — sering lupa nama dasar, kosa kata umum, dan password sepanjang hari",
          de: "Ständig — alarmierende Gedächtnislücken; ich vergesse alltägliche Wörter und Namen",
          fr: "Constamment — oublis inquiétants de mots simples ou de prénoms d'usage",
          es: "Constantemente — olvidos alarmantes de palabras comunes, nombres y claves diarias",
        },
      },
    ],
  },
  {
    id: 7,
    subscale: "cognitive_saturation",
    prompt: {
      en: "Continuous notifications, pings, and messages across Slack, WhatsApp, and email leave my nervous system in a state of frazzled static.",
      id: "Notifikasi tanpa henti dari Slack, WhatsApp, dan email membuat sistem sarafku terasa berdengung kacau.",
      de: "Dauermeldungen über Slack, WhatsApp und E-Mail versetzen mein Nervensystem in ein gestresstes Rauschen.",
      fr: "Le flux continu de notifications Slack, WhatsApp et e-mails plonge mon système nerveux dans un bourdonnement électrique.",
      es: "El bombardeo continuo de notificaciones de Slack, WhatsApp y correos deja mi sistema nervioso en cortocircuito.",
    },
    options: [
      {
        score: 0,
        label: {
          en: "Disagree — I have strict notification boundaries and feel undisturbed",
          id: "Tidak setuju — aku punya batasan notifikasi yang ketat dan tidak terganggu",
          de: "Stimme nicht zu — ich habe klare Benachrichtigungsregeln und arbeite ruhig",
          fr: "Pas d'accord — je gère mes alertes avec rigueur et calme",
          es: "En desacuerdo — controlo mis alertas con rigor y calma",
        },
      },
      {
        score: 1,
        label: {
          en: "Mildly — slightly distracting, but manageable",
          id: "Ringan — agak mengganggu sedikit, tapi masih bisa kukendalikan",
          de: "Leicht — etwas ablenkend, aber kontrollierbar",
          fr: "Légèrement — distrayant mais gérable",
          es: "Levemente — distrae un poco pero lo manejo",
        },
      },
      {
        score: 2,
        label: {
          en: "Frequently — phantom vibrations; I feel like a computer running 100 background processes with 99% CPU load",
          id: "Sering — merasakan getaran palsu; merasa seperti komputer yang membuka 100 program dengan CPU 99%",
          de: "Häufig — Phantomvibrationen; ich fühle mich wie ein überhitzter Prozessor bei 99 % Auslastung",
          fr: "Souvent — vibrations fantômes; je me sens comme un ordinateur surchauffé à 99 % de CPU",
          es: "Frecuentemente — vibraciones fantasma; me siento como un procesador al 99% de capacidad",
        },
      },
      {
        score: 3,
        label: {
          en: "Total sensory overdrive — every ping triggers physical heart palpitations or a desire to throw my phone against the wall",
          id: "Overdrive sensorik total — setiap bunyi notifikasi memicu dada berdebar atau ingin melempar ponsel ke tembok",
          de: "Völlige Reizüberflutung — jedes Geräusch löst Herzklopfen oder Fluchtimpulse aus",
          fr: "Saturation sensorielle totale — chaque bruit de notification déclenche des palpitations de rage",
          es: "Sobrecarga sensorial total — cada sonido me acelera el pulso con ganas de arrojar el teléfono",
        },
      },
    ],
  },
  {
    id: 8,
    subscale: "cognitive_saturation",
    prompt: {
      en: "I make careless, uncharacteristic errors in simple spreadsheets, emails, or scheduling due to mental exhaustion.",
      id: "Aku melakukan kesalahan ceroboh di spreadsheet sederhana, email, atau jadwal janji temu karena otakku terlalu lelah.",
      de: "Vor lauter geistiger Müdigkeit unterlaufen mir peinliche Flüchtigkeitsfehler in einfachen E-Mails oder Tabellen.",
      fr: "Par pure fatigue mentale, je commets des erreurs d'inattention grossières dans mes tableaux ou mes e-mails.",
      es: "Por mero cansancio mental, cometo errores absurdos de cálculo, fechas o redacción en tareas básicas.",
    },
    options: [
      {
        score: 0,
        label: {
          en: "Never — my attention to detail remains razor-sharp",
          id: "Tidak pernah — ketelitian dan fokusku tetap tajam dan akurat",
          de: "Nie — meine Genauigkeit bleibt hochpräzise",
          fr: "Jamais — ma rigueur reste impeccable",
          es: "Nunca — mi atención al detalle sigue siendo impecable",
        },
      },
      {
        score: 1,
        label: {
          en: "Rarely — only during marathon late-night deadlines",
          id: "Jarang — hanya saat lembur maraton larut malam",
          de: "Selten — nur bei nächtlichen Fristabgaben",
          fr: "Rarement — seulement lors de charrettes nocturnes",
          es: "Rara vez — solo durante entregas de última hora",
        },
      },
      {
        score: 2,
        label: {
          en: "Frequently — I catch myself sending emails with the wrong attachments or missing obvious dates",
          id: "Sering — aku salah kirim lampiran email atau keliru melihat tanggal janji temu",
          de: "Häufig — ich sende E-Mails mit falschen Anhängen oder übersehe Termine",
          fr: "Souvent — j'oublie des pièces jointes ou je confonds les dates de rendez-vous",
          es: "Frecuentemente — mando correos sin el archivo o confundo fechas evidentes",
        },
      },
      {
        score: 3,
        label: {
          en: "Constantly — my cognitive quality control has broken down; I double-check everything 5 times and still miss obvious flaws",
          id: "Selalu — kontrol kualitas otakku rusak; sudah dicek 5 kali pun masih ada kesalahan fatal yang lolos",
          de: "Ständig — meine Fehlerkontrolle versagt; trotz fünfmaligem Prüfen übersehe ich Patzer",
          fr: "Constamment — je relis 5 fois et des erreurs énormes passent quand même",
          es: "Constantemente — mi control de calidad ha colapsado; reviso 5 veces y aún se escapan fallos graves",
        },
      },
    ],
  },

  // Subscale 3: Willpower Depletion (Evening collapse, impulse control loss, irritability)
  {
    id: 9,
    subscale: "willpower_depletion",
    prompt: {
      en: "By the time I finish work, I collapse onto the couch and find myself physically unable to get up to cook, shower, or exercise.",
      id: "Saat jam kerja selesai, aku tumbang di kasur/sofa dan merasa secara fisik tidak sanggup bangkit untuk masak, mandi, atau olahraga.",
      de: "Nach Feierabend falle ich aufs Sofa und schaffe es körperlich kaum noch, aufzustehen, um zu kochen oder zu duschen.",
      fr: "En fin de journée, je m'effondre sur le canapé, physiquement incapable de me relever pour cuisiner ou faire du sport.",
      es: "Al terminar la jornada, me desplomo en el sofá, físicamente incapaz de levantarme a cocinar, ducharme o ejercitarme.",
    },
    options: [
      {
        score: 0,
        label: {
          en: "Disagree — I have plenty of vitality left for my personal evening life",
          id: "Tidak setuju — energiku masih berlimpah untuk menikmati malam pribadi dengan aktif",
          de: "Stimme nicht zu — ich habe genug Energie für Sport und Hobbys am Abend",
          fr: "Pas d'accord — j'ai encore plein d'énergie pour ma soirée",
          es: "En desacuerdo — conservo vitalidad para mi vida personal al anochecer",
        },
      },
      {
        score: 1,
        label: {
          en: "Occasionally — on especially strenuous days",
          id: "Kadang — hanya pada hari-hari yang luar biasa berat",
          de: "Gelegentlich — an besonders anstrengenden Tagen",
          fr: "Parfois — après des journées particulièrement dures",
          es: "A veces — en días excepcionalmente duros",
        },
      },
      {
        score: 2,
        label: {
          en: "Most evenings — I sit in work clothes staring at my phone for 90 minutes before doing anything",
          id: "Sebagian besar malam — aku duduk melamun memakai baju kerja menatap HP 90 menit sebelum bisa bergerak",
          de: "Meistens — ich sitze 90 Minuten in Arbeitskleidung am Smartphone, unfähig aufzustehen",
          fr: "La plupart des soirs — je reste 90 minutes en tenue de travail prostré sur mon téléphone",
          es: "La mayoría de las tardes — paso hora y media con la ropa de trabajo mirando el móvil sin moverme",
        },
      },
      {
        score: 3,
        label: {
          en: "Total inertia — complete willpower bankrupt; basic self-care routines (flossing, cooking) have completely disintegrated",
          id: "Inersia total — cadangan kemauan bangkrut; rutinitas perawatan diri dasar (sikat gigi, mandi, masak) hancur berantakan",
          de: "Völlige Lähmung — Willenskraft bankrott; selbst Zähneputzen oder Kochen überfordert mich",
          fr: "Inertie absolue — réserve de volonté à sec; l'hygiène de base et les repas sains sont abandonnés",
          es: "Inercia absoluta — quiebra total de fuerza de voluntad; las rutinas básicas de autocuidado han desaparecido",
        },
      },
    ],
  },
  {
    id: 10,
    subscale: "willpower_depletion",
    prompt: {
      en: "I give in to unhealthy impulses in the evening (late-night snacking, impulsive online shopping, doomscrolling) that I easily resist during the morning.",
      id: "Di malam hari aku mudah menyerah pada godaan impulsif (ngemil larut malam, checkout belanjaan online, doomscrolling) yang paginya sangat mudah kutolak.",
      de: "Am Abend erliege ich Impulsen (ungesundes Essen, Online-Shopping, Doomscrolling), die ich morgens locker widerstehen könnte.",
      fr: "Le soir, je cède à des pulsions (grignotage, shopping compulsif, doomscrolling) que je maîtrise sans peine le matin.",
      es: "Por la noche cedo a impulsos (atracones, compras compulsivas, doomscrolling) que por la mañana controlo con facilidad.",
    },
    options: [
      {
        score: 0,
        label: {
          en: "Disagree — my self-discipline remains steady around the clock",
          id: "Tidak setuju — disiplin diriku tetap konsisten dari pagi hingga malam",
          de: "Stimme nicht zu — meine Selbstdisziplin bleibt rund um die Uhr stabil",
          fr: "Pas d'accord — mon autodiscipline reste ferme toute la journée",
          es: "En desacuerdo — mi autocontrol se mantiene firme todo el día",
        },
      },
      {
        score: 1,
        label: {
          en: "Mildly — an occasional treat or late dessert",
          id: "Ringan — sesekali jajan camilan manis yang wajar",
          de: "Leicht — ab und zu ein Snack, aber im Rahmen",
          fr: "Légèrement — un petit écart gourmand de temps en temps",
          es: "Levemente — un capricho ocasional sin mayor impacto",
        },
      },
      {
        score: 2,
        label: {
          en: "Frequently — by 9 PM my prefrontal cortex has clocked out; I buy items I don't need or eat mindlessly",
          id: "Sering — jam 9 malam otak rasional sudah mati rasa; aku belanja barang tidak penting atau ngemil tanpa henti",
          de: "Häufig — ab 21 Uhr kapituliert mein Verstand; ich kaufe Unsinn oder snacke maßlos",
          fr: "Souvent — vers 21h, mes freins sautent; j'achète des broutilles ou grignote sans faim",
          es: "Frecuentemente — a las 9 PM mi sensatez se apaga; compro cosas inútiles o como sin parar",
        },
      },
      {
        score: 3,
        label: {
          en: "Severe deficit — chronic self-sabotage every night to soothe the acute mental depletion from the workday",
          id: "Defisit parah — sabotase diri setiap malam demi menambal kekosongan energi akibat terkuras di jam kerja",
          de: "Massiver Mangel — nächtliche Selbstzerstörung, nur um die Leere des Arbeitstages zu betäuben",
          fr: "Déficit grave — auto-sabotage nocturne systématique pour anesthésier le vide laissé par la journée",
          es: "Déficit severo — autosabotaje nocturno sistemático para anestesiar el vacío de la jornada laboral",
        },
      },
    ],
  },
  {
    id: 11,
    subscale: "willpower_depletion",
    prompt: {
      en: "I snap or lose my temper with my partner, children, or pets over minor annoyances after a long day of decision-making.",
      id: "Aku mudah membentak atau emosi ke pasangan, anak, atau hewan peliharaan karena hal sepele setelah seharian berpikir keras.",
      de: "Nach anstrengenden Denktagen reagiere ich gegenüber Partner, Kindern oder Haustieren ungeduldig und unwirsch.",
      fr: "Après une journée de décisions intenses, je perds patience et m'emporte contre mes proches pour des riens.",
      es: "Pierdo la paciencia y me enojo con mi pareja, hijos o mascotas por pequeñeces tras un día agotador.",
    },
    options: [
      {
        score: 0,
        label: {
          en: "Never — I maintain warmth and emotional regulation at home",
          id: "Tidak pernah — aku tetap hangat dan mampu meregulasi emosi di rumah",
          de: "Nie — ich bleibe zu Hause gelassen und zugewandt",
          fr: "Jamais — je reste bienveillant et posé à la maison",
          es: "Nunca — conservo la calidez y el sosiego en casa",
        },
      },
      {
        score: 1,
        label: {
          en: "Rarely — brief sigh, followed by an immediate apology",
          id: "Jarang — menghela napas sesaat lalu langsung meminta maaf",
          de: "Selten — ein kurzes Seufzen mit sofortiger Entschuldigung",
          fr: "Rarement — un soupir vite suivi d'excuses",
          es: "Rara vez — un suspiro y disculpa inmediata",
        },
      },
      {
        score: 2,
        label: {
          en: "Frequently — my emotional fuse is microscopic; I have zero patience left for household dialogue",
          id: "Sering — sumbu emosiku sangat pendek; energiku habis untuk diajak ngobrol santai",
          de: "Häufig — meine Zündschnur ist hauchdünn; ich ertrage abends keine Diskussionen mehr",
          fr: "Souvent — ma patience est à zéro; je n'ai plus la force d'écouter les soucis domestiques",
          es: "Frecuentemente — mi paciencia es nula; no me queda energía para hablar de asuntos domésticos",
        },
      },
      {
        score: 3,
        label: {
          en: "Chronic remorse — I act like a cold, volatile stranger to the people I love most because my brain is running on empty fumes",
          id: "Rasa bersalah kronis — aku berubah menjadi sosok yang dingin dan ketus kepada orang tersayang karena energiku terkuras habis",
          de: "Chronische Reue — ich verhalte mich kalt und gereizt gegenüber meinen Liebsten, weil mein Akku auf 0 % steht",
          fr: "Culpabilité vive — je deviens froid et cassant envers mes proches faute d'énergie cérébrale",
          es: "Remordimiento crónico — me vuelvo cortante y distante con quienes más amo por agotamiento extremo",
        },
      },
    ],
  },
  {
    id: 12,
    subscale: "willpower_depletion",
    prompt: {
      en: "I avoid booking doctors' appointments, paying parking fines, or filing basic paperwork because the administrative friction feels insurmountable.",
      id: "Aku menunda membuat janji dokter, bayar denda, atau mengurus administrasi ringan karena beban mentalnya terasa terlalu berat.",
      de: "Ich schiebe Arzttermine, Behördengänge oder Rechnungen auf, weil der mentale Aufwand unüberwindbar wirkt.",
      fr: "Je reporte mes rendez-vous médicaux ou mes formalités administratives car l'effort mental me paraît insurmontable.",
      es: "Evito pedir citas médicas o hacer trámites sencillos porque el papeleo mental me parece una montaña.",
    },
    options: [
      {
        score: 0,
        label: {
          en: "Disagree — I resolve personal admin promptly as it arrives",
          id: "Tidak setuju — aku menyelesaikan urusan administrasi pribadi dengan cepat begitu muncul",
          de: "Stimme nicht zu — ich erledige Formalitäten sofort",
          fr: "Pas d'accord — je règle mes démarches administratives sans tarder",
          es: "En desacuerdo — gestiono mis trámites personales de inmediato",
        },
      },
      {
        score: 1,
        label: {
          en: "Occasionally — slight delay on tedious tax or insurance forms",
          id: "Kadang — sedikit menunda hanya pada berkas pajak atau asuransi yang rumit",
          de: "Gelegentlich — zögere nur bei komplexen Steuer- oder Versicherungsfragen",
          fr: "Parfois — un léger délai sur les dossiers fiscaux complexes",
          es: "A veces — ligera demora ante trámites fiscales engorrosos",
        },
      },
      {
        score: 2,
        label: {
          en: "Frequently — I accrue late fees or endure physical symptoms rather than make the phone call",
          id: "Sering — aku rela kena denda keterlambatan atau menahan sakit daripada harus menelpon buat bikin janji",
          de: "Häufig — ich zahle Mahngebühren oder leide still, nur um nicht telefonieren zu müssen",
          fr: "Souvent — je paie des pénalités de retard plutôt que de passer le coup de fil nécessaire",
          es: "Frecuentemente — pago recargos o aguanto molestias físicas con tal de no hacer una llamada",
        },
      },
      {
        score: 3,
        label: {
          en: "Paralyzing administrative burnout — months of unopened letters, neglected health, and total bureaucrat paralysis",
          id: "Burnout administratif akut — surat resmi menumpuk tak dibuka berbulan-bulan, kesehatan terabaikan, lumpuh total",
          de: "Lähmender Papierkram-Burnout — ungeöffnete Briefe stapeln sich monatelang, Gesundheit wird ignoriert",
          fr: "Phobie administrative aiguë — piles de courriers non ouverts depuis des mois, santé négligée",
          es: "Bloqueo burocrático total — cartas sin abrir acumuladas durante meses y salud descuidada por completo",
        },
      },
    ],
  },
];

export const DECISION_FATIGUE_ARCHETYPES: Record<DecisionFatigueArchetype["level"], DecisionFatigueArchetype> = {
  cognitively_resilient: {
    level: "cognitively_resilient",
    badge: {
      en: "Executive Clarity",
      id: "Kejernihan Eksekutif",
      de: "Kognitive Resilienz",
      fr: "Clarté Exécutive",
      es: "Claridad Ejecutiva",
    },
    title: {
      en: "Grounded Clarity & Cognitive Energy Efficiency",
      id: "Kejernihan Mental & Efisiensi Energi Kognitif",
      de: "Souveräne Klarheit & Geistige Frische",
      fr: "Clarté Mentale & Efficacité Cognitive",
      es: "Claridad Serena y Eficiencia Mental",
    },
    tagline: {
      en: "You manage your daily cognitive battery with precision, avoiding the 3 PM brain fog and decision paralysis.",
      id: "Kamu mengelola baterai kognitif harianmu dengan tepat, terbebas dari brain fog jam 3 sore dan kelumpuhan keputusan.",
      de: "Du haushaltest klug mit deinen geistigen Ressourcen und meisterst Entscheidungen ohne mentale Erschöpfung.",
      fr: "Vous préservez votre capital mental avec brio, évitant le brouillard de 15h et la paralysie du choix.",
      es: "Administras tu energía mental con destreza, eludiendo la niebla de la tarde y el bloqueo de decisiones.",
    },
    description: {
      en: "Your scores reflect high cognitive reserve and strong decision hygiene. You don't waste precious prefrontal cortex fuel deliberating trivial matters like wardrobe or lunch. Your working memory operates smoothly without feeling saturated by digital notifications.",
      id: "Skormu mencerminkan cadangan kognitif yang prima dan manajemen keputusan yang sehat. Kamu tidak membuang energi otak depan untuk hal sepele seperti baju atau makan siang. Memori kerjamu berjalan optimal.",
      de: "Deine Ergebnisse zeigen eine hohe kognitive Reserve. Du verschwendest keine Energie an banale Alltagsfragen und dein Arbeitsspeicher bleibt frei von digitaler Überreizung.",
      fr: "Vos scores attestent d'une excellente hygiène décisionnelle. Vous n'épuisez pas votre cortex préfrontal sur des détails futiles et filtrez efficacement les sollicitations numériques.",
      es: "Tus resultados indican una sólida reserva cognitiva. No malgastas recursos mentales en nimiedades y proteges tu memoria de trabajo de la saturación digital.",
    },
    psychologyInsight: {
      en: "Roy Baumeister's Ego Depletion model and John Sweller's Cognitive Load Theory show that the prefrontal cortex uses real glucose to make choices. By automating trivial routines, you protect your executive function.",
      id: "Model Ego Depletion Roy Baumeister membuktikan bahwa otak depan mengonsumsi glukosa riil saat memilih. Dengan mengotomasi rutinitas sepele, kamu menjaga kejernihan eksekutifmu.",
      de: "Die Kognitionspsychologie belegt: Jede Entscheidung verbraucht reale Energie. Wer triviale Abläufe automatisiert, schützt sein Urteilsvermögen für das Wesentliche.",
      fr: "La théorie de la charge cognitive de Sweller démontre que chaque choix entame le stock de glucose du cerveau. Automatiser les détails préserve la lucidité.",
      es: "La teoría de la carga cognitiva de Sweller demuestra que cada decisión consume energía real. Automatizar lo trivial salvaguarda tu lucidez ejecutiva.",
    },
    actionProtocols: {
      en: [
        "Continue automating meal prep, wardrobe, and routine calendar slots.",
        "Take scheduled 10-minute non-screen cognitive rests during mid-afternoon.",
        "Use Nuju's voice notes for end-of-day brain dumps to reset working memory.",
      ],
      id: [
        "Lanjutkan otomatisasi jadwal makan, pakaian kerja, dan slot kalender.",
        "Ambil jeda 10 menit tanpa layar gawai di jam 3 sore untuk mendinginkan otak.",
        "Gunakan jurnal suara Nuju untuk mengosongkan beban pikiran sebelum tidur.",
      ],
      de: [
        "Behalte die Automatisierung von Alltagsroutinen (Kleidung, Mahlzeiten) bei.",
        "Gönne dir nachmittags 10 Minuten Bildschirmpause zur Regeneration.",
        "Nutze das Nuju-Sprachtagebuch zum abendlichen Entladen des Arbeitsspeichers.",
      ],
      fr: [
        "Poursuivez l'automatisation des repas et de l'organisation quotidienne.",
        "Accordez-vous 10 minutes de pause sans écran au milieu de l'après-midi.",
        "Déchargez vos pensées dans le mémo vocal de Nuju pour clore la journée.",
      ],
      es: [
        "Mantén la automatización de rutinas cotidianas (menús, vestimenta).",
        "Regálate 10 minutos de pausa sin pantallas a media tarde.",
        "Descarga tus tareas pendientes en el diario de voz de Nuju antes de descansar.",
      ],
    },
    dailyAffirmation: {
      en: "My mental energy is a precious currency. I invest it in meaningful creation, not trivial deliberation.",
      id: "Energi mentalku adalah mata uang berharga. Aku menginvestasikannya untuk karya bermakna, bukan keraguan sepele.",
      de: "Meine geistige Kraft ist kostbar. Ich investiere sie in Schöpfung statt in triviale Grübeleien.",
      fr: "Mon énergie mentale est précieuse. Je la consacre à ce qui compte vraiment plutôt qu'aux hésitations futiles.",
      es: "Mi energía mental es un tesoro. La invierto en lo trascendente, no en dilemas superficiales.",
    },
  },

  midday_fog_drifter: {
    level: "midday_fog_drifter",
    badge: {
      en: "Midday Fog Drifter",
      id: "Kabut Otak Siang Hari",
      de: "Der 15-Uhr-Nebelwanderer",
      fr: "Le Navigateur du Brouillard",
      es: "El Navegante de la Niebla",
    },
    title: {
      en: "The Overloaded Multi-Tasker & 3 PM Fogger",
      id: "Multi-Tasker yang Kewalahan & Kabut Jam 3 Sore",
      de: "Der überreizte Multitasker im Nachmittagstief",
      fr: "Le Multitâche Saturé & le Coup de Pompe de 15h",
      es: "El Multitarea Saturado y el Bajón Vespertino",
    },
    tagline: {
      en: "You start the morning with razor-sharp ambition, but by 3:00 PM your brain feels like a browser with 72 tabs open.",
      id: "Pagi hari kamu mulai dengan ambisi tajam, tetapi jam 3 sore otakmu terasa seperti browser dengan 72 tab terbuka.",
      de: "Du startest morgens fokussiert, doch um 15:00 Uhr fühlt sich dein Kopf wie ein überlasteter Browser mit 70 offenen Tabs an.",
      fr: "Vous démarrez la journée avec brio, mais à 15h votre esprit ressemble à un navigateur encombré de 70 onglets ouverts.",
      es: "Comienzas con gran empuje, pero a las 3:00 PM tu mente es como un navegador con 70 pestañas colgadas.",
    },
    description: {
      en: "You experience moderate decision fatigue. Your morning hours are highly productive, but you leak cognitive energy through constant micro-decisions: checking emails between deep work, replying to Slack pings, and debating small details. By mid-afternoon, reading requires re-reading, and making dinner choices sparks quiet frustration.",
      id: "Kamu mengalami kelelahan keputusan tingkat sedang. Pagimu sangat produktif, namun energimu bocor halus lewat keputusan mikro: bolak-balik cek pesan Slack, membalas chat sembari bekerja, dan memperdebatkan hal kecil.",
      de: "Du leidest unter spürbarer Entscheidungsmüdigkeit. Dein Morgen ist stark, doch du verlierst Energie durch ständige Mikroeingaben. Nachmittags blockiert dein Leseverständnis und du wirst gereizt.",
      fr: "Vous subissez une fatigue décisionnelle modérée. Très efficace le matin, vous dispersez votre énergie dans d'innombrables micro-choix. Dès le milieu d'après-midi, la concentration décline.",
      es: "Padeces una fatiga de decisión moderada. Rindes bien temprano, pero dispersas tu energía en microdecisiones continuas. A media tarde te cuesta concentrarte y te irritan las dudas.",
    },
    psychologyInsight: {
      en: "This is classic 'Context-Switching Penalty.' Gloria Mark's research at UC Irvine shows that every distraction takes an average of 23 minutes to fully refocus from. Constant switching burns out the prefrontal cortex prematurely.",
      id: "Ini adalah fenomena 'Context-Switching Penalty.' Riset Gloria Mark di UC Irvine membuktikan tiap distraksi membutuhkan rata-rata 23 menit untuk fokus penuh kembali, membakar habis energi otak depan.",
      de: "Die Forschung belegt: Jeder Kontextwechsel kostet bis zu 23 Minuten Fokuszeit. Ständiges Hin- und Herschalten leert den mentalen Akku viel zu früh.",
      fr: "L'effet de zapping mental est impitoyable : chaque interruption demande 23 minutes pour retrouver un focus profond, vidant le réservoir cognitif.",
      es: "El coste del cambio de contexto es letal: cada distracción requiere 23 minutos para recobrar el hilo, quemando tus reservas a media jornada.",
    },
    actionProtocols: {
      en: [
        "Batch Communications: Check emails and messaging tools only twice daily (e.g., 11:30 AM and 4:00 PM) instead of continuously.",
        "Implement Default Choices: Choose a standard uniform for workdays and pre-plan weekday lunches.",
        "10-Minute Non-Sleep Deep Rest (NSDR): Use Nuju's NSDR audio track at 2:30 PM to reboot executive processing.",
      ],
      id: [
        "Kumpulkan Jadwal Cek Pesan: Cek email dan Slack hanya 2 kali sehari (misal jam 11.30 dan 16.00), jangan dibiarkan terbuka terus.",
        "Terapkan Pilihan Baku: Tentukan baju kerja standar dan menu makan siang tetap dari hari Senin-Jumat.",
        "Gunakan Audio NSDR Nuju: Dengarkan audio NSDR Nuju jam 2.30 siang selama 10 menit untuk me-reboot fokus otak.",
      ],
      de: [
        "Bündele Kommunikation: Bearbeite Nachrichten nur zweimal täglich (z. B. 11:30 und 16:00 Uhr).",
        "Etabliere Standardoptionen: Gleiches Mittagessen und feste Outfits an Wochentagen.",
        "10-Minuten NSDR-Pause: Nutze Nujus NSDR-Audios um 14:30 Uhr, um das Gehirn neu zu starten.",
      ],
      fr: [
        "Regroupez vos e-mails : ne traitez les messages que deux fois par jour (11h30 et 16h00).",
        "Adoptez des choix par défaut : menu standard le midi et tenue sobre simplifiée.",
        "Pause NSDR de 10 minutes : écoutez la piste NSDR de Nuju à 14h30 pour réinitialiser le système.",
      ],
      es: [
        "Bloques de mensajería: revisa correos y chats solo dos veces al día (11:30 y 16:00).",
        "Opciones fijas por defecto: define ropa y almuerzos estándar para no gastar energía matutina.",
        "Pausa NSDR de 10 minutos: escucha el audio NSDR de Nuju a las 2:30 PM para reiniciar el foco.",
      ],
    },
    dailyAffirmation: {
      en: "I do not need to make every choice in real-time. Pausing and protecting my focus is a sign of wisdom.",
      id: "Aku tidak harus memutuskan segala hal seketika itu juga. Mengambil jeda dan melindungi fokus adalah tanda kebijaksanaan.",
      de: "Ich muss nicht jede Entscheidung sofort treffen. Innehalten schützt meine Urteilskraft.",
      fr: "Je n'ai pas à tout trancher dans l'instant. Préserver mon attention est un acte de sagesse.",
      es: "No tengo que decidir todo al instante. Pausar y cuidar mi atención es un acto de sabiduría.",
    },
  },

  choice_paralyzed_staller: {
    level: "choice_paralyzed_staller",
    badge: {
      en: "Choice Paralyzed",
      id: "Lumpuh Memilih",
      de: "Entscheidungsblockiert",
      fr: "Paralysé par le Choix",
      es: "Paralizado por la Duda",
    },
    title: {
      en: "The Chronic Deliberator & Choice Exhaustee",
      id: "Pemikir Berbelit & Kelumpuhan Memilih",
      de: "Der chronische Zauderer im Entscheidungskollaps",
      fr: "Le Chercheur d'Absolu & le Décideur Épuisé",
      es: "El Escrutador Eterno y la Duda Agotadora",
    },
    tagline: {
      en: "Making even minor choices feels like pushing a boulder up a mountain, leaving you paralyzed in front of food menus and to-do lists.",
      id: "Membuat keputusan kecil saja rasanya seperti mendorong batu besar ke puncak gunung, membuatmu terpaku di depan menu makanan dan to-do list.",
      de: "Selbst kleine Entscheidungen fühlen sich wie ein Berganstieg an; Speisekarten und To-Do-Listen lösen pure Verzweiflung aus.",
      fr: "Le moindre choix quotidien ressemble à une montagne insurmontable, vous laissant prostré devant une carte de restaurant ou une to-do list.",
      es: "Tomar una decisión sencilla parece una subida alpina; las cartas de restaurantes y las tareas te paralizan por completo.",
    },
    description: {
      en: "Your scores reflect high, chronic decision fatigue. You are in a perpetual state of cognitive overdraft. You spend hours researching minor purchases, leave dozens of text messages unanswered, and suffer from intense evening willpower collapse—indulging in late-night junk food, doomscrolling, or snapping at family members because your emotional brakes have failed.",
      id: "Skormu mencerminkan kelelahan keputusan tingkat berat. Rekening energimu sedang minus parah. Kamu menghabiskan berjam-jam membandingkan barang sepele, membiarkan pesan terbengkalai, dan mengalami keruntuhan disiplin di malam hari.",
      de: "Du bist chronisch entscheidungserschöpft. Du investierst Stunden in Recherchen für Kleinigkeiten, lässt Nachrichten liegen und brichst abends willensmäßig zusammen (Heißhunger, Scrollen, Wutanfälle).",
      fr: "Votre capital décisionnel est dans le rouge. Vous passez des heures à comparer des achats minimes, ignorez vos messages et craquez le soir venu (grignotage, colère, écrans tardifs).",
      es: "Vives en bancarrota decisional crónica. Pasas horas investigando compras ridículas, no contestas mensajes y por la noche pierdes los estribos o te abandonas a la comida basura.",
    },
    psychologyInsight: {
      en: "Barry Schwartz's 'Paradox of Choice' outlines how 'Maximizers' (who seek the absolute optimal choice) suffer significantly more anxiety, paralysis, and post-decision regret than 'Satisficers' (who choose the first option that meets good-enough criteria).",
      id: "Riset 'Paradox of Choice' Barry Schwartz membuktikan bahwa orang bertipe 'Maximizer' (selalu mencari opsi paling sempurna) menderita kecemasan dan penyesalan jauh lebih parah dibanding tipe 'Satisficer' (yang puas dengan opsi 'cukup baik').",
      de: "Barry Schwartz' 'Paradox of Choice': 'Maximizer', die nach dem perfekten Ergebnis suchen, leiden unter extremer Lähmung. 'Satisficer', die mit 'gut genug' leben, sind viel glücklicher.",
      fr: "Le paradoxe du choix de Barry Schwartz montre que chercher l'option parfaite paralyse le cerveau. Viser le 'suffisamment bon' libère immédiatement la charge mentale.",
      es: "El 'Paradoja de la Elección' de Barry Schwartz demuestra que buscar lo perfecto engendra parálisis. Aprender a conformarse con lo 'suficientemente bueno' alivia la mente.",
    },
    actionProtocols: {
      en: [
        "Adopt 'Good Enough' Heuristics: For any decision under $50, give yourself a maximum of 90 seconds to choose.",
        "Outsource or Delegate: Tell your partner or friend: 'You pick dinner tonight, and I will happily eat whatever you choose without comment.'",
        "Digital Sunsets: Turn on grayscale mode and shut off communication notifications at 7:00 PM to let your prefrontal cortex regenerate.",
      ],
      id: [
        "Terapkan Prinsip 'Cukup Baik': Untuk keputusan di bawah 100 ribu rupiah, beri batas waktu maksimal 90 detik untuk memilih.",
        "Delegasikan Keputusan: Katakan pada pasangan/teman: 'Malam ini kamu yang pilih makanannya ya, aku ikut apa pun tanpa protes.'",
        "Digital Sunset: Ubah layar HP menjadi hitam-putih (grayscale) dan matikan notifikasi jam 7 malam agar otakmu bisa pulih.",
      ],
      de: [
        "Nutze 'Gut-Genug'-Regeln: Begrenze Entscheidungen unter 50 Euro auf maximal 90 Sekunden.",
        "Entscheidungen abgeben: Sag deinem Partner: 'Du wählst heute das Essen aus, und ich esse dankbar mit.'",
        "Digitaler Feierabend: Schalte ab 19:00 Uhr Benachrichtigungen stumm und den Bildschirm auf Graustufen.",
      ],
      fr: [
        "Règle du 'Suffisamment Bon' : pour tout choix de moins de 50 €, limitez votre réflexion à 90 secondes.",
        "Déléguez le choix : dites à votre entourage : 'Choisis le dîner, je m'en réjouirai sans discuter.'",
        "Couvre-feu numérique : passez votre téléphone en noir et blanc dès 19h pour laisser reposer votre cerveau.",
      ],
      es: [
        "Regla de lo 'Suficiente': para decisiones menores a 50 €, date un tope de 90 segundos.",
        "Delega el veredicto: di a tu acompañante: 'Elige tú la cena hoy, me adaptaré encantado.'",
        "Atardecer digital: pon la pantalla en blanco y negro y silencia chats a partir de las 7:00 PM.",
      ],
    },
    dailyAffirmation: {
      en: "A 'good enough' decision made today is infinitely better than a perfect decision that paralyzes my life.",
      id: "Keputusan 'cukup baik' yang diambil hari ini jauh lebih berharga daripada keputusan sempurna yang melumpuhkan hidupku.",
      de: "Eine 'gut genaue' Entscheidung heute ist unendlich besser als eine perfekte Wahl, die mich lähmt.",
      fr: "Un choix 'suffisamment bon' fait aujourd'hui vaut mille fois mieux qu'une perfection qui me paralyse.",
      es: "Una decisión 'bastante buena' hoy es infinitamente mejor que una perfección que me paraliza la vida.",
    },
  },

  executive_burnout_collapse: {
    level: "executive_burnout_collapse",
    badge: {
      en: "Executive Burnout",
      id: "Burnout Eksekutif",
      de: "Kognitiver Totalschaden",
      fr: "Burnout Exécutif",
      es: "Colapso Ejecutivo",
    },
    title: {
      en: "The Cognitive Red-Liner & Total Depletion",
      id: "Kelelahan Kognitif Kritis & Kolaps Eksekutif",
      de: "Der kognitive Totalausfall im Erschöpfungskollaps",
      fr: "L'Arrêt d'Urgence Exécutif & l'Épuisement Total",
      es: "El Cortocircuito Cognitivo y la Bancarrota Mental",
    },
    tagline: {
      en: "Your brain's decision-making engine is completely dry; asking you to choose feels like asking someone with two broken legs to run a marathon.",
      id: "Mesin pengambil keputusan di otakmu sudah kering total; memintamu memilih terasa seperti menyuruh orang patah kaki lari maraton.",
      de: "Dein geistiger Antrieb ist völlig leergebrannt; selbst kleinste Entscheidungen überfordern dich maßlos.",
      fr: "Votre moteur décisionnel est à sec; vous demander de choisir équivaut à exiger un marathon d'un blessé.",
      es: "Tu motor de decisión está completamente seco; pedirte una elección parece exigirle un maratón a alguien con las piernas rotas.",
    },
    description: {
      en: "Your scores indicate severe, clinical-level executive dysfunction and decision burnout. Your nervous system is red-lining. You neglect critical paperwork, avoid medical appointments, experience intense working memory gaps, and feel completely overwhelmed by basic human conversation. You are in desperate need of immediate cognitive triage.",
      id: "Skormu menunjukkan disfungsi eksekutif tingkat kritis dan burnout mental akut. Sistem sarafmu menjerit kelelahan. Kamu menelantarkan urusan penting, menghindari dokter, sering blank lupa ingatan, dan muak diajak bicara.",
      de: "Deine Ergebnisse zeigen einen akuten kognitiven Burnout. Dein Nervensystem ist im roten Bereich. Wichtige Formalitäten bleiben monatelang liegen, du meidest Gespräche und dein Gedächtnis versagt.",
      fr: "Vos scores signalent un burnout exécutif sévère. Votre système nerveux est en surchauffe critique. Vous négligez vos soins médicaux, accumulez le courrier non ouvert et fuyez les échanges.",
      es: "Tus resultados revelan un colapso ejecutivo clínico. Tu sistema nervioso está al límite. Descuidas la salud, acumulas facturas y el mero diálogo cotidiano te hace llorar de impotencia.",
    },
    psychologyInsight: {
      en: "This state reflects severe prefrontal cortex hypofunction induced by chronic allostatic load. The brain has entered a protective shutdown to force physical rest, leaving executive decision-making offline.",
      id: "Kondisi ini mencerminkan hipofungsi korteks prefrontal akibat beban stres alostatik berkepanjangan. Otak sengaja mematikan sistem eksekutif demi memaksamu istirahat total.",
      de: "Hier liegt eine reale Unterfunktion des präfrontalen Kortex durch chronische Überlastung vor. Das Gehirn schaltet die Steuerungsfunktionen ab, um dich zum Stillstand zu zwingen.",
      fr: "Il s'agit d'une hypoactivité réactionnelle du cortex préfrontal due à la charge allostatique : votre cerveau disjoncte délibérément pour vous contraindre au repos.",
      es: "Refleja una hipofunción real del córtex prefrontal inducida por sobrecarga alostática crónica. Tu cerebro se desconecta para forzar el cese de actividad.",
    },
    actionProtocols: {
      en: [
        "Immediate Cognitive Quarantine: Cancel all non-essential meetings and commitments for the next 72 hours.",
        "Zero-Choice Days: For the next 3 days, eat identical prepared meals, wear the same comfortable clothes, and speak minimal words.",
        "Professional Support: Speak with a physician or psychologist to screen for clinical burnout, adhd paralysis, or depressive exhaustion.",
      ],
      id: [
        "Karantina Kognitif Segera: Batalkan semua rapat dan janji temu yang tidak mendesak selama 72 jam ke depan.",
        "Hari Tanpa Pilihan: Selama 3 hari ke depan, makan menu yang sudah disiapkan tanpa memilih, pakai baju yang sama, dan minimalkan bicara.",
        "Konsultasi Profesional: Temui dokter atau psikolog untuk memeriksa apakah kamu mengalami burnout klinis atau depresi kelelahan.",
      ],
      de: [
        "Sofortige kognitive Quarantäne: Streiche alle entbehrlichen Meetings für die nächsten 72 Stunden.",
        "Tage ohne Wahl: Drei Tage lang identische Kleidung tragen, vorgekochtes Essen nutzen und kaum sprechen.",
        "Ärztliche Abklärung: Lass dich krankschreiben und sprich mit Fachleuten über Burnout und adäquate Erholung.",
      ],
      fr: [
        "Quarantaine cognitive d'urgence : annulez tout engagement non vital pendant 72 heures.",
        "Jours sans choix : pendant 3 jours, simplifiez tout à l'extrême (mêmes repas, tenue unique, silence radio).",
        "Accompagnement médical : consultez un médecin pour évaluer un arrêt maladie pour épuisement professionnel.",
      ],
      es: [
        "Cuarentena mental inmediata: cancela todo compromiso prescindible durante 72 horas.",
        "Días sin elección: durante 3 días come lo mismo, viste igual y reduce al mínimo las palabras.",
        "Apoyo médico urgente: acude a un profesional de salud para valorar una baja por agotamiento extremo.",
      ],
    },
    dailyAffirmation: {
      en: "I am allowed to stop choosing. I give myself permission to be silent, to rest, and to let the world turn without my management.",
      id: "Aku diizinkan untuk berhenti memilih. Aku mengizinkan diriku diam, beristirahat, dan membiarkan dunia berputar tanpa campur tanganku.",
      de: "Ich darf aufhören zu entscheiden. Ich erlaube mir Stille, Ruhe und lasse die Welt sich ohne mich drehen.",
      fr: "J'ai le droit de ne plus choisir. Je m'autorise le silence et laisse le monde tourner sans mon intervention.",
      es: "Me permito dejar de decidir. Me doy permiso para el silencio, el descanso y para dejar que el mundo gire sin mí.",
    },
  },
};

export function calculateDecisionFatigueScore(answers: Record<number, number>): DecisionFatigueScoreResult {
  let totalScore = 0;
  let paralysisScore = 0;
  let saturationScore = 0;
  let depletionScore = 0;

  DECISION_FATIGUE_QUESTIONS.forEach((q) => {
    const score = answers[q.id] ?? 0;
    totalScore += score;

    if (q.subscale === "choice_paralysis") paralysisScore += score;
    if (q.subscale === "cognitive_saturation") saturationScore += score;
    if (q.subscale === "willpower_depletion") depletionScore += score;
  });

  const maxTotal = DECISION_FATIGUE_QUESTIONS.length * 3; // 36
  const maxSubscale = 4 * 3; // 12
  const percentage = Math.round((totalScore / maxTotal) * 100);

  let level: DecisionFatigueArchetype["level"];
  if (percentage <= 24) {
    level = "cognitively_resilient";
  } else if (percentage <= 49) {
    level = "midday_fog_drifter";
  } else if (percentage <= 74) {
    level = "choice_paralyzed_staller";
  } else {
    level = "executive_burnout_collapse";
  }

  return {
    totalScore,
    percentage,
    level,
    profile: DECISION_FATIGUE_ARCHETYPES[level],
    subscales: {
      choice_paralysis: {
        score: paralysisScore,
        percentage: Math.round((paralysisScore / maxSubscale) * 100),
      },
      cognitive_saturation: {
        score: saturationScore,
        percentage: Math.round((saturationScore / maxSubscale) * 100),
      },
      willpower_depletion: {
        score: depletionScore,
        percentage: Math.round((depletionScore / maxSubscale) * 100),
      },
    },
  };
}
