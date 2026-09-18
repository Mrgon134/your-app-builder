export type CovertNarcissismCardLang = "en" | "id" | "de" | "fr" | "es";

export interface CovertNarcissismQuestion {
  id: number;
  subscale:
    | "defensive_hypersensitivity"
    | "covert_entitlement_grievance"
    | "martyrdom_victim_blame";
  text: Record<CovertNarcissismCardLang, string>;
}

export interface CovertNarcissismResultLevel {
  level:
    | "grounded_humility_security"
    | "mild_sensitivity_flutter"
    | "moderate_vulnerable_narcissism"
    | "severe_covert_entitlement_grievance"
    | "acute_narcissistic_victimhood_paralysis";
  scoreRange: [number, number];
  title: Record<CovertNarcissismCardLang, string>;
  badge: Record<CovertNarcissismCardLang, string>;
  summary: Record<CovertNarcissismCardLang, string>;
  psychology: Record<CovertNarcissismCardLang, string>;
  actionProtocol: Record<CovertNarcissismCardLang, string[]>;
}

export const COVERT_NARCISSISM_QUESTIONS: CovertNarcissismQuestion[] = [
  // 1. Defensive Hypersensitivity
  {
    id: 1,
    subscale: "defensive_hypersensitivity",
    text: {
      en: "I am extremely thin-skinned; minor constructive feedback or lighthearted teasing feels like a devastating, humiliating personal attack.",
      id: "Aku sangat sensitif dan mudah terluka; masukan membangun atau candaan ringan terasa seperti serangan pribadi yang mempermalukanku.",
      de: "Ich bin extrem dünnhäutig; selbst konstruktive Kritik oder scherzhafte Bemerkungen empfinde ich als vernichtende Demütigung.",
      fr: "Je suis à fleur de peau ; la moindre remarque constructive ou taquinerie me blesse comme une humiliation intolérable.",
      es: "Soy extremadamente susceptible; cualquier crítica constructiva o broma ligera se siente como un ataque devastador a mi valor.",
    },
  },
  // 2. Covert Entitlement & Grievance
  {
    id: 2,
    subscale: "covert_entitlement_grievance",
    text: {
      en: "Deep down, I feel I possess rare intelligence, creative genius, or depth that an unappreciative, mediocre world fails to recognize.",
      id: "Jauh di lubuk hati, aku merasa memiliki kecerdasan, bakat, atau kedalaman langka yang gagal dihargai oleh dunia yang dangkal ini.",
      de: "Tief im Inneren glaube ich, ein besonderes Talent oder tiefgründiges Potenzial zu besitzen, das von der mittelmäßigen Welt übersehen wird.",
      fr: "Au fond de moi, j'ai le sentiment d'avoir une sensibilité ou un génie rare que ce monde superficiel est incapable de reconnaître.",
      es: "En el fondo, siento que poseo un talento o profundidad excepcional que un mundo mediocre e injusto no sabe valorar.",
    },
  },
  // 3. Martyrdom & Victim Blame
  {
    id: 3,
    subscale: "martyrdom_victim_blame",
    text: {
      en: "When others succeed, get promoted, or receive praise, I feel a bitter sting of resentment and secretly think: 'Why them? I deserve that so much more.'",
      id: "Ketika orang lain sukses atau dipuji, aku merasakan sengatan kepahitan dan membatin: 'Kenapa harus mereka? Aku jauh lebih layak mendapatkannya.'",
      de: "Wenn andere befördert oder gelobt werden, empfinde ich heimliche Bitterkeit und denke: 'Warum sie? Ich hätte das viel eher verdient.'",
      fr: "Quand autrui réussit ou reçoit des éloges, une amertume jalouse m'envahit : 'Pourquoi eux ? Je le méritais tellement plus.'",
      es: "Cuando otros triunfan o reciben elogios, siento una amarga envidia secreta: '¿Por qué ellos? Yo lo merezco mucho más.'",
    },
  },
  // 4. Defensive Hypersensitivity
  {
    id: 4,
    subscale: "defensive_hypersensitivity",
    text: {
      en: "I obsessively replay casual interactions for hours, analyzing whether someone's tone of voice or delayed reply was a subtle snub or sign of disrespect.",
      id: "Aku terobsesi memutar ulang obrolan biasa selama berjam-jam, menganalisis apakah nada bicara atau keterlambatan membalas chat adalah tanda mereka meremehkanku.",
      de: "Ich analysiere belanglose Begegnungen stundenlang, ob der Tonfall oder eine späte Nachricht eine gezielte Respektlosigkeit war.",
      fr: "Je ressasse les échanges anodins pendant des heures, guettant dans une intonation ou un retard de réponse le signe d'un mépris caché.",
      es: "Repaso interacciones casuales durante horas, analizando si el tono de voz o la tardanza al responder fue un desprecio deliberado hacia mí.",
    },
  },
  // 5. Covert Entitlement & Grievance
  {
    id: 5,
    subscale: "covert_entitlement_grievance",
    text: {
      en: "I often feel like a tragic, misunderstood outsider who is fundamentally too refined, empathetic, or deep for modern shallow society.",
      id: "Aku sering merasa seperti orang luar yang tragis dan disalahpahami, terlalu berjiwa halus, berempati, atau mendalam untuk masyarakat yang dangkal ini.",
      de: "Ich fühle mich oft wie ein tragischer, unverstandener Außenseiter, der zu feinsinnig oder tiefgründig für die oberflächliche Gesellschaft ist.",
      fr: "Je me perçois souvent comme une figure tragique et incomprise, bien trop pure ou profonde pour cette société superficielle.",
      es: "A menudo me siento como un incomprendido trágico, demasiado noble o profundo para encajar en esta sociedad frívola.",
    },
  },
  // 6. Martyrdom & Victim Blame
  {
    id: 6,
    subscale: "martyrdom_victim_blame",
    text: {
      en: "I frequently take on the role of the quiet martyr—silently sacrificing for others, then stewing in passive-aggressive resentment when they don't repay me.",
      id: "Aku sering menjadi 'martir pendiam'—berkorban diam-diam demi orang lain, lalu mendendam pasif-agresif saat mereka tidak membalas budiku.",
      de: "Ich inszeniere mich still als Märtyrer—opfere mich heimlich auf und grolle dann passiv-aggressiv, wenn keine Dankbarkeit folgt.",
      fr: "J'adopte souvent la posture du martyr discret—je me sacrifie sans mot dire, puis rumine une rancœur passive-agressive s'ils ne me remercient pas.",
      es: "Asumo el papel de mártir silencioso—me sacrifico por los demás y luego guardo un rencor pasivo-agresivo cuando no me lo compensan.",
    },
  },
  // 7. Defensive Hypersensitivity
  {
    id: 7,
    subscale: "defensive_hypersensitivity",
    text: {
      en: "When entering a room or group conversation, I am consumed with self-conscious anxiety about how I am being judged, while secretly measuring my superiority to them.",
      id: "Saat memasuki ruangan atau obrolan grup, aku dipenuhi kecemasan tentang bagaimana orang menilai penampilanku, sembari diam-diam membandingkan keunggulanku.",
      de: "Beim Betreten eines Raumes bin ich von Bewertungsangst gelähmt, während ich mich innerlich gleichzeitig über die Anwesenden stelle.",
      fr: "En entrant dans une pièce, je suis rongé(e) par la peur d'être jugé(e), tout en me sentant secrètement supérieur(e) à l'assistance.",
      es: "Al entrar a una sala, me abruma la ansiedad por cómo me juzgan, mientras por dentro mido con desdén mi superioridad sobre ellos.",
    },
  },
  // 8. Covert Entitlement & Grievance
  {
    id: 8,
    subscale: "covert_entitlement_grievance",
    text: {
      en: "I harbor chronic, simmering anger that life has dealt me an unfair hand compared to less talented people who seem to succeed effortlessly.",
      id: "Aku memendam amarah kronis karena merasa takdir tidak adil padaku dibanding orang-orang kurang berbakat yang tampak sukses dengan mudah.",
      de: "Ich hege ständigen Groll darüber, dass das Leben ungerecht zu mir ist, während talentlose Blender mühelos Erfolg einheimsen.",
      fr: "Je nourris une sourde colère envers la vie, convaincu(e) que le sort s'acharne sur moi alors que des gens médiocres réussissent sans effort.",
      es: "Guardo una rabia sorda hacia la vida porque siento que ha sido injusta conmigo mientras personas sin talento triunfan fácilmente.",
    },
  },
  // 9. Martyrdom & Victim Blame
  {
    id: 9,
    subscale: "martyrdom_victim_blame",
    text: {
      en: "I use silent treatments, subtle sulking, or cold emotional withdrawal to punish people who fail to meet my unexpressed expectations.",
      id: "Aku menggunakan aksi tutup mulut (silent treatment), merajuk, atau penarikan diri dingin untuk menghukum orang yang tidak peka pada keinginanku.",
      de: "Ich bestrafe andere mit eisigem Schweigen (Silent Treatment) oder Schmollen, wenn sie meine unausgesprochenen Wünsche nicht erraten.",
      fr: "J'utilise le silence punitif (silent treatment) et le retrait boudeur pour faire payer à mes proches de n'avoir pas deviné mes attentes.",
      es: "Castigo a los demás con la ley del hielo o el distanciamiento frío cuando no adivinan mis expectativas tácitas.",
    },
  },
  // 10. Defensive Hypersensitivity
  {
    id: 10,
    subscale: "defensive_hypersensitivity",
    text: {
      en: "I find it intensely difficult to genuinely apologize without turning myself into the victim: 'I guess I'm just the worst person alive, then.'",
      id: "Aku merasa sangat sulit meminta maaf secara tulus tanpa membalikkan diri sebagai korban: 'Ya sudah, aku memang orang paling buruk di dunia ini.'",
      de: "Es fällt mir extrem schwer, mich aufrichtig zu entschuldigen, ohne mich selbst als Opfer darzustellen ('Ich bin ja ohnehin an allem schuld').",
      fr: "J'ai un mal fou à présenter des excuses sincères sans me victimiser aussitôt : 'De toute façon, c'est toujours moi le coupable.'",
      es: "Me resulta casi imposible pedir disculpas sinceras sin victimizarme de inmediato: 'Bueno, claro, supongo que soy la peor persona del mundo.'",
    },
  },
  // 11. Covert Entitlement & Grievance
  {
    id: 11,
    subscale: "covert_entitlement_grievance",
    text: {
      en: "I retreat into grand, elaborate daydreams where I am finally vindicated, admired, recognized as a genius, or hailed as triumphant over those who doubted me.",
      id: "Aku sering melamunkan skenario megah di mana aku akhirnya diakui sebagai orang hebat, dipuja, dan membalas orang-orang yang dulu meremehkanku.",
      de: "Ich flüchte mich in Tagträume, in denen ich triumphiere, als Genie gefeiert werde und es all jenen heimzahle, die mich unterschätzt haben.",
      fr: "Je m'évade dans des rêveries grandioses où je prends enfin ma revanche éclatante et où le monde entier s'incline devant ma valeur.",
      es: "Me refugio en fantasías grandiosas donde finalmente triunfo, soy aclamado como un genio y me reivindico ante quienes dudaron de mí.",
    },
  },
  // 12. Martyrdom & Victim Blame
  {
    id: 12,
    subscale: "martyrdom_victim_blame",
    text: {
      en: "I secretly believe that my suffering, emotional pain, or existential melancholy makes me morally and intellectually superior to 'ordinary happy people.'",
      id: "Diam-diam aku meyakini bahwa penderitaan dan luka batinku menjadikanku lebih bermoral dan intelek dibanding orang biasa yang 'bahagia secara naif'.",
      de: "Ich glaube heimlich, dass mein seelisches Leiden und mein Schmerz mich moralisch und geistig über 'oberflächlich glückliche Menschen' stellen.",
      fr: "Je crois secrètement que ma souffrance et ma mélancolie me rendent moralement supérieur(e) aux personnes 'naïvement heureuses'.",
      es: "En el fondo creo que mi dolor y melancolía existencial me hacen moral e intelectualmente superior a la gente 'común y superficialmente feliz'.",
    },
  },
];

export const COVERT_NARCISSISM_OPTIONS = [
  {
    value: 0,
    label: {
      en: "Very Untrue (Grounded self-worth with zero covert resentment)",
      id: "Sangat Tidak Sesuai (Rasa percaya diri sehat tanpa dendam terselubung)",
      de: "Trifft gar nicht zu (Geerdetes Selbstwertgefühl ohne geheimen Groll)",
      fr: "Pas du tout vrai (Estime de soi saine, sans ressentiment caché)",
      es: "Totalmente falso (Autoestima sana y sin resentimiento oculto)",
    },
  },
  {
    value: 1,
    label: {
      en: "Slightly True (Occasional defensiveness or envy, but readily recognized)",
      id: "Sedikit Sesuai (Kadang sedikit tersinggung atau iri, tapi lekas disadari)",
      de: "Wenig zutreffend (Gelegentlich gekränkt oder neidisch, aber reflektiert)",
      fr: "Peu vrai (Susceptibilité ou jalousie occasionnelle, vite régulée)",
      es: "Poco cierto (Ocasional susceptibilidad o envidia, pero bien regulada)",
    },
  },
  {
    value: 2,
    label: {
      en: "Moderately True (Noticeable patterns of covert grievance and thin-skinned pride)",
      id: "Cukup Sesuai (Pola dendam terpendam dan mudah tersinggung cukup jelas)",
      de: "Mäßig zutreffend (Spürbare Neigung zu Kränkung und heimlicher Überlegenheit)",
      fr: "Assez vrai (Tendance nette à la rancœur rentrée et à la fierté blessée)",
      es: "Bastante cierto (Patrones claros de rencor oculto y orgullo vulnerable)",
    },
  },
  {
    value: 3,
    label: {
      en: "Very True (Strong vulnerable narcissism; chronic bitterness, martyrdom, and entitlement)",
      id: "Sangat Sesuai (Narsisisme rentan kuat; kepahitan kronis, martir, dan merasa berhak)",
      de: "Vollkommen zutreffend (Starke verdeckte narzisstische Züge; Opferhaltung & Groll)",
      fr: "Tout à fait vrai (Narcissisme vulnérable prononcé ; victimisation et amertume)",
      es: "Totalmente cierto (Narcisismo vulnerable severo; victimismo, rencor y derecho adquirido)",
    },
  },
];

export const COVERT_NARCISSISM_RESULTS: CovertNarcissismResultLevel[] = [
  {
    level: "grounded_humility_security",
    scoreRange: [0, 6],
    title: {
      en: "Grounded Humility & Secure Self-Worth",
      id: "Kerendahan Hati Matang & Keberhargaan Diri Aman",
      de: "Geerdete Demut & Sicherer Selbstwert",
      fr: "Humilité Saine & Estime de Soi Sécurisée",
      es: "Humildad Sana & Autoestima Segura",
    },
    badge: {
      en: "Secure Non-Defensive Ego",
      id: "Ego Aman Non-Defensif",
      de: "Sicheres, Nicht-Defensives Ego",
      fr: "Moi Sécurisé & Non-Défensif",
      es: "Ego Seguro y No Defensivo",
    },
    summary: {
      en: "You possess healthy, realistic self-esteem. You do not tie your self-worth to fantasies of being uniquely gifted, nor do you harbor chronic bitterness when others succeed. Constructive feedback is accepted without falling into humiliation spirals.",
      id: "Kamu memiliki harga diri yang realistis dan sehat. Kamu tidak menggantungkan nilai dirimu pada fantasi keistimewaan semu, ataupun mendendam saat orang lain sukses. Masukan diterima dengan lapang dada tanpa merasa terhina.",
      de: "Sie ruhen in einem gesunden Selbstwertgefühl. Sie benötigen keine geheimen Geniefantasien und ertragen Kritik ohne vernichtende Kränkung. Fremder Erfolg weckt echte Mitfreude.",
      fr: "Vous possédez une estime de vous équilibrée. Vous n'avez pas besoin de vous réfugier dans des illusions de supériorité, et accueillez les retours sans drame.",
      es: "Posees una autoestima sólida y realista. No dependes de fantasías de genialidad incomprendida y aceptas las críticas constructivas sin entrar en crisis.",
    },
    psychology: {
      en: "Dr. Jonathan Cheek's Hypersensitive Narcissism Scale (HSNS) benchmarks this profile as non-narcissistic ego integration. Your identity is grounded in self-acceptance rather than a fragile, compensatory defensive shell.",
      id: "Berdasarkan skala HSNS Dr. Jonathan Cheek, profil ini mencerminkan integrasi ego non-narsistik yang sehat. Identitasmu bertumpu pada penerimaan diri nyata, bukan perisai kompensasi yang rapuh.",
      de: "Nach der HSNS-Skala von Dr. Jonathan Cheek zeigt sich hier eine stabile Ich-Struktur ohne kompensatorische narzisstische Abwehrmechanismen.",
      fr: "Selon l'échelle HSNS du Dr Jonathan Cheek, vous présentez une structure d'ego saine, dépourvue de défenses narcissiques compensatoires.",
      es: "Según la escala HSNS del Dr. Jonathan Cheek, este perfil muestra una integración sana del yo, libre de corazas narcisistas reactivas.",
    },
    actionProtocol: {
      en: [
        "Continue Active Empathy: Cultivate genuine curiosity about others' inner lives and celebrate their milestones wholeheartedly.",
        "Embrace Vulnerability: Continue speaking honestly about flaws and mistakes without shame or self-protective posturing.",
        "Nuju Vocal Check-Ins: Use Nuju's voice sanctuary for ongoing emotional clarity and self-reflection.",
      ],
      id: [
        "Pertahankan Empati Aktif: Pelihara rasa ingin tahu tulus terhadap kehidupan orang lain dan rayakan keberhasilan mereka dengan tulus.",
        "Rangkul Kerentanan: Teruslah berani mengakui kesalahan tanpa rasa malu berlebihan atau sikap defensif.",
        "Refleksi di Nuju: Manfaatkan jurnal suara Nuju untuk menjaga kejernihan batin dan keselarasan emosional.",
      ],
      de: [
        "Aktive Empathie pflegen: Echtes Interesse an anderen zeigen und Erfolge im Umfeld neidlos mitfeiern.",
        "Verletzlichkeit wagen: Eigene Fehler offen und ohne Gesichtsverlust anerkennen.",
        "Nuju Sprachjournal: Regelmäßige Reflexionen in Nuju für innere Klarheit fortführen.",
      ],
      fr: [
        "Empathie bienveillante : Célébrez les succès d'autrui sans jalousie et avec une curiosité sincère.",
        "Authenticité : Continuez à admettre vos imperfections sans postures défensives.",
        "Journal vocal Nuju : Déposez vos pensées dans Nuju pour entretenir votre équilibre intérieur.",
      ],
      es: [
        "Empatía Activa: Celebra con honestidad los triunfos de tus seres queridos sin comparaciones amargas.",
        "Aceptación de la Vulnerabilidad: Reconoce tus errores con tranquilidad y sin adoptar poses defensivas.",
        "Registro en Nuju: Usa el diario de voz de Nuju para cultivar una autoimagen ecuánime.",
      ],
    },
  },
  {
    level: "mild_sensitivity_flutter",
    scoreRange: [7, 14],
    title: {
      en: "Mild Sensitivity Flutter (Situational Ego Vulnerability)",
      id: "Sensitivitas Ego Ringan (Kerentanan Ego Situasional)",
      de: "Leichte Ich-Sensibilität (Situative Verletzlichkeit)",
      fr: "Sensibilité d'Ego Légère (Vulnérabilité Émotionnelle)",
      es: "Sensibilidad de Ego Leve (Vulnerabilidad Situacional)",
    },
    badge: {
      en: "Common Ego Fragility",
      id: "Kerapuhan Ego Wajar",
      de: "Normale Ich-Empfindlichkeit",
      fr: "Fragilité Narcissique Commune",
      es: "Fragilidad Emocional Leve",
    },
    summary: {
      en: "You have an occasional tendency to take feedback personally, feel envious when peers achieve fast milestones, or secretly wish you were given more recognition. However, you possess enough self-awareness to course-correct before becoming bitter or passive-aggressive.",
      id: "Kamu kadang memasukkan masukan ke dalam hati, merasa sedikit iri saat orang lain sukses duluan, atau ingin lebih diakui. Namun, kamu punya kesadaran diri yang cukup untuk mengoreksinya sebelum berubah menjadi dendam atau sikap pasif-agresif.",
      de: "Sie reagieren gelegentlich gekränkt auf Kritik oder spüren heimlichen Neid bei schnellen Erfolgen anderer. Ihre Selbstreflexion verhindert jedoch, dass daraus dauerhafte Bitterkeit wird.",
      fr: "Il vous arrive de prendre les remarques trop à cœur ou d'envier les réussites fulgurantes. Votre lucidité vous permet toutefois de désamorcer la rancœur.",
      es: "Ocasionalmente te tomas las cosas como algo personal o sientes envidia de los logros ajenos, pero tienes la madurez suficiente para regularlo a tiempo.",
    },
    psychology: {
      en: "This score represents typical human ego defensiveness. Under stress or imposter anxieties, the ego briefly deploys mild covert narcissism defenses (feeling unappreciated or unfairly judged) as a shield against core vulnerability.",
      id: "Skor ini mewakili pertahanan ego manusiawi. Di bawah tekanan atau sindrom imposter, ego secara singkat mengaktifkan pertahanan narsisisme rentan (merasa kurang dihargai) sebagai tameng dari rasa rapuh.",
      de: "Unter Leistungsdruck aktiviert das Ego milde Schutzmechanismen (wie Kränkung oder das Gefühl, verkannt zu werden), um das eigene Selbstwertgefühl zu schützen.",
      fr: "Sous pression, l'ego active de légères défenses narcissiques (sentiment d'être incompris) pour masquer une anxiété de performance.",
      es: "En momentos de estrés, tu mente recurre a defensas sutiles (sentirte incomprendido o poco valorado) para amortiguar el miedo a no ser suficiente.",
    },
    actionProtocol: {
      en: [
        "Uncoupling Feedback from Identity: When criticized, remind yourself: 'This is feedback on my work output, not an indictment of my soul or human worth.'",
        "Celebrate Others Out Loud: Actively send a congratulatory message when a peer wins; vocalizing generosity neurologically shrinks envious resentment.",
        "Nuju Vulnerability Decompression: Vent your hurt feelings into Nuju's voice journal before responding to difficult emails or conversations.",
      ],
      id: [
        "Pisahkan Masukan dari Identitas Diri: Saat dikritik, tegaskan: 'Ini masukan untuk hasil kerjaku, bukan vonis atas nilai diriku sebagai manusia.'",
        "Beri Selamat Secara Vokal: Ucapkan selamat secara tulus saat rekanmu berhasil; melatih kedermawanan hati mengikis kecemburuan di otak.",
        "Dekompresi di Nuju: Luapkan rasa tersinggungmu di jurnal suara Nuju sebelum membalas chat atau email yang memicu emosi.",
      ],
      de: [
        "Kritik von Identität trennen: Sich vergegenwärtigen: 'Das ist Feedback zu einer Leistung, kein Urteil über meinen menschlichen Wert.'",
        "Gönnen lernen: Anderen aktiv gratulieren; ausgesprochene Wertschätzung baut die neuronale Neidspannung ab.",
        "Nuju-Entlastung: Kränkungsgefühle vor dem Verfassen impulsiver Antworten im Nuju-Sprachraum aussprechen.",
      ],
      fr: [
        "Distinguer critique et valeur personnelle : Rappelez-vous : 'Ce retour concerne mon travail, pas mon identité profonde.'",
        "Féliciter sincèrement : Envoyez un mot chaleureux aux réussites de vos pairs pour court-circuiter l'envie amère.",
        "Décompression sur Nuju : Enregistrez votre blessure d'amour-propre dans Nuju avant de répondre à chaud.",
      ],
      es: [
        "Desvincula la Crítica de tu Identidad: Repítete: 'Es una observación sobre una tarea, no un veredicto sobre mi valor humano.'",
        "Felicita con Generosidad: Expresa felicitaciones sinceras a otros; la generosidad verbal disuelve el rencor interno.",
        "Pausa Vocal en Nuju: Desahoga el dolor del orgullo herido en Nuju antes de enviar mensajes precipitados.",
      ],
    },
  },
  {
    level: "moderate_vulnerable_narcissism",
    scoreRange: [15, 22],
    title: {
      en: "Moderate Vulnerable Narcissism (Covert Grievance & Thin-Skinned Pride)",
      id: "Narsisisme Rentan Menengah (Dendam Terselubung & Mudah Tersinggung)",
      de: "Mittlerer Verdeckter Narzissmus (Heimlicher Groll & Dünnhäutigkeit)",
      fr: "Narcissisme Vulnérable Modéré (Rancœur Rentrée & Fierté Blessée)",
      es: "Narcisismo Vulnerable Moderado (Resentimiento Oculto e Hipersensibilidad)",
    },
    badge: {
      en: "Vulnerable Narcissism Trait",
      id: "Karakter Narsisisme Rentan",
      de: "Verdeckte Narzisstische Züge",
      fr: "Trait Narcissique Vulnérable",
      es: "Rasgo Narcisista Vulnerable",
    },
    summary: {
      en: "You live with a chronic undercurrent of resentment toward an unappreciative world. You feel uniquely deep or gifted, yet plagued by hypersensitivity, silent brooding, martyrdom, and difficulty rejoicing in others' achievements.",
      id: "Kamu hidup dengan arus dendam terpendam terhadap dunia yang kamu anggap tidak adil. Kamu merasa dirimu istimewa, namun tersiksa oleh rasa mudah tersinggung, merajuk diam-diam, menjadi martir, dan sulit bahagia atas keberhasilan orang lain.",
      de: "Sie leben mit einem ständigen Groll gegen eine vermeintlich ungerechte Welt. Sie fühlen sich tiefgründig und verkannt, reagieren extrem gereizt auf Kritik und flüchten in passive Opferrollen.",
      fr: "Vous portez une rancœur latente envers un entourage jugé ingrat. Vous vous sentez à part et incompris(e), oscillant entre susceptibilité aiguë et postures de martyr.",
      es: "Vives con un resentimiento crónico hacia un entorno que crees que no te valora. Te sientes diferente y especial, pero sufres de hipersensibilidad extrema y victimismo pasivo.",
    },
    psychology: {
      en: "Unlike grandiose narcissists who loudly boast, the vulnerable narcissist experiences 'shame-based entitlement.' Deep fears of inadequacy and shame are defended against by an internal narrative: 'I am not failing; I am simply a tragic genius in a world too shallow to recognize me.'",
      id: "Berbeda dari narsisis arogan yang terang-terangan pamer, narsisisme rentan digerakkan oleh 'hak istimewa berbasis rasa malu'. Ketakutan akan ketidakmampuan diri ditutupi oleh narasi batin: 'Bukan aku yang gagal; aku hanyalah sosok hebat yang terlahir di dunia yang terlalu dangkal.'",
      de: "Im Gegensatz zu extrovertierten Narzissten basiert der verdeckte Narzissmus auf Scham. Die unbewusste Angst vor Unzulänglichkeit wird durch das Narrativ des 'verkannten Genies' abgewehrt.",
      fr: "Contrairement aux narcissiques grandioses, le narcissique vulnérable est mû par la honte. La peur de l'échec est masquée par l'illusion d'être un génie incompris.",
      es: "A diferencia del narcisista arrogante, el narcisista vulnerable opera desde la vergüenza. El miedo a la insuficiencia se disfraza con la narrativa del 'talento incomprendido'.",
    },
    actionProtocol: {
      en: [
        "Disarm the 'Misunderstood Genius' Narrative: Face reality with compassionate honesty: 'I have genuine talents, but I am not uniquely superior to the human race. Hard work and humility are required.'",
        "Stop Silent Treatments: Replace sulking and cold withdrawal with direct verbal expression: 'I felt hurt by that comment; can we talk about it?'",
        "Nuju Shadow-Work Journaling: Privately speak your darkest envy and bitterness into Nuju. Hearing your own resentment held with neutral acceptance allows the ego's armor to soften.",
      ],
      id: [
        "Bongkar Narasi 'Jenius yang Tersiksa': Tatap kenyataan dengan kejujuran penuh welas asih: 'Aku punya bakat, tapi aku tidak superior di atas manusia lain. Kerendahan hati dan kerja keras tetap diperlukan.'",
        "Hentikan Aksi Tutup Mulut (Silent Treatment): Ganti merajuk dengan komunikasi langsung: 'Aku merasa tersinggung dengan ucapan tadi, bisakah kita bicarakan baik-baik?'",
        "Eksplorasi Sisi Gelap di Nuju: Bicarakan rasa iri dan dendam tergelapmu di jurnal suara Nuju. Mendengar suaramu sendiri tanpa penghakiman melunakkan tameng ego yang keras.",
      ],
      de: [
        "Das Genie-Narrativ auflösen: Ehrliche Selbsterkenntnis wagen: 'Ich bin begabt, aber nicht erhaben über andere. Auch ich muss lernen und Kritik aushalten.'",
        "Silent Treatment beenden: Schmollen durch direkte Kommunikation ersetzen: 'Deine Bemerkung hat mich verletzt, lass uns darüber reden.'",
        "Nuju Schattenarbeit: Den geheimen Neid und Groll im geschützten Nuju-Raum aussprechen, um den Abwehrpanzer des Egos zu lockern.",
      ],
      fr: [
        "Désamorcer le mythe du 'génie incompris' : Regardez la réalité en face : 'J'ai des talents, mais je ne suis pas au-dessus des autres. L'humilité est indispensable.'",
        "Bannir le silence punitif : Remplacez la bouderie par une expression claire : 'Ce que tu as dit m'a blessé(e), parlons-en.'",
        "Travail de l'ombre sur Nuju : Déposez vos jalousies les plus inavouables dans Nuju. L'écoute neutre permet de désarmer le blindage narcissique.",
      ],
      es: [
        "Desmonta el Mito del Incomprendido: Asume con humildad: 'Tengo talento, pero no soy un ser superior. Necesito esforzarme y aceptar mis errores como cualquiera.'",
        "Elimina la Ley del Hielo: Sustituye el silencio vengativo por palabras claras: 'Me dolió ese comentario; hablemos con calma.'",
        "Trabajo de Sombra en Nuju: Confiesa tus envidias y rencores secretos en el santuario de voz de Nuju para ablandar tu coraza defensiva.",
      ],
    },
  },
  {
    level: "severe_covert_entitlement_grievance",
    scoreRange: [23, 30],
    title: {
      en: "Severe Covert Entitlement & Martyrdom Complex",
      id: "Hak Istimewa Terselubung & Kompleks Martir Berat",
      de: "Schwere Verdeckte Anspruchshaltung & Märtyrerkomplex",
      fr: "Entitlement Dissimulé Sévère & Complexe du Martyr",
      es: "Derecho Adquirido Oculto & Complejo de Mártir Severo",
    },
    badge: {
      en: "Severe Covert Narcissism",
      id: "Narsisisme Terselubung Berat",
      de: "Schwere Verdeckte Narzisstische Störung",
      fr: "Narcissisme Vulnérable Sévère",
      es: "Narcisismo Encubierto Grave",
    },
    summary: {
      en: "Your daily life is poisoned by profound bitterness, defensive hypersensitivity, and weaponized victimhood. You feel entitled to extraordinary admiration, yet punish people with icy withdrawal, contempt, and chronic passive-aggressive grievances.",
      id: "Keseharianmu diracuni oleh kepahitan mendalam, mudah tersinggung luar biasa, dan senjata posisi korban. Kamu merasa berhak dipuja secara khusus, namun menghukum orang di sekitarmu dengan penarikan diri dingin dan kebencian pasif-agresif kronis.",
      de: "Ihr Leben ist von tiefer Verbitterung, toxischer Kränkbarkeit und instrumentalisierter Opferhaltung geprägt. Sie fordern Bewunderung ein, strafen aber mit eisiger Kälte und Verachtung.",
      fr: "Votre quotidien est empoisonné par l'aigreur et une victimisation permanente. Vous exigez une déférence silencieuse tout en méprisant les autres et en multipliant les silences destructeurs.",
      es: "Tu vida diaria está impregnada de amargura, hipersensibilidad destructiva y victimismo calculado. Exiges admiración especial y castigas a tu entorno con frialdad y desprecio.",
    },
    psychology: {
      en: "At this severe clinical tier (HSNS > 23), the fragile ego cannot tolerate any parity with others. Because grandiose exhibitionism feels too risky or dangerous to expose, the individual adopts a martyr identity where suffering itself becomes the badge of moral and intellectual superiority.",
      id: "Pada tingkatan klinis berat ini, ego yang rapuh menolak keras kesetaraan dengan orang lain. Karena arogansi terang-terangan terasa berisiko ditolak, individu memilih identitas martir di mana penderitaan dijadikan simbol keunggulan moral dan intelektual.",
      de: "Hier dient das eigene Leiden als narzisstische Trophäe. Weil offener Narzissmus zu riskant erscheint, wird das 'Opferdasein' zum Beweis moralischer Erhabenheit erhoben.",
      fr: "À ce niveau, la souffrance devient un trophée narcissique. Ne pouvant afficher une grandeur ostensible, la personne transforme son martyre en preuve de supériorité morale.",
      es: "A este nivel clínico, el propio sufrimiento se convierte en un trofeo moral. Al no atreverse a ser abiertamente arrogante, la persona hace de su victimismo una prueba de superioridad.",
    },
    actionProtocol: {
      en: [
        "Long-Term Schema or Psychodynamic Therapy: Seek specialized therapy focusing on the 'Defectiveness' and 'Entitlement' schemas to heal core childhood shame.",
        "Renounce Weaponized Victimhood: Recognize that feeling hurt does not give you moral permission to punish, stonewall, or manipulate partners.",
        "Private Vocal Confession in Nuju: Drop all rationalizations. Talk into Nuju without the protective martyr mask, acknowledging the real pain of feeling ordinary.",
      ],
      id: [
        "Terapi Skema atau Psikodinamik Profesional: Cari terapis berlisensi untuk memulihkan skema 'Defectiveness' (merasa cacat) dan luka masa kecil yang mendasari narsisisme.",
        "Tinggalkan Posisi Korban sebagai Senjata: Sadari bahwa merasa tersakiti tidak memberimu hak moral untuk menghukum, mendiamkan, atau memanipulasi pasangan.",
        "Pengakuan Vokal Jujur di Nuju: Lepaskan seluruh topeng korban. Bicaralah di Nuju secara telanjang tentang rasa takut terdalammu menjadi 'orang biasa'.",
      ],
      de: [
        "Tiefenpsychologische oder Schematherapie: Professionelle Hilfe suchen, um das verdrängte Scham- und Unzulänglichkeitstrauma an der Wurzel zu heilen.",
        "Opferhaltung ablegen: Verstehen, dass eigenes Leiden kein Recht verleiht, andere mit Kälte oder Vorwürfen zu manipulieren.",
        "Ehrlichkeit im Nuju-Sprachraum: Alle Rechtfertigungen fallen lassen. Sprechen Sie in Nuju über die nackte Angst, bloß ein gewöhnlicher Mensch zu sein.",
      ],
      fr: [
        "Psychothérapie intégrative ou des schémas : Consultez un professionnel pour traiter le sentiment sous-jacent de nullité et la honte archaïque.",
        "Renoncer au chantage affectif : Réalisez qu'être blessé(e) ne vous autorise pas à manipuler ou punir votre entourage par le mépris.",
        "Vérité nue sur Nuju : Otez le masque du martyr. Parlez dans Nuju de votre terreur intime d'être 'ordinaire'.",
      ],
      es: [
        "Psicoterapia de Esquemas o Psicoanálisis: Acude a un terapeuta especializado para sanar el esquema de defecto y la vergüenza infantil que sostienen este patrón.",
        "Renuncia al Victimismo Tóxico: Acepta que sentirte herido no te otorga derecho ético a manipular ni a castigar a los demás con la indiferencia.",
        "Confesión Sin Filtros en Nuju: Despójate de la armadura. Expresa en Nuju el miedo desgarrador a ser simplemente un ser humano imperfecto.",
      ],
    },
  },
  {
    level: "acute_narcissistic_victimhood_paralysis",
    scoreRange: [31, 36],
    title: {
      en: "Acute Narcissistic Victimhood & Alienation",
      id: "Kelumpuhan Narsisisme Korban Akut & Keterasingan Total",
      de: "Akute Narzisstische Opferparalyse & Totale Entfremdung",
      fr: "Paralysie Victimaire Aiguë & Aliénation Narcissique",
      es: "Parálisis Victimaria Extrema & Aislamiento Narcisista",
    },
    badge: {
      en: "Extreme Covert Narcissism",
      id: "Narsisisme Terselubung Ekstrem",
      de: "Extremer Verdeckter Narzissmus",
      fr: "Aliénation Victimaire Totale",
      es: "Alienación Narcisista Crítica",
    },
    summary: {
      en: "You are locked in profound existential alienation. Consumed by paranoid bitterness, unyielding grievance, and contempt for a world you believe has robbed you of your rightful destiny, all genuine intimate relationships have deteriorated into toxic power struggles or bitter isolation.",
      id: "Kamu terperangkap dalam keterasingan eksistensial yang parah. Dipenuhi kepahitan paranoid, dendam abadi, dan kebencian terhadap dunia yang kamu yakini telah merampas takdir kehebatanmu, hubungan intimmu hancur menjadi perang dingin atau isolasi total.",
      de: "Sie befinden sich in völliger seelischer Isolation. Zerfressen von paranoidem Groll und Verachtung für eine Welt, die Ihnen den verdienten Ruhm vorenthalten hat, sind alle Beziehungen zerbrochen.",
      fr: "Vous êtes enfermé(e) dans une solitude haineuse. Rongé(e) par la paranoïa et la certitude que le monde vous a volé votre destin, vos liens affectifs sont anéantis.",
      es: "Estás atrapado en un aislamiento existencial devastador. Consumido por el rencor paranoide y el desprecio hacia un mundo que crees que te saboteó, tus vínculos íntimos se han destruido.",
    },
    psychology: {
      en: "This extreme clinical presentation reflects a borderline-narcissistic collapse where the fragile false self has calcified into chronic paranoid victimhood. The individual experiences profound, agonizing envy of all human connection and happiness, perceiving all interactions as threats of annihilation.",
      id: "Kondisi ekstrem ini mencerminkan keruntuhan narsisisme batas di mana diri palsu yang rapuh telah membatu menjadi mentalitas korban paranoid. Individu merasakan iri hati yang menyiksa terhadap setiap kebahagiaan orang lain dan menganggap setiap interaksi sebagai ancaman kepunahan ego.",
      de: "Dieser Extremzustand gleicht einem narzisstischen Kollaps. Das fragile Falsche Selbst hat sich in chronischer Paranoia verhärtet; fremde Freude wird als existenzieller Vernichtungsversuch erlebt.",
      fr: "Cet état traduit un effondrement narcissique sévère. Le faux-self s'est rigidifié dans une rancœur persécutoire, chaque éclat de joie chez autrui étant vécu comme une insulte intolérable.",
      es: "Este cuadro extremo refleja un colapso narcisista severo. El falso yo se ha petrificado en un victimismo paranoide; cualquier felicidad ajena se vive como una humillación intolerable.",
    },
    actionProtocol: {
      en: [
        "Intensive Specialized Psychotherapy: Immediate clinical intervention with a specialist in personality disorders (Transference-Focused Psychotherapy or Mentalization-Based Therapy).",
        "Ego-Deflation as Healing: Understand that surrendering the fantasy of tragic greatness is not death—it is the only gateway to real peace, genuine love, and connection.",
        "Uncensored Solitary Voice Venting in Nuju: Speak the terrifying loneliness and hatred into Nuju without social performance. Hearing the raw truth of your suffering is the beginning of genuine human humility.",
      ],
      id: [
        "Psikoterapi Khusus Intensif: Intervensi klinis mendalam dengan spesialis gangguan kepribadian (TFP atau MBT) untuk menyatukan kembali serpihan ego.",
        "Pelepasan Fantasi Kehebatan: Sadari bahwa melepaskan ilusi 'martir istimewa' bukanlah kematian—itu adalah satu-satunya pintu menuju kedamaian sejati dan cinta manusiawi.",
        "Pengakuan Vokal Tanpa Sensor di Nuju: Bicarakan kesepian dan kebencian yang menakutkan itu ke dalam Nuju tanpa sandiwara. Menatap kebenaran lukamu adalah awal dari kerendahan hati sejati.",
      ],
      de: [
        "Intensive Psychotherapie: Umgehende Behandlung bei Spezialisten für Persönlichkeitsstörungen (TFP oder Mentalisierungsbasierte Therapie).",
        "Ego-Entlastung als Befreiung: Die Fantasie der tragischen Erhabenheit aufzugeben ist kein Verlust, sondern die Rettung in echte Zwischenmenschlichkeit.",
        "Schonungslose Ehrlichkeit in Nuju: Sprechen Sie die existenzielle Einsamkeit und Wut im Nuju-Sprachraum aus, um den Weg zu wahrer Demut zu öffnen.",
      ],
      fr: [
        "Psychothérapie spécialisée intensive : Consultation impérative auprès d'un expert des troubles de la personnalité (TFP ou thérapie basée sur la mentalisation).",
        "Désarmer l'illusion : Renoncer au fantasme du martyr incompris n'est pas une défaite, mais l'unique clé pour retrouver la paix et l'amour.",
        "Vérité intégrale sur Nuju : Déposez votre solitude abyssale dans Nuju sans fard. Reconnaître votre détresse est le premier pas vers l'humanité.",
      ],
      es: [
        "Psicoterapia Intensiva Especializada: Acude de inmediato a profesionales en trastornos de la personalidad (Terapia Focalizada en la Transferencia o Mentalización).",
        "Desarmar la Fantasía Trágica: Soltar la ilusión del 'genio incomprendido' no te destruye: es la única vía para experimentar amor y paz reales.",
        "Voz Sin Filtros en Nuju: Expresa en Nuju la soledad aterradora y la rabia contenida. Abrazar tu humanidad vulnerable es el principio de la verdadera sanación.",
      ],
    },
  },
];

export const COVERT_NARCISSISM_SUBSCALE_INFO = {
  defensive_hypersensitivity: {
    name: {
      en: "Defensive Hypersensitivity & Thin-Skinned Pride",
      id: "Hipersensitivitas Defensif & Mudah Tersinggung",
      de: "Defensive Dünnhäutigkeit & Gekränktheit",
      fr: "Hypersensibilité Défensive & Fierté Blessée",
      es: "Hipersensibilidad Defensiva y Susceptibilidad",
    },
    description: {
      en: "Extreme vulnerability to perceived slights, constructive criticism, and obsessive forensic replay of minor social remarks.",
      id: "Kerentanan ekstrem terhadap teguran atau candaan, disertai obsesi membedah ucapan orang lain yang dicurigai meremehkan diri.",
      de: "Extreme Kränkbarkeit bei Kritik und stundenlanges Nachgrübeln über angebliche Respektlosigkeiten.",
      fr: "Vulnérabilité excessive face aux remarques et rumination obsessionnelle de tout rejet supposé.",
      es: "Vulnerabilidad extrema ante la crítica y obsesión por desmenuzar comentarios ajenos en busca de desprecio.",
    },
  },
  covert_entitlement_grievance: {
    name: {
      en: "Covert Entitlement & Resentful Superiority",
      id: "Hak Istimewa Terselubung & Superioritas Terpendam",
      de: "Heimliche Anspruchshaltung & Groll",
      fr: "Entitlement Dissimulé & Sentiment de Supériorité",
      es: "Derecho Adquirido Oculto y Superioridad Secreta",
    },
    description: {
      en: "Belief in one's unrecognized genius or special depth, accompanied by chronic resentment toward an unfair, mediocre world.",
      id: "Keyakinan bahwa diri memiliki kehebatan langka yang tidak dihargai, disertai dendam kronis terhadap dunia yang dianggap dangkal.",
      de: "Der Glaube an die eigene verkannte Genialität, gepaart mit Bitterkeit gegenüber einer ungerechten Umwelt.",
      fr: "Conviction d'être doué(e) d'une profondeur rare et colère sourde face à un monde incapable de l'admirer.",
      es: "Creencia de poseer una profundidad o talento extraordinario no reconocido, junto a un rencor constante hacia la vida.",
    },
  },
  martyrdom_victim_blame: {
    name: {
      en: "Martyrdom Complex & Weaponized Victimhood",
      id: "Kompleks Martir & Senjata Posisi Korban",
      de: "Märtyrerkomplex & Passive Aggression",
      fr: "Complexe du Martyr & Victimisation Punitive",
      es: "Complejo de Mártir y Victimización Punitiva",
    },
    description: {
      en: "Using suffering as a badge of moral superiority, passive-aggressive silent treatments, and bitter envy of others' happiness.",
      id: "Menjadikan penderitaan sebagai simbol kesucian moral, aksi tutup mulut pasif-agresif, dan rasa iri terhadap kebahagiaan orang lain.",
      de: "Instrumentalisierung des eigenen Leidens als moralische Waffe, Silent Treatment und Neid auf das Glück anderer.",
      fr: "Utilisation de la souffrance comme preuve de supériorité éthique, silences punitifs et jalousie viscérale.",
      es: "Uso del propio dolor como insignia de superioridad moral, castigo con la ley del hielo y envidia destructiva del éxito ajeno.",
    },
  },
};

export function getCovertNarcissismResult(totalScore: number): CovertNarcissismResultLevel {
  const clamped = Math.max(0, Math.min(36, totalScore));
  return (
    COVERT_NARCISSISM_RESULTS.find(
      (r) => clamped >= r.scoreRange[0] && clamped <= r.scoreRange[1]
    ) || COVERT_NARCISSISM_RESULTS[0]
  );
}

export function calculateCovertNarcissismSubscales(answers: Record<number, number>): {
  defensive_hypersensitivity: number;
  covert_entitlement_grievance: number;
  martyrdom_victim_blame: number;
} {
  let dh = 0;
  let eg = 0;
  let mv = 0;

  COVERT_NARCISSISM_QUESTIONS.forEach((q) => {
    const score = answers[q.id] ?? 0;
    if (q.subscale === "defensive_hypersensitivity") dh += score;
    if (q.subscale === "covert_entitlement_grievance") eg += score;
    if (q.subscale === "martyrdom_victim_blame") mv += score;
  });

  return {
    defensive_hypersensitivity: dh,
    covert_entitlement_grievance: eg,
    martyrdom_victim_blame: mv,
  };
}
