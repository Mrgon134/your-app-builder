export type PureOLang = "en" | "id" | "de" | "fr" | "es";

export interface PureOQuestion {
  id: number;
  category: "taboo_intrusions" | "mental_compulsions" | "thought_action_fusion";
  prompt: Record<PureOLang, string>;
  subtext?: Record<PureOLang, string>;
}

export interface PureOResultLevel {
  level: "transient" | "mild_sticky" | "moderate_pure_o" | "severe_ocd_distress";
  scoreRange: [number, number];
  badge: Record<PureOLang, string>;
  title: Record<PureOLang, string>;
  summary: Record<PureOLang, string>;
  neurobiology: Record<PureOLang, string>;
  actionProtocol: Record<PureOLang, string[]>;
  colorScheme: {
    badge: string;
    border: string;
    text: string;
    bg: string;
  };
}

export const PURE_O_QUESTIONS: PureOQuestion[] = [
  {
    id: 1,
    category: "taboo_intrusions",
    prompt: {
      en: "Do sudden, horrifying 'what if' thoughts or graphic mental images pop into your mind that represent the exact opposite of who you are?",
      id: "Apakah tiba-tiba muncul pikiran 'bagaimana jika' yang mengerikan atau kilasan visual menjijikkan yang bertolak belakang dengan moral Anda?",
      de: "Tauchen plötzlich schockierende 'Was wäre wenn'-Gedanken oder bildhafte Vorstellungen auf, die Ihren wahren Werten völlig widersprechen?",
      fr: "Des pensées soudaines et angoissantes du type 'et si...' ou des images mentales choquantes surgissent-elles contre votre volonté ?",
      es: "¿Surgen de repente pensamientos espantosos tipo '¿y si...?' o imágenes mentales gráficas que representan lo opuesto a tus valores?",
    },
    subtext: {
      en: "Egodystonic intrusions: thoughts that disgust you precisely because you would never act on them.",
      id: "Intrusi Egodistonik: pikiran yang membuat Anda muak justru karena Anda tidak akan pernah melakukannya.",
      de: "Egodystone Gedanken: Sie empfinden Abscheu, weil die Gedanken Ihren Werten widersprechen.",
      fr: "Pensées égodystoniques : elles vous révoltent précisément parce qu'elles vont contre votre nature.",
      es: "Intrusiones egodistónicas: te horrorizan precisamente porque jamás desearías llevarlas a cabo.",
    },
  },
  {
    id: 2,
    category: "taboo_intrusions",
    prompt: {
      en: "Do you experience intrusive fears about harming loved ones, losing control, or doing something socially unforgivable?",
      id: "Apakah Anda mengalami ketakutan intrusif bahwa Anda bisa tiba-tiba melukai orang tersayang, hilang kendali, atau berbuat hal tabu?",
      de: "Haben Sie aufdringliche Ängste, geliebten Menschen zu schaden, die Kontrolle zu verlieren oder etwas Verwerfliches zu tun?",
      fr: "Ressentez-vous la peur obsessionnelle de blesser un être cher, de perdre le contrôle ou de commettre l'irréparable ?",
      es: "¿Tienes miedos intrusivos de poder dañar a seres queridos, perder el control o hacer algo moralmente imperdonable?",
    },
  },
  {
    id: 3,
    category: "taboo_intrusions",
    prompt: {
      en: "When an unwanted thought strikes, does an immediate surge of adrenaline, cold sweat, or nausea hit your body?",
      id: "Saat pikiran yang tidak diinginkan itu muncul, apakah tubuh Anda langsung tersengat lonjakan adrenalin, keringat dingin, atau mual?",
      de: "Löst ein unerwünschter Gedanke sofort eine Welle von Adrenalin, Herzklopfen, kaltem Schweiß oder Übelkeit aus?",
      fr: "Lorsqu'une pensée indésirable surgit, votre corps est-il immédiatement traversé par une décharge d'adrénaline et d'angoisse ?",
      es: "¿Cuando aparece un pensamiento no deseado, tu cuerpo reacciona de inmediato con taquicardia, sudor frío o náuseas?",
    },
  },
  {
    id: 4,
    category: "taboo_intrusions",
    prompt: {
      en: "Do you avoid certain everyday objects (knives, high balconies, crowds) or specific triggers out of fear that a dark thought might come true?",
      id: "Apakah Anda menghindari benda tertentu (pisau, balkon tinggi, keramaian) karena takut pikiran gelap Anda bisa menjadi kenyataan?",
      de: "Meiden Sie Alltagsgegenstände (Messer, Balkone, Menschenmengen) aus Angst, ein düsterer Gedanke könnte wahr werden?",
      fr: "Évitez-vous certains objets du quotidien (couteaux, balcons, lieux publics) de peur qu'une mauvaise pensée ne se réalise ?",
      es: "¿Evitas ciertos objetos (cuchillos, balcones altos, aglomeraciones) por temor a que un pensamiento oscuro pueda cumplirse?",
    },
  },
  {
    id: 5,
    category: "mental_compulsions",
    prompt: {
      en: "Do you spend hours replaying past memories in your head to check: 'Did I actually want that? Was I secretly turned on or violent?'",
      id: "Apakah Anda menghabiskan berjam-jam memutar ulang memori masa lalu untuk memeriksa: 'Apakah tadi aku sengaja? Apakah tadi aku menikmatinya?'",
      de: "Spulen Sie Erinnerungen stundenlang im Kopf ab, um zu prüfen: 'Habe ich das wirklich gewollt? War da eine böse Absicht?'",
      fr: "Passez-vous des heures à rejouer vos souvenirs pour vérifier : 'Était-ce intentionnel ? Ai-je ressenti une mauvaise pulsion ?' ?",
      es: "¿Pasas horas rebobinando recuerdos en tu mente para comprobar: '¿Realmente lo deseé? ¿Sentí alguna mala intención?'?",
    },
    subtext: {
      en: "Mental reviewing: an invisible internal compulsion.",
      id: "Mental reviewing: kompulsi batin tak kasat mata.",
      de: "Mentales Kontrollieren: eine unsichtbare Zwangshandlung.",
      fr: "Vérification mentale : une compulsion interne invisible.",
      es: "Comprobación mental: una compulsión interna invisible.",
    },
  },
  {
    id: 6,
    category: "mental_compulsions",
    prompt: {
      en: "Do you constantly argue with the intrusive thought inside your head, frantically repeating neutralizing mantras or positive phrases to cancel it out?",
      id: "Apakah Anda terus berdebat dengan pikiran intrusif di kepala, berulang kali melafalkan mantra penenang atau doa penangkal untuk menghapusnya?",
      de: "Diskutieren Sie innerlich endlos mit dem Gedanken und wiederholen beruhigende Sätze oder Gebete, um ihn ungeschehen zu machen?",
      fr: "Discutez-vous sans fin avec la pensée dans votre tête en répétant des phrases positives ou des prières pour l'annuler ?",
      es: "¿Discutes internamente con el pensamiento intrusivo repitiendo frases neutralizadoras o rezos para cancelarlo?",
    },
  },
  {
    id: 7,
    category: "mental_compulsions",
    prompt: {
      en: "Do you compulsively seek reassurance from friends, partners, or forums ('Am I a bad person? Does having this thought mean I'm dangerous?')?",
      id: "Apakah Anda sering mencari kepastian (reassurance) dari teman atau internet: 'Apakah aku orang jahat? Apakah pikiran ini tandanya aku berbahaya?'",
      de: "Suchen Sie zwanghaft Beruhigung bei Partnern, Freunden oder in Foren ('Bin ich ein schlechter Mensch? Bin ich gefährlich?')?",
      fr: "Cherchez-vous compulsivement à être rassuré(e) par vos proches ou sur internet ('Suis-je quelqu'un de mauvais ? Suis-je dangereux ?') ?",
      es: "¿Buscas compulsivamente que tu pareja, amigos o internet te tranquilicen ('¿Soy una mala persona? ¿Significa que soy peligroso?')?",
    },
  },
  {
    id: 8,
    category: "mental_compulsions",
    prompt: {
      en: "Do you perform subtle physical or breathing checks (e.g., holding breath, checking body temperature, looking away) to ensure you are safe?",
      id: "Apakah Anda melakukan pengecekan tubuh tersembunyi (menahan napas, memeriksa detak jantung, memalingkan muka) untuk memastikan Anda 'aman'?",
      de: "Führen Sie unauffällige körperliche Checks durch (Atmung anhalten, Puls prüfen, wegschauen), um sicherzugehen, dass alles gut ist?",
      fr: "Effectuez-vous de micro-contrôles corporels (retenir votre souffle, surveiller votre pouls) pour vous assurer que vous êtes sous contrôle ?",
      es: "¿Haces comprobaciones físicas discretas (contener la respiración, medir tu pulso, desviar la mirada) para comprobar que estás 'a salvo'?",
    },
  },
  {
    id: 9,
    category: "thought_action_fusion",
    prompt: {
      en: "Do you believe deep down that having a bad or disturbing thought is morally just as evil as physically carrying out the act?",
      id: "Apakah jauh di dalam lubuk hati Anda percaya bahwa sekadar memikirkan hal buruk sama berdosanya dengan benar-benar melakukannya?",
      de: "Glauben Sie im Grunde, dass ein verwerflicher Gedanke moralisch genauso schlimm ist wie die tatsächliche Tat (Thought-Action Fusion)?",
      fr: "Pensez-vous au fond que le simple fait d'avoir une mauvaise pensée est moralement aussi répréhensible que de passer à l'acte ?",
      es: "¿Crees en el fondo que tener un pensamiento perturbador es moralmente tan grave como cometer el acto en la realidad?",
    },
  },
  {
    id: 10,
    category: "thought_action_fusion",
    prompt: {
      en: "Do you worry that thinking about a catastrophe (car accident, illness, death of a relative) increases the likelihood of it actually happening?",
      id: "Apakah Anda takut bahwa membayangkan suatu musibah (kecelakaan, sakit parah, kematian kerabat) akan membuat musibah itu benar-benar terjadi?",
      de: "Befürchten Sie, dass das bloße Denken an ein Unglück (Unfall, Krankheit) die Wahrscheinlichkeit erhöht, dass es eintrifft?",
      fr: "Craignez-vous que le fait d'imaginer une catastrophe (accident, maladie d'un proche) augmente le risque qu'elle se produise ?",
      es: "¿Temes que pensar en una desgracia (accidente, enfermedad, muerte de un familiar) aumente las probabilidades de que suceda?",
    },
  },
  {
    id: 11,
    category: "thought_action_fusion",
    prompt: {
      en: "Do you live with persistent, gnawing guilt or toxic self-hatred for 'polluted' thoughts that you desperately wish you could delete forever?",
      id: "Apakah Anda hidup dengan rasa bersalah yang menggerogoti atau membenci diri sendiri karena pikiran-pikiran 'kotor' yang ingin Anda hapus?",
      de: "Leben Sie mit quälenden Schuldgefühlen oder Selbsthass wegen aufdringlicher Gedanken, die Sie am liebsten für immer auslöschen würden?",
      fr: "Vivez-vous avec une culpabilité lancinante ou de la haine de vous-même pour des pensées parasites que vous voudriez effacer ?",
      es: "¿Vives con una culpa constante o autodesprecio por pensamientos intrusivos que desearías borrar de tu mente para siempre?",
    },
  },
  {
    id: 12,
    category: "thought_action_fusion",
    prompt: {
      en: "Does the exhausting battle against your own mind consume more than an hour of your day, stealing your presence from real life?",
      id: "Apakah perang batin melawan pikiran sendiri ini menghabiskan lebih dari satu jam sehari dan merenggut kedamaian hidup nyata Anda?",
      de: "Kostet der zermürbende Kampf gegen die eigenen Gedanken täglich mehr als eine Stunde Zeit und raubt Ihnen die Lebensfreude?",
      fr: "La lutte épuisante contre vos propres pensées vous prend-elle plus d'une heure par jour en vous coupant du moment présent ?",
      es: "¿La batalla agotadora contra tus propios pensamientos te consume más de una hora al día y te aleja de vivir el presente?",
    },
  },
];

export const PURE_O_LEVELS: PureOResultLevel[] = [
  {
    level: "transient",
    scoreRange: [0, 8],
    badge: {
      en: "NORMAL TRANSIENT INTRUSIONS",
      id: "PIKIRAN LIAR NORMAL & TIDAK MELEKAT",
      de: "NORMALE FLÜCHTIGE GEDANKEN",
      fr: "PENSÉES PARASITES NORMALES",
      es: "INTRUSIONES PASAJERAS NORMALES",
    },
    title: {
      en: "Healthy Cognitive Defusion & Natural Brain Chatter",
      id: "Defusi Kognitif Alami & Lalu Lintas Pikiran Wajar",
      de: "Gesunde kognitive Defusion & Normales Hintergrundrauschen",
      fr: "Défusion Cognitive Saine et Bruit Mental Neutre",
      es: "Defusión Cognitiva Sana y Ruido Mental Normal",
    },
    summary: {
      en: "You occasionally experience weird, bizarre, or random intrusive thoughts—just like 95% of human beings. However, your brain naturally recognizes them as mental junk mail and lets them drift away without panic or compulsive mental checking.",
      id: "Anda sesekali mengalami kilasan pikiran aneh atau acak—persis seperti 95% manusia di bumi. Namun otak Anda mengenali hal itu sebagai sampah pikiran biasa dan membiarkannya lewat tanpa panik atau berdebat.",
      de: "Sie erleben gelegentlich bizarre Gedanken – wie 95% aller Menschen. Ihr Gehirn stuft sie jedoch als belanglosen Datenmüll ein und lässt sie ohne Zwangshandlungen weiterziehen.",
      fr: "Vous avez parfois des pensées étranges ou absurdes, comme 95% des êtres humains. Votre cerveau les traite comme du courrier indésirable sans déclencher d'angoisse.",
      es: "Experimentas pensamientos extraños o aleatorios, como el 95% de la humanidad. Tu cerebro los reconoce como ruido de fondo y los deja ir sin generar angustia ni compulsiones.",
    },
    neurobiology: {
      en: "Healthy anterior cingulate cortex (ACC) error-monitoring. Random synaptic firing in the cortex is correctly identified as noise and discarded without triggering sympathetic distress.",
      id: "Fungsi pemantau kesalahan pada anterior cingulate cortex (ACC) berjalan normal. Letupan sinaptik acak di korteks diidentifikasi sebagai derau tanpa memicu alarm panik.",
      de: "Intakte Fehlerüberwachung im anterioren cingulären Kortex (ACC). Zufällige neuronale Entladungen werden adäquat als harmlos bewertet.",
      fr: "Surveillance équilibrée dans le cortex cingulaire antérieur (CCA). Les signaux aléatoires sont filtrés sans activer le système d'alarme de l'amygdale.",
      es: "Monitoreo de errores funcional en el córtex cingulado anterior. Los disparos neuronales aleatorios se descartan sin activar la alarma somática.",
    },
    actionProtocol: {
      en: [
        "Acknowledge that having weird thoughts is universal human biology, not a reflection of character.",
        "Continue practicing mindful observation: thoughts are events in the mind, not commands or facts.",
        "Use Nuju daily journaling for emotional clarity and self-expression.",
      ],
      id: [
        "Pahami bahwa memiliki pikiran aneh adalah biologi manusia yang universal, bukan cerminan moralitas Anda.",
        "Lanjutkan pengamatan penuh kesadaran: pikiran hanyalah peristiwa mental, bukan perintah atau kenyataan.",
        "Gunakan jurnalisme harian di Nuju untuk mengekspresikan emosi dengan jernih.",
      ],
      de: [
        "Verinnerlichen Sie: Bizarre Gedanken sind ein biologisches Phänomen und kein Charakterfehler.",
        "Behalten Sie Ihre gelassene Haltung bei: Gedanken sind mentale Phänomene, keine Tatsachen.",
        "Nutzen Sie das Nuju-Journaling für tägliche emotionale Klarheit.",
      ],
      fr: [
        "Rappelez-vous que les pensées parasites sont universelles et ne définissent pas votre morale.",
        "Maintenez votre posture d'observateur serein : une pensée n'est ni un ordre ni une vérité.",
        "Utilisez le journal Nuju pour déposer vos réflexions en toute liberté.",
      ],
      es: [
        "Recuerda que tener pensamientos absurdos es normal y no define quién eres.",
        "Mantén tu enfoque de observación: los pensamientos son eventos mentales, no órdenes ni hechos.",
        "Utiliza el diario Nuju para clarificar tus emociones de forma constructiva.",
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
    level: "mild_sticky",
    scoreRange: [9, 16],
    badge: {
      en: "MILD COGNITIVE STICKINESS",
      id: "PELEKATAN PIKIRAN RINGAN",
      de: "LEICHTE GEDANKENVERHAFTHUNGEN",
      fr: "ADHÉRENCE COGNITIVE MODÉRÉE",
      es: "ADHERENCIA COGNITIVA LEVE",
    },
    title: {
      en: "Elevated Thought Sensitivity with Periodic Rumination",
      id: "Sensitivitas Pikiran Meningkat dengan Ruminasi Berkala",
      de: "Erhöhte Gedankensensitivität mit Grübelschleifen",
      fr: "Sensibilité Mentale Accrue et Ruminations Passagères",
      es: "Sensibilidad Mental Elevada y Rumiación Ocasional",
    },
    summary: {
      en: "Certain disturbing thoughts 'stick' longer than they should. You find yourself analyzing their meaning for 10–20 minutes, feeling temporary spikes of guilt, or occasionally needing to reassure yourself that you are safe and good.",
      id: "Pikiran tertentu terasa 'lengket' di kepala. Anda kerap menganalisis maknanya selama 10-20 menit, merasakan sengatan rasa bersalah, atau perlu meyakinkan diri bahwa Anda orang baik.",
      de: "Manche beunruhigende Gedanken bleiben länger haften. Sie analysieren deren Bedeutung und verspüren das Bedürfnis nach kurzer Selbstberuhigung.",
      fr: "Certaines pensées dérangeantes s'accrochent dans votre esprit. Vous passez du temps à analyser leur sens et éprouvez le besoin de vous rassurer.",
      es: "Algunos pensamientos angustiosos se quedan adheridos. Pasas minutos analizando su significado y necesitas autotranquilizarte para recuperar la calma.",
    },
    neurobiology: {
      en: "Mild cortico-striatal-thalamo-cortical (CSTC) loop hyper-responsiveness: the caudate nucleus takes slightly longer to 'filter out' intrusive cognitive sparks under high life stress.",
      id: "Respon berlebih ringan pada sirkuit CSTC: nukleus kaudatus butuh waktu lebih lama untuk menyaring percikan pikiran intrusif saat beban hidup meningkat.",
      de: "Leichte Überempfindlichkeit im CSTC-Regelkreis: Bei Stress filtert das Gehirn irrelevante Reize etwas verzögert heraus.",
      fr: "Légère hyperréactivité de la boucle cortico-striato-thalamo-corticale sous l'effet du stress et de la fatigue nerveuse.",
      es: "Leve hiperactividad en el circuito cortico-estriado-talámico: el cerebro tarda más en descartar chispas de pensamiento intrusivas.",
    },
    actionProtocol: {
      en: [
        "Adopt the 'Mental Spam Folder' visualization: label the thought as 'Just an OCD spark' and do not engage.",
        "Refrain from asking reassurance from friends; reassurance feeds the anxiety monster.",
        "Record intrusive worries in Nuju voice journal and practice sitting with uncertain feelings.",
      ],
      id: [
        "Gunakan visualisasi 'Kotak Spam': beri label 'Hanya percikan intrusif biasa' dan jangan didebat.",
        "Hindari meminta kepastian (reassurance) berulang kali ke orang lain; kepastian justru menyuburkan kecemasan.",
        "Luapkan kekhawatiran di jurnal suara Nuju dan latih diri bertoleransi dengan ketidakpastian.",
      ],
      de: [
        "Nutzen Sie das 'Spam-Ordner'-Prinzip: Benennen Sie den Gedanken als harmlosen Zwangsimpuls.",
        "Verzichten Sie darauf, andere um Rückversicherung zu bitten, da dies die Angst füttert.",
        "Sprechen Sie Ihre Sorgen in Nuju ein und üben Sie, die Ungewissheit auszuhalten.",
      ],
      fr: [
        "Visualisez un dossier 'Courrier indésirable' : étiquetez la pensée comme un simple spasme mental.",
        "Évitez de demander constamment à être rassuré(e) pour ne pas entretenir la boucle.",
        "Enregistrez vos doutes dans Nuju et apprenez à tolérer l'inconfort passager.",
      ],
      es: [
        "Aplica la técnica de la 'Carpeta de Spam': cataloga la idea como un chispazo sin importancia.",
        "Evita pedir confirmación externa a tus allegados; la confirmación alimenta la duda.",
        "Graba tus preocupaciones en el diario de voz de Nuju y tolera la incertidumbre sin reaccionar.",
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
    level: "moderate_pure_o",
    scoreRange: [17, 26],
    badge: {
      en: "MODERATE PURE O PATTERN",
      id: "POLA PURE O & KOMPULSI MENTAL NYATA",
      de: "MODERATES PURE-O-MUSTER",
      fr: "TOC PURE O MODÉRÉ",
      es: "PATRÓN PURE O MODERADO",
    },
    title: {
      en: "Persistent Intrusive Loops & Invisible Mental Compulsions",
      id: "Lingkaran Intrusif Persisten & Kompulsi Batin Tersembunyi",
      de: "Persistierende Zwangsgedanken & Mentale Rituale",
      fr: "Boucles Intrusives Persistantes et Rituels Mentaux",
      es: "Bucles Intrusivos Persistentes y Compulsiones Mentales",
    },
    summary: {
      en: "You are experiencing classic Pure O (Purely Obsessional OCD) dynamics. Disturbing taboo thoughts trigger deep terror, prompting hours of invisible internal compulsions: memory checking, arguing in your head, and desperate attempts to prove to yourself that you are not a monster.",
      id: "Anda mengalami dinamika klasik Pure O. Pikiran tabu yang mengerikan memicu kepanikan mendalam, diikuti berjam-jam ritual mental tersembunyi: memeriksa ingatan masa lalu, berdebat di kepala, dan berusaha membuktikan bahwa Anda bukan orang jahat.",
      de: "Sie erleben klassische Pure-O-Mechanismen: Schockierende Gedanken lösen Panik aus, gefolgt von stundenlangen mentalen Kontrollritualen und innerem Beweise-Sammeln.",
      fr: "Vous traversez une dynamique typique de TOC purement obsessionnel (Pure O). Des pensées inacceptables déclenchent des rituels mentaux intenses de vérification et d'argumentation.",
      es: "Vives la dinámica clásica de Pure O. Pensamientos tabú despiertan terror y desencadenan compulsiones mentales invisibles: rebobinar recuerdos y discutir contigo mismo para demostrar tu inocencia.",
    },
    neurobiology: {
      en: "Hyperactive cortico-striatal-thalamo-cortical (CSTC) circuit locking the brain's 'gear-shift' mechanism. The caudate nucleus fails to inhibit the anterior cingulate cortex, generating chronic false 'danger' signals.",
      id: "Sirkuit CSTC hiperaktif yang mengunci mekanisme 'pergantian gigi' pikiran. Nukleus kaudatus gagal menekan ACC, memicu alarm 'bahaya' palsu terus-menerus.",
      de: "Blockade im CSTC-Regelkreis: Das Gehirn kann den Gedanken nicht 'weiterschalten', wodurch das Alarmsystem fälschlicherweise dauerhaft aktiv bleibt.",
      fr: "Hyperactivité du circuit cortico-striato-thalamo-cortical : le mécanisme de commutation mentale est bloqué, maintenant un faux signal d'alerte.",
      es: "Hiperactividad en el circuito CSTC que bloquea el cambio de marcha cognitivo, generando una falsa señal de alarma permanente.",
    },
    actionProtocol: {
      en: [
        "Learn Exposure & Response Prevention (ERP): the golden rule is NEVER argue with or neutralize an intrusive thought.",
        "Agree with uncertainty: practice saying 'Maybe I will, maybe I won't. I choose to focus on making tea right now.'",
        "Stop thought suppression: research by Daniel Wegner proves that trying NOT to think of a white bear guarantees you think of it.",
      ],
      id: [
        "Pelajari Exposure & Response Prevention (ERP): aturan emasnya adalah JANGAN PERNAH berdebat atau menetralkan pikiran intrusif.",
        "Berdamailah dengan ketidakpastian: katakan 'Mungkin iya, mungkin tidak. Sekarang aku memilih lanjut menyeduh teh.'",
        "Hentikan menekan pikiran: penelitian membuktikan semakin Anda menolak memikirkan beruang putih, semakin sering ia muncul.",
      ],
      de: [
        "Wenden Sie ERP (Exposition mit Reaktionsverhinderung) an: Diskutieren oder neutralisieren Sie den Gedanken NIEMALS.",
        "Akzeptieren Sie Ungewissheit: Sagen Sie sich 'Vielleicht, vielleicht auch nicht. Ich konzentriere mich jetzt auf meine Arbeit.'",
        "Gedankenunterdrückung stoppen: Je mehr Sie gegen den Gedanken kämpfen, desto hartnäckiger kehrt er zurück.",
      ],
      fr: [
        "Pratiquez l'Exposition avec Prévention de la Réponse (EPR) : n'argumentez JAMAIS avec la pensée pour la neutraliser.",
        "Acceptez l'incertitude : dites-vous 'Peut-être bien, peut-être pas. Je choisis de me concentrer sur mon thé.'",
        "Arrêtez de vouloir chasser la pensée : plus vous luttez contre l'ours blanc, plus il grandit.",
      ],
      es: [
        "Aplica Exposición y Prevención de Respuesta (EPR): la regla de oro es JAMÁS discutir ni neutralizar la idea.",
        "Acepta la incertidumbre: repite 'Puede que sí, puede que no. Ahora elijo seguir preparando mi café.'",
        "Deja de reprimir el pensamiento: cuanto más intentas no pensar en el oso blanco, más aparece.",
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
    level: "severe_ocd_distress",
    scoreRange: [27, 36],
    badge: {
      en: "SEVERE INTRUSIVE OCD DISTRESS",
      id: "SIKLUS INTRUSIF AKUT & PENDERITAAN OBSESIF",
      de: "SCHWERE ZWANGSBELASTUNG (PURE O)",
      fr: "SOUFFRANCE OBSESSIONNELLE SÉVÈRE",
      es: "SUFRIMIENTO OBSESIVO GRAVE (PURE O)",
    },
    title: {
      en: "Paralyzing Thought-Action Fusion & Constant Mental Torment",
      id: "Kelumpuhan Thought-Action Fusion & Teror Batin Berkepanjangan",
      de: "Lähmende Gedanken-Handlungs-Fusion & Dauerangst",
      fr: "Fusion Pensée-Action Paralysante et Tourment Mental",
      es: "Fusión Pensamiento-Acción Paralizante y Tormento Mental",
    },
    summary: {
      en: "You are trapped in severe, exhausting Pure O distress. Unwanted taboo thoughts dominate your waking hours, provoking intense nausea, panic, and self-disgust. You are trapped in non-stop mental compulsions and severe thought-action fusion, believing your mind is dangerous.",
      id: "Anda terperangkap dalam penderitaan Pure O yang akut dan menguras jiwa. Pikiran tabu mendominasi hampir seluruh hari Anda, memicu mual, serangan panik, dan kebencian diri yang ekstrem. Anda terjebak dalam kompulsi mental tanpa henti karena menganggap pikiran Anda berbahaya.",
      de: "Sie befinden sich in einer schweren Zwangsschleife. Die quälenden Gedanken beherrschen Ihren Alltag und lösen Dauerpanik aus. Sie halten sich fälschlicherweise für eine Gefahr.",
      fr: "Vous êtes enfermé(e) dans une souffrance obsessionnelle aiguë. Les pensées intrusives envahissent vos journées, provoquant panique, dégoût de soi et rituels mentaux continus.",
      es: "Estás atrapado en una angustia severa por Pure O. Los pensamientos intrusivos consumen gran parte de tu día, provocando náuseas, pánico y autorreproches constantes.",
    },
    neurobiology: {
      en: "Severe fronto-striatal dysregulation: profound hyper-connectivity between the orbitofrontal cortex (OFC) and head of the caudate nucleus, causing the brain's internal 'feeling of rightness' mechanism to continuously malfunction.",
      id: "Disregulasi fronto-striatal berat: hiperkonektivitas masif antara orbitofrontal cortex (OFC) dan nukleus kaudatus, membuat mekanisme otak 'merasa beres/aman' macet total.",
      de: "Schwere Fehlfunktion im Regelkreis zwischen orbitofrontalem Kortex und Caudatus: Das Gehirn kann kein Gefühl der Erleichterung oder Sicherheit mehr erzeugen.",
      fr: "Dysfonctionnement sévère entre le cortex orbitofrontal et le striatum : le signal interne de soulagement et de sécurité est hors service.",
      es: "Grave desregulación fronto-estriada: la conexión entre el córtex orbitofrontal y el núcleo caudado falla, impidiendo que el cerebro sienta alivio o cierre.",
    },
    actionProtocol: {
      en: [
        "Consult a certified OCD therapist specializing in Exposure and Response Prevention (ERP) or Acceptance and Commitment Therapy (ACT).",
        "Crucial truth: Intrusive thoughts are NOT desires, plans, or moral truths. They are the opposite of who you are.",
        "Cease all internet searching and confession to loved ones; treat reassurance as a toxic drug that resets the OCD clock.",
        "Voice journal without judgment in Nuju to defuse the terrifying charge of unspoken words.",
      ],
      id: [
        "Konsultasikan dengan psikolog/psikiater yang ahli dalam Exposure & Response Prevention (ERP) atau terapi ACT.",
        "Kebenaran mutlak: Pikiran intrusif BUKAN keinginan, rencana, atau kebenaran moral Anda. Itu adalah kebalikan dari kepribadian Anda.",
        "Hentikan googling gejala dan berhenti meminta pengakuan maaf ke pasangan; reassurance ibarat narkoba bagi penderita OCD.",
        "Gunakan jurnal suara pribadi di Nuju untuk meluapkan uneg-uneg tanpa rasa takut dihakimi.",
      ],
      de: [
        "Suchen Sie einen qualifizierten Psychotherapeuten für ERP (Exposition mit Reaktionsverhinderung) auf.",
        "Wichtigste Tatsache: Ihre Zwangsgedanken sind KEINE Wünsche oder Absichten. Sie sind das exakte Gegenteil Ihrer wahren Persönlichkeit.",
        "Stoppen Sie alle Suchanfragen im Internet; Beruhigung ist für das Zwangshirn wie eine Sucht.",
        "Nutzen Sie Nuju, um belastende Gedanken wertfrei auszusprechen und ihnen die Macht zu nehmen.",
      ],
      fr: [
        "Consultez un thérapeute spécialisé dans les TOC et la thérapie EPR (Exposition avec Prévention de la Réponse).",
        "Vérité absolue : Vos pensées intrusives ne sont NI des désirs NI des projets. Elles sont l'antithèse de votre personne.",
        "Cessez toute recherche compulsive sur Google et toute confession répétée à vos proches.",
        "Déposez vos pensées dans Nuju pour briser le tabou du silence sans être jugé(e).",
      ],
      es: [
        "Acude a un psicólogo especialista en TOC y terapia EPR (Exposición con Prevención de Respuesta).",
        "Certeza clínica vital: Tus pensamientos intrusivos NO son deseos, planes ni tu identidad real. Son lo opuesto a ti.",
        "Detén las búsquedas en internet y las confesiones constantes; buscar alivio temporal alimenta el TOC.",
        "Desahógate en el diario de voz de Nuju para quitarle la carga de terror al tabú mental.",
      ],
    },
    colorScheme: {
      badge: "bg-purple-500/20 text-purple-400 border-purple-500/30",
      border: "border-purple-500/40",
      text: "text-purple-400",
      bg: "from-purple-950/40 via-stone-900 to-stone-950",
    },
  },
];
