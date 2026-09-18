export type WindowOfToleranceLang = "en" | "id" | "de" | "fr" | "es";

export interface WindowOfToleranceQuestion {
  id: number;
  subscale: "hyperarousal" | "hypoarousal" | "narrow_capacity";
  text: {
    en: string;
    id: string;
    de: string;
    fr: string;
    es: string;
  };
}

export interface WindowOfToleranceResultLevel {
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

export const WINDOW_OF_TOLERANCE_QUESTIONS: WindowOfToleranceQuestion[] = [
  // Hyperarousal (Sympathetic nervous system spike / fight-or-flight)
  {
    id: 1,
    subscale: "hyperarousal",
    text: {
      en: "Under unexpected pressure or conflict, my heart races, my jaw clenches, and an urge to fight, flee, or defensively over-explain takes over immediately.",
      id: "Saat menghadapi tekanan atau konflik mendadak, jantung saya berdebar kencang, rahang menegang, dan muncul dorongan kuat untuk membela diri atau melarikan diri seketika.",
      de: "Unter plötzlichem Druck oder Konflikten rast mein Herz, mein Kiefer verkrampft und ich spüre den Drang zu kämpfen, zu fliehen oder mich panisch zu rechtfertigen.",
      fr: "Sous pression ou en conflit soudain, mon cœur s'emballe, ma mâchoire se serre et j'ai l'urgence viscérale de lutter, de fuir ou de me sur-justifier.",
      es: "Bajo presión o conflicto inesperado, mi corazón se acelera, mi mandíbula se tensa y surge un impulso visceral de luchar, huir o sobreexplicarme."
    }
  },
  {
    id: 2,
    subscale: "hyperarousal",
    text: {
      en: "I frequently suffer from sensory overload (intolerant of loud noises, bright lights, clutter, or multitasking) where my nerves feel electrified and raw.",
      id: "Saya kerap mengalami overload sensorik (tidak tahan suara bising, cahaya silau, atau multitasking) di mana saraf terasa tegang dan seperti tersengat listrik.",
      de: "Ich leide oft unter sensorischer Reizüberflutung (Lärm, grelles Licht, Unordnung), bei der meine Nerven völlig überreizt und vibrierend wirken.",
      fr: "Je subis fréquemment des surcharges sensorielles (bruits forts, lumières vives, désordre) où mes nerfs semblent à vif et sous haute tension.",
      es: "Sufro con frecuencia sobrecarga sensorial (intolerancia al ruido, luces intensas o multitarea) donde mis nervios se sienten eléctricos y al límite."
    }
  },
  {
    id: 3,
    subscale: "hyperarousal",
    text: {
      en: "When stressed, my thoughts accelerate uncontrollably into catastrophic scenarios, and I find it impossible to sit still or sleep without physical restlessness.",
      id: "Saat cemas, pikiran saya berputar tak terkendali membayangkan skenario terburuk, dan tubuh saya gelisah hingga sulit duduk diam atau tertidur.",
      de: "Bei Stress rasen meine Gedanken unkontrolliert in Katastrophenszenarien, und ich kann wegen innerer Unruhe kaum stillsitzen oder schlafen.",
      fr: "En état de stress, mes pensées s'emballent vers des scénarios catastrophes, rendant impossible tout repos physique ou sommeil apaisé.",
      es: "Con estrés, mis pensamientos se aceleran hacia catástrofes y me resulta imposible quedarme quieto o conciliar el sueño por inquietud física."
    }
  },
  {
    id: 4,
    subscale: "hyperarousal",
    text: {
      en: "I experience sudden spikes of irritability or emotional anger over minor inconveniences that feel disproportionate to what actually happened.",
      id: "Saya sering merasakan lonjakan amarah atau frustrasi mendadak atas kejadian kecil yang sebenarnya sepele tapi terasa memicu ledakan emosi.",
      de: "Ich erlebe plötzliche Wutausbrüche oder Gereiztheit bei kleinen Störungen, die völlig unverhältnismäßig zum eigentlichen Auslöser sind.",
      fr: "J'éprouve des accès soudains d'irritabilité ou de colère face à des contrariétés mineures, disproportionnés par rapport aux faits.",
      es: "Experimento estallidos repentinos de irritabilidad o ira ante contratiempos menores, desproporcionados con la realidad."
    }
  },

  // Hypoarousal (Dorsal vagal collapse / freeze / shutdown)
  {
    id: 5,
    subscale: "hypoarousal",
    text: {
      en: "When stress crosses a certain threshold, I mentally shut down—feeling spaced out, numb, disconnected from my body, or watching myself from the ceiling.",
      id: "Ketika stres melewati ambang batas tertentu, pikiran saya mendadak 'mati' (shutdown)—merasa hampa, kebas, terlepas dari tubuh, atau seperti menatap diri dari jauh.",
      de: "Wenn der Stress eine Grenze überschreitet, schalte ich innerlich ab: Ich fühle mich betäubt, wie im Nebel oder von meinem Körper abgespalten (Dissoziation).",
      fr: "Quand le stress dépasse un seuil, je bascule en fermeture totale (shutdown) : sensation d'anesthésie, esprit brumeux et déconnexion corporelle.",
      es: "Cuando el estrés supera cierto límite, me desconecto por completo (shutdown): me siento anestesiado, flotando o disociado de mi propio cuerpo."
    }
  },
  {
    id: 6,
    subscale: "hypoarousal",
    text: {
      en: "I experience heavy physical fatigue or sluggish brain fog after minor social interactions or tasks, feeling as if gravity has tripled and words cannot form.",
      id: "Saya merasakan kelelahan fisik luar biasa atau kabut otak (brain fog) setelah interaksi sosial atau tugas kecil, seolah gravitasi memberat dan sulit menyusun kata.",
      de: "Ich erlebe bleierne Müdigkeit oder Gehirnnebel nach kleinen sozialen Interaktionen, als hätte sich die Schwerkraft verdreifacht und Worte fehlen mir.",
      fr: "Je ressens une fatigue de plomb ou un brouillard cérébral intense après de simples interactions, comme si mon énergie était vidée instantanément.",
      es: "Siento un cansancio aplastante o niebla mental tras pequeñas interacciones, como si la gravedad se triplicara y no encontrara palabras."
    }
  },
  {
    id: 7,
    subscale: "hypoarousal",
    text: {
      en: "In heated arguments or demanding moments, I become completely mute or emotionally blank, unable to feel feelings or stand up for myself.",
      id: "Saat perdebatan memanas atau situasi menuntut, saya mendadak membisu total atau kosong emosional, tak sanggup merasakan apa pun atau membela diri.",
      de: "Bei hitzigen Auseinandersetzungen werde ich völlig stumm, innerlich leer und kann weder Gefühle spüren noch meine Position vertreten.",
      fr: "Lors de disputes tendues, je deviens totalement muet(te) ou émotionnellement vide, incapable d'éprouver quoi que ce soit ou de me défendre.",
      es: "En discusiones tensas, me quedo completamente mudo o vacío por dentro, incapaz de sentir emociones o defender mi postura."
    }
  },
  {
    id: 8,
    subscale: "hypoarousal",
    text: {
      en: "I fall into states of helpless procrastination or 'couch lock' where hours evaporate while I stare blankly, unable to mobilize myself to take basic action.",
      id: "Saya sering terjebak dalam kelumpuhan prokrastinasi ('couch lock') di mana berjam-jam berlalu hanya menatap hampa, tak mampu menggerakkan diri untuk bertindak.",
      de: "Ich verfalle in Lähmungszustände ('Couch Lock'), in denen Stunden vergehen, während ich apathisch starre und unfähig bin, einfache Dinge zu tun.",
      fr: "Je sombre dans des états de paralysie amorphe ('couch lock') où les heures s'évaporent sans que je puisse mobiliser l'énergie de bouger.",
      es: "Caigo en estados de parálisis apática donde pasan las horas mientras miro al vacío, incapaz de activar mi cuerpo para tareas básicas."
    }
  },

  // Narrow Capacity (Micro-Window Fragility / Autonomic Instability)
  {
    id: 9,
    subscale: "narrow_capacity",
    text: {
      en: "My zone of comfortable calm feels paper-thin; a slight schedule change, delayed message, or critical tone can instantly throw me into chaos or despair.",
      id: "Zona tenang dan nyaman saya terasa setipis kertas; sedikit perubahan jadwal, pesan terlambat dibalas, atau nada dingin bisa langsung melempar saya ke kekacauan.",
      de: "Meine Zone innerer Ruhe ist hauchdünn; eine kleine Planänderung oder ein kühler Ton wirft mich sofort aus der Bahn in Chaos oder Verzweiflung.",
      fr: "Ma zone de calme est extrêmement étroite ; un léger retard ou un ton froid suffit à me précipiter dans la panique ou l'effondrement.",
      es: "Mi zona de calma es finísima; un leve cambio de planes o un tono frío me arroja al instante al pánico o a la desesperanza."
    }
  },
  {
    id: 10,
    subscale: "narrow_capacity",
    text: {
      en: "I rapidly ping-pong between feeling anxious, wired, and agitated (hyper) and feeling depressed, frozen, and completely depleted (hypo) within the same day.",
      id: "Dalam satu hari yang sama, saya sering terlempar bolak-balik antara gelisah berenergi tinggi (hiperarousal) dan lemas beku tak berdaya (hipoarousal).",
      de: "Ich schwanke innerhalb desselben Tages wie ein Jo-Jo zwischen nervöser Anspannung (Hyperarousal) und apathischer Erschöpfung (Hypoarousal).",
      fr: "Je fais l'effet d'un yoyo au cours de la même journée, oscillant entre agitation anxieuse (hyper) et effondrement apathique (hypo).",
      es: "Oscilo a lo largo del mismo día entre ansiedad agitada (hiper) y colapso apático sin energía (hipo)."
    }
  },
  {
    id: 11,
    subscale: "narrow_capacity",
    text: {
      en: "It takes me hours or sometimes days to physiologically recover from an upsetting phone call, emotional confrontation, or difficult email.",
      id: "Butuh waktu berjam-jam atau bahkan berhari-hari bagi sistem tubuh saya untuk pulih dari telepon yang menegangkan, konfrontasi, atau email sulit.",
      de: "Ich brauche oft Stunden oder Tage, um mich physiologisch von einem aufwühlenden Anruf, Streit oder einer schwierigen E-Mail zu erholen.",
      fr: "Il me faut des heures, voire des jours, pour récupérer physiquement d'un appel déstabilisant, d'une dispute ou d'un courriel difficile.",
      es: "Tardo horas o días en recuperarme físicamente tras una llamada tensa, una confrontación o un mensaje difícil."
    }
  },
  {
    id: 12,
    subscale: "narrow_capacity",
    text: {
      en: "I structure my entire daily routine around avoiding surprises, conflict, or high-stimulus environments because I instinctively know my nervous system cannot hold it.",
      id: "Saya menyusun rutinitas hidup secara kaku demi menghindari kejutan atau konflik, karena tahu sistem saraf saya tidak sanggup menampungnya.",
      de: "Ich gestalte meinen Alltag krampfhaft so, dass ich Überraschungen und Konflikte vermeide, weil ich weiß, dass meine Nerven dem nicht standhalten.",
      fr: "J'organise mon quotidien de façon rigide pour éviter toute surprise ou conflit, sachant intuitivement que mes nerfs ne supporteraient pas la charge.",
      es: "Estructuro mi rutina de forma rígida para evitar sorpresas o conflictos, sabiendo que mi sistema nervioso colapsaría ante la sobrecarga."
    }
  }
];

export const WINDOW_OF_TOLERANCE_OPTIONS = [
  {
    value: 0,
    label: {
      en: "Never / Very Rare",
      id: "Tidak Pernah / Sangat Jarang",
      de: "Nie / Sehr selten",
      fr: "Jamais / Très rare",
      es: "Nunca / Muy raro"
    }
  },
  {
    value: 1,
    label: {
      en: "Rarely (Once a month)",
      id: "Jarang (Sebulan sekali)",
      de: "Selten (Einmal im Monat)",
      fr: "Rarement (Une fois par mois)",
      es: "Raramente (Una vez al mes)"
    }
  },
  {
    value: 2,
    label: {
      en: "Sometimes (Weekly)",
      id: "Kadang-kadang (Mingguan)",
      de: "Manchmal (Wöchentlich)",
      fr: "Parfois (Hebdomadaire)",
      es: "A veces (Semanalmente)"
    }
  },
  {
    value: 3,
    label: {
      en: "Frequently (Several times a week)",
      id: "Sering (Beberapa kali seminggu)",
      de: "Häufig (Mehrmals pro Woche)",
      fr: "Fréquemment (Plusieurs fois par semaine)",
      es: "Frecuentemente (Varias veces por semana)"
    }
  },
  {
    value: 4,
    label: {
      en: "Constantly / Daily Default",
      id: "Hampir Setiap Hari / Default Harian",
      de: "Ständig / Täglicher Normalzustand",
      fr: "Constamment / État quotidien par défaut",
      es: "Constantemente / Estado diario por defecto"
    }
  }
];

export const WINDOW_OF_TOLERANCE_RESULTS: WindowOfToleranceResultLevel[] = [
  {
    level: "resilient_wide",
    scoreRange: [0, 10],
    title: {
      en: "Resilient Wide Window (Regulated Ventral Vagal Anchor)",
      id: "Window Luas & Resilien (Jangkar Ventral Vagal Teratur)",
      de: "Breites Resilienz-Fenster (Regulierte Ventral-Vagale Verankerung)",
      fr: "Fenêtre Large & Résiliente (Ancrage Ventral Vagal Régulé)",
      es: "Ventana Amplia y Resiliente (Anclaje Vagal Ventral Regulado)"
    },
    summary: {
      en: "Your nervous system possesses robust autonomic flexibility. You can experience stress, grief, anger, or excitement without being catapulted into panic (fight/flight) or numbness (freeze/shutdown). You bounce back quickly after disruptions.",
      id: "Sistem saraf otonom Anda memiliki fleksibilitas tinggi. Anda mampu merasakan stres, amarah, duka, atau antusiasme tanpa terlempar ke kepanikan liar (fight/flight) maupun kelumpuhan mati rasa (freeze/shutdown). Pemulihan berlangsung cepat.",
      de: "Ihr Nervensystem verfügt über eine bemerkenswerte Flexibilität. Sie können Stress, Trauer oder Ärger verarbeiten, ohne in Panik (Kampf/Flucht) oder Taubheit (Erstarrung) abzugleiten. Nach Belastungen finden Sie rasch zurück zur Mitte.",
      fr: "Votre système nerveux fait preuve d'une flexibilité remarquable. Vous pouvez vivre des émotions intenses sans basculer dans la panique (lutte/fuite) ou l'anesthésie (sidération). Votre capacité de récupération après un choc est rapide.",
      es: "Tu sistema nervioso posee una gran flexibilidad autonómica. Puedes procesar estrés, dolor o entusiasmo sin precipitarte en el pánico (lucha/huida) ni en la insensibilidad (congelación). Te recuperas con agilidad tras los contratiempos."
    },
    neurobiology: {
      en: "High heart rate variability (HRV) and optimal myelinated vagus nerve activity (the 'vagus brake') allow your prefrontal cortex to remain online even when emotional adrenaline rises.",
      id: "Variabilitas detak jantung (HRV) tinggi dan aktivitas saraf vagus bermielin yang optimal ('rem vagus') menjaga korteks prefrontal tetap aktif meski adrenalin naik.",
      de: "Hohe Herzratenvariabilität (HRV) und ein aktiver myelinisierter Vagusnerv ('Vagus-Bremse') halten Ihren präfrontalen Kortex auch unter Druck handlungsfähig.",
      fr: "Une variabilité de fréquence cardiaque (VRC) élevée et un frein vagal myélinisé efficace maintiennent votre cortex préfrontal connecté même face aux montées d'adrénaline.",
      es: "Una alta variabilidad de la frecuencia cardíaca (VFC) y un freno vagal mielinizado óptimo permiten que tu corteza prefrontal siga activa ante el estrés."
    },
    actionProtocol: {
      en: [
        "Continue grounding practices to maintain baseline parasympathetic tone.",
        "Use reflective voice journaling to explore nuanced emotional subtleties.",
        "Serve as a co-regulating safe anchor for loved ones experiencing dysregulation."
      ],
      id: [
        "Pertahankan latihan pembumian harian untuk menjaga tonus parasimpatis.",
        "Gunakan voice journaling untuk mengeksplorasi nuansa emosi yang lebih halus.",
        "Jadilah jangkar ko-regulasi yang aman bagi orang terdekat saat mereka cemas."
      ],
      de: [
        "Regelmäßige Erdungsübungen beibehalten, um den parasympathischen Tonus zu sichern.",
        "Nutzen Sie Voice-Journaling zur Vertiefung Ihrer emotionalen Selbstwahrnehmung.",
        "Dienen Sie als regulierender Anker für Nahestehende in Stressphasen."
      ],
      fr: [
        "Poursuivez vos ancrages corporels pour préserver votre tonus parasympathique.",
        "Utilisez le journal vocal pour décrypter vos ressentis émotionnels fins.",
        "Soyez un point d'ancrage co-régulateur apaisant pour vos proches stressés."
      ],
      es: [
        "Mantén prácticas de enraizamiento para conservar el tono parasimpático.",
        "Usa el diario por voz para explorar sutilezas emocionales complejas.",
        "Actúa como ancla de co-regulación segura para seres queridos en crisis."
      ]
    },
    badge: {
      en: "Autonomic Anchor",
      id: "Jangkar Otonom",
      de: "Autonomer Anker",
      fr: "Ancre Autonome",
      es: "Ancla Autonómica"
    }
  },
  {
    level: "mild_strain",
    scoreRange: [11, 20],
    title: {
      en: "Mild Autonomic Strain (Occasional Boundary Fluctuation)",
      id: "Ketegangan Otonom Ringan (Fluktuasi Batas Sesekali)",
      de: "Leichte vegetative Belastung (Gelegentliche Schwankungen)",
      fr: "Tension Autonome Légère (Fluctuations Occasionnelles)",
      es: "Tensión Autonómica Leve (Fluctuaciones Ocasionales)"
    },
    summary: {
      en: "Your window of tolerance is generally stable, but cumulative lifestyle fatigue, poor sleep, or relational friction temporarily narrows your nervous system's capacity, leading to irritable snapping or post-work brain fog.",
      id: "Window of tolerance Anda umumnya stabil, namun penumpukan kelelahan kerja, kurang tidur, atau gesekan relasi sesekali menyempitkan kapasitas saraf, memicu ketus mendadak atau rasa lelah tumpul sepulang kerja.",
      de: "Ihr Toleranzfenster ist im Alltag stabil. Bei Schlafmangel, Reizüberflutung oder Beziehungskonflikten verengt sich die Kapazität jedoch spürbar, was zu Reizbarkeit oder abendlicher Erschöpfung führt.",
      fr: "Votre fenêtre de tolérance est globalement stable. Toutefois, la fatigue accumulée, le manque de sommeil ou des tensions relationnelles réduisent temporairement votre marge de manœuvre.",
      es: "Tu ventana de tolerancia es generalmente estable. Sin embargo, la fatiga acumulada, el mal sueño o roces interpersonales estrechan temporalmente la capacidad de tu sistema nervioso."
    },
    neurobiology: {
      en: "The ventral vagal brake is functional but tires under sustained allostatic load, allowing transient cortisol spikes or brief dorsal vagal sluggishness.",
      id: "Rem ventral vagal berfungsi baik namun melemah saat beban alostatik menumpuk, memicu lonjakan kortisol sementara atau rasa lamban dorsal vagal.",
      de: "Die Vagus-Bremse arbeitet zuverlässig, ermüdet jedoch unter dauerhafter Allostase-Last und lässt kurzzeitige Cortisol-Spitzen durch.",
      fr: "Le frein vagal fonctionne bien mais faiblit sous la charge allostatique prolongée, laissant passer des pics transitoires de cortisol.",
      es: "El freno vagal ventral funciona pero se cansa bajo carga alostática continua, permitiendo picos breves de cortisol o decaimiento dorsal."
    },
    actionProtocol: {
      en: [
        "Incorporate 3-minute physiological sighs (double inhale, long slow exhale) when work pace spikes.",
        "Implement cognitive boundary transitions between work and personal downtime.",
        "Audio journal at dusk to unburden mental loops before nighttime cortisol peaks."
      ],
      id: [
        "Lakukan physiological sigh (2 tarikan napas cepat, 1 hembusan panjang) saat tekanan kerja meningkat.",
        "Buat transisi batasan yang jelas antara jam kerja dan waktu istirahat malam.",
        "Gunakan audio journal di sore hari untuk melepas beban pikiran sebelum tidur."
      ],
      de: [
        "Physiologische Seufzer (doppeltes Einatmen, langes Ausatmen) bei Arbeitsspitzen anwenden.",
        "Feste Pufferzonen zwischen Feierabend und Privatleben etablieren.",
        "Abendliches Audio-Journaling nutzen, um kreisende Gedanken vor dem Schlaf loszulassen."
      ],
      fr: [
        "Pratiquez le soupir physiologique (double inspiration, expiration lente) lors des coups de pression.",
        "Délimitez une frontière nette entre la fin de journée de travail et votre vie privée.",
        "Enregistrez un journal vocal au crépuscule pour déposer les ruminations mentales."
      ],
      es: [
        "Haz suspiros fisiológicos (doble inhalación y exhalación larga) cuando suba la presión laboral.",
        "Establece una transición clara entre el trabajo y tu tiempo de descanso personal.",
        "Graba un diario de voz al atardecer para descargar bucles mentales antes de dormir."
      ]
    },
    badge: {
      en: "Flexible with Minor Strain",
      id: "Fleksibel dengan Sedikit Beban",
      de: "Flexibel mit leichter Belastung",
      fr: "Flexible avec Légère Tension",
      es: "Flexible con Tensión Leve"
    }
  },
  {
    level: "moderate_dysregulation",
    scoreRange: [21, 31],
    title: {
      en: "Moderate Dysregulation (Frequent Spills into Panic or Freeze)",
      id: "Disregulasi Moderat (Sering Terlempar ke Panik atau Membeku)",
      de: "Moderate Dysregulation (Häufiges Abdriften in Panik oder Erstarrung)",
      fr: "Dérégulation Modérée (Basculements Fréquents en Panique ou Sidération)",
      es: "Desregulación Moderada (Caídas Frecuentes en Pánico o Congelación)"
    },
    summary: {
      en: "Your window has noticeably constricted. Minor unpredictabilities easily push you either above the window into sympathetic overdrive (heart racing, rage, anxiety) or drop you below into dorsal shutdown (brain fog, apathy, dissociation).",
      id: "Kapasitas window Anda menyempit cukup nyata. Ketidakpastian kecil mudah melontarkan Anda ke atas window (simpatis: cemas, marah, berdebar) atau menjatuhkan Anda ke bawah window (dorsal: otak buntu, mati rasa, enggan bergerak).",
      de: "Ihr Toleranzfenster ist deutlich verengt. Unvorhergesehenes wirft Sie rasch entweder nach oben in die sympathische Übererregung (Panik, Wut) oder nach unten in den Erstarrungszustand (Apathie, Dissoziation).",
      fr: "Votre fenêtre s'est nettement rétrécie. Le moindre imprévu vous propulse au-dessus en sur-activation sympathique (anxiété, agitation) ou en-dessous en état de sidération dorsale (brouillard, repli apathique).",
      es: "Tu ventana se ha estrechado notablemente. Pequeños imprevistos te expulsan con facilidad hacia arriba (hiperactivación simpática: ira, ansiedad) o hacia abajo (colapso dorsal: apatía, mente en blanco)."
    },
    neurobiology: {
      en: "Chronic sympathetic priming elevates baseline amygdala reactivity while dampening the ventral vagal circuit, causing rapid tipping between fight/flight adrenaline and dorsal vagal immobility.",
      id: "Aktivasi simpatis berkepanjangan meningkatkan sensitivitas amigdala dan melemahkan sirkuit ventral vagal, membuat Anda mudah terpental antara adrenalin dan kelumpuhan dorsal.",
      de: "Chronische sympathische Aktivierung erhöht die Amygdala-Sensibilität und schwächt den ventral-vagalen Bremskreis, was zu abrupten Kippeffekten führt.",
      fr: "L'activation sympathique chronique sur-stimule l'amygdale et affaiblit le frein vagal, provoquant des bascules brutales entre l'adrénaline et l'engourdissement.",
      es: "La sobreactivación simpática crónica sensibiliza la amígdala y desgasta el freno vagal, provocando cambios bruscos entre adrenalina e inmovilidad."
    },
    actionProtocol: {
      en: [
        "Practice somatic pendulation: alternate attention between a tight physical tension and a neutral body anchor (e.g. feet on the floor).",
        "Engage in low-pitch vocal toning or humming ('Voo' breath) to stimulate the auricular vagus nerve branch.",
        "Record 60-second voice check-ins on Nuju during transition states to label arousal levels before emotional flooding."
      ],
      id: [
        "Latih somatic pendulation: alihkan fokus bergantian antara titik tegang tubuh dan titik tubuh yang netral (seperti telapak kaki menapak lantai).",
        "Lakukan vocal toning nada rendah atau bersenandung ('Voo' sound) untuk merangsang cabang saraf vagus.",
        "Rekam voice check-in 60 detik di Nuju saat jeda aktivitas untuk melabeli kondisi saraf sebelum kebanjiran emosi."
      ],
      de: [
        "Somatisches Pendeln üben: Aufmerksamkeit zwischen Anspannungszonen und neutralen Körperstellen (z. B. Fußsohlen) hin und her bewegen.",
        "Tiefe Tönungsübungen oder Summen ('Voo'-Atem), um den Nervus vagus direkt zu stimulieren.",
        "Nutzen Sie kurze 60-Sekunden-Voice-Check-ins in Nuju, um den Erregungszustand rechtzeitig zu benennen."
      ],
      fr: [
        "Pratiquez la pendulation somatique : alternez votre attention entre une zone tendue et un ancrage corporel neutre (pieds au sol).",
        "Pratiquez le bourdonnement ou son grave ('Voo') pour stimuler la branche auriculaire du nerf vague.",
        "Faites un enregistrement vocal flash de 60 secondes sur Nuju pour nommer votre état nerveux avant d'être submergé(e)."
      ],
      es: [
        "Practica la pendulación somática: oscila tu atención entre una zona tensa y un punto corporal neutro (pies en el suelo).",
        "Haz sonidos vocales graves o tarareo ('Voo') para estimular el nervio vago a través de vibraciones.",
        "Graba notas de voz de 60 segundos en Nuju en momentos de cambio para identificar tu estado antes del desborde."
      ]
    },
    badge: {
      en: "Constricted Capacity",
      id: "Kapasitas Menyempit",
      de: "Eingeengte Kapazität",
      fr: "Capacité Rétrécie",
      es: "Capacidad Constricta"
    }
  },
  {
    level: "chronically_narrowed",
    scoreRange: [32, 40],
    title: {
      en: "Chronically Narrowed Window (High Nervous System Vigilance)",
      id: "Window Menyempit Kronis (Kewaspadaan Sistem Saraf Tinggi)",
      de: "Chronisch verengtes Fenster (Dauerhafte vegetative Alarmbereitschaft)",
      fr: "Fenêtre Chroniquement Étroite (Hypervigilance Nerveuse Élevée)",
      es: "Ventana Crónicamente Estrecha (Hipervigilancia Nerviosa Elevada)"
    },
    summary: {
      en: "Your autonomic nervous system operates with a micro-window. You spend the vast majority of your life alternating between hyperaroused panic, irritability, and sensory overwhelm, followed by immediate dorsal collapse, exhaustion, and dissociation.",
      id: "Sistem saraf otonom Anda beroperasi dengan 'micro-window' yang sangat tipis. Sebagian besar hari Anda dihabiskan berayun antara panik hiperarousal, emosi meledak, atau overload sensorik, disusul langsung oleh kelelahan berat dan mati rasa.",
      de: "Ihr autonomes Nervensystem operiert in einem hauchdünnen Mikro-Fenster. Sie verbringen den Großteil Ihres Alltags im Wechselspiel zwischen Alarm, Reizüberflutung und abrupter Erschöpfungslähmung (Freeze).",
      fr: "Votre système nerveux tourne dans une micro-fenêtre ultra-réduite. Vous passez le plus clair de vos journées à osciller entre surtension nerveuse (panique, irritabilité) et effondrement physique brutal (épuisement, brouillard mental).",
      es: "Tu sistema nervioso opera en una micro-ventana diminuta. Pasas la mayor parte de tu vida alternando entre hiperactivación (pánico, irritabilidad, sobrecarga) y colapso dorsal inmediato (agotamiento, vacío y desconexión)."
    },
    neurobiology: {
      en: "The ventral vagal 'social engagement system' is largely offline. Neuroception constantly detects threat, forcing the autonomic branches into defensive lock: sympathetic surge followed by severe dorsal vagal energy shutdown.",
      id: "Sistem keterlibatan sosial ventral vagal jarang aktif. Neurosepsi tubuh terus mendeteksi ancaman bawah sadar, memicu lonjakan simpatis liar yang diikuti penutupan energi total dorsal vagal.",
      de: "Das ventro-vagale soziale Bindungssystem ist weitgehend inaktiv. Die Neurozeption wittert überall Gefahr, was den Körper in Verteidigungsmuster zwingt: Alarm gefolgt von totalem Shutdown.",
      fr: "Le système d'engagement social ventral vagal est quasi inactif. La neuroception perçoit un danger omniprésent, enfermant l'organisme dans un cycle de panique défensive puis de verrouillage dorsal.",
      es: "El sistema de conexión social ventral vagal está casi apagado. La neurocepción detecta amenazas continuas, forzando al cuerpo a picos de alerta extrema seguidos de apagones energéticos dorsales."
    },
    actionProtocol: {
      en: [
        "Shift from cognitive talk therapy to bottom-up somatic safety: weighted blankets, warm baths, and bilateral butterfly tapping.",
        "Eliminate high-potency caffeine, disruptive sensory inputs, and aggressive newsfeeds.",
        "Use Nuju voice journaling strictly for gentle somatic orientation ('Right now, in this room, I see 3 blue objects and my feet touch warm carpet')."
      ],
      id: [
        "Beralih dari analisis logika ke rasa aman somatik (bottom-up): selimut berbobot, kompres hangat, dan butterfly hug bilateral.",
        "Hentikan konsumsi kafein tinggi, batasi lampu silau, dan hindari konsumsi berita menegangkan.",
        "Gunakan voice journal Nuju untuk orientasi somatik perlahan ('Saat ini di kamar ini, saya melihat 3 benda hijau dan napas saya melambat')."
      ],
      de: [
        "Fokus auf 'Bottom-up'-Körperarbeit legen: Gewichtsdecken, Wärme und bilaterales Schmetterlings-Tapping zur Beruhigung.",
        "Reduzieren Sie Koffein, laute Medien und überfordernde Reize drastisch.",
        "Nutzen Sie Nuju-Sprachaufnahmen rein für somatische Orientierung ('Hier im Raum sehe ich drei Dinge und meine Füße stehen stabil')."
      ],
      fr: [
        "Passez à une approche corporelle 'bottom-up' : couverture lestée, chaleur enveloppante et tapotements bilatéraux du papillon.",
        "Supprimez la caféine à forte dose et limitez les stimulations audiovisuelles agressives.",
        "Utilisez le journal vocal Nuju pour vous ré-orienter doucement dans l'espace ('En ce moment, je regarde 3 objets bleus et mes pieds sont au sol')."
      ],
      es: [
        "Prioriza el trabajo somático de base ('bottom-up'): mantas con peso, calor corporal y golpecitos bilaterales de mariposa.",
        "Elimina el exceso de cafeína y bloquea estímulos digitales agresivos o estresantes.",
        "Usa el diario de voz de Nuju únicamente para orientación sensorial presente ('Ahora mismo veo 3 objetos neutros y mis pies tocan el suelo')."
      ]
    },
    badge: {
      en: "Hypervigilant Micro-Window",
      id: "Micro-Window Hipervigilan",
      de: "Hypervigilantes Mikro-Fenster",
      fr: "Micro-Fenêtre Hypervigilante",
      es: "Micro-Ventana Hipervigilante"
    }
  },
  {
    level: "severe_autonomic_collapse",
    scoreRange: [41, 48],
    title: {
      en: "Severe Autonomic Collapse (Trauma-Constricted Reactive State)",
      id: "Kolaps Otonom Berat (Kondisi Reaktif Terkekang Trauma)",
      de: "Schwere vegetative Erschöpfung (Trauma-bedingter Dauer-Shutdown)",
      fr: "Effondrement Autonome Sévère (État Réactif Traumatique)",
      es: "Colapso Autonómico Severo (Estado Reactivo Constreñido por Trauma)"
    },
    summary: {
      en: "Your nervous system is trapped in extreme trauma dysregulation. Calm feels unsafe; any attempt to relax either triggers intense dread and panic or drops you into profound dissociation, paralysis, and bodily numbness. Your capacity to process life is fundamentally starved.",
      id: "Sistem saraf Anda terjebak dalam disregulasi trauma ekstrem. Ketenangan justru terasa berbahaya; setiap upaya rileks memicu kepanikan mendalam atau menjatuhkan Anda ke kelumpuhan mati rasa total dan disosiasi.",
      de: "Ihr Nervensystem befindet sich in einem Zustand extremer Überlastung. Ruhe fühlt sich paradoxerweise bedrohlich an. Entspannungsversuche kippen sofort in Panik oder tiefe Dissoziation und körperliche Taubheit.",
      fr: "Votre système nerveux est piégé dans une dérégulation traumatique profonde. Le calme est ressenti comme un danger ; toute tentative de lâcher-prise bascule en angoisse vive ou en anesthésie dissociative complète.",
      es: "Tu sistema nervioso se encuentra atrapado en una desregulación traumática profunda. La calma se percibe como peligro; cualquier intento de relajarte dispara pánico visceral o te sume en parálisis y disociación."
    },
    neurobiology: {
      en: "Profound autonomic exhaustion where the sympathetic nervous system and dorsal vagal shutdown are simultaneously co-contracted (like stepping on the gas pedal and the emergency handbrake at full speed), causing chronic nervous depletion.",
      id: "Keletihan otonom parah di mana sistem saraf simpatis dan dorsal vagal terpicu bersamaan (seperti menginjak pedal gas dan rem tangan darurat sekaligus pada kecepatan tinggi), menguras seluruh daya hidup.",
      de: "Akute vegetative Erschöpfung mit gleichzeitiger Ko-Kontraktion: Sympathikus und Dorsal-Vagus feuern parallel (Gas und Vollbremsung gleichzeitig), was zu maximaler nervlicher Entkräftung führt.",
      fr: "Épuisement autonome sévère caractérisé par une co-activation paradoxale : le sympathique et le vagal dorsal s'activent de front (pied sur l'accélérateur et frein à main serré à fond).",
      es: "Agotamiento autonómico profundo con co-activación simultánea: el acelerador simpático y el freno de mano dorsal actúan al mismo tiempo, agotando la vitalidad del organismo."
    },
    actionProtocol: {
      en: [
        "Prioritize trauma-informed somatic professional care (Somatic Experiencing, Brainspotting, EMDR).",
        "Never force meditation or deep stillness if it triggers panic; use gentle rhythmic rocking, slow walking, or humming.",
        "Treat your nervous system with radical gentleness: warm liquids, quiet spaces, and unpressured voice reflections in Nuju."
      ],
      id: [
        "Sangat disarankan mencari pendampingan profesional berbasis trauma (Somatic Experiencing, Brainspotting, atau EMDR).",
        "Jangan memaksa meditasi hening jika itu memicu panik; gunakan gerakan ritmis lembut seperti berjalan pelan atau berayun lembut.",
        "Perlakukan sistem saraf dengan kelembutan radikal: minuman hangat, ruangan hening, dan rekaman suara tanpa tuntutan di Nuju."
      ],
      de: [
        "Konsultieren Sie traumasensible somatische Fachbegleitung (Somatic Experiencing, EMDR, Neuroaffektive Modelle).",
        "Erzwingen Sie keine stille Meditation, wenn diese Angst triggert; sanftes Schaukeln oder langsames Gehen sind heilsamer.",
        "Behandeln Sie sich mit radikaler Sanftheit: wärmende Tees, reizfreie Räume und behutsames Entlasten über Nuju."
      ],
      fr: [
        "Consultez un thérapeute formé au psychotraumatisme corporel (Somatic Experiencing, EMDR, Intégration du Cycle de la Vie).",
        "Ne forcez jamais la méditation immobile si elle réveille l'angoisse ; privilégiez le balancement doux ou la marche lente.",
        "Accordez-vous une douceur radicale : boissons chaudes, environnement feutré et dépôts vocaux apaisants dans Nuju."
      ],
      es: [
        "Busca apoyo profesional especializado en trauma somático (Somatic Experiencing, EMDR o Brainspotting).",
        "No fuerces la meditación en silencio si desata pánico; utiliza balanceo suave rítmico o caminatas lentas.",
        "Trata a tu sistema con ternura radical: líquidos calientes, espacios serenos y desahogo por voz sin juicios en Nuju."
      ]
    },
    badge: {
      en: "Trauma-Constricted State",
      id: "Kondisi Terkekang Trauma",
      de: "Trauma-belasteter Zustand",
      fr: "État Traumatique Constrictif",
      es: "Estado Constreñido por Trauma"
    }
  }
];

export const WINDOW_OF_TOLERANCE_SUBSCALE_INFO = {
  hyperarousal: {
    name: {
      en: "Sympathetic Hyperarousal (Fight/Flight/Anxiety)",
      id: "Hiperarousal Simpatis (Fight/Flight/Kecemasan)",
      de: "Sympathische Hypererregung (Kampf/Flucht/Panik)",
      fr: "Hyperactivation Sympathique (Lutte/Fuite/Angoisse)",
      es: "Hiperactivación Simpática (Lucha/Huida/Ansiedad)"
    },
    description: {
      en: "Spikes above the window: racing heartbeat, physical tension, irritability, hypervigilance, and catastrophic thoughts.",
      id: "Lonjakan di atas window: detak jantung cepat, ketegangan otot, mudah meledak emosi, waspada berlebih, dan pikiran buruk.",
      de: "Ausschlag über das Fenster: Herzrasen, Muskelspannung, Reizbarkeit, Hypervigilanz und Katastrophengedanken.",
      fr: "Dépassement par le haut : tachycardie, tensions physiques, irritabilité, hypervigilance et scénarios catastrophes.",
      es: "Desborde superior: taquicardia, rigidez muscular, irritabilidad, hipervigilancia y catastrofismo mental."
    }
  },
  hypoarousal: {
    name: {
      en: "Dorsal Hypoarousal (Freeze/Shutdown/Numbness)",
      id: "Hipoarousal Dorsal (Freeze/Shutdown/Mati Rasa)",
      de: "Dorsale Untererregung (Erstarrung/Shutdown/Taubheit)",
      fr: "Sous-activation Dorsale (Sidération/Shutdown/Anesthésie)",
      es: "Hipoactivación Dorsal (Congelación/Shutdown/Insensibilidad)"
    },
    description: {
      en: "Drops below the window: heavy exhaustion, mental fog, emotional numbness, couch-lock paralysis, and dissociation.",
      id: "Jatuh di bawah window: kelelahan lemas, kabut pikiran, perasaan hampa mati rasa, kelumpuhan aksi, dan disosiasi.",
      de: "Absturz unter das Fenster: bleierne Erschöpfung, Gehirnnebel, emotionale Taubheit und dissoziative Starre.",
      fr: "Effondrement sous la fenêtre : fatigue écrasante, brouillard mental, indifférence affective et paralysie motrice.",
      es: "Caída inferior: fatiga aplastante, mente nublada, anestesia emocional, parálisis en el sofá y disociación."
    }
  },
  narrow_capacity: {
    name: {
      en: "Narrow Window Fragility & Rapid Cycling",
      id: "Kerapuhan Micro-Window & Siklus Cepat",
      de: "Mikro-Fenster-Fragilität & Rasche Zyklen",
      fr: "Fragilité de la Fenêtre & Cycles Rapides",
      es: "Fragilidad de Micro-Ventana y Ciclos Rápidos"
    },
    description: {
      en: "Paper-thin margin of safety: minor triggers easily cause dysregulation, slow recovery time, and extreme ping-ponging.",
      id: "Batas toleransi setipis kertas: pemicu kecil memicu disregulasi instan, pemulihan lambat, dan ayunan emosi ekstrem.",
      de: "Hauchdünne Toleranzmarge: kleinste Anlässe lösen Krisen aus, langsame Regeneration und heftiges Pendeln.",
      fr: "Marge de sécurité minime : déclencheurs futiles, récupération très lente et effet yoyo épuisant.",
      es: "Margen de tolerancia finísimo: estresores leves causan caos, recuperación lenta y oscilaciones extremas."
    }
  }
};

export function getWindowOfToleranceResult(totalScore: number): WindowOfToleranceResultLevel {
  const matched = WINDOW_OF_TOLERANCE_RESULTS.find(
    (lvl) => totalScore >= lvl.scoreRange[0] && totalScore <= lvl.scoreRange[1]
  );
  return matched || WINDOW_OF_TOLERANCE_RESULTS[WINDOW_OF_TOLERANCE_RESULTS.length - 1];
}

export function calculateWindowOfToleranceSubscales(answers: Record<number, number>): {
  hyperarousal: number;
  hypoarousal: number;
  narrow_capacity: number;
} {
  let hyperarousal = 0;
  let hypoarousal = 0;
  let narrow_capacity = 0;

  WINDOW_OF_TOLERANCE_QUESTIONS.forEach((q) => {
    const val = answers[q.id] || 0;
    if (q.subscale === "hyperarousal") hyperarousal += val;
    if (q.subscale === "hypoarousal") hypoarousal += val;
    if (q.subscale === "narrow_capacity") narrow_capacity += val;
  });

  return { hyperarousal, hypoarousal, narrow_capacity };
}
