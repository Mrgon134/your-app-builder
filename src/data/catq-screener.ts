export type CatqLang = "en" | "id" | "de" | "fr" | "es";

export interface CatqQuestion {
  id: number;
  category: "compensation" | "masking" | "assimilation";
  prompt: Record<CatqLang, string>;
  subtext?: Record<CatqLang, string>;
}

export interface CatqResultLevel {
  level: "authentic" | "adaptive" | "high_burden" | "burnout_risk";
  scoreRange: [number, number];
  badge: Record<CatqLang, string>;
  title: Record<CatqLang, string>;
  summary: Record<CatqLang, string>;
  neurobiology: Record<CatqLang, string>;
  actionProtocol: Record<CatqLang, string[]>;
  colorScheme: {
    badge: string;
    border: string;
    text: string;
    bg: string;
  };
}

export const CATQ_QUESTIONS: CatqQuestion[] = [
  {
    id: 1,
    category: "compensation",
    prompt: {
      en: "Do you actively monitor your body language, tone of voice, or facial expressions during conversations to appear 'normal'?",
      id: "Apakah Anda secara sadar mengontrol bahasa tubuh, intonasi suara, atau ekspresi wajah saat mengobrol agar tampak 'normal'?",
      de: "Kontrollieren Sie Ihre Körpersprache, Stimmlage oder Mimik während Gesprächen aktiv, um 'normal' zu wirken?",
      fr: "Surveillez-vous activement votre langage corporel, le ton de votre voix ou vos mimiques en société pour paraître 'normal' ?",
      es: "¿Monitoreas conscientemente tu lenguaje corporal, tono de voz o expresión facial en las conversaciones para parecer 'normal'?",
    },
    subtext: {
      en: "Compensation: consciously learning non-verbal cues.",
      id: "Kompensasi: mempelajari isyarat non-verbal secara kognitif.",
      de: "Kompensation: kognitives Nachahmen von Körpersprache.",
      fr: "Compensation : apprentissage conscient des codes non-verbaux.",
      es: "Compensación: aprendizaje deliberado de señales no verbales.",
    },
  },
  {
    id: 2,
    category: "compensation",
    prompt: {
      en: "Do you pre-plan scripts, conversation topics, or practice jokes in your head before entering social situations?",
      id: "Apakah Anda menyiapkan skrip percakapan, topik basa-basi, atau latihan melucu di kepala sebelum menghadiri acara sosial?",
      de: "Planen Sie Gesprächsskripte, Smalltalk-Themen oder Witze vorab gedanklich, bevor Sie Menschen treffen?",
      fr: "Préparez-vous des scripts de conversation ou répétez-vous des répliques dans votre tête avant une situation sociale ?",
      es: "¿Preparas guiones mentales, temas de conversación o ensayas bromas antes de entrar a un evento social?",
    },
  },
  {
    id: 3,
    category: "compensation",
    prompt: {
      en: "Do you copy the clothing styles, catchphrases, or gestures of charismatic peers or characters to blend in?",
      id: "Apakah Anda meniru gaya berpakaian, pilihan kata, atau gestur orang lain yang karismatik agar Anda tidak terlihat aneh?",
      de: "Kopieren Sie den Kleidungsstil, Redewendungen oder Gesten anderer Menschen, um nicht aufzufallen?",
      fr: "Copiez-vous le style vestimentaire, les expressions ou les gestes de personnes charismatiques pour vous fondre dans la masse ?",
      es: "¿Copias la forma de vestir, frases hechas o gestos de personas carismáticas para pasar desapercibido?",
    },
  },
  {
    id: 4,
    category: "compensation",
    prompt: {
      en: "Do you deliberately calculate eye contact (e.g., counting seconds, looking at the bridge of the nose) rather than letting it happen naturally?",
      id: "Apakah Anda menghitung detik kontak mata atau sengaja menatap pangkal hidung lawan bicara karena tatapan langsung terasa tidak nyaman?",
      de: "Berechnen Sie Blickkontakt bewusst (z. B. Sekunden zählen oder auf die Nasenwurzel blicken), weil er sich unnatürlich anfühlt?",
      fr: "Calculez-vous délibérément le contact visuel (compter les secondes, fixer le nez) au lieu de le laisser se faire naturellement ?",
      es: "¿Calculas deliberadamente el contacto visual (contar segundos, mirar la nariz) porque mantenerlo surge de forma forzada?",
    },
  },
  {
    id: 5,
    category: "masking",
    prompt: {
      en: "Do you suppress natural physical stims (finger tapping, rocking, fidgeting, humming) when other people are present?",
      id: "Apakah Anda menahan dorongan fisik alami (seperti mengetuk jari, menggoyangkan kaki, memegang benda, bersenandung) saat ada orang lain?",
      de: "Unterdrücken Sie natürliche Stimming-Bewegungen (Fingerklopfen, Wippen, Summen), wenn andere Personen anwesend sind?",
      fr: "Réprimez-vous vos autostimulations (tapoter des doigts, vous balancer, fredonner) en présence d'autres personnes ?",
      es: "¿Repprimes tus movimientos de autorregulación (stimming como mover los dedos, balancearte, tararear) frente a los demás?",
    },
    subtext: {
      en: "Masking: concealing neurodivergent self-regulation.",
      id: "Masking: menyembunyikan respon regulasi diri alami.",
      de: "Masking: Unterdrückung von Autoregulation.",
      fr: "Masquage : dissimulation des réflexes d'autorégulation.",
      es: "Enmascaramiento: ocultar la autorregulación natural.",
    },
  },
  {
    id: 6,
    category: "masking",
    prompt: {
      en: "Do you force yourself to maintain a cheerful or engaged facial expression even when you feel completely flat, overwhelmed, or bored?",
      id: "Apakah Anda memaksa diri tersenyum ramah atau memasang wajah antusias meski batin Anda merasa hampa, kewalahan, atau mati rasa?",
      de: "Zwingen Sie sich zu einem freundlichen Gesichtsausdruck, selbst wenn Sie innerlich völlig leer, überreizt oder erschöpft sind?",
      fr: "Vous forcez-vous à afficher une expression souriante ou attentive même lorsque vous êtes vidé(e) ou saturé(e) intérieurement ?",
      es: "¿Te obligas a mantener una expresión facial alegre y atenta incluso cuando por dentro estás saturado, agotado o plano?",
    },
  },
  {
    id: 7,
    category: "masking",
    prompt: {
      en: "Do you hide your intense special interests or passions because you worry people will find them obsessive or odd?",
      id: "Apakah Anda menyembunyikan minat khusus (special interests) yang mendalam karena takut dianggap aneh atau terlalu terobsesi?",
      de: "Verstecken Sie Ihre intensiven Spezialinteressen aus Sorge, dass andere sie für seltsam oder sonderbar halten?",
      fr: "Cachez-vous vos passions intenses (intérêts spécifiques) de peur d'être jugé(e) bizarre ou obsessionnel(le) ?",
      es: "¿Ocultas tus intereses especiales intensos por miedo a que los demás te consideren obsesivo o extraño?",
    },
  },
  {
    id: 8,
    category: "masking",
    prompt: {
      en: "Do you hide sensory discomfort (pain from fluorescent lights, loud restaurant chatter, uncomfortable fabrics) to avoid being seen as 'difficult'?",
      id: "Apakah Anda menahan rasa sakit akibat kebisingan restoran, lampu neon kantor, atau baju yang gatal demi tidak dianggap 'rewel'?",
      de: "Ertragen Sie Reizüberflutung (grelles Licht, laute Räume, kratzende Stoffe) stumm, um nicht als 'kompliziert' zu gelten?",
      fr: "Taisez-vous vos souffrances sensorielles (néons, brouhaha, textures inconfortables) pour ne pas passer pour quelqu'un de 'difficile' ?",
      es: "¿Soportas en silencio la sobrecarga sensorial (luces fluorescentes, ruidos, telas molestas) para no parecer una persona 'quisquillosa'?",
    },
  },
  {
    id: 9,
    category: "assimilation",
    prompt: {
      en: "Do you feel like you are performing an exhausting acting role on a stage whenever you are around colleagues or acquaintances?",
      id: "Apakah Anda merasa seperti sedang memainkan peran panggung teater yang sangat melelahkan setiap kali berinteraksi dengan rekan kerja?",
      de: "Fühlen Sie sich im Kreise von Kollegen oder Bekannten so, als würden Sie eine anstrengende Theaterrolle auf einer Bühne spielen?",
      fr: "Avez-vous le sentiment d'endosser un rôle d'acteur épuisant sur une scène chaque fois que vous êtes en société ?",
      es: "¿Sientes que estás interpretando un personaje en una obra de teatro agotadora cada vez que estás con compañeros de trabajo?",
    },
    subtext: {
      en: "Assimilation: forcing oneself to fit the social puzzle.",
      id: "Asimilasi: memaksakan diri agar cocok dengan ekspektasi sosial.",
      de: "Assimilation: erzwungenes Einpassen in die Gruppe.",
      fr: "Assimilation : effort permanent d'intégration superficielle.",
      es: "Asimilación: forzarse a encajar a costa de la propia energía.",
    },
  },
  {
    id: 10,
    category: "assimilation",
    prompt: {
      en: "After social gatherings, do you experience severe sensory burnout where you need hours or days in a dark, quiet room to recover speech and energy?",
      id: "Seusai acara sosial, apakah Anda mengalami kelelahan ekstrem (social burnout) hingga butuh berjam-jam atau berhari-hari mengurung diri di kamar gelap tanpa bicara?",
      de: "Brauchen Sie nach Treffen oft Stunden oder Tage in einem abgedunkelten, stillen Raum, um wieder Kraft und Sprache zu finden?",
      fr: "Après une sortie, ressentez-vous un épuisement tel que vous devez rester prostré(e) dans le noir et le silence pour récupérer ?",
      es: "¿Tras eventos sociales necesitas horas o días en una habitación oscura y en silencio total para recuperar el habla y la energía?",
    },
  },
  {
    id: 11,
    category: "assimilation",
    prompt: {
      en: "Do you laugh along with jokes or nod in agreement even when you do not truly understand why everyone is laughing?",
      id: "Apakah Anda ikut tertawa atau mengangguk-angguk saat orang lain bercanda meski di dalam hati Anda tidak paham kenapa hal itu lucu?",
      de: "Lachen Sie bei Witzen mit oder nicken zustimmend, obwohl Sie den Witz oder die soziale Nuance gar nicht verstanden haben?",
      fr: "Riez-vous aux éclats ou hochez-vous la tête en groupe même si vous n'avez pas réellement compris la chute de la plaisanterie ?",
      es: "¿Te ríes o asientes con la cabeza ante bromas grupales incluso cuando no has entendido realmente por qué se ríen?",
    },
  },
  {
    id: 12,
    category: "assimilation",
    prompt: {
      en: "Have you masked for so many years that you genuinely struggle to know who you are when nobody is watching?",
      id: "Apakah Anda telah memakai topeng begitu lama hingga Anda kesulitan mengenali siapa diri Anda yang sesungguhnya saat sedang sendirian?",
      de: "Haben Sie sich so lange angepasst, dass Sie gar nicht mehr wissen, wer Sie ohne Maske wirklich sind?",
      fr: "Avez-vous masqué vos réactions pendant tant d'années que vous ignorez qui vous êtes réellement lorsque personne ne vous regarde ?",
      es: "¿Has llevado la máscara puesta durante tantos años que te cuesta saber quién eres verdaderamente cuando estás en soledad?",
    },
  },
];

export const CATQ_LEVELS: CatqResultLevel[] = [
  {
    level: "authentic",
    scoreRange: [0, 8],
    badge: {
      en: "AUTHENTIC / LOW CAMOUFLAGE",
      id: "AUTENTIK & MINIM MASKING",
      de: "AUTHENTISCH / GERINGE ANPASSUNG",
      fr: "AUTHENTIQUE & PEU DE MASQUAGE",
      es: "AUTÉNTICO Y BAJO ENMASCARAMIENTO",
    },
    title: {
      en: "Unconstrained Natural Expression & Low Social Strain",
      id: "Ekspresi Alami Bebas & Beban Sosial Rendah",
      de: "Natürlicher Ausdruck & Geringe soziale Belastung",
      fr: "Expression Spontanée et Faible Coût Énergétique",
      es: "Expresión Espontánea y Bajo Desgaste Social",
    },
    summary: {
      en: "You rarely expend cognitive energy consciously suppressing your natural mannerisms, planning social scripts, or faking emotions. Your social interactions flow with authentic ease or comfortable self-acceptance.",
      id: "Anda jarang menghabiskan energi untuk menahan gestur alami, menyusun naskah bicara, atau memalsukan ekspresi. Interaksi sosial Anda berjalan tanpa beban sandiwara yang melelahkan.",
      de: "Sie verbrauchen kaum geistige Energie darauf, sich zu verstellen oder Skripte auswendig zu lernen. Ihr sozialer Kontakt erfolgt ungezwungen.",
      fr: "Vous dépensez très peu d'énergie à masquer vos réactions ou à répéter des scripts. Vos interactions sociales reposent sur une spontanéité préservée.",
      es: "Apenas consumes energía mental en reprimir tus gestos o ensayar guiones. Tus relaciones sociales fluyen con naturalidad y autoaceptación.",
    },
    neurobiology: {
      en: "Minimal prefrontal motor inhibition over spontaneous amygdala-limbic social signaling. Low autonomic friction between internal sensory state and external motor output.",
      id: "Inhibisi prefrontal minimal terhadap sinyal motorik limbik spontan. Tidak ada gesekan otonom antara kondisi sensoris internal dan bahasa tubuh eksternal.",
      de: "Geringe präfrontale Kontrolle über spontane limbische Signale; das vegetative Nervensystem bleibt im entspannten Gleichgewicht.",
      fr: "Absence de frein préfrontal excessif sur les expressions spontanées ; système nerveux autonome équilibré en société.",
      es: "Baja inhibición prefrontal sobre las respuestas espontáneas; mínima fricción entre la experiencia interna y la conducta exterior.",
    },
    actionProtocol: {
      en: [
        "Continue cultivating sensory environments that honor your natural focus patterns.",
        "Protect your social battery during high-stimulation weeks.",
        "Encourage neuro-affirming boundaries in team collaborations.",
      ],
      id: [
        "Pertahankan lingkungan kerja yang ramah sensoris dan mendukung fokus alami Anda.",
        "Jaga batas kapasitas baterai sosial saat minggu-minggu sibuk.",
        "Dukung komunikasi yang jujur dan inklusif dalam kerja sama tim.",
      ],
      de: [
        "Pflegen Sie weiterhin reizarme Arbeitsumgebungen, die Ihrem Fokus guttun.",
        "Schützen Sie Ihre sozialen Energiereserven in stressigen Wochen.",
        "Bleiben Sie bei Ihrer ehrlichen und direkten Kommunikationsweise.",
      ],
      fr: [
        "Préservez des environnements sensoriels respectueux de votre rythme.",
        "Ménagez votre batterie sociale lors des périodes d'intense activité.",
        "Cultivez des relations qui valorisent votre franchise naturelle.",
      ],
      es: [
        "Mantén entornos sensoriales que respeten tu ritmo natural de trabajo.",
        "Protege tu batería social en semanas de alta estimulación.",
        "Promueve una comunicación transparente sin artificios.",
      ],
    },
    colorScheme: {
      badge: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
      border: "border-emerald-500/40",
      text: "text-emerald-400",
      bg: "from-emerald-950/40 via-stone-900 to-stone-950",
    },
  },
  {
    level: "adaptive",
    scoreRange: [9, 16],
    badge: {
      en: "SITUATIONAL ADAPTIVE MASKING",
      id: "MASKING ADAPTIF SITUASIONAL",
      de: "SITUATIVE ADAPTIVE ANPASSUNG",
      fr: "MASQUAGE ADAPTATIF PONCTUEL",
      es: "ENMASCARAMIENTO ADAPTATIVO LEVE",
    },
    title: {
      en: "Contextual Professional Masking with Resilient Recovery",
      id: "Adaptasi Profesional Kontekstual dengan Pemulihan Cepat",
      de: "Kontextbezogene Anpassung mit stabiler Erholung",
      fr: "Adaptation Professionnelle Cadrée et Récupération Fluide",
      es: "Adaptación Profesional Contextual con Buena Recuperación",
    },
    summary: {
      en: "You employ moderate social camouflaging during formal presentations, job interviews, or high-stakes networking, but you can readily drop the persona around trusted friends or in your private sanctuary without debilitating exhaustion.",
      id: "Anda menggunakan sedikit taktik masking saat presentasi formal atau wawancara kerja, namun Anda dapat melepas topeng dengan mudah saat bersama sahabat atau di rumah tanpa merasa kelelahan parah.",
      de: "Sie nutzen bewusste Anpassung in beruflichen Situationen, können die Maske bei vertrauten Menschen aber problemlos ablegen.",
      fr: "Vous adoptez une posture sociale convenue dans le cadre formel, mais retrouvez facilement votre spontanéité auprès de vos intimes.",
      es: "Utilizas el camuflaje social de forma puntual en el entorno laboral, pero te desprendes de la máscara sin dificultad ante personas de confianza.",
    },
    neurobiology: {
      en: "Flexible frontoparietal cognitive control: the brain recruits prefrontal scripts when contextually advantageous, then disengages executive suppression once safety cues are detected.",
      id: "Kontrol frontoparietal yang fleksibel: otak mengaktifkan skrip sosial saat dibutuhkan, lalu menonaktifkan kontrol saat lingkungan dirasa aman.",
      de: "Flexible frontoparietale Steuerung: Kognitive Anpassung wird bedarfsgerecht aktiviert und bei Sicherheit wieder heruntergefahren.",
      fr: "Régulation cognitive flexible : le cerveau active des scripts lorsque nécessaire puis relâche le contrôle en milieu sécurisant.",
      es: "Control cognitivo flexible: se activan guiones prefrontales cuando conviene y se desactivan ante señales de seguridad.",
    },
    actionProtocol: {
      en: [
        "Schedule 15-minute decompression buffers after heavy social meetings.",
        "Use noise-canceling headphones in open-plan offices to minimize sensory overload.",
        "Voice journal in Nuju to process daily unmasking transitions.",
      ],
      id: [
        "Sediakan jeda hening 15 menit seusai rapat atau pertemuan sosial yang padat.",
        "Gunakan headphone peredam bising di kantor untuk mencegah kelelahan sensoris.",
        "Gunakan jurnal suara Nuju untuk melepaskan beban penat seusai beraktivitas.",
      ],
      de: [
        "Planen Sie 15 Minuten Pufferzeit nach intensiven Besprechungen ein.",
        "Nutzen Sie Noise-Cancelling-Kopfhörer im Großraumbüro zur Reizreduktion.",
        "Nutzen Sie das Nuju-Sprachtagebuch zur mentalen Entlastung am Abend.",
      ],
      fr: [
        "Accordez-vous 15 minutes de sas de décompression après les réunions.",
        "Utilisez un casque anti-bruit pour limiter les nuisances sonores au bureau.",
        "Exprimez vos ressentis dans le journal vocal Nuju pour relâcher la pression.",
      ],
      es: [
        "Programa pausas de 15 minutos tras reuniones de alto contacto social.",
        "Usa auriculares con cancelación de ruido para reducir la fatiga acústica.",
        "Desahoga el cansancio en el diario de voz de Nuju al terminar la jornada.",
      ],
    },
    colorScheme: {
      badge: "bg-teal-500/20 text-teal-400 border-teal-500/30",
      border: "border-teal-500/40",
      text: "text-teal-400",
      bg: "from-teal-950/40 via-stone-900 to-stone-950",
    },
  },
  {
    level: "high_burden",
    scoreRange: [17, 26],
    badge: {
      en: "HIGH SOCIAL CAMOUFLAGE BURDEN",
      id: "BEBAN MASKING SOSIAL TINGGI",
      de: "HOHE CAMOUFLAGE-BELASTUNG",
      fr: "LOURD FARDEAU DE MASQUAGE",
      es: "ALTA CARGA DE CAMUFLAJE SOCIAL",
    },
    title: {
      en: "Chronic Compensation & Post-Social Exhaustion",
      id: "Kompensasi Kronis & Kelelahan Sosial Mendalam",
      de: "Chronische Überkompensation & Soziale Erschöpfung",
      fr: "Surcompensation Chronique et Épuisement Social",
      es: "Sobrecompensación Crónica y Resaca Social",
    },
    summary: {
      en: "You spend immense cognitive energy monitoring eye contact, suppressing stims, and calculating social responses. You often leave social encounters with a pounding headache, intense self-criticism, and a desperate need to isolate in silence.",
      id: "Anda menguras energi otak yang sangat besar demi menjaga kontak mata, menahan gerakan fisik, dan menghitung kata-kata. Anda kerap pulang dengan kepala pening, overthinking sosial, dan butuh menyendiri seharian.",
      de: "Sie investieren enorme geistige Kraft in Blickkontakt, Stimming-Unterdrückung und Smalltalk. Nach Treffen fühlen Sie sich oft wie leergesaugt.",
      fr: "Vous mobilisez une énergie considérable pour feindre l'aisance sociale. Chaque interaction prolongée vous laisse vidé(e), avec des maux de tête et le besoin impérieux de vous isoler.",
      es: "Inviertes un esfuerzo cognitivo colosal en controlar tu cuerpo y encajar. Concluyes las interacciones con dolor de cabeza, dudas sobre tu desempeño y fatiga profunda.",
    },
    neurobiology: {
      en: "Sustained hyper-activation of the dorsolateral prefrontal cortex and anterior cingulate cortex constantly overriding subcortical nervous system reflexes, leading to dopamine and glucose depletion.",
      id: "Hiperaktivasi berkepanjangan pada dorsolateral prefrontal cortex dan ACC yang menekan refleks alami sistem saraf, menguras cadangan dopamin dan energi otak.",
      de: "Anhaltende Überaktivität im präfrontalen Kortex blockiert natürliche Reize und führt zu schneller Dopamin- und Glukose-Erschöpfung.",
      fr: "Surchauffe métabolique du cortex préfrontal forcé d'inhiber les réflexes intérieurs, provoquant une chute brutale de la dopamine.",
      es: "Sobrecarga sostenida del córtex prefrontal que anula las señales subcorticales, agotando rápidamente la dopamina y la energía cognitiva.",
    },
    actionProtocol: {
      en: [
        "Identify your top 3 safe unmasking zones (home, nature, with trusted loved ones).",
        "Introduce discreet sensory fidgets (spinning rings, texture worry stones) to replace full stim suppression.",
        "Practice radical self-compassion: you do not owe the world performance at the expense of your sanity.",
      ],
      id: [
        "Tetapkan 3 ruang aman di mana Anda boleh melepas topeng sepenuhnya (kamar, alam terbuka, bersama sahabat terpilih).",
        "Gunakan alat fidget diskret (cincin putar, batu tekstur) agar tidak menahan stimming secara total.",
        "Bangun welas asih diri: Anda tidak berutang sandiwara sempurna kepada siapa pun.",
      ],
      de: [
        "Definieren Sie sichere Räume, in denen Sie unmaskiert und echt sein dürfen.",
        "Nutzen Sie unauffällige Fidget-Tools, um nervöse Energie abzubauen.",
        "Üben Sie radikales Selbstmitgefühl: Sie schulden niemandem eine perfekte Performance.",
      ],
      fr: [
        "Identifiez vos espaces de sécurité où vous pouvez faire tomber le masque en toute confiance.",
        "Utilisez de discrets objets sensoriels (bague antistress) pour libérer vos tensions motrices.",
        "Rappelez-vous que votre valeur ne dépend pas de votre capacité à imiter les neurotypiques.",
      ],
      es: [
        "Identifica espacios seguros donde puedas mostrarte sin filtros ni artificios.",
        "Incorpora objetos de autorregulación discretos para canalizar la sobreestimulación.",
        "Practica la autocompasión: tu bienestar vale más que complacer expectativas ajenas.",
      ],
    },
    colorScheme: {
      badge: "bg-amber-500/20 text-amber-400 border-amber-500/30",
      border: "border-amber-500/40",
      text: "text-amber-400",
      bg: "from-amber-950/40 via-stone-900 to-stone-950",
    },
  },
  {
    level: "burnout_risk",
    scoreRange: [27, 36],
    badge: {
      en: "SEVERE MASKING BURNOUT RISK",
      id: "KELELAHAN EKSTREM & RISIKO AUTISTIC BURNOUT",
      de: "AKUTES BURNOUT-RISIKO DURCH MASKING",
      fr: "RISQUE MAJEUR DE BURNOUT AUTISTIQUE",
      es: "RIESGO SEVERO DE BURNOUT POR ENMASCARAMIENTO",
    },
    title: {
      en: "Exhausted Identity Subjugation & Nervous System Collapse",
      id: "Krisis Identitas Mendalam & Runtuhnya Energi Sistem Saraf",
      de: "Identitätsverlust & Zusammenbruch der Belastbarkeit",
      fr: "Perte d'Identité et Effondrement Neuro-Énergétique",
      es: "Pérdida de Identidad y Colapso Neurovegetativo",
    },
    summary: {
      en: "Your social camouflaging has reached a crisis point. Years of constant performance, suppressive masking, and sensory denial have pushed your nervous system into acute autistic/ADHD burnout: loss of executive skills, selective mutism, chronic brain fog, and derealization.",
      id: "Beban masking Anda telah mencapai titik krisis. Bertahun-tahun bersandiwara dan menahan kebutuhan sensoris telah mendorong sistem saraf Anda ke tepi jurang burnout: hilangnya fungsi eksekutif, kesulitan bicara (mutisme sementara), brain fog parah, dan rasa asing pada diri sendiri.",
      de: "Ihr Anpassungsdruck hat das Limit überschritten. Jahrelanges Verstellen mündet in einen akuten neurodivergenten Burnout mit Funktions- und Sprachverlust.",
      fr: "Votre masquage permanent a atteint un seuil critique. Cet effort d'assimilation sans fin vous précipite vers un burnout autistique sévère avec perte des compétences du quotidien.",
      es: "El enmascaramiento prolongado te ha situado al borde del colapso. Años de fingimiento continuo desembocan en burnout neurodivergente, pérdida ejecutiva y desconexión vital.",
    },
    neurobiology: {
      en: "Severe autonomic burnout: allostatic load collapse characterized by hypo-cortisolemia, fronto-striatal fatigue, and chronic dorsal vagal shutdown triggered by persistent sensory self-denial.",
      id: "Burnout otonom akut: kolaps beban alostatik disertai penurunan regulasi kortisol, kelelahan jalur fronto-striatal, dan dominasi dorsal vagal shutdown.",
      de: "Vegetative Erschöpfung durch chronische Überlastung: Zusammenbruch der exekutiven Funktionen und Rückzug ins dorsal-vagale Shutdown.",
      fr: "Effondrement allostatique : épuisement des réserves de neurotransmetteurs et bascule dans le figement vagal dorsal.",
      es: "Agotamiento neurovegetativo profundo: colapso por sobrecarga alostática y bloqueo prolongado en la rama dorsal vagal.",
    },
    actionProtocol: {
      en: [
        "Immediate sensory triage: drastically reduce non-essential social obligations for 2–4 weeks.",
        "Work with a neurodiversity-affirming therapist specializing in late-diagnosed autism/ADHD.",
        "Allow natural unmasked stimming in safe solitude: rocking, vocal humming, sensory blankets.",
        "Use Nuju private audio notes to communicate when speech production feels physically impossible.",
      ],
      id: [
        "Lakukan pertolongan pertama sensoris: pangkas komitmen sosial yang tidak wajib selama 2–4 minggu.",
        "Konsultasikan dengan psikolog yang memahami neurodivergensi (autisme/ADHD pada dewasa).",
        "Izinkan diri melakukan stimming bebas saat sendirian: bergerak sesuka hati, selimut berat, redupkan lampu.",
        "Gunakan catatan suara atau tulisan singkat di Nuju saat kemampuan berbicara terasa sangat berat.",
      ],
      de: [
        "Sofortiger Reizstopp: Reduzieren Sie soziale Termine für einige Wochen auf das absolute Minimum.",
        "Suchen Sie Unterstützung bei einem neurodiversitätssensiblen Therapeuten.",
        "Erlauben Sie sich ungehemmtes Stimming im geschützten Raum zur Nervenberuhigung.",
        "Nutzen Sie Nuju-Audionotizen, wenn das verbale Sprechen im Alltag zu schwerfällt.",
      ],
      fr: [
        "Mise au repos sensoriel immédiate : réduisez drastiquement vos obligations sociales non vitales.",
        "Consultez un professionnel formé à l'autisme et au TDAH de l'adulte.",
        "Autorisez-vous à bouger et à stimuler vos sens sans retenue dans votre espace intime.",
        "Utilisez les mémos vocaux Nuju lorsque l'articulation verbale vous demande trop d'énergie.",
      ],
      es: [
        "Pausa sensorial inmediata: cancela compromisos sociales prescindibles durante varias semanas.",
        "Acude a un terapeuta con enfoque neuroafirmante experto en adultez.",
        "Permítete autorregularte sin vergüenza en tu espacio privado (movimiento libre, penumbra).",
        "Apóyate en las notas de voz de Nuju cuando hablar en voz alta te resulte agotador.",
      ],
    },
    colorScheme: {
      badge: "bg-rose-500/20 text-rose-400 border-rose-500/30",
      border: "border-rose-500/40",
      text: "text-rose-400",
      bg: "from-rose-950/40 via-stone-900 to-stone-950",
    },
  },
];
