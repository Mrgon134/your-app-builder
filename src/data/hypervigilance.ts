export type HypervigilanceCardLang = "en" | "id" | "de" | "fr" | "es";

export interface HypervigilanceQuestion {
  id: number;
  subscale: "environmental_threat_scanning" | "interpersonal_micro_attunement" | "autonomic_exhaustion";
  text: {
    en: string;
    id: string;
    de: string;
    fr: string;
    es: string;
  };
}

export interface HypervigilanceResultLevel {
  level: string;
  scoreRange: [number, number];
  title: {
    en: string;
    id: string;
    de: string;
    fr: string;
    es: string;
  };
  summary: {
    en: string;
    id: string;
    de: string;
    fr: string;
    es: string;
  };
  neurobiology: {
    en: string;
    id: string;
    de: string;
    fr: string;
    es: string;
  };
  actionProtocol: {
    en: string[];
    id: string[];
    de: string[];
    fr: string[];
    es: string[];
  };
  badge: {
    en: string;
    id: string;
    de: string;
    fr: string;
    es: string;
  };
}

export const HYPERVIGILANCE_QUESTIONS: HypervigilanceQuestion[] = [
  // 1. Environmental Threat Scanning & Sensory Alertness (Q1 - Q4)
  {
    id: 1,
    subscale: "environmental_threat_scanning",
    text: {
      en: "Whenever I enter a restaurant, waiting room, or public space, I instinctively locate the exits and prefer sitting with my back against a wall.",
      id: "Tiap kali masuk restoran, ruang tunggu, atau tempat umum, secara naluriah saya mencari pintu darurat dan memilih duduk membelakangi dinding.",
      de: "Immer wenn ich ein Restaurant oder einen Warteraum betrete, suche ich instinktiv nach Notausgängen und sitze am liebsten mit dem Rücken zur Wand.",
      fr: "Dès que j'entre dans un restaurant ou un lieu public, je repère instinctivement les sorties et préfère m'asseoir le dos contre un mur.",
      es: "Al entrar en un restaurante o lugar concurrido, localizo instintivamente las salidas y prefiero sentarme con la espalda contra la pared."
    }
  },
  {
    id: 2,
    subscale: "environmental_threat_scanning",
    text: {
      en: "Sudden unexpected noises (door slamming, dropped object, loud siren) cause an exaggerated bodily startle that makes my heart pound painfully.",
      id: "Suara keras mendadak (pintu terbanting, barang jatuh, klakson) memicu refleks kaget berlebihan hingga jantung saya berdegup kencang dan ngilu.",
      de: "Unerwartete laute Geräusche (zuschlagende Türen, herabfallende Gegenstände) lösen bei mir einen heftigen Schreckreflex mit Herzrasen aus.",
      fr: "Les bruits soudains (porte qui claque, objet qui tombe) provoquent chez moi un sursaut violent qui fait battre mon cœur à tout rompre.",
      es: "Los ruidos imprevistos (un portazo, algo que se cae) me provocan un sobresalto físico desmesurado con palpitaciones intensas."
    }
  },
  {
    id: 3,
    subscale: "environmental_threat_scanning",
    text: {
      en: "I find it nearly impossible to completely relax in unfamiliar surroundings because my sensory radar is continuously tracking peripheral movements and noises.",
      id: "Saya hampir mustahil merasa rileks di tempat baru karena radar indera saya terus-menerus memantau pergerakan dan suara di sekitar.",
      de: "Es fällt mir schwer, mich in unbekannten Umgebungen zu entspannen, weil meine Sinne ununterbrochen periphere Bewegungen und Geräusche scannen.",
      fr: "Il m'est presque impossible de me détendre dans un environnement inconnu car mes sens scannent sans cesse les bruits et mouvements autour de moi.",
      es: "Me resulta imposible relajarme por completo en lugares desconocidos porque mis sentidos rastrean cualquier movimiento o ruido a mi alrededor."
    }
  },
  {
    id: 4,
    subscale: "environmental_threat_scanning",
    text: {
      en: "Even in my own home, I double-check door locks, windows, or stove knobs multiple times because an uneasy feeling warns me danger is imminent.",
      id: "Bahkan di rumah sendiri, saya memeriksa kunci pintu, jendela, atau kompor berulang kali karena ada rasa gelisah bahwa bahaya mengintai.",
      de: "Selbst zuhause überprüfe ich Schlösser, Fenster oder den Herd mehrfach, weil mich ein diffuses Gefühl drohender Gefahr begleitet.",
      fr: "Même chez moi, je vérifie les verrous ou les fenêtres à plusieurs reprises, taraudé(e) par la sensation diffuse qu'un danger menace.",
      es: "Incluso en casa reviso cerraduras o ventanas varias veces debido a un presentimiento inquietante de que algo malo va a suceder."
    }
  },

  // 2. Interpersonal Micro-Attunement & Walking on Eggshells (Q5 - Q8)
  {
    id: 5,
    subscale: "interpersonal_micro_attunement",
    text: {
      en: "I am hyper-attuned to microscopic shifts in other people's tone of voice, cadence, or facial tension, instantly assuming they are angry with me.",
      id: "Saya sangat peka terhadap perubahan kecil pada nada suara, tempo bicara, atau raut muka orang lain, dan langsung mengira mereka marah pada saya.",
      de: "Ich registriere kleinste Nuancen im Tonfall oder in der Mimik meiner Mitmenschen und vermute sofort, dass sie verärgert über mich sind.",
      fr: "Je perçois la moindre variation dans le ton de voix ou les expressions du visage d'autrui, concluant immédiatement qu'on m'en veut.",
      es: "Detecto cambios microscópicos en el tono de voz o el gesto de los demás y asumo de inmediato que están enfadados conmigo."
    }
  },
  {
    id: 6,
    subscale: "interpersonal_micro_attunement",
    text: {
      en: "A delayed reply, a short text (like 'K' or 'Fine'), or an ambiguous email sends my nervous system into acute panic and obsessive scenario planning.",
      id: "Balasan chat yang lama, pesan singkat (seperti 'Y' atau 'Ok'), atau email ambigu membuat saraf saya panik dan sibuk menyusun skenario terburuk.",
      de: "Verzögerte Antworten oder einsilbige Nachrichten ('Ok', 'Gut') versetzen mein Nervensystem in Alarmbereitschaft und zwingen mich zu Katastrophenszenarien.",
      fr: "Un message court ('Ok', 'D'accord') ou une réponse tardive plonge mon système nerveux dans une angoisse aiguë et des scénarios catastrophes.",
      es: "Un mensaje escueto ('Ok', 'Ya') o una tardanza al responder desata un pánico interno que me lleva a imaginar los peores escenarios."
    }
  },
  {
    id: 7,
    subscale: "interpersonal_micro_attunement",
    text: {
      en: "I habitually feel like I am 'walking on eggshells' around colleagues, family, or partners, constantly anticipating their emotional outbursts or mood drops.",
      id: "Saya terbiasa merasa 'berjalan di atas pecahan kaca' di sekitar rekan, keluarga, atau pasangan, selalu siaga mengantisipasi amarah mereka.",
      de: "Ich habe oft das Gefühl, wie auf rohen Eiern zu gehen, um plötzliche Stimmungsumschwünge oder Wutausbrüche im Umfeld zu verhindern.",
      fr: "J'ai l'impression de marcher sur des œufs avec mes proches ou collègues, anticipant en permanence une crise ou un changement d'humeur.",
      es: "Siento con frecuencia que camino sobre cristales ante compañeros, familia o pareja, anticipando cualquier estallido de mal humor."
    }
  },
  {
    id: 8,
    subscale: "interpersonal_micro_attunement",
    text: {
      en: "I obsessively replay conversations in my head, analyzing every word I spoke to ensure I didn't inadvertently offend anyone or provoke retaliation.",
      id: "Saya mengulang-ulang percakapan di kepala secara obsesif, menganalisis tiap kata untuk memastikan saya tidak menyinggung siapa pun.",
      de: "Ich gehe Gespräche im Kopf endlos durch und seziere jedes Wort aus Angst, jemanden gekränkt oder Ablehnung provoziert zu haben.",
      fr: "Je repasse les conversations en boucle dans ma tête, disséquant chaque phrase de peur d'avoir froissé quelqu'un ou commis un faux pas.",
      es: "Rebobino las conversaciones en mi mente una y otra vez, analizando cada palabra por temor a haber ofendido o provocado rechazo."
    }
  },

  // 3. Autonomic Exhaustion & Inability to Downregulate (Q9 - Q12)
  {
    id: 9,
    subscale: "autonomic_exhaustion",
    text: {
      en: "My body carries chronic somatic armor (clenched jaw, locked shoulders, shallow chest breathing) that I only notice after my muscles start aching.",
      id: "Tubuh saya memikul ketegangan fisik kronis (rahang mengatup rapat, bahu tegang kaku, napas pendek) yang baru tersadar saat otot terasa nyeri.",
      de: "Mein Körper steht unter Daueranspannung (zusammengebissene Zähne, hochgezogene Schultern, flacher Atem), die ich oft erst bei Schmerzen bemerke.",
      fr: "Mon corps est constamment verrouillé (mâchoire serrée, épaules crispées, respiration courte) dont je ne prends conscience qu'à l'apparition des douleurs.",
      es: "Mi cuerpo acumula una coraza muscular crónica (mandíbula apretada, hombros rígidos, respiración superficial) que solo noto cuando ya duele."
    }
  },
  {
    id: 10,
    subscale: "autonomic_exhaustion",
    text: {
      en: "When I try to lie down or meditate, a wave of restless agitation or dread washes over me, as if dropping my guard is inherently unsafe.",
      id: "Saat saya mencoba berbaring atau bermeditasi, gelombang gelisah atau rasa waswas justru muncul, seolah lengah itu hal yang berbahaya.",
      de: "Wenn ich mich hinlegen oder meditieren will, überkommt mich Unruhe oder Beklemmung, als wäre das Loslassen der Wachsamkeit gefährlich.",
      fr: "Quand j'essaie de me reposer ou de méditer, une vague d'angoisse et d'agitation m'envahit, comme si baisser la garde était risqué.",
      es: "Al intentar descansar o meditar, surge una inquietud intensa o miedo repentino, como si bajar la guardia entrañara un peligro real."
    }
  },
  {
    id: 11,
    subscale: "autonomic_exhaustion",
    text: {
      en: "I wake up startled in the middle of the night or early morning with cortisol surges, immediately feeling alert and dreading the day ahead.",
      id: "Saya kerap terbangun kaget di tengah malam atau subuh dengan lonjakan kortisol, seketika merasa siaga penuh dan cemas menghadapi hari.",
      de: "Ich wache nachts oder frühmorgens schreckhaft mit einem Cortisolschub auf und bin sofort hellwach und voller Unbehagen vor dem Tag.",
      fr: "Je me réveille en sursaut la nuit avec un pic de stress brutal, immédiatement sur le qui-vive et angoissé(e) par la journée à venir.",
      es: "Me despierto sobresaltado/a en plena noche o al alba con una descarga de cortisol, sintiéndome inmediatamente en alerta y tenso/a."
    }
  },
  {
    id: 12,
    subscale: "autonomic_exhaustion",
    text: {
      en: "I feel chronically drained not from physical labor, but from the relentless, non-stop mental processing of potential threats and catastrophes.",
      id: "Saya merasa terkuras habis bukan karena kerja fisik, melainkan karena otak saya tak pernah berhenti memproses potensi bahaya dan bencana.",
      de: "Ich bin chronisch erschöpft – nicht von körperlicher Arbeit, sondern vom pausenlosen Abscannen möglicher Risiken und Katastrophen.",
      fr: "Je me sens vidé(e) non pas par l'effort physique, mais par l'épuisement mental de guetter en permanence les risques et catastrophes.",
      es: "Siento un cansancio crónico que no proviene del esfuerzo físico, sino del desgaste ininterrumpido de prever peligros y catástrofes."
    }
  }
];

export const HYPERVIGILANCE_OPTIONS = [
  {
    value: 0,
    label: {
      en: "Never / Rarely (Safe baseline)",
      id: "Tidak Pernah / Sangat Jarang (Merasa Aman)",
      de: "Nie / Selten (Sicheres Grundgefühl)",
      fr: "Jamais / Rarement (Sentiment de sécurité)",
      es: "Nunca / Rara vez (Sensación de seguridad)"
    }
  },
  {
    value: 1,
    label: {
      en: "Occasionally (Mild situational spike)",
      id: "Kadang-kadang (Muncul Saat Situasi Tertentu)",
      de: "Gelegentlich (Leichte situative Anspannung)",
      fr: "Parfois (Tension passagère)",
      es: "Ocasionalmente (Tensión situacional leve)"
    }
  },
  {
    value: 2,
    label: {
      en: "Often (Noticeable chronic pattern)",
      id: "Sering (Pola Kewaspadaan Cukup Nyata)",
      de: "Oft (Deutliches chronisches Muster)",
      fr: "Souvent (Tendance chronique marquée)",
      es: "A menudo (Patrón crónico notable)"
    }
  },
  {
    value: 3,
    label: {
      en: "Very Frequently (Dominant nervous system mode)",
      id: "Sangat Sering (Kerap Menguras Energi)",
      de: "Sehr häufig (Dominanter Alarmzustand)",
      fr: "Très fréquemment (Mode d'alerte prédominant)",
      es: "Muy frecuentemente (Modo de alerta dominante)"
    }
  },
  {
    value: 4,
    label: {
      en: "Almost Always / Constant (Perpetual high alert)",
      id: "Hampir Selalu / Terus Menerus (Siaga Tanpa Henti)",
      de: "Fast immer / Dauerhaft (Permanenter Hochalarm)",
      fr: "Presque toujours (Alerte rouge permanente)",
      es: "Casi siempre / Constante (Alerta máxima perpetua)"
    }
  }
];

export const HYPERVIGILANCE_RESULTS: HypervigilanceResultLevel[] = [
  {
    level: "regulated_neuroception",
    scoreRange: [0, 9],
    title: {
      en: "Regulated Neuroception & Somatic Safety",
      id: "Neurosepsi Teregulasi & Rasa Aman Somatik",
      de: "Regulierte Neurozeption & somatische Sicherheit",
      fr: "Neuroception Régulée & Sécurité Somatique",
      es: "Neurocepción Regulada y Seguridad Somática"
    },
    summary: {
      en: "Your nervous system possesses robust ventral vagal flexibility. You can accurately distinguish between real environmental danger and benign situations, allowing your body to downregulate into genuine restorative rest.",
      id: "Sistem saraf Anda memiliki kelenturan vagal ventral yang sehat. Anda dapat membedakan bahaya nyata dengan situasi aman, sehingga tubuh mampu beristirahat dalam ketenangan sejati.",
      de: "Ihr autonomes Nervensystem verfügt über eine intakte ventrovagale Regulation. Sie können zwischen realen Bedrohungen und sicheren Situationen unterscheiden und tief entspannen.",
      fr: "Votre système nerveux bénéficie d'une souplesse vagale ventrale optimale. Vous distinguez aisément le danger réel du calme ordinaire, autorisant une détente profonde et réparatrice.",
      es: "Tu sistema nervioso cuenta con una sólida flexibilidad vagal. Distingues con claridad el peligro real de la calma, permitiendo que tu organismo descanse de verdad."
    },
    neurobiology: {
      en: "Optimal prefrontal regulation of the amygdala via the uncinate fasciculus. Strong myelinated vagus nerve tone facilitates rapid social engagement and cardiac deceleration in safe spaces.",
      id: "Regulasi korteks prefrontal terhadap amigdala berjalan optimal melalui fasikulus unsinatus. Tonus saraf vagus bermielin tinggi memfasilitasi relaksasi detak jantung saat berada di tempat aman.",
      de: "Optimale Hemmung der Amygdala durch den präfrontalen Kortex. Hoher Vagus-Tonus ermöglicht rasche physiologische Beruhigung und soziale Verbundenheit.",
      fr: "Régulation préfrontale efficace de l'amygdale. Un tonus vagal bien développé favorise une décélération cardiaque rapide et l'engagement social apaisé.",
      es: "Modulación prefrontal eficaz sobre la amígdala. El óptimo tono vagal permite ralentizar el ritmo cardíaco y disfrutar de conexión social sin sobresaltos."
    },
    actionProtocol: {
      en: [
        "Continue daily somatic anchors (morning sunlight, diaphragmatic breathing, mindful walks).",
        "Maintain conscious digital boundaries to prevent artificial notification-driven hyperarousal.",
        "Deepen your body awareness: Use Nuju's voice journal for evening reflective unwinding."
      ],
      id: [
        "Lanjutkan jangkar somatik harian (sinar matahari pagi, napas diafragma, jalan santai).",
        "Jaga batasan digital agar notifikasi HP tidak memicu lonjakan alarm palsu.",
        "Rawat kepekaan tubuh: Gunakan jurnal suara Nuju untuk melepas sisa penat di malam hari."
      ],
      de: [
        "Pflegen Sie Ihre täglichen Erdungsrituale (Morgenlicht, Zwerchfellatmung, Bewegung).",
        "Setzen Sie klare Grenzen für digitale Benachrichtigungen, um Reizüberflutung zu vermeiden.",
        "Halten Sie Ihr inneres Gleichgewicht: Nutzen Sie Nujus Sprachtagebuch für abendliche Reflexion."
      ],
      fr: [
        "Préservez vos rituels d'ancrage quotidiens (lumière matinale, respiration lente, marche).",
        "Maintenez une hygiène numérique saine pour éviter les alertes sensorielles superflues.",
        "Cultivez la présence à soi : Déposez vos pensées vespérales dans le journal vocal Nuju."
      ],
      es: [
        "Mantén tus hábitos de enraizamiento diarios (luz solar matutina, respiración diafragmática).",
        "Pon límites a las notificaciones móviles para no sobrecargar el sistema de alerta.",
        "Afianza tu serenidad: Emplea el diario de voz de Nuju para desconectar por las noches."
      ]
    },
    badge: {
      en: "Regulated Sentinel",
      id: "Saraf Tenang Seimbang",
      de: "Geerdeter Beobachter",
      fr: "Sentinelle Régulée",
      es: "Centinela Regulado"
    }
  },
  {
    level: "mild_situational_alertness",
    scoreRange: [10, 19],
    title: {
      en: "Mild Situational Alertness & Sensory Sensitivity",
      id: "Kewaspadaan Situasional Ringan & Kepekaan Indera",
      de: "Leichte situative Wachsamkeit & sensorische Sensibilität",
      fr: "Vigilance Situationnelle Légère & Sensibilité Sensorielle",
      es: "Alerta Situacional Leve y Sensibilidad Sensorial"
    },
    summary: {
      en: "You experience occasional surges of threat scanning, particularly in crowded environments, during stressful deadlines, or when communicating with unpredictable peers. Your nervous system recovers once safety is restored.",
      id: "Anda sesekali mengalami lonjakan kewaspadaan, terutama di tempat ramai, saat tenggat waktu padat, atau ketika berhadapan dengan orang yang sulit ditebak. Saraf Anda dapat pulih begitu kondisi tenang kembali.",
      de: "Sie erleben gelegentliche Phasen erhöhter Alarmbereitschaft – vor allem in Menschenmengen oder bei Termindruck. Sobald Ruhe einkehrt, findet Ihr System wieder ins Gleichgewicht.",
      fr: "Vous ressentez des montées de vigilance temporaires, surtout en milieu bruyant ou lors de tensions relationnelles. Votre corps retrouve son calme dès que l'ambiance s'apaise.",
      es: "Experimentas picos de alerta puntuales ante aglomeraciones o plazos laborales exigentes. Tu organismo recupera la calma en cuanto cesa la presión externa."
    },
    neurobiology: {
      en: "Transient sympathetic nervous system recruitment with mild norepinephrine release; parasympathetic brake (vagal brake) re-engages promptly within 20-30 minutes of stimulus removal.",
      id: "Aktivasi simpatis sementara disertai pelepasan noradrenalin ringan; rem parasimpatis (vagal brake) aktif kembali dalam 20-30 menit setelah pemicu stres hilang.",
      de: "Vorübergehende sympathische Aktivierung mit leichter Noradrenalinausschüttung; die vagale Bremse greift rasch nach Abklingen des Stressors.",
      fr: "Activation sympathique modérée avec libération transitoire de noradrénaline ; le frein vagal se réenclenche sans difficulté majeure.",
      es: "Reclutamiento simpático transitorio con leve descarga de noradrenalina; el freno vagal responde adecuadamente tras el cese del estímulo estresante."
    },
    actionProtocol: {
      en: [
        "Practice physiological sighs (two quick inhales through the nose, long slow exhale through the mouth) when feeling tense.",
        "Take intentional 5-minute sensory breaks in quiet, low-lit rooms after public events.",
        "Voice decompression: Vent micro-stresses into Nuju's zero-knowledge audio journal to prevent cognitive accumulation."
      ],
      id: [
        "Lakukan tarikan napas fisiologis (dua hirupan cepat lewat hidung, satu hembusan panjang lewat mulut) saat merasa tegang.",
        "Beri jeda istirahat 5 menit di ruangan tenang dan redup setelah berada di tempat ramai.",
        "Dekonstruksi stres: Curhatkan beban harian ke jurnal suara privat Nuju agar tidak menumpuk di tubuh."
      ],
      de: [
        "Nutzen Sie den physiologischen Seufzer (zweimal kurz einatmen, lang durch den Mund ausatmen) bei Anspannung.",
        "Gönnen Sie sich 5-minütige Reizpausen in ruhigen, abgedunkelten Räumen nach turbulenten Tagen.",
        "Sanfte Entlastung: Sprechen Sie kleine Ärgernisse im geschützten Nuju-Sprachtresor aus."
      ],
      fr: [
        "Pratiquez le soupir physiologique (double inspiration nasale brève, expiration buccale prolongée) en cas de tension.",
        "Accordez-vous des pauses sensorielles de 5 minutes dans une pièce calme après les réunions denses.",
        "Décompression vocale : Confiez vos micro-tensions au journal audio crypté de Nuju."
      ],
      es: [
        "Aplica el suspiro fisiológico (dos inhalaciones nasales cortas y una exhalación bucal larga) ante los primeros signos de tensión.",
        "Regálate pausas de silencio de 5 minutos en entornos con poca luz tras jornadas ajetreadas.",
        "Desahogo sonoro: Graba tus microestreses cotidianos en el diario de voz encriptado de Nuju."
      ]
    },
    badge: {
      en: "Intuitive Scout",
      id: "Pengamat Intuitif",
      de: "Wachsamer Späher",
      fr: "Éclaireur Intuitif",
      es: "Explorador Intuitivo"
    }
  },
  {
    level: "moderate_chronic_scanning",
    scoreRange: [20, 29],
    title: {
      en: "Moderate Chronic Threat Scanning & Eggshell Walking",
      id: "Pemindaian Bahaya Sedang & Kerap Berjalan di Atas Kaca",
      de: "Chronisches Bedrohungsscanning & ständige Vorsicht",
      fr: "Hypervigilance Modérée & Marche sur des Œufs",
      es: "Alerta Crónica Moderada y Cautela Permanente"
    },
    summary: {
      en: "Your autonomic threat radar operates on high sensitivity. You frequently walk on eggshells around partners or superiors, analyze neutral text messages for hidden rejection, and carry persistent physical tension in your jaw or shoulders.",
      id: "Radar bahaya otonom Anda berada pada sensitivitas tinggi. Anda kerap merasa 'berjalan di atas pecahan kaca' di sekitar pasangan atau atasan, mencurigai chat netral sebagai penolakan, dan rahang sering mengatup kaku.",
      de: "Ihr innerer Gefahrenmelder schlägt zu sensibel an. Sie analysieren Nachrichten auf versteckte Ablehnung, fühlen sich im Miteinander oft angespannt und tragen Muskelhärte in Kiefer oder Nacken.",
      fr: "Votre radar intérieur est en surchauffe. Vous marchez souvent sur des œufs, décortiquez les messages neutres en y cherchant du rejet et accumulez des contractures musculaires.",
      es: "Tu radar de amenaza está hipercalibrado. Sueles anticipar desplantes, sobreanalizas mensajes escuetos y acumulas rigidez dolorosa en cuello y mandíbula."
    },
    neurobiology: {
      en: "Persistent amygdala hyperexcitability and salience network bias; elevated baseline cortisol rhythms impede deep sleep and down-regulate GABAergic inhibitory transmission.",
      id: "Peningkatan sensitivitas amigdala dan jaringan salience; ritme kortisol harian yang tinggi menghambat tidur lelap dan menekan neurotransmitter penenang GABA.",
      de: "Erhöhte Reaktivität der Amygdala und des Salienznetzwerks; erhöhter Basiskortisolspiegel beeinträchtigt die Tiefschlafphasen und dämpft GABA-Aktivität.",
      fr: "Hyperréactivité persistante de l'amygdale et du réseau de saillance ; le cortisol élevé perturbe le sommeil profond et freine l'effet apaisant du GABA.",
      es: "Hiperexcitabilidad mantenida de la amígdala y la red de saliencia; el exceso basal de cortisol deteriora el sueño profundo y disminuye la acción del GABA."
    },
    actionProtocol: {
      en: [
        "Establish an 'Exit Strategy Protocol' before entering high-stimulation events to give your nervous system psychological control.",
        "Implement bilateral somatic stimulation (butterfly hug or alternating foot tapping) during interpersonal anxiety spikes.",
        "Nightly unburdening sanctuary: Talk out your catastrophic worries into Nuju's zero-knowledge audio journal to soothe your amygdala."
      ],
      id: [
        "Siapkan 'strategi pamit/keluar' sebelum masuk ke acara ramai agar otak merasa memiliki kendali penuh.",
        "Gunakan stimulasi bilateral (pelukan kupu-kupu atau ketukan kaki bergantian) saat rasa waswas memuncak.",
        "Brankas pelepasan malam: Ungkapkan ketakutan terburukmu di jurnal audio terenkripsi Nuju untuk menenangkan amigdala."
      ],
      de: [
        "Legen Sie sich vor sozialen Anlässen einen unauffälligen Ausstiegsplan zurecht, um Kontrollverlust zu vermeiden.",
        "Nutzen Sie bilaterale Stimulation (Schmetterlingsumarmung oder abwechselndes Fußtippen) bei akuten Sorgen.",
        "Abendlicher Schutzraum: Entladen Sie Ihre Katastrophenszenarien im absolut privaten Nuju-Audioarchiv."
      ],
      fr: [
        "Préparez une stratégie de retrait discret avant les événements éprouvants pour rassurer votre cerveau.",
        "Pratiquez la stimulation bilatérale (câlin papillon ou tapotements alternés) lors des pics de doute.",
        "Sanctuaire nocturne : Verbalisez vos pires anticipations dans le journal audio sécurisé de Nuju pour apaiser l'amygdale."
      ],
      es: [
        "Planifica una vía de escape discreta antes de acudir a reuniones multitudinarias para conservar sensación de control.",
        "Aplica estimulación bilateral (abrazo de mariposa o golpeteo alterno de pies) cuando la incertidumbre se dispare.",
        "Refugio de noche: Vierte tus angustias y conjeturas en el diario de voz confidencial de Nuju para serenar la mente."
      ]
    },
    badge: {
      en: "Threat Scanner",
      id: "Pemindai Siaga",
      de: "Chronischer Wächter",
      fr: "Veilleur Tendu",
      es: "Vigilante Alerta"
    }
  },
  {
    level: "elevated_sympathetic_overdrive",
    scoreRange: [30, 38],
    title: {
      en: "Elevated Hypervigilance & Sympathetic Overdrive",
      id: "Hipervigilansi Tinggi & Saraf Simpatis Membara",
      de: "Ausgeprägte Hypervigilanz & sympathische Übererregung",
      fr: "Hypervigilance Élevée & Surrégime Sympathique",
      es: "Hipervigilancia Elevada y Sobrecarga Simpática"
    },
    summary: {
      en: "Your neuroception is locked in a prolonged survival state. You perceive danger, betrayal, or rejection in everyday interactions, suffer from intense bodily startle responses, and feel utterly exhausted yet unable to enter deep restorative slumber.",
      id: "Neurosepsi Anda terkunci dalam mode bertahan hidup jangka panjang. Anda mencium bahaya atau penolakan dalam interaksi sehari-hari, gampang kaget berlebihan, dan tubuh lelah luar biasa namun susah tidur lelap.",
      de: "Ihr Nervensystem ist im Überlebensmodus gefangen. Sie wittern überall Verrat oder Kritik, reagieren extrem schreckhaft und fühlen sich erschöpft, ohne abschalten zu können.",
      fr: "Votre neuroception est verrouillée en mode survie. Vous suspectez un danger ou une trahison au quotidien, sursautez violemment et souffrez d'un épuisement que le repos n'efface plus.",
      es: "Tu neurocepción permanece encallada en el modo supervivencia. Percibes hostilidad o abandono en situaciones neutras, sufres sobresaltos violentos y vives con un agotamiento que no cede."
    },
    neurobiology: {
      en: "Dysfunctional fear extinction pathways in the ventromedial prefrontal cortex (vmPFC); chronically elevated sympathetic tone leading to reduced Heart Rate Variability (HRV) and adrenal depletion.",
      id: "Disfungsi pada jalur pemadam rasa takut di korteks prefrontal ventromedial (vmPFC); dominasi simpatis kronis menyebabkan rendahnya Variabilitas Detak Jantung (HRV) dan kelelahan kelenjar adrenal.",
      de: "Verzögerte Furchtlöschung im ventromedialen Präfrontalkortex; dauerhafte Dominanz des Sympathikus senkt die Herzfrequenzvariabilität (HRV) und überlastet die Nebennieren.",
      fr: "Défaut d'extinction de la peur dans le cortex préfrontal ventromédian ; l'hypertonie sympathique chronique effondre la variabilité de la fréquence cardiaque (VFC).",
      es: "Alteración en las vías de extinción del miedo en la corteza prefrontal ventromedial; la continua dominancia simpática desploma la variabilidad cardíaca (HRV) y agota las glándulas suprarrenales."
    },
    actionProtocol: {
      en: [
        "Work with a trauma-informed practitioner specializing in Somatic Experiencing (SE) or EMDR.",
        "Incorporate daily cold water face dives or ice-pack sternum applications to stimulate vagal nerve bradycardia.",
        "Raw somatic decompression: Weep, swear, or vocalize your physical terror inside Nuju's zero-knowledge encrypted audio sanctuary."
      ],
      id: [
        "Konsultasikan dengan psikolog/terapis trauma yang menguasai Somatic Experiencing (SE) atau EMDR.",
        "Kompres es di dada atau basuh wajah dengan air dingin untuk merangsang perlambatan detak jantung vagal.",
        "Keluarkan jeritan batin: Luapkan tangis, umpatan, atau rasa takut di brankas audio terenkripsi Nuju tanpa rasa malu."
      ],
      de: [
        "Konsultieren Sie einen traumasensiblen Therapeuten mit Expertise in Somatic Experiencing (SE) oder EMDR.",
        "Nutzen Sie Kältereize (Eisbeutel auf das Brustbein oder kaltes Wasser im Gesicht), um den Tauchreflex zu stimulieren.",
        "Somatisches Ventil: Schreien oder weinen Sie Ihre seelische Not unzensiert im verschlüsselten Nuju-Sprachraum aus."
      ],
      fr: [
        "Consultez un thérapeute spécialisé dans le trauma, formé à la Somatic Experiencing ou à l'EMDR.",
        "Appliquez du froid sur le sternum ou plongez le visage dans l'eau glacée pour stimuler le réflexe de plongée vagal.",
        "Libération sans filtre : Pleurez ou criez votre détresse somatique dans le sanctuaire vocal chiffré de Nuju."
      ],
      es: [
        "Inicia acompañamiento terapéutico especializado en trauma corporal (Somatic Experiencing) o terapia EMDR.",
        "Aplica frío en el esternón o sumerge el rostro en agua helada para inducir el reflejo vagal de inmersión.",
        "Válvula de escape somática: Llora o verbaliza tu terror corporal sin tapujos en el diario de voz seguro de Nuju."
      ]
    },
    badge: {
      en: "Hyper-Alert Sentinel",
      id: "Sentinela Alarm Tinggi",
      de: "Hochalarm-Wächter",
      fr: "Sentinelle en Surchauffe",
      es: "Centinela en Sobrecarga"
    }
  },
  {
    level: "severe_neuroception_lock",
    scoreRange: [39, 48],
    title: {
      en: "Severe Exhaustive Neuroception Lock & Alarm Paralysis",
      id: "Alarm Neurosepsi Akut & Kelelahan Total Mode Siaga",
      de: "Schwere Neurozeptionsblockade & akute Alarmerschöpfung",
      fr: "Verrouillage Traumatique Sévère & Épuisement d'Alerte",
      es: "Bloqueo Neuroceptivo Severo y Parálisis por Alarma Continua"
    },
    summary: {
      en: "Your nervous system is experiencing total neuroceptive breakdown. The distinction between safety and mortal threat has collapsed into a non-stop sirens-blaring emergency. This state causes severe insomnia, sensory agony, panic attacks, and somatic despair.",
      id: "Sistem saraf Anda berada dalam titik jenuh neurosepsi ekstrem. Batas antara rasa aman dan ancaman maut telah runtuh menjadi sirene darurat yang berbunyi 24 jam. Kondisi ini memicu insomnia berat, nyeri otot kaku, serangan panik, dan keputusasaan somatik.",
      de: "Ihr Nervensystem befindet sich in einem Zustand totaler Überreizung. Der Unterschied zwischen Geborgenheit und existentieller Bedrohung ist ausgelöscht. Die Folge sind schwere Schlafstörungen, sensorische Qualen und Panikzustände.",
      fr: "Votre système nerveux subit un effondrement neuroceptif complet. La frontière entre quiétude et danger mortel a disparu, laissant place à une alerte permanente. Cela entraîne insomnies sévères, douleurs et crises de panique.",
      es: "Tu sistema nervioso se halla en un colapso neuroceptivo total. La línea entre la calma y el peligro vital se ha borrado por completo, generando insomnio grave, ataques de pánico y dolor somático debilitante."
    },
    neurobiology: {
      en: "Profound frontolimbic decoupling with massive unmitigated amygdalar firing; severe central sensitization of the dorsal root ganglia and hypothalamic-pituitary-adrenal (HPA) axis exhaustion.",
      id: "Terputusnya komunikasi antara korteks frontal dan sistem limbik disertai letupan amigdala tak terkendali; sensitisasi sentral pada sumsum tulang belakang dan kelelahan total poros HPA.",
      de: "Vollständige Entkopplung zwischen Präfrontalkortex und limbischem System; extreme Überempfindlichkeit des zentralen Nervensystems und Erschöpfung der HPA-Achse.",
      fr: "Déconnexion fronto-limbique sévère et décharges amygdaliennes massives ; sensibilisation centrale intense et épuisement complet de l'axe hypothalamo-hypophyso-surrénalien.",
      es: "Desconexión frontolímbica profunda con activación masiva ininterrumpida de la amígdala; sensibilización del sistema nervioso central y extenuación total del eje HPA."
    },
    actionProtocol: {
      en: [
        "Urgent clinical consultation with a psychiatrist or clinical trauma specialist for nervous system stabilization.",
        "Eliminate all non-essential social commitments and sensory overstimulation immediately.",
        "Zero-demand sanctuary: Cry, shake, scream, and deposit your rawest dread safely into Nuju's zero-knowledge encrypted vault."
      ],
      id: [
        "Segera jadwalkan konsultasi dengan psikiater atau psikolog klinis spesialis trauma untuk stabilisasi saraf darurat.",
        "Batalkan semua komitmen sosial yang tidak mendesak dan kurangi paparan kebisingan/layar.",
        "Sanctuary tanpa tuntutan: Menangis, gemetar, dan tumpahkan ketakutanmu yang paling purba di brankas terenkripsi Nuju."
      ],
      de: [
        "Dringende fachärztliche und psychotherapeutische Abklärung zur notfallmäßigen Beruhigung des Nervensystems.",
        "Stornieren Sie alle verzichtbaren Verpflichtungen und meiden Sie sensorische Reizüberflutung.",
        "Forderungsfreier Zufluchtsort: Weinen, zittern und klagen Sie Ihre seelische Not ungestört im verschlüsselten Nuju-Tresor."
      ],
      fr: [
        "Consultation clinique et psychiatrique urgente pour stabiliser d'urgence l'hyperactivité du système nerveux.",
        "Supprimez immédiatement toutes les sollicitations sociales et les surcharges sensorielles superflues.",
        "Refuge sans jugement : Pleurez, tremblez et déposez votre terreur nue dans le coffre-fort vocal de Nuju."
      ],
      es: [
        "Consulta médica y psicológica urgente para estabilizar de inmediato la sobrexcitación del sistema nervioso.",
        "Cancela todo compromiso social prescindible y protégete de cualquier sobrecarga sensorial.",
        "Espacio libre de demandas: Llora, tiembla y desahoga tu miedo más íntimo en el búnker de voz cifrado de Nuju."
      ]
    },
    badge: {
      en: "Exhausted Sentinel",
      id: "Saraf Siaga Ekstrem",
      de: "Erschöpfter Wächter",
      fr: "Sentinelle Épuisée",
      es: "Centinela Agotado"
    }
  }
];

export const HYPERVIGILANCE_SUBSCALE_INFO = {
  environmental_threat_scanning: {
    name: {
      en: "Environmental Threat Scanning & Sensory Alertness",
      id: "Pemindaian Bahaya Sekitar & Siaga Sensorik",
      de: "Umgebungsbezogenes Scanning & Reizwachsamkeit",
      fr: "Scan Environnemental & Vigilance Sensorielle",
      es: "Rastreo Ambiental y Alerta Sensorial"
    },
    description: {
      en: "Locating exits, needing back against walls, extreme startle response, and checking locks/stoves compulsively.",
      id: "Mencari pintu darurat, harus duduk membelakangi dinding, mudah kaget berlebihan, dan berulang kali memeriksa kunci/kompor.",
      de: "Suchen nach Notausgängen, Sitzen mit dem Rücken zur Wand, starker Schreckreflex und Kontrollzwänge.",
      fr: "Repérage des sorties, besoin d'avoir le dos au mur, sursauts violents et vérifications compulsives.",
      es: "Búsqueda de salidas, sentarse de espaldas a la pared, sobresaltos agudos y comprobación repetitiva de cerraduras."
    }
  },
  interpersonal_micro_attunement: {
    name: {
      en: "Interpersonal Micro-Attunement & Walking on Eggshells",
      id: "Sensitivitas Mikro-Sosial & Berjalan di Atas Kaca",
      de: "Zwischenmenschliche Überempfindlichkeit & Eiertanz",
      fr: "Hyper-Attunement Interpersonnel & Peur du Conflit",
      es: "Hiperatención Interpersonal y Cautela Extrema"
    },
    description: {
      en: "Over-analyzing tone shifts, interpreting delayed texts as rejection, walking on eggshells, and mental conversation replays.",
      id: "Overthinking intonasi bicara, menganggap chat singkat sebagai penolakan, merasa serba salah, dan memutar ulang percakapan.",
      de: "Sezieren von Tonfällen, Panik bei kurzen Nachrichten, ständiges Gefühl von Anspannung und Gedankenspiralen.",
      fr: "Sur-interprétation des intonations, angoisse face aux silences, impression d'insécurité et ruminations mentales.",
      es: "Sobreanálisis del tono de voz, pánico ante respuestas breves, sensación de caminar sobre cristales y rumiación mental."
    }
  },
  autonomic_exhaustion: {
    name: {
      en: "Autonomic Exhaustion & Inability to Downregulate",
      id: "Kelelahan Otonom & Ketidakmampuan Relaksasi",
      de: "Autonome Erschöpfung & Unfähigkeit zur Entspannung",
      fr: "Épuisement Autonome & Incapacité au Lâcher-Prise",
      es: "Agotamiento Autónomo e Incapacidad de Relajación"
    },
    description: {
      en: "Chronic somatic armor (clenched jaw, locked neck), restless agitation during rest, cortisol dawn surges, and nervous depletion.",
      id: "Ketegangan fisik kronis (rahang mengatup, leher kaku), gelisah saat mencoba rileks, bangun kaget subuh, dan saraf terkuras habis.",
      de: "Chronische Muskelpanzerung (Kiefer, Nacken), Unruhe beim Ausruhen, Cortisolschübe beim Aufwachen und seelische Erschöpfung.",
      fr: "Cuirasse corporelle (mâchoire crispée, nuque raide), anxiété au repos, réveils nocturnes en sursaut et épuisement nerveux.",
      es: "Coraza somática crónica (mandíbula apretada, cuello rígido), inquietud al descansar, descargas matinales de cortisol y colapso nervioso."
    }
  }
};

export function getHypervigilanceResult(totalScore: number): HypervigilanceResultLevel {
  const matched = HYPERVIGILANCE_RESULTS.find(
    (lvl) => totalScore >= lvl.scoreRange[0] && totalScore <= lvl.scoreRange[1]
  );
  return matched || HYPERVIGILANCE_RESULTS[HYPERVIGILANCE_RESULTS.length - 1];
}

export function calculateHypervigilanceSubscales(answers: Record<number, number>): {
  environmental_threat_scanning: number;
  interpersonal_micro_attunement: number;
  autonomic_exhaustion: number;
} {
  let environmental_threat_scanning = 0;
  let interpersonal_micro_attunement = 0;
  let autonomic_exhaustion = 0;

  HYPERVIGILANCE_QUESTIONS.forEach((q) => {
    const val = answers[q.id] || 0;
    if (q.subscale === "environmental_threat_scanning") environmental_threat_scanning += val;
    if (q.subscale === "interpersonal_micro_attunement") interpersonal_micro_attunement += val;
    if (q.subscale === "autonomic_exhaustion") autonomic_exhaustion += val;
  });

  return { environmental_threat_scanning, interpersonal_micro_attunement, autonomic_exhaustion };
}
