export type RuminationCardLang = "en" | "id" | "de" | "fr" | "es";

export interface RuminationQuestion {
  id: number;
  subscale:
    | "brooding_self_criticism"
    | "depressive_symptom_replay"
    | "abstract_analytical_paralysis";
  text: Record<RuminationCardLang, string>;
}

export interface RuminationResultLevel {
  level:
    | "constructive_reflective_clarity"
    | "mild_situational_overthinking"
    | "moderate_ruminative_brooding"
    | "high_dysfunctional_rumination_loop"
    | "acute_depressive_brooding_cascade";
  scoreRange: [number, number];
  title: Record<RuminationCardLang, string>;
  badge: Record<RuminationCardLang, string>;
  summary: Record<RuminationCardLang, string>;
  psychology: Record<RuminationCardLang, string>;
  actionProtocol: Record<RuminationCardLang, string[]>;
}

export const RUMINATION_QUESTIONS: RuminationQuestion[] = [
  // 1. Brooding & Self-Criticism
  {
    id: 1,
    subscale: "brooding_self_criticism",
    text: {
      en: "When something goes wrong, I obsessively ask myself: 'Why do I always react this way? What is wrong with me?' rather than focusing on fixing it.",
      id: "Saat terjadi kesalahan, aku terobsesi bertanya pada diri sendiri: 'Kenapa aku selalu bereaksi seperti ini? Apa yang salah denganku?' ketimbang fokus memperbaikinya.",
      de: "Wenn etwas schiefgeht, frage ich mich obsessiv: 'Warum reagiere ich immer so? Was stimmt nicht mit mir?', statt nach Lösungen zu suchen.",
      fr: "Quand un problème survient, je me demande de façon obsessionnelle : 'Pourquoi est-ce que je réagis toujours ainsi ? Qu'est-ce qui cloche chez moi ?' plutôt que de chercher une solution.",
      es: "Cuando algo sale mal, me pregunto de forma obsesiva: '¿Por qué siempre reacciono así? ¿Qué me pasa?', en lugar de enfocarme en solucionarlo.",
    },
  },
  // 2. Depressive Symptom Replay
  {
    id: 2,
    subscale: "depressive_symptom_replay",
    text: {
      en: "I mentally replay past awkward interactions, mistakes, or failures over and over, feeling the exact same wave of shame and sadness each time.",
      id: "Aku memutar ulang interaksi canggung, kesalahan, atau kegagalan masa lalu berulang-ulang di kepala, merasakan gelombang malu dan sedih yang sama persis setiap kali.",
      de: "Ich spiele vergangene peinliche Momente, Fehler oder Niederlagen in Gedanken wieder und wieder ab und erlebe die gleiche Welle von Scham und Trauer.",
      fr: "Je repasse en boucle dans ma tête des échanges gênants, erreurs ou échecs passés, en ressentant à chaque fois la même vague de honte et de tristesse.",
      es: "Reproduzco mentalmente interacciones incómodas, errores o fracasos una y otra vez, reviviendo la misma intensa oleada de vergüenza y tristeza.",
    },
  },
  // 3. Abstract Analytical Paralysis
  {
    id: 3,
    subscale: "abstract_analytical_paralysis",
    text: {
      en: "I get trapped asking big, vague 'Why' questions ('Why is my life so hard?', 'Why can't I just be happy?') that have no practical answer and lead nowhere.",
      id: "Aku terjebak dalam pertanyaan 'Kenapa' yang abstrak dan suram ('Kenapa hidupku begitu berat?', 'Kenapa aku tidak bisa bahagia saja?') tanpa jawaban praktis.",
      de: "Ich verstricke mich in vagen 'Warum'-Fragen ('Warum ist mein Leben so schwer?', 'Warum kann ich nicht glücklich sein?'), die zu keiner Lösung führen.",
      fr: "Je m'enferme dans des 'Pourquoi' vagues et sans issue ('Pourquoi ma vie est-elle si dure ?', 'Pourquoi ne puis-je pas être heureux ?') qui ne mènent nulle part.",
      es: "Me quedo atrapado en preguntas abstractas ('¿Por qué mi vida es tan difícil?', '¿Por qué no puedo ser feliz?') que carecen de respuesta práctica.",
    },
  },
  // 4. Brooding & Self-Criticism
  {
    id: 4,
    subscale: "brooding_self_criticism",
    text: {
      en: "I constantly compare my current situation with an idealized standard, tormenting myself with how much better or more successful I 'should' be.",
      id: "Aku terus membandingkan situasiku saat ini dengan standar ideal yang tak tercapai, menyiksa diri dengan pikiran betapa lebih baik atau suksesnya aku 'seharusnya'.",
      de: "Ich vergleiche meine Situation ständig mit unerreichbaren Idealen und quäle mich mit dem Gedanken, wie viel erfolgreicher ich sein 'sollte'.",
      fr: "Je compare continuellement ma situation à un idéal inatteignable, me tourmentant en pensant à ce que je 'devrais' être ou accomplir.",
      es: "Comparo constantemente mi situación con un ideal perfecto, atormentándome con lo mucho mejor o más exitoso que 'debería' ser.",
    },
  },
  // 5. Depressive Symptom Replay
  {
    id: 5,
    subscale: "depressive_symptom_replay",
    text: {
      en: "When I feel down or lethargic, I sit alone analyzing how exhausted and unmotivated I feel, which drains whatever energy I had left.",
      id: "Saat merasa lelah atau murung, aku berdiam diri menganalisis betapa tidak termotivasinya aku, yang justru menguras habis sisa energi yang kupunya.",
      de: "Wenn ich niedergeschlagen bin, sitze ich da und grüble darüber nach, wie erschöpft ich bin, was mir die letzte Energie raubt.",
      fr: "Quand je n'ai pas le moral, je reste assis à disséquer mon manque d'énergie et de motivation, ce qui m'épuise encore davantage.",
      es: "Cuando me siento desanimado, me quedo sentado analizando lo agotado y desmotivado que estoy, consumiendo la poca energía que me quedaba.",
    },
  },
  // 6. Abstract Analytical Paralysis
  {
    id: 6,
    subscale: "abstract_analytical_paralysis",
    text: {
      en: "I believe that if I just keep thinking and over-analyzing long enough, I will eventually 'figure out' my emotional flaws and fix myself.",
      id: "Aku yakin bahwa jika aku terus berpikir dan menganalisis cukup lama, aku akhirnya akan 'menemukan formula' untuk memperbaiki cacat emosional diriku.",
      de: "Ich glaube insgeheim, dass ich meine Schwächen nur lange genug zerdenken muss, um endlich eine Lösung für mich selbst zu finden.",
      fr: "Je suis persuadé que si j'analyse mes pensées assez longtemps, je finirai par 'comprendre la formule' pour réparer mes failles émotionnelles.",
      es: "Creo que si sigo dándole vueltas a la cabeza el tiempo suficiente, lograré descifrar mis defectos emocionales y arreglar mi vida.",
    },
  },
  // 7. Brooding & Self-Criticism
  {
    id: 7,
    subscale: "brooding_self_criticism",
    text: {
      en: "I replay criticisms or perceived rejections from others for days, convincing myself that it proves I am fundamentally inadequate.",
      id: "Aku memutar kritik atau penolakan orang lain selama berhari-hari, meyakinkan diriku bahwa itu membuktikan aku memang cacat dan tidak berharga.",
      de: "Ich kaue Kritik oder Zurückweisungen tagelang durch und rede mir ein, dass dies meine grundlegende Unzulänglichkeit beweist.",
      fr: "Je ressasse les critiques ou rejets pendant des jours, me persuadant qu'ils confirment mon insuffisance fondamentale.",
      es: "Doy vueltas a las críticas o rechazos durante días, convenciéndome de que demuestran mi profunda incompetencia o falta de valor.",
    },
  },
  // 8. Depressive Symptom Replay
  {
    id: 8,
    subscale: "depressive_symptom_replay",
    text: {
      en: "I isolate myself when upset to 'think things through', but instead of finding peace, I spiral into an even darker mood.",
      id: "Aku mengisolasi diri saat sedih dengan alasan 'ingin berpikir tenang', namun bukannya merasa lega, aku justru tersedot ke pusaran suasana hati yang lebih kelam.",
      de: "Ich ziehe mich zurück, um 'in Ruhe nachzudenken', doch statt Klarheit gerate ich in eine noch dunklere Gedankenspirale.",
      fr: "Je m'isole pour 'faire le point' quand ça ne va pas, mais au lieu de m'apaiser, je sombre dans une spirale émotionnelle encore plus noire.",
      es: "Me aíslo cuando estoy triste para 'reflexionar', pero en lugar de hallar calma, me hundo en una espiral mental aún más sombría.",
    },
  },
  // 9. Abstract Analytical Paralysis
  {
    id: 9,
    subscale: "abstract_analytical_paralysis",
    text: {
      en: "I spend hours deliberating about why I cannot take action, analyzing my procrastination rather than taking a single concrete step.",
      id: "Aku menghabiskan waktu berjam-jam meratapi kenapa aku tidak bisa bertindak, menganalisis rasa malasku daripada mengambil satu langkah nyata kecil.",
      de: "Ich verbringe Stunden damit zu analysieren, warum ich nicht ins Handeln komme, statt einfach einen einzigen kleinen Schritt zu tun.",
      fr: "Je passe des heures à décortiquer pourquoi je n'arrive pas à agir, analysant ma procrastination au lieu de faire un seul petit pas concret.",
      es: "Paso horas analizando por qué no puedo actuar, disecando mi procrastinación en lugar de dar un simple paso práctico.",
    },
  },
  // 10. Brooding & Self-Criticism
  {
    id: 10,
    subscale: "brooding_self_criticism",
    text: {
      en: "I feel resentful and ask myself: 'Why do others seem to navigate life and hardships so effortlessly while I struggle with everything?'",
      id: "Aku merasa getir dan bertanya pada diri sendiri: 'Kenapa orang lain tampak menjalani hidup begitu mudah sementara aku harus berjuang mati-matian dalam segala hal?'",
      de: "Ich empfinde Bitterkeit und frage mich: 'Warum fällt anderen das Leben so leicht, während ich an den einfachsten Dingen verzweifle?'",
      fr: "J'éprouve du ressentiment et me demande : 'Pourquoi les autres réussissent-ils si facilement alors que chaque épreuve est un combat pour moi ?'",
      es: "Siento amargura y me pregunto: '¿Por qué a los demás la vida les resulta tan fluida mientras yo tropiezo con todo?'",
    },
  },
  // 11. Depressive Symptom Replay
  {
    id: 11,
    subscale: "depressive_symptom_replay",
    text: {
      en: "Late at night or during idle moments, my mind automatically drifts back to past regrets and unhealed wounds without my permission.",
      id: "Saat larut malam atau waktu luang, pikiranku secara otomatis melayang kembali ke penyesalan masa lalu dan luka lama tanpa seizinku.",
      de: "Spät nachts oder im Leerlauf wandern meine Gedanken unweigerlich zu alten Reuen und seelischen Wunden zurück.",
      fr: "Tard le soir ou pendant les temps morts, mon esprit dérive automatiquement vers mes regrets et mes blessures passées.",
      es: "A altas horas de la noche o en momentos de calma, mi mente viaja sola hacia viejos arrepentimientos y heridas pasadas sin mi permiso.",
    },
  },
  // 12. Abstract Analytical Paralysis
  {
    id: 12,
    subscale: "abstract_analytical_paralysis",
    text: {
      en: "Even when I know what needs to be done, my brain keeps demanding 'more analysis' and 'more certainty', freezing me in mental rumination.",
      id: "Bahkan ketika aku tahu apa yang harus dilakukan, otakku terus menuntut 'analisis lebih lanjut' dan 'kepastian mutlak', membuatku lumpuh dalam overthinking.",
      de: "Selbst wenn ich weiß, was zu tun ist, verlangt mein Verstand nach 'mehr Analyse' und lähmt mich in stundenlangem Grübeln.",
      fr: "Même quand je sais exactement quoi faire, mon cerveau exige 'plus d'analyse' et 'plus de certitude', me paralysant dans la rumination.",
      es: "Incluso sabiendo qué debería hacer, mi cerebro sigue exigiendo 'más análisis' y 'certeza absoluta', bloqueándome en una rumiación estéril.",
    },
  },
];

export const RUMINATION_OPTIONS = [
  {
    value: 0,
    label: {
      en: "Almost Never / Not at all (Mind stays present or problem-solves)",
      id: "Hampir Tidak Pernah (Pikiran fokus pada saat ini atau langsung cari solusi)",
      de: "Fast nie / Gar nicht (Bleibt im Hier und Jetzt oder lösungsorientiert)",
      fr: "Presque jamais (L'esprit reste ancré dans le présent ou agit)",
      es: "Casi nunca (Mente presente o enfocada en soluciones concretas)",
    },
  },
  {
    value: 1,
    label: {
      en: "Sometimes / Mild (Occasional overthinking, quickly redirects to action)",
      id: "Kadang-kadang / Ringan (Sesekali overthinking, tapi bisa segera dialihkan)",
      de: "Manchmal / Mild (Gelegentliches Grübeln, kann schnell umlenken)",
      fr: "Parfois / Léger (Ruminations passagères vite redirigées)",
      es: "A veces / Leve (Rumiación ocasional fácil de reconducir)",
    },
  },
  {
    value: 2,
    label: {
      en: "Often / Moderate (Noticeable mental loops, dwelling on mistakes for hours)",
      id: "Sering / Sedang (Sering terjebak overthinking, meratapi kesalahan selama berjam-jam)",
      de: "Oft / Moderat (Spürbare Gedankenschleifen, stundenlanges Hadern)",
      fr: "Souvent / Modéré (Boucles mentales fréquentes, rumine des heures)",
      es: "A menudo / Moderado (Bucles mentales habituales, horas dando vueltas a los errores)",
    },
  },
  {
    value: 3,
    label: {
      en: "Almost Always / Severe (Chronic paralyzing brooding, severe mental exhaustion)",
      id: "Hampir Selalu / Parah (Ruminasi kronis melumpuhkan, sangat menguras mental)",
      de: "Fast immer / Schwer (Chronisches, lähmendes Grübeln, mentale Erschöpfung)",
      fr: "Presque toujours / Sévère (Broiement du noir paralysant, épuisement cognitif)",
      es: "Casi siempre / Severo (Rumiación crónica paralizante, agotamiento mental extremo)",
    },
  },
];

export const RUMINATION_RESULTS: RuminationResultLevel[] = [
  {
    level: "constructive_reflective_clarity",
    scoreRange: [0, 7],
    title: {
      en: "Constructive Reflective Clarity (Adaptive Processing)",
      id: "Kejernihan Refleksi Konstruktif (Pemrosesan Adaptif)",
      de: "Konstruktive Reflexionsklarheit (Adaptives Denken)",
      fr: "Clarté Réflexive Constructive (Traitement Adaptatif)",
      es: "Claridad Reflexiva Constructiva (Procesamiento Adaptativo)",
    },
    badge: {
      en: "Adaptive Clarity (0-19%)",
      id: "Refleksi Adaptif (0-19%)",
      de: "Adaptive Klarheit",
      fr: "Clarté Adaptative",
      es: "Claridad Adaptativa",
    },
    summary: {
      en: "You possess healthy cognitive flexibility. When difficulties arise, you engage in constructive problem-solving rather than getting trapped in self-blaming brooding or abstract 'Why' spirals. You allow unpleasant emotions to pass without feeding them infinite mental loops.",
      id: "Kamu memiliki fleksibilitas kognitif yang sangat sehat. Ketika menghadapi masalah, kamu terlibat dalam pemecahan masalah konkret alih-alih terjebak dalam pusaran menyalahkan diri atau pertanyaan abstrak 'Kenapa'. Kamu membiarkan emosi tidak nyaman lewat tanpa memberinya makan dengan overthinking tanpa henti.",
      de: "Sie besitzen eine ausgeprägte kognitive Flexibilität. Bei Problemen greifen Sie zu konkreten Lösungen, anstatt in lähmendem Selbstvorwurf oder endlosen 'Warum'-Schleifen zu versinken. Sie lassen Gefühle da sein, ohne sie gedanklich zu verfestigen.",
      fr: "Vous faites preuve d'une excellente flexibilité cognitive. Face aux obstacles, vous vous orientez vers l'action concrète plutôt que de vous enfermer dans l'autocritique stérile. Vous accueillez les émotions désagréables sans les nourrir de boucles mentales infinies.",
      es: "Posees una notable flexibilidad cognitiva. Ante las dificultades, recurres a la resolución práctica de problemas en lugar de hundirte en la culpa o en espirales de '¿por qué a mí?'. Permites que las emociones pasen sin alimentarlas con bucles infinitos.",
    },
    psychology: {
      en: "Dr. Susan Nolen-Hoeksema's RRS framework (1991, 2003) distinguishes between destructive brooding and adaptive reflection. Your score demonstrates high concrete-operational thinking (Watkins, 2008), which protects against depressive escalation.",
      id: "Kerangka RRS Dr. Susan Nolen-Hoeksema (1991, 2003) membedakan antara brooding yang merusak dan refleksi adaptif. Skormu menunjukkan pemikiran operasional-konkret yang tinggi (Watkins, 2008), yang melindungi diri dari eskalasi depresi.",
      de: "Nolen-Hoeksemas RRS-Forschung: Sie nutzen adaptive Selbstreflexion statt destruktiven Grübelns. Watkins' Modell konkreter Verarbeitung schützt Sie vor depressiven Spiralen.",
      fr: "Modèle RRS de Nolen-Hoeksema : Vous pratiquez la réflexion constructive plutôt que le ressassement destructeur. Votre ancrage concret vous prémunit contre l'escalade dépressive.",
      es: "Modelo RRS de Nolen-Hoeksema: Practicas la reflexión adaptativa en lugar del broiement destructivo. El procesamiento concreto de Watkins te protege de bucles depresivos.",
    },
    actionProtocol: {
      en: [
        "Maintain your habit of focusing on concrete next steps ('How can I solve this?') rather than abstract evaluation ('Why am I like this?').",
        "Continue using behavioral activation: moving your body and engaging with the physical environment when mild mental heaviness arises.",
        "Celebrate your resilience in treating mistakes as learning data points rather than permanent personal indictments.",
      ],
      id: [
        "Pertahankan kebiasaan fokus pada langkah konkret ('Bagaimana cara menyelesaikannya?') daripada evaluasi abstrak ('Kenapa aku seperti ini?').",
        "Lanjutkan aktivasi perilaku: gerakkan tubuh dan berinteraksi dengan lingkungan fisik saat pikiran mulai terasa berat.",
        "Rayakan ketangguhanmu dalam memperlakukan kesalahan sebagai data belajar, bukan vonis atas nilai dirimu.",
      ],
      de: [
        "Behalten Sie Ihren Fokus auf konkrete nächste Schritte ('Wie löse ich das?') statt abstrakter Urteile ('Warum bin ich so?') bei.",
        "Nutzen Sie weiterhin Verhaltensaktivierung: Bewegung und frische Luft bei aufkommender mentaler Schwere.",
        "Feiern Sie Ihre Stärke, Fehler als Feedback zu sehen und nicht als Urteil über Ihren Wert.",
      ],
      fr: [
        "Conservez votre réflexe d'action concrète ('Comment résoudre cela ?') plutôt que l'auto-jugement ('Pourquoi suis-je ainsi ?').",
        "Poursuivez l'activation comportementale : bouger son corps et s'ancrer dans le monde réel dès qu'une lourdeur pointe.",
        "Considérez vos faux pas comme des données d'apprentissage et non comme une condamnation personnelle.",
      ],
      es: [
        "Mantén tu enfoque en pasos prácticos ('¿Cómo lo resuelvo?') en vez de juzgarte ('¿Por qué soy así?').",
        "Sigue aplicando la activación conductual: mover el cuerpo y conectar con el entorno cuando surja pesadez mental.",
        "Valora tu capacidad de ver los errores como información valiosa y no como fallas de tu identidad.",
      ],
    },
  },
  {
    level: "mild_situational_overthinking",
    scoreRange: [8, 14],
    title: {
      en: "Mild Situational Overthinking (Occasional Hesitation)",
      id: "Overthinking Situasional Ringan (Keraguan Sesekali)",
      de: "Milde situative Grübelneigung (Gelegentliches Hadern)",
      fr: "Ruminations Situationnelles Légères (Hésitations Ponctuelles)",
      es: "Rumiación Situacional Leve (Dudas Ocasionales)",
    },
    badge: {
      en: "Mild Overthinking (20-39%)",
      id: "Overthinking Ringan (20-39%)",
      de: "Mildes Grübeln",
      fr: "Ruminations Légères",
      es: "Rumiación Leve",
    },
    summary: {
      en: "You experience occasional bouts of brooding, particularly after social stress, perceived blunders, or when fatigue strikes. While it occasionally delays sleep or drains focus, you still retain the ability to pull yourself out of the mental whirlpool once a clear action plan emerges.",
      id: "Kamu mengalami episode overthinking sesekali, terutama setelah stres sosial, melakukan kesalahan kecil, atau saat tubuh kelelahan. Meskipun terkadang menunda tidur atau menguras fokus, kamu masih memiliki kemampuan untuk keluar dari pusaran pikiran begitu rencana tindakan jelas terbentuk.",
      de: "Sie erleben gelegentliche Grübelphasen, vor allem nach sozialem Stress, Missgeschicken oder bei Erschöpfung. Obwohl dies zeitweise den Schlaf verzögert, finden Sie meist wieder den Weg ins Handeln zurück.",
      fr: "Vous traversez des phases de rumination passagères, surtout après des tensions sociales ou en état de fatigue. Bien que cela retarde parfois l'endormissement, vous parvenez encore à reprendre le dessus dès qu'un plan se dessine.",
      es: "Experimentas brotes ocasionales de rumiación, sobre todo tras momentos de tensión social o cansancio. Aunque a veces te quita el sueño o la concentración, conservas la capacidad de salir del bucle en cuanto decides actuar.",
    },
    psychology: {
      en: "RRS Brooding Subscale analysis indicates transient cognitive reactivity. The mind treats uncertainty as a problem requiring internal calculation rather than immediate physiological grounding.",
      id: "Analisis Subskala Brooding RRS menunjukkan reaktivitas kognitif transien. Otak memperlakukan ketidakpastian sebagai soal matematika mental yang harus dihitung, bukan sinyal untuk menenangkan sistem saraf.",
      de: "RRS-Brooding-Analyse: Vorübergehende kognitive Reaktivität. Ihr Gehirn versucht Unsicherheit durch endloses Durchdenken zu kontrollieren.",
      fr: "Sous-échelle de brooding de la RRS : Réactivité cognitive transitoire. Le cerveau tente de contrôler l'incertitude par le calcul mental plutôt que par l'apaisement corporel.",
      es: "Subescala de Brooding de la RRS: Reactividad cognitiva transitoria. El cerebro intenta resolver la incertidumbre pensando más en vez de calmar el cuerpo.",
    },
    actionProtocol: {
      en: [
        "Implement the '15-Minute Worry Window': Schedule a daily dedicated time to write down worries, leaving the rest of the day free from passive brooding.",
        "Shift from 'Why' to 'What': Replace questions like 'Why did I say that?' with 'What is one concrete thing I can do right now?'.",
        "Interrupt evening loops with sensory grounding (cold water on face, bilateral music, physical stretching).",
      ],
      id: [
        "Terapkan 'Jendela Khawatir 15 Menit': Jadwalkan waktu harian khusus untuk menuliskan semua kekhawatiran di kertas, dan bebaskan sisa hari dari overthinking pasif.",
        "Ubah 'Kenapa' menjadi 'Apa': Ganti pertanyaan seperti 'Kenapa aku ngomong begitu?' menjadi 'Apa satu hal konkret yang bisa kulakukan sekarang?'.",
        "Putus loop pikiran malam hari dengan stimulasi sensori fisik (cuci muka air dingin, musik bilateral, peregangan tubuh).",
      ],
      de: [
        "Führen Sie ein '15-Minuten-Grübelfenster' ein: Notieren Sie Sorgen nur zu einer festgelegten Tageszeit schriftlich.",
        "Wechseln Sie von 'Warum' zu 'Was': Ersetzen Sie 'Warum habe ich das getan?' durch 'Was kann ich jetzt konkret tun?'.",
        "Unterbrechen Sie abendliche Schleifen durch sensorische Erdung (kaltes Wasser, Dehnen, Spaziergang).",
      ],
      fr: [
        "Mettez en place la 'fenêtre d'inquiétude de 15 minutes' : notez vos soucis par écrit à heure fixe et libérez le reste de votre journée.",
        "Basculez du 'Pourquoi' au 'Quoi' : remplacez 'Pourquoi ai-je dit ça ?' par 'Quelle est la prochaine action concrète ?'.",
        "Rompez les boucles du soir avec un ancrage sensoriel (eau fraîche sur le visage, étirements, musique apaisante).",
      ],
      es: [
        "Aplica la 'Ventana de Preocupación de 15 minutos': anota tus dudas en un horario fijo y suelta el resto del día.",
        "Cambia el '¿Por qué?' por '¿Qué?': sustituye '¿Por qué dije eso?' por '¿Qué acción concreta puedo dar ahora?'.",
        "Corta los bucles nocturnos con anclaje sensorial (agua fría en la cara, estiramientos suaves, música relajante).",
      ],
    },
  },
  {
    level: "moderate_ruminative_brooding",
    scoreRange: [15, 21],
    title: {
      en: "Moderate Ruminative Brooding (Repetitive Mental Loops)",
      id: "Ruminasi Brooding Sedang (Pusaran Pikiran Berulang)",
      de: "Moderates Grübelmuster (Wiederkehrende Denkschleifen)",
      fr: "Ruminations Modérées (Boucles Mentales Répétitives)",
      es: "Rumiación Moderada (Bucles Mentales Persistentes)",
    },
    badge: {
      en: "Moderate Brooding (40-59%)",
      id: "Ruminasi Sedang (40-59%)",
      de: "Moderates Grübeln",
      fr: "Ruminations Modérées",
      es: "Rumiación Moderada",
    },
    summary: {
      en: "You spend significant daily energy replaying past interpersonal friction, dissecting your shortcomings, and getting trapped in unproductive 'Why me?' questions. This brooding mimics problem-solving but actually paralyzes action, deepens low mood, and impairs executive function and concentration.",
      id: "Kamu menghabiskan energi harian yang signifikan untuk memutar ulang gesekan sosial masa lalu, membedah kekurangan diri, dan terjebak dalam pertanyaan 'Kenapa aku?'. Brooding semacam ini menyamar seolah-olah kamu sedang mencari solusi, padahal sebenarnya melumpuhkan tindakan nyata, memperparah suasana hati murung, dan mengikis konsentrasi.",
      de: "Sie investieren täglich viel Energie in das Wiederholen vergangener Konflikte und das Sezieren eigener Schwächen. Dieses Grübeln erweckt die Illusion von Problemlösung, führt jedoch in Wahrheit zu Handlungsblockaden, getrübter Stimmung und mentaler Erschöpfung.",
      fr: "Vous consommez une énergie précieuse à ressasser d'anciens conflits et à disséquer vos erreurs. Ce broiement du noir donne l'illusion de réfléchir à des solutions, mais il paralyse en réalité l'action, entretient l'humeur maussade et altère votre concentration.",
      es: "Inviertes gran parte de tu energía diaria en rememorar fricciones pasadas y diseccionar tus defectos. Esta rumiación simula una búsqueda de soluciones, pero en realidad bloquea la iniciativa, intensifica el desánimo y desgasta tu capacidad de concentración.",
    },
    psychology: {
      en: "According to Treynor et al. (2003), the 'Brooding' factor of the RRS strongly correlates with vulnerability to clinical depression. It involves a passive comparison of one's current state with an unachieved standard, generating chronic emotional distress.",
      id: "Menurut Treynor et al. (2003), faktor 'Brooding' dalam RRS berkorelasi kuat dengan kerentanan terhadap depresi klinis. Ini melibatkan perbandingan pasif keadaan saat ini dengan standar yang tak tercapai, menimbulkan penderitaan emosional kronis.",
      de: "Treynor et al. (2003): Der Brooding-Faktor korreliert stark mit depressiver Vulnerabilität. Passives Vergleichen mit unerreichbaren Idealen schürt chronischen seelischen Schmerz.",
      fr: "Étude de Treynor et al. (2003) : Le facteur 'Brooding' est directement lié à la vulnérabilité dépressive. Il s'agit d'une comparaison passive et culpabilisante entre l'état actuel et un idéal inatteignable.",
      es: "Treynor et al. (2003): El factor de 'Brooding' se asocia fuertemente con la vulnerabilidad depresiva. Consiste en comparar pasivamente la situación real con un estándar ideal inalcanzable.",
    },
    actionProtocol: {
      en: [
        "Notice the 'Pseudo-Problem-Solving Illusion': Acknowledge that rumination is NOT problem-solving; real problem-solving results in concrete outward action within 5 minutes.",
        "Practice Watkins' Concrete Level Processing: Whenever you catch yourself asking 'Why did this happen?', force yourself to describe 'How did it physically unfold? What can be seen, heard, or measured?'.",
        "Disrupt the default mode network (DMN) with high-intensity physical tasks: brisk walking, weight lifting, or hands-on crafting.",
      ],
      id: [
        "Kenali 'Ilusi Solusi Semu': Sadari bahwa ruminasi BUKAN pemecahan masalah; solusi nyata selalu menghasilkan tindakan fisik konkret dalam waktu 5 menit.",
        "Gunakan Pemrosesan Tingkat Konkret Watkins: Setiap kali kamu memergoki diri bertanya 'Kenapa ini terjadi?', paksa diri mendeskripsikan 'Bagaimana proses fisiknya? Apa fakta yang bisa dilihat dan diukur?'.",
        "Putus Default Mode Network (DMN) otak dengan aktivitas fisik berintensitas nyata: jalan cepat, angkat beban, atau merapikan meja kerja secara fisik.",
      ],
      de: [
        "Entlarven Sie die Grübel-Illusion: Grübeln ist KEINE Problemlösung. Echte Lösungen führen innerhalb von 5 Minuten zu konkreten Taten.",
        "Watkins' konkrete Verarbeitung: Wechseln Sie von 'Warum' zu 'Wie ist es abgelaufen? Welche konkreten Fakten liegen vor?'.",
        "Unterbrechen Sie das Grübelnetzwerk (DMN) durch intensive körperliche Aktivität: Krafttraining, zügiges Gehen oder Handwerk.",
      ],
      fr: [
        "Démasquez l'illusion du faux raisonnement : Ruminer n'est PAS résoudre un problème. Une vraie solution génère une action dans les 5 minutes.",
        "Appliquez le traitement concret de Watkins : Remplacez 'Pourquoi est-ce arrivé ?' par 'Comment cela s'est-il déroulé factuellement ?'.",
        "Désactivez le réseau du mode par défaut (DMN) par une activité physique vigoureuse : marche rapide, sport ou tâches manuelles.",
      ],
      es: [
        "Desmonta la ilusión de falsa solución: Rumiar NO es resolver. Una solución real produce una acción visible en menos de 5 minutos.",
        "Aplica el procesamiento concreto de Watkins: Cambia el '¿Por qué ocurrió?' por '¿Cómo sucedió paso a paso y qué hechos puedo comprobar?'.",
        "Desconecta la red neuronal por defecto con esfuerzo físico directo: caminata rápida, ejercicio de fuerza o actividades manuales.",
      ],
    },
  },
  {
    level: "high_dysfunctional_rumination_loop",
    scoreRange: [22, 28],
    title: {
      en: "High Dysfunctional Rumination (Paralyzing Mental Loop)",
      id: "Ruminasi Disfungsional Tinggi (Jebakan Pikiran Melumpuhkan)",
      de: "Hohe dysfunktionale Grübelschleife (Lähmendes Gedankenkreisen)",
      fr: "Forte Rumination Dysfonctionnelle (Enfermement Mental Paralysant)",
      es: "Rumiación Disfuncional Elevada (Bucle Mental Paralizante)",
    },
    badge: {
      en: "High Rumination Loop (60-79%)",
      id: "Ruminasi Tinggi (60-79%)",
      de: "Starkes Grübeln",
      fr: "Forte Rumination",
      es: "Rumiación Alta",
    },
    summary: {
      en: "Your brain is chronically trapped in perseverative cognition. You constantly dissect your perceived flaws, replay past humiliations, and dread future inadequacies. This exhaustive mental spinning locks you in cognitive fatigue, severely damages your sleep, and robs you of your presence in daily life and relationships.",
      id: "Otakmu terperangkap secara kronis dalam perseverative cognition (kognisi berulang tanpa henti). Kamu terus-menerus membedah cacat diri, memutar ulang rasa malu masa lalu, dan mencemaskan ketidakmampuan di masa depan. Putaran mental yang melelahkan ini mengunci kamu dalam kelelahan kognitif, merusak tidur, dan merenggut kehadiranmu dari kehidupan nyata.",
      de: "Ihr Gehirn befindet sich in einer chronischen perseverativen Denkschleife. Sie sezieren unablässig eigene Unzulänglichkeiten, durchleben alte Demütigungen neu und fürchten zukünftiges Scheitern. Dieses gedankliche Hamsterrad raubt Ihnen Schlaf, Vitalität und geistige Klarheit.",
      fr: "Votre esprit est piégé dans une cognition persévérante chronique. Vous disséquez sans cesse vos faiblesses, revivez d'anciennes humiliations et anticipez l'échec. Ce tourbillon mental permanent provoque une fatigue cognitive intense, détériore votre sommeil et vous coupe du monde réel.",
      es: "Tu mente se encuentra atrapada en una cognición perseverativa crónica. Diseccionas sin parar tus fallos, revives humillaciones pasadas y temes no dar la talla en el futuro. Este torbellino mental te agota, arruina tu descanso y te desconecta del presente.",
    },
    psychology: {
      en: "Susan Nolen-Hoeksema's landmark research demonstrates that high brooding maintains and deepens depressive affect by impairing working memory, enhancing negative memory recall, and eroding social support through chronic reassurance-seeking.",
      id: "Riset penting Dr. Susan Nolen-Hoeksema membuktikan bahwa brooding tingkat tinggi memperdalam afek depresi dengan merusak memori kerja, mempertajam ingatan negatif, dan mengikis dukungan sosial akibat pencarian validasi berulang.",
      de: "Nolen-Hoeksemas Pionierarbeit belegt: Starkes Grübeln vertieft Depressionen, indem es das Arbeitsgedächtnis blockiert, negative Erinnerungen bevorzugt abruft und das soziale Umfeld erschöpft.",
      fr: "Les travaux de référence de Nolen-Hoeksema prouvent que le ressassement aggrave les états dépressifs en surchargeant la mémoire de travail, en biaisant les souvenirs négatifs et en épuisant l'entourage.",
      es: "Las investigaciones de Nolen-Hoeksema demuestran que la rumiación intensa perpetúa la depresión al saturar la memoria de trabajo, sesgar los recuerdos hacia lo negativo y desgastar las relaciones personales.",
    },
    actionProtocol: {
      en: [
        "Externalize the Internal Dialogue: Force your ruminative thoughts onto physical paper. Seeing them in ink exposes their repetitive, circular, and irrational nature.",
        "Enforce the '5-Second Rule' & Sensory Shock: The instant you catch yourself looping, physically stand up, count backwards 5-4-3-2-1, and physically interact with an object in the room.",
        "Practice 'Defusion' from ACT (Acceptance and Commitment Therapy): Say out loud: 'I notice I am having the thought that I am behind in life,' creating separation between you and the thought.",
        "Consider Cognitive Behavioral Therapy (CBT) or Rumination-Focused CBT (RFCBT) with a licensed professional to retrain mental habits.",
      ],
      id: [
        "Keluarkan Monolog Internal ke Kertas: Tuliskan pikiran ruminasi secara fisik di kertas. Melihatnya tertulis dengan tinta akan membuka mata betapa repetitif dan tidak rasionalnya lingkaran tersebut.",
        "Gunakan 'Aturan 5 Detik' & Interupsi Fisik: Saat menyadari mulai terjebak loop, segera berdiri, hitung mundur 5-4-3-2-1, dan sentuh benda fisik di sekitarmu.",
        "Latih 'Defusi Kognitif' dari ACT: Ucapkan dengan lantang: 'Aku menyadari otakku sedang memproduksi pikiran bahwa aku tertinggal,' untuk memisahkan dirimu dari pikiran tersebut.",
        "Pertimbangkan Terapi Kognitif Perilaku Berfokus Ruminasi (RFCBT) dengan psikolog klinis untuk melatih ulang respons otomatis otakmu.",
      ],
      de: [
        "Gedanken aufs Papier bringen: Schreiben Sie die Grübelschleifen handschriftlich auf. Erst schwarz auf weiß wird ihre monotone Kreisstruktur sichtbar.",
        "Die 5-Sekunden-Regel & physischer Stopp: Sobald Sie das Kreisen bemerken, stehen Sie auf, zählen 5-4-3-2-1 rückwärts und berühren Sie einen Gegenstand im Raum.",
        "Kognitive Defusion (ACT): Sagen Sie laut: 'Ich bemerke gerade den Gedanken, dass ich versagt habe.' Das schafft heilsame Distanz.",
        "Ziehen Sie Ruminations-fokussierte Verhaltenstherapie (RFCBT) bei einem Psychotherapeuten in Betracht.",
      ],
      fr: [
        "Externalisez vos pensées sur papier : Écrivez vos ruminations à la main pour constater immédiatement leur caractère circulaire et répétitif.",
        "Règle des 5 secondes et rupture physique : Dès que la boucle démarre, levez-vous, comptez 5-4-3-2-1 et touchez un objet concret autour de vous.",
        "Pratiquez la défusion cognitive (ACT) : Dites à voix haute : 'Je remarque que mon esprit produit la pensée que je n'y arriverai pas'.",
        "Envisagez une thérapie cognitive basée sur la rumination (RFCBT) auprès d'un psychologue clinicien.",
      ],
      es: [
        "Externaliza el monólogo en papel: Escribe a mano tus pensamientos repetitivos para evidenciar su naturaleza circular y estéril.",
        "Aplica la regla de los 5 segundos e interrupción física: Al notar el bucle, ponte de pie, cuenta 5-4-3-2-1 y toca un objeto real de la habitación.",
        "Practica la defusión cognitiva (ACT): Di en voz alta: 'Observo que mi mente está generando el pensamiento de que he fracasado'.",
        "Valora consultar a un terapeuta especializado en Terapia Cognitiva Centrada en la Rumiación (RFCBT).",
      ],
    },
  },
  {
    level: "acute_depressive_brooding_cascade",
    scoreRange: [29, 36],
    title: {
      en: "Acute Depressive Brooding Cascade (Cognitive Exhaustion)",
      id: "Kaskade Ruminasi Depresif Akut (Kelelahan Kognitif Berat)",
      de: "Akute depressive Grübelkaskade (Kognitive Erschöpfung)",
      fr: "Cascade de Rumination Dépressive Aiguë (Épuisement Cognitif)",
      es: "Cascada de Rumiación Depresiva Aguda (Agotamiento Cognitivo)",
    },
    badge: {
      en: "Acute Brooding Cascade (80-100%)",
      id: "Kaskade Ruminasi Akut (80-100%)",
      de: "Akute Grübelkaskade",
      fr: "Cascade Dépressive Aiguë",
      es: "Cascada de Rumiación Aguda",
    },
    summary: {
      en: "You are engulfed in an intense, relentless ruminative storm that paralyzes your decision-making, shatters emotional resilience, and fuels overwhelming despair. The continuous mental replay of perceived flaws and hopeless 'Why' questions has depleted your neurotransmitters, rendering spontaneous joy and practical action nearly impossible.",
      id: "Kamu sedang tenggelam dalam badai ruminasi tanpa henti yang melumpuhkan kemampuan mengambil keputusan, menghancurkan ketahanan emosional, dan memicu keputusasaan mendalam. Pemutaran ulang kekurangan diri secara non-stop dan pertanyaan 'Kenapa' yang tanpa jalan keluar telah menguras energi mentalmu hingga membuat kegembiraan spontan dan tindakan nyata terasa mustahil.",
      de: "Sie befinden sich in einem akuten, unaufhörlichen Grübelsturm, der jede Entschlusskraft lähmt, Ihre seelische Widerstandskraft bricht und tiefe Verzweiflung nährt. Das ununterbrochene gedankliche Wiederkäuen von Mängeln hat Ihre mentalen Reserven vollständig erschöpft.",
      fr: "Vous êtes pris au piège d'une tempête de ruminations dépressives incessantes qui paralyse vos décisions, brise votre résilience et alimente un désespoir profond. Ce ressassement perpétuel a vidé vos réserves cognitives, rendant l'action et la joie spontanée presque inaccessibles.",
      es: "Te encuentras inmerso en una tormenta de rumiación incesante que anula tu capacidad de decisión, quebranta tu resistencia emocional y nutre una profunda desesperanza. El continuo reproche mental ha agotado por completo tus reservas cognitivas.",
    },
    psychology: {
      en: "Edward Watkins' RFCBT research and Nolen-Hoeksema's legacy reveal that acute brooding leads to cognitive narrowing, executive dysfunction, and severe depressive maintenance. The brain is locked in a hyperactive Default Mode Network (DMN) that cannot disengage without structured clinical intervention.",
      id: "Riset RFCBT Edward Watkins dan warisan riset Nolen-Hoeksema mengungkap bahwa brooding akut memicu penyempitan kognitif, disfungsi eksekutif, dan pemeliharaan depresi berat. Otak terkunci dalam Default Mode Network (DMN) hiperaktif yang sulit lepas tanpa intervensi klinis terstruktur.",
      de: "Watkins' RFCBT-Forschung & Nolen-Hoeksema: Akutes Grübeln führt zu kognitiver Verengung und exekutiver Dysfunktion. Das Ruhezustandsnetzwerk (DMN) läuft im roten Bereich und erfordert gezielte therapeutische Entlastung.",
      fr: "Recherches de Watkins et Nolen-Hoeksema : La rumination aiguë entraîne un rétrécissement cognitif et un blocage exécutif. Le réseau par défaut cérébral tourne à plein régime et nécessite une aide thérapeutique structurée.",
      es: "Investigaciones de Watkins y Nolen-Hoeksema: La rumiación aguda genera bloqueo ejecutivo y estrechamiento cognitivo. La red neuronal por defecto está sobreactivada y requiere apoyo terapéutico profesional.",
    },
    actionProtocol: {
      en: [
        "Immediate Compassionate Ceasefire: Recognize that your brain is suffering from biological exhaustion, not a lack of willpower. Stop demanding that you 'think your way out' of overthinking.",
        "Radical Physical Immersion: Engage in intense physical sensations (taking a cold shower, brisk outdoor walk in nature, tactile weighted blankets) to forcefully draw blood flow from the DMN back to somatic processing.",
        "Strict Limit on Solitary Overthinking: Do not allow yourself to sit alone in silence analyzing your sadness. Seek physical company, join public spaces, or speak aloud with a supportive friend.",
        "Clinical Consultation: Strongly consider scheduling an appointment with a licensed clinical psychologist or psychiatrist specializing in Rumination-Focused Cognitive Behavioral Therapy (RFCBT) or ACT.",
      ],
      id: [
        "Gencatan Senjata Welas Asih Segera: Sadari bahwa otakmu sedang mengalami kelelahan biologis, bukan karena kamu lemah. Berhenti menuntut dirimu untuk 'berpikir' demi menyelesaikan overthinking.",
        "Imersi Fisik Radikal: Berikan stimulus fisik yang kuat (mandi air dingin, jalan kaki cepat di udara terbuka, selimut berbobot) untuk memindahkan aliran darah dari DMN kembali ke pemrosesan fisik sensorik.",
        "Batasan Ketat Menyendiri: Jangan biarkan dirimu duduk melamun sendirian menganalisis kesedihan. Beradalah di ruang publik, temui orang terpercaya, atau bicarakan isi hatimu secara verbal.",
        "Konsultasi Klinis: Sangat dianjurkan untuk berkonsultasi dengan psikolog klinis atau psikiater berlisensi dengan spesialisasi Terapi Kognitif Berfokus Ruminasi (RFCBT) atau ACT.",
      ],
      de: [
        "Sofortiger Waffenstillstand mit sich selbst: Erkennen Sie an, dass Ihr Gehirn biologisch überlastet ist. Versuchen Sie nicht länger, das Grübeln durch weiteres Nachdenken zu lösen.",
        "Radikale somatische Reize: Kalte Dusche, zügiger Waldspaziergang oder Gewichtsweste, um das Gehirn gewaltsam aus den Denkschleifen in den Körper zu holen.",
        "Keine isolierte Grübelzeit: Bleiben Sie nicht stundenlang allein im Zimmer sitzen. Suchen Sie die Nähe von Menschen oder belebten Orten.",
        "Professionelle Begleitung: Vereinbaren Sie zeitnah einen Termin bei einem Psychotherapeuten (Verhaltenstherapie/RFCBT).",
      ],
      fr: [
        "Cessez-le-feu immédiat : Admettez que votre cerveau est épuisé biologiquement et non par manque de volonté. Cessez de vouloir résoudre vos pensées en pensant davantage.",
        "Immersion sensorielle radicale : Douche froide, marche soutenue en extérieur ou couverture lestée pour ramener l'énergie cérébrale vers le corps.",
        "Rompre l'isolement : Ne restez pas seul à disséquer votre tristesse. Fréquentez des lieux vivants ou confiez-vous de vive voix à un proche bienveillant.",
        "Consultation spécialisée : Prenez rendez-vous avec un psychologue clinicien ou un psychiatre formé aux TCC centrées sur la rumination (RFCBT).",
      ],
      es: [
        "Tregua inmediata con uno mismo: Acepta que tu cerebro está agotado biológicamente. Deja de intentar resolver la rumiación pensando más.",
        "Inmersión sensorial radical: Ducha de agua fría, caminata rápida al aire libre o peso sobre el cuerpo para forzar a la mente a volver al plano físico.",
        "Rompe el aislamiento: Evita quedarte a solas analizando tu tristeza. Busca la presencia de personas de confianza o lugares concurridos.",
        "Consulta clínica: Considera con prioridad acudir a un psicólogo clínico especializado en Terapia Cognitiva Centrada en la Rumiación (RFCBT) o ACT.",
      ],
    },
  },
];

export const RUMINATION_SUBSCALE_INFO = {
  brooding_self_criticism: {
    name: {
      en: "Brooding & Self-Criticism",
      id: "Brooding & Kritik Diri Menghakimi",
      de: "Brooding & Selbstkritik",
      fr: "Broiement & Autocritique",
      es: "Brooding y Autocrítica Destructiva",
    },
    description: {
      en: "Passive, evaluative comparison of one's current state with unachieved ideals ('Why do I always mess up? What is wrong with me?').",
      id: "Perbandingan pasif dan menghakimi antara kondisi saat ini dengan standar ideal ('Kenapa aku selalu mengacaukan segalanya? Apa yang salah denganku?').",
      de: "Passiver, abwertender Vergleich des Ist-Zustands mit unerreichbaren Idealen ('Warum versage ich immer wieder?').",
      fr: "Comparaison passive et culpabilisante de son état avec un idéal inaccessible ('Pourquoi est-ce que j'échoue toujours ?').",
      es: "Comparación pasiva y culposa de la situación actual con un estándar inalcanzable ('¿Por qué siempre arruino todo?').",
    },
  },
  depressive_symptom_replay: {
    name: {
      en: "Depressive Symptom Replay",
      id: "Pemutaran Ulang Gejala & Luka Masa Lalu",
      de: "Wiederholung depressiver Symptome",
      fr: "Ressassement des Symptômes Dépressifs",
      es: "Repetición de Síntomas y Heridas Pasadas",
    },
    description: {
      en: "Obsessively dwelling on physical fatigue, sadness, and vividly replaying past embarrassing moments or painful rejections.",
      id: "Terobsesi meratapi rasa lelah, kesedihan, dan memutar ulang secara gamblang memori memalukan atau penolakan masa lalu.",
      de: "Zwanghaftes Kreisen um Müdigkeit, Traurigkeit und das lebhafte Wiedererleben peinlicher oder schmerzhafter Erinnerungen.",
      fr: "Fixation obsessionnelle sur la fatigue, la tristesse et le rejeu mental détaillé de souvenirs embarrassants ou blessants.",
      es: "Obsesión por la fatiga y la tristeza, reproduciendo con detalle recuerdos de rechazo o momentos vergonzosos del pasado.",
    },
  },
  abstract_analytical_paralysis: {
    name: {
      en: "Abstract Analytical Paralysis",
      id: "Kelumpuhan Analisis Abstrak",
      de: "Abstrakte analytische Lähmung",
      fr: "Paralysie Analytique Abstraite",
      es: "Parálisis Analítica Abstracta",
    },
    description: {
      en: "Getting lost in unanswerable, vague 'Why' questions without translating insights into single concrete actions or behavioral experiments.",
      id: "Tersesat dalam pertanyaan 'Kenapa' yang abstrak tanpa jalan keluar dan gagal menerjemahkan pemikiran menjadi satu tindakan fisik konkret.",
      de: "Sich in unbeantwortbaren, vagen 'Warum'-Fragen verlieren, ohne jemals in konkretes Handeln oder Experimentieren überzugehen.",
      fr: "S'enliser dans des 'Pourquoi' vagues et sans réponse, sans jamais transformer la pensée en une action concrète immédiate.",
      es: "Perderse en preguntas etéreas de '¿Por qué?' sin traducir jamás la reflexión en un paso práctico concreto.",
    },
  },
};

export function getRuminationResult(totalScore: number): RuminationResultLevel {
  const clamped = Math.max(0, Math.min(36, totalScore));
  return (
    RUMINATION_RESULTS.find(
      (r) => clamped >= r.scoreRange[0] && clamped <= r.scoreRange[1]
    ) || RUMINATION_RESULTS[0]
  );
}

export function calculateRuminationSubscales(answers: Record<number, number>): {
  brooding_self_criticism: number;
  depressive_symptom_replay: number;
  abstract_analytical_paralysis: number;
} {
  let bsc = 0;
  let dsr = 0;
  let aap = 0;

  RUMINATION_QUESTIONS.forEach((q) => {
    const score = answers[q.id] ?? 0;
    if (q.subscale === "brooding_self_criticism") bsc += score;
    if (q.subscale === "depressive_symptom_replay") dsr += score;
    if (q.subscale === "abstract_analytical_paralysis") aap += score;
  });

  return {
    brooding_self_criticism: bsc,
    depressive_symptom_replay: dsr,
    abstract_analytical_paralysis: aap,
  };
}
