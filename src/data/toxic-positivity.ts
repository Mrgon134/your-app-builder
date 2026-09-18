export type ToxicPositivityCardLang = "en" | "id" | "de" | "fr" | "es";

export interface ToxicPositivityQuestion {
  id: number;
  subscale: "suppression_shaming" | "spiritual_bypassing" | "emotional_isolation";
  text: {
    en: string;
    id: string;
    de: string;
    fr: string;
    es: string;
  };
}

export interface ToxicPositivityResultLevel {
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

export const TOXIC_POSITIVITY_QUESTIONS: ToxicPositivityQuestion[] = [
  // 1. Suppression Shaming & Forced Smiling
  {
    id: 1,
    subscale: "suppression_shaming",
    text: {
      en: "Whenever I feel sad, angry, or anxious, I immediately feel intense guilt or judge myself for not being 'grateful' or 'positive' enough.",
      id: "Tiap kali saya merasa sedih, marah, atau cemas, saya langsung merasa sangat bersalah dan menghakimi diri karena kurang 'bersyukur' atau kurang 'positif'.",
      de: "Immer wenn ich traurig, wütend oder ängstlich bin, fühle ich sofort Schuldgefühle und verurteile mich dafür, nicht 'dankbar' genug zu sein.",
      fr: "Dès que je ressens de la tristesse, de la colère ou de l'anxiété, je culpabilise violemment de ne pas être assez 'positif' ou 'reconnaissant'.",
      es: "Cada vez que siento tristeza, rabia o ansiedad, me castigo con culpa por no ser lo bastante 'positivo/a' o 'agradecido/a'."
    }
  },
  {
    id: 2,
    subscale: "suppression_shaming",
    text: {
      en: "I force a cheerful smile and pretend everything is fantastic even when I am crying inside, because admitting distress feels like personal failure.",
      id: "Saya memaksakan senyum ceria dan berpura-pura semua baik-baik saja meski hati menjerit, karena mengakui kerapuhan terasa seperti aib kegagalan.",
      de: "Ich zwinge mir ein Lächeln auf und tue so, als sei alles super, obwohl ich innerlich weine, weil Schwäche für mich wie persönliches Versagen wirkt.",
      fr: "Je me force à sourire et à faire comme si tout allait bien alors que je m'effondre à l'intérieur, car avouer ma détresse me semble honteux.",
      es: "Fuerzo una sonrisa y finjo que todo va de maravilla aunque esté roto/a por dentro, porque admitir mi dolor se siente como un fracaso."
    }
  },
  {
    id: 3,
    subscale: "suppression_shaming",
    text: {
      en: "I repeat positive affirmations or motivational quotes to drown out painful emotions, but deep down, the emotional agony only festers harder.",
      id: "Saya mengulang-ulang afirmasi positif atau kata motivasi untuk membungkam emosi sakit, tetapi di dalam hati rasa perih itu justru semakin membusuk.",
      de: "Ich wiederhole positive Affirmationen, um Schmerz zu übertönen, doch innerlich schwelt die seelische Qual nur noch heftiger.",
      fr: "Je me répète des citations inspirantes pour étouffer ma souffrance, mais au fond de moi, la blessure ne fait que s'infecter.",
      es: "Repito mantras optimistas o frases motivacionales para tapar mi dolor, pero en el fondo la angustia solo se pudre con más fuerza."
    }
  },
  {
    id: 4,
    subscale: "suppression_shaming",
    text: {
      en: "I feel irritated or anxious around people who are openly grieving or complaining, and catch myself thinking: 'Why can't they just look on the bright side?'",
      id: "Saya merasa risih atau cemas di dekat orang yang sedang menangis atau mengeluh, dan berpikir: 'Kenapa sih mereka nggak ambil hikmah positifnya saja?'",
      de: "Ich bin gereizt oder unruhig, wenn andere trauern oder klagen, und denke: 'Warum können die nicht einfach das Positive sehen?'",
      fr: "Je me sens mal à l'aise face aux personnes qui expriment leur peine et je me surprends à penser : 'Pourquoi ne voient-elles pas le bon côté ?'",
      es: "Me incomoda estar cerca de personas que lloran o se quejan abiertamente, y pienso: '¿Por qué no intentan ver el lado bueno?'"
    }
  },

  // 2. Spiritual Bypassing & Cliche Gaslighting
  {
    id: 5,
    subscale: "spiritual_bypassing",
    text: {
      en: "When I opened up about trauma, grief, or systemic injustice, people replied with platitudes like 'Everything happens for a reason' or 'Just manifest better energy.'",
      id: "Ketika saya curhat tentang trauma, duka, atau ketidakadilan sistemik, orang lain menanggapi dengan klise: 'Semua ada hikmahnya' atau 'Pikiranmu saja yang negatif.'",
      de: "Als ich von Traumata oder Verlust erzählte, bekam ich Floskeln zu hören wie: 'Alles hat seinen Sinn' oder 'Denke einfach positiv.'",
      fr: "Quand j'ai partagé mon traumatisme ou ma douleur, on m'a répondu par des platitudes : 'Tout arrive pour une raison' ou 'Pense positif.'",
      es: "Cuando compartí un dolor o trauma real, me respondieron con frases vacías como: 'Todo pasa por algo' o 'Vibra más alto y atraerás lo bueno.'"
    }
  },
  {
    id: 6,
    subscale: "spiritual_bypassing",
    text: {
      en: "I have been told that chronic illness, financial precarity, or workplace abuse are simply 'tests to strengthen your character' rather than legitimate problems.",
      id: "Saya pernah diberi tahu bahwa penyakit kronis, kesulitan finansial, atau kezaliman kantor hanyalah 'ujian pembentuk karakter' yang tak boleh dikeluhkan.",
      de: "Mir wurde eingeredet, dass Krankheit, Geldsorgen oder Mobbing am Arbeitsplatz bloß 'Prüfungen zur Charakterbildung' seien, über die man nicht klagen darf.",
      fr: "On m'a fait croire que la maladie, la précarité ou les abus au travail n'étaient que des 'épreuves pour grandir' qu'il fallait accepter avec gratitude.",
      es: "Me han dicho que mi enfermedad, precariedad o acoso laboral son 'lecciones para fortalecer mi alma' sobre las que no debo protestar."
    }
  },
  {
    id: 7,
    subscale: "spiritual_bypassing",
    text: {
      en: "The culture around me (social media, workplace, family) aggressively promotes 'Good Vibes Only', treating anger or sorrow like a contagious virus.",
      id: "Lingkungan di sekitar saya (medsos, kantor, keluarga) mengagungkan 'Good Vibes Only', memperlakukan kemarahan atau kesedihan seperti virus menular yang tabu.",
      de: "Mein Umfeld (Social Media, Job, Familie) erzwingt ein dogmatisches 'Good Vibes Only', als seien Wut oder Trauer ansteckende Krankheiten.",
      fr: "Mon entourage (réseaux, travail, proches) impose un 'Good Vibes Only' tyrannique, traitant la tristesse comme une maladie contagieuse.",
      es: "Mi entorno (redes, trabajo, familia) impone una doctrina de 'Solo Buenas Vibras', tratando la rabia o la tristeza como una peste contagiosa."
    }
  },
  {
    id: 8,
    subscale: "spiritual_bypassing",
    text: {
      en: "I find myself weaponizing gratitude—forcing myself to list blessings specifically to invalidate and silence my legitimate hurt.",
      id: "Saya menggunakan rasa syukur sebagai senjata untuk membungkam rasa sakit: memaksa diri mendaftar nikmat agar tidak berani mengakui luka yang nyata.",
      de: "Ich missbrauche Dankbarkeit als Waffe gegen mich selbst: Ich zähle Segnungen auf, nur um meinen berechtigten Schmerz zum Schweigen zu bringen.",
      fr: "J'instrumentalise la gratitude contre moi-même : je liste mes privilèges uniquement pour délégitimer et étouffer ma détresse.",
      es: "Uso el agradecimiento forzado como un arma para acallar mi dolor, repitiéndome lo afortunado/a que soy para no quejarme."
    }
  },

  // 3. Emotional Isolation & Somatic Collapse
  {
    id: 9,
    subscale: "emotional_isolation",
    text: {
      en: "I feel completely alone with my struggles because I know sharing my true feelings will be met with unhelpful advice or toxic dismissals.",
      id: "Saya merasa kesepian luar biasa karena tahu bahwa menceritakan perasaan asli hanya akan dibalas nasihat menggurui atau pengabaian toksik.",
      de: "Ich fühle mich mit meinen Problemen völlig isoliert, weil ehrliche Gefühle nur mit Ratschlägen oder Abwiegeln abgespeist werden.",
      fr: "Je me sens infiniment seul(e) face à mes épreuves, car exprimer ma vérité suscite des leçons de morale ou un rejet poli.",
      es: "Me siento totalmente solo/a con mis problemas porque sé que si muestro mi dolor recibiré consejos paternalistas o desprecio velado."
    }
  },
  {
    id: 10,
    subscale: "emotional_isolation",
    text: {
      en: "Suppressing my 'negative' emotions has caused chronic physical tension, such as tight jaws, digestive issues, headaches, or shallow breathing.",
      id: "Menahan emosi 'negatif' telah memicu ketegangan fisik kronis, seperti rahang kaku, gangguan lambung, sakit kepala, atau nafas yang pendek.",
      de: "Das Unterdrücken 'negativer' Emotionen führt bei mir zu chronischen Körpersymptomen wie Kiefersperre, Magenproblemen oder Kopfschmerzen.",
      fr: "Refouler mes émotions sombres me cause des tensions physiques chroniques : mâchoire crispée, maux d'estomac, migraines ou souffle court.",
      es: "Reprimir mis emociones difíciles me causa dolor físico constante: mandíbula apretada, problemas digestivos, migrañas y falta de aire."
    }
  },
  {
    id: 11,
    subscale: "emotional_isolation",
    text: {
      en: "I have completely lost touch with my authentic feelings; I no longer know whether I am actually happy or merely performing happiness for others.",
      id: "Saya kehilangan kontak dengan emosi asli saya; saya tidak tahu lagi apakah saya benar-benar bahagia atau hanya sedang bersandiwara demi orang lain.",
      de: "Ich habe den Kontakt zu meinen echten Gefühlen verloren; ich weiß oft nicht mehr, ob ich wirklich froh bin oder Glück nur für andere schauspielere.",
      fr: "J'ai perdu le contact avec mes ressentis profonds : je ne sais plus si je suis réellement heureux/se ou si je joue un rôle pour les autres.",
      es: "He perdido la conexión con mis emociones reales; ya no sé si soy feliz de verdad o si solo interpreto una comedia para no incomodar."
    }
  },
  {
    id: 12,
    subscale: "emotional_isolation",
    text: {
      en: "I desperately crave a safe, private space where I can cry, scream, or vent without anyone telling me to 'calm down' or 'be strong'.",
      id: "Saya sangat mendambakan ruang aman dan privat di mana saya boleh menangis, berteriak, atau mengeluh tanpa disuruh 'tenang' atau 'harus kuat'.",
      de: "Ich sehne mich verzweifelt nach einem geschützten Raum, in dem ich weinen oder toben darf, ohne dass jemand sagt: 'Sei stark' oder 'Kopf hoch'.",
      fr: "J'ai un besoin viscéral d'un sanctuaire où je peux pleurer ou crier sans qu'on me dise de 'rester fort(e)' ou de 'calmer le jeu'.",
      es: "Necesito con desesperación un espacio íntimo donde llorar o gritar sin que nadie me ordene que 'sea fuerte' o que 'no exagere'."
    }
  }
];

export const TOXIC_POSITIVITY_OPTIONS = [
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
      en: "Sometimes / Moderate Invalidation",
      id: "Kadang-kadang / Cukup Tertekan",
      de: "Manchmal / Spürbare Entwertung",
      fr: "Parfois / Invalidation modérée",
      es: "A veces / Invalidación moderada"
    }
  },
  {
    value: 3,
    label: {
      en: "Often / High Emotional Suppression",
      id: "Sering / Penekanan Emosi Kuat",
      de: "Oft / Starke Unterdrückung",
      fr: "Souvent / Forte répression",
      es: "A menudo / Represión intensa"
    }
  },
  {
    value: 4,
    label: {
      en: "Constantly / Severe Toxic Positivity",
      id: "Selalu / Jebakan Positivitas Toksik Akut",
      de: "Ständig / Schwere toxische Positivität",
      fr: "En permanence / Positivité toxique aiguë",
      es: "Constantemente / Positividad tóxica asfixiante"
    }
  }
];

export const TOXIC_POSITIVITY_RESULTS: ToxicPositivityResultLevel[] = [
  {
    level: "minimal",
    scoreRange: [0, 11],
    badge: {
      en: "High Emotional Agility",
      id: "Kelincahan Emosional Tinggi",
      de: "Hohe emotionale Agilität",
      fr: "Excellente Agilité Émotionnelle",
      es: "Alta Agilidad Emocional"
    },
    title: {
      en: "Emotionally Agile: Authentic Acceptance & Healthy Expression",
      id: "Lincah Emosional: Penerimaan Autentik & Ekspresi Sehat",
      de: "Emotional agil: Authentische Annahme & gesunder Ausdruck",
      fr: "Émotionnellement Agile : Accueil Sincère & Expression Libre",
      es: "Agilidad Emocional Plena: Aceptación Auténtica y Expresión Libre"
    },
    summary: {
      en: "You have a mature, non-judgmental relationship with the full spectrum of human emotions. You do not shame yourself for feeling sorrow, frustration, or fear, nor do you mask distress behind forced cheerfulness. You recognize that difficult emotions are biological data and guides, not personal defects.",
      id: "Kamu memiliki hubungan yang matang dan bijak dengan seluruh spektrum emosi manusia. Kamu tidak menghakimi diri saat sedih atau marah, dan tidak menutupi kerapuhan dengan senyum palsu. Kamu paham bahwa emosi sulit adalah kompas biologis yang valid, bukan aib atau kelemahan.",
      de: "Du pflegst einen reifen Umgang mit allen Facetten deiner Gefühlswelt. Du verurteilst dich weder für Trauer noch für Wut und versteckst dich nicht hinter erzwungener Fröhlichkeit. Du erkennst schwere Gefühle als wertvolle Wegweiser und nicht als Makel an.",
      fr: "Vous entretenez un rapport sain et lucide avec l'ensemble de vos émotions. Vous ne culpabilisez pas face à la peine ou la colère et refusez les faux sourires de façade. Vous comprenez que chaque émotion porte un message légitime.",
      es: "Mantienes una relación madura y compasiva con todas tus emociones. No te juzgas por sentir dolor o rabia ni te escondes tras una alegría fingida. Entiendes que las emociones difíciles son información valiosa y no un defecto personal."
    },
    neurobiology: {
      en: "Optimal prefrontal-limbic dialogue. The anterior cingulate cortex and ventromedial prefrontal cortex regulate affect without neurochemical suppression, keeping basal cortisol and sympathetic inflammatory markers low.",
      id: "Komunikasi optimal antara korteks prefrontal dan sistem limbik. Emosi diproses secara alami tanpa penekanan neuropeptida, menjaga hormon kortisol dan respons inflamasi tubuh tetap rendah.",
      de: "Ausgeglichene Kommunikation zwischen Stirnhirn und limbischem System. Gefühle werden ungehindert integriert, was chronische Entzündungsreaktionen und Cortisolspitzen verhindert.",
      fr: "Dialogue équilibré entre cortex préfrontal et amygdale. Vos émotions sont régulées sans blocage neurochimique, ce qui préserve votre système immunitaire et votre sommeil.",
      es: "Conexión fluida entre la corteza prefrontal y el sistema límbico. Procesas las emociones sin reprimirlas, evitando picos dañinos de cortisol e inflamación somática."
    },
    actionProtocol: {
      en: [
        "Continue labeling emotions with granularity: Differentiate between disappointment, grief, exhaustion, and righteous anger.",
        "Hold space for friends without offering solutions: Practice saying 'That sounds so painful; I'm here with you.'",
        "Maintain zero-censorship reflection: Keep journaling uncensored truths daily."
      ],
      id: [
        "Lanjutkan menamai emosi secara spesifik: Bedakan rasa kecewa, duka, letih fisik, dan amarah etis.",
        "Dengarkan teman tanpa buru-buru memberi solusi: Praktikkan kalimat 'Itu berat banget ya, aku ada di sini buat kamu.'",
        "Jaga ruang refleksi tanpa sensor: Terus tulis atau rekam perasaan jujurmu setiap hari."
      ],
      de: [
        "Gefühle präzise benennen: Unterscheide klar zwischen Enttäuschung, Trauer, Erschöpfung und Wut.",
        "Anderen Raum geben ohne Ratschläge: Sage einfach: 'Das klingt furchtbar schwer, ich bin bei dir.'",
        "Filterlose Reflexion beibehalten: Schreibe oder sprich deine wahren Empfindungen täglich ungeschminkt aus."
      ],
      fr: [
        "Nommez vos émotions avec finesse : Différenciez la déception, le deuil, la fatigue et la saine colère.",
        "Écoutez sans chercher à réparer : Dites simplement : 'C'est tellement dur, je suis de tout cœur avec toi.'",
        "Préservez votre liberté d'expression intérieure : Continuez à consigner vos ressentis sans aucun filtre."
      ],
      es: [
        "Nombra tus emociones con precisión: Distingue entre desilusión, duelo, agotamiento e indignación ética.",
        "Acompaña a otros sin buscar soluciones mágicas: Di con empatía: 'Qué difícil es esto, estoy aquí a tu lado.'",
        "Mantén la expresión sin censura: Sigue descargando tus pensamientos sinceros a diario."
      ]
    }
  },
  {
    level: "mild",
    scoreRange: [12, 23],
    badge: {
      en: "Mild Positivity Pressure",
      id: "Tekanan Positivitas Ringan",
      de: "Leichter Positivitäts-Druck",
      fr: "Pression Optimiste Légère",
      es: "Presión Positiva Leve"
    },
    title: {
      en: "Guilt creeping in: Occasional Self-Silencing & Cliché Dependence",
      id: "Rasa Bersalah Mulai Merayap: Sesekali Membungkam Diri Sendiri",
      de: "Schleichende Scham: Gelegentliche Gefühlsverleugnung & Floskeln",
      fr: "Culpabilité Naissante : Autocensure Épisodique & Clichés",
      es: "Culpa Insinuante: Autocensura Ocasional y Frases Hechas"
    },
    summary: {
      en: "You are feeling the societal pressure to maintain a shiny, agreeable facade. When adversity strikes, you sometimes scold yourself for being down and grasp for inspirational clichés to soothe the discomfort. While not debilitating, this subtle invalidation creates unnecessary friction in your emotional life.",
      id: "Kamu mulai terpengaruh oleh tekanan sosial untuk selalu tampil kuat dan ceria. Saat masalah datang, kamu terkadang memarahi diri sendiri karena terpuruk dan memaksakan kata-kata motivasi untuk menutupi rasa pedih. Penolakan halus ini mulai menguras energimu.",
      de: "Du spürst den gesellschaftlichen Druck, immer gut gelaunt und leistungsfähig zu wirken. Bei Rückschlägen tadelst du dich manchmal selbst und flüchtest dich in Kalendersprüche, um das Unbehagen zu betäuben.",
      fr: "Vous subissez l'injonction sociale du bonheur obligatoire. Face aux difficultés, vous avez tendance à vous réprimander d'être triste et à vous réfugier dans des maximes faciles pour étouffer le malaise.",
      es: "Empiezas a sentir la tiranía social de estar siempre bien. Ante los tropiezos, te regañas a veces por desanimarte y recurres a frases de autoayuda para no sentir la incomodidad."
    },
    neurobiology: {
      en: "Mild anterior insula suppression. Pushing away unpleasant somatic markers triggers brief bursts of sympathetic nervous system activation, elevating heart rate variability stress indicators.",
      id: "Penekanan ringan pada korteks insular anterior. Menolak sinyal somatik tubuh memicu aktivasi sistem saraf simpatik singkat, meningkatkan stres pada denyut jantung.",
      de: "Leichte Hemmung der Inselrinde. Das Verdrängen ungemütlicher Körpersignale löst kurze sympathische Stressschübe aus und belastet das Herz-Kreislauf-System.",
      fr: "Inhibition légère de l'insula antérieure. Écarter les sensations douloureuses active brièvement le système sympathique et élève le niveau de stress.",
      es: "Leve bloqueo en la ínsula anterior. Desoír las señales corporales de malestar genera descargas simpáticas que aumentan el desgaste nervioso."
    },
    actionProtocol: {
      en: [
        "Ban the phrase 'At least...': Stop minimizing pain by comparing it to worse tragedies (e.g., 'At least you have a job').",
        "Practice somatic permission: Sit quietly for 3 minutes and allow grief or irritation to be physically felt in the chest or throat.",
        "Unload pressure into audio: Record your unfiltered doubts in Nuju before forcing a happy face in front of others."
      ],
      id: [
        "Haramkan kalimat 'Mendingan...': Berhenti meremehkan lukamu dengan membandingkannya pada penderitaan orang lain (misal: 'Mendingan kamu masih punya kerjaan').",
        "Beri izin tubuhmu merasakan: Duduk tenang 3 menit dan rasakan kesedihan atau sesak di dada tanpa buru-buru dihilangkan.",
        "Tumpahkan beban ke audio: Rekam keraguanmu di Nuju sebelum harus tersenyum di depan rekan kerja."
      ],
      de: [
        "Verbanne die Floskel 'Wenigstens...': Relativiere deinen Schmerz nicht mit dem Leid anderer (z. B. 'Wenigstens hast du noch Arbeit').",
        "Körperliche Erlaubnis üben: Sitze 3 Minuten still und spüre Trauer oder Wut im Brustkorb, ohne sie wegzudrücken.",
        "Audiodetox mit Nuju: Sprich deine Zweifel filterlos in Nuju ein, bevor du im Alltag wieder die Maske aufsetzt."
      ],
      fr: [
        "Bannissez le 'Au moins...': Cessez de minimiser vos souffrances par comparaison (ex: 'Au moins tu es en bonne santé').",
        "Accordez-vous une permission somatique : Asseyez-vous 3 minutes et laissez la peine exister dans votre poitrine.",
        "Déchargez la pression par la voix : Confiez vos doutes à Nuju avant de devoir sourire en public."
      ],
      es: [
        "Prohíbete la frase 'Al menos...': Deja de minimizar tu pena comparándola con tragedias mayores ('Al menos tienes trabajo').",
        "Permiso corporal consciente: Siéntate 3 minutos en silencio y deja que la tristeza habite tu pecho sin huir.",
        "Válida tu verdad en Nuju: Graba tus dudas sin censura en Nuju antes de poner cara de póker ante los demás."
      ]
    }
  },
  {
    level: "moderate",
    scoreRange: [24, 35],
    badge: {
      en: "Toxic Positivity Trap",
      id: "Jebakan Positivitas Toksik",
      de: "Toxische Positivitäts-Falle",
      fr: "Piège de la Positivité Toxique",
      es: "Trampa de Positividad Tóxica"
    },
    title: {
      en: "Spiritual Bypassing & Compulsive Masking: Chronic Emotional Isolation",
      id: "Spiritual Bypassing & Topeng Bahagia: Keterasingan Batin Kronis",
      de: "Spirituelles Bypassing & Dauer-Lächeln: Tiefe innere Einsamkeit",
      fr: "Bypass Spirituel & Masque Permanent : Isolement Émotionnel",
      es: "Bypass Espiritual y Sonrisa Forzada: Aislamiento Emocional Crónico"
    },
    summary: {
      en: "You are deeply ensnared in toxic positivity. You use gratitude, manifestation, and motivational mantras as intellectual shields to avoid confronting real grief, relationship boundary ruptures, or unfair conditions. You feel acute shame whenever negative feelings surface, and maintain a facade of constant cheerfulness that leaves you feeling exhausted, hollow, and utterly alone.",
      id: "Kamu terjerat kuat dalam perangkap positivitas toksik. Kamu memakai rasa syukur, hukum tarik-menarik, dan motivasi klise sebagai tameng untuk menghindari duka mendalam atau ketidakadilan nyata. Kamu merasa sangat bersalah setiap kali emosi negatif muncul, dan sandiwara senyum ceria membuatmu merasa hampa, lelah batin, dan terisolasi.",
      de: "Du steckst tief in der toxischen Positivitäts-Falle. Dankbarkeitslisten, Manifestieren und Durchhalteparolen dienen dir als Schutzschild, um echten Schmerz, Grenzverletzungen und Trauer nicht spüren zu müssen. Du fühlst dich schuldig für jedes Tief und bist von der dauernden Fassade erschöpft und einsam.",
      fr: "Vous êtes pris au piège d'une positivité toxique étouffante. Les slogans d'optimisme et les exercices de gratitude forcée vous servent de bouclier pour fuir vos blessures réelles. Vous culpabilisez dès que la tristesse vous envahit et ce rôle permanent vous épuise.",
      es: "Estás atrapado/a en la trampa de la positividad tóxica. Utilizas la gratitud forzada, las afirmaciones y la espiritualidad superficial para no afrontar tus límites rotos ni tu dolor real. Sientes culpa por cualquier bajón y mantener la fachada de felicidad te deja exhausto/a y en soledad."
    },
    neurobiology: {
      en: "Chronic hyper-inhibition of the limbic system by the dorsolateral prefrontal cortex. Somatization increases as unexpressed grief and anger manifest as muscle spasticity, tension headaches, and gastrointestinal inflammation via the brain-gut axis.",
      id: "Hiper-inhibisi kronis pada sistem limbik oleh korteks prefrontal dorsolateral. Somatisasi meningkat: kemarahan dan duka yang dibungkam berubah menjadi kejang otot, sakit kepala tegang, dan gangguan pencernaan lewat poros otak-usus.",
      de: "Dauerhafte Überregulierung des limbischen Systems. Verdrängte Gefühle somatisieren sich in Form von Muskelverspannungen, chronischen Spannungskopfschmerzen und Reizdarmsymptomen über die Darm-Hirn-Achse.",
      fr: "Hyper-inhibition chronique du système limbique. La douleur refoulée se somatise en contractures musculaires, migraines de tension et troubles intestinaux via l'axe intestin-cerveau.",
      es: "Sobre-inhibición severa del sistema límbico. El dolor reprimido se somatiza en rigidez muscular, cefaleas tensionales y problemas digestivos a través del eje intestino-cerebro."
    },
    actionProtocol: {
      en: [
        "Unfollow toxic positivity accounts: Purge social media feeds of 'good vibes only' influencers and hustle manifestors.",
        "Write an 'Uncensored Rage & Grief Letter': Put your rawest anger and sorrow on paper, then safely burn it without reframing.",
        "Daily voice confession in Nuju: Speak the ugly, dark, unedited truth into Nuju's encrypted journal every night to decompress your nervous system."
      ],
      id: [
        "Unfollow akun motivasi toksik: Bersihkan medsosmu dari influencer 'good vibes only' yang menghakimi emosi negatif.",
        "Tulis 'Surat Kemarahan & Duka Tanpa Sensor': Tuangkan semua unek-unekmu ke kertas tanpa filter, lalu bakar dengan aman tanpa perlu mencari hikmahnya.",
        "Curhat suara harian di Nuju: Bicarakan fakta tergelap dan terlelahmu ke jurnal suara Nuju yang terenkripsi agar sarafmu bisa bernapas lega."
      ],
      de: [
        "Toxische Motivations-Accounts entfolgen: Miste Social Media radikal von 'Good Vibes Only'-Influencern und Manifestations-Gurus aus.",
        "Einen unzensierten Wut- und Trauerbrief schreiben: Bring deinen dunkelsten Schmerz zu Papier und verbrenne ihn, ohne nach dem 'Sinn' zu suchen.",
        "Tägliche Audiobeichte in Nuju: Sprich all das Hässliche, Verbotene und Wütende in den sicheren Nuju-Tresor, um dein Nervensystem zu entlasten."
      ],
      fr: [
        "Désabonnez-vous des comptes toxiques : Nettoyez vos réseaux de tous les marchands de bonheur artificiel et d'optimisme forcé.",
        "Rédigez une lettre de rage sans filtre : Écrivez votre colère et votre détresse sur papier puis brûlez-la sans chercher de morale.",
        "Confession vocale quotidienne dans Nuju : Déposez vos vérités les plus brutes dans le sanctuaire chiffré de Nuju chaque soir."
      ],
      es: [
        "Haz limpieza en redes sociales: Deja de seguir cuentas de gurús de 'solo buenas vibras' que invalidan los problemas reales.",
        "Escribe una carta de rabia y duelo sin censura: Vuelca todo tu dolor sobre el papel y quémala sin intentar extraer ninguna lección.",
        "Confesión de voz diaria en Nuju: Pronuncia tus verdades más crudas y difíciles en el diario cifrado de Nuju para liberar tu sistema nervioso."
      ]
    }
  },
  {
    level: "severe",
    scoreRange: [36, 48],
    badge: {
      en: "Severe Emotional Invalidation",
      id: "Invalidasi Emosi Akut & Mati Rasa",
      de: "Schwere emotionale Entwertung & Entfremdung",
      fr: "Invalidation Émotionnelle Sévère",
      es: "Invalidación Emocional Severa y Colapso"
    },
    title: {
      en: "Complete Emotional Dissociation: The Agony of the Forced Smile",
      id: "Disosiasi Emosi Parah: Siksaan di Balik Senyum Palsu",
      de: "Vollständige emotionale Entfremdung: Die Qual der erzwungenen Heiterkeit",
      fr: "Dissociation Émotionnelle Totale : Le Martyre du Sourire Forcé",
      es: "Disociación Afectiva Total: El Martirio de la Máscara Sonriente"
    },
    summary: {
      en: "You are living in an agonizing state of complete emotional alienation. You have internalized toxic positivity so intensely that experiencing authentic sadness or fury feels like a moral crime. You are completely disconnected from your gut instincts, unable to set boundaries, and suffer from deep loneliness because no one in your life has ever seen the real, suffering human beneath your mask.",
      id: "Kamu hidup dalam siksaan keterasingan emosi yang mendalam. Kamu telah menelan racun positivitas toksik begitu dalam hingga merasa bahwa bersedih atau marah adalah dosa moral. Kamu kehilangan kontak dengan intuisi perutmu, tidak mampu memasang batasan diri, dan memikul kesepian yang mencekik karena tak seorang pun mengenal dirimu yang sesungguhnya di balik topeng ceriamu.",
      de: "Du lebst in einem Zustand quälender emotionaler Selbstentfremdung. Du hast toxische Positivität so sehr verinnerlicht, dass dir echte Wut oder Trauer wie ein Verbrechen vorkommen. Du hast den Kontakt zu deinem Bauchgefühl verloren, kannst keine Grenzen setzen und bist einsam, weil niemand den leidenden Menschen hinter deiner Maske kennt.",
      fr: "Vous endurez une torture d'aliénation affective absolue. L'injonction du bonheur vous a tellement colonisé que la moindre peine vous semble immorale. Coupé(e) de votre intuition et incapable de dire non, vous souffrez d'une solitude atroce car personne ne sait qui vous êtes réellement sous votre sourire.",
      es: "Vives atrapado/a en una asfixiante alienación emocional. Has internalizado tanto la positividad tóxica que sentirte triste o enfadado/a te parece un pecado. Has perdido el contacto con tu instinto, eres incapaz de poner límites y arrastras una soledad desgarradora porque nadie conoce tu dolor detrás de la máscara."
    },
    neurobiology: {
      en: "Functional freeze and dorsal vagal collapse driven by chronic emotional suppression. Autonomic dissociation manifests as flat affect, anhedonia, depersonalization, and widespread fibromyalgia-like somatic pain.",
      id: "Functional freeze dan kejatuhan vagal dorsal akibat represi emosi berkepanjangan. Disosiasi otonom memicu tatapan kosong, hilangnya kemampuan merasakan nikmat (anhedonia), depersonalisasi, dan nyeri pegal fisik kronis.",
      de: "Dorsale Vagus-Erstarrung durch jahrelange Gefühlsunterdrückung. Die Dissoziation äußert sich in innerer Taubheit, Anhedonie, Depersonalisation und diffusen chronischen Schmerzen.",
      fr: "Sidération vagale dorsale liée à un refoulement permanent. Cette dissociation se traduit par une anesthésie affective, une anédonie et des douleurs musculaires diffuses.",
      es: "Colapso vagal dorsal y parálisis funcional por represión sistemática. La desconexión se manifiesta en anhedonia, despersonalización y dolores somáticos crónicos."
    },
    actionProtocol: {
      en: [
        "Radical permission to be broken: Give yourself full permission to be messy, angry, grieving, and entirely uninspired.",
        "Somatic crying release: Lie under a weighted blanket in a dark room and allow stored tears to flow without stopping them.",
        "Zero-demand audio sanctuary: Use Nuju's encrypted private journal to scream, weep, or whisper without social judgment or toxic advice."
      ],
      id: [
        "Izin radikal untuk hancur: Berikan dirimu hak penuh untuk merasa hancur, marah, berantakan, dan tidak punya motivasi sama sekali.",
        "Pelepasan tangis somatik: Berbaringlah di kamar gelap di bawah selimut tebal dan biarkan air mata yang tertahan mengalir bebas tanpa ditahan.",
        "Sanctuary audio bebas tuntutan di Nuju: Gunakan jurnal terenkripsi Nuju untuk menjerit, menangis tersedu-sedu, atau berbisik tanpa takut dihakimi atau dinasihati."
      ],
      de: [
        "Radikale Erlaubnis zum Zusammenbruch: Erlaube dir von Herzen, am Boden zu sein, zu weinen, wütend zu sein und keinen Plan zu haben.",
        "Somatisches Weinen zulassen: Lege dich in einen abgedunkelten Raum und lass die Tränen der letzten Jahre ungehindert fließen.",
        "Bewertungsfreier Raum in Nuju: Nutze das private Nuju-Sprachtagebuch, um zu schluchzen oder zu fluchen, ohne belehrt zu werden."
      ],
      fr: [
        "Permission radicale d'aller mal : Accordez-vous le droit absolu d'être triste, en colère et totalement démotivé(e).",
        "Libération par les larmes : Allongez-vous dans le noir sous une couette lourde et laissez vos sanglots sortir librement.",
        "Sanctuaire vocal chez Nuju : Utilisez le journal chiffré de Nuju pour crier, pleurer ou souffler sans qu'aucun donneur de leçon n'intervienne."
      ],
      es: [
        "Permiso radical para derrumbarte: Date el derecho incondicional a estar mal, cansado/a, enfadado/a y sin ganas de nada.",
        "Llanto somático liberador: Túmbate en una habitación a oscuras con una manta pesada y deja que las lágrimas salgan sin freno.",
        "Refugio de voz sin juicios en Nuju: Utiliza el diario íntimo cifrado de Nuju para desahogar tus gritos y sollozos en completa paz."
      ]
    }
  }
];

export const TOXIC_POSITIVITY_SUBSCALE_INFO = {
  suppression_shaming: {
    name: {
      en: "Suppression Shaming & Forced Smiling",
      id: "Rasa Bersalah Emosi & Senyum Palsu",
      de: "Scham über Schwäche & erzwungenes Lächeln",
      fr: "Honte des Émotions & Sourire Forcé",
      es: "Vergüenza del Dolor y Sonrisa Forzada"
    },
    description: {
      en: "Compulsive guilt for feeling sorrow or anger, forced smiles, repeating mantras to drown pain, and irritation at others' grief.",
      id: "Merasa bersalah karena bersedih atau marah, senyum palsu, mengulang afirmasi untuk membungkam luka, dan risih melihat kesedihan orang lain.",
      de: "Zwanghafte Scham bei Wut oder Trauer, krampfhaftes Lächeln, Betäubung durch Mantras und Unruhe bei fremdem Leid.",
      fr: "Culpabilité maladive face à la peine, sourires forcés, mantras pour étouffer le mal et agacement devant les larmes d'autrui.",
      es: "Culpa compulsiva por sentir tristeza o ira, sonrisas forzadas, uso de mantras para tapar el dolor e incomodidad ante el duelo ajeno."
    }
  },
  spiritual_bypassing: {
    name: {
      en: "Spiritual Bypassing & Cliché Gaslighting",
      id: "Spiritual Bypassing & Klise Pengabaian",
      de: "Spirituelles Bypassing & Phrasen-Gaslighting",
      fr: "Bypass Spirituel & Clichés Invalidants",
      es: "Bypass Espiritual y Negación por Frases Hechas"
    },
    description: {
      en: "Using 'Everything happens for a reason', treating trauma as simple 'tests', 'Good Vibes Only' dogmatism, and weaponizing gratitude.",
      id: "Menggunakan kalimat 'Semua ada hikmahnya', menganggap trauma cuma 'ujian mental', memaksakan 'Good Vibes Only', dan menjadikan rasa syukur sebagai senjata pembungkam.",
      de: "Gebrauch von 'Alles hat seinen Sinn', Abwertung von Trauma als 'Lektion', 'Good Vibes Only'-Dogma und Instrumentalisierung von Dankbarkeit.",
      fr: "Refuge dans le 'Tout a un sens', réduction du traumatisme à une 'leçon', dogme du 'Good Vibes Only' et détournement de la gratitude.",
      es: "Escudarse en 'Todo pasa por algo', tratar el trauma como simple 'prueba', dictadura de 'Buenas Vibras' y uso del agradecimiento para tapar heridas."
    }
  },
  emotional_isolation: {
    name: {
      en: "Emotional Isolation & Somatic Collapse",
      id: "Keterasingan Emosional & Ketegangan Tubuh",
      de: "Emotionale Isolation & körperliche Somatisierung",
      fr: "Isolement Affectif & Somatisation Corporelle",
      es: "Aislamiento Emocional y Colapso Somático"
    },
    description: {
      en: "Suffering in silence from fear of dismissal, chronic jaw/gut physical tension, loss of touch with real feelings, and craving a safe scream space.",
      id: "Menderita sendirian dalam diam karena takut diabaikan, rahang kaku dan lambung perih, lupa rasa asli diri sendiri, dan rindu ruang aman untuk menjerit.",
      de: "Stilles Leiden aus Angst vor Abweisung, chronische Verspannungen und Magenbeschwerden, Entfremdung vom eigenen Selbst und Sehnsucht nach einem Schrei-Raum.",
      fr: "Solitude amère par peur du jugement, mâchoire et ventre noués, perte de repères intérieurs et besoin criant d'un refuge sans morale.",
      es: "Sufrimiento en silencio por miedo a ser juzgado/a, rigidez mandibular y dolor de estómago, desconexión del yo real y anhelo de un lugar donde gritar en paz."
    }
  }
};

export function getToxicPositivityResult(totalScore: number): ToxicPositivityResultLevel {
  const matched = TOXIC_POSITIVITY_RESULTS.find(
    (lvl) => totalScore >= lvl.scoreRange[0] && totalScore <= lvl.scoreRange[1]
  );
  return matched || TOXIC_POSITIVITY_RESULTS[TOXIC_POSITIVITY_RESULTS.length - 1];
}

export function calculateToxicPositivitySubscales(answers: Record<number, number>): {
  suppression_shaming: number;
  spiritual_bypassing: number;
  emotional_isolation: number;
} {
  let suppression_shaming = 0;
  let spiritual_bypassing = 0;
  let emotional_isolation = 0;

  TOXIC_POSITIVITY_QUESTIONS.forEach((q) => {
    const val = answers[q.id] || 0;
    if (q.subscale === "suppression_shaming") suppression_shaming += val;
    if (q.subscale === "spiritual_bypassing") spiritual_bypassing += val;
    if (q.subscale === "emotional_isolation") emotional_isolation += val;
  });

  return { suppression_shaming, spiritual_bypassing, emotional_isolation };
}
