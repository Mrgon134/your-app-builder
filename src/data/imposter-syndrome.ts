export type ImposterLang = "en" | "id" | "de" | "fr" | "es";
export type ImposterDimension = "fraud_terror" | "luck_attribution" | "overworking";
export type ImposterLevel = "minimal" | "mild" | "moderate" | "intense";
export type ImposterArchetype = "perfectionist" | "superhero" | "natural_genius" | "soloist" | "expert";

export interface ImposterQuestion {
  id: number;
  text: Record<ImposterLang, string>;
  dimension: ImposterDimension;
  archetypeWeight: ImposterArchetype;
}

export interface ImposterProfile {
  level: ImposterLevel;
  badge: Record<ImposterLang, string>;
  title: Record<ImposterLang, string>;
  tagline: Record<ImposterLang, string>;
  description: Record<ImposterLang, string>;
  internalizationDrill: Record<ImposterLang, string[]>;
  color: string;
}

export interface ArchetypeDetail {
  id: ImposterArchetype;
  name: Record<ImposterLang, string>;
  tagline: Record<ImposterLang, string>;
  trait: Record<ImposterLang, string>;
  mantra: Record<ImposterLang, string>;
}

export const IMPOSTER_ARCHETYPES: Record<ImposterArchetype, ArchetypeDetail> = {
  perfectionist: {
    id: "perfectionist",
    name: {
      en: "The Perfectionist",
      id: "Sang Perfeksionis",
      de: "Der Perfektionist",
      fr: "Le Perfectionniste",
      es: "El Perfeccionista",
    },
    tagline: {
      en: "Believes 99% excellence equals complete catastrophic failure.",
      id: "Menganggap kesuksesan 99% sama saja dengan kegagalan total yang memalukan.",
      de: "Glaubt, dass 99 % Erfolg einem totalen Versagen gleichkommt.",
      fr: "Pense que 99 % de réussite équivaut à un échec cuisant.",
      es: "Cree que el 99 % de excelencia es un fracaso absoluto.",
    },
    trait: {
      en: "You fixate obsessively on microscopic flaws in completed projects, completely blind to the overwhelming quality of your work.",
      id: "Anda terobsesi pada cacat kecil dalam pekerjaan, mengabaikan fakta bahwa hasil kerja Anda luar biasa di mata orang lain.",
      de: "Sie fixieren sich auf winzige Fehler und übersehen die hervorragende Gesamtqualität Ihrer Arbeit.",
      fr: "Vous vous focalisez sur des détails minimes au lieu de savourer la qualité globale de votre travail.",
      es: "Se obsesiona con pequeños defectos sin valorar la calidad global de su trabajo.",
    },
    mantra: {
      en: "'Done with excellence is vastly superior to perfect in imaginary isolation.'",
      id: "'Selesai dengan standar tinggi jauh lebih berharga daripada sempurna tapi tertunda selamanya.'",
      de: "'Exzellent vollendet ist unendlich besser als perfekt in der Fantasie.'",
      fr: "'Fait avec excellence vaut infiniment mieux que parfait mais inachevé.'",
      es: "'Hecho con excelencia es infinitamente superior a perfecto en la imaginación.'",
    },
  },
  superhero: {
    id: "superhero",
    name: {
      en: "The Superhero (Over-Worker)",
      id: "Sang Pahlawan Kerja (Super-Person)",
      de: "Der Superheld (Workaholic)",
      fr: "Le Héros Débordé",
      es: "El Superhéroe del Trabajo",
    },
    tagline: {
      en: "Overworks to burnout to prove they deserve to stand in the room.",
      id: "Bekerja lembur hingga burnout demi membuktikan dirinya layak berada di posisinya.",
      de: "Arbeitet bis zum Burnout, um zu beweisen, dass er seinen Platz verdient hat.",
      fr: "Travaille jusqu'à l'épuisement pour justifier sa légitimité.",
      es: "Trabaja hasta el agotamiento para demostrar que merece su puesto.",
    },
    trait: {
      en: "You feel like a fraud unless you juggle three simultaneous crises and work longer hours than everyone else on your team.",
      id: "Anda merasa bersalah dan tidak layak kecuali bekerja lebih keras dan lebih lama dari siapa pun di tim Anda.",
      de: "Sie fühlen sich nur dann legitimiert, wenn Sie mehr Überstunden leisten als alle anderen.",
      fr: "Vous culpabilisez dès que vous ne travaillez pas deux fois plus que les autres.",
      es: "Siente culpa si no trabaja el doble de horas que el resto de su equipo.",
    },
    mantra: {
      en: "'My professional worth is measured by my wisdom and impact, not my exhaustion.'",
      id: "'Nilai profesional saya diukur dari ketepatan dan dampak, bukan dari seberapa hancur tubuh saya karena lembur.'",
      de: "'Mein Wert bemisst sich an meiner Wirkung, nicht an meiner Erschöpfung.'",
      fr: "'Ma valeur se mesure à mon impact et ma lucidité, pas à mon épuisement.'",
      es: "'Mi valor profesional se mide por mi impacto, no por mi nivel de agotamiento.'",
    },
  },
  natural_genius: {
    id: "natural_genius",
    name: {
      en: "The Natural Genius",
      id: "Sang Genius Alami",
      de: "Das Naturtalent",
      fr: "Le Génie Naturel",
      es: "El Genio Natural",
    },
    tagline: {
      en: "Believes true competence must be instantaneous and effortless.",
      id: "Yakin bahwa kompetensi sejati harus instan tanpa perlu bersusah payah.",
      de: "Glaubt, dass wahre Kompetenz sofort und mühelos gelingen muss.",
      fr: "Pense que la vraie compétence doit être immédiate et sans effort.",
      es: "Cree que la verdadera capacidad debe ser instantánea y sin esfuerzo.",
    },
    trait: {
      en: "When a new skill or project requires hard struggle, your brain interprets the difficulty as definitive proof of your stupidity.",
      id: "Ketika suatu topik baru membutuhkan waktu belajar dan kesulitan, Anda menganggap proses belajar itu sebagai bukti bahwa Anda bodoh.",
      de: "Wenn etwas Mühe kostet, interpretieren Sie die Anstrengung fälschlicherweise als Beweis eigener Unfähigkeit.",
      fr: "Si vous devez fournir un effort pour apprendre, vous en déduisez que vous êtes incompétent(e).",
      es: "Si algo le cuesta esfuerzo, lo interpreta erróneamente como prueba de su falta de capacidad.",
    },
    mantra: {
      en: "'Struggle is the biological signature of neuroplastic growth, not incompetence.'",
      id: "'Kesulitan belajar adalah tanda biologis pertumbuhan saraf, bukan bukti kebodohan.'",
      de: "'Anstrengung ist der biologische Beweis von Lernfortschritt, nicht von Dummheit.'",
      fr: "'L'effort est la signature de la neuroplasticité, pas de l'incompétence.'",
      es: "'La dificultad es la firma biológica del aprendizaje, no de la incompetencia.'",
    },
  },
  soloist: {
    id: "soloist",
    name: {
      en: "The Rugged Soloist",
      id: "Sang Solois Keras Kepala",
      de: "Der Einzelkämpfer",
      fr: "Le Solitaire Endurci",
      es: "El Solitario Autosuficiente",
    },
    tagline: {
      en: "Believes asking for help nullifies their achievements.",
      id: "Menganggap meminta bantuan orang lain menghapus nilai pencapaian diri.",
      de: "Glaubt, dass die Bitte um Hilfe die eigene Leistung entwertet.",
      fr: "Pense que demander de l'aide annule le mérite de sa réussite.",
      es: "Cree que pedir ayuda invalida el mérito de sus logros.",
    },
    trait: {
      en: "You refuse to delegate or seek guidance, convinced that if you didn't conquer the mountain 100% alone, you didn't really earn it.",
      id: "Anda enggan meminta panduan atau delegasi, yakin bahwa jika tidak dikerjakan sendiri 100%, Anda tidak berhak membanggakannya.",
      de: "Sie lehnen Hilfe ab aus Sorge, der Erfolg gehöre Ihnen dann nicht mehr allein.",
      fr: "Vous refusez de déléguer, convaincu(e) que la réussite doit être entièrement solitaire.",
      es: "Se niega a pedir colaboración por temor a que el éxito no sea 100 % suyo.",
    },
    mantra: {
      en: "'High performers build and leverage collaborative wisdom; solitary isolation is inefficient ego.'",
      id: "'Orang hebat berkolaborasi dan memanfaatkan sinergi; berjuang sendirian hanyalah jebakan ego.'",
      de: "'Erfolgreiche Menschen nutzen kollektive Weisheit; Isolation ist ineffizientes Ego.'",
      fr: "'Les plus brillants savent s'entourer ; le combat solitaire n'est qu'un piège de l'ego.'",
      es: "'Los grandes líderes se apoyan en otros; la autosuficiencia extrema es una trampa del ego.'",
    },
  },
  expert: {
    id: "expert",
    name: {
      en: "The Eternal Expert",
      id: "Sang Pemburu Sertifikasi (The Expert)",
      de: "Der ewige Experte",
      fr: "L'Éternel Apprenant",
      es: "El Eterno Experto",
    },
    tagline: {
      en: "Terrified of being asked a question they don't know the answer to.",
      id: "Selalu merasa pengetahuannya belum cukup dan takut ditanya hal yang belum ia kuasai.",
      de: "Panische Angst vor einer Frage, auf die er keine perfekte Antwort hat.",
      fr: "Angoisse à l'idée de ne pas connaître la réponse à une question inattendue.",
      es: "Terror a que le hagan una pregunta cuya respuesta no domine al 100 %.",
    },
    trait: {
      en: "You hoard degrees, certifications, and courses, convinced you are never qualified enough to step up or apply for advanced opportunities.",
      id: "Anda terus mengumpulkan kursus dan sertifikat, yakin bahwa Anda belum cukup kompeten untuk mengambil peluang besar.",
      de: "Sie sammeln Zertifikate und Ausbildungen, weil Sie sich nie qualifiziert genug fühlen.",
      fr: "Vous accumulez diplômes et formations par peur de ne jamais être assez légitime.",
      es: "Acumula títulos y cursos convencido de que aún no sabe lo suficiente para dar el paso.",
    },
    mantra: {
      en: "'Real mastery is not knowing every answer; it is knowing how to discover truth without shame.'",
      id: "'Keahlian sejati bukan tahu semua jawaban, melainkan percaya diri mencari solusi tanpa rasa malu.'",
      de: "'Wahre Meisterschaft bedeutet nicht, alles zu wissen, sondern mutig Lösungen zu finden.'",
      fr: "'La maîtrise ne consiste pas à tout savoir, mais à savoir chercher sans complexe.'",
      es: "'La verdadera maestría no es saberlo todo, sino investigar sin vergüenza.'",
    },
  },
};

export const IMPOSTER_QUESTIONS: ImposterQuestion[] = [
  // Fraud Terror (1-4)
  {
    id: 1,
    dimension: "fraud_terror",
    archetypeWeight: "perfectionist",
    text: {
      en: "I secretly fear that important people around me will suddenly discover how incompetent I actually am.",
      id: "Saya diam-diam takut orang-orang penting di sekitar saya tiba-tiba menyadari betapa tidak kompetennya saya sebenarnya.",
      de: "Ich fürchte insgeheim, dass andere bald bemerken, wie inkompetent ich eigentlich bin.",
      fr: "J'ai secrètement peur que mon entourage réalise soudain à quel point je suis incompétent(e).",
      es: "Temo en secreto que los demás descubran en cualquier momento lo incompetente que soy en realidad.",
    },
  },
  {
    id: 2,
    dimension: "fraud_terror",
    archetypeWeight: "expert",
    text: {
      en: "During professional meetings, I stay quiet out of fear of asking a question that reveals my lack of knowledge.",
      id: "Saat rapat profesional, saya memilih diam karena takut menanyakan sesuatu yang membocorkan kekurangan saya.",
      de: "In Meetings schweige ich oft aus Angst, eine Frage zu stellen, die mein Unwissen entlarvt.",
      fr: "En réunion, je préfère me taire de peur de poser une question qui trahirait mes lacunes.",
      es: "En reuniones me quedo callado por miedo a hacer una pregunta que deje al descubierto mi falta de conocimiento.",
    },
  },
  {
    id: 3,
    dimension: "fraud_terror",
    archetypeWeight: "natural_genius",
    text: {
      en: "When people praise my work, I feel uncomfortable and worry I won't be able to repeat that performance next time.",
      id: "Ketika dipuji atas keberhasilan kerja, saya justru cemas karena khawatir tidak bisa mengulanginya lagi.",
      de: "Wenn man mich lobt, werde ich nervös, weil ich fürchte, diese Leistung nicht wiederholen zu können.",
      fr: "Quand on me félicite, j'ai peur de ne pas être capable de reproduire ce niveau de performance.",
      es: "Cuando elogian mi trabajo, me incomodo temiendo no ser capaz de repetir ese nivel la próxima vez.",
    },
  },
  {
    id: 4,
    dimension: "fraud_terror",
    archetypeWeight: "superhero",
    text: {
      en: "I compare my internal doubts to the polished external success of my peers, feeling vastly inferior.",
      id: "Saya sering membandingkan keraguan diri saya dengan kesuksesan orang lain, dan merasa diri saya jauh tertinggal.",
      de: "Ich vergleiche meine inneren Zweifel mit dem scheinbaren Erfolg anderer und fühle mich unterlegen.",
      fr: "Je compare mes doutes intérieurs à l'assurance apparente des autres et me sens inférieur(e).",
      es: "Comparo mis dudas íntimas con el éxito exterior de mis colegas y me siento muy inferior.",
    },
  },

  // Luck Attribution (5-8)
  {
    id: 5,
    dimension: "luck_attribution",
    archetypeWeight: "natural_genius",
    text: {
      en: "When I succeed at a major goal, I believe it happened because of luck, good timing, or easy competition.",
      id: "Saat berhasil meraih pencapaian besar, saya yakin itu semata-mata karena keberuntungan atau waktu yang kebetulan pas.",
      de: "Wenn mir etwas Großes gelingt, halte ich es für reines Glück, gutes Timing oder Zufall.",
      fr: "Lorsque je réussis un projet important, j'attribue cela à la chance ou à un concours de circonstances.",
      es: "Cuando consigo un gran logro, creo que fue por simple suerte o buena casualidad.",
    },
  },
  {
    id: 6,
    dimension: "luck_attribution",
    archetypeWeight: "soloist",
    text: {
      en: "I find it nearly impossible to truly internalize compliments; I immediately deflect them to someone else.",
      id: "Saya merasa sangat sulit menerima pujian dengan tulus; saya langsung mengalihkannya ke orang lain.",
      de: "Es fällt mir schwer, Komplimente anzunehmen; ich lenke das Lob sofort auf andere ab.",
      fr: "Il m'est presque impossible d'accepter un compliment sans le minimiser ou le renvoyer à autrui.",
      es: "Me resulta casi imposible aceptar un cumplido; de inmediato lo desvío hacia otra persona.",
    },
  },
  {
    id: 7,
    dimension: "luck_attribution",
    archetypeWeight: "perfectionist",
    text: {
      en: "If I make even one minor error in a project, I view the entire outcome as an unmitigated disaster.",
      id: "Jika saya melakukan satu kesalahan kecil dalam proyek, saya menganggap seluruh hasil kerja sebagai kegagalan total.",
      de: "Schleicht sich auch nur ein kleiner Fehler ein, empfinde ich das gesamte Ergebnis als Desaster.",
      fr: "Si je commets la moindre erreur, je considère l'ensemble de mon travail comme raté.",
      es: "Si cometo el menor fallo, considero que todo el proyecto ha sido un desastre absoluto.",
    },
  },
  {
    id: 8,
    dimension: "luck_attribution",
    archetypeWeight: "expert",
    text: {
      en: "I hesitate to apply for jobs or promotions unless I meet 100% of every listed qualification requirement.",
      id: "Saya ragu melamar pekerjaan atau promosi kecuali saya memenuhi 100% syarat yang tertera tanpa celah.",
      de: "Ich bewerbe mich nur auf Positionen, wenn ich ausnahmslos 100 % aller Kriterien erfülle.",
      fr: "J'hésite à postuler à un poste à moins de cocher rigoureusement 100 % des prérequis.",
      es: "Dudo en postularme a un puesto a menos que cumpla con el 100 % de los requisitos exactos.",
    },
  },

  // Overworking & Over-preparation (9-12)
  {
    id: 9,
    dimension: "overworking",
    archetypeWeight: "superhero",
    text: {
      en: "I over-prepare obsessively for presentations or exams because I believe average preparation will expose me.",
      id: "Saya bersiap mati-matian secara berlebihan untuk presentasi karena takut persiapan biasa akan membongkar kelemahan saya.",
      de: "Ich bereite mich exzessiv auf Präsentationen vor, aus Angst, sonst sofort enttarnt zu werden.",
      fr: "Je sur-prépare excessivement mes présentations de peur que mon niveau réel ne soit découvert.",
      es: "Me sobrepreparo obsesivamente para presentaciones temiendo que una preparación normal me delate.",
    },
  },
  {
    id: 10,
    dimension: "overworking",
    archetypeWeight: "soloist",
    text: {
      en: "I resist asking colleagues for help because I believe relying on others proves I am incapable.",
      id: "Saya enggan meminta bantuan rekan kerja karena merasa bahwa dibantu orang lain membuktikan ketidakbecusan saya.",
      de: "Ich bitte ungern um Unterstützung, weil ich glaube, dass Hilfe meine Inkompetenz beweist.",
      fr: "Je rechigne à demander de l'aide, persuadé(e) que solliciter autrui prouve mon incapacité.",
      es: "Me resisto a pedir ayuda porque siento que necesitar a otros demuestra mi incompetencia.",
    },
  },
  {
    id: 11,
    dimension: "overworking",
    archetypeWeight: "perfectionist",
    text: {
      en: "I procrastinate on starting difficult tasks because the prospect of not doing them perfectly is terrifying.",
      id: "Saya menunda-nunda memulai tugas sulit karena takut hasilnya tidak sempurna.",
      de: "Ich schiebe anspruchsvolle Aufgaben auf, weil die Aussicht auf ein unvollkommenes Ergebnis mich lähmt.",
      fr: "Je procrastine face aux tâches complexes car la perspective de ne pas les réussir parfaitement m'angoisse.",
      es: "Procrastino al iniciar tareas difíciles porque la idea de no hacerlas perfectas me paraliza.",
    },
  },
  {
    id: 12,
    dimension: "overworking",
    archetypeWeight: "expert",
    text: {
      en: "Even after years of experience, I still feel like a beginner who tricked their way into their position.",
      id: "Bahkan setelah bertahun-tahun berpengalaman, saya tetap merasa seperti pemula yang cuma kebetulan lolos.",
      de: "Selbst nach Jahren an Erfahrung fühle ich mich wie ein Anfänger, der sich seinen Platz erschlichen hat.",
      fr: "Même après des années d'expérience, j'ai l'impression d'être un débutant qui a trompé son monde.",
      es: "Incluso con años de experiencia, sigo sintiéndome como un principiante que engañó a todos para llegar aquí.",
    },
  },
];

export const IMPOSTER_OPTIONS = [
  {
    value: 0,
    label: {
      en: "Not at all true of me (Rarely or never feel this)",
      id: "Sangat tidak sesuai (Jarang atau tidak pernah merasa begini)",
      de: "Trifft überhaupt nicht zu",
      fr: "Pas du tout vrai pour moi",
      es: "Para nada cierto en mi caso",
    },
  },
  {
    value: 1,
    label: {
      en: "Rarely / Slightly true (Occasional fleeting thought)",
      id: "Jarang / Kadang-kadang terlintas di pikiran",
      de: "Selten / Ansatzweise zutreffend",
      fr: "Rarement / Légèrement vrai",
      es: "Rara vez / Ligeramente cierto",
    },
  },
  {
    value: 2,
    label: {
      en: "Often true (Frequent struggle in my work/studies)",
      id: "Sering terjadi (Cukup sering saya rasakan dalam pekerjaan)",
      de: "Oft zutreffend (Regelmäßiger Begleiter)",
      fr: "Souvent vrai (Fréquent dans mon travail)",
      es: "A menudo cierto (Frecuente en mi trabajo)",
    },
  },
  {
    value: 3,
    label: {
      en: "Very true (Chronic core belief that exhausts me)",
      id: "Sangat akurat (Pikiran kronis yang sangat menguras energi)",
      de: "Sehr zutreffend (Beständiger Quell von Erschöpfung)",
      fr: "Très vrai (Croyance chronique épuisante)",
      es: "Muy cierto (Creencia crónica y agotadora)",
    },
  },
];

export const IMPOSTER_PROFILES: Record<ImposterLevel, ImposterProfile> = {
  minimal: {
    level: "minimal",
    badge: {
      en: "Healthy Competence",
      id: "Kompetensi Sehat",
      de: "Gesunde Selbstwirksamkeit",
      fr: "Compétence équilibrée",
      es: "Competencia saludable",
    },
    title: {
      en: "Grounded Self-Efficacy & Confidence",
      id: "Keyakinan Diri yang Kokoh & Realistis",
      de: "Stabile Selbstwirksamkeit & Vertrauen",
      fr: "Confiance en soi solide et réaliste",
      es: "Autoeficacia sólida y confianza realista",
    },
    tagline: {
      en: "You comfortably own your accomplishments and view mistakes as natural learning curves.",
      id: "Anda mampu mengapresiasi pencapaian diri dan memandang kesalahan sebagai proses belajar biasa.",
      de: "Sie erkennen Ihre Erfolge an und sehen Fehler als natürliche Lernschritte.",
      fr: "Vous assumez vos succès et considérez les erreurs comme des étapes d'apprentissage normales.",
      es: "Reconoce sus logros y entiende los errores como parte del aprendizaje.",
    },
    description: {
      en: "Your score reflects healthy psychological self-efficacy. While everyone experiences brief self-doubt before major milestones, you do not suffer from the persistent fear of being unmasked as an intellectual fraud.",
      id: "Skor Anda mencerminkan keyakinan diri yang sehat. Meskipun wajar sesekali ragu sebelum tantangan besar, Anda tidak terbebani oleh ketakutan kronis bahwa Anda adalah penipu yang akan terbongkar kedoknya.",
      de: "Ihr Ergebnis spiegelt ein gesundes Vertrauen in Ihre Fähigkeiten wider. Kurzfristige Zweifel vor neuen Herausforderungen werfen Sie nicht aus der Bahn.",
      fr: "Vos réponses témoignent d'une solide estime de vos compétences. Vous traversez les doutes sans remettre en cause votre légitimité.",
      es: "Su puntuación demuestra una confianza funcional. Las dudas puntuales no socavan su sentido de competencia.",
    },
    internalizationDrill: {
      en: [
        "Maintain a 'Wins & Impact' journal entry once a week in Ju to celebrate growth.",
        "Mentor junior peers: teaching others reinforces your awareness of your own tacit knowledge.",
      ],
      id: [
        "Tuliskan 1 pencapaian mingguan di Ju untuk merayakan proses bertumbuh.",
        "Bimbing rekan yang lebih junior: mengajari orang lain memperkuat kesadaran atas keahlian Anda.",
      ],
      de: [
        "Führen Sie einmal wöchentlich ein Erfolgstagebuch in Ju.",
        "Geben Sie Ihr Wissen als Mentor an andere weiter, um eigene Kompetenzen zu spüren.",
      ],
      fr: [
        "Notez vos victoires et apprentissages chaque semaine dans Ju.",
        "Transmettez vos compétences à des pairs plus juniors pour mesurer votre expertise.",
      ],
      es: [
        "Registre un logro semanal en Ju para celebrar su progreso.",
        "Apoye a colegas más jóvenes para reconfirmar su propia experiencia.",
      ],
    },
    color: "#10B981",
  },
  mild: {
    level: "mild",
    badge: {
      en: "Situational Imposter Doubts",
      id: "Keraguan Situasional",
      de: "Situative Selbstzweifel",
      fr: "Doutes situationnels",
      es: "Dudas situacionales",
    },
    title: {
      en: "Contextual Fraud Anxiety",
      id: "Kecemasan Penipu di Situasi Baru",
      de: "Kontextuelle Hochstapler-Zweifel",
      fr: "Anxiété de légitimité contextuelle",
      es: "Inseguridad contextual transitoria",
    },
    tagline: {
      en: "Imposter feelings flare up mainly during promotions, new roles, or intimidating social circles.",
      id: "Perasaan tidak pantas biasanya muncul saat promosi jabatan, peran baru, atau lingkungan baru.",
      de: "Hochstapler-Gefühle treten vor allem bei Beförderungen oder neuen Rollen auf.",
      fr: "Vos doutes s'activent principalement lors de changements de poste ou de nouveaux défis.",
      es: "La inseguridad surge sobre todo ante ascensos o entornos profesionales exigentes.",
    },
    description: {
      en: "You experience moderate bouts of imposter syndrome, especially when stepping out of your comfort zone. When facing high-stakes evaluation, your brain tends to credit luck rather than your accumulated hours of disciplined preparation.",
      id: "Anda mengalami keraguan diri yang cukup nyata saat keluar dari zona nyaman. Di hadapan tantangan besar, otak Anda cenderung menganggap kesuksesan sebagai kebetulan daripada hasil kerja keras.",
      de: "Sie erleben zeitweise Phasen von Imposter-Gefühlen bei neuen Herausforderungen. Sie neigen dazu, Erfolge eher dem Zufall als Ihrer Vorbereitung zuzuschreiben.",
      fr: "Vous ressentez des doutes lors de transitions importantes. Votre esprit a parfois tendance à attribuer vos réussites à des facteurs externes.",
      es: "Experimenta dudas de legitimidad al asumir nuevas responsabilidades, minimizando su esfuerzo personal.",
    },
    internalizationDrill: {
      en: [
        "Fact-Checking Drill: Separate feelings from objective metrics (e.g., 'I feel like a fraud, but I delivered the project on time with high client satisfaction').",
        "Celebrate milestones physically before rushing into the next task.",
      ],
      id: [
        "Latihan Cek Fakta: Pisahkan emosi dari metrik nyata ('Saya merasa tidak pantas, tapi proyek selesai tepat waktu dan diapresiasi').",
        "Rayakan keberhasilan secara nyata sebelum langsung buru-buru mengerjakan tugas berikutnya.",
      ],
      de: [
        "Fakten-Check: Trennen Sie Gefühle von objektiven Ergebnissen.",
        "Feiern Sie Meilensteine bewusst, bevor Sie zur nächsten Aufgabe hetzen.",
      ],
      fr: [
        "Distinguez vos émotions des faits objectifs : vos résultats prouvent votre valeur.",
        "Accordez-vous une vraie pause de célébration après chaque succès.",
      ],
      es: [
        "Contraste sus sensaciones con hechos objetivos comprobables.",
        "Celebre los hitos alcanzados antes de saltar a la siguiente exigencia.",
      ],
    },
    color: "#F59E0B",
  },
  moderate: {
    level: "moderate",
    badge: {
      en: "Significant Imposter Phenomenon",
      id: "Sindrom Imposter Signifikan",
      de: "Ausgeprägtes Imposter-Phänomen",
      fr: "Syndrome de l'imposteur marqué",
      es: "Síndrome del impostor manifiesto",
    },
    title: {
      en: "Chronic Attribution Discounting",
      id: "Meremehkan Prestasi Sendiri secara Kronis",
      de: "Chronische Leistungsentwertung",
      fr: "Minimisation chronique des réussites",
      es: "Minimización crónica de logros",
    },
    tagline: {
      en: "Persistent fear of being unmasked, accompanied by perfectionistic overworking or procrastination.",
      id: "Rasa cemas terus-menerus bahwa kedok Anda akan terbongkar, memicu lembur berlebih atau prokrastinasi.",
      de: "Dauernde Angst vor der Enttarnung, oft gepaart mit Überarbeitung oder Aufschieben.",
      fr: "Peur persistante d'être démasqué(e), entraînant surmenage et anxiété de performance.",
      es: "Temor constante a ser descubierto, acompañado de sobreesfuerzo o postergación.",
    },
    description: {
      en: "You live with a heavy, recurring belief that your success is a fluke and that your colleagues are vastly more intelligent or qualified than you. This dynamic drives either extreme over-preparation (working to the point of exhaustion) or task paralysis.",
      id: "Anda hidup dengan keyakinan berulang bahwa keberhasilan Anda hanyalah hoki semata dan orang lain jauh lebih pintar. Pola ini mendorong Anda bekerja lembur sampai kehabisan tenaga atau justru menunda pekerjaan karena takut tidak sempurna.",
      de: "Sie leben mit der beständigen Überzeugung, dass Ihr Erfolg nur Glück war. Dies führt zu exzessiver Überarbeitung oder lähmender Prokrastination.",
      fr: "Vous êtes convaincu(e) que vos réussites résultent d'un malentendu et que les autres sont plus compétents. Cela nourrit un surmenage épuisant.",
      es: "Siente que su éxito es un golpe de suerte y que los demás son más capaces, lo que le lleva a agotarse trabajando de más.",
    },
    internalizationDrill: {
      en: [
        "The Clance Evidence Log: List 5 tangible professional achievements and write down the exact skills that made them happen.",
        "Normalize Not Knowing: Practice saying 'I don't know the answer offhand, but I will find out' without apologetic tone.",
        "Set strict work-cutoff boundaries to break the superhero overworking cycle.",
      ],
      id: [
        "Log Bukti Dr. Clance: Tuliskan 5 pencapaian nyata dan sebutkan keahlian spesifik Anda yang mewujudkannya.",
        "Normalisasi Ketidaktahuan: Latih kalimat 'Saya belum tahu jawabannya sekarang, tapi saya akan cari tahu' tanpa nada bersalah.",
        "Terapkan batas jam kerja tegas untuk memutus siklus kerja berlebihan.",
      ],
      de: [
        "Erfolgs-Logbuch: Notieren Sie 5 Erfolge und die konkreten Fähigkeiten, die dazu geführt haben.",
        "Mut zur Lücke: 'Ich weiß es aktuell nicht, bringe es aber in Erfahrung' selbstbewusst formulieren.",
        "Feste Feierabendzeiten setzen, um das Überarbeiten zu stoppen.",
      ],
      fr: [
        "Tenez un registre de preuves : listez 5 accomplissements et les compétences qui les expliquent.",
        "Osez dire : 'Je ne sais pas encore, mais je vais me renseigner' sans vous excuser.",
        "Fixez des horaires de déconnexion stricts pour préserver votre santé.",
      ],
      es: [
        "Elabore una lista con 5 logros reales y las habilidades exactas que los hicieron posibles.",
        "Normalice decir con tranquilidad: 'No lo sé ahora mismo, pero lo averiguaré'.",
        "Establezca límites firmes de horario para cortar el ciclo de sobreexigencia.",
      ],
    },
    color: "#6366F1",
  },
  intense: {
    level: "intense",
    badge: {
      en: "Paralyzing Fraud Terror",
      id: "Teror Penipu yang Melumpuhkan",
      de: "Lähmende Hochstapler-Angst",
      fr: "Terreur d'illégitimité paralysante",
      es: "Terror paralizante al fraude",
    },
    title: {
      en: "Severe Imposter Syndrome & Burnout",
      id: "Sindrom Imposter Berat & Kelelahan Kronis",
      de: "Schweres Imposter-Syndrom & Erschöpfung",
      fr: "Syndrome de l'imposteur aigu et épuisement",
      es: "Síndrome del impostor severo y agotamiento",
    },
    tagline: {
      en: "Exhausting chronic terror that every achievement was an accident and total ruin is imminent.",
      id: "Rasa takut kronis yang menguras batin bahwa semua pencapaian adalah kebetulan dan kehancuran segera tiba.",
      de: "Erschöpfende Angst, dass jeder Erfolg ein Zufall war und der Absturz unmittelbar bevorsteht.",
      fr: "Angoisse chronique épuisante selon laquelle tout succès n'est qu'un hasard trompeur.",
      es: "Agotamiento crónico por creer que cada logro fue una casualidad y que el fracaso es inminente.",
    },
    description: {
      en: "Your results indicate severe, clinically disruptive imposter phenomenon. The psychological toll of constantly guarding a 'fake secret' drains your neurotransmitter baselines, creating chronic cortisol elevation, insomnia, and pervasive dread. This is not a measure of your actual capability—in fact, high-achievers suffer from this most intensely. Cognitive reframing and professional counseling can help you reclaim peace.",
      id: "Skor Anda menunjukkan sindrom imposter berat yang mengganggu kesehatan mental. Beban berat berpura-pura 'tidak ketahuan' menguras dopamin dan memicu kortisol tinggi, insomnia, dan kecemasan konstan. Perlu diingat: fenomena ini justru paling sering menyerang orang-orang berprestasi tinggi. Konseling dan terapi kognitif sangat dianjurkan.",
      de: "Ihr Ergebnis zeigt ein schweres, belastendes Imposter-Phänomen. Die ständige Angst vor Entlarvung zehrt an Ihren Energiereserven. Ironischerweise betrifft dies besonders Leistungsträger. Professionelle Unterstützung ist ratsam.",
      fr: "Vos réponses indiquent un syndrome de l'imposteur sévère. Porter en permanence la peur d'être démasqué(e) épuise vos réserves nerveuses. Sachez que ce phénomène touche surtout les profils brillants.",
      es: "Sus respuestas reflejan un síndrome del impostor severo. El desgaste de ocultar una supuesta incompetencia agota su sistema nervioso. Paradójicamente, afecta más a personas de alto rendimiento.",
    },
    internalizationDrill: {
      en: [
        "The Dunning-Kruger Reality Check: True frauds do not suffer from imposter syndrome; your doubt is proof of your conscientiousness.",
        "Implement the 48-Hour De-escalation: When panic strikes after an achievement, do not sign up for more work to 'compensate'.",
        "Seek a CBT / Acceptance and Commitment (ACT) therapist specializing in workplace mental health.",
      ],
      id: [
        "Cek Fakta Dunning-Kruger: Penipu sejati tidak pernah merasa dirinya imposter; keraguan Anda justru bukti Anda peduli dan berintegritas.",
        "Jeda De-eskalasi 48 Jam: Saat panik melanda setelah sukses, jangan buru-buru mengambil tugas baru untuk 'menebus rasa bersalah'.",
        "Jadwalkan sesi dengan psikolog klinis CBT atau ACT yang berpengalaman dalam workplace mental health.",
      ],
      de: [
        "Dunning-Kruger-Erkenntnis: Echte Hochstapler zweifeln nicht an sich; Ihre Zweifel beweisen Ihre Gewissenhaftigkeit.",
        "48-Stunden-Puffer: Nach Erfolgen nicht sofort neue Projekte zur 'Wiedergutmachung' annehmen.",
        "Suchen Sie Unterstützung bei einem KVT- oder ACT-Therapeuten für berufliche Belastungen.",
      ],
      fr: [
        "Rappel Dunning-Kruger : les vrais imposteurs ne doutent jamais d'eux-mêmes ; votre doute prouve votre intégrité.",
        "Ne compensez pas votre anxiété en surchargeant votre agenda après une réussite.",
        "Consultez un thérapeute spécialisé dans la santé mentale au travail (TCC ou ACT).",
      ],
      es: [
        "Efecto Dunning-Kruger: los verdaderos farsantes nunca dudan de sí mismos; su duda es señal de autocrítica y rigor.",
        "Evite sobrecargarse de trabajo para compensar la ansiedad tras un éxito.",
        "Consulte con un profesional de la psicología laboral o especialista en TCC/ACT.",
      ],
    },
    color: "#E11D48",
  },
};

export interface ImposterScoreResult {
  totalScore: number;
  maxScore: number;
  percentage: number;
  level: ImposterLevel;
  profile: ImposterProfile;
  dominantArchetype: ArchetypeDetail;
  archetypeScores: Record<ImposterArchetype, number>;
  subscales: {
    fraud_terror: { score: number; max: number; percentage: number };
    luck_attribution: { score: number; max: number; percentage: number };
    overworking: { score: number; max: number; percentage: number };
  };
}

export function calculateImposterScore(answers: Record<number, number>): ImposterScoreResult {
  let fraud_terror = 0;
  let luck_attribution = 0;
  let overworking = 0;

  const archetypeScores: Record<ImposterArchetype, number> = {
    perfectionist: 0,
    superhero: 0,
    natural_genius: 0,
    soloist: 0,
    expert: 0,
  };

  IMPOSTER_QUESTIONS.forEach((q) => {
    const val = answers[q.id] || 0;
    if (q.dimension === "fraud_terror") fraud_terror += val;
    if (q.dimension === "luck_attribution") luck_attribution += val;
    if (q.dimension === "overworking") overworking += val;

    archetypeScores[q.archetypeWeight] += val;
  });

  const totalScore = fraud_terror + luck_attribution + overworking;
  const maxScore = 36;
  const percentage = Math.round((totalScore / maxScore) * 100);

  let level: ImposterLevel = "minimal";
  if (totalScore >= 31) {
    level = "intense";
  } else if (totalScore >= 22) {
    level = "moderate";
  } else if (totalScore >= 12) {
    level = "mild";
  }

  // Find dominant archetype
  let dominantKey: ImposterArchetype = "perfectionist";
  let maxArchetypeVal = -1;
  (Object.keys(archetypeScores) as ImposterArchetype[]).forEach((arch) => {
    if (archetypeScores[arch] > maxArchetypeVal) {
      maxArchetypeVal = archetypeScores[arch];
      dominantKey = arch;
    }
  });

  return {
    totalScore,
    maxScore,
    percentage,
    level,
    profile: IMPOSTER_PROFILES[level],
    dominantArchetype: IMPOSTER_ARCHETYPES[dominantKey],
    archetypeScores,
    subscales: {
      fraud_terror: {
        score: fraud_terror,
        max: 12,
        percentage: Math.round((fraud_terror / 12) * 100),
      },
      luck_attribution: {
        score: luck_attribution,
        max: 12,
        percentage: Math.round((luck_attribution / 12) * 100),
      },
      overworking: {
        score: overworking,
        max: 12,
        percentage: Math.round((overworking / 12) * 100),
      },
    },
  };
}
