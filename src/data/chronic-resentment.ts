export type ChronicResentmentCardLang = "en" | "id" | "de" | "fr" | "es";

export interface ChronicResentmentQuestion {
  id: number;
  subscale: "injustice_rumination_replay" | "somatic_bitterness_poisoning" | "hostility_defense_hardening";
  text: {
    en: string;
    id: string;
    de: string;
    fr: string;
    es: string;
  };
}

export interface ChronicResentmentResultLevel {
  level: string;
  scoreRange: [number, number];
  title: {
    en: string;
    id: string;
    de: string;
    fr: string;
    es: string;
  };
  summary: {
    en: string;
    id: string;
    de: string;
    fr: string;
    es: string;
  };
  neurobiology: {
    en: string;
    id: string;
    de: string;
    fr: string;
    es: string;
  };
  actionProtocol: {
    en: string[];
    id: string[];
    de: string[];
    fr: string[];
    es: string[];
  };
  badge: {
    en: string;
    id: string;
    de: string;
    fr: string;
    es: string;
  };
}

export const CHRONIC_RESENTMENT_QUESTIONS: ChronicResentmentQuestion[] = [
  // 1. Injustice Rumination & Replay Loop (Q1 - Q4)
  {
    id: 1,
    subscale: "injustice_rumination_replay",
    text: {
      en: "I catch myself compulsively replaying past betrayals, insults, or unfair treatment, conducting imaginary courtroom arguments in the shower or before sleep.",
      id: "Aku sering memutar ulang pengkhianatan, hinaan, atau perlakuan tidak adil di masa lalu, berdebat sengit di dalam kepala saat di kamar mandi atau sebelum tidur.",
      de: "Ich ertappe mich dabei, vergangene Kränkungen oder Ungerechtigkeiten zwanghaft im Kopf zu wiederholen und imaginäre Gerichtsverhandlungen zu führen.",
      fr: "Je me surprends à rejouer sans fin d'anciennes trahisons ou injustices, menant des procès imaginaires sous la douche ou avant de m'endormir.",
      es: "Me sorprendo reviviendo una y otra vez agravios pasados o traiciones, ensayando discusiones demoledoras en la ducha o antes de dormir."
    }
  },
  {
    id: 2,
    subscale: "injustice_rumination_replay",
    text: {
      en: "I feel an intense resistance to letting go because it feels like forgiving them would mean excusing their cruelty or letting them 'win.'",
      id: "Aku merasa enggan melepaskan sakit hati karena menganggap memaafkan mereka sama saja dengan membenarkan kejahatannya atau membiarkan mereka 'menang.'",
      de: "Ich spüre großen inneren Widerstand gegen das Loslassen, weil Verzeihen sich anfühlt, als würde ich ihre Tat entschuldigen oder sie gewinnen lassen.",
      fr: "J'éprouve une forte résistance à tourner la page, car pardonner me semble équivaloir à excuser leur cruauté ou à les laisser « gagner ».",
      es: "Siento una resistencia visceral a perdonar, porque creo que soltar el rencor equivaldría a justificar su daño o dejar que se salgan con la suya."
    }
  },
  {
    id: 3,
    subscale: "injustice_rumination_replay",
    text: {
      en: "I fantasize about the person who wronged me finally experiencing public failure, ruin, or an agonizing realization of how badly they hurt me.",
      id: "Aku sering berfantasi orang yang menyakitiku mengalami kehancuran publik, menuai karma buruk, atau akhirnya sadar betapa jahatnya perbuatan mereka.",
      de: "Ich fantasiere darüber, dass die Person, die mich verletzte, eines Tages öffentlich scheitert oder ihr Fehlverhalten schmerzhaft bereut.",
      fr: "Je fantasme sur le jour où la personne qui m'a blessé connaîtra l'échec ou réalisera enfin avec terreur l'ampleur de son tort.",
      es: "Fantaseo con que la persona que me lastimó sufra un revés público, caiga en desgracia o entienda por fin el dolor que causó."
    }
  },
  {
    id: 4,
    subscale: "injustice_rumination_replay",
    text: {
      en: "I review old messages, emails, or memories to validate my indignation and prove to myself that I was completely in the right.",
      id: "Aku sering membaca ulang chat lama, email, atau ingatan masa lalu untuk memvalidasi kemarahanku dan membuktikan bahwa posisikulah yang benar.",
      de: "Ich lese alte Nachrichten oder E-Mails, um meine Empörung zu nähren und mir selbst zu beweisen, dass ich im Recht war.",
      fr: "Je relis d'anciens messages ou e-mails pour attiser mon indignation et me prouver que j'étais irréprochable et lésé.",
      es: "Reviso conversaciones pasadas o correos viejos para reavivar mi indignación y confirmarme que yo tenía toda la razón."
    }
  },

  // 2. Somatic Bitterness & Visceral Poisoning (Q5 - Q8)
  {
    id: 5,
    subscale: "somatic_bitterness_poisoning",
    text: {
      en: "The mere thought, name, or image of the person triggers an immediate physical reaction: clenched jaw, knotted stomach, racing pulse, or a surge of heat.",
      id: "Mendengar nama atau melihat foto orang tersebut langsung memicu reaksi fisik spontan: rahang mengunci, perut melilit, jantung berdegup kencang, atau darah mendidih.",
      de: "Schon der Name oder Gedanke an die Person löst körperliche Anspannung aus: zusammengebissene Zähne, Magenkrämpfe oder Herzrasen.",
      fr: "La simple évocation du nom ou du visage de la personne déclenche une réaction corporelle immédiate : mâchoire serrée, estomac noué ou bouffée de chaleur.",
      es: "La sola mención de su nombre o ver su foto me provoca una reacción física inmediata: mandíbula tensa, nudo en el estómago o pulso acelerado."
    }
  },
  {
    id: 6,
    subscale: "somatic_bitterness_poisoning",
    text: {
      en: "I feel that holding this grudge is like drinking poison and waiting for the other person to die—it burns my own physical energy while they live unbothered.",
      id: "Aku sadar menyimpan dendam ini ibarat meminum racun lalu berharap orang lain yang mati—energi dan tubuhku terkuras sementara mereka hidup santai tanpa beban.",
      de: "Ich spüre, dass dieser Groll mich selbst von innen zerfrisst: Er raubt mir Lebenskraft, während die andere Person unbeschwert weiterlebt.",
      fr: "J'ai conscience que garder cette rancœur revient à boire du poison en espérant que l'autre meure : cela détruit ma vitalité alors qu'il vit en paix.",
      es: "Siento que este resentimiento es como beber veneno esperando que el otro muera: consume mi vitalidad mientras la otra persona sigue con su vida."
    }
  },
  {
    id: 7,
    subscale: "somatic_bitterness_poisoning",
    text: {
      en: "I wake up in the morning or in the middle of the night with instant feelings of hostility, bitterness, or clenching fists over past events.",
      id: "Aku sering terbangun subuh atau tengah malam dengan dada sesak, tangan mengepal, dan rasa marah yang langsung membakar pikiran atas masa lalu.",
      de: "Ich wache morgens oder nachts oft direkt mit Feindseligkeit, Verbitterung oder geballten Fäusten über vergangene Ereignisse auf.",
      fr: "Je me réveille parfois en pleine nuit ou au petit matin avec une rancune brûlante et les poings serrés contre le passé.",
      es: "Me despierto de madrugada o por la mañana con una sensación inmediata de amargura, hostilidad y puños cerrados por agravios pasados."
    }
  },
  {
    id: 8,
    subscale: "somatic_bitterness_poisoning",
    text: {
      en: "My capacity for spontaneous joy is muted; even in happy moments, an underlying layer of cynical bitterness or unresolved grievance dampens my pleasure.",
      id: "Kemampuanku merasakan kebahagiaan terasa tumpul; bahkan di saat menyenangkan, ada lapisan kepahitan sinis yang menodai ketenangan batinku.",
      de: "Meine Fähigkeit zu unbeschwerter Freude ist gedämpft; unter jedem schönen Moment lauert eine Schicht zynischer Bitterkeit.",
      fr: "Ma capacité d'émerveillement est étouffée ; même dans les moments heureux, une amertume sous-jacente gâche mon plaisir.",
      es: "Mi alegría espontánea está apagada; incluso en momentos buenos, una capa subterránea de amargura cínica empaña mi paz."
    }
  },

  // 3. Hostility & Defensive Hardening (Q9 - Q12)
  {
    id: 9,
    subscale: "hostility_defense_hardening",
    text: {
      en: "I have developed a hardened cynicism toward people in general, instinctively assuming that anyone acting friendly is hiding a selfish, manipulative motive.",
      id: "Aku menjadi sangat sinis terhadap orang lain, langsung mencurigai siapa pun yang bersikap ramah pasti memiliki motif tersembunyi yang licik.",
      de: "Ich habe einen tiefen Zynismus entwickelt und unterstelle freundlichen Menschen instinktiv manipulative, egoistische Hintergedanken.",
      fr: "J'ai développé un cynisme défensif, soupçonnant d'emblée toute personne bienveillante d'avoir des arrière-pensées manipulatrices.",
      es: "He desarrollado un cinismo defensivo; asumo por instinto que cualquiera que sea amable conmigo oculta una intención egoísta o interesada."
    }
  },
  {
    id: 10,
    subscale: "hostility_defense_hardening",
    text: {
      en: "I keep a strict mental ledger of every slight, favor, or social transaction, ready to cut someone off the moment I feel shortchanged.",
      id: "Aku mencatat dengan rinci setiap kesalahan kecil, budi, atau transaksi sosial orang lain, dan siap memutus hubungan begitu merasa dirugikan.",
      de: "Ich führe innerlich akribisch Buch über Gefälligkeiten und Fehltritte und bin schnell bereit, Menschen bei Ungleichgewicht fallen zu lassen.",
      fr: "Je tiens un registre mental scrupuleux des dettes et des faux pas, prêt à rompre brutalement dès que je me sens lésé.",
      es: "Llevo una contabilidad mental estricta de cada favor o desaire, dispuesto a cortar el lazo en cuanto siento un mínimo desequilibrio."
    }
  },
  {
    id: 11,
    subscale: "hostility_defense_hardening",
    text: {
      en: "My anger feels like a necessary armor; I fear that if I soften and let go of my vigilance, I will be walked over and humiliated again.",
      id: "Kemarahanku terasa seperti baju zirah pelindung; aku takut jika memaafkan dan melonggarkan benteng, orang lain akan kembali menginjak-injak harga diriku.",
      de: "Mein Zorn fühlt sich wie ein Schutzpanzer an; ich fürchte, ohne diese Härte wieder ausgenutzt und gedemütigt zu werden.",
      fr: "Ma colère me semble être une armure indispensable ; j'ai peur qu'en baissant la garde, je sois à nouveau piétiné et humilié.",
      es: "Mi rencor actúa como una armadura protectora; temo que si bajo la guardia y me ablando, volverán a pisotearme y humillarme."
    }
  },
  {
    id: 12,
    subscale: "hostility_defense_hardening",
    text: {
      en: "I feel increasingly lonely because my bitterness and chronic irritability cause friends, family, or partners to walk on eggshells around me.",
      id: "Aku merasa semakin kesepian karena kepahitanku membuat teman atau pasangan harus serba hati-hati (walking on eggshells) saat berbicara denganku.",
      de: "Ich fühle mich zunehmend einsam, weil mein Groll und meine Gereiztheit dazu führen, dass Nahestehende wie auf Eiern um mich herumlaufen.",
      fr: "Je me sens de plus en plus isolé parce que ma susceptibilité et mon amertume forcent mes proches à marcher sur des œufs avec moi.",
      es: "Me siento cada vez más aislado porque mi resentimiento y susceptibilidad obligan a mis seres queridos a caminar sobre cristales a mi alrededor."
    }
  }
];

export const CHRONIC_RESENTMENT_RESULTS: ChronicResentmentResultLevel[] = [
  {
    level: "forgiving_fluidity",
    scoreRange: [0, 9],
    title: {
      en: "Emotional Fluidity & Low Resentment Retention",
      id: "Kelenturan Emosional & Pelepasan Sakit Hati Sehat",
      de: "Emotionale Durchlässigkeit & Geringe Grollneigung",
      fr: "Fluidité Émotionnelle & Faible Rétention de Rancœur",
      es: "Fluidez Emocional y Bajo Resentimiento Residual"
    },
    summary: {
      en: "You process interpersonal grievances with healthy flexibility. When wronged, you feel appropriate anger, set boundaries or communicate clearly, and release the emotional poison rather than nurturing a chronic grudge.",
      id: "Kamu memproses kekecewaan sosial dengan sehat. Saat dirugikan, kamu merasakan marah yang wajar, menegakkan batasan yang tegas, lalu melepaskan dendam alih-alih menyimpannya hingga membusuk.",
      de: "Sie verarbeiten Kränkungen flexibel. Sie setzen klare Grenzen, ziehen Konsequenzen und lassen seelisches Gift abfließen, anstatt Groll zu züchten.",
      fr: "Vous traversez les conflits avec souplesse. Vous exprimez votre colère, posez vos limites et évacuez le ressentiment sans ruminer indéfiniment.",
      es: "Procesas las ofensas con flexibilidad saludable. Marcas límites claros o cortas el vínculo sin quedarte rumiando el daño ni alimentando el rencor."
    },
    neurobiology: {
      en: "Balanced ventromedial prefrontal cortex (vmPFC) regulation over the amygdala. Cortisol spikes are transient; your autonomic system does not stay locked in chronic revenge mobilization.",
      id: "Regulasi seimbang vmPFC terhadap amigdala. Lonjakan kortisol hanya bersifat sementara; sistem saraf otonommu tidak terjebak dalam mobilisasi dendam berkepanjangan.",
      de: "Ausgeglichene präfrontale Dämpfung der Amygdala. Cortisolspiegel normalisieren sich rasch; Ihr Nervensystem verharrt nicht im Vergeltungsmodus.",
      fr: "Régulation optimale du cortex préfrontal sur l'amygdale. Votre organisme ne reste pas bloqué dans une alerte inflammatoire permanente.",
      es: "Equilibrio neurobiológico entre corteza prefrontal y amígdala. Los picos de cortisol son breves; no quedas atrapado en el desgaste de la venganza."
    },
    actionProtocol: {
      en: [
        "Preserve your boundary clarity: continue addressing slights early before they ferment into bitterness.",
        "Practice somatic discharge after tense negotiations: brisk walking or vocal humming.",
        "Use Nuju voice journaling for regular daily emotional hygiene."
      ],
      id: [
        "Pertahankan ketegasan batasanmu: selesaikan masalah kecil segera sebelum terfermentasi menjadi dendam.",
        "Lakukan pelepasan fisik setelah perdebatan: jalan cepat atau dengungan suara.",
        "Gunakan jurnal suara Nuju untuk menjaga kebersihan emosi harian."
      ],
      de: [
        "Klare Grenzen wahren: Klären Sie Missverständnisse frühzeitig, bevor Verbitterung entsteht.",
        "Somatische Entlastung nach Streitigkeiten: Zügiges Gehen oder Atemberuhigung.",
        "Nutzen Sie das Nuju-Sprachjournal zur täglichen emotionalen Hygiene."
      ],
      fr: [
        "Maintenez votre franchise : traitez les frictions immédiatement avant qu'elles ne s'enveniment.",
        "Déchargez les tensions physiques après les conflits : marche rapide ou soupirs physiologiques.",
        "Utilisez le journal vocal Nuju pour préserver votre légèreté intérieure."
      ],
      es: [
        "Mantén tus límites claros: aborda los roces a tiempo antes de que fermenten en rencor.",
        "Practica descargas somáticas tras momentos tensos: caminatas enérgicas o suspiros sonoros.",
        "Usa el diario de voz Nuju para sostener tu higiene emocional cotidiana."
      ]
    },
    badge: {
      en: "FLUID & UNBURDENED",
      id: "LEPAS & BEBAS BEBAN",
      de: "UNBELASTET & FREI",
      fr: "LÉGER & APAISÉ",
      es: "LIVIANO Y SOBERANO"
    }
  },
  {
    level: "transient_indignation",
    scoreRange: [10, 17],
    title: {
      en: "Transient Indignation & Situational Grievance",
      id: "Kemarahan Situasional & Kekesalan Sesaat",
      de: "Vorübergehende Empörung & Situativer Groll",
      fr: "Indignation Passagère & Rancune Circonstancielle",
      es: "Indignación Pasajera y Resquemor Situacional"
    },
    summary: {
      en: "You carry a few unresolved grievances from specific betrayals, occasionally conducting mental replays. While not entirely paralyzing your daily life, pockets of resentment leak out during stressful periods or moments of loneliness.",
      id: "Kamu menyimpan beberapa kekecewaan masa lalu yang belum sepenuhnya tuntas, sesekali memutar ulang argumen di kepala. Ini tidak melumpuhkan hidupmu, namun sesekali bocor saat kamu stres.",
      de: "Sie tragen einzelne ungeklärte Verletzungen mit sich herum und grübeln phasenweise. Der Groll bestimmt nicht Ihren Alltag, flammt in Belastungsphasen aber auf.",
      fr: "Vous gardez quelques blessures non digérées qui ressurgissent occasionnellement sous forme de ruminations, sans toutefois paralyser votre quotidien.",
      es: "Arrastras un par de ofensas no resueltas que vuelven a tu mente en momentos de fatiga. No arruinan tu vida, pero drenan energía en situaciones de estrés."
    },
    neurobiology: {
      en: "Intermittent sympathetic activation. The salience network tags past offenders as untrustworthy, prompting temporary cortisol and blood pressure surges during cognitive recall.",
      id: "Aktivasi simpatik intermiten. Jaringan salience menandai sosok pelaku sebagai ancaman, memicu lonjakan tekanan darah dan kortisol saat mengingatnya kembali.",
      de: "Intermittierende sympathische Erregung. Erinnerungen triggern temporäre Blutdruck- und Cortisolspitzen.",
      fr: "Activation sympathique intermittente. La remémoration du tort subi provoque des pics d'adrénaline et de tension musculaire passagers.",
      es: "Activación simpática intermitente. El recuerdo del agravio activa descargas momentáneas de cortisol y tensión en el pecho."
    },
    actionProtocol: {
      en: [
        "Identify the 'Grievance Trigger': Pinpoint which specific past relationship still claims free mental rent.",
        "Write an 'Unsent Truth Letter': Document every dirty detail of how they wronged you, then destroy it.",
        "Vent your raw indignation into Nuju's zero-knowledge encrypted voice vault to break the replay loop."
      ],
      id: [
        "Kenali Pemicu Sakit Hatimu: Cari tahu sosok masa lalu mana yang masih 'ngekos gratis' di kepalamu.",
        "Tulis 'Surat Kejujuran Tanpa Sensor': Tuliskan semua kepedihanmu tanpa basa-basi, lalu bakar atau robek kertasnya.",
        "Keluarkan unek-unekmu di Nuju: Bicarakan kemarahanmu ke brankas audio Nuju untuk menghentikan putaran kaset lama."
      ],
      de: [
        "Groll-Auslöser entlarven: Erkennen Sie, welche Person immer noch mietfrei in Ihrem Kopf wohnt.",
        "Einen ungesendeten Wutbrief schreiben und vernichten, um der Seele Erleichterung zu verschaffen.",
        "Die aufgestaute Empörung im verschlüsselten Nuju-Sprachraum laut herauslassen."
      ],
      fr: [
        "Identifiez la source : repérez qui continue d'occuper vos pensées sans y avoir été invité.",
        "Rédigez une lettre de vérité brute que vous détruirez pour clore l'incident symboliquement.",
        "Déchargez votre agacement dans le journal vocal chiffré de Nuju pour briser la boucle mentale."
      ],
      es: [
        "Identifica el detonante: detecta qué persona sigue viviendo gratis en tu cabeza sin pagar alquiler.",
        "Escribe una carta de desahogo radical que luego romperás para sellar el agravio.",
        "Vuelca tu indignación en el diario de voz de Nuju para detener la rumiación."
      ]
    },
    badge: {
      en: "SELECTIVE RESENTER",
      id: "KEMARAHAN SELEKTIF",
      de: "SITUATIVER GROLL",
      fr: "RANCUNE SÉLECTIVE",
      es: "RESQUEMOR PUNTUAL"
    }
  },
  {
    level: "chronic_grudge_holding",
    scoreRange: [18, 25],
    title: {
      en: "Moderate Resentment & Injustice Rumination Loop",
      id: "Resentment Sedang & Lingkaran Ruminasi Ketidakadilan",
      de: "Chronischer Groll & Gerechtigkeits-Grübelkreislauf",
      fr: "Ressentiment Modéré & Boucle Ruminative d'Injustice",
      es: "Resentimiento Moderado y Bucle de Rumiación"
    },
    summary: {
      en: "You are caught in a persistent injustice replay loop. Betrayals from years ago continue to occupy significant mental real estate. You carry visceral tension when reminded of offenders and catch yourself mentally prosecuting them during daily routines.",
      id: "Kamu terjebak dalam lingkaran memutar ulang ketidakadilan. Pengkhianatan bertahun-tahun lalu masih menyita ruang pikiran yang besar. Tubuhmu menegang saat mengingat mereka dan kamu sering mengadili mereka dalam khayalan.",
      de: "Sie stecken in einer Grübelschleife fest. Alte Verletzungen fordern viel mentale Energie; Gedanken an die Verursacher erzeugen spürbare körperliche Anspannung und stumme Anklagen.",
      fr: "Vous êtes enfermé dans une boucle d'injustice. Des offenses anciennes continuent d'occuper une place mentale considérable, générant des tensions corporelles et des procès intérieurs répétés.",
      es: "Estás atrapado en un bucle mental de injusticia. Agravios de hace años te roban mucha energía cotidiana; repasas los hechos sintiendo tensión física y sed de justicia."
    },
    neurobiology: {
      en: "Dr. Fred Luskin's Stanford Forgiveness Project model. The brain treats unresolved grievances as an active survival emergency, locking default mode network (DMN) pathways in chronic grievance rehearsal.",
      id: "Model Stanford Forgiveness Project Dr. Fred Luskin. Otak memperlakukan sakit hati lama sebagai kondisi darurat, mengunci DMN dalam latihan dendam terus-menerus.",
      de: "Modell des Stanford Forgiveness Project (Dr. Fred Luskin). Das Gehirn stuft ungelöste Kränkungen als Daueralarm ein und hält das Default Mode Network im Anklagemodus gefangen.",
      fr: "Modèle du Stanford Forgiveness Project (Dr Fred Luskin). Le cerveau traite la rancœur comme une urgence vitale, enfermant le réseau du mode par défaut dans la rumination.",
      es: "Modelo del Stanford Forgiveness Project (Dr. Fred Luskin). El cerebro percibe el daño del pasado como una amenaza actual, atrapando la red neuronal en litigios perpetuos."
    },
    actionProtocol: {
      en: [
        "Stanford Forgiveness Step: Forgive yourself for having been vulnerable, instead of demanding justice from a broken person.",
        "Somatic Tension Reset: When jaw clenches over past memories, actively drop your tongue from the roof of your mouth and drop shoulders.",
        "Uncensor your rage in Nuju: Speak your forbidden fury aloud into Nuju's encrypted audio journal to de-escalate the amygdala threat loop."
      ],
      id: [
        "Langkah Pengampunan Stanford: Maafkan dirimu sendiri karena pernah lengah, alih-alih menuntut keadilan dari orang yang bermasalah.",
        "Pelepasan Ketegangan Fisik: Saat rahang mengatup karena ingat masa lalu, turunkan lidah dari langit-langit mulut dan kendurkan bahu.",
        "Luapkan kemarahanmu di Nuju: Bicarakan amarah terpendammu ke jurnal suara Nuju untuk menenangkan amigdala."
      ],
      de: [
        "Stanford-Methode: Verzeihen Sie sich selbst Ihre damalige Arglosigkeit, anstatt Einsicht von unreifen Tätern zu fordern.",
        "Somatischer Reset: Bei Zähneknirschen bewusst die Zunge lockern und die Schultern tief sinken lassen.",
        "Wut bei Nuju aussprechen: Verbalisieren Sie Ihren Zorn im geschützten Sprachraum, um die Amygdala zu beruhigen."
      ],
      fr: [
        "Méthode Stanford : pardonnez-vous d'avoir été vulnérable plutôt que d'attendre la repentance de gens immatures.",
        "Désamorçage somatique : quand votre mâchoire se crispe, relâchez consciemment la langue et baissez les épaules.",
        "Libération vocale dans Nuju : videz votre fiel dans l'espace vocal chiffré de Nuju pour apaiser l'alarme nerveuse."
      ],
      es: [
        "Paso Stanford: perdónate por haber sido ingenuo o confiado en su día, en vez de esperar disculpas de personas dañadas.",
        "Alivio somático: al notar la mandíbula apretada, despega conscientemente la lengua del paladar y relaja los hombros.",
        "Descarga tu furia en Nuju: habla de tu rabia sin censura en el diario de voz de Nuju para apagar el bucle de alerta."
      ]
    },
    badge: {
      en: "JUSTICE SEEKER",
      id: "PEMBURU KEADILAN",
      de: "GERECHTIGKEITSSUCHER",
      fr: "JUSTICIER ENFERMÉ",
      es: "CAUTIVO DEL AGRAVIO"
    }
  },
  {
    level: "somatic_bitterness_corrosion",
    scoreRange: [26, 31],
    title: {
      en: "High Bitterness Hardening & Autonomic Inflammation",
      id: "Pengerasan Kepahitan Berat & Inflamasi Otonom",
      de: "Verbitterungspanzer & Chronische Entzündung",
      fr: "Amertume Enracinée & Cuirasse Hostile",
      es: "Amargura Enquistada y Coraza Defensiva"
    },
    summary: {
      en: "Your system has calcified around your wounds. Resentment is no longer just a thought; it is an omnipresent somatic armor: tight jaw, sleep fragmentation, and reflex cynicism. You view humanity with deep skepticism and use anger as your primary protective shield.",
      id: "Sistem sarafmu telah membatu di sekitar luka batinmu. Dendam bukan lagi sekadar pikiran, melainkan baju zirah fisik: rahang kaku, tidur gelisah, dan sinisme tajam. Kamu memandang manusia dengan curiga dan menjadikan amarah sebagai benteng utama.",
      de: "Ihre seelischen Wunden haben sich verpanzert. Der Groll ist somatisiert: Kieferblockaden, Schlafstörungen und Dauermisstrauen. Zorn dient als einziger Schutzschild.",
      fr: "Votre rancœur s'est enkystée dans votre physiologie. Elle se manifeste par une cuirasse musculaire permanente, des insomnies et une méfiance réflexe envers autrui.",
      es: "Tu sistema se ha acorazado en torno al dolor. El rencor se ha somatizado en mandíbula bloqueada, sueño ligero y desconfianza crónica hacia la gente."
    },
    neurobiology: {
      en: "Chronic sympathetic hyperarousal and elevated systemic inflammatory markers (IL-6, CRP). The cardiovascular and immune systems remain taxed by constant hostility signaling.",
      id: "Hiperarousal simpatik kronis dan peningkatan penanda inflamasi sistemik (IL-6, CRP). Jantung dan sistem imun terkuras akibat sinyal permusuhan tanpa henti.",
      de: "Chronischer sympathischer Dauerstress mit erhöhten Entzündungsmarkern (IL-6, CRP). Herz-Kreislauf- und Immunsystem leiden unter dauerhafter Feindseligkeit.",
      fr: "Hyper-activation sympathique chronique et hausse des biomarqueurs inflammatoires. Le système cardio-vasculaire s'épuise sous la pression d'une hostilité permanente.",
      es: "Hiperactivación simpática crónica e inflamación sistémica elevada (IL-6, PCR). Tu corazón y sistema inmune pagan el peaje de la hostilidad continua."
    },
    actionProtocol: {
      en: [
        "Shift from Resentment to Boundaries: Realize that holding a grudge does not protect you; firm, dispassionate boundaries protect you.",
        "Vocal Phonation Decompression: Hum low frequencies on long exhalations to stimulate the vagal nerve and discharge chest tension.",
        "Confess Forbidden Bitterness in Nuju: Speak your rawest, darkest desires for vengeance into Nuju's encrypted private audio sanctuary to release the biological poison."
      ],
      id: [
        "Ubah Dendam Menjadi Batasan Tegas: Sadari bahwa memendam sakit hati tidak melindungimu; batasan yang tegas dan dinganlah yang menjagamu.",
        "Dengungan Relaksasi Vagus: Buat suara 'hum' rendah saat menghembuskan nafas panjang untuk melemaskan otot dada.",
        "Keluarkan Dendam Tergelap di Nuju: Bicarakan dendam dan keinginan karma tergelapmu ke brankas suara Nuju tanpa rasa malu demi membuang racun biologis ini."
      ],
      de: [
        "Vom Groll zu kühlen Grenzen: Begreifen Sie, dass Bitterkeit Sie nicht schützt – nur klare, nüchterne Grenzziehung tut es.",
        "Vagale Stimm-Entlastung: Tiefes Summen bei langer Ausatmung baut Brust- und Kieferpanzer ab.",
        "Dunkle Rachegedanken bei Nuju abladen: Sprechen Sie Ihre verbotenen Impulse im geschützten Sprachraum aus, um das Gift aus dem Körper zu leiten."
      ],
      fr: [
        "Transformez la rancœur en limites : la haine ne protège pas ; seules des frontières nettes et calmes vous préservent.",
        "Stimulation vagale par le son : fredonnez des notes graves sur de longues expirations pour détendre le thorax.",
        "Déposez vos souhaits de vengeance dans Nuju : exprimez vos pensées les plus sombres dans le sanctuaire chiffré de Nuju pour purger ce poison biologique."
      ],
      es: [
        "Cambia el rencor por límites firmes: la amargura no te defiende; los límites fríos y contundentes son tu verdadero escudo.",
        "Estimulación vagal sonora: emite un zumbido grave con exhalaciones lentas para aflojar la coraza torácica.",
        "Descarga tus deseos de venganza en Nuju: habla de tus pensamientos más oscuros en el refugio privado de Nuju para drenar el veneno somático."
      ]
    },
    badge: {
      en: "HOSTILE ARMOR",
      id: "ZIRAH KEMARAHAN",
      de: "VERBITTERUNGSPANZER",
      fr: "CUIRASSE D'AMERTUME",
      es: "CORAZA DE RENCOR"
    }
  },
  {
    level: "toxic_hostility_calcification",
    scoreRange: [32, 36],
    title: {
      en: "Severe Resentment Calcification & Chronic Grudge Armor",
      id: "Kalsifikasi Dendam Akut & Belenggu Kepahitan Kronis",
      de: "Schwere Grollverkalkung & Toxische Verbitterung",
      fr: "Calcification Toxique du Ressentiment & Hostilité Sévère",
      es: "Petrificación del Rencor y Amargura Tóxica Total"
    },
    summary: {
      en: "You are living inside a toxic fortress of chronic bitterness. Past betrayals have hijacked your identity, poisoning your health, your relationships, and your ability to experience peace. You are holding burning coals with both hands, unable to drop them because fury is the only thing that keeps you feeling powerful.",
      id: "Kamu hidup di dalam benteng beracun kepahitan kronis. Sakit hati masa lalu telah membajak identitasmu, merusak kesehatan fisik, dan menghancurkan kedamaian batin. Kamu menggenggam bara api panas dengan kedua tangan, tak sanggup melepasnya karena amarah adalah satu-satunya sumber kekuatanmu.",
      de: "Sie leben in einer Festung aus toxischer Verbitterung. Vergangene Ungerechtigkeiten haben Ihre Identität gekapert und vergiften Gesundheit und Beziehungen. Sie halten glühende Kohlen in den Händen, aus Angst, ohne die Wut schwach zu sein.",
      fr: "Vous êtes emmuré dans une forteresse d'amertume destructrice. Le ressentiment a colonisé votre identité, ravageant votre santé et vos relations. Vous serrez des braises ardentes de peur de redevenir impuissant.",
      es: "Vives recluido en una fortaleza tóxica de rencor absoluto. El pasado ha secuestrado tu identidad, dañando tu salud y tus vínculos. Sostienes brasas al rojo vivo porque la furia es lo único que te hace sentir fuerte."
    },
    neurobiology: {
      en: "Severe autonomic allostatic load. The amygdala and insula operate in permanent hostility loops, causing chronic hypertension, digestive dysregulation, bruxism, and profound social alienation.",
      id: "Beban alostatik otonom yang parah. Amigdala dan insula bekerja dalam mode permusuhan permanen, memicu hipertensi kronis, gangguan pencernaan, bruxism, dan keterasingan sosial total.",
      de: "Schwere allostatische Überlastung des Nervensystems. Dauerhafte Überaktivität von Amygdala und Insula mit Bluthochdruck, Reizdarmsymptomen und seelischer Vereinsamung.",
      fr: "Charge allostatique sévère. L'amygdale et l'insula tournent en boucle hostile, provoquant hypertension, troubles digestifs chroniques et isolement affectif profond.",
      es: "Sobrecarga alostática severa. Amígdala e ínsula operan en alerta hostil continua, generando hipertensión, problemas digestivos, bruxismo y aislamiento."
    },
    actionProtocol: {
      en: [
        "Consult a Trauma & Forgiveness Specialist (trained in Enright or Luskin clinical forgiveness models).",
        "Acknowledge the True Cost: Write down what holding this grudge has stolen from you: years of sleep, healthy intimacy, and physical health.",
        "Purge the Toxic Burn in Nuju: Speak every unexpressed scream, curse, and tear into Nuju's zero-knowledge encrypted voice vault where your rage is contained safely."
      ],
      id: [
        "Konsultasikan dengan Terapis Trauma & Duka (yang memahami model pengampunan klinis Enright/Luskin).",
        "Hitung Kerugian Nyatamu: Tuliskan apa saja yang telah dirampas oleh dendam ini: waktu tidur, hubungan yang sehat, dan kesehatan jantungmu.",
        "Kuras Habis Racun di Nuju: Bicarakan setiap teriakan, kutukan, dan tangisan yang tak tersampaikan ke brankas audio Nuju yang terenkripsi aman."
      ],
      de: [
        "Therapeutische Unterstützung suchen (Fokus auf Vergebungs- und Traumatherapie nach Enright/Luskin).",
        "Die wahren Kosten beziffern: Listen Sie auf, was dieser Groll Sie gekostet hat: Schlaf, Gesundheit und Herzenswärme.",
        "Toxische Wut bei Nuju entladen: Schreien, weinen und sprechen Sie die Bitterkeit im privaten Sprachraum heraus, um das Nervensystem zu entlasten."
      ],
      fr: [
        "Consultez un thérapeute spécialisé dans la gestion du trauma et du pardon clinique (modèle Enright/Luskin).",
        "Mesurez le coût réel : notez ce que ce ressentiment vous a volé (votre sommeil, vos relations, votre santé).",
        "Purgez le venin dans Nuju : criez, pleurez et formulez toute votre rage dans le coffre vocal chiffré de Nuju en totale sécurité."
      ],
      es: [
        "Busca ayuda profesional especializada en trauma y terapia del perdón clínico (modelos Enright o Luskin).",
        "Calcula el coste real: escribe todo lo que este rencor te ha quitado: años de sueño, salud física y capacidad de amar.",
        "Purga el veneno en Nuju: habla, grita y desahoga toda tu furia reprimida en el búnker de voz privado y cifrado de Nuju."
      ]
    },
    badge: {
      en: "CALCIFIED GRUDGE",
      id: "DENDAM MEMBATU",
      de: "TOXISCH VERBITTERT",
      fr: "RANCŒUR ENKYSTÉE",
      es: "RENCOR PETRIFICADO"
    }
  }
];

export const CHRONIC_RESENTMENT_OPTIONS = [
  {
    value: 0,
    label: {
      en: "Never / Rarely",
      id: "Tidak Pernah / Jarang",
      de: "Nie / Selten",
      fr: "Jamais / Rarement",
      es: "Nunca / Rara vez"
    }
  },
  {
    value: 1,
    label: {
      en: "Sometimes",
      id: "Kadang-kadang",
      de: "Manchmal",
      fr: "Parfois",
      es: "A veces"
    }
  },
  {
    value: 2,
    label: {
      en: "Often",
      id: "Sering",
      de: "Oft",
      fr: "Souvent",
      es: "A menudo"
    }
  },
  {
    value: 3,
    label: {
      en: "Almost Always / Constant",
      id: "Hampir Selalu / Terus-menerus",
      de: "Fast immer / Ständig",
      fr: "Presque toujours / En permanence",
      es: "Casi siempre / Constante"
    }
  }
];

export const CHRONIC_RESENTMENT_SUBSCALE_INFO = {
  injustice_rumination_replay: {
    name: {
      en: "Injustice Rumination & Replay Loop",
      id: "Ruminasi Ketidakadilan & Putaran Kaset Masa Lalu",
      de: "Ungerechtigkeits-Grübeln & Gedankenspirale",
      fr: "Rumination d'Injustice & Procès Imaginaires",
      es: "Rumiación de Injusticia y Litigio Mental"
    },
    description: {
      en: "Imaginary courtroom battles, resistance to letting go, revenge daydreams, and reviewing old evidence to justify anger.",
      id: "Berdebat di dalam kepala, enggan memaafkan karena takut kalah, membayangkan karma buruk lawan, dan mengumpulkan bukti masa lalu.",
      de: "Gedankliche Gerichtsprozesse, Weigerung zu verzeihen, Rachefantasien und Durchforsten alter Belege.",
      fr: "Procès intérieurs sous la douche, refus de pardonner par fierté, fantasmes de revanche et relecture d'anciens griefs.",
      es: "Discusiones ficticias en la mente, resistencia al perdón, fantasías de revancha y revisión constante del agravio."
    }
  },
  somatic_bitterness_poisoning: {
    name: {
      en: "Somatic Bitterness & Visceral Poisoning",
      id: "Kepahitan Fisik & Racun Tubuh Somatik",
      de: "Somatische Verbitterung & Körperliche Vergiftung",
      fr: "Amertume Somatique & Empoisonnement Viscéral",
      es: "Amargura Somática y Desgaste Físico"
    },
    description: {
      en: "Clenched jaw, knotted gut, racing pulse when triggered, morning rage surges, and muted capacity for joy.",
      id: "Rahang mengatup, perut melilit, jantung berdebar saat ingat nama pelaku, terbangun marah subuh, dan tumpulnya rasa bahagia.",
      de: "Kieferkrämpfe, Magenstechen, Herzrasen bei Erinnerungen, morgendlicher Zorn und Verlust von Lebensfreude.",
      fr: "Crispations de mâchoire, brûlures d'estomac, réveils nocturnes enragés et étouffement de la joie de vivre.",
      es: "Mandíbula bloqueada, nudo estomacal, pulso desbocado al recordar, despertares con furia y gozo apagado."
    }
  },
  hostility_defense_hardening: {
    name: {
      en: "Hostility Armor & Defensive Cynicism",
      id: "Zirah Permusuhan & Sinisme Defensif",
      de: "Feindseligkeitspanzer & Defensiver Zynismus",
      fr: "Cuirasse d'Hostilité & Cynisme Défensif",
      es: "Coraza de Hostilidad y Cinismo Defensivo"
    },
    description: {
      en: "Cynicism toward friendly people, strict mental ledgers, anger used as emotional armor, and social isolation.",
      id: "Mencurigai kebaikan orang lain, mencatat kesalahan relasi dengan kaku, menjadikan amarah sebagai benteng, dan merasa kesepian.",
      de: "Misstrauen gegenüber Freundlichkeit, Buchführung über Gefälligkeiten, Zorn als Rüstung und Vereinsamung.",
      fr: "Méfiance instinctive, tenue de comptes affectifs rigides, colère comme bouclier et isolement relationnel.",
      es: "Desconfianza ante la amabilidad ajena, contabilidad mental estricta, furia como escudo y soledad progresiva."
    }
  }
};

export function getChronicResentmentResult(totalScore: number): ChronicResentmentResultLevel {
  const matched = CHRONIC_RESENTMENT_RESULTS.find(
    (lvl) => totalScore >= lvl.scoreRange[0] && totalScore <= lvl.scoreRange[1]
  );
  return matched || CHRONIC_RESENTMENT_RESULTS[CHRONIC_RESENTMENT_RESULTS.length - 1];
}

export function calculateChronicResentmentSubscales(answers: Record<number, number>): {
  injustice_rumination_replay: number;
  somatic_bitterness_poisoning: number;
  hostility_defense_hardening: number;
} {
  let injustice_rumination_replay = 0;
  let somatic_bitterness_poisoning = 0;
  let hostility_defense_hardening = 0;

  CHRONIC_RESENTMENT_QUESTIONS.forEach((q) => {
    const val = answers[q.id] || 0;
    if (q.subscale === "injustice_rumination_replay") injustice_rumination_replay += val;
    if (q.subscale === "somatic_bitterness_poisoning") somatic_bitterness_poisoning += val;
    if (q.subscale === "hostility_defense_hardening") hostility_defense_hardening += val;
  });

  return { injustice_rumination_replay, somatic_bitterness_poisoning, hostility_defense_hardening };
}
