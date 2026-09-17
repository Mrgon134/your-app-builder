export type CortisolLang = "en" | "id" | "de" | "fr" | "es";

export interface CortisolQuestion {
  id: number;
  subscale: "circadian_sleep" | "muscular_somatic" | "neuroendocrine_overdrive";
  prompt: Record<CortisolLang, string>;
  options: Array<{
    score: number;
    label: Record<CortisolLang, string>;
  }>;
}

export interface CortisolProfile {
  level: "adrenal_exhaustion" | "wired_and_tired" | "episodic_strain" | "balanced_vitality";
  badge: Record<CortisolLang, string>;
  title: Record<CortisolLang, string>;
  tagline: Record<CortisolLang, string>;
  description: Record<CortisolLang, string>;
  somaticInsight: Record<CortisolLang, string>;
  downRegulationProtocols: Record<CortisolLang, string[]>;
  dailyAffirmation: Record<CortisolLang, string>;
}

export interface CortisolScoreResult {
  totalScore: number;
  maxScore: number;
  percentage: number;
  level: "adrenal_exhaustion" | "wired_and_tired" | "episodic_strain" | "balanced_vitality";
  profile: CortisolProfile;
  subscales: {
    circadian_sleep: { score: number; max: number; percentage: number };
    muscular_somatic: { score: number; max: number; percentage: number };
    neuroendocrine_overdrive: { score: number; max: number; percentage: number };
  };
}

export const CORTISOL_QUESTIONS: CortisolQuestion[] = [
  // Subscale 1: Circadian Rhythm & Sleep Dysregulation
  {
    id: 1,
    subscale: "circadian_sleep",
    prompt: {
      en: "Do you regularly wake up between 2:00 AM and 4:00 AM with your heart beating fast and your mind racing about to-do lists?",
      id: "Apakah kamu sering terbangun antara jam 2 sampai 4 pagi dengan detak jantung berdegup kencang dan pikiran langsung berputar memikirkan beban tugas?",
      de: "Wachst du regelmäßig zwischen 2:00 und 4:00 Uhr nachts mit Herzklopfen und kreisenden Gedanken auf?",
      fr: "Vous réveillez-vous régulièrement entre 2h et 4h du matin avec le cœur qui palpite et l'esprit en ébullition ?",
      es: "¿Te despiertas habitualmente entre las 2:00 y las 4:00 de la madrugada con taquicardia y pensamientos en bucle?",
    },
    options: [
      { score: 0, label: { en: "Never; I sleep deeply and continuously through the night", id: "Tidak pernah; tidurku nyenyak sepanjang malam", de: "Nie; ich schlafe tief und fest durch", fr: "Jamais; mon sommeil est profond et continu", es: "Nunca; duermo profundamente toda la noche" } },
      { score: 1, label: { en: "Rarely, maybe once a month during extreme deadlines", id: "Jarang, mungkin sebulan sekali saat dikejar tenggat ketat", de: "Selten, höchstens einmal im Monat bei Stress", fr: "Rarement, peut-être une fois par mois en période de pointe", es: "Raramente, tal vez una vez al mes con entregas exigentes" } },
      { score: 2, label: { en: "Frequently (2-3 nights a week)", id: "Sering (2-3 malam dalam sepekan)", de: "Häufig (2-3 Nächte pro Woche)", fr: "Souvent (2 à 3 nuits par semaine)", es: "Frecuentemente (2 o 3 noches por semana)" } },
      { score: 3, label: { en: "Almost every single night; it has become an agonizing routine", id: "Hampir setiap malam; sudah jadi siklus yang sangat menyiksa", de: "Fast jede Nacht; es ist eine quälende Routine geworden", fr: "Presque toutes les nuits; c'est devenu un calvaire systématique", es: "Casi todas las noches; se ha convertido en un calvario crónico" } },
    ],
  },
  {
    id: 2,
    subscale: "circadian_sleep",
    prompt: {
      en: "How do you feel upon waking in the morning: energized or hit by heavy dread and sluggish exhaustion?",
      id: "Bagaimana rasanya saat bangun di pagi hari: segar bugar atau dihantam rasa cemas dan kelelahan berat?",
      de: "Wie fühlst du dich morgens nach dem Aufstehen: erfrischt oder von schwerer Erschöpfung und Unruhe gelähmt?",
      fr: "Comment vous sentez-vous au réveil le matin : plein d'énergie ou accablé d'angoisse et de fatigue ?",
      es: "¿Cómo te sientes al despertar por la mañana: descansado o golpeado por una fatiga pesada y angustia?",
    },
    options: [
      { score: 0, label: { en: "Refreshed and ready for the day within 10 minutes", id: "Segar dan siap beraktivitas dalam 10 menit", de: "Erholt und innerhalb von 10 Minuten einsatzbereit", fr: "En forme et dispos en moins de 10 minutes", es: "Despejado y activo en menos de 10 minutos" } },
      { score: 1, label: { en: "A bit groggy for a few minutes, but easily shake it off", id: "Agak mengantuk sebentar, tapi cepat hilang", de: "Kurz schlaftrunken, aber schnell wach", fr: "Un peu vaseux au début, mais vite dissipé", es: "Un poco somnoliento al principio, pero pasa rápido" } },
      { score: 2, label: { en: "Heavy morning dread; getting out of bed requires immense mental bargaining", id: "Perasaan cemas berat; beranjak dari kasur butuh tawar-menawar mental yang melelahkan", de: "Schwere Morgenunruhe; Aufstehen erfordert enorme Überwindung", fr: "Angoisse matinale marquée; sortir du lit demande un effort immense", es: "Pesadez y angustia matinal; levantarme requiere una batalla mental" } },
      { score: 3, label: { en: "Completely crushed; I feel like I haven't slept in a year, accompanied by visceral stomach dread", id: "Remuk total; merasa seperti tidak pernah tidur setahun, disertai perut mual cemas", de: "Völlig zerschlagen; als hätte ich monatelang nicht geschlafen, mit Magenkrampf", fr: "Totalement brisé; l'impression de n'avoir pas dormi depuis des mois avec la boule au ventre", es: "Completamente destrozado; siento que llevo meses sin dormir y con náuseas de ansiedad" } },
    ],
  },
  {
    id: 3,
    subscale: "circadian_sleep",
    prompt: {
      en: "Do you experience an unexpected 'second wind' of hyper-alert nervous energy late at night (10:00 PM – 1:00 AM) after feeling exhausted all day?",
      id: "Apakah kamu mengalami lonjakan energi mendadak (second wind) larut malam (jam 10 malam - 1 pagi) padahal seharian merasa lemas?",
      de: "Erlebst du spätabends (22-1 Uhr) einen plötzlichen 'zweiten Wind' nervöser Wachheit, obwohl du tagsüber schlapp warst?",
      fr: "Ressentez-vous un 'second souffle' d'énergie nerveuse tard le soir (22h-1h) après avoir traîné toute la journée ?",
      es: "¿Experimentas un 'segundo aire' de alerta nerviosa tarde por la noche (22:00-1:00) tras haber estado exhausto todo el día?",
    },
    options: [
      { score: 0, label: { en: "No; I get naturally sleepy around bedtime", id: "Tidak; rasa kantuk datang alami di jam tidur", de: "Nein; werde zur Schlafenszeit ganz natürlich müde", fr: "Non; le sommeil vient naturellement à l'heure du coucher", es: "No; me entra sueño de forma natural a mi hora" } },
      { score: 1, label: { en: "Occasionally if I work late on something exciting", id: "Sesekali jika sedang asyik mengerjakan sesuatu", de: "Gelegentlich bei spannenden Projekten", fr: "Parfois si je travaille sur un sujet passionnant", es: "A veces si me entretengo con un proyecto interesante" } },
      { score: 2, label: { en: "Frequently; my mind starts spinning creatively just as I try to sleep", id: "Sering; pikiran justru aktif saat kepala menyentuh bantal", de: "Häufig; mein Kopf fängt im Bett an zu rasen", fr: "Souvent; mon cerveau s'emballe pile au moment de dormir", es: "A menudo; la mente se acelera justo al meterse en la cama" } },
      { score: 3, label: { en: "Nightly; physically tired but mentally buzzing and wired until the early hours", id: "Tiap malam; tubuh lelah lunglai tapi kepala seperti disengat listrik hingga subuh", de: "Jede Nacht; körperlich platt, aber innerlich wie unter Strom bis in die Puppen", fr: "Chaque nuit; corps épuisé mais cerveau sous haute tension jusqu'au petit matin", es: "Cada noche; cuerpo exhausto pero cerebro hiperconectado hasta la madrugada" } },
    ],
  },

  // Subscale 2: Muscular Tension & Somatic Armoring
  {
    id: 4,
    subscale: "muscular_somatic",
    prompt: {
      en: "Do you catch yourself clenching your jaw, grinding your teeth (bruxism), or holding your tongue glued tightly against the roof of your mouth?",
      id: "Apakah kamu sering menyadari rahangmu mengatup kencang, menggertakkan gigi (bruxism), atau lidah menekan keras langit-langit mulut?",
      de: "Ertappst du dich beim Zusammenbeißen der Zähne, Zähneknirschen oder Angespannt-Halten der Zunge am Gaumen?",
      fr: "Vous surprenez-vous à serrer la mâchoire, grincer des dents ou plaquer fermement la langue contre le palais ?",
      es: "¿Te descubres apretando la mandíbula, rechinando los dientes (bruxismo) o pegando la lengua al paladar con fuerza?",
    },
    options: [
      { score: 0, label: { en: "Never; my jaw and facial muscles stay relaxed", id: "Tidak pernah; rahang dan otot wajahku selalu rileks", de: "Nie; meine Kiefer- und Gesichtsmuskeln sind entspannt", fr: "Jamais; ma mâchoire et mon visage restent détendus", es: "Nunca; mi mandíbula y músculos faciales están relajados" } },
      { score: 1, label: { en: "Only during intense concentration or heavy workouts", id: "Hanya saat konsentrasi tinggi atau olahraga berat", de: "Nur bei starker Konzentration oder Sport", fr: "Uniquement lors d'efforts intenses ou de sport", es: "Solo durante esfuerzos físicos o mucha concentración" } },
      { score: 2, label: { en: "Often; I wake up with a sore jaw or temple headache", id: "Sering; bangun tidur dengan rahang pegal atau pelipis berdenyut", de: "Oft; wache mit schmerzendem Kiefer oder Kopfschmerzen auf", fr: "Souvent; je me réveille avec la mâchoire endolorie ou mal aux tempes", es: "A menudo; me despierto con dolor de mandíbula o en las sienes" } },
      { score: 3, label: { en: "Constant chronic lock; I need a nightguard, have TMJ pain, or catch myself clenching all day", id: "Kaku kronis; butuh pelindung gigi (nightguard), sakit TMJ, dan terus mengatup rahang seharian", de: "Chronische Kiefersperre; brauche Knirschschiene, ständige Schmerzen", fr: "Verrouillage chronique; douleurs d'ATM régulières, gouttière indispensable", es: "Tensión crónica severa; uso férula de descarga, tengo dolor articular a diario" } },
    ],
  },
  {
    id: 5,
    subscale: "muscular_somatic",
    prompt: {
      en: "Take a breath right now: are your shoulders crept up toward your ears, and are you breathing shallowly from your upper chest?",
      id: "Coba tarik napas sekarang: apakah bahumu naik mendekati telinga, dan napasmu dangkal hanya di dada bagian atas?",
      de: "Atme jetzt ein: Sind deine Schultern zu den Ohren hochgezogen und atmest du nur flach in die obere Brust?",
      fr: "Respirez un instant : vos épaules sont-elles crispées vers vos oreilles et votre souffle bloqué dans le haut du torse ?",
      es: "Haz una respiración ahora mismo: ¿tienes los hombros pegados a las orejas y respiras de forma corta y superficial?",
    },
    options: [
      { score: 0, label: { en: "No; shoulders are dropped and I breathe deeply into my belly", id: "Tidak; bahu rileks turun dan napas masuk dalam ke perut", de: "Nein; Schultern sind locker, Atmung fließt tief in den Bauch", fr: "Non; épaules basses et respiration abdominale ample", es: "No; hombros relajados y respiración diafragmática profunda" } },
      { score: 1, label: { en: "Slight shoulder tension after sitting at a desk", id: "Sedikit tegang setelah lama duduk di meja kerja", de: "Leichte Verspannung nach langem Sitzen am Schreibtisch", fr: "Légère tension d'ordinateur classique", es: "Tensión leve tras horas frente al ordenador" } },
      { score: 2, label: { en: "Noticeable armor; my neck and upper back feel like tight concrete cables", id: "Tegang jelas; leher dan punggung atas terasa seperti kabel kawat kaku", de: "Spürbare Verhärtung; Nacken fühlt sich wie Drahtseile an", fr: "Cuirasse musculaire nette; nuque et trapèzes durs comme du béton", es: "Tensión notable; cuello y trapecios duros como cables de acero" } },
      { score: 3, label: { en: "Permanent breath-holding; I frequently realize I have stopped breathing altogether (email apnea)", id: "Sering menahan napas; sering tersadar tidak bernapas sama sekali saat menatap layar (email apnea)", de: "Ständiges Atem-Anhalten (Email-Apnoe); chronisch verkrampft", fr: "Apnée d'écran quasi permanente; je m'aperçois souvent que j'ai cessé de respirer", es: "Apnea de pantalla constante; a menudo me doy cuenta de que llevo segundos sin respirar" } },
    ],
  },
  {
    id: 6,
    subscale: "muscular_somatic",
    prompt: {
      en: "Do you suffer from digestive flare-ups, acid reflux, stomach knotting, or sudden IBS symptoms when under deadline pressure?",
      id: "Apakah perutmu sering begah, asam lambung naik, perut melilit, atau tiba-tiba diare/sembelit saat berada di bawah tekanan?",
      de: "Reagiert dein Magen-Darm-Trakt auf Stress mit Sodbrennen, Krämpfen oder Reizdarm-Symptomen?",
      fr: "Votre système digestif réagit-il au stress par des reflux, des nœuds à l'estomac ou des crises de côlon irritable ?",
      es: "¿Tu aparato digestivo reacciona al estrés con ardor, nudo en el estómago o síntomas de colon irritable?",
    },
    options: [
      { score: 0, label: { en: "Rarely or never; robust digestive equilibrium", id: "Jarang atau tidak pernah; pencernaan stabil dan sehat", de: "Nie; stabile Verdauung und ruhiger Magen", fr: "Jamais; digestion fluide et sereine", es: "Raramente; digestión estable y vientre tranquilo" } },
      { score: 1, label: { en: "Occasional mild flutter before a big speech", id: "Sesekali rasa geli wajar sebelum berbicara di depan umum", de: "Gelegentliches Kribbeln vor großen Auftritten", fr: "Petits papillons normaux avant un exposé", es: "Leves mariposas antes de hablar en público" } },
      { score: 2, label: { en: "Frequent bloating, burning stomach, or bathroom urgency during stress", id: "Sering kembung, perih lambung, atau mendadak ke toilet saat cemas", de: "Häufiges Völlegefühl, Sodbrennen oder Reizdarm bei Druck", fr: "Ballonnements réguliers, brûlures ou urgence intestinale sous stress", es: "Hinchazón frecuente, acidez o urgencia de ir al baño con la presión" } },
      { score: 3, label: { en: "Severe gut-brain axis distress; stress immediately shuts down my digestion", id: "Gangguan gut-brain axis parah; stres langsung mematikan fungsi pencernaanku", de: "Akuter Zusammenbruch der Darm-Hirn-Achse bei jeder Belastung", fr: "Dysfonctionnement sévère de l'axe intestin-cerveau dès la moindre tension", es: "Colapso del eje intestino-cerebro; el estrés paraliza mi digestión de inmediato" } },
    ],
  },

  // Subscale 3: Neuroendocrine Overdrive ("Wired & Tired")
  {
    id: 7,
    subscale: "neuroendocrine_overdrive",
    prompt: {
      en: "Do you experience sudden blood sugar or energy crashes between 2:00 PM and 4:00 PM where your brain feels like it is shutting off?",
      id: "Apakah kamu mengalami penurunan energi drastis antara jam 2 sampai 4 sore di mana otakmu terasa seperti mati lampu?",
      de: "Erlebst du zwischen 14 und 16 Uhr dramatische Energieabstürze, bei denen dein Gehirn abschaltet?",
      fr: "Subissez-vous des chutes d'énergie vertigineuses entre 14h et 16h où votre cerveau semble s'éteindre ?",
      es: "¿Sufres caídas drásticas de energía entre las 14:00 y las 16:00 donde el cerebro parece apagarse por completo?",
    },
    options: [
      { score: 0, label: { en: "No; steady, sustained energy throughout the afternoon", id: "Tidak; energiku stabil sepanjang sore", de: "Nein; gleichmäßige Energie über den ganzen Nachmittag", fr: "Non; énergie stable et constante tout l'après-midi", es: "No; energía continua y estable durante la tarde" } },
      { score: 1, label: { en: "Mild post-lunch lull, easily cured by a short walk", id: "Mengantuk ringan setelah makan siang, beres dengan jalan kaki sejenak", de: "Leichtes Mittagstief, durch Spaziergang schnell behoben", fr: "Léger coup de pompe d'après-repas facilement résolu", es: "Bajón suave postcomida que se quita caminando un poco" } },
      { score: 2, label: { en: "Severe fog; I crave sugar or high-dose caffeine just to remain semi-functional", id: "Brain fog parah; butuh gula manis atau kopi dosis tinggi agar bisa lanjut kerja", de: "Schwerer Nebel; brauche Zucker oder Espresso, um zu überleben", fr: "Brouillard épais; besoin urgent de sucre ou de café fort pour tenir", es: "Niebla mental densa; dependo de café o azúcar para mantenerme despierto" } },
      { score: 3, label: { en: "Adrenal collapse; I feel physically dizzy, nauseous, or incapable of reading text", id: "Drop total; kepala pusing berkunang-kunang, mual, atau tak sanggup membaca tulisan", de: "Kompletter Einbruch; Schwindel, Zittern und Leseblockade", fr: "Effondrement total; vertiges, nausées et incapacité à lire l'écran", es: "Colapso físico; mareos, temblores e incapacidad para leer un párrafo" } },
    ],
  },
  {
    id: 8,
    subscale: "neuroendocrine_overdrive",
    prompt: {
      en: "How does your body react to caffeine: does a cup of coffee give you calm focus, or trigger immediate heart palpitations and sweaty anxiety?",
      id: "Bagaimana tubuhmu bereaksi terhadap kafein: secangkir kopi memberimu fokus tenang, atau langsung memicu jantung berdebar dan keringat dingin cemas?",
      de: "Wie reagiert dein Körper auf Kaffee: schenkt er Fokus oder löst er sofort Herzrasen und innere Unruhe aus?",
      fr: "Comment réagissez-vous à la caféine : vous apporte-t-elle de la clarté ou déclenche-t-elle palpitations et sueurs d'angoisse ?",
      es: "¿Cómo reacciona tu cuerpo al café: te aporta foco o te dispara palpitaciones y sudores fríos de ansiedad?",
    },
    options: [
      { score: 0, label: { en: "Calm, clear cognitive stamina", id: "Fokus tenang dan stamina jernih", de: "Ruhiger, klarer Fokus", fr: "Clarté et concentration sereine", es: "Foco lúcido y resistencia tranquila" } },
      { score: 1, label: { en: "Good energy, though I avoid drinking it late in the day", id: "Energi bagus, tapi saya hindari minum sore hari", de: "Gute Energie, trinke ihn aber nicht zu spät", fr: "Bonne stimulation sans excès en évitant le soir", es: "Buena energía, evitando tomarlo tarde" } },
      { score: 2, label: { en: "Jitters, stomach flutter, and heightened sensory irritability", id: "Gemetar, perut gelisah, dan mudah tersulut suara bising", de: "Zittern, Unruhe und nervöse Reizbarkeit", fr: "Tremblements, estomac noué et irritabilité sensorielle", es: "Temblores, estómago revuelto e hipersensibilidad al ruido" } },
      { score: 3, label: { en: "Full sympathetic panic; even green tea triggers heart-racing existential terror", id: "Panik simpatetik total; bahkan teh hijau pun memicu jantung berdegup kencang dan rasa ngeri", de: "Panikzustand; schon grüner Tee löst Herzrasen und Angstschübe aus", fr: "Panique sympathique; même un thé vert provoque palpitations et terreur", es: "Pánico simpático; hasta un té verde me provoca taquicardias y agobio extremo" } },
    ],
  },
  {
    id: 9,
    subscale: "neuroendocrine_overdrive",
    prompt: {
      en: "Do you startle easily—jumping visibly or feeling an acute adrenaline shock when an unexpected door knocks or a phone rings?",
      id: "Apakah kamu mudah kaget—tubuh melonjak kaget atau merasakan sengatan adrenalin saat pintu diketuk mendadak atau telepon berdering?",
      de: "Erschrickst du extrem leicht – zuckst du zusammen, wenn unerwartet das Telefon klingelt oder eine Tür zuschlägt?",
      fr: "Sursautez-vous au moindre bruit – coup de sonnette imprévu ou sonnerie de téléphone créant une décharge d'adrénaline ?",
      es: "¿Te sobresaltas con facilidad desmedida – sintiendo una sacudida de adrenalina si llaman a la puerta o suena el teléfono?",
    },
    options: [
      { score: 0, label: { en: "No; calm autonomic nervous system baseline", id: "Tidak; sistem saraf otonom saya tenang dan stabil", de: "Nein; mein Nervensystem bleibt gelassen", fr: "Non; mon système nerveux reste stable", es: "No; mi sistema nervioso basal está tranquilo" } },
      { score: 1, label: { en: "Mild blink or turn of the head", id: "Kedipan mata atau menoleh wajar", de: "Kurzes Aufblicken, schnell vergessen", fr: "Un simple clignement d'yeux passager", es: "Un leve parpadeo sin alteración interna" } },
      { score: 2, label: { en: "Intense physical flinch and a lingering spike in heart rate for 5 minutes", id: "Tubuh tersentak kencang dan detak jantung berdegup kencang selama 5 menit", de: "Starkes Zusammenzucken, Puls rast für 5 Minuten", fr: "Sursaut net et palpitations qui durent plusieurs minutes", es: "Sobresalto físico intenso con taquicardia durante varios minutos" } },
      { score: 3, label: { en: "Severe hyper-arousal shock; my nervous system feels raw and completely frayed", id: "Syok hiper-arousal parah; sarafku terasa telanjang dan terbakar habis", de: "Extremer Schockzustand; die Nerven liegen völlig blank", fr: "État d'hyper-alerte permanent; mes nerfs sont à vif et épuisés", es: "Choque de hipervigilancia extremo; mis nervios están al límite y en carne viva" } },
    ],
  },
  {
    id: 10,
    subscale: "neuroendocrine_overdrive",
    prompt: {
      en: "How would you describe your baseline internal pace: do you feel an unshakeable sense of hurry, like you are constantly running late even with nothing to do?",
      id: "Bagaimana kamu mendeskripsikan ritme internal tubuhmu: apakah ada dorongan terburu-buru yang konstan, serasa selalu terlambat padahal tidak ada hal mendesak?",
      de: "Fühlst du eine permanente innere Eile – als wärst du spät dran, selbst wenn du gar keine Termine hast?",
      fr: "Ressentez-vous une urgence intérieure constante – comme si vous étiez en retard alors que vous n'avez rien à faire ?",
      es: "¿Sientes una prisa interna incesante – como si fueras tarde a todas partes incluso cuando no tienes compromisos?",
    },
    options: [
      { score: 0, label: { en: "Peaceful and present; I move through the day at a grounded tempo", id: "Tenang dan hadir di saat ini; bergerak dengan tempo santai", de: "Gelassen und präsent; ich lebe in meinem eigenen Takt", fr: "Serein et présent; j'avance à un rythme posé", es: "Tranquilo y presente; me muevo a un compás pausado" } },
      { score: 1, label: { en: "Fast-paced during working hours, but I downshift easily", id: "Cepat saat jam kerja, tapi mudah santai setelahnya", de: "Schnell bei der Arbeit, kann aber gut bremsen", fr: "Rythme soutenu au travail mais déconnexion facile", es: "Rápido en el trabajo pero desconecto con facilidad" } },
      { score: 2, label: { en: "Chronic internal motor running; I walk, eat, and scroll at double speed", id: "Mesin dalam diri terus menyala; jalan, makan, dan main HP serba terburu-buru", de: "Innerer Motor läuft dauernd; esse, laufe und scrolle im Eiltempo", fr: "Moteur intérieur en surrégime; je marche, mange et lis à toute vitesse", es: "Motor interno acelerado; como, camino y leo con prisa constante" } },
      { score: 3, label: { en: "Severe sympathetic hijacking; stillness feels physically unbearable and dangerous to my brain", id: "Pembajakan saraf simpatetik parah; diam terasa menyiksa dan dianggap ancaman oleh otak", de: "Völlige Geiselhaft des Sympathikus; Stillstand fühlt sich unerträglich bedrohlich an", fr: "Prise d'otage sympathique totale; l'immobilité m'angoisse et me paraît dangereuse", es: "Secuestro simpático severo; la quietud me resulta físicamente insoportable" } },
    ],
  },
  {
    id: 11,
    subscale: "circadian_sleep",
    prompt: {
      en: "Do you experience stubborn water retention, puffy face/eyes in the morning, or stubborn central abdominal bloating despite eating clean?",
      id: "Apakah kamu mengalami penumpukan cairan, wajah/mata bengkak (puffy face) di pagi hari, atau perut buncit berlemak keras meski sudah menjaga makan?",
      de: "Leidest du morgens unter geschwollenem Gesicht/Augen oder hartnäckigem Bauchfett trotz gesunder Ernährung?",
      fr: "Avez-vous le visage gonflé au réveil ou des ballonnements abdominaux tenaces malgré une alimentation saine ?",
      es: "¿Tienes hinchazón facial o de párpados por la mañana o distensión abdominal persistente aun comiendo sano?",
    },
    options: [
      { score: 0, label: { en: "Never; lean and stable somatic fluid balance", id: "Tidak pernah; tubuh ramping dan kadar cairan stabil", de: "Nie; straffe und ausgeglichene Somatik", fr: "Jamais; équilibre hydrique stable et silhouette saine", es: "Nunca; equilibrio somático y retención de líquidos normal" } },
      { score: 1, label: { en: "Mild puffiness only after salty late-night dinners", id: "Bengkak sedikit hanya kalau makan malam asin", de: "Nur nach sehr salzigem spätem Essen", fr: "Léger gonflement passager après un repas très salé", es: "Leve hinchazón solo tras cenas tardías muy saladas" } },
      { score: 2, label: { en: "Noticeable morning puffiness and chronic visceral midsection inflation", id: "Wajah sembab di pagi hari dan perut bawah terasa kembung keras", de: "Deutliche Morgenschwellung und ständige Bauchspannung", fr: "Poches sous les yeux au réveil et ventre dur gonflé en permanence", es: "Hinchazón matutina notable y abdomen tenso inflamado a diario" } },
      { score: 3, label: { en: "Classic 'cortisol face' and abdominal retention; my body feels chronically inflamed and waterlogged", id: "Tanda klasik 'cortisol face' dan timbunan lemak stres; tubuh terasa meradang dan bengkak kronis", de: "Klassisches Cortisol-Gesicht; mein Körper fühlt sich chronisch entzündet an", fr: "Visage cortisol typique et rétention sévère; sensation d'inflammation permanente", es: "Cara de cortisol típica y retención severa; sensación de inflamación corporal crónica" } },
    ],
  },
  {
    id: 12,
    subscale: "muscular_somatic",
    prompt: {
      en: "How quickly does your body recover from a stressful incident (e.g. near-car accident, critical email): minutes, or does it take entire days?",
      id: "Seberapa cepat tubuhmu pulih setelah kejadian menegangkan (misal: nyaris tabrakan atau email komplain bos): beberapa menit, atau butuh berhari-hari?",
      de: "Wie schnell erholt sich dein Körper von akutem Schreck oder Stress: Minuten oder Tage?",
      fr: "À quelle vitesse votre corps récupère-t-il d'un choc émotionnel ou stressant : quelques minutes ou plusieurs jours ?",
      es: "¿Qué tan rápido se recupera tu cuerpo de un susto o un momento de estrés: minutos o días enteros?",
    },
    options: [
      { score: 0, label: { en: "Under 10 minutes; my heart rate and nerves down-regulate promptly", id: "Di bawah 10 menit; detak jantung dan saraf cepat tenang kembali", de: "Unter 10 Minuten; Puls und Nerven beruhigen sich zügig", fr: "Moins de 10 minutes; le calme physiologique revient vite", es: "Menos de 10 minutos; pulso y respiración se normalizan rápido" } },
      { score: 1, label: { en: "About an hour, but resolved by evening", id: "Sekitar satu jam, tapi sudah reda menjelang malam", de: "Etwa eine Stunde, abends ist alles gut", fr: "Environ une heure, résolu en fin de journée", es: "Aproximadamente una hora, disipado al atardecer" } },
      { score: 2, label: { en: "Entire day; body remains tense, stomach queasy, unable to unwind", id: "Seharian penuh; tubuh tetap tegang, perut tidak enak, sulit rileks", de: "Den ganzen Tag; Körper bleibt verkrampft und aufgewühlt", fr: "Toute la journée; le corps reste tendu et le ventre noué", es: "Todo el día; el cuerpo permanece agarrotado y con malestar estomacal" } },
      { score: 3, label: { en: "Days or weeks; an incident sends me into a multi-day autonomic hangover", id: "Berhari-hari; satu masalah kecil membuat sarafku drop berkepanjangan", de: "Tage oder Wochen; ein Vorfall löst tagelanges Nerven-Hangover aus", fr: "Des jours ou semaines; l'incident déclenche un épuisement autonome prolongé", es: "Días o semanas; un incidente desencadena un agotamiento prolongado" } },
    ],
  },
];

export const CORTISOL_PROFILES: Record<string, CortisolProfile> = {
  adrenal_exhaustion: {
    level: "adrenal_exhaustion",
    badge: {
      en: "STAGE 3: AUTONOMIC BURNOUT & HPA CRASH",
      id: "STADIUM 3: KELELAHAN AUTONOMIK & HPA CRASH",
      de: "STUFE 3: AUTONOMER BURNOUT & HPA-KOLLAPS",
      fr: "STADE 3 : ÉPUISEMENT AUTONOME & CRASH HPA",
      es: "FASE 3: AGOTAMIENTO AUTONÓMICO Y COLAPSO HPA",
    },
    title: {
      en: "Severe Cortisol Depletion & Systemic Exhaustion",
      id: "Krisis Penurunan Kortisol & Kelelahan Sistemik",
      de: "Schwere Cortisol-Erschöpfung & System-Burnout",
      fr: "Épuisement cortisolaire sévère & fatigue systémique",
      es: "Agotamiento severo de cortisol y fatiga sistémica",
    },
    tagline: {
      en: "Your endocrine engine has run out of reserve fuel. Pushing harder is biologically impossible.",
      id: "Mesin endokrinmu kehabisan bahan bakar cadangan. Memaksakan diri bekerja lebih keras secara biologis sudah mustahil.",
      de: "Dein endokriner Motor hat keine Reserven mehr. Weitermachen ist biologisch unmöglich.",
      fr: "Votre moteur endocrinien est à sec. Forcer davantage est biologiquement impossible.",
      es: "Tu motor endocrino ha agotado sus reservas. Seguir forzando la máquina es biológicamente imposible.",
    },
    description: {
      en: "Your screener indicates Stage 3 HPA-axis dysregulation. After months or years of running on chronic adrenaline and high cortisol, your adrenal output has flattened. You suffer from intense morning exhaustion, brain fog, auditory hypersensitivity, and frequent dizzy spells. The nervous system has entered dorsal vagal collapse to force you to rest and protect vital organs from allostatic failure.",
      id: "Hasil tesmu menunjukkan disregulasi aksis HPA Stadium 3. Setelah berbulan-bulan atau bertahun-tahun hidup dengan adrenalin dan kortisol tinggi, produksi hormon stresmu mendatar ke bawah. Kamu mengalami kelelahan pagi yang luar biasa, brain fog pekat, sensitif terhadap suara, dan sering kliyengan. Sistem sarafmu masuk ke mode dorsal vagal collapse untuk memaksamu istirahat total.",
      de: "Deine Antworten zeigen Stufe 3 einer HPA-Achsen-Störung. Nach monatelanger Überlastung ist die Cortisol-Tageskurve abgeflacht. Extreme Morgenmüdigkeit, Gehirnnebel und Schwindel sind die Folge. Dein Körper zieht die Notbremse, um lebenswichtige Organe vor Überlastung zu schützen.",
      fr: "Vos résultats traduisent une dysrégulation HPA de stade 3. Après des mois d'hyper-sollicitation, la courbe de cortisol s'est effondrée. Fatigue matinale écrasante, brouillard mental et vertiges indiquent que votre organisme impose un repos forcé.",
      es: "Tus respuestas reflejan una desregulación del eje HPA en fase 3. Tras meses de sobreesfuerzo, la curva de cortisol se ha aplanado. La fatiga matinal aplastante, la niebla mental y los mareos son el freno de emergencia de tu cuerpo.",
    },
    somaticInsight: {
      en: "In Stage 3 adrenal exhaustion, the Cortisol Awakening Response (CAR) fails to produce the morning spike needed for alertness. Cells become chronically depleted of intracellular electrolytes, resulting in low blood pressure and orthostatic dizziness.",
      id: "Pada kelelahan adrenal Stadium 3, Cortisol Awakening Response (CAR) gagal menghasilkan lonjakan pagi untuk kesiagaan. Sel kekurangan elektrolit intraseluler, memicu tekanan darah rendah dan kliyengan saat berdiri.",
      de: "Bei fortgeschrittener Erschöpfung bleibt der morgendliche Cortisol-Peak (CAR) aus. Der Blutdruck sackt ab und es kommt zu orthostatischer Benommenheit beim Aufstehen.",
      fr: "Au stade 3, le pic matinal de cortisol (CAR) fait défaut. Les cellules manquent d'électrolytes intracellulaires, provoquant hypotension et vertiges orthostatiques.",
      es: "En esta fase se pierde el pico matinal de cortisol (CAR). La merma de electrolitos celulares causa tensión baja y mareos ortostáticos al ponerse de pie.",
    },
    downRegulationProtocols: {
      en: [
        "Adrenal Salt & Electrolyte Tonic: Drink 300ml of room-temperature water with a pinch of Celtic sea salt and lemon juice first thing in the morning to support cellular hydration and adrenal blood pressure.",
        "Non-Sleep Deep Rest (NSDR): Practice 20 minutes of guided NSDR or Yoga Nidra at 2:00 PM: [Open NSDR Audio Lab](/tools/nsdr).",
        "Strict Zero-HIIT Protocol: Eliminate intense cardio, sprints, or heavy lifting for 30 days. Replace solely with slow walking in nature and somatic gentle stretching.",
      ],
      id: [
        "Tonik Garam & Elektrolit: Minum 300ml air hangat dengan sejumput garam laut murni dan perasan lemon saat bangun pagi untuk mendukung tekanan darah dan hidrasi seluler.",
        "Non-Sleep Deep Rest (NSDR): Lakukan 20 menit audio relaksasi mendalam NSDR atau Yoga Nidra jam 2 siang: [Buka NSDR Audio Lab](/tools/nsdr).",
        "Stop Olahraga Berat (Zero-HIIT): Hentikan lari cepat, kardio berat, atau angkat beban ekstrem selama 30 hari. Ganti dengan jalan santai di alam dan peregangan lembut.",
      ],
      de: [
        "Elektrolyt-Morgenwasser: Trinke morgens 300ml lauwarmes Wasser mit einer Prise Meersalz und Zitrone zur Stabilisierung des Blutdrucks.",
        "NSDR-Tiefenentspannung: 20 Minuten geführte NSDR um 14:00 Uhr zur Regeneration: [NSDR Audio Lab](/tools/nsdr).",
        "Kein HIIT-Training: Verzichte 30 Tage auf intensives Ausdauertraining; ersetze es durch Waldspaziergänge und sanftes Dehnen.",
      ],
      fr: [
        "Verre d'eau saline matinal : buvez 300ml d'eau tiède avec une pincée de sel marin et de citron pour soutenir les surrénales.",
        "Repos profond sans sommeil (NSDR) : 20 minutes de NSDR ou Yoga Nidra à 14h : [Ouvrir l'Audio Lab NSDR](/tools/nsdr).",
        "Pause des sports intenses : suspendez le HIIT et les efforts violents pendant 30 jours au profit de la marche douce en pleine nature.",
      ],
      es: [
        "Tónico matinal de agua y sal marina: bebe 300ml de agua tibia con una pizca de sal marina y limón para estabilizar la tensión arterial.",
        "Descanso profundo sin dormir (NSDR): realiza 20 minutos de NSDR o Yoga Nidra a las 14:00: [Abrir NSDR Audio Lab](/tools/nsdr).",
        "Cero entrenamientos extenuantes: sustituye el HIIT y el cardio pesado durante 30 días por caminatas tranquilas en la naturaleza.",
      ],
    },
    dailyAffirmation: {
      en: "I give my body permission to slow down. Rest is not a reward I earn; it is the vital ground of my healing.",
      id: "Aku memberi izin pada tubuhku untuk melambat. Istirahat bukanlah hadiah yang harus ditukar keringat; ini adalah fondasi kesembuhanku.",
      de: "Ich erlaube meinem Körper, langsamer zu werden. Ruhe ist keine Belohnung, sondern die Wurzel meiner Genesung.",
      fr: "J'accorde à mon corps la permission de ralentir. Le repos n'est pas un luxe, c'est le socle de ma guérison.",
      es: "Doy permiso a mi cuerpo para desacelerar. El descanso no es un premio que deba ganar, sino el cimiento de mi sanación.",
    },
  },

  wired_and_tired: {
    level: "wired_and_tired",
    badge: {
      en: "STAGE 2: HYPER-CORTISOLEMIC (WIRED & TIRED)",
      id: "STADIUM 2: HIPER-KORTISOL (WIRED & TIRED)",
      de: "STUFE 2: HYPER-CORTISOLÄMIE (WIRED & TIRED)",
      fr: "STADE 2 : HYPER-CORTISOLE (SURVOLTÉ & ÉPUISÉ)",
      es: "FASE 2: HIPERCORTISOLEMIA (ACELERADO Y AGOTADO)",
    },
    title: {
      en: "The 'Wired but Tired' Cortisol Inversion",
      id: "Sindrom 'Wired but Tired' & Inversi Kortisol",
      de: "Das 'Wired but Tired'-Syndrom",
      fr: "Le syndrome 'Survolté mais Épuisé'",
      es: "El síndrome 'Acelerado pero Agotado'",
    },
    tagline: {
      en: "Exhausted all day, but when your head hits the pillow at night, your nervous system lights up like a pinball machine.",
      id: "Lemas seharian, tetapi saat kepala menyentuh bantal di malam hari, sistem sarafmu menyala seperti disengat listrik.",
      de: "Tagsüber ausgelaugt, doch nachts im Bett schießt das Nervensystem wie ein Flipperautomat hoch.",
      fr: "Épuisé toute la journée, mais dès que votre tête touche l'oreiller, vos nerfs s'allument à plein régime.",
      es: "Agotado durante el día, pero al acostarte por la noche tu sistema nervioso se dispara en alerta roja.",
    },
    description: {
      en: "You are experiencing classic Stage 2 HPA-axis inversion. Cortisol—which is supposed to be high in the morning and near-zero at bedtime—has inverted. It is sluggish when you wake up, and surges at 10:00 PM, triggering late-night rumination, jaw clenching, and 3 AM awakenings. You are relying on caffeine to power through the afternoon slump, which feeds the nocturnal cortisol surge.",
      id: "Kamu mengalami pembalikan kurva kortisol Stadium 2. Kortisol—yang seharusnya tinggi di pagi hari dan mendekati nol saat jam tidur—justru terbalik. Hormon ini loyo saat kamu bangun, lalu meledak tinggi jam 10 malam, memicu overthinking, rahang mengatup kaku, dan terbangun jam 3 pagi. Ketergantungan kafein di sore hari memperburuk siklus ini.",
      de: "Deine Cortisolkurve steht auf dem Kopf. Morgens fehlt der Antrieb, spätabends schießt Cortisol hoch und raubt dir den Schlaf. Das nächtliche Erwachen um 3 Uhr morgens und Muskelanspannungen sind typische Symptome der hormonellen Dysbalance.",
      fr: "Votre courbe de cortisol est inversée : trop basse au réveil, elle flambe vers 22h, provoquant insomnies, serrement de dents et réveil anxieux à 3h du matin. La caféine de l'après-midi entretient ce cercle vicieux.",
      es: "Tu ritmo de cortisol está invertido: bajo por la mañana y disparado a las 22:00, impidiendo conciliar el sueño y provocando bruxismo y desvelos a las 3:00 am. El café vespertino alimenta esta alteración.",
    },
    somaticInsight: {
      en: "Nighttime cortisol surges suppress pineal melatonin secretion and cause sympathetic alpha-wave intrusion into deep delta slow-wave sleep, depriving tissues of restorative growth hormone.",
      id: "Lonjakan kortisol malam hari menekan hormon melatonin dan menyusupkan gelombang otak alpha ke dalam tidur lelap delta, membuat tubuh gagal memproduksi hormon perbaikan sel.",
      de: "Nächtliches Cortisol blockiert Melatonin und stört den regenerativen Tiefschlaf, was Zellreparatur und Immunsystem schwächt.",
      fr: "Le cortisol nocturne bloque la mélatonine et fragmente le sommeil profond, privant les tissus de régénération cellulaire.",
      es: "El cortisol nocturno frena la melatonina y altera las fases de sueño profundo delta, impidiendo la reparación tisular.",
    },
    downRegulationProtocols: {
      en: [
        "12:00 PM Caffeine Cutoff: Forbid all coffee, energy drinks, and black tea after midday to give your adenosine receptors time to accumulate clean sleep pressure.",
        "Stanford Physiological Sigh at Bedtime: Practice 5 minutes of cyclic sighing in dim light before sleep: [Physiological Sigh Pacer](/tools/physiological-sigh).",
        "Magnesium & Dim Light Sanctuary: Dim all household lights by 8:30 PM, switch screens to warm night-shift, and consume 300mg of elemental Magnesium Glycinate.",
      ],
      id: [
        "Batas Akhir Kafein Jam 12 Siang: Larang semua kopi, boba, atau teh hitam setelah jam 12 siang agar adenosin alami bisa menumpuk untuk tidur malam.",
        "Stanford Physiological Sigh Sebelum Tidur: Lakukan 5 menit latihan pernapasan hembusan panjang di ruangan redup: [Buka Sigh Pacer](/tools/physiological-sigh).",
        "Redupkan Lampu & Magnesium: Turunkan intensitas lampu rumah mulai jam 8.30 malam, pasang filter kuning di layar HP, dan konsumsi Magnesium Glycinate.",
      ],
      de: [
        "Koffein-Stopp ab 12:00 Uhr: Keinen Kaffee oder Energy-Drinks mehr nach dem Mittagessen, um die natürliche Müdigkeit nicht zu sabotieren.",
        "Physiologischer Seufzer vor dem Schlafen: 5 Minuten zyklisches Seufzen im abgedunkelten Schlafzimmer: [Sigh Pacer](/tools/physiological-sigh).",
        "Licht dimmen & Magnesium: Ab 20:30 Uhr Deckenlampen aus, warme Lichtquellen nutzen und Magnesiumglycinat einnehmen.",
      ],
      fr: [
        "Arrêt du café à midi pile : aucun excitant après 12h pour permettre à l'adénosine de s'accumuler naturellement.",
        "Soupir physiologique au coucher : 5 minutes de respiration apaisante dans la pénombre : [Sigh Pacer](/tools/physiological-sigh).",
        "Pénombre dès 20h30 : tamisez les lumières, activez les filtres anti-lumière bleue et prenez du bisglycinate de magnésium.",
      ],
      es: [
        "Toque de queda del café a las 12:00: suprime cualquier cafeína después del mediodía para permitir la acumulación de adenosina.",
        "Suspiro fisiológico antes de acostarse: 5 minutos de respiración relajante a oscuras: [Sigh Pacer](/tools/physiological-sigh).",
        "Luz cálida y magnesio: atenúa luces desde las 20:30, activa el modo noche en pantallas y toma glicinato de magnesio.",
      ],
    },
    dailyAffirmation: {
      en: "I release the false urgency of the day. The night is a quiet sanctuary for restoration.",
      id: "Aku melepaskan rasa terburu-buru yang palsu. Malam adalah ruang suci yang damai untuk memulihkan diriku.",
      de: "Ich lasse die falsche Hektik des Tages los. Die Nacht gehört der heilsamen Stille.",
      fr: "Je dépose les fausses urgences du quotidien. La nuit est mon sanctuaire de régénération.",
      es: "Suelto las falsas urgencias del día. La noche es un refugio sereno para mi restauración.",
    },
  },

  episodic_strain: {
    level: "episodic_strain",
    badge: {
      en: "STAGE 1: ACUTE EPISODIC TENSION",
      id: "STADIUM 1: KETEGANGAN EPISODIK AKUT",
      de: "STUFE 1: AKUTE EPISODISCHE ANSPANNUNG",
      fr: "STADE 1 : TENSION ÉPISODIQUE AIGUË",
      es: "FASE 1: TENSIÓN EPISÓDICA AGUDA",
    },
    title: {
      en: "Episodic Stress & Elevated Sympathetic Tone",
      id: "Stres Episodik & Tonus Simpatetik Meningkat",
      de: "Episodischer Stress & erhöhte Anspannung",
      fr: "Stress passager & hypertonie sympathique",
      es: "Estrés episódico y tono simpático elevado",
    },
    tagline: {
      en: "Your system handles stress well, but recent deadlines and demands have left physical tension in your shoulders and jaw.",
      id: "Tubuhmu merespons stres dengan baik, namun kesibukan akhir-akhir ini meninggalkan beban kaku di bahu dan rahang.",
      de: "Dein Körper kompensiert gut, doch die jüngste Belastung hinterlässt spürbare Verspannungen.",
      fr: "Votre organisme résiste bien, mais la charge récente a noué vos trapèzes et votre mâchoire.",
      es: "Tu cuerpo responde bien, pero las demandas recientes han acumulado tensión en hombros y mandíbula.",
    },
    description: {
      en: "Your endocrine system remains resilient, but you are experiencing episodic allostatic strain. You occasionally clench your teeth, notice shallow breathing under deadline crunches, and feel neck stiffness. Implementing brief micro-resets throughout the workday will easily prevent this from progressing into chronic Stage 2 hormonal inversion.",
      id: "Sistem endokrinmu masih cukup tangguh, namun kamu mengalami ketegangan episodik. Kamu kadang mengatupkan gigi, napas terasa dangkal saat dikejar waktu, dan leher kaku. Menerapkan jeda mikro di jam kerja akan mencegah kondisi ini memburuk jadi disregulasi hormon kronis.",
      de: "Deine Hormonachse ist intakt, zeigt aber temporäre Belastungsspitzen. Zähnebeißen und flache Atmung bei Deadlines signalisieren, dass kurze Mikro-Pausen im Arbeitsalltag jetzt wichtig sind.",
      fr: "Votre système endocrinien est solide mais montre des pics de tension passagers. Quelques micro-pauses suffiront à dissiper la raideur musculaire avant qu'elle ne devienne chronique.",
      es: "Tu eje hormonal conserva buena salud, pero acusa picos de sobrecarga. Introducir microdescansos somáticos durante el día bastará para liberar las contracturas.",
    },
    somaticInsight: {
      en: "Episodic stress is the ideal window for neuroplastic intervention. Intermittent acute cortisol spikes are harmless if followed by parasympathetic down-regulation within 90 minutes.",
      id: "Stres episodik adalah waktu emas untuk intervensi neuroplastisitas. Lonjakan kortisol jangka pendek sama sekali tidak berbahaya jika segera ditenangkan dalam 90 menit.",
      de: "Akuter Stress ist unbedenklich, solange der Parasympathikus innerhalb von 90 Minuten die Gegenregulation übernimmt.",
      fr: "Le stress aigu est inoffensif tant que le système parasympathique rétablit le calme dans les 90 minutes suivantes.",
      es: "El estrés puntual es natural siempre que el parasimpático restablezca el equilibrio en los siguientes 90 minutos.",
    },
    downRegulationProtocols: {
      en: [
        "The 90-Minute Somatic Shakeout: Every 90 minutes of desk work, stand up, drop your shoulders, and shake your hands and arms vigorously for 45 seconds to release motor tension.",
        "Box Breathing Pacer: Use 4-4-4-4 box breathing before stressful meetings: [Box Breathing Lab](/tools/box-breathing).",
        "Nature Walk Decompression: Take a 15-minute tech-free outdoor walk gazing at the horizon (panoramic vision) to drop sympathetic focus.",
      ],
      id: [
        "Goyangkan Tubuh Tiap 90 Menit: Berdirilah setiap 90 menit kerja, jatuhkan bahu, dan kibas-kibaskan tangan selama 45 detik untuk melepas ketegangan otot.",
        "Box Breathing Lab: Latih pernapasan kotak 4-4-4-4 sebelum rapat penting: [Buka Box Breathing Lab](/tools/box-breathing).",
        "Jalan Santai Pandangan Luas: Berjalanlah 15 menit di luar tanpa ponsel, memandang kejauhan (panoramic vision) untuk meredakan fokus tegang.",
      ],
      de: [
        "90-Minuten-Körperpause: Alle 90 Minuten kurz aufstehen und Arme und Beine 45 Sekunden kräftig ausschütteln.",
        "Box-Breathing: 4-4-4-4 Atmung vor anstrengenden Meetings nutzen: [Box Breathing Lab](/tools/box-breathing).",
        "Panoramablick im Grünen: 15 Minuten Spaziergang mit Weitblick in die Ferne, um den Blick zu entspannen.",
      ],
      fr: [
        "Dégourdissement des 90 minutes : levez-vous et secouez bras et mains pendant 45 secondes pour chasser les tensions motrices.",
        "Respiration carrée : pratiquez le 4-4-4-4 avant une réunion prenante : [Box Breathing Lab](/tools/box-breathing).",
        "Vision panoramique : marchez 15 minutes sans écran en portant votre regard au loin vers l'horizon.",
      ],
      es: [
        "Sacudida corporal cada 90 minutos: levántate y sacude brazos y hombros durante 45 segundos para drenar la tensión acumulada.",
        "Respiración en caja: realiza 4-4-4-4 antes de reuniones intensas: [Box Breathing Lab](/tools/box-breathing).",
        "Paseo con visión panorámica: camina 15 minutos mirando al horizonte sin pantallas para relajar el foco visual.",
      ],
    },
    dailyAffirmation: {
      en: "I flow through challenge with physical grace. Tension enters, and with every exhale, tension leaves.",
      id: "Aku melewati tantangan dengan kelenturan fisik. Ketegangan datang, dan bersama setiap hembusan napas, ketegangan itu sirna.",
      de: "Ich begegne Herausforderungen mit Leichtigkeit. Anspannung kommt, und mit jedem Ausatmen geht sie wieder.",
      fr: "Je traverse les défis avec souplesse. La tension arrive, et s'évanouit à chaque expiration.",
      es: "Atravieso los retos con soltura. La tensión llega y se disipa con cada exhalación.",
    },
  },

  balanced_vitality: {
    level: "balanced_vitality",
    badge: {
      en: "OPTIMAL ALLOSTATIC HOMEOSTASIS",
      id: "HOMEOSTASIS KORTISOL OPTIMAL",
      de: "OPTIMALE ALLOSTATISCHE BALANCE",
      fr: "HOMÉOSTASIE ALLOSTATIQUE OPTIMALE",
      es: "HOMEOSTASIS ÓPTIMA DEL CORTISOL",
    },
    title: {
      en: "Resilient Endocrine Balance & Somatic Calm",
      id: "Keseimbangan Hormon Tangguh & Ketenangan Somatis",
      de: "Hormonelle Balance & somatische Gelassenheit",
      fr: "Équilibre endocrinien résilient & calme somatique",
      es: "Equilibrio endocrino y serenidad somática",
    },
    tagline: {
      en: "Your nervous system glides smoothly between daytime vigor and nocturnal regenerative sleep.",
      id: "Sistem sarafmu meluncur mulus antara semangat kerja di siang hari dan tidur lelap yang menyembuhkan di malam hari.",
      de: "Dein Nervensystem wechselt mühelos zwischen Tagesschwung und heilsamem Nachtschlaf.",
      fr: "Votre système nerveux navigue avec fluidité entre dynamisme diurne et sommeil réparateur nocturne.",
      es: "Tu sistema nervioso transita con soltura entre la energía diurna y el descanso nocturno reparador.",
    },
    description: {
      en: "Outstanding. You possess healthy allostatic homeostasis. Your morning cortisol awakening response fires on cue, providing clean energy without panic. Your nervous system downsizes gracefully at dusk, your muscular armor is relaxed, and your sleep architecture is deep and restorative. You have mastered sustainable somatic pacing.",
      id: "Luar biasa. Keseimbangan homeostasis tubuhmu sangat sehat. Lonjakan kortisol pagi harimu bekerja tepat waktu memberi energi segar tanpa panik. Sarafmu melambat tenang saat senja, otot-ototmu lentur, dan tidur malammu lelap menyegarkan. Kamu telah menguasai ritme somatis yang berkelanjutan.",
      de: "Hervorragend. Deine hormonelle Tageskurve verläuft bilderbuchmäßig. Wachheit am Morgen ohne Herzrasen, entspannte Muskeln und erholsamer Tiefschlaf zeichnen deinen Alltag aus.",
      fr: "Remarquable. Votre courbe circadienne est idéale : énergie limpide le matin, muscles détendus dans la journée et sommeil profond la nuit. Vous maîtrisez un rythme somatique d'une belle longévité.",
      es: "Excelente. Tu curva circadiana es óptima: vitalidad limpia al despertar, musculatura relajada y sueño profundo y continuo. Dominas una gestión somática impecable.",
    },
    somaticInsight: {
      en: "High heart rate variability (HRV) and optimal vagal brake function protect your vascular endothelial lining from chronic oxidative cortisol damage.",
      id: "Variabilitas detak jantung (HRV) yang tinggi dan fungsi rem vagal yang prima melindungi pembuluh darahmu dari kerusakan oksidatif kortisol.",
      de: "Hohe Herzfrequenzvariabilität (HRV) und starker Vagustonus schützen Gefäße und Zellen vor oxidativem Stress.",
      fr: "Une excellente variabilité cardiaque (VRC) protège vos vaisseaux et votre métabolisme de tout stress oxydatif.",
      es: "Una alta variabilidad de la frecuencia cardíaca (VFC) resguarda tu sistema vascular del desgaste oxidativo.",
    },
    downRegulationProtocols: {
      en: [
        "Sustain Morning Sunlight Exposure: View natural morning sunlight for 10 minutes within an hour of waking to anchor your circadian master clock.",
        "Consistent Sleep Timing: Maintain consistent bed and wake times (+/- 30 mins) even on weekends.",
        "Reflective Voice Journaling: Keep capturing your thoughts in Nuju to preserve your grounded perspective.",
      ],
      id: [
        "Pertahankan Sinar Matahari Pagi: Pandang cahaya matahari alami selama 10 menit di pagi hari untuk mengunci jam biologis tubuh.",
        "Jadwal Tidur Konsisten: Pertahankan jam tidur dan bangun yang konsisten (toleransi 30 menit) bahkan di akhir pekan.",
        "Jurnal Suara Nuju: Terus catat pikiran dan rasa syukurmu di Nuju untuk merawat kedamaian batin.",
      ],
      de: [
        "Morgensonne tanken: 10 Minuten natürliches Tageslicht nach dem Aufstehen fixieren die innere Uhr.",
        "Gleichmäßige Schlafzeiten: Behalte deine Rhythmen auch am Wochenende bei.",
        "Journaling fortführen: Nutze Nuju, um deine Ausgeglichenheit zu pflegen.",
      ],
      fr: [
        "Bain de lumière matinal : 10 minutes de lumière naturelle au lever pour caler votre horloge biologique.",
        "Régularité des cycles : gardez des heures de coucher et de lever stables, même le week-end.",
        "Journal vocal Nuju : poursuivez vos enregistrements pour nourrir cette belle clarté.",
      ],
      es: [
        "Luz solar matinal: 10 minutos de luz natural al despertar para sincronizar tu reloj circadiano.",
        "Horarios regulares de sueño: conserva los mismos horarios de acostarte y levantarte, incluso en fines de semana.",
        "Journaling en Nuju: registra tus reflexiones para cuidar tu serenidad vital.",
      ],
    },
    dailyAffirmation: {
      en: "My body is a temple of balance. I trust my natural rhythms and live with grounded energy.",
      id: "Tubuhku adalah mahakarya keseimbangan. Aku percaya pada ritme alamiku dan hidup dengan ketenangan yang berenergi.",
      de: "Mein Körper ruht in vollkommener Harmonie. Ich vertraue meinen natürlichen Rhythmen.",
      fr: "Mon corps est un sanctuaire d'équilibre. J'honore mes rythmes et vis dans une énergie sereine.",
      es: "Mi cuerpo es un remanso de equilibrio. Confío en mis ritmos biológicos y vivo con vitalidad serena.",
    },
  },
};

export function calculateCortisolScore(answers: Record<number, number>): CortisolScoreResult {
  let totalScore = 0;
  let circadianScore = 0;
  let circadianMax = 0;
  let muscularScore = 0;
  let muscularMax = 0;
  let overdriveScore = 0;
  let overdriveMax = 0;

  CORTISOL_QUESTIONS.forEach((q) => {
    const score = answers[q.id] ?? 0;
    totalScore += score;

    if (q.subscale === "circadian_sleep") {
      circadianScore += score;
      circadianMax += 3;
    } else if (q.subscale === "muscular_somatic") {
      muscularScore += score;
      muscularMax += 3;
    } else if (q.subscale === "neuroendocrine_overdrive") {
      overdriveScore += score;
      overdriveMax += 3;
    }
  });

  const maxScore = CORTISOL_QUESTIONS.length * 3; // 36
  const percentage = Math.round((totalScore / maxScore) * 100);

  const circadianPct = circadianMax > 0 ? Math.round((circadianScore / circadianMax) * 100) : 0;
  const muscularPct = muscularMax > 0 ? Math.round((muscularScore / muscularMax) * 100) : 0;
  const overdrivePct = overdriveMax > 0 ? Math.round((overdriveScore / overdriveMax) * 100) : 0;

  let level: "adrenal_exhaustion" | "wired_and_tired" | "episodic_strain" | "balanced_vitality";

  if (totalScore <= 8 && percentage <= 22) {
    level = "balanced_vitality";
  } else if (totalScore <= 16) {
    level = "episodic_strain";
  } else if (totalScore >= 26 || (circadianPct >= 75 && overdrivePct >= 70)) {
    level = "adrenal_exhaustion";
  } else {
    level = "wired_and_tired";
  }

  return {
    totalScore,
    maxScore,
    percentage,
    level,
    profile: CORTISOL_PROFILES[level],
    subscales: {
      circadian_sleep: { score: circadianScore, max: circadianMax, percentage: circadianPct },
      muscular_somatic: { score: muscularScore, max: muscularMax, percentage: muscularPct },
      neuroendocrine_overdrive: { score: overdriveScore, max: overdriveMax, percentage: overdrivePct },
    },
  };
}
