export type PeoplePleaserLang = "en" | "id" | "de" | "fr" | "es";

export type FawnLevel = "sovereign" | "mild" | "fawn" | "codependent";

export interface PeoplePleaserQuestion {
  id: number;
  dimension: "appeasement" | "overcommitment" | "guilt";
  text: Record<PeoplePleaserLang, string>;
}

export const PEOPLE_PLEASER_OPTIONS = [
  {
    value: 0,
    label: {
      en: "Never / Rarely",
      id: "Tidak Pernah / Jarang",
      de: "Nie / Selten",
      fr: "Jamais / Rarement",
      es: "Nunca / Rara vez",
    },
  },
  {
    value: 1,
    label: {
      en: "Sometimes",
      id: "Kadang-Kadang",
      de: "Manchmal",
      fr: "Parfois",
      es: "A veces",
    },
  },
  {
    value: 2,
    label: {
      en: "Frequently",
      id: "Seringkali",
      de: "Häufig",
      fr: "Souvent",
      es: "Frecuentemente",
    },
  },
  {
    value: 3,
    label: {
      en: "Almost Always",
      id: "Hampir Selalu",
      de: "Fast immer",
      fr: "Presque toujours",
      es: "Casi siempre",
    },
  },
];

export const PEOPLE_PLEASER_QUESTIONS: PeoplePleaserQuestion[] = [
  // Dimension 1: Conflict Avoidance & Appeasement (Fawn Response)
  {
    id: 1,
    dimension: "appeasement",
    text: {
      en: "I agree with other people's opinions or plans, even when I privately disagree, just to avoid tension or friction.",
      id: "Aku mengiyakan pendapat atau rencana orang lain, meski dalam hati tidak setuju, hanya demi menghindari suasana canggung atau konflik.",
      de: "Ich stimme Meinungen oder Plänen anderer zu, obwohl ich innerlich dagegen bin, nur um Reibung zu vermeiden.",
      fr: "J'acquiesce aux avis ou projets des autres même si je ne suis pas d'accord, juste pour éviter les tensions.",
      es: "Acepto opiniones o planes ajenos aunque no esté de acuerdo en privado, solo para evitar roces o tensión.",
    },
  },
  {
    id: 2,
    dimension: "appeasement",
    text: {
      en: "When someone is visibly angry or upset in the room, I immediately feel an urgent impulse to soothe them or fix their mood.",
      id: "Saat ada orang yang tampak kesal atau marah di sekitarku, aku spontan merasa panik dan terdorong untuk menenangkan atau menghiburnya.",
      de: "Wenn jemand verärgert ist, spüre ich den sofortigen Drang, die Stimmung zu retten und die Person zu beruhigen.",
      fr: "Quand quelqu'un est agacé autour de moi, je ressens le besoin urgent d'apaiser son humeur.",
      es: "Cuando alguien está molesto a mi alrededor, siento el impulso urgente de arreglar su estado de ánimo.",
    },
  },
  {
    id: 3,
    dimension: "appeasement",
    text: {
      en: "I find myself apologizing profusely for normal things like asking a question, taking up space, or sharing a boundary.",
      id: "Aku sering meminta maaf berlebihan atas hal-hal wajar seperti bertanya, menyampaikan keberatan, atau sekadar hadir.",
      de: "Ich entschuldige mich ständig für normale Dinge wie Nachfragen oder das Äußern eigener Grenzen.",
      fr: "Je m'excuse sans cesse pour des choses normales comme poser une question ou exprimer une limite.",
      es: "Me disculpo compulsivamente por cosas normales como hacer una pregunta o marcar un límite.",
    },
  },
  {
    id: 4,
    dimension: "appeasement",
    text: {
      en: "I constantly monitor other people's micro-expressions and tone of voice to check if they are disappointed in me.",
      id: "Aku terus-menerus memantau ekspresi wajah dan intonasi orang lain untuk memastikan mereka tidak kecewa padaku.",
      de: "Ich beobachte Mimik und Tonfall anderer peinlich genau, aus Angst, sie könnten enttäuscht sein.",
      fr: "Je scrute les micro-expressions et le ton des autres pour vérifier qu'ils ne m'en veulent pas.",
      es: "Analizo constantemente los gestos y tonos de voz de los demás para ver si están disgustados conmigo.",
    },
  },

  // Dimension 2: Boundary Disregard & Overcommitment
  {
    id: 5,
    dimension: "overcommitment",
    text: {
      en: "Saying the word 'NO' to an invitation or work request feels physically suffocating or creates severe panic in my chest.",
      id: "Mengucapkan kata 'TIDAK' pada ajakan atau permintaan bantuan terasa sangat berat dan memicu rasa panik di dada.",
      de: "Ein klares 'Nein' auszusprechen schnürt mir die Kehle zu oder löst Beklemmung in der Brust aus.",
      fr: "Dire 'NON' à une invitation ou demande me donne une sensation d'étouffement ou d'angoisse.",
      es: "Decir la palabra 'NO' a una petición me genera opresión física o angustia en el pecho.",
    },
  },
  {
    id: 6,
    dimension: "overcommitment",
    text: {
      en: "I routinely sacrifice my sleep, health, or personal priorities to help someone else meet their deadline or crisis.",
      id: "Aku terbiasa mengorbankan waktu tidur, kesehatan, atau prioritasku sendiri demi menyelesaikan urusan orang lain.",
      de: "Ich opfere regelmäßig meinen Schlaf oder meine Gesundheit, um anderen aus der Klemme zu helfen.",
      fr: "Je sacrifie souvent mon sommeil ou mes priorités pour régler les urgences des autres.",
      es: "Suelo sacrificar mi descanso o salud para resolver las urgencias o compromisos de los demás.",
    },
  },
  {
    id: 7,
    dimension: "overcommitment",
    text: {
      en: "I say 'Yes' right away out of impulse, and then spend hours afterwards feeling bitter, resentful, and overwhelmed.",
      id: "Aku langsung mengiyakan secara refleks, lalu setelahnya menyesal, kesal, dan merasa kelelahan sendiri.",
      de: "Ich sage impulsiv 'Ja' und ärgere mich hinterher stundenlang über meine eigene Gutmütigkeit.",
      fr: "Je dis 'Oui' par réflexe, puis je ressens du ressentiment et de l'accablement après coup.",
      es: "Digo que 'Sí' por impulso y luego me paso horas sintiendo rencor y sobrecarga mental.",
    },
  },
  {
    id: 8,
    dimension: "overcommitment",
    text: {
      en: "When asked what restaurant I want or what movie to watch, I instinctively say 'Anything is fine!' because I don't know my own preference.",
      id: "Saat ditanya mau makan apa atau nonton film apa, aku spontan menjawab 'Terserah kamu aja!' karena terbiasa menekan seleraku.",
      de: "Wenn man mich nach Wünschen fragt, sage ich reflexartig 'Mir egal', weil ich eigene Vorlieben kaum noch spüre.",
      fr: "Quand on me demande mon avis, je réponds 'Peu importe' car j'ai perdu l'habitude d'écouter mes envies.",
      es: "Cuando me preguntan qué prefiero, digo 'Lo que tú quieras' porque desconozco mis propios gustos.",
    },
  },

  // Dimension 3: Guilt Sponge & Emotional Hyper-responsibility
  {
    id: 9,
    dimension: "guilt",
    text: {
      en: "If someone else is having a bad day or struggling, I feel an irrational guilt that it is somehow my fault.",
      id: "Jika seseorang di sekitarku sedang bad mood atau mengalami masalah, aku merasa bersalah seolah itu kesalahanku.",
      de: "Wenn jemand einen schlechten Tag hat, fühle ich mich irrational schuldig, als läge es an mir.",
      fr: "Si un proche passe une mauvaise journée, je me sens coupable comme si c'était de ma faute.",
      es: "Si alguien tiene un mal día, siento una culpa irracional de que sea por mi culpa.",
    },
  },
  {
    id: 10,
    dimension: "guilt",
    text: {
      en: "I feel like people only value me for what I can do for them, not for who I actually am as a human being.",
      id: "Aku sering merasa orang lain hanya menghargaiku karena apa yang bisa kuberikan, bukan karena siapa diriku.",
      de: "Ich habe oft das Gefühl, nur für meine Leistung und Gefälligkeiten gemocht zu werden.",
      fr: "J'ai l'impression de n'être aimé(e) que pour les services que je rends, pas pour qui je suis.",
      es: "Siento que la gente solo me valora por lo que hago por ellos, no por quién soy realmente.",
    },
  },
  {
    id: 11,
    dimension: "guilt",
    text: {
      en: "Setting a boundary or saying 'I can't make it' leaves me with a lingering hangover of guilt for days.",
      id: "Menolak ajakan atau memasang batasan membuatku didera rasa bersalah yang menghantui berhari-hari.",
      de: "Eine Grenze zu setzen hinterlässt bei mir tagelang quälende Schuldgefühle.",
      fr: "Poser une limite ou décliner une sortie me plonge dans une culpabilité tenace pendant des jours.",
      es: "Marcar un límite me deja una resaca de culpa que me atormenta durante días.",
    },
  },
  {
    id: 12,
    dimension: "guilt",
    text: {
      en: "I suppress my genuine emotions (anger, sadness, burnout) behind a smiling, accommodating mask.",
      id: "Aku menyembunyikan emosi jujurku (marah, lelah, kecewa) di balik senyum ramah dan sikap penurut.",
      de: "Ich unterdrücke echte Gefühle wie Wut oder Erschöpfung hinter einer immer freundlichen Maske.",
      fr: "Je dissimule ma colère ou mon épuisement derrière un masque perpétuellement souriant et serviable.",
      es: "Oculto mi enfado o agotamiento tras una máscara siempre sonriente y complaciente.",
    },
  },
];

export interface PeoplePleaserResult {
  totalScore: number;
  maxScore: number;
  percentage: number;
  fawnScore: number;
  overcommitmentScore: number;
  guiltScore: number;
  level: FawnLevel;
  title: Record<PeoplePleaserLang, string>;
  headline: Record<PeoplePleaserLang, string>;
  description: Record<PeoplePleaserLang, string>;
  boundaryScript: Record<PeoplePleaserLang, string>;
  actionRituals: Record<PeoplePleaserLang, string[]>;
}

export const FAWN_PROFILES: Record<FawnLevel, any> = {
  sovereign: {
    level: "sovereign",
    title: {
      en: "Sovereign Boundary Setter (Healthy Assertiveness)",
      id: "Pribadi Asertif & Berdaulat (Batas Diri Sehat)",
      de: "Souveräner Grenzen-Setzer (Gesunde Selbstbehauptung)",
      fr: "Maître de ses Limites (Assertivité Saine)",
      es: "Límites Soberanos (Asertividad Saludable)",
    },
    headline: {
      en: "You have a solid emotional immune system. You can give generously while protecting your own energy.",
      id: "Kamu memiliki sistem imun emosional yang kokoh. Kamu bisa berbuat baik tanpa mengorbankan dirimu sendiri.",
      de: "Sie besitzen ein stabiles emotionales Immunsystem und können Grenzen ohne Schuldgefühle wahren.",
      fr: "Vous possédez une excellente immunité émotionnelle et savez dire non avec calme et fermeté.",
      es: "Tienes una sólida autoestima y sabes decir 'no' sin culpa ni necesidad de justificarte.",
    },
    description: {
      en: "You understand that saying 'No' to others is often a necessary 'Yes' to your mental health. You don't take on unnecessary emotional responsibility for others' bad moods. Your kindness stems from genuine choice rather than fear of rejection.",
      id: "Kamu paham bahwa mengatakan 'Tidak' pada hal yang membebani adalah bentuk cinta pada diri sendiri. Kamu tidak merasa bertanggung jawab atas suasana hati orang lain. Kebaikanmu lahir dari ketulusan, bukan ketakutan akan penolakan.",
      de: "Sie wissen, dass ein 'Nein' zu anderen oft ein 'Ja' zu Ihrer eigenen Gesundheit ist. Ihre Güte entspringt freier Wahl, nicht Angst vor Ablehnung.",
      fr: "Vous savez poser vos limites sans culpabilité. Votre gentillesse est un choix conscient et non une stratégie de survie.",
      es: "Comprendes que poner límites es un acto de amor propio. Tu generosidad nace de la libertad, no del miedo al rechazo.",
    },
    boundaryScript: {
      en: "Thank you for thinking of me! I won't be able to take this on right now, but I appreciate you asking.",
      id: "Terima kasih sudah memikirkanku! Saat ini aku belum bisa bantu/ikut ya, tapi aku sangat menghargai tawaranmu.",
      de: "Danke, dass du an mich gedacht hast! Ich kann das aktuell nicht übernehmen, aber danke für dein Vertrauen.",
      fr: "Merci d'avoir pensé à moi ! Je ne pourrai pas m'en charger cette fois, mais j'apprécie ta confiance.",
      es: "¡Gracias por pensar en mí! En este momento no puedo comprometerme, pero te agradezco mucho la propuesta.",
    },
  },
  mild: {
    level: "mild",
    title: {
      en: "Empathetic Peacemaker (Mild People-Pleasing)",
      id: "Penjaga Damai Empatik (Kecenderungan People-Pleaser Ringan)",
      de: "Empathischer Friedensstifter (Leichte Anpassungstendenz)",
      fr: "Conciliateur Empathique (Tendance Modérée à Plaire)",
      es: "Pacificador Empático (Complacencia Leve)",
    },
    headline: {
      en: "You value social harmony and occasionally swallow your needs to avoid minor friction.",
      id: "Kamu sangat menghargai keharmonisan sosial dan terkadang mengabaikan kebutuhanmu demi kedamaian.",
      de: "Sie schätzen Harmonie und schlucken gelegentlich eigene Bedürfnisse hinunter, um Reibung zu vermeiden.",
      fr: "Vous privilégiez l'harmonie et réprimez parfois vos besoins pour éviter les désaccords.",
      es: "Valoras la armonía y a veces cedes más de la cuenta para no generar discusiones.",
    },
    description: {
      en: "While you generally know your boundaries, certain relationships (authority figures, romantic partners, close family) trigger a hesitation to speak up. You sometimes feel a subtle wave of guilt after declining invitations.",
      id: "Secara umum kamu mengenali batasanmu, tetapi pada figur tertentu (atasan, pasangan, atau keluarga), kamu masih sering ragu menolak. Kamu kadang merasa tidak enak hati setelah menolak ajakan orang lain.",
      de: "In engen Beziehungen oder gegenüber Autoritäten fällt Ihnen die Abgrenzung noch schwer. Es bleibt oft ein leises Schuldgefühl zurück.",
      fr: "Face à certaines figures d'autorité ou proches, poser une limite vous demande encore un grand effort émotionnel.",
      es: "En ciertas relaciones cercanas te cuesta marcar el límite y te queda una leve sensación de culpa.",
    },
    boundaryScript: {
      en: "I'd love to support you, but my schedule is currently at capacity. Let's touch base next month.",
      id: "Aku ingin sekali bantu, tapi jadwalku sedang sangat penuh saat ini. Nanti kita kabari lagi lain waktu ya.",
      de: "Ich würde gerne helfen, aber meine Kapazitäten sind gerade voll. Lass uns nächsten Monat sprechen.",
      fr: "J'aimerais beaucoup t'aider, mais mon planning est complet. Faisons le point le mois prochain.",
      es: "Me encantaría colaborar, pero mi agenda está al límite ahora mismo. Hablamos el mes que viene.",
    },
  },
  fawn: {
    level: "fawn",
    title: {
      en: "Chronic Fawn Response (High People-Pleaser)",
      id: "Fawn Response Kronis (Tingkat People-Pleaser Tinggi)",
      de: "Chronisches Fawn-Verhalten (Starkes People-Pleasing)",
      fr: "Syndrome du Fawning Chronique (Besoin Impérieux de Plaire)",
      es: "Respuesta de Complacencia Crónica (Alto People-Pleaser)",
    },
    headline: {
      en: "Your nervous system learned that keeping others happy is the only way to stay safe and valued.",
      id: "Sistem sarafmu terbiasa meyakini bahwa menyenangkan orang lain adalah satu-satunya cara agar aman dan diterima.",
      de: "Ihr Nervensystem hat gelernt, dass Harmonie um jeden Preis der einzige Schutz vor Ablehnung ist.",
      fr: "Votre système nerveux a associé le fait de faire plaisir à une condition essentielle de sécurité.",
      es: "Tu sistema nervioso aprendió que complacer a los demás es la única forma de evitar el rechazo.",
    },
    description: {
      en: "You live in a state of anticipatory appeasement. You say 'Yes' before your brain even processes your own schedule, leading to exhaustion, cognitive overload, and silent resentment. You feel terrified that saying 'No' will lead to conflict, abandonment, or anger.",
      id: "Kamu hidup dalam kewaspadaan berlebih untuk menyenangkan orang lain. Kamu mengiyakan ajakan bahkan sebelum sempat berpikir, hingga akhirnya kelelahan dan memendam rasa kesal. Kamu sangat takut bahwa penolakan akan memicu kemarahan atau pengabaian.",
      de: "Sie sagen reflexartig 'Ja', bevor Sie nachdenken, und enden in tiefer Erschöpfung und heimlichem Groll. Ein 'Nein' löst echte Panik aus.",
      fr: "Vous dites 'Oui' impulsivement, ce qui génère épuisement et rancœur silencieuse. Poser un refus vous terrorise.",
      es: "Dices 'Sí' por inercia, causándote agotamiento y rencor oculto. La idea de negar una petición te aterra.",
    },
    boundaryScript: {
      en: "I cannot commit to this. I need to protect my rest right now, and I appreciate your understanding.",
      id: "Maaf ya, kali ini aku tidak bisa ikut/bantu. Aku sedang butuh waktu istirahat penuh, terima kasih sudah mengerti.",
      de: "Ich kann das leider nicht zusagen. Ich muss aktuell auf meine Erholung achten und danke dir für dein Verständnis.",
      fr: "Je ne peux pas m'engager sur cela. J'ai besoin de préserver mon repos et je te remercie de ta compréhension.",
      es: "No puedo asumir esto. Necesito priorizar mi descanso y te agradezco mucho la comprensión.",
    },
  },
  codependent: {
    level: "codependent",
    title: {
      en: "Severe Self-Erasure & Codependency",
      id: "Peleburan Diri & Kodependensi Akut (Self-Erasure)",
      de: "Akute Selbstaufgabe & Kodependenz",
      fr: "Effacement de Soi & Dépendance Affective Sévère",
      es: "Autoanulación y Codependencia Severa",
    },
    headline: {
      en: "You have completely dissolved your own needs and identity to maintain relational peace.",
      id: "Kamu telah mengubur kebutuhan dan jati dirimu sendiri demi menjaga kedamaian orang lain.",
      de: "Sie haben Ihre eigenen Bedürfnisse und Ihre Identität fast völlig für andere aufgegeben.",
      fr: "Vous avez dissous vos désirs personnels et votre identité pour maintenir le calme relationnel.",
      es: "Has anulado tus propias necesidades e identidad para mantener la aprobación externa.",
    },
    description: {
      en: "Your sense of self is entirely contingent on others being pleased with you. You take total blame for failures that are not yours, endure disrespectful treatment without retaliation, and suffer from chronic somatic burnout. Reclaiming your sovereign voice is urgent and essential.",
      id: "Harga dirimu sepenuhnya bergantung pada persetujuan orang lain. Kamu menyalahkan dirimu atas masalah yang bukan salahmu, menoleransi perlakuan buruk demi tidak ditinggalkan, dan menderita burnout fisik. Membangun kembali batasan dirimu adalah hal yang sangat mendesak.",
      de: "Ihr Selbstwert hängt vollständig von der Zustimmung anderer ab. Sie ertragen emotionale Übergriffe und leiden unter chronischem Burnout.",
      fr: "Votre estime personnelle dépend entièrement de l'approbation d'autrui. Vous acceptez l'inacceptable par terreur du vide.",
      es: "Tu autoestima depende al 100% de la aprobación ajena. Asumes culpas ajenas y toleras tratos injustos por miedo a la soledad.",
    },
    boundaryScript: {
      en: "No, that does not work for me. I am no longer available for this responsibility.",
      id: "Tidak, aku tidak bisa melakukannya. Aku tidak lagi bersedia memegang tanggung jawab ini.",
      de: "Nein, das geht für mich nicht. Ich stehe für diese Aufgabe nicht mehr zur Verfügung.",
      fr: "Non, cela ne me convient pas. Je ne prends plus cette responsabilité en charge.",
      es: "No, eso no funciona para mí. Ya no estoy disponible para asumir esa responsabilidad.",
    },
  },
};

export function calculatePeoplePleaserScore(
  answers: Record<number, number>
): PeoplePleaserResult {
  let totalScore = 0;
  let fawnScore = 0;
  let overcommitmentScore = 0;
  let guiltScore = 0;

  PEOPLE_PLEASER_QUESTIONS.forEach((q) => {
    const val = answers[q.id] ?? 0;
    totalScore += val;
    if (q.dimension === "appeasement") fawnScore += val;
    if (q.dimension === "overcommitment") overcommitmentScore += val;
    if (q.dimension === "guilt") guiltScore += val;
  });

  const maxScore = PEOPLE_PLEASER_QUESTIONS.length * 3; // 36
  const percentage = Math.round((totalScore / maxScore) * 100);

  let level: FawnLevel = "sovereign";
  if (totalScore >= 27) {
    level = "codependent";
  } else if (totalScore >= 18) {
    level = "fawn";
  } else if (totalScore >= 9) {
    level = "mild";
  } else {
    level = "sovereign";
  }

  const profile = FAWN_PROFILES[level];

  return {
    totalScore,
    maxScore,
    percentage,
    fawnScore,
    overcommitmentScore,
    guiltScore,
    level,
    title: profile.title,
    headline: profile.headline,
    description: profile.description,
    boundaryScript: profile.boundaryScript,
    actionRituals: {
      en: [
        "Practice the '24-Hour Buffer Rule': never say Yes immediately to non-emergencies; respond with 'Let me check my calendar and get back to you tomorrow.'",
        "Notice somatic contractions in your throat or stomach when people ask for favors—that is your body saying No.",
        "Daily reflection journaling: 'What did I agree to today that I secretly wished I hadn't?'",
      ],
      id: [
        "Terapkan aturan 'Jeda 24 Jam': jangan pernah mengiyakan permintaan non-darurat secara spontan; katakan 'Aku cek jadwalku dulu ya, besok kukabari.'",
        "Perhatikan sensasi fisik di tenggorokan atau perut saat diminta bantuan—itu adalah sinyal tubuhmu yang sebenarnya ingin menolak.",
        "Jurnaling refleksi harian: 'Hal apa yang ku-iyakan hari ini padahal sebenarnya hatiku keberatan?'",
      ],
      de: [
        "Nutzen Sie die 24-Stunden-Bedenkzeit: Sagen Sie nie sofort Ja, sondern 'Ich prüfe meinen Kalender und melde mich morgen.'",
        "Achten Sie auf Engegefühle im Magen bei Bitten – das ist das Nein Ihres Körpers.",
        "Reflektieren Sie im Tagebuch: 'Wozu habe ich heute Ja gesagt, obwohl ich Nein meinte?'",
      ],
      fr: [
        "Adoptez la règle du délai de 24h : répondez 'Je vérifie mon emploi du temps et je te redis demain.'",
        "Écoutez la boule au ventre face aux sollicitations : c'est le refus de votre corps.",
        "Notez chaque soir : 'À quoi ai-je dit oui aujourd'hui à contrecœur ?'",
      ],
      es: [
        "Aplica la regla de las 24 horas: 'Déjame revisar mi agenda y te confirmo mañana.'",
        "Siente la tensión en tu garganta o estómago cuando te piden algo: es tu cuerpo diciendo No.",
        "Reflexiona en tu diario: '¿A qué dije que sí hoy cuando realmente deseaba decir que no?'",
      ],
    },
  };
}
