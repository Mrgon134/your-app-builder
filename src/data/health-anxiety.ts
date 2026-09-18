export type HealthAnxietyCardLang = "en" | "id" | "de" | "fr" | "es";

export interface HealthAnxietyQuestion {
  id: number;
  subscale:
    | "somatic_catastrophizing"
    | "cyberchondria_reassurance"
    | "body_checking_hypervigilance";
  text: Record<HealthAnxietyCardLang, string>;
}

export interface HealthAnxietyResultLevel {
  level:
    | "healthy_interoceptive_calm"
    | "mild_somatic_curiosity"
    | "moderate_health_anxiety_tension"
    | "severe_cyberchondria_spiral"
    | "acute_illness_anxiety_paralysis";
  scoreRange: [number, number];
  title: Record<HealthAnxietyCardLang, string>;
  badge: Record<HealthAnxietyCardLang, string>;
  summary: Record<HealthAnxietyCardLang, string>;
  psychology: Record<HealthAnxietyCardLang, string>;
  actionProtocol: Record<HealthAnxietyCardLang, string[]>;
}

export const HEALTH_ANXIETY_QUESTIONS: HealthAnxietyQuestion[] = [
  // 1. Somatic Catastrophizing
  {
    id: 1,
    subscale: "somatic_catastrophizing",
    text: {
      en: "When I feel an unfamiliar bodily ache, muscle twitch, or chest flutter, my immediate assumption is that it is a sign of a fatal disease.",
      id: "Saat merasakan kedutan otot, nyeri aneh, atau debaran dada tak biasa, pikiran pertamaku langsung menduga itu tanda penyakit mematikan.",
      de: "Wenn ich ein leichtes Ziehen, Muskelzucken oder Herzstolpern spüre, befürchte ich sofort eine lebensbedrohliche Krankheit.",
      fr: "Dès que je ressens une douleur ou une palpitation inhabituelle, je pense immédiatement au pire (maladie grave ou incurable).",
      es: "Cuando siento un dolor muscular, espasmo o latido irregular, supongo de inmediato que se trata de una enfermedad mortal.",
    },
  },
  // 2. Cyberchondria Reassurance
  {
    id: 2,
    subscale: "cyberchondria_reassurance",
    text: {
      en: "I spend hours googling symptoms, reading medical forums, or watching health TikToks until my heart races in acute panic.",
      id: "Aku menghabiskan berjam-jam browsing gejala di Google, membaca forum medis, atau menonton video penyakit sampai jantungku berdebar panik.",
      de: "Ich google stundenlang nach Symptomen und lese medizinische Foren, bis mein Puls rast und mich Panik übermannt.",
      fr: "Je passe des heures à chercher mes symptômes sur Google ou des forums jusqu'à ce que la panique me coupe le souffle.",
      es: "Paso horas buscando síntomas en Google y leyendo foros médicos hasta que la angustia y la taquicardia me desbordan.",
    },
  },
  // 3. Body Checking Hypervigilance
  {
    id: 3,
    subscale: "body_checking_hypervigilance",
    text: {
      en: "I repeatedly check my pulse, blood pressure, lymph nodes, pupil reactions, or skin moles throughout the day.",
      id: "Aku berulang kali meraba denyut nadi, memeriksa kelenjar getah bening, tahi lalat, atau pupil mata sepanjang hari.",
      de: "Ich messe mehrmals täglich meinen Puls, taste Lymphknoten ab oder kontrolliere Muttermale und Pupillen auf Veränderungen.",
      fr: "Je prends constamment mon pouls, palpe mes ganglions ou examine mes grains de beauté plusieurs fois par jour.",
      es: "Me tomo el pulso, me palpo los ganglios o vigilo lunares en mi piel repetidamente a lo largo del día.",
    },
  },
  // 4. Somatic Catastrophizing
  {
    id: 4,
    subscale: "somatic_catastrophizing",
    text: {
      en: "Even after a doctor or lab test confirms I am physically healthy, the relief lasts only a few hours before doubt creeps back in: 'What if they missed something?'",
      id: "Bahkan setelah dokter atau tes lab menyatakan aku sehat, rasa lega hanya bertahan beberapa jam sebelum muncul keraguan: 'Bagaimana jika ada yang terlewat?'",
      de: "Selbst wenn Ärzte oder Blutwerte Entwarnung geben, hält die Erleichterung nur kurz: 'Was, wenn sie etwas übersehen haben?'",
      fr: "Même après des examens médicaux rassurants, le soulagement est éphémère : 'Et si les médecins étaient passés à côté de quelque chose ?'",
      es: "Incluso cuando el médico o los análisis salen perfectos, el alivio dura poco: '¿Y si no vieron algo grave?'",
    },
  },
  // 5. Cyberchondria Reassurance
  {
    id: 5,
    subscale: "cyberchondria_reassurance",
    text: {
      en: "I repeatedly seek reassurance from family or friends ('Does my forehead feel hot? Does this look cancerous?'), but their answers never fully satisfy me.",
      id: "Aku berulang kali meminta konfirmasi dari orang terdekat ('Dahiku panas nggak? Ini kelihatan seperti tumor nggak?'), tapi jawabannya tidak pernah membuatku tenang.",
      de: "Ich frage Angehörige ständig um Bestätigung ('Fühlt sich meine Stirn heiß an?'), doch die Antworten beruhigen mich nie dauerhaft.",
      fr: "Je demande sans cesse à mes proches de me rassurer ('Tu trouves que j'ai de la fièvre ?'), mais cela ne calme jamais mon angoisse.",
      es: "Pido confirmación constante a mi familia ('¿Me encuentras caliente? ¿Esto parece grave?'), pero nunca me quedo tranquilo.",
    },
  },
  // 6. Body Checking Hypervigilance
  {
    id: 6,
    subscale: "body_checking_hypervigilance",
    text: {
      en: "I avoid physical exercise or walking up stairs because an elevated heart rate or breathlessness triggers panic that my heart is failing.",
      id: "Aku menghindari olahraga atau naik tangga karena detak jantung cepat dan napas terengah-engah memicu panik bahwa jantungku akan berhenti.",
      de: "Ich meide Sport oder Treppensteigen, weil schneller Puls oder Kurzatmigkeit bei mir Todesangst vor Herzversagen auslösen.",
      fr: "J'évite l'effort physique car l'essoufflement ou le cœur qui s'accélère me font craindre un arrêt cardiaque imminent.",
      es: "Evito hacer ejercicio o subir escaleras porque el ritmo cardíaco acelerado me hace temer un ataque al corazón.",
    },
  },
  // 7. Somatic Catastrophizing
  {
    id: 7,
    subscale: "somatic_catastrophizing",
    text: {
      en: "Hearing about someone else's diagnosis, stroke, or cancer immediately causes me to feel phantom symptoms of the same illness in my own body.",
      id: "Mendengar berita seseorang terkena kanker atau stroke seketika membuatku merasakan gejala fisik yang mirip di tubuhku sendiri.",
      de: "Wenn ich von der Krebserkrankung oder dem Schlaganfall anderer höre, spüre ich sofort Phantomsymptome in meinem eigenen Körper.",
      fr: "Quand j'apprends la maladie grave de quelqu'un, je ressens presque aussitôt les mêmes symptômes dans mon propre corps.",
      es: "Al enterarme de que alguien enfermó de cáncer o sufrió un ictus, empiezo a sentir de inmediato esos mismos síntomas en mi cuerpo.",
    },
  },
  // 8. Cyberchondria Reassurance
  {
    id: 8,
    subscale: "cyberchondria_reassurance",
    text: {
      en: "I have booked emergency appointments, urgent care visits, or multiple second opinions for bodily sensations that turned out to be benign anxiety.",
      id: "Aku pernah mendatangi IGD, klinik darurat, atau berkonsultasi ke banyak dokter untuk sensasi fisik yang ternyata hanyalah kecemasan biasa.",
      de: "Ich bin schon nachts in die Notaufnahme gefahren oder habe Spezialisten konsultiert für Symptome, die reine Angst waren.",
      fr: "J'ai déjà consulté en urgence ou multiplié les avis médicaux pour des sensations qui n'étaient que de l'angoisse somatisée.",
      es: "He acudido a urgencias o consultado a varios especialistas por molestias físicas que terminaron siendo simple ansiedad.",
    },
  },
  // 9. Body Checking Hypervigilance
  {
    id: 9,
    subscale: "body_checking_hypervigilance",
    text: {
      en: "I avoid medical articles, hospital dramas, or even visiting sick relatives because it sends my nervous system into hyper-arousal.",
      id: "Aku menghindari artikel medis, serial rumah sakit, atau menjenguk orang sakit karena itu membuat sistem sarafku panik berkepanjangan.",
      de: "Ich meide Krankenhausserien, medizinische Berichte oder Krankenbesuche, weil mein Nervensystem sonst in Alarmbereitschaft versetzt wird.",
      fr: "J'évite les séries médicales, les articles de santé ou les hôpitaux car ils déclenchent chez moi des crises d'angoisse.",
      es: "Evito series médicas, noticias de salud o visitar enfermos porque me disparan una angustia insoportable.",
    },
  },
  // 10. Somatic Catastrophizing
  {
    id: 10,
    subscale: "somatic_catastrophizing",
    text: {
      en: "I interpret normal somatic noise (swallowing awareness, eye floaters, bowel gurgles, tension headaches) as evidence of systemic organ failure.",
      id: "Aku mengartikan 'suara bising alami tubuh' (kesadaran menelan, floaters mata, perut berbunyi, tegang kepala) sebagai bukti kegagalan organ.",
      de: "Ich interpretiere normales Körperrauschen (Schlucken, Mouches volantes, Magenknurren) als Beweis für beginnendes Organversagen.",
      fr: "J'interprète les bruits naturels du corps (déglutition, corps flottants dans les yeux, gargouillements) comme une défaillance organique.",
      es: "Interpreto ruidos corporales normales (deglutir, moscas volantes, ruidos digestivos) como prueba de fallo orgánico.",
    },
  },
  // 11. Cyberchondria Reassurance
  {
    id: 11,
    subscale: "cyberchondria_reassurance",
    text: {
      en: "Late at night in bed, I am trapped in algorithmic health doom-scrolling, convinced I will not survive the night without medical intervention.",
      id: "Saat larut malam di tempat tidur, aku terjebak doom-scrolling medis dan merasa yakin tidak akan selamat melewati malam tanpa bantuan dokter.",
      de: "Nachts im Bett verfange ich mich im Google-Diagnose-Strudel, überzeugt, die Nacht ohne ärztliche Hilfe nicht zu überstehen.",
      fr: "Tard dans la nuit, je sombre dans le doom-scrolling médical, persuadé(e) que je fais une crise mortelle sans aide médicale.",
      es: "De madrugada en la cama, caigo en un bucle de búsquedas médicas, convencido de que no superaré la noche sin un médico.",
    },
  },
  // 12. Body Checking Hypervigilance
  {
    id: 12,
    subscale: "body_checking_hypervigilance",
    text: {
      en: "Fear of having or developing a terminal illness prevents me from making long-term plans, enjoying vacations, or focusing on my career.",
      id: "Ketakutan akan menderita penyakit kronis mematikan menghalangiku membuat rencana jangka panjang, menikmati liburan, atau fokus berkarir.",
      de: "Die permanente Angst vor einer tödlichen Krankheit hindert mich daran, Zukunftsziele zu planen oder unbeschwert Urlaub zu machen.",
      fr: "La peur constante de tomber malade m'empêche de faire des projets d'avenir, de profiter de vacances ou de travailler sereinement.",
      es: "El miedo constante a enfermarme me impide hacer planes a largo plazo, disfrutar vacaciones o progresar laboralmente.",
    },
  },
];

export const HEALTH_ANXIETY_RESULTS: HealthAnxietyResultLevel[] = [
  {
    level: "healthy_interoceptive_calm",
    scoreRange: [0, 8],
    title: {
      en: "Healthy Interoceptive Calm & Grounded Body Trust",
      id: "Ketenangan Interoseptif Sehat & Kepercayaan Tubuh",
      de: "Gesunde Interozeptive Ruhe & Körpervertrauen",
      fr: "Confiance Corporelle & Sérénité Interoceptive",
      es: "Calma Interoceptiva & Confianza Corporal Plena",
    },
    badge: {
      en: "Interoceptive Calm",
      id: "Tenang Interoseptif",
      de: "Körperruhe",
      fr: "Sérénité Organique",
      es: "Calma Orgánica",
    },
    summary: {
      en: "You have a resilient and calm relationship with your internal sensations. You perceive bodily twitches, heart rate shifts, and minor fatigue as normal fluctuations of biological life rather than catastrophic medical threats.",
      id: "Kamu memiliki hubungan yang tenang dan percaya dengan tubuhmu. Nyeri sesekali atau perubahan detak jantung kamu pandang sebagai fluktuasi biologis alami, bukan ancaman penyakit mematikan.",
      de: "Sie begegnen Körpersignalen gelassen. Verspannungen oder Herzklopfen werten Sie als normale Lebenszeichen statt als Katastrophen.",
      fr: "Vous entretenez un lien de confiance serein avec votre corps. Les sensations inhabituelles sont perçues comme de simples fluctuations du vivant.",
      es: "Tienes una relación tranquila y de confianza con tu cuerpo. Consideras las molestias como fluctuaciones naturales, no como catástrofes.",
    },
    psychology: {
      en: "In Dr. Paul Salkovskis' Cognitive Model of Health Anxiety, your threat appraisal system accurately filters somatic background noise. You do not engage in compulsive reassurance seeking or catastrophic cognitive leaps.",
      id: "Dalam Model Kognitif Kecemasan Kesehatan Dr. Paul Salkovskis, sistem penilaian bahaya otakmu menyaring 'suara tubuh' secara akurat tanpa melompat ke kesimpulan katastrofik.",
      de: "Nach dem kognitiven Modell von Dr. Paul Salkovskis bewertet Ihr Gehirn Körpersignale realistisch und ohne angstgesteuerte Verzerrung.",
      fr: "Selon le modèle de Paul Salkovskis, votre système d'évaluation des menaces fonctionne avec justesse, sans catastrophisme ni boucles de réassurance.",
      es: "Según el modelo cognitivo de Paul Salkovskis, tu sistema de evaluación filtra el ruido biológico sin caer en bucles hipocondríacos.",
    },
    actionProtocol: {
      en: [
        "Continue routine evidence-based health checkups without excessive testing.",
        "Practice mindful interoception: notice physical sensations during exercise without anxiety.",
        "Support friends who struggle with symptom spiraling with grounded, calm presence.",
      ],
      id: [
        "Lanjutkan pemeriksaan kesehatan rutin tahunan yang wajar tanpa tes berlebihan.",
        "Latih kesadaran interosepsi sehat: rasakan denyut nadi saat olahraga dengan rasa syukur.",
        "Dampingi sahabat yang sering cemas akan penyakit dengan kehadiran tenang.",
      ],
      de: [
        "Behalten Sie vernünftige Vorsorgeuntersuchungen ohne Übertreibung bei.",
        "Nehmen Sie Körpersignale beim Sport achtsam und vertrauensvoll wahr.",
        "Seien Sie Mitmenschen mit Krankheitsängsten ein ruhender Pol.",
      ],
      fr: [
        "Maintenez des bilans de santé réguliers et raisonnables.",
        "Accueillez vos sensations corporelles avec bienveillance lors du sport.",
        "Offrez votre écoute apaisée à vos proches anxieux.",
      ],
      es: [
        "Mantén chequeos médicos preventivos y razonables.",
        "Siente tus latidos y respiración al hacer deporte con gratitud y calma.",
        "Apoya con serenidad a personas que sufran de hipocondría.",
      ],
    },
  },

  {
    level: "mild_somatic_curiosity",
    scoreRange: [9, 16],
    title: {
      en: "Mild Somatic Hyper-Awareness",
      id: "Kewaspadaan Sensasi Tubuh Ringan",
      de: "Leichte Somatische Wachsamkeit",
      fr: "Hypervigilance Corporelle Légère",
      es: "Hipervigilancia Corporal Leve",
    },
    badge: {
      en: "Somatic Sensitivity",
      id: "Sensitivitas Somatik",
      de: "Aufmerksam",
      fr: "Sensibilité Somatique",
      es: "Sensibilidad Somática",
    },
    summary: {
      en: "You are periodically alert to bodily aches, especially during periods of stress, sleeplessness, or after reading about serious illness. However, you can quickly self-soothe and return to your daily life without persistent rumination.",
      id: "Kamu sesekali waspada terhadap sensasi tubuh, terutama saat stres kerja, kurang tidur, atau setelah membaca berita penyakit. Namun, kamu masih bisa menenangkan diri dan tidak larut dalam kepanikan.",
      de: "In Stressphasen oder nach Berichten über Krankheiten horchen Sie genauer in sich hinein. Sie können sich jedoch schnell wieder beruhigen.",
      fr: "En période de stress ou de fatigue, vous écoutez un peu trop votre corps, mais vous réussissez à vous raisonner sans panique durable.",
      es: "En momentos de estrés tiendes a monitorear tu cuerpo con cierta inquietud, pero logras calmarte sin caer en obsesiones prolongadas.",
    },
    psychology: {
      en: "This reflects elevated baseline stress discharging into interoceptive scanning. Your central nervous system is slightly sensitized, but your prefrontal reality-testing remains strong enough to prevent compulsive spirals.",
      id: "Ini adalah respon stres umum di mana sistem saraf lebih peka terhadap sensasi tubuh. Selama kamu tidak sering googling gejala, kondisi ini akan mereda seiring turunnya beban stres.",
      de: "Erhöhter Grundstress führt zu feinerer Körperwahrnehmung. Ihr Realitätssinn hält Kontrollimpulse jedoch im Zaum.",
      fr: "Un niveau de stress passager qui amplifie l'écoute du corps. Vos capacités de régulation restent fonctionnelles.",
      es: "Estrés de base que sensibiliza el sistema nervioso. Tu razonamiento frena a tiempo los impulsos de chequeo.",
    },
    actionProtocol: {
      en: [
        "Avoid Googling vague symptoms when feeling stressed; let your body rest first.",
        "Practice physiological sighs (two quick inhales, long slow exhale) to down-regulate interoceptive panic.",
        "Use Nuju voice journaling to verbalize underlying life stressors rather than fixating on somatic symptoms.",
      ],
      id: [
        "Hindari mencari gejala di Google saat sedang lelah atau cemas; prioritaskan tidur cukup.",
        "Latih physiological sigh (dua tarikan napas cepat, satu hembusan panjang) untuk meredakan ketegangan tubuh.",
        "Gunakan jurnal suara Nuju untuk menuangkan stres emosional sebelum berubah menjadi sensasi fisik.",
      ],
      de: [
        "Googeln Sie bei Stress keine Symptome; schlafen Sie sich zuerst aus.",
        "Nutzen Sie den 'Physiological Sigh' zur schnellen Beruhigung des Nervensystems.",
        "Sprechen Sie mentale Belastungen in Nuju aus, bevor sie somatisieren.",
      ],
      fr: [
        "Ne cherchez pas vos symptômes sur Internet lorsque vous êtes fatigué(e).",
        "Pratiquez le double inspir suivi d'un long expir pour calmer le système nerveux.",
        "Exprimez vos tensions dans le journal vocal Nuju avant qu'elles ne se somatisent.",
      ],
      es: [
        "Evita consultar síntomas en Google si estás estresado; descansa primero.",
        "Practica el suspiro fisiológico para regular el sistema nervioso.",
        "Desahoga tus preocupaciones en el diario de voz Nuju para no somatizarlas.",
      ],
    },
  },

  {
    level: "moderate_health_anxiety_tension",
    scoreRange: [17, 24],
    title: {
      en: "Moderate Health Anxiety & Cyberchondria Tension",
      id: "Kecemasan Kesehatan Sedang & Jebakan Cyberchondria",
      de: "Moderate Krankheitsangst & Cyberchondrie",
      fr: "Anxiété de Santé Modérée & Cybercondrie",
      es: "Ansiedad por la Salud Moderada & Cibercondría",
    },
    badge: {
      en: "Cyberchondria Loop",
      id: "Loop Cyberchondria",
      de: "Cyberchondrie-Schleife",
      fr: "Boucle Cybercondriaque",
      es: "Bucle Cibercondríaco",
    },
    summary: {
      en: "Normal bodily sensations frequently trigger intense spirals of medical panic. You lose substantial time to symptom googling, checking your pulse or body parts, and seeking reassurance that only provides fleeting relief.",
      id: "Sensasi tubuh wajar sering memicu spiral kepanikan medis. Kamu kehilangan banyak waktu mencari gejala di Google, meraba denyut nadi, dan meminta penegasan orang lain yang hanya memberi rasa lega sesaat.",
      de: "Körpersignale lösen wiederkehrende Panikattacken aus. Googeln von Symptomen, Pulskontrollen und quälende Arztbesuche binden viel Lebenszeit.",
      fr: "Les sensations physiques déclenchent des crises d'angoisse récurrentes. Les recherches médicales en ligne et les vérifications corporelles deviennent envahissantes.",
      es: "Las sensaciones físicas desatan crisis de pánico frecuentes. La búsqueda compulsiva en Google y el monitoreo del pulso consumen horas de tu día.",
    },
    psychology: {
      en: "Dr. Paul Salkovskis showed that reassurance seeking and symptom checking act as catastrophic fuel: every Google search exposes the brain to worst-case rare terminal illnesses, reinforcing the neural belief that the body is fragile and defective.",
      id: "Riset Dr. Paul Salkovskis membuktikan bahwa mencari penegasan dan browsing gejala justru menjadi 'bakar gas' kecemasan. Setiap pencarian Google menyodorkan penyakit terburuk, meyakinkan otak bahwa tubuhmu rapuh.",
      de: "Laut Dr. Paul Salkovskis ist Rückversicherung wie Benzin im Feuer: Jeder Suchklick liefert Worst-Case-Szenarien und verfestigt die Angst vor Zerbrechlichkeit.",
      fr: "Selon Paul Salkovskis, la cybercondrie alimente le trouble : chaque recherche expose au pire diagnostic et convainc le cerveau de sa vulnérabilité.",
      es: "Como demostró Paul Salkovskis, la búsqueda de síntomas actúa como combustible: Google muestra lo peor y convence a tu cerebro de que estás en peligro.",
    },
    actionProtocol: {
      en: [
        "Implement a strict 72-Hour Medical Googling Moratorium: when an urge strikes, write the symptom in Nuju and wait 72 hours before researching.",
        "Limit pulse and body checking to maximum once per week unless prescribed by a medical doctor.",
        "Practice Interoceptive Habituation: sit with a fast heart rate for 5 minutes without checking devices.",
      ],
      id: [
        "Terapkan Moratorium Googling Medis 72 Jam: catat gejala di Nuju dan tunggu 3 hari sebelum mencari info apa pun.",
        "Batasi mengukur tensi atau denyut nadi maksimal 1 kali seminggu kecuali atas anjuran dokter.",
        "Latih pembiasaan interoseptif: duduk tenang saat jantung berdebar selama 5 menit tanpa mengecek jam atau alat ukur.",
      ],
      de: [
        "72-Stunden-Google-Moratorium: Notieren Sie Symptome in Nuju und warten Sie 3 Tage ab.",
        "Puls- und Körperkontrollen auf maximal einmal pro Woche beschränken.",
        "Interozeptive Gewöhnung: Herzklopfen 5 Minuten aushalten, ohne Smartwatch zu checken.",
      ],
      fr: [
        "Moratoire de 72 heures sans Google : notez la sensation dans Nuju et attendez 3 jours.",
        "Limitez la prise de pouls ou de tension à une fois par semaine au maximum.",
        "Habituation interoceptive : respirez 5 minutes avec le cœur qui bat sans regarder de montre.",
      ],
      es: [
        "Moratoria de 72 horas sin Google: anota el síntoma en Nuju y espera 3 días antes de buscarlo.",
        "Limita la toma de pulso o presión a una vez por semana como máximo.",
        "Entrenamiento interoceptivo: quédate sentado 5 minutos con las palpitaciones sin usar pulsioxímetro.",
      ],
    },
  },

  {
    level: "severe_cyberchondria_spiral",
    scoreRange: [25, 31],
    title: {
      en: "Severe Health Anxiety & Illness Preoccupation (Hypochondria)",
      id: "Kecemasan Kesehatan Berat & Obsesi Penyakit (Hipokondria)",
      de: "Schwere Krankheitsangst & Somatische Panik (Hypochondrie)",
      fr: "Anxiété de Santé Sévère & Hypocondrie Envahissante",
      es: "Hipocondría Severa & Pánico Somático Crónico",
    },
    badge: {
      en: "Severe Illness Anxiety",
      id: "Kecemasan Medis Berat",
      de: "Schwere Hypochondrie",
      fr: "Hypocondrie Sévère",
      es: "Hipocondría Severa",
    },
    summary: {
      en: "You are imprisoned in chronic dread of illness. Everyday life is dominated by doctor shopping, emergency room visits, obsessive pulse monitoring, and agonizing nocturnal panic that you have an undetected terminal disease.",
      id: "Kamu terbelenggu dalam ketakutan kronis akan penyakit. Hari-harimu didominasi bolak-balik ke dokter, mendatangi IGD, memeriksa organ tubuh tanpa henti, dan panik malam hari bahwa kamu menderita penyakit mematikan yang tak terdeteksi.",
      de: "Sie leben im permanenten Ausnahmezustand. Arztmarathons, Notaufnahmen, Schlaflosigkeit und quälende Todesangst dominieren Ihren gesamten Alltag.",
      fr: "Vous vivez dans la terreur permanente de la maladie. Visites médicales incessantes, urgences et insomnies consument toute votre vitalité.",
      es: "Vives preso de un terror médico constante. Consultas continuas a urgencias, monitoreo del cuerpo e insomnio destructivo dominan tu existencia.",
    },
    psychology: {
      en: "In clinical psychiatry (DSM-5 Illness Anxiety Disorder), your amygdala has paired harmless somatic sensations with existential annihilation. The physiological fight-or-flight response itself produces physical symptoms (numbness, dizziness, chest tightness), creating an endless self-fulfilling loop.",
      id: "Dalam psikiatri klinis (Illness Anxiety Disorder), amigdala otakmu mengaitkan sensasi fisik normal dengan kematian. Hormon stres adrenalin sendiri memicu kesemutan, pusing, dan sesak dada, menciptakan lingkaran setan tanpa ujung.",
      de: "Beim DSM-5-Krankheitsangstsyndrom interpretiert die Amygdala harmlose Körpersignale als Lebensgefahr. Die Angst erzeugt die Symptome selbst.",
      fr: "Le trouble d'anxiété de santé (DSM-5) transforme les sensations bénignes en péril mortel. L'adrénaline crée elle-même les symptômes ressentis.",
      es: "En el Trastorno de Ansiedad por Enfermedad, la amígdala interpreta sensaciones inocuas como muerte inminente. La propia angustia genera mareos y taquicardias.",
    },
    actionProtocol: {
      en: [
        "Consult a CBT psychologist specializing in Health Anxiety & Exposure and Response Prevention (ERP).",
        "Agree with your primary care physician on a scheduled checkup plan and cease emergency clinic visits for anxiety spikes.",
        "Remove health forums, disease subreddits, and symptom checker apps from all devices.",
        "Use Nuju audio journaling to express catastrophic dread without triggering internet algorithmic spirals.",
      ],
      id: [
        "Konsultasikan dengan psikolog klinis yang mendalami CBT Health Anxiety dan ERP.",
        "Sepakati jadwal kontrol medis rutin bersama dokter keluarga dan hentikan kunjungan IGD saat panik cemas.",
        "Hapus forum kesehatan, grup keluhan penyakit, dan aplikasi cek gejala dari ponselmu.",
        "Gunakan jurnal suara aman Nuju untuk meluapkan ketakutan tanpa terjerumus algoritma internet.",
      ],
      de: [
        "Beginnen Sie eine kognitive Verhaltenstherapie (KVT/ERP) bei spezialisierten Therapeuten.",
        "Vereinbaren Sie feste Kontrolltermine beim Hausarzt und meiden Sie Notfall-Shopping.",
        "Löschen Sie Medizinforen und Symptom-Apps vom Smartphone.",
        "Nutzen Sie Nuju als geschützten Audio-Entlastungsraum ohne algorithmische Panikmache.",
      ],
      fr: [
        "Consultez un psychologue spécialisé en TCC de l'anxiété de santé.",
        "Fixez un cadre de suivi unique avec votre médecin traitant et cessez le nomadisme médical.",
        "Supprimez les applications de santé et forums anxiogènes de votre téléphone.",
        "Déposez votre terreur dans le journal audio crypté de Nuju.",
      ],
      es: [
        "Inicia psicoterapia cognitivo-conductual especializada en ansiedad por la salud (ERP).",
        "Pacta un único médico de cabecera y suspende las visitas compulsivas a urgencias.",
        "Desinstala foros médicos y buscadores de síntomas de tu móvil.",
        "Desahoga tu angustia en el espacio de voz seguro de Nuju sin caer en las redes de Google.",
      ],
    },
  },

  {
    level: "acute_illness_anxiety_paralysis",
    scoreRange: [32, 36],
    title: {
      en: "Acute Illness Anxiety Paralysis & Somatic Agoraphobia",
      id: "Kelumpuhan Kecemasan Medis Akut & Agorafobia Somatik",
      de: "Akute Somatische Panikparalyse & Krankheitsnotstand",
      fr: "Paralysie Hypocondriaque Aiguë & Détresse Somatique",
      es: "Parálisis Hipocondríaca Aguda & Pánico Somático Extremo",
    },
    badge: {
      en: "Acute Health Panic Crisis",
      id: "Krisis Panik Medis Akut",
      de: "Akuter Krankheitsalarm",
      fr: "Crise Médicale Aiguë",
      es: "Crisis Hipocondríaca Extrema",
    },
    summary: {
      en: "You are experiencing acute somatic paralysis. The conviction of imminent medical catastrophe has rendered you unable to work, leave home, or sleep. Extreme panic attacks, constant body prodding, and absolute despair dominate every waking second.",
      id: "Kamu mengalami kelumpuhan kecemasan medis akut. Keyakinan bahwa kematian atau penyakit fatal sedang mengintai membuatmu tidak bisa bekerja, takut keluar rumah, dan tidak bisa tidur. Kepanikan ekstrem menyiksa setiap detik hidupmu.",
      de: "Sie befinden sich in akuter seelischer Notlage. Die Überzeugung, unmittelbar vor einer Katastrophe zu stehen, macht arbeitsunfähig und löst Dauerpanik aus.",
      fr: "Vous traversez une crise d'angoisse somatique totale. La certitude d'une catastrophe médicale imminente vous empêche de travailler et de vivre.",
      es: "Atraviesas una crisis de pánico somático devastadora. La convicción de una muerte o enfermedad inminente te paraliza y destruye tu calidad de vida.",
    },
    psychology: {
      en: "This extreme tier requires urgent multidisciplinary stabilization: psychiatry, medical reassurance bound within clear psychological contracts, and intensive vagal nerve calming. You must understand that your nervous system is sounding a false five-alarm fire drill.",
      id: "Tingkat krisis ini memerlukan penanganan medis dan psikologis segera. Alarm bahaya otakmu mengalami malfungsi korsleting dan membunyikan alarm kebakaran hebat padahal tubuhmu secara fisik aman.",
      de: "Hier ist sofortige fachärztliche psychiatrische Hilfe nötig. Ihr Alarmsystem schlägt Fehlalarm auf höchster Stufe.",
      fr: "Cette crise exige une prise en charge psychiatrique immédiate pour désamorcer la fausse alerte du système nerveux.",
      es: "Requiere atención psiquiátrica y médica urgente. Tu cerebro ha activado una alarma de incendio máxima totalmente falsa.",
    },
    actionProtocol: {
      en: [
        "Immediate Medical/Psychiatric Consultation: Reach out to a mental health professional or crisis service today.",
        "Institute a Total Device Blackout on all health-related queries.",
        "Designate one trusted family member to manage medical decisions and prevent panic doctor visits.",
        "Use Nuju as an encrypted voice sanctuary to discharge screaming terror without seeking internet diagnosis.",
      ],
      id: [
        "Segera hubungi psikiater, psikolog klinis, atau layanan krisis kesehatan mental hari ini.",
        "Hentikan total semua pencarian medis di perangkat apa pun (blackout digital).",
        "Tunjuk satu anggota keluarga terpercaya untuk mengendalikan keputusan medis agar kamu tidak terus mendatangi IGD.",
        "Gunakan Nuju untuk melampiaskan kepanikan dan tangisan tanpa perlu mencari diagnosis di Google.",
      ],
      de: [
        "Wenden Sie sich umgehend an eine psychiatrische Fachklinik oder Krisenberatung.",
        "Vollständiges Google- und Medizin-Verbot auf allen Geräten.",
        "Übertragen Sie Arztentscheidungen vorübergehend einer Vertrauensperson.",
        "Nutzen Sie Nuju zur sprachlichen Notentlastung ohne Internetdiagnosen.",
      ],
      fr: [
        "Contactez sans délai un centre médico-psychologique ou une consultation d'urgence.",
        "Coupure numérique absolue concernant toute recherche médicale.",
        "Confiez vos démarches de santé à une personne de confiance.",
        "Déversez votre panique dans Nuju sans chercher de diagnostic en ligne.",
      ],
      es: [
        "Contacta de inmediato con un servicio de salud mental o psiquiatra.",
        "Bloqueo digital absoluto de cualquier búsqueda médica.",
        "Delega las decisiones médicas en un familiar de confianza.",
        "Descarga tu pánico en el santuario de audio seguro de Nuju sin alimentar al algoritmo.",
      ],
    },
  },
];

export const HEALTH_ANXIETY_OPTIONS = [
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

export const HEALTH_ANXIETY_SUBSCALE_INFO = {
  somatic_catastrophizing: {
    name: {
      en: "Somatic Catastrophizing & Threat Misinterpretation",
      id: "Katastrofisasi Somatik & Salah Tafsir Gejala",
      de: "Somatische Katastrophisierung & Fehlinterpretation",
      fr: "Catastrophisme Somatique & Mauvaise Interprétation",
      es: "Catastrofismo Somático & Mala Interpretación",
    },
    description: {
      en: "Immediately jumping from benign aches or heart flutter to fatal brain tumors or heart arrest.",
      id: "Seketika menyimpulkan nyeri otot atau dada berdebar sebagai tumor otak atau henti jantung mematikan.",
      de: "Sofortiger Gedankensprung von Muskelzucken zu Gehirntumoren oder Herzstillstand.",
      fr: "Passer instantanément d'une banale douleur à la certitude d'un cancer ou d'un infarctus.",
      es: "Pasar de inmediato de un espasmo muscular a la certeza de un infarto o tumor cerebral.",
    },
  },
  cyberchondria_reassurance: {
    name: {
      en: "Cyberchondria & Reassurance-Seeking Loops",
      id: "Cyberchondria & Lingkaran Pencarian Penegasan",
      de: "Cyberchondrie & Rückversicherungsschleifen",
      fr: "Cybercondrie & Recherche Compulsive de Réassurance",
      es: "Cibercondría & Búsqueda Compulsiva de Reaseguro",
    },
    description: {
      en: "Compulsive symptom googling, doctor shopping, and questioning family members that escalates panic.",
      id: "Browsing gejala di internet, berganti-ganti dokter, dan terus bertanya ke keluarga yang justru memperparah panik.",
      de: "Zwanghaftes Symptom-Googeln und Ärzte-Hopping, das die Angstspirale anheizt.",
      fr: "Recherches médicales frénétiques sur Internet et nomadisme médical qui aggravent l'angoisse.",
      es: "Búsqueda compulsiva en Google y visitas constantes a médicos que solo aumentan el pánico.",
    },
  },
  body_checking_hypervigilance: {
    name: {
      en: "Body Checking Hypervigilance & Somatosensory Avoidance",
      id: "Pemeriksaan Tubuh Kompulsif & Penghindaran Sensorik",
      de: "Körperkontroll-Hypervigilanz & Meidungsverhalten",
      fr: "Hypervigilance de Vérification & Évitement Somatosensoriel",
      es: "Hipervigilancia de Monitoreo & Evitación Somatosensorial",
    },
    description: {
      en: "Constantly feeling lymph nodes, taking pulses, and avoiding exercise or medical shows out of terror.",
      id: "Terus meraba kelenjar leher, mengukur denyut nadi, serta menghindari olahraga atau berita medis karena takut.",
      de: "Permanent Lymphknoten abtasten, Puls messen und Sport aus Furcht vor Anstrengung meiden.",
      fr: "Palpations répétées des ganglions, prises de pouls incessantes et refus du sport par peur du pire.",
      es: "Palpar ganglios, tomarse el pulso constantemente y evitar el ejercicio físico por pavor a morir.",
    },
  },
};

export function getHealthAnxietyResult(totalScore: number): HealthAnxietyResultLevel {
  const clamped = Math.max(0, Math.min(36, totalScore));
  return (
    HEALTH_ANXIETY_RESULTS.find(
      (r) => clamped >= r.scoreRange[0] && clamped <= r.scoreRange[1]
    ) || HEALTH_ANXIETY_RESULTS[0]
  );
}

export function calculateHealthAnxietySubscales(answers: Record<number, number>): {
  somatic_catastrophizing: number;
  cyberchondria_reassurance: number;
  body_checking_hypervigilance: number;
} {
  let sc = 0;
  let cr = 0;
  let bc = 0;

  HEALTH_ANXIETY_QUESTIONS.forEach((q) => {
    const score = answers[q.id] ?? 0;
    if (q.subscale === "somatic_catastrophizing") sc += score;
    if (q.subscale === "cyberchondria_reassurance") cr += score;
    if (q.subscale === "body_checking_hypervigilance") bc += score;
  });

  return {
    somatic_catastrophizing: sc,
    cyberchondria_reassurance: cr,
    body_checking_hypervigilance: bc,
  };
}
