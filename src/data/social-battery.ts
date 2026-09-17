export type SocialBatteryLang = "en" | "id" | "de" | "fr" | "es";

export interface SocialBatteryQuestion {
  id: number;
  subscale: "social_masking" | "sensory_overload" | "recovery_deficit";
  prompt: Record<SocialBatteryLang, string>;
  options: Array<{
    score: number;
    label: Record<SocialBatteryLang, string>;
  }>;
}

export interface SocialBatteryProfile {
  level: "critical_depletion" | "masking_hangover" | "sensory_strain" | "balanced_resilience";
  badge: Record<SocialBatteryLang, string>;
  title: Record<SocialBatteryLang, string>;
  tagline: Record<SocialBatteryLang, string>;
  batteryPercent: number;
  statusColor: string;
  description: Record<SocialBatteryLang, string>;
  physiologyInsight: Record<SocialBatteryLang, string>;
  rechargeProtocols: Record<SocialBatteryLang, string[]>;
  dailyAffirmation: Record<SocialBatteryLang, string>;
}

export interface SocialBatteryScoreResult {
  totalDrainScore: number;
  maxScore: number;
  drainPercentage: number;
  remainingBattery: number; // 100 - drainPercentage
  level: "critical_depletion" | "masking_hangover" | "sensory_strain" | "balanced_resilience";
  profile: SocialBatteryProfile;
  subscales: {
    social_masking: { score: number; max: number; percentage: number };
    sensory_overload: { score: number; max: number; percentage: number };
    recovery_deficit: { score: number; max: number; percentage: number };
  };
}

export const SOCIAL_BATTERY_QUESTIONS: SocialBatteryQuestion[] = [
  // Subscale 1: Social Masking & People-Pleasing
  {
    id: 1,
    subscale: "social_masking",
    prompt: {
      en: "During long gatherings or team meetings, how much conscious effort do you expend to maintain an enthusiastic, engaged smile?",
      id: "Saat menghadiri perkumpulan panjang atau rapat tim, seberapa banyak energi sadar yang kamu keluarkan untuk mempertahankan senyum antusias?",
      de: "Wie viel bewusste Energie kostet es dich, bei Treffen oder Meetings ein enthusiastisches Lächeln aufrechtzuerhalten?",
      fr: "Combien d'énergie consciente dépensez-vous pour afficher un sourire enthousiaste et avenant en groupe ?",
      es: "¿Cuánta energía consciente empleas en mantener una sonrisa entusiasta en reuniones o grupos?",
    },
    options: [
      { score: 0, label: { en: "Effortless; I express my natural mood freely", id: "Sangat santai; ekspresi saya alami tanpa dibuat-buat", de: "Mühelos; ich zeige ganz natürlich meine Stimmung", fr: "Aucun effort; mon expression reste naturelle", es: "Sin esfuerzo; muestro mi ánimo de forma natural" } },
      { score: 1, label: { en: "Mild effort in professional settings only", id: "Sedikit usaha hanya di ranah profesional", de: "Leichter Aufwand nur im Beruf", fr: "Un petit effort limité au cadre professionnel", es: "Leve esfuerzo solo en el trabajo" } },
      { score: 2, label: { en: "Noticeable strain; my facial muscles literally feel tired", id: "Cukup melelahkan; otot pipi terasa pegal menahan senyum", de: "Spürbare Anstrengung; die Gesichtsmuskeln ermüden", fr: "Effort notable; mes muscles faciaux se crispent", es: "Esfuerzo notable; los músculos de la cara se cansan" } },
      { score: 3, label: { en: "Exhausting performance; I feel like an actor on stage playing a role", id: "Sangat menguras tenaga; serasa aktor di panggung memerankan karakter", de: "Reine Schauspielerei; fühle mich wie ein Darsteller auf der Bühne", fr: "Épuisant; j'ai l'impression de jouer un rôle sur scène", es: "Agotador; me siento como un actor fingiendo un papel" } },
    ],
  },
  {
    id: 2,
    subscale: "social_masking",
    prompt: {
      en: "When asked 'How are you?' when you are privately struggling or weary, how do you usually respond?",
      id: "Saat ditanya 'Apa kabar?' padahal kamu sedang lelah atau kalut, bagaimana biasanya kamu merespons?",
      de: "Wie antwortest du auf 'Wie geht es dir?', wenn du innerlich ausgelaugt bist?",
      fr: "Comment répondez-vous à 'Comment vas-tu ?' quand vous êtes au bout du rouleau ?",
      es: "¿Cómo respondes a '¿Cómo estás?' cuando en realidad estás agotado o sobrepasado?",
    },
    options: [
      { score: 0, label: { en: "Honest and authentic: 'Honestly, I'm pretty depleted today'", id: "Jujur dan otentik: 'Sejujurnya lagi capek banget hari ini'", de: "Ehrlich: 'Ehrlich gesagt bin ich heute ziemlich platt'", fr: "Franc : 'Honnêtement, je suis assez vidé aujourd'hui'", es: "Sincero: 'La verdad es que hoy estoy bastante agotado'" } },
      { score: 1, label: { en: "Casual shorthand: 'Hanging in there!'", id: "Jawaban santai: 'Lagi berjuang nih!'", de: "Kurz und neutral: 'Geht so durch!'", fr: "Évasif : 'On fait aller !'", es: "Neutro: '¡Ahí vamos, tirando!'" } },
      { score: 2, label: { en: "Automatic deflective mask: 'Great! Never better!' to avoid questions", id: "Topeng otomatis: 'Aman, mantap!' demi menghindari pertanyaan lanjut", de: "Automatische Maske: 'Super, alles bestens!', um Fragen zu meiden", fr: "Masque automatique : 'Super, tout va bien !' pour écourter", es: "Máscara automática: '¡Genial, todo bien!' para no dar explicaciones" } },
      { score: 3, label: { en: "Overcompensating cheerfulness, then collapsing inside the moment they turn away", id: "Terlalu ceria dibuat-buat, lalu lemas lunglai begitu mereka berpaling", de: "Übertrieben fröhlich, breche innerlich zusammen sobald sie wegsehen", fr: "Gaieté surjouée, puis effondrement intérieur dès qu'ils tournent le dos", es: "Alegría exagerada forzada, desmoronándome por dentro al instante siguiente" } },
    ],
  },
  {
    id: 3,
    subscale: "social_masking",
    prompt: {
      en: "How difficult is it for you to exit a social gathering early when you feel your energy cratering?",
      id: "Seberapa sulit bagimu untuk pamit pulang lebih awal saat energimu mulai habis total?",
      de: "Wie schwer fällt es dir, eine Feier früher zu verlassen, wenn deine Energie schwindet?",
      fr: "Est-ce difficile pour vous de quitter une soirée plus tôt quand votre énergie chute ?",
      es: "¿Te cuesta marcharte antes de un evento cuando sientes que tu batería se desploma?",
    },
    options: [
      { score: 0, label: { en: "Easy; I politely say goodbye and leave without guilt", id: "Mudah; pamit sopan lalu pulang tanpa rasa bersalah", de: "Leicht; verabschiede mich höflich und gehe ohne Reue", fr: "Facile; je dis au revoir poliment et pars sans culpabilité", es: "Fácil; me despido amablemente y me voy sin culpa" } },
      { score: 1, label: { en: "A brief hesitation, but I honor my fatigue", id: "Ragu sejenak, tapi tetap memilih pulang", de: "Zögere kurz, respektiere aber meine Müdigkeit", fr: "Légère hésitation, mais j'écoute mon besoin de repos", es: "Dudo un instante, pero respeto mi cansancio" } },
      { score: 2, label: { en: "Very hard; I stay 1-2 hours past my limit out of politeness", id: "Sangat susah; bertahan 1-2 jam melewati batas demi kesopanan", de: "Sehr schwer; bleibe aus Höflichkeit 1-2 Stunden über dem Limit", fr: "Très dur; je reste 1 à 2 heures de trop par politesse", es: "Muy difícil; me quedo 1 o 2 horas más de la cuenta por cortesía" } },
      { score: 3, label: { en: "Paralyzing guilt; I force myself to stay until the very end, ending up utterly sick", id: "Rasa bersalah luar biasa; memaksakan diri sampai akhir hingga jatuh sakit", de: "Lähmende Schuld; bleibe bis zum bitteren Ende und werde krank", fr: "Culpabilité paralysante; je reste jusqu'au bout au détriment de ma santé", es: "Culpa paralizante; me obligo a quedarme hasta el final y termino enfermo" } },
    ],
  },

  // Subscale 2: Sensory Overload & Environmental Drain
  {
    id: 4,
    subscale: "sensory_overload",
    prompt: {
      en: "When surrounded by multiple overlapping conversations, loud music, or bright fluorescent lighting, what happens to your nervous system?",
      id: "Saat berada di ruangan dengan banyak suara obrolan tumpang tindih, musik keras, atau lampu terang, apa yang dirasakan tubuhmu?",
      de: "Was passiert mit deinen Nerven bei lauter Musik, Stimmengewirr und grellem Neonlicht?",
      fr: "Que ressent votre système nerveux face aux bruits superposés, à la musique forte et aux néons ?",
      es: "¿Qué le ocurre a tu cuerpo ante conversaciones cruzadas, música alta o luces fluorescentes?",
    },
    options: [
      { score: 0, label: { en: "I thrive on the buzzing energy", id: "Malah makin bersemangat menikmati keriuhan", de: "Die lebhafte Energie belebt mich", fr: "L'énergie ambiante me stimule", es: "El bullicio y la energía me motivan" } },
      { score: 1, label: { en: "Slightly noisy, but manageable for several hours", id: "Agak bising, tapi masih nyaman untuk beberapa jam", de: "Etwas laut, aber stundenlang erträglich", fr: "Un peu bruyant mais tout à fait gérable", es: "Algo ruidoso, pero soportable varias horas" } },
      { score: 2, label: { en: "Head starts throbbing, brain fog creeps in, difficulty tracking words", id: "Kepala mulai berdenyut, otak nge-blank, sulit menyerap kata-kata", de: "Kopf dröhnt, Nebel im Hirn, Worte verschwimmen", fr: "Maux de tête, brouillard mental, difficulté à suivre les phrases", es: "Dolor de cabeza, niebla mental y dificultad para procesar palabras" } },
      { score: 3, label: { en: "Acute sensory overload: nausea, irritability, intense urge to flee or hide", id: "Overload sensorik akut: mual, mudah tersulut emosi, ingin kabur/sembunyi", de: "Reizüberflutung: Übelkeit, Gereiztheit, starker Fluchtimpuls", fr: "Saturation sensorielle aiguë : nausée, irritabilité, envie impérieuse de fuir", es: "Sobrecarga sensorial aguda: náuseas, irritabilidad y ganas intensas de huir" } },
    ],
  },
  {
    id: 5,
    subscale: "sensory_overload",
    prompt: {
      en: "Do you experience 'auditory exhaustion'—where even gentle voices, phone ringtones, or partner chatting feel like physical nails on a chalkboard?",
      id: "Pernahkah kamu mengalami 'auditory exhaustion'—di mana suara obrolan pelan atau dering telepon terasa menusuk telinga?",
      de: "Kennst du auditive Erschöpfung, wo selbst sanfte Stimmen oder Benachrichtigungen in den Ohren wehtun?",
      fr: "Ressentez-vous une saturation auditive où même les voix douces ou notifications deviennent insupportables ?",
      es: "¿Sientes agotamiento auditivo, donde hasta las voces suaves o tonos de llamada te taladran el oído?",
    },
    options: [
      { score: 0, label: { en: "Never; sound rarely irritates my auditory system", id: "Tidak pernah; suara jarang mengganggu pendengaranku", de: "Nie; Geräusche stören mich selten", fr: "Jamais; les bruits ne me dérangent presque pas", es: "Nunca; los sonidos rara vez me saturan" } },
      { score: 1, label: { en: "Only after an exceptionally chaotic workday", id: "Hanya sesekali setelah hari kerja yang luar biasa kacau", de: "Nur nach chaotischen Arbeitstagen", fr: "Uniquement après des journées très chaotiques", es: "Solo tras jornadas de trabajo caóticas" } },
      { score: 2, label: { en: "Frequently; I immediately put on noise-cancelling headphones in silence", id: "Sering; langsung butuh headphone peredam bising dalam mode hening", de: "Häufig; brauche sofort geräuschunterdrückende Kopfhörer in Stille", fr: "Souvent; je mets immédiatement un casque à réduction de bruit", es: "Frecuentemente; necesito ponerme auriculares con cancelación de ruido" } },
      { score: 3, label: { en: "Chronically; any ambient sound makes me feel physically startled and on edge", id: "Kronis; suara lingkungan apa pun membuat tubuhku terkejut dan gelisah", de: "Chronisch; jedes Geräusch lässt mich innerlich zusammenzucken", fr: "Chronique; le moindre son m'agresse physiquement", es: "Crónico; cualquier sonido ambiental me sobresalta y tensa" } },
    ],
  },
  {
    id: 6,
    subscale: "sensory_overload",
    prompt: {
      en: "How do you feel when your phone buzzes with unexpected incoming voice calls or group chat notifications?",
      id: "Apa yang kamu rasakan saat ponselmu bergetar karena panggilan telepon mendadak atau notifikasi grup chat bertubi-tubi?",
      de: "Wie fühlst du dich bei unerwarteten Anrufen oder unzähligen Gruppen-Benachrichtigungen?",
      fr: "Que ressentez-vous quand votre téléphone vibre pour un appel imprévu ou des notifications de groupe ?",
      es: "¿Qué experimentas cuando tu teléfono vibra con llamadas inesperadas o notificaciones grupales?",
    },
    options: [
      { score: 0, label: { en: "Excited or completely neutral; I answer happily", id: "Antusias atau santai saja; langsung saya angkat", de: "Freudig oder neutral; hebe entspannt ab", fr: "Enthousiaste ou neutre; je réponds volontiers", es: "Entusiasta o tranquilo; respondo con gusto" } },
      { score: 1, label: { en: "I check the screen and reply when convenient", id: "Cek layar sebentar, lalu balas saat luang", de: "Schaue aufs Display und melde mich später", fr: "Je regarde l'écran et réponds plus tard", es: "Miro la pantalla y respondo cuando puedo" } },
      { score: 2, label: { en: "A sudden spike of dread or annoyance; I put the phone face down", id: "Kaget dan kesal seketika; membalikkan layar ponsel ke bawah", de: "Kurzer Stich von Unmut; drehe das Telefon stumm um", fr: "Pointe d'angoisse ou d'agacement; je retourne mon téléphone", es: "Pinchazo de agobio o molestia; volteo el móvil boca abajo" } },
      { score: 3, label: { en: "Severe panic/aversion; looking at the screen feels like someone pounding on my door", id: "Penolakan hebat; melihat layar serasa ada orang mendobrak pintu kamarku", de: "Panische Abneigung; Display fühlt sich wie ein Überfall an", fr: "Aversion profonde; l'écran allumé ressemble à une agression", es: "Aversión intensa; ver la pantalla se siente como si golpearan mi puerta" } },
    ],
  },

  // Subscale 3: Recovery Deficit & Solitude Starvation
  {
    id: 7,
    subscale: "recovery_deficit",
    prompt: {
      en: "Following a full weekend of socializing or conferences, how long of a solitary 'cave phase' do you require to feel functional again?",
      id: "Setelah akhir pekan penuh acara sosial atau reuni, berapa lama fase 'bertapa sendirian' yang kamu butuhkan agar pulih?",
      de: "Wie lange brauchst du nach einem intensiven Sozialwochenende in deiner 'Höhle', um wieder fit zu sein?",
      fr: "De combien de temps d'isolement avez-vous besoin après un week-end entier de vie sociale ?",
      es: "¿Cuánto tiempo a solas necesitas tras un fin de semana completo de eventos sociales para recuperarte?",
    },
    options: [
      { score: 0, label: { en: "Zero; a good night's sleep is all I need", id: "Nol; cukup tidur malam yang nyenyak", de: "Gar nicht; eine Mütze Schlaf reicht vollkommen", fr: "Aucun; une bonne nuit de sommeil me suffit", es: "Nada; una buena noche de sueño y listo" } },
      { score: 1, label: { en: "A quiet morning or a few uninterrupted hours", id: "Pagi yang tenang atau beberapa jam tanpa gangguan", de: "Ein ruhiger Vormittag oder wenige Stunden", fr: "Une matinée calme ou quelques heures tranquilles", es: "Una mañana tranquila o un par de horas a solas" } },
      { score: 2, label: { en: "1 to 2 full days of minimal human contact", id: "1 hingga 2 hari penuh minim kontak dengan manusia", de: "1-2 volle Tage mit minimalem Menschenkontakt", fr: "1 à 2 jours complets avec un minimum de contacts", es: "1 o 2 días completos de mínimo contacto humano" } },
      { score: 3, label: { en: "Several days of near-total monastic seclusion; otherwise I feel physically sick", id: "Berhari-hari isolasi total; kalau tidak tubuh bisa drop meriang", de: "Mehrere Tage klösterliche Abgeschiedenheit, sonst droht Erschöpfung", fr: "Plusieurs jours d'isolement quasi monacal sous peine de tomber malade", es: "Varios días de retiro absoluto; si no, caigo enfermo físicamente" } },
    ],
  },
  {
    id: 8,
    subscale: "recovery_deficit",
    prompt: {
      en: "When your social battery is at 0%, what happens to your cognitive processing and ability to articulate thoughts?",
      id: "Saat baterai sosialmu 0%, apa yang terjadi pada kemampuan berpikir dan bicaramu?",
      de: "Was passiert mit deinem Denk- und Sprachvermögen, wenn deine soziale Batterie auf 0 % sinkt?",
      fr: "Que deviennent vos facultés cognitives et d'élocution quand votre batterie sociale est à 0% ?",
      es: "¿Qué le ocurre a tu capacidad para pensar y hablar con claridad cuando tu batería social está al 0%?",
    },
    options: [
      { score: 0, label: { en: "Remains sharp and clear as usual", id: "Tetap lancar dan jernih seperti biasa", de: "Bleibt gewohnt klar und flüssig", fr: "Elles restent intactes et fluides", es: "Permanece clara y fluida como siempre" } },
      { score: 1, label: { en: "Slightly slower to formulate complex arguments", id: "Sedikit lebih lambat menyusun argumen rumit", de: "Etwas langsamer bei komplexen Themen", fr: "Légèrement plus lent à formuler des idées", es: "Un poco más lento para hilar ideas complejas" } },
      { score: 2, label: { en: "Words feel stuck in my throat; simple sentences take immense effort", id: "Kata-kata serasa tercekat di tenggorokan; kalimat sederhana terasa berat", de: "Worte stocken im Hals; einfachste Sätze kosten enorme Mühe", fr: "Les mots bloquent; faire une phrase simple demande un effort immense", es: "Las palabras se traban; armar una frase sencilla cuesta un mundo" } },
      { score: 3, label: { en: "Semi-nonverbal shutdown: I can only nod, give one-word grunts, or stare blankly", id: "Shutdown semi-bisu: hanya bisa mengangguk, gumam satu kata, atau melamun kosong", de: "Halb-stummes Herunterfahren: nur noch Nicken, Brummen oder starrer Blick", fr: "Mutisme partiel : je ne peux que hocher la tête ou regarder dans le vide", es: "Bloqueo casi no verbal: solo asiento, respondo con monosílabos o mirada perdida" } },
    ],
  },
  {
    id: 9,
    subscale: "recovery_deficit",
    prompt: {
      en: "Do you find yourself daydreaming about being stranded in a solitary cozy cabin in the woods with zero wi-fi and nobody talking to you?",
      id: "Apakah kamu sering berkhayal sendirian di kabin tengah hutan tanpa internet dan tanpa ada satu orang pun yang mengajakmu bicara?",
      de: "Träumst du heimlich von einer einsamen Waldhütte ganz ohne Internet und ohne Stimmen?",
      fr: "Rêvez-vous d'une cabane isolée au fond des bois sans wifi et sans personne pour vous parler ?",
      es: "¿Fantaseas con estar en una cabaña solitaria en el bosque sin wifi y sin que nadie te hable?",
    },
    options: [
      { score: 0, label: { en: "No, that sounds dreadfully lonely", id: "Tidak, itu terdengar sangat kesepian", de: "Nein, das klingt furchtbar einsam", fr: "Non, cela me semblerait très triste et solitaire", es: "No, me sonaría muy solitario y aburrido" } },
      { score: 1, label: { en: "Maybe for a weekend getaway", id: "Mungkin untuk liburan singkat akhir pekan", de: "Vielleicht für ein kurzes Wochenende", fr: "Peut-être le temps d'un petit week-end", es: "Quizás para una escapada de fin de semana" } },
      { score: 2, label: { en: "Yes, it sounds like absolute paradise right now", id: "Ya, itu terdengar seperti surga dunia saat ini", de: "Ja, das klingt geradezu paradiesisch", fr: "Oui, cela ressemble au paradis absolu", es: "Sí, suena a gloria bendita ahora mismo" } },
      { score: 3, label: { en: "Desperately; my entire soul craves total human silence to heal", id: "Sangat mendambakannya; jiwaku butuh keheningan total dari manusia untuk sembuh", de: "Verzweifelt; meine Seele sehnt sich nach totaler Stille", fr: "Désespérément; mon être tout entier réclame le silence absolu", es: "Desesperadamente; toda mi alma suplica silencio humano total para sanar" } },
    ],
  },
  {
    id: 10,
    subscale: "recovery_deficit",
    prompt: {
      en: "Have you had at least 3 consecutive hours of completely uninterrupted solitary downtime in the past 7 days?",
      id: "Apakah kamu memiliki minimal 3 jam berturut-turut waktu menyendiri tanpa gangguan sama sekali dalam 7 hari terakhir?",
      de: "Hattest du in den letzten 7 Tagen mindestens 3 aufeinanderfolgende Stunden ungestörte Zeit für dich?",
      fr: "Avez-vous eu au moins 3 heures consécutives de solitude totale sans interruption ces 7 derniers jours ?",
      es: "¿Has tenido al menos 3 horas consecutivas de soledad ininterrumpida en los últimos 7 días?",
    },
    options: [
      { score: 0, label: { en: "Yes, multiple times this week", id: "Ya, berkali-kali minggu ini", de: "Ja, mehrmals diese Woche", fr: "Oui, plusieurs fois cette semaine", es: "Sí, varias veces esta semana" } },
      { score: 1, label: { en: "Yes, at least once", id: "Ya, minimal satu kali", de: "Ja, mindestens einmal", fr: "Oui, au moins une fois", es: "Sí, al menos una vez" } },
      { score: 2, label: { en: "Barely; maybe 30 minutes in the bathroom or car", id: "Nyaris tidak; mungkin cuma 30 menit di kamar mandi atau mobil", de: "Kaum; vielleicht 30 Minuten im Bad oder Auto", fr: "À peine; 30 minutes volées dans la salle de bain ou en voiture", es: "Apenas; quizá 30 minutos en el baño o el coche" } },
      { score: 3, label: { en: "Zero; I have been in perpetual social, work, or family demand without a single breath", id: "Nol; terus-menerus diserbu tuntutan kerja, sosial, atau keluarga tanpa jeda napas", de: "Null; ununterbrochene Anforderungen ohne jeden Atemzug", fr: "Zéro; sollicité en permanence sans une seconde de répit", es: "Cero; bajo demandas constantes de trabajo o familia sin un solo respiro" } },
    ],
  },
];

export const SOCIAL_BATTERY_PROFILES: Record<string, SocialBatteryProfile> = {
  critical_depletion: {
    level: "critical_depletion",
    badge: {
      en: "CODE RED: CRITICAL SOCIAL DEPLETION",
      id: "KODE MERAH: BATERAI SOSIAL KRITIS (0-15%)",
      de: "CODE ROT: KRITISCHE SOZIALE ERSCHÖPFUNG",
      fr: "CODE ROUGE : ÉPUISEMENT SOCIAL CRITIQUE",
      es: "CÓDIGO ROJO: AGOTAMIENTO SOCIAL CRÍTICO",
    },
    title: {
      en: "Critical Social Drain & Introvert Hangover",
      id: "Krisis Baterai Sosial & Introvert Hangover Parah",
      de: "Kritischer Sozial-Burnout & Introvert-Hangover",
      fr: "Batterie sociale à plat & gueule de bois introvertie",
      es: "Batería social agotada y resaca introvertida crítica",
    },
    tagline: {
      en: "Your nervous system is in an emergency shutdown phase. Solitary sensory detox is not a luxury—it is urgent medicine.",
      id: "Sistem sarafmu sedang dalam mode darurat shutdown. Detoks menyendiri bukan kemewahan—ini obat mendesak.",
      de: "Dein Nervensystem befindet sich im Notabschaltungs-Modus. Rückzug ist jetzt dringend notwendige Medizin.",
      fr: "Votre système nerveux est en arrêt d'urgence. Le silence et la solitude sont désormais un impératif vital.",
      es: "Tu sistema nervioso ha entrado en parada de emergencia. El aislamiento sensorial es una necesidad médica urgente.",
    },
    batteryPercent: 12,
    statusColor: "text-rose-600 bg-rose-50 border-rose-200",
    description: {
      en: "You are experiencing acute 'Introvert Hangover'. Your prefrontal cortex is depleted of social neurotransmitters, making even basic conversation feel like lifting lead weights. Ambient noises hurt, facial smiling feels impossible, and your body is screaming for darkness and silence. Forcing further interaction right now will trigger somatic symptoms (migraines, muscle tension, gastric flare-ups).",
      id: "Kamu sedang mengalami 'Introvert Hangover' akut. Otakmu kehabisan neurotransmiter sosial, membuat obrolan paling sederhana pun terasa seberat mengangkat beban besi. Suara bising terasa menusuk, senyum terasa kaku, dan tubuhmu memohon kegelapan dan keheningan. Memaksakan sosialisasi saat ini hanya akan memicu migrain, maag, atau sakit fisik.",
      de: "Du leidest unter einem akuten 'Introvert-Hangover'. Dein Stirnhirn ist sozial erschöpft; jedes Wort fühlt sich wie Blei an. Umgebungsgeräusche schmerzen, und dein Körper verlangt nach Dunkelheit. Weiterer Kontakt führt jetzt unweigerlich zu Migräne oder körperlichen Blockaden.",
      fr: "Vous traversez une violente 'gueule de bois introvertie'. Vos circuits cérébraux sont saturés : toute parole demande un effort surhumain, les sons vous agressent et votre corps réclame le noir complet. Vous forcer maintenant déclencherait migraines et tensions somatiques.",
      es: "Sufres una 'resaca introvertida' aguda. Tu corteza prefrontal está agotada; hablar te cuesta un esfuerzo titánico, los ruidos te hieren y tu cuerpo implora oscuridad y silencio. Forzarte ahora provocará migrañas y dolores somáticos.",
    },
    physiologyInsight: {
      en: "During prolonged social masking and sensory stimulation, the locus coeruleus releases sustained norepinephrine. When reserves run dry, the parasympathetic dorsal vagal branch triggers a freeze response (social shut-in).",
      id: "Saat masking sosial dan stimulasi sensorik berlangsung terlalu lama, tubuh memompa norepinefrin terus-menerus. Saat cadangan habis, cabang dorsal vagal memicu respons freeze (keinginan mutlak menutup diri dari dunia).",
      de: "Dauerhaftes soziales Maskieren erschöpft den Noradrenalin-Speicher. Die Folge ist ein dorsaler Vagus-Schock: Das Nervensystem schaltet die Kontaktfähigkeit ab, um die Organe zu schützen.",
      fr: "Le masquage social prolongé épuise la noradrénaline. La branche vagale dorsale prend le relais et déclenche un réflexe d'extinction pour protéger l'organisme.",
      es: "La hiperadaptación social continuada agota la noradrenalina. La rama vagal dorsal impone un apagón reflejo para salvaguardar el equilibrio orgánico.",
    },
    rechargeProtocols: {
      en: [
        "The 12-Hour Silent Bunker: Put your phone on 'Do Not Disturb' with an auto-reply. Cancel all non-life-threatening obligations for the evening.",
        "Sensory Deprivation: Spend 45 minutes in a dim or dark room with eye shades and zero speech or podcasts.",
        "Ju Sound Sanctuary (Brown Noise): Put on headphones and stream deep brown noise or 528Hz Alpha waves at low volume to soothe your overstimulated auditory cortex.",
      ],
      id: [
        "Bunker Keheningan 12 Jam: Pasang mode Jangan Ganggu (DND) di ponsel. Batalkan semua janji yang tidak darurat untuk malam ini.",
        "Deprivasi Sensorik: Habiskan 45 menit di kamar temaram atau gelap tanpa suara obrolan, video, atau podcast.",
        "Ju Sound Sanctuary (Brown Noise): Gunakan earphone dan dengarkan brown noise sintetis atau frekuensi 528Hz untuk menenangkan korteks pendengaranmu.",
      ],
      de: [
        "Der 12-Stunden-Stille-Bunker: Schalte dein Smartphone auf 'Nicht stören' und sage alle nicht lebensnotwendigen Termine für heute ab.",
        "Sensorischer Entzug: Verbringe 45 Minuten im abgedunkelten Raum mit Schlafbrille – komplett ohne Sprache oder Medien.",
        "Braunes Rauschen: Nutze Kopfhörer mit synthetischem Brown Noise, um die überreizte Hörrinde zu besänftigen.",
      ],
      fr: [
        "Le bunker de silence de 12h : activez le mode 'Ne pas déranger' et décommandez tous vos engagements non vitaux ce soir.",
        "Décompression sensorielle : passez 45 minutes dans une pièce sombre avec un masque de nuit, sans aucun son ni écran.",
        "Bruit brun apaisant : écoutez du bruit brun ou des ondes 528Hz dans Nuju pour calmer votre cortex auditif saturé.",
      ],
      es: [
        "Búnker de silencio de 12 horas: activa 'No molestar' en tu móvil y cancela cualquier compromiso prescindible esta noche.",
        "Privación sensorial: descansa 45 minutos a oscuras con antifaz, sin podcasts ni pantallas.",
        "Ruido marrón reparador: escucha frecuencias de ruido marrón a volumen suave para apaciguar el oído saturado.",
      ],
    },
    dailyAffirmation: {
      en: "I do not owe the world 24/7 accessibility. My solitude is sacred, and resting in silence is my birthright.",
      id: "Aku tidak berhutang ketersediaan 24/7 kepada dunia. Kesendirianku suci, dan istirahat dalam keheningan adalah hak mutlakku.",
      de: "Ich schulde der Welt keine permanente Erreichbarkeit. Meine Stille ist heilig und unantastbar.",
      fr: "Je ne dois pas au monde une disponibilité permanente. Mon silence est précieux et mon repos est légitime.",
      es: "No le debo al mundo disponibilidad 24/7. Mi soledad es sagrada y el descanso en silencio es mi derecho.",
    },
  },

  masking_hangover: {
    level: "masking_hangover",
    badge: {
      en: "THE MASKING HANGOVER",
      id: "MASKING HANGOVER (20-45%)",
      de: "DER MASKEN-HANGOVER",
      fr: "LA GUEULE DE BOIS DU MASQUAGE",
      es: "RESACA POR HIPERADAPTACIÓN SOCIAL",
    },
    title: {
      en: "Masking Fatigue & People-Pleasing Strain",
      id: "Kelelahan Topeng Sosial & People-Pleasing",
      de: "Erschöpfung durch soziale Fassade & Anpassung",
      fr: "Épuisement du masque social & complaisance",
      es: "Fatiga de la máscara social y sobreesfuerzo",
    },
    tagline: {
      en: "You are not tired of people—you are exhausted from the effort of performing who you thought they wanted you to be.",
      id: "Kamu bukan benci orang—kamu lelah pura-pura menjadi sosok ramah yang kamu kira mereka harapkan.",
      de: "Du bist nicht müde von Menschen, sondern erschöpft vom Schauspielern.",
      fr: "Ce ne sont pas les gens qui vous épuisent, c'est l'énergie dépensée à jouer un personnage parfait.",
      es: "No estás harto de la gente: estás agotado del papel que te obligas a interpretar ante ellos.",
    },
    batteryPercent: 32,
    statusColor: "text-amber-600 bg-amber-50 border-amber-200",
    description: {
      en: "Your social battery is drained primarily through 'emotional labor'. You spent hours hyper-monitoring your tone of voice, nodding along to boring anecdotes, suppressing genuine opinions, and anticipating others' emotional needs. Now, your authentic self feels hollowed out and irritated. You have an intense desire to be completely unmonitored and unfiltered.",
      id: "Baterai sosialmu terkuras terutama karena 'kerja emosional'. Kamu menghabiskan berjam-jam mengontrol nada suara, mengangguk pada obrolan yang membosankan, menahan opini asli, dan sibuk menyenangkan orang. Sekarang, dirimu merasa kosong dan mudah tersinggung. Kamu sangat mendambakan ruang di mana kamu tidak perlu menjaga imej.",
      de: "Deine Batterie wurde durch emotionale Schwerstarbeit geleert. Stundenlang hast du deine Stimme moduliert, höflich genickt und eigene Meinungen unterdrückt. Jetzt fühlst du dich innerlich ausgehöhlt und sehnst dich nach bedingungsloser Echtheit.",
      fr: "Votre épuisement découle du travail émotionnel fourni : surveiller votre intonation, sourire poliment et étouffer vos pensées réelles. Vous vous sentez vidé et avez un besoin urgent d'un espace sans aucune attente ni jugement.",
      es: "Tu desgaste proviene del esfuerzo emocional continuo: medir tus palabras, sonreír por cortesía y complacer a todos. Te sientes vacío y necesitas con urgencia un entorno libre de filtros y expectativas.",
    },
    physiologyInsight: {
      en: "Social masking heavily taxes executive function networks in the Dorsolateral Prefrontal Cortex (dlPFC). Glucose metabolism in these areas drops dramatically, resulting in decision fatigue and irritable defensiveness.",
      id: "Memakai topeng sosial menguras energi glukosa di Dorsolateral Prefrontal Cortex (dlPFC). Ketika glukosa di area ini drop, kamu akan mengalami kelelahan mengambil keputusan (decision fatigue) dan mudah tersulut.",
      de: "Das Aufrechterhalten einer sozialen Maske verbraucht enorme Glukosereserven im präfrontalen Kortex. Sinkt dieser Spiegel, folgen Entscheidungsmüdigkeit und Gereiztheit.",
      fr: "Maintenir un masque social draine les réserves de glucose du cortex préfrontal dorsolatéral, provoquant une fatigue décisionnelle et une forte irritabilité.",
      es: "Sostener una fachada social agota la glucosa en la corteza prefrontal, provocando fatiga decisional y una baja tolerancia al estrés.",
    },
    rechargeProtocols: {
      en: [
        "The Zero-Pleasing Window: Spend 2 hours doing whatever you want with zero social performance: messy clothes, no makeup, uncurated meals, zero smiling.",
        "Unfiltered Voice Venting: Use Nuju's Voice Journaling to speak raw, unfiltered thoughts aloud for 3 minutes without worrying about sounding polite or nice.",
        "Clean Boundary Script: Practice declining the next social invite with: 'Thank you so much for thinking of me! I'm completely booked with rest this week, so I'll have to pass.'",
      ],
      id: [
        "Jendela Bebas Jaga Imej: Luangkan 2 jam melakukan apa pun yang kamu mau tanpa perlu rapi: baju santai, makan seadanya, dan bebas tanpa perlu tersenyum.",
        "Curhat Suara Tanpa Sensor: Gunakan Voice Journaling di Nuju untuk menumpahkan unek-unek selama 3 menit tanpa takut dinilai tidak sopan.",
        "Skrip Menolak Elegan: Tolak ajakan berikutnya dengan: 'Terima kasih banyak udah ajak aku ya! Kebetulan minggu ini aku butuh istirahat total, jadi belum bisa ikut dulu.'",
      ],
      de: [
        "Das filterfreie Zeitfenster: Verbringe 2 Stunden absolut formlos – gemütliche Kleidung, kein Lächeln, keine Erwartungen.",
        "Ungeschminktes Journaling: Sprich bei Nuju 3 Minuten lang frei von der Leber weg, ohne auf Höflichkeit zu achten.",
        "Souveränes Nein: 'Danke für die liebe Einladung! Diese Woche brauche ich absolute Erholung, daher passe ich dieses Mal.'",
      ],
      fr: [
        "Parenthèse sans filtre : accordez-vous 2 heures en tenue décontractée, sans sourire forcé ni convenances sociales.",
        "Journal vocal spontané : utilisez le journal vocal Nuju pour vider votre sac pendant 3 minutes sans chercher à être poli.",
        "Refus bienveillant : 'Merci beaucoup d'avoir pensé à moi ! Je réserve cette fin de semaine au repos complet, je passe mon tour.'",
      ],
      es: [
        "Ventana sin filtros: disfruta de 2 horas sin etiquetas ni apariencias: ropa holgada y cero exigencias de simpatía.",
        "Desahogo vocal auténtico: graba en Nuju tus pensamientos sinceros durante 3 minutos sin preocuparte por ser correcto.",
        "Guión de límite asertivo: '¡Mil gracias por avisarme! Esta semana priorizo mi descanso, así que no podré ir.'",
      ],
    },
    dailyAffirmation: {
      en: "I release the burden of being pleasant for other people's comfort. My quiet authenticity is enough.",
      id: "Aku melepaskan beban harus selalu tampil menyenangkan demi kenyamanan orang lain. Keheningan dan keaslian diriku sudah sangat cukup.",
      de: "Ich lasse den Zwang los, immer angenehm zu sein. Meine stille Wahrhaftigkeit genügt vollkommen.",
      fr: "Je dépose le fardeau d'être toujours agréable pour autrui. Mon authenticité silencieuse suffit.",
      es: "Suelto la carga de ser simpático para la comodidad de otros. Mi presencia tranquila es suficiente.",
    },
  },

  sensory_strain: {
    level: "sensory_strain",
    badge: {
      en: "SENSORY & AMBIENT STRAIN",
      id: "KELELAHAN SENSORIK & LINGKUNGAN (50-70%)",
      de: "SENSORISCHE REIZÜBERFLUTUNG",
      fr: "SATURATION SENSORIELLE & AMBIANTE",
      es: "SOBRECARGA SENSORIAL Y AMBIENTAL",
    },
    title: {
      en: "Sensory Overstimulation & Auditory Fatigue",
      id: "Kelelahan Sensorik & Kebisingan Lingkungan",
      de: "Sensorische Überreizung & Akustik-Erschöpfung",
      fr: "Surstimulation sensorielle & fatigue auditive",
      es: "Sobrecarga sensorial y fatiga auditiva",
    },
    tagline: {
      en: "You enjoy connection, but loud rooms, overlapping stimuli, and screen glare have flooded your perceptual threshold.",
      id: "Kamu menyukai kebersamaan, tetapi ruangan bising dan banjir stimulus visual membuat ambang sensorikmu penuh.",
      de: "Du magst Gesellschaft, aber laute Räume und grelle Reize haben dein Nervenkostüm überfordert.",
      fr: "Vous appréciez les échanges, mais le bruit ambiant et les écrans ont saturé vos récepteurs.",
      es: "Disfrutas de la compañía, pero los entornos ruidosos y las pantallas han colmado tu capacidad sensorial.",
    },
    batteryPercent: 58,
    statusColor: "text-blue-600 bg-blue-50 border-blue-200",
    description: {
      en: "Your social battery is still partially intact, but your environmental radar is frying. You are a Highly Sensitive Person (HSP) or possess strong sensory sensitivity. When high decibels, open-office chatter, and relentless notifications pile up, your thalamus struggles to filter irrelevant inputs, leaving you feeling foggy, irritable, and physically restless.",
      id: "Baterai sosialmu sebenarnya masih tersisa sebagian, namun 'radar sensorik'-mu sudah korslet. Kamu kemungkinan seorang HSP (Highly Sensitive Person) dengan kepekaan indra yang tajam. Saat suara keras, obrolan kantor, dan dering HP bertumpuk, otakmu kewalahan menyaring data, membuatmu pusing dan gelisah.",
      de: "Deine zwischenmenschliche Batterie ist nicht leer, aber deine sensorischen Filter sind am Anschlag. Als hochsensible Person überfordert dich die Fülle aus Lärm, Neonlicht und Benachrichtigungen, was zu Benommenheit und innerer Unruhe führt.",
      fr: "Votre envie de partager n'est pas éteinte, mais vos capteurs sensoriels surchauffent. Face au tumulte, aux néons et aux bips, votre cerveau peine à trier les informations, générant brouillard et nervosité.",
      es: "Tu deseo de convivir sigue vivo, pero tus receptores sensoriales están desbordados. El ruido de fondo y las pantallas saturan tus filtros cerebrales, causando mareo y desasosiego.",
    },
    physiologyInsight: {
      en: "The thalamus acts as the sensory gatekeeper of the brain. When overwhelmed, Sensory Gating Deficits occur, allowing raw auditory and visual stimuli to bombard the amygdala directly.",
      id: "Talamus bertindak sebagai gerbang penyaring indra. Saat kelebihan beban, 'sensory gating' melemah sehingga stimulus bising langsung menghantam amigdala tanpa tersaring.",
      de: "Der Thalamus fungiert als Filter für Sinneseindrücke. Bei Überreizung schlägt der Lärm ungefiltert auf das Angstzentrum (Amygdala) durch.",
      fr: "Le thalamus sert de filtre sensoriel. En cas de surmenage, les bruits et stimuli visuels atteignent directement l'amygdale sans atténuation.",
      es: "El tálamo modula los estímulos sensoriales. Al saturarse, el ruido y la luz golpean directamente la amígdala sin filtro previo.",
    },
    rechargeProtocols: {
      en: [
        "Auditory Reset (Physiological Sigh): Practice 3 rounds of the Stanford double-inhale physiological sigh to drop autonomic arousal.",
        "Green Environment Immersion: Step outside into nature or gaze out at greenery for 15 minutes with zero digital screens.",
        "Volume & Screen Dimming: Drop all screen brightness to 30% and switch your devices to grayscale for the remainder of the day.",
      ],
      id: [
        "Reset Pernapasan (Physiological Sigh): Lakukan 3 siklus tarikan napas ganda lewat hidung dan hembusan panjang lewat mulut untuk meredakan saraf.",
        "Sentuhan Alam Hijau: Berjalanlah ke luar ruangan melihat pepohonan atau tanaman hijau selama 15 menit tanpa melihat ponsel.",
        "Redupkan Layar & Grayscale: Turunkan kecerahan layar ke 30% dan aktifkan mode hitam-putih (grayscale) agar saraf matamu beristirahat.",
      ],
      de: [
        "Physiologischer Seufzer: 3 Zyklen doppelter Einatmung durch die Nase und langer Ausatmung durch den Mund zur Beruhigung.",
        "Grüne Pause: Verbringe 15 Minuten in der Natur oder im Park – ganz ohne Blick aufs Smartphone.",
        "Bildschirm-Dimmung: Reduziere die Helligkeit aller Monitore und aktiviere den Graustufenmodus für deine Augen.",
      ],
      fr: [
        "Soupir physiologique : pratiquez 3 cycles de double inspiration nasale et longue expiration buccale pour relâcher la pression.",
        "Immersion végétale : marchez 15 minutes au contact des arbres ou d'un parc sans aucun écran.",
        "Atténuation lumineuse : baissez la luminosité des écrans à 30% et passez en noir et blanc pour soulager vos yeux.",
      ],
      es: [
        "Suspiro fisiológico: realiza 3 ciclos de doble inhalación nasal y exhalación bucal prolongada para calmar el sistema nervioso.",
        "Inmersión en la naturaleza: camina 15 minutos en un entorno verde sin consultar el móvil.",
        "Atenuación de pantallas: baja el brillo al 30% y activa la escala de grises para dar tregua a tus ojos.",
      ],
    },
    dailyAffirmation: {
      en: "My sensitivity is my superpower, not a defect. I protect my sensory sanctuary with gentle unapologetic boundaries.",
      id: "Kepekaanku adalah kekuatan terbesarku, bukan kelemahan. Aku menjaga ketenangan indraku dengan batasan yang tegas dan lembut.",
      de: "Meine Feinfühligkeit ist eine Gabe. Ich schütze meine Sinne mit liebevoller Klarheit.",
      fr: "Ma sensibilité est une force précieuse. Je protège mon sanctuaire sensoriel avec fermeté et douceur.",
      es: "Mi sensibilidad es un don valioso. Protejo mi paz sensorial con límites claros y compasivos.",
    },
  },

  balanced_resilience: {
    level: "balanced_resilience",
    badge: {
      en: "BALANCED SOCIAL RESILIENCE",
      id: "BATERAI SOSIAL SEHAT & SEIMBANG (80-100%)",
      de: "STABILE SOZIALE RESILIENZ",
      fr: "RÉSILIENCE SOCIALE ÉQUILIBRÉE",
      es: "RESILIENCIA SOCIAL EQUILIBRADA",
    },
    title: {
      en: "Vibrant Social Battery & Firm Boundaries",
      id: "Baterai Sosial Sehat & Batasan yang Kuat",
      de: "Gesunde soziale Vitalität & klare Grenzen",
      fr: "Batterie sociale équilibrée & limites saines",
      es: "Batería social plena y límites saludables",
    },
    tagline: {
      en: "You have mastered the art of sustainable engagement: connecting deeply when present, and retreating freely without guilt.",
      id: "Kamu telah menguasai seni interaksi berkelanjutan: hadir dengan hangat saat bersama orang, dan nyaman menyendiri tanpa bersalah.",
      de: "Du meisterst gesunde Balance: herzliche Nähe im Kontakt und schuldlose Erholung im Alleinsein.",
      fr: "Vous cultivez un équilibre remarquable : présent avec chaleur, serein dans la solitude sans culpabiliser.",
      es: "Dominas el equilibrio social: conectas con autenticidad y descansas en soledad sin culpa alguna.",
    },
    batteryPercent: 88,
    statusColor: "text-emerald-600 bg-emerald-50 border-emerald-200",
    description: {
      en: "Superb. Your social battery is operating at peak equilibrium. You possess healthy social pacing, know your sensory limits, and decline invitations gracefully before fatigue sets in. You do not tie your self-worth to pleasing strangers, allowing you to enjoy vibrant meaningful interactions while preserving your core energy reserves.",
      id: "Luar biasa. Baterai sosialmu berada dalam keseimbangan prima. Kamu memahami batas kapasitas energimu dan mampu menolak ajakan dengan elegan sebelum kelelahan melanda. Kamu tidak membebankan harga dirimu pada persetujuan orang lain, sehingga bisa menikmati kebersamaan dengan tulus tanpa mengorbankan ketenangan diri.",
      de: "Hervorragend. Deine soziale Energie ist in bester Verfassung. Du kennst deine Grenzen, setzt rechtzeitig Stopps und sagst elegant Nein, bevor Erschöpfung einsetzt. So genießt du echte Gemeinschaft, ohne dich selbst zu verlieren.",
      fr: "Remarquable. Votre énergie relationnelle est au sommet. Vous savez doser vos présences, poser des refus élégants et préserver vos ressources sans compromettre le plaisir du partage authentique.",
      es: "Excelente. Tu batería social goza de una salud envidiable. Conoces tus ritmos, declinas invitaciones con asertividad y disfrutas del encuentro sin vaciar tus reservas esenciales.",
    },
    physiologyInsight: {
      en: "High vagal tone and balanced oxytocin-dopamine signaling enable you to co-regulate with others without triggering sympathetic fight-or-flight overexcitation.",
      id: "Tonus vagal yang tinggi dan keseimbangan hormon oksitosin-dopamin memungkinkanmu berinteraksi harmonis tanpa memicu alarm stres berlebih.",
      de: "Ein starker Vagustonus und harmonische Botenstoffe erlauben stressfreie Begegnungen ohne sympathische Überreizung.",
      fr: "Un tonus vagal élevé permet des connexions chaleureuses sans basculer dans l'hyper-vigilance sympathique.",
      es: "Un tono vagal óptimo te permite conectar con empatía sin activar la alarma de lucha o huida.",
    },
    rechargeProtocols: {
      en: [
        "Sustain Your Baseline Rhythm: Continue scheduling your weekly non-negotiable solitude mornings.",
        "Deepen High-Value Connections: Invest your abundant energy into the select few people who genuinely nourish your spirit.",
        "Reflective Journaling: Use Nuju's daily prompt to capture gratitude and meaningful insights from your social encounters.",
      ],
      id: [
        "Pertahankan Ritme: Tetap jadwalkan pagi hari menyendiri yang tidak bisa diganggu gugat setiap pekannya.",
        "Pererat Hubungan Bermakna: Alirkan energimu kepada orang-orang terpilih yang benar-benar menghangatkan jiwamu.",
        "Jurnal Harian Nuju: Gunakan pertanyaan refleksi harian di Nuju untuk merekam rasa syukur dan hikmah dari pertemuan sosialmu.",
      ],
      de: [
        "Rhythmus bewahren: Behalte deine wöchentlichen festen Alleinzeiten als unantastbaren Anker bei.",
        "Wertvolle Bindungen pflegen: Schenke deine Energie vor allem den Menschen, die dir guttun.",
        "Dankbarkeits-Journaling: Halte wertvolle Momente in Nuju fest, um deine Resilienz zu verankern.",
      ],
      fr: [
        "Préservez vos rituels : conservez vos plages de solitude hebdomadaires comme un sanctuaire intouchable.",
        "Nourrissez vos liens profonds : consacrez votre belle énergie à ceux qui vous enrichissent sincèrement.",
        "Journal de gratitude : ancrez vos beaux moments d'échange dans l'application Nuju.",
      ],
      es: [
        "Mantén tus hábitos saludables: protege tus mañanas de soledad como un espacio sagrado innegociable.",
        "Prioriza vínculos nutritivos: enfoca tu energía en las personas que suman bienestar y sinceridad a tu vida.",
        "Registro de gratitud: anota tus aprendizajes y momentos gratos en la app Nuju.",
      ],
    },
    dailyAffirmation: {
      en: "I share my light from a full cup. My boundaries protect my peace, and my presence is a gift.",
      id: "Aku membagikan energiku dari cawan yang penuh. Batasanku menjaga kedamaianku, dan kehadiranku adalah berkah yang tulus.",
      de: "Ich gebe aus einem vollen Herzen. Meine Grenzen schützen meinen Frieden.",
      fr: "Je donne à partir d'une coupe pleine. Mes limites protègent ma paix intérieure.",
      es: "Doy desde la abundancia de mi energía. Mis límites cuidan mi serenidad y mi presencia es un regalo sincero.",
    },
  },
};

export function calculateSocialBatteryScore(answers: Record<number, number>): SocialBatteryScoreResult {
  let totalScore = 0;
  let maskingScore = 0;
  let maskingMax = 0;
  let sensoryScore = 0;
  let sensoryMax = 0;
  let deficitScore = 0;
  let deficitMax = 0;

  SOCIAL_BATTERY_QUESTIONS.forEach((q) => {
    const score = answers[q.id] ?? 0;
    totalScore += score;

    if (q.subscale === "social_masking") {
      maskingScore += score;
      maskingMax += 3;
    } else if (q.subscale === "sensory_overload") {
      sensoryScore += score;
      sensoryMax += 3;
    } else if (q.subscale === "recovery_deficit") {
      deficitScore += score;
      deficitMax += 3;
    }
  });

  const maxScore = SOCIAL_BATTERY_QUESTIONS.length * 3; // 30
  const drainPercentage = Math.round((totalScore / maxScore) * 100);
  const remainingBattery = Math.max(5, 100 - drainPercentage);

  const maskingPct = maskingMax > 0 ? Math.round((maskingScore / maskingMax) * 100) : 0;
  const sensoryPct = sensoryMax > 0 ? Math.round((sensoryScore / sensoryMax) * 100) : 0;
  const deficitPct = deficitMax > 0 ? Math.round((deficitScore / deficitMax) * 100) : 0;

  let level: "critical_depletion" | "masking_hangover" | "sensory_strain" | "balanced_resilience";

  if (totalScore <= 8 && drainPercentage <= 28) {
    level = "balanced_resilience";
  } else if (totalScore >= 20 || deficitPct >= 75) {
    level = "critical_depletion";
  } else if (maskingPct >= sensoryPct) {
    level = "masking_hangover";
  } else {
    level = "sensory_strain";
  }

  return {
    totalDrainScore: totalScore,
    maxScore,
    drainPercentage,
    remainingBattery,
    level,
    profile: SOCIAL_BATTERY_PROFILES[level],
    subscales: {
      social_masking: { score: maskingScore, max: maskingMax, percentage: maskingPct },
      sensory_overload: { score: sensoryScore, max: sensoryMax, percentage: sensoryPct },
      recovery_deficit: { score: deficitScore, max: deficitMax, percentage: deficitPct },
    },
  };
}
