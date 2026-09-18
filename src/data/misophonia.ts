export type MisophoniaCardLang = "en" | "id" | "de" | "fr" | "es";

export interface MisophoniaQuestion {
  id: number;
  subscale:
    | "orofacial_trigger_reactivity"
    | "autonomic_rage_panic_surge"
    | "anticipatory_social_avoidance";
  text: Record<MisophoniaCardLang, string>;
}

export interface MisophoniaResultLevel {
  level:
    | "sound_tolerant_baseline"
    | "mild_auditory_irritation"
    | "moderate_misophonic_distress"
    | "severe_sound_rage_impairment"
    | "acute_misophonic_agony";
  scoreRange: [number, number];
  title: Record<MisophoniaCardLang, string>;
  badge: Record<MisophoniaCardLang, string>;
  summary: Record<MisophoniaCardLang, string>;
  psychology: Record<MisophoniaCardLang, string>;
  actionProtocol: Record<MisophoniaCardLang, string[]>;
}

export const MISOPHONIA_QUESTIONS: MisophoniaQuestion[] = [
  // 1. Orofacial Trigger Reactivity
  {
    id: 1,
    subscale: "orofacial_trigger_reactivity",
    text: {
      en: "Hearing someone chew food, crunch snacks, or slurp drinks triggers an immediate, visceral flash of fury rather than mild annoyance.",
      id: "Mendengar suara orang mengunyah makanan, mengunyah keripik, atau menyeruput minuman memicu ledakan amarah seketika di tubuhku.",
      de: "Das Geräusch von schmatzenden, kauenden oder schlürfenden Menschen löst bei mir blitzartige Wut statt bloßer Genervtheit aus.",
      fr: "Entendre quelqu'un mâcher, croquer ou déglutir déclenche en moi un éclair de fureur viscérale et non un simple agacement.",
      es: "Oír a alguien masticar, crujir comida o sorber bebidas me desata una furia visceral instantánea más allá de una simple molestia.",
    },
  },
  // 2. Autonomic Rage & Panic Surge
  {
    id: 2,
    subscale: "autonomic_rage_panic_surge",
    text: {
      en: "When exposed to repetitive trigger sounds, I feel an acute physical fight-or-flight spike (racing heart, clutched fists, hot adrenaline surge).",
      id: "Ketika mendengar suara pemicu yang berulang, tubuhku mengalami lonjakan lawan-atau-lari (jantung berdegup kencang, tinju mengepal, lonjakan adrenalin).",
      de: "Bei wiederholten Triggergeräuschen erlebe ich einen akuten Flucht- oder Kampfreiz (Herzrasen, geballte Fäuste, heißes Adrenalin).",
      fr: "Face à des bruits répétitifs, je ressens une poussée physique d'adrénaline aiguë (cœur qui s'emballe, poings serrés, envie de fuir ou frapper).",
      es: "Ante sonidos repetitivos desencadenantes, experimento una descarga física de lucha o huida (taquicardia, puños apretados, oleada de adrenalina).",
    },
  },
  // 3. Anticipatory Social Avoidance
  {
    id: 3,
    subscale: "anticipatory_social_avoidance",
    text: {
      en: "I dread or deliberately avoid family dinners, movie theaters, or open-plan offices purely out of fear of being trapped near trigger sounds.",
      id: "Aku cemas atau sengaja menghindari makan malam keluarga, bioskop, atau kantor terbuka hanya demi menghindari suara pemicu.",
      de: "Ich fürchte oder meide gemeinsame Essen, Kinos oder Großraumbüros aus Angst, Triggern schonungslos ausgeliefert zu sein.",
      fr: "J'appréhende ou j'évite les repas de famille, le cinéma ou les open-spaces par peur panique d'être piégé(e) près de bruits déclencheurs.",
      es: "Evito o temo las cenas familiares, el cine o las oficinas abiertas solo por el terror de quedar atrapado junto a sonidos molestos.",
    },
  },
  // 4. Orofacial Trigger Reactivity
  {
    id: 4,
    subscale: "orofacial_trigger_reactivity",
    text: {
      en: "Nasal, breathing, or throat sounds (heavy panting, sniffling, throat-clearing, yawning) feel unbearable and invasive to my nervous system.",
      id: "Suara hidung, pernapasan, atau tenggorokan (napas berat, mendengus, batuk kecil, menguap) terasa menusuk dan tak tertahankan di sarafku.",
      de: "Atem-, Schnupf- oder Räuspergeräusche (schweres Atmen, Nasehochziehen) wirken unerträglich und übergriffig auf mein Nervensystem.",
      fr: "Les bruits respiratoires ou de gorge (respiration lourde, reniflements, raclements) me semblent insupportables et agressifs.",
      es: "Los sonidos nasales, respiratorios o de garganta (respiración pesada, sorberse los mocos, carraspeo) me resultan intolerables.",
    },
  },
  // 5. Autonomic Rage & Panic Surge
  {
    id: 5,
    subscale: "autonomic_rage_panic_surge",
    text: {
      en: "I experience intense, intrusive thoughts of screaming, slamming the table, or physically fleeing the room when someone makes a trigger noise.",
      id: "Aku mengalami pikiran impulsif yang kuat untuk berteriak, menggebrak meja, atau kabur dari ruangan saat seseorang membuat suara pemicu.",
      de: "Ich habe drängende Impulse zu schreien, auf den Tisch zu schlagen oder aus dem Raum zu rennen, wenn jemand das Geräusch macht.",
      fr: "J'ai l'impulsion violente de crier, de taper sur la table ou de fuir la pièce quand quelqu'un produit ce son.",
      es: "Siento impulsos intensos de gritar, golpear la mesa o salir corriendo de la habitación cuando alguien hace el sonido detonante.",
    },
  },
  // 6. Anticipatory Social Avoidance
  {
    id: 6,
    subscale: "anticipatory_social_avoidance",
    text: {
      en: "I panic or feel paralyzed if I leave home without earplugs, AirPods, or noise-canceling headphones.",
      id: "Aku panik atau merasa lumpuh jika keluar rumah tanpa membawa earphone atau penutup telinga peredam bising.",
      de: "Ich gerate in Panik oder fühle mich ungeschützt, wenn ich das Haus ohne Ohrstöpsel oder Noise-Cancelling-Kopfhörer verlasse.",
      fr: "Je panique ou me sens sans défense si je sors sans bouchons d'oreilles ou écouteurs à réduction de bruit.",
      es: "Entro en pánico o me siento desprotegido si salgo de casa sin tapones para los oídos o auriculares con cancelación de ruido.",
    },
  },
  // 7. Orofacial Trigger Reactivity
  {
    id: 7,
    subscale: "orofacial_trigger_reactivity",
    text: {
      en: "Repetitive mechanical or kinetic sounds made by others (pen clicking, keyboard slamming, foot tapping, gum snapping) trigger extreme rage.",
      id: "Suara kinetik atau mekanis berulang (klik pulpen, ketukan keyboard keras, entakan kaki, letupan permen karet) memicu kemarahan ekstrem.",
      de: "Wiederkehrende mechanische Geräusche (Kugelschreiberklicken, lautes Tippen, Wippen, Kaugummiplatzen) erzeugen extreme Wut.",
      fr: "Les bruits mécaniques répétitifs (cliquetis de stylo, frappe agressive de clavier, tapotements de pieds) me rendent fou/folle de rage.",
      es: "Los sonidos mecánicos repetitivos (hacer clic con el bolígrafo, teclear fuerte, golpear el suelo con el pie) me provocan rabia extrema.",
    },
  },
  // 8. Autonomic Rage & Panic Surge
  {
    id: 8,
    subscale: "autonomic_rage_panic_surge",
    text: {
      en: "The rage is followed by deep secondary guilt or shame: 'Why am I like this? Why can't I just tolerate normal human sounds like everyone else?'",
      id: "Kemarahan tersebut disusul rasa bersalah mendalam: 'Kenapa aku begini? Kenapa aku tidak bisa menoleransi suara manusia normal seperti orang lain?'",
      de: "Auf die Wut folgt tiefe Schuld oder Scham: 'Warum bin ich so? Warum kann ich normale Alltagsgeräusche nicht einfach aushalten?'",
      fr: "La colère est suivie d'une profonde culpabilité : 'Pourquoi suis-je ainsi ? Pourquoi ne puis-je pas tolérer les bruits normaux comme tout le monde ?'",
      es: "A la furia le sigue una profunda culpa o vergüenza: '¿Por qué soy así? ¿Por qué no tolero sonidos humanos normales como los demás?'",
    },
  },
  // 9. Anticipatory Social Avoidance
  {
    id: 9,
    subscale: "anticipatory_social_avoidance",
    text: {
      en: "I monitor the mouths and movements of people around me with hypervigilance, bracing myself for the moment they start eating or snacking.",
      id: "Aku memantau mulut dan gerak-gerik orang di sekitarku secara hiperwaspada, bersiap-siap tegang saat mereka mulai makan camilan.",
      de: "Ich beobachte den Mund und die Gestik anderer mit ständiger Wachsamkeit, innerlich angespannt vor dem nächsten Kauen oder Knabbern.",
      fr: "J'observe la bouche et les mouvements des autres avec hypervigilance, me crispant à l'avance dès qu'ils s'apprêtent à grignoter.",
      es: "Vigilo la boca y movimientos de quienes me rodean con hiperalerta, tensándome antes de que comiencen a comer o botanear.",
    },
  },
  // 10. Orofacial Trigger Reactivity
  {
    id: 10,
    subscale: "orofacial_trigger_reactivity",
    text: {
      en: "The sound is intensely worse when produced by loved ones, parents, or partners compared to strangers on a train.",
      id: "Suara pemicu terasa berkali-kali lipat lebih menyiksa jika berasal dari orang terdekat, pasangan, atau orang tua dibanding orang asing.",
      de: "Die Geräusche sind ungleich quälender, wenn sie von Partnern oder Familie stammen, als von Fremden in der Bahn.",
      fr: "Le son est infiniment plus insupportable lorsqu'il provient d'un proche ou d'un(e) partenaire que d'un inconnu.",
      es: "El sonido es infinitamente más insoportable cuando lo producen familiares o parejas que cuando lo hace un desconocido.",
    },
  },
  // 11. Autonomic Rage & Panic Surge
  {
    id: 11,
    subscale: "autonomic_rage_panic_surge",
    text: {
      en: "Even after the trigger sound stops, my nervous system remains vibrating with residue anger, tension, and irritation for 15 to 60 minutes.",
      id: "Bahkan setelah suara pemicu berhenti, saraf tubuhku masih bergetar tegang dan marah selama 15 hingga 60 menit sesudahnya.",
      de: "Selbst wenn das Geräusch verstummt ist, bleibt mein Nervensystem noch 15 bis 60 Minuten unter Restanspannung und Groll.",
      fr: "Même après l'arrêt du bruit, mon système nerveux reste agité, tendu et en colère pendant 15 à 60 minutes.",
      es: "Incluso después de que el sonido cesa, mi sistema nervioso permanece en alerta, irritado y tenso durante 15 a 60 minutos.",
    },
  },
  // 12. Anticipatory Social Avoidance
  {
    id: 12,
    subscale: "anticipatory_social_avoidance",
    text: {
      en: "My sound sensitivity has caused significant friction, heated arguments, or strained relationships with romantic partners, roommates, or coworkers.",
      id: "Sensitivitas suaraku telah memicu konflik nyata, pertengkaran hebat, atau merenggangkan hubungan dengan pasangan, rekan kerja, atau keluarga.",
      de: "Meine Lärmempfindlichkeit hat bereits zu handfesten Konflikten, Streit oder Belastungen in Partnerschaft oder Beruf geführt.",
      fr: "Ma sensibilité sonore a déjà provoqué de vifs conflits, des disputes ou des tensions avec mon entourage ou mes collègues.",
      es: "Mi sensibilidad a los sonidos ha causado discusiones intensas, distanciamiento o conflictos con mi pareja, familia o compañeros.",
    },
  },
];

export const MISOPHONIA_OPTIONS = [
  {
    value: 0,
    label: {
      en: "Never / No Reaction (I barely notice everyday sounds)",
      id: "Tidak Pernah (Aku jarang terusik suara sehari-hari)",
      de: "Nie / Keine Reaktion (Alltagsgeräusche stören mich kaum)",
      fr: "Jamais / Aucune réaction (Je remarque à peine ces bruits)",
      es: "Nunca / Sin reacción (Apenas noto los sonidos cotidianos)",
    },
  },
  {
    value: 1,
    label: {
      en: "Mild Irritation (Noticeable annoyance, but easily ignored or tolerated)",
      id: "Sedikit Terganggu (Agak risih, tapi masih bisa diabaikan dengan mudah)",
      de: "Leichte Irritation (Spürbar nervig, aber aushaltbar)",
      fr: "Légère irritation (Un peu agaçant, mais facilement toléré)",
      es: "Leve molestia (Notable fastidio, pero fácil de ignorar)",
    },
  },
  {
    value: 2,
    label: {
      en: "Moderate Distress (Sharp visceral anger, urge to leave or cover ears)",
      id: "Cukup Tersiksa (Amarah menusuk, dorongan menutup telinga atau menjauh)",
      de: "Mittlere Belastung (Spürbare Wut, Impuls Ohren zuzuhalten)",
      fr: "Détresse modérée (Vive colère viscérale, envie de se boucher les oreilles)",
      es: "Malestar moderado (Furia visceral aguda, impulso de taparse los oídos)",
    },
  },
  {
    value: 3,
    label: {
      en: "Severe / Explosive Rage (Violent fight-or-flight surge, panic, inability to cope)",
      id: "Sangat Parah / Ledakan Emosi (Lonjakan amarah hebat, panik, tak tertahankan)",
      de: "Schwere Wutreaktion (Explosiver Kampfreiz, Panik, unerträglich)",
      fr: "Fureur explosive / Sévère (Poussée de rage incontrôlable, panique)",
      es: "Furia explosiva / Severa (Oleada de rabia intensa, pánico, intolerable)",
    },
  },
];

export const MISOPHONIA_RESULTS: MisophoniaResultLevel[] = [
  {
    level: "sound_tolerant_baseline",
    scoreRange: [0, 6],
    title: {
      en: "Sound-Tolerant Baseline (Normal Auditory Gating)",
      id: "Batas Toleransi Suara Alami (Auditory Gating Normal)",
      de: "Normale Klangtoleranz (Intaktes Auditives Gating)",
      fr: "Tolérance Sonore Normale (Filtrage Auditif Intact)",
      es: "Tolerancia Auditiva Normal (Filtrado Sensorial Sano)",
    },
    badge: {
      en: "Typical Sound Processing",
      id: "Pemrosesan Suara Normal",
      de: "Typische Klangverarbeitung",
      fr: "Traitement Auditif Typique",
      es: "Procesamiento Sensorial Típico",
    },
    summary: {
      en: "Your brain filters out ambient chewing, breathing, and kinetic background sounds smoothly. The neural bridge between your auditory cortex and anterior insular cortex operates in normal equilibrium without triggering survival fight-or-flight fury.",
      id: "Otakmu mampu menyaring suara kunyahan, embusan napas, dan suara mekanis dengan wajar. Sambungan saraf antara korteks pendengaran dan korteks insular anterior bekerja seimbang tanpa memicu kepanikan atau amarah bertahan hidup.",
      de: "Ihr Gehirn filtert Kau-, Atem- und Nebengeräusche mühelos heraus. Die neuronale Verbindung zwischen auditiver Rinde und vorderer Inselrinde befindet sich in stabiler Balance.",
      fr: "Votre cerveau filtre sans heurt les bruits de mastication et de respiration. La liaison neuronale entre cortex auditif et cortex insulaire antérieur est stable, sans déclencher d'accès de colère.",
      es: "Tu cerebro filtra los sonidos cotidianos de masticación y respiración con normalidad. La conexión entre la corteza auditiva y la ínsula anterior opera en equilibrio sin disparar furia defensiva.",
    },
    psychology: {
      en: "In typical auditory neurology, thalamocortical gating screens out low-salience repetitive mouth and environmental sounds. You may occasionally find bad table manners slightly unpleasant, but it does not provoke an involuntary autonomic crisis.",
      id: "Dalam neurologi pendengaran umum, sistem penyaring talamokortikal secara otomatis meredam suara mulut dan lingkungan berenergi rendah. Kamu mungkin merasa sedikit risih pada tata krama yang buruk, namun tidak memicu krisis otonomik.",
      de: "Die thalamokortikale Filterung blendet alltagsübliche Mundgeräusche ab. Unmanierliches Kauen empfinden Sie eventuell als unhöflich, jedoch nicht als neurologischen Notfall.",
      fr: "Le filtrage thalamocortical classique élimine les bruits de bouche anodins. Vous pouvez juger des manières de table désagréables sans ressentir d'alerte corporelle d'urgence.",
      es: "El filtrado tálamocortical típico amortigua los ruidos orales cotidianos. Puedes encontrar molestos los malos modales en la mesa, pero no sufres una crisis fisiológica involuntaria.",
    },
    actionProtocol: {
      en: [
        "Acoustic Hygiene: Maintain healthy sound boundaries without relying excessively on earplugs during everyday interactions.",
        "Empathy for Misophonic Peers: If loved ones express severe discomfort from your eating or clicking sounds, understand their distress is a neurological reflex, not personal malice.",
        "Nuju Vocal Sanctuary: Use Nuju's voice journal for regular emotional decompression to keep overall nervous system stress low.",
      ],
      id: [
        "Higienitas Akustik: Jaga kenyamanan pendengaran tanpa bergantung berlebihan pada penutup telinga dalam pergaulan normal.",
        "Empati terhadap Penderita Misofonia: Jika teman atau pasangan terganggu oleh suara kunyahanmu, pahami bahwa respon mereka adalah refleks saraf biologis, bukan kebencian personal.",
        "Sanctuary Suara Nuju: Manfaatkan Nuju untuk melepas penat emosional harian agar sistem saraf tetap rileks.",
      ],
      de: [
        "Akustische Balance: Normale Geräuschkulissen zulassen, ohne sich im Alltag hinter Kopfhörern zu verbarrikadieren.",
        "Verständnis für Betroffene: Reagieren Nahestehende gereizt auf Kaugeräusche, wissen Sie nun, dass dies ein neurologischer Reflex und kein persönlicher Angriff ist.",
        "Nuju-Sprachraum: Regelmäßige Audio-Entlastung in Nuju nutzen, um das Stressniveau dauerhaft niedrig zu halten.",
      ],
      fr: [
        "Hygiène acoustique : Maintenez un rapport équilibré à l'environnement sonore sans abuser des bouchons d'oreilles au quotidien.",
        "Empathie envers les misophones : Si un proche réagit à vos bruits de déglutition, rappelez-vous qu'il s'agit d'un réflexe neurologique involontaire.",
        "Journal vocal Nuju : Déposez vos tensions dans Nuju pour entretenir la souplesse de votre système nerveux.",
      ],
      es: [
        "Higiene Acústica Saludable: Convive con los sonidos habituales sin depender de tapones en situaciones sociales cotidianas.",
        "Empatía hacia Personas con Misofonía: Si alguien se incomoda con tus sonidos al comer, comprende que es un reflejo neurológico involuntario y no hostilidad hacia ti.",
        "Espacio Seguro Nuju: Registra tus emociones en el diario de voz de Nuju para mantener un tono nervioso sereno.",
      ],
    },
  },
  {
    level: "mild_auditory_irritation",
    scoreRange: [7, 14],
    title: {
      en: "Mild Auditory Irritation (Selective Sound Sensitivity)",
      id: "Iritasi Pendengaran Ringan (Sensitivitas Suara Selektif)",
      de: "Leichte Auditive Reizbarkeit (Selektive Geräuschempfindlichkeit)",
      fr: "Irritation Auditive Légère (Sensibilité Sonore Sélective)",
      es: "Irritación Auditiva Leve (Sensibilidad Sonora Selectiva)",
    },
    badge: {
      en: "Subclinical Sound Reactivity",
      id: "Reaktivitas Suara Ringan",
      de: "Subklinische Lärmsensibilität",
      fr: "Réactivité Sonore Subclinique",
      es: "Reactividad Sonora Subclínica",
    },
    summary: {
      en: "Certain chewing, crunching, or repetitive clicking sounds reliably spike your annoyance and make you feel tense. While you can maintain composure in most settings, your internal patience wears thin when trapped near trigger sounds for extended periods.",
      id: "Suara kunyahan, keripik, atau klik pulpen tertentu memicu kekesalan dan ketegangan tubuh. Meski kamu masih bisa menjaga sikap, kesabaranmu cepat terkuras jika harus terjebak di dekat suara tersebut dalam waktu lama.",
      de: "Bestimmte Kau-, Schmatz- oder Klickgeräusche lassen Ihren Puls spürbar ansteigen. Meist bewahren Sie die Fassung, doch bei längerer Einwirkung schwindet Ihre Geduld rasant.",
      fr: "Certains bruits de mastication ou de cliquetis vous crispent nettement. Vous parvenez à garder votre calme, mais votre patience s'effrite vite lors d'une exposition prolongée.",
      es: "Determinados sonidos de masticación o clics repetitivos despiertan tu irritación y tensión. Aunque sueles mantener la compostura, tu paciencia se agota si la exposición se alarga.",
    },
    psychology: {
      en: "Under conditions of tiredness or elevated baseline anxiety, the salience network in your brain flags human mouth sounds as mildly intrusive. This is early-stage misophonic reactivity where the emotional response is predominantly annoyance rather than explosive fury.",
      id: "Saat tubuh lelah atau cemas, jaringan salience di otakmu menandai suara mulut manusia sebagai gangguan nyata. Ini adalah reaktivitas misofonia tahap awal di mana respon emosional didominasi kejengkelan daripada ledakan kemarahan liar.",
      de: "Bei Müdigkeit oder chronischer Belastung stuft Ihr Salienznetzwerk Mundgeräusche als störenden Übergriff ein. Es handelt sich um ein Frühstadium, in dem Frust statt unkontrollierbarer Wut dominiert.",
      fr: "En période de fatigue, votre réseau de saillance cérébrale surinterprète les bruits oraux comme une agression. L'émotion reste principalement de l'agacement plutôt qu'une crise de fureur.",
      es: "Cuando estás cansado o estresado, la red de prominencia de tu cerebro etiqueta los ruidos orales como intrusivos. La respuesta es principalmente fastidio antes que furia explosiva.",
    },
    actionProtocol: {
      en: [
        "Tactical White Noise: Use low-level ambient sounds (rain, ocean waves, cafe murmur) during work or study to mask sudden kinetic triggers.",
        "Physical Step-Away: Excuse yourself politely for 2 minutes to wash your hands or drink water when a trigger sound starts, preventing irritation build-up.",
        "Nuju Vocal Decompression: Speak your private frustration into Nuju immediately after stressful shared meals to discharge somatic annoyance.",
      ],
      id: [
        "White Noise Taktis: Nyalakan suara latar rintik hujan atau dengung kafe saat bekerja/belajar untuk meredam suara pemicu mendadak.",
        "Menjauh Sejenak: Izin ke toilet atau minum air selama 2 menit saat suara pemicu mulai mengganggu, sebelum ketegangan menumpuk.",
        "Dekompresi Suara di Nuju: Ungkapkan kejengkelan yang dipendam ke jurnal suara Nuju seusai makan bersama untuk melepas tegangan saraf.",
      ],
      de: [
        "Weißes Rauschen: Sanfte Hintergrundklänge (Regen, Meeresrauschen) beim Arbeiten nutzen, um abrupte Klick- oder Kaugeräusche zu maskieren.",
        "Kurze Auszeit: Bei aufkommendem Unbehagen für 2 Minuten den Raum verlassen (Händewaschen), um die neuronale Reizkette zu unterbrechen.",
        "Entlastung über Nuju: Den aufgestauten Ärger nach gemeinsamen Mahlzeiten im Nuju-Sprachjournal aussprechen.",
      ],
      fr: [
        "Bruit blanc stratégique : Diffusez un doux bruit de pluie ou de café pour masquer les bruits parasites au bureau.",
        "Retrait stratégique de 2 minutes : Quittez calmement la pièce pour boire un verre d'eau dès que le son commence à vous irriter.",
        "Expression sur Nuju : Déchargez votre agacement en privé dans le journal vocal Nuju pour désamorcer l'irritation somatique.",
      ],
      es: [
        "Ruido Blanco Estratégico: Utiliza sonidos ambientales de lluvia o cafetería al estudiar para enmascarar ruidos repetitivos molestos.",
        "Pausa Preventiva: Levántate con calma 2 minutos a lavarte las manos o tomar agua cuando un sonido detonante empiece a crisparte.",
        "Desahogo en Nuju: Expresa tu malestar en privado en el santuario de voz de Nuju después de comidas tensas para relajar los músculos.",
      ],
    },
  },
  {
    level: "moderate_misophonic_distress",
    scoreRange: [15, 22],
    title: {
      en: "Moderate Misophonic Distress (Anterior Insula Hyperactivity)",
      id: "Tekanan Misofonia Menengah (Hiperaktivitas Insula Anterior)",
      de: "Mittlere Misophonische Belastung (Hyperaktivität der anterioren Insula)",
      fr: "Détresse Misophonique Modérée (Hyperactivité de l'Insula Antérieure)",
      es: "Malestar Misofónico Moderado (Hiperactividad de la Ínsula Anterior)",
    },
    badge: {
      en: "Clinical Misophonia Trait",
      id: "Karakter Misofonia Klinis",
      de: "Klinische Misophonie-Ausprägung",
      fr: "Trait Misophonique Clinique",
      es: "Rasgo Misofónico Clínico",
    },
    summary: {
      en: "Trigger sounds provoke intense, involuntary surges of disgust, adrenaline, and fury. You clench your jaws, experience an urgent impulse to flee the room, and feel deep guilt afterward for reacting with such intense anger toward loved ones.",
      id: "Suara pemicu menyalakan gelombang jijik, adrenalin, dan amarah hebat tanpa bisa dikontrol. Kamu mengepalkan rahang, terdorong kuat kabur dari ruangan, dan merasa sangat bersalah setelahnya karena marah pada orang terdekat.",
      de: "Triggergeräusche lösen unwillkürliche Schübe von Ekel, Adrenalin und Zorn aus. Sie beißen die Zähne zusammen, verspüren Fluchtimpulse und quälen sich danach mit Schuldgefühlen.",
      fr: "Les bruits déclencheurs provoquent des bouffées involontaires de dégoût, d'adrénaline et de colère. Vos mâchoires se serrent, vous voulez fuir et culpabilisez ensuite.",
      es: "Los sonidos detonantes provocan oleadas automáticas de asco, adrenalina y furia. Aprietas la mandíbula, deseas huir de la sala y luego te abruma la culpa.",
    },
    psychology: {
      en: "Seminal fMRI research by Dr. Sukhbinder Kumar (Newcastle University, 2017) revealed that in misophonia, the anterior insular cortex (salience hub) is hyper-coupled with the auditory cortex and motor mirror neuron regions. Your brain perceives the sound as an invasive physical violation of personal boundaries.",
      id: "Riset fMRI oleh Dr. Sukhbinder Kumar (2017) membuktikan bahwa pada misofonia, korteks insular anterior terhubung secara hiperaktif dengan korteks pendengaran dan sistem cermin motorik. Otakmu mempersepsikan suara tersebut sebagai pelanggaran fisik langsung terhadap batas tubuhmu.",
      de: "fMRI-Studien von Dr. Sukhbinder Kumar zeigen eine Hyperkonnektivität zwischen der anterioren Insula und dem auditorischen Kortex. Das Gehirn interpretiert das Kauen anderer als physischen Übergriff auf das eigene Nervensystem.",
      fr: "Les recherches par IRMf du Dr Sukhbinder Kumar montrent une hyper-connectivité entre l'insula antérieure et le cortex auditif. Votre cerveau interprète le bruit comme une agression physique directe.",
      es: "Estudios de resonancia de Dr. Sukhbinder Kumar demuestran hiperconectividad entre la ínsula anterior y la corteza auditiva. Tu cerebro procesa el sonido ajeno como una invasión física directa de tus límites.",
    },
    actionProtocol: {
      en: [
        "Open Psychoeducation Boundary: Explain misophonia to family/partners using medical terms: 'My brain's acoustic-insular wiring triggers an adrenaline reflex to chewing sounds; it has nothing to do with you.'",
        "High-Fidelity Attenuation: Carry subtle acoustic filtering earplugs (like Loop or Calmer) that reduce trigger frequencies while preserving conversational clarity.",
        "Somatic Grounding in Nuju: When adrenaline spikes, vent into Nuju's voice journal. Speaking aloud stimulates the vagus nerve and interrupts motor rage tension.",
      ],
      id: [
        "Edukasi Batas Medis: Jelaskan pada keluarga/pasangan: 'Saraf otakku memiliki refleks adrenalin otomatis terhadap suara kunyahan; ini bukan karena aku benci kalian.'",
        "Penyaring Akustik Subtle: Gunakan earplug peredam frekuensi tajam (seperti Loop/Calmer) yang meredam suara kunyahan tanpa mengganggu obrolan.",
        "Pelepasan Somatik di Nuju: Saat adrenalin membuncah, bicaralah di jurnal suara Nuju. Getaran pita suara merangsang saraf vagus dan memutus ketegangan motorik.",
      ],
      de: [
        "Aufklärung im Umfeld: Dem Partner sachlich erklären: 'Mein Gehirn reagiert neurologisch mit Adrenalin auf Kaugeräusche; das ist keine böse Absicht gegen dich.'",
        "Akustikfilter: Diskrete Ohrstöpsel (z.B. Loop oder Calmer) nutzen, die Frequenzen von Mundgeräuschen dämpfen, aber Sprache verständlich halten.",
        "Nervus-Vagus-Stimulation in Nuju: Die körperliche Wut im Nuju-Sprachraum aussprechen, um die parasympathische Beruhigung einzuleiten.",
      ],
      fr: [
        "Communication bienveillante : Expliquez à vos proches : 'Mon système nerveux déclenche une poussée d'adrénaline involontaire aux bruits de bouche ; cela n'a rien contre vous.'",
        "Bouchons à filtre acoustique : Utilisez des embouts discrets (type Loop) atténuant les hautes fréquences buccales sans couper les voix.",
        "Régulation somatique sur Nuju : Enregistrez votre colère dans Nuju pour stimuler le nerf vague et stopper l'emballement moteur.",
      ],
      es: [
        "Límites con Información Médica: Aclara a tus allegados: 'Mi cerebro dispara adrenalina involuntaria ante sonidos masticatorios; no es falta de cariño hacia ustedes.'",
        "Tapones con Filtro Acústico: Emplea protectores discretos que amortigüen frecuencias de masticación permitiendo entender la conversación.",
        "Calma Vagal en Nuju: Desahoga la furia en el santuario de voz de Nuju; hablar en voz alta activa el nervio vago y relaja el impulso de ataque.",
      ],
    },
  },
  {
    level: "severe_sound_rage_impairment",
    scoreRange: [23, 30],
    title: {
      en: "Severe Sound Rage Impairment (Acute Neuro-Autonomic Distress)",
      id: "Gangguan Amarah Suara Berat (Krisis Neuro-Otonomik Akut)",
      de: "Schwere Misophonische Beeinträchtigung (Neuro-autonome Krise)",
      fr: "Trouble Misophonique Sévère (Détresse Neuro-Autonome Aiguë)",
      es: "Afectación Misofónica Severa (Crisis Neuroautonómica Aguda)",
    },
    badge: {
      en: "Severe Misophonic Crisis",
      id: "Krisis Misofonia Berat",
      de: "Schwere Misophonie-Krise",
      fr: "Crise Misophonique Sévère",
      es: "Crisis Misofónica Severa",
    },
    summary: {
      en: "Trigger sounds provoke explosive, violent fight-or-flight panic surges. You feel extreme rage, muscle trembling, and panic, leading to substantial life disruption: avoiding shared meals, intense relationship arguments, and constant dread of sound exposure.",
      id: "Suara pemicu membakar amarah eksplosif dan kepanikan lawan-atau-lari yang dahsyat. Ototmu gemetar, jantung berdebar kencang, dan kamu terpaksa mengorbankan makan bersama, memicu konflik hubungan, serta hidup dalam kecemasan suara konstan.",
      de: "Triggergeräusche lösen explosive Kampfreize und Panikschübe aus. Muskelzittern, Herzrasen und massive Einschränkungen im Alltag (Meiden von Mahlzeiten, Beziehungsstreit) dominieren Ihr Leben.",
      fr: "Les sons déclencheurs provoquent des crises de rage explosives et une panique somatique aiguë. Tremblements, disputes conjugales et évitement systématique des repas partagés altèrent lourdement votre quotidien.",
      es: "Los sonidos desencadenantes desatan ataques de furia explosiva y pánico corporal incontrolable. Temblores musculares, conflictos de pareja y aislamiento a la hora de comer marcan tu vida.",
    },
    psychology: {
      en: "Dr. Damiaan Denys's Amsterdam Misophonia Scale (A-MISO-S) benchmarks this level as clinically significant impairment. The autonomic arousal is so overpowering that prefrontal cognitive inhibition fails, flooding the system with intense anger and secondary feelings of alienation.",
      id: "Skala A-MISO-S Dr. Damiaan Denys mengklasifikasikan level ini sebagai gangguan klinis nyata. Lonjakan sistem otonom begitu luar biasa sehingga korteks prefrontal gagal meredam amarah, menimbulkan rasa bersalah dan keterasingan mendalam.",
      de: "Nach der Amsterdam Misophonia Scale (A-MISO-S) liegt eine behandlungsbedürftige Einschränkung vor. Die autonome Erregung überrollt die präfrontale Hemmung, gefolgt von schwerer Entfremdung.",
      fr: "Selon l'échelle A-MISO-S du Dr Damiaan Denys, ce niveau relève d'une altération clinique significative. La tempête autonome submerge les contrôles préfrontaux, causant une immense solitude.",
      es: "Según la escala A-MISO-S del Dr. Damiaan Denys, este nivel representa un deterioro clínico notable. La descarga autonómica desborda los frenos prefrontales, provocando culpa y aislamiento.",
    },
    actionProtocol: {
      en: [
        "Sound-Sanctuary Agreements: Establish non-negotiable household rules (e.g., background music during dinner, eating crunchy snacks in designated areas).",
        "Cognitive Behavioral Therapy for Misophonia (CBT-M): Seek specialized therapy using counter-conditioning and inhibitory exposure to uncouple sounds from threat responses.",
        "Emergency Vocal Grounding in Nuju: When sensory fury strikes, immediately retreat to Nuju's voice sanctuary to vent without harming relationships.",
      ],
      id: [
        "Kesepakatan Ruang Aman Suara: Buat aturan rumah yang disepakati bersama (misal: menyetel musik saat makan, memakan kerupuk hanya di ruangan terpisah).",
        "CBT Khusus Misofonia: Ikuti terapi perilaku kognitif berbasis counter-conditioning untuk memutus asosiasi suara dengan sinyal bahaya amigdala.",
        "Evakuasi Suara ke Nuju: Saat amarah memuncak, segera masuk ke jurnal suara Nuju untuk meluapkan kemarahan secara privat tanpa merusak hubungan sosial.",
      ],
      de: [
        "Lärm-Schutzabkommen: Verbindliche Vereinbarungen im Haushalt treffen (z.B. Hintergrundmusik beim Essen, keine Knabbereien im gemeinsamen Wohnzimmer).",
        "KVT für Misophonie: Gezielte psychotherapeutische Gegenkonditionierung, um die neuronale Verknüpfung von Klang und Bedrohung aufzulösen.",
        "Notfall-Ventilation in Nuju: Bei sensorischer Wut sofort in den geschützten Nuju-Sprachraum zurückziehen, um den Affekt sicher abzulassen.",
      ],
      fr: [
        "Contrat de sanctuaire sonore : Mettez en place des règles à la maison (musique de fond aux repas, grignotage réservé à des pièces isolées).",
        "TCC spécialisée en misophonie : Entamez un contre-conditionnement pour découpler le son du réflexe de panique/fureur.",
        "Évacuation vocale d'urgence sur Nuju : En cas de crise sensorielle, réfugiez-vous sur Nuju pour crier ou vous décharger sans heurter votre entourage.",
      ],
      es: [
        "Pactos de Santuario Sonoro: Establece acuerdos en casa (música ambiental en las comidas, botanear crujiente solo en áreas designadas).",
        "TCC para Misofonía: Busca acompañamiento terapéutico especializado en contracondicionamiento para desacoplar el sonido de la respuesta de ataque.",
        "Evacuación de Emergencia en Nuju: Ante una crisis de furia, acude de inmediato a Nuju para desfogar tu dolor sin dañar tus vínculos afectivos.",
      ],
    },
  },
  {
    level: "acute_misophonic_agony",
    scoreRange: [31, 36],
    title: {
      en: "Acute Misophonic Agony (Severe Sensory-Limbic Exhaustion)",
      id: "Penderitaan Misofonia Akut (Kelelahan Sensorik-Limbik Ekstrem)",
      de: "Akute Misophonische Agonie (Extreme Sensorisch-limbische Erschöpfung)",
      fr: "Agonie Misophonique Aiguë (Épuisement Sensoriel-Limbique Extrême)",
      es: "Agonía Misofónica Extrema (Colapso Sensorial-Límbico Agudo)",
    },
    badge: {
      en: "Extreme Auditory Distress",
      id: "Penderitaan Auditori Ekstrem",
      de: "Extremer Auditiver Notstand",
      fr: "Souffrance Auditive Extrême",
      es: "Emergencia Sensorial Crítica",
    },
    summary: {
      en: "You live in a state of chronic, agonizing sound terror. Almost every human bodily and kinetic sound triggers uncontrollable rage or despair. You wear earplugs 24/7, live in acute isolation, and feel desperate for peace.",
      id: "Kamu hidup dalam teror suara yang menyiksa secara kronis. Hampir setiap suara tubuh manusia memicu kemarahan liar atau keputusasaan. Kamu memakai penutup telinga nyaris 24 jam, mengisolasi diri, dan putus asa mendambakan ketenangan.",
      de: "Sie leben in einem chronischen Geräusch-Terror. Nahezu jedes menschliche Körpergeräusch löst unkontrollierbare Wut oder Verzweiflung aus. Dauerhaftes Tragen von Ohrstöpseln und soziale Isolation sind die Folge.",
      fr: "Vous vivez dans un calvaire sonore perpétuel. Presque tout bruit corporel humain vous plonge dans une fureur incontrôlable. Vous portez des bouchons 24h/24 et vous isolez du monde.",
      es: "Vives en un calvario sonoro permanente. Casi cualquier sonido corporal ajeno te arroja a la furia o la desesperanza. Vives con tapones 24/7 y te aíslas del mundo buscando paz.",
    },
    psychology: {
      en: "This extreme clinical state reflects total sensitization of the auditory-limbic-motor pathways, accompanied by secondary depression and agoraphobic withdrawal. The brain's anterior insular cortex treats mundane everyday noises as violent existential threats.",
      id: "Kondisi ekstrem ini mencerminkan sensitisasi total jalur auditori-limbik-motorik, disertai depresi sekunder dan penarikan diri sosial. Korteks insular anterior memperlakukan suara sehari-hari seolah ancaman mematikan.",
      de: "Dieser Zustand spiegelt eine vollständige Sensibilisierung der auditiv-limbischen Reflexbögen wider, oft begleitet von sekundärer Depression und Rückzug. Das Gehirn interpretiert Alltagsgeräusche als lebensbedrohlich.",
      fr: "Cet état traduit une sensibilisation totale des circuits auditifs et limbiques, souvent accompagnée de dépression réactionnelle. L'insula antérieure perçoit les bruits courants comme des menaces vitales.",
      es: "Este estado refleja una hipersensibilización total de las vías auditivas y límbicas, con depresión secundaria y aislamiento. La ínsula anterior percibe sonidos cotidianos como amenazas letales.",
    },
    actionProtocol: {
      en: [
        "Multidisciplinary Clinical Intervention: Seek evaluation from an audiologist and clinical psychologist specialized in misophonia, tinnitus, and hyperacusis.",
        "Total Environmental Shielding: Create a designated silent room at home equipped with soundproofing panels and white noise generators.",
        "Nuju Non-Judgmental Voice Refuge: Vent the immense grief and anger into Nuju's voice sanctuary. Releasing vocal emotion prevents internal implosion.",
      ],
      id: [
        "Intervensi Medis Multidisiplin: Temui audiolog dan psikolog klinis yang memahami misofonia, tinitus, dan hiperakusis untuk penanganan komprehensif.",
        "Kamar Kedap Suara Pribadi: Ciptakan satu ruangan perlindungan di rumah dengan peredam suara dan white noise generator.",
        "Sanctuary Suara Tanpa Penghakiman: Luapkan duka dan kemarahan terdalam ke jurnal suara Nuju; mengeluarkan suara vokal mencegah ledakan stres dalam tubuh.",
      ],
      de: [
        "Interdisziplinäre Hilfe: Suchen Sie spezialisierte Audiologen und Psychotherapeuten auf, die mit Misophonie und Hyperakusis vertraut sind.",
        "Akustischer Rückzugsort: Richten Sie zu Hause ein schallgedämmtes Refugium mit Rauschgeneratoren ein.",
        "Nuju als Entlastungsanker: Den tiefen Schmerz und die Wut in Nuju aussprechen, um dem inneren Überdruck ventilartig Raum zu geben.",
      ],
      fr: [
        "Prise en charge spécialisée : Consultez une équipe pluridisciplinaire (audiologiste et psychologue clinicien) formée à la misophonie.",
        "Sanctuaire insonorisé : Aménagez chez vous une pièce refuge isolée avec générateur de bruit blanc.",
        "Refuge vocal Nuju : Déposez la détresse et la rancœur dans Nuju pour éviter l'implosion émotionnelle.",
      ],
      es: [
        "Atención Clínica Especializada: Consulta con audiólogos y psicólogos clínicos formados en misofonía e hiperacusia.",
        "Habitación Insonorizada de Resguardo: Crea un espacio seguro en tu hogar con paneles absorbentes y generadores de ruido blanco.",
        "Desahogo Total en Nuju: Vierte el dolor y la furia en el santuario de voz de Nuju para liberar la presión interna sin culpas.",
      ],
    },
  },
];

export const MISOPHONIA_SUBSCALE_INFO = {
  orofacial_trigger_reactivity: {
    name: {
      en: "Orofacial Trigger Reactivity (Chewing, Breathing, Swallowing)",
      id: "Reaktivitas Pemicu Orofosial (Mengunyah, Bernapas, Menelan)",
      de: "Orofaziale Trigger-Reaktivität (Kauen, Atmen, Schlucken)",
      fr: "Réactivité aux Déclencheurs Oro-Faciaux (Mastication, Déglutition)",
      es: "Reactividad a Detonantes Orofaciales (Masticación, Respiración)",
    },
    description: {
      en: "Acute sensitivity and visceral disgust triggered by mouth, chewing, crunching, breathing, and swallowing sounds.",
      id: "Sensitivitas akut dan rasa jijik mendalam yang dipicu oleh suara mulut, kunyahan, embusan napas, dan menelan.",
      de: "Akute Überempfindlichkeit und Ekelreaktion auf Kau-, Schmatz-, Atem- und Schluckgeräusche.",
      fr: "Sensibilité aiguë et dégoût viscéral déclenchés par les bruits de bouche, de mastication et de respiration.",
      es: "Sensibilidad aguda y asco visceral provocados por sonidos bucales, masticación, crujidos o respiración.",
    },
  },
  autonomic_rage_panic_surge: {
    name: {
      en: "Autonomic Rage & Panic Surge (Fight-or-Flight Spike)",
      id: "Lonjakan Amarah & Panik Otonomik (Lonjakan Lawan-atau-Lari)",
      de: "Autonome Wut- & Panikspitzen (Flucht- oder Kampfreiz)",
      fr: "Poussée de Fureur & Panique Autonome (Réflexe de Fuite/Lutte)",
      es: "Descarga Autonómica de Furia y Pánico (Respuesta de Lucha o Huida)",
    },
    description: {
      en: "Physical adrenaline spikes, racing heart, clutched jaws/fists, and intrusive impulses to scream or flee when triggered.",
      id: "Lonjakan adrenalin fisik, jantung berdegup kencang, rahang/tinju mengepal, serta dorongan berteriak atau melarikan diri.",
      de: "Körperliche Adrenalinschübe, Herzrasen, Muskelanspannung und Impulse zu schreien oder fluchtartig wegzurennen.",
      fr: "Poussées d'adrénaline, tachycardie, mâchoires serrées et envie irrépressible de crier ou de s'enfuir.",
      es: "Taquicardia, adrenalina súbita, tensión muscular extrema e impulsos intensos de gritar o escapar.",
    },
  },
  anticipatory_social_avoidance: {
    name: {
      en: "Anticipatory Social Avoidance & Hypervigilance",
      id: "Penghindaran Sosial Antisipatif & Hiperwaspada",
      de: "Antizipatorische Vermeidung & Hypervigilanz",
      fr: "Évitement Social Anticipatoire & Hypervigilance",
      es: "Evitación Social Anticipatoria e Hipervigilancia",
    },
    description: {
      en: "Wearing headphones everywhere, avoiding shared dinners, hyper-monitoring other people's mouths, and social strain.",
      id: "Menggunakan penutup telinga terus-menerus, menghindari makan bersama, mengawasi mulut orang lain, dan kerenggangan sosial.",
      de: "Dauerhaftes Tragen von Kopfhörern, Meiden gemeinsamer Mahlzeiten und ständiges Überwachen der Gestik anderer.",
      fr: "Port permanent d'écouteurs, évitement des repas, surveillance continue de la bouche d'autrui et repli relationnel.",
      es: "Uso continuo de auriculares, evasión de reuniones con comida, vigilancia del entorno y tensiones vinculares.",
    },
  },
};

export function getMisophoniaResult(totalScore: number): MisophoniaResultLevel {
  const clamped = Math.max(0, Math.min(36, totalScore));
  return (
    MISOPHONIA_RESULTS.find(
      (r) => clamped >= r.scoreRange[0] && clamped <= r.scoreRange[1]
    ) || MISOPHONIA_RESULTS[0]
  );
}

export function calculateMisophoniaSubscales(answers: Record<number, number>): {
  orofacial_trigger_reactivity: number;
  autonomic_rage_panic_surge: number;
  anticipatory_social_avoidance: number;
} {
  let of = 0;
  let ar = 0;
  let sa = 0;

  MISOPHONIA_QUESTIONS.forEach((q) => {
    const score = answers[q.id] ?? 0;
    if (q.subscale === "orofacial_trigger_reactivity") of += score;
    if (q.subscale === "autonomic_rage_panic_surge") ar += score;
    if (q.subscale === "anticipatory_social_avoidance") sa += score;
  });

  return {
    orofacial_trigger_reactivity: of,
    autonomic_rage_panic_surge: ar,
    anticipatory_social_avoidance: sa,
  };
}
