export type CyberchondriaCardLang = "en" | "id" | "de" | "fr" | "es";

export interface CyberchondriaQuestion {
  id: number;
  subscale:
    | "compulsive_symptom_searching_rabbit_holes"
    | "catastrophic_distress_bodily_hypervigilance"
    | "reassurance_seeking_medical_mistrust";
  text: Record<CyberchondriaCardLang, string>;
}

export interface CyberchondriaResultLevel {
  level:
    | "mindful_health_clarity"
    | "mild_curiosity_health_checking"
    | "moderate_cyberchondric_escalation"
    | "high_clinical_cyberchondria_css"
    | "severe_medical_catastrophizing_obsession";
  scoreRange: [number, number];
  title: Record<CyberchondriaCardLang, string>;
  badge: Record<CyberchondriaCardLang, string>;
  summary: Record<CyberchondriaCardLang, string>;
  psychology: Record<CyberchondriaCardLang, string>;
  actionProtocol: Record<CyberchondriaCardLang, string[]>;
}

export const CYBERCHONDRIA_QUESTIONS: CyberchondriaQuestion[] = [
  // 1. Compulsive Searching & Rabbit Holes
  {
    id: 1,
    subscale: "compulsive_symptom_searching_rabbit_holes",
    text: {
      en: "Whenever you notice a mild physical symptom (like a headache, muscle twitch, or tingling), you immediately open Google or Reddit to research potential medical causes.",
      id: "Setiap kali merasakan gejala fisik ringan (seperti pusing, kedutan otot, atau kesemutan), kamu langsung membuka Google atau Reddit untuk mencari tahu penyakit apa yang kamu derita.",
      de: "Sobald Sie ein leichtes körperliches Symptom (wie Kopfschmerz, Muskelzucken oder Kribbeln) spüren, googeln Sie sofort nach möglichen medizinischen Ursachen.",
      fr: "Dès que vous remarquez un léger symptôme physique (maux de tête, spasme musculaire ou picotement), vous ouvrez immédiatement Google ou Reddit pour chercher des causes médicales.",
      es: "En cuanto notas un síntoma físico leve (dolor de cabeza, espasmo muscular u hormigueo), buscas de inmediato en Google o Reddit posibles causas médicas.",
    },
  },
  // 2. Catastrophic Distress & Bodily Hypervigilance
  {
    id: 2,
    subscale: "catastrophic_distress_bodily_hypervigilance",
    text: {
      en: "Reading online medical articles quickly convinces you that you have a rare, life-threatening, or terminal disease (such as a brain tumor, ALS, or leukemia).",
      id: "Membaca artikel medis online langsung membuatmu yakin bahwa kamu mengidap penyakit langka atau mematikan (seperti tumor otak, ALS, atau leukemia).",
      de: "Das Lesen medizinischer Artikel überzeugt Sie schnell davon, dass Sie an einer seltenen oder tödlichen Krankheit (wie Hirntumor, ALS oder Leukämie) leiden.",
      fr: "La lecture d'articles médicaux en ligne vous persuade rapidement que vous souffrez d'une maladie rare, incurable ou mortelle (tumeur, SLA ou leucémie).",
      es: "Leer artículos médicos en internet te convence con rapidez de que padeces una enfermedad rara o terminal (como un tumor cerebral, ELA o leucemia).",
    },
  },
  // 3. Reassurance Seeking & Medical Mistrust
  {
    id: 3,
    subscale: "reassurance_seeking_medical_mistrust",
    text: {
      en: "Even after a doctor conducts laboratory tests and tells you that you are completely healthy, you suspect they missed something critical and resume searching online.",
      id: "Bahkan setelah dokter melakukan tes laboratorium dan menyatakan kamu sehat, kamu tetap curiga dokter melewatkan sesuatu yang fatal dan kembali mencari di internet.",
      de: "Selbst wenn ein Arzt nach Laboruntersuchungen Entwarnung gibt, vermuten Sie einen Behandlungsfehler und recherchieren online weiter.",
      fr: "Même après des examens rassurants et l'avis d'un médecin affirmant que tout va bien, vous doutez de son diagnostic et reprenez vos recherches en ligne.",
      es: "Incluso después de que el médico te haga pruebas y descarte problemas, sospechas que se le ha pasado algo grave y vuelves a buscar en internet.",
    },
  },
  // 4. Compulsive Searching & Rabbit Holes
  {
    id: 4,
    subscale: "compulsive_symptom_searching_rabbit_holes",
    text: {
      en: "You have spent 2 or more hours in a single night reading medical forums, case studies, or patient testimonials instead of sleeping.",
      id: "Kamu pernah menghabiskan waktu 2 jam atau lebih di larut malam membaca forum medis, jurnal kasus, atau cerita pasien alih-alih tidur nyenyak.",
      de: "Sie haben nachts schon 2 Stunden oder länger medizinische Foren, Fallberichte oder Erfahrungsberichte durchforstet, anstatt zu schlafen.",
      fr: "Vous avez déjà passé 2 heures ou plus en pleine nuit à scruter des forums médicaux ou des témoignages de malades au lieu de dormir.",
      es: "Has pasado 2 horas o más en una misma noche leyendo foros médicos, casos clínicos o testimonios en lugar de descansar.",
    },
  },
  // 5. Catastrophic Distress & Bodily Hypervigilance
  {
    id: 5,
    subscale: "catastrophic_distress_bodily_hypervigilance",
    text: {
      en: "Constantly checking your smartwatch for heart rate anomalies, ECG spikes, or oxygen fluctuations triggers severe spikes in anxiety.",
      id: "Terus-menerus mengecek smartwatch untuk memantau detak jantung, grafik EKG, atau saturasi oksigen justru membuat kecemasanmu melonjak drastis.",
      de: "Das ständige Überprüfen Ihrer Smartwatch auf Pulsunregelmäßigkeiten, EKG-Kurven oder Sauerstoffwerte treibt Ihre Panik in die Höhe.",
      fr: "Consulter sans arrêt votre montre connectée pour vérifier votre rythme cardiaque ou votre SpO2 augmente drastiquement votre anxiété.",
      es: "Mirar continuamente el reloj inteligente para comprobar el pulso, ECG o saturación de oxígeno te dispara una ansiedad insoportable.",
    },
  },
  // 6. Reassurance Seeking & Medical Mistrust
  {
    id: 6,
    subscale: "reassurance_seeking_medical_mistrust",
    text: {
      en: "Researching symptoms online makes you feel intensely more frightened and panicked than before you started searching, yet you cannot stop.",
      id: "Mencari gejala di internet justru membuatmu jauh lebih panik dan ketakutan dibanding sebelumnya, namun kamu tetap tidak bisa berhenti membacanya.",
      de: "Die Onlinerecherche lässt Sie deutlich verängstigter zurück als zuvor – dennoch können Sie den Zwang zu googeln nicht stoppen.",
      fr: "Chercher vos symptômes sur le web vous laisse bien plus terrifié qu'avant de commencer, mais vous êtes incapable de vous arrêter.",
      es: "Buscar síntomas en la red te deja mucho más asustado y con el corazón en un puño que antes, pero no puedes frenar la compulsión.",
    },
  },
  // 7. Compulsive Searching & Rabbit Holes
  {
    id: 7,
    subscale: "compulsive_symptom_searching_rabbit_holes",
    text: {
      en: "You keep dozens of browser tabs open with medical symptom checkers, diagnostic criteria, and medication side effects.",
      id: "Kamu membiarkan belasan tab peramban terbuka berisi pemeriksa gejala penyakit, kriteria diagnosis, dan efek samping obat-obatan.",
      de: "Sie haben Dutzende Browser-Tabs mit Symptom-Checkern, Diagnosekriterien und Beipackzetteln gleichzeitig geöffnet.",
      fr: "Vous gardez des dizaines d'onglets de navigateur ouverts avec des vérificateurs de symptômes et des listes d'effets secondaires.",
      es: "Mantienes decenas de pestañas abiertas en el navegador con verificadores de síntomas, criterios diagnósticos y efectos secundarios.",
    },
  },
  // 8. Catastrophic Distress & Bodily Hypervigilance
  {
    id: 8,
    subscale: "catastrophic_distress_bodily_hypervigilance",
    text: {
      en: "You constantly palpate, press, or inspect your body (such as checking lymph nodes, skin moles, or pulse) looking for signs of disease.",
      id: "Kamu terus-menerus meraba, menekan, atau memeriksa bagian tubuhmu (seperti meraba kelenjar getah bening, tahi lalat, atau denyut nadi) mencari tanda penyakit.",
      de: "Sie tasten, drücken oder untersuchen Ihren Körper ständig (Lymphknoten, Muttermale, Puls) auf Anzeichen einer Erkrankung.",
      fr: "Vous palpez, pressez ou examinez sans cesse votre corps (ganglions, grains de beauté, pouls) à la recherche d'anomalies.",
      es: "Te palpas, presionas o inspeccionas constantemente el cuerpo (ganglios, lunares, pulso) buscando anomalías patológicas.",
    },
  },
  // 9. Reassurance Seeking & Medical Mistrust
  {
    id: 9,
    subscale: "reassurance_seeking_medical_mistrust",
    text: {
      en: "You frequently ask romantic partners, family members, or friends: 'Does this look normal to you?' needing urgent verbal reassurance.",
      id: "Kamu sering bertanya ke pasangan, keluarga, atau teman: 'Menurutmu ini wajar nggak ya?' karena butuh kepastian dan validasi bahwa kamu tidak sakit parah.",
      de: "Sie fragen Partner oder Freunde immer wieder: 'Sieht das für dich normal aus?' und brauchen verzweifelt Bestätigung.",
      fr: "Vous demandez sans cesse à vos proches ou partenaires : 'Est-ce que ça te paraît normal ?' avec un besoin urgent d'être rassuré.",
      es: "Preguntas con insistencia a tu pareja o familiares: '¿Esto te parece normal?' necesitando alivio verbal desesperado.",
    },
  },
  // 10. Compulsive Searching & Rabbit Holes
  {
    id: 10,
    subscale: "compulsive_symptom_searching_rabbit_holes",
    text: {
      en: "You search the internet for health symptoms during work hours, meals, or social gatherings because the urge to verify causes is irresistible.",
      id: "Kamu mencari gejala penyakit di internet saat sedang jam kerja, makan bersama, atau kumpul teman karena dorongan untuk memastikan begitu tak tertahankan.",
      de: "Sie recherchieren während der Arbeitszeit oder bei Treffen mit Freunden nach Krankheitssymptomen, weil der Zwang unwiderstehlich ist.",
      fr: "Vous cherchez des maladies sur internet au travail, pendant les repas ou les sorties entre amis, poussé par une pulsion irrépressible.",
      es: "Buscas síntomas de salud durante el trabajo, en cenas o con amigos porque el impulso de verificar te supera por completo.",
    },
  },
  // 11. Catastrophic Distress & Bodily Hypervigilance
  {
    id: 11,
    subscale: "catastrophic_distress_bodily_hypervigilance",
    text: {
      en: "Hearing about someone else's cancer diagnosis or sudden illness immediately causes you to develop the exact same somatic symptoms in your own body.",
      id: "Mendengar orang lain terkena kanker atau penyakit mendadak langsung membuatmu merasakan gejala yang sama persis di tubuhmu sendiri.",
      de: "Wenn Sie von der schweren Diagnose einer anderen Person hören, entwickeln Sie kurz darauf genau dieselben körperlichen Symptome.",
      fr: "Entendre parler du diagnostic grave d'une connaissance vous amène à ressentir immédiatement les mêmes symptômes dans votre propre corps.",
      es: "Enterarte del diagnóstico grave de otra persona hace que sientas de inmediato esos mismos síntomas en tu propio cuerpo.",
    },
  },
  // 12. Reassurance Seeking & Medical Mistrust
  {
    id: 12,
    subscale: "reassurance_seeking_medical_mistrust",
    text: {
      en: "Online symptom checking has caused you to request repeated medical scans, blood panels, or second and third opinions from different doctors.",
      id: "Kebiasaan mencari gejala di internet membuatmu berkali-kali meminta pemeriksaan USG, CT scan, tes darah, atau mencari opini dokter kedua dan ketiga.",
      de: "Die Onlinerecherche hat dazu geführt, dass Sie wiederholt auf MRTs, Blutbilder oder Zweit- und Drittmeinungen gedrängt haben.",
      fr: "Vos recherches internet vous ont poussé à réclamer des examens répétés (scanners, bilans sanguins) ou à consulter plusieurs médecins successifs.",
      es: "Tus búsquedas en internet te han llevado a exigir análisis repetidos, resonancias o segundas y terceras opiniones médicas innecesarias.",
    },
  },
];

export const CYBERCHONDRIA_OPTIONS = [
  {
    value: 0,
    label: {
      en: "Never / Does not apply (0)",
      id: "Tidak pernah sama sekali (0)",
      de: "Nie / Trifft nicht zu (0)",
      fr: "Jamais / Pas du tout (0)",
      es: "Nunca / No aplica (0)",
    },
  },
  {
    value: 1,
    label: {
      en: "Rarely / Slightly (1)",
      id: "Jarang / Sedikit (1)",
      de: "Selten / Leicht (1)",
      fr: "Rarement / Légèrement (1)",
      es: "Raras veces / Leve (1)",
    },
  },
  {
    value: 2,
    label: {
      en: "Frequently / Moderately (2)",
      id: "Sering / Cukup mengganggu (2)",
      de: "Häufig / Mäßig störend (2)",
      fr: "Souvent / Modérément gênant (2)",
      es: "Frecuentemente / Moderado (2)",
    },
  },
  {
    value: 3,
    label: {
      en: "Constantly / Severely (3)",
      id: "Hampir selalu / Sangat parah (3)",
      de: "Ständig / Extrem belastend (3)",
      fr: "Constamment / Très invalidant (3)",
      es: "Constantemente / Severo (3)",
    },
  },
];

export const CYBERCHONDRIA_RESULT_LEVELS: CyberchondriaResultLevel[] = [
  {
    level: "mindful_health_clarity",
    scoreRange: [0, 7],
    title: {
      en: "Mindful Health Clarity",
      id: "Kesadaran Kesehatan Adaptif & Tenang",
      de: "Gesunde Gesundheitskompetenz & Ruhe",
      fr: "Clarté Médicale & Sérénité",
      es: "Claridad & Serenidad en Salud",
    },
    badge: {
      en: "Minimal Cyberchondria Risk",
      id: "Risiko Cyberchondria Minimal",
      de: "Minimales Cyberchondrie-Risiko",
      fr: "Risque Cyberchondriaque Minimal",
      es: "Riesgo Mínimo de Cibercondría",
    },
    summary: {
      en: "You have a balanced, rational relationship with health information online. You do not spiral into panic when reading symptoms or distrust doctor evaluations.",
      id: "Kamu memiliki hubungan yang sehat dan rasional terhadap informasi medis online. Kamu tidak mudah panik membaca artikel kesehatan dan memercayai hasil pemeriksaan medis.",
      de: "Sie pflegen einen rationalen und gelassenen Umgang mit Online-Gesundheitsinformationen. Suchergebnisse lösen bei Ihnen keine Panikspiralen aus.",
      fr: "Vous entretenez un rapport équilibré et pragmatique avec l'information médicale sur le web, sans sombrer dans l'angoisse des diagnostics extrêmes.",
      es: "Tienes una relación madura y sensata con la información médica en internet. No caes en bucles de pánico ni dudas de los diagnósticos médicos.",
    },
    psychology: {
      en: "Your cognitive appraisal system views physical sensations as benign baseline fluctuations rather than catastrophic pathology. Online research is treated as neutral data rather than an emotional security crutch.",
      id: "Sistem evaluasi kognitifmu memandang sensasi tubuh biasa sebagai fluktuasi normal, bukan tanda penyakit mematikan. Penelusuran online diperlakukan sebagai data netral.",
      de: "Körperliche Empfindungen werden als normale physiologische Schwankungen eingeordnet. Das Internet dient Ihnen als Information, nicht als Beruhigungszwang.",
      fr: "Vos sensations physiques sont interprétées comme des fluctuations bénignes normales. Vos recherches sont neutres et ne servent pas de béquille émotionnelle.",
      es: "Interpretas las sensaciones físicas como fluctuaciones biológicas normales. Internet es una herramienta neutra y no una compulsión de alivio.",
    },
    actionProtocol: {
      en: [
        "Continue relying on verified, evidence-based medical sources during routine health inquiries.",
        "Attend annual physical checkups with trusted general practitioners.",
        "Use Nuju's voice journal for emotional check-ins when life stress manifests somatically.",
      ],
      id: [
        "Lanjutkan kebiasaan membaca sumber medis kredibel dan berbasis bukti.",
        "Lakukan pemeriksaan kesehatan rutin tahunan dengan dokter keluarga.",
        "Gunakan jurnal suara Nuju untuk melepaskan stres pikiran saat tubuh terasa lelah.",
      ],
      de: [
        "Nutzen Sie weiterhin seriöse und evidenzbasierte medizinische Fachquellen.",
        "Halten Sie reguläre Vorsorgetermine bei Ihrem Hausarzt ein.",
        "Nutzen Sie Nuju Voice Journaling zur mentalen Entlastung bei Alltagsstress.",
      ],
      fr: [
        "Continuez à consulter des sources médicales officielles et reconnues.",
        "Effectuez vos bilans annuels de santé en toute confiance avec votre médecin.",
        "Utilisez le journal vocal Nuju pour déposer les tensions avant qu'elles ne se somatisent.",
      ],
      es: [
        "Sigue consultando portales médicos contrastados y de confianza.",
        "Mantén tus revisiones anuales preventivas con el médico de cabecera.",
        "Usa el diario de voz Nuju para desahogar tensiones antes de que se somatizen.",
      ],
    },
  },
  {
    level: "mild_curiosity_health_checking",
    scoreRange: [8, 14],
    title: {
      en: "Mild Curiosity Health Checking",
      id: "Pengecekan Kesehatan Ringan",
      de: "Leichtes gesundheitsbezogenes Recherchieren",
      fr: "Recherche Médicale Légère",
      es: "Búsqueda Médica Leve",
    },
    badge: {
      en: "Mild Online Symptom Sensitivity",
      id: "Sensitivitas Gejala Online Ringan",
      de: "Leichte Symptom-Empfindlichkeit",
      fr: "Sensibilité Médicale Légère",
      es: "Sensibilidad Médica Leve",
    },
    summary: {
      en: "You occasionally search Google for symptoms and feel a brief wave of worry, but you are able to close browser tabs and move on with your day.",
      id: "Kamu sesekali mencari gejala di Google dan merasa sedikit khawatir, namun kamu mampu menutup tab peramban dan melanjutkan aktivitas dengan normal.",
      de: "Sie googeln gelegentlich nach Symptomen und spüren kurzzeitige Sorge, können das Thema aber zeitnah beiseitelegen.",
      fr: "Il vous arrive de chercher des symptômes en ligne avec une pointe d'inquiétude, mais vous parvenez à refermer vos onglets sans obsession.",
      es: "A veces buscas síntomas en internet y sientes una ligera inquietud, pero logras cerrar el navegador y continuar tu rutina.",
    },
    psychology: {
      en: "A mild intolerance of health uncertainty triggers exploratory online behavior, but your prefrontal cortex successfully bounds emotional escalation before severe panic takes hold.",
      id: "Sedikit rasa tidak nyaman terhadap ketidakpastian memicu rasa ingin tahu medis, namun korteks otakmu berhasil membatasi kecemasan sebelum berkembang jadi panik.",
      de: "Eine leichte Unsicherheitsintoleranz regt die Recherche an, wird aber rasch durch kognitive Realitätsprüfungen abgefedert.",
      fr: "Une légère intolérance au doute pousse à vérifier en ligne, vite régulée par le discernement rationnel.",
      es: "Una leve intolerancia a la incertidumbre activa búsquedas esporádicas, pero tu juicio racional frena la escalada de alarma.",
    },
    actionProtocol: {
      en: [
        "Implement a '24-hour waiting rule' before searching minor symptoms on the internet.",
        "Avoid reading medical symptom threads right before going to bed.",
        "Record bodily fatigue sensations in Nuju to process underlying stress instead of googling.",
      ],
      id: [
        "Terapkan aturan jeda 24 jam sebelum mencari gejala ringan di internet.",
        "Hindari membaca forum keluhan penyakit sesaat sebelum tidur di malam hari.",
        "Ceritakan rasa lelah atau pegal ke jurnal suara Nuju untuk mengurai stres emosional.",
      ],
      de: [
        "Führen Sie eine '24-Stunden-Wartezeit' ein, bevor Sie banale Symptome online nachschlagen.",
        "Meiden Sie medizinische Foren direkt vor dem Einschlafen.",
        "Sprechen Sie Körpersymptome in Nuju ein, um den emotionalen Hintergrund zu entlasten.",
      ],
      fr: [
        "Appliquez la 'règle des 24 heures d'attente' avant toute recherche médicale sur le web.",
        "Bannissez les forums médicaux avant de dormir.",
        "Exprimez vos tensions corporelles dans Nuju pour traiter le stress sous-jacent.",
      ],
      es: [
        "Aplica la regla de esperar 24 horas antes de googlear cualquier síntoma leve.",
        "Evita leer sobre enfermedades justo antes de acostarte.",
        "Usa el diario de voz Nuju para procesar el estrés antes de recurrir al buscador.",
      ],
    },
  },
  {
    level: "moderate_cyberchondric_escalation",
    scoreRange: [15, 22],
    title: {
      en: "Moderate Cyberchondric Escalation",
      id: "Eskalasi Cyberchondria Moderat",
      de: "Moderate Cyberchondrie-Eskalation",
      fr: "Escalade Cyberchondriaque Modérée",
      es: "Escalada Cibercondríaca Moderada",
    },
    badge: {
      en: "Moderate CSS Severity",
      id: "Tingkat CSS Moderat",
      de: "Moderat erhöhter CSS-Score",
      fr: "Sévérité CSS Modérée",
      es: "Severidad CSS Moderada",
    },
    summary: {
      en: "Searching health symptoms online consistently increases your anxiety rather than reassuring you. You spend noticeable time down medical rabbit holes and frequently seek reassurance.",
      id: "Mencari gejala kesehatan online selalu meningkatkan kecemasanmu, bukan menenangkan. Kamu menghabiskan banyak waktu membaca forum penyakit dan sering mencari penegasan dari orang terdekat.",
      de: "Die Onlinerecherche verstärkt Ihre Ängste systematisch. Sie verlieren sich regelmäßig in medizinischen Kaninchenbauten und fordern wiederholt Rückversicherung ein.",
      fr: "Vos recherches médicales augmentent systématiquement votre détresse au lieu de vous apaiser. Vous perdez du temps sur des forums anxiogènes.",
      es: "Buscar síntomas en internet alimenta tu ansiedad en lugar de calmarte. Pasas tiempo excesivo en foros de salud y pides confirmación constante.",
    },
    psychology: {
      en: "Dr. Vladan Starcevic's CSS model highlights the paradoxical cycle: online reassurance seeking triggers catastrophic algorithmic exposure, leading to confirmation bias and heightened visceral hypervigilance.",
      id: "Model CSS Dr. Vladan Starcevic mengungkap lingkaran paradoks: pencarian penenang memicu paparan algoritma penyakit langka, memicu bias konfirmasi dan hipersensitivitas tubuh.",
      de: "Nach dem CSS-Modell von Dr. Starcevic erzeugt das Suchen nach Beruhigung eine fatale Bestätigungsverzerrung: Algorithmen präsentieren seltene Katastrophen, die den Körperalarm verstärken.",
      fr: "Le modèle CSS du Dr Vladan Starcevic décrit le piège : la quête de réassurance nourrit un biais de confirmation vers le pire, exacerbant l'hypervigilance somatique.",
      es: "El modelo CSS del Dr. Vladan Starcevic demuestra el ciclo paradójico: buscar tranquilidad en internet desata un sesgo hacia enfermedades graves que agrava la hipervigilancia.",
    },
    actionProtocol: {
      en: [
        "Impose a strict digital symptom-searching embargo: no medical googling for 7 consecutive days.",
        "Disable automated health alert notifications and constant smartwatch ECG checks.",
        "Channel medical dread into Nuju voice journaling: name the underlying fear of vulnerability.",
      ],
      id: [
        "Terapkan puasa penelusuran gejala medis: dilarang googling penyakit selama 7 hari berturut-turut.",
        "Nonaktifkan notifikasi peringatan kesehatan otomatis di smartwatch.",
        "Salurkan rasa takut sakit ke rekaman suara Nuju: akui ketakutan emosional di baliknya.",
      ],
      de: [
        "Verordnen Sie sich ein striktes 7-tägiges Google-Verbot für medizinische Symptome.",
        "Schalten Sie ständige Smartwatch-Benachrichtigungen und EKG-Messungen ab.",
        "Kanalisieren Sie Ihre Krankheitsangst in Nuju Audio-Einträge, um die eigentliche Furcht zu entlasten.",
      ],
      fr: [
        "Instaurez un moratoire digital strict : 7 jours consécutifs sans aucune recherche de maladie sur Google.",
        "Désactivez les notifications anxiogènes de santé sur vos montres connectées.",
        "Confiez vos angoisses médicales à Nuju pour mettre des mots sur votre peur de l'impuissance.",
      ],
      es: [
        "Establece una veda estricta: 7 días seguidos sin buscar nada de medicina en internet.",
        "Desactiva las alertas automáticas de pulso y saturación en tu smartwatch.",
        "Vuelca tu miedo a la vulnerabilidad en el diario de voz Nuju en lugar de alimentar el buscador.",
      ],
    },
  },
  {
    level: "high_clinical_cyberchondria_css",
    scoreRange: [23, 29],
    title: {
      en: "High Clinical Cyberchondria (CSS)",
      id: "Cyberchondria Klinis Tinggi (Model CSS)",
      de: "Klinisch manifeste Cyberchondrie",
      fr: "Cyberchondrie Clinique Élevée (CSS)",
      es: "Cibercondría Clínica Elevada (CSS)",
    },
    badge: {
      en: "Clinical Cyberchondria Threshold",
      id: "Ambang Cyberchondria Klinis",
      de: "Klinische Cyberchondrie-Schwelle",
      fr: "Seuil de Cyberchondrie Clinique",
      es: "Umbral Clínico de Cibercondría",
    },
    summary: {
      en: "Online health searching dominates your thoughts, impairs your sleep, and fractures your trust in doctors. You constantly interpret harmless somatic twitches as terminal conditions.",
      id: "Pencarian penyakit di internet mendominasi pikiranmu, merusak kualitas tidur, dan mengikis kepercayaanmu pada dokter. Kamu terus menafsirkan kedutan wajar sebagai penyakit mematikan.",
      de: "Die digitale Symptomrecherche dominiert Ihr Denken, raubt Ihnen den Schlaf und untergräbt das Vertrauen in Ärzte. Harmloseste Regungen werden als tödliche Gefahr interpretiert.",
      fr: "La recherche médicale sur internet envahit vos pensées, détruit votre sommeil et détériore votre confiance envers les soignants. Vous vivez dans la certitude d'une pathologie grave.",
      es: "Las búsquedas médicas en internet acaparan tus pensamientos, arruinan tu sueño y destruyen tu confianza en los doctores. Interpretas cualquier síntoma como una amenaza letal.",
    },
    psychology: {
      en: "Severe health anxiety is magnified by algorithm-induced catastrophic feedback. Your brain's threat detection centers operate in permanent red alert, creating somatic mimicry where you genuinely feel symptoms of diseases you research.",
      id: "Kecemasan kesehatan diperparah oleh umpan balik algoritma mesin pencari. Sirkuit deteksi ancaman otak menyala terus-menerus, menciptakan efek *somatic mimicry* di mana kamu benar-benar merasakan gejala penyakit yang baru dibaca.",
      de: "Algorithmen verstärken die Angstspirale massiv. Die Bedrohungswahrnehmung des Gehirns befindet sich im Dauerstress und erzeugt psychosomatische Missempfindungen, die exakt zu gelesenen Krankheiten passen.",
      fr: "L'anxiété pour la santé est amplifiée par les algorithmes alarmistes. Votre cerveau crée une 'mimésis somatique' : vous ressentez réellement les symptômes des maladies consultées.",
      es: "Tu cerebro genera 'mimetismo somático' inducido por los peores resultados de internet : comienzas a experimentar físicamente los síntomas exactos de las enfermedades que lees.",
    },
    actionProtocol: {
      en: [
        "Consult a CBT psychologist specializing in Health Anxiety / Illness Anxiety Disorder.",
        "Block medical information websites on your home router and mobile browser.",
        "Establish an agreement with loved ones to stop answering reassurance questions ('Does this look swollen?').",
        "Use Nuju's voice journal for daily emotional grounding instead of symptom inventorying.",
      ],
      id: [
        "Konsultasikan ke psikolog klinis untuk terapi CBT khusus Gangguan Kecemasan Penyakit (*Illness Anxiety Disorder*).",
        "Blokir situs pemeriksa gejala medis di peramban ponselmu.",
        "Buat kesepakatan dengan keluarga untuk berhenti meladeni pertanyaan mencari kepastian ('Ini bengkak nggak ya?').",
        "Jadikan rekaman suara Nuju sebagai tempat dekompresi harian daripada mencatat gejala tubuh.",
      ],
      de: [
        "Suchen Sie psychotherapeutische Unterstützung (KVT) bei Krankheitsangststörungen auf.",
        "Blockieren Sie Symptom-Checker und Medizinforen auf Ihrem Smartphone.",
        "Vereinbaren Sie mit Angehörigen einen Stopp von Rückversicherungsfragen ('Fühlt sich das geschwollen an?').",
        "Nutzen Sie Nuju Voice Journaling für tägliche seelische Erdung statt Körper-Scanning.",
      ],
      fr: [
        "Consultez un psychologue TCC spécialisé dans l'anxiété pour la santé (hypocondrie).",
        "Bloquez l'accès aux sites de symptômes sur votre téléphone.",
        "Demandez à vos proches de ne plus répondre à vos demandes répétées de réassurance.",
        "Utilisez le journal vocal Nuju chaque jour pour apaiser l'anxiété sans vérifier vos fonctions vitales.",
      ],
      es: [
        "Acude a un psicólogo especialista en TCC para ansiedad por la salud (hipocondría).",
        "Bloquea los sitios de síntomas médicos en el navegador de tu teléfono.",
        "Pide a tus familiares que dejen de responder a tus preguntas compulsivas de reaseguración.",
        "Usa el diario de voz Nuju a diario para calmar la angustia en vez de inspeccionar tu cuerpo.",
      ],
    },
  },
  {
    level: "severe_medical_catastrophizing_obsession",
    scoreRange: [30, 36],
    title: {
      en: "Severe Medical Catastrophizing Obsession",
      id: "Obsesi Parah & Panik Penyakit Medis",
      de: "Schwere cyberchondrische Zwangsstörung",
      fr: "Obsession Cyberchondriaque Sévère",
      es: "Obsesión Cibercondríaca Severa",
    },
    badge: {
      en: "Severe Incapacitating Cyberchondria",
      id: "Cyberchondria Parah & Melumpuhkan",
      de: "Schwere lähmende Krankheitsangst",
      fr: "Cyberchondrie Handicapante Sévère",
      es: "Cibercondría Grave Incapacitante",
    },
    summary: {
      en: "Compulsive online symptom searching has consumed your life. You spend multiple hours every day in despair, requesting repeated emergency scans, doctor shopping, and feeling paralyzed by illness terror.",
      id: "Pencarian gejala medis online telah menguasai hidupmu. Kamu menghabiskan berjam-jam setiap hari dalam keputusasaan, bolak-balik IGD, berganti-ganti dokter, dan lumpuh oleh teror penyakit.",
      de: "Zwanghaftes Onlinerecherchieren bestimmt Ihren Alltag. Sie verbringen Stunden in Panik, fordern Notfalluntersuchungen, wechseln Ärzte und fühlen sich von Todesangst gelähmt.",
      fr: "La recherche compulsive de symptômes a pris le contrôle de votre vie. Des heures entières perdues dans la panique, multiplication des avis médicaux et sentiment d'effondrement.",
      es: "La búsqueda compulsiva de síntomas ha destrozado tu bienestar. Pasas horas a diario en vela, pidiendo pruebas médicas de urgencia y paralizado por el terror a morir.",
    },
    psychology: {
      en: "Severe illness anxiety has morphed into an intractable obsessive-compulsive loop. Every search act provides 30 seconds of relief followed by exponential panic resurgence. Autonomous nervous system dysregulation produces intense psychosomatic pain, validating catastrophic beliefs.",
      id: "Kecemasan penyakit telah berubah menjadi lingkaran obsesif-kompulsif kronis. Setiap pencarian hanya memberi rasa lega 30 detik sebelum meledak jadi panik berlipat ganda. Disregulasi sistem saraf menghasilkan nyeri psikosomatis nyata.",
      de: "Die Krankheitsangst hat sich zu einer schweren Zwangsdynamik verselbstständigt. Jedes Googeln bringt 30 Sekunden Linderung und facht danach die Panik exponentiell an. Reale Missempfindungen scheinen die Todesangst zu bestätigen.",
      fr: "L'angoisse de mort s'est transformée en un cycle obsessionnel-compulsif infernal. Chaque clic apporte 30 secondes de soulagement éphémère avant un rebond d'angoisse décuplé.",
      es: "La hipocondría se ha convertido en un bucle obsesivo-compulsivo incontrolable. Cada consulta online da 30 segundos de alivio seguidos de un rebote exponencial de pánico con dolores psikosomáticos reales.",
    },
    actionProtocol: {
      en: [
        "Engage immediately with a psychiatrist and clinical psychologist for multimodal treatment.",
        "Enforce a strict digital guardian control to restrict all health-related search access.",
        "Commit to a single designated primary care physician who understands Health Anxiety Disorder.",
        "Use Nuju as a protected emotional refuge to pour out somatic terrors without opening search engines.",
      ],
      id: [
        "Segera dapatkan penanganan komprehensif dari psikiater dan psikolog klinis spesialis OCD/Kecemasan.",
        "Pasang pengunci aplikasi atau *parental control* untuk memblokir akses ke pencarian medis.",
        "Tunjuk satu dokter keluarga tetap yang paham riwayat kecemasanmu dan patuhi panduannya.",
        "Jadikan Nuju sebagai tempat aman meluapkan kepanikan tubuhmu tanpa pernah lagi membuka mesin pencari.",
      ],
      de: [
        "Suchen Sie umgehend fachärztliche psychiatrische und psychotherapeutische Hilfe auf.",
        "Nutzen Sie technische Website-Blocker, um alle Gesundheitsrecherchen abzuriegeln.",
        "Wählen Sie einen festen Hausarzt, der über Ihre Krankheitsangst informiert ist, und vermeiden Sie Arztwechsel.",
        "Nutzen Sie Nuju als geschützten Sprachraum, um somatische Ängste auszudrücken, ohne das Internet zu öffnen.",
      ],
      fr: [
        "Consultez sans tarder une équipe spécialisée (psychiatre et psychologue clinicien).",
        "Installez des filtres stricts pour verrouiller tout accès aux recherches de santé.",
        "Confiez votre suivi à un seul médecin traitant de référence sensibilisé à l'anxiété pathologique.",
        "Faites de l'espace vocal Nuju votre sas de décompression pour désamorcer les crises sans toucher à Google.",
      ],
      es: [
        "Inicia tratamiento de urgencia con un psiquiatra y psicólogo clínico especializado en TOC y ansiedad.",
        "Instala bloqueadores parentales para prohibirte el acceso a webs médicas.",
        "Elige un único médico de cabecera de confianza que conozca tu ansiedad y evita peregrinar por consultas.",
        "Usa Nuju como santuario privado para desahogar el pánico somático sin abrir ningún buscador.",
      ],
    },
  },
];

export const CYBERCHONDRIA_SUBSCALE_INFO = {
  compulsive_symptom_searching_rabbit_holes: {
    title: {
      en: "Compulsive Searching & Rabbit Holes",
      id: "Pencarian Gejala Kompulsif & Larut Malam",
      de: "Zwanghafte Onlinerecherche",
      fr: "Recherche compulsive de symptômes",
      es: "Búsqueda compulsiva de síntomas",
    },
    description: {
      en: "Inability to resist googling physical sensations, losing hours on medical forums, and keeping dozens of symptom tabs open.",
      id: "Ketidakmampuan menahan dorongan googling sensasi tubuh, begadang berjam-jam di forum medis, dan membuka belasan tab penyakit.",
      de: "Unwiderstehlicher Drang, Körpersymptome zu googeln, stundenlanges Lesen in Foren und Dutzende offene Tabs.",
      fr: "Incapacité à résister à la recherche de symptômes sur Google, perte d'heures sur les forums et accumulation d'onglets.",
      es: "Incapacidad para frenar las búsquedas médicas en internet, noches en vela en foros y decenas de pestañas abiertas.",
    },
  },
  catastrophic_distress_bodily_hypervigilance: {
    title: {
      en: "Catastrophic Distress & Bodily Vigilance",
      id: "Distres Katastrofik & Hipersensitivitas Tubuh",
      de: "Katastrophisieren & Körperbeobachtung",
      fr: "Détresse catastrophiste & hypervigilance",
      es: "Catastrofismo e hipervigilancia corporal",
    },
    description: {
      en: "Assuming benign twitches mean terminal diseases, obsessing over smartwatch health data, and bodily palpation.",
      id: "Mengasumsikan kedutan biasa sebagai penyakit mematikan, obsesi cek detak jantung smartwatch, dan sering meraba kelenjar tubuh.",
      de: "Überzeugung, dass Muskelzucken tödliche Krankheiten bedeuten, Smartwatch-Fixierung und ständiges Abtasten.",
      fr: "Conviction que des spasmes bénins cachent une maladie mortelle, obsession des montres connectées et palpations.",
      es: "Creer que espasmos leves son patologías terminales, obsesión con el reloj inteligente y palpación constante.",
    },
  },
  reassurance_seeking_medical_mistrust: {
    title: {
      en: "Reassurance Seeking & Medical Mistrust",
      id: "Pencarian Kepastian & Ketidakpercayaan Medis",
      de: "Rückversicherungsdrang & Misstrauen",
      fr: "Quête de réassurance & méfiance médicale",
      es: "Búsqueda de reaseguración y desconfianza médica",
    },
    description: {
      en: "Urgent questioning of loved ones ('Is this normal?'), doubting clear test results, and requesting endless second opinions.",
      id: "Sering bertanya ke orang terdekat demi ditenangkan ('Ini wajar kan?'), meragukan hasil lab dokter, dan meminta cek medis berulang.",
      de: "Ständiges Nachfragen bei Angehörigen, Anzweifeln unauffälliger Arztbefunde und Fordern von Zweitmeinungen.",
      fr: "Interrogation incessante des proches, remise en question des bilans normaux et multiplication des consultations.",
      es: "Preguntar sin cesar a familiares para calmarse, desconfiar de análisis normales y exigir segundas opiniones.",
    },
  },
};

export function calculateCyberchondriaSubscales(answers: Record<number, number>) {
  let searching = 0;
  let distress = 0;
  let mistrust = 0;

  CYBERCHONDRIA_QUESTIONS.forEach((q) => {
    const val = answers[q.id] ?? 0;
    if (q.subscale === "compulsive_symptom_searching_rabbit_holes") searching += val;
    if (q.subscale === "catastrophic_distress_bodily_hypervigilance") distress += val;
    if (q.subscale === "reassurance_seeking_medical_mistrust") mistrust += val;
  });

  return {
    compulsive_symptom_searching_rabbit_holes: searching,
    catastrophic_distress_bodily_hypervigilance: distress,
    reassurance_seeking_medical_mistrust: mistrust,
  };
}

export function getCyberchondriaResult(score: number): CyberchondriaResultLevel {
  const match = CYBERCHONDRIA_RESULT_LEVELS.find(
    (lvl) => score >= lvl.scoreRange[0] && score <= lvl.scoreRange[1]
  );
  return match || CYBERCHONDRIA_RESULT_LEVELS[CYBERCHONDRIA_RESULT_LEVELS.length - 1];
}

export const CYBERCHONDRIA_RESULTS = CYBERCHONDRIA_RESULT_LEVELS;

export function calculateCyberchondriaScore(answers: Record<number, number>) {
  let totalScore = 0;
  const subscales = calculateCyberchondriaSubscales(answers);

  CYBERCHONDRIA_QUESTIONS.forEach((q) => {
    totalScore += answers[q.id] ?? 0;
  });

  const level = getCyberchondriaResult(totalScore);

  return {
    totalScore,
    maxScore: CYBERCHONDRIA_QUESTIONS.length * 3, // 36
    level,
    subscales,
  };
}
