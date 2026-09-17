export type ToxicIndependenceLang = "en" | "id" | "de" | "fr" | "es";

export interface ToxicIndependenceQuestion {
  id: number;
  subscale: "care_rejection" | "somatic_suppression" | "martyr_exhaustion";
  prompt: Record<ToxicIndependenceLang, string>;
  options: {
    label: Record<ToxicIndependenceLang, string>;
    score: number; // 0 to 3
  }[];
}

export interface ToxicIndependenceArchetype {
  level: "interdependent_connector" | "self_reliant_achiever" | "counter_dependent_sentinel" | "pathological_hyper_isolated";
  badge: Record<ToxicIndependenceLang, string>;
  title: Record<ToxicIndependenceLang, string>;
  tagline: Record<ToxicIndependenceLang, string>;
  description: Record<ToxicIndependenceLang, string>;
  psychologyInsight: Record<ToxicIndependenceLang, string>;
  actionProtocols: Record<ToxicIndependenceLang, string[]>;
  dailyAffirmation: Record<ToxicIndependenceLang, string>;
}

export interface ToxicIndependenceScoreResult {
  totalScore: number;
  percentage: number;
  level: ToxicIndependenceArchetype["level"];
  profile: ToxicIndependenceArchetype;
  subscales: {
    care_rejection: { score: number; percentage: number };
    somatic_suppression: { score: number; percentage: number };
    martyr_exhaustion: { score: number; percentage: number };
  };
}

export const TOXIC_INDEPENDENCE_QUESTIONS: ToxicIndependenceQuestion[] = [
  // Subscale 1: Care Rejection & Vulnerability Phobia
  {
    id: 1,
    subscale: "care_rejection",
    prompt: {
      en: "When someone offers me genuine help, financial assistance, or a favor, I feel an instinctive spike of panic, indebtedness, or repulsion.",
      id: "Saat seseorang menawarkan bantuan tulus, bantuan finansial, atau pertolongan, aku merasakan kepanikan spontan, rasa berutang budi, atau penolakan batin.",
      de: "Wenn mir jemand aufrichtige Hilfe, Geld oder einen Gefallen anbietet, verspüre ich sofort Panik, Schuldgefühle oder instinktiven Widerwillen.",
      fr: "Quand quelqu'un m'offre son aide, son soutien financier ou un service sincère, je ressens une panique instinctive ou un lourd sentiment de dette.",
      es: "Cuando alguien me ofrece ayuda sincera, dinero o un favor, siento un pico instintivo de pánico, endeudamiento o rechazo.",
    },
    options: [
      {
        score: 0,
        label: {
          en: "Rarely — I receive help with grace, ease, and gratitude",
          id: "Jarang — aku menerima bantuan dengan anggun, tenang, dan penuh terima kasih",
          de: "Selten — ich nehme Hilfe mit Leichtigkeit und Dankbarkeit an",
          fr: "Rarement — je reçois l'aide avec fluidité et gratitude",
          es: "Casi nunca — recibo ayuda con naturalidad y gratitud",
        },
      },
      {
        score: 1,
        label: {
          en: "Occasionally with large favors from casual acquaintances",
          id: "Sesekali untuk bantuan besar dari orang yang belum terlalu dekat",
          de: "Gelegentlich bei großen Gefallen von Bekannten",
          fr: "Parfois pour de gros services venant de simples connaissances",
          es: "Ocasionalmente con favores grandes de conocidos",
        },
      },
      {
        score: 2,
        label: {
          en: "Frequently — I will go to absurd, exhausting lengths just to avoid asking anyone for help",
          id: "Sering — aku rela bersusah payah setengah mati hanya demi tidak perlu meminta bantuan siapa pun",
          de: "Häufig — ich betreibe absurden Aufwand, nur um niemanden um Hilfe bitten zu müssen",
          fr: "Souvent — je m'épuise absurdement juste pour éviter de demander quoi que ce soit",
          es: "A menudo — hago esfuerzos absurdos y agotadores solo para no pedir ayuda a nadie",
        },
      },
      {
        score: 3,
        label: {
          en: "Always — receiving assistance feels like surrendering my sovereignty and opening myself to exploitation",
          id: "Selalu — menerima bantuan terasa seperti menyerahkan kemerdekaanku dan membuka pintu untuk dimanfaatkan",
          de: "Immer — Hilfe anzunehmen fühlt sich an wie die Preisgabe meiner Freiheit und Verwundbarkeit",
          fr: "Toujours — accepter de l'aide m'apparaît comme une capitulation et une prise d'otage émotionnelle",
          es: "Siempre — aceptar ayuda se siente como entregar mi libertad y exponerme a manipulación",
        },
      },
    ],
  },
  {
    id: 2,
    subscale: "care_rejection",
    prompt: {
      en: "I believe deep down: 'If I don't handle this completely by myself, it won't be done right, and I will be disappointed.'",
      id: "Di lubuk hati terdalam aku percaya: 'Kalau bukan aku sendiri yang bereskan, hasilnya pasti berantakan dan aku akan kecewa.'",
      de: "Tief im Inneren glaube ich: 'Wenn ich es nicht allein mache, wird es nicht gut, und ich werde enttäuscht.'",
      fr: "Au fond, je crois fermement : 'Si je ne le fais pas seul, ce sera mal fait et je serai trahi ou déçu.'",
      es: "En el fondo creo: 'Si no lo hago yo solo, no saldrá bien y me llevaré una decepción.'",
    },
    options: [
      {
        score: 0,
        label: {
          en: "Disagree — I trust others' capabilities and collaborate seamlessly",
          id: "Tidak setuju — aku mempercayai kemampuan orang lain dan mudah berkolaborasi",
          de: "Trifft nicht zu — ich vertraue anderen und delegiere gern",
          fr: "Pas d'accord — je fais confiance aux compétences d'autrui et délègue facilement",
          es: "En desacuerdo — confío en las capacidades ajenas y colaboro sin problema",
        },
      },
      {
        score: 1,
        label: {
          en: "Only in high-stakes professional deadlines",
          id: "Hanya saat batas waktu proyek profesional yang sangat genting",
          de: "Nur bei extrem wichtigen beruflichen Deadlines",
          fr: "Uniquement lors d'échéances professionnelles cruciales",
          es: "Solo ante plazos de trabajo de alto riesgo",
        },
      },
      {
        score: 2,
        label: {
          en: "Frequently — delegating gives me intense anxiety, so I end up doing everyone's work",
          id: "Sering — mendelegasikan tugas memicu kecemasan hebat, jadi akhirnya aku yang mengerjakan semuanya",
          de: "Häufig — Delegieren bereitet mir Unruhe, also mache ich lieber alles selbst",
          fr: "Souvent — déléguer m'angoisse tant que je finis par faire le travail des autres",
          es: "A menudo — delegar me genera tanta ansiedad que termino haciéndolo todo yo",
        },
      },
      {
        score: 3,
        label: {
          en: "Absolute life rule — trusting anyone with my needs is a catastrophic liability",
          id: "Prinsip mutlak hidupku — mempercayakan kebutuhanku pada orang lain adalah kelemahan fatal",
          de: "Absolutes Gesetz — mich auf andere zu verlassen, ist ein unkalkulierbares Sicherheitsrisiko",
          fr: "Règle absolue — compter sur autrui pour mes besoins vitaux est un danger inacceptable",
          es: "Regla inquebrantable — depender de alguien para mis necesidades es un riesgo intolerable",
        },
      },
    ],
  },
  {
    id: 3,
    subscale: "care_rejection",
    prompt: {
      en: "When I am sick, injured, or grieving, I hide away and refuse to let friends or family bring food or nurse me.",
      id: "Saat aku sakit, terluka, atau berduka, aku bersembunyi dan menolak teman atau keluarga membawakan makanan atau merawatku.",
      de: "Wenn ich krank oder verletzt bin, verstecke ich mich und weise Besuche, Suppen oder Pflege ab.",
      fr: "Malade ou peiné, je me terre dans mon coin et refuse catégoriquement qu'on m'apporte à manger ou me soigne.",
      es: "Cuando enfermo o sufro, me escondo y rechazo que me traigan comida o me cuiden.",
    },
    options: [
      {
        score: 0,
        label: {
          en: "Rarely — I gladly allow loved ones to pamper and care for me",
          id: "Jarang — aku senang hati membiarkan orang tersayang merawat dan memanjakanku",
          de: "Selten — ich lasse mich von Nahestehenden gerne pflegen und umsorgen",
          fr: "Rarement — je me laisse soigner et choyer avec reconnaissance",
          es: "Casi nunca — permito que mis seres queridos me cuiden con agrado",
        },
      },
      {
        score: 1,
        label: {
          en: "I prefer resting alone for simple colds",
          id: "Aku hanya lebih suka istirahat sendiri saat terkena flu ringan",
          de: "Bei einer Erkältung schlafe ich lieber allein",
          fr: "Pour un simple rhume, je préfère être tranquille",
          es: "Prefiero estar solo para resfriados comunes",
        },
      },
      {
        score: 2,
        label: {
          en: "Frequently — showing physical or emotional frailty in front of anyone feels humiliating",
          id: "Sering — memperlihatkan kerapuhan fisik atau emosi di depan orang lain terasa sangat memalukan",
          de: "Häufig — Schwäche oder Gebrechlichkeit vor anderen zu zeigen, beschämt mich zutiefst",
          fr: "Souvent — montrer ma fragilité physique ou morale me paraît humiliant",
          es: "A menudo — mostrar debilidad o vulnerabilidad física me resulta humillante",
        },
      },
      {
        score: 3,
        label: {
          en: "Extreme isolation — I will drive myself to the emergency room in severe pain before calling a friend",
          id: "Isolasi ekstrem — aku rela menyetir sendiri ke IGD saat sakit parah daripada menelepon teman",
          de: "Extremer Rückzug — ich fahre mich eher unter Schmerzen selbst in die Notaufnahme, als jemanden anzurufen",
          fr: "Isolement extrême — je conduirais seul aux urgences dans un état critique plutôt que d'appeler un proche",
          es: "Aislamiento total — conduciría yo mismo a urgencias con dolor agudo antes que pedir a un amigo que me lleve",
        },
      },
    ],
  },
  {
    id: 4,
    subscale: "care_rejection",
    prompt: {
      en: "I am everyone else's rock, confidant, and emergency responder, but nobody in my life truly knows what I am struggling with.",
      id: "Aku adalah tempat bersandar, tempat curhat, dan penolong darurat bagi semua orang, tetapi tidak ada seorang pun yang benar-benar tahu bebanku.",
      de: "Ich bin der Fels in der Brandung für alle anderen, aber niemand in meinem Leben weiß, wie es mir wirklich geht.",
      fr: "Je suis le roc et le confident de tout le monde, mais absolument personne ne sait ce que j'endure en secret.",
      es: "Soy el pilar y confidente de todos, pero nadie en mi vida conoce realmente mis batallas internas.",
    },
    options: [
      {
        score: 0,
        label: {
          en: "Disagree — my close relationships have mutual, balanced reciprocity and sharing",
          id: "Tidak setuju — hubunganku memiliki timbal balik seimbang dalam saling bercerita dan mendukung",
          de: "Trifft nicht zu — meine Beziehungen basieren auf echtem gegenseitigem Geben und Nehmen",
          fr: "Pas d'accord — mes liens sont fondés sur un partage équilibré et réciproque",
          es: "En desacuerdo — mis relaciones gozan de una reciprocidad sana y equilibrada",
        },
      },
      {
        score: 1,
        label: {
          en: "I am slightly more a listener than a sharer",
          id: "Aku memang sedikit lebih banyak mendengarkan daripada bercerita",
          de: "Ich höre tendenziell etwas lieber zu, als selbst zu reden",
          fr: "J'ai plutôt tendance à écouter qu'à m'épancher",
          es: "Tiendo a escuchar un poco más de lo que hablo",
        },
      },
      {
        score: 2,
        label: {
          en: "Pronounced one-way dynamic — people lean on me, but my personal life is a strictly guarded vault",
          id: "Satu arah yang kentara — orang bersandar padaku, tapi kehidupan pribadiku terkunci rapat bagai brankas",
          de: "Deutliche Einbahnstraße — andere stützen sich auf mich, mein Inneres bleibt streng unter Verschluss",
          fr: "Sens unique marqué — les autres s'appuient sur moi, mais mon intimité reste un coffre-fort",
          es: "Dinámica unilateral — la gente se apoya en mí, pero mi vida interna es una caja fuerte sellada",
        },
      },
      {
        score: 3,
        label: {
          en: "Complete emotional exile — I am surrounded by people yet feel entirely solitary and invisible",
          id: "Pengasingan emosi total — aku dikelilingi banyak orang namun merasa benar-benar sendirian dan tak kasat mata",
          de: "Völliges emotionales Exil — umgeben von Menschen fühle ich mich unsichtbar und völlig allein",
          fr: "Exil affectif complet — bien qu'entouré, je me sens d'une solitude absolue et invisible",
          es: "Exilio emocional total — rodeado de gente, me siento completamente invisible y solitario",
        },
      },
    ],
  },

  // Subscale 2: Somatic Suppression & Body Betrayal (Gabor Maté Model)
  {
    id: 5,
    subscale: "somatic_suppression",
    prompt: {
      en: "I habitually push through migraines, chronic back pain, or fever with painkillers just to avoid canceling a commitment.",
      id: "Aku terbiasa memaksakan diri bekerja saat migrain, sakit punggung, atau demam dengan obat pereda nyeri demi tidak membatalkan komitmen.",
      de: "Ich unterdrücke Migräne, Rückenschmerzen oder Fieber mit Schmerzmitteln, nur um bloß keinen Termin abzusagen.",
      fr: "J'étouffe migraines, fièvre et douleurs dorsales sous des analgésiques pour ne surtout pas faillir à un engagement.",
      es: "Apago migrañas, dolor de espalda o fiebre con analgésicos solo para no cancelar ningún compromiso.",
    },
    options: [
      {
        score: 0,
        label: {
          en: "Rarely — when my body whispers to rest, I cancel plans and prioritize sleep",
          id: "Jarang — saat tubuhku memberi sinyal lelah, aku membatalkan janji dan memprioritaskan tidur",
          de: "Selten — wenn der Körper Ruhe fordert, sage ich Termine ab und schlafe",
          fr: "Rarement — si mon corps réclame du repos, j'annule et je dors",
          es: "Casi nunca — si mi cuerpo pide tregua, cancelo y descanso",
        },
      },
      {
        score: 1,
        label: {
          en: "Occasionally during unavoidable major presentations",
          id: "Sesekali hanya saat presentasi besar yang benar-benar tidak bisa ditunda",
          de: "Nur bei unaufschiebbaren Schlüsselterminen",
          fr: "Parfois lors de présentations majeures incontournables",
          es: "Ocasionalmente en presentaciones clave insustituibles",
        },
      },
      {
        score: 2,
        label: {
          en: "Frequently — I view my physical limitations as annoying weaknesses to be overcome with willpower",
          id: "Sering — aku memandang batas fisik tubuhku sebagai kelemahan menyebalkan yang harus dikalahkan dengan tekad",
          de: "Häufig — ich betrachte Körpersignale als Schwächen, die man mit Disziplin niederkämpfen muss",
          fr: "Souvent — je vois mes limites physiques comme des faiblesses agaçantes à mater par la volonté",
          es: "A menudo — veo mis límites corporales como debilidades molestas que vencer con disciplina",
        },
      },
      {
        score: 3,
        label: {
          en: "Chronic somatic mutiny — my body has to stage a full hospital-grade collapse to get me to stop",
          id: "Pemberontakan tubuh kronis — tubuhku harus sampai ambruk ke rumah sakit agar aku mau berhenti",
          de: "Dauernde Selbstausbeutung — mein Körper muss mich per Kollaps ins Krankenhaus zwingen, damit ich halte",
          fr: "Sabotage somatique permanent — mon corps doit littéralement s'effondrer pour m'obliger à stopper",
          es: "Rebelión somática crónica — mi cuerpo tiene que colapsar para que me detenga",
        },
      },
    ],
  },
  {
    id: 6,
    subscale: "somatic_suppression",
    prompt: {
      en: "I feel intense guilt, agitation, or unworthiness whenever I sit on the couch doing 'nothing'.",
      id: "Aku merasakan rasa bersalah yang intens, gelisah, atau merasa tidak berguna setiap kali duduk santai tanpa melakukan apa-apa.",
      de: "Ich fühle starke Schuld, Unruhe oder Wertlosigkeit, sobald ich einfach nur auf dem Sofa sitze und 'nichts' tue.",
      fr: "Je ressens une vive culpabilité, une fébrilité ou un sentiment d'inutilité dès que je m'assieds sans rien faire.",
      es: "Siento una profunda culpa, agitación o inutilidad en cuanto me siento en el sofá sin producir nada.",
    },
    options: [
      {
        score: 0,
        label: {
          en: "Rarely — I savor lazy, unstructured rest with peaceful contentment",
          id: "Jarang — aku menikmati istirahat santai tanpa rencana dengan penuh kedamaian",
          de: "Selten — ich genieße faules Nichtstun mit vollkommenem Seelenfrieden",
          fr: "Rarement — je savoure la paresse et le repos sans la moindre culpabilité",
          es: "Casi nunca — disfruto del descanso improductivo con total serenidad",
        },
      },
      {
        score: 1,
        label: {
          en: "Only on Sunday afternoons if my to-do list is still overflowing",
          id: "Hanya saat Minggu sore jika daftar tugas pekerjaanku masih menumpuk",
          de: "Nur sonntags, wenn noch zu viele To-Dos offen sind",
          fr: "Parfois le dimanche si ma liste de tâches déborde",
          es: "Solo los domingos si tengo tareas pendientes acumuladas",
        },
      },
      {
        score: 2,
        label: {
          en: "Frequently — relaxation feels like a dangerous trap, so I must stay constantly productive",
          id: "Sering — bersantai terasa seperti jebakan berbahaya, jadi aku harus selalu sibuk produktif",
          de: "Häufig — Entspannung fühlt sich gefährlich an, also muss ich ständig etwas leisten",
          fr: "Souvent — le farniente m'angoisse, je dois toujours m'activer pour mériter ma place",
          es: "A menudo — relajarme me parece una trampa, necesito estar siempre activo",
        },
      },
      {
        score: 3,
        label: {
          en: "Severe addiction to self-worth through output — my identity collapses without continuous labor",
          id: "Kecanduan berat pada harga diri berbasis output — identitasku runtuh jika tidak terus bekerja",
          de: "Extremer Leistungswahn — mein Selbstwert existiert nur durch permanente Ausbeutung und Output",
          fr: "Asservissement total à la performance — mon identité s'effondre sans labeur permanent",
          es: "Adicción extrema a la productividad — mi autoestima se derrumba si no estoy generando resultados",
        },
      },
    ],
  },
  {
    id: 7,
    subscale: "somatic_suppression",
    prompt: {
      en: "I pride myself on 'never crying' or being the person who stays completely unflappable in disasters.",
      id: "Aku bangga karena 'tidak pernah menangis' atau selalu menjadi orang yang paling tenang tanpa ekspresi di tengah krisis.",
      de: "Ich bin stolz darauf, 'niemals zu weinen' und selbst bei Katastrophen eiskalt und unerschütterlich zu wirken.",
      fr: "Je m'enorgueillis de 'ne jamais pleurer' et de rester le roc impassible au milieu du chaos.",
      es: "Me enorgullece 'no llorar nunca' y ser quien se mantiene imperturbable en medio de las crisis.",
    },
    options: [
      {
        score: 0,
        label: {
          en: "Disagree — crying is a sacred, necessary somatic release of cortisol and grief",
          id: "Tidak setuju — menangis adalah pelepasan somatis yang sehat dan perlu untuk membuang hormon stres",
          de: "Trifft nicht zu — Weinen ist eine gesunde und befreiende körperliche Entlastung",
          fr: "Pas d'accord — pleurer est une délivrance somatique saine et naturelle",
          es: "En desacuerdo — el llanto es una liberación física necesaria y saludable",
        },
      },
      {
        score: 1,
        label: {
          en: "I rarely cry in public, but let tears flow freely in private",
          id: "Aku jarang menangis di depan umum, tetapi membiarkan air mata mengalir saat sendirian",
          de: "Ich weine selten öffentlich, aber problemlos im stillen Kämmerlein",
          fr: "Je pleure rarement en public, mais sans frein dans l'intimité",
          es: "Rara vez lloro en público, pero me permito hacerlo a solas",
        },
      },
      {
        score: 2,
        label: {
          en: "Frequently — I cannot remember the last time I cried; my tear ducts feel welded shut",
          id: "Sering — aku lupa kapan terakhir kali menangis; saluran air mataku terasa tersumbat permanen",
          de: "Häufig — ich kann mich kaum an Tränen erinnern; alles wirkt innerlich zugeschnürt",
          fr: "Souvent — je ne sais plus quand j'ai pleuré pour la dernière fois ; tout est bloqué",
          es: "A menudo — no recuerdo la última vez que lloré; mis lágrimas parecen secas",
        },
      },
      {
        score: 3,
        label: {
          en: "Ironclad emotional armor — tears are viewed as pathetic capitulation and weakness",
          id: "Baju zirah emosi besi baja — air mata dipandang sebagai bentuk kelemahan dan kekalahan memalukan",
          de: "Eiserne Schutzpanzerung — Weinen gilt mir unbewusst als unverzeihliche Schwäche",
          fr: "Blindage absolu — les larmes sont perçues comme une défaite pitoyable et intolérable",
          es: "Coraza indestructible — verter una lágrima se percibe como una rendición inaceptable",
        },
      },
    ],
  },
  {
    id: 8,
    subscale: "somatic_suppression",
    prompt: {
      en: "I have unexplained chronic physical symptoms (autoimmune flare-ups, IBS, jaw clenching, fibromyalgia) that worsen during periods of high relational responsibility.",
      id: "Aku memiliki gejala fisik kronis tak terjelaskan (kambuhnya autoimun, gerd/ibs, rahang mengatup rapat, nyeri otot) yang memburuk saat beban tanggung jawab memuncak.",
      de: "Ich leide an ungeklärten chronischen Beschwerden (Zähneknirschen, Reizdarm, Verspannungen), die bei viel Verantwortung eskalieren.",
      fr: "J'ai des douleurs chroniques inexpliquées (mâchoires serrées, côlon irritable, tensions) qui flambent sous la responsabilité.",
      es: "Sufro dolencias crónicas inexplicadas (bruxismo, colon irritable, tensión) que se disparan ante el exceso de deberes.",
    },
    options: [
      {
        score: 0,
        label: {
          en: "Rarely — my body is generally relaxed, unburdened, and supple",
          id: "Jarang — tubuhku umumnya relaks, lentur, dan bebas dari ketegangan kronis",
          de: "Selten — mein Körper fühlt sich überwiegend entspannt und locker an",
          fr: "Rarement — mon corps est détendu et délié la plupart du temps",
          es: "Casi nunca — mi cuerpo se siente relajado y ágil habitualmente",
        },
      },
      {
        score: 1,
        label: {
          en: "Occasional mild neck stiffness after long laptop days",
          id: "Sesekali hanya leher kaku ringan setelah seharian di depan laptop",
          de: "Gelegentlich steifer Nacken nach langen Bildschirmtagen",
          fr: "Parfois un torticolis bénin après de longues heures sur écran",
          es: "Ocasional rigidez de cuello tras horas ante el ordenador",
        },
      },
      {
        score: 2,
        label: {
          en: "Frequent somatic alarm bells — teeth grinding, digestive distress, tension headaches",
          id: "Sinyal alarm tubuh sering berbunyi — menggemertakkan gigi saat tidur, gangguan lambung, sakit kepala tegang",
          de: "Häufige somatische Warnsignale — Zähneknirschen, Magenkrämpfe, Spannungskopfschmerz",
          fr: "Signaux somatiques réguliers — bruxisme nocturne, gastrites, céphalées de tension",
          es: "Frecuentes alarmas somáticas — bruxismo, digestiones dolorosas, cefaleas tensionales",
        },
      },
      {
        score: 3,
        label: {
          en: "Severe 'When the Body Says No' pathology — chronic systemic inflammation from lifelong self-suppression",
          id: "Kondisi 'When the Body Says No' yang parah — peradangan sistemik menahun akibat represi diri seumur hidup",
          de: "Schwere somatische Warnstufen — der Körper sagt mit Entzündungen Nein, wo der Mund Ja sagte",
          fr: "Pathologie du 'Corps qui dit Non' — inflammation chronique née du sacrifice systématique de mes limites",
          es: "Patología severa de 'Cuando el cuerpo dice no' — inflamación sistémica por anular mis propias necesidades",
        },
      },
    ],
  },

  // Subscale 3: Martyr Exhaustion & Counter-Dependency
  {
    id: 9,
    subscale: "martyr_exhaustion",
    prompt: {
      en: "I secretly harbor bitter resentment toward everyone around me because I carry the heaviest mental and practical load, yet nobody offers to help.",
      id: "Diam-diam aku memendam kebencian mendalam kepada orang di sekitarku karena aku yang menanggung beban terberat, namun tak ada yang menawarkan bantuan.",
      de: "Ich hege heimlichen Groll gegen mein Umfeld, weil ich die meiste Last trage, ohne dass mir jemand ungefragt hilft.",
      fr: "Je nourris un ressentiment secret envers mes proches, car je porte toute la charge sans que personne ne vienne m'épauler spontanément.",
      es: "Guardo un rencor silencioso hacia los demás porque cargo con el peso de todo sin que nadie me ofrezca alivio por iniciativa propia.",
    },
    options: [
      {
        score: 0,
        label: {
          en: "Rarely or never — I communicate expectations clearly before resentment builds",
          id: "Jarang atau tidak pernah — aku mengomunikasikan ekspektasi dengan jelas sebelum kekecewaan menumpuk",
          de: "Selten oder nie — ich spreche Wünsche klar an, bevor Groll entsteht",
          fr: "Rarement ou jamais — j'exprime mes besoins clairement avant d'en vouloir aux autres",
          es: "Casi nunca — comunico mis expectativas con claridad antes de acumular resentimiento",
        },
      },
      {
        score: 1,
        label: {
          en: "Occasionally when family members take domestic tasks for granted",
          id: "Sesekali saat anggota keluarga menganggap remeh tugas rumah tangga",
          de: "Manchmal, wenn Hausarbeit als selbstverständlich hingenommen wird",
          fr: "Parfois lorsque des tâches ménagères sont tenues pour acquises",
          es: "A veces cuando se dan por sentadas mis tareas domésticas",
        },
      },
      {
        score: 2,
        label: {
          en: "Frequently — I reject help when offered, then silently resent people for not helping more",
          id: "Sering — aku menolak bantuan saat ditawari, tapi diam-diam kesal kenapa orang tidak lebih peka membantuku",
          de: "Häufig — ich lehne Hilfe ab und ärgere mich anschließend insgeheim über mangelnde Entlastung",
          fr: "Souvent — je refuse l'aide qu'on me propose, puis j'enrage en silence qu'on ne m'aide pas",
          es: "A menudo — rechazo la ayuda si me la ofrecen, y luego me enfado por dentro porque nadie me ayuda",
        },
      },
      {
        score: 3,
        label: {
          en: "Chronic martyr complex — trapped in a prison of being the indispensable, exhausted savior",
          id: "Kompleks martir kronis — terjebak dalam penjara menjadi sang pahlawan serba bisa yang kelelahan setengah mati",
          de: "Chronischer Märtyrer-Komplex — gefangen in der Rolle des unersetzlichen, völlig ausgebrannten Retters",
          fr: "Syndrome du martyr permanent — prisonnier du rôle de sauveur indispensable et à bout de souffle",
          es: "Complejo de mártir crónico — atrapado en la cárcel de ser el salvador indispensable y exhausto",
        },
      },
    ],
  },
  {
    id: 10,
    subscale: "martyr_exhaustion",
    prompt: {
      en: "The thought of being financially, emotionally, or logistically dependent on a partner or spouse fills me with cold dread.",
      id: "Membayangkan diriku bergantung secara finansial, emosional, atau praktis pada pasangan membuatku dilanda kengerian dingin.",
      de: "Der Gedanke, finanziell, seelisch oder organisatorisch von einem Partner abzuhängen, erfüllt mich mit blankem Entsetzen.",
      fr: "L'idée même de dépendre financièrement, affectivement ou matériellement d'un partenaire me glace le sang.",
      es: "La simple idea de depender económica, emocional o logísticamente de una pareja me produce un frío pánico.",
    },
    options: [
      {
        score: 0,
        label: {
          en: "Disagree — healthy interdependence makes partnerships beautiful and resilient",
          id: "Tidak setuju — kesalingtergantungan yang sehat (interdependensi) membuat hubungan indah dan kokoh",
          de: "Trifft nicht zu — gesunde Interdependenz bereichert und stärkt die Liebe",
          fr: "Pas d'accord — une saine interdépendance rend le couple solide et serein",
          es: "En desacuerdo — la interdependencia saludable hace a la pareja fuerte y hermosa",
        },
      },
      {
        score: 1,
        label: {
          en: "I prefer having my own separate bank account and savings buffer",
          id: "Aku hanya lebih nyaman memiliki rekening tabungan dan dana darurat pribadi",
          de: "Ein eigenes Konto und finanzielle Rücklagen sind mir einfach wichtig",
          fr: "Je tiens simplement à préserver mon compte et mon épargne personnelle",
          es: "Solo prefiero mantener una cuenta y ahorros propios como precaución",
        },
      },
      {
        score: 2,
        label: {
          en: "Frequently — I maintain escape plans, emergency exits, and complete self-funding out of survival fear",
          id: "Sering — aku selalu menyiapkan rencana kabur, pintu darurat, dan kemandirian penuh karena takut terperangkap",
          de: "Häufig — ich plane stets Notausgänge und totale Autonomie aus Urangst vor Auslieferung",
          fr: "Souvent — je conserve toujours un plan de fuite et une autonomie féroce par peur d'être piégé",
          es: "A menudo — mantengo planes de escape y autosuficiencia absoluta por miedo a quedar atrapado",
        },
      },
      {
        score: 3,
        label: {
          en: "Absolute counter-dependency — I will terminate promising relationships rather than let someone become essential to me",
          id: "Kontra-dependensi mutlak — aku rela memutuskan hubungan yang menjanjikan daripada membiarkan seseorang menjadi sangat berarti bagiku",
          de: "Radikale Gegenabhängigkeit — ich beende lieber gute Beziehungen, als jemanden unersetzlich werden zu lassen",
          fr: "Contre-dépendance absolue — je préfère saborder une belle relation plutôt que laisser l'autre devenir indispensable",
          es: "Contradependencia absoluta — rompería una relación valiosa antes de permitir que alguien se vuelva imprescindible para mí",
        },
      },
    ],
  },
  {
    id: 11,
    subscale: "martyr_exhaustion",
    prompt: {
      en: "I find it excruciatingly difficult to apologize or admit I made a mistake, because error feels like a mortal wound to my competence.",
      id: "Aku merasa sangat tersiksa untuk meminta maaf atau mengakui kesalahan, karena berbuat salah terasa seperti pukulan mematikan bagi kompetensiku.",
      de: "Es fällt mir unerträglich schwer, Fehler einzugestehen oder mich zu entschuldigen, weil es meine Kompetenz zu vernichten droht.",
      fr: "Il m'est insupportable d'admettre une erreur ou de m'excuser, car l'échec met ma valeur en péril mortel.",
      es: "Me cuesta horrores disculparme o reconocer un error, porque equivocarme se siente como una herida mortal a mi valía.",
    },
    options: [
      {
        score: 0,
        label: {
          en: "Disagree — I apologize swiftly, humbly, and genuinely when I am in the wrong",
          id: "Tidak setuju — aku meminta maaf dengan cepat, rendah hati, dan tulus saat aku bersalah",
          de: "Trifft nicht zu — ich entschuldige mich schnell, aufrichtig und ohne Gesichtsverlust",
          fr: "Pas d'accord — je m'excuse promptement et sincèrement sans me sentir diminué",
          es: "En desacuerdo — pido perdón con rapidez, humildad y sinceridad",
        },
      },
      {
        score: 1,
        label: {
          en: "A bit hard on my ego at first, but I come around quickly",
          id: "Awalnya agak menggores ego, tapi aku cepat sadar dan meminta maaf",
          de: "Anfangs zwickt das Ego kurz, aber ich lenke schnell ein",
          fr: "Mon ego pique un peu au début, mais je m'incline vite",
          es: "Me cuesta un instante de orgullo, pero rectifico con rapidez",
        },
      },
      {
        score: 2,
        label: {
          en: "Frequently — I will over-explain, rationalize, or fixate on technicalities to defend my correctness",
          id: "Sering — aku akan banyak membela diri, merasionalkan situasi, atau mencari celah teknis demi membuktikan aku benar",
          de: "Häufig — ich rechtfertige mich wortreich und diskutiere Details, um mein Recht zu wahren",
          fr: "Souvent — je sur-explique et ergote sur les détails pour préserver mon infaillibilité",
          es: "A menudo — doy excesivas explicaciones y me aferro a tecnicismos para defender que tenía razón",
        },
      },
      {
        score: 3,
        label: {
          en: "Compulsive infallibility — admitting fault feels like an existential death sentence for my safe identity",
          id: "Kompulsif ingin selalu benar — mengakui salah terasa seperti vonis mati bagi rasa amanku",
          de: "Unfehlbarkeits-Zwang — Fehlerzugeben fühlt sich wie die Zerstörung meines inneren Fundaments an",
          fr: "Infaillibilité compulsive — reconnaître un tort menace les fondations mêmes de ma survie",
          es: "Infalibilidad compulsiva — admitir una falta se siente como una sentencia de muerte para mi identidad",
        },
      },
    ],
  },
  {
    id: 12,
    subscale: "martyr_exhaustion",
    prompt: {
      en: "In childhood, I learned that adult love was conditional upon my utility, performance, or not causing any trouble.",
      id: "Saat masa kecil, aku belajar bahwa kasih sayang orang dewasa bersyarat pada seberapa berguna diriku, prestasiku, atau tidak merepotkan siapa pun.",
      de: "In meiner Kindheit lernte ich: Liebe und Sicherheit gibt es nur, wenn ich nützlich bin, leiste und keine Umstände mache.",
      fr: "Enfant, j'ai compris que l'amour et la sécurité dépendaient de mon utilité, de mes réussites et de mon silence docile.",
      es: "En la infancia aprendí que el afecto era condicional: debía ser útil, rendir y no causar ningún problema.",
    },
    options: [
      {
        score: 0,
        label: {
          en: "Disagree — I was loved unconditionally simply for existing",
          id: "Tidak setuju — aku dicintai tanpa syarat murni karena keberadaanku apa adanya",
          de: "Trifft nicht zu — ich wurde bedingungslos um meiner selbst willen geliebt",
          fr: "Pas d'accord — j'étais aimé inconditionnellement pour ce que j'étais",
          es: "En desacuerdo — fui amado de forma incondicional por el simple hecho de existir",
        },
      },
      {
        score: 1,
        label: {
          en: "Mild pressure to do well in school, but not traumatic",
          id: "Ada sedikit tuntutan prestasi sekolah, tapi tidak sampai membuat trauma",
          de: "Etwas Leistungsdruck in der Schule, aber nicht erdrückend",
          fr: "Une petite pression scolaire sans gravité",
          es: "Cierta exigencia en los estudios, pero nada traumático",
        },
      },
      {
        score: 2,
        label: {
          en: "Strong resonance — I was the 'mature, easy child' who had to raise myself or manage family emotions",
          id: "Sangat relevan — aku adalah 'anak yang mandiri dan tidak merepotkan' yang harus mengurus diri sendiri atau emosi keluarga",
          de: "Starke Resonanz — ich war das 'brave, pflegeleichte Kind', das früh erwachsen sein musste",
          fr: "Forte résonance — j'étais 'l'enfant modèle autonome' qui a dû s'élever seul ou réguler les adultes",
          es: "Fuerte resonancia — fui el 'niño maduro y fácil' que tuvo que criarse solo o sostener a la familia",
        },
      },
      {
        score: 3,
        label: {
          en: "Root of my trauma — being needy or dependent was strictly punished, so I swore never to need a human again",
          id: "Akar traumaku — menunjukkan kebutuhan atau ketergantungan dihukum keras, sehingga aku bersumpah tidak akan pernah butuh manusia lagi",
          de: "Trauma-Ursprung — Bedürftigkeit wurde bestraft; ich schwor mir, nie wieder einen Menschen zu brauchen",
          fr: "Origine du traumatisme — avoir des besoins était puni ; j'ai juré de ne plus jamais dépendre d'un être humain",
          es: "Raíz del trauma — mostrar vulnerabilidad era castigado; juré no volver a necesitar a nadie jamás",
        },
      },
    ],
  },
];

export const TOXIC_INDEPENDENCE_ARCHETYPES: Record<
  ToxicIndependenceArchetype["level"],
  ToxicIndependenceArchetype
> = {
  interdependent_connector: {
    level: "interdependent_connector",
    badge: {
      en: "Interdependent & Grounded",
      id: "Interdependen & Sehat",
      de: "Gesund interdependent",
      fr: "Interdépendant & Équilibré",
      es: "Interdependiente y Conectado",
    },
    title: {
      en: "The Interdependent Ally",
      id: "Sekutu Interdependen",
      de: "Der verbundene Partner",
      fr: "L'Allié Interdépendant",
      es: "El Aliado Interdependiente",
    },
    tagline: {
      en: "You carry your own weight while gracefully asking for and receiving human care.",
      id: "Kamu mandiri mengurus diri sendiri sambil tetap anggun meminta dan menerima pertolongan sesama.",
      de: "Sie stehen auf eigenen Beinen und können gleichzeitig Hilfe erbitten und genießen.",
      fr: "Vous êtes autonome tout en sachant demander et recevoir du soutien avec fluidité.",
      es: "Eres autosuficiente pero sabes pedir y recibir apoyo con total tranquilidad.",
    },
    description: {
      en: "Your score reflects true psychological maturity: healthy interdependence. You understand that needing others is not a biological defect, but the defining superpower of our species. You delegate without shame and receive kindness without anxiety.",
      id: "Skormu mencerminkan kedewasaan psikologis sejati: interdependensi sehat. Kamu paham bahwa membutuhkan orang lain bukanlah aib, melainkan fitrah manusia. Kamu mendelegasikan tugas tanpa rasa malu dan menerima bantuan tanpa cemas.",
      de: "Ihr Ergebnis belegt seelische Reife: gesunde Interdependenz. Sie wissen, dass Hilfe kein Makel ist, sondern menschliche Stärke. Sie delegieren ohne Scham und empfangen Fürsorge ohne Schuld.",
      fr: "Votre score témoigne d'une saine interdépendance. Vous savez que compter sur autrui n'est pas une tare mais une force humaine. Vous déléguez sans culpabilité et acceptez la tendresse.",
      es: "Tu puntuación muestra una madurez psicológica real: interdependencia saludable. Sabes que necesitar a otros no es un defecto sino una fortaleza humana.",
    },
    psychologyInsight: {
      en: "As Brené Brown notes in 'Daring Greatly', vulnerability is not winning or losing; it is having the courage to show up and be seen when we have no control over the outcome. Healthy interdependence builds unshakable relational trust.",
      id: "Seperti yang ditulis Brené Brown dalam 'Daring Greatly', kerentanan bukanlah soal menang atau kalah; melainkan keberanian untuk hadir dan terlihat apa adanya saat kita tidak memegang kendali penuh. Interdependensi sehat membangun kepercayaan mendalam.",
      de: "Wie Brené Brown in 'Verletzlichkeit macht stark' betont: Wahre Stärke bedeutet, sich zu zeigen und Hilfe zuzulassen, wenn man das Ergebnis nicht kontrollieren kann.",
      fr: "Comme le souligne Brené Brown, la vulnérabilité est le berceau de la connexion authentique. L'interdépendance harmonieuse tisse une sécurité affective durable.",
      es: "Como señala Brené Brown, la vulnerabilidad es la cuna de la conexión genuina. La interdependencia sana crea un vínculo indestructible.",
    },
    actionProtocols: {
      en: [
        "Continue celebrating collaborative victories and sharing credit openly.",
        "Model healthy vulnerability by expressing gratitude when friends offer support.",
        "Practice somatic boundary checks to ensure your empathy remains reciprocal.",
      ],
      id: [
        "Lanjutkan merayakan keberhasilan bersama dan berbagi apresiasi secara terbuka.",
        "Tunjukkan kerentanan sehat dengan mengucapkan terima kasih tulus saat teman membantumu.",
        "Lakukan evaluasi batas diri agar kebaikanmu selalu berada dalam hubungan timbal balik.",
      ],
      de: [
        "Gemeinsame Erfolge feiern und Wertschätzung offen teilen.",
        "Verletzlichkeit vorleben, indem Sie für Beistand aufrichtig danken.",
        "Auf gesunde Grenzen achten, damit Fürsorge beidseitig bleibt.",
      ],
      fr: [
        "Continuer de célébrer les victoires collectives et partager les honneurs.",
        "Inspirer vos proches en acceptant leur soutien avec une gratitude spontanée.",
        "Veiller à préserver la réciprocité dans vos élans d'empathie.",
      ],
      es: [
        "Celebrar los logros compartidos y repartir el mérito con generosidad.",
        "Ser un modelo de apertura agradeciendo sinceramente el apoyo ajeno.",
        "Monitorear tus límites para que la empatía siga siendo recíproca.",
      ],
    },
    dailyAffirmation: {
      en: "I am strong enough to stand alone, and brave enough to lean on those I love.",
      id: "Aku cukup kuat untuk berdiri sendiri, dan cukup berani untuk bersandar pada orang yang kucintai.",
      de: "Ich bin stark genug, allein zu stehen, und mutig genug, mich anzulehnen.",
      fr: "Je suis assez fort pour être autonome, et assez courageux pour m'appuyer sur ceux que j'aime.",
      es: "Soy fuerte para valerme por mí mismo y valiente para apoyarme en quienes amo.",
    },
  },

  self_reliant_achiever: {
    level: "self_reliant_achiever",
    badge: {
      en: "Self-Reliant Achiever",
      id: "Pencapai Mandiri",
      de: "Selbstbestimmter Macher",
      fr: "Bâtisseur Autosuffisant",
      es: "Autosuficiente Competente",
    },
    title: {
      en: "The Capable Architect",
      id: "Sang Arsitek Andal",
      de: "Der fähige Architekt",
      fr: "L'Architecte Efficace",
      es: "El Arquitecto Eficaz",
    },
    tagline: {
      en: "You pride yourself on competence, occasionally working past exhaustion before seeking help.",
      id: "Kamu bangga akan kompetensimu, namun terkadang bekerja melampaui batas lelah sebelum mau meminta tolong.",
      de: "Sie sind extrem fähig, arbeiten sich jedoch bisweilen wund, ehe Sie delegieren.",
      fr: "Votre compétence est exemplaire, mais vous flirtez avec l'épuisement avant d'appeler à l'aide.",
      es: "Tu eficacia es admirable, pero a veces te agotas al límite antes de delegar tareas.",
    },
    description: {
      en: "Your score reflects mild toxic independence. While your self-reliance has earned you admiration and professional momentum, it occasionally morphs into unnecessary isolation. Asking for help feels inefficient or slightly embarrassing, leading to episodic burnout.",
      id: "Skormu menunjukkan kemandirian toksik tingkat ringan. Ketangguhanmu mendatangkan kekaguman dan kesuksesan karir, namun kadang berubah menjadi isolasi yang melelahkan. Meminta tolong terasa tidak efisien atau sedikit memalukan, sehingga memicu burnout berkala.",
      de: "Ihr Ergebnis weist auf milde toxische Unabhängigkeit hin. Ihre Leistungsfähigkeit bringt Erfolg, lässt Sie jedoch gelegentlich unnötig allein kämpfen. Hilfe anzunehmen fühlt sich unpraktisch oder unangenehm an.",
      fr: "Votre score révèle une indépendance légèrement défensive. Votre efficacité force le respect mais vous isole par moments. Demander un coup de main vous semble inefficace ou inconfortable.",
      es: "Tu resultado muestra una independencia con tintes defensivos. Eres muy resolutivo, pero a veces te sobrecargas solo para no depender de otros.",
    },
    psychologyInsight: {
      en: "Self-reliance becomes toxic when it stops being a conscious choice and turns into a reflex against perceived inefficiency. Cultivating delegation expands your leadership and prevents somatic exhaustion.",
      id: "Kemandirian berubah menjadi toksik saat ia bukan lagi pilihan sadar, melainkan refleks defensif melawan persepsi ketidakefisienan. Belajar mendelegasikan tugas akan memperluas kapasitas kepemimpinanmu dan mencegah kelelahan fisik.",
      de: "Autonomie wird ungesund, wenn sie zum unbewussten Schutzreflex vor Kontrollverlust wird. Delegieren schützt Ihre Gesundheit und vertieft Partnerschaften.",
      fr: "L'autonomie dérape lorsqu'elle devient une cuirasse rigide contre le lâcher-prise. Oser déléguer est un acte de sagesse qui préserve vos ressources.",
      es: "La autosuficiencia se vuelve dañina cuando nace de la necesidad de control absoluto. Aprender a soltar y delegar es esencial para no quemarte.",
    },
    actionProtocols: {
      en: [
        "Practice 'Micro-Delegation': Delegate one trivial task per day (ordering lunch, scheduling) to build trust.",
        "Schedule non-negotiable rest windows where you are not allowed to be productive.",
        "Say 'Thank you, I would love that' next time someone offers a cup of coffee or assistance.",
      ],
      id: [
        "Latih 'Mikro-Delegasi': Delegasikan 1 tugas kecil setiap hari (memesan makan siang, merapikan jadwal) untuk melatih rasa percaya.",
        "Jadwalkan jam istirahat mutlak di mana kamu dilarang keras produktif.",
        "Katakan 'Terima kasih banyak, aku sangat terbantu' saat ada rekan kerja menawarkan bantuan kopi atau pertolongan kecil.",
      ],
      de: [
        "Mikro-Delegieren: Täglich eine Kleinigkeit abgeben, um das Vertrauen zu trainieren.",
        "Feste Ruhezeiten einplanen, in denen jede Produktivität untersagt ist.",
        "Beim nächsten Kaffeeangebot einfach 'Sehr gerne, danke!' sagen.",
      ],
      fr: [
        "Micro-délégation : Confier une petite tâche quotidienne pour réapprendre à faire confiance.",
        "Sanctuariser des plages de repos total où toute rentabilité est interdite.",
        "Répondre 'Avec plaisir, merci beaucoup !' à la prochaine proposition d'aide anodine.",
      ],
      es: [
        "Microdelegación: Cede una pequeña tarea al día para entrenar la confianza.",
        "Blindar ratos de ocio sagrado donde esté prohibido producir.",
        "Decir 'Muchas gracias, me vendría genial' ante la próxima muestra de ayuda cotidiana.",
      ],
    },
    dailyAffirmation: {
      en: "My worth is not measured by how much pain I can silently endure.",
      id: "Harga diriku tidak diukur dari seberapa banyak rasa sakit yang bisa kutanggung dalam diam.",
      de: "Mein Wert bemisst sich nicht daran, wie viel Schmerz ich stumm ertrage.",
      fr: "Ma valeur ne se mesure pas à la quantité de fatigue que j'encaisse en silence.",
      es: "Mi valía no se mide por la cantidad de dolor que puedo soportar en silencio.",
    },
  },

  counter_dependent_sentinel: {
    level: "counter_dependent_sentinel",
    badge: {
      en: "Counter-Dependent Sentinel",
      id: "Penjaga Kontra-Dependen",
      de: "Gegenabhängiger Wächter",
      fr: "Sentinelle Contre-Dépendante",
      es: "Centinela Contradependiente",
    },
    title: {
      en: "The Iron Bastion",
      id: "Benteng Besi Baja",
      de: "Die eiserne Bastion",
      fr: "Le Bastion d'Acier",
      es: "El Bastión de Acero",
    },
    tagline: {
      en: "Needing people feels dangerous; you carry massive burdens while secretly resenting the world.",
      id: "Membutuhkan orang terasa berbahaya; kamu memikul beban raksasa sendirian sambil diam-diam memendam kecewa.",
      de: "Bedürftigkeit gilt als Gefahr; Sie schleppen riesige Lasten und grollen heimlich.",
      fr: "Avoir besoin d'aide vous effraie ; vous portez des montagnes tout en en voulant au monde.",
      es: "Depender te asusta; cargas pesos descomunales a solas mientras acumulas resentimiento.",
    },
    description: {
      en: "Your score reveals moderate-to-severe toxic independence (counter-dependency). You have convinced yourself that you are unbreakable and need no one. You are everyone's crisis manager, yet your personal struggles remain an impenetrable fortress.",
      id: "Skormu menunjukkan kemandirian toksik tingkat sedang-ke-berat (kontra-dependensi). Kamu meyakinkan dirimu bahwa kamu kebal dan tidak butuh siapa pun. Kamu adalah penyelamat bagi semua orang, namun kehidupan pribadimu terkunci rapat tanpa celah.",
      de: "Ihr Ergebnis zeigt ausgeprägte toxische Gegenabhängigkeit. Sie geben den unzerstörbaren Retter für jedermann, verschließen Ihr eigenes Herz jedoch in einer uneinnehmbaren Burg.",
      fr: "Votre score révèle une contre-dépendance marquée. Vous vous êtes persuadé d'être invincible et utile à tous, mais vous cadenassez vos propres blessures derrière de hauts remparts.",
      es: "Tu resultado denota una contradependencia acusada. Te has convencido de ser invulnerable y solucionas la vida de los demás, pero nadie puede acceder a tus fragilidades.",
    },
    psychologyInsight: {
      en: "Dr. Gabor Maté explains in 'When the Body Says No' that individuals conditioned to suppress their vulnerability and care for others develop high rates of autoimmune and cardiovascular stress. The body eventually screams what the mouth refuses to speak.",
      id: "Dr. Gabor Maté menjelaskan dalam 'When the Body Says No' bahwa orang yang terbiasa menekan kerentanannya demi selalu merawat orang lain memiliki risiko tinggi terkena stres autoimun dan kardiovaskular. Tubuh akhirnya menjerit saat mulut menolak meminta tolong.",
      de: "Dr. Gabor Maté betont: Wer eigene Bedürfnisse permanent leugnet, zwingt den Körper zu streiken. Autoimmunerkrankungen und Erschöpfung sind oft die Quittung verweigerter Hilfe.",
      fr: "Le Dr Gabor Maté démontre que le refus systématique de nos besoins engendre un stress somatique majeur. Le corps finit par crier la détresse que la bouche refuse de formuler.",
      es: "El Dr. Gabor Maté advierte que anular las propias necesidades genera un colapso somático crónico. El cuerpo acaba gritando lo que la boca calla.",
    },
    actionProtocols: {
      en: [
        "Vulnerability Exposure: Share one real, unresolved challenge with a trusted friend this week.",
        "Daily Somatic Venting: Use private voice journaling in Nuju to dump the secret weight of your burdens.",
        "Practice Receiving: When offered assistance, take three slow breaths before responding with a soft 'Yes, please.'",
      ],
      id: [
        "Latihan Kerentanan: Ceritakan 1 masalah nyata yang sedang membebanimu kepada satu sahabat tepercaya minggu ini.",
        "Voice Venting Harian: Tumpahkan seluruh beban rahasiamu tanpa sensor di aplikasi Nuju setiap malam.",
        "Latih Menerima: Saat ada orang menawarkan bantuan, ambil napas 3 kali lalu jawab dengan lembut: 'Boleh, tolong bantu ya.'",
      ],
      de: [
        "Mut zur Schwäche: Einem vertrauten Menschen diese Woche eine echte, ungelöste Sorge anvertrauen.",
        "Tägliche Erleichterung: Die geheime Last im privaten Nuju-Sprachtagebuch unzensiert abladen.",
        "Empfangen lernen: Bei Hilfsangeboten dreimal durchatmen und weich 'Ja, sehr gerne' sagen.",
      ],
      fr: [
        "Partage authentique : Confier un vrai souci irrésolu à un ami proche cette semaine.",
        "Décharge quotidienne : Déposer le fardeau secret dans un journal vocal intime sur Nuju.",
        "Apprendre à recevoir : Respirer trois fois face à une aide et murmurer 'Oui, avec plaisir.'",
      ],
      es: [
        "Apertura progresiva: Comparte una preocupación real y no resuelta con un amigo de confianza esta semana.",
        "Desahogo vocal: Vacía el peso invisible de tus cargas en el diario de voz privado de Nuju.",
        "Aprender a recibir: Ante un ofrecimiento, respira tres veces y contesta con un sincero 'Sí, por favor'.",
      ],
    },
    dailyAffirmation: {
      en: "Allowing myself to be held does not make me weak. It makes me human.",
      id: "Mengizinkan diriku ditolong dan dirawat tidak menjadikanku lemah. Itu menjadikanku manusia seutuhnya.",
      de: "Mich halten zu lassen, macht mich nicht schwach, sondern menschlich.",
      fr: "Me laisser épauler ne me rend pas faible, cela me rend humain.",
      es: "Dejarme sostener no me hace débil: me hace humano.",
    },
  },

  pathological_hyper_isolated: {
    level: "pathological_hyper_isolated",
    badge: {
      en: "Pathological Hyper-Isolated",
      id: "Kemandirian Ekstrem & Terisolasi",
      de: "Pathologisch hyper-isoliert",
      fr: "Hyper-Isolation Pathologique",
      es: "Hiperaislamiento Patológico",
    },
    title: {
      en: "The Hermit Fortress",
      id: "Pertapa Bertopeng Baja",
      de: "Die Einsiedler-Feste",
      fr: "La Forteresse Ermite",
      es: "La Ciudadela Solitaria",
    },
    tagline: {
      en: "Severe trauma-induced hyper-independence; chronic somatic exhaustion and total refusal of care.",
      id: "Kemandirian ekstrem akibat trauma mendalam; kelelahan fisik kronis dan penolakan mutlak terhadap pertolongan.",
      de: "Schwere trauma-bedingte Hyperunabhängigkeit; chronischer Burnout und völlige Abwehr jeder Fürsorge.",
      fr: "Hyper-indépendance traumatique sévère ; épuisement somatique chronique et rejet viscéral de toute aide.",
      es: "Hiperindependencia traumática severa; agotamiento físico extremo y rechazo visceral a ser cuidado.",
    },
    description: {
      en: "Your score reflects acute, trauma-driven hyper-independence. At some formative juncture in your life, relying on others was catastrophic, dangerous, or met with severe abandonment. You swore never to need a human again—a vow that once saved your life, but is now slowly destroying your health.",
      id: "Skormu mencerminkan kemandirian ekstrem berbasis trauma masa lalu. Di suatu fase hidupmu, bergantung pada orang lain berujung pada malapetaka, pengkhianatan, atau pengabaian menyakitkan. Kamu bersumpah tidak akan pernah butuh manusia lagi—janji yang dulu menyelamatkanmu, tapi kini perlahan merusak kesehatan fisik dan mentalmu.",
      de: "Ihr Ergebnis zeigt schwere trauma-basierte Hyperunabhängigkeit. Einst war Verlass auf andere lebensgefährlich. Der Schwur 'Ich brauche niemanden' sicherte damals Ihr Überleben, zerbricht heute jedoch Ihre seelische und körperliche Gesundheit.",
      fr: "Votre score révèle une indépendance défensive extrême née d'une blessure profonde. Compter sur autrui a jadis été dévastateur. Votre serment de ne plus jamais dépendre de personne vous a sauvé, mais il use aujourd'hui votre vitalité.",
      es: "Tu resultado refleja una hiperindependencia traumática aguda. En el pasado, confiar fue devastador. El juramento de no volver a necesitar a nadie te protegió entonces, pero hoy está desgastando tu salud de forma silenciosa.",
    },
    psychologyInsight: {
      en: "Trauma experts recognize extreme counter-dependency as an attachment injury masquerading as high functioning. True recovery is not becoming weak, but slowly realizing that safe, non-punitive humans exist in your adult life.",
      id: "Pakar trauma mengenali kontra-dependensi ekstrem sebagai luka kelekatan (attachment injury) yang berkamuflase sebagai sosok mandiri dan berprestasi. Pemulihan sejati bukanlah menjadi lemah, melainkan menyadari bahwa kini ada orang-orang aman yang tulus peduli padamu.",
      de: "Traumatherapeuten sehen in extremer Unabhängigkeit eine getarnte Bindungsverletzung. Genesung bedeutet nicht, wehrlos zu werden, sondern schrittweise sichere Verbündete zuzulassen.",
      fr: "Les thérapeutes du trauma identifient l'hyper-indépendance comme une blessure d'attachement déguisée en force. Guérir consiste à découvrir qu'il existe des liens fiables et bienveillants.",
      es: "Los especialistas en trauma señalan que la hiperindependencia es una herida de apego disfrazada de fortaleza. Sanar implica descubrir que hoy existen personas seguras.",
    },
    actionProtocols: {
      en: [
        "Somatic Trauma Therapy: Work with a licensed somatic or IFS (Internal Family Systems) therapist to address early betrayal wounds.",
        "Reparenting the Exhausted Part: When you feel the urge to do it all, whisper: 'I see how tired you are. It's okay to put down the sword.'",
        "Safe Micro-Requests: Ask someone you trust to complete a tiny task (e.g. 'Could you pass me that water bottle?') without apologizing.",
      ],
      id: [
        "Terapi Trauma Somatis: Pertimbangkan sesi bersama terapis somatis atau konselor IFS untuk menyembuhkan luka pengkhianatan masa lalu.",
        "Reparenting Bagian Tubuh yang Lelah: Saat dorongan memaksakan diri muncul, bisikkan: 'Aku tahu kamu sangat lelah. Boleh kok meletakkan pedang ini sekarang.'",
        "Permintaan Mikro Aman: Minta seseorang yang tepercaya melakukan hal sangat kecil (misal: 'Boleh tolong ambilkan botol air itu?') tanpa meminta maaf.",
      ],
      de: [
        "Traumatherapeutische Begleitung (Somatic Experiencing, IFS) zur Entlastung des Schutzpanzers erwägen.",
        "Fürsorglicher Dialog: Sich selbst sanft zusprechen: 'Du bist erschöpft. Du darfst das Schwert für heute ablegen.'",
        "Mikro-Bitten üben: Eine vertraute Person um eine winzige Gefälligkeit bitten, ohne sich danach zu entschuldigen.",
      ],
      fr: [
        "Thérapie somatique du trauma (IFS, SE) pour apaiser cette part protectrice surmenée.",
        "Dialogue intérieur bienveillant : 'Je vois combien tu es épuisé. Tu as le droit de poser les armes.'",
        "Micro-demandes sécurisées : Demander un geste minuscule à un proche sans s'excuser en retour.",
      ],
      es: [
        "Terapia informada en trauma (Somatic Experiencing o IFS) para sanar la herida de desamparo.",
        "Diálogo interno compasivo: 'Veo lo agotado que estás. Puedes soltar la espada por hoy.'",
        "Micro-peticiones seguras: Pide un favor minúsculo a alguien de confianza sin pedir disculpas.",
      ],
    },
    dailyAffirmation: {
      en: "I survived the past. Today, it is safe to put down the armor and accept love.",
      id: "Aku telah berhasil melewati masa lalu. Hari ini, aman bagiku untuk meletakkan baju zirah ini dan menerima cinta.",
      de: "Ich habe überlebt. Heute ist es sicher, die Rüstung abzulegen und Liebe zuzulassen.",
      fr: "J'ai survécu au passé. Aujourd'hui, je peux déposer mon armure et recevoir de l'amour en toute sécurité.",
      es: "Sobreviví al pasado. Hoy es seguro bajar la guardia y recibir amor.",
    },
  },
};

export const calculateToxicIndependenceScore = (
  answers: Record<number, number>
): ToxicIndependenceScoreResult => {
  let totalScore = 0;
  const subscaleScores = {
    care_rejection: 0,
    somatic_suppression: 0,
    martyr_exhaustion: 0,
  };

  TOXIC_INDEPENDENCE_QUESTIONS.forEach((q) => {
    const val = answers[q.id] ?? 0;
    totalScore += val;
    subscaleScores[q.subscale] += val;
  });

  const maxTotal = TOXIC_INDEPENDENCE_QUESTIONS.length * 3; // 36
  const percentage = Math.min(100, Math.round((totalScore / maxTotal) * 100));

  let level: ToxicIndependenceArchetype["level"] = "interdependent_connector";
  if (percentage >= 75) {
    level = "pathological_hyper_isolated";
  } else if (percentage >= 50) {
    level = "counter_dependent_sentinel";
  } else if (percentage >= 25) {
    level = "self_reliant_achiever";
  }

  const maxPerSubscale = 4 * 3; // 12 points each
  const subscales = {
    care_rejection: {
      score: subscaleScores.care_rejection,
      percentage: Math.min(100, Math.round((subscaleScores.care_rejection / maxPerSubscale) * 100)),
    },
    somatic_suppression: {
      score: subscaleScores.somatic_suppression,
      percentage: Math.min(100, Math.round((subscaleScores.somatic_suppression / maxPerSubscale) * 100)),
    },
    martyr_exhaustion: {
      score: subscaleScores.martyr_exhaustion,
      percentage: Math.min(100, Math.round((subscaleScores.martyr_exhaustion / maxPerSubscale) * 100)),
    },
  };

  return {
    totalScore,
    percentage,
    level,
    profile: TOXIC_INDEPENDENCE_ARCHETYPES[level],
    subscales,
  };
};
