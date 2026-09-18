export type MaladaptiveDaydreamingCardLang = "en" | "id" | "de" | "fr" | "es";

export interface MaladaptiveDaydreamingQuestion {
  id: number;
  subscale: "kinesthetic_pacing" | "paracosm_immersion" | "vocational_distress";
  text: {
    en: string;
    id: string;
    de: string;
    fr: string;
    es: string;
  };
}

export interface MaladaptiveDaydreamingResultLevel {
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

export const MALADAPTIVE_DAYDREAMING_QUESTIONS: MaladaptiveDaydreamingQuestion[] = [
  {
    id: 1,
    subscale: "kinesthetic_pacing",
    text: {
      en: "While daydreaming, I feel an uncontrollable urge to pace, walk in circles, rock, spin, or gesture with my hands.",
      id: "Saat melamun, saya merasa ada dorongan kuat yang sulit ditahan untuk mondar-mandir, berjalan memutar, bergoyang, atau menggerakkan tangan.",
      de: "Während des Tagträumens verspüre ich den Drang, im Zimmer auf und ab zu gehen, im Kreis zu laufen oder mit den Händen zu gestikulieren.",
      fr: "Pendant mes rêveries, je ressens le besoin irrépressible de faire les cent pas, de tourner en rond, de me balancer ou de gesticuler.",
      es: "Mientras fantaseo, siento un impulso incontrolable de caminar de un lado a otro en círculos, mecerme o hacer gestos con las manos."
    }
  },
  {
    id: 2,
    subscale: "paracosm_immersion",
    text: {
      en: "I listen to specific music or songs on repeat for hours specifically to trigger and intensify vivid, cinematic daydreams.",
      id: "Saya mendengarkan lagu atau musik tertentu secara berulang-ulang berjam-jam khusus untuk memicu dan memperdalam lamunan sinematik.",
      de: "Ich höre bestimmte Lieder stundenlang in Dauerschleife, um lebendige, filmreife Fantasiewelten auszulösen und zu verstärken.",
      fr: "J'écoute des musiques spécifiques en boucle pendant des heures dans le seul but de stimuler et d'intensifier mes scénarios intérieurs.",
      es: "Escucho canciones específicas en bucle durante horas exclusivamente para activar e intensificar historias y fantasías cinematográficas."
    }
  },
  {
    id: 3,
    subscale: "vocational_distress",
    text: {
      en: "My daydreams cause me to postpone, neglect, or fall behind on real-life obligations, studies, work, or chores.",
      id: "Lamunan membuat saya menunda, mengabaikan, atau terbengkalai dalam menyelesaikan tugas nyata, pekerjaan, belajar, atau urusan rumah.",
      de: "Mein Tagträumen führt dazu, dass ich reale Pflichten, Beruf, Studium oder Haushalt aufschiebe oder vernachlässige.",
      fr: "Mes rêveries m'amènent à repousser, négliger ou accumuler du retard dans mes études, mon travail ou mes obligations quotidiennes.",
      es: "Mis ensoñaciones hacen que posponga, descuide o me retrase en mis obligaciones laborales, académicas o del hogar."
    }
  },
  {
    id: 4,
    subscale: "paracosm_immersion",
    text: {
      en: "I have created complex imaginary worlds, continuous plotlines, or detailed fictional characters that I have maintained for months or years.",
      id: "Saya menciptakan dunia imajinasi yang rumit, alur cerita bersambung, atau karakter fiktif mendalam yang saya rawat selama berbulan-bulan atau bertahun-tahun.",
      de: "Ich habe komplexe Fantasiewelten, fortlaufende Handlungsstränge oder detaillierte fiktive Charaktere erschaffen, die mich seit Monaten oder Jahren begleiten.",
      fr: "J'ai développé des mondes imaginaires complexes, des scénarios continus ou des personnages détaillés que j'entretiens depuis des mois ou des années.",
      es: "He creado mundos imaginarios complejos, tramas continuas o personajes ficticios detallados que he mantenido durante meses o años."
    }
  },
  {
    id: 5,
    subscale: "kinesthetic_pacing",
    text: {
      en: "I whisper dialogue, mouth words, laugh, or make facial expressions out loud corresponding to what is happening in my fantasy.",
      id: "Saya berbisik, bergumam, tertawa, atau membuat ekspresi wajah spontan yang mencerminkan adegan yang sedang terjadi di kepala saya.",
      de: "Ich flüstere Dialoge, bewege die Lippen, lache oder verändere meine Mimik passend zu dem, was in meiner Fantasie geschieht.",
      fr: "Je chuchote des dialogues, remue les lèvres, souris ou change d'expression faciale en écho aux événements de mon monde imaginaire.",
      es: "Susurro diálogos, muevo los labios, me río o hago expresiones faciales que corresponden a lo que ocurre en mi fantasía."
    }
  },
  {
    id: 6,
    subscale: "vocational_distress",
    text: {
      en: "When real-life demands or people interrupt my daydreaming session, I feel sudden irritability, anxiety, or acute frustration.",
      id: "Ketika tuntutan dunia nyata atau orang lain menginterupsi sesi melamun saya, saya merasa sangat jengkel, cemas, atau frustrasi mendalam.",
      de: "Wenn mich Menschen oder Verpflichtungen aus einem Tagtraum reißen, reagiere ich mit starker Reizbarkeit, Angst oder Frustration.",
      fr: "Lorsque le monde réel ou quelqu'un interrompt ma rêverie, je ressens une irritation soudaine, de l'anxiété ou une vive contrariété.",
      es: "Cuando las obligaciones cotidianas o las personas interrumpen mi fantasía, siento una irritabilidad repentina, ansiedad o gran frustración."
    }
  },
  {
    id: 7,
    subscale: "paracosm_immersion",
    text: {
      en: "I feel intense, authentic emotions (joy, grief, heartbreak, heroic thrill) for my daydream characters, sometimes more strongly than for real people.",
      id: "Saya merasakan emosi mendalam dan nyata (tangis haru, patah hati, euforia) untuk karakter di lamunan saya, terkadang lebih kuat dibanding terhadap orang nyata.",
      de: "Ich empfinde intensive, echte Gefühle (Trauer, Euphorie, Herzschmerz) für meine Fantasiefiguren, oft intensiver als für reale Personen.",
      fr: "Je ressens des émotions intenses et sincères (chagrin, triomphe, amour) pour mes personnages imaginaires, parfois plus que pour des personnes réelles.",
      es: "Siento emociones intensas y auténticas (tristeza, éxtasis, dolor) por mis personajes imaginarios, a veces con más fuerza que por personas reales."
    }
  },
  {
    id: 8,
    subscale: "vocational_distress",
    text: {
      en: "I prefer retreating into my daydreams over socializing with real friends or family, finding reality boring or emotionally draining in comparison.",
      id: "Saya lebih memilih mengasingkan diri ke dalam lamunan daripada bergaul dengan teman atau keluarga, karena dunia nyata terasa hambar atau melelahkan.",
      de: "Ich ziehe mich lieber in meine Tagträume zurück, als mich mit Freunden oder Familie zu treffen, weil sich die Realität im Vergleich ermüdend anfühlt.",
      fr: "Je préfère m'isoler dans mes rêveries plutôt que de fréquenter mes amis ou ma famille, trouvant la réalité fade ou épuisante par comparaison.",
      es: "Prefiero retirarme a mis ensoñaciones antes que socializar, sintiendo que la realidad cotidiana es aburrida o emocionalmente desgastante."
    }
  },
  {
    id: 9,
    subscale: "kinesthetic_pacing",
    text: {
      en: "I lose track of physical time: I intend to daydream for 5 minutes, but wake up to discover 1 to 3 hours have vanished.",
      id: "Saya kehilangan kepekaan waktu fisik: berniat melamun hanya 5 menit, namun tersadar 1 hingga 3 jam telah menguap tanpa terasa.",
      de: "Ich verliere das Zeitgefühl: Ich nehme mir 5 Minuten vor und stelle erschrocken fest, dass 1 bis 3 Stunden spurlos vergangen sind.",
      fr: "Je perds la notion du temps : je prévois de rêvasser 5 minutes et réalise avec stupeur que 1 à 3 heures se sont envolées.",
      es: "Pierdo la noción del tiempo físico: planeo soñar despierto 5 minutos y me doy cuenta de que han desaparecido de 1 a 3 horas."
    }
  },
  {
    id: 10,
    subscale: "vocational_distress",
    text: {
      en: "I have repeatedly attempted to cut down, control, or stop my excessive daydreaming, but felt unable to resist the mental pull.",
      id: "Saya sudah berulang kali berniat mengurangi, mengontrol, atau berhenti melamun berlebihan, namun selalu kalah oleh tarikan magnetiknya.",
      de: "Ich habe mehrfach versucht, mein exzessives Tagträumen einzudämmen oder zu stoppen, konnte dem inneren Sog jedoch nicht widerstehen.",
      fr: "J'ai tenté à plusieurs reprises de limiter ou d'arrêter ces rêveries excessives, mais l'aimantation mentale a été trop puissante.",
      es: "He intentado repetidamente reducir o detener mis ensoñaciones excesivas, pero me he sentido incapaz de resistir la atracción mental."
    }
  },
  {
    id: 11,
    subscale: "paracosm_immersion",
    text: {
      en: "My daydreams serve as an emotional shock absorber whenever I feel lonely, anxious, rejected, or overwhelmed by stress.",
      id: "Lamunan berfungsi sebagai peredam kejut emosional setiap kali saya merasa kesepian, cemas, tertolak, atau kewalahan oleh stres berat.",
      de: "Meine Fantasien dienen als seelischer Stoßdämpfer, sobald ich mich einsam, ängstlich, zurückgewiesen oder von Stress überwältigt fühle.",
      fr: "Mes rêveries me servent d'amortisseur émotionnel chaque fois que je ressens la solitude, l'angoisse, le rejet ou un stress écrasant.",
      es: "Mis fantasías funcionan como un amortiguador emocional cada vez que me siento solo, ansioso, rechazado o abrumado por el estrés."
    }
  },
  {
    id: 12,
    subscale: "kinesthetic_pacing",
    text: {
      en: "I feel a sense of internal shame or secrecy about my daydreaming habits, hiding my pacing, headphones, or muttering from roommates and family.",
      id: "Saya merasa ada rasa malu atau kebutuhan merahasiakan kebiasaan melamun ini, menyembunyikan ritual mondar-mandir dan headphone dari keluarga atau teman.",
      de: "Ich schäme mich heimlich für meine Tagtraum-Rituale und verberge mein Umhergehen, meine Kopfhörer und mein Geflüster vor anderen.",
      fr: "J'éprouve de la honte ou le besoin de garder mes rêveries secrètes, dissimulant mes déambulations, mes écouteurs et mes murmures à mon entourage.",
      es: "Siento vergüenza o secreto sobre mis hábitos de ensoñación, ocultando mis paseos, auriculares y murmullos a mi familia o compañeros."
    }
  }
];

export const MALADAPTIVE_DAYDREAMING_OPTIONS = [
  {
    score: 0,
    label: {
      en: "Never / Rarely (0% of the time)",
      id: "Tidak Pernah / Sangat Jarang (0%)",
      de: "Nie / Sehr selten (0%)",
      fr: "Jamais / Rarement (0%)",
      es: "Nunca / Raras veces (0%)"
    }
  },
  {
    score: 1,
    label: {
      en: "Occasionally (1-2 times a week)",
      id: "Kadang-kadang (1-2 kali seminggu)",
      de: "Gelegentlich (1-2 Mal pro Woche)",
      fr: "Occasionnellement (1-2 fois par semaine)",
      es: "Ocasionalmente (1-2 veces por semana)"
    }
  },
  {
    score: 2,
    label: {
      en: "Frequently (Daily, 1-2 hours)",
      id: "Sering (Setiap hari, 1-2 jam)",
      de: "Häufig (Täglich, 1-2 Stunden)",
      fr: "Fréquemment (Quotidien, 1-2 heures)",
      es: "Frecuentemente (A diario, 1-2 horas)"
    }
  },
  {
    score: 3,
    label: {
      en: "Almost Constantly (Compulsive, 3+ hours daily)",
      id: "Hampir Konstan (Kompulsif, 3+ jam setiap hari)",
      de: "Fast ständig (Kompulsiv, 3+ Stunden täglich)",
      fr: "Quasi continuellement (Compulsif, 3+ heures par jour)",
      es: "Casi constantemente (Compulsivo, 3+ horas diarias)"
    }
  }
];

export const MALADAPTIVE_DAYDREAMING_RESULTS: MaladaptiveDaydreamingResultLevel[] = [
  {
    level: "healthy_immersive",
    scoreRange: [0, 8],
    title: {
      en: "Healthy Creative & Immersive Daydreaming",
      id: "Lamunan Kreatif & Imersif yang Sehat",
      de: "Gesundes kreatives & immersives Tagträumen",
      fr: "Rêverie créative & immersive saine",
      es: "Ensoñación creativa e inmersiva saludable"
    },
    summary: {
      en: "Your imagination is vivid and playful, but it remains fully under your voluntary executive control. Daydreaming does not derail your real-world relationships or goals.",
      id: "Imajinasi Anda hidup dan kaya warna, namun tetap berada di bawah kendali sadar. Melamun tidak mengorbankan relasi nyata, produktivitas, maupun tujuan hidup Anda.",
      de: "Ihre Fantasie ist lebendig, unterliegt jedoch Ihrer bewussten Steuerung. Tagträume beeinträchtigen weder Ihre Beziehungen noch Ihre Ziele.",
      fr: "Votre imagination est féconde mais reste sous le contrôle conscient de votre cortex préfrontal sans nuire à votre quotidien.",
      es: "Tu imaginación es viva y creativa, pero permanece bajo tu control voluntario sin interferir en tus metas ni en tu vida real."
    },
    neurobiology: {
      en: "Your Default Mode Network (DMN) switches smoothly back to the Task-Positive Network (TPN) whenever real-world engagement is required.",
      id: "Default Mode Network (DMN) otak Anda mampu beralih mulus ke Task-Positive Network (TPN) kapan pun dunia nyata menuntut perhatian Anda.",
      de: "Ihr Default Mode Network (DMN) schaltet mühelos in das aufgabenorientierte Netzwerk (TPN) um, sobald Konzentration erforderlich ist.",
      fr: "Votre réseau du mode par défaut (DMN) bascule avec fluidité vers le réseau orienté vers la tâche (TPN).",
      es: "Tu Red Neuronal por Defecto (DMN) se desactiva con fluidez cuando tus tareas diarias requieren atención activa."
    },
    actionProtocol: {
      en: [
        "Channel your vivid internal imagery into creative outlets: writing, art, or design.",
        "Continue maintaining healthy boundaries between relaxing fantasy and focused work.",
        "Use Nuju's voice journal to record spontaneous creative breakthroughs."
      ],
      id: [
        "Salurkan imajinasi visual Anda ke medium kreatif: menulis cerita, ilustrasi, atau desain ide.",
        "Pertahankan batasan sehat antara relaksasi mental dan fokus kerja nyata.",
        "Gunakan jurnal suara Nuju untuk mendokumentasikan ide-ide brilian yang muncul secara spontan."
      ],
      de: [
        "Nutzen Sie Ihre Bildwelten für kreative Projekte: Schreiben, Kunst oder Konzeption.",
        "Wahren Sie weiterhin die gesunde Balance zwischen Erholung und Alltagsfokus.",
        "Halten Sie spontane Ideen im Nuju-Sprachjournal fest."
      ],
      fr: [
        "Canalisez vos visions dans l'écriture, l'art ou la création de projets.",
        "Maintenez un équilibre sain entre détente imaginative et engagement concret.",
        "Utilisez le journal vocal Nuju pour enregistrer vos intuitions créatives."
      ],
      es: [
        "Canaliza tus imágenes internas en escritura creativa, arte o diseño de proyectos.",
        "Conserva límites saludables entre el ocio imaginativo y tus tareas activas.",
        "Graba tus ideas espontáneas en el diario por voz de Nuju."
      ]
    },
    badge: {
      en: "Creative Immerser",
      id: "Imajinator Sehat",
      de: "Kreativer Denker",
      fr: "Rêveur Créatif",
      es: "Inmersor Creativo"
    }
  },
  {
    level: "mild_absorbed",
    scoreRange: [9, 16],
    title: {
      en: "Mild Absorption & Habitual Escapism",
      id: "Absorpsi Ringan & Eskapisme Kebiasaan",
      de: "Leichte mentale Absorption & Gewohnheitsflucht",
      fr: "Absorption légère & échappatoire habituelle",
      es: "Absorción leve y escapismo habitual"
    },
    summary: {
      en: "You lean into daydreams during boredom, repetitive tasks, or mild stress. While not yet paralyzing, daydreaming is beginning to consume valuable evening and commute hours.",
      id: "Anda cenderung melamun saat bosan, tugas monoton, atau stres ringan. Meski belum melumpuhkan, melamun mulai memakan waktu istirahat dan jam produktif Anda.",
      de: "Bei Langeweile oder Stress flüchten Sie gerne in Fantasiewelten. Dies ist noch nicht pathologisch, raubt aber bereits Freizeit und Abendruhe.",
      fr: "Vous vous réfugiez dans vos scénarios lors de moments de fatigue ou d'ennui. Cela commence à grignoter vos soirées et moments de repos.",
      es: "Recurres a la fantasía durante momentos de aburrimiento o estrés leve. Aún no es invalidante, pero empieza a consumir horas valiosas."
    },
    neurobiology: {
      en: "Dopaminergic reward loops are forming around music-triggered fantasy episodes, prompting the brain to seek daydreaming as a low-effort mood elevator.",
      id: "Sirkuit dopamin mulai terbiasa mendapatkan stimulasi instan dari lamunan berlatar musik, menjadikan melamun sebagai pelarian cepat dari suasana hati murung.",
      de: "Dopaminerge Belohnungsschleifen koppeln Musik an Fantasiewelten und etablieren das Träumen als schnellen Stimmungsaufheller.",
      fr: "Des boucles de dopamine s'associent à la musique en boucle, installant la rêverie comme un anesthésiant émotionnel accessible.",
      es: "Se están formando circuitos de dopamina vinculados a la música repetitiva, usando la fantasía como atajo contra el tedio."
    },
    actionProtocol: {
      en: [
        "Audit music triggers: replace looped epic soundtracks during work with lo-fi instrumental or nature sounds.",
        "Introduce physical friction: stand up or wash your hands with cool water the moment pacing starts.",
        "Vocalize your real-world priorities into Nuju before opening entertainment apps."
      ],
      id: [
        "Audit pemicu musik: ganti playlist musik dramatis berulang saat bekerja dengan instrumen lo-fi atau suara alam.",
        "Buat friksi fisik: segera berdiri, basuh wajah dengan air dingin begitu Anda mendapati diri mulai mondar-mandir melamun.",
        "Suarakan prioritas nyata Anda di jurnal Nuju sebelum tergoda melarikan diri ke lamunan."
      ],
      de: [
        "Musik-Trigger entschärfen: Ersetzen Sie dramatische Soundtracks durch ruhige Naturklänge.",
        "Physische Unterbrechung: Waschen Sie das Gesicht mit kaltem Wasser, sobald das Auf- und Abgehen beginnt.",
        "Sprechen Sie Ihre Prioritäten morgens in Nuju ein, um den Geist zu erden."
      ],
      fr: [
        "Limitez les playlists déclencheuses : privilégiez des bruits blancs ou des sons naturels neutres.",
        "Interrompez le mouvement : passez-vous de l'eau fraîche sur le visage dès que vous commencez à déambuler.",
        "Verbalisez vos priorités dans Nuju avant de plonger dans vos pensées."
      ],
      es: [
        "Modifica los disparadores musicales: cambia pistas épicas en bucle por sonido ambiente neutro.",
        "Interrupción física: mójate la cara con agua fría en cuanto notes que empiezas a pasear en círculos.",
        "Habla en voz alta en Nuju sobre tus tareas pendientes para anclarte a la realidad."
      ]
    },
    badge: {
      en: "Absorbed Wanderer",
      id: "Pengelana Pikiran",
      de: "Gedankenwanderer",
      fr: "Voyageur de l'Esprit",
      es: "Viajero Mental"
    }
  },
  {
    level: "moderate_compensatory",
    scoreRange: [17, 25],
    title: {
      en: "Moderate Compensatory Maladaptive Daydreaming",
      id: "Maladaptive Daydreaming Kompensatori Sedang",
      de: "Moderates kompensatorisches Tagträumen",
      fr: "Rêverie compulsive compensatoire modérée",
      es: "Ensoñación desadaptativa compensatoria moderada"
    },
    summary: {
      en: "Your daydreaming operates as a sophisticated emotional prosthetic. The paracosms you build provide the intimacy, heroism, control, and validation that feel missing in your real life.",
      id: "Lamunan Anda berfungsi sebagai perisai emosional kompensatori. Dunia fantasi Anda menyediakan keintiman, rasa berdaya, kekaguman, dan cinta yang terasa hilang dari kehidupan nyata.",
      de: "Ihr Tagträumen dient als emotionale Prothese. Ihre Fantasiewelten kompensieren Nähe, Erfolg, Kontrolle und Anerkennung, die Ihnen im Alltag fehlen.",
      fr: "Vos rêveries agissent comme une prothèse psychologique comblant le manque de sécurité, d'affection ou d'accomplissement dans votre vie réelle.",
      es: "Tus fantasías funcionan como una prótesis emocional para compensar afecto, control, reconocimiento o éxito que sientes ausentes en tu vida real."
    },
    neurobiology: {
      en: "Hyper-connectivity between the hippocampus and ventral striatum creates intense craving for fantasy immersion, accompanied by prefrontal fatigue when attempting to refocus.",
      id: "Hiperkonektivitas antara hippocampus dan striatum ventral memicu kecanduan rasa puas instan dari lamunan, disertai kelelahan otak depan saat dipaksa kembali fokus.",
      de: "Überaktivität zwischen Hippocampus und ventralem Striatum erzeugt Suchtdruck nach Fantasien bei gleichzeitiger präfrontaler Erschöpfung.",
      fr: "Une hyperconnexion entre hippocampe et striatum ventral alimente une dépendance neurologique aux fictions intérieures.",
      es: "La hiperconectividad entre el hipocampo y el estriado ventral genera ansia compulsiva de inmersión y fatiga ejecutiva."
    },
    actionProtocol: {
      en: [
        "Unpack the unmet emotional core: Ask yourself, 'What emotional nourishment does my daydream character receive that I am denying myself?'",
        "Implement the 15-Minute Sensory Grounding protocol: sit, feel feet on the floor, and name 5 tactile objects aloud.",
        "Talk to Ju in Nuju about real-life loneliness or disappointment to reduce the compensatory drive."
      ],
      id: [
        "Bongkar kebutuhan batin yang belum terpenuhi: Tanyakan pada diri, 'Kebutuhan emosional apa yang didapatkan karakter lamunan saya yang belum saya dapatkan di dunia nyata?'",
        "Lakukan protokol grounding sensori 15 menit: duduk tegak, rasakan telapak kaki menapak lantai, dan sebutkan 5 benda fisik di sekitar.",
        "Bicarakan rasa sepi atau kekecewaan hidup di jurnal suara Nuju agar sistem emosi tidak perlu melarikan diri ke fantasi."
      ],
      de: [
        "Analysieren Sie das ungestillte Bedürfnis: Welches Gefühl (Anerkennung, Liebe, Schutz) schenkt Ihnen die Fantasiefigur?",
        "Sensomotorische Erdung: Setzen Sie sich hin, spüren Sie den Bodenkontakt und benennen Sie 5 reale Gegenstände laut.",
        "Sprechen Sie unverarbeitete Einsamkeit im Nuju-Sprachjournal aus, um den Fluchtdruck abzubauen.",
      ],
      fr: [
        "Décodez le besoin sous-jacent : quelle validation ou tendresse votre personnage reçoit-il que vous vous refusez ?",
        "Protocole d'ancrage sensoriel 5-4-3-2-1 : touchez des matières réelles et verbalisez vos sensations physiques.",
        "Exprimez vos solitudes réelles dans le journal vocal Nuju pour réduire le besoin de refuge imaginaire."
      ],
      es: [
        "Descifra la necesidad oculta: ¿Qué validación, afecto o poder experimenta tu personaje que no tienes en tu día a día?",
        "Anclaje sensorial inmediato: siente los pies en el suelo y nombra en voz alta objetos físicos de tu entorno.",
        "Habla en el diario por voz de Nuju sobre tus frustraciones para drenar el impulso de huida mental."
      ]
    },
    badge: {
      en: "Compensatory Dreamer",
      id: "Pemimpi Kompensatori",
      de: "Kompensations-Träumer",
      fr: "Rêveur Compensatoire",
      es: "Soñador Compensatorio"
    }
  },
  {
    level: "elevated_compulsive",
    scoreRange: [26, 31],
    title: {
      en: "Elevated Compulsive Maladaptive Daydreaming",
      id: "Maladaptive Daydreaming Kompulsif Tinggi",
      de: "Fortgeschrittenes Zwanghaftes Tagträumen",
      fr: "Rêverie compulsive sévère & dissociation",
      es: "Ensoñación desadaptativa compulsiva elevada"
    },
    summary: {
      en: "Daydreaming has crossed into a compulsive behavioral addiction. You spend 3 to 5+ hours daily pacing, listening to music, and living in alternate timelines while real life unravels.",
      id: "Melamun telah bergeser menjadi kecanduan perilaku kompulsif. Anda menghabiskan 3 hingga 5+ jam sehari mondar-mandir dengan musik, hidup di dunia paralel sementara urusan nyata tertinggal.",
      de: "Ihr Tagträumen gleicht einer Verhaltenssucht. Sie verbringen täglich 3 bis 5+ Stunden mit Musik und Umhergehen in Parallelwelten, während der Alltag leidet.",
      fr: "Votre rêverie s'apparente à une véritable addiction comportementale (3 à 5h/jour) accompagnée de déambulations motrices au détriment de votre vie réelle.",
      es: "Tus ensoñaciones se han convertido en una adicción conductual compulsiva de más de 3 a 5 horas diarias, desatendiendo tus metas vitales."
    },
    neurobiology: {
      en: "The Default Mode Network (DMN) is chronically hyper-synchronized, while the Salience Network fails to prioritize external sensory input over internal simulated rewards.",
      id: "Default Mode Network (DMN) berada dalam kondisi hipersinkronisasi kronis, sementara Salience Network gagal memprioritaskan realitas fisik dibanding hadiah kimiawi fantasi.",
      de: "Chronische Überkopplung des DMN bei geschwächtem Salienz-Netzwerk: Die Fantasie übertrumpft sensorische Reize der Außenwelt.",
      fr: "Hyper-synchronisation chronique du DMN : le cerveau privilégie la récompense simulée interne aux stimuli réels du monde physique.",
      es: "Hipersincronización crónica del DMN; el cerebro prioriza la dopamina de la fantasía sobre la realidad externa."
    },
    actionProtocol: {
      en: [
        "Implement a 'Kinesthetic Interrupter': sit in public or shared spaces (libraries, living rooms) where pacing and gesturing are physically inhibited.",
        "Time-cap fantasy: use a loud kitchen timer set to 20 minutes; when it rings, step outside and feel the breeze immediately.",
        "Daily Nuju Reality Logging: spend 3 minutes each evening verbally recounting 3 concrete physical events that happened in real life today."
      ],
      id: [
        "Gunakan 'Penghambat Kinestetik': beraktivitaslah di ruang publik atau ruang bersama keluarga di mana mondar-mandir sulit dilakukan secara bebas.",
        "Batasi waktu dengan timer mekanik: atur alarm berbunyi kencang dalam 20 menit; saat berbunyi, segera melangkah keluar rumah menghirup udara segar.",
        "Catat realitas fisik harian di Nuju: luangkan 3 menit setiap malam untuk menceritakan 3 peristiwa konkret yang benar-benar terjadi di dunia nyata hari ini."
      ],
      de: [
        "Kinästhetische Barrieren: Verlegen Sie Arbeitsphasen in öffentliche Räume (Bibliotheken), wo das Umhergehen gehemmt wird.",
        "Strikter Timer: Maximal 20 Minuten erlaubte Fantasiezeit, danach sofortiger Raumwechsel an die frische Luft.",
        "Tägliches Realitäts-Logging in Nuju: Sprechen Sie abends 3 konkrete, reale Ereignisse des Tages laut ein."
      ],
      fr: [
        "Instaurez un frein moteur : travaillez dans des lieux publics (bibliothèques) pour bloquer les déambulations automatiques.",
        "Minuteur strict : plafonnez les sessions à 20 min avec une alarme sonore imposant une sortie physique dehors.",
        "Journal d'ancrage Nuju : enregistrez chaque soir 3 faits réels tangibles vécus dans la journée."
      ],
      es: [
        "Freno cinestésico: trabaja en espacios compartidos o bibliotecas donde no puedas caminar en círculos libremente.",
        "Temporizador estricto de 20 minutos: al sonar, levántate y sal al aire libre inmediatamente.",
        "Registro de realidad en Nuju: graba cada noche 3 hechos físicos concretos ocurridos en el mundo real."
      ]
    },
    badge: {
      en: "Compulsive Paracosmist",
      id: "Kompulsif Parakosmis",
      de: "Zwanghafter Parakosmist",
      fr: "Paracosmiste Compulsif",
      es: "Paracosmista Compulsivo"
    }
  },
  {
    level: "severe_maladaptive",
    scoreRange: [32, 36],
    title: {
      en: "Severe Clinical Maladaptive Daydreaming (MDS)",
      id: "Maladaptive Daydreaming Klinis Berat (MDS)",
      de: "Schweres klinisches maladaptives Tagträumen",
      fr: "Rêverie compulsive clinique invalidante",
      es: "Ensoñación desadaptativa clínica severa"
    },
    summary: {
      en: "Your internal fantasy universe has almost completely displaced physical reality. You suffer profound grief, shame, lost developmental milestones, and emotional paralysis when pulled into the real world.",
      id: "Dunia fantasi internal Anda telah hampir sepenuhnya menggantikan realitas fisik. Anda merasakan kepedihan mendalam, rasa bersalah, waktu hidup yang hilang, dan kepanikan saat dipaksa berinteraksi nyata.",
      de: "Ihre Traumwelt hat die Realität nahezu verdrängt. Sie leiden unter starker Scham, versäumten Lebensentscheidungen und Verzweiflung bei Konfrontation mit der Wirklichkeit.",
      fr: "Votre univers intérieur a supplanté votre vie matérielle. Vous traversez une détresse aiguë, une honte paralysante et un sentiment d'occasions perdues.",
      es: "Tu universo de fantasía ha desplazado casi por completo tu vida material. Experimentas culpa dolorosa, aislamiento y parálisis vital."
    },
    neurobiology: {
      en: "Dorsal vagal freeze and dissociative depersonalization blend with dopamine-dependent fantasy loops, functioning as a desperate defense against developmental trauma or extreme emotional pain.",
      id: "Kombinasi respons dorsal vagal freeze dan depersonalisasi berpadu dengan sirkuit kecanduan dopamin, menjadi mekanisme pertahanan terakhir sistem saraf dari luka trauma atau kepedihan hidup tak tertahankan.",
      de: "Verschmelzung von dorsalem Vagus-Freeze (Schutzstarre) und dopaminerger Traumflucht als letzter Schutzwall gegen unverarbeitete seelische Verletzungen.",
      fr: "Mélange de sidération dorsale vagale et de dépendance dopaminergique, servant de bouclier contre un traumatisme non résolu.",
      es: "Fusión de colapso vagal dorsal y adicción dopaminérgica como defensa biológica extrema ante traumas no procesados."
    },
    actionProtocol: {
      en: [
        "Professional Psychotherapy: Consult a licensed therapist specializing in dissociation, OCD, or trauma (IFS or Somatic Experiencing).",
        "Compassionate De-shaming: Recognize that your daydreams kept your younger self alive during seasons of unbearable isolation.",
        "Nuju Somatic Grounding Audio: Use Nuju's bilateral and grounding tools daily to safely re-inhabit your physical body."
      ],
      id: [
        "Konsultasi Profesional: Segera temui psikolog klinis atau psikiater berlisensi dengan spesialisasi trauma, OCD, atau disosiasi (IFS / Somatic Experiencing).",
        "Lepaskan Rasa Malu dengan Welas Asih: Pahami bahwa lamunan ini adalah strategi bertahan hidup luar biasa yang menyelamatkan jiwa Anda saat masih kecil dari rasa sepi ekstrem.",
        "Gunakan Audio Grounding Nuju: Dengarkan stimulasi bilateral dan latihan tubuh di Nuju setiap hari untuk melatih tubuh Anda kembali merasa aman di dunia nyata."
      ],
      de: [
        "Professionelle Begleitung: Suchen Sie einen approbierten Psychotherapeuten mit Schwerpunkt Trauma oder Dissoziation auf.",
        "Entschämung: Begreifen Sie das Tagträumen als früheres Überlebensprogramm, das Sie vor unerträglichem Schmerz bewahrt hat.",
        "Nuju Somatic Grounding: Nutzen Sie täglich bilaterale Audio-Tools in Nuju, um den physischen Körper wieder sicher zu bewohnen."
      ],
      fr: [
        "Accompagnement clinique : consultez un psychothérapeute spécialisé en dissociation, traumatismes ou TCC/EMDR.",
        "Déculpabilisation bienveillante : comprenez que ce refuge a protégé votre enfant intérieur de la solitude extrême.",
        "Ancrage corporel Nuju : pratiquez quotidiennement les exercices audio somatiques de Nuju pour réhabiter votre corps."
      ],
      es: [
        "Apoyo profesional: consulta con un psicólogo clínico especializado en trauma del desarrollo o disociación (EMDR/IFS).",
        "Autocompasión radical: comprende que tu fantasía fue el salvavidas biológico que protegió tu mente en el pasado.",
        "Anclaje diario en Nuju: utiliza los ejercicios somáticos y de respiración de Nuju para sentirte seguro en tu cuerpo físico."
      ]
    },
    badge: {
      en: "Severe MDS State",
      id: "Kondisi MDS Berat",
      de: "Schwerer MDS-Zustand",
      fr: "État MDS Sévère",
      es: "Estado MDS Severo"
    }
  }
];

export const MALADAPTIVE_DAYDREAMING_SUBSCALE_INFO = {
  kinesthetic_pacing: {
    name: {
      en: "Kinesthetic Movement & Pacing",
      id: "Gerakan Kinestetik & Mondar-mandir",
      de: "Körperliche Bewegung & Pacing",
      fr: "Mouvements Kinésthésiques & Déambulation",
      es: "Movimiento Cinestésico y Paseo"
    },
    description: {
      en: "Physical motor rituals: pacing circles, rocking, repetitive gestures, and whispered dialogues.",
      id: "Ritual motorik fisik: berjalan memutar, bergoyang, menggerakkan tangan, dan berbisik dialog fantasi.",
      de: "Motorische Begleiterscheinungen: Im Zimmer auf und ab gehen, Gestikulieren und leises Flüstern.",
      fr: "Automatismes moteurs : faire les cent pas, mimiques faciales et chuchotements involontaires.",
      es: "Rituales motores: caminar de un lado a otro, gesticular y murmurar diálogos en voz baja."
    }
  },
  paracosm_immersion: {
    name: {
      en: "Paracosm Immersion & Depth",
      id: "Kedalaman & Keterlibatan Parakosmis",
      de: "Parakosmos-Immersion & Bindung",
      fr: "Immersion & Attachement au Paracosme",
      es: "Inmersión y Apego al Paracosmos"
    },
    description: {
      en: "Elaborate multi-year story arcs, deep emotional attachment to characters, and looped music triggers.",
      id: "Alur cerita bersambung menahun, ikatan emosional mendalam dengan karakter, dan pemicu musik berulang.",
      de: "Komplexe Handlungsbögen, emotionale Bindung an Kunstfiguren und Musik als Katalysator.",
      fr: "Scénarios élaborés sur plusieurs années, lien affectif intense avec les personnages et dépendance à la musique.",
      es: "Tramas complejas de años, fuerte vínculo emocional con personajes ficticios y música en bucle."
    }
  },
  vocational_distress: {
    name: {
      en: "Vocational Impairment & Loss of Control",
      id: "Gangguan Fungsi Nyata & Hilang Kendali",
      de: "Alltagsbeeinträchtigung & Kontrollverlust",
      fr: "Altération Fonctionnelle & Perte de Contrôle",
      es: "Deterioro Funcional y Pérdida de Control"
    },
    description: {
      en: "Lost hours, neglected duties, distress when interrupted, and social withdrawal.",
      id: "Waktu terbuang, tugas terbengkalai, rasa kesal saat diinterupsi, dan isolasi sosial.",
      de: "Zeitverlust, vernachlässigte Pflichten, Reizbarkeit bei Störungen und sozialer Rückzug.",
      fr: "Heures perdues, tâches négligées, colère en cas d'interruption et isolement social.",
      es: "Horas perdidas, tareas descuidadas, frustración al ser interrumpido y aislamiento social."
    }
  }
};

export function getMaladaptiveDaydreamingResult(totalScore: number): MaladaptiveDaydreamingResultLevel {
  const matched = MALADAPTIVE_DAYDREAMING_RESULTS.find(
    (lvl) => totalScore >= lvl.scoreRange[0] && totalScore <= lvl.scoreRange[1]
  );
  return matched || MALADAPTIVE_DAYDREAMING_RESULTS[MALADAPTIVE_DAYDREAMING_RESULTS.length - 1];
}

export function calculateMaladaptiveDaydreamingSubscales(answers: Record<number, number>): {
  kinesthetic_pacing: number;
  paracosm_immersion: number;
  vocational_distress: number;
} {
  let kinesthetic_pacing = 0;
  let paracosm_immersion = 0;
  let vocational_distress = 0;

  MALADAPTIVE_DAYDREAMING_QUESTIONS.forEach((q) => {
    const val = answers[q.id] || 0;
    if (q.subscale === "kinesthetic_pacing") kinesthetic_pacing += val;
    if (q.subscale === "paracosm_immersion") paracosm_immersion += val;
    if (q.subscale === "vocational_distress") vocational_distress += val;
  });

  return { kinesthetic_pacing, paracosm_immersion, vocational_distress };
}
