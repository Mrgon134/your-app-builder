export type AnhedoniaCardLang = "en" | "id" | "de" | "fr" | "es";

export interface AnhedoniaQuestion {
  id: number;
  subscale:
    | "consummatory_pleasure_deficit"
    | "anticipatory_pleasure_deficit"
    | "social_anhedonia_detachment";
  text: Record<AnhedoniaCardLang, string>;
}

export interface AnhedoniaResultLevel {
  level:
    | "vibrant_hedonic_capacity"
    | "mild_hedonic_blunting"
    | "moderate_anhedonic_friction"
    | "severe_reward_deficiency"
    | "acute_dopamine_flatline";
  scoreRange: [number, number];
  title: Record<AnhedoniaCardLang, string>;
  badge: Record<AnhedoniaCardLang, string>;
  summary: Record<AnhedoniaCardLang, string>;
  psychology: Record<AnhedoniaCardLang, string>;
  actionProtocol: Record<AnhedoniaCardLang, string[]>;
}

export const ANHEDONIA_QUESTIONS: AnhedoniaQuestion[] = [
  // 1. Consummatory Pleasure Deficit (In-the-moment sensory pleasure)
  {
    id: 1,
    subscale: "consummatory_pleasure_deficit",
    text: {
      en: "Eating my favorite meals or treats feels purely mechanical; the taste no longer sparks genuine sensory delight or comfort.",
      id: "Makan makanan favoritku terasa mekanis semata; rasanya tidak lagi memicu kenikmatan indrawi atau kepuasan sejati.",
      de: "Mein Lieblingsessen fühlt sich rein mechanisch an; der Geschmack löst keine echte Sinnesfreude oder Genuss mehr aus.",
      fr: "Manger mes plats préférés est devenu purement mécanique ; le goût ne me procure plus aucun plaisir sensoriel ni réconfort.",
      es: "Comer mis comidas favoritas se siente puramente mecánico; el sabor ya no despierta placer sensorial ni deleite genuino.",
    },
  },
  // 2. Anticipatory Pleasure Deficit (Future excitement & motivation)
  {
    id: 2,
    subscale: "anticipatory_pleasure_deficit",
    text: {
      en: "When upcoming vacations, weekends, or exciting events are scheduled, I feel completely numb and indifferent rather than eager or excited.",
      id: "Saat ada jadwal liburan, akhir pekan, atau acara seru di depan mata, aku merasa datar dan hampa tanpa rasa antusias.",
      de: "Wenn Urlaub, Wochenenden oder Events anstehen, fühle ich mich völlig gleichgültig und abgestumpft statt vorfreudig.",
      fr: "Quand des vacances ou des sorties sont prévues, je reste de marbre et indifférent(e) au lieu de ressentir de l'enthousiasme.",
      es: "Cuando se acercan vacaciones, fines de semana o eventos divertidos, me siento completamente apático en lugar de emocionado.",
    },
  },
  // 3. Social Anhedonia Detachment (Relational joy)
  {
    id: 3,
    subscale: "social_anhedonia_detachment",
    text: {
      en: "Being in the company of close friends or loved ones feels draining and hollow; I cannot feel the warm emotional resonance of connection.",
      id: "Berkumpul bersama sahabat atau orang terkasih terasa menguras tenaga dan hampa; aku tidak bisa merasakan kehangatan koneksi.",
      de: "Das Zusammensein mit Freunden oder Familie fühlt sich anstrengend und hohl an; ich spüre keine emotionale Wärme mehr.",
      fr: "Être entouré(e) de mes proches m'épuise et me semble vide ; je ne parviens plus à ressentir la chaleur du lien affectif.",
      es: "Estar con amigos cercanos o familiares se siente agotador y hueco; no logro conectar con la calidez emocional del vínculo.",
    },
  },
  // 4. Consummatory Pleasure Deficit
  {
    id: 4,
    subscale: "consummatory_pleasure_deficit",
    text: {
      en: "Listening to music that used to give me chills or lift my spirits now sounds like dull, meaningless background noise.",
      id: "Mendengarkan musik yang dulunya membuatku merinding atau bersemangat kini terdengar seperti suara bising latar yang hambar.",
      de: "Musik, die mir früher Gänsehaut bereitete, klingt heute nur noch wie flache, bedeutungslose Hintergrundgeräusche.",
      fr: "Écouter des morceaux qui me donnaient des frissons me laisse de glace, comme un bruit de fond sans saveur.",
      es: "La música que solía ponerme la piel de gallina o conmoverme ahora suena como ruido de fondo plano y sin sentido.",
    },
  },
  // 5. Anticipatory Pleasure Deficit
  {
    id: 5,
    subscale: "anticipatory_pleasure_deficit",
    text: {
      en: "I struggle to find any internal motivation to start hobbies or passions because my brain anticipates that 'it won't feel fun anyway.'",
      id: "Aku kesulitan menemukan motivasi untuk memulai hobi karena otakku langsung menyimpulkan: 'Toh nanti nggak bakal seru juga.'",
      de: "Ich finde kaum Antrieb für Hobbys, weil mein Gehirn vorab meldet: 'Es wird sowieso keinen Spaß machen.'",
      fr: "J'ai du mal à me motiver pour mes passions car mon cerveau anticipe que 'de toute façon, ça ne sera pas agréable'.",
      es: "Me cuesta hallar motivación para mis pasatiempos porque mi mente anticipa de antemano que 'no será divertido de todos modos'.",
    },
  },
  // 6. Social Anhedonia Detachment
  {
    id: 6,
    subscale: "social_anhedonia_detachment",
    text: {
      en: "When people laugh or celebrate around me, I feel like an alien behind thick glass, mechanically faking smiles to blend in.",
      id: "Saat orang-orang di sekitarku tertawa dan merayakan sesuatu, aku merasa seperti alien di balik kaca tebal, memalsukan senyuman.",
      de: "Wenn andere lachen oder feiern, fühle ich mich wie ein Außerirdischer hinter Panzerglas, der mühsam ein Lächeln vortäuscht.",
      fr: "Quand les autres rient autour de moi, j'ai l'impression d'être derrière une vitre blindée, à feindre des sourires forcés.",
      es: "Cuando los demás ríen o celebran, me siento como un extraño tras un cristal grueso, fingiendo sonrisas para encajar.",
    },
  },
  // 7. Consummatory Pleasure Deficit
  {
    id: 7,
    subscale: "consummatory_pleasure_deficit",
    text: {
      en: "Sensory or tactile comforts (a warm bath, fresh bedsheets, a gentle breeze, physical intimacy) evoke little to no internal pleasure.",
      id: "Kenyamanan fisik (mandi air hangat, seprai baru, semilir angin, keintiman fisik) hampir tidak memicu rasa nikmat di dalam diriku.",
      de: "Körperliche Annehmlichkeiten (warmes Bad, frisches Bettzeug, Brise, Intimität) wecken kaum inneres Wohlbefinden.",
      fr: "Les plaisirs corporels simples (bain chaud, draps frais, brise, intimité physique) ne me procurent presque aucun bien-être.",
      es: "Los placeres físicos sencillos (un baño caliente, sábanas limpias, una brisa, intimidad) casi no me despiertan deleite.",
    },
  },
  // 8. Anticipatory Pleasure Deficit
  {
    id: 8,
    subscale: "anticipatory_pleasure_deficit",
    text: {
      en: "Accomplishing difficult tasks, career goals, or personal milestones yields zero sense of triumph or pride—only exhausted relief that it's over.",
      id: "Menyelesaikan target besar atau prestasi kerja tidak menghasilkan rasa bangga atau puas—hanya rasa lega yang lelah bahwa itu berakhir.",
      de: "Das Erreichen großer Ziele oder beruflicher Meilensteine löst keinen Stolz aus—nur erschöpfte Erleichterung, dass es vorbei ist.",
      fr: "Atteindre un objectif important ne m'apporte aucune fierté ni joie—seulement le soulagement épuisé que ce soit enfin terminé.",
      es: "Alcanzar metas importantes o logros laborales no me genera orgullo ni satisfacción—solo el alivio exhausto de haber terminado.",
    },
  },
  // 9. Social Anhedonia Detachment
  {
    id: 9,
    subscale: "social_anhedonia_detachment",
    text: {
      en: "I prefer prolonged solitude not out of peaceful introversion, but because interactions feel like pointless energy drains with no emotional payoff.",
      id: "Aku memilih menyendiri lama bukan karena introversi damai, tetapi karena interaksi terasa seperti pemborosan energi tanpa kepuasan emosional.",
      de: "Ich ziehe Einsamkeit vor, nicht aus friedlicher Introvertiertheit, sondern weil Gespräche kraftraubend und belohnungslos wirken.",
      fr: "Je m'isole longuement non par calme intérieur, mais parce que tout échange semble un gouffre d'énergie sans aucune récompense.",
      es: "Prefiero el aislamiento prolongado no por sana introversión, sino porque interactuar se siente agotador y sin recompensa emocional.",
    },
  },
  // 10. Consummatory Pleasure Deficit
  {
    id: 10,
    subscale: "consummatory_pleasure_deficit",
    text: {
      en: "Even during activities that previously brought pure laughter or creative flow, my emotional state stays entirely flat, like a grey monochrome film.",
      id: "Bahkan saat melakukan hal yang dulunya memicu tawa lepas atau kreativitas, emosiku tetap datar, seperti film hitam-putih yang redup.",
      de: "Selbst bei Tätigkeiten, die früher Lachen oder Flow erzeugten, bleibt mein Gemüt vollkommen monochrom und grau.",
      fr: "Même lors d'activités qui me faisaient rire ou me passionnaient, mon état intérieur reste plat, comme un film en noir et blanc.",
      es: "Incluso en actividades que antes me llenaban de risa o inspiración creativa, mi estado emocional se mantiene gris y monótono.",
    },
  },
  // 11. Anticipatory Pleasure Deficit
  {
    id: 11,
    subscale: "anticipatory_pleasure_deficit",
    text: {
      en: "I find myself asking 'What is the point?' whenever someone suggests doing something fun, genuinely unable to remember what joy feels like.",
      id: "Aku mendapati diriku bergumam 'Buat apa sih?' tiap diajak bersenang-senang, benar-benar lupa bagaimana rasanya bahagia.",
      de: "Ich frage mich unwillkürlich 'Wozu das Ganze?', wenn jemand Spaß vorschlägt, unfähig mich an echtes Vergnügen zu erinnern.",
      fr: "Je me surprends à penser 'À quoi bon ?' dès qu'on me propose une sortie, incapable de me rappeler la sensation de joie.",
      es: "Me descubro pensando '¿Para qué sirve?' cada vez que alguien propone algo divertido, incapaz de recordar cómo se siente la alegría.",
    },
  },
  // 12. Social Anhedonia Detachment
  {
    id: 12,
    subscale: "social_anhedonia_detachment",
    text: {
      en: "Praise, affection, or kind gestures from other people slide off me without warming my chest or lifting my mood.",
      id: "Pujian, kasih sayang, atau perlakuan manis dari orang lain menguap begitu saja tanpa menghangatkan hatiku atau memperbaiki suasana hatiku.",
      de: "Lob, Zuneigung oder liebevolle Gesten anderer prallen an mir ab, ohne mein Herz zu erwärmen oder meine Laune zu heben.",
      fr: "Les compliments, l'affection ou les gestes tendres glissent sur moi sans jamais réchauffer mon cœur ni éclairer mon humeur.",
      es: "Los elogios, el cariño o los gestos amables de los demás resbalan sobre mí sin entibiar mi pecho ni mejorar mi ánimo.",
    },
  },
];

export const ANHEDONIA_OPTIONS = [
  {
    value: 0,
    label: {
      en: "Disagree Strongly (I feel genuine pleasure easily)",
      id: "Sangat Tidak Setuju (Aku mudah merasakan kenikmatan & antusiasme)",
      de: "Stimme gar nicht zu (Ich empfinde mühelos echte Freude)",
      fr: "Pas du tout d'accord (Je ressens le plaisir et la joie facilement)",
      es: "Totalmente en desacuerdo (Siento placer genuino con facilidad)",
    },
  },
  {
    value: 1,
    label: {
      en: "Disagree Slightly (Occasional temporary dullness, mostly normal)",
      id: "Agak Tidak Setuju (Kadang sedikit hambar, tapi mayoritas normal)",
      de: "Eher nicht (Gelegentlich gedämpft, meistens lebendig)",
      fr: "Plutôt pas d'accord (Parfois émoussé, mais globalement vivant)",
      es: "En desacuerdo parcial (Ocasionalmente apagado, pero en general vivo)",
    },
  },
  {
    value: 2,
    label: {
      en: "Agree Moderately (Noticeable loss of pleasure across many activities)",
      id: "Cukup Setuju (Kehilangan rasa nikmat terasa jelas di banyak aktivitas)",
      de: "Stimme eher zu (Spürbarer Verlust an Freude in vielen Lebensbereichen)",
      fr: "Assez d'accord (Perte de plaisir notable dans de nombreuses activités)",
      es: "De acuerdo moderado (Pérdida notable de placer en muchas actividades)",
    },
  },
  {
    value: 3,
    label: {
      en: "Agree Strongly (Complete emotional flatline; cannot feel joy or anticipation)",
      id: "Sangat Setuju (Mati rasa total; tidak bisa merasa senang atau antusias)",
      de: "Stimme voll zu (Völlige Gefühlsleere; keinerlei Freude oder Vorfreude)",
      fr: "Tout à fait d'accord (Plat émotionnel complet ; incapable de ressentir la joie)",
      es: "Totalmente de acuerdo (Monotonía emocional total; incapaz de sentir alegría)",
    },
  },
];

export const ANHEDONIA_RESULTS: AnhedoniaResultLevel[] = [
  {
    level: "vibrant_hedonic_capacity",
    scoreRange: [0, 6],
    title: {
      en: "Vibrant Hedonic Capacity (Healthy Dopamine Sensitivity)",
      id: "Kapasitas Hedonik Alami (Sensitivitas Dopamin Sehat)",
      de: "Lebendige Hedonische Kapazität (Gesunde Dopaminsensitivität)",
      fr: "Capacité Hédonique Épanouie (Sensibilité Dopaminergique Saine)",
      es: "Capacidad Hedónica Vibrante (Sensibilidad Dopaminérgica Sana)",
    },
    badge: {
      en: "Optimal Reward Functioning",
      id: "Sistem Reward Seimbang",
      de: "Optimale Belohnungsfunktion",
      fr: "Circuit de Récompense Optimal",
      es: "Circuito de Recompensa Óptimo",
    },
    summary: {
      en: "Your mesolimbic reward system and anterior cingulate cortex respond fluidly to sensory, social, and anticipatory cues. You maintain vibrant access to savoring, playful excitement, and emotional connection.",
      id: "Sistem reward dopaminergikmu berfungsi dengan lentur dan sehat terhadap stimulus indrawi, sosial, dan masa depan. Kamu mampu menikmati momen, merasa antusias, dan terhubung secara hangat.",
      de: "Ihr mesolimbisches Belohnungssystem spricht geschmeidig auf sensorische, soziale und zukunftsbezogene Reize an. Sie erleben Genuss, Vorfreude und Verbundenheit in gesundem Maße.",
      fr: "Votre système de récompense mésolimbique réagit avec souplesse aux plaisirs sensoriels, sociaux et d'anticipation. Vous conservez votre capacité d'émerveillement et de connexion.",
      es: "Tu sistema mesolímbico de recompensa responde con fluidez a los estímulos sensoriales, sociales y futuros. Mantienes viva tu capacidad de disfrute, asombro y conexión afectiva.",
    },
    psychology: {
      en: "Dr. R. Philip Snaith's psychometric benchmark confirms that your baseline hedonic tone is intact. Consummatory pleasure (savoring experiences in the present) and anticipatory pleasure (releasing dopamine in pursuit of future goals) are harmoniously balanced.",
      id: "Berdasarkan skala SHAPS Dr. Philip Snaith, respon hedonikmu berada pada batas alami. Kenikmatan konsumatori (menikmati momen saat ini) dan kenikmatan antisipasi (pelepasan dopamin saat menanti masa depan) berjalan seimbang.",
      de: "Nach den Kriterien der SHAPS-Skala nach Dr. Philip Snaith ist Ihr hedonischer Grundtonus intakt. Erlebte Freude im Moment und motivierende Vorfreude greifen harmonisch ineinander.",
      fr: "Selon l'échelle SHAPS du Dr Philip Snaith, votre réactivité hédonique est intacte. Le plaisir consommé (savourer l'instant) et le plaisir anticipé (la dopamine de l'élan) s'harmonisent parfaitement.",
      es: "Según la escala SHAPS del Dr. Philip Snaith, tu tono hedónico basal es óptimo. El placer consumatorio (saborear el presente) y el placer anticipatorio (la dopamina del impulso) están bien equilibrados.",
    },
    actionProtocol: {
      en: [
        "Daily Savoring Practice: Dedicate 30 seconds to immerse consciously in micro-pleasures (warm coffee aroma, a piece of music) to keep dopamine receptors sensitized.",
        "Social Reciprocity: Maintain genuine face-to-face eye contact during shared meals to nurture oxytocin-dopamine resonance.",
        "Nuju Voice Reflection: Voice out weekly moments of gratitude to cement positive neuroplastic wiring in the prefrontal cortex.",
      ],
      id: [
        "Praktik Savoring Harian: Luangkan 30 detik untuk merasakan kenikmatan mikro secara sadar (aroma kopi hangat, alunan lagu) agar reseptor dopamin tetap peka.",
        "Resonansi Sosial: Jaga kontak mata hangat saat makan bersama sahabat untuk memelihara sinergi oksitosin dan dopamin.",
        "Refleksi Suara Nuju: Catat momen kesenangan mingguan di jurnal suara Nuju untuk memperkuat jalur neuroplastisitas positif.",
      ],
      de: [
        "Tägliche Achtsamkeitsmomente: 30 Sekunden bewusst in kleine Sinnesfreuden eintauchen (Kaffeeduft, Musik), um Dopaminrezeptoren sensibel zu halten.",
        "Soziale Resonanz: Bewusster Blickkontakt bei gemeinsamen Mahlzeiten, um die Oxytocin-Dopamin-Bindung zu nähren.",
        "Nuju Sprachnotizen: Wöchentlich schöne Momente im Nuju-Sprachjournal verbalisieren, um positive Vernetzungen zu stärken.",
      ],
      fr: [
        "Pratique quotidienne de savourer : Accordez 30 secondes d'immersion consciente aux micro-plaisirs (arôme d'un thé, brise fraîche).",
        "Résonance relationnelle : Maintenez un contact visuel chaleureux lors des repas partagés pour nourrir l'ocytocine et la dopamine.",
        "Journal vocal Nuju : Déposez chaque semaine vos moments de gratitude à voix haute pour ancrer la neuroplasticité positive.",
      ],
      es: [
        "Práctica de Saboreo Diario: Dedica 30 segundos a sumergirte conscientemente en microplaceres (aroma del café, música).",
        "Resonancia Social: Mantén contacto visual cálido en encuentros para nutrir la sinergia entre oxitocina y dopamina.",
        "Registro Vocal en Nuju: Expresa en voz alta momentos de gratitud para consolidar conexiones neuroplásticas positivas.",
      ],
    },
  },
  {
    level: "mild_hedonic_blunting",
    scoreRange: [7, 14],
    title: {
      en: "Mild Hedonic Blunting (Dopamine Desensitization & Burnout Flutter)",
      id: "Ketumpulan Hedonik Ringan (Desensitisasi Dopamin & Awal Burnout)",
      de: "Leichte Hedonische Abstumpfung (Dopamin-Ermüdung & Burnout-Flackern)",
      fr: "Émoussement Hédonique Léger (Désensibilisation Dopaminergique)",
      es: "Embotamiento Hedónico Leve (Fatiga Dopaminérgica Inicial)",
    },
    badge: {
      en: "Sensory & Emotional Fatigue",
      id: "Kelelahan Sensorik & Emosional",
      de: "Sensorische & Emotionale Ermüdung",
      fr: "Fatigue Sensorielle & Émotionnelle",
      es: "Fatiga Sensorial y Emocional",
    },
    summary: {
      en: "You are experiencing subtle desensitization: activities you love feel muted, music hits with less punch, and social gatherings leave you slightly drained. Chronic multitasking, screen overstimulation, or prolonged stress are dampening your reward responsiveness.",
      id: "Kamu mengalami ketumpulan sensorik ringan: hal-hal yang biasanya kamu sukai terasa agak hambar, musik kurang menggetarkan, dan kumpul sosial terasa agak melelahkan. Overstimulasi digital atau stres berkepanjangan mulai menumpulkan sistem reward.",
      de: "Sie erleben eine schleichende Abstumpfung: Geliebte Hobbys wirken gedämpft, Musik berührt weniger tief und Treffen erschöpfen schneller. Bildschirmüberreizung oder Dauerstress dämpfen Ihre Belohnungsrezeptoren.",
      fr: "Vous ressentez un émoussement subtil : vos activités préférées manquent de saveur et les échanges sociaux vous vident plus vite. Une surstimulation digitale ou une fatigue chronique atténue vos récepteurs.",
      es: "Experimentas un embotamiento sutil: las actividades que amas se sienten atenuadas y las reuniones sociales te cansan más rápido. La sobreestimulación digital o el estrés prolongado están adormeciendo tus receptores.",
    },
    psychology: {
      en: "Under continuous cortisol elevation, dopamine D2 receptor availability temporarily down-regulates in the nucleus accumbens. You do not suffer from clinical depression, but from cognitive-sensory overload where the nervous system shields itself by lowering its hedonic volume.",
      id: "Di bawah lonjakan kortisol kronis, ketersediaan reseptor dopamin D2 di nukleus akumbens mengalami down-regulasi sementara. Ini bukan depresi mayor, melainkan mekanisme perlindungan sistem saraf dari kelebihan beban sensorik.",
      de: "Bei erhöhtem Cortisolspiegel regulieren sich die D2-Dopaminrezeptoren im Nucleus accumbens vorübergehend herunter. Dies ist keine schwere Depression, sondern eine physiologische Schutzbremse vor sensorischer Überflutung.",
      fr: "Face au cortisol chronique, les récepteurs dopaminergiques D2 diminuent temporairement leur sensibilité dans le noyau accumbens. Il s'agit d'un mécanisme de protection du système nerveux face à la surcharge.",
      es: "Bajo un cortisol elevado continuo, la disponibilidad de receptores D2 de dopamina disminuye temporalmente en el núcleo accumbens. No es depresión clínica mayor, sino un freno adaptativo del sistema nervioso.",
    },
    actionProtocol: {
      en: [
        "48-Hour Digital Micro-Fasting: Cut out algorithmic short-form video feeds (TikTok, Reels, Shorts) for 48 hours to recalibrate baseline dopamine receptors.",
        "Contrast Somatic Grounding: Engage in thermal contrast (cold facial splash, warm herbal tea) to re-awaken somatic afferent signaling.",
        "Expressive Vocal Venting in Nuju: Vent chronic background friction into Nuju's voice sanctuary to discharge sympathetic tension without taxing social energy.",
      ],
      id: [
        "Puasa Digital Pendek 48 Jam: Hentikan konsumsi video instan (Reels, TikTok, Shorts) selama 48 jam untuk mereset ambang kepekaan dopamin.",
        "Aktivasi Kontras Somatik: Berikan rangsangan indrawi nyata (kompres air dingin di wajah, minum teh hangat perlahan) untuk membangunkan saraf aferen tubuh.",
        "Dekompresi Suara di Nuju: Tumpahkan rasa lelah yang mengendap ke jurnal suara privat Nuju agar beban simpatis keluar tanpa harus memaksakan obrolan sosial.",
      ],
      de: [
        "48-Stunden Digital-Fasten: Verzicht auf Kurzvideos (TikTok, Reels), um die Reizschwelle der Dopaminrezeptoren wieder abzusenken.",
        "Sensorische Kontraste: Kaltes Wasser im Gesicht oder warmer Tee, um die afferenten Nervenbahnen sanft zu reaktivieren.",
        "Entlastung über Nuju: Den angestauten Alltagsstress im verschlüsselten Nuju-Sprachraum aussprechen, um das Nervensystem zu entlasten.",
      ],
      fr: [
        "Micro-jeûne digital de 48 heures : Éliminez les vidéos courtes (Reels, TikTok) pour réinitialiser le seuil de sensibilité dopaminergique.",
        "Contraste somatique : Eau froide sur le visage ou boisson chaude savourée lentement pour réveiller les voies sensorielles.",
        "Libération vocale sur Nuju : Déposez votre fatigue dans le journal vocal chiffré Nuju pour relâcher la tension sans effort social.",
      ],
      es: [
        "Microayuno Digital de 48 Horas: Suspende videos cortos de gratificación instantánea para recalibrar la sensibilidad de la dopamina.",
        "Estímulo Somático de Contraste: Salpica agua fría en el rostro o bebe una infusión caliente despacio para reconectar los sentidos.",
        "Desfogue Vocal en Nuju: Expresa tu cansancio en el santuario de voz de Nuju para liberar tensión simpática sin fingir sociabilidad.",
      ],
    },
  },
  {
    level: "moderate_anhedonic_friction",
    scoreRange: [15, 22],
    title: {
      en: "Moderate Anhedonic Friction (Reward System Desynchronization)",
      id: "Friksi Anhedonia Menengah (Desinkronisasi Sistem Reward)",
      de: "Mittlere Anhedonische Friktion (Desynchronisation des Belohnungssystems)",
      fr: "Friction Anhedonique Modérée (Désynchronisation de la Récompense)",
      es: "Fricción Anhedónica Moderada (Desconexión del Circuito de Placer)",
    },
    badge: {
      en: "Significant Hedonic Deficit",
      id: "Defisit Hedonik Signifikan",
      de: "Signifikantes Hedonisches Defizit",
      fr: "Déficit Hédonique Noté",
      es: "Déficit Hedónico Significativo",
    },
    summary: {
      en: "You are experiencing a pronounced inability to experience joyful satisfaction. Food tastes bland, weekends bring no genuine excitement, achievements evoke only numbness, and socializing feels like an exhausting theatrical performance.",
      id: "Kamu mengalami hambatan nyata untuk merasakan kenikmatan hidup. Makanan terasa hambar, akhir pekan tidak memicu antusiasme, pencapaian hanya disambut kehampaan, dan bersosialisasi terasa seperti sandiwara yang melelahkan.",
      de: "Sie erleben eine deutliche Unfähigkeit, Freude zu empfinden. Essen schmeckt neutral, Wochenenden wecken keine Vorfreude, Erfolge hinterlassen Leere und soziale Treffen gleichen anstrengendem Schauspiel.",
      fr: "Une incapacité marquée à ressentir le plaisir s'est installée. La nourriture est insipide, les week-ends n'excitent plus, les victoires sont vides et les interactions ressemblent à une comédie forcée.",
      es: "Experimentas una incapacidad evidente para disfrutar. La comida sabe neutra, los fines de semana no despiertan ilusión, los logros dejan vacío y socializar parece una actuación teatral agotadora.",
    },
    psychology: {
      en: "Neurobiologically, anticipatory pleasure (ventral striatum dopamine drive) and consummatory pleasure (opioid and endocannabinoid hedonic hotspots in the nucleus accumbens) have become uncoupled. Often triggered by prolonged burnout, chronic unexpressed grief, or depressive episodes.",
      id: "Secara neurobiologis, kenikmatan antisipatif (dorongan dopamin di ventral striatum) dan kenikmatan konsumatori (reseptor opioid/endokanabinoid di nukleus akumbens) mengalami desinkronisasi. Sering dipicu oleh burnout parah, duka tak terucap, atau episode depresi terselubung.",
      de: "Neurobiologisch sind Vorfreude (dopaminerger Antrieb im ventralen Striatum) und Momentgenuss (Opioid-Hotspots im Nucleus accumbens) entkoppelt. Häufige Folge von chronischem Burnout, verdrängter Trauer oder dysthymen Phasen.",
      fr: "Sur le plan neurobiologique, le plaisir anticipatoire (striatum ventral) et le plaisir consommatoire (zones opioïdes du noyau accumbens) sont désynchronisés. Souvent causé par un épuisement sévère ou un deuil non métabolisé.",
      es: "Neurobiológicamente, el placer de anticipación (estriado ventral) y el placer de disfrute presente (puntos opioides del núcleo accumbens) se han desacoplado. Provocado frecuentemente por burnout crónico o duelo no procesado.",
    },
    actionProtocol: {
      en: [
        "Behavioral Activation (Action Precedes Motivation): Do not wait to 'feel like doing it'. Schedule small 10-minute activities with zero pressure to feel joyful.",
        "Somatic Grounding Without Performance: Walk outside and notice 3 distinct physical textures (bark, concrete, cold metal) to bypass cognitive numbness.",
        "Nuju Vocal Excavation: Speak honestly about the emptiness in Nuju. Naming the grey numbness aloud reduces the secondary shame of 'why can't I just be happy?'.",
      ],
      id: [
        "Aktivasi Perilaku (Tindakan Mendahului Motivasi): Jangan menunggu 'mood datang'. Lakukan aktivitas kecil 10 menit tanpa menuntut dirimu harus langsung bahagia.",
        "Sensasi Somatik Bebas Tuntutan: Berjalan kaki di luar ruangan dan sentuh 3 tekstur fisik berbeda (kulit kayu, semen, besi dingin) untuk menyentuh saraf aferen langsung.",
        "Ekskavasi Emosi di Nuju: Bicarakan kehampaan ini secara jujur di Nuju. Mengakui rasa hambar secara vokal mengikis rasa bersalah 'kenapa aku tidak bisa bahagia?'.",
      ],
      de: [
        "Verhaltensaktivierung: Warten Sie nicht auf Motivation. Führen Sie 10-minütige Aktivitäten ohne den Anspruch durch, sofort Freude empfinden zu müssen.",
        "Soma-Fokus ohne Leistungsdruck: Spüren Sie bewusst 3 verschiedene Oberflächen im Freien (Baumrinde, rauer Stein, Metall), um das Nervensystem zu erden.",
        "Nuju-Sprachraum zur Entlastung: Sprechen Sie die innere Leere offen aus. Das Verbalisieren baut die sekundäre Scham ('Warum freue ich mich nicht?') ab.",
      ],
      fr: [
        "Activation comportementale : N'attendez pas l'envie. Planifiez de petites actions de 10 minutes sans obligation d'éprouver de la joie.",
        "Ancrage sensoriel sans pression : Touchez 3 textures différentes dans la nature (écorce, pierre, métal froid) pour stimuler les sens.",
        "Verbalisation sur Nuju : Déposez votre sensation de vide dans Nuju. Nommer la grisaille à voix haute dissout la culpabilité de ne pas être joyeux.",
      ],
      es: [
        "Activación Conductual: No esperes a 'tener ganas'. Realiza pequeñas actividades de 10 minutos sin la presión de tener que disfrutar de inmediato.",
        "Anclaje Somático Directo: Toca 3 texturas físicas distintas en la naturaleza (corteza, piedra, metal) para reconectar el sistema somatosensorial.",
        "Expresión Libre en Nuju: Habla honestamente sobre el vacío en Nuju. Nombrar la apatía en voz alta disuelve la culpa de 'no poder ser feliz'.",
      ],
    },
  },
  {
    level: "severe_reward_deficiency",
    scoreRange: [23, 30],
    title: {
      en: "Severe Reward Deficiency (Profound Hedonic Exhaustion)",
      id: "Defisiensi Reward Berat (Kehabisan Respon Hedonik Akut)",
      de: "Schwere Belohnungsdefizienz (Tiefe Hedonische Erschöpfung)",
      fr: "Déficience de Récompense Sévère (Épuisement Hédonique Profond)",
      es: "Deficiencia Grave de Recompensa (Agotamiento Hedónico Profundo)",
    },
    badge: {
      en: "Severe Anhedonic Lock-In",
      id: "Kondisi Anhedonia Berat",
      de: "Schwere Anhedonische Blockade",
      fr: "Blocage Anhedonique Sévère",
      es: "Bloqueo Hedónico Severo",
    },
    summary: {
      en: "Your emotional world has lost almost all color and vibrancy. Loved ones feel emotionally distant, favorite music sounds like empty static, sensory pleasure is virtually extinguished, and getting through each day requires grueling, conscious mechanical exertion.",
      id: "Dunia emosionalmu kehilangan hampir seluruh warna dan getarannya. Orang terkasih terasa berjarak, musik terdengar seperti derau statis, kenikmatan indrawi lenyap, dan menjalani hari terasa seperti kerja paksa yang mekanis.",
      de: "Ihre Gefühlswelt hat fast jede Farbe verloren. Nahestehende wirken emotional unerreichbar, Musik klingt wie dumpfes Rauschen, Sinnesfreude ist erloschen und der Alltag verlangt kräftezehrende mechanische Überwindung.",
      fr: "Votre monde affectif s'est vidé de ses couleurs. Vos proches vous semblent lointains, la musique n'est plus qu'un grésillement sans âme et chaque journée exige un effort mécanique titanesque.",
      es: "Tu universo emocional ha perdido prácticamente todo su color. Tus seres queridos se sienten lejanos, la música suena como estática vacía, el placer sensorial se ha apagado y vivir el día a día exige un esfuerzo titánico.",
    },
    psychology: {
      en: "In severe anhedonia, neuroinflammatory signaling and chronic hypothalamic-pituitary-adrenal (HPA) axis overdrive shut down ventral striatal dopamine synthesis and orbitofrontal value-coding circuits. You are in a profound physiological state of energy conservation where joy is metabolically deprioritized.",
      id: "Pada anhedonia berat, badai inflamasi saraf dan kelelahan aksis HPA mematikan sintesis dopamin di ventral striatum dan sirkuit penilaian orbitofrontal. Tubuhmu sedang berada dalam mode konservasi energi ekstrem di mana rasa senang dikesampingkan secara biologis.",
      de: "Bei schwerer Anhedonie dämpfen neuroinflammatorische Zytokine und eine überlastete HPA-Achse die Dopaminsynthese im ventralen Striatum. Das Nervensystem befindet sich in einem tiefen Energiesparmodus, der Freude metabolisch sperrt.",
      fr: "Dans l'anhédonie sévère, les marqueurs neuro-inflammatoires et l'épuisement de l'axe HPA bloquent la synthèse de dopamine dans le striatum ventral. L'organisme s'est placé en mode d'économie d'énergie vitale extrême.",
      es: "En la anhedonia severa, la neuroinflamación y la sobrecarga del eje HPA bloquean la síntesis de dopamina en el estriado ventral. Tu biología está en un modo de hibernación donde el placer ha sido despriorizado por supervivencia.",
    },
    actionProtocol: {
      en: [
        "Compassionate Psychoeducation: Remind yourself daily: 'My inability to feel pleasure is not a character flaw or permanent loss; it is a neurobiological exhaustion response.'",
        "Micro-Sensory Restoration: Engage with non-demanding sensory inputs (holding an ice cube, listening to ambient rainfall sounds, sitting under sunlight for 15 minutes).",
        "Nuju Somatic Audio Sanctuary: Do not force positive affirmations. Use Nuju's voice journal to whisper or talk without filters, letting raw sound vibrate through the vocal cords to activate the vagus nerve.",
      ],
      id: [
        "Edukasi Penuh Welas Asih: Ingatkan dirimu: 'Ketidakmampuanku merasakan senang bukanlah cacat moral; ini adalah respon kelelahan neurobiologis tubuhku.'",
        "Pemulihan Mikro-Sensori: Berinteraksilah dengan sensasi sederhana tanpa target (menggenggam es batu, mendengar suara rintik hujan, berjemur 15 menit).",
        "Sanctuary Audio Nuju: Jangan paksakan afirmasi positif palsu. Masuklah ke Nuju untuk berbicara pelan atau menghela napas; getaran pita suara akan merangsang saraf vagus secara alami.",
      ],
      de: [
        "Selbstmitgefühl: Verinnerlichen Sie: 'Dass ich keine Freude spüre, ist kein Charakterfehler, sondern eine neurobiologische Erschöpfungsreaktion meines Gehirns.'",
        "Mikro-sensorische Reize: Sanfte Sinneserfahrungen ohne Erwartung (Eiswürfel in der Hand halten, Regenlauschen, 15 Minuten Sonnenlicht).",
        "Nuju-Schutzraum für die Stimme: Keine erzwungenen positiven Phrasen. Sprechen oder seufzen Sie im geschützten Nuju-Raum, um über die Stimmbänder den Vagusnerv zu stimulieren.",
      ],
      fr: [
        "Auto-compassion profonde : Répétez-vous : 'Mon incapacité à ressentir la joie n'est pas une faute morale, mais une réaction d'épuisement neurobiologique.'",
        "Micro-stimulations sensorielles : Tenez un glaçon, écoutez la pluie ou exposez-vous 15 minutes à la lumière du soleil sans rien attendre.",
        "Sanctuaire vocal Nuju : Évitez la positivité toxique. Utilisez Nuju pour murmurer ou soupirer sans filtre, stimulant le nerf vague par la vibration vocale.",
      ],
      es: [
        "Autocompasión Profunda: Recuérdate a diario: 'No poder sentir placer no es una falla moral, sino una respuesta neurobiológica de agotamiento severo.'",
        "Microestímulos Sensoriales: Sostén un cubo de hielo en la mano, escucha lluvia o toma 15 minutos de sol matutino sin ninguna exigencia.",
        "Santuario Vocal en Nuju: Evita el positivismo forzado. Usa Nuju para susurrar o desahogarte sin filtros; la vibración vocal estimulará tu nervio vago.",
      ],
    },
  },
  {
    level: "acute_dopamine_flatline",
    scoreRange: [31, 36],
    title: {
      en: "Acute Dopamine Flatline (Total Hedonic Shutdown)",
      id: "Mati Rasa Dopamin Akut (Shutdown Hedonik Menyeluruh)",
      de: "Akuter Dopamin-Stillstand (Vollständiger Hedonischer Shutdown)",
      fr: "Extinction Dopaminergique Aiguë (Arrêt Hédonique Total)",
      es: "Parálisis Dopaminérgica Aguda (Apagón Hedónico Total)",
    },
    badge: {
      en: "Total Pleasure Extinction",
      id: "Mati Rasa Total",
      de: "Vollständige Gefühlsleere",
      fr: "Extinction Sensorielle Complète",
      es: "Extinción Total del Placer",
    },
    summary: {
      en: "You are in a state of near-total hedonic paralysis. All forms of pleasure—sensory, anticipatory, and social—are completely muted. You feel like a ghost drifting through a monochrome world, cut off from joy, appetite, and emotional connection.",
      id: "Kamu berada dalam kondisi kelumpuhan hedonik nyaris total. Seluruh rasa senang—baik indrawi, rencana masa depan, maupun kebersamaan manusia—benar-benar padam. Kamu merasa seperti hantu yang melayang di dunia monokrom tanpa nafsu makan atau koneksi.",
      de: "Sie befinden sich in einer nahezu vollständigen hedonischen Lähmung. Jede Form von Vergnügen ist erloschen. Sie fühlen sich wie ein Geist in einer farblosen Welt, abgeschnitten von Freude, Appetit und Nähe.",
      fr: "Vous traversez une paralysie hédonique quasi totale. Tout plaisir est éteint. Vous avez l'impression d'être un fantôme dans un univers terne, coupé(e) de tout élan vital et de tout lien.",
      es: "Te encuentras en una parálisis hedónica casi absoluta. Todo tipo de placer está apagado. Te sientes como un espectro en un mundo gris, desconectado de la vitalidad, el apetito y los lazos humanos.",
    },
    psychology: {
      en: "This extreme clinical presentation reflects complete functional downregulation of mesocorticolimbic dopamine circuits and endorphinergic tone. It is commonly observed in major depressive disorder with melancholic features, severe chronic burnouts, or post-acute withdrawal states.",
      id: "Kondisi ekstrem ini mencerminkan down-regulasi menyeluruh pada sirkuit dopamin mesokortikolimbik dan tonus endorfin. Sangat umum ditemukan pada depresi mayor dengan ciri melankolis, kelelahan mental jangka panjang, atau pasca-trauma berat.",
      de: "Dieses extreme Bild spiegelt eine fast vollständige funktionelle Stillegung mesokortikolimbischer Dopaminbahnen wider. Häufig bei schwerer melancholischer Depression oder totalem Erschöpfungskollaps.",
      fr: "Ce tableau clinique sévère traduit un arrêt fonctionnel des voies mésocorticolimbiques et de l'axe endorphinique. Typique des dépressions mélancoliques majeures ou des burnouts extrêmes.",
      es: "Este cuadro clínico extremo refleja una desconexión casi total de las vías dopaminérgicas mesocorticolímbicas. Típico de la depresión mayor melancólica o colapsos de agotamiento extremo.",
    },
    actionProtocol: {
      en: [
        "Professional Medical Consultation: Because acute anhedonia strongly signals neurobiological depletion, consult a psychiatrist or licensed clinical psychologist for comprehensive neurochemical evaluation.",
        "Zero Guilt Stasis: Treat yourself like a patient recovering from major surgery. Sleep, eat simple nourishing food, and remove all social obligations.",
        "Silent Presence in Nuju: Use Nuju simply to record your breath or raw thoughts with zero expectation of feeling better. Just being heard in privacy is the first step toward neural safety.",
      ],
      id: [
        "Konsultasi Medis Profesional: Karena anhedonia akut menandakan kehabisan neurokimiawi parah, sangat disarankan berkonsultasi dengan psikiater atau psikolog klinis untuk evaluasi komprehensif.",
        "Istirahat Tanpa Rasa Bersalah: Perlakukan dirimu seperti pasien yang baru pulih dari operasi besar. Cukup tidur, makan bergizi sederhana, dan singkirkan tuntutan sosial.",
        "Kehadiran Sunyi di Nuju: Gunakan Nuju untuk merekam helaan napas atau gumaman pikiran tanpa target apa pun. Merasa aman dan diterima secara privat adalah langkah awal mengaktifkan kembali sistem saraf.",
      ],
      de: [
        "Fachärztliche Abklärung: Da akute Anhedonie auf schwere neurobiologische Erschöpfung hinweist, suchen Sie bitte einen Psychiater oder Psychotherapeuten auf.",
        "Schonraum ohne Schuldgefühle: Behandeln Sie sich wie nach einer großen Operation. Schlafen, einfache Mahlzeiten und alle sozialen Pflichten radikal pausieren.",
        "Stille Präsenz in Nuju: Nutzen Sie Nuju, um einfach Ihren Atem oder leise Worte aufzunehmen. Privater Schutzraum ist das Fundament neuronaler Erholung.",
      ],
      fr: [
        "Consultation médicale spécialisée : Une anhédonie aiguë reflétant un épuisement neurochimique profond, consultez un psychiatre ou un psychologue clinicien.",
        "Repos absolu sans culpabilité : Traitez-vous comme un convalescent d'une lourde chirurgie. Dormez, mangez simplement et suspendez toute obligation.",
        "Présence silencieuse sur Nuju : Utilisez Nuju pour enregistrer un souffle ou quelques mots sans attendre de miracle. La sécurité intérieure précède la renaissance du plaisir.",
      ],
      es: [
        "Consulta Médica Especializada: Como la anhedonia aguda refleja un agotamiento neuroquímico severo, consulta con un psiquiatra o psicólogo clínico.",
        "Reposo Absoluto sin Culpa: Trátate como un paciente tras una cirugía mayor. Duerme, aliméntate con sencillez y cancela compromisos sociales.",
        "Presencia en Nuju: Usa Nuju para registrar tu respiración o pensamientos sin ninguna expectativa. Sentirte en un espacio seguro es el inicio de la recuperación neuronal.",
      ],
    },
  },
];

export const ANHEDONIA_SUBSCALE_INFO = {
  consummatory_pleasure_deficit: {
    name: {
      en: "Consummatory Pleasure Deficit (Sensory Savoring)",
      id: "Defisit Kenikmatan Konsumatori (Sensasi Saat Ini)",
      de: "Konsummatorisches Lustdefizit (Momentgenuss)",
      fr: "Déficit du Plaisir Consommatoire (Dégustation Présente)",
      es: "Déficit de Placer Consumatorio (Disfrute Presente)",
    },
    description: {
      en: "The blunting of in-the-moment sensory pleasure from food, music, nature, tactile sensations, and physical relaxation.",
      id: "Ketumpulan rasa nikmat saat merasakan makanan, alunan musik, keindahan alam, sentuhan, dan kenyamanan fisik.",
      de: "Die Unfähigkeit, Sinnesreize im gegenwärtigen Moment (Essen, Musik, Berührung, Natur) genussvoll zu erleben.",
      fr: "L'incapacité d'éprouver une satisfaction sensorielle directe face à la nourriture, la musique ou la nature.",
      es: "La dificultad para sentir placer sensorial inmediato ante la comida, la música, la naturaleza o el descanso.",
    },
  },
  anticipatory_pleasure_deficit: {
    name: {
      en: "Anticipatory Pleasure Deficit (Dopamine Drive & Motivation)",
      id: "Defisit Kenikmatan Antisipatif (Dorongan Dopamin & Motivasi)",
      de: "Antizipatorisches Lustdefizit (Vorfreude & Antrieb)",
      fr: "Déficit du Plaisir Anticipatoire (Élan & Motivation)",
      es: "Déficit de Placer Anticipatorio (Ilusión y Motivación)",
    },
    description: {
      en: "Inability to look forward to future events with excitement, passion, or motivation; feeling that nothing is worth pursuing.",
      id: "Ketidakmampuan menantikan masa depan dengan antusiasme atau motivasi; merasa tidak ada hal yang bernilai untuk dikejar.",
      de: "Mangelnde Vorfreude auf kommende Ereignisse oder Hobbys; das Gefühl, dass sich kein Ziel mehr lohnend anfühlt.",
      fr: "Incapacité à se projeter dans des événements futurs avec excitation ; impression que rien ne vaut la peine d'être entrepris.",
      es: "Incapacidad de esperar con ilusión eventos futuros; sensación de que nada vale el esfuerzo de ser perseguido.",
    },
  },
  social_anhedonia_detachment: {
    name: {
      en: "Social Anhedonia & Relational Detachment",
      id: "Anhedonia Sosial & Keterasingan Relasional",
      de: "Soziale Anhedonie & Beziehungsdistanz",
      fr: "Anhédonie Sociale & Détachement Relationnel",
      es: "Anhedonia Social y Desconexión Afectiva",
    },
    description: {
      en: "Loss of warm emotional resonance, joy, and bonding from friendships, family, laughter, and human intimacy.",
      id: "Hilangnya rasa hangat, kebahagiaan, dan ikatan batin saat berinteraksi dengan sahabat, keluarga, atau pasangan.",
      de: "Verlust der emotionalen Herzenswärme und Freude an Zwischenmenschlichkeit, Lachen und Intimität.",
      fr: "Perte de la résonance affective et du plaisir de partager des moments avec des amis ou des proches.",
      es: "Pérdida de calidez, alegría y conexión en las relaciones con amigos, familiares o la pareja.",
    },
  },
};

export function getAnhedoniaResult(totalScore: number): AnhedoniaResultLevel {
  const clamped = Math.max(0, Math.min(36, totalScore));
  return (
    ANHEDONIA_RESULTS.find(
      (r) => clamped >= r.scoreRange[0] && clamped <= r.scoreRange[1]
    ) || ANHEDONIA_RESULTS[0]
  );
}

export function calculateAnhedoniaSubscales(answers: Record<number, number>): {
  consummatory_pleasure_deficit: number;
  anticipatory_pleasure_deficit: number;
  social_anhedonia_detachment: number;
} {
  let cp = 0;
  let ap = 0;
  let sa = 0;

  ANHEDONIA_QUESTIONS.forEach((q) => {
    const score = answers[q.id] ?? 0;
    if (q.subscale === "consummatory_pleasure_deficit") cp += score;
    if (q.subscale === "anticipatory_pleasure_deficit") ap += score;
    if (q.subscale === "social_anhedonia_detachment") sa += score;
  });

  return {
    consummatory_pleasure_deficit: cp,
    anticipatory_pleasure_deficit: ap,
    social_anhedonia_detachment: sa,
  };
}
