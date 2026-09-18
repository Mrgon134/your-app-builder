export type ComparisonTrapCardLang = "en" | "id" | "de" | "fr" | "es";

export interface ComparisonTrapQuestion {
  id: number;
  subscale: "upward_comparison" | "foster_envy_resentment" | "identity_erosion";
  text: {
    en: string;
    id: string;
    de: string;
    fr: string;
    es: string;
  };
}

export interface ComparisonTrapResultLevel {
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

export const COMPARISON_TRAP_QUESTIONS: ComparisonTrapQuestion[] = [
  // 1. Upward Comparison & Chronic Lag
  {
    id: 1,
    subscale: "upward_comparison",
    text: {
      en: "Seeing peers buy homes, get promoted, or travel on social media leaves me with a heavy, sinking feeling that I am hopelessly behind in life.",
      id: "Melihat teman sebaya membeli rumah, naik jabatan, atau liburan di media sosial membuat dada saya sesak dan merasa tertinggal jauh dalam hidup.",
      de: "Wenn ich auf Social Media sehe, wie Gleichaltrige Häuser kaufen, befördert werden oder reisen, habe ich das erdrückende Gefühl, hoffnungslos hinterherzuhinken.",
      fr: "Voir des personnes de mon âge acheter un bien, obtenir une promotion ou voyager me donne le sentiment douloureux d'avoir gâché ma vie.",
      es: "Ver a conocidos comprar casas, ascender en el trabajo o viajar en redes sociales me deja una sensación amarga de haberme quedado atrás."
    }
  },
  {
    id: 2,
    subscale: "upward_comparison",
    text: {
      en: "I obsessively benchmark my salary, relationship milestones, and physical fitness against people my age, feeling like an imposter if I don't match them.",
      id: "Saya terobsesi membandingkan gaji, status hubungan, dan fisik saya dengan orang seumuran, dan merasa gagal jika tidak setara dengan mereka.",
      de: "Ich vergleiche mein Gehalt, meinen Beziehungsstatus und meine Fitness ständig mit Gleichaltrigen und fühle mich als Versager, wenn ich nicht mithalte.",
      fr: "Je compare obsessionnellement mon salaire, ma vie amoureuse et mon physique à ceux des autres, me sentant illégitime si je ne fais pas aussi bien.",
      es: "Comparo de forma obsesiva mi sueldo, mi situación sentimental y mi cuerpo con los de mi edad, sintiéndome un fraude si no alcanzo su nivel."
    }
  },
  {
    id: 3,
    subscale: "upward_comparison",
    text: {
      en: "Even after achieving something meaningful, my pride evaporates the moment I notice someone else who did it younger, faster, or with more recognition.",
      id: "Bahkan setelah meraih pencapaian penting, rasa bangga saya langsung sirna saat melihat orang lain yang meraihnya lebih muda, lebih cepat, atau lebih viral.",
      de: "Selbst nach einem Erfolg verfliegt mein Stolz sofort, sobald ich jemanden sehe, der es jünger, schneller oder erfolgreicher geschafft hat.",
      fr: "Même après une belle réussite, ma joie s'évapore dès que je vois quelqu'un l'ayant accompli plus jeune, plus vite ou avec plus d'éloges.",
      es: "Incluso tras lograr algo importante, mi orgullo se esfuma en cuanto veo a alguien que lo logró más joven, más rápido o con más aplausos."
    }
  },
  {
    id: 4,
    subscale: "upward_comparison",
    text: {
      en: "I find myself LinkedIn-stalking or Instagram-scrolling late at night, cataloging other people's accomplishments while drowning in quiet panic.",
      id: "Saya mendapati diri saya menguntit LinkedIn atau Instagram orang lain larut malam, mencatat prestasi mereka sambil dilanda kepanikan batin.",
      de: "Ich ertappe mich dabei, wie ich nachts auf LinkedIn oder Instagram die Erfolge anderer durchforste und dabei in stille Panik verfalle.",
      fr: "Je me surprends à traquer les réussites des autres sur LinkedIn ou Instagram tard le soir, submergé(e) par une angoisse silencieuse.",
      es: "Me descubro espiando perfiles en LinkedIn o Instagram a altas horas de la noche, repasando los logros ajenos con una angustia creciente."
    }
  },

  // 2. Foster Envy & Secret Resentment
  {
    id: 5,
    subscale: "foster_envy_resentment",
    text: {
      en: "When a friend announces major good news (engagement, funding, dream job), my immediate visceral reaction is a pang of envy before I can force a congratulation.",
      id: "Ketika teman mengumumkan kabar bahagia (tunangan, pendanaan bisnis, kerja impian), reaksi spontan tubuh saya adalah rasa iri sebelum memaksakan ucapan selamat.",
      de: "Wenn Freunde einen großen Erfolg feiern, spüre ich zuerst einen Stich von Neid, bevor ich mich mühsam zu Glückwünschen durchringen kann.",
      fr: "Quand un ami annonce une grande nouvelle, ma première réaction viscérale est un pincement d'envie avant de pouvoir le féliciter sincèrement.",
      es: "Cuando un amigo anuncia una gran noticia, mi primera reacción instintiva es una punzada de envidia antes de poder forzar una felicitación."
    }
  },
  {
    id: 6,
    subscale: "foster_envy_resentment",
    text: {
      en: "I secretly feel a subtle sense of relief or schadenfreude when someone who seems to have an idyllic life experiences a public failure or relationship crisis.",
      id: "Secara diam-diam saya merasakan kelegaan terselubung saat seseorang yang hidupnya tampak sempurna tiba-tiba mengalami kegagalan atau krisis hubungan.",
      de: "Heimlich spüre ich Genugtuung, wenn jemand, dessen Leben perfekt schien, einen herben Rückschlag oder eine Beziehungskrise erleidet.",
      fr: "J'éprouve secrètement un soulagement inavouable quand une personne à la vie apparemment idéale subit un revers cuisant.",
      es: "Siento en secreto un alivio casi culpable cuando alguien con una vida aparentemente perfecta sufre un fracaso o una ruptura dolorosa."
    }
  },
  {
    id: 7,
    subscale: "foster_envy_resentment",
    text: {
      en: "I feel bitter that people with less talent or effort seem to get rewarded with wealth, fame, or lucky breaks while my hard work goes unnoticed.",
      id: "Saya merasa kesal melihat orang yang kurang berbakat atau malas justru mendapat rezeki nomplok, ketenaran, atau privilege sementara kerja keras saya tak dilirik.",
      de: "Es verbittert mich, dass weniger talentierte Menschen durch Glück oder Kontakte reich und berühmt werden, während mein Einsatz unbemerkt bleibt.",
      fr: "Je suis amer/ère de voir des personnes moins méritantes réussir par piston ou chance insolente pendant que mes efforts restent invisibles.",
      es: "Me llena de amargura ver a personas con menos talento recibir privilegios, fama o dinero fácil mientras mi esfuerzo pasa desapercibido."
    }
  },
  {
    id: 8,
    subscale: "foster_envy_resentment",
    text: {
      en: "Browsing feeds leaves me irritable and short-tempered with my real-life family, partner, or coworkers because their reality feels mundane compared to the internet.",
      id: "Melihat medsos membuat saya mudah marah pada keluarga atau pasangan di dunia nyata, karena kehidupan nyata mereka terasa membosankan dibanding internet.",
      de: "Nach dem Scrollen bin ich gereizt gegenüber meiner Familie oder meinem Partner, weil unser reales Leben im Vergleich so grau und banal wirkt.",
      fr: "Parcourir les réseaux me rend irritable envers mes proches, car leur quotidien me paraît terne comparé au glamour virtuel.",
      es: "Navegar por las redes me deja irritable y frío/a con mi pareja o familia, porque la realidad cotidiana me parece gris en comparación."
    }
  },

  // 3. Identity Erosion & Performative Living
  {
    id: 9,
    subscale: "identity_erosion",
    text: {
      en: "I choose cafes, vacations, clothes, and experiences based on how photogenic or impressive they will look to others rather than what I genuinely enjoy.",
      id: "Saya memilih kafe, liburan, pakaian, dan hobi berdasarkan seberapa estetik atau keren hal itu di mata orang lain daripada apa yang benar-benar saya sukai.",
      de: "Ich wähle Cafés, Urlaube, Kleidung und Freizeit danach aus, wie vorzeigbar sie wirken, statt nach dem, was mir wirklich Freude bereitet.",
      fr: "Je choisis mes sorties, mes vacances et mes vêtements pour leur potentiel 'instagrammable' plutôt que pour mon plaisir authentique.",
      es: "Elijo restaurantes, vacaciones y ropa en función de cómo se verán en fotos o qué imagen proyectarán más que por lo que de verdad disfruto."
    }
  },
  {
    id: 10,
    subscale: "identity_erosion",
    text: {
      en: "I have changed my career goals or life ambitions solely because I felt pressured to compete with what is considered prestigious by my peer group.",
      id: "Saya mengubah arah karir atau impian hidup semata-mata karena tertekan ingin bersaing dengan apa yang dianggap bergengsi oleh lingkungan sekitar.",
      de: "Ich habe Lebensziele geändert, nur um im Wettbewerb um Prestige und gesellschaftliche Anerkennung nicht den Kürzeren zu ziehen.",
      fr: "J'ai modifié mes ambitions professionnelles uniquement pour rivaliser avec ce qui est jugé prestigieux dans mon cercle social.",
      es: "He cambiado mis metas de vida solo para competir con lo que mi entorno considera prestigioso o exitoso."
    }
  },
  {
    id: 11,
    subscale: "identity_erosion",
    text: {
      en: "I feel like an empty vessel or actor; if social media vanished tomorrow, I wouldn't know who I am or what I truly desire.",
      id: "Saya merasa seperti aktor hampa; jika media sosial lenyap besok, saya tidak tahu lagi siapa diri saya yang sebenarnya atau apa yang sungguh saya inginkan.",
      de: "Ich fühle mich wie eine leere Hülle: Würden soziale Medien morgen verschwinden, wüsste ich kaum noch, wer ich bin oder was ich will.",
      fr: "J'ai l'impression d'être une coquille vide : si les réseaux disparaissaient, j'ignorerais qui je suis et ce que je désire vraiment.",
      es: "Me siento como un cascarón vacío: si las redes desaparecieran mañana, no sabría quién soy ni qué deseo de verdad."
    }
  },
  {
    id: 12,
    subscale: "identity_erosion",
    text: {
      en: "I feel exhausted from curating a successful, happy exterior while living with a gnawing sense of inadequacy and self-reproach on the inside.",
      id: "Saya sangat lelah memelihara citra sukses dan bahagia di luar, padahal di dalam hati saya selalu dihantui rasa kurang dan menyalahkan diri sendiri.",
      de: "Ich bin erschöpft davon, nach außen die glückliche Erfolgsfassade aufrechtzuerhalten, während mich innen ständige Unzulänglichkeit zermürbt.",
      fr: "Je suis épuisé(e) de projeter une image de bonheur et de réussite alors qu'au fond, un sentiment d'insuffisance me ronge constamment.",
      es: "Estoy exhausto/a de mantener una fachada de triunfo y alegría mientras por dentro me devora una sensación constante de no ser suficiente."
    }
  }
];

export const COMPARISON_TRAP_OPTIONS = [
  {
    value: 0,
    label: {
      en: "Never / Completely Untrue",
      id: "Tidak Pernah / Sama Sekali Tidak Benar",
      de: "Nie / Trifft überhaupt nicht zu",
      fr: "Jamais / Pas du tout vrai",
      es: "Nunca / Totalmente falso"
    }
  },
  {
    value: 1,
    label: {
      en: "Rarely / Mildly True",
      id: "Jarang / Sedikit Benar",
      de: "Selten / Trifft kaum zu",
      fr: "Rarement / Plutôt faux",
      es: "Raras veces / Poco cierto"
    }
  },
  {
    value: 2,
    label: {
      en: "Sometimes / Noticeable Envy",
      id: "Kadang-kadang / Cukup Tergoda Membandingkan",
      de: "Manchmal / Spürbarer Neid",
      fr: "Parfois / Envie perceptible",
      es: "A veces / Envidia perceptible"
    }
  },
  {
    value: 3,
    label: {
      en: "Often / Severe Comparison Distress",
      id: "Sering / Tekanan Perbandingan Berat",
      de: "Oft / Starke Vergleichsbelastung",
      fr: "Souvent / Forte détresse comparative",
      es: "A menudo / Fuerte angustia comparativa"
    }
  },
  {
    value: 4,
    label: {
      en: "Constantly / Paralyzing Envy & Identity Loss",
      id: "Selalu / Lumpuh Iri Hati & Hilang Jati Diri",
      de: "Ständig / Lähmender Neid & Identitätsverlust",
      fr: "En permanence / Envie paralysante & Perte d'identité",
      es: "Constantemente / Envidia paralizante y Pérdida de identidad"
    }
  }
];

export const COMPARISON_TRAP_RESULTS: ComparisonTrapResultLevel[] = [
  {
    level: "minimal",
    scoreRange: [0, 11],
    badge: {
      en: "Grounded Self-Worth",
      id: "Harga Diri Kokoh & Mandiri",
      de: "Gefestigter Selbstwert",
      fr: "Estime de Soi Enracinée",
      es: "Autoestima Enraizada"
    },
    title: {
      en: "Sovereign Mind: Intrinsic Motivation & Secure Milestones",
      id: "Pikiran Berdaulat: Motivasi Intrinsik & Jalur Hidup Nyaman",
      de: "Souveräner Geist: Intrinsische Motivation & Gelassenheit",
      fr: "Esprit Souverain : Motivation Intrinsèque & Rythme Paisible",
      es: "Mente Soberana: Motivación Intrínseca y Ritmo Propio"
    },
    summary: {
      en: "You have an exceptionally grounded psychological compass. You recognize that social media feeds are curated theatrical stages, not reality. You celebrate your peers' genuine achievements without feeling diminished, and your life choices are anchored in personal values rather than competitive vanity.",
      id: "Kamu memiliki kompas psikologis yang sangat kokoh. Kamu sadar betul bahwa media sosial adalah panggung sandiwara yang telah diedit, bukan realitas utuh. Kamu mampu berbahagia dengan tulus atas kesuksesan temanmu tanpa merasa tersaingi, dan pilihan hidupmu berakar pada nilai pribadimu sendiri.",
      de: "Du besitzt einen bemerkenswert stabilen inneren Kompass. Du durchschaust Social Media als inszenierte Scheinwelt. Du kannst dich ehrlich für andere freuen, ohne dich selbst kleiner zu fühlen, und lebst nach deinen eigenen Werten statt nach fremden Erwartungen.",
      fr: "Vous possédez une boussole intérieure exceptionnellement stable. Vous savez que les réseaux ne montrent que des façades filtrées. Vous vous réjouissez sincèrement des succès d'autrui sans vous sentir dévalorisé(e), fidèle à vos propres priorités.",
      es: "Posees una brújula emocional admirablemente sólida. Comprendes que las redes son solo escaparates editados. Celebras los logros ajenos sin compararte y tus elecciones responden a tus valores reales, no a la presión del estatus."
    },
    neurobiology: {
      en: "Healthy dopaminergic regulation centered on intrinsic mastery rather than external validation. Low baseline cortisol, robust anterior insula resilience, and high prefrontal satisfaction signals.",
      id: "Regulasi dopamin sehat yang berpusat pada kepuasan berkarya (intrinsik) daripada validasi jempol orang lain. Hormon kortisol rendah dan ketahanan saraf yang kuat terhadap provokasi status.",
      de: "Gesunde Dopaminregulation durch intrinsische Freude an eigener Entwicklung statt Bestätigungssucht. Niedriges Cortisol und hohe neuronale Zufriedenheitssignale im Stirnhirn.",
      fr: "Régulation dopaminergique saine ancrée dans la maîtrise personnelle plutôt que dans les likes. Cortisol bas et excellente immunité neuronale contre les comparaisons de statut.",
      es: "Regulación dopaminérgica óptima guiada por el progreso personal y no por la aprobación externa. Cortisol estable y sólida resiliencia ante la envidia social."
    },
    actionProtocol: {
      en: [
        "Protect your feeds ruthlessly: Keep muting accounts that spark subtle inadequacy.",
        "Deepen real-world craft: Continue investing time in solitary creative or physical disciplines.",
        "Practice private gratitude: Write down 3 non-monetary blessings each evening."
      ],
      id: [
        "Jaga linimasamu tanpa ampun: Tetap mute akun yang memicu rasa tidak aman atau pamer berlebihan.",
        "Perdalam keahlian di dunia nyata: Luangkan waktu untuk hobi atau olahraga yang tidak perlu diunggah ke internet.",
        "Syukuri hal-hal sederhana: Catat 3 nikmat non-materi setiap malam."
      ],
      de: [
        "Feeds konsequent filtern: Mute Konten, die subtile Minderwertigkeitsgefühle auslösen.",
        "Echte Fertigkeiten vertiefen: Investiere Zeit in Handwerk, Sport oder Kunst fernab von Kameras.",
        "Dankbarkeit für das Kleine: Notiere abends 3 immaterielle Dinge, die deinen Tag bereichert haben."
      ],
      fr: [
        "Protégez vos réseaux : Masquez sans hésiter les comptes qui réveillent des doutes stériles.",
        "Cultivez des passions réelles : Investissez dans des activités manuelles ou physiques hors écran.",
        "Pratiquez la gratitude intime : Notez 3 bonheurs simples et non matériels chaque soir."
      ],
      es: [
        "Limpia tu feed sin culpa: Silencia cualquier perfil que te genere inseguridad o comparaciones.",
        "Cultiva pasiones reales: Dedica tiempo a aficiones creativas o deportivas sin compartirlas en línea.",
        "Gratitud íntima: Escribe cada noche 3 satisfacciones sencillas que no dependan del dinero."
      ]
    }
  },
  {
    level: "mild",
    scoreRange: [12, 23],
    badge: {
      en: "Occasional Peer Envy",
      id: "Iri Hati Sebaya Ringan",
      de: "Gelegentlicher Vergleichs-Stress",
      fr: "Envie Épisodique Légère",
      es: "Envidia Puntual Leve"
    },
    title: {
      en: "Mild Comparison Friction: Milestone Insecurity & Feed Vulnerability",
      id: "Gesekan Perbandingan Ringan: Ragu Pencapaian Diri Saat Buka Medsos",
      de: "Leichte Vergleichsfalle: Status-Unsicherheit bei Meilensteinen",
      fr: "Friction Modérée : Insécurité Face aux Succès d'Autrui",
      es: "Fricción Leve: Dudas de Progreso y Desgaste por Pantallas"
    },
    summary: {
      en: "You are generally confident, but specific triggers—such as peer weddings, startup funding, or luxury vacations—occasionally trigger sudden waves of inadequacy. You catch yourself comparing timelines, wondering if you took too long to find your footing, but you still possess clear personal passions.",
      id: "Kamu umumnya cukup percaya diri, tetapi pemicu tertentu—seperti pernikahan teman, promosi karir, atau foto liburan mewah—sesekali memicu rasa tertinggal. Kamu sesekali membandingkan lini masa hidupmu, meski kamu masih memiliki pegangan cita-cita sendiri.",
      de: "Du bist grundsätzlich zufrieden, doch bestimmte Auslöser—wie Hochzeiten, Beförderungen oder Luxusreisen im Bekanntenkreis—wecken gelegentlich Stiche von Selbstzweifeln. Du fragst dich manchmal, ob du im Lebenszeitplan hinterherhinkst.",
      fr: "Vous êtes plutôt équilibré(e), mais certains événements—mariages, promotions ou voyages de luxe de vos pairs—déclenchent parfois un pincement d'infériorité et des doutes passagers sur votre trajectoire.",
      es: "Sueles estar seguro/a de ti, pero ciertos detonantes—anuncios de bodas, ascensos o viajes lujosos—despiertan punzadas de inseguridad sobre tu propio ritmo de vida."
    },
    neurobiology: {
      en: "Transient activation of the dorsal anterior cingulate cortex (social pain center) upon viewing upward social comparison cues, followed by mild sympathetic arousal and restlessness.",
      id: "Aktivasi sesaat pada korteks cingulate anterior dorsal (pusat rasa sakit penolakan sosial) saat melihat kesuksesan orang lain, diikuti kegelisahan ringan sistem saraf simpatik.",
      de: "Vorübergehende Reizung des dorsalen anterioren Cingulums (soziales Schmerzzentrum) bei Aufwärtsvergleichen, gefolgt von unruhiger Cortisol-Ausschüttung.",
      fr: "Activation transitoire du cortex cingulaire antérieur (siège de la douleur sociale) face aux réussites d'autrui, provoquant une brève agitation nerveuse.",
      es: "Estimulación pasajera de la corteza cingulada anterior dorsal ante el éxito de terceros, generando una leve inquietud nerviosa."
    },
    actionProtocol: {
      en: [
        "Institute a 'No Social Media Before 10 AM' rule: Own your morning headspace before absorbing others' lives.",
        "Reframe envy as a compass: Ask: 'What specific element of their life am I craving, and how can I cultivate a small version of it in mine?'",
        "Record raw comparisons in audio: Vent the petty envy into Nuju to neutralize it before it festers."
      ],
      id: [
        "Terapkan aturan 'Dilarang Buka Medsos Sebelum Jam 10 Pagi': Kuasai kejernihan pikiran pagimu sebelum melihat hidup orang lain.",
        "Ubah rasa iri menjadi kompas: Tanyakan: 'Bagian apa dari hidup mereka yang sebenarnya aku inginkan, dan bagaimana aku bisa mewujudkannya pelan-pelan?'",
        "Curhatkan rasa irimu ke audio: Keluarkan unek-unek cemburumu di Nuju agar rasa iri itu tidak membusuk menjadi dengki."
      ],
      de: [
        "Kein Social Media vor 10 Uhr morgens: Starte in deinen eigenen Tag, bevor du fremde Highlights konsumierst.",
        "Neid als Wegweiser nutzen: Frage dich: 'Welchen echten Wunsch spiegelt mir dieser Erfolg, und wie kann ich ihn selbst anpacken?'",
        "Neid-Gedanken in Nuju aussprechen: Entlade kleinliche Vergleiche im Sprachtagebuch, bevor sie sich festsetzen."
      ],
      fr: [
        "Pas de réseaux avant 10h du matin : Préservez votre clarté mentale matinale avant de voir la vie des autres.",
        "Transformez l'envie en boussole : Demandez-vous : 'Quel désir réel cette jalousie révèle-t-elle chez moi ?'",
        "Exprimez vos jalousies à l'oral dans Nuju : Déchargez vos frustrations dans l'audio pour désamorcer l'amertume."
      ],
      es: [
        "Nada de redes antes de las 10:00: Aduéñate de tus mañanas antes de intoxicarte con las vidas ajenas.",
        "Convierte la envidia en brújula: Pregúntate: '¿Qué anhelo real me muestra esta comparación y cómo puedo construirlo yo?'",
        "Descarga tus celos en Nuju: Habla sin vergüenza de tus comparaciones en el diario de voz para disolverlas."
      ]
    }
  },
  {
    level: "moderate",
    scoreRange: [24, 35],
    badge: {
      en: "Chronic Comparison Trap",
      id: "Jebakan Perbandingan Kronis",
      de: "Chronische Vergleichsfalle",
      fr: "Piège Comparatif Chronique",
      es: "Trampa Comparativa Crónica"
    },
    title: {
      en: "The Social Media Envy Spiral: Chronic Inadequacy & Secret Bitterness",
      id: "Spiral Iri Hati Digital: Merasa Selalu Kurang & Dengki Terpendam",
      de: "Die Social-Media-Neidspirale: Chronische Unzulänglichkeit & Groll",
      fr: "Spirale de l'Envie Virtuelle : Insuffisance Permanente & Rancœur",
      es: "Espiral de Envidia Digital: Insuficiencia Crónica y Amargura"
    },
    summary: {
      en: "You are trapped in compulsive social comparison. Scrolling leaves you depleted, angry, and convinced that everyone else has received an easier, luckier script in life. You harbor secret resentment toward successful peers, downplay your own gifts, and increasingly tailor your outward lifestyle to generate admiration rather than joy.",
      id: "Kamu terperangkap dalam perbandingan sosial kompulsif. Membuka medsos membuatmu terkuras, kesal, dan yakin bahwa hidup orang lain jauh lebih beruntung dan mudah. Kamu memendam dengki rahasia pada teman yang sukses, meremehkan bakatmu sendiri, dan mulai memamerkan hal-hal hanya demi mencari decak kagum orang lain.",
      de: "Du steckst tief in der Vergleichsfalle. Das Scrollen hinterlässt dich ausgelaugt, wütend und überzeugt, vom Schicksal benachteiligt worden zu sein. Du hegst heimlichen Groll gegen erfolgreiche Bekannte, machst deine eigenen Talente nieder und lebst zunehmend für den schönen Schein.",
      fr: "Vous êtes enfermé(e) dans une comparaison destructrice permanente. Les réseaux vous laissent vidé(e), furieux/se et persuadé(e) que les autres ont une vie bénie des dieux. Vous jalousez vos pairs et gaspillez votre énergie à soigner vos apparences.",
      es: "Estás atrapado/a en una dañina trampa comparativa. Mirar las redes te deja exhausto/a, con rabia y convencido/a de que a los demás todo les resulta más fácil. Guardas rencor a conocidos exitosos y vives pendiente del qué dirán antes que de tu bienestar."
    },
    neurobiology: {
      en: "Chronic activation of the ventral striatum's social punishment signals and allostatic cortisol load. Decreased serotonin in social comparison contexts leads to hyper-fixation on perceived status hierarchies and pervasive depressive rumination.",
      id: "Aktivasi kronis pada sinyal hukuman sosial di ventral striatum dan beban kortisol alostatik. Penurunan serotonin dalam konteks perbandingan status memicu ruminasi depresi dan rasa rendah diri yang menyiksa.",
      de: "Dauererregung der neuronalen Verlustschaltkreise im ventralen Striatum und erhöhter Cortisolspiegel. Sinkendes Serotonin bei Statusvergleichen führt zu depressivem Grübeln und Selbstabwertung.",
      fr: "Sollicitation permanente des circuits de punition sociale dans le striatum ventral. La chute de sérotonine liée aux hiérarchies de statut entretient une rumination dépressive continue.",
      es: "Hiperactividad en los circuitos de pérdida de estatus del estriado ventral con sobrecarga de cortisol. El déficit de serotonina alimenta la rumiación depresiva y la desvalorización propia."
    },
    actionProtocol: {
      en: [
        "Execute a 30-day social media blackout: Delete Instagram, TikTok, and LinkedIn from your mobile devices.",
        "Shift from 'Consuming' to 'Creating': Spend 45 minutes daily producing something with your hands without sharing it online.",
        "Daily voice journaling release in Nuju: Confess your darkest feelings of envy and resentment in Nuju each night to detoxify your heart."
      ],
      id: [
        "Lakukan puasa medsos 30 hari penuh: Hapus Instagram, TikTok, dan LinkedIn dari ponselmu.",
        "Beralih dari 'Konsumen' menjadi 'Pencipta': Luangkan 45 menit setiap hari untuk membuat karya fisik tanpa diposting ke internet.",
        "Detoksifikasi suara harian di Nuju: Akui rasa iri dan dengki tergelapmu di jurnal suara Nuju agar hatimu bersih dan tenang kembali."
      ],
      de: [
        "30 Tage vollständiger Social-Media-Blackout: Lösche Instagram, TikTok und LinkedIn vom Smartphone.",
        "Vom Konsumieren ins Schaffen kommen: Widme dich täglich 45 Minuten einem Projekt mit deinen Händen, ohne es im Netz zu teilen.",
        "Tägliche Entgiftung mit Nuju: Sprich deinen bittersten Neid im verschlüsselten Audiotagebuch Nuju aus, um die Seele zu befreien."
      ],
      fr: [
        "Black-out total de 30 jours : Supprimez Instagram, TikTok et LinkedIn de votre téléphone.",
        "Passez de la consommation à la création : Consacrez 45 minutes par jour à fabriquer quelque chose de vos mains sans le montrer.",
        "Détox vocale quotidienne dans Nuju : Déposez vos pensées les plus jalouses et vos rancœurs dans Nuju chaque soir pour alléger votre cœur."
      ],
      es: [
        "Apagón de redes de 30 días: Desinstala Instagram, TikTok y LinkedIn de tu teléfono móvil.",
        "Pasa del consumo a la creación: Dedica 45 minutos al día a construir o crear algo tangible sin publicarlo jamás.",
        "Desintoxicación diaria en Nuju: Confiesa tu envidia y tu enfado más crudo en el diario de voz íntimo de Nuju para purificar tu mente."
      ]
    }
  },
  {
    level: "severe",
    scoreRange: [36, 48],
    badge: {
      en: "Total Identity Paralysis",
      id: "Kelumpuhan Jati Diri Total",
      de: "Vollständige Identitätslähmung",
      fr: "Paralysie Identitaire Sévère",
      es: "Parálisis de Identidad y Desesperanza"
    },
    title: {
      en: "Chronic Status Despair: Complete Alienation & Toxic Schadenfreude",
      id: "Keputusasaan Status Akut: Keterasingan Diri & Hilangnya Arah Hidup",
      de: "Tiefste Status-Verzweiflung: Innere Entfremdung & zerstörerische Missgunst",
      fr: "Désespoir de Statut Absolu : Dépersonnalisation & Envie Toxique",
      es: "Desesperanza de Estatus Total: Alienación y Vacío Existencial"
    },
    summary: {
      en: "Your sense of self has been completely cannibalized by external comparison. You live in a constant agony of feeling like a pathetic failure, oscillating between bitter envy toward peers and profound depression. You have lost all contact with your genuine passions, evaluating every breath through the lens of outside validation, prestige, and social hierarchy.",
      id: "Jati dirimu telah habis dimakan oleh perbandingan tiada henti. Kamu hidup dalam siksaan merasa diri gagal total, terombang-ambing antara dengki pahit pada teman dan depresi mendalam. Kamu kehilangan seluruh kontak dengan impian tulusmu, memandang hidup semata-mata sebagai ajang gengsi dan perlombaan status semu.",
      de: "Deine Identität wurde durch den permanenten Vergleich vollkommen zerstört. Du lebst in der quälenden Überzeugung, ein armseliger Versager zu sein, gefangen zwischen beißendem Neid und tiefer Resignation. Du hast den Kontakt zu deinen eigenen Wünschen verloren und funktionierst nur noch für Bestätigung.",
      fr: "Votre identité a été dévorée par le regard d'autrui. Vous vivez dans le tourment constant d'être un déchet ou un raté, oscillant entre jalousie venimeuse et dépression sévère. Vous ne savez plus ce qui vous fait vibrer, esclave du prestige et du statut.",
      es: "Tu verdadera identidad ha sido arrasada por la comparación destructiva. Vives con la angustia de sentirte un fracasado absoluto, alternando entre la envidia amarga y la depresión profunda. Desconozco ya lo que amas de verdad, prisionero/a del estatus y la validación externa."
    },
    neurobiology: {
      en: "Dorsal vagal freeze and severe prefrontal hypofrontality in social domains. Prolonged defeat stress elevates systemic inflammatory cytokines (IL-6, TNF-alpha) and creates chronic anhedonia, emotional blunting, and social withdrawal.",
      id: "Kondisi dorsal vagal freeze dan penurunan fungsi prefrontal dalam relasi sosial. Stres kekalahan status berkepanjangan memicu lonjakan sitokin inflamasi tubuh (IL-6), memicu anhedonia, mati rasa, dan penarikan diri sosial total.",
      de: "Dorsale Vagus-Erstarrung und neuronale Niederlagen-Reaktion. Chronischer Status-Stress treibt Entzündungsmarker (IL-6, TNF-alpha) in die Höhe und führt zu tiefgreifender Anhedonie und sozialem Rückzug.",
      fr: "Effondrement vagal dorsal et réaction de défaite chronique. Le stress de déclassement perçu élève les cytokines inflammatoires, créant une anédonie majeure et un isolement total.",
      es: "Parálisis vagal dorsal y síndrome de derrota crónica. El estrés por estatus dispara las citoquinas inflamatorias en el organismo, provocando anhedonia severa y retraimiento social."
    },
    actionProtocol: {
      en: [
        "Full emergency digital detox: Disconnect from all competitive media feeds for at least 3-6 months.",
        "Radical milestone surrender: Accept that life is not a race or a tournament; mourn the lost fantasy of status.",
        "Zero-performance audio healing in Nuju: Speak your rawest grief, tears, and humiliation into Nuju's encrypted sanctuary every night."
      ],
      id: [
        "Detoks digital darurat total: Putus total semua linimasa media sosial kompetitif setidaknya selama 3-6 bulan.",
        "Pasrahkan perlombaan status: Sadari bahwa hidup bukanlah turnamen balap; lepaskan tuntutan gengsi palsu.",
        "Penyembuhan suara bebas tuntutan di Nuju: Tumpahkan semua tangis, duka, dan rasa terpurukmu ke dalam jurnal suara privat Nuju setiap malam."
      ],
      de: [
        "Vollständiger digitaler Notfall-Detox: Schalte alle kompetitiven Feeds für mindestens 3 bis 6 Monate rigoros ab.",
        "Das Status-Rennen aufgeben: Verstehe tief im Herzen, dass das Leben kein Turnier ist; betrauere die Scheinideale.",
        "Therapeutische Audio-Freisetzung mit Nuju: Weine, klage und sprich deine nackte Wahrheit in Nuju aus, um zu dir selbst zurückzufinden."
      ],
      fr: [
        "Détox numérique d'urgence : Coupez tout accès aux réseaux compétitifs pendant au moins 3 à 6 mois.",
        "Abandonnez la course au statut : Acceptez que la vie n'est pas un concours ; faites le deuil de vos fantasmes de prestige.",
        "Guérison vocale dans Nuju : Déposez vos larmes, vos cris et vos humiliations dans le sanctuaire chiffré de Nuju pour renaître à vous-même."
      ],
      es: [
        "Desconexión digital de emergencia: Sal por completo de todas las redes competitivas durante 3 a 6 meses como mínimo.",
        "Renuncia a la carrera de ratas: Asume que la vida no es un torneo; haz el duelo de las falsas expectativas de estatus.",
        "Sanación vocal íntima en Nuju: Descarga tu dolor, tus lágrimas y tu vergüenza en el refugio privado de Nuju para reencontrarte contigo."
      ]
    }
  }
];

export const COMPARISON_TRAP_SUBSCALE_INFO = {
  upward_comparison: {
    name: {
      en: "Upward Comparison & Chronic Lag",
      id: "Perbandingan ke Atas & Rasa Tertinggal",
      de: "Aufwärtsvergleich & Zeitplan-Druck",
      fr: "Comparaison Ascendante & Sentiment de Retard",
      es: "Comparación Ascendente y Sensación de Rezagado"
    },
    description: {
      en: "Tracking peers' promotions, weddings, and vacations; feeling hopelessly behind and diminishing your own wins.",
      id: "Memantau pencapaian, pernikahan, dan liburan orang lain; merasa sangat tertinggal dan meremehkan prestasi diri sendiri.",
      de: "Fixierung auf Meilensteine anderer, nagendes Gefühl des Zurückbleibens und Entwertung eigener Erfolge.",
      fr: "Surveillance des réussites et voyages d'autrui, angoisse d'être en retard et dévalorisation de ses propres victoires.",
      es: "Vigilancia de ascensos y bodas ajenas, angustia de quedarse atrás y menosprecio de los propios logros."
    }
  },
  foster_envy_resentment: {
    name: {
      en: "Foster Envy & Secret Resentment",
      id: "Iri Hati Terpendam & Kepahitan Hati",
      de: "Schwelender Neid & heimlicher Groll",
      fr: "Jalousie Sourde & Rancœur Secrète",
      es: "Envidia Latente y Resentimiento Oculto"
    },
    description: {
      en: "Visceral jealousy at friends' milestones, secret relief when others stumble, and bitterness toward undeserved success.",
      id: "Rasa cemburu menusuk saat teman sukses, kelegaan rahasia saat orang lain gagal, dan kesal melihat orang lain beruntung.",
      de: "Körperlicher Schmerz bei fremden Erfolgen, heimliche Schadenfreude bei Krisen und Verbitterung über Glück anderer.",
      fr: "Pincement d'envie devant le bonheur d'amis, soulagement inavoué face aux échecs d'autrui et amertume tenace.",
      es: "Dolor físico ante el triunfo ajeno, secreto alivio ante las caídas de otros y resentimiento hacia la suerte ajena."
    }
  },
  identity_erosion: {
    name: {
      en: "Identity Erosion & Performative Living",
      id: "Erosi Jati Diri & Hidup Demi Gengsi",
      de: "Identitätsverlust & Fassadenleben",
      fr: "Érosion Identitaire & Vie de Façade",
      es: "Erosión de Identidad y Vida de Escaparate"
    },
    description: {
      en: "Choosing lifestyle for photo optics, altering life goals for peer prestige, and feeling like an empty performer.",
      id: "Memilih gaya hidup demi estetik foto medsos, mengubah impian hidup demi gengsi, dan merasa seperti aktor hampa.",
      de: "Konsumentscheidungen für Bildmotive, Zieländerung für Status und Gefühl einer inneren Leere.",
      fr: "Décisions guidées par l'apparence virtuelle, réorientation de carrière par prestige et sentiment d'imposture.",
      es: "Decisiones tomadas para la foto, cambio de metas por prestigio social y sensación de ser un actor vacío."
    }
  }
};

export function getComparisonTrapResult(totalScore: number): ComparisonTrapResultLevel {
  const matched = COMPARISON_TRAP_RESULTS.find(
    (lvl) => totalScore >= lvl.scoreRange[0] && totalScore <= lvl.scoreRange[1]
  );
  return matched || COMPARISON_TRAP_RESULTS[COMPARISON_TRAP_RESULTS.length - 1];
}

export function calculateComparisonTrapSubscales(answers: Record<number, number>): {
  upward_comparison: number;
  foster_envy_resentment: number;
  identity_erosion: number;
} {
  let upward_comparison = 0;
  let foster_envy_resentment = 0;
  let identity_erosion = 0;

  COMPARISON_TRAP_QUESTIONS.forEach((q) => {
    const val = answers[q.id] || 0;
    if (q.subscale === "upward_comparison") upward_comparison += val;
    if (q.subscale === "foster_envy_resentment") foster_envy_resentment += val;
    if (q.subscale === "identity_erosion") identity_erosion += val;
  });

  return { upward_comparison, foster_envy_resentment, identity_erosion };
}
