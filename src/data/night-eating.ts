export type NightEatingCardLang = "en" | "id" | "de" | "fr" | "es";

export interface NightEatingQuestion {
  id: number;
  subscale:
    | "circadian_delay_morning_anorexia"
    | "nocturnal_awakenings_ingestion_urge"
    | "evening_dysphoria_sleep_fragmentation";
  text: Record<NightEatingCardLang, string>;
}

export interface NightEatingResultLevel {
  level:
    | "harmonious_circadian_metabolism"
    | "mild_evening_grazing_habit"
    | "moderate_circadian_phase_delay"
    | "high_clinical_night_eating_syndrome"
    | "acute_severe_circadian_neuroendocrine_dysregulation";
  scoreRange: [number, number];
  title: Record<NightEatingCardLang, string>;
  badge: Record<NightEatingCardLang, string>;
  summary: Record<NightEatingCardLang, string>;
  psychology: Record<NightEatingCardLang, string>;
  actionProtocol: Record<NightEatingCardLang, string[]>;
}

export const NIGHT_EATING_QUESTIONS: NightEatingQuestion[] = [
  // 1. Circadian Delay & Morning Anorexia
  {
    id: 1,
    subscale: "circadian_delay_morning_anorexia",
    text: {
      en: "You have virtually no appetite in the morning, often feeling nauseated or repulsed by the thought of eating breakfast before midday.",
      id: "Kamu hampir tidak memiliki nafsu makan di pagi hari, sering merasa mual atau enggan sarapan sebelum jam makan siang.",
      de: "Sie haben morgens praktisch keinen Appetit und verspüren bei dem Gedanken an ein Frühstück oft Übelkeit oder Widerwillen vor dem Mittag.",
      fr: "Vous n'avez quasiment aucun appétit le matin, ressentant souvent un écœurement ou un dégoût à l'idée de prendre un petit-déjeuner avant midi.",
      es: "Apenas tienes apetito por las mañanas y con frecuencia sientes náuseas o rechazo ante la idea de desayunar antes del mediodía.",
    },
  },
  // 2. Nocturnal Awakenings & Ingestion Urge
  {
    id: 2,
    subscale: "nocturnal_awakenings_ingestion_urge",
    text: {
      en: "You wake up in the middle of the night (between 1:00 AM and 4:00 AM) and feel a compelling physical or psychological urge to eat before you can fall back asleep.",
      id: "Kamu terbangun di tengah malam (antara jam 1 hingga 4 dini hari) dan merasakan dorongan fisik atau psikologis kuat untuk makan agar bisa tidur lagi.",
      de: "Sie wachen mitten in der Nacht auf (zwischen 1:00 und 4:00 Uhr) und verspüren einen unwiderstehlichen Drang zu essen, um wieder einschlafen zu können.",
      fr: "Vous vous réveillez au milieu de la nuit (entre 1h et 4h) et ressentez le besoin irrépressible de manger pour réussir à vous rendormir.",
      es: "Te despiertas a mitad de la noche (entre la 1 y las 4) y sientes un impulso imperioso de comer algo para poder volver a conciliar el sueño.",
    },
  },
  // 3. Evening Dysphoria & Sleep Fragmentation
  {
    id: 3,
    subscale: "evening_dysphoria_sleep_fragmentation",
    text: {
      en: "Your mood dips, anxiety spikes, or restlessness intensifies as the sun goes down, accompanied by intense cravings for carbohydrates, sweets, or starchy comfort foods.",
      id: "Suasana hatimu memburuk, kecemasan melonjak, atau kegelisahan meningkat saat malam tiba, disertai dorongan kuat mencari karbohidrat atau makanan manis.",
      de: "Ihre Stimmung sinkt, Ängste oder Unruhe steigen nach Einbruch der Dunkelheit, begleitet von starkem Heißhunger auf Kohlenhydrate oder Süßes.",
      fr: "Votre humeur s'assombrit ou votre anxiété grimpe dès que la nuit tombe, accompagnée d'envies compulsives de glucides, de sucre ou d'aliments réconfortants.",
      es: "Tu estado de ánimo decae o tu inquietud aumenta al anochecer, acompañada de antojos intensos de carbohidratos, azúcares o comida procesada.",
    },
  },
  // 4. Circadian Delay & Morning Anorexia
  {
    id: 4,
    subscale: "circadian_delay_morning_anorexia",
    text: {
      en: "You consume more than 25% of your total daily caloric intake after dinner or during nighttime hours.",
      id: "Kamu mengonsumsi lebih dari 25% total kalori harianmu setelah makan malam atau sepanjang jam larut malam.",
      de: "Sie nehmen mehr als 25 % Ihrer gesamten täglichen Kalorienmenge erst nach dem Abendessen oder in den Nachtstunden zu sich.",
      fr: "Vous consommez plus de 25 % de vos calories quotidiennes totales après le dîner ou pendant les heures nocturnes.",
      es: "Consumes más del 25% de tu ingesta calórica diaria total después de la cena o durante las horas de la madrugada.",
    },
  },
  // 5. Nocturnal Awakenings & Ingestion Urge
  {
    id: 5,
    subscale: "nocturnal_awakenings_ingestion_urge",
    text: {
      en: "You firmly believe that you cannot fall back asleep if you do not get up and eat something, feeling restless or agitated if you try to resist.",
      id: "Kamu sangat yakin bahwa kamu tidak akan bisa tertidur lagi jika tidak bangun dan makan sesuatu, merasa gelisah jika mencoba menahannya.",
      de: "Sie sind fest davon überzeugt, nicht weiterschlafen zu können, ohne aufzustehen und etwas zu essen, und werden unruhig, wenn Sie widerstehen.",
      fr: "Vous êtes intimement convaincu(e) qu'il vous est impossible de vous rendormir sans manger un morceau, devenant très agité(e) si vous tentez de résister.",
      es: "Tienes la convicción rotunda de que no podrás dormirte si no te levantas a comer algo, sintiendo agitación si intentas contenerte.",
    },
  },
  // 6. Evening Dysphoria & Sleep Fragmentation
  {
    id: 6,
    subscale: "evening_dysphoria_sleep_fragmentation",
    text: {
      en: "You feel heavy shame, guilt, or distress the next morning when you discover food wrappers, dirty dishes, or depleted pantry shelves from your nighttime eating.",
      id: "Kamu merasakan rasa malu, bersalah, atau penyesalan mendalam keesokan paginya saat melihat bungkus makanan, piring kotor, atau persediaan makanan yang habis.",
      de: "Sie empfinden am nächsten Morgen tiefe Scham oder Schuldgefühle, wenn Sie leere Verpackungen, schmutziges Geschirr oder geleerte Vorräte der Nacht sehen.",
      fr: "Vous ressentez une vive honte ou culpabilité au réveil en constatant les emballages vides, la vaisselle sale ou les placards dévalisés de la nuit.",
      es: "Sientes culpa, remordimiento o vergüenza a la mañana siguiente al ver los envoltorios vacíos, platos sucios o alimentos devorados durante la noche.",
    },
  },
  // 7. Circadian Delay & Morning Anorexia
  {
    id: 7,
    subscale: "circadian_delay_morning_anorexia",
    text: {
      en: "Your first substantial meal is frequently delayed until late afternoon or evening because food feels unappealing or heavy earlier in the day.",
      id: "Waktu makan berat pertamamu sering kali tertunda hingga sore atau malam hari karena makanan terasa tidak menggugah selera atau terasa berat di siang hari.",
      de: "Ihre erste vollwertige Mahlzeit verschiebt sich häufig bis zum späten Nachmittag oder Abend, da Nahrung früher am Tag als belastend empfunden wird.",
      fr: "Votre premier vrai repas est souvent repoussé jusqu'en fin d'après-midi ou au soir, la nourriture semblant indigeste ou peu attirante plus tôt.",
      es: "Tu primera comida sustancial se retrasa con frecuencia hasta media tarde o la noche, pues comer antes te resulta pesado o desagradable.",
    },
  },
  // 8. Nocturnal Awakenings & Ingestion Urge
  {
    id: 8,
    subscale: "nocturnal_awakenings_ingestion_urge",
    text: {
      en: "During nighttime eating episodes, you are fully awake, alert, and conscious of what you are eating (unlike sleepwalking or amnesic sleep-eating disorders).",
      id: "Saat makan di tengah malam, kamu sepenuhnya bangun, sadar, dan ingat apa yang kamu makan (bukan tidur berjalan atau gangguan makan dalam keadaan tidur berjalan).",
      de: "Während nächtlicher Essanfälle sind Sie vollkommen wach und sich des Essens bewusst (im Unterschied zu Schlafwandeln oder Schlaf-Ess-Störungen mit Amnesie).",
      fr: "Pendant vos prises alimentaires nocturnes, vous êtes parfaitement réveillé(e), lucide et conscient(e) de vos actes (distinct du somnambulisme).",
      es: "Durante los episodios nocturnos estás totalmente despierto, lúcido y consciente de lo que comes (a diferencia del sonambulismo con amnesia).",
    },
  },
  // 9. Evening Dysphoria & Sleep Fragmentation
  {
    id: 9,
    subscale: "evening_dysphoria_sleep_fragmentation",
    text: {
      en: "You experience persistent insomnia, frequent nighttime awakenings, or difficulty initiating sleep unless your stomach feels completely full.",
      id: "Kamu mengalami insomnia berkepanjangan, sering terbangun di malam hari, atau sulit tidur nyenyak kecuali perutmu terasa sangat kenyang.",
      de: "Sie leiden unter hartnäckigen Ein- oder Durchschlafstörungen und können oft erst zur Ruhe kommen, wenn Ihr Magen komplett gefüllt ist.",
      fr: "Vous souffrez d'insomnie récurrente, de réveils multiples ou de difficultés à vous endormir sauf si votre estomac est lourdement rempli.",
      es: "Padeces insomnio persistente, múltiples despertares nocturnos o incapacidad para dormir salvo que tengas el estómago completamente lleno.",
    },
  },
  // 10. Circadian Delay & Morning Anorexia
  {
    id: 10,
    subscale: "circadian_delay_morning_anorexia",
    text: {
      en: "You have tried repeatedly to 'eat like a normal person' during the daytime, but forcing breakfast or lunch feels unnatural and does not reduce your late-night hunger.",
      id: "Kamu sudah berkali-kali mencoba 'makan normal' di siang hari, namun memaksa sarapan terasa tidak alami dan sama sekali tidak mengurangi lapar larut malam.",
      de: "Sie haben wiederholt versucht, tagsüber normal zu essen, aber das Hineinzwängen von Frühstück fühlt sich unnatürlich an und stoppt den Nachthunger nicht.",
      fr: "Vous avez tenté maintes fois de manger 'normalement' le jour, mais forcer le petit-déjeuner paraît artificiel et n'apaise aucunement vos fringales nocturnes.",
      es: "Has intentado muchas veces comer con normalidad de día, pero forzarte a desayunar se siente forzado y no mitiga en nada tu hambre nocturna.",
    },
  },
  // 11. Nocturnal Awakenings & Ingestion Urge
  {
    id: 11,
    subscale: "nocturnal_awakenings_ingestion_urge",
    text: {
      en: "You eat quickly in the dark or by the refrigerator light, seeking high-carbohydrate, soothing foods to quickly numb anxious, restless, or lonely sensations.",
      id: "Kamu makan cepat-cepat di kegelapan atau di depan lampu kulkas, mencari karbohidrat yang menenangkan untuk meredam rasa gelisah, cemas, atau kesepian.",
      de: "Sie essen hastig im Dunkeln oder beim Licht des Kühlschranks, um mit kohlenhydratreicher Kost Ängste, innere Leere oder Einsamkeit zu betäuben.",
      fr: "Vous mangez hâtivement dans l'obscurité ou à la lueur du réfrigérateur, cherchant des aliments très glucidiques pour calmer une angoisse ou un vide intérieur.",
      es: "Comes deprisa en la oscuridad o ante la luz de la nevera, buscando carbohidratos reconfortantes para adormecer la ansiedad, el desasosiego o la soledad.",
    },
  },
  // 12. Evening Dysphoria & Sleep Fragmentation
  {
    id: 12,
    subscale: "evening_dysphoria_sleep_fragmentation",
    text: {
      en: "This cycle of night eating has persisted for at least 3 months and causes significant emotional distress, exhaustion, or fear regarding your metabolic health.",
      id: "Pola makan malam ini telah berlangsung setidaknya selama 3 bulan dan menimbulkan tekanan emosional, kelelahan, serta kekhawatiran atas kesehatan metabolikmu.",
      de: "Dieses Muster nächtlichen Essens besteht seit mindestens 3 Monaten und verursacht erhebliche seelische Belastung, Erschöpfung oder Sorgen um die Gesundheit.",
      fr: "Ce schéma d'alimentation nocturne dure depuis au moins 3 mois et engendre une détresse morale profonde, de la fatigue ou des craintes métaboliques.",
      es: "Este ciclo de ingesta nocturna lleva más de 3 meses y te genera un desgaste emocional severo, agotamiento diurno o alarma por tu salud metabólica.",
    },
  },
];

export const NIGHT_EATING_RESULT_LEVELS: NightEatingResultLevel[] = [
  {
    level: "harmonious_circadian_metabolism",
    scoreRange: [0, 7],
    title: {
      en: "Harmonious Circadian Rhythm & Daytime Satiety",
      id: "Ritme Sirkadian Seimbang & Rasa Kenyang Alami Siang Hari",
      de: "Harmonischer circadianer Rhythmus & Tagessättigung",
      fr: "Rythme circadien harmonieux & satiété diurne naturelle",
      es: "Ritmo circadiano armónico y saciedad diurna natural",
    },
    badge: {
      en: "SYNCHRONIZED SCN & METABOLISM",
      id: "METABOLISME & SIRKADIAN SINKRON",
      de: "SYNCHRONISIERTER CIRCADIANER RHYTHMUS",
      fr: "SYNCHRONISATION CIRCADIENNE OPTIMALE",
      es: "SINCRONIZACIÓN CIRCADIANO-METABÓLICA",
    },
    summary: {
      en: "Your eating schedule is well-aligned with your biological clock. You experience natural appetite during the daytime and maintain unbroken nocturnal sleep without compulsive eating signals.",
      id: "Pola makanmu sangat selaras dengan jam biologis tubuh. Kamu merasakan nafsu makan alami di siang hari dan mempertahankan tidur malam nyenyak tanpa dorongan makan di tengah malam.",
      de: "Ihr Essverhalten ist im Einklang mit Ihrer inneren Uhr. Sie verspüren tagsüber gesunden Appetit und schlafen nachts ohne Drang zur Nahrungsaufnahme durch.",
      fr: "Votre alimentation est parfaitement calée sur votre horloge biologique. Vous vous nourrissez en journée et préservez un sommeil nocturne continu sans fringales.",
      es: "Tus pautas alimentarias están en perfecta sintonía con tu reloj biológico. Tienes apetito en horas de luz y duermes seguido sin urgencias de comer de madrugada.",
    },
    psychology: {
      en: "Your suprachiasmatic nucleus (SCN), nocturnal melatonin secretion, and leptin/ghrelin appetite hormones operate in physiological harmony. Sleep architecture remains uncoupled from nocturnal digestive arousal.",
      id: "Nukleus suprakiasmatik (SCN), sekresi melatonin malam, serta hormon leptin dan ghrelin bekerja dalam harmoni fisiologis. Struktur tidurmu tidak terganggu oleh dorongan makan nokturnal.",
      de: "Ihr suprachiasmatischer Nucleus (SCN), Melatoninausschüttung und Leptin/Ghrelin-Spiegel agieren in hormoneller Balance. Der Schlaf bleibt von Verdauungsimpulsen ungestört.",
      fr: "Votre noyau suprachiasmatique, votre mélatonine nocturne et les peptides leptine/ghréline fonctionnent de concert. Le sommeil n'est pas asservi à la prise alimentaire.",
      es: "Tu núcleo supraquiasmático, melatonina nocturna y hormonas leptina/grelina operan en armonía. La arquitectura de tu sueño no depende de activaciones digestivas.",
    },
    actionProtocol: {
      en: [
        "Maintain consistent morning light exposure within 30 minutes of waking to anchor peripheral clocks.",
        "Keep dinner balanced with slow-digesting complex carbohydrates and protein to preserve nocturnal leptin elevation.",
        "Preserve clean sleep hygiene without bedtime screen exposure to safeguard natural melatonin surges.",
      ],
      id: [
        "Pertahankan paparan sinar matahari pagi dalam 30 menit pertama setelah bangun untuk mengunci jam biologis.",
        "Makan malam dengan karbohidrat kompleks dan protein seimbang agar hormon penahan lapar (leptin) tetap stabil sepanjang malam.",
        "Jaga kebersihan tidur tanpa gawai di tempat tidur untuk melindungi lonjakan alami hormon melatonin.",
      ],
      de: [
        "Nutzen Sie morgens innerhalb von 30 Minuten Tageslicht, um die inneren Uhren zu verankern.",
        "Achten Sie beim Abendessen auf komplexe Kohlenhydrate und Proteine für stabile nächtliche Leptinwerte.",
        "Vermeiden Sie abends helle Bildschirme, um die natürliche Melatoninausschüttung zu bewahren.",
      ],
      fr: [
        "Exposez-vous à la lumière naturelle dans les 30 minutes suivant le réveil pour ancrer vos oscillateurs périphériques.",
        "Composez un dîner équilibré en glucides complexes et protéines pour stabiliser la leptine nocturne.",
        "Évitez les écrans au lit pour préserver le pic physiologique de mélatonine réparatrice.",
      ],
      es: [
        "Toma luz solar directa dentro de los 30 minutos posteriores a despertar para sincronizar tu reloj circadiano.",
        "Cena carbohidratos complejos y proteínas saciantes para mantener elevados los niveles de leptina nocturna.",
        "Evita pantallas en la cama para blindar la producción natural de melatonina antes de dormir.",
      ],
    },
  },
  {
    level: "mild_evening_grazing_habit",
    scoreRange: [8, 14],
    title: {
      en: "Mild Evening Grazing & Stress-Induced Snacking",
      id: "Ngemil Malam Ringan & Kompensasi Stres Harian",
      de: "Leichtes abendliches Grasen & stressbedingtes Naschen",
      fr: "Grignotage vespéral léger & réconfort lié au stress",
      es: "Picoteo nocturno leve y compensación del estrés",
    },
    badge: {
      en: "SITUATIONAL EVENING COMPENSATORY SNACKING",
      id: "NGEMIL MALAM SITUASIONAL KARENA STRES",
      de: "SITUATIVES ABENDLICHES NASCHEN",
      fr: "GRIGNOTAGE DU SOIR OCCASIONNEL",
      es: "PICOTEO NOCTURNO SITUACIONAL",
    },
    summary: {
      en: "You occasionally consume snacks late in the evening or wake up restless during intense work weeks, but nighttime eating is primarily driven by cognitive decompression rather than profound neuroendocrine desynchrony.",
      id: "Kamu sesekali mengemil di larut malam atau terbangun gelisah saat beban kerja menumpuk. Kebiasaan ini lebih dipicu oleh kebutuhan melepas penat emosional daripada gangguan hormonal sirkadian yang parah.",
      de: "Sie naschen gelegentlich spät abends oder wachen in stressigen Phasen unruhig auf. Das Verhalten rührt eher von emotionaler Entlastung als von einer tiefen neuroendokrinen Störung her.",
      fr: "Vous grignotez parfois tard le soir ou vous réveillez lors des périodes de stress intense. Cette habitude relève d'une décompression émotionnelle plus que d'une dysrégulation biologique grave.",
      es: "Picas de vez en cuando a altas horas o te desvelas en épocas de estrés. Responde más a una necesidad de descompresión emocional que a un desajuste hormonal severo.",
    },
    psychology: {
      en: "Cortisol levels remain slightly elevated into the late evening, muting pre-dinner appetite and creating an artificial carbohydrate craving right before bed as an unconscious autonomic down-regulator.",
      id: "Kadar kortisol masih agak tinggi hingga malam hari, menumpulkan nafsu makan sore dan menciptakan rasa lapar karbohidrat palsu sebelum tidur sebagai kompensasi penenang sistem saraf.",
      de: "Erhöhtes Abendcortisol dämpft den Appetit tagsüber und provoziert vor dem Schlafen Verlangen nach Kohlenhydraten zur schnellen Parasympathikus-Aktivierung.",
      fr: "Un cortisol résiduel en soirée émousse l'appétit du dîner et engendre un appel inconscient de sucres lents avant la nuit pour stimuler le système vagal.",
      es: "El cortisol elevado al final del día atenúa el apetito temprano e incita antojos nocturnos de hidratos como sedante natural del sistema nervioso.",
    },
    actionProtocol: {
      en: [
        "Incorporate a 15-minute somatic decompression routine (warm shower, herbal chamomile tea, breathwork) to replace refrigerator soothing.",
        "Shift 200–300 calories from after-dinner snacks to a structured lunch with healthy fats.",
        "Set a compassionate kitchen closing cue 90 minutes before bed (e.g., brushing teeth, dimming kitchen overhead lights).",
      ],
      id: [
        "Ganti dorongan membuka kulkas dengan dekompresi somatik 15 menit (mandi air hangat, teh kamomil, latihan napas 4-7-8).",
        "Pindahkan 200–300 kalori camilan malam ke porsi makan siang yang kaya lemak sehat dan protein.",
        "Terapkan ritual penutupan dapur 90 menit sebelum tidur (gosok gigi, redupkan lampu dapur).",
      ],
      de: [
        "Ersetzen Sie den Gang zum Kühlschrank durch 15 Minuten somatische Entspannung (warme Dusche, Kamillentee, Atemübungen).",
        "Verschieben Sie 200–300 Kalorien vom späten Abend auf ein nahrhaftes Mittagessen mit gesunden Fetten.",
        "Schließen Sie die Küche symbolisch 90 Minuten vor dem Schlafen (Zähneputzen, Küchenlicht dimmen).",
      ],
      fr: [
        "Substituez les visites au réfrigérateur par 15 minutes de sas somatique (douche tiède, tisane de camomille, cohérence cardiaque).",
        "Déplacez 200 à 300 calories des encas du soir vers un déjeuner plus consistant et protéiné.",
        "Instaurez un rituel de clôture de la cuisine 90 minutes avant le coucher (brossage de dents, extinction des lumières vives).",
      ],
      es: [
        "Sustituye la visita a la nevera por 15 minutos de calma somática (ducha tibia, infusión relajante, respiración pausada).",
        "Transfiere de 200 a 300 calorías del picoteo nocturno a un almuerzo nutritivo rico en grasas saludables.",
        "Cierra simbólicamente la cocina 90 minutos antes de acostarte (cepillado dental, luces tenues).",
      ],
    },
  },
  {
    level: "moderate_circadian_phase_delay",
    scoreRange: [15, 21],
    title: {
      en: "Moderate Circadian Phase Delay & Evening Hyperphagia",
      id: "Keterlambatan Fase Sirkadian Sedang & Hiperfagia Malam",
      de: "Moderate circadiane Phasenverzögerung & abendliche Hyperphagie",
      fr: "Retard de phase circadien modéré & hyperphagie vespérale",
      es: "Retraso circadiano moderado e hiperfagia nocturna",
    },
    badge: {
      en: "CIRCADIAN APPETITE PHASE DELAY",
      id: "PERGESERAN JAM MAKAN SIRKADIAN",
      de: "CIRCADIANE PHASENVERSCHIEBUNG",
      fr: "DÉCALAGE DE PHASE CIRCADIENNE",
      es: "DESFASE CIRCADIANO DEL APETITO",
    },
    summary: {
      en: "Your biological hunger rhythm is substantially shifted backward. You have almost no morning appetite, consume over a third of your daily calories late at night, and frequently wake up between 2:00 AM and 4:00 AM with urges to eat.",
      id: "Jam rasa lapar biologismu bergeser mundur secara nyata. Kamu hampir tidak memiliki nafsu makan pagi, melahap lebih dari sepertiga kalori harian di malam hari, dan kerap terbangun jam 2–4 dini hari dengan dorongan makan.",
      de: "Ihr biologischer Hunger-Rhythmus ist deutlich nach hinten verschoben. Morgens haben Sie kaum Appetit, verzehren über ein Drittel der Kalorien spät abends und wachen oft nachts mit Essdrang auf.",
      fr: "Votre horloge d'appétit est nettement décalée vers la nuit. Le matin vous coupe l'appétit, vous ingérez plus du tiers de vos calories après le coucher du soleil et vous réveillez souvent avec l'envie de manger.",
      es: "Tu reloj del hambre se ha desplazado hacia la madrugada. Apenas toleras el desayuno, ingieres más de un tercio de tus calorías por la noche y te desvelas con frecuencia con apetito.",
    },
    psychology: {
      en: "Dr. Albert Stunkard's NES criteria show that the master brain clock (SCN) and peripheral metabolic liver clocks have decoupled. The normal nocturnal rise of leptin (satiety) is blunted, while nocturnal ghrelin remains abnormally elevated.",
      id: "Kriteria NES Dr. Albert Stunkard membuktikan bahwa jam utama otak (SCN) dan jam metabolik di hati kehilangan sinkronisasi. Kenaikan leptin nokturnal (penekan rasa lapar) melemah, sementara hormon pemicu lapar (ghrelin) tetap tinggi.",
      de: "Nach Stunkards NES-Kriterien sind Hauptuhr (SCN) und periphere Stoffwechseluhren entkoppelt. Der nächtliche Anstieg von Leptin bleibt aus, während Ghrelin nachts unphysiologisch hoch bleibt.",
      fr: "Selon les critères de Stunkard, l'horloge centrale (SCN) et les oscillateurs métaboliques hépatiques sont désynchronisés. Le pic nocturne de leptine est émoussé alors que la ghréline reste anormalement active.",
      es: "Según el modelo de Stunkard, el reloj central del hipotálamo y los relojes periféricos del hígado están desajustados. La leptina nocturna no sube adecuadamente y la grelina continúa estimulando el apetito.",
    },
    actionProtocol: {
      en: [
        "Practice 'Circadian Front-Loading': Gradually introduce a protein-rich snack by 11:00 AM even if not feeling intense hunger, to slowly train peripheral metabolic gene expression.",
        "Position a high-lux daylight lamp or get 20 minutes of morning outdoor sunlight within 45 minutes of rising.",
        "Keep bedside non-food anchors (a large glass of room-temperature water with electrolytes, an eye mask, white noise machine) to intercept nocturnal fridge trips.",
      ],
      id: [
        "Lakukan 'Front-Loading Sirkadian': Perlahan kenalkan camilan berprotein tinggi sebelum jam 11:00 siang meski belum terlalu lapar, untuk melatih ritme metabolik organ cerna.",
        "Dapatkan paparan sinar matahari pagi langsung selama 20 menit dalam kurun 45 menit pertama setelah bangun tidur.",
        "Siapkan jangkar non-makanan di samping tempat tidur (segelas air bersuhu ruangan, penutup mata, kipas/white noise) untuk memotong dorongan berjalan ke kulkas.",
      ],
      de: [
        "Beginnen Sie mit 'circadianem Front-Loading': Essen Sie bis 11:00 Uhr eine kleine Portion Protein, um Stoffwechselgene schrittweise umzustellen.",
        "Nutzen Sie innerhalb von 45 Minuten nach dem Aufstehen 20 Minuten direktes Sonnenlicht oder eine Tageslichtlampe.",
        "Stellen Sie neben das Bett ein großes Glas Wasser mit Elektrolyten und nutzen Sie eine Schlafmaske, um nächtliche Gänge zur Küche abzufangen.",
      ],
      fr: [
        "Adoptez le 'front-loading circadien' : consommez un en-cas protéiné avant 11h même sans grande faim pour reprogrammer les gènes métaboliques.",
        "Exposez-vous 20 minutes à la lumière matinale directe dans les 45 minutes suivant le réveil.",
        "Placez au chevet des ancrages sans nourriture (un grand verre d'eau tempérée, un masque de nuit, du bruit blanc) pour briser l'automatisme du frigo.",
      ],
      es: [
        "Aplica 'front-loading circadiano': introduce un tentempié rico en proteínas antes de las 11:00 aunque no tengas gran apetito para reactivar relojes hepáticos.",
        "Recibe 20 minutos de luz natural exterior dentro de los primeros 45 minutos de tu jornada.",
        "Coloca en tu mesita de noche un vaso grande de agua y un antifaz para desactivar el reflejo de caminar a oscuras hacia la cocina.",
      ],
    },
  },
  {
    level: "high_clinical_night_eating_syndrome",
    scoreRange: [22, 28],
    title: {
      en: "High Clinical Risk of Night Eating Syndrome (NES)",
      id: "Risiko Klinis Tinggi Night Eating Syndrome (NES)",
      de: "Hohes klinisches Risiko für Night-Eating-Syndrom (NES)",
      fr: "Risque clinique élevé de syndrome d'alimentation nocturne (SAN)",
      es: "Riesgo clínico elevado de Síndrome de Comedor Nocturno (SCN)",
    },
    badge: {
      en: "CLINICAL NES PROFILE (ALLISON NEQ)",
      id: "PROFIL NES KLINIS (SKALA ALLISON NEQ)",
      de: "KLINISCHES NES-PROFIL (ALLISON NEQ)",
      fr: "PROFIL SAN CLINIQUE (ALLISON NEQ)",
      es: "PERFIL CLÍNICO DE SCN (ALLISON NEQ)",
    },
    summary: {
      en: "You meet the core diagnostic markers for Night Eating Syndrome. You experience severe morning anorexia, consume a predominant portion of your daily nutrition during late-night hours, and awaken multiple times weekly with an obsessive conviction that sleep requires food.",
      id: "Kamu memenuhi indikator klinis utama Night Eating Syndrome. Kamu mengalami penolakan makan pagi yang parah, mengonsumsi sebagian besar nutrisi di larut malam, dan terbangun berkali-kali setiap minggu dengan keyakinan kuat bahwa kamu wajib makan agar bisa tidur.",
      de: "Sie erfüllen die Kernkriterien für das Night-Eating-Syndrom. Ausgeprägte Morgenanorexie, massive Verschiebung der Kalorienzufuhr in die Nacht und wiederholtes nächtliches Erwachen mit Esszwang prägen Ihren Alltag.",
      fr: "Vous présentez les caractéristiques cliniques du syndrome d'alimentation nocturne. Anorexie matinale marquée, report massif des calories vers la nuit et réveils fréquents conditionnés par le besoin de manger.",
      es: "Cumples los criterios centrales del Síndrome de Comedor Nocturno. Anorexia matutina pronunciada, ingesta nocturna masiva y despertares recurrentes condicionados por la necesidad de comer.",
    },
    psychology: {
      en: "Research by Dr. Kelly Allison and colleagues demonstrates a marked circadian phase delay in melatonin and leptin, alongside blunted nocturnal decline of ACTH and cortisol. Carbohydrate consumption acts as an artificial surge of tryptophan to force serotonin and melatonin production under sleep distress.",
      id: "Penelitian Dr. Kelly Allison membuktikan adanya keterlambatan fase sekresi melatonin dan leptin, serta kegagalan penurunan hormon stres kortisol di malam hari. Makanan manis dan karbohidrat dijadikan jalan pintas biologis untuk memicu triptofan dan serotonin demi memaksakan tidur.",
      de: "Studien von Dr. Kelly Allison belegen eine Phasenverzögerung von Melatonin und Leptin bei gleichzeitig fehlendem nächtlichem Cortisolabfall. Kohlenhydrate dienen als Notlösung, um über Tryptophan Serotonin zu erzwingen.",
      fr: "Les travaux de recherche démontrent un retard de sécrétion de mélatonine et de leptine, combiné à une hypercortisolémie nocturne. Les glucides consommés la nuit constituent une tentative biochimique d'obtenir du tryptophane pour forcer le sommeil.",
      es: "Los estudios de la Dra. Allison evidencian un retraso de fase en la melatonina y leptina con cortisol nocturno elevado. Los carbohidratos nocturnos se utilizan de forma inconsciente para captar triptófano y forzar la síntesis de serotonina.",
    },
    actionProtocol: {
      en: [
        "Seek evaluation with a sleep specialist or psychiatrist specialized in chronotherapy and circadian eating disorders.",
        "Consider discussing chronobiological interventions (e.g., morning bright light therapy 10,000 lux for 30 minutes, or selective melatonin receptor agonists).",
        "Implement non-judgmental stimulus control: Place an inspiring grounding note or chime on the refrigerator door to break dissociative nocturnal trances.",
      ],
      id: [
        "Konsultasikan kondisi ini dengan dokter spesialis kedokteran jiwa (psikiater) atau spesialis tidur yang memahami gangguan makan sirkadian.",
        "Pertimbangkan intervensi kronobiologi medis (misalnya terapi cahaya terang 10.000 lux setiap pagi selama 30 menit).",
        "Terapkan stimulus control penuh empati: tempelkan catatan pengingat yang lembut atau pasang bel kecil di pintu kulkas untuk memecah lamunan saat terbangun di malam hari.",
      ],
      de: [
        "Lassen Sie sich von einem Schlafmediziner oder Psychiater für Chronobiologie und Essstörungen untersuchen.",
        "Besprechen Sie chronotherapeutische Ansätze (z. B. morgendliche Lichttherapie mit 10.000 Lux über 30 Minuten).",
        "Nutzen Sie Reizkontrolle: Bringen Sie eine achtsame Notiz oder ein Glöckchen am Kühlschrank an, um nächtliche Trancezustände zu unterbrechen.",
      ],
      fr: [
        "Consultez un médecin du sommeil ou un psychiatre spécialisé dans les troubles du comportement alimentaire circadiens.",
        "Évaluez l'opportunité d'une luminothérapie matinale médicale (10 000 lux pendant 30 minutes au réveil).",
        "Mettez en place un contrôle des stimuli bienveillant : placez un mot doux de rappel ou un carillon sur le réfrigérateur pour briser l'état de transe nocturne.",
      ],
      es: [
        "Solicita valoración con un especialista en medicina del sueño o psiquiatra versado en cronobiología y conducta alimentaria.",
        "Valora intervenciones de cronoterapia médica (como fototerapia matinal con 10.000 lux durante 30 minutos).",
        "Aplica control de estímulos compasivo: fija un mensaje tranquilizador o una pequeña campanilla en la nevera para interrumpir el trance nocturno.",
      ],
    },
  },
  {
    level: "acute_severe_circadian_neuroendocrine_dysregulation",
    scoreRange: [29, 36],
    title: {
      en: "Acute Neuroendocrine Circadian Dysregulation & Chronic NES",
      id: "Disregulasi Neuroendokrin Sirkadian Akut & NES Kronis",
      de: "Akute neuroendokrine circadiane Dysregulation & chronisches NES",
      fr: "Dysrégulation neuroendocrinienne circadienne aiguë & SAN sévère",
      es: "Desregulación neuroendocrina circadiana aguda y SCN crónico",
    },
    badge: {
      en: "ACUTE NEUROENDOCRINE CIRCADIAN CRISIS",
      id: "KRISIS SIRKADIAN NEUROENDOKRIN AKUT",
      de: "AKUTE CIRCADIANE METABOLISCHE KRISE",
      fr: "CRISE CIRCADIENNE ET MÉTABOLIQUE AIGUË",
      es: "CRISIS CIRCADIANO-METABÓLICA AGUDA",
    },
    summary: {
      en: "You are experiencing profound circadian and metabolic distress. Nocturnal eating occurs every night, sleep architecture is heavily fragmented, and the resulting exhaustion, shame, and metabolic strain are severely impacting your physical and emotional well-being.",
      id: "Kamu mengalami tekanan metabolik dan sirkadian yang sangat mendalam. Makan di tengah malam terjadi setiap hari, kualitas tidur hancur, serta kelelahan fisik dan beban rasa bersalah berdampak buruk pada kesehatan mental dan tubuhmu.",
      de: "Sie erleben eine schwere circadiane und metabolische Erschöpfung. Das nächtliche Essen tritt jede Nacht auf, Ihr Schlafrhythmus ist tiefgreifend gestört, und Scham sowie Erschöpfung belasten Ihre Lebensqualität enorm.",
      fr: "Vous traversez une détresse métabolique et circadienne majeure. Les prises alimentaires ont lieu chaque nuit, le sommeil est morcelé et la souffrance physique comme psychologique est intense.",
      es: "Atraviesas un agotamiento metabólico y circadiano profundo. La ingesta nocturna sucede a diario, el sueño está completamente desestructurado y la culpa y el cansancio merman tu salud global.",
    },
    psychology: {
      en: "The circadian phase shift has created an inverted metabolic state: peripheral organs expect nutrients primarily when the brain is scheduled for slow-wave sleep. This is accompanied by severe hypothalamic-pituitary-adrenal (HPA) axis dysregulation and nocturnal hyperarousal.",
      id: "Pergeseran fase sirkadian telah membalik fungsi metabolisme tubuh: organ pencernaan dipaksa memproses makanan pada saat otak seharusnya berada dalam fase tidur gelombang lambat. Hal ini memicu disregulasi poros HPA dan lonjakan kecemasan di malam hari.",
      de: "Die Phasenverschiebung hat Ihren Stoffwechsel invertiert: Verdauungsorgane werden gefordert, wenn das Gehirn im Tiefschlaf sein sollte. Dies geht mit einer Dysfunktion der HPA-Achse und nächtlicher Übererregung einher.",
      fr: "Le décalage de phase a inversé votre métabolisme : les viscères sont sollicités à l'heure où le cerveau devrait être en sommeil profond. L'axe hypothalamo-hypophyso-surrénalien est en surchauffe nocturne.",
      es: "El desfase circadiano ha invertido tu reloj metabólico: tus órganos digestivos procesan comida cuando el cerebro debería estar en sueño profundo, con activación severa del eje hipotálamo-hipofisario-adrenal.",
    },
    actionProtocol: {
      en: [
        "Prioritize immediate, compassionate multidisciplinary clinical care combining an endocrinologist, chronobiologist/psychiatrist, and registered dietitian.",
        "Do not restrict calories harshly during the day: Restrictive crash diets exacerbate evening neuroendocrine panic and intensify night eating.",
        "Use Nuju voice journaling at your bedside: If you wake in distress, softly whisper your feelings into Nuju instead of walking into the kitchen.",
      ],
      id: [
        "Segera cari pendampingan klinis multidisiplin yang memadukan dokter psikiater/ahli kronobiologi, spesialis endokrin, dan ahli gizi klinis.",
        "Jangan membatasi kalori secara ekstrem di siang hari: diet ketat justru memicu kepanikan neuroendokrin dan memperparah makan di larut malam.",
        "Gunakan jurnal suara Nuju di samping kasur: saat terbangun gelisah, bisikkan perasaanmu ke Nuju untuk menurunkan tegangan saraf tanpa harus berjalan ke dapur.",
      ],
      de: [
        "Suchen Sie zeitnah multidisziplinäre Hilfe (Facharzt für Psychiatrie/Schlafmedizin, Endokrinologe und Ernährungsberatung).",
        "Vermeiden Sie rigide Tagesdiäten: Kalorienrestriktion verstärkt nächtliche neuroendokrine Gegenreaktionen drastisch.",
        "Nutzen Sie Nuju-Sprachjournaling am Bett: Wenn Sie nachts unruhig aufwachen, sprechen Sie Ihre Gefühle leise ein, statt in die Küche zu gehen.",
      ],
      fr: [
        "Consultez sans attendre une équipe pluridisciplinaire (psychiatre spécialisé, endocrinologue et diététicien clinicien).",
        "Ne commencez aucun régime drastique en journée : la restriction cognitive aggrave violemment le rebond nocturne.",
        "Pratiquez le journal vocal Nuju au lit : en cas de réveil angoissé, chuchotez ce que vous ressentez pour apaiser votre système nerveux sans vous lever.",
      ],
      es: [
        "Acude a un equipo multidisciplinar con psiquiatra, endocrinólogo y nutricionista especializado en trastornos del ritmo circadiano.",
        "Evita dietas diurnas estrictas: la restricción calórica severa dispara la alarma neuroendocrina y recrudece el atracón de madrugada.",
        "Utiliza el diario de voz de Nuju desde la cama: si despiertas con ansiedad, susurra tus emociones a la app para regularte sin ir a la cocina.",
      ],
    },
  },
];

export const NIGHT_EATING_OPTIONS = [
  {
    value: 0,
    label: {
      en: "0 - Never / Not at all (Healthy Circadian Appetite)",
      id: "0 - Tidak Pernah / Sama Sekali Tidak (Nafsu Makan Normal)",
      de: "0 - Nie / Gar nicht (Gesunder Appetitrhythmus)",
      fr: "0 - Jamais / Pas du tout (Appétit circadien sain)",
      es: "0 - Nunca / En absoluto (Apetito circadiano saludable)",
    },
  },
  {
    value: 1,
    label: {
      en: "1 - Rarely / Mild (1–2 times per month or under stress)",
      id: "1 - Jarang / Ringan (1–2 kali sebulan saat banyak pikiran)",
      de: "1 - Selten / Leicht (1–2 Mal pro Monat bei Stress)",
      fr: "1 - Rarement / Léger (1 à 2 fois par mois sous stress)",
      es: "1 - Rara vez / Leve (1-2 veces al mes o bajo estrés)",
    },
  },
  {
    value: 2,
    label: {
      en: "2 - Frequently / Moderate (2–3 times per week)",
      id: "2 - Sering / Sedang (2–3 kali seminggu, mulai mengganggu)",
      de: "2 - Häufig / Mäßig (2–3 Mal pro Woche, spürbar störend)",
      fr: "2 - Fréquemment / Modéré (2 à 3 fois par semaine)",
      es: "2 - Frecuentemente / Moderado (2-3 veces por semana)",
    },
  },
  {
    value: 3,
    label: {
      en: "3 - Almost Nightly / Severe (4+ nights per week, intense urge)",
      id: "3 - Hampir Setiap Malam / Sangat Parah (4+ malam seminggu, dorongan kuat)",
      de: "3 - Fast jede Nacht / Schwer (4+ Nächte pro Woche, starker Zwang)",
      fr: "3 - Presque chaque nuit / Sévère (4+ nuits par semaine, besoin impérieux)",
      es: "3 - Casi a diario / Severo (4+ noches por semana, impulso incontrolable)",
    },
  },
];

export const NIGHT_EATING_SUBSCALE_INFO = {
  circadian_delay_morning_anorexia: {
    name: {
      en: "Circadian Delay & Morning Anorexia",
      id: "Keterlambatan Sirkadian & Anoreksia Pagi",
      de: "Circadiane Verzögerung & Morgenanorexie",
      fr: "Retard circadien & anorexie matinale",
      es: "Retraso circadiano y anorexia matutina",
    },
    description: {
      en: "Lack of morning appetite, skipping breakfast, delayed first meal until afternoon, and consuming >25% of calories after dinner.",
      id: "Ketiadaan nafsu makan pagi, melewatkan sarapan, menunda makan berat hingga sore, dan melahap >25% kalori setelah makan malam.",
      de: "Fehlender morgendlicher Appetit, Auslassen des Frühstücks und Verzehr von über 25 % der Kalorienmenge nach dem Abendessen.",
      fr: "Absence d'appétit matinal, petit-déjeuner sauté et report de plus de 25 % de l'apport énergétique après le dîner.",
      es: "Falta de apetito matutino, saltarse el desayuno e ingerir más del 25% de calorías diarias tras la cena.",
    },
  },
  nocturnal_awakenings_ingestion_urge: {
    name: {
      en: "Nocturnal Awakenings & Ingestion Urge",
      id: "Terbangun Tengah Malam & Dorongan Makan",
      de: "Nächtliches Erwachen & Essdrang",
      fr: "Réveils nocturnes & besoin d'ingestion",
      es: "Despertares nocturnos y urgencia de ingesta",
    },
    description: {
      en: "Waking from sleep between 1 AM and 4 AM with an urgent, conscious psychological compulsion to ingest carbohydrates to fall asleep.",
      id: "Terbangun antara jam 1–4 dini hari dengan dorongan psikologis sadar untuk mengonsumsi karbohidrat demi bisa tertidur kembali.",
      de: "Erwachen zwischen 1 und 4 Uhr mit bewusstem, drängendem Zwang zur Kohlenhydrataufnahme, um wieder einschlafen zu können.",
      fr: "Réveils en pleine nuit avec le besoin conscient et impérieux de consommer des glucides pour retrouver le sommeil.",
      es: "Despertares de madrugada con un impulso consciente e irrefrenable de ingerir carbohidratos para volver a conciliar el sueño.",
    },
  },
  evening_dysphoria_sleep_fragmentation: {
    name: {
      en: "Evening Dysphoria & Sleep Fragmentation",
      id: "Disforia Senja & Gangguan Kualitas Tidur",
      de: "Abendliche Dysphorie & Schlaffragmentierung",
      fr: "Dysphorie vespérale & fragmentation du sommeil",
      es: "Disforia vespertina y fragmentación del sueño",
    },
    description: {
      en: "Mood decline after dusk, nighttime anxiety, frequent sleep fragmentation, and morning shame or guilt regarding nocturnal eating.",
      id: "Penurunan suasana hati menjelang malam, kecemasan nokturnal, tidur terputus-putus, serta rasa bersalah mendalam di pagi hari.",
      de: "Stimmungsabfall am Abend, nächtliche Ängste, unruhiger Schlaf und quälende Schamgefühle am nächsten Morgen.",
      fr: "Baisse de moral crépusculaire, anxiété nocturne, sommeil haché et sentiment de honte ou de culpabilité au réveil.",
      es: "Deterioro del ánimo al atardecer, inquietud nocturna, despertares fragmentados y culpa o vergüenza matinal.",
    },
  },
};

export function calculateNightEatingScore(answers: Record<number, number>): number {
  return Object.values(answers).reduce((sum, val) => sum + val, 0);
}

export function calculateNightEatingSubscales(answers: Record<number, number>): {
  circadian_delay_morning_anorexia: number;
  nocturnal_awakenings_ingestion_urge: number;
  evening_dysphoria_sleep_fragmentation: number;
} {
  let cda = 0;
  let nai = 0;
  let edf = 0;

  NIGHT_EATING_QUESTIONS.forEach((q) => {
    const score = answers[q.id] ?? 0;
    if (q.subscale === "circadian_delay_morning_anorexia") cda += score;
    if (q.subscale === "nocturnal_awakenings_ingestion_urge") nai += score;
    if (q.subscale === "evening_dysphoria_sleep_fragmentation") edf += score;
  });

  return {
    circadian_delay_morning_anorexia: cda,
    nocturnal_awakenings_ingestion_urge: nai,
    evening_dysphoria_sleep_fragmentation: edf,
  };
}

export function getNightEatingResultLevel(score: number): NightEatingResultLevel {
  const match = NIGHT_EATING_RESULT_LEVELS.find(
    (lvl) => score >= lvl.scoreRange[0] && score <= lvl.scoreRange[1]
  );
  return match || NIGHT_EATING_RESULT_LEVELS[NIGHT_EATING_RESULT_LEVELS.length - 1];
}

export const getNightEatingResult = getNightEatingResultLevel;
export const NIGHT_EATING_RESULTS = NIGHT_EATING_RESULT_LEVELS;
