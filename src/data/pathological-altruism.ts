export type PathologicalAltruismCardLang = "en" | "id" | "de" | "fr" | "es";

export interface PathologicalAltruismQuestion {
  id: number;
  subscale: "destructive_rescuing_compulsion" | "enabler_boundary_erosion" | "martyrdom_depletion";
  text: {
    en: string;
    id: string;
    de: string;
    fr: string;
    es: string;
  };
}

export interface PathologicalAltruismResultLevel {
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
  psychology: {
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

export const PATHOLOGICAL_ALTRUISM_QUESTIONS: PathologicalAltruismQuestion[] = [
  // 1. Destructive Rescuing Compulsion (Q1 - Q4)
  {
    id: 1,
    subscale: "destructive_rescuing_compulsion",
    text: {
      en: "I routinely sacrifice my own financial security, physical health, or career to 'save' someone who repeatedly makes reckless or self-destructive choices.",
      id: "Aku terbiasa mengorbankan tabungan pribadi, kesehatan fisik, atau karir demi 'menyelamatkan' orang lain yang terus mengulangi keputusan gegabah.",
      de: "Ich opfere regelmäßig meine finanzielle Sicherheit oder Gesundheit, um jemanden zu 'retten', der sich selbstzerstörerisch verhält.",
      fr: "Je sacrifie couramment ma sécurité financière ou ma santé pour « sauver » quelqu'un qui persiste dans des choix autodestructeurs.",
      es: "Sacrifico con frecuencia mis ahorros, salud física o carrera para 'salvar' a personas que toman decisiones autodestructivas continuas."
    }
  },
  {
    id: 2,
    subscale: "destructive_rescuing_compulsion",
    text: {
      en: "I feel an agonizing moral guilt if I don't step in to resolve other people's crises, believing that if they fail or suffer, it is personally my fault.",
      id: "Aku merasa sangat bersalah jika tidak turun tangan menyelesaikan masalah orang lain, menganggap jika mereka menderita maka itu adalah dosaku.",
      de: "Ich empfinde quälende Schuldgefühle, wenn ich Krisen anderer nicht löse, und glaube, für deren Leid persönlich verantwortlich zu sein.",
      fr: "Je ressens une culpabilité morale insoutenable si je n'interviens pas dans les crises des autres, croyant que leur échec est de ma faute.",
      es: "Siento una culpa atroz si no intervengo para apagar los incendios ajenos, creyendo que si sufren o fracasan es por mi culpa directa."
    }
  },
  {
    id: 3,
    subscale: "destructive_rescuing_compulsion",
    text: {
      en: "I feel an uncontrollable compulsion to intervene, fix, or offer unsolicited advice to struggling friends or partners, even when they haven't asked for help.",
      id: "Aku merasakan dorongan tak tertahankan untuk campur tangan, memperbaiki, atau memberi solusi tanpa diminta kepada orang yang tampak kesulitan.",
      de: "Ich spüre den unbezähmbaren Drang, mich einzumischen und Ratschläge zu erteilen, selbst wenn mich niemand um Hilfe gebeten hat.",
      fr: "J'éprouve une compulsion irrépressible à réparer la vie des autres ou à leur donner des solutions, même sans qu'on me l'ait demandé.",
      es: "Siento una compulsión incontrolable por arreglar la vida de amigos o parejas y dar consejos no pedidos, incluso si no me han pedido ayuda."
    }
  },
  {
    id: 4,
    subscale: "destructive_rescuing_compulsion",
    text: {
      en: "I cancel my own medical check-ups, sleep, or basic self-care routines to handle minor emotional dramas or errands for other adults.",
      id: "Aku membatalkan janji dokter, mengorbankan jam tidur, atau mengabaikan makan demi mengurus masalah sepele orang dewasa lain.",
      de: "Ich vernachlässige Arzttermine, Schlaf oder Grundbedürfnisse, um alltägliche Dramen anderer erwachsener Menschen abzufedern.",
      fr: "J'annule mes rendez-vous médicaux et sacrifie mon sommeil pour gérer les drames ou les corvées d'autres adultes autonomes.",
      es: "Pospongo citas médicas, horas de descanso o mi propia alimentación para atender los dramas o tareas de otros adultos funcionales."
    }
  },

  // 2. Enabler Boundary Erosion (Q5 - Q8)
  {
    id: 5,
    subscale: "enabler_boundary_erosion",
    text: {
      en: "I shield family members or partners from the natural, painful consequences of their addictions, debts, or bad behavior, calling it 'love' when it is actually enabling.",
      id: "Aku melindungi pasangan atau keluarga dari konsekuensi utang, kecanduan, atau kemalasan mereka, mengira itu 'kasih sayang' padahal memanjakan kekacauan mereka.",
      de: "Ich schütze Nahestehende vor den Konsequenzen ihrer Süchte oder Schulden und nenne es 'Liebe', obwohl ich ihr Fehlverhalten nur ermögliche.",
      fr: "Je protège mes proches des conséquences de leurs dettes ou addictions, appelant cela de « l'amour » alors qu'il s'agit de facilitation toxique.",
      es: "Protejo a mis familiares o parejas de las consecuencias de sus deudas o adicciones, llamándolo 'amor' cuando en realidad perpetúo su disfunción."
    }
  },
  {
    id: 6,
    subscale: "enabler_boundary_erosion",
    text: {
      en: "I have covered up mistakes, lied to employers, or made excuses to police/creditors on behalf of someone else to protect them from accountability.",
      id: "Aku pernah menutupi kebohongan, berbohong pada bos, atau mencari alasan kepada pihak luar demi melindungi orang lain dari tanggung jawab.",
      de: "Ich habe schon gelogen, Fehler vertuscht oder Ausreden erfunden, um jemand anderen vor den Konsequenzen seines Handelns zu bewahren.",
      fr: "J'ai déjà menti, couvert des fautes ou inventé des excuses auprès d'employeurs pour éviter à un proche d'assumer ses responsabilités.",
      es: "He tapado errores, mentido a terceros o justificado negligencias ajenas para evitar que esa persona tenga que dar explicaciones."
    }
  },
  {
    id: 7,
    subscale: "enabler_boundary_erosion",
    text: {
      en: "Setting a firm boundary or saying 'no' to a request for help makes me feel like a monster who is abandoning a helpless human being.",
      id: "Menolak permintaan tolong atau berkata 'tidak' membuatku merasa seperti orang jahat yang tega menelantarkan orang yang tak berdaya.",
      de: "Eine klare Grenze zu ziehen oder 'Nein' zu sagen, fühlt sich für mich an, als wäre ich ein herzloses Monster, das jemanden im Stich lässt.",
      fr: "Poser une limite ferme ou dire « non » me donne l'impression d'être un monstre cruel qui abandonne une personne sans défense.",
      es: "Poner un límite firme o decir 'no' a una petición de ayuda me hace sentir como un monstruo desalmado que abandona a un indefenso."
    }
  },
  {
    id: 8,
    subscale: "enabler_boundary_erosion",
    text: {
      en: "I remain trapped in exhausting, one-sided, or manipulative relationships solely because I believe 'they cannot survive without me.'",
      id: "Aku bertahan dalam hubungan yang manipulatif dan melelahkan hanya karena meyakini bahwa 'dia tidak akan sanggup hidup tanpa diriku.'",
      de: "Ich bleibe in auslaugenden, ungesunden Beziehungen gefangen, einzig aus der Überzeugung: 'Ohne mich gehen sie zugrunde.'",
      fr: "Je reste enfermé dans des relations toxiques et asymétriques uniquement parce que je suis persuadé que « l'autre ne survivra pas sans moi ».",
      es: "Permanezco atrapado en relaciones abusivas o agotadoras solo por la creencia ciega de que 'esa persona no saldrá adelante sin mí'."
    }
  },

  // 3. Martyrdom Depletion & Hidden Resentment (Q9 - Q12)
  {
    id: 9,
    subscale: "martyrdom_depletion",
    text: {
      en: "I am physically and emotionally depleted from caretaking, yet taking an hour to do something purely for my own pleasure feels morally dirty or selfish.",
      id: "Tubuh dan jiwaku terkuras habis karena terus melayani orang lain, namun meluangkan satu jam demi kesenangan pribadi membuatku merasa berdosa.",
      de: "Ich bin von der Fürsorge völlig ausgebrannt; mir Zeit nur für mich selbst zu nehmen, fühlt sich jedoch egoistisch und verwerflich an.",
      fr: "Je suis au bout du rouleau à force d'aider, mais m'accorder une heure de plaisir personnel me semble être un égoïsme coupable.",
      es: "Estoy exhausto de cuidar y resolver la vida ajena, pero tomarme una hora para mi propio disfrute me parece un pecado egoísta."
    }
  },
  {
    id: 10,
    subscale: "martyrdom_depletion",
    text: {
      en: "Beneath my self-sacrificing behavior, a bitter undercurrent of resentment boils because the people I rescue never check on how I am doing.",
      id: "Di balik sikap relaku berkorban, tersimpan dendam dan kekesalan mendalam karena orang-orang yang kubantu tak pernah memikirkan keadaanku.",
      de: "Hinter meiner Aufopferung brodelt heimliche Bitterkeit, weil die Menschen, die ich rette, sich nie ehrlich nach meinem Befinden erkundigen.",
      fr: "Sous mon dévouement de façade, une sourde rancœur bouillonne car ceux que je sauve ne s'inquiètent jamais de savoir comment je vais.",
      es: "Bajo mi entrega abnegada arde un resentimiento amargo, porque las personas a las que siempre rescato jamás me preguntan cómo estoy."
    }
  },
  {
    id: 11,
    subscale: "martyrdom_depletion",
    text: {
      en: "My sense of identity and self-worth is entirely tied to being the indispensable fixer, hero, or martyr who holds everyone else together.",
      id: "Harga diriku sepenuhnya bergantung pada peran sebagai pahlawan serba bisa yang menjadi penyelamat bagi keluarga atau lingkaran sosialku.",
      de: "Mein Selbstwert hängt komplett daran, der unentbehrliche Retter oder Märtyrer zu sein, der alle anderen zusammenhält.",
      fr: "Mon identité et mon estime personnelle reposent entièrement sur le rôle du sauveur indispensable qui porte tout le monde sur ses épaules.",
      es: "Mi autoestima depende por completo de ser el salvador indispensable, el pilar o el mártir que sostiene a todos a flote."
    }
  },
  {
    id: 12,
    subscale: "martyrdom_depletion",
    text: {
      en: "If I stopped rescuing, solving, and sacrificing for others, I have no idea who I am, what I want, or how to navigate my own life.",
      id: "Jika aku berhenti menolong dan mengorbankan diri untuk orang lain, aku tidak tahu lagi siapa diriku, apa impianku, dan bagaimana menjalani hidupku sendiri.",
      de: "Wenn ich aufhören würde, für andere da zu sein und Krisen zu lösen, wüsste ich überhaupt nicht mehr, wer ich bin und was ich vom Leben will.",
      fr: "Si j'arrêtais de sauver et de me sacrifier pour autrui, je n'aurais aucune idée de qui je suis ni de ce que je désire pour ma propre vie.",
      es: "Si dejara de rescatar y resolver los problemas ajenos, no tendría ni idea de quién soy, qué deseo ni qué hacer con mi propia vida."
    }
  }
];

export const PATHOLOGICAL_ALTRUISM_RESULTS: PathologicalAltruismResultLevel[] = [
  {
    level: "healthy_empathy_boundaries",
    scoreRange: [0, 9],
    title: {
      en: "Healthy Empathy & Autonomous Giving",
      id: "Empati Sehat & Kedermawanan Mandiri",
      de: "Gesunde Empathie & Selbstbestimmte Fürsorge",
      fr: "Empathie Saine & Don de Soi Équilibré",
      es: "Empatía Saludable y Generosidad Autónoma"
    },
    summary: {
      en: "Your compassion operates with healthy discernment. You help others from a place of genuine abundance without sacrificing your personal health, financial stability, or enabling destructive patterns in others.",
      id: "Empatimu beroperasi dengan kebijaksanaan sehat. Kamu menolong orang lain dari kelimpahan batin yang tulus tanpa mengorbankan kesehatan pribadi atau memanjakan tabiat buruk mereka.",
      de: "Ihre Fürsorge ist gesund ausbalanciert. Sie helfen aus ehrlicher Freude, ohne Ihre eigene Stabilität zu ruinieren oder schädliches Verhalten zu fördern.",
      fr: "Votre compassion s'exerce avec lucidité. Vous aidez sans vous épuiser, préservant votre intégrité et refusant d'alimenter la dépendance d'autrui.",
      es: "Tu compasión funciona con discernimiento. Ayudas desde la abundancia genuina sin inmolar tu salud, tu economía ni alimentar hábitos destructivos ajenos."
    },
    psychology: {
      en: "Differentiated self-identity. As Dr. Rachel Naomi Remen notes: 'Helping, fixing, and serving represent three different ways of seeing life. When you help, you see life as weak; when you fix, you see life as broken; when you serve, you see life as whole.'",
      id: "Kemandirian batin yang matang. Dr. Rachel Naomi Remen menekankan bahwa melayani sesama lahir dari memandang orang lain utuh dan berdaya, bukan korban lemah yang harus terus disuapi.",
      de: "Differenziertes Selbst. Dienen statt Retten nach Dr. Rachel Naomi Remen: Sie begegnen anderen auf Augenhöhe, anstatt sie als hilflos zu entmündigen.",
      fr: "Maturité relationnelle. Vous comprenez que le secours compulsif infantilise l'autre, tandis que la présence respectueuse honore ses capacités.",
      es: "Diferenciación sana del yo. Según la Dra. Rachel Naomi Remen, servir a otros nace de verlos completos y capaces, no como víctimas que rescatar."
    },
    actionProtocol: {
      en: [
        "Continue honoring your personal non-negotiables: sleep, finances, and joy.",
        "Celebrate when loved ones solve their own challenges without your intervention.",
        "Maintain emotional hygiene with Nuju voice journaling."
      ],
      id: [
        "Pertahankan batasan utamamu: waktu tidur, keuangan pribadi, dan kebahagiaanmu.",
        "Rayakan saat orang terdekatmu berhasil memecahkan masalahnya sendiri tanpa campur tanganmu.",
        "Rawat kesehatan emosionalmu lewat jurnal suara Nuju."
      ],
      de: [
        "Wahren Sie Ihre Prioritäten: Schlaf, Finanzen und persönliche Freude.",
        "Freuen Sie sich, wenn Nahestehende Probleme eigenständig meistern.",
        "Pflegen Sie Ihre emotionale Klarheit im Nuju-Sprachjournal."
      ],
      fr: [
        "Préservez vos piliers vitaux : sommeil, sécurité financière et loisirs.",
        "Laissez vos proches savourer la fierté de surmonter leurs épreuves seuls.",
        "Maintenez votre équilibre intérieur avec le journal vocal Nuju."
      ],
      es: [
        "Conserva tus prioridades innegociables: descanso, finanzas y tiempo propio.",
        "Celebra cuando tus seres queridos resuelven sus desafíos por sí mismos.",
        "Sostén tu higiene mental mediante el diario de voz Nuju."
      ]
    },
    badge: {
      en: "BALANCED EMPATH",
      id: "EMPATI SEIMBANG",
      de: "AUSGEWOGENE FÜRSORGE",
      fr: "EMPATHIE ÉQUILIBRÉE",
      es: "EMPATÍA EQUILIBRADA"
    }
  },
  {
    level: "generosity_overextension",
    scoreRange: [10, 17],
    title: {
      en: "Mild Over-Giving & Situational Rescuing",
      id: "Kedermawanan Berlebih & Refleks Menolong Sesaat",
      de: "Leichte Selbstüberlastung & Gelegentliches Retten",
      fr: "Dévouement Excessif & Réflexe de Sauvetage Ponctuel",
      es: "Generosidad Excesiva y Rescate Ocasional"
    },
    summary: {
      en: "You have a strong helper instinct that occasionally tips into overextension. You occasionally feel guilty saying no or find yourself solving problems for capable adults, leading to mild exhaustion and fleeting resentment.",
      id: "Kamu memiliki naluri penolong yang kuat yang terkadang membuatmu kelelahan. Kamu sesekali merasa bersalah menolak bantuan, memicu rasa lelah dan kesal kecil.",
      de: "Ihr Helfersyndrom flammt situationsbedingt auf. Sie neigen dazu, anderen Probleme abzunehmen, was gelegentlich zu Frust und Erschöpfung führt.",
      fr: "Votre générosité déborde parfois sur votre bien-être. Vous avez du mal à dire non, ce qui provoque des moments de fatigue et un léger ressentiment.",
      es: "Tu vocación de ayuda a veces cruza la línea del cansancio. Te cuesta decir que no en ocasiones, acumulando sobrecarga y cierto reproche interno."
    },
    psychology: {
      en: "Situational over-identification with the helper role. You sometimes mistake interpersonal discomfort for moral urgency, jumping in to fix things to soothe your own anxiety.",
      id: "Over-identifikasi situasional dengan peran penolong. Kamu kadang keliru mengira rasa tidak enak sebagai kewajiban moral, buru-buru menolong hanya demi meredakan kecemasanmu sendiri.",
      de: "Situative Überidentifikation mit der Helferrolle. Sie greifen ein, um die eigene Anspannung bei fremdem Unbehagen abzubauen.",
      fr: "Sur-implication ponctuelle. Vous intervenez souvent pour calmer votre propre anxiété face au malaise d'autrui plutôt que par réelle nécessité.",
      es: "Sobreidentificación situacional con el rol de salvador. A veces rescatas a otros para calmar tu propia incomodidad ante su dolor."
    },
    actionProtocol: {
      en: [
        "Implement the 24-Hour Helping Pause: When asked for a favor, always respond: 'Let me check my schedule and get back to you tomorrow.'",
        "Ask: 'Is this person capable of handling this without me?' If yes, step back.",
        "Vent your boundary anxiety into Nuju's voice journal before agreeing to help."
      ],
      id: [
        "Terapkan Jeda 24 Jam: Saat dimintai tolong, biasakan menjawab: 'Biar kucek jadwalku dulu ya, besok kukabari.'",
        "Tanyakan pada Diri Sendiri: 'Apakah orang ini mampu menyelesaikannya sendiri?' Jika ya, mundur selangkah.",
        "Curhatkan rasa bimbangmu di jurnal suara Nuju sebelum terburu-buru mengiyakan."
      ],
      de: [
        "Die 24-Stunden-Bedenkzeit: Antworten Sie bei Bitten stets: 'Ich prüfe meinen Kalender und melde mich morgen.'",
        "Fragen Sie sich: 'Könnte die Person das auch allein schaffen?' Wenn ja, halten Sie sich zurück.",
        "Sprechen Sie Ihre Gewissensbisse im Nuju-Sprachjournal aus, bevor Sie zusagen."
      ],
      fr: [
        "La pause de 24 heures : répondez systématiquement « Je regarde mon emploi du temps et je te dis demain ».",
        "Demandez-vous : « Cette personne est-elle capable de le faire seule ? » Si oui, abstenez-vous.",
        "Déposez votre peur de décevoir dans Nuju avant de promettre votre aide."
      ],
      es: [
        "La pausa de 24 horas: ante cualquier favor, responde: 'Reviso mi agenda y te confirmo mañana'.",
        "Pregúntate: '¿Es esta persona capaz de resolverlo por sí misma?' Si la respuesta es sí, retrocede.",
        "Vuelca tu culpa en el diario de voz de Nuju antes de decir que sí por inercia."
      ]
    },
    badge: {
      en: "EAGER RESCUER",
      id: "PENOLONG ANTUSIAS",
      de: "BEREITWILLIGER HELFER",
      fr: "SAUVEUR VOLONTAIRE",
      es: "RESCATADOR IMPULSIVO"
    }
  },
  {
    level: "compulsive_savior_trap",
    scoreRange: [18, 25],
    title: {
      en: "Compulsive Savior Trap & Pathological Altruism",
      id: "Jebakan Sindrom Penyelamat & Altruisme Patologis",
      de: "Chronisches Helfersyndrom & Pathologischer Altruismus",
      fr: "Syndrome du Sauveur Compulsif & Altruisme Pathologique",
      es: "Trampa del Salvador Compulsivo y Altruismo Patológico"
    },
    summary: {
      en: "You are caught in Dr. Barbara Oakley's model of Pathological Altruism: your instinct to help has become a compulsive, self-damaging drive. You routinely attract emotionally broken or irresponsible individuals and drain your life force attempting to rehabilitate them.",
      id: "Kamu terjebak dalam Altruisme Patologis (model Dr. Barbara Oakley): niat baikmu menolong telah menjadi candu yang merusak hidupmu. Kamu kerap memikat orang-orang bermasalah dan menguras energimu demi memperbaiki hidup mereka.",
      de: "Sie stecken im pathologischen Altruismus nach Dr. Barbara Oakley fest: Ihr Helfen schadet Ihnen selbst und hält andere in Unselbstständigkeit gefangen.",
      fr: "Vous souffrez d'altruisme pathologique selon le modèle du Dr Barbara Oakley : votre désir d'aider est devenu destructeur pour vous-même et infantilisant pour vos proches.",
      es: "Estás atrapado en el Altruismo Patológico según la Dra. Barbara Oakley: tu afán de ayudar se ha vuelto autodestructivo, atrayendo a personas rotas a quienes intentas rehabilitar."
    },
    psychology: {
      en: "Pathological Altruism and Savior Defense. Altruistic impulses hijack executive decision-making. Helping serves as an unconscious defense mechanism to avoid confronting your own internal emptiness, trauma, and identity needs.",
      id: "Altruisme Patologis dan Pertahanan Savior Complex. Memperbaiki hidup orang lain dijadikan pelarian bawah sadar agar kamu tidak perlu menghadapi kehampaan, luka batin, dan kebutuhan dirimu sendiri.",
      de: "Pathologischer Altruismus als Abwehrmechanismus. Das Lösen fremder Probleme dient unbewusst dazu, der eigenen inneren Leere und eigenen Traumata auszuweichen.",
      fr: "Altruisme pathologique comme défense psychique. Sauver autrui est une diversion inconsciente pour ne pas affronter votre propre vide intérieur.",
      es: "El altruismo como coraza defensiva. Resolver las vidas ajenas actúa como una cortina de humo para no mirar tu propio vacío, tus heridas y tus necesidades postergadas."
    },
    actionProtocol: {
      en: [
        "Radical Step-Back: Allow someone to experience the natural pain of their own mistakes—it is their curriculum, not yours.",
        "Name the Hidden Motive: Ask yourself honestly: 'What part of my own life am I avoiding by fixing this person?'",
        "Voice Journaling as Boundary Construction: Speak your raw fear of being called 'selfish' into Nuju's encrypted audio sanctuary."
      ],
      id: [
        "Mundur Total: Biarkan orang tersebut merasakan akibat dari kesalahannya sendiri—itu adalah kurikulum pendewasaan hidupnya, bukan tugasmu.",
        "Akui Motif Tersembunyi: Tanyakan pada diri sendiri: 'Bagian hidupku mana yang sedang kuhindari dengan sibuk mengurusi orang ini?'",
        "Bangun Batasan di Nuju: Bicarakan ketakutanmu dianggap 'egois' ke jurnal suara privat Nuju."
      ],
      de: [
        "Radikaler Rückzug: Lassen Sie andere die schmerzhaften Folgen eigener Fehler spüren – das ist deren Lernprozess, nicht Ihre Aufgabe.",
        "Das wahre Motiv benennen: 'Welcher Baustelle in meinem eigenen Leben weiche ich aus, indem ich diese Person rette?'",
        "Grenzen im Nuju-Sprachjournal erproben: Sprechen Sie Ihre Angst, als 'egoistisch' zu gelten, frei von der Leber weg aus."
      ],
      fr: [
        "Retrait salutaire : laissez l'autre affronter les retombées de ses erreurs ; c'est son apprentissage, pas votre dette.",
        "Nommez l'esquive : « Que fuis-je dans ma propre existence en m'occupant ainsi des affaires de cet adulte ? »",
        "Construisez vos limites dans Nuju : exprimez votre terreur d'être rejeté dans le sanctuaire vocal chiffré de Nuju."
      ],
      es: [
        "Retroceso saludable: permite que el otro sufra las consecuencias de sus actos; es su proceso vital de madurez, no tu penitencia.",
        "Destapa la evasión: '¿Qué vacío de mi propia vida estoy evitando mirar al obsesionarme con salvar a esta persona?'",
        "Reconstruye tus límites en Nuju: habla de tu miedo visceral a que te llamen egoísta en el diario de voz de Nuju."
      ]
    },
    badge: {
      en: "COMPULSIVE SAVIOR",
      id: "PAHLAWAN KOMPULSIF",
      de: "KOMPULSIVER RETTER",
      fr: "SAUVEUR COMPULSIF",
      es: "SALVADOR COMPULSIVO"
    }
  },
  {
    level: "destructive_enabling_depletion",
    scoreRange: [26, 31],
    title: {
      en: "Severe Enabling & Martyrdom Burnout",
      id: "Pembiaran Merusak & Kelelahan Menjadi Martir",
      de: "Schwere Co-Abhängigkeit & Märtyrer-Burnout",
      fr: "Facilitation Destructrice & Burnout du Martyr",
      es: "Facilitación Destructiva y Burnout del Mártir"
    },
    summary: {
      en: "Your helping has crossed into active enabling and martyrdom. You shield people from legal, financial, or emotional reality while burning your own life to the ground. You feel secretly bitter, trapped, and physically ill, yet convinced that walking away is a moral crime.",
      id: "Bantuanmu telah bermutasi menjadi pembiaran merusak (enabling) dan pengorbanan martir. Kamu membakar dirimu sendiri demi menyelamatkan orang yang menolak bertanggung jawab. Tubuhmu sakit, batinmu dendam, namun merasa berdosa jika berhenti.",
      de: "Ihre Fürsorge ist in schwere Co-Abhängigkeit umgeschlagen. Sie verbrennen Ihre eigene Existenz, um andere vor der Realität zu schützen. Körperlich erschöpft und verbittert, fühlen Sie sich dennoch zur Aufopferung verdammt.",
      fr: "Votre dévouement est devenu une complicité destructrice. Vous vous immolez pour épargner à autrui le principe de réalité. Épuisé et amer, vous croyez pourtant qu'abandonner serait impardonnable.",
      es: "Tu entrega se ha convertido en facilitación destructiva y martirio. Quemas tu propia vida para blindar a otros de la realidad. Estás exhausto y resentido, pero crees que soltar es un pecado."
    },
    psychology: {
      en: "Co-dependency and boundary dissolution. The nervous system is addicted to the dopamine-adrenaline roller coaster of crisis-management, using the martyr identity to avoid existential self-confrontation.",
      id: "Ketergantungan kodependen dan peleburan batas batin. Sistem sarafmu kecanduan adrenalin mengurus krisis orang lain, menggunakan topeng martir untuk lari dari menghadapi diri sendiri.",
      de: "Schwere Co-Abhängigkeit und Rollenauflösung. Das Nervensystem ist süchtig nach dem Krisenmanagement, um der Konfrontation mit der eigenen Person zu entgehen.",
      fr: "Codépendance sévère et dissolution des frontières. Votre système nerveux carbure à l'adrénaline des urgences d'autrui pour esquiver votre propre existence.",
      es: "Codependencia severa y pérdida de límites. Tu sistema nervioso se ha vuelto adicto a la montaña rusa de las crisis ajenas para no afrontar tu propia vida."
    },
    actionProtocol: {
      en: [
        "Drop the Rope: Immediately stop paying debts, lying to employers, or cleaning up crises for capable adults.",
        "Attend a Co-Dependents Anonymous (CoDA) or specialized boundary therapy group.",
        "Purge the Martyrdom Guilt in Nuju: Speak your raw fury, forbidden exhaustion, and longing to walk away into Nuju's zero-knowledge voice vault."
      ],
      id: [
        "Lepaskan Tali: Segera berhenti membayari utang, berbohong, atau membereskan kekacauan orang dewasa lain.",
        "Ikuti konseling kodependensi atau terapi batasan diri profesional.",
        "Keluarkan Rasa Bersalah di Nuju: Bicarakan kepenatanmu, amarah terpendam, dan keinginanmu untuk kabur ke jurnal suara Nuju."
      ],
      de: [
        "Das Seil loslassen: Hören Sie sofort auf, Schulden zu begleichen oder Ausreden für andere zu erfinden.",
        "Professionelle Hilfe oder Selbsthilfegruppen für Co-Abhängige (z.B. CoDA) in Anspruch nehmen.",
        "Märtyrer-Schuld bei Nuju entladen: Sprechen Sie Ihren Frust und den Wunsch nach Befreiung unzensiert im Sprachraum aus."
      ],
      fr: [
        "Lâchez la corde : cessez immédiatement d'éponger les dettes ou de couvrir les fautes d'autrui.",
        "Consultez un spécialiste de la codépendance ou rejoignez un groupe de parole type CoDA.",
        "Purgez votre culpabilité dans Nuju : confiez votre épuisement et vos envies de fuite dans l'espace vocal chiffré de Nuju."
      ],
      es: [
        "Suelta la cuerda: deja de pagar deudas ajenas, inventar coartadas o solucionar los desastres de otros adultos.",
        "Busca terapia especializada en codependencia o acude a grupos de apoyo (como CoDA).",
        "Descarga la culpa en Nuju: verbaliza tu hartazgo extremo y tus deseos de huir en el diario de voz confidencial de Nuju."
      ]
    },
    badge: {
      en: "MARTYR BURNOUT",
      id: "MARTIR TERKURAS",
      de: "MÄRTYRER-BURNOUT",
      fr: "BURNOUT DU MARTYR",
      es: "MÁRTIR AGOTADO"
    }
  },
  {
    level: "pathological_self_immolation",
    scoreRange: [32, 36],
    title: {
      en: "Pathological Self-Immolation & Total Identity Dissolution",
      id: "Pengorbanan Diri Ekstrem & Peleburan Identitas Total",
      de: "Pathologische Selbstaufgabe & Völlige Identitätsauflösung",
      fr: "Auto-Immolation Pathologique & Dissolution de l'Identité",
      es: "Autoinmolación Patológica y Pérdida Total de Identidad"
    },
    summary: {
      en: "You have completely immolated your own life on the altar of other people's dysfunction. You have no money left, no physical vitality, no boundaries, and no identity separate from being an emotional rescue animal. You are drowning while holding someone else's head above water.",
      id: "Kamu telah membakar habis hidupmu di atas mezbah kekacauan orang lain. Uangmu habis, kesehatan fisikmu ambruk, batasanmu lenyap, dan kamu tak tahu lagi siapa dirimu selain menjadi penyelamat penderitaan orang. Kamu sedang tenggelam demi menopang orang lain.",
      de: "Sie haben Ihre eigene Existenz auf dem Altar anderer Menschen geopfert. Finanzen, Gesundheit und Identität sind ruiniert. Sie ertrinken selbst, während Sie versuchen, andere über Wasser zu halten.",
      fr: "Vous avez entièrement immolé votre vie pour porter les fardeaux d'autrui. Vos ressources et votre santé sont anéanties. Vous coulez à pic en voulant maintenir quelqu'un d'autre hors de l'eau.",
      es: "Has inmolado tu propia vida en el altar de la disfunción ajena. Te has quedado sin ahorros, sin salud, sin límites y sin identidad propia. Te estás ahogando por sostener la cabeza de otro a flote."
    },
    neurobiology: {
      en: "Extreme allostatic collapse and autonomic nervous system exhaustion. The reward system is so severely hijacked by compulsive caretaking that self-preservation reflexes have been completely overridden.",
      id: "Keruntuhan alostatik ekstrem dan kelelahan sistem saraf total. Sirkuit dopamin telah sedemikian dibajak oleh candu menolong sehingga naluri bertahan hidup untuk diri sendiri padam total.",
      de: "Vollständiger allostatischer Kollaps. Das Belohnungssystem ist so massiv auf Helfen fixiert, dass natürliche Selbsterhaltungsinstinkte ausgeschaltet sind.",
      fr: "Effondrement allostatique majeur. Le système de récompense est tellement piraté par le sauvetage que votre instinct de survie personnel est anesthésié.",
      es: "Colapso alostático absoluto. El circuito de recompensa está tan secuestrado por el rescate crónico que el instinto de autopreservación se ha desactivado."
    },
    actionProtocol: {
      en: [
        "Emergency Intervention: Seek professional trauma therapy and financial/legal counsel immediately to separate your assets and life from the dependent party.",
        "Recognize True Cruelty: Acknowledge that preventing someone from hitting their rock bottom is keeping them trapped in their pathology.",
        "Voice Journaling as Re-Birth: Use Nuju's zero-knowledge encrypted audio sanctuary to scream, mourn, and begin reclaiming your own right to exist."
      ],
      id: [
        "Intervensi Darurat: Segera cari bantuan psikolog trauma dan konsultasi hukum/keuangan untuk memisahkan aset dan hidupmu dari pihak terkait.",
        "Sadarilah Kekejaman Nyata: Menghalangi seseorang menyentuh titik terendahnya (rock bottom) sama saja dengan mengurung mereka dalam kehancuran selamanya.",
        "Kelahiran Kembali di Nuju: Gunakan ruang privat terenkripsi Nuju untuk menangis, meratap, dan menuntut kembali hakmu untuk hidup merdeka."
      ],
      de: [
        "Notfall-Intervention: Suchen Sie sofort therapeutische und rechtliche Hilfe, um Ihre Finanzen und Ihr Leben abzutrennen.",
        "Echte Grausamkeit erkennen: Jemanden davor zu bewahren, den Tiefpunkt zu erreichen, verlängert dessen Leiden nur ins Unendliche.",
        "Wiedergeburt im Nuju-Sprachjournal: Nutzen Sie den geschützten Raum, um die eigene Existenzberechtigung laut und ohne Kompromisse zurückzufordern."
      ],
      fr: [
        "Intervention d'urgence : consultez un psychothérapeute et sécurisez vos finances pour couper les liens de dépendance.",
        "Comprenez la vraie cruauté : empêcher quelqu'un de toucher le fond, c'est l'enfermer à jamais dans sa maladie.",
        "Renaissance vocale dans Nuju : utilisez le sanctuaire chiffré de Nuju pour pleurer, crier et réclamer votre droit inaliénable à vivre pour vous-même."
      ],
      es: [
        "Intervención de emergencia: busca terapia especializada y asesoramiento legal/financiero urgente para blindar tus recursos y tu vida.",
        "Entiende la crueldad real: evitar que alguien toque fondo le impide despertar y lo condena a seguir atrapado en su destrucción.",
        "Renacer en Nuju: usa la bóveda privada de voz de Nuju para llorar, gritar y reclamar de una vez por todas tu derecho a existir para ti mismo."
      ]
    },
    badge: {
      en: "SELF-IMMOLATED",
      id: "PENGORBANAN TOTAL",
      de: "SELBSTAUFGABE",
      fr: "AUTO-IMMOLÉ",
      es: "AUTOINMOLADO"
    }
  }
];

export const PATHOLOGICAL_ALTRUISM_OPTIONS = [
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

export const PATHOLOGICAL_ALTRUISM_SUBSCALE_INFO = {
  destructive_rescuing_compulsion: {
    name: {
      en: "Destructive Rescuing Compulsion",
      id: "Kompulsi Penyelamatan yang Merusak",
      de: "Destruktiver Rettungsdrang",
      fr: "Compulsion Destructrice de Sauvetage",
      es: "Compulsión de Rescate Destructiva"
    },
    description: {
      en: "Sacrificing financial security/health, moral guilt over not fixing others, unsolicited advice, and cancelling self-care.",
      id: "Mengorbankan tabungan/kesehatan, rasa bersalah jika tidak menolong, memberi solusi tanpa diminta, dan mengabaikan diri.",
      de: "Aufopferung von Finanzen/Gesundheit, Schuldgefühle ohne Helfen, ungebetene Ratschläge und Selbstvernachlässigung.",
      fr: "Sacrifice de ses ressources, culpabilité morale, conseils intrusifs et négligence totale de son propre bien-être.",
      es: "Sacrificio económico y de salud, culpa moral por no intervenir, consejos no pedidos y abandono personal."
    }
  },
  enabler_boundary_erosion: {
    name: {
      en: "Enabler Boundary Erosion",
      id: "Peleburan Batasan & Pembiaran Racun",
      de: "Co-Abhängige Grenzauflösung",
      fr: "Érosion des Limites & Facilitation Toxique",
      es: "Erosión de Límites y Facilitación Tóxica"
    },
    description: {
      en: "Shielding offenders from consequences, lying on their behalf, fear of saying no, and staying in draining relationships.",
      id: "Melindungi pelaku dari akibat perbuatannya, berbohong demi orang lain, takut berkata tidak, dan terjebak hubungan toksik.",
      de: "Schutz vor Konsequenzen, Lügen für andere, Unfähigkeit 'Nein' zu sagen und Ausharren in toxischen Dynamiken.",
      fr: "Protection contre les conséquences réelles, mensonges par procuration, incapacité à refuser et liens destructeurs.",
      es: "Blindaje ante las consecuencias ajenas, mentiras para encubrir, incapacidad de decir no y vínculos asfixiantes."
    }
  },
  martyrdom_depletion: {
    name: {
      en: "Martyrdom Depletion & Hidden Resentment",
      id: "Kelelahan Menjadi Martir & Dendam Tersembunyi",
      de: "Märtyrer-Erschöpfung & Geheime Verbitterung",
      fr: "Épuisement du Martyr & Rancœur Dissimulée",
      es: "Desgaste del Mártir y Resentimiento Oculto"
    },
    description: {
      en: "Burnout from caretaking, hidden resentment toward recipients, identity tied to fixing, and identity loss without helping.",
      id: "Lelah melayani tanpa jeda, kesal karena tak pernah dihargai balik, harga diri bergantung pada peran hero, dan kehilangan jati diri.",
      de: "Ausgebrannt durch Fürsorge, Frust über mangelnde Dankbarkeit, Identität als Retter und seelische Orientierungslosigkeit.",
      fr: "Épuisement du soignant, colère étouffée contre les assistés, estime de soi réduite au rôle de sauveur et vide existentiel.",
      es: "Agotamiento por sobrecuidados, rencor silencioso hacia los beneficiarios, autoestima basada en salvar y vacío vital propio."
    }
  }
};

export function getPathologicalAltruismResult(totalScore: number): PathologicalAltruismResultLevel {
  const matched = PATHOLOGICAL_ALTRUISM_RESULTS.find(
    (lvl) => totalScore >= lvl.scoreRange[0] && totalScore <= lvl.scoreRange[1]
  );
  return matched || PATHOLOGICAL_ALTRUISM_RESULTS[PATHOLOGICAL_ALTRUISM_RESULTS.length - 1];
}

export function calculatePathologicalAltruismSubscales(answers: Record<number, number>): {
  destructive_rescuing_compulsion: number;
  enabler_boundary_erosion: number;
  martyrdom_depletion: number;
} {
  let destructive_rescuing_compulsion = 0;
  let enabler_boundary_erosion = 0;
  let martyrdom_depletion = 0;

  PATHOLOGICAL_ALTRUISM_QUESTIONS.forEach((q) => {
    const val = answers[q.id] || 0;
    if (q.subscale === "destructive_rescuing_compulsion") destructive_rescuing_compulsion += val;
    if (q.subscale === "enabler_boundary_erosion") enabler_boundary_erosion += val;
    if (q.subscale === "martyrdom_depletion") martyrdom_depletion += val;
  });

  return { destructive_rescuing_compulsion, enabler_boundary_erosion, martyrdom_depletion };
}
