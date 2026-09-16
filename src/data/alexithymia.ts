export type AlexithymiaLang = "en" | "id" | "de" | "fr" | "es";
export type AlexithymiaDimension = "identifying_feelings" | "describing_feelings" | "external_thinking";
export type AlexithymiaLevel = "severe_alexithymia" | "intellectualizer" | "periodic_numbness" | "emotionally_fluent";

export interface AlexithymiaQuestion {
  id: number;
  text: Record<AlexithymiaLang, string>;
  dimension: AlexithymiaDimension;
}

export interface AlexithymiaProfile {
  level: AlexithymiaLevel;
  badge: Record<AlexithymiaLang, string>;
  title: Record<AlexithymiaLang, string>;
  tagline: Record<AlexithymiaLang, string>;
  description: Record<AlexithymiaLang, string>;
  interoceptionDrills: Record<AlexithymiaLang, string[]>;
  color: string;
}

export const ALEXITHYMIA_QUESTIONS: AlexithymiaQuestion[] = [
  // --- IDENTIFYING FEELINGS (TAS-20 DIF Subscale) ---
  {
    id: 1,
    dimension: "identifying_feelings",
    text: {
      en: "I am often confused about what emotion I am actually feeling; I just experience an uncomfortable physical knot in my stomach or chest.",
      id: "Saya kerap bingung emosi apa yang sebenarnya sedang saya rasakan; saya hanya merasakan sensasi fisik tidak nyaman di perut atau dada.",
      de: "Ich bin oft verwirrt darüber, welches Gefühl ich empfinde; ich spüre nur einen unangenehmen Kloß im Magen oder in der Brust.",
      fr: "Je suis souvent incapable d'identifier l'émotion exacte qui m'anime ; je ne perçois qu'un malaise physique dans la poitrine ou l'estomac.",
      es: "A menudo me cuesta saber qué emoción estoy sintiendo; solo percibo un nudo físico incómodo en el estómago o el pecho.",
    },
  },
  {
    id: 2,
    dimension: "identifying_feelings",
    text: {
      en: "When I am upset or overwhelmed, I cannot tell whether I am sad, angry, scared, or just physically sick or hungry.",
      id: "Saat gelisah atau tertekan, saya sulit membedakan apakah saya sedang sedih, marah, takut, atau sekadar lelah/lapar.",
      de: "Wenn ich aufgewühlt bin, kann ich kaum unterscheiden, ob ich traurig, wütend, ängstlich oder einfach nur hungrig bin.",
      fr: "Quand je suis bouleversé, j'ignore si je suis triste, en colère, effrayé ou simplement fatigué ou affamé.",
      es: "Cuando estoy alterado, no distingo si estoy triste, enojado, asustado o simplemente exhausto o hambriento.",
    },
  },
  {
    id: 3,
    dimension: "identifying_feelings",
    text: {
      en: "I have physical sensations in my body (rapid pulse, tremors, headaches) that doctors cannot find any medical cause for.",
      id: "Saya kerap mengalami sensasi fisik (jantung berdebar, gemetar, pusing) yang tidak ditemukan penyebab medis organiknya oleh dokter.",
      de: "Ich habe körperliche Symptome (Herzrasen, Schwindel, Kopfschmerzen), für die Ärzte keine organische Ursache finden.",
      fr: "J'éprouve des tensions physiques (palpitations, tremblements, céphalées) sans aucune explication médicale trouvée par les médecins.",
      es: "Siento malestares físicos (taquicardia, temblores, migrañas) para los que los médicos no hallan causa orgánica.",
    },
  },
  {
    id: 4,
    dimension: "identifying_feelings",
    text: {
      en: "When people ask me 'How are you feeling?', my mind goes completely blank.",
      id: "Ketika ada orang bertanya 'Bagaimana perasaanmu sekarang?', kepala saya mendadak kosong tanpa jawaban.",
      de: "Wenn mich jemand fragt: 'Wie fühlst du dich gerade?', herrscht in meinem Kopf vollkommene Leere.",
      fr: "Quand on me demande 'Comment te sens-tu ?', mon esprit devient totalement vide.",
      es: "Cuando me preguntan '¿Cómo te sientes?', mi mente se queda en blanco por completo.",
    },
  },

  // --- DESCRIBING FEELINGS (TAS-20 DDF Subscale) ---
  {
    id: 5,
    dimension: "describing_feelings",
    text: {
      en: "It is extremely difficult for me to find the right words to describe my deep feelings to another person.",
      id: "Sangat sulit bagi saya menemukan kata-kata yang tepat untuk mengungkapkan perasaan mendalam saya kepada orang lain.",
      de: "Es fällt mir unheimlich schwer, passende Worte für meine inneren Gefühle gegenüber anderen zu finden.",
      fr: "Il m'est extrêmement difficile de trouver les mots justes pour exprimer mes ressentis profonds à autrui.",
      es: "Me resulta complicadísimo encontrar las palabras adecuadas para expresar lo que siento a otra persona.",
    },
  },
  {
    id: 6,
    dimension: "describing_feelings",
    text: {
      en: "I default to generic answers like 'I'm fine' or 'It is what it is' because explaining my inner state feels impossible.",
      id: "Saya selalu menjawab dengan kalimat datar seperti 'Aku baik-baik aja' atau 'Ya sudahlah' karena menjelaskan isi hati terasa mustahil.",
      de: "Ich flüchte mich in Floskeln wie 'Alles okay' oder 'Ist halt so', weil eine Erklärung meiner Gefühle unmöglich erscheint.",
      fr: "Je me réfugie dans des réponses bateaux comme 'Ça va' ou 'C'est comme ça' car expliciter mon état me semble infaisable.",
      es: "Recurro a respuestas tópicas como 'Estoy bien' o 'Es lo que hay' porque explicar mi interior me resulta casi imposible.",
    },
  },
  {
    id: 7,
    dimension: "describing_feelings",
    text: {
      en: "My partners or close friends have complained that I am emotionally unavailable, robotic, or hard to read.",
      id: "Pasangan atau sahabat saya pernah mengeluh bahwa saya kaku, bersikap seperti robot, atau sulit dibaca secara emosional.",
      de: "Partner oder enge Freunde haben mir schon vorgeworfen, emotional unnahbar, roboterhaft oder unlesbar zu sein.",
      fr: "Mes partenaires ou amis m'ont déjà reproché d'être inaccessible, distant ou semblable à un robot.",
      es: "Mis parejas o amigos cercanos se han quejado de que soy distante, frío o como un robot difícil de descifrar.",
    },
  },
  {
    id: 8,
    dimension: "describing_feelings",
    text: {
      en: "I prefer to analyze what happened logically rather than talk about how it hurt me emotionally.",
      id: "Saya lebih suka membedah kejadian secara logika fakta daripada membicarakan rasa sakit emosional yang ditimbulkannya.",
      de: "Ich analysiere Ereignisse lieber rein logisch, statt darüber zu sprechen, wie sehr sie mich emotional verletzt haben.",
      fr: "Je préfère analyser les faits de manière cartésienne plutôt que d'évoquer ma blessure émotionnelle.",
      es: "Prefiero diseccionar los hechos fríamente antes que hablar del dolor emocional que me provocaron.",
    },
  },

  // --- EXTERNALLY-ORIENTED THINKING (TAS-20 EOT Subscale) ---
  {
    id: 9,
    dimension: "external_thinking",
    text: {
      en: "I prefer focusing on concrete tasks, spreadsheets, and daily logistics rather than reflecting on psychological motives.",
      id: "Saya lebih nyaman fokus pada tugas konkret, data teknis, dan pekerjaan logistik daripada merenungkan motif psikologis batin.",
      de: "Ich konzentriere mich lieber auf konkrete Aufgaben, Zahlen und Fakten als über seelische Beweggründe nachzudenken.",
      fr: "Je préfère me focaliser sur des tâches pratiques, des chiffres et de la logistique que sur la psychologie intérieure.",
      es: "Me siento más cómodo centrándome en tareas prácticas, datos y rutinas que explorando motivaciones psicológicas.",
    },
  },
  {
    id: 10,
    dimension: "external_thinking",
    text: {
      en: "I find deep philosophical discussions about feelings, poetry, or inner emotional states boring or unproductive.",
      id: "Saya merasa diskusi mendalam tentang perasaan, puisi, atau dinamika batin terasa membosankan dan kurang produktif.",
      de: "Tiefsinnige Gespräche über Emotionen, Gedichte oder Seelenzustände empfinde ich als unproduktiv oder langweilig.",
      fr: "Les conversations introspectives sur les émotions ou les métaphores poétiques m'ennuient ou me semblent stériles.",
      es: "Las charlas filosóficas sobre sentimientos o estados interiores me parecen poco prácticas o aburridas.",
    },
  },
  {
    id: 11,
    dimension: "external_thinking",
    text: {
      en: "I rarely daydream or imagine fantasy scenarios; my thoughts are almost always tied to immediate practical reality.",
      id: "Saya jarang melamun atau berfantasi imajinatif; pikiran saya hampir selalu terpaku pada kenyataan praktis saat ini.",
      de: "Ich träume selten vor mich hin; meine Gedanken kreisen fast ausschließlich um die greifbare Realität.",
      fr: "Je ne rêvasse presque jamais ; mes pensées sont quasi exclusivement arrimées au réel concret.",
      es: "Rara vez fantaseo o sueño despierto; mis pensamientos están anclados a la realidad pragmática del día a día.",
    },
  },
  {
    id: 12,
    dimension: "external_thinking",
    text: {
      en: "When problems arise, I want immediate tactical action steps, getting frustrated when people suggest 'sitting with the emotion'.",
      id: "Saat ada masalah, saya menuntut tindakan taktis instan; saya kesal saat orang lain menyuruh saya 'merasakan emosi terlebih dahulu'.",
      de: "Bei Problemen verlange ich sofortige Lösungen und reagiere gereizt, wenn jemand rät, 'das Gefühl erst einmal auszuhalten'.",
      fr: "Face aux soucis, j'exige des plans d'action immédiats et suis agacé quand on me dit d''accueillir l'émotion'.",
      es: "Ante cualquier problema exijo soluciones inmediatas y me impaciento si me sugieren 'sentir la emoción'.",
    },
  },
];

export const ALEXITHYMIA_OPTIONS = [
  {
    value: 0,
    label: {
      en: "Disagree / Rarely",
      id: "Tidak Setuju / Jarang",
      de: "Trifft nicht zu / Selten",
      fr: "Pas d'accord / Rarement",
      es: "En desacuerdo / Rara vez",
    },
  },
  {
    value: 1,
    label: {
      en: "Sometimes Agree",
      id: "Kadang-kadang Setuju",
      de: "Teilweise zutreffend",
      fr: "Parfois d'accord",
      es: "A veces de acuerdo",
    },
  },
  {
    value: 2,
    label: {
      en: "Mostly Agree",
      id: "Sering / Sebagian Besar Setuju",
      de: "Überwiegend zutreffend",
      fr: "Souvent d'accord",
      es: "Bastante de acuerdo",
    },
  },
  {
    value: 3,
    label: {
      en: "Strongly Agree",
      id: "Sangat Setuju / Selalu",
      de: "Trifft voll und ganz zu",
      fr: "Tout à fait d'accord",
      es: "Totalmente de acuerdo",
    },
  },
];

export const ALEXITHYMIA_PROFILES: Record<AlexithymiaLevel, AlexithymiaProfile> = {
  severe_alexithymia: {
    level: "severe_alexithymia",
    badge: {
      en: "High Alexithymia / Somatosensory Disconnection",
      id: "Alexithymia Berat / Disosiasi Somatosensorik",
      de: "Ausgeprägte Alexithymie / Emotionale Taubheit",
      fr: "Alexithymie Sévère / Déconnexion Somatique",
      es: "Alexitimia Severa / Desconexión Somatosensorial",
    },
    title: {
      en: "The Muted Monolith",
      id: "Batu Karang Kedap Rasa",
      de: "Der verstummte Monolith",
      fr: "Le Monolithe Silencieux",
      es: "El Monolito Silenciado",
    },
    tagline: {
      en: "Emotions are experienced almost entirely as unexplained physical aches and somatic knots.",
      id: "Emosi dirasakan hampir seluruhnya sebagai nyeri fisik tanpa nama dan ketegangan somatik.",
      de: "Gefühle werden fast ausschließlich als diffuse körperliche Schmerzen und somatische Enge erlebt.",
      fr: "Les ressentis sont vécus quasi exclusivement sous forme de douleurs corporelles inexpliquées.",
      es: "Las emociones se traducen casi por completo en dolores físicos y contracciones somáticas sin nombre.",
    },
    description: {
      en: "You score high on the clinical alexithymia spectrum. Coined from the Greek meaning 'no words for emotions', alexithymia is not a lack of feelings; it is a neurological and interoceptive disconnect between emotional processing centers (insula, amygdala) and verbal cognitive centers (anterior cingulate cortex). Your body feels the stress intensely, but your conscious mind cannot decode what it means, resulting in unaddressed psychosomatic tension.",
      id: "Anda berada dalam spektrum alexithymia yang tinggi. Berasal dari bahasa Yunani yang berarti 'kehilangan kata-kata untuk emosi', kondisi ini bukan berarti Anda tidak punya perasaan; melainkan terputusnya jembatan komunikasi antara pusat emosi tubuh (insula, amigdala) dan otak bahasa. Tubuh Anda menampung stres berat, namun pikiran Anda tidak mampu menerjemahkannya, memicu sakit fisik psikosomatis.",
      de: "Sie weisen ausgeprägte alexithyme Merkmale auf. Ihr Nervensystem erlebt Emotionen intensiv, doch die sprachliche Brücke im Gehirn ist blockiert. Unausgesprochene Gefühle wandern direkt in den Körper und äußern sich in chronischen Verspannungen und Erschöpfung.",
      fr: "Vous présentez un niveau élevé d'alexithymie. Vos centres émotionnels réagissent avec intensité, mais la connexion vers le langage verbal est rompue. Vos émotions non décodées s'expriment alors par des somatisations physiques pénibles.",
      es: "Muestras un nivel significativo de alexitimia. Tu cuerpo experimenta las emociones con fuerza, pero el puente neuronal hacia el lenguaje está desconectado, transformando los afectos en tensiones psicosomáticas.",
    },
    interoceptionDrills: {
      en: [
        "Somatic Sensation Mapping: Replace emotional words with sensory physics. Ask yourself: 'Is the sensation in my chest hot or cold? Tight or buzzing? Heavy or sharp?'",
        "The Emotional Color Palette: If you cannot name the feeling, pick a color (Crimson = Anger, Slate = Despair, Electric Yellow = Panic, Foggy Grey = Numb).",
        "Interoceptive Heartbeat Listening: Place a hand on your carotid pulse for 60 seconds without speaking. Reconnect with the biological engine of your emotions.",
      ],
      id: [
        "Pemetaan Sensasi Fisik: Jangan pusing mencari nama emosi. Tanyakan sensasi fisiknya: 'Apakah dada saya terasa panas atau dingin? Sesak atau bergetar? Berat atau tajam?'",
        "Palet Warna Emosi: Jika sulit menyebutkan nama emosi, pilih warna: (Merah Membara = Marah, Kelabu Kabut = Hampa/Mati Rasa, Kuning Sengatan = Cemas, Biru Gelap = Duka).",
        "Mendengarkan Denyut Jantung: Tempelkan telapak tangan di leher atau dada selama 60 detik dalam hening untuk menyambung kembali interosepsi tubuh.",
      ],
      de: [
        "Sensorische Landkarte: Beschreiben Sie die reine Physik: 'Ist das Engegefühl heiß oder kalt? Pocht es oder drückt es?'",
        "Farbpalette der Gefühle: Wählen Sie eine Farbe für Ihren Zustand (z. B. Dunkelgrau für Taubheit, Feuerrot für Wut).",
        "Puls-Spüren: Halten Sie eine Hand für 60 Sekunden an die Halsschlagader, um die körperliche Präsenz wahrzunehmen.",
      ],
      fr: [
        "Cartographie Sensorielle : Décrivez la sensation brute : 'Est-ce chaud ou froid ? Serré ou vibrant ? Lourd ou piquant ?'",
        "Nuancier Émotionnel : Choisissez une couleur pour votre état (Gris brumeux pour le vide, Rouge vif pour la colère).",
        "Écoute du Pouls : Posez la main sur votre cœur pendant 60 secondes pour réactiver l'intéroception corporelle.",
      ],
      es: [
        "Mapa de Sensaciones Físicas: Describe la física de la emoción: '¿Se siente caliente o frío? ¿Comprime o late?'",
        "Paleta Cromática: Elige un color para tu estado (Gris niebla = entumecimiento, Rojo fuego = indignación).",
        "Escucha del Pulso: Siente tu pulso durante 60 segundos para restablecer la conexión interoceptiva básica.",
      ],
    },
    color: "#e11d48",
  },
  intellectualizer: {
    level: "intellectualizer",
    badge: {
      en: "Moderate Alexithymia / Intellectual Defense",
      id: "Alexithymia Sedang / Intelektualisasi Defensif",
      de: "Mittlere Alexithymie / Intellektuelle Abwehr",
      fr: "Alexithymie Modérée / Intellectualisation Défensive",
      es: "Alexitimia Moderada / Intelectualización",
    },
    title: {
      en: "The Rational Analyst",
      id: "Analis Rasional yang Dingin",
      de: "Der kühle Analytiker",
      fr: "L'Analyste Rationnel",
      es: "El Analista Racional",
    },
    tagline: {
      en: "Translating messy emotional states into logical puzzles, blueprints, and pragmatic tasks.",
      id: "Menerjemahkan kerumitan emosi menjadi teka-teki logika, bagan analitis, dan rencana kerja.",
      de: "Verwandelt unberechenbare Gefühle in logische Gleichungen, Analysen und To-do-Listen.",
      fr: "Convertit le désordre affectif en équations rationnelles et listes d'actions pragmatiques.",
      es: "Transforma el caos emocional en esquemas lógicos y planes de acción pragmáticos.",
    },
    description: {
      en: "You have a strong tendency toward externally-oriented thinking. When faced with emotional conflict, your immediate reflex is to dissect the situation like a mechanic diagnosing an engine. While this makes you brilliant at crisis problem-solving, it leaves close partners feeling emotionally starved and alienates you from your own intuitive desires.",
      id: "Anda memiliki kecenderungan kuat untuk berpikir serba teknis dan berorientasi luar (externally-oriented thinking). Saat menghadapi konflik perasaan, refleks pertama Anda adalah membedah masalah seperti montir memperbaiki mesin mobil. Ini membuat Anda hebat dalam memecahkan krisis kerja, namun membuat pasangan merasa hampa secara emosi dan menjauhkan Anda dari intuisi diri.",
      de: "Sie neigen dazu, Emotionen rein kognitiv zu sezieren wie ein Mechaniker. Im Beruf macht Sie das extrem handlungsfähig, doch im Beziehungsleben führt es zu emotionaler Distanz und Entfremdung.",
      fr: "Vous traitez les émotions comme des problèmes techniques à résoudre. Si cette approche cartésienne est précieuse au travail, elle frustre vos proches et vous coupe de vos élans affectifs spontanés.",
      es: "Abordas las emociones como averías mecánicas que reparar. Esta mente analítica te otorga gran eficacia laboral, pero genera frialdad en tus vínculos íntimos y te desconecta de tu intuición.",
    },
    interoceptionDrills: {
      en: [
        "The 'Why' Ban: For 24 hours, prohibit yourself from asking 'Why do I feel this?' Instead, only ask: 'Where is this living in my body right now?'",
        "Granularity Chart: Keep an emotions wheel nearby to replace vague terms ('stressed', 'annoyed') with precise vocabulary ('invalidated', 'melancholy', 'frustrated').",
      ],
      id: [
        "Larangan Kata 'Mengapa': Selama 24 jam, jangan menganalisis 'Mengapa saya merasa begini?' Ganti pertanyaannya menjadi: 'Di bagian tubuh mana rasa tegang ini menetap?'",
        "Roda Kosakata Emosi: Gunakan roda emosi untuk mengganti kata umum ('stres', 'kesal') menjadi kosakata presisi ('kecewa karena diabaikan', 'khawatir ditolak', 'letih emosional').",
      ],
      de: [
        "Verzichten Sie auf 'Warum': Fragen Sie sich nicht 'Warum fühle ich das?', sondern nur: 'Wo im Körper spüre ich die Anspannung?'",
        "Gefühlsrad: Ersetzen Sie Standardwörter ('gestresst') durch präzise Begriffe ('gekränkt', 'ohnmächtig').",
      ],
      fr: [
        "Interdiction du 'Pourquoi' : Ne vous demandez plus pourquoi vous ressentez cela, mais seulement : 'Où cela résonne-t-il dans mon corps ?'",
        "Roue des Émotions : Enrichissez votre vocabulaire pour troquer 'stressé' contre 'démuni' ou 'incompris'.",
      ],
      es: [
        "Pausa al 'Por Qué': No analices el motivo lógico; pregúntate únicamente: '¿En qué lugar exacto del cuerpo se aloja esta tensión?'",
        "Rueda de Emociones: Sustituye términos genéricos ('agobiado') por matices precisos ('ninguneado', 'desbordado').",
      ],
    },
    color: "#f59e0b",
  },
  periodic_numbness: {
    level: "periodic_numbness",
    badge: {
      en: "Mild Alexithymia / Situational Numbing",
      id: "Alexithymia Ringan / Mati Rasa Situasional",
      de: "Leichte Alexithymie / Phasenweise Taubheit",
      fr: "Alexithymie Légère / Engourdissement Passager",
      es: "Alexitimia Leve / Desconexión Situacional",
    },
    title: {
      en: "The Guarded Sensor",
      id: "Sang Pengamat Waspada",
      de: "Der vorsichtige Sensor",
      fr: "Le Capteur Prudent",
      es: "El Sensor Reservado",
    },
    tagline: {
      en: "Generally in touch with feelings, but emotional channels shut down under severe conflict or overload.",
      id: "Umumnya mampu merasakan emosi, namun katup batin mendadak mati rasa saat menghadapi konflik berat.",
      de: "Normalerweise gefühlsbetont, doch bei Überforderung schalten die emotionalen Kanäle ab.",
      fr: "Sensible en temps normal, mais coupe ses circuits émotionnels en cas de saturation ou de dispute.",
      es: "Habitualmente conectado, pero anestesia sus sentimientos ante conflictos intensos o sobrecarga.",
    },
    description: {
      en: "Your alexithymia is not chronic, but situational. When calm, you understand yourself well. However, when relationship friction, sensory overload, or trauma triggers arise, your nervous system triggers a temporary shut-off valve to protect you. During these episodes, you feel blank, detached, and struggle to articulate words.",
      id: "Kondisi alexithymia Anda bersifat situasional. Dalam keadaan tenang, Anda mengenali emosi Anda dengan baik. Namun saat terjadi pertengkaran hebat atau kelelahan ekstrem, sistem saraf Anda mengaktifkan katup mati rasa untuk melindungi diri. Pada saat itu, kepala Anda terasa kosong dan lidah kelu untuk berbicara.",
      de: "Ihre Gefühlstaubheit tritt vor allem unter akutem Beziehungsstress auf als Schutzreflex des Nervensystems.",
      fr: "Votre coupure affective est un mécanisme de sauvegarde temporaire déclenché par les conflits ou la fatigue intense.",
      es: "Tu anestesia emocional es un fusible biológico temporal que salta ante discusiones o saturación nerviosa.",
    },
    interoceptionDrills: {
      en: [
        "The Timeout Script: 'My nervous system is in emotional shutdown. I need 20 minutes of silence, then I will return to finish this conversation.'",
        "Gentle Body Shaking: Gently shake out your hands, arms, and shoulders to release frozen adrenaline during shutdown episodes.",
      ],
      id: [
        "Kalimat Jeda Aman: 'Sistem saraf saya sedang mengalami shutdown emosional. Saya butuh waktu tenang 20 menit, setelah itu kita lanjutkan bicara.'",
        "Mengguncang Tubuh Perlahan: Goyangkan pergelangan tangan, lengan, dan bahu secara lembut untuk melarutkan respons saraf yang membeku.",
      ],
      de: [
        "Auszeit ankündigen: 'Mein Nervensystem ist gerade überlastet. Ich brauche 20 Minuten Ruhe, dann reden wir weiter.'",
        "Körper ausschütteln: Schütteln Sie sanft Hände und Schultern, um die Schockstarre zu lösen.",
      ],
      fr: [
        "Annonce du Sas : 'Mon système nerveux se met en veille. J'ai besoin de 20 minutes de silence avant de poursuivre.'",
        "Secouement Somatique : Secouez doucement les mains et les bras pour désamorcer l'état de figement.",
      ],
      es: [
        "Pausa Consciente: 'Mi sistema nervioso está saturado. Necesito 20 minutos de silencio y retomamos la charla con calma.'",
        "Sacudida Somática: Sacude con suavidad manos y hombros para liberar la parálisis nerviosa.",
      ],
    },
    color: "#3b82f6",
  },
  emotionally_fluent: {
    level: "emotionally_fluent",
    badge: {
      en: "High Emotional Granularity / Interoceptive Flow",
      id: "Kecerdasan Interosepsi Tinggi / Fasih Emosi",
      de: "Hohe emotionale Granularität / Interozeptive Klarheit",
      fr: "Haute Granularité Émotionnelle / Lucidité Intérieure",
      es: "Granularidad Emocional Plena / Fluidez Interoceptiva",
    },
    title: {
      en: "The Fluent Empath",
      id: "Pribadi Berkelimpahan Rasa",
      de: "Der einfühlsame Resonanzkörper",
      fr: "L'Être Émotionnellement Fluide",
      es: "La Consciencia Fluida",
    },
    tagline: {
      en: "Seamless bridge between bodily sensations, emotional awareness, and articulate expression.",
      id: "Jembatan yang harmonis antara sensasi tubuh, kesadaran emosional, dan tutur kata yang tepat.",
      de: "Fließender Übergang zwischen körperlichem Spüren, seelischem Verstehen und feinfühligem Ausdruck.",
      fr: "Une passerelle harmonieuse entre sensations corporelles, clarté des sentiments et expression verbale.",
      es: "Un puente natural y fluido entre las sensaciones del cuerpo, los sentimientos y la palabra.",
    },
    description: {
      en: "You possess high interoceptive awareness and emotional granularity. You effortlessly decode bodily cues, distinguish nuanced emotions (e.g., distinguishing regret from shame), and articulate your feelings transparently in relationships without fear of vulnerability.",
      id: "Anda memiliki kesadaran interoseptif dan kecerdasan bahasa emosi yang sangat matang. Anda mampu membaca sinyal tubuh dengan tepat, membedakan nuansa rasa yang subtil (seperti membedakan penyesalan dari rasa malu), dan mengomunikasikannya secara terbuka dalam hubungan.",
      de: "Sie besitzen eine bemerkenswerte emotionale Sprachkompetenz und können Körpersignale treffsicher deuten.",
      fr: "Vous disposez d'une belle lucidité intéroceptive, sachant nommer vos nuances intérieures avec authenticité.",
      es: "Posees una notable sensibilidad interoceptiva, capaz de descifrar tu cuerpo y nombrar tus afectos con soltura.",
    },
    interoceptionDrills: {
      en: [
        "Poetic Expressiveness: Use your emotional fluency to journal rich metaphors or support friends navigating their own emotional fog.",
      ],
      id: [
        "Ekspresi Berbobot: Manfaatkan kefasihan emosi Anda untuk menulis jurnal harian atau menjadi pendengar yang aman bagi sahabat Anda.",
      ],
      de: [
        "Feinfühliges Tagebuch: Nutzen Sie Ihre Sprachbegabung im Journaling oder zur Unterstützung von Angehörigen.",
      ],
      fr: [
        "Écriture Intuitive : Mettez votre richesse verbale au service de votre journal intime ou de vos proches.",
      ],
      es: [
        "Expresión Poética: Emplea tu riqueza de matices en el diario personal o para acompañar a quienes te rodean.",
      ],
    },
    color: "#10b981",
  },
};

export interface AlexithymiaScoreResult {
  totalScore: number;
  maxScore: number;
  percentage: number;
  level: AlexithymiaLevel;
  profile: AlexithymiaProfile;
  subscales: {
    identifying_feelings: { score: number; max: number; percentage: number };
    describing_feelings: { score: number; max: number; percentage: number };
    external_thinking: { score: number; max: number; percentage: number };
  };
}

export function calculateAlexithymiaScore(answers: Record<number, number>): AlexithymiaScoreResult {
  let identifying_feelings = 0;
  let describing_feelings = 0;
  let external_thinking = 0;

  ALEXITHYMIA_QUESTIONS.forEach((q) => {
    const val = answers[q.id] || 0;
    if (q.dimension === "identifying_feelings") identifying_feelings += val;
    if (q.dimension === "describing_feelings") describing_feelings += val;
    if (q.dimension === "external_thinking") external_thinking += val;
  });

  const totalScore = identifying_feelings + describing_feelings + external_thinking;
  const maxScore = 36;
  const percentage = Math.round((totalScore / maxScore) * 100);

  let level: AlexithymiaLevel = "emotionally_fluent";

  if (totalScore >= 25) {
    level = "severe_alexithymia";
  } else if (totalScore >= 18) {
    level = "intellectualizer";
  } else if (totalScore >= 9) {
    level = "periodic_numbness";
  } else {
    level = "emotionally_fluent";
  }

  return {
    totalScore,
    maxScore,
    percentage,
    level,
    profile: ALEXITHYMIA_PROFILES[level],
    subscales: {
      identifying_feelings: {
        score: identifying_feelings,
        max: 12,
        percentage: Math.round((identifying_feelings / 12) * 100),
      },
      describing_feelings: {
        score: describing_feelings,
        max: 12,
        percentage: Math.round((describing_feelings / 12) * 100),
      },
      external_thinking: {
        score: external_thinking,
        max: 12,
        percentage: Math.round((external_thinking / 12) * 100),
      },
    },
  };
}
