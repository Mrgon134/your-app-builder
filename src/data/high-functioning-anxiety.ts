export type HfaLang = "en" | "id" | "de" | "fr" | "es";
export type HfaDimension = "internal_turmoil" | "hyper_performance" | "composure_mask";
export type HfaLevel = "exhausted_mask" | "hyper_achiever" | "fidgeting_sentinel" | "regulated_flow";

export interface HfaQuestion {
  id: number;
  text: Record<HfaLang, string>;
  dimension: HfaDimension;
}

export interface HfaProfile {
  level: HfaLevel;
  badge: Record<HfaLang, string>;
  title: Record<HfaLang, string>;
  tagline: Record<HfaLang, string>;
  description: Record<HfaLang, string>;
  demaskingDrills: Record<HfaLang, string[]>;
  color: string;
}

export const HFA_QUESTIONS: HfaQuestion[] = [
  // --- INTERNAL TURMOIL (The Hidden Biological Alarm) ---
  {
    id: 1,
    dimension: "internal_turmoil",
    text: {
      en: "Beneath my calm exterior, my mind is constantly running disaster scenarios and worst-case plans.",
      id: "Di balik ekspresi tenang saya, pikiran saya terus-menerus memutar skenario bencana dan rencana darurat terburuk.",
      de: "Unter meiner ruhigen Fassade spielt mein Kopf ununterbrochen Worst-Case-Szenarien und Katastrophenpläne durch.",
      fr: "Sous mon calme apparent, mon esprit anticipe sans cesse des scénarios catastrophes et des plans de secours.",
      es: "Bajo mi aparente calma exterior, mi mente repasa continuamente escenarios de crisis y planes de emergencia.",
    },
  },
  {
    id: 2,
    dimension: "internal_turmoil",
    text: {
      en: "I wake up with a tight chest, churning stomach, or sudden jolt of cortisol before the day even begins.",
      id: "Saya kerap bangun pagi dengan dada sesak, perut tegang/mual, atau sentakan cemas sebelum hari dimulai.",
      de: "Ich wache mit Engegefühl in der Brust, Magenkrämpfen oder einem Cortisol-Schock auf, bevor der Tag überhaupt beginnt.",
      fr: "Je me réveille avec une oppression thoracique, la boule au ventre ou un pic d'angoisse avant même d'entamer la journée.",
      es: "Me despierto con opresión en el pecho, nudo en el estómago o una descarga de ansiedad antes de empezar el día.",
    },
  },
  {
    id: 3,
    dimension: "internal_turmoil",
    text: {
      en: "I find it nearly impossible to truly relax; even during vacations, I feel guilty or agitated when idle.",
      id: "Saya merasa hampir mustahil untuk benar-benar rileks; bahkan saat libur, saya merasa bersalah atau gelisah saat diam.",
      de: "Es fällt mir fast unmöglich, wirklich abzuschalten; selbst im Urlaub plagt mich bei Nichtstun nervöse Unruhe.",
      fr: "Il m'est presque impossible de me détendre réellement ; même en vacances, l'inactivité m'angoisse et me fait culpabiliser.",
      es: "Me resulta casi imposible relajarme de verdad; incluso de vacaciones, la inactividad me genera culpa o inquietud.",
    },
  },
  {
    id: 4,
    dimension: "internal_turmoil",
    text: {
      en: "I obsessively replay conversations in my head, analyzing whether I sounded foolish, awkward, or rude.",
      id: "Saya memutar ulang percakapan berjam-jam kemudian, cemas memikirkan apakah ucapan saya terdengar bodoh atau canggung.",
      de: "Ich analysiere geführte Gespräche stundenlang nach, aus Angst, mich ungeschickt oder dumm ausgedrückt zu haben.",
      fr: "Je repasse mes conversations en boucle pendant des heures, terrifié d'avoir paru ridicule ou maladroit.",
      es: "Repaso mis conversaciones mentalmente durante horas, temiendo haber parecido torpe o impertinente.",
    },
  },

  // --- HYPER PERFORMANCE (The Over-Functioning Shield) ---
  {
    id: 5,
    dimension: "hyper_performance",
    text: {
      en: "I over-prepare, arrive excessively early, or double-check tasks repeatedly to prevent any possibility of failure.",
      id: "Saya bersiap berlebihan, datang jauh lebih awal, atau memeriksa ulang pekerjaan berkali-kali demi mencegah kesalahan.",
      de: "Ich betreibe exzessive Vorbereitung, bin überpünktlich und kontrolliere Aufgaben mehrfach aus Angst vor Fehlern.",
      fr: "Je sur-prépare tout, arrive très en avance et vérifie tout dix fois pour écarter le moindre risque d'erreur.",
      es: "Me preparo en exceso, llego exageradamente temprano y reviso todo mil veces para no tolerar ningún fallo.",
    },
  },
  {
    id: 6,
    dimension: "hyper_performance",
    text: {
      en: "I cannot say 'no' to requests because the guilt of disappointing anyone feels unbearable.",
      id: "Saya sangat sulit berkata 'tidak' pada permintaan orang lain karena rasa bersalah mengecewakan terasa menyiksa.",
      de: "Ich kann kaum 'Nein' sagen, weil das Schuldgefühl, jemanden zu enttäuschen, unerträglich brennt.",
      fr: "Je suis incapable de dire non car la peur de décevoir autrui m'est émotionnellement insupportable.",
      es: "Me cuesta horrores decir 'no' porque la culpa de defraudar a alguien me resulta insostenible.",
    },
  },
  {
    id: 7,
    dimension: "hyper_performance",
    text: {
      en: "My high achievements and productivity are primarily driven by fear of inadequacy rather than joyful ambition.",
      id: "Prestasi dan produktivitas tinggi saya didorong oleh ketakutan merasa tidak kompeten, bukan oleh kegembiraan.",
      de: "Meine Spitzenleistungen entspringen primär der Angst vor Unzulänglichkeit und nicht freudiger Motivation.",
      fr: "Mes réussites et ma productivité sont alimentées par la hantise de l'incompétence plutôt que par l'épanouissement.",
      es: "Mis logros y alta productividad se alimentan del pánico a no ser suficiente, no del entusiasmo genuino.",
    },
  },
  {
    id: 8,
    dimension: "hyper_performance",
    text: {
      en: "I feel an overwhelming need to be the designated 'fixer' who handles everyone else's problems and chaos.",
      id: "Saya merasa wajib menjadi sosok penyelesai masalah yang membereskan kekacauan semua orang di sekitar saya.",
      de: "Ich verspüre den Zwang, stets der Retter zu sein, der die Probleme aller anderen löst.",
      fr: "Je me sens obligé d'être le pilier providentiel qui prend en charge et répare le chaos de chacun.",
      es: "Siento la compulsión de ser el protector infalible que resuelve los problemas y el desorden de los demás.",
    },
  },

  // --- COMPOSURE MASK (The Flawless Exterior) ---
  {
    id: 9,
    dimension: "composure_mask",
    text: {
      en: "People frequently describe me as 'so calm, organized, and having it all together', which feels like an impostor disguise.",
      id: "Orang sering menganggap saya 'sangat tenang, terorganisir, dan sempurna', padahal itu terasa seperti topeng tipuan.",
      de: "Andere halten mich für 'extrem souverän und gelassen', was sich für mich wie eine lügenhafte Tarnung anfühlt.",
      fr: "On me qualifie souvent de personne 'calme, solide et organisée', ce qui me donne l'impression d'usurper un rôle.",
      es: "La gente suele verme 'súper tranquilo y con todo bajo control', lo que por dentro vivo como un engaño total.",
    },
  },
  {
    id: 10,
    dimension: "composure_mask",
    text: {
      en: "I avoid asking for help even when drowning in workload because admitting struggle feels like humiliating weakness.",
      id: "Saya enggan meminta tolong meski nyaris tenggelam oleh beban kerja karena tampak lemah terasa memalukan.",
      de: "Ich bitte selbst bei drohender Überlastung nicht um Hilfe, weil Schwäche für mich beschämend ist.",
      fr: "Je refuse de demander de l'aide même débordé car montrer ma vulnérabilité me semble humiliant.",
      es: "Evito pedir ayuda aun cuando estoy al límite porque admitir que no puedo me parece una debilidad humillante.",
    },
  },
  {
    id: 11,
    dimension: "composure_mask",
    text: {
      en: "I suppress my somatic symptoms (jaw clenching, headaches, nausea, tremors) with coffee or sheer willpower.",
      id: "Saya menutupi gejala fisik cemas (rahang terkatup, sakit kepala, gemetar, mual) dengan kopi atau memaksakan diri.",
      de: "Ich überspiele körperliche Stresssymptome (Zähneknirschen, Migräne, Zittern) mit Koffein und eiserner Willenskraft.",
      fr: "Je masque mes symptômes somatiques (mâchoires serrées, migraines, nausées) à coups de caféine et de volonté brute.",
      es: "Camuflo mis señales físicas de estrés (mandíbula apretada, jaquecas, náuseas) con café y pura fuerza de voluntad.",
    },
  },
  {
    id: 12,
    dimension: "composure_mask",
    text: {
      en: "I worry that if I drop my vigilance or let my guard down for even one day, my entire life will fall apart.",
      id: "Saya cemas jika saya lengah atau menurunkan kewaspadaan satu hari saja, seluruh hidup saya akan runtuh berantakan.",
      de: "Ich fürchte, dass mein gesamtes Leben in sich zusammenbricht, wenn ich auch nur für einen Tag die Wachsamkeit senke.",
      fr: "J'ai l'angoisse intime que tout mon équilibre s'effondre si je baisse ma garde ne serait-ce qu'une seule journée.",
      es: "Temo que si bajo la guardia o me permito descansar un solo día, toda mi vida se desmoronará sin remedio.",
    },
  },
];

export const HFA_OPTIONS = [
  {
    value: 0,
    label: {
      en: "Never / Rarely",
      id: "Tidak Pernah / Jarang",
      de: "Nie / Selten",
      fr: "Jamais / Rarement",
      es: "Nunca / Rara vez",
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
      en: "Often",
      id: "Sering",
      de: "Oft",
      fr: "Souvent",
      es: "A menudo",
    },
  },
  {
    value: 3,
    label: {
      en: "Almost Constantly",
      id: "Hampir Terus-menerus",
      de: "Fast ständig",
      fr: "Quasiment tout le temps",
      es: "Casi constantemente",
    },
  },
];

export const HFA_PROFILES: Record<HfaLevel, HfaProfile> = {
  exhausted_mask: {
    level: "exhausted_mask",
    badge: {
      en: "Critical High-Functioning Anxiety / Pre-Collapse",
      id: "High-Functioning Anxiety Berat / Nyaris Kolaps",
      de: "Kritische Hochfunktionale Angst / Vor dem Zusammenbruch",
      fr: "Anxiété de Haute Performance Sévère / Risque d'Épuisement",
      es: "Ansiedad de Alto Rendimiento Crítica / Límite de Colapso",
    },
    title: {
      en: "The Fragile Fortress",
      id: "Benteng di Ujung Tanduk",
      de: "Die bröckelnde Festung",
      fr: "La Forteresse Ébréchée",
      es: "La Fortaleza Exhausta",
    },
    tagline: {
      en: "Flawless external accolades masking dangerously depleted adrenal and nervous systems.",
      id: "Prestasi luar yang memukau menutupi sistem saraf dan hormon yang berada di ambang kehancuran biologis.",
      de: "Glänzende Außenwirkung überdeckt ein völlig erschöpftes Nerven- und Hormonsystem.",
      fr: "Une réussite apparente irréprochable dissimulant un système nerveux au bord de la rupture.",
      es: "Éxitos exteriores brillantes que camuflan un sistema nervioso al borde del agotamiento biológico.",
    },
    description: {
      en: "You are operating at maximum nervous system friction. To the outside world, you appear ultra-competent, ambitious, and utterly reliable. Inside, your amygdala is sounding alarms 24/7. You use perfectionism and hyper-performance as armor to outrun existential terror. Without intentional nervous system de-escalation, this path leads directly to severe clinical burnout.",
      id: "Sistem saraf Anda bekerja dengan gesekan maksimal. Bagi dunia luar, Anda adalah sosok teladan, kompeten, dan selalu bisa diandalkan. Namun di dalam batin, sirine bahaya berbunyi tanpa henti. Anda menjadikan perfeksionisme dan kerja tanpa henti sebagai perisai dari ketakutan. Jika tidak segera dipulihkan, Anda berisiko tinggi mengalami burnout parah.",
      de: "Sie laufen mit maximaler Reibung. Nach außen wirken Sie tatkräftig und unerschütterlich, doch innerlich herrscht pausenloser Alarmzustand. Ihr Perfektionismus ist ein Schutzschild gegen Panik. Ohne gezielte Entlastung droht ein schwerer neurobiologischer Burnout.",
      fr: "Votre système nerveux tourne à plein régime dans une friction constante. Vous renvoyez l'image du succès absolu, mais votre alarme intérieure ne s'éteint jamais. Le perfectionnisme est votre armure. Sans désamorçage urgent, l'effondrement par épuisement est inévitable.",
      es: "Operas al límite de tu capacidad biológica. Para los demás eres un modelo de eficacia, pero por dentro tu alarma interna suena sin tregua. Usas el hiperrendimiento como blindaje ante el miedo. Sin una pausa reguladora consciente, te diriges a un agotamiento severo.",
    },
    demaskingDrills: {
      en: [
        "Physiological Sigh: Double inhale through the nose (one deep, one sharp top-up), followed by a slow unforced exhale through the mouth. Repeat 5 cycles to abruptly lower autonomic arousal.",
        "The 'Good Enough' Exposure: Intentionally submit an email or non-critical task at 85% perfection without proofreading three times. Notice that the world does not end.",
        "Radical Delegation: Say: 'I am currently at capacity and cannot take ownership of this without dropping higher priorities.'",
      ],
      id: [
        "Napas Desah Fisiologis: Tarik napas dua kali berturut-turut lewat hidung (satu dalam, satu sentakan kecil), lalu hembuskan panjang lewat mulut. Ulangi 5 kali untuk menurunkan hormon stres seketika.",
        "Latihan 'Cukup Baik' (85%): Kirim satu email atau tugas non-kritis dengan standar 85% tanpa memeriksa ulang berulang kali. Sadari bahwa dunia tetap berputar aman.",
        "Batas Kapasitas Tegas: Katakan: 'Kapasitas saya saat ini sedang penuh, saya tidak bisa mengambil tugas ini tanpa mengorbankan prioritas utama.'",
      ],
      de: [
        "Physiologischer Seufzer: Zweimal kurz hintereinander durch die Nase tief einatmen, lang und gelöst durch den Mund ausatmen (5 Wiederholungen zur Vagus-Aktivierung).",
        "85%-Mutprobe: Versenden Sie eine Routine-Aufgabe bewusst 'gut genug', statt sie fünfmal nachzukontrollieren.",
        "Kapazitätsgrenze setzen: 'Mein Arbeitskontingent ist derzeit voll ausgeschöpft; ich kann dies nicht zusätzlich übernehmen.'",
      ],
      fr: [
        "Soupir Physiologique : Double inspiration par le nez (une ample, une petite rallonge), puis expiration lente et totale par la bouche (5 cycles pour calmer le nerf vague).",
        "L'Épreuve du 'Suffisamment Bon' : Livrez un travail secondaire à 85 % de vos standards sans vérification obsessive. Constatez que rien ne s'effondre.",
        "Frontière Explicite : 'Ma charge mentale et mon planning sont au maximum, je ne peux pas accepter ce dossier sans compromettre le reste.'",
      ],
      es: [
        "Suspiro Fisiológico: Doble inhalación por la nariz (una profunda, otra corta al final) y exhalación larga y suave por la boca (5 ciclos para regular el nervio vago).",
        "Práctica del 'Suficientemente Bueno': Entrega una tarea a un estándar del 85% sin revisarla diez veces. Comprueba que no ocurre ninguna catástrofe.",
        "Límite Saludable: 'Mi capacidad está al límite en este momento; no puedo asumir esto sin comprometer prioridades clave.'",
      ],
    },
    color: "#e11d48",
  },
  hyper_achiever: {
    level: "hyper_achiever",
    badge: {
      en: "High-Functioning Anxiety / The Fear-Driven Achiever",
      id: "High-Functioning Anxiety / Pengejar Berbasis Cemas",
      de: "Hochfunktionale Angst / Angstgetriebene Leistung",
      fr: "Anxiété de Performance / Sur-adapté Anxieux",
      es: "Ansiedad Funcional / El Triunfador Inquieto",
    },
    title: {
      en: "The Driven Sentinel",
      id: "Sang Penjaga Siaga",
      de: "Der getriebene Wächter",
      fr: "La Sentinelle Hyperactive",
      es: "El Centinela Incansable",
    },
    tagline: {
      en: "Transforming internal dread into obsessive productivity and meticulous control.",
      id: "Mengubah kegelisahan batin menjadi produktivitas obsesif dan kendali yang sangat teliti.",
      de: "Wandelt innere Unruhe in rastlose Produktivität und penible Detailkontrolle um.",
      fr: "Transforme l'angoisse sous-jacente en hyper-productivité et contrôle méticuleux.",
      es: "Canaliza la tensión interior en hiperproductividad y control minucioso.",
    },
    description: {
      en: "Anxiety is your secret engine. You channel nervous energy into meticulous planning, spotless deadlines, and exceeding expectations. While society rewards your output, the psychological price is high: chronic muscle tension, difficulty sleeping without mental chatter, and an inability to celebrate your own wins.",
      id: "Kecemasan adalah mesin pendorong rahasia Anda. Anda menyalurkan energi gugup menjadi perencanaan yang detail, tenggat waktu tepat, dan ekspektasi yang terlampaui. Meski masyarakat memuji pencapaian Anda, harga yang harus dibayar sangat mahal: otot tegang kronis, sulit tidur karena kepala bising, dan ketidakmampuan menikmati kemenangan sendiri.",
      de: "Angst ist Ihr heimlicher Antriebsmotor. Sie kanalisieren Nervosität in minutiöse Planung und herausragende Resultate. Die Außenwelt applaudiert, doch Sie zahlen mit chronischer Anspannung und Schlaflosigkeit dafür.",
      fr: "L'anxiété est votre carburant invisible. Vous convertissez votre nervosité en organisation exemplaire et perfectionnisme salué de tous. Cependant, le coût corporel est lourd : tensions musculaires, ruminations nocturnes et incapacité à savourer vos victoires.",
      es: "La ansiedad es tu motor oculto. Canalizas los nervios en hiperorganización y resultados impecables. Todos aplauden tu entrega, pero pagas un peaje silencioso: contracturas constantes, insomnio de conciliación y dificultad para saborear lo conseguido.",
    },
    demaskingDrills: {
      en: [
        "Uncoupling Worth from Output: Write down 3 personal qualities that make you worthy of love and respect that have zero connection to productivity or career success.",
        "Transition Wind-Down: Create a hard 15-minute shutdown ritual between work and evening where work thoughts are physically closed in a notebook.",
        "Vocalizing Uncertainty: Practice saying 'I am not 100% sure about this yet, let me investigate' instead of immediately scrambling for answers.",
      ],
      id: [
        "Pemisahan Nilai Diri dari Hasil: Tuliskan 3 kualitas pribadi Anda yang layak dihargai dan dicintai yang sama sekali tidak berkaitan dengan karier atau uang.",
        "Ritual Penutup Hari: Buat batas tegas 15 menit penutup kerja; catat semua sisa pikiran di buku catatan, tutup bukunya secara fisik, lalu tinggalkan meja kerja.",
        "Nyatakan Ketidakpastian: Biasakan berkata 'Saya belum tahu pasti hal ini, izinkan saya mengeceknya terlebih dahulu' alih-alih panik mencari jawaban instan.",
      ],
      de: [
        "Selbstwert entkoppeln: Notieren Sie 3 Charakterzüge, die Sie liebenswert machen und rein gar nichts mit beruflicher Leistung zu tun haben.",
        "Feierabend-Ritual: Schließen Sie den Arbeitstag mit einem festen Ritual ab – alle offenen Gedanken in ein Notizbuch schreiben und zuklappen.",
        "Mut zur Lücke: Sagen Sie gelassen: 'Das weiß ich im Moment noch nicht genau, ich prüfe das in Ruhe.'",
      ],
      fr: [
        "Dissocier Valeur et Rendement : Notez 3 qualités humaines qui font votre valeur et qui n'ont aucun rapport avec vos performances professionnelles.",
        "Rituel de Coupure : Clôturez votre journée par un sas de 15 minutes en notant tout ce qui reste dans un carnet fermé physiquement.",
        "Accueillir l'Incertitude : Entraînez-vous à déclarer calmement : 'Je n'ai pas la réponse immédiate, je prends le temps d'étudier la question.'",
      ],
      es: [
        "Desvincular Autoestima de Rendimiento: Escribe 3 virtudes tuyas que te hagan digno de cariño y que no tengan nada que ver con el trabajo ni con producir.",
        "Ritual de Desconexión: Cierra la jornada laboral con 15 minutos de transición, volcando pendientes en un cuaderno cerrado.",
        "Tolerar la Incertidumbre: Practica decir con tranquilidad: 'No lo sé ahora mismo con certeza, lo analizaré con calma.'",
      ],
    },
    color: "#f59e0b",
  },
  fidgeting_sentinel: {
    level: "fidgeting_sentinel",
    badge: {
      en: "Mild-Moderate High-Functioning Anxiety",
      id: "High-Functioning Anxiety Ringan-Sedang",
      de: "Leichte bis Mittlere Hochfunktionale Angst",
      fr: "Anxiété Fonctionnelle Modérée",
      es: "Ansiedad Funcional Moderada",
    },
    title: {
      en: "The Quiet Overthinker",
      id: "Pemikir Tenang yang Waspada",
      de: "Der stille Gedankenkreiser",
      fr: "Le Penseur Discret",
      es: "El Observador Hipervigilante",
    },
    tagline: {
      en: "Subtle anticipatory worry and micro-managing tendencies kept under reliable wraps.",
      id: "Kekhawatiran antisipatif halus dan kecenderungan mengontrol mikro yang tersimpan rapi.",
      de: "Dezente Zukunftssorgen und Hang zur Mikrokontrolle, gut vor anderen verborgen.",
      fr: "Inquiétudes anticipatrices subtiles et besoin de contrôle masqués par une belle rigueur.",
      es: "Preocupaciones anticipatorias sutiles y tendencia al control disimuladas con discreción.",
    },
    description: {
      en: "Your high-functioning anxiety is mostly situational or periodic. You experience waves of intense anticipatory anxiety before meetings, social obligations, or performance reviews. You manage it well through diligence, but it drains energy that could otherwise go toward spontaneous joy and deep presence.",
      id: "High-functioning anxiety Anda bersifat situasional atau periodik. Anda kerap merasakan gelombang cemas antisipatif sebelum rapat penting atau acara sosial. Anda mengatasinya dengan persiapan matang, namun energi Anda tersedot sehingga mengurangi ruang untuk kegembiraan spontan.",
      de: "Ihre funktionale Angst tritt vor allem in fordernden Lebensphasen auf. Vor Terminen oder Verpflichtungen erleben Sie spürbare Anspannung. Sie kompensieren dies durch Gründlichkeit, verschenken dabei aber Leichtigkeit und Lebensfreude.",
      fr: "Votre anxiété fonctionnelle est principalement périodique. Elle surgit avant des échéances ou des réunions importantes. Votre sérieux vous permet de garder la barre, mais vous perdez en spontanéité et en sérénité.",
      es: "Tu ansiedad de alto funcionamiento es mayormente situacional. Aparece ante compromisos importantes o cambios. La manejas con diligencia impecable, pero resta espacio a la alegría espontánea y al descanso genuino.",
    },
    demaskingDrills: {
      en: [
        "Somatic Grounding: Touch 3 different textures with your fingertips when anticipatory anxiety begins, anchoring into physical sensory reality.",
        "Catastrophizing Reality Check: Ask: 'What is the most likely realistic outcome, rather than the catastrophic worst-case?'",
        "Permission to Pause: Schedule 10 minutes of non-productive quiet sitting with music or breathwork before opening your email inbox.",
      ],
      id: [
        "Grounding Somatik: Raba 3 tekstur berbeda dengan ujung jari Anda saat cemas mulai datang, agar pikiran kembali membumi ke sensasi fisik.",
        "Uji Realitas Bencana: Tanyakan: 'Apa hasil yang paling realistis dan mungkin terjadi, bukan skenario kehancuran terburuk?'",
        "Izin Jeda Bernapas: Luangkan 10 menit tanpa membuka ponsel atau email di pagi hari untuk mendengarkan audio relaksasi.",
      ],
      de: [
        "Sensorisches Erden: Berühren Sie bei aufsteigender Unruhe 3 verschiedene Texturen, um ins Hier und Jetzt zurückzukehren.",
        "Realitäts-Check: 'Was ist das wahrscheinlichste Ergebnis, fernab des absoluten Horrorszenarios?'",
        "Atem-Pause: Nehmen Sie sich morgens 10 ungestörte Minuten, bevor Sie das E-Mail-Postfach öffnen.",
      ],
      fr: [
        "Ancrage Sensoriel : Touchez 3 textures différentes autour de vous pour ramener votre attention dans le corps dès que le mental s'emballe.",
        "Défi de Lucidité : 'Quel est le dénouement le plus probable, loin de mon scénario catastrophe imaginaire ?'",
        "Pause Sas : Accordez-vous 10 minutes matinales sans écran avant de vous plonger dans les flux de messages.",
      ],
      es: [
        "Enraizamiento Sensorial: Toca 3 texturas distintas a tu alrededor en cuanto notes inquietud para reconectar con el presente físico.",
        "Contraste de Realidad: '¿Cuál es el resultado más razonable y probable, en vez del peor desenlace imaginario?'",
        "Espacio de Calma Matutino: Dedica 10 minutos a respirar o escuchar música antes de abrir la bandeja de entrada.",
      ],
    },
    color: "#3b82f6",
  },
  regulated_flow: {
    level: "regulated_flow",
    badge: {
      en: "Regulated Autonomic Flow / Low Masking",
      id: "Keseimbangan Otonom Matang / Autentik",
      de: "Regulierter Nervenfluss / Hohe Authentizität",
      fr: "Système Régulé / Authenticité & Équilibre",
      es: "Flujo Nervioso Regulado / Autenticidad Saludable",
    },
    title: {
      en: "The Grounded Flow",
      id: "Ketenangan Autentik",
      de: "Die gelassene Balance",
      fr: "L'Équilibre Serein",
      es: "La Calma Fluida",
    },
    tagline: {
      en: "Balanced ambition driven by healthy enthusiasm without living behind an armored facade.",
      id: "Ambisi yang sehat dan seimbang, didorong oleh antusiasme tanpa perlu bersembunyi di balik topeng ketabahan semu.",
      de: "Gesunder Ehrgeiz aus Freude an der Sache, frei von panischem Maskierungszwang.",
      fr: "Une ambition saine portée par l'enthousiasme, sans masque d'invulnérabilité épuisant.",
      es: "Una ambición sana nacida de la motivación genuina, sin necesidad de blindajes agotadores.",
    },
    description: {
      en: "You have cultivated a remarkably healthy relationship between ambition and autonomic recovery. When you perform, it is fueled by genuine engagement, not fear of being unmasked as a failure. You can say no without crippling guilt, ask for support when needed, and comfortably disconnect during rest periods.",
      id: "Anda memiliki hubungan yang sangat sehat antara ambisi kerja dan pemulihan sistem saraf. Tindakan dan prestasi Anda didorong oleh minat nyata, bukan ketakutan akan kegagalan. Anda mampu berkata tidak tanpa rasa bersalah yang menyiksa, rela meminta bantuan, dan dapat beristirahat dengan damai.",
      de: "Sie pflegen ein vorbildliches Gleichgewicht zwischen Leistung und Erholung. Sie handeln aus authentischer Motivation statt aus Versagensangst. Grenzen setzen Sie ohne quälende Schuldgefühle.",
      fr: "Vous entretenez une relation équilibrée entre engagement et récupération. Vos actions émanent d'un désir sincère et non de la peur d'échouer. Vous savez poser des limites avec clarté et déconnecter sans remords.",
      es: "Mantienes un equilibrio ejemplar entre compromiso y descanso reparador. Tus proyectos nacen de la vocación y no del miedo a fracasar. Sabes poner límites sin culpa y desconectar con serenidad.",
    },
    demaskingDrills: {
      en: [
        "Protective Maintenance: Guard your daily sleep and somatic decompression rituals like non-negotiable appointments.",
        "Vulnerable Leadership: Share your learning curves openly with peers to give them implicit permission to drop their own masks.",
        "Joy-Driven Exploration: Dedicate time to hobbies and creative acts where achievement and metrics are completely irrelevant.",
      ],
      id: [
        "Penjagaan Rutin: Lindungi jadwal tidur dan waktu istirahat tubuh Anda seperti janji temu yang tidak bisa diganggu gugat.",
        "Kepemimpinan Empatis: Bagikan proses belajar Anda secara terbuka agar orang lain juga merasa aman melepaskan topeng mereka.",
        "Eksplorasi Murni: Luangkan waktu untuk hobi atau hal kreatif yang bebas dari target atau penilaian performa apa pun.",
      ],
      de: [
        "Schützende Pflege: Behandeln Sie Erholungsphasen und Schlafzeiten wie unumstößliche Termine mit sich selbst.",
        "Vorbildwirkung: Sprechen Sie offen über Herausforderungen, um Mitmenschen den Druck zu nehmen.",
        "Zweckfreie Hobbys: Pflegen Sie Aktivitäten, bei denen Leistung und Messbarkeit überhaupt keine Rolle spielen.",
      ],
      fr: [
        "Sanctuaire de Récupération : Préservez votre sommeil et vos moments de calme comme des rendez-vous inviolables.",
        "Partage Bienveillant : Exprimez librement vos doutes pour inspirer votre entourage à déposer ses propres masques.",
        "Créativité Désintéressée : Pratiquez des loisirs où la notion de rentabilité ou de performance est totalement absente.",
      ],
      es: [
        "Sanctasanctórum de Descanso: Protege tus horas de sueño y pausas diarias como citas innegociables con tu salud.",
        "Liderazgo Humano: Comparte tus dudas o aprendizajes con naturalidad para aliviar la presión de quienes te rodean.",
        "Disfrute Libre: Dedica tiempo a actividades creativas donde no existan métricas ni exigencias de rendimiento.",
      ],
    },
    color: "#10b981",
  },
};

export interface HfaScoreResult {
  totalScore: number;
  maxScore: number;
  percentage: number;
  level: HfaLevel;
  profile: HfaProfile;
  subscales: {
    internal_turmoil: { score: number; max: number; percentage: number };
    hyper_performance: { score: number; max: number; percentage: number };
    composure_mask: { score: number; max: number; percentage: number };
  };
}

export function calculateHfaScore(answers: Record<number, number>): HfaScoreResult {
  let internal_turmoil = 0;
  let hyper_performance = 0;
  let composure_mask = 0;

  HFA_QUESTIONS.forEach((q) => {
    const val = answers[q.id] || 0;
    if (q.dimension === "internal_turmoil") internal_turmoil += val;
    if (q.dimension === "hyper_performance") hyper_performance += val;
    if (q.dimension === "composure_mask") composure_mask += val;
  });

  const totalScore = internal_turmoil + hyper_performance + composure_mask;
  const maxScore = 36;
  const percentage = Math.round((totalScore / maxScore) * 100);

  let level: HfaLevel = "regulated_flow";

  if (totalScore >= 27) {
    level = "exhausted_mask";
  } else if (totalScore >= 18) {
    level = "hyper_achiever";
  } else if (totalScore >= 10) {
    level = "fidgeting_sentinel";
  } else {
    level = "regulated_flow";
  }

  return {
    totalScore,
    maxScore,
    percentage,
    level,
    profile: HFA_PROFILES[level],
    subscales: {
      internal_turmoil: {
        score: internal_turmoil,
        max: 12,
        percentage: Math.round((internal_turmoil / 12) * 100),
      },
      hyper_performance: {
        score: hyper_performance,
        max: 12,
        percentage: Math.round((hyper_performance / 12) * 100),
      },
      composure_mask: {
        score: composure_mask,
        max: 12,
        percentage: Math.round((composure_mask / 12) * 100),
      },
    },
  };
}
