export type FomoLang = "en" | "id" | "de" | "fr" | "es";

export interface FomoQuestion {
  id: number;
  subscale: "social_comparison_anxiety" | "compulsive_monitoring" | "presence_deficit";
  prompt: Record<FomoLang, string>;
  options: {
    label: Record<FomoLang, string>;
    score: number; // 0 to 3
  }[];
}

export interface FomoArchetype {
  level: "jomo_grounded_sovereign" | "selective_feed_browser" | "chronic_milestone_chaser" | "severe_fomo_prisoner";
  badge: Record<FomoLang, string>;
  title: Record<FomoLang, string>;
  tagline: Record<FomoLang, string>;
  description: Record<FomoLang, string>;
  psychologyInsight: Record<FomoLang, string>;
  actionProtocols: Record<FomoLang, string[]>;
  dailyAffirmation: Record<FomoLang, string>;
}

export interface FomoScoreResult {
  totalScore: number;
  percentage: number;
  level: FomoArchetype["level"];
  profile: FomoArchetype;
  subscales: {
    social_comparison_anxiety: { score: number; percentage: number };
    compulsive_monitoring: { score: number; percentage: number };
    presence_deficit: { score: number; percentage: number };
  };
}

export const FOMO_QUESTIONS: FomoQuestion[] = [
  // Subscale 1: Social Comparison Anxiety (Festinger Social Comparison)
  {
    id: 1,
    subscale: "social_comparison_anxiety",
    prompt: {
      en: "Seeing peers announce job promotions, weddings, or vacations on social media immediately triggers feelings of inadequacy in me.",
      id: "Melihat teman memposting promosi jabatan, pernikahan, atau liburan di media sosial langsung memicu rasa rendah diri dan merasa tertinggal.",
      de: "Wenn ich sehe, wie Gleichaltrige Beförderungen, Hochzeiten oder Urlaube posten, löst das sofort Minderwertigkeitsgefühle in mir aus.",
      fr: "Voir des pairs annoncer des promotions, des mariages ou des vacances déclenche immédiatement un sentiment d'infériorité chez moi.",
      es: "Ver a compañeros anunciar ascensos, bodas o viajes en redes sociales me genera de inmediato una profunda sensación de insuficiencia.",
    },
    options: [
      {
        score: 0,
        label: {
          en: "Never — I feel genuine happiness or indifference for their path",
          id: "Tidak pernah — aku tulus bahagia atau biasa saja melihat pencapaian mereka",
          de: "Nie — ich freue mich aufrichtig für sie oder es berührt mich kaum",
          fr: "Jamais — je me réjouis sincèrement pour eux ou cela m'est indifférent",
          es: "Nunca — me alegro sinceramente por ellos o me resulta indiferente",
        },
      },
      {
        score: 1,
        label: {
          en: "Rarely — only when I am already having an emotionally low day",
          id: "Jarang — hanya saat suasana hatiku memang sedang buruk atau lelah",
          de: "Selten — nur wenn ich ohnehin einen emotional schwierigen Tag habe",
          fr: "Rarement — seulement les jours où mon moral est déjà bas",
          es: "Raramente — solo cuando ya tengo un día emocionalmente bajo",
        },
      },
      {
        score: 2,
        label: {
          en: "Often — I subconsciously benchmark my age and savings against theirs",
          id: "Sering — tanpa sadar aku membandingkan umur, tabungan, dan karierku dengan mereka",
          de: "Oft — ich vergleiche mein Alter und meine Erfolge unbewusst mit ihren",
          fr: "Souvent — je compare inconsciemment mon âge et ma réussite aux leurs",
          es: "A menudo — comparo inconscientemente mi edad y logros con los de ellos",
        },
      },
      {
        score: 3,
        label: {
          en: "Always — it leaves me spiraling in panic that I am failing at life",
          id: "Selalu — membuatku tenggelam dalam panik dan merasa gagal menjalani hidup",
          de: "Immer — es stürzt mich in Panik und das Gefühl, im Leben zu versagen",
          fr: "Toujours — cela me plonge dans une panique aiguë d'avoir gâché ma vie",
          es: "Siempre — me hunde en pánico sintiendo que estoy fracasando en la vida",
        },
      },
    ],
  },
  {
    id: 2,
    subscale: "social_comparison_anxiety",
    prompt: {
      en: "I worry that others are experiencing rewarding, vibrant lives and insider jokes while I am missing out.",
      id: "Aku cemas orang lain menjalani hidup yang jauh lebih seru, bahagia, dan bermakna sementara aku tertinggal.",
      de: "Ich fürchte ständig, dass andere aufregendere Dinge erleben und bedeutungsvollere Beziehungen führen als ich.",
      fr: "Je m'inquiète constamment que les autres vivent des moments extraordinaires dont je suis exclu.",
      es: "Me preocupa constantemente que los demás disfruten de vidas más vibrantes mientras yo me quedo al margen.",
    },
    options: [
      {
        score: 0,
        label: {
          en: "Rarely or never — my own quiet life fulfills me",
          id: "Jarang atau tidak pernah — hidup tenangku sendiri sudah sangat cukup",
          de: "Selten oder nie — mein eigenes Leben erfüllt mich vollkommen",
          fr: "Rarement ou jamais — ma vie simple me satisfait pleinement",
          es: "Casi nunca — mi vida tranquila me llena por completo",
        },
      },
      {
        score: 1,
        label: {
          en: "Occasionally on Friday or weekend nights when staying home alone",
          id: "Sesekali di akhir pekan saat aku sendirian di kamar",
          de: "Gelegentlich am Wochenende, wenn ich allein zu Hause bin",
          fr: "Parfois le week-end quand je me retrouve seul chez moi",
          es: "A veces los fines de semana cuando me quedo solo en casa",
        },
      },
      {
        score: 2,
        label: {
          en: "Frequently — even when resting, a gnawing voice says I should be out doing more",
          id: "Sering — bahkan saat santai, ada suara batin yang bilang aku seharusnya ikut nongkrong atau berkarya",
          de: "Häufig — selbst beim Ausruhen flüstert eine Stimme, ich müsste mehr erleben",
          fr: "Fréquemment — même au repos, une voix me dit que je devrais faire plus",
          es: "Con frecuencia — aun descansando, siento que debería estar viviendo más",
        },
      },
      {
        score: 3,
        label: {
          en: "Constantly — a deep dread of social obsolescence and feeling uninvited",
          id: "Terus-menerus — rasa takut mendalam akan ketertinggalan sosial dan diabaikan",
          de: "Ständig — eine tiefe Angst vor sozialer Isolation und Vergessenheit",
          fr: "Constamment — une angoisse tenace d'invisibilité et d'isolement social",
          es: "Constantemente — una angustia persistente de irrelevancia y exclusión",
        },
      },
    ],
  },
  {
    id: 3,
    subscale: "social_comparison_anxiety",
    prompt: {
      en: "I measure the value of my experiences by how photogenic or impressive they would look to other people.",
      id: "Aku menilai serunya suatu momen dari seberapa estetik atau keren jika diunggah ke Story.",
      de: "Ich bewerte Erlebnisse danach, wie fotogen oder beeindruckend sie für andere wirken würden.",
      fr: "J'évalue l'intérêt d'une expérience à sa beauté potentielle sur les réseaux sociaux.",
      es: "Mido el valor de mis vivencias según lo estéticas o impresionantes que se verían en fotos.",
    },
    options: [
      {
        score: 0,
        label: {
          en: "Not at all — I immerse myself in the moment without needing to broadcast it",
          id: "Sama sekali tidak — aku menikmati momen secara murni tanpa perlu pamer",
          de: "Gar nicht — ich lebe im Moment, ohne ihn teilen zu müssen",
          fr: "Pas du tout — je profite de l'instant présent sans chercher à l'exposer",
          es: "Para nada — disfruto el momento sin necesidad de publicarlo",
        },
      },
      {
        score: 1,
        label: {
          en: "Slightly — I take photos for personal memory, rarely posting immediately",
          id: "Sedikit — aku foto untuk arsip kenangan pribadi, jarang langsung diposting",
          de: "Kaum — ich mache Erinnerungsfotos für mich, poste aber selten sofort",
          fr: "Un peu — je prends des photos souvenirs mais poste très rarement dans l'instant",
          es: "Poco — tomo fotos como recuerdo personal, casi nunca publico al instante",
        },
      },
      {
        score: 2,
        label: {
          en: "Moderately — if a café or concert isn't aesthetically capture-worthy, I feel disappointed",
          id: "Cukup sering — kalau tempat nongkrong atau konser tidak estetik untuk foto, aku agak kecewa",
          de: "Mäßig — wenn ein Ort nicht fotogen ist, bin ich unterbewusst enttäuscht",
          fr: "Modérément — si un lieu n'est pas photogénique, j'éprouve une déception",
          es: "Moderadamente — si un lugar no luce bien en cámara, siento decepción",
        },
      },
      {
        score: 3,
        label: {
          en: "Severely — my outings are essentially planned around creating social proof content",
          id: "Sangat parah — sebagian besar agendaku diatur demi konten validasi sosial",
          de: "Extrem — meine Aktivitäten dienen primär der Erzeugung von sozialem Beweis",
          fr: "Absolument — mes sorties sont pensées pour fabriquer une vitrine sociale valorisante",
          es: "Totalmente — mis salidas están planeadas en función de conseguir validación externa",
        },
      },
    ],
  },
  {
    id: 4,
    subscale: "social_comparison_anxiety",
    prompt: {
      en: "Finding out friends hung out without inviting me triggers disproportionate hurt or paranoia.",
      id: "Mengetahui teman-teman berkumpul tanpa mengajakku membuatku merasa sangat sakit hati atau curiga berlebihan.",
      de: "Zu erfahren, dass Freunde sich ohne mich getroffen haben, löst unverhältnismäßige Kränkung oder Argwohn aus.",
      fr: "Découvrir que des amis se sont réunis sans m'inviter provoque une vive blessure ou de la paranoïa.",
      es: "Descubrir que mis amigos salieron sin invitarme me genera un dolor o resentimiento desproporcionado.",
    },
    options: [
      {
        score: 0,
        label: {
          en: "None — people have separate circles and differing schedules; it's completely normal",
          id: "Biasa saja — setiap orang punya lingkaran dan kesibukan masing-masing, hal yang wajar",
          de: "Gelassen — Freunde haben verschiedene Kreise; das ist völlig natürlich",
          fr: "Serein — chacun a ses cercles et ses impératifs; c'est naturel",
          es: "Tranquilo — cada quien tiene sus círculos y tiempos; es normal",
        },
      },
      {
        score: 1,
        label: {
          en: "A minor sting that dissipates within minutes",
          id: "Sedikit tersengat sesaat tapi cepat reda dalam beberapa menit",
          de: "Ein kleiner Stich, der nach wenigen Minuten verfliegt",
          fr: "Un léger pincement au cœur qui s'estompe vite",
          es: "Un pequeño pellizco que desaparece en pocos minutos",
        },
      },
      {
        score: 2,
        label: {
          en: "Significant rumination — I replay recent conversations wondering what I did wrong",
          id: "Overthinking berat — aku memutar ulang obrolan terakhir mencari-cari apa kesalahanku",
          de: "Starkes Grübeln — ich frage mich tagelang, ob ich sie verärgert habe",
          fr: "Ruminations intenses — je me demande ce que j'ai pu faire de travers",
          es: "Rumiación intensa — repaso conversaciones buscando qué pude haber hecho mal",
        },
      },
      {
        score: 3,
        label: {
          en: "Devastating spiral — I feel rejected, betrayed, and alienated from my social circle",
          id: "Sangat hancur — merasa dikhianati, ditolak, dan diasingkan dari pertemanan",
          de: "Vernichtend — ich fühle mich verraten, abgewiesen und zutiefst isoliert",
          fr: "Dévastateur — je me sens exclu, trahi et rejeté de mon cercle social",
          es: "Devastador — me siento traicionado, rechazado y profundamente excluido",
        },
      },
    ],
  },

  // Subscale 2: Compulsive Monitoring (Przybylski FOMO Scale & Dopamine Trapping)
  {
    id: 5,
    subscale: "compulsive_monitoring",
    prompt: {
      en: "I unlock and refresh social media or group chats within the first 60 seconds of opening my eyes in the morning.",
      id: "Aku langsung membuka dan me-refresh media sosial atau grup chat dalam 60 detik pertama saat bangun tidur.",
      de: "Ich entsperre und aktualisiere Social Media oder Gruppenchats innerhalb der ersten Minute nach dem Aufwachen.",
      fr: "Je déverrouille et rafraîchis les réseaux ou groupes dans la première minute après mon réveil.",
      es: "Desbloqueo y actualizo redes sociales o grupos de chat en el primer minuto tras despertar.",
    },
    options: [
      {
        score: 0,
        label: {
          en: "Never — morning is dedicated to physical hydration, stretching, or quiet thought",
          id: "Tidak pernah — pagi hari khusus untuk minum air, peregangan, atau hening",
          de: "Nie — der Morgen gehört mir, Dehnübungen oder einem ruhigen Kaffee",
          fr: "Jamais — le matin est réservé à mon réveil corporel et à la sérénité",
          es: "Nunca — las mañanas son para hidratarme, estirarme y tener calma mental",
        },
      },
      {
        score: 1,
        label: {
          en: "Sometimes — mostly to check urgent alarms or calendar appointments",
          id: "Kadang-kadang — sekadar mematikan alarm atau melihat jadwal kalender",
          de: "Manchmal — meist nur für den Wecker oder den Kalenderüberblick",
          fr: "Parfois — principalement pour éteindre l'alarme ou voir l'agenda",
          es: "A veces — sobre todo para apagar alarmas o mirar la agenda",
        },
      },
      {
        score: 2,
        label: {
          en: "Most mornings — scrolling feeds while still lying under the duvet",
          id: "Hampir setiap pagi — scrolling feed sambil masih rebahan di bawah selimut",
          de: "Meistens — ich scrolle Feeds durch, während ich noch im Bett liege",
          fr: "La plupart du temps — je fais défiler mes fils encore sous la couette",
          es: "Casi siempre — reviso publicaciones aún acostado bajo las sábanas",
        },
      },
      {
        score: 3,
        label: {
          en: "Automatic reflex — unable to get out of bed without consuming incoming alerts",
          id: "Refleks otomatis — tidak bisa bangun tidur tanpa mengonsumsi notifikasi yang masuk",
          de: "Automatischer Reflex — ich kann nicht aufstehen, ohne alle Feeds gecheckt zu haben",
          fr: "Réflexe compulsif — incapable de me lever sans avoir vérifié toutes les notifications",
          es: "Reflejo automático — incapaz de levantarme sin vaciar mis notificaciones",
        },
      },
    ],
  },
  {
    id: 6,
    subscale: "compulsive_monitoring",
    prompt: {
      en: "Whenever there is a brief lull in conversation, red traffic light, or elevator ride, my hand impulsively reaches for my phone.",
      id: "Saat ada jeda obrolan sejenak, lampu merah, atau naik lift, tanganku otomatis merogoh HP.",
      de: "Bei jeder kurzen Gesprächspause, roten Ampel oder im Aufzug greift meine Hand reflexartig zum Smartphone.",
      fr: "Dès qu'il y a un blanc, un feu rouge ou un trajet en ascenseur, ma main plonge machinalement sur mon téléphone.",
      es: "En cualquier silencio breve, semáforo rojo o viaje en ascensor, mi mano busca instintivamente el móvil.",
    },
    options: [
      {
        score: 0,
        label: {
          en: "Rarely — I am comfortable holding stillness, looking out the window, or breathing",
          id: "Jarang — aku nyaman berdiam diri, memandang ke luar jendela, atau bernapas tenang",
          de: "Selten — ich ertrage Leere gut, schaue aus dem Fenster oder atme durch",
          fr: "Rarement — je tolère très bien le calme, regarde par la fenêtre ou respire",
          es: "Rara vez — tolero bien los silencios, miro por la ventana o respiro con calma",
        },
      },
      {
        score: 1,
        label: {
          en: "Occasionally when I feel bored or socially awkward",
          id: "Sesekali saat merasa bosan atau canggung di situasi sosial",
          de: "Gelegentlich bei Langeweile oder in peinlicher Stille",
          fr: "Occasionnellement par ennui ou gêne passagère",
          es: "Ocasionalmente por aburrimiento o cierta incomodidad social",
        },
      },
      {
        score: 2,
        label: {
          en: "Frequently — empty micro-moments without screen stimulation feel intolerable",
          id: "Sering — jeda kosong beberapa detik tanpa layar terasa membosankan dan gelisah",
          de: "Häufig — mikroskopische Pausen ohne Bildschirm fühlen sich unerträglich an",
          fr: "Souvent — les temps morts sans écran deviennent vite insupportables",
          es: "Frecuentemente — los micropausas sin pantalla se me hacen insoportables",
        },
      },
      {
        score: 3,
        label: {
          en: "Non-stop twitch — I unlock the phone without even knowing what I'm opening",
          id: "Refleks tanpa henti — membuka kunci HP tanpa tahu mau membuka aplikasi apa",
          de: "Dauernder Automatismus — ich entsperre das Gerät, ohne Ziel oder Absicht",
          fr: "Geste quasi inconscient — je déverrouille l'écran sans même savoir ce que je cherche",
          es: "Tic compulsivo — desbloqueo el teléfono sin saber siquiera qué quiero ver",
        },
      },
    ],
  },
  {
    id: 7,
    subscale: "compulsive_monitoring",
    prompt: {
      en: "I experience 'phantom vibrations' or an urge to re-check notifications even when no chime sounded.",
      id: "Aku sering merasa HP bergetar (phantom vibration) padahal tidak ada notifikasi masuk sama sekali.",
      de: "Ich erlebe Phantom-Vibrationen oder den Drang nachzusehen, obwohl kein Ton erklang.",
      fr: "Je ressens des vibrations fantômes ou l'envie pressante de vérifier même sans notification.",
      es: "Siento vibraciones fantasma o la urgencia de comprobar la pantalla sin motivo.",
    },
    options: [
      {
        score: 0,
        label: {
          en: "Never — my phone is on silent / DND and I check on my own schedule",
          id: "Tidak pernah — HP sering di-silent/DND dan aku mengecek sesuai jadwalku sendiri",
          de: "Nie — mein Handy ist stummgeschaltet und ich prüfe es nach meinem Zeitplan",
          fr: "Jamais — téléphone en silencieux; je consulte à mon propre rythme",
          es: "Nunca — teléfono en silencio; lo reviso cuando yo decido",
        },
      },
      {
        score: 1,
        label: {
          en: "Rarely — only when awaiting a critical time-sensitive message",
          id: "Jarang — hanya saat memang sedang menunggu kabar penting dan mendesak",
          de: "Selten — nur wenn ich dringend auf eine wichtige Nachricht warte",
          fr: "Rarement — seulement si j'attends une réponse vitale",
          es: "Raras veces — únicamente cuando espero una llamada urgente",
        },
      },
      {
        score: 2,
        label: {
          en: "Several times a week — feeling phantom buzzes in my pocket or bag",
          id: "Beberapa kali seminggu — merasa ada getaran semu di saku atau tas",
          de: "Mehrmals die Woche — ich spüre ein Vibrieren in Tasche oder Hosentasche",
          fr: "Plusieurs fois par semaine — impressions de vibrations dans ma poche",
          es: "Varias veces por semana — siento vibraciones ilusorias en el bolsillo",
        },
      },
      {
        score: 3,
        label: {
          en: "Daily and pervasive — hypervigilance centered around incoming alerts",
          id: "Setiap hari — kewaspadaan sarafku terus terikat pada notifikasi yang mungkin masuk",
          de: "Täglich — mein Nervensystem ist permanent auf eingehende Reize gespannt",
          fr: "Quotidiennement — mon système nerveux reste en alerte constante",
          es: "A diario — mi sistema nervioso está permanentemente hipervigilante a las alertas",
        },
      },
    ],
  },
  {
    id: 8,
    subscale: "compulsive_monitoring",
    prompt: {
      en: "I struggle to disconnect for a whole day without anxiety about missing news, trends, or discussions.",
      id: "Aku kesulitan lepas dari internet seharian penuh tanpa merasa cemas ketinggalan berita, tren, atau obrolan.",
      de: "Es fällt mir schwer, einen ganzen Tag offline zu sein, ohne Angst vor verpassten News oder Trends.",
      fr: "J'ai du mal à me déconnecter toute une journée sans craindre de rater l'actualité ou des tendances.",
      es: "Me resulta casi imposible desconectar un día entero sin angustia por perderme tendencias o noticias.",
    },
    options: [
      {
        score: 0,
        label: {
          en: "Easy — digital detoxes feel rejuvenating and effortless to me",
          id: "Mudah sekali — puasa gadget terasa sangat menyegarkan dan melegakan pikiranku",
          de: "Sehr leicht — Offline-Tage fühlen sich wie ein wunderbarer Urlaub an",
          fr: "Très facile — les déconnexions prolongées me ressourcent profondément",
          es: "Muy fácil — los descansos digitales me renuevan y relajan",
        },
      },
      {
        score: 1,
        label: {
          en: "Manageable — slight itch for the first couple of hours then pleasant relief",
          id: "Bisa dikendalikan — ada rasa penasaran di awal tapi setelahnya terasa damai",
          de: "Machbar — die ersten zwei Stunden sind ungewohnt, danach sehr erholsam",
          fr: "Gérable — un léger manque au début, puis un vrai soulagement",
          es: "Llevadero — algo de curiosidad las primeras horas y luego gran alivio",
        },
      },
      {
        score: 2,
        label: {
          en: "Difficult — I worry people will think I'm ignoring them or that crisis struck",
          id: "Sulit — khawatir orang mengira aku sombong/cuek atau ada kabar genting terlewat",
          de: "Schwer — ich fürchte, man hält mich für ignorant oder verpasse Krisen",
          fr: "Difficile — j'ai peur qu'on me croie distant ou de rater une urgence",
          es: "Difícil — me preocupa que crean que ignoro mensajes o perderme algo grave",
        },
      },
      {
        score: 3,
        label: {
          en: "Unthinkable — going offline feels like falling off the edge of the world",
          id: "Mustahil dibayangkan — offline seharian membuatku merasa terisolasi dari peradaban",
          de: "Undenkbar — offline zu sein fühlt sich an wie ein sozialer Absturz ins Nichts",
          fr: "Impensable — être hors ligne équivaut pour moi à disparaître du monde",
          es: "Impensable — estar desconectado me hace sentir completamente aislado del mundo",
        },
      },
    ],
  },

  // Subscale 3: Presence Deficit (Impaired Real-World Grounding)
  {
    id: 9,
    subscale: "presence_deficit",
    prompt: {
      en: "While sharing dinner or coffee with a loved one, I frequently divide my attention with my screen.",
      id: "Saat sedang makan malam atau ngopi bareng pasangan/teman, perhatianku terbagi ke layar HP.",
      de: "Beim Essen oder Kaffeetrinken mit lieben Menschen wandert meine Aufmerksamkeit ständig zum Bildschirm.",
      fr: "Lors d'un dîner ou d'un café avec des proches, mon attention est constamment distraite par mon écran.",
      es: "Durante una cena o café con gente querida, divido continuamente mi atención con el móvil.",
    },
    options: [
      {
        score: 0,
        label: {
          en: "Never — phone is kept away out of deep respect for real-time presence",
          id: "Tidak pernah — HP kusimpan di tas demi menghargai kehadiran orang di depanku",
          de: "Nie — das Handy bleibt weg; Anwesenheit hat absolute Priorität",
          fr: "Jamais — téléphone rangé par respect profond pour la rencontre en direct",
          es: "Nunca — guardo el móvil por respeto absoluto a la persona que tengo enfrente",
        },
      },
      {
        score: 1,
        label: {
          en: "Rarely — only to show a relevant picture or answer a household question",
          id: "Jarang — paling untuk memperlihatkan foto terkait obrolan atau hal darurat",
          de: "Selten — nur um ein Foto zu zeigen oder eine dringende Frage zu klären",
          fr: "Rarement — seulement pour illustrer le propos ou une urgence familiale",
          es: "Rara vez — solo para mostrar alguna foto o atender algo puntual",
        },
      },
      {
        score: 2,
        label: {
          en: "Frequently — phone sits face up on the table, glancing down every few minutes",
          id: "Sering — HP ditaruh tengkurap/terbuka di meja dan sesekali kulirik di tengah obrolan",
          de: "Häufig — das Handy liegt auf dem Tisch und ich schiele alle paar Minuten drauf",
          fr: "Fréquemment — téléphone posé sur la table, jetant un œil régulier",
          es: "A menudo — móvil sobre la mesa mirando de reojo cada pocos minutos",
        },
      },
      {
        score: 3,
        label: {
          en: "Constantly — phubbing people; replying to group chats while someone talks to me",
          id: "Terus-menerus — membalas chat orang lain saat orang di depanku sedang berbicara",
          de: "Ständig — 'Phubbing'; ich tippe Nachrichten, während mir jemand ins Gesicht spricht",
          fr: "Constamment — je réponds à des messages pendant qu'on me parle en face",
          es: "Constantemente — reviso mensajes mientras la otra persona me está hablando",
        },
      },
    ],
  },
  {
    id: 10,
    subscale: "presence_deficit",
    prompt: {
      en: "I notice that I read books or watch movies with divided attention, needing secondary input (scrolling reels/threads).",
      id: "Aku kesulitan membaca buku atau menonton film tanpa menyambi scrolling reels/threads di HP.",
      de: "Ich kann kaum ein Buch lesen oder einen Film schauen, ohne nebenbei auf Social Media zu scrollen.",
      fr: "Je ne parviens plus à lire un livre ou regarder un film sans consulter mon téléphone en parallèle.",
      es: "Me cuesta leer un libro o ver una película sin estar a la vez mirando redes en el móvil.",
    },
    options: [
      {
        score: 0,
        label: {
          en: "Not at all — single-task focus remains strong and deeply immersive",
          id: "Sama sekali tidak — fokus tunggalku sangat tajam dan bisa tenggelam dalam cerita",
          de: "Gar nicht — meine Ein-Punkt-Aufmerksamkeit ist ungebrochen tief",
          fr: "Pas du tout — ma capacité d'immersion mono-tâche reste intacte",
          es: "Para nada — mantengo una atención plena y profunda en una sola actividad",
        },
      },
      {
        score: 1,
        label: {
          en: "Occasionally during slow movie scenes or boring chapters",
          id: "Sesekali hanya saat adegan film agak membosankan",
          de: "Gelegentlich bei langatmigen Filmszenen",
          fr: "Parfois lors de scènes de film un peu lentes",
          es: "Ocasionalmente en escenas lentas o momentos menos entretenidos",
        },
      },
      {
        score: 2,
        label: {
          en: "Frequently — 'second-screening' has become my baseline habit",
          id: "Sering — kebiasaan 'second-screening' (nonton sambil main HP) sudah jadi bawaan",
          de: "Häufig — 'Second-Screening' ist bei mir zur festen Gewohnheit geworden",
          fr: "Souvent — le double écran est devenu un automatisme systématique",
          es: "Frecuentemente — usar una segunda pantalla es ya mi patrón habitual",
        },
      },
      {
        score: 3,
        label: {
          en: "Almost always — genuine stillness or sustained focus feels uncomfortable",
          id: "Hampir selalu — fokus panjang tanpa stimulasi ganda membuat otakku gelisah",
          de: "Fast immer — anhaltender Fokus ohne Dopaminkicks fühlt sich unerträglich an",
          fr: "Presque toujours — l'attention soutenue sans stimulation parallèle m'angoisse",
          es: "Casi siempre — mantener la concentración sin estímulos simultáneos me irrita",
        },
      },
    ],
  },
  {
    id: 11,
    subscale: "presence_deficit",
    prompt: {
      en: "I commit to events or projects not because I want them, but solely out of fear of being left out of the loop.",
      id: "Aku mengiyakan ajakan atau kepanitiaan bukan karena ingin, tapi murni takut dianggap 'tidak eksis' atau ketinggalan.",
      de: "Ich sage Veranstaltungen zu, nicht weil ich Lust habe, sondern aus Angst, außen vor zu sein.",
      fr: "J'accepte des sorties ou projets non par envie, mais par peur panique d'être exclu du groupe.",
      es: "Acepto eventos o proyectos no por deseo genuino, sino por temor a quedar fuera del círculo.",
    },
    options: [
      {
        score: 0,
        label: {
          en: "Never — 'No' is a complete sentence; I protect my time with zero guilt",
          id: "Tidak pernah — aku tegas menolak tanpa rasa bersalah demi waktu istirahatku",
          de: "Nie — 'Nein' ist ein ganzer Satz; ich schütze meine Zeit ohne schlechtes Gewissen",
          fr: "Jamais — je dis non sans remords pour préserver mon énergie",
          es: "Nunca — sé decir que no con total serenidad para proteger mi energía",
        },
      },
      {
        score: 1,
        label: {
          en: "Rarely — occasionally when pressured by close friends",
          id: "Jarang — hanya sesekali saat teman terdekat benar-benar memohon",
          de: "Selten — nur wenn enge Freunde mich inständig bitten",
          fr: "Rarement — seulement si de très bons amis insistent fortement",
          es: "Raramente — únicamente si insiste mucho alguien muy cercano",
        },
      },
      {
        score: 2,
        label: {
          en: "Often — I overcommit my calendar until I am exhausted and resentful",
          id: "Sering — jadwal padat sampai kelelahan dan akhirnya menyesali kenapa mengiyakan",
          de: "Oft — mein Kalender ist überbucht, bis Erschöpfung und Frust eintreten",
          fr: "Souvent — je surcharge mon emploi du temps au point d'en être épuisé et aigri",
          es: "A menudo — saturo mi agenda hasta quedar agotado y con remordimiento",
        },
      },
      {
        score: 3,
        label: {
          en: "Chronically — I say yes to everything because the dread of missing out outweighs my physical limits",
          id: "Kronis — selalu mengiyakan segalanya karena rasa takut tertinggal mengalahkan batas fisikku",
          de: "Chronisch — ich nehme alles mit, weil die Furcht vor Ausschluss meine Belastungsgrenzen bricht",
          fr: "Chronique — je dis oui à tout parce que la peur de manquer dépasse mes limites corporelles",
          es: "Crónico — acepto todo porque el miedo a quedarme fuera supera cualquier límite físico",
        },
      },
    ],
  },
  {
    id: 12,
    subscale: "presence_deficit",
    prompt: {
      en: "I feel an urgent urge to buy products, gadgets, or clothes simply because 'everyone on the internet is hyping them'.",
      id: "Aku terdorong buru-buru membeli barang, gadget, atau baju hanya karena sedang viral dan semua orang membicarakannya.",
      de: "Ich spüre den Drang, Dinge oder Kleidung zu kaufen, bloß weil sie im Netz gerade viral gehen.",
      fr: "J'éprouve une envie impérieuse d'acheter des objets juste parce qu'ils font le buzz sur internet.",
      es: "Siento un impulso desmedido por comprar cosas solo porque son tendencia viral en redes.",
    },
    options: [
      {
        score: 0,
        label: {
          en: "Immune — I only purchase items matching my vetted, utilitarian criteria",
          id: "Kebal — aku hanya membeli barang yang sudah masuk daftar kebutuhan dan riset matang",
          de: "Immun — ich kaufe ausschließlich nach echtem Bedarf und eigener Prüfung",
          fr: "Totalement imperméable — je n'achète que ce qui répond à un besoin réfléchi",
          es: "Inmune — compro estrictamente lo que necesito tras evaluarlo con calma",
        },
      },
      {
        score: 1,
        label: {
          en: "Mild curiosity — I look up reviews but sleep on it before purchasing",
          id: "Penasaran biasa — aku baca ulasan tapi selalu menunda beberapa hari sebelum memutuskan",
          de: "Leichte Neugier — ich schaue Tests an, schlafe aber mindestens eine Nacht darüber",
          fr: "Curiosité modérée — je regarde les avis mais j'attends plusieurs jours avant d'acheter",
          es: "Curiosidad moderada — consulto reseñas pero dejo pasar unos días antes de decidir",
        },
      },
      {
        score: 2,
        label: {
          en: "Impulsive — trend hype frequently causes impulse checkout regret",
          id: "Impulsif — antusiasme tren sering membuatku checkout impulsif dan akhirnya menyesal",
          de: "Impulsiv — Trend-Hypes verleiten mich oft zu Spontankäufen mit Reue danach",
          fr: "Impulsif — la pression de tendance me pousse fréquemment à des achats compulsifs regrettés",
          es: "Impulsivo — el furor de las modas me lleva a compras espontáneas que luego lamento",
        },
      },
      {
        score: 3,
        label: {
          en: "Severe trend vulnerability — intense anxiety if I don't participate in consumer culture waves",
          id: "Sangat rentan — merasa minder dan tertinggal jika belum memiliki barang atau tren yang viral",
          de: "Extrem verletzlich — intensive Unruhe, wenn ich nicht am Konsumtrend teilnehme",
          fr: "Très vulnérable — anxiété aiguë si je ne possède pas l'objet célébré du moment",
          es: "Muy vulnerable — ansiedad evidente si no formo parte de la tendencia de consumo de moda",
        },
      },
    ],
  },
];

export const FOMO_ARCHETYPES: Record<FomoArchetype["level"], FomoArchetype> = {
  jomo_grounded_sovereign: {
    level: "jomo_grounded_sovereign",
    badge: {
      en: "JOMO Grounded Sovereign",
      id: "Sovereign JOMO: Berakar & Berdaulat",
      de: "JOMO Geerdeter Souverän",
      fr: "Souverain Ancré en JOMO",
      es: "Soberano Arraigado en JOMO",
    },
    title: {
      en: "Inner Peace & Joy of Missing Out",
      id: "Kedamaian Batin & Kebahagiaan Menepi",
      de: "Innere Ruhe & Freude am Verpassen",
      fr: "Paix Intérieure & Joie de Déconnecter",
      es: "Paz Interior y Alegría de Desconectar",
    },
    tagline: {
      en: "Your sense of self is anchored in authentic presence, impervious to algorithmic comparison.",
      id: "Rasa berhargamu berakar pada kehadiran nyata, kebal terhadap jebakan perbandingan algoritma.",
      de: "Dein Selbstwert ist in realer Präsenz verankert, immun gegen algorithmische Vergleiche.",
      fr: "Votre estime est enracinée dans le présent réel, insensible aux comparaisons algorithmiques.",
      es: "Tu autoestima está anclada en el presente real, inmune a las comparaciones del algoritmo.",
    },
    description: {
      en: "You have cultivated a powerful psychological immunity to FOMO. You embrace JOMO (Joy of Missing Out)—understanding that choosing one thing naturally means letting go of a thousand others. Algorithms cannot hijack your dopamine baseline, and social media acts as an occasional tool rather than a validation mirror.",
      id: "Kamu telah membangun imunitas psikologis yang kokoh terhadap FOMO. Kamu merayakan JOMO (Joy of Missing Out)—paham bahwa memilih satu jalan hidup berarti dengan sadar melepaskan ribuan hal lain. Algoritma tidak dapat membajak baseline dopaminmu, dan medsos hanyalah alat bantu sesekali, bukan cermin validasi dirimu.",
      de: "Du hast eine bemerkenswerte psychologische Immunität gegen FOMO entwickelt. Du lebst JOMO (Joy of Missing Out) und weißt, dass jede bewusste Entscheidung ein Loslassen unzähliger Nebensächlichkeiten bedeutet. Dein Dopamin-Haushalt bleibt stabil und unbeeinflusst von Statusinszenierungen.",
      fr: "Vous possédez une puissante immunité psychologique contre le FOMO. Vous embrassez le JOMO (la joie de manquer l'inutile), sachant que choisir une voie implique de renoncer sereinement à mille autres. Les réseaux ne dictent ni votre bonheur ni votre valeur.",
      es: "Posees una sólida inmunidad psicológica frente al FOMO. Abrazas el JOMO (la alegría de perderse lo irrelevante), comprendiendo que cada elección consciente implica soltar mil distracciones. Las redes sociales no determinan tu valor personal.",
    },
    psychologyInsight: {
      en: "Grounded in Leon Festinger's Social Comparison Theory, individuals who focus on autonomous intrinsic values rather than upward social comparisons display dramatically lower cortisol spikes and higher sustained life satisfaction.",
      id: "Berdasarkan Teori Perbandingan Sosial Leon Festinger, individu yang memprioritaskan nilai intrinsik daripada perbandingan sosial ke atas menunjukkan lonjakan kortisol yang jauh lebih rendah serta kepuasan hidup yang stabil.",
      de: "Nach Leon Festingers Theorie des sozialen Vergleichs weisen Menschen mit intrinsischer Werteorientierung signifikant niedrigere Cortisolspiegel und höhere Lebenszufriedenheit auf.",
      fr: "Selon la théorie de la comparaison sociale de Festinger, orienter ses repères sur des valeurs intrinsèques réduit drastiquement les pics de cortisol et préserve la sérénité.",
      es: "Basado en la teoría de comparación social de Leon Festinger, fijar la atención en valores intrínsecos previene los picos de cortisol y fortalece la satisfacción vital.",
    },
    actionProtocols: {
      en: [
        "Sustain digital sovereignty: Keep phones out of the bedroom overnight to preserve uninterrupted morning clarity.",
        "Model intentional connection: Continue hosting screen-free gatherings where deep conversations take precedence.",
        "Celebrate missed opportunities: Write down 3 social events you intentionally declined this month and savor the peace it gave you.",
      ],
      id: [
        "Pertahankan kedaulatan digital: Jauhkan ponsel dari kamar tidur di malam hari demi kejernihan pikiran pagi hari.",
        "Jadilah inspirasi kehadiran nyata: Tetap adakan pertemuan tatap muka tanpa distraksi layar bersama sahabat.",
        "Rayakan kesempatan yang dilewatkan: Catat 3 ajakan yang sengaja kamu tolak bulan ini dan nikmati ketenangan yang dihasilkannya.",
      ],
      de: [
        "Digitale Souveränität wahren: Smartphone über Nacht außerhalb des Schlafzimmers aufbewahren.",
        "Präsenz vorleben: Treffen mit Freunden weiterhin bewusst bildschirmfrei und intensiv gestalten.",
        "Das Nicht-Mitmachen feiern: Notiere 3 Termine, die du bewusst abgesagt hast, und genieße die gewonnene Ruhe.",
      ],
      fr: [
        "Préserver la souveraineté numérique : maintenir le smartphone hors de la chambre pour des réveils limpides.",
        "Cultiver la vraie présence : continuer à favoriser des rencontres sans écrans aux conversations riches.",
        "Célébrer les renoncements choisis : notez 3 invitations déclinées ce mois-ci et savourez le repos préservé.",
      ],
      es: [
        "Mantener la soberanía digital: dejar el móvil fuera del dormitorio durante la noche para una mente despejada.",
        "Fomentar encuentros reales: continuar priorizando reuniones sin pantallas con charlas auténticas.",
        "Celebrar lo que dejaste pasar: anota 3 invitaciones que declinaste con calma y disfruta la serenidad obtenida.",
      ],
    },
    dailyAffirmation: {
      en: "I miss out on nothing meant for me. My present moment is complete, sufficient, and sacred.",
      id: "Aku tidak pernah tertinggal dari apa yang memang ditakdirkan untukku. Saat ini hidupku utuh, cukup, dan berharga.",
      de: "Ich verpasse nichts, was für mich bestimmt ist. Mein gegenwärtiger Moment ist vollkommen und genügend.",
      fr: "Je ne manque rien de ce qui m'est destiné. Mon instant présent est complet, suffisant et précieux.",
      es: "No me pierdo de nada que sea para mí. Mi momento presente es pleno, suficiente y valioso.",
    },
  },

  selective_feed_browser: {
    level: "selective_feed_browser",
    badge: {
      en: "Selective Feed Browser",
      id: "Browser Selektif: Rentan Fluktuasi",
      de: "Selektiver Feed-Nutzer",
      fr: "Navigateur Modéré",
      es: "Navegador Selectivo",
    },
    title: {
      en: "Mild Comparison Sensitivity",
      id: "Sensitivitas Perbandingan Ringan",
      de: "Leichte Vergleichsempfindlichkeit",
      fr: "Sensibilité Modérée aux Réseaux",
      es: "Sensibilidad Moderada a la Comparación",
    },
    tagline: {
      en: "You generally hold your ground, but vulnerable moments or peer milestones trigger occasional bouts of FOMO.",
      id: "Secara umum kamu mandiri, namun di momen lelah atau melihat pencapaian teman, rasa tertinggal sesekali menyergap.",
      de: "Du bist meist stabil, doch an erschöpften Tagen löst der Erfolg anderer vorübergehendes FOMO aus.",
      fr: "Vous gardez le cap au quotidien, mais la fatigue ou certains succès d'autrui réveillent des doutes passagers.",
      es: "Mantienes el equilibrio en general, pero en días de cansancio los logros ajenos despiertan dudas puntuales.",
    },
    description: {
      en: "You manage modern digital life reasonably well, but your boundaries have subtle leaks. When feeling tired, lonely, or stagnant in your career, scrolling through highlight reels triggers an upward social comparison spiral. You sometimes check notifications out of reflex rather than intent, draining your cognitive bandwidth.",
      id: "Kamu mengelola ritme digital dengan cukup baik, namun benteng pertahananmu masih memiliki celah halus. Saat tubuh lelah atau karier terasa stagnan, melihat rangkuman sukses orang lain memicu spiral perbandingan ke atas. Kamu sesekali membuka HP karena refleks otomatis, bukan tujuan sadar.",
      de: "Du meisterst das digitale Zeitalter passabel, doch deine Grenzen weisen Lücken auf. Bei Müdigkeit oder beruflicher Stagnation führt das Betrachten fremder Höhepunkte zu flüchtigem Selbstzweifel und reflexartigem Scrollen.",
      fr: "Vous gérez plutôt bien votre vie numérique, mais vos limites faiblissent sous la fatigue. Quand vous doutez de votre parcours, les vitrines des autres réveillent un malaise passager et des consultations automatiques.",
      es: "Llevas bien tu vida digital en general, pero con grietas sutiles. En etapas de agotamiento o estancamiento, el éxito ajeno activa comparaciones que te restan energía y concentración.",
    },
    psychologyInsight: {
      en: "Social psychologists note that upward social comparison on curated feeds creates a false statistical sampling bias: you compare your unedited behind-the-scenes reality to others' heavily filtered top 1% moments.",
      id: "Pakar psikologi sosial menyebut bahwa perbandingan ke atas di media sosial menciptakan bias statistik: kamu membandingkan realitas dapurmu yang berantakan dengan cuplikan 1% terbaik dari panggung orang lain.",
      de: "Sozialpsychologen betonen, dass Aufwärtsvergleiche auf kuratierten Profilen zu einem Stichprobenfehler führen: Du vergleichst deinen ungeschminkten Alltag mit den besten 1% Momenten anderer.",
      fr: "Les psychologues rappellent que comparer ses coulisses chaotiques au 1% le plus éclatant des vitrines numériques crée un biais d'échantillonnage destructeur.",
      es: "La psicología social señala que comparar tu realidad cotidiana sin filtros con el 1% más brillante de los demás genera un sesgo cognitivo que distorsiona tu autovaloración.",
    },
    actionProtocols: {
      en: [
        "Feed hygiene audit: Unfollow, mute, or hide accounts whose posts reliably trigger adequacy spirals or lifestyle envy.",
        "Implement a 15-minute buffer: When you feel the urge to check feeds during a lull, set a 15-minute timer before picking up the phone.",
        "Log backstage reality: Whenever peer envy hits, remember 3 unseen sacrifices they had to make to maintain that façade.",
      ],
      id: [
        "Audit higienitas feed: Unfollow, mute, atau sembunyikan akun yang selalu memicu rasa minder atau iri hati.",
        "Terapkan jeda 15 menit: Saat tangan refleks ingin scrolling karena bosan, pasang timer tunda 15 menit sebelum membuka layar.",
        "Ingat realitas di balik layar: Saat rasa iri muncul, bayangkan 3 pengorbanan tersembunyi yang harus mereka tanggung demi konten itu.",
      ],
      de: [
        "Feed-Hygiene einführen: Stummschalten oder Entfolgen von Profilen, die Neidgefühle und Unruhe auslösen.",
        "15-Minuten-Verzögerung: Bei spontaner Scroll-Lust erst nach Ablauf eines 15-Minuten-Timers zum Smartphone greifen.",
        "Hinter die Kulissen blicken: Erinnere dich daran, welche unsichtbaren Abstriche hinter jeder glänzenden Fassade stecken.",
      ],
      fr: [
        "Nettoyage de printemps des fils : masquer ou désabonner les comptes qui réveillent régulièrement des complexes.",
        "Règle tampon des 15 minutes : retardez l'ouverture des réseaux de 15 minutes dès que l'impulsion survient.",
        "Rappelez-vous les coulisses : identifiez mentalement les sacrifices invisibles nécessaires pour afficher de tels clichés.",
      ],
      es: [
        "Auditoría de contactos: silencia o deja de seguir cuentas que activen envidia o sensación de retraso vital.",
        "Regla de espera de 15 minutos: cuando sientas el impulso de mirar redes, espera 15 minutos antes de desbloquear.",
        "Recordar la trastienda: ten presente que detrás de cada foto impecable hay sacrificios y problemas que nadie publica.",
      ],
    },
    dailyAffirmation: {
      en: "I do not judge my everyday journey by another person's highlight montage.",
      id: "Aku tidak menghakimi proses harianku dengan potongan 15 detik terbaik milik orang lain.",
      de: "Ich messe meinen alltäglichen Weg nicht an den Glanzlichtern fremder Profile.",
      fr: "Je ne juge pas mon quotidien à l'aune des extraits choisis des autres.",
      es: "No juzgo mi camino cotidiano a partir de los momentos más filtrados de los demás.",
    },
  },

  chronic_milestone_chaser: {
    level: "chronic_milestone_chaser",
    badge: {
      en: "Chronic Milestone Chaser",
      id: "Pemburu Tonggak Prestasi: Cemas Ketinggalan",
      de: "Chronischer Meilenstein-Jäger",
      fr: "Chasseur de Jalons Anxieux",
      es: "Cazador Crónico de Hitos",
    },
    title: {
      en: "Status Anxiety & Timeline Panic",
      id: "Kecemasan Status & Panik Target Usia",
      de: "Statusangst & Altersdruck",
      fr: "Angoisse de Statut & Pression Temporelle",
      es: "Ansiedad por Estatus y Presión Vital",
    },
    tagline: {
      en: "You are haunted by the feeling that you are falling behind your generation's career, wealth, and relationship clocks.",
      id: "Kamu dibayangi ketakutan konstan bahwa kamu tertinggal jauh dari target umur, karier, dan finansial generasimu.",
      de: "Dich quält das ständige Gefühl, hinter den Alters-, Karriere- und Beziehungszielen deiner Generation hinterherzuhinken.",
      fr: "Vous êtes hanté par l'impression permanente d'être en retard sur les jalons de vie de votre génération.",
      es: "Te angustia la sensación constante de estar quedándote atrás respecto a las expectativas de tu generación.",
    },
    description: {
      en: "Your relationship with modern connectivity has crossed into chronic anxiety. You constantly check peers' progress, measuring your savings, relationship milestones, and job titles against an unforgiving societal timeline. The fear of being left out of trends, conversations, or exclusive groups leads to overcommitted calendars and acute emotional exhaustion.",
      id: "Hubunganmu dengan media sosial telah berubah menjadi kecemasan kronis. Kamu terus-menerus memantau kabar rekan sebaya, mengukur tabungan, status asmara, dan jabatanmu terhadap target sosial yang kaku. Takut dianggap ketinggalan zaman membuatmu kelelahan menyanggupi ajakan yang sebenarnya menguras energimu.",
      de: "Deine Smartphone-Nutzung ist von chronischer Statusangst geprägt. Du scannst den Fortschritt anderer, vergleichst Gehälter, Partnerschaften und Meilensteine mit einem unbarmherzigen Zeitplan. Aus Angst, den Anschluss zu verlieren, sagst du zu allem Ja und bist emotional erschöpft.",
      fr: "Votre rapport aux réseaux est source d'anxiété chronique. Vous comparez vos revenus, votre vie sentimentale et votre statut à un calendrier sociétal rigide. La peur d'être hors jeu vous pousse au surmenage et à l'épuisement affectif.",
      es: "Tu consumo digital está dominado por la ansiedad de estatus. Mides tus finanzas, estado civil y trabajo con un reloj social implacable. El miedo a quedar desfasado te empuja a sobrecargarte y desgastarte emocionalmente.",
    },
    psychologyInsight: {
      en: "In Alain de Botton's 'Status Anxiety' and Przybylski's FOMO scale, hypervigilance toward peer achievement stems from contingent self-worth: the belief that one is only lovable and worthy if one keeps pace with prevailing cultural trophies.",
      id: "Dalam riset 'Status Anxiety' Alain de Botton dan skala FOMO Przybylski, kewaspadaan berlebih terhadap pencapaian teman bersumber dari harga diri bersyarat: keyakinan bahwa diri hanya berharga jika mampu mengejar trofi budaya yang berlaku.",
      de: "Nach Alain de Bottons 'Statusangst' und Przybylskis FOMO-Forschung beruht diese Panik auf konditioniertem Selbstwert: dem Glauben, nur geliebt zu werden, wenn man mit den Trophäen anderer Schritt hält.",
      fr: "Selon Alain de Botton et les recherches sur le FOMO, l'angoisse des jalons provient d'une estime de soi conditionnelle, conditionnée à l'atteinte des trophées sociaux en vigueur.",
      es: "En 'Ansiedad por el estatus' de Alain de Botton y la escala FOMO de Przybylski, esta inquietud nace de una autoestima condicionada a cumplir con las metas impuestas por la cultura.",
    },
    actionProtocols: {
      en: [
        "Establish an unbending Digital Curfew: Put your phone in a drawer from 9:00 PM to 8:00 AM every single day.",
        "Define your personal milestone manifesto: Write down your non-negotiable definition of success that has nothing to do with peer approval.",
        "Practice intentional omission: Choose one trending gathering or topic each week and deliberately choose not to engage or read about it.",
      ],
      id: [
        "Terapkan jam malam digital tanpa kompromi: Simpan ponsel di laci meja mulai pukul 21.00 malam hingga 08.00 pagi.",
        "Tulis manifesto sukses pribadimu: Rumuskan arti sukses versi dirimu sendiri yang tidak bergantung pada pengakuan orang lain.",
        "Latihan absen dengan sengaja: Pilih satu acara kumpul atau topik viral tiap pekan dan putuskan dengan sadar untuk tidak ikut serta.",
      ],
      de: [
        "Strikte digitale Sperrstunde: Smartphone täglich von 21:00 bis 08:00 Uhr in einer Schublade wegschließen.",
        "Eigenes Erfolgsmanifest verfassen: Definiere für dich, was Erfüllung bedeutet – unabhängig von Statussymbolen.",
        "Gezieltes Nicht-Mitmachen trainieren: Wähle wöchentlich ein virales Thema, das du ganz bewusst ignorierst.",
      ],
      fr: [
        "Couvre-feu digital strict : enfermez votre smartphone dans un tiroir de 21h00 à 08h00 tous les soirs.",
        "Rédiger votre propre manifeste : définissez votre vision du succès sans aucun critère de validation externe.",
        "Pratiquer le renoncement délibéré : choisissez chaque semaine une tendance ou invitation à ignorer totalement.",
      ],
      es: [
        "Toque de queda digital estricto: guarda el teléfono en un cajón de 21:00 a 08:00 todos los días.",
        "Manifiesto de éxito propio: redacta tu propia definición de bienestar sin recurrir a la aprobación de terceros.",
        "Renuncia voluntaria semanal: elige una tendencia o evento cada semana del cual desmarcarte con total calma.",
      ],
    },
    dailyAffirmation: {
      en: "Life is an unfolding journey, not a synchronized sprint. My timeline is uniquely mine.",
      id: "Hidup adalah perjalanan yang terurai dengan tenang, bukan lomba lari sinkron. Waktuku adalah milikku seutuhnya.",
      de: "Das Leben ist eine individuelle Entfaltung, kein synchroner Wettlauf. Meine Zeitlinie gehört mir.",
      fr: "La vie est une floraison singulière, pas une course synchronisée. Mon rythme m'appartient.",
      es: "La vida es una maduración propia, no una carrera sincronizada. Mi ritmo vital es único.",
    },
  },

  severe_fomo_prisoner: {
    level: "severe_fomo_prisoner",
    badge: {
      en: "Severe FOMO Prisoner",
      id: "Tawanan FOMO Akut: Terjebak Algoritma",
      de: "Extremer FOMO-Gefangener",
      fr: "Captif Aigu du FOMO",
      es: "Cautivo Extremo del FOMO",
    },
    title: {
      en: "Acute Dopamine Trapping & Digital Exclusion Terror",
      id: "Jebakan Dopamin Akut & Teror Pengucilan Digital",
      de: "Akute Dopaminfalle & Digitale Ausgrenzungsangst",
      fr: "Piège Dopaminergique Aigu & Terreur de l'Exclusion",
      es: "Trampa Dopaminérgica Severa y Terror al Aislamiento",
    },
    tagline: {
      en: "Your nervous system is trapped in compulsive surveillance, terrified that missing an alert equals social death.",
      id: "Sistem sarafmu terjebak dalam pengawasan kompulsif, panik bahwa melewatkan notifikasi berarti pengucilan sosial.",
      de: "Dein Nervensystem steckt in zwanghafter Überwachung fest – aus panischer Angst vor sozialer Unsichtbarkeit.",
      fr: "Votre système nerveux est saturé d'hypervigilance, terrifié à l'idée qu'un silence numérique équivaut à disparaître.",
      es: "Tu sistema nervioso vive en vigilancia compulsiva, con pánico de que desconectarte signifique invisibilidad social.",
    },
    description: {
      en: "You are experiencing severe dopamine dysregulation driven by algorithmic comparison and compulsive monitoring. You wake and sleep to the glow of feeds, suffer from phantom vibrations, and experience legitimate panic attacks when disconnected. The chronic belief that everyone else is living richer, happier, more connected lives has hollowed out your ability to experience real-world peace.",
      id: "Kamu mengalami disaudasi dopamin parah akibat perbandingan algoritma dan pemantauan kompulsif. Kamu bangun dan tidur di depan layar ponsel, mengalami sindrom getaran palsu (phantom vibration), dan panik saat koneksi terputus. Keyakinan kronis bahwa orang lain hidup jauh lebih bahagia telah merampas kemampuanmu menikmati ketenangan nyata.",
      de: "Du leidest unter einer schweren Dopamin-Dysregulation durch algorithmische Reizüberflutung. Du erlebst Phantom-Vibrationen und Panikzustände bei Funklöchern. Die unerschütterliche Illusion, alle anderen führten ein erfüllteres Leben, hat deine Fähigkeit zu echter Gegenwärtigkeit zerrüttet.",
      fr: "Vous souffrez d'un dérèglement dopaminergique sévère dû au contrôle compulsif de vos écrans. Réveils et couchers sont dictés par les flux; la déconnexion engendre des crises d'angoisse. La conviction que tout le monde vit mieux que vous détruit votre ancrage au réel.",
      es: "Experimentas una severa desregulación dopaminérgica provocada por el control compulsivo de tus pantallas. Sufres vibraciones fantasma y angustia real al desconectarte. La idea constante de que todos viven mejor que tú ha dinamitado tu paz cotidiana.",
    },
    psychologyInsight: {
      en: "Clinical research shows that extreme FOMO hijacks the amygdala and striatum in a loop identical to behavioral addictions: variable reward schedules (like slot machines) convince the brain that disconnecting is an existential survival threat.",
      id: "Riset klinis menunjukkan bahwa FOMO ekstrem membajak amigdala dan striatum melalui pola identical kecanduan perilaku: jadwal hadiah acak (seperti mesin judi) meyakinkan otak bahwa offline adalah ancaman kelangsungan hidup.",
      de: "Klinische Studien belegen, dass extremes FOMO das Belohnungszentrum im Gehirn wie ein Spielautomat kapert: Die unberechenbaren Benachrichtigungen suggerieren dem Nervensystem existentielle Bedrohung bei Abwesenheit.",
      fr: "Les neurosciences démontrent que le FOMO aigu pirate l'amygdale via un schéma de renforcement aléatoire (similaire aux machines à sous), faisant percevoir l'absence en ligne comme une menace vitale.",
      es: "La neurociencia constata que el FOMO severo secuestra el sistema de recompensa mediante refuerzos variables aleatorios, haciendo que desconectarse se perciba como un peligro existencial.",
    },
    actionProtocols: {
      en: [
        "Immediate 48-Hour Grayscale Mode: Switch your phone display to total grayscale/monochrome to break visual dopamine salience immediately.",
        "Social notification scorched earth: Disable all notifications for Instagram, TikTok, LinkedIn, and X except for direct phone calls.",
        "Schedule daily nature immersion: Spend 45 minutes walking outdoors with zero headphones and zero devices in your pocket.",
      ],
      id: [
        "Aktifkan mode Grayscale 48 jam: Ubah tampilan layar HP menjadi hitam putih total untuk memutus daya tarik dopamin visual seketika.",
        "Matikan seluruh notifikasi medsos: Matikan semua pop-up dan badge untuk Instagram, TikTok, X, dan medsos lainnya kecuali panggilan darurat.",
        "Jadwalkan grounding di alam: Luangkan waktu jalan kaki 45 menit di luar ruangan tanpa headset dan tanpa membawa HP di kantong.",
      ],
      de: [
        "Sofortiger Graustufen-Modus: Schalte den Bildschirm für 48 Stunden auf Monochrom, um den Dopamin-Reiz abrupt zu stoppen.",
        "Benachrichtigungen radikal kappen: Deaktiviere sämtliche Push-Mitteilungen von Instagram, TikTok und Co. restlos.",
        "Tägliche Natur-Erdung: Gehe täglich 45 Minuten ohne Kopfhörer und ohne Smartphone im Grünen spazieren.",
      ],
      fr: [
        "Mode niveaux de gris immédiat : passez votre écran en noir et blanc complet pour briser la stimulation visuelle.",
        "Silence radio sur les notifications : supprimez toutes les alertes de réseaux sociaux, sans exception.",
        "Immersion réelle quotidienne : marchez 45 minutes par jour dans la nature, sans écouteurs et sans téléphone.",
      ],
      es: [
        "Modo escala de grises inmediato: cambia la pantalla de tu móvil a blanco y negro para anular la atracción dopaminérgica.",
        "Apagón total de notificaciones: desactiva alertas y avisos de todas las redes sociales sin excepción.",
        "Caminata diaria de descarga: sal 45 minutos a caminar al aire libre sin auriculares y dejando el móvil en casa.",
      ],
    },
    dailyAffirmation: {
      en: "I withdraw my energy from the illusion. The only life that matters is the one right here under my feet.",
      id: "Aku menarik kembali energiku dari ilusi layar. Satu-satunya kehidupan yang nyata adalah yang kupijak saat ini.",
      de: "Ich entziehe der Illusion meine Aufmerksamkeit. Das einzige Leben, das zählt, ist das hier unter meinen Füßen.",
      fr: "Je retire mon énergie de cette illusion. La seule vie qui compte se déroule ici, maintenant, sous mes yeux.",
      es: "Retiro mi energía de la ilusión digital. La única vida verdadera es la que tengo justo delante de mí.",
    },
  },
};

export function calculateFomoScore(answers: Record<number, number>): FomoScoreResult {
  let totalScore = 0;
  let comparisonScore = 0;
  let monitoringScore = 0;
  let presenceScore = 0;

  FOMO_QUESTIONS.forEach((q) => {
    const score = answers[q.id] ?? 0;
    totalScore += score;

    if (q.subscale === "social_comparison_anxiety") comparisonScore += score;
    if (q.subscale === "compulsive_monitoring") monitoringScore += score;
    if (q.subscale === "presence_deficit") presenceScore += score;
  });

  const maxTotal = FOMO_QUESTIONS.length * 3; // 36
  const maxSubscale = 4 * 3; // 12
  const percentage = Math.round((totalScore / maxTotal) * 100);

  let level: FomoArchetype["level"];
  if (percentage <= 24) {
    level = "jomo_grounded_sovereign";
  } else if (percentage <= 49) {
    level = "selective_feed_browser";
  } else if (percentage <= 74) {
    level = "chronic_milestone_chaser";
  } else {
    level = "severe_fomo_prisoner";
  }

  return {
    totalScore,
    percentage,
    level,
    profile: FOMO_ARCHETYPES[level],
    subscales: {
      social_comparison_anxiety: {
        score: comparisonScore,
        percentage: Math.round((comparisonScore / maxSubscale) * 100),
      },
      compulsive_monitoring: {
        score: monitoringScore,
        percentage: Math.round((monitoringScore / maxSubscale) * 100),
      },
      presence_deficit: {
        score: presenceScore,
        percentage: Math.round((presenceScore / maxSubscale) * 100),
      },
    },
  };
}
