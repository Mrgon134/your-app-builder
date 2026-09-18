export type BodyDysmorphiaCardLang = "en" | "id" | "de" | "fr" | "es";

export interface BodyDysmorphiaQuestion {
  id: number;
  subscale: "flaw_magnification" | "mirror_checking" | "social_camouflaging";
  text: Record<BodyDysmorphiaCardLang, string>;
}

export interface BodyDysmorphiaResultLevel {
  level:
    | "healthy_body_neutrality"
    | "mild_aesthetic_sensitivity"
    | "moderate_body_dysmorphic_friction"
    | "severe_bdd_preoccupation"
    | "acute_dysmorphic_paralysis";
  scoreRange: [number, number];
  title: Record<BodyDysmorphiaCardLang, string>;
  badge: Record<BodyDysmorphiaCardLang, string>;
  summary: Record<BodyDysmorphiaCardLang, string>;
  psychology: Record<BodyDysmorphiaCardLang, string>;
  actionProtocol: Record<BodyDysmorphiaCardLang, string[]>;
}

export const BODY_DYSMORPHIA_QUESTIONS: BodyDysmorphiaQuestion[] = [
  // 1. Flaw Magnification
  {
    id: 1,
    subscale: "flaw_magnification",
    text: {
      en: "I spend over an hour daily fixating on one specific bodily or facial feature that feels grotesque, defective, or misshapen.",
      id: "Aku menghabiskan lebih dari satu jam sehari terobsesi pada satu bagian tubuh atau wajah tertentu yang kurasa aneh, cacat, atau rusak.",
      de: "Ich verbringe täglich über eine Stunde damit, mich auf ein scheinbar entstelltes oder fehlerhaftes Körper- oder Gesichtsmerkmal zu fixieren.",
      fr: "Je passe plus d'une heure par jour à focaliser sur un détail physique ou facial que je juge difforme ou monstrueux.",
      es: "Paso más de una hora al día obsesionado con un rasgo físico o facial que considero deforme, defectuoso o grotesco.",
    },
  },
  // 2. Mirror Checking
  {
    id: 2,
    subscale: "mirror_checking",
    text: {
      en: "I repeatedly check mirrors, phone screens, or reflections (or rigidly avoid them altogether because seeing myself causes panic).",
      id: "Aku berulang kali memeriksa cermin, layar HP, atau pantulan kaca (atau justru menghindarinya sama sekali karena melihat bayanganku memicu panik).",
      de: "Ich kontrolliere mein Spiegelbild oder Reflexionen ständig (oder meide Spiegel panisch, weil der Anblick mich überwältigt).",
      fr: "Je vérifie compulsivement mon reflet dans les miroirs ou vitres (ou au contraire, je les évite par terreur de me voir).",
      es: "Reviso compulsivamente los espejos o reflejos (o los evito por completo porque verme me causa pánico o angustia).",
    },
  },
  // 3. Social Camouflaging
  {
    id: 3,
    subscale: "social_camouflaging",
    text: {
      en: "I use heavy makeup, specific clothing, hair arrangements, or camera angles to camouflage my perceived defect from others.",
      id: "Aku memakai riasan tebal, pakaian khusus, penataan rambut, atau sudut kamera tertentu untuk menutupi bagian fisik yang kurasa cacat.",
      de: "Ich nutze Kleidung, Make-up, Frisuren oder spezielle Blickwinkel, um meinen vermeintlichen Makel vor anderen zu tarnen.",
      fr: "J'utilise des vêtements amples, du maquillage ou des postures pour camoufler mon défaut physique aux yeux des autres.",
      es: "Uso ropa holgada, maquillaje o posturas específicas para camuflar mi defecto percibido de la mirada ajena.",
    },
  },
  // 4. Flaw Magnification
  {
    id: 4,
    subscale: "flaw_magnification",
    text: {
      en: "When people reassure me that my feature looks completely normal, I feel they are lying out of pity or trying to be polite.",
      id: "Saat orang lain meyakinkanku bahwa penampilanku normal, aku merasa mereka berbohong karena kasihan atau sekadar basa-basi.",
      de: "Wenn andere mir versichern, ich sähe normal aus, glaube ich ihnen nicht und vermute Mitleid oder Höflichkeitslügen.",
      fr: "Quand on me dit que mon apparence est normale, je suis convaincu(e) qu'on me ment par pitié ou politesse.",
      es: "Cuando los demás me dicen que me veo normal, siento que me mienten por lástima o por pura cortesía.",
    },
  },
  // 5. Mirror Checking
  {
    id: 5,
    subscale: "mirror_checking",
    text: {
      en: "I touch, measure, or inspect the perceived flaw with my fingers multiple times a day to confirm whether it has worsened.",
      id: "Aku menyentuh, mengukur, atau meraba bagian fisik yang bermasalah berkali-kali sehari untuk memastikan apakah itu bertambah parah.",
      de: "Ich ertaste, messe oder kontrolliere die betroffene Körperstelle mehrmals täglich mit den Fingern.",
      fr: "Je touche, palpe ou mesure mon défaut perçu plusieurs fois par jour pour vérifier s'il a empiré.",
      es: "Toco, mido o examino con los dedos la zona afectada varias veces al día para comprobar si ha empeorado.",
    },
  },
  // 6. Social Camouflaging
  {
    id: 6,
    subscale: "social_camouflaging",
    text: {
      en: "I panic or cancel plans if I have to be photographed in harsh lighting or without beauty filters that alter my proportions.",
      id: "Aku panik atau membatalkan janji jika harus difoto di bawah pencahayaan terang atau tanpa filter kecantikan.",
      de: "Ich gerate in Panik oder sage Verabredungen ab, wenn Fotos unter grellem Licht oder ohne Weichzeichnungsfilter drohen.",
      fr: "J'annule des sorties ou je panique à l'idée d'être pris(e) en photo sous une lumière crue ou sans filtre.",
      es: "Me angustio o cancelo planes si tengo que aparecer en fotos con luz dura o sin filtros que suavicen mis rasgos.",
    },
  },
  // 7. Flaw Magnification
  {
    id: 7,
    subscale: "flaw_magnification",
    text: {
      en: "I believe that my physical appearance prevents me from deserving genuine love, career success, or respect.",
      id: "Aku yakin bahwa kekurangan fisikku membuatku tidak layak mendapatkan cinta tulus, kesuksesan karier, atau rasa hormat.",
      de: "Ich glaube tief im Inneren, dass mein Äußeres mich unwürdig für echte Liebe, Erfolg oder Respekt macht.",
      fr: "Je suis convaincu(e) que mes défauts physiques m'empêchent de mériter un amour véritable ou le succès.",
      es: "Creo profundamente que mi aspecto físico me impide merecer un amor sincero, éxito profesional o respeto.",
    },
  },
  // 8. Mirror Checking
  {
    id: 8,
    subscale: "mirror_checking",
    text: {
      en: "A 'bad reflection day' ruins my entire mood, making me feel physically sick, ashamed, and unable to focus on work.",
      id: "Hari di mana pantulan cerminku terlihat buruk merusak seluruh suasana hatiku, membuatku mual, malu, dan tidak bisa bekerja.",
      de: "Ein Tag, an dem mein Spiegelbild mir missfällt, ruiniert meine Stimmung komplett und lähmt meine Konzentration.",
      fr: "Si je me trouve laid(e) dans le miroir le matin, ma journée entière est gâchée par la honte et le dégoût.",
      es: "Un día en que mi reflejo se ve mal me arruina el ánimo por completo, provocándome vergüenza y náuseas.",
    },
  },
  // 9. Social Camouflaging
  {
    id: 9,
    subscale: "social_camouflaging",
    text: {
      en: "In public, I constantly scan others to compare my perceived flaw against theirs, feeling profound inferiority when they look better.",
      id: "Di tempat umum, aku terus membandingkan bagian tubuhku dengan orang lain dan merasa sangat minder saat mereka terlihat lebih baik.",
      de: "In der Öffentlichkeit vergleiche ich meinen vermeintlichen Makel permanent mit anderen und fühle mich unterlegen.",
      fr: "Dans les lieux publics, je compare sans cesse mon défaut à celui des autres et ressens une infériorité cuisante.",
      es: "En lugares públicos, comparo constantemente mi defecto con los demás y siento una profunda inferioridad.",
    },
  },
  // 10. Flaw Magnification
  {
    id: 10,
    subscale: "flaw_magnification",
    text: {
      en: "I obsessively research cosmetic surgeries, skin procedures, or extreme physical modifications to 'fix' my appearance.",
      id: "Aku secara obsesif mencari info operasi plastik, prosedur dermatologi, atau modifikasi ekstrem untuk 'memperbaiki' kekuranganku.",
      de: "Ich recherchiere zwanghaft nach plastischen Operationen oder Behandlungen, um mein Äußeres endlich zu 'reparieren'.",
      fr: "Je passe des heures à chercher des chirurgies esthétiques ou des soins invasifs pour 'corriger' mes anomalies.",
      es: "Busco de manera compulsiva cirugías estéticas o tratamientos invasivos para 'arreglar' mi apariencia.",
    },
  },
  // 11. Mirror Checking
  {
    id: 11,
    subscale: "mirror_checking",
    text: {
      en: "I find myself caught in mirror loops—staring closely at pores, lines, or asymmetry for 20+ minutes unable to pull myself away.",
      id: "Aku terjebak dalam lingkaran cermin—menatap pori-pori, garis, atau asimetri wajah selama 20 menit lebih tanpa sanggup menjauh.",
      de: "Ich verfange mich in Spiegel-Schleifen: Ich starre 20 Minuten lang auf Poren oder Asymmetrien und kann mich kaum losreißen.",
      fr: "Je reste piégé(e) devant le miroir à scruter mes pores ou asymétries pendant plus de 20 minutes sans pouvoir partir.",
      es: "Me quedo atrapado frente al espejo examinando poros o asimetrías durante más de 20 minutos sin poder apartarme.",
    },
  },
  // 12. Social Camouflaging
  {
    id: 12,
    subscale: "social_camouflaging",
    text: {
      en: "I have avoided dates, social gatherings, or leaving my house because of intense dread over how others would perceive my body.",
      id: "Aku pernah menghindari kencan, kumpul teman, atau keluar rumah karena ketakutan luar biasa atas bagaimana orang lain melihat tubuhku.",
      de: "Ich habe Dates, Partys oder das Verlassen des Hauses vermieden, aus reiner Panik vor den Blicken anderer.",
      fr: "J'ai déjà évité des rendez-vous ou renoncé à sortir de chez moi par peur du regard des autres sur mon corps.",
      es: "He evitado citas, reuniones sociales o salir de casa por miedo insoportable al juicio de los demás sobre mi cuerpo.",
    },
  },
];

export const BODY_DYSMORPHIA_RESULTS: BodyDysmorphiaResultLevel[] = [
  {
    level: "healthy_body_neutrality",
    scoreRange: [0, 8],
    title: {
      en: "Healthy Body Neutrality & Integrated Somatic Self",
      id: "Netralitas Tubuh Sehat & Integrasi Diri Somatik",
      de: "Gesunde Körperneutralität & Somatische Balance",
      fr: "Neutralité Corporelle Saine & Sérénité",
      es: "Neutralidad Corporal Sana & Autoaceptación",
    },
    badge: {
      en: "Somatic Neutrality",
      id: "Netralitas Somatik",
      de: "Körperneutral",
      fr: "Corps Neutre & Paisible",
      es: "Paz Corporal",
    },
    summary: {
      en: "You maintain a grounded, functional relationship with your physical appearance. While you may have natural aesthetic preferences, your self-worth is not held hostage by perceived flaws or mirror reflections.",
      id: "Kamu memiliki hubungan yang sehat dan fungsional dengan tubuhmu. Walau memiliki preferensi penampilan, harga dirimu tidak tersandera oleh kekurangan fisik atau bayangan cermin.",
      de: "Sie pflegen eine gesunde, funktionale Beziehung zu Ihrem Körper. Ihr Selbstwertgefühl hängt nicht von Makeln oder Spiegelbildern ab.",
      fr: "Vous entretenez une relation saine et apaisée avec votre apparence. Votre valeur personnelle ne dépend pas d'imperfections esthétiques.",
      es: "Mantienes una relación funcional y equilibrada con tu imagen física. Tu autoestima no depende de imperfecciones ni reflejos.",
    },
    psychology: {
      en: "In Dr. Thomas Cash's Body-Self Relations framework, your visual processing functions holistically rather than fixating locally. You view your body as an instrument for experiencing life rather than an ornamental object to be judged.",
      id: "Dalam kerangka psikologi Dr. Thomas Cash, persepsi visualmu bekerja secara holistik. Kamu memandang tubuh sebagai instrumen untuk menjalani hidup, bukan objek pajangan untuk dihakimi.",
      de: "Nach Dr. Thomas Cash verarbeiten Sie Körperwahrnehmung ganzheitlich und reduzieren Ihr Selbst nicht auf isolierte Details.",
      fr: "Selon Dr Thomas Cash, votre regard sur vous-même est global et fonctionnel : le corps est un véhicule de vie, non un objet d'exposition.",
      es: "Según el modelo de Thomas Cash, procesas tu imagen de forma global. Ves tu cuerpo como un vehículo de vida, no como un adorno a evaluar.",
    },
    actionProtocol: {
      en: [
        "Maintain body neutrality by appreciating bodily strength, mobility, and sensory vitality.",
        "Refrain from commenting excessively on others' physical appearance to reinforce healthy social norms.",
        "Use private journaling in Nuju to explore values and creative expressions beyond aesthetics.",
      ],
      id: [
        "Pertahankan netralitas tubuh dengan mensyukuri fungsi organ, kelenturan, dan vitalitas sensorik.",
        "Hindari mengomentari fisik orang lain untuk menciptakan lingkungan sosial yang suportif.",
        "Gunakan jurnal refleksi Nuju untuk memupuk nilai diri dan kreativitas di luar penampilan fisik.",
      ],
      de: [
        "Wertschätzen Sie Ihren Körper für seine Kraft und Leistungsfähigkeit.",
        "Vermeiden Sie oberflächliche Kommentare über das Aussehen anderer.",
        "Nutzen Sie Nuju, um innere Stärken und persönliche Werte zu vertiefen.",
      ],
      fr: [
        "Célébrez la force et la mobilité de votre corps plutôt que son image.",
        "Évitez de juger ou commenter le physique d'autrui au quotidien.",
        "Développez vos passions intérieures via le journal de réflexion Nuju.",
      ],
      es: [
        "Agradece a tu cuerpo por su energía, fuerza y funciones vitales.",
        "Evita comentar el físico de los demás para cultivar un entorno seguro.",
        "Explora tus talentos y valores profundos en tu diario personal Nuju.",
      ],
    },
  },

  {
    level: "mild_aesthetic_sensitivity",
    scoreRange: [9, 16],
    title: {
      en: "Mild Aesthetic Self-Consciousness",
      id: "Kecemasan Penampilan Ringan",
      de: "Leichte Ästhetische Verunsicherung",
      fr: "Conscience Esthétique Légère",
      es: "Inseguridad Estética Leve",
    },
    badge: {
      en: "Aesthetic Sensitivity",
      id: "Sensitivitas Estetika",
      de: "Leicht Selbstkritisch",
      fr: "Sensibilité Modérée",
      es: "Sensibilidad Estética",
    },
    summary: {
      en: "You occasionally feel dissatisfied with specific features, especially under harsh lighting or when browsing social media. However, you can generally disengage from mirror checking and engage comfortably in social life.",
      id: "Kamu sesekali merasa kurang puas dengan bagian fisik tertentu, terutama saat melihat foto atau media sosial. Namun, kamu masih bisa mengendalikan diri dan beraktivitas normal.",
      de: "Sie sind gelegentlich unzufrieden mit einzelnen Details, besonders bei Fotos oder Social Media. Ihr Alltag wird dadurch jedoch nicht lahmgelegt.",
      fr: "Vous ressentez des doutes passagers sur votre apparence, mais cela n'entrave pas vos relations ni votre quotidien.",
      es: "Experimentas inseguridades ocasionales con ciertos rasgos, pero logras desenvolverte socialmente sin mayor problema.",
    },
    psychology: {
      en: "This reflects normative societal discontent amplified by digital media. While not meeting clinical criteria for BDD, cultivating body neutrality now prevents vulnerability from hardening into compulsive checking loops.",
      id: "Ini adalah ketidakpuasan normatif akibat pengaruh media sosial. Melatih netralitas tubuh sejak dini akan mencegah kebiasaan ini berkembang menjadi obsesi kompulsif.",
      de: "Ein typisches Phänomen digitaler Medienkulturen. Achtsamkeit schützt davor, in chronische Kontrollschleifen abzudriften.",
      fr: "Une vulnérabilité courante alimentée par les réseaux sociaux. Pratiquer la neutralité corporelle protège contre l'escalade.",
      es: "Descontento corporal común potenciado por redes sociales. Entrenar la neutralidad previene bucles obsesivos.",
    },
    actionProtocol: {
      en: [
        "Limit exposure to heavily filtered social media feeds and influencer beauty standards.",
        "Practice mirror neutrality: glance in the mirror only for grooming, not for micro-defect scrutiny.",
        "Record 1-minute somatic grounding check-ins in Nuju when visual insecurity spikes.",
      ],
      id: [
        "Kurangi melihat akun media sosial yang sarat filter dan standar kecantikan artifisial.",
        "Terapkan aturan cermin netral: gunakan cermin hanya untuk merapikan diri, bukan mencari kekurangan.",
        "Catat refleksi suara singkat di Nuju ketika rasa minder mulai mengintai.",
      ],
      de: [
        "Reduzieren Sie Social-Media-Konsum mit Beauty-Filtern.",
        "Spiegelhygiene: Nutzen Sie Spiegel nur funktional, nicht zur Fehlerfahndung.",
        "Nutzen Sie Nuju-Sprachnotizen bei akuten Unsicherheitsgefühlen.",
      ],
      fr: [
        "Filtrez vos réseaux sociaux pour éloigner les standards irréalistes.",
        "Ne regardez le miroir que pour vous coiffer ou vous habiller.",
        "Déposez vos doutes dans le journal vocal Nuju pour désamorcer l'anxiété.",
      ],
      es: [
        "Limita el consumo de perfiles con filtros y estándares artificiales.",
        "Regla del espejo: úsalo solo para peinarte o vestirte, no para buscar defectos.",
        "Haz un registro de voz en Nuju para soltar la autocrítica física.",
      ],
    },
  },

  {
    level: "moderate_body_dysmorphic_friction",
    scoreRange: [17, 24],
    title: {
      en: "Moderate Body Dysmorphic Friction (BDD Spectrum)",
      id: "Gesekan Body Dysmorphia Sedang (Spektrum BDD)",
      de: "Moderate Körperdysmorphische Belastung",
      fr: "Friction Dysmorphophobique Modérée",
      es: "Fricción Dismórfica Corporal Moderada",
    },
    badge: {
      en: "BDD Friction",
      id: "Gesekan BDD",
      de: "BDD-Vorstufe",
      fr: "Friction Corporelle",
      es: "Fricción BDD",
    },
    summary: {
      en: "Perceived flaws occupy significant mental bandwidth. You frequently find yourself lost in mirror-checking rituals, comparing yourself painfully to others, and camouflaging features with clothes, poses, or makeup.",
      id: "Kekurangan fisik yang kamu rasakan mulai menyita banyak energi mental. Kamu sering terjebak ritual mengecek cermin, membandingkan diri secara menyiksa, dan menyamarkan fisik dengan pakaian atau riasan.",
      de: "Vermeintliche Makel binden viel seelische Energie. Sie verfangen sich in Spiegelkontrollen, quälenden Vergleichen und Tarnverhalten.",
      fr: "Vos défauts perçus monopolisent votre esprit. Les vérifications dans le miroir et le besoin de vous camoufler deviennent pesants.",
      es: "Tus defectos percibidos consumen gran energía mental. Caes con frecuencia en revisiones de espejo, comparaciones y camuflaje.",
    },
    psychology: {
      en: "Dr. Katharine Phillips (author of The Broken Mirror) emphasizes that in BDD, the visual cortex over-focuses on granular details while losing holistic context. You suffer from a perceptual distortion where minor details look magnified like under a microscope.",
      id: "Dr. Katharine Phillips menjelaskan bahwa dalam BDD, korteks visual otak terlalu fokus pada detail mikro dan kehilangan pandangan menyeluruh. Kamu mengalami distorsi persepsi di mana kekurangan kecil tampak seperti di bawah mikroskop.",
      de: "Laut Dr. Katharine Phillips verliert das Gehirn die ganzheitliche Sicht und zoomt wie ein Mikroskop auf winzige Unebenheiten.",
      fr: "Le Dr Katharine Phillips note qu'en dysmorphophobie, le cortex visuel sur-focalise sur le détail et perd la vue d'ensemble.",
      es: "La Dra. Katharine Phillips señala que en el TDL (BDD), el cerebro actúa como un microscopio que amplifica detalles ínfimos.",
    },
    actionProtocol: {
      en: [
        "Implement a strict 2-foot mirror rule: never inspect your face or skin closer than arm's length.",
        "Timebox mirror use to maximum 3 minutes per session to short-circuit compulsive scrutiny loops.",
        "Conduct compassionate body exposure in private audio journaling: voice your physical shame without censorship.",
      ],
      id: [
        "Terapkan aturan jarak cermin 60 cm: jangan pernah menatap wajah atau kulit lebih dekat dari panjang lengan.",
        "Batasi waktu bercermin maksimal 3 menit agar tidak terjebak ritual pencarian cacat.",
        "Lakukan dekompresi suara di Nuju: ungkapkan rasa malu fisik secara jujur untuk meredakan ketegangan sistem saraf.",
      ],
      de: [
        "60-cm-Spiegelregel: Betrachten Sie sich nie näher als eine Armlänge.",
        "Spiegelzeit auf maximal 3 Minuten begrenzen.",
        "Sprechen Sie Ihre Schamgefühle im geschützten Nuju-Journal aus.",
      ],
      fr: [
        "Règle des 60 cm : ne vous regardez jamais de plus près qu'une longueur de bras.",
        "Limitez le miroir à 3 minutes maximum par séance.",
        "Exprimez vos complexes dans Nuju pour libérer la charge émotionnelle.",
      ],
      es: [
        "Regla del brazo: no mires tu rostro ni piel más cerca de 60 centímetros.",
        "Pon un temporizador de 3 minutos al usar el espejo.",
        "Descarga tu vergüenza corporal en el diario de audio seguro de Nuju.",
      ],
    },
  },

  {
    level: "severe_bdd_preoccupation",
    scoreRange: [25, 31],
    title: {
      en: "Severe Body Dysmorphic Disorder (BDD) Preoccupation",
      id: "Obsesi Body Dysmorphic Disorder (BDD) Berat",
      de: "Schwere Körperdysmorphie (BDD-Syndrom)",
      fr: "Dysmorphophobie Sévère (Trouble BDD Avéré)",
      es: "Trastorno Dismórfico Corporal Severo (BDD)",
    },
    badge: {
      en: "Severe BDD Loop",
      id: "Loop BDD Berat",
      de: "Schwere BDD",
      fr: "BDD Sévère",
      es: "Bucle BDD Severo",
    },
    summary: {
      en: "Your life is substantially organized around your perceived physical defects. Agonizing mirror rituals, social isolation, dread of being seen in daylight, and desperate research into surgeries consume hours of your day.",
      id: "Hidupmu sebagian besar diatur oleh ketakutan akan kekurangan fisik. Ritual cermin yang menyiksa, isolasi sosial, takut terlihat di siang hari, dan pencarian operasi plastik menghabiskan berjam-jam harimu.",
      de: "Ihr Alltag wird von Ihren vermeintlichen Mängeln diktiert. Spiegelzwänge, sozialer Rückzug und Panik vor Tageslicht kosten täglich Stunden.",
      fr: "Votre quotidien est envahi par la détresse esthétique. Rituels de miroir interminables, isolement et honte dévorent votre énergie.",
      es: "Tu vida gira en torno a tus defectos percibidos. Rituales agotadores de espejo, aislamiento y pánico a la luz diurna dominan tus días.",
    },
    psychology: {
      en: "Clinical research shows that BDD involves severe hyperactivity in frontostriatal brain circuits and visual processing pathways. Reassurance from friends or cosmetic procedures does not heal BDD because the root pathology is in cognitive filtering, not physical anatomy.",
      id: "Riset klinis membuktikan BDD melibatkan hiperaktivitas sirkuit frontostriatal otak. Operasi atau pujian orang lain tidak akan menyembuhkan BDD karena masalah utamanya ada pada filter persepsi otak, bukan fisik.",
      de: "BDD beruht auf einer neurobiologischen Fehlverarbeitung in frontostriatalen Hirnkreisen. Kosmetische Eingriffe verschlimmern die Fixierung meist nur.",
      fr: "La recherche démontre une hyperactivité des circuits fronto-striataux. La chirurgie n'aide pas car le trouble est perceptuel et cognitif.",
      es: "El BDD involucra hiperactividad frontoestriatal. Las cirugías no curan el problema porque radica en el filtro cerebral, no en la piel.",
    },
    actionProtocol: {
      en: [
        "Consult a licensed psychologist specializing in ERP (Exposure and Response Prevention) and CBT for BDD.",
        "Remove magnifying mirrors and reduce bright fluorescent lighting in bathrooms.",
        "Halt all consultations for cosmetic or invasive surgeries until completing psychological treatment.",
        "Practice Somatic Vocal Grounding in Nuju: shift attention from visual evaluation to visceral bodily presence.",
      ],
      id: [
        "Konsultasikan dengan psikolog klinis berkeahlian terapi ERP (Exposure and Response Prevention) dan CBT.",
        "Singkirkan cermin pembesar dan redupkan pencahayaan tajam di kamar mandi.",
        "Tunda seluruh rencana prosedur kosmetik atau operasi plastik hingga terapi psikologis berjalan.",
        "Latih grounding vokal di Nuju: alihkan fokus dari penilaian visual ke kehadiran sensasi tubuh nyata.",
      ],
      de: [
        "Suchen Sie eine Psychotherapie mit Schwerpunkt ERP (Exposition mit Reaktionsverhinderung) auf.",
        "Verbannen Sie Vergrößerungsspiegel aus Ihrem Umfeld.",
        "Verschieben Sie alle kosmetischen Eingriffe konsequent.",
        "Nutzen Sie Nuju zur somatischen Erdung jenseits visueller Selbstbewertung.",
      ],
      fr: [
        "Consultez un thérapeute spécialisé en TCC et Exposition avec Prévention de la Réponse (EPR).",
        "Retirez tous les miroirs grossissants de votre domicile.",
        "Suspendez tout projet d'intervention esthétique.",
        "Pratiquez l'ancrage corporel dans Nuju pour reconnecter vos sens en douceur.",
      ],
      es: [
        "Acude a terapia cognitivo-conductual especializada en EPR (Exposición y Prevención de Respuesta).",
        "Elimina espejos de aumento y luces fluorescentes duras.",
        "Pospón cualquier intervención cosmética hasta completar el tratamiento.",
        "Usa el diario de voz Nuju para desplazar la atención de lo visual a la presencia corporal real.",
      ],
    },
  },

  {
    level: "acute_dysmorphic_paralysis",
    scoreRange: [32, 36],
    title: {
      en: "Acute Body Dysmorphic Paralysis & Severe Agoraphobia",
      id: "Kelumpuhan Body Dysmorphia Akut & Agorafobia Berat",
      de: "Akute Körperdysmorphische Paralyse & Agoraphobie",
      fr: "Paralysie Dysmorphophobique Aiguë & Isolement Total",
      es: "Parálisis Dismórfica Aguda & Aislamiento Severo",
    },
    badge: {
      en: "Acute BDD Crisis",
      id: "Krisis BDD Akut",
      de: "Akuter BDD-Notstand",
      fr: "Crise BDD Aiguë",
      es: "Crisis BDD Extrema",
    },
    summary: {
      en: "You are experiencing profound psychological incapacitation. The conviction of physical monstrousness has driven you into seclusion, job disruption, or complete inability to leave your home. Severe depression and despair are acute.",
      id: "Kamu mengalami kelumpuhan psikologis mendalam. Keyakinan bahwa fisikmu rusak parah telah memicu pengurungan diri di rumah, hilangnya pekerjaan, atau ketidakmampuan berinteraksi dengan dunia luar.",
      de: "Sie befinden sich in schwerer seelischer Not. Die Überzeugung, entstellt zu sein, führt zu völligem Rückzug, Arbeitsunfähigkeit und tiefer Verzweiflung.",
      fr: "Vous traversez une détresse extrême. La certitude d'une difformité vous enferme chez vous et paralyse toute votre existence.",
      es: "Te encuentras en una crisis psicológica devastadora. El pánico a tu aspecto te ha llevado al encierro absoluto y a un sufrimiento desgarrador.",
    },
    psychology: {
      en: "This extreme clinical presentation carries high risks of severe clinical depression and suicidal ideation. Immediate multidisciplinary care (psychiatry, specialized CBT-BDD, and supportive family systems) is critical to stabilize safety and restore reality testing.",
      id: "Kondisi ekstrem ini memerlukan pendampingan medis dan psikologis segera. Bantuan psikiatri dan terapi intensif sangat penting untuk memulihkan rasa aman dan fungsi hidup.",
      de: "Dieses Stadium erfordert umgehende professionelle psychiatrische und psychotherapeutische Hilfe zur Krisenintervention.",
      fr: "Cette situation nécessite une prise en charge médicale et psychiatrique urgente pour briser l'isolement et sécuriser le patient.",
      es: "Requiere atención psiquiátrica y psicoterapéutica inmediata para garantizar tu seguridad y aliviar el sufrimiento agudo.",
    },
    actionProtocol: {
      en: [
        "Immediate Specialized Medical Contact: Reach out to a psychiatric clinic or BDD specialty center today.",
        "Cover or remove primary bathroom mirrors temporarily to halt traumatic panic escalation.",
        "Confide in a trusted loved one or counselor that you are trapped in a severe BDD spiral.",
        "Use Nuju as an encrypted audio sanctuary to release overwhelming grief and panic without visual cues.",
      ],
      id: [
        "Segera hubungi psikiater atau layanan kesehatan mental terdekat hari ini.",
        "Tutup cermin utama untuk sementara waktu demi menghentikan eskalasi serangan panik.",
        "Bicaralah kepada orang terdekat yang kamu percaya bahwa kamu sedang terjebak krisis BDD berat.",
        "Gunakan Nuju sebagai tempat mencurahkan air mata dan kepanikan tanpa perlu melihat bayangan wajah.",
      ],
      de: [
        "Wenden Sie sich unverzüglich an eine psychiatrische Fachklinik oder Krisenanlaufstelle.",
        "Spiegel im Badezimmer vorübergehend abdecken.",
        "Vertrauen Sie sich einer nahestehenden Bezugsperson an.",
        "Nutzen Sie Nuju als reinen Audio-Zufluchtsort ohne visuelle Reize.",
      ],
      fr: [
        "Contactez sans attendre un centre spécialisé ou une consultation psychiatrique d'urgence.",
        "Couvrez temporairement les miroirs de votre logement.",
        "Parlez de votre détresse à un proche bienveillant.",
        "Déposez votre souffrance dans l'espace vocal sécurisé de Nuju.",
      ],
      es: [
        "Contacta de inmediato con una clínica psiquiátrica o profesional de salud mental.",
        "Cubre los espejos de tu casa temporalmente para cortar las crisis de pánico.",
        "Pide apoyo a un ser querido de confianza.",
        "Usa Nuju como santuario de voz para desahogarte sin estímulos visuales.",
      ],
    },
  },
];

export const BODY_DYSMORPHIA_OPTIONS = [
  {
    value: 0,
    label: {
      en: "Never / Rarely (0 pts)",
      id: "Tidak Pernah / Jarang (0 poin)",
      de: "Nie / Selten (0 Pkt.)",
      fr: "Jamais / Rarement (0 pt)",
      es: "Nunca / Raras veces (0 pts)",
    },
  },
  {
    value: 1,
    label: {
      en: "Sometimes / Mildly (1 pt)",
      id: "Kadang-kadang / Ringan (1 poin)",
      de: "Manchmal / Leicht (1 Pkt.)",
      fr: "Parfois / Légèrement (1 pt)",
      es: "A veces / Levemente (1 pt)",
    },
  },
  {
    value: 2,
    label: {
      en: "Often / Moderately (2 pts)",
      id: "Sering / Sedang (2 poin)",
      de: "Oft / Mäßig (2 Pkt.)",
      fr: "Souvent / Modérément (2 pts)",
      es: "A menudo / Moderado (2 pts)",
    },
  },
  {
    value: 3,
    label: {
      en: "Almost Constantly / Severely (3 pts)",
      id: "Hampir Selalu / Sangat Berat (3 poin)",
      de: "Fast ständig / Schwer (3 Pkt.)",
      fr: "Presque constamment / Sévèrement (3 pts)",
      es: "Casi constantemente / Grave (3 pts)",
    },
  },
];

export const BODY_DYSMORPHIA_SUBSCALE_INFO = {
  flaw_magnification: {
    name: {
      en: "Perceived Flaw Magnification & Catastrophizing",
      id: "Pembesaran Kekurangan Fisik & Katastrofisasi",
      de: "Makel-Vergrößerung & Katastrophisieren",
      fr: "Focalisation sur le Défaut & Catastrophisme",
      es: "Magnificación del Defecto & Catastrofismo",
    },
    description: {
      en: "Obsessive cognitive zooming on granular body features, believing they are grotesque and ruin self-worth.",
      id: "Pikiran terfokus obsesif pada detail kecil tubuh, menganggapnya rusak dan menghancurkan harga diri.",
      de: "Zwanghafte Detailfixierung auf angebliche Mängel mit dramatischem Selbstwertverlust.",
      fr: "Obsession pour un détail physique jugé difforme, ruinant l'estime personnelle.",
      es: "Fijación obsesiva en rasgos concretos, creyendo que arruinan por completo la valía personal.",
    },
  },
  mirror_checking: {
    name: {
      en: "Compulsive Mirror Checking & Avoidance",
      id: "Pengecekan Cermin Kompulsif & Penghindaran",
      de: "Zwanghafte Spiegelkontrolle & Meidung",
      fr: "Vérifications Compulsives au Miroir & Évitement",
      es: "Revisión Compulsiva del Espejo & Evitación",
    },
    description: {
      en: "Getting trapped in 20+ minute reflection scrutiny or fleeing mirrors entirely to avoid acute panic.",
      id: "Terjebak menatap cermin berlama-lama atau justru takut melihat cermin demi menghindari serangan panik.",
      de: "Endlose Spiegelrituale oder panisches Vermeiden jedes Blicks ins Spiegelbild.",
      fr: "Rituels prolongés devant la glace ou phobie totale de son propre reflet.",
      es: "Rituales interminables frente al espejo o fobia absoluta a ver el propio reflejo.",
    },
  },
  social_camouflaging: {
    name: {
      en: "Camouflaging & Social Avoidance Paralysis",
      id: "Penyamaran Fisik & Penarikan Diri Sosial",
      de: "Tarnverhalten & Sozialer Rückzug",
      fr: "Camouflage & Isolement Social",
      es: "Camuflaje & Aislamiento Social",
    },
    description: {
      en: "Using clothes, filters, and postures to hide from others, resulting in photo dread and canceling social plans.",
      id: "Memakai baju khusus, filter, atau riasan untuk menyembunyikan fisik, berujung pada takut difoto dan menarik diri.",
      de: "Verstecken hinter Make-up oder Kleidung, Angst vor Fotos und Absagen sozialer Kontakte.",
      fr: "Utilisation d'artifices pour se cacher, terreur d'être photographié(e) et annulation de sorties.",
      es: "Uso de ropa y filtros para ocultarse, pavor a las fotos y cancelación de compromisos sociales.",
    },
  },
};

export function getBodyDysmorphiaResult(totalScore: number): BodyDysmorphiaResultLevel {
  const clamped = Math.max(0, Math.min(36, totalScore));
  return (
    BODY_DYSMORPHIA_RESULTS.find(
      (r) => clamped >= r.scoreRange[0] && clamped <= r.scoreRange[1]
    ) || BODY_DYSMORPHIA_RESULTS[0]
  );
}

export function calculateBodyDysmorphiaSubscales(answers: Record<number, number>): {
  flaw_magnification: number;
  mirror_checking: number;
  social_camouflaging: number;
} {
  let f = 0;
  let m = 0;
  let s = 0;

  BODY_DYSMORPHIA_QUESTIONS.forEach((q) => {
    const score = answers[q.id] ?? 0;
    if (q.subscale === "flaw_magnification") f += score;
    if (q.subscale === "mirror_checking") m += score;
    if (q.subscale === "social_camouflaging") s += score;
  });

  return {
    flaw_magnification: f,
    mirror_checking: m,
    social_camouflaging: s,
  };
}
