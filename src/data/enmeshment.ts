export type EnmeshmentLang = "en" | "id" | "de" | "fr" | "es";

export interface EnmeshmentQuestion {
  id: number;
  subscale: "psychological_intrusiveness" | "identity_subjugation" | "boundary_guilt";
  prompt: Record<EnmeshmentLang, string>;
  options: {
    label: Record<EnmeshmentLang, string>;
    score: number; // 0 to 3
  }[];
}

export interface EnmeshmentArchetype {
  level: "individuated_secure" | "loyal_mediator" | "enmeshed_protector" | "fused_identity";
  badge: Record<EnmeshmentLang, string>;
  title: Record<EnmeshmentLang, string>;
  tagline: Record<EnmeshmentLang, string>;
  description: Record<EnmeshmentLang, string>;
  psychologyInsight: Record<EnmeshmentLang, string>;
  actionProtocols: Record<EnmeshmentLang, string[]>;
  dailyAffirmation: Record<EnmeshmentLang, string>;
}

export interface EnmeshmentScoreResult {
  totalScore: number;
  percentage: number;
  level: EnmeshmentArchetype["level"];
  profile: EnmeshmentArchetype;
  subscales: {
    psychological_intrusiveness: { score: number; percentage: number };
    identity_subjugation: { score: number; percentage: number };
    boundary_guilt: { score: number; percentage: number };
  };
}

export const ENMESHMENT_QUESTIONS: EnmeshmentQuestion[] = [
  // Subscale 1: Psychological Intrusiveness (Lack of boundaries, unsolicited emotional probing)
  {
    id: 1,
    subscale: "psychological_intrusiveness",
    prompt: {
      en: "Family members feel entitled to know every intimate detail of my finances, career decisions, and dating life.",
      id: "Anggota keluarga merasa berhak mengetahui setiap detail intim keuangan, keputusan karir, dan kehidupan asmaraku.",
      de: "Familienmitglieder erwarten ganz selbstverständlich, jedes intime Detail meiner Finanzen, Karriere und Partnerschaft zu kennen.",
      fr: "Les membres de ma famille estiment avoir le droit de connaître chaque détail intime de mes finances, ma carrière ou mes amours.",
      es: "Los miembros de mi familia sienten que tienen derecho a saber cada detalle íntimo de mis finanzas, carrera y vida amorosa.",
    },
    options: [
      {
        score: 0,
        label: {
          en: "Disagree — healthy privacy and confidentiality are respected",
          id: "Tidak setuju — privasi dan batasan pribadi sangat dihormati",
          de: "Stimme nicht zu — Privatsphäre wird respektiert",
          fr: "Pas d'accord — ma vie privée est pleinement respectée",
          es: "En desacuerdo — se respeta plenamente mi privacidad",
        },
      },
      {
        score: 1,
        label: {
          en: "Occasionally — only around major life milestones",
          id: "Kadang — hanya saat ada keputusan hidup yang sangat besar",
          de: "Gelegentlich — nur bei großen Lebensentscheidungen",
          fr: "Parfois — seulement lors des grandes étapes de vie",
          es: "A veces — solo ante decisiones de vida importantes",
        },
      },
      {
        score: 2,
        label: {
          en: "Frequently — keeping anything private is treated as secrecy or deceit",
          id: "Sering — merahasiakan hal privat dianggap sebagai pengkhianatan atau ketidakjujuran",
          de: "Häufig — Geheimnisse werden als Vertrauensbruch gewertet",
          fr: "Souvent — garder un secret est perçu comme une trahison",
          es: "Frecuentemente — guardar privacidad se toma como deslealtad",
        },
      },
      {
        score: 3,
        label: {
          en: "Constantly — boundaries do not exist; personal privacy is viewed as an offense",
          id: "Selalu — batasan tidak ada sama sekali; privasi dianggap sebagai penghinaan keluarga",
          de: "Ständig — Grenzen existieren nicht; Privatsphäre gilt als Affront",
          fr: "Constamment — aucune frontière; l'intimité personnelle est vécue comme une insulte",
          es: "Constantemente — no existen límites; la privacidad se considera una ofensa",
        },
      },
    ],
  },
  {
    id: 2,
    subscale: "psychological_intrusiveness",
    prompt: {
      en: "If a parent or sibling is upset, I am expected to drop my life immediately and fix their emotional crisis.",
      id: "Jika orang tua atau saudara sedang marah/sedih, aku dituntut untuk langsung meninggalkan urusanku demi menenangkan mereka.",
      de: "Wenn ein Elternteil oder Geschwisterteil verärgert ist, muss ich sofort alles stehen und liegen lassen, um zu schlichten.",
      fr: "Si un parent ou un frère/sœur est contrarié, on attend de moi que je laisse tout tomber pour apaiser la crise.",
      es: "Si un padre o hermano está disgustado, se espera que deje mis planes de inmediato para calmar su crisis.",
    },
    options: [
      {
        score: 0,
        label: {
          en: "Never — each person manages their own emotional state",
          id: "Tidak pernah — tiap orang bertanggung jawab atas kestabilan emosi masing-masing",
          de: "Nie — jeder reguliert seine eigenen Gefühle",
          fr: "Jamais — chacun gère ses propres émotions",
          es: "Nunca — cada quien gestiona sus propias emociones",
        },
      },
      {
        score: 1,
        label: {
          en: "Rarely — only in genuine life emergencies",
          id: "Jarang — hanya pada situasi darurat yang nyata",
          de: "Selten — nur in echten Notfällen",
          fr: "Rarement — seulement en cas d'urgence réelle",
          es: "Rara vez — solo en emergencias genuinas",
        },
      },
      {
        score: 2,
        label: {
          en: "Often — I feel like the designated family therapist and peacemaker",
          id: "Sering — aku merasa seperti terapis dan penengah keluarga yang wajib hadir",
          de: "Oft — ich fungiere als dauerhafter Familientherapeut",
          fr: "Souvent — je suis le thérapeute désigné de la famille",
          es: "A menudo — soy el terapeuta y mediador designado de la familia",
        },
      },
      {
        score: 3,
        label: {
          en: "Always — my emotional peace is entirely held hostage by their daily mood swings",
          id: "Selalu — ketenangan mentalku sepenuhnya tersandera oleh perubahan suasana hati mereka",
          de: "Immer — mein Wohlbefinden hängt völlig von deren Launen ab",
          fr: "Toujours — ma paix intérieure est l'otage de leurs humeurs",
          es: "Siempre — mi paz mental es rehén total de sus cambios de humor",
        },
      },
    ],
  },
  {
    id: 3,
    subscale: "psychological_intrusiveness",
    prompt: {
      en: "Family members use guilt, silent treatments, or manufactured illness whenever I make an independent decision.",
      id: "Keluarga menggunakan rasa bersalah, mendiamkanku, atau mendadak mengeluh sakit saat aku mengambil keputusan mandiri.",
      de: "Meine Familie reagiert mit Schweigen, Schuldzuweisungen oder plötzlicher Kränklichkeit, wenn ich eigene Wege gehe.",
      fr: "Ma famille utilise la culpabilité, le silence ou de fausses maladies dès que je fais un choix autonome.",
      es: "Mi familia recurre a la culpa, la ley del hielo o achaques repentinos cuando tomo una decisión independiente.",
    },
    options: [
      {
        score: 0,
        label: {
          en: "Never — my personal autonomy is supported with encouragement",
          id: "Tidak pernah — kemandirianku didukung penuh tanpa manipulasi",
          de: "Nie — meine Eigenständigkeit wird respektiert und gefördert",
          fr: "Jamais — mon autonomie est encouragée",
          es: "Nunca — se apoya mi autonomía con entusiasmo",
        },
      },
      {
        score: 1,
        label: {
          en: "Mildly — there is occasional friction or passive-aggressive sighing",
          id: "Ringan — sesekali ada ketegangan atau helaan napas pasif-agresif",
          de: "Leicht — gelegentlich passive Vorwürfe oder Seufzen",
          fr: "Légèrement — quelques soupirs passifs-agressifs de temps à autre",
          es: "Levemente — fricciones ocasionales o suspiros pasivo-agresivos",
        },
      },
      {
        score: 2,
        label: {
          en: "Frequently — emotional manipulation is the default response to separation",
          id: "Sering — manipulasi emosional adalah reaksi bawaan saat aku menjauh",
          de: "Häufig — emotionale Erpressung ist die Standardreaktion",
          fr: "Souvent — le chantage affectif est systématique en cas de distance",
          es: "Frecuentemente — la manipulación emocional es la norma",
        },
      },
      {
        score: 3,
        label: {
          en: "Constantly — setting a boundary triggers catastrophic family dramas or medical crises",
          id: "Selalu — pasang batasan sedikit saja langsung memicu drama besar atau keluhan sakit akut",
          de: "Ständig — Grenzen setzen führt sofort zu dramatischen Krisen",
          fr: "Constamment — poser une limite déclenche un drame ou une fausse urgence médicale",
          es: "Constantemente — poner un límite desata tragedias o crisis médicas",
        },
      },
    ],
  },
  {
    id: 4,
    subscale: "psychological_intrusiveness",
    prompt: {
      en: "I am caught in the middle of conflicts between my parents or family members, forced to act as a messenger.",
      id: "Aku terjebak di tengah perselisihan orang tua atau anggota keluarga, dipaksa menjadi penyampai pesan atau juri.",
      de: "Ich stehe zwischen den Fronten meiner Eltern oder Verwandten und muss als Vermittler oder Bote fungieren.",
      fr: "Je suis pris entre deux feux dans les disputes de mes parents et contraint de servir de messager.",
      es: "Quedo atrapado en medio de las peleas de mis padres, obligado a actuar de mensajero o mediador.",
    },
    options: [
      {
        score: 0,
        label: {
          en: "Never — adults handle their own interpersonal conflicts directly",
          id: "Tidak pernah — sesama orang dewasa menyelesaikan konflik mereka sendiri secara langsung",
          de: "Nie — Erwachsene klären ihre Konflikte selbstständig",
          fr: "Jamais — les adultes règlent leurs différends directement",
          es: "Nunca — los adultos resuelven sus propios conflictos directamente",
        },
      },
      {
        score: 1,
        label: {
          en: "Rarely — only during unusually tense family gatherings",
          id: "Jarang — hanya pada kumpul keluarga yang sangat tegang",
          de: "Selten — nur bei sehr angespannten Familienfeiern",
          fr: "Rarement — seulement lors de réunions familiales tendues",
          es: "Rara vez — solo en reuniones familiares muy tensas",
        },
      },
      {
        score: 2,
        label: {
          en: "Frequently — I am triangulated into disputes that do not belong to me",
          id: "Sering — aku dijadikan pihak ketiga dalam perselisihan yang bukan urusanku",
          de: "Häufig — ich werde ständig in fremde Konflikte hineingezogen",
          fr: "Souvent — je suis triangulé dans des querelles qui ne me concernent pas",
          es: "Frecuentemente — me triangulan en disputas que no me corresponden",
        },
      },
      {
        score: 3,
        label: {
          en: "Constantly — their marriage or relationship relies entirely on my mediation to avoid collapse",
          id: "Selalu — hubungan mereka bergantung sepenuhnya pada penengahanku agar tidak runtuh",
          de: "Ständig — deren Beziehung funktioniert nur, weil ich als Puffer diene",
          fr: "Constamment — leur relation ne tient que grâce à mon rôle de tampon",
          es: "Constantemente — su relación depende por completo de mi mediación",
        },
      },
    ],
  },

  // Subscale 2: Identity Subjugation (Loss of authentic self, conforming to family script)
  {
    id: 5,
    subscale: "identity_subjugation",
    prompt: {
      en: "I struggle to know what I truly want or believe because my identity was molded around pleasing my family.",
      id: "Aku kesulitan mengetahui apa yang benar-benar kuinginkan karena identitasku dibentuk demi memuaskan keluarga.",
      de: "Ich weiß oft gar nicht, wer ich selbst bin, weil meine Identität nur darauf ausgerichtet war, der Familie zu gefallen.",
      fr: "J'ai du mal à savoir ce que je veux vraiment car mon identité a été façonnée pour satisfaire ma famille.",
      es: "Me cuesta saber qué quiero realmente porque mi identidad fue moldeada para complacer a mi familia.",
    },
    options: [
      {
        score: 0,
        label: {
          en: "Disagree — I have a distinct personal identity and clear values",
          id: "Tidak setuju — aku memiliki identitas pribadi yang tegas dan nilai hidup yang jelas",
          de: "Stimme nicht zu — ich habe ein klares eigenes Selbstbild",
          fr: "Pas d'accord — j'ai une identité et des valeurs bien définies",
          es: "En desacuerdo — tengo una identidad y valores propios y claros",
        },
      },
      {
        score: 1,
        label: {
          en: "Occasionally — some self-doubt when choosing non-traditional paths",
          id: "Kadang — ada keraguan sesaat ketika memilih jalan hidup yang tidak biasa",
          de: "Gelegentlich — leichte Zweifel bei unkonventionellen Schritten",
          fr: "Parfois — de légers doutes face à des choix atypiques",
          es: "A veces — ligeras dudas al tomar caminos poco convencionales",
        },
      },
      {
        score: 2,
        label: {
          en: "Frequently — I often feel like an actor reading a script written by my parents",
          id: "Sering — aku sering merasa seperti aktor yang menjalankan naskah tulisan orang tua",
          de: "Häufig — ich fühle mich wie ein Schauspieler im Drehbuch meiner Eltern",
          fr: "Souvent — j'ai l'impression de jouer un rôle écrit par mes parents",
          es: "Frecuentemente — siento que actúo un guion dictado por mis padres",
        },
      },
      {
        score: 3,
        label: {
          en: "Completely — without their approval, I feel empty, disconnected, and paralyzed",
          id: "Sangat — tanpa persetujuan mereka, aku merasa hampa, kehilangan arah, dan lumpuh",
          de: "Völlig — ohne deren Bestätigung fühle ich mich innerlich leer und handlungsunfähig",
          fr: "Totalement — sans leur approbation, je me sens vide et désorienté",
          es: "Totalmente — sin su aprobación, me siento vacío, desconectado y paralizado",
        },
      },
    ],
  },
  {
    id: 6,
    subscale: "identity_subjugation",
    prompt: {
      en: "Expressing an opinion, political stance, or lifestyle choice different from my family feels dangerous or disloyal.",
      id: "Mengungkapkan opini, pilihan politik, atau gaya hidup yang berbeda dari keluarga terasa berbahaya atau durhaka.",
      de: "Eigene Meinungen oder Lebensstile zu vertreten, die von der Familie abweichen, fühlt sich wie Verrat an.",
      fr: "Exprimer une opinion ou un mode de vie différent de ma famille me donne l'impression de trahir les miens.",
      es: "Expresar una opinión o estilo de vida diferente al de mi familia se siente peligroso o desleal.",
    },
    options: [
      {
        score: 0,
        label: {
          en: "Disagree — healthy differences in perspective are accepted with love",
          id: "Tidak setuju — perbedaan sudut pandang diterima dengan hangat dan dewasa",
          de: "Stimme nicht zu — Meinungsverschiedenheiten werden liebevoll akzeptiert",
          fr: "Pas d'accord — nos différences sont acceptées avec respect",
          es: "En desacuerdo — las diferencias se aceptan con madurez y cariño",
        },
      },
      {
        score: 1,
        label: {
          en: "Mildly — we agree to disagree on sensitive topics",
          id: "Ringan — kami sepakat untuk berbeda pendapat pada topik sensitif",
          de: "Leicht — bei heiklen Themen meiden wir Diskussionen",
          fr: "Légèrement — nous évitons les sujets délicats",
          es: "Levemente — evitamos discutir temas delicados",
        },
      },
      {
        score: 2,
        label: {
          en: "Substantially — dissent is met with harsh lectures, shaming, or ostracization",
          id: "Cukup besar — perbedaan pendapat disambut ceramah kasar, dipermalukan, atau dijauhi",
          de: "Erheblich — Andersdenken wird mit Abwertung und Scham bestraft",
          fr: "Sensiblement — être différent suscite des leçons de morale et du rejet",
          es: "Bastante — disentir provoca sermones duros o distanciamiento",
        },
      },
      {
        score: 3,
        label: {
          en: "Totally — conformity is strictly mandatory; individuality is viewed as treason",
          id: "Sepenuhnya — keseragaman wajib ditaati; menjadi diri sendiri dianggap pengkhianatan mutlak",
          de: "Vollständig — Konformität ist Pflicht; Individualität gilt als Hochverrat",
          fr: "Absolument — la conformité est exigée; être soi-même est une trahison absolue",
          es: "Totalmente — la conformidad es obligatoria; la individualidad es traición",
        },
      },
    ],
  },
  {
    id: 7,
    subscale: "identity_subjugation",
    prompt: {
      en: "I conceal my authentic hobbies, achievements, or romantic relationships from my family to prevent tension.",
      id: "Aku menyembunyikan hobi, pencapaian karir, atau hubungan asmaraku dari keluarga demi menghindari ketegangan.",
      de: "Ich verheimliche eigene Erfolge, Hobbys oder Partnerschaften vor der Familie, um Konflikte zu vermeiden.",
      fr: "Je cache mes réussites, passions ou relations amoureuses à ma famille pour éviter les tensions.",
      es: "Oculto mis logros, pasatiempos o relaciones de pareja a mi familia para evitar tensiones.",
    },
    options: [
      {
        score: 0,
        label: {
          en: "Never — I share my life openly and authentically",
          id: "Tidak pernah — aku berbagi kabar hidupku secara terbuka dan jujur",
          de: "Nie — ich teile mein Leben offen und authentisch",
          fr: "Jamais — je partage ma vie ouvertement et sereinement",
          es: "Nunca — comparto mi vida de forma abierta y auténtica",
        },
      },
      {
        score: 1,
        label: {
          en: "Rarely — only minor things that might cause unnecessary worry",
          id: "Jarang — hanya hal-hal kecil agar mereka tidak cemas berlebihan",
          de: "Selten — nur Kleinigkeiten, um Sorgen zu ersparen",
          fr: "Rarement — seulement des broutilles pour ne pas inquiéter",
          es: "Rara vez — solo detalles menores para no generar angustia",
        },
      },
      {
        score: 2,
        label: {
          en: "Often — I lead a double life to protect my mental sanctuary",
          id: "Sering — aku seperti menjalani dua kehidupan berbeda demi melindungi mentalku",
          de: "Oft — ich lebe quasi ein Doppelleben zum Selbstschutz",
          fr: "Souvent — je mène une double vie pour préserver ma paix",
          es: "A menudo — llevo una doble vida para proteger mi paz mental",
        },
      },
      {
        score: 3,
        label: {
          en: "Constantly — my family knows virtually nothing about the real person I am today",
          id: "Selalu — keluargaku hampir tidak mengenal siapa diriku yang sesungguhnya hari ini",
          de: "Ständig — meine Familie kennt mein wahres Ich überhaupt nicht",
          fr: "Constamment — ma famille ignore tout de qui je suis réellement",
          es: "Constantemente — mi familia no conoce en absoluto a mi verdadero yo",
        },
      },
    ],
  },
  {
    id: 8,
    subscale: "identity_subjugation",
    prompt: {
      en: "I feel an intense obligation to succeed professionally primarily to elevate my family's status or repay their sacrifices.",
      id: "Aku merasa wajib sukses berkarir terutama demi mendongkrak gengsi keluarga atau membalas budi pengorbanan mereka.",
      de: "Ich spüre den massiven Druck, beruflich erfolgreich zu sein, um das Ansehen der Familie zu steigern.",
      fr: "Je ressens le devoir d'avoir un statut prestigieux pour honorer ou rembourser les sacrifices familiaux.",
      es: "Siento la enorme obligación de triunfar sobre todo para elevar el estatus familiar o pagar sacrificios.",
    },
    options: [
      {
        score: 0,
        label: {
          en: "Disagree — my ambitions are self-chosen for my own fulfillment",
          id: "Tidak setuju — ambisiku dipilih sendiri demi kepuasan batin dan tujuanku",
          de: "Stimme nicht zu — meine Ziele dienen meiner eigenen Erfüllung",
          fr: "Pas d'accord — mes ambitions visent mon propre épanouissement",
          es: "En desacuerdo — mis ambiciones responden a mi propia realización",
        },
      },
      {
        score: 1,
        label: {
          en: "Mildly — I take pride in making them happy, but it is not my sole driver",
          id: "Ringan — aku senang membuat mereka bangga, tapi itu bukan satu-satunya motorku",
          de: "Leicht — ich mache sie gern stolz, aber es bestimmt mich nicht",
          fr: "Légèrement — les rendre fiers me fait plaisir mais ne me dicte pas ma voie",
          es: "Levemente — me gusta enorgullecerlos, pero no es mi único motor",
        },
      },
      {
        score: 2,
        label: {
          en: "Heavily — career burnout feels mandatory to justify my worth in the family",
          id: "Berat — burnout karir terasa wajib demi membuktikan nilaiku di mata keluarga",
          de: "Stark — beruflicher Burnout scheint der Preis für meine Anerkennung zu sein",
          fr: "Fortement — l'épuisement au travail me semble obligatoire pour mériter ma place",
          es: "Fuertemente — el agotamiento profesional me parece el costo de mi valor",
        },
      },
      {
        score: 3,
        label: {
          en: "Crushingly — my career path was effectively chosen for me; deviation brings unbearable shame",
          id: "Sangat menghimpit — jalur karirku sudah ditentukan keluarga; melenceng sedikit membawa aib besar",
          de: "Erdrückend — mein Lebensweg wurde mir diktiert; Abweichung bedeutet Schande",
          fr: "Écrasant — ma trajectoire a été décidée par eux; dévier apporte une honte immense",
          es: "Aplastante — mi camino fue impuesto; desviarme acarrea una vergüenza insoportable",
        },
      },
    ],
  },

  // Subscale 3: Boundary Transgression Guilt (Guilt and dread of abandonment when setting limits)
  {
    id: 9,
    subscale: "boundary_guilt",
    prompt: {
      en: "Whenever I say 'no' to a family request or invitation, I am overwhelmed by gut-wrenching guilt for days.",
      id: "Tiap kali menolak permintaan atau ajakan keluarga, perutku mual dilanda rasa bersalah selama berhari-hari.",
      de: "Wenn ich einer Bitte der Familie absage, werde ich tagelang von quälenden Schuldgefühlen zerfressen.",
      fr: "Chaque fois que je dis 'non' à ma famille, une culpabilité rongeante m'envahit pendant des jours.",
      es: "Cada vez que digo 'no' a un pedido familiar, la culpa me carcome el estómago durante días.",
    },
    options: [
      {
        score: 0,
        label: {
          en: "Disagree — saying no is a normal, healthy part of adult relationships",
          id: "Tidak setuju — berkata tidak adalah hal wajar dan sehat dalam relasi dewasa",
          de: "Stimme nicht zu — Nein sagen ist ein normaler Teil gesunder Beziehungen",
          fr: "Pas d'accord — refuser fait partie d'une relation adulte saine",
          es: "En desacuerdo — decir no es natural y saludable entre adultos",
        },
      },
      {
        score: 1,
        label: {
          en: "Occasionally — slight pang of remorse that dissipates quickly",
          id: "Kadang — ada rasa tidak enak sebentar lalu hilang dengan cepat",
          de: "Gelegentlich — ein kurzes Zögern, das schnell vergeht",
          fr: "Parfois — un petit pincement vite oublié",
          es: "A veces — una ligera molestia que pasa rápido",
        },
      },
      {
        score: 2,
        label: {
          en: "Frequently — I usually cave in and say 'yes' just to silence the internal torment",
          id: "Sering — aku biasanya mengalah dan bilang 'ya' hanya demi menghentikan siksaan batin",
          de: "Häufig — ich gebe oft klein bei, nur um die inneren Vorwürfe zu stoppen",
          fr: "Souvent — je finis par céder pour faire taire ce tourment intérieur",
          es: "Frecuentemente — suelo ceder y decir que sí para calmar el tormento interno",
        },
      },
      {
        score: 3,
        label: {
          en: "Paralyzing — I feel like a cold-hearted monster whenever I protect my own calendar or energy",
          id: "Lumpuh — aku merasa seperti monster tak punya hati setiap kali melindungi energiku sendiri",
          de: "Lähmend — ich fühle mich wie ein herzloses Monster, wenn ich Grenzen setze",
          fr: "Paralysant — je me sens comme un monstre dès que je préserve mon temps",
          es: "Paralizante — me siento un monstruo desalmado al proteger mi energía",
        },
      },
    ],
  },
  {
    id: 10,
    subscale: "boundary_guilt",
    prompt: {
      en: "Moving away physically or living on my own felt like an act of betrayal or abandonment against my family.",
      id: "Pindah tempat tinggal atau hidup mandiri terasa seperti tindakan pengkhianatan atau menelantarkan keluarga.",
      de: "Auszuziehen oder weit weg zu wohnen fühlte sich wie ein Verrat oder Verlassen der Familie an.",
      fr: "Quitter le foyer ou déménager au loin m'a semblé être un acte de trahison ou d'abandon envers eux.",
      es: "Mudarme o vivir solo se sintió como una traición o un abandono imperdonable a mi familia.",
    },
    options: [
      {
        score: 0,
        label: {
          en: "Disagree — moving out was celebrated as a natural milestone of adulthood",
          id: "Tidak setuju — hidup mandiri dirayakan sebagai pencapaian wajar kedewasaan",
          de: "Stimme nicht zu — der Auszug wurde als normaler Schritt ins Erwachsenenalter begrüßt",
          fr: "Pas d'accord — mon indépendance a été saluée comme une étape naturelle",
          es: "En desacuerdo — independizarme fue celebrado como un paso natural",
        },
      },
      {
        score: 1,
        label: {
          en: "Mildly — there was normal nostalgia, but no guilt tripping",
          id: "Ringan — ada rasa kangen yang wajar, tanpa drama rasa bersalah",
          de: "Leicht — normale Wehmut, aber keine Vorwürfe",
          fr: "Légèrement — une nostalgie normale, sans culpabilisation",
          es: "Levemente — nostalgia normal, sin manipulación",
        },
      },
      {
        score: 2,
        label: {
          en: "Substantially — relatives constantly remind me of how 'lonely and broken' they are without me",
          id: "Cukup besar — keluarga terus mengungkit betapa 'kesepian dan merananya' mereka tanpaku",
          de: "Erheblich — mir wird ständig vorgehalten, wie einsam sie ohne mich sind",
          fr: "Sensiblement — on me rappelle constamment à quel point ils sont seuls sans moi",
          es: "Bastante — me reprochan constantemente lo solos y tristes que están sin mí",
        },
      },
      {
        score: 3,
        label: {
          en: "Extremely — I feel perpetual guilt for having my own home and thriving apart from them",
          id: "Sangat ekstrem — aku merasa bersalah tiada henti karena hidup bahagia dan mapan terpisah dari mereka",
          de: "Extrem — ich empfinde permanente Schuld dafür, ein eigenes glückliches Leben zu führen",
          fr: "Extrêmement — je ressens une honte perpétuelle à être épanoui loin d'eux",
          es: "Extremadamente — siento culpa constante por tener mi propia vida y prosperar lejos",
        },
      },
    ],
  },
  {
    id: 11,
    subscale: "boundary_guilt",
    prompt: {
      en: "I feel financially or logistically responsible for family members, even when it compromises my own survival or debt.",
      id: "Aku merasa bertanggung jawab menanggung finansial keluarga, bahkan saat itu mengancam tabungan atau hutang pribadiku.",
      de: "Ich fühle mich finanziell verpflichtet, Angehörige zu stützen, selbst wenn ich mich dadurch verschulde.",
      fr: "Je me sens responsable financièrement de ma famille, même au détriment de mes propres économies.",
      es: "Me siento responsable de sostener económicamente a mi familia, aun si compromete mi propia solvencia.",
    },
    options: [
      {
        score: 0,
        label: {
          en: "Disagree — mutual financial responsibility and clear boundaries exist",
          id: "Tidak setuju — ada kemandirian finansial masing-masing dan batasan yang sehat",
          de: "Stimme nicht zu — es gibt klare finanzielle Eigenverantwortung",
          fr: "Pas d'accord — chacun est responsable de ses finances",
          es: "En desacuerdo — hay límites claros y autonomía financiera mutua",
        },
      },
      {
        score: 1,
        label: {
          en: "Rarely — willing voluntary help during rare crises only",
          id: "Jarang — bantuan sukarela hanya saat krisis luar biasa",
          de: "Selten — freiwillige Hilfe nur in echten Notsituationen",
          fr: "Rarement — un coup de pouce volontaire en cas de coup dur",
          es: "Rara vez — ayuda voluntaria solo en crisis excepcionales",
        },
      },
      {
        score: 2,
        label: {
          en: "Frequently — I am the family safety net; saying no brings accusations of being ungrateful",
          id: "Sering — aku dijadikan jaring pengaman finansial; menolak dicap tidak tahu balas budi",
          de: "Häufig — ich diene als Auffangnetz; ein Nein gilt als undankbar",
          fr: "Souvent — je suis leur filet financier; refuser me fait passer pour ingrat",
          es: "Frecuentemente — soy el salvavidas financiero; negarme se tilda de ingratitud",
        },
      },
      {
        score: 3,
        label: {
          en: "Severely — I subsidize chronic adult irresponsibility out of terror of being cast out",
          id: "Sangat parah — aku menambal ketidakbertanggungjawaban orang dewasa lain karena takut dikucilkan",
          de: "Extrem — ich finanziere unverantwortliches Verhalten aus Angst vor Verstoßung",
          fr: "Gravement — je finance l'irresponsabilité d'adultes par peur d'être rejeté",
          es: "Severamente — subsidio la irresponsabilidad de otros adultos por miedo al repudio",
        },
      },
    ],
  },
  {
    id: 12,
    subscale: "boundary_guilt",
    prompt: {
      en: "My romantic partner feels alienated because my family intrudes into our private couple decisions.",
      id: "Pasangan asmaraku merasa terasing karena keluargaku terlalu mencampuri keputusan intim rumah tangga kami.",
      de: "Mein Partner fühlt sich zurückgesetzt, weil meine Familie sich in intime Beziehungsentscheidungen einmischt.",
      fr: "Mon/ma partenaire se sent exclu(e) car ma famille s'immisce dans nos décisions de couple.",
      es: "Mi pareja se siente desplazada porque mi familia interfiere en nuestras decisiones íntimas.",
    },
    options: [
      {
        score: 0,
        label: {
          en: "Disagree — my partner and I maintain a strong, impenetrable marital/romantic boundary",
          id: "Tidak setuju — aku dan pasangan menjaga batasan hubungan kami dengan kokoh dan privat",
          de: "Stimme nicht zu — unsere Paarbeziehung hat klare, geschützte Grenzen",
          fr: "Pas d'accord — notre couple possède une frontière protectrice solide",
          es: "En desacuerdo — mi pareja y yo protegemos con firmeza nuestro espacio",
        },
      },
      {
        score: 1,
        label: {
          en: "Occasionally — minor friction when parents offer unsolicited advice",
          id: "Kadang — gesekan kecil saat orang tua memberi saran tanpa diminta",
          de: "Gelegentlich — leichte Reibungen bei ungefragten Ratschlägen",
          fr: "Parfois — de légères frictions dues à des conseils non sollicités",
          es: "A veces — roces menores por consejos no pedidos",
        },
      },
      {
        score: 2,
        label: {
          en: "Frequently — I struggle with whose side to take when my family and partner clash",
          id: "Sering — aku bingung harus memihak siapa saat keluarga dan pasanganku berselisih",
          de: "Häufig — ich gerate ständig in Loyalitätskonflikte zwischen Partner und Familie",
          fr: "Souvent — je suis tiraillé entre ma famille et mon/ma partenaire",
          es: "Frecuentemente — sufro lealtades divididas entre mi pareja y mi familia",
        },
      },
      {
        score: 3,
        label: {
          en: "Chronically — my family has sabotaged past relationships because they could not control them",
          id: "Kronis — keluargaku berulang kali merusak hubungan asmaraku karena mereka tidak bisa mengontrol pasanganku",
          de: "Chronisch — frühere Beziehungen sind an den Übergriffen meiner Familie zerbrochen",
          fr: "Chronique — ma famille a déjà détruit mes relations passées par besoin de contrôle",
          es: "Crónicamente — mi familia ha saboteado parejas anteriores por falta de control",
        },
      },
    ],
  },
];

export const ENMESHMENT_ARCHETYPES: Record<EnmeshmentArchetype["level"], EnmeshmentArchetype> = {
  individuated_secure: {
    level: "individuated_secure",
    badge: {
      en: "Secure & Individuated",
      id: "Mandiri & Batasan Sehat",
      de: "Souverän & Individuiert",
      fr: "Individué & Sécurisé",
      es: "Soberano e Individuado",
    },
    title: {
      en: "Sovereign Individuation & Boundaried Love",
      id: "Individuasi Sejati & Cinta Berkelanjutan yang Sehat",
      de: "Souveräne Individuation & Gesunde Verbundenheit",
      fr: "Individuation Souveraine & Frontières Saines",
      es: "Individuación Soberana y Afecto con Límites",
    },
    tagline: {
      en: "You love your family with an open heart while maintaining impenetrable personal boundaries.",
      id: "Kamu mencintai keluargamu dengan tulus sembari mempertahankan batas privasi yang kokoh.",
      de: "Du liebst deine Familie von Herzen, wahrs aber unantastbare persönliche Grenzen.",
      fr: "Vous aimez votre famille avec cœur tout en protégeant votre sanctuaire personnel.",
      es: "Amas a tu familia de corazón mientras preservas límites personales inquebrantables.",
    },
    description: {
      en: "Your scores reflect high psychological differentiation. You recognize that other adults are responsible for their own emotions, finances, and life crises. You offer empathy without absorbing their anxiety, and you can say 'no' without collapsing into gut-wrenching remorse.",
      id: "Skormu mencerminkan diferensiasi psikologis yang matang. Kamu memahami bahwa sesama orang dewasa bertanggung jawab atas emosi dan nasib mereka sendiri. Kamu bisa berempati tanpa terseret histeria mereka.",
      de: "Deine Werte belegen eine gesunde psychologische Differenzierung. Du erkennst, dass andere Erwachsene für ihre Gefühle selbst verantwortlich sind. Du hilfst gern, lässt dich aber nicht emotional erpressen.",
      fr: "Vos résultats attestent d'une solide différenciation du soi. Vous comprenez que les autres adultes sont responsables de leurs émotions. Vous offrez du soutien sans vous laisser engloutir.",
      es: "Tus resultados demuestran una sana diferenciación del yo. Reconoces que los demás adultos son responsables de su bienestar. Apoyas con empatía sin dejarte devorar por la culpa.",
    },
    psychologyInsight: {
      en: "Murray Bowen's Family Systems Theory establishes 'Differentiation of Self' as the peak of relational maturity: the capacity to stay intimately connected to important people while maintaining distinct emotional autonomy.",
      id: "Teori Sistem Keluarga Murray Bowen menyebut 'Diferensiasi Diri' sebagai puncak kedewasaan relasi: kemampuan untuk tetap terhubung hangat tanpa kehilangan kedaulatan identitas.",
      de: "Murray Bowens Familientherapie definiert die 'Differenzierung des Selbst' als Reifegrad: Man bleibt liebevoll verbunden, behält aber die volle emotionale Unabhängigkeit.",
      fr: "La théorie des systèmes familiaux de Murray Bowen définit la différenciation du soi comme l'art de rester connecté sans jamais dissoudre son identité propre.",
      es: "La Teoría de Sistemas Familiares de Bowen sitúa la diferenciación del sí mismo como el pináculo relacional: amar sin perder la soberanía personal.",
    },
    actionProtocols: {
      en: [
        "Maintain clarity around private couple and financial decisions.",
        "Continue validating family emotions without taking over their solutions.",
        "Celebrate your personal accomplishments as sovereign milestones.",
      ],
      id: [
        "Pertahankan kejelasan batasan finansial dan keputusan pribadi rumah tangga.",
        "Validasi perasaan keluarga tanpa perlu merasa wajib menyelesaikan masalah mereka.",
        "Rayakan pencapaian hidupmu sebagai wujud kedewasaan yang berhak kamu nikmati.",
      ],
      de: [
        "Wahre klare Grenzen bei Partnerschafts- und Finanzentscheidungen.",
        "Höre empathisch zu, ohne ungefragt die Problemlösung zu übernehmen.",
        "Feiere deine eigenen Erfolge als autonome Meilensteine.",
      ],
      fr: [
        "Maintenez l'étanchéité de vos décisions de couple et de carrière.",
        "Écoutez avec bienveillance sans vous sentir obligé de réparer la crise.",
        "Savourez vos réussites comme le fruit de votre libre arbitre.",
      ],
      es: [
        "Conserva límites claros en decisiones de pareja y finanzas.",
        "Valida sus sentimientos sin asumir la resolución de sus problemas.",
        "Celebra tus metas como triunfos legítimos de tu vida autónoma.",
      ],
    },
    dailyAffirmation: {
      en: "I can love my family deeply while remaining completely loyal to my own life, boundaries, and truth.",
      id: "Aku bisa menyayangi keluargaku dengan tulus sembari tetap setia pada kehidupanku, batasanku, dan kebenaranku.",
      de: "Ich kann meine Familie lieben und gleichzeitig meinen eigenen Grenzen treu bleiben.",
      fr: "Je peux aimer ma famille intensément tout en restant fidèle à ma propre trajectoire.",
      es: "Puedo amar profundamente a mi familia siendo totalmente leal a mis límites y a mi verdad.",
    },
  },

  loyal_mediator: {
    level: "loyal_mediator",
    badge: {
      en: "The Loyal Mediator",
      id: "Penengah Setia",
      de: "Der loyale Vermittler",
      fr: "Le Médiateur Loyal",
      es: "El Mediador Leal",
    },
    title: {
      en: "The Conscientious Peacemaker & Boundary Hesitater",
      id: "Juru Damai Berbudi & Keraguan Menegakkan Batasan",
      de: "Der gewissenhafte Friedensstifter",
      fr: "Le Diplomate Protecteur en Quête d'Espace",
      es: "El Pacificador Fiel y Vacilante en Límites",
    },
    tagline: {
      en: "You have built an independent life, but a single tense phone call from home sends shockwaves of anxiety into your body.",
      id: "Kamu telah membangun kehidupan mandiri, tetapi satu telepon cemas dari rumah sanggup memicu kepanikan seharian.",
      de: "Du führst ein eigenes Leben, doch ein einziger angespannter Anruf aus der Heimat löst Stresswellen in dir aus.",
      fr: "Vous avez bâti votre vie, mais un coup de fil tendu de vos proches suffit à réveiller une vague d'angoisse.",
      es: "Has forjado tu vida, pero una sola llamada tensa de tu familia desata oleadas de ansiedad en tu cuerpo.",
    },
    description: {
      en: "You are partially individuated. You know you are entitled to your own privacy and choices, yet you still experience visceral guilt whenever you set limits. You often delay answering calls from relatives or deliberate for hours over how to word a gentle refusal without causing an emotional explosion.",
      id: "Kamu berada di fase transisi individuasi. Di logika, kamu tahu berhak punya privasi, namun tubuhmu masih bereaksi mulas dilanda rasa bersalah saat berkata tidak. Kamu sering menunda mengangkat telepon demi mengumpulkan keberanian mental.",
      de: "Du bist auf dem Weg zur Eigenständigkeit, doch Grenzen setzen fühlt sich im Magen noch wie Verrat an. Du überlegst oft stundenlang, wie du eine Absage formulierst, um niemanden zu verletzen.",
      fr: "Vous êtes en transition. Rationnellement, vous savez que vous avez droit à l'intimité, mais votre corps ressent encore chaque 'non' comme une trahison. Vous hésitez longuement avant de décliner.",
      es: "Estás en transición. Racionalmente sabes que mereces privacidad, pero tu cuerpo siente que poner límites es traición. Pasas horas pensando cómo decir no sin desatar el caos.",
    },
    psychologyInsight: {
      en: "This represents 'Functional Individuation with Emotional Enmeshment.' While you live independently, your autonomic nervous system remains tethered to the family's emotional thermostat.",
      id: "Kondisi ini disebut 'Individuasi Fungsional dengan Enmeshment Emosional.' Secara fisik kamu mandiri, namun sistem sarafmu masih tersandera oleh termostat suasana hati keluarga.",
      de: "Dies beschreibt 'funktionale Selbstständigkeit bei emotionaler Verstrickung.' Dein Körper reagiert noch immer auf die Stimmungsschwankungen des Herkunftssystems.",
      fr: "C'est l'individuation fonctionnelle avec intrication affective : vous vivez seul, mais votre système nerveux réagit au moindre signal d'alarme familial.",
      es: "Es la 'individuación funcional con enredo emocional': vives por tu cuenta, pero tu sistema nervioso sigue conectado al termostato emocional de tu familia.",
    },
    actionProtocols: {
      en: [
        "Implement the 24-Hour Buffer: Never say 'yes' to a family request on the spot; always say 'Let me check my calendar and get back to you tomorrow.'",
        "Record a voice journal entry in Nuju immediately after setting a boundary to discharge the physical guilt spike.",
        "Refrain from over-explaining refusals: 'I won't be able to make it this weekend, but I love you' is complete.",
      ],
      id: [
        "Terapkan Jeda 24 Jam: Jangan langsung mengiyakan permintaan keluarga di telepon; katakan 'Aku cek jadwal kerjaku dulu ya, besok kukabari.'",
        "Rilis beban rasa bersalah lewat jurnal suara Nuju begitu selesai menegakkan batasan agar sarafmu tidak tegang.",
        "Hentikan kebiasaan memberi alasan berbelit: 'Aku tidak bisa ikut akhir pekan ini, tapi aku tetap sayang kalian' sudah sangat cukup.",
      ],
      de: [
        "Nutze den 24-Stunden-Puffer: Sage bei Anfragen nie sofort zu, sondern: 'Ich prüfe meinen Kalender und melde mich morgen.'",
        "Sprich ein Nuju-Sprachtagebuch ein, um die körperliche Schuld nach einer Absage sofort zu entladen.",
        "Verzichte auf Rechtfertigungen: Ein liebevolles, klares Nein bedarf keiner seitenlangen Entschuldigung.",
      ],
      fr: [
        "Appliquez le délai de 24h : ne dites jamais oui immédiatement, annoncez que vous vérifierez votre agenda le lendemain.",
        "Déchargez la pointe de culpabilité dans un mémo vocal Nuju juste après avoir posé un refus.",
        "Cessez de vous justifier : un non calme et affectueux se suffit à lui-même.",
      ],
      es: [
        "Aplica la regla de las 24 horas: jamás digas sí de inmediato; di 'Reviso mi agenda y te confirmo mañana'.",
        "Graba un audio en el diario de Nuju tras poner un límite para drenar la culpa física acumulada.",
        "Elimina las sobreexplicaciones: una negativa cordial y breve no requiere justificación.",
      ],
    },
    dailyAffirmation: {
      en: "Disappointing my family's unrealistic expectations is not a crime; it is the necessary cost of living an authentic life.",
      id: "Mengecewakan ekspektasi keluarga yang berlebihan bukanlah dosa; itu adalah harga wajar demi hidup autentik.",
      de: "Unrealistische Erwartungen zu enttäuschen ist kein Verbrechen, sondern der Preis meiner Freiheit.",
      fr: "Décevoir des attentes disproportionnées n'est pas une faute, c'est le prix de ma liberté.",
      es: "Decepcionar expectativas desmedidas no es un delito, sino el precio legítimo de mi autenticidad.",
    },
  },

  enmeshed_protector: {
    level: "enmeshed_protector",
    badge: {
      en: "The Enmeshed Caretaker",
      id: "Penjaga yang Terjerat",
      de: "Der verstrickte Beschützer",
      fr: "Le Protecteur Intriqué",
      es: "El Guardián Atrapado",
    },
    title: {
      en: "The Parentified Fixer & Sacrificial Anchor",
      id: "Jangkar Penyelamat & Pengorbanan Diri yang Melelahkan",
      de: "Der parentifizierte Krisenmanager",
      fr: "Le Sauveur Parentifié & Pilier Épuisé",
      es: "El Pilar Sacrificado y Mediador Crónico",
    },
    tagline: {
      en: "You have spent your entire life holding the family ship together, sacrificing your own dreams so others wouldn't sink.",
      id: "Seumur hidupmu kamu habiskan menjaga kapal keluarga agar tidak karam, mengorbankan mimpimu demi kenyamanan mereka.",
      de: "Du hältst seit deiner Kindheit das Familienschiff über Wasser und opferst deine eigenen Träume für deren Stabilität.",
      fr: "Vous avez passé votre vie à maintenir le navire familial à flot au détriment de vos propres aspirations.",
      es: "Has dedicado tu vida a sostener a tu familia, postergando tus propios sueños para que nadie se hundiera.",
    },
    description: {
      en: "Your scores indicate severe emotional enmeshment. You were likely parentified as a child—forced to be a confidant to a distressed parent, the financial rescue hero, or the peacemaker in domestic chaos. Today, living an autonomous life feels like abandoning people in danger. You carry an agonizing sense of omnipotent responsibility for their debts, health, and happiness.",
      id: "Skormu menunjukkan jeratan emosional (enmeshment) tingkat tinggi. Di masa kecil, kamu dipaksa menjadi tempat curhat orang tua, pahlawan penyelamat ekonomi, atau penengah pertengkaran. Akibatnya, punya hidup sendiri terasa seperti menelantarkan orang dalam bahaya.",
      de: "Du bist massiv im Familiensystem verstrickt. Wahrscheinlich wurdest du früh parentifiziert und zum emotionalen Partner eines Elternteils gemacht. Ein eigenes glückliches Leben fühlt sich für dich wie unterlassene Hilfeleistung an.",
      fr: "Vos scores révèlent une forte intrication familiale. Souvent parentifié dès l'enfance, vous avez servi de confident ou de béquille financière. Construire votre vie personnelle vous donne l'impression d'abandonner des personnes en péril.",
      es: "Presentas un alto grado de enredo familiar. Probablemente sufriste parentificación: fuiste el terapeuta o el salvavidas económico de tu hogar. Vivir tu vida te hace sentir culpable como si abandonaras a un enfermo.",
    },
    psychologyInsight: {
      en: "Salvador Minuchin observed that in enmeshed families, 'when one person sneezes, everyone catches a cold.' The boundaries between ego and other have dissolved, creating diffuse boundary pathology.",
      id: "Pakar terapi keluarga Salvador Minuchin mencatat bahwa pada keluarga enmeshed, 'saat satu orang bersin, seluruh keluarga merasa tertular pilek.' Batas antara diri sendiri dan orang lain telah lenyap.",
      de: "Salvador Minuchin stellte fest: In verstrickten Familien hat niemand ein eigenes Immunsystem. Wenn einer leidet, müssen alle mitleiden. Grenzen existieren praktisch nicht.",
      fr: "Salvador Minuchin soulignait que dans les familles intriquées, quand un membre éternue, toute la maisonnée se sent malade. Les frontières du moi sont complètement brouillées.",
      es: "Salvador Minuchin observó que en familias enredadas, cuando uno estornuda, todos se enferman. Los límites del yo individual se han disuelto por completo.",
    },
    actionProtocols: {
      en: [
        "Acknowledge the Painful Truth: Your sacrifices have enabled their chronic dysfunction; stepping back allows them to grow.",
        "Establish Financial Firewalls: Stop bailing out adult family members; financial dependency destroys intimacy.",
        "Daily Somatic De-coupling: Use Nuju's breathing tools to calm the physical panic in your gut whenever they manufacture a crisis.",
      ],
      id: [
        "Akui Kenyataan Pahit: Pengorbananmu selama ini justru memelihara ketergantungan mereka; mundur perlahan memberi mereka ruang untuk mandiri.",
        "Buat Tembok Pembatas Finansial: Berhenti menalangi hutang orang dewasa lain; ketergantungan uang membunuh kasih sayang yang murni.",
        "Latihan Dekopling Somatik: Gunakan fitur breathwork Nuju untuk meredakan kepanikan di dada saat keluarga menciptakan drama baru.",
      ],
      de: [
        "Erkenne die Wahrheit: Deine ständige Rettung hat deren Unselbstständigkeit erst ermöglicht. Loslassen ist die einzige Heilung.",
        "Finanzielle Grenzen ziehen: Subventioniere keine erwachsenen Angehörigen mehr auf Kosten deiner Altersvorsorge.",
        "Somatische Entkopplung: Nutze Nujus Atemübungen, wenn ein neuer Familiennotruf deine Stressachsen hochjagt.",
      ],
      fr: [
        "Admettez la vérité : vos sacrifices répétés entretiennent leur dépendance ; vous retirer est leur seule chance de grandir.",
        "Cloisonnez vos finances : cessez de renflouer des adultes responsables au péril de votre équilibre.",
        "Déconnexion corporelle : pratiquez la respiration guidée sur Nuju dès qu'une fausse urgence familiale survient.",
      ],
      es: [
        "Acepta la realidad: tus rescates constantes perpetúan su inmadurez; alejarte les permite asumir su vida.",
        "Blindaje económico: deja de financiar a familiares adultos a costa de tu estabilidad.",
        "Desacople somático: usa la respiración guiada de Nuju cuando el drama ajeno dispare tu adrenalina.",
      ],
    },
    dailyAffirmation: {
      en: "I am their child, sibling, or partner—not their savior, bank, or emotional crutch. They have the strength to carry their own lives.",
      id: "Aku adalah anak/saudara mereka, bukan penyelamat, bank pribadi, atau tongkat penopang emosional mereka. Mereka punya kekuatan untuk menanggung hidup mereka sendiri.",
      de: "Ich bin ihr Verwandter, nicht ihr Erlöser, ihre Bank oder ihr Therapeut. Sie besitzen die Kraft für ihr eigenes Leben.",
      fr: "Je suis leur proche, pas leur sauveur, leur banquier ou leur béquille affective. Ils ont la force d'assumer leur existence.",
      es: "Soy su familiar, no su salvador, su banco o su muleta emocional. Ellos tienen la capacidad de sostener sus propias vidas.",
    },
  },

  fused_identity: {
    level: "fused_identity",
    badge: {
      en: "Fused Family Identity",
      id: "Identitas Melebur Total",
      de: "Völlige Identitätsfusion",
      fr: "Fusion Identitaire Totale",
      es: "Fusión Identitaria Total",
    },
    title: {
      en: "The Fused Family Extension & Total Loss of Self",
      id: "Peleburan Identitas & Hilangnya Kedaulatan Diri",
      de: "Die totale familiäre Verschmelzung",
      fr: "L'Ombre Familiale & la Dissolution du Soi",
      es: "La Extensión Familiar Fusa y la Pérdida del Yo",
    },
    tagline: {
      en: "You have no psychological walls between yourself and your family; their pain is your pain, and your autonomy is branded as treason.",
      id: "Tidak ada dinding pemisah antara dirimu dan keluargamu; derita mereka adalah deritamu, dan kemandirianmu dicap pengkhianatan.",
      de: "Es gibt keinerlei Grenze zwischen dir und deiner Familie; ihr Schmerz ist dein Schmerz, deine Freiheit gilt als Verrat.",
      fr: "Il n'y a plus aucune frontière entre vous et les vôtres; leur douleur est la vôtre, votre liberté est vue comme un crime.",
      es: "No existe frontera entre tú y tu familia; su dolor es tu condena y tu libertad es considerada alta traición.",
    },
    description: {
      en: "Your scores reflect extreme, clinical-grade family enmeshment. You have effectively been stripped of an independent ego. Your career, love life, financial resources, and daily thoughts are entirely subsumed by the family organism. Attempting to differentiate triggers catastrophic panic, severe depression, or acute somatic illness.",
      id: "Skormu menunjukkan peleburan identitas (fusion) tingkat kritis. Kamu hampir kehilangan 'aku' yang independen. Karir, asmara, uang, dan pikiranmu sepenuhnya dikuasai oleh sistem keluarga. Mencoba memisahkan diri memicu serangan panik akut atau depresi berat.",
      de: "Deine Ergebnisse zeigen eine extreme Fusion mit dem Familiensystem. Ein eigenständiges 'Ich' existiert kaum noch. Jeder Schritt in Richtung Autonomie wird von panischer Schuld und körperlichen Symptomen boykottiert.",
      fr: "Vos scores signalent une fusion affective extrême. Votre individualité a été presque entièrement dissoute dans le clan. Toute velléité d'autonomie engendre des crises de panique ou une détresse physique violente.",
      es: "Tus resultados reflejan un grado extremo de fusión familiar. Tu individualidad ha quedado absorbida por el clan. Cualquier intento de independencia desata ataques de pánico y un sufrimiento insoportable.",
    },
    psychologyInsight: {
      en: "In structural family therapy, this is termed 'Psychological Incest' or 'Total Fusion.' The child was never permitted to hatch psychologically, remaining trapped in an undifferentiated family ego mass.",
      id: "Dalam psikoterapi struktural, ini disebut 'Peleburan Total' (*Undifferentiated Family Ego Mass*). Sang anak tidak pernah diizinkan menetas secara psikologis dari cangkang keluarga.",
      de: "In der Psychoanalyse spricht man von einer 'ungetrennten Familien-Ego-Masse'. Das Individuum durfte psychologisch nie aus dem familiären Ei schlüpfen.",
      fr: "En thérapie familiale, on parle de masse de moi familial indifférenciée : la personne n'a jamais été autorisée à éclore psychologiquement hors du clan.",
      es: "En terapia familiar sistémica, esto corresponde a la masa indiferenciada del ego familiar: nunca se te permitió nacer psicológicamente como un ser independiente.",
    },
    actionProtocols: {
      en: [
        "Urgent Clinical Guidance: Work with a licensed family systems or trauma therapist specializing in enmeshment recovery.",
        "The Secret Sanctuary Exercise: Cultivate one hobby, friendship, or savings account that is 100% private from family knowledge.",
        "Daily Boundary Voice Journaling: Speak your authentic desires aloud in Nuju to rebuild your dormant sense of self.",
      ],
      id: [
        "Bantuan Profesional: Sangat dianjurkan berkonsultasi dengan psikolog klinis yang memahami trauma sistem keluarga dan batasan diri.",
        "Ruang Rahasia Pribadi: Miliki satu hobi, teman terpercaya, atau tabungan mandiri yang sama sekali tidak diketahui keluarga.",
        "Jurnal Suara Penegasan Diri: Ucapkan keinginan dan opinimu secara lantang di jurnal suara Nuju untuk membangunkan kembali dirimu yang tertidur.",
      ],
      de: [
        "Professionelle Begleitung: Suche therapeutische Unterstützung bei Spezialisten für Familiensysteme und Bindungstrauma.",
        "Das geheime Refugium: Etabliere ein Hobby oder ein Notfallkonto, von dem deine Familie absolut nichts weiß.",
        "Tägliches Nuju-Journaling: Formuliere deine wahren Wünsche laut per Spracheingabe, um deine Identität schrittweise zurückzufordern.",
      ],
      fr: [
        "Soutien thérapeutique : faites-vous accompagner par un thérapeute familial pour briser l'emprise en toute sécurité.",
        "Le jardin secret : conservez une passion, une amitié ou une épargne strictement confidentielle sans en référer à la famille.",
        "Journaling vocal Nuju : exprimez vos désirs réels à voix haute pour réveiller votre sentiment d'existence propre.",
      ],
      es: [
        "Apoyo profesional urgente: busca terapia sistémica o especializada en trauma de desarrollo para recuperar tu individualidad.",
        "El santuario secreto: crea un espacio, una afición o un fondo de ahorro 100% confidencial que nadie en tu familia conozca.",
        "Diario de voz en Nuju: verbaliza tus verdaderos deseos en voz alta para reconstruir tu yo dormido.",
      ],
    },
    dailyAffirmation: {
      en: "I am not an extension of my family. I am an autonomous human being with a sacred right to my own mind, body, and destiny.",
      id: "Aku bukan perpanjangan tangan keluargaku. Aku adalah manusia berdaulat yang berhak penuh atas pikiran, tubuh, dan takdirku sendiri.",
      de: "Ich bin kein verlängerter Arm meiner Familie. Ich bin ein eigenständiger Mensch mit dem Recht auf mein eigenes Leben.",
      fr: "Je ne suis pas le prolongement de ma famille. Je suis un être souverain avec le droit sacré d'écrire mon propre destin.",
      es: "No soy una extensión de mi familia. Soy un ser humano soberano con el derecho sagrado a mi propia mente, cuerpo y destino.",
    },
  },
};

export function calculateEnmeshmentScore(answers: Record<number, number>): EnmeshmentScoreResult {
  let totalScore = 0;
  let intrusiveScore = 0;
  let identityScore = 0;
  let guiltScore = 0;

  ENMESHMENT_QUESTIONS.forEach((q) => {
    const score = answers[q.id] ?? 0;
    totalScore += score;

    if (q.subscale === "psychological_intrusiveness") intrusiveScore += score;
    if (q.subscale === "identity_subjugation") identityScore += score;
    if (q.subscale === "boundary_guilt") guiltScore += score;
  });

  const maxTotal = ENMESHMENT_QUESTIONS.length * 3; // 36
  const maxSubscale = 4 * 3; // 12
  const percentage = Math.round((totalScore / maxTotal) * 100);

  let level: EnmeshmentArchetype["level"];
  if (percentage <= 24) {
    level = "individuated_secure";
  } else if (percentage <= 49) {
    level = "loyal_mediator";
  } else if (percentage <= 74) {
    level = "enmeshed_protector";
  } else {
    level = "fused_identity";
  }

  return {
    totalScore,
    percentage,
    level,
    profile: ENMESHMENT_ARCHETYPES[level],
    subscales: {
      psychological_intrusiveness: {
        score: intrusiveScore,
        percentage: Math.round((intrusiveScore / maxSubscale) * 100),
      },
      identity_subjugation: {
        score: identityScore,
        percentage: Math.round((identityScore / maxSubscale) * 100),
      },
      boundary_guilt: {
        score: guiltScore,
        percentage: Math.round((guiltScore / maxSubscale) * 100),
      },
    },
  };
}
