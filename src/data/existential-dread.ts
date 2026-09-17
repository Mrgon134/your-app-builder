export type ExistentialDreadLang = "en" | "id" | "de" | "fr" | "es";

export interface ExistentialDreadQuestion {
  id: number;
  subscale: "meaning_vacuum" | "temporal_anxiety" | "agency_deficit";
  prompt: Record<ExistentialDreadLang, string>;
  options: {
    label: Record<ExistentialDreadLang, string>;
    score: number; // 0 to 3
  }[];
}

export interface ExistentialDreadArchetype {
  level: "grounded_meaning_weaver" | "seeking_horizon_explorer" | "quarter_life_drifter" | "acute_existential_void";
  badge: Record<ExistentialDreadLang, string>;
  title: Record<ExistentialDreadLang, string>;
  tagline: Record<ExistentialDreadLang, string>;
  description: Record<ExistentialDreadLang, string>;
  psychologyInsight: Record<ExistentialDreadLang, string>;
  actionProtocols: Record<ExistentialDreadLang, string[]>;
  dailyAffirmation: Record<ExistentialDreadLang, string>;
}

export interface ExistentialDreadScoreResult {
  totalScore: number;
  percentage: number;
  level: ExistentialDreadArchetype["level"];
  profile: ExistentialDreadArchetype;
  subscales: {
    meaning_vacuum: { score: number; percentage: number };
    temporal_anxiety: { score: number; percentage: number };
    agency_deficit: { score: number; percentage: number };
  };
}

export const EXISTENTIAL_DREAD_QUESTIONS: ExistentialDreadQuestion[] = [
  // Subscale 1: Meaning Vacuum (Frankl Logotherapy & Nihilism)
  {
    id: 1,
    subscale: "meaning_vacuum",
    prompt: {
      en: "I look around at work, meetings, or social gatherings and think: 'What is the point of all this? None of it actually matters.'",
      id: "Aku memandang pekerjaan, rapat, atau kumpul-kumpul sosial dan membatin: 'Untuk apa semua ini? Pada akhirnya tidak ada yang benar-benar bermakna.'",
      de: "Ich blicke mich bei der Arbeit oder bei Treffen um und denke: 'Wozu das Ganze? Nichts davon hat echte Bedeutung.'",
      fr: "Je regarde mon travail, mes réunions ou mes sorties et je me dis : 'À quoi bon tout ça ? Rien n'a de véritable sens.'",
      es: "Miro a mi alrededor en el trabajo o reuniones y pienso: '¿Qué sentido tiene todo esto? Nada de esto importa realmente.'",
    },
    options: [
      {
        score: 0,
        label: {
          en: "Rarely or never — my everyday activities feel purposeful and connected",
          id: "Jarang atau tidak pernah — aktivitasku terasa bermakna dan terhubung dengan tujuan hidupku",
          de: "Selten oder nie — mein Alltag fühlt sich sinnvoll und verbunden an",
          fr: "Rarement ou jamais — mon quotidien est porteur de sens et de liens",
          es: "Casi nunca — mi vida diaria me parece significativa y con propósito",
        },
      },
      {
        score: 1,
        label: {
          en: "Occasionally on exhausting Sunday evenings or rainy days",
          id: "Sesekali hanya saat hari Minggu malam yang melelahkan atau saat capek",
          de: "Gelegentlich an erschöpften Sonntagabenden",
          fr: "Parfois le dimanche soir lors de coups de fatigue passagers",
          es: "Ocasionalmente los domingos por la tarde cuando estoy agotado",
        },
      },
      {
        score: 2,
        label: {
          en: "Frequently — a nagging sense that I am playing a pointless role in a hollow play",
          id: "Sering — ada perasaan hampa bahwa aku hanya memainkan peran tanpa arti di panggung sandiwara",
          de: "Häufig — ein nagendes Gefühl, eine sinnlose Rolle im Theater des Alltags zu spielen",
          fr: "Souvent — le sentiment tenace de jouer un rôle vide dans une comédie sans enjeu",
          es: "A menudo — una sensación persistente de estar interpretando un papel absurdo y vacío",
        },
      },
      {
        score: 3,
        label: {
          en: "Pervasive — heavy existential numbness where accomplishments bring zero joy",
          id: "Terus-menerus — mati rasa eksistensial yang berat di mana pencapaian apapun terasa hampa",
          de: "Dauerhaft — schwere existentielle Taubheit; selbst Erfolge bedeuten mir nichts",
          fr: "Omniprésent — un engourdissement existentiel total; aucune réussite ne me réjouit",
          es: "Permanente — entumecimiento existencial profundo; ningún logro me genera alegría",
        },
      },
    ],
  },
  {
    id: 2,
    subscale: "meaning_vacuum",
    prompt: {
      en: "The standard societal milestones (degrees, promotions, mortgages, consumer trophies) feel completely empty to me.",
      id: "Target standar masyarakat (gelar, kenaikan jabatan, KPR rumah, barang mewah) terasa sama sekali kosong bagiku.",
      de: "Die gesellschaftlichen Standard-Ziele (Karriere, Eigenheim, Statussymbole) fühlen sich für mich völlig hohl an.",
      fr: "Les étapes classiques imposées par la société (diplômes, promotions, crédit immobilier, achats) me paraissent totalement vides.",
      es: "Los hitos tradicionales de la sociedad (títulos, ascensos, hipotecas, símbolos de estatus) me parecen completamente vacíos.",
    },
    options: [
      {
        score: 0,
        label: {
          en: "Disagree — I value my milestones and find genuine joy in achieving them",
          id: "Tidak setuju — aku menghargai pencapaian dan merasakan kepuasan nyata",
          de: "Stimme nicht zu — ich finde echte Freude in meinen Etappenzielen",
          fr: "Pas d'accord — j'apprécie mes étapes et en tire une vraie joie",
          es: "En desacuerdo — valoro mis logros y disfruto genuinamente alcanzarlos",
        },
      },
      {
        score: 1,
        label: {
          en: "Slightly — I pursue them, but balance them with personal passions",
          id: "Sedikit — aku mengejarnya tapi mengimbanginya dengan minat pribadiku",
          de: "Etwas — ich verfolge sie, balanciere sie aber mit eigenen Hobbys aus",
          fr: "Un peu — je m'y conforme tout en cultivant mes propres passions",
          es: "Un poco — los busco, pero equilibrándolos con mis pasiones personales",
        },
      },
      {
        score: 2,
        label: {
          en: "Often — I feel like I checked every box I was told to check and was left feeling hollow",
          id: "Sering — merasa sudah mencentang semua checklist hidup tapi hatiku tetap kosong melompong",
          de: "Oft — ich habe alle Häkchen gesetzt und fühle mich trotzdem innerlich leer",
          fr: "Souvent — j'ai coché toutes les cases qu'on m'a dictées pour ne trouver que du vide",
          es: "A menudo — he cumplido todo lo que se esperaba de mí y me siento completamente vacío",
        },
      },
      {
        score: 3,
        label: {
          en: "Complete disillusionment — profound existential alienation from the modern corporate script",
          id: "Kekecewaan total — keterasingan eksistensial mendalam dari skenario hidup modern",
          de: "Völlige Entfremdung — tiefe existentielle Krise gegenüber dem gesellschaftlichen Drehbuch",
          fr: "Désillusion absolue — aliénation totale face au scénario de la vie moderne",
          es: "Desilusión total — profunda alienación existencial frente al guión establecido por la sociedad",
        },
      },
    ],
  },
  {
    id: 3,
    subscale: "meaning_vacuum",
    prompt: {
      en: "I struggle to answer the question: 'What am I actually living for beyond paying bills and surviving?'",
      id: "Aku kesulitan menjawab pertanyaan: 'Sebenarnya untuk apa aku hidup selain sekadar bayar tagihan dan bertahan?'",
      de: "Es fällt mir schwer zu beantworten, wofür ich lebe – außer um Rechnungen zu bezahlen und zu überleben.",
      fr: "J'ai du mal à répondre à la question : 'Pour quoi est-ce que je vis vraiment, au-delà de payer mes factures ?'",
      es: "Me cuesta responder a la pregunta: '¿Para qué vivo realmente, más allá de pagar cuentas y sobrevivir?'",
    },
    options: [
      {
        score: 0,
        label: {
          en: "Clear — I have a strong core mission, love, or cause that anchors my days",
          id: "Jelas sekali — aku punya misi hidup, cinta, dan nilai yang mengakar kuat dalam hari-hariku",
          de: "Sehr klar — ich habe eine Mission, Liebe oder Überzeugung, die mich trägt",
          fr: "Très clair — j'ai une vocation, des liens ou des idéaux qui éclairent mes journées",
          es: "Muy claro — tengo una vocación, amores o ideales sólidos que me guían cada día",
        },
      },
      {
        score: 1,
        label: {
          en: "Developing — still clarifying my deeper purpose, but feeling hopeful",
          id: "Sedang berproses — masih merumuskan tujuan mendalam tapi tetap optimis",
          de: "Im Werden — ich suche noch nach tieferem Sinn, aber mit Zuversicht",
          fr: "En chemin — je cherche encore ma voie mais avec confiance",
          es: "En proceso — aún defino mi propósito profundo pero con optimismo",
        },
      },
      {
        score: 2,
        label: {
          en: "Clouded — months blur together without any distinct sense of purpose",
          id: "Kabur — bulan-bulan berlalu tanpa ada arah atau tujuan yang bermakna",
          de: "Getrübt — die Monate verschwimmen ohne echtes Richtungsgefühl",
          fr: "Brouillé — les mois défilent sans fil conducteur ni flamme intérieure",
          es: "Borrosos — los meses se me pasan volando sin un rumbo claro ni pasión",
        },
      },
      {
        score: 3,
        label: {
          en: "Complete void — waking up feels pointless; a profound vacuum of intentionality",
          id: "Hampa total — bangun tidur terasa sia-sia; ketiadaan makna hidup yang meremukkan",
          de: "Völliges Vakuum — Aufwachen fühlt sich sinnlos an; quälende Leere",
          fr: "Néant complet — se réveiller semble absurde; un gouffre d'insignifiance",
          es: "Vacío total — levantarme me parece inútil; una profunda falta de sentido vital",
        },
      },
    ],
  },
  {
    id: 4,
    subscale: "meaning_vacuum",
    prompt: {
      en: "I find myself using screens, food, or shopping to drown out a quiet, terrifying emptiness inside.",
      id: "Aku menggunakan scroll HP, makan berlebih, atau belanja untuk menenggelamkan rasa hampa yang menakutkan di dada.",
      de: "Ich nutze Bildschirme, Essen oder Konsum, um eine unheimliche innere Leere zu betäuben.",
      fr: "J'utilise les écrans, la nourriture ou les achats pour anesthésier un vide intérieur angoissant.",
      es: "Utilizo el móvil, la comida o las compras compulsivas para acallar un vacío interior que me aterra.",
    },
    options: [
      {
        score: 0,
        label: {
          en: "Never — I can sit in silence and solitude with total inner peace",
          id: "Tidak pernah — aku nyaman duduk dalam hening dan kesendirian dengan damai",
          de: "Nie — ich kann in Stille und Einsamkeit vollkommenen Frieden finden",
          fr: "Jamais — je peux rester en silence seul avec moi-même en toute paix",
          es: "Nunca — disfruto del silencio y la soledad con total paz interior",
        },
      },
      {
        score: 1,
        label: {
          en: "Rarely — occasionally when bored or overtired on weekends",
          id: "Jarang — sesekali hanya saat bosan atau terlalu lelah di akhir pekan",
          de: "Selten — nur bei Langeweile oder starker Erschöpfung",
          fr: "Rarement — occasionnellement en cas de grande lassitude",
          es: "Rara vez — solo por aburrimiento o cansancio puntual los fines de semana",
        },
      },
      {
        score: 2,
        label: {
          en: "Frequently — if the house is silent, anxiety wells up unless a podcast or video is playing",
          id: "Sering — jika rumah hening, rasa cemas menyergap kecuali ada podcast atau video menyala",
          de: "Häufig — bei Stille steigt Panik auf, wenn nicht ein Video oder Podcast läuft",
          fr: "Souvent — dans le silence, l'angoisse monte si je n'ai pas un bruit de fond",
          es: "A menudo — si hay silencio absoluto, la ansiedad se dispara a menos que ponga un podcast",
        },
      },
      {
        score: 3,
        label: {
          en: "Non-stop numbing — running from my own thoughts 24/7 because stillness feels like abyss",
          id: "Pelarian tanpa henti — lari dari pikiran sendiri 24/7 karena keheningan terasa seperti jurang maut",
          de: "Dauersucht — ununterbrochene Betäubung, weil Stille sich wie ein Abgrund anfühlt",
          fr: "Fuite permanente — anesthésie continue car le calme ressemble à un abîme vertigineux",
          es: "Evasión constante — huyo de mis pensamientos las 24 horas porque el silencio parece un abismo",
        },
      },
    ],
  },

  // Subscale 2: Temporal Anxiety (Irvin Yalom Mortality & Quarter-Life Clock)
  {
    id: 5,
    subscale: "temporal_anxiety",
    prompt: {
      en: "I am haunted by the sensation that time is moving terrifyingly fast and that my youth or best years are slipping away unused.",
      id: "Aku dihantui perasaan bahwa waktu berputar sangat cepat dan masa muda atau tahun-tahun terbaikku terbuang sia-sia.",
      de: "Mich quält das Gefühl, dass die Zeit rasend schnell vergeht und meine besten Jahre ungenutzt verstreichen.",
      fr: "Je suis hanté par la sensation que le temps file à toute vitesse et que ma jeunesse s'évapore sans que j'en profite.",
      es: "Me angustia la sensación de que el tiempo vuela y de que mis mejores años se están desperdiciando.",
    },
    options: [
      {
        score: 0,
        label: {
          en: "At peace — every phase of life has its own unique richness; I savor today",
          id: "Damai — setiap fase usia punya keindahannya masing-masing; aku menikmati hari ini",
          de: "Gelassen — jede Lebensphase hat ihren eigenen Reichtum; ich lebe im Jetzt",
          fr: "Serein — chaque âge a sa beauté singulière; je savoure le présent",
          es: "En paz — cada etapa de la vida tiene su valor; disfruto el presente",
        },
      },
      {
        score: 1,
        label: {
          en: "Occasional wistfulness around birthdays or New Year celebrations",
          id: "Sesekali hanya saat momen ulang tahun atau pergantian tahun baru",
          de: "Gelegentliche Wehmut an Geburtstagen oder zum Jahreswechsel",
          fr: "Une mélancolie passagère lors des anniversaires ou du nouvel an",
          es: "Una leve nostalgia en cumpleaños o cambios de año",
        },
      },
      {
        score: 2,
        label: {
          en: "Frequent dread — intense panic that I haven't achieved enough for my current age",
          id: "Kecemasan sering — panik hebat bahwa pencapaianku belum cukup untuk usiaku sekarang",
          de: "Häufige Beklemmung — Panik, für mein Alter nicht genug erreicht zu haben",
          fr: "Angoisse régulière — peur panique de ne pas avoir accompli assez pour mon âge",
          es: "Ansiedad frecuente — pánico a no haber conseguido lo suficiente para mi edad",
        },
      },
      {
        score: 3,
        label: {
          en: "Chronic mortality panic — acute panic attacks contemplating aging, irreversible time, and death",
          id: "Panik mortalitas kronis — serangan panik akut memikirkan penuaan, waktu yang tak bisa diputar, dan kematian",
          de: "Chronische Todesangst — Panikattacken beim Gedanken an Vergänglichkeit und das Altern",
          fr: "Angoisse de mort permanente — crises de panique face au vieillissement et à l'irréversibilité du temps",
          es: "Pánico existencial severo — crisis de angustia pensando en el envejecimiento y la muerte",
        },
      },
    ],
  },
  {
    id: 6,
    subscale: "temporal_anxiety",
    prompt: {
      en: "I frequently think about the inevitability of death and mortality in a way that paralyzes my present choices.",
      id: "Aku sering memikirkan keniscayaan kematian dan fana-nya hidup hingga melumpuhkan keputusanku hari ini.",
      de: "Der Gedanke an die Unausweichlichkeit des Todes lähmt oft meine Entscheidungen in der Gegenwart.",
      fr: "L'inévitabilité de la mort m'obsède au point de paralyser mes choix dans le présent.",
      es: "La inevitabilidad de la muerte me ronda con tanta fuerza que paraliza mis decisiones presentes.",
    },
    options: [
      {
        score: 0,
        label: {
          en: "Integrated — mortality reminds me to live authentically and cherish loved ones",
          id: "Selaras — kematian mengingatkanku untuk hidup jujur dan menyayangi orang terdekat",
          de: "Integriert — Vergänglichkeit erinnert mich daran, aufrichtig und dankbar zu leben",
          fr: "Intégré — la finitude me rappelle de vivre avec authenticité et amour",
          es: "Integrado — la finitud me impulsa a vivir con autenticidad y valorar a los míos",
        },
      },
      {
        score: 1,
        label: {
          en: "Intellectual awareness with little emotional interference",
          id: "Kesadaran filosofis biasa tanpa mengganggu aktivitas fungsional",
          de: "Philosophisches Bewusstsein ohne emotionale Blockade",
          fr: "Conscience intellectuelle sans perturbation émotionnelle majeure",
          es: "Conciencia filosófica sin alteración emocional significativa",
        },
      },
      {
        score: 2,
        label: {
          en: "Frequent chills — sudden moments of derealization realizing everyone I love will be gone",
          id: "Merinding sering — momen derealisasi mendadak bahwa semua orang yang kucintai akan tiada",
          de: "Häufige Schauer — plötzliche Derealisation bei dem Gedanken, dass alle vergehen",
          fr: "Frissons fréquents — vertige brutal en réalisant que tous mes proches disparaîtront",
          es: "Escalofríos frecuentes — momentos de desrealización al pensar que todos desaparecerán",
        },
      },
      {
        score: 3,
        label: {
          en: "Terrorizing obsession — thanatophobia; unable to enjoy life because everything ends in dust",
          id: "Obsesi menakutkan — thanatophobia; tidak bisa menikmati hidup karena meyakini semuanya akan jadi debu",
          de: "Lähmende Thanatophobie — keine Lebensfreude möglich, weil alles vergeht",
          fr: "Thanatophobie paralysante — incapable de goûter à la vie car tout retourne à la poussière",
          es: "Tanatofobia asfixiante — incapaz de disfrutar de nada porque todo terminará en la nada",
        },
      },
    ],
  },
  {
    id: 7,
    subscale: "temporal_anxiety",
    prompt: {
      en: "I feel like I'm watching my life from the outside as a passive spectator rather than the main character living it.",
      id: "Aku merasa seperti menonton hidupku sendiri dari luar sebagai penonton pasif, bukan tokoh utama yang menjalaninya.",
      de: "Ich habe oft das Gefühl, mein Leben nur von außen wie ein Zuschauer zu beobachten.",
      fr: "J'ai l'impression de regarder ma vie de l'extérieur en spectateur passif plutôt que d'en être l'acteur.",
      es: "Siento que observo mi vida desde fuera como un mero espectador en lugar de ser el protagonista que la vive.",
    },
    options: [
      {
        score: 0,
        label: {
          en: "Fully embodied — I am actively in the driver's seat of my choices and feelings",
          id: "Menghayati seutuhnya — aku memegang kendali penuh atas keputusan dan perasaanku",
          de: "Ganz verkörpert — ich sitze aktiv am Steuer meiner Entscheidungen",
          fr: "Pleinement incarné — je suis fermement aux commandes de mes choix",
          es: "Plenamente presente — llevo las riendas de mis decisiones y vivencias",
        },
      },
      {
        score: 1,
        label: {
          en: "Brief episodes during periods of intense work burnout",
          id: "Hanya sesaat muncul saat masa-masa burnout kerja parah",
          de: "Kurze Momente in Phasen hoher Überarbeitung",
          fr: "Brefs épisodes lors de périodes d'épuisement professionnel",
          es: "Episodios breves en momentos de agotamiento laboral extremo",
        },
      },
      {
        score: 2,
        label: {
          en: "Often — feeling like an NPC (non-playable character) going through automated motions",
          id: "Sering — merasa seperti robot atau NPC yang bergerak secara otomatis tanpa jiwa",
          de: "Oft — ich fühle mich wie ein programmierter Statist im eigenen Alltag",
          fr: "Souvent — impression de fonctionner en pilotage automatique sans âme",
          es: "A menudo — sensación de actuar en piloto automático como un personaje secundario",
        },
      },
      {
        score: 3,
        label: {
          en: "Chronic depersonalization — persistent disconnection from my own flesh, voice, and destiny",
          id: "Depersonalisasi kronis — terputus dari tubuh, suara, dan takdir hidupku sendiri",
          de: "Chronische Depersonalisation — anhaltende Entfremdung von Körper und Schicksal",
          fr: "Dépersonnalisation continue — rupture profonde avec mon corps, ma voix et mon destin",
          es: "Despersonalización severa — desconexión crónica con mi cuerpo, mi voz y mi futuro",
        },
      },
    ],
  },
  {
    id: 8,
    subscale: "temporal_anxiety",
    prompt: {
      en: "I obsess over roads not taken, wondering if I permanently ruined my life by choosing the wrong career, degree, or city.",
      id: "Aku terobsesi dengan pilihan yang tidak kuambil di masa lalu, cemas aku telah merusak hidupku karena salah pilih jurusan, karier, atau kota.",
      de: "Ich grüble obsessiv über verpasste Wege nach und fürchte, mein Leben durch falsche Weichenstellungen ruiniert zu haben.",
      fr: "Je rumine sans cesse sur les chemins non empruntés, terrifié d'avoir gâché ma vie par de mauvais choix passés.",
      es: "Me obsesiono con los caminos que no tomé, temiendo haber arruinado mi vida por malas decisiones de carrera o ciudad.",
    },
    options: [
      {
        score: 0,
        label: {
          en: "No regret — all past turns taught me valuable resilience; I look forward",
          id: "Tanpa penyesalan — semua belokan masa lalu memberiku pelajaran berharga; aku menatap ke depan",
          de: "Kein Bedauern — alle Umwege waren lehrreich; ich blicke nach vorn",
          fr: "Aucun regret — chaque détour m'a forgé; je regarde vers l'avant",
          es: "Sin remordimientos — cada desvío me enseñó algo valioso; miro hacia el futuro",
        },
      },
      {
        score: 1,
        label: {
          en: "Mild curiosity about alternative timelines, easily dismissed",
          id: "Rasa penasaran sesaat yang mudah ditepis",
          de: "Leichte Neugier auf alternative Lebenswege, rasch abgehakt",
          fr: "Simple curiosité amusée pour des vies parallèles, vite oubliée",
          es: "Curiosidad puntual sobre otras opciones que descarto con facilidad",
        },
      },
      {
        score: 2,
        label: {
          en: "Heavy rumination — replay of critical crossroads from 3-5 years ago with grief",
          id: "Overthinking berat — memutar ulang persimpangan hidup 3-5 tahun lalu dengan sesal",
          de: "Starkes Grübeln — trauriges Wiederholen alter Entscheidungen von vor Jahren",
          fr: "Ruminations pesantes — ressassement mélancolique des choix d'il y a 3 ou 5 ans",
          es: "Rumiación constante — revivo con dolor decisiones clave tomadas hace años",
        },
      },
      {
        score: 3,
        label: {
          en: "Paralyzing mourning for unlived lives — convinced my true, happy timeline is lost forever",
          id: "Duka mendalam atas hidup yang tak dijalani — yakin garis waktu bahagiaku sudah hilang selamanya",
          de: "Lähmende Trauer um ungelebte Leben — überzeugt, dass mein wahres Glück verpasst ist",
          fr: "Deuil déchirant des vies non vécues — convaincu que mon bonheur véritable est perdu à jamais",
          es: "Duelo desgarrador por vidas no vividas — convencido de que mi felicidad auténtica se perdió para siempre",
        },
      },
    ],
  },

  // Subscale 3: Autonomous Agency Deficit (Kierkegaard Dread & Living by Default)
  {
    id: 9,
    subscale: "agency_deficit",
    prompt: {
      en: "I feel like I am living on a conveyor belt designed by my parents, culture, or employer rather than a life I deliberately created.",
      id: "Aku merasa hidup di atas ban berjalan yang dirancang orang tua, budaya, atau kantor, bukan hidup yang kupilih sendiri secara sadar.",
      de: "Ich fühle mich wie auf einem Fließband, das Eltern, Gesellschaft oder Arbeitgeber vorgegeben haben.",
      fr: "J'ai l'impression d'être sur un tapis roulant tracé par mes parents, la société ou mon employeur plutôt que de créer ma vie.",
      es: "Siento que voy por una cinta transportadora diseñada por mis padres, la cultura o mi empresa, y no por un camino elegido por mí.",
    },
    options: [
      {
        score: 0,
        label: {
          en: "Fully autonomous — I authored my lifestyle, values, and career path with sovereignty",
          id: "Sangat berdaulat — aku merancang gaya hidup, nilai, dan karierku secara mandiri",
          de: "Völlig autonom — ich habe meinen Lebensstil und meine Werte selbst bestimmt",
          fr: "Totalement souverain — j'ai forgé mon mode de vie et mes valeurs en toute indépendance",
          es: "Completamente autónomo — he diseñado mi estilo de vida y valores con total libertad",
        },
      },
      {
        score: 1,
        label: {
          en: "Mostly autonomous with practical financial compromises",
          id: "Sebagian besar mandiri dengan kompromi finansial yang realistis",
          de: "Weitgehend autonom mit pragmatischen finanziellen Kompromissen",
          fr: "Largement autonome malgré quelques concessions matérielles évidentes",
          es: "Mayormente autónomo con ciertas concesiones económicas lógicas",
        },
      },
      {
        score: 2,
        label: {
          en: "Trapped — I want to pivot radically, but golden handcuffs or family expectations suffocate me",
          id: "Terjebak — ingin banting setir tapi terikat gaji lumayan atau ekspektasi keluarga yang mencekik",
          de: "Gefangen — ich will ausbrechen, aber goldene Handschellen halten mich fest",
          fr: "Coincé — je rêve d'une bifurcation radicale mais les attentes familiales me paralysent",
          es: "Atrapado — desearía dar un giro radical pero la presión familiar o la rutina me ahogan",
        },
      },
      {
        score: 3,
        label: {
          en: "Total surrender of agency — living an entirely borrowed life with zero creative ownership",
          id: "Kehilangan kendali total — menjalani hidup pinjaman tanpa ada rasa memiliki atas takdirku",
          de: "Völlige Ohnmacht — ein komplett fremdbestimmtes Leben ohne eigene Autorschaft",
          fr: "Capitulation totale — vivre une existence d'emprunt sans aucune prise sur mon destin",
          es: "Rendición absoluta — vivir una vida prestada sin ningún control sobre mi destino",
        },
      },
    ],
  },
  {
    id: 10,
    subscale: "agency_deficit",
    prompt: {
      en: "Making major life choices (quitting a job, ending a relationship, moving cities) fills me with a dizzying vertigo of freedom.",
      id: "Membuat keputusan besar (resign, mengakhiri hubungan, pindah kota) memicu rasa pusing hebat karena takut salah memilih (vertigo kebebasan).",
      de: "Große Lebensentscheidungen (Jobwechsel, Trennung, Umzug) lösen bei mir einen schwindelerregenden Freiheits-Schock aus.",
      fr: "Prendre de grandes décisions (quitter un job, rompre, déménager) me provoque un vertige paralysant face à l'infinité des possibles.",
      es: "Tomar decisiones vitales importantes (dejar un empleo, terminar una relación, mudarme) me produce un vértigo paralizante ante la libertad.",
    },
    options: [
      {
        score: 0,
        label: {
          en: "Energizing — freedom is an invigorating privilege that excites me",
          id: "Bertenaga — kebebasan adalah hak istimewa yang membuatku bersemangat melangkah",
          de: "Belebend — Freiheit ist ein Privileg, das mich inspiriert und antreibt",
          fr: "Stimulant — la liberté est une chance exaltante qui m'inspire",
          es: "Estimulante — la libertad es un privilegio emocionante que me motiva a actuar",
        },
      },
      {
        score: 1,
        label: {
          en: "Nerve-wracking at first, but I decide firmly once research is done",
          id: "Sempat gugup di awal, tapi aku bisa memutuskan dengan tegas setelah menimbangnya",
          de: "Anfangs aufregend, aber nach Prüfung treffe ich klare Entschlüsse",
          fr: "Intimidant au début, mais je tranche avec détermination après réflexion",
          es: "Inquietante al principio, pero decido con firmeza tras valorarlo",
        },
      },
      {
        score: 2,
        label: {
          en: "Chronic hesitation — paralyzed by the fear that any choice eliminates all other possibilities",
          id: "Ragu-ragu kronis — lumpuh karena takut memilih satu pintu akan menutup ribuan pintu lain",
          de: "Chronisches Zögern — gelähmt von der Angst, dass jede Wahl andere Türen schließt",
          fr: "Hésitation chronique — paralysé à l'idée que choisir signifie renoncer au reste",
          es: "Indecisión crónica — paralizado por el miedo a que elegir una opción cierre todas las demás",
        },
      },
      {
        score: 3,
        label: {
          en: "Kierkegaardian Dread — staying stuck in miserable situations because deciding feels like stepping off a cliff",
          id: "Ketakutan Kierkegaardian — bertahan di situasi sengsara karena memilih rasanya seperti melompat ke jurang",
          de: "Existentieller Schwindel — Ausharren im Elend, weil Wählen sich wie ein Sturz ins Nichts anfühlt",
          fr: "Vertige kierkegaardien — rester enlisé dans le malheur car choisir équivaut à sauter dans le vide",
          es: "Vértigo existencial agudo — quedarse atrapado en el malestar porque decidir se siente como saltar al vacío",
        },
      },
    ],
  },
  {
    id: 11,
    subscale: "agency_deficit",
    prompt: {
      en: "I feel an internal tension between who I authentically am and the performative mask I wear for colleagues, family, and social media.",
      id: "Ada ketegangan batin antara siapa diriku sebenarnya dan topeng sandiwara yang kupakai di depan rekan kerja, keluarga, dan medsos.",
      de: "Ich spüre eine schmerzhafte Kluft zwischen meinem echten Ich und der Maske, die ich für andere aufsetze.",
      fr: "J'éprouve un tiraillement douloureux entre qui je suis réellement et le masque que j'affiche devant les autres.",
      es: "Siento una tensión dolorosa entre quien soy en realidad y la máscara que muestro ante los demás.",
    },
    options: [
      {
        score: 0,
        label: {
          en: "Congruent — I show up with genuine authenticity across all areas of my life",
          id: "Selaras — aku hadir dengan autentisitas jujur di semua lini kehidupanku",
          de: "Kongruent — ich lebe authentisch und wahrhaftig in allen Lebensbereichen",
          fr: "Harmonieux — je reste fidèle à moi-même dans tous les domaines de mon existence",
          es: "Auténtico — me muestro tal como soy en todos los aspectos de mi vida",
        },
      },
      {
        score: 1,
        label: {
          en: "Normal professional diplomacy, but my soul remains intact",
          id: "Sikap diplomatis kerja yang wajar, namun jiwaku tetap utuh dan jujur",
          de: "Normale berufliche Diplomatie, aber mein innerer Kern bleibt unverfälscht",
          fr: "Simple politesse sociale courante sans trahir mon identité profonde",
          es: "Diplomacia profesional normal sin traicionar mi esencia íntima",
        },
      },
      {
        score: 2,
        label: {
          en: "Exhausting dissonance — I feel like a chameleon who has forgotten their original color",
          id: "Disonansi melelahkan — merasa seperti bunglon yang lupa apa warna aslinya",
          de: "Zermürbende Dissonanz — ich fühle mich wie ein Chamäleon ohne eigene Farbe",
          fr: "Dissonance épuisante — l'impression d'être un caméléon qui a oublié sa vraie couleur",
          es: "Disonancia agotadora — me siento como un camaleón que olvidó su color original",
        },
      },
      {
        score: 3,
        label: {
          en: "Soul-crushing fracture — living in permanent imposture; terrified of being revealed as a hollow ghost",
          id: "Keretakan batin parah — merasa hidup dalam kepalsuan permanen; takut ketahuan hanya sosok hampa",
          de: "Seelische Zerrüttung — permanentes Versteckspiel; Angst, als hohles Scheinbild enttarnt zu werden",
          fr: "Fracture intérieure totale — vie de faussaire permanente; peur d'être démasqué comme une coquille vide",
          es: "Fractura anímica profunda — vivir en una impostura perpetua con miedo a ser descubierto como un cascarón vacío",
        },
      },
    ],
  },
  {
    id: 12,
    subscale: "agency_deficit",
    prompt: {
      en: "Deep down, I harbor a secret fantasy of throwing away my phone, changing my name, and starting over in an unknown town.",
      id: "Jauh di lubuk hati, aku punya fantasi rahasia untuk membuang ponsel, mengganti nama, dan memulai hidup baru dari nol di tempat asing.",
      de: "Tief im Inneren träume ich heimlich davon, alles hinzuschmeißen, das Handy wegzuwerfen und ganz neu anzufangen.",
      fr: "Au fond de moi, je caresse le fantasme secret de jeter mon téléphone, changer d'identité et recommencer à zéro ailleurs.",
      es: "En el fondo, guardo la fantasía secreta de tirar el móvil, cambiar de nombre y empezar de cero en un lugar desconocido.",
    },
    options: [
      {
        score: 0,
        label: {
          en: "Never — I love the life and community I am intentionally building",
          id: "Tidak pernah — aku mencintai kehidupan dan komunitas yang sedang kubangun dengan sadar",
          de: "Nie — ich liebe das Leben und das Umfeld, das ich mir aufgebaut habe",
          fr: "Jamais — j'aime la vie et les liens que je construis consciemment",
          es: "Nunca — amo la vida y los vínculos que he construido a conciencia",
        },
      },
      {
        score: 1,
        label: {
          en: "Daydreaming after a stressful week, but grounded in my current path",
          id: "Melamun sejenak setelah minggu yang penat, tapi tetap berpijak pada jalanku sekarang",
          de: "Kurze Träumerei nach harten Wochen, aber fest verwurzelt im Alltag",
          fr: "Simple rêverie passagère après une semaine rude, sans intention réelle",
          es: "Una fantasía fugaz tras semanas duras, pero firme en mi camino",
        },
      },
      {
        score: 2,
        label: {
          en: "Frequently — looking at flights or remote cabins as an escape valve from my current reality",
          id: "Sering — melihat tiket pesawat atau kabin terpencil sebagai katup penyelamat dari realitasku",
          de: "Häufig — ich suche nach Hütten oder Flügen als Fluchtventil vor meiner Realität",
          fr: "Souvent — je consulte des billets d'avion ou des refuges isolés comme échappatoire mentale",
          es: "A menudo — miro billetes de avión o cabañas remotas como válvula de escape a mi realidad",
        },
      },
      {
        score: 3,
        label: {
          en: "Urgent escapism — visceral agony of feeling trapped in an identity that does not belong to me",
          id: "Desakan kabur akut — rasa tersiksa karena merasa terjebak dalam identitas yang bukan milik jiwaku",
          de: "Dringende Fluchtnot — quälendes Gefühl, in einer falschen Identität gefangen zu sein",
          fr: "Urgence absolue de fuir — supplice d'être enfermé dans une identité qui n'est pas la mienne",
          es: "Deseo desesperado de huida — angustia física por sentirme atrapado en una vida que no me pertenece",
        },
      },
    ],
  },
];

export const EXISTENTIAL_DREAD_ARCHETYPES: Record<
  ExistentialDreadArchetype["level"],
  ExistentialDreadArchetype
> = {
  grounded_meaning_weaver: {
    level: "grounded_meaning_weaver",
    badge: {
      en: "Grounded Meaning Weaver",
      id: "Penenun Makna Berakar",
      de: "Geerdeter Sinnschöpfer",
      fr: "Tisseur de Sens Ancré",
      es: "Tejedor de Significado Arraigado",
    },
    title: {
      en: "Existential Maturity & Authentic Purpose",
      id: "Kematangan Eksistensial & Tujuan Hidup Otentik",
      de: "Existentielle Reife & Authentischer Sinn",
      fr: "Maturité Existentielle & Sens Authentique",
      es: "Madurez Existencial y Propósito Auténtico",
    },
    tagline: {
      en: "You look into the vastness of an indifferent universe and choose to create meaning with love, creativity, and presence.",
      id: "Kamu memandang alam semesta yang luas dan memilih menciptakan makna hidup dengan cinta, karya, dan kehadiran nyata.",
      de: "Du blickst in die Weite des Universums und entscheidest dich bewusst, deinen eigenen Sinn zu erschaffen.",
      fr: "Vous contemplez l'immensité de l'univers et choisissez d'y insuffler du sens par l'amour, l'action et la présence.",
      es: "Miras la inmensidad del universo y eliges con serenidad crear significado a través del amor, el arte y la presencia.",
    },
    description: {
      en: "You have crossed the threshold of existential anxiety into mature authorship. You understand Viktor Frankl's core truth: life does not owe you meaning; rather, life asks of you what meaning you will bring to it. You accept mortality not as a source of terror, but as the precious frame that makes every passing day sacred.",
      id: "Kamu telah melampaui kecemasan eksistensial menuju kedewasaan berdaulat. Kamu memahami kebenaran utama Viktor Frankl: hidup tidak berutang makna padamu; kitalah yang ditanya oleh hidup apa makna yang akan kita berikan. Kamu menerima kefanaan bukan sebagai teror, melainkan bingkai berharga yang membuat setiap detik terasa suci.",
      de: "Du hast die existentielle Krise in schöpferische Autorschaft verwandelt. Nach Viktor Frankl weißt du: Das Leben schuldet dir keinen Sinn – du bist es, der dem Leben Sinn verleiht. Die Vergänglichkeit empfindest du nicht als Fluch, sondern als Rahmen, der den Moment kostbar macht.",
      fr: "Vous avez transformé l'angoisse existentielle en création consciente. Selon Viktor Frankl, la vie ne vous doit aucun sens : c'est à vous de répondre à son appel. La finitude n'est plus une terreur, mais le précieux écrin qui rend chaque instant sacré.",
      es: "Has cruzado el umbral de la angustia existencial hacia la soberanía personal. Entiendes con Viktor Frankl que la vida no te debe sentido: eres tú quien le otorga significado. La mortalidad no te aterra, sino que se convierte en el marco que hace que cada día sea valioso.",
    },
    psychologyInsight: {
      en: "In Irvin Yalom's existential psychotherapy and Frankl's logotherapy, psychological freedom is born when one ceases waiting for external cosmic answers and courageously assumes ultimate responsibility for one's values, relationships, and legacy.",
      id: "Dalam psikoterapi eksistensial Irvin Yalom dan logoterapi Frankl, kebebasan sejati lahir saat seseorang berhenti menunggu jawaban kosmis dari luar dan berani mengambil tanggung jawab penuh atas nilai, cinta, dan jejak hidupnya.",
      de: "Nach Irvin Yaloms existentieller Psychotherapie und Frankls Logotherapie entsteht psychische Freiheit, wenn man aufhört, auf fertige Antworten zu warten, und radikale Verantwortung für Werte und Taten übernimmt.",
      fr: "Selon la psychothérapie existentielle d'Irvin Yalom et Frankl, la paix intérieure naît lorsque l'on cesse d'attendre des réponses magiques pour assumer la pleine responsabilité de ses valeurs et de ses liens.",
      es: "En la psicoterapia existencial de Irvin Yalom y la logoterapia de Frankl, la auténtica libertad brota cuando dejas de esperar respuestas externas y asumes la responsabilidad total de tus valores y vínculos.",
    },
    actionProtocols: {
      en: [
        "Craft Your Daily Micro-Legacy: Focus each morning on one intentional act of kindness or craft that leaves the world slightly better.",
        "Savor the Frame of Mortality: Use 'Memento Mori' not to induce sadness, but to ruthlessly eliminate petty grievances.",
        "Mentor Others in Transition: Share your grounded peace with younger friends navigating quarter-life identity crises.",
      ],
      id: [
        "Ciptakan Jejak Mikro Harian: Setiap pagi fokuskan diri pada satu tindakan kebaikan atau karya nyata yang membuat dunia sedikit lebih hangat.",
        "Nikmati Bingkai Kefanaan: Gunakan pengingat kefanaan (Memento Mori) bukan untuk bersedih, tapi untuk menghapus drama dan dendam sepele.",
        "Bimbing Orang yang Sedang Krisis: Bagikan ketenangan batinmu kepada teman yang sedang berjuang di krisis usia 20-30an.",
      ],
      de: [
        "Tägliches Mikro-Vermächtnis stiften: Jeden Morgen eine bewusste gute Tat oder schöpferische Arbeit vollenden.",
        "Die Endlichkeit als Geschenk nutzen: 'Memento Mori' nutzen, um kleinliche Konflikte und Eitelkeiten sofort loszulassen.",
        "Anderen Halt geben: Deine Gelassenheit mit Menschen teilen, die in Sinnkrisen feststecken.",
      ],
      fr: [
        "Bâtir son micro-héritage quotidien : poser chaque matin un acte bienveillant ou créatif qui enrichit le monde.",
        "Apprivoiser la finitude : utiliser le 'Memento Mori' pour balayer les rancœurs futiles et savourer l'instant.",
        "Guider ceux qui doutent : offrir votre écoute paisible aux proches traversant une crise de la trentaine.",
      ],
      es: [
        "Forjar un micro-legado diario: dedicar cada mañana a una acción generosa o creativa que deje una huella positiva.",
        "Celebrar la finitud con gratitud: usar 'Memento Mori' para disolver de inmediato enojos y quejas banales.",
        "Acompañar a quienes dudan: compartir tu calma con amigos que atraviesan crisis de identidad o rumbo.",
      ],
    },
    dailyAffirmation: {
      en: "I do not wait for the universe to give me meaning. I am the artist, and my living is the art.",
      id: "Aku tidak menunggu alam semesta memberiku arti. Akulah sang perajin, dan caraku hidup adalah mahakaryanya.",
      de: "Ich warte nicht darauf, dass das Universum mir Sinn schenkt. Ich bin der Schöpfer, und mein Leben ist das Kunstwerk.",
      fr: "Je n'attends pas que l'univers me donne un sens. Je suis l'artisan, et ma vie est l'œuvre.",
      es: "No espero que el universo me dé sentido. Yo soy el artesano, y mi propia vida es la obra de arte.",
    },
  },

  seeking_horizon_explorer: {
    level: "seeking_horizon_explorer",
    badge: {
      en: "Seeking Horizon Explorer",
      id: "Penjelajah Cakrawala: Fase Transisi",
      de: "Suchender Horizont-Entdecker",
      fr: "Explorateur d'Horizons en Quête",
      es: "Explorador de Horizontes en Búsqueda",
    },
    title: {
      en: "Philosophical Restlessness & Quest for Direction",
      id: "Gelisah Filosofis & Pencarian Arah Hidup",
      de: "Philosophische Unruhe & Richtungssuche",
      fr: "Inquiétude Philosophique & Quête de Voie",
      es: "Inquietud Filosófica y Búsqueda de Rumbo",
    },
    tagline: {
      en: "You are questioning old societal scripts and feeling the growing pains of a deeper, more intentional life chapter.",
      id: "Kamu mulai mempertanyakan aturan hidup lama dan merasakan proses pendewasaan menuju babak hidup yang lebih bermakna.",
      de: "Du hinterfragst alte gesellschaftliche Vorgaben und spürst den heilsamen Wachstumsschmerz einer neuen Lebensphase.",
      fr: "Vous remettez en question les schémas reçus et ressentez les secousses fécondes d'une transition profonde.",
      es: "Te cuestionas los mandatos heredados y sientes los dolores de parto de una etapa vital más consciente.",
    },
    description: {
      en: "You are in a healthy, necessary phase of existential recalibration. The autopilot goals of your early 20s no longer satisfy your soul, but the new horizon has not yet crystallized. You occasionally feel the cold wind of temporal anxiety or wonder if you made the right choices, but curiosity still outweighs dread.",
      id: "Kamu sedang berada dalam fase rekalibrasi eksistensial yang sehat dan krusial. Target otomatis masa lalu tidak lagi memuaskan jiwamu, namun jalan baru belum sepenuhnya terang. Kamu sesekali merasakan kecemasan umur atau bertanya-tanya apakah pilihanmu sudah benar, namun rasa ingin tahumu masih lebih kuat dari rasa takut.",
      de: "Du befindest dich in einer gesunden existenziellen Neuorientierung. Die Schablonen der Vergangenheit genügen dir nicht mehr, auch wenn der neue Weg noch im Nebel liegt. Zeitangst taucht auf, doch deine Neugier bleibt lebendig.",
      fr: "Vous traversez une phase salutaire de recalibrage intérieur. Les buts automatiques d'hier ne nourrissent plus votre âme, sans que la suite ne soit encore limpide. L'angoisse temporelle affleure parfois, mais l'élan de vie l'emporte.",
      es: "Atraviesas una necesaria etapa de reajuste existencial. Las metas automáticas de antes ya no llenan tu espíritu, aunque el nuevo horizonte aún esté aclarándose. Sientes a veces la presión del reloj, pero tu curiosidad sigue intacta.",
    },
    psychologyInsight: {
      en: "Developmental psychologists identify the 'Quarter-Life Transition' as a critical individuation window where outgrowing parental and cultural expectations is essential for psychological wholeness.",
      id: "Psikolog perkembangan menyebut 'Transisi Quarter-Life' sebagai jendela individuasi krusial di mana melepaskan ekspektasi orang tua dan budaya adalah syarat mutlak menuju keutuhan jiwa.",
      de: "Entwicklungspsychologen betonen die 'Quarter-Life-Transition' als entscheidende Reifungsphase, in der das Ablegen fremder Erwartungen unverzichtbar für echte Ganzheit ist.",
      fr: "La psychologie du développement reconnaît la crise du quart de vie comme une étape initiatique indispensable pour se détacher des projections familiales.",
      es: "La psicología del desarrollo define la transición del cuarto de siglo como una ventana esencial de individuación, donde soltar mandatos ajenos permite alcanzar la madurez personal.",
    },
    actionProtocols: {
      en: [
        "Audit Your Energy Leaks: Identify 2 obligations or relationships you maintain solely out of habit or social pressure, and phase them out.",
        "Conduct Low-Stakes Life Experiments: Take a weekend workshop, volunteer, or start a creative side-project without needing it to be a career.",
        "Journal the 'Values Matrix': Write down your top 3 non-negotiable core values and benchmark your current weekly calendar against them.",
      ],
      id: [
        "Audit Kebocoran Energi: Identifikasi 2 kewajiban atau relasi yang kamu jalani murni karena sungkan, lalu mulailah melepaskannya perlahan.",
        "Uji Coba Eksperimen Hidup: Ikuti workshop akhir pekan, kegiatan sosial, atau proyek kreatif kecil tanpa beban harus menghasilkan uang.",
        "Tulis Matriks Nilai Hidup: Rumuskan 3 nilai utama yang tak bisa ditawar, lalu cocokkan apakah jadwal mingguanmu mencerminkan nilai itu.",
      ],
      de: [
        "Energie-Lecks schließen: Streiche 2 Verpflichtungen, die du nur aus falscher Höflichkeit oder Gewohnheit aufrechterhältst.",
        "Kleine Experimente wagen: Probiere ein kreatives Projekt oder Ehrenamt aus, ohne sofort Karriere daraus machen zu müssen.",
        "Werte-Inventur durchführen: Notiere deine 3 Kernwerte und prüfe, ob dein Wochenkalender diese widerspiegelt.",
      ],
      fr: [
        "Colmater les fuites d'énergie : identifiez 2 obligations maintenues par simple convention sociale et prenez vos distances.",
        "Tenter des micro-expériences : commencez une activité artistique ou bénévole sans aucune obligation de rentabilité.",
        "Clarifier ses valeurs fondamentales : déterminez vos 3 valeurs cardinales et alignez votre emploi du temps sur elles.",
      ],
      es: [
        "Frenar fugas de energía: detecta 2 compromisos que mantienes solo por inercia o cortesía y suéltalos con calma.",
        "Microexperimentos vitales: inicia un proyecto creativo o voluntariado de fin de semana sin exigirte monetizarlo.",
        "Auditoría de valores: define tus 3 valores no negociables y revisa si tu agenda semanal es coherente con ellos.",
      ],
    },
    dailyAffirmation: {
      en: "I am not lost; I am in gestation. The fog is clearing, and my authentic life is taking shape.",
      id: "Aku tidak tersesat; aku sedang dalam proses melahirkan versi diriku yang baru. Kabut mulai sirna, dan hidup asliku sedang terbentuk.",
      de: "Ich bin nicht verloren; ich wachse heran. Der Nebel lichtet sich, und mein echtes Leben nimmt Gestalt an.",
      fr: "Je ne suis pas perdu; je suis en gestation. La brume se dissipe et ma vraie vie se dessine.",
      es: "No estoy perdido; estoy madurando. La niebla se disipa y mi vida auténtica empieza a tomar forma.",
    },
  },

  quarter_life_drifter: {
    level: "quarter_life_drifter",
    badge: {
      en: "Quarter-Life Drifter",
      id: "Perantau Quarter-Life: Autopilot & Gelisah",
      de: "Quarter-Life-Getriebener",
      fr: "Navigateur en Crise de Sens",
      es: "Navegante en Crisis Existencial",
    },
    title: {
      en: "Existential Alienation & Conveyor Belt Fatigue",
      id: "Keterasingan Eksistensial & Lelah Rutinitas",
      de: "Existentielle Entfremdung & Hamsterrad-Müdigkeit",
      fr: "Aliénation Existentielle & Épuisement Routinier",
      es: "Alienación Existencial y Agotamiento de Rutina",
    },
    tagline: {
      en: "You feel trapped on a corporate conveyor belt, haunted by the dread that you are trading your finite life force for hollow metrics.",
      id: "Kamu merasa terjebak di ban berjalan rutinitas kerja, dihantui ketakutan bahwa kamu menukar umur hidupmu demi angka-angka kosong.",
      de: "Du fühlst dich im Hamsterrad gefangen, geplagt von der Furcht, deine kostbare Lebenszeit für leere Kennzahlen zu opfern.",
      fr: "Vous vous sentez prisonnier d'un engrenage absurde, taraudé par la peur de brader votre énergie vitale pour des trophées futiles.",
      es: "Te sientes atrapado en una rueda de hámster corporativa, con el temor asfixiante de estar canjeando tus mejores años por cifras vacías.",
    },
    description: {
      en: "You are experiencing acute existential dislocation. On paper, you are functional and checking the boxes; internally, a profound sense of absurdity gnaws at your daily routine. Sunday nights are filled with anticipatory dread, time feels like it is accelerating out of control, and you frequently entertain secret fantasies of quitting everything and vanishing.",
      id: "Kamu mengalami dislokasi eksistensial yang nyata. Di atas kertas, hidupmu berjalan baik dan tampak fungsional; namun di dalam batin, rasa absurditas menggerogoti rutinitasmu. Minggu malam dipenuhi kecemasan mencekam, waktu terasa berlari tanpa kendali, dan kamu sering berkhayal ingin kabur meninggalkan semuanya.",
      de: "Du leidest unter einer spürbaren existenziellen Entfremdung. Nach außen hin funktioniert alles; innerlich zermürbt dich die Absurdität der Tage. Sonntagabende sind von Beklemmung erfüllt, die Zeit rast davon, und Fluchtgedanken häufen sich.",
      fr: "Vous vivez une crise existentielle aiguë. En apparence, tout est en ordre; à l'intérieur, l'absurdité du quotidien vous ronge. Les dimanches soirs sont synonymes d'angoisse, le temps vous échappe et l'envie de tout plaquer devient récurrente.",
      es: "Sufres una evidente desubicación existencial. De cara al exterior cumples con todo; por dentro, la rutina se siente absurda y fría. Las tardes de domingo se llenan de congoja, el tiempo se te escapa de las manos y fantaseas a menudo con huir.",
    },
    psychologyInsight: {
      en: "In Albert Camus' philosophy of the Absurd and Kierkegaard's 'Sickness Unto Death', the realization of life's routine absurdity is not a pathology, but the crucial awakening required to reject borrowed identities.",
      id: "Dalam filosofi Absurditas Albert Camus dan konsep 'Sickness Unto Death' Kierkegaard, kesadaran akan kehampaan rutinitas bukanlah penyakit, melainkan alarm kebangkitan jiwa untuk merobek topeng hidup pinjaman.",
      de: "Nach Albert Camus' Philosophie des Absurden und Kierkegaards 'Krankheit zum Tode' ist das Erkennen der Alltagsabsurdität kein Defekt, sondern der notwendige Weckruf zur Befreiung aus fremden Identitäten.",
      fr: "Selon Camus et Kierkegaard, la prise de conscience de l'absurdité n'est pas une maladie, mais l'indispensable étincelle de lucidité pour briser les fausses existences.",
      es: "En la filosofía de Albert Camus y Kierkegaard, notar el absurdo de la rutina no es un fallo, sino el despertar imprescindible para rebelarse contra una vida prestada.",
    },
    actionProtocols: {
      en: [
        "The Sunday Evening Sanctuary: Turn off work notifications by 4:00 PM on Sunday; replace screen dread with somatic baths, reading, or quiet music.",
        "Name the 'Golden Handcuffs': Write down the exact material conveniences keeping you trapped in an unfulfilling position, and calculate what freedom actually costs.",
        "The 1-Year Horizon Reset: Draft an honest vision of where you want to be in 12 months if social judgment did not exist.",
      ],
      id: [
        "Sanctuary Minggu Malam: Matikan semua notifikasi kerja mulai jam 16.00 hari Minggu; ganti scroll HP dengan mandi air hangat, membaca buku, atau musik santai.",
        "Identifikasi 'Borgol Emas': Tulis fasilitas materi apa yang menahanmu di pekerjaan hampa ini, dan hitung berapa biaya hidup minimal untuk meraih kebebasan.",
        "Rencana 1 Tahun Tanpa Gengsi: Tulis rencana hidup 12 bulan ke depan jika kamu tidak perlu memikirkan gengsi atau omongan orang lain.",
      ],
      de: [
        "Sonntags-Schutzraum einrichten: Arbeits-Apps sonntags ab 16 Uhr stummschalten; Zeit für ein heißes Bad, Buch oder beruhigende Musik nutzen.",
        "Die 'goldenen Handschellen' beziffern: Berechne nüchtern, welche materiellen Bequemlichkeiten dich festhalten und was echte Freiheit wirklich kostet.",
        "1-Jahres-Manifest ohne Scham: Schreibe auf, wie dein Leben in 12 Monaten aussehen soll, wenn gesellschaftliches Urteil keine Rolle spielt.",
      ],
      fr: [
        "Sanctuaire du dimanche soir : coupez toute notification pro dès 16h00; privilégiez le bain chaud, la lecture ou la musique douce.",
        "Nommer les 'menottes dorées' : calculez le coût réel de votre liberté matérielle pour cesser de subir une carrière toxique.",
        "Projet à un an sans filtre : décrivez ce que vous feriez dans 12 mois si le regard des autres n'existait pas.",
      ],
      es: [
        "Santuario del domingo por la tarde: silencia avisos de trabajo desde las 16:00; opta por una ducha caliente, un libro o música suave.",
        "Examinar las 'esposas de oro': anota con exactitud qué comodidades materiales te atan a ese trabajo y cuánto cuesta realmente tu libertad.",
        "Manifiesto a 1 año sin censura: redacta cómo vivirías dentro de 12 meses si la opinión social fuera irrelevante.",
      ],
    },
    dailyAffirmation: {
      en: "I do not exist to be a cog in another person's machine. My life belongs to me, and I have the power to pivot.",
      id: "Aku tidak diciptakan hanya untuk jadi roda gigi di mesin orang lain. Hidupku adalah milikku, dan aku berkuasa untuk banting setir.",
      de: "Ich bin kein Rädchen im Getriebe fremder Interessen. Mein Leben gehört mir, und ich darf den Kurs wechseln.",
      fr: "Je n'existe pas pour être un rouage dans la machine d'un autre. Ma vie m'appartient et j'ai le pouvoir de bifurquer.",
      es: "No nací para ser un engranaje en la máquina de nadie. Mi vida me pertenece y tengo el coraje de cambiar de rumbo.",
    },
  },

  acute_existential_void: {
    level: "acute_existential_void",
    badge: {
      en: "Acute Existential Void",
      id: "Jurang Kehampaan Eksistensial Akut",
      de: "Akuter Existenzieller Abgrund",
      fr: "Gouffre Existentiel Aigu",
      es: "Abismo Existencial Agudo",
    },
    title: {
      en: "Existential Crisis, Nihilistic Paralysis & Cosmic Dread",
      id: "Krisis Eksistensial Akut & Kelumpuhan Nihilisme",
      de: "Akute Sinnkrise, Nihilistische Lähmung & Weltschmerz",
      fr: "Crise Existentielle Aiguë & Sidération Nihiliste",
      es: "Crisis Existencial Aguda y Parálisis Nihilista",
    },
    tagline: {
      en: "You are overwhelmed by profound meaning collapse, experiencing severe derealization, thanatophobia, and the terrifying feeling that nothing is real or worth pursuing.",
      id: "Kamu tenggelam dalam runtuhnya makna hidup, mengalami derealisasi berat, takut mati, dan perasaan mencekam bahwa hidup ini semu dan tak ada gunanya.",
      de: "Du bist von einem radikalen Sinnkollaps überwältigt, leidest unter Derealisation und der Lähmung, dass nichts von Bedeutung ist.",
      fr: "Vous êtes submergé par l'effondrement du sens, en proie à une déréalisation aiguë et à la sensation terrifiante que rien ne vaut la peine.",
      es: "Te sientes abrumado por un colapso total de significado, con desrealización constante y la sensación de que nada es real ni vale el esfuerzo.",
    },
    description: {
      en: "You are standing at the absolute edge of existential dread. The universe feels cold, indifferent, and absurdly immense, shrinking your daily human concerns into trivial dust. You suffer from intrusive thoughts about death, feel like a ghost drifting through flesh, and struggle to find any emotional leverage to care about work or relationships. This is a recognized psychological crisis point requiring gentle somatic grounding and compassionate support.",
      id: "Kamu sedang berdiri di tepi jurang kecemasan eksistensial. Alam semesta terasa dingin, sunyi, dan sangat luas, membuat segala urusan manusia tampak seperti debu yang sia-sia. Kamu dihantui pikiran tentang kematian, merasa seperti arwah yang melayang di tubuh asing, dan kesulitan peduli pada karier atau hubungan. Ini adalah krisis jiwa yang membutuhkan grounding fisik perlahan dan pendampingan penuh kasih.",
      de: "Du stehst am Rand eines existenziellen Vakuums. Die Welt wirkt kalt, gleichgültig und absurd, was deinen Alltag zur Farce schrumpft. Aufdringliche Gedanken an Vergänglichkeit lähmen dich. Dies ist eine ernste seelische Belastungsprobe, die sanfte Erdung und mitfühlende Begleitung verlangt.",
      fr: "Vous êtes au bord du gouffre existentiel. Le cosmos vous semble glacial et absurde, réduisant votre quotidien en cendres. Les pensées intrusives de mort vous hantent et vous vous sentez comme un fantôme. Cette crise requiert un ancrage somatique doux et un soutien bienveillant.",
      es: "Te encuentras al borde de un abismo existencial. El mundo te parece frío, absurdo y gigantesco, reduciendo tus esfuerzos cotidianos a polvo sin sentido. Sufres pensamientos invasivos sobre la muerte y te sientes como un espectro. Esta crisis exige un anclaje físico suave y acompañamiento compasivo.",
    },
    psychologyInsight: {
      en: "In clinical crisis psychology, the 'Dark Night of the Soul' or acute existential depression reflects a complete collapse of previous cognitive ego-structures. While intensely painful, it is historically the crucible from which radical psychological rebirth emerges.",
      id: "Dalam psikologi krisis klinis, 'Dark Night of the Soul' atau depresi eksistensial akut mencerminkan runtuhnya struktur ego lama secara total. Meski sangat menyakitkan, dalam sejarah psikologi ini adalah kawah peleburan lahirnya kelahiran kembali jiwa yang sejati.",
      de: "In der Tiefenpsychologie spiegelt die 'Dunkle Nacht der Seele' den Zusammenbruch veralteter Ego-Strukturen wider. So schmerzhaft sie ist, birgt sie historisch oft die Keimzelle einer tiefgreifenden psychischen Wiedergeburt.",
      fr: "En psychologie des profondeurs, la 'Nuit Noire de l'Âme' traduit l'effondrement des structures défensives du moi. Bien que déchirante, elle constitue souvent la matrice d'une authentique renaissance intérieure.",
      es: "En la psicología clínica, la 'Noche Oscura del Alma' o depresión existencial aguda marca la caída de las estructuras del ego. Aunque dolorosa, suele ser el crisol del que surge un renacimiento psicológico real.",
    },
    actionProtocols: {
      en: [
        "Immediate Micro-Sensory Grounding: Cease abstract philosophical pondering; hold an ice cube, drink warm tea, feel your bare feet on cold floorboards.",
        "The 'One Day at a Time' Rule: Ban all 10-year and lifetime forecasting. Ask only: 'What is the next kind, simple thing I can do in the next 60 minutes?'",
        "Seek Compassionate Companionship: Talk to an existential therapist or trusted confidant; do not navigate the void in isolated silence.",
      ],
      id: [
        "Grounding Sensorik Segera: Hentikan perdebatan filosofis abstrak di kepala; pegang es batu, minum teh hangat, rasakan telapak kaki menapak di lantai dingin.",
        "Aturan Satu Jam ke Depan: Larang otakmu memikirkan target 5-10 tahun ke depan. Tanyakan saja: 'Hal sederhana dan baik apa yang bisa kulakukan dalam 60 menit ke depan?'",
        "Cari Teman Berbagi: Bicaralah dengan konselor atau sahabat terdekat; jangan menanggung jurang kehampaan ini sendirian dalam kesunyian.",
      ],
      de: [
        "Sofortige Sinnes-Erdung: Abstrakte Grübeleien stoppen; einen Eiswürfel halten, warmen Tee trinken, Barfußkontakt zum Boden spüren.",
        "Die 60-Minuten-Regel: Keine 10-Jahres-Pläne wälzen. Nur fragen: 'Was ist die nächste einfache, heilsame Handlung in der kommenden Stunde?'",
        "Professionelle Begleitung suchen: Mit existentiell geschulten Therapeuten sprechen – trage die Leere nicht in stummer Isolation.",
      ],
      fr: [
        "Ancrage sensoriel d'urgence : stoppez les ruminations abstraites; tenez un glaçon, buvez une tisane chaude, marchez pieds nus au sol.",
        "Règle de l'heure suivante : interdisez-vous toute projection à long terme. Demandez-vous : 'Quel geste simple puis-je poser dans l'heure qui vient ?'",
        "Briser l'isolement : confiez votre détresse à un professionnel ou un proche bienveillant; ne traversez pas ce désert seul.",
      ],
      es: [
        "Anclaje sensorial urgente: suspende el debate abstracto mental; toma un hielo en la mano, bebe un té caliente y apoya los pies descalzos en el suelo.",
        "Regla de los próximos 60 minutos: prohíbete pensar a 5 o 10 años. Pregúntate únicamente: '¿Qué pequeña acción amable puedo hacer en la próxima hora?'",
        "Buscar apoyo compasivo: habla con un terapeuta existencial o un amigo cercano; no atravieses este vacío en aislamiento silencioso.",
      ],
    },
    dailyAffirmation: {
      en: "Even in the vast dark of the cosmos, my breath is warm, my heart is beating, and this small moment of life is real.",
      id: "Meski di tengah luasnya alam semesta yang sunyi, napasku tetap hangat, jantungku tetap berdetak, dan detik hidup kecil ini adalah nyata.",
      de: "Selbst in der unendlichen Weite des Kosmos ist mein Atem warm, mein Herz schlägt und dieser Augenblick ist real.",
      fr: "Même dans la nuit cosmique, mon souffle est tiède, mon cœur bat et cet humble instant de vie est réel.",
      es: "Aun en medio del cosmos silencioso, mi respiración es cálida, mi corazón late y este humilde instante es real.",
    },
  },
};

export function calculateExistentialDreadScore(
  answers: Record<number, number>
): ExistentialDreadScoreResult {
  let totalScore = 0;
  let meaningScore = 0;
  let temporalScore = 0;
  let agencyScore = 0;

  EXISTENTIAL_DREAD_QUESTIONS.forEach((q) => {
    const score = answers[q.id] ?? 0;
    totalScore += score;

    if (q.subscale === "meaning_vacuum") meaningScore += score;
    if (q.subscale === "temporal_anxiety") temporalScore += score;
    if (q.subscale === "agency_deficit") agencyScore += score;
  });

  const maxTotal = EXISTENTIAL_DREAD_QUESTIONS.length * 3; // 36
  const maxSubscale = 4 * 3; // 12
  const percentage = Math.round((totalScore / maxTotal) * 100);

  let level: ExistentialDreadArchetype["level"];
  if (percentage <= 24) {
    level = "grounded_meaning_weaver";
  } else if (percentage <= 49) {
    level = "seeking_horizon_explorer";
  } else if (percentage <= 74) {
    level = "quarter_life_drifter";
  } else {
    level = "acute_existential_void";
  }

  return {
    totalScore,
    percentage,
    level,
    profile: EXISTENTIAL_DREAD_ARCHETYPES[level],
    subscales: {
      meaning_vacuum: {
        score: meaningScore,
        percentage: Math.round((meaningScore / maxSubscale) * 100),
      },
      temporal_anxiety: {
        score: temporalScore,
        percentage: Math.round((temporalScore / maxSubscale) * 100),
      },
      agency_deficit: {
        score: agencyScore,
        percentage: Math.round((agencyScore / maxSubscale) * 100),
      },
    },
  };
}
