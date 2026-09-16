export type SensoryLang = "en" | "id" | "de" | "fr" | "es";

export interface SensoryQuestion {
  id: number;
  subscale: "sensory_threshold" | "empathic_absorption" | "overstimulation_exhaustion";
  prompt: Record<SensoryLang, string>;
  options: Array<{
    score: number;
    label: Record<SensoryLang, string>;
  }>;
}

export interface SensoryProfile {
  level: "sensory_redline" | "vulnerable_sponge" | "resonant_feeler" | "protected_beacon";
  badge: Record<SensoryLang, string>;
  title: Record<SensoryLang, string>;
  tagline: Record<SensoryLang, string>;
  description: Record<SensoryLang, string>;
  sensoryInsight: Record<SensoryLang, string>;
  decompressionProtocols: Record<SensoryLang, string[]>;
  dailyAffirmation: Record<SensoryLang, string>;
}

export interface SensoryScoreResult {
  totalScore: number;
  maxScore: number;
  percentage: number;
  level: "sensory_redline" | "vulnerable_sponge" | "resonant_feeler" | "protected_beacon";
  profile: SensoryProfile;
  subscales: {
    sensory_threshold: { score: number; max: number; percentage: number };
    empathic_absorption: { score: number; max: number; percentage: number };
    overstimulation_exhaustion: { score: number; max: number; percentage: number };
  };
}

export const SENSORY_QUESTIONS: SensoryQuestion[] = [
  // Subscale 1: Sensory Threshold & Physical Sensitivity
  {
    id: 1,
    subscale: "sensory_threshold",
    prompt: {
      en: "How intensely do loud noises, sudden sirens, or buzzing fluorescent lights physically agitate your nervous system?",
      id: "Seberapa intens suara bising, sirene mendadak, atau dengung lampu neon membuat fisik dan sarafmu tegang?",
      de: "Wie stark belasten laute Geräusche, Sirenen oder summendes Neonlicht dein Nervensystem körperlich?",
      fr: "À quel point les bruits forts, sirènes ou néons qui grésillent agressent-ils physiquement votre corps ?",
      es: "¿Con qué intensidad los ruidos fuertes, sirenas o luces fluorescentes agotan físicamente tu sistema nervioso?",
    },
    options: [
      { score: 0, label: { en: "Hardly notice them, easily tune them out", id: "Hampir tidak terganggu, mudah diabaikan", de: "Kaum spürbar, kann sie leicht ausblenden", fr: "Presque pas, je les ignore facilement", es: "Apenas lo noto, los ignoro con facilidad" } },
      { score: 1, label: { en: "Mildly annoying, but manageable", id: "Sedikit risih tapi masih terkendali", de: "Leicht störend, aber aushaltbar", fr: "Légèrement gênant mais supportable", es: "Algo molesto pero manejable" } },
      { score: 2, label: { en: "Very irritating; causes headaches or muscle clenching", id: "Sangat mengganggu; memicu sakit kepala atau tegang", de: "Sehr belastend; führt zu Kopfschmerz oder Verspannung", fr: "Très irritant: maux de tête ou crispations musculaires", es: "Muy irritante: provoca dolor de cabeza o tensión" } },
      { score: 3, label: { en: "Physically painful, triggering an instant fight-or-flight panic urge", id: "Menyakitkan secara fisik, memicu dorongan panik ingin kabur", de: "Körperlich schmerzhaft, löst Fluchtreflexe aus", fr: "Douloureux physiquement, déclenche une envie de fuite immédiate", es: "Físicamente doloroso, dispara un impulso de huida o pánico" } },
    ],
  },
  {
    id: 2,
    subscale: "sensory_threshold",
    prompt: {
      en: "Do coarse fabrics, scratchy tags, tight collars, or synthetic textures irritate your skin and break your focus?",
      id: "Apakah pakaian kasar, label baju gatal, kerah ketat, atau bahan sintetis membuat kulitmu tidak nyaman dan merusak fokusmu?",
      de: "Stören dich kratzende Kleidungsetiketten, enge Kragen oder raue Stoffe so sehr, dass dein Fokus leidet?",
      fr: "Les étiquettes de vêtements qui grattent ou les matières synthétiques irritent-elles votre peau au point de briser votre concentration ?",
      es: "¿Las etiquetas que pican, cuellos apretados o telas sintéticas irritan tu piel y rompen tu concentración?",
    },
    options: [
      { score: 0, label: { en: "Never pay attention to fabrics", id: "Tidak pernah memperhatikan bahan baju", de: "Achte nie auf Stoffe", fr: "Je ne fais jamais attention aux textiles", es: "Nunca me fijo en los tejidos" } },
      { score: 1, label: { en: "Occasionally cut tags off if very stiff", id: "Sesekali menggunting label jika kaku", de: "Schneide Etiketten gelegentlich ab", fr: "Je coupe parfois les étiquettes trop rigides", es: "A veces corto etiquetas si son muy duras" } },
      { score: 2, label: { en: "Carefully select soft clothes; tags cause real distraction", id: "Harus memilih baju lembut; label sangat mengganggu", de: "Wähle Stoffe gezielt aus; Etiketten lenken stark ab", fr: "Je choisis soigneusement des matières douces", es: "Elijo ropa muy suave; las etiquetas me desconcentran" } },
      { score: 3, label: { en: "Extremely sensitive; wrong texture feels unbearable like sandpaper", id: "Sangat sensitif; tekstur kasar terasa tak tertahankan seperti amplas", de: "Extrem empfindlich; raue Stoffe fühlen sich wie Schmirgelpapier an", fr: "Sensibilité extrême: une mauvaise matière est insupportable", es: "Extremadamente sensible: la tela áspera se siente como lija" } },
    ],
  },
  {
    id: 3,
    subscale: "sensory_threshold",
    prompt: {
      en: "How do crowded shopping malls, crowded airports, or multi-speaker open-plan offices make you feel after 1 hour?",
      id: "Bagaimana perasaanmu setelah 1 jam berada di mal ramai, bandara padat, atau kantor open-space yang bising?",
      de: "Wie fühlst du dich nach einer Stunde im überfüllten Einkaufszentrum, Flughafen oder Großraumbüro?",
      fr: "Comment vous sentez-vous après 1 heure dans un centre commercial bondé ou un open-space bruyant ?",
      es: "¿Cómo te sientes después de 1 hora en un centro comercial abarrotado o una oficina ruidosa?",
    },
    options: [
      { score: 0, label: { en: "Energized or completely unaffected", id: "Bersemangat atau biasa saja", de: "Energetisiert oder unberührt", fr: "Stimulé ou totalement indifférent", es: "Lleno de energía o indiferente" } },
      { score: 1, label: { en: "A bit tired, but nothing unusual", id: "Agak lelah tapi wajar", de: "Etwas müde, aber normal", fr: "Un peu fatigué, mais normal", es: "Un poco cansado pero nada del otro mundo" } },
      { score: 2, label: { en: "Brain fog, irritability, and an urgent desire to retreat", id: "Kabut otak, lekas marah, dan ingin lekas pergi", de: "Gehirnnebel, Gereiztheit, starker Rückzugswunsch", fr: "Brouillard cérébral, irritabilité et besoin de partir", es: "Niebla mental, irritabilidad y urgencia de escapar" } },
      { score: 3, label: { en: "Complete sensory shutdown or panic meltdown; need dark silent recovery", id: "Shutdown total atau histeris; butuh ruangan gelap dan hening", de: "Völliger sensorischer Zusammenbruch; brauche Dunkelheit", fr: "Saturation sensorielle totale, besoin d'une pièce sombre", es: "Colapso sensorial absoluto; necesito un cuarto oscuro y silencio" } },
    ],
  },
  {
    id: 4,
    subscale: "sensory_threshold",
    prompt: {
      en: "Are you unusually sensitive to caffeine, medications, synthetic perfumes, or spicy food?",
      id: "Apakah kamu sangat sensitif terhadap kafein, obat-obatan, parfum kimia menyengat, atau makanan pedas?",
      de: "Reagierst du ungewöhnlich empfindlich auf Koffein, Medikamente, Parfüms oder scharfes Essen?",
      fr: "Êtes-vous particulièrement sensible à la caféine, aux médicaments, parfums forts ou plats épicés ?",
      es: "¿Eres sumamente sensible a la cafeína, fármacos, perfumes intensos o comida picante?",
    },
    options: [
      { score: 0, label: { en: "Normal tolerance for all of them", id: "Toleransi normal untuk semuanya", de: "Ganz normale Verträglichkeit", fr: "Tolérance tout à fait normale", es: "Tolerancia normal a todo" } },
      { score: 1, label: { en: "Slight jitter from late-afternoon espresso", id: "Sedikit gemetar jika minum kopi sore", de: "Leichte Unruhe bei spätem Espresso", fr: "Légère nervosité après un café tardif", es: "Leve temblor con café por la tarde" } },
      { score: 2, label: { en: "Strong physical reactions; minimal doses produce big effects", id: "Reaksi fisik kuat; dosis kecil berdampak besar", de: "Starke Reaktionen; kleine Mengen wirken enorm", fr: "Réactions vives: de faibles doses suffisent", es: "Reacciones intensas: dosis mínimas me afectan mucho" } },
      { score: 3, label: { en: "Extreme hypersensitivity; must avoid caffeine and fragrances entirely", id: "Hipersensitif ekstrem; harus menghindari kafein dan wewangian", de: "Extreme Überempfindlichkeit; meide Duftstoffe und Koffein", fr: "Hypersensibilité totale: j'évite absolument café et parfums", es: "Hipersensibilidad extrema: evito cafeína y fragancias" } },
    ],
  },

  // Subscale 2: Empathic Absorption & Boundary Porosity
  {
    id: 5,
    subscale: "empathic_absorption",
    prompt: {
      en: "When you enter a room where people just had an argument, can you instantly feel the tension in your own body?",
      id: "Saat memasuki ruangan di mana orang baru saja bertengkar, bisakah kamu langsung merasakan ketegangannya di tubuhmu?",
      de: "Wenn du einen Raum betrittst, in dem gestritten wurde: spürst du die dicke Luft sofort am eigenen Körper?",
      fr: "En entrant dans une pièce où une dispute vient d'avoir lieu, ressentez-vous immédiatement la tension dans votre corps ?",
      es: "¿Al entrar en una habitación donde hubo una discusión, sientes instantáneamente la tensión en tu propio cuerpo?",
    },
    options: [
      { score: 0, label: { en: "No, unless someone tells me, I don't notice", id: "Tidak, kecuali diberi tahu", de: "Nein, merke ich nur wenn man es mir sagt", fr: "Non, à moins qu'on ne me le dise", es: "No, a menos que me lo digan directamente" } },
      { score: 1, label: { en: "Sense a slightly awkward vibe", id: "Merasa suasananya agak canggung", de: "Spüre eine leicht komische Stimmung", fr: "Je perçois une atmosphère un peu gênante", es: "Percibo cierta incomodidad en el aire" } },
      { score: 2, label: { en: "Instantly sense it; my stomach knots and posture tightens", id: "Langsung terasa; perut mulas dan tubuh kaku", de: "Spüre es sofort; Magen verkrampft sich", fr: "Je le ressens aussitôt: mon ventre se noue", es: "Lo siento al instante: mi estómago se anuda" } },
      { score: 3, label: { en: "Absorb it violently like an emotional sponge; feels like my own crisis", id: "Menyerapnya seperti spons; terasa seperti krisis diriku sendiri", de: "Saugt es wie ein Schwamm auf; fühlt sich wie mein eigener Stress an", fr: "Je l'absorbe comme une éponge, comme si c'était mon drame", es: "Lo absorbo como una esponja; se siente como mi propia crisis" } },
    ],
  },
  {
    id: 6,
    subscale: "empathic_absorption",
    prompt: {
      en: "How deeply do violent movies, graphic news broadcasts, or cruelty to animals affect you?",
      id: "Seberapa dalam berita kekerasan, film sadis, atau kekejaman pada hewan memengaruhi kondisi batinmu?",
      de: "Wie tief treffen dich gewalttätige Filme, Kriegsnachrichten oder Tierquälerei?",
      fr: "À quel point les films violents, actualités sombres ou maltraitances animales vous heurtent-ils ?",
      es: "¿Hasta qué punto te afectan las noticias de violencia, películas crueles o maltrato animal?",
    },
    options: [
      { score: 0, label: { en: "Recognize it's just media; no lingering effect", id: "Sadar hanya berita/film; tidak terpikirkan", de: "Weiß dass es Fiktion/Nachrichten sind; berührt kaum", fr: "Je prends du recul sans que cela persiste", es: "Sé que es ficción/noticias; no me afecta después" } },
      { score: 1, label: { en: "Unpleasant for a few minutes", id: "Kurang nyaman selama beberapa menit", de: "Ein paar Minuten unangenehm", fr: "Désagréable pendant quelques minutes", es: "Desagradable durante unos minutos" } },
      { score: 2, label: { en: "Haunts me for hours or days; ruins my mood and sleep", id: "Membayangi berhari-hari; mengganggu tidur", de: "Verfolgt mich tagelang; beeinträchtigt Schlaf", fr: "Me hante pendant des jours, perturbe mon sommeil", es: "Me persigue días enteros; arruina mi sueño" } },
      { score: 3, label: { en: "Visceral trauma; I must strictly boycott all news and thrillers to stay stable", id: "Trauma fisik mendalam; harus boikot berita demi kewarasan", de: "Körperliches Trauma; muss Nachrichten völlig meiden", fr: "Traumatisme viscéral: je dois bannir toute violence", es: "Trauma visceral: debo evitar noticias y películas duras" } },
    ],
  },
  {
    id: 7,
    subscale: "empathic_absorption",
    prompt: {
      en: "Do you find yourself chronically exhausted after social events because you subconsciously managed everyone's emotions?",
      id: "Apakah kamu sering kelelahan usai acara sosial karena alam bawah sadarmu sibuk membaca dan menjaga emosi orang lain?",
      de: "Bist du nach Treffen erschöpft, weil du unbewusst die Gefühle aller anderen gemanagt hast?",
      fr: "Êtes-vous vidé après des réunions sociales parce que vous absorbez ou gérez inconsciemment les émotions des autres ?",
      es: "¿Terminas exhausto tras eventos sociales por monitorear o amortiguar inconscientemente las emociones ajenas?",
    },
    options: [
      { score: 0, label: { en: "No, I feel energized and relaxed with people", id: "Tidak, saya justru bersemangat bersama orang lain", de: "Nein, schöpfe Energie aus Begegnungen", fr: "Non, voir du monde me ressource", es: "No, la gente me llena de energía" } },
      { score: 1, label: { en: "Normal social fatigue after a long night", id: "Lelah wajar setelah pesta panjang", de: "Normale Müdigkeit nach langen Abenden", fr: "Fatigue normale après une longue soirée", es: "Cansancio normal tras una reunión larga" } },
      { score: 2, label: { en: "Heavy social hangover; need hours alone to clear others' energy", id: "Social hangover berat; butuh waktu sendiri untuk pulih", de: "Schwerer sozialer Kater; brauche Stunden allein", fr: "Lourde fatigue sociale; besoin de solitude pour me purger", es: "Resaca social pesada; necesito horas a solas para limpiarme" } },
      { score: 3, label: { en: "Severe empathic burnout; feel like a squeezed sponge stripped of personal selfhood", id: "Burnout empati parah; terasa seperti spons diperas tanpa sisa energi", de: "Extremer empathischer Burnout; fühle mich wie ausgesaugt", fr: "Burn-out empathique aigu: vidé de ma propre identité", es: "Burnout empático severo: me siento completamente exprimido" } },
    ],
  },
  {
    id: 8,
    subscale: "empathic_absorption",
    prompt: {
      en: "Can you easily separate someone else's sorrow or anxiety from your own emotional state?",
      id: "Bisakah kamu dengan mudah membedakan kesedihan/kecemasan orang lain dari emosi pribadimu sendiri?",
      de: "Kannst du die Trauer oder Angst anderer leicht von deiner eigenen Gefühlswelt trennen?",
      fr: "Parvenez-vous facilement à dissocier l'angoisse d'un proche de votre propre état intérieur ?",
      es: "¿Puedes separar con facilidad la angustia o tristeza de otra persona de tu propio estado emocional?",
    },
    options: [
      { score: 0, label: { en: "Yes, I have clear, impenetrable emotional boundaries", id: "Ya, batasan emosional saya sangat kokoh", de: "Ja, habe klare und stabile emotionale Grenzen", fr: "Oui, mes frontières émotionnelles sont très claires", es: "Sí, mis límites emocionales son firmes y claros" } },
      { score: 1, label: { en: "Usually, unless it's a very close family member", id: "Biasanya bisa, kecuali untuk keluarga inti", de: "Meistens, außer bei sehr engen Angehörigen", fr: "Généralement, sauf pour mes proches intimes", es: "Por lo general sí, salvo con personas muy cercanas" } },
      { score: 2, label: { en: "Difficult; their pain bleeds directly into my chest", id: "Sulit; penderitaan mereka merembes ke dadaku", de: "Schwierig; ihr Schmerz sickert in meine Brust", fr: "Difficile: leur souffrance déteint sur ma poitrine", es: "Difícil: su dolor se filtra directamente a mi pecho" } },
      { score: 3, label: { en: "Impossible; porous boundaries mean I physically carry their burden for days", id: "Mustahil; batasanku bocor sehingga kubawa beban mereka berhari-hari", de: "Unmöglich; trage ihre Last tagelang als wäre es meine", fr: "Impossible: je porte leur fardeau comme le mien", es: "Imposible: mis límites son tan porosos que cargo con su dolor" } },
    ],
  },

  // Subscale 3: Low Overstimulation Ceiling & Deep Processing
  {
    id: 9,
    subscale: "overstimulation_exhaustion",
    prompt: {
      en: "When you have a busy day with multiple meetings, errands, and tasks, how rapidly does your cognitive battery deplete?",
      id: "Saat harimu padat dengan banyak rapat dan tugas beruntun, seberapa cepat baterai kognitifmu habis?",
      de: "Wie schnell leert sich deine mentale Batterie an Tagen mit vielen Terminen und Aufgaben?",
      fr: "À quelle vitesse votre batterie mentale se vide-t-elle lors d'une journée chargée de rendez-vous ?",
      es: "¿Con qué rapidez se agota tu batería mental en días con múltiples reuniones y recados?",
    },
    options: [
      { score: 0, label: { en: "I thrive on multitasking and fast pace", id: "Saya justru bersemangat dengan ritme cepat", de: "Blühe bei Multitasking und Tempo auf", fr: "J'adore le multitâche et le rythme rapide", es: "Me crezco con el ritmo rápido y multitarea" } },
      { score: 1, label: { en: "Normal tiredness by evening", id: "Lelah wajar di malam hari", de: "Normale Müdigkeit am Abend", fr: "Fatigue normale le soir venu", es: "Cansancio normal al final de la tarde" } },
      { score: 2, label: { en: "Frazzled by mid-afternoon; memory and focus drop steeply", id: "Kewalahan di tengah hari; ingatan dan fokus anjlok", de: "Ab dem Nachmittag blockiert; Fokus bricht ein", fr: "Épuisé dès l'après-midi, concentration en chute libre", es: "Saturado a media tarde; la concentración se desploma" } },
      { score: 3, label: { en: "Acute neuro overload; cannot form sentences or make simple decisions", id: "Overload saraf akut; sulit bicara atau ambil keputusan sepele", de: "Völlige Reizüberflutung; kann kaum noch einfache Sätze bilden", fr: "Surcharge nerveuse aiguë: incapable de prendre la moindre décision", es: "Sobrecarga neurológica severa: incapaz de decidir o hilar frases" } },
    ],
  },
  {
    id: 10,
    subscale: "overstimulation_exhaustion",
    prompt: {
      en: "Do you require long stretches of undisturbed solitude in a quiet, dimly lit room to feel normal again?",
      id: "Apakah kamu membutuhkan waktu menyendiri yang panjang di ruangan tenang dan temaram untuk kembali pulih?",
      de: "Brauchst du lange Phasen ungestörter Einsamkeit in einem abgedunkelten, stillen Raum?",
      fr: "Avez-vous impérativement besoin de longs moments de solitude dans le noir pour récupérer ?",
      es: "¿Necesitas largos periodos de soledad ininterrumpida en un cuarto silencioso y oscuro para recuperarte?",
    },
    options: [
      { score: 0, label: { en: "No, a 15-minute break or social chat recharges me", id: "Tidak, istirahat 15 menit sudah cukup", de: "Nein, 15 Minuten Pause genügen völlig", fr: "Non, une pause de 15 minutes me suffit", es: "No, 15 minutos de descanso bastan" } },
      { score: 1, label: { en: "An hour of quiet time in the evening", id: "Satu jam santai di malam hari", de: "Eine ruhige Stunde am Abend", fr: "Une heure de calme le soir", es: "Una hora tranquila por la noche" } },
      { score: 2, label: { en: "Several hours of silent isolation without phone calls", id: "Beberapa jam isolasi hening tanpa telepon", de: "Mehrere Stunden Stille ohne Telefonate", fr: "Plusieurs heures de silence sans écran ni appel", es: "Varias horas de aislamiento sin llamadas ni ruidos" } },
      { score: 3, label: { en: "Full sensory cocooning (noise cancelling, dark curtains, total silence) is mandatory", id: "Wajib kepompong sensori total (gorden gelap, kedap suara, hening)", de: "Völliger sensorischer Kokon (Dunkelheit, Noise-Cancelling) unverzichtbar", fr: "Cocon sensoriel total indispensable (noir complet, casque anti-bruit)", es: "Capullo sensorial absoluto imprescindible (antifaz, silencio total)" } },
    ],
  },
  {
    id: 11,
    subscale: "overstimulation_exhaustion",
    prompt: {
      en: "When people watch you while you perform a task (e.g. driving, typing, cooking), does your performance plummet?",
      id: "Saat orang memperhatikanmu bekerja (misal menyetir, mengetik, memasak), apakah performamu mendadak anjlok?",
      de: "Wenn dir jemand bei der Arbeit zusieht (beim Fahren, Tippen, Kochen): bricht deine Leistung drastisch ein?",
      fr: "Lorsque l'on vous observe faire une tâche (conduire, cuisiner, taper), perdez-vous tous vos moyens ?",
      es: "¿Cuando alguien te observa mientras realizas una tarea (conducir, escribir, cocinar), tu rendimiento se desploma?",
    },
    options: [
      { score: 0, label: { en: "No, I don't care or I perform even better", id: "Tidak, santai saja atau malah lebih bagus", de: "Nein, stört mich nicht oder spornt an", fr: "Non, cela m'est égal ou me motive", es: "No me importa, o incluso rindo mejor" } },
      { score: 1, label: { en: "A slight self-consciousness that quickly passes", id: "Sedikit canggung sesaat lalu terbiasa", de: "Kurze Befangenheit, die rasch vergeht", fr: "Une légère gêne qui passe vite", es: "Leve timidez inicial que pasa pronto" } },
      { score: 2, label: { en: "Substantial nervousness; hands shake or silly mistakes increase", id: "Cukup gugup; tangan gemetar atau salah ketik", de: "Deutliche Nervosität; Hände zittern, Fehler häufen sich", fr: "Nervosité notable: mains qui tremblent, erreurs bêtes", es: "Bastante nerviosismo: manos temblorosas o errores tontos" } },
      { score: 3, label: { en: "Paralyzing overstimulation; brain freezes completely under observation", id: "Overstimulasi melumpuhkan; otak mendadak hang saat dilihat", de: "Lähmende Reizüberflutung; Gehirn blockiert unter Beobachtung völlig", fr: "Paralysie totale: mon cerveau se fige complètement sous le regard", es: "Parálisis por sobreestimulación: el cerebro se bloquea por completo" } },
    ],
  },
  {
    id: 12,
    subscale: "overstimulation_exhaustion",
    prompt: {
      en: "Do you have a rich, complex inner world, with profound appreciation for music, art, poetry, or nature?",
      id: "Apakah kamu memiliki dunia batin yang kaya dan dalam, serta getaran apresiasi mendalam terhadap musik, seni, atau alam?",
      de: "Besitzt du eine reiche, komplexe Innenwelt mit tiefer Empfänglichkeit für Musik, Kunst oder Natur?",
      fr: "Avez-vous une vie intérieure riche avec une émotion profonde face à la musique, l'art ou la nature ?",
      es: "¿Tienes un mundo interior rico y una conmoción profunda ante la música, el arte o la naturaleza?",
    },
    options: [
      { score: 0, label: { en: "I am strictly pragmatic and outward-focused", id: "Saya sangat pragmatis dan fokus pada hal luar", de: "Bin rein pragmatisch nach außen orientiert", fr: "Je suis très pragmatique, tourné vers l'extérieur", es: "Soy puramente pragmático y enfocado hacia afuera" } },
      { score: 1, label: { en: "Enjoy music or scenery normally", id: "Menikmati musik atau pemandangan sewajarnya", de: "Genieße Musik oder Landschaft normal", fr: "J'apprécie la musique ou un paysage normalement", es: "Disfruto de la música y el paisaje de forma normal" } },
      { score: 2, label: { en: "Deeply moved to goosebumps or tears by beauty and sound", id: "Mudah merinding atau terharu menangis melihat keindahan", de: "Bekomme leicht Gänsehaut oder Tränen bei wahrer Schönheit", fr: "Profondément ému aux larmes ou frissons par la beauté", es: "Me conmuevo hasta las lágrimas o se me eriza la piel" } },
      { score: 3, label: { en: "Transcendent depth; aesthetics and nature directly calibrate my nervous system", id: "Sangat mendalam; keindahan seni dan alam meregulasi langsung jiwaku", de: "Transzendente Tiefe; Ästhetik reguliert mein Nervensystem unmittelbar", fr: "Intensité quasi spirituelle: la beauté me régénère biologiquement", es: "Intensidad trascendente: el arte y la naturaleza curan mi sistema" } },
    ],
  },
];

export const SENSORY_PROFILES: Record<string, SensoryProfile> = {
  sensory_redline: {
    level: "sensory_redline",
    badge: {
      en: "Sensory Redline & Empathic Crisis",
      id: "Krisis Sensori & Burnout Empati Akut",
      de: "Sensorischer Alarmzustand & Reizüberflutung",
      fr: "Saturation Sensorielle & Crise Empathique",
      es: "Saturación Sensorial y Crisis Empática",
    },
    title: {
      en: "The Overstimulated Sensorium",
      id: "Sensorium Terlampau Terbakar",
      de: "Das Überreizte Nervensystem",
      fr: "Le Système Nerveux à Fleur de Peau",
      es: "El Sensorio Sobrecargado",
    },
    tagline: {
      en: "Extreme sensory processing sensitivity with acute nervous system depletion and porous boundaries.",
      id: "Sensitivitas sensori ekstrem dengan penipisan daya tahan saraf dan batasan yang bocor.",
      de: "Extreme Reizoffenheit mit akut erschöpfter Reizschwelle und durchlässigen Schutzgrenzen.",
      fr: "Hypersensibilité sensorielle extrême avec épuisement nerveux aigu et frontières poreuses.",
      es: "Hipersensibilidad sensorial extrema con agotamiento neurovegetativo y límites permeables.",
    },
    description: {
      en: "You are operating at a clinical sensory redline as conceptualized by Dr. Elaine Aron (Sensory Processing Sensitivity SPS). Your central nervous system processes environmental stimuli and interpersonal micro-cues with immense depth, but your sensory filter is completely worn down. Fluorescent lights, crowded spaces, and emotional conflicts trigger physical pain, cognitive shutdown, and intense autonomic exhaustion.",
      id: "Kamu berada dalam kondisi batas merah sensori menurut model Sensory Processing Sensitivity (SPS) Dr. Elaine Aron. Sistem saraf pusatmu memproses rangsangan lingkungan dan emosi orang lain dengan kedalaman luar biasa, tetapi filter sensorimu sudah terkikis habis. Lampu neon, keramaian, dan konflik fisik memicu rasa sakit fisik, kebuntuan berpikir, dan kelelahan saraf akut.",
      de: "Du befindest dich im absoluten roten Bereich der Hochsensibilität (SPS nach Dr. Elaine Aron). Dein Nervensystem nimmt Reize und emotionale Schwingungen ungefiltert auf. Laute Umgebungen, grelles Licht und soziale Spannungen führen zu körperlichen Schmerzen, Denkblockaden und neurogener Erschöpfung.",
      fr: "Vous êtes en zone critique de saturation sensorielle (SPS selon le Dr Elaine Aron). Votre système nerveux traite le moindre stimulus avec une profondeur extrême, mais vos filtres protecteurs sont épuisés. Le bruit, les néons et les tensions d'autrui provoquent des douleurs somatiques et un épuisement profond.",
      es: "Te encuentras en la zona roja de hipersensibilidad sensorial (SPS según la Dra. Elaine Aron). Tu sistema nervioso central procesa cada estímulo con una profundidad inmensa, pero tus filtros de contención están agotados. Las multitudes, luces intensas y conflictos provocan dolor físico y parálisis cognitiva.",
    },
    sensoryInsight: {
      en: "Sensory Processing Sensitivity is not a disorder, but an innate evolutionary trait found in 20% of humans. When overstimulated, your amygdala and insula light up intensely, flooding your system with cortisol and norepinephrine.",
      id: "Sensory Processing Sensitivity bukanlah gangguan mental, melainkan sifat evolusi bawaan pada 20% populasi. Saat overstimulasi, amigdala dan insula menyala intens, membanjiri tubuh dengan kortisol dan norepinefrin.",
      de: "Hochsensibilität ist keine Krankheit, sondern ein neurobiologisches Merkmal bei ca. 20 % aller Menschen. Bei Reizüberflutung feuern Amygdala und Insula auf Hochtouren und schütten Stresshormone aus.",
      fr: "L'hypersensibilité n'est pas un trouble, mais un trait inné chez 20% de la population. En cas de saturation, l'insula et l'amygdale s'emballent, inondant le corps de cortisol.",
      es: "La Alta Sensibilidad (SPS) no es un trastorno, sino un rasgo innato en el 20% de los seres humanos. Ante la sobreestimulación, la ínsula y la amígdala disparan niveles altos de cortisol y noradrenalina.",
    },
    decompressionProtocols: {
      en: [
        "Sensory Deprivation Protocol: Spend 20 minutes daily in a pitch-black room with high-grade noise-cancelling headphones or soft brown noise.",
        "Auditory Armor: Wear silicone earplugs (such as Loop or soft foam) whenever entering supermarkets, public transit, or crowded cafes.",
        "The Somatic Teflon Shield: Mentally visualize a translucent, diamond-hard coating around your aura. Their emotional storm slides off like water on Teflon.",
      ],
      id: [
        "Protokol Deprivasi Sensori: Luangkan 20 menit setiap hari di kamar gelap gulita dengan headphone peredam bising atau derau cokelat (brown noise).",
        "Pelindung Pendengaran: Gunakan earplug silikon peredam suara saat memasuki supermarket, transportasi umum, atau kafe ramai.",
        "Perisai Somatik Teflon: Visualisasikan lapisan pelindung transparan sekeras berlian di sekeliling tubuhmu. Emosi orang lain akan meluncur jatuh seperti air di atas daun talas.",
      ],
      de: [
        "Reizentzug-Protokoll: Täglich 20 Minuten im völlig abgedunkelten Raum mit Noise-Cancelling-Kopfhörern oder Brown Noise verbringen.",
        "Akustische Schutzmaske: Trage Silikon-Ohrstöpsel in Supermärkten, öffentlichen Verkehrsmitteln oder belebten Straßen.",
        "Der Teflon-Schutzschild: Stelle dir eine diamantene, glatte Hülle um dich vor. Die Anspannung anderer perlt daran ab wie Wasser.",
      ],
      fr: [
        "Protocole de Décompression Sensorielle: 20 minutes par jour dans une pièce obscure avec casque anti-bruit ou bruit brun.",
        "Protection Auditive: Portez des bouchons d'oreille discrets dans les supermarchés, transports ou lieux bondés.",
        "Le Bouclier de Téflon: Visualisez une carapace transparente et lisse autour de vous: l'anxiété d'autrui glisse dessus sans vous imprégner.",
      ],
      es: [
        "Protocolo de Cámara Sensorial: Pasa 20 minutos al día en oscuridad total con auriculares con cancelación de ruido o ruido marrón.",
        "Armadura Acústica: Usa tapones de silicona al entrar a supermercados, transporte público o cafés bulliciosos.",
        "El Escudo de Teflón: Visualiza una coraza transparente impenetrable; la tensión ajena resbala sobre ti sin ser absorbida.",
      ],
    },
    dailyAffirmation: {
      en: "My sensitivity is a calibrated gift, not an open door for everyone's chaos.",
      id: "Kepekaanku adalah anugerah yang terkalibrasi, bukan pintu terbuka bagi kekacauan orang lain.",
      de: "Meine Feinfühligkeit ist eine wertvolle Gabe, keine offene Tür für das Chaos anderer.",
      fr: "Ma sensibilité est une boussole précieuse, pas une porte ouverte au chaos des autres.",
      es: "Mi sensibilidad es un don calibrado, no una puerta abierta al caos ajeno.",
    },
  },
  vulnerable_sponge: {
    level: "vulnerable_sponge",
    badge: {
      en: "High SPS with Boundary Strain",
      id: "Kepekaan Tinggi & Batasan Lemah",
      de: "Hohe Sensibilität mit Grenzerschoepfung",
      fr: "Forte Sensibilité & Fatigue Empathique",
      es: "Alta Sensibilidad con Límites Porosos",
    },
    title: {
      en: "The Empathic Resonator",
      id: "Penyerap Emosional Rentan",
      de: "Der Empathische Schwamm",
      fr: "L'Éponge Émotionnelle",
      es: "El Resonador Empático",
    },
    tagline: {
      en: "Rich sensory and emotional perception, but vulnerable to fast energy depletion in harsh environments.",
      id: "Persepsi sensori dan emosi yang sangat kaya, namun mudah kehabisan energi di lingkungan keras.",
      de: "Reiche Wahrnehmung, jedoch anfällig für rasche Reizüberflutung in fordernden Umgebungen.",
      fr: "Perception sensorielle riche, mais vulnérable à l'épuisement rapide en milieu bruyant.",
      es: "Percepción sensorial profunda, pero vulnerable al desgaste rápido en entornos invasivos.",
    },
    description: {
      en: "You possess the hallmark traits of a Highly Sensitive Person. Your depth of processing allows you to notice subtle beauty, nuanced micro-expressions, and atmospheric changes that others miss. However, without firm sensory and empathic boundaries, you frequently absorb other people's stress and require substantial downtime to recalibrate.",
      id: "Kamu memiliki karakteristik khas seorang Highly Sensitive Person (HSP). Kedalaman pemrosesan sarafmu membuatmu mampu menangkap keindahan halus, ekspresi mikro, dan perubahan suasana yang terlewatkan orang lain. Namun, tanpa batasan tegas, kamu sering menyerap stres orang lain dan butuh waktu lama untuk memulihkan diri.",
      de: "Du zeigst die klassischen Merkmale einer hochsensiblen Persönlichkeit. Deine Wahrnehmung für Details, Kunst und Stimmungen ist tief ausgeprägt. Ohne klare Grenzen saugst du jedoch fremden Stress auf und benötigst lange Ruhepausen.",
      fr: "Vous possédez les traits caractéristiques de l'hypersensibilité. Vous remarquez les nuances invisibles aux autres, mais sans limites claires, vous absorbez les humeurs négatives environnantes.",
      es: "Posees los rasgos distintivos de la Alta Sensibilidad. Tu capacidad de captar matices es un talento, pero sin límites claros absorbes la tensión ajena y te desgastas rápidamente.",
    },
    sensoryInsight: {
      en: "Mirror neurons in your brain show heightened activation during social interactions, causing vicarious emotional processing.",
      id: "Neuron cermin (mirror neurons) di otakmu sangat aktif dalam interaksi sosial, memicu pemrosesan emosi empati berlebih.",
      de: "Spiegelneuronen in deinem Gehirn feuern überdurchschnittlich stark bei zwischenmenschlichen Kontakten.",
      fr: "Vos neurones miroirs présentent une forte activation, induisant une résonance émotionnelle immédiate.",
      es: "Tus neuronas espejo presentan una alta activación, provocando que sientas el dolor ajeno como propio.",
    },
    decompressionProtocols: {
      en: [
        "The 90-Minute Social Cap: Give yourself permission to leave loud gatherings after 90 minutes without guilt.",
        "Transition Buffers: Schedule 15 minutes of silent car or room sitting between work and home.",
        "Lighting Regulation: Replace harsh ceiling bulbs with warm 2700K floor lamps or dimmers at home.",
      ],
      id: [
        "Batas Waktu Sosial 90 Menit: Beri dirimu izin untuk pamit dari keramaian setelah 90 menit tanpa rasa bersalah.",
        "Jeda Transisi Tenang: Luangkan 15 menit duduk hening di mobil atau kamar di antara waktu kerja dan rumah.",
        "Pencahayaan Hangat: Ganti lampu neon putih yang menyengat dengan lampu tidur hangat 2700K di rumah.",
      ],
      de: [
        "90-Minuten-Regel: Verlasse anstrengende Feiern nach 90 Minuten ohne schlechtes Gewissen.",
        "Übergangspuffer: Schalte zwischen Arbeit und Feierabend 15 Minuten absolute Stille ein.",
        "Warmes Licht: Ersetze kaltweißes Deckenlicht durch warme 2700K Stehlampen zu Hause.",
      ],
      fr: [
        "Plafond Social de 90 Minutes: Autorisez-vous à quitter les fêtes au bout d'1h30 sans culpabilité.",
        "Sas de Décompression: Isolez-vous 15 minutes dans le silence entre le travail et la maison.",
        "Éclairage Tamisé: Privilégiez les lampes à poser chaudes (2700K) aux plafonniers agressifs.",
      ],
      es: [
        "Límite Social de 90 Minutos: Permítete marcharte de reuniones ruidosas tras hora y media sin culpa.",
        "Espacio de Transición: Pasa 15 minutos en silencio en el coche o habitación al volver del trabajo.",
        "Luz Cálida: Sustituye luces blancas de techo por lámparas indirectas y cálidas en casa.",
      ],
    },
    dailyAffirmation: {
      en: "I do not need to carry the room's weather. I can be aware without absorbing.",
      id: "Aku tidak perlu memikul cuaca di ruangan ini. Aku bisa peka tanpa harus menyerap.",
      de: "Ich muss nicht das seelische Wetter des Raumes tragen. Wahrnehmen heißt nicht aufsaugen.",
      fr: "Je n'ai pas à porter la météo de la pièce. Je peux ressentir sans absorber.",
      es: "No tengo que cargar con el clima emocional del lugar. Puedo percibir sin absorber.",
    },
  },
  resonant_feeler: {
    level: "resonant_feeler",
    badge: {
      en: "Balanced Sensory Processing",
      id: "Pemrosesan Sensori Seimbang",
      de: "Ausgeglichene Reizverarbeitung",
      fr: "Sensibilité Équilibrée",
      es: "Sensibilidad Equilibrada",
    },
    title: {
      en: "The Grounded Sensor",
      id: "Pribadi Sensitif Terkendali",
      de: "Der Ausbalancierte Wahrnehmer",
      fr: "Le Pragmatique Conscient",
      es: "El Sensor Equilibrado",
    },
    tagline: {
      en: "Healthy sensory awareness with functional adaptive resilience and manageable fatigue.",
      id: "Kesadaran sensori yang sehat dengan daya tahan adaptif dan kelelahan yang terkendali.",
      de: "Gesunde Reizwahrnehmung mit guter Resilienz und kontrollierbarer Erschöpfung.",
      fr: "Bonne sensibilité avec résilience naturelle et fatigue bien gérée.",
      es: "Sensibilidad equilibrada con buena resiliencia y desgaste controlado.",
    },
    description: {
      en: "You have moderate sensory processing sensitivity. You appreciate beauty, fine aesthetics, and emotional depth without suffering severe daily debilitation. When overstimulated, your nervous system recovers relatively quickly through ordinary sleep and recreation.",
      id: "Kamu memiliki tingkat sensitivitas sensori yang moderat dan seimbang. Kamu mampu mengapresiasi seni, keindahan, dan kedalaman emosi tanpa menderita overstimulasi parah. Sistem sarafmu dapat pulih dengan cepat melalui istirahat yang wajar.",
      de: "Du verfügst über eine gesunde, gut regulierte Wahrnehmung. Du genießt Kunst und Natur, ohne im Alltag schnell überfordert zu sein. Dein Nervensystem regeneriert sich verlässlich.",
      fr: "Vous bénéficiez d'une sensibilité harmonieuse. Vous appréciez l'art et les émotions sans souffrir d'un effondrement sensoriel régulier.",
      es: "Posees una sensibilidad moderada y bien integrada. Disfrutas de la belleza y la profundidad emocional sin caer en saturaciones debilitantes.",
    },
    sensoryInsight: {
      en: "Your nervous system balances high interoceptive awareness with sturdy prefrontal filtering, screening out non-essential environmental noise.",
      id: "Sistem sarafmu menyeimbangkan kesadaran interosepsi tinggi dengan penyaringan korteks prefrontal yang kokoh.",
      de: "Dein Nervensystem kombiniert feine Wahrnehmung mit wirksamer Reizfilterung im präfrontalen Kortex.",
      fr: "Votre système nerveux concilie finesse de perception et filtrage efficace des bruits parasites.",
      es: "Tu sistema nervioso equilibra una alta percepción con un filtrado eficaz de ruidos secundarios.",
    },
    decompressionProtocols: {
      en: [
        "Maintain regular exercise and sleep routines.",
        "Take intentional micro-pauses during high-intensity workdays.",
        "Keep enjoying nature walks and creative pursuits.",
      ],
      id: [
        "Jaga rutinitas olahraga dan tidur yang teratur.",
        "Ambil jeda singkat secara teratur saat hari kerja sibuk.",
        "Terus nikmati jalan-jalan di alam dan aktivitas kreatif.",
      ],
      de: [
        "Halte regelmäßige Schlaf- und Bewegungsroutinen aufrecht.",
        "Gönne dir an fordernden Tagen bewusste kurze Atempausen.",
        "Verbringe Zeit in der Natur und bei kreativen Hobbys.",
      ],
      fr: [
        "Maintenez une bonne hygiène de sommeil et d'activité physique.",
        "Prenez de courtes pauses respiratoires lors des journées denses.",
        "Continuez de vous ressourcer au contact de la nature.",
      ],
      es: [
        "Conserva rutinas regulares de ejercicio y descanso.",
        "Toma micropausas conscientes en jornadas laborales intensas.",
        "Sigue disfrutando de paseos en la naturaleza y actividades creativas.",
      ],
    },
    dailyAffirmation: {
      en: "My calm inner center remains steady in a noisy world.",
      id: "Pusat ketenangan batinku tetap kokoh di tengah dunia yang bising.",
      de: "Mein ruhiges inneres Zentrum bleibt in einer lauten Welt stabil.",
      fr: "Mon calme intérieur demeure inaltérable au milieu du bruit du monde.",
      es: "Mi centro interior de paz permanece inalterable en un mundo ruidoso.",
    },
  },
  protected_beacon: {
    level: "protected_beacon",
    badge: {
      en: "Regulated High Sensory Fluency",
      id: "Kedaulatan Sensori & Regulasi Puncak",
      de: "Regulierte Hohe Reizkompetenz",
      fr: "Maîtrise Sensorielle & Sérénité",
      es: "Fluidez Sensorial Autorregulada",
    },
    title: {
      en: "The Anchored Beacon",
      id: "Mercusuar Berakar Kokoh",
      de: "Der Geerdete Leuchtturm",
      fr: "Le Phare Inébranlable",
      es: "El Faro Firme",
    },
    tagline: {
      en: "Optimal low sensory reactivity with formidable nervous system resilience and firm protective boundaries.",
      id: "Reaktivitas sensori rendah yang optimal dengan ketahanan sistem saraf prima dan batasan kokoh.",
      de: "Hohe nervliche Belastbarkeit mit hervorragender Reizfilterung und stabilen Schutzgrenzen.",
      fr: "Excellente tolérance aux stimuli avec une grande résilience nerveuse et des limites nettes.",
      es: "Excelente resiliencia neurológica con sólidos filtros protectores frente al entorno.",
    },
    description: {
      en: "Your sensory nervous system is exceptionally resilient. Environmental noise, crowds, emotional friction, and intense multitasking barely faze you. You maintain deep emotional equilibrium, effortless boundary setting, and robust cognitive endurance across challenging environments.",
      id: "Sistem saraf sensorimu sangat tangguh. Kebisingan lingkungan, keramaian, gesekan emosi orang lain, dan multitasking padat hampir tidak menggoyahkanmu. Kamu memiliki stabilitas emosional yang prima dan batasan diri yang sangat alami.",
      de: "Dein Nervensystem ist extrem belastbar. Lärm, Menschenmengen und emotionale Konflikte bringen dich kaum aus der Ruhe. Du setzt mühelos klare Grenzen und bleibst gelassen.",
      fr: "Votre système nerveux fait preuve d'une robustesse remarquable. Le bruit, la foule et le stress ambiant glissent sur vous sans entamer votre clarté mentale.",
      es: "Tu sistema nervioso posee una notable robustez. El ruido, las prisas y la agitación ajena no alteran tu serenidad ni tu capacidad de trabajo.",
    },
    sensoryInsight: {
      en: "Your autonomic nervous system maintains dominant vagal brake activity, preventing sensory overload triggers from escalating into stress states.",
      id: "Sistem saraf otonommu memiliki rem vagal yang sangat dominan, mencegah rangsangan sensorik memicu reaksi stres.",
      de: "Deine Vagusbremse arbeitet hocheffizient und verhindert, dass sensorische Reize in Stressreaktionen umschlagen.",
      fr: "Votre frein vagal régule parfaitement l'influx sensoriel, évitant toute bascule en état de panique.",
      es: "Tu freno vagal opera con máxima eficacia, evitando que los estímulos se transformen en estrés biológico.",
    },
    decompressionProtocols: {
      en: [
        "Continue setting a healthy model of grounded composure for sensitive peers.",
        "Offer grounded, compassionate space to overstimulated loved ones.",
        "Embrace complex challenges with your natural nervous system stamina.",
      ],
      id: [
        "Jadilah teladan ketenangan bagi orang-orang sensitif di sekitarmu.",
        "Beri ruang aman dan tenang bagi orang terdekat yang sedang overstimulasi.",
        "Manfaatkan stamina sarafmu untuk menyelesaikan tantangan hidup yang kompleks.",
      ],
      de: [
        "Sei ein beruhigender Anker für feinfühligere Menschen in deinem Umfeld.",
        "Biete überreizten Mitmenschen einen sicheren, ruhigen Raum.",
        "Nutze deine nervliche Ausdauer für anspruchsvolle Aufgaben.",
      ],
      fr: [
        "Restez un repère apaisant pour les personnes plus sensibles qui vous entourent.",
        "Offrez une présence stable et sécurisante en cas de crise extérieure.",
        "Mettez cette belle endurance au service de vos projets.",
      ],
      es: [
        "Sirve de ancla de calma para personas más sensibles en tu entorno.",
        "Ofrece una presencia protectora y serena ante momentos de crisis.",
        "Aprovecha tu solidez nerviosa para emprender retos desafiantes.",
      ],
    },
    dailyAffirmation: {
      en: "I am a steady harbor; external noise has no power over my inner peace.",
      id: "Aku adalah pelabuhan yang tenang; kebisingan luar tak berdaya menggoyahkan kedamaian batinku.",
      de: "Ich bin ein sicherer Hafen; äußerer Lärm hat keine Macht über meinen inneren Frieden.",
      fr: "Je suis un port paisible; le vacarme extérieur n'a aucune prise sur ma paix intérieure.",
      es: "Soy un puerto seguro; el ruido exterior no tiene poder sobre mi paz interior.",
    },
  },
};

export function calculateSensoryOverloadScore(answers: Record<number, number>): SensoryScoreResult {
  let totalScore = 0;
  const maxScore = SENSORY_QUESTIONS.length * 3; // 36

  const subscaleScores: Record<string, { score: number; max: number }> = {
    sensory_threshold: { score: 0, max: 12 },
    empathic_absorption: { score: 0, max: 12 },
    overstimulation_exhaustion: { score: 0, max: 12 },
  };

  SENSORY_QUESTIONS.forEach((q) => {
    const score = answers[q.id] ?? 0;
    totalScore += score;
    if (subscaleScores[q.subscale]) {
      subscaleScores[q.subscale].score += score;
    }
  });

  const percentage = Math.round((totalScore / maxScore) * 100);

  let level: "sensory_redline" | "vulnerable_sponge" | "resonant_feeler" | "protected_beacon";
  if (percentage >= 70) {
    level = "sensory_redline";
  } else if (percentage >= 45) {
    level = "vulnerable_sponge";
  } else if (percentage >= 20) {
    level = "resonant_feeler";
  } else {
    level = "protected_beacon";
  }

  return {
    totalScore,
    maxScore,
    percentage,
    level,
    profile: SENSORY_PROFILES[level],
    subscales: {
      sensory_threshold: {
        score: subscaleScores.sensory_threshold.score,
        max: subscaleScores.sensory_threshold.max,
        percentage: Math.round((subscaleScores.sensory_threshold.score / subscaleScores.sensory_threshold.max) * 100),
      },
      empathic_absorption: {
        score: subscaleScores.empathic_absorption.score,
        max: subscaleScores.empathic_absorption.max,
        percentage: Math.round((subscaleScores.empathic_absorption.score / subscaleScores.empathic_absorption.max) * 100),
      },
      overstimulation_exhaustion: {
        score: subscaleScores.overstimulation_exhaustion.score,
        max: subscaleScores.overstimulation_exhaustion.max,
        percentage: Math.round((subscaleScores.overstimulation_exhaustion.score / subscaleScores.overstimulation_exhaustion.max) * 100),
      },
    },
  };
}
