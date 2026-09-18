export type SpiritualNarcissismCardLang = "en" | "id" | "de" | "fr" | "es";

export interface SpiritualNarcissismQuestion {
  id: number;
  subscale: "holier_than_thou_elitism" | "enlightened_gaslighting" | "performance_asceticism";
  text: {
    en: string;
    id: string;
    de: string;
    fr: string;
    es: string;
  };
}

export interface SpiritualNarcissismResultLevel {
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

export const SPIRITUAL_NARCISSISM_QUESTIONS: SpiritualNarcissismQuestion[] = [
  // 1. Holier-Than-Thou Elitism & High-Vibration Arrogance
  {
    id: 1,
    subscale: "holier_than_thou_elitism",
    text: {
      en: "I secretly look down on ordinary people who eat processed food, work corporate jobs, or worry about mundane matters as being 'spiritually asleep' or vibrating at a lower frequency.",
      id: "Diam-diam saya memandang rendah orang awam yang makan makanan olahan, kerja kantoran, atau cemas soal urusan duniawi sebagai orang yang 'belum tercerahkan' atau berfrekuensi rendah.",
      de: "Ich blicke heimlich auf normale Menschen herab, die Fast Food essen oder sich um weltliche Dinge sorgen, und halte sie für 'spirituell unbewusst' oder niederfrequent.",
      fr: "Je regarde secrètement de haut les gens ordinaires qui ont des préoccupations matérielles, les considérant comme 'endormis' ou vibrant à une fréquence inférieure.",
      es: "En secreto desprecio a las personas comunes que tienen vidas rutinarias o comen procesados, juzgándolas como 'dormidas' o de baja vibración energética."
    }
  },
  {
    id: 2,
    subscale: "holier_than_thou_elitism",
    text: {
      en: "I believe I possess unique psychic sensitivity, karmic wisdom, or spiritual purity that places me well above the general masses.",
      id: "Saya yakin memiliki kepekaan batin khusus, kebijaksanaan karma mendalam, atau kemurnian spiritual yang menempatkan saya jauh di atas rata-rata orang kebanyakan.",
      de: "Ich glaube, über besondere seelische Feinfühligkeit, karmische Einsicht oder Reinheit zu verfügen, die mich über die breite Masse erhebt.",
      fr: "Je suis convaincu(e) d'avoir une sensibilité psychique ou une pureté karmique supérieure qui me place bien au-dessus de la foule ordinaire.",
      es: "Creo que poseo una intuición especial, sabiduría kármica o pureza espiritual que me sitúa por encima del común de los mortales."
    }
  },
  {
    id: 3,
    subscale: "holier_than_thou_elitism",
    text: {
      en: "When conversing with friends or family, I subtly dominate by framing their life struggles as lessons they are too unconscious or unevolved to understand.",
      id: "Ketika mengobrol dengan kawan atau keluarga, saya kerap mendominasi dengan menganggap masalah hidup mereka sebagai pelajaran yang belum mampu mereka pahami karena belum 'bangkit'.",
      de: "Im Gespräch mit Freunden oder Familie belehre ich sie oft subtil, indem ich ihre Probleme als Zeichen mangelnder seelischer Reife abtue.",
      fr: "Dans mes discussions, j'ai tendance à dominer en analysant les peines des autres comme le signe de leur immaturité spirituelle.",
      es: "Al hablar con amigos o parientes, tiendo a sermonearlos insinuando que sufren porque su nivel de conciencia aún no ha despertado."
    }
  },
  {
    id: 4,
    subscale: "holier_than_thou_elitism",
    text: {
      en: "I feel intense irritation when someone challenges my spiritual views or questions my holistic lifestyle, taking it as proof of their ignorance.",
      id: "Saya merasa sangat tersinggung ketika seseorang mempertanyakan pandangan spiritual atau gaya hidup holistik saya, dan menganggap itu bukti kebodohan mereka.",
      de: "Ich reagiere gereizt, wenn jemand meine esoterischen Ansichten oder meinen Lebensstil hinterfragt, und werte das als Beweis ihrer Unwissenheit.",
      fr: "Je m'agace profondément quand quelqu'un remet en cause mes croyances spirituelles, y voyant une preuve irréfutable de son ignorance.",
      es: "Me indigno si alguien cuestiona mis rituales o creencias espirituales, interpretándolo como señal de su ceguera y falta de apertura."
    }
  },

  // 2. Enlightened Gaslighting & Karma Invalidation
  {
    id: 5,
    subscale: "enlightened_gaslighting",
    text: {
      en: "When my actions hurt someone, I deflect responsibility by telling them they attracted the pain through their own unresolved wounds or negative vibration.",
      id: "Saat perbuatan saya melukai orang lain, saya menghindar dengan berkata bahwa rasa sakit itu mereka tarik sendiri lewat luka batin atau vibrasi negatif mereka.",
      de: "Wenn mein Verhalten jemanden verletzt, weiche ich aus, indem ich behaupte, sie hätten diesen Schmerz durch ihre eigene negative Schwingung angezogen.",
      fr: "Lorsque mes actes blessent autrui, j'élude ma responsabilité en affirmant qu'ils ont attiré cette souffrance par leur propre fréquence négative.",
      es: "Si mis acciones hieren a alguien, me justifico diciéndole que atrajo esa experiencia debido a sus propios bloqueos o vibración baja."
    }
  },
  {
    id: 6,
    subscale: "enlightened_gaslighting",
    text: {
      en: "I dismiss legitimate anger, political activism, or interpersonal boundaries as mere 'ego traps' and urge people to just 'choose love and forgiveness' immediately.",
      id: "Saya menolak kemarahan yang wajar, perjuangan keadilan, atau batasan tegas orang lain sebagai 'jebakan ego' dan menyuruh mereka langsung 'memaafkan dan memilih cinta'.",
      de: "Ich tue berechtigten Zorn oder gesunde Grenzen als bloße 'Ego-Spiele' ab und fordere andere auf, stattdessen sofort in bedingungsloser Liebe zu verzeihen.",
      fr: "Je balaie les colères légitimes et les limites saines en les qualifiant de 'pièges de l'ego', incitant les gens à 'choisir la lumière et le pardon'.",
      es: "Invalido el enfado legítimo y los límites firmes tachándolos de 'trampas del ego', exigiendo que los demás 'vibren en amor y perdón incondicional'."
    }
  },
  {
    id: 7,
    subscale: "enlightened_gaslighting",
    text: {
      en: "I use spiritual doctrines (e.g., 'Everything is an illusion', 'Soul contracts') to rationalize unethical behavior, emotional neglect, or broken commitments.",
      id: "Saya memakai dalil spiritual (misal: 'Semua ini cuma ilusi', 'Kontrak jiwa') untuk membenarkan pengabaian emosional atau ingkar janji.",
      de: "Ich nutze spirituelle Konzepte wie 'Seelenverträge' oder 'Maya/Illusion', um emotionale Vernachlässigung oder Wortbrüche schönzureden.",
      fr: "J'utilise des concepts spirituels ('tout n'est qu'illusion', 'contrats d'âmes') pour excuser le manque de respect de mes engagements.",
      es: "Uso doctrinas espirituales ('todo es una ilusión', 'acuerdos de alma') para restar importancia a promesas rotas o desapego dañino."
    }
  },
  {
    id: 8,
    subscale: "enlightened_gaslighting",
    text: {
      en: "I feel unable to apologize plainly; instead, I reframe mistakes as 'synchronicities designed to teach you a lesson for your soul growth'.",
      id: "Saya enggan meminta maaf secara lugas; sebaliknya, saya memutarbalikkan kesalahan sebagai 'sinkronisitas yang dirancang semesta untuk mendewasakan jiwamu'.",
      de: "Ich kann mich schwer schlicht entschuldigen; lieber deute ich meine Fehler als 'kosmische Lektionen für dein persönliches Seelenwachstum' um.",
      fr: "J'ai du mal à présenter de simples excuses ; je préfère requalifier mes erreurs en 'synchronicités destinées à faire grandir ton âme'.",
      es: "Me cuesta pedir perdón humildemente; prefiero disfrazar mis faltas como 'aprendizajes cósmicos diseñados para la evolución de tu alma'."
    }
  },

  // 3. Performance Asceticism & Guru Persona
  {
    id: 9,
    subscale: "performance_asceticism",
    text: {
      en: "I curate an online image of extreme serenity, breathwork retreats, and zen enlightenment specifically to receive admiration and spiritual followers.",
      id: "Saya merancang citra media sosial yang serba tenang, meditasi di alam, dan penuh pencerahan semata-mata demi decak kagum serta pengikut setia.",
      de: "Ich inszeniere auf Social Media ein Bild vollkommener Gelassenheit und Zen-Erleuchtung, um Bewunderung und Anhänger zu gewinnen.",
      fr: "Je mets en scène sur les réseaux une vie d'harmonie totale, de retraites et de sérénité pour susciter l'admiration et m'attirer des disciples.",
      es: "Proyecto en redes sociales una imagen de paz absoluta y retiros sagrados con el fin premeditado de recibir halagos y seguidores devotos."
    }
  },
  {
    id: 10,
    subscale: "performance_asceticism",
    text: {
      en: "I feel an irresistible urge to dispense unsolicited spiritual advice, tarot readings, or energy diagnostics to strangers or casual acquaintances.",
      id: "Saya merasakan dorongan tak tertahankan untuk membagikan nasihat batin, ramalan tarot, atau pembacaan aura tanpa diminta kepada orang lain.",
      de: "Ich spüre den Drang, ungefragt esoterische Ratschläge, Aura-Analysen oder Lebensweisheiten an flüchtige Bekannte zu verteilen.",
      fr: "Je ressens le besoin compulsif de prodiguer des conseils énergétiques ou des diagnostics de chakras non sollicités à mon entourage.",
      es: "Siento un impulso irrefrenable de dar diagnósticos energéticos o consejos espirituales no solicitados a personas que apenas conozco."
    }
  },
  {
    id: 11,
    subscale: "performance_asceticism",
    text: {
      en: "I hide my messy feelings (jealousy, greed, lust, panic) behind a sacred facade because admitting ordinary human flaws would ruin my spiritual reputation.",
      id: "Saya menyembunyikan nafsu, kecemburuan, ketamakan, atau panik di balik topeng suci karena takut reputasi spiritual saya runtuh bila cacat manusiawi saya terungkap.",
      de: "Ich verberge menschliche Schwächen wie Gier, Neid oder Angst hinter einer heiligen Fassade aus Furcht, mein spirituelles Ansehen zu verlieren.",
      fr: "Je dissimule mes pulsions ordinaires (jalousie, convoitise, peur) derrière une façade de pureté car admettre mes failles briserait mon aura.",
      es: "Oculto emociones sombrías (envidia, avaricia, pánico) tras una máscara sagrada por terror a que se desmorone mi prestigio de persona iluminada."
    }
  },
  {
    id: 12,
    subscale: "performance_asceticism",
    text: {
      en: "Deep down, my spiritual practice is an ego defense mechanism designed to insulate me from vulnerability, genuine intimacy, and accountable human relationships.",
      id: "Di lubuk hati terdalam, laku spiritual saya adalah perisai ego untuk membentengi diri dari kerentanan emosional, keintiman tulus, dan tanggung jawab relasi manusiawi.",
      de: "Im tiefsten Inneren dient meine Spiritualität als Schutzschild, um mich vor echter Verwundbarkeit, Nähe und zwischenmenschlicher Verbindlichkeit zu bewahren.",
      fr: "Au fond de moi, ma quête spirituelle est un rempart de l'ego pour m'éviter la vulnérabilité réelle, l'intimité brute et la responsabilité relationnelle.",
      es: "En el fondo, mi práctica espiritual actúa como una armadura del ego para protegerme de la vulnerabilidad auténtica y el compromiso emocional real."
    }
  }
];

export const SPIRITUAL_NARCISSISM_OPTIONS = [
  {
    value: 0,
    label: {
      en: "Never / Untrue of me",
      id: "Tidak Pernah / Tidak Menggambarkan Saya",
      de: "Nie / Trifft gar nicht zu",
      fr: "Jamais / Pas du tout moi",
      es: "Nunca / Nada que ver conmigo"
    }
  },
  {
    value: 1,
    label: {
      en: "Rarely / Mild tendency",
      id: "Jarang / Terkadang Terpikir Sekilas",
      de: "Selten / Nur ganz gelegentlich",
      fr: "Rarement / Tendance légère",
      es: "Raramente / Ocasional leve"
    }
  },
  {
    value: 2,
    label: {
      en: "Sometimes / Moderate presence",
      id: "Kadang-kadang / Cukup Terasa",
      de: "Manchmal / Mäßig spürbar",
      fr: "Parfois / Présence modérée",
      es: "A veces / Presencia moderada"
    }
  },
  {
    value: 3,
    label: {
      en: "Often / Distinct pattern",
      id: "Sering / Pola Sangat Nyata",
      de: "Oft / Deutliches Muster",
      fr: "Souvent / Motif bien marqué",
      es: "A menudo / Patrón frecuente"
    }
  },
  {
    value: 4,
    label: {
      en: "Almost Always / Dominant defense",
      id: "Hampir Selalu / Kebiasaan Mendasar",
      de: "Fast immer / Dominantes Verhaltensmuster",
      fr: "Presque toujours / Mécanisme dominant",
      es: "Casi siempre / Mecanismo predominante"
    }
  }
];

export const SPIRITUAL_NARCISSISM_RESULTS: SpiritualNarcissismResultLevel[] = [
  {
    level: "grounded_humility",
    scoreRange: [0, 9],
    title: {
      en: "Grounded Humility & Authentic Self-Awareness",
      id: "Kerendahan Hati Autentik & Kesadaran Diri Sejati",
      de: "Geerdete Demut & authentische Selbstwahrnehmung",
      fr: "Humilité Ancrée & Conscience de Soi Authentique",
      es: "Humildad Enraizada y Autoconciencia Verdadera"
    },
    summary: {
      en: "Your relationship with spiritual, philosophical, or wellness practices is rooted in genuine human humility. You do not use spirituality to avoid emotional accountability or judge others as 'lower vibration'.",
      id: "Hubungan Anda dengan laku spiritual atau kesehatan holistik berakar pada kerendahan hati manusiawi. Anda tidak memakai dalil kesucian untuk menghindari tanggung jawab emosional atau memandang rendah orang lain.",
      de: "Ihre seelische oder philosophische Praxis basiert auf echter menschlicher Demut. Sie nutzen Spiritualität weder als Ausflucht vor Verantwortung noch zur Abwertung Ihrer Mitmenschen.",
      fr: "Votre démarche spirituelle ou bien-être est ancrée dans une humilité sincère. Vous n'utilisez pas la spiritualité pour fuir vos torts ou toiser autrui de haut.",
      es: "Tu camino interior se asienta en una humildad sincera. No utilizas conceptos místicos para huir de la responsabilidad ni juzgas a nadie por su supuesta frecuencia."
    },
    neurobiology: {
      en: "Healthy integration of the medial prefrontal cortex (mPFC) and anterior insula enables accurate theory of mind, empathic resonance, and somatic attunement without ego inflation.",
      id: "Integrasi sehat antara korteks prefrontal medial (mPFC) dan insula anterior memfasilitasi empati mendalam, resonansi emosi tulus, dan keterhubungan somatik tanpa inflasi ego.",
      de: "Gesunde neuronale Vernetzung zwischen medialem Präfrontalkortex und vorderer Insula ermöglicht reife Empathie und seelische Erdung ohne narzisstische Überhöhung.",
      fr: "Une coordination harmonieuse entre cortex préfrontal médial et insula antérieure favorise une empathie réelle et un ancrage somatique exempt de narcissisme.",
      es: "La óptima sincronización entre la corteza prefrontal medial y la ínsula permite una empatía genuina y madura, inmune al engreimiento espiritual."
    },
    actionProtocol: {
      en: [
        "Continue cultivating radical openness to feedback and welcoming mundane human experiences.",
        "Practice somatic ground checks whenever you encounter high-stress relational conflicts.",
        "Deepen your authentic voice: Record candid audio reflections in Nuju to chronicle genuine personal growth."
      ],
      id: [
        "Pertahankan keterbukaan menerima kritik dan hargai realitas hidup yang biasa tanpa perlu sok suci.",
        "Lakukan ground check somatik saat menghadapi silang pendapat atau konflik relasi.",
        "Rawat keaslian batin: Tuangkan refleksi jujur lewat jurnal suara terenkripsi Nuju untuk melacak kedewasaan emosional."
      ],
      de: [
        "Bewahren Sie Ihre Offenheit für Kritik und achten Sie das ganz gewöhnliche menschliche Miteinander.",
        "Nutzen Sie somatische Erdungsübungen bei zwischenmenschlichen Differenzen.",
        "Stärken Sie Ihre innere Stimme: Halten Sie ehrliche Gedanken im verschlüsselten Audio-Tagebuch von Nuju fest."
      ],
      fr: [
        "Conservez votre humilité naturelle face aux imperfections ordinaires de la vie quotidienne.",
        "Pratiquez l'ancrage somatique lors de tensions relationnelles ou professionnelles.",
        "Honorez votre sincérité : Utilisez le journal vocal sécurisé de Nuju pour confier vos réflexions sans artifice."
      ],
      es: [
        "Mantén tu honesta sencillez ante los altibajos de la vida y las opiniones de los demás.",
        "Aplica técnicas de enraizamiento físico cuando surjan discrepancias interpersonales.",
        "Cultiva tu voz auténtica: Graba tus reflexiones íntimas en el diario de voz encriptado de Nuju."
      ]
    },
    badge: {
      en: "Grounded Seeker",
      id: "Pencari Rendah Hati",
      de: "Geerdeter Sucher",
      fr: "Chercheur Authentique",
      es: "Buscador Enraizado"
    }
  },
  {
    level: "mild_spiritual_pride",
    scoreRange: [10, 19],
    title: {
      en: "Mild Spiritual Pride & Occasional Bypassing",
      id: "Kebanggaan Spiritual Ringan & Bypassing Berkala",
      de: "Leichter spiritueller Stolz & gelegentliches Bypassing",
      fr: "Fierté Spirituelle Légère & Bypassing Occasionnel",
      es: "Orgullo Espiritual Leve y Evasión Esporádica"
    },
    summary: {
      en: "You have minor tendencies to adopt spiritual language as a subtle status symbol or comfort shield. While not malicious, you occasionally dismiss raw emotions in favor of quick 'higher vibration' reframing.",
      id: "Anda memiliki kecenderungan ringan menggunakan istilah spiritual sebagai simbol status terselubung atau perisai kenyamanan. Kadang Anda tergoda membungkam emosi pahit demi cepat kembali ke 'vibrasi tinggi'.",
      de: "Sie neigen gelegentlich dazu, spirituelle Phrasen als Statussymbol oder Trostschutz zu gebrauchen. Bisweilen wischen Sie unangenehme Gefühle zu schnell mit 'höheren Schwingungen' beiseite.",
      fr: "Vous utilisez parfois le vocabulaire spirituel comme signe d'élégance intellectuelle ou paravent rassurant. Il vous arrive de fuir les émotions rudes au profit d'un faux optimisme cosmique.",
      es: "Muestras cierta inclinación a usar terminología esotérica como distinción personal o escudo protector. A veces descartas el dolor incómodo buscando atajos hacia la 'vibración elevada'."
    },
    neurobiology: {
      en: "Intermittent activation of ventral striatal dopamine reward loops following holistic praise, prompting early cognitive rationalization over visceral emotional vulnerability.",
      id: "Aktivasi sesekali pada sirkuit dopamin striatum ventral pasca mendapat pujian holistik, memicu rasionalisasi kognitif untuk menghindari kerentanan emosional tubuh.",
      de: "Gelegentliche Dopaminbelohnung im ventralen Striatum nach spirituellem Lob begünstigt kognitive Ausweichmanöver gegenüber verletzlichen Gefühlen.",
      fr: "Stimulation passagère du striatum ventral par la valorisation mystique, encourageant la fuite mentale face aux émotions vulnérables.",
      es: "Activación leve de recompensa dopaminérgica ante elogios místicos, lo que propicia la evasión racional del dolor emocional crudo."
    },
    actionProtocol: {
      en: [
        "Notice when you catch yourself judging others' mundane choices; pause and acknowledge shared human limits.",
        "Allow uncomfortable emotions (grief, anger) to breathe for at least 15 minutes before seeking a 'spiritual lesson'.",
        "Unguarded audio debrief: Talk through your hidden insecurities inside Nuju's zero-knowledge audio journal."
      ],
      id: [
        "Sadarilah saat Anda mulai menghakimi pilihan hidup orang lain; tarik napas dan akui keterbatasan manusia.",
        "Beri ruang bagi rasa perih (sedih, marah) bernapas minimal 15 menit sebelum buru-buru mencari 'makna kosmik'.",
        "Bongkar rasa cemas: Rekam unek-unek tanpa polesan kesucian di jurnal audio terenkripsi Nuju."
      ],
      de: [
        "Bemerken Sie, wenn Sie andere innerlich belehren wollen, und besinnen Sie sich auf gemeinsame Menschlichkeit.",
        "Gestehen Sie sich Trauer und Wut zu, bevor Sie nach einer 'spirituellen Lektion' suchen.",
        "Unzensierter Audio-Check: Entladen Sie Ihre verborgenen Zweifel im geschützten Nuju-Sprachtagebuch."
      ],
      fr: [
        "Prenez conscience de vos jugements spontanés et acceptez l'imperfection partagée de notre condition.",
        "Laissez respirer vos émotions sombres sans chercher précipitamment une explication karmique.",
        "Déposez le masque : Exprimez vos doutes sans fard dans le journal audio sécurisé de Nuju."
      ],
      es: [
        "Identifica cuándo juzgas las rutinas ajenas y reconecta con la fragilidad común a todos.",
        "Permite que la tristeza o la rabia se manifiesten sin forzar un aprendizaje prematuro.",
        "Desnudez emocional: Desahoga tus vulnerabilidades sin adornos en el diario de voz encriptado de Nuju."
      ]
    },
    badge: {
      en: "Awakening Learner",
      id: "Pelajar Bertumbuh",
      de: "Lernender Wanderer",
      fr: "Apprenti Éveillé",
      es: "Caminante Consciente"
    }
  },
  {
    level: "moderate_spiritual_grandiosity",
    scoreRange: [20, 29],
    title: {
      en: "Moderate Spiritual Grandiosity & Weaponized Enlightenment",
      id: "Kompensasi Ego Spiritual Sedang & Pencerahan Defensif",
      de: "Mäßige spirituelle Grandiosität & defensive Erleuchtung",
      fr: "Grandiosité Spirituelle Modérée & Éveil Défensif",
      es: "Grandiosidad Espiritual Moderada y Sabiduría Defensiva"
    },
    summary: {
      en: "Spiritual concepts have become a prominent defense mechanism for your ego. You frequently reframe personal interpersonal frictions as 'tests of consciousness', giving unsolicited advice while resisting accountability.",
      id: "Konsep-konsep spiritual telah menjadi benteng pertahanan ego Anda. Anda kerap memutarbalikkan konflik antarmanusia sebagai 'ujian kesadaran', gemar memberi wejangan tanpa diminta, namun sulit dimintai pertanggungjawaban.",
      de: "Spirituelle Dogmen dienen Ihnen zunehmend als Schutzschild. Sie deuten Zwischenmenschliches gerne als 'kosmische Prüfungen', verteilen ungefragt Rat und meiden eigene Fehlerbekenntnisse.",
      fr: "Les doctrines spirituelles sont devenues le bouclier de votre ego. Vous requalifiez vos conflits en 'tests vibratoires', distribuez des leçons de vie et fuyez vos torts relationnels.",
      es: "Las ideas trascendentales actúan como una armadura para tu ego. Sueles etiquetar los desacuerdos como 'pruebas de vibración', dando lecciones no pedidas y eludiendo disculpas sinceras."
    },
    neurobiology: {
      en: "Hyperactive Default Mode Network (DMN) self-referential hubs coupled with anterior cingulate cortex bias, leading to heightened moral righteousness and diminished perspective taking.",
      id: "Hiperaktivitas pada Default Mode Network (DMN) yang berpusat pada pembenaran diri dipadu bias korteks singulat anterior, memicu kepuasan moral semu dan menyusutkan empati sejati.",
      de: "Erhöhte Aktivität im Default Mode Network (DMN) verstärkt selbstbezügliche Rechthaberei und dämpft die Fähigkeit zur spontanen Fremdempathie.",
      fr: "Suractivation du réseau du mode par défaut (DMN) axée sur la supériorité morale, émoussant la capacité à envisager sincèrement le point de vue d'autrui.",
      es: "Hiperactividad en la red neuronal por defecto (DMN) ligada a una autojustificación moral que reduce la empatía hacia el dolor ajeno."
    },
    actionProtocol: {
      en: [
        "Implement a strict 7-day moratorium on offering unsolicited energy advice or spiritual diagnoses.",
        "Practice saying verbatim: 'I made a mistake, my behavior hurt you, and I am sorry' without adding metaphysical caveats.",
        "Confront your shadow: Record honest, messy rants in Nuju's encrypted audio vault without sugarcoating your flaws."
      ],
      id: [
        "Terapkan puasa 7 hari penuh dari memberi nasihat aura, ramalan, atau petuah batin yang tidak diminta orang.",
        "Latih ucapan lugas: 'Saya berbuat salah, perilaku saya menyakitimu, dan saya minta maaf' tanpa embel-embel dalil karma.",
        "Akui sisi gelap batin: Luapkan amarah, dengki, dan rasa tidak aman di brankas audio terenkripsi Nuju tanpa disaring."
      ],
      de: [
        "Legen Sie ein 7-tägiges Moratorium für ungefragte esoterische Ratschläge oder Energie-Diagnosen ein.",
        "Üben Sie den schlichten Satz: 'Ich habe einen Fehler gemacht, das tut mir leid' ohne kosmische Relativierung.",
        "Schattenarbeit: Nutzen Sie Nujus verschlüsseltes Audio-Tagebuch für ehrliche Wut und ungeschminkte Selbstkritik."
      ],
      fr: [
        "Engagez-vous à ne donner aucun conseil spirituel ni analyse de chakra non sollicités pendant 7 jours.",
        "Entraînez-vous à dire simplement : 'J'ai eu tort, je t'ai blessé(e) et je te demande pardon' sans échappatoire.",
        "Affrontez votre ombre : Confiez vos jalousies et colères enfouies au coffre audio confidentiel de Nuju."
      ],
      es: [
        "Haz un ayuno de 7 días sin emitir consejos kármicos ni diagnósticos áuricos que nadie te haya pedido.",
        "Practica disculparte con total sencillez: 'Me equivoqué, te lastimé y lo siento de verdad' sin justificaciones cósmicas.",
        "Trabajo de sombra: Graba tus rencores y mezquindades sin tapujos en el diario de voz encriptado de Nuju."
      ]
    },
    badge: {
      en: "Spiritual Ego Compensator",
      id: "Ego Spiritual Defensif",
      de: "Defensiver Guru",
      fr: "Éveil Défensif",
      es: "Ego Trascendental"
    }
  },
  {
    level: "elevated_spiritual_narcissism",
    scoreRange: [30, 38],
    title: {
      en: "Elevated Spiritual Narcissism & Enlightened Gaslighting",
      id: "Narsisme Spiritual Tinggi & Manipulasi Kesucian",
      de: "Ausgeprägter spiritueller Narzissmus & elitäres Gaslighting",
      fr: "Narcissisme Spirituel Élevé & Gaslighting Mystique",
      es: "Narcisismo Espiritual Elevado y Manipulación Trascendental"
    },
    summary: {
      en: "Spiritual superiority has crystallized into an entrenched identity. You frequently weaponize karma, 'vibrations', and soul rhetoric to invalidate real relational harm, control partners, or command social adoration.",
      id: "Superioritas spiritual telah membeku menjadi identitas kaku. Anda sering memanfaatkan konsep karma, 'getaran energi', dan istilah mistis untuk mengabaikan luka nyata, memanipulasi pasangan, atau menuntut kekaguman publik.",
      de: "Spirituelle Erhabenheit ist zu Ihrem Hauptidentitätsmerkmal geworden. Sie instrumentalisieren Karma und Energiebegriffe, um reale Verletzungen wegzudiskutieren und Bewunderung einzufordern.",
      fr: "La supériorité spirituelle est devenue votre forteresse identitaire. Vous manipulez le lexique de l'énergie et du karma pour esquiver la responsabilité de vos actes et assujettir votre entourage.",
      es: "La creencia de superioridad mística domina tu personalidad. Utilizas el karma, la vibración y los contratos de alma para eludir el daño que causas y exigir devoción incondicional."
    },
    neurobiology: {
      en: "Rigid hyper-connectivity in the ventral striatum and dopaminergic salience networks reinforcing grandiose self-concept, accompanied by down-regulated mirror neuron activity during interpersonal confrontation.",
      id: "Konektivitas kaku antara striatum ventral dan jaringan salience dopaminergik memperkuat ilusi keagungan diri, disertai penurunan aktivitas cermin saraf (mirror neurons) saat dikonfrontasi.",
      de: "Starre Kopplung im dopaminergen Belohnungsnetzwerk nährt den elitären Selbstwert, während Spiegelneuronen bei berechtigter Kritik massiv gehemmt werden.",
      fr: "Verrouillage des réseaux de récompense dopaminergique valorisant l'illusion de sainteté, associé à une atrophie de l'empathie en situation de conflit.",
      es: "Sobreactivación persistente en circuitos de gratificación reforzando el autoconcepto mesiánico, con desconexión casi total de las neuronas espejo ante la crítica."
    },
    actionProtocol: {
      en: [
        "Undertake clinical shadow work with a licensed therapist specializing in spiritual abuse or narcissistic dynamics.",
        "Step down from advising, mentoring, or preaching roles for 30 days to confront the void beneath the guru mask.",
        "Ego-deconstruction sanctuary: Confess your hidden panic, loneliness, and ordinary human dread privately into Nuju."
      ],
      id: [
        "Jalani psikoterapi klinis mendalam bersama psikolog yang memahami dinamika luka batin dan narsisme spiritual.",
        "Istirahat total selama 30 hari dari posisi mengajar, memberi wejangan batin, atau menyembuhkan orang lain.",
        "Dekonstruksi topeng suci: Akui ketakutan sejati, kehampaan, dan kepanikan biasa di tempat paling aman: jurnal audio Nuju."
      ],
      de: [
        "Suchen Sie psychotherapeutische Begleitung zur gezielten Aufarbeitung spiritueller Abwehrmechanismen.",
        "Treten Sie für 30 Tage von jeglicher esoterischer Berater- oder Lehrerrolle zurück, um die innere Leere zu spüren.",
        "Entblößung im Verborgenen: Bekennen Sie Ihre Einsamkeit und menschlichen Ängste im anonymen Nuju-Audiospeicher."
      ],
      fr: [
        "Consultez un thérapeute spécialisé dans les dynamiques d'évitement spirituel et les blessures narcissiques.",
        "Prenez un recul absolu de 30 jours sur vos fonctions de guide ou de coach pour explorer le vide sous le masque.",
        "Sanctuaire de vérité : Déposez vos angoisses crues et votre solitude sans fard dans le journal audio crypté de Nuju."
      ],
      es: [
        "Inicia psicoterapia profesional orientada a desmontar el bypass espiritual y las heridas profundas de apego.",
        "Retírate 30 días de todo rol de guía, maestro o sanador para afrontar el vacío tras el personaje místico.",
        "Desmontaje del personaje: Confiesa tus temores más mundanos y tu soledad en el refugio de voz encriptado de Nuju."
      ]
    },
    badge: {
      en: "Spiritual Supremacist",
      id: "Narsis Spiritual Elitis",
      de: "Spiritueller Elitist",
      fr: "Supémaciste Mystique",
      es: "Supremacista Espiritual"
    }
  },
  {
    level: "pathological_guru_complex",
    scoreRange: [39, 48],
    title: {
      en: "Pathological Guru Complex & Omnipotent Narcissism",
      id: "Kompleks Guru Akut & Narsisme Spiritual Omnipoten",
      de: "Pathologischer Guru-Komplex & omnipotenter Narzissmus",
      fr: "Complexe du Gourou Pathologique & Toute-Puissance Mystique",
      es: "Complejo de Gurú Patológico y Omnipotencia Espiritual"
    },
    summary: {
      en: "You inhabit an all-consuming grandiose fantasy where you perceive yourself as untouchably enlightened, karmically exempt, and entitled to dictate others' realities. This posture severely damages relationships and blinds you to profound inner isolation.",
      id: "Anda terjebak dalam ilusi kemahatahuan di mana Anda merasa kebal dosa karma, bebas dari aturan manusia, dan berhak mendikte jalan hidup orang lain. Pola ini menghancurkan relasi tulus dan menutupi jurang kesepian jiwa yang amat pekat.",
      de: "Sie leben in einer allumfassenden Erleuchtungsillusion, halten sich für karmisch erhaben und berechtigt, die Wahrheiten anderer zu bestimmen. Dies führt zu tiefer Zerstörung von Bindungen und extremer seelischer Isolation.",
      fr: "Vous êtes enfermé(e) dans une illusion d'omnipotence sacrée, vous croyant au-dessus des lois morales ordinaires et autorisé(e) à régir la vie d'autrui. Cela détruit vos liens et masque une terreur d'abandon vertigineuse.",
      es: "Te hallas atrapado/a en un delirio de iluminación absoluta, creyéndote inmune a las normas terrenales y facultado/a para doblegar la voluntad ajena. Este patrón erosiona tus vínculos y encubre una soledad existencial desoladora."
    },
    neurobiology: {
      en: "Severe frontolimbic dysregulation with near-total suppression of corrective feedback signals; dopaminergic euphoria tied exclusively to dominance, omnipotence, and dogmatic veneration.",
      id: "Disregulasi frontolimbik parah dengan penekanan total terhadap sinyal koreksi; euforia dopaminergik bergantung sepenuhnya pada dominasi mental, rasa kuasa, dan pemujaan pengikut.",
      de: "Schwere frontolimbische Entgleisung mit Ausfall von Korrektursignalen; neurochemische Belohnung speist sich fast ausschließlich aus Allmachtsgefühlen und kritikloser Bewunderung.",
      fr: "Dysrégulation fronto-limbique sévère et extinction des signaux d'autocorrection ; l'euphorie dopaminergique ne dépend plus que de la domination et de la vénération aveugle.",
      es: "Desregulación frontolímbica severa con anulación de señales de corrección; placer dopaminérgico supeditado a la dominación mental y al culto ciego a tu figura."
    },
    actionProtocol: {
      en: [
        "Urgent psychiatric and clinical consultation for personality structure stabilization and trauma decompression.",
        "Immediately cease running spiritual circles, mentoring disciples, or conducting unregulated energy rituals.",
        "Break the cycle of deceit: Weep, scream, and admit your humanity privately into Nuju's zero-knowledge encrypted vault."
      ],
      id: [
        "Konsultasi psikiatri dan psikoterapi klinis mendesak untuk restrukturisasi kepribadian dan penguraian trauma masa lalu.",
        "Hentikan seketika aktivitas membuka kelas spiritual, mengangkat murid, atau memimpin ritual mistis.",
        "Runtuhkan tirani kepalsuan: Menangis, menjerit, dan akui kerapuhan manusiawi Anda di brankas terenkripsi Nuju."
      ],
      de: [
        "Dringende fachärztliche und psychotherapeutische Abklärung zur Stabilisierung der Persönlichkeitsstruktur.",
        "Sofortiger Stopp jeglicher esoterischer Meisterzirkel, Heilungsrituale oder Schülerkreise.",
        "Befreiung von der Illusion: Weinen und gestehen Sie Ihre seelische Not im absolut verschlüsselten Nuju-Sprachtresor."
      ],
      fr: [
        "Consultation clinique et psychiatrique urgente pour stabiliser la structure de personnalité et apaiser les traumatismes.",
        "Cessation immédiate de toute activité de gourou, de transmission ésotérique ou d'ateliers de guérison non régulés.",
        "Brisez la prison du sacré : Pleurez, hurlez et admettez votre détresse dans le sanctuaire vocal secret de Nuju."
      ],
      es: [
        "Consulta clínica y psiquiátrica urgente para estabilizar los cimientos de la personalidad y descomprimir traumas antiguos.",
        "Cese fulminante de talleres esotéricos, captación de discípulos o sesiones místicas de sanación.",
        "Desmonta el trono imaginario: Llora, grita y reconoce tu vulnerabilidad en la soledad cifrada del diario Nuju."
      ]
    },
    badge: {
      en: "Pathological Guru",
      id: "Kompleks Mahaguru Akut",
      de: "Absoluter Guru",
      fr: "Gourou Omnipotent",
      es: "Gurú Mesiánico"
    }
  }
];

export const SPIRITUAL_NARCISSISM_SUBSCALE_INFO = {
  holier_than_thou_elitism: {
    name: {
      en: "Holier-Than-Thou Elitism & High-Vibration Arrogance",
      id: "Superioritas Kesucian & Arogansi Frekuensi Tinggi",
      de: "Heiliger-als-du-Elitismus & Schwingungs-Arroganz",
      fr: "Élitisme Moral & Arrogance Vibratoire",
      es: "Elitismo Moral y Arrogancia de Alta Vibración"
    },
    description: {
      en: "Looking down on ordinary people as 'unawakened' or 'low frequency', feeling spiritually elite, lecturing others on soul growth, and hypersensitivity to criticism.",
      id: "Memandang orang biasa sebagai kaum 'belum melek batin', merasa diri elit spiritual, menggurui orang lain soal kedewasaan jiwa, dan defensif terhadap kritik.",
      de: "Herabblicken auf 'unbewusste' Mitmenschen, elitäres Selbstbild, Besserwisserei über Seelenreife und Überempfindlichkeit bei Einwänden.",
      fr: "Mépris des gens ordinaires jugés 'endormis', complexe de pureté, leçons de vie moralisatrices et intolérance absolue à la critique.",
      es: "Desdén hacia personas cotidianas consideradas 'no despiertas', complejo de pureza mística, sermones no solicitados y rechazo a toda objeción."
    }
  },
  enlightened_gaslighting: {
    name: {
      en: "Enlightened Gaslighting & Karma Invalidation",
      id: "Manipulasi Dalil Karma & Pengabaian Relasional",
      de: "Erleuchtetes Gaslighting & Karma-Entwertung",
      fr: "Gaslighting Mystique & Déresponsabilisation Karmique",
      es: "Gaslighting Iluminado y Manipulación Kármica"
    },
    description: {
      en: "Blaming victims for 'attracting negative energy', invalidating legitimate boundaries as 'ego traps', using cosmic laws to excuse broken promises, and refusing to apologize directly.",
      id: "Menyalahkan korban karena dianggap 'menarik vibrasi buruk', menyebut batasan tegas sebagai 'jebakan ego', membenarkan kelalaian lewat takdir mistis, dan menolak minta maaf.",
      de: "Opfern einreden, sie hätten Leid selbst angezogen, Grenzen als 'Ego-Fallen' entwerten, Wortbrüche spirituell rechtfertigen und Entschuldigungen verweigern.",
      fr: "Accuser les victimes d'attirer leurs souffrances, qualifier les limites saines de 'pièges de l'ego', esquiver ses torts par le destin et refuser de s'excuser.",
      es: "Culpar a los demás por 'atraer negatividad', tachar los límites sanos de 'trampas del ego', justificar faltas con leyes cósmicas y negarse a pedir perdón."
    }
  },
  performance_asceticism: {
    name: {
      en: "Performance Asceticism & Guru Persona",
      id: "Askese Panggung & Kedok Mahaguru",
      de: "Inszenierte Askese & Guru-Fassade",
      fr: "Ascétisme de Façade & Personnage de Gourou",
      es: "Ascetismo Teatral y Máscara de Gurú"
    },
    description: {
      en: "Curating a pristine online zen image for followers, dispensing unsolicited aura/tarot readings, hiding human flaws behind a holy facade, and using spirituality as an intimacy barrier.",
      id: "Menciptakan citra zen media sosial demi puja-puji, hobi membagikan ramalan aura tanpa diminta, menyembunyikan sisi buruk manusiawi, dan menjadikan spiritualitas perisai anti-keintiman.",
      de: "Gezielte Selbstdarstellung als Zen-Meister, aufdringliche esoterische Diagnosen, Verbergen von Fehlern hinter heiliger Fassade und Flucht vor echter Intimität.",
      fr: "Mise en scène d'une fausse sérénité pour captiver une audience, diagnostics énergétiques intempestifs, camouflage des faiblesses et fuite de l'intimité vraie.",
      es: "Fabricación de una imagen mística impecable en redes, diagnósticos energéticos entrometidos, ocultación de defectos y miedo al contacto humano auténtico."
    }
  }
};

export function getSpiritualNarcissismResult(totalScore: number): SpiritualNarcissismResultLevel {
  const matched = SPIRITUAL_NARCISSISM_RESULTS.find(
    (lvl) => totalScore >= lvl.scoreRange[0] && totalScore <= lvl.scoreRange[1]
  );
  return matched || SPIRITUAL_NARCISSISM_RESULTS[SPIRITUAL_NARCISSISM_RESULTS.length - 1];
}

export function calculateSpiritualNarcissismSubscales(answers: Record<number, number>): {
  holier_than_thou_elitism: number;
  enlightened_gaslighting: number;
  performance_asceticism: number;
} {
  let holier_than_thou_elitism = 0;
  let enlightened_gaslighting = 0;
  let performance_asceticism = 0;

  SPIRITUAL_NARCISSISM_QUESTIONS.forEach((q) => {
    const val = answers[q.id] || 0;
    if (q.subscale === "holier_than_thou_elitism") holier_than_thou_elitism += val;
    if (q.subscale === "enlightened_gaslighting") enlightened_gaslighting += val;
    if (q.subscale === "performance_asceticism") performance_asceticism += val;
  });

  return { holier_than_thou_elitism, enlightened_gaslighting, performance_asceticism };
}
