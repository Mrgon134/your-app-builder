export type DissociationLang = "en" | "id" | "de" | "fr" | "es";
export type DissociationDimension = "depersonalization" | "derealization" | "absorption";
export type DissociationLevel = "grounded" | "mild" | "moderate" | "severe";

export interface DissociationQuestion {
  id: number;
  text: Record<DissociationLang, string>;
  dimension: DissociationDimension;
}

export interface DissociationProfile {
  level: DissociationLevel;
  badge: Record<DissociationLang, string>;
  title: Record<DissociationLang, string>;
  tagline: Record<DissociationLang, string>;
  description: Record<DissociationLang, string>;
  somaticReconnection: Record<DissociationLang, string[]>;
  color: string;
}

export const DISSOCIATION_QUESTIONS: DissociationQuestion[] = [
  // Depersonalization (1-4)
  {
    id: 1,
    dimension: "depersonalization",
    text: {
      en: "I feel like I am standing outside of my own body, watching myself live or talk like a movie character.",
      id: "Saya merasa seperti berdiri di luar tubuh sendiri, mengamati diri sendiri beraktivitas atau berbicara seperti tokoh dalam film.",
      de: "Ich fühle mich, als stünde ich neben meinem Körper und beobachte mich wie eine Figur in einem Film.",
      fr: "J'ai l'impression d'être en dehors de mon propre corps, observant mes gestes et paroles comme un personnage de film.",
      es: "Siento como si estuviera fuera de mi propio cuerpo, observándome actuar o hablar como un personaje de película.",
    },
  },
  {
    id: 2,
    dimension: "depersonalization",
    text: {
      en: "When I look into a mirror, my reflection feels unfamiliar, alien, or disconnected from who I am inside.",
      id: "Ketika menatap cermin, bayangan wajah saya terasa asing, aneh, atau terputus dari jati diri di dalam batin.",
      de: "Wenn ich in den Spiegel blicke, wirkt mein Spiegelbild fremd oder nicht mit meinem inneren Ich verbunden.",
      fr: "Quand je me regarde dans un miroir, mon reflet me semble étranger ou déconnecté de mon identité.",
      es: "Al mirarme en el espejo, mi reflejo se siente extraño, ajeno o desconectado de quien soy por dentro.",
    },
  },
  {
    id: 3,
    dimension: "depersonalization",
    text: {
      en: "My hands, legs, or body feel numb or as though they don't truly belong to me during stressful moments.",
      id: "Tangan, kaki, atau bagian tubuh saya terasa baal atau seolah bukan milik saya sendiri saat stres melanda.",
      de: "Meine Hände, Beine oder mein Körper fühlen sich taub an oder als gehörten sie nicht zu mir.",
      fr: "Mes mains, mes jambes ou mon corps semblent engourdis ou étrangers lors des moments de tension.",
      es: "Mis manos, piernas o cuerpo se sienten entumecidos o como si no me pertenecieran en momentos de estrés.",
    },
  },
  {
    id: 4,
    dimension: "depersonalization",
    text: {
      en: "I hear my own voice speaking and it feels like an automated recording rather than my own conscious thought.",
      id: "Saya mendengar suara saya sendiri berbicara dan terasa seperti rekaman otomatis, bukan pikiran sadar saya.",
      de: "Ich höre meine eigene Stimme sprechen und sie wirkt wie eine automatisierte Tonbandaufnahme.",
      fr: "J'entends ma propre voix et elle me paraît automatique, comme un enregistrement préprogrammé.",
      es: "Escucho mi propia voz y suena como una grabación mecánica en lugar de mi pensamiento consciente.",
    },
  },

  // Derealization (5-8)
  {
    id: 5,
    dimension: "derealization",
    text: {
      en: "My surroundings feel artificial, dreamlike, two-dimensional, or as if viewed through a sheet of thick glass.",
      id: "Lingkungan sekitar terasa artifisial, seperti mimpi, dua dimensi, atau terhalang kaca tebal.",
      de: "Meine Umgebung wirkt künstlich, traumartig, zweidimensional oder wie durch eine dicke Glasscheibe gesehen.",
      fr: "Mon environnement me paraît irréel, comme dans un rêve, bidimensionnel ou derrière une vitre épaisse.",
      es: "Mi entorno se siente artificial, como un sueño, bidimensional o visto a través de un cristal grueso.",
    },
  },
  {
    id: 6,
    dimension: "derealization",
    text: {
      en: "Familiar places (my home, workplace, childhood street) suddenly feel completely foreign and eerie.",
      id: "Tempat yang sangat saya kenal (rumah, kantor, jalan sekitar) tiba-tiba terasa sangat asing dan dingin.",
      de: "Vertraute Orte (Zuhause, Arbeitsplatz) wirken plötzlich vollkommen fremd und unwirklich.",
      fr: "Des lieux familiers (maison, bureau) me semblent soudainement totalement étrangers et distants.",
      es: "Lugares familiares (mi hogar, el trabajo) de pronto se sienten completamente extraños y lejanos.",
    },
  },
  {
    id: 7,
    dimension: "derealization",
    text: {
      en: "People around me feel robotic, lifeless, or like actors performing rehearsed scripts on a stage.",
      id: "Orang-orang di sekitar saya terasa seperti robot, tanpa jiwa, atau aktor yang memainkan naskah sandiwara.",
      de: "Menschen um mich herum wirken roboterhaft, leblos oder wie Schauspieler auf einer Theaterbühne.",
      fr: "Les gens autour de moi ressemblent à des automates ou à des comédiens répétant un rôle.",
      es: "Las personas a mi alrededor parecen robots, figuras sin vida o actores siguiendo un libreto.",
    },
  },
  {
    id: 8,
    dimension: "derealization",
    text: {
      en: "Sounds and visual details around me seem unusually muffled, far away, or excessively hyper-saturated.",
      id: "Suara dan pemandangan di sekitar terasa teredam jauh atau justru terlalu tajam menyilaukan secara tak wajar.",
      de: "Geräusche und visuelle Eindrücke wirken merkwürdig gedämpft, weit entfernt oder übermäßig grell.",
      fr: "Les sons et détails visuels paraissent étouffés, lointains ou anormalement saturés.",
      es: "Los sonidos y detalles visuales parecen amortiguados, lejanos o extrañamente hiperenfocados.",
    },
  },

  // Absorption & Numbing (9-12)
  {
    id: 9,
    dimension: "absorption",
    text: {
      en: "I lose huge chunks of time (driving somewhere or scrolling) with zero memory of how I got there.",
      id: "Saya sering kehilangan ingatan tentang waktu (berkendara atau browsing) tanpa sadar bagaimana saya bisa sampai di sana.",
      de: "Ich verliere Zeitabschnitte (beim Autofahren oder Scrollen), ohne Erinnerung daran, wie ich dorthin gelangt bin.",
      fr: "Je perds la notion du temps (en conduisant ou en ligne) sans souvenir de la façon dont le temps s'est écoulé.",
      es: "Pierdo noción de periodos de tiempo (al conducir o navegar) sin recordar cómo transcurrió.",
    },
  },
  {
    id: 10,
    dimension: "absorption",
    text: {
      en: "During emotional confrontation, my body completely shuts down: my mind goes blank and I feel zero emotion.",
      id: "Saat terjadi konflik emosional, tubuh saya mati rasa seketika: pikiran mendadak kosong tanpa emosi apa pun.",
      de: "Bei emotionalen Konflikten schaltet mein Körper ab: Mein Kopf wird leer und ich fühle keinerlei Emotion.",
      fr: "Lors d'un conflit émotionnel, mon corps se fige : mon esprit devient blanc et mes émotions s'éteignent.",
      es: "Ante una discusión emocional, mi cuerpo se bloquea: mi mente queda en blanco y no siento ninguna emoción.",
    },
  },
  {
    id: 11,
    dimension: "absorption",
    text: {
      en: "I cope with overwhelm by mentally floating into fantasy worlds or detaching from sensory reality.",
      id: "Saya mengatasi rasa kewalahan dengan melamun ke dunia fantasi atau melepaskan kesadaran dari realitas fisik.",
      de: "Ich bewältige Überforderung, indem ich mich in Fantasiewelten flüchte oder mich von der Realität abkoppele.",
      fr: "Je gère la surcharge en m'évadant dans des mondes imaginaires ou en me coupant de la réalité sensorielle.",
      es: "Afronto el agobio refugiándome en fantasías mentales o desconectándome de la realidad sensorial.",
    },
  },
  {
    id: 12,
    dimension: "absorption",
    text: {
      en: "I feel like a ghost or invisible spectator wandering through my daily life without truly taking part in it.",
      id: "Saya merasa seperti hantu atau penonton tak terlihat yang menjalani hari-hari tanpa benar-benar merasakannya.",
      de: "Ich fühle mich wie ein Geist oder unsichtbarer Zuschauer, der durch den Alltag wandelt, ohne daran teilzuhaben.",
      fr: "J'ai l'impression d'être un fantôme ou un spectateur invisible traversant sa propre vie sans y participer.",
      es: "Me siento como un espectador invisible o un fantasma caminando por mi rutina sin participar en ella.",
    },
  },
];

export const DISSOCIATION_OPTIONS = [
  {
    value: 0,
    label: {
      en: "Never / Does not apply to me",
      id: "Tidak pernah / Tidak menggambarkan saya",
      de: "Nie / Trifft nicht auf mich zu",
      fr: "Jamais / Ne s'applique pas à moi",
      es: "Nunca / No aplica a mí",
    },
  },
  {
    value: 1,
    label: {
      en: "Rarely (Once or twice a month under high stress)",
      id: "Jarang (1-2 kali sebulan saat stres berat)",
      de: "Selten (1-2 Mal im Monat unter hohem Stress)",
      fr: "Rarement (Une ou deux fois par mois sous fort stress)",
      es: "Rara vez (Una o dos veces al mes bajo estrés intenso)",
    },
  },
  {
    value: 2,
    label: {
      en: "Frequently (Several times a week)",
      id: "Sering (Beberapa kali dalam seminggu)",
      de: "Häufig (Mehrmals pro Woche)",
      fr: "Fréquemment (Plusieurs fois par semaine)",
      es: "Frecuentemente (Varias veces por semana)",
    },
  },
  {
    value: 3,
    label: {
      en: "Constantly (Daily chronic baseline state)",
      id: "Hampir selalu (Kondisi default kronis sehari-hari)",
      de: "Ständig (Täglicher chronischer Dauerzustand)",
      fr: "Constamment (État chronique quasi quotidien)",
      es: "Constantemente (Estado crónico diario)",
    },
  },
];

export const DISSOCIATION_PROFILES: Record<DissociationLevel, DissociationProfile> = {
  grounded: {
    level: "grounded",
    badge: {
      en: "Integrated Embodiment",
      id: "Embodimen Terintegrasi",
      de: "Integrierte Körperpräsenz",
      fr: "Incarnation intégrée",
      es: "Encarnación integrada",
    },
    title: {
      en: "Grounded & Somatically Anchored",
      id: "Terhubung Kuat dengan Tubuh & Realitas",
      de: "Geerdet und somatisch verankert",
      fr: "Ancré et connecté au réel",
      es: "Arraigado y conectado con el cuerpo",
    },
    tagline: {
      en: "Your nervous system maintains strong interoceptive awareness and real-time connection to your senses.",
      id: "Sistem saraf Anda memiliki kesadaran tubuh yang kokoh dan hadir utuh dalam realitas fisik.",
      de: "Ihr Nervensystem verfügt über eine stabile interozeptive Wahrnehmung und Präsenz.",
      fr: "Votre système nerveux conserve une solide présence corporelle et sensorielle.",
      es: "Su sistema nervioso mantiene una clara conciencia interoceptiva del presente.",
    },
    description: {
      en: "Your score indicates minimal to zero dissociative episodes. When stress arises, your prefrontal cortex and sensory thalamus remain synchronized, allowing you to experience bodily emotions safely without detaching into a fog or out-of-body numbness.",
      id: "Skor Anda menunjukkan episode disosiasi yang sangat rendah. Saat menghadapi tekanan, otak Anda tetap tersinkronisasi dengan baik, memungkinkan Anda merasakan emosi tubuh tanpa harus mematikan rasa atau melayang keluar dari realitas.",
      de: "Ihr Ergebnis zeigt minimale bis keine dissoziativen Zustände. Bei Stress bleibt Ihr Gehirn stabil mit Ihrer Körperwahrnehmung verbunden.",
      fr: "Votre score révèle une absence quasi totale d'épisodes dissociatifs. Vous traversez les émotions tout en restant fermement ancré dans votre corps.",
      es: "Su puntuación indica una desconexión mínima o nula. Ante el estrés, su sistema nervioso permanece vinculado al cuerpo de manera funcional.",
    },
    somaticReconnection: {
      en: [
        "Continue daily grounding rituals: morning barefoot grass walks and somatic voice journaling.",
        "Practice mindful interoception: notice temperature shifts and physical contact points throughout your day.",
        "Maintain regular nervous system checks using our Polyvagal State Meter.",
      ],
      id: [
        "Lanjutkan ritual grounding harian: jalan kaki tanpa alas kaki di rumput dan curhat suara di Ju.",
        "Latih interosepsi sadar: rasakan perubahan suhu dan titik kontak tubuh saat beraktivitas.",
        "Pertahankan kestabilan dengan pemantau sistem saraf Polyvagal berkala.",
      ],
      de: [
        "Tägliche Erdungsrituale beibehalten: Barfußlaufen und somatisches Journaling.",
        "Interozeptive Wahrnehmung pflegen: Körperkontaktpunkte bewusst spüren.",
        "Nervensystem stabilisieren durch regelmäßige Polyvagal-Checks.",
      ],
      fr: [
        "Maintenez vos rituels d'ancrage : marche pieds nus et journal vocal somatique.",
        "Cultivez la présence sensorielle au fil de vos journées.",
        "Vérifiez votre équilibre nerveux régulièrement.",
      ],
      es: [
        "Continúe con hábitos de arraigo diario y registro vocal reflexivo.",
        "Preste atención a las sensaciones táctiles y la temperatura del cuerpo.",
        "Conserve el equilibrio parasimpático con ejercicios regulares.",
      ],
    },
    color: "#10B981",
  },
  mild: {
    level: "mild",
    badge: {
      en: "Transient Stress Dissociation",
      id: "Disosiasi Stres Transien",
      de: "Vorübergehende Stress-Dissoziation",
      fr: "Dissociation passagère au stress",
      es: "Disociación pasajera por estrés",
    },
    title: {
      en: "Occasional Sensory Fog & Spacing Out",
      id: "Sering Melamun & Kabut Sensorik Ringan",
      de: "Gelegentlicher sensorischer Nebel",
      fr: "Brume sensorielle et décrochage passager",
      es: "Neblina sensorial y desconexión leve",
    },
    tagline: {
      en: "Your brain occasionally uses mild dissociation as a coping valve when sensory or cognitive inputs exceed capacity.",
      id: "Otak Anda sesekali memakai disosiasi ringan sebagai katup pengaman saat beban pikiran melebihi kapasitas.",
      de: "Ihr Gehirn nutzt leichte Dissoziation als Schutzventil bei kurzzeitiger Überreizung.",
      fr: "Votre cerveau utilise une légère dissociation comme mécanisme de défense temporaire.",
      es: "Su mente recurre a una leve desconexión como válvula de escape ante la saturación.",
    },
    description: {
      en: "You experience periodic episodes of spacing out, feeling 'floaty', or losing track of time during intense work deadlines or relational fatigue. This is a common defensive buffering response of the autonomic nervous system to prevent acute burnout.",
      id: "Anda sesekali merasa melayang, sulit fokus, atau kehilangan waktu saat deadline menumpuk atau lelah secara relasional. Ini adalah respons perlindungan alami sistem saraf agar otak tidak mengalami korsleting emosi.",
      de: "Sie erleben zeitweise Phasen von geistiger Abwesenheit oder Zeitaussetzern bei hohem Druck. Dies ist ein Schutzmechanismus des Nervensystems.",
      fr: "Vous traversez de temps en temps des moments d'absence ou de déconnexion temporelle lors de fortes surcharges mentales.",
      es: "Experimenta momentos puntuales de aturdimiento o pérdida de la noción del tiempo cuando la presión se intensifica.",
    },
    somaticReconnection: {
      en: [
        "Bilateral Heel Rhythm: Stamp your bare heels into the floor 10 times to re-engage physical proprioception.",
        "Sip ice water slowly, focusing on the cold sensation traveling down through your chest.",
        "Engage in 10 minutes of Stanford NSDR to restore prefrontal connectivity without screen fatigue.",
      ],
      id: [
        "Ketukan Tumit Bilateral: Hentakkan kedua tumit tanpa alas kaki ke lantai 10 kali untuk mengaktifkan propriosepsi.",
        "Teguk air dingin secara perlahan, rasakan sensasi dingin mengalir dari tenggorokan ke dada.",
        "Lakukan 10 menit Stanford NSDR untuk menyegarkan fokus prefrontal tanpa menatap layar.",
      ],
      de: [
        "Fersen-Rhythmus: Klopfen Sie die Fersen 10 Mal kräftig auf den Boden für Körperpräsenz.",
        "Trinken Sie langsam ein Glas Eiswasser und spüren Sie die Kälte im Brustraum.",
        "10 Minuten Stanford NSDR nutzen, um die kognitive Klarheit wiederherzustellen.",
      ],
      fr: [
        "Frappez doucement vos talons au sol 10 fois pour réactiver votre ancrage corporel.",
        "Buvez de l'eau très fraîche en observant la sensation de fraîcheur dans la gorge.",
        "Faites 10 minutes de NSDR de Stanford pour dissiper le brouillard cérébral.",
      ],
      es: [
        "Golpee suavemente los talones contra el suelo 10 veces para despertar la propiocepción.",
        "Beba agua fría despacio, notando la sensación térmica en el pecho.",
        "Dedique 10 minutos al NSDR de Stanford para devolver el foco a su mente.",
      ],
    },
    color: "#F59E0B",
  },
  moderate: {
    level: "moderate",
    badge: {
      en: "Moderate DPDR Episodes",
      id: "Episode DPDR Moderat",
      de: "Moderate DPDR-Episoden",
      fr: "Épisodes modérés de DP/DR",
      es: "Episodios moderados de DP/DR",
    },
    title: {
      en: "Depersonalization & Detached Reality",
      id: "Depersonalisasi & Terputus dari Tubuh",
      de: "Depersonalisation & Entfremdung",
      fr: "Dépersonnalisation et sentiment d'irréalité",
      es: "Despersonalización y realidad lejana",
    },
    tagline: {
      en: "Frequent feelings of living behind glass, watching yourself from afar, or finding familiar spaces surreal.",
      id: "Sering merasa hidup di balik kaca tebal, mengamati diri dari luar, atau merasa tempat familiar terasa ganjil.",
      de: "Regelmäßiges Gefühl, hinter Glas zu leben oder sich selbst wie ein Außenstehender zu beobachten.",
      fr: "Sensation régulière de vivre derrière une vitre ou d'observer sa vie de l'extérieur.",
      es: "Sensación frecuente de vivir tras un cristal o de verse a uno mismo como un espectador ajeno.",
    },
    description: {
      en: "Your results indicate recurring depersonalization-derealization (DPDR) episodes. The dorsal vagal nerve branch is actively damping down sensory transmission to shield you from emotional overwhelm, leaving you feeling disconnected from your hands, voice, or surroundings.",
      id: "Hasil Anda menunjukkan episode depersonalisasi-derealisasi (DPDR) yang berulang. Cabang saraf dorsal vagus sedang menurunkan volume sensorik tubuh untuk melindungi Anda dari rasa sakit emosional, sehingga Anda merasa terasing dari suara dan tubuh sendiri.",
      de: "Ihre Werte zeigen wiederkehrende Depersonalisations- und Derealisationserlebnisse. Ihr Nervensystem schützt Sie durch sensorische Dämpfung vor Überlastung.",
      fr: "Vos réponses indiquent des épisodes récurrents de dépersonnalisation et déréalisation. Votre nerf vague dorsal anesthésie vos perceptions pour vous protéger.",
      es: "Sus resultados reflejan episodios repetidos de DP/DR. Su sistema nervioso amortigua los estímulos sensoriales como mecanismo de defensa.",
    },
    somaticReconnection: {
      en: [
        "Cold Splash Vagal Reset: Immerse your face in a bowl of cold water for 15 seconds to trigger the mammalian dive reflex.",
        "5-4-3-2-1 Sensory Grounding: Name 5 objects around you out loud with their colors and textures.",
        "Vocal Humming: Hum a low continuous pitch ('Vooo') on an exhale to stimulate the vagus nerve and vocal cords.",
      ],
      id: [
        "Reset Refleks Menyelam Dingin: Celupkan wajah ke mangkuk air dingin selama 15 detik untuk memicu saraf vagus.",
        "Grounding Sensorik 5-4-3-2-1: Sebutkan 5 benda di sekitar Anda dengan suara lantang beserta warna dan teksturnya.",
        "Humming Vokal: Dengungkan nada rendah 'Vooo' saat membuang napas untuk menggetarkan pita suara dan saraf vagus.",
      ],
      de: [
        "Kaltwasser-Tauchreflex: Tauchen Sie das Gesicht für 15 Sekunden in kaltes Wasser.",
        "5-4-3-2-1 Erdungsübung: Nennen Sie 5 sichtbare Gegenstände laut mit Farbe und Form.",
        "Vokales Summen: Ein langes 'Vooo' beim Ausatmen summen, um den Vagusnerv zu stimulieren.",
      ],
      fr: [
        "Plongez votre visage dans l'eau froide 15 secondes pour déclencher le réflexe d'immersion.",
        "Pratiquez l'ancrage 5-4-3-2-1 en nommant à voix haute 5 objets qui vous entourent.",
        "Fredonnez un son grave ('Vooo') en expirant pour faire vibrer votre nerf vague.",
      ],
      es: [
        "Sumerja el rostro en agua fría 15 segundos para activar el reflejo de inmersión mamífero.",
        "Realice el ejercicio 5-4-3-2-1 nombrando en voz alta 5 objetos con sus colores y texturas.",
        "Emita un zumbido grave ('Vooo') al exhalar para estimular la vibración del nervio vago.",
      ],
    },
    color: "#6366F1",
  },
  severe: {
    level: "severe",
    badge: {
      en: "Chronic Dissociative Shutoff",
      id: "Disosiasi Kronis & Mati Rasa",
      de: "Chronischer dissoziativer Schutzstatus",
      fr: "Déconnexion dissociative chronique",
      es: "Desconexión disociativa crónica",
    },
    title: {
      en: "Deep Dorsal Vagal Numbing & Detachment",
      id: "Mati Rasa Emosional & Keterputusan Kronis",
      de: "Tiefe dorsale Erstarrung & Entfremdung",
      fr: "Engourdissement profond et coupure du réel",
      es: "Desconexión profunda y anestesia emocional",
    },
    tagline: {
      en: "Your nervous system has entered prolonged functional shutdown, making everyday life feel like a ghost observing a movie.",
      id: "Sistem saraf Anda berada dalam mode shutdown dorsal berkepanjangan, membuat hidup terasa seperti hantu menonton film.",
      de: "Ihr Nervensystem befindet sich in einem anhaltenden Schutz-Shutdown, der den Alltag wie einen Traum erscheinen lässt.",
      fr: "Votre système nerveux s'est mis en mode de protection prolongé, vous faisant vivre comme un spectateur anesthésié.",
      es: "Su sistema nervioso se encuentra en un estado prolongado de defensa que le hace percibir la vida como una película distante.",
    },
    description: {
      en: "Your score reflects severe and frequent dissociative symptoms across depersonalization, derealization, and memory gaps. This is not a personal failure or 'insanity'—it is Dr. Bessel van der Kolk's classic survival freeze reflex responding to chronic stress or past unresolved trauma. Professional trauma-informed therapy (EMDR, Somatic Experiencing) is strongly recommended.",
      id: "Skor Anda menunjukkan gejala disosiasi intens pada depersonalisasi, derealisasi, dan hilangnya persepsi waktu. Ini bukan kegilaan atau kelemahan karakter—ini adalah respons survival freeze biologis menurut Dr. Bessel van der Kolk (*The Body Keeps the Score*). Sangat dianjurkan berkonsultasi dengan terapis profesional berbasis trauma (EMDR / Somatic Experiencing).",
      de: "Ihr Ergebnis spiegelt schwere dissoziative Muster wider. Dies ist laut Dr. Bessel van der Kolk ein klassischer Überlebens-Erstarrungsreflex bei chronischer Belastung. Professionelle Begleitung (z. B. EMDR oder Somatic Experiencing) wird empfohlen.",
      fr: "Vos résultats reflètent une dissociation chronique importante. C'est le mécanisme de sidération décrit par le Dr Bessel van der Kolk. Une approche spécialisée en psychotraumatologie (EMDR, Somatic Experiencing) est vivement conseillée.",
      es: "Su puntuación indica síntomas disociativos severos y frecuentes. Se trata del reflejo de congelación descrito por el Dr. Bessel van der Kolk ante traumas o estrés crónico. Se recomienda apoyo profesional especializado en trauma.",
    },
    somaticReconnection: {
      en: [
        "Tactile Contrast Anchor: Hold an ice cube firmly in one hand until it melts, observing the sharp temperature boundary.",
        "Aromatherapy Shock: Inhale strong peppermint or eucalyptus oil to activate the olfactory-limbic pathway.",
        "Seek trauma-informed somatic psychotherapy (EMDR, IFS, or Somatic Experiencing).",
      ],
      id: [
        "Jangkar Kontras Taktil: Genggam sebongkah es batu di telapak tangan hingga mencair untuk merasakan batas fisik tubuh.",
        "Stimulasi Olfaktori: Cium aroma minyak kayu putih, peppermint, atau kopi pekat untuk menyalakan jalur limbik.",
        "Jadwalkan konsultasi dengan psikolog klinis berbasis trauma (EMDR, IFS, atau Somatic Experiencing).",
      ],
      de: [
        "Eiswürfel-Übung: Halten Sie einen Eiswürfel in der Hand, um klare physische Grenzen zu spüren.",
        "Starke Gerüche: Inhalieren Sie Pfefferminz- oder Eukalyptusöl, um das limbische System zu wecken.",
        "Traumatherapeutische Unterstützung in Betracht ziehen (EMDR, IFS oder Somatic Experiencing).",
      ],
      fr: [
        "Tenez un glaçon dans votre main pour réveiller la sensation des contours physiques de votre corps.",
        "Respirez une huile essentielle de menthe poivrée ou d'eucalyptus pour stimuler le système limbique.",
        "Consultez un thérapeute spécialisé dans le trauma (EMDR, IFS ou Somatic Experiencing).",
      ],
      es: [
        "Sostenga un cubito de hielo en la mano hasta que se derrita para sentir los límites de su cuerpo.",
        "Inhale aromas intensos como menta o eucalipto para reactivar el sistema límbico.",
        "Busque orientación con un terapeuta experto en trauma (EMDR, IFS o Experiencia Somática).",
      ],
    },
    color: "#8B5CF6",
  },
};

export interface DissociationScoreResult {
  totalScore: number;
  maxScore: number;
  percentage: number;
  level: DissociationLevel;
  profile: DissociationProfile;
  subscales: {
    depersonalization: { score: number; max: number; percentage: number };
    derealization: { score: number; max: number; percentage: number };
    absorption: { score: number; max: number; percentage: number };
  };
}

export function calculateDissociationScore(answers: Record<number, number>): DissociationScoreResult {
  let depersonalization = 0;
  let derealization = 0;
  let absorption = 0;

  DISSOCIATION_QUESTIONS.forEach((q) => {
    const val = answers[q.id] || 0;
    if (q.dimension === "depersonalization") depersonalization += val;
    if (q.dimension === "derealization") derealization += val;
    if (q.dimension === "absorption") absorption += val;
  });

  const totalScore = depersonalization + derealization + absorption;
  const maxScore = 36;
  const percentage = Math.round((totalScore / maxScore) * 100);

  let level: DissociationLevel = "grounded";
  if (totalScore >= 31) {
    level = "severe";
  } else if (totalScore >= 22) {
    level = "moderate";
  } else if (totalScore >= 12) {
    level = "mild";
  }

  return {
    totalScore,
    maxScore,
    percentage,
    level,
    profile: DISSOCIATION_PROFILES[level],
    subscales: {
      depersonalization: {
        score: depersonalization,
        max: 12,
        percentage: Math.round((depersonalization / 12) * 100),
      },
      derealization: {
        score: derealization,
        max: 12,
        percentage: Math.round((derealization / 12) * 100),
      },
      absorption: {
        score: absorption,
        max: 12,
        percentage: Math.round((absorption / 12) * 100),
      },
    },
  };
}
