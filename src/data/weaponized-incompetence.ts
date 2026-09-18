export type WeaponizedIncompetenceCardLang = "en" | "id" | "de" | "fr" | "es";

export interface WeaponizedIncompetenceQuestion {
  id: number;
  subscale: "strategic_helplessness" | "mental_load_disparity" | "parent_child_exhaustion";
  text: {
    en: string;
    id: string;
    de: string;
    fr: string;
    es: string;
  };
}

export interface WeaponizedIncompetenceResultLevel {
  level: string;
  scoreRange: [number, number];
  title: {
    en: string;
    id: string;
    de: string;
    fr: string;
    es: string;
  };
  summary: {
    en: string;
    id: string;
    de: string;
    fr: string;
    es: string;
  };
  neurobiology: {
    en: string;
    id: string;
    de: string;
    fr: string;
    es: string;
  };
  actionProtocol: {
    en: string[];
    id: string[];
    de: string[];
    fr: string[];
    es: string[];
  };
  badge: {
    en: string;
    id: string;
    de: string;
    fr: string;
    es: string;
  };
}

export const WEAPONIZED_INCOMPETENCE_QUESTIONS: WeaponizedIncompetenceQuestion[] = [
  // 1. Strategic Helplessness & Feigned Ignorance
  {
    id: 1,
    subscale: "strategic_helplessness",
    text: {
      en: "My partner deliberately does simple household tasks poorly (e.g., shrinking clothes, leaving grease on pans) so I will take over and never ask again.",
      id: "Pasangan saya sengaja mengerjakan tugas rumah tangga secara asal-asalan (seperti baju menciut, wajan masih berminyak) agar saya mengambil alih dan tidak menyuruhnya lagi.",
      de: "Mein Partner erledigt einfache Hausarbeiten absichtlich schlampig, damit ich entnervt übernehme und ihn nie wieder darum bitte.",
      fr: "Mon/ma partenaire bâcle délibérément les tâches ménagères basiques pour que je m'en charge à sa place et ne lui demande plus rien.",
      es: "Mi pareja hace las tareas básicas del hogar deliberadamente mal para que yo me desespere, las haga yo y no vuelva a pedírselo."
    }
  },
  {
    id: 2,
    subscale: "strategic_helplessness",
    text: {
      en: "They constantly claim 'You just do it so much better than me' or 'I don't know where things go' to excuse themselves from basic adult responsibilities.",
      id: "Dia selalu beralasan 'Kamu kan jauh lebih jago daripada aku' atau 'Aku nggak tahu naruh barang di mana' untuk lari dari tanggung jawab dasar orang dewasa.",
      de: "Er/Sie redet sich ständig heraus mit Sätzen wie 'Du kannst das einfach viel besser' oder 'Ich weiß nicht, wo das hinkommt', um sich vor Pflichten zu drücken.",
      fr: "Il/Elle se défausse constamment avec des phrases comme 'Tu le fais tellement mieux que moi' pour fuir ses responsabilités d'adulte.",
      es: "Se excusa continuamente diciendo 'es que tú lo haces mucho mejor que yo' o 'no sé dónde van las cosas' para escaquearse de sus tareas."
    }
  },
  {
    id: 3,
    subscale: "strategic_helplessness",
    text: {
      en: "When asked to do something, they ask fifty obvious questions ('Which sponge? Where is the detergent?') until it becomes faster for me to just do it myself.",
      id: "Saat diminta melakukan sesuatu, dia menanyakan 50 pertanyaan sepele ('Pakai spons yang mana? Sabunnya di mana?') sampai akhirnya lebih cepat jika saya kerjakan sendiri.",
      de: "Wird er/sie um etwas gebeten, folgen endlose banale Nachfragen ('Welcher Lappen? Wo steht das Spülmittel?'), bis ich es genervt selbst mache.",
      fr: "Quand je lui demande un service, il/elle pose cinquante questions évidentes jusqu'à ce que ce soit plus rapide de le faire moi-même.",
      es: "Si le pido algo, me bombardea con cincuenta preguntas obvias ('¿qué bayeta uso? ¿dónde está el detergente?') hasta que acabo haciéndolo yo."
    }
  },
  {
    id: 4,
    subscale: "strategic_helplessness",
    text: {
      en: "They 'forget' critical chores, appointments, or errands repeatedly, forcing me into an exhausting role of monitoring and reminding.",
      id: "Dia berkali-kali 'lupa' tugas penting, jadwal janji, atau titipan belanjaan, memaksa saya terus menjadi pengingat dan pengawas yang melelahkan.",
      de: "Er/Sie 'vergisst' wichtige Absprachen, Termine oder Besorgungen systematisch, sodass ich in die Rolle der Kontrollinstanz gedrängt werde.",
      fr: "Il/Elle 'oublie' constamment les corvées ou rendez-vous importants, me forçant à jouer un rôle de flicage et de rappel permanent.",
      es: "Suele 'olvidar' sistemáticamente recados o citas importantes, obligándome a asumir un rol de supervisión continua y agotadora."
    }
  },

  // 2. Mental Load Disparity & Cognitive Project Management
  {
    id: 5,
    subscale: "mental_load_disparity",
    text: {
      en: "I carry 90%+ of the invisible mental load: tracking inventory, planning meals, scheduling doctor visits, remembering birthdays, and anticipating crises.",
      id: "Saya memikul 90%+ beban mental tak terlihat: mencatat stok kebutuhan, merencanakan menu, menjadwalkan dokter, mengingat ulang tahun, dan mengantisipasi masalah.",
      de: "Ich trage über 90 % der mentalen Last (Mental Load): Vorräte prüfen, Mahlzeiten planen, Arzttermine koordinieren und an alles denken.",
      fr: "Je porte plus de 90 % de la charge mentale invisible : anticiper les repas, gérer les stocks, planifier les vaccins et penser à tout.",
      es: "Cargo con más del 90% de la carga mental invisible: anticipar compras, menús, citas médicas, cumpleaños y resolver imprevistos."
    }
  },
  {
    id: 6,
    subscale: "mental_load_disparity",
    text: {
      en: "My partner considers themselves 'helping out' rather than being an equal co-owner of the household, only doing tasks when given explicit step-by-step instructions.",
      id: "Pasangan saya menganggap dirinya 'sekadar membantu' bukannya pemilik bersama rumah tangga, hanya bergerak jika diberi instruksi langkah demi langkah secara detail.",
      de: "Mein Partner sieht sich bloß als 'Helfer', statt echte Mitverantwortung zu tragen, und wartet ab, bis ich ihm jeden Schritt vorkaue.",
      fr: "Mon/ma partenaire se positionne comme une 'aide' ponctuelle et non comme un pair responsable, attendant des ordres détaillés.",
      es: "Mi pareja se percibe como un 'ayudante' ocasional y no como un co-responsable, esperando órdenes paso a paso para mover un dedo."
    }
  },
  {
    id: 7,
    subscale: "mental_load_disparity",
    text: {
      en: "Even when I am sick or on vacation, my phone blows up with questions because the household cannot function without my continuous direction.",
      id: "Bahkan saat saya sakit atau ingin istirahat, ponsel saya dibanjiri pertanyaan karena rumah tangga tidak bisa berjalan tanpa arahan saya.",
      de: "Selbst wenn ich krank bin, steht mein Telefon nicht still, weil der Haushalt ohne meine ständige Fernsteuerung zusammenbricht.",
      fr: "Même malade ou en déplacement, mon téléphone sonne sans arrêt car le foyer est incapable de tourner sans mes directives.",
      es: "Incluso estando enfermo/a o de descanso, mi móvil colapsa a preguntas porque la casa no funciona sin mis instrucciones."
    }
  },
  {
    id: 8,
    subscale: "mental_load_disparity",
    text: {
      en: "I suffer from decision fatigue and mental exhaustion because I have to manage another grown adult while managing our home and my own career.",
      id: "Saya mengalami decision fatigue dan lelah mental hebat karena harus mengasuh orang dewasa lain sembari mengurus rumah dan karir sendiri.",
      de: "Ich leide unter Entscheidungsmüdigkeit und Burnout, weil ich neben Beruf und Alltag auch noch einen erwachsenen Menschen managen muss.",
      fr: "Je souffre de fatigue décisionnelle aiguë à force de devoir chapeauter un adulte en plus de mon travail et de ma propre vie.",
      es: "Sufro fatiga de decisión extrema por tener que dirigir a otro adulto completamente funcional además de mi trabajo y mi vida."
    }
  },

  // 3. Parent-Child Relational Degradation & Resentment
  {
    id: 9,
    subscale: "parent_child_exhaustion",
    text: {
      en: "I feel like a nagging mother/father rather than an equal romantic partner, which has completely extinguished my sexual and romantic desire.",
      id: "Saya merasa seperti orang tua yang mengomeli anaknya daripada pasangan romantis yang setara, yang membuat gairah seksual dan cinta saya padam.",
      de: "Ich fühle mich eher wie ein nörgelnder Elternteil statt wie ein begehrter Partner, was meine sexuelle Anziehungskraft komplett zerstört hat.",
      fr: "J'ai l'impression d'être son parent rabat-joie plutôt que son partenaire amoureux, ce qui a totalement anéanti mon désir sexuel.",
      es: "Me siento como un padre/madre regañón/a en lugar de su pareja romántica, lo que ha destruido por completo mi deseo sexual hacia él/ella."
    }
  },
  {
    id: 10,
    subscale: "parent_child_exhaustion",
    text: {
      en: "I harbor deep, simmering resentment toward my partner for lounging on the couch on their phone while I frantically clean and organize around them.",
      id: "Saya menyimpan kebencian mendalam saat melihat pasangan santai main HP di sofa sementara saya sibuk membersihkan dan membereskan rumah di sekitarnya.",
      de: "Ich hege tiefen Groll, wenn mein Partner entspannt am Handy daddelt, während ich gestresst um ihn herum aufräume.",
      fr: "Je ressens une rancœur brûlante en le/la voyant flâner sur son téléphone pendant que je m'active à tout ranger autour.",
      es: "Acumulo un resentimiento feroz al verle tumbado/a con el móvil mientras yo voy de un lado a otro recogiendo y limpiando."
    }
  },
  {
    id: 11,
    subscale: "parent_child_exhaustion",
    text: {
      en: "When I voice my exhaustion, they accuse me of 'nagging', 'being controlling', or 'having impossible standards' instead of taking ownership.",
      id: "Ketika saya menyuarakan kelelahan saya, dia malah menuduh saya 'cerewet', 'bossy', atau 'standarnya ketinggian' bukannya intropeksi.",
      de: "Wenn ich meine Erschöpfung anspreche, wirft er/sie mir vor, ich würde 'nur meckern', 'kontrollieren' oder 'zu hohe Maßstäbe haben'.",
      fr: "Quand j'exprime mon épuisement, il/elle m'accuse de 'râler', d'être 'maniaque' ou 'trop exigeant(e)' au lieu d'assumer sa part.",
      es: "Cuando manifiesto mi agotamiento, me acusa de 'quejica', 'controlador/a' o de tener 'estándares imposibles' en vez de asumir su falta."
    }
  },
  {
    id: 12,
    subscale: "parent_child_exhaustion",
    text: {
      en: "I have seriously considered ending the relationship simply because living alone would actually mean having ONE LESS person to clean up after and manage.",
      id: "Saya serius mempertimbangkan untuk putus/cerai hanya karena hidup sendiri terasa lebih ringan daripada harus mengurus satu orang dewasa tambahan.",
      de: "Ich habe ernsthaft über Trennung nachgedacht, weil Alleinleben bedeuten würde, dass ich einen Erwachsenen WENIGER versorgen muss.",
      fr: "J'ai déjà sérieusement envisagé la séparation juste pour avoir UNE personne de moins à gérer et à ramasser au quotidien.",
      es: "He pensado seriamente en separarme solo porque vivir en soledad implicaría tener un adulto MENOS al que cuidar y limpiar."
    }
  }
];

export const WEAPONIZED_INCOMPETENCE_OPTIONS = [
  {
    value: 0,
    label: {
      en: "Never / True Equal Partnership",
      id: "Tidak Pernah / Kemitraan Setara",
      de: "Nie / Vollkommen gleichberechtigt",
      fr: "Jamais / Partage équitable parfait",
      es: "Nunca / Reparto totalmente equitativo"
    }
  },
  {
    value: 1,
    label: {
      en: "Rarely (Occasionally happens)",
      id: "Jarang (Kadang-kadang terjadi)",
      de: "Selten (Kommt vereinzelt vor)",
      fr: "Rarement (Épisodique)",
      es: "Raras veces (Ocasional)"
    }
  },
  {
    value: 2,
    label: {
      en: "Sometimes (Noticeable friction)",
      id: "Kadang-kadang (Mulai terasa gesekan)",
      de: "Manchmal (Spürbare Reibung)",
      fr: "Parfois (Friction perceptible)",
      es: "A veces (Fricción perceptible)"
    }
  },
  {
    value: 3,
    label: {
      en: "Often (Weekly battleground)",
      id: "Sering (Sering memicu konflik)",
      de: "Häufig (Regelmäßiger Konfliktherd)",
      fr: "Souvent (Conflit quasi permanent)",
      es: "A menudo (Conflicto habitual)"
    }
  },
  {
    value: 4,
    label: {
      en: "Constantly / Exact Life Reality",
      id: "Selalu / Persis Kenyataan Hidup Saya",
      de: "Ständig / Exakte Abbildung meines Alltags",
      fr: "Constamment / Exacte réalité quotidienne",
      es: "Constantemente / Reflejo exacto de mi vida"
    }
  }
];

export const WEAPONIZED_INCOMPETENCE_RESULTS: WeaponizedIncompetenceResultLevel[] = [
  {
    level: "equitable_partnership",
    scoreRange: [0, 11],
    title: {
      en: "Equitable Partnership · Balanced Mental & Physical Labor",
      id: "Kemitraan Setara · Beban Mental & Fisik Seimbang",
      de: "Gleichberechtigte Partnerschaft · Ausgewogene Lastenteilung",
      fr: "Partenariat Équitable · Partage Équilibré de la Charge Mentale",
      es: "Relación Equitativa · Carga Mental y Física Equilibrada"
    },
    badge: {
      en: "True Equality",
      id: "Kemitraan Sejati",
      de: "Echte Balance",
      fr: "Égalité Réelle",
      es: "Equidad Real"
    },
    summary: {
      en: "Your relationship features genuine co-ownership of domestic and emotional responsibilities. Neither partner relies on strategic incompetence or treats the other as a household manager. Mutual respect and adult accountability are thriving.",
      id: "Hubungan Anda memiliki rasa tanggung jawab bersama yang matang. Tidak ada pihak yang sengaja pura-pura bodoh atau menganggap pasangannya sebagai manajer rumah tangga. Rasa saling menghargai berjalan baik.",
      de: "Ihre Partnerschaft zeichnet sich durch echte gemeinsame Verantwortung aus. Niemand nutzt Ausreden oder wälzt mentale Last ab. Gegenseitiger Respekt und Reife dominieren Ihren Alltag.",
      fr: "Votre relation repose sur une co-responsabilité authentique. Aucun des deux ne feint l'incompétence pour échapper aux corvées. Le respect mutuel est bien ancré.",
      es: "Tu relación se fundamenta en la corresponsabilidad madura. Ninguno finge torpeza para librarse de tareas ni trata al otro como jefe de hogar. Hay respeto y equilibrio."
    },
    neurobiology: {
      en: "Balanced oxytocin and dopamine signaling. Absence of chronic cortisol surges associated with parent-child relational degradation. The ventral vagal circuit maintains romantic safety and mutual desire.",
      id: "Keseimbangan hormon oksitosin dan dopamin. Bebas dari lonjakan kortisol kronis yang biasa memadamkan gairah cinta.",
      de: "Stabile Neurochemie ohne dauerhafte Stressbelastung durch partnerschaftliche Überlastung. Die Libido bleibt erhalten.",
      fr: "Équilibre neuro-hormonal serein préservant le désir amoureux et la sécurité affective.",
      es: "Circuitos neuroquímicos estables sin sobrecarga de cortisol por resentimiento doméstico."
    },
    actionProtocol: {
      en: [
        "Continue weekly touchpoints: Maintain a 10-minute check-in on upcoming logistics without resentment.",
        "Celebrate reciprocal appreciation: Explicitly thank each other for unseen contributions.",
        "Private audio reflection: Use Nuju's voice journal to process personal work stressors so home remains a sanctuary."
      ],
      id: [
        "Lanjutkan evaluasi mingguan: Luangkan 10 menit seminggu untuk menyelaraskan jadwal tanpa ketegangan.",
        "Saling apresiasi: Ucapkan terima kasih atas kerja keras pasangan yang tak terlihat.",
        "Refleksi mandiri: Gunakan jurnal audio Nuju untuk mengurai stres kerja agar rumah tetap menjadi tempat yang damai."
      ],
      de: [
        "Wöchentlicher Logistik-Check: 10 Minuten gemeinsame Planung beibehalten.",
        "Gegenseitige Wertschätzung: Unsichtbare Arbeit des anderen aktiv anerkennen.",
        "Stimmjournaling in Nuju: Beruflichen Stress vor der Haustür im privaten Audio-Tagebuch abbauen."
      ],
      fr: [
        "Point logistique hebdomadaire : Maintenez 10 minutes d'échange serein par semaine.",
        "Reconnaissance mutuelle : Valorisez les efforts invisibles de chacun.",
        "Journal vocal Nuju : Déchargez vos tensions professionnelles dans Nuju pour préserver l'harmonie du foyer."
      ],
      es: [
        "Chequeo logístico semanal: Dediquen 10 minutos a coordinar la semana sin reproches.",
        "Agradecimiento mutuo: Reconozcan activamente las tareas invisibles que realiza el otro.",
        "Diario vocal en Nuju: Descarga el estrés del trabajo en Nuju para que el hogar siga siendo un refugio de paz."
      ]
    }
  },

  {
    level: "mild_creep",
    scoreRange: [12, 20],
    title: {
      en: "Mild Labor Friction · Early Mental Load Creep",
      id: "Gesekan Domestik Ringan · Beban Mental Mulai Timpang",
      de: "Leichte Dysbalance · Beginnende Mental-Load-Verschiebung",
      fr: "Friction Domestique Légère · Début de Surcharge Mentale",
      es: "Fricción Doméstica Leve · Desequilibrio Incipiente de Carga Mental"
    },
    badge: {
      en: "Load Creep",
      id: "Beban Merayap",
      de: "Aufgaben-Drift",
      fr: "Dérive Insidieuse",
      es: "Desbalance Leve"
    },
    summary: {
      en: "You are noticing subtle patterns where one partner assumes the default 'household planner' role while the other waits for directions or occasionally botches tasks. Early resentment is forming, but it can be corrected with clear ownership.",
      id: "Anda mulai merasakan pola di mana salah satu pihak menjadi 'perencana utama' sementara pihak lain pasif menunggu perintah. Kejengkelan mulai tumbuh, namun masih mudah diperbaiki dengan pembagian tugas yang jelas.",
      de: "Erste Muster zeichnen sich ab: Ein Partner übernimmt unbemerkt die Chef-Rolle, während der andere auf Anweisungen wartet. Frühe Gereiztheit entsteht.",
      fr: "Vous constatez un glissement insidieux : l'un devient le chef d'orchestre par défaut et l'autre attend d'être sollicité. Une mise au point précoce s'impose.",
      es: "Detectas un patrón sutil donde uno planifica todo y el otro espera instrucciones. El resentimiento asoma, pero se puede corregir con límites claros."
    },
    neurobiology: {
      en: "Mild anterior insula irritation signalling perceived relational unfairness. Intermittent cortisol elevation following repeated domestic reminders.",
      id: "Iritasi ringan pada insula anterior akibat rasa ketidakadilan relasional. Kortisol naik sesekali setelah mengingatkan hal yang sama berulang kali.",
      de: "Leichte Aktivierung der vorderen Insula durch empfundene Ungerechtigkeit bei der Aufgabenverteilung.",
      fr: "Tension insulaire modérée liée au sentiment de devoir tout porter sur ses épaules.",
      es: "Activación leve en la ínsula ante la sensación de desigualdad en las tareas del hogar."
    },
    actionProtocol: {
      en: [
        "Adopt the 'Full Conception-Planning-Execution' rule: Stop assigning single tasks; assign entire domains (e.g. 100% ownership of trash or dinners).",
        "Stop answering helpless questions: Reply: 'You have a brain and Google; I trust you to figure it out.'",
        "Vent cognitive overload in Nuju: Speak your mental checklist into Nuju's voice journal to stop mental loops before bedtime."
      ],
      id: [
        "Terapkan aturan kepemilikan penuh (CPE): Jangan sekadar membagi tugas kecil; serahkan domain utuh (misalnya 100% urusan cucian baju atau makan malam).",
        "Berhenti menjawab pertanyaan manja: Jawab dengan tenang: 'Kamu orang pintar dan bisa browsing di Google; aku percaya kamu bisa menyelesaikannya sendiri.'",
        "Tumpahkan beban kepala di Nuju: Bicarakan daftar beban mental Anda ke jurnal suara Nuju sebelum tidur agar pikiran tenang."
      ],
      de: [
        "Ganzheitliche Verantwortung übergeben: Nicht bloß Handgriffe delegieren, sondern ganze Bereiche (z. B. 100 % Wäsche oder Abendessen) abtreten.",
        "Hilflose Rückfragen abfangen: Ruhig sagen: 'Du bist erwachsen und findest das selbst heraus; ich vertraue dir.'",
        "Kopf im Nuju-Journal leeren: Mentale To-Do-Listen abends ins Nuju-Audio-Tagebuch sprechen, um Schlafstörungen zu verhindern."
      ],
      fr: [
        "Transférez la pleine responsabilité : Ne déléguez pas une corvée mais un domaine entier (ex: 100 % des repas ou des poubelles).",
        "Cessez de répondre aux fausses questions : Dites calmement : 'Tu es grand(e), je te fais confiance pour trouver la solution.'",
        "Videz votre charge mentale dans Nuju : Enregistrez vos listes de pensées dans Nuju pour soulager votre cerveau avant de dormir."
      ],
      es: [
        "Delega áreas completas (no favores): Traspasa el 100% de una responsabilidad (ej. las cenas o la lavadora de principio a fin).",
        "Frena las preguntas trampas: Responde con calma: 'Eres un adulto funcional y confío en que sabrás resolverlo.'",
        "Vaciado mental en Nuju: Graba tus listas mentales en el diario de voz de Nuju para desconectar antes de acostarte."
      ]
    }
  },

  {
    level: "moderate_incompetence",
    scoreRange: [21, 30],
    title: {
      en: "Moderate Weaponized Incompetence · Active Feigned Helplessness",
      id: "Weaponized Incompetence Moderat · Pura-Pura Bodoh Terstruktur",
      de: "Moderates Vorwand-Versagen · Aktive strategische Hilflosigkeit",
      fr: "Incompétence Stratégique Modérée · Défausse Systématique",
      es: "Incompetencia Estratégica Moderada · Desidia y Desesperación Activa"
    },
    badge: {
      en: "Strategic Deficit",
      id: "Taktik Lepas Tangan",
      de: "Fassade Hilflos",
      fr: "Fausse Torpeur",
      es: "Torpeza Estratégica"
    },
    summary: {
      en: "Your partner actively employs strategic incompetence to evade adult accountability. By doing tasks poorly, asking endless questions, or claiming ignorance, they have successfully forced you to carry the exhausting cognitive and physical load.",
      id: "Pasangan Anda secara aktif memanfaatkan taktik pura-pura tidak bisa untuk lepas dari tanggung jawab. Dengan sengaja mengerjakan tugas secara asal-asalan atau pura-pura bingung, dia berhasil memaksa Anda menanggung seluruh beban mental dan fisik.",
      de: "Ihr Partner setzt gezielt strategische Inkompetenz ein, um sich Pflichten zu entziehen. Durch absichtliche Schlampigkeit oder Hilflosigkeitsgehabe werden Sie in die Zwangsarbeit gedrängt.",
      fr: "Votre partenaire use d'incompétence stratégique pour fuir ses devoirs. En faisant mal exprès ou en jouant les ignorants, il/elle vous contraint à tout assumer par épuisement.",
      es: "Tu pareja aplica incompetencia estratégica constante para evitar responsabilidades. Al hacer las cosas mal o fingir que no sabe, te empuja a cargar con todo por puro agotamiento."
    },
    neurobiology: {
      en: "Chronic prefrontal cortex exhaustion from sustained executive dual-tasking. Elevated resting cortisol and resentment-driven suppression of sexual dopamine pathways.",
      id: "Kelelahan korteks prefrontal kronis akibat terus-menerus memikirkan tugas orang lain. Kortisol tinggi menekan gairah romantis dan seksual.",
      de: "Chronische Erschöpfung des präfrontalen Kortex durch dauerhaftes Mitdenken für zwei. Absinken der sexuellen Dopamin-Transmission.",
      fr: "Épuisement préfrontal chronique lié à la double charge mentale. Le ressentiment bloque l'accès au désir et à l'intimité.",
      es: "Agotamiento ejecutivo severo por gestionar la vida de dos personas. El cortisol crónico apaga las vías del deseo sexual hacia la pareja."
    },
    actionProtocol: {
      en: [
        "Implement Eve Rodsky's 'Fair Play' framework: Hold an official sit-down; lay out all household cards and transfer full ownership.",
        "Refuse to rescue botched tasks: If they wash dishes poorly, leave the dishes. Do not fix their mistakes under any circumstances.",
        "Audio resentment release in Nuju: Speak your raw fury and frustration into Nuju's encrypted journal rather than bottling it up until you explode."
      ],
      id: [
        "Terapkan sistem kartu 'Fair Play': Duduk bersama secara formal; petakan semua tugas rumah tangga dan serahkan domain tanpa campur tangan.",
        "Tolak membereskan pekerjaan yang asal-asalan: Jika cucian piringnya masih kotor, biarkan saja. Jangan sekali-kali Anda bersihkan ulang.",
        "Keluarkan kekesalan di Nuju: Bicarakan amarah dan rasa lelah Anda ke jurnal audio Nuju daripada memendamnya hingga meledak menjadi pertengkaran hebat."
      ],
      de: [
        "Verbindliche Aufgabenkarten vereinbaren: Feste Domänen zuteilen und die eigene Einmischung komplett stoppen.",
        "Keine Nachbesserungen vornehmen: Schlampig gespülte Töpfe stehen lassen. Nicht hinterherputzen!",
        "Wut im Nuju-Journal verarbeiten: Frust ungefiltert im Nuju-Audio-Tagebuch ablassen, um nicht in destruktive Wutausbrüche zu verfallen."
      ],
      fr: [
        "Établissez des contrats de domaine clairs : Cessez de vérifier derrière ; laissez-lui la responsabilité totale d'un secteur.",
        "Ne rattrapez jamais son travail bâclé : Si la vaisselle est mal lavée, laissez-la. Ne nettoyez pas derrière lui/elle.",
        "Exprimez la rage dans Nuju : Confiez votre exaspération au journal chiffré de Nuju pour ne pas imploser de colère."
      ],
      es: [
        "Aplica el método de reparto integral: Traspasa áreas completas sin meterte a supervisar.",
        "No limpies lo mal hecho: Si dejó platos sucios, no los friegues tú. No rescates sus negligencias.",
        "Libera la rabia en Nuju: Habla sin filtro en el diario privado de Nuju para no acumular bilis que dinamite la relación."
      ]
    }
  },

  {
    level: "severe_erosion",
    scoreRange: [31, 39],
    title: {
      en: "Severe Relational Erosion · Parent-Child Dynamic & Burnout",
      id: "Erosi Relasional Parah · Sindrom Orang Tua-Anak & Burnout",
      de: "Schwere Beziehungs-Erosion · Eltern-Kind-Falle & Erschöpfung",
      fr: "Érosion Relationnelle Sévère · Dynamique Parent-Enfant & Burnout",
      es: "Erosión Conyugal Severa · Dinámica Padre-Hijo y Agotamiento"
    },
    badge: {
      en: "Eroded Passion",
      id: "Gairah Padam",
      de: "Begehren Zerstört",
      fr: "Désir Éteint",
      es: "Deseo Extinto"
    },
    summary: {
      en: "Your relationship has severely degenerated into an exhausting parent-child dynamic. You feel like a resentful mother or father nagging a rebellious teenager. Romantic attraction and sexual intimacy are dead, replaced by overwhelming bitterness and exhaustion.",
      id: "Hubungan Anda telah merosot menjadi dinamika orang tua dan anak yang melelahkan. Anda merasa seperti ibu/ayah yang mengomeli remaja pemberontak. Gairah romantis dan seks padam total, digantikan oleh kepahitan dan rasa lelah mendalam.",
      de: "Ihre Beziehung ist zu einer Eltern-Kind-Dynamik verkommen. Sie fühlen sich wie ein genervter Elternteil eines bockigen Teenagers. Die erotische Anziehung ist tot, verdrängt von Frust und Verbitterung.",
      fr: "Votre couple a muté en relation parent-enfant étouffante. Vous avez l'impression d'élever un adolescent paresseux. Le désir érotique a disparu au profit d'un ressentiment toxique.",
      es: "Tu matrimonio o noviazgo se ha convertido en una relación padre-hijo desgastante. Te sientes cuidando a un adolescente rebelde. La atracción sexual ha muerto bajo el peso del rencor."
    },
    neurobiology: {
      en: "Severe downregulation of the sexual attachment system. The brain perceives the partner as a dependent child rather than an equal mate, chemically inhibiting sexual oxytocin and testosterone reception while sustaining high chronic cortisol.",
      id: "Penurunan drastis sistem keterikatan seksual. Otak memandang pasangan sebagai anak yang bergantung bukan kekasih yang setara, melumpuhkan gairah intim secara biologis.",
      de: "Vollständige Hemmung des sexuellen Bindungssystems. Das Gehirn stuft den Partner unbewusst als unselbstständiges Kind ein, was die Libido neurobiologisch blockiert.",
      fr: "Blocage neurobiologique de l'attraction sexuelle. Le cerveau perçoit le partenaire comme un enfant à charge, inhibant toute excitation amoureuse.",
      es: "Inhibición neurológica del deseo sexual. El cerebro percibe a la pareja como un menor dependiente, bloqueando la libido de raíz."
    },
    actionProtocol: {
      en: [
        "Immediate boundary strike: Stop doing their laundry, stop packing their bags, and stop managing their personal appointments.",
        "Demand couples therapy or structural renegotiation: State clearly that the relationship cannot survive as a parent-child dynamic.",
        "Daily voice decompression in Nuju: Channel grief, exhaustion, and loneliness into Nuju's voice sanctuary to regain your personal identity outside of the caregiver trap."
      ],
      id: [
        "Mogok tugas sepihak: Berhentilah mencuci bajunya, jangan siapkan keperluannya, dan biarkan dia menanggung konsekuensi kelalaiannya sendiri.",
        "Tuntut konseling pasangan: Nyatakan dengan tegas bahwa Anda menolak terus hidup dalam dinamika orang tua-anak.",
        "Dekompresi suara di Nuju: Salurkan duka, rasa kesepian, dan kelelahan ke jurnal suara Nuju untuk menemukan kembali jati diri Anda yang hilang."
      ],
      de: [
        "Streik ausrufen: Keine Wäsche mehr für den Partner waschen, keine Termine mehr planen. Konsequenzen aushalten lassen!",
        "Paartherapie einfordern: Unmissverständlich klarstellen, dass diese Eltern-Kind-Rolle das Ende der Partnerschaft bedeutet.",
        "Stimmliche Entlastung in Nuju: Einsamkeit und Wut im Nuju-Audio-Tagebuch verarbeiten, um die eigene Identität jenseits der Versorgerfalle zurückzuholen."
      ],
      fr: [
        "Grève domestique ciblée : Cessez de faire sa lessive, de ranger ses affaires et de gérer ses rendez-vous personnels.",
        "Exigez une thérapie de couple : Posez un ultimatum clair : vous refusez de rester le parent de votre conjoint(e).",
        "Sanctuaire vocal personnel : Déposez votre solitude et votre fatigue dans Nuju pour réaffirmer votre valeur en tant qu'adulte libre."
      ],
      es: [
        "Huelga de cuidados: Deja de lavar su ropa, de preparar sus cosas y de recordarle sus médicos. Que asuma sus consecuencias.",
        "Ultimátum terapéutico: Deja claro que la relación se termina si continúan en una dinámica tóxica de madre/padre e hijo.",
        "Refugio vocal en Nuju: Desahoga el dolor y la soledad en Nuju para reconstruir tu dignidad e identidad fuera del rol de cuidador/a."
      ]
    }
  },

  {
    level: "critical_exploitation",
    scoreRange: [40, 48],
    title: {
      en: "Critical Relational Exploitation · Domestic Parasitism & Total Burnout",
      id: "Eksploitasi Relasional Kritis · Parasitisme Domestik & Burnout Total",
      de: "Kritische Ausbeutung · Häuslicher Parasitismus & Totaler Burnout",
      fr: "Exploitation Relationnelle Critique · Parasitisme Domestique & Épuisement",
      es: "Explotación Relacional Crítica · Parasitismo Doméstico y Quiebre Total"
    },
    badge: {
      en: "Domestic Crisis",
      id: "Krisis Domestik",
      de: "Totaler Kollaps",
      fr: "Crise Totale",
      es: "Crisis Doméstica"
    },
    summary: {
      en: "You are being fundamentally exploited. Your partner uses weaponized incompetence as a covert form of control, forcing you into servitude while gaslighting you as 'crazy' or 'controlling'. You are completely depleted and staying in this environment is destroying your health.",
      id: "Anda sedang dieksploitasi secara sistemik. Pasangan Anda menggunakan pura-pura bodoh sebagai bentuk manipulasi terselubung, memaksa Anda menjadi pelayan seraya menuduh Anda 'gila kontrol'. Fisik dan jiwa Anda hancur total.",
      de: "Sie werden schamlos ausgenutzt. Ihr Partner nutzt strategische Hilflosigkeit als verdeckte Machtausübung, beutet Sie aus und betreibt Gaslighting. Ihre Gesundheit steht auf dem Spiel.",
      fr: "Vous subissez une exploitation domestique grave. Votre partenaire utilise l'incompétence feinte pour vous asservir tout en vous faisant passer pour maniaque. Votre santé physique et mentale est en péril.",
      es: "Estás sufriendo una explotación intolerable. Tu pareja utiliza la falsa inutilidad como manipulación para que le sirvas mientras te tacha de loco/a. Tu salud física y mental está al borde del colapso."
    },
    neurobiology: {
      en: "Severe systemic nervous system collapse. Flattened diurnal cortisol curves, chronic somatic inflammation, clinical depression, and loss of autonomic safety in your own living space.",
      id: "Kolaps sistem saraf otonom sistemik. Kurva kortisol datar, radang somatik kronis, depresi, dan hilangnya rasa aman di rumah sendiri.",
      de: "Vollständiger Zusammenbruch des Nervensystems. Chronische Entzündungswerte, depressive Erschöpfung und Verlust jedes Sicherheitsgefühls im eigenen Heim.",
      fr: "Effondrement systémique du système nerveux. Inflammation chronique, dépression d'épuisement et insécurité permanente à domicile.",
      es: "Colapso del sistema nervioso por sobreesfuerzo prolongado. Inflamación somática, depresión y pérdida total de paz en tu propio hogar."
    },
    actionProtocol: {
      en: [
        "Plan your exit: Consult legal/financial advice; living alone will dramatically reduce your workload and restore your mental health.",
        "Complete detachment: Stop managing, cooking for, or cleaning after this person. Treat them as an incompatible roommate.",
        "Daily emergency venting in Nuju: Speak your anguish, grief, and boundary reclamation into Nuju's encrypted sanctuary every night."
      ],
      id: [
        "Rencanakan perpisahan: Konsultasikan aspek finansial/hukum; hidup sendiri akan memotong beban hidup Anda hingga 50% dan memulihkan kesehatan mental Anda.",
        "Detasemen total: Berhentilah memasak, mencuci, atau melayani orang ini. Anggap dia hanya orang asing yang salah tempat.",
        "Ventilasi darurat di Nuju: Bicarakan kepedihan dan keberanian Anda untuk lepas ke jurnal suara pribadi Nuju setiap malam."
      ],
      de: [
        "Trennung vorbereiten: Rechtliche und finanzielle Schritte planen. Ein eigenes Leben wird Ihre Arbeitslast drastisch senken.",
        "Vollständige emotionale und praktische Abkopplung: Keinen Handgriff mehr für diesen Menschen tun!",
        "Tägliche Stimmentlastung in Nuju: Schmerz und Wut jeden Abend im Nuju-Audio-Journal entladen, um die Kraft zum Gehen zu finden."
      ],
      fr: [
        "Organisez votre départ : Consultez un juriste ; vivre seul(e) allègera considérablement votre fardeau et vous rendra la santé.",
        "Détachement absolu : Cessez immédiatement de cuisiner ou de nettoyer pour cette personne.",
        "Libération vocale dans Nuju : Déposez votre désespoir et votre soif de liberté dans Nuju chaque soir pour puiser la force d'agir."
      ],
      es: [
        "Prepara tu salida: Asesórate legal y económicamente; vivir solo/a te quitará la mitad del trabajo y te devolverá la salud.",
        "Desconexión total: Ni una comida más, ni una lavadora más para esa persona. Que asuma su propia vida.",
        "Sanctuary vocal en Nuju: Descarga el llanto, el enojo y tu derecho a una vida digna en el diario cifrado de Nuju cada noche para armarte de valor."
      ]
    }
  }
];

export const WEAPONIZED_INCOMPETENCE_SUBSCALE_INFO = {
  strategic_helplessness: {
    name: {
      en: "Strategic Helplessness & Botched Chores",
      id: "Pura-Pura Bodoh & Pekerjaan Asal-asalan",
      de: "Strategische Hilflosigkeit & Vorwand-Versagen",
      fr: "Incompétence Feinte & Travail Bâclé",
      es: "Incompetencia Fingida y Chapuzas Deliberadas"
    },
    description: {
      en: "Deliberate mistakes, endless trivial questions, and claiming 'you do it better' to permanently avoid adult duties.",
      id: "Sengaja salah mengerjakan tugas, bertanya hal sepele, dan beralasan 'kamu lebih jago' agar terbebas dari tanggung jawab.",
      de: "Absichtliches Schlecht-Machen, endlose banale Rückfragen und Ausflüchte, um Pflichten dauerhaft abzuwälzen.",
      fr: "Erreurs délibérées, questions infantilisantes et flatteries hypocrites pour ne plus jamais avoir à faire les corvées.",
      es: "Errores intencionados, preguntas absurdas y falsos elogios para eludir permanentemente las tareas de adulto."
    }
  },
  mental_load_disparity: {
    name: {
      en: "Mental Load Disparity & Project Management",
      id: "Ketimpangan Beban Mental & Manajemen Rumah",
      de: "Mental-Load-Disbalance & Haushalts-Management",
      fr: "Surcharge Mentale Invisible & Pilotage du Foyer",
      es: "Desbalance de Carga Mental y Gestión Logística"
    },
    description: {
      en: "Carrying 90%+ of domestic cognitive coordination, planning, inventory, doctor visits, and anticipating crises alone.",
      id: "Memikul 90%+ beban mental koordinasi rumah tangga, rencana belanja, dokter, dan antisipasi masalah sendirian.",
      de: "Alleiniges Tragen von über 90 % der organisatorischen Planung, Termine, Vorräte und Familienlogistik.",
      fr: "Assumer seul(e) l'anticipation des stocks, des rendez-vous, des repas et de toute la logistique familiale.",
      es: "Cargar en solitario con la planificación de compras, médicos, comidas, citas y previsión de emergencias."
    }
  },
  parent_child_exhaustion: {
    name: {
      en: "Parent-Child Dynamic & Sexual Erosion",
      id: "Sindrom Orang Tua-Anak & Gairah Padam",
      de: "Eltern-Kind-Gefälle & Zerstörte Erotik",
      fr: "Dynamique Parent-Enfant & Extinction du Désir",
      es: "Dinámica Padre-Hijo y Extinción del Deseo"
    },
    description: {
      en: "Feeling like a nagging caregiver to an adult, simmering resentment, couch-slacking partner, and dead romantic intimacy.",
      id: "Merasa mengasuh anak besar manja, kebencian saat pasangan malas-malasan di sofa, dan hilangnya gairah seksual.",
      de: "Nörgelnde Elternrolle gegenüber dem Partner, brennender Groll und vollständiges Absterben erotischer Anziehung.",
      fr: "Avoir l'impression d'éduquer un ado paresseux, colère sourde et disparition totale de la libido et du respect.",
      es: "Sentirse como el tutor de un menor holgazán, rencor al verle en el sofá y muerte absoluta de la atracción erótica."
    }
  }
};

export function getWeaponizedIncompetenceResult(totalScore: number): WeaponizedIncompetenceResultLevel {
  const matched = WEAPONIZED_INCOMPETENCE_RESULTS.find(
    (lvl) => totalScore >= lvl.scoreRange[0] && totalScore <= lvl.scoreRange[1]
  );
  return matched || WEAPONIZED_INCOMPETENCE_RESULTS[WEAPONIZED_INCOMPETENCE_RESULTS.length - 1];
}

export function calculateWeaponizedIncompetenceSubscales(answers: Record<number, number>): {
  strategic_helplessness: number;
  mental_load_disparity: number;
  parent_child_exhaustion: number;
} {
  let strategic_helplessness = 0;
  let mental_load_disparity = 0;
  let parent_child_exhaustion = 0;

  WEAPONIZED_INCOMPETENCE_QUESTIONS.forEach((q) => {
    const val = answers[q.id] || 0;
    if (q.subscale === "strategic_helplessness") strategic_helplessness += val;
    if (q.subscale === "mental_load_disparity") mental_load_disparity += val;
    if (q.subscale === "parent_child_exhaustion") parent_child_exhaustion += val;
  });

  return { strategic_helplessness, mental_load_disparity, parent_child_exhaustion };
}
