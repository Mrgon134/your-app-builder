export type StonewallingCardLang = "en" | "id" | "de" | "fr" | "es";

export interface StonewallingQuestion {
  id: number;
  subscale: "autonomic_flooding" | "shutdown_and_withdrawal" | "punitive_silence";
  text: {
    en: string;
    id: string;
    de: string;
    fr: string;
    es: string;
  };
}

export interface StonewallingResultLevel {
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

export const STONEWALLING_QUESTIONS: StonewallingQuestion[] = [
  // 1. Autonomic Flooding (Physiological Overwhelm / Heart Rate > 100 BPM)
  {
    id: 1,
    subscale: "autonomic_flooding",
    text: {
      en: "During heated arguments, my heart pounds violently in my chest or ears, my chest tightens, and I feel physically attacked or trapped.",
      id: "Saat perdebatan memanas, jantung saya berdegup kencang hingga terdengar di telinga, dada sesak, dan saya merasa diserang secara fisik atau terpojok.",
      de: "Bei hitzigen Streitigkeiten rast mein Herz spürbar bis in die Ohren, meine Brust schnürt sich zu und ich fühle mich körperlich bedrängt.",
      fr: "Lors des disputes vives, mon cœur bat la chamade dans mes tempes, ma poitrine se serre et je me sens agressé(e) ou acculé(e).",
      es: "Durante discusiones acaloradas, mi corazón late con fuerza en el pecho y los oídos, se me oprime el pecho y me siento acorralado."
    }
  },
  {
    id: 2,
    subscale: "autonomic_flooding",
    text: {
      en: "When relationship conflict arises, my brain suffers from sensory cognitive overload where words blur together and I literally cannot think straight.",
      id: "Saat konflik hubungan muncul, otak saya mengalami overload sensorik kognitif di mana kata-kata pasangan terdengar kabur dan saya tak mampu berpikir jernih.",
      de: "Bei Beziehungskonflikten leide ich unter kognitiver Überlastung: Worte verschwimmen und ich kann buchstäblich keinen klaren Gedanken fassen.",
      fr: "En situation de conflit, mon cerveau subit une surcharge cognitive : les mots de l'autre se brouillent et je perds toute capacité de raisonnement.",
      es: "Ante un conflicto de pareja, mi mente sufre sobrecarga sensorial: las palabras se vuelven un ruido borroso y me cuesta articular pensamientos."
    }
  },
  {
    id: 3,
    subscale: "autonomic_flooding",
    text: {
      en: "I experience intense physical urges to flee the room, slam a door, put on headphones, or disappear just to stop the unbearable nervous stimulation.",
      id: "Saya merasakan dorongan fisik yang sangat kuat untuk kabur dari ruangan, membanting pintu, memakai earphone, atau menghilang demi menghentikan stimulasi saraf yang menyiksa.",
      de: "Ich spüre den drängenden Impuls, den Raum zu verlassen, Türen zuzuschlagen oder Kopfhörer aufzusetzen, um den Reizüberfluss zu stoppen.",
      fr: "J'éprouve le besoin irrépressible de fuir la pièce, de claquer la porte ou de mettre un casque pour couper court à cette tempête sensorielle.",
      es: "Siento un impulso físico urgente de salir corriendo de la habitación, cerrar la puerta o ponerme auriculares para frenar la saturación."
    }
  },
  {
    id: 4,
    subscale: "autonomic_flooding",
    text: {
      en: "Even after the argument stops, my body remains in a wired, jittery, or exhausted shock state for hours, unable to relax or soften.",
      id: "Bahkan setelah perdebatan reda, tubuh saya tetap dalam kondisi syok tegang, gelisah, atau lemas selama berjam-jam, sulit untuk rileks kembali.",
      de: "Selbst wenn der Streit vorbei ist, bleibt mein Körper stundenlang unter Strom, zittrig oder völlig erschöpft gefangen.",
      fr: "Même une fois la dispute close, mon organisme reste figé en état de choc ou de tension nerveuse pendant des heures.",
      es: "Incluso cuando la discusión termina, mi cuerpo permanece en alerta tensa, tembloroso o agotado durante horas, incapaz de aflojarse."
    }
  },

  // 2. Shutdown and Emotional Withdrawal (The Stone Wall)
  {
    id: 5,
    subscale: "shutdown_and_withdrawal",
    text: {
      en: "When my partner brings up an emotional complaint, I turn into a 'stone wall'—blank stare, frozen face, avoiding eye contact, and showing zero emotional reaction.",
      id: "Ketika pasangan mengeluhkan masalah emosional, saya mendadak menjadi 'dinding batu'—tatapan kosong, wajah membeku, menghindari kontak mata, dan tanpa reaksi emosi.",
      de: "Wenn mein Partner Probleme anspricht, verwandle ich mich in eine 'Steinmauer': leerer Blick, starre Mimik, kein Blickkontakt und null Reaktion.",
      fr: "Dès que mon/ma partenaire exprime un reproche, je me transforme en 'mur de pierre' : regard vide, visage impassible et aucune réaction affective.",
      es: "Cuando mi pareja saca un tema conflictivo, me convierto en un 'muro de piedra': mirada fija, rostro inexpresivo, sin contacto visual y sin respuesta."
    }
  },
  {
    id: 6,
    subscale: "shutdown_and_withdrawal",
    text: {
      en: "I give terse one-syllable responses ('Fine', 'Whatever', 'Sure', 'Nothing') or go completely mute, refusing to respond to direct questions.",
      id: "Saya hanya menjawab dengan satu kata ketus ('Terserah', 'Ya', 'Bebas', 'Nggak apa-apa') atau membisu total, menolak merespons pertanyaan langsung.",
      de: "Ich antworte einsilbig und abweisend ('Gut', 'Egal', 'Passt schon') oder verstumme vollkommen, unfähig auf Fragen einzugehen.",
      fr: "Je réponds par des monosyllabes glacials ('Bien', 'Peu importe', 'Si tu veux') ou deviens totalement muet(te), refusant d'échanger.",
      es: "Respondo con monosílabos secos ('Bien', 'Como quieras', 'Nada') o me quedo completamente mudo, negándome a contestar."
    }
  },
  {
    id: 7,
    subscale: "shutdown_and_withdrawal",
    text: {
      en: "I mentally check out or dissociate while my partner is talking, staring through them while thinking about work, games, or plans to escape.",
      id: "Pikiran saya terputus atau disosiasi saat pasangan berbicara; saya menatap kosong menembusnya sambil memikirkan pekerjaan, game, atau cara kabur.",
      de: "Ich schalte innerlich völlig ab, während mein Partner spricht, starre durch ihn hindurch und flüchte in Gedanken an Arbeit oder Hobbys.",
      fr: "Je me déconnecte mentalement (dissociation) pendant que l'autre parle, le/la fixant sans l'écouter en pensant au travail ou à une échappatoire.",
      es: "Me desconecto mentalmente mientras mi pareja habla, mirando a través de ella y refugiándome en pensamientos de trabajo o evasión."
    }
  },
  {
    id: 8,
    subscale: "shutdown_and_withdrawal",
    text: {
      en: "I walk away, leave the house, or retreat behind a locked door without communicating when I will return or how long I need to cool down.",
      id: "Saya pergi meninggalkan rumah, keluar kamar, atau mengunci diri di balik pintu tanpa memberi tahu kapan saya akan kembali atau berapa lama saya butuh jeda.",
      de: "Ich verlasse die Wohnung oder ziehe mich hinter eine verschlossene Tür zurück, ohne mitzuteilen, wann ich wieder ansprechbar bin.",
      fr: "Je quitte la maison ou m'enferme à clé sans indiquer quand je reviendrai ni de combien de temps j'ai besoin pour redescendre.",
      es: "Me voy de la casa o me encierro tras una puerta sin avisar de cuándo volveré ni cuánto tiempo necesito para calmarme."
    }
  },

  // 3. Punitive Silence & Manipulation (The Cold Silent Treatment)
  {
    id: 9,
    subscale: "punitive_silence",
    text: {
      en: "I maintain icy silence for days at a time to punish my partner, teach them a lesson, or force them to crawl back and apologize first.",
      id: "Saya sengaja mempertahankan aksi tutup mulut berhari-hari untuk menghukum pasangan, memberinya pelajaran, atau memaksanya meminta maaf duluan.",
      de: "Ich strafe meinen Partner tagelang mit eisiger Funkstille ab, um ihm eine Lektion zu erteilen oder ein Einlenken zu erzwingen.",
      fr: "Je maintiens un silence glacial pendant plusieurs jours pour punir l'autre, lui donner une leçon ou l'obliger à s'excuser en premier.",
      es: "Mantengo un silencio gélido durante días enteros para castigar a mi pareja, darle una lección o forzarla a pedir perdón primero."
    }
  },
  {
    id: 10,
    subscale: "punitive_silence",
    text: {
      en: "I deliberately withhold eye contact, physical touch, greetings, and basic courtesies, treating my partner as if they are an invisible ghost.",
      id: "Saya sengaja menolak kontak mata, sentuhan fisik, sapaan pagi, dan kesopanan dasar, memperlakukan pasangan seolah dia adalah hantu tak kasat mata.",
      de: "Ich verweigere demonstrativ Blickkontakt, Berührungen und alltägliche Grüße – ich behandle meinen Partner wie Luft.",
      fr: "Je refuse délibérément le regard, tout contact physique et les salutations élémentaires, traitant mon/ma partenaire comme un fantôme invisible.",
      es: "Retiro a propósito el contacto visual, el afecto físico y los saludos básicos, tratando a mi pareja como si fuera invisible."
    }
  },
  {
    id: 11,
    subscale: "punitive_silence",
    text: {
      en: "When my partner weeps, pleads for communication, or experiences visible panic during my silence, I feel cold vindication rather than empathy.",
      id: "Ketika pasangan menangis, memohon agar diajak bicara, atau panik ketakutan saat saya diamkan, saya merasa puas dan menang daripada merasa kasihan.",
      de: "Wenn mein Partner weint oder um ein Gespräch fleht, spüre ich eher Genugtuung und Triumph als echtes Mitgefühl.",
      fr: "Quand mon/ma partenaire pleure ou supplie pour obtenir un mot, mon silence me procure un sentiment de puissance et de revanche plutôt que de la peine.",
      es: "Cuando mi pareja llora o suplica comunicación ante mi silencio, siento una satisfacción fría de control en lugar de empatía."
    }
  },
  {
    id: 12,
    subscale: "punitive_silence",
    text: {
      en: "I act cheerfully and warmly with friends, coworkers, or on social media while keeping the ice-cold freeze exclusively aimed at my partner.",
      id: "Saya bisa bersikap ramah dan ceria kepada teman, rekan kerja, atau di medsos, sementara sikap dingin membeku hanya saya tujukan secara khusus pada pasangan.",
      de: "Gegenüber Kollegen oder Freunden verhalte ich mich freundlich und normal, während ich die eisige Kälte ausschließlich gegen meinen Partner richte.",
      fr: "Je me montre chaleureux/se avec mes amis ou collègues, réservant mon masque glacial exclusivement à mon/ma partenaire.",
      es: "Actúo simpático y sonriente con amigos o en redes sociales, reservando el hielo y la indiferencia exclusivamente para mi pareja."
    }
  }
];

export const STONEWALLING_OPTIONS = [
  {
    value: 0,
    label: {
      en: "Never / Very Rare",
      id: "Tidak Pernah / Sangat Jarang",
      de: "Nie / Sehr selten",
      fr: "Jamais / Très rare",
      es: "Nunca / Muy raro"
    }
  },
  {
    value: 1,
    label: {
      en: "Rarely (Minor occasional tension)",
      id: "Jarang (Ketegangan kecil sesekali)",
      de: "Selten (Gelegentliche Reibereien)",
      fr: "Rarement (Tension mineure occasionnelle)",
      es: "Raramente (Tensión leve ocasional)"
    }
  },
  {
    value: 2,
    label: {
      en: "Sometimes (Monthly occurrences)",
      id: "Kadang-kadang (Sebulan sekali)",
      de: "Manchmal (Monatlich)",
      fr: "Parfois (Mensuel)",
      es: "A veces (Mensual)"
    }
  },
  {
    value: 3,
    label: {
      en: "Frequently (Every major conflict)",
      id: "Sering (Hampir setiap konflik besar)",
      de: "Häufig (Bei jedem größeren Streit)",
      fr: "Fréquemment (À chaque conflit majeur)",
      es: "Frecuentemente (En cada discusión importante)"
    }
  },
  {
    value: 4,
    label: {
      en: "Default Pattern / Multi-Day Silence",
      id: "Pola Utama / Diam Berhari-hari",
      de: "Dauermuster / Tagelanges Schweigen",
      fr: "Schéma Par Défaut / Silence de plusieurs jours",
      es: "Patrón Habitual / Silencio de varios días"
    }
  }
];

export const STONEWALLING_RESULTS: StonewallingResultLevel[] = [
  {
    level: "connected_repair",
    scoreRange: [0, 10],
    title: {
      en: "Connected Repair Dynamic (Healthy Relational De-escalation)",
      id: "Dinamika Pemulihan Terhubung (De-eskalasi Relasi yang Sehat)",
      de: "Konstruktive Konfliktkultur (Gesunde Deeskalation & Bindung)",
      fr: "Dynamique Réparatrice Connectée (Désescalade Saine du Conflit)",
      es: "Dinámica Reparadora Conectada (Desescalada Saludable del Conflicto)"
    },
    summary: {
      en: "Your relationship does not suffer from destructive stonewalling. When conflicts heat up, you or your partner are able to request healthy breathers with clear return boundaries, avoiding emotional barricades and weaponized silence.",
      id: "Hubungan Anda bebas dari pola stonewalling destruktif. Saat perdebatan memanas, Anda atau pasangan mampu meminta jeda napas secara sehat dengan kesepakatan waktu yang jelas, tanpa membisu dingin atau memutus kontak emosional.",
      de: "Ihre Beziehung ist frei von zerstörerischem Mauern. Bei Meinungsverschiedenheiten können Sie oder Ihr Partner gesunde Pausen mit klarer Rückkehrabsprache vereinbaren, ohne den anderen mit eisigem Schweigen zu foltern.",
      fr: "Votre couple est préservé du mur de silence destructeur. Lors des tensions, vous savez convenir d'une pause saine avec l'engagement explicite de reprendre l'échange avec bienveillance.",
      es: "Tu relación está libre de muros destructivos. Ante las discusiones, sabéis pactar una pausa respetuosa con la promesa clara de retomar el diálogo, sin castigos de indiferencia."
    },
    neurobiology: {
      en: "Ventral vagal regulation remains active. Heart rate stays below 100 BPM during discussions, keeping prefrontal speech centers (Broca's and Wernicke's areas) online for collaborative repair.",
      id: "Regulasi saraf ventral vagal tetap dominan. Detak jantung terjaga di bawah 100 BPM saat berdiskusi, menjaga area bahasa korteks prefrontal tetap aktif untuk rekonsiliasi.",
      de: "Ventro-vagale Dämpfung verhindert autonomes Flooding. Die Herzfrequenz bleibt unter 100 Schlägen pro Minute, wodurch Sprach- und Empathiezentren voll funktionsfähig bleiben.",
      fr: "La régulation vagale ventrale reste opérante. Le rythme cardiaque reste sous les 100 BPM, préservant les capacités d'écoute et de dialogue constructif.",
      es: "La regulación vagal ventral permanece activa. La frecuencia cardíaca no supera los 100 lpm, manteniendo operativas las áreas del lenguaje y la empatía."
    },
    actionProtocol: {
      en: [
        "Continue practicing Dr. John Gottman's 'Softened Startup' when initiating complaints.",
        "Acknowledge your partner's bids for connection within 5 seconds during neutral moments.",
        "Reflect on relational appreciation in Nuju voice journaling to reinforce safety neural pathways."
      ],
      id: [
        "Pertahankan teknik 'Softened Startup' (pembuka lembut) saat mengutarakan keluhan.",
        "Sambut ajakan interaksi pasangan (bids for connection) dengan hangat dalam 5 detik.",
        "Catat apresiasi harian di voice journal Nuju untuk memperkuat sirkuit rasa aman relasional."
      ],
      de: [
        "Behalten Sie den 'sanften Gesprächseinstieg' (Softened Startup) nach Gottman bei.",
        "Reagieren Sie auf kleine Zuwendungsangebote Ihres Partners zeitnah und wohlwollend.",
        "Nutzen Sie Audio-Journaling in Nuju, um Dankbarkeit und emotionale Nähe zu festigen."
      ],
      fr: [
        "Poursuivez l'entame douce des conversations ('Softened Startup') selon John Gottman.",
        "Répondez avec bienveillance aux appels d'attention de votre partenaire au quotidien.",
        "Exprimez vos gratitudes dans le journal vocal Nuju pour entretenir la sécurité affective."
      ],
      es: [
        "Mantén el 'inicio suave' (Softened Startup) de John Gottman al plantear quejas.",
        "Responde con calidez a las tentativas de conexión de tu pareja a lo largo del día.",
        "Registra apreciaciones mutuas en el diario de voz de Nuju para nutrir la confianza."
      ]
    },
    badge: {
      en: "Relational Co-Regulator",
      id: "Ko-Regulator Relasi",
      de: "Beziehungs-Coregulator",
      fr: "Co-Régulateur Relationnel",
      es: "Co-Regulador Afectivo"
    }
  },
  {
    level: "mild_avoidant",
    scoreRange: [11, 20],
    title: {
      en: "Mild Avoidant Withdrawal (Occasional Space Seeking)",
      id: "Penarikan Diri Menghindar Ringan (Butuh Ruang Sesekali)",
      de: "Leichter Rückzug (Gelegentliches Distanzbedürfnis)",
      fr: "Repli Évitant Léger (Besoin Ponctuel d'Espace)",
      es: "Retirada Evitativa Leve (Búsqueda Ocasional de Espacio)"
    },
    summary: {
      en: "You or your partner occasionally retreat into brief silence when feeling overwhelmed. While not intentionally abusive, failing to communicate a return timeframe can leave the pursuing partner with anxious adrenaline spikes.",
      id: "Anda atau pasangan sesekali membisu sejenak saat merasa kelelahan emosional. Meski tidak bermaksud menyakiti, kebiasaan diam tanpa kejelasan waktu bisa memicu kepanikan cemas pada pasangan yang ditinggalkan.",
      de: "Sie oder Ihr Partner neigen bei Reizüberflutung zu kurzzeitigem Rückzug. Obwohl nicht böswillig gemeint, erzeugt das Fehlen einer klaren Rückkehrzusage beim Partner Verlassenheitsängste.",
      fr: "L'un de vous a parfois le réflexe de se taire pour éviter l'escalade. Bien qu'involontaire, l'absence de repères temporels peut insécuriser le/la partenaire.",
      es: "Tú o tu pareja os replegáis a veces en el silencio ante el agobio. Aunque no sea con malicia, marcharse sin avisar de cuándo se hablará dispara ansiedad en el otro."
    },
    neurobiology: {
      en: "Mild sympathetic activation triggers defensive withdrawal before heart rate crosses critical flooding thresholds (95-100 BPM).",
      id: "Aktivasi simpatis ringan memicu penarikan diri defensif sebelum detak jantung melewati batas kritis 'flooding' (95-100 BPM).",
      de: "Leichte sympathische Aktivierung führt zu Ausweichmanövern, bevor die kritische Überflutungsgrenze (95–100 Schläge) erreicht wird.",
      fr: "L'activation sympathique incite à l'évitement défensif avant même que le rythme cardiaque n'atteigne le seuil d'alerte des 100 BPM.",
      es: "La activación simpática leve empuja a la huida defensiva antes de que el pulso alcance el umbral de desbordamiento (100 lpm)."
    },
    actionProtocol: {
      en: [
        "Adopt the '20-Minute Golden Rule': explicitly state 'I'm feeling flooded. I love you, but I need 20 minutes to calm down. I will come back at 8:30 PM.'",
        "During the break, engage in non-ruminative somatic activities: walk, sip cool water, avoid texting friends about the fight.",
        "Voice journal your raw uncensored anger in Nuju to discharge autonomic adrenaline before re-entering conversation."
      ],
      id: [
        "Terapkan 'Aturan Emas 20 Menit': katakan secara jelas 'Aku merasa kewalahan. Aku sayang kamu, tapi aku butuh waktu 20 menit menenangkan diri. Kita bicara lagi jam 20.30.'",
        "Saat jeda, lakukan aktivitas yang menenangkan tubuh: jalan santai, minum air dingin, jangan membicarakan pertengkaran di chat.",
        "Tumpahkan kemarahan mentah Anda di Nuju voice journal agar adrenalin mereda sebelum kembali berbicara."
      ],
      de: [
        "Die 20-Minuten-Regel etablieren: 'Ich bin überfordert. Ich brauche 20 Minuten Pause, um mich zu beruhigen. Um 20:30 Uhr reden wir weiter.'",
        "Während der Pause nicht grübeln: Spazieren gehen, Wasser trinken, keine Chat-Kriege führen.",
        "Lassen Sie Ihre Wut im Nuju-Sprachtagebuch ab, um das vegetative Nervensystem herunterzufahren."
      ],
      fr: [
        "Appliquez la 'Règle d'or des 20 minutes' : formulez explicitement 'Je suis submergé(e). J'ai besoin de 20 minutes pour m'apaiser. On reprend à 20h30.'",
        "Pendant la pause, évitez de ruminer : marchez, buvez de l'eau fraîche, ne cherchez pas de soutiens extérieurs.",
        "Déchargez votre colère dans le journal vocal Nuju pour évacuer l'adrénaline avant de renouer le contact."
      ],
      es: [
        "Aplica la 'Regla de Oro de los 20 Minutos': avisa con claridad 'Me siento desbordado/a. Te quiero, pero necesito 20 minutos para calmarme. Volvemos a hablar a las 20:30.'",
        "Durante la pausa, haz actividades somáticas neutras: camina, bebe agua fría y no alimentes el rencor.",
        "Descarga tu ira en el diario de voz de Nuju para quemar la adrenalina antes de volver a conversar."
      ]
    },
    badge: {
      en: "Avoidant Space-Seeker",
      id: "Pencari Ruang Menghindar",
      de: "Distanzsuchender Partner",
      fr: "En Quête d'Espace de Repli",
      es: "Buscador de Espacio Defensivo"
    }
  },
  {
    level: "moderate_stonewalling",
    scoreRange: [21, 31],
    title: {
      en: "Moderate Stonewalling Defense (Frequent Autonomic Overload)",
      id: "Pertahanan Stonewalling Moderat (Sering Overload Saraf Otonom)",
      de: "Fortgeschrittenes Mauern (Häufige vegetative Überflutung)",
      fr: "Postures de Mur de Pierre Modérées (Surcharge Nerveuse Fréquente)",
      es: "Bloqueo por Muro de Piedra Moderado (Sobrecarga Frecuente)"
    },
    summary: {
      en: "Stonewalling has become a habitual defense mechanism during arguments. When discussions get intense, one partner regularly shuts down, puts up an emotional brick wall, turns non-responsive, or leaves abruptly, triggering painful abandonment cycles.",
      id: "Stonewalling telah menjadi benteng pertahanan otomatis saat bertengkar. Saat diskusi memanas, Anda atau pasangan rutin membisu kaku, memasang dinding batu emosional, atau pergi mendadak, menyisakan luka kepanikan ditinggalkan.",
      de: "Das Mauern hat sich als feste Abwehrreaktion etabliert. Bei Konflikten blockt ein Partner regelmäßig ab, schaltet auf stumm oder ergreift die Flucht, was beim anderen massive Verlassensängste weckt.",
      fr: "Le mur de pierre est devenu un réflexe récurrent lors des désaccords. L'un de vous s'emmure dans le mutisme ou quitte la pièce brusquement, alimentant un cycle d'angoisse et de poursuite épuisant.",
      es: "El muro de piedra se ha consolidado como defensa automática. Ante el conflicto, uno de los dos se bloquea, se vuelve inaccesible o huye, alimentando una dinámica destructiva de persecución y abandono."
    },
    neurobiology: {
      en: "True Gottman 'Flooding': heart rate exceeds 100-110 BPM. Adrenaline surges trigger evolutionary fight-or-flight freeze. The amygdala perceives the partner as a physical predator, causing prefrontal language processing to crash.",
      id: "Kondisi 'Flooding' Gottman sejati: detak jantung melampaui 100-110 BPM. Lonjakan adrenalin memicu respon bertahan hidup purba. Amigdala mempersepsikan pasangan sebagai ancaman fisik, melumpuhkan pusat bahasa otak.",
      de: "Echtes Gottman-Flooding: Der Puls übersteigt 100–110 Schläge. Die Amygdala interpretiert den Partner als akute Bedrohung; der Zugang zu logischer Sprache und Empathie bricht zusammen.",
      fr: "Véritable état de submersion ('Flooding') selon Gottman : le pouls dépasse 100 BPM. L'amygdale perçoit le conjoint comme un prédateur, coupant net les circuits du langage et de la compassion.",
      es: "Auténtico 'Flooding' de Gottman: el pulso supera los 100-110 lpm. La amígdala percibe a la pareja como una amenaza vital, desconectando la capacidad de razonar y hablar con calma."
    },
    actionProtocol: {
      en: [
        "Implement mandatory heart rate monitoring: when pulse exceeds 100 BPM during conflict, pause the interaction immediately.",
        "Replace walking out with a respectful ritual: place one hand over your heart, say 'I am biologically flooded', and step away for 30 minutes.",
        "Record a 3-minute somatic vent on Nuju while pacing to discharge autonomic cortisol before attempting repair."
      ],
      id: [
        "Periksa detak jantung saat konflik: jika nadi terasa berdegup di atas 100 BPM, hentikan perdebatan seketika.",
        "Ganti kebiasaan kabur dengan ritual: letakkan tangan di dada, katakan 'Tubuhku sedang kebanjiran adrenalin', lalu ambil jeda 30 menit.",
        "Rekam uneg-uneg emosional 3 menit di Nuju sambil berjalan santai untuk membuang kortisol sebelum kembali berbicara."
      ],
      de: [
        "Pulskontrolle bei Streit: Schlägt das Herz über 100 Mal pro Minute, MUSS das Gespräch unterbrochen werden.",
        "Ersetzen Sie stummes Flüchten durch ein klares Signal: Hand aufs Herz legen, 'Ich bin überflutet' sagen und 30 Minuten pausieren.",
        "Sprechen Sie 3 Minuten Dampf in Nuju ab, um Cortisol abzubauen, bevor Sie den Dialog wieder aufnehmen."
      ],
      fr: [
        "Surveillez votre rythme cardiaque : si votre cœur bat à tout rompre (>100 BPM), le dialogue doit cesser sur-le-champ.",
        "Remplacez la fuite par un rituel d'apaisement : posez une main sur la poitrine, annoncez la pause et isolez-vous 30 minutes.",
        "Enregistrez 3 minutes de décharge vocale dans Nuju pour faire baisser le cortisol avant de tenter une réconciliation."
      ],
      es: [
        "Monitorea tu pulso: si el corazón late con fuerza (>100 lpm) en medio de la discusión, detened la conversación de inmediato.",
        "Sustituye la huida silenciosa por una señal: mano al pecho, di 'Mi cuerpo está desbordado' y retírate 30 minutos.",
        "Vuelca 3 minutos de desahogo verbal en Nuju mientras caminas para quemar cortisol antes de reanudar el contacto."
      ]
    },
    badge: {
      en: "Flooded Stonewaller",
      id: "Stonewaller Terbanjiri Emosi",
      de: "Vegetativ überfluteter Partner",
      fr: "Partenaire Submergé par le Mutisme",
      es: "Bloqueado por Inundación Emocional"
    }
  },
  {
    level: "chronic_silent_treatment",
    scoreRange: [32, 40],
    title: {
      en: "Chronic Silent Treatment Pattern (Severe Destructive Withdrawal)",
      id: "Pola Silent Treatment Kronis (Penarikan Diri Merusak yang Berat)",
      de: "Chronisches Bestrafungs-Schweigen (Destruktive Funkstille)",
      fr: "Schéma Chronique de Traitement du Silence (Violente Rupture de Lien)",
      es: "Patrón Crónico de Ley del Hielo (Retirada Afectiva Destructiva)"
    },
    summary: {
      en: "Silence has crossed from physiological overwhelm into weaponized punishment. Withholding communication, eye contact, and basic warmth for days at a time is used to punish, dominate, or force surrender. This causes acute relational trauma and severe panic in the partner.",
      id: "Aksi diam telah bergeser dari sekadar kewalahan saraf menjadi hukuman yang dimanipulasi. Membisu, menolak kontak mata, dan bersikap dingin berhari-hari digunakan untuk menghukum, mendominasi, atau memaksa pasangan menyerah. Ini menciptakan trauma keterikatan yang sangat menyiksa.",
      de: "Das Schweigen hat sich von Überforderung zu gezielter Bestrafung gewandelt. Tagelange Funkstille und Verweigerung jeglicher Zuneigung dienen der Machtausübung und fügen dem Partner schwere psychische Wunden zu.",
      fr: "Le mutisme n'est plus une simple fuite mais une punition délibérée. Priver l'autre de parole, de regard et d'affection pendant des jours entiers pour le faire plier constitue une violence psychologique majeure.",
      es: "El silencio ha dejado de ser agobio para convertirse en un arma de castigo. Retirar el saludo, la mirada y el afecto durante días para forzar la rendición de la pareja genera un trauma relacional profundo."
    },
    neurobiology: {
      en: "Neuroimaging shows that the silent treatment activates the dorsal anterior cingulate cortex (dACC)—the exact same brain region that registers acute physical burn pain. For the receiving partner, silence registers biologically as lethal social exile.",
      id: "Riset neuroimaging membuktikan silent treatment mengaktifkan dorsal anterior cingulate cortex (dACC)—area otak yang sama persis saat merasakan rasa sakit luka bakar fisik. Bagi yang didiamkan, silent treatment terasa seperti pengasingan yang mematikan.",
      de: "Neurowissenschaftliche Studien zeigen: Das Verharren im Schweigen aktiviert im Gehirn des Partners dieselben Schmerzzentren (dACC) wie schwere körperliche Verbrennungen.",
      fr: "L'imagerie cérébrale démontre que le silence punitif active le cortex cingulaire antérieur dorsal (dACC)—la zone exacte qui traite la douleur physique d'une brûlure.",
      es: "La neurociencia demuestra que el silencio punitivo activa la corteza cingulada anterior dorsal (dACC), la misma zona cerebral que registra el dolor de una quemadura física."
    },
    actionProtocol: {
      en: [
        "Recognize multi-day silent treatment as emotional abuse, not 'taking space'. A healthy timeout lasts 20 to 60 minutes, never days.",
        "If you are the stonewaller: recognize that weaponized silence destroys your bond permanently. Commit to breaking the ice within 2 hours.",
        "If you are the victim of silent treatment: do not beg or apologize for things you didn't do. Use Nuju voice journal to ground your nervous system in your own reality."
      ],
      id: [
        "Sadarilah bahwa diam berhari-hari adalah bentuk kekerasan emosional, bukan sekadar 'butuh ruang'. Jeda yang sehat berlangsung 20-60 menit, bukan berhari-hari.",
        "Jika Anda pelakunya: pahami bahwa silent treatment membunuh rasa percaya pasangan. Berkomitmenlah mencairkan suasana maksimal dalam 2 jam.",
        "Jika Anda korbannya: jangan memohon atau meminta maaf atas hal yang bukan salah Anda. Gunakan voice journal Nuju untuk menjaga kewarasan diri sendiri."
      ],
      de: [
        "Erkennen Sie tagelange Funkstille als seelische Grausamkeit an. Eine gesunde Pause dauert 20 bis 60 Minuten, niemals Tage.",
        "Falls Sie mauern: Machen Sie sich bewusst, dass dies Ihre Beziehung zerstört. Brechen Sie das Eis aktiv nach spätestens 2 Stunden.",
        "Falls Sie bestraft werden: Betteln Sie nicht um Aufmerksamkeit. Nutzen Sie Nuju, um Ihre eigene Realität zu stabilisieren."
      ],
      fr: [
        "Prenez conscience que le silence de plusieurs jours est une violence psychologique. Une pause saine dure 20 à 60 minutes, jamais des jours.",
        "Si vous usez du silence : comprenez qu'il détruit irrémédiablement l'amour. Engagez-vous à rétablir le contact sous 2 heures.",
        "Si vous subissez le silence : ne suppliez pas. Utilisez le journal vocal Nuju pour ancrer votre sécurité intérieure sans céder au chantage."
      ],
      es: [
        "Reconoce que la ley del hielo de varios días es maltrato psicológico. Una pausa sana dura entre 20 y 60 minutos, jamás días enteros.",
        "Si tú aplicas el silencio: asume que destruyes el vínculo. Comprométete a romper el hielo en menos de 2 horas.",
        "Si sufres el silencio: no ruegues perdón por cosas que no hiciste. Usa el diario de voz de Nuju para preservar tu dignidad y calma."
      ]
    },
    badge: {
      en: "Punitive Silent Treatment",
      id: "Silent Treatment Menghukum",
      de: "Destruktives Bestrafungs-Schweigen",
      fr: "Traitement du Silence Punitif",
      es: "Ley del Hielo Punitiva"
    }
  },
  {
    level: "toxic_relational_wall",
    scoreRange: [41, 48],
    title: {
      en: "Toxic Relational Wall (Severe Autonomic Flooding & Stonewalling)",
      id: "Tembok Relasi Toksik (Flooding Otonom & Stonewalling Ekstrem)",
      de: "Toxische Beziehungs-Mauer (Extremes Dauermauern & Verweigerung)",
      fr: "Mur Relationnel Toxique (Submersion & Mutisme Destructeur)",
      es: "Muro Relacional Tóxico (Inundación Extrema y Rechazo Total)"
    },
    summary: {
      en: "Your relationship communication has completely collapsed into an impenetrable fortress of stone. Conflict is met with immediate contemptuous silence, total emotional abandonment, or weeks of hostile detachment. The relationship is in critical danger of irreversible demise.",
      id: "Komunikasi hubungan Anda telah hancur total menjadi benteng batu yang tak tertembus. Setiap konflik disambut diam meremehkan, penelantaran emosi total, atau berminggu-minggu permusuhan dingin. Hubungan berada dalam bahaya kritis perpisahan permanen.",
      de: "Die Kommunikation in Ihrer Partnerschaft ist vollständig zusammengebrochen. Jeder Konflikt mündet in eisige Verachtung, tagelange Entfremdung und seelischen Entzug. Die Beziehung befindet sich in akuter Auflösung.",
      fr: "La communication dans votre couple est anéantie derrière un mur infranchissable. Chaque différend se solde par un mépris silencieux, un abandon émotionnel total ou des semaines d'hostilité glacée. La rupture est imminente.",
      es: "La comunicación en tu relación ha colapsado tras un muro impenetrable. Cualquier conflicto genera desprecio silencioso, abandono emocional absoluto o semanas de hostilidad distante. El vínculo está en riesgo crítico."
    },
    neurobiology: {
      en: "Extreme autonomic shutdown and chronic neuroception of hostility. Both partners live in high sympathetic alarm or profound dorsal detachment, cementing an agonizing pursue-withdraw trap that permanently starves relational safety.",
      id: "Shutdown otonom ekstrem dan neurosepsi permusuhan kronis. Kedua pasangan hidup dalam alarm simpatis tinggi atau keterputusan dorsal yang parah, mengunci jebakan pursue-withdraw yang mematikan rasa aman.",
      de: "Totale vegetative Blockade und chronische Bedrohungswahrnehmung. Beide Partner sind im Teufelskreis aus Verfolgen und Rückzug gefangen, was jegliches Sicherheitsgefühl vernichtet.",
      fr: "Blocage autonome complet et perception permanente d'hostilité. Le couple est piégé dans le schéma destructeur poursuite-retrait, anéantissant toute sécurité affective.",
      es: "Bloqueo autonómico absoluto y neurocepción de amenaza crónica. Ambos miembros viven atrapados en la trampa de persecución-huida, destruyendo la confianza."
    },
    actionProtocol: {
      en: [
        "Urgent couples therapy with a certified Gottman Method therapist or Emotionally Focused Therapy (EFT) clinician.",
        "Establish an emergency safety ceasefire: no relationship discussions without a third-party mediator present.",
        "Treat your own nervous system with radical gentleness: warm showers, quiet walks, and unburdening all emotional pain into Nuju voice journal."
      ],
      id: [
        "Sangat disarankan segera mencari konseling pernikahan/pasangan bersertifikasi Gottman Method atau Emotionally Focused Therapy (EFT).",
        "Buat gencatan senjata darurat: hentikan semua perdebatan hubungan tanpa kehadiran terapis atau pihak ketiga yang netral.",
        "Rawat sistem saraf Anda sendiri dengan kelembutan: mandi air hangat, jalan kaki di alam, dan tumpahkan seluruh rasa sakit ke voice journal Nuju."
      ],
      de: [
        "Dringende Paartherapie bei einem zertifizierten Gottman- oder EFT-Therapeuten aufsuchen.",
        "Sofortiger Waffenstillstand: Keine Konfliktgespräche mehr ohne professionelle Begleitung führen.",
        "Kümmern Sie sich um Ihr eigenes Nervensystem: Wärme, Bewegung und das unzensierte Entlasten im Nuju-Sprachtagebuch."
      ],
      fr: [
        "Consultez d'urgence un thérapeute de couple formé à la méthode Gottman ou à la Thérapie Fondée sur l'Attachement (EFT).",
        "Cessez-le-feu immédiat : interdisez-vous d'aborder les sujets qui fâchent sans la présence d'un médiateur professionnel.",
        "Prenez soin de votre système nerveux blessé : chaleur réconfortante et dépôts de souffrance dans le journal vocal sécurisé Nuju."
      ],
      es: [
        "Buscad terapia de pareja urgente con un profesional certificado en el Método Gottman o Terapia Focalizada en las Emociones (TFE).",
        "Pacto de alto el fuego de emergencia: no toquéis temas de conflicto sin un terapeuta mediador neutral presente.",
        "Cuida tu sistema nervioso herido con ternura: calor, paseos serenos y desahogo de todo el dolor en el diario de voz confidencial de Nuju."
      ]
    },
    badge: {
      en: "Severe Relational Stone Wall",
      id: "Tembok Batu Relasi Kritis",
      de: "Toxische Schutzmauer",
      fr: "Mur Relationnel Infranchissable",
      es: "Muro Relacional Crítico"
    }
  }
];

export const STONEWALLING_SUBSCALE_INFO = {
  autonomic_flooding: {
    name: {
      en: "Autonomic Flooding & Somatic Overload",
      id: "Flooding Otonom & Overload Somatik",
      de: "Vegetative Überflutung & körperlicher Alarm",
      fr: "Submersion Autonome & Surcharge Corporelle",
      es: "Inundación Autonómica y Sobrecarga Somática"
    },
    description: {
      en: "Racing pulse (>100 BPM), chest tightness, sensory overwhelm, and cognitive tunnel vision during conflict.",
      id: "Detak jantung berdegup kencang (>100 BPM), dada sesak, overload sensorik, dan pikiran buntu saat berdebat.",
      de: "Herzrasen (>100 Schläge), Brustenge, Reizüberflutung und geistige Blockade bei Meinungsverschiedenheiten.",
      fr: "Pouls qui s'emballe (>100 BPM), oppression thoracique, saturation sensorielle et paralysie mentale lors du conflit.",
      es: "Taquicardia (>100 lpm), opresión en el pecho, saturación sensorial y mente en blanco durante la discusión."
    }
  },
  shutdown_and_withdrawal: {
    name: {
      en: "Stone Wall Shutdown & Emotional Detachment",
      id: "Membisu Dinding Batu & Pelepasan Emosi",
      de: "Steinmauer-Rückzug & emotionale Erstarrung",
      fr: "Mutisme de Mur de Pierre & Retrait Affectif",
      es: "Bloqueo de Muro de Piedra y Desconexión Afectiva"
    },
    description: {
      en: "Blank expression, monosyllabic answers, dissociation, and walking away without communicating when you'll return.",
      id: "Wajah membeku tanpa ekspresi, jawaban satu kata ketus, disosiasi, dan pergi tanpa kejelasan kapan kembali.",
      de: "Starre Mimik, einsilbige Abweisung, inneres Abschalten und Weggehen ohne Rückkehrabsprache.",
      fr: "Visage impassible, réponses monosyllabiques, dissociation et départ brutal sans repère de retour.",
      es: "Rostro inexpresivo, monosílabos secos, disociación y marcha repentina sin avisar de cuándo volverás."
    }
  },
  punitive_silence: {
    name: {
      en: "Weaponized Silent Treatment & Cold Punishment",
      id: "Silent Treatment Menghukum & Manipulasi Dingin",
      de: "Gezieltes Bestrafungs-Schweigen & Liebesentzug",
      fr: "Traitement du Silence Punitif & Revanche Glaciale",
      es: "Ley del Hielo Punitiva y Castigo con Indiferencia"
    },
    description: {
      en: "Multi-day cold freeze, withholding affection, treating partner like a ghost, and ignoring distress to force surrender.",
      id: "Membisu berhari-hari, menolak sentuhan, memperlakukan pasangan seperti hantu, dan membiarkannya menangis demi menang.",
      de: "Tagelange Funkstille, Verweigerung von Zuwendung, Behandeln des Partners wie Luft zur Durchsetzung von Macht.",
      fr: "Silence glacial de plusieurs jours, privation d'affection, traitement de l'autre comme un fantôme pour le dominer.",
      es: "Silencio de varios días, retirada de afecto, tratar a la pareja como un fantasma y disfrutar de su angustia para someterla."
    }
  }
};

export function getStonewallingResult(totalScore: number): StonewallingResultLevel {
  const matched = STONEWALLING_RESULTS.find(
    (lvl) => totalScore >= lvl.scoreRange[0] && totalScore <= lvl.scoreRange[1]
  );
  return matched || STONEWALLING_RESULTS[STONEWALLING_RESULTS.length - 1];
}

export function calculateStonewallingSubscales(answers: Record<number, number>): {
  autonomic_flooding: number;
  shutdown_and_withdrawal: number;
  punitive_silence: number;
} {
  let autonomic_flooding = 0;
  let shutdown_and_withdrawal = 0;
  let punitive_silence = 0;

  STONEWALLING_QUESTIONS.forEach((q) => {
    const val = answers[q.id] || 0;
    if (q.subscale === "autonomic_flooding") autonomic_flooding += val;
    if (q.subscale === "shutdown_and_withdrawal") shutdown_and_withdrawal += val;
    if (q.subscale === "punitive_silence") punitive_silence += val;
  });

  return { autonomic_flooding, shutdown_and_withdrawal, punitive_silence };
}
