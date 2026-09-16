export type LoveLang = "en" | "id" | "de" | "fr" | "es";

export type LoveLanguageType = "words" | "time" | "acts" | "gifts" | "touch";

export interface LoveLanguageProfile {
  id: LoveLanguageType;
  title: Record<LoveLang, string>;
  subtitle: Record<LoveLang, string>;
  emoji: string;
  tagline: Record<LoveLang, string>;
  description: Record<LoveLang, string>;
  howToLoveMe: Record<LoveLang, string[]>;
  conflictTrigger: Record<LoveLang, string>;
  healingAffirmation: Record<LoveLang, string>;
}

export interface LoveLanguageQuestion {
  id: number;
  scenario: Record<LoveLang, string>;
  options: {
    text: Record<LoveLang, string>;
    language: LoveLanguageType;
  }[];
}

export const LOVE_LANGUAGE_PROFILES: Record<LoveLanguageType, LoveLanguageProfile> = {
  words: {
    id: "words",
    emoji: "💌",
    title: {
      en: "Words of Affirmation",
      id: "Kata-Kata Penegasan (Words of Affirmation)",
      de: "Worte der Anerkennung",
      fr: "Paroles Valorisantes",
      es: "Palabras de Afirmación",
    },
    subtitle: {
      en: "Verbal Sincerity, Praise, & Emotional Encouragement",
      id: "Ketulusan Verbal, Pujian, & Dukungan Emosional",
      de: "Verbale Wertschätzung, Lob & Aufmunterung",
      fr: "Sincérité verbale, éloges et réconfort émotionnel",
      es: "Sinceridad verbal, elogios y aliento emocional",
    },
    tagline: {
      en: "Words are not just sounds to you—they are the bedrock of safety and belonging.",
      id: "Bagi kamu, kata-kata bukan sekadar bunyi—melainkan jangkar rasa aman dan dihargai.",
      de: "Worte sind für Sie das Fundament von Geborgenheit und Wertschätzung.",
      fr: "Les mots sont pour vous le socle de la sécurité et de la reconnaissance.",
      es: "Las palabras son para ti el fundamento de la seguridad y el afecto sincero.",
    },
    description: {
      en: "You thrive when your partner verbally articulates their love, appreciation, and respect. Genuine compliments, unexpected 'thinking of you' texts, and vocal gratitude light up your emotional nervous system. Harsh, critical, or dismissive words cut deeper than anything else.",
      id: "Kamu merasa paling dicintai saat pasangan mengutarakan rasa sayang, terima kasih, dan apresiasinya secara lisan. Pujian tulus, pesan singkat tanpa alasan, dan pengakuan atas usahamu memberi energi luar biasa. Sebaliknya, kata-kata kasar atau nada meremehkan sangat melukai batinmu.",
      de: "Sie blühen auf, wenn Ihr Partner seine Liebe und Wertschätzung offen ausspricht. Aufrichtige Komplimente und herzliche Nachrichten geben Ihnen emotionale Sicherheit. Scharfe oder abwertende Worte verletzen Sie besonders tief.",
      fr: "Vous vous épanouissez quand votre partenaire exprime clairement son amour et sa gratitude. Les compliments sincères et les mots doux nourrissent votre lien affectif. Les reproches blessants vous atteignent en plein cœur.",
      es: "Te sientes profundamente amado(a) cuando tu pareja expresa su aprecio y afecto con palabras. Los elogios sinceros y los mensajes cariñosos nutren tu seguridad emocional. Las palabras hirientes te afectan más que a nadie.",
    },
    howToLoveMe: {
      en: [
        "Tell me specifically what you appreciate about me, not just generic praise.",
        "Send me unexpected sweet messages during busy workdays.",
        "Acknowledge my effort when I try hard to support you.",
        "Never use silent treatment or harsh insults during disagreements.",
      ],
      id: [
        "Ucapkan secara spesifik apa yang kamu kagumi dariku, bukan sekadar pujian basa-basi.",
        "Kirimkan pesan singkat penyemangat di tengah kesibukan harimu.",
        "Akui usahaku ketika aku berjuang untuk membantumu atau hubungan kita.",
        "Hindari silent treatment atau kata-kata sarkastis tajam saat sedang berdebat.",
      ],
      de: [
        "Sagen Sie mir konkret, was Sie an mir schätzen.",
        "Senden Sie mir zwischendurch kleine liebevolle Nachrichten.",
        "Bemerken und loben Sie meine Bemühungen.",
        "Vermeiden Sie Schweigen oder verletzende Vorwürfe im Streit.",
      ],
      fr: [
        "Dites-moi précisément ce que vous appréciez chez moi.",
        "Envoyez-moi de petits mots doux imprévus dans la journée.",
        "Remarquez et remerciez mes efforts au quotidien.",
        "Évitez le silence hostile ou les critiques blessantes.",
      ],
      es: [
        "Dime específicamente qué aprecias de mí con honestidad.",
        "Envíame mensajes cariñosos espontáneos durante el día.",
        "Reconoce mis esfuerzos cuando intento apoyarte.",
        "Evita la ley del hielo o palabras hirientes durante una discusión.",
      ],
    },
    conflictTrigger: {
      en: "Harsh criticism, belittling comments, or dismissive silences during conflict.",
      id: "Kritik tajam, kata-kata merendahkan, atau sikap mendiamkan (silent treatment) saat ada masalah.",
      de: "Scharfe Kritik, herablassende Bemerkungen oder emotionales Schweigen.",
      fr: "Les critiques sévères, les remarques dévalorisantes ou le silence punitif.",
      es: "Críticas duras, comentarios despectivos o el silencio punitivo.",
    },
    healingAffirmation: {
      en: "My worth is inherent. Loving words nourish me, and I deserve gentle, truthful communication.",
      id: "Harga diriku utuh. Kata-kata tulus adalah makananku, dan aku berhak atas komunikasi yang lembut serta jujur.",
      de: "Mein Wert ist unantastbar. Liebevolle Worte nähren mich, und ich verdiene sanfte, ehrliche Kommunikation.",
      fr: "Ma valeur est inconditionnelle. J'ai droit à une communication douce, vraie et bienveillante.",
      es: "Mi valor es incondicional. Merezco una comunicación afectuosa, clara y respetuosa.",
    },
  },
  time: {
    id: "time",
    emoji: "⏳",
    title: {
      en: "Quality Time",
      id: "Waktu Berkualitas (Quality Time)",
      de: "Zweisamkeit & Zeit",
      fr: "Moments de Qualité",
      es: "Tiempo de Calidad",
    },
    subtitle: {
      en: "Undivided Presence, Deep Conversations, & Shared Memories",
      id: "Kehadiran Utuh, Obrolan Mendalam, & Memori Bersama",
      de: "Volle Aufmerksamkeit, Tiefgang & gemeinsame Erlebnisse",
      fr: "Présence attentive, écoute profonde et partage",
      es: "Presencia plena, conversaciones profundas y atención total",
    },
    tagline: {
      en: "Being in the same room isn't enough; you crave uninterrupted, undivided attention.",
      id: "Berada di satu ruangan tidaklah cukup; kamu membutuhkan perhatian utuh tanpa gangguan.",
      de: "Nur im selben Raum zu sein reicht nicht; Sie sehnen sich nach ungeteilter Aufmerksamkeit.",
      fr: "Être dans la même pièce ne suffit pas ; vous avez besoin d'une attention totale et partagée.",
      es: "Estar en la misma habitación no basta; anhelas atención plena e ininterrumpida.",
    },
    description: {
      en: "Nothing says 'I love you' more than a partner putting their smartphone face down, looking into your eyes, and listening with genuine curiosity. You cherish shared walks, uninterrupted dinners, and meaningful conversations. Distracted half-listening or cancelled plans feel like deep emotional abandonment.",
      id: "Tidak ada yang lebih membuktikan cinta bagimu selain pasangan yang meletakkan ponselnya, menatap matamu, dan mendengarkan dengan tulus. Kamu menghargai jalan santai bersama, makan malam tanpa gadget, dan diskusi mendalam. Sebaliknya, mendengarkan sambil lalu atau pembatalan janji terasa seperti penolakan emosional.",
      de: "Für Sie ist nichts wertvoller als ein Partner, der das Smartphone weglegt und Ihnen aufmerksam zuhört. Sie lieben gemeinsame Spaziergänge und intensive Gespräche. Abgelenktes Zuhören oder abgesagte Verabredungen treffen Sie schmerzhaft.",
      fr: "Rien ne prouve mieux l'amour qu'un partenaire qui pose son téléphone pour vous regarder dans les yeux. Vous chérissez les balades à deux et les discussions sincères. Le manque d'attention ou les rendez-vous annulés vous blessent profondément.",
      es: "Para ti, nada dice 'te amo' como alguien que guarda el teléfono y te escucha de verdad. Valoras pasear juntos y compartir charlas íntimas. Sentir que no te prestan atención o cancelan planes te hace sentir invisible.",
    },
    howToLoveMe: {
      en: [
        "Put your phone away when we are having a meal or conversation.",
        "Plan dedicated one-on-one dates without external distractions.",
        "Listen actively to my thoughts without immediately offering unsolicited solutions.",
        "Prioritize our shared calendar commitments.",
      ],
      id: [
        "Jauhkan ponselmu saat kita sedang makan bersama atau mengobrol intim.",
        "Rencanakan waktu kencan berdua tanpa distraksi pekerjaan atau media sosial.",
        "Dengarkan ceritaku dengan penuh perhatian tanpa terburu-buru menghakimi atau memberi solusi.",
        "Hargai janji temu kita dan jadikan waktu kebersamaan sebagai prioritas.",
      ],
      de: [
        "Legen Sie das Handy weg, wenn wir zusammen essen oder reden.",
        "Planen Sie feste gemeinsame Dates ohne Ablenkung.",
        "Hören Sie mir aktiv zu, ohne sofort ungebetene Ratschläge zu geben.",
        "Halten Sie verabredete gemeinsame Zeiten zuverlässig ein.",
      ],
      fr: [
        "Posez votre téléphone quand nous discutons ou partageons un repas.",
        "Prévoyez de vrais moments à deux sans interruption extérieure.",
        "Écoutez-moi avec empathie avant de proposer des solutions hâtives.",
        "Honorez nos engagements et nos moments réservés.",
      ],
      es: [
        "Guarda tu teléfono cuando estemos comiendo o hablando.",
        "Planifica citas a solas sin interrupciones ni pantallas.",
        "Escúchame con atención antes de ofrecer soluciones inmediatas.",
        "Cumple con puntualidad y respeto nuestros planes compartidos.",
      ],
    },
    conflictTrigger: {
      en: "Phubbing (looking at phone while talking), distracted multitasking, or frequent cancellations.",
      id: "Fokus ke layar HP saat diajak bicara, tidak hadir secara emosional, atau sering membatalkan janji.",
      de: "Blick aufs Handy während des Gesprächs, Unaufmerksamkeit oder wiederholte Absagen.",
      fr: "Regarder son écran pendant la discussion, être distrait ou annuler des rendez-vous.",
      es: "Mirar el móvil mientras hablo, estar distraído(a) o cancelar planes con frecuencia.",
    },
    healingAffirmation: {
      en: "My presence is precious. I deserve to be seen, heard, and prioritized with undivided attention.",
      id: "Kehadiranku berharga. Aku pantas didengar, dilihat, dan diprioritaskan dengan perhatian penuh.",
      de: "Meine Zeit und Präsenz sind kostbar. Ich verdiene ungeteilte Aufmerksamkeit und echte Nähe.",
      fr: "Ma présence est précieuse. Je mérite d'être écouté(e) et pleinement considéré(e).",
      es: "Mi presencia es valiosa. Merezco tiempo de calidad y atención plena de quien me ama.",
    },
  },
  acts: {
    id: "acts",
    emoji: "🛠️",
    title: {
      en: "Acts of Service",
      id: "Tindakan Nyata (Acts of Service)",
      de: "Hilfsbereitschaft & Taten",
      fr: "Services Rendus",
      es: "Actos de Servicio",
    },
    subtitle: {
      en: "Practical Support, Easing Burdens, & Reliable Follow-Through",
      id: "Dukungan Praktis, Meringankan Beban, & Bukti Nyata",
      de: "Praktische Entlastung, Verlässlichkeit & Tatkraft",
      fr: "Soutien concret, allègement de la charge et fiabilité",
      es: "Apoyo práctico, aliviar cargas y hechos que demuestran amor",
    },
    tagline: {
      en: "Actions speak louder than promises; you feel loved when someone lightens your mental load.",
      id: "Tindakan berbicara lebih keras dari sekadar janji; kamu merasa dicintai saat bebanmu diringankan.",
      de: "Taten zählen mehr als Worte; Sie fühlen sich geliebt, wenn man Ihnen Lasten abnimmt.",
      fr: "Les actes valent mieux que les mots ; vous vous sentez aimé(e) quand on allège votre quotidien.",
      es: "Los hechos hablan más que las palabras; sientes amor cuando alguien alivia tu carga diaria.",
    },
    description: {
      en: "For you, true intimacy is reflected in practical reliability. A warm cup of coffee brought to your desk, dishes done without being asked, or help fixing a stressful problem speaks directly to your heart. Broken promises, laziness, or creating extra chores feels disrespectful.",
      id: "Bagimu, kehangatan cinta terlihat dari keandalan tindakan. Dibuatkan minuman hangat saat lelah, dibantu menyelesaikan pekerjaan rumah tanpa harus disuruh, atau ditemani mengurus hal rumit adalah bukti cinta sejati. Janji manis tanpa bukti atau sikap lepas tangan membuatmu merasa diabaikan.",
      de: "Für Sie drückt sich Liebe in verlässlicher Unterstützung aus. Eine Tasse Tee bei Stress oder ungefragte Hilfe im Haushalt bedeuten Ihnen mehr als Worte. Gebrochene Zusagen oder Faulheit enttäuschen Sie tief.",
      fr: "Pour vous, l'amour s'exprime par le soutien concret. Un café préparé le matin ou une aide spontanée lors d'une journée difficile vous touche profondément. Les promesses non tenues vous déçoivent particulièrement.",
      es: "Para ti, el amor se demuestra con hechos concretos. Que te ayuden con una tarea pesada sin tener que pedirlo o te preparen un café vale más que discursos. Las promesas incumplidas te desgastan profundamente.",
    },
    howToLoveMe: {
      en: [
        "Take initiative to help without waiting for me to ask repeatedly.",
        "Follow through on small commitments and promises you make.",
        "Offer practical assistance when you notice I am overwhelmed.",
        "Work with me as an equal partner in managing life responsibilities.",
      ],
      id: [
        "Ambil inisiatif untuk membantu tanpa menunggu aku harus meminta berkali-kali.",
        "Tepati janji-janji kecil yang pernah kamu ucapkan.",
        "Tawarkan bantuan praktis ketika melihatku sedang kewalahan.",
        "Jadilah rekan tim yang seimbang dalam mengurus tanggung jawab sehari-hari.",
      ],
      de: [
        "Ergreifen Sie von sich aus die Initiative zur Hilfe.",
        "Halten Sie auch kleine Versprechen zuverlässig ein.",
        "Bieten Sie tatkräftige Unterstützung, wenn ich gestresst bin.",
        "Seien Sie ein verlässlicher Partner im Alltag.",
      ],
      fr: [
        "Prenez des initiatives d'aide sans attendre que je demande.",
        "Tenez rigoureusement vos petits et grands engagements.",
        "Soulagez-moi concrètement quand je suis débordé(e).",
        "Partagez équitablement les tâches et responsabilités.",
      ],
      es: [
        "Ten iniciativa para ayudarme sin que tenga que pedirlo varias veces.",
        "Cumple lo que prometes, incluso en los pequeños detalles.",
        "Ofréceme apoyo práctico cuando notes que estoy bajo estrés.",
        "Sé un compañero(a) de equipo confiable en la vida diaria.",
      ],
    },
    conflictTrigger: {
      en: "Broken promises, unreliability, or leaving all emotional/domestic labor on your shoulders.",
      id: "Ingkar janji, tidak bisa diandalkan, atau membiarkan seluruh beban kerja ditanggung sendirian.",
      de: "Gebrochene Versprechen, Unzuverlässigkeit oder alle Last auf einer Schulter lassen.",
      fr: "Les promesses oubliées, le manque de fiabilité ou le déséquilibre des efforts.",
      es: "Promesas rotas, falta de compromiso o dejar toda la carga sobre tus hombros.",
    },
    healingAffirmation: {
      en: "I do not have to carry everything alone. I am worthy of reciprocal, devoted support.",
      id: "Aku tidak harus menanggung semua hal sendirian. Aku pantas menerima dukungan yang setara dan tulus.",
      de: "Ich muss nicht alles alleine tragen. Ich verdiene verlässliche, tatkräftige Zuwendung.",
      fr: "Je n'ai pas à tout porter seul(e). Je mérite une aide mutuelle et bienveillante.",
      es: "No tengo que cargar con todo en soledad. Merezco reciprocidad y apoyo constante.",
    },
  },
  gifts: {
    id: "gifts",
    emoji: "🎁",
    title: {
      en: "Receiving Gifts",
      id: "Pemberian Hadiah (Receiving Gifts)",
      de: "Geschenke & Symbole",
      fr: "Cadeaux & Attentions",
      es: "Recibir Regalos",
    },
    subtitle: {
      en: "Thoughtful Tokens, Visual Remembrance, & Intentional Gestures",
      id: "Simbol Perhatian, Tanda Ingatan, & Makna di Balik Pemberian",
      de: "Achtsame Aufmerksamkeiten & greifbare Liebesbeweise",
      fr: "Symboles concrets, attentions délicates et souvenirs",
      es: "Detalles significativos, recuerdos visuales y esmero",
    },
    tagline: {
      en: "It is never about the price tag; it is about knowing someone saw something and thought of you.",
      id: "Ini bukan soal nominal harga; melainkan rasa bahagia mengetahui seseorang mengingatmu.",
      de: "Es geht nie um den materiellen Wert, sondern um den Gedanken dahinter.",
      fr: "Ce n'est pas une question de prix, mais de savoir que l'on a pensé à vous.",
      es: "No se trata del precio; se trata de saber que alguien vio algo y pensó en ti.",
    },
    description: {
      en: "To you, a gift is a tangible representation of love and mental energy. It shows that your partner understands your tastes, remembers what you mentioned weeks ago, and took deliberate time to bring joy into your hands. An absent birthday gift, careless thoughtlessness, or forgotten anniversaries feel devastating.",
      id: "Bagimu, hadiah adalah manifestasi fisik dari rasa cinta dan perhatian. Hadiah menunjukkan bahwa pasanganmu mendengarkan keinginanmu, mengingat hal-hal kecil, dan meluangkan waktu untuk membuatmu tersenyum. Melewatkan hari penting atau memberi asal-asalan terasa seperti tanda tidak dipedulikan.",
      de: "Für Sie ist ein Geschenk ein sichtbares Symbol von Verbundenheit. Es zeigt, dass der Partner zugehört und sich Gedanken gemacht hat. Vergessene Anlässe oder Gedankenlosigkeit verletzen Sie spürbar.",
      fr: "Pour vous, un présent est un symbole tangible d'affection. Il prouve que votre partenaire vous connaît et a pensé à vous en votre absence. L'oubli d'une date importante vous touche profondément.",
      es: "Para ti, un detalle es una prueba física de afecto y memoria. Demuestra que tu pareja te escucha y dedica tiempo a pensar en tu bienestar. El descuido en fechas clave o regalos sin esmero te duele.",
    },
    howToLoveMe: {
      en: [
        "Bring me small, thoughtful surprises (a favorite snack, a book, a flower).",
        "Remember meaningful anniversaries and milestones.",
        "Put thought into presentation and sentimental value, not monetary extravagance.",
        "Keep keepsakes and symbols of our relationship journey.",
      ],
      id: [
        "Bawakan kejutan kecil bermakna (makanan kesukaan, buku yang kuincar, atau bunga).",
        "Ingat tanggal-tanggal penting dan rayakan pencapaian kita bersama.",
        "Fokuslah pada ketulusan dan makna emosionalnya, bukan sekadar harga barang.",
        "Simpan kenang-kenangan kecil yang menandai perjalanan hubungan kita.",
      ],
      de: [
        "Bringen Sie kleine, persönliche Aufmerksamkeiten mit (Lieblingssnack, Buch).",
        "Behalten Sie wichtige Jahrestage im Gedächtnis.",
        "Schenken Sie mit Herz und Überlegung, nicht aus Pflichtgefühl.",
        "Schätzen Sie gemeinsame Erinnerungsstücke.",
      ],
      fr: [
        "Offrez-moi de petites attentions spontanées (une gourmandise, une fleur).",
        "Pensez aux dates d'anniversaires et aux moments clés.",
        "Misez sur la valeur sentimentale plutôt que sur le prix.",
        "Gardez des souvenirs matériels de notre histoire.",
      ],
      es: [
        "Sorpréndeme con detalles reflexivos (mi dulce favorito, una flor, una nota).",
        "Recuerda las fechas significativas y aniversarios.",
        "Valora el significado sentimental por encima del costo económico.",
        "Conserva pequeños recuerdos de nuestros viajes y momentos juntos.",
      ],
    },
    conflictTrigger: {
      en: "Forgotten anniversaries, thoughtless gift-giving out of obligation, or mocking your sentimental keepsakes.",
      id: "Lupa hari penting, memberi sekadar kewajiban tanpa ketulusan, atau meremehkan barang kenangan.",
      de: "Vergessene Meilensteine, lieblose Pflichtgeschenke oder Spott über Erinnerungen.",
      fr: "Oublier les anniversaires, offrir par obligation sans attention ou négliger les souvenirs.",
      es: "Olvidar aniversarios, regalar por compromiso sin esmero o despreciar recuerdos.",
    },
    healingAffirmation: {
      en: "I am deserving of intentional thought. The love I give and cherish is beautiful and valid.",
      id: "Aku pantas diingat dan diperhatikan dengan tulus. Tanda cinta yang kurawat adalah hal yang indah.",
      de: "Ich bin es wert, dass man achtsam an mich denkt. Meine Feinfühligkeit ist eine Stärke.",
      fr: "Je mérite d'être au centre des pensées de ceux que j'aime. Mes attentions sont précieuses.",
      es: "Merezco ser recordado(a) con cariño e intención. Mi sensibilidad hacia los detalles es un don.",
    },
  },
  touch: {
    id: "touch",
    emoji: "🫂",
    title: {
      en: "Physical Touch",
      id: "Sentuhan Fisik (Physical Touch)",
      de: "Körperliche Nähe & Zärtlichkeit",
      fr: "Le Toucher Physique",
      es: "Contacto Físico",
    },
    subtitle: {
      en: "Somatic Warmth, Hugs, Gentle Reassurance, & Physical Closeness",
      id: "Kehangatan Somatis, Pelukan, Sentuhan Lembut, & Kedekatan Fisik",
      de: "Berührungen, Geborgenheit & körperliche Nähe",
      fr: "Chaleur corporelle, étreintes et tendresse quotidienne",
      es: "Calidez física, abrazos, caricias y cercanía corporal",
    },
    tagline: {
      en: "Touch is your nervous system's native language of safety, acceptance, and reassurance.",
      id: "Sentuhan adalah bahasa alami sistem sarafmu untuk merasakan rasa aman dan penerimaan.",
      de: "Körperliche Berührung ist die Muttersprache Ihres Nervensystems für Sicherheit und Trost.",
      fr: "Le contact physique est le langage immédiat de votre système nerveux pour s'apaiser.",
      es: "El contacto físico es el lenguaje que calma tu sistema nervioso y te hace sentir seguro(a).",
    },
    description: {
      en: "For you, emotional connection is grounded in the body. A warm embrace after a long day, holding hands while walking, sitting close on the sofa, or a gentle touch on the shoulder communicates profound security. Physical distance, prolonged coldness, or touch only given during intimacy feels isolating.",
      id: "Bagimu, koneksi emosional terhubung erat dengan tubuh. Pelukan hangat setelah seharian lelah, bergandengan tangan saat berjalan, atau sentuhan lembut di pundak memberikan ketenangan luar biasa. Jarak fisik yang dingin atau penolakan sentuhan terasa seperti keterasingan emosional.",
      de: "Für Sie entsteht Nähe durch Berührung. Eine lange Umarmung, Händchenhalten oder sanftes Streicheln vermitteln Ihnen Geborgenheit. Körperliche Distanz oder Abweisung fühlen sich wie Entfremdung an.",
      fr: "Pour vous, le lien émotionnel passe par la tendresse physique. Une étreinte chaleureuse, se tenir la main ou s'asseoir tout près l'un de l'autre crée un sentiment de sécurité immédiat.",
      es: "Para ti, el afecto se transmite a través del contacto. Un abrazo reconfortante, caminar de la mano o una caricia espontánea te brindan paz. La frialdad física o el rechazo corporal te generan angustia.",
    },
    howToLoveMe: {
      en: [
        "Reach out for non-sexual affection (holding hands, hugs, resting on your shoulder).",
        "Greet me and say goodbye with a genuine, lingering hug.",
        "Sit close to me when we relax together.",
        "Never use physical withdrawal or cold body language as a weapon during conflict.",
      ],
      id: [
        "Beri sentuhan kasih sayang non-seksual (gandengan tangan, pelukan hangat, usapan lembut).",
        "Sambut dan lepaskan aku saat bepergian dengan pelukan yang tulus.",
        "Duduklah berdekatan saat kita sedang bersantai menonton atau beristirahat.",
        "Jangan gunakan penolakan sentuhan atau bahasa tubuh dingin sebagai hukuman emosional.",
      ],
      de: [
        "Schenken Sie mir liebevolle Alltagsberührungen (Hände halten, Umarmungen).",
        "Begrüßen und verabschieden Sie mich mit einer herzlichen Umarmung.",
        "Setzen Sie sich nah zu mir, wenn wir entspannen.",
        "Nutzen Sie körperliche Kälte niemals als Strafe im Konflikt.",
      ],
      fr: [
        "Offrez-moi des gestes tendres au quotidien (tenir la main, caresser l'épaule).",
        "Accueillez-moi et dites-moi au revoir avec une étreinte chaleureuse.",
        "Asseyez-vous tout près de moi dans nos moments de détente.",
        "N'utilisez jamais la distance physique comme arme ou punition.",
      ],
      es: [
        "Bríndame afecto físico espontáneo y no sexual (tomar la mano, abrazos, caricias).",
        "Salúdame y despídete con un abrazo cálido y sincero.",
        "Siéntate cerca de mí cuando descansemos juntos.",
        "Nunca uses la frialdad corporal o el distanciamiento físico como castigo.",
      ],
    },
    conflictTrigger: {
      en: "Pushing you away physically, cold body language, or weeks of zero affectionate contact.",
      id: "Menepis sentuhan secara kasar, bahasa tubuh dingin, atau ketiadaan pelukan berminggu-minggu.",
      de: "Körperliches Wegstoßen, abweisende Körpersprache oder langanhaltende Kälte.",
      fr: "Le rejet physique, le corps fermé ou l'absence prolongée de tendresse.",
      es: "Rechazar el contacto físico, lenguaje corporal distante o semanas sin una muestra de cariño.",
    },
    healingAffirmation: {
      en: "My body is worthy of gentle, safe tenderness. I belong and I am held in safety.",
      id: "Tubuhku pantas menerima kehangatan yang lembut dan aman. Aku aman dan dicintai seutuhnya.",
      de: "Mein Körper verdient sanfte und sichere Geborgenheit. Ich bin gehalten und geschützt.",
      fr: "Mon corps mérite une tendresse douce et respectueuse. Je suis en sécurité et aimé(e).",
      es: "Mi cuerpo merece ternura y calidez segura. Soy amado(a) y estoy a salvo.",
    },
  },
};

export const LOVE_LANGUAGE_QUESTIONS: LoveLanguageQuestion[] = [
  {
    id: 1,
    scenario: {
      en: "You have had an exhausting, draining week at work. What gesture from your partner instantly restores your spirit?",
      id: "Kamu baru saja melewati minggu kerja yang sangat melelahkan dan menguras energi. Perlakuan apa dari pasangan yang paling cepat memulihkan jiwamu?",
      de: "Sie hatten eine anstrengende, kräftezehrende Woche. Welche Geste Ihres Partners baut Sie sofort wieder auf?",
      fr: "Vous venez de passer une semaine épuisante. Quel geste de votre partenaire vous réconforte immédiatement ?",
      es: "Has tenido una semana laboral agotadora. ¿Qué gesto de tu pareja te devuelve la paz al instante?",
    },
    options: [
      {
        language: "words",
        text: {
          en: "They sit with me and say: 'I'm so proud of you. You handled so much with grace.'",
          id: "Mereka duduk bersamaku dan berkata: 'Aku bangga banget sama kamu. Kamu hebat sudah bertahan.'",
          de: "Er/sie sagt mir aufrichtig: 'Ich bin so stolz auf dich und wie du das gemeistert hast.'",
          fr: "Il/elle me dit avec tendresse : 'Je suis si fier/fière de toi et de tout ce que tu as accompli.'",
          es: "Se sienta a mi lado y me dice: 'Estoy muy orgulloso(a) de ti y de cómo superaste todo.'",
        },
      },
      {
        language: "touch",
        text: {
          en: "They wrap their arms around me in a long, silent, grounding hug without rushing.",
          id: "Mereka langsung memelukku erat dalam keheningan yang hangat tanpa terburu-buru.",
          de: "Er/sie nimmt mich lange und fest in die Arme, ohne Hektik und voller Ruhe.",
          fr: "Il/elle me serre fort dans ses bras pour une longue étreinte silencieuse et rassurante.",
          es: "Me abraza con fuerza en un abrazo largo y tranquilo que me hace sentir en casa.",
        },
      },
      {
        language: "acts",
        text: {
          en: "They quietly handled dinner and cleaned the kitchen so I don't have to lift a finger.",
          id: "Mereka diam-diam sudah menyiapkan makanan dan mencuci piring agar aku bisa langsung istirahat.",
          de: "Er/sie hat bereits das Essen gekocht und aufgeräumt, damit ich mich ausruhen kann.",
          fr: "Il/elle a préparé le dîner et rangé pour que je n'aie rien à faire.",
          es: "Preparó la cena y limpió todo para que yo solo tenga que descansar.",
        },
      },
      {
        language: "time",
        text: {
          en: "They turn off all devices and spend the whole evening talking and resting with me.",
          id: "Mereka mematikan ponsel dan menghabiskan sepanjang malam mengobrol santai bersamaku.",
          de: "Er/sie schaltet das Handy aus und widmet mir den ganzen Abend bei ungestörten Gesprächen.",
          fr: "Il/elle éteint son téléphone pour passer toute la soirée à discuter calmement avec moi.",
          es: "Apaga los dispositivos y me dedica toda la tarde para charlar y relajarnos juntos.",
        },
      },
    ],
  },
  {
    id: 2,
    scenario: {
      en: "When you receive an unexpected surprise from your partner, what moves your heart the most?",
      id: "Saat menerima kejutan tak terduga dari pasangan, hal apa yang paling menyentuh lubuk hatimu?",
      de: "Wenn Ihr Partner Sie überrascht, was berührt Ihr Herz am stärksten?",
      fr: "Quand votre partenaire vous fait une surprise, qu'est-ce qui vous touche le plus ?",
      es: "Cuando recibes una sorpresa de tu pareja, ¿qué es lo que más te conmueve?",
    },
    options: [
      {
        language: "gifts",
        text: {
          en: "A small item they saw days ago that reminded them uniquely of me.",
          id: "Barang kecil yang mereka lihat beberapa hari lalu dan langsung teringat padaku.",
          de: "Ein kleines Mitbringsel, das ihn/sie spontan an mich erinnert hat.",
          fr: "Un petit objet vu par hasard qui lui a immédiatement fait penser à moi.",
          es: "Un detalle que vio días atrás y que le recordó especialmente a mí.",
        },
      },
      {
        language: "words",
        text: {
          en: "A handwritten letter expressing heartfelt reasons why they love having me in their life.",
          id: "Surat tulisan tangan berisi ungkapan tulus mengapa mereka bersyukur memilikiku.",
          de: "Ein handgeschriebener Brief mit ehrlichen Gründen, warum er/sie mich liebt.",
          fr: "Une lettre manuscrite exprimant sincèrement pourquoi il/elle m'aime.",
          es: "Una carta escrita a mano explicando por qué agradece tenerme en su vida.",
        },
      },
      {
        language: "acts",
        text: {
          en: "Fixing a broken item or taking care of an annoying chore I've been dreading.",
          id: "Memperbaiki barang yang rusak atau menyelesaikan urusan ribet yang sempat kupusingkan.",
          de: "Die Reparatur einer Sache oder die Erledigung einer lästigen Aufgabe für mich.",
          fr: "Régler une corvée fastidieuse ou réparer quelque chose qui m'encombrait.",
          es: "Resolver un trámite pesado o arreglar algo que me causaba estrés.",
        },
      },
      {
        language: "touch",
        text: {
          en: "A surprise slow backrub or gentle scalp massage while watching a film.",
          id: "Pijatan punggung lembut atau usapan kepala saat sedang santai bersama.",
          de: "Eine sanfte Rücken- oder Kopfmassage bei völliger Entspannung.",
          fr: "Un massage doux du dos ou de la tête pendant qu'on regarde un film.",
          es: "Un masaje suave en la espalda o caricias en el pelo mientras vemos una película.",
        },
      },
    ],
  },
  {
    id: 3,
    scenario: {
      en: "Which situation would make you feel most disconnected or emotionally hurt in a relationship?",
      id: "Situasi mana yang paling membuatmu merasa hampa, terasing, atau sakit hati dalam hubungan?",
      de: "Welche Situation würde Sie in einer Beziehung am meisten verletzen?",
      fr: "Quelle situation vous ferait ressentir le plus grand détachement émotionnel ?",
      es: "¿Qué situación te haría sentir más desconectado(a) o dolido(a) en tu relación?",
    },
    options: [
      {
        language: "time",
        text: {
          en: "My partner constantly checking their phone or being preoccupied while we are on a date.",
          id: "Pasangan terus-menerus mengecek ponselnya atau tidak fokus saat kita sedang berduaan.",
          de: "Wenn mein Partner beim Date ständig aufs Smartphone schaut und abgelenkt ist.",
          fr: "Mon/ma partenaire qui passe son temps sur son téléphone pendant notre rendez-vous.",
          es: "Que mi pareja mire constantemente el móvil o esté distraído(a) cuando salimos.",
        },
      },
      {
        language: "words",
        text: {
          en: "My partner pointing out my flaws harshly or never saying 'thank you' for my contributions.",
          id: "Pasangan mengkritik kekuranganku secara pedas atau jarang sekali berterima kasih atas usahaku.",
          de: "Wenn mein Partner mich barsch kritisiert oder mir nie für meine Mühen dankt.",
          fr: "Mon/ma partenaire qui critique durement mes faiblesses et ne dit jamais merci.",
          es: "Que mi pareja critique con dureza mis fallos y nunca agradezca mis esfuerzos.",
        },
      },
      {
        language: "touch",
        text: {
          en: "My partner pulling away when I reach for their hand, or behaving cold and physically distant.",
          id: "Pasangan menepis tanganku atau menunjukkan bahasa tubuh dingin dan berjarak.",
          de: "Wenn mein Partner meine Hand abweist oder körperlich spürbar auf Distanz geht.",
          fr: "Mon/ma partenaire qui esquive mon geste d'affection ou se montre corporellement froid(e).",
          es: "Que mi pareja aparte mi mano con frialdad o mantenga una distancia física distante.",
        },
      },
      {
        language: "acts",
        text: {
          en: "My partner breaking repeated promises to help, leaving all the mental burden on me.",
          id: "Pasangan berkali-kali melupakan janjinya untuk membantu, membuat semua beban kupikul sendiri.",
          de: "Wenn mein Partner Hilfsversprechen bricht und mich mit allem allein lässt.",
          fr: "Mon/ma partenaire qui oublie constamment ses promesses d'aide et me laisse tout gérer.",
          es: "Que mi pareja rompa promesas de ayuda una y otra vez, dejándome toda la carga.",
        },
      },
    ],
  },
  {
    id: 4,
    scenario: {
      en: "You are going through an anxious crisis. What helps your nervous system feel safest?",
      id: "Kamu sedang dilanda kecemasan hebat. Apa yang paling cepat membuat sistem sarafmu tenang dan aman?",
      de: "Sie erleben eine akute Angstphase. Was gibt Ihrem Nervensystem die meiste Sicherheit?",
      fr: "Vous traversez une crise d'angoisse. Qu'est-ce qui apaise le plus votre système nerveux ?",
      es: "Estás pasando por un momento de ansiedad intensa. ¿Qué calma mejor tu sistema nervioso?",
    },
    options: [
      {
        language: "touch",
        text: {
          en: "Holding my hand firmly, resting my head on their chest, and hearing their steady heartbeat.",
          id: "Menggenggam tanganku erat, membiarkanku bersandar di dadanya, dan merasakan detak jantungnya.",
          de: "Meine Hand fest halten und mich an seine/ihre Brust lehnen lassen.",
          fr: "Me tenir fermement la main et me laisser poser ma tête contre sa poitrine.",
          es: "Tomar mi mano con firmeza y dejarme apoyar la cabeza en su pecho.",
        },
      },
      {
        language: "words",
        text: {
          en: "Calm, steady verbal reassurance: 'I am right here with you. We will get through this together.'",
          id: "Penegasan verbal yang tenang: 'Aku ada di sini bersamamu. Kita lewati ini sama-sama ya.'",
          de: "Ruhige Worte: 'Ich bin bei dir. Wir stehen das gemeinsam durch.'",
          fr: "Des paroles douces : 'Je suis là avec toi. Nous allons surmonter cela ensemble.'",
          es: "Palabras serenas: 'Estoy aquí contigo. Vamos a superar esto juntos.'",
        },
      },
      {
        language: "time",
        text: {
          en: "Cancelling their upcoming plans to sit quietly with me in the room until the storm passes.",
          id: "Membatalkan urusan lain demi menemaniku duduk tenang di kamar sampai badai mereda.",
          de: "Andere Termine absagen, um einfach in Ruhe bei mir im Raum zu bleiben.",
          fr: "Annuler d'autres engagements pour rester assis près de moi jusqu'à ce que l'angoisse passe.",
          es: "Cancelar otros planes para quedarse a mi lado en silencio hasta que pase la tormenta.",
        },
      },
      {
        language: "acts",
        text: {
          en: "Silently making me warm herbal tea, bringing a blanket, and dimming the harsh room lights.",
          id: "Secara cekatan membuatkan teh hangat, membawakan selimut, dan meredupkan lampu kamar.",
          de: "Einen beruhigenden Tee kochen, eine Decke bringen und das Licht dämpfen.",
          fr: "Préparer une tisane chaude, m'apporter un plaid et tamiser les lumières sans bruit.",
          es: "Preparar un té caliente, traerme una manta y atenuar las luces sin que tenga que pedirlo.",
        },
      },
    ],
  },
  {
    id: 5,
    scenario: {
      en: "On a special anniversary, which gift experience makes you smile the deepest?",
      id: "Saat merayakan hari jadian atau ulang tahun, pengalaman hadiah mana yang paling membekas di hatimu?",
      de: "Welches Geschenk berührt Sie an einem Jahrestag am nachhaltigsten?",
      fr: "Pour un anniversaire important, quelle attention vous touche le plus ?",
      es: "En un aniversario especial, ¿qué detalle te deja la huella más bonita?",
    },
    options: [
      {
        language: "gifts",
        text: {
          en: "A customized photo keepsake or a sentimental gift that captures a memory only we two share.",
          id: "Koleksi foto berbingkai atau hadiah penuh kenangan yang maknanya hanya dipahami kami berdua.",
          de: "Ein liebevolles Fotobuch oder ein persönliches Erinnerungsstück nur für uns zwei.",
          fr: "Un album photo personnalisé ou un objet symbolisant un souvenir unique.",
          es: "Un álbum de fotos o un regalo sentimental con un significado que solo entendemos los dos.",
        },
      },
      {
        language: "time",
        text: {
          en: "A whole weekend getaway together with no schedule, exploring nature and enjoying long talks.",
          id: "Liburan akhir pekan berdua tanpa jadwal ketat, menikmati alam dan obrolan panjang.",
          de: "Ein ganzes gemeinsames Wochenende ohne Hektik in der Natur mit intensiven Gesprächen.",
          fr: "Un week-end entier en tête-à-tête sans contraintes pour discuter et marcher ensemble.",
          es: "Una escapada de fin de semana solos, sin prisas, charlando y explorando la naturaleza.",
        },
      },
      {
        language: "words",
        text: {
          en: "A heartfelt speech or written letter detailing their growth and deep love since we first met.",
          id: "Kata-kata tulus atau surat cinta yang merangkum rasa syukurnya atas perjalanan kami berdua.",
          de: "Eine ehrliche Rede oder ein langer Liebesbrief über unsere gemeinsame Entwicklung.",
          fr: "Une belle déclaration ou une lettre sincère retraçant notre parcours et son amour.",
          es: "Unas palabras profundas o una carta detallando cuánto ha crecido su amor por mí.",
        },
      },
      {
        language: "acts",
        text: {
          en: "They secretly arranged all logistics, bookings, and baby/pet sitting so I don't carry any burden.",
          id: "Mereka mengurus seluruh reservasi, tiket, dan urusan rumah tanpa merepotkanku sama sekali.",
          de: "Er/sie hat die gesamte Organisation und Buchung heimlich übernommen.",
          fr: "Il/elle a tout organisé et réservé discrètement pour que je n'aie aucun stress.",
          es: "Organizó en secreto todas las reservas y detalles para que yo no tuviera que preocuparme.",
        },
      },
    ],
  },
  {
    id: 6,
    scenario: {
      en: "When you are walking side-by-side in public or sitting on the sofa, what makes you feel loved?",
      id: "Saat sedang berjalan berdampingan di tempat umum atau duduk santai di sofa, apa yang membuatmu merasa dicintai?",
      de: "Wenn Sie spazieren gehen oder auf dem Sofa sitzen, wie spüren Sie die Verbundenheit?",
      fr: "En marchant côte à côte ou assis sur le canapé, qu'est-ce qui vous fait sentir aimé(e) ?",
      es: "Caminando juntos por la calle o sentados en el sofá, ¿qué te hace sentir más amado(a)?",
    },
    options: [
      {
        language: "touch",
        text: {
          en: "Spontaneously reaching out to hold my hand, or resting an arm gently around my shoulders.",
          id: "Tiba-tiba meraih tanganku untuk digenggam, atau merangkul bahuku dengan lembut.",
          de: "Spontan meine Hand nehmen oder den Arm sanft um meine Schulter legen.",
          fr: "Prendre spontanément ma main ou poser tendrement son bras sur mon épaule.",
          es: "Tomar espontáneamente mi mano o pasar su brazo con ternura sobre mi hombro.",
        },
      },
      {
        language: "words",
        text: {
          en: "Leaning over and whispering: 'You look wonderful today' or 'I really love being with you.'",
          id: "Mendekat dan berbisik: 'Kamu kelihatan manis banget hari ini' atau 'Aku suka jalan bareng kamu.'",
          de: "Mir leise ins Ohr flüstern: 'Du siehst toll aus' oder 'Ich liebe es, bei dir zu sein.'",
          fr: "Me glisser à l'oreille : 'Tu es magnifique aujourd'hui' ou 'J'adore être avec toi.'",
          es: "Susurrarme: 'Te ves increíble hoy' o 'Me encanta caminar a tu lado.'",
        },
      },
      {
        language: "time",
        text: {
          en: "Sharing synchronized laughter and observing people together with full presence.",
          id: "Tertawa bersama mengomentari hal lucu di sekitar dengan perhatian penuh.",
          de: "Gemeinsam lachen und den Augenblick in voller Gegenwart miteinander teilen.",
          fr: "Partager un rire complice et observer le monde ensemble avec présence.",
          es: "Reírnos juntos con complicidad y disfrutar plenamente del momento presente.",
        },
      },
      {
        language: "gifts",
        text: {
          en: "Spotting a vendor and surprising me with my favorite snack on the go.",
          id: "Melihat penjual jajanan lalu membelikan camilan kesukaanku secara spontan.",
          de: "Unterwegs spontan meinen Lieblingssnack kaufen und mir schenken.",
          fr: "M'offrir spontanément une friandise que j'adore croisée en chemin.",
          es: "Comprarme de sorpresa mi aperitivo favorito al pasar por un puesto.",
        },
      },
    ],
  },
  {
    id: 7,
    scenario: {
      en: "What kind of validation leaves the most lasting impression on your heart?",
      id: "Bentuk apresiasi seperti apa yang paling membekas indah di hatimu?",
      de: "Welche Art von Wertschätzung hinterlässt bei Ihnen den tiefsten Eindruck?",
      fr: "Quelle forme de reconnaissance laisse la plus belle empreinte dans votre cœur ?",
      es: "¿Qué tipo de reconocimiento deja una huella más profunda en tu corazón?",
    },
    options: [
      {
        language: "words",
        text: {
          en: "A sincere compliment acknowledging my character, wisdom, or emotional resilience.",
          id: "Pujian tulus yang mengapresiasi karakterku, kedewasaanku, atau ketangguhan mentalku.",
          de: "Ein aufrichtiges Kompliment über meinen Charakter, meine Reife und mein Wesen.",
          fr: "Un compliment sincère sur mes qualités humaines, ma sagesse ou ma force intérieure.",
          es: "Un cumplido sincero que valore mi forma de ser, mi sabiduría o mi fortaleza.",
        },
      },
      {
        language: "acts",
        text: {
          en: "Stepping up to run errands or manage dinner when they know I've had an overwhelming week.",
          id: "Mengambil alih urusan belanjaan atau memasak ketika tahu aku sedang banyak pikiran.",
          de: "Aufgaben übernehmen, weil der Partner weiß, wie voll mein Kopf gerade ist.",
          fr: "Prendre en charge des corvées concrètes parce qu'il/elle sait que je suis épuisé(e).",
          es: "Encargarse de las tareas domésticas o compras al ver que estoy sobrecargado(a).",
        },
      },
      {
        language: "gifts",
        text: {
          en: "Giving me a small token that shows they truly listened when I mentioned an interest weeks ago.",
          id: "Memberiku bingkisan kecil yang membuktikan bahwa mereka menyimak ceritaku beberapa minggu lalu.",
          de: "Ein Geschenk, das zeigt, dass er/sie mir bei beiläufigen Wünschen aufmerksam zugehört hat.",
          fr: "Un petit cadeau qui prouve qu'il/elle a retenu un souhait évoqué il y a des semaines.",
          es: "Un detalle que demuestra que escuchó con atención cuando mencioné algo semanas atrás.",
        },
      },
      {
        language: "time",
        text: {
          en: "Saying: 'Let's cancel the noise tonight and just sit on the porch and talk about life.'",
          id: "Mengajak: 'Malam ini kita santai aja yuk, duduk di teras sambil ngobrol santai dari hati ke hati.'",
          de: "Zu sagen: 'Lass uns heute Abend zur Ruhe kommen und einfach nur intensiv reden.'",
          fr: "Dire : 'Laissons de côté les distractions ce soir pour simplement discuter ensemble.'",
          es: "Decir: 'Olvidémonos de todo esta noche y sentémonos a charlar con calma.'",
        },
      },
    ],
  },
  {
    id: 8,
    scenario: {
      en: "In long-distance or busy periods, what makes you feel closest to your partner?",
      id: "Saat sedang menjalani hubungan jarak jauh atau sama-sama sibuk, apa yang paling menjaga kehangatanmu?",
      de: "In Phasen mit wenig Zeit oder bei Distanz: Was hält die Nähe lebendig?",
      fr: "Pendant les périodes chargées ou à distance, qu'est-ce qui maintient votre complicité ?",
      es: "En momentos de distancia o mucho trabajo, ¿qué te mantiene más conectado(a)?",
    },
    options: [
      {
        language: "time",
        text: {
          en: "A dedicated 45-minute video call every evening with zero multitasking or TV in the background.",
          id: "Panggilan video rutin 45 menit tanpa sibuk membuka aplikasi lain atau nonton TV.",
          de: "Ein ungestörter 45-Minuten-Videoanruf jeden Abend mit voller Aufmerksamkeit.",
          fr: "Un appel vidéo quotidien de 45 minutes sans télévision ni distraction autour.",
          es: "Una videollamada de 45 minutos cada noche con atención total y sin distracciones.",
        },
      },
      {
        language: "words",
        text: {
          en: "A heartfelt voice note sent in the morning saying how much they cherish and miss me.",
          id: "Pesan suara panjang di pagi hari berisi ungkapan rindu dan betapa berharganya diriku bagi mereka.",
          de: "Eine lange Sprachnachricht am Morgen voller Zärtlichkeit und aufrichtiger Worte.",
          fr: "Un message vocal le matin me disant combien je lui manque et combien je compte.",
          es: "Una nota de voz cariñosa por la mañana diciéndome cuánto me extraña y valora.",
        },
      },
      {
        language: "gifts",
        text: {
          en: "A surprise care package delivered to my door with handwritten cards and my favorite treats.",
          id: "Paket bingkisan kejutan yang tiba di rumah berisi camilan kesukaan dan kartu ucapan manis.",
          de: "Ein Überraschungspaket an meine Haustür mit Leckereien und einer persönlichen Karte.",
          fr: "Un colis surprise livré chez moi avec mes douceurs préférées et une carte manuscrite.",
          es: "Un paquete sorpresa entregado en mi puerta con mis dulces favoritos y una carta.",
        },
      },
      {
        language: "acts",
        text: {
          en: "Them ordering my favorite warm meal to my door when they know I haven't had time to eat.",
          id: "Mereka memesankan makanan hangat ke kantorku saat tahu aku belum sempat makan siang.",
          de: "Dass er/sie mir Essen bestellt, wenn ich wegen Stress nicht zum Kochen kam.",
          fr: "Me faire livrer un repas chaud quand il/elle sait que je n'ai pas eu le temps de manger.",
          es: "Pedirme comida caliente a domicilio cuando sabe que no he tenido tiempo de cocinar.",
        },
      },
    ],
  },
  {
    id: 9,
    scenario: {
      en: "After resolving an argument, what makes you feel truly safe and reconciled?",
      id: "Setelah berbaikan dari pertengkaran, apa yang membuatmu merasa benar-benar tenang dan aman kembali?",
      de: "Was gibt Ihnen nach einem Streit das Gefühl echter Versöhnung und Sicherheit?",
      fr: "Après une dispute, qu'est-ce qui scelle véritablement la réconciliation ?",
      es: "Después de resolver una discusión, ¿qué te hace sentir seguro(a) y en paz de verdad?",
    },
    options: [
      {
        language: "touch",
        text: {
          en: "Reaching out, pulling me close, and hugging me until both our bodies soften and breathe easy.",
          id: "Meraih tubuhku, memelukku erat sampai ketegangan otot mereda dan napas kembali lega.",
          de: "Mich fest in den Arm nehmen, bis sich die körperliche Anspannung löst.",
          fr: "Me prendre dans ses bras et me serrer tendrement jusqu'à ce que la tension s'apaise.",
          es: "Acercarse, abrazarme con ternura hasta que el cuerpo se relaje y vuelva la calma.",
        },
      },
      {
        language: "words",
        text: {
          en: "Clear, loving closure: 'I love you no matter what, and our connection is stronger than this conflict.'",
          id: "Penegasan yang menyejukkan: 'Apapun yang terjadi aku tetap sayang kamu, dan kita pasti baik-baik saja.'",
          de: "Klare Worte: 'Ich liebe dich, und unsere Bindung ist stärker als jeder Streit.'",
          fr: "Des mots rassurants : 'Je t'aime quoi qu'il arrive, notre lien est plus fort que ce désaccord.'",
          es: "Una confirmación clara: 'Te amo por encima de todo, nuestra relación es más fuerte que esto.'",
        },
      },
      {
        language: "acts",
        text: {
          en: "Immediately making concrete adjustments and actions based on the feedback we just discussed.",
          id: "Langsung menunjukkan tindakan nyata dan perubahan sikap sesuai hasil obrolan tadi.",
          de: "Konkrete Taten und sichtbare Anpassungen anstelle leerer Worte.",
          fr: "Des ajustements concrets immédiats basés sur notre discussion.",
          es: "Cambios y acciones prácticas basadas en lo que acabamos de hablar.",
        },
      },
      {
        language: "time",
        text: {
          en: "Staying together in the quiet room for another half hour just decompressing and talking peacefully.",
          id: "Duduk bersama di ruangan tenang selama 30 menit berikutnya untuk melepas sisa tegang.",
          de: "Noch eine halbe Stunde ruhig zusammenbleiben und den Frieden genießen.",
          fr: "Rester ensemble une demi-heure de plus dans le calme pour retrouver la sérénité.",
          es: "Quedarnos juntos en calma un rato más para descomprimir y hablar con serenidad.",
        },
      },
    ],
  },
  {
    id: 10,
    scenario: {
      en: "Which everyday morning habit would make you feel most cherished by your partner?",
      id: "Kebiasaan pagi hari seperti apa yang paling membuatmu merasa disayangi dan diperhatikan?",
      de: "Welches Morgenritual würde Ihnen das tiefste Gefühl von Zuneigung schenken?",
      fr: "Quel rituel du matin vous ferait vous sentir le/la plus chéri(e) ?",
      es: "¿Qué detalle mañanero te haría sentir más cuidado(a) y querido(a)?",
    },
    options: [
      {
        language: "acts",
        text: {
          en: "Waking up to freshly brewed coffee and breakfast prepared on the kitchen table.",
          id: "Bangun tidur dan mendapati kopi hangat serta sarapan sudah tersaji rapi di meja.",
          de: "Aufwachen und frischen Kaffee sowie Frühstück auf dem Tisch vorfinden.",
          fr: "Me réveiller avec le café déjà prêt et le petit-déjeuner sur la table.",
          es: "Despertar y encontrar el café recién hecho y el desayuno preparado.",
        },
      },
      {
        language: "touch",
        text: {
          en: "Ten minutes of quiet morning spooning and soft cuddling before our alarms ring.",
          id: "Sepuluh menit berpelukan hangat di ranjang sebelum bersiap memulai hari.",
          de: "Zehn Minuten ruhiges Kuscheln im Bett vor dem Aufstehen.",
          fr: "Dix minutes de câlin paisible sous la couette avant de se lever.",
          es: "Diez minutos de caricias y abrazos tranquilos en la cama antes de levantarnos.",
        },
      },
      {
        language: "words",
        text: {
          en: "A warm kiss and saying: 'Good morning my love, you are going to do amazing today.'",
          id: "Kecupan hangat disertai ucapan: 'Selamat pagi sayang, semangat ya buat hari ini.'",
          de: "Ein Kuss und die Worte: 'Guten Morgen, du wirst den Tag großartig meistern.'",
          fr: "Un baiser tendre et ces mots : 'Bonjour mon amour, passe une merveilleuse journée.'",
          es: "Un beso suave diciendo: 'Buenos días cariño, hoy te va a ir genial.'",
        },
      },
      {
        language: "gifts",
        text: {
          en: "Leaving a cute sticky note on the bathroom mirror with a small drawing or sweet doodle.",
          id: "Menempelkan memo kecil di cermin wastafel berisi gambar lucu atau kata-kata manis.",
          de: "Ein kleiner Zettel am Badezimmerspiegel mit einer süßen Zeichnung oder Nachricht.",
          fr: "Un petit post-it sur le miroir avec un mot doux ou un dessin attentionné.",
          es: "Una nota adhesiva en el espejo del baño con un dibujo cariñoso.",
        },
      },
    ],
  },
];

export interface LoveLanguageResult {
  scores: Record<LoveLanguageType, number>;
  primary: LoveLanguageProfile;
  secondary: LoveLanguageProfile;
  percentages: Record<LoveLanguageType, number>;
}

export function calculateLoveLanguageResult(
  answers: Record<number, LoveLanguageType>
): LoveLanguageResult {
  const scores: Record<LoveLanguageType, number> = {
    words: 0,
    time: 0,
    acts: 0,
    gifts: 0,
    touch: 0,
  };

  Object.values(answers).forEach((lang) => {
    if (scores[lang] !== undefined) {
      scores[lang] += 1;
    }
  });

  const total = Object.values(scores).reduce((a, b) => a + b, 0) || 1;

  const percentages: Record<LoveLanguageType, number> = {
    words: Math.round((scores.words / total) * 100),
    time: Math.round((scores.time / total) * 100),
    acts: Math.round((scores.acts / total) * 100),
    gifts: Math.round((scores.gifts / total) * 100),
    touch: Math.round((scores.touch / total) * 100),
  };

  const sorted = (Object.keys(scores) as LoveLanguageType[]).sort(
    (a, b) => scores[b] - scores[a]
  );

  return {
    scores,
    primary: LOVE_LANGUAGE_PROFILES[sorted[0]],
    secondary: LOVE_LANGUAGE_PROFILES[sorted[1]],
    percentages,
  };
}
