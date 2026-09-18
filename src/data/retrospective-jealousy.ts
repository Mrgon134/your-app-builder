export type RetrospectiveJealousyCardLang = "en" | "id" | "de" | "fr" | "es";

export interface RetrospectiveJealousyQuestion {
  id: number;
  subscale:
    | "intrusive_mental_movies"
    | "compulsive_investigative_checking"
    | "moral_contamination_fear";
  text: Record<RetrospectiveJealousyCardLang, string>;
}

export interface RetrospectiveJealousyResultLevel {
  level:
    | "secure_present_focus"
    | "mild_curiosity_flutter"
    | "moderate_retrospective_fixation"
    | "severe_retroactive_ocd_loop"
    | "acute_retroactive_paralysis";
  scoreRange: [number, number];
  title: Record<RetrospectiveJealousyCardLang, string>;
  badge: Record<RetrospectiveJealousyCardLang, string>;
  summary: Record<RetrospectiveJealousyCardLang, string>;
  psychology: Record<RetrospectiveJealousyCardLang, string>;
  actionProtocol: Record<RetrospectiveJealousyCardLang, string[]>;
}

export const RETROSPECTIVE_JEALOUSY_QUESTIONS: RetrospectiveJealousyQuestion[] = [
  // 1. Intrusive Mental Movies
  {
    id: 1,
    subscale: "intrusive_mental_movies",
    text: {
      en: "Involuntary, vivid mental images or 'mini-movies' of my partner being intimate or romantic with an ex flash through my mind and torture me.",
      id: "Bayangan visual atau 'film mini' yang tak terkendali tentang keintiman fisik atau romantisme pasanganku bersama mantannya tiba-tiba muncul dan menyiksaku.",
      de: "Unwillkürliche, quälend lebhafte innere Bilder oder 'Filme' meines Partners mit seinem Ex-Partner drängen sich mir plötzlich auf.",
      fr: "Des images mentales involontaires ou de véritables 'mini-films' de mon partenaire intime avec son ex surgissent et me torturent.",
      es: "Imágenes mentales involuntarias o 'mini películas' vívidas de mi pareja siendo íntima con su ex aparecen de golpe y me atormentan.",
    },
  },
  // 2. Compulsive Investigative Checking
  {
    id: 2,
    subscale: "compulsive_investigative_checking",
    text: {
      en: "I repeatedly interrogate my partner with detailed questions about their romantic past, asking about sexual history, trips, or gifts from exes.",
      id: "Aku berulang kali menginterogasi pasanganku dengan pertanyaan detail tentang masa lalunya, riwayat keintiman, tempat liburan, atau kado dari mantan.",
      de: "Ich verhöre meinen Partner wiederholt mit detaillierten Fragen zu seiner sexuellen Vergangenheit, früheren Reisen oder Geschenken von Ex-Partnern.",
      fr: "J'interroge compulsivement mon partenaire avec des questions indiscrètes sur ses anciennes relations, ses expériences intimes ou ses cadeaux passés.",
      es: "Interrogo repetidamente a mi pareja con preguntas detalladas sobre su pasado íntimo, viajes o regalos que intercambió con sus exparejas.",
    },
  },
  // 3. Moral Contamination Fear
  {
    id: 3,
    subscale: "moral_contamination_fear",
    text: {
      en: "Knowing about my partner's past makes me feel they are emotionally 'tainted' or 'less pure', leading to irrational disgust or alienation.",
      id: "Mengetahui masa lalu pasanganku membuatku merasa dia 'ternoda' atau 'kurang suci', memicu rasa jijik atau keterasingan yang irasional.",
      de: "Das Wissen um die Vergangenheit meines Partners lässt ihn in meinen Augen 'befleckt' wirken und erzeugt irrationale Abscheu oder Entfremdung.",
      fr: "Le fait de connaître le passé de mon partenaire me donne l'impression qu'il est 'souillé', suscitant un dégoût irrationnel ou un rejet soudain.",
      es: "Conocer el pasado de mi pareja me hace sentir que está 'manchada' o es 'menos pura', generándome un rechazo o asco irracional.",
    },
  },
  // 4. Intrusive Mental Movies
  {
    id: 4,
    subscale: "intrusive_mental_movies",
    text: {
      en: "Harmless everyday triggers (hearing a song, visiting a café, seeing a brand name) instantly set off agonizing thoughts of their past relationships.",
      id: "Pemicu sehari-hari yang sepele (mendengar lagu tertentu, lewat di depan kafe, melihat merek) langsung memicu pikiran menyiksa tentang kisah cinta lamanya.",
      de: "Harmlose Alltagsreize (ein Song, ein Café, ein Markenname) lösen sofort qualvolle Assoziationen zu früheren Liebschaften meines Partners aus.",
      fr: "Des détails anodins (une chanson, un restaurant, un vêtement) déclenchent instantanément des boucles obsessionnelles sur ses relations passées.",
      es: "Detonantes cotidianos inofensivos (una canción, una cafetería, una marca) disparan pensamientos angustiosos sobre sus romances anteriores.",
    },
  },
  // 5. Compulsive Investigative Checking
  {
    id: 5,
    subscale: "compulsive_investigative_checking",
    text: {
      en: "I obsessively stalk my partner's or their exes' social media profiles, archived photos, and comments, searching for clues about their former bond.",
      id: "Aku terobsesi menguntit (stalking) media sosial pasanganku atau mantannya, mencari foto lama dan komentar demi menganalisis ikatan mereka dulu.",
      de: "Ich durchforste zwanghaft Social-Media-Profile, alte Fotos und Kommentare meines Partners oder seiner Ex-Partner nach Hinweisen.",
      fr: "J'épie de manière compulsive les profils des réseaux sociaux de mon partenaire et de ses ex, disséquant vieilles photos et commentaires.",
      es: "Reviso compulsivamente las redes sociales de mi pareja o de sus exparejas, buscando fotos archivadas e indicios sobre su vínculo anterior.",
    },
  },
  // 6. Moral Contamination Fear
  {
    id: 6,
    subscale: "moral_contamination_fear",
    text: {
      en: "I secretly fear that their first love or a previous relationship was more passionate, special, or profound than what we currently share.",
      id: "Aku diam-diam takut bahwa cinta pertama atau mantan pasanganku dulu jauh lebih bergairah, spesial, atau mendalam daripada hubungan kami saat ini.",
      de: "Ich fürchte heimlich, dass die erste große Liebe oder frühere Romanze meines Partners intensiver, magischer oder wertvoller war als unsere Liebe.",
      fr: "J'ai la terreur secrète que son premier amour ou une histoire passée ait été plus passionnée, magique ou profonde que ce que nous vivons.",
      es: "Temo en secreto que su primer amor o una pareja anterior haya sido más apasionada, especial o profunda que lo que construimos hoy.",
    },
  },
  // 7. Intrusive Mental Movies
  {
    id: 7,
    subscale: "intrusive_mental_movies",
    text: {
      en: "During intimate or affectionate moments with my partner, intrusive thoughts of their past intimacy suddenly hijack my mind and kill the mood.",
      id: "Saat momen intim atau bermesraan bersama pasanganku, bayangan masa lalu intimnya tiba-tiba membajak pikiranku dan menghancurkan suasana.",
      de: "In Momenten körperlicher Nähe oder Intimität drängen sich Gedanken an frühere Liebhaber meines Partners auf und zerstören den Moment.",
      fr: "Pendant les moments intimes ou tendres avec mon partenaire, des pensées parasites sur son passé surgissent et brisent tout élan.",
      es: "Durante momentos íntimos o cariñosos con mi pareja, pensamientos intrusivos sobre su pasado sexual secuestran mi mente y arruinan la conexión.",
    },
  },
  // 8. Compulsive Investigative Checking
  {
    id: 8,
    subscale: "compulsive_investigative_checking",
    text: {
      en: "I demand constant reassurance (e.g., 'Am I better?', 'Did you love them more?'), yet whatever answer my partner gives never brings lasting relief.",
      id: "Aku menuntut kepastian berulang (misal: 'Apakah aku lebih baik?', 'Kamu lebih sayang siapa?'), namun jawabannya tak pernah menenangkan hatiku.",
      de: "Ich fordere ständige Bestätigung ('Bin ich besser?', 'Hast du sie mehr geliebt?'), aber keine Antwort meines Partners beruhigt mich dauerhaft.",
      fr: "J'exige constamment d'être rassuré(e) ('Suis-je meilleur(e) ?', 'L'aimais-tu davantage ?'), mais aucune réponse ne m'apaise durablement.",
      es: "Exijo confirmación constante ('¿Soy mejor?', '¿La amabas más?'), pero ninguna respuesta de mi pareja me brinda calma duradera.",
    },
  },
  // 9. Moral Contamination Fear
  {
    id: 9,
    subscale: "moral_contamination_fear",
    text: {
      en: "I judge my partner harshly for decisions, casual flings, or boundaries they had years before they even met me.",
      id: "Aku menghakimi pasanganku dengan keras atas keputusan, cinta sesaat, atau gaya hidup yang ia jalani bertahun-tahun sebelum mengenal diriku.",
      de: "Ich verurteile meinen Partner insgeheim hart für Affären, Lebensentscheidungen oder Freiheiten aus Zeiten, bevor er mich überhaupt kannte.",
      fr: "Je juge sévèrement mon partenaire pour des aventures éphémères ou des choix de vie qu'il a eus bien des années avant de me rencontrer.",
      es: "Juzgo con dureza a mi pareja por decisiones íntimas, romances pasajeros o hábitos que tuvo años antes de conocerme.",
    },
  },
  // 10. Intrusive Mental Movies
  {
    id: 10,
    subscale: "intrusive_mental_movies",
    text: {
      en: "I lose hours of sleep or focus at work because my brain gets locked in endless mental simulations comparing myself to their past partners.",
      id: "Aku kehilangan jam tidur atau sulit fokus bekerja karena otakku terkunci dalam simulasi tanpa akhir membandingkan diriku dengan mantannya.",
      de: "Ich verliere Schlaf oder Konzentration bei der Arbeit, weil mein Geist endlos vergleicht, wie ich gegenüber vergangenen Partnern abschneide.",
      fr: "Je perds le sommeil ou ma concentration au travail parce que mon cerveau rumine des comparaisons sans fin avec ses anciens partenaires.",
      es: "Pierdo horas de sueño o concentración laboral porque mi mente queda atrapada en simulaciones interminables comparándome con sus exparejas.",
    },
  },
  // 11. Compulsive Investigative Checking
  {
    id: 11,
    subscale: "compulsive_investigative_checking",
    text: {
      en: "I mentally reconstruct past timelines and dates to 'catch' inconsistencies in stories my partner told me about their exes.",
      id: "Aku merekonstruksi linimasa dan tanggal di kepala untuk mencari ketidakkonsistenan dari cerita masa lalu yang pernah diucapkan pasanganku.",
      de: "Ich rekonstruiere Zeitabläufe und Daten im Kopf minutiös, um Widersprüche in den Erzählungen meines Partners über die Vergangenheit aufzudecken.",
      fr: "Je reconstitue méticuleusement la chronologie des dates pour débusquer la moindre incohérence dans les récits de mon partenaire.",
      es: "Reconstruyo cronologías y fechas en mi mente para 'atrapar' inconsistencias en las anécdotas que mi pareja me contó sobre sus exes.",
    },
  },
  // 12. Moral Contamination Fear
  {
    id: 12,
    subscale: "moral_contamination_fear",
    text: {
      en: "Even though our current relationship is healthy, loving, and loyal, the shadow of their past makes me feel like breaking up or running away.",
      id: "Meskipun hubungan kami saat ini sehat, penuh cinta, dan setia, bayang-bayang masa lalunya membuatku sering terpikir untuk putus atau lari.",
      de: "Obwohl unsere aktuelle Beziehung gesund und liebevoll ist, bringt mich der Schatten der Vergangenheit dazu, Trennung oder Flucht zu erwägen.",
      fr: "Bien que notre relation actuelle soit saine, aimante et loyale, le spectre de son passé me pousse parfois à vouloir tout rompre.",
      es: "Aunque nuestra relación actual es sana, amorosa y leal, la sombra de su pasado me hace desear sabotear el vínculo o escapar.",
    },
  },
];

export const RETROSPECTIVE_JEALOUSY_OPTIONS = [
  {
    value: 0,
    label: {
      en: "Never / Untrue (Present-grounded security, no intrusive ruminations)",
      id: "Tidak Pernah / Tidak Sesuai (Aman berpijak saat ini, tanpa bayangan mengganggu)",
      de: "Nie / Trifft nicht zu (Gegenwartsbezogen sicher, keine quälenden Grübeleien)",
      fr: "Jamais / Pas du tout (Sécurité ancrée au présent, aucune rumination)",
      es: "Nunca / Falso (Seguridad en el presente, sin rumiaciones intrusivas)",
    },
  },
  {
    value: 1,
    label: {
      en: "Rarely / Mildly (Fleeting curiosity or passing twinge, quickly dismissed)",
      id: "Jarang / Sedikit (Penasaran sepintas atau sengatan sesaat, lekas reda)",
      de: "Selten / Leicht (Flüchtige Neugier oder kurzer Stich, schnell überwunden)",
      fr: "Rarement / Légèrement (Curiosité éphémère ou pincement passager, vite dissipé)",
      es: "Rara vez / Levemente (Curiosidad fugaz o punzada pasajera, superada con rapidez)",
    },
  },
  {
    value: 2,
    label: {
      en: "Often / Moderately (Noticeable mental movies, urges to ask questions or check)",
      id: "Sering / Sedang (Film mental terlihat jelas, dorongan bertanya atau mengecek)",
      de: "Oft / Mäßig (Spürbares Kopfkino, Drang nach Ausfragen oder Profil-Checks)",
      fr: "Souvent / Modérément (Mini-films mentaux nets, envie d'interroger ou de vérifier)",
      es: "A menudo / Moderado (Películas mentales claras, urgencia de preguntar o revisar)",
    },
  },
  {
    value: 3,
    label: {
      en: "Constantly / Severely (Debilitating mental movies, obsessive interrogation, moral disgust)",
      id: "Sangat Sering / Parah (Film mental melumpuhkan, interogasi obsesif, rasa jijik moral)",
      de: "Ständig / Extrem (Lähmendes Kopfkino, zwanghafte Verhöre, moralischer Ekel)",
      fr: "Constamment / Sévèrement (Cinéma mental invalidant, interrogatoires obsessionnels, dégoût)",
      es: "Constantemente / Grave (Películas mentales demoledoras, interrogatorios obsesivos y asco)",
    },
  },
];

export const RETROSPECTIVE_JEALOUSY_RESULTS: RetrospectiveJealousyResultLevel[] = [
  // Level 1: 0 - 6
  {
    level: "secure_present_focus",
    scoreRange: [0, 6],
    title: {
      en: "Secure Present Focus & Radical Acceptance",
      id: "Fokus Masa Kini yang Aman & Penerimaan Utuh",
      de: "Sichere Gegenwartsfokussierung & Radikale Akzeptanz",
      fr: "Ancrage Présent Serein & Acceptation Radicale",
      es: "Enfoque Seguro en el Presente y Aceptación Radical",
    },
    badge: {
      en: "Present-Anchored Love",
      id: "Cinta Berpijak Realita",
      de: "Gegenwartsverankerte Liebe",
      fr: "Amour Ancré au Présent",
      es: "Amor Anclado al Presente",
    },
    summary: {
      en: "You hold a grounded, secure attitude toward romantic history. You understand that your partner's past shaped who they are today, and you comfortably focus on the love and devotion you share in the present.",
      id: "Kamu memiliki kedewasaan emosional yang kokoh terhadap masa lalu cinta pasangan. Kamu memahami bahwa masa lalu membentuk pribadinya saat ini, dan kamu merasa aman dengan komitmen yang ia berikan hari ini.",
      de: "Sie besitzen eine reife, gelassene Haltung zur Vergangenheit Ihres Partners. Sie begreifen, dass frühere Erfahrungen ihn geformt haben, und vertrauen ganz auf die gemeinsame Gegenwart.",
      fr: "Vous manifestez une grande maturité affective. Vous comprenez que le passé de votre partenaire fait partie de son histoire et vous vous épanouissez dans la confiance du présent.",
      es: "Posees una madurez emocional sólida frente a la historia amorosa de tu pareja. Comprendes que su pasado forjó su madurez y valoras la devoción compartida hoy.",
    },
    psychology: {
      en: "Clinical cognitive models by Dr. Robert L. Leahy highlight that secure lovers recognize temporal boundaries: the past has ceased to exist, and the only reality is the daily commitment enacted between two partners.",
      id: "Model kognitif Dr. Robert L. Leahy menunjukkan bahwa pribadi yang aman memahami batasan waktu: masa lalu telah sirna, dan satu-satunya realitas adalah kesetiaan dan tindakan nyata hari ini.",
      de: "Das kognitive Beziehungsmodell nach Dr. Robert L. Leahy betont, dass sichere Bindung auf der Erkenntnis beruht: Die Vergangenheit existiert nicht mehr, real ist nur die gelebte Zuneigung im Jetzt.",
      fr: "Les modèles cognitifs du Dr Robert L. Leahy démontrent que la sécurité d'attachement s'appuie sur la frontière temporelle : le passé est révolu, seule compte l'authenticité partagée chaque jour.",
      es: "El modelo de terapia cognitiva del Dr. Robert L. Leahy subraya que el apego seguro comprende los límites temporales: el pasado ya no existe y lo único real es el compromiso diario.",
    },
    actionProtocol: {
      en: [
        "Celebrate emotional maturity: Continue appreciating the unique, unrepeatable bond you are building together.",
        "Maintain open communication: Keep discussions about boundaries respectful, devoid of shame or forensic interrogation.",
        "Support your partner's growth: View past chapters as life lessons rather than competitors for affection.",
        "Track shared milestones on Nuju: Anchor your emotional intimacy in present gratitude and collaborative dreams.",
      ],
      id: [
        "Rayakan kedewasaan hubungan: Terus rawat keunikan ikatan yang sedang kalian bangun bersama setiap hari.",
        "Komunikasi tanpa menghakimi: Jaga keterbukaan obrolan tanpa pernah menginterogasi masa lalu secara forensik.",
        "Hargai perjalanan hidupnya: Pandang masa lalu pasangan sebagai proses belajar yang membawanya padamu.",
        "Dokumentasikan kenangan di Nuju: Perkuat keintiman dengan fokus pada rasa syukur dan rencana masa depan bersama.",
      ],
      de: [
        "Reife Bindung würdigen: Pflegen Sie weiterhin die Einzigartigkeit Ihrer gemeinsamen Beziehung.",
        "Respektvolle Kommunikation: Halten Sie Gespräche offen und verzichten Sie auf forensische Verhöre.",
        "Lebensweg wertschätzen: Betrachten Sie vergangene Stationen als wertvolle Lehrmeister, nicht als Konkurrenten.",
        "Gemeinsame Meilensteine in Nuju festhalten: Verankern Sie Dankbarkeit und Zukunftsvisionen im Alltag.",
      ],
      fr: [
        "Célébrer la maturité relationnelle : Continuez à chérir le lien unique que vous tissez au quotidien.",
        "Dialogue bienveillant : Maintenez une communication transparente, sans interrogatoires ni jugements moraux.",
        "Honorer son parcours : Voyez les histoires passées comme des étapes d'apprentissage qui l'ont mené(e) à vous.",
        "Enregistrer vos souvenirs dans Nuju : Ancrez l'intimité dans la gratitude et les projets d'avenir partagés.",
      ],
      es: [
        "Celebrar la madurez afectiva: Continúa valorando el vínculo singular que construyen cada día.",
        "Comunicación libre de juicios: Mantén conversaciones transparentes sin caer en interrogatorios forenses.",
        "Respetar su historia: Considera los capítulos previos como aprendizajes que forjaron a quien hoy te ama.",
        "Registrar hitos en Nuju: Fortalece la intimité presente con reflexiones y metas conjuntas.",
      ],
    },
  },

  // Level 2: 7 - 13
  {
    level: "mild_curiosity_flutter",
    scoreRange: [7, 13],
    title: {
      en: "Mild Romantic Curiosity & Fleeting Comparison",
      id: "Rasa Penasaran Romantis & Perbandingan Sepintas",
      de: "Leichte romantische Neugier & Flüchtige Vergleiche",
      fr: "Curiosité Romantique Légère & Comparaisons Passagères",
      es: "Curiosidad Romántica Leve y Comparaciones Pasajeras",
    },
    badge: {
      en: "Fleeting Past Insecurity",
      id: "Keraguan Masa Lalu Ringan",
      de: "Flüchtige Vergangenheitsunsicherheit",
      fr: "Doute Passager sur le Passé",
      es: "Inseguridad Retrospectiva Leve",
    },
    summary: {
      en: "You occasionally wonder about your partner's past lovers or feel a minor pang when an ex is brought up, but these thoughts dissipate quickly without disrupting your connection, self-esteem, or daily peace.",
      id: "Sesekali kamu merasa penasaran dengan mantan pasanganku atau tersengat sedikit rasa cemburu saat namanya disebut, namun pikiran ini lekas hilang tanpa merusak kepercayaan diri atau hubunganmu.",
      de: "Gelegentlich fragen Sie sich nach vergangenen Beziehungen Ihres Partners oder spüren einen kleinen Stich, doch diese Gedanken verfliegen rasch, ohne Ihren Alltag oder die Partnerschaft zu belasten.",
      fr: "Il vous arrive de vous interroger sur le passé de votre partenaire ou d'éprouver un léger pincement au cœur, mais ces pensées s'estompent vite sans ternir votre estime ni votre lien.",
      es: "De vez en cuando sientes curiosidad por los amores previos de tu pareja o una ligera punzada de celos, pero el pensamiento se disipa rápido sin dañar tu autoestima ni tu convivencia.",
    },
    psychology: {
      en: "Zachary Stockill notes that mild curiosity is standard human psychology. It only becomes pathological when coupled with anxiety-driven compulsions (interrogations or digital stalking) to seek artificial certainty.",
      id: "Zachary Stockill mencatat bahwa rasa penasaran wajar terjadi. Hal ini hanya menjadi masalah jika disertai dorongan cemas kompulsif seperti menguntit akun media sosial mantan atau mencecar pasangan demi kepastian semu.",
      de: "Nach Zachary Stockill ist milde Neugier ein natürlicher Reflex. Problematisch wird sie erst, wenn sie in zwanghaftes Kontrollieren von Profilen oder Verhöre übergeht.",
      fr: "Zachary Stockill souligne qu'une curiosité modérée est normale. Elle ne devient délétère que lorsqu'elle alimente des rituels compulsifs d'espionnage ou des demandes obsessionnelles de réassurance.",
      es: "Zachary Stockill destaca que la curiosidad leve es una reacción humana habitual; el riesgo surge cuando se transforma en compulsiones de espionaje o interrogatorios para calmar la ansiedad.",
    },
    actionProtocol: {
      en: [
        "Resist digital digging: Do not search through archived photos or exes' social media feeds when boredom strikes.",
        "Differentiate curiosity from reality: Remind yourself that past flings ended for a reason; they chose you today.",
        "Strengthen novel couple experiences: Build new 'firsts' (trips, hobbies, rituals) that belong exclusively to the two of you.",
        "Use Nuju reflections: Journal any lingering comparison thoughts to identify underlying vulnerabilities.",
      ],
      id: [
        "Tahan godaan 'stalking': Jangan pernah membuka arsip foto lama atau akun mantan saat pikiranmu sedang kosong.",
        "Pisahkan fantasi dari realita: Ingatkan dirimu bahwa masa lalu itu berakhir karena suatu alasan, dan kini ia memilihmu.",
        "Ciptakan 'pengalaman pertama' baru: Bangun kegiatan seru dan tempat liburan baru yang menjadi milik kalian berdua.",
        "Gunakan refleksi Nuju: Tuliskan rasa penasaranmu di jurnal Nuju untuk membedah akar keraguan batinmu.",
      ],
      de: [
        "Digitales Stalking stoppen: Widerstehen Sie dem Impuls, alte Fotos oder Profile ehemaliger Partner zu durchsuchen.",
        "Neugier von Realität trennen: Erinnern Sie sich daran, dass frühere Beziehungen scheiterten—heute liebt er/sie Sie.",
        "Neue gemeinsame Premieren schaffen: Erleben Sie Premieren (Reisen, Hobbys), die nur Ihnen beiden gehören.",
        "Reflexion in Nuju: Halten Sie aufkeimende Vergleiche fest, um das zugrunde liegende Sicherheitsbedürfnis zu verstehen.",
      ],
      fr: [
        "Bannir l'espionnage numérique : Résistez fermement à l'envie de fouiller d'anciennes photos ou réseaux sociaux.",
        "Distinguer curiosité et réalité : Rappelez-vous que ces relations sont mortes et que votre partenaire vous choisit.",
        "Créer de nouvelles premières fois : Inventez des rituels, voyages et projets exclusifs à votre couple.",
        "Journal intime dans Nuju : Déposez vos pensées de comparaison par écrit pour désamorcer l'angoisse naissante.",
      ],
      es: [
        "Frenar el espionaje digital: Evita registrar publicaciones antiguas o perfiles de exes en momentos de aburrimiento.",
        "Diferenciar curiosidad de hechos: Recuerda que sus relaciones pasadas terminaron y hoy su elección eres tú.",
        "Crear 'primeras veces' compartidas: Desarrolla viajes, pasatiempos y rituales inéditos que pertenezcan solo a ambos.",
        "Reflexión en Nuju: Escribe tus dudas en el diario emocional de Nuju para identificar qué herida se está activando.",
      ],
    },
  },

  // Level 3: 14 - 21
  {
    level: "moderate_retrospective_fixation",
    scoreRange: [14, 21],
    title: {
      en: "Moderate Retrospective Fixation & Compulsive Questioning",
      id: "Fiksasi Masa Lalu Sedang & Dorongan Bertanya Kompulsif",
      de: "Moderate Vergangenheitsfixierung & Zwanghaftes Hinterfragen",
      fr: "Fixation Rétrospective Modérée & Questionnement Compulsif",
      es: "Fijación Retrospectiva Moderada y Cuestionamiento Compulsivo",
    },
    badge: {
      en: "Retroactive Fixation",
      id: "Fiksasi Cemburu Masa Lalu",
      de: "Retroaktive Fixierung",
      fr: "Fixation Rétroactive",
      es: "Fijación Retrospectiva",
    },
    summary: {
      en: "Your mind frequently replays intrusive thoughts about your partner's romantic and physical past. You catch yourself interrogating them for details, seeking reassurance, and feeling an irrational sense of betrayal over events that occurred before you met.",
      id: "Pikiranmu kerap memutar bayangan menyiksa tentang kisah romantis dan fisik masa lalu pasangan. Kamu sering mencecarnya dengan pertanyaan detail, menuntut validasi, dan merasa 'dikhianati' oleh peristiwa yang terjadi jauh sebelum kalian kenal.",
      de: "Ihr Verstand kreist regelmäßig um die körperliche oder romantische Historie Ihres Partners. Sie ertappen sich beim Verhören, suchen ständige Bestätigung und fühlen einen irrationalen Schmerz über längst vergangene Ereignisse.",
      fr: "Votre esprit rejoue régulièrement des pensées intrusives sur le passé amoureux de votre partenaire. Vous vous surprenez à l'interroger sur des détails intimes et ressentez une blessure paradoxale face à son passé.",
      es: "Tu mente revive con frecuencia escenas intrusivas sobre el pasado íntimo de tu pareja. Te sorprendes interrogándole, buscando confirmación constante y sintiendo dolor por sucesos ocurridos antes de coincidir.",
    },
    psychology: {
      en: "Cognitive-Behavioral Therapy (CBT) identifies this stage as the initiation of the 'Reassurance Addiction Trap'. Asking questions provides 5 minutes of relief followed by hours of newly imagined doubts that demand even more questions.",
      id: "Terapi Perilaku Kognitif (CBT) menyebut tahap ini sebagai 'Jebakan Kecanduan Validasi'. Menginterogasi pasangan hanya memberi kelegaan 5 menit, disusul gelombang keraguan baru yang menuntut interogasi lebih dalam lagi.",
      de: "Die Kognitive Verhaltenstherapie beschreibt dies als 'Beruhigungs-Spirale': Das Ausfragen des Partners bringt 5 Minuten Erleichterung, erzeugt danach aber neue bohrende Fragen und tiefere Zweifel.",
      fr: "La thérapie cognitive identifie ici le piège de l'addiction à la réassurance : obtenir un détail apaise l'angoisse pendant 5 minutes, mais alimente le terreau de nouvelles ruminations encore plus précises.",
      es: "La Terapia Cognitivo-Conductual describe esto como la trampa de la búsqueda de consuelo: interrogar alivia la ansiedad durante minutos, pero fertiliza la mente para nuevas dudas y exigencias.",
    },
    actionProtocol: {
      en: [
        "Enact a 48-Hour Reassurance Freeze: When an urge strikes to ask your partner about their past, pause and write it down instead.",
        "Recognize thought-action fusion: Having a mental image of their past does not mean you are in danger or being lied to.",
        "Cease retroactive interrogation: Explicitly tell your partner: 'I am working on my RJ triggers; please gently decline when I ask about your past.'",
        "Practice somatic grounding with Nuju: When mental movies spike, use 4-7-8 breathing to pull attention back into your physical body.",
      ],
      id: [
        "Terapkan 'Puasa Bertanya 48 Jam': Saat timbul dorongan mencecar pasangan tentang masa lalunya, tahan diri dan tuliskan pertanyaannya di buku catatan.",
        "Kendalikan fusi pikiran: Munculnya bayangan masa lalu di kepalamu bukan berarti hubunganmu dalam bahaya atau pasanganmu membohongimu.",
        "Hentikan interogasi bersama: Beri tahu pasangan: 'Aku sedang mengatasi cemburu masa lalu; tolong tolak secara lembut bila aku mulai bertanya masa lalu.'",
        "Latihan grounding somatik Nuju: Saat film mental memuncak, gunakan latihan napas 4-7-8 di Nuju untuk menarik kesadaran kembali ke tubuh.",
      ],
      de: [
        "48-Stunden-Fragestopp einführen: Wenn der Drang aufkommt, den Partner zu befragen, schreiben Sie die Frage auf, statt sie auszusprechen.",
        "Gedanken-Fusions-Falle erkennen: Nur weil ein Bild im Kopf auftaucht, bedeutet das keine reale Bedrohung für Ihre Beziehung.",
        "Verhör-Abkommen vereinbaren: Bitten Sie Ihren Partner: 'Hilf mir—antworte nicht, wenn ich anfange, in deiner Vergangenheit zu bohren.'",
        "Somatisches Grounding in Nuju: Nutzen Sie die 4-7-8 Atemübungen in Nuju, um aus dem Kopfkino in den physischen Körper zurückzufinden.",
      ],
      fr: [
        "Moratoire de 48h sur les questions : Quand l'envie de questionner survient, notez la pensée sur un carnet sans la poser.",
        "Défaire la fusion cognitive : Une image mentale intrusive n'est qu'un signal nerveux d'anxiété, pas une trahison réelle.",
        "Pacte de désamorçage : Demandez à votre partenaire de refuser gentiment de répondre à toute question sur ses ex.",
        "Ancrage corporel dans Nuju : Pratiquez la respiration 4-7-8 dans Nuju pour sortir du cinéma mental toxique.",
      ],
      es: [
        "Congelador de preguntas de 48h: Cuando sientas el impulso de interrogar a tu pareja, anota la duda y no la formules en voz alta.",
        "Desarmar la fusión cognitiva: Que un recuerdo ajeno te asalte no significa que tu relación corra peligro o sea ficticia.",
        "Pacto de no interrogatorio: Pide a tu pareja: 'Por favor, no respondas a mis preguntas sobre tu pasado cuando me gane la ansiedad.'",
        "Enraizamiento corporal con Nuju: Realiza respiraciones guiadas 4-7-8 en Nuju para devolver tu energía al cuerpo presente.",
      ],
    },
  },

  // Level 4: 22 - 29
  {
    level: "severe_retroactive_ocd_loop",
    scoreRange: [22, 29],
    title: {
      en: "Severe Retroactive OCD Loop & Mental Contamination",
      id: "Lingkaran Obsesif Cemburu Berat & Kontaminasi Mental",
      de: "Schwere retroaktive Zwangsschleife & Mentale Kontamination",
      fr: "Boucle Obsessionnelle Rétroactive Sévère & Contamination Mentale",
      es: "Bucle Obsesivo Retroactivo Severo y Contaminación Mental",
    },
    badge: {
      en: "Retroactive OCD Loop",
      id: "Lingkaran Cemburu Obsesif Berat",
      de: "Schwere Zwangsschleife",
      fr: "TOC Rétroactif Sévère",
      es: "Bucle Obsesivo Severo",
    },
    summary: {
      en: "You are caught in a relentless cycle of Retroactive OCD (RJ-OCD). Graphic mental movies, compulsive timelines reconstruction, and intense disgust or panic undermine your relationship. You know logically that the past cannot be rewritten, yet the obsession feels urgent and unbearable.",
      id: "Kamu terjebak dalam lingkaran Retroactive OCD (RJ-OCD) yang menyiksa. Film mini di kepala, pencarian kronologi detail, serta rasa jijik atau panik yang tak masuk akal terus merongrong hubunganmu. Logikamu sadar masa lalu tak bisa diubah, namun emosimu merasa tersiksa tanpa henti.",
      de: "Sie befinden sich in einer quälenden Zwangsschleife retroaktiver Eifersucht (RJ-OCD). Bildhafte Zwangsvorstellungen, das Nachstellen alter Zeitleisten und quälende Ekelgefühle belasten Ihre Beziehung aufs Äußerste.",
      fr: "Vous êtes enfermé(e) dans un engrenage de TOC du couple orienté sur le passé (RJ-OCD). Scènes visuelles parasites, reconstruction de chronologies et dégoût irrationnel minent profondément votre histoire d'amour.",
      es: "Te encuentras atrapado en un bucle severo de celos retrospectivos obsesivos (RJ-OCD). Películas mentales explícitas, reconstrucción de cronologías y repulsión irracional amenazan seriamente tu relación.",
    },
    psychology: {
      en: "Robert Leahy and OCD researchers classify severe RJ as pure-O OCD: the obsession is the partner's historical intimacy; the compulsions are mental reviewing, detective interrogation, and moral testing. The brain treats a phantom timeline as an existential survival threat.",
      id: "Robert Leahy dan pakar OCD mengklasifikasikan RJ berat sebagai bentuk Obsessive-Compulsive Disorder: obsesinya adalah masa lalu pasangan; kompulsinya adalah peninjauan kronologi di kepala, interogasi detektif, dan pengujian moral. Otak memperlakukan masa lalu seperti ancaman keselamatan fisik.",
      de: "Psychologen werten schwere RJ als Unterform der Zwangsstörung (ROCD): Die Zwangsvorstellung ist die Sexualgeschichte; die Zwangshandlungen sind Recherchen, Verhöre und mentale Endlosschleifen.",
      fr: "Les cliniciens considèrent cette phase comme une variante de TOC obsessionnel : le cerveau réagit au passé révolu comme à une menace vitale immédiate, exigeant des rituels de vérification destructeurs.",
      es: "Especialistas en TOC clasifican los celos retrospectivos severos como un trastorno obsesivo: la mente percibe la historia previa de la pareja como una amenaza biológica inminente y despliega compulsions destructivas.",
    },
    actionProtocol: {
      en: [
        "Begin Exposure and Response Prevention (ERP): Allow intrusive mental images to exist without interrogating, checking, or analyzing them.",
        "Total digital embargo: Block access to exes' social media accounts; delete archived photos and detective screenshots.",
        "Separate moral worth from sexual history: Challenge perfectionistic beliefs that human value requires a blank romantic slate.",
        "Consult an OCD/CBT therapist: Engage a licensed clinician skilled in relationship OCD (ROCD) and ERP protocols.",
        "Deploy Nuju daily emergency reframing: Use guided thought-defusion scripts in Nuju to separate identity from anxious noise.",
      ],
      id: [
        "Mulai Exposure & Response Prevention (ERP): Biarkan bayangan pikiran lewat tanpa berusaha mencari tahu, menginterogasi, atau menetralkannya.",
        "Embargo digital total: Blokir dan hapus akun mantan pasangan, hapus tangkapan layar, dan buang foto arsip lama.",
        "Pisahkan nilai moral dari riwayat seksual: Runtuhkan keyakinan keliru bahwa manusia berharga hanya jika memiliki masa lalu yang 'bersih tanpa cela'.",
        "Konsultasikan ke psikolog/terapis spesialis OCD/CBT: Dapatkan pendampingan profesional untuk protokol ROCD dan ERP.",
        "Terapkan reframing darurat Nuju: Gunakan skrip defusi kognitif harian di Nuju untuk memutus rantai kepanikan obsesif.",
      ],
      de: [
        "Exposition und Reaktionsverhinderung (ERP) beginnen: Halten Sie aufsteigende Bilder aus, ohne danach zu forschen oder den Partner zu befragen.",
        "Digitales Totalembargo: Löschen Sie alle Screenshots, blockieren Sie Profile von Ex-Partnern und beenden Sie jede Recherche.",
        "Moralische Perfektion entlarven: Lösen Sie sich von der fatalen Idee, dass menschlicher Wert eine unberührte Vergangenheit voraussetzt.",
        "Psychotherapie für Beziehungs-OCD aufsuchen: Ziehen Sie einen verhaltenstherapeutischen Therapeuten mit Schwerpunkt ERP hinzu.",
        "Nuju Notfall-Reframing: Nutzen Sie tägliche Kognitions-Entkopplungs-Skripte in Nuju, um Ihre Gedanken von Ihrer wahren Identität zu trennen.",
      ],
      fr: [
        "Engager l'Exposition avec Prévention de la Réponse (EPR) : Accueillez la pensée parasite sans poser de question ni enquêter.",
        "Embargo numérique strict : Supprimez captures d'écran, bloquez les profils des ex et interdisez-vous toute vérification.",
        "Déconstruire le mythe de la pureté : Rappelez-vous que la valeur humaine et l'amour véritable ne dépendent pas d'un passé immaculé.",
        "Consulter un spécialiste TCC/TOC : Entamez un suivi avec un professionnel formé aux protocoles du TOC relationnel.",
        "Exercices de défusion dans Nuju : Utilisez les scripts guidés de Nuju pour vous détacher de la tempête émotionnelle.",
      ],
      es: [
        "Iniciar Exposición con Prevención de Respuesta (EPR): Deja que la imagen intrusiva pase sin ejecutar preguntas ni chequeos.",
        "Bloqueo digital absoluto: Elimina capturas de pantalla, bloquea a las exparejas y desinstala aplicaciones tentadoras.",
        "Desarmar la falacia de la pureza: Cuestiona la creencia irracional de que el valor afectivo requiere un pasado en blanco.",
        "Terapia especializada en TOC/CBT: Acude a un profesional de la salud mental especializado en TOC relacional y EPR.",
        "Protocolo de defusión en Nuju: Aplica diariamente las reflexiones guiadas de Nuju para desidentificarte del bucle obsesivo.",
      ],
    },
  },

  // Level 5: 30 - 36
  {
    level: "acute_retroactive_paralysis",
    scoreRange: [30, 36],
    title: {
      en: "Acute Retroactive Jealousy Paralysis & Relationship Crisis",
      id: "Krisis Paralisis Cemburu Retrospektif Akut & Sabotase Hubungan",
      de: "Akute retroaktive Eifersuchts-Paralyse & Beziehungskrise",
      fr: "Paralysie Aiguë de Jalousie Rétrospective & Crise Relationnelle",
      es: "Parálisis Aguda por Celos Retrospectivos y Crisis Vincular",
    },
    badge: {
      en: "Acute RJ Crisis",
      id: "Krisis Paralisis Cemburu Akut",
      de: "Akute Eifersuchts-Paralyse",
      fr: "Crise Aiguë de Jalousie Rétrospective",
      es: "Crisis Aguda por Celos Retrospectivos",
    },
    summary: {
      en: "You are enduring debilitating psychological agony caused by your partner's past. Intrusive mental cinematography, rage, visceral disgust, and compulsive questioning dominate your consciousness, pushing an otherwise loving relationship to the brink of collapse.",
      id: "Kamu berada dalam penderitaan psikologis yang melumpuhkan akibat masa lalu pasangan. Film visual traumatis, kemarahan membara, rasa jijik visceral, dan interogasi tanpa henti menguasai hidupmu, mendorong hubungan yang indah ke tepi jurang perpisahan.",
      de: "Sie leiden unter einer lähmenden emotionalen Zerreißprobe. Quälende Bilder, Wutausbrüche, körperlicher Ekel und endlose Verhöre beherrschen Ihr gesamtes Denken und bedrohen Ihre Liebe existenziell.",
      fr: "Vous traversez une souffrance psychologique extrême. Flashs visuels obsédants, dégoût viscéral, accès de colère et interrogatoires constants dévastent votre équilibre et mettent votre couple en péril imminent.",
      es: "Experimentas un sufrimiento psíquico demoledor originado en el pasado de tu pareja. Imágenes explícitas intrusivas, furia, asco visceral e interrogatorios incesantes tienen a tu relación al borde del colapso.",
    },
    psychology: {
      en: "At this acute stage, chronic retroactive jealousy causes profound neurobiological stress, insomnia, somatic depression, and emotional dissociation. The sufferer projects deep-seated core wounds—shame, abandonment fears, and low self-worth—onto an untouchable, phantom past.",
      id: "Pada tahap krisis ini, cemburu masa lalu kronis memicu stres neurobiologis hebat, insomnia, depresi somatik, dan disosiasi emosi. Penderita memproyeksikan luka batin terdalam—rasa malu, ketakutan ditinggalkan, dan perasaan tak berharga—ke masa lalu yang tak mungkin bisa diubah.",
      de: "In dieser Phase führt der chronische Stress zu Schlaflosigkeit, depressiven Episoden und Entfremdung. Tiefe innere Verwundungen (Scham, Verlustangst, mangelnder Selbstwert) werden auf die unveränderbare Vergangenheit projiziert.",
      fr: "Cette phase aiguë entraîne un épuisement neurobiologique majeur, des insomnies et des épisodes dépressifs. Les blessures fondamentales (honte, rejet, sentiment d'indignité) sont inconsciemment projetées sur le passé révolu.",
      es: "En esta etapa aguda, la tensión neurobiológica crónica desata insomnio, depresión y disociación. Heridas nucleares del yo (vergüenza tóxica, miedo al abandono y desvalorización) se proyectan en fantasmas del pasado.",
    },
    actionProtocol: {
      en: [
        "Immediate emergency ceasefire: Establish an unconditional ban on questioning your partner about their past for 30 days.",
        "Engage specialized psychiatric & psychological care: Seek an evidence-based psychiatrist or psychologist specialized in OCD and ERP.",
        "Prevent destructive breakups: Commit to postponing any relationship termination decision until your nervous system has regulated.",
        "Heal the core wound of inadequacy: Direct therapeutic attention away from the partner's past and onto your own self-worth.",
        "Crisis journaling in Nuju: Anchor daily grounding routines in Nuju to prevent panic-driven verbal attacks or late-night interrogations.",
      ],
      id: [
        "Gencatan senjata darurat: Tetapkan kesepakatan mutlak untuk tidak mengajukan satu pertanyaan pun tentang masa lalu selama 30 hari ke depan.",
        "Cari bantuan psikiater & psikolog klinis segera: Dapatkan evaluasi medis untuk meredakan neurobiologi obsesif dan jalani terapi ERP terstruktur.",
        "Tunda keputusan putus hubungan: Buat komitmen untuk tidak mengambil keputusan mengakhiri hubungan saat sistem sarafmu sedang panik dan lumpuh.",
        "Sembuhkan luka harga diri: Alihkan fokus dari masa lalu pasangan ke penyembuhan rasa rendah diri dan luka pengabaian dalam dirimu sendiri.",
        "Jurnal krisis Nuju: Gunakan latihan regulasi emosi harian di Nuju untuk mencegah amukan verbal atau interogasi tengah malam.",
      ],
      de: [
        "Sofortiger Waffenstillstand: Vereinbaren Sie eine 30-tägige absolute Fragesperre über die Vergangenheit Ihres Partners.",
        "Professionelle psychologische Krisenintervention: Suchen Sie sofortige Hilfe bei einem Psychiater oder Psychotherapeuten für Zwangsstörungen.",
        "Trennungsmoratorium: Treffen Sie keine endgültigen Beziehungsentscheidungen, solange Ihr Nervensystem im Notfallmodus gefangen ist.",
        "Die eigene Kernwunde heilen: Richten Sie den Fokus weg von der Biografie des Partners hin zum Wiederaufbau des eigenen Selbstwertgefühls.",
        "Nuju Krisenbegleitung: Nutzen Sie die Nuju Beruhigungsprotokolle, um nächtliche Eskalationen und Panikattacken abzufedern.",
      ],
      fr: [
        "Cessez-le-feu immédiat : Instaurez un moratoire absolu de 30 jours sans aucune mention ni question sur le passé.",
        "Prise en charge psychiatrique et psychologique : Consultez d'urgence un spécialiste des TOC pour réguler la détresse neurobiologique.",
        "Moratoire sur la rupture : Engagez-vous à ne prendre aucune décision de séparation tant que votre système nerveux est en crise aiguë.",
        "Guérir la blessure d'indignité : Détournez l'attention du passé de l'autre pour soigner votre propre sentiment d'insécurité et d'estime.",
        "Journal de crise Nuju : Pratiquez les exercices de retour au calme de Nuju pour éviter les interrogatoires destructeurs au milieu de la nuit.",
      ],
      es: [
        "Alto al fuego inmediato: Establece una prohibición total de 30 días sin formular una sola pregunta sobre el pasado.",
        "Atención psicológica y psiquiátrica urgente: Consulta de inmediato a un especialista en TOC relacional y regulación neurobiológica.",
        "Pausar decisiones de ruptura: Comprométete a no romper la relación mientras tu sistema nervioso se encuentre en estado de alerta máxima.",
        "Sanar la herida nuclear de insuficiencia: Desvía el foco del pasado de tu pareja hacia la restauración de tu propia valía y seguridad.",
        "Acompañamiento en crisis con Nuju: Emplea los protocolos de calma en Nuju para frenar los ataques verbales nocturnos e interrogatorios.",
      ],
    },
  },
];

export const RETROSPECTIVE_JEALOUSY_SUBSCALE_INFO = {
  intrusive_mental_movies: {
    name: {
      en: "Intrusive Mental Movies & Imagery",
      id: "Film Mini & Bayangan Visual Intrusif",
      de: "Aufdringliches Kopfkino & Mentale Filme",
      fr: "Mini-Films Mentaux & Images Parasites",
      es: "Mini Películas e Imágenes Mentales Intrusivas",
    },
    description: {
      en: "Involuntary, vivid mental scenes of partner's past intimacy, triggered by everyday songs, places, or sudden anxious associations.",
      id: "Adegan mental visual yang tak terkendali mengenai keintiman masa lalu pasangan, dipicu lagu, lokasi, atau asosiasi cemas tiba-tiba.",
      de: "Unwillkürliche visuelle Zwangsvorstellungen über frühere Intimitäten, getriggert durch alltägliche Orte, Lieder oder Gedanken.",
      fr: "Scènes mentales involontaires et précises de l'intimité passée, déclenchées par des détails anodins du quotidien.",
      es: "Escenas visuales involuntarias de la intimidad pasada de la pareja, disparadas por canciones, lugares o asociaciones ansiosas.",
    },
  },
  compulsive_investigative_checking: {
    name: {
      en: "Compulsive Investigative Checking & Reassurance Seeking",
      id: "Interogasi Menyelidik & Berburu Validasi Kompulsif",
      de: "Zwanghaftes Nachforschen & Beruhigungssuche",
      fr: "Enquêtes Compulsives & Recherche de Réassurance",
      es: "Investigación Compulsiva y Búsqueda de Certeza",
    },
    description: {
      en: "Repetitive forensic questioning of partner's past, social media stalking of exes, and reconstructing timelines to spot inconsistencies.",
      id: "Interogasi forensik berulang tentang masa lalu pasangan, stalking media sosial mantan, dan menganalisis linimasa tanggal.",
      de: "Wiederholtes Verhören des Partners, Durchforsten alter Profile von Ex-Partnern und Rekonstruieren vergangener Chronologien.",
      fr: "Interrogatoires répétés sur le passé amoureux, traque des ex sur les réseaux sociaux et vérification maniaque des dates.",
      es: "Interrogatorios detallados y constantes a la pareja, rastreo en redes sociales de sus exparejas y cotejo obsesivo de fechas.",
    },
  },
  moral_contamination_fear: {
    name: {
      en: "Moral Contamination Fear & Retroactive Sabotage",
      id: "Ketakutan Kontaminasi Moral & Sabotase Hubungan",
      de: "Gefühl moralischer Befleckung & Beziehungssabotage",
      fr: "Peur de Contamination Morale & Sabotage",
      es: "Miedo a la Contaminación Moral y Sabotaje Afectivo",
    },
    description: {
      en: "Irrational feelings that partner is tainted or inferior, harsh moral judgments about their past, and fear that earlier loves were superior.",
      id: "Perasaan irasional bahwa pasangan 'ternoda' atau kurang murni, menghakimi masa lalunya dengan keras, dan takut cinta masa lalunya lebih hebat.",
      de: "Gefühl, der Partner sei durch frühere Partner 'befleckt', gepaart mit moralischem Urteil und der Furcht vor verflossenen Romanzen.",
      fr: "Sensation irrationnelle que le partenaire est 'souillé', jugements moraux intraitables et terreur que l'ex ait été mieux aimé(e).",
      es: "Sensación de que la pareja está 'manchada' o es menos digna, juicios morales implacables y temor a que su ex haya sido superior.",
    },
  },
};

export function getRetrospectiveJealousyResult(
  totalScore: number
): RetrospectiveJealousyResultLevel {
  const clamped = Math.max(0, Math.min(36, totalScore));
  return (
    RETROSPECTIVE_JEALOUSY_RESULTS.find(
      (r) => clamped >= r.scoreRange[0] && clamped <= r.scoreRange[1]
    ) || RETROSPECTIVE_JEALOUSY_RESULTS[0]
  );
}

export function calculateRetrospectiveJealousySubscales(
  answers: Record<number, number>
): {
  intrusive_mental_movies: number;
  compulsive_investigative_checking: number;
  moral_contamination_fear: number;
} {
  let imm = 0;
  let cic = 0;
  let mcf = 0;

  RETROSPECTIVE_JEALOUSY_QUESTIONS.forEach((q) => {
    const score = answers[q.id] ?? 0;
    if (q.subscale === "intrusive_mental_movies") imm += score;
    if (q.subscale === "compulsive_investigative_checking") cic += score;
    if (q.subscale === "moral_contamination_fear") mcf += score;
  });

  return {
    intrusive_mental_movies: imm,
    compulsive_investigative_checking: cic,
    moral_contamination_fear: mcf,
  };
}
