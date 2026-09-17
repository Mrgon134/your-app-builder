export type DopamineBurnoutLang = "en" | "id" | "de" | "fr" | "es";

export type DopamineBurnoutLevel = "balanced" | "mild" | "moderate" | "severe";

export type DopamineBurnoutDimension =
  | "anhedonia"
  | "compulsive_tunnelling"
  | "restless_withdrawal";

export interface DopamineBurnoutQuestion {
  id: number;
  dimension: DopamineBurnoutDimension;
  text: Record<DopamineBurnoutLang, string>;
}

export const DOPAMINE_BURNOUT_OPTIONS = [
  {
    value: 0,
    label: {
      en: "Rarely / Never",
      id: "Jarang / Tidak Pernah",
      de: "Selten / Nie",
      fr: "Rarement / Jamais",
      es: "Rara vez / Nunca",
    },
  },
  {
    value: 1,
    label: {
      en: "Sometimes",
      id: "Kadang-kadang",
      de: "Manchmal",
      fr: "Parfois",
      es: "A veces",
    },
  },
  {
    value: 2,
    label: {
      en: "Frequently / Often",
      id: "Seringkali",
      de: "Häufig / Oft",
      fr: "Souvent",
      es: "Frecuentemente",
    },
  },
  {
    value: 3,
    label: {
      en: "Almost Always / Severely",
      id: "Hampir Selalu / Parah",
      de: "Fast immer / Stark",
      fr: "Presque toujours / Sévère",
      es: "Casi siempre / Severo",
    },
  },
];

export const DOPAMINE_BURNOUT_QUESTIONS: DopamineBurnoutQuestion[] = [
  // Dimension 1: Anhedonia / Pleasure Flatline
  {
    id: 1,
    dimension: "anhedonia",
    text: {
      en: "Activities that used to genuinely excite me (hobbies, music, food, nature) now feel bland and colorless, as if my brain can no longer register pleasure.",
      id: "Aktivitas yang dulu benar-benar menyenangkan (hobi, musik, makanan, alam) kini terasa hambar dan pudar, seolah otak saya tidak bisa merasakan kesenangan lagi.",
      de: "Aktivitäten, die mich früher begeisterten (Hobbys, Musik, Essen, Natur), fühlen sich jetzt fade und farblos an, als könne mein Gehirn keine Freude mehr empfinden.",
      fr: "Les activités qui me passionnaient (loisirs, musique, nourriture, nature) me semblent désormais ternes, comme si mon cerveau ne pouvait plus ressentir de plaisir.",
      es: "Las actividades que antes me entusiasmaban (hobbies, música, comida, naturaleza) ahora se sienten insípidas, como si mi cerebro ya no pudiera registrar placer.",
    },
  },
  {
    id: 2,
    dimension: "anhedonia",
    text: {
      en: "I need increasingly extreme or novel stimuli (louder music, spicier food, more shocking content) to feel anything at all.",
      id: "Saya membutuhkan stimulasi yang semakin ekstrem atau baru (musik lebih keras, makanan lebih pedas, konten lebih mengejutkan) untuk merasakan sesuatu.",
      de: "Ich brauche immer extremere oder neuartigere Reize (lautere Musik, schärferes Essen, schockierendere Inhalte), um überhaupt etwas zu spüren.",
      fr: "J'ai besoin de stimuli de plus en plus extrêmes ou inédits (musique plus forte, nourriture plus épicée, contenus plus choquants) pour ressentir quoi que ce soit.",
      es: "Necesito estímulos cada vez más extremos o novedosos (música más fuerte, comida más picante, contenido más impactante) para sentir algo.",
    },
  },
  {
    id: 3,
    dimension: "anhedonia",
    text: {
      en: "After a long session of scrolling or binge-watching, I feel emptier and more numb than before I started, yet I keep going.",
      id: "Setelah sesi panjang scrolling atau menonton maraton, saya merasa lebih hampa dan mati rasa dari sebelumnya, tetapi tetap melanjutkan.",
      de: "Nach einer langen Scrolling- oder Binge-Watching-Sitzung fühle ich mich leerer und tauber als zuvor, und mache trotzdem weiter.",
      fr: "Après de longues sessions de défilement ou de visionnage compulsif, je me sens plus vide et engourdi qu'avant, et pourtant je continue.",
      es: "Después de una larga sesión de scroll o maratón de series, me siento más vacío y adormecido que antes, pero sigo haciéndolo.",
    },
  },
  {
    id: 4,
    dimension: "anhedonia",
    text: {
      en: "I struggle to feel genuine excitement or anticipation about upcoming events, trips, or milestones that objectively should make me happy.",
      id: "Saya sulit merasa benar-benar bersemangat atau menantikan acara, perjalanan, atau pencapaian yang seharusnya membuat saya bahagia.",
      de: "Es fällt mir schwer, echte Vorfreude auf bevorstehende Ereignisse, Reisen oder Meilensteine zu empfinden, die mich eigentlich glücklich machen sollten.",
      fr: "J'ai du mal à ressentir de l'enthousiasme ou de l'anticipation pour des événements, voyages ou jalons qui devraient objectivement me rendre heureux.",
      es: "Me cuesta sentir entusiasmo genuino o anticipación por eventos, viajes o hitos que objetivamente deberían hacerme feliz.",
    },
  },
  // Dimension 2: Compulsive Tunnelling / Digital Addiction
  {
    id: 5,
    dimension: "compulsive_tunnelling",
    text: {
      en: "I compulsively switch between apps, tabs, or screens without any specific purpose, unable to stop the loop even when I notice it.",
      id: "Saya secara kompulsif berpindah-pindah antar aplikasi, tab, atau layar tanpa tujuan jelas, tidak bisa menghentikan siklus meskipun menyadarinya.",
      de: "Ich wechsle zwanghaft zwischen Apps, Tabs oder Bildschirmen ohne konkretes Ziel und kann die Schleife nicht stoppen, selbst wenn ich es bemerke.",
      fr: "Je passe compulsivement d'une application, onglet ou écran à l'autre sans but précis, incapable de rompre le cycle même en en étant conscient.",
      es: "Cambio compulsivamente entre apps, pestañas o pantallas sin propósito específico, incapaz de detener el ciclo aunque lo note.",
    },
  },
  {
    id: 6,
    dimension: "compulsive_tunnelling",
    text: {
      en: "I regularly lose 2+ hours to social media, short-form videos, or infinite feeds and only realize the time loss afterward with shame or regret.",
      id: "Saya rutin kehilangan 2+ jam untuk media sosial, video pendek, atau feed tak berujung dan baru menyadari waktu yang hilang sesudahnya dengan rasa malu.",
      de: "Ich verliere regelmäßig 2+ Stunden an soziale Medien, Kurzvideos oder endlose Feeds und bemerke den Zeitverlust erst danach mit Scham oder Reue.",
      fr: "Je perds régulièrement 2 heures ou plus sur les réseaux sociaux, vidéos courtes ou flux infinis, ne réalisant la perte de temps qu'après coup, avec honte.",
      es: "Regularmente pierdo 2+ horas en redes sociales, videos cortos o feeds infinitos y solo me doy cuenta después con vergüenza o arrepentimiento.",
    },
  },
  {
    id: 7,
    dimension: "compulsive_tunnelling",
    text: {
      en: "I check notifications, emails, or messages within seconds of hearing a ping, even during meals, conversations, or important tasks.",
      id: "Saya mengecek notifikasi, email, atau pesan dalam hitungan detik setelah mendengar bunyi notifikasi, bahkan saat makan, percakapan, atau tugas penting.",
      de: "Ich überprüfe Benachrichtigungen, E-Mails oder Nachrichten innerhalb von Sekunden nach einem Ton, selbst beim Essen, in Gesprächen oder bei wichtigen Aufgaben.",
      fr: "Je vérifie mes notifications, e-mails ou messages en quelques secondes après un signal sonore, même pendant les repas, conversations ou tâches importantes.",
      es: "Reviso notificaciones, correos o mensajes en segundos tras oír una alerta, incluso durante comidas, conversaciones o tareas importantes.",
    },
  },
  {
    id: 8,
    dimension: "compulsive_tunnelling",
    text: {
      en: "I have tried to reduce screen time or set digital boundaries multiple times but relapse within days, feeling powerless against the pull.",
      id: "Saya sudah beberapa kali mencoba mengurangi screen time atau menetapkan batasan digital, tetapi selalu kambuh dalam hitungan hari, merasa tak berdaya.",
      de: "Ich habe mehrfach versucht, meine Bildschirmzeit zu reduzieren oder digitale Grenzen zu setzen, falle aber innerhalb von Tagen zurück und fühle mich machtlos.",
      fr: "J'ai essayé plusieurs fois de réduire mon temps d'écran ou de fixer des limites numériques, mais je rechute en quelques jours, me sentant impuissant.",
      es: "He intentado reducir el tiempo de pantalla o establecer límites digitales varias veces, pero recaigo en días, sintiéndome impotente ante la atracción.",
    },
  },
  // Dimension 3: Restless Withdrawal / Neurochemical Debt
  {
    id: 9,
    dimension: "restless_withdrawal",
    text: {
      en: "When I have nothing to scroll, watch, or consume, I feel an unbearable restlessness, agitation, or physical discomfort that only digital input relieves.",
      id: "Saat tidak ada yang bisa di-scroll, ditonton, atau dikonsumsi, saya merasa gelisah tak tertahankan, agitasi, atau ketidaknyamanan fisik yang hanya reda dengan input digital.",
      de: "Wenn ich nichts zu scrollen, schauen oder konsumieren habe, empfinde ich unerträgliche Unruhe, Agitation oder körperliches Unbehagen, das nur digitaler Input lindert.",
      fr: "Quand je n'ai rien à faire défiler, regarder ou consommer, je ressens une agitation insupportable que seul un apport numérique peut soulager.",
      es: "Cuando no tengo nada para scrollear, ver o consumir, siento una inquietud insoportable que solo el input digital alivia.",
    },
  },
  {
    id: 10,
    dimension: "restless_withdrawal",
    text: {
      en: "I experience brain fog, difficulty concentrating, or a sense of mental paralysis when I try to do deep work or read long-form content.",
      id: "Saya mengalami brain fog, sulit berkonsentrasi, atau kelumpuhan mental saat mencoba bekerja mendalam atau membaca konten panjang.",
      de: "Ich erlebe Gehirnnebel, Konzentrationsschwierigkeiten oder geistige Lähmung, wenn ich versuche, konzentriert zu arbeiten oder längere Texte zu lesen.",
      fr: "J'éprouve un brouillard mental, des difficultés de concentration ou une paralysie mentale quand j'essaie de faire un travail en profondeur ou de lire un texte long.",
      es: "Experimento niebla mental, dificultad para concentrarme o una parálisis mental al intentar trabajo profundo o leer contenido extenso.",
    },
  },
  {
    id: 11,
    dimension: "restless_withdrawal",
    text: {
      en: "My sleep quality has deteriorated: I either can't fall asleep without screen content, or I wake up feeling unrested despite sleeping 7-8 hours.",
      id: "Kualitas tidur saya memburuk: saya tidak bisa tidur tanpa konten layar, atau bangun merasa tidak segar meskipun tidur 7-8 jam.",
      de: "Meine Schlafqualität hat sich verschlechtert: Ich kann ohne Bildschirminhalte nicht einschlafen oder wache trotz 7-8 Stunden Schlaf unerholt auf.",
      fr: "Ma qualité de sommeil s'est détériorée : je ne peux pas m'endormir sans contenu sur écran, ou je me réveille fatigué malgré 7-8 heures de sommeil.",
      es: "Mi calidad de sueño ha empeorado: no puedo dormirme sin contenido en pantalla, o despierto sin descansar a pesar de dormir 7-8 horas.",
    },
  },
  {
    id: 12,
    dimension: "restless_withdrawal",
    text: {
      en: "I notice physical symptoms like jaw clenching, chronic tension headaches, eye strain, or a racing heartbeat that I suspect are linked to digital overstimulation.",
      id: "Saya menyadari gejala fisik seperti rahang mengencang, sakit kepala tegang kronis, mata lelah, atau detak jantung cepat yang saya duga terkait overstimulasi digital.",
      de: "Ich bemerke körperliche Symptome wie Kieferanspannung, chronische Spannungskopfschmerzen, Augenbelastung oder Herzrasen, die vermutlich mit digitaler Überstimulation zusammenhängen.",
      fr: "Je remarque des symptômes physiques comme le serrement de mâchoire, des céphalées de tension chroniques, de la fatigue oculaire ou des palpitations que je soupçonne liés à la surstimulation numérique.",
      es: "Noto síntomas físicos como tensión mandibular, cefaleas tensionales crónicas, fatiga visual o taquicardia que sospecho están ligados a la sobreestimulación digital.",
    },
  },
];

export interface DopamineBurnoutProfile {
  title: Record<DopamineBurnoutLang, string>;
  badge: Record<DopamineBurnoutLang, string>;
  tagline: Record<DopamineBurnoutLang, string>;
  description: Record<DopamineBurnoutLang, string>;
  recoveryProtocol: Record<DopamineBurnoutLang, string[]>;
  color: string;
}

export const DOPAMINE_BURNOUT_PROFILES: Record<DopamineBurnoutLevel, DopamineBurnoutProfile> = {
  balanced: {
    title: {
      en: "Neurochemical Equilibrium",
      id: "Keseimbangan Neurokimia",
      de: "Neurochemisches Gleichgewicht",
      fr: "Équilibre Neurochimique",
      es: "Equilibrio Neuroquímico",
    },
    badge: {
      en: "🟢 Healthy Baseline",
      id: "🟢 Baseline Sehat",
      de: "🟢 Gesunde Baseline",
      fr: "🟢 Ligne de Base Saine",
      es: "🟢 Línea Base Saludable",
    },
    tagline: {
      en: "Your dopamine receptors appear to be functioning within healthy parameters.",
      id: "Reseptor dopamin Anda tampaknya berfungsi dalam parameter yang sehat.",
      de: "Ihre Dopaminrezeptoren scheinen im gesunden Bereich zu funktionieren.",
      fr: "Vos récepteurs dopaminergiques semblent fonctionner dans des paramètres sains.",
      es: "Sus receptores de dopamina parecen funcionar dentro de parámetros saludables.",
    },
    description: {
      en: "You maintain a healthy relationship with digital stimulation. You can enjoy screen content without compulsive dependency, and your brain still generates genuine pleasure from offline activities, nature, deep conversations, and quiet moments.",
      id: "Anda menjaga hubungan sehat dengan stimulasi digital. Anda bisa menikmati konten layar tanpa ketergantungan kompulsif, dan otak Anda masih menghasilkan kesenangan murni dari aktivitas offline, alam, percakapan mendalam, dan momen tenang.",
      de: "Sie pflegen ein gesundes Verhältnis zur digitalen Stimulation. Sie können Bildschirminhalte genießen, ohne zwanghaft abhängig zu sein, und Ihr Gehirn erzeugt noch echte Freude aus Offline-Aktivitäten.",
      fr: "Vous maintenez une relation saine avec la stimulation numérique. Votre cerveau génère encore un plaisir authentique à partir d'activités hors ligne et de moments de calme.",
      es: "Mantiene una relación saludable con la estimulación digital. Su cerebro aún genera placer genuino a partir de actividades offline y momentos tranquilos.",
    },
    recoveryProtocol: {
      en: [
        "Maintain your current digital hygiene — your baseline is strong.",
        "Continue prioritizing offline sensory experiences (nature, exercise, crafts).",
        "Schedule periodic 'analog weekends' to preserve receptor sensitivity.",
      ],
      id: [
        "Pertahankan kebersihan digital Anda saat ini — baseline Anda kuat.",
        "Terus prioritaskan pengalaman sensorik offline (alam, olahraga, kerajinan).",
        "Jadwalkan 'weekend analog' berkala untuk menjaga sensitivitas reseptor.",
      ],
      de: [
        "Halten Sie Ihre aktuelle Digitalhygiene aufrecht — Ihre Baseline ist stark.",
        "Priorisieren Sie weiterhin Offline-Sinneserfahrungen (Natur, Sport, Handwerk).",
        "Planen Sie regelmäßige 'analoge Wochenenden' ein.",
      ],
      fr: [
        "Maintenez votre hygiène numérique actuelle — votre ligne de base est solide.",
        "Continuez à privilégier les expériences sensorielles hors ligne (nature, sport, artisanat).",
        "Programmez des 'week-ends analogiques' périodiques.",
      ],
      es: [
        "Mantenga su higiene digital actual — su línea base es fuerte.",
        "Siga priorizando experiencias sensoriales offline (naturaleza, ejercicio, artesanía).",
        "Programe 'fines de semana analógicos' periódicos.",
      ],
    },
    color: "#22C55E",
  },
  mild: {
    title: {
      en: "Early Desensitization",
      id: "Desensitisasi Awal",
      de: "Frühe Desensibilisierung",
      fr: "Désensibilisation Précoce",
      es: "Desensibilización Temprana",
    },
    badge: {
      en: "🟡 Receptor Drift",
      id: "🟡 Drift Reseptor",
      de: "🟡 Rezeptordrift",
      fr: "🟡 Dérive Réceptrice",
      es: "🟡 Deriva Receptora",
    },
    tagline: {
      en: "Your reward circuits show signs of tolerance buildup and early hedonic adaptation.",
      id: "Sirkuit hadiah Anda menunjukkan tanda-tanda pembentukan toleransi dan adaptasi hedonik awal.",
      de: "Ihre Belohnungsschaltkreise zeigen Anzeichen von Toleranzaufbau und früher hedonischer Anpassung.",
      fr: "Vos circuits de récompense montrent des signes de tolérance et d'adaptation hédonique précoce.",
      es: "Sus circuitos de recompensa muestran signos de acumulación de tolerancia y adaptación hedónica temprana.",
    },
    description: {
      en: "You are in the early stages of dopamine receptor downregulation. Screens are gradually replacing offline pleasure sources. You may notice that simple activities feel 'boring' compared to high-stimulation digital content, and your attention span is shortening.",
      id: "Anda berada di tahap awal downregulasi reseptor dopamin. Layar secara bertahap menggantikan sumber kesenangan offline. Anda mungkin merasa aktivitas sederhana 'membosankan' dibanding konten digital stimulasi tinggi.",
      de: "Sie befinden sich im frühen Stadium der Dopaminrezeptor-Herunterregulierung. Bildschirme ersetzen allmählich Offline-Freudequellen.",
      fr: "Vous êtes aux premiers stades de la régulation à la baisse des récepteurs de dopamine. Les écrans remplacent progressivement les sources de plaisir hors ligne.",
      es: "Está en las primeras etapas de regulación a la baja de receptores de dopamina. Las pantallas están reemplazando gradualmente las fuentes de placer offline.",
    },
    recoveryProtocol: {
      en: [
        "Implement a 30-minute 'dopamine delay': When craving your phone, wait 30 minutes before picking it up.",
        "Replace one daily screen session with a tactile offline activity (cooking, drawing, walking).",
        "Use grayscale mode on your phone after 8 PM to reduce visual reward signals.",
      ],
      id: [
        "Terapkan 'jeda dopamin' 30 menit: Saat ingin membuka HP, tunggu 30 menit sebelum mengambilnya.",
        "Ganti satu sesi layar harian dengan aktivitas offline taktil (masak, menggambar, jalan kaki).",
        "Gunakan mode grayscale di HP setelah jam 8 malam untuk mengurangi sinyal hadiah visual.",
      ],
      de: [
        "Implementieren Sie eine 30-minütige 'Dopamin-Verzögerung': Warten Sie 30 Minuten, bevor Sie zum Telefon greifen.",
        "Ersetzen Sie eine tägliche Bildschirmsitzung durch eine haptische Offline-Aktivität.",
        "Verwenden Sie nach 20 Uhr den Graustufenmodus auf Ihrem Telefon.",
      ],
      fr: [
        "Instaurez un 'délai dopamine' de 30 minutes avant de prendre votre téléphone.",
        "Remplacez une session d'écran quotidienne par une activité tactile hors ligne.",
        "Utilisez le mode niveaux de gris après 20h pour réduire les signaux de récompense visuelle.",
      ],
      es: [
        "Implemente un 'retraso de dopamina' de 30 minutos: espere antes de tomar su teléfono.",
        "Reemplace una sesión de pantalla diaria con una actividad táctil offline.",
        "Use modo escala de grises en su teléfono después de las 20h.",
      ],
    },
    color: "#EAB308",
  },
  moderate: {
    title: {
      en: "Dopamine Resistance Syndrome",
      id: "Sindrom Resistensi Dopamin",
      de: "Dopaminresistenz-Syndrom",
      fr: "Syndrome de Résistance Dopaminergique",
      es: "Síndrome de Resistencia Dopamínica",
    },
    badge: {
      en: "🟠 Neural Saturation",
      id: "🟠 Saturasi Neural",
      de: "🟠 Neurale Sättigung",
      fr: "🟠 Saturation Neurale",
      es: "🟠 Saturación Neural",
    },
    tagline: {
      en: "Your reward system is significantly desensitized — digital overstimulation has created measurable neurochemical debt.",
      id: "Sistem hadiah Anda telah mengalami desensitisasi signifikan — overstimulasi digital telah menciptakan hutang neurokimia yang terukur.",
      de: "Ihr Belohnungssystem ist deutlich desensibilisiert — digitale Überstimulation hat messbare neurochemische Schulden verursacht.",
      fr: "Votre système de récompense est significativement désensibilisé — la surstimulation numérique a créé une dette neurochimique mesurable.",
      es: "Su sistema de recompensa está significativamente desensibilizado — la sobreestimulación digital ha creado una deuda neuroquímica medible.",
    },
    description: {
      en: "Your dopamine receptor density has likely decreased from chronic overstimulation. You experience the classic 'more is never enough' loop: each dopamine spike demands a bigger hit, while baseline pleasure continues to erode. Deep work, reading, and offline socializing feel painfully dull.",
      id: "Kepadatan reseptor dopamin Anda kemungkinan menurun akibat overstimulasi kronis. Anda mengalami siklus klasik 'lebih banyak tak pernah cukup': setiap lonjakan dopamin menuntut stimulus lebih besar, sementara kesenangan dasar terus terkikis.",
      de: "Ihre Dopaminrezeptordichte hat sich durch chronische Überstimulation wahrscheinlich verringert. Sie erleben die klassische 'Mehr ist nie genug'-Schleife.",
      fr: "La densité de vos récepteurs dopaminergiques a probablement diminué en raison d'une surstimulation chronique. Vous vivez la boucle classique 'plus n'est jamais assez'.",
      es: "La densidad de sus receptores de dopamina probablemente ha disminuido por sobreestimulación crónica. Experimenta el bucle clásico de 'más nunca es suficiente'.",
    },
    recoveryProtocol: {
      en: [
        "Start a structured 7-day 'Dopamine Fast': Eliminate high-stimulation digital content (social media, short videos, gaming) for one full week.",
        "Introduce daily 20-minute cold exposure (cold shower or cold plunge) to naturally upregulate D2 receptors.",
        "Practice 'boring meditation': Sit in silence for 15 minutes daily with no music, no guided audio — just stillness.",
      ],
      id: [
        "Mulai 'Puasa Dopamin' terstruktur 7 hari: Eliminasi konten digital stimulasi tinggi (medsos, video pendek, gaming) selama satu minggu penuh.",
        "Perkenalkan paparan dingin harian 20 menit (mandi air dingin) untuk meningkatkan reseptor D2 secara alami.",
        "Praktikkan 'meditasi membosankan': Duduk dalam keheningan selama 15 menit tanpa musik atau audio — hanya ketenangan.",
      ],
      de: [
        "Starten Sie ein 7-tägiges strukturiertes 'Dopamin-Fasten': Eliminieren Sie hochstimulierende digitale Inhalte für eine volle Woche.",
        "Führen Sie tägliche 20-minütige Kälteexposition ein, um D2-Rezeptoren natürlich hochzuregulieren.",
        "Üben Sie 'langweilige Meditation': 15 Minuten in völliger Stille ohne Musik oder Audio.",
      ],
      fr: [
        "Commencez un 'jeûne dopamine' structuré de 7 jours : éliminez le contenu numérique à forte stimulation pendant une semaine.",
        "Introduisez une exposition au froid quotidienne de 20 minutes pour réguler naturellement les récepteurs D2.",
        "Pratiquez la 'méditation ennuyeuse' : 15 minutes en silence complet.",
      ],
      es: [
        "Inicie un 'ayuno de dopamina' estructurado de 7 días: elimine contenido digital de alta estimulación durante una semana completa.",
        "Introduzca exposición al frío diaria de 20 minutos para regular los receptores D2 naturalmente.",
        "Practique 'meditación aburrida': 15 minutos en silencio total sin música ni audio guiado.",
      ],
    },
    color: "#F97316",
  },
  severe: {
    title: {
      en: "Critical Dopamine Depletion",
      id: "Deplesi Dopamin Kritis",
      de: "Kritische Dopaminerschöpfung",
      fr: "Déplétion Dopaminergique Critique",
      es: "Depleción Dopamínica Crítica",
    },
    badge: {
      en: "🔴 Neurochemical Exhaustion",
      id: "🔴 Kelelahan Neurokimia",
      de: "🔴 Neurochemische Erschöpfung",
      fr: "🔴 Épuisement Neurochimique",
      es: "🔴 Agotamiento Neuroquímico",
    },
    tagline: {
      en: "Your brain's reward circuitry is in a state of profound exhaustion — baseline dopamine is critically depleted.",
      id: "Sirkuit hadiah otak Anda dalam keadaan kelelahan mendalam — dopamin baseline terkuras secara kritis.",
      de: "Die Belohnungsschaltkreise Ihres Gehirns befinden sich in einem Zustand tiefer Erschöpfung — das Basis-Dopamin ist kritisch erschöpft.",
      fr: "Les circuits de récompense de votre cerveau sont profondément épuisés — la dopamine de base est critiquement appauvrie.",
      es: "Los circuitos de recompensa de su cerebro están en un estado de agotamiento profundo — la dopamina basal está críticamente depleccionada.",
    },
    description: {
      en: "You show signs consistent with severe dopamine receptor downregulation, often described in the clinical literature as 'hedonic deficit state'. Your relationship with digital stimulation has crossed from habit into compulsive territory, creating a negative feedback loop where consumption creates worse emptiness. Professional support is strongly recommended.",
      id: "Anda menunjukkan tanda-tanda konsisten dengan downregulasi reseptor dopamin parah, sering disebut sebagai 'defisit hedonik'. Hubungan Anda dengan stimulasi digital telah melampaui kebiasaan menjadi kompulsif. Dukungan profesional sangat direkomendasikan.",
      de: "Sie zeigen Anzeichen einer schweren Dopaminrezeptor-Herunterregulierung, klinisch als 'hedonisches Defizitsyndrom' beschrieben. Professionelle Unterstützung wird dringend empfohlen.",
      fr: "Vous présentez des signes compatibles avec une régulation à la baisse sévère des récepteurs de dopamine, décrite cliniquement comme un 'état de déficit hédonique'. Un accompagnement professionnel est fortement recommandé.",
      es: "Muestra signos consistentes con una regulación a la baja severa de receptores de dopamina, descrita clínicamente como 'estado de déficit hedónico'. Se recomienda encarecidamente apoyo profesional.",
    },
    recoveryProtocol: {
      en: [
        "Consult a mental health professional: Severe dopamine depletion can mirror symptoms of clinical depression and may benefit from structured treatment.",
        "Consider a supervised 30-day 'Digital Monastery': Drastically reduce all screen-based stimulation with professional accountability.",
        "Rebuild baseline dopamine through consistent exercise (150+ minutes/week), sunlight exposure (30 min morning), and omega-3 supplementation.",
      ],
      id: [
        "Konsultasi profesional kesehatan mental: Deplesi dopamin parah bisa menyerupai gejala depresi klinis dan mungkin memerlukan perawatan terstruktur.",
        "Pertimbangkan 'Biara Digital' 30 hari: Kurangi drastis semua stimulasi berbasis layar dengan bimbingan profesional.",
        "Bangun kembali dopamin dasar melalui olahraga konsisten (150+ menit/minggu), paparan sinar matahari pagi (30 menit), dan suplementasi omega-3.",
      ],
      de: [
        "Konsultieren Sie eine Fachkraft für psychische Gesundheit: Schwere Dopaminerschöpfung kann klinische Depressionssymptome imitieren.",
        "Erwägen Sie ein 30-tägiges 'Digitales Kloster': Reduzieren Sie drastisch alle bildschirmbasierte Stimulation.",
        "Bauen Sie Basisdopamin durch konsequente Bewegung (150+ Min/Woche), Sonnenlicht (30 Min morgens) und Omega-3-Supplementierung wieder auf.",
      ],
      fr: [
        "Consultez un professionnel de santé mentale : la déplétion sévère de dopamine peut imiter des symptômes de dépression clinique.",
        "Envisagez un 'Monastère Numérique' de 30 jours : réduisez drastiquement toute stimulation basée sur les écrans.",
        "Reconstruisez la dopamine de base par l'exercice régulier (150+ min/semaine), l'exposition au soleil matinal (30 min) et la supplémentation en oméga-3.",
      ],
      es: [
        "Consulte un profesional de salud mental: la depleción severa de dopamina puede imitar síntomas de depresión clínica.",
        "Considere un 'Monasterio Digital' de 30 días: reduzca drásticamente toda estimulación basada en pantallas.",
        "Reconstruya la dopamina basal mediante ejercicio consistente (150+ min/semana), exposición solar matutina (30 min) y suplementación con omega-3.",
      ],
    },
    color: "#EF4444",
  },
};

export interface DopamineBurnoutScoreResult {
  totalScore: number;
  maxScore: number;
  percentage: number;
  level: DopamineBurnoutLevel;
  profile: DopamineBurnoutProfile;
  subscales: {
    anhedonia: { score: number; max: number; percentage: number };
    compulsive_tunnelling: { score: number; max: number; percentage: number };
    restless_withdrawal: { score: number; max: number; percentage: number };
  };
}

export function calculateDopamineBurnoutScore(
  answers: Record<number, number>
): DopamineBurnoutScoreResult {
  let totalScore = 0;
  let anhedoniaScore = 0;
  let compulsiveScore = 0;
  let withdrawalScore = 0;

  DOPAMINE_BURNOUT_QUESTIONS.forEach((q) => {
    const val = answers[q.id] ?? 0;
    totalScore += val;
    if (q.dimension === "anhedonia") anhedoniaScore += val;
    if (q.dimension === "compulsive_tunnelling") compulsiveScore += val;
    if (q.dimension === "restless_withdrawal") withdrawalScore += val;
  });

  const maxScore = DOPAMINE_BURNOUT_QUESTIONS.length * 3; // 36
  const percentage = Math.round((totalScore / maxScore) * 100);

  let level: DopamineBurnoutLevel = "balanced";
  if (totalScore >= 28) {
    level = "severe";
  } else if (totalScore >= 19) {
    level = "moderate";
  } else if (totalScore >= 10) {
    level = "mild";
  } else {
    level = "balanced";
  }

  const profile = DOPAMINE_BURNOUT_PROFILES[level];

  return {
    totalScore,
    maxScore,
    percentage,
    level,
    profile,
    subscales: {
      anhedonia: {
        score: anhedoniaScore,
        max: 12,
        percentage: Math.round((anhedoniaScore / 12) * 100),
      },
      compulsive_tunnelling: {
        score: compulsiveScore,
        max: 12,
        percentage: Math.round((compulsiveScore / 12) * 100),
      },
      restless_withdrawal: {
        score: withdrawalScore,
        max: 12,
        percentage: Math.round((withdrawalScore / 12) * 100),
      },
    },
  };
}
