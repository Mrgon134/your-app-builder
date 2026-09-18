export type ThanatophobiaCardLang = "en" | "id" | "de" | "fr" | "es";

export interface ThanatophobiaQuestion {
  id: number;
  subscale:
    | "existential_annihilation_dread"
    | "symbolic_immortality_striving"
    | "mortality_salience_paralysis";
  text: Record<ThanatophobiaCardLang, string>;
}

export interface ThanatophobiaResultLevel {
  level:
    | "peaceful_mortality_acceptance"
    | "mild_existential_awareness"
    | "moderate_thanatophobic_tension"
    | "severe_death_anxiety_panic"
    | "acute_annihilation_terror";
  scoreRange: [number, number];
  title: Record<ThanatophobiaCardLang, string>;
  badge: Record<ThanatophobiaCardLang, string>;
  summary: Record<ThanatophobiaCardLang, string>;
  psychology: Record<ThanatophobiaCardLang, string>;
  actionProtocol: Record<ThanatophobiaCardLang, string[]>;
}

export const THANATOPHOBIA_QUESTIONS: ThanatophobiaQuestion[] = [
  // 1. Existential Annihilation Dread
  {
    id: 1,
    subscale: "existential_annihilation_dread",
    text: {
      en: "As I fall asleep or wake in the middle of the night, a sudden visceral terror strikes me: 'One day I will literally cease to exist.'",
      id: "Saat hendak tidur atau terbangun tengah malam, kepanikan mendalam tiba-tiba menyengat: 'Suatu hari nanti aku benar-benar akan tiada.'",
      de: "Beim Einschlafen oder nachts überfällt mich plötzliche Panik: 'Eines Tages werde ich buchstäblich aufhören zu existieren.'",
      fr: "En m'endormant ou au milieu de la nuit, une terreur viscérale me saisit : 'Un jour, je cesserai littéralement d'exister.'",
      es: "Al quedarme dormido o en mitad de la noche, un pánico visceral me golpea: 'Algún día dejaré de existir para siempre.'",
    },
  },
  // 2. Symbolic Immortality Striving
  {
    id: 2,
    subscale: "symbolic_immortality_striving",
    text: {
      en: "I feel an obsessive pressure to build a monumental career, accumulate wealth, or create enduring works so that my name is never forgotten.",
      id: "Aku merasakan dorongan obsesif untuk membangun karier gemilang atau warisan abadi agar namaku tidak pernah dilupakan setelah mati.",
      de: "Ich spüre einen zwanghaften Druck, etwas Großes zu schaffen oder Vermögen anzuhäufen, damit mein Name niemals vergessen wird.",
      fr: "Je ressens une pression obsessionnelle de bâtir une carrière grandiose pour que mon nom ne soit jamais oublié après ma mort.",
      es: "Siento una presión obsesiva por construir una gran carrera o dejar un legado permanente para que mi nombre jamás sea olvidado.",
    },
  },
  // 3. Mortality Salience Paralysis
  {
    id: 3,
    subscale: "mortality_salience_paralysis",
    text: {
      en: "I constantly monitor subtle bodily sensations (heart rate, breathing, minor twitches) with dread that they signal a hidden, fatal illness.",
      id: "Aku terus-menerus memantau detak jantung atau sensasi fisik kecil dengan ketakutan bahwa itu tanda penyakit mematikan yang tersembunyi.",
      de: "Ich überwache ständig minimale Körpersignale (Puls, Atmung) aus Angst, sie könnten Vorboten einer tödlichen Krankheit sein.",
      fr: "Je surveille constamment mes sensations corporelles (pouls, respiration) avec l'angoisse qu'elles annoncent une maladie mortelle.",
      es: "Monitoreo constantemente mis sensaciones corporales (pulso, respiración) con el temor de que anuncien una enfermedad mortal.",
    },
  },
  // 4. Existential Annihilation Dread
  {
    id: 4,
    subscale: "existential_annihilation_dread",
    text: {
      en: "The thought of eternity passing without my consciousness or awareness leaves me dizzy, breathless, or feeling claustrophobic in my own skull.",
      id: "Membayangkan keabadian alam semesta yang terus berjalan tanpa kesadaranku membuatku pusing, sesak napas, atau merasa claustrophobic.",
      de: "Der Gedanke an die Ewigkeit ohne mein Bewusstsein erzeugt Schwindel, Atemnot oder ein beklemmendes Gefühl im eigenen Kopf.",
      fr: "La pensée de l'éternité s'écoulant sans ma conscience me donne le vertige et me coupe le souffle.",
      es: "La idea de una eternidad transcurriendo sin mi consciencia me provoca mareo, falta de aire o angustia opresiva.",
    },
  },
  // 5. Symbolic Immortality Striving
  {
    id: 5,
    subscale: "symbolic_immortality_striving",
    text: {
      en: "I find it nearly impossible to rest or enjoy the present because I feel the clock ticking away my brief, precious window of existence.",
      id: "Aku merasa hampir mustahil beristirahat santai karena terus mendengar detak jam yang menghabisi jendela hidupku yang sangat singkat.",
      de: "Ich kann kaum entspannen, weil ich permanent die Lebensuhr ticken höre, die meine kostbare verbleibende Zeit vernichtet.",
      fr: "Je n'arrive pas à me reposer car j'entends le compte à rebours de mon existence s'écouler inexorablement.",
      es: "Me resulta casi imposible descansar porque siento el reloj devorando mi breve ventana de existencia.",
    },
  },
  // 6. Mortality Salience Paralysis
  {
    id: 6,
    subscale: "mortality_salience_paralysis",
    text: {
      en: "During moments of profound happiness or love, a dark shadow creeps in: 'This person and I will both be corpses one day, and this will end.'",
      id: "Di tengah momen bahagia atau penuh cinta, bayangan kelam menyusup: 'Suatu hari aku dan pasanganku akan menjadi mayat, dan semua ini berakhir.'",
      de: "In glücklichen Momenten überfällt mich der Gedanke: 'Eines Tages sind wir beide tot und all das hier ist ausgelöscht.'",
      fr: "Dans les moments de grand bonheur, une ombre me dit : 'Un jour, nous serons des cadavres et tout cela sera anéanti.'",
      es: "En momentos de felicidad o amor, una sombra oscura me recuerda: 'Algún día seremos cadáveres y todo esto se habrá acabado.'",
    },
  },
  // 7. Existential Annihilation Dread
  {
    id: 7,
    subscale: "existential_annihilation_dread",
    text: {
      en: "I go out of my way to avoid cemeteries, funerals, medical shows, or news stories about death because they trigger days of anxiety spirals.",
      id: "Aku sengaja menghindari pemakaman, rumah duka, atau berita kematian karena itu bisa memicu spiral kecemasan berhari-hari.",
      de: "Ich meide Friedhöfe, Beerdigungen oder Berichte über Todeseintritte, weil sie tagelange Panikspiralen auslösen.",
      fr: "J'évite soigneusement les cimetières, les enterrements ou les récits de décès car ils déclenchent des jours d'angoisse.",
      es: "Evito cementerios, funerales o noticias sobre la muerte porque me provocan espirales de angustia durante días.",
    },
  },
  // 8. Symbolic Immortality Striving
  {
    id: 8,
    subscale: "symbolic_immortality_striving",
    text: {
      en: "I hoard resources, status symbols, or insurance policies as an unconscious psychological fortress against the reality of human vulnerability.",
      id: "Aku menimbun harta, status sosial, atau asuransi sebagai benteng psikologis bawah sadar untuk menyangkal kerapuhan manusia.",
      de: "Ich häufe Sicherheiten, Statussymbole oder Verträge an, als unbewusste Festung gegen die eigene Verwundbarkeit.",
      fr: "J'accumule biens et statuts comme une forteresse inconsciente pour conjurer la vulnérabilité humaine.",
      es: "Acumulo recursos, estatus o pólizas de seguro como una fortaleza inconsciente para negar la fragilidad humana.",
    },
  },
  // 9. Mortality Salience Paralysis
  {
    id: 9,
    subscale: "mortality_salience_paralysis",
    text: {
      en: "Thinking about my own mortality drains my motivation to work or study: 'What is the point of striving if everyone turns to dust anyway?'",
      id: "Memikirkan kematian mengikis motivasiku untuk berjuang: 'Untuk apa berusaha keras jika pada akhirnya semua manusia jadi debu?'",
      de: "Der Gedanke an die eigene Vergänglichkeit raubt mir jeglichen Antrieb: 'Wozu der Aufwand, wenn am Ende alles zerfällt?'",
      fr: "Penser à ma finitude sape ma motivation : 'À quoi bon faire tant d'efforts si nous finissons tous en poussière ?'",
      es: "Pensar en mi mortalidad destruye mi motivación: '¿Para qué esforzarse tanto si al final todos seremos polvo?'",
    },
  },
  // 10. Existential Annihilation Dread
  {
    id: 10,
    subscale: "existential_annihilation_dread",
    text: {
      en: "The awareness of aging (gray hairs, wrinkles, birthdays passing) triggers acute dread rather than celebratory pride.",
      id: "Tanda-tanda penuaan (rambut memutih, kerutan, bertambahnya usia) memicu ketakutan mendalam, bukan perayaan rasa syukur.",
      de: "Anzeichen des Alterns (graue Haare, Geburtstage) lösen akutes Entsetzen aus statt reifer Gelassenheit.",
      fr: "Les signes du vieillissement (cheveux gris, anniversaires qui passent) m'inspirent une vive angoisse plutôt que de la sérénité.",
      es: "Las señales de envejecimiento (canas, arrugas, cumpleaños) me causan pavor en lugar de serenidad o celebración.",
    },
  },
  // 11. Symbolic Immortality Striving
  {
    id: 11,
    subscale: "symbolic_immortality_striving",
    text: {
      en: "I obsess over extreme longevity hacks, anti-aging routines, or cryonics out of an existential refusal to accept biological limits.",
      id: "Aku terobsesi dengan tips panjang umur ekstrem, perawatan antipenuaan, atau teknologi masa depan demi menolak batasan biologis manusia.",
      de: "Ich beschäftige mich exzessiv mit Langlebigkeit und Anti-Aging, aus existentieller Weigerung, biologische Grenzen zu akzeptieren.",
      fr: "Je m'intéresse de façon obsessionnelle aux astuces de longévité extrême par refus d'accepter ma finitude biologique.",
      es: "Me obsesiono con dietas extremas de longevidad o antienvejecimiento por una negativa existencial a aceptar mis límites biológicos.",
    },
  },
  // 12. Mortality Salience Paralysis
  {
    id: 12,
    subscale: "mortality_salience_paralysis",
    text: {
      en: "I experience intense guilt or panic if I feel I have 'wasted' a single hour or day of my finite lifespan.",
      id: "Aku merasa sangat bersalah dan panik jika merasa telah 'menyia-nyiakan' satu jam atau satu hari dari jatah hidupku yang terbatas.",
      de: "Ich empfinde quälende Schuldgefühle, wenn ich auch nur eine einzige Stunde meines endlichen Lebens 'verschwendet' habe.",
      fr: "Je ressens une culpabilité aiguë à l'idée d'avoir 'gaspillé' ne serait-ce qu'une heure de ma vie éphémère.",
      es: "Siento una culpa y angustia intensas si percibo que he 'desperdiciado' una sola hora de mi tiempo finito en la tierra.",
    },
  },
];

export const THANATOPHOBIA_RESULTS: ThanatophobiaResultLevel[] = [
  {
    level: "peaceful_mortality_acceptance",
    scoreRange: [0, 8],
    title: {
      en: "Peaceful Mortality Acceptance (Integrated Finitude)",
      id: "Penerimaan Kematian Damai (Finitude Terintegrasi)",
      de: "Friedliche Sterblichkeitsakzeptanz (Integrierte Endlichkeit)",
      fr: "Acceptation Sereine de la Finitude",
      es: "Aceptación Serena de la Finitud",
    },
    badge: {
      en: "Integrated Finitude",
      id: "Penerimaan Damai",
      de: "Integrierte Endlichkeit",
      fr: "Finitude Intégrée",
      es: "Finitud Integrada",
    },
    summary: {
      en: "You have achieved a rare and mature psychological integration of mortality. You recognize death as the natural boundary that gives human moments their sweetness, urgency, and depth without inducing panic.",
      id: "Kamu telah mencapai integrasi psikologis yang matang terhadap kematian. Kamu memandang kematian sebagai batas alami yang justru memberi keindahan, urgensi, dan makna mendalam pada setiap detik kehidupan.",
      de: "Sie haben eine reife seelische Integration der Sterblichkeit erreicht. Die Endlichkeit verleiht Ihrem Leben Tiefe und Kostbarkeit, ohne Panik auszulösen.",
      fr: "Vous avez intégré votre finitude avec maturité. Vous reconnaissez la mort comme la frontière qui donne toute sa valeur au présent.",
      es: "Has alcanzado una madurez psicológica admirable frente a la finitud. Reconoces la muerte como el límite que dota de belleza y valor a cada instante.",
    },
    psychology: {
      en: "In Dr. Irvin Yalom's existential psychotherapy, you understand that 'though the physicality of death destroys man, the idea of death saves him.' Awareness of finitude enriches your present relationships rather than paralyzing them.",
      id: "Dalam psikoterapi eksistensial Dr. Irvin Yalom: 'Meskipun kematian fisik menghancurkan manusia, gagasan tentang kematian menyelamatkan jiwanya.' Kesadaran ini memperkaya kualitas hubunganmu.",
      de: "Frei nach Dr. Irvin Yalom: Der Gedanke an den Tod rettet den Menschen, indem er ihn ins authentische Leben ruft.",
      fr: "Selon Irvin Yalom, l'idée de la mort nous réveille et nous ancre dans l'authenticité de chaque instant.",
      es: "Como escribió Irvin Yalom: aunque la muerte física destruye al hombre, la idea de la muerte salva su vida de la superficialidad.",
    },
    actionProtocol: {
      en: [
        "Continue practicing intentional presence and gratitude for fleeting daily moments.",
        "Share your calm, grounded perspective with loved ones who wrestle with existential dread.",
        "Reflect on life values regularly in private voice journaling.",
      ],
      id: [
        "Terus nikmati kehadiran penuh dan rasa syukur atas setiap momen kecil.",
        "Bagikan perspektif tenang ini kepada sahabat yang sedang bergulat dengan ketakutan eksistensial.",
        "Rawat keselarasan nilai hidup secara rutin lewat jurnal suara pribadi.",
      ],
      de: [
        "Pflegen Sie weiterhin Achtsamkeit und Dankbarkeit für das Hier und Jetzt.",
        "Schenken Sie Mitmenschen mit existenziellen Ängsten Halt durch Ihre Gelassenheit.",
        "Nutzen Sie Selbstreflexion zur Vertiefung Ihrer Lebensfreude.",
      ],
      fr: [
        "Cultivez la gratitude quotidienne pour les instants éphémères.",
        "Apportez votre sérénité à ceux qui traversent des crises existentielles.",
        "Utilisez le journal vocal pour ancrer vos choix de vie.",
      ],
      es: [
        "Sigue practicando la presencia plena y el agradecimiento cotidiano.",
        "Brinda tu serenidad a quienes atraviesan angustia existencial.",
        "Usa el diario íntimo para cultivar la autenticidad.",
      ],
    },
  },

  {
    level: "mild_existential_awareness",
    scoreRange: [9, 16],
    title: {
      en: "Mild Existential Sensitivity",
      id: "Sensitivitas Eksistensial Ringan",
      de: "Leichte Existenzielle Sensibilität",
      fr: "Sensibilité Existentielle Légère",
      es: "Sensibilidad Existencial Leve",
    },
    badge: {
      en: "Conscious Thinker",
      id: "Pemikir Sadar",
      de: "Bewusster Denker",
      fr: "Conscience Aiguë",
      es: "Pensador Lúcido",
    },
    summary: {
      en: "You experience periodic flashes of mortality awareness, particularly during late nights, milestone birthdays, or family illness. While these thoughts can feel unsettling, they do not chronically impede your daily functioning.",
      id: "Kamu mengalami kilatan kecemasan kematian sesekali, terutama saat larut malam, ulang tahun penting, atau ketika ada kerabat sakit. Meskipun mengusik, ini belum mengganggu fungsi hidup sehari-hari.",
      de: "Sie erleben gelegentliche Anflüge von Vergänglichkeitsangst, besonders nachts oder bei runden Geburtstagen. Dies beeinträchtigt Ihren Alltag jedoch kaum.",
      fr: "Vous ressentez des éclairs passagers d'angoisse de mort, la nuit ou lors de dates clés, sans que cela n'entrave vos journées.",
      es: "Experimentas destellos ocasionales de angustia ante la muerte, en noches solitarias o cumpleaños, sin paralizar tu vida cotidiana.",
    },
    psychology: {
      en: "Terror Management Theory (TMT) shows that healthy individuals naturally use subtle cultural and psychological buffers to manage mortality salience. Your defense systems operate smoothly with occasional healthy awakening calls.",
      id: "Terror Management Theory (TMT) menunjukkan bahwa otak manusia wajar menggunakan perisai budaya dan makna untuk meredam kecemasan kematian tanpa memicu kepanikan.",
      de: "Ihre psychologischen Schutzmechanismen federn die Konfrontation mit der Endlichkeit gut ab.",
      fr: "Vos défenses psychologiques régulent efficacement les rappels de la mortalité.",
      es: "Tus defensas psicológicas amortiguan adecuadamente la conciencia de finitud.",
    },
    actionProtocol: {
      en: [
        "When bedtime mortality thoughts strike, ground yourself in biological senses: feel the weight of your blanket and slow your exhale.",
        "Channel the awareness of limited time into creative projects rather than late-night doom-scrolling.",
        "Voice existential musings into Nuju to release the cognitive pressure safely.",
      ],
      id: [
        "Saat pikiran kematian datang menjelang tidur, bawa kesadaran ke tubuh fisik: rasakan beratnya selimut dan hembuskan napas panjang.",
        "Salurkan kesadaran waktu yang terbatas ke karya kreatif daripada doom-scrolling tengah malam.",
        "Curahkan renungan eksistensial ke jurnal suara Nuju untuk melepaskan beban di dada.",
      ],
      de: [
        "Nutzen Sie somatisches Grounding beim nächtlichen Grübeln: Schwere der Decke spüren.",
        "Verwandeln Sie Zeitbewusstsein in schöpferische Energie.",
        "Sprechen Sie existenzielle Gedanken in das Nuju Sprachjournal ein.",
      ],
      fr: [
        "Pratiquez l'ancrage corporel au coucher : sentez le poids du drap et ralentissez le souffle.",
        "Convertissez cette lucidité en créativité vivante.",
        "Déposez vos vertiges nocturnes dans le journal vocal Nuju.",
      ],
      es: [
        "Ante la angustia nocturna, siente el peso de la manta y alarga la exhalación.",
        "Canaliza la finitud hacia proyectos significativos.",
        "Graba tus reflexiones existenciales en el diario seguro de Nuju.",
      ],
    },
  },

  {
    level: "moderate_thanatophobic_tension",
    scoreRange: [17, 24],
    title: {
      en: "Moderate Thanatophobic Tension",
      id: "Ketegangan Thanatophobia Sedang",
      de: "Moderate Thanatophobische Anspannung",
      fr: "Tension Thanatophobique Modérée",
      es: "Tensión Tanatofóbica Moderada",
    },
    badge: {
      en: "Mortality Strain",
      id: "Beban Kematian",
      de: "Sterblichkeitsdruck",
      fr: "Angoisse de Mort",
      es: "Presión de Finitud",
    },
    summary: {
      en: "Death anxiety is an active disruptor in your life. You frequently struggle with bedtime dread, monitor bodily symptoms for fatal illnesses, or obsessively overwork to build a legacy that outlasts your biology.",
      id: "Kecemasan kematian mulai mengganggu kualitas hidupmu. Kamu kerap bergulat dengan teror sebelum tidur, cemas berlebihan terhadap gejala fisik, atau gila kerja demi membangun peninggalan abadi.",
      de: "Todesangst beeinträchtigt spürbar Ihre Lebensqualität. Sie leiden unter Einschlafpanik, kontrollieren Körpersymptome oder verfallen in hektischen Aktionismus.",
      fr: "L'angoisse de mort perturbe votre quotidien : insomnies anxieuses, surveillance hypocondriaque du corps et course effrénée à la réussite.",
      es: "La tanatofobia altera tu bienestar: sufres pánicos al dormir, hipervigilancia médica de tu cuerpo y una búsqueda compulsiva de permanencia.",
    },
    psychology: {
      en: "Dr. Irvin Yalom observed that death anxiety frequently disguises itself as hypochondria or workaholism. The underlying dread is not just physical cessation, but the fear of dying having never lived authentically.",
      id: "Dr. Irvin Yalom mengamati bahwa ketakutan kematian sering menyamar menjadi hipokondria atau gila kerja. Akar ketakutan sesungguhnya bukan sekadar mati, melainkan mati sebelum sempat hidup autentik.",
      de: "Dr. Irvin Yalom zeigte: Todesangst maskiert sich oft als Hypochondrie oder Arbeitswut. Die eigentliche Furcht gilt einem ungelebten Leben.",
      fr: "L'angoisse de mort se déguise souvent en hypocondrie ou surmenage. On craint moins de mourir que d'avoir manqué sa vraie vie.",
      es: "Irvin Yalom descubrió que la tanatofobia suele disfrazarse de hipocondría o adicción al trabajo: el pánico real es morir sin haber vivido de verdad.",
    },
    actionProtocol: {
      en: [
        "Examine Unlived Life: Ask yourself Yalom's diagnostic question: 'What authentic desire or truth am I putting off out of fear?'",
        "Limit Health Hypervigilance: Stop googling minor symptoms; it feeds the amygdala's death loop.",
        "Unload Sleep-Onset Panic into Nuju: When the night panic hits, whisper your fears into Nuju's encrypted audio vault to drain the adrenaline.",
      ],
      id: [
        "Evaluasi Hidup yang Tertunda: Tanyakan pertanyaan Dr. Yalom: 'Kebenaran atau keinginan autentik apa yang selama ini kutunda karena takut?'",
        "Batasi Cek Gejala Medis: Hentikan mencari penyakit di internet saat merasakan kedutan kecil.",
        "Keluarkan Teror Menjelang Tidur di Nuju: Bicaralah ke jurnal suara terenkripsi Nuju saat panik malam datang agar adrenalin segera turun.",
      ],
      de: [
        "Fragen Sie sich mit Yalom: 'Welches ungelebte Leben bedauere ich am meisten?'",
        "Stoppen Sie medizinisches Googeln von Symptomen konsequent.",
        "Sprechen Sie Einschlafpanik in den Nuju-Audiosafe, um das Adrenalin abzubauen.",
      ],
      fr: [
        "Interrogez votre vie inachevée : quel désir authentique repoussez-vous ?",
        "Cessez de chercher vos symptômes sur internet.",
        "Confiez votre angoisse nocturne au journal vocal chiffré de Nuju.",
      ],
      es: [
        "Pregúntate con Yalom: ¿Qué parte auténtica de mi vida estoy postergando?",
        "Deja de buscar síntomas en Google; alimenta el pánico del cerebro.",
        "Descarga el terror antes de dormir en el diario de voz privado Nuju.",
      ],
    },
  },

  {
    level: "severe_death_anxiety_panic",
    scoreRange: [25, 31],
    title: {
      en: "Severe Thanatophobia & Annihilation Panic",
      id: "Thanatophobia Berat & Panik Kehancuran",
      de: "Schwere Thanatophobie & Vernichtungspanik",
      fr: "Thanatophobie Sévère & Panique d'Anéantissement",
      es: "Tanatofobia Severa & Pánico de Aniquilación",
    },
    badge: {
      en: "Acute Existential Alarm",
      id: "Alarm Eksistensial Akut",
      de: "Akuter Todesalarm",
      fr: "Alerte de Mort Aiguë",
      es: "Alarma Aguda de Muerte",
    },
    summary: {
      en: "Your nervous system is gripped by chronic existential terror. Bedtime is a battlefield of racing heartbeats, sudden gasping for air, and terrifying mental loops about non-existence. Mortality awareness paralyzes your joy in everyday life.",
      id: "Sistem sarafmu dicengkeram teror eksistensial kronis. Menjelang tidur menjadi medan perang detak jantung kencang, sesak napas mendadak, dan pikiran berputar tentang ketiadaan abadi. Bayangan kematian merampas kebahagiaanmu.",
      de: "Ihr Nervensystem wird von existenzieller Panik beherrscht. Herzrasen beim Einschlafen, Atemnot und lähmende Gedankenschleifen über das Nichts rauben Ihnen jede Freude.",
      fr: "Votre système nerveux est submergé par une terreur aiguë. Les nuits sont un calvaire de palpitations et de vertige du néant qui étouffe le quotidien.",
      es: "Tu sistema nervioso vive atrapado en un pánico existencial continuo. El momento de dormir desata taquicardia, sensación de ahogo y pavor al vacío eterno.",
    },
    psychology: {
      en: "In clinical psychiatry, this represents severe existential decompensation. The natural psychological defenses against death awareness have cracked wide open, leaving the limbic system exposed to primal annihilation panic without adequate philosophical grounding.",
      id: "Perisai psikologis alami terhadap kematian telah runtuh, membiarkan sistem limbik terpapar teror kehancuran tanpa jangkar filosofis yang kokoh.",
      de: "Die natürlichen seelischen Schutzfilter gegen Todesangst sind kollabiert. Das limbische System wird ungefiltert von Urängsten geflutet.",
      fr: "Les filtres psychologiques protecteurs ont cédé, exposant directement le système limbique à la terreur de l'anéantissement.",
      es: "Las defensas psicológicas habituales se han derrumbado, dejando al sistema límbico expuesto al pánico primario de la aniquilación.",
    },
    actionProtocol: {
      en: [
        "Vagus Nerve Somatic Reset: When annihilation panic strikes, plunge your face into cold water (dive reflex) or place an ice pack on your chest.",
        "Existential Psychotherapy: Engage in dedicated existential therapy or ACT (Acceptance and Commitment Therapy) to rebuild life meaning.",
        "Voice Decompression Sanctuary in Nuju: Speak your unspeakable terror of the void into Nuju's zero-knowledge encrypted vault. Let the adrenaline discharge as raw sound waves.",
      ],
      id: [
        "Reset Vagus Nerve: Saat panik kematian melanda, basuh wajah dengan air es (mammalian dive reflex) atau kompres es di dada.",
        "Psikoterapi Eksistensial: Ikuti terapi ACT atau konseling eksistensial untuk menata kembali makna hidup.",
        "Dekompresi Suara di Nuju: Ungkapkan ketakutan tergelapmu tentang kematian ke dalam brankas suara aman Nuju untuk meredakan badai hormon stres.",
      ],
      de: [
        "Vagusnerv-Reset mit Kaltwasser-Tauchreflex.",
        "Suchen Sie existenzielle Psychotherapie oder ACT auf.",
        "Sprechen Sie Ihre Todespanik unzensiert in den Nuju-Safe ein.",
      ],
      fr: [
        "Réinitialisation vagale par le froid (eau glacée sur le visage).",
        "Consultez en psychothérapie existentielle ou thérapie ACT.",
        "Déposez votre terreur dans le coffre-fort vocal de Nuju pour désamorcer la crise.",
      ],
      es: [
        "Reinicio vagal con agua fría en la cara (reflejo de inmersión).",
        "Inicia psicoterapia existencial o Terapia de Aceptación y Compromiso (ACT).",
        "Descarga tu pánico a la nada en el santuario de audio encriptado de Nuju.",
      ],
    },
  },

  {
    level: "acute_annihilation_terror",
    scoreRange: [32, 36],
    title: {
      en: "Acute Annihilation Terror & Existential Collapse",
      id: "Teror Kehancuran Akut & Kolaps Eksistensial",
      de: "Akuter Vernichtungsterror & Existenzieller Kollaps",
      fr: "Terreur d'Anéantissement Aiguë & Effondrement",
      es: "Terror Agudo de Aniquilación & Colapso Existencial",
    },
    badge: {
      en: "Existential Crisis Emergency",
      id: "Krisis Eksistensial Akut",
      de: "Existenzieller Notstand",
      fr: "Urgence Existentielle",
      es: "Crisis Existencial Extrema",
    },
    summary: {
      en: "You are in an acute existential crisis. The certainty of death has shattered your ability to feel safe in your body or find meaning in the universe. Severe nocturnal panic attacks, depersonalization, and complete vegetative paralysis dominate your days.",
      id: "Kamu berada dalam krisis eksistensial akut. Kepastian kematian telah menghancurkan rasa aman di tubuhmu dan makna hidup di alam semesta. Serangan panik nokturnal, depersonalisasi, dan rasa hampa ekstrem melumpuhkan harimu.",
      de: "Sie befinden sich im existenziellen Schockzustand. Nächtliche Panikattacken, Depersonalisation und völlige Sinnentleerung machen das Dasein unerträglich.",
      fr: "Vous traversez une crise existentielle aiguë. La certitude de la mort engendre attaques de panique nocturnes, dépersonnalisation et effondrement du sens.",
      es: "Atraviesas una crisis existencial límite. El pánico a morir provoca ataques nocturnos intensos, despersonalización y vacío vital insoportable.",
    },
    psychology: {
      en: "This extreme tier requires combined somatic stabilization, medical support if panic prevents sleep, and deep existential counseling. The goal is not to deny mortality, but to help the nervous system hold finitude with awe rather than vegetative terror.",
      id: "Tingkat ekstrem ini memerlukan stabilisasi somatik, bantuan medis jika panik mengganggu tidur, dan konseling mendalam untuk belajar memeluk kefanaan dengan damai.",
      de: "Hier ist professionelle Unterstützung geboten, um das Nervensystem zu stabilisieren und die Endlichkeit mit Ehrfurcht statt Entsetzen zu tragen.",
      fr: "Une prise en charge thérapeutique est nécessaire pour apaiser le système nerveux et réconcilier la personne avec la vie.",
      es: "Requiere acompañamiento clínico para calmar el sistema nervioso y aprender a convivir con la finitud con serenidad.",
    },
    actionProtocol: {
      en: [
        "Immediate Medical/Psychiatric Consultation: If panic attacks prevent sleep for consecutive nights, seek medical support to stabilize brain chemistry.",
        "Radical Physical Anchoring: Touch textured objects, walk barefoot on dirt, listen to deep drumming to tether your nervous system to biology.",
        "Emergency Audio Lifeline in Nuju: Pour your darkest screams, tears, and existential bewilderment into Nuju's zero-knowledge encrypted sanctuary.",
      ],
      id: [
        "Konsultasi Medis/Psikiatri Segera: Jika serangan panik membuatmu tidak bisa tidur beberapa malam berturut-turut, konsultasikan ke tenaga medis profesional.",
        "Grounding Fisik Radikal: Berjalan tanpa alas kaki di tanah, sentuh benda bertekstur, dengarkan ritme teratur untuk mengaitkan saraf ke realitas biologi.",
        "Ruang Curhat Suara Darurat Nuju: Tumpahkan seluruh tangisan dan rasa takutmu ke dalam brankas suara Nuju tanpa takut dihakimi.",
      ],
      de: [
        "Ärztliche Abklärung bei anhaltender Schlaflosigkeit durch Panik.",
        "Radikale somatische Erdung: Barfuß auf Gras, tiefe Atmung.",
        "Notfall-Sprachentlastung im verschlüsselten Nuju-Safe.",
      ],
      fr: [
        "Consultation médicale si l'angoisse empêche le sommeil de façon répétée.",
        "Ancrage sensoriel intense : marche pieds nus, contact avec la matière.",
        "Journal vocal d'urgence dans Nuju pour extérioriser la terreur.",
      ],
      es: [
        "Consulta médica si el insomnio por pánico se vuelve incontrolable.",
        "Anclaje sensorial radical: caminar descalzo sobre tierra, respiración lenta.",
        "Desahogo de emergencia en el refugio de audio privado de Nuju.",
      ],
    },
  },
];

export const THANATOPHOBIA_OPTIONS = [
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
      id: "Sering / Cukup Mengganggu (2 poin)",
      de: "Oft / Mäßig störend (2 Pkt.)",
      fr: "Souvent / Modérément (2 pts)",
      es: "A menudo / Moderadamente (2 pts)",
    },
  },
  {
    value: 3,
    label: {
      en: "Almost Constantly / Severely (3 pts)",
      id: "Hampir Selalu / Sangat Menyiksa (3 poin)",
      de: "Fast ständig / Quälend (3 Pkt.)",
      fr: "Presque constamment / Sévère (3 pts)",
      es: "Casi constantemente / Severo (3 pts)",
    },
  },
];

export const THANATOPHOBIA_SUBSCALE_INFO = {
  existential_annihilation_dread: {
    name: {
      en: "Existential Annihilation Dread",
      id: "Teror Pemusnahan Eksistensial",
      de: "Existenzielle Vernichtungspanik",
      fr: "Terreur d'Anéantissement Existentiel",
      es: "Terror a la Aniquilación Existencial",
    },
    description: {
      en: "Visceral panic upon bedtime, terror of non-existence, and dizziness when contemplating eternity.",
      id: "Kepanikan hebat menjelang tidur, teror ketiadaan diri, dan pusing memikirkan keabadian.",
      de: "Einschlafpanik, Angst vor dem Nichtsein und Schwindel beim Gedanken an die Ewigkeit.",
      fr: "Panique au coucher, vertige du néant et claustrophobie mentale face à l'éternité.",
      es: "Pánico nocturno, pavor a la no-existencia y vértigo ante la idea de la eternidad.",
    },
  },
  symbolic_immortality_striving: {
    name: {
      en: "Symbolic Immortality Striving",
      id: "Ambisi Keabadian Simbolik",
      de: "Streben nach Symbolischer Unsterblichkeit",
      fr: "Quête d'Immortalité Symbolique",
      es: "Búsqueda de Inmortalidad Simbólica",
    },
    description: {
      en: "Compulsive need to build lasting legacies, accumulate wealth, or refuse biological aging limits.",
      id: "Dorongan kompulsif untuk mewariskan nama besar, menimbun harta, atau menolak penuaan alami.",
      de: "Zwanghafter Drang nach Denkmalbauten, Ruhm oder biologischem Aushebeln des Alterns.",
      fr: "Besoin compulsif de laisser une trace indélébile et refus des limites biologiques.",
      es: "Afán compulsivo por dejar un legado inmortal, acumular riqueza y negar el envejecimiento.",
    },
  },
  mortality_salience_paralysis: {
    name: {
      en: "Mortality Salience Paralysis",
      id: "Kelumpuhan Bayang-Bayang Kematian",
      de: "Lähmung durch Sterblichkeitsbewusstsein",
      fr: "Paralysie Face à la Finitude",
      es: "Parálisis por Conciencia de Mortalidad",
    },
    description: {
      en: "Bodily hypervigilance, hypochondria, and existential nihilism draining motivation and present joy.",
      id: "Pengawasan berlebihan terhadap tubuh, hipokondria, dan nihilisme yang menguras motivasi.",
      de: "Hypochondrische Körperüberwachung und existentieller Sinnverlust im Alltag.",
      fr: "Hypervigilance corporelle, hypocondrie et perte d'élan vital face à l'inévitable.",
      es: "Monitoreo corporal hipocondríaco y desmotivación existencial en la vida cotidiana.",
    },
  },
};

export function getThanatophobiaResult(totalScore: number): ThanatophobiaResultLevel {
  const clamped = Math.max(0, Math.min(36, totalScore));
  return (
    THANATOPHOBIA_RESULTS.find(
      (r) => clamped >= r.scoreRange[0] && clamped <= r.scoreRange[1]
    ) || THANATOPHOBIA_RESULTS[0]
  );
}

export function calculateThanatophobiaSubscales(answers: Record<number, number>): {
  existential_annihilation_dread: number;
  symbolic_immortality_striving: number;
  mortality_salience_paralysis: number;
} {
  let a = 0;
  let s = 0;
  let m = 0;

  THANATOPHOBIA_QUESTIONS.forEach((q) => {
    const score = answers[q.id] ?? 0;
    if (q.subscale === "existential_annihilation_dread") a += score;
    if (q.subscale === "symbolic_immortality_striving") s += score;
    if (q.subscale === "mortality_salience_paralysis") m += score;
  });

  return {
    existential_annihilation_dread: a,
    symbolic_immortality_striving: s,
    mortality_salience_paralysis: m,
  };
}
