export type TraumaBondCardLang = "en" | "id" | "de" | "fr" | "es";

export interface TraumaBondQuestion {
  id: number;
  subscale: "intermittent_addiction" | "cognitive_dissonance_defense" | "identity_erosion";
  text: {
    en: string;
    id: string;
    de: string;
    fr: string;
    es: string;
  };
}

export interface TraumaBondResultLevel {
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

export const TRAUMA_BOND_QUESTIONS: TraumaBondQuestion[] = [
  {
    id: 1,
    subscale: "intermittent_addiction",
    text: {
      en: "The relationship swings between intoxicating highs of adoration and gut-wrenching lows of cold detachment, criticism, or silent treatment.",
      id: "Hubungan ini berayun antara fase manis penuh sanjungan (love-bombing) dan fase dingin mencampakkan, kritik tajam, atau silent treatment berhari-hari.",
      de: "Die Beziehung schwankt unberechenbar zwischen berauschenden Höhen überbordender Zuneigung und eisiger Kälte, Kritik oder tagelangem Schweigen.",
      fr: "La relation oscille brutalement entre des sommets d'adoration passionnée et des abîmes de détachement glacial, de critiques ou de silence punitif.",
      es: "La relación oscila entre momentos de intensa adoración y caídas dolorosas de frialdad, críticas o ley del hielo (silent treatment)."
    }
  },
  {
    id: 2,
    subscale: "cognitive_dissonance_defense",
    text: {
      en: "I constantly make excuses for their cruel or disrespectful behavior, blaming their stressful childhood, difficult job, or mental health.",
      id: "Saya terus-menerus mencari pembenaran atas perilaku kasar atau merendahkannya, beralasan karena masa kecilnya yang sulit, stres kerja, atau luka batinnya.",
      de: "Ich rechtfertige verletzendes Verhalten ständig vor mir selbst mit seiner/ihrer schwierigen Kindheit, beruflichem Stress oder Traumata.",
      fr: "Je justifie constamment ses comportements blessants en invoquant son enfance difficile, son stress au travail ou ses blessures passées.",
      es: "Justifico continuamente su conducta hiriente o irrespetuosa culpando a su infancia difícil, su estrés laboral o su salud mental."
    }
  },
  {
    id: 3,
    subscale: "identity_erosion",
    text: {
      en: "I feel like I am constantly walking on eggshells, hyper-monitoring my tone, words, and body language to avoid triggering their rage or withdrawal.",
      id: "Saya merasa hidup seperti berjalan di atas pecahan kaca, terus-menerus mengawasi intonasi bicara dan ekspresi saya demi mencegah amarah atau sikap dinginnya.",
      de: "Ich habe das Gefühl, auf rohen Eiern zu gehen; ich kontrolliere jedes Wort und jede Geste penibel, um keine Wutausbrüche oder Rückzug zu provozieren.",
      fr: "J'ai l'impression permanente de marcher sur des œufs, surveillant le moindre mot ou soupir pour éviter de déclencher sa colère ou son rejet.",
      es: "Siento que camino sobre cáscaras de huevo, vigilando obsesivamente mis palabras y gestos para no desatar su furia o distanciamiento."
    }
  },
  {
    id: 4,
    subscale: "intermittent_addiction",
    text: {
      en: "Whenever they withdraw or give me the silent treatment, I experience visceral panic, nausea, and an obsessive compulsion to fix things immediately.",
      id: "Kapan pun dia mendiamkan atau menjauh, perut saya terasa mual, cemas luar biasa, dan dorongan obsesif untuk segera meminta maaf meski bukan salah saya.",
      de: "Wenn er/sie sich entzieht oder schweigt, spüre ich panische Angst, Übelkeit und den Zwang, die Harmonie um jeden Preis sofort wiederherzustellen.",
      fr: "Dès qu'il/elle prend ses distances ou s'enferme dans le silence, je ressens une panique viscérale, la nausée et l'urgence absolue de me réconcilier.",
      es: "Cuando se distancia o me aplica la ley del hielo, siento náuseas, terror visceral y la necesidad desesperada de arreglarlo de inmediato."
    }
  },
  {
    id: 5,
    subscale: "cognitive_dissonance_defense",
    text: {
      en: "I hide the full truth of their words, lies, or anger from my close friends and family because deep down, I know they would beg me to leave.",
      id: "Saya menyembunyikan kebohongan, bentakan, atau perlakuannya dari sahabat dan keluarga karena di lubuk hati saya tahu mereka akan memaksa saya putus.",
      de: "Ich verheimliche Lügen, Wutausbrüche und Abwertungen vor Freunden und Familie, weil ich weiß, dass sie mich anflehen würden, zu gehen.",
      fr: "Je cache la vérité sur ses paroles cruelles, ses mensonges ou ses colères à mes proches, car je sais qu'ils me supplieraient de fuir.",
      es: "Oculto la realidad de sus faltas de respeto, mentiras o desplantes a mis seres queridos porque sé que me rogarían que rompiera la relación."
    }
  },
  {
    id: 6,
    subscale: "identity_erosion",
    text: {
      en: "I have compromised my core boundaries, morals, financial savings, or friendships just to preserve their approval and keep the peace.",
      id: "Saya telah melanggar prinsip moral pribadi, menguras tabungan, atau menjauhi sahabat dekat demi menyenangkan hatinya dan menjaga perdamaian semu.",
      de: "Ich habe eigene Grundwerte, finanzielle Mittel oder enge Freundschaften geopfert, nur um seinen/ihren Beifall zu sichern und Streit zu vermeiden.",
      fr: "J'ai trahi mes propres valeurs, mes économies ou mes amitiés les plus chères uniquement pour préserver son approbation et éviter le conflit.",
      es: "He transgredido mis límites fundamentales, ahorros económicos o amistades de toda la vida solo para evitar discusiones y ganar su aprobación."
    }
  },
  {
    id: 7,
    subscale: "intermittent_addiction",
    text: {
      en: "The brief moments when they are tender, affectionate, and apologize feel so euphorically intoxicating that they completely erase weeks of mistreatment.",
      id: "Momen singkat ketika dia bersikap manis, lembut, dan meminta maaf terasa sangat membahagiakan hingga menghapus ingatan berminggu-minggu sakit hati.",
      de: "Die seltenen Momente von Zärtlichkeit und Reue fühlen sich so euphorisch an, dass sie wochenlange Verletzungen und Demütigungen sofort wegwischen.",
      fr: "Les rares moments de tendresse, d'affection et de repentir sont si euphoriques qu'ils effacent instantanément des semaines de souffrance.",
      es: "Los breves momentos en que muestra ternura y arrepentimiento son tan eufóricos que borran por completo semanas de desprecio y dolor."
    }
  },
  {
    id: 8,
    subscale: "cognitive_dissonance_defense",
    text: {
      en: "I stay fixated on 'who they were at the beginning' (the magical honeymoon phase), convincing myself that the real, caring person will return.",
      id: "Saya terobsesi dengan 'sosoknya yang manis di awal jadian', meyakinkan diri sendiri bahwa orang yang penyayang itu pasti akan kembali lagi.",
      de: "Ich klammere mich an das Bild der Kennenlernphase und rede mir ein, dass dieser liebevolle Mensch von damals bald dauerhaft zurückkehrt.",
      fr: "Je reste obsédé par la personne idéale des premiers mois, me persuadant que cet être merveilleux va réapparaître si je fais assez d'efforts.",
      es: "Sigo apegado a la persona que mostró ser al principio (la fase idílica), convenciéndome de que ese ser atento y cariñoso regresará."
    }
  },
  {
    id: 9,
    subscale: "identity_erosion",
    text: {
      en: "I feel like a shadow of my former self: my self-esteem is shattered, I doubt my own memory and sanity, and I feel powerless to walk away.",
      id: "Saya merasa kehilangan jati diri saya yang dulu: percaya diri hancur, meragukan ingatan sendiri (merasa gila), dan merasa tak berdaya untuk pergi.",
      de: "Ich bin nur noch ein Schatten meines früheren Ichs: Mein Selbstwert ist am Boden, ich zweifle an meinem Verstand und fühle mich wie gelähmt.",
      fr: "Je ne me reconnais plus : mon estime de moi est anéantie, je doute de ma propre mémoire et santé mentale, incapable de partir.",
      es: "Siento que soy una sombra de quien era: mi autoestima está destrozada, dudo de mi propio juicio mental y me siento incapaz de marcharme."
    }
  },
  {
    id: 10,
    subscale: "intermittent_addiction",
    text: {
      en: "When we separate or break up, the emotional pain feels like severe chemical drug withdrawal: physical chills, insomnia, pacing, and unbearable cravings.",
      id: "Saat kami putus atau jeda kontak, rasa sakitnya persis seperti sakaw narkoba fisik: menggigil, insomnia, mondar-mandir, dan rindu tak tertahankan.",
      de: "Eine Trennung fühlt sich an wie harter körperlicher Drogenentzug: Zittern, Schlaflosigkeit, innere Unruhe und ein unerträgliches Verlangen nach Kontakt.",
      fr: "La séparation ressemble à un sevrage brutal de drogue dure : tremblements, insomnies, obsessions et besoin incontrôlable d'un signe de vie.",
      es: "La separación se siente como el síndrome de abstinencia de una droga: temblores, insomnio, angustia física y una ansiedad inaguantable por buscarlo."
    }
  },
  {
    id: 11,
    subscale: "cognitive_dissonance_defense",
    text: {
      en: "I believe that no one else in the world could ever truly understand them or love them the way I do, feeling responsible for 'saving' them.",
      id: "Saya percaya tidak ada orang lain di dunia ini yang bisa memahami atau mencintainya seperti saya, merasa memikul tanggung jawab untuk menyelamatkannya.",
      de: "Ich glaube fest, dass niemand sonst auf der Welt ihn/sie so tief verstehen oder lieben kann wie ich, und fühle mich für seine/ihre Rettung verantwortlich.",
      fr: "Je suis persuadé(e) que personne d'autre ne peut le/la comprendre et l'aimer comme moi, me sentant investi(e) de la mission de le/la sauver.",
      es: "Creo que nadie más en el mundo puede comprenderlo o amarlo como yo, sintiendo la carga obsesiva de tener que salvarlo de sí mismo."
    }
  },
  {
    id: 12,
    subscale: "identity_erosion",
    text: {
      en: "Even while recognizing intellectually that this connection is toxic and destroying my life, my nervous system feels bonded to them by invisible chains.",
      id: "Meskipun otak logis saya tahu hubungan ini merusak hidup saya, sistem saraf dan tubuh saya merasa terikat rantai gaib yang tak sanggup diputus.",
      de: "Obwohl mein Verstand längst weiß, dass diese Bindung mich zerstört, fühlt sich mein Nervensystem wie mit unsichtbaren Ketten an sie gekettet.",
      fr: "Même si ma raison sait pertinemment que ce lien me détruit, mon corps et mon système nerveux se sentent attachés par des chaînes invisibles.",
      es: "Aunque racionalmente sé que esta relación es destructiva y tóxica, mi sistema nervioso se siente atado a esa persona por cadenas invisibles."
    }
  }
];

export const TRAUMA_BOND_OPTIONS = [
  {
    score: 0,
    label: {
      en: "Never / Strongly Disagree (0%)",
      id: "Tidak Pernah / Sangat Tidak Setuju (0%)",
      de: "Nie / Stimme überhaupt nicht zu (0%)",
      fr: "Jamais / Pas du tout d'accord (0%)",
      es: "Nunca / Totalmente en desacuerdo (0%)"
    }
  },
  {
    score: 1,
    label: {
      en: "Rarely / Mildly Agree (25%)",
      id: "Jarang / Sedikit Setuju (25%)",
      de: "Selten / Eher selten (25%)",
      fr: "Rarement / Plutôt en désaccord (25%)",
      es: "Rara vez / Ligeramente de acuerdo (25%)"
    }
  },
  {
    score: 2,
    label: {
      en: "Frequently / Strongly Agree (70%)",
      id: "Sering / Sangat Setuju (70%)",
      de: "Häufig / Stimme weitgehend zu (70%)",
      fr: "Fréquemment / Tout à fait d'accord (70%)",
      es: "Frecuentemente / Muy de acuerdo (70%)"
    }
  },
  {
    score: 3,
    label: {
      en: "Constantly / Severe Daily Reality (100%)",
      id: "Selalu / Realitas Menyakitkan Sehari-hari (100%)",
      de: "Ständig / Erdrückende tägliche Realität (100%)",
      fr: "Constamment / Réalité quotidienne écrasante (100%)",
      es: "Constantemente / Realidad diaria abrumadora (100%)"
    }
  }
];

export const TRAUMA_BOND_RESULTS: TraumaBondResultLevel[] = [
  {
    level: "autonomous_discernment",
    scoreRange: [0, 8],
    title: {
      en: "Autonomous & Clear-Eyed Relational Clarity",
      id: "Kejelasan Relasi Mandiri & Berprinsip Sehat",
      de: "Autonome & Klare Beziehungskompetenz",
      fr: "Autonomie affective & discernement relationnel",
      es: "Claridad relacional y autonomía afectiva"
    },
    summary: {
      en: "Your emotional boundaries are intact. You recognize inconsistency and mistreatment without falling into dopamine-driven addiction or self-sacrificing excuses.",
      id: "Batasan emosional Anda kokoh. Anda mampu mengenali perlakuan buruk atau ketidakkonsistenan tanpa terjebak dalam kecanduan dopamin atau dalih pengorbanan diri.",
      de: "Ihre emotionalen Grenzen sind stabil. Sie erkennen Respektlosigkeiten frühzeitig, ohne in biochemische Abhängigkeit oder Ausreden zu verfallen.",
      fr: "Vos frontières émotionnelles sont saines. Vous repérez les incohérences sans sombrer dans l'illusion amoureuse ou l'auto-culpabilisation.",
      es: "Tus límites personales son firmes. Detectas la falta de respeto e inconsistencia sin caer en justificaciones destructivas."
    },
    neurobiology: {
      en: "Your reward circuitry responds to reciprocal, predictable security rather than volatile intermittent reinforcement.",
      id: "Sirkuit dopamin dan oksitosin Anda merespons rasa aman dan konsistensi timbal balik, bukan tarikan drama ketidaktentuan.",
      de: "Ihr Belohnungssystem ist auf verlässliche Bindungssicherheit kalibriert und nicht auf emotionale Achterbahnfahrten.",
      fr: "Votre système nerveux recherche la sécurité prévisible plutôt que le pic de dopamine provoqué par le danger intermittent.",
      es: "Tus circuitos neuroquímicos responden al apego seguro y predecible en lugar del ciclo adictivo de recompensa intermitente."
    },
    actionProtocol: {
      en: [
        "Continue honoring your intuitive gut responses when red flags appear.",
        "Maintain diverse emotional support systems outside any romantic partner.",
        "Reflect on relational milestones in Nuju to reinforce self-worth."
      ],
      id: [
        "Teruslah mempercayai intuisi tubuh Anda ketika tanda bahaya (red flags) muncul.",
        "Pertahankan lingkaran pertemanan dan hobi mandiri di luar pasangan.",
        "Catat refleksi batasan sehat di Nuju untuk memperkuat pondasi harga diri."
      ],
      de: [
        "Vertrauen Sie weiterhin Ihrer Intuition bei zwischenmenschlichen Warnsignalen.",
        "Pflegen Sie eigene Freundschaften und Interessen unabhängig von Partnerschaften.",
        "Reflektieren Sie persönliche Werte im Nuju-Journal zur Stärkung der Selbstachtung."
      ],
      fr: [
        "Faites confiance à vos ressentis corporels dès l'apparition de signaux d'alerte.",
        "Entretenez un réseau de soutien solide en dehors de votre couple.",
        "Consignez vos réussites d'affirmation dans Nuju pour consolider votre estime."
      ],
      es: [
        "Sigue escuchando a tu intuición cuando detectes señales de alarma.",
        "Conserva tu red de amistades e intereses individuales fuera de la pareja.",
        "Escribe tus reflexiones en Nuju para reafirmar tu valía personal."
      ]
    },
    badge: {
      en: "Sovereign Heart",
      id: "Hati yang Berdaulat",
      de: "Souveränes Herz",
      fr: "Cœur Souverain",
      es: "Corazón Soberano"
    }
  },
  {
    level: "mild_strain",
    scoreRange: [9, 16],
    title: {
      en: "Mild Attachment Strain & Emerging Dissonance",
      id: "Ketegangan Kelekatan Ringan & Gejala Disonansi",
      de: "Leichte Bindungsbelastung & beginnende Dissonanz",
      fr: "Tension d'attachement légère & dissonance débutante",
      es: "Tensión de apego leve y disonancia incipiente"
    },
    summary: {
      en: "You are experiencing occasional cycles of over-functioning, walking on eggshells, or rationalizing questionable behaviors. The seed of intermittent reinforcement is present.",
      id: "Anda sesekali terjebak dalam siklus mengalah berlebihan, takut salah bicara, atau memaklumi sikap egois pasangan. Bibit keterikatan semu mulai muncul.",
      de: "Sie ertappen sich dabei, verletzendes Verhalten schönzureden oder vorsichtig aufzutreten. Der biochemische Sog unberechenbarer Bestätigung beginnt zu wirken.",
      fr: "Vous commencez à surcompenser, à marcher sur des œufs ou à minimiser des attitudes blessantes pour maintenir une fausse paix.",
      es: "Empiezas a sobreesforzarte, cuidar en exceso tus palabras o justificar actitudes egoístas para preservar la tranquilidad."
    },
    neurobiology: {
      en: "Mild cortisol elevation during conflict makes subsequent reconciliations feel artificially relieving, conditioning your nervous system to seek them as a fix.",
      id: "Kenaikan kortisol saat konflik membuat momen baikan terasa sangat melegakan secara kimiawi, membiasakan otak mencari validasi pasangan sebagai penawar stres.",
      de: "Leichte Cortisol-Ausschüttungen bei Streitigkeiten lassen die anschließende Versöhnung wie einen biochemischen Rausch wirken.",
      fr: "La décharge de cortisol lors des tensions amplifie la libération d'endorphines au moment de la réconciliation.",
      es: "El pico de cortisol en las discusiones hace que la reconciliación se sienta como un alivio neuroquímico adictivo."
    },
    actionProtocol: {
      en: [
        "Reality-Check Log: Write down verbatim what was said and done, without adding psychological excuses.",
        "Do not apologize for things you did not do just to break their cold silence.",
        "Voice your unedited confusion into Nuju to hear the truth of your experience."
      ],
      id: [
        "Catat Fakta Murni: Tuliskan kata-kata dan tindakan nyata yang terjadi tanpa bumbu pembenaran psikologis.",
        "Jangan meminta maaf atas hal yang bukan kesalahan Anda hanya demi mencairkan suasana hening.",
        "Ungkapkan kebingungan Anda di jurnal suara Nuju agar Anda bisa mendengar kembali suara hati asli Anda."
      ],
      de: [
        "Faktenprotokoll führen: Notieren Sie Worte und Taten exakt so, wie sie geschahen, ohne Entschuldigungen.",
        "Bitten Sie nicht um Verzeihung für Dinge, die Sie nicht getan haben, nur um Schweigen zu brechen.",
        "Sprechen Sie Ihre Zweifel in Nuju ein, um den eigenen Verstand zu schärfen."
      ],
      fr: [
        "Tenez un journal des faits : notez les paroles exactes sans chercher d'excuses psychologiques.",
        "Ne vous excusez jamais pour des fautes imaginaires dans le seul but de briser son mutisme.",
        "Enregistrez vos doutes dans Nuju pour réentendre la voix de votre discernement."
      ],
      es: [
        "Registro de hechos objetivos: anota lo que realmente sucedió sin inventar excusas piadosas.",
        "No pidas disculpas por cosas que no cometiste solo para romper la frialdad del silencio.",
        "Habla en privado en Nuju para contrastar la realidad frente a la manipulación."
      ]
    },
    badge: {
      en: "Wavering Anchor",
      id: "Jangkar yang Goyah",
      de: "Wankender Anker",
      fr: "Ancre Vacillante",
      es: "Ancla Vacilante"
    }
  },
  {
    level: "moderate_trauma_bond",
    scoreRange: [17, 25],
    title: {
      en: "Moderate Trauma Bond & Intermittent Reinforcement",
      id: "Trauma Bond Sedang & Siklus Penguatan Intermiten",
      de: "Fortgeschrittene Traumabindung (Intermittierende Verstärkung)",
      fr: "Lien traumatique modéré & renforcement intermittent",
      es: "Vínculo traumático moderado y refuerzo intermitente"
    },
    summary: {
      en: "You are caught in a classic trauma bond. Unpredictable cycles of devaluation and intense affection have hooked your nervous system into a powerful biochemical addiction.",
      id: "Anda terjebak dalam trauma bond klasik. Siklus pencampakan yang diselingi kehangatan mendadak telah mengunci sistem saraf Anda dalam kecanduan kimiawi yang nyata.",
      de: "Sie stecken in einer echten Traumabindung. Der Wechsel aus Kälte und plötzlicher Zuneigung hat Ihr Belohnungssystem wie einen Spielautomaten konditioniert.",
      fr: "Vous êtes prisonnier d'un lien traumatique typique. L'alternance imprévisible entre rejet et affection passionnée crée une réelle addiction neurologique.",
      es: "Estás atrapado en un vínculo traumático evidente. La alternancia de desprecio y afecto repentino ha enganchado tu cerebro como una máquina tragaperras."
    },
    neurobiology: {
      en: "The intermittent reinforcement schedule hyper-activates the nucleus accumbens, pairing massive dopamine spikes with oxytocin bonding during danger, mimicking chemical dependency.",
      id: "Pola hadiah intermiten membuat nucleus accumbens hiperaktif; lonjakan dopamin tinggi saat baikan berpadu dengan oksitosin saat terancam, persis seperti ketergantungan zat adiktif.",
      de: "Intermittierende Belohnung feuert den Nucleus accumbens an: Dopamin- und Oxytocinschübe nach Bedrohungsphasen erzeugen suchtartiges Verlangen.",
      fr: "Le calendrier de renforcement intermittent surcharge le striatum : l'ocytocine s'associe à l'adrénaline, créant une dépendance chimique à la personne nocive.",
      es: "El refuerzo intermitente hiperactiva el circuito de recompensa: la dopamina y la oxitocina se ligan al miedo, creando dependencia afectiva."
    },
    actionProtocol: {
      en: [
        "Shatter the 'Potential' Fantasy: Stop loving who they could be; face who they actually are on an ordinary Tuesday.",
        "Break the Secrecy: Confide in at least one trusted friend or therapist without editing the ugly details.",
        "Voice Journaling Grounding in Nuju: Record audio entries immediately after arguments to anchor your reality before cognitive dissonance rewrites it."
      ],
      id: [
        "Hancurkan Ilusi 'Potensi Masa Depan': Berhentilah mencintai siapa dia di masa depan; lihatlah bagaimana dia memperlakukan Anda di hari-hari biasa saat ini.",
        "Bongkar Rahasia: Ceritakan kenyataan perlakuan kasarnya kepada satu sahabat tepercaya atau psikolog tanpa menyensor hal-hal memalukan.",
        "Gunakan Jurnal Suara Nuju Saat Emosi Memuncak: Rekam suara Anda sesaat setelah pertengkaran agar ingatan Anda tidak dimanipulasi oleh otak disonansi nanti."
      ],
      de: [
        "Die Illusionsfalle beenden: Lieben Sie nicht das Potenzial, sondern sehen Sie den realen Menschen im Alltag.",
        "Das Schweigen brechen: Weihen Sie eine vertraute Person oder Fachkraft ohne Beschönigungen ein.",
        "Realitäts-Audio im Nuju-Journal: Nehmen Sie direkt nach Vorfällen Ihre Stimme auf, um Gaslighting zu verhindern."
      ],
      fr: [
        "Détruisez le mythe du potentiel : cessez d'aimer ce qu'il/elle pourrait être, regardez sa réalité quotidienne.",
        "Brisez le secret : confiez les détails bruts à un ami sûr ou un thérapeute sans rien adoucir.",
        "Ancrage audio Nuju : enregistrez votre ressenti à chaud après une crise pour neutraliser l'amnésie traumatique."
      ],
      es: [
        "Rompe la fantasía del potencial: deja de amar lo que podría llegar a ser; mira cómo te trata un martes cualquiera.",
        "Rompe el pacto de silencio: cuéntale a una persona de confianza o terapeuta la verdad sin maquillar.",
        "Audio diario en Nuju tras los conflictos: graba tus sensaciones de inmediato para evitar que la disonancia reescriba los hechos."
      ]
    },
    badge: {
      en: "Trauma Entangled",
      id: "Terjerat Trauma Bond",
      de: "Trauma-Verstrickt",
      fr: "Captif Traumatique",
      es: "Atrapado en el Vínculo"
    }
  },
  {
    level: "elevated_addiction",
    scoreRange: [26, 31],
    title: {
      en: "Elevated Narcissistic Abuse & Biochemical Addiction",
      id: "Kecanduan Biokimiawi Tinggi & Siklus Pelecehan Narsisistik",
      de: "Schwere biochemische Sucht & Narzisstischer Missbrauch",
      fr: "Addiction neurochimique sévère & emprise narcissique",
      es: "Adicción neuroquímica severa y abuso narcisista"
    },
    summary: {
      en: "You are under profound traumatic enmeshment. You doubt your sanity, feel physically unwell without them, keep toxic secrets, and stay despite unbearable psychological agony.",
      id: "Anda berada dalam jeratan trauma mendalam. Anda meragukan kewarasan sendiri, merasa sakit fisik saat berpisah, memendam rahasia kelam, dan tetap bertahan meski batin hancur.",
      de: "Sie befinden sich in tiefer seelischer Gefangenschaft. Sie zweifeln an Ihrem Verstand, leiden körperlich unter Trennung und bleiben trotz extremer Schmerzen.",
      fr: "Vous subissez une emprise destructrice majeure. Vous doutez de votre raison, souffrez de douleurs physiques en cas de silence et restez malgré la terreur.",
      es: "Vives bajo una profunda sumisión traumática. Dudas de tu cordura, enfermas físicamente ante el distanciamiento y sigues ahí a costa de tu dignidad."
    },
    neurobiology: {
      en: "Chronic hypercortisolemia and severe down-regulation of dopamine D2 receptors create extreme withdrawal anxiety resembling chemical substance addiction during periods of silence.",
      id: "Kelebihan hormon kortisol kronis dan penurunan reseptor dopamin D2 memicu kepanikan sakaw fisik yang hebat saat kontak terputus.",
      de: "Chronischer Stress und herabregulierte Dopamin-Rezeptoren erzeugen bei Kontaktabbruch quälende Entzugserscheinungen wie bei Drogenabhängigkeit.",
      fr: "L'épuisement des récepteurs dopaminergiques et le cortisol chronique provoquent une angoisse de sevrage physique intolérable en cas d'éloignement.",
      es: "El cortisol crónico y el agotamiento de dopamina generan una angustia de abstinencia física insoportable ante el silencio."
    },
    actionProtocol: {
      en: [
        "Emergency Somatic Safety Plan: Establish a safe physical sanctuary and emergency support contact.",
        "Treat Separation as Chemical Detox: Expect acute cravings for 30 to 90 days; understand that cravings are biological withdrawals, not proof of true love.",
        "Use Nuju Audio Venting Daily: Speak out loud into Nuju whenever the urge to text or plead strikes, discharging the panic through sound."
      ],
      id: [
        "Susun Rencana Keamanan Darurat: Tentukan tempat aman fisik dan kontak sahabat darurat jika situasi memburuk.",
        "Sadari Fase Sakaw Kimiawi: Pahami bahwa rasa rindu menyiksa selama 30-90 hari no-contact adalah reaksi sakaw biologis otak, bukan bukti 'cinta sejati'.",
        "Kuras Dorongan Menghubungi Lewat Jurnal Nuju: Kapan pun jari Anda gemetar ingin mengirim chat atau memohon baikan, buka Nuju dan bicaralah sepuasnya sampai kepanikan reda."
      ],
      de: [
        "Sicherheitsplan aufstellen: Bestimmen Sie sichere Zufluchtsorte und Notfallkontakte.",
        "Trennung als biochemischen Entzug begreifen: Das schmerzhafte Verlangen in den ersten 90 Tagen ist Neurobiologie, kein Seelenverwandten-Beweis.",
        "Nuju-Notfall-Aufnahme: Wann immer der Drang aufkommt anzurufen, sprechen Sie die Verzweiflung im Nuju-Sprachjournal aus."
      ],
      fr: [
        "Plan de sécurité d'urgence : identifiez un refuge physique et des contacts de crise.",
        "Traitez la rupture comme un sevrage toxique : le manque aigu pendant 90 jours est chimique, ce n'est pas le signe du grand amour.",
        "Décharge vocale Nuju : parlez à voix haute dans Nuju à chaque envie compulsive de le/la contacter."
      ],
      es: [
        "Plan de seguridad y emergencia: designa un refugio físico y contactos de apoyo incondicional.",
        "Asume la ruptura como una desintoxicación: el dolor punzante durante 90 días es química cerebral, no amor predestinado.",
        "Descarga por voz en Nuju: cada vez que sientas el impulso de rogar o escribirle, grábalo todo en Nuju hasta que baje la ansiedad."
      ]
    },
    badge: {
      en: "Severe Betrayal Bond",
      id: "Ikatan Trauma Berat",
      de: "Schwere Traumabindung",
      fr: "Sous Emprise Narcissique",
      es: "Vínculo Traumático Severo"
    }
  },
  {
    level: "severe_paralysis",
    scoreRange: [32, 36],
    title: {
      en: "Critical Betrayal Bond & Identity Paralysis",
      id: "Ikatan Pengkhianatan Kritis & Kelumpuhan Eksistensial",
      de: "Kritische Traumabindung & Identitätskollaps",
      fr: "Lien traumatique critique & effondrement de l'identité",
      es: "Vínculo traumático crítico y colapso identitario"
    },
    summary: {
      en: "Your sense of self has been almost entirely subsumed by the toxic dynamic. You feel powerless, dissociated, terrified of life without them, and trapped in survival terror.",
      id: "Jati diri Anda telah hampir sepenuhnya ditelan oleh dinamika toksik ini. Anda merasa tidak berdaya, mengalami disosiasi, ketakutan luar biasa membayangkan hidup tanpanya, dan terjebak dalam mode bertahan hidup murni.",
      de: "Ihre Identität wurde fast vollständig ausgelöscht. Sie fühlen sich handlungsunfähig, dissoziiert und in permanenter existenzieller Angst gefangen.",
      fr: "Votre identité a été broyée par cette emprise. Vous vous sentez anéanti(e), dissocié(e), terrifié(e) par l'avenir et incapable d'agir seul(e).",
      es: "Tu identidad ha sido absorbida casi por completo por esta relación. Te sientes disociado, aterrado ante la vida sin esa persona y en parálisis vital."
    },
    neurobiology: {
      en: "Complete dorsal vagal shutdown combined with severe learned helplessness; the nervous system treats the abuser as both the source of terror and the only source of safety.",
      id: "Kondisi dorsal vagal shutdown menyeluruh berpadu dengan learned helplessness (ketidakberdayaan yang dipelajari); sistem saraf memandang pelaku sebagai sumber teror sekaligus satu-satunya penyelamat semu.",
      de: "Vollständiger dorsaler Vagus-Kollaps mit erlernter Hilflosigkeit: Das Gehirn sieht im Peiniger paradoxerweise die einzige Rettungsquelle.",
      fr: "Sidération dorsale vagale complète et impuissance acquise : le cerveau perçoit l'agresseur comme étant à la fois la menace et l'unique refuge.",
      es: "Colapso vagal dorsal completo e indefensión aprendida: el sistema nervioso percibe al agresor como la fuente de terror y su único refugio."
    },
    actionProtocol: {
      en: [
        "Immediate Professional & Legal Intervention: Reach out to a trauma-informed psychologist, domestic abuse helpline, or legal advisor immediately.",
        "Zero Contact Protocol: Block all phone numbers, social media, and mutual conduits; silence is the only antidote to biochemical rewiring.",
        "Nuju Somatic Grounding Audio: Listen to gentle nervous system resets in Nuju multiple times daily to remind your body that you exist and are safe."
      ],
      id: [
        "Intervensi Profesional & Hukum Segera: Hubungi psikolog spesialis trauma, layanan bantuan konseling kekerasan dalam relasi, atau pendamping hukum tepercaya.",
        "Terapkan Protokol No-Contact Total: Blokir seluruh kontak, media sosial, dan perantara; keheningan total adalah satu-satunya obat pemutus sirkuit biokimiawi ini.",
        "Latihan Grounding Suara Nuju: Dengarkan audio penenang saraf Nuju berkali-kali setiap hari untuk mengingatkan tubuh Anda bahwa Anda berharga, hidup, dan aman."
      ],
      de: [
        "Sofortige professionelle Hilfe: Kontaktieren Sie spezialisierte Trauma-Therapeuten oder Krisen-Hotlines.",
        "Strikter No-Contact: Blockieren Sie alle Kommunikationswege; absolute Distanz ist die einzige Rettung.",
        "Nuju Nervensystem-Reset: Hören Sie mehrmals täglich beruhigende Audio-Tools in Nuju, um den Körper aus der Erstarrung zu holen."
      ],
      fr: [
        "Aide clinique et soutien immédiat : faites appel à un psychologue formé aux violences psychologiques ou à une ligne d'écoute.",
        "Protocole Zéro Contact absolu : bloquez tous les canaux numériques et intermédiaires pour stopper l'intoxication cérébrale.",
        "Ancrage somatique Nuju : écoutez les fréquences apaisantes de Nuju plusieurs fois par jour pour retrouver la sécurité corporelle."
      ],
      es: [
        "Ayuda profesional urgente: acude a un terapeuta especializado en trauma relacional o líneas de apoyo contra el maltrato psicológico.",
        "Contacto Cero radical: bloquea cualquier vía de comunicación; el silencio absoluto es la única cura neurobiológica.",
        "Regulación somática con Nuju: reproduce los ejercicios de respiración y sonidos relajantes de Nuju a diario para salir del colapso."
      ]
    },
    badge: {
      en: "Critical Betrayal Bond",
      id: "Trauma Bond Kritis",
      de: "Kritische Traumabindung",
      fr: "Emprise Critique",
      es: "Vínculo Traumático Crítico"
    }
  }
];

export const TRAUMA_BOND_SUBSCALE_INFO = {
  intermittent_addiction: {
    name: {
      en: "Intermittent Reinforcement & Chemical Craving",
      id: "Kecanduan Penguatan Intermiten & Sakaw Kimiawi",
      de: "Intermittierende Verstärkung & Suchtdruck",
      fr: "Renforcement Intermittent & Sevrage Chimique",
      es: "Refuerzo Intermitente y Ansiedad de Abstinencia"
    },
    description: {
      en: "Dopamine-oxytocin spikes during love-bombing and intense somatic withdrawal panic during cold withdrawal.",
      id: "Lonjakan dopamin-oksitosin saat fase manis dan panik sakaw fisik saat didiamkan atau dicampakkan.",
      de: "Dopaminschübe in Versöhnungsphasen und schwere Entzugssymptome bei Kälte und Schweigen.",
      fr: "Euphorie chimique lors des réconciliations et panique viscérale de manque lors des silences punitifs.",
      es: "Picos de dopamina en la reconciliación y angustia física similar a la abstinencia ante el desprecio."
    }
  },
  cognitive_dissonance_defense: {
    name: {
      en: "Cognitive Dissonance & Partner Rationalization",
      id: "Disonansi Kognitif & Pembelaan Pasangan",
      de: "Kognitive Dissonanz & Beschönigung",
      fr: "Dissonance Cognitive & Justification du Partenaire",
      es: "Disonancia Cognitiva y Justificación de la Pareja"
    },
    description: {
      en: "Making excuses for cruelty, clinging to who they were in the beginning, and hiding the truth from loved ones.",
      id: "Mencari pembenaran atas kekasaran, terobsesi dengan sosok manis di awal jadian, dan merahasiakan boroknya dari sahabat.",
      de: "Verletzungen rechtfertigen, an der Kennenlernphase festhalten und die Realität vor Freunden verheimlichen.",
      fr: "Minimiser les violences, s'accrocher aux premiers mois parfaits et cacher la vérité à son entourage.",
      es: "Justificar el maltrato, añorar la etapa idílica inicial y ocultar la verdad a amigos y familiares."
    }
  },
  identity_erosion: {
    name: {
      en: "Identity Erosion & Learned Helplessness",
      id: "Pengikisan Jati Diri & Ketidakberdayaan Kronis",
      de: "Identitätsverlust & Erlernte Hilflosigkeit",
      fr: "Érosion de l'Identité & Impuissance Acquise",
      es: "Erosión de la Identidad e Indefensión Aprendida"
    },
    description: {
      en: "Walking on eggshells, sacrificing personal values, doubting memory/sanity, and feeling unable to leave.",
      id: "Takut salah bicara (eggshells), melanggar prinsip diri, meragukan ingatan sendiri, dan merasa lumpuh untuk pergi.",
      de: "Auf Eiern gehen, eigene Werte verraten, am Verstand zweifeln und sich handlungsunfähig fühlen.",
      fr: "Marcher sur des œufs, trahir ses limites, douter de sa lucidité et se sentir impuissant(e) à rompre.",
      es: "Vivir con miedo a equivocarse, traicionar los propios valores, dudar del propio juicio y sentirse incapaz de huir."
    }
  }
};

export function getTraumaBondResult(totalScore: number): TraumaBondResultLevel {
  const matched = TRAUMA_BOND_RESULTS.find(
    (lvl) => totalScore >= lvl.scoreRange[0] && totalScore <= lvl.scoreRange[1]
  );
  return matched || TRAUMA_BOND_RESULTS[TRAUMA_BOND_RESULTS.length - 1];
}

export function calculateTraumaBondSubscales(answers: Record<number, number>): {
  intermittent_addiction: number;
  cognitive_dissonance_defense: number;
  identity_erosion: number;
} {
  let intermittent_addiction = 0;
  let cognitive_dissonance_defense = 0;
  let identity_erosion = 0;

  TRAUMA_BOND_QUESTIONS.forEach((q) => {
    const val = answers[q.id] || 0;
    if (q.subscale === "intermittent_addiction") intermittent_addiction += val;
    if (q.subscale === "cognitive_dissonance_defense") cognitive_dissonance_defense += val;
    if (q.subscale === "identity_erosion") identity_erosion += val;
  });

  return { intermittent_addiction, cognitive_dissonance_defense, identity_erosion };
}
