export type FilialGuiltLang = "en" | "id" | "de" | "fr" | "es";

export interface FilialGuiltQuestion {
  id: number;
  category: "chronic_debt_guilt" | "boundary_collapse" | "individuation_paralysis";
  prompt: Record<FilialGuiltLang, string>;
  subtext?: Record<FilialGuiltLang, string>;
}

export interface FilialGuiltResultLevel {
  level: "differentiated" | "mild_duty" | "significant_burden" | "severe_enmeshment";
  scoreRange: [number, number];
  badge: Record<FilialGuiltLang, string>;
  title: Record<FilialGuiltLang, string>;
  summary: Record<FilialGuiltLang, string>;
  psychology: Record<FilialGuiltLang, string>;
  actionProtocol: Record<FilialGuiltLang, string[]>;
  colorScheme: {
    badge: string;
    border: string;
    text: string;
    bg: string;
  };
}

export const FILIAL_GUILT_QUESTIONS: FilialGuiltQuestion[] = [
  {
    id: 1,
    category: "chronic_debt_guilt",
    prompt: {
      en: "Do you carry a persistent feeling that no matter how much you achieve or send home, you can never repay your parents' sacrifices?",
      id: "Apakah Anda memikul rasa bersalah tak berujung bahwa sebesar apa pun pencapaian atau uang yang Anda berikan, Anda tidak akan pernah bisa melunasi 'utang budi' pengorbanan orang tua?",
      de: "Tragen Sie das ständige Gefühl in sich, die Opfer Ihrer Eltern niemals zurückzahlen zu können, egal wie viel Sie leisten?",
      fr: "Portez-vous le sentiment persistant que peu importe vos réussites ou votre soutien, vous ne rembourserez jamais les sacrifices de vos parents ?",
      es: "¿Sientes una culpa constante de que, por mucho que logres o aportes a casa, nunca podrás pagar la deuda de los sacrificios de tus padres?",
    },
    subtext: {
      en: "The chronic emotional debt contract.",
      id: "Kontrak utang emosional bawah sadar.",
      de: "Das unbewusste generationale Schuldgefühl.",
      fr: "La dette émotionnelle transgénérationnelle.",
      es: "La deuda emocional invisible con la familia.",
    },
  },
  {
    id: 2,
    category: "chronic_debt_guilt",
    prompt: {
      en: "Do you feel an intense wave of guilt when buying something nice for yourself, taking a vacation, or resting on weekends?",
      id: "Apakah muncul rasa bersalah yang menusuk saat Anda membeli barang untuk diri sendiri, pergi berlibur, atau sekadar bermalas-malasan di akhir pekan?",
      de: "Fühlen Sie heftige Schuldgefühle, wenn Sie sich selbst etwas Schönes gönnen, Urlaub machen oder sich ausruhen?",
      fr: "Ressentez-vous une vive culpabilité lorsque vous vous faites un plaisir coûteux, partez en vacances ou vous reposez le week-end ?",
      es: "¿Sientes una intensa culpa al comprarte algo bonito, irte de vacaciones o simplemente descansar los fines de semana?",
    },
  },
  {
    id: 3,
    category: "chronic_debt_guilt",
    prompt: {
      en: "Do you feel solely responsible for your parents' emotional mood, financial security, and happiness in their old age?",
      id: "Apakah Anda merasa memikul tanggung jawab tunggal atas kebahagiaan batin, suasana hati, dan kestabilan finansial orang tua di masa tua mereka?",
      de: "Fühlen Sie sich allein verantwortlich für das seelische Wohlbefinden und die finanzielle Absicherung Ihrer Eltern im Alter?",
      fr: "Vous sentez-vous l'unique responsable du bonheur, de la stabilité financière et de la paix émotionnelle de vos parents vieillissants ?",
      es: "¿Te sientes el único responsable de la felicidad, el estado de ánimo y la seguridad económica de tus padres en su vejez?",
    },
  },
  {
    id: 4,
    category: "chronic_debt_guilt",
    prompt: {
      en: "When your parents sigh, sound lonely, or bring up their medical hardships, do you feel an immediate compulsion to drop everything and rescue them?",
      id: "Saat orang tua menghela napas, terdengar kesepian, atau menceritakan sakit tubuh mereka di telepon, apakah Anda langsung merasa wajib meninggalkan segalanya untuk menolong?",
      de: "Wenn Ihre Eltern seufzen oder Einsamkeit andeuten, verspüren Sie den Zwang, sofort alles stehen und liegen zu lassen, um zu helfen?",
      fr: "Quand vos parents soupirent ou évoquent leur solitude et leurs ennuis de santé, ressentez-vous l'urgence immédiate de tout lâcher pour les secourir ?",
      es: "¿Cuando tus padres suspiran, se quejan de soledad o mencionan sus achaques, sientes el impulso urgente de dejarlo todo para acudir?",
    },
  },
  {
    id: 5,
    category: "boundary_collapse",
    prompt: {
      en: "Does saying 'no' to family demands feel emotionally impossible, inducing panic or fears of being an ungrateful, disloyal child?",
      id: "Apakah mengucapkan kata 'tidak' atau menolak permintaan keluarga terasa mustahil, memicu ketakutan luar biasa dianggap anak durhaka atau tak tahu berterima kasih?",
      de: "Fühlt sich ein 'Nein' gegenüber Familienanforderungen emotional unmöglich an, aus Angst als undankbares Kind abgestempelt zu werden?",
      fr: "Dire 'non' aux demandes familiales vous semble-t-il impossible, provoquant la peur d'être perçu(e) comme un enfant ingrat ou indigne ?",
      es: "¿Decir 'no' a las exigencias familiares te resulta casi imposible por el pánico a ser visto como un hijo ingrato o egoísta?",
    },
  },
  {
    id: 6,
    category: "boundary_collapse",
    prompt: {
      en: "Do you conceal major parts of your personal life (finances, relationships, beliefs, mental health) to avoid family lectures, guilt trips, or drama?",
      id: "Apakah Anda menyembunyikan sebagian besar realitas hidup pribadi (keuangan, pasangan, keyakinan, kesehatan mental) demi menghindari ceramah, guilt-tripping, atau konflik keluarga?",
      de: "Verheimlichen Sie wichtige Teile Ihres Privatlebens (Finanzen, Partnerschaft, Überzeugungen), um familiäre Vorträge oder Schuldzuweisungen zu vermeiden?",
      fr: "Cachez-vous des pans entiers de votre vie intime (finances, couple, thérapie) pour éviter les leçons de morale et les conflits familiaux ?",
      es: "¿Ocultas partes esenciales de tu vida privada (finanzas, pareja, terapia) para evitar sermones, reproches o dramas familiares?",
    },
  },
  {
    id: 7,
    category: "boundary_collapse",
    prompt: {
      en: "Do your parents feel entitled to give unsolicited advice, criticize your weight/lifestyle, or inspect your personal affairs without knocking or asking?",
      id: "Apakah orang tua Anda merasa berhak mengkritik fisik/berat badan, mencampuri keputusan pribadi, atau memeriksa urusan Anda tanpa batas izin yang jelas?",
      de: "Fühlen sich Ihre Eltern berechtigt, ungebetene Ratschläge zu erteilen, Ihr Aussehen/Leben zu kritisieren oder Ihre Privatsphäre zu missachten?",
      fr: "Vos parents s'autorisent-ils des remarques blessantes sur votre mode de vie, votre corps ou vos choix sans respecter votre espace ?",
      es: "¿Tus padres se creen con derecho a criticar tu peso, tu estilo de vida o husmear en tus asuntos privados sin respetar tus límites?",
    },
  },
  {
    id: 8,
    category: "boundary_collapse",
    prompt: {
      en: "Do you experience physical dread (stomach drop, racing pulse, clenched jaw) whenever your phone rings with a call from your parents or family group chat?",
      id: "Apakah tubuh Anda mengalami reaksi fisik tegang (perut mulas, jantung berdebar cepat, rahang kaku) setiap kali melihat panggilan telepon atau notifikasi grup keluarga?",
      de: "Reagiert Ihr Körper mit Magenkrämpfen oder Herzklopfen, sobald das Telefon klingelt und ein Elternteil anruft?",
      fr: "Ressentez-vous une angoisse physique (nœud au ventre, cœur qui s'accélère) dès que votre téléphone affiche un appel de vos parents ?",
      es: "¿Experimentas una reacción física de alarma (nudo en el estómago, taquicardia) cada vez que suena el teléfono con una llamada familiar?",
    },
  },
  {
    id: 9,
    category: "individuation_paralysis",
    prompt: {
      en: "Have you chosen your major, career path, or marital partner primarily to fulfill parental expectations or avoid breaking their heart?",
      id: "Pernahkah Anda memilih jurusan kuliah, pekerjaan, atau pasangan hidup terutama demi memenuhi ekspektasi orang tua atau takut membuat mereka patah hati?",
      de: "Haben Sie Ausbildung, Beruf oder Partnerschaft primär gewählt, um den Erwartungen Ihrer Eltern zu entsprechen oder ihr Herz nicht zu brechen?",
      fr: "Avez-vous orienté vos études, votre carrière ou vos choix amoureux principalement pour combler les attentes parentales et ne pas les décevoir ?",
      es: "¿Elegiste tus estudios, profesión o pareja principalmente para cumplir con las expectativas de tus padres y no romperles el corazón?",
    },
  },
  {
    id: 10,
    category: "individuation_paralysis",
    prompt: {
      en: "Do you struggle to know what YOU truly desire in life because your identity has always been shaped around being the dutiful, obedient pillar of the family?",
      id: "Apakah Anda kesulitan mengenali apa sebenarnya impian dan keinginan sejati Anda karena identitas Anda selama ini dibentuk hanya sebagai anak berbakti dan penurut?",
      de: "Fällt es Ihnen schwer zu wissen, was SIE selbst wollen, weil Ihre Identität immer auf Pflichterfüllung und Gehorsam ausgerichtet war?",
      fr: "Avez-vous du mal à savoir ce que vous désirez réellement car votre identité s'est bâtie sur le devoir d'être l'enfant modèle et serviable ?",
      es: "¿Te cuesta saber qué deseas realmente en la vida porque tu identidad siempre se construyó en torno a ser el hijo ejemplar y obediente?",
    },
  },
  {
    id: 11,
    category: "individuation_paralysis",
    prompt: {
      en: "When you succeed or enjoy something on your own, is there an internal voice whispering that you are selfish or abandoning your roots?",
      id: "Saat Anda meraih kesuksesan atau menikmati kebahagiaan mandiri, apakah ada suara batin yang berbisik bahwa Anda egois atau melupakan asal-usul keluarga?",
      de: "Wenn Sie unabhängig Erfolg haben, flüstert eine innere Stimme, dass Sie egoistisch seien und die Familie im Stich lassen?",
      fr: "Lorsque vous savourez une réussite personnelle, une petite voix intérieure vous reproche-t-elle d'être égoïste ou d'abandonner les vôtres ?",
      es: "¿Cuando disfrutas de un éxito propio, surge una voz interna acusándote de ser egoísta o de abandonar a tu familia?",
    },
  },
  {
    id: 12,
    category: "individuation_paralysis",
    prompt: {
      en: "Do you feel like an emotional extension of your parents' unfulfilled dreams rather than an autonomous adult with your own distinct destiny?",
      id: "Apakah Anda merasa seperti instrumen pelanjut mimpi-mimpi orang tua yang belum tercapai, bukan manusia dewasa yang berdaulat atas takdirnya sendiri?",
      de: "Fühlen Sie sich wie eine Verlängerung der unerfüllten Träume Ihrer Eltern statt wie ein eigenständiger Erwachsener mit eigenem Schicksal?",
      fr: "Avez-vous l'impression d'être le prolongement des rêves inachevés de vos parents plutôt qu'un adulte souverain de sa propre destinée ?",
      es: "¿Sientes que eres una extensión de los sueños frustrados de tus padres en lugar de un adulto autónomo dueño de su propio destino?",
    },
  },
];

export const FILIAL_GUILT_LEVELS: FilialGuiltResultLevel[] = [
  {
    level: "differentiated",
    scoreRange: [0, 8],
    badge: {
      en: "DIFFERENTIATED & COMPASSIONATE",
      id: "DIFERENSIASI SEHAT & MANDIRI",
      de: "DIFFERENZIERT & EIGENSTÄNDIG",
      fr: "DIFFÉRENCIATION SAINE",
      es: "DIFERENCIACIÓN SANA",
    },
    title: {
      en: "Healthy Autonomy with Loving Connectedness",
      id: "Otonomi Pribadi Sehat dengan Kasih Sayang Seimbang",
      de: "Gesunde Autonomie bei liebevoller Verbundenheit",
      fr: "Autonomie Saine et Attachement Bienveillant",
      es: "Autonomía Saludable con Afecto Equilibrado",
    },
    summary: {
      en: "You have developed a healthy Bowenian 'Differentiation of Self'. You can respect and love your family while preserving distinct boundaries, personal priorities, and freedom from chronic sacrificial guilt.",
      id: "Anda memiliki 'Differentiation of Self' yang matang. Anda mampu menghormati dan menyayangi keluarga tanpa harus mengorbankan identitas, batas pribadi, atau tersandera rasa bersalah abadi.",
      de: "Sie besitzen eine gesunde Ich-Differenzierung nach Bowen. Sie begegnen Ihrer Familie mit Zuneigung, ohne Ihre Grenzen und Werte aufzugeben.",
      fr: "Vous avez atteint une saine différenciation de soi. Vous respectez votre famille tout en préservant vos choix de vie sans culpabilité toxique.",
      es: "Posees una sólida diferenciación del self. Eres capaz de amar a tu familia manteniendo límites firmes sin someterte a una culpa destructiva.",
    },
    psychology: {
      en: "Internalized locus of control. You view parental happiness as their own psychological journey rather than a debt you were born to liquidate.",
      id: "Locus of control internal yang stabil. Anda memandang kebahagiaan orang tua sebagai tanggung jawab mereka sendiri, bukan beban utang yang wajib Anda lunasi.",
      de: "Stabiler interner Kontrollfokus. Elterliches Glück wird nicht als generationale Schuld verstanden.",
      fr: "Locus de contrôle interne équilibré. Le bonheur de vos parents est perçu comme leur chemin personnel et non une dette vitale.",
      es: "Locus de control interno firme. Consideras la felicidad de tus padres como su propia responsabilidad y no una hipoteca que naciste para saldar.",
    },
    actionProtocol: {
      en: [
        "Continue open, honest, non-reactive communication during family gatherings.",
        "Celebrate your personal accomplishments without feeling compelled to downplay them.",
        "Offer help out of genuine warmth, never out of fear or compulsive obligation.",
      ],
      id: [
        "Pertahankan komunikasi jujur dan tenang saat kumpul keluarga besar.",
        "Rayakan pencapaian pribadi tanpa perlu merasa tidak enak atau merendahkan diri.",
        "Berikan bantuan atas dasar ketulusan cinta, bukan ketakutan atau rasa terpaksa.",
      ],
      de: [
        "Pflegen Sie weiterhin eine ruhige, klare Kommunikation bei Familientreffen.",
        "Feiern Sie eigene Erfolge offen, ohne sich dafür rechtfertigen zu müssen.",
        "Helfen Sie aus ehrlicher Zuneigung, nicht aus angstgetriebenem Zwang.",
      ],
      fr: [
        "Maintenez une communication sincère et posée lors des réunions de famille.",
        "Célébrez vos réussites sans éprouver le besoin de vous excuser d'exister.",
        "Aidez vos proches par pur élan du cœur, jamais sous la contrainte morale.",
      ],
      es: [
        "Mantén una comunicación serena y firme en los encuentros familiares.",
        "Celebra tus metas cumplidas sin sentir vergüenza de brillar.",
        "Ayuda a tu familia desde el afecto sincero, nunca desde el miedo al castigo moral.",
      ],
    },
    colorScheme: {
      badge: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
      border: "border-emerald-500/40",
      text: "text-emerald-400",
      bg: "from-emerald-950/40 via-stone-900 to-stone-950",
    },
  },
  {
    level: "mild_duty",
    scoreRange: [9, 16],
    badge: {
      en: "MILD FILIAL SENSITIVITY",
      id: "SENSITIVITAS BAKTI RINGAN",
      de: "LEICHTES PFLICHTBEWUSSTSEIN",
      fr: "SENSIBILITÉ FILIALE MODÉRÉE",
      es: "SENSIBILIDAD FILIAL LEVE",
    },
    title: {
      en: "Cultural Piety Tendency with Periodic Guilt Spikes",
      id: "Kecenderungan Bakti Budaya dengan Percikan Rasa Bersalah",
      de: "Kulturelle Pflichtloyalität mit gelegentlichen Schuldgefühlen",
      fr: "Devoir Filial Culturel avec Pics de Culpabilité Passagers",
      es: "Lealtad Cultural con Episodios Ocasionales de Culpa",
    },
    summary: {
      en: "You maintain reasonable daily independence, but parental disappointment, guilt trips, or sighs still produce uncomfortable internal tremors. You sometimes say 'yes' to requests you secretly wish to decline.",
      id: "Anda memiliki kemandirian hidup sehari-hari, namun keluhan atau kekecewaan orang tua masih memicu rasa bersalah yang mengganggu. Terkadang Anda mengiyakan permintaan yang sebenarnya ingin Anda tolak.",
      de: "Im Alltag sind Sie unabhängig, aber Seufzer oder Vorwürfe der Eltern wecken ein schlechtes Gewissen. Gelegentlich geben Sie nach, um Konflikte zu meiden.",
      fr: "Vous êtes autonome au quotidien, mais les déceptions ou sous-entendus parentaux provoquent encore des remords. Il vous arrive de céder pour avoir la paix.",
      es: "Mantienes una vida independiente, pero las quejas o silencios de tus padres aún despiertan incomodidad. A veces cedes para no desatar discusiones.",
    },
    psychology: {
      en: "Partial boundary permeation: your emotional equilibrium remains somewhat entangled with the parental approval feedback loop.",
      id: "Permeabilitas batas diri parsial: ketenangan batin Anda masih bergantung pada sinyal persetujuan atau ketidaksetujuan orang tua.",
      de: "Partiell durchlässige Grenzen: Ihre seelische Balance schwankt noch mit dem elterlichen Wohlwollen.",
      fr: "Frontières relationnelles semi-perméables : votre sérénité dépend encore partiellement de l'approbation familiale.",
      es: "Límites parcialmente permeables: tu paz mental aún se ve alterada por la aprobación o desaprobación de tus progenitores.",
    },
    actionProtocol: {
      en: [
        "Practice a 24-hour response rule before agreeing to non-urgent family requests.",
        "Remind yourself: 'Disappointing my parents is uncomfortable, but it is not a moral failure.'",
        "Record difficult family interactions in Nuju voice journal to decompress and ground your boundaries.",
      ],
      id: [
        "Terapkan jeda 24 jam sebelum mengiyakan permintaan keluarga yang tidak darurat.",
        "Katakan pada diri: 'Mengecewakan orang tua itu tidak nyaman, tapi bukan berarti aku anak durhaka.'",
        "Gunakan jurnal suara Nuju untuk meluapkan uneg-uneg seusai berinteraksi dengan keluarga.",
      ],
      de: [
        "Nutzen Sie eine 24-Stunden-Bedenkzeit vor Zusagen bei familiären Anliegen.",
        "Erinnern Sie sich: 'Eltern zu enttäuschen ist unangenehm, aber keine moralische Sünde.'",
        "Nutzen Sie das Nuju-Sprachtagebuch, um familiäre Spannungen abzuladen.",
      ],
      fr: [
        "Appliquez un délai de réflexion de 24 heures avant d'accepter une demande familiale.",
        "Rappelez-vous : 'Décevoir mes parents est inconfortable, mais ce n'est pas une faute morale.'",
        "Déposez vos tensions après les appels familiaux dans le journal vocal Nuju.",
      ],
      es: [
        "Aplica la regla de las 24 horas antes de responder a peticiones familiares no urgentes.",
        "Repite como mantra: 'Decepcionar a mis padres es incómodo, pero no es un pecado ni una falta moral.'",
        "Desahoga las tensiones familiares en el diario de voz de Nuju para reafirmar tus límites.",
      ],
    },
    colorScheme: {
      badge: "bg-teal-500/20 text-teal-400 border-teal-500/30",
      border: "border-teal-500/40",
      text: "text-teal-400",
      bg: "from-teal-950/40 via-stone-900 to-stone-950",
    },
  },
  {
    level: "significant_burden",
    scoreRange: [17, 26],
    badge: {
      en: "ENMESHMENT & CHRONIC GUILT",
      id: "BEBAN ENMESHMENT & RASA BERSALAH TINGGI",
      de: "STARKE FAMILIÄRE VERSTRICKUNG",
      fr: "ENCHEVÊTREMENT & CULPABILITÉ ÉLEVÉE",
      es: "ENREDAMIENTO Y CULPA CRÓNICA",
    },
    title: {
      en: "Sacrificial Duty Trap & Suppressed Individuation",
      id: "Jebakan Pengorbanan Diri & Batasan Emosional Runtuh",
      de: "Aufopferungsfalle & Gehemmte Selbstwerdung",
      fr: "Piège du Sacrifice et Perte d'Individualité",
      es: "Trampa del Sacrificio y Pérdida de Identidad",
    },
    summary: {
      en: "You bear a heavy, chronic burden of filial guilt. You feel responsible for fixing your parents' unhappiness, financial struggles, or emotional holes at the expense of your own peace, finances, or romantic relationships.",
      id: "Anda memikul beban berat utang budi keluarga yang menahun. Anda merasa harus menjadi penyelamat masalah emosional, finansial, dan kesepian orang tua hingga mengorbankan kesehatan mental, keuangan, dan relasi asmara Anda sendiri.",
      de: "Sie tragen eine schwere Last generationaler Verpflichtung. Sie stellen das Wohlergehen Ihrer Eltern über Ihre eigene mentale Gesundheit und Partnerschaft.",
      fr: "Vous portez un fardeau écrasant de culpabilité filiale. Vous vous sacrifiez pour combler les manques affectifs ou matériels de vos parents au détriment de votre propre vie.",
      es: "Cargas con un peso abrumador de deber filial. Asumes el rescate emocional y económico de tus padres a expensas de tu salud mental, estabilidad y proyectos personales.",
    },
    psychology: {
      en: "Emotional parentification and enmeshment: the psychological boundary between where your parents end and where you begin is blurred, creating intense panic whenever individuation is attempted.",
      id: "Parentifikasi emosional dan enmeshment: batas psikologis antara orang tua dan Anda kabur. Setiap kali Anda mencoba hidup mandiri, otak membaca hal itu sebagai pengkhianatan berbahaya.",
      de: "Parentifizierung und Verstrickung: Die seelische Grenze zwischen Ihnen und den Eltern verschwimmt; Abgrenzung fühlt sich wie Verrat an.",
      fr: "Parentification et fusion familiale : la frontière de votre moi est floue ; toute affirmation d'indépendance est vécue comme une trahison.",
      es: "Parentificación y fusión emocional: los límites se han desdibujado tanto que cualquier intento de autonomía personal se vive internamente como una traición imperdonable.",
    },
    actionProtocol: {
      en: [
        "Recognize parentification: 'I was a child who needed parenting; I was never meant to be my parents' emotional spouse or savior.'",
        "Establish non-negotiable financial and physical boundaries (cap monthly transfers, set calling hours).",
        "Reframe guilt as a sign of boundary growth, not cruelty.",
      ],
      id: [
        "Kenali luka parentifikasi: 'Dulu aku seorang anak; aku tidak lahir untuk menjadi pasangan emosional atau penyelamat hidup orang tuaku.'",
        "Buat batasan tegas non-negosiasi: batasi plafon transfer bulanan, tentukan jam telepon tertentu.",
        "Maknai rasa bersalah sebagai bukti Anda sedang bertumbuh menegakkan batasan, bukan tanda Anda jahat.",
      ],
      de: [
        "Erkennen Sie Parentifizierung: 'Ich war das Kind; ich bin nicht der emotionale Partner meiner Eltern.'",
        "Setzen Sie klare finanzielle und zeitliche Grenzen für Zuwendungen und Anrufe.",
        "Verstehen Sie das Schuldgefühl als Wachstumszeichen gesunder Grenzen.",
      ],
      fr: [
        "Identifiez la parentification : 'J'étais l'enfant ; je n'ai pas à être le thérapeute ni le sauveur de mes parents.'",
        "Fixez des limites financières et temporelles fermes et non négociables.",
        "Interprétez la culpabilité comme le symptôme normal d'une émancipation nécessaire.",
      ],
      es: [
        "Reconoce la parentificación: 'Yo era el hijo; no nací para ser el salvador ni el terapeuta de mis padres.'",
        "Establece límites claros: define un tope para ayudas económicas y horarios para llamadas.",
        "Interpreta la culpa no como maldad, sino como el precio de recuperar tu propia vida.",
      ],
    },
    colorScheme: {
      badge: "bg-amber-500/20 text-amber-400 border-amber-500/30",
      border: "border-amber-500/40",
      text: "text-amber-400",
      bg: "from-amber-950/40 via-stone-900 to-stone-950",
    },
  },
  {
    level: "severe_enmeshment",
    scoreRange: [27, 36],
    badge: {
      en: "SEVERE ENMESHMENT TRAUMA",
      id: "KELUMPUHAN OTONOMI & ENMESHMENT AKUT",
      de: "SCHWERE TRAUMATISCHE VERSTRICKUNG",
      fr: "TRAUMATISME D'ENCHEVÊTREMENT SÉVÈRE",
      es: "TRAUMA DE FUSIÓN FAMILIAR SEVERO",
    },
    title: {
      en: "Total Boundary Collapse & Autonomous Self Paralysis",
      id: "Kolaps Batasan Total & Kelumpuhan Kedaulatan Hidup",
      de: "Vollständige Selbstaufgabe & Geiselnahme der Autonomie",
      fr: "Effondrement Total des Limites et Paralysie de l'Être",
      es: "Colapso Total de Límites y Parálisis de la Autonomía",
    },
    summary: {
      en: "You are experiencing profound familial enmeshment and existential guilt. Your sense of self is almost entirely subjugated by family control, financial extortion, or emotional blackmail. You live in terror of their disapproval while sacrificing your career, mental sanity, and personal future.",
      id: "Anda mengalami kelumpuhan otonomi diri yang parah akibat trauma enmeshment dan guilt-tripping keluarga. Kedaulatan hidup Anda tersandera sepenuhnya oleh kontrol orang tua, tuntutan finansial tanpa henti, atau pemerasan emosional hingga Anda kehilangan arah masa depan sendiri.",
      de: "Ihre persönliche Existenz ist fast vollständig von elterlicher Kontrolle und emotionaler Erpressung besetzt. Eigene Lebenswünsche sind aus Angst vor Vergeltung ausgelöscht.",
      fr: "Votre identité est quasi totalement aliénée par le chantage affectif et le contrôle familial. Vous vivez dans la terreur du rejet tout en sacrifiant votre santé mentale et votre avenir.",
      es: "Tu sentido de identidad ha sido absorbido por el chantaje emocional y el control familiar. Vives con terror al rechazo mientras sacrificas tu salud mental, tu futuro y tu propia libertad.",
    },
    psychology: {
      en: "Severe developmental trauma and enmeshment: the family system functions as a closed narcissistic circuit where individuation is punished as treason, resulting in chronic somatic terror and dissociation.",
      id: "Trauma perkembangan dan enmeshment akut: sistem keluarga berfungsi layaknya sirkuit tertutup di mana setiap langkah kemandirian dihukum sebagai pembangkangan, memicu teror somatis dan depresi.",
      de: "Tiefes Entwicklungstrauma: Das Familiensystem bestraft Eigenständigkeit wie Hochverrat; der Körper reagiert mit chronischer Alarmbereitschaft.",
      fr: "Trauma d'attachement sévère : le système familial punit l'émancipation comme une trahison, provoquant angoisse somatique chronique et épuisement.",
      es: "Trauma de desarrollo profundo: la dinámica familiar castiga la individualidad como traición, generando pánico somático crónico y parálisis vital.",
    },
    actionProtocol: {
      en: [
        "Seek specialized psychotherapy focusing on Bowenian family systems, CPTSD, or internal family systems (IFS).",
        "Recognize financial or emotional abuse: support is love; extortion is control.",
        "Create emergency emotional containment: you have the fundamental human right to privacy, autonomy, and choosing your own life path.",
        "Practice 'Low-Contact' or structured contact protocols to stop immediate nervous system hemorrhage.",
      ],
      id: [
        "Cari bantuan psikolog berorientasi terapi sistem keluarga (Bowenian), CPTSD, atau Internal Family Systems (IFS).",
        "Kenali pemerasan finansial/emosional: bakti sejati didasari cinta, bukan pemerasan berbalut kewajiban agama/budaya.",
        "Bangun proteksi darurat: Anda memiliki hak asasi untuk memiliki privasi, kedaulatan diri, dan menentukan masa depan sendiri.",
        "Terapkan protokol 'Low-Contact' (komunikasi minimal terstruktur) untuk menghentikan luka batin harian.",
      ],
      de: [
        "Suchen Sie spezialisierte Psychotherapie (Systemische Familientherapie oder CPTSD/IFS).",
        "Erkennen Sie emotionale Ausbeutung: Echte Fürsorge basiert auf Respekt, nicht auf Erpressung.",
        "Setzen Sie auf 'Low-Contact' (reduzierten, strukturierten Kontakt), um Ihr Nervensystem zu schützen.",
      ],
      fr: [
        "Entamez une thérapie systémique familiale ou spécialisée dans les traumatismes complexes (CPTSD/IFS).",
        "Distinguez amour et chantage : le respect ne repose jamais sur l'extorsion morale ou financière.",
        "Adoptez le protocole 'Low-Contact' (contacts rares et très cadrés) pour préserver votre intégrité.",
      ],
      es: [
        "Busca terapia especializada en sistemas familiares (Bowen), trauma complejo (CPTSD) o IFS.",
        "Distingue el amor del chantaje: el afecto apoya, la extorsión somete.",
        "Aplica el protocolo de 'Bajo Contacto' (Low-Contact) para frenar el desgaste inmediato de tu sistema nervioso.",
      ],
    },
    colorScheme: {
      badge: "bg-rose-500/20 text-rose-400 border-rose-500/30",
      border: "border-rose-500/40",
      text: "text-rose-400",
      bg: "from-rose-950/40 via-stone-900 to-stone-950",
    },
  },
];
