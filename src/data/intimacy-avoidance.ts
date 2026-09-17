export type IntimacyAvoidanceLang = "en" | "id" | "de" | "fr" | "es";

export interface IntimacyAvoidanceQuestion {
  id: number;
  subscale: "affection_withholding" | "busywork_evasion" | "silent_blame_armor";
  prompt: Record<IntimacyAvoidanceLang, string>;
  options: {
    label: Record<IntimacyAvoidanceLang, string>;
    score: number; // 0 to 3
  }[];
}

export interface IntimacyAvoidanceArchetype {
  level: "intimately_receptive_partner" | "cautiously_sheltered_companion" | "intimacy_anorexic_sentinel" | "walled_fortress_isolate";
  badge: Record<IntimacyAvoidanceLang, string>;
  title: Record<IntimacyAvoidanceLang, string>;
  tagline: Record<IntimacyAvoidanceLang, string>;
  description: Record<IntimacyAvoidanceLang, string>;
  psychologyInsight: Record<IntimacyAvoidanceLang, string>;
  actionProtocols: Record<IntimacyAvoidanceLang, string[]>;
  dailyAffirmation: Record<IntimacyAvoidanceLang, string>;
}

export interface IntimacyAvoidanceScoreResult {
  totalScore: number;
  percentage: number;
  level: IntimacyAvoidanceArchetype["level"];
  profile: IntimacyAvoidanceArchetype;
  subscales: {
    affection_withholding: { score: number; percentage: number };
    busywork_evasion: { score: number; percentage: number };
    silent_blame_armor: { score: number; percentage: number };
  };
}

export const INTIMACY_AVOIDANCE_QUESTIONS: IntimacyAvoidanceQuestion[] = [
  // Subscale 1: Affection Withholding (Doug Weiss Intimacy Anorexia Model)
  {
    id: 1,
    subscale: "affection_withholding",
    prompt: {
      en: "I withhold verbal compliments, affirmations, or tender affection from my partner, even when I know they crave it.",
      id: "Aku menahan pujian, kata-kata manis, atau kasih sayang lembut dari pasanganku, meskipun aku tahu mereka sangat mendambakannya.",
      de: "Ich halte Komplimente, Liebesbekundungen oder zärtliche Worte vor meinem Partner zurück, selbst wenn ich weiß, dass er sich danach sehnt.",
      fr: "Je retiens mes compliments, mes mots tendres et mon affection envers mon partenaire, même en sachant qu'il en a grand besoin.",
      es: "Me guardo los cumplidos, las palabras de afecto o los gestos cariñosos hacia mi pareja, aun sabiendo que los anhela.",
    },
    options: [
      {
        score: 0,
        label: {
          en: "Rarely or never — I offer spontaneous, heartfelt praise and warmth freely",
          id: "Jarang atau tidak pernah — aku memberikan pujian tulus dan kehangatan secara spontan dan bebas",
          de: "Selten oder nie — ich schenke Zuneigung und Lob gerne und spontan",
          fr: "Rarement ou jamais — j'exprime spontanément ma tendresse et mes encouragements",
          es: "Casi nunca — expreso cariño y elogios espontáneos con total naturalidad",
        },
      },
      {
        score: 1,
        label: {
          en: "Occasionally when I am distracted or grumpy",
          id: "Sesekali hanya saat sedang terdistraksi atau sedang bad mood",
          de: "Gelegentlich bei schlechter Laune oder Stress",
          fr: "Parfois lorsque je suis distrait ou d'humeur maussade",
          es: "Ocasionalmente cuando estoy estresado o de mal humor",
        },
      },
      {
        score: 2,
        label: {
          en: "Frequently — offering tender words feels awkward, vulnerable, or like giving away my power",
          id: "Sering — mengucapkan kata-kata mesra terasa canggung, rentan, atau seperti kehilangan kendali diri",
          de: "Häufig — zärtliche Worte fühlen sich peinlich an oder wie ein Kontrollverlust",
          fr: "Souvent — les mots doux me semblent inconfortables ou comme un aveu de faiblesse",
          es: "A menudo — decir palabras tiernas me hace sentir vulnerable o que cedo poder",
        },
      },
      {
        score: 3,
        label: {
          en: "Chronic withholding — compliments feel dangerous; keeping my partner starving for validation keeps me safe",
          id: "Menahan kasih sayang kronis — memuji terasa berbahaya; membuat pasangan 'lapar' validasi membuatku merasa aman",
          de: "Dauerhafte Verweigerung — Zuwendung wirkt riskant; Distanz gibt mir Macht und Schutz",
          fr: "Rétention chronique — complimenter me paraît dangereux ; maintenir l'autre en manque me rassure",
          es: "Privación crónica — elogiar me asusta; mantener a mi pareja en vilo me da seguridad",
        },
      },
    ],
  },
  {
    id: 2,
    subscale: "affection_withholding",
    prompt: {
      en: "I avoid non-sexual physical touch (hugs, holding hands, caressing hair) because I fear it will lead to unwanted sexual or emotional demands.",
      id: "Aku menghindari sentuhan fisik non-seksual (pelukan hangat, bergandengan tangan, mengelus rambut) karena takut itu berujung pada tuntutan emosi atau seksual.",
      de: "Ich meide nicht-sexuelle Berührungen (Händchenhalten, Umarmungen), weil ich emotionale oder sexuelle Forderungen fürchte.",
      fr: "J'évite les gestes d'affection non sexuels (câlins, mains tenues) de peur qu'ils ne débouchent sur des exigences émotionnelles.",
      es: "Evito el contacto físico no sexual (abrazos, tomarse de la mano) por temor a que genere demandas emocionales o sexuales.",
    },
    options: [
      {
        score: 0,
        label: {
          en: "Disagree — I adore gentle, casual, non-demanding physical closeness",
          id: "Tidak setuju — aku sangat menyukai keintiman fisik yang lembut, kasual, dan tanpa tuntutan",
          de: "Trifft nicht zu — ich liebe zärtliche, unbeschwerte Berührungen im Alltag",
          fr: "Pas d'accord — j'apprécie profondément les contacts tendres et complices au quotidien",
          es: "En desacuerdo — disfruto enormemente del contacto afectivo cotidiano y sin presiones",
        },
      },
      {
        score: 1,
        label: {
          en: "Only when tired after long commutes",
          id: "Hanya saat sangat lelah sepulang perjalanan jauh",
          de: "Nur bei Erschöpfung nach der Arbeit",
          fr: "Seulement en cas de fatigue physique après le travail",
          es: "Solo cuando llego muy cansado del trabajo",
        },
      },
      {
        score: 2,
        label: {
          en: "Frequently — prolonged hugging makes me physically tense, fidgety, or eager to pull away",
          id: "Sering — pelukan berlama-lama membuat tubuhku tegang, gelisah, atau ingin segera melepaskan diri",
          de: "Häufig — langes Umarmen macht mich unruhig und ich möchte mich entziehen",
          fr: "Souvent — les étreintes prolongées me crispent et me donnent envie de m'écarter",
          es: "A menudo — los abrazos largos me tensan físicamente y deseo apartarme",
        },
      },
      {
        score: 3,
        label: {
          en: "Extreme touch aversion — casual affectionate contact feels suffocating, invasive, or repulsive",
          id: "Penolakan sentuhan ekstrem — sentuhan mesra kasual terasa menyesakkan, mengancam, atau membuat risih",
          de: "Strikte Berührungsabwehr — alltägliche Zärtlichkeit fühlt sich erdrückend oder übergriffig an",
          fr: "Aversion tactile marquée — les gestes affectifs me semblent étouffants et intrusifs",
          es: "Aversión táctil severa — cualquier muestra de cariño me parece invasiva o asfixiante",
        },
      },
    ],
  },
  {
    id: 3,
    subscale: "affection_withholding",
    prompt: {
      en: "I keep my deepest emotional world, dreams, and worries strictly private, sharing only practical logistical facts with my partner.",
      id: "Aku mengunci rapat dunia emosi, impian, dan kecemasan terdalamku, hanya membagikan fakta praktis dan urusan rumah tangga.",
      de: "Mein Seelenleben und meine Ängste halte ich geheim; mit meinem Partner teile ich fast nur Organisatorisches.",
      fr: "Je garde mon univers secret et mes peurs sous clé, ne partageant avec mon partenaire que la logistique du quotidien.",
      es: "Mantengo mi mundo emocional y mis miedos bajo llave, compartiendo con mi pareja solo asuntos prácticos o de rutina.",
    },
    options: [
      {
        score: 0,
        label: {
          en: "Disagree — my partner is my intimate emotional sanctuary and primary confidant",
          id: "Tidak setuju — pasanganku adalah tempat suci curahan hati dan sahabat terdekatku",
          de: "Trifft nicht zu — mein Partner ist mein engster Seelenverwandter und Vertrauter",
          fr: "Pas d'accord — mon partenaire est mon refuge émotionnel et mon confident premier",
          es: "En desacuerdo — mi pareja es mi mayor refugio afectivo y mi confidente",
        },
      },
      {
        score: 1,
        label: {
          en: "I share most things, keeping only minor work annoyances to myself",
          id: "Aku membagikan sebagian besar hal, hanya menyimpan sendiri kekesalan kecil di kantor",
          de: "Ich teile fast alles, bis auf belanglose Bürosorgen",
          fr: "Je partage l'essentiel, gardant juste les contrariétés anodines pour moi",
          es: "Comparto casi todo, salvo pequeñas frustraciones del trabajo",
        },
      },
      {
        score: 2,
        label: {
          en: "Frequently — conversations rarely venture beyond bills, groceries, kids, and schedules",
          id: "Sering — obrolan kami jarang melampaui urusan tagihan, belanjaan, anak, dan jadwal harian",
          de: "Häufig — wir reden fast nur über Rechnungen, Termine, Haushalt und Kinder",
          fr: "Souvent — nos échanges se cantonnent aux factures, aux courses et aux plannings",
          es: "A menudo — nuestras charlas rara vez van más allá de facturas, horarios y compras",
        },
      },
      {
        score: 3,
        label: {
          en: "Total emotional quarantine — we are roommates executing domestic logistics with zero intimate soul connection",
          id: "Karantina emosi total — kami seperti teman sekamar yang mengurus rumah tangga tanpa ikatan jiwa",
          de: "Völlige emotionale Quarantäne — wir leben wie geschäftsmäßige Mitbewohner ohne Seelenbindung",
          fr: "Quarantaine affective totale — nous sommes devenus de simples colocataires sans aucune intimité de cœur",
          es: "Cuarentena afectiva absoluta — funcionamos como compañeros de piso gestionando la casa sin alma",
        },
      },
    ],
  },
  {
    id: 4,
    subscale: "affection_withholding",
    prompt: {
      en: "I am friendly, charismatic, and deeply attentive to strangers, clients, or colleagues, but turn cold and uncommunicative once through my front door.",
      id: "Aku sangat ramah, karismatik, dan penuh perhatian pada orang asing, klien, atau teman kerja, tetapi menjadi dingin dan tertutup begitu masuk pintu rumah.",
      de: "Draußen bei Kollegen oder Kunden bin ich charmant und aufmerksam, doch daheim ziehe ich mich wortkarg zurück.",
      fr: "Je suis chaleureux et attentif envers mes collègues ou des inconnus, mais deviens distant et muet une fois chez moi.",
      es: "Soy encantador y atento con clientes, amigos o extraños, pero me vuelvo frío y monosilábico al cruzar el umbral de casa.",
    },
    options: [
      {
        score: 0,
        label: {
          en: "Disagree — my partner and family receive my warmest, most tender energy",
          id: "Tidak setuju — pasangan dan keluargaku mendapatkan energiku yang paling hangat dan lembut",
          de: "Trifft nicht zu — meine Familie bekommt meine wärmste und liebevollste Energie",
          fr: "Pas d'accord — mon foyer reçoit mon énergie la plus douce et la plus aimante",
          es: "En desacuerdo — mi pareja y mi familia reciben mi versión más cálida y cariñosa",
        },
      },
      {
        score: 1,
        label: {
          en: "Occasionally when work takes 100% of my social battery",
          id: "Sesekali hanya saat pekerjaan menguras 100% baterai sosialku",
          de: "Manchmal, wenn die Arbeit die soziale Batterie leergesaugt hat",
          fr: "Parfois après de rudes journées où ma batterie sociale est à plat",
          es: "A veces si el trabajo ha consumido toda mi batería social",
        },
      },
      {
        score: 2,
        label: {
          en: "Frequently — my partner feels baffled by how charismatic I am to outsiders versus how closed I am at home",
          id: "Sering — pasanganku bingung melihat betapa karismatiknya diriku di luar versus betapa tertutupnya aku di rumah",
          de: "Häufig — mein Partner wundert sich, wie herzlich ich nach außen bin und wie verschlossen daheim",
          fr: "Souvent — mon partenaire s'étonne de mon charme extérieur contrastant avec ma froideur au foyer",
          es: "A menudo — mi pareja se extraña de lo simpático que soy fuera y lo hermético que estoy en casa",
        },
      },
      {
        score: 3,
        label: {
          en: "Severe contrast — public darling, private ghost; all my emotional warmth is spent outside the relationship",
          id: "Kontras parah — idola di mata publik, hantu tak berperasaan di rumah; kehangatanku habis di luar hubungan",
          de: "Drastischer Kontrast — Liebling der Gesellschaft, Geist im Wohnzimmer; daheim herrscht arktische Kälte",
          fr: "Contraste absolu — charmeur en public, fantôme inaccessible chez moi ; rien ne subsiste pour le couple",
          es: "Contraste radical — estrella social y fantasma doméstico; mi calidez se agota siempre fuera",
        },
      },
    ],
  },

  // Subscale 2: Busywork Evasion & Distraction Barriers
  {
    id: 5,
    subscale: "busywork_evasion",
    prompt: {
      en: "I keep myself relentlessly busy with work, yard chores, gym sessions, or hobbies specifically to avoid having unstructured time alone with my partner.",
      id: "Aku menyibukkan diri tanpa henti dengan lembur, bersih-bersih rumah, gym, atau hobi khusus demi menghindari waktu berdua yang santai dengan pasangan.",
      de: "Ich halte mich mit Arbeit, Heimwerken oder Sport pausenlos auf Trab, um Zweisamkeit ohne Ablenkung zu meiden.",
      fr: "Je me surcharge de travail, de bricolage ou de sport précisément pour esquiver les moments d'intimité à deux sans écran.",
      es: "Me mantengo ocupadísimo con horas extra, tareas o gimnasio solo para evitar quedarme a solas y sin distracciones con mi pareja.",
    },
    options: [
      {
        score: 0,
        label: {
          en: "Disagree — I prioritize unhurried, screen-free quality time together every week",
          id: "Tidak setuju — aku memprioritaskan waktu berkualitas berdua tanpa layar gawai setiap minggu",
          de: "Trifft nicht zu — ungestörte Zweisamkeit hat bei mir jede Woche hohe Priorität",
          fr: "Pas d'accord — les moments privilégiés à deux sans téléphone sont ma priorité hebdomadaire",
          es: "En desacuerdo — priorizo momentos a solas sin pantallas con mi pareja cada semana",
        },
      },
      {
        score: 1,
        label: {
          en: "Occasionally when house maintenance piles up on weekends",
          id: "Sesekali hanya saat urusan renovasi rumah menumpuk di akhir pekan",
          de: "Gelegentlich bei aufgeschobenen Garten- oder Reparaturarbeiten",
          fr: "Parfois lors de gros week-ends de rangement",
          es: "Ocasionalmente cuando se acumulan arreglos en la casa",
        },
      },
      {
        score: 2,
        label: {
          en: "Frequently — the thought of sitting on the sofa looking into each other's eyes fills me with an itch to get up and do something",
          id: "Sering — membayangkan duduk di sofa saling menatap mata membuatku gelisah dan ingin bangkit mengerjakan sesuatu",
          de: "Häufig — still auf dem Sofa zu sitzen und einander nah zu sein, macht mich nervös; ich muss sofort aufspringen",
          fr: "Souvent — me poser sur le canapé les yeux dans les yeux m'angoisse ; j'ai besoin de m'activer",
          es: "A menudo — sentarme en el sofá a mirarnos a los ojos me inquieta y busco cualquier quehacer",
        },
      },
      {
        score: 3,
        label: {
          en: "Deliberate fortress of busyness — I construct a 16-hour daily schedule of tasks so we never have to face each other emotionally",
          id: "Benteng kesibukan sengaja — aku menyusun jadwal padat 16 jam sehari agar kami tidak pernah perlu bertatap rasa",
          de: "Bewusste Flucht in Daueraktivität — mein Kalender ist so voll, dass emotionale Begegnung unmöglich wird",
          fr: "Forteresse d'activisme délibéré — mon emploi du temps saturé empêche toute rencontre d'âme à âme",
          es: "Evasión planificada por sobrecarga — saturo mi agenda 16 horas para que no quede espacio al encuentro afectivo",
        },
      },
    ],
  },
  {
    id: 6,
    subscale: "busywork_evasion",
    prompt: {
      en: "Whenever my partner sits down next to me on the couch or in bed, my instinctive reflex is to pull out my smartphone or laptop.",
      id: "Setiap kali pasanganku duduk di sampingku di sofa atau ranjang, refleks spontanku adalah langsung mengeluarkan smartphone atau laptop.",
      de: "Sobald mein Partner sich zu mir aufs Sofa oder ins Bett setzt, greife ich reflexartig zum Handy oder Laptop.",
      fr: "Dès que mon partenaire s'assoit près de moi sur le canapé ou au lit, mon réflexe automatique est de sortir mon téléphone.",
      es: "En cuanto mi pareja se sienta a mi lado en el sofá o se mete en la cama, mi acto reflejo es mirar el móvil o el portátil.",
    },
    options: [
      {
        score: 0,
        label: {
          en: "Rarely — I put screens away and turn my body toward them with welcoming warmth",
          id: "Jarang — aku menjauhkan layar HP dan menghadapkan tubuhku menyambut mereka dengan hangat",
          de: "Selten — ich lege Bildschirme weg und wende mich meinem Partner liebevoll zu",
          fr: "Rarement — je pose mes écrans et me tourne vers lui avec attention",
          es: "Casi nunca — aparto las pantallas y me oriento hacia mi pareja con calidez",
        },
      },
      {
        score: 1,
        label: {
          en: "Sometimes if I am waiting for an urgent reply",
          id: "Kadang-kadang jika sedang menunggu balasan chat mendesak",
          de: "Manchmal, wenn ich auf wichtige Nachrichten warte",
          fr: "Parfois lorsque j'attends un message professionnel urgent",
          es: "A veces si estoy esperando un mensaje urgente",
        },
      },
      {
        score: 2,
        label: {
          en: "Frequently — the screen serves as an invisible electronic wall protecting me from intimacy",
          id: "Sering — layar ponsel berfungsi sebagai tembok elektronik pelindung dari keintiman mendalam",
          de: "Häufig — das Smartphone dient mir als Schutzmauer gegen zu viel Nähe",
          fr: "Souvent — l'écran est un bouclier électronique qui me protège de la vulnérabilité",
          es: "A menudo — la pantalla actúa como un muro electrónico que me resguarda del compromiso",
        },
      },
      {
        score: 3,
        label: {
          en: "Compulsive phubbing — I will scroll mindless feeds for hours just to avoid looking into my partner's eyes",
          id: "Phubbing kompulsif — aku scrolling hal tak penting berjam-jam hanya demi tidak menatap mata pasanganku",
          de: "Dauerhaftes Phubbing — ich scrolle stundenlang sinnlosen Feed, nur um Blicke zu vermeiden",
          fr: "Phubbing compulsif — je scrolle des heures dans le vide juste pour ne pas croiser son regard",
          es: "Phubbing crónico — paso horas en feeds insulsos solo para esquivar la mirada de mi pareja",
        },
      },
    ],
  },
  {
    id: 7,
    subscale: "busywork_evasion",
    prompt: {
      en: "I delay coming home from work, running unnecessary errands or sitting in the car in the driveway just to postpone connection.",
      id: "Aku sengaja menunda pulang kerja, mencari-cari urusan tambahan, atau berdiam lama di dalam mobil hanya demi menunda bertemu pasangan.",
      de: "Ich zögere das Nachhausekommen hinaus, erledige unnötige Besorgungen oder bleibe im geparkten Auto sitzen.",
      fr: "Je tarde à rentrer du travail, inventant des courses inutiles ou restant assis dans ma voiture pour repousser le moment des retrouvailles.",
      es: "Retraso la vuelta a casa tras el trabajo, invento recados o me quedo en el coche aparcado solo para demorar el reencuentro.",
    },
    options: [
      {
        score: 0,
        label: {
          en: "Disagree — coming home to my partner is the comforting highlight of my day",
          id: "Tidak setuju — pulang ke rumah menemui pasangan adalah momen membahagiakan hariku",
          de: "Trifft nicht zu — die Heimkehr zu meinem Partner ist der schönste Moment des Tages",
          fr: "Pas d'accord — retrouver mon partenaire chez moi est le réconfort de ma journée",
          es: "En desacuerdo — volver a casa con mi pareja es el mejor momento de mi jornada",
        },
      },
      {
        score: 1,
        label: {
          en: "Occasionally needing 5 minutes of silence in the car after severe work stress",
          id: "Sesekali hanya butuh 5 menit menenangkan diri di mobil setelah stres kerja",
          de: "Manchmal brauche ich 5 Minuten Stille im Auto zum Durchatmen",
          fr: "Parfois 5 minutes de sas de décompression dans la voiture après une grosse journée",
          es: "A veces 5 minutos de silencio en el coche para desconectar de la oficina",
        },
      },
      {
        score: 2,
        label: {
          en: "Frequently — I dread walking through the door and facing the emotional expectations waiting for me",
          id: "Sering — aku merasa cemas melangkahi pintu rumah dan menghadapi ekspektasi emosional yang menanti",
          de: "Häufig — mir graut vor dem Schritt über die Schwelle und den emotionalen Erwartungen drinnen",
          fr: "Souvent — j'appréhende de franchir le seuil et d'affronter les attentes affectives qui m'attendent",
          es: "A menudo — me pesa cruzar la puerta y enfrentarme a las expectativas emocionales de mi hogar",
        },
      },
      {
        score: 3,
        label: {
          en: "Chronic evasion — I engineer my entire life so that I arrive home right as my partner falls asleep",
          id: "Penghindaran kronis — aku mengatur jadwal agar tiba di rumah tepat saat pasanganku sudah tidur terlelap",
          de: "Systematische Vermeidung — ich plane mein Leben so, dass der Partner bereits schläft, wenn ich komme",
          fr: "Évitement délibéré — j'organise mes soirées pour ne rentrer que lorsque mon partenaire dort déjà",
          es: "Evasión sistemática — cuadro mis horarios para llegar justo cuando mi pareja ya está profundamente dormida",
        },
      },
    ],
  },
  {
    id: 8,
    subscale: "busywork_evasion",
    prompt: {
      en: "I use our children, pets, or extended family as emotional buffers to avoid ever having deep adult intimacy with my partner.",
      id: "Aku menggunakan anak-anak, hewan peliharaan, atau keluarga besar sebagai 'tameng' agar tidak pernah berduaan secara intim dengan pasangan.",
      de: "Ich nutze Kinder, Haustiere oder Verwandte als Puffer, um intimer Zweisamkeit als Paar aus dem Weg zu gehen.",
      fr: "J'utilise les enfants, les animaux ou la belle-famille comme boucliers pour éviter d'être seul avec mon partenaire.",
      es: "Uso a los niños, mascotas o familiares como escudo protector para evitar la intimidad adulta de pareja.",
    },
    options: [
      {
        score: 0,
        label: {
          en: "Disagree — we fiercely protect our private couple intimacy separately from parenting",
          id: "Tidak setuju — kami menjaga ketat keintiman berdua terpisah dari urusan pengasuhan anak",
          de: "Trifft nicht zu — wir schützen unsere Paarzeit bewusst vor Elternpflichten",
          fr: "Pas d'accord — nous sanctuarisons notre intimité amoureuse en dehors du rôle parental",
          es: "En desacuerdo — blindamos nuestro espacio de pareja al margen de la crianza",
        },
      },
      {
        score: 1,
        label: {
          en: "Toddlers naturally demand attention during early childhood years",
          id: "Hanya karena masa balita memang menuntut banyak perhatian alami",
          de: "Bei Kleinkindern ist Zweisamkeit phasenweise schwer",
          fr: "Les jeunes enfants accaparent naturellement beaucoup au début",
          es: "Es natural que niños muy pequeños demanden tiempo en ciertas fases",
        },
      },
      {
        score: 2,
        label: {
          en: "Frequently — I feel immense relief when kids sleep between us or when guests are staying over",
          id: "Sering — aku merasa sangat lega saat anak tidur di antara kami atau saat ada tamu menginap",
          de: "Häufig — ich bin erleichtert, wenn Kinder zwischen uns schlafen oder Gäste da sind",
          fr: "Souvent — je suis soulagé quand les enfants dorment entre nous ou que des invités restent",
          es: "A menudo — siento alivio cuando los niños duermen en medio o hay visitas en casa",
        },
      },
      {
        score: 3,
        label: {
          en: "Engineered triangulation — I will deliberately invite relatives or adopt extra duties to eliminate romantic privacy",
          id: "Triangulasi disengaja — aku sengaja mengundang kerabat atau menambah kesibukan demi melenyapkan privasi romantis",
          de: "Gezielte Triangulierung — ich lade bewusst Besuch ein, um erotische und emotionale Nähe abzuwehren",
          fr: "Triangulation calculée — j'invite exprès des tiers pour supprimer tout tête-à-tête romantique",
          es: "Triangulación deliberada — invito a terceros para anular cualquier intimidad afectiva o romántica",
        },
      },
    ],
  },

  // Subscale 3: Silent Blame Armor & Fault-Finding
  {
    id: 9,
    subscale: "silent_blame_armor",
    prompt: {
      en: "I mentally hyper-fixate on my partner's tiny flaws (how they laugh, chew, spend money, or dress) as justification for staying distant.",
      id: "Pikiranku membesar-besarkan kekurangan kecil pasangan (cara tertawa, mengunyah, belanja, atau berpakaian) sebagai pembenaran untuk menjaga jarak.",
      de: "Ich fixiere mich im Kopf auf winzige Macken meines Partners (wie er lacht, kaut oder sich kleidet), um Distanz zu rechtfertigen.",
      fr: "Je fais une fixation mentale sur d'infimes défauts de mon partenaire (sa façon de rire, mâcher ou s'habiller) pour légitimer mon éloignement.",
      es: "Me obsesiono con detalles insignificantes de mi pareja (cómo mastica, ríe o gasta) como excusa interna para no acercarme.",
    },
    options: [
      {
        score: 0,
        label: {
          en: "Rarely — I view my partner with fond compassion, acceptance, and humorous grace",
          id: "Jarang — aku memandang pasangan dengan welas asih, penerimaan tulus, dan kelonggaran hati",
          de: "Selten — ich blicke mit liebevoller Nachsicht und Humor auf Eigenheiten",
          fr: "Rarement — je regarde mon partenaire avec tendresse, bienveillance et humour",
          es: "Casi nunca — miro a mi pareja con ternura, aceptación y sentido del humor",
        },
      },
      {
        score: 1,
        label: {
          en: "Mild fleeting annoyance during high-stress weeks",
          id: "Hanya kekesalan kecil sekilas saat minggu-minggu penuh tekanan kerja",
          de: "Kurze leichte Irritation an stressigen Tagen",
          fr: "Un agacement passager lors de périodes tendues",
          es: "Fugaz irritación en semanas de gran tensión",
        },
      },
      {
        score: 2,
        label: {
          en: "Frequently — I compile a silent mental laundry list of their imperfections to prove to myself they 'aren't right for me'",
          id: "Sering — aku mengumpulkan daftar cacat kekurangan mereka di kepala untuk meyakinkan diriku bahwa mereka 'tidak cocok untukku'",
          de: "Häufig — ich sammle im Stillen Mängellisten, um mir einzureden, dass der Partner 'nicht passt'",
          fr: "Souvent — je dresse mentalement la liste de ses défauts pour me convaincre qu'il ne me convient pas",
          es: "A menudo — elaboro una lista mental de sus defectos para convencerme de que 'no es para mí'",
        },
      },
      {
        score: 3,
        label: {
          en: "Weaponized flaw-magnification — microscopic quirks become repulsive deal-breakers that keep my heart permanently armored",
          id: "Membesar-besarkan cacat secara ekstrem — kebiasaan sepele menjadi alasan jijik yang menjaga hatiku tetap berbaju zirah",
          de: "Radikale Fehlersuche — kleinste Eigenheiten werden zu Ekelgründen stilisiert, um mein Herz hermetisch zu panzern",
          fr: "Loupe à défauts systématique — le moindre détail devient rédhibitoire pour verrouiller mon cœur",
          es: "Magnificación destructiva de defectos — cualquier detalle nimio se convierte en pretexto para sellar mi corazón",
        },
      },
    ],
  },
  {
    id: 10,
    subscale: "silent_blame_armor",
    prompt: {
      en: "Whenever my partner expresses loneliness or asks for more connection, I flip the script and accuse them of being 'too needy' or 'demanding'.",
      id: "Setiap kali pasanganku merasa kesepian atau meminta lebih banyak kedekatan, aku membalikkan keadaan dan menuduh mereka 'terlalu posesif' atau 'menuntut'.",
      de: "Wenn mein Partner Einsamkeit äußert oder Nähe sucht, werfe ich ihm vor, 'anhänglich' oder 'erdrückend' zu sein.",
      fr: "Quand mon partenaire exprime sa solitude ou réclame du lien, je retourne la situation en le traitant d''étouffant' ou d''insatiable'.",
      es: "Cuando mi pareja expresa soledad o pide conexión, le doy la vuelta a la conversación acusándola de ser 'demasiado exigente' o 'asfixiante'.",
    },
    options: [
      {
        score: 0,
        label: {
          en: "Disagree — I hear their vulnerability with empathy and seek ways to meet their needs",
          id: "Tidak setuju — aku mendengarkan kerentanan mereka dengan empati dan mencari cara memenuhinya",
          de: "Trifft nicht zu — ich nehme ihren Wunsch ernst und suche liebevoll nach Nähe",
          fr: "Pas d'accord — j'accueille sa peine avec compassion et cherche à la combler",
          es: "En desacuerdo — acojo su necesidad con empatía e intento acercarme",
        },
      },
      {
        score: 1,
        label: {
          en: "Sometimes defensive if they bring it up late at night during an argument",
          id: "Kadang agak defensif hanya jika mereka mengangkatnya larut malam saat bertengkar",
          de: "Manchmal etwas defensiv, wenn es nachts im Streit geschieht",
          fr: "Parfois sur la défensive si c'est reproché au milieu d'une dispute tardive",
          es: "A veces a la defensiva si se plantea a deshoras en medio de una discusión",
        },
      },
      {
        score: 2,
        label: {
          en: "Frequently — I pathologize their normal emotional desires to evade feeling guilty about my emotional absence",
          id: "Sering — aku mencap keinginan emosi wajar mereka sebagai 'masalah mental' demi menghindari rasa bersalah atas ketidakhadiranku",
          de: "Häufig — ich stufe normale Wünsche als übertrieben ein, um eigene Schuldgefühle abzuwehren",
          fr: "Souvent — je qualifie ses attentes légitimes de dépendance affective pour ne pas me sentir coupable de mon retrait",
          es: "A menudo — tildo sus deseos legítimos de 'dependencia' para eludir mi propia culpa por no estar presente",
        },
      },
      {
        score: 3,
        label: {
          en: "Gaslighting reversal — I systematically convince my partner that they are crazy and broken for wanting intimacy",
          id: "Pembalikan manipulatif (gaslighting) — aku meyakinkan pasanganku bahwa mereka gila atau aneh hanya karena menginginkan keintiman",
          de: "Gaslighting-Abwehr — ich rede dem Partner ein, er sei neurotisch, nur weil er Zuneigung erbittet",
          fr: "Inversion perverse — je finis par convaincre l'autre qu'il est anormal ou dysfonctionnel d'espérer de la tendresse",
          es: "Gaslighting defensivo — convenzo a mi pareja de que es una histérica o está rota solo por desear cercanía",
        },
      },
    ],
  },
  {
    id: 11,
    subscale: "silent_blame_armor",
    prompt: {
      en: "I secretly fear that if my partner truly saw the unmasked, imperfect, vulnerable me, they would lose respect or abandon me.",
      id: "Diam-diam aku takut jika pasanganku melihat diriku yang rapuh, tanpa topeng, dan tidak sempurna, mereka akan kehilangan respek atau meninggalkanku.",
      de: "Ich fürchte insgeheim: Wenn mein Partner mein ungeschminktes, unvollkommenes Ich sähe, würde er mich verachten oder verlassen.",
      fr: "J'ai la terreur secrète que si mon partenaire découvrait mes failles et ma vraie vulnérabilité, il me mépriserait ou m'abandonnerait.",
      es: "En el fondo temo que si mi pareja conociera mi faceta imperfecta, frágil y sin filtros, me perdería el respeto o me dejaría.",
    },
    options: [
      {
        score: 0,
        label: {
          en: "Disagree — I feel safe and deeply cherished in my unvarnished authenticity",
          id: "Tidak setuju — aku merasa sangat aman dan dicintai dalam keaslian diriku apa adanya",
          de: "Trifft nicht zu — ich fühle mich in meiner unvollkommenen Echtheit geborgen und geliebt",
          fr: "Pas d'accord — je me sens aimé et en sécurité dans ma vérité sans fard",
          es: "En desacuerdo — me siento plenamente aceptado y querido en mi autenticidad",
        },
      },
      {
        score: 1,
        label: {
          en: "Mild occasional insecurity regarding aging or professional stumbles",
          id: "Hanya sesekali merasa minder mengenai penuaan atau kegagalan karir",
          de: "Leichte Unsicherheit bei beruflichen Rückschlägen",
          fr: "Une petite insécurité passagère liée au vieillissement ou aux échecs professionnels",
          es: "Leve inseguridad ocasional sobre el paso del tiempo o reveses laborales",
        },
      },
      {
        score: 2,
        label: {
          en: "Frequently — my emotional withholding is an armored fortress protecting a deeply terrified, shame-filled inner child",
          id: "Sering — sikap dinginku adalah baju zirah yang melindungi anak kecil di dalam diriku yang sangat ketakutan dan diliputi malu",
          de: "Häufig — meine Kühle ist die eiserne Rüstung über einem verängstigten, beschämten inneren Kind",
          fr: "Souvent — ma distance est une cuirasse forgée pour abriter un enfant intérieur terrifié et honteux",
          es: "A menudo — mi frialdad es una armadura que tapa a un niño interior aterrorizado y herido",
        },
      },
      {
        score: 3,
        label: {
          en: "Core survival terror — absolute exposure equals relational annihilation; I must keep the curtain drawn at all costs",
          id: "Ketakutan mutlak bertahan hidup — membuka diri berarti kehancuran relasi total; gorden harus ditutup rapat apa pun taruhannya",
          de: "Existentielle Urpanik — mich nackt zu zeigen bedeutet Vernichtung; der Vorhang muss eisern geschlossen bleiben",
          fr: "Terreur existentielle — me dévoiler équivaudrait à mourir ; le rideau doit rester fermé à n'importe quel prix",
          es: "Pánico nuclear — mostrarme vulnerable equivale a ser aniquilado; el telón debe permanecer bajado a toda costa",
        },
      },
    ],
  },
  {
    id: 12,
    subscale: "silent_blame_armor",
    prompt: {
      en: "In my childhood home, intimacy or affection was either non-existent, used as a weapon of control, or suffocating and intrusive.",
      id: "Di rumah masa kecilku, kasih sayang entah sama sekali tidak ada, digunakan sebagai senjata kendali, atau justru mencekik dan melanggar batas privasi.",
      de: "In meiner Kindheit war Zärtlichkeit entweder abwesend, wurde als Erpressungsmittel genutzt oder war übergriffig und erdrückend.",
      fr: "Dans mon enfance, l'affection était inexistante, instrumentalisée pour manipuler, ou étouffante et intrusive.",
      es: "En mi hogar de infancia el cariño brillaba por su ausencia, se usaba como chantaje o era invasivo y asfixiante.",
    },
    options: [
      {
        score: 0,
        label: {
          en: "Disagree — affection in my family was consistent, respectful, warm, and unconditional",
          id: "Tidak setuju — kasih sayang di keluargaku konsisten, menghormati batas, hangat, dan tanpa syarat",
          de: "Trifft nicht zu — Zuwendung war bei uns warm, respektvoll und verlässlich",
          fr: "Pas d'accord — la tendresse était saine, respectueuse des limites et inconditionnelle",
          es: "En desacuerdo — el afecto en mi familia era cálido, respetuoso y desinteresado",
        },
      },
      {
        score: 1,
        label: {
          en: "Typical imperfect family dynamic, but generally safe",
          id: "Dinamika keluarga yang tidak sempurna seperti biasa, tapi secara umum aman",
          de: "Gewöhnliche Familienmacken, aber im Kern liebevoll",
          fr: "Une famille imparfaite ordinaire, mais fondamentalement sécurisante",
          es: "Dinámica familiar con sus roces típicos, pero en el fondo segura",
        },
      },
      {
        score: 2,
        label: {
          en: "Strong resonance — I learned early that letting someone close means either being manipulated or losing your identity",
          id: "Sangat relevan — aku belajar sejak dini bahwa membiarkan orang mendekat berarti dimanfaatkan atau kehilangan identitas diri",
          de: "Starke Resonanz — Nähe bedeutete damals entweder Bevormundung oder Selbstverlust",
          fr: "Forte résonance — j'ai appris tôt que la proximité rimait avec manipulation ou perte de soi",
          es: "Fuerte resonancia — aprendí que acercarse implicaba manipulación o perder la propia identidad",
        },
      },
      {
        score: 3,
        label: {
          en: "Exact origin of my anorexia — intimacy was dangerous and poisonous; starving the relationship is my only path to autonomy",
          id: "Akar tepat dari penolakan keintimanku — keintiman itu berbahaya dan beracun; melaparkan hubungan adalah satu-satunya jalanku menjaga kemerdekaan diri",
          de: "Wurzel meiner Intimitäts-Anorexie — Nähe war toxisch; Verweigerung ist mein einziges Überlebenswerkzeug",
          fr: "Origine exacte de mon anorexie relationnelle — l'intimité était toxique ; la famine affective est mon seul garant de liberté",
          es: "Raíz exacta de mi anorexia afectiva — el vínculo íntimo era destructivo; racionar el cariño es mi único modo de ser libre",
        },
      },
    ],
  },
];

export const INTIMACY_AVOIDANCE_ARCHETYPES: Record<
  IntimacyAvoidanceArchetype["level"],
  IntimacyAvoidanceArchetype
> = {
  intimately_receptive_partner: {
    level: "intimately_receptive_partner",
    badge: {
      en: "Intimately Receptive & Open",
      id: "Terbuka & Hangat Berkeintiman",
      de: "Emotional empfangsbereit & nahbar",
      fr: "Réceptif & Ouvert à l'Intimité",
      es: "Íntimamente Receptivo y Abierto",
    },
    title: {
      en: "The Attuned Companion",
      id: "Sang Pasangan Selaras",
      de: "Der verbundene Gefährte",
      fr: "Le Compagnon Connecté",
      es: "El Compañero en Sintonía",
    },
    tagline: {
      en: "You offer warmth freely and allow your partner into your heart without defensive panic.",
      id: "Kamu memberi kehangatan dengan bebas dan mengizinkan pasangan masuk ke hatimu tanpa panik defensif.",
      de: "Sie schenken Zärtlichkeit frei und lassen Ihren Partner ohne Schutzpanik ins Herz.",
      fr: "Vous offrez votre tendresse avec générosité et laissez l'autre approcher sans panique.",
      es: "Brindas afecto con soltura y abres tu corazón a tu pareja sin corazas defensivas.",
    },
    description: {
      en: "Your score reflects healthy intimacy bandwidth. You do not treat love like a scarce currency to be hoarded or withheld. You express compliments, initiate affectionate touch, and share your internal world without feeling that closeness threatens your sovereignty.",
      id: "Skormu mencerminkan kapasitas keintiman yang sehat. Kamu tidak memperlakukan cinta seperti mata uang langka yang harus ditimbun atau ditahan. Kamu memuji, memulai sentuhan kasih sayang, dan membagikan batinmu tanpa merasa bahwa kedekatan mengancam kebebasanmu.",
      de: "Ihr Ergebnis zeigt gesunde emotionale Offenheit. Sie horten Liebe nicht wie eine Mangelware. Sie loben, berühren zärtlich und teilen Ihre Gefühle ohne Furcht vor Kontrollverlust.",
      fr: "Votre score témoigne d'une grande fluidité intime. Vous ne rationnez pas l'amour. Vous complimentez, enlacez et dévoilez votre intériorité sans craindre d'y perdre votre identité.",
      es: "Tu resultado muestra una capacidad de intimidad saludable. No racionas el afecto ni lo usas como moneda de cambio. Elogias, abrazas y compartes tu mundo interno con libertad.",
    },
    psychologyInsight: {
      en: "In Imago Relationship Therapy, Dr. Harville Hendrix emphasizes that mutual vulnerability is the bridge from defensive survival to conscious, healing partnership. When intimacy is safe, the nervous system thrives in parasympathetic serenity.",
      id: "Dalam Imago Relationship Therapy, Dr. Harville Hendrix menekankan bahwa kerentanan timbal balik adalah jembatan dari bertahan hidup defensif menuju kemitraan yang menyembuhkan. Saat keintiman terasa aman, sistem saraf hidup dalam ketenangan parasimpatis.",
      de: "In der Imago-Therapie betont Harville Hendrix: Gegenseitige Verletzlichkeit verwandelt Überlebenskampf in heilsame Liebe. Sichere Nähe schenkt tiefe parasympathische Ruhe.",
      fr: "Dans la thérapie Imago d'Harville Hendrix, la vulnérabilité réciproque est le pont entre la survie défensive et l'amour conscient qui guérit en profondeur.",
      es: "En la Terapia Imago de Harville Hendrix, la vulnerabilidad mutua es el puente que transforma el miedo en un vínculo consciente y sanador.",
    },
    actionProtocols: {
      en: [
        "Continue your daily rituals of non-sexual affection: 20-second hugs and gazing warmly upon waking.",
        "Practice 'Appreciations Check-In': Share three specific things you admired about your partner each evening.",
        "Maintain individual hobbies so your autonomy remains vibrant while intimacy flourishes.",
      ],
      id: [
        "Lanjutkan ritual kasih sayang non-seksual: pelukan 20 detik dan tatapan hangat saat bangun pagi.",
        "Praktikkan 'Audit Apresiasi': Bagikan 3 hal spesifik yang kamu kagumi dari pasanganmu setiap malam.",
        "Pertahankan hobi pribadimu agar otonomi tetap menyala di samping keintiman yang mekar.",
      ],
      de: [
        "Rituale zärtlicher Nähe pflegen: 20-Sekunden-Umarmungen und ein warmer Blick am Morgen.",
        "Abendlicher Dank: Jeden Tag drei Dinge aussprechen, die man am Partner schätzt.",
        "Eigene Hobbys pflegen, damit die Eigenständigkeit neben der Liebe leuchtet.",
      ],
      fr: [
        "Entretenir les rituels tendres : étreinte de 20 secondes et regards complices au réveil.",
        "Partage de gratitude : Nommer chaque soir trois détails que vous admirez chez votre partenaire.",
        "Préserver vos passions individuelles pour que l'autonomie nourrisse le couple.",
      ],
      es: [
        "Mantener rituales afectivos: abrazos de 20 segundos y miradas cómplices al despertar.",
        "Agradecimiento diario: Expresa cada noche tres detalles que valoras de tu pareja.",
        "Cuidar tus aficiones propias para que la autonomía enriquezca el vínculo íntimo.",
      ],
    },
    dailyAffirmation: {
      en: "My heart is safe to stay open. In true closeness, I become more of myself, not less.",
      id: "Aman bagi hatiku untuk tetap terbuka. Dalam kedekatan sejati, aku menjadi diriku seutuhnya, bukan berkurang.",
      de: "Mein Herz darf offen bleiben. In wahrer Nähe verliere ich mich nicht, sondern wachse.",
      fr: "Mon cœur peut rester ouvert. Dans l'intimité véritable, je m'épanouis sans me perdre.",
      es: "Mi corazón puede permanecer abierto. En la cercanía auténtica no me pierdo, me encuentro.",
    },
  },

  cautiously_sheltered_companion: {
    level: "cautiously_sheltered_companion",
    badge: {
      en: "Cautiously Sheltered Companion",
      id: "Pasangan Berhati-hati",
      de: "Vorsichtig abgeschirmter Partner",
      fr: "Compagnon Prudent & Protégé",
      es: "Compañero Cauteloso",
    },
    title: {
      en: "The Guarded Ally",
      id: "Sang Sekutu Berjaga",
      de: "Der vorsichtige Verbündete",
      fr: "L'Allié sur ses Gardes",
      es: "El Aliado Reservado",
    },
    tagline: {
      en: "You love your partner, but keep personal escape hatches and screen distractions handy.",
      id: "Kamu mencintai pasanganmu, tetapi selalu menyiapkan pintu darurat dan pengalih layar.",
      de: "Sie lieben Ihren Partner, halten aber gern kleine Fluchtwege und Bildschirme bereit.",
      fr: "Vous aimez votre partenaire, mais gardez des échappatoires et votre téléphone à portée.",
      es: "Amas a tu pareja, pero conservas salidas de escape y pantallas como amortiguador.",
    },
    description: {
      en: "Your score reflects mild intimacy avoidance. While you are loyal and supportive in crises, day-to-day unstructured emotional intimacy triggers slight claustrophobia. You sometimes retreat behind your smartphone, stay late at the office, or withhold compliments when feeling pressured.",
      id: "Skormu mencerminkan penghindaran keintiman tingkat ringan. Meskipun kamu setia dan suportif saat krisis, keintiman emosional sehari-hari memicu sedikit rasa klaustrofobia. Kamu kadang berlindung di balik smartphone, lembur di kantor, atau menahan pujian saat merasa ditekan.",
      de: "Ihr Ergebnis weist auf milde Intimitätsabwehr hin. In Notzeiten sind Sie loyal, doch lockere alltägliche Nähe löst leise Beklemmung aus. Sie flüchten ins Smartphone oder zögern das Heimkommen hinaus.",
      fr: "Votre score révèle une réticence intime modérée. Loyal dans les épreuves, la proximité affective ordinaire vous rend parfois nerveux. Vous vous réfugiez derrière vos écrans ou le travail.",
      es: "Tu resultado muestra una evitación leve de la intimidad. Eres leal en momentos difíciles, pero la cercanía cotidiana te abruma y te refugias en el móvil o las horas extras.",
    },
    psychologyInsight: {
      en: "Dr. Doug Weiss explains that intimacy anorexia often begins as a subtle, unconscious defense mechanism: by keeping love at arm's length, the individual avoids the acute terror of developmental enmeshment or rejection.",
      id: "Dr. Doug Weiss menjelaskan bahwa intimacy anorexia sering berawal dari pertahanan bawah sadar yang halus: dengan menjaga jarak cinta satu lengan, orang tersebut menghindari ketakutan akan kehilangan kendali atau penolakan.",
      de: "Dr. Doug Weiss beschreibt: Intimitäts-Anorexie beginnt als subtiler Schutzreflex. Wer Nähe auf Distanz hält, schützt sich vor der Urangst vor Übergriffigkeit oder Zurückweisung.",
      fr: "Le Dr Doug Weiss démontre que l'anorexie d'intimité démarre comme un réflexe discret : maintenir l'autre à distance évite d'affronter la terreur de l'étouffement ou du rejet.",
      es: "El Dr. Doug Weiss explica que la anorexia de intimidad nace de una defensa inconsciente: poner distancia evita el pavor al rechazo o a la invasión personal.",
    },
    actionProtocols: {
      en: [
        "The 10-Minute Screen-Free Welcome: When arriving home, leave your phone in another room and spend 10 uninterrupted minutes with your partner.",
        "Daily Verbal Gift: Give your partner one genuine, unprompted compliment every morning.",
        "Notice the Urge to Flee: When feeling restless on the couch, breathe deeply and stay for 2 more minutes before getting up.",
      ],
      id: [
        "Penyambutan 10 Menit Bebas Layar: Saat tiba di rumah, tinggalkan HP di ruangan lain dan luangkan 10 menit menyapa pasangan tanpa distraksi.",
        "Hadiah Kata-kata Harian: Berikan 1 pujian tulus spontan kepada pasanganmu setiap pagi.",
        "Sadari Dorongan Kabur: Saat merasa gelisah di sofa, tarik napas dalam dan bertahanlah 2 menit lebih lama sebelum bangkit.",
      ],
      de: [
        "10-Minuten-Empfang ohne Bildschirm: Bei der Ankunft Handy beiseite legen und dem Partner 10 volle Minuten schenken.",
        "Tägliches Wortgeschenk: Jeden Morgen ein ungefragtes, aufrichtiges Kompliment machen.",
        "Fluchtimpuls aushalten: Wenn Unruhe auf dem Sofa aufsteigt, noch 2 Minuten bewusst sitzenbleiben.",
      ],
      fr: [
        "Accueil de 10 minutes sans écran : Poser le smartphone en rentrant et accorder 10 minutes exclusives à l'autre.",
        "Cadeau verbal quotidien : Offrir chaque matin un compliment spontané et sincère.",
        "Apprivoiser l'envie de fuir : Face à l'agitation sur le canapé, respirer et rester 2 minutes de plus.",
      ],
      es: [
        "Bienvenida de 10 minutos sin pantallas: Deja el móvil en otra habitación y dedica 10 minutos plenos a tu pareja.",
        "Regalo verbal diario: Ofrece cada mañana un cumplido genuino y espontáneo.",
        "Sostener la inquietud: Si sientes ganas de huir del sofá, respira hondo y aguanta 2 minutos más.",
      ],
    },
    dailyAffirmation: {
      en: "Closeness is not a cage. I can be deeply connected while remaining sovereign and free.",
      id: "Kedekatan bukanlah sangkar. Aku bisa terhubung secara mendalam sambil tetap merdeka dan bebas.",
      de: "Nähe ist kein Gefängnis. Ich kann tief verbunden und gleichzeitig vollkommen frei sein.",
      fr: "La proximité n'est pas une cage. Je peux être intimement lié tout en restant souverain.",
      es: "La cercanía no es una cárcel. Puedo estar profundamente conectado y ser libre.",
    },
  },

  intimacy_anorexic_sentinel: {
    level: "intimacy_anorexic_sentinel",
    badge: {
      en: "Intimacy-Anorexic Sentinel",
      id: "Penjaga Anoreksia Keintiman",
      de: "Intimitäts-asketischer Wächter",
      fr: "Sentinelle en Famine Relationnelle",
      es: "Centinela en Anorexia Afectiva",
    },
    title: {
      en: "The Starved Hearth",
      id: "Perapian yang Membeku",
      de: "Der erkaltete Herd",
      fr: "Le Foyer Verglacé",
      es: "El Hogar Escarchado",
    },
    tagline: {
      en: "You systematically starve your relationship of affection, vulnerability, and presence.",
      id: "Kamu secara sistematis melaparkan hubunganmu dari kasih sayang, kerentanan, dan kehadiran batin.",
      de: "Sie entziehen der Beziehung systematisch Zärtlichkeit, emotionale Wärme und Zeit.",
      fr: "Vous affamez méthodiquement le couple de tendresse, de confidences et de présence.",
      es: "Racionas de forma sistemática el afecto, la ternura y la presencia en tu relación.",
    },
    description: {
      en: "Your score indicates pronounced intimacy anorexia (active emotional withholding). You treat affection like a dangerous weapon. You withhold praise, evade touch, engineer busy schedules, and magnify your partner's flaws to justify keeping an iron wall between your souls. Your partner feels profoundly starved and lonely.",
      id: "Skormu menandakan anoreksia keintiman tingkat nyata (penahanan kasih sayang aktif). Kamu memperlakukan keintiman seperti senjata berbahaya. Kamu menahan pujian, menghindari sentuhan, menyusun jadwal padat, dan membesar-besarkan cacat pasangan demi menjaga dinding besi batinmu. Pasanganmu merasa sangat kelaparan kasih sayang dan kesepian.",
      de: "Ihr Ergebnis zeigt ausgeprägte Intimitäts-Anorexie. Sie verweigern Zuneigung, flüchten in To-Dos und bauschen Makel des Partners auf, um die Distanz zu sichern. Ihr Partner leidet unter tiefer seelischer Vereinsamung.",
      fr: "Votre score révèle une véritable anorexie d'intimité. Vous cadenassez la tendresse, fuyez dans l'activisme et grossissez les torts de l'autre pour légitimer vos remparts. Votre partenaire endure une famine affective cuisante.",
      es: "Tu resultado denota una clara anorexia de intimidad. Racionas los elogios, rehúyes las caricias, saturas tu agenda y magnificas fallos ajenos para justificar tu muro. Tu pareja sufre una soledad desgarradora.",
    },
    psychologyInsight: {
      en: "Intimacy anorexia is not a lack of love; it is an active, aggressive phobia of vulnerability. Starving the partner of affection gives the wounded ego an illusion of absolute power, safety, and invulnerability.",
      id: "Anoreksia keintiman bukanlah karena tidak adanya cinta; melainkan fobia aktif dan agresif terhadap kerentanan. Melaparkan pasangan dari kasih sayang memberi ego yang terluka ilusi kekuasaan, kendali, dan kekebalan dari rasa sakit.",
      de: "Intimitäts-Anorexie beruht nicht auf Liebesmangel, sondern auf akuter Verwundbarkeitsphobie. Dem Partner Nähe zu verweigern, schenkt dem verletzten Ego eine Illusion von totaler Kontrolle.",
      fr: "L'anorexie relationnelle ne traduit pas un désamour, mais une phobie panique de la vulnérabilité. Priver l'autre d'affection procure à l'ego blessé l'illusion d'une invulnérabilité absolue.",
      es: "La anorexia de intimidad no es falta de amor, sino un pánico feroz a la vulnerabilidad. Racionar el cariño concede al ego una falsa sensación de control e inmunidad.",
    },
    actionProtocols: {
      en: [
        "The Daily 'Doing Feelings' Exercise: Share two emotion words with your partner every night ('Today I felt stressed and hopeful') without fixing or debating.",
        "Commit to 5 Minutes of Non-Sexual Contact: Hold hands or cuddle in silence for 5 minutes without screens.",
        "Stop Weaponized Flaw-Finding: When you catch yourself judging their chew or tone, whisper: 'I am using this judgment to hide from intimacy.'",
      ],
      id: [
        "Latihan 'Membagikan Rasa': Bagikan 2 kata emosi kepada pasanganmu setiap malam ('Hari ini aku merasa lelah dan bersyukur') tanpa berdebat.",
        "Komitmen 5 Menit Sentuhan Non-Seksual: Bergandengan tangan atau berpelukan hening selama 5 menit tanpa layar HP.",
        "Hentikan Mencari Kesalahan: Saat kamu mulai mengkritik cara mengunyah atau nada suara mereka, sadari: 'Aku mencari cacat ini hanya untuk lari dari kedekatan.'",
      ],
      de: [
        "Gefühls-Mitteilung: Jeden Abend zwei Gefühle mit dem Partner teilen ('Heute fühlte ich mich erschöpft und dankbar') ohne Diskussion.",
        "5 Minuten Zärtlichkeit: Fünf Minuten stilles Händchenhalten oder Kuscheln ohne Bildschirme.",
        "Kritik-Stopp: Wenn Sie sich beim Makelsuchen ertappen, innerlich sagen: 'Ich nutze diesen Fehler als Flucht vor Nähe.'",
      ],
      fr: [
        "Exercice des 2 émotions : Nommer chaque soir deux ressentis vécus dans la journée sans lancer de débat.",
        "5 minutes de tendresse sans enjeu : Se tenir la main ou s'enlacer en silence sans aucun écran.",
        "Cesser la traque aux défauts : Dès qu'une critique monte, se dire : 'J'utilise ce prétexte pour fuir la proximité.'",
      ],
      es: [
        "Ritual de las 2 emociones: Comparte cada noche dos sentimientos de tu día sin debates ni justificaciones.",
        "5 minutos de abrazo sin pantallas: Toma su mano o abrázale en silencio durante 5 minutos diarios.",
        "Frenar la lupa de fallos: Cuando te descubras juzgando sus manías, admítete: 'Uso este juicio para esconderme de la intimidad.'",
      ],
    },
    dailyAffirmation: {
      en: "I put down the weapon of emotional withholding. Loving generously does not destroy me.",
      id: "Kulepaskan senjata penahan kasih sayang ini. Mencintai dengan murah hati tidak akan menghancurkanku.",
      de: "Ich lege die Waffe des Liebesentzugs nieder. Großzügige Liebe zerstört mich nicht.",
      fr: "Je dépose l'arme du rationnement affectif. Aimer avec générosité ne me détruit pas.",
      es: "Suelto el arma de la privación de afecto. Amar con generosidad no me destruye.",
    },
  },

  walled_fortress_isolate: {
    level: "walled_fortress_isolate",
    badge: {
      en: "Walled Fortress Isolate",
      id: "Benteng Batu Terisolasi",
      de: "Hermetisch verriegelte Festung",
      fr: "Citadelle Hermétique Solitaire",
      es: "Fortaleza Amurallada Total",
    },
    title: {
      en: "The Frozen Citadelle",
      id: "Sang Pengasing Batin",
      de: "Die vereiste Zitadelle",
      fr: "La Citadelle de Glace",
      es: "La Ciudadela Inexpugnable",
    },
    tagline: {
      en: "Severe intimacy phobia, complete emotional quarantine, and destructive relational hostility.",
      id: "Fobia keintiman berat, karantina emosi total, dan permusuhan relasional bawah sadar.",
      de: "Schwere Intimitätsphobie, totale seelische Isolation und feindselige Abwehr.",
      fr: "Phobie intime aiguë, mise en quarantaine totale et rejet hostile de tout rapprochement.",
      es: "Fobia severa a la intimidad, aislamiento afectivo total y hostilidad defensiva.",
    },
    description: {
      en: "Your score reflects extreme, systemic intimacy anorexia. You have walled yourself into an impenetrable fortress. The prospect of genuine emotional nakedness triggers panic or visceral hostility. You treat your partner like an adversary or demanding child, having extinguished all warmth, shared vulnerability, and romantic tenderness.",
      id: "Skormu mencerminkan anoreksia keintiman sistemik tingkat ekstrem. Kamu telah memenjarakan dirimu dalam benteng yang tak tertembus. Prospek kerentanan emosi memicu kepanikan atau permusuhan tajam. Kamu memperlakukan pasangan seperti musuh atau anak yang merepotkan, melenyapkan seluruh kehangatan dan kelembutan romantis.",
      de: "Ihr Ergebnis spiegelt schwere, chronische Beziehungsanorexie wider. Sie leben in einer uneinnehmbaren Burg. Wahre Nähe löst Panik oder Feindseligkeit aus. Ihr Partner wird wie ein Rivale behandelt; alle Zärtlichkeit ist erloschen.",
      fr: "Votre score révèle une anorexie d'intimité sévère et destructrice. La perspective d'un dévoilement authentique déclenche panique ou hostilité. Vous traitez votre partenaire comme un fardeau ou un adversaire, anéantissant toute tendresse.",
      es: "Tu resultado denota una anorexia de intimidad extrema. Vives en una fortaleza sellada. La sola idea de exponerte te genera pánico o cólera defensiva. Tratas a tu pareja como a un rival, aniquilando cualquier ternura.",
    },
    psychologyInsight: {
      en: "This extreme barricade is the scar tissue of catastrophic early betrayal, severe boundary violations, or childhood emotional suffocation. Healing requires specialized intimacy anorexia counseling and somatic trauma therapy.",
      id: "Barikade ekstrem ini adalah bekas luka pengkhianatan masa kecil yang dahsyat, pelanggaran batas privasi berat, atau asfiksia emosional pengasuhan. Pemulihannya menuntut konseling keintiman berlisensi dan terapi trauma somatis.",
      de: "Diese Festungsmauern sind das Narbengewebe schwerer früher Grenzüberschreitungen oder Verratserfahrungen. Heilung verlangt fachkundige Paar- und Traumatherapie.",
      fr: "Cette forteresse est la cicatrice d'invasions affectives passées ou de trahisons cuisantes. Guérir nécessite une thérapie de couple et un travail somatique ciblé.",
      es: "Estos muros inexpugnables son la cicatriz de heridas de invasión o traición en el pasado. Requiere terapia de pareja especializada y reprocesamiento del trauma.",
    },
    actionProtocols: {
      en: [
        "Professional Relationship Counseling: Seek an Imago or Emotionally Focused Couples Therapist (EFT) immediately.",
        "Truthful Self-Admission: Admit to yourself: 'I am withholding love because I am terrified, not because my partner is flawed.'",
        "Safe Micro-Dosing of Warmth: Send one kind sentence via text: 'Thank you for making coffee this morning, I appreciate you.'",
      ],
      id: [
        "Konseling Hubungan Profesional: Segera cari konselor pasangan berbasis Imago atau Emotionally Focused Therapy (EFT).",
        "Pengakuan Jujur pada Diri: Akui pada dirimu: 'Aku menahan kasih sayang karena aku sangat ketakutan, bukan karena pasanganku cacat.'",
        "Mikro-Dosis Kehangatan: Kirim 1 kalimat baik lewat chat: 'Terima kasih sudah membuatkan kopi tadi pagi ya, aku sangat menghargainya.'",
      ],
      de: [
        "Paartherapie beginnen: Eine auf EFT oder Imago spezialisierte Paarberatung aufsuchen.",
        "Ehrliche Selbsterkenntnis: Sich eingestehen: 'Ich verweigere Liebe aus Panik, nicht weil der andere fehlerhaft ist.'",
        "Mikrodosis Wärme: Eine kurze Nachricht senden: 'Danke für den Kaffee heute Morgen, das hat mir gutgetan.'",
      ],
      fr: [
        "Thérapie de couple spécialisée : Consulter sans tarder un thérapeute formé à l'EFT ou à la méthode Imago.",
        "Lucidité sans masque : S'avouer : 'Je retiens mon amour par terreur d'être détruit, pas parce que l'autre est indigne.'",
        "Micro-dose de bienveillance : Envoyer un message doux : 'Merci pour le café ce matin, j'y ai été sensible.'",
      ],
      es: [
        "Terapia de pareja experta: Acudir a un terapeuta especializado en EFT o Terapia Imago.",
        "Honestidad radical: Reconócete: 'Raciono el cariño por puro pavor, no porque mi pareja tenga la culpa.'",
        "Microdosis de afecto: Manda un mensaje breve: 'Gracias por el café de esta mañana, te lo agradezco de corazón.'",
      ],
    },
    dailyAffirmation: {
      en: "It is safe to melt the stone. Real intimacy will not destroy my soul; it will set me free.",
      id: "Aman bagiku untuk mencairkan batu ini. Keintiman sejati tidak akan menghancurkan jiwaku; ia akan membebaskanku.",
      de: "Es ist sicher, den Stein zu erweichen. Wahre Nähe zerstört meine Seele nicht, sondern befreit mich.",
      fr: "Il est sans danger d'amollir la pierre. L'intimité vraie ne me détruira pas, elle me rendra libre.",
      es: "Es seguro ablandar la roca. La intimidad auténtica no destruirá mi alma: me hará verdaderamente libre.",
    },
  },
};

export const calculateIntimacyAvoidanceScore = (
  answers: Record<number, number>
): IntimacyAvoidanceScoreResult => {
  let totalScore = 0;
  const subscaleScores = {
    affection_withholding: 0,
    busywork_evasion: 0,
    silent_blame_armor: 0,
  };

  INTIMACY_AVOIDANCE_QUESTIONS.forEach((q) => {
    const val = answers[q.id] ?? 0;
    totalScore += val;
    subscaleScores[q.subscale] += val;
  });

  const maxTotal = INTIMACY_AVOIDANCE_QUESTIONS.length * 3; // 36
  const percentage = Math.min(100, Math.round((totalScore / maxTotal) * 100));

  let level: IntimacyAvoidanceArchetype["level"] = "intimately_receptive_partner";
  if (percentage >= 75) {
    level = "walled_fortress_isolate";
  } else if (percentage >= 50) {
    level = "intimacy_anorexic_sentinel";
  } else if (percentage >= 25) {
    level = "cautiously_sheltered_companion";
  }

  const maxPerSubscale = 4 * 3; // 12 points each
  const subscales = {
    affection_withholding: {
      score: subscaleScores.affection_withholding,
      percentage: Math.min(100, Math.round((subscaleScores.affection_withholding / maxPerSubscale) * 100)),
    },
    busywork_evasion: {
      score: subscaleScores.busywork_evasion,
      percentage: Math.min(100, Math.round((subscaleScores.busywork_evasion / maxPerSubscale) * 100)),
    },
    silent_blame_armor: {
      score: subscaleScores.silent_blame_armor,
      percentage: Math.min(100, Math.round((subscaleScores.silent_blame_armor / maxPerSubscale) * 100)),
    },
  };

  return {
    totalScore,
    percentage,
    level,
    profile: INTIMACY_AVOIDANCE_ARCHETYPES[level],
    subscales,
  };
};
