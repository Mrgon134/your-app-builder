export type HspLang = "en" | "id" | "de" | "fr" | "es";

export type HspLevel = "sturdy" | "moderate" | "high" | "overloaded";

export type HspDimension = "sensory" | "empathy" | "subtlety";

export interface HspQuestion {
  id: number;
  dimension: HspDimension;
  text: Record<HspLang, string>;
}

export const HSP_OPTIONS = [
  {
    value: 0,
    label: {
      en: "Rarely / Not like me",
      id: "Jarang / Bukan saya",
      de: "Selten / Trifft nicht zu",
      fr: "Rarement / Pas moi",
      es: "Rara vez / No me describe",
    },
  },
  {
    value: 1,
    label: {
      en: "Sometimes / Mildly",
      id: "Kadang-kadang / Agak",
      de: "Manchmal / Leicht",
      fr: "Parfois / Un peu",
      es: "A veces / Ligeramente",
    },
  },
  {
    value: 2,
    label: {
      en: "Often / Very true",
      id: "Sering / Cukup sesuai",
      de: "Oft / Sehr zutreffend",
      fr: "Souvent / Très vrai",
      es: "A menudo / Muy cierto",
    },
  },
  {
    value: 3,
    label: {
      en: "Almost Always / Deeply true",
      id: "Hampir Selalu / Sangat mendalam",
      de: "Fast immer / Absolut zutreffend",
      fr: "Presque toujours / Profondément vrai",
      es: "Casi siempre / Totalmente cierto",
    },
  },
];

export const HSP_QUESTIONS: HspQuestion[] = [
  // Dimension 1: Sensory Overload & Stimulus Processing
  {
    id: 1,
    dimension: "sensory",
    text: {
      en: "Loud noises, bright fluorescent lights, or strong artificial scents drain my energy rapidly.",
      id: "Suara keras, lampu neon silau, atau wewangian tajam menguras energi saya dengan sangat cepat.",
      de: "Laute Geräusche, grelles Neonlicht oder starke künstliche Düfte rauben mir rasch die Energie.",
      fr: "Les bruits forts, les lumières fluorescentes crues ou les odeurs fortes m'épuisent rapidement.",
      es: "Los ruidos fuertes, las luces fluorescentes o los olores fuertes agotan mi energía rápidamente.",
    },
  },
  {
    id: 2,
    dimension: "sensory",
    text: {
      en: "When I have a lot to do in a short time, I feel overwhelmed rather than energized by the challenge.",
      id: "Saat banyak hal harus diselesaikan dalam waktu singkat, saya merasa panik dan kewalahan daripada tertantang.",
      de: "Wenn ich viel in kurzer Zeit erledigen muss, fühle ich mich überwältigt statt motiviert.",
      fr: "Quand j'ai beaucoup à faire en peu de temps, je me sens submergé(e) plutôt que stimulé(e).",
      es: "Cuando tengo mucho que hacer en poco tiempo, me siento abrumado(a) en lugar de motivado(a).",
    },
  },
  {
    id: 3,
    dimension: "sensory",
    text: {
      en: "After a busy social gathering or crowded day, I crave retreating to a dark, quiet room alone.",
      id: "Setelah acara ramai atau hari yang padat, saya sangat butuh menyendiri di kamar yang gelap dan hening.",
      de: "Nach geselligen Anlässen oder hektischen Tagen sehne ich mich nach einem abgedunkelten, stillen Raum.",
      fr: "Après une fête animée ou une journée bondée, j'ai désespérément besoin d'une pièce sombre et silencieuse.",
      es: "Después de una reunión social o un día ajetreado, ansío retirarme a una habitación oscura y en silencio.",
    },
  },
  {
    id: 4,
    dimension: "sensory",
    text: {
      en: "Scratchy clothing tags, uncomfortable fabrics, or subtle changes in room temperature bother me intensely.",
      id: "Label pakaian yang gatal, bahan kasar, atau perubahan kecil suhu ruangan sangat mengganggu kenyamanan saya.",
      de: "Kratzende Kleidungsetiketten, raue Stoffe oder kleine Temperaturschwankungen stören mich intensiv.",
      fr: "Les étiquettes de vêtements qui grattent ou les légères variations de température me dérangent vivement.",
      es: "Las etiquetas de ropa que rozan, telas ásperas o sutiles cambios de temperatura me molestan intensamente.",
    },
  },
  {
    id: 5,
    dimension: "sensory",
    text: {
      en: "Chaotic environments with multiple overlapping sounds (TV, people talking, alarms) make my nervous system freeze.",
      id: "Suasana kacau dengan banyak suara bertumpuk (TV, obrolan, dering) membuat sistem saraf saya seperti macet/freeze.",
      de: "Chaotische Umgebungen mit überlappenden Geräuschen (Fernseher, Stimmen) überfordern mein Nervensystem.",
      fr: "Les environnements chaotiques aux bruits superposés (télévision, discussions) paralysent mon système nerveux.",
      es: "Los ambientes caóticos con múltiples sonidos superpuestos hacen que mi sistema nervioso se bloquee.",
    },
  },

  // Dimension 2: Emotional Empathy & Absorption
  {
    id: 6,
    dimension: "empathy",
    text: {
      en: "I instantly pick up on other people's unspoken moods, tension, or distress as soon as I enter a room.",
      id: "Saya langsung menangkap suasana hati, ketegangan, atau kesedihan orang lain begitu saya masuk ke ruangan.",
      de: "Ich spüre unausgesprochene Stimmungen, Spannungen oder Kummer anderer Menschen sofort beim Betreten eines Raums.",
      fr: "Je capte instantanément les humeurs non dites, les tensions ou la détresse des gens dès que j'entre.",
      es: "Capto al instante las emociones no dichas, la tensión o el malestar de otros al entrar en una habitación.",
    },
  },
  {
    id: 7,
    dimension: "empathy",
    text: {
      en: "Watching violent movies, tragic news broadcasts, or cruelty upsets me deeply for hours or days afterwards.",
      id: "Menonton film kekerasan, berita tragis, atau kekejaman membuat batin saya terguncang berjam-jam bahkan berhari-hari.",
      de: "Gewaltszenen, tragische Nachrichten oder Tierquälerei belasten mich noch tagelang emotional schwer.",
      fr: "Regarder des films violents ou des nouvelles tragiques me bouleverse profondément pendant des heures ou des jours.",
      es: "Ver violencia en el cine o noticias trágicas me perturba profundamente durante horas o días enteros.",
    },
  },
  {
    id: 8,
    dimension: "empathy",
    text: {
      en: "I absorb other people's negative feelings so physically that I frequently mistake their anxiety for my own.",
      id: "Saya begitu menyerap emosi negatif orang lain sampai sering mengira kecemasan mereka adalah milik saya sendiri.",
      de: "Ich nehme negative Gefühle anderer so stark auf, dass ich deren Angst oft für meine eigene halte.",
      fr: "J'absorbe les émotions négatives d'autrui au point de confondre régulièrement leur anxiété avec la mienne.",
      es: "Absorbo los sentimientos negativos de los demás tan físicamente que confundo su ansiedad con la mía.",
    },
  },
  {
    id: 9,
    dimension: "empathy",
    text: {
      en: "I have a deeply rich, complex inner world where thoughts, memories, and dreams feel vivid and intensely alive.",
      id: "Saya memiliki dunia batin yang sangat kaya dan mendalam, di mana ingatan, mimpi, dan pikiran terasa begitu hidup.",
      de: "Ich besitze eine außergewöhnlich reiche Innenwelt; Gedanken, Träume und Erinnerungen sind lebendig.",
      fr: "J'ai un monde intérieur particulièrement riche et subtil où mes pensées et rêves sont intensément vivants.",
      es: "Tengo un mundo interior rico y profundo donde mis pensamientos, sueños y recuerdos son intensos.",
    },
  },
  {
    id: 10,
    dimension: "empathy",
    text: {
      en: "Criticism or harsh words cut into me deeply, causing visceral physical discomfort or stomach knots.",
      id: "Kritik tajam atau kata-kata kasar melukai saya sangat dalam, hingga membuat perut melilit atau dada sesak.",
      de: "Kritik oder harte Worte verletzen mich tief und lösen körperliches Unwohlsein oder Magenschmerzen aus.",
      fr: "Les critiques ou paroles dures me blessent au vif et provoquent des nœuds physiques dans mon ventre.",
      es: "Las críticas o palabras duras me hieren profundamente, provocando nudos estomacales o malestar físico.",
    },
  },

  // Dimension 3: Environmental Awareness & Subtle Nuance
  {
    id: 11,
    dimension: "subtlety",
    text: {
      en: "I am deeply moved by arts, delicate music, poetic writing, or the serene beauty of natural landscapes.",
      id: "Saya mudah terharu oleh karya seni, musik yang menyentuh, tulisan puitis, atau keindahan alam yang tenang.",
      de: "Feine Musik, Kunst, Poesie oder Naturlandschaften berühren mich bis ins Mark und bringen mich zum Weinen.",
      fr: "Je suis profondément ému(e) par la musique délicate, la poésie ou la beauté sereine de la nature.",
      es: "Me conmueven profundamente el arte, la música conmovedora, la poesía o la belleza de la naturaleza.",
    },
  },
  {
    id: 12,
    dimension: "subtlety",
    text: {
      en: "I notice subtle shifts in people's facial micro-expressions or tone of voice that others completely miss.",
      id: "Saya peka terhadap perubahan ekspresi mikro wajah atau nada bicara seseorang yang luput dari perhatian orang lain.",
      de: "Ich bemerke feinste Mikro-Mimiken oder Tonfalländerungen, die anderen völlig entgehen.",
      fr: "Je remarque les micro-expressions du visage ou les inflexions de voix que les autres ignorent totalement.",
      es: "Noto cambios sutiles en las microexpresiones faciales o tono de voz que la mayoría pasa por alto.",
    },
  },
  {
    id: 13,
    dimension: "subtlety",
    text: {
      en: "I perform noticeably worse or freeze when someone stands over my shoulder watching me work.",
      id: "Kinerja saya langsung drop atau gugup parah ketika ada seseorang yang mengawasi dari belakang saat saya bekerja.",
      de: "Ich mache viel mehr Fehler oder blockiere, wenn mir jemand bei der Arbeit über die Schulter schaut.",
      fr: "Mes capacités chutent ou je panique dès que quelqu'un m'observe par-dessus mon épaule.",
      es: "Me bloqueo o me equivoco con facilidad cuando alguien me observa fijamente mientras realizo una tarea.",
    },
  },
  {
    id: 14,
    dimension: "subtlety",
    text: {
      en: "I am intensely aware of small details in my surroundings, such as lighting arrangements, scents, and textures.",
      id: "Saya sangat menyadari detail-detail kecil di sekitar saya, seperti tata cahaya, aroma ruangan, dan tekstur benda.",
      de: "Ich nehme winzige Details in Räumen sofort wahr: Lichtnuancen, Gerüche, Raumakustik und Möbelarrangements.",
      fr: "Je remarque immédiatement les infimes détails d'un lieu : la lumière, les odeurs ambiantes et textures.",
      es: "Percibo de inmediato detalles diminutos a mi alrededor: la iluminación, olores y texturas del espacio.",
    },
  },
  {
    id: 15,
    dimension: "subtlety",
    text: {
      en: "I organize my life carefully to avoid chaotic, rushing situations or unpredictable emotional shocks.",
      id: "Saya mengatur hidup dengan cermat agar terhindar dari situasi tergesa-gesa, kacau, atau kejutan emosional tiba-tiba.",
      de: "Ich plane mein Leben vorausschauend, um Hektik, Zeitdruck und unvorhersehbare Reizüberflutungen zu meiden.",
      fr: "J'organise mon quotidien minutieusement pour éviter la précipitation, le chaos et les chocs imprévus.",
      es: "Planifico mi vida con cuidado para evitar situaciones caóticas, prisas o sacudidas emocionales imprevistas.",
    },
  },
];

export interface HspProfile {
  level: HspLevel;
  scoreRange: string;
  badge: Record<HspLang, string>;
  title: Record<HspLang, string>;
  tagline: Record<HspLang, string>;
  description: Record<HspLang, string>;
  superpowers: Record<HspLang, string[]>;
  vulnerabilities: Record<HspLang, string[]>;
  sanctuaryBlueprint: Record<HspLang, string[]>;
}

export const HSP_PROFILES: Record<HspLevel, HspProfile> = {
  sturdy: {
    level: "sturdy",
    scoreRange: "0 - 14",
    badge: {
      en: "Low Sensitivity",
      id: "Sensitivitas Rendah",
      de: "Niedrige Sensibilität",
      fr: "Sensibilité Modérée Basse",
      es: "Sensibilidad Baja / Robusto",
    },
    title: {
      en: "Sturdy Filter & Grounded Resilience",
      id: "Filter Kokoh & Resiliensi Alami",
      de: "Robuster Reizfilter & Geerdete Stabilität",
      fr: "Filtre Protecteur & Résilience Somatique",
      es: "Filtro Estable & Resiliencia Natural",
    },
    tagline: {
      en: "Your nervous system possesses a thick filter against environmental chaos, allowing steady focus under high noise.",
      id: "Sistem saraf Anda memiliki pelindung kokoh terhadap kebisingan eksternal, membuat Anda tetap tenang di situasi padat.",
      de: "Dein Nervensystem verfügt über einen stabilen Reizfilter und bleibt auch bei hoher Umgebungshektik gelassen.",
      fr: "Votre système nerveux filtre naturellement les stimuli intenses, vous permettant de rester calme sous pression.",
      es: "Tu sistema nervioso cuenta con un filtro natural resistente al caos externo, manteniendo la calma bajo presión.",
    },
    description: {
      en: "You have a high sensory threshold. While you may occasionally experience fatigue, external environments rarely destabilize your emotional center. You thrive in bustling environments that might overwhelm sensitive individuals.",
      id: "Anda memiliki ambang batas sensorik yang tinggi. Lingkungan bising atau padat jarang mengacaukan ketenangan batin Anda. Anda dapat beroperasi dengan stabil di tengah tekanan dan dinamika kerja yang serba cepat.",
      de: "Du besitzt eine hohe Reizschwelle. Laute Umgebungen oder emotionale Konflikte bringen dich selten aus der Ruhe. Du funktionierst zuverlässig in temporeichen, reizintensiven Umfeldern.",
      fr: "Vous possédez un seuil sensoriel élevé. Les stimuli bruyants ou les tensions émotionnelles vous déstabilisent rarement. Vous évoluez avec aisance dans des contextes dynamiques.",
      es: "Posees un umbral sensorial alto. Los ruidos fuertes o tensiones ambientales rara vez desestabilizan tu calma. Funcionas con eficacia en entornos dinámicos y demandantes.",
    },
    superpowers: {
      en: [
        "Unshakeable focus in noisy open offices or crowded spaces",
        "Emotional Teflon: less prone to absorbing others' panic or distress",
        "Swift recovery after intense sensory or social events",
      ],
      id: [
        "Fokus tidak mudah terdistraksi di ruang kantor terbuka atau keramaian",
        "Teflon emosional: tidak mudah menyerap kepanikan orang sekitar",
        "Pemulihan energi yang sangat cepat setelah acara sosial yang padat",
      ],
      de: [
        "Konzentrationsstärke in Großraumbüros und lauten Umgebungen",
        "Emotionale Abgrenzung: Übernahme fremder Ängste findet kaum statt",
        "Rasch regeneriert nach langen sozialen oder geschäftlichen Tagen",
      ],
      fr: [
        "Concentration solide dans les open-spaces et lieux bruyants",
        "Bouclier émotionnel: peu perméable à l'angoisse ambiante",
        "Récupération rapide après de longues sollicitations sociales",
      ],
      es: [
        "Concentración firme en espacios ruidosos y concurridos",
        "Escudo emocional: apenas absorbes la ansiedad ajena",
        "Rápida recuperación tras eventos sociales intensos",
      ],
    },
    vulnerabilities: {
      en: [
        "May dismiss subtle burnout signals until physical exhaustion occurs",
        "Risk of misunderstanding highly sensitive friends or partners as 'dramatic'",
      ],
      id: [
        "Bisa mengabaikan sinyal awal kelelahan sampai tubuh benar-benar tumbang",
        "Cenderung menganggap rekan atau pasangan yang sangat sensitif bersikap 'berlebihan'",
      ],
      de: [
        "Frühe Überlastungssignale des Körpers werden leicht übersehen",
        "Neigung, hochsensible Mitmenschen fälschlicherweise als 'überempfindlich' abzutun",
      ],
      fr: [
        "Risque de négliger les signaux avant-coureurs de fatigue physique",
        "Tendance à percevoir les personnes très sensibles comme excessives",
      ],
      es: [
        "Riesgo de ignorar señales tempranas de agotamiento somático",
        "Tendencia a juzgar a personas altamente sensibles como 'exageradas'",
      ],
    },
    sanctuaryBlueprint: {
      en: [
        "Practice mindful body scans to detect muscular tension before it turns into chronic stiffness.",
        "Cultivate active curiosity for non-verbal cues in sensitive loved ones.",
      ],
      id: [
        "Lakukan body scan rutin untuk mendeteksi ketegangan otot sebelum menjadi pegal kronis.",
        "Tingkatkan kepekaan terhadap sinyal non-verbal dari orang-orang tersayang yang sensitif.",
      ],
      de: [
        "Führe regelmäßige Body-Scans durch, um Verspannungen frühzeitig zu lockern.",
        "Übe dich im aufmerksamen Zuhören für die feinen Zwischentöne sensibler Partner.",
      ],
      fr: [
        "Pratiquez le scan corporel pour détecter les tensions musculaires cachées.",
        "Développez votre attention aux signaux non-verbaux de vos proches sensibles.",
      ],
      es: [
        "Realiza escaneos corporales para notar tensiones musculares acumuladas.",
        "Fomenta la escucha atenta de los matices emocionales de seres queridos.",
      ],
    },
  },

  moderate: {
    level: "moderate",
    scoreRange: "15 - 24",
    badge: {
      en: "Moderate Sensitivity",
      id: "Sensitivitas Menengah",
      de: "Mittlere Sensibilität",
      fr: "Sensibilité Équilibrée",
      es: "Sensibilidad Moderada",
    },
    title: {
      en: "Selective Sensor & Situational Empath",
      id: "Sensor Selektif & Empati Kontekstual",
      de: "Selektiver Sensor & Situative Empathie",
      fr: "Capteur Sélectif & Empathie Équilibrée",
      es: "Sensor Selectivo & Empatía Situacional",
    },
    tagline: {
      en: "You maintain a flexible balance: deeply intuitive when rested, but susceptible to sensory drain when under prolonged stress.",
      id: "Keseimbangan yang adaptif: berintuisi tajam saat cukup istirahat, namun rentan drop ketika terpapar stres berkepanjangan.",
      de: "Ausgeglichene Balance: feinsinnig bei Erholung, jedoch empfindlich bei Dauerbelastung und Schlafmangel.",
      fr: "Un bel équilibre: intuitif et réceptif au repos, mais sensible lors des périodes de stress prolongé.",
      es: "Equilibrio adaptable: intuitivo y receptivo con buen descanso, pero vulnerable ante el estrés sostenido.",
    },
    description: {
      en: "You inhabit the middle of the sensory spectrum. You can comfortably handle modern urban stimulation most days, yet notice a sharp drop in your patience and emotional bandwidth when sleep-deprived, hungry, or overscheduled.",
      id: "Anda berada di titik keseimbangan spektrum sensorik. Anda mampu menghadapi hiruk-pikuk kota atau pekerjaan, tetapi kesabaran dan energi Anda akan drop signifikan bila kurang tidur, telat makan, atau agenda terlalu padat.",
      de: "Du befindest dich im harmonischen Mittelfeld. Du bewältigst den modernen Alltag gut, spürst Reizüberflutung aber deutlich bei Schlafmangel, Hunger oder Termindruck.",
      fr: "Vous vous situez au centre du spectre. Vous gérez le rythme moderne avec succès, mais votre seuil de tolérance chute vite en cas de manque de sommeil ou de journées surchargées.",
      es: "Te encuentras en el punto medio. Toleras bien el ritmo cotidiano, pero tu paciencia decae drásticamente cuando te falta descanso, comida o tiempo a solas.",
    },
    superpowers: {
      en: [
        "Adaptable social chameleon: can mingle in crowds or savor solitude equally",
        "Healthy emotional antenna: empathetic without getting perpetually drowning in others' grief",
        "Good aesthetic appreciation without crippling sensitivity to imperfections",
      ],
      id: [
        "Bunglon sosial adaptif: nyaman berbaur di keramaian maupun menikmati kesendirian",
        "Antena emosi proporsional: mampu berempati tanpa tenggelam dalam kesedihan orang lain",
        "Apresiasi estetika yang baik tanpa terganggu berlebihan oleh ketidaksempurnaan",
      ],
      de: [
        "Soziale Anpassungsfähigkeit: genießt Gesellschaft ebenso wie Rückzug",
        "Gesunde emotionale Resonanz ohne Selbstaufgabe",
        "Feines Kunst- und Naturverständnis mit realistischer Erdung",
      ],
      fr: [
        "Grande flexibilité: à l'aise en société comme dans la solitude",
        "Empathie bien dosée sans absorption toxique des chagrins d'autrui",
        "Sensibilité esthétique raffinée préservant votre pragmatisme",
      ],
      es: [
        "Adaptabilidad social: disfrutas de reuniones tanto como de la soledad",
        "Empatía calibrada: comprendes a los demás sin hundirte en su dolor",
        "Aprecio por los detalles estéticos y el bienestar ambiental",
      ],
    },
    vulnerabilities: {
      en: [
        "Sudden emotional irritability when hungry or sensory-depleted ('hanger' & auditory fatigue)",
        "Overextending social calendar until a forced crash weekend occurs",
      ],
      id: [
        "Sensitif atau mudah kesal tiba-tiba saat lapar atau lelah mendengar suara bising",
        "Terlalu memadatkan jadwal hangout hingga akhirnya tumbang di akhir pekan",
      ],
      de: [
        "Reizbarkeit bei Blutzuckertiefs oder Lärmbelastung",
        "Gefahr, Wochenenden mit sozialen Verpflichtungen zu überfrachten",
      ],
      fr: [
        "Irritabilité soudaine face au bruit ou aux repas différés",
        "Tendance à surcharger ses week-ends jusqu'à l'épuisement",
      ],
      es: [
        "Irritabilidad repentina ante el hambre o la saturación sonora",
        "Sobrecarga de planes de fin de semana hasta colapsar de cansancio",
      ],
    },
    sanctuaryBlueprint: {
      en: [
        "Establish a mandatory 30-minute quiet decompression buffer between work and evening socializing.",
        "Keep high-protein snacks and noise-dampening earplugs handy for unpredictable commute delays.",
      ],
      id: [
        "Sediakan jeda hening 30 menit tanpa gawai antara jam pulang kerja dan sosialisasi malam.",
        "Siapkan camilan sehat dan earplug saat bepergian untuk mencegah kelelahan sensorik di jalan.",
      ],
      de: [
        "Plane 30 Minuten stille Pufferzeit zwischen Feierabend und Abendaktivitäten ein.",
        "Nutze geräuschmindernde Ohrstöpsel im öffentlichen Nahverkehr.",
      ],
      fr: [
        "Instaurez un sas de décompression silencieux de 30 minutes après le travail.",
        "Ayez toujours des bouchons d'oreilles doux pour les transports bruyants.",
      ],
      es: [
        "Reserva un respiro de 30 minutos en silencio al terminar la jornada laboral.",
        "Lleva tapones amortiguadores de sonido para traslados concurridos.",
      ],
    },
  },

  high: {
    level: "high",
    scoreRange: "25 - 34",
    badge: {
      en: "Highly Sensitive Person (HSP)",
      id: "Highly Sensitive Person (HSP)",
      de: "Hochsensible Persönlichkeit (HSP)",
      fr: "Personne Hautement Sensible (HSP)",
      es: "Persona Altamente Sensible (PAS)",
    },
    title: {
      en: "Deep Empath & Nuanced Resonator",
      id: "Deep Empath & Resonansi Mendalam",
      de: "Tiefsinniger Resonanzraum & Empath",
      fr: "Empathie Profonde & Résonance Subtile",
      es: "Empatía Profunda & Resonancia Sensitiva",
    },
    tagline: {
      en: "You have a finely calibrated neurological system. You process life deeply, absorb nuance, and feel the world in high-definition.",
      id: "Sistem saraf Anda terkalibrasi sangat peka. Anda memproses hidup secara mendalam dan merasakan dunia dalam resolusi tinggi.",
      de: "Dein Nervensystem verarbeitet Reize tiefgründig und nimmt die Welt in feinster Nuancierung und hoher Auflösung wahr.",
      fr: "Votre système nerveux perçoit le monde en haute définition. Vous traitez chaque information avec profondeur et finesse.",
      es: "Posees un sistema neurosensorial afinado. Procesas cada experiencia con profundidad y sientes el mundo en alta definición.",
    },
    description: {
      en: "You meet the clinical hallmarks of a Highly Sensitive Person (HSP) identified by Dr. Elaine Aron. Your amygdala and mirror neuron systems fire with heightened resonance. You are not 'broken' or 'fragile'; your nervous system is a high-precision instrument that requires intentional sensory stewardship.",
      id: "Anda memiliki ciri khas Highly Sensitive Person (HSP) sesuai riset Dr. Elaine Aron. Neuron cermin Anda bekerja dengan intensitas tinggi. Anda tidak 'lemah' atau 'terlalu perasa'; sistem saraf Anda adalah instrumen berpresisi tinggi yang memerlukan perlindungan sensorik yang sadar.",
      de: "Du erfüllst die klassischen Kriterien einer hochsensiblen Persönlichkeit (nach Dr. Elaine Aron). Dein Nervensystem ist kein Mangel, sondern ein Hochleistungsinstrument, das gezielten Schutz und Entlastung benötigt.",
      fr: "Vous correspondez au profil de Haute Sensibilité décrit par la Dre Elaine Aron. Vos neurones miroirs réagissent avec intensité. Vous n'êtes pas 'fragile'; votre sensibilité est un instrument de haute précision.",
      es: "Cumples con los criterios de Persona Altamente Sensible (PAS) de la Dra. Elaine Aron. Tu cerebro procesa con máxima empatía. No eres 'débil'; tu sensibilidad es un don que precisa cuidado intencional.",
    },
    superpowers: {
      en: [
        "Uncanny intuitive empathy: reading between lines and sensing hidden emotional dynamics",
        "Profound aesthetic transcendence: music, art, and nature induce deep healing states",
        "Conscientious foresight: spotting pitfalls, risks, and subtle patterns before anyone else",
      ],
      id: [
        "Intuisi empati luar biasa: mampu membaca dinamika emosi tersembunyi dengan akurat",
        "Apresiasi estetika mendalam: musik, seni, dan alam mampu memulihkan jiwa Anda secara cepat",
        "Kecermatan tinggi: mampu mendeteksi potensi risiko dan celah yang terlewatkan orang lain",
      ],
      de: [
        "Außergewöhnliche Intuition für zwischenmenschliche Dynamiken",
        "Tiefe Berührbarkeit durch Musik, Kunst und Natur als innere Kraftquelle",
        "Vorausschauendes Denken: bemerkt Risiken und Unstimmigkeiten frühzeitig",
      ],
      fr: [
        "Intuition relationnelle aiguisée: perception fine des non-dits",
        "Capacité d'émerveillement profond face à la musique, la nature et l'art",
        "Vigilance bienveillante: détection précoce des écueils et détails oubliés",
      ],
      es: [
        "Intuición empática sobresaliente: captas lo que las palabras callan",
        "Conexión sanadora con la música, la naturaleza y la belleza artística",
        "Visión preventiva: anticipas riesgos y necesidades antes que el resto",
      ],
    },
    vulnerabilities: {
      en: [
        "Sensory flooding in malls, supermarkets, or open offices with harsh fluorescent lighting",
        "Emotional hangover after comforting friends through relationship drama or tragedy",
        "Stomach contractions, migraines, or muscle tightness from prolonged environmental noise",
      ],
      id: [
        "Sensory overload di mall, supermarket ramai, atau kantor dengan lampu neon silau",
        "Kelelahan batin (emotional hangover) berjam-jam setelah mendengarkan curhat berat",
        "Sakit kepala, maag, atau leher kaku akibat polusi suara bising yang berkepanjangan",
      ],
      de: [
        "Reizüberflutung in Einkaufszentren oder Großraumbüros mit grellem Kunstlicht",
        "Emotionale Erschöpfung ('Hangover') nach intensiven Krisengesprächen",
        "Körperliche Symptome (Magenkrämpfe, Spannungskopfschmerz) bei Lärm",
      ],
      fr: [
        "Saturation sensorielle dans les centres commerciaux et sous néons agressifs",
        "Gueule de bois émotionnelle après avoir soutenu un ami en détresse",
        "Tensions musculaires ou migraines face au vacarme prolongé",
      ],
      es: [
        "Saturación sensorial en centros comerciales o luces fluorescentes invasivas",
        "Resaca emocional prolongada tras contener el dolor o drama ajeno",
        "Cefaleas o molestias estomacales derivadas del ruido constante",
      ],
    },
    sanctuaryBlueprint: {
      en: [
        "Equip your daily kit with active noise-canceling headphones (or brown noise via Ju Sound Sanctuary).",
        "Replace cool harsh bulbs at home with warm 2700K indirect amber lighting.",
        "Institute a rigid 'Decompression Gate': 20 minutes of silent horizontal resting before talking to anyone post-work.",
        "Discharge emotional residue every night using uncensored somatic voice journaling in Ju.",
      ],
      id: [
        "Gunakan headphone active noise-cancelling atau setel Brown Noise di Ju Sound Sanctuary.",
        "Ganti lampu rumah dengan pencahayaan hangat temaram (2700K amber) yang menenangkan saraf.",
        "Terapkan 'Gerbang Hening': 20 menit berbaring tanpa bicara dan tanpa HP sepulang kerja.",
        "Keluarkan tumpukan energi emosional tiap malam lewat voice journaling tanpa sensor di Ju.",
      ],
      de: [
        "Nutze Noise-Cancelling-Kopfhörer (oder Brown Noise im Ju Sound Sanctuary).",
        "Ersetze grelle Lampen daheim durch warmes, indirektes 2700K Licht.",
        "Schaffe ein festes 20-minütiges Ruhe-Ritual vor dem ersten Abendgespräch.",
        "Lade emotionale Restspannungen allabendlich im Ju Sprachjournal ab.",
      ],
      fr: [
        "Adoptez un casque à réduction de bruit (ou le bruit brun dans Ju Sound Sanctuary).",
        "Privilégiez les lumières chaudes et tamisées (2700K) à votre domicile.",
        "Instaurez un rituel de 20 minutes de silence allongé dès votre retour chez vous.",
        "Déchargez vos tensions quotidiennes via le journal vocal sans filtre sur Ju.",
      ],
      es: [
        "Usa auriculares con cancelación de ruido o reproduce ruido marrón en Ju Sound Sanctuary.",
        "Cambia las bombillas blancas por iluminación cálida indirecta (2700K).",
        "Aplica una 'Pausa de Descarga': 20 minutos de silencio absoluto al volver a casa.",
        "Libera la carga emocional acumulada cada noche con el diario de voz en Ju.",
      ],
    },
  },

  overloaded: {
    level: "overloaded",
    scoreRange: "35 - 45",
    badge: {
      en: "Acute Sensory Overload",
      id: "Sensory Burnout Akut",
      de: "Akute Reizüberflutung",
      fr: "Saturation Sensorielle Sévère",
      es: "Sobrecarga Sensorial Aguda",
    },
    title: {
      en: "The Overstimulated Sponge in Burnout",
      id: "Sensory Sponge dalam Kelelahan Ekstrem",
      de: "Der überreizte Schwamm im Alarmzustand",
      fr: "L'Éponge Émotionnelle en Saturation",
      es: "La Esponja Saturada en Estado de Alarma",
    },
    tagline: {
      en: "Your neurological gates are wide open and your allostatic stress load is peaked. You are operating in an acute sensory red-line.",
      id: "Pintu gerbang saraf Anda terbuka terlalu lebar dan beban stres alostatik memuncak. Sistem Anda dalam fase lampu merah.",
      de: "Deine sensorischen Schutzbarrieren sind erschöpft und dein Nervensystem befindet sich im roten Dauerfeuer.",
      fr: "Vos barrières sensorielles sont épuisées. Votre système nerveux est en état d'alerte maximale.",
      es: "Tus barreras neurosensoriales están colapsadas. Tu sistema se encuentra en zona roja de alarma continua.",
    },
    description: {
      en: "You are experiencing profound sensory burnout and nervous system dysregulation. Every auditory, visual, and emotional input feels like sand on raw skin. You may feel on the verge of tears, rage, or physical collapse from simple everyday demands. Immediate somatic containment and stimulation detox are imperative.",
      id: "Anda sedang mengalami sensory burnout dan disregulasi sistem saraf yang serius. Setiap suara, cahaya silau, atau nada bicara tinggi terasa seperti amplas di atas kulit terluka. Anda mungkin merasa ingin menangis, mudah meledak, atau lunglai lemas dari tuntutan sepele. Anda membutuhkan jeda sensorik darurat sekarang.",
      de: "Du durchlebst ein tiefgreifendes sensorisches Burnout. Jeder Ton, jede Nachfrage und jedes grelle Licht schmerzt wie Sand auf offener Haut. Dein Nervensystem fleht nach radikalem Reizentzug und liebevollem Schutz.",
      fr: "Vous traversez un épuisement sensoriel aigu. Le moindre son, éclairage ou sollicitation vous agresse directement. Votre organisme requiert une diète sensorielle immédiate et bienveillante.",
      es: "Padeces una saturación sensorial extrema. Todo ruido, luz o reclamo ajeno roza como lija sobre piel viva. Tu sistema nervioso necesita descompresión urgente y protección somática.",
    },
    superpowers: {
      en: [
        "Extraordinary psychic acuity: when restored, you possess visionary creative and healing gifts",
        "Deep intuitive compass: an infallible internal detector of authenticity vs falsehood",
      ],
      id: [
        "Ketajaman batin luar biasa: saat pulih, Anda memiliki bakat kreatif dan empati penyembuh yang sangat besar",
        "Kompas intuisi murni: pendeteksi keaslian watak manusia yang hampir tidak pernah meleset",
      ],
      de: [
        "Außerordentliche kreative und heilerische Tiefe im erholten Zustand",
        "Unfehlbarer innerer Kompass für Aufrichtigkeit und emotionale Wahrheiten",
      ],
      fr: [
        "Puissance créative et thérapeutique exceptionnelle une fois régénéré(e)",
        "Radar intérieur infaillible pour déceler la sincérité et l'authenticité",
      ],
      es: [
        "Inmenso potencial creativo y curativo cuando logras recuperar tu balance",
        "Brújula intuitiva exacta para distinguir la autenticidad del engaño",
      ],
    },
    vulnerabilities: {
      en: [
        "Sensory meltdown: crying, rage outbursts, or freezing into complete non-verbal shutdown",
        "Chronic allostatic inflammation, digestive distress, and morning cortisol dread",
        "Inability to tolerate normal conversation or household activity without extreme agitation",
      ],
      id: [
        "Sensory meltdown: menangis histeris, ledakan marah mendadak, atau bungkam total (shutdown)",
        "Peradangan tubuh kronis, gangguan lambung/GERD, dan bangun tidur dengan dada berdebar",
        "Tidak mampu mentolerir obrolan santai atau suara perabot rumah tanpa rasa kesal yang intens",
      ],
      de: [
        "Sensorischer Meltdown: Weinkrämpfe, unkontrollierte Wut oder sprachlose Schockstarre",
        "Chronische Magen-Darm-Beschwerden und morgendlicher Cortisol-Panikimpuls",
        "Überforderung selbst durch alltägliche Begrüßungen oder Küchengeräusche",
      ],
      fr: [
        "Crise de saturation (meltdown) ou mutisme de retrait défensif",
        "Troubles digestifs chroniques et angoisse matinale liée au cortisol",
        "Intolérance immédiate aux conversations ordinaires ou bruits du quotidien",
      ],
      es: [
        "Colapso sensorial (meltdown): llanto incontrolable o bloqueo no verbal",
        "Malestar gástrico constante y picos de cortisol y angustia matutina",
        "Incapacidad para tolerar conversaciones o ruidos domésticos sin irritación",
      ],
    },
    sanctuaryBlueprint: {
      en: [
        "🚨 Immediate Sensory Lockdown: spend the next 2 hours in a completely dark room with eye mask and earplugs.",
        "Cut all social and non-essential work commitments for the next 48 hours without apology.",
        "Perform the 3-minute Stanford Physiological Sigh or Emergency SOS Box Breathing right now.",
        "Limit phone screen time to 15 minutes max; activate grayscale color mode on your device.",
        "Sip warm non-caffeinated tea and listen to low-volume Brown Noise in Ju Sound Sanctuary.",
      ],
      id: [
        "🚨 Isolasi Sensorik Darurat: berbaring 2 jam di kamar gelap total dengan penutup mata dan earplug.",
        "Batalkan semua janji temu atau urusan sosial non-esensial untuk 48 jam ke depan tanpa rasa bersalah.",
        "Lakukan Stanford Physiological Sigh (2 tarikan napas + hembusan panjang) atau buka Panic SOS sekarang.",
        "Ubah layar HP menjadi Grayscale (hitam-putih) dan batasi penggunaannya maksimal 15 menit.",
        "Minum teh herbal hangat tanpa kafein dan putar Brown Noise di Ju Sound Sanctuary.",
      ],
      de: [
        "🚨 Akuter Reiz-Lockdown: Verbringe 2 Stunden in absoluter Dunkelheit mit Schlafmaske und Ohrstöpseln.",
        "Sage alle nicht lebensnotwendigen Verpflichtungen für die nächsten 48 Stunden ab.",
        "Nutze sofort das Stanford Physiological Sigh Tool oder die Notfall-SOS-Atemübung.",
        "Schalte dein Smartphone auf Schwarz-Weiß (Graustufen) und meide soziale Medien komplett.",
        "Trinke beruhigenden Kräutertee und lausche dem sanften Brown Noise im Ju Sound Sanctuary.",
      ],
      fr: [
        "🚨 Sas d'urgence sensorielle: allongez-vous 2 heures dans le noir avec masque et bouchons d'oreilles.",
        "Annulez tous les engagements superflus des prochaines 48 heures sans justification coupable.",
        "Exécutez immédiatement le Soupir Physiologique de Stanford ou le module SOS Panique.",
        "Activez le mode noir et blanc (niveaux de gris) sur votre téléphone et coupez les notifications.",
        "Buvez une infusion tiède et écoutez le bruit brun apaisant sur Ju Sound Sanctuary.",
      ],
      es: [
        "🚨 Protocolo de Aislamiento Inmediato: 2 horas en penumbra absoluta con antifaz y tapones.",
        "Cancela compromisos no vitales durante las próximas 48 horas sin culpa alguna.",
        "Aplica de inmediato el Suspiro Fisiológico de Stanford o la herramienta SOS en Ju.",
        "Configura la pantalla de tu móvil en escala de grises y silencia toda notificación.",
        "Toma una infusión tibia relajante y acompaña tu calma con el Ruido Marrón en Ju.",
      ],
    },
  },
};

export function calculateHspScore(answers: Record<number, number>) {
  let totalScore = 0;
  const dimensionScores: Record<HspDimension, number> = {
    sensory: 0,
    empathy: 0,
    subtlety: 0,
  };

  HSP_QUESTIONS.forEach((q) => {
    const val = answers[q.id] ?? 0;
    totalScore += val;
    dimensionScores[q.dimension] += val;
  });

  let level: HspLevel = "sturdy";
  if (totalScore >= 35) {
    level = "overloaded";
  } else if (totalScore >= 25) {
    level = "high";
  } else if (totalScore >= 15) {
    level = "moderate";
  } else {
    level = "sturdy";
  }

  const profile = HSP_PROFILES[level];
  return {
    totalScore,
    maxScore: 45,
    level,
    profile,
    dimensionScores,
    percentages: {
      sensory: Math.round((dimensionScores.sensory / 15) * 100),
      empathy: Math.round((dimensionScores.empathy / 15) * 100),
      subtlety: Math.round((dimensionScores.subtlety / 15) * 100),
    },
  };
}
