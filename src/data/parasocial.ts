export type ParasocialCardLang = "en" | "id" | "de" | "fr" | "es";

export interface ParasocialQuestion {
  id: number;
  subscale:
    | "perceived_two_way_illusion"
    | "emotional_dependency_consolation"
    | "reality_social_substitution";
  text: Record<ParasocialCardLang, string>;
}

export interface ParasocialResultLevel {
  level:
    | "healthy_media_entertainment"
    | "casual_parasocial_affinity"
    | "moderate_parasocial_bond"
    | "high_parasocial_dependency"
    | "acute_parasocial_absorption_enmeshment";
  scoreRange: [number, number];
  title: Record<ParasocialCardLang, string>;
  badge: Record<ParasocialCardLang, string>;
  summary: Record<ParasocialCardLang, string>;
  psychology: Record<ParasocialCardLang, string>;
  actionProtocol: Record<ParasocialCardLang, string[]>;
}

export const PARASOCIAL_QUESTIONS: ParasocialQuestion[] = [
  // 1. Perceived Two-Way Illusion
  {
    id: 1,
    subscale: "perceived_two_way_illusion",
    text: {
      en: "When my favorite streamer or creator speaks into the camera, I genuinely feel as if they are talking directly to me as a close personal confidant.",
      id: "Ketika streamer atau kreator favoritku berbicara ke arah kamera, aku merasa mereka sedang berbicara langsung secara personal denganku selayaknya teman akrab.",
      de: "Wenn mein Lieblings-Streamer in die Kamera blickt, habe ich das echte Gefühl, dass er ganz persönlich mit mir wie mit einem vertrauten Freund spricht.",
      fr: "Quand mon streamer préféré regarde la caméra, j'ai l'impression sincère qu'il s'adresse directement à moi comme à un ami très proche.",
      es: "Cuando mi streamer favorito mira a la cámara, siento de verdad que me está hablando directamente a mí como a una persona de su total confianza.",
    },
  },
  // 2. Emotional Dependency & Consolation
  {
    id: 2,
    subscale: "emotional_dependency_consolation",
    text: {
      en: "Watching their content is my primary or only reliable way to cope with loneliness, depression, or a bad day.",
      id: "Menonton konten atau live stream mereka adalah satu-satunya pelarian utamaku yang paling ampuh saat merasa kesepian, sedih, atau terpuruk.",
      de: "Ihre Streams oder Videos sind mein wichtigster oder einziger Zufluchtsort, wenn ich einsam, traurig oder überfordert bin.",
      fr: "Regarder ses streams est mon principal ou unique moyen de faire face à la solitude, la tristesse ou une mauvaise journée.",
      es: "Ver su contenido es mi principal o único recurso para lidiar con la soledad, el desánimo o un mal día.",
    },
  },
  // 3. Reality & Social Substitution
  {
    id: 3,
    subscale: "reality_social_substitution",
    text: {
      en: "I have skipped plans with real-life friends, family dinners, or work commitments just to watch their scheduled live stream or premiere.",
      id: "Aku pernah membatalkan janji dengan teman di dunia nyata, acara keluarga, atau tugas demi menonton siaran langsung (live stream) mereka tepat waktu.",
      de: "Ich habe schon Verabredungen mit echten Freunden oder Termine abgesagt, nur um keinen Livestream oder keine Premiere von ihnen zu verpassen.",
      fr: "J'ai déjà annulé des sorties avec de vrais amis, des repas de famille ou du travail uniquement pour ne pas rater leur live en direct.",
      es: "He cancelado planes con amigos reales, cenas familiares o tareas solo para no perderme su emisión en directo o estreno.",
    },
  },
  // 4. Perceived Two-Way Illusion
  {
    id: 4,
    subscale: "perceived_two_way_illusion",
    text: {
      en: "I feel that this creator understands my inner struggles better than the actual people I know in physical reality.",
      id: "Aku merasa kreator ini jauh lebih memahami pergulatan batinku dibanding orang-orang nyata di sekitarku.",
      de: "Ich habe das Gefühl, dass dieser Creator meine seelischen Nöte besser versteht als die realen Menschen in meinem Umfeld.",
      fr: "J'ai le sentiment que ce créateur comprend mes blessures et mes pensées bien mieux que les personnes réelles de mon entourage.",
      es: "Siento que este creador comprende mis luchas internas mucho mejor que cualquiera de las personas que me rodean en la vida real.",
    },
  },
  // 5. Emotional Dependency & Consolation
  {
    id: 5,
    subscale: "emotional_dependency_consolation",
    text: {
      en: "When they take a sudden hiatus, take a break from streaming, or announce upsetting personal news, I experience intense anxiety, grief, or emptiness.",
      id: "Ketika mereka mendadak hiatus, berhenti streaming sejenak, atau mengumumkan kabar buruk, aku merasakan kecemasan hebat, duka, atau kehampaan mendalam.",
      de: "Wenn sie eine plötzliche Pause einlegen oder schlechte Nachrichten teilen, erlebe ich intensive Angst, Trauer oder innere Leere.",
      fr: "S'ils font une pause imprévue ou annoncent une mauvaise nouvelle, je ressens une anxiété intense, du deuil ou un vide immense.",
      es: "Si se toman una pausa inesperada o comparten malas noticias personales, experimento una intensa ansiedad, duelo o una profunda sensación de vacío.",
    },
  },
  // 6. Reality & Social Substitution
  {
    id: 6,
    subscale: "reality_social_substitution",
    text: {
      en: "I have spent money I could barely afford (superchats, bits, VIP memberships, exclusive merch) hoping to be acknowledged or noticed by them.",
      id: "Aku pernah mengeluarkan uang yang sebenarnya tidak ku-mampu (saweran/superchat, langganan membership VIP, merchandise mahal) demi dinotice atau dipanggil namaku.",
      de: "Ich habe schon Geld ausgegeben, das ich kaum erübrigen konnte (Superchats, VIP-Abos, Fanartikel), um ihre Aufmerksamkeit zu gewinnen.",
      fr: "J'ai déjà dépensé de l'argent que je pouvais difficilement me permettre (superchats, abonnements VIP, merch) dans l'espoir qu'ils me remarquent.",
      es: "He gastado dinero que apenas podía permitirme (superchats, membresías VIP, merchandising exclusivo) con tal de llamar su atención o ser nombrado.",
    },
  },
  // 7. Perceived Two-Way Illusion
  {
    id: 7,
    subscale: "perceived_two_way_illusion",
    text: {
      en: "I find myself defending them fiercely in online arguments as if they were a beloved family member or my partner, even when they make obvious mistakes.",
      id: "Aku membela mereka mati-matian dalam perdebatan internet seolah membela anggota keluarga kandung atau pasanganku sendiri, bahkan saat mereka jelas-jelas bersalah.",
      de: "Ich verteidige sie im Internet vehement wie ein enges Familienmitglied, selbst wenn sie offensichtlich Fehler gemacht haben.",
      fr: "Je les défends farouchement dans les débats en ligne comme s'il s'agissait d'un proche ou de mon partenaire, même quand ils ont tort.",
      es: "Salgo en su defensa con ferocidad en debates de internet como si fueran mi propia familia o pareja, incluso ante errores evidentes.",
    },
  },
  // 8. Emotional Dependency & Consolation
  {
    id: 8,
    subscale: "emotional_dependency_consolation",
    text: {
      en: "I mentally consult them or imagine what they would say to me when making personal, career, or dating decisions.",
      id: "Aku sering membayangkan apa yang akan mereka katakan atau nasihatkan kepadaku saat aku harus mengambil keputusan pribadi, karier, atau asmara.",
      de: "Ich stelle mir in Gedanken vor, welchen Rat sie mir geben würden, wenn ich wichtige Entscheidungen im Beruf oder Leben treffen muss.",
      fr: "J'imagine ce qu'ils me diraient ou leurs conseils lorsque je dois prendre des décisions personnelles, professionnelles ou sentimentales.",
      es: "Me imagino mentalmente qué me aconsejarían o qué pensarían de mí al tomar decisiones importantes en mi vida personal, trabajo o relaciones.",
    },
  },
  // 9. Reality & Social Substitution
  {
    id: 9,
    subscale: "reality_social_substitution",
    text: {
      en: "Interacting with real people often feels exhausting and disappointing compared to the safe, predictable comfort of watching this creator.",
      id: "Berinteraksi dengan orang nyata di dunia nyata terasa melelahkan dan mengecewakan jika dibandingkan dengan rasa aman dan nyaman saat menonton kreator ini.",
      de: "Reale Begegnungen empfinde ich oft als anstrengend und enttäuschend im Vergleich zur sicheren, berechenbaren Nähe zu diesem Creator.",
      fr: "Côtoyer de vraies personnes me semble souvent épuisant et décevant comparé au réconfort sûr et prévisible que m'apporte ce créateur.",
      es: "Relacionarme con personas reales a menudo me parece agotador y decepcionante en comparación con la comodidad segura y predecible de ver a este creador.",
    },
  },
  // 10. Perceived Two-Way Illusion
  {
    id: 10,
    subscale: "perceived_two_way_illusion",
    text: {
      en: "I feel a strange sense of personal betrayal or jealousy if they collaborate closely with other creators or mention having an offline dating partner.",
      id: "Aku merasakan rasa cemburu atau dikhianati yang aneh saat mereka berkolaborasi akrab dengan kreator lain atau mengumumkan bahwa mereka berpacaran di dunia nyata.",
      de: "Ich spüre Eifersucht oder einen Stich von Verrat, wenn sie eng mit anderen Creatorn kooperieren oder einen realen Partner erwähnen.",
      fr: "J'éprouve une jalousie étrange ou un sentiment de trahison s'ils collaborent avec d'autres personnes ou évoquent leur vie amoureuse réelle.",
      es: "Siento unos celos extraños o una punzada de traición si colaboran de forma muy cercana con otros creadores o mencionan tener pareja real.",
    },
  },
  // 11. Emotional Dependency & Consolation
  {
    id: 11,
    subscale: "emotional_dependency_consolation",
    text: {
      en: "I keep their streams, podcasts, or VODs running constantly as background noise just to feel like another human being is present in the room with me.",
      id: "Aku menyalakan streaming, podcast, atau rekaman video mereka terus-menerus sebagai suara latar hanya agar merasa seolah ada manusia lain yang menemaniku di ruangan.",
      de: "Ich lasse ihre Streams oder Videos ununterbrochen als Hintergrundgeräusch laufen, nur um das Gefühl zu haben, nicht allein im Raum zu sein.",
      fr: "Je laisse leurs vidéos ou streams tourner en continu en fond sonore juste pour avoir l'impression qu'une présence humaine partage ma pièce.",
      es: "Dejo sus directos o vídeos puestos de fondo todo el día solo para sentir la presencia de otro ser humano en la habitación.",
    },
  },
  // 12. Reality & Social Substitution
  {
    id: 12,
    subscale: "reality_social_substitution",
    text: {
      en: "I spend more time and cognitive energy tracking their private life, controversies, and stream schedules than cultivating my own real-life goals.",
      id: "Aku menghabiskan lebih banyak waktu dan energi mental untuk memantau kehidupan pribadi, jadwal streaming, dan gosip mereka dibanding mengembangkan mimpi hidupku sendiri.",
      de: "Ich investiere mehr Zeit und Gedanken in das Privatleben und die Termine dieses Creators als in meine eigenen Lebensziele.",
      fr: "Je passe plus de temps et d'énergie mentale à suivre leur vie privée et leurs actus qu'à construire mes propres objectifs de vie.",
      es: "Invierto más tiempo y energía mental en seguir la vida privada y los horarios de este creador que en construir mis propias metas vitales.",
    },
  },
];

export const PARASOCIAL_OPTIONS = [
  {
    value: 0,
    label: {
      en: "Never / Not at all (View purely as entertainment, clear boundaries)",
      id: "Tidak Pernah (Murni hiburan biasa, batasan diri sangat jelas)",
      de: "Nie / Gar nicht (Reine Unterhaltung, klare Grenzen)",
      fr: "Jamais / Pas du tout (Divertissement classique, frontières claires)",
      es: "Nunca / Para nada (Puro entretenimiento, límites muy claros)",
    },
  },
  {
    value: 1,
    label: {
      en: "Rarely / Mild (Occasional affinity, zero illusion of personal bond)",
      id: "Jarang / Ringan (Suka kontennya, tapi sadar sepenuhnya itu hubungan satu arah)",
      de: "Selten / Mild (Sympathie vorhanden, aber völliges Bewusstsein der Einseitigkeit)",
      fr: "Rarement / Léger (Appréciation du contenu, conscience totale de la distance)",
      es: "Raras veces / Leve (Gusto por su contenido, plena conciencia de la distancia)",
    },
  },
  {
    value: 2,
    label: {
      en: "Frequently / Moderate (Noticeable attachment, stream is daily emotional comfort)",
      id: "Sering / Sedang (Ikatan emosional nyata, live stream jadi pelarian harian)",
      de: "Häufig / Moderat (Spürbare emotionale Bindung, täglicher seelischer Trost)",
      fr: "Souvent / Modéré (Attachement notable, réconfort quotidien indispensable)",
      es: "Frecuentemente / Moderado (Vínculo afectivo evidente, refugio emocional diario)",
    },
  },
  {
    value: 3,
    label: {
      en: "Constantly / Severe (Deep parasocial enmeshment, real life neglected for creator)",
      id: "Hampir Selalu / Sangat Kuat (Keterikatan parasosial intens, dunia nyata terabaikan)",
      de: "Ständig / Schwer (Tiefe parasoziale Verstrickung, reales Leben wird verdrängt)",
      fr: "Constamment / Sévère (Enchevêtrement parasocial profond, vie réelle sacrifiée)",
      es: "Constantemente / Severo (Fuerte apego parasocial, vida real descuidada por el creador)",
    },
  },
];

export const PARASOCIAL_RESULTS: ParasocialResultLevel[] = [
  {
    level: "healthy_media_entertainment",
    scoreRange: [0, 7],
    title: {
      en: "Healthy Media Consumer (Firm Reality Boundaries)",
      id: "Penikmat Media Sehat (Batasan Realitas Kokoh)",
      de: "Gesunder Medienkonsument (Stabile Realitätsgrenzen)",
      fr: "Consommateur de Médias Équilibré (Limites Claires)",
      es: "Consumidor de Medios Saludable (Límites Claros)",
    },
    badge: {
      en: "Firm Reality (0-19%)",
      id: "Batasan Realitas (0-19%)",
      de: "Stabile Realität",
      fr: "Limites Saines",
      es: "Límites Claros",
    },
    summary: {
      en: "You maintain excellent psychological boundaries between public media personalities and your genuine personal life. You enjoy content creators as entertainers or information sources, without harboring illusions of personal reciprocity or sacrificing offline relationships.",
      id: "Kamu menjaga batasan psikologis yang sangat sehat antara figur publik di internet dan kehidupan pribadimu. Kamu menikmati konten kreator sebagai sarana hiburan atau wawasan, tanpa ilusi pertemanan dua arah semu atau mengorbankan hubungan nyata.",
      de: "Sie wahren klare psychologische Grenzen zwischen Medienfiguren und Ihrem echten Leben. Sie konsumieren Inhalte zur Unterhaltung oder Information, ohne illusionäre Freundschaften aufzubauen oder reale Beziehungen zu vernachlässigen.",
      fr: "Vous maintenez d'excellentes frontières psychologiques entre les personnalités publiques et votre vie personnelle. Vous appréciez les créateurs pour leur talent ou leurs idées, sans illusion de réciprocité ni préjudice pour vos liens réels.",
      es: "Mantienes unos límites psicológicos impecables entre las figuras públicas y tu vida personal. Disfrutas de los creadores como fuente de ocio o aprendizaje, sin caer en la ilusión de una amistad recíproca ni descuidar tus relaciones reales.",
    },
    psychology: {
      en: "Horton & Wohl's Parasocial Interaction (PSI) foundational model (1956): You engage in conscious spectator engagement without parasocial attachment. Offline attachment security buffers against digital intimacy substitution.",
      id: "Model Parasocial Interaction (PSI) Horton & Wohl (1956): Kamu berinteraksi sebagai penonton yang sadar tanpa kelekatan parasosial. Kelekatan aman di dunia nyata membentengimu dari substitusi keintiman digital.",
      de: "Horton & Wohls PSI-Modell (1956): Sie agieren als reflektierter Zuschauer. Sichere reale Bindungen schützen vor digitaler Scheinnähe.",
      fr: "Modèle PSI d'origine (Horton & Wohl, 1956) : Vous consommez les contenus en spectateur conscient. Votre sécurité affective réelle vous protège des illusions numériques.",
      es: "Modelo de Interacción Parasocial de Horton & Wohl (1956): Mantienes una postura de espectador consciente. Tus vínculos reales seguros evitan la necesidad de buscar intimidad sustitutiva.",
    },
    actionProtocol: {
      en: [
        "Continue prioritizing face-to-face community and tangible social investments over screen-mediated companions.",
        "Keep appreciating creative media while recognizing the commercial and performative nature of broadcast entertainment.",
        "Maintain financial discernment by never using donations to buy personal affirmation.",
      ],
      id: [
        "Terus utamakan komunitas tatap muka dan investasi sosial nyata daripada teman virtual lewat layar.",
        "Tetap nikmati karya kreatif sembari menyadari sifat performatif dan bisnis dari dunia hiburan siaran.",
        "Pertahankan kebijaksanaan finansial dengan tidak pernah menggunakan donasi/saweran untuk membeli validasi personal.",
      ],
      de: [
        "Investieren Sie weiterhin vorrangig in reale Freundschaften statt in bildschirmvermittelte Scheinbegleiter.",
        "Genießen Sie Streams mit dem klaren Bewusstsein über den performativen und geschäftlichen Charakter der Plattformen.",
        "Wahren Sie Ihre finanzielle Unabhängigkeit ohne emotionale Spendenkäufe.",
      ],
      fr: [
        "Continuez à privilégier vos relations en chair et en os plutôt que des compagnons d'écran.",
        "Appréciez les contenus tout en gardant à l'esprit la nature scénarisée et économique des diffusions en direct.",
        "Conservez votre discernement financier en n'utilisant jamais de dons pour acheter de l'attention.",
      ],
      es: [
        "Sigue priorizando las relaciones cara a cara frente a acompañantes mediáticos virtuales.",
        "Disfruta de las emisiones comprendiendo su naturaleza comercial y de espectáculo planificado.",
        "Mantén tu prudencia financiera no recurriendo a donaciones para buscar afecto o reconocimiento.",
      ],
    },
  },
  {
    level: "casual_parasocial_affinity",
    scoreRange: [8, 14],
    title: {
      en: "Casual Parasocial Affinity (Light Comfort Attachment)",
      id: "Afinitas Parasosial Ringan (Kenyamanan Hiburan Kasual)",
      de: "Leichte parasoziale Affinität (Gewohnter Trost)",
      fr: "Affinité Parasociale Légère (Réconfort Familier)",
      es: "Afinidad Parasocial Leve (Compañía Cómoda)",
    },
    badge: {
      en: "Casual Affinity (20-39%)",
      id: "Afinitas Kasual (20-39%)",
      de: "Leichte Affinität",
      fr: "Affinité Légère",
      es: "Afinidad Leve",
    },
    summary: {
      en: "You have formed a warm, comfortable familiarity with certain creators. Their voice or jokes provide pleasant companionship during lonely evenings or chores. However, your grip on reality remains intact: you recognize that they do not know you personally, and you do not let stream schedules dictate your life.",
      id: "Kamu memiliki rasa keakraban yang hangat dengan kreator tertentu. Suara atau humor mereka menjadi teman yang menyenangkan saat malam hari yang sepi atau saat beres-beres rumah. Meski demikian, kesadaran realitasmu tetap kokoh: kamu paham betul mereka tidak mengenalmu secara pribadi, dan kamu tidak membiarkan jadwal live mereka mengatur hidupmu.",
      de: "Sie empfinden eine vertraute Sympathie für bestimmte Persönlichkeiten. Deren Streams bieten willkommene Zerstreuung bei Einsamkeit oder Hausarbeit. Ihre Realitätsprüfung bleibt jedoch stabil: Sie wissen, dass dies eine einseitige Medienbeziehung ist.",
      fr: "Vous ressentez une familiarité bienveillante envers certains créateurs. Leurs vidéos vous apportent une compagnie agréable en soirée. Pour autant, vous gardez les pieds sur terre : vous avez conscience qu'ils ne vous connaissent pas et votre quotidien reste indépendant.",
      es: "Sientes una agradable familiaridad con ciertos creadores. Su compañía resulta reconfortante durante tareas rutinarias o momentos de tranquilidad. A pesar de ello, mantienes los pies en la tierra: sabes que no te conocen personalmente y no condicionan tus planes.",
    },
    psychology: {
      en: "Rubin & Perse's Parasocial Interaction scale (1987) identifies this as functional parasocial companionship. It serves as a healthy mood-elevator as long as it supplements rather than supplants real interpersonal ties.",
      id: "Skala PSI Rubin & Perse (1987) mengidentifikasi ini sebagai persahabatan parasosial fungsional. Ini berfungsi sebagai penyegar suasana hati yang sehat selama menjadi pelengkap, bukan pengganti hubungan nyata.",
      de: "Rubin & Perse (1987): Funktionale parasoziale Begleitung. Ein unbedenklicher Stimmungsaufheller, solange reale Sozialkontakte nicht verdrängt werden.",
      fr: "Échelle de Rubin & Perse (1987) : Compagnonnage parasocial fonctionnel. C'est un régulateur d'humeur inoffensif tant qu'il complète la vie sociale sans s'y substituer.",
      es: "Escala de Rubin y Perse (1987): Compañía parasocial funcional. Funciona como un recurso lúdico mientras no desplace los lazos interpersonales reales.",
    },
    actionProtocol: {
      en: [
        "Periodically check in with yourself: 'Am I watching this because I enjoy it, or because I am avoiding confronting an empty offline schedule?'.",
        "Set device boundaries to ensure creator streams do not displace sleep hygiene or real-world conversations.",
        "Reflect on what qualities you admire in the creator and cultivate those exact qualities in yourself and your offline friendships.",
      ],
      id: [
        "Secara berkala tanyakan pada diri sendiri: 'Apakah aku menonton ini karena murni terhibur, atau karena menghindari rasa hampa di dunia nyata?'.",
        "Buat batasan perangkat agar siaran kreator tidak mengganggu jam tidur malam atau interaksi dengan orang terdekat.",
        "Renungkan kualitas positif apa yang kamu kagumi dari kreator tersebut, lalu kembangkan kualitas itu dalam dirimu dan lingkaran teman nyatamu.",
      ],
      de: [
        "Hinterfragen Sie sich gelegentlich: 'Schaue ich aus Freude zu oder weiche ich der Leere in meinem Alltag aus?'.",
        "Legen Sie feste Bildschirmzeiten fest, damit Streams weder Ihren Schlaf noch echte Begegnungen einschränken.",
        "Überlegen Sie, welche Eigenschaften Sie an der Person bewundern, und entwickeln Sie diese gezielt in Ihrem eigenen Leben.",
      ],
      fr: [
        "Posez-vous la question : 'Est-ce que je regarde ce stream par plaisir ou pour éviter le vide de mon emploi du temps ?'.",
        "Fixez des limites d'écran pour ne pas empiéter sur votre sommeil ni sur vos conversations réelles.",
        "Identifiez les traits de caractère que vous admirez chez ce créateur pour les développer dans votre propre vie.",
      ],
      es: [
        "Pregúntate con sinceridad: '¿Veo este directo por puro ocio o para evitar enfrentar la soledad en mi día a día?'.",
        "Establece horarios de apagado para que las emisiones no invadan tus horas de sueño ni tus relaciones presenciales.",
        "Analiza las virtudes que admiras en ese creador e intégralas en tu propia personalidad y proyectos.",
      ],
    },
  },
  {
    level: "moderate_parasocial_bond",
    scoreRange: [15, 21],
    title: {
      en: "Moderate Parasocial Bond (Emotional Reliance & Comfort)",
      id: "Ikatan Parasosial Sedang (Ketergantungan Emosional & Kenyamanan)",
      de: "Moderate parasoziale Bindung (Emotionale Abhängigkeit & Trost)",
      fr: "Lien Parasocial Modéré (Dépendance Émotionnelle & Refuge)",
      es: "Vínculo Parasocial Moderado (Apoyo Emocional Sustitutivo)",
    },
    badge: {
      en: "Moderate Attachment (40-59%)",
      id: "Kelekatan Sedang (40-59%)",
      de: "Moderate Bindung",
      fr: "Attachement Modéré",
      es: "Apego Moderado",
    },
    summary: {
      en: "You have developed a deep emotional attachment to a specific creator or streamer. When you feel lonely, anxious, or unloved, their presence serves as your primary emotional pacifier. You may feel a subtle sense of reciprocity, defend them intensely, or experience mild distress when they are offline for extended periods.",
      id: "Kamu telah mengembangkan kelekatan emosional yang cukup mendalam terhadap kreator atau streamer tertentu. Saat merasa kesepian, cemas, atau kurang dipedulikan, kehadiran mereka menjadi pelipur lara utamamu. Kamu mungkin merasakan ilusi kedekatan timbal balik, membela mereka dengan gigih, atau merasa resah saat mereka libur streaming lama.",
      de: "Sie haben eine beachtliche emotionale Bindung zu einem bestimmten Creator aufgebaut. Bei Einsamkeit oder seelischer Belastung dient dessen Präsenz als primärer Trostspender. Es entsteht eine subtile Illusion von Gegenseitigkeit und Unruhe bei längeren Sendepausen.",
      fr: "Vous avez tissé un attachement émotionnel marqué avec un streamer en particulier. En cas de coup dur ou de solitude, ses contenus sont votre refuge quasi exclusif. Une subtile illusion de réciprocité s'installe et ses absences prolongées vous déstabilisent.",
      es: "Has desarrollado un apego emocional significativo hacia un creador o streamer concreto. En momentos de soledad o tristeza, su contenido es tu principal analgésico emocional. Comienzas a experimentar una sutil ilusión de cercanía personal y malestar si interrumpe sus emisiones.",
    },
    psychology: {
      en: "Giles & Maltby's Parasocial Taxonomy (2004) characterizes this as 'Intense-Personal' parasocial tendency. The viewer projects reciprocal friendship onto an asynchronous media figure, often compensating for unmet relational needs in the physical world.",
      id: "Taksonomi Parasosial Giles & Maltby (2004) menggolongkan ini sebagai kecenderungan parasosial 'Intens-Personal'. Penonton memproyeksikan persahabatan timbal balik pada figur media satu arah, yang sering kali merupakan kompensasi atas kebutuhan relasi yang belum terpenuhi di dunia nyata.",
      de: "Giles & Maltby (2004): 'Intensiv-persönliche' Bindungsebene. Reale Beziehungsdefizite werden durch eine asymmetrische Medienfigur kompensiert.",
      fr: "Classification de Giles & Maltby (2004) : Dimension 'intense-personnelle'. L'usager projette un lien réciproque sur une figure virtuelle pour combler un manque affectif réel.",
      es: "Taxonomía de Giles y Maltby (2004): Dimensión 'Intensa-Personal'. Se proyecta una amistad bilateral sobre un comunicador unidireccional para llenar vacíos afectivos del entorno presencial.",
    },
    actionProtocol: {
      en: [
        "Acknowledge the Relational Void: Recognize that strong parasocial yearning is usually a symptom of real-world loneliness or social anxiety, not an actual romantic or personal bond.",
        "Implement a 'One-In, One-Out' Social Rule: For every hour spent consuming your favorite creator's streams, spend one hour interacting with someone in real life or pursuing a personal offline hobby.",
        "Stop Superchatting for Validation: Cease spending financial resources to get shoutouts or emotional reactions from streamers; reallocate those funds into offline self-care or experiences.",
      ],
      id: [
        "Akui Kekosongan Relasi: Sadari bahwa kerinduan parasosial yang kuat biasanya merupakan gejala kesepian atau kecemasan sosial di dunia nyata, bukan ikatan persahabatan nyata.",
        "Terapkan Aturan Sosial 'Satu Masuk, Satu Keluar': Untuk setiap 1 jam menonton streaming kreator favorit, wajibkan dirimu meluangkan 1 jam untuk berinteraksi dengan orang nyata atau mengasah hobi offline.",
        "Hentikan Saweran Demi Validasi: Berhenti mengeluarkan uang hanya demi disapa atau mendapat reaksi emosional dari streamer; alihkan uang tersebut untuk perawatan diri atau pengalaman di dunia nyata.",
      ],
      de: [
        "Erkennen Sie das reale Defizit an: Starke parasoziale Sehnsucht entspringt meist realer Einsamkeit, nicht einer tatsächlichen Freundschaft.",
        "Die 1:1-Regel: Für jede Stunde Stream-Konsum verbringen Sie eine Stunde mit echten Menschen oder einem analogen Hobby.",
        "Keine Spenden für Bestätigung: Nutzen Sie Superchats nicht mehr für emotionale Zuwendung und investieren Sie das Geld in Ihr reales Leben.",
      ],
      fr: [
        "Identifiez le manque sous-jacent : Ce lien virtuel est souvent le reflet d'une solitude ou d'une anxiété sociale bien réelle.",
        "Appliquez la règle du 1 pour 1 : Pour chaque heure passée devant un stream, consacrez une heure à un échange réel ou à une activité hors écran.",
        "Cessez les dons pour obtenir de l'attention : Ne dépensez plus d'argent pour entendre votre pseudo prononcé en direct.",
      ],
      es: [
        "Identifica la necesidad real de fondo: La dependencia parasocial suele encubrir aislamiento o ansiedad social presencial.",
        "Regla de equivalencia social 1 a 1: Por cada hora que pases viendo a ese creador, dedica una hora a compartir tiempo con personas reales o a una afición analógica.",
        "Elimina las donaciones por validación: Deja de enviar dinero buscando que lean tu mensaje; invierte esos recursos en tu propia vida.",
      ],
    },
  },
  {
    level: "high_parasocial_dependency",
    scoreRange: [22, 28],
    title: {
      en: "High Parasocial Dependency (Social Displacement & Enmeshment)",
      id: "Ketergantungan Parasosial Tinggi (Penggantian Relasi & Keterikatan Dalam)",
      de: "Hohe parasoziale Abhängigkeit (Soziale Verdrängung & Verstrickung)",
      fr: "Forte Dépendance Parasociale (Substitution Sociale & Fusion)",
      es: "Alta Dependencia Parasocial (Sustitución Social y Enredo Emocional)",
    },
    badge: {
      en: "High Parasocial Dependency (60-79%)",
      id: "Ketergantungan Tinggi (60-79%)",
      de: "Starke Abhängigkeit",
      fr: "Forte Dépendance",
      es: "Alta Dependencia",
    },
    summary: {
      en: "You have substituted offline human intimacy with an intense, one-sided media attachment. You feel as though you genuinely know the creator on an intimate soul level, schedule your life around their streams, experience jealousy toward their real-life partners, and feel hollow, anxious, or abandoned when they do not stream.",
      id: "Kamu telah mengganti keintiman relasi manusia di dunia nyata dengan kelekatan satu arah yang intens pada figur media. Kamu merasa seolah benar-benar mengenal kreator tersebut dari jiwa ke jiwa, menyusun jadwal hidup demi menonton mereka, merasa cemburu terhadap pasangan hidup asli mereka, dan merasa hampa, cemas, atau serasa ditinggalkan saat mereka tidak streaming.",
      de: "Sie haben reale zwischenmenschliche Nähe weitgehend durch eine einseitige Medienbindung ersetzt. Sie glauben, den Creator auf Seelenebene zu kennen, richten Ihren Tagesablauf nach dessen Sendezeiten aus, empfinden Eifersucht auf dessen reale Partner und fühlen sich bei Abwesenheit verlassen.",
      fr: "Vous avez substitué les relations humaines réelles par un attachement médiatique unilatéral très intense. Vous avez l'intime conviction de connaître ce créateur en profondeur, adaptez votre vie à ses horaires de stream, ressentez de la jalousie envers son entourage et souffrez d'un profond sentiment d'abandon en son absence.",
      es: "Has reemplazado la intimidad presencial por un vínculo mediático unidireccional desmedido. Sientes que conoces al creador en lo más íntimo, adaptas tus horarios a sus transmisiones, sientes celos de su vida amorosa real y experimentas una sensación de abandono cuando no emite.",
    },
    psychology: {
      en: "Stever (2011) and Tukachinsky et al. (2020) emphasize that high parasocial attachment activates the neurobiological attachment circuitry (oxytocin and dopamine pathways) normally reserved for reciprocal romantic or kinship bonds, creating severe cognitive dissonance and social isolation.",
      id: "Stever (2011) dan Tukachinsky et al. (2020) menekankan bahwa kelekatan parasosial tingkat tinggi mengaktifkan sirkuit kelekatan neurobiologis (jalur oksitosin dan dopamin) yang biasanya disediakan untuk hubungan romantis atau keluarga nyata, memicu disonansi kognitif berat dan isolasi sosial.",
      de: "Stever (2011) / Tukachinsky et al. (2020): Hochgradige parasoziale Bindung nutzt biologische Bindungsschaltkreise (Oxytocin/Dopamin), die für echte Partnerschaften bestimmt sind. Dies führt zu kognitiver Dissonanz und Rückzug.",
      fr: "Recherches de Stever et Tukachinsky : L'attachement parasocial intense active les circuits neurobiologiques de l'attachement (ocytocine, dopamine) normalement réservés aux liens réciproques, provoquant un isolement majeur.",
      es: "Stever (2011) y Tukachinsky (2020): El apego parasocial elevado activa las vías neurobiológicas del apego íntimo (oxitocina y dopamina), generando aislamiento crónico y una profunda distorsión de la reciprocidad afectiva.",
    },
    actionProtocol: {
      en: [
        "Execute a 7-Day Complete Media Fast: Completely unfollow or block notifications from the creator for one full week to allow hyperstimulated attachment circuitry to reset.",
        "Reframe the Financial & Commercial Reality: Remind yourself daily: 'This creator runs a broadcast business. Their friendly smile, eye contact, and chat interactions are professional content, not personal affection.'",
        "Join Reciprocal Offline Groups: Re-enter the physical world by joining interest clubs, volunteering, team sports, or hobby workshops where real eye contact and mutual conversation occur.",
        "Consult a Therapist for Social Anxiety or Attachment Wounds: Explore underlying attachment trauma or interpersonal avoidance with a licensed counselor.",
      ],
      id: [
        "Lakukan Puasa Media Total Selama 7 Hari: Berhenti mengikuti (unfollow) sementara atau matikan seluruh notifikasi kreator tersebut selama 1 minggu penuh untuk me-reset sirkuit kelekatan otakmu.",
        "Bingkai Ulang Realitas Komersial: Ingatkan dirimu setiap hari: 'Kreator ini mengelola bisnis hiburan. Senyuman ramah, kontak mata ke kamera, dan sapaan chat adalah konten profesional, bukan cinta personal.'",
        "Masuk ke Komunitas Nyata Timbal Balik: Masuki kembali dunia nyata dengan bergabung ke komunitas hobi, olahraga kelompok, atau kerelawanan di mana ada tatap muka asli dan obrolan dua arah yang setara.",
        "Konsultasi Terapi untuk Luka Kelekatan: Eksplorasi akar kecemasan sosial atau trauma relasi masa lalu bersama psikolog profesional.",
      ],
      de: [
        "7-tägiges Creator-Fasten: Entfolgen oder stummschalten Sie den Creator für mindestens eine Woche, um das neuronale Belohnungssystem zu beruhigen.",
        "Kaufmännische Realität vergegenwärtigen: Verinnerlichen Sie täglich: 'Das ist ein Medienunternehmen. Freundliche Worte und Kamerablicke sind bezahlte Inszenierung, keine private Liebe.'",
        "Echte soziale Räume betreten: Suchen Sie reale Gemeinschaften auf (Sportverein, Ehrenamt, Kurse), um wieder unmittelbare Begegnungen zu erleben.",
        "Therapeutische Unterstützung: Bearbeiten Sie zugrundeliegende soziale Ängste oder Bindungsverletzungen mit einem Therapeuten.",
      ],
      fr: [
        "Jeûne médiatique de 7 jours : Désabonnez-vous ou coupez toutes les notifications pendant une semaine entière pour désensibiliser votre cerveau.",
        "Rappelez-vous la réalité économique : Répétez-vous chaque jour : 'Il s'agit d'une entreprise de divertissement. La sympathie affichée relève d'une mise en scène professionnelle.'",
        "Rejoignez des groupes réels : Inscrivez-vous à des activités physiques ou associatives pour retrouver le plaisir de conversations équilibrées en face à face.",
        "Consultez un thérapeute : Travaillez sur votre anxiété sociale ou vos blessures d'attachement avec un professionnel de l'écoute.",
      ],
      es: [
        "Ayuno mediático de 7 días: Silencia o deja de seguir al creador durante una semana completa para desintoxicar las vías neurobiológicas del apego.",
        "Recuerda la realidad mercantil: Repítete a diario: 'Esto es un negocio de entretenimiento. Su cercanía ante la cámara es su trabajo, no un afecto privado hacia mí'.",
        "Involúcrate en entornos presenciales: Apúntate a talleres, actividades deportivas o voluntariados donde exista diálogo mutuo cara a cara.",
        "Busca ayuda psicoterapéutica: Aborda con un terapeuta profesional el aislamiento social o las heridas de apego que originan este refugio.",
      ],
    },
  },
  {
    level: "acute_parasocial_absorption_enmeshment",
    scoreRange: [29, 36],
    title: {
      en: "Acute Parasocial Absorption (Compulsive Reality Displacement)",
      id: "Absorpsi Parasosial Akut (Penggantian Realitas Kompulsif)",
      de: "Akute parasoziale Absorption (Kompulsive Realitätsverdrängung)",
      fr: "Absorption Parasociale Aiguë (Délitement de la Réalité)",
      es: "Absorción Parasocial Aguda (Desconexión de la Realidad Real)",
    },
    badge: {
      en: "Acute Absorption (80-100%)",
      id: "Absorpsi Akut (80-100%)",
      de: "Akute Absorption",
      fr: "Absorption Aiguë",
      es: "Absorción Aguda",
    },
    summary: {
      en: "You are experiencing extreme, borderline-delusional parasocial absorption. You treat this media personality as your central partner or soulmate, prioritizing their digital presence over basic offline living, financial health, and genuine human relationships. Reality and entertainment have completely blurred, putting you at severe risk of profound emotional collapse.",
      id: "Kamu sedang mengalami absorpsi parasosial ekstrem yang mendekati fusi emosional semu. Kamu memperlakukan figur media ini sebagai pasangan inti atau belahan jiwamu, memprioritaskan kehadiran digital mereka di atas kebutuhan hidup dasar di dunia nyata, kesehatan finansial, dan hubungan manusiawi sejati. Batas antara realitas dan hiburan telah lebur secara berbahaya.",
      de: "Sie befinden sich in einer extremen parasozialen Absorptionsphase. Sie behandeln diese Kunstfigur als Ihren Lebenspartner oder Seelenverwandten und ordnen Ihr gesamtes reales Leben, Ihre Finanzen und echten Bindungen diesem digitalen Phantom unter. Realität und Illusion verschwimmen bedenklich.",
      fr: "Vous traversez une absorption parasociale extrême frôlant la fusion délirante. Vous considérez cette personnalité comme votre partenaire de vie ou votre âme sœur, négligeant vos besoins fondamentaux, vos finances et tout lien réel. Les frontières entre le réel et le spectacle sont totalement abolies.",
      es: "Te encuentras en una fase de absorción parasocial extrema con pérdida de límites objetivos. Consideras a este creador como tu pareja o alma gemela, supeditando tu vida básica, tu economía y tus relaciones reales a su presencia en pantalla. La línea entre realidad y ficción se ha desdibujado de forma crítica.",
    },
    psychology: {
      en: "McCutcheon, Lange & Houran's Celebrity Worship Scale (CWS) borderline-pathological category: The individual displays compulsive empathy, excessive financial expenditure, and distress mirroring erotic/attachment delusions, requiring urgent clinical boundary reconstruction.",
      id: "Kategori borderline-patologis Celebrity Worship Scale (CWS) McCutcheon, Lange & Houran: Individu menunjukkan empati kompulsif, pengeluaran finansial berlebih, dan penderitaan mendalam yang mencerminkan delusi kelekatan, menuntut rekonstruksi batasan klinis yang mendesak.",
      de: "CWS-Modell nach McCutcheon et al.: Borderline-pathologische Stufe. Exzessive Identifikation, zwanghafte Ausgaben und quälende Eifersucht erfordern professionelle therapeutische Grenzziehung.",
      fr: "Échelle de McCutcheon (CWS) au stade limite-pathologique : Fusion compulsive, dépenses disproportionnées et souffrance intolérable nécessitant une reconstruction clinique urgente de la réalité.",
      es: "Escala de McCutcheon (CWS) en nivel patológico: Identificación obsesiva, derroche económico y angustia desgarradora que exigen una intervención psicológica urgente para restablecer el principio de realidad.",
    },
    actionProtocol: {
      en: [
        "Emergency Digital Detox: Immediately remove the creator's apps, Discord servers, and stream bookmarks. Ask an offline trusted friend or family member to help lock parental/app controls.",
        "Radical Reality Shock: Look into a physical mirror and repeat: 'I am here in the real room. They are a broadcast performer who does not know my name, voice, or face.'",
        "Financial Freeze: Cancel all automatic subscriptions, memberships, Patreon/Patreon-style pledges, and channel badges immediately.",
        "Urgent Clinical Care: Seek guidance from a licensed clinical psychologist or psychiatrist to address the profound emotional isolation, trauma, or depression underlying this parasocial substitution.",
      ],
      id: [
        "Detoks Digital Darurat: Segera hapus aplikasi, server Discord, dan bookmark live stream kreator tersebut. Minta bantuan teman atau keluarga tepercaya untuk mengunci kontrol akses di perangkatmu.",
        "Penyadaran Realitas Radikal: Tatap cermin fisik dan katakan dengan tegas: 'Aku berada di kamar nyata ini. Dia adalah pelaku industri hiburan yang tidak mengetahui nama, suara, atau wajah asliku.'",
        "Bekukan Finansial: Batalkan semua langganan membership otomatis, saweran berkala, dan fasilitas VIP segera detik ini juga.",
        "Perawatan Klinis Mendesak: Cari bantuan dari psikolog klinis atau psikiater berlisensi untuk menyembuhkan luka isolasi emosional, trauma kelekatan, atau depresi yang menjadi akar pelarian ekstrem ini.",
      ],
      de: [
        "Digitaler Notfall-Stopp: Deinstallieren Sie sofort Streaming-Apps, Discord-Server und Lesezeichen. Lassen Sie sich von einer Vertrauensperson App-Sperren einrichten.",
        "Radikale Konfrontation mit der Realität: Schauen Sie in den Spiegel und sagen Sie laut: 'Ich bin in meinem echten Zimmer. Diese Person kennt weder meinen Namen noch mein Gesicht.'",
        "Finanziellen Riegel vorschieben: Kündigen Sie alle laufenden Abos, Kanalmitgliedschaften und Spenden sofort.",
        "Dringende professionelle Begleitung: Nehmen Sie umgehend Kontakt zu einem Psychotherapeuten auf, um die dahinterliegende Einsamkeit oder seelische Not aufzuarbeiten.",
      ],
      fr: [
        "Coupure numérique immédiate : Supprimez les applications de stream, les serveurs Discord et activez des verrous parentaux avec l'aide d'un proche.",
        "Rappel à la réalité : Regardez-vous dans un miroir et dites à voix haute : 'Je suis dans le monde réel. Cette personne est un professionnel qui ignore mon existence.'",
        "Arrêt financier total : Résiliez sur-le-champ tous les abonnements payants, VIP et prélèvements automatiques.",
        "Soutien psychologique d'urgence : Consultez rapidement un psychologue clinicien ou un psychiatre pour traiter la détresse affective et l'isolement profond qui nourrissent ce refuge.",
      ],
      es: [
        "Corte digital de emergencia: Desinstala de inmediato las aplicaciones de transmisión, servidores de chat y pide a alguien de confianza que bloquee el acceso.",
        "Choque con la realidad tangible: Mírate al espejo y pronuncia en voz alta: 'Estoy en mi habitación real. Esa persona es un comunicador que no conoce mi nombre ni mi rostro'.",
        "Cancelación económica tajante: Cancela en este momento todas las membresías de pago, suscripciones VIP y donaciones periódicas.",
        "Atención clínica prioritaria: Acude sin demora a un psicólogo clínico o psiquiatra para sanar el trauma, la soledad y la depresión profunda que sostienen este refugio.",
      ],
    },
  },
];

export const PARASOCIAL_SUBSCALE_INFO = {
  perceived_two_way_illusion: {
    name: {
      en: "Perceived Two-Way Illusion",
      id: "Ilusi Hubungan Timbal Balik",
      de: "Illusion von Gegenseitigkeit",
      fr: "Illusion de Réciprocité",
      es: "Ilusión de Reciprocidad Personal",
    },
    description: {
      en: "Feeling personally recognized, addressed, or uniquely understood by a media figure through camera gaze, chat reads, or broadcast intimacy.",
      id: "Merasa dikenal secara pribadi, disapa, atau dipahami secara mendalam oleh figur media lewat tatapan kamera dan interaksi siaran.",
      de: "Das subjektive Gefühl, vom Streamer persönlich gemeint, erkannt oder besser als von realen Menschen verstanden zu werden.",
      fr: "Le sentiment d'être personnellement reconnu, interpellé ou compris de façon privilégiée par une figure médiatique.",
      es: "Sentimiento subjetivo de ser reconocido, escuchado o comprendido personalmente por el comunicador a través de la pantalla.",
    },
  },
  emotional_dependency_consolation: {
    name: {
      en: "Emotional Dependency & Consolation",
      id: "Ketergantungan Emosional & Pelipur Lara",
      de: "Emotionale Abhängigkeit & Trostfunktion",
      fr: "Dépendance Émotionnelle & Réconfort",
      es: "Dependencia Emocional y Consuelo",
    },
    description: {
      en: "Relying exclusively on stream presence for mood regulation, loneliness relief, and feeling acute distress when the creator is absent.",
      id: "Bergantung sepenuhnya pada konten siaran untuk menenangkan emosi, mengatasi kesepian, dan merasa gelisah saat kreator tersebut absen.",
      de: "Ausschließliche Nutzung des Contents zur Stimmungsregulation; Auftreten von Verlassenheitsängsten bei Pausen des Creators.",
      fr: "Dépendance quasi totale aux streams pour calmer l'angoisse et réguler l'humeur, avec détresse marquée en cas d'absence.",
      es: "Uso exclusivo de las emisiones para regular el estado de ánimo, con notable angustia o vacío si el creador no transmite.",
    },
  },
  reality_social_substitution: {
    name: {
      en: "Reality & Social Substitution",
      id: "Substitusi Kehidupan Nyata & Sosial",
      de: "Verdrängung des realen Soziallebens",
      fr: "Substitution de la Vie Réelle & Sociale",
      es: "Sustitución de la Vida Social y Real",
    },
    description: {
      en: "Canceling offline commitments, depleting finances for creator attention, and preferring digital pseudo-intimacy over reciprocal human ties.",
      id: "Membatalkan janji di dunia nyata, mengorbankan uang demi perhatian kreator, dan lebih memilih keintiman semu daripada hubungan manusia nyata.",
      de: "Absagen realer Verabredungen, finanzielle Belastung für Creator-Beachtung und Bevorzugung digitaler Scheinnähe vor echten Menschen.",
      fr: "Annulation d'engagements réels, dépenses déraisonnables pour être remarqué et rejet des interactions en face à face.",
      es: "Cancelación de planes presenciales, sacrificios económicos por atención y preferencia de la pseudo-intimidad sobre la reciprocidad real.",
    },
  },
};

export function getParasocialResult(totalScore: number): ParasocialResultLevel {
  const clamped = Math.max(0, Math.min(36, totalScore));
  return (
    PARASOCIAL_RESULTS.find(
      (r) => clamped >= r.scoreRange[0] && clamped <= r.scoreRange[1]
    ) || PARASOCIAL_RESULTS[0]
  );
}

export function calculateParasocialSubscales(answers: Record<number, number>): {
  perceived_two_way_illusion: number;
  emotional_dependency_consolation: number;
  reality_social_substitution: number;
} {
  let pti = 0;
  let edc = 0;
  let rss = 0;

  PARASOCIAL_QUESTIONS.forEach((q) => {
    const score = answers[q.id] ?? 0;
    if (q.subscale === "perceived_two_way_illusion") pti += score;
    if (q.subscale === "emotional_dependency_consolation") edc += score;
    if (q.subscale === "reality_social_substitution") rss += score;
  });

  return {
    perceived_two_way_illusion: pti,
    emotional_dependency_consolation: edc,
    reality_social_substitution: rss,
  };
}
