export type FawnResponseLang = "en" | "id" | "de" | "fr" | "es";

export type FawnSubscale =
  | "compulsive_appeasement"
  | "identity_erasure"
  | "post_fawn_resentment";

export interface FawnResponseQuestion {
  id: number;
  subscale: FawnSubscale;
  prompt: Record<FawnResponseLang, string>;
  options: {
    label: Record<FawnResponseLang, string>;
    score: number; // 0 to 3
  }[];
}

export interface FawnArchetypeProfile {
  level: "low_fawn" | "moderate_appeasement" | "chronic_fawn" | "severe_identity_collapse";
  badge: Record<FawnResponseLang, string>;
  title: Record<FawnResponseLang, string>;
  tagline: Record<FawnResponseLang, string>;
  description: Record<FawnResponseLang, string>;
  psychologyInsight: Record<FawnResponseLang, string>;
  actionProtocols: Record<FawnResponseLang, string[]>;
  dailyAffirmation: Record<FawnResponseLang, string>;
}

export interface FawnResponseScoreResult {
  totalScore: number;
  maxScore: number;
  percentage: number;
  level: "low_fawn" | "moderate_appeasement" | "chronic_fawn" | "severe_identity_collapse";
  subscales: {
    compulsive_appeasement: { score: number; max: number; percentage: number };
    identity_erasure: { score: number; max: number; percentage: number };
    post_fawn_resentment: { score: number; max: number; percentage: number };
  };
  profile: FawnArchetypeProfile;
}

export const FAWN_RESPONSE_QUESTIONS: FawnResponseQuestion[] = [
  // Subscale 1: Compulsive Appeasement & Conflict De-escalation (Q1 - Q4)
  {
    id: 1,
    subscale: "compulsive_appeasement",
    prompt: {
      en: "When someone is visibly angry or irritated, my immediate instinct is to smile, flatter, or apologize—even if the issue has nothing to do with me.",
      id: "Ketika seseorang terlihat marah atau kesal, insting pertamaku adalah tersenyum, memuji, atau meminta maaf—meski masalahnya bukan karena diriku.",
      de: "Wenn jemand sichtlich verärgert ist, lächle, schmeichle oder entschuldige ich mich reflexartig – selbst wenn ich nichts damit zu tun habe.",
      fr: "Lorsque quelqu'un est visiblement agacé, mon premier réflexe est de sourire, flatter ou m'excuser, même si je n'y suis pour rien.",
      es: "Cuando alguien está visiblemente enojado, mi instinto inmediato es sonreír, adular o pedir disculpas, incluso si no tengo nada que ver.",
    },
    options: [
      {
        score: 0,
        label: {
          en: "Rarely or never; I remain grounded without taking on their mood",
          id: "Jarang atau tidak pernah; saya tetap tenang tanpa menyerap emosi mereka",
          de: "Selten oder nie; ich bleibe gelassen, ohne ihre Laune zu übernehmen",
          fr: "Rarement ou jamais; je reste calme sans absorber leur humeur",
          es: "Rara vez o nunca; mantengo la calma sin absorber su estado de ánimo",
        },
      },
      {
        score: 1,
        label: {
          en: "Sometimes; I feel mildly uncomfortable and try to smooth things over",
          id: "Kadang-kadang; saya merasa agak tidak nyaman dan berusaha mencairkan suasana",
          de: "Manchmal; ich fühle mich leicht unwohl und versuche zu vermitteln",
          fr: "Parfois; je me sens mal à l'aise et tente d'apaiser l'ambiance",
          es: "A veces; me siento algo incómodo e intento suavizar las cosas",
        },
      },
      {
        score: 2,
        label: {
          en: "Frequently; I tense up and automatically adopt a cheerful, submissive demeanor",
          id: "Sering; tubuhku tegang dan otomatis bersikap sangat ramah serta tunduk",
          de: "Häufig; ich verspanne mich und nehme eine heitere, unterwürfige Haltung ein",
          fr: "Souvent; je me crispe et adopte une attitude enjouée et soumise",
          es: "Frecuentemente; me tenso y adopto una actitud complaciente y sumisa",
        },
      },
      {
        score: 3,
        label: {
          en: "Almost always; my nervous system panics until I make them smile or reassure me",
          id: "Hampir selalu; sistem sarafku panik sampai berhasil membuat mereka tenang atau tersenyum",
          de: "Fast immer; mein Nervensystem gerät in Panik, bis sie mich beruhigen",
          fr: "Presque toujours; mon système nerveux panique tant qu'ils ne sourient pas",
          es: "Casi siempre; mi sistema nervioso entra en pánico hasta verlos calmarse",
        },
      },
    ],
  },
  {
    id: 2,
    subscale: "compulsive_appeasement",
    prompt: {
      en: "I find myself apologizing profusely for normal requests, asking a question, or taking up physical space.",
      id: "Aku mendapati diriku berulang kali meminta maaf hanya untuk hal sepele, mengajukan pertanyaan, atau saat berada di ruangan.",
      de: "Ich entschuldige mich ständig für normale Anliegen, Fragen oder schlicht dafür, Raum einzunehmen.",
      fr: "Je m'excuse continuellement pour des requêtes normales, poser une question ou simplement exister dans la pièce.",
      es: "Me disculpo constantemente por peticiones normales, hacer preguntas o simplemente ocupar espacio.",
    },
    options: [
      {
        score: 0,
        label: {
          en: "Never; I say excuse me politely without self-diminishment",
          id: "Tidak pernah; saya meminta tolong secara sopan tanpa merendahkan diri",
          de: "Nie; ich bleibe höflich, ohne mich selbst herabzusetzen",
          fr: "Jamais; je reste poli sans me diminuer",
          es: "Nunca; soy cortés sin rebajarme",
        },
      },
      {
        score: 1,
        label: {
          en: "Occasionally; mostly in formal or high-stakes professional settings",
          id: "Sesekali; terutama dalam situasi formal atau bertemu atasan",
          de: "Gelegentlich; vor allem in formellen oder hierarchischen Situationen",
          fr: "Occasionnellement; surtout en milieu hiérarchique ou formel",
          es: "Ocasionalmente; sobre todo en entornos formales o de autoridad",
        },
      },
      {
        score: 2,
        label: {
          en: "Often; 'Sorry' is my default reflex before speaking my mind",
          id: "Sering; kata 'Maaf' adalah refleks otomatis sebelum aku menyampaikan opini",
          de: "Oft; 'Entschuldigung' ist mein Reflex, bevor ich meine Meinung äußere",
          fr: "Souvent; 'Pardon' est mon premier mot avant d'exprimer un avis",
          es: "A menudo; 'Perdón' es mi reflejo antes de expresar mi opinión",
        },
      },
      {
        score: 3,
        label: {
          en: "Constantly; I feel an underlying guilt simply for existing or having basic needs",
          id: "Terus-menerus; aku merasa bersalah hanya karena punya kebutuhan hidup dasar",
          de: "Ständig; ich fühle eine Grundschuld allein dafür, eigene Bedürfnisse zu haben",
          fr: "Constamment; je me sens coupable d'exister ou d'avoir des besoins vitaux",
          es: "Constantemente; siento culpa por existir o expresar necesidades elementales",
        },
      },
    ],
  },
  {
    id: 3,
    subscale: "compulsive_appeasement",
    prompt: {
      en: "I agree with opinions I vehemently disagree with to prevent tension or keep the other person comfortable.",
      id: "Aku mengangguk setuju pada opini yang sebenarnya sangat kutentang demi mencegah ketegangan atau membuat orang lain nyaman.",
      de: "Ich stimme Ansichten zu, die ich ablehne, nur um Konflikte zu vermeiden und mein Gegenüber zu beruhigen.",
      fr: "J'acquiesce à des propos avec lesquels je suis en désaccord total pour préserver la paix et l'harmonie.",
      es: "Asiento ante opiniones con las que estoy en desacuerdo solo para evitar tensión y que el otro esté cómodo.",
    },
    options: [
      {
        score: 0,
        label: {
          en: "Rarely; I can respectfully voice a divergent perspective",
          id: "Jarang; saya mampu menyampaikan perbedaan pandangan secara santun",
          de: "Selten; ich kann respektvoll eine abweichende Meinung vertreten",
          fr: "Rarement; je peux exprimer poliment une divergence de vue",
          es: "Rara vez; puedo expresar una opinión discrepante con respeto",
        },
      },
      {
        score: 1,
        label: {
          en: "Sometimes; with volatile or dominant personalities",
          id: "Kadang-kadang; saat berhadapan dengan orang dominan atau mudah meledak",
          de: "Manchmal; bei sehr dominanten oder impulsiven Persönlichkeiten",
          fr: "Parfois; face à des personnalités très autoritaires ou colériques",
          es: "A veces; ante personalidades dominantes o temperamentales",
        },
      },
      {
        score: 2,
        label: {
          en: "Frequently; disagreement feels dangerous so I nod and validate them",
          id: "Sering; perbedaan pendapat terasa berbahaya sehingga aku memilih mengangguk",
          de: "Häufig; Dissens fühlt sich bedrohlich an, also nicke ich bestätigend",
          fr: "Souvent; le désaccord m'angoisse, alors j'approuve machinalement",
          es: "Frecuentemente; discrepar me asusta, así que asiento y valido",
        },
      },
      {
        score: 3,
        label: {
          en: "Almost always; I chameleon my entire personality and moral stance to match whoever I am with",
          id: "Hampir selalu; aku seperti bunglon yang mengubah seluruh opini dan jati diri sesuai lawan bicara",
          de: "Fast immer; ich wandle mich chamäleonartig und passe alle Werte meinem Gegenüber an",
          fr: "Presque toujours; j'efface complètement mes valeurs pour devenir le miroir de l'autre",
          es: "Casi siempre; soy un camaleón que altera opiniones y valores para encajar",
        },
      },
    ],
  },
  {
    id: 4,
    subscale: "compulsive_appeasement",
    prompt: {
      en: "If someone crosses my boundaries, my reflex is to comfort THEM or make excuses for their disrespectful behavior.",
      id: "Jika seseorang melanggar batasanku, refleks pertamaku adalah menghibur MEREKA atau mencari alasan pembenaran atas perlakuan buruknya.",
      de: "Wenn jemand meine Grenzen verletzt, tröste ich reflexartig DIESE Person oder rechtfertige ihr Verhalten.",
      fr: "Quand quelqu'un franchit mes limites, mon réflexe est de LE réconforter ou de trouver des excuses à son impolitesse.",
      es: "Si alguien traspasa mis límites, mi reflejo es consolarlo a ÉL o justificar su falta de respeto.",
    },
    options: [
      {
        score: 0,
        label: {
          en: "Not at all; I hold healthy boundaries and address violations directly",
          id: "Tidak sama sekali; saya memegang batas sehat dan menegur jika dilanggar",
          de: "Gar nicht; ich halte gesunde Grenzen und spreche Grenzüberschreitungen an",
          fr: "Pas du tout; je maintiens des limites saines et recadre fermement",
          es: "Para nada; sostengo límites claros y señalo las faltas de respeto",
        },
      },
      {
        score: 1,
        label: {
          en: "Occasionally; if I feel bad that my boundary upset them",
          id: "Sesekali; jika aku merasa bersalah karena batasanku membuat mereka kecewa",
          de: "Gelegentlich; wenn es mir leid tut, dass meine Grenze sie kränkt",
          fr: "Occasionnellement; si je me sens coupable d'avoir déçu l'autre",
          es: "Ocasionalmente; si me siento culpable por herir sus sentimientos",
        },
      },
      {
        score: 2,
        label: {
          en: "Often; I minimize my pain and say 'It's totally fine, don't worry!'",
          id: "Sering; aku menyepelekan rasa sakitku dan berkata 'Gak apa-apa kok, santai aja!'",
          de: "Oft; ich spiele meinen Schmerz herunter und sage 'Schon gut, kein Problem!'",
          fr: "Souvent; je minimise ma peine en disant 'C'est pas grave, t'en fais pas!'",
          es: "A menudo; minimizo mi malestar diciendo 'No pasa nada, ¡tranquilo!'",
        },
      },
      {
        score: 3,
        label: {
          en: "Always; I take the blame for their mistreatment to keep the connection intact",
          id: "Selalu; aku menimpakan kesalahan pada diriku sendiri demi menjaga hubungan tetap utuh",
          de: "Immer; ich übernehme die Schuld für ihr Fehlverhalten, um die Bindung zu retten",
          fr: "Toujours; j'endosse la faute pour préserver le lien à tout prix",
          es: "Siempre; asumo la culpa de su maltrato para no perder el vínculo",
        },
      },
    ],
  },

  // Subscale 2: Identity Erasure & Boundary Surrender (Q5 - Q8)
  {
    id: 5,
    subscale: "identity_erasure",
    prompt: {
      en: "When asked what I want to eat, do, or watch, my mind goes completely blank because I only know what OTHERS want.",
      id: "Saat ditanya mau makan apa, pergi ke mana, atau menonton apa, kepalaku mendadak kosong karena aku hanya terbiasa tahu apa yang ORANG LAIN inginkan.",
      de: "Auf die Frage, was ich essen oder unternehmen möchte, bin ich innerlich leer – ich weiß nur, was ANDERE wollen.",
      fr: "Quand on me demande ce que je veux manger ou faire, c'est le trou noir; je ne sais que ce que les AUTRES désirent.",
      es: "Cuando me preguntan qué quiero comer o hacer, mi mente queda en blanco; solo sé lo que los DEMÁS quieren.",
    },
    options: [
      {
        score: 0,
        label: {
          en: "Never; I am well-connected to my personal tastes and preferences",
          id: "Tidak pernah; saya sangat tahu selera dan preferensi pribadi saya",
          de: "Nie; ich kenne meine Vorlieben und Wünsche sehr genau",
          fr: "Jamais; je connais parfaitement mes goûts et mes envies",
          es: "Nunca; tengo muy claros mis gustos y elecciones personales",
        },
      },
      {
        score: 1,
        label: {
          en: "Occasionally; I am easygoing but can choose when pressed",
          id: "Sesekali; saya fleksibel namun bisa memilih jika diminta",
          de: "Gelegentlich; ich bin flexibel, kann mich aber entscheiden",
          fr: "Parfois; je suis arrangeant mais capable de trancher",
          es: "A veces; soy flexible pero decido si me lo piden",
        },
      },
      {
        score: 2,
        label: {
          en: "Frequently; deciding for myself feels selfish or anxiety-provoking",
          id: "Sering; menentukan pilihan sendiri terasa egois atau memicu cemas",
          de: "Häufig; eigene Entscheidungen fühlen sich egoistisch oder ängstlich an",
          fr: "Souvent; décider pour moi me semble égoïste ou angoissant",
          es: "Frecuentemente; elegir para mí se siente egoísta o me genera ansiedad",
        },
      },
      {
        score: 3,
        label: {
          en: "Constantly; I have suppressed my authentic desires for so long that I don't know who I am alone",
          id: "Terus-menerus; aku sudah menekan keinginanku begitu lama hingga tidak tahu siapa diriku saat sendiri",
          de: "Ständig; ich habe eigene Wünsche so lange verleugnet, dass ich mein Selbst verloren habe",
          fr: "Constamment; j'ai tellement étouffé mes désirs que j'ignore qui je suis seule",
          es: "Constantemente; he anulado mis deseos tanto tiempo que no sé quién soy a solas",
        },
      },
    ],
  },
  {
    id: 6,
    subscale: "identity_erasure",
    prompt: {
      en: "Saying 'No' to a request physically tightens my throat or chest, filling me with intense dread of abandonment.",
      id: "Mengucapkan kata 'Tidak' atas permintaan orang lain membuat tenggorokan atau dadaku sesak oleh rasa takut ditinggalkan.",
      de: "Ein klares 'Nein' schnürt mir die Kehle zu und löst Panik vor Zurückweisung aus.",
      fr: "Dire 'Non' me noue la gorge ou la poitrine, me plongeant dans la peur du rejet.",
      es: "Decir 'No' me cierra la garganta y me inunda de terror al abandono.",
    },
    options: [
      {
        score: 0,
        label: {
          en: "Rarely; I decline comfortably when my schedule or capacity is full",
          id: "Jarang; saya menolak dengan nyaman jika waktu atau energiku tidak memungkinkan",
          de: "Selten; ich lehne gelassen ab, wenn meine Kapazitäten erschöpft sind",
          fr: "Rarement; je refuse sereinement quand mon emploi du temps est plein",
          es: "Rara vez; rechazo con tranquilidad si no tengo tiempo o energía",
        },
      },
      {
        score: 1,
        label: {
          en: "Sometimes; I hesitate briefly but still hold my boundary",
          id: "Kadang-kadang; saya ragu sejenak namun tetap memegang batasan",
          de: "Manchmal; ich zögere kurz, bleibe aber bei meiner Grenze",
          fr: "Parfois; j'hésite un instant mais tiens bon",
          es: "A veces; dudo un poco pero mantengo mi negativa",
        },
      },
      {
        score: 2,
        label: {
          en: "Often; I say 'Yes' immediately and then panic about how to fulfill it",
          id: "Sering; aku langsung mengiyakan lalu panik sendiri bagaimana menyelesaikannya",
          de: "Oft; ich sage reflexartig 'Ja' und gerate danach in Termindruck",
          fr: "Souvent; je dis 'Oui' trop vite puis panique pour honorer la promesse",
          es: "A menudo; digo que 'Sí' de inmediato y luego me desespero para cumplir",
        },
      },
      {
        score: 3,
        label: {
          en: "Almost always; saying 'No' feels like committing an unforgivable relational crime",
          id: "Hampir selalu; berkata 'Tidak' terasa seperti melakukan kejahatan besar yang tak termaafkan",
          de: "Fast immer; ein 'Nein' fühlt sich an wie ein unverzeihlicher Verrat",
          fr: "Presque toujours; refuser me donne l'impression de commettre un crime impardonnable",
          es: "Casi siempre; decir 'No' se siente como un delito relacional imperdonable",
        },
      },
    ],
  },
  {
    id: 7,
    subscale: "identity_erasure",
    prompt: {
      en: "I hyper-anticipate everyone's emotional needs and fix problems before they even notice them, seeking safety through usefulness.",
      id: "Aku selalu menebak dan membaca kebutuhan emosional orang lain, lalu membereskannya sebelum mereka sadar, demi merasa aman dan berharga.",
      de: "Ich antizipiere die Nöte anderer und löse Probleme, bevor sie entstehen, um durch Nützlichkeit sicher zu sein.",
      fr: "J'anticipe les moindres besoins d'autrui et règle leurs soucis en amont pour assurer ma sécurité par l'utilité.",
      es: "Me anticipo a las necesidades ajenas y resuelvo problemas antes de que lo noten, buscando seguridad en ser indispensable.",
    },
    options: [
      {
        score: 0,
        label: {
          en: "Never; I let adults handle their own problems and emotions",
          id: "Tidak pernah; saya membiarkan orang dewasa mengurus masalah dan emosi mereka sendiri",
          de: "Nie; ich lasse erwachsene Menschen ihre Angelegenheiten selbst regeln",
          fr: "Jamais; je laisse les adultes gérer leurs propres responsabilités",
          es: "Nunca; dejo que los adultos gestionen sus propios problemas",
        },
      },
      {
        score: 1,
        label: {
          en: "Occasionally; with my children or very close vulnerable loved ones",
          id: "Sesekali; hanya pada anak atau keluarga dekat yang memang rentan",
          de: "Gelegentlich; bei meinen Kindern oder schutzbedürftigen Angehörigen",
          fr: "Parfois; avec mes enfants ou des proches très vulnérables",
          es: "A veces; con mis hijos o personas muy dependientes",
        },
      },
      {
        score: 2,
        label: {
          en: "Frequently; I become hyper-vigilant in groups, monitoring everyone's comfort level",
          id: "Sering; aku sangat waspada saat berkelompok, terus memantau kenyamanan tiap orang",
          de: "Häufig; in Gruppen scanne ich permanent die Befindlichkeit aller Anwesenden",
          fr: "Souvent; en groupe, je surveille le confort de chacun avec une hypervigilance épuisante",
          es: "Frecuentemente; en grupo estoy hipervigilante vigilando el bienestar de todos",
        },
      },
      {
        score: 3,
        label: {
          en: "Constantly; my self-worth is entirely tied to being an indispensable emotional shock-absorber",
          id: "Terus-menerus; harga diriku sepenuhnya bergantung pada peran sebagai peredam emosi yang tak tergantikan",
          de: "Ständig; mein Selbstwert hängt allein davon ab, als emotionaler Puffer unentbehrlich zu sein",
          fr: "Constamment; ma valeur dépend du rôle d'amortisseur émotionnel indispensable",
          es: "Constantemente; mi autoestima depende de ser el salvador emocional indispensable",
        },
      },
    ],
  },
  {
    id: 8,
    subscale: "identity_erasure",
    prompt: {
      en: "I feel like a hollow shell when I am by myself, experiencing genuine panic or emptiness in the absence of someone to please.",
      id: "Aku merasa seperti cangkang kosong saat sendirian, merasakan kehampaan atau kepanikan jika tidak ada orang yang harus kulayani.",
      de: "Allein fühle ich mich wie eine leere Hülle – ohne jemanden zum Fürsorgen überkommt mich innere Panik.",
      fr: "Seule, je me sens comme une coquille vide; l'absence de quelqu'un à satisfaire déclenche un vide angoissant.",
      es: "A solas me siento un caparazón vacío; no tener a quién complacer me genera un vacío aterrador.",
    },
    options: [
      {
        score: 0,
        label: {
          en: "Rarely; I deeply enjoy and cherish my solitary moments",
          id: "Jarang; saya sangat menikmati dan mensyukuri waktu kesendirian",
          de: "Selten; ich genieße und schätze das Alleinsein sehr",
          fr: "Rarement; j'apprécie profondément mes moments de solitude",
          es: "Rara vez; disfruto y valoro enormemente mi soledad",
        },
      },
      {
        score: 1,
        label: {
          en: "Sometimes; after prolonged intense social engagements",
          id: "Kadang-kadang; setelah periode interaksi sosial yang terlalu intens",
          de: "Manchmal; nach langen, kräftezehrenden sozialen Phasen",
          fr: "Parfois; après des périodes de sociabilité trop intenses",
          es: "A veces; tras periodos sociales agotadores",
        },
      },
      {
        score: 2,
        label: {
          en: "Often; stillness feels eerie, so I fill it with chores for others",
          id: "Sering; keheningan terasa mencekam sehingga kuisi dengan membantu orang lain",
          de: "Oft; Stille verunsichert mich, also erledige ich Aufgaben für andere",
          fr: "Souvent; le silence m'oppresse, alors je m'active au service des autres",
          es: "A menudo; la calma me inquieta y me pongo a hacer tareas para otros",
        },
      },
      {
        score: 3,
        label: {
          en: "Almost always; I have no independent sense of self without external relational mirroring",
          id: "Hampir selalu; aku tidak punya jati diri yang utuh tanpa validasi dan cermin dari orang lain",
          de: "Fast immer; ohne externe Bestätigung habe ich kein Gespür für meine Identität",
          fr: "Presque toujours; sans le miroir de l'autre, mon identité s'évapore",
          es: "Casi siempre; no tengo identidad propia sin la validación externa",
        },
      },
    ],
  },

  // Subscale 3: Post-Fawn Resentment & Passive Rage (Q9 - Q12)
  {
    id: 9,
    subscale: "post_fawn_resentment",
    prompt: {
      en: "After being excessively nice and obliging, I experience private explosions of rage, bitterness, or disgust toward the person I just placated.",
      id: "Setelah bersikap terlalu manis dan menuruti kemauan orang lain, aku merasakan ledakan amarah, dendam, atau rasa jijik terpendam terhadap orang tersebut.",
      de: "Nachdem ich übertrieben nett war, überkommt mich heimliche Wut, Bitterkeit oder Abscheu gegenüber der Person.",
      fr: "Après avoir été excessivement complaisant, j'éprouve une rage secrète ou un dégoût amer envers la personne amadouée.",
      es: "Tras ser sumamente complaciente, siento explosiones secretas de ira, amargura o desprecio hacia esa persona.",
    },
    options: [
      {
        score: 0,
        label: {
          en: "Rarely; my kindness is authentic and aligned with my capacity",
          id: "Jarang; kebaikanku tulus dan sesuai dengan kapasitas energiku",
          de: "Selten; meine Freundlichkeit ist echt und überfordert mich nicht",
          fr: "Rarement; ma gentillesse est authentique et sans contrainte",
          es: "Rara vez; mi amabilidad es sincera y dentro de mis límites",
        },
      },
      {
        score: 1,
        label: {
          en: "Occasionally; when someone takes my help completely for granted",
          id: "Sesekali; saat seseorang benar-benar menganggap bantuanku sebagai hal sepele",
          de: "Gelegentlich; wenn meine Hilfe als selbstverständlich abgetan wird",
          fr: "Parfois; quand mon aide est prise pour acquise sans merci",
          es: "A veces; cuando dan mi ayuda por sentada sin agradecer",
        },
      },
      {
        score: 2,
        label: {
          en: "Frequently; I curse myself in the car or shower for giving in yet again",
          id: "Sering; aku memaki diriku sendiri di kamar mandi atau mobil karena selalu mengalah",
          de: "Häufig; ich verfluche mich im Nachhinein dafür, wieder nachgegeben zu haben",
          fr: "Souvent; je m'en veux furieusement d'avoir encore cédé",
          es: "Frecuentemente; me maldigo a solas por haber cedido una vez más",
        },
      },
      {
        score: 3,
        label: {
          en: "Almost always; I live in a toxic cycle of smiling compliance in public and venomous resentment in private",
          id: "Hampir selalu; aku hidup dalam siklus tersenyum patuh di depan orang namun mendidih dendam saat sendirian",
          de: "Fast immer; ein Kreislauf aus lächelndem Gehorsam und giftiger stiller Wut",
          fr: "Presque toujours; un cercle vicieux de soumission en public et de haine secrète à l'abri des regards",
          es: "Casi siempre; vivo entre sonreír con sumisión en público y hervir de rencor en privado",
        },
      },
    ],
  },
  {
    id: 10,
    subscale: "post_fawn_resentment",
    prompt: {
      en: "I secretly keep an internal mental ledger of everything I sacrifice for others, feeling deeply hurt when they don't reciprocate without being asked.",
      id: "Aku diam-diam mencatat semua pengorbananku dalam hati, dan merasa sangat sakit hati saat mereka tidak membalas budi tanpa diminta.",
      de: "Ich führe heimlich Buch über alle meine Opfer und bin tief gekränkt, wenn niemand dies ungefragt erwidert.",
      fr: "Je tiens une comptabilité secrète de mes sacrifices et souffre atrocement quand l'autre ne devine pas mes attentes en retour.",
      es: "Llevo una cuenta mental secreta de mis sacrificios y me duele que no me correspondan sin que tenga que pedirlo.",
    },
    options: [
      {
        score: 0,
        label: {
          en: "Never; I give freely without covert contracts or hidden expectations",
          id: "Tidak pernah; saya memberi dengan ikhlas tanpa syarat tersembunyi",
          de: "Nie; ich gebe freiwillig ohne versteckte Erwartungen",
          fr: "Jamais; je donne librement sans contrat tacite ni attente cachée",
          es: "Nunca; doy con libertad sin contratos ocultos ni expectativas",
        },
      },
      {
        score: 1,
        label: {
          en: "Occasionally; if a relationship feels one-sided for a prolonged period",
          id: "Sesekali; jika hubungan terasa berat sebelah dalam kurun waktu lama",
          de: "Gelegentlich; wenn eine Beziehung über Monate sehr einseitig verläuft",
          fr: "Parfois; si la relation est déséquilibrée depuis de longs mois",
          es: "A veces; si el vínculo es unilateral durante mucho tiempo",
        },
      },
      {
        score: 2,
        label: {
          en: "Often; I feel used and exploited, despite volunteering myself for the tasks",
          id: "Sering; aku merasa dimanfaatkan orang lain, meski aku sendiri yang sukarela menawarkan diri",
          de: "Oft; ich fühle mich ausgenutzt, obwohl ich mich selbst aufgedrängt habe",
          fr: "Souvent; je me sens exploitée, bien que j'aie proposé mon aide moi-même",
          es: "A menudo; me siento usado, a pesar de haberme ofrecido voluntariamente",
        },
      },
      {
        score: 3,
        label: {
          en: "Constantly; I feel like a chronic martyr whom nobody truly appreciates or rescues",
          id: "Terus-menerus; aku merasa seperti martir yang menderita tanpa ada yang menghargai atau menolongku",
          de: "Ständig; ich lebe im Märtyrer-Modus und fühle mich von der Welt im Stich gelassen",
          fr: "Constamment; je vis comme un martyr que personne ne prend la peine de sauver",
          es: "Constantemente; me siento un mártir incomprendido al que nadie viene a rescatar",
        },
      },
    ],
  },
  {
    id: 11,
    subscale: "post_fawn_resentment",
    prompt: {
      en: "I use passive-aggressive behaviors (withdrawing warmth, silent treatment, sighing, delayed replies) because direct confrontation feels terrifying.",
      id: "Aku menggunakan perilaku pasif-agresif (mendiamkan, menarik kehangatan, menghela napas, menunda balas chat) karena konfrontasi langsung terasa mengerikan.",
      de: "Ich reagiere passiv-aggressiv (Schweigen, Seufzen, kühle Distanz), weil direkte Konfrontation mir Todesangst macht.",
      fr: "J'utilise l'agressivité passive (silence glacial, soupirs, retards de réponse) car la confrontation directe me terrifie.",
      es: "Recurro a la pasivo-agresividad (silencio cortante, suspiros, frialdad) porque la confrontación directa me aterra.",
    },
    options: [
      {
        score: 0,
        label: {
          en: "Rarely; I express discontent directly, calmly, and constructively",
          id: "Jarang; saya menyampaikan ketidakpuasan secara langsung dan tenang",
          de: "Selten; ich äußere Unmut direkt, sachlich und konstruktiv",
          fr: "Rarement; j'exprime mon désaccord avec calme et clarté",
          es: "Rara vez; comunico mi molestia de frente y con serenidad",
        },
      },
      {
        score: 1,
        label: {
          en: "Sometimes; I need cooling-off time before I can talk clearly",
          id: "Kadang-kadang; saya butuh waktu menenangkan diri sebelum bicara",
          de: "Manchmal; ich brauche erst Bedenkzeit, bevor ich rede",
          fr: "Parfois; j'ai besoin d'un temps de pause avant de dialoguer",
          es: "A veces; necesito calmarme antes de poner palabras",
        },
      },
      {
        score: 2,
        label: {
          en: "Frequently; I hint heavily at my anger while pretending 'Everything is fine'",
          id: "Sering; aku memberi kode kemarahan sambil tetap berpura-pura 'Aku gak apa-apa'",
          de: "Häufig; ich lasse meine Wut durchblicken, behaupte aber 'Alles gut'",
          fr: "Souvent; je distille mon agacement tout en jurant que 'Tout va bien'",
          es: "Frecuentemente; demuestro enfado con indirectas mientras digo 'Todo bien'",
        },
      },
      {
        score: 3,
        label: {
          en: "Almost always; passive aggression is my only available weapon because my voice was silenced in childhood",
          id: "Hampir selalu; pasif-agresif adalah satu-satunya senjataku karena suaraku dibungkam sejak kecil",
          de: "Fast immer; passive Aggression ist meine einzige Waffe gegen Übermacht",
          fr: "Presque toujours; l'agressivité passive est ma seule arme de survie",
          es: "Casi siempre; la pasivo-agresividad es mi única defensa aprendida",
        },
      },
    ],
  },
  {
    id: 12,
    subscale: "post_fawn_resentment",
    prompt: {
      en: "I suddenly ghost people, abruptly end friendships, or vanish from commitments when the pressure of constant pleasing becomes unbearable.",
      id: "Aku mendadak menghilang (ghosting), memutuskan pertemanan secara sepihak, atau kabur dari komitmen saat beban menyenangkan orang lain sudah tak tertahankan.",
      de: "Ich breche plötzlich Kontakte ab (Ghosting) oder ziehe mich abrupt zurück, wenn der Druck des Gefallens unerträglich wird.",
      fr: "Je coupe subitement les ponts (ghosting) ou fuis des engagements quand la pression de faire plaisir devient intolérable.",
      es: "Desaparezco de repente (ghosting) o corto amistades de golpe cuando la presión de complacer se vuelve insoportable.",
    },
    options: [
      {
        score: 0,
        label: {
          en: "Never; I communicate closure and renegotiate terms respectfully",
          id: "Tidak pernah; saya pamit atau membicarakan perubahan kesepakatan secara dewasa",
          de: "Nie; ich spreche Abschiede oder veränderte Bedingungen respektvoll an",
          fr: "Jamais; je communique mes départs et renégocie mes engagements",
          es: "Nunca; cierro etapas y renegocio compromisos con respeto",
        },
      },
      {
        score: 1,
        label: {
          en: "Occasionally; with casual acquaintances or draining social media groups",
          id: "Sesekali; hanya pada kenalan biasa atau grup medsos yang toxic",
          de: "Gelegentlich; bei oberflächlichen Bekanntschaften oder Social Media",
          fr: "Parfois; avec de simples connaissances ou des groupes toxiques",
          es: "A veces; con conocidos superficiales o grupos desgastantes",
        },
      },
      {
        score: 2,
        label: {
          en: "Often; when overwhelmed, my escape hatch is total disappearance",
          id: "Sering; saat sudah kewalahan, pintu keluar favoritku adalah menghilang tanpa jejak",
          de: "Oft; bei Überlastung ist der totale Rückzug mein einziger Ausweg",
          fr: "Souvent; en cas de submersion, ma seule issue est la disparition totale",
          es: "A menudo; colapsado, mi única salida es desaparecer sin previo aviso",
        },
      },
      {
        score: 3,
        label: {
          en: "Constantly; I cycle between excessive self-sacrifice and burnt-bridges abandonment",
          id: "Terus-menerus; hidupku berputar antara berkorban berlebihan lalu membakar semua jembatan hubungan",
          de: "Ständig; ein ewiges Pendeln zwischen extremer Selbstaufgabe und verbrannter Erde",
          fr: "Constamment; j'oscille entre sacrifice extrême et rupture brutale définitive",
          es: "Constantemente; oscilo entre la sumisión total y quemar todos los puentes",
        },
      },
    ],
  },
];

export const FAWN_ARCHETYPES: Record<
  "low_fawn" | "moderate_appeasement" | "chronic_fawn" | "severe_identity_collapse",
  FawnArchetypeProfile
> = {
  low_fawn: {
    level: "low_fawn",
    badge: {
      en: "Sovereign Boundary / Secure Attunement",
      id: "Batasan Berdaulat / Relasi Aman",
      de: "Souveräne Grenzen / Sichere Bindung",
      fr: "Frontières Souveraines / Attachement Sécure",
      es: "Límites Soberanos / Vínculo Seguro",
    },
    title: {
      en: "The Grounded Sovereign",
      id: "Sang Pribadi Berdaulat",
      de: "Der geerdete Souverän",
      fr: "Le Souverain Ancré",
      es: "El Soberano Enraizado",
    },
    tagline: {
      en: "You offer warmth without self-erasure, keeping your spine while remaining kind.",
      id: "Kebaikanmu tulus tanpa mengorbankan jati diri; hatimu hangat dengan pendirian teguh.",
      de: "Sie schenken Wärme ohne Selbstverleugnung und bewahren Ihr Rückgrat in Güte.",
      fr: "Vous offrez votre bienveillance sans vous renier, solide et respectueux de vous-même.",
      es: "Ofreces calidez sin anularte, con un corazón abierto y una columna firme.",
    },
    description: {
      en: "Your nervous system has developed healthy differentiation: you can empathize with others' distress without viewing their negative emotions as an existential threat to your safety. You say 'No' cleanly without excessive justification or post-rejection guilt.",
      id: "Sistem sarafmu memiliki diferensiasi yang sehat: kamu mampu berempati tanpa menganggap kemarahan orang lain sebagai ancaman keselamatan dirimu. Kamu bisa berkata 'Tidak' dengan lugas tanpa rasa bersalah yang menyiksa.",
      de: "Ihr Nervensystem verfügt über eine gesunde Differenzierung: Sie können mitfühlen, ohne fremde Verstimmung als existenzielle Bedrohung zu deuten. Sie sagen klar 'Nein', ohne quälende Reue.",
      fr: "Votre système nerveux sait différencier votre espace de celui d'autrui: vous compatissez sans voir la colère de l'autre comme une menace. Vous dites 'Non' avec sérénité et clarté.",
      es: "Tu sistema nervioso cuenta con una sana diferenciación: empatizas sin interpretar el enfado ajeno como un peligro de muerte. Dices 'No' sin culpa paralizante.",
    },
    psychologyInsight: {
      en: "In Pete Walker's Complex PTSD typology, the healthy individual balances Fight (boundaries), Flight (disengagement), Freeze (mindfulness), and Fawn (compassionate cooperation). You utilize cooperation out of choice rather than trauma-conditioned appeasement.",
      id: "Dalam tipologi C-PTSD Pete Walker, individu sehat menyeimbangkan Fight (ketegasan), Flight (mundur bijak), Freeze (refleksi hening), dan Fawn (kolaborasi hangat). Kamu memilih bekerja sama atas kehendak bebas, bukan paksaan trauma masa lalu.",
      de: "Nach Pete Walkers Traumamodell beherrschen Sie die Balance aller 4 Überlebensmuster. Kooperation ist für Sie eine freie Entscheidung, kein unbewusster Unterwerfungsreflex.",
      fr: "Selon le modèle de Pete Walker, vous équilibrez les 4 réflexes de survie. Votre coopération est un choix délibéré d'amour et non une capitulation traumatique.",
      es: "En el modelo de Pete Walker, equilibras las 4 respuestas ante la amenaza. Tu colaboración nace de la elección consciente y no de la sumisión obligada.",
    },
    actionProtocols: {
      en: [
        "Reinforce clean boundaries by continuing to state preferences without apologizing for them.",
        "Honor your body's early cues of irritation as vital information rather than something to suppress.",
        "Celebrate your capacity to stay grounded when others experience emotional turbulence.",
      ],
      id: [
        "Pertahankan batasan sehat dengan terus menyatakan preferensimu tanpa perlu meminta maaf.",
        "Hargai sinyal rasa kesal pada tubuh sebagai alarm penting, bukan sesuatu yang harus ditekan.",
        "Rayakan kemampuanmu untuk tetap tenang dan berdaulat di tengah drama emosional sekitar.",
      ],
      de: [
        "Pflegen Sie klare Grenzen, indem Sie Wünsche ohne vorheriges Entschuldigen formulieren.",
        "Deuten Sie leisen Unmut als wertvollen Körpersignal-Kompass statt als Fehler.",
        "Schätzen Sie Ihre Fähigkeit, in emotionalen Stürmen anderer Ihr inneres Zentrum zu halten.",
      ],
      fr: [
        "Maintenez vos limites en continuant d'exprimer vos besoins sans vous excuser d'exister.",
        "Écoutez l'irritation précoce de votre corps comme un signal précieux à honorer.",
        "Célébrez votre aptitude à rester calme quand les tempêtes émotionnelles s'agitent autour.",
      ],
      es: [
        "Consolida tus límites expresando tus elecciones sin pedir perdón por tener criterio propio.",
        "Escucha la molestia sutil en tu cuerpo como una brújula biológica indispensable.",
        "Valora tu capacidad de permanecer centrado frente a la volatilidad emocional ajena.",
      ],
    },
    dailyAffirmation: {
      en: "I can be loving and kind while holding an unshakeable boundary around my peace.",
      id: "Aku bisa menjadi pribadi yang penuh kasih sembari menjaga batas kedamaian jiwaku dengan kokoh.",
      de: "Ich kann tief verbunden und gütig sein, während ich meine innere Ruhe unerschütterlich schütze.",
      fr: "Je peux être aimant et bienveillant tout en maintenant une frontière inaltérable autour de ma paix.",
      es: "Puedo ser cálido y compasivo mientras sostengo un límite inquebrantable alrededor de mi paz.",
    },
  },

  moderate_appeasement: {
    level: "moderate_appeasement",
    badge: {
      en: "The Relational Peacemaker / Chronic Soother",
      id: "Juru Damai Relasional / Penenang Konflik",
      de: "Der Beziehungsschlichter / Harmoniestreber",
      fr: "Le Pacificateur / Adoucisseur de Conflits",
      es: "El Pacificador Relacional / Suavizador",
    },
    title: {
      en: "The Vigilant Peacekeeper",
      id: "Sang Penjaga Damai Waspada",
      de: "Der wachsame Friedensstifter",
      fr: "Le Gardien de la Paix Vigilant",
      es: "El Guardián Vigilante de la Paz",
    },
    tagline: {
      en: "You work overtime to keep the room calm, often at the expense of your own authentic voice.",
      id: "Kamu bekerja keras memastikan semua orang nyaman, sering kali mengorbankan suara hatimu sendiri.",
      de: "Sie investieren enorme Energie in die Harmonie des Raumes – oft auf Kosten Ihrer eigenen Stimme.",
      fr: "Vous dépensez une énergie colossale pour calmer la pièce, quitte à museler votre propre voix.",
      es: "Trabajas horas extras para apaciguar el ambiente, a menudo a expensas de tu propia verdad.",
    },
    description: {
      en: "You have learned that emotional tension in the room is dangerous. When tempers flare or silent treatment looms, your heart rate accelerates and you unconsciously take on the role of mediator, entertainer, or shock absorber. You struggle to say 'No' directly, often over-explaining or fabricating excuses.",
      id: "Kamu mempelajari sejak dulu bahwa ketegangan emosi adalah tanda bahaya. Saat ada konflik atau perang dingin, detak jantungmu melonjak dan kamu otomatis menjadi mediator, penghibur, atau peredam emosi. Kamu sulit menolak secara langsung dan sering membuat alasan berbelit.",
      de: "Ungelöste Spannungen bedeuten für Ihr Nervensystem Alarm. Sie übernehmen reflexartig die Rolle des Schlichters oder Unterhalters. Ein direktes 'Nein' fällt Ihnen schwer; oft flüchten Sie in lange Ausreden.",
      fr: "Pour votre cerveau, la moindre tension équivaut à un danger imminent. Vous devenez médiateur ou amuseur public pour désamorcer les conflits. Dire 'Non' vous demande des justifications infinies.",
      es: "La tensión ambiental enciende tus alarmas internas. Asumes el rol de negociador o animador para desactivar tormentas. Te cuesta decir 'No' sin inventar excusas elaboradas.",
    },
    psychologyInsight: {
      en: "Dr. Harriet Braiker calls this 'The Disease to Please'. Your nervous system confuses being agreeable with being safe. Because childhood caregivers may have been volatile or conditionally loving, you learned to manage their emotions to protect your attachment bond.",
      id: "Dr. Harriet Braiker menyebut ini 'The Disease to Please'. Sistem sarafmu mengacaukan kepatuhan dengan rasa aman. Karena pengasuh masa kecil mungkin tidak stabil atau hanya menyayangi saat kamu patuh, kamu terbiasa mengatur emosi mereka demi bertahan.",
      de: "Nach Dr. Harriet Braiker verwechselt Ihr Nervensystem Nachgiebigkeit mit Überleben. Da Liebe in der Kindheit an Wohlverhalten geknüpft war, regulieren Sie andere, um Bindung zu sichern.",
      fr: "Le Dr Harriet Braiker nomme ce piège 'La maladie de plaire'. Votre système nerveux confond soumission et survie. Vous apaisez les autres pour garantir leur amour.",
      es: "La Dra. Harriet Braiker lo llama 'La enfermedad de complacer'. Tu biología confunde ser sumiso con estar a salvo. Gestionas los humores ajenos para no ser rechazado.",
    },
    actionProtocols: {
      en: [
        "Implement the '24-Hour Pause': Whenever asked for a favor, practice saying: 'Let me check my schedule and get back to you tomorrow.'",
        "Stop over-explaining: When declining, practice using the complete sentence: 'I won't be able to make it, but thank you for thinking of me.'",
        "Notice somatic bracing: When tension rises, drop your shoulders, unclench your teeth, and breathe into your lower belly before speaking.",
      ],
      id: [
        "Terapkan 'Jeda 24 Jam': Saat diminta tolong, biasakan berkata: 'Biar kucek jadwalku dulu ya, besok kukabari.'",
        "Hentikan penjelasan panjang: Saat menolak, gunakan kalimat padat: 'Maaf aku belum bisa bantu kali ini, makasih ya sudah mengajak.'",
        "Sadari ketegangan tubuh: Saat suasana tegang, turunkan bahu, kendurkan rahang, dan tarik napas dalam sebelum buru-buru menenangkan orang.",
      ],
      de: [
        "Üben Sie die '24-Stunden-Bedenkzeit': Sagen Sie bei Bitten: 'Ich prüfe meinen Kalender und melde mich morgen.'",
        "Verzichten Sie auf lange Rechtfertigungen: Ein kurzes 'Das schaffe ich leider nicht, danke für die Einladung' genügt vollkommen.",
        "Lösen Sie körperliche Anspannung: Senken Sie die Schultern, lockern Sie den Kiefer und atmen Sie tief in den Bauch vor einer Antwort.",
      ],
      fr: [
        "Adoptez le 'Délai de 24 Heures': Face à une requête, répondez: 'Je regarde mon planning et je te réponds demain.'",
        "Bannissez les justifications: Utilisez la formule sobre: 'Je ne pourrai pas cette fois-ci, merci d'avoir pensé à moi.'",
        "Relâchez votre mâchoire: En cas de tension, décontractez vos épaules et respirez dans le ventre avant de parler.",
      ],
      es: [
        "Aplica la 'Pausa de 24 Horas': Ante cualquier favor, responde: 'Reviso mi agenda y te confirmo mañana.'",
        "Elimina las explicaciones infinitas: Un simple 'No podré en esta ocasión, gracias por tenerme en cuenta' es suficiente.",
        "Suelta la armadura física: Baja los hombros, destensa la mandíbula y respira profundo antes de apresurarte a calmar al otro.",
      ],
    },
    dailyAffirmation: {
      en: "Other people's discomfort is not an emergency that I am required to solve.",
      id: "Ketidaknyamanan orang lain bukanlah keadaan darurat yang wajib kuselesaikan.",
      de: "Die Unzufriedenheit anderer Menschen ist kein Notfall, den ich reparieren muss.",
      fr: "L'inconfort émotionnel des autres n'est pas une urgence que je dois résoudre.",
      es: "La incomodidad de los demás no es una emergencia que me corresponda resolver a mí.",
    },
  },

  chronic_fawn: {
    level: "chronic_fawn",
    badge: {
      en: "Chronic Fawn Reflex / High Resentment",
      id: "Refleks Fawn Kronis / Beban Dendam Terpendam",
      de: "Chronischer Fawn-Reflex / Aufgestaute Wut",
      fr: "Réflexe de Soumission Chronique / Rancœur Cachée",
      es: "Reflejo Fawn Crónico / Resentimiento Silencioso",
    },
    title: {
      en: "The Masked Absorber",
      id: "Sang Penampung Bertopeng",
      de: "Der maskierte Stoßdämpfer",
      fr: "L'Absorbeur Masqué",
      es: "El Amortiguador Enmascarado",
    },
    tagline: {
      en: "You smile and say 'Yes' while screaming inside, drowning in secret exhaustion and resentment.",
      id: "Kamu tersenyum mengiyakan saat batinmu menjerit, tenggelam dalam kelelahan dan rasa dendam rahasia.",
      de: "Sie lächeln und nicken, während Sie innerlich schreien – gefangen in Erschöpfung und heimlichem Groll.",
      fr: "Vous souriez et dites 'Oui' alors que tout hurle en vous, noyé sous la rancœur et l'épuisement.",
      es: "Sonríes y asientes mientras por dentro gritas, asfixiado por el rencor y el agotamiento secreto.",
    },
    description: {
      en: "Fawning is your dominant survival strategy. You merge with the desires of partners, friends, and bosses, constantly terrified that holding a boundary will lead to explosive wrath or abandonment. In private, however, you feel bitter, exhausted, and exploited, frequently fantasizing about running away or burning bridges.",
      id: "Fawning adalah strategi bertahan hidup utamamu. Kamu melebur dengan keinginan pasangan, teman, dan atasan karena takut penolakan berujung amukan atau ditinggalkan. Namun saat sendirian, kamu merasa muak, lelah, dan dimanfaatkan, sering kali berfantasi ingin lari atau memutuskan kontak selamanya.",
      de: "Unterwerfung ist Ihr dominantes Schutzmuster. Sie verschmelzen mit den Wünschen anderer aus Angst vor Zurückweisung. Im Geheimen jedoch kochen Sie vor Bitterkeit und träumen von plötzlichem Kontaktabbruch.",
      fr: "La soumission est votre armure. Vous épousez les désirs de votre entourage par terreur du rejet. Mais en privé, vous étouffez d'amertume et fantasmez de tout plaquer.",
      es: "Complacer es tu trinchera. Te fundes con los deseos ajenos por pánico al abandono. Sin embargo, a solas te consume la amargura y sueñas con escapar sin avisar.",
    },
    psychologyInsight: {
      en: "Pete Walker identifies the Fawn response as an arrested fight response: children who were severely punished for anger or boundaries learn that fighting or fleeing triggers annihilation. Thus, they sacrifice their authentic self to buy temporary safety from the aggressor.",
      id: "Pete Walker menjelaskan bahwa respon Fawn adalah respon Fight (perlawanan) yang dibungkam sejak kecil. Anak yang dimarahi saat marah atau membuat batasan belajar bahwa membela diri berujung bahaya maut, sehingga mereka menumbalkan jati diri demi rasa aman sementara.",
      de: "Laut Pete Walker ist Fawning eine blockierte Kampfreaktion: Kinder, die für Protest bestraft wurden, opfern ihr authentisches Selbst, um vor Aggressoren sicher zu sein.",
      fr: "Selon Pete Walker, la soumission (Fawn) est une riposte de combat muselée: l'enfant puni pour sa colère apprend à éteindre son moi profond pour acheter sa survie.",
      es: "Pete Walker define la respuesta Fawn como una lucha reprimida: el niño castigado por quejarse aprende que apagar su identidad es el único peaje para no ser aniquilado.",
    },
    actionProtocols: {
      en: [
        "Somatic anger discharge: Safely express the repressed fight response by wringing a hand towel with full muscular force or screaming into a pillow.",
        "Identify 'Covert Contracts': Write down what you expect back when you do favors. Force yourself to ask directly or stop offering.",
        "Practice 'Micro-Divergence': In casual chats, disagree on something trivial: 'Actually, I didn't love that movie, I found it slow.' Notice that you survive.",
      ],
      id: [
        "Penyaluran kemarahan somatis: Salurkan respon perlawanan yang tertekan dengan memeras handuk sekuat tenaga atau berteriak ke bantal kedap suara.",
        "Bongkar 'Kontrak Tersembunyi': Tulis apa yang kamu harapkan saat menolong orang. Paksa dirimu memintanya secara terus terang atau berhenti menawarkan diri.",
        "Latihan 'Perbedaan Pendapat Mikro': Nyatakan ketidaksetujuan pada hal sepele: 'Sebenarnya menurutku film tadi agak ngebosenin sih.' Buktikan bahwa kamu tetap aman.",
      ],
      de: [
        "Somatische Wutentladung: Wringen Sie ein Handtuch mit maximaler Muskelkraft aus oder schreien Sie in ein Kissen, um blockierte Energie zu befreien.",
        "Versteckte Verträge auflösen: Notieren Sie, was Sie heimlich als Gegenleistung erwarten. Bitten Sie direkt darum oder stellen Sie das Helfen ein.",
        "Mikro-Widerspruch wagen: Äußern Sie bei Kleinigkeiten eine abweichende Meinung ('Ich fand den Film eher langatmig'). Erleben Sie, dass nichts Schlimmes passiert.",
      ],
      fr: [
        "Décharge somatique de la rage: Tordez une serviette de bain de toutes vos forces ou criez dans un coussin pour libérer la colère refoulée.",
        "Démasquez les contrats secrets: Écrivez ce que vous attendez en retour de vos services. Demandez-le explicitement ou cessez de vous sacrifier.",
        "Pratiquez le micro-désaccord: Osez une divergence mineure ('Personnellement, je n'ai pas trop aimé ce plat'). Constatez que le lien ne se brise pas.",
      ],
      es: [
        "Descarga somática de la ira: Retuerce una toalla con toda la fuerza de tus brazos o grita en una almohada para liberar la respuesta de lucha reprimida.",
        "Desmonta los contratos ocultos: Escribe qué esperas en secreto a cambio de tus favores. Pídelo abiertamente o deja de ofrecerte.",
        "Ensaya la micro-discrepancia: Expresa un desacuerdo inocente ('La verdad es que a mí esa película no me gustó'). Comprueba que el mundo no se acaba.",
      ],
    },
    dailyAffirmation: {
      en: "My anger is not proof that I am bad; it is proof that my boundaries have been violated.",
      id: "Kemarahanku bukanlah bukti bahwa aku jahat; itu adalah bukti bahwa batasanku telah dilanggar.",
      de: "Meine Wut ist kein Beweis für Bösartigkeit, sondern der Beweis, dass meine Grenzen verletzt wurden.",
      fr: "Ma colère n'est pas la preuve que je suis mauvais; c'est la preuve que mes limites ont été franchies.",
      es: "Mi ira no demuestra que sea una mala persona; demuestra que mis límites han sido pisoteados.",
    },
  },

  severe_identity_collapse: {
    level: "severe_identity_collapse",
    badge: {
      en: "Severe Identity Collapse / Fawn-Freeze Dominance",
      id: "Kolaps Jati Diri Parah / Dominasi Fawn-Freeze",
      de: "Schwerer Identitätsverlust / Fawn-Freeze-Zustand",
      fr: "Effondrement Identitaire / Domination Fawn-Freeze",
      es: "Colapso Identitario Severo / Dominio Fawn-Freeze",
    },
    title: {
      en: "The Vanishing Chameleon",
      id: "Sang Bunglon yang Menghilang",
      de: "Das erloschene Chamäleon",
      fr: "Le Caméléon Évanescent",
      es: "El Camaleón Invisible",
    },
    tagline: {
      en: "You have completely surrendered your personhood to survive, experiencing utter numbness when left alone.",
      id: "Kamu telah sepenuhnya menumbalkan keberadaan dirimu demi bertahan, merasa hampa dan mati rasa saat sendiri.",
      de: "Sie haben Ihr Selbstbild aufgegeben, um zu überleben – allein bleibt nur betäubende Leere.",
      fr: "Vous avez abdiqué toute individualité pour survivre, ne laissant qu'un vide anesthésié dans la solitude.",
      es: "Has sacrificado toda tu individualidad para sobrevivir; en soledad solo queda un vacío anestesiado.",
    },
    description: {
      en: "Your sense of self has merged almost completely with the demands and emotional states of your environment. You experience somatic symptoms (paralyzing panic, dizziness, gut disorders) whenever you consider having an independent voice. You cycle between intense fawning, dorsal vagal shutdown, and abrupt relationship termination.",
      id: "Jati dirimu hampir sepenuhnya melebur dengan tuntutan dan suasana emosi lingkungan sekitar. Tubuhmu bereaksi keras (panik gemetar, pusing, gangguan pencernaan) setiap kali kamu berniat bersuara mandiri. Kamu terjebak dalam siklus kepatuhan ekstrem, mati rasa total, lalu kabur memutuskan hubungan.",
      de: "Ihre Identität ist fast restlos mit den Erwartungen anderer verschmolzen. Eigene Wünsche lösen körperliche Paniksymptome aus. Sie pendeln zwischen extremem Fawning, innerem Einfrieren und plötzlicher Flucht.",
      fr: "Votre identité s'est dissoute dans les désirs des autres. Exprimer une volonté propre déclenche des vertiges ou des crises d'angoisse. Vous alternez entre soumission servile, freeze et rupture totale.",
      es: "Tu identidad se ha diluido por completo en las exigencias del entorno. Tener criterio propio te provoca pánico y náuseas. Oscilas entre la sumisión ciega, la congelación y la huida abrupta.",
    },
    psychologyInsight: {
      en: "This level reflects profound trauma conditioning where emotional abandonment or retaliation was tied directly to individuality. Healing requires gentle somatic reclamation: re-learning how to feel safe in your own skin before attempting high-stakes interpersonal boundaries.",
      id: "Tingkat ini mencerminkan trauma pengasuhan berat di mana memiliki pendapat sendiri diancam dengan hukuman keras atau pengabaian. Pemulihan membutuhkan rekonstruksi somatis yang lembut: belajar merasa aman di dalam tubuh sendiri sebelum mencoba memasang batasan besar.",
      de: "Dies deutet auf schwere frühe Bindungstraumata hin. Heilung erfordert behutsame somatische Erdung: Sie müssen erst lernen, den eigenen Körper als sicheren Ort zu erfahren, bevor große Grenzen gezogen werden.",
      fr: "Ce niveau traduit un traumatisme d'attachement précoce où l'individualité était synonyme de rejet brutal. La reconstruction exige de réapprendre la sécurité corporelle avant d'affronter de grands conflits.",
      es: "Este cuadro refleja un trauma profundo donde ser uno mismo acarreaba castigo o abandono. Sanar requiere recuperar la seguridad somática en tu propia piel antes de entablar grandes batallas relacionales.",
    },
    actionProtocols: {
      en: [
        "Sensory Preference Recovery: Daily, make 3 small sensory choices purely for yourself (your favorite tea temperature, soap scent, music track) with zero external input.",
        "Establish an inviolable Solo Sanctuary: Spend at least 30 minutes daily in complete solitude with no messaging, calls, or tasks for others.",
        "Professional Trauma Work: Seek an EMDR or Somatic Experiencing therapist specializing in Complex PTSD and Fawn response desensitization.",
      ],
      id: [
        "Pemulihan Preferensi Sensorik: Setiap hari, buat 3 pilihan sensorik kecil murni untuk dirimu (suhu teh, wangi sabun, lagu favorit) tanpa masukan orang lain.",
        "Bentuk Suaka Pribadi: Luangkan minimal 30 menit sehari dalam kesendirian total tanpa membalas chat, telepon, atau mengerjakan tugas orang lain.",
        "Konseling Trauma Profesional: Sangat disarankan mencari terapis Somatic Experiencing atau EMDR yang memahami C-PTSD dan pemulihan refleks Fawn.",
      ],
      de: [
        "Sensorische Selbstentdeckung: Treffen Sie täglich 3 kleine Sinnesentscheidungen nur für sich (Teesorte, Duft, Musik) ohne äußeren Einfluss.",
        "Etablieren Sie eine tägliche Schutzzone: 30 Minuten ungestörte Einsamkeit ohne Smartphone, Pflichten oder Verfügbarkeit für andere.",
        "Traumatherapeutische Begleitung: Suchen Sie Unterstützung durch Somatic Experiencing oder EMDR zur Auflösung frühkindlicher Fawn-Prägungen.",
      ],
      fr: [
        "Reconquête sensorielle: Choisissez chaque jour 3 sensations rien que pour vous (parfum, boisson, musique) sans demander l'avis de personne.",
        "Sanctuaire quotidien inviolable: Isolez-vous 30 minutes par jour sans écran, sans message et sans rendre service à qui que ce soit.",
        "Accompagnement spécialisé: Orientez-vous vers un praticien en Somatic Experiencing ou EMDR formé au C-PTSD et aux réflexes de soumission.",
      ],
      es: [
        "Reconexión sensorial básica: Haz 3 elecciones sensoriales diarias exclusivas para ti (sabor de té, aroma, canción) sin consultar a nadie.",
        "Santuario diario innegociable: Dedica 30 minutos al día a la soledad estricta, sin responder mensajes ni atender demandas ajenas.",
        "Terapia especializada en trauma: Considera el apoyo de un terapeuta de Somatic Experiencing o EMDR para desactivar la sumisión traumática profunda.",
      ],
    },
    dailyAffirmation: {
      en: "I do not need to disappear for other people to love me. I have the right to take up space.",
      id: "Aku tidak perlu melenyapkan diriku agar dicintai orang lain. Aku berhak hadir dan bernapas seutuhnya.",
      de: "Ich muss mich nicht auflösen, um geliebt zu werden. Ich habe das Recht, voll und ganz da zu sein.",
      fr: "Je n'ai pas besoin de disparaître pour mériter l'amour. J'ai le droit légitime d'occuper mon espace.",
      es: "No necesito hacerme invisible para que me quieran. Tengo pleno derecho a existir y ocupar mi lugar.",
    },
  },
};

export function calculateFawnResponseScore(
  answers: Record<number, number>
): FawnResponseScoreResult {
  let compulsiveAppeasementScore = 0;
  let identityErasureScore = 0;
  let postFawnResentmentScore = 0;

  FAWN_RESPONSE_QUESTIONS.forEach((q) => {
    const score = answers[q.id] ?? 0;
    if (q.subscale === "compulsive_appeasement") compulsiveAppeasementScore += score;
    if (q.subscale === "identity_erasure") identityErasureScore += score;
    if (q.subscale === "post_fawn_resentment") postFawnResentmentScore += score;
  });

  const totalScore =
    compulsiveAppeasementScore + identityErasureScore + postFawnResentmentScore;
  const maxScore = 36;
  const percentage = Math.min(100, Math.round((totalScore / maxScore) * 100));

  let level: "low_fawn" | "moderate_appeasement" | "chronic_fawn" | "severe_identity_collapse";

  if (percentage <= 25) {
    level = "low_fawn";
  } else if (percentage <= 52) {
    level = "moderate_appeasement";
  } else if (percentage <= 78) {
    level = "chronic_fawn";
  } else {
    level = "severe_identity_collapse";
  }

  const profile = FAWN_ARCHETYPES[level];

  return {
    totalScore,
    maxScore,
    percentage,
    level,
    subscales: {
      compulsive_appeasement: {
        score: compulsiveAppeasementScore,
        max: 12,
        percentage: Math.min(100, Math.round((compulsiveAppeasementScore / 12) * 100)),
      },
      identity_erasure: {
        score: identityErasureScore,
        max: 12,
        percentage: Math.min(100, Math.round((identityErasureScore / 12) * 100)),
      },
      post_fawn_resentment: {
        score: postFawnResentmentScore,
        max: 12,
        percentage: Math.min(100, Math.round((postFawnResentmentScore / 12) * 100)),
      },
    },
    profile,
  };
}
