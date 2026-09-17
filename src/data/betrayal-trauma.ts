export type BetrayalTraumaLang = "en" | "id" | "de" | "fr" | "es";

export type BetrayalTraumaLevel =
  | "secure_integration"
  | "mild_friction"
  | "acute_dysregulation"
  | "severe_shattering";

export type BetrayalTraumaDimension =
  | "betrayal_blindness"
  | "hypervigilance_mistrust"
  | "interoceptive_dysregulation";

export interface BetrayalTraumaQuestion {
  id: number;
  dimension: BetrayalTraumaDimension;
  text: Record<BetrayalTraumaLang, string>;
}

export const BETRAYAL_TRAUMA_OPTIONS = [
  {
    value: 0,
    label: {
      en: "Rarely / Never",
      id: "Jarang / Tidak Pernah",
      de: "Selten / Nie",
      fr: "Rarement / Jamais",
      es: "Rara vez / Nunca",
    },
  },
  {
    value: 1,
    label: {
      en: "Sometimes / Mildly",
      id: "Kadang-kadang / Ringan",
      de: "Manchmal / Leicht",
      fr: "Parfois / Légèrement",
      es: "A veces / Levemente",
    },
  },
  {
    value: 2,
    label: {
      en: "Frequently / Noticeably",
      id: "Seringkali / Terasa Nyata",
      de: "Häufig / Spürbar",
      fr: "Souvent / Nettement",
      es: "Frecuentemente / Notorio",
    },
  },
  {
    value: 3,
    label: {
      en: "Almost Always / Severely",
      id: "Hampir Selalu / Sangat Parah",
      de: "Fast immer / Extrem",
      fr: "Presque toujours / Très sévère",
      es: "Casi siempre / Muy severo",
    },
  },
];

export const BETRAYAL_TRAUMA_QUESTIONS: BetrayalTraumaQuestion[] = [
  // Dimension 1: Betrayal Blindness & Self-Doubt (Q1-Q4)
  {
    id: 1,
    dimension: "betrayal_blindness",
    text: {
      en: "I found myself actively making excuses for someone's suspicious behavior because facing the truth felt too dangerous for our relationship.",
      id: "Aku mendapati diriku mencari-cari alasan pembenaran atas perilaku mencurigakan seseorang karena menghadapi kebenaran terasa terlalu menakutkan bagi hubungan kami.",
      de: "Ich ertappte mich dabei, verdächtiges Verhalten zu entschuldigen, weil die Wahrheit für unsere Bindung zu bedrohlich wirkte.",
      fr: "Je me suis surpris à justifier des comportements suspects car affronter la vérité semblait trop destructeur pour notre relation.",
      es: "Me sorprendí justificando comportamientos sospechosos porque afrontar la verdad resultaba demasiado aterrador para nuestro vínculo.",
    },
  },
  {
    id: 2,
    dimension: "betrayal_blindness",
    text: {
      en: "Even with clear evidence of dishonesty, I repeatedly gaslit myself into believing I was just being 'crazy' or 'paranoid.'",
      id: "Meskipun ada bukti ketidakjujuran yang jelas, aku berulang kali meragukan kewarasanku sendiri dan menganggap diriku hanya 'gila' atau 'paranoid.'",
      de: "Trotz klarer Indizien redete ich mir ein, ich sei nur überempfindlich, paranoid oder würde mir alles nur einbilden.",
      fr: "Malgré des preuves évidentes de malhonnêteté, je me persuadais que j'étais simplement 'fou' ou 'paranoïaque'.",
      es: "A pesar de evidencias claras de engaño, me convencí a mí mismo de que solo estaba siendo 'exagerado' o 'paranoico'.",
    },
  },
  {
    id: 3,
    dimension: "betrayal_blindness",
    text: {
      en: "I stayed loyal to someone long after my intuition was screaming that they were keeping secrets from me.",
      id: "Aku tetap setia membela seseorang lama setelah intuisiku berteriak bahwa dia menyembunyikan rahasia besar dariku.",
      de: "Ich hielt jemandem die Treue, obwohl meine innere Stimme mich längst vor verborgenen Geheimnissen warnte.",
      fr: "Je suis resté loyal envers quelqu'un bien après que mon intuition m'a alerté sur des secrets cachés.",
      es: "Me mantuve leal a alguien mucho después de que mi intuición me gritara que me ocultaba cosas graves.",
    },
  },
  {
    id: 4,
    dimension: "betrayal_blindness",
    text: {
      en: "I feel an intense, corrosive shame for 'not seeing the red flags sooner,' blaming myself more than the person who lied.",
      id: "Aku merasakan rasa malu mendalam karena 'tidak menyadari tanda bahaya lebih awal', lebih menyalahkan diriku sendiri daripada orang yang berbohong.",
      de: "Ich empfinde nagende Scham dafür, Warnsignale übersehen zu haben, und gebe mir selbst mehr Schuld als dem Täter.",
      fr: "J'éprouve une honte corrosive de 'ne pas avoir vu les signaux d'alerte plus tôt', m'en voulant plus qu'à la personne malhonnête.",
      es: "Siento una culpa y vergüenza corrosivas por 'no haber visto las banderas rojas antes', culpándome más a mí que al mentiroso.",
    },
  },

  // Dimension 2: Hypervigilance & Relational Mistrust (Q5-Q8)
  {
    id: 5,
    dimension: "hypervigilance_mistrust",
    text: {
      en: "I constantly scan texts, tones of voice, and body language for hidden signs of deception or sudden withdrawal.",
      id: "Aku terus-menerus memindai isi chat, nada bicara, dan bahasa tubuh orang lain untuk mencari tanda-tanda kebohongan atau penarikan diri tersembunyi.",
      de: "Ich scanne Nachrichten, Tonlagen und Blicke unablässig nach Anzeichen von Täuschung oder plötzlicher Kälte ab.",
      fr: "J'analyse constamment les textos, les intonations et le langage corporel à la recherche de mensonges ou de rejet soudain.",
      es: "Escaneo compulsivamente mensajes, tonos de voz y miradas buscando indicios ocultos de engaño o distanciamiento.",
    },
  },
  {
    id: 6,
    dimension: "hypervigilance_mistrust",
    text: {
      en: "When someone is exceptionally kind or generous toward me, my immediate internal reaction is suspicion: 'What is their hidden agenda?'",
      id: "Ketika seseorang bersikap sangat baik atau manis padaku, reaksi pertamaku adalah curiga: 'Pasti ada udang di balik batu, apa maunya?'",
      de: "Wenn jemand besonders nett zu mir ist, reagiere ich sofort mit Misstrauen: 'Was ist die versteckte Absicht dahinter?'",
      fr: "Quand quelqu'un est particulièrement bienveillant avec moi, ma réaction immédiate est la méfiance : 'Que cherche-t-il à me cacher ?'",
      es: "Cuando alguien es muy amable o generoso conmigo, mi reacción inmediata es desconfiar: '¿Qué intención oculta tiene?'",
    },
  },
  {
    id: 7,
    dimension: "hypervigilance_mistrust",
    text: {
      en: "I experience sudden intrusive flashbacks or obsessive replay loops of moments where I was deceived.",
      id: "Aku sering mengalami kilas balik mendadak atau memutar ulang ingatan secara obsesif tentang momen-momen saat aku dibohongi.",
      de: "Ich erlebe plötzliche Flashbacks oder endlose Gedankenschleifen über Momente, in denen ich getäuscht wurde.",
      fr: "Je subis des flash-backs soudains ou des ruminations obsessionnelles sur les moments où j'ai été trahi.",
      es: "Tengo recuerdos intrusivos o bucles obsesivos reproduciendo los momentos exactos en los que fui engañado.",
    },
  },
  {
    id: 8,
    dimension: "hypervigilance_mistrust",
    text: {
      en: "I feel an urge to isolate completely because trusting another human being feels like walking onto a landmine.",
      id: "Aku merasa ingin mengisolasi diri sepenuhnya karena mempercayai manusia lain terasa seperti menginjak ranjau darat.",
      de: "Ich möchte mich völlig zurückziehen, weil sich Vertrauen zu anderen Menschen wie ein Schritt auf eine Tretmine anfühlt.",
      fr: "J'ai envie de m'isoler totalement car faire confiance à nouveau ressemble à marcher sur un champ de mines.",
      es: "Siento el impulso de aislarme por completo porque confiar en otro ser humano se siente como pisar una mina.",
    },
  },

  // Dimension 3: Interoceptive & Somatic Dysregulation (Q9-Q12)
  {
    id: 9,
    dimension: "interoceptive_dysregulation",
    text: {
      en: "Thoughts of the betrayal trigger visceral physical nausea, sudden knots in my stomach, or loss of appetite.",
      id: "Memikirkan pengkhianatan itu memicu rasa mual fisik nyata, perut melilit seperti terikat simpul, atau kehilangan nafsu makan mendadak.",
      de: "Der Gedanke an den Vertrauensbruch löst körperliche Übelkeit, Magenkrämpfe oder akute Appetitlosigkeit aus.",
      fr: "Penser à la trahison déclenche des nausées physiques, une boule au ventre ou une perte soudaine d'appétit.",
      es: "Pensar en la traición me provoca náuseas físicas, nudos en el estómago o pérdida inmediata del apetito.",
    },
  },
  {
    id: 10,
    dimension: "interoceptive_dysregulation",
    text: {
      en: "My chest tightens and my heart races violently when hearing footsteps, door hinges, or notification chimes reminiscent of the betrayal.",
      id: "Dadamu sesak dan jantungmu berdegup kencang saat mendengar langkah kaki, suara pintu, atau denting notifikasi yang mengingatkan pada momen kebohongan.",
      de: "Mein Puls rast und die Brust wird eng bei Schritten, Türgeräuschen oder Benachrichtigungstönen aus dieser Zeit.",
      fr: "Ma poitrine se serre et mon cœur s'emballe au son de pas, de portes ou de sonneries rappelant la tromperie.",
      es: "Se me oprime el pecho y el corazón se acelera ante pasos, puertas o tonos de notificación que me recuerdan el engaño.",
    },
  },
  {
    id: 11,
    dimension: "interoceptive_dysregulation",
    text: {
      en: "I suffer from profound sleep disruptions—waking up abruptly in the early morning drenched in adrenaline or cold dread.",
      id: "Tidurku terganggu parah—sering terbangun tiba-tiba di dini hari dalam keadaan dibanjiri adrenalin atau ketakutan mencekam.",
      de: "Mein Schlaf ist zerrüttet – ich wache frühmorgens schlagartig mit Herzrasen und kalter Panik auf.",
      fr: "Mon sommeil est brisé : je me réveille brutalement à l'aube baigné d'adrénaline ou d'angoisse glaciale.",
      es: "Sufro de insomnio o me despierto abruptamente de madrugada con taquicardia y una sensación helada de pánico.",
    },
  },
  {
    id: 12,
    dimension: "interoceptive_dysregulation",
    text: {
      en: "I feel disconnected from my own physical body, as if I am observing my life from behind thick glass (depersonalization).",
      id: "Aku merasa terputus dari tubuh fisikku sendiri, seolah-olah mengamati hidupku dari balik kaca tebal (depersonalisasi/mati rasa).",
      de: "Ich fühle mich von meinem Körper entfremdet, als würde ich mein Leben wie durch dickes Glas beobachten.",
      fr: "Je me sens déconnecté de mon corps, comme si j'observais ma vie à travers une vitre épaisse (dépersonnalisation).",
      es: "Me siento desconectado de mi cuerpo físico, como si observara mi vida a través de un cristal grueso (despersonalización).",
    },
  },
];

export interface BetrayalTraumaProfile {
  level: BetrayalTraumaLevel;
  badge: Record<BetrayalTraumaLang, string>;
  title: Record<BetrayalTraumaLang, string>;
  tagline: Record<BetrayalTraumaLang, string>;
  description: Record<BetrayalTraumaLang, string>;
  clinicalInsight: Record<BetrayalTraumaLang, string>;
  recoveryProtocols: Record<BetrayalTraumaLang, string[]>;
}

export const BETRAYAL_TRAUMA_PROFILES: Record<BetrayalTraumaLevel, BetrayalTraumaProfile> = {
  secure_integration: {
    level: "secure_integration",
    badge: {
      en: "Grounded Discernment",
      id: "Ketajaman Batin Stabil",
      de: "Gefestigte Urteilskraft",
      fr: "Discernement Équilibré",
      es: "Discernimiento Estable",
    },
    title: {
      en: "Healthy Relational Discernment",
      id: "Ketajaman Hubungan yang Sehat",
      de: "Gesunde Beziehungsklarheit",
      fr: "Clarté Relationnelle Saine",
      es: "Claridad Relacional Saludable",
    },
    tagline: {
      en: "Your intuitive compass is intact, with proportional boundaries and grounded trust.",
      id: "Kompas intuisimu utuh, memiliki batasan proporsional dan kepercayaan yang berakar sehat.",
      de: "Ihr innerer Kompass ist intakt, mit klaren Grenzen und fundiertem Vertrauen.",
      fr: "Votre boussole intérieure est intacte, avec des limites saines et une confiance lucide.",
      es: "Tu brújula interna está intacta, con límites claros y una confianza bien fundamentada.",
    },
    description: {
      en: "Your responses suggest minimal betrayal trauma dysregulation. You maintain a balanced ability to trust others while honoring gut boundary signals without falling into compulsive denial or chronic paranoia.",
      id: "Skor Anda menunjukkan disregulasi trauma pengkhianatan yang minimal. Anda mampu mempercayai orang lain secara seimbang sembari tetap peka pada sinyal batas diri tanpa terjebak penyangkalan maupun kecurigaan berlebihan.",
      de: "Ihre Ergebnisse zeigen minimale Verratstraumatisierung. Sie verfügen über ein ausgewogenes Vertrauen und gesunde Wachsamkeit, ohne in Verleugnung oder Paranoia zu verfallen.",
      fr: "Vos réponses indiquent une faible dérégulation liée à la trahison. Vous conservez la capacité de faire confiance tout en écoutant vos signaux d'alerte sans tomber dans la suspicion permanente.",
      es: "Tus respuestas reflejan una baja desregulación por traición. Mantienes la capacidad de confiar mientras respetas tus límites intuitivos sin caer en la negación ni en la paranoia.",
    },
    clinicalInsight: {
      en: "Attachment neurobiology indicates that secure individuals do not have a lack of boundaries; rather, they experience rapid rupture-and-repair calibration when interpersonal deceit is detected.",
      id: "Neurobiologi kelekatan menunjukkan bahwa individu aman bukan berarti tanpa batas, melainkan memiliki kemampuan kalibrasi cepat saat mendeteksi kejanggalan dalam relasi.",
      de: "Die Bindungsneurobiologie zeigt, dass sichere Personen Unstimmigkeiten rasch verarbeiten und klare Grenzen setzen, anstatt Warnsignale zu ignorieren.",
      fr: "La neurobiologie de l'attachement démontre que la sécurité affective repose sur la capacité à poser des limites fermes dès qu'un mensonge est identifié.",
      es: "La neurobiología del apego demuestra que la seguridad consiste en calibrar rápidamente la respuesta y establecer límites firmes cuando se detecta una mentira.",
    },
    recoveryProtocols: {
      en: [
        "Continue daily somatic check-ins before major interpersonal decisions.",
        "Practice non-judgmental validation when loved ones share difficult truths.",
        "Maintain clear non-negotiable boundaries around honesty and transparency.",
      ],
      id: [
        "Lanjutkan check-in tubuh harian sebelum mengambil keputusan relasional besar.",
        "Latih validasi tanpa menghakimi saat orang terdekat menceritakan kejujuran sulit.",
        "Pertahankan batas tegas yang tidak dapat dinegosiasikan seputar kejujuran.",
      ],
      de: [
        "Führen Sie regelmäßige somatische Reflexionen vor wichtigen Beziehungsentscheidungen durch.",
        "Pflegen Sie unverhandelbare Grenzen in puncto Transparenz und Aufrichtigkeit.",
        "Hören Sie weiterhin achtsam auf erste körperliche Warnsignale.",
      ],
      fr: [
        "Continuez vos bilans somatiques avant les décisions relationnelles majeures.",
        "Maintenez des limites non négociables concernant l'honnêteté et la clarté.",
        "Honorez votre intuition corporelle lors de nouvelles rencontres.",
      ],
      es: [
        "Continúa con pausas somáticas antes de tomar decisiones afectivas importantes.",
        "Mantén límites firmes e innegociables en torno a la transparencia y la verdad.",
        "Valora las señales sutiles de tu cuerpo como tu primer sistema de alarma.",
      ],
    },
  },

  mild_friction: {
    level: "mild_friction",
    badge: {
      en: "Guarded Vigilance",
      id: "Kewaspadaan Protektif",
      de: "Wachsame Vorsicht",
      fr: "Vigilance Protectrice",
      es: "Vigilancia Protectora",
    },
    title: {
      en: "Mild Betrayal Residue & Guardedness",
      id: "Sisa Trauma Pengkhianatan & Sikap Waspada",
      de: "Leichte Verratsrückstände & Vorsicht",
      fr: "Résidus de Trahison & Méfiance Légère",
      es: "Residuos de Traición y Cautela Moderada",
    },
    tagline: {
      en: "Past relational deception makes you second-guess your gut and hold back vulnerability.",
      id: "Kebohongan masa lalu membuatmu sering meragukan firasat sendiri dan menahan diri untuk terbuka.",
      de: "Frühere Täuschungen lassen Sie Ihr Bauchgefühl anzweifeln und Nähe dosieren.",
      fr: "Les tromperies passées vous amènent à douter de votre intuition et à retenir votre vulnérabilité.",
      es: "Engaños del pasado te llevan a dudar de tu intuición y a dosificar tu entrega emocional.",
    },
    description: {
      en: "You carry identifiable residues of past deception. While not completely incapacitated, your autonomic nervous system remains on yellow alert, prompting you to analyze inconsistencies and occasionally gaslight your own observations.",
      id: "Anda membawa sisa trauma kebohongan masa lalu. Meski tidak lumpuh total, sistem saraf otonom Anda berada dalam status waspada kuning, sering menganalisis inkonsistensi dan terkadang meragukan pengamatan sendiri.",
      de: "Sie tragen spürbare Spuren vergangener Enttäuschungen. Ihr Nervensystem verweilt im gelben Alarmmodus, was zu Zweifeln an der eigenen Wahrnehmung führt.",
      fr: "Vous conservez des séquelles manifestes de mensonges passés. Votre système nerveux reste en alerte modérée, vous poussant à suranalyser les détails.",
      es: "Guardas secuelas perceptibles de deslealtades pasadas. Tu sistema nervioso permanece en alerta amarilla, llevándote a sobreanalizar inconsistencias.",
    },
    clinicalInsight: {
      en: "Dr. Jennifer Freyd's research emphasizes that mild betrayal blindness often manifests as over-intellectualizing: trying to explain away a partner's odd behavior using logic rather than trusting your gut tightening.",
      id: "Riset Dr. Jennifer Freyd menekankan bahwa kebutaan pengkhianatan ringan kerap muncul sebagai over-intelektualisasi: berusaha merasionalkan perilaku aneh pasangan alih-alih mempercayai firasat tubuh.",
      de: "Dr. Jennifer Freyd zeigt, dass milde Verratsblindheit oft als Intellektualisierung auftritt: Man versucht, verdächtiges Verhalten logisch wegzuerklären.",
      fr: "Les travaux de Jennifer Freyd soulignent que la cécité modérée s'exprime par la rationalisation excessive des comportements suspects.",
      es: "La investigación de Jennifer Freyd muestra que la ceguera leve se manifiesta sobreintelectualizando las actitudes sospechosas de la pareja.",
    },
    recoveryProtocols: {
      en: [
        "Uncensored Voice Journaling: Express raw suspicions into a private journal without forcing yourself to be 'fair' or 'nice.'",
        "Reality Anchoring: Keep written notes of agreed-upon agreements to prevent post-conflict memory fog.",
        "Somatic Grounding: Practice 5-minute vagal breathing when feeling an urge to hyper-analyze texts.",
      ],
      id: [
        "Voice Journaling Tanpa Sensor: Rekam kecurigaan mentah ke jurnal privat tanpa memaksa diri harus 'berbaik sangka'.",
        "Pencatatan Fakta Nyata: Catat kesepakatan bersama secara tertulis untuk mencegah manipulasi ingatan (*gaslighting*).",
        "Penenangan Somatik: Latih napas vagal 5 menit saat muncul dorongan membedah isi chat orang lain secara obsesif.",
      ],
      de: [
        "Ungeschöntes Audio-Journaling: Sprechen Sie Zweifel laut aus, ohne sich zur Nachsicht zu zwingen.",
        "Faktenprotokoll: Halten Sie wichtige Absprachen schriftlich fest, um Gaslighting zu verhindern.",
        "Vagus-Atemübung: 5 Minuten verlängertes Ausatmen bei einsetzender Analyse-Panik.",
      ],
      fr: [
        "Journal vocal sans filtre : exprimez vos doutes bruts sans vous forcer à la complaisance.",
        "Ancrage dans les faits : notez les engagements pris pour neutraliser le brouillard mental.",
        "Respiration vagale : 5 minutes d'expiration prolongée pour calmer l'hyper-analyse.",
      ],
      es: [
        "Registro de voz sin censura: verbaliza tus sospechas sin forzarte a ser condescendiente.",
        "Anclaje en los hechos: escribe los acuerdos mutuos para evitar la niebla de la manipulación.",
        "Regulación vagal: 5 minutos de respiración profunda cuando sientas la necesidad de sobreanalizar.",
      ],
    },
  },

  acute_dysregulation: {
    level: "acute_dysregulation",
    badge: {
      en: "Hypervigilant Shock",
      id: "Guncangan Hiper-Waspada",
      de: "Akuter Alarmzustand",
      fr: "Choc Hypervigilant",
      es: "Alerta Aguda de Traición",
    },
    title: {
      en: "Acute Betrayal Trauma Dysregulation",
      id: "Disregulasi Trauma Pengkhianatan Akut",
      de: "Akute Verratstrauma-Dysregulation",
      fr: "Dérégulation Aiguë Liée à la Trahison",
      es: "Desregulación Aguda por Traición",
    },
    tagline: {
      en: "Your nervous system is in active fight-or-flight shock from uncovered deceit, cycling between nausea and panic.",
      id: "Sistem sarafmu berada dalam syok fight-or-flight akibat kebohongan yang terbongkar, berayun antara mual dan panik.",
      de: "Ihr Nervensystem befindet sich nach aufgedeckten Lügen im Kampf-oder-Flucht-Modus zwischen Übelkeit und Panik.",
      fr: "Votre système nerveux est en état de choc aigu face au mensonge, oscillant entre nausées viscérales et panique.",
      es: "Tu sistema nervioso se encuentra en estado de choque y alarma tras engaños descubiertos, oscilando entre náuseas y pánico.",
    },
    description: {
      en: "You are experiencing substantial symptoms of betrayal trauma. The discovery of hidden realities has shattered your cognitive equilibrium. Intrusive memories, visceral stomach cramping, sleep deprivation, and intense self-reproach indicate significant nervous system overwhelm.",
      id: "Anda mengalami gejala trauma pengkhianatan yang signifikan. Terbongkarnya kenyataan pahit telah mengguncang stabilitas mental Anda. Kilas balik obsesif, mual lambung, insomnia, dan menyalahkan diri sendiri adalah tanda beban saraf yang sangat berat.",
      de: "Sie leiden unter ausgeprägtem Verratstrauma. Die Enthüllung der Wahrheit hat Ihre Realität erschüttert. Flashbacks, Magenbeschwerden, Schlaflosigkeit und Selbstvorwürfe dominieren Ihren Alltag.",
      fr: "Vous traversez un traumatisme aigu de trahison. La révélation des faits a brisé votre sécurité intérieure. Flash-backs, crampes d'estomac et auto-reproches témoignent d'un débordement émotionnel.",
      es: "Estás experimentando un cuadro agudo de trauma por traición. La verdad descubierta ha quebrado tu sensación de seguridad. Recuerdos intrusivos, malestar estomacal e insomnio son señales de sobrecarga.",
    },
    clinicalInsight: {
      en: "Trauma research shows that betrayal by a trusted attachment figure activates the dorsal anterior cingulate cortex identically to severe physical injury. The physical sickness you feel is your body processing a neurological tear in safety.",
      id: "Riset trauma membuktikan bahwa pengkhianatan oleh figur lekat memicu korteks singulata anterior dorsal persis seperti luka fisik berat. Rasa sakit dan mual di perut adalah respon nyata atas hilangnya rasa aman.",
      de: "Klinische Studien belegen, dass der Vertrauensbruch durch nahestehende Personen im Gehirn dieselben Schmerzzentren aktiviert wie physische Verbrennungen.",
      fr: "La recherche clinique prouve que la trahison d'une figure d'attachement allume les zones cérébrales de la douleur physique intense.",
      es: "Los estudios neurobiológicos confirman que la traición de un ser querido activa las mismas vías neuronales que el dolor físico severo.",
    },
    recoveryProtocols: {
      en: [
        "Physiological Sighs & Cold Compresses: Use double-inhale cyclic sighs and cold water face splashes to reset adrenergic surges.",
        "Stop Self-Interrogation: Repeat aloud: 'I did not create this deceit. My blindness was my nervous system surviving until I had proof.'",
        "Establish Physical Safety: Create physical distance or strict communication parameters to stop ongoing nervous system re-triggering.",
        "Consult a Betrayal Trauma Specialist: Seek clinical support specializing in CSAT, EMDR, or somatic experiencing for relational infidelity.",
      ],
      id: [
        "Napas Siklik & Kompres Dingin: Gunakan double-inhale physiological sigh dan basuh wajah dengan air dingin untuk meredakan lonjakan adrenalin.",
        "Hentikan Menghakimi Diri: Katakan dengan lantang: 'Aku tidak menciptakan kebohongan ini. Ketidaktahuanku dulu adalah cara tubuhku bertahan sampai bukti nyata hadir.'",
        "Ciptakan Ruang Aman: Ambil jarak fisik atau tetapkan batas komunikasi tegas untuk menghentikan pemicu trauma yang terus berulang.",
        "Konsultasi Profesional: Temui psikolog klinis yang memahami trauma relasi, perselingkuhan, atau terapi EMDR/somatik.",
      ],
      de: [
        "Kaltwasser-Reize & Atemübungen: Doppeltes Einatmen mit langem Ausatmen zur Dämpfung der Adrenalinspitzen.",
        "Selbstvorwürfe stoppen: Sagen Sie sich: 'Ich habe die Täuschung nicht verursacht. Meine Unwissenheit war biologischer Selbstschutz.'",
        "Räumliche Distanz schaffen: Reduzieren Sie den Kontakt zum Auslöser, um dem Nervensystem Ruhe zu ermöglichen.",
        "Professionelle Begleitung: Suchen Sie Unterstützung bei traumaspezifischen Therapeuten (EMDR / Somatic Experiencing).",
      ],
      fr: [
        "Soupir physiologique & eau froide : double inspiration et expiration lente pour apaiser la tempête adrénergique.",
        "Cesser l'auto-culpabilisation : répétez 'Je n'ai pas causé ce mensonge. Mon aveuglement était un bouclier biologique.'",
        "Sécuriser votre environnement : prenez de la distance physique pour stopper la réactivation traumatique constante.",
        "Accompagnement thérapeutique : consultez un professionnel formé au trauma relationnel et à l'EMDR.",
      ],
      es: [
        "Suspiro fisiológico y agua fría: doble inhalación y exhalación prolongada para frenar los picos de adrenalina.",
        "Frena los autorreproches: repite en voz alta 'Yo no causé esta falsedad; mi mente solo me protegía hasta que tuve certeza'.",
        "Distancia física y límites: reduce el contacto con la fuente de dolor para permitir la recuperación del sistema nervioso.",
        "Terapia especializada: busca ayuda con terapeutas expertos en trauma vincular, infidelidad o EMDR.",
      ],
    },
  },

  severe_shattering: {
    level: "severe_shattering",
    badge: {
      en: "Profound Attachment Shattering",
      id: "Kehancuran Kelekatan Berat",
      de: "Schwere Verratserschütterung",
      fr: "Effondrement Traumatique Majeur",
      es: "Ruptura Traumática Profunda",
    },
    title: {
      en: "Severe Betrayal Trauma & Identity Shattering",
      id: "Trauma Pengkhianatan Berat & Runtuhnya Rasa Diri",
      de: "Schwere Verratserschütterung & Identitätskrise",
      fr: "Traumatisme Majeur de la Trahison & Perte de Repères",
      es: "Trauma Profundo por Traición y Colapso del Yo",
    },
    tagline: {
      en: "Pervasive systemic deception has dismantled your foundational safety, sense of reality, and physical health.",
      id: "Kebohongan sistematis berskala besar telah meremukkan rasa aman mendasar, persepsi realitas, dan kesehatan fisikmu.",
      de: "Systematische Täuschung hat Ihr Grundvertrauen, Ihre Realitätswahrnehmung und Ihre Gesundheit tief erschüttert.",
      fr: "Une tromperie systémique a pulvérisé votre sécurité fondamentale, votre vision du réel et votre santé.",
      es: "Un engaño sistemático y prolongado ha desmantelado tu seguridad básica, tu percepción de la realidad y tu salud.",
    },
    description: {
      en: "Your scores reflect acute, severe betrayal trauma with widespread somatic and cognitive disruption. The level of deceit experienced has destabilized your fundamental sense of reality, prompting profound depersonalization, constant panic, and total loss of self-trust. Immediate, compassionate trauma triage is warranted.",
      id: "Skor Anda menunjukkan trauma pengkhianatan tingkat berat dengan gangguan kognitif dan fisik menyeluruh. Kebohongan yang dialami telah melumpuhkan rasa aman Anda, memicu depersonalisasi, kepanikan konstan, dan hancurnya rasa percaya diri. Pemulihan segera dan pendampingan penuh welas asih sangat diperlukan.",
      de: "Ihr Ergebnis spiegelt ein schweres Verratstrauma mit massiven körperlichen und seelischen Belastungen wider. Das Erlebte hat Ihr Realitätsgefühl destabilisiert und erfordert dringende, einfühlsame Unterstützung.",
      fr: "Votre score indique un traumatisme de trahison aigu avec des répercussions physiques et psychologiques majeures. Vos repères fondamentaux sont anéantis ; un soutien thérapeutique bienveillant s'impose d'urgence.",
      es: "Tu resultado evidencia un trauma severo por traición con repercusiones somáticas y emocionales profundas. El engaño vivido ha destruido tus certezas básicas; requieres contención y apoyo profesional inmediato.",
    },
    clinicalInsight: {
      en: "Dr. Jennifer Freyd notes that high-level betrayal trauma involves existential gaslighting—where the victim feels their entire history was an illusion. Neural rewiring requires external co-regulation, safe non-deceptive environments, and structured somatic trauma therapy.",
      id: "Dr. Jennifer Freyd mencatat bahwa trauma pengkhianatan tingkat tinggi melibatkan 'gaslighting eksistensial'—di mana korban merasa seluruh sejarah hidupnya palsu. Pemulihan saraf membutuhkan ruang aman yang jujur dan terapi somatik terstruktur.",
      de: "Dr. Jennifer Freyd betont, dass schwere Traumata die gesamte persönliche Biographie infrage stellen. Die Heilung verlangt sichere, ehrliche Räume und gezielte Traumatherapie.",
      fr: "Jennifer Freyd rappelle que les trahisons majeures entraînent un doute existentiel sur sa propre histoire. La réparation exige des liens d'une fiabilité absolue.",
      es: "Jennifer Freyd explica que los traumas graves cuestionan la historia completa del individuo. Sanar requiere entornos de absoluta transparencia y terapia estructurada.",
    },
    recoveryProtocols: {
      en: [
        "Immediate Crisis Stabilization: Prioritize basic biological needs—sleep, nutrient-rich broths, electrolyte hydration, and warm sensory blankets.",
        "Non-Negotiable Truth Circle: Confide only in individuals with zero ties to the betrayer who offer unconditional validation.",
        "Daily Voice De-escalation: Speak unvarnished feelings into your encrypted audio journal to offload catastrophic amygdala loops.",
        "Trauma-Informed Professional Care: Work with a licensed clinician certified in complex trauma (C-PTSD) or EMDR therapy.",
      ],
      id: [
        "Stabilisasi Krisis Segera: Utamakan kebutuhan biologis mendasar—tidur, sup bergizi hangat, hidrasi elektrolit, dan selimut berbobot hangat.",
        "Lingkaran Kejujuran Terpercaya: Berceritalah hanya kepada orang yang sama sekali tidak memihak pelaku dan memberikan validasi tulus.",
        "Dekompresi Suara Harian: Keluarkan perasaan tanpa filter ke voice journal pribadi untuk menguras putaran panik di amigdala.",
        "Bantuan Klinis Khusus Trauma: Dapatkan pendampingan psikolog klinis berlisensi yang memahami trauma kompleks (C-PTSD) atau EMDR.",
      ],
      de: [
        "Akute Krisenstabilisierung: Sichern Sie Grundbedürfnisse – Schlaf, warme Mahlzeiten, Ruhe und warme Decken.",
        "Sicheres soziales Netz: Sprechen Sie nur mit Menschen, die Ihnen unvoreingenommen beistehen und nicht mit dem Verursacher verflochten sind.",
        "Auditives Entlasten: Nutzen Sie Ihr verschlüsseltes Audiotagebuch, um Panikschleifen des Gehirns zu unterbrechen.",
        "Traumatherapie: Ziehen Sie zeitnah einen qualifizierten Traumatherapeuten hinzu.",
      ],
      fr: [
        "Stabilisation d'urgence : priorisez le sommeil, une alimentation réconfortante et un cocon chaleureux.",
        "Cercle de sécurité absolue : ne vous confiez qu'à des proches loyaux qui ne minimisent pas votre souffrance.",
        "Décharge émotionnelle vocale : déposez vos peurs dans un journal audio sécurisé pour désamorcer l'amygdale.",
        "Prise en charge spécialisée : engagez une thérapie orientée trauma (EMDR, ICV ou Somatic Experiencing).",
      ],
      es: [
        "Estabilización inmediata: atiende necesidades biológicas básicas (sueño, alimento tibio, hidratación y mantas reconfortantes).",
        "Círculo de verdad: habla únicamente con personas leales y empáticas sin vínculos con quien te traicionó.",
        "Descarga emocional en voz: graba tus sentimientos en tu diario privado para desahogar los bucles de pánico.",
        "Atención profesional: recurre a terapeutas certificados en trauma complejo (TEPT-C) o reprocesamiento EMDR.",
      ],
    },
  },
};

export interface BetrayalTraumaScoreResult {
  totalScore: number;
  maxScore: number;
  percentage: number;
  level: BetrayalTraumaLevel;
  profile: BetrayalTraumaProfile;
  subscales: {
    betrayal_blindness: { score: number; max: number; percentage: number };
    hypervigilance_mistrust: { score: number; max: number; percentage: number };
    interoceptive_dysregulation: { score: number; max: number; percentage: number };
  };
}

export function calculateBetrayalTraumaScore(
  answers: Record<number, number>
): BetrayalTraumaScoreResult {
  let totalScore = 0;
  let blindnessScore = 0;
  let hypervigilanceScore = 0;
  let interoceptiveScore = 0;

  BETRAYAL_TRAUMA_QUESTIONS.forEach((q) => {
    const val = answers[q.id] ?? 0;
    totalScore += val;
    if (q.dimension === "betrayal_blindness") blindnessScore += val;
    if (q.dimension === "hypervigilance_mistrust") hypervigilanceScore += val;
    if (q.dimension === "interoceptive_dysregulation") interoceptiveScore += val;
  });

  const maxScore = BETRAYAL_TRAUMA_QUESTIONS.length * 3; // 36
  const percentage = Math.round((totalScore / maxScore) * 100);

  let level: BetrayalTraumaLevel = "secure_integration";
  if (totalScore >= 28) {
    level = "severe_shattering";
  } else if (totalScore >= 19) {
    level = "acute_dysregulation";
  } else if (totalScore >= 10) {
    level = "mild_friction";
  } else {
    level = "secure_integration";
  }

  const profile = BETRAYAL_TRAUMA_PROFILES[level];

  return {
    totalScore,
    maxScore,
    percentage,
    level,
    profile,
    subscales: {
      betrayal_blindness: {
        score: blindnessScore,
        max: 12,
        percentage: Math.round((blindnessScore / 12) * 100),
      },
      hypervigilance_mistrust: {
        score: hypervigilanceScore,
        max: 12,
        percentage: Math.round((hypervigilanceScore / 12) * 100),
      },
      interoceptive_dysregulation: {
        score: interoceptiveScore,
        max: 12,
        percentage: Math.round((interoceptiveScore / 12) * 100),
      },
    },
  };
}
