export type BfrbCardLang = "en" | "id" | "de" | "fr" | "es";

export interface BfrbQuestion {
  id: number;
  subscale:
    | "sensory_urge_tension"
    | "automatic_vs_focused_compulsion"
    | "shame_tissue_damage_concealment";
  text: Record<BfrbCardLang, string>;
}

export interface BfrbResultLevel {
  level:
    | "minimal_occasional_grooming"
    | "mild_situational_bfrb_habit"
    | "moderate_bfrb_compulsion"
    | "high_clinical_bfrb_cycle"
    | "acute_severe_excoriation_trichotillomania";
  scoreRange: [number, number];
  title: Record<BfrbCardLang, string>;
  badge: Record<BfrbCardLang, string>;
  summary: Record<BfrbCardLang, string>;
  psychology: Record<BfrbCardLang, string>;
  actionProtocol: Record<BfrbCardLang, string[]>;
}

export const BFRB_QUESTIONS: BfrbQuestion[] = [
  // 1. Sensory Urge & Tension
  {
    id: 1,
    subscale: "sensory_urge_tension",
    text: {
      en: "Before picking your skin, pulling hair, or biting nails/cuticles, you experience a rising bodily tension, itching, or tingling that feels almost impossible to resist.",
      id: "Sebelum mengelupas kulit, mencabut rambut/alis, atau menggigit kuku/kutikula, kamu merasakan ketegangan fisik, gatal, atau sensasi berdenyut yang hampir mustahil ditahan.",
      de: "Vor dem Zupfen, Kratzen oder Nägelkauen spüren Sie eine quälende körperliche Anspannung, Kribbeln oder Unruhe, der kaum zu widerstehen ist.",
      fr: "Avant de triturer votre peau, d'arracher des cheveux ou de vous ronger les ongles, vous ressentez une tension corporelle ou des picotements quasi irrésistibles.",
      es: "Antes de pellizcarte la piel, arrancarte cabellos o morderte las uñas, experimentas una tensión corporal o cosquilleo que resulta casi imposible de frenar.",
    },
  },
  // 2. Automatic vs. Focused Compulsion
  {
    id: 2,
    subscale: "automatic_vs_focused_compulsion",
    text: {
      en: "You often catch yourself picking or pulling automatically while zoned out (reading, watching TV, working at a computer) without consciously intending to start.",
      id: "Kamu sering memergoki dirimu sedang mengelupas kulit atau mencabut rambut secara otomatis saat melamun (membaca, nonton TV, depan laptop) tanpa disengaja.",
      de: "Sie ertappen sich oft dabei, wie Sie ganz automatisch und gedankenverloren kratzen oder zupfen (beim Fernsehen, Lesen oder am PC).",
      fr: "Vous vous surprenez souvent à vous gratter ou vous arracher les poils de façon automatique sans y penser (devant la télé, en lisant ou au travail).",
      es: "A menudo te descubres pellizcándote o tirando del pelo de manera automática y distraída (viendo la tele, leyendo o frente al ordenador).",
    },
  },
  // 3. Shame, Damage & Concealment
  {
    id: 3,
    subscale: "shame_tissue_damage_concealment",
    text: {
      en: "You spend considerable time hiding the results of picking or pulling (using heavy makeup, band-aids, hats, scarves, or avoiding bright lights).",
      id: "Kamu menghabiskan banyak waktu menyembunyikan bekas kelupasan atau rambut botak (makeup tebal, plester luka, topi, syal, atau menghindari lampu terang).",
      de: "Sie verbringen viel Zeit damit, die Folgen zu verbergen (mit Make-up, Pflastern, Mützen, Schals oder durch das Meiden von hellem Licht).",
      fr: "Vous passez beaucoup de temps à masquer les séquelles (maquillage couvrant, pansements, casquettes, écharpes ou refus de la lumière vive).",
      es: "Dedicas mucho tiempo a ocultar las marcas o zonas despobladas (maquillaje espeso, apósitos, gorras, pañuelos o evitando luces brillantes).",
    },
  },
  // 4. Sensory Urge & Tension
  {
    id: 4,
    subscale: "sensory_urge_tension",
    text: {
      en: "You feel an overwhelming urge to run your fingers across skin or hair to scan for tiny bumps, roughness, ingrown hairs, or perceived imperfections.",
      id: "Kamu merasakan dorongan tak tertahankan untuk meraba-raba kulit atau rambut mencari tonjolan kecil, tekstur kasar, atau ketidaksempurnaan untuk dihilangkan.",
      de: "Sie spüren den Zwang, Ihre Haut oder Haare abzutasten, um nach Unebenheiten, Krusten oder 'unperfekten' Stellen zu suchen.",
      fr: "Vous ressentez le besoin irrépressible de palper votre peau ou vos cheveux pour traquer la moindre aspérité, croûte ou poil incarné.",
      es: "Sientes una necesidad imperiosa de pasar los dedos por la piel o el pelo buscando irregularidades, costras o asperezas para eliminarlas.",
    },
  },
  // 5. Automatic vs. Focused Compulsion
  {
    id: 5,
    subscale: "automatic_vs_focused_compulsion",
    text: {
      en: "You engage in focused sessions in front of a mirror (using tweezers, pins, or fingernails), losing track of time for 30–60 minutes or longer.",
      id: "Kamu sering melakukan sesi khusus di depan cermin (memakai pinset, jarum, atau kuku), hingga lupa waktu selama 30–60 menit atau lebih.",
      de: "Sie verbringen gezielte Phasen vor dem Spiegel (mit Pinzette oder Fingernägeln) und verlieren dabei für 30 bis 60 Minuten völlig das Zeitgefühl.",
      fr: "Vous vous livrez à des séances ciblées devant le miroir (avec une pince à épiler ou vos ongles), perdant la notion du temps pendant 30 à 60 minutes ou plus.",
      es: "Te enfrascas en sesiones intensas frente al espejo (con pinzas o uñas), perdiendo la noción del tiempo durante 30-60 minutos o más.",
    },
  },
  // 6. Shame, Damage & Concealment
  {
    id: 6,
    subscale: "shame_tissue_damage_concealment",
    text: {
      en: "The picking or pulling has caused visible tissue damage, scabs, bleeding, infections, thinning patches, or scarring on your body.",
      id: "Kebiasaan mengelupas atau mencabut telah menyebabkan luka nyata, keropeng berdarah, infeksi, kebotakan sebagian, atau bekas luka permanen.",
      de: "Das Verhalten hat zu sichtbaren Wunden, Blutungen, Entzündungen, lichten Haarstellen oder Narben an Ihrem Körper geführt.",
      fr: "Ces gestes ont provoqué des plaies visibles, des saignements, des infections, des zones dégarnies ou des cicatrices sur votre corps.",
      es: "Este hábito ha provocado heridas visibles, costras con sangre, infecciones, calvas circunscritas o cicatrices en tu cuerpo.",
    },
  },
  // 7. Sensory Urge & Tension
  {
    id: 7,
    subscale: "sensory_urge_tension",
    text: {
      en: "Immediately after picking or pulling a targeted spot, you feel a brief, intoxicating wave of relief, satisfaction, or emotional calm.",
      id: "Tepat setelah berhasil mengelupas atau mencabut bagian yang ditargetkan, kamu merasakan kelegaan sesaat, kepuasan, atau ketenangan emosional.",
      de: "Direkt nach dem Zupfen oder Kratzen spüren Sie eine kurze, intensive Erleichterung, Genugtuung oder momentane Beruhigung.",
      fr: "Juste après avoir extrait une imperfection ou arraché le poil ciblé, vous ressentez une brève vague de soulagement ou de satisfaction.",
      es: "Inmediatamente después de extraer la imperfección o arrancar el cabello, sientes una breve y placentera oleada de alivio o calma.",
    },
  },
  // 8. Automatic vs. Focused Compulsion
  {
    id: 8,
    subscale: "automatic_vs_focused_compulsion",
    text: {
      en: "You have repeatedly promised yourself you would 'never do it again', only to find your hands repeating the behavior minutes or hours later.",
      id: "Kamu sudah berkali-kali bersumpah pada diri sendiri 'tidak akan melakukannya lagi', namun tanganmu mengulanginya kembali beberapa menit kemudian.",
      de: "Sie haben sich unzählige Male geschworen, 'nie wieder' damit anzufangen, nur um sich kurz darauf wieder dabei zu ertappen.",
      fr: "Vous vous êtes juré maintes fois d'arrêter définitivement, pour vous retrouver à recommencer quelques minutes ou heures plus tard.",
      es: "Te has prometido mil veces que 'jamás volverías a hacerlo', solo para verte repitiendo el gesto unos minutos u horas después.",
    },
  },
  // 9. Shame, Damage & Concealment
  {
    id: 9,
    subscale: "shame_tissue_damage_concealment",
    text: {
      en: "Feelings of intense shame, self-disgust, or regret follow every picking or pulling episode, leading you to isolate yourself from friends or family.",
      id: "Rasa malu luar biasa, jijik pada diri sendiri, atau penyesalan mendalam selalu menyusul setiap episode, membuatmu menarik diri dari orang terdekat.",
      de: "Nach jedem Vorfall überrollen Sie Schamgefühle, Selbstekel und Reue, sodass Sie Verabredungen absagen und sich zurückziehen.",
      fr: "Une honte accablante, du dégoût de soi ou des regrets amers succèdent à chaque épisode, vous poussant à vous isoler socialement.",
      es: "Un profundo sentimiento de culpa, vergüenza o rechazo hacia ti mismo sigue a cada episodio, empujándote a aislarte de los demás.",
    },
  },
  // 10. Sensory Urge & Tension
  {
    id: 10,
    subscale: "sensory_urge_tension",
    text: {
      en: "Heightened stress, boredom, anxiety, or perfectionism noticeably amplifies the frequency and urgency of the picking or pulling behavior.",
      id: "Stres tinggi, rasa bosan, kecemasan, atau tuntutan kesempurnaan (perfeksionisme) secara nyata meningkatkan dorongan kebiasaan ini.",
      de: "Erhöhter Stress, Langeweile, innere Anspannung oder Perfektionismus verstärken den Drang zum Kratzen oder Zupfen massiv.",
      fr: "Le stress, l'ennui, l'anxiété ou le perfectionnisme amplifient nettement la fréquence et l'intensité de ce comportement.",
      es: "El estrés agudo, el aburrimiento, la ansiedad o el perfeccionismo disparan notablemente la frecuencia y urgencia del hábito.",
    },
  },
  // 11. Automatic vs. Focused Compulsion
  {
    id: 11,
    subscale: "automatic_vs_focused_compulsion",
    text: {
      en: "You examine, play with, or inspect the extracted hair, scab, or skin flake (feeling its texture, looking at the root bulb) before discarding it.",
      id: "Kamu mengamati, meraba, atau memainkan rambut, keropeng, atau serpihan kulit yang tercabut (merasakan teksturnya atau melihat akarnya) sebelum membuangnya.",
      de: "Sie betrachten, ertasten oder untersuchen die entfernte Kruste oder das Haar (Wurzel, Beschaffenheit) eingehend, bevor Sie es wegwerfen.",
      fr: "Vous examinez ou manipulez la croûte, la peau ou le cheveu extrait (en touchant la texture ou en observant le bulbe) avant de le jeter.",
      es: "Examinas, tocas o juegas con la costra, la piel o el cabello arrancado (sintiendo su textura o mirando la raíz) antes de desecharlo.",
    },
  },
  // 12. Shame, Damage & Concealment
  {
    id: 12,
    subscale: "shame_tissue_damage_concealment",
    text: {
      en: "The habit interferes with your daily functioning (arriving late because of mirror rituals, avoiding swimming/dating, or pain when wearing clothing).",
      id: "Kebiasaan ini mengganggu aktivitas harianmu (terlambat karena ritual di cermin, menghindari renang/kencan, atau nyeri saat berpakaian).",
      de: "Das Verhalten beeinträchtigt Ihren Alltag (Verspätungen durch Spiegelrituale, Meiden von Schwimmbädern/Dating oder Schmerzen durch Kleidung).",
      fr: "Ce trouble perturbe votre quotidien (retards dus aux rituels devant le miroir, évitement de la piscine ou des rendez-vous, douleurs au contact des habits).",
      es: "Este comportamiento interfiere en tu vida cotidiana (llegar tarde por rituales en el espejo, evitar la piscina o citas, o dolor con la ropa).",
    },
  },
];

export const BFRB_OPTIONS = [
  {
    value: 0,
    label: {
      en: "Never / Not at all (No repetitive urges or skin/hair damage)",
      id: "Tidak Pernah (Tidak ada dorongan mencabut/mengelupas berulang)",
      de: "Nie / Gar nicht (Kein Zwang zum Zupfen oder Kratzen)",
      fr: "Jamais / Pas du tout (Aucune pulsion répétitive ni lésion)",
      es: "Nunca / Para nada (Sin impulsos repetitivos ni daños en piel/pelo)",
    },
  },
  {
    value: 1,
    label: {
      en: "Rarely / Mild (Occasional slight picking/pulling under situational stress)",
      id: "Jarang / Ringan (Sesekali mengelupas/mencabut ringan saat sangat stres)",
      de: "Selten / Mild (Gelegentliches leichtes Kratzen/Zupfen bei Stress)",
      fr: "Rarement / Léger (Geste occasionnel sans lésions notables)",
      es: "Raras veces / Leve (Gesto ocasional ante momentos puntuales de estrés)",
    },
  },
  {
    value: 2,
    label: {
      en: "Frequently / Moderate (Daily urges, noticeable tissue damage, mirror rituals)",
      id: "Sering / Sedang (Dorongan harian nyata, luka berulang, ritual cermin)",
      de: "Häufig / Moderat (Täglicher Drang, sichtbare Wunden, Spiegelrituale)",
      fr: "Souvent / Modéré (Pulsions quotidiennes, lésions visibles, rituels)",
      es: "Frecuentemente / Moderado (Impulso diario evidente, lesiones, rituales de espejo)",
    },
  },
  {
    value: 3,
    label: {
      en: "Constantly / Severe (Compulsive trance sessions, severe tissue damage, deep shame)",
      id: "Hampir Selalu / Berat (Sesi kompulsif panjang, luka/kebotakan parah, rasa malu mendalam)",
      de: "Ständig / Schwer (Stundenlange Trancesitzungen, schwere Gewebeschäden, tiefe Scham)",
      fr: "Constamment / Sévère (Séances compulsives prolongées, lésions graves, honte intense)",
      es: "Constantemente / Severo (Sesiones compulsivas prolongadas, daños severos, intensa vergüenza)",
    },
  },
];

export const BFRB_RESULTS: BfrbResultLevel[] = [
  {
    level: "minimal_occasional_grooming",
    scoreRange: [0, 7],
    title: {
      en: "Minimal Occasional Grooming (Regulated Sensory Processing)",
      id: "Perawatan Diri Minimal & Wajar (Regulasi Sensori Sehat)",
      de: "Minimale gelegentliche Pflege (Regulierte Sensorik)",
      fr: "Toilettage Ponctuel Normal (Régulation Sensorielle Saine)",
      es: "Cuidado Corporal Saludable (Procesamiento Sensorial Regulado)",
    },
    badge: {
      en: "Regulated Sensory (0-19%)",
      id: "Sensori Teregulasi (0-19%)",
      de: "Regulierte Sensorik",
      fr: "Sensori-moteur Sain",
      es: "Sensorial Regulado",
    },
    summary: {
      en: "You do not exhibit clinical signs of Body-Focused Repetitive Behaviors (BFRBs). You may occasionally pop a minor blemish or trim a hangnail, but you do not experience overwhelming tactile urges, trance-like picking sessions, tissue damage, or debilitating shame.",
      id: "Kamu tidak menunjukkan tanda-tanda klinis Body-Focused Repetitive Behaviors (BFRB). Kamu mungkin sesekali memencet jerawat kecil atau memotong kuku yang sobek, namun kamu tidak mengalami dorongan tak tertahankan, ritual cermin berjam-jam, kerusakan jaringan tubuh, atau rasa malu melumpuhkan.",
      de: "Sie zeigen keine klinischen Symptome körperbezogener repetitiver Verhaltensweisen (BFRB). Gelegentliches Entfernen eines Nagelhautrisses erfolgt ohne Zwang, Gewebeschäden oder nachfolgende Scham.",
      fr: "Vous ne présentez aucun signe clinique de comportement répétitif centré sur le corps (BFRB). Vous entretenez votre peau et vos ongles sans impulsions compulsives, sans lésions cutanées et sans souffrance psychologique.",
      es: "No presentas indicios clínicos de conductas repetitivas centradas en el cuerpo (CRCC/BFRB). Tu cuidado estético es funcional, sin impulsos incontrolables, heridas cutáneas ni sentimientos de culpa o vergüenza.",
    },
    psychology: {
      en: "MGH-SPS / MGH-HPS Clinical Benchmark: Your sensorimotor gating is intact. Grooming behaviors serve purely aesthetic or hygiene functions rather than maladaptive autonomic nervous system down-regulation.",
      id: "Tolok Ukur Klinis MGH-SPS / MGH-HPS: Sistem penyaringan sensori-motorikmu berfungsi normal. Perawatan tubuh berfungsi murni untuk higiene dan estetika, bukan kompensasi regulasi sistem saraf otonom.",
      de: "MGH-Skala-Referenz: Ihre sensomotorische Reizfilterung ist intakt. Pflegehandlungen dienen rein der Hygiene und nicht der unbewussten Affektregulation.",
      fr: "Référence clinique MGH : Votre filtrage sensoriel est optimal. Les gestes de toilette remplissent un rôle hygiénique sans servir d'échappatoire anxieuse.",
      es: "Estándar clínico MGH: Tu integración sensoriomotora es funcional. Los hábitos de higiene no actúan como válvulas de escape emocional inconscientes.",
    },
    actionProtocol: {
      en: [
        "Continue maintaining balanced stress management and regular physical activity.",
        "Keep hands moisturized to prevent tempting rough edges or hangnails.",
        "Maintain current healthy boundaries around mirror usage and skin inspection.",
      ],
      id: [
        "Lanjutkan manajemen stres yang seimbang dan aktivitas fisik teratur.",
        "Jaga kelembapan kulit tangan dan tubuh untuk menghindari tekstur kasar atau kutikula kering.",
        "Pertahankan kebiasaan sehat saat bercermin tanpa melakukan inspeksi pori berlebihan.",
      ],
      de: [
        "Pflegen Sie weiterhin einen gesunden Umgang mit Alltagsstress.",
        "Halten Sie die Haut mit Feuchtigkeitscremes geschmeidig, um Tast-Reize zu minimieren.",
        "Behalten Sie Ihr unbeschwertes Verhältnis zum Spiegel bei.",
      ],
      fr: [
        "Poursuivez une gestion équilibrée du stress et une activité physique régulière.",
        "Hydratez régulièrement vos mains et votre peau pour éliminer les petites aspérités.",
        "Conservez une utilisation fonctionnelle et modérée du miroir.",
      ],
      es: [
        "Continúa con tus hábitos saludables de gestión del estrés y descanso.",
        "Mantén la piel y cutículas bien hidratadas para evitar asperezas tentadoras.",
        "Preserva tu relación natural y proporcionada con el espejo.",
      ],
    },
  },
  {
    level: "mild_situational_bfrb_habit",
    scoreRange: [8, 14],
    title: {
      en: "Mild Situational BFRB Habit (Stress-Triggered Picking/Pulling)",
      id: "Kebiasaan BFRB Situasional Ringan (Dipicu Stres atau Kebosanan)",
      de: "Milde situative BFRB-Angewohnheit (Stressbedingtes Zupfen/Kratzen)",
      fr: "Habitude BFRB Légère (Déclenchée par le Stress ou l'Ennui)",
      es: "Hábito BFRB Situacional Leve (Disparado por Estrés o Aburrimiento)",
    },
    badge: {
      en: "Mild BFRB Habit (20-39%)",
      id: "BFRB Ringan (20-39%)",
      de: "Milde Angewohnheit",
      fr: "Habitude Légère",
      es: "Hábito Leve",
    },
    summary: {
      en: "You engage in periodic skin picking, hair plucking, or cuticle biting, primarily during acute stress, intense concentration, or late-night boredom. While you may occasionally cause small scabs or soreness, the behavior does not dominate your day or cause severe social impairment.",
      id: "Kamu melakukan kebiasaan mengelupas kulit, mencabut rambut, atau menggigit kutikula sesekali, terutama saat stres kerja, konsentrasi tinggi, atau rasa bosan larut malam. Meski kadang menimbulkan bekas kecil atau perih, kebiasaan ini belum mendominasi harimu atau memicu isolasi sosial parah.",
      de: "Sie neigen bei erhöhtem Stress, Konzentration oder Langeweile zu gelegentlichem Zupfen oder Kratzen. Obwohl kleine Entzündungen entstehen können, beeinträchtigt die Gewohnheit Ihren Alltag noch nicht gravierend.",
      fr: "Vous touchez ou triturez votre peau ou vos cheveux lors de pics de tension ou de moments d'ennui. Bien que cela crée parfois de petites plaies, le comportement reste gérable et ne nuit pas lourdement à votre vie sociale.",
      es: "Manifiestas episodios ocasionales de pellizcado o tirón de pelo ante el estrés, la concentración intensa o el aburrimiento. Si bien deja pequeñas marcas, aún no condiciona de forma grave tu bienestar social.",
    },
    psychology: {
      en: "Azrin & Nunn's Habit Reversal Model (1973): The behavior operates as an unconscious self-soothing motor habit. Tactile stimulation provides dopamine and autonomic stabilization when the prefrontal cortex is depleted.",
      id: "Model Habit Reversal Azrin & Nunn (1973): Perilaku ini berjalan sebagai motorik penenang diri bawah sadar. Stimulasi rabaan memberikan dopamin dan menstabilkan sistem saraf otonom saat korteks prefrontal kelelahan.",
      de: "Azrin & Nunns Habit-Reversal-Modell: Die Handlung dient unbewusst als motorischer Spannungsregler bei kognitiver Erschöpfung.",
      fr: "Modèle de renversement des habitudes d'Azrin & Nunn : Ce geste agit comme un régulateur moteur inconscient de l'hyperexcitabilité nerveuse.",
      es: "Modelo de inversión de hábitos de Azrin y Nunn: El comportamiento opera como un mecanismo motor automático para modular la sobrecarga mental.",
    },
    actionProtocol: {
      en: [
        "Implement 'Competing Responses': As soon as your fingers begin scanning, clench your fists or cross your arms for 60 seconds until the urge crests.",
        "Keep tactile fidget toys (acupressure rings, textured stress stones) at your desk and couch to redirect idle finger movement.",
        "Apply thick barrier creams, hydrocolloid patches, or cotton gloves during high-risk times (e.g. evening screen time).",
      ],
      id: [
        "Gunakan 'Competing Response' (Respons Pengganti): Segera setelah jarimu mulai meraba kulit, kepalkan tanganmu atau lipat tangan di dada selama 60 detik hingga dorongan mereda.",
        "Sediakan mainan sensori taktil (cincin akupresur, batu tekstur, pop-it) di meja kerja dan kasur untuk mengalihkan jari.",
        "Pasang plester hidrokoloid (pimple patch) pada jerawat atau kenakan sarung tangan tipis saat jam rawan (nonton TV malam hari).",
      ],
      de: [
        "Konkurrierende Reaktion: Ballen Sie die Fäuste für 60 Sekunden, sobald die Finger unbewusst zu suchen beginnen.",
        "Taktile Fidget-Tools am Arbeitsplatz platzieren (Akupressur-Ringe, Knetmasse), um die Hände zu beschäftigen.",
        "Pflaster oder Schutzcremes an gefährdeten Stellen anbringen, um den taktilen Zugriff zu blockieren.",
      ],
      fr: [
        "Réaction concurrente : Serrez les poings fermement pendant 60 secondes dès que vos doigts commencent à explorer la zone.",
        "Placez des objets tactiles de substitution (anneaux d'acupression, pierres texturées) sur votre bureau.",
        "Appliquez des pansements hydrocolloïdes sur les imperfections pour créer une barrière physique immédiate.",
      ],
      es: [
        "Aplica la respuesta competitiva: Cierra los puños o cruza los brazos durante 60 segundos en cuanto sientas la tentación táctil.",
        "Ten a mano objetos sensoriales sustitutivos (anillos de acupresión, plastilina terapéutica) en tu escritorio.",
        "Coloca parches hidrocoloides en las imperfecciones para bloquear el acceso físico directo.",
      ],
    },
  },
  {
    level: "moderate_bfrb_compulsion",
    scoreRange: [15, 21],
    title: {
      en: "Moderate BFRB Compulsion (Noticeable Urge & Tissue Distress)",
      id: "Kompulsi BFRB Sedang (Dorongan Nyata & Kerusakan Kulit/Rambut)",
      de: "Moderate BFRB-Zwangsdynamik (Spürbarer Drang & Gewebeschäden)",
      fr: "Compulsion BFRB Modérée (Urgence Nette & Lésions Cutanées)",
      es: "Compulsión BFRB Moderada (Urgencia Evidente y Daño Tisular)",
    },
    badge: {
      en: "Moderate BFRB (40-59%)",
      id: "BFRB Sedang (40-59%)",
      de: "Moderates BFRB",
      fr: "BFRB Modéré",
      es: "BFRB Moderado",
    },
    summary: {
      en: "You experience frequent, intense tactile urges that lead to daily picking or pulling episodes. You find yourself spending 20–45 minutes trapped in front of mirrors or scanning your skin in a trance. Visible marks, redness, or thinning patches require daily camouflage, and you feel growing frustration over your inability to stop.",
      id: "Kamu mengalami dorongan taktil yang sering dan intens yang berujung pada episode mengelupas atau mencabut setiap hari. Kamu sering menghabiskan 20–45 menit terperangkap di depan cermin atau meraba kulit dalam kondisi melamun. Bekas luka, kemerahan, atau rambut rontok menuntut kamu memakai kamuflase harian, dan kamu merasa semakin frustrasi karena sulit berhenti.",
      de: "Sie erleben tägliche Zwangsimpulse, die zu 20 bis 45 Minuten langen Zupf- oder Kratzphasen führen. Sichtbare Wunden oder lichte Haarstellen erfordern tägliches Abdecken. Es wächst die Verzweiflung über den Kontrollverlust.",
      fr: "Vous subissez des pulsions tactiles quotidiennes entraînant des séances de 20 à 45 minutes devant le miroir. Les rougeurs, croûtes ou pertes de cheveux nécessitent un camouflage régulier et nourrissent une vive détresse.",
      es: "Experimentas impulsos diarios que desembocan en episodios de 20 a 45 minutos frente al espejo. Las heridas visibles o claros en el cabello te obligan a camuflarlos a diario, generando notable frustración e impotencia.",
    },
    psychology: {
      en: "Mansueto's Comprehensive Behavioral (ComB) Model: The behavior is fueled by a multi-modal loop of Sensory triggers (roughness), Cognitive beliefs ('I must smooth this out'), Affective states (anxiety/boredom), and Environmental cues (mirrors/bright bathroom lighting).",
      id: "Model Comprehensive Behavioral (ComB) Mansueto: Perilaku ini dipicu oleh lingkaran multi-modal antara pemicu Sensori (tekstur kasar), Kognitif ('aku harus meratakannya'), Afektif (cemas/bosan), dan Lingkungan (cermin pembesar/lampu kamar mandi terang).",
      de: "ComB-Modell nach Mansueto: Die Dynamik speist sich aus sensorischen Reizen (Krusten), kognitiven Antreibern ('Das muss glatt sein'), Affekten und Umweltbedingungen (Spiegel, Licht).",
      fr: "Modèle ComB de Mansueto : Le trouble est entretenu par l'interaction de déclencheurs sensoriels (rugosités), cognitifs (obsession de lisser), émotionnels et environnementaux (éclairage du miroir).",
      es: "Modelo ComB de Mansueto: El ciclo se retroalimenta de factores sensoriales (asperezas), pensamientos de perfección física, estados emocionales y facilitadores del entorno (espejos de aumento).",
    },
    actionProtocol: {
      en: [
        "Modify Environmental Cues: Remove magnifying mirrors, dim bathroom lighting, and place sticky notes on mirrors: 'Step back 3 feet. Skin is meant to have texture.'",
        "Introduce the 15-Minute Delay Strategy: When the urge strikes, write the time down and enforce a mandatory 15-minute delay while performing an alternative hand-intensive task (knitting, origami, typing).",
        "Practice Habit Reversal Training (HRT) Awareness: Keep an urge log tracking the time, place, emotion, and exact trigger of each episode.",
      ],
      id: [
        "Modifikasi Lingkungan: Singkirkan cermin pembesar, redupkan lampu kamar mandi, dan tempel stiker di cermin: 'Mundur 1 meter. Kulit manusia normal memang memiliki tekstur.'",
        "Terapkan Strategi Tunda 15 Menit: Saat dorongan datang, catat jamnya dan wajibkan menunda selama 15 menit sambil menyibukkan kedua tangan dengan aktivitas fisik (merajut, melipat origami, mengetik).",
        "Latihan Kesadaran HRT: Buat jurnal dorongan (urge log) untuk mencatat jam, lokasi, emosi, dan pemicu utama setiap kali keinginan muncul.",
      ],
      de: [
        "Umwelt anpassen: Vergrößerungsspiegel entsorgen, Badezimmerbeleuchtung dämpfen und Erinnerungszettel am Spiegel anbringen: 'Tritt einen Schritt zurück. Haut hat Poren.'",
        "Die 15-Minuten-Verzögerung: Schreiben Sie die Uhrzeit auf und verpflichten Sie sich, vor jedem Handeln 15 Minuten eine handfeste Alternativtätigkeit auszuüben.",
        "HRT-Wahrnehmungstraining: Führen Sie ein Protokoll über Ort, Uhrzeit, Gefühl und Auslöser jedes Zupf- oder Kratzimpulses.",
      ],
      fr: [
        "Modifier l'environnement : Bannissez les miroirs grossissants, tamisez l'éclairage de la salle de bain et collez un rappel : 'Recule d'un mètre. La peau n'est pas du plastique.'",
        "Stratégie de temporisation de 15 minutes : Imposez-vous un délai d'attente de 15 minutes avec une tâche manuelle avant d'autoriser tout geste.",
        "Entraînement à la prise de conscience (HRT) : Tenez un carnet de bord pour identifier les contextes précis où surgit l'impulsion.",
      ],
      es: [
        "Modifica el entorno: Retira los espejos de aumento, atenúa las luces directas y coloca un recordatorio: 'Da un paso atrás. La piel real tiene textura y poros'.",
        "Estrategia de postergación de 15 minutos: Cuando sientas el impulso, anota la hora y espera 15 minutos realizando una actividad manual intensa.",
        "Registro de conciencia (HRT): Anota en un cuaderno la hora, el lugar, la emoción previa y el disparador de cada episodio.",
      ],
    },
  },
  {
    level: "high_clinical_bfrb_cycle",
    scoreRange: [22, 28],
    title: {
      en: "High Clinical BFRB Cycle (Chronic Damage & Concealment Trap)",
      id: "Siklus BFRB Klinis Tinggi (Kerusakan Kronis & Perangkap Kamuflase)",
      de: "Hoher klinischer BFRB-Zyklus (Chronische Gewebeschäden & Schamfalle)",
      fr: "Cycle BFRB Clinique Élevé (Lésions Chroniques & Dissimulation)",
      es: "Ciclo BFRB Clínico Elevado (Daño Crónico y Trampa de Ocultamiento)",
    },
    badge: {
      en: "High Clinical BFRB (60-79%)",
      id: "BFRB Klinis Tinggi (60-79%)",
      de: "Klinisches BFRB",
      fr: "BFRB Clinique",
      es: "BFRB Clínico",
    },
    summary: {
      en: "Your life is significantly dictated by compulsive excoriation or trichotillomania. You spend hours each week engaged in trance-like picking or pulling marathons. Significant scarring, painful lesions, or noticeable bald spots cause severe emotional anguish, leading to elaborate camouflage rituals, avoidance of intimacy, and chronic self-loathing.",
      id: "Hidupmu sangat didikte oleh ekskoriasi (skin picking) atau trikotilomania kompulsif. Kamu menghabiskan waktu berjam-jam setiap minggu dalam maraton mengelupas atau mencabut tanpa sadar. Bekas luka parah, luka bernanah, atau area botak nyata memicu penderitaan batin mendalam, ritual makeup yang melelahkan, dan penghindaran hubungan dekat.",
      de: "Ihr Alltag wird massiv von Dermatillomanie oder Trichotillomanie bestimmt. Sie verbringen wöchentlich viele Stunden in tranceartigen Zupf-Marathons. Schmerzhafte Entzündungen, Narben oder kahle Stellen erfordern aufwendige Tarnung und führen zu sozialem Rückzug.",
      fr: "Votre quotidien est lourdement entravé par l'excoriation ou la trichotillomanie. Vous consacrez des heures chaque semaine à ces rituels destructeurs. Les cicatrices, lésions douloureuses ou zones dépilées génèrent une souffrance morale intense et un isolement protecteur.",
      es: "Tu vida diaria está fuertemente condicionada por la excoriación o la tricotilomanía compulsiva. Pasas horas a la semana atrapado en maratones de pellizcado o arrancamiento. Las marcas severas, heridas abiertas o calvas evidentes causan un profundo sufrimiento y aislamiento.",
    },
    psychology: {
      en: "Keuthen et al. Excoriation/Trichotillomania Clinical Spectrum: The disorder represents an automated affect-regulation loop where the brain uses physical pain and tactile grooming to ground itself against dissociated emotional distress, accompanied by secondary shame depression.",
      id: "Spektrum Klinis Ekskoriasi/Trikotilomania Keuthen et al.: Gangguan ini merepresentasikan lingkaran regulasi afek otomatis di mana otak memakai sensasi fisik untuk menenangkan disosiasi emosional, yang kemudian diikuti depresi akibat rasa malu sekunder.",
      de: "Keuthen et al.: Das Verhalten dient als dissoziativer Spannungsabbau. Schmerz und Tastreize regulieren emotionale Überlastung, gefolgt von einer sekundären Scham-Depression.",
      fr: "Recherches de Keuthen : Il s'agit d'un mécanisme d'apaisement dissociatif où la sensation cutanée ancre le cerveau face au trop-plein émotionnel, au prix d'une honte dévastatrice.",
      es: "Investigaciones de Keuthen et al.: El trastorno actúa como un regulador disociativo donde el dolor o el estímulo táctil anestesian la sobrecarga afectiva, desembocando en una depresión reactiva por culpa.",
    },
    actionProtocol: {
      en: [
        "Enforce Physical Barrier Protocols: Wear silicone finger cots, long sleeves, or gel manicures (which blunt nail edges, making picking physically impossible).",
        "Radical Self-Compassion Reframing: Replace 'I am disgusting and lack willpower' with 'My nervous system is attempting to regulate sensory overload through an outdated biological habit.'",
        "Stimulus-Control Bathroom Lockdown: Set a 3-minute timer on your phone whenever you enter the bathroom. When the alarm sounds, you must exit immediately regardless of what you see.",
        "Clinical Specialized Therapy: Seek a therapist certified in Habit Reversal Training (HRT) and Acceptance and Commitment Therapy (ACT) specialized in BFRBs.",
      ],
      id: [
        "Terapkan Protokol Penghalang Fisik: Gunakan pelindung jari silikon, pakaian lengan panjang, atau kuku gel tebal (gel manicure membuat ujung kuku tumpul sehingga mustahil mengelupas).",
        "Welas Asih Diri Radikal: Ganti kalimat 'Aku menjijikkan dan lemah' dengan 'Sistem sarafku sedang mencoba menenangkan kelebihan sensori melalui kebiasaan biologis lama.'",
        "Kunci Batas Kamar Mandi: Pasang alarm 3 menit di ponsel setiap kali masuk kamar mandi. Begitu alarm berbunyi, kamu wajib keluar detik itu juga apa pun yang terlihat di cermin.",
        "Terapi Klinis Spesialis: Cari psikolog klinis yang terlatih dalam Habit Reversal Training (HRT) dan ACT dengan spesialisasi BFRB.",
      ],
      de: [
        "Physische Barrieren: Silikon-Fingerkappen, dicke Gel-Nägel (stumpfe Kanten verunmöglichen das Greifen) oder Baumwollhandschuhe tragen.",
        "Mitgefühl statt Selbsthass: Verinnerlichen Sie: 'Mein Nervensystem sucht nach Entlastung, nicht nach Selbstzerstörung.'",
        "Badezimmer-Timer: Stellen Sie bei jedem Betreten des Bades einen 3-Minuten-Wecker. Bei Klingeln muss der Raum sofort verlassen werden.",
        "Spezialisierte Psychotherapie: Nehmen Sie Kontakt zu Therapeuten auf, die auf Habit-Reversal-Training (HRT) und BFRBs spezialisiert sind.",
      ],
      fr: [
        "Barrières physiques strictes : Portez des dés en silicone, des ongles en gel épais (bords émoussés empêchant la préhension) ou des pansements.",
        "Bienveillance radicale : Remplacez 'Je suis faible' par 'Mon système nerveux tente maladroitement d'apaiser une surcharge sensorielle'.",
        "Minuteur de salle de bain : Enclenchez un compte à rebours de 3 minutes à chaque entrée. À la sonnerie, sortez immédiatement.",
        "Thérapie spécialisée : Consultez un psychologue formé au modèle HRT (Habit Reversal Training) et à la thérapie ACT pour les BFRB.",
      ],
      es: [
        "Barreras físicas obligatorias: Usa dediles de silicona, uñas de gel gruesas (los bordes redondeados impiden pellizcar) o guantes ligeros.",
        "Compasión radical: Sustituye el autodesprecio por: 'Mi sistema nervioso intenta calmarse mediante un hábito sensorial automático'.",
        "Temporizador en el baño: Pon una alarma de 3 minutos al entrar al baño. Cuando suene, sal de inmediato sin importar lo que veas.",
        "Terapia clínica especializada: Acude a un psicólogo especialista en Entrenamiento en Inversión de Hábitos (HRT) y Terapia ACT para BFRB.",
      ],
    },
  },
  {
    level: "acute_severe_excoriation_trichotillomania",
    scoreRange: [29, 36],
    title: {
      en: "Acute Severe BFRB Damage (Compulsive Dissociative Crisis)",
      id: "Krisis BFRB Berat & Akut (Disosiasi Kompulsif & Kerusakan Parah)",
      de: "Akutes schweres BFRB (Dissoziative Zwangskrise)",
      fr: "Crise BFRB Sévère Aiguë (Dissociation Compulsive & Dégâts Majeurs)",
      es: "Crisis BFRB Severa y Aguda (Disociación Compulsiva y Daño Masivo)",
    },
    badge: {
      en: "Acute Severe BFRB (80-100%)",
      id: "BFRB Berat Akut (80-100%)",
      de: "Akutes BFRB",
      fr: "Crise BFRB Aiguë",
      es: "BFRB Severo Agudo",
    },
    summary: {
      en: "You are caught in a severe, agonizing BFRB spiral. Hours of daily trance-picking or hair-pulling have resulted in extensive open sores, infections, significant alopecia, or bleeding tissue. The profound psychological burden, unbearable shame, and terror of being exposed have triggered intense social isolation and depression.",
      id: "Kamu terjebak dalam pusaran BFRB yang sangat berat dan menyiksa. Sesi mengelupas atau mencabut rambut selama berjam-jam setiap hari telah menyebabkan luka terbuka yang luas, infeksi kulit, kebotakan parah, atau pendarahan. Beban mental yang luar biasa, rasa malu yang menyiksa, dan ketakutan ketahuan orang lain telah memicu isolasi sosial total dan depresi berat.",
      de: "Sie befinden sich in einer quälenden BFRB-Krise. Stundenlanges Zupfen oder Kratzen hat zu großflächigen offenen Wunden, Entzündungen oder massivem Haarverlust geführt. Die extreme Scham und Verzweiflung haben Sie in die soziale Isolation und Depression getrieben.",
      fr: "Vous traversez une crise aiguë et destructrice de BFRB. Des heures quotidiennes de transe ont causé d'importantes plaies ouvertes, des infections ou une alopécie sévère. La honte dévastatrice et la peur du regard des autres vous enferment dans une profonde dépression.",
      es: "Te encuentras atrapado en una espiral aguda y desgarradora de BFRB. Horas diarias de trance han provocado extensas heridas abiertas, infecciones o calvas notorias. La intensa vergüenza y el pavor a ser descubierto te han sumido en un aislamiento social severo.",
    },
    psychology: {
      en: "Clinical excoriation disorder and trichotillomania (DSM-5 / ICD-11 OCD & Related Disorders spectrum) characterized by complete executive control failure during trance states. Neurochemical imbalances in dopamine and serotonin pathways require multi-modal medical and psychological intervention.",
      id: "Gangguan ekskoriasi klinis dan trikotilomania (Spektrum Gangguan Terkait OCD DSM-5 / ICD-11) yang ditandai dengan kegagalan total kontrol eksekutif selama kondisi trans. Ketidakseimbangan neurokimiawi jalur dopamin dan serotonin memerlukan intervensi medis dan psikologis terpadu.",
      de: "Schweres klinisches Spektrum nach DSM-5/ICD-11: Vollständiger Zusammenbruch der Impulskontrolle in Trancezuständen. Erfordert interdisziplinäre dermatologische und psychotherapeutische Unterstützung.",
      fr: "Trouble sévère selon le DSM-5 / CIM-11 : Rupture totale du contrôle exécutif en état de transe. Nécessite une prise en charge médicale (dermatologique/psychiatrique) et psychologique conjointe.",
      es: "Trastorno clínico severo según DSM-5/CIE-11: Colapso del control inhibitorio en estados de trance. Requiere atención coordinada entre dermatología, psiquiatría y psicoterapia cognitivo-conductual.",
    },
    actionProtocol: {
      en: [
        "Immediate Medical Wound Care: Clean and dress all open lesions with antibiotic ointment, hydrocolloid dressings, and seek dermatological treatment if infections, swelling, or systemic fever are present.",
        "Emergency Sensory Grounding: When entering a trance, plunge your hands into ice-cold water, apply ice packs to targeted areas, or hold a frozen orange to provide intense, non-destructive shock stimulation.",
        "Break the Solitary Isolation: Tell one trusted physician, friend, or partner. Secrecy and concealment are the primary fuel that keeps BFRBs alive; vocalizing your struggle instantly cuts through the shame.",
        "Comprehensive Clinical Care: Consult a psychiatrist or psychologist specializing in OCD-spectrum disorders. Evidence-based interventions include N-acetylcysteine (NAC) supplementation (under medical supervision) and specialized HRT/ComB therapy.",
      ],
      id: [
        "Perawatan Medis Luka Segera: Bersihkan dan rawat luka terbuka dengan salep antibiotik dan perban hidrokoloid. Segera ke dokter jika ada tanda infeksi bernanah, bengkak, atau demam.",
        "Stimulasi Sensori Darurat: Saat merasa mulai masuk ke kondisi trans, celupkan tanganmu ke dalam air es beku, tempelkan kompres es ke area kulit yang ditargetkan, atau genggam buah beku untuk memicu kejut sensori yang aman.",
        "Buka Rahasiamu pada Orang Tepercaya: Ceritakan pergulatanmu pada satu orang tepercaya (dokter, pasangan, atau sahabat). Rasa malu dan kerahasiaan adalah bahan bakar utama yang membesarkan BFRB.",
        "Perawatan Klinis Terpadu: Konsultasikan ke psikiater atau psikolog klinis spesialis spektrum OCD. Bukti ilmiah mendukung terapi ComB, HRT, dan suplemen N-acetylcysteine (NAC) di bawah pengawasan dokter.",
      ],
      de: [
        "Medizinische Wundversorgung: Wunden desinfizieren, mit Wundsalbe und sterilen Verbänden versorgen; bei Entzündungen umgehend einen Hautarzt aufsuchen.",
        "Sensorischer Notfall-Stopp: Hände in Eiswasser tauchen oder Kühlpads auflegen, um das Nervensystem durch intensive Kälte aus der Trance zu reißen.",
        "Das Schweigen brechen: Vertrauen Sie sich einer Person an. Heimlichkeit und Scham sind das Lebenselixier dieser Störung; Offenheit entlastet sofort.",
        "Facharzt-Konsultation: Stellen Sie sich bei einem Psychiater oder Psychotherapeuten vor (Prüfung von N-Acetylcystein / NAC und gezieltem HRT-Training).",
      ],
      fr: [
        "Soins médicaux immédiats : Désinfectez les plaies, appliquez des pansements cicatrisants et consultez un dermatologue en cas de surinfection.",
        "Choc sensoriel d'urgence : Plongez vos mains dans de l'eau glacée ou appliquez une poche de froid pour interrompre immédiatement l'état de transe.",
        "Briser le tabou : Confiez-vous à un proche bienveillant ou à un soignant. La dissimulation est le moteur secret qui alimente le trouble.",
        "Prise en charge spécialisée : Consultez un psychiatre ou un psychologue clinicien expert des TOC et troubles apparentés (évaluation de la N-acétylcystéine / NAC et thérapie ComB).",
      ],
      es: [
        "Atención médica prioritaria: Desinfecta las heridas, aplica pomadas antibióticas y acude a un dermatólogo si hay signos de infección o celulitis.",
        "Choque sensorial de emergencia: Sumerge las manos en agua con hielo o aplica compresas frías en la zona para quebrar el trance sensorial.",
        "Rompe el secretismo: Compártelo con una persona de confianza o tu médico. El ocultamiento alimenta el ciclo destructivo de la culpa.",
        "Tratamiento clínico integral: Acude a un psiquiatra o psicólogo clínico especializado en el espectro obsesivo (evaluación de N-acetilcisteína / NAC y terapia HRT/ComB).",
      ],
    },
  },
];

export const BFRB_SUBSCALE_INFO = {
  sensory_urge_tension: {
    name: {
      en: "Sensory Urge & Tactile Tension",
      id: "Dorongan Sensori & Ketegangan Taktil",
      de: "Sensorischer Drang & Taktile Spannung",
      fr: "Pulsion Sensorielle & Tension Tactile",
      es: "Urgencia Sensorial y Tensión Táctil",
    },
    description: {
      en: "Bodily tingling, urge intensity, tactile scanning for rough spots, and physical craving prior to picking or pulling.",
      id: "Sensasi kesemutan tubuh, intensitas dorongan meraba tekstur kasar, dan ketegangan fisik sebelum mengelupas atau mencabut.",
      de: "Körperliches Kribbeln, Drangintensität, taktiles Abtasten nach Unebenheiten und körperliche Unruhe vor der Handlung.",
      fr: "Fourmillements corporels, besoin de palper les irrégularités cutanées et tension physique précédant le passage à l'acte.",
      es: "Cosquilleo corporal, exploración táctil de asperezas e intensa necesidad física previa al pellizcado o tirón.",
    },
  },
  automatic_vs_focused_compulsion: {
    name: {
      en: "Automatic vs. Focused Compulsion",
      id: "Kompulsi Otomatis & Ritual Cermin",
      de: "Automatische & Fokussierte Zwangshandlung",
      fr: "Compulsion Automatique & Rituels Ciblés",
      es: "Compulsión Automática y Rituales de Espejo",
    },
    description: {
      en: "Trance-like automatic picking while distracted vs. hyper-focused mirror sessions inspecting pores and hairs for hours.",
      id: "Mengelupas otomatis saat melamun/menatap layar vs. sesi fokus berlama-lama di depan cermin membedah pori atau rambut.",
      de: "Gedankenverlorenes Kratzen bei Ablenkung vs. stundenlange fokussierte Rituale mit Pinzette vor dem Spiegel.",
      fr: "Transe automatique devant un écran vs séances d'extraction méticuleuses et prolongées face au miroir.",
      es: "Pellizcado automático distraído frente a pantallas vs sesiones minuciosas y prolongadas con pinzas ante el espejo.",
    },
  },
  shame_tissue_damage_concealment: {
    name: {
      en: "Shame, Tissue Damage & Concealment",
      id: "Kerusakan Fisik, Rasa Malu & Kamuflase",
      de: "Gewebeschäden, Scham & Verbergen",
      fr: "Lésions Cutanées, Honte & Dissimulation",
      es: "Daño Físico, Vergüenza y Camuflaje",
    },
    description: {
      en: "Visible sores, bleeding, alopecia patches, elaborate makeup/clothing camouflage, social avoidance, and acute self-blame.",
      id: "Luka berdarah, kebotakan sebagian, ritual makeup tebal, menghindari interaksi sosial, dan rasa jijik pada diri sendiri.",
      de: "Offene Wunden, kahle Stellen, aufwendiges Überschminken, Vermeidung sozialer Kontakte und lähmende Selbstvorwürfe.",
      fr: "Plaies ouvertes, alopécie, rituels de maquillage élaborés, évitement des activités sociales et culpabilité étouffante.",
      es: "Heridas abiertas, zonas despobladas, camuflaje diario con maquillaje o prendas, aislamiento social y culpa profunda.",
    },
  },
};

export function getBfrbResult(totalScore: number): BfrbResultLevel {
  const clamped = Math.max(0, Math.min(36, totalScore));
  return (
    BFRB_RESULTS.find(
      (r) => clamped >= r.scoreRange[0] && clamped <= r.scoreRange[1]
    ) || BFRB_RESULTS[0]
  );
}

export function calculateBfrbSubscales(answers: Record<number, number>): {
  sensory_urge_tension: number;
  automatic_vs_focused_compulsion: number;
  shame_tissue_damage_concealment: number;
} {
  let sut = 0;
  let afc = 0;
  let sdc = 0;

  BFRB_QUESTIONS.forEach((q) => {
    const score = answers[q.id] ?? 0;
    if (q.subscale === "sensory_urge_tension") sut += score;
    if (q.subscale === "automatic_vs_focused_compulsion") afc += score;
    if (q.subscale === "shame_tissue_damage_concealment") sdc += score;
  });

  return {
    sensory_urge_tension: sut,
    automatic_vs_focused_compulsion: afc,
    shame_tissue_damage_concealment: sdc,
  };
}
