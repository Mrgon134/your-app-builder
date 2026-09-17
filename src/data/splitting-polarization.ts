export type SplittingLang = "en" | "id" | "de" | "fr" | "es";

export type SplittingSubscale =
  | "idealization_devaluation"
  | "all_or_nothing"
  | "intolerance_ambivalence";

export interface SplittingQuestion {
  id: number;
  subscale: SplittingSubscale;
  prompt: Record<SplittingLang, string>;
  options: {
    label: Record<SplittingLang, string>;
    score: number; // 0 to 3
  }[];
}

export interface SplittingArchetypeProfile {
  level: "dialectical_integration" | "mild_polarization" | "acute_splitting" | "severe_fragmentation";
  badge: Record<SplittingLang, string>;
  title: Record<SplittingLang, string>;
  tagline: Record<SplittingLang, string>;
  description: Record<SplittingLang, string>;
  psychologyInsight: Record<SplittingLang, string>;
  actionProtocols: Record<SplittingLang, string[]>;
  dailyAffirmation: Record<SplittingLang, string>;
}

export interface SplittingScoreResult {
  totalScore: number;
  maxScore: number;
  percentage: number;
  level: "dialectical_integration" | "mild_polarization" | "acute_splitting" | "severe_fragmentation";
  subscales: {
    idealization_devaluation: { score: number; max: number; percentage: number };
    all_or_nothing: { score: number; max: number; percentage: number };
    intolerance_ambivalence: { score: number; max: number; percentage: number };
  };
  profile: SplittingArchetypeProfile;
}

export const SPLITTING_QUESTIONS: SplittingQuestion[] = [
  // Subscale 1: Idealization & Devaluation Whiplash (Q1 - Q4)
  {
    id: 1,
    subscale: "idealization_devaluation",
    prompt: {
      en: "When I meet someone I like, I quickly put them on a pedestal as 'perfect' or 'my savior', but a single disappointment can flip my view to disgust or betrayal.",
      id: "Saat bertemu orang yang kusukai, aku cepat memujanya sebagai sosok 'sempurna' atau 'penyelamatku', namun satu kekecewaan kecil bisa langsung mengubah pandanganku menjadi jijik atau merasa dikhianati.",
      de: "Wenn ich jemanden mag, hebe ich ihn schnell auf ein Podest. Doch eine einzige Enttäuschung lässt das Gefühl in Verachtung oder Verrat umschlagen.",
      fr: "Quand j'apprécie quelqu'un, je l'idéalise comme 'parfait'. Mais une seule déception peut transformer mon admiration en dégoût ou sentiment de trahison.",
      es: "Cuando alguien me agrada, lo subo rápidamente a un pedestal. Sin embargo, una sola decepción puede transformar mi devoción en desprecio o traición.",
    },
    options: [
      {
        score: 0,
        label: {
          en: "Rarely; I see people realistically with both strengths and flaws",
          id: "Jarang; saya memandang orang secara realistis dengan kelebihan dan kekurangannya",
          de: "Selten; ich sehe Menschen realistisch mit Stärken und Schwächen",
          fr: "Rarement; je perçois les gens avec lucidité, qualités et défauts mêlés",
          es: "Rara vez; veo a las personas de forma realista con virtudes y defectos",
        },
      },
      {
        score: 1,
        label: {
          en: "Occasionally; mostly in early romance, but it softens over time",
          id: "Sesekali; terutama di awal hubungan asmara, namun melunak seiring waktu",
          de: "Gelegentlich; vor allem in der ersten Verliebtheitsphase",
          fr: "Parfois; surtout au début d'un coup de foudre amoureux",
          es: "A veces; sobre todo en los primeros compases del enamoramiento",
        },
      },
      {
        score: 2,
        label: {
          en: "Frequently; people switch in my mind from 'angelic' to 'evil' overnight",
          id: "Sering; orang bisa berubah dalam pikiranku dari 'malaikat' menjadi 'jahat' dalam semalam",
          de: "Häufig; Menschen wechseln in meinem Kopf über Nacht von 'Engel' zu 'Feind'",
          fr: "Souvent; les gens passent dans mon esprit du statut d'ange à celui d'ennemi du jour au lendemain",
          es: "Frecuentemente; las personas pasan en mi mente de ser ángeles a seres dañinos de un día para otro",
        },
      },
      {
        score: 3,
        label: {
          en: "Almost constantly; my relationships are an exhausting rollercoaster of intense worship followed by complete devaluation",
          id: "Hampir selalu; hubunganku adalah roller-coaster melelahkan antara pemujaan ekstrem lalu pemutusan total",
          de: "Fast immer; meine Beziehungen sind eine Achterbahn aus Vergötterung und totaler Entwertung",
          fr: "Presque constamment; mes liens sont un enfer oscillant entre idolâtrie totale et mépris absolu",
          es: "Casi constantemente; mis relaciones son una montaña rusa desgarradora de devoción y desprecio absoluto",
        },
      },
    ],
  },
  {
    id: 2,
    subscale: "idealization_devaluation",
    prompt: {
      en: "If a close friend or partner cancels plans or forgets something important to me, I feel an instant conviction that they never truly loved or cared about me at all.",
      id: "Jika teman dekat atau pasangan membatalkan janji atau melupakan hal penting, seketika muncul keyakinan bahwa mereka sebenarnya tidak pernah peduli padaku sejak awal.",
      de: "Wenn ein Freund absagt, überkommt mich die sofortige Überzeugung, dass er mich nie wirklich geschätzt hat.",
      fr: "Si un ami annule un plan, je conclus aussitôt qu'il ne m'a jamais sincèrement aimé.",
      es: "Si un amigo cancela un plan, siento la certeza instantánea de que jamás le importé de verdad.",
    },
    options: [
      {
        score: 0,
        label: {
          en: "Never; I understand schedules and human mistakes don't define care",
          id: "Tidak pernah; saya paham kesibukan dan kekhilafan manusiawi bukan berarti tak peduli",
          de: "Nie; ich weiß, dass Termine und Vergesslichkeit nichts über Wertschätzung aussagen",
          fr: "Jamais; je sais que les imprévus ne remettent pas en cause l'amitié",
          es: "Nunca; entiendo que un despiste no anula el cariño",
        },
      },
      {
        score: 1,
        label: {
          en: "Briefly; a momentary sting of disappointment, then rational perspective returns",
          id: "Sebentar; ada rasa kecewa sesaat, lalu logika rasional kembali bekerja",
          de: "Kurz; kurze Enttäuschung, aber die Vernunft setzt sich rasch durch",
          fr: "Brièvement; une pointe de déception passagère, vite dissipée",
          es: "Brevemente; un chasco pasajero que se disipa con rapidez",
        },
      },
      {
        score: 2,
        label: {
          en: "Often; their entire past history of kindness is instantly erased from my memory",
          id: "Sering; seluruh kebaikan mereka di masa lalu mendadak terhapus dari ingatanku",
          de: "Oft; all ihre früheren guten Taten sind in dem Moment wie ausgelöscht",
          fr: "Souvent; toutes leurs preuves de gentillesse passées s'évaporent instantanément",
          es: "A menudo; todos sus gestos nobles anteriores se borran de golpe en mi mente",
        },
      },
      {
        score: 3,
        label: {
          en: "Always; a single mistake erases years of trust, and I immediately want to burn the bridge forever",
          id: "Selalu; satu kesalahan menghapus bertahun-tahun kepercayaan, dan aku langsung ingin memutuskan kontak selamanya",
          de: "Immer; ein Fehler vernichtet Jahre des Vertrauens; ich will sofort alle Brücken abbrechen",
          fr: "Toujours; une maladresse détruit des années de confiance et me pousse à la rupture définitive",
          es: "Siempre; un solo error destruye años de lealtad y me dan ganas de cortar para siempre",
        },
      },
    ],
  },
  {
    id: 3,
    subscale: "idealization_devaluation",
    prompt: {
      en: "I divide people in my social circle or workplace into 'the good, loyal ones' versus 'the toxic, hostile enemies', with zero middle ground.",
      id: "Aku membagi orang-orang di lingkaran sosial atau kantorku menjadi kelompok 'orang baik dan setia' versus 'musuh beracun dan jahat', tanpa ada kategori tengah.",
      de: "Ich unterteile mein Umfeld strikt in 'die Guten, Treuen' und 'die bösen, toxischen Feinde' – ohne Grauzone.",
      fr: "Je classe les gens de mon entourage entre 'les alliés parfaits' et 'les ennemis toxiques', sans nuance.",
      es: "Divido a la gente de mi entorno entre 'los leales e intachables' y 'los enemigos tóxicos', sin término medio.",
    },
    options: [
      {
        score: 0,
        label: {
          en: "Never; humans are complex, nuanced, and flawed in varying degrees",
          id: "Tidak pernah; manusia itu kompleks, bernuansa, dan memiliki kelemahan yang wajar",
          de: "Nie; Menschen sind vielschichtig und haben verschiedene Facetten",
          fr: "Jamais; la nature humaine est complexe et nuancée",
          es: "Nunca; las personas somos complejas y estamos llenas de matices",
        },
      },
      {
        score: 1,
        label: {
          en: "Rarely; only when someone has actively caused severe, repeated harm",
          id: "Jarang; hanya jika seseorang memang berkali-kali merugikan secara sengaja",
          de: "Selten; nur bei wiederholtem, schwerem Fehlverhalten",
          fr: "Rarement; uniquement envers ceux qui ont commis des actes graves répétés",
          es: "Rara vez; solo ante personas que han causado daño grave intencionado",
        },
      },
      {
        score: 2,
        label: {
          en: "Frequently; I find it very difficult to stay neutral when someone shows questionable behavior",
          id: "Sering; aku sulit bersikap netral begitu seseorang menunjukkan gelagat meragukan",
          de: "Häufig; es fällt mir schwer, neutral zu bleiben, wenn jemand fragwürdig handelt",
          fr: "Souvent; j'ai beaucoup de mal à rester neutre dès qu'un doute s'installe",
          es: "Frecuentemente; me cuesta mantener la neutralidad ante una actitud dudosa",
        },
      },
      {
        score: 3,
        label: {
          en: "Constantly; you are either 100% on my side, or you are an enemy conspiring against me",
          id: "Terus-menerus; kamu harus 100% memihakku, atau kamu adalah musuh yang berkomplot melawanku",
          de: "Ständig; man ist entweder 100 % für mich oder ein heimtückischer Gegner",
          fr: "Constamment; c'est avec moi à 100 % ou contre moi comme un ennemi juré",
          es: "Constantemente; o estás al 100 % de mi parte o eres un enemigo que conspira contra mí",
        },
      },
    ],
  },
  {
    id: 4,
    subscale: "idealization_devaluation",
    prompt: {
      en: "My perception of my own worth swings violently: one day I feel like an extraordinary genius, and the next day I feel like complete, unredeemable garbage.",
      id: "Pandanganku terhadap harga diriku berubah drastis: suatu hari merasa jenius luar biasa, namun keesokan harinya merasa seperti sampah menjijikkan yang tak tertolong.",
      de: "Mein Selbstbild schwankt extrem: Einen Tag fühle ich mich genial, am nächsten wie wertloser Abfall.",
      fr: "Mon estime de moi oscille violemment: un jour je me sens exceptionnel, le lendemain comme un déchet sans espoir.",
      es: "Mi autoimagen oscila salvajemente: un día me creo un genio brillante y al siguiente una basura irrecuperable.",
    },
    options: [
      {
        score: 0,
        label: {
          en: "Never; I maintain a stable, grounded self-esteem regardless of daily performance",
          id: "Tidak pernah; harga diriku stabil dan kokoh terlepas dari pasang surut hasil kerja harian",
          de: "Nie; mein Selbstwertgefühl ist stabil und unabhängig von Tagesformen",
          fr: "Jamais; mon estime personnelle reste constante et ancrée",
          es: "Nunca; mantengo una autoestima estable al margen de los resultados del día",
        },
      },
      {
        score: 1,
        label: {
          en: "Occasionally; bad days dent my confidence, but I bounce back",
          id: "Sesekali; hari buruk sempat menggoyahkan rasa percaya diri, namun lekas pulih",
          de: "Gelegentlich; schlechte Tage kratzen am Ego, aber ich fange mich wieder",
          fr: "Parfois; les mauvaises journées égratignent ma confiance mais je rebondis",
          es: "A veces; los días malos me afectan un poco pero recupero el tono",
        },
      },
      {
        score: 2,
        label: {
          en: "Frequently; I lack a continuous sense of who I am, fluctuating with recent outcomes",
          id: "Sering; aku tidak punya pemahaman utuh tentang siapa diriku, tergantung hasil terakhir",
          de: "Häufig; mein Selbstbild hängt fast ausschließlich von jüngsten Erfolgen oder Misserfolgen ab",
          fr: "Souvent; mon identité est fragmentée et varie selon ma dernière réussite ou échec",
          es: "Frecuentemente; carezco de una autoimagen sólida y dependo del último resultado",
        },
      },
      {
        score: 3,
        label: {
          en: "Always; my inner reality is completely polarized between grandiosity and suicidal self-loathing",
          id: "Selalu; duniaku terpolarisasi mutlak antara rasa bangga semu berlebihan dan kebencian diri yang mematikan",
          de: "Immer; meine Innenwelt zerreißt zwischen Allmachtsfantasien und vernichtendem Selbsthass",
          fr: "Toujours; mon univers intérieur bascule sans cesse entre illusion de grandeur et haine de soi destructrice",
          es: "Siempre; mi mente vive desgarrada entre la grandiosidad ficticia y el autodesprecio suicida",
        },
      },
    ],
  },

  // Subscale 2: All-or-Nothing Dichotomy (Q5 - Q8)
  {
    id: 5,
    subscale: "all_or_nothing",
    prompt: {
      en: "If an outcome is not 100% flawless, I categorize the entire endeavor as a total, humiliating failure.",
      id: "Jika suatu hasil kerja tidak 100% sempurna tanpa cacat, aku menganggap seluruh usahaku sebagai kegagalan total yang memalukan.",
      de: "Wenn etwas nicht zu 100 % perfekt läuft, werte ich das gesamte Projekt als peinliche Niederlage.",
      fr: "Si un projet n'est pas irréprochable à 100 %, je le considère comme un échec cuisant et honteux.",
      es: "Si un resultado no es impecable al 100 %, considero que todo el esfuerzo ha sido un fracaso humillante.",
    },
    options: [
      {
        score: 0,
        label: {
          en: "Never; progress and partial success are worthy and valuable",
          id: "Tidak pernah; kemajuan bertahap dan keberhasilan parsial tetaplah bernilai",
          de: "Nie; Teilerfolge und Fortschritt sind wertvoll und lehrreich",
          fr: "Jamais; les réussites partielles et les progrès ont une vraie valeur",
          es: "Nunca; el progreso y los éxitos parciales tienen mucho mérito",
        },
      },
      {
        score: 1,
        label: {
          en: "Rarely; I feel brief irritation with mistakes, but celebrate the overall win",
          id: "Jarang; ada sedikit kekesalan atas kesalahan, namun tetap merayakan pencapaian keseluruhan",
          de: "Selten; kleine Mängel ärgern mich kurz, aber das Gesamtergebnis zählt",
          fr: "Rarement; les coquilles m'agacent un peu, mais je salue le travail accompli",
          es: "Rara vez; los fallos me fastidian un instante, pero celebro el logro global",
        },
      },
      {
        score: 2,
        label: {
          en: "Often; small imperfections spoil my satisfaction completely",
          id: "Sering; ketidaksempurnaan kecil langsung merusak seluruh rasa puas dan banggaku",
          de: "Oft; kleinste Schönheitsfehler verderben mir jede Freude am Geschafften",
          fr: "Souvent; un détail imparfait suffit à gâcher toute ma satisfaction",
          es: "A menudo; una imperfección mínima arruina por completo mi satisfacción",
        },
      },
      {
        score: 3,
        label: {
          en: "Constantly; in my mind, there are only two categories in the universe: Perfection or Disaster",
          id: "Terus-menerus; dalam pikiranku hanya ada dua kategori di semesta ini: Sempurna atau Bencana",
          de: "Ständig; in meinem Denken gibt es nur zwei Zustände: Vollkommenheit oder Katastrophe",
          fr: "Constamment; dans mon cerveau, il n'existe que deux pôles: la perfection ou le désastre",
          es: "Constantemente; en mi cabeza solo existen dos realidades: la perfección o el desastre",
        },
      },
    ],
  },
  {
    id: 6,
    subscale: "all_or_nothing",
    prompt: {
      en: "I use extreme, absolutist language in my internal thoughts and arguments ('You always...', 'I never...', 'Nobody cares', 'Everything is ruined').",
      id: "Aku terbiasa memakai kata-kata mutlak dalam pikiran batin atau perdebatan ('Kamu selalu...', 'Aku tidak pernah...', 'Tak ada yang peduli', 'Semuanya hancur').",
      de: "Ich denke und streite in Absolutheitsbegriffen ('Du machst immer...', 'Nie klappt was', 'Alles ist ruiniert').",
      fr: "J'utilise des termes absolus et radicaux dans mes pensées ('Tu fais toujours...', 'Jamais personne...', 'Tout est fichu').",
      es: "Uso términos absolutistas y extremos al pensar o discutir ('Siempre haces...', 'Nunca me...', 'Nadie me apoya', 'Todo está arruinado').",
    },
    options: [
      {
        score: 0,
        label: {
          en: "Never; I qualify statements with realistic nuance ('sometimes', 'in this instance')",
          id: "Tidak pernah; saya memakai bahasa yang bernuansa ('kadang-kadang', 'dalam kasus ini')",
          de: "Nie; ich drücke mich differenziert und situativ aus ('manchmal', 'dieses Mal')",
          fr: "Jamais; je nuance mes propos avec précision ('parfois', 'dans ce cas précis')",
          es: "Nunca; matizo con prudencia ('a veces', 'en esta ocasión')",
        },
      },
      {
        score: 1,
        label: {
          en: "Occasionally; when feeling exhausted or under acute deadline stress",
          id: "Sesekali; saat sangat lelah atau di bawah tekanan tenggat waktu yang ketat",
          de: "Gelegentlich; unter extremem Zeitdruck oder bei Übermüdung",
          fr: "Parfois; sous le coup d'une grande fatigue ou d'un stress aigu",
          es: "A veces; cuando estoy agotado o bajo mucha presión",
        },
      },
      {
        score: 2,
        label: {
          en: "Frequently; my mind jumps to hyperbole before I catch myself",
          id: "Sering; pikiranku refleks meloncat ke pernyataan berlebihan sebelum sempat kusadari",
          de: "Häufig; mein Denken verfällt reflexartig in Übertreibungen",
          fr: "Souvent; mon esprit verse dans l'exagération avant que je ne m'en aperçoive",
          es: "Frecuentemente; mi mente cae en la hipérbole antes de poder frenar",
        },
      },
      {
        score: 3,
        label: {
          en: "Always; my cognitive default operates exclusively in binary, hyperbolic extremes",
          id: "Selalu; cara berpikir default-ku bekerja mutlak dalam ekstremitas biner hitam-putih",
          de: "Immer; mein Denken bewegt sich ausnahmslos in extremen Schwarz-Weiß-Kategorien",
          fr: "Toujours; mon mode de pensée par défaut est binaire, sans aucun gris",
          es: "Siempre; mi patrón mental opera por defecto en extremos binarios y categóricos",
        },
      },
    ],
  },
  {
    id: 7,
    subscale: "all_or_nothing",
    prompt: {
      en: "When a habit or diet slips by a tiny fraction (e.g. eating one cookie), I throw away the entire plan: 'The day is ruined anyway, I might as well binge.'",
      id: "Saat kebiasaan baik atau pola diet meleset sedikit saja (misal makan satu biskuit), aku membuang seluruh rencana: 'Hari ini sudah rusak, sekalian saja berantakan.'",
      de: "Wenn ich eine Gewohnheit minimal breche (z. B. ein Keks), gebe ich alles auf: 'Jetzt ist es eh egal.'",
      fr: "Si je dévie d'un millimètre de mes résolutions, j'abandonne tout: 'Puisque c'est gâché, autant tout lâcher.'",
      es: "Si cometo un desliz mínimo en mi rutina o dieta, tiro la toalla: 'Total, el día está arruinado, de perdidos al río.'",
    },
    options: [
      {
        score: 0,
        label: {
          en: "Never; I adjust gently and resume my routine at the very next meal or task",
          id: "Tidak pernah; saya menyesuaikan dengan tenang dan melanjutkan rutinitas di sesi berikutnya",
          de: "Nie; ich mache beim nächsten Schritt einfach normal weiter",
          fr: "Jamais; je rectifie le tir avec souplesse au repas ou moment suivant",
          es: "Nunca; retomo el rumbo con naturalidad en el siguiente paso",
        },
      },
      {
        score: 1,
        label: {
          en: "Occasionally; but I prevent full collapse with self-compassion",
          id: "Sesekali; namun saya mencegah kehancuran total dengan welas asih pada diri sendiri",
          de: "Gelegentlich; fange mich aber durch Selbstfürsorge schnell wieder",
          fr: "Parfois; mais je m'accorde de la bienveillance pour ne pas sombrer",
          es: "A veces; pero me trato con cariño para no desmadrarme",
        },
      },
      {
        score: 2,
        label: {
          en: "Often; minor slips trigger self-sabotaging downward spirals",
          id: "Sering; kelalaian kecil memicu spiral kehancuran sabotase diri",
          de: "Oft; kleine Fehler lösen Abwärtsspiralen von Selbstsabotage aus",
          fr: "Souvent; un faux pas entraîne une spirale d'auto-sabotage",
          es: "A menudo; un desliz menor desata una espiral de autosabotaje",
        },
      },
      {
        score: 3,
        label: {
          en: "Always; my life is an endless loop of 100% militant discipline followed by 0% hedonistic chaos",
          id: "Selalu; hidupku adalah siklus tiada henti antara 100% disiplin militer ketat lalu 0% kekacauan total",
          de: "Immer; mein Leben schwankt zwischen 100 % militärischer Disziplin und 0 % totalem Chaos",
          fr: "Toujours; ma vie alterne entre 100 % de discipline militaire et 0 % d'abandon chaotique",
          es: "Siempre; mi vida es un bucle entre disciplina militar al 100 % y caos descontrolado al 0 %",
        },
      },
    ],
  },
  {
    id: 8,
    subscale: "all_or_nothing",
    prompt: {
      en: "I struggle to understand that someone can love me deeply while simultaneously feeling angry or frustrated with me in the moment.",
      id: "Aku sangat sulit memahami bahwa seseorang bisa tetap mencintaiku dengan tulus meskipun saat itu mereka sedang kesal atau marah padaku.",
      de: "Ich kann kaum begreifen, dass jemand mich liebt und gleichzeitig wütend auf mich sein kann.",
      fr: "J'ai du mal à concevoir qu'on puisse m'aimer profondément tout en étant fâché contre moi sur l'instant.",
      es: "Me cuesta horrores entender que alguien me quiera de verdad y a la vez esté enfadado conmigo en ese instante.",
    },
    options: [
      {
        score: 0,
        label: {
          en: "Never; I have solid emotional object constancy and know anger does not cancel love",
          id: "Tidak pernah; kelekatan emosional (object constancy)-ku kokoh dan tahu kemarahan tak menghapus cinta",
          de: "Nie; ich besitze Objektkonstanz und weiß, dass Streit die Liebe nicht zerstört",
          fr: "Jamais; j'ai une constance d'objet solide: la colère n'annule pas l'affection",
          es: "Nunca; tengo constancia objetal: el enfado no borra el amor",
        },
      },
      {
        score: 1,
        label: {
          en: "Mildly; conflict makes me anxious, but I remember our bond",
          id: "Sedikit; konflik membuatku cemas, namun aku ingat ikatan kasih kami",
          de: "Leicht; Konflikte verunsichern mich kurz, aber das Fundament hält",
          fr: "Légèrement; les conflits m'angoissent un peu, mais le lien reste présent",
          es: "Levemente; el conflicto me inquieta, pero confío en la base del vínculo",
        },
      },
      {
        score: 2,
        label: {
          en: "Frequently; when they are upset, my gut screams that our relationship is dead",
          id: "Sering; saat mereka marah, batinku menjerit meyakini bahwa hubungan ini sudah tamat",
          de: "Häufig; wenn der andere sauer ist, schreit mein Bauchgefühl: 'Es ist vorbei!'",
          fr: "Souvent; dès qu'il y a de la rancœur, mes tripes crient que l'histoire est finie",
          es: "Frecuentemente; si se enfadan, mis entrañas gritan que la relación ha muerto",
        },
      },
      {
        score: 3,
        label: {
          en: "Always; anger feels like absolute rejection. I cannot hold love and conflict simultaneously.",
          id: "Selalu; kemarahan terasa seperti penolakan mutlak. Aku tak sanggup menggenggam cinta dan konflik sekaligus.",
          de: "Immer; Wut fühlt sich wie Vernichtung an. Ich kann Liebe und Zorn nicht gleichzeitig denken.",
          fr: "Toujours; la colère est vécue comme un rejet absolu. Je ne peux concevoir amour et désaccord ensemble.",
          es: "Siempre; el enfado se siente como repudio total. Me es imposible sostener amor y conflicto a la vez.",
        },
      },
    ],
  },

  // Subscale 3: Intolerance of Emotional Ambivalence (Q9 - Q12)
  {
    id: 9,
    subscale: "intolerance_ambivalence",
    prompt: {
      en: "Gray areas, mixed feelings, or unresolved relationship ambiguity cause me so much physical distress that I force premature ultimatums just to end the uncertainty.",
      id: "Area abu-abu, perasaan campur aduk, atau ketidakjelasan hubungan menimbulkan derita fisik begitu hebat hingga aku memaksakan ultimatum prematur demi mengakhiri keraguan.",
      de: "Ungewissheit und diffuse Beziehungszustände quälen mich so sehr, dass ich überstürzte Ultimaten erzwinge.",
      fr: "L'ambiguïté relationnelle me torture tellement que je force des ultimatums prématurés pour trancher.",
      es: "Las zonas grises o la falta de claridad en los vínculos me angustian tanto que lanzo ultimátums apresurados solo por acabar con la duda.",
    },
    options: [
      {
        score: 0,
        label: {
          en: "Never; I comfortably sit with uncertainty and allow situations to develop organically",
          id: "Tidak pernah; saya nyaman dengan ketidakpastian dan membiarkan situasi berkembang alami",
          de: "Nie; ich kann Unklarheiten aushalten und Dingen Zeit zur Entwicklung geben",
          fr: "Jamais; je tolère le flou et laisse le temps faire son œuvre avec sérénité",
          es: "Nunca; convivo bien con la incertidumbre y dejo que las cosas maduren a su ritmo",
        },
      },
      {
        score: 1,
        label: {
          en: "Occasionally; lingering ambiguity is annoying, but manageable without drama",
          id: "Sesekali; ketidakjelasan berlarut memang mengganggu, namun masih bisa diatasi tanpa drama",
          de: "Gelegentlich; anhaltende Unklarheit nervt, lässt sich aber sachlich klären",
          fr: "Parfois; le flou prolongé m'agace un peu mais je le gère sans éclat",
          es: "A veces; la ambigüedad prolongada molesta, pero la gestiono sin dramas",
        },
      },
      {
        score: 2,
        label: {
          en: "Often; I would rather hear bad news than endure another day of not knowing",
          id: "Sering; aku lebih memilih mendengar kabar buruk daripada harus menanggung ketidaktahuan sehari lagi",
          de: "Oft; ich habe lieber ein klares schlechtes Ende als einen Tag länger Ungewissheit",
          fr: "Souvent; je préfère une mauvaise nouvelle nette plutôt qu'un jour de doute supplémentaire",
          es: "A menudo; prefiero una mala noticia tajante a soportar un día más de incertidumbre",
        },
      },
      {
        score: 3,
        label: {
          en: "Always; unresolved ambivalence triggers severe panic, driving me to sabotage or blow up connections prematurely",
          id: "Selalu; ketidakpastian memicu panik akut, mendorongku menyabotase atau meledakkan hubungan secara prematur",
          de: "Immer; Ambivalenz erzeugt Panik; ich zerstöre Bindungen lieber selbst, als das Schweben zu ertragen",
          fr: "Toujours; le doute provoque une panique telle que je dynamite le lien pour ne plus souffrir",
          es: "Siempre; la ambivalencia me desquicia tanto que reviento los lazos con tal de no sostener la duda",
        },
      },
    ],
  },
  {
    id: 10,
    subscale: "intolerance_ambivalence",
    prompt: {
      en: "I feel intense urge to categorize people immediately upon meeting them: they are either 'safe and trustworthy' or 'dangerous and suspicious'.",
      id: "Aku merasakan dorongan kuat untuk langsung melabeli orang saat pertama bertemu: mereka 'aman dan terpercaya' atau 'berbahaya dan mencurigakan'.",
      de: "Ich muss Menschen sofort einstufen: Entweder sind sie 'sicher und gut' oder 'gefährlich und verdächtig'.",
      fr: "J'éprouve le besoin irrépressible de classer les gens dès la première rencontre: 'sûr' ou 'dangereux'.",
      es: "Siento la necesidad compulsiva de etiquetar a la gente nada más conocerla: 'de fiar' o 'peligrosa y sospechosa'.",
    },
    options: [
      {
        score: 0,
        label: {
          en: "Never; I hold healthy curiosity and gather evidence over time",
          id: "Tidak pernah; saya menjaga rasa ingin tahu yang sehat dan mengamati bukti seiring waktu",
          de: "Nie; ich bleibe offen und bilde mir mein Urteil schrittweise",
          fr: "Jamais; je reste curieux et forge mon opinion avec le temps",
          es: "Nunca; mantengo una curiosidad prudente y evalúo con el tiempo",
        },
      },
      {
        score: 1,
        label: {
          en: "Rarely; initial gut feelings exist, but I readily update them with new data",
          id: "Jarang; ada firasat awal, namun saya siap memperbaruinya dengan data baru",
          de: "Selten; erste Intuition ja, aber ich passe sie flexibel an",
          fr: "Rarement; j'ai des intuitions mais les réajuste volontiers",
          es: "Rara vez; tengo intuiciones iniciales pero las adapto a la realidad",
        },
      },
      {
        score: 2,
        label: {
          en: "Frequently; first impressions solidify into rigid, immovable judgments",
          id: "Sering; kesan pertama langsung mengeras menjadi penilaian kaku yang sulit diubah",
          de: "Häufig; erste Eindrücke versteinern bei mir schnell zu starren Urteilen",
          fr: "Souvent; mes premières impressions se figent en jugements intraitables",
          es: "Frecuentemente; mis primeras impresiones se petrifican en juicios rígidos",
        },
      },
      {
        score: 3,
        label: {
          en: "Constantly; nuanced people confuse and terrify me; I need absolute certainty to feel physically safe",
          id: "Terus-menerus; orang yang bernuansa membingungkan dan membuatku takut; aku butuh kepastian mutlak agar merasa aman secara fisik",
          de: "Ständig; vielschichtige Menschen ängstigen mich; ich brauche absolute Schwarz-Weiß-Sicherheit",
          fr: "Constamment; les gens complexes me terrifient; j'ai un besoin vital de certitudes absolues",
          es: "Constantemente; la gente con matices me inquieta; necesito certezas tajantes para sentirme a salvo",
        },
      },
    ],
  },
  {
    id: 11,
    subscale: "intolerance_ambivalence",
    prompt: {
      en: "When an argument begins, my goal shifts from finding mutual compromise to totally defeating the other person or proving they are 100% wrong.",
      id: "Saat perdebatan dimulai, tujuanku bergeser dari mencari kompromi bersama menjadi mengalahkan lawan bicara secara mutlak atau membuktikan mereka 100% salah.",
      de: "Bei Streit geht es mir nicht um Kompromisse, sondern darum, den anderen vollkommen niederzuringen.",
      fr: "Lors d'une dispute, mon but n'est pas le compromis mais d'écraser l'autre et prouver son tort absolu.",
      es: "En una discusión, mi meta deja de ser el consenso y pasa a ser aplastar al otro y demostrar su error al 100 %.",
    },
    options: [
      {
        score: 0,
        label: {
          en: "Never; disagreements are collaborative problem-solving opportunities",
          id: "Tidak pernah; perbedaan pendapat adalah kesempatan mencari solusi bersama secara kolaboratif",
          de: "Nie; Meinungsverschiedenheiten sind Chancen für gemeinsame Lösungen",
          fr: "Jamais; les désaccords sont des occasions de construire une entente",
          es: "Nunca; las discrepancias son oportunidades para buscar soluciones juntos",
        },
      },
      {
        score: 1,
        label: {
          en: "Rarely; I might get passionate, but I listen and respect their viewpoint",
          id: "Jarang; mungkin sempat emosional, namun tetap mendengar dan menghargai sudut pandang mereka",
          de: "Selten; ich werde manchmal hitzig, respektiere aber andere Sichtweisen",
          fr: "Rarement; je peux être vif, mais j'écoute et respecte l'avis d'autrui",
          es: "Rara vez; me acaloro a veces, pero escucho y respeto la otra parte",
        },
      },
      {
        score: 2,
        label: {
          en: "Often; conceding even a tiny point feels like total humiliation and surrender",
          id: "Sering; mengakui kesalahan kecil sekalipun terasa seperti penghinaan dan kekalahan memalukan",
          de: "Oft; selbst ein kleines Nachgeben fühlt sich wie peinliche Unterwerfung an",
          fr: "Souvent; concéder le moindre point ressemble à une capitulation humiliante",
          es: "A menudo; ceder un milímetro se siente como una humillación aplastante",
        },
      },
      {
        score: 3,
        label: {
          en: "Always; admitting nuance feels like psychological annihilation. I must win completely or I am destroyed.",
          id: "Selalu; mengakui kompromi terasa seperti pemusnahan diri psikologis. Aku harus menang mutlak atau aku hancur.",
          de: "Immer; Nuancen zuzulassen fühlt sich wie Vernichtung an. Entweder ich siege ganz, oder ich gehe unter.",
          fr: "Toujours; admettre la nuance équivaut à une mise à mort psychologique. C'est la victoire totale ou la ruine.",
          es: "Siempre; admitir matices se siente como la aniquilación de mi ego. O gano de forma aplastante o me destruyen.",
        },
      },
    ],
  },
  {
    id: 12,
    subscale: "intolerance_ambivalence",
    prompt: {
      en: "I look back at past ex-partners, former best friends, or old jobs with pure venom and contempt, unable to recall a single positive moment.",
      id: "Aku mengenang mantan pasangan, mantan sahabat, atau tempat kerja lama dengan kebencian dan kejijikan mutlak, tak mampu mengingat satu pun momen positif.",
      de: "Ich blicke auf Ex-Partner oder alte Freunde mit purer Verachtung zurück – unfähig, etwas Positives zu erinnern.",
      fr: "Je repense à mes ex ou anciens amis avec une rancœur féroce, incapable de me souvenir d'un seul bon moment.",
      es: "Miro a mis exparejas o antiguos amigos con un rencor venenoso, incapaz de recordar ni un solo instante hermoso.",
    },
    options: [
      {
        score: 0,
        label: {
          en: "Never; I hold gratitude for good chapters while accepting why they ended",
          id: "Tidak pernah; saya bersyukur atas babak yang indah sambil menerima alasan mengapa itu harus berakhir",
          de: "Nie; ich bin dankbar für schöne Zeiten, auch wenn es vorbei ist",
          fr: "Jamais; je garde de la gratitude pour les beaux souvenirs tout en acceptant la fin",
          es: "Nunca; guardo gratitud por lo vivido y acepto con madurez el final",
        },
      },
      {
        score: 1,
        label: {
          en: "Occasionally; mostly right after an acrimonious breakup before healing",
          id: "Sesekali; terutama sesaat setelah perpisahan yang menyakitkan sebelum sembuh",
          de: "Gelegentlich; vor allem kurz nach einer schmerzhaften Trennung",
          fr: "Parfois; juste après une rupture douloureuse, le temps de cicatriser",
          es: "A veces; solo recién terminada una ruptura dolorosa, hasta que sano",
        },
      },
      {
        score: 2,
        label: {
          en: "Frequently; once someone is 'out', they become completely blacklisted and vilified",
          id: "Sering; begitu seseorang terdepak dari hidupku, mereka langsung masuk daftar hitam dan dicap monster",
          de: "Häufig; wer einmal raus ist, wird in meiner Erinnerung komplett zum Monster",
          fr: "Souvent; dès qu'un lien est rompu, la personne devient un monstre sans nuance",
          es: "Frecuentemente; en cuanto alguien sale de mi vida, lo satanizo y lo borro",
        },
      },
      {
        score: 3,
        label: {
          en: "Always; my personal history is a graveyard of radioactive villains. I cannot integrate warmth with betrayal.",
          id: "Selalu; sejarah hidupku adalah kuburan para penjahat beracun. Aku tak sanggup menyatukan kehangatan dengan rasa kecewa.",
          de: "Immer; meine Vergangenheit ist ein Friedhof toxischer Schurken. Liebe und Enttäuschung schließen sich aus.",
          fr: "Toujours; mon passé n'est qu'un cimetière de monstres. Je ne peux réconcilier tendresse et déception.",
          es: "Siempre; mi pasado es un cementerio de villanos tóxicos. Me es imposible integrar cariño y desengaño.",
        },
      },
    ],
  },
];

export const SPLITTING_ARCHETYPES: Record<
  "dialectical_integration" | "mild_polarization" | "acute_splitting" | "severe_fragmentation",
  SplittingArchetypeProfile
> = {
  dialectical_integration: {
    level: "dialectical_integration",
    badge: {
      en: "Dialectical Integration / Object Constancy",
      id: "Integrasi Dialektis / Kelekatan Objek Utuh",
      de: "Dialektische Integration / Objektkonstanz",
      fr: "Intégration Dialectique / Constance d'Objet",
      es: "Integración Dialéctica / Constancia Objetal",
    },
    title: {
      en: "The Grounded Integrator",
      id: "Sang Pengintegrasi Berakar",
      de: "Der geerdete Integrator",
      fr: "L'Intégrateur Équilibré",
      es: "El Integrador Dialéctico",
    },
    tagline: {
      en: "You can hold both warmth and imperfection simultaneously without destroying relationships.",
      id: "Kamu mampu menggenggam kasih sayang dan ketidaksempurnaan sekaligus tanpa merusak hubungan.",
      de: "Sie können Liebe und Fehlerhaftigkeit gleichzeitig aushalten, ohne Bindungen zu zerstören.",
      fr: "Vous savez conjuguer affection et imperfection sans saborder vos relations.",
      es: "Puedes sostener afecto e imperfección a la vez sin dinamitar tus vínculos.",
    },
    description: {
      en: "Your nervous system possesses robust emotional object constancy. When a loved one frustrates you or makes a mistake, your brain does not erase their years of kindness. You understand that people can be fundamentally good while sometimes behaving selfishly or thoughtlessly. You walk the middle path.",
      id: "Sistem sarafmu memiliki kelekatan objek (object constancy) yang kokoh. Saat orang yang kamu cintai mengecewakanmu atau berbuat salah, otakmu tidak menghapus tahun-tahun kebaikan mereka. Kamu paham manusia bisa berhati baik meski kadang bersikap egois atau teledor. Kamu berjalan di jalan tengah.",
      de: "Ihr Nervensystem verfügt über stabile Objektkonstanz. Wenn Ihnen jemand wehtut, löscht Ihr Gehirn dessen Fürsorge nicht aus. Sie begreifen, dass Menschen gut sein können und dennoch Fehler machen. Sie wandeln auf dem Mittelweg.",
      fr: "Votre système nerveux jouit d'une solide constance d'objet. Quand un proche vous déçoit, votre esprit n'efface pas son affection passée. Vous comprenez que l'on peut être fondamentalement bon et parfois maladroit.",
      es: "Tu biología goza de una firme constancia objetal. Cuando alguien te falla, tu cerebro no anula su cariño previo. Comprendes que las personas pueden ser nobles y cometer errores a la vez.",
    },
    psychologyInsight: {
      en: "In Otto Kernberg's psychoanalytic theory and Marsha Linehan's Dialectical Behavior Therapy (DBT), your psyche has achieved integrated ego-synthesis, bridging the split between the 'all-good' and 'all-bad' maternal representations.",
      id: "Dalam teori psikoanalisis Otto Kernberg dan Dialectical Behavior Therapy (DBT) Marsha Linehan, psikismu telah mencapai sintesis ego terpadu, menjembatani keterbelahan antara representasi 'serba-baik' dan 'serba-buruk'.",
      de: "Nach Otto Kernberg und Marsha Linehan (DBT) besitzt Ihre Psyche eine reife Ich-Synthese. Sie überbrücken die primitive Spaltung in 'nur gut' und 'nur böse'.",
      fr: "Selon les modèles d'Otto Kernberg et la thérapie DBT de Marsha Linehan, votre psyché a réussi l'intégration du moi, réconciliant les pôles clivés du 'tout-bon' et du 'tout-mauvais'.",
      es: "En el marco de Otto Kernberg y la terapia DBT de Marsha Linehan, tu psique ha alcanzado la síntesis del yo, superando la escisión primitiva entre lo 'todo bueno' y lo 'todo malo'.",
    },
    actionProtocols: {
      en: [
        "Continue practicing the DBT 'Both/And' language framework ('They hurt me AND they care about me').",
        "Encourage friends caught in black-and-white outrage to explore the nuanced middle gray.",
        "Maintain compassion for people struggling with borderline or trauma-based polarization.",
      ],
      id: [
        "Lanjutkan penggunaan kerangka bahasa DBT 'Dan/Sekaligus' ('Dia mengecewakanku DAN dia tetap menyayangiku').",
        "Bantu teman yang terjebak dalam kemarahan hitam-putih untuk melihat nuansa abu-abu yang tenang.",
        "Pertahankan welas asih bagi mereka yang masih bergulat dengan trauma polarisasi.",
      ],
      de: [
        "Nutzen Sie weiterhin das DBT-Modell des 'Sowohl-als-auch' ('Ich bin verletzt UND wir schätzen uns').",
        "Helfen Sie Menschen im Schwarz-Weiß-Denken, die grauen Zwischentöne wahrzunehmen.",
        "Bewahren Sie Verständnis für traumatisierte Mitmenschen mit Spaltungsmechanismen.",
      ],
      fr: [
        "Cultivez la formule DBT du 'À la fois' ('Je suis blessé ET cette personne compte pour moi').",
        "Aidez vos proches enfermés dans la colère binaire à explorer les nuances grises.",
        "Gardez de la bienveillance envers ceux qui subissent le clivage traumatique.",
      ],
      es: [
        "Sigue aplicando la fórmula DBT del 'Y además' ('Me ha dolido Y sé que me quiere').",
        "Invita a quienes ven el mundo en blanco y negro a contemplar los matices de gris.",
        "Conserva la empatía hacia personas atrapadas en mecanismos de escisión defensiva.",
      ],
    },
    dailyAffirmation: {
      en: "Life and love exist in the gentle gray. Wholeness includes the light and the shadow.",
      id: "Kehidupan dan cinta bersemi di ruang abu-abu yang tenang. Keutuhan sejati merangkul terang dan bayang.",
      de: "Das Leben und die Liebe gedeihen im sanften Grau. Ganzheit umarmt Licht und Schatten.",
      fr: "La vie et l'amour s'épanouissent dans le gris bienveillant. La plénitude englobe ombre et lumière.",
      es: "La vida y el amor florecen en el gris sereno. La plenitud abraza la luz y la sombra.",
    },
  },

  mild_polarization: {
    level: "mild_polarization",
    badge: {
      en: "The Ambivalent Pendulum / Mild Cognitive Dichotomy",
      id: "Bandul Ambivalen / Polarisasi Kognitif Ringan",
      de: "Das ambivalente Pendel / Leichte Spaltung",
      fr: "Le Pendule Ambivalent / Polarisation Légère",
      es: "El Péndulo Ambivalente / Polarización Leve",
    },
    title: {
      en: "The Sensitive Pragmatist",
      id: "Sang Pragmatis Sensitif",
      de: "Der sensible Pragmatiker",
      fr: "Le Pragmatique Sensible",
      es: "El Pragmático Sensible",
    },
    tagline: {
      en: "You tilt toward all-or-nothing extremes when stressed, but can walk back to nuance when calm.",
      id: "Kamu condong ke ekstrem serba-segalanya saat stres, namun mampu kembali bernuansa saat tenang.",
      de: "Unter Stress kippen Sie in Schwarz-Weiß-Muster, finden in Ruhe aber zur Differenzierung zurück.",
      fr: "Sous stress, vous basculez dans le tout-ou-rien, mais retrouvez la nuance une fois apaisé.",
      es: "Bajo estrés caes en el todo o nada, pero recuperas la perspectiva en cuanto te calmas.",
    },
    description: {
      en: "When your nervous system is regulated, you appreciate nuance. However, when exhausted, abandoned, or criticized, a binary switch flips: you think in extremes ('Everything is ruined', 'They never cared'), and feel sudden disgust toward people who disappoint you. With a little time and space, your object constancy returns.",
      id: "Saat sistem sarafmu tenang, kamu menghargai nuansa. Namun saat lelah, merasa ditinggalkan, atau dikritik, sakelar biner langsung menyala: kamu berpikir serba ekstrem ('Semuanya hancur', 'Mereka tak pernah peduli'), dan merasa jijik sesaat. Setelah ada ruang dan jeda, pemahaman utuhmu akan kembali.",
      de: "In entspanntem Zustand denken Sie differenziert. Unter Druck aber schlägt ein Schalter um: Sie verfallen in Extreme ('Alles ist verdorben'), und fühlen plötzliche Kälte. Mit etwas Abstand kehrt Ihr Verständnis zurück.",
      fr: "Apaisé, vous appréciez les nuances. Mais sous tension ou face à la critique, un interrupteur bascule: vous voyez tout en noir et ressentez un dégoût soudain. Le recul vous permet ensuite de réparer le lien.",
      es: "En calma eres sensato y comprensivo. Pero ante el cansancio o la crítica, un resorte salta y piensas en extremos ('Todo está perdido'). Con algo de tiempo y distancia, recuperas la templanza.",
    },
    psychologyInsight: {
      en: "This represents 'regressive splitting under stress'. When cognitive bandwidth is taxed, the prefrontal cortex offloads complex integration to primitive limbic threat-classification circuits.",
      id: "Ini mencerminkan 'splitting regresif akibat stres'. Saat kapasitas kognitif terkuras, korteks prefrontal mengalihkan integrasi kompleks ke sirkuit pertahanan limbik primitif yang biner.",
      de: "Dies ist 'regressive Spaltung unter Stress'. Bei Erschöpfung schaltet das Gehirn von komplexer Reflexion auf primitive Entweder-Oder-Abwehrmechanismen um.",
      fr: "C'est un 'clivage régressif sous stress'. Quand l'énergie mentale s'effondre, le cerveau préfrontal délègue la gestion aux réflexes binaires du système limbique.",
      es: "Refleja una 'escisión regresiva por sobrecarga'. Cuando el estrés satura la mente, el córtex prefrontal cede el mando a circuitos límbicos primitivos de blanco o negro.",
    },
    actionProtocols: {
      en: [
        "Ban Absolutist Vocabulary: When you catch yourself saying 'always' or 'never', substitute 'in this specific situation'.",
        "The 12-Hour Cooldown Rule: Never end a friendship or send a break-up text before sleeping on it.",
        "List 3 Positive Facts: When someone triggers your disgust, force yourself to write down 3 real acts of care they performed in the past.",
      ],
      id: [
        "Haramkan Kosakata Mutlak: Saat mendapati dirimu mengucap 'selalu' atau 'tidak pernah', ganti menjadi 'dalam situasi khusus ini'.",
        "Aturan Jeda 12 Jam: Jangan pernah memutuskan hubungan atau mengirim chat perpisahan sebelum membawanya tidur semalam.",
        "Tulis 3 Fakta Kebaikan: Saat seseorang memicu rasa kesalmu, paksa dirimu menulis 3 tindakan baik nyata yang pernah mereka lakukan.",
      ],
      de: [
        "Verbot von Absolutheitswörtern: Ersetzen Sie 'immer' und 'nie' durch 'in diesem konkreten Fall'.",
        "Die 12-Stunden-Abkühlphase: Beenden Sie niemals Beziehungen, bevor Sie eine Nacht darüber geschlafen haben.",
        "Drei Gegenbeweise notieren: Schreiben Sie bei aufkeimender Verachtung 3 gute Taten der Person auf.",
      ],
      fr: [
        "Bannissez les mots absolus: Remplacez 'toujours' ou 'jamais' par 'dans cette situation précise'.",
        "La nuit de réflexion: Ne rompez aucun lien important avant d'avoir dormi dessus.",
        "Listez 3 preuves d'affection: En cas de rejet brutal, forcez-vous à noter 3 gestes nobles que cette personne a eus envers vous.",
      ],
      es: [
        "Destierra los términos absolutos: Cambia 'siempre' y 'nunca' por 'en este caso concreto'.",
        "La regla de las 12 horas: No rompas un vínculo significativo sin haber consultado con la almohada.",
        "Apunta 3 hechos nobles: Si alguien te descoloca, oblígate a escribir 3 favores reales que hizo por ti en el pasado.",
      ],
    },
    dailyAffirmation: {
      en: "Frustration does not mean danger. A flawed moment does not erase a loving bond.",
      id: "Kekecewaan bukan berarti bahaya maut. Momen yang keliru tidak menghapus ikatan kasih yang nyata.",
      de: "Frust bedeutet keine Gefahr. Ein unvollkommener Moment löscht keine tiefe Bindung aus.",
      fr: "La déception n'est pas un danger mortel. Une maladresse n'efface pas un lien sincère.",
      es: "La frustración no es una amenaza. Un tropiezo pasajero no borra un cariño sincero.",
    },
  },

  acute_splitting: {
    level: "acute_splitting",
    badge: {
      en: "Acute Splitting / Idealization-Devaluation Armor",
      id: "Splitting Akut / Perisai Idealisasi-Devaluasi",
      de: "Akute Spaltung / Borderline-Abwehrpanzer",
      fr: "Clivage Aigu / Armure Idéalisation-Dévaluation",
      es: "Escisión Aguda / Blindaje de Idealización y Desprecio",
    },
    title: {
      en: "The Binary Sentry",
      id: "Sang Penjaga Biner",
      de: "Der binäre Wächter",
      fr: "La Sentinelle Binaire",
      es: "El Centinela Binario",
    },
    tagline: {
      en: "People are either saviors or monsters; you burn bridges instantly to escape the terror of betrayal.",
      id: "Orang adalah penyelamat atau monster; kamu langsung membakar jembatan demi lolos dari teror pengkhianatan.",
      de: "Menschen sind Retter oder Monster; Sie brechen Kontakte abrupt ab, um Verrat zuvorzukommen.",
      fr: "Les gens sont des sauveurs ou des monstres; vous détruisez les ponts pour échapper à la trahison.",
      es: "La gente es santa o perversa; quemas puentes al instante para escapar del terror a la traición.",
    },
    description: {
      en: "You live with acute psychological splitting, the primary defense mechanism documented in borderline personality organization and complex relational trauma. When connection feels intimate, you idolize your partner as perfect. But the moment they reveal human weakness or set a boundary, your system flips into icy detachment, rage, and complete devaluation.",
      id: "Kamu hidup dengan mekanisme splitting psikologis akut, pertahanan utama dalam trauma relasional kompleks dan organisasi kepribadian ambang. Saat hubungan terasa dekat, kamu memuja pasanganmu sebagai sosok sempurna. Namun begitu mereka menunjukkan kelemahan manusiawi atau memasang batasan, tubuhmu bergeser menjadi dingin, marah, dan mencampakkannya total.",
      de: "Sie nutzen akute seelische Spaltung als Schutzschild gegen Verletzungen. Zu Beginn vergöttern Sie Menschen als Seelenverwandte. Zeigt die Person Schwächen, kippt das System in eiskalte Ablehnung und Verachtung um.",
      fr: "Vous utilisez le clivage aigu comme bouclier contre la douleur affective. Vous commencez par idolâtrer l'autre comme une âme sœur. Dès qu'une faille apparaît, vous basculez dans le rejet glacial et le mépris.",
      es: "Vives bajo la escisión psicológica aguda, el escudo protector del trauma relacional. Al principio idealizas a las personas como almas gemelas. En cuanto muestran una debilidad, tu sistema se congela en repudio e ira.",
    },
    psychologyInsight: {
      en: "Dr. Otto Kernberg showed that splitting prevents the terrifying anxiety that would occur if the 'good object' were contaminated by the 'bad object'. It is an unconscious survival strategy: 'If I destroy you in my mind first, your rejection cannot shatter me.'",
      id: "Dr. Otto Kernberg menunjukkan bahwa splitting mencegah kecemasan dahsyat yang timbul jika 'objek baik' terkontaminasi oleh 'objek buruk'. Ini adalah strategi bertahan hidup bawah sadar: 'Jika kuhancurkan kamu di pikiranku duluan, penolakanmu takkan bisa meremukkanku.'",
      de: "Nach Dr. Otto Kernberg schützt Spaltung vor der existentiellen Angst, dass das geliebte Objekt das eigene Ich vernichten könnte. Ein unbewusster Schutzreflex gegen frühkindliche Bindungstraumata.",
      fr: "Le Dr Otto Kernberg a démontré que le clivage protège de l'angoisse terrifiante de voir l'être aimé devenir un agresseur. C'est une stratégie de survie: 'Si je te détruis dans mon esprit d'abord, ton rejet ne peut m'anéantir.'",
      es: "El Dr. Otto Kernberg explicó que la escisión impide la angustia devastadora de integrar amor y daño. Es una estrategia de defensa: 'Si te destruyo en mi mente primero, tu rechazo no me destrozará.'",
    },
    actionProtocols: {
      en: [
        "DBT Radical Acceptance of Paradox: Write down daily: 'Two opposing truths can co-exist at the same time.'",
        "The Gray Ledger: Whenever you feel rage toward a partner, find one neutral, boring explanation for their behavior (e.g. fatigue, stomach ache, traffic).",
        "Somatic Ice Dive: When the urge to explode or block someone strikes, place an ice pack on your eyes and cheeks for 30 seconds to trigger the parasympathetic brake.",
      ],
      id: [
        "Penerimaan Radikal Paradoks (DBT): Tulis setiap hari: 'Dua kebenaran yang bertentangan bisa hadir bersamaan di satu waktu.'",
        "Buku Catatan Abu-Abu: Saat merasa benci pada pasangan, cari satu penjelasan netral yang membosankan atas sikapnya (misal: kelelahan, sakit perut, macet).",
        "Kompres Es Somatis: Saat dorongan memblokir atau melabrak orang lain memuncak, tempelkan es batu di mata dan pipi selama 30 detik untuk mengerem amigdala.",
      ],
      de: [
        "DBT Radikale Akzeptanz von Paradoxa: Verinnerlichen Sie täglich: 'Zwei gegensätzliche Wahrheiten können nebeneinander existieren.'",
        "Das Graue Register: Suchen Sie bei aufkommendem Hass nach einer banalen Erklärung (Übermüdung, Migräne, Stau).",
        "Eiswasser-Schock: Legen Sie bei dem Impuls, jemanden zu blockieren, einen Eisbeutel auf die Augen, um den Vagusnerv zu bremsen.",
      ],
      fr: [
        "Acceptation radicale des paradoxes (DBT): Répétez-vous: 'Deux vérités contradictoires peuvent cohabiter simultanément.'",
        "Le registre gris: En cas de haine soudaine, cherchez une cause banale et neutre (migraine, fatigue, bouchons sur la route).",
        "Choc thermique facial: Appliquez une poche de glace sur vos joues pendant 30 secondes pour stopper la pulsion de blocage.",
      ],
      es: [
        "Aceptación radical de paradojas (DBT): Recuerda a diario: 'Dos verdades opuestas pueden coexistir al mismo tiempo.'",
        "El registro de grises: Si te invade el rencor, busca una explicación mundana y neutra (fatiga, dolor de cabeza, atasco).",
        "Compresa de hielo somática: Si sientes el impulso ciego de bloquear a alguien, ponte hielo en las mejillas 30 segundos para frenar el arrebato.",
      ],
    },
    dailyAffirmation: {
      en: "I do not have to burn the world to be safe. I can let people be human without casting them out.",
      id: "Aku tak perlu membakar habis duniaku demi merasa aman. Aku bisa membiarkan orang menjadi manusiawi tanpa harus mencampakkannya.",
      de: "Ich muss nicht alle Brücken niederbrennen, um sicher zu sein. Ich darf anderen erlauben, unvollkommen zu sein.",
      fr: "Je n'ai pas besoin de tout détruire pour être en sécurité. Je peux autoriser les autres à être imparfaits sans les chasser.",
      es: "No necesito quemar puentes para estar a salvo. Puedo permitir que los demás sean humanos sin tener que desterrarlos.",
    },
  },

  severe_fragmentation: {
    level: "severe_fragmentation",
    badge: {
      en: "Severe Polarization / Structural Relational Shatter",
      id: "Polarisasi Parah / Keruntuhan Relasional Struktural",
      de: "Schwere Spaltung / Struktureller Beziehungsbruch",
      fr: "Clivage Sévère / Rupture Structurelle des Liens",
      es: "Escisión Severa / Ruptura Estructural de Vínculos",
    },
    title: {
      en: "The Shattered Mirror",
      id: "Sang Cermin Retak",
      de: "Der zersplitterte Spiegel",
      fr: "Le Miroir Brisé",
      es: "El Espejo Fragmentado",
    },
    tagline: {
      en: "Trapped in an unyielding battle between toxic idolization and scorched-earth destruction, leaving an isolated void.",
      id: "Terjebak dalam pusaran antara pemujaan beracun dan pemusnahan bumi hangus, menyisakan kehampaan sunyi.",
      de: "Gefangen zwischen toxischer Vergötterung und verbrannter Erde – isoliert in tiefster Einsamkeit.",
      fr: "Prisonnier d'une lutte acharnée entre idolâtrie aveugle et terre brûlée, condamné au vide et à l'isolement.",
      es: "Atrapado entre la adoración ciega y la tierra quemada, dejando a tu paso un vacío desolador.",
    },
    description: {
      en: "You are experiencing profound, chronic splitting that destabilizes every facet of your life. Your sense of self, career trajectory, and interpersonal relationships undergo catastrophic resets. People are elevated to godhood and then cast into the abyss within days. Behind the rage and cutoffs lies an agonizing terror of abandonment.",
      id: "Kamu mengalami splitting kronis yang mendalam dan mengguncang setiap sendi kehidupanmu. Rasa jati dirimu, perjalanan karir, dan hubungan personal mengalami reset katastrofik secara rutin. Orang-orang dipuja setinggi langit lalu dihempaskan ke jurang dalam hitungan hari. Di balik amarah dan pemutusan dingin itu, tersimpan teror penelantaran yang teramat menyayat hati.",
      de: "Sie leiden unter schwerer, chronischer Spaltung, die Ihre Identität und Beziehungen zerrüttet. Menschen werden erst glorifiziert und kurz darauf vernichtet. Hinter der harten Kälte verbirgt sich panische Angst vor dem Verlassenwerden.",
      fr: "Vous vivez un clivage sévère et permanent qui désagrège vos liens et votre identité. Les êtres chers sont portés aux nues puis traînés dans la boue. Derrière cette violence défensive gît une terreur d'abandon viscérale.",
      es: "Sufres una escisión crónica profunda que dinamita tus relaciones y tu autoimagen. Ensalzas a las personas como deidades y las arrojas al infierno a los pocos días. Tras esa frialdad late un pánico voraz al abandono.",
    },
    psychologyInsight: {
      en: "This reflects severe early relational trauma, attachment disruption, or Borderline Personality Organization (BPO). Healing requires long-term specialized psychotherapy (such as DBT or Transference-Focused Psychotherapy / TFP) to safely build internal object constancy.",
      id: "Kondisi ini mencerminkan trauma relasional masa kecil yang berat, disrupsi kelekatan, atau Organisasi Kepribadian Ambang (BPO). Pemulihan membutuhkan psikoterapi khusus jangka panjang (seperti DBT atau Transference-Focused Psychotherapy / TFP) untuk membangun kelekatan objek batin secara aman.",
      de: "Hier liegen schwere Bindungsverletzungen oder eine Borderline-Struktur vor. Heilung erfordert spezialisierte Psychotherapie (wie DBT oder TFP nach Kernberg), um innere Objektkonstanz aufzubauen.",
      fr: "Ce tableau révèle un traumatisme d'attachement précoce profond. La guérison passe par une thérapie spécialisée (DBT ou psychothérapie focalisée sur le transfert) pour consolider la constance d'objet.",
      es: "Indica un trauma de apego temprano severo o una organización límite de la personalidad. La sanación exige psicoterapia especializada (como DBT o TFP de Kernberg) para edificar la constancia objetal.",
    },
    actionProtocols: {
      en: [
        "Engage DBT / TFP Therapy: Work with a licensed clinical psychologist trained in Dialectical Behavior Therapy or Transference-Focused Psychotherapy.",
        "The 72-Hour Blacklist Moratorium: Place a physical 72-hour delay on blocking, confronting, or burning bridges with anyone in your life.",
        "Grounding in the Sensory Body: When the split occurs, focus strictly on physical sensations (temperature of your palms, texture of the floor) to interrupt limbic flooding.",
      ],
      id: [
        "Ikuti Terapi DBT / TFP: Bekerjasamalah dengan psikolog klinis berlisensi yang mendalami Dialectical Behavior Therapy atau Transference-Focused Psychotherapy.",
        "Moratorium Blokir 72 Jam: Terapkan jeda 72 jam sebelum memblokir, melabrak, atau memutuskan hubungan dengan siapapun dalam hidupmu.",
        "Berakar pada Sensasi Fisik: Saat dorongan splitting menyerang, fokuslah murni pada sensasi tubuh nyata (suhu telapak tangan, tekstur lantai) untuk memotong banjir emosi limbik.",
      ],
      de: [
        "Spezialisierte Therapie (DBT/TFP): Suchen Sie Unterstützung bei einem Therapeuten für dialektisch-behaviorale Therapie oder übertragungsfokussierte Psychotherapie.",
        "72-Stunden-Sperre: Warten Sie 3 Tage, bevor Sie jemanden blockieren, feuern oder eine Beziehung beenden.",
        "Somatische Erdung: Konzentrieren Sie sich bei Spaltungszuständen rein auf körperliche Reize (Kälte, Bodenkontakt), um die Gehirnüberflutung zu stoppen.",
      ],
      fr: [
        "Thérapie spécialisée DBT/TFP: Consultez un psychologue formé à la thérapie comportementale dialectique ou à la thérapie basée sur le transfert.",
        "Moratoire de 72 heures: Imposez-vous un délai de 3 jours avant tout blocage, rupture ou confrontation définitive.",
        "Ancrage corporel pur: Lors du clivage, concentrez-vous uniquement sur les sensations physiques pour court-circuiter l'orage limbique.",
      ],
      es: [
        "Terapia especializada DBT/TFP: Acude a un psicólogo clínico formado en Terapia Dialéctico-Conductual o Psicoterapia Focalizada en la Transferencia.",
        "Moratoria de 72 horas: Espera 3 días completos antes de bloquear, increpar o cortar lazos con cualquier persona.",
        "Anclaje en las sensaciones físicas: Durante la crisis de escisión, céntrate en el cuerpo (temperatura de las manos, suelo bajo los pies) para calmar la amígdala.",
      ],
    },
    dailyAffirmation: {
      en: "I am safe even when connections are imperfect. I do not have to destroy to survive.",
      id: "Aku aman meski sebuah hubungan memiliki cela. Aku tak perlu menghancurkan segalanya demi bertahan hidup.",
      de: "Ich bin sicher, auch wenn Bindungen unvollkommen sind. Ich muss nicht zerstören, um zu überleben.",
      fr: "Je suis en sécurité même si mes liens sont imparfaits. Je n'ai pas besoin de détruire pour survivre.",
      es: "Estoy a salvo aunque los lazos sean imperfectos. No tengo que destruirlo todo para sobrevivir.",
    },
  },
};

export function calculateSplittingScore(
  answers: Record<number, number>
): SplittingScoreResult {
  let idealizationScore = 0;
  let allOrNothingScore = 0;
  let ambivalenceScore = 0;

  SPLITTING_QUESTIONS.forEach((q) => {
    const score = answers[q.id] ?? 0;
    if (q.subscale === "idealization_devaluation") idealizationScore += score;
    if (q.subscale === "all_or_nothing") allOrNothingScore += score;
    if (q.subscale === "intolerance_ambivalence") ambivalenceScore += score;
  });

  const totalScore = idealizationScore + allOrNothingScore + ambivalenceScore;
  const maxScore = 36;
  const percentage = Math.min(100, Math.round((totalScore / maxScore) * 100));

  let level: "dialectical_integration" | "mild_polarization" | "acute_splitting" | "severe_fragmentation";

  if (percentage <= 25) {
    level = "dialectical_integration";
  } else if (percentage <= 52) {
    level = "mild_polarization";
  } else if (percentage <= 78) {
    level = "acute_splitting";
  } else {
    level = "severe_fragmentation";
  }

  const profile = SPLITTING_ARCHETYPES[level];

  return {
    totalScore,
    maxScore,
    percentage,
    level,
    subscales: {
      idealization_devaluation: {
        score: idealizationScore,
        max: 12,
        percentage: Math.min(100, Math.round((idealizationScore / 12) * 100)),
      },
      all_or_nothing: {
        score: allOrNothingScore,
        max: 12,
        percentage: Math.min(100, Math.round((allOrNothingScore / 12) * 100)),
      },
      intolerance_ambivalence: {
        score: ambivalenceScore,
        max: 12,
        percentage: Math.min(100, Math.round((ambivalenceScore / 12) * 100)),
      },
    },
    profile,
  };
}
