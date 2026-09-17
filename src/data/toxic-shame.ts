export type ToxicShameLang = "en" | "id" | "de" | "fr" | "es";

export type ToxicShameSubscale =
  | "defectiveness_conviction"
  | "persecutory_self_contempt"
  | "somatic_shame_collapse";

export interface ToxicShameQuestion {
  id: number;
  subscale: ToxicShameSubscale;
  prompt: Record<ToxicShameLang, string>;
  options: {
    label: Record<ToxicShameLang, string>;
    score: number; // 0 to 3
  }[];
}

export interface ToxicShameArchetypeProfile {
  level: "grounded_self_compassion" | "mild_shame_anxiety" | "chronic_toxic_shame" | "severe_shame_paralysis";
  badge: Record<ToxicShameLang, string>;
  title: Record<ToxicShameLang, string>;
  tagline: Record<ToxicShameLang, string>;
  description: Record<ToxicShameLang, string>;
  psychologyInsight: Record<ToxicShameLang, string>;
  actionProtocols: Record<ToxicShameLang, string[]>;
  dailyAffirmation: Record<ToxicShameLang, string>;
}

export interface ToxicShameScoreResult {
  totalScore: number;
  maxScore: number;
  percentage: number;
  level: "grounded_self_compassion" | "mild_shame_anxiety" | "chronic_toxic_shame" | "severe_shame_paralysis";
  subscales: {
    defectiveness_conviction: { score: number; max: number; percentage: number };
    persecutory_self_contempt: { score: number; max: number; percentage: number };
    somatic_shame_collapse: { score: number; max: number; percentage: number };
  };
  profile: ToxicShameArchetypeProfile;
}

export const TOXIC_SHAME_QUESTIONS: ToxicShameQuestion[] = [
  // Subscale 1: Defectiveness Conviction (Q1 - Q4)
  {
    id: 1,
    subscale: "defectiveness_conviction",
    prompt: {
      en: "Deep down, I carry a persistent feeling that something is fundamentally broken, dirty, or wrong with who I am as a human being.",
      id: "Jauh di lubuk hati, aku membawa perasaan terus-menerus bahwa ada sesuatu yang rusak, kotor, atau salah secara mendasar pada diriku sebagai manusia.",
      de: "Tief im Inneren trage ich das quälende Gefühl, als Mensch grundlegend fehlerhaft, beschädigt oder unzulänglich zu sein.",
      fr: "Au fond de moi, je ressens la conviction lancinante d'être fondamentalement défectueux, indigne ou brisé en tant qu'être humain.",
      es: "En lo más profundo de mi ser, siento que hay algo defectuoso, sucio o irremediablemente roto en mi propia naturaleza.",
    },
    options: [
      {
        score: 0,
        label: {
          en: "Never; I know I am an inherently worthy, complete person",
          id: "Tidak pernah; saya tahu saya adalah manusia yang utuh dan berharga",
          de: "Nie; ich weiß, dass ich ein vollwertiger und liebenswerter Mensch bin",
          fr: "Jamais; je sais que ma valeur humaine fondamentale est intacte",
          es: "Nunca; sé que soy una persona digna y valiosa por naturaleza",
        },
      },
      {
        score: 1,
        label: {
          en: "Occasionally; only when facing heavy failure or social rejection",
          id: "Sesekali; hanya saat menghadapi kegagalan besar atau penolakan sosial",
          de: "Gelegentlich; vor allem bei schweren Rückschlägen",
          fr: "Parfois; uniquement lors d'échecs majeurs ou de ruptures",
          es: "A veces; solo ante fracasos notorios o rechazos dolorosos",
        },
      },
      {
        score: 2,
        label: {
          en: "Frequently; I constantly fear that if people truly knew the 'real me', they would recoil in disgust",
          id: "Sering; aku takut jika orang lain tahu 'diriku yang sebenarnya', mereka akan jijik dan menjauh",
          de: "Häufig; ich fürchte, dass Menschen sich abwenden, wenn sie mein wahres Ich sehen",
          fr: "Souvent; je crains que si les gens découvraient mon 'vrai moi', ils me fuiraient avec dégoût",
          es: "Frecuentemente; temo que si los demás conocieran mi 'verdadero yo', sentirían rechazo y asco",
        },
      },
      {
        score: 3,
        label: {
          en: "Constantly; my defectiveness feels like an undeniable cosmic fact that I must hide every single second",
          id: "Terus-menerus; kecacatanku terasa seperti fakta mutlak yang harus kusembunyikan setiap detik",
          de: "Ständig; meine Unwürdigkeit fühlt sich wie eine unumstößliche Tatsache an, die ich maskieren muss",
          fr: "Constamment; ma nullité me semble un fait absolu que je dois camoufler à chaque seconde",
          es: "Constantemente; mi defecto esencial se siente como una verdad incuestionable que debo ocultar siempre",
        },
      },
    ],
  },
  {
    id: 2,
    subscale: "defectiveness_conviction",
    prompt: {
      en: "While guilt says 'I made a mistake', my automatic internal narrative says 'I AM a mistake'.",
      id: "Ketika rasa bersalah biasa berkata 'Aku berbuat salah', pikiran bawah sadarku secara otomatis berkata 'Dirikulah yang salah/sebuah kesalahan'.",
      de: "Während gesunde Schuld sagt 'Ich habe einen Fehler gemacht', sagt meine innere Stimme 'Ich BIN ein Fehler'.",
      fr: "Là où la culpabilité dit 'J'ai commis une erreur', ma honte murmure 'JE SUIS une erreur vivante'.",
      es: "Mientras la culpa sana dice 'He cometido un error', mi voz interna me dicta 'Yo SOY un error con patas'.",
    },
    options: [
      {
        score: 0,
        label: {
          en: "Never; I clearly separate my behavior from my intrinsic identity",
          id: "Tidak pernah; saya dengan tegas memisahkan perbuatanku dari jati diriku",
          de: "Nie; ich trenne mein Handeln klar von meiner Identität",
          fr: "Jamais; je distingue parfaitement mes actes de mon identité",
          es: "Nunca; separo claramente mis acciones de mi identidad",
        },
      },
      {
        score: 1,
        label: {
          en: "Rarely; occasional self-doubt that I quickly reality-check",
          id: "Jarang; sesekali ragu pada diri sendiri, namun cepat diluruskan logika",
          de: "Selten; kurze Selbstzweifel, die ich rasch relativieren kann",
          fr: "Rarement; de brefs doutes que je recadre rapidement",
          es: "Rara vez; dudas fugaces que corrijo pronto con la razón",
        },
      },
      {
        score: 2,
        label: {
          en: "Often; any slip-up confirms my secret suspicion that I am inadequate",
          id: "Sering; setiap kekhilafan menegaskan kecurigaanku bahwa aku memang tidak layak",
          de: "Oft; jeder Fehltritt bestätigt meinen geheimen Verdacht der Unzulänglichkeit",
          fr: "Souvent; la moindre bévue confirme mon sentiment secret d'incompétence",
          es: "A menudo; cualquier resbalón confirma mi sospecha íntima de incompetencia",
        },
      },
      {
        score: 3,
        label: {
          en: "Always; I feel like a fraudulent imposter merely masquerading as an acceptable human being",
          id: "Selalu; aku merasa seperti penipu yang sekadar menyamar menjadi manusia yang layak diterima",
          de: "Immer; ich fühle mich wie ein Hochstapler, der nur eine Fassade aufrechterhält",
          fr: "Toujours; je me sens comme un imposteur déguisé en être humain fréquentable",
          es: "Siempre; me siento como un impostor que finge ser un ser humano aceptable",
        },
      },
    ],
  },
  {
    id: 3,
    subscale: "defectiveness_conviction",
    prompt: {
      en: "I feel an overwhelming sense of unworthiness when people show me genuine warmth, compliments, or affection.",
      id: "Aku merasakan rasa tidak layak yang teramat sangat ketika orang lain memberikan ketulusan, pujian, atau kasih sayang nyata padaku.",
      de: "Ich fühle mich unwürdig, wenn mir Menschen echte Zuneigung oder ehrliche Komplimente schenken.",
      fr: "Je me sens profondément illégitime lorsque quelqu'un m'exprime une affection sincère ou un compliment.",
      es: "Me siento profundamente indigno cuando alguien me brinda afecto sincero, elogios o ternura.",
    },
    options: [
      {
        score: 0,
        label: {
          en: "Never; I receive praise and love with ease, gratitude, and warmth",
          id: "Tidak pernah; saya menerima pujian dan kasih sayang dengan santai, syukur, dan hangat",
          de: "Nie; ich nehme Lob und Liebe dankbar und gelassen an",
          fr: "Jamais; j'accueille la bienveillance et les compliments avec joie et naturel",
          es: "Nunca; recibo los elogios y el cariño con gratitud y tranquilidad",
        },
      },
      {
        score: 1,
        label: {
          en: "Occasionally; a brief bashfulness, but I accept the kind words",
          id: "Sesekali; agak malu sesaat, namun tetap menerima perkataan baik tersebut",
          de: "Gelegentlich; kurze Verlegenheit, aber ich freue mich darüber",
          fr: "Parfois; un peu timide sur le coup, mais j'apprécie la démarche",
          es: "A veces; cierta timidez inicial, pero agradezco el detalle",
        },
      },
      {
        score: 2,
        label: {
          en: "Frequently; I deflect compliments or assume they just haven't noticed my flaws yet",
          id: "Sering; aku menolak pujian atau mengira mereka hanya belum melihat borok/cacatku saja",
          de: "Häufig; ich wiegle ab und denke, der andere hat meine Fehler bloß noch nicht bemerkt",
          fr: "Souvent; je minimise le compliment en me disant qu'ils n'ont pas encore vu mes failles",
          es: "Frecuentemente; rechazo el elogio pensando que aún no han descubierto mis defectos",
        },
      },
      {
        score: 3,
        label: {
          en: "Always; affection feels like an agonizing debt I can never repay, or a mistake on their part",
          id: "Selalu; kasih sayang terasa seperti hutang menyiksa yang takkan bisa kubayar, atau mereka salah orang",
          de: "Immer; Zuneigung fühlt sich wie eine erdrückende Schuld an, die ich unmöglich tilgen kann",
          fr: "Toujours; l'amour me paraît une dette intolérable ou une erreur de casting tragique",
          es: "Siempre; el cariño se siente como una deuda asfixiante que jamás podré pagar o un error del otro",
        },
      },
    ],
  },
  {
    id: 4,
    subscale: "defectiveness_conviction",
    prompt: {
      en: "I compare myself to others and inevitably conclude that everyone else received an 'owner's manual for life' that I was denied.",
      id: "Aku membandingkan diriku dengan orang lain dan berkesimpulan bahwa orang lain punya 'buku panduan hidup' yang tidak pernah kuterima.",
      de: "Ich vergleiche mich mit anderen und denke, alle bekamen eine 'Gebrauchsanweisung fürs Leben' – nur ich nicht.",
      fr: "En me comparant aux autres, j'en déduis que tout le monde a reçu le 'mode d'emploi de la vie' sauf moi.",
      es: "Al compararme con los demás, concluyo que a todos les entregaron el 'manual de instrucciones de la vida' menos a mí.",
    },
    options: [
      {
        score: 0,
        label: {
          en: "Never; I know we are all figuring out life as we go along",
          id: "Tidak pernah; saya tahu kita semua sama-sama sedang belajar menjalani hidup",
          de: "Nie; ich weiß, dass wir alle nur mit Wasser kochen und dazulernen",
          fr: "Jamais; je sais que chacun avance à tâtons et fait de son mieux",
          es: "Nunca; sé que todos improvisamos y aprendemos por el camino",
        },
      },
      {
        score: 1,
        label: {
          en: "Rarely; only when seeing peers reach milestones ahead of me",
          id: "Jarang; hanya saat melihat teman sebaya mencapai target hidup lebih dulu",
          de: "Selten; nur bei großen Meilensteinen Gleichaltriger",
          fr: "Rarement; seulement lors de grandes étapes franchies par des pairs",
          es: "Rara vez; solo ante grandes logros de mis compañeros",
        },
      },
      {
        score: 2,
        label: {
          en: "Often; I feel inherently alienated, like an outsider looking into a world I don't belong to",
          id: "Sering; aku merasa terasing, seperti orang luar yang mengintip dunia yang bukan tempatku",
          de: "Oft; ich fühle mich wie ein Fremder, der von außen in eine verschlossene Welt blickt",
          fr: "Souvent; je me sens comme un extraterrestre observant un monde auquel je n'appartiens pas",
          es: "A menudo; me siento como un extraño que mira desde fuera un mundo que le está vedado",
        },
      },
      {
        score: 3,
        label: {
          en: "Always; a profound, existential sense of defectiveness isolates me from the entire human species",
          id: "Selalu; rasa cacat eksistensial yang mendalam mengisolasiku dari seluruh umat manusia",
          de: "Immer; eine existenzielle Fremdheit schneidet mich von der menschlichen Gemeinschaft ab",
          fr: "Toujours; un sentiment d'inadéquation viscéral me coupe de toute communauté humaine",
          es: "Siempre; un aislamiento existencial devastador me separa por completo del resto de los humanos",
        },
      },
    ],
  },

  // Subscale 2: Persecutory Self-Contempt & Internal Brutality (Q5 - Q8)
  {
    id: 5,
    subscale: "persecutory_self_contempt",
    prompt: {
      en: "My internal monologue speaks to me with vicious contempt, cruelty, and insults that I would never dare say to another human being.",
      id: "Monolog batinku berbicara padaku dengan nada menghina, kejam, dan makian yang takkan pernah berani kuucapkan pada orang lain.",
      de: "Meine innere Stimme beschimpft mich mit einer Härte und Verachtung, die ich niemals einem anderen antun würde.",
      fr: "Ma voix intérieure me traite avec une cruauté, un mépris et des insultes que je n'oserais jamais adresser à autrui.",
      es: "Mi monólogo interior me habla con un desprecio, crueldad e insultos que jamás me atrevería a escupirle a nadie.",
    },
    options: [
      {
        score: 0,
        label: {
          en: "Never; my inner voice is encouraging, supportive, and kind",
          id: "Tidak pernah; suara batinku menyemangati, suportif, dan ramah",
          de: "Nie; mein innerer Dialog ist verständnisvoll, freundlich und wohlwollend",
          fr: "Jamais; mon discours intérieur est bienveillant, constructif et doux",
          es: "Nunca; mi diálogo interno es comprensivo, constructivo y amable",
        },
      },
      {
        score: 1,
        label: {
          en: "Occasionally; a sharp tone when frustrated, but it quickly softens",
          id: "Sesekali; nada agak ketus saat kesal, namun cepat melembut kembali",
          de: "Gelegentlich; etwas streng bei Frust, fängt sich aber schnell wieder",
          fr: "Parfois; un peu dur en cas de grosse bêtise, mais cela s'adoucit vite",
          es: "A veces; algo severo en momentos de rabia, pero se suaviza pronto",
        },
      },
      {
        score: 2,
        label: {
          en: "Frequently; I habitually call myself 'stupid', 'pathetic', or 'disgusting' over small errors",
          id: "Sering; aku terbiasa menyebut diriku 'bodoh', 'menyedihkan', atau 'menjijikkan' karena hal kecil",
          de: "Häufig; ich nenne mich bei kleinen Fehlern reflexartig 'dumm' oder 'erbärmlich'",
          fr: "Souvent; je me traite machinalement de 'crétin', 'nul' ou 'dégoûtant' au moindre faux pas",
          es: "Frecuentemente; me llamo 'estúpido', 'patético' o 'inútil' ante el menor despiste",
        },
      },
      {
        score: 3,
        label: {
          en: "Constantly; I live with an abusive internal warden who relentlessly tortures and berates me all day",
          id: "Terus-menerus; aku hidup bersama sipir batin yang kejam, menyiksa dan memaki diriku sepanjang hari",
          de: "Ständig; in mir haust ein sadistischer Zensor, der mich von morgens bis abends niederbrüllt",
          fr: "Constamment; je cohabite avec un bourreau intérieur impitoyable qui me flagelle en permanence",
          es: "Constantemente; convivo con un verdugo interior despiadado que me martiriza e insulta todo el día",
        },
      },
    ],
  },
  {
    id: 6,
    subscale: "persecutory_self_contempt",
    prompt: {
      en: "When something goes wrong in a relationship or work project, my default instinct is to blame myself completely, even when others were clearly responsible.",
      id: "Saat terjadi masalah dalam hubungan atau proyek kantor, insting pertamaku adalah menyalahkan diriku sepenuhnya, bahkan saat orang lain yang jelas bersalah.",
      de: "Geht etwas schief, suche ich die Schuld reflexartig bei mir – selbst wenn andere offensichtlich schuld waren.",
      fr: "Dès qu'un problème surgit, mon réflexe est de m'accuser de tout, même si la faute incombe aux autres.",
      es: "Si algo sale mal, mi primer reflejo es culparme por completo, incluso cuando la responsabilidad es de otros.",
    },
    options: [
      {
        score: 0,
        label: {
          en: "Never; I evaluate responsibility fairly and objectively",
          id: "Tidak pernah; saya menilai porsi tanggung jawab secara adil dan objektif",
          de: "Nie; ich analysiere Verantwortlichkeiten sachlich und gerecht",
          fr: "Jamais; je répartis les responsabilités avec lucidité et équité",
          es: "Nunca; evalúo las responsabilidades con objetividad y justicia",
        },
      },
      {
        score: 1,
        label: {
          en: "Rarely; I look at my role first, but acknowledge external factors",
          id: "Jarang; saya melihat peran saya dulu, namun tetap mengakui faktor luar",
          de: "Selten; ich hinterfrage mich, sehe aber auch äußere Umstände",
          fr: "Rarement; j'examine ma part d'erreur sans endosser celle des autres",
          es: "Rara vez; examino mi parte pero no cargo con lo que no es mío",
        },
      },
      {
        score: 2,
        label: {
          en: "Often; taking the blame feels safer than admitting someone else harmed me",
          id: "Sering; menanggung kesalahan terasa lebih aman daripada mengakui orang lain melukaiku",
          de: "Oft; die Schuld auf mich zu nehmen fühlt sich sicherer an als Streit",
          fr: "Souvent; endosser la faute me paraît plus rassurant qu'affronter le conflit",
          es: "A menudo; asumir la culpa me resulta más seguro que encarar el daño ajeno",
        },
      },
      {
        score: 3,
        label: {
          en: "Always; I am the universal scapegoat of my own mind. Everything broken in the world is somehow my fault.",
          id: "Selalu; aku adalah kambing hitam abadi di pikiranku sendiri. Segala hal yang rusak di dunia seolah salahku.",
          de: "Immer; ich bin der ewige Sündenbock meiner Psyche. Jedes Unheil wird mir angelastet.",
          fr: "Toujours; je suis le bouc émissaire permanent de mon esprit: tout désastre m'est imputable.",
          es: "Siempre; soy el chivo expiatorio de mi propia mente: cualquier desgracia parece culpa mía.",
        },
      },
    ],
  },
  {
    id: 7,
    subscale: "persecutory_self_contempt",
    prompt: {
      en: "I engage in subtle physical self-punishment (depriving myself of food, sleep, comfortable seating, or medical care) because I feel I don't deserve comfort.",
      id: "Aku melakukan hukuman fisik halus pada diri sendiri (menahan makan, menolak tidur cukup, duduk di tempat keras, menunda ke dokter) karena merasa tak pantas nyaman.",
      de: "Ich bestrafe mich körperlich (verwehre mir Essen, Schlaf, Wärme oder Arztbesuche), weil ich Komfort nicht 'verdiene'.",
      fr: "Je m'inflige des punitions physiques (sauter un repas, me priver de sommeil ou de soins) car je ne 'mérite' pas le confort.",
      es: "Me castigo físicamente (privándome de comida, descanso, ropa abrigada o médico) porque siento que no 'merezco' estar bien.",
    },
    options: [
      {
        score: 0,
        label: {
          en: "Never; I care for my physical body with tender respect and nourishment",
          id: "Tidak pernah; saya merawat tubuh fisikku dengan penuh rasa sayang dan hormat",
          de: "Nie; ich behandle meinen Körper achtsam, liebevoll und fürsorglich",
          fr: "Jamais; je prends soin de mon corps avec respect et bienveillance",
          es: "Nunca; cuido mi cuerpo con respeto, alimento sano y descanso merecido",
        },
      },
      {
        score: 1,
        label: {
          en: "Occasionally; mostly neglecting sleep during intense work sprints",
          id: "Sesekali; paling hanya kurang tidur saat lembur kerjaan berat",
          de: "Gelegentlich; Schlafmangel bei beruflichen Spitzenzeiten",
          fr: "Parfois; rogner sur le sommeil en période d'examen ou de charrette",
          es: "A veces; escatimar horas de sueño en entregas laborales límite",
        },
      },
      {
        score: 2,
        label: {
          en: "Frequently; I feel an involuntary grim satisfaction when I suffer physical hardship",
          id: "Sering; ada rasa puas suram yang aneh saat aku menderita ketidaknyamanan fisik",
          de: "Häufig; eine düstere Genugtuung, wenn ich mir Gutes versage",
          fr: "Souvent; une sombre satisfaction à endurer la privation et la pénibilité",
          es: "Frecuentemente; siento una amarga satisfacción al negarme el bienestar",
        },
      },
      {
        score: 3,
        label: {
          en: "Constantly; self-deprivation and ascetic self-flagellation are daily rituals to atone for existing",
          id: "Terus-menerus; menyiksa diri dan menahan kenikmatan adalah ritual harianku untuk menebus rasa bersalah karena masih hidup",
          de: "Ständig; Selbstkasteiung ist mein tägliches Ritual, um meine Existenz zu sühnen",
          fr: "Constamment; la mortification quotidienne est mon rituel pour expier ma simple présence",
          es: "Constantemente; la autoflagelación cotidiana es mi penitencia por el hecho de existir",
        },
      },
    ],
  },
  {
    id: 8,
    subscale: "persecutory_self_contempt",
    prompt: {
      en: "Past embarrassing moments or mistakes from 5, 10, or 15 years ago pop into my head and trigger a fresh, agonizing convulsion of self-hatred.",
      id: "Momen memalukan atau kesalahan dari 5, 10, atau 15 tahun lalu tiba-tiba muncul di kepala dan memicu gelombang kebencian diri yang segar dan menyiksa.",
      de: "Peinliche Momente von vor 10 Jahren schießen mir in den Kopf und lösen akute Krämpfe von Selbsthass aus.",
      fr: "Des souvenirs honteux datant de 10 ans ressurgissent et déclenchent un spasme cuisant de haine de moi.",
      es: "Recuerdos bochornosos de hace 10 o 15 años me asaltan de golpe y provocan una punzada ardiente de autodesprecio.",
    },
    options: [
      {
        score: 0,
        label: {
          en: "Never; past blunders make me smile with compassionate amusement",
          id: "Tidak pernah; kesalahan masa lalu membuatku tersenyum geli dengan penuh pemakluman",
          de: "Nie; über Jugendsünden kann ich heute milde schmunzeln",
          fr: "Jamais; je souris avec tendresse de mes maladresses d'autrefois",
          es: "Nunca; sonrío con ternura y compasión ante mis torpezas del pasado",
        },
      },
      {
        score: 1,
        label: {
          en: "Occasionally; a brief cringe, then I remind myself I have grown",
          id: "Sesekali; sempat risih sebentar, lalu kuingatkan diriku bahwa aku sudah bertumbuh",
          de: "Gelegentlich; kurzes Schaudern, aber ich weiß, dass ich gewachsen bin",
          fr: "Parfois; un bref frisson gêné, vite effacé par la maturité",
          es: "A veces; una ligera mueca de pudor, pero sé que he madurado",
        },
      },
      {
        score: 2,
        label: {
          en: "Frequently; memories ambush me in the shower or bed, causing me to gasp or mutter aloud",
          id: "Sering; ingatan itu menyergapku di kamar mandi atau kasur, membuatku menghela napas atau menggumam sendiri",
          de: "Häufig; peinliche Erinnerungen überrumpeln mich und ich zucke innerlich zusammen",
          fr: "Souvent; ces flashs me frappent sous la douche et me font gémir de honte",
          es: "Frecuentemente; los recuerdos me asaltan en la cama y me hacen suspirar de vergüenza",
        },
      },
      {
        score: 3,
        label: {
          en: "Constantly; my brain keeps a meticulously cataloged torture archive of every awkward second of my life",
          id: "Terus-menerus; otakku menyimpan arsip siksaan terperinci atas setiap detik canggung sepanjang hidupku",
          de: "Ständig; mein Gehirn führt ein lückenloses Folterarchiv jeder peinlichen Sekunde meines Lebens",
          fr: "Constamment; mon cerveau entretient des archives de torture méticuleuses de chaque maladresse",
          es: "Constantemente; mi mente guarda un archivo de tortura con cada segundo torpe de mi biografía",
        },
      },
    ],
  },

  // Subscale 3: Somatic Shame Collapse & Hiding Reflex (Q9 - Q12)
  {
    id: 9,
    subscale: "somatic_shame_collapse",
    prompt: {
      en: "When shame hits, I experience a visceral physical collapse: my posture hunches, my chest sinks, and I have a desperate urge to dissolve through the floor.",
      id: "Saat rasa malu menyerang, tubuhku mengalami keruntuhan fisik nyata: punggung membungkuk, dada terasa ambles, dan ada dorongan kuat ingin lebur menembus lantai.",
      de: "Packt mich Scham, sackt mein Körper in sich zusammen: Brustkorb fällt ein, Blick weicht aus, ich will im Boden versinken.",
      fr: "Quand la honte frappe, mon corps s'affaisse: dos voûté, cage thoracique écrasée, envie viscérale de disparaître sous terre.",
      es: "Ante la vergüenza, mi cuerpo sufre un colapso físico: me encorvo, el pecho se me hunde y quiero que la tierra me trague.",
    },
    options: [
      {
        score: 0,
        label: {
          en: "Never; I maintain upright, relaxed physical dignity even during difficult moments",
          id: "Tidak pernah; saya menjaga postur tegap dan martabat tubuh yang tenang bahkan di saat sulit",
          de: "Nie; ich bleibe aufrecht, geerdet und atme ruhig durch",
          fr: "Jamais; je garde une posture digne, ancrée et droite même dans la tourmente",
          es: "Nunca; mantengo una postura erguida, relajada y digna en momentos difíciles",
        },
      },
      {
        score: 1,
        label: {
          en: "Mildly; a momentary flush of heat or downward glance that passes quickly",
          id: "Sedikit; rasa hangat sesaat di wajah atau menunduk sejenak yang cepat berlalu",
          de: "Leicht; kurzes Erröten oder Senken des Blicks, verfliegt rasch",
          fr: "Légèrement; un bref coup de chaud ou un regard baissé passager",
          es: "Levemente; un breve sofoco o desvío de mirada que pasa pronto",
        },
      },
      {
        score: 2,
        label: {
          en: "Often; my breath freezes, my stomach cramps, and my eyes cannot meet other people's eyes",
          id: "Sering; napasku tertahan, perut melilit, dan mataku tak sanggup menatap mata orang lain",
          de: "Oft; der Atem stockt, der Magen krampft und ich kann niemandem in die Augen blicken",
          fr: "Souvent; mon souffle se bloque, mon ventre se noue, impossible de soutenir un regard",
          es: "A menudo; se me corta la respiración, el estómago se me anuda y rehúyo el contacto visual",
        },
      },
      {
        score: 3,
        label: {
          en: "Severe dorsal vagal shutdown; I experience near-numbness, dizziness, and complete paralysis of presence",
          id: "Pembekuan saraf parah (dorsal vagal shutdown); aku merasa mati rasa, limbung, dan lumpuh total keberadaanku",
          de: "Völliges Einfrieren (Dorsal Vagal Shutdown); Taubheit, Schwindel und absolute Lähmung",
          fr: "Sidération dorsale sévère; engourdissement, vertige et effacement corporel absolu",
          es: "Parálisis vagal dorsal extrema; adormecimiento físico, mareo y anulación absoluta de mi presencia",
        },
      },
    ],
  },
  {
    id: 10,
    subscale: "somatic_shame_collapse",
    prompt: {
      en: "I hide my creative work, true opinions, desires, or physical body (wearing oversized clothing, staying silent in meetings) to avoid drawing evaluation.",
      id: "Aku menyembunyikan karya kreatif, opini jujur, keinginan, atau tubuh fisikku (memakai baju kedodoran, membisu di rapat) demi menghindari penilaian orang.",
      de: "Ich verstecke meine Ideen, Meinungen und meinen Körper (weite Kleidung, Schweigen), um bloß keine Blicke auf mich zu ziehen.",
      fr: "Je dissimule mes créations, mes avis vrais et mon corps (vêtements amples, silence en réunion) pour éviter tout regard.",
      es: "Oculto mi trabajo creativo, mis opiniones sinceras y mi propio cuerpo (ropa holgada, mutismo en reuniones) para evitar el escrutinio.",
    },
    options: [
      {
        score: 0,
        label: {
          en: "Never; I take up space comfortably and express my ideas with confidence",
          id: "Tidak pernah; saya nyaman mengambil ruang dan mengekspresikan gagasanku dengan percaya diri",
          de: "Nie; ich nehme mir selbstverständlich Raum und vertrete meine Ideen",
          fr: "Jamais; j'occupe ma place avec légitimité et partage mes idées sans crainte",
          es: "Nunca; ocupo mi espacio con naturalidad y expreso mis ideas con soltura",
        },
      },
      {
        score: 1,
        label: {
          en: "Occasionally; depending on the audience and how safe the environment feels",
          id: "Sesekali; tergantung siapa audiensnya dan seberapa aman suasana saat itu",
          de: "Gelegentlich; abhängig vom Umfeld und der Vertrautheit der Gruppe",
          fr: "Parfois; selon le public et le climat de confiance ressenti",
          es: "A veces; según la confianza que me transmita el entorno",
        },
      },
      {
        score: 2,
        label: {
          en: "Frequently; flying under the radar feels like my primary shield against exposure",
          id: "Sering; hidup tanpa terlihat (under the radar) adalah tameng utamaku dari sorotan",
          de: "Häufig; unter dem Radar zu fliegen ist meine sicherste Rüstung",
          fr: "Souvent; me fondre dans le décor est ma principale armure contre l'exposition",
          es: "Frecuentemente; pasar desapercibido es mi trinchera contra la exposición",
        },
      },
      {
        score: 3,
        label: {
          en: "Always; I live as an invisible ghost. Being perceived feels like standing naked under high-voltage stadium lights.",
          id: "Selalu; aku hidup seperti hantu yang tak kasat mata. Disorot orang terasa seperti berdiri telanjang di bawah lampu stadion tegangan tinggi.",
          de: "Immer; ich lebe unsichtbar. Gesehen zu werden fühlt sich an wie nackt im Scheinwerferlicht",
          fr: "Toujours; j'existe comme une ombre. Être perçu ressemble à être exposé nu sous des projecteurs féroces",
          es: "Siempre; vivo como un espectro. Sentirme visto equivale a estar desnudo bajo focos de estadio",
        },
      },
    ],
  },
  {
    id: 11,
    subscale: "somatic_shame_collapse",
    prompt: {
      en: "I isolate myself for days after social interactions because I replay every single word I said and feel overwhelming shame about my existence.",
      id: "Aku mengurung diri berhari-hari setelah kumpul-kumpul karena memutar ulang setiap kata yang kuucapkan dan merasa sangat malu atas keberadaanku.",
      de: "Nach Treffen ziehe ich mich tagelang zurück, zerkaue jedes Wort und schäme mich für meine Existenz.",
      fr: "Après une soirée, je m'isole des jours entiers à disséquer chaque phrase prononcée dans une honte indicible.",
      es: "Me aíslo durante días tras un evento social rumiando cada palabra que dije con un bochorno abrasador.",
    },
    options: [
      {
        score: 0,
        label: {
          en: "Never; social events energize me and I leave the conversation in the past",
          id: "Tidak pernah; acara sosial menyegarkanku dan obrolan sudah selesai di sana",
          de: "Nie; Treffen nähren mich und Vergangenes bleibt vergangen",
          fr: "Jamais; les échanges me stimulent et je n'y repense pas avec angoisse",
          es: "Nunca; los encuentros me nutren y dejo las conversaciones en su sitio",
        },
      },
      {
        score: 1,
        label: {
          en: "Rarely; occasional post-event processing, but no lingering agony",
          id: "Jarang; sesekali mengingat kembali, namun tanpa rasa tersiksa yang mendalam",
          de: "Selten; kurzes Nachdenken, aber keine anhaltende Qual",
          fr: "Rarement; une brève réflexion mais aucune souffrance",
          es: "Rara vez; un balance fugaz sin mayor tormento",
        },
      },
      {
        score: 2,
        label: {
          en: "Often; the 'post-social vulnerability hangover' drains my energy for 48 hours",
          id: "Sering; rasa lelah dan malu usai kumpul sosial menguras energiku selama 48 jam",
          de: "Oft; der 'Kater nach Nähe' lähmt mich für zwei Tage komplett",
          fr: "Souvent; cette gueule de bois émotionnelle me vide pendant 48 heures",
          es: "A menudo; la resaca de vulnerabilidad me deja seco durante dos días",
        },
      },
      {
        score: 3,
        label: {
          en: "Always; every social encounter is followed by a prolonged, painful exile in my cave of shame",
          id: "Selalu; setiap interaksi sosial disusul oleh pengasingan panjang yang menyakitkan di gua rasa maluku",
          de: "Immer; jeder Kontakt endet in schmerzhafter Verbannung in meine Scham-Höhle",
          fr: "Toujours; toute rencontre sociale me condamne à un exil douloureux dans ma tanière de honte",
          es: "Siempre; cada contacto humano desemboca en un exilio doloroso dentro de mi cueva de vergüenza",
        },
      },
    ],
  },
  {
    id: 12,
    subscale: "somatic_shame_collapse",
    prompt: {
      en: "I find it nearly impossible to look at myself in the mirror with warmth, feeling an involuntary aversion or disgust toward my own face and body.",
      id: "Aku merasa hampir mustahil menatap diriku di cermin dengan hangat, merasakan keengganan atau rasa jijik yang refleks terhadap wajah dan tubuhku sendiri.",
      de: "Ich kann kaum liebevoll in den Spiegel schauen; ich empfinde reflexartige Abneigung gegen mein Gesicht.",
      fr: "Il m'est presque impossible de me regarder dans un miroir avec tendresse; je ressens un dégoût viscéral.",
      es: "Me resulta casi imposible mirarme al espejo con ternura; siento un rechazo o asco reflejo hacia mi propio rostro.",
    },
    options: [
      {
        score: 0,
        label: {
          en: "Never; I look in the mirror with affection, kindness, and self-acceptance",
          id: "Tidak pernah; saya menatap cermin dengan kasih sayang, kelembutan, dan penerimaan diri",
          de: "Nie; ich blicke mir freundlich, wohlwollend und liebevoll in die Augen",
          fr: "Jamais; je me regarde avec douceur, bienveillance et pleine acceptation",
          es: "Nunca; me miro al espejo con cariño, amabilidad y aceptación sincera",
        },
      },
      {
        score: 1,
        label: {
          en: "Occasionally; mostly noticing tiredness or messy hair, but fundamentally accepting",
          id: "Sesekali; paling hanya memperhatikan wajah lelah atau rambut berantakan, namun dasarnya menerima",
          de: "Gelegentlich; bemerke Müdigkeit, akzeptiere mich aber im Ganzen",
          fr: "Parfois; je constate ma fatigue mais sans haine corporelle",
          es: "A veces; veo cansancio o mal pelo, pero con aceptación de fondo",
        },
      },
      {
        score: 2,
        label: {
          en: "Frequently; I avoid reflective surfaces or quickly look away to prevent shame spirals",
          id: "Sering; aku menghindari cermin atau lekas buang muka demi mencegah spiral rasa malu",
          de: "Häufig; ich meide Spiegel oder schaue schnell weg, um Scham zu entgehen",
          fr: "Souvent; j'évite les reflets pour ne pas déclencher une crise de dégoût",
          es: "Frecuentemente; evito los espejos o aparto la vista para no entrar en espirales de rechazo",
        },
      },
      {
        score: 3,
        label: {
          en: "Always; my reflection feels like the face of a grotesque stranger that I cannot stand to inhabit",
          id: "Selalu; bayanganku terasa seperti wajah orang asing yang mengerikan yang tak sudi kuhuni",
          de: "Immer; mein Spiegelbild wirkt wie eine fremde, abstoßende Gestalt, die ich kaum ertrage",
          fr: "Toujours; mon reflet me semble celui d'un intrus grotesque que j'ai horreur d'habiter",
          es: "Siempre; mi reflejo parece el rostro de un extraño grotesco cuya piel no soporto habitar",
        },
      },
    ],
  },
];

export const TOXIC_SHAME_ARCHETYPES: Record<
  "grounded_self_compassion" | "mild_shame_anxiety" | "chronic_toxic_shame" | "severe_shame_paralysis",
  ToxicShameArchetypeProfile
> = {
  grounded_self_compassion: {
    level: "grounded_self_compassion",
    badge: {
      en: "Grounded Self-Compassion / Inherent Dignity",
      id: "Welas Asih Berakar / Martabat Batin Sehat",
      de: "Geerdetes Selbstmitgefühl / Unantastbare Würde",
      fr: "Auto-Compassion Enracinée / Dignité Intacte",
      es: "Autocompasión Enraizada / Dignidad Inviolable",
    },
    title: {
      en: "The Compassionate Sovereign",
      id: "Sang Penguasa Berwelas Asih",
      de: "Der souveräne Selbstversöhner",
      fr: "Le Souverain Bienveillant",
      es: "El Soberano Compasivo",
    },
    tagline: {
      en: "You hold healthy guilt when you make mistakes, but your core human worth remains sacred.",
      id: "Kamu memegang rasa bersalah yang sehat saat khilaf, namun harga dirimu tetap sakral.",
      de: "Sie empfinden gesunde Reue bei Fehlern, doch Ihr innerer Wert bleibt unerschütterlich.",
      fr: "Vous ressentez une saine culpabilité en cas d'erreur, mais votre dignité demeure intouchable.",
      es: "Sientes culpa constructiva si fallas, pero tu valor humano permanece intacto y sagrado.",
    },
    description: {
      en: "Your psyche clearly differentiates between guilt ('I made a mistake') and toxic shame ('I am a mistake'). When you stumble, you make repairs without descending into visceral self-contempt or hiding in exile. You treat your inner child with the same warmth you would offer a dearest friend.",
      id: "Psikismu dengan tegas membedakan antara rasa bersalah ('Aku berbuat salah') dan rasa malu beracun ('Dirikulah yang salah'). Saat tersandung, kamu memperbaiki keadaan tanpa terpuruk dalam kebencian diri atau mengasingkan diri. Kamu memperlakukan diri dengan kehangatan seperti memperlakukan sahabat terbaik.",
      de: "Ihre Psyche unterscheidet klar zwischen gesunder Schuld und toxischer Scham. Nach Fehlern suchen Sie Wiedergutmachung, ohne in Selbstverachtung zu versinken. Sie begegnen Ihrem inneren Kind mit liebevollem Respekt.",
      fr: "Votre esprit distingue la culpabilité saine de la honte toxique. Face à un échec, vous réparez sans vous détruire ni vous cacher. Vous traitez votre enfant intérieur avec l'égarement d'un ami très cher.",
      es: "Tu psique diferencia con nitidez la culpa constructiva de la vergüenza tóxica. Ante el error buscas reparar sin caer en el autodesprecio. Tratas a tu niño interior con el afecto que darías a tu mejor amigo.",
    },
    psychologyInsight: {
      en: "As documented in John Bradshaw's *Healing the Shame That Binds You* and Dr. Kristin Neff's Mindful Self-Compassion framework, your ventral vagal nervous system provides a neurobiological safety anchor, de-escalating the dorsal shame-collapse loop.",
      id: "Sebagaimana dirumuskan dalam karya John Bradshaw *Healing the Shame That Binds You* dan kerangka Mindful Self-Compassion Dr. Kristin Neff, sistem saraf ventral vagalmu menyediakan jangkar keamanan neurobiologis, meredam siklus kolaps rasa malu dorsal.",
      de: "Nach John Bradshaw und Dr. Kristin Neff (Self-Compassion) bietet Ihr ventraler Vagusnerv sicheren Halt. Er verhindert den biologischen Kollaps in die Schamstarre.",
      fr: "Selon John Bradshaw et le Dr Kristin Neff, votre système nerveux ventral vagal fait office de rempart biologique, désamorçant l'effondrement corporel de la honte.",
      es: "Según John Bradshaw y la Dra. Kristin Neff, tu freno vagal ventral ofrece un ancla biológica segura, impidiendo el colapso dorsal de la vergüenza.",
    },
    actionProtocols: {
      en: [
        "Continue practicing Neff's 3-step Self-Compassion Break (Mindfulness, Common Humanity, Self-Kindness).",
        "Celebrate mistakes as essential scientific data in the school of human life.",
        "Model compassionate self-correction for colleagues, children, and friends.",
      ],
      id: [
        "Lanjutkan latihan Jeda Welas Asih 3 Langkah Kristin Neff (Mindfulness, Kemanusiaan Bersama, Kebaikan Diri).",
        "Rayakan kesalahan sebagai data belajar ilmiah yang berharga di universitas kehidupan.",
        "Jadilah teladan koreksi diri yang penuh welas asih bagi rekan kerja, anak, dan teman.",
      ],
      de: [
        "Üben Sie weiterhin die 3 Schritte der Selbstmitgefühlspause nach Dr. Neff.",
        "Betrachten Sie Fehler als wertvolle Lernerfahrungen auf dem Lebensweg.",
        "Seien Sie Vorbild für eine fehlerfreundliche, würdevolle Korrekturkultur.",
      ],
      fr: [
        "Poursuivez la pause d'auto-compassion en 3 temps (Présence, Humanité partagée, Douceur).",
        "Célébrez les erreurs comme des données d'apprentissage précieuses.",
        "Incarnez une culture du pardon et de la réparation constructive autour de vous.",
      ],
      es: [
        "Continúa aplicando la pausa de autocompasión de 3 pasos (Atención plena, Humanidad compartida, Bondad hacia uno mismo).",
        "Abraza los errores como información valiosa de aprendizaje vital.",
        "Sé un referente de corrección digna y afectuosa para tu entorno.",
      ],
    },
    dailyAffirmation: {
      en: "I am allowed to be human, messy, and growing. I belong to this earth exactly as I am.",
      id: "Aku diizinkan menjadi manusiawi, tidak sempurna, dan terus bertumbuh. Aku berhak ada di bumi ini seutuhnya.",
      de: "Ich darf menschlich, unfertig und im Werden sein. Ich gehöre auf diese Erde, genau so wie ich bin.",
      fr: "J'ai le droit d'être humain, imparfait et en chemin. J'ai toute ma place sur cette terre tel que je suis.",
      es: "Tengo derecho a ser humano, imperfecto y cambiante. Pertenezco a esta tierra exactamente tal como soy.",
    },
  },

  mild_shame_anxiety: {
    level: "mild_shame_anxiety",
    badge: {
      en: "The Guarded Perfectionist / Performance Worth",
      id: "Perfeksionis Waspada / Harga Diri Bersyarat",
      de: "Der vorsichtige Perfektionist / Bedingter Selbstwert",
      fr: "Le Perfectionniste Prudent / Valeur Conditionnelle",
      es: "El Perfeccionista Cauteloso / Valía Condicional",
    },
    title: {
      en: "The Striving Shield",
      id: "Sang Pembela Prestasi",
      de: "Der leistungsorientierte Schild",
      fr: "Le Bouclier de la Performance",
      es: "El Escudo del Esfuerzo",
    },
    tagline: {
      en: "You work tirelessly to outrun an undercurrent of unworthiness through achievement and being 'good'.",
      id: "Kamu bekerja tanpa henti mendahului rasa tidak layak melalui prestasi dan tampil 'selalu baik'.",
      de: "Sie leisten unermüdlich Großes, um einem nagenden Gefühl von Unzulänglichkeit davonzulaufen.",
      fr: "Vous vous surpassez sans cesse pour fuir un sentiment diffus d'illégitimité par la réussite.",
      es: "Te desvives rindiendo al máximo para escapar de un sordo complejo de insuficiencia a través del éxito.",
    },
    description: {
      en: "You appear confident, responsible, and composed on the surface. However, beneath your high achievements lies a quiet fear of being found out. You use perfectionism, punctuality, and people-pleasing as an armored shield: if you never make a mistake, the dragon of shame cannot bite you. Flaws trigger intense vulnerability hangovers.",
      id: "Kamu tampak percaya diri, bertanggung jawab, dan tenang di permukaan. Namun di balik prestasimu, tersimpan rasa takut rahasia akan terbongkar. Kamu memakai perfeksionisme dan kepatuhan sebagai perisai baja: jika kamu tidak pernah salah, naga rasa malu takkan bisa menggigitmu. Cela kecil memicu lelah batin berkepanjangan.",
      de: "Nach außen wirken Sie souverän und verlässlich. Doch hinter Ihren Erfolgen lauert die Angst vor Enttarnung. Sie nutzen Fleiß als Schutzpanzer: Solange alles fehlerfrei ist, kann die Scham Sie nicht packen.",
      fr: "En surface, vous inspirez confiance et sérieux. Mais sous vos réussites sommeille la hantise d'être démasqué. Vous utilisez le perfectionnisme comme une cuirasse pour tenir la honte à distance.",
      es: "Pareces seguro, brillante y responsable. Sin embargo, bajo tus logros late el miedo a ser descubierto. Usas el perfeccionismo como trinchera: si no fallas, la vergüenza no te alcanza.",
    },
    psychologyInsight: {
      en: "This represents 'adaptive shame management'. In childhood, affection was often conditioned on high performance, leading your nervous system to link rest or error with emotional exile.",
      id: "Ini mencerminkan 'manajemen rasa malu adaptif'. Di masa kecil, kasih sayang seringkali bersyarat pada prestasi, membuat sistem sarafmu mengaitkan istirahat atau kesalahan dengan ancaman pengasingan emosional.",
      de: "Dies ist 'adaptives Scham-Management'. Liebe war in der Kindheit oft an Leistung geknüpft; Fehler wurden unbewusst mit Beziehungsverlust gleichgesetzt.",
      fr: "C'est une 'gestion adaptative de la honte'. L'amour d'enfance étant conditionné à la performance, votre cerveau associe l'imperfection à l'abandon.",
      es: "Es una 'gestión adaptativa de la vergüenza'. Si el afecto infantil dependía de las notas o el porte, tu biología asocia el fallo con el repudio.",
    },
    actionProtocols: {
      en: [
        "Somatic Hand on Heart: When a mistake occurs, place your right palm firmly over your sternum and take 3 deep diaphragmatic breaths to physically ground warmth.",
        "Practice Intentional Micro-Imperfection: Leave a small harmless typo in a draft or a crooked towel to desensitize perfectionist panic.",
        "Disarm the Inner Critic: Name your inner critic ('The Warden') and gently say: 'Thank you for trying to protect me from criticism, but I am safe now.'",
      ],
      id: [
        "Telapak Tangan di Dada Somatis: Saat terjadi kesalahan, letakkan telapak tangan kanan di ulu hati dan tarik napas dalam 3 kali untuk menenangkan saraf.",
        "Latihan Ketidaksempurnaan Mikro: Sengaja biarkan salah ketik kecil di draf catatan untuk melatih toleransi otak terhadap ketidaksempurnaan.",
        "Jinakkan Sang Kritikus Batin: Beri nama pada suara penghakimanmu ('Sang Sipir') dan katakan: 'Terima kasih telah berusaha melindungiku, namun aku aman sekarang.'",
      ],
      de: [
        "Hand-aufs-Herz-Übung: Legen Sie bei Fehlern die Hand aufs Brustbein und atmen Sie 3-mal tief aus, um körperliche Wärme zu spüren.",
        "Gezielte Mikro-Imperperfektion: Lassen Sie bewusst eine Kleinigkeit unvollendet, um die Schamtoleranz zu trainieren.",
        "Den inneren Zensor entmachten: Nennen Sie Ihre kritische Stimme beim Namen und sagen Sie: 'Danke fürs Beschützen, aber ich bin erwachsen und sicher.'",
      ],
      fr: [
        "Main sur le cœur: En cas d'erreur, posez votre main sur le sternum et prenez 3 respirations profondes pour infuser de la sécurité corporelle.",
        "Micro-imperfection délibérée: Laissez une coquille sans gravité dans vos notes pour désensibiliser la terreur du faux pas.",
        "Désamorcez le critique intérieur: Donnez-lui un prénom et dites: 'Merci d'avoir voulu me protéger, mais je n'ai plus besoin de cette armure.'",
      ],
      es: [
        "Mano en el pecho somática: Si te equivocas, apoya la palma sobre el esternón y haz 3 respiraciones lentas para anclar la ternura.",
        "Micro-imperfección deliberada: Deja adrede un pequeño detalle sin pulir para desensibilizar el pánico al qué dirán.",
        "Desarma al juez interior: Ponle nombre y dile con calma: 'Gracias por querer protegerme del juicio ajeno, pero ya sé cuidarme solo.'",
      ],
    },
    dailyAffirmation: {
      en: "My worth is not a performance. I am worthy of rest, belonging, and love without earning it.",
      id: "Harga diriku bukanlah hasil perlombaan. Aku berhak istirahat, diterima, dan dicintai tanpa harus membuktikannya terus-menerus.",
      de: "Mein Wert ist keine Leistungsschau. Ich verdiene Ruhe, Zugehörigkeit und Liebe – ganz ohne Beweis.",
      fr: "Ma valeur n'est pas une compétition. J'ai droit au repos, au lien et à l'amour sans avoir à le payer de mes exploits.",
      es: "Mi valía no es una función de teatro. Merezco descanso, pertenencia y amor sin tener que ganármelos a pulso.",
    },
  },

  chronic_toxic_shame: {
    level: "chronic_toxic_shame",
    badge: {
      en: "Chronic Toxic Shame / Core Defectiveness Wound",
      id: "Rasa Malu Beracun Kronis / Luka Cacat Batin",
      de: "Chronische toxische Scham / Seelische Defektwunde",
      fr: "Honte Toxique Chronique / Blessure d'Indignité",
      es: "Vergüenza Tóxica Crónica / Herida de Indignidad Esencial",
    },
    title: {
      en: "The Masked Exile",
      id: "Sang Pengelana Bertopeng",
      de: "Der verbannte Maskenträger",
      fr: "L'Exilé Masqué",
      es: "El Exiliado Enmascarado",
    },
    tagline: {
      en: "Tormented by the chronic conviction of being defective, living under constant internal abuse.",
      id: "Tersiksa oleh keyakinan kronis bahwa dirimu cacat dan rusak, hidup di bawah makian batin tanpa henti.",
      de: "Gequält von der Überzeugung, fehlerhaft zu sein – zermürbt von täglicher innerer Brutalität.",
      fr: "Tourmenté par la certitude d'être vicié, écrasé par une voix intérieure d'une férocité sans répit.",
      es: "Atormentado por la convicción de ser defectuoso, sometido a un maltrato interno despiadado.",
    },
    description: {
      en: "Toxic shame has metastasized into your core operating system. You live with an active, brutal inner persecutor who berates you for breathing, making minor social gaffes, or even having basic needs. Compliments feel like mocking lies. You spend vast energy hiding your perceived hideousness from the world, nursing deep somatic aches in your chest and throat.",
      id: "Rasa malu beracun telah menjalar menjadi sistem operasi inti hidupmu. Kamu hidup bersama penyiksa batin yang memaki dirimu atas kesalahan kecil, atau bahkan karena memiliki kebutuhan dasar. Pujian terasa seperti kebohongan mengejek. Kamu menghabiskan energi besar menyembunyikan dirimu dari dunia, memendam rasa sakit fisik di dada dan tenggorokan.",
      de: "Toxische Scham bestimmt Ihr Lebensgefühl. Ein grausamer innerer Folterer erniedrigt Sie für alltägliche Dinge. Lob fühlt sich wie Hohn an. Sie verbrauchen ungeheure Kraft, um Ihre angebliche Unwürdigkeit vor der Welt zu verbergen.",
      fr: "La honte toxique s'est infiltrée dans votre identité. Un tyran intérieur vous persécute pour la moindre maladresse. Les compliments sonnent faux. Vous vous épuisez à masquer votre indignité imaginaire.",
      es: "La vergüenza tóxica se ha convertido en tu sistema operativo vital. Un juez despiadado te insulta por cualquier insignificancia. Los elogios te parecen burlas. Vives agotado de esconder tus supuestas taras al mundo.",
    },
    psychologyInsight: {
      en: "John Bradshaw described toxic shame as the 'rupture of the self with the self'. When caregivers used shaming, abandonment, or contempt as parenting tools, the child internalizes the contemptuous parent as an omnipresent psychic persecutor.",
      id: "John Bradshaw menggambarkan rasa malu beracun sebagai 'terputusnya hubungan diri dengan dirinya sendiri'. Saat figur pengasuh memakai hinaan, penelantaran, atau cemoohan sebagai alat mendidik, anak menginternalisasi orang tua yang menghina tersebut menjadi penyiksa psikis batin yang abadi.",
      de: "John Bradshaw beschreibt toxische Scham als 'Bruch des Selbst mit sich selbst'. Wenn Bezugspersonen mit Verachtung straften, wird diese Verachtung als innere Zerstörungskraft einverleibt.",
      fr: "John Bradshaw qualifie la honte toxique de 'rupture du soi avec lui-même'. Les humiliations d'enfance sont intériorisées sous la forme d'un geôlier psychique intime.",
      es: "John Bradshaw describió la vergüenza tóxica como la 'fractura del yo consigo mismo'. El desprecio vivido en la infancia se interioriza como un torturador mental perpetuo.",
    },
    actionProtocols: {
      en: [
        "Internal Family Systems (IFS) Work: Connect with the shame-carrying part of yourself as an innocent, wounded child rather than a repulsive monster.",
        "The Shame-Disclosing Confession: Share one 'unforgivable' shameful secret with a trauma-informed therapist or safe friend. Shame dies in the light of non-judgmental witnessing.",
        "Postural Vagus Uncurling: When you catch yourself physically slouching in shame, deliberately open your collarbones, look up at the ceiling, and place your hands palms-up on your thighs.",
      ],
      id: [
        "Terapi Internal Family Systems (IFS): Rangkul bagian diri yang memikul rasa malu sebagai anak kecil yang terluka dan tak bersalah, bukan monster yang menjijikkan.",
        "Pengakuan Rahasia yang Aman: Ceritakan satu rahasia yang paling kamu malukan kepada terapis trauma atau sahabat tepercaya. Rasa malu mati saat disaksikan tanpa penghakiman.",
        "Membuka Postur Saraf Vagus: Saat mendapati tubuhmu membungkuk menunduk malu, sengaja buka tulang selangka, tengadahkan wajah ke atas, dan buka telapak tangan menghadap langit.",
      ],
      de: [
        "IFS-Arbeit (Internal Family Systems): Erkennen Sie die beschämte Seite als verletztes Kind, nicht als Monster.",
        "Das heilsame Aussprechen: Vertrauen Sie ein 'unverzeihliches' Geheimnis einem Therapeuten an. Scham stirbt, wenn sie wertfrei bezeugt wird.",
        "Haltungs-Korrektur: Richten Sie sich bewusst auf, heben Sie den Blick und öffnen Sie den Brustkorb, um die biologische Schamstarre zu durchbrechen.",
      ],
      fr: [
        "Approche IFS (Système Familial Intérieur): Considérez votre part honteuse comme un enfant apeuré et non comme une tare monstrueuse.",
        "La libération par la parole: Confiez un secret inavouable à un thérapeute bienveillant. La honte s'évapore sous un regard dénué de jugement.",
        "Redressement postural vagal: Relevez le menton, ouvrez les épaules et tournez les paumes vers le ciel pour annuler la posture d'affaissement.",
      ],
      es: [
        "Terapia IFS (Sistemas de la Familia Interna): Acoge a tu parte avergonzada como a un niño herido y desamparado, no como a un engendro.",
        "El desahogo curativo: Comparte un secreto 'inconfesable' con un terapeuta o amigo seguro. La vergüenza muere bajo una mirada libre de juicio.",
        "Apertura postural vagal: Abre el pecho, endereza la espalda y alza la vista al techo con las palmas abiertas para neutralizar el colapso.",
      ],
    },
    dailyAffirmation: {
      en: "The contempt in my head does not belong to me; it was planted by wounded people. I am innocent.",
      id: "Kebencian di kepalaku bukanlah milikku; itu ditanamkan oleh orang-orang yang terluka. Jiwaku murni dan tak bersalah.",
      de: "Die Verachtung in meinem Kopf gehört nicht mir; sie stammt von verletzten Menschen. Ich bin unschuldig.",
      fr: "Le mépris qui m'habite ne m'appartient pas; il a été semé par des êtres blessés. Mon âme est innocente.",
      es: "El desprecio que retumba en mi cabeza no es mío; lo sembraron personas heridas. Mi ser es inocente y digno.",
    },
  },

  severe_shame_paralysis: {
    level: "severe_shame_paralysis",
    badge: {
      en: "Severe Shame Collapse / Total Social Concealment",
      id: "Kolaps Malu Parah / Pengasingan Diri Total",
      de: "Schwerer Scham-Kollaps / Totale Selbstverbannung",
      fr: "Effondrement de Honte Sévère / Retrait Social Total",
      es: "Colapso de Vergüenza Severo / Aislamiento Social Absoluto",
    },
    title: {
      en: "The Vanished Soul",
      id: "Sang Jiwa yang Sirna",
      de: "Die unsichtbare Seele",
      fr: "L'Âme Dissoute",
      es: "El Alma Invisible",
    },
    tagline: {
      en: "Completely paralyzed by the agony of perceived defectiveness, living in total emotional hiding.",
      id: "Lumpuh total oleh siksaan rasa cacat batin, hidup dalam persembunyian emosional mutlak.",
      de: "Vollkommen gelähmt von quälender Unwürdigkeit – eingemauert in totalem seelischen Rückzug.",
      fr: "Totalement paralysé par l'angoisse d'être indigne, emmuré dans une disparition affective complète.",
      es: "Paralizado por el tormento de sentirse defectuoso, viviendo en un aislamiento emocional total.",
    },
    description: {
      en: "You are experiencing profound, catastrophic toxic shame collapse. You have retreated into total social hiding, feeling like an unredeemable abomination. Eye contact feels searingly painful, mirrors are intolerable, and the mere thought of existing in public triggers intense somatic panic or vegetative freeze. You live in a private solitary confinement cell created by trauma.",
      id: "Kamu mengalami kolaps rasa malu beracun yang katastrofik. Kamu menarik diri ke dalam persembunyian sosial total, merasa seperti manusia terkutuk yang tak termaafkan. Menatap mata orang terasa membakar, cermin tak tertahankan, dan berada di tempat umum memicu panik fisik atau pembekuan tubuh total. Kamu hidup di dalam sel isolasi trauma batinmu sendiri.",
      de: "Sie durchleben einen schweren Schamkollaps. Sie haben sich vollständig von der Welt abgekapselt. Blickkontakt brennt wie Feuer, Spiegel sind unerträglich, das bloße Dasein in der Öffentlichkeit löst Panik aus. Sie leben in einer seelischen Isolationshaft.",
      fr: "Vous traversez un effondrement de honte dévastateur. Vous vous êtes retiré du monde. Croiser un regard vous brûle, les miroirs sont intolérables, la vie publique vous terrifie. Vous vivez dans un cachot intérieur forgé par le trauma.",
      es: "Sufres un colapso de vergüenza tóxica invalidante. Te has recluido del mundo. El contacto visual te quema, los espejos te repelen y exponerte en público te causa pánico físico. Vives en una celda de aislamiento construida por el trauma.",
    },
    psychologyInsight: {
      en: "This represents the extreme somatic freeze of developmental trauma (often narcissistic abuse, severe bullying, or childhood emotional neglect). The nervous system has determined that annihilation or total disappearance is the only defense against social destruction.",
      id: "Ini mewakili pembekuan somatis ekstrem akibat trauma perkembangan (seringkali kekerasan narsistik, perundungan berat, atau pengabaian emosional masa kecil). Sistem sarafmu menyimpulkan bahwa menghilang tanpa jejak adalah satu-satunya pelindung agar tidak dihancurkan orang lain.",
      de: "Hier liegt ein extremer traumatischer Erstarrungszustand vor (nach narzisstischem Missbrauch, Mobbing oder Vernachlässigung). Das Nervensystem wählt das seelische Verschwinden als letzte Überlebensstrategie.",
      fr: "Ce profil traduit un figement traumatique extrême consécutif à des violences narcissiques ou de l'abandon précoce. Le système nerveux a décrété que l'effacement total était la seule chance de survie.",
      es: "Representa un bloqueo traumático extremo tras abusos narcisistas, acoso severo o negligencia infantil. El sistema nervioso concluyó que desaparecer por completo era la única vía para sobrevivir.",
    },
    actionProtocols: {
      en: [
        "Trauma-Informed Somatic Psychotherapy: Seek a compassionate clinician trained in Somatic Experiencing (SE), NARM (NeuroAffective Relational Model), or Compassionate Inquiry.",
        "The 1-Minute Mirror Softening Drill: Stand 4 feet from a mirror in soft dim lighting. Look gently at your own chest or collarbones without judging, placing a hand on your heart and repeating: 'You are safe here with me.'",
        "Safe Animal / Nature Connection: Connect with a pet or spend quiet time under trees. Animals and nature provide unconditional attachment without the agonizing threat of human evaluation.",
      ],
      id: [
        "Psikoterapi Somatis Berbasis Trauma: Cari terapis berlisensi yang mendalami Somatic Experiencing (SE), NARM, atau Compassionate Inquiry.",
        "Latihan Melembutkan Tatapan Cermin 1 Menit: Berdiri di depan cermin dalam cahaya redup. Tatap dadamu dengan lembut tanpa menghakimi, letakkan tangan di dada dan bisikkan: 'Kamu aman bersamaku.'",
        "Koneksi dengan Hewan atau Alam: Bermainlah dengan hewan peliharaan atau duduk di bawah pepohonan. Alam dan hewan memberi kehangatan tulus tanpa ancaman penilaian manusia.",
      ],
      de: [
        "Traumatherapie (SE / NARM): Suchen Sie Hilfe bei Therapeuten für Somatic Experiencing oder das Neuroaffektive Beziehungsmodell (NARM).",
        "Spiegel-Befriedung: Blicken Sie bei gedimmtem Licht kurz auf Ihren Brustkorb, Hand aufs Herz, und flüstern Sie: 'Du bist hier bei mir in Sicherheit.'",
        "Natur- und Tierkontakt: Suchen Sie Nähe zu Haustieren oder Bäumen – sie schenken vorurteilsfreie Annahme ohne die Bedrohung menschlicher Urteile.",
      ],
      fr: [
        "Thérapie somatique du trauma: Consultez un praticien en Somatic Experiencing (SE) ou modèle NARM.",
        "Exercice du miroir tamisé: Sous une lumière douce, regardez votre poitrine, main sur le cœur, et murmurez: 'Tu es en sécurité avec moi désormais.'",
        "Refuge animalier ou végétal: Ressourcez-vous auprès d'animaux ou en forêt; la nature offre une présence inconditionnelle sans aucun jugement.",
      ],
      es: [
        "Psicoterapia somática del trauma: Acude a un especialista en Somatic Experiencing (SE) o modelo NARM.",
        "Ejercicio del espejo en penumbra: Con luz tenue, mira hacia tu pecho, mano en el corazón, y di en voz baja: 'Estás a salvo conmigo ahora.'",
        "Vínculo con la naturaleza o animales: Abraza a una mascota o descansa bajo los árboles; la naturaleza brinda cobijo incondicional sin juzgarte.",
      ],
    },
    dailyAffirmation: {
      en: "I do not need to hide anymore. My existence is not a crime; I have a rightful place under the sun.",
      id: "Aku tak perlu bersembunyi lagi. Keberadaanku bukanlah sebuah kejahatan; aku berhak atas tempat yang hangat di bawah sinar matahari.",
      de: "Ich muss mich nicht mehr verstecken. Mein Dasein ist kein Verbrechen; ich habe meinen Platz unter der Sonne.",
      fr: "Je n'ai plus besoin de me cacher. Mon existence n'est pas un crime; j'ai ma place légitime sous le soleil.",
      es: "Ya no tengo que esconderme. Mi existencia no es un delito; tengo un lugar digno y hermoso bajo el sol.",
    },
  },
};

export function calculateToxicShameScore(
  answers: Record<number, number>
): ToxicShameScoreResult {
  let defectivenessScore = 0;
  let selfContemptScore = 0;
  let shameCollapseScore = 0;

  TOXIC_SHAME_QUESTIONS.forEach((q) => {
    const score = answers[q.id] ?? 0;
    if (q.subscale === "defectiveness_conviction") defectivenessScore += score;
    if (q.subscale === "persecutory_self_contempt") selfContemptScore += score;
    if (q.subscale === "somatic_shame_collapse") shameCollapseScore += score;
  });

  const totalScore = defectivenessScore + selfContemptScore + shameCollapseScore;
  const maxScore = 36;
  const percentage = Math.min(100, Math.round((totalScore / maxScore) * 100));

  let level: "grounded_self_compassion" | "mild_shame_anxiety" | "chronic_toxic_shame" | "severe_shame_paralysis";

  if (percentage <= 25) {
    level = "grounded_self_compassion";
  } else if (percentage <= 52) {
    level = "mild_shame_anxiety";
  } else if (percentage <= 78) {
    level = "chronic_toxic_shame";
  } else {
    level = "severe_shame_paralysis";
  }

  const profile = TOXIC_SHAME_ARCHETYPES[level];

  return {
    totalScore,
    maxScore,
    percentage,
    level,
    subscales: {
      defectiveness_conviction: {
        score: defectivenessScore,
        max: 12,
        percentage: Math.min(100, Math.round((defectivenessScore / 12) * 100)),
      },
      persecutory_self_contempt: {
        score: selfContemptScore,
        max: 12,
        percentage: Math.min(100, Math.round((selfContemptScore / 12) * 100)),
      },
      somatic_shame_collapse: {
        score: shameCollapseScore,
        max: 12,
        percentage: Math.min(100, Math.round((shameCollapseScore / 12) * 100)),
      },
    },
    profile,
  };
}
