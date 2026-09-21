export type EmetophobiaCardLang = "en" | "id" | "de" | "fr" | "es";

export interface EmetophobiaQuestion {
  id: number;
  subscale:
    | "visceral_hypervigilance_nausea_panic"
    | "contamination_safety_checking_rituals"
    | "interpersonal_travel_avoidance_control";
  text: Record<EmetophobiaCardLang, string>;
}

export interface EmetophobiaResultLevel {
  level:
    | "resilient_gastric_regulation"
    | "mild_visceral_discomfort_sensitivity"
    | "moderate_emetophobic_avoidance"
    | "high_clinical_emetophobia_spov"
    | "severe_incapacitating_emetophobia_panic";
  scoreRange: [number, number];
  title: Record<EmetophobiaCardLang, string>;
  badge: Record<EmetophobiaCardLang, string>;
  summary: Record<EmetophobiaCardLang, string>;
  psychology: Record<EmetophobiaCardLang, string>;
  actionProtocol: Record<EmetophobiaCardLang, string[]>;
}

export const EMETOPHOBIA_QUESTIONS: EmetophobiaQuestion[] = [
  // 1. Visceral Hypervigilance & Nausea Panic
  {
    id: 1,
    subscale: "visceral_hypervigilance_nausea_panic",
    text: {
      en: "You constantly scan your stomach, throat, and saliva, interpreting normal digestive sensations, mild gurgling, or acid reflux as an imminent sign of vomiting.",
      id: "Kamu terus-menerus memantau sensasi di perut, tenggorokan, dan air liur, menganggap bunyi lambung normal atau asam lambung ringan sebagai tanda pasti akan muntah.",
      de: "Sie scannen ständig Magen, Hals und Speichelfluss und interpretieren normale Verdauungsgeräusche oder leichtes Sodbrennen als drohendes Erbrechen.",
      fr: "Vous surveillez constamment votre estomac, votre gorge et votre salive, interprétant le moindre gargouillement ou reflux comme le signe imminent d'un vomissement.",
      es: "Monitorizas de continuo tu estómago, garganta y saliva, interpretando ruidos digestivos normales o acidez leve como señal inequívoca de que vas a vomitar.",
    },
  },
  // 2. Contamination & Safety Checking Rituals
  {
    id: 2,
    subscale: "contamination_safety_checking_rituals",
    text: {
      en: "You obsessively inspect food expiration dates, smell ingredients multiple times, or refuse to eat leftovers, meat, seafood, or buffet foods out of terror of food poisoning.",
      id: "Kamu memeriksa tanggal kedaluwarsa makanan secara obsesif, mencium bau makanan berulang kali, atau menolak makan makanan sisa/seafood karena ketakutan ekstrem keracunan makanan.",
      de: "Sie prüfen Haltbarkeitsdaten zwanghaft mehrfach, riechen misstrauisch an Speisen und meiden Reste, Fleisch oder Buffets aus panischer Angst vor einer Lebensmittelvergiftung.",
      fr: "Vous inspectez obsessionnellement les dates de péremption, reniflez vos plats à répétition et refusez les restes ou les buffets par terreur d'une intoxication alimentaire.",
      es: "Inspeccionas de forma obsesiva las fechas de caducidad, hueles la comida repetidamente y evitas sobras, mariscos o bufés por pánico a una intoxicación.",
    },
  },
  // 3. Interpersonal & Travel Avoidance Control
  {
    id: 3,
    subscale: "interpersonal_travel_avoidance_control",
    text: {
      en: "You avoid airplanes, long car rides, rollercoasters, boats, or public transit unless you have immediate, unobstructed access to an exit, bathroom, or motion sickness medication.",
      id: "Kamu menghindari naik pesawat, perjalanan mobil jauh, kapal laut, atau transportasi umum kecuali kamu punya akses langsung ke pintu keluar, toilet, atau obat antimual.",
      de: "Sie meiden Flugzeuge, lange Autofahrten, Boote oder öffentliche Verkehrsmittel, außer Sie haben direkten Zugang zu Notausgängen, Toiletten oder Reisetabletten.",
      fr: "Vous évitez les avions, longs trajets en voiture, bateaux ou transports en commun sauf si vous avez un accès direct garanti aux toilettes ou à des antiémétiques.",
      es: "Evitas aviones, trayectos largos en coche, barcos o transporte público salvo que tengas acceso inmediato a salidas, baños o medicación contra el mareo.",
    },
  },
  // 4. Visceral Hypervigilance & Nausea Panic
  {
    id: 4,
    subscale: "visceral_hypervigilance_nausea_panic",
    text: {
      en: "The mere sensation of nausea triggers a full-blown panic attack: heart racing, trembling, cold sweats, and a catastrophic conviction of losing total bodily control.",
      id: "Sensasi mual sedikit saja langsung memicu serangan panik hebat: jantung berdegup kencang, gemetar, keringat dingin, dan ketakutan kehilangan kendali tubuh seutuhnya.",
      de: "Schon das leiseste Gefühl von Übelkeit löst eine schwere Panikattacke aus: Herzrasen, Zittern, kalter Schweiß und die Angst vor vollständigem Kontrollverlust.",
      fr: "La simple sensation d'écœurement déclenche une attaque de panique totale : tachycardie, tremblements, sueurs froides et sentiment de perte de contrôle absolue.",
      es: "La menor sensación de náusea desata un ataque de pánico brutal: taquicardia, temblores, sudor frío y la convicción de perder el control de tu cuerpo.",
    },
  },
  // 5. Contamination & Safety Checking Rituals
  {
    id: 5,
    subscale: "contamination_safety_checking_rituals",
    text: {
      en: "You wash or sanitize your hands excessively after touching door handles, shopping carts, or banisters to eliminate norovirus or stomach flu pathogens.",
      id: "Kamu mencuci atau menyemprotkan hand sanitizer ke tangan secara berlebihan setelah menyentuh gagang pintu atau fasilitas umum demi membasmi virus flu perut/norovirus.",
      de: "Sie waschen oder desinfizieren sich extrem häufig die Hände nach Berührung von Türklinken oder Einkaufswagen, um Noroviren oder Magen-Darm-Keime abzutöten.",
      fr: "Vous vous lavez ou désinfectez les mains de manière compulsive après avoir touché des poignées de porte ou des caddies pour éliminer les gastro-entérites.",
      es: "Te lavas o desinfectas las manos de forma compulsiva tras tocar pomos de puertas o carritos por miedo atroz a contraer gastroenteritis o norovirus.",
    },
  },
  // 6. Interpersonal & Travel Avoidance Control
  {
    id: 6,
    subscale: "interpersonal_travel_avoidance_control",
    text: {
      en: "If someone near you coughs, mentions feeling unwell, or appears pale, you immediately flee the room or feel intense anxiety that lasts for hours.",
      id: "Jika seseorang di dekatmu batuk, mengeluh sakit perut, atau tampak pucat, kamu langsung kabur dari ruangan atau merasakan kecemasan hebat selama berjam-jam.",
      de: "Wenn jemand in Ihrer Nähe hustet, Unwohlsein erwähnt oder blass wirkt, verlassen Sie sofort fluchtartig den Raum und bleiben stundenlang hochgradig alarmiert.",
      fr: "Si une personne proche de vous tousse, dit avoir mal au ventre ou pâlit, vous fuyez immédiatement la pièce avec une angoisse qui persiste des heures.",
      es: "Si alguien tose cerca, menciona malestar o parece pálido, huyes de la habitación al instante y te quedas con una ansiedad desgarradora durante horas.",
    },
  },
  // 7. Visceral Hypervigilance & Nausea Panic
  {
    id: 7,
    subscale: "visceral_hypervigilance_nausea_panic",
    text: {
      en: "To you, vomiting feels worse than death itself; you would endure extreme physical pain, injury, or hardship just to prevent throwing up.",
      id: "Bagimu, muntah terasa lebih mengerikan daripada kematian; kamu rela menahan rasa sakit fisik hebat atau penderitaan lain asalkan tidak sampai muntah.",
      de: "Erbrechen erscheint Ihnen schlimmer als der Tod selbst; Sie würden extreme körperliche Schmerzen ertragen, nur um sich niemals übergeben zu müssen.",
      fr: "Pour vous, vomir est pire que la mort ; vous seriez prêt(e) à endurer des douleurs physiques intenses pourvu que vous ne vomissiez jamais.",
      es: "Para ti, vomitar es peor que la propia muerte; preferirías soportar un dolor físico agudo antes que experimentar el vómito.",
    },
  },
  // 8. Contamination & Safety Checking Rituals
  {
    id: 8,
    subscale: "contamination_safety_checking_rituals",
    text: {
      en: "You carry a 'safety kit' everywhere you go (anti-nausea mints, ginger candies, plastic bags, motion-sickness pills, water bottles, hand sanitizer).",
      id: "Kamu membawa 'alat penyelamat' ke mana pun pergi (permen jahe, obat antimual, kantong plastik, botol air, pembersih tangan) agar merasa aman.",
      de: "Sie tragen überall ein 'Sicherheitsset' bei sich (Magenpastillen, Ingwer, Tüten, Reisemedikamente, Desinfektionsmittel, Wasserflaschen).",
      fr: "Vous transportez toujours une 'trousse de sécurité' (pastilles de menthe, gingembre, sacs plastiques, anti-nauséeux, gel hydroalcoolique).",
      es: "Llevas siempre un 'kit de seguridad' (caramelos de jengibre, bolsas de plástico, antieméticos, desinfectante, agua) por miedo a vomitar fuera de casa.",
    },
  },
  // 9. Interpersonal & Travel Avoidance Control
  {
    id: 9,
    subscale: "interpersonal_travel_avoidance_control",
    text: {
      en: "You avoid alcohol, parties, clubs, hospitals, daycare centers, or being around young children because they are statistically unpredictable sources of vomiting.",
      id: "Kamu menghindari alkohol, pesta malam, rumah sakit, tempat penitipan anak, atau berada di dekat anak kecil karena mereka berisiko tinggi muntah sewaktu-waktu.",
      de: "Sie meiden Alkohol, Partys, Kneipen, Krankenhäuser und Kleinkinder, da diese statistisch unberechenbare Quellen von Erbrechen darstellen.",
      fr: "Vous évitez l'alcool, les soirées festives, les hôpitaux et les enfants en bas âge car leur risque de vomissement est totalement imprévisible.",
      es: "Evitas el alcohol, fiestas, discotecas, hospitales o niños pequeños porque representan detonantes impredecibles de vómito.",
    },
  },
  // 10. Visceral Hypervigilance & Nausea Panic
  {
    id: 10,
    subscale: "visceral_hypervigilance_nausea_panic",
    text: {
      en: "Seeing or hearing someone throw up—or even encountering simulated vomiting in movies, YouTube videos, or literature—triggers acute visceral panic or intrusive flashbacks.",
      id: "Melihat atau mendengar orang muntah—bahkan adegan muntah pura-pura di film, video YouTube, atau buku—memicu kepanikan fisik mendadak atau bayangan traumatis.",
      de: "Das Sehen oder Hören von Erbrechen – selbst in Filmen oder Büchern – löst sofort Panik, Herzrasen oder aufdringliche Flashbacks aus.",
      fr: "Voir ou entendre quelqu'un vomir – même une scène fictive dans un film ou une vidéo – déclenche une panique viscérale ou des flash-backs intrusifs.",
      es: "Ver u oír a alguien vomitar —incluso en películas, vídeos de internet o novelas— te provoca un pánico visceral fulminante o imágenes intrusivas.",
    },
  },
  // 11. Contamination & Safety Checking Rituals
  {
    id: 11,
    subscale: "contamination_safety_checking_rituals",
    text: {
      en: "You severely restrict your diet, eating only 'safe foods' (crackers, plain toast, dry cereal, water) when leaving the house or traveling, resulting in significant weight loss.",
      id: "Kamu sangat membatasi makanan dan hanya memakan 'makanan aman' (biskuit tawar, roti kering, air putih) saat harus bepergian, yang berakibat pada penurunan berat badan.",
      de: "Sie schränken Ihre Ernährung auf 'sichere Lebensmittel' (Zwieback, Toast, Wasser) ein, wenn Sie unterwegs sind, was zu Gewichtsverlust führt.",
      fr: "Vous restreignez drastiquement votre alimentation aux 'aliments sûrs' (biscottes, pain sec, eau) dès que vous sortez, entraînant une perte de poids.",
      es: "Restringes tu comida únicamente a 'alimentos seguros' (galletas de agua, pan tostado seco) cuando tienes que salir, causando pérdida de peso.",
    },
  },
  // 12. Interpersonal & Travel Avoidance Control
  {
    id: 12,
    subscale: "interpersonal_travel_avoidance_control",
    text: {
      en: "This fear has persisted for over 6 months and heavily constrains your relationships, career advancement, vacation planning, or decisions about pregnancy.",
      id: "Ketakutan ini telah berlangsung lebih dari 6 bulan dan membatasi hubungan sosialmu, karier, rencana liburan, atau bahkan pertimbangan untuk hamil (morning sickness).",
      de: "Diese Furcht besteht seit mehr als 6 Monaten und schränkt Partnerschaft, Karriere, Reiseplanung oder den Wunsch nach einer Schwangerschaft massiv ein.",
      fr: "Cette phobie dure depuis plus de 6 mois et entrave lourdement votre vie affective, professionnelle, vos vacances ou un projet de grossesse.",
      es: "Este miedo lleva más de 6 meses condicionando gravemente tu vida de pareja, tu trabajo, tus viajes o el deseo de tener hijos por temor al embarazo.",
    },
  },
];

export const EMETOPHOBIA_RESULT_LEVELS: EmetophobiaResultLevel[] = [
  {
    level: "resilient_gastric_regulation",
    scoreRange: [0, 7],
    title: {
      en: "Gastric Resilience & Normal Visceral Discomfort Acceptance",
      id: "Resiliensi Lambung & Toleransi Alami Ketidaknyamanan Fisik",
      de: "Gastrische Resilienz & normale viszerale Akzeptanz",
      fr: "Résilience gastrique & tolérance viscérale naturelle",
      es: "Resiliencia gástrica y aceptación del malestar corporal",
    },
    badge: {
      en: "ADAPTIVE INTEROCEPTIVE TOLERANCE",
      id: "TOLERANSI INTEROSEPTIF ADAPTIF",
      de: "GESUNDE INTEROZEPTIVE TOLERANZ",
      fr: "TOLÉRANCE VISCÉRALE SAINE",
      es: "TOLERANCIA INTEROCEPTIVA SANA",
    },
    summary: {
      en: "You have a realistic, healthy acceptance of gastrointestinal sensations. While nobody enjoys nausea or vomiting, you recognize it as an adaptive, protective bodily defense mechanism rather than a catastrophic existential crisis.",
      id: "Kamu memiliki pemahaman sehat dan realistis terhadap sensasi pencernaan. Meski mual itu tidak menyenangkan, kamu memahaminya sebagai mekanisme protektif alami tubuh, bukan ancaman kehancuran hidup.",
      de: "Sie besitzen eine gesunde Haltung gegenüber Magen-Darm-Empfindungen. Übelkeit ist zwar unangenehm, wird aber als normaler körpereigener Schutzreflex akzeptiert.",
      fr: "Vous appréhendez sereinement les sensations digestives. La nausée est certes désagréable, mais vous la considérez comme une banale réponse protectrice du corps.",
      es: "Mantienes una relación sana con las sensaciones digestivas. La náusea resulta desagradable pero la entiendes como una respuesta biológica protectora.",
    },
    psychology: {
      en: "Your insular cortex processes gastrointestinal afferent signals without catastrophic amygdalar alarm. Visceral sensations remain within normal autonomic setpoints without trigger-conditioned avoidance.",
      id: "Korteks insularmu memproses sinyal organ dalam tanpa memicu kepanikan di amigdala. Sensasi pencernaan diproses secara wajar tanpa memunculkan perilaku menghindar yang berlebihan.",
      de: "Ihr insulärer Kortex verarbeitet Magen-Darm-Signale ohne amygdaläre Panikreaktion. Körpersignale werden neutral interpretiert.",
      fr: "Votre cortex insulaire traite les signaux viscéraux sans affolement de l'amygdale. Le système nerveux ne bascule pas en mode panique.",
      es: "Tu corteza insular procesa las señales gástricas sin activar falsas alarmas en la amígdala. No hay hipervigilancia visceral disfuncional.",
    },
    actionProtocol: {
      en: [
        "Continue trusting your body's immune and digestive integrity.",
        "Practice mindful interoception without analyzing ordinary digestive sounds.",
        "Maintain flexible eating habits across diverse cuisines and social dining environments.",
      ],
      id: [
        "Pertahankan rasa percaya pada kekebalan tubuh dan fungsi pencernaanmu yang tangguh.",
        "Hindari menganalisis bunyi perut atau sensasi pencernaan normal secara berlebihan.",
        "Jaga kebiasaan makan yang fleksibel di berbagai acara kumpul dan restoran.",
      ],
      de: [
        "Vertrauen Sie weiterhin auf die natürliche Selbstregulation Ihres Verdauungssystems.",
        "Bewahren Sie eine entspannte Haltung bei Mahlzeiten im Restaurant und auf Reisen.",
        "Achten Sie auf flexible, unverkrampfte Ernährungsgewohnheiten.",
      ],
      fr: [
        "Conservez votre confiance dans les capacités d'auto-défense naturelles de votre corps.",
        "Ne sur-interprétez pas les bruits de digestion ordinaires.",
        "Préservez le plaisir des repas partagés et la diversité culinaire.",
      ],
      es: [
        "Sigue confiando en la capacidad inmunitaria y reguladora de tu organismo.",
        "No sobreanalices ruidos digestivos ni molestias gástricas banales.",
        "Disfruta de la variedad gastronómica y las comidas sociales con naturalidad.",
      ],
    },
  },
  {
    level: "mild_visceral_discomfort_sensitivity",
    scoreRange: [8, 14],
    title: {
      en: "Mild Visceral Sensitivity & Situational Motion Dread",
      id: "Sensitivitas Lambung Ringan & Kecemasan Mabuk Perjalanan",
      de: "Leichte viszerale Sensitivität & situative Reiseunruhe",
      fr: "Sensibilité viscérale légère & appréhension du mal des transports",
      es: "Sensibilidad visceral leve e inquietud por el mareo",
    },
    badge: {
      en: "SITUATIONAL NAUSEA AVOIDANCE",
      id: "PENGHINDARAN MUAL SITUASIONAL",
      de: "SITUATIVE ÜBELKEITSVERMEIDUNG",
      fr: "APPRÉHENSION SITUATIONNELLE DU VOMISSEMENT",
      es: "EVITACIÓN OCASIONAL DEL MALESTAR",
    },
    summary: {
      en: "You feel uneasy when hearing about the stomach flu, dislike bumpy flights, or occasionally double-check food dates. However, this does not severely isolate you or paralyze your day-to-day choices.",
      id: "Kamu merasa agak cemas saat mendengar kabar wabah muntaber, tidak nyaman di perjalanan bergelombang, atau sesekali mengecek ulang tanggal makanan. Namun kondisi ini belum mengisolasi hidupmu.",
      de: "Sie reagieren unruhig bei Magen-Darm-Wellen im Umfeld oder holprigen Flügen, können Ihren Alltag aber ohne gravierende Einschränkungen bewältigen.",
      fr: "Vous ressentez une appréhension face aux épidémies de gastro ou aux trajets agités, sans que cela n'handicape lourdement votre quotidien.",
      es: "Sientes cierta inquietud ante brotes de gastroenteritis o viajes en barco, pero sigues haciendo vida normal sin aislarte de forma severa.",
    },
    psychology: {
      en: "Conditioned disgust associations produce brief spikes in autonomic nervous system arousal, quickly mitigated once situational uncertainty resolves.",
      id: "Asosiasi rasa jijik dan takut memicu sedikit lonjakan sistem saraf simpatik, namun akan mereda kembali setelah situasi terasa aman dan terkendali.",
      de: "Kurzzeitige autonome Erregung bei Konfrontation mit Übelkeitsreizen, die sich jedoch rasch wieder normalisiert.",
      fr: "Légère hyper-réactivité autonome lors de situations à risque digestif, vite régulée par vos ressources cognitives.",
      es: "Activación autónoma transitoria ante estímulos de náusea que remite en cuanto recuperas la sensación de control.",
    },
    actionProtocol: {
      en: [
        "Resist the urge to re-check already verified expiration dates.",
        "Practice slow diaphragmatic breathing when feeling mild travel queasiness.",
        "Remind yourself that mild nausea is extremely common and rarely leads to actual vomiting.",
      ],
      id: [
        "Tahan dorongan untuk mengecek berulang kali tanggal makanan yang sudah kamu periksa sebelumnya.",
        "Latih pernapasan diafragma perlahan saat merasakan mual ringan akibat perjalanan.",
        "Ingatkan dirimu bahwa rasa mual ringan sangat lumrah dan jarang berujung pada muntah nyata.",
      ],
      de: [
        "Widerstehen Sie dem Drang, bereits geprüfte Mindesthaltbarkeitsdaten erneut zu kontrollieren.",
        "Nutzen Sie tiefe Bauchatmung bei leichter Reiseübelkeit.",
        "Machen Sie sich bewusst, dass leichte Übelkeit fast nie zu tatsächlichem Erbrechen führt.",
      ],
      fr: [
        "Résistez à l'envie de vérifier plusieurs fois les dates de péremption déjà validées.",
        "Respirez calmement par le ventre en cas de léger mal des transports.",
        "Rappelez-vous qu'un barbouillement passager ne débouche que très rarement sur un vomissement.",
      ],
      es: [
        "Evita comprobar dos veces las fechas de caducidad que ya has revisado.",
        "Aplica respiración diafragmática profunda ante leves mareos de viaje.",
        "Recuerda que una náusea leve casi nunca culmina en vómito real.",
      ],
    },
  },
  {
    level: "moderate_emetophobic_avoidance",
    scoreRange: [15, 21],
    title: {
      en: "Moderate Emetophobia & Safety Ritual Hypervigilance",
      id: "Emetofobia Sedang & Kewaspadaan Ritual Penyelamat",
      de: "Moderate Emetophobie & zwanghaftes Sicherheitsverhalten",
      fr: "Émétophobie modérée & hypervigilance des rituels de sécurité",
      es: "Emetofobia moderada e hipervigilancia con conductas de seguridad",
    },
    badge: {
      en: "SUB-CLINICAL SPOVI PROFILE",
      id: "PROFIL EMETOFOBIA SUB-KLINIS",
      de: "SUBKLINISCHES EMETOPHOBIE-PROFIL",
      fr: "PROFIL ÉMÉTOPHOBIQUE MODÉRÉ",
      es: "PERFIL EMETOFÓBICO SUBCLÍNICO",
    },
    summary: {
      en: "Fear of vomiting significantly shapes your lifestyle. You maintain strict safety rituals: carrying anti-nausea pills, over-sanitizing hands, avoiding suspect restaurants, and enduring intense anxiety when colleagues or family members fall ill.",
      id: "Ketakutan akan muntah mulai mendikte gaya hidupmu. Kamu memiliki ritual keselamatan yang ketat: selalu membawa obat mual, mencuci tangan berlebih, menghindari restoran tertentu, dan panik saat ada rekan atau keluarga yang sakit perut.",
      de: "Die Angst vor dem Erbrechen beeinflusst Ihren Alltag spürbar: ständiges Mitführen von Notfallmedikamenten, übertriebene Händehygiene und Meiden bestimmter Speisen.",
      fr: "La peur de vomir dicte vos habitudes : port systématique de médicaments de secours, lavage excessif des mains et angoisse vive si un proche a la gastro.",
      es: "El miedo al vómito condiciona tus rutinas: llevas pastillas a todas partes, te lavas las manos en exceso y sufres angustia si alguien enferma cerca.",
    },
    psychology: {
      en: "Prof. David Veale's SPOVI framework shows that safety behaviors (checking, hyper-cleaning, carrying mints) paradoxically reinforce fear by confirming to the amygdala that vomiting is an intolerable catastrophe rather than a benign somatic event.",
      id: "Model SPOVI Prof. David Veale membuktikan bahwa ritual penyelamat (membawa obat mual, mencium makanan, cuci tangan berulang) justru mengunci ketakutan di otak amigdala dengan menanamkan ilusi bahwa muntah adalah bencana mematikan.",
      de: "Nach Prof. Veales SPOVI-Modell verstärken Sicherheitsrituale (Pfefferminzbonbons, Desinfektion) paradox die Phobie, da sie dem Gehirn signalisieren, Erbrechen sei eine Katastrophe.",
      fr: "Selon le modèle SPOVI du Pr Veale, les rituels de réassurance valident inconsciemment auprès de l'amygdale l'idée erronée que vomir est un drame insurmontable.",
      es: "El modelo SPOVI del Prof. Veale demuestra que las conductas de seguridad refuerzan la fobia al confirmar a la amígdala que vomitar es una tragedia inasumible.",
    },
    actionProtocol: {
      en: [
        "Begin 'Safety Behavior Fading': Practice leaving your anti-nausea kit behind on a short 30-minute errand.",
        "Engage in Interoceptive Exposure: Intentionally spin in an office chair for 20 seconds or breathe through a straw to tolerate benign visceral sensations.",
        "Limit hand sanitizer use to standard hygiene contexts rather than anxiety-driven decontaminations.",
      ],
      id: [
        "Lakukan pengurangan bertahap ritual penyelamat: tinggalkan kantong obat mualmu di rumah saat bepergian santai selama 30 menit.",
        "Latihan paparan interoseptif: putar kursi kantormu selama 20 detik atau bernapas lewat sedotan untuk membiasakan otak menoleransi sensasi pusing/mual ringan yang aman.",
        "Batasi pemakaian hand sanitizer hanya untuk kebersihan wajar, bukan untuk menenangkan rasa panik.",
      ],
      de: [
        "Bauen Sie Sicherheitsrituale schrittweise ab: Lassen Sie das Notfall-Set bei einem kurzen Spaziergang bewusst zu Hause.",
        "Interozeptive Exposition: Drehen Sie sich 20 Sekunden auf einem Bürostuhl, um harmlose Schwindelgefühle neu zu bewerten.",
        "Reduzieren Sie Desinfektionsmittel auf normales Maß.",
      ],
      fr: [
        "Estompez progressivement les objets rassurants : faites une sortie de 30 minutes sans emporter vos antiémétiques.",
        "Exposition intéroceptive : tournez sur vous-même 20 secondes pour réapprivoiser les étourdissements sans paniquer.",
        "Limitez l'usage du gel hydroalcoolique aux stricts impératifs d'hygiène.",
      ],
      es: [
        "Despréndete de objetos fetiche: sal a caminar 30 minutos sin llevar encima medicamentos contra el mareo.",
        "Exposición interoceptiva: gira en una silla durante 20 segundos para tolerar el mareo benigno sin alarmarte.",
        "Modera el uso de desinfectantes a situaciones objetivas de higiene.",
      ],
    },
  },
  {
    level: "high_clinical_emetophobia_spov",
    scoreRange: [22, 28],
    title: {
      en: "High Clinical Risk of Emetophobia (Specific Phobia of Vomiting)",
      id: "Risiko Klinis Tinggi Emetofobia (Fobia Spesifik Muntah)",
      de: "Hohes klinisches Risiko für Emetophobie (SPOV)",
      fr: "Risque clinique élevé d'émétophobie (phobie spécifique du vomissement)",
      es: "Alto riesgo clínico de emetofobia (fobia específica al vómito)",
    },
    badge: {
      en: "CLINICAL EMETOPHOBIA (SPOVI PROFILE)",
      id: "PROFIL EMETOFOBIA KLINIS (SPOVI)",
      de: "KLINISCHES SPOVI-PROFIL",
      fr: "PROFIL ÉMÉTOPHOBIQUE CLINIQUE (SPOVI)",
      es: "PERFIL CLÍNICO DE EMETOFOBIA (SPOVI)",
    },
    summary: {
      en: "You meet the core diagnostic criteria for a Specific Phobia of Vomiting. Your life is heavily restricted by terror of nausea: you severely limit food intake, avoid travel, experience panic attacks, and view vomiting as an intolerable loss of physical control.",
      id: "Kamu memenuhi kriteria diagnosis klinis Fobia Spesifik Muntah (Emetofobia). Hidupmu sangat dibatasi oleh ketakutan akan rasa mual: kamu membatasi makan secara drastis, takut bepergian, mengalami serangan panik, dan memandang muntah sebagai kiamat fisik.",
      de: "Sie erfüllen die Kernkriterien einer spezifischen Phobie vor dem Erbrechen. Ihr Leben ist drastisch eingeschränkt: Nahrungseinschränkungen, Reiseängste, Panikattacken und ständige Alarmbereitschaft.",
      fr: "Vous correspondez aux critères diagnostiques de l'émétophobie sévère. Votre quotidien est lourdement restreint par la peur viscérale de la nausée, avec restriction alimentaire et paniques récurrentes.",
      es: "Cumples los criterios de fobia específica al vómito. Tu vida sufre severas limitaciones: restricción de comida, fobia a viajar, ataques de pánico y terror a la náusea.",
    },
    psychology: {
      en: "There is an extreme uncoupling between actual physiological threat and autonomic response. The anterior insular cortex triggers acute sympathetic panic in response to ordinary gastric signals, generating chronic functional nausea that paradoxically fuels the phobia.",
      id: "Terjadi ketidakseimbangan parah antara ancaman fisik nyata dan respons saraf otonom. Korteks insula anterior memicu kepanikan simpatik atas sinyal lambung normal, menciptakan 'mual psikogenik palsu' yang terus memicu lingkaran setan fobia.",
      de: "Eine Fehlkopplung zwischen tatsächlicher Bedrohung und autonomer Reaktion: Die Insula schlägt bei normalen Magensignalen Großalarm, was funktionelle Übelkeit erzeugt und die Phobie nährt.",
      fr: "Une suractivation du cortex insulaire antérieur génère une nausée psychogène d'angoisse en réponse à de simples signaux gastriques, alimentant le cercle vicieux.",
      es: "Existe un desacoplamiento neurobiológico: la corteza insular dispara una alarma desmesurada ante señales estomacales normales, produciendo náusea funcional por ansiedad.",
    },
    actionProtocol: {
      en: [
        "Consult a clinical psychologist specialized in Exposure and Response Prevention (ERP) and Cognitive Behavioral Therapy (CBT) for Emetophobia.",
        "Work on identifying 'Psychogenic Nausea': Anxiety creates adrenaline, which slows digestion and creates nausea—meaning your nausea is often caused by fear, not sickness.",
        "Gradually re-introduce avoided food groups in a safe, compassionate environment.",
      ],
      id: [
        "Konsultasikan kondisi ini dengan psikolog klinis yang berpengalaman dalam terapi ERP (Exposure and Response Prevention) dan CBT khusus Emetofobia.",
        "Kenali 'Mual Psikogenik': lonjakan adrenalin saat cemas memperlambat kerja lambung dan memicu mual palsu—artinya rasa mualmu bersumber dari ketakutan di kepala, bukan penyakit lambung.",
        "Secara bertahap mulai konsumsi kembali makanan yang selama ini kamu hindari di lingkungan yang aman.",
      ],
      de: [
        "Suchen Sie einen Psychotherapeuten für Kognitive Verhaltenstherapie mit Exposition und Reaktionsverhinderung (ERP).",
        "Erkennen Sie 'psychogene Übelkeit': Angst schüttet Adrenalin aus, bremst die Verdauung und erzeugt Scheinpbelkeit.",
        "Führen Sie vermiedene Speisen schrittweise wieder in Ihren Speiseplan ein.",
      ],
      fr: [
        "Consultez un psychologue spécialisé en thérapie d'exposition avec prévention de la réponse (ERP) pour l'émétophobie.",
        "Identifiez la 'nausée psychogène' : l'adrénaline de la peur paralyse l'estomac, créant une nausée causée par l'angoisse elle-même.",
        "Réintroduisez méthodiquement les aliments évités avec l'aide d'un professionnel.",
      ],
      es: [
        "Acude a un psicólogo clínico versado en TCC y Exposición con Prevención de Respuesta (EPR) para emetofobia.",
        "Aprende a diferenciar la 'náusea psicógena': la adrenalina ralentiza el estómago y crea náusea por pura ansiedad.",
        "Reintroduce progresivamente grupos de alimentos que habías desterrado de tu dieta.",
      ],
    },
  },
  {
    level: "severe_incapacitating_emetophobia_panic",
    scoreRange: [29, 36],
    title: {
      en: "Severe Incapacitating Emetophobia & Maladaptive Isolation",
      id: "Emetofobia Sangat Parah, Melumpuhkan & Isolasi Total",
      de: "Schwere invalidisierende Emetophobie & soziale Isolation",
      fr: "Émétophobie sévère invalidante & isolement majeur",
      es: "Emetofobia severa incapacitante y aislamiento fóbico",
    },
    badge: {
      en: "ACUTE INCAPACITATING SPOV CRISIS",
      id: "KRISIS EMETOFOBIA MELUMPUHKAN AKUT",
      de: "AKUTE EMETOPHOBISCHE KRISE",
      fr: "CRISE ÉMÉTOPHOBIQUE SÉVÈRE",
      es: "CRISIS EMETOFÓBICA INCAPACITANTE",
    },
    summary: {
      en: "Your fear of vomiting has become completely debilitating. You may barely leave your home, suffer severe weight loss from restricted eating, experience daily terror, and feel trapped in an endless labyrinth of checking, sanitizing, and gastrointestinal panic.",
      id: "Ketakutan akan muntah telah melumpuhkan hidupmu secara total. Kamu mungkin jarang berani keluar rumah, mengalami penurunan berat badan drastis, hidup dalam teror harian, dan terpenjara dalam ritual cuci tangan dan kepanikan lambung.",
      de: "Ihre Emetophobie ist existenziell bedrohlich: Sie meiden das Verlassen des Hauses, hungern aus Panik vor Übelkeit, leiden unter Gewichtsverlust und ständiger Verzweiflung.",
      fr: "L'émétophobie est devenue invalidante : quasi-confinement à domicile, dénutrition par peur d'ingérer des toxines, attaques de panique quotidiennes et souffrance immense.",
      es: "Tu fobia al vómito es totalmente incapacitante: apenas sales de casa, presentas desnutrición por restricción calórica severa y vives en un estado de pánico incesante.",
    },
    psychology: {
      en: "This represents profound agoraphobic-emetophobic entrapment with secondary sensory trauma. The brain's disgust-and-threat architecture is hyper-sensitized, interpreting virtually any interoceptive gastric pulse as an unbearable catastrophe.",
      id: "Kondisi ini mencerminkan keterperangkapan emetofobia-agorafobia akut dengan trauma sensori sekunder. Sirkuit ancaman otak sangat peka, menerjemahkan sensasi fisik apapun di perut sebagai bencana yang tidak tertahankan.",
      de: "Schwerste Phobie mit agoraphobischer Vermeidung: Das körpereigene Alarmsystem interpretiert jede viszerale Regung als lebensbedrohlichen Notfall.",
      fr: "Verrouillage phobique sévère mêlant émétophobie et agoraphobie : la moindre contraction digestive est vécue comme une catastrophe imminente.",
      es: "Atrapamiento fóbico severo con rasgos agorafóbicos: el sistema de alarma procesa cualquier movimiento gástrico como una emergencia inminente.",
    },
    actionProtocol: {
      en: [
        "Prioritize immediate multidisciplinary care combining a clinical psychologist (ERP) and a psychiatrist (pharmacotherapy such as SSRIs or mirtazapine for visceral anxiety).",
        "Address potential nutritional deficiencies and medical weight loss with an empathetic physician.",
        "Use Nuju private voice venting from bed: When gastric panic spikes, speak your terror out loud to break the catastrophic silent internal echo.",
      ],
      id: [
        "Segera cari pendampingan profesional terpadu dari psikolog klinis (ERP) dan psikiater (untuk opsi obat pereda kecemasan viseral seperti SSRI/mirtazapine).",
        "Periksakan status nutrisi dan penurunan berat badanmu ke dokter yang memahami gangguan kecemasan.",
        "Gunakan jurnal suara pribadi Nuju dari tempat tidur: saat kepanikan perut melanda, ucapkan ketakutanmu secara perlahan untuk memecah resonansi panik di kepala.",
      ],
      de: [
        "Suchen Sie unverzüglich ein spezialisiertes Behandlungsteam (Psychotherapie und psychiatrische Begleitung z. B. mit Mirtazapin/SSRI).",
        "Lassen Sie Mangelerscheinungen und Gewichtsverlust internistisch abklären.",
        "Sprechen Sie Panikzustände leise in das Nuju-Sprachjournal ein, um den Gedankenteufelskreis zu durchbrechen.",
      ],
      fr: [
        "Consultez d'urgence une équipe spécialisée (psychiatre pour le versant anxiolytique et psychologue ERP).",
        "Faites évaluer votre état nutritionnel et votre poids par un médecin bienveillant.",
        "Utilisez le journal vocal Nuju au lit pour verbaliser la panique gastrique et désamorcer la terreur silencieuse.",
      ],
      es: [
        "Acude a un equipo multidisciplinar con psiquiatra (apoyo farmacológico para ansiedad visceral) y psicólogo clínico (EPR).",
        "Realiza una revisión médica de tu estado nutricional y peso corporal.",
        "Usa el diario de voz de Nuju desde la cama para expresar el pánico gástrico y apagar la espiral mental.",
      ],
    },
  },
];

export const EMETOPHOBIA_OPTIONS = [
  {
    value: 0,
    label: {
      en: "0 - Not at all / Never (Normal Gastric Comfort)",
      id: "0 - Sama Sekali Tidak / Pernah (Lambung Nyaman)",
      de: "0 - Gar nicht / Nie (Normales Magengefühl)",
      fr: "0 - Pas du tout / Jamais (Confort gastrique normal)",
      es: "0 - En absoluto / Nunca (Confort gástrico normal)",
    },
  },
  {
    value: 1,
    label: {
      en: "1 - Mild / Occasionally (Slight discomfort or situational checking)",
      id: "1 - Ringan / Kadang-kadang (Sedikit khawatir atau sesekali mengecek)",
      de: "1 - Leicht / Gelegentlich (Leichte Vorsicht in Risikosituationen)",
      fr: "1 - Léger / Occasionnel (Légère gêne ou vigilance passagère)",
      es: "1 - Leve / Ocasional (Inquietud leve o comprobación puntual)",
    },
  },
  {
    value: 2,
    label: {
      en: "2 - Moderate / Frequently (Frequent panic, avoidance of travel/food)",
      id: "2 - Sedang / Sering (Sering cemas, menghindari makanan/perjalanan)",
      de: "2 - Mäßig / Häufig (Deutliche Vermeidung, wiederholte Panik)",
      fr: "2 - Modéré / Fréquent (Évitement fréquent, paniques digestives)",
      es: "2 - Moderado / Frecuente (Evitación marcada, pánico recurrente)",
    },
  },
  {
    value: 3,
    label: {
      en: "3 - Severe / Daily Obsession (Incapacitating terror, extreme rituals)",
      id: "3 - Parah / Obsesi Harian (Ketakutan melumpuhkan, ritual ekstrem)",
      de: "3 - Schwer / Täglicher Zwang (Lähmende Panik, extreme Rituale)",
      fr: "3 - Sévère / Obsessionnel au quotidien (Terreur invalidante, rituels)",
      es: "3 - Severo / Diario incapacitante (Terror absoluto, rituales extremos)",
    },
  },
];

export const EMETOPHOBIA_SUBSCALE_INFO = {
  visceral_hypervigilance_nausea_panic: {
    name: {
      en: "Visceral Hypervigilance & Nausea Panic",
      id: "Kewaspadaan Organ Dalam & Panik Mual",
      de: "Viszerale Hypervigilanz & Übelkeitspanik",
      fr: "Hypervigilance viscérale & panique de la nausée",
      es: "Hipervigilancia visceral y pánico a la náusea",
    },
    description: {
      en: "Obsessive scanning of stomach and throat sensations, misinterpreting digestion as impending vomiting, and severe panic attacks.",
      id: "Memantau perut dan tenggorokan tanpa henti, mengira pencernaan normal sebagai tanda muntah, serta serangan panik hebat.",
      de: "Ständiges Abtasten von Magensignalen, Fehlinterpretation normaler Verdauung und akute Panikattacken.",
      fr: "Surveillance anxieuse des bruits gastriques et de la gorge, croyance erronée au vomissement imminent et paniques.",
      es: "Monitoreo obsesivo de garganta y estómago, mala interpretación de la digestión y ataques de pánico.",
    },
  },
  contamination_safety_checking_rituals: {
    name: {
      en: "Contamination & Safety Checking Rituals",
      id: "Kontaminasi & Ritual Pengecekan Keselamatan",
      de: "Kontaminationsangst & Sicherheitsrituale",
      fr: "Contamination & rituels de vérification",
      es: "Contaminación y rituales de comprobación",
    },
    description: {
      en: "Excessive handwashing, sniffing and re-checking expiration dates, carrying anti-nausea kits, and severe food restrictions.",
      id: "Mencuci tangan berlebihan, mencium dan memeriksa tanggal kedaluwarsa berulang kali, membawa obat mual, dan diet ketat.",
      de: "Übertriebenes Händewaschen, zwanghaftes Prüfen von Verfallsdaten, Mitführen von Notfallmedikamenten.",
      fr: "Lavage compulsif des mains, vérification répétée des aliments, trousse de secours permanente et régimes restrictifs.",
      es: "Lavado compulsivo de manos, oler y revisar caducidades, llevar botiquín de emergencia y restricciones dietéticas.",
    },
  },
  interpersonal_travel_avoidance_control: {
    name: {
      en: "Interpersonal & Travel Avoidance Control",
      id: "Penghindaran Sosial, Perjalanan & Kehilangan Kendali",
      de: "Soziale Vermeidung & Reiseängste",
      fr: "Évitement social & transports",
      es: "Evitación social, viajes y control",
    },
    description: {
      en: "Fleeing from sick individuals, avoiding public transport, airplanes, parties, hospitals, and child-care settings to avoid exposure.",
      id: "Menghindari orang batuk/sakit, takut naik pesawat/bus, pesta beralkohol, rumah sakit, dan anak kecil demi mencegah paparan.",
      de: "Meiden von öffentlichen Verkehrsmitteln, Flugreisen, Partys, Krankenhäusern und Kindern aus Furcht vor Ansteckung.",
      fr: "Fuite face aux personnes malades, refus des transports en commun, des soirées festives et des hôpitaux.",
      es: "Huir de personas enfermas, evitar aviones o transporte público, fiestas con alcohol y guarderías.",
    },
  },
};

export function calculateEmetophobiaScore(answers: Record<number, number>): number {
  return Object.values(answers).reduce((sum, val) => sum + val, 0);
}

export function calculateEmetophobiaSubscales(answers: Record<number, number>): {
  visceral_hypervigilance_nausea_panic: number;
  contamination_safety_checking_rituals: number;
  interpersonal_travel_avoidance_control: number;
} {
  let vhn = 0;
  let csc = 0;
  let ita = 0;

  EMETOPHOBIA_QUESTIONS.forEach((q) => {
    const score = answers[q.id] ?? 0;
    if (q.subscale === "visceral_hypervigilance_nausea_panic") vhn += score;
    if (q.subscale === "contamination_safety_checking_rituals") csc += score;
    if (q.subscale === "interpersonal_travel_avoidance_control") ita += score;
  });

  return {
    visceral_hypervigilance_nausea_panic: vhn,
    contamination_safety_checking_rituals: csc,
    interpersonal_travel_avoidance_control: ita,
  };
}

export function getEmetophobiaResultLevel(score: number): EmetophobiaResultLevel {
  const match = EMETOPHOBIA_RESULT_LEVELS.find(
    (lvl) => score >= lvl.scoreRange[0] && score <= lvl.scoreRange[1]
  );
  return match || EMETOPHOBIA_RESULT_LEVELS[EMETOPHOBIA_RESULT_LEVELS.length - 1];
}

export const getEmetophobiaResult = getEmetophobiaResultLevel;
export const EMETOPHOBIA_RESULTS = EMETOPHOBIA_RESULT_LEVELS;
