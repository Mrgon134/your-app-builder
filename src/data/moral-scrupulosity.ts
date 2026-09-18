export type MoralScrupulosityCardLang = "en" | "id" | "de" | "fr" | "es";

export interface MoralScrupulosityQuestion {
  id: number;
  subscale:
    | "moral_purity_hypervigilance"
    | "guilt_magnification_confession"
    | "ethical_perfectionism_paralysis";
  text: Record<MoralScrupulosityCardLang, string>;
}

export interface MoralScrupulosityResultLevel {
  level:
    | "subclinical_ethical_clarity"
    | "mild_moral_sensitivity"
    | "moderate_scrupulous_strain"
    | "severe_moral_ocd_obsession"
    | "acute_scrupulosity_paralysis";
  scoreRange: [number, number];
  title: Record<MoralScrupulosityCardLang, string>;
  badge: Record<MoralScrupulosityCardLang, string>;
  summary: Record<MoralScrupulosityCardLang, string>;
  psychology: Record<MoralScrupulosityCardLang, string>;
  actionProtocol: Record<MoralScrupulosityCardLang, string[]>;
}

export const MORAL_SCRUPULOSITY_QUESTIONS: MoralScrupulosityQuestion[] = [
  // 1. Moral Purity Hypervigilance
  {
    id: 1,
    subscale: "moral_purity_hypervigilance",
    text: {
      en: "I obsessively analyze my thoughts to determine whether I am secretly a bad, selfish, or deceitful person deep down.",
      id: "Aku secara obsesif membedah pikiran sendiri untuk mencari tahu apakah aku diam-diam orang jahat, egois, atau munafik.",
      de: "Ich analysiere zwanghaft meine Gedanken, um herauszufinden, ob ich im tiefsten Inneren böse, egoistisch oder betrügerisch bin.",
      fr: "J'analyse obsessionnellement mes pensées pour déterminer si je suis secrètement une mauvaise personne, égoïste ou trompeuse.",
      es: "Analizo obsesivamente mis pensamientos para determinar si en el fondo soy en secreto una persona mala, egoísta o falsa.",
    },
  },
  // 2. Guilt Magnification & Confession
  {
    id: 2,
    subscale: "guilt_magnification_confession",
    text: {
      en: "If I make a minor comment that could be slightly misinterpreted, I feel an unbearable urge to over-apologize or confess it repeatedly.",
      id: "Jika aku melontarkan ucapan sepele yang berpotensi disalahpahami, muncul dorongan tak tertahankan untuk minta maaf berulang kali.",
      de: "Wenn ich eine beiläufige Bemerkung mache, die missverstanden werden könnte, spüre ich den unbändigen Drang, mich mehrfach zu entschuldigen.",
      fr: "Si je fais un commentaire anodin qui pourrait être mal interprété, je ressens un besoin irrépressible de m'excuser ou de confesser mon erreur.",
      es: "Si hago un comentario menor que podría malinterpretarse, siento una necesidad insoportable de disculparme o confesarme repetidamente.",
    },
  },
  // 3. Ethical Perfectionism Paralysis
  {
    id: 3,
    subscale: "ethical_perfectionism_paralysis",
    text: {
      en: "Everyday decisions (what to buy, what to eat, what to discard) paralyze me because I dread making an ethically imperfect choice.",
      id: "Keputusan sehari-hari (membeli apa, makan apa, membuang apa) membuatku lumpuh karena takut membuat pilihan yang tidak sempurna secara moral.",
      de: "Alltägliche Entscheidungen (was kaufen, essen oder wegwerfen) lähmen mich, aus Angst, eine moralisch unvollkommene Wahl zu treffen.",
      fr: "Les décisions du quotidien me paralysent parce que je crains de faire un choix éthiquement imparfait.",
      es: "Las decisiones cotidianas me paralizan por temor a tomar una decisión éticamente imperfecta.",
    },
  },
  // 4. Moral Purity Hypervigilance
  {
    id: 4,
    subscale: "moral_purity_hypervigilance",
    text: {
      en: "When an involuntary unkind or taboo thought pops into my head, I treat it as proof of my moral corruption rather than random brain noise.",
      id: "Saat pikiran buruk yang tak disengaja muncul tiba-tiba di kepala, aku menganggapnya bukti kebobrokan moral, bukan sekadar noise otak biasa.",
      de: "Wenn ein unfreundlicher oder tabuisierter Gedanke auftaucht, werte ich ihn als Beweis für seelische Verdorbenheit statt als Gehirnrauschen.",
      fr: "Quand une pensée méchante ou taboue surgit involontairement, je la traite comme une preuve de ma corruption morale plutôt qu'un simple bruit cérébral.",
      es: "Cuando surge un pensamiento desagradable o tabú en mi mente, lo trato como prueba de mi maldad en vez de ruido cerebral aleatorio.",
    },
  },
  // 5. Guilt Magnification & Confession
  {
    id: 5,
    subscale: "guilt_magnification_confession",
    text: {
      en: "I mentally rewind and replay conversations from hours or days ago to verify that I was 100% truthful, fair, and morally blameless.",
      id: "Aku memutar ulang percakapan berjam-jam atau berhari-hari lalu untuk memastikan apakah aku 100% jujur, adil, dan tanpa cela moral.",
      de: "Ich spule Gespräche im Geist zurück, um akribisch zu überprüfen, ob ich zu 100 % ehrlich, fair und moralisch tadellos war.",
      fr: "Je rejoue mentalement des conversations passées pour vérifier que j'ai été irréprochable, honnête et juste à 100 %.",
      es: "Rebobino y reproduzco mentalmente conversaciones pasadas para verificar que fui 100% sincero, justo y sin tacha moral.",
    },
  },
  // 6. Ethical Perfectionism Paralysis
  {
    id: 6,
    subscale: "ethical_perfectionism_paralysis",
    text: {
      en: "I feel intense bodily guilt over small luxuries or rest, believing I should constantly be sacrificing my comfort to relieve suffering in the world.",
      id: "Aku merasa bersalah secara fisik saat menikmati kemewahan kecil atau istirahat, merasa harus selalu berkorban demi orang yang menderita.",
      de: "Ich empfinde körperliche Schuldgefühle bei kleinen Freuden oder Ruhe, weil ich glaube, ich müsste mich für das Leid der Welt aufopfern.",
      fr: "Je ressens une vive culpabilité physique lors d'un plaisir simple ou d'un repos, croyant que je devrais me sacrifier pour soulager le monde.",
      es: "Siento una intensa culpa física por pequeños lujos o descansar, creyendo que debería sacrificarme por el sufrimiento ajeno.",
    },
  },
  // 7. Moral Purity Hypervigilance
  {
    id: 7,
    subscale: "moral_purity_hypervigilance",
    text: {
      en: "I suffer from persistent 'impostor morality'—dreading that people who praise my integrity will eventually find out who I 'really' am.",
      id: "Aku menderita rasa 'kemunafikan palsu'—takut orang yang memujiku suatu saat akan sadar betapa buruknya diriku yang sebenarnya.",
      de: "Ich leide unter moralischer Hochstapler-Angst: Ich fürchte, wer meine Integrität lobt, wird eines Tages mein 'wahres' Wesen entlarven.",
      fr: "Je souffre du syndrome de l'imposteur moral, redoutant que ceux qui me croient bon découvrent un jour ma prétendue noirceur.",
      es: "Sufro de 'impostura moral', temiendo que quienes elogian mi integridad descubran algún día cómo soy 'en realidad'.",
    },
  },
  // 8. Guilt Magnification & Confession
  {
    id: 8,
    subscale: "guilt_magnification_confession",
    text: {
      en: "I frequently ask close friends or family for reassurance ('Are you sure you aren't mad at me? Did I do something wrong?').",
      id: "Aku sering menuntut kepastian dari orang terdekat ('Kamu beneran nggak marah kan sama aku? Aku ada salah ya?').",
      de: "Ich bitte Nahestehende häufig um Rückversicherung ('Bist du sicher nicht böse auf mich? Habe ich etwas falsch gemacht?').",
      fr: "Je demande fréquemment confirmation à mes proches ('Tu es sûr que tu ne m'en veux pas ? J'ai fait quelque chose de mal ?').",
      es: "Pido confirmación constante a mis seres queridos ('¿Seguro que no estás enfadado conmigo? ¿Hice algo mal?').",
    },
  },
  // 9. Ethical Perfectionism Paralysis
  {
    id: 9,
    subscale: "ethical_perfectionism_paralysis",
    text: {
      en: "I hold myself to impossible ethical and altruistic standards that I would never dream of demanding from any other human being.",
      id: "Aku menuntut standar etika dan pengorbanan yang mustahil pada diriku sendiri—standar yang tak pernah kutuntut dari orang lain.",
      de: "Ich verlange von mir unmenschliche moralische Maßstäbe, die ich niemals von einem anderen Menschen einfordern würde.",
      fr: "Je m'impose des exigences éthiques démesurées que je n'exigerais jamais d'aucun autre être humain.",
      es: "Me exijo estándares éticos imposibles que jamás soñaría con exigirle a ningún otro ser humano.",
    },
  },
  // 10. Moral Purity Hypervigilance
  {
    id: 10,
    subscale: "moral_purity_hypervigilance",
    text: {
      en: "I feel an overwhelming dread of causing accidental offense, harm, or spiritual contamination to others through my mere presence.",
      id: "Aku merasa takut berlebihan bahwa keberadaanku saja bisa secara tak sengaja menyakiti, menyinggung, atau merugikan orang lain.",
      de: "Ich habe panische Angst davor, durch meine bloße Anwesenheit versehentlich Anstoß, Schaden oder seelische Verletzung zu verursachen.",
      fr: "J'ai la terreur d'offenser, de blesser ou de contaminer autrui par inadvertance par ma simple présence.",
      es: "Siento un pánico abrumador a ofender, dañar o contaminar espiritualmente a otros por descuido con mi mera presencia.",
    },
  },
  // 11. Guilt Magnification & Confession
  {
    id: 11,
    subscale: "guilt_magnification_confession",
    text: {
      en: "I perform silent mental rituals (repeating phrases, seeking counter-thoughts, mental self-flagellation) to neutralize 'bad' thoughts.",
      id: "Aku melakukan ritual mental (mengulang kalimat penawar, menyangkal pikiran, menyalahkan diri sendiri) untuk menetralkan pikiran 'kotor'.",
      de: "Ich vollführe mentale Rituale (Phrasen wiederholen, Gegengedanken suchen, Selbstkasteiung), um 'schlechte' Gedanken zu neutralisieren.",
      fr: "J'effectue des rituels mentaux (répéter des phrases, chercher des contre-pensées) pour neutraliser les pensées jugées 'mauvaises'.",
      es: "Realizo rituales mentales silenciosos (repetir frases, buscar contra-pensamientos) para neutralizar pensamientos 'malos'.",
    },
  },
  // 12. Ethical Perfectionism Paralysis
  {
    id: 12,
    subscale: "ethical_perfectionism_paralysis",
    text: {
      en: "My fear of doing the wrong thing makes it agonizing to take clear stands, start creative projects, or express authentic anger.",
      id: "Ketakutanku melakukan kesalahan membuatku tersiksa untuk bersikap tegas, memulai karya kreatif, atau mengekspresikan kemarahan yang wajar.",
      de: "Meine Angst vor Fehltritten macht es quälend schwer, Stellung zu beziehen, Projekte zu starten oder berechtigten Zorn zu zeigen.",
      fr: "Ma peur de faire le mauvais choix m'empêche de prendre position, de créer ou d'exprimer une colère pourtant saine.",
      es: "Mi miedo a cometer una falta moral hace angustioso tomar posturas firmes, emprender proyectos o expresar ira genuina.",
    },
  },
];

export const MORAL_SCRUPULOSITY_RESULTS: MoralScrupulosityResultLevel[] = [
  {
    level: "subclinical_ethical_clarity",
    scoreRange: [0, 8],
    title: {
      en: "Balanced Ethical Clarity (Low Scrupulosity)",
      id: "Kejernihan Etika Seimbang (Skrupulositas Sangat Rendah)",
      de: "Ausgewogene Ethische Klarheit (Geringe Skrupulosität)",
      fr: "Clarté Éthique Équilibrée (Faible Scrupulosité)",
      es: "Claridad Ética Equilibrada (Baja Escrupulosidad)",
    },
    badge: {
      en: "Healthy Conscience",
      id: "Hati Nurani Sehat",
      de: "Gesundes Gewissen",
      fr: "Conscience Saine",
      es: "Conciencia Sana",
    },
    summary: {
      en: "You possess a compassionate moral compass without neurosis. You can differentiate between fleeting random thoughts and intentional character, allowing you to live ethically without self-flagellation.",
      id: "Kamu memiliki kompas moral yang bijak tanpa kecemasan neurotik. Kamu bisa membedakan pikiran liar sekilas dengan karakter niat aslimu.",
      de: "Sie besitzen einen mitfühlenden moralischen Kompass ohne Zwanghaftigkeit. Sie unterscheiden flüchtige Gedanken von echtem Charakter.",
      fr: "Vous possédez une boussole morale saine sans névrose. Vous distinguez les pensées parasites de vos intentions réelles.",
      es: "Posees una brújula moral compasiva sin neurosis. Distingues entre pensamientos fugaces y tu verdadero carácter moral.",
    },
    psychology: {
      en: "Dr. Ian Osborn notes that a healthy conscience acts as an intuitive guide, not an inquisitor. Your default mode network allows involuntary thoughts to evaporate without assigning them catastrophic moral weight.",
      id: "Hati nurani yang sehat berfungsi sebagai pemandu intuitif, bukan jaksa penuntut umum. Otakmu membiarkan pikiran acak lewat tanpa menghukum diri.",
      de: "Ein gesundes Gewissen ist ein Ratgeber, kein Inquisitor. Flüchtige Gedanken dürfen vergehen, ohne dass Sie sich selbst verurteilen.",
      fr: "Une conscience saine guide avec bienveillance sans agir en inquisiteur. Vous laissez filer les pensées sans vous condamner.",
      es: "Una conciencia sana actúa como guía, no como juez inquisidor. Dejas fluir los pensamientos sin atribuirles culpa.",
    },
    actionProtocol: {
      en: [
        "Continue practicing self-compassion when accidental mistakes happen.",
        "Maintain balanced ethical engagement without perfectionism.",
        "Use private journaling for reflective values alignment.",
      ],
      id: [
        "Lanjutkan welas asih pada diri sendiri saat berbuat salah.",
        "Jaga keseimbangan etika tanpa terjebak perfeksionisme.",
        "Gunakan jurnal untuk menjaga keselarasan nilai hidup.",
      ],
      de: [
        "Pflegen Sie weiterhin gesunde Selbstfürsorge bei Missgeschicken.",
        "Bewahren Sie ethische Maßstäbe ohne Zwanghaftigkeit.",
        "Nutzen Sie Reflexion für werteorientiertes Handeln.",
      ],
      fr: [
        "Continuez à pratiquer l'auto-compassion face aux erreurs involontaires.",
        "Gardez des repères éthiques sans tomber dans la rigidité.",
        "Utilisez le journal intime pour clarifier vos choix.",
      ],
      es: [
        "Mantén la autocompasión ante los errores accidentales.",
        "Conserva tus valores sin caer en exigencias desmedidas.",
        "Usa la reflexión privada para guiar tu conducta con serenidad.",
      ],
    },
  },

  {
    level: "mild_moral_sensitivity",
    scoreRange: [9, 16],
    title: {
      en: "Mild Conscientious Sensitivity",
      id: "Sensitivitas Moral Ringan",
      de: "Leichte Gewissenssensibilität",
      fr: "Sensibilité Morale Légère",
      es: "Sensibilidad Moral Leve",
    },
    badge: {
      en: "High Integrity Load",
      id: "Integritas Tinggi",
      de: "Hohe Integritätslast",
      fr: "Charge d'Intégrité",
      es: "Carga de Integridad",
    },
    summary: {
      en: "You have an unusually sensitive conscience. While this makes you deeply trustworthy, you occasionally expend unnecessary emotional energy second-guessing whether you spoke with 100% purity or offended someone.",
      id: "Kamu memiliki kepekaan hati nurani yang tinggi. Meskipun membuatmu sangat dapat dipercaya, kamu terkadang membuang energi meragukan apakah perkataanmu menyakiti orang lain.",
      de: "Sie haben ein sehr sensibles Gewissen. Sie grübeln gelegentlich unnötig darüber nach, ob Ihre Worte oder Absichten absolut makellos waren.",
      fr: "Vous avez une grande sensibilité morale. Vous perdez parfois de l'énergie à vous demander si vous avez offensé autrui par mégarde.",
      es: "Tienes una conciencia sumamente sensible. A veces gastas energía innecesaria cuestionando si fuiste totalmente impecable.",
    },
    psychology: {
      en: "In cognitive behavioral frameworks, this represents mild Thought-Action Fusion (TAF)—the subtle belief that having an unkind thought is almost as bad as committing an unkind deed.",
      id: "Dalam CBT, ini adalah Thought-Action Fusion (TAF) ringan—kepercayaan keliru bahwa sekadar memikirkan hal buruk hampir sama dosanya dengan melakukannya.",
      de: "Hier zeigt sich eine leichte Gedanken-Handlungs-Fusion: Die unbewusste Annahme, ein unschöner Gedanke sei fast so schlimm wie eine schlechte Tat.",
      fr: "Cela reflète une légère fusion pensée-action : la croyance qu'une mauvaise pensée équivaut presque à un acte répréhensible.",
      es: "Indica una leve fusión pensamiento-acción: creer que tener un mal pensamiento equivale casi a cometer una mala acción.",
    },
    actionProtocol: {
      en: [
        "Differentiate thoughts from character: 'A thought is an electrical impulse, not an ethical contract.'",
        "Resist the urge to seek immediate reassurance when you feel slight social guilt.",
        "Voice uncertain ethical worries into Nuju's private encrypted journal to let them discharge safely.",
      ],
      id: [
        "Bedakan pikiran dengan karakter: 'Pikiran adalah impuls biologis, bukan kontrak moral.'",
        "Tahan dorongan untuk langsung minta maaf jika merasa sedikit cemas secara sosial.",
        "Curahkan keraguan moral ke jurnal suara Nuju untuk menguras kecemasan tanpa memperkeruh suasana.",
      ],
      de: [
        "Unterscheiden Sie Gedanken von Handlungen: Ein Gedanke ist kein ethisches Urteil.",
        "Widerstehen Sie dem Drang, sofort um Rückversicherung zu bitten.",
        "Sprechen Sie moralische Zweifel in das private Nuju Sprachjournal, um sie zu entkräften.",
      ],
      fr: [
        "Distinguez les pensées du caractère : une pensée n'est pas un contrat moral.",
        "Résistez au besoin immédiat d'être rassuré par vos proches.",
        "Exprimez vos doutes moraux dans Nuju pour calmer votre système nerveux.",
      ],
      es: [
        "Distingue pensamientos de hechos: un pensamiento no es un veredicto ético.",
        "Resiste el impulso de buscar reaseguro inmediato con los demás.",
        "Descarga tus dudas morales en el diario de voz encriptado Nuju.",
      ],
    },
  },

  {
    level: "moderate_scrupulous_strain",
    scoreRange: [17, 24],
    title: {
      en: "Moderate Moral Scrupulosity",
      id: "Ketegangan Skrupulositas Sedang",
      de: "Moderate Skrupulöse Zwangstendenz",
      fr: "Scrupulosité Morale Modérée",
      es: "Escrupulosidad Moral Moderada",
    },
    badge: {
      en: "Hyper-Moral Exhaustion",
      id: "Kelelahan Moral Hiperaktif",
      de: "Hyper-Moralische Erschöpfung",
      fr: "Épuisement Hyper-Moral",
      es: "Agotamiento Hiper-Moral",
    },
    summary: {
      en: "Your conscience has become an aggressive internal auditor. You regularly review past conversations, over-apologize, and worry that you are a secret fraud. Everyday decisions feel weighed down by ethical dread.",
      id: "Hati nuranimu telah berubah menjadi auditor internal yang kejam. Kamu kerap memutar ulang percakapan masa lalu, minta maaf berlebihan, dan cemas dicap munafik.",
      de: "Ihr Gewissen fungiert als erbarmungsloser Prüfer. Sie überprüfen Gespräche, entschuldigen sich übermäßig und fürchten, als Heuchler entlarvt zu werden.",
      fr: "Votre conscience agit comme un auditeur impitoyable. Vous rejouez les discussions, vous vous excusez sans cesse et redoutez d'être un imposteur.",
      es: "Tu conciencia actúa como un auditor implacable. Repasas conversaciones pasadas, te disculpas en exceso y temes ser un impostor moral.",
    },
    psychology: {
      en: "Dr. Jonathan Grayson points out that scrupulosity is OCD wearing the robes of morality. The core fear is not wrongdoing itself, but the intolerance of ethical uncertainty: 'Can I be 100% sure I was pure?'",
      id: "Dr. Jonathan Grayson menekankan bahwa skrupulositas adalah OCD yang berkedok moralitas. Akar ketakutannya adalah ketidaktoleranan terhadap ketidakpastian: 'Apakah aku 100% suci?'",
      de: "Dr. Jonathan Grayson erklärt: Skrupulosität ist Zwangsstörung im Gewand von Moral. Der Kern ist die Unfähigkeit, moralische Unsicherheit zu ertragen.",
      fr: "La scrupulosité est un TOC sous couvert d'éthique. La terreur provient de l'incapacité à tolérer le doute sur sa pureté d'intention.",
      es: "La escrupulosidad es TOC con ropajes de moralidad. La angustia radica en la intolerancia a la incertidumbre ética.",
    },
    actionProtocol: {
      en: [
        "Implement the 'One Apology Rule': If you apologize once, forbid yourself from repeating it.",
        "Embrace 'Ethical Uncertainty': Practice saying to yourself: 'Maybe I made a mistake, maybe I didn't. I will tolerate not knowing.'",
        "Stop Confessing Intrusive Thoughts: Sharing every bizarre thought with your partner fuels the OCD cycle.",
      ],
      id: [
        "Terapkan 'Aturan Satu Kali Maaf': Jika sudah minta maaf sekali, larang dirimu mengulanginya lagi.",
        "Terima Ketidakpastian Moral: Katakan pada diri sendiri: 'Mungkin aku salah, mungkin tidak. Aku memilih mentoleransi ketidaktahuan ini.'",
        "Hentikan Mengakui Pikiran Liar: Menceritakan setiap pikiran aneh ke pasangan justru memperparah siklus OCD.",
      ],
      de: [
        "Setzen Sie die 'Eine-Entschuldigung-Regel' durch: Einmal entschuldigen genügt.",
        "Lernen Sie moralische Ambiguität auszuhalten: 'Vielleicht war es unvollkommen. Ich halte dieses Nichtwissen aus.'",
        "Hören Sie auf, flüchtige Gedanken zu beichten.",
      ],
      fr: [
        "Appliquez la règle de l'excuse unique : une seule excuse, jamais de répétition.",
        "Tolérez l'incertitude : acceptez de ne pas avoir la certitude absolue d'être parfait.",
        "Cessez de confesser chaque pensée intrusive à vos proches.",
      ],
      es: [
        "Aplica la regla de una sola disculpa: no la repitas por impulso de alivio.",
        "Tolera la incertidumbre ética: 'Tal vez me equivoqué, tal vez no; puedo vivir con la duda.'",
        "Deja de confesar cada pensamiento intrusivo a los demás.",
      ],
    },
  },

  {
    level: "severe_moral_ocd_obsession",
    scoreRange: [25, 31],
    title: {
      en: "Severe Scrupulosity & Pure OCD",
      id: "Skrupulositas Berat & Pure OCD",
      de: "Schwere Skrupulosität & Pure-O Zwang",
      fr: "Scrupulosité Sévère & TOC Pur",
      es: "Escrupulosidad Severa & TOC Puro",
    },
    badge: {
      en: "Clinical Scrupulosity",
      id: "Skrupulositas Klinis",
      de: "Klinische Skrupulosität",
      fr: "Scrupulosité Clinique",
      es: "Escrupulosidad Clínica",
    },
    summary: {
      en: "You are trapped in an agonizing cognitive inquisition. You view random intrusive thoughts as definitive evidence of moral depravity. Silent rituals, constant mental checking, and reassurance-seeking consume hours of your day.",
      id: "Kamu terperangkap dalam pengadilan kognitif yang menyiksa. Pikiran liar dianggap bukti mutlak bahwa kamu orang terkutuk atau jahat. Ritual mental dan meminta penegasan menguras energimu berjam-jam.",
      de: "Sie sind in einer quälenden Gedanken-Inquisition gefangen. Zufällige Gedanken gelten als Beweis moralischer Verkommenheit. Mentale Rituale rauben Ihnen täglich Stunden.",
      fr: "Vous êtes pris au piège d'un tribunal intérieur impitoyable. Les pensées intrusives sont vécues comme des preuves de perversité. Les rituels mentaux vous épuisent.",
      es: "Estás atrapado en una inquisición mental agotadora. Consideras los pensamientos intrusivos como pruebas de depravación moral. Los rituales mentales te consumen horas.",
    },
    psychology: {
      en: "Dr. Ian Osborn's clinical research shows that scrupulosity hyperactivates the caudate nucleus and anterior cingulate cortex (the brain's 'error detection' hub), firing constant false alarm bells of guilt even when no infraction exists.",
      id: "Riset Dr. Ian Osborn menunjukkan skrupulositas membuat anterior cingulate cortex (pusat pendeteksi kesalahan otak) aktif berlebihan, membunyikan alarm rasa bersalah palsu.",
      de: "Die Hirnforschung belegt: Bei Skrupulosität feuert das Fehlererkennungszentrum des Gehirns permanent Fehlalarme von Schuld ab, obwohl kein Vergehen vorliegt.",
      fr: "Les recherches montrent que le cortex cingulaire antérieur s'emballe, envoyant des alertes de culpabilité erronées en permanence.",
      es: "La investigación clínica demuestra que el centro de detección de errores del cerebro emite falsas alarmas constantes de culpa sin transgresión real.",
    },
    actionProtocol: {
      en: [
        "ERP (Exposure and Response Prevention): Deliberately sit with the thought: 'Maybe I am a bad person, and I will continue my day anyway.' Do not neutralize it.",
        "Ban Reassurance Seeking: Cold-turkey stop asking loved ones 'Are you mad at me?' Reassurance is the heroin of OCD.",
        "Voice Therapy Safe Harbor in Nuju: Speak the horrific intrusive thoughts into Nuju's zero-knowledge encrypted vault. Hearing them out loud strips away their demonic power.",
      ],
      id: [
        "ERP (Exposure and Response Prevention): Duduklah bersama pikiran: 'Mungkin aku orang jahat, tapi aku tetap menjalani hariku.' Jangan menetralkannya.",
        "Hentikan Meminta Penegasan: Berhenti total bertanya 'Kamu marah kan sama aku?'. Reassurance adalah candu bagi OCD.",
        "Ruang Katarsis Suara Nuju: Ucapkan pikiran tabu yang paling menakutkan ke dalam brankas suara terenkripsi Nuju. Mengeluarkannya lewat suara melucuti teror palsunya.",
      ],
      de: [
        "ERP (Exposition mit Reaktionsverhinderung): Halten Sie den Gedanken aus: 'Vielleicht bin ich unvollkommen. Ich mache trotzdem weiter.'",
        "Stoppen Sie Rückversicherungsfragen strikt.",
        "Sprechen Sie beunruhigende Gedanken in den verschlüsselten Nuju-Tresor, um ihnen die Macht zu nehmen.",
      ],
      fr: [
        "Exposition avec prévention de la réponse (ERP) : tolérez l'idée d'être imparfait sans neutralisation.",
        "Bannissez la quête de réassurance auprès de vos proches.",
        "Confiez vos pensées les plus effrayantes au journal vocal Nuju pour désamorcer leur charge.",
      ],
      es: [
        "EPR (Exposición y Prevención de Respuesta): Tolera el pensamiento sin rituales ni neutralización.",
        "Suprime radicalmente la búsqueda de confirmación externa.",
        "Expresa tus temores en el santuario de voz encriptado Nuju para restarles poder opresivo.",
      ],
    },
  },

  {
    level: "acute_scrupulosity_paralysis",
    scoreRange: [32, 36],
    title: {
      en: "Acute Scrupulous Paralysis & Moral Terror",
      id: "Kelumpuhan Skrupulositas Akut & Teror Moral",
      de: "Akute Skrupulöse Paralyse & Moralischer Terror",
      fr: "Paralysie Scrupuleuse Aiguë & Terreur Morale",
      es: "Parálisis Escrupulosa Aguda & Terror Moral",
    },
    badge: {
      en: "Severe Moral Exhaustion",
      id: "Teror Moral Ekstrem",
      de: "Extremer Moralterror",
      fr: "Terreur Morale Aiguë",
      es: "Terror Moral Agudo",
    },
    summary: {
      en: "Your conscience has turned completely toxic and suicidal. You feel spiritually contaminated, terrified of harming anyone by merely existing, and paralyzed from making basic decisions. This is not genuine virtue; it is acute obsessive-compulsive illness.",
      id: "Hati nuranimu telah menjadi racun yang melumpuhkan hidupmu. Kamu merasa najis secara moral, takut menyakiti orang hanya karena bernapas, dan lumpuh mengambil keputusan kecil. Ini bukan tanda orang saleh; ini adalah gangguan neurobiologis akut.",
      de: "Ihr Gewissen ist zu einer zerstörerischen Tyrannei geworden. Sie fühlen sich moralisch kontaminiert und sind gelähmt. Dies ist keine Tugend, sondern eine akute Zwangserkrankung.",
      fr: "Votre conscience est devenue un bourreau intolérable. Vous vous sentez souillé et terrorisé à l'idée d'exister. Il ne s'agit pas de sainteté, mais d'une souffrance obsessionnelle aiguë.",
      es: "Tu conciencia se ha transformado en un verdugo destructivo. Sientes contaminación moral y terror de existir. No es virtud; es una manifestación aguda de TOC.",
    },
    psychology: {
      en: "At this tier, moral scrupulosity causes profound vegetative and emotional collapse. The sufferer is convinced they belong in exile. Specialized clinical ERP intervention and psychiatric support are strongly recommended to rewire the brain's hyperactive guilt circuitry.",
      id: "Pada tingkat ini, skrupulositas menyebabkan depresi berat dan kelumpuhan fungsi. Penderita merasa pantas dibuang. Intervensi ERP spesialis dan konsultasi medis sangat dianjurkan.",
      de: "Auf dieser Stufe führt die Zwangsstörung zu schwerer Erschöpfung. Spezialisierte ERP-Therapie und ärztliche Unterstützung sind dringend empfohlen.",
      fr: "À ce niveau, la souffrance paralyse le quotidien. Une prise en charge spécialisée en thérapie ERP et un avis médical sont indispensables.",
      es: "En este grado, el sufrimiento paraliza la vida. Se recomienda enfáticamente intervención clínica especializada en EPR y apoyo médico.",
    },
    actionProtocol: {
      en: [
        "Consult an OCD/ERP specialist: Standard talk therapy or pastoral counseling often worsens scrupulosity by offering toxic reassurance.",
        "Treat Guilt as Brain Inflammation: Remind yourself 20 times a day: 'This feeling of guilt is not the voice of God or conscience; it is an OCD neurochemical glitch.'",
        "Emergency Catharsis in Nuju: Speak into Nuju's zero-knowledge encrypted audio sanctuary. Cry, rant, and speak your exhaustion without judgment.",
      ],
      id: [
        "Konsultasikan ke Spesialis OCD/ERP: Konseling biasa atau nasihat rohani umum sering kali memperparah skrupulositas karena memberi reassurance palsu.",
        "Anggap Rasa Bersalah sebagai Glitch Otak: Ingatkan dirimu: 'Rasa bersalah ini bukan suara tuhan atau hati nurani; ini adalah korsleting neurokimiawi amigdala.'",
        "Katarsis Darurat di Nuju: Bicaralah ke dalam ruang audio terenkripsi Nuju. Menangislah dan lepaskan rasa lelahmu tanpa ada yang menghakimi.",
      ],
      de: [
        "Suchen Sie einen Zwangsspezialisten (ERP) auf.",
        "Betrachten Sie Schuld als Gehirn-Fehlfunktion: Es ist ein biochemischer Glitch, kein moralischer Makel.",
        "Nutzen Sie Nuju für unzensierte, private Sprach-Entlastung.",
      ],
      fr: [
        "Consultez un thérapeute spécialisé en TOC (thérapie ERP).",
        "Considérez la culpabilité comme un dysfonctionnement cérébral passager.",
        "Déchargez votre détresse dans le journal vocal sécurisé de Nuju.",
      ],
      es: [
        "Consulta con un especialista en TOC (Terapia EPR).",
        "Trata la culpa como un fallo neuroquímico del cerebro, no como un dictamen moral.",
        "Descarga tu angustia en el santuario de audio encriptado de Nuju.",
      ],
    },
  },
];

export const MORAL_SCRUPULOSITY_OPTIONS = [
  {
    value: 0,
    label: {
      en: "Never / Rarely (0 pts)",
      id: "Tidak Pernah / Jarang (0 poin)",
      de: "Nie / Selten (0 Pkt.)",
      fr: "Jamais / Rarement (0 pt)",
      es: "Nunca / Raras veces (0 pts)",
    },
  },
  {
    value: 1,
    label: {
      en: "Sometimes / Mildly (1 pt)",
      id: "Kadang-kadang / Ringan (1 poin)",
      de: "Manchmal / Leicht (1 Pkt.)",
      fr: "Parfois / Légèrement (1 pt)",
      es: "A veces / Levemente (1 pt)",
    },
  },
  {
    value: 2,
    label: {
      en: "Often / Moderately (2 pts)",
      id: "Sering / Cukup Mengganggu (2 poin)",
      de: "Oft / Mäßig störend (2 Pkt.)",
      fr: "Souvent / Modérément (2 pts)",
      es: "A menudo / Moderadamente (2 pts)",
    },
  },
  {
    value: 3,
    label: {
      en: "Almost Constantly / Severely (3 pts)",
      id: "Hampir Selalu / Sangat Menyiksa (3 poin)",
      de: "Fast ständig / Quälend (3 Pkt.)",
      fr: "Presque constamment / Sévère (3 pts)",
      es: "Casi constantemente / Severo (3 pts)",
    },
  },
];

export const MORAL_SCRUPULOSITY_SUBSCALE_INFO = {
  moral_purity_hypervigilance: {
    name: {
      en: "Moral Purity & Impostor Dread",
      id: "Kemurnian Moral & Takut Menjadi Orang Jahat",
      de: "Moralische Reinheit & Hochstapler-Angst",
      fr: "Pureté Morale & Peur d'Être Mauvais",
      es: "Pureza Moral & Temor a la Maldad",
    },
    description: {
      en: "Hyper-monitoring of intrusive thoughts and the persistent terror of being secretly evil or corrupt deep down.",
      id: "Pengawasan berlebihan terhadap pikiran liar dan ketakutan mendalam bahwa diri sendiri adalah orang jahat.",
      de: "Zwanghafte Überwachung unwillkürlicher Gedanken und Angst vor seelischer Verdorbenheit.",
      fr: "Surveillance obsessionnelle des pensées et terreur d'être fondamentalement corrompu.",
      es: "Monitoreo hipervigilante de pensamientos intrusivos y terror a ser una mala persona.",
    },
  },
  guilt_magnification_confession: {
    name: {
      en: "Guilt Magnification & Confession Urges",
      id: "Pembesaran Rasa Bersalah & Dorongan Mengaku",
      de: "Schuldvergrößerung & Beichtdrang",
      fr: "Amplification de la Culpabilité & Aveux",
      es: "Magnificación de Culpa & Necesidad de Confesar",
    },
    description: {
      en: "Compulsive need to over-apologize, rewind conversations, and demand reassurance from loved ones.",
      id: "Dorongan tak tertahankan untuk minta maaf berulang kali dan memutar ulang percakapan masa lalu.",
      de: "Drang zu ständigen Entschuldigungen, Gesprächsrückspulen und Suche nach Rückversicherung.",
      fr: "Besoin compulsif de s'excuser, de rejouer les scènes et d'exiger d'être rassuré.",
      es: "Necesidad compulsiva de pedir disculpas, repasar diálogos y demandar reaseguro constante.",
    },
  },
  ethical_perfectionism_paralysis: {
    name: {
      en: "Ethical Perfectionism & Paralysis",
      id: "Perfeksionisme Etis & Kelumpuhan Keputusan",
      de: "Ethischer Perfektionismus & Lähmung",
      fr: "Perfectionnisme Éthique & Paralysie",
      es: "Perfeccionismo Ético & Parálisis",
    },
    description: {
      en: "Inability to make everyday decisions or enjoy rest due to impossible altruistic and moral demands.",
      id: "Ketidakmampuan mengambil keputusan sehari-hari atau beristirahat karena tuntutan etis yang mustahil.",
      de: "Unfähigkeit zu alltäglichen Entscheidungen aus Angst vor ethischer Unvollkommenheit.",
      fr: "Incapacité à trancher ou à se reposer sous le poids d'exigences éthiques démesurées.",
      es: "Incapacidad para decidir o descansar debido a exigencias morales inalcanzables.",
    },
  },
};

export function getMoralScrupulosityResult(totalScore: number): MoralScrupulosityResultLevel {
  const clamped = Math.max(0, Math.min(36, totalScore));
  return (
    MORAL_SCRUPULOSITY_RESULTS.find(
      (r) => clamped >= r.scoreRange[0] && clamped <= r.scoreRange[1]
    ) || MORAL_SCRUPULOSITY_RESULTS[0]
  );
}

export function calculateMoralScrupulositySubscales(answers: Record<number, number>): {
  moral_purity_hypervigilance: number;
  guilt_magnification_confession: number;
  ethical_perfectionism_paralysis: number;
} {
  let p = 0;
  let g = 0;
  let e = 0;

  MORAL_SCRUPULOSITY_QUESTIONS.forEach((q) => {
    const score = answers[q.id] ?? 0;
    if (q.subscale === "moral_purity_hypervigilance") p += score;
    if (q.subscale === "guilt_magnification_confession") g += score;
    if (q.subscale === "ethical_perfectionism_paralysis") e += score;
  });

  return {
    moral_purity_hypervigilance: p,
    guilt_magnification_confession: g,
    ethical_perfectionism_paralysis: e,
  };
}
