export type HyperIndependenceLang = "en" | "id" | "de" | "fr" | "es";

export interface HyperIndependenceQuestion {
  id: number;
  subscale: "solitary_armor" | "vulnerability_phobia" | "threat_detection";
  prompt: Record<HyperIndependenceLang, string>;
  options: {
    label: Record<HyperIndependenceLang, string>;
    score: number; // 0 to 3
  }[];
}

export interface HyperIndependenceArchetype {
  level: "interdependent_secure" | "self_reliant_striver" | "guarded_lone_wolf" | "severe_fortress";
  badge: Record<HyperIndependenceLang, string>;
  title: Record<HyperIndependenceLang, string>;
  tagline: Record<HyperIndependenceLang, string>;
  description: Record<HyperIndependenceLang, string>;
  psychologyInsight: Record<HyperIndependenceLang, string>;
  actionProtocols: Record<HyperIndependenceLang, string[]>;
  dailyAffirmation: Record<HyperIndependenceLang, string>;
}

export interface HyperIndependenceScoreResult {
  totalScore: number;
  percentage: number;
  level: HyperIndependenceArchetype["level"];
  profile: HyperIndependenceArchetype;
  subscales: {
    solitary_armor: { score: number; percentage: number };
    vulnerability_phobia: { score: number; percentage: number };
    threat_detection: { score: number; percentage: number };
  };
}

export const HYPER_INDEPENDENCE_QUESTIONS: HyperIndependenceQuestion[] = [
  // Subscale 1: Solitary Armor (Refusal to delegate or accept help)
  {
    id: 1,
    subscale: "solitary_armor",
    prompt: {
      en: "Even when completely overwhelmed or sick, my automatic reaction is to handle everything alone rather than ask for help.",
      id: "Meski sedang sangat kewalahan atau sakit, reaksi otomatiskuku adalah mengurus semuanya sendirian daripada minta tolong.",
      de: "Selbst wenn ich völlig überlastet oder krank bin, mache ich lieber alles allein, statt um Hilfe zu bitten.",
      fr: "Même quand je suis débordé ou malade, mon réflexe est de tout gérer seul plutôt que de demander de l'aide.",
      es: "Incluso cuando estoy desbordado o enfermo, mi reacción automática es resolverlo todo solo antes que pedir ayuda.",
    },
    options: [
      {
        score: 0,
        label: {
          en: "Disagree — I reach out comfortably when my capacity is full",
          id: "Tidak setuju — Aku minta tolong dengan santai saat kapasitas sudah penuh",
          de: "Stimme nicht zu — Ich bitte ganz natürlich um Entlastung",
          fr: "Pas d'accord — Je demande du soutien naturellement quand j'en ai besoin",
          es: "En desacuerdo — Pido ayuda con naturalidad cuando no doy abasto",
        },
      },
      {
        score: 1,
        label: {
          en: "Occasionally — I try once alone, then delegate if needed",
          id: "Kadang — Aku coba sendiri dulu, baru delegasi jika perlu",
          de: "Gelegentlich — Ich probiere es erst allein, delegiere dann",
          fr: "Parfois — J'essaie d'abord seul, puis je délègue",
          es: "A veces — Pruebo solo primero, luego delego si hace falta",
        },
      },
      {
        score: 2,
        label: {
          en: "Frequently — asking feels harder and more stressful than doing the chore myself",
          id: "Sering — meminta tolong terasa lebih berat dan ribet dibanding kukerjakan sendiri",
          de: "Häufig — um Hilfe zu bitten ist anstrengender als es selbst zu tun",
          fr: "Souvent — demander me coûte plus que de faire le travail moi-même",
          es: "A menudo — pedir ayuda me resulta más pesado y estresante que hacerlo yo",
        },
      },
      {
        score: 3,
        label: {
          en: "Absolute rule — I would rather collapse from exhaustion than ask someone for assistance",
          id: "Prinsip mutlak — Aku lebih rela pingsan kelelahan daripada minta bantuan orang",
          de: "Eherne Regel — Ich breche lieber zusammen, als jemanden um Hilfe anzuflehen",
          fr: "Règle absolue — Je préfère m'effondrer d'épuisement que d'appeler à l'aide",
          es: "Norma inquebrantable — Prefiero caer rendido antes que pedir un favor a nadie",
        },
      },
    ],
  },
  {
    id: 2,
    subscale: "solitary_armor",
    prompt: {
      en: "I live by the motto: 'If you want something done right, you have to do it yourself.'",
      id: "Aku hidup dengan prinsip: 'Kalau mau beres dan benar, harus dikerjakan sendiri.'",
      de: "Mein Lebensmotto lautet: 'Wenn du willst, dass etwas richtig gemacht wird, mach es selbst.'",
      fr: "Ma devise est : 'On n'est jamais si bien servi que par soi-même.'",
      es: "Mi lema de vida es: 'Si quieres algo bien hecho, hazlo tú mismo.'",
    },
    options: [
      {
        score: 0,
        label: {
          en: "Disagree — I trust team members and partners to do things their way",
          id: "Tidak setuju — Aku percaya tim dan pasangan bisa menyelesaikannya dengan cara mereka",
          de: "Stimme nicht zu — Ich vertraue anderen und lasse ihnen Freiraum",
          fr: "Pas d'accord — Je fais confiance aux autres pour agir à leur manière",
          es: "En desacuerdo — Confío en mi equipo y en mi pareja para hacer las cosas",
        },
      },
      {
        score: 1,
        label: {
          en: "Sometimes — only on high-precision personal projects",
          id: "Kadang — hanya untuk proyek pribadi berakurasi tinggi",
          de: "Manchmal — nur bei hochsensiblen Aufgaben",
          fr: "Parfois — seulement sur des dossiers très précis",
          es: "A veces — solo en tareas muy críticas o personales",
        },
      },
      {
        score: 2,
        label: {
          en: "Often — micromanaging or taking over chores feels safer than relying on others",
          id: "Sering — mengambil alih tugas terasa lebih tenang daripada mengandalkan orang lain",
          de: "Oft — Aufgaben an mich zu reißen fühlt sich sicherer an",
          fr: "Souvent — tout reprendre en main me rassure davantage que de déléguer",
          es: "A menudo — asumir las tareas me parece más seguro que depender del resto",
        },
      },
      {
        score: 3,
        label: {
          en: "Always — chronic inability to delegate leaves me constantly burdened",
          id: "Selalu — ketidakmampuan mendelegasikan membuatku terus-menerus kelebihan beban",
          de: "Immer — Unfähigkeit zu delegieren führt zu permanenter Überlastung",
          fr: "Toujours — mon incapacité à déléguer me surcharge en permanence",
          es: "Siempre — mi incapacidad para delegar me mantiene en sobrecarga constante",
        },
      },
    ],
  },
  {
    id: 3,
    subscale: "solitary_armor",
    prompt: {
      en: "When someone offers me a favor, gift, or assistance, I feel an immediate uncomfortable urge to repay them immediately so I am not indebted.",
      id: "Saat seseorang memberi bantuan atau hadiah, aku langsung merasa risih ingin segera membalasnya agar tidak berutang budi.",
      de: "Wenn mir jemand hilft oder etwas schenkt, will ich sofort die Schuld begleichen, um nicht in der Kreide zu stehen.",
      fr: "Quand quelqu'un m'offre son aide ou un cadeau, j'éprouve l'urgence de rendre la pareille pour ne rien devoir.",
      es: "Cuando alguien me hace un favor o regalo, siento la necesidad urgente de devolverlo para no estar en deuda.",
    },
    options: [
      {
        score: 0,
        label: {
          en: "Disagree — I receive generosity gracefully without keeping a ledger",
          id: "Tidak setuju — Aku menerima kebaikan dengan ikhlas tanpa mencatat utang budi",
          de: "Stimme nicht zu — Ich nehme Geschenke ohne inneres Buchführen an",
          fr: "Pas d'accord — J'accepte la générosité sans tenir de registre de dettes",
          es: "En desacuerdo — Recibo los gestos generosos sin llevar cuentas pendientes",
        },
      },
      {
        score: 1,
        label: {
          en: "Mild social etiquette — I look for a nice opportunity to treat them back later",
          id: "Etika wajar — Aku mencari kesempatan santai untuk mentraktir mereka nanti",
          de: "Normale Höflichkeit — Ich revanchiere mich bei Gelegenheit",
          fr: "Simple politesse — Je renvoie l'ascenseur à l'occasion",
          es: "Cortesía habitual — Busco la ocasión de corresponder cuando se dé",
        },
      },
      {
        score: 2,
        label: {
          en: "Strong discomfort — being in debt to anyone makes my stomach churn",
          id: "Sangat tidak nyaman — berutang budi pada orang membuat perutku mulas gelisah",
          de: "Starkes Unbehagen — jemandem etwas zu schulden, quält mich innerlich",
          fr: "Vif malaise — devoir quelque chose à quelqu'un m'angoisse",
          es: "Gran incomodidad — estar en deuda con alguien me produce inquietud física",
        },
      },
      {
        score: 3,
        label: {
          en: "Zero tolerance — I refuse favors because owing anyone is a threat to my survival",
          id: "Nol toleransi — Aku menolak bantuan karena berutang budi adalah ancaman bagi keamananku",
          de: "Nulltoleranz — Ich lehne Gefallen ab; Abhängigkeit ist eine Existenzbedrohung",
          fr: "Refus catégorique — Je refuse toute aide car dépendre de quelqu'un est un danger vital",
          es: "Tolerancia cero — Rechazo favores porque depender de otros amenaza mi seguridad",
        },
      },
    ],
  },
  {
    id: 4,
    subscale: "solitary_armor",
    prompt: {
      en: "I pride myself on being the 'strong one' who supports everyone else while never letting anyone see my own cracks.",
      id: "Aku bangga menjadi sosok 'yang paling tegar' penopang semua orang tanpa membiarkan siapa pun melihat kerapuhanku.",
      de: "Ich bin stolz darauf, der Fels in der Brandung zu sein, der nie Schwäche zeigt.",
      fr: "Je suis fier d'être le pilier solide pour tous sans jamais laisser paraître mes propres failles.",
      es: "Me enorgullece ser el pilar fuerte de todos sin permitir jamás que nadie vea mis grietas.",
    },
    options: [
      {
        score: 0,
        label: {
          en: "Disagree — strength includes knowing when to lean on friends",
          id: "Tidak setuju — kekuatan sejati mencakup tahu kapan harus bersandar pada teman",
          de: "Stimme nicht zu — Wahre Stärke bedeutet auch, sich anlehnen zu können",
          fr: "Pas d'accord — La vraie force consiste aussi à savoir s'appuyer sur les autres",
          es: "En desacuerdo — La verdadera fortaleza incluye saber apoyarse en los demás",
        },
      },
      {
        score: 1,
        label: {
          en: "Sometimes — mostly at work or within family leadership roles",
          id: "Kadang — terutama di kantor atau sebagai anak tertua di keluarga",
          de: "Manchmal — besonders in der Führungsrolle im Beruf oder in der Familie",
          fr: "Parfois — surtout dans mes responsabilités professionnelles ou familiales",
          es: "A veces — sobre todo en el trabajo o en mi rol familiar",
        },
      },
      {
        score: 2,
        label: {
          en: "Frequently — showing tears or distress in front of others feels deeply humiliating",
          id: "Sering — menangis atau tampak rapuh di depan orang terasa sangat memalukan",
          de: "Häufig — Tränen vor anderen zu zeigen, fühlt sich wie eine Demütigung an",
          fr: "Souvent — pleurer ou craquer devant autrui m'apparaît comme une humiliation",
          es: "A menudo — llorar o mostrar dolor ante otros me parece humillante",
        },
      },
      {
        score: 3,
        label: {
          en: "Emotional armor — I only cry when completely alone behind locked doors",
          id: "Baju zirah emosional — Aku hanya menangis saat benar-benar sendirian di kamar terkunci",
          de: "Eiserner Schutzpanzer — Ich weine ausschließlich hinter verschlossenen Türen",
          fr: "Armure totale — Je ne m'autorise à pleurer que seul à huis clos",
          es: "Blindaje absoluto — Solo me permito llorar a solas y con la puerta cerrada",
        },
      },
    ],
  },

  // Subscale 2: Vulnerability Phobia (Fear of emotional dependency)
  {
    id: 5,
    subscale: "vulnerability_phobia",
    prompt: {
      en: "Admitting that I am lonely, sad, or need comfort feels like giving someone a weapon to destroy me.",
      id: "Mengakui bahwa aku kesepian, sedih, atau butuh dipeluk terasa seperti memberi orang lain senjata untuk menusukku.",
      de: "Zuzugeben, dass ich einsam oder traurig bin, fühlt sich an, als gäbe ich jemandem eine Waffe gegen mich.",
      fr: "Avouer que je me sens seul ou vulnérable donne l'impression d'offrir une arme pour me détruire.",
      es: "Admitir que me siento solo, triste o necesitado de cariño se siente como entregar un arma para herirme.",
    },
    options: [
      {
        score: 0,
        label: {
          en: "Disagree — emotional sharing fosters safety and intimacy",
          id: "Tidak setuju — berbagi emosi membangun rasa aman dan kedekatan",
          de: "Stimme nicht zu — Emotionale Offenheit schafft Vertrauen und Bindung",
          fr: "Pas d'accord — Partager ses émotions crée du lien et de la sécurité",
          es: "En desacuerdo — Compartir lo que siento construye confianza e intimidad",
        },
      },
      {
        score: 1,
        label: {
          en: "Only with 1 or 2 deeply vetted lifelong confidants",
          id: "Hanya pada 1 atau 2 sahabat terdekat yang sudah teruji bertahun-tahun",
          de: "Nur bei 1-2 langjährigen, absolut vertrauten Freunden",
          fr: "Seulement avec une ou deux personnes de confiance absolue",
          es: "Solo con una o dos personas íntimas muy probadas",
        },
      },
      {
        score: 2,
        label: {
          en: "Frequently — I deflect serious inquiries about my well-being with 'I'm fine!'",
          id: "Sering — Aku menangkis pertanyaan serius tentang keadaanku dengan 'Aku nggak apa-apa!'",
          de: "Häufig — Ich blocke Fragen nach meinem Befinden reflexartig mit 'Alles gut!' ab",
          fr: "Souvent — J'élude les questions sincères avec un rapide 'Tout va bien !'",
          es: "A menudo — Esquivo las preguntas sinceras con un automático '¡Todo bien!'",
        },
      },
      {
        score: 3,
        label: {
          en: "Complete emotional secrecy — nobody truly knows the extent of my internal suffering",
          id: "Kerahasiaan emosi mutlak — tak seorang pun tahu seberapa berat derita batinku",
          de: "Totale Geheimhaltung — niemand ahnt die wahre Tiefe meines inneren Kampfes",
          fr: "Secret absolu — personne ne soupçonne l'ampleur de mes blessures intérieures",
          es: "Hermetismo total — nadie conoce la verdadera magnitud de mi dolor interno",
        },
      },
    ],
  },
  {
    id: 6,
    subscale: "vulnerability_phobia",
    prompt: {
      en: "I would rather suffer in silence or let a problem escalate than ask someone who might sigh, complain, or make me feel like a burden.",
      id: "Aku lebih baik menderita dalam diam daripada minta tolong pada orang yang mungkin menghela napas atau menganggapku beban.",
      de: "Ich leide lieber still, als jemanden zu fragen, der stöhnt oder mir das Gefühl gibt, eine Last zu sein.",
      fr: "Je préfère souffrir en silence plutôt que de déranger quelqu'un qui pourrait soupirer.",
      es: "Prefiero aguantar en silencio antes que pedir un favor a alguien que pueda quejarse o hacerme sentir una carga.",
    },
    options: [
      {
        score: 0,
        label: {
          en: "Disagree — healthy relationships willingly support each other",
          id: "Tidak setuju — hubungan yang sehat saling mendukung tanpa mengeluh",
          de: "Stimme nicht zu — In gesunden Beziehungen hilft man sich gern",
          fr: "Pas d'accord — Dans une relation saine, l'entraide est naturelle",
          es: "En desacuerdo — En los vínculos sanos el apoyo mutuo es grato",
        },
      },
      {
        score: 1,
        label: {
          en: "Only if the person is visibly stressed or busy",
          id: "Hanya jika orang tersebut sedang tampak stres atau sibuk",
          de: "Nur wenn die Person sichtlich gestresst ist",
          fr: "Seulement si l'autre est déjà surchargé",
          es: "Solo si la otra persona está visiblemente ocupada o agobiada",
        },
      },
      {
        score: 2,
        label: {
          en: "Frequently — the terror of being seen as needy keeps me locked in silence",
          id: "Sering — ketakutan dianggap merepotkan membuatku membisu",
          de: "Häufig — Die Angst, bedürftig zu wirken, zwingt mich zum Schweigen",
          fr: "Souvent — La terreur de paraître dépendant me réduit au silence",
          es: "A menudo — El pánico a parecer necesitado me encierra en el silencio",
        },
      },
      {
        score: 3,
        label: {
          en: "Severe — I would rather lose an opportunity or money than ask anyone for a lifeline",
          id: "Sangat parah — Aku lebih rela kehilangan peluang atau uang daripada minta diselamatkan",
          de: "Massiv — Ich verliere lieber Geld oder Chancen, als um Beistand zu bitten",
          fr: "Extrême — Je préfère perdre de l'argent ou une opportunité que d'appeler à l'aide",
          es: "Extremo — Prefiero perder dinero o una oportunidad antes que pedir un salvavidas",
        },
      },
    ],
  },
  {
    id: 7,
    subscale: "vulnerability_phobia",
    prompt: {
      en: "I keep romantic partners at a comfortable distance by intellectualizing relationships or maintaining strict financial and logistical separation.",
      id: "Aku menjaga jarak aman dari pasangan dengan merasionalkan hubungan atau memisahkan urusan finansial secara kaku.",
      de: "Ich halte Partner auf Distanz, indem ich Finanzen und Alltag strikt trenne und Gefühle analysiere.",
      fr: "Je maintiens mes partenaires à distance en intellectualisant la relation et en cloisonnant mes finances.",
      es: "Mantengo a mi pareja a cierta distancia mentalizando el vínculo o separando rígidamente finanzas y rutinas.",
    },
    options: [
      {
        score: 0,
        label: {
          en: "Disagree — I enjoy healthy sharing of life, finances, and emotions",
          id: "Tidak setuju — Aku menikmati berbagi hidup, finansial, dan emosi secara sehat",
          de: "Stimme nicht zu — Ich teile Leben, Alltag und Gefühle gern",
          fr: "Pas d'accord — J'apprécie le partage équilibré de ma vie et de mes sentiments",
          es: "En desacuerdo — Disfruto compartiendo proyectos, vida y emociones",
        },
      },
      {
        score: 1,
        label: {
          en: "Prudent boundaries — I protect my independence while remaining loving",
          id: "Batasan wajar — Aku menjaga kemandirianku tapi tetap penuh kasih",
          de: "Gesunde Vorsicht — Ich wahren Freiraum bei voller Zuneigung",
          fr: "Prudence saine — Je garde mon indépendance tout en étant investi",
          es: "Prudencia sana — Cuido mi espacio sin escatimar afecto",
        },
      },
      {
        score: 2,
        label: {
          en: "Often — merging bank accounts, sharing keys, or joint plans triggers claustrophobia",
          id: "Sering — berbagi rekening, kunci rumah, atau rencana masa depan memicu rasa terkekang",
          de: "Oft — Gemeinsame Konten oder Wohnungsschlüssel lösen Engegefühle aus",
          fr: "Souvent — Partager les comptes ou s'installer ensemble m'étouffe",
          es: "A menudo — Compartir cuentas o convivir me despierta cierta claustrofobia",
        },
      },
      {
        score: 3,
        label: {
          en: "Total compartmentalization — I ensure I can pack a bag and leave at a moment's notice",
          id: "Kompartementalisasi total — Aku selalu siap mengemas koper dan pergi dalam hitungan menit",
          de: "Totale Fluchtbereitschaft — Ich bin jederzeit bereit, meine Koffer zu packen",
          fr: "Parage d'urgence — Je m'assure de pouvoir partir sur-le-champ sans dépendre de personne",
          es: "Preparado para la fuga — Me aseguro de poder hacer la maleta y marcharme en cualquier momento",
        },
      },
    ],
  },
  {
    id: 8,
    subscale: "vulnerability_phobia",
    prompt: {
      en: "I feel an intense surge of irritation or disgust when someone is openly dependent, needy, or helpless around me.",
      id: "Aku merasa risih dan kesal saat melihat seseorang yang manja, sangat bergantung, atau tampak tak berdaya.",
      de: "Ich reagiere genervt oder fast angewidert, wenn andere unselbstständig oder hilflos wirken.",
      fr: "Je ressens de l'irritation ou du mépris face aux personnes dépendantes ou plaintives.",
      es: "Siento irritación o rechazo cuando alguien se muestra excesivamente dependiente o quejicoso.",
    },
    options: [
      {
        score: 0,
        label: {
          en: "Disagree — I feel compassion for human vulnerability and struggle",
          id: "Tidak setuju — Aku merasa iba dan berempati pada kerapuhan manusia",
          de: "Stimme nicht zu — Ich empfinde Mitgefühl für menschliche Schwächen",
          fr: "Pas d'accord — J'ai de la compassion pour la vulnérabilité d'autrui",
          es: "En desacuerdo — Siento empatía y ternura ante la fragilidad ajena",
        },
      },
      {
        score: 1,
        label: {
          en: "Only if the person refuses to take any steps to help themselves",
          id: "Hanya jika orang tersebut sama sekali tidak mau berusaha menolong diri sendiri",
          de: "Nur wenn jemand sich weigert, sich selbst zu helfen",
          fr: "Seulement si la personne ne fait aucun effort pour s'en sortir",
          es: "Solo si la persona no hace ningún esfuerzo por ayudarse",
        },
      },
      {
        score: 2,
        label: {
          en: "Frequently — seeing someone express need triggers my own suppressed desire for care",
          id: "Sering — melihat orang butuh perhatian memicu rasa benci pada kerentanan diriku sendiri",
          de: "Häufig — Die Bedürftigkeit anderer triggert meine eigene verdrängte Sehnsucht",
          fr: "Souvent — Voir quelqu'un réclamer de l'aide réveille mes propres manques refoulés",
          es: "A menudo — La dependencia ajena activa mi propio deseo reprimido de ser cuidado",
        },
      },
      {
        score: 3,
        label: {
          en: "Strong contempt — I view reliance on others as a fatal character weakness",
          id: "Kekecewaan tajam — Aku memandang ketergantungan pada orang lain sebagai kelemahan fatal",
          de: "Harte Verachtung — Abhängigkeit von anderen ist für mich Charakterschwäche",
          fr: "Mépris viscéral — Dépendre des autres me semble une faiblesse inexcusable",
          es: "Desprecio visceral — Considero depender de alguien como una debilidad inaceptable",
        },
      },
    ],
  },

  // Subscale 3: Threat Detection & Relational Mistrust
  {
    id: 9,
    subscale: "threat_detection",
    prompt: {
      en: "Deep down, I believe that when push comes to shove, nobody is truly coming to save me; I only have myself.",
      id: "Jauh di lubuk hati, aku percaya pada akhirnya tak ada yang benar-benar akan menyelamatkanku; cuma ada diriku sendiri.",
      de: "Tief im Inneren glaube ich: Wenn es hart auf hart kommt, hilft mir niemand – ich habe nur mich.",
      fr: "Au fond, je suis convaincu qu'en cas de crise, personne ne viendra me sauver ; je ne peux compter que sur moi.",
      es: "En el fondo creo que a la hora de la verdad nadie vendrá a salvarme; solo me tengo a mí mismo.",
    },
    options: [
      {
        score: 0,
        label: {
          en: "Disagree — I have a reliable community and loved ones who show up",
          id: "Tidak setuju — Aku punya keluarga dan sahabat setia yang siap menolong",
          de: "Stimme nicht zu — Ich habe verlässliche Menschen, die für mich da sind",
          fr: "Pas d'accord — J'ai un entourage solide sur qui je peux compter",
          es: "En desacuerdo — Cuento con personas fiables que están cuando las necesito",
        },
      },
      {
        score: 1,
        label: {
          en: "Healthy caution — I am self-reliant, but know I have a support network",
          id: "Kehati-hatian sehat — Aku mandiri, tapi tahu punya jaring pengaman teman",
          de: "Gesunde Vorsicht — Ich bin selbstständig, kenne aber mein Netz",
          fr: "Prudence modérée — Je suis autonome mais conscient de mon filet de sécurité",
          es: "Prudencia sana — Soy autónomo pero sé que tengo apoyos",
        },
      },
      {
        score: 2,
        label: {
          en: "Often — past abandonments proved that depending on anyone leads to disappointment",
          id: "Sering — pengalaman ditinggalkan di masa lalu membuktikan bergantung pada orang hanya berujung kecewa",
          de: "Oft — Frühere Enttäuschungen lehrten mich, dass Verlass wehtut",
          fr: "Souvent — Des trahisons passées m'ont appris qu'attendre après les autres déçoit toujours",
          es: "A menudo — Decepciones pasadas me enseñaron que confiar en otros acaba mal",
        },
      },
      {
        score: 3,
        label: {
          en: "Core survival belief — total self-reliance is the sole shield against destruction",
          id: "Prinsip bertahan hidup mutlak — kemandirian total adalah satu-satunya perisai dari kehancuran",
          de: "Felsenfestes Überlebensdogma — absolute Eigenständigkeit ist mein einziger Schutz",
          fr: "Dogme vital — l'autosuffisance totale est mon unique rempart contre le chaos",
          es: "Dogma vital básico — la autosuficiencia absoluta es mi único escudo contra la ruina",
        },
      },
    ],
  },
  {
    id: 10,
    subscale: "threat_detection",
    prompt: {
      en: "As a child, I had to grow up too quickly, take care of myself (or parents/siblings), and learned that adults were unreliable or unsafe.",
      id: "Waktu kecil, aku terpaksa dewasa sebelum waktunya, mengurus diri (atau orang tua/adik), dan belajar orang dewasa tidak bisa diandalkan.",
      de: "Als Kind musste ich zu schnell erwachsen werden und lernte, dass Erwachsene unzuverlässig waren.",
      fr: "Enfant, j'ai dû grandir trop vite, me débrouiller seul et apprendre que les adultes étaient peu fiables.",
      es: "De niño tuve que madurar demasiado rápido, cuidarme solo y aprendí que los adultos fallaban.",
    },
    options: [
      {
        score: 0,
        label: {
          en: "Disagree — my childhood caregivers were safe, responsive, and dependable",
          id: "Tidak setuju — orang tuaku di masa kecil aman, responsif, dan bisa diandalkan",
          de: "Stimme nicht zu — Meine Bezugspersonen waren verlässlich und da",
          fr: "Pas d'accord — Mes parents étaient présents, fiables et protecteurs",
          es: "En desacuerdo — Mis cuidadores fueron figuras seguras y presentes",
        },
      },
      {
        score: 1,
        label: {
          en: "Mild parentification — elder sibling duties, but mostly supported",
          id: "Tanggung jawab anak sulung wajar, tapi tetap mendapat kasih sayang",
          de: "Leichte Erstgeborenen-Pflichten, aber insgesamt geborgen",
          fr: "Responsabilités d'aîné classiques, mais entouré avec amour",
          es: "Responsabilidades normales de hermano mayor, pero bien arropado",
        },
      },
      {
        score: 2,
        label: {
          en: "Substantial emotional parentification — I became the emotional anchor for my family",
          id: "Parentifikasi emosional cukup berat — Aku menjadi penopang emosi orang tua dan rumah",
          de: "Spürbare Parentifizierung — Ich war der emotionale Anker für die Familie",
          fr: "Parentification marquée — Je suis devenu le pilier émotionnel du foyer",
          es: "Parentificación clara — Me convertí en el sostén emocional de mi casa",
        },
      },
      {
        score: 3,
        label: {
          en: "Severe developmental neglect/trauma — I was my own parent and had zero safety net",
          id: "Trauma pengabaian masa kecil parah — Aku mengasuh diriku sendiri tanpa ada jaring pengaman",
          de: "Schweres Entwicklungstrauma — Ich musste mich selbst erziehen, ohne jeden Schutz",
          fr: "Traumatisme d'abandon — J'ai dû m'élever tout seul sans aucun filet de sécurité",
          es: "Negligencia o trauma temprano — Tuve que criarme solo sin ninguna red de protección",
        },
      },
    ],
  },
  {
    id: 11,
    subscale: "threat_detection",
    prompt: {
      en: "I panic when I do not have absolute financial, logistical, and physical control over my life.",
      id: "Aku panik jika tidak memegang kendali mutlak atas keuangan, logistik, dan hidupku sendiri.",
      de: "Ich gerate in Panik, wenn ich nicht die totale finanzielle und praktische Kontrolle behalte.",
      fr: "Je panique dès que je perds le contrôle absolu sur mes finances ou mon organisation.",
      es: "Entro en pánico si no tengo el control absoluto sobre mis finanzas, tiempos y vida personal.",
    },
    options: [
      {
        score: 0,
        label: {
          en: "Disagree — I can flow with uncertainty and share financial responsibilities",
          id: "Tidak setuju — Aku bisa fleksibel dengan ketidakpastian dan berbagi urusan finansial",
          de: "Stimme nicht zu — Ich kann Ungewissheit aushalten und Verantwortung teilen",
          fr: "Pas d'accord — Je tolère l'imprévu et partage les responsabilités sans stress",
          es: "En desacuerdo — Tolero la incertidumbre y comparto responsabilidades con calma",
        },
      },
      {
        score: 1,
        label: {
          en: "Normal financial caution — emergency savings bring me peace of mind",
          id: "Kehati-hatian normal — dana darurat memberiku ketenangan pikiran",
          de: "Gesunde Vorsorge — Ein Notgroschen beruhigt mich",
          fr: "Prudence financière normale — une réserve de sécurité me rassure",
          es: "Prudencia económica normal — tener un colchón de ahorros me da paz",
        },
      },
      {
        score: 2,
        label: {
          en: "Frequently — sharing decisions feels like standing on a crumbling ledge",
          id: "Sering — berbagi keputusan dengan orang lain terasa seperti berdiri di tebing rapuh",
          de: "Häufig — Entscheidungen abzugeben, fühlt sich wie Kontrollverlust an",
          fr: "Souvent — Partager les décisions importantes me donne le vertige",
          es: "A menudo — Compartir decisiones importantes me produce una fuerte ansiedad",
        },
      },
      {
        score: 3,
        label: {
          en: "Extreme control compulsion — having to rely on someone else's money or decision is terrifying",
          id: "Kompulsi kontrol ekstrem — harus bergantung pada uang atau keputusan orang lain membuatku ngeri",
          de: "Extremer Kontrollzwang — von fremdem Geld oder Willen abzuhängen, ist unerträglich",
          fr: "Besoin de contrôle obsessionnel — dépendre de l'argent ou du bon vouloir d'un autre me terrifie",
          es: "Compulsión extrema de control — depender del dinero o decisiones de otro me aterra",
        },
      },
    ],
  },
  {
    id: 12,
    subscale: "threat_detection",
    prompt: {
      en: "Whenever someone offers kindness, I instinctively search for their hidden agenda or ulterior motive.",
      id: "Saat ada orang berbuat baik padaku, insting pertamaku adalah mencari udang di balik batu.",
      de: "Wenn jemand freundlich zu mir ist, suche ich sofort nach dem Haken oder Hintergedanken.",
      fr: "Quand quelqu'un se montre gentil, je cherche immédiatement où est le piège ou l'arrière-pensée.",
      es: "Cuando alguien es amable conmigo, busco instintivamente la trampa o el interés oculto.",
    },
    options: [
      {
        score: 0,
        label: {
          en: "Disagree — I believe people are generally genuine and benevolent",
          id: "Tidak setuju — Aku percaya pada dasarnya orang tulus dan bermaksud baik",
          de: "Stimme nicht zu — Ich glaube an ehrliche menschliche Herzlichkeit",
          fr: "Pas d'accord — Je crois en la bienveillance sincère des gens",
          es: "En desacuerdo — Creo en la buena fe y calidez genuina de las personas",
        },
      },
      {
        score: 1,
        label: {
          en: "Rarely — only with known manipulators or salesmen",
          id: "Jarang — hanya pada orang yang memang terkenal manipulatif atau sales",
          de: "Selten — nur bei offensichtlich geschäftlichen Interessen",
          fr: "Rarement — seulement face à des inconnus insistants",
          es: "Rara vez — solo ante perfiles sospechosos o comerciales",
        },
      },
      {
        score: 2,
        label: {
          en: "Often — unconditional kindness feels suspicious and makes my alarm bells ring",
          id: "Sering — kebaikan tanpa syarat terasa mencurigakan dan menyalakan alarm waspadaku",
          de: "Oft — Bedingungslose Freundlichkeit macht mich skeptisch",
          fr: "Souvent — La gentillesse gratuite éveille mes soupçons",
          es: "A menudo — La amabilidad sin condiciones me despierta sospechas",
        },
      },
      {
        score: 3,
        label: {
          en: "Chronic hyper-vigilance — I assume every gift comes with a suffocating price tag",
          id: "Kewaspadaan hiperaktif kronis — Aku menganggap setiap kebaikan pasti ada pamrih yang menjerat",
          de: "Chronische Wachsamkeit — Ich erwarte hinter jedem Geschenk eine böse Falle",
          fr: "Hyper-vigilance constante — Je pense que tout cadeau cache un lourd tribut à payer",
          es: "Hipervigilancia crónica — Asumo que todo favor viene con una factura oculta",
        },
      },
    ],
  },
];

export const HYPER_INDEPENDENCE_ARCHETYPES: Record<
  HyperIndependenceArchetype["level"],
  HyperIndependenceArchetype
> = {
  interdependent_secure: {
    level: "interdependent_secure",
    badge: {
      en: "Interdependent & Secure",
      id: "Mandiri & Terhubung",
      de: "Interdependent & Sicher",
      fr: "Interdépendant & Serein",
      es: "Interdependiente y Seguro",
    },
    title: {
      en: "The Interdependent & Secure Connector",
      id: "Kemandirian Sehat yang Terhubung Aman",
      de: "Der sicher verbundene Gestalter",
      fr: "L'Autonome Serein et Lié",
      es: "El Conector Seguro e Interdependiente",
    },
    tagline: {
      en: "Capable of stand-alone competence without fearing vulnerability or needing to prove total isolation.",
      id: "Mampu mandiri secara kompeten tanpa takut membuka diri atau merasa harus mengisolasi diri.",
      de: "Eigenständig kompetent, ohne Angst vor Nähe oder den Zwang zur totalen Isolation.",
      fr: "Pleinement compétent sans craindre la vulnérabilité ni fuir l'aide d'autrui.",
      es: "Competente y autónomo sin miedo a la cercanía ni necesidad de aislarse.",
    },
    description: {
      en: "You have achieved true psychological maturity: healthy interdependence. You can solve problems on your own, yet feel zero shame or anxiety in asking for support, delegating tasks, or accepting comfort. You know that human beings are wired for mutual support.",
      id: "Kamu telah mencapai kematangan psikologis sejati: interdependensi yang sehat. Kamu sanggup menyelesaikan masalah sendiri, namun tak merasa malu atau cemas saat butuh bantuan, mendelegasikan tugas, atau dipeluk saat sedih. Kamu paham manusia memang diciptakan untuk saling menopang.",
      de: "Du lebst gesunde Reife: echte Interdependenz. Du meisterst dein Leben allein, schämst dich aber nicht, um Trost zu bitten, Aufgaben abzugeben oder Unterstützung anzunehmen.",
      fr: "Vous avez atteint une saine maturité : l'interdépendance équilibrée. Vous savez vous débrouiller seul, mais accueillez l'aide et le soutien sans gêne.",
      es: "Has alcanzado la madurez psicológica: interdependencia sana. Sabes resolver tus cosas solo, pero pides apoyo, delegas y te dejas cuidar sin vergüenza.",
    },
    psychologyInsight: {
      en: "Neuroscience proves that co-regulation—letting trusted partners soothe our nervous systems—lowers baseline cortisol 40% faster than solitary self-soothing alone.",
      id: "Neurosains membuktikan bahwa ko-regulasi—membiarkan orang terpercaya menenangkan saraf kita—menurunkan kortisol 40% lebih cepat dibanding menanggungnya sendirian.",
      de: "Studien belegen: Co-Regulation mit vertrauten Menschen senkt das Stresshormon Cortisol 40 % schneller als rein isolierte Selbstberuhigung.",
      fr: "La corégulation émotionnelle avec un proche de confiance apaise le cortisol 40 % plus rapidement que l'auto-apaisement solitaire.",
      es: "La neurociencia demuestra que la corregulación con seres queridos reduce el cortisol un 40% más rápido que lidiar con el dolor en soledad.",
    },
    actionProtocols: {
      en: [
        "Continue cultivating reciprocal relationships where both giving and receiving flow naturally.",
        "Model asking for small favors to help friends feel valued and trusted.",
        "Celebrate vulnerability as an act of courageous connection.",
      ],
      id: [
        "Terus bina hubungan timbal balik di mana memberi dan menerima berjalan seimbang.",
        "Latih meminta bantuan kecil pada teman agar mereka merasa dihargai dan dipercaya.",
        "Rayakan kerentanan diri sebagai wujud keberanian membangun ikatan tulus.",
      ],
      de: [
        "Pflege weiterhin Beziehungen, in denen Geben und Nehmen im Gleichgewicht stehen.",
        "Bitte Freunde gelegentlich um Gefallen, damit sie sich gebraucht und geschätzt fühlen.",
        "Lebe Offenheit als mutigen Ausdruck von Verbundenheit vor.",
      ],
      fr: [
        "Continuez d'entretenir des liens où donner et recevoir s'équilibrent avec fluidité.",
        "Demandez de petits services pour témoigner de votre confiance envers vos proches.",
        "Honorez la vulnérabilité comme un acte courageux de connexion.",
      ],
      es: [
        "Sigue cultivando relaciones donde dar y recibir fluyan en equilibrio natural.",
        "Pide pequeños favores a tus amigos para que se sientan valorados y cercanos.",
        "Valora la vulnerabilidad como una muestra valiente de conexión humana.",
      ],
    },
    dailyAffirmation: {
      en: "I am strong enough to stand alone and wise enough to lean on those I love.",
      id: "Aku cukup kuat untuk berdiri sendiri dan cukup bijak untuk bersandar pada orang yang kusayangi.",
      de: "Ich bin stark genug, allein zu stehen, und weise genug, mich anlehnen zu können.",
      fr: "Je suis assez fort pour être autonome et assez sage pour accepter l'amour des miens.",
      es: "Soy lo bastante fuerte para valerme solo y lo bastante sabio para apoyarme en quienes me aman.",
    },
  },

  self_reliant_striver: {
    level: "self_reliant_striver",
    badge: {
      en: "Self-Reliant Striver",
      id: "Pejuang Mandiri",
      de: "Selbstständiger Macher",
      fr: "Débrouillard Ambitieux",
      es: "Luchador Autosuficiente",
    },
    title: {
      en: "The Self-Reliant Striver",
      id: "Pejuang Mandiri yang Ambisius",
      de: "Der selbstständige Macher",
      fr: "L'Autonome Combatif",
      es: "El Luchador Autosuficiente",
    },
    tagline: {
      en: "Strong DIY ethic, but occasionally suffers from exhaustion because delegation feels inefficient.",
      id: "Etos kemandirian tinggi, namun sesekali lelah karena merasa mendelegasikan tugas itu kurang efisien.",
      de: "Starke Macher-Mentalität, gerät jedoch ins Schleudern, weil Abgeben schwerfällt.",
      fr: "Forte éthique d'autonomie, mais fatigue passagère car déléguer lui semble inefficace.",
      es: "Gran capacidad de resolución, pero con picos de cansancio por resistencia a delegar.",
    },
    description: {
      en: "You are highly capable and take immense satisfaction in your accomplishments. However, you often fall into the trap of doing everything yourself because explaining it to someone else feels like more work. You can accept help, but your default setting is solo action.",
      id: "Kamu sangat kompeten dan bangga atas kemampuanmu membereskan segala hal. Namun kamu sering terjebak mengerjakan semuanya sendiri karena merasa menjelaskan pada orang lain justru bikin repot. Kamu bisa menerima bantuan, tapi setelan pabrikmu adalah berjuang sendirian.",
      de: "Du bist überdurchschnittlich kompetent und packst Dinge gern an. Oft machst du jedoch alles allein, weil Erklären sich wie Zeitverschwendung anfühlt. Du kannst Hilfe annehmen, dein Standard ist aber der Alleingang.",
      fr: "Très compétent, vous aimez résoudre les problèmes par vous-même. Vous tombez parfois dans le piège de tout porter car former quelqu'un vous paraît trop long.",
      es: "Eres resolutivo y eficiente. Sin embargo, tiendes a cargártelo todo a la espalda porque explicarlo a otro te parece más lento que hacerlo tú.",
    },
    psychologyInsight: {
      en: "This reflects high cognitive conscientiousness coupled with slight control resistance: delegating requires surrendering perfectionism.",
      id: "Ini mencerminkan kepribadian conscientiousness tinggi yang dibayangi keengganan melepas kendali: mendelegasikan tugas menuntutmu merelakan perfeksionisme.",
      de: "Dies zeigt hohe Gewissenhaftigkeit gepaart mit Kontrollbedürfnis: Abgeben erfordert das Loslassen von Perfektionismus.",
      fr: "Ce profil allie grande rigueur et besoin de contrôle : déléguer exige de renoncer au perfectionnisme absolu.",
      es: "Combina alta responsabilidad con apego al control: delegar exige soltar el perfeccionismo.",
    },
    actionProtocols: {
      en: [
        "Practice the '80% Rule': allow someone else to complete a task even if they do it slightly differently.",
        "Delegate one small task each week explicitly to build tolerance for shared effort.",
        "Remind yourself that asking for help is an efficiency tool, not an admission of incompetence.",
      ],
      id: [
        "Terapkan 'Aturan 80%': biarkan orang lain mengerjakan tugas meski caranya sedikit berbeda darimu.",
        "Delegasikan satu tugas kecil per minggu untuk melatih toleransimu terhadap kerja tim.",
        "Ingatkan dirimu bahwa meminta bantuan adalah alat efisiensi cerdas, bukan bukti ketidakmampuan.",
      ],
      de: [
        "Nutze die '80%-Regel': Lass andere Aufgaben erledigen, auch wenn sie es anders machen als du.",
        "Delegiere jede Woche bewusst eine kleine Aufgabe, um Teamvertrauen zu üben.",
        "Erinnere dich: Hilfe annehmen ist kluge Ressourcennutzung, kein Versagen.",
      ],
      fr: [
        "Appliquez la 'règle des 80%' : laissez autrui agir même si sa méthode diffère de la vôtre.",
        "Déléguez une petite tâche par semaine pour apprivoiser le travail partagé.",
        "Rappelez-vous que demander de l'aide est un levier d'efficacité, pas un constat d'échec.",
      ],
      es: [
        "Aplica la 'regla del 80%': permite que otros hagan las cosas a su manera aunque no sea perfecta.",
        "Delega una pequeña tarea por semana para entrenar tu confianza en el equipo.",
        "Recuerda que pedir apoyo es optimizar tu energía, no una muestra de incapacidad.",
      ],
    },
    dailyAffirmation: {
      en: "Allowing others to support me does not diminish my competence; we go farther together.",
      id: "Menerima bantuan orang lain tidak mengurangi kehebatanku; kita melangkah lebih jauh bersama.",
      de: "Hilfe zuzulassen schmälert mein Können nicht; gemeinsam kommen wir weiter.",
      fr: "Laisser les autres m'épauler ne diminue en rien ma valeur ; ensemble, on va plus loin.",
      es: "Dejar que otros me apoyen no resta valor a mis capacidades; juntos llegamos más lejos.",
    },
  },

  guarded_lone_wolf: {
    level: "guarded_lone_wolf",
    badge: {
      en: "Guarded Lone Wolf",
      id: "Serigala Penyendiri",
      de: "Verschlossener Einzelkämpfer",
      fr: "Loup Solitaire Prudent",
      es: "Lobo Solitario Cauteloso",
    },
    title: {
      en: "The Guarded Lone Wolf",
      id: "Sang Serigala Penyendiri yang Waspada",
      de: "Der verschlossene Einzelkämpfer",
      fr: "Le Loup Solitaire Blindé",
      es: "El Lobo Solitario Defensivo",
    },
    tagline: {
      en: "Deep-seated mistrust makes asking for help feel humiliating and unsafe.",
      id: "Rasa tidak percaya mendalam membuat meminta bantuan terasa memalukan dan tidak aman.",
      de: "Tiefes Misstrauen lässt Hilfsgesuche demütigend und riskant erscheinen.",
      fr: "Une méfiance ancrée rend toute demande d'aide humiliante et anxiogène.",
      es: "Una desconfianza profunda hace que pedir favores se sienta humillante y peligroso.",
    },
    description: {
      en: "You have built a fortress around your emotional needs. At some point in childhood or a past relationship, relying on someone resulted in pain, abandonment, or conditional strings attached. You decided: *'I will never be at the mercy of another human being again.'* You are exhausting yourself carrying mountains alone.",
      id: "Kamu telah membangun benteng baja di sekeliling kebutuhan batinmu. Di masa kecil atau hubungan masa lalu, mengandalkan orang lain berujung rasa sakit, ditinggalkan, atau pamrih yang mencekik. Kamu bersumpah: *'Aku tidak akan pernah bergantung lagi pada belas kasihan orang lain.'* Kamu kelelahan memikul gunung sendirian.",
      de: "Du hast Mauern um deine Bedürfnisse gezogen. Früher führte Verlass zu Enttäuschung oder schmerzhafter Abhängigkeit. Dein Entschluss stand fest: *'Nie wieder liefere ich mich jemandem aus.'* Du schleppst Berge allein und brennst innerlich aus.",
      fr: "Vous avez érigé une forteresse autour de vos besoins. Par le passé, dépendre de quelqu'un a rimé avec trahison ou chantage affectif. Vous portez des montagnes seul jusqu'à l'épuisement.",
      es: "Has levantado un muro infranqueable. En el pasado, confiar en alguien te costó dolor o humillación. Juraste no volver a estar a merced de nadie y ahora cargas montañas en soledad.",
    },
    psychologyInsight: {
      en: "Psychologists define this as a 'Fight-or-Freeze Trauma Response': hyper-independence is not self-love, but an avoidant coping defense mechanism designed to prevent the catastrophic vulnerability of being let down.",
      id: "Psikolog mendefinisikan ini sebagai respons trauma: kemandirian ekstrem bukanlah wujud self-love, melainkan tameng pertahanan menghindar (avoidant) demi mencegah rasa sakit akibat dikecewakan.",
      de: "Traumaforscher sehen hier eine Vermeidungsreaktion: Hyperunabhängigkeit ist keine echte Stärke, sondern ein Überlebenspanzer gegen die Angst vor erneutem Verlassenwerden.",
      fr: "Il s'agit d'une armure traumatique : l'hyper-indépendance n'est pas de la force, mais un mécanisme d'évitement pour ne plus jamais revivre la déception.",
      es: "Los expertos lo consideran un mecanismo de defensa por trauma: la hiperindependencia es un blindaje para evitar el dolor de sentirse traicionado.",
    },
    actionProtocols: {
      en: [
        "Practice 'Micro-Vulnerability': ask a friend or partner for a tiny favor (e.g. grabbing you a glass of water) and observe that you survive.",
        "Notice the physical somatic constriction in your chest whenever someone offers you help.",
        "Unburden your unspoken fatigue anonymously in Nuju's encrypted private voice journal.",
      ],
      id: [
        "Latih 'Mikro-Kerentanan': minta bantuan hal sangat sepele pada teman (misal tolong ambilkan segelas air) dan rasakan bahwa kamu aman.",
        "Sadari rasa sesak atau tegang di dada setiap kali ada orang yang menawarkan bantuan tulus.",
        "Tumpahkan rasa lelah yang kamu pendam sendirian ke dalam rekaman curhat suara privat di Nuju.",
      ],
      de: [
        "Übe 'Mikro-Verletzlichkeit': Bitte um kleine Gefallen (z.B. ein Glas Wasser) und spüre, dass keine Gefahr droht.",
        "Achte auf körperliche Enge in der Brust, sobald dir jemand Unterstützung anbietet.",
        "Lade deine stumme Erschöpfung im verschlüsselten Nuju-Sprachtagebuch ab.",
      ],
      fr: [
        "Entraînez-vous à la 'micro-vulnérabilité' : demandez un tout petit service et constatez que vous êtes en sécurité.",
        "Observez la crispation dans votre poitrine quand quelqu'un vous tend la main.",
        "Déposez votre fatigue silencieuse dans le journal vocal chiffré de Nuju.",
      ],
      es: [
        "Practica la 'microvulnerabilidad': pide un favor insignificante (un vaso de agua) y comprueba que estás a salvo.",
        "Observa la tensión en el pecho cada vez que alguien te ofrece ayuda sincera.",
        "Desahoga tu agotamiento invisible en el diario de voz privado de Nuju.",
      ],
    },
    dailyAffirmation: {
      en: "I do not have to earn my right to exist by carrying everything alone; safe connection is possible.",
      id: "Aku tidak perlu membuktikan hak hidupku dengan memikul segalanya sendirian; ada ruang aman untuk saling menopang.",
      de: "Ich muss meine Existenz nicht dadurch beweisen, dass ich alles allein trage; sichere Nähe ist möglich.",
      fr: "Je n'ai pas à prouver ma valeur en souffrant seul ; il existe des personnes sûres prêtes à m'épauler.",
      es: "No tengo que ganarme el derecho a existir cargándolo todo solo; la conexión segura y el apoyo son posibles.",
    },
  },

  severe_fortress: {
    level: "severe_fortress",
    badge: {
      en: "Isolated Fortress",
      id: "Benteng Isolasi",
      de: "Isolierte Festung",
      fr: "Forteresse Imprenable",
      es: "Fortaleza Aislada",
    },
    title: {
      en: "The Severe Hyper-Independent Fortress",
      id: "Benteng Kemandirian Ekstrem & Trauma Isolasi",
      de: "Die uneinnehmbare Festung",
      fr: "La Forteresse Hermétique",
      es: "La Fortaleza Inexpugnable",
    },
    tagline: {
      en: "Total rejection of human need, living in an emotional bunker where needing anyone is viewed as mortal weakness.",
      id: "Penolakan total terhadap kebutuhan afeksi, menganggap butuh orang lain sebagai kelemahan mematikan.",
      de: "Totale Abwehr jeglicher Nähe; das Bedürfnis nach anderen wird als fatale Schwäche verdammt.",
      fr: "Rejet viscéral de toute dépendance, retranché dans un bunker où avoir besoin d'autrui est interdit.",
      es: "Rechazo visceral de cualquier necesidad afectiva; depender de alguien se vive como un peligro mortal.",
    },
    description: {
      en: "You have weaponized self-sufficiency into an absolute survival bunker. You have completely severed the neural link between feeling pain and seeking comfort. You solve, work, fix, and endure in solitary silence, viewing vulnerability with visceral contempt. You are chronically exhausted and profoundly lonely, even when surrounded by people.",
      id: "Kamu telah menjadikan kemandirian sebagai bunker pertahanan hidup mutlak. Kamu memutus hubungan antara rasa sakit dan keinginan mencari pelukan. Kamu menanggung, bekerja, dan menahan penderitaan dalam kesendirian yang sunyi. Jiwamu kelelahan kronis dan sangat kesepian, meski di tengah keramaian.",
      de: "Deine Selbstständigkeit ist ein eiserner Bunker. Du hast die Verbindung zwischen Schmerz und Trostsuche gekappt. Du erträgst alles stumm allein und verachtest Schwäche. Du bist chronisch erschöpft und tief einsam, selbst mitten unter Menschen.",
      fr: "Vous avez transformé l'autonomie en forteresse étanche. Vous avez coupé tout lien entre la douleur et le besoin de réconfort. Vous endurez tout en silence avec un mépris pour la faiblesse, épuisé et profondément seul.",
      es: "Has convertido la autosuficiencia en un búnker de supervivencia. Cortaste la conexión entre sentir dolor y buscar consuelo. Aguantas todo en silencio implacable, agotado y en profunda soledad.",
    },
    psychologyInsight: {
      en: "This extreme condition originates in early childhood developmental neglect or parentification: when emotional needs were met with cruelty, ridicule, or complete absence, the infant brain shut down the attachment-seeking drive entirely to survive.",
      id: "Kondisi ekstrem ini berakar dari luka pengabaian masa kecil atau parentifikasi parah: saat kebutuhan emosi dulu dibalas dengan ejekan, kekerasan, atau ketiadaan kasih, otak anak mematikan dorongan mencari kasih sayang demi selamat.",
      de: "Ursprung ist oft schwere frühe Vernachlässigung: Wurden kindliche Nöte verlacht oder ignoriert, kappte das Gehirn das Bindungssystem radikal, um psychisch zu überleben.",
      fr: "Cette forteresse naît d'une négligence précoce : quand l'enfant a vu ses pleurs moqués ou ignorés, son cerveau a anéanti l'élan d'attachement pour survivre.",
      es: "Procede de una herida temprana de abandono o negligencia: cuando las necesidades infantiles fueron ignoradas o castigadas, el cerebro anuló el impulso de pedir auxilio para sobrevivir.",
    },
    actionProtocols: {
      en: [
        "Reframe hyper-independence: *'My self-reliance saved my childhood self, but it is starving my adult self.'*",
        "Do not force yourself to trust untrusted people; begin with an encrypted, judgment-free AI journal like Nuju.",
        "Regulate chronic autonomic bracing with the Stanford Physiological Sigh: [Open Sigh Tool](/tools/physiological-sigh).",
      ],
      id: [
        "Ubah cara pandang: *'Kemandirian ekstrem ini menyelamatkanku saat kecil, tapi sekarang mencekik jiwa dewasaku.'*",
        "Jangan paksakan langsung percaya pada orang; mulailah dengan ruang aman terenkripsi tanpa penghakiman di Nuju.",
        "Lepaskan ketegangan fisik saraf dengan tarikan napas ganda Stanford harian: [Buka Pacer Nafas](/tools/physiological-sigh).",
      ],
      de: [
        "Erkenne an: *'Mein Schutzpanzer rettete mein inneres Kind, aber er erstickt mein erwachsenes Leben.'*",
        "Erzwinge kein blindes Vertrauen; beginne geschützt mit dem privaten Nuju-Journal.",
        "Löse körperliche Daueranspannung mit dem physiologischen Seufzer: [Atem-Tool öffnen](/tools/physiological-sigh).",
      ],
      fr: [
        "Prenez conscience : *'Cette armure m'a sauvé enfant, mais elle étouffe ma vie d'adulte.'*",
        "Ne forcez rien avec les autres ; commencez par vous confier sans filtre dans l'espace chiffré de Nuju.",
        "Désamorcez la tension corporelle par le soupir physiologique : [Lancer l'Exercice](/tools/physiological-sigh).",
      ],
      es: [
        "Haz consciente el patrón: *'Esta armadura salvó mi infancia, pero está asfixiando mi vida adulta.'*",
        "No te fuerces a confiar de golpe; empieza desahogándote en el diario encriptado de Nuju.",
        "Destensa el sistema nervioso con el suspiro fisiológico: [Abrir Guía de Respiración](/tools/physiological-sigh).",
      ],
    },
    dailyAffirmation: {
      en: "Needing comfort is human, not shameful; it is safe for me to let someone in.",
      id: "Membutuhkan pelukan dan kenyamanan adalah hal manusiawi, bukan aib; sangat aman bagiku untuk membuka pintu hati.",
      de: "Trost zu brauchen ist menschlich, keine Schande; es ist sicher für mich, jemanden hereinzulassen.",
      fr: "Avoir besoin d'amour est profondément humain, pas une honte ; je peux entrouvrir ma porte en sécurité.",
      es: "Necesitar consuelo es humano, jamás una vergüenza; es seguro empezar a dejar entrar a alguien.",
    },
  },
};

export function calculateHyperIndependenceScore(
  answers: Record<number, number>
): HyperIndependenceScoreResult {
  let totalScore = 0;
  let armorScore = 0;
  let phobiaScore = 0;
  let threatScore = 0;

  HYPER_INDEPENDENCE_QUESTIONS.forEach((q) => {
    const score = answers[q.id] ?? 0;
    totalScore += score;

    if (q.subscale === "solitary_armor") armorScore += score;
    if (q.subscale === "vulnerability_phobia") phobiaScore += score;
    if (q.subscale === "threat_detection") threatScore += score;
  });

  const maxTotal = HYPER_INDEPENDENCE_QUESTIONS.length * 3; // 36
  const maxSubscale = 4 * 3; // 12
  const percentage = Math.round((totalScore / maxTotal) * 100);

  let level: HyperIndependenceArchetype["level"];
  if (percentage <= 24) {
    level = "interdependent_secure";
  } else if (percentage <= 49) {
    level = "self_reliant_striver";
  } else if (percentage <= 74) {
    level = "guarded_lone_wolf";
  } else {
    level = "severe_fortress";
  }

  return {
    totalScore,
    percentage,
    level,
    profile: HYPER_INDEPENDENCE_ARCHETYPES[level],
    subscales: {
      solitary_armor: {
        score: armorScore,
        percentage: Math.round((armorScore / maxSubscale) * 100),
      },
      vulnerability_phobia: {
        score: phobiaScore,
        percentage: Math.round((phobiaScore / maxSubscale) * 100),
      },
      threat_detection: {
        score: threatScore,
        percentage: Math.round((threatScore / maxSubscale) * 100),
      },
    },
  };
}
