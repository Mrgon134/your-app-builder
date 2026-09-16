export type LimerenceLang = "en" | "id" | "de" | "fr" | "es";

export interface LimerenceQuestion {
  id: number;
  subscale: "involuntary_rumination" | "dopamine_volatility" | "crystallized_idealization";
  prompt: Record<LimerenceLang, string>;
  options: Array<{
    score: number;
    label: Record<LimerenceLang, string>;
  }>;
}

export interface LimerenceProfile {
  level: "acute_limerence" | "anxious_fixation" | "hopeful_crush" | "secure_connection";
  badge: Record<LimerenceLang, string>;
  title: Record<LimerenceLang, string>;
  tagline: Record<LimerenceLang, string>;
  description: Record<LimerenceLang, string>;
  neurobiologyInsight: Record<LimerenceLang, string>;
  detachmentProtocols: Record<LimerenceLang, string[]>;
  dailyAffirmation: Record<LimerenceLang, string>;
}

export interface LimerenceScoreResult {
  totalScore: number;
  maxScore: number;
  percentage: number;
  level: "acute_limerence" | "anxious_fixation" | "hopeful_crush" | "secure_connection";
  profile: LimerenceProfile;
  subscales: {
    involuntary_rumination: { score: number; max: number; percentage: number };
    dopamine_volatility: { score: number; max: number; percentage: number };
    crystallized_idealization: { score: number; max: number; percentage: number };
  };
}

export const LIMERENCE_QUESTIONS: LimerenceQuestion[] = [
  // Subscale 1: Involuntary Rumination
  {
    id: 1,
    subscale: "involuntary_rumination",
    prompt: {
      en: "How frequently do thoughts of this person intrude into your mind during work, study, or daily tasks?",
      id: "Seberapa sering pikiran tentang orang ini menyusup ke pikiranmu saat sedang bekerja, belajar, atau beraktivitas?",
      de: "Wie häufig drängen sich Gedanken an diese Person während der Arbeit, des Studiums oder des Alltags auf?",
      fr: "À quelle fréquence les pensées envers cette personne s'imposent-elles à vous pendant votre travail ou quotidien ?",
      es: "¿Con qué frecuencia se imponen los pensamientos sobre esta persona durante tu trabajo, estudio o rutina?",
    },
    options: [
      { score: 0, label: { en: "Rarely (under 15 mins/day)", id: "Jarang (< 15 menit/hari)", de: "Selten (< 15 Min./Tag)", fr: "Rarement (< 15 min/jour)", es: "Raramente (< 15 min/día)" } },
      { score: 1, label: { en: "Occasionally (1-2 hours/day)", id: "Sesekali (1-2 jam/hari)", de: "Gelegentlich (1-2 Std./Tag)", fr: "Occasionnellement (1-2h/jour)", es: "Ocasionalmente (1-2 h/día)" } },
      { score: 2, label: { en: "Frequently (3-5 hours/day)", id: "Sering (3-5 jam/hari)", de: "Häufig (3-5 Std./Tag)", fr: "Fréquemment (3-5h/jour)", es: "Frecuentemente (3-5 h/día)" } },
      { score: 3, label: { en: "Almost constantly (85%+ waking hours)", id: "Hampir terus-menerus (> 85% waktu bangun)", de: "Fast ständig (> 85 % der Wachzeit)", fr: "Presque constamment (> 85% du temps)", es: "Casi constantemente (> 85% despierto)" } },
    ],
  },
  {
    id: 2,
    subscale: "involuntary_rumination",
    prompt: {
      en: "Do you catch yourself mentally replaying past conversations, texts, or eye contact looking for hidden hidden clues?",
      id: "Apakah kamu sering memutar ulang percakapan, chat, atau tatapan mata masa lalu untuk mencari petunjuk tersembunyi?",
      de: "Erwappst du dich dabei, wie du vergangene Gespräche, Chats oder Blicke immer wieder analysierst?",
      fr: "Rejouez-vous sans cesse d'anciennes conversations ou regards dans votre tête pour chercher des indices cachés ?",
      es: "¿Te descubres repasando mentalmente conversaciones o miradas buscando señales o pistas ocultas?",
    },
    options: [
      { score: 0, label: { en: "Never, I take interactions at face value", id: "Tidak pernah, santai saja", de: "Nie, ich nehme Dinge wie sie sind", fr: "Jamais, je reste simple", es: "Nunca, tomo todo tal cual es" } },
      { score: 1, label: { en: "Mildly, when an interaction felt unusual", id: "Sedikit, jika obrolan terasa agak aneh", de: "Leicht, wenn etwas ungewohnt war", fr: "Un peu, si l'échange était étrange", es: "Levemente, si fue algo inusual" } },
      { score: 2, label: { en: "Often, analyzing word choice and emoji timing", id: "Sering, menganalisis diksi & waktu kirim", de: "Oft, analysiere Wortwahl und Emojis", fr: "Souvent, j'analyse les mots et délais", es: "A menudo, analizo palabras y horas" } },
      { score: 3, label: { en: "Compulsively, constructing elaborate theories for hours", id: "Kompulsif berjam-jam membuat teori", de: "Zwanghaft, stundenlange Theorien", fr: "Compulsivement, théories pendant des heures", es: "Compulsivamente, teorizando por horas" } },
    ],
  },
  {
    id: 3,
    subscale: "involuntary_rumination",
    prompt: {
      en: "Do you construct elaborate mental daydreams where you heroically rescue, impress, or deeply connect with them?",
      id: "Apakah kamu sering merangkai lamunan dramatis di mana kamu menyelamatkan, memukau, atau terhubung erat dengannya?",
      de: "Erschaffst du detailreiche Tagträume, in denen du sie rettest, beeindruckst oder tief verbunden bist?",
      fr: "Construisez-vous des scénarios imaginaires intenses où vous l'impressionnez ou le sauvez héroïquement ?",
      es: "¿Creas intensas fantasías mentales donde la rescatas, impresionas o conectas profundamente?",
    },
    options: [
      { score: 0, label: { en: "No, my thoughts stay anchored in reality", id: "Tidak, pikiran saya tetap realistis", de: "Nein, Gedanken bleiben realitätsnah", fr: "Non, je reste ancré dans la réalité", es: "No, mis pensamientos son realistas" } },
      { score: 1, label: { en: "Briefly before falling asleep", id: "Sekadar lamunan sebelum tidur", de: "Kurz vor dem Einschlafen", fr: "Brièvement avant de m'endormir", es: "Brevemente antes de dormir" } },
      { score: 2, label: { en: "Frequently throughout the day to escape stress", id: "Sering sepanjang hari saat stres", de: "Häufig tagsüber als Flucht vor Stress", fr: "Régulièrement dans la journée", es: "Con frecuencia para evadir el estrés" } },
      { score: 3, label: { en: "Addictively, spending hours inside imaginary scenarios", id: "Adiktif berjam-jam tenggelam di dunia khayalan", de: "Suchtartig, lebe stundenlang in Fantasien", fr: "De façon addictive, plusieurs heures par jour", es: "Adictivamente, horas enteras en fantasías" } },
    ],
  },
  {
    id: 4,
    subscale: "involuntary_rumination",
    prompt: {
      en: "How intensely do you check their social media, online status, or physical whereabouts?",
      id: "Seberapa intens kamu mengecek media sosial, status online, atau keberadaan fisik mereka?",
      de: "Wie intensiv überprüfst du ihren Social-Media-Status, 'Zuletzt online' oder Aufenthaltsort?",
      fr: "À quelle fréquence vérifiez-vous ses réseaux sociaux, son statut 'en ligne' ou ses activités ?",
      es: "¿Con qué frecuencia monitoreas sus redes sociales, última conexión o actividad?",
    },
    options: [
      { score: 0, label: { en: "Normal casual browsing or not at all", id: "Wajar atau tidak sama sekali", de: "Ganz normal oder gar nicht", fr: "Normal ou pas du tout", es: "Normal o nada en absoluto" } },
      { score: 1, label: { en: "Once or twice a day", id: "1-2 kali sehari", de: "1-2 Mal am Tag", fr: "1 à 2 fois par jour", es: "Una o dos veces al día" } },
      { score: 2, label: { en: "Multiple times an hour when feeling anxious", id: "Berkali-kali setiap jam saat gelisah", de: "Mehrmals pro Stunde bei Unruhe", fr: "Plusieurs fois par heure si anxieux", es: "Varias veces por hora si estoy ansioso" } },
      { score: 3, label: { en: "Obsessively, tracking followers, likes, and micro-movements", id: "Obsesif memantau following, likes, & histori", de: "Zwanghaft: Follower, Likes, jede Regung", fr: "Obsessionnellement: likes, abonnements, etc.", es: "Obsesivamente: seguidores, likes y detalles" } },
    ],
  },

  // Subscale 2: Dopamine Volatility & Rejection Pain
  {
    id: 5,
    subscale: "dopamine_volatility",
    prompt: {
      en: "How does a positive interaction (warm text, smile, compliment) from them affect your overall mood?",
      id: "Bagaimana interaksi positif (chat hangat, senyum, pujian) darinya memengaruhi seluruh harimu?",
      de: "Wie beeinflusst eine positive Reaktion (warme Nachricht, Lächeln) deinen ganzen Tag?",
      fr: "Quel effet a une réaction positive de sa part (message chaleureux, sourire) sur votre humeur ?",
      es: "¿Cómo afecta una interacción positiva suya (mensaje cálido, sonrisa) a tu estado de ánimo general?",
    },
    options: [
      { score: 0, label: { en: "Pleasant, but my baseline mood remains steady", id: "Menyenangkan, tapi mood saya tetap stabil", de: "Schön, aber Grundstimmung bleibt stabil", fr: "Agréable, mais mon humeur reste stable", es: "Agradable, pero mi ánimo base es estable" } },
      { score: 1, label: { en: "Gives me a noticeable energy boost for a few hours", id: "Memberi dorongan semangat beberapa jam", de: "Gibt spürbaren Energieschub für Stunden", fr: "Me donne de l'énergie pour quelques heures", es: "Me alegra durante varias horas" } },
      { score: 2, label: { en: "Intense euphoria, walking on clouds all day", id: "Euforia luar biasa seperti melayang seharian", de: "Intensive Euphorie, laufe auf Wolken", fr: "Euphorie intense, je plane toute la journée", es: "Euforia intensa, flotando todo el día" } },
      { score: 3, label: { en: "Extreme chemical high; my entire self-worth hinges on it", id: "Lonjakan dopamin ekstrem; harga diriku bergantung penuh padanya", de: "Extremer Drogen-Kick, ganzer Selbstwert hängt daran", fr: "Décharge de dopamine totale, toute ma valeur en dépend", es: "Subidón químico extremo, toda mi valía depende de ello" } },
    ],
  },
  {
    id: 6,
    subscale: "dopamine_volatility",
    prompt: {
      en: "How do you react to a perceived slight, late reply, or cool demeanor from them?",
      id: "Bagaimana reaksimu jika pesanmu dibalas lambat, singkat, atau sikapnya terasa dingin?",
      de: "Wie reagierst du auf eine späte Antwort, kühle Worte oder scheinbares Desinteresse?",
      fr: "Comment réagissez-vous s'il met du temps à répondre ou semble distant ?",
      es: "¿Cómo reaccionas ante una respuesta tardía, fría o aparente desinterés?",
    },
    options: [
      { score: 0, label: { en: "Assume they are busy; my day continues normally", id: "Maklum mungkin sibuk; hariku tetap normal", de: "Gehe von Beschäftigung aus; Tag geht weiter", fr: "Je me dis qu'il est occupé, rien de grave", es: "Asumo que está ocupado; sigo normal" } },
      { score: 1, label: { en: "A slight pang of disappointment, but easily shaken off", id: "Sedikit kecewa tapi cepat teratasi", de: "Leichte Enttäuschung, aber schnell vergessen", fr: "Légère déception mais vite oubliée", es: "Leve decepción, pero lo supero fácil" } },
      { score: 2, label: { en: "Stomach drops, severe anxiety, and distracted functioning", id: "Perut mual, kecemasan hebat, sulit fokus", de: "Magen zieht sich zusammen, spürbare Angst", fr: "Boule au ventre, vive anxiété et déconcentration", es: "Nudo en el estómago, ansiedad y desconcentración" } },
      { score: 3, label: { en: "Catastrophic despair, feeling like my world has shattered", id: "Keputusasaan katastrofik, serasa duniaku runtuh", de: "Totale Verzweiflung, als bräche die Welt ein", fr: "Désespoir absolu, sensation que mon monde s'écroule", es: "Desesperación total, sensación de que el mundo se derrumba" } },
    ],
  },
  {
    id: 7,
    subscale: "dopamine_volatility",
    prompt: {
      en: "Do you experience physical symptoms (chest tightness, nausea, insomnia, appetite loss) tied to this person?",
      id: "Apakah kamu mengalami gejala fisik (dada sesak, mual, insomnia, hilang nafsu makan) karena orang ini?",
      de: "Erlebst du körperliche Symptome (Brustenge, Übelkeit, Schlaflosigkeit, Appetitlosigkeit)?",
      fr: "Ressentez-vous des symptômes physiques (poitrine serrée, nausée, insomnie, perte d'appétit) liés à lui/elle ?",
      es: "¿Experimentas síntomas físicos (opresión en el pecho, insomnio, náuseas, pérdida de apetito) por esta persona?",
    },
    options: [
      { score: 0, label: { en: "Never, my body feels completely calm", id: "Tidak pernah, tubuh saya tenang", de: "Nie, mein Körper ist entspannt", fr: "Jamais, mon corps reste détendu", es: "Nunca, mi cuerpo se siente relajado" } },
      { score: 1, label: { en: "Mild butterflies before meeting them", id: "Sedikit deg-degan sebelum bertemu", de: "Leichte Schmetterlinge vor Treffen", fr: "Légers papillons dans le ventre avant de se voir", es: "Leves mariposas antes de vernos" } },
      { score: 2, label: { en: "Noticeable loss of sleep or appetite on turbulent days", id: "Susah tidur/makan saat hubungan tegang", de: "Schlafmangel oder Appetitverlust an turbulenten Tagen", fr: "Troubles du sommeil ou d'appétit fréquents", es: "Insomnio o falta de apetito en días tensos" } },
      { score: 3, label: { en: "Severe somatic distress, rapid heartbeat, tremors, or sickness", id: "Distres somatik berat, jantung berdebar, tremor, lesu", de: "Schwere körperliche Unruhe, Zittern, Herzrasen", fr: "Détresse physique aiguë: palpitations, tremblements", es: "Gran malestar físico: taquicardias, temblores o náuseas" } },
    ],
  },
  {
    id: 8,
    subscale: "dopamine_volatility",
    prompt: {
      en: "Have your career, hobbies, friendships, or personal health deteriorated because all energy is consumed by them?",
      id: "Apakah karier, hobi, pertemanan, atau kesehatanmu terbengkalai karena energimu tersedot olehnya?",
      de: "Leiden Beruf, Hobbys, Freunde oder Gesundheit, weil all deine Energie dort hineinfließt?",
      fr: "Vos études, amis, passions ou santé ont-ils été négligés par manque d'énergie ?",
      es: "¿Has descuidado tu trabajo, aficiones, amistades o salud porque toda tu energía se va en esta persona?",
    },
    options: [
      { score: 0, label: { en: "Not at all, my life is well-balanced", id: "Sama sekali tidak, hidup saya seimbang", de: "Gar nicht, mein Leben ist ausgeglichen", fr: "Pas du tout, ma vie est équilibrée", es: "Para nada, mi vida sigue equilibrada" } },
      { score: 1, label: { en: "Slightly distracted occasionally", id: "Sesekali sedikit kurang fokus", de: "Gelegentlich etwas abgelenkt", fr: "Légèrement distrait parfois", es: "Ligeramente distraído a veces" } },
      { score: 2, label: { en: "Significant decline in productivity and social presence", id: "Produktivitas & sosialisasi menurun signifikan", de: "Deutlicher Einbruch bei Produktivität und Freunden", fr: "Baisse notable de ma productivité et vie sociale", es: "Baja notable en mi productividad y vida social" } },
      { score: 3, label: { en: "Severe paralysis; everything else feels grey, meaningless, and neglected", id: "Paralisis total; hal lain terasa hampa dan terbengkalai", de: "Schwere Lähmung; alles andere wirkt grau und sinnlos", fr: "Paralysie totale: le reste me paraît terne et dénué de sens", es: "Parálisis severa; todo lo demás parece gris y sin sentido" } },
    ],
  },

  // Subscale 3: Crystallized Idealization & Obstacle Addiction
  {
    id: 9,
    subscale: "crystallized_idealization",
    prompt: {
      en: "Do you view this person as uniquely perfect, overlooking red flags, incompatibilities, or poor treatment?",
      id: "Apakah kamu memandang orang ini luar biasa sempurna, mengabaikan red flag, ketidakcocokan, atau perlakuan buruknya?",
      de: "Siehst du diese Person als einzigartig vollkommen und übersiehst Red Flags oder schlechte Behandlung?",
      fr: "Considérez-vous cette personne comme exceptionnelle, en minimisant ses défauts ou mauvais comportements ?",
      es: "¿Ves a esta persona como excepcionalmente perfecta, ignorando banderas rojas o malos tratos?",
    },
    options: [
      { score: 0, label: { en: "No, I clearly see their flaws and limitations", id: "Tidak, saya sadar kekurangan dan batasannya", de: "Nein, ich sehe ihre Fehler und Grenzen ganz klar", fr: "Non, je vois clairement ses défauts", es: "No, veo claramente sus defectos y límites" } },
      { score: 1, label: { en: "I admire their strengths, but stay realistic", id: "Mengagumi kelebihannya tapi tetap realistis", de: "Bewundere Stärken, bleibe aber realistisch", fr: "J'admire ses qualités en restant lucide", es: "Admiro sus virtudes pero con realismo" } },
      { score: 2, label: { en: "I frequently rationalize or excuse their shortcomings", id: "Sering mencari pembenaran atas kekurangannya", de: "Ich rechtfertige ihre Schwächen oft innerlich", fr: "J'ai tendance à excuser ou minimiser ses erreurs", es: "A menudo justifico o excuso sus defectos" } },
      { score: 3, label: { en: "Complete pedestalization; I believe no one else can ever compare", id: "Menaruh di atas tumpuan mutlak; tak ada yang sebanding dengannya", de: "Völlige Idealisierung; niemand sonst kommt an sie heran", fr: "Idéalisation absolue: personne d'autre ne pourra l'égaler", es: "Idealización total; siento que nadie más se le compara" } },
    ],
  },
  {
    id: 10,
    subscale: "crystallized_idealization",
    prompt: {
      en: "Does their emotional unavailability, existing partner, or distance actually intensify your longing for them?",
      id: "Apakah ketidaksediaannya (sudah berpasangan, jarak jauh, atau dingin) justru membuat rasa sukamu makin membara?",
      de: "Macht ihre emotionale Unerreichbarkeit, Partner oder Distanz deine Sehnsucht nur noch intensiver?",
      fr: "Le fait qu'elle soit indisponible (en couple, distante) attise-t-il encore plus votre désir ?",
      es: "¿Su falta de disponibilidad emocional (pareja, distancia, frialdad) intensifica aún más tu anhelo?",
    },
    options: [
      { score: 0, label: { en: "No, unavailability immediately turns me off", id: "Tidak, ketidaksediaan langsung mematikan rasa", de: "Nein, Unerreichbarkeit schreckt mich sofort ab", fr: "Non, l'indisponibilité me refroidit immédiatement", es: "No, la indisponibilidad me desilusiona de inmediato" } },
      { score: 1, label: { en: "It brings some sadness, but I respect the boundary", id: "Sedih sedikit tapi menghargai batasan", de: "Macht traurig, aber ich respektiere die Grenze", fr: "Un peu triste mais je respecte la limite", es: "Triste pero respeto los límites" } },
      { score: 2, label: { en: "The obstacle makes the pursuit feel dramatic and poetic", id: "Rintangan membuatnya terasa dramatis & puitis", de: "Das Hindernis verleiht allem ein dramatisches Gefühl", fr: "L'obstacle donne un côté romanesque et passionnel", es: "El obstáculo lo hace ver más dramático y romántico" } },
      { score: 3, label: { en: "Addicted to the barrier; certainty bores me, uncertainty inflames me", id: "Kecanduan rintangan; kepastian terasa membosankan, ketidakpastian memicu gairah", de: "Süchtig nach der Hürde; Ungewissheit entfacht mich erst recht", fr: "Addict à l'obstacle: la certitude m'ennuie, le doute m'enflamme", es: "Adicto al obstáculo; la certeza aburre, la duda me enciende" } },
    ],
  },
  {
    id: 11,
    subscale: "crystallized_idealization",
    prompt: {
      en: "Do you modify your opinions, taste in music, style, or values to mirror what you think they desire?",
      id: "Apakah kamu mengubah pendapat, selera musik, gaya berpakaian, atau prinsip demi menyesuaikan keinginannya?",
      de: "Passt du deine Meinungen, Musik, Kleidung oder Werte an das an, was sie angeblich mögen?",
      fr: "Modifiez-vous vos goûts musicaux, opinions ou look pour correspondre à ce qu'elle semble aimer ?",
      es: "¿Modificas tus opiniones, música, ropa o valores para encajar en lo que crees que le gusta?",
    },
    options: [
      { score: 0, label: { en: "No, I am completely confident in my authentic identity", id: "Tidak, saya tetap menjadi diri sendiri", de: "Nein, ich bleibe mir selbst vollkommen treu", fr: "Non, je reste fidèle à mon identité", es: "No, me mantengo fiel a mi identidad" } },
      { score: 1, label: { en: "I explore their interests out of healthy curiosity", id: "Hanya ingin tahu minatnya secara wajar", de: "Erkunde ihre Hobbys aus Neugier", fr: "Je découvre ses goûts par simple curiosité", es: "Exploro sus intereses por curiosidad sana" } },
      { score: 2, label: { en: "I conceal parts of myself that might displease them", id: "Menyembunyikan sisi diriku yang mungkin tak dia sukai", de: "Verberge Seiten von mir, die stören könnten", fr: "Je cache certains aspects pour ne pas déplaire", es: "Oculto partes de mí para no desagradarle" } },
      { score: 3, label: { en: "Complete chameleonic shift; I have abandoned my authentic life to fit their ideal", id: "Bunglon total; mengorbankan jati diri demi menjadi sosok idamannya", de: "Völliges Chamäleon: eigene Werte aufgegeben für ihr Ideal", fr: "Caméléon complet: j'ai effacé qui je suis pour son idéal", es: "Camaleón total: he renunciado a quién soy para agradarle" } },
    ],
  },
  {
    id: 12,
    subscale: "crystallized_idealization",
    prompt: {
      en: "How does the thought of a life where you never end up together make you feel?",
      id: "Bagaimana perasaanmu saat membayangkan hidup di masa depan tanpa pernah bersamanya?",
      de: "Wie fühlst du dich bei dem Gedanken, dass ihr niemals zusammenkommt?",
      fr: "Que ressentez-vous à l'idée d'une vie où vous ne seriez jamais ensemble ?",
      es: "¿Qué sientes al imaginar un futuro en el que nunca estén juntos?",
    },
    options: [
      { score: 0, label: { en: "Peaceful; I know I have a fulfilling life regardless", id: "Tenang; hidup saya tetap bermakna tanpa dia", de: "Friedlich; mein Leben ist auch so erfüllend", fr: "Serein; ma vie est riche et épanouissante de toute façon", es: "Tranquilo; mi vida es plena de todos modos" } },
      { score: 1, label: { en: "Sad, but accepting of reality", id: "Sedih, tapi bisa menerima kenyataan", de: "Traurig, aber akzeptiere die Realität", fr: "Triste, mais j'accepterais la réalité", es: "Triste, pero acepto la realidad" } },
      { score: 2, label: { en: "A deep sense of gloom and resistance to acceptance", id: "Sangat murung dan sulit menerima", de: "Tiefe Schwere und innerer Widerstand", fr: "Grande morosité et refus d'accepter", es: "Gran pesadumbre y resistencia a aceptarlo" } },
      { score: 3, label: { en: "Existential dread; existence feels unbearable and hollow without them", id: "Kekosongan eksistensial; hidup serasa hampa dan tak tertahankan", de: "Existenzielles Entsetzen; Leben wirkt unerträglich leer", fr: "Angoisse existentielle: la vie me semble vide et insupportable", es: "Pavor existencial; la vida parece insoportable y vacía" } },
    ],
  },
];

export const LIMERENCE_PROFILES: Record<string, LimerenceProfile> = {
  acute_limerence: {
    level: "acute_limerence",
    badge: {
      en: "Acute Neurochemical Limerence",
      id: "Limerence Neurokimia Akut",
      de: "Akute Neurochemische Limerenz",
      fr: "Limerence Aiguë & Dépendance Dopaminergique",
      es: "Limerencia Neuroquímica Aguda",
    },
    title: {
      en: "The Dopamine Loop Trap",
      id: "Jebakan Siklus Dopamin",
      de: "Die Dopamin-Schlingen-Falle",
      fr: "Le Piège de la Boucle Dopaminergique",
      es: "La Trampa del Bucle Dopaminérgico",
    },
    tagline: {
      en: "Severe involuntary obsession driven by intermittent reinforcement and cognitive pedestalization.",
      id: "Obsesi tak terkendali yang dipicu oleh penguatan terputus-putus dan idealisasi ekstrem.",
      de: "Schwere unwillkürliche Fixierung durch intermittierende Verstärkung und Idealisierung.",
      fr: "Obsession involontaire sévère alimentée par le renforcement intermittent et l'idéalisation.",
      es: "Obsesión involuntaria severa impulsada por refuerzo intermitente e idealización extrema.",
    },
    description: {
      en: "You are experiencing textbook clinical limerence as formulated by Dr. Dorothy Tennov. This is not mature romantic love; it is a profound neurochemical intoxication where your brain's striatal dopamine circuits are hijacked by uncertainty and fantasy. The object of your desire (LO) has become your exclusive source of emotional homeostasis, causing massive cortisol spikes upon silence and ecstatic highs upon minimal contact.",
      id: "Kamu mengalami limerence klinis klasik seperti yang dirumuskan oleh Dr. Dorothy Tennov. Ini bukan cinta dewasa yang tenang, melainkan pembajakan neurokimiawi di sirkuit dopamin otakmu akibat ketidakpastian dan fantasi. Orang tersebut telah menjadi sumber tunggal regulasi emosimu, memicu lonjakan kortisol saat ia dingin dan euforia berlebihan saat ia menyapa.",
      de: "Du erlebst klassische klinische Limerenz nach Dr. Dorothy Tennov. Dies ist keine reife partnerschaftliche Liebe, sondern eine neurochemische Reizüberflutung, bei der Ungewissheit das Dopaminsystem kapert. Die begehrte Person ist zur alleinigen Quelle deiner emotionalen Stabilität geworden, was zu Schlaflosigkeit, Unruhe und extremen Schwankungen führt.",
      fr: "Vous vivez une limerence clinique aiguë selon le modèle du Dr Dorothy Tennov. Il ne s'agit pas d'un amour mature mais d'un piratage neurochimique de vos récepteurs dopaminergiques provoqué par l'incertitude. La personne désirée est devenue le seul baromètre de votre valeur, déclenchant d'immenses vagues d'anxiété au moindre silence.",
      es: "Estás experimentando limerencia clínica aguda según el modelo de la Dra. Dorothy Tennov. No es amor maduro, sino un secuestro neuroquímico de tus circuitos de dopamina por la incertidumbre y la fantasía. Esta persona se ha convertido en la única fuente de tu bienestar emocional, provocando picos de ansiedad y euforia.",
    },
    neurobiologyInsight: {
      en: "Dr. Dorothy Tennov's research revealed that limerence thrives precisely on uncertainty and obstacles. Brain scans show activation identical to substance addiction (ventral tegmental area and nucleus accumbens). Unavailability acts as fuel.",
      id: "Riset Dr. Dorothy Tennov membuktikan bahwa limerence justru berkobar karena ketidakpastian dan rintangan. Pemindaian otak menunjukkan aktivitas yang identik dengan kecanduan zat (VTA dan nukleus akumbens). Ketidaksediaan orang tersebut justru menjadi bahan bakar.",
      de: "Dr. Dorothy Tennovs Forschung zeigte, dass Limerenz sich von Ungewissheit und Hürden nährt. Hirnscans zeigen Muster identisch zu stoffgebundenen Süchten (VTA und Nucleus accumbens).",
      fr: "Les recherches du Dr Tennov ont prouvé que la limerence se nourrit d'incertitude et d'obstacles. L'imagerie cérébrale révèle des schémas identiques à ceux de l'addiction (aire tegmentale ventrale et noyau accumbens).",
      es: "La investigación de la Dra. Dorothy Tennov demostró que la limerencia se nutre de la incertidumbre y los obstáculos. Los escáneres cerebrales reflejan una activación idéntica a la adicción a sustancias.",
    },
    detachmentProtocols: {
      en: [
        "Strict 30-Day Digital Detox: Unfollow, mute, or block online status. Every profile check re-floods the brain with dopamine and resets your withdrawal clock.",
        "Cognitive Interruption Drill: The moment an intrusive daydream starts, physically clap hands, say 'STOP - Fantasies are not real memories', and do 15 wall pushups.",
        "De-Pedestalization Ledger: Write a brutal, honest list of their flaws, incompatibilities, and times they treated you dismissively. Read it when craving hits.",
      ],
      id: [
        "Detoks Digital 30 Hari: Hentikan stalking, mute akun, dan matikan status online. Setiap intipan mereset proses penyembuhan dopaminmu.",
        "Latihan Interupsi Kognitif: Saat lamunan menyusup, tepuk tangan dan ucapkan: 'STOP - Fantasi ini bukan kenyataan', lalu lakukan 15 kali pushup.",
        "Buku Catatan De-Pedestal: Tuliskan daftar jujur kekurangan mereka, ketidakcocokan nyata, dan saat mereka bersikap acuh. Baca ini saat rindu menyerang.",
      ],
      de: [
        "Strikter 30-Tage-Digital-Detox: Social Media stummschalten oder blockieren. Jeder Klick reaktiviert den Entzugsschmerz.",
        "Gedankenstopp-Übung: Sobald ein Tagtraum beginnt, laut 'STOPP' sagen, in die Hände klatschen und sofort eine körperliche Bewegung ausführen.",
        "Entzauberungs-Liste: Schreibe schonungslos alle Fehler, Unstimmigkeiten und kühlen Verhaltensweisen auf. Lies sie bei Sehnsuchtsschüben.",
      ],
      fr: [
        "Détox Numérique Stricte de 30 Jours: Mettez en sourdine ou bloquez ses profils. Chaque coup d'œil relance la dépendance chimique.",
        "Exercice de Rupture Cognitive: Dès qu'un scénario mental démarre, tapez dans vos mains, dites 'STOP - Ce n'est qu'un mirage', et bougez physiquement.",
        "Le Registre de Dé-Idéalisation: Listez objectivement tous ses défauts, incompatibilités et manques d'égards. Relisez-le en cas de manque.",
      ],
      es: [
        "Detox Digital Estricto de 30 Días: Silencia o bloquea sus redes. Cada visita reinicia el reloj de abstinencia de dopamina.",
        "Técnica de Parada de Pensamiento: Al iniciar una fantasía, da una palmada, di 'ALTO - Esto no es real' y haz 15 flexiones.",
        "Lista de Des-Idealización: Escribe con franqueza todos sus defectos, desplantes e incompatibilidades. Léela cuando sientas anhelo.",
      ],
    },
    dailyAffirmation: {
      en: "I release the mirage of their potential. My nervous system belongs to my reality, not their breadcrumbs.",
      id: "Kulepaskan ilusi tentang potensinya. Sistem sarafku adalah milik hidup nyataku, bukan remah-remah perhatiannya.",
      de: "Ich lasse die Illusion ihres Potenzials los. Mein Nervensystem gehört meiner Realität, nicht ihren Brotkrumen.",
      fr: "Je libère le mirage de son potentiel. Mon système nerveux appartient à ma réalité, pas à ses miettes d'attention.",
      es: "Suelto el espejismo de su potencial. Mi sistema nervioso pertenece a mi realidad, no a sus migajas.",
    },
  },
  anxious_fixation: {
    level: "anxious_fixation",
    badge: {
      en: "Anxious Romantic Fixation",
      id: "Fiksasi Romantis Cemas",
      de: "Ängstliche Romantische Fixierung",
      fr: "Fixation Romantique Anxieuse",
      es: "Fijación Romántica Ansiosa",
    },
    title: {
      en: "The Hopeful Over-Analyzer",
      id: "Penganalisis Harapan Berlebih",
      de: "Der Hoffnungsvolle Überanalysierer",
      fr: "L'Analyste Anxieux des Sentiments",
      es: "El Analizador de Señales",
    },
    tagline: {
      en: "Moderate limerent traits where emotional well-being is frequently disturbed by romantic ambiguity.",
      id: "Karakteristik limerence sedang di mana kesejahteraan emosional terganggu oleh ambiguitas romantis.",
      de: "Moderate Limerenz; emotionale Stabilität gerät durch romantische Unklarheiten ins Wanken.",
      fr: "Traits de limerence modérés où l'ambiguïté relationnelle perturbe régulièrement la sérénité.",
      es: "Rasgos de limerencia moderada donde la ambigüedad perturba constantemente la tranquilidad.",
    },
    description: {
      en: "You have significant limerent tendencies. While not entirely paralyzed in daily functioning, you spend extensive energy over-analyzing micro-signals, decoding ambiguous messages, and daydreaming about emotional reciprocation. You tend to place partners on a pedestal and experience sharp pangs of insecurity when connection feels distant.",
      id: "Kamu memiliki kecenderungan limerence yang cukup kuat. Meski masih bisa menjalankan aktivitas harian, energimu banyak tersedot untuk menganalisis kode-kode kecil, menafsirkan chat ambigu, dan melamunkan kepastian cinta. Kamu mudah menempatkan orang lain di tumpuan dan cemas saat ia terasa menjauh.",
      de: "Du zeigst deutliche Limerenz-Tendenzen. Auch wenn du deinen Alltag bewältigst, verbrauchst du viel Kraft mit dem Entschlüsseln von Mikrosignalen und Tagträumen. Du neigst dazu, die Person zu überhöhen, und leidest unter Ungewissheit.",
      fr: "Vous manifestez des tendances limerentes évidentes. Bien que vous conserviez vos routines, vous consacrez trop d'énergie à décrypter les silences et à espérer une réciprocité idéale.",
      es: "Muestras claras tendencias de limerencia. Aunque sigues con tu vida diaria, consumes demasiada energía interpretando señales mínimas e idealizando una reciprocidad perfecta.",
    },
    neurobiologyInsight: {
      en: "Your attachment system is hyper-activated by intermittent connection. When affection is sporadic, dopamine spikes higher than when affection is guaranteed and reliable.",
      id: "Sistem kelekatanmu teraktivasi berlebih oleh perhatian yang timbul tenggelam. Saat perhatian bersifat sporadis, dopamin melonjak lebih tinggi dibanding cinta yang stabil dan pasti.",
      de: "Dein Bindungssystem wird durch unregelmäßige Zuneigung überstimuliert. Sporadische Aufmerksamkeit setzt mehr Dopamin frei als verlässliche Nähe.",
      fr: "Votre système d'attachement est sur-stimulé par la discontinuité affective. L'attention intermittente stimule davantage le circuit de la récompense qu'une sécurité stable.",
      es: "Tu sistema de apego se sobreactiva por la conexión intermitente. La atención esporádica dispara más dopamina que una certeza tranquila y segura.",
    },
    detachmentProtocols: {
      en: [
        "The Direct Clarity Rule: Instead of analyzing clues for weeks, practice asking for clear communication or accepting silence as a polite 'no'.",
        "Sensory Grounding Protocol: When rumination begins, do 2 minutes of 4-4-4-4 box breathing to bring prefrontal cortex activity back online.",
        "Social Investment Expansion: Reinvest 50% of the mental time spent on this person into creative projects or friendships with secure, reciprocal people.",
      ],
      id: [
        "Aturan Kejelasan Langsung: Daripada menganalisis berhari-hari, carilah kepastian komunikasi atau anggap sikap pasif sebagai jawaban 'tidak'.",
        "Protokol Grounding Sensori: Saat mulai overthinking, lakukan 2 menit pernapasan kotak 4-4-4-4 agar korteks prefrontal kembali tenang.",
        "Ekspansi Investasi Sosial: Alihkan separuh waktu pikiranmu ke proyek kreatif atau sahabat yang memberikan timbal balik nyata.",
      ],
      de: [
        "Regel der Klarheit: Beende stundenlanges Rätselraten. Frage direkt oder nimm zögerliches Verhalten als klares Nein an.",
        "Sensorisches Grounding: Bei beginnendem Grübeln 2 Minuten Box-Breathing (4-4-4-4) zur Beruhigung des präfrontalen Kortex.",
        "Soziale Reinvestition: Investiere die freiwerdende Energie in verlässliche Freundschaften und eigene kreative Ziele.",
      ],
      fr: [
        "La Règle de Clarté Directe: Cessez de deviner les intentions. Exigez la clarté ou interprétez l'hésitation comme un désintérêt poli.",
        "Protocole d'Ancrage: Pratiquez 2 minutes de respiration carrée dès que l'analyse compulsive commence.",
        "Réinvestissement Social: Redirigez cette énergie mentale vers des projets personnels et des liens réellement réciproques.",
      ],
      es: [
        "Regla de Claridad Directa: Deja de descifrar enigmas; pide claridad o acepta la tibieza como una respuesta negativa.",
        "Anclaje Sensorial: Realiza 2 minutos de respiración táctica 4-4-4-4 ante las primeras señales de rumiación.",
        "Reinversión Social: Deriva la energía mental hacia proyectos creativos y amistades recíprocas y seguras.",
      ],
    },
    dailyAffirmation: {
      en: "Clarity is attractive; ambiguity is not a mystery to solve, but a sign to step back.",
      id: "Kejelasan itu menenangkan; ketidakpastian bukanlah misteri untuk dipecahkan, melainkan tanda untuk mundur.",
      de: "Klarheit ist heilsam; Ungewissheit ist kein Rätsel, das ich lösen muss, sondern ein Signal zum Rückzug.",
      fr: "La clarté est attirante; l'ambiguïté n'est pas un mystère à résoudre, mais une invitation à prendre du recul.",
      es: "La claridad es paz; la ambigüedad no es un misterio para resolver, sino una señal para retroceder.",
    },
  },
  hopeful_crush: {
    level: "hopeful_crush",
    badge: {
      en: "Healthy Romantic Infatuation",
      id: "Ketertarikan Romantis Wajar",
      de: "Gesundes Verliebtsein",
      fr: "Béguin Romantique Modéré",
      es: "Atracción Romántica Sana",
    },
    title: {
      en: "The Grounded Admirer",
      id: "Pengagum Realistis",
      de: "Der Geerdete Bewunderer",
      fr: "L'Admirateur Lucide",
      es: "El Admirador Equilibrado",
    },
    tagline: {
      en: "Normal romantic attraction without destructive obsessional loops or identity dissolution.",
      id: "Daya tarik romantis yang wajar tanpa siklus obsesi merusak atau kehilangan jati diri.",
      de: "Gesunde Anziehungskraft ohne zerstörerische Fixierungen oder Kontrollverlust.",
      fr: "Attirance saine sans boucles obsessionnelles destructrices ni perte d'identité.",
      es: "Atracción afectiva sana sin bucles obsesivos ni despersonalización.",
    },
    description: {
      en: "You have mild, standard romantic interest. While you enjoy thinking about them and feel happy when interacting, you maintain a strong sense of self, realistic view of their human flaws, and uncompromised productivity in your everyday life.",
      id: "Kamu merasakan ketertarikan romantis yang wajar dan sehat. Kamu senang memikirkan mereka, tetapi tetap memiliki harga diri yang utuh, mampu melihat kekurangan mereka secara realistis, dan produktivitasmu tidak terganggu.",
      de: "Du erlebst eine gesunde, normale Schwärmerei. Du freust dich über Kontakt, behältst aber deine Unabhängigkeit, deinen Realitätssinn und deinen Tagesablauf fest im Griff.",
      fr: "Vous ressentez une attirance romantique normale et équilibrée. Vous appréciez les moments partagés tout en gardant votre indépendance et une vision réaliste de ses limites.",
      es: "Sientes una atracción romántica normal y proporcionada. Disfrutas de su compañía manteniendo tu autonomía, rutina y una visión lúcida de la realidad.",
    },
    neurobiologyInsight: {
      en: "Your dopamine reward pathways are engaged pleasantly without triggering severe withdrawal or panic circuitry in the amygdala.",
      id: "Jalur dopaminmu terstimulasi secara menyenangkan tanpa memicu kepanikan di amigdala atau rasa sakau emosional.",
      de: "Deine Dopaminbahnen sind angenehm aktiviert, ohne dass Panikzentren in der Amygdala anspringen.",
      fr: "Vos circuits de dopamine sont stimulés de façon agréable sans déclencher de panique amygdalienne.",
      es: "Tus circuitos de dopamina se activan saludablemente sin disparar señales de pánico o abstinencia.",
    },
    detachmentProtocols: {
      en: [
        "Continue open, honest, and paced communication.",
        "Keep nurturing your independent hobbies and personal goals.",
        "Notice any creeping idealization early and stay rooted in observed facts.",
      ],
      id: [
        "Lanjutkan komunikasi yang terbuka, jujur, dan tidak terburu-buru.",
        "Tetap kembangkan hobi dan tujuan hidup pribadimu.",
        "Sadari jika mulai muncul tanda idealisasi berlebihan dan tetap berpijak pada fakta nyata.",
      ],
      de: [
        "Pflege weiterhin offene, unaufgeregte Kommunikation.",
        "Verfolge deine persönlichen Hobbys und Ziele eigenständig weiter.",
        "Behalte einen realistischen Blick auf Fakten statt bloßer Projektionen.",
      ],
      fr: [
        "Maintenez une communication sincère et progressive.",
        "Poursuivez vos activités et objectifs personnels.",
        "Restez attentif aux faits réels plutôt qu'aux projections idéalisées.",
      ],
      es: [
        "Mantén una comunicación abierta, sincera y sin prisas.",
        "Continúa cultivando tus proyectos y aficiones individuales.",
        "Permanece anclado a los hechos observables en lugar de fantasías.",
      ],
    },
    dailyAffirmation: {
      en: "I love from wholeness, never from scarcity or desperation.",
      id: "Aku mencintai dari kepenuhan jiwa, bukan dari rasa hampa atau keputusasaan.",
      de: "Ich liebe aus innerer Fülle, niemals aus Mangel oder Verzweiflung.",
      fr: "J'aime depuis la plénitude, jamais depuis le manque ou l'urgence.",
      es: "Amo desde mi plenitud, nunca desde la carencia o la desesperación.",
    },
  },
  secure_connection: {
    level: "secure_connection",
    badge: {
      en: "Sovereign Secure Connection",
      id: "Kelekatan Berdaulat & Aman",
      de: "Souveräne Sichere Verbindung",
      fr: "Connexion Émotionnelle Sécurisée",
      es: "Vínculo Seguro y Soberano",
    },
    title: {
      en: "The Emotionally Sovereign",
      id: "Pribadi Berdaulat Emosional",
      de: "Der Emotional Souveräne",
      fr: "L'Esprit Émotionnellement Libre",
      es: "El Soberano Emocional",
    },
    tagline: {
      en: "Zero limerent traits; completely autonomous emotional regulation and mature relational capacity.",
      id: "Bebas dari limerence; regulasi emosi mandiri dan kapasitas relasi dewasa yang matang.",
      de: "Keine Limerenz-Symptome; vollständige emotionale Selbstbestimmung und Reife.",
      fr: "Absence de limerence; régulation émotionnelle mature et saine autonomie affective.",
      es: "Sin síntomas de limerencia; autorregulación emocional madura y apego seguro.",
    },
    description: {
      en: "Your score shows no evidence of limerence. You maintain emotional autonomy, do not engage in compulsive fantasy loops, and your sense of worth is securely anchored within yourself. You are able to experience genuine intimacy without needing obsessive control or pedestalizing partners.",
      id: "Skormu menunjukkan tidak adanya tanda limerence. Kamu memiliki kedaulatan emosional, tidak terjebak dalam siklus fantasi obsesif, dan harga dirimu berakar kuat di dalam dirimu sendiri. Kamu mampu membina keintiman sehat tanpa ketergantungan berlebihan.",
      de: "Dein Ergebnis zeigt keinerlei Limerenz. Du ruhst in dir selbst, verlierst dich nicht in Fantasieschleifen und dein Selbstwert ist stabil in deiner eigenen Persönlichkeit verankert.",
      fr: "Votre profil ne révèle aucune trace de limerence. Vous possédez une saine autonomie émotionnelle, n'idéalisez personne et abordez les relations avec sérénité.",
      es: "Tu resultado no muestra indicios de limerencia. Posees una sólida autonomía emocional, no dependes de fantasías compulsivas y tu autoestima está firmemente asentada.",
    },
    neurobiologyInsight: {
      en: "Your prefrontal cortex maintains optimal top-down regulation over dopaminergic reward centers, preventing runaway obsessive feedback loops.",
      id: "Korteks prefrontalmu menjaga kontrol optimal atas sirkuit dopamin, mencegah terbentuknya siklus obsesi yang tak terkendali.",
      de: "Dein präfrontaler Kortex steuert das Belohnungssystem souverän und verhindert obsessive Rückkopplungen.",
      fr: "Votre cortex préfrontal régule parfaitement le circuit de la récompense, évitant tout emballement obsessionnel.",
      es: "Tu corteza prefrontal modula eficazmente los centros de dopamina, evitando bucles de apego obsesivo.",
    },
    detachmentProtocols: {
      en: [
        "Celebrate your grounded emotional sovereignty.",
        "Support others navigating painful romantic obsession with compassion and firm boundaries.",
        "Continue cultivating mutual vulnerability in reciprocal relationships.",
      ],
      id: [
        "Rayakan kedaulatan emosionalmu yang sehat dan kokoh.",
        "Bantu orang di sekitarmu yang terjebak obsesi cinta dengan empati dan batasan tegas.",
        "Terus kembangkan keintiman timbal balik yang saling menghargai.",
      ],
      de: [
        "Bewahre deine gesunde emotionale Unabhängigkeit.",
        "Begegne Menschen im limerenten Liebeskummer mit Empathie und klaren Grenzen.",
        "Vertiefe weiterhin echte, reziproke Partnerschaften.",
      ],
      fr: [
        "Conservez cette précieuse souveraineté affective.",
        "Accompagnez vos proches pris dans l'obsession avec écoute et discernement.",
        "Cultivez des relations fondées sur le respect mutuel.",
      ],
      es: [
        "Celebra tu madurez y soberanía afectiva.",
        "Apoya a quienes sufren de obsesión romántica con empatía y límites firmes.",
        "Sigue cultivando relaciones basadas en la reciprocidad y la confianza.",
      ],
    },
    dailyAffirmation: {
      en: "I am complete within myself; love is a joyful sharing of abundance, not a search for completion.",
      id: "Aku utuh di dalam diriku; cinta adalah berbagi kelimpahan rasa, bukan pencarian untuk melengkapi kekosongan.",
      de: "Ich bin in mir selbst vollständig; Liebe ist geteilte Fülle, kein Suchen nach Erlösung.",
      fr: "Je suis complet par moi-même; l'amour est un partage d'abondance, non une quête de salut.",
      es: "Soy una persona completa; el amor es compartir abundancia, no buscar salvación.",
    },
  },
};

export function calculateLimerenceScore(answers: Record<number, number>): LimerenceScoreResult {
  let totalScore = 0;
  const maxScore = LIMERENCE_QUESTIONS.length * 3; // 36

  const subscaleScores: Record<string, { score: number; max: number }> = {
    involuntary_rumination: { score: 0, max: 12 },
    dopamine_volatility: { score: 0, max: 12 },
    crystallized_idealization: { score: 0, max: 12 },
  };

  LIMERENCE_QUESTIONS.forEach((q) => {
    const score = answers[q.id] ?? 0;
    totalScore += score;
    if (subscaleScores[q.subscale]) {
      subscaleScores[q.subscale].score += score;
    }
  });

  const percentage = Math.round((totalScore / maxScore) * 100);

  let level: "acute_limerence" | "anxious_fixation" | "hopeful_crush" | "secure_connection";
  if (percentage >= 70) {
    level = "acute_limerence";
  } else if (percentage >= 45) {
    level = "anxious_fixation";
  } else if (percentage >= 20) {
    level = "hopeful_crush";
  } else {
    level = "secure_connection";
  }

  return {
    totalScore,
    maxScore,
    percentage,
    level,
    profile: LIMERENCE_PROFILES[level],
    subscales: {
      involuntary_rumination: {
        score: subscaleScores.involuntary_rumination.score,
        max: subscaleScores.involuntary_rumination.max,
        percentage: Math.round((subscaleScores.involuntary_rumination.score / subscaleScores.involuntary_rumination.max) * 100),
      },
      dopamine_volatility: {
        score: subscaleScores.dopamine_volatility.score,
        max: subscaleScores.dopamine_volatility.max,
        percentage: Math.round((subscaleScores.dopamine_volatility.score / subscaleScores.dopamine_volatility.max) * 100),
      },
      crystallized_idealization: {
        score: subscaleScores.crystallized_idealization.score,
        max: subscaleScores.crystallized_idealization.max,
        percentage: Math.round((subscaleScores.crystallized_idealization.score / subscaleScores.crystallized_idealization.max) * 100),
      },
    },
  };
}
