export type DatingFatigueCardLang = "en" | "id" | "de" | "fr" | "es";

export interface DatingFatigueQuestion {
  id: number;
  subscale: "swipe_apathy" | "paradox_of_choice" | "rejection_desensitization";
  text: {
    en: string;
    id: string;
    de: string;
    fr: string;
    es: string;
  };
}

export interface DatingFatigueResultLevel {
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

export const DATING_FATIGUE_QUESTIONS: DatingFatigueQuestion[] = [
  // 1. Swipe Apathy & Algorithmic Burnout
  {
    id: 1,
    subscale: "swipe_apathy",
    text: {
      en: "Swiping on dating apps feels like a mechanical chore or factory work rather than an exciting opportunity to meet someone.",
      id: "Menggeser (swiping) di aplikasi kencan terasa seperti tugas mekanis atau kerja pabrik yang melelahkan daripada peluang seru bertemu seseorang.",
      de: "Das Wischen auf Dating-Apps fühlt sich wie mechanische Fließbandarbeit an und nicht wie eine freudige Gelegenheit, jemanden kennenzulernen.",
      fr: "Faire défiler les profils sur les applis ressemble à une corvée mécanique ou à du travail à la chaîne plutôt qu'à une rencontre excitante.",
      es: "Deslizar perfiles en apps de citas se siente como un trámite mecánico o trabajo de fábrica más que una ilusión romántica."
    }
  },
  {
    id: 2,
    subscale: "swipe_apathy",
    text: {
      en: "I dread the repetitive small talk ('How was your day?', 'What do you do?') and often let matches expire or go unanswered out of sheer exhaustion.",
      id: "Saya muak dengan basa-basi repetitif ('Kerja di mana?', 'Hari ini ngapain?') dan sering membiarkan obrolan basi begitu saja karena teramat lelah.",
      de: "Ich graue mich vor dem ewig gleichen Smalltalk ('Wie war dein Tag?', 'Was machst du so?') und lasse Matches aus reiner Erschöpfung verfallen.",
      fr: "J'ai la nausée des discussions superficielles répétitives ('Tu fais quoi dans la vie ?') et je laisse souvent les matchs sans réponse par épuisement.",
      es: "Me horroriza la charla superficial repetitiva ('¿A qué te dedicas?') y suelo dejar matches sin responder por pura pereza y fatiga."
    }
  },
  {
    id: 3,
    subscale: "swipe_apathy",
    text: {
      en: "Ghosting has become so normalized that I either expect everyone to disappear without warning or find myself ghosting others to avoid emotional effort.",
      id: "Ghosting sudah terasa sangat normal sampai saya selalu menduga orang lain akan mendadak hilang, atau saya sendiri yang ghosting demi hemat energi.",
      de: "Ghosting ist so alltäglich geworden, dass ich erwarte, dass jeder plötzlich verschwindet, oder ich ghoste selbst, um Kraft zu sparen.",
      fr: "Le ghosting est devenu si banal que j'anticipe la disparition de tout le monde ou je ghoste moi-même pour éviter tout effort émotionnel.",
      es: "El ghosting se ha vuelto tan común que asumo que todos desaparecerán o soy yo quien desaparece para evitar desgaste emocional."
    }
  },
  {
    id: 4,
    subscale: "swipe_apathy",
    text: {
      en: "After opening a dating app, I feel a hollow spike of dopamine followed immediately by feelings of emptiness, cynicism, and low self-worth.",
      id: "Setelah membuka aplikasi kencan, saya merasakan lonjakan dopamin sesaat yang langsung disusul rasa hampa, sinis, dan hilangnya harga diri.",
      de: "Nach dem Öffnen einer Dating-App spüre ich einen kurzen Dopamin-Kick, gefolgt von erdrückender Leere, Zynismus und Selbstzweifeln.",
      fr: "Ouvrir une appli m'apporte un pic de dopamine éphémère suivi aussitôt d'un sentiment de vide, de cynisme et d'autodépréciation.",
      es: "Al abrir una app de citas siento un pico fugaz de dopamina seguido de un vacío amargo, cinismo y baja autoestima."
    }
  },

  // 2. Paradox of Choice & Checklist Perfectionism
  {
    id: 5,
    subscale: "paradox_of_choice",
    text: {
      en: "Even when I meet someone genuinely kind, I catch myself wondering if someone taller, smarter, or more exciting is just one swipe away.",
      id: "Bahkan saat bertemu orang yang sangat baik, pikiran saya tetap tergoda: 'Mungkinkah ada yang lebih tinggi, pintar, atau seru di swipe berikutnya?'",
      de: "Selbst wenn ich jemanden treffe, der wirklich nett ist, frage ich mich, ob einen Wisch weiter nicht jemand noch Attraktiveres wartet.",
      fr: "Même face à une personne bienveillante, je ne peux m'empêcher de penser qu'un profil plus séduisant m'attend au prochain swipe.",
      es: "Incluso conociendo a alguien genial, me asalta la duda de si habrá alguien más alto, inteligente o fascinante a solo un deslizamiento."
    }
  },
  {
    id: 6,
    subscale: "paradox_of_choice",
    text: {
      en: "I evaluate potential romantic partners against a rigid checklist of height, career, hobbies, and music taste, rejecting people over tiny, trivial flaws.",
      id: "Saya menilai calon pasangan seperti mengecek kualifikasi kerja ketat (tinggi badan, selera musik, karir) dan mencoret mereka karena kekurangan sepele.",
      de: "Ich bewerte potenzielle Partner nach einer starren Checkliste (Größe, Beruf, Musik) und sortiere sie wegen kleinster Makel gnadenlos aus.",
      fr: "J'évalue mes rendez-vous selon une liste stricte de critères et je rejette les gens pour le moindre détail superficiel insignifiant.",
      es: "Paso a posibles parejas por un filtro implacable de requisitos (estatura, empleo, gustos) y descarto a personas por minucias ridículas."
    }
  },
  {
    id: 7,
    subscale: "paradox_of_choice",
    text: {
      en: "Having hundreds of potential matches paralyzes my ability to commit or invest deeply in any single connection.",
      id: "Memiliki ratusan kemungkinan match justru melumpuhkan kemampuan saya untuk berkomitmen atau berinvestasi serius pada satu orang.",
      de: "Hunderte Optionen lähmen mich so sehr, dass ich mich auf niemanden mehr voll einlassen oder festlegen kann.",
      fr: "Avoir des centaines de choix potentiels me paralyse et m'empêche de m'engager sincèrement envers une seule personne.",
      es: "Tener cientos de opciones potenciales paraliza mi capacidad de comprometerme o profundizar con alguien real."
    }
  },
  {
    id: 8,
    subscale: "paradox_of_choice",
    text: {
      en: "I feel addicted to the validation of getting new matches, but have zero real desire or energy to actually meet those matches in person.",
      id: "Saya merasa kecanduan validasi saat dapat match baru, tetapi tidak punya niat atau energi sama sekali untuk benar-benar kopi darat.",
      de: "Ich bin süchtig nach der Bestätigung neuer Matches, habe aber weder Energie noch Lust, diese Personen im echten Leben zu treffen.",
      fr: "Je suis accro à la validation de nouveaux matchs, mais je n'ai aucune énergie ni envie réelle de les rencontrer en vrai.",
      es: "Me engancha la validación de conseguir matches, pero no tengo ninguna energía ni ganas reales de quedar en persona."
    }
  },

  // 3. Rejection Desensitization & Commodification
  {
    id: 9,
    subscale: "rejection_desensitization",
    text: {
      en: "I feel like a commodity in a digital human meat market, where my worth is reduced to 3 curated photos and a witty bio.",
      id: "Saya merasa diperlakukan seperti barang dagangan di etalase manusia, di mana nilai diri saya direduksi menjadi 3 foto dan bio lucu.",
      de: "Ich fühle mich wie eine Ware auf einem digitalen Fleischmarkt, reduziert auf drei polierte Fotos und einen flotten Spruch.",
      fr: "J'ai l'impression d'être un produit sur un marché aux bestiaux virtuel, réduit(e) à trois photos retouchées et une phrase d'accroche.",
      es: "Me siento como mercancía en un escaparate humano digital, reducido/a a tres fotos seleccionadas y una frase ingeniosa."
    }
  },
  {
    id: 10,
    subscale: "rejection_desensitization",
    text: {
      en: "My capacity to feel butterflies, romantic curiosity, or genuine vulnerability has completely shut down to protect myself from disappointment.",
      id: "Kemampuan saya untuk merasa berdebar-debar, penasaran romantis, atau membuka kerentanan hati sudah mati demi melindungi diri dari patah hati.",
      de: "Meine Fähigkeit zu Schmetterlingen im Bauch oder ehrlicher Verletzlichkeit ist abgestorben, um mich vor Enttäuschung zu schützen.",
      fr: "Ma capacité à ressentir des papillons ou de la vulnérabilité s'est éteinte pour me protéger des déceptions continuelles.",
      es: "Mi capacidad de sentir mariposas en el estómago o mostrarme vulnerable se ha congelado para evitar más desilusiones."
    }
  },
  {
    id: 11,
    subscale: "rejection_desensitization",
    text: {
      en: "I view dates more like job interviews or audition rounds than organic human encounters, constantly bracing for sudden rejection or flakes.",
      id: "Saya memandang kencan lebih mirip wawancara kerja atau audisi ketimbang interaksi manusiawi, selalu waspada akan pembatalan mendadak.",
      de: "Ich erlebe Dates eher wie Vorstellungsgespräche als menschliche Begegnungen und rechne ständig mit plötzlicher Absage.",
      fr: "Je vis les rendez-vous comme des entretiens d'embauche froids plutôt que des rencontres, en redoutant une annulation de dernière minute.",
      es: "Veo las citas como entrevistas de trabajo frías más que encuentros humanos, anticipando siempre un plantón o rechazo repentino."
    }
  },
  {
    id: 12,
    subscale: "rejection_desensitization",
    text: {
      en: "I have caught myself believing that true love, romantic loyalty, and deep emotional safety no longer exist in the modern dating world.",
      id: "Saya mulai percaya bahwa cinta sejati, kesetiaan, dan rasa aman emosional yang mendalam sudah tidak ada lagi di dunia kencan modern.",
      de: "Ich ertappe mich bei dem Glauben, dass echte Treue, tiefe Liebe und emotionale Sicherheit in der modernen Dating-Welt ausgestorben sind.",
      fr: "Je me surprends à penser que le véritable amour, la fidélité et la sécurité émotionnelle n'existent plus dans notre époque.",
      es: "Me descubro creyendo que el amor auténtico, la lealtad y la seguridad emocional ya no existen en el mundo moderno de citas."
    }
  }
];

export const DATING_FATIGUE_OPTIONS = [
  {
    value: 0,
    label: {
      en: "Never / Completely Untrue",
      id: "Tidak Pernah / Sama Sekali Tidak Benar",
      de: "Nie / Trifft überhaupt nicht zu",
      fr: "Jamais / Pas du tout vrai",
      es: "Nunca / Totalmente falso"
    }
  },
  {
    value: 1,
    label: {
      en: "Rarely / Mildly True",
      id: "Jarang / Sedikit Benar",
      de: "Selten / Trifft kaum zu",
      fr: "Rarement / Plutôt faux",
      es: "Raras veces / Poco cierto"
    }
  },
  {
    value: 2,
    label: {
      en: "Sometimes / Noticeable Fatigue",
      id: "Kadang-kadang / Cukup Lelah",
      de: "Manchmal / Spürbare Müdigkeit",
      fr: "Parfois / Fatigue notable",
      es: "A veces / Fatiga perceptible"
    }
  },
  {
    value: 3,
    label: {
      en: "Often / Severe Burnout",
      id: "Sering / Kelelahan Berat",
      de: "Oft / Starke Erschöpfung",
      fr: "Souvent / Épuisement sévère",
      es: "A menudo / Desgaste severo"
    }
  },
  {
    value: 4,
    label: {
      en: "Constantly / Total Romantic Numbness",
      id: "Selalu / Mati Rasa Romantis Total",
      de: "Ständig / Vollständige emotionale Taubheit",
      fr: "En permanence / Anesthésie affective totale",
      es: "Constantemente / Entumecimiento romántico total"
    }
  }
];

export const DATING_FATIGUE_RESULTS: DatingFatigueResultLevel[] = [
  {
    level: "minimal",
    scoreRange: [0, 11],
    badge: {
      en: "Healthy Romantic Curiosity",
      id: "Rasa Penasaran Romantis Sehat",
      de: "Gesunde Beziehungsneugier",
      fr: "Curiosité Romantique Saine",
      es: "Curiosidad Romántica Saludable"
    },
    title: {
      en: "Resilient Dater: Intact Vulnerability & Clear Boundaries",
      id: "Pencari Jodoh Tangguh: Kerentanan Utuh & Batasan Jelas",
      de: "Resilienter Dater: Gesunde Grenzen & Offenheit",
      fr: "Séducteur Équilibré : Vulnérabilité Préservée & Limites Claires",
      es: "Citas Conscientes: Vulnerabilidad Intacta y Límites Claros"
    },
    summary: {
      en: "You have maintained a balanced, grounded perspective on modern dating. You treat apps as a minor supplemental tool rather than your sole source of validation. You do not suffer from the illusion of infinite choice and retain the emotional capacity to be curious and open with new connections.",
      id: "Kamu memiliki perspektif yang sehat dan realistis terhadap dunia kencan modern. Kamu menganggap aplikasi kencan hanya sebagai alat bantu sekunder, bukan sumber validasi harga diri. Kamu tidak terjebak ilusi pilihan tak terbatas dan masih mampu membuka hati secara tulus.",
      de: "Du bewahrst eine gesunde Distanz zu Dating-Apps. Du nutzt sie als Ergänzung, nicht als Hauptquelle für Selbstwert. Die Illusion unendlicher Auswahl lähmt dich nicht, und deine Fähigkeit zu echter Nähe ist vollständig intakt.",
      fr: "Vous gardez une distance saine vis-à-vis des applis de rencontre. Elles ne sont qu'un outil d'appoint et non une validation narcissique. Votre ouverture à l'autre et votre authenticité sont parfaitement préservées.",
      es: "Mantienes una perspectiva equilibrada ante las citas modernas. Usas las aplicaciones como un simple complemento sin depender de su validación. Tu capacidad de conectar con sinceridad y vulnerabilidad permanece intacta."
    },
    neurobiology: {
      en: "Your dopamine reward pathways remain balanced; you do not experience the compulsive 'variable-reward slot machine' swiping loop. Your prefrontal cortex easily regulates dating expectations, and attachment security remains high.",
      id: "Jalur dopamin otakmu tetap seimbang; kamu tidak terjebak adiksi 'mesin judi jackpot' dalam menggeser profil. Korteks prefrontalmu mampu mengelola ekspektasi kencan dengan matang tanpa cemas berlebihan.",
      de: "Deine Dopamin-Schaltkreise sind stabil und nicht von der Slot-Machine-Mechanik des Wischens gekapert. Dein präfrontaler Kortex steuert Erwartungen gelassen, und dein Bindungssystem bleibt sicher.",
      fr: "Vos circuits dopaminergiques ne sont pas asservis au mécanisme de roulette des applis. Votre cortex préfrontal régule sereinement vos attentes sans déclencher d'anxiété d'attachement.",
      es: "Tus circuitos de dopamina se mantienen estables, inmunes a la trampa de recompensa intermitente de las pantallas. Tu corteza prefrontal modula las expectativas con calma y apego seguro."
    },
    actionProtocol: {
      en: [
        "Preserve in-person serendipity: Keep meeting people through hobby clubs, sports, and friends' gatherings.",
        "Set a 20-minute daily app cap: Never swipe mindlessly out of boredom or late-night loneliness.",
        "Move to voice or coffee quickly: Do not engage in multi-week text marathons that build false fantasy projections."
      ],
      id: [
        "Jaga perjumpaan langsung (offline): Tetap temui orang baru lewat hobi, komunitas, atau lingkaran pertemanan nyata.",
        "Batasi aplikasi maksimal 20 menit sehari: Jangan pernah swiping tanpa sadar hanya karena bosan di larut malam.",
        "Ajak voice note atau kopi darat lebih awal: Hindari chatting berminggu-minggu yang hanya membangun fantasi semu."
      ],
      de: [
        "Reale Begegnungen pflegen: Lerne Menschen über Hobbys, Sport und Freundeskreise im echten Leben kennen.",
        "20-Minuten-App-Limit setzen: Wische niemals aus purer Langeweile oder nächtlicher Einsamkeit.",
        "Schnell zum Telefonat oder Kaffee übergehen: Endlose Chat-Marathons erzeugen nur trügerische Phantasien."
      ],
      fr: [
        "Privilégiez les rencontres réelles : Pratiquez des activités et voyez des gens en dehors des écrans.",
        "Fixez une limite de 20 minutes par jour : Ne swipez jamais par ennui nocturne ou automatisme.",
        "Passez rapidement au réel ou à la voix : Évitez les semaines de textos qui fabriquent des illusions."
      ],
      es: [
        "Fomenta los encuentros en persona: Apúntate a talleres, deportes o eventos sociales reales.",
        "Límite diario de 20 minutos: No deslices por puro aburrimiento o soledad a altas horas de la noche.",
        "Pasa a la voz o al café pronto: Evita semanas de mensajes de texto que crean expectativas irreales."
      ]
    }
  },
  {
    level: "mild",
    scoreRange: [12, 23],
    badge: {
      en: "Early Swipe Fatigue",
      id: "Kelelahan Swiping Dini",
      de: "Beginnende Swipe-Müdigkeit",
      fr: "Fatigue Initiale des Écrans",
      es: "Fatiga Inicial de Pantalla"
    },
    title: {
      en: "Mild App Weariness: Small-Talk Irritation & Checklist Creep",
      id: "Keletihan Kencan Ringan: Bosan Basa-Basi & Mulai Memilih-Milih",
      de: "Leichte Dating-Müdigkeit: Smalltalk-Genervtheit & wachsende Ansprüche",
      fr: "Lassitude Modérée : Agacement du Small Talk & Critères Rigides",
      es: "Desgaste Leve: Fastidio de la Charla Trivial y Criterios Rígidos"
    },
    summary: {
      en: "You are beginning to feel the friction of modern app dynamics. Repetitive texting feels stale, ghosting causes slight irritation, and you occasionally dismiss interesting people over minor preferences. Your romantic enthusiasm is dipping, but your core faith in relationships is still intact.",
      id: "Kamu mulai merasakan gesekan dari dinamika aplikasi kencan. Percakapan chat terasa basi dan membosankan, ghosting mulai mengesalkan, dan kamu sesekali mencoret orang karena hal-hal sepele. Semangat kencanmu mulai menurun, meski keyakinanmu pada cinta belum padam.",
      de: "Du spürst die ersten Reibungsverluste des digitalen Datings. Wiederholter Smalltalk nervt, Ghosting frustriert dich, und du ertappst dich dabei, Menschen wegen Kleinigkeiten wegzuklicken. Deine Freude am Kennenlernen bröckelt leicht.",
      fr: "Vous commencez à ressentir l'usure des échanges numériques. Le bavardage répétitif vous lasse, les disparitions soudaines vous irritent et vous rejetez des profils pour des détails mineurs. Votre enthousiasme s'effrite.",
      es: "Empiezas a notar el desgaste del juego digital. La charla repetitiva te aburre, las desapariciones te irritan y comienzas a descartar candidatos por pequeñeces. Tu entusiasmo decae, aunque aún crees en el amor."
    },
    neurobiology: {
      en: "Mild habituation of the nucleus accumbens dopamine response. The brain is adapting to superficial visual stimuli, requiring higher novelty to feel excited about a match.",
      id: "Habituasi ringan pada respons dopamin nucleus accumbens. Otak mulai terbiasa dengan rangsangan visual dangkal, sehingga butuh hal yang semakin baru dan heboh agar bisa merasa antusias.",
      de: "Leichte Abstumpfung des Belohnungszentrums im Nucleus accumbens. Das Gehirn gewöhnt sich an oberflächliche Reize und verlangt immer mehr Neuartigkeit, um noch Faszination zu empfinden.",
      fr: "Début d'accoutumance dopaminergique dans le noyau accumbens. Votre cerveau s'habitue aux stimuli superficiels et exige plus de nouveauté pour s'enthousiasmer.",
      es: "Leve habituación dopaminérgica en el núcleo accumbens. El cerebro se acostumbra a los estímulos visuales rápidos y exige mayor novedad para ilusionarse."
    },
    actionProtocol: {
      en: [
        "Take a 14-day app holiday: Uninstall all dating apps to reset your baseline dopamine sensitivity.",
        "Enforce the 'Rule of Three': Limit active conversations to a maximum of 3 matches at any given time.",
        "Eliminate checklist thinking: Look for emotional safety, curiosity, and shared values rather than resume optimization."
      ],
      id: [
        "Ambil cuti aplikasi selama 14 hari: Hapus semua aplikasi kencan sementara untuk me-reset sensitivitas dopamin.",
        "Terapkan 'Aturan Tiga Orang': Batasi obrolan aktif maksimal 3 match dalam satu waktu.",
        "Hilangkan pola pikir seleksi ketat: Cari rasa aman emosional, kecocokan nilai, dan ketulusan daripada spek fisik semata."
      ],
      de: [
        "14 Tage App-Pause einlegen: Lösche alle Dating-Apps vorübergehend, um deinen Dopaminspiegel zu normalisieren.",
        "Die Dreier-Regel anwenden: Führe maximal 3 Chats gleichzeitig, um kognitive Überlastung zu verhindern.",
        "Weg von der Kriterienliste: Achte auf emotionale Reife, Wärme und gemeinsame Werte statt oberflächliche Attribute."
      ],
      fr: [
        "Faites une pause de 14 jours : Désinstallez les applications pour réinitialiser vos récepteurs de dopamine.",
        "Adoptez la règle des trois : Ne discutez jamais avec plus de 3 personnes en même temps.",
        "Abandonnez la check-list : Privilégiez la sécurité émotionnelle et la curiosité mutuelle plutôt que le statut."
      ],
      es: [
        "Tómate 14 días de desintoxicación: Desinstala las apps para resetear tu sensibilidad a la dopamina.",
        "Aplica la regla de tres: Mantén conversaciones activas con un máximo de 3 personas a la vez.",
        "Olvida la lista de la compra: Busca calidez, madurez emocional y valores en común antes que perfiles idílicos."
      ]
    }
  },
  {
    level: "moderate",
    scoreRange: [24, 35],
    badge: {
      en: "Dating App Burnout",
      id: "Burnout Aplikasi Kencan",
      de: "Dating-App-Burnout",
      fr: "Burn-out Romantique Numérique",
      es: "Burnout de Citas Digitales"
    },
    title: {
      en: "The Paradox of Choice Paralysis: Superficial Matches & Chronic Emptiness",
      id: "Kelumpuhan Paradoks Pilihan: Match Dangkal & Rasa Hampa Kronis",
      de: "Lähmung der Auswahlfülle: Oberflächliche Matches & innere Leere",
      fr: "Paralysie du Choix : Rencontres Jetables & Vide Affectif",
      es: "Parálisis por Exceso de Opción: Conexiones Efímeras y Vacío"
    },
    summary: {
      en: "You are experiencing profound dating app fatigue. The illusion of infinite options has infected your mindset: you constantly wonder if someone better is around the corner, yet every date feels like a sterile interview. You collect matches for ego validation without intending to meet, and ghosting has become a reflexive defense mechanism.",
      id: "Kamu mengalami kelelahan mendalam akibat aplikasi kencan. Ilusi pilihan tanpa batas telah meracuni pola pikirmu: kamu selalu bertanya-tanya apakah ada yang lebih baik di swipe berikutnya, padahal setiap kencan terasa hambar seperti wawancara kerja. Kamu menimbun match hanya demi validasi ego tanpa niat bertemu nyata.",
      de: "Du steckst im handfesten Dating-Burnout. Die Illusion unbegrenzter Optionen blockiert dich: Du fragst dich ständig, ob nicht jemand noch Besseres wartet, doch jedes Date wirkt steril und anstrengend. Du sammelst Matches nur noch als Ego-Booster, ohne echte Treffen zu beabsichtigen.",
      fr: "Vous êtes en plein burn-out des applications. L'illusion d'une infinité de partenaires pollue votre esprit : vous doutez en permanence tout en trouvant chaque rencard insipide. Vous collectionnez les matchs pour flatter votre ego sans intention de vous investir.",
      es: "Sufres un agotamiento agudo por aplicaciones. La trampa de las opciones infinitas te impide conectar: buscas siempre a alguien 'mejor' pero cada cita te parece un trámite frío. Acumulas matches solo por ego y el ghosting se ha vuelto tu escudo habitual."
    },
    neurobiology: {
      en: "Dopamine receptor downregulation in the reward system caused by intermittent algorithmic reinforcement. The anterior cingulate cortex registers chronic social rejection and micro-betrayals, triggering emotional numbing and defensive cynicism.",
      id: "Penurunan reseptor dopamin akibat manipulasi algoritma variable-ratio reward. Korteks cingulate anterior merekam penolakan sosial dan micro-betrayals berulang, memicu mati rasa emosional dan sikap sinis defensif.",
      de: "Herunterregulierung der Dopamin-Rezeptoren durch intermittierende Algorithmus-Belohnung. Das anteriore Cingulum speichert wiederholte Mikro-Zurückweisungen ab, was zu zynischem Selbstschutz und emotionaler Abflachung führt.",
      fr: "Désensibilisation des récepteurs dopaminergiques liée au renforcement aléatoire des algorithmes. Le cortex cingulaire antérieur accumule les micro-rejets et active une anesthésie affective défensive.",
      es: "Desensibilización de receptores de dopamina provocada por los algoritmos de refuerzo intermitente. La corteza cingulada anterior acumula micro-rechazos, activando el cinismo defensivo."
    },
    actionProtocol: {
      en: [
        "Delete all dating apps for 30 full days: Reclaim your evening mental space and break the swiping loop.",
        "Transition to slow dating: If you return, use only one app, swipe no more than 10 profiles a day, and read entire bios.",
        "Use private voice journaling: Speak your dating grief, loneliness, and boundary needs into Nuju's encrypted audio safe each night."
      ],
      id: [
        "Hapus semua aplikasi kencan selama 30 hari penuh: Rebut kembali ketenangan malammu dan putus kebiasaan swiping.",
        "Beralih ke 'Slow Dating': Jika kembali, gunakan hanya 1 aplikasi, geser maksimal 10 profil per hari, dan baca biodata secara utuh.",
        "Gunakan jurnal suara terenkripsi: Ungkapkan rasa sepi, kekecewaan kencan, dan batasan hatimu di ruang privat Nuju setiap malam."
      ],
      de: [
        "30 Tage vollständiger App-Entzug: Lösche alle Apps, um den Zwang des endlosen Wischens zu durchbrechen.",
        "Slow-Dating praktizieren: Falls du zurückkehrst, nutze nur eine App und schaue dir maximal 10 Profile pro Tag aufmerksam an.",
        "Verschlüsseltes Sprachtagebuch nutzen: Entlade Enttäuschungen und Frust im sicheren Audiotresor von Nuju."
      ],
      fr: [
        "Supprimez les applications pendant 30 jours : Libérez vos soirées et brisez le réflexe pavlovien de l'écran.",
        "Passez au slow dating : À votre retour, n'utilisez qu'une seule appli et limitez-vous à 10 profils lus attentivement par jour.",
        "Tenez un journal vocal sécurisé : Déposez vos désillusions et votre fatigue amoureuse dans le sanctuaire chiffré de Nuju."
      ],
      es: [
        "Elimina las apps durante 30 días seguidos: Recupera tu tiempo mental y desactiva el automatismo de deslizar.",
        "Practica el 'slow dating': Si regresas, usa una sola aplicación y revisa con calma un máximo de 10 perfiles al día.",
        "Desahógate en privado: Graba tu frustración romántica y tus necesidades reales en el diario de voz encriptado de Nuju."
      ]
    }
  },
  {
    level: "severe",
    scoreRange: [36, 48],
    badge: {
      en: "Romantic Numbness & Cynicism",
      id: "Mati Rasa & Sinisme Romantis Akut",
      de: "Emotionale Abstumpfung & Beziehungs-Zynismus",
      fr: "Anesthésie Affective & Cynisme Sévère",
      es: "Cinismo Romántico y Anestesia Emocional"
    },
    title: {
      en: "Chronic Commodification Trauma: Severe Desensitization & Faith Collapse",
      id: "Trauma Komodifikasi Digital: Kehilangan Total Keyakinan pada Cinta",
      de: "Totales Beziehungs-Burnout: Tiefer Zynismus & Verlust des Glaubens an Liebe",
      fr: "Épuisement Relationnel Majeur : Perte Totale de Foi en l'Amour",
      es: "Colapso Romántico Total: Desesperanza y Deshumanización en Citas"
    },
    summary: {
      en: "Your nervous system has completely shut down romantic curiosity to protect you from chronic commodification, ghosting, and superficial judgment. You view dating as a dehumanizing meat market where people are disposable items. You feel deeply lonely, yet the mere thought of a first date induces exhaustion, dread, and bitter cynicism.",
      id: "Sistem sarafmu telah mematikan rasa penasaran romantis untuk melindungimu dari rasa terbuang, di-ghosting, dan penghakiman dangkal. Kamu memandang kencan sebagai pasar daging yang merendahkan martabat di mana manusia dianggap barang sekali pakai. Kamu merasa sangat kesepian, tetapi memikirkan kencan pertama saja sudah memicu mual, lelah, dan sinisme pahit.",
      de: "Dein Nervensystem hat die Fähigkeit zu romantischer Zuversicht komplett abgeschaltet, um dich vor Entmenschlichung und permanenter Entwertung zu schützen. Du erlebst Dating als toxischen Marktplatz, auf dem Menschen austauschbare Konsumgüter sind. Du bist einsam, doch der Gedanke an ein Treffen erzeugt nur Widerwillen und Erschöpfung.",
      fr: "Votre système nerveux a verrouillé toute sensibilité amoureuse pour vous préserver de la réification permanente. Vous percevez les rencontres comme un supermarché froid où les êtres sont jetables. Vous souffrez de solitude, mais l'idée même d'un premier rendez-vous vous inspire dégoût et lassitude.",
      es: "Tu sistema nervioso ha apagado cualquier ilusión para resguardarte de la deshumanización y el rechazo constante. Sientes que las citas son un mercado donde las personas son desechables. Sufres de soledad profunda, pero la idea de tener una primera cita te produce pavor y agotamiento absoluto."
    },
    neurobiology: {
      en: "Severe allostatic overload and dorsal vagal shutdown in relational contexts. The amygdala and insular cortex interpret romantic vulnerability as an imminent threat of rejection, reflexively triggering defensive detachment and dissociation.",
      id: "Beban alostatik parah dan penonaktifan vagal dorsal dalam konteks relasional. Amigdala dan korteks insular menganggap kerentanan cinta sebagai ancaman penolakan menyakitkan, sehingga otomatis memicu sikap dingin, mati rasa, dan disosiasi.",
      de: "Schwere allostatische Überlastung und dorsale Vagus-Erstarrung bei Beziehungsthemen. Das Gehirn stuft romantische Nähe als Bedrohung ein und schützt sich durch emotionale Abspaltung und Dissoziation.",
      fr: "Surcharge allostatique majeure et sidération vagale dorsale face à l'intimité. Votre cerveau interprète l'ouverture du cœur comme un danger imminent et déclenche un détachement protecteur.",
      es: "Sobrecarga alostática severa y colapso vagal dorsal ante la intimité. Tu cerebro cataloga el afecto como un peligro inminente, activando el distanciamiento defensivo y la anestesia afectiva."
    },
    actionProtocol: {
      en: [
        "Total indefinite app boycott: Step out of the digital meat market immediately for at least 3-6 months.",
        "Radical self-friendship and somatic healing: Invest heavily in non-romantic intimacy—deep friendships, family, community, and pets.",
        "Confidential audio therapy sanctuary: Unload your bitterest romantic grief and rage in Nuju every night without fear of being judged as 'too cynical'."
      ],
      id: [
        "Boikot aplikasi kencan tanpa batas waktu: Segera keluar dari pasar digital ini setidaknya selama 3-6 bulan.",
        "Penyembuhan somatik & persahabatan sejati: Alihkan energimu ke keintiman non-romantis—sahabat sejati, keluarga, komunitas hobi, dan hewan peliharaan.",
        "Sanctuary audio privat di Nuju: Tumpahkan kepedihan, kemarahan, dan air matamu di jurnal suara Nuju yang terenkripsi agar nuranimu pulih kembali."
      ],
      de: [
        "Dauerhafter Ausstieg aus Dating-Apps: Verlasse den digitalen Markt für mindestens 3 bis 6 Monate vollständig.",
        "Fokus auf echte platonische Bindungen: Investiere in tiefe Freundschaften, Familie und echte Gemeinschaft ohne Balzverhalten.",
        "Sichere Seelenhygiene mit Nuju: Sprich deinen Zorn und deine Enttäuschung im verschlüsselten Sprachtagebuch Nuju aus, um die emotionale Erstarrung zu lösen."
      ],
      fr: [
        "Boycott total et indéfini des applis : Quittez ce supermarché déshumanisant pour au moins 3 à 6 mois.",
        "Reconnexion aux amitiés véritables : Réinvestissez dans des liens fraternels, la famille et des passions sincères.",
        "Sanctuaire vocal chez Nuju : Confiez votre chagrin et votre désillusion au journal vocal chiffré de Nuju pour guérir sans filtre."
      ],
      es: [
        "Desconexión total e indefinida: Sal de las aplicaciones de inmediato durante al menos 3 a 6 meses.",
        "Prioriza afectos genuinos: Invierte tu energía en amistades íntimas, familia y comunidad sin presiones románticas.",
        "Sanación vocal en Nuju: Descarga el rencor, el desencanto y la tristeza en el diario de voz privado de Nuju para devolverle la paz a tu corazón."
      ]
    }
  }
];

export const DATING_FATIGUE_SUBSCALE_INFO = {
  swipe_apathy: {
    name: {
      en: "Swipe Apathy & Algorithmic Burnout",
      id: "Apatis Swiping & Burnout Algoritma",
      de: "Swipe-Apathie & Algorithmus-Burnout",
      fr: "Apathie du Swipe & Épuisement Numérique",
      es: "Apatía de Deslizamiento y Burnout Algorítmico"
    },
    description: {
      en: "Mechanical scrolling, dread of repetitive small talk, normalized ghosting, and post-swiping emptiness.",
      id: "Menggeser otomatis tanpa rasa, muak obrolan basa-basi, memaklumi ghosting, dan merasa hampa setelah buka aplikasi.",
      de: "Mechanisches Weiterscrollen, Abscheu vor repetitivem Smalltalk, Gewöhnung an Ghosting und innere Leere.",
      fr: "Défilement automatique dénué d'émotion, dégoût des banalités, banalisation du ghosting et vide intérieur.",
      es: "Deslizamiento maquinal, aversión a la charla superficial, aceptación del ghosting y sensación de vacío tras cerrar la app."
    }
  },
  paradox_of_choice: {
    name: {
      en: "Paradox of Choice & Checklist Paralysis",
      id: "Paradoks Pilihan & Kelumpuhan Kriteria",
      de: "Paradoxon der Auswahl & Kriterien-Lähmung",
      fr: "Paradoxe du Choix & Paralysie des Critères",
      es: "Paradoja de la Elección y Parálisis de Criterios"
    },
    description: {
      en: "The illusion that 'someone better is one swipe away', chronic doubt, rigid checklists, and collecting matches without meeting.",
      id: "Ilusi bahwa selalu ada yang lebih baik di swipe berikutnya, keraguan kronis, kriteria kaku, dan menimbun match tanpa kopi darat.",
      de: "Die trügerische Hoffnung auf etwas Besseres gleich um die Ecke, starre Checklisten und Matchen ohne Treffen.",
      fr: "L'illusion permanente d'un profil parfait, le doute maladif, les critères inflexibles et l'accumulation de matchs stériles.",
      es: "La fantasía de que el amor perfecto está a un swipe, listas imposibles de requisitos y acumulación de matches sin citas reales."
    }
  },
  rejection_desensitization: {
    name: {
      en: "Rejection Desensitization & Commodification",
      id: "Mati Rasa Penolakan & Komodifikasi Manusia",
      de: "Abstumpfung gegen Ablehnung & Warengesellschaft",
      fr: "Insensibilisation au Rejet & Réification",
      es: "Insensibilidad al Rechazo y Deshumanización"
    },
    description: {
      en: "Feeling like a supermarket commodity, numbness to butterflies and vulnerability, treating dates like interviews, and loss of faith in love.",
      id: "Merasa seperti barang etalase murah, kehilangan rasa berdebar dan kerentanan hati, menganggap kencan seperti wawancara kerja, dan hilangnya iman pada cinta.",
      de: "Gefühl der Entwertung zur Handelsware, Unfähigkeit zu romantischer Faszination, Interview-Atmosphäre bei Dates und Verlust des Glaubens an Treue.",
      fr: "Sentiment d'être un produit jetable, incapacité à ressentir l'étincelle, rendez-vous vécus comme des entretiens et méfiance absolue.",
      es: "Sensación de ser mercancía de escaparate, imposibilidad de ilusionarse, citas vividas como exámenes y desconfianza en el amor."
    }
  }
};

export function getDatingFatigueResult(totalScore: number): DatingFatigueResultLevel {
  const matched = DATING_FATIGUE_RESULTS.find(
    (lvl) => totalScore >= lvl.scoreRange[0] && totalScore <= lvl.scoreRange[1]
  );
  return matched || DATING_FATIGUE_RESULTS[DATING_FATIGUE_RESULTS.length - 1];
}

export function calculateDatingFatigueSubscales(answers: Record<number, number>): {
  swipe_apathy: number;
  paradox_of_choice: number;
  rejection_desensitization: number;
} {
  let swipe_apathy = 0;
  let paradox_of_choice = 0;
  let rejection_desensitization = 0;

  DATING_FATIGUE_QUESTIONS.forEach((q) => {
    const val = answers[q.id] || 0;
    if (q.subscale === "swipe_apathy") swipe_apathy += val;
    if (q.subscale === "paradox_of_choice") paradox_of_choice += val;
    if (q.subscale === "rejection_desensitization") rejection_desensitization += val;
  });

  return { swipe_apathy, paradox_of_choice, rejection_desensitization };
}
