export type SomniphobiaCardLang = "en" | "id" | "de" | "fr" | "es";

export interface SomniphobiaQuestion {
  id: number;
  subscale:
    | "bedtime_anticipatory_panic"
    | "loss_of_control_dread"
    | "insomnia_performance_anxiety";
  text: Record<SomniphobiaCardLang, string>;
}

export interface SomniphobiaResultLevel {
  level:
    | "restful_circadian_trust"
    | "mild_evening_hesitation"
    | "moderate_sleep_anticipatory_anxiety"
    | "high_somniphobia_sleep_dread"
    | "acute_nocturnal_panic_phobic_insomnia";
  scoreRange: [number, number];
  title: Record<SomniphobiaCardLang, string>;
  badge: Record<SomniphobiaCardLang, string>;
  summary: Record<SomniphobiaCardLang, string>;
  psychology: Record<SomniphobiaCardLang, string>;
  actionProtocol: Record<SomniphobiaCardLang, string[]>;
}

export const SOMNIPHOBIA_QUESTIONS: SomniphobiaQuestion[] = [
  // 1. Bedtime Anticipatory Panic
  {
    id: 1,
    subscale: "bedtime_anticipatory_panic",
    text: {
      en: "As evening approaches (around 9-10 PM), my chest tightens, my heart rate accelerates, and a rising sense of dread grips me about having to sleep.",
      id: "Menjelang malam (sekitar jam 9-10 malam), dadaku terasa sesak, detak jantung meningkat, dan rasa cemas mendalam mulai mencengkeram saat membayangkan harus tidur.",
      de: "Wenn der Abend naht (ab 21-22 Uhr), schnürt sich meine Brust zusammen, der Puls steigt und eine spürbare Beklemmung vor dem Zubettgehen erfasst mich.",
      fr: "À mesure que la soirée avance (vers 21h-22h), ma poitrine se serre, mon pouls s'accélère et une angoisse sourde monte à l'idée d'aller dormir.",
      es: "Al caer la noche (hacia las 9-10 PM), siento opresión en el pecho, taquicardia y una angustia creciente ante la perspectiva de tener que dormir.",
    },
  },
  // 2. Loss of Control Dread
  {
    id: 2,
    subscale: "loss_of_control_dread",
    text: {
      en: "The thought of losing conscious control and surrendering to unconsciousness terrifies me, causing me to jolt awake just as I start to doze off.",
      id: "Pikiran tentang kehilangan kontrol sadar dan terlelap membuatku takut, hingga tubuhku tersentak kaget dan bangun tepat saat baru mulai tertidur.",
      de: "Der Gedanke, die bewusste Kontrolle zu verlieren und wegzudämmern, löst Panik aus, sodass mein Körper kurz vor dem Einschlafen hochschreckt.",
      fr: "L'idée de perdre le contrôle conscient et d'abandonner mon esprit au sommeil me terrifie, me faisant sursauter dès que je commence à m'assoupir.",
      es: "La idea de perder el control consciente y abandonarme al sueño me aterra, provocando que me sobresalte justo cuando empezaba a dormirme.",
    },
  },
  // 3. Insomnia Performance Anxiety
  {
    id: 3,
    subscale: "insomnia_performance_anxiety",
    text: {
      en: "I compulsively check the clock in the dark, doing frantic mental math on how few hours are left and panicking about being exhausted tomorrow.",
      id: "Aku kompulsif melihat jam dalam gelap, menghitung secara panik sisa jam tidur, dan cemas luar biasa memikirkan betapa hancurnya energiku besok.",
      de: "Ich blicke im Dunkeln zwanghaft auf die Uhr, rechne panisch die verbleibenden Schlafstunden aus und fürchte totale Erschöpfung am nächsten Tag.",
      fr: "Je regarde compulsivement l'heure dans le noir, calculant avec angoisse les heures de sommeil restantes et redoutant l'épuisement du lendemain.",
      es: "Miro compulsivamente el reloj en la oscuridad, calculando con desesperación las pocas horas que me quedan y temiendo el agotamiento de mañana.",
    },
  },
  // 4. Bedtime Anticipatory Panic
  {
    id: 4,
    subscale: "bedtime_anticipatory_panic",
    text: {
      en: "I deliberately delay going to bed (doomscrolling, cleaning, working) just to postpone entering the bedroom and facing the silence.",
      id: "Aku sengaja menunda-nunda tidur (scrolling medsos tanpa henti, beres-beres, kerja) demi menunda masuk kamar dan menghadapi kesunyian.",
      de: "Ich zögere das Zubettgehen absichtlich hinaus (Social Media, Aufräumen, Arbeiten), nur um der Stille des Schlafzimmers zu entgehen.",
      fr: "Je retarde délibérément le coucher (écrans, ménage, travail) uniquement pour repousser le moment d'affronter le silence de la chambre.",
      es: "Pospongo deliberadamente ir a la cama (redes sociales, limpiar, trabajar) con tal de aplazar el silencio y la quietud del dormitorio.",
    },
  },
  // 5. Loss of Control Dread
  {
    id: 5,
    subscale: "loss_of_control_dread",
    text: {
      en: "I fear what might happen during the night—terrifying nightmares, sleep paralysis, panic attacks, or an irrational fear of not waking up.",
      id: "Aku takut apa yang mungkin terjadi di malam hari—mimpi buruk mengerikan, ketindihan (sleep paralysis), serangan panik, atau takut tak terbangun lagi.",
      de: "Ich fürchte, was nachts geschehen könnte: Alpträume, Schlafparalyse, Panikattacken oder die irrationale Furcht, nicht mehr aufzuwachen.",
      fr: "Je redoute ce qui pourrait se passer la nuit : cauchemars terrifiants, paralysie du sommeil, crises de panique ou peur de ne plus me réveiller.",
      es: "Temo lo que pueda ocurrir durante la noche: pesadillas vívidas, parálisis del sueño, ataques de pánico o el miedo irracional a no despertar.",
    },
  },
  // 6. Insomnia Performance Anxiety
  {
    id: 6,
    subscale: "insomnia_performance_anxiety",
    text: {
      en: "I put immense pressure on myself that I 'must fall asleep right now', which triggers a surge of adrenaline and makes sleep impossible.",
      id: "Aku menuntut diriku sendiri bahwa aku 'harus tidur detik ini juga', yang justru memicu lonjakan adrenalin dan membuat tidur mustahil.",
      de: "Ich setze mich extrem unter Druck, 'jetzt sofort einschlafen zu müssen', was Adrenalin freisetzt und das Einschlafen völlig blockiert.",
      fr: "Je me mets une pression énorme pour 'm'endormir immédiatement', ce qui libère de l'adrénaline et rend le sommeil totalement impossible.",
      es: "Me exijo con desesperación que 'debo dormirme ya mismo', lo que desencadena una descarga de adrenalina que bloquea el sueño.",
    },
  },
  // 7. Bedtime Anticipatory Panic
  {
    id: 7,
    subscale: "bedtime_anticipatory_panic",
    text: {
      en: "Just seeing my bed or stepping into the bedroom triggers an automatic threat reflex, as if the room is a battleground rather than a haven.",
      id: "Melihat kasur atau melangkah ke dalam kamar tidur saja langsung memicu refleks ancaman otomatis, seolah tempat tidur adalah medan tempur.",
      de: "Schon der Anblick des Bettes oder das Betreten des Schlafzimmers löst Alarmbereitschaft aus – als wäre das Bett ein Ort des Kampfes.",
      fr: "Le simple fait de voir mon lit ou d'entrer dans ma chambre déclenche un réflexe d'alerte, comme si le lit était une zone de combat.",
      es: "El mero hecho de ver mi cama o entrar a la habitación activa una alarma automática, como si fuera un campo de batalla en vez de un refugio.",
    },
  },
  // 8. Loss of Control Dread
  {
    id: 8,
    subscale: "loss_of_control_dread",
    text: {
      en: "Natural physical sensations of falling asleep (slowing pulse, heavy limbs, twilight thoughts) feel like a medical emergency rather than relaxation.",
      id: "Sensasi fisik alami saat mulai tertidur (denyut nadi melambat, tubuh terasa berat, pikiran melayang) kurasakan seperti kondisi darurat medis.",
      de: "Natürliche Einschlafsymptome (langsamerer Puls, schwere Gliedmaßen, dämmernde Gedanken) interpretiere ich als lebensbedrohliche Gefahr.",
      fr: "Les sensations physiques naturelles de l'endormissement (ralentissement du cœur, lourdeur du corps) me semblent être une urgence médicale.",
      es: "Las sensaciones físicas normales del adormecimiento (pulso lento, pesadez corporal, divagación) las interpreto como una urgencia médica.",
    },
  },
  // 9. Insomnia Performance Anxiety
  {
    id: 9,
    subscale: "insomnia_performance_anxiety",
    text: {
      en: "I catastrophize that not sleeping will destroy my immune system, ruin my career performance tomorrow, or cause a mental breakdown.",
      id: "Aku membayangkan skenario bencana bahwa tidak bisa tidur akan merusak daya tahan tubuhku, mengacaukan karir esok hari, atau merusak kejiwaanku.",
      de: "Ich katastrophisiere, dass Schlafmangel mein Immunsystem zerstört, meinen Job ruiniert oder zu einem psychischen Zusammenbruch führt.",
      fr: "Je dramatise en pensant que le manque de sommeil va détruire ma santé, ruiner mes projets du lendemain ou me rendre fou.",
      es: "Catastrofizo pensando que no dormir destruirá mi sistema inmune, arruinará mi trabajo mañana o me provocará un colapso mental.",
    },
  },
  // 10. Bedtime Anticipatory Panic
  {
    id: 10,
    subscale: "bedtime_anticipatory_panic",
    text: {
      en: "When the lights go out, intrusive worries and catastrophic scenarios flood my mind, becoming louder and more terrifying than during the day.",
      id: "Ketika lampu dimatikan, kekhawatiran intrusif dan skenario malapetaka membanjiri kepalaku, terasa jauh lebih bising dibanding siang hari.",
      de: "Sobald das Licht erlischt, überfluten mich quälende Sorgen und Katastrophenszenarien, die viel lauter wirken als am Tag.",
      fr: "Dès que la lumière s'éteint, des pensées intrusives et des scénarios catastrophes déferlent dans mon esprit avec une intensité décuplée.",
      es: "En cuanto apago la luz, pensamientos intrusivos y catástrofes imaginarias inundan mi mente, sintiéndose mucho más reales que de día.",
    },
  },
  // 11. Loss of Control Dread
  {
    id: 11,
    subscale: "loss_of_control_dread",
    text: {
      en: "I keep lights on, watch videos, or listen to constant audio all night because absolute silence and darkness in bed trigger acute claustrophobic panic.",
      id: "Aku membiarkan lampu menyala, menonton video, atau mendengar suara semalaman karena gelap dan hening total di kasur memicu kepanikan luar biasa.",
      de: "Ich lasse Licht, Videos oder Podcasts die ganze Nacht laufen, weil völlige Dunkelheit und Stille beklemmende Panikgefühle wecken.",
      fr: "Je garde la lumière allumée ou un podcast en continu car le noir total et le silence dans le lit provoquent chez moi une panique étouffante.",
      es: "Dejo la luz encendida o un audio sonando toda la noche porque la oscuridad absoluta y el silencio en la cama me provocan pánico asfixiante.",
    },
  },
  // 12. Insomnia Performance Anxiety
  {
    id: 12,
    subscale: "insomnia_performance_anxiety",
    text: {
      en: "I have rigid pre-sleep rituals and feel extreme frustration or despair if even the slightest disturbance threatens my chances of falling asleep.",
      id: "Aku memiliki ritual sebelum tidur yang kaku dan merasa sangat frustrasi atau putus asa jika ada gangguan kecil yang mengancam peluangku untuk tidur.",
      de: "Ich pflege starre Abendrituale und empfinde sofortige Verzweiflung oder Wut, wenn die geringste Störung mein Einschlafen gefährdet.",
      fr: "J'ai des rituels de coucher rigides et je ressens un désespoir profond si le moindre bruit ou imprévu vient compromettre mon sommeil.",
      es: "Mantengo rituales nocturnos rígidos y siento una profunda desesperación o frustración si el menor imprevisto amenaza mi descanso.",
    },
  },
];

export const SOMNIPHOBIA_OPTIONS = [
  {
    value: 0,
    label: {
      en: "Never / Not at all (Peaceful relationship with bedtime)",
      id: "Tidak Pernah / Sama Sekali Tidak (Hubungan tenang dengan waktu tidur)",
      de: "Nie / Gar nicht (Entspanntes Verhältnis zum Schlafengehen)",
      fr: "Jamais / Pas du tout (Relation sereine avec le coucher)",
      es: "Nunca / Para nada (Relación tranquila con el descanso)",
    },
  },
  {
    value: 1,
    label: {
      en: "Rarely / Mild (Occasional slight hesitation before sleep)",
      id: "Jarang / Ringan (Sesekali ada sedikit keraguan atau overthinking ringan)",
      de: "Selten / Mild (Gelegentliches leichtes Zögern oder Grübeln)",
      fr: "Rarement / Léger (Légère hésitation ou pensées passagères)",
      es: "Raras veces / Leve (Dudas leves o rumiación ocasional)",
    },
  },
  {
    value: 2,
    label: {
      en: "Frequently / Moderate (Noticable bedtime anxiety and clock-checking)",
      id: "Sering / Sedang (Kecemasan malam hari nyata dan sering cek jam)",
      de: "Häufig / Moderat (Spürbare abendliche Anspannung und Uhrenblick)",
      fr: "Souvent / Modéré (Tension nocturne nette et contrôle de l'heure)",
      es: "Frecuentemente / Moderado (Ansiedad nocturna evidente y mirar el reloj)",
    },
  },
  {
    value: 3,
    label: {
      en: "Daily / Severe Panic (Acute sleep dread, panic jolts, night dread)",
      id: "Hampir Setiap Hari / Parah (Panik akut saat mau tidur, tersentak bangun, takut malam)",
      de: "Täglich / Schwer (Akute Angst vor dem Einschlafen, Panikschreck, Schlafangst)",
      fr: "Quotidien / Sévère (Peur panique d'aller au lit, sursauts, détresse nocturne)",
      es: "A diario / Severo (Pánico agudo a dormir, sobresaltos, fobia nocturna)",
    },
  },
];

export const SOMNIPHOBIA_RESULTS: SomniphobiaResultLevel[] = [
  {
    level: "restful_circadian_trust",
    scoreRange: [0, 6],
    title: {
      en: "Restful Circadian Trust (Safe Sleep State)",
      id: "Kepercayaan Sirkadian Nyaman (Pola Tidur Aman)",
      de: "Erholsames zirkadianes Vertrauen (Sicherer Schlafzustand)",
      fr: "Confiance Circadienne Sereine (Sommeil Sécurisant)",
      es: "Confianza Circadiana Serena (Descanso Seguro)",
    },
    badge: {
      en: "Circadian Trust (0-16%)",
      id: "Kepercayaan Sirkadian (0-16%)",
      de: "Zirkadianes Vertrauen",
      fr: "Confiance Circadienne",
      es: "Confianza Circadiana",
    },
    summary: {
      en: "You view your bed as a restorative haven of safety and biological renewal. You do not suffer from anticipatory bedtime panic, nocturnal panic jolts, or catastrophic clock calculations. Sleep occurs as a natural surrender rather than a forced performance.",
      id: "Kamu memandang kasur sebagai tempat pemulihan yang aman dan menenangkan. Kamu tidak mengalami panik menjelang tidur, tersentak saat terlelap, atau overthinking menghitung jam tidur. Tidur terjadi secara alami tanpa paksaan performa.",
      de: "Sie erleben Ihr Bett als geschützten Zufluchtsort. Es gibt keine abendliche Panik, kein quälendes Uhrenrechnen und keine Furcht vor Kontrollverlust. Das Einschlafen gelingt Ihnen als natürliches Loslassen.",
      fr: "Vous percevez votre lit comme un sanctuaire de repos et de régénération. Vous ne souffrez d'aucune angoisse du coucher ni de calculs obsessionnels. L'endormissement se fait naturellement dans le lâcher-prise.",
      es: "Ves tu cama como un remanso seguro de descanso. No experimentas pánico anticipatorio, cálculos obsesivos del reloj ni miedo a perder el control. El sueño fluye como una entrega natural.",
    },
    psychology: {
      en: "Dr. Charles Morin's Insomnia Cognitive Model (1993) highlights that healthy sleepers treat sleep as an involuntary autonomic function. Parasympathetic tone engages effortlessly without conditioned bed-threat arousal.",
      id: "Model Kognitif Insomnia Dr. Charles Morin (1993) menunjukkan bahwa orang dengan tidur sehat memperlakukan tidur sebagai proses otonom alami tanpa aktivasi alarm bahaya terkondisi.",
      de: "Morins kognitives Modell: Gesunde Schläfer betrachten Schlaf als unwillkürlichen Prozess. Das parasympathische Nervensystem übernimmt ohne konditionierte Schlafzimmer-Alarmierung.",
      fr: "Modèle cognitif de Morin (1993) : Le sommeil est abordé comme une fonction autonome naturelle, sans hypervigilance conditionnée de la chambre.",
      es: "Modelo de Morin (1993): El descanso se asume como una función biológica autónoma, sin activación de alarma en el entorno del dormitorio.",
    },
    actionProtocol: {
      en: [
        "Maintain Sleep Hygiene: Keep regular wake-up times to preserve strong homeostatic sleep pressure.",
        "Evening Wind-Down: Protect the 60 minutes before bed from intense work demands or blue-light stimulation.",
        "Reflective Voice Check-in: Use Nuju voice journaling in the late afternoon to offload lingering daytime thoughts.",
      ],
      id: [
        "Pertahankan Ritme Tidur: Bangun pada jam yang sama setiap pagi untuk menjaga tekanan homeostatis tidur.",
        "Periode Tenang: Lindungi 60 menit sebelum tidur dari pekerjaan berat atau paparan layar berlebihan.",
        "Curhat Sore di Nuju: Gunakan voice journal Nuju di sore hari untuk meluapkan beban pikiran harian lebih awal.",
      ],
      de: [
        "Schlafrhythmus wahren: Regelmäßige Aufstehzeiten festigen den Schlafdruck.",
        "Abendlicher Ausklang: Die letzte Stunde vor dem Schlaf frei von fordernder Arbeit halten.",
        "Sprachnotiz in Nuju: Gedanken am Nachmittag per Sprachjournal festhalten.",
      ],
      fr: [
        "Rythme régulier : Se lever à heures fixes pour stabiliser la pression de sommeil.",
        "SAS de décompression : Éviter le travail intense 1 heure avant d'aller au lit.",
        "Décharge mentale Nuju : Poser ses réflexions vocales en fin d'après-midi.",
      ],
      es: [
        "Horarios regulares: Mantén horas de despertar constantes para afianzar el ritmo circadiano.",
        "Transición nocturna: Protege la hora previa al sueño de exigencias laborales intensas.",
        "Vaciado mental en Nuju: Graba tus notas de voz al final de la tarde.",
      ],
    },
  },
  {
    level: "mild_evening_hesitation",
    scoreRange: [7, 13],
    title: {
      en: "Mild Evening Hesitation (Pre-Sleep Rumination)",
      id: "Keraguan Malam Ringan (Ruminasi Jelang Tidur)",
      de: "Milde abendliche Unruhe (Einschlaf-Grübeln)",
      fr: "Hésitation Nocturne Légère (Ruminations du Soir)",
      es: "Inquietud Nocturna Leve (Rumiación Previa al Sueño)",
    },
    badge: {
      en: "Mild Hesitation (19-36%)",
      id: "Keraguan Ringan (19-36%)",
      de: "Milde Unruhe",
      fr: "Hésitation Légère",
      es: "Inquietud Leve",
    },
    summary: {
      en: "You experience occasional friction when transitioning from active day to quiet night. You might linger on your phone or feel a subtle wave of restlessness as bedtime nears, but your nervous system is generally able to settle into sleep within 30-40 minutes.",
      id: "Kamu terkadang merasakan gesekan saat bertransisi dari kesibukan siang ke ketenangan malam. Kamu mungkin sedikit bermain ponsel atau merasakan gelombang gelisah ringan, namun sistem sarafmu biasanya mampu tenang dan tidur dalam 30-40 menit.",
      de: "Sie spüren gelegentlich Widerstand beim Wechsel vom Tag zur Nachtruhe. Vielleicht greifen Sie zum Smartphone oder grübeln über offene Aufgaben, finden aber meist innerhalb von 30-40 Minuten in den Schlaf.",
      fr: "Vous ressentez parfois une friction lors de la transition vers la nuit. Vous avez tendance à consulter votre téléphone ou à cogiter, mais votre sommeil s'installe généralement en 30 à 40 minutes.",
      es: "Notas cierta resistencia al pasar de la actividad diurna al silencio nocturno. Puedes quedarte mirando el móvil o repasando pendientes, pero logras dormirte en unos 30-40 minutos.",
    },
    psychology: {
      en: "Mild autonomic arousal caused by unfinished cognitive open loops (the Zeigarnik effect). The nervous system remains slightly mobilized in sympathetic alertness before melatonin downregulates vigilance.",
      id: "Aktivasi simpatik ringan akibat urusan pikiran yang belum tuntas (Efek Zeigarnik). Otak masih mempertahankan kewaspadaan sebelum pelepasan melatonin menenangkan sistem saraf.",
      de: "Leichte Erregung durch unvollendete Gedanken (Zeigarnik-Effekt). Das Nervensystem verharrt in sympathischer Wachheit, bevor Melatonin die Aktivität drosselt.",
      fr: "Hyperactivité cognitive légère due à des boucles ouvertes non résolues (effet Zeigarnik), maintenant l'organisme en éveil.",
      es: "Activación simpática moderada por tareas pendientes no resueltas (efecto Zeigarnik) antes de que el descanso tome el relevo.",
    },
    actionProtocol: {
      en: [
        "Worry Journaling Brain Dump: Write or voice record all unresolved tasks 2 hours before bed so your brain feels safe closing loops.",
        "Establish an Analog Anchor: Read physical print or listen to gentle soundscapes rather than interactive scrolling.",
        "Reframe Bedtime: Remind yourself that quiet resting with eyes closed restores 80% of energy even without immediate sleep.",
      ],
      id: [
        "Brain Dump Sebelum Tidur: Tulis atau rekam semua beban pikiran 2 jam sebelum tidur agar otak merasa 'tugas selesai'.",
        "Jangkar Analog: Baca buku fisik atau dengarkan suara alam yang menenangkan alih-alih scrolling layar interaktif.",
        "Reframe Istirahat: Sadari bahwa rebahan tenang dengan mata terpejam sudah memulihkan 80% energi fisik tubuh.",
      ],
      de: [
        "Gedanken-Entlastung: 2 Stunden vor dem Schlafen Sorgen notieren, um die offenen Schleifen im Gehirn zu schließen.",
        "Analoge Routine: Echtes Buch lesen statt auf leuchtende Bildschirme zu blicken.",
        "Schlaf-Neubewertung: Ruhiges Dösen im Liegen regeneriert bereits 80 % der körperlichen Kraft.",
      ],
      fr: [
        "Décharge mentale anticipée : Noter ou enregistrer les soucis 2h avant de dormir pour fermer les boucles cognitives.",
        "Transition analogique : Privilégier un livre papier ou une ambiance sonore plutôt que le défilement d'écrans.",
        "Dédramatiser l'attente : Se rappeler que le simple repos éveillé offre déjà une grande part de récupération.",
      ],
      es: [
        "Vaciado cognitivo previo: Anota tus preocupaciones 2 horas antes de acostarte para cerrar ciclos mentales.",
        "Anclaje analógico: Lee un libro físico en lugar de deslizar el dedo por la pantalla.",
        "Reencuadre del reposo: Descansar en calma con los ojos cerrados ya aporta un gran porcentaje de recuperación.",
      ],
    },
  },
  {
    level: "moderate_sleep_anticipatory_anxiety",
    scoreRange: [14, 21],
    title: {
      en: "Moderate Sleep Anticipatory Anxiety (Bedtime Performance Trap)",
      id: "Kecemasan Antisipasi Tidur Sedang (Jebakan Performa Malam)",
      de: "Moderate Schlaferwartungsangst (Die Schlaf-Leistungsfalle)",
      fr: "Anxiété d'Anticipation du Sommeil (Piège de Performance)",
      es: "Ansiedad Anticipatoria Moderada (Trampa del Rendimiento)",
    },
    badge: {
      en: "Moderate Sleep Anxiety (39-58%)",
      id: "Cemas Tidur Sedang (39-58%)",
      de: "Moderate Schlafangst",
      fr: "Anxiété Modérée",
      es: "Ansiedad Moderada",
    },
    summary: {
      en: "You feel distinct dread in the hours leading up to bedtime. You obsessively monitor the clock, perform anxious sleep arithmetic ('If I fall asleep now, I get 5 hours'), and feel tension in your stomach and neck when stepping into the bedroom. The bed has begun to feel like a testing ground.",
      id: "Kamu merasakan kecemasan nyata beberapa jam menjelang tidur. Kamu sering menghitung jam secara panik ('Kalau tidur sekarang masih dapat 5 jam'), dan merasakan ketegangan di perut atau leher saat masuk kamar. Tempat tidur mulai terasa seperti ruang ujian yang menegangkan.",
      de: "Der Abend ist von spürbarer Anspannung geprägt. Sie rechnen zwanghaft Schlafstunden aus ('Wenn ich jetzt schlafe, habe ich noch 5 Stunden') und spüren körperliche Beklemmung beim Gang ins Schlafzimmer. Das Bett wird als Ort des Leistungsdrucks wahrgenommen.",
      fr: "La fin de journée s'accompagne d'une tension manifeste. Vous comptez anxieusement les heures restantes ('Si je m'endors maintenant, j'aurai 5 heures') et votre corps se crispe en entrant dans la chambre.",
      es: "Sientes una clara inquietud en las horas previas al descanso. Calculas obsesivamente las horas restantes y tu cuerpo se tensa al entrar al dormitorio, convirtiendo la cama en un lugar de exigencia.",
    },
    psychology: {
      en: "Colin Espie's Psychophysiological Insomnia Model (2002): Sleep effort is a paradox—the more consciously one tries to force sleep, the more cortical hyperarousal is triggered. Clock-monitoring acts as a maintenance factor fueling panic.",
      id: "Model Insomnia Psikofisiologis Colin Espie (2002): Usaha sadar untuk memaksa tidur justru memicu lonjakan korteks serebral (*hyperarousal*). Menatap jam terus-menerus bertindak sebagai bahan bakar kecemasan.",
      de: "Espies Modell der psychophysiologischen Insomnie: Die bewusste Anstrengung einzuschlafen triggert kortikales Hyperarousal. Der ständige Blick zur Uhr verstärkt den Kreislauf.",
      fr: "Modèle de Colin Espie (2002) : L'effort volontaire pour dormir est paradoxal et génère une hypervigilance cérébrale qui bloque l'endormissement.",
      es: "Modelo de Colin Espie (2002): El esfuerzo deliberado por dormir provoca una hiperactivación cortical que bloquea el descanso.",
    },
    actionProtocol: {
      en: [
        "Turn the Clock Face Away: Strictly remove all visible clock faces and time indicators from your sightline in the bedroom.",
        "Stimulus Control (20-Minute Rule): If awake and distressed for more than 20 minutes, get out of bed into dim light until sleepy.",
        "Release Sleep Effort in Nuju: Record a 60-second voice journal letting go of tomorrow's perfection before your head hits the pillow.",
      ],
      id: [
        "Putar Balik Arah Jam: Singkirkan semua tampilan jam dari jangkauan pandangan mata di kamar tidur.",
        "Kontrol Stimulus (Aturan 20 Menit): Jika terjaga dan gelisah lebih dari 20 menit, bangun dari kasur dan duduk di ruangan temaram hingga mengantuk.",
        "Lepaskan Beban di Nuju: Buat rekaman suara 60 detik di Nuju untuk melepaskan tuntutan performa esok hari sebelum tidur.",
      ],
      de: [
        "Uhren wegdrehen: Sämtliche Zeitanzeigen im Schlafzimmer konsequent aus dem Blickfeld verbannen.",
        "Stimulus-Kontrolle: Nach 20 Minuten unruhigem Wachliegen das Bett verlassen und bei gedämpftem Licht warten.",
        "Loslassen mit Nuju: 60 Sekunden Sprachjournaling zur Entlastung des nächsten Tages nutzen.",
      ],
      fr: [
        "Bannir l'horloge : Tourner ou masquer tous les réveils et affichages horaires de la chambre.",
        "Contrôle du stimulus : Quitter le lit après 20 minutes d'éveil agité et s'asseoir dans la pénombre.",
        "Lâcher-prise Nuju : Déposer ses attentes vocales en 1 minute avant de se coucher.",
      ],
      es: [
        "Ocultar el reloj: Gira o guarda cualquier indicador de hora fuera de tu campo visual.",
        "Control de estímulos: Si llevas 20 minutos desvelado y angustiado, sal de la cama a una zona en penumbra.",
        "Soltar el control en Nuju: Graba un audio de 60 segundos despidiendo la exigencia del día siguiente.",
      ],
    },
  },
  {
    level: "high_somniphobia_sleep_dread",
    scoreRange: [22, 29],
    title: {
      en: "High Somniphobia & Sleep Dread (Nocturnal Fear State)",
      id: "Somnifobia Tinggi & Teror Tidur (Kondisi Takut Malam Akut)",
      de: "Hohe Somniphobie & Schlafangst (Nächtlicher Angstzustand)",
      fr: "Somniphobie Élevée & Terreur du Sommeil (État d'Angoisse)",
      es: "Somnifobia Severa y Pavor al Sueño (Fobia Nocturna Aguda)",
    },
    badge: {
      en: "High Sleep Dread (61-80%)",
      id: "Teror Tidur Tinggi (61-80%)",
      de: "Hohe Schlafangst",
      fr: "Forte Somniphobie",
      es: "Fobia Nocturna Alta",
    },
    summary: {
      en: "You experience intense phobic dread of falling asleep. As you begin to drift off, sudden surges of panic, hypnic jerks, or heart racing shock you back into full alert. You deliberately delay sleep until exhausted, leave background lights/audio on all night, and view nighttime as an agonizing vulnerability trap.",
      id: "Kamu mengalami ketakutan fobia yang mendalam terhadap proses tidur. Saat mulai terlelap, sentakan panik tiba-tiba, kejang hipnik, atau detak jantung cepat mengejutkanmu kembali ke kewaspadaan penuh. Kamu sengaja menunda tidur hingga kelelahan ekstrem dan membiarkan lampu atau suara menyala.",
      de: "Sie erleben eine ausgeprägte phobische Furcht vor dem Einschlafen. Beim Übergang in den Schlaf reißen Sie plötzliche Panikschübe, Muskelzuckungen oder Herzrasen wach. Sie schieben das Schlafen bis zur totalen Erschöpfung auf und meiden Dunkelheit und Stille.",
      fr: "Vous vivez une véritable phobie de l'endormissement. Au moment de sombrer, des sursauts d'angoisse ou des palpitations vous réveillent brutalement. Vous retardez l'échéance jusqu'à épuisement total et gardez lumières ou bruits allumés.",
      es: "Sufres un miedo fóbico intenso a quedarte dormido. Al empezar a desconectar, sacudidas de pánico o palpitaciones te devuelven al estado de alerta. Posp शकता el sueño hasta el agotamiento extremo y necesitas luz o sonido encendido.",
    },
    psychology: {
      en: "Conditioned sympathetic hypervigilance. The brain's threat circuitry misinterprets natural parasympathetic downregulation (slowing heart rate, dissolving boundaries of ego) as physical asphyxiation, heart failure, or death, triggering acute nocturnal panic.",
      id: "Kewaspadaan simpatik terkondisi. Amigdala salah mengartikan penurunan denyut jantung dan hilangnya kendali ego sebagai ancaman kematian atau serangan jantung, sehingga menyemburkan adrenalin dan sentakan panik.",
      de: "Konditionierte Alarmbereitschaft: Das Angstzentrum deutet das natürliche Absinken von Puls und Muskeltonus fälschlich als Herz-Kreislauf-Versagen oder Kontrollverlust und feuert Adrenalin ab.",
      fr: "Hypervigilance sympathique conditionnée : Le cerveau interprète à tort le ralentissement cardiaque naturel comme un danger vital, déclenchant des décharges d'adrénaline au seuil du sommeil.",
      es: "Hipervigilancia simpática condicionada: Las amígdalas interpretan la disminución del pulso y la pérdida del control del ego como una amenaza vital, disparando adrenalina en la transición al sueño.",
    },
    actionProtocol: {
      en: [
        "Physiological Sighing at Bedtime: 2 deep inhales through the nose followed by a long, unforced mouth exhale to trigger immediate vagal braking.",
        "Decouple the Bed from Trauma: Never stay in bed battling panic. Shift to a comfortable armchair with a warm blanket until biological drowsiness arrives.",
        "Somatic Grounding with Nuju: Use Nuju guided night journaling to verbalize the fear: 'My body is safe. Dropping my guard is safe.'",
      ],
      id: [
        "Teknik Physiological Sigh: Tarik napas 2 kali lewat hidung lalu hembuskan panjang lewat mulut untuk mengaktifkan saraf vagus penenang.",
        "Pisahkan Kasur dari Medan Tempur: Jangan pernah bergulat panik di atas kasur. Pindahlah ke kursi empuk dengan selimut hangat hingga kantuk biologis datang.",
        "Afirmasi Somatik di Nuju: Gunakan voice journal Nuju untuk melafalkan: 'Tubuhku aman. Menurunkan kewaspadaan adalah hal yang aman.'",
      ],
      de: [
        "Physiologischer Seufzer: Zweimal kurz durch die Nase einatmen, lang durch den Mund ausatmen, um den Vagusnerv zu aktivieren.",
        "Schlafplatz entkoppeln: Bei Panik sofort das Bett verlassen. Auf einem Sessel mit Decke zur Ruhe kommen.",
        "Somatische Verankerung in Nuju: Per Sprachaufnahme verinnerlichen: 'Mein Körper ist in Sicherheit. Loslassen ist sicher.'",
      ],
      fr: [
        "Soupir physiologique : Double inspiration nasale suivie d'une longue expiration buccale pour stimuler le nerf vague.",
        "Dissocier le lit de la panique : Ne jamais rester au lit en état d'angoisse ; s'installer dans un fauteuil jusqu'au sommeil naturel.",
        "Ancrage somatique Nuju : Enregistrer vocalement : 'Mon corps est en sécurité. Je peux relâcher ma vigilance sans danger.'",
      ],
      es: [
        "Suspiro fisiológico: Doble inhalación por la nariz y exhalación lenta por la boca para activar el freno vagal.",
        "Desvincular la cama del pánico: Si sientes angustia, levántate a un sillón confortable hasta que el sueño surja solo.",
        "Anclaje vocal en Nuju: Verbaliza en la app: 'Mi cuerpo está a salvo. Bajar la guardia es seguro.'",
      ],
    },
  },
  {
    level: "acute_nocturnal_panic_phobic_insomnia",
    scoreRange: [30, 36],
    title: {
      en: "Acute Nocturnal Panic & Phobic Insomnia (Severe Somniphobia)",
      id: "Panik Nokturnal Akut & Insomnia Fobik (Somnifobia Parah)",
      de: "Akute nächtliche Panik & phobische Insomnie (Schwere Somniphobie)",
      fr: "Panique Nocturne Aiguë & Insomnie Phobique (Somniphobie Sévère)",
      es: "Pánico Nocturno Agudo e Insomnio Fóbico (Somnifobia Severa)",
    },
    badge: {
      en: "Severe Somniphobia (83-100%)",
      id: "Somnifobia Parah (83-100%)",
      de: "Schwere Somniphobie",
      fr: "Somniphobie Sévère",
      es: "Somnifobia Severa",
    },
    summary: {
      en: "Your relationship with sleep is in active clinical crisis. Nights represent an unbearable gauntlet of visceral panic attacks, choking sensations, terror of dying in sleep, and complete sleep avoidance until daytime sunlight brings relief. Bedtime produces profound autonomic trauma.",
      id: "Hubunganmu dengan tidur berada dalam krisis klinis akut. Malam hari terasa seperti mimpi buruk penuh serangan panik, rasa tercekik, takut meninggal saat tidur, dan penolakan tidur total hingga fajar menyingsing membawa rasa aman.",
      de: "Ihr Schlaf befindet sich in einer schweren Krise. Die Nacht wird als existenzielle Bedrohung erlebt – mit Panikattacken, Erstickungsängsten und phobischer Schlafvermeidung bis zum Morgengrauen.",
      fr: "Votre sommeil traverse une crise clinique aiguë. La nuit est vécue comme une épreuve insupportable faite d'attaques de panique, d'étouffement et d'évitement total du coucher jusqu'à l'aube.",
      es: "Tu relación con el sueño está en crisis severa. La noche se convierte en un calvario de ataques de pánico, sensación de asfixia y evitación fóbica hasta que la luz del día devuelve la calma.",
    },
    psychology: {
      en: "Severe conditioned phobia overlapping with panic disorder and trauma. The autonomic nervous system locks into extreme dorsal vagal shutdown / sympathetic storming upon nocturnal cues, requiring structured CBT-I (Cognitive Behavioral Therapy for Insomnia) and nervous system retraining.",
      id: "Fobia terkondisi berat yang bertumpang tindih dengan gangguan panik. Sistem saraf otonom terkunci dalam badai simpatik saat malam tiba, membutuhkan intervensi terstruktur seperti CBT-I (Cognitive Behavioral Therapy for Insomnia).",
      de: "Schwere konditionierte Phobie an der Schnittstelle zu Panikstörung. Erfordert spezialisierte kognitive Verhaltenstherapie für Insomnie (CBT-I) und somatische Reizentkopplung.",
      fr: "Phobie sévère associée à un trouble panique nocturne. Nécessite une prise en charge structurée en TCC de l'insomnie (TCC-I) pour reprogrammer la sécurité nocturne.",
      es: "Fobia condicionada severa combinada con trastorno de pánico. Requiere Terapia Cognitivo-Conductual para el Insomnio (TCC-I) y reentrenamiento del sistema nervioso.",
    },
    actionProtocol: {
      en: [
        "Consult a Sleep Psychologist / CBT-I Specialist: Seek evidence-based Cognitive Behavioral Therapy for Insomnia to desensitize the bed-threat association.",
        "Paradoxical Intention Practice: Deliberately try to stay awake comfortably without screens; removing the goal of sleep instantly dissolves performance panic.",
        "Emergency Night Companion in Nuju: Use Nuju's soothing audio check-in to hear grounding guidance during 3 AM panic spirals.",
      ],
      id: [
        "Konsultasi Profesional / Spesialis CBT-I: Cari psikolog klinis yang menguasai CBT-I untuk desensitisasi trauma asosiasi kasur dan kepanikan.",
        "Praktik Paradoks Niat (Paradoxical Intention): Sengaja cobalah untuk tetap terjaga dengan rileks tanpa layar; menghilangkan tuntutan tidur langsung melenyapkan panik performa.",
        "Teman Tenang Malam di Nuju: Buka Nuju saat panik jam 3 pagi untuk mendengarkan panduan afirmasi suara penenang jiwa.",
      ],
      de: [
        "Spezialisierte CBT-I-Therapie: Begleitung durch Schlafmediziner oder Psychotherapeuten zur Entkopplung des Schlafzimmer-Alarms.",
        "Paradoxe Intention: Bewusst versuchen, entspannt wach zu bleiben – nimmt sofort den Druck aus dem System.",
        "Nuju als nächtlicher Anker: Die beruhigenden Sprachfunktionen bei nächtlicher Panik um 3 Uhr morgens nutzen.",
      ],
      fr: [
        "Consulter un spécialiste TCC-I : Suivre une thérapie cognitivo-comportementale de l'insomnie pour désensibiliser l'angoisse nocturne.",
        "Intention paradoxale : Tenter délibérément de rester éveillé au calme ; supprimer l'obligation de dormir désamorce la panique.",
        "Compagnon de nuit Nuju : S'appuyer sur les enregistrements vocaux guidés en cas de crise au milieu de la nuit.",
      ],
      es: [
        "Consulta especializada en TCC-I: Acude a un profesional de la salud mental especializado en insomnio y fobias nocturnas.",
        "Intención paradójica: Intenta voluntariamente permanecer despierto en calma; eliminar la obligación de dormir neutraliza el pánico.",
        "Apoyo nocturno en Nuju: Apóyate en el diario de voz sereno de Nuju ante las crisis de madrugada.",
      ],
    },
  },
];

export const SOMNIPHOBIA_SUBSCALE_INFO = {
  bedtime_anticipatory_panic: {
    name: {
      en: "Bedtime Anticipatory Panic",
      id: "Panik Antisipasi Menjelang Tidur",
      de: "Abendliche Erwartungsangst",
      fr: "Angoisse d'Anticipation du Coucher",
      es: "Pánico Anticipatorio al Descanso",
    },
    description: {
      en: "Visceral dread, elevated heart rate, and internal resistance that surge as evening approaches and the bedroom environment nears.",
      id: "Rasa cemas mendalam, detak jantung meningkat, dan penolakan batin yang melonjak saat malam tiba dan mendekati kasur.",
      de: "Körperliche Beklemmung, beschleunigter Puls und innerer Widerstand, sobald der Abend heranbricht.",
      fr: "Angoisse viscérale, accélération cardiaque et résistance intérieure à l'approche de la nuit.",
      es: "Opresión visceral, taquicardia y rechazo interno que se activan al aproximarse la noche.",
    },
  },
  loss_of_control_dread: {
    name: {
      en: "Loss of Control Dread",
      id: "Ketakutan Kehilangan Kendali Sadar",
      de: "Angst vor Kontrollverlust",
      fr: "Peur de la Perte de Contrôle",
      es: "Miedo a Perder el Control Consciente",
    },
    description: {
      en: "Terror of surrendering consciousness, hypnic jerks, fear of sleep paralysis, nightmares, or vulnerability in darkness.",
      id: "Ketakutan melepaskan kesadaran, tersentak kaget saat mulai terlelap, takut ketindihan, mimpi buruk, atau gelap gulita.",
      de: "Furcht vor dem Wegdämmern, Hochschrecken beim Einschlafen, Schlafparalyse und Hilflosigkeit im Dunkeln.",
      fr: "Terreur de lâcher prise, sursauts hypniques, peur de la paralysie du sommeil et vulnérabilité dans le noir.",
      es: "Terror a desconectar la mente, sacudidas mioclónicas, miedo a la parálisis del sueño y desamparo en la oscuridad.",
    },
  },
  insomnia_performance_anxiety: {
    name: {
      en: "Insomnia Performance Anxiety",
      id: "Kecemasan Performa & Jam Tidur",
      de: "Schlaf-Leistungsdruck & Uhrenzwang",
      fr: "Pression de Performance du Sommeil",
      es: "Ansiedad de Rendimiento y Obsesión del Reloj",
    },
    description: {
      en: "Compulsive clock calculations, catastrophizing next-day consequences, and demanding that one 'must fall asleep immediately'.",
      id: "Kompulsi menghitung jam tidur dalam gelap, mendramatisir kehancuran esok hari, dan menuntut diri harus tidur detik itu juga.",
      de: "Zwanghaftes Uhrenrechnen, Katastrophisieren des Folgetages und der vergebliche Versuch, Schlaf zu erzwingen.",
      fr: "Calcul obsessionnel de l'heure, dramatisation de la fatigue future et exigence de s'endormir sur-le-champ.",
      es: "Cálculos compulsivos de las horas restantes, catastrofización del día siguiente y exigencia de dormir de inmediato.",
    },
  },
};

export function getSomniphobiaResult(totalScore: number): SomniphobiaResultLevel {
  const clamped = Math.max(0, Math.min(36, totalScore));
  return (
    SOMNIPHOBIA_RESULTS.find(
      (r) => clamped >= r.scoreRange[0] && clamped <= r.scoreRange[1]
    ) || SOMNIPHOBIA_RESULTS[0]
  );
}

export function calculateSomniphobiaSubscales(answers: Record<number, number>): {
  bedtime_anticipatory_panic: number;
  loss_of_control_dread: number;
  insomnia_performance_anxiety: number;
} {
  let bap = 0;
  let lcd = 0;
  let ipa = 0;

  SOMNIPHOBIA_QUESTIONS.forEach((q) => {
    const score = answers[q.id] ?? 0;
    if (q.subscale === "bedtime_anticipatory_panic") bap += score;
    if (q.subscale === "loss_of_control_dread") lcd += score;
    if (q.subscale === "insomnia_performance_anxiety") ipa += score;
  });

  return {
    bedtime_anticipatory_panic: bap,
    loss_of_control_dread: lcd,
    insomnia_performance_anxiety: ipa,
  };
}
