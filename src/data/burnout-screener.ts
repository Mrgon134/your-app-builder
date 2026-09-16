export type BurnoutLang = "en" | "id" | "de" | "fr" | "es";

export interface BurnoutQuestion {
  id: number;
  dimension: "exhaustion" | "cynicism" | "inefficacy";
  text: Record<BurnoutLang, string>;
}

export const BURNOUT_OPTIONS = [
  {
    value: 0,
    label: {
      en: "Never",
      id: "Tidak Pernah",
      de: "Nie",
      fr: "Jamais",
      es: "Nunca",
    },
  },
  {
    value: 1,
    label: {
      en: "A few times a month",
      id: "Beberapa kali sebulan",
      de: "Einige Male im Monat",
      fr: "Quelques fois par mois",
      es: "Algunas veces al mes",
    },
  },
  {
    value: 2,
    label: {
      en: "Once a week",
      id: "Sekali seminggu",
      de: "Einmal pro Woche",
      fr: "Une fois par semaine",
      es: "Una vez por semana",
    },
  },
  {
    value: 3,
    label: {
      en: "A few times a week",
      id: "Beberapa kali seminggu",
      de: "Mehrmals pro Woche",
      fr: "Plusieurs fois par semaine",
      es: "Varias veces por semana",
    },
  },
  {
    value: 4,
    label: {
      en: "Every single day",
      id: "Setiap hari",
      de: "Jeden einzelnen Tag",
      fr: "Tous les jours",
      es: "Todos los días",
    },
  },
];

export const BURNOUT_QUESTIONS: BurnoutQuestion[] = [
  // Dimension 1: Emotional Exhaustion
  {
    id: 1,
    dimension: "exhaustion",
    text: {
      en: "I feel emotionally drained and depleted from my work or professional obligations.",
      id: "Saya merasa terkuras secara emosional dan hampa akibat pekerjaan atau tanggung jawab harian.",
      de: "Ich fühle mich durch meine Arbeit emotional völlig ausgelaugt und erschöpft.",
      fr: "Je me sens émotionnellement vidé(e) et épuisé(e) par mon travail.",
      es: "Me siento emocionalmente agotado(a) y vacío(a) por mi trabajo o responsabilidades.",
    },
  },
  {
    id: 2,
    dimension: "exhaustion",
    text: {
      en: "I wake up in the morning already feeling fatigued at the thought of facing another workday.",
      id: "Saya bangun pagi sudah merasa lelah hanya karena membayangkan harus menghadapi hari kerja lagi.",
      de: "Ich wache morgens auf und fühle mich schon erschöpft beim Gedanken an den Arbeitstag.",
      fr: "Je me réveille le matin déjà fatigué(e) à l'idée d'affronter une autre journée de travail.",
      es: "Me despierto por la mañana ya cansado(a) ante la idea de afrontar otra jornada laboral.",
    },
  },
  {
    id: 3,
    dimension: "exhaustion",
    text: {
      en: "Working with colleagues, clients, or deadlines feels like a constant heavy strain.",
      id: "Berinteraksi dengan rekan kerja, klien, atau menghadapi tenggat waktu terasa sangat membebani.",
      de: "Der Umgang mit Kollegen, Kunden oder Fristen fühlt sich wie eine ständige schwere Last an.",
      fr: "Travailler avec des collègues, des clients ou des délais serrés me pèse constamment.",
      es: "Tratar con colegas, clientes o fechas límite me resulta una carga pesada constante.",
    },
  },
  {
    id: 4,
    dimension: "exhaustion",
    text: {
      en: "At the end of my workday, I feel completely empty and have zero energy left for personal hobbies or loved ones.",
      id: "Di penghujung jam kerja, energi saya habis total hingga tidak bersisa untuk hobi atau keluarga.",
      de: "Am Feierabend bin ich so leer, dass ich keine Energie mehr für Hobbys oder Familie habe.",
      fr: "En fin de journée, je n'ai plus aucune énergie pour mes proches ou mes loisirs.",
      es: "Al final del día laboral me siento sin energía para mis aficiones o seres queridos.",
    },
  },

  // Dimension 2: Cynicism & Depersonalization
  {
    id: 5,
    dimension: "cynicism",
    text: {
      en: "I have become more callous, detached, or cynical toward the people I work with.",
      id: "Saya merasa menjadi lebih sinis, dingin, atau mati rasa terhadap rekan kerja atau orang di sekitar.",
      de: "Ich bin gegenüber Kollegen oder Kunden zynischer, distanzierter oder gleichgültiger geworden.",
      fr: "Je suis devenu(e) plus distant(e), cynique ou insensible envers mon entourage professionnel.",
      es: "Me he vuelto más distante, cínico(a) o indiferente hacia las personas con las que trabajo.",
    },
  },
  {
    id: 6,
    dimension: "cynicism",
    text: {
      en: "I doubt the significance or purpose of my work: 'Does any of this really matter?'",
      id: "Saya meragukan arti atau guna dari apa yang saya kerjakan: 'Apa gunanya semua ini?'",
      de: "Ich zweifle am Sinn meiner Arbeit: 'Hat das alles überhaupt einen echten Wert?'",
      fr: "Je doute du sens de mon travail : 'Est-ce que tout cela a vraiment une utilité ?'",
      es: "Dudo del sentido de mi trabajo: '¿Realmente importa algo de lo que hago?'",
    },
  },
  {
    id: 7,
    dimension: "cynicism",
    text: {
      en: "I just want to be left alone and avoid unnecessary meetings, chats, or phone calls.",
      id: "Saya hanya ingin dibiarkan sendiri dan menghindari rapat, obrolan, atau panggilan telepon jika memungkinkan.",
      de: "Ich möchte einfach in Ruhe gelassen werden und meide Meetings, Chats oder Anrufe.",
      fr: "Je veux juste qu'on me laisse tranquille et j'évite les réunions et les appels.",
      es: "Solo quiero que me dejen en paz y evito reuniones, mensajes o llamadas innecesarias.",
    },
  },
  {
    id: 8,
    dimension: "cynicism",
    text: {
      en: "I feel numb rather than satisfied, even when a major project or deadline is successfully completed.",
      id: "Saya merasa datar/mati rasa ketimbang puas, bahkan saat sebuah proyek besar selesai dengan sukses.",
      de: "Ich fühle eher emotionale Taubheit als Freude, selbst wenn ein großes Projekt gelingt.",
      fr: "Je ressens de l'indifférence plutôt que de la fierté, même après un succès important.",
      es: "Siento apatía en lugar de satisfacción, incluso al completar con éxito un gran proyecto.",
    },
  },

  // Dimension 3: Reduced Personal Accomplishment / Inefficacy
  {
    id: 9,
    dimension: "inefficacy",
    text: {
      en: "I feel like I am accomplishing very little of real worth, despite working long hours.",
      id: "Saya merasa hanya mencapai sedikit hal bermanfaat, padahal sudah bekerja berjam-jam lamanya.",
      de: "Ich habe das Gefühl, trotz vieler Arbeitsstunden kaum etwas von echtem Wert zu schaffen.",
      fr: "J'ai l'impression d'accomplir très peu de choses utiles malgré mes longues heures de travail.",
      es: "Siento que logro muy poco de valor real, a pesar de trabajar largas horas.",
    },
  },
  {
    id: 10,
    dimension: "inefficacy",
    text: {
      en: "I have trouble concentrating and make careless mistakes on tasks that used to be second nature.",
      id: "Saya sulit berkonsentrasi dan sering membuat kesalahan pada hal-hal yang dulu sangat mudah bagi saya.",
      de: "Ich kann mich schwer konzentrieren und mache Flüchtigkeitsfehler bei Routineaufgaben.",
      fr: "J'ai du mal à me concentrer et fais des erreurs d'inattention sur des tâches autrefois faciles.",
      es: "Me cuesta concentrarme y cometo errores en tareas que antes dominaba sin esfuerzo.",
    },
  },
  {
    id: 11,
    dimension: "inefficacy",
    text: {
      en: "I feel ineffective at solving problems and procrastinate out of cognitive overwhelm.",
      id: "Saya merasa tidak berdaya menyelesaikan masalah dan menunda pekerjaan karena otak terasa penuh sesak.",
      de: "Problemlösungen fallen mir schwer; aus Überforderung schiebe ich Aufgaben auf.",
      fr: "Je me sens impuissant(e) à résoudre les problèmes et je procrastine par surcharge mentale.",
      es: "Me cuesta resolver problemas y postergo tareas por pura sobrecarga mental.",
    },
  },
  {
    id: 12,
    dimension: "inefficacy",
    text: {
      en: "I feel trapped in an endless hamster wheel with no clear path to genuine recovery.",
      id: "Saya merasa terjebak di roda hamster tanpa ujung tanpa tahu cara keluar dari kelelahan ini.",
      de: "Ich fühle mich wie im Hamsterrad gefangen, ohne Ausweg in echte Erholung.",
      fr: "J'ai l'impression de tourner dans une roue sans fin sans issue vers un vrai repos.",
      es: "Me siento atrapado(a) en una rueda interminable sin un camino claro de recuperación.",
    },
  },
];

export interface BurnoutResult {
  totalScore: number;
  maxScore: number;
  percentage: number;
  exhaustionScore: number;
  cynicismScore: number;
  inefficacyScore: number;
  tier: "low" | "moderate" | "high" | "severe";
  title: Record<BurnoutLang, string>;
  description: Record<BurnoutLang, string>;
  recoveryStrategy: Record<BurnoutLang, string[]>;
}

export const BURNOUT_TIERS: Record<string, any> = {
  low: {
    title: {
      en: "Balanced Work-Life Integration (Low Burnout Risk)",
      id: "Integrasi Hidup Seimbang (Risiko Burnout Rendah)",
      de: "Ausgeglichene Work-Life-Balance (Geringes Burnout-Risiko)",
      fr: "Équilibre de vie préservé (Faible risque de burnout)",
      es: "Equilibrio vida-trabajo saludable (Bajo riesgo de agotamiento)",
    },
    description: {
      en: "Your nervous system is handling professional stress resiliently. You retain energy for life outside work and maintain a healthy sense of efficacy and connection.",
      id: "Sistem saraf Anda mengelola tekanan kerja dengan lentur. Anda masih memiliki energi untuk kehidupan di luar kantor dan memelihara kepuasan batin yang sehat.",
      de: "Ihr Nervensystem meistert beruflichen Stress resilient. Sie verfügen über gesunde Erholungsphasen.",
      fr: "Votre système nerveux gère le stress avec résilience. Vous préservez de l'énergie pour votre vie personnelle.",
      es: "Su sistema nervioso tolera el estrés con resiliencia. Conserva energía y satisfacción personal.",
    },
    recoveryStrategy: {
      en: [
        "Maintain non-negotiable hard stop times at the end of each workday.",
        "Practice single-tasking deep work blocks to prevent cognitive fatigue accumulation.",
        "Use Ju's Sound Sanctuary with 528Hz or Brown Noise to keep work calm and focused.",
      ],
      id: [
        "Tetapkan jam selesai kerja yang tegas tanpa kompromi setiap hari.",
        "Terapkan blok kerja fokus satu tugas untuk mencegah penumpukan lelah kognitif.",
        "Gunakan Sound Sanctuary Ju dengan 528Hz atau Brown Noise untuk menjaga ritme kerja tetap tenang.",
      ],
      de: [
        "Klare Feierabend-Routinen ohne Arbeits-Mails beibehalten.",
        "Fokus-Blöcke schützen, um kognitive Ermüdung zu vermeiden.",
        "Die Sound Sanctuary mit Brown Noise für entspanntes Arbeiten nutzen.",
      ],
      fr: [
        "Préservez des horaires de fin de journée stricts.",
        "Protégez des plages de travail concentré sans notifications.",
        "Utilisez le Sanctuaire Sonore pour travailler dans le calme.",
      ],
      es: [
        "Mantenga horarios estrictos de desconexión laboral al final del día.",
        "Practique bloques de trabajo profundo sin interrupciones.",
        "Utilice el Santuario Sonoro con ruido marrón para estudiar o trabajar.",
      ],
    },
  },
  moderate: {
    title: {
      en: "Early Stage Overload & Sensory Depletion",
      id: "Kelelahan Awal & Beban Kognitif Berlebih",
      de: "Beginnende Überlastung & Erschöpfung",
      fr: "Surcharge débutante & Épuisement sensoriel",
      es: "Sobrecarga inicial y fatiga mental",
    },
    description: {
      en: "You are exhibiting early indicators of chronic workplace stress. While you still function, emotional exhaustion is beginning to encroach on your evenings and weekends.",
      id: "Anda mulai menunjukkan tanda-tanda stres kronis di tempat kerja. Meskipun masih berfungsi, rasa lelah emosional mulai merembes ke waktu istirahat dan akhir pekan Anda.",
      de: "Erste Warnsignale chronischen Arbeitsstresses sind sichtbar. Die Erholung am Wochenende reicht oft nicht mehr aus.",
      fr: "Des signaux de stress chronique apparaissent. La fatigue commence à empiéter sur vos week-ends.",
      es: "Presenta signos tempranos de agotamiento crónico. El descanso del fin de semana empieza a ser insuficiente.",
    },
    recoveryStrategy: {
      en: [
        "Institute a 'Digital Sunset': no work communication or emails after 7:00 PM.",
        "Communicate task prioritization with supervisors before deadlines collide.",
        "Take a daily 10-minute mental defusion break using Ju's Zen Bubble game.",
      ],
      id: [
        "Terapkan 'Digital Sunset': matikan notifikasi chat/email pekerjaan setelah pukul 19.00.",
        "Komunikasikan prioritas tugas dengan atasan sebelum deadline bertabrakan.",
        "Ambil jeda dekompresi 10 menit menggunakan game Zen Bubble untuk meredakan ketegangan.",
      ],
      de: [
        "Digital Sunset: Keine beruflichen Chats nach 19 Uhr.",
        "Aufgaben proaktiv priorisieren und Grenzen abstecken.",
        "Tägliche 10-Minuten-Pause mit dem Zen-Bubble-Achtsamkeitsspiel.",
      ],
      fr: [
        "Coucher de soleil numérique : zéro email professionnel après 19h.",
        "Réévaluez vos priorités avec vos responsables.",
        "Faites une pause de 10 minutes avec le jeu Zen Bubble.",
      ],
      es: [
        "Desconexión digital: cero mensajes de trabajo tras las 19:00.",
        "Dialogue prioridades con sus responsables antes de saturarse.",
        "Tome descansos de 10 minutos con el juego Zen Bubble.",
      ],
    },
  },
  high: {
    title: {
      en: "Advanced Clinical Burnout & Cynicism",
      id: "Burnout Lanjutan & Sikap Sinis (Advanced Burnout)",
      de: "Fortgeschrittener Burnout & Zynismus",
      fr: "Burnout avancé & Cynisme protecteur",
      es: "Agotamiento avanzado y cinismo defensivo",
    },
    description: {
      en: "Your emotional reserves are heavily depleted. You are experiencing classic Maslach depersonalization—detaching emotionally from colleagues as a subconscious survival defense against relentless pressure.",
      id: "Cadangan energi emosional Anda sudah sangat menipis. Anda mengalami gejala depersonalisasi klasik—menjadi dingin dan sinis sebagai pertahanan bawah sadar melawan tekanan berlebih.",
      de: "Ihre emotionalen Reserven sind aufgebraucht. Zynismus und emotionale Taubheit dienen Ihrem Gehirn als Schutzschild.",
      fr: "Vos réserves sont presque vides. Le cynisme et le détachement sont devenus votre bouclier protecteur.",
      es: "Sus reservas emocionales están agotadas. El distanciamiento y la apatía actúan como escudo defensivo.",
    },
    recoveryStrategy: {
      en: [
        "Take immediate scheduled PTO / medical leave if possible to stop allostatic overload.",
        "Delegate or renegotiate non-essential project deliverables.",
        "Engage in daily somatic vagus nerve regulation using our Panic SOS tool or breathwork.",
      ],
      id: [
        "Ambil cuti tahunan atau izin istirahat jika memungkinkan untuk menghentikan beban kumulatif.",
        "Delegasikan atau negosiasikan ulang tenggat waktu proyek yang tidak genting.",
        "Lakukan latihan napas penenang saraf vagus setiap hari menggunakan Lab SOS Ju.",
      ],
      de: [
        "Dringend Urlaub oder Krankschreibung zur Regeneration erwägen.",
        "Unnötige Projekte radikal delegieren oder absagen.",
        "Tägliche Vagusnerv-Entspannung mit unserem SOS-Atemtool.",
      ],
      fr: [
        "Prenez des congés ou un arrêt médical pour interrompre la spirale.",
        "Déléguez ou reportez les projets non essentiels.",
        "Pratiquez la régulation du nerf vague via notre espace SOS.",
      ],
      es: [
        "Considere una baja o días libres urgentes para frenar la sobrecarga.",
        "Delegue o renegocie tareas prescindibles de inmediato.",
        "Active su sistema parasimpático a diario con la herramienta SOS.",
      ],
    },
  },
  severe: {
    title: {
      en: "Severe Autonomic Exhaustion & Inefficacy",
      id: "Kelelahan Otonom Berat & Krisis Burnout",
      de: "Schwerer Burnout & vegetative Erschöpfung",
      fr: "Épuisement sévère & Crise de burnout",
      es: "Agotamiento severo y colapso funcional",
    },
    description: {
      en: "You have reached critical burnout. Cognitive impairment, brain fog, physical somatization (headaches, insomnia, digestive distress), and feelings of helplessness indicate that your nervous system is in protective shutdown.",
      id: "Anda berada di titik krisis burnout. Penurunan fungsi kognitif, brain fog, keluhan fisik (insomnia, sakit kepala, pencernaan terganggu), dan rasa putus asa menandakan sistem saraf Anda sedang 'mati suri' untuk melindungi diri.",
      de: "Kritischer Erschöpfungszustand. Körperliche Beschwerden und geistiger Nebel signalisieren einen Schutz-Shutdown des Nervensystems.",
      fr: "Stade critique d'épuisement. Votre corps et votre esprit sont en mode de protection d'urgence.",
      es: "Estado crítico de agotamiento. Su sistema nervioso ha entrado en bloqueo defensivo.",
    },
    recoveryStrategy: {
      en: [
        "Professional Consultation: Consult a physician, psychiatrist, or workplace mental health specialist immediately.",
        "Zero Guilt Rest: Understand that this is a neurobiological injury, not personal laziness.",
        "External Support: Contact HR regarding Employee Assistance Programs (EAP) or crisis helplines.",
      ],
      id: [
        "Konsultasi Medis: Segera temui dokter, psikiater, atau psikolog klinis untuk penanganan terstruktur.",
        "Istirahat Tanpa Rasa Bersalah: Sadari bahwa ini adalah cedera neurobiologis, bukan kemalasan karakter.",
        "Dukungan Eksternal: Manfaatkan program konseling kantor (EAP) atau hubungi hotline krisis.",
      ],
      de: [
        "Sofortige ärztliche und psychotherapeutische Abklärung vereinbaren.",
        "Schuldfreie Ruhe: Burnout ist eine neurobiologische Belastungsgrenze, kein Versagen.",
        "Professionelle Unterstützung in Anspruch nehmen.",
      ],
      fr: [
        "Consultez immédiatement un médecin traitant ou un psychiatre.",
        "Repos absolu sans culpabilité : il s'agit d'une atteinte physiologique.",
        "Faites appel aux dispositifs d'aide médicale et psychologique.",
      ],
      es: [
        "Consulte urgentemente a un médico o psicólogo clínico.",
        "Descanso sin culpa: se trata de una lesión neurobiológica real.",
        "Solicite apoyo profesional y médico especializado.",
      ],
    },
  },
};

export const calculateBurnoutScore = (answers: Record<number, number>) => {
  let totalScore = 0;
  let exhaustionScore = 0;
  let cynicismScore = 0;
  let inefficacyScore = 0;

  BURNOUT_QUESTIONS.forEach((q) => {
    const val = answers[q.id] ?? 0;
    totalScore += val;
    if (q.dimension === "exhaustion") exhaustionScore += val;
    if (q.dimension === "cynicism") cynicismScore += val;
    if (q.dimension === "inefficacy") inefficacyScore += val;
  });

  const maxScore = BURNOUT_QUESTIONS.length * 4; // 48
  const percentage = Math.round((totalScore / maxScore) * 100);

  let tierKey: "low" | "moderate" | "high" | "severe" = "low";
  if (totalScore >= 36 || exhaustionScore >= 14) {
    tierKey = "severe";
  } else if (totalScore >= 24 || exhaustionScore >= 10) {
    tierKey = "high";
  } else if (totalScore >= 12) {
    tierKey = "moderate";
  } else {
    tierKey = "low";
  }

  const profile = BURNOUT_TIERS[tierKey];

  return {
    totalScore,
    maxScore,
    percentage,
    exhaustionScore,
    cynicismScore,
    inefficacyScore,
    tier: tierKey,
    title: profile.title,
    description: profile.description,
    recoveryStrategy: profile.recoveryStrategy,
  };
};
