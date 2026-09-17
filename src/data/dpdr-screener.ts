export type DpdrLang = "en" | "id" | "de" | "fr" | "es";

export interface DpdrQuestion {
  id: number;
  category: "depersonalization" | "derealization" | "cognitive_blunting";
  prompt: Record<DpdrLang, string>;
  subtext?: Record<DpdrLang, string>;
}

export interface DpdrResultLevel {
  level: "grounded" | "transient" | "moderate" | "severe";
  scoreRange: [number, number];
  badge: Record<DpdrLang, string>;
  title: Record<DpdrLang, string>;
  summary: Record<DpdrLang, string>;
  neurobiology: Record<DpdrLang, string>;
  actionProtocol: Record<DpdrLang, string[]>;
  colorScheme: {
    badge: string;
    border: string;
    text: string;
    bg: string;
  };
}

export const DPDR_QUESTIONS: DpdrQuestion[] = [
  {
    id: 1,
    category: "depersonalization",
    prompt: {
      en: "Do you ever feel like an outside observer watching your own body move, speak, or work as if you were in a third-person movie?",
      id: "Pernahkah Anda merasa seperti penonton luar yang melihat tubuh Anda sendiri bergerak, berbicara, atau bekerja layaknya dalam sudut pandang orang ketiga?",
      de: "Haben Sie das Gefühl, ein externer Beobachter Ihres eigenen Körpers zu sein, als würden Sie sich selbst wie in einem Film zusehen?",
      fr: "Avez-vous parfois l'impression d'être un spectateur extérieur observant votre propre corps agir et parler comme dans un film ?",
      es: "¿Alguna vez sientes que eres un observador externo mirando tu propio cuerpo moverse y hablar como si estuvieras en una película en tercera persona?",
    },
    subtext: {
      en: "Also known as out-of-body detachment or autopiloting.",
      id: "Sering disebut sebagai pelepasan tubuh atau mode autopilot ekstrem.",
      de: "Bekannt als somatische Distanzierung oder Autopilot-Zustand.",
      fr: "Connu sous le nom de détachement corporel ou dissociation observatrice.",
      es: "Conocido como desprendimiento corporal o sensación de observador.",
    },
  },
  {
    id: 2,
    category: "depersonalization",
    prompt: {
      en: "When looking in a mirror, do your face, eyes, or hands momentarily feel unfamiliar or disconnected from your conscious sense of self?",
      id: "Saat bercermin, apakah wajah, tatapan mata, atau tangan Anda terasa asing seolah bukan milik Anda yang sesungguhnya?",
      de: "Wenn Sie in den Spiegel schauen, fühlen sich Ihr Gesicht oder Ihre Hände fremd oder vom Ich-Gefühl getrennt an?",
      fr: "En vous regardant dans un miroir, votre visage ou vos mains vous semblent-ils momentanément étrangers ou déconnectés de vous ?",
      es: "Al mirarte en un espejo, ¿tu rostro, ojos o manos se sienten momentáneamente extraños o desconectados de tu identidad?",
    },
  },
  {
    id: 3,
    category: "depersonalization",
    prompt: {
      en: "Do your voice, thoughts, or movements feel robotic, automated, or disconnected from your personal will?",
      id: "Apakah suara saat Anda berbicara atau gerakan fisik terasa mekanis, seperti robot yang bergerak tanpa keterlibatan jiwa?",
      de: "Fühlt sich Ihre Stimme oder Bewegung roboterhaft, mechanisch oder vom persönlichen Willen abgekoppelt an?",
      fr: "Votre voix ou vos mouvements vous semblent-ils robotiques, automatiques ou détachés de votre volonté consciente ?",
      es: "¿Tu propia voz o movimientos se sienten robóticos, mecánicos o desconectados de tu voluntad consciente?",
    },
  },
  {
    id: 4,
    category: "depersonalization",
    prompt: {
      en: "Do you experience moments where physical sensations (touch, temperature, pain) feel muted, distant, or delayed?",
      id: "Apakah sensasi fisik tubuh (sentuhan, suhu, rasa sakit) terkadang terasa tumpul, jauh, atau seperti terlapisi lapisan karet?",
      de: "Fühlen sich körperliche Empfindungen (Berührung, Kälte/Wärme, Schmerz) gedämpft, weit entfernt oder verzögert an?",
      fr: "Ressentez-vous des moments où les sensations physiques (toucher, température, douleur) semblent étouffées ou lointaines ?",
      es: "¿Sientes momentos donde las sensaciones físicas (tacto, temperatura, dolor) se perciben apagadas o distantes?",
    },
  },
  {
    id: 5,
    category: "derealization",
    prompt: {
      en: "Does your surroundings (room, streets, people) suddenly look flat, artificial, dreamlike, or like a 2D cardboard movie set?",
      id: "Apakah lingkungan sekitar Anda (ruangan, jalan, orang lain) tiba-tiba tampak datar, buatan, seperti mimpi, atau dekor panggung 2D?",
      de: "Wirkt Ihre Umgebung plötzlich flach, künstlich, traumartig oder wie eine Kulisse aus Pappe?",
      fr: "Votre environnement semble-t-il soudainement plat, artificiel, onirique ou comme un décor de théâtre en carton ?",
      es: "¿Tu entorno (habitaciones, calles, personas) parece de repente plano, artificial, irreal o como un set de filmación?",
    },
    subtext: {
      en: "Classic derealization visual alteration.",
      id: "Gejala khas alterasi persepsi derealisasi.",
      de: "Klassische visuelle Derealisationssymptomatik.",
      fr: "Symptôme visuel classique de déréalisation.",
      es: "Alteración visual característica de la desrealización.",
    },
  },
  {
    id: 6,
    category: "derealization",
    prompt: {
      en: "Do you feel like there is an invisible glass wall, thick fog, or veil separating you from the external world?",
      id: "Apakah Anda merasa seperti ada dinding kaca tak terlihat atau kabut tebal yang memisahkan Anda dari dunia luar?",
      de: "Haben Sie das Gefühl, eine unsichtbare Glasscheibe oder dichter Nebel trennt Sie von der Außenwelt?",
      fr: "Avez-vous la sensation qu'une vitre invisible ou un épais brouillard vous sépare du monde extérieur ?",
      es: "¿Sientes que hay una pared de cristal invisible o una niebla densa que te separa del mundo exterior?",
    },
  },
  {
    id: 7,
    category: "derealization",
    prompt: {
      en: "Do familiar places, homes, or loved ones occasionally feel eerie, strange, or unfamiliar despite intellectually knowing who they are?",
      id: "Apakah tempat yang sangat akrab atau orang terdekat kadang terasa aneh, asing, atau janggal meski logika tahu persis siapa mereka?",
      de: "Fühlen sich vertraute Orte oder geliebte Menschen unheimlich, fremd oder neu an, obwohl Sie wissen, wer sie sind (Jamais-vu)?",
      fr: "Des lieux familiers ou vos proches vous semblent-ils étranges ou méconnaissables malgré votre certitude intellectuelle (jamais-vu) ?",
      es: "¿Lugares muy familiares o seres queridos te parecen de pronto extraños o ajenos a pesar de saber perfectamente quiénes son?",
    },
  },
  {
    id: 8,
    category: "derealization",
    prompt: {
      en: "Do sounds seem unusually muffled, echoey, or as if people are speaking to you from deep underwater?",
      id: "Apakah suara orang atau kebisingan kota kadang terdengar teredam, bergema, atau seperti berasal dari dalam air?",
      de: "Klingen Stimmen oder Geräusche gedämpft, hallend oder wie aus tiefer Ferne / unter Wasser?",
      fr: "Les sons vous semblent-ils étouffés, lointains ou comme si les gens parlaient sous l'eau ?",
      es: "¿Los sonidos parecen apagados, lejanos o como si la gente hablara desde debajo del agua?",
    },
  },
  {
    id: 9,
    category: "cognitive_blunting",
    prompt: {
      en: "Do your past memories feel like scenes from a movie you watched rather than events you personally lived through?",
      id: "Apakah memori masa lalu terasa seperti rekaman film yang pernah Anda tonton, bukan kejadian nyata yang pernah Anda jalani?",
      de: "Fühlen sich vergangene Erinnerungen wie Filmszenen an, die Sie sahen, statt wie selbst erlebte Ereignisse?",
      fr: "Vos souvenirs passés vous semblent-ils être des scènes d'un film visionné plutôt que des événements vécus ?",
      es: "¿Tus recuerdos pasados se sienten como escenas de una película ajena más que como eventos vividos en carne propia?",
    },
  },
  {
    id: 10,
    category: "cognitive_blunting",
    prompt: {
      en: "Do you experience emotional numbness where you logically know you should feel joyful or sad, but feel completely flat and hollow inside?",
      id: "Apakah Anda mengalami mati rasa emosional di mana Anda tahu harusnya merasa senang atau sedih, namun dada terasa hampa dan datar?",
      de: "Erleben Sie emotionale Taubheit, bei der Sie wissen, dass Sie Freude oder Trauer fühlen sollten, innerlich aber völlig leer bleiben?",
      fr: "Ressentez-vous une anesthésie émotionnelle où vous savez que vous devriez ressentir de la joie ou de la tristesse, mais restez totalement vide ?",
      es: "¿Experimentas un entumecimiento emocional donde sabes racionalmente qué sentir, pero por dentro estás completamente plano o hueco?",
    },
  },
  {
    id: 11,
    category: "cognitive_blunting",
    prompt: {
      en: "Do you get trapped in existential obsessive loops questioning 'Am I real?', 'Is this reality?', or 'Am I going crazy'?",
      id: "Apakah Anda sering terjebak dalam pusaran overthinking eksistensial seperti 'Apakah aku nyata?', 'Apakah ini dunia nyata?', atau takut gila?",
      de: "Geraten Sie in existentielle Gedankenschleifen mit Fragen wie 'Bin ich real?', 'Ist das Wirklichkeit?' oder Angst vor Kontrollverlust?",
      fr: "Êtes-vous pris dans des boucles obsessionnelles existentielles du type 'Suis-je réel(le) ?', 'Est-ce un rêve ?' ou la peur de perdre la raison ?",
      es: "¿Te atrapas en bucles obsesivos existenciales preguntándote '¿Soy real?', '¿Es esto la realidad?' o temiendo perder el control mental?",
    },
  },
  {
    id: 12,
    category: "cognitive_blunting",
    prompt: {
      en: "Does severe mental fog make it feel like your consciousness is operating on a 2-second lag behind real-time conversation?",
      id: "Apakah brain fog parah membuat kesadaran Anda terasa tertinggal jeda 2 detik saat mengikuti percakapan langsung?",
      de: "Fühlt sich Ihr Gehirnnebel (Brain Fog) so an, als liefe Ihr Bewusstsein mit 2 Sekunden Verzögerung hinter der Realität her?",
      fr: "Le brouillard mental vous donne-t-il l'impression que votre conscience fonctionne avec un décalage de 2 secondes sur le présent ?",
      es: "¿Sientes que una densa niebla mental hace que tu conciencia funcione con un retraso de 2 segundos respecto al presente?",
    },
  },
];

export const DPDR_LEVELS: DpdrResultLevel[] = [
  {
    level: "grounded",
    scoreRange: [0, 8],
    badge: {
      en: "GROUNDED & INTEGRATED",
      id: "PRESENSI UTUH & TERHUBUNG",
      de: "GEERDET & PRÄSENT",
      fr: "ANCRAGE & PRÉSENCE",
      es: "PRESENCIA Y ARRAIGO",
    },
    title: {
      en: "Intact Sensory Integration & Reality Anchoring",
      id: "Integrasi Sensoris Utuh & Jangkar Realitas Stabil",
      de: "Intakte Sinnesintegration & Stabile Realitätsverankerung",
      fr: "Intégration Sensorielle Intacte et Ancrage Stable",
      es: "Integración Sensorial Intacta y Anclaje a la Realidad",
    },
    summary: {
      en: "Your nervous system maintains steady somatosensory coherence. You experience your thoughts, body, and surroundings as an integrated, vivid continuum without persistent perceptual disconnections.",
      id: "Sistem saraf Anda mempertahankan koherensi somatosensori yang stabil. Anda merasakan pikiran, tubuh fisik, dan lingkungan sekitar sebagai satu kesatuan nyata tanpa jurang keterpisahan.",
      de: "Ihr Nervensystem verfügt über eine stabile somatosensorische Kohärenz. Körperwahrnehmung und Außenwelt greifen nahtlos ineinander.",
      fr: "Votre système nerveux maintient une cohérence somatosensorielle robuste. Vous vivez vos sensations corporelles et votre environnement en pleine continuité.",
      es: "Tu sistema nervioso mantiene una coherencia somatosensorial sólida. Experimentas tu cuerpo, pensamientos y entorno como una realidad conectada y vívida.",
    },
    neurobiology: {
      en: "Proper functional balance between the temporoparietal junction (TPJ), insular cortex, and anterior cingulate cortex. Interoceptive signaling correctly routes sensory data to conscious presence.",
      id: "Keseimbangan fungsional antara temporoparietal junction (TPJ), korteks insula, dan anterior cingulate cortex. Sinyal interosepsi mengalir lancar mengukuhkan keberadaan sadar.",
      de: "Ausbalancierte Aktivität im temporoparietalen Übergang (TPJ) und der Insula. Interozeptive Signale werden adäquat verarbeitet.",
      fr: "Harmonie neurobiologique entre la jonction temporo-pariétale (JTP) et le cortex insulaire. Les signaux intéroceptifs ancrent le sentiment d'existence.",
      es: "Equilibrio neurológico entre la unión temporoparietal y la ínsula. Las señales interoceptivas anclan adecuadamente la experiencia presente.",
    },
    actionProtocol: {
      en: [
        "Continue periodic sensory check-ins during high-stress work weeks.",
        "Practice mindful diaphragmatic breathing to maintain vagal nerve tone.",
        "Keep a daily reflection journal to reinforce emotional vocabulary.",
      ],
      id: [
        "Lanjutkan jeda hening dan grounding sensoris singkat saat beban kerja memuncak.",
        "Pertahankan pernapasan diafragma lambat untuk merawat tonus nervus vagus.",
        "Gunakan jurnal harian untuk memperkaya artikulasi emosi.",
      ],
      de: [
        "Führen Sie kurze Sinnespausen bei stressigen Arbeitsphasen fort.",
        "Achten Sie auf tiefe Bauchatmung zur Regulierung des Vagusnervs.",
        "Nutzen Sie ein Tagebuch zur kontinuierlichen Reflexion.",
      ],
      fr: [
        "Maintenez de brefs bilans sensoriels lors des périodes d'effort intense.",
        "Pratiquez la respiration ventrale pour nourrir le nerf vague.",
        "Utilisez le journal quotidien pour verbaliser vos ressentis.",
      ],
      es: [
        "Mantén breves pausas de contacto sensorial en momentos de estrés laboral.",
        "Practica respiración diafragmática para sostener el tono vagal.",
        "Registra tus estados en un diario reflexivo regular.",
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
    level: "transient",
    scoreRange: [9, 16],
    badge: {
      en: "SITUATIONAL DEREALIZATION",
      id: "DEREALISASI SITUASIONAL RINGAN",
      de: "SITUATIVE DEREALISATION",
      fr: "DÉRÉALISATION SITUATIONNELLE",
      es: "DESREALIZACIÓN SITUACIONAL",
    },
    title: {
      en: "Stress-Induced Perceptual Fog & Sensory Fatigue",
      id: "Kabut Persepsi Akibat Beban Stres & Kelelahan Sensoris",
      de: "Stressbedingter Wahrnehmungsnebel & Reizüberflutung",
      fr: "Brouillard Perceptif lié au Stress et Fatigue Sensorielle",
      es: "Niebla Perceptiva por Estrés y Fatiga Sensorial",
    },
    summary: {
      en: "You experience episodic sensations of detachment, glass-wall perception, or spaced-out fog, typically triggered by sleep deprivation, screen burnout, intense anxiety spikes, or sensory overload.",
      id: "Anda mengalami episode keterpisahan sementara, pandangan berkabut, atau rasa melayang. Hal ini lazim dipicu oleh kurang tidur, layar berlebih, serangan panik sesaat, atau kelebihan beban sensoris.",
      de: "Sie erleben vorübergehende Entfremdungsgefühle oder Nebel, meist ausgelöst durch Schlafmangel, Bildschirmüberlastung oder akuten Stress.",
      fr: "Vous traversez des épisodes passagers de détachement ou de voile visuel, souvent déclenchés par le manque de sommeil, les écrans ou un pic d'anxiété.",
      es: "Experimentas episodios transitorios de extrañeza o niebla mental, comúnmente activados por privación de sueño, sobrecarga de pantallas o picos de ansiedad.",
    },
    neurobiology: {
      en: "Transient hyper-activation of the prefrontal cortex inhibiting the amygdala and vestibular processing centers, dampening emotional salience as a protective dampener against sensory overwhelm.",
      id: "Hiperaktivasi sesaat pada prefrontal cortex yang menekan amygdala dan pusat vestibular, meredupkan intensitas emosi sebagai mekanisme proteksi alami otak.",
      de: "Vorübergehende Dämpfung limbischer Reize durch den präfrontalen Kortex zur Vermeidung akuter Reizüberflutung.",
      fr: "Hyper-inhibition temporaire de l'amygdale par le cortex préfrontal, atténuant la vivacité sensorielle pour amortir le choc émotionnel.",
      es: "Hiperactivación prefrontal transitoria que atenúa la amígdala para proteger al cerebro de la sobreestimulación nerviosa.",
    },
    actionProtocol: {
      en: [
        "Implement the 5-4-3-2-1 sensory grounding technique immediately when fog hits.",
        "Splash cold water on face or hold ice cubes to trigger the mammalian dive reflex.",
        "Reduce screen exposure 60 minutes before bed and restore circadian rhythm.",
      ],
      id: [
        "Terapkan teknik grounding sensoris 5-4-3-2-1 begitu rasa melayang muncul.",
        "Basuh wajah dengan air es atau genggam es batu untuk merangsang refleks selam mamalia.",
        "Hentikan paparan layar gadget 60 menit sebelum tidur demi menstabilkan ritme sirkadian.",
      ],
      de: [
        "Wenden Sie die 5-4-3-2-1-Erdungstechnik an, sobald das Fremdheitsgefühl einsetzt.",
        "Kaltes Wasser ins Gesicht spritzen, um den Tauchreflex zu aktivieren.",
        "Bildschirmzeit vor dem Schlafen konsequent reduzieren.",
      ],
      fr: [
        "Appliquez la méthode d'ancrage 5-4-3-2-1 dès l'apparition du brouillard.",
        "Passez de l'eau glacée sur votre visage pour réactiver le nerf vague.",
        "Limitez l'exposition aux écrans une heure avant de dormir.",
      ],
      es: [
        "Aplica la técnica de anclaje 5-4-3-2-1 en cuanto sientas la desconexión.",
        "Lava tu rostro con agua muy fría para activar el reflejo de inmersión.",
        "Reduce pantallas una hora antes de dormir para restaurar el ritmo circadiano.",
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
    level: "moderate",
    scoreRange: [17, 26],
    badge: {
      en: "MODERATE DPDR PATTERN",
      id: "DISOSIASI DPDR MODERAT",
      de: "MODERATES DPDR-MUSTER",
      fr: "PROFIL DPDR MODÉRÉ",
      es: "PATRÓN DPDR MODERADO",
    },
    title: {
      en: "Persistent Somatosensory & Environmental Detachment",
      id: "Disosiasi Somatosensoris & Keterasingan Lingkungan Persisten",
      de: "Persistierende somatosensorische Entfremdung",
      fr: "Détachement Somato-Sensoriel et Environnemental Persistant",
      es: "Desprendimiento Somatosensorial y Ambiental Persistente",
    },
    summary: {
      en: "You frequently experience your body as automated, the world as an artificial set, or personal emotions as hollow. This persistent buffer operates as an involuntary emotional circuit breaker against chronic nervous strain.",
      id: "Anda kerap merasakan tubuh seperti bergerak otomatis, dunia tampak seperti set bioskop, atau perasaan terasa hampa. Sekat pelindung ini aktif secara otomatis sebagai pemutus sirkuit emosional terhadap stres kronis.",
      de: "Sie erleben Ihren Körper häufig wie fremdgesteuert und die Realität wie hinter einer Wand. Das Nervensystem nutzt diesen Puffer als Schutzschalter.",
      fr: "Vous ressentez fréquemment votre corps en pilotage automatique et le monde comme un décor artificiel. Votre système utilise cette coupure pour éviter l'épuisement.",
      es: "Sientes con frecuencia que tu cuerpo actúa en piloto automático y el mundo parece irreal. Este amortiguador actúa como un interruptor de emergencia frente al estrés sostenido.",
    },
    neurobiology: {
      en: "Hypo-connectivity in the anterior insula (loss of visceral gut feeling) coupled with vestibulocortical decoupling at the temporoparietal junction, creating the sensation of floating or observing oneself from outside.",
      id: "Hipokonektivitas pada insula anterior (hilangnya sensasi visceral internal) disertai disosiasi vestibulokortikal di TPJ, menciptakan sensasi melayang atau menonton diri sendiri dari luar.",
      de: "Herabgesetzte Konnektivität in der Insula führt zum Verlust des inneren Bauchgefühls; vestibuläre Entkopplung im TPJ erzeugt das Schwebegefühl.",
      fr: "Hypo-activation de l'insula antérieure et découplage vestibulo-cortical à la JTP, créant cette impression de flotter hors de son corps.",
      es: "Baja conectividad en la ínsula anterior y desacople vestibulo-cortical en la unión temporoparietal, provocando la sensación de flotación u observación externa.",
    },
    actionProtocol: {
      en: [
        "Acknowledge DPDR as a biological safety shield, not psychosis or brain damage.",
        "Engage in heavy-proprioceptive work: weighted blankets, wall sits, firm massage.",
        "Voice-journal unfiltered thoughts in Nuju to pull cognitive loops back into audio-motor reality.",
      ],
      id: [
        "Pahami bahwa DPDR adalah tameng proteksi biologis otak, bukan tanda kegilaan atau kerusakan otak.",
        "Lakukan latihan proprioseptif berat: selimut berat (weighted blanket), push-up dinding, atau pijatan kuat.",
        "Gunakan jurnal suara di Nuju untuk memindahkan overthinking melayang menjadi realitas fisik suara nyata.",
      ],
      de: [
        "Erkennen Sie an, dass DPDR ein Schutzmechanismus des Gehirns ist und keine Psychose.",
        "Nutzen Sie propriozeptive Reize: Gewichtsdecken, Wandsitz, feste Muskelmassage.",
        "Nutzen Sie Sprach-Journaling in Nuju, um Gedanken auditiv und motorisch zu erden.",
      ],
      fr: [
        "Comprenez que la DPDR est un bouclier biologique de protection, non une folie.",
        "Pratiquez des stimulations proprioceptives : couverture lestée, appuis au mur, massages fermes.",
        "Enregistrez votre voix dans Nuju pour ancrer vos boucles mentales dans la matière sonore.",
      ],
      es: [
        "Comprende que la DPDR es un escudo biológico de seguridad, no locura ni daño cerebral.",
        "Aplica estímulos propioceptivos intensos: mantas pesadas, flexiones en pared, masajes firmes.",
        "Utiliza el diario de voz en Nuju para trasladar pensamientos flotantes a la realidad del habla física.",
      ],
    },
    colorScheme: {
      badge: "bg-indigo-500/20 text-indigo-400 border-indigo-500/30",
      border: "border-indigo-500/40",
      text: "text-indigo-400",
      bg: "from-indigo-950/40 via-stone-900 to-stone-950",
    },
  },
  {
    level: "severe",
    scoreRange: [27, 36],
    badge: {
      en: "SEVERE DPDR SHUTDOWN",
      id: "STATUS DPDR DOMINAN & MENDALAM",
      de: "SCHWERE DPDR-DISSOTIATION",
      fr: "ÉTAT DE DISSOCIATION DPDR PROFOND",
      es: "DESCONEXIÓN DPDR PROFUNDA",
    },
    title: {
      en: "Profound Dissociative Shield & Sensory De-realization",
      id: "Tameng Disosiasi Mendalam & Pemutusan Realitas Kronis",
      de: "Tiefe dissoziative Entfremdung & Chronischer Schutzmodus",
      fr: "Blindage Dissociatif Profond et Rupture Perceptive Chronique",
      es: "Blindaje Disociativo Severo y Desconexión Perceptiva Crónica",
    },
    summary: {
      en: "You are experiencing profound, chronic depersonalization and derealization. You feel consistently cut off from bodily feelings, living behind a thick glass pane with severe existential panic and emotional detachment. Your nervous system is in full emergency lockdown.",
      id: "Anda mengalami kondisi depersonalisasi dan derealisasi mendalam yang berlangsung intens. Anda merasa terputus dari tubuh fisik, terkurung di balik dinding kaca, disertai ketakutan eksistensial dan mati rasa total. Sistem saraf Anda berada dalam mode proteksi darurat penuh.",
      de: "Sie erleben eine schwere, chronische Entfremdung von Körper und Welt. Das Nervensystem befindet sich in einem tiefen Schutz-Shutdown.",
      fr: "Vous traversez une dépersonnalisation-déréalisation aiguë et prolongée. Le sentiment d'être coupé du monde et de soi reflète un verrouillage d'urgence du système nerveux.",
      es: "Vives una despersonalización y desrealización profunda y constante. La sensación de vivir tras un cristal grueso con pánico existencial indica un bloqueo de emergencia absoluto.",
    },
    neurobiology: {
      en: "Sustained fronto-limbic suppression: hyper-active right prefrontal cortex actively dampening the amygdala, insula, and sensory cortices to zero emotional transmission, while autonomic dorsal vagal tone dominates.",
      id: "Supresi fronto-limbik berkepanjangan: korteks prefrontal kanan menekan amygdala, insula, dan korteks sensoris secara masif, mematikan transmisi emosi disertai dominasi saraf dorsal vagal.",
      de: "Anhaltende fronto-limbische Blockade: Überaktiver präfrontaler Kortex schaltet emotionale Zentren zur Schmerzvermeidung ab.",
      fr: "Suppression fronto-limbique sévère : le cortex préfrontal neutralise l'amygdale et l'insula pour empêcher tout débordement émotionnel.",
      es: "Supresión fronto-límbica sostenida: el córtex prefrontal bloquea la amígdala e ínsula para evitar un colapso sensorial, dominando la rama dorsal vagal.",
    },
    actionProtocol: {
      en: [
        "Cease constant googling and checking symptoms; hyper-monitoring feeds the anxiety loop.",
        "Work with a trauma-informed psychologist specializing in Somatic Experiencing or EMDR.",
        "Use tactile somatic anchoring: warm tea, feet flat on cold floor, slow hums to tone the vagus.",
        "Do not force yourself to 'feel real'; accept the fog as an overprotective bodyguard while your body rests.",
      ],
      id: [
        "Hentikan googling gejala berulang kali; kebiasaan memantau tubuh terus-menerus justru memperparah siklus cemas.",
        "Konsultasikan dengan psikolog/psikiater berorientasi trauma (Somatic Experiencing, CBT disosiasi, atau EMDR).",
        "Lakukan anchoring taktil: minum teh hangat, telapak kaki menapak di lantai dingin, humming perlahan.",
        "Jangan memaksa diri untuk 'merasa nyata'; terimalah kabut ini sebagai penjaga keamanan tubuh yang sedang bekerja keras.",
      ],
      de: [
        "Beenden Sie das ständige Googeln von Symptomen; ständiges Kontrollieren verstärkt die Panikschleife.",
        "Konsultieren Sie einen traumasensiblen Psychotherapeuten (Somatic Experiencing oder EMDR).",
        "Verwenden Sie taktile Reize: Barfuß auf kaltem Boden, warmer Tee, sanftes Summen für den Vagusnerv.",
        "Kämpfen Sie nicht gegen den Nebel an; betrachten Sie ihn als temporären Schutzschild.",
      ],
      fr: [
        "Arrêtez les recherches compulsives sur vos symptômes qui entretiennent la panique.",
        "Consultez un thérapeute spécialisé dans le trauma (Somatic Experiencing, ICV ou EMDR).",
        "Pratiquez des stimulations tactiles douces : pieds nus sur le sol frais, boisson chaude, fredonnement.",
        "Ne luttez pas contre le brouillard ; accueillez-le comme un bouclier temporaire d'un corps épuisé.",
      ],
      es: [
        "Detén la búsqueda compulsiva en internet; el hipercontrol alimenta el bucle de angustia.",
        "Acude a un psicólogo especialista en trauma (Experiencia Somática, EMDR o TCC para disociación).",
        "Utiliza anclas táctiles: pies descalzos sobre el suelo frío, infusión caliente y vibración vocal suave.",
        "No luches contra la irrealidad; considérala un guardaespaldas biológico temporal mientras te recuperas.",
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
