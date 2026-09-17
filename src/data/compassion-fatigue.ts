export type CompassionFatigueLang = "en" | "id" | "de" | "fr" | "es";

export interface CompassionFatigueQuestion {
  id: number;
  subscale: "empathic_depletion" | "cynicism_callousness" | "vicarious_trauma";
  prompt: Record<CompassionFatigueLang, string>;
  options: {
    label: Record<CompassionFatigueLang, string>;
    score: number; // 0 to 3
  }[];
}

export interface CompassionFatigueArchetype {
  level: "vital_empathic_anchor" | "strained_caregiver_sponge" | "compassion_fatigued_sentinel" | "secondary_traumatic_collapse";
  badge: Record<CompassionFatigueLang, string>;
  title: Record<CompassionFatigueLang, string>;
  tagline: Record<CompassionFatigueLang, string>;
  description: Record<CompassionFatigueLang, string>;
  psychologyInsight: Record<CompassionFatigueLang, string>;
  actionProtocols: Record<CompassionFatigueLang, string[]>;
  dailyAffirmation: Record<CompassionFatigueLang, string>;
}

export interface CompassionFatigueScoreResult {
  totalScore: number;
  percentage: number;
  level: CompassionFatigueArchetype["level"];
  profile: CompassionFatigueArchetype;
  subscales: {
    empathic_depletion: { score: number; percentage: number };
    cynicism_callousness: { score: number; percentage: number };
    vicarious_trauma: { score: number; percentage: number };
  };
}

export const COMPASSION_FATIGUE_QUESTIONS: CompassionFatigueQuestion[] = [
  // Subscale 1: Empathic Depletion (Figley & Maslach Model)
  {
    id: 1,
    subscale: "empathic_depletion",
    prompt: {
      en: "I absorb other people's stress, sorrow, or complaints like an emotional sponge, leaving me utterly drained after conversations.",
      id: "Aku menyerap stres, kesedihan, atau keluhan orang lain seperti spons emosional, membuatku terkuras habis setelah mengobrol.",
      de: "Ich sauge den Stress und Kummer anderer Menschen wie ein Schwamm auf, sodass ich mich nach Gesprächen völlig ausgelaugt fühle.",
      fr: "J'absorbe le stress et les chagrins d'autrui comme une éponge émotionnelle, me sentant vidé après chaque échange.",
      es: "Absorbo el estrés y las penas de los demás como una esponja emocional, sintiéndome exhausto tras cualquier conversación.",
    },
    options: [
      {
        score: 0,
        label: {
          en: "Rarely — I maintain healthy emotional boundaries while listening compassionately",
          id: "Jarang — aku menjaga batasan emosi yang sehat sambil tetap mendengarkan dengan penuh empati",
          de: "Selten — ich wahre gesunde Grenzen bei mitfühlendem Zuhören",
          fr: "Rarement — je garde des frontières saines tout en écoutant avec bienveillance",
          es: "Casi nunca — mantengo límites saludables mientras escucho con compasión",
        },
      },
      {
        score: 1,
        label: {
          en: "Occasionally when close family members are in genuine distress",
          id: "Sesekali hanya saat anggota keluarga terdekat sedang menghadapi krisis berat",
          de: "Gelegentlich bei akutem Kummer enger Angehöriger",
          fr: "Parfois lors d'épreuves frappant mes proches",
          es: "Ocasionalmente cuando familiares cercanos sufren una crisis",
        },
      },
      {
        score: 2,
        label: {
          en: "Frequently — I carry other people's problems in my body for days after hearing them",
          id: "Sering — aku memikul masalah orang lain di tubuh fisikku selama berhari-hari setelah mendengarnya",
          de: "Häufig — ich trage die Probleme anderer tagelang körperlich mit mir herum",
          fr: "Souvent — je porte physiquement les soucis d'autrui pendant des jours entiers",
          es: "A menudo — cargo los problemas ajenos en mi cuerpo durante días",
        },
      },
      {
        score: 3,
        label: {
          en: "Always — my empathic porousness is extreme; I feel everyone's pain as if it were my own",
          id: "Selalu — pori-pori empatiku terbuka ekstrem; aku merasakan penderitaan semua orang seperti milikku sendiri",
          de: "Ständig — meine emotionale Durchlässigkeit ist extrem; ich leide bei jedem ungefiltert mit",
          fr: "Constamment — ma perméabilité est totale ; je vis la douleur des autres comme la mienne",
          es: "Siempre — mi permeabilidad emocional es extrema; sufro el dolor ajeno como propio",
        },
      },
    ],
  },
  {
    id: 2,
    subscale: "empathic_depletion",
    prompt: {
      en: "When friends, colleagues, or loved ones start venting, I feel an internal urge to run away because I have zero emotional bandwidth left.",
      id: "Saat teman, rekan kerja, atau pasangan mulai curhat, aku merasakan dorongan panik untuk kabur karena kapasitas batinku sudah nol.",
      de: "Wenn Freunde oder Kollegen klagen, spüre ich den Drang zu fliehen, weil meine emotionale Kapazität bei Null liegt.",
      fr: "Quand un ami ou un collègue commence à se plaindre, j'ai envie de fuir car je n'ai plus la moindre réserve.",
      es: "Cuando alguien empieza a desahogarse, siento ganas de huir porque mi ancho de banda emocional está en cero.",
    },
    options: [
      {
        score: 0,
        label: {
          en: "Rarely — I have ample space and presence to hold space for others",
          id: "Jarang — aku memiliki ruang batin yang luas untuk hadir bagi orang lain",
          de: "Selten — ich habe ausreichend Ruhe und Raum für mein Gegenüber",
          fr: "Rarement — j'ai l'espace mental et l'énergie nécessaires pour accueillir l'autre",
          es: "Casi nunca — dispongo de serenidad y espacio para acompañar a los demás",
        },
      },
      {
        score: 1,
        label: {
          en: "Only late on Friday evenings after grueling work weeks",
          id: "Hanya saat Jumat malam yang larut setelah minggu kerja yang melelahkan",
          de: "Nur freitags nach harten Arbeitswochen",
          fr: "Seulement le vendredi soir après une semaine épuisante",
          es: "Solo los viernes por la noche tras semanas agotadoras",
        },
      },
      {
        score: 2,
        label: {
          en: "Frequently — seeing a notification or call from a struggling friend triggers dread",
          id: "Sering — melihat notifikasi chat atau telepon dari teman yang sedang galau memicu rasa ngeri",
          de: "Häufig — ein Anruf eines belasteten Freundes löst Beklemmung aus",
          fr: "Souvent — voir l'appel d'un proche en difficulté déclenche une appréhension sourde",
          es: "A menudo — ver un mensaje de un amigo con problemas me genera rechazo y agobio",
        },
      },
      {
        score: 3,
        label: {
          en: "Almost always — my emotional gas tank is in the negative; any request for care feels intrusive",
          id: "Hampir selalu — tangki emosiku sudah minus; permintaan perhatian apa pun terasa menyiksa",
          de: "Fast immer — mein emotionaler Tank ist im Minus; jede Bitte um Zuwendung wirkt übergriffig",
          fr: "Presque toujours — mon réservoir est à sec ; toute sollicitation m'agresse",
          es: "Casi siempre — mi depósito afectivo está en negativo; cualquier petición de apoyo me desborda",
        },
      },
    ],
  },
  {
    id: 3,
    subscale: "empathic_depletion",
    prompt: {
      en: "I feel guilty if I take a relaxing break or enjoy myself while knowing that people around me (or in the world) are suffering.",
      id: "Aku merasa bersalah jika bersantai atau bersenang-senang sementara mengetahui ada orang di dekatku (atau di dunia) yang sedang menderita.",
      de: "Ich fühle mich schuldig, wenn ich entspanne oder Freude habe, während andere Menschen leiden.",
      fr: "Je culpabilise de profiter d'un moment agréable en sachant que des gens souffrent autour de moi ou dans le monde.",
      es: "Me siento culpable si me relajo o disfruto sabiendo que otros a mi alrededor o en el mundo están sufriendo.",
    },
    options: [
      {
        score: 0,
        label: {
          en: "Disagree — I understand that my joy and vitality do not harm others",
          id: "Tidak setuju — aku paham bahwa sukacita dan energiku tidak merugikan siapa pun",
          de: "Trifft nicht zu — meine Lebensfreude schadet niemandem, sie nährt mich",
          fr: "Pas d'accord — mon bien-être ne prive personne et m'aide à être utile",
          es: "En desacuerdo — mi alegría y descanso no perjudican a nadie",
        },
      },
      {
        score: 1,
        label: {
          en: "Mild twinge when watching world news disasters",
          id: "Sedikit tersentuh hanya saat melihat berita bencana dunia",
          de: "Leises Unbehagen bei schlimmen Fernsehnachrichten",
          fr: "Un léger pincement face aux actualités tragiques",
          es: "Un ligero malestar ante catástrofes en las noticias",
        },
      },
      {
        score: 2,
        label: {
          en: "Frequently — I dim my light and restrict my happiness out of misplaced survivor guilt",
          id: "Sering — aku meredupkan kebahagiaanku karena rasa bersalah (survivor guilt)",
          de: "Häufig — ich dämpfe mein Glück aus unbewussten Überlebensschuldgefühlen",
          fr: "Souvent — je bride ma joie par une culpabilité déplacée",
          es: "A menudo — apago mi entusiasmo por una culpa inconsciente",
        },
      },
      {
        score: 3,
        label: {
          en: "Constant martyr burden — I believe resting while others struggle is morally unacceptable",
          id: "Beban martir terus-menerus — aku merasa istirahat saat orang lain susah adalah dosa moral",
          de: "Dauernde Märtyrer-Schuld — Ausruhen bei fremdem Leid halte ich für moralisch verwerflich",
          fr: "Fardeau permanent — me reposer tant que d'autres peinent me paraît immoral",
          es: "Carga de mártir continua — descansar mientras otros sufren me parece inaceptable",
        },
      },
    ],
  },
  {
    id: 4,
    subscale: "empathic_depletion",
    prompt: {
      en: "I give so much emotional support to others that I have nothing left to give to my own partner, children, or personal passions.",
      id: "Aku mencurahkan begitu banyak dukungan emosi untuk orang lain hingga tidak tersisa apa-apa lagi untuk pasangan, anak, atau passion pribadiku.",
      de: "Ich gebe anderen so viel emotionale Unterstützung, dass für Partner, Kinder oder eigene Träume nichts bleibt.",
      fr: "Je donne tant de soutien aux autres qu'il ne me reste plus rien pour mon partenaire, mes enfants ou mes passions.",
      es: "Doy tanto apoyo emocional a los demás que no me queda nada para mi pareja, mis hijos o mis proyectos.",
    },
    options: [
      {
        score: 0,
        label: {
          en: "Rarely — my closest inner circle and personal goals receive my best energy",
          id: "Jarang — lingkaran terdekat dan impian pribadiku mendapatkan energi terbaikku",
          de: "Selten — mein innerer Kreis und meine Träume erhalten meine beste Energie",
          fr: "Rarement — mes proches et mes aspirations reçoivent le meilleur de mes forces",
          es: "Casi nunca — mis seres más queridos y mis metas reciben mi mejor energía",
        },
      },
      {
        score: 1,
        label: {
          en: "Occasionally during intensive caregiving seasons",
          id: "Sesekali hanya saat musim mendampingi orang sakit",
          de: "Gelegentlich in Phasen intensiver Pflege",
          fr: "Parfois lors de périodes intenses d'aide à un proche",
          es: "Ocasionalmente en épocas de cuidados familiares intensos",
        },
      },
      {
        score: 2,
        label: {
          en: "Frequently — I arrive home as an empty husk, irritable and emotionally unavailable",
          id: "Sering — aku pulang ke rumah dalam keadaan kosong melompong, mudah tersinggung, dan tertutup",
          de: "Häufig — ich komme wie eine leere Hülle nach Hause, gereizt und unnahbar",
          fr: "Souvent — je rentre chez moi vidé, irritable et indisponible pour les miens",
          es: "A menudo — llego a casa como un cascarón vacío, irritable y hermético",
        },
      },
      {
        score: 3,
        label: {
          en: "Severe chronic depletion — strangers get my warmth, while my loved ones get my cold exhaustion",
          id: "Terkuras kronis parah — orang luar mendapatkan kehangatanku, sedangkan orang rumah hanya kebagian sisa lelahku",
          de: "Schwere chronische Erschöpfung — Fremde bekommen meine Geduld, meine Liebsten nur eiskalte Leere",
          fr: "Épuisement chronique sévère — les tiers ont ma chaleur, mes proches n'ont que mon silence froid",
          es: "Agotamiento crónico severo — los extraños reciben mi empatía y mis seres queridos solo mis sobras",
        },
      },
    ],
  },

  // Subscale 2: Cynicism & Callousness (Defensive Desensitization)
  {
    id: 5,
    subscale: "cynicism_callousness",
    prompt: {
      en: "I catch myself having callous, sarcastic, or cynical thoughts when people tell me their problems ('Here they go whining again').",
      id: "Aku mendapati diriku berpikiran sinis, sarkastik, atau acuh tak acuh saat orang menceritakan masalahnya ('Mulai lagi deh merengek').",
      de: "Ich ertappe mich bei zynischen oder herzlosen Gedanken, wenn Menschen mir Probleme schildern ('Schon wieder dieses Gejammer').",
      fr: "Je me surprends à avoir des pensées cyniques ou agacées face aux soucis des gens ('Et voilà, ça recommence à geindre').",
      es: "Me sorprendo teniendo pensamientos cínicos o despectivos cuando alguien me cuenta sus penas ('Ya viene otra vez con sus quejas').",
    },
    options: [
      {
        score: 0,
        label: {
          en: "Rarely or never — I maintain authentic warmth and non-judgmental respect",
          id: "Jarang atau tidak pernah — aku mempertahankan kehangatan tulus dan rasa hormat tanpa menghakimi",
          de: "Selten oder nie — mein Wohlwollen und Respekt bleiben aufrichtig",
          fr: "Rarement ou jamais — je garde une vraie bienveillance sans jugement",
          es: "Casi nunca — mantengo calidez genuina y respeto sin juzgar",
        },
      },
      {
        score: 1,
        label: {
          en: "Only with chronic complainers who refuse any constructive advice",
          id: "Hanya pada orang yang hobinya mengeluh berulang kali tanpa mau solusi",
          de: "Nur bei chronischen Nörglern ohne jeden Veränderungswillen",
          fr: "Seulement face aux éternels plaignants qui refusent toute solution",
          es: "Solo con quejicas crónicos que rechazan cualquier ayuda",
        },
      },
      {
        score: 2,
        label: {
          en: "Frequently — cynicism has become my default mental armor to avoid caring too much",
          id: "Sering — sinisme telah menjadi baju zirah mentalku agar tidak terlalu peduli",
          de: "Häufig — Zynismus ist mein Schutzschild geworden, um nicht zu viel zu fühlen",
          fr: "Souvent — le cynisme est devenu mon armure pour ne plus être touché",
          es: "A menudo — el cinismo es mi coraza mental para evitar involucrarme",
        },
      },
      {
        score: 3,
        label: {
          en: "Constant dark callousness — I feel disgusted by human weakness and emotional expressions",
          id: "Sikap dingin terus-menerus — aku merasa muak melihat kelemahan manusia dan ungkapan emosi orang lain",
          de: "Dauernde Verbitterung — menschliche Schwäche und Wehleidigkeit stoßen mich regelrecht ab",
          fr: "Dureté constante — la faiblesse et les épanchements des autres me dégoûtent",
          es: "Dureza permanente — la vulnerabilidad ajena me produce irritación y rechazo",
        },
      },
    ],
  },
  {
    id: 6,
    subscale: "cynicism_callousness",
    prompt: {
      en: "I feel numb or indifferent when hearing tragic news, as if my ability to be shocked or saddened has broken down.",
      id: "Aku merasa kebas atau datar saat mendengar kabar duka/tragedi, seolah kemampuanku untuk terkejut atau sedih sudah rusak.",
      de: "Schreckliche Nachrichten lassen mich kalt; meine Fähigkeit zu Trauer oder Erschütterung wirkt wie abgestellt.",
      fr: "Les tragédies me laissent de marbre, comme si ma capacité d'émotion s'était totalement émoussée.",
      es: "Las noticias trágicas me dejan indiferente, como si mi capacidad de asombro o duelo se hubiera roto.",
    },
    options: [
      {
        score: 0,
        label: {
          en: "Rarely — tragedy still touches my heart with healthy, proportionate sorrow",
          id: "Jarang — tragedi masih menyentuh hatiku dengan rasa duka yang wajar dan sehat",
          de: "Selten — menschliche Tragödien berühren mein Herz nach wie vor",
          fr: "Rarement — le malheur touche encore mon cœur avec une tristesse saine",
          es: "Casi nunca — las tragedias aún conmueven mi corazón con pena proporcionada",
        },
      },
      {
        score: 1,
        label: {
          en: "Mild desensitization to sensationalist social media headlines",
          id: "Hanya sedikit kebas terhadap judul berita media sosial yang sensasional",
          de: "Leichte Gewöhnung an reißerische Online-Schlagzeilen",
          fr: "Légère désensibilisation face aux gros titres sensationnalistes",
          es: "Leve acostumbramiento a los titulares sensacionalistas de internet",
        },
      },
      {
        score: 2,
        label: {
          en: "Frequently — I shrug my shoulders at catastrophes that used to bring me to tears",
          id: "Sering — aku hanya mengangkat bahu acuh pada tragedi yang dulunya membuatku menangis",
          de: "Häufig — Katastrophen, die mich früher weinen ließen, quittiere ich mit Achselzucken",
          fr: "Souvent — je hausse les épaules devant des drames qui m'auraient bouleversé jadis",
          es: "A menudo — me encojo de hombros ante desgracias que antes me hacían llorar",
        },
      },
      {
        score: 3,
        label: {
          en: "Total affective flatline — I feel like an ice statue watching a doomed world with zero emotion",
          id: "Mati rasa afektif total — aku merasa seperti patung es yang menyaksikan dunia tanpa setitik pun rasa",
          de: "Völlige emotionale Eiszeit — ich beobachte die Welt wie eine ungerührte Statue",
          fr: "Anesthésie absolue — je regarde le monde s'écrouler comme une statue de glace",
          es: "Anestesia total — contemplo el sufrimiento del mundo como una estatua de hielo",
        },
      },
    ],
  },
  {
    id: 7,
    subscale: "cynicism_callousness",
    prompt: {
      en: "I use dark, grim humor as an automatic deflection shield whenever painful or emotional topics arise.",
      id: "Aku menggunakan humor gelap (dark jokes) sebagai tameng otomatis setiap kali topik emosional atau menyakitkan muncul.",
      de: "Ich flüchte mich in zynischen Galgenhumor, sobald schmerzhafte oder gefühlsbetonte Themen aufkommen.",
      fr: "Je dégaine un humour noir ou sarcastique dès qu'un sujet douloureux ou sensible est abordé.",
      es: "Recurro al humor negro o sarcástico como escudo automático cuando surgen temas delicados.",
    },
    options: [
      {
        score: 0,
        label: {
          en: "Rarely — I can hold serious, respectful space without mocking the pain",
          id: "Jarang — aku bisa menemani suasana serius dan hormat tanpa meremehkan rasa sakit",
          de: "Selten — ich kann Schmerz ernst und würdevoll aushalten",
          fr: "Rarement — je sais accueillir la gravité sans ironie déplacée",
          es: "Casi nunca — sé sostener momentos serios sin burlarme del dolor",
        },
      },
      {
        score: 1,
        label: {
          en: "Occasionally to lighten tension among colleagues in stressful professions",
          id: "Sesekali hanya untuk mencairkan suasana di antara rekan kerja yang sedang stres",
          de: "Gelegentlich zur kurzen Entlastung unter Kollegen",
          fr: "Parfois pour détendre l'atmosphère entre collègues sous pression",
          es: "Ocasionalmente para aliviar tensión en el trabajo",
        },
      },
      {
        score: 2,
        label: {
          en: "Frequently — if I don't laugh cynically, I feel like I might break down and cry",
          id: "Sering — jika aku tidak menertawakannya dengan sinis, aku takut akan ambruk menangis",
          de: "Häufig — wenn ich nicht zynisch lache, drohe ich in Tränen auszubrechen",
          fr: "Souvent — si je n'en ris pas avec cynisme, je risque de m'effondrer en larmes",
          es: "A menudo — si no me río con ironía, siento que me derrumbaría a llorar",
        },
      },
      {
        score: 3,
        label: {
          en: "Compulsive mockery — genuine sincere emotional expression feels alien and irritating",
          id: "Mengejek secara kompulsif — ungkapan emosi tulus terasa aneh dan menyebalkan bagiku",
          de: "Zwangsweiser Spott — aufrichtige Gefühle wirken auf mich lächerlich und peinlich",
          fr: "Dérision compulsive — la sincérité affective m'agace et me met mal à l'aise",
          es: "Burla compulsiva — las muestras de afecto genuino me parecen ridículas y molestas",
        },
      },
    ],
  },
  {
    id: 8,
    subscale: "cynicism_callousness",
    prompt: {
      en: "I question whether anyone is truly good or if everyone is just selfishly angling for emotional validation and favors.",
      id: "Aku meragukan apakah ada orang yang benar-benar tulus, ataukah semua orang hanya mencari validasi ego dan keuntungan sendiri.",
      de: "Ich zweifle daran, dass Menschen uneigennützig handeln; jeder sucht doch nur Bestätigung oder Vorteile.",
      fr: "Je doute qu'il existe des gens sincèrement bons ; chacun ne cherche que son intérêt ou des flatteries.",
      es: "Dudo de que exista la bondad genuina; creo que todos actúan por egoísmo o conveniencia.",
    },
    options: [
      {
        score: 0,
        label: {
          en: "Disagree — I have deep faith in human kindness, generosity, and altruism",
          id: "Tidak setuju — aku memiliki keyakinan mendalam pada kebaikan, kemurahan hati, dan ketulusan manusia",
          de: "Trifft nicht zu — ich glaube fest an das Gute und Aufrichtige im Menschen",
          fr: "Pas d'accord — j'ai une confiance profonde en la générosité et l'altruisme",
          es: "En desacuerdo — creo firmemente en la bondad y el altruismo de las personas",
        },
      },
      {
        score: 1,
        label: {
          en: "Mild healthy skepticism regarding politicians or influencers",
          id: "Hanya skeptisisme sehat yang wajar terhadap politisi atau influencer medsos",
          de: "Gesunde Skepsis gegenüber Medien und Selbstdarstellern",
          fr: "Un scepticisme lucide envers les personnalités publiques",
          es: "Escepticismo prudente ante figuras públicas o redes sociales",
        },
      },
      {
        score: 2,
        label: {
          en: "Frequently — I automatically look for the hidden selfish motive behind every kind deed",
          id: "Sering — aku otomatis mencari motif tersembunyi yang egois di balik setiap perbuatan baik",
          de: "Häufig — ich suche instinktiv den egoistischen Haken hinter jeder Nettigkeit",
          fr: "Souvent — je cherche d'instinct le mobile égoïste derrière chaque gentillesse",
          es: "A menudo — busco el motivo oculto o interesado detrás de cada gesto amable",
        },
      },
      {
        score: 3,
        label: {
          en: "Pervasive bitter misanthropy — I believe humanity is fundamentally irredeemable and hollow",
          id: "Misanthropi akut — aku meyakini manusia pada dasarnya egois, munafik, dan tidak bisa diperbaiki",
          de: "Tiefer Misanthropismus — die Menschheit halte ich im Grunde für verloren und verlogen",
          fr: "Misanthropie totale — l'humanité me semble irrémédiablement hypocrite et vaine",
          es: "Misanthropía radical — considero a la humanidad irremediablemente hipócrita y egoísta",
        },
      },
    ],
  },

  // Subscale 3: Vicarious Trauma & Somatic Exhaustion (Secondary Traumatic Stress)
  {
    id: 9,
    subscale: "vicarious_trauma",
    prompt: {
      en: "I experience intrusive images, nightmares, or looping thoughts about traumatic stories I heard from others.",
      id: "Aku mengalami kilasan ingatan, mimpi buruk, atau pikiran berputar mengenai cerita trauma atau derita yang kudengar dari orang lain.",
      de: "Mich verfolgen Albträume, Flashbacks oder Gedankenschleifen über das Leid, das mir andere anvertraut haben.",
      fr: "J'ai des cauchemars, des images intrusives ou des pensées en boucle sur les récits traumatiques que j'ai entendus.",
      es: "Tengo pesadillas, imágenes intrusivas o pensamientos obsesivos sobre el sufrimiento que otros me contaron.",
    },
    options: [
      {
        score: 0,
        label: {
          en: "Never or rarely — I leave work/relational problems where they belong and sleep peacefully",
          id: "Tidak pernah atau jarang — aku meninggalkan masalah kerja/relasi di tempatnya dan tidur nyenyak",
          de: "Nie oder selten — ich kann fremden Kummer loslassen und schlafe ruhig",
          fr: "Jamais ou rarement — je laisse les problèmes à leur place et dors sereinement",
          es: "Nunca o casi nunca — dejo los problemas ajenos fuera y duermo en paz",
        },
      },
      {
        score: 1,
        label: {
          en: "Only after hearing something unusually horrifying",
          id: "Hanya sesekali setelah mendengar peristiwa yang luar biasa mengerikan",
          de: "Nur nach extrem verstörenden Einzelfällen",
          fr: "Uniquement après avoir entendu un fait particulièrement choquant",
          es: "Solo tras escuchar algún relato excepcionalmente estremecedor",
        },
      },
      {
        score: 2,
        label: {
          en: "Several nights a week — other people's crises bleed into my sleep and waking downtime",
          id: "Beberapa malam dalam seminggu — krisis orang lain menyusup ke dalam tidur dan waktu istirahatku",
          de: "Mehrmals die Woche — das Leid anderer stört meinen Schlaf und meine Freizeit",
          fr: "Plusieurs nuits par semaine — les drames d'autrui hantent mes temps de repos",
          es: "Varias noches por semana — las crisis de otros se cuelan en mis sueños y descanso",
        },
      },
      {
        score: 3,
        label: {
          en: "Severe secondary traumatic stress — haunted by vicarious suffering, hypervigilant and insomniac",
          id: "Stres trauma sekunder yang parah — dihantui penderitaan orang lain, insomnia, dan selalu siaga panik",
          de: "Schwerer sekundärer Traumastress — schlaflos, schreckhaft und von fremdem Schmerz heimgesucht",
          fr: "Traumatisme secondaire sévère — hanté par la souffrance indirecte, hypervigilant et insomniaque",
          es: "Estrés traumático secundario grave — hipervigilante, con insomnio y perseguido por el dolor ajeno",
        },
      },
    ],
  },
  {
    id: 10,
    subscale: "vicarious_trauma",
    prompt: {
      en: "I feel physical symptoms (nausea, throat lump, palpitations, stomach knots) while listening to someone's distress.",
      id: "Aku merasakan gejala fisik (mual, tenggorokan tercekik, jantung berdebar, perut melilit) saat mendengarkan kesusahan orang.",
      de: "Ich spüre Übelkeit, Herzrasen oder Magendruck, während ich mir die Not eines anderen anhöre.",
      fr: "Je ressens des symptômes physiques (nausée, boule à la gorge, palpitations) en écoutant la détresse d'autrui.",
      es: "Siento síntomas físicos (náuseas, nudo en la garganta, taquicardia) mientras escucho el sufrimiento de alguien.",
    },
    options: [
      {
        score: 0,
        label: {
          en: "Rarely — my somatic system stays grounded and calm while supporting others",
          id: "Jarang — tubuh fisikku tetap tenang dan stabil saat menemani orang lain",
          de: "Selten — mein Körper bleibt geerdet und stabil beim Trösten",
          fr: "Rarement — mon corps reste posé et ancré lorsque je soutiens un tiers",
          es: "Casi nunca — mi cuerpo se mantiene en calma y centrado al acompañar",
        },
      },
      {
        score: 1,
        label: {
          en: "Mild fleeting tension during intense emergencies",
          id: "Hanya sedikit ketegangan sekilas saat situasi darurat yang mendesak",
          de: "Kurze leichte Anspannung in akuten Notsituationen",
          fr: "Une brève tension passagère lors d'urgences réelles",
          es: "Tensión leve y pasajera solo ante emergencias reales",
        },
      },
      {
        score: 2,
        label: {
          en: "Frequently — my body mimics their distress with visceral stomach aches or chest tightness",
          id: "Sering — tubuhku meniru penderitaan mereka dengan sakit perut melilit atau sesak dada",
          de: "Häufig — mein Körper spiegelt fremde Not mit Magenschmerzen oder Engegefühl wider",
          fr: "Souvent — mon corps mime leur douleur par des crampes digestives ou un nœud thoracique",
          es: "A menudo — mi cuerpo somatiza su angustia con dolor de estómago o presión en el pecho",
        },
      },
      {
        score: 3,
        label: {
          en: "Extreme somatic contagion — listening to pain makes me physically dizzy, nauseous, or ill",
          id: "Penularan somatis ekstrem — mendengarkan kesedihan membuatku pusing berputar, mual, atau jatuh sakit",
          de: "Extreme somatische Ansteckung — fremdes Leid macht mich buchstäblich schwindelig und krank",
          fr: "Contagion somatique extrême — entendre la détresse me rend physiquement malade et fébrile",
          es: "Contagio somático extremo — escuchar dolor me provoca náuseas, mareos o indisposición física",
        },
      },
    ],
  },
  {
    id: 11,
    subscale: "vicarious_trauma",
    prompt: {
      en: "I feel chronic physical exhaustion that sleep, coffee, or weekend vacations fail to fix.",
      id: "Aku merasakan kelelahan fisik menahun yang tidak kunjung hilang meski sudah tidur lama, ngopi, atau libur akhir pekan.",
      de: "Ich leide an chronischer Erschöpfung, die sich weder durch Schlaf noch durch Urlaub bessert.",
      fr: "Je ressens une fatigue physique et morale profonde que ni le sommeil ni les vacances ne parviennent à effacer.",
      es: "Siento un cansancio crónico que ni el sueño, ni el café ni las vacaciones logran reparar.",
    },
    options: [
      {
        score: 0,
        label: {
          en: "Disagree — a solid night of rest reliably replenishes my energy",
          id: "Tidak setuju — tidur malam yang nyenyak selalu memulihkan energiku dengan baik",
          de: "Trifft nicht zu — erholsamer Schlaf stellt meine Kraft verlässlich wieder her",
          fr: "Pas d'accord — une bonne nuit de sommeil me ressource pleinement",
          es: "En desacuerdo — una noche de buen descanso repone mi energía con normalidad",
        },
      },
      {
        score: 1,
        label: {
          en: "Occasional tired mornings after busy deadlines",
          id: "Hanya sesekali bangun lelah setelah lembur kejar target",
          de: "Gelegentlich müde nach intensiven Arbeitsphasen",
          fr: "Parfois fatigué après des semaines de charrette",
          es: "Ocasionalmente cansado tras picos de trabajo",
        },
      },
      {
        score: 2,
        label: {
          en: "Frequently — I wake up tired regardless of hours in bed; my bone-deep marrow feels drained",
          id: "Sering — aku bangun dalam keadaan lelah berapa jam pun tidur; sumsum tulangku terasa terkuras",
          de: "Häufig — ich wache wie erschlagen auf; die Erschöpfung sitzt tief in den Knochen",
          fr: "Souvent — je me réveille épuisé quel que soit mon temps de sommeil ; ma moelle est vidée",
          es: "A menudo — despierto agotado duerma lo que duerma; siento el cansancio en los huesos",
        },
      },
      {
        score: 3,
        label: {
          en: "Total systemic exhaustion — living with a depleted adrenal system and non-restorative sleep",
          id: "Kelelahan sistemik total — hidup dengan sistem adrenal yang kering kerontang dan tidur tanpa rasa pulih",
          de: "Totale systemische Erschöpfung — die Nebennieren sind ausgebrannt, jeder Tag ist ein Kraftakt",
          fr: "Effondrement systémique complet — système surrénalien à sec, sommeil stérile et fatigue de plomb",
          es: "Agotamiento sistémico total — sistema suprarrenal desfondado y fatiga incapacitante",
        },
      },
    ],
  },
  {
    id: 12,
    subscale: "vicarious_trauma",
    prompt: {
      en: "I feel that if I step back or say 'No' to caring for people, someone will suffer terribly or even die, and it will be my fault.",
      id: "Aku merasa jika aku mundur atau berkata 'Tidak' untuk menolong orang, orang itu akan celaka atau menderita, dan itu salahku.",
      de: "Ich fürchte: Wenn ich mich zurückziehe oder 'Nein' sage, geschieht ein Unglück und ich bin schuld daran.",
      fr: "J'ai l'angoisse terrible que si je dis 'Non' ou si je lâche prise, une catastrophe se produira par ma faute.",
      es: "Siento que si doy un paso atrás o digo 'No' a cuidar de alguien, esa persona sufrirá una catástrofe por mi culpa.",
    },
    options: [
      {
        score: 0,
        label: {
          en: "Disagree — I trust adults to manage their lives and access community support",
          id: "Tidak setuju — aku mempercayai orang dewasa untuk mengurus hidup mereka dan mencari bantuan mandiri",
          de: "Trifft nicht zu — ich traue Erwachsenen zu, ihr Leben und Hilfen selbst zu organisieren",
          fr: "Pas d'accord — je fais confiance aux adultes pour se responsabiliser et trouver de l'aide",
          es: "En desacuerdo — confío en que los adultos pueden asumir su vida y buscar recursos",
        },
      },
      {
        score: 1,
        label: {
          en: "Only regarding dependent minor children or elderly parents",
          id: "Hanya terbatas pada anak kecil yang bergantung padaku atau orang tua yang lansia",
          de: "Nur gegenüber kleinen Kindern oder hilflosen Eltern",
          fr: "Uniquement envers des enfants en bas âge ou des parents dépendants",
          es: "Solo respecto a hijos pequeños o ancianos bajo mi tutela",
        },
      },
      {
        score: 2,
        label: {
          en: "Frequently — I take omnipotent, irrational responsibility for other competent adults' survival",
          id: "Sering — aku memikul tanggung jawab berlebihan dan tidak rasional atas keselamatan orang dewasa lain",
          de: "Häufig — ich übernehme irrationale Allmachtsverantwortung für mündige Menschen",
          fr: "Souvent — j'endosse une responsabilité quasi divine et écrasante pour des adultes capables",
          es: "A menudo — asumo una responsabilidad desmedida sobre el destino de otros adultos",
        },
      },
      {
        score: 3,
        label: {
          en: "Severe savior hostage — trapped by terror that my boundaries will cause someone's tragedy",
          id: "Tersandera peran penyelamat parah — terpenjara oleh ketakutan bahwa batas diriku akan menyebabkan tragedi orang lain",
          de: "Geisel des Retterwahns — gefangen in der Panik, dass meine Grenzen das Verderben anderer bedeuten",
          fr: "Otage du complexe du sauveur — terrifié à l'idée que poser une limite provoque une tragédie",
          es: "Rehén del complejo de salvador — aterrorizado de que poner un límite provoque una tragedia ajena",
        },
      },
    ],
  },
];

export const COMPASSION_FATIGUE_ARCHETYPES: Record<
  CompassionFatigueArchetype["level"],
  CompassionFatigueArchetype
> = {
  vital_empathic_anchor: {
    level: "vital_empathic_anchor",
    badge: {
      en: "Vital Empathic Anchor",
      id: "Jangkar Empati Sehat",
      de: "Lebendiger mitfühlender Anker",
      fr: "Ancre Empathique Vivante",
      es: "Ancla Empática y Vital",
    },
    title: {
      en: "The Sustainable Caregiver",
      id: "Sang Penolong Berkelanjutan",
      de: "Der nachhaltige Helfer",
      fr: "Le Soignant Équilibré",
      es: "El Cuidador Sostenible",
    },
    tagline: {
      en: "You care deeply without drowning; your emotional boundaries protect your vital flame.",
      id: "Kamu peduli mendalam tanpa tenggelam; batasan emosimu menjaga api kehidupanmu tetap menyala.",
      de: "Sie fühlen tief mit, ohne zu ertrinken; Ihre Grenzen schützen Ihr seelisches Feuer.",
      fr: "Vous donnez avec cœur sans vous noyer ; vos limites préservent votre énergie vitale.",
      es: "Sientes con profundidad sin ahogarte; tus límites protegen tu fuego interior.",
    },
    description: {
      en: "Your score reflects healthy, sustainable empathy. You possess the emotional maturity to hold loving presence for suffering without taking on other people's pain into your physical marrow. You practice self-care without shame and know when to step back.",
      id: "Skormu mencerminkan empati yang sehat dan berkelanjutan. Kamu memiliki kedewasaan batin untuk hadir bagi orang yang susah tanpa membiarkan rasa sakit mereka meracuni tubuhmu. Kamu merawat diri tanpa rasa bersalah dan tahu kapan harus mundur.",
      de: "Ihr Ergebnis zeigt gesunde, tragfähige Empathie. Sie begleiten Leid mit offenem Herzen, ohne es in Ihre eigenen Knochen sickern zu lassen. Sie tanken ohne Schuldgefühle auf.",
      fr: "Votre score témoigne d'une empathie saine et pérenne. Vous soutenez sans vous sacrifier, préservant vos propres forces sans la moindre culpabilité.",
      es: "Tu resultado muestra una empatía sana y sostenible. Acompañas el sufrimiento ajeno sin cargarlo en tu espalda, recargando fuerzas sin culpa.",
    },
    psychologyInsight: {
      en: "Dr. Charles Figley, pioneer of compassion fatigue research, emphasizes: 'Compassion fatigue is the cost of caring. To care for others indefinitely, one must possess an impenetrable sanctuary of personal restoration.'",
      id: "Dr. Charles Figley, pelopor riset compassion fatigue, menegaskan: 'Kelelahan empati adalah harga dari kepedulian. Untuk dapat terus peduli pada sesama, seseorang harus memiliki tempat suci pemulihan pribadi yang kokoh.'",
      de: "Dr. Charles Figley betont: 'Compassion Fatigue ist der Preis des Helfens. Wer dauerhaft für andere dasein will, braucht eine unantastbare Oase der Selbstfürsorge.'",
      fr: "Le Dr Charles Figley rappelle que l'usure de compassion est le coût du don de soi. Pour durer, il faut sanctuariser un espace de ressourcement intouchable.",
      es: "El Dr. Charles Figley subraya que la fatiga por compasión es el precio de cuidar. Para sostener a otros, debes proteger tu propio santuario de paz.",
    },
    actionProtocols: {
      en: [
        "Continue setting explicit conversational boundaries when feeling your bandwidth dip.",
        "Practice evening debriefing in Nuju to release the residual emotional dust of the day.",
        "Model healthy limits for peers in high-caregiver professions.",
      ],
      id: [
        "Lanjutkan menetapkan batasan obrolan saat energimu mulai terasa turun.",
        "Lakukan debriefing malam di Nuju untuk membuang sisa-sisa residu emosi harian.",
        "Jadilah teladan batasan sehat bagi teman-teman yang berprofesi sebagai perawat/pendidik.",
      ],
      de: [
        "Gesprächsgrenzen weiter klar ziehen, sobald die eigene Energie sinkt.",
        "Abendliches Reflektieren in Nuju nutzen, um emotionale Altlasten abzustreifen.",
        "Als Vorbild für gesunde Grenzen in helfenden Berufen wirken.",
      ],
      fr: [
        "Poursuivre la pose de limites claires dès que votre jauge d'énergie baisse.",
        "Déposer les résidus affectifs de la journée dans Nuju chaque soir.",
        "Inspirer vos collègues en montrant qu'aider n'exige pas de s'immoler.",
      ],
      es: [
        "Seguir marcando límites claros cuando notes que tu energía disminuye.",
        "Cerrar la jornada con un breve vaciado en Nuju para soltar residuos emocionales.",
        "Ser un referente de límites saludables en entornos de ayuda.",
      ],
    },
    dailyAffirmation: {
      en: "My boundaries protect my compassion. When my cup overflows, everyone is blessed.",
      id: "Batasanku melindungi empatiku. Saat cangkir jiwaku penuh melimpah, semua orang terberkati.",
      de: "Meine Grenzen schützen meine Liebe. Nur wenn mein Becher voll ist, kann ich schenken.",
      fr: "Mes limites protègent ma compassion. C'est quand ma coupe déborde que je peux nourrir autrui.",
      es: "Mis límites protegen mi compasión. Solo si mi copa desborda puedo nutrir a los demás.",
    },
  },

  strained_caregiver_sponge: {
    level: "strained_caregiver_sponge",
    badge: {
      en: "Strained Caregiver Sponge",
      id: "Spons Empati Kewalahan",
      de: "Überlasteter Gefühlsschwamm",
      fr: "Éponge Empathique Sous Tension",
      es: "Esponja Emocional Saturada",
    },
    title: {
      en: "The Porous Supporter",
      id: "Sang Penolong Berpori",
      de: "Der durchlässige Tröster",
      fr: "Le Soutien Perméable",
      es: "El Acompañante Permeable",
    },
    tagline: {
      en: "You absorb other people's storms; evening exhaustion and subtle resentment are creeping in.",
      id: "Kamu menyerap badai emosi orang lain; lelah malam hari dan rasa dongkol mulai merayap.",
      de: "Sie saugen fremde Stürme auf; Abenderschöpfung und leiser Groll schleichen sich ein.",
      fr: "Vous épongez les tempêtes d'autrui ; l'épuisement et un soupçon d'amertume s'installent.",
      es: "Absorbes las tormentas ajenas; el agotamiento nocturno y el rencor sutil asoman.",
    },
    description: {
      en: "Your score shows early-stage compassion fatigue. You are everyone's listening ear and crisis advisor, but your emotional membranes are permeable. You find yourself feeling depleted, irritable after long calls, and harboring guilty twinges of cynicism.",
      id: "Skormu menunjukkan tahap awal kelelahan empati (compassion fatigue). Kamu adalah pendengar setia dan penasihat darurat bagi semua orang, namun membran emosimu terlalu berpori. Kamu merasa terkuras, mudah kesal sehabis telepon panjang, dan mulai sinis.",
      de: "Ihr Ergebnis zeigt beginnende Mitgefühlserschöpfung. Sie sind für jeden da, doch Ihre seelischen Filter sind porös. Sie fühlen sich nach Telefonaten zermürbt und reagieren gereizt.",
      fr: "Votre score révèle un début d'usure de compassion. Vous écoutez tout le monde, mais vos filtres sont perméables. Vous finissez les appels lessivé et ressentez une pointe d'agacement.",
      es: "Tu resultado muestra un inicio de fatiga por compasión. Eres el confidente de todos, pero tus filtros son frágiles. Terminas las llamadas agotado y con frustración.",
    },
    psychologyInsight: {
      en: "Neuroscience reveals that mirror neurons can trigger autonomic burnout if not counterbalanced by intentional cognitive reappraisal and somatic discharging rituals.",
      id: "Ilmu saraf membuktikan bahwa neuron cermin (mirror neurons) dapat memicu burnout otonom jika tidak diimbangi dengan regulasi kognitif sadar dan ritual pelepasan ketegangan somatis.",
      de: "Die Hirnforschung zeigt: Spiegelneuronen können das autonome Nervensystem überlasten, wenn emotionale Abgrenzung und körperliches Entladen fehlen.",
      fr: "Les neurosciences rappellent que les neurones miroirs peuvent saturer le système nerveux sans sas de décompression somatique.",
      es: "La neurociencia advierte que las neuronas espejo pueden sobrecargar el sistema nervioso si no hay rituales de desconexión corporal.",
    },
    actionProtocols: {
      en: [
        "Implement the 15-Minute Rule: Limit casual venting calls to 15 minutes before gently transitioning off the phone.",
        "Somatic Water Rinse: Wash your hands with cold water after listening to heavy problems to symbolically wash off the emotional residue.",
        "Vent your secret irritation into Nuju's private voice notes before talking to family.",
      ],
      id: [
        "Terapkan Aturan 15 Menit: Batasi sesi mendengarkan curhat maksimal 15 menit sebelum pamit secara sopan.",
        "Basuh Tangan dengan Air Mengalir: Cuci tangan dan wajah dengan air dingin sehabis mendengarkan masalah berat sebagai simbol pelepasan energi.",
        "Tumpahkan rasa kesalmu di voice note Nuju sebelum menyapa keluarga di rumah.",
      ],
      de: [
        "Die 15-Minuten-Regel: Klagegespräche freundlich auf 15 Minuten begrenzen.",
        "Hände kalt abspülen: Nach schweren Gesprächen Hände waschen als somatisches Ritual des Loslassens.",
        "Ärger erst im privaten Nuju-Sprachtagebuch abladen, ehe man die Familie betritt.",
      ],
      fr: [
        "La règle des 15 minutes : Écourter avec douceur les appels de jérémiades après un quart d'heure.",
        "Rinçage somatique : Se passer les mains sous l'eau froide pour 'laver' les charges captées.",
        "Déposer son agacement dans le journal vocal Nuju avant de retrouver ses proches.",
      ],
      es: [
        "Regla de los 15 minutos: Pon fin con tacto a llamadas de quejas tras un cuarto de hora.",
        "Lavado somático: Lávate las manos con agua fresca tras escuchar problemas para soltar la carga.",
        "Descarga tu frustración en las notas de voz de Nuju antes de atender a tu familia.",
      ],
    },
    dailyAffirmation: {
      en: "I am a companion to their journey, not a savior carrying their backpack.",
      id: "Aku adalah teman seperjalanan mereka, bukan penyelamat yang harus memikul ransel beban mereka.",
      de: "Ich bin Weggefährte, kein Träger ihres Lebensrucksacks.",
      fr: "Je suis un compagnon de route, pas le porteur de leur sac à dos.",
      es: "Soy un compañero de camino, no el porteador de su mochila.",
    },
  },

  compassion_fatigued_sentinel: {
    level: "compassion_fatigued_sentinel",
    badge: {
      en: "Compassion-Fatigued Sentinel",
      id: "Penjaga Kelelahan Empati",
      de: "Erschöpfter Mitgefühls-Wächter",
      fr: "Sentinelle en Usure Empathique",
      es: "Centinela con Fatiga de Compasión",
    },
    title: {
      en: "The Burned-Out Rescuer",
      id: "Penyelamat yang Terbakar",
      de: "Der ausgebrannte Retter",
      fr: "Le Sauveteur Éreinté",
      es: "El Rescatador Quemado",
    },
    tagline: {
      en: "You have given until empty; cynicism, irritability, and dark humor are now your only armor.",
      id: "Kamu telah memberi hingga habis; sinisme, mudah tersinggung, dan dark jokes menjadi tameng terakhirmu.",
      de: "Sie haben sich leergegeben; Zynismus, Gereiztheit und Galgenhumor sind Ihre Rüstung.",
      fr: "Vous avez donné jusqu'à la dernière goutte ; le cynisme et l'ironie mordante sont vos remparts.",
      es: "Te has vaciado por completo; el cinismo, la queja interna y la ironía son tu escudo.",
    },
    description: {
      en: "Your score indicates pronounced compassion fatigue. Your empathic reserves are bankrupt. To protect yourself from further pain, your subconscious has developed a thick shell of cynicism, numbness to bad news, and sharp resentment toward anyone demanding your emotional presence.",
      id: "Skormu menandakan kelelahan empati tingkat berat. Cadangan energimu sudah bangkrut. Demi melindungimu dari kepedihan lebih lanjut, alam bawah sadarmu membentuk perisai tebal berupa sinisme, mati rasa pada kabar buruk, dan kejengkelan mendalam.",
      de: "Ihr Ergebnis belegt ausgeprägte Mitgefühlserschöpfung. Ihre Reserven sind aufgebraucht. Zum Selbstschutz reagieren Sie mit Zynismus, Abstumpfung und Abwehr gegen fremde Nähe.",
      fr: "Votre score révèle une usure avancée. Vos réserves sont à sec. Pour survivre, votre esprit s'est cuirassé de cynisme, d'indifférence feinte et d'un rejet viscéral des demandes d'aide.",
      es: "Tu resultado denota una fatiga por compasión notable. Tus reservas están agotadas. Para protegerte, tu psique ha levantado un muro de cinismo, apatía e irritabilidad.",
    },
    psychologyInsight: {
      en: "Christina Maslach's research on burnout proves that depersonalization and cynicism are not character flaws—they are the psychological immune system's emergency attempts to create distance when exhaustion is ignored.",
      id: "Riset Christina Maslach tentang burnout membuktikan bahwa depersonalisasi dan sinisme bukanlah cacat moral—melainkan upaya darurat sistem imun psikologis untuk menciptakan jarak saat sinyal lelah diabaikan.",
      de: "Christina Maslach zeigt: Zynismus und Distanzierung sind keine Charakterschwäche, sondern der Notfallversuch der Seele, Abstand zu schaffen, wenn Grenzen fehlen.",
      fr: "Les travaux de Christina Maslach prouvent que le cynisme n'est pas un défaut moral, mais un réflexe défensif d'urgence face au surmenage affectif.",
      es: "Las investigaciones de Christina Maslach demuestran que el cinismo no es maldad, sino una alarma biológica desesperada para tomar distancia.",
    },
    actionProtocols: {
      en: [
        "Go on an Empathy Sabbatical: Declare a 7-day moratorium on offering advice or listening to non-emergency venting.",
        "Nature Re-Centering: Spend 30 minutes in a park or forest without phone calls, re-attuning to non-human life.",
        "Daily Physiological Sighs: Practice 3 cycles of double-inhale, extended exhale to down-regulate your sympathetic drive.",
      ],
      id: [
        "Cuti Empati 7 Hari: Ambil moratorium 7 hari untuk tidak memberi nasihat atau mendengarkan curhat yang tidak darurat.",
        "Re-Centering di Alam: Duduk 30 menit di taman atau bawah pohon tanpa HP, terhubung kembali dengan alam.",
        "Lakukan Physiological Sigh: 3 siklus tarikan napas ganda lewat hidung dan hembusan panjang lewat mulut untuk meredakan saraf simpatik.",
      ],
      de: [
        "7 Tage Mitgefühls-Pause: Eine Woche lang bewusst keine Seelentröster-Dienste anbieten.",
        "Natur-Rückzug: 30 Minuten im Wald oder Park ohne Handy spazieren, um die Sinne zu lüften.",
        "Physiological Sighs: Dreimal doppelt einatmen und lang seufzen, um das Nervensystem zu beruhigen.",
      ],
      fr: [
        "Cure de silence empathique : 7 jours de repos total sans écouter aucune doléance non vitale.",
        "Immersion nature : 30 minutes en forêt ou au parc sans écran pour se reconnecter au calme.",
        "Soupir physiologique : 3 cycles de double inspiration et expiration prolongée pour apaiser le cœur.",
      ],
      es: [
        "Año sabático de empatía de 7 días: Cero consejos y cero quejas ajenas durante una semana.",
        "Reconexión con la naturaleza: 30 minutos en un parque sin teléfono para oxigenar el alma.",
        "Suspiro fisiológico: 3 repeticiones de doble inhalación y exhalación larga para calmar el sistema.",
      ],
    },
    dailyAffirmation: {
      en: "I give myself permission to turn off the light. I am allowed to rest in the quiet dark.",
      id: "Aku mengizinkan diriku mematikan lampu tugas. Aku berhak beristirahat dalam keheningan yang tenang.",
      de: "Ich erlaube mir, das Licht zu löschen. Ich darf mich in stiller Dunkelheit erholen.",
      fr: "Je m'autorise à éteindre la lumière. J'ai le droit de me reposer dans la quiétude.",
      es: "Me doy permiso para apagar la luz. Tengo derecho a reposar en el silencio.",
    },
  },

  secondary_traumatic_collapse: {
    level: "secondary_traumatic_collapse",
    badge: {
      en: "Secondary Traumatic Collapse",
      id: "Kolaps Trauma Sekunder Akut",
      de: "Sekundärer Traumakollaps",
      fr: "Effondrement Traumatique Secondaire",
      es: "Colapso por Trauma Secundario",
    },
    title: {
      en: "The Broken Sanctuary",
      id: "Sang Penjaga yang Runtuh",
      de: "Das gebrochene Heiligtum",
      fr: "Le Sanctuaire Brisé",
      es: "El Santuario Quebrado",
    },
    tagline: {
      en: "Severe vicarious trauma, intrusive nightmares, bone-marrow exhaustion, and visceral dread.",
      id: "Trauma sekunder parah, mimpi buruk terus-menerus, kelelahan sumsum tulang, dan panik fisik.",
      de: "Schwerer sekundärer Traumastress, Albträume, markerschütternde Erschöpfung und Panik.",
      fr: "Traumatisme vicariant sévère, cauchemars récurrents, épuisement viscéral et détresse.",
      es: "Trauma vicario severo, pesadillas intrusivas, fatiga medular y angustia visceral.",
    },
    description: {
      en: "Your score reflects acute secondary traumatic stress and somatic collapse. Hearing, witnessing, or absorbing other people's trauma has overwhelmed your nervous system's capacity to detoxify. You suffer from intrusive images, severe insomnia, visceral panic, and complete emotional bankruptcy.",
      id: "Skormu mencerminkan stres trauma sekunder akut dan keruntuhan fisik batin. Mendengarkan, menyaksikan, atau menyerap trauma orang lain telah melampaui kemampuan detoksifikasi sistem sarafmu. Kamu menderita kilasan mimpi buruk, insomnia parah, dan kebangkrutan emosi total.",
      de: "Ihr Ergebnis zeigt schweren sekundären Traumastress. Das Mitleiden hat Ihre neuronale Verarbeitungskapazität gesprengt. Sie leiden unter Albträumen, Panikattacken und totaler Erschöpfung.",
      fr: "Votre score révèle un traumatisme vicariant aigu et un effondrement physique. Porter les douleurs du monde a saturé vos circuits. Vous endurez cauchemars, angoisses et un épuisement absolu.",
      es: "Tu resultado denota un colapso por trauma vicario agudo. Cargar con el dolor ajeno ha destrozado tu capacidad de regulación. Padeces insomnio, imágenes invasivas y quiebre total.",
    },
    psychologyInsight: {
      en: "Vicarious traumatization alters the caregiver's cognitive schemas of safety, trust, and control. Recovery requires strict medical boundaries, somatic trauma reprocessing (EMDR, SE), and total cessation of caretaking demands.",
      id: "Traumatisasi vikarius merusak peta kognitif tentang rasa aman, kepercayaan, dan kendali diri. Pemulihannya menuntut batasan medis yang ketat, terapi pemrosesan trauma somatis (EMDR/SE), dan penghentian total peran sebagai penyelamat.",
      de: "Sekundäre Traumatisierung erschüttert das Urvertrauen in die Welt. Genesung verlangt strikte Ruhe, traumatherapeutische Entlastung (EMDR, SE) und das sofortige Einstellen von Helferrollen.",
      fr: "Le traumatisme secondaire altère les repères de sécurité fondamentale. Guérir exige un arrêt complet des sollicitations, du repos et un suivi spécialisé (EMDR, SE).",
      es: "El trauma vicario distorsiona el sentido básico de seguridad. Sanar requiere frenar en seco el rol de cuidador y recurrir a reprocesamiento somático (EMDR o SE).",
    },
    actionProtocols: {
      en: [
        "Immediate Medical Retreat: Step back from all non-essential caregiving commitments immediately.",
        "Consult Trauma Specialist: Seek professional support from a licensed therapist trained in vicarious traumatization.",
        "Sensory Seclusion: Spend evenings in dim light with zero news, social media, or emotional dramas.",
      ],
      id: [
        "Cuti Pemulihan Darurat: Mundur dari seluruh komitmen menolong atau mendengarkan masalah orang lain segera.",
        "Konsultasikan ke Spesialis Trauma: Temui psikolog atau psikiater berlisensi dengan keahlian trauma sekunder.",
        "Isolasi Sensorik Menenangkan: Habiskan malam dalam cahaya redup tanpa berita, media sosial, atau drama emosi apa pun.",
      ],
      de: [
        "Sofortiger Notfall-Rückzug: Alle Helferpflichten und seelischen Beratungen augenblicklich einstellen.",
        "Traumafachkraft hinzuziehen: Begleitung durch Therapeuten für sekundäre Traumatisierung suchen.",
        "Reizabschirmung: Abende bei sanftem Licht ohne Nachrichten, Social Media oder Dramen verbringen.",
      ],
      fr: [
        "Mise en retrait urgente : Stopper immédiatement tout engagement d'aide bénévole ou d'écoute.",
        "Consulter un spécialiste du trauma : Être épaulé par un professionnel formé au trauma vicariant.",
        "Déconnexion sensorielle : Soirées en lumière tamisée sans écrans, sans actualités ni drames.",
      ],
      es: [
        "Retirada de emergencia: Cancela de inmediato cualquier compromiso de ayuda o escucha.",
        "Ayuda profesional experta: Acude a un terapeuta especializado en trauma vicario o EMDR.",
        "Aislamiento sensorial: Pasa las tardes en penumbra, sin noticias, redes sociales ni dramas ajenos.",
      ],
    },
    dailyAffirmation: {
      en: "I lay down the cross. I am not required to burn myself to keep the world warm.",
      id: "Kulepaskan beban salib ini. Aku tidak dituntut untuk membakar diriku sendiri demi menghangatkan dunia.",
      de: "Ich lege das fremde Kreuz ab. Ich muss mich nicht verbrennen, um die Welt zu wärmen.",
      fr: "Je dépose ce fardeau. Je n'ai pas à m'immoler pour réchauffer le monde.",
      es: "Suelto esta cruz ajena. No estoy obligado a quemarme para dar calor al mundo.",
    },
  },
};

export const calculateCompassionFatigueScore = (
  answers: Record<number, number>
): CompassionFatigueScoreResult => {
  let totalScore = 0;
  const subscaleScores = {
    empathic_depletion: 0,
    cynicism_callousness: 0,
    vicarious_trauma: 0,
  };

  COMPASSION_FATIGUE_QUESTIONS.forEach((q) => {
    const val = answers[q.id] ?? 0;
    totalScore += val;
    subscaleScores[q.subscale] += val;
  });

  const maxTotal = COMPASSION_FATIGUE_QUESTIONS.length * 3; // 36
  const percentage = Math.min(100, Math.round((totalScore / maxTotal) * 100));

  let level: CompassionFatigueArchetype["level"] = "vital_empathic_anchor";
  if (percentage >= 75) {
    level = "secondary_traumatic_collapse";
  } else if (percentage >= 50) {
    level = "compassion_fatigued_sentinel";
  } else if (percentage >= 25) {
    level = "strained_caregiver_sponge";
  }

  const maxPerSubscale = 4 * 3; // 12 points each
  const subscales = {
    empathic_depletion: {
      score: subscaleScores.empathic_depletion,
      percentage: Math.min(100, Math.round((subscaleScores.empathic_depletion / maxPerSubscale) * 100)),
    },
    cynicism_callousness: {
      score: subscaleScores.cynicism_callousness,
      percentage: Math.min(100, Math.round((subscaleScores.cynicism_callousness / maxPerSubscale) * 100)),
    },
    vicarious_trauma: {
      score: subscaleScores.vicarious_trauma,
      percentage: Math.min(100, Math.round((subscaleScores.vicarious_trauma / maxPerSubscale) * 100)),
    },
  };

  return {
    totalScore,
    percentage,
    level,
    profile: COMPASSION_FATIGUE_ARCHETYPES[level],
    subscales,
  };
};
