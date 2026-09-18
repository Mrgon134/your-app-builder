export type SensorimotorCardLang = "en" | "id" | "de" | "fr" | "es";

export interface SensorimotorQuestion {
  id: number;
  subscale:
    | "sensorimotor_fixation"
    | "loss_of_autopilot_dread"
    | "compulsive_distraction_strain";
  text: Record<SensorimotorCardLang, string>;
}

export interface SensorimotorResultLevel {
  level:
    | "calm_biological_autopilot"
    | "mild_somatic_awareness"
    | "moderate_sensorimotor_friction"
    | "severe_sensorimotor_lock_in"
    | "acute_hyperawareness_paralysis";
  scoreRange: [number, number];
  title: Record<SensorimotorCardLang, string>;
  badge: Record<SensorimotorCardLang, string>;
  summary: Record<SensorimotorCardLang, string>;
  psychology: Record<SensorimotorCardLang, string>;
  actionProtocol: Record<SensorimotorCardLang, string[]>;
}

export const SENSORIMOTOR_QUESTIONS: SensorimotorQuestion[] = [
  // 1. Sensorimotor Fixation
  {
    id: 1,
    subscale: "sensorimotor_fixation",
    text: {
      en: "My conscious attention suddenly 'locks onto' my breathing, forcing me to breathe manually and feel unable to return to automatic rhythm.",
      id: "Kesadaran pikiranku mendadak 'terkunci' pada tarikan napas, memaksaku bernapas secara manual dan merasa tidak bisa kembali bernapas otomatis.",
      de: "Meine Aufmerksamkeit bleibt plötzlich an meiner Atmung hängen; ich muss manuell atmen und fürchte, den Automatikmodus zu verlieren.",
      fr: "Mon attention se bloque soudainement sur ma respiration, me forçant à respirer manuellement sans pouvoir retrouver le réflexe automatique.",
      es: "Mi atención consciente se queda 'atrapada' en mi respiración, obligándome a respirar manualmente sin poder volver al piloto automático.",
    },
  },
  // 2. Loss of Autopilot Dread
  {
    id: 2,
    subscale: "loss_of_autopilot_dread",
    text: {
      en: "I experience intense panic thinking: 'What if I am trapped focusing on my swallowing, blinking, or breathing for the rest of my life?'",
      id: "Aku merasakan panik hebat membayangkan: 'Bagaimana jika aku terjebak memperhatikan caraku menelan, berkedip, atau bernapas selamanya?'",
      de: "Mich überkommt Panik bei dem Gedanken: 'Was, wenn ich mich für immer auf mein Schlucken, Blinzeln oder Atmen konzentrieren muss?'",
      fr: "Je panique en pensant : 'Et si j'étais condamné(e) à surveiller ma déglutition ou mon clignement d'yeux pour le reste de ma vie ?'",
      es: "Siento un pánico agudo pensando: '¿Y si me quedo atrapado vigilando cómo trago, parpadeo o respiro para siempre?'",
    },
  },
  // 3. Compulsive Distraction Strain
  {
    id: 3,
    subscale: "compulsive_distraction_strain",
    text: {
      en: "I frantically try to distract myself (blaring music, scrolling phones, talking loudly) just to un-focus from my internal bodily processes.",
      id: "Aku panik mencari distraksi (menyetel musik kencang, main HP, bicara keras) hanya demi mengalihkan pikiran dari sensasi tubuh internal.",
      de: "Ich versuche krampfhaft mich abzulenken (laute Musik, Smartphone), nur um die Wahrnehmung meiner Körpervorgänge loszuwerden.",
      fr: "Je cherche désespérément à me distraire (musique forte, téléphone) uniquement pour décrocher mon attention de mon corps.",
      es: "Trato desesperadamente de distraerme (música fuerte, móvil) solo para apartar la atención de mis sensaciones biológicas.",
    },
  },
  // 4. Sensorimotor Fixation
  {
    id: 4,
    subscale: "sensorimotor_fixation",
    text: {
      en: "I become obsessively aware of the saliva in my mouth, feeling compelled to swallow repeatedly until my throat aches.",
      id: "Aku terlalu menyadari air liur di mulutku, merasa terdorong menelan berulang-ulang hingga tenggorokanku pegal.",
      de: "Ich fixiere mich zwanghaft auf den Speichelfluss im Mund und schlucke so oft hintereinander, bis der Hals schmerzt.",
      fr: "Je deviens obnubilé(e) par la salive dans ma bouche, obligé(e) d'avaler sans arrêt jusqu'à en avoir mal à la gorge.",
      es: "Me obsesiono con la saliva en mi boca y siento la necesidad compulsiva de tragar repetidamente hasta que me duele la garganta.",
    },
  },
  // 5. Loss of Autopilot Dread
  {
    id: 5,
    subscale: "loss_of_autopilot_dread",
    text: {
      en: "I dread quiet environments, meditation, or trying to fall asleep because silence immediately triggers hyperawareness of my heartbeat or breathing.",
      id: "Aku takut suasana sunyi, meditasi, atau hendak tidur karena keheningan langsung memicu fokus berlebih pada detak jantung atau napasku.",
      de: "Ich fürchte Stille, Meditation oder das Einschlafen, weil Ruhe sofort die Hyperfokussierung auf Puls oder Atmung auslöst.",
      fr: "Je redoute le silence, la méditation ou le coucher car le calme déclenche instantanément l'hyper-focalisation sur mon cœur ou mon souffle.",
      es: "Temo el silencio, la meditación o acostarme a dormir porque la quietud dispara de inmediato la hiperatención a mis latidos o respiración.",
    },
  },
  // 6. Compulsive Distraction Strain
  {
    id: 6,
    subscale: "compulsive_distraction_strain",
    text: {
      en: "The mental effort of trying NOT to think about my breathing or blinking leaves me mentally exhausted, irritable, and drained.",
      id: "Usaha keras untuk 'TIDAK memikirkan' napas atau kedipan mata membuatku sangat lelah secara mental, mudah emosi, dan terkuras.",
      de: "Die krampfhafte Anstrengung, NICHT an mein Blinzeln oder Atmen zu denken, erschöpft mich geistig völlig.",
      fr: "L'effort mental déployé pour NE PAS penser à mon clignement d'yeux ou ma respiration m'épuise et me rend irritable.",
      es: "El esfuerzo mental agotador de intentar NO pensar en mi parpadeo o respiración me deja exhausto e irritable.",
    },
  },
  // 7. Sensorimotor Fixation
  {
    id: 7,
    subscale: "sensorimotor_fixation",
    text: {
      en: "I fixate on where my tongue is resting in my mouth, feeling uncomfortable or like it does not fit properly between my teeth.",
      id: "Aku terobsesi memperhatikan posisi lidah di dalam mulut, merasa posisinya tidak nyaman atau seolah tidak pas di antara gigi.",
      de: "Ich fixiere mich auf die Position meiner Zunge im Mund und empfinde sie als störend, unpassend oder beengt.",
      fr: "Je focalise sur la position de ma langue dans ma bouche, la trouvant gênante ou mal positionnée entre mes dents.",
      es: "Me fijo obsesivamente en dónde descansa mi lengua en la boca, sintiéndola incómoda o fuera de lugar.",
    },
  },
  // 8. Loss of Autopilot Dread
  {
    id: 8,
    subscale: "loss_of_autopilot_dread",
    text: {
      en: "I worry that consciously controlling my biological processes will cause me to suffocate, choke, or suffer cardiac arrest.",
      id: "Aku khawatir bahwa mengontrol napas secara sadar akan membuatku kehabisan oksigen, tersedak, atau mengalami henti jantung.",
      de: "Ich habe Angst, dass meine bewusste Atemkontrolle zu Sauerstoffmangel, Ersticken oder Herzproblemen führt.",
      fr: "J'ai peur que le contrôle conscient de mes fonctions vitales ne provoque un étouffement ou un arrêt respiratoire.",
      es: "Me angustia la idea de que controlar voluntariamente mi respiración me haga ahogarme o sufrir un fallo cardíaco.",
    },
  },
  // 9. Compulsive Distraction Strain
  {
    id: 9,
    subscale: "compulsive_distraction_strain",
    text: {
      en: "During conversations or at work, I lose track of what people are saying because 80% of my brain is trapped monitoring my body.",
      id: "Saat mengobrol atau bekerja, aku kehilangan fokus pada ucapan orang lain karena 80% otakku tersandera memantau tubuhku sendiri.",
      de: "In Gesprächen oder bei der Arbeit verpasse ich Inhalte, weil 80 % meines Gehirns mit Körperüberwachung blockiert sind.",
      fr: "Pendant les réunions ou discussions, je perds le fil car mon esprit est accaparé par la surveillance de mon propre corps.",
      es: "En reuniones o charlas pierdo el hilo de lo que dicen porque mi mente está secuestrada monitoreando mi cuerpo.",
    },
  },
  // 10. Sensorimotor Fixation
  {
    id: 10,
    subscale: "sensorimotor_fixation",
    text: {
      en: "I notice every eye floater, visual pulse, or blink interval, feeling unable to look at screens or reading text naturally.",
      id: "Aku memperhatikan setiap bintik terbang (eye floater) atau interval kedipan mata, hingga kesulitan menatap layar atau membaca wajar.",
      de: "Ich achte auf 'Mouches volantes' im Auge oder das Blinzeln und kann kaum noch entspannt auf Bildschirme schauen.",
      fr: "Je remarque chaque corps flottant visuel ou intervalle de clignement, incapable de lire un écran normalement.",
      es: "Noto cada mota flotante en mis ojos o el ritmo de parpadeo, resultándome imposible mirar pantallas con normalidad.",
    },
  },
  // 11. Loss of Autopilot Dread
  {
    id: 11,
    subscale: "loss_of_autopilot_dread",
    text: {
      en: "When friends tell me 'just stop thinking about it,' the urge and anxiety intensify tenfold.",
      id: "Ketika teman berkata 'jangan dipikirin, cuek aja,' dorongan dan kepanikan di kepalaku justru melonjak sepuluh kali lipat.",
      de: "Wenn andere sagen 'Denk doch einfach nicht dran', explodieren der Zwang und die Panik erst recht.",
      fr: "Quand on me dit 'arrête d'y penser', l'angoisse et la fixation se multiplient instantanément par dix.",
      es: "Cuando alguien me dice 'simplemente no pienses en eso', la ansiedad y el bucle obsesivo se multiplican por diez.",
    },
  },
  // 12. Compulsive Distraction Strain
  {
    id: 12,
    subscale: "compulsive_distraction_strain",
    text: {
      en: "I have avoided social outings, cinema, or reading books because being trapped with my bodily awareness feels unbearable.",
      id: "Aku pernah menghindari pergi jalan-jalan, bioskop, atau membaca buku karena merasa tidak tahan terjebak dengan kesadaran tubuhku.",
      de: "Ich meide Kino, soziale Events oder Lesen, weil das 'Gefangensein im eigenen Körper' unerträglich wirkt.",
      fr: "J'ai évité le cinéma ou des sorties entre amis car me retrouver prisonnier(e) de mes sensations corporelles m'est insupportable.",
      es: "He evitado ir al cine o reuniones sociales porque sentirme atrapado en mis sensaciones corporales se vuelve insufrible.",
    },
  },
];

export const SENSORIMOTOR_RESULTS: SensorimotorResultLevel[] = [
  {
    level: "calm_biological_autopilot",
    scoreRange: [0, 8],
    title: {
      en: "Calm Biological Autopilot & Somatic Trust",
      id: "Autopilot Biologis Tenang & Kepercayaan Somatik",
      de: "Ruhiger Biologischer Autopilot & Somatisches Vertrauen",
      fr: "Pilote Automatique Paisible & Confiance Somatique",
      es: "Piloto Automático Calmo & Confianza Biológica Plena",
    },
    badge: {
      en: "Autopilot Harmony",
      id: "Harmoni Autopilot",
      de: "Natürlicher Fluss",
      fr: "Flux Naturel",
      es: "Flujo Natural",
    },
    summary: {
      en: "Your autonomic nervous system operates smoothly beneath conscious awareness. You naturally allow your breathing, blinking, and swallowing to regulate themselves without catastrophic fixation or panic.",
      id: "Sistem saraf otonommu bekerja harmonis di bawah alam sadar. Kamu secara alami membiarkan napas, kedipan mata, dan refleks menelan berjalan sendiri tanpa kepanikan obsesif.",
      de: "Ihr vegetatives Nervensystem arbeitet reibungslos im Hintergrund. Atmung, Schlucken und Blinzeln regulieren sich völlig unbeschwert von selbst.",
      fr: "Votre système nerveux autonome fonctionne en arrière-plan sans heurt. Votre corps régule son souffle et ses réflexes en toute liberté.",
      es: "Tu sistema nervioso autónomo funciona en perfecta armonía. Permites que la respiración y el parpadeo se autorregulen sin angustia.",
    },
    psychology: {
      en: "In Dr. David Veale's Cognitive-Behavioral framework for Sensorimotor OCD, your brain displays healthy cognitive permeability. Bodily sensations enter awareness briefly and exit smoothly without triggering threat appraisals.",
      id: "Dalam kerangka Dr. David Veale untuk Sensorimotor OCD, otakmu memiliki permeabilitas kognitif yang sehat: sensasi tubuh disadari sekilas lalu lepas kembali tanpa dianggap ancaman.",
      de: "Nach Dr. David Veale bewertet Ihr Gehirn sensorische Körpersignale als neutral und lässt sie ungehindert vorbeiziehen.",
      fr: "Selon Dr David Veale, votre cerveau laisse passer les sensations corporelles sans chercher à les contrôler.",
      es: "Según el modelo de David Veale, tu cerebro no hiperfocaliza en las funciones vegetativas y las deja fluir con naturalidad.",
    },
    actionProtocol: {
      en: [
        "Continue engaging in deep, absorbing creative hobbies and physical activities.",
        "When you occasionally notice your breathing, simply greet it with friendly curiosity and let it drift.",
        "Maintain balanced sleep and hydration to support autonomic equilibrium.",
      ],
      id: [
        "Lanjutkan aktivitas fisik dan hobi kreatif yang menyita konsentrasi secara alami.",
        "Saat sesekali menyadari tarikan napas, sambut dengan tenang tanpa memaksakan kontrol.",
        "Jaga tidur dan hidrasi yang cukup untuk mendukung keseimbangan saraf otonom.",
      ],
      de: [
        "Pflegen Sie weiterhin vertiefende Hobbys und sportliche Betätigung.",
        "Betrachten Sie gelegentliche Wahrnehmung von Atmung gelassen und ohne Wertung.",
        "Achten Sie auf ausgewogenen Schlaf zur Stärkung des autonomen Nervensystems.",
      ],
      fr: [
        "Poursuivez vos activités créatives et physiques enrichissantes.",
        "Si vous remarquez votre souffle, accueillez-le avec bienveillance et laissez-le voguer.",
        "Préservez votre équilibre veille-sommeil.",
      ],
      es: [
        "Mantén actividades creativas y ejercicio que absorban tu atención.",
        "Si notas tu respiración de vez en cuando, obsérvala con calma sin forzarla.",
        "Cuida tu descanso para mantener el equilibrio del sistema autónomo.",
      ],
    },
  },

  {
    level: "mild_somatic_awareness",
    scoreRange: [9, 16],
    title: {
      en: "Mild Sensorimotor Self-Awareness",
      id: "Kesadaran Sensorimotor Ringan",
      de: "Leichte Sensorimotorische Wachheit",
      fr: "Sensibilité Somatosensorielle Légère",
      es: "Sensibilidad Somatosensorial Leve",
    },
    badge: {
      en: "Somatic Curiosity",
      id: "Rasa Ingin Tahu Somatik",
      de: "Leicht Fokussiert",
      fr: "Conscience Corporelle",
      es: "Atención Somática",
    },
    summary: {
      en: "You periodically get trapped in temporary loops of manual breathing or swallowing awareness, especially when falling asleep, feeling anxious, or reading about health. However, you reliably drift back to normal focus.",
      id: "Kamu sesekali terjebak memperhatikan napas manual atau cara menelan saat hendak tidur atau saat lelah. Namun, perhatianmu dapat kembali wajar dengan sendirinya.",
      de: "Beim Einschlafen oder unter Anspannung achten Sie zeitweise bewusst auf Ihre Atmung. Sie finden jedoch bald wieder in den Alltag zurück.",
      fr: "Il vous arrive de prêter trop attention à votre respiration au moment de dormir, mais vous parvenez à vous endormir sans angoisse majeure.",
      es: "A veces caes en la atención manual de tu respiración antes de dormir o con estrés, pero recuperas la calma sin mayor complicación.",
    },
    psychology: {
      en: "This reflects transient interoceptive hyper-vigilance under baseline stress. While uncomfortable, your brain still recognizes that the brainstem respiratory center cannot 'forget' how to breathe.",
      id: "Ini adalah kewaspadaan interoseptif sementara akibat stres. Batang otakmu tetap mengendalikan fungsi vital secara permanen tanpa terpengaruh pikiran sadar.",
      de: "Vorübergehende sensorische Wachheit. Ihr Stammhirn steuert lebenswichtige Reflexe absolut zuverlässig weiter.",
      fr: "Une écoute corporelle accrue due à la fatigue. Le tronc cérébral gère automatiquement vos fonctions vitales.",
      es: "Hipervigilancia transitoria por fatiga. El tronco encefálico nunca olvida cómo respirar por sí mismo.",
    },
    actionProtocol: {
      en: [
        "Avoid fighting the sensation: remind yourself, 'My brainstem has kept me alive for years; it will breathe for me.'",
        "Engage external auditory attention: listen to textured ambient soundscapes or audiobooks.",
        "Use Nuju voice journaling before bed to offload daytime stress before it somatizes.",
      ],
      id: [
        "Jangan melawan sensasi: ingatlah, 'Batang otakku telah bernapas jutaan kali secara otomatis tanpa butuh izin pikiranku.'",
        "Alihkan fokus ke suara luar: dengarkan soundscape alam atau buku audio.",
        "Gunakan jurnal suara Nuju sebelum tidur untuk mengurai beban pikiran harian.",
      ],
      de: [
        "Kämpfen Sie nicht gegen die Aufmerksamkeit an: Ihr Gehirn atmet vollautomatisch weiter.",
        "Nutzen Sie äußere akustische Reize wie beruhigende Naturklänge.",
        "Sprechen Sie abendliche Grübeleien in Nuju ein, um den Kopf zu befreien.",
      ],
      fr: [
        "Ne luttez pas contre la pensée : votre tronc cérébral gère le souffle sans interruption.",
        "Écoutez des paysages sonores immersifs pour externaliser l'attention.",
        "Déposez vos pensées dans Nuju avant de dormir.",
      ],
      es: [
        "No pelees contra la sensación: tu cerebro respira solo sin necesidad de permiso consciente.",
        "Usa estímulos auditivos externos como sonidos relajantes de la naturaleza.",
        "Graba una nota de voz en Nuju para descargar la tensión antes de dormir.",
      ],
    },
  },

  {
    level: "moderate_sensorimotor_friction",
    scoreRange: [17, 24],
    title: {
      en: "Moderate Sensorimotor OCD Friction",
      id: "Gesekan Sensorimotor OCD Sedang",
      de: "Moderate Sensorimotorische Zwangsstörung",
      fr: "Friction Obsessionnelle Sensorimotrice Modérée",
      es: "Fricción Obsesiva Sensorimotora Moderada",
    },
    badge: {
      en: "Sensorimotor Loop",
      id: "Loop Sensorimotor",
      de: "Zwangsschleife",
      fr: "Boucle Somatique",
      es: "Bucle Somático",
    },
    summary: {
      en: "Automatic biological functions frequently feel 'locked into manual control.' You spend significant energy trying to force your attention away from swallowing, blinking, or breathing, triggering exhaustion and dread.",
      id: "Fungsi biologis otomatis sering terasa 'terkunci pada kontrol manual'. Kamu menghabiskan banyak energi memaksa pikiran lepas dari proses menelan atau bernapas, memicu kelelahan dan frustrasi.",
      de: "Körperfunktionen fühlen sich häufig 'auf Handbetrieb umgeschaltet' an. Das krampfhafte Weglenken der Aufmerksamkeit raubt viel Kraft.",
      fr: "Vos fonctions automatiques semblent bloquées en mode manuel. L'effort permanent pour détourner votre attention vous épuise.",
      es: "Sientes con frecuencia tus funciones vitales atrapadas en 'modo manual'. Luchar por desviar la atención te desgasta enormemente.",
    },
    psychology: {
      en: "Dr. Steven Phillipson describes Sensorimotor OCD as an attentional capture trap. The paradox of the 'Pink Elephant': the harder you fight to un-focus from breathing, the more threatening breathing appears to the amygdala, locking attention tighter.",
      id: "Dr. Steven Phillipson menggambarkan kondisi ini sebagai jebakan penangkapan atensi. Semakin keras kamu berusaha 'berhenti memikirkan napas', amigdala menganggap napas sebagai bahaya dan mengunci fokus semakin erat.",
      de: "Nach Dr. Steven Phillipson führt der Kampf gegen die Fixierung paradoxerweise zur Verstärkung der Wachsamkeit.",
      fr: "Selon Dr Steven Phillipson, c'est le piège de l'éléphant rose : plus vous luttez pour ne pas y penser, plus le cerveau s'y accroche.",
      es: "Según Steven Phillipson, luchar contra la fijación la alimenta: cuanto más huyes del pensamiento, más lo amplifica el cerebro.",
    },
    actionProtocol: {
      en: [
        "Radical Attentional Surrender (ERP): Allow the breathing/swallowing awareness to be present without attempting to push it away.",
        "Say to the brain: 'I am willing to breathe manually for the next 20 minutes if needed.' Surrendering eliminates the panic fuel.",
        "External Broad-Bandwidth Anchoring: Walk outdoors while counting colors, listening to ambient sounds, and touching tree bark.",
      ],
      id: [
        "Pasrah Atensi Radikal (ERP): Izinkan kesadaran bernapas atau menelan hadir tanpa berusaha mengusirnya secara paksa.",
        "Ucapkan pada diri sendiri: 'Jika harus bernapas manual 20 menit ke depan, tidak apa-apa, aku siap.' Kepasrahan ini memadamkan api panik.",
        "Jangkar Sensorik Luar: Berjalan kaki di luar ruangan sambil menghitung warna atau menyentuh tekstur pohon.",
      ],
      de: [
        "Radikale Akzeptanz (ERP): Erlauben Sie der Wahrnehmung da zu sein, ohne Fluchtversuche.",
        "Sagen Sie sich: 'Wenn ich jetzt 20 Minuten manuell atme, ist das völlig in Ordnung.'",
        "Aktivieren Sie äußere Sinne: Spazieren gehen, Farben zählen, Texturen berühren.",
      ],
      fr: [
        "Acceptation radicale (ERP) : Laissez la sensation exister sans chercher à la chasser.",
        "Dites à votre esprit : 'Si je dois respirer manuellement pendant 20 minutes, j'accepte.'",
        "Ancrage extérieur : marchez dehors en nommant les couleurs et en écoutant les bruits de la rue.",
      ],
      es: [
        "Aceptación radical (EPR): Permite que la atención esté en la respiración sin intentar expulsarla.",
        "Dite a ti mismo: 'Si tengo que respirar en manual los próximos 20 minutos, lo acepto con calma.'",
        "Anclaje sensorial externo: camina al aire libre contando colores y tocando texturas.",
      ],
    },
  },

  {
    level: "severe_sensorimotor_lock_in",
    scoreRange: [25, 31],
    title: {
      en: "Severe Sensorimotor OCD & Somatic Hyperawareness",
      id: "Sensorimotor OCD Berat & Terkunci dalam Tubuh",
      de: "Schwere Sensorimotorische Zwangsstörung & Hyperfokus",
      fr: "TOC Sensorimoteur Sévère & Hyperconscience Corporelle",
      es: "TOC Sensorimotor Severo & Hiperconciencia Corporal",
    },
    badge: {
      en: "Severe Hyperawareness",
      id: "Hiperatensi Berat",
      de: "Schwerer Hyperfokus",
      fr: "Hyperconscience Sévère",
      es: "Hiperenfoque Severo",
    },
    summary: {
      en: "You feel trapped inside your own biological machinery. Manual breathing, compulsive swallowing, or blinking awareness dominates hours of your day. You avoid silence, socializing, and sleep out of intense dread that autopilot is gone forever.",
      id: "Kamu merasa tersandera di dalam mesin biologismu sendiri. Bernapas manual, menelan air liur berulang, atau kedipan mata mendominasi harimu. Kamu takut akan keheningan dan tidur karena khawatir autopilot tubuhmu telah rusak selamanya.",
      de: "Sie fühlen sich im eigenen Körper gefangen. Zwanghaftes Atmen, Schlucken oder Blinzeln quält Sie stundenlang und macht Ruhe unerträglich.",
      fr: "Vous vous sentez prisonnier(e) de vos propres rouages corporels. Les obsessions respiratoires ou de déglutition dévorent vos journées et perturbent vos nuits.",
      es: "Te sientes atrapado dentro de tu propia maquinaria biológica. El monitoreo del aire, saliva o parpadeo consume tus días e impide el descanso.",
    },
    psychology: {
      en: "In clinical psychiatry, this represents a severe variant of OCD (Sensorimotor / Somatosensory Obsession). The prefrontal cortex is hyper-monitoring the basal ganglia's automated motor loops. Specialized ERP therapy (Exposure and Response Prevention) is required to restore habituation.",
      id: "Ini adalah varian OCD Sensorimotor di mana korteks prefrontal terus mengawasi lingkaran motorik otomatis basal ganglia. Terapi spesifik ERP diperlukan untuk memulihkan proses pembiasaan (habituasi).",
      de: "Ein schwerer Typus von Zwangsstörungen (Somatosensorische Zwangsstörung). Eine spezialisierte KVT mit Exposition und Reaktionsverhinderung (ERP) ist dringend ratsam.",
      fr: "Une forme clinique de TOC somatosensoriel où le cortex contrôle excessivement les automatismes des ganglions de la base. Une thérapie TCC/ERP est recommandée.",
      es: "Variante clínica de TOC somatosensorial donde la corteza prefrontal vigila sin descanso los ganglios basales. Requiere terapia cognitivo-conductual con EPR.",
    },
    actionProtocol: {
      en: [
        "Consult a licensed OCD specialist trained in ERP for Sensorimotor Obsessions (IOCDF registered).",
        "Stop all active distraction maneuvers: sit in silence and invite the breathing sensation to stay for as long as it wants.",
        "Practice Auditory Decompression in Nuju: speak aloud your fear of being trapped. Hearing your own external voice shifts neural processing from interoceptive to exteroceptive channels.",
      ],
      id: [
        "Konsultasikan dengan psikolog/terapis spesialisasi OCD dan ERP (Exposure and Response Prevention).",
        "Hentikan manuver mencari distraksi panik: duduk hening dan undang sensasi napas untuk tinggal selama ia mau.",
        "Latih Dekompresi Auditori di Nuju: bicarakan rasa takutmu dengan suara lantang ke dalam jurnal audio Nuju untuk mengalihkan sirkuit saraf dari dalam tubuh ke luar.",
      ],
      de: [
        "Konsultieren Sie einen auf Zwangsstörungen und ERP spezialisierten Therapeuten.",
        "Beenden Sie hektische Ablenkungsversuche und üben Sie gezielte Duldung der Empfindung.",
        "Sprechen Sie Ihre Ängste in Nuju laut aus, um die neuronale Verarbeitung nach außen zu verlagern.",
      ],
      fr: [
        "Consultez un thérapeute spécialisé dans les TOC somatosensoriels (TCC/ERP).",
        "Cessez les manœuvres de distraction frénétiques et pratiquez l'habituation progressive.",
        "Utilisez le journal vocal Nuju pour externaliser l'angoisse par la parole à voix haute.",
      ],
      es: [
        "Consulta con un terapeuta experto en TOC y Exposición con Prevención de Respuesta (EPR).",
        "Detén las conductas de distracción compulsiva y permite que la sensación esté presente sin juzgarla.",
        "Graba tu angustia en voz alta en Nuju para trasladar el foco neuronal de lo interno a lo externo.",
      ],
    },
  },

  {
    level: "acute_hyperawareness_paralysis",
    scoreRange: [32, 36],
    title: {
      en: "Acute Sensorimotor Paralysis & Claustrophobic Panic",
      id: "Kelumpuhan Sensorimotor Akut & Panik Klaustrofobik",
      de: "Akute Sensorimotorische Paralyse & Klaustrophobische Panik",
      fr: "Paralysie Sensorimotrice Aiguë & Panique Claustrophobique",
      es: "Parálisis Sensorimotora Aguda & Pánico Claustrofóbico Extremo",
    },
    badge: {
      en: "Sensorimotor Crisis",
      id: "Krisis Sensorimotor",
      de: "Akuter Notstand",
      fr: "Crise Somatique Aiguë",
      es: "Crisis Sensorimotora",
    },
    summary: {
      en: "You are experiencing acute psychological agony. The sensation of being trapped in your breathing, swallowing, or blinking has triggered severe insomnia, panic attacks, and despair. You feel unable to live a normal life under this continuous mental siege.",
      id: "Kamu berada dalam penderitaan psikologis akut. Rasa tersandera oleh napas atau kedipan mata sendiri telah memicu insomnia parah, serangan panik, dan rasa putus asa mendalam.",
      de: "Sie befinden sich in einem seelischen Ausnahmezustand. Die ständige Fixierung auf die eigene Atmung raubt Ihnen den Schlaf und löst Panikattacken aus.",
      fr: "Vous traversez une détresse aiguë insupportable. L'obsession du souffle et des réflexes provoque insomnies sévères et crises de panique.",
      es: "Atraviesas un sufrimiento psicológico extremo. La sensación de asfixia o control perpetuo provoca insomnio destructivo y desesperación.",
    },
    psychology: {
      en: "This extreme tier requires urgent multimodal psychiatric and psychotherapeutic intervention. The nervous system has entered an agonizing hyper-vigilant claustrophobic loop where the patient feels claustrophobic inside their own skull and body.",
      id: "Kondisi krisis ini memerlukan bantuan psikiatri dan psikoterapi intensif. Sistem saraf telah masuk ke dalam lingkaran klaustrofobik di mana kamu merasa terjebak di dalam tengkorak dan tubuhmu sendiri.",
      de: "Hier ist sofortige fachärztliche Unterstützung geboten, um das Nervensystem medikamentös und therapeutisch zu entlasten.",
      fr: "Une prise en charge médicale urgente est nécessaire pour apaiser l'hyper-excitation du système nerveux.",
      es: "Requiere atención psiquiátrica y terapéutica urgente para reducir la sobreexcitación del sistema nervioso.",
    },
    actionProtocol: {
      en: [
        "Immediate Medical/Psychiatric Consultation: Reach out to a psychiatrist or specialized OCD center today.",
        "Mammalian Dive Reflex Reset: Plunge face in ice water for 30 seconds to break acute somatic panic.",
        "Designated Somatic Discharge: Speak your raw screaming panic into Nuju's zero-knowledge encrypted audio sanctuary without self-censorship.",
      ],
      id: [
        "Segera hubungi psikiater atau klinik spesialisasi kesehatan mental/OCD hari ini.",
        "Reset Mammalian Dive Reflex: Celupkan wajah ke dalam air es selama 30 detik untuk memutus badai adrenalin.",
        "Lepaskan Kepanikan Lewat Suara: Tumpahkan seluruh tangisan dan teriakan panikmu ke brankas suara aman Nuju.",
      ],
      de: [
        "Wenden Sie sich unverzüglich an eine psychiatrische Fachklinik oder Ambulanz.",
        "Tauchen Sie das Gesicht in eiskaltes Wasser (Tauchreflex zur Nervenberuhigung).",
        "Nutzen Sie Nuju als Audio-Zufluchtsort zur unzensierten Entladung von Panik.",
      ],
      fr: [
        "Contactez un psychiatre ou un service d'urgence médicale dès aujourd'hui.",
        "Plongez le visage dans de l'eau glacée pendant 30 secondes (réflexe d'immersion).",
        "Déversez votre panique dans le coffre-fort audio de Nuju sans filtre.",
      ],
      es: [
        "Acude de inmediato a un centro de salud mental o especialista en psiquiatría.",
        "Aplica agua helada en el rostro durante 30 segundos (reflejo de inmersión mamífero).",
        "Descarga tu pánico en el santuario de audio seguro de Nuju para liberar adrenalina.",
      ],
    },
  },
];

export const SENSORIMOTOR_OPTIONS = [
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
      id: "Sering / Sedang (2 poin)",
      de: "Oft / Mäßig (2 Pkt.)",
      fr: "Souvent / Modérément (2 pts)",
      es: "A menudo / Moderado (2 pts)",
    },
  },
  {
    value: 3,
    label: {
      en: "Almost Constantly / Severely (3 pts)",
      id: "Hampir Selalu / Sangat Berat (3 poin)",
      de: "Fast ständig / Schwer (3 Pkt.)",
      fr: "Presque constamment / Sévèrement (3 pts)",
      es: "Casi constantemente / Grave (3 pts)",
    },
  },
];

export const SENSORIMOTOR_SUBSCALE_INFO = {
  sensorimotor_fixation: {
    name: {
      en: "Sensorimotor Lock-In & Biological Fixation",
      id: "Keterkuncian Sensorimotor & Fiksasi Biologis",
      de: "Sensorimotorische Fixierung & Körperfokus",
      fr: "Fixation Somatosensorielle & Verrouillage",
      es: "Fijación Sensorimotora & Bloqueo Consciente",
    },
    description: {
      en: "Conscious attention hyper-focusing on automatic bodily processes (manual breathing, swallowing, blinking, tongue position).",
      id: "Fokus pikiran terkunci pada proses biologis otomatis tubuh (napas manual, menelan, berkedip, posisi lidah).",
      de: "Zwanghafter Hyperfokus auf vegetative Reflexe wie Atmung, Schlucken und Blinzeln.",
      fr: "Attention rivée sur les automatismes corporels (respiration manuelle, déglutition, clignement).",
      es: "Atención consciente fijada en funciones automáticas (respiración forzada, saliva, parpadeo).",
    },
  },
  loss_of_autopilot_dread: {
    name: {
      en: "Loss of Autopilot Dread & Claustrophobic Panic",
      id: "Ketakutan Kehilangan Autopilot & Panik Klaustrofobik",
      de: "Panik vor Verlust des Automatikmodus",
      fr: "Peur de Perdre le Pilote Automatique",
      es: "Pánico a Perder el Piloto Automático",
    },
    description: {
      en: "Catastrophic terror of being trapped in manual biological control forever, fearing suffocation or choking.",
      id: "Ketakutan katastrofik bahwa kamu akan terjebak mengontrol tubuh selamanya, takut tersedak atau sesak napas.",
      de: "Katastrophisierende Angst, für immer manuell atmen zu müssen und zu ersticken.",
      fr: "Terreur panique d'être piégé(e) à vie dans le contrôle manuel de ses fonctions vitales.",
      es: "Terror catastrófico a quedarse atrapado controlando las funciones biológicas para siempre.",
    },
  },
  compulsive_distraction_strain: {
    name: {
      en: "Compulsive Distraction & Mental Exhaustion",
      id: "Distraksi Kompulsif & Kelelahan Mental",
      de: "Krampfhafte Ablenkung & Erschöpfung",
      fr: "Distraction Compulsive & Épuisement Mental",
      es: "Distracción Compulsiva & Agotamiento Mental",
    },
    description: {
      en: "Frantic mental efforts to un-focus from the body, resulting in cognitive depletion, social withdrawal, and irritability.",
      id: "Upaya keras dan panik untuk membuang fokus dari tubuh, berujung pada kelelahan kognitif dan menarik diri.",
      de: "Verzweifelte Ablenkungsversuche, die zu geistiger Erschöpfung und sozialem Rückzug führen.",
      fr: "Tentatives effrénées pour chasser la pensée, menant à un épuisement psychique intense.",
      es: "Lucha mental desesperada por desviar la atención, provocando fatiga extrema y aislamiento.",
    },
  },
};

export function getSensorimotorResult(totalScore: number): SensorimotorResultLevel {
  const clamped = Math.max(0, Math.min(36, totalScore));
  return (
    SENSORIMOTOR_RESULTS.find(
      (r) => clamped >= r.scoreRange[0] && clamped <= r.scoreRange[1]
    ) || SENSORIMOTOR_RESULTS[0]
  );
}

export function calculateSensorimotorSubscales(answers: Record<number, number>): {
  sensorimotor_fixation: number;
  loss_of_autopilot_dread: number;
  compulsive_distraction_strain: number;
} {
  let sf = 0;
  let ad = 0;
  let cd = 0;

  SENSORIMOTOR_QUESTIONS.forEach((q) => {
    const score = answers[q.id] ?? 0;
    if (q.subscale === "sensorimotor_fixation") sf += score;
    if (q.subscale === "loss_of_autopilot_dread") ad += score;
    if (q.subscale === "compulsive_distraction_strain") cd += score;
  });

  return {
    sensorimotor_fixation: sf,
    loss_of_autopilot_dread: ad,
    compulsive_distraction_strain: cd,
  };
}
