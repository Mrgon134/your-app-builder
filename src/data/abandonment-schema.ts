export type AbandonmentSchemaCardLang = "en" | "id" | "de" | "fr" | "es";

export interface AbandonmentSchemaQuestion {
  id: number;
  subscale:
    | "anticipatory_desertion_terror"
    | "clinging_testing_protest"
    | "relational_fragility_conviction";
  text: Record<AbandonmentSchemaCardLang, string>;
}

export interface AbandonmentSchemaResultLevel {
  level:
    | "secure_relational_anchoring"
    | "mild_abandonment_sensitivity"
    | "moderate_schema_reactivity"
    | "severe_abandonment_panic"
    | "acute_attachment_terror_despair";
  scoreRange: [number, number];
  title: Record<AbandonmentSchemaCardLang, string>;
  badge: Record<AbandonmentSchemaCardLang, string>;
  summary: Record<AbandonmentSchemaCardLang, string>;
  psychology: Record<AbandonmentSchemaCardLang, string>;
  actionProtocol: Record<AbandonmentSchemaCardLang, string[]>;
}

export const ABANDONMENT_SCHEMA_QUESTIONS: AbandonmentSchemaQuestion[] = [
  // 1. Anticipatory Desertion Terror
  {
    id: 1,
    subscale: "anticipatory_desertion_terror",
    text: {
      en: "If a partner or close friend takes longer than usual to reply to a text, my nervous system triggers acute panic that they are leaving me.",
      id: "Jika pasangan atau sahabat membalas pesan lebih lama dari biasanya, sistem sarafku langsung panik mengira mereka akan meninggalkanku.",
      de: "Wenn ein Partner oder enger Freund länger als gewohnt für eine Antwort braucht, reagiert mein Nervensystem mit akuter Panik.",
      fr: "Si un partenaire ou un ami tarde à répondre à un message, mon système nerveux déclenche une panique aiguë de rupture.",
      es: "Si mi pareja o un amigo cercano tarda más de lo habitual en responder un mensaje, mi sistema nervioso entra en pánico de abandono.",
    },
  },
  // 2. Clinging, Testing & Protest
  {
    id: 2,
    subscale: "clinging_testing_protest",
    text: {
      en: "I find myself repeatedly asking for verbal reassurance ('Do you still love me? Are you tired of me?') to calm somatic anxiety in my chest.",
      id: "Aku sering menuntut penegasan verbal ('Kamu masih sayang kan sama aku? Kamu nggak bosan kan?') demi meredakan kecemasan di dada.",
      de: "Ich ertappe mich dabei, ständig nach Bestätigung zu fragen ('Liebst du mich noch?'), um die Unruhe in meiner Brust zu beruhigen.",
      fr: "Je me surprends à demander sans cesse des preuves d'affection ('Tu m'aimes toujours ?') pour apaiser l'angoisse dans ma poitrine.",
      es: "Me sorprendo pidiendo reafirmación constante ('¿Me sigues queriendo? ¿No te has cansado de mí?') para calmar la angustia en el pecho.",
    },
  },
  // 3. Relational Fragility Conviction
  {
    id: 3,
    subscale: "relational_fragility_conviction",
    text: {
      en: "Deep down, I hold an unshakeable belief that anyone who gets close to me will eventually get bored, find someone better, or disappear.",
      id: "Jauh di lubuk hati, aku memegang keyakinan kuat bahwa siapa pun yang dekat denganku pada akhirnya akan bosan, mencari yang lebih baik, atau menghilang.",
      de: "Tief im Inneren bin ich überzeugt, dass jeder, der mir nahekommt, sich irgendwann langweilt, jemanden Besseren findet oder verschwindet.",
      fr: "Au fond de moi, j'ai la conviction inébranlable que quiconque s'approche finira par se lasser, trouver mieux ou disparaître.",
      es: "En el fondo, creo firmemente que cualquiera que se acerque terminará aburriéndose de mí, encontrando a alguien mejor o desapareciendo.",
    },
  },
  // 4. Anticipatory Desertion Terror
  {
    id: 4,
    subscale: "anticipatory_desertion_terror",
    text: {
      en: "A subtle shift in someone's tone of voice or facial expression makes me instantly dread that a sudden breakup or abandonment is imminent.",
      id: "Perubahan nada suara atau raut wajah orang terdekat membuatku langsung takut akan terjadinya perpisahan mendadak.",
      de: "Eine minimale Nuance in der Stimmlage oder Mimik lässt mich sofort fürchten, dass ein plötzlicher Beziehungsabbruch bevorsteht.",
      fr: "Un léger changement de ton ou d'expression faciale me fait immédiatement craindre une rupture imminente.",
      es: "Un cambio sutil en el tono de voz o la mirada de alguien me hace temer un distanciamiento o ruptura inminente.",
    },
  },
  // 5. Clinging, Testing & Protest
  {
    id: 5,
    subscale: "clinging_testing_protest",
    text: {
      en: "I sometimes test my partner's loyalty by creating artificial conflict or threatening to leave just to see if they will fight to keep me.",
      id: "Aku terkadang menguji kesetiaan pasangan dengan memicu pertengkaran atau mengancam pergi, hanya demi melihat apakah mereka mengejarku.",
      de: "Manchmal teste ich die Loyalität meines Partners, indem ich Streit provoziere, nur um zu sehen, ob er um mich kämpft.",
      fr: "Je teste parfois la loyauté de l'autre en provoquant des conflits ou en menaçant de partir pour vérifier qu'il me retient.",
      es: "A veces pongo a prueba la lealtad de mi pareja provocando discusiones o amenazando con irme solo para ver si lucha por retenerme.",
    },
  },
  // 6. Relational Fragility Conviction
  {
    id: 6,
    subscale: "relational_fragility_conviction",
    text: {
      en: "Even in the happiest moments of love, a dark whisper shadows me: 'Enjoy this now, because it cannot last and the grief will destroy you.'",
      id: "Bahkan di saat-saat paling bahagia dalam cinta, ada bisikan kelam: 'Nikmati saja selagi ada, karena ini tak akan bertahan dan sakitnya akan menghancurkanmu.'",
      de: "Selbst in den glücklichsten Momenten der Zweisamkeit flüstert eine innere Stimme: 'Genieße es, solange es dauert – das Ende wird dich zerreißen.'",
      fr: "Même dans les moments les plus doux, une ombre me dit : 'Profites-en vite, car cela ne durera pas et le chagrin va t'anéantir.'",
      es: "Incluso en los momentos más felices en pareja, una voz oscura me advierte: 'Aprovéchalo, porque terminará y el dolor te destruirá.'",
    },
  },
  // 7. Anticipatory Desertion Terror
  {
    id: 7,
    subscale: "anticipatory_desertion_terror",
    text: {
      en: "Physical separations (trips, busy work weeks, independent hobbies) feel threatening rather than like healthy autonomy.",
      id: "Perpisahan fisik sementara (perjalanan luar kota, minggu kerja yang sibuk) terasa seperti ancaman nyata, bukan kemandirian yang sehat.",
      de: "Räumliche Trennungen (Dienstreisen, Hobbys ohne mich) empfinde ich als existenzielle Bedrohung statt als gesunde Autonomie.",
      fr: "Les séparations physiques ponctuelles (voyages, travail, loisirs séparés) me paraissent menaçantes plutôt que saines.",
      es: "Las separaciones físicas temporales (viajes, semanas ocupadas) se sienten como una amenaza en lugar de una autonomía sana.",
    },
  },
  // 8. Clinging, Testing & Protest
  {
    id: 8,
    subscale: "clinging_testing_protest",
    text: {
      en: "I have 'pre-emptively abandoned' someone I genuinely loved—breaking up first out of sheer terror of being dumped later.",
      id: "Aku pernah 'meninggalkan orang terlebih dahulu' padahal sangat mencintainya—memutus hubungan lebih awal karena takut dicampakkan duluan.",
      de: "Ich habe schon Beziehungen beendet, die ich liebte – aus purer Panik, andernfalls selbst abserviert zu werden.",
      fr: "J'ai déjà rompu préventivement avec quelqu'un que j'aimais sincèrement, par pure terreur d'être rejeté le premier.",
      es: "He roto preventivamente con personas a las que amaba de verdad, por el pánico atroz a ser abandonado después.",
    },
  },
  // 9. Relational Fragility Conviction
  {
    id: 9,
    subscale: "relational_fragility_conviction",
    text: {
      en: "I feel emotionally addicted to relationships, finding it almost intolerable to exist in single solitude without an external anchor.",
      id: "Aku merasa kecanduan hubungan asmara; hidup sendiri tanpa jangkar kasih sayang orang lain terasa hampir tak tertahankan.",
      de: "Ich fühle mich emotional beziehungsabhängig; allein zu sein ohne äußeren Partneranker ist für mich kaum auszuhalten.",
      fr: "Je me sens dépendant affectif : être seul sans ancre relationnelle m'est presque insupportable.",
      es: "Siento adicción emocional al apego; estar soltero sin un ancla afectiva externa se vuelve casi intolerable.",
    },
  },
  // 10. Anticipatory Desertion Terror
  {
    id: 10,
    subscale: "anticipatory_desertion_terror",
    text: {
      en: "When someone doesn't answer the phone, my mind jumps immediately to catastrophic scenarios (they died in an accident, or they decided to vanish).",
      id: "Saat seseorang tidak mengangkat telepon, pikiranku langsung melompat ke skenario bencana (mereka tewas kecelakaan, atau sengaja menghilang).",
      de: "Wenn jemand nicht ans Telefon geht, malt mein Geist sofort Horrorszenarien aus (tödlicher Unfall oder stiller Kontaktabbruch).",
      fr: "Si l'autre ne décroche pas, j'imagine aussitôt le pire (accident mortel ou disparition délibérée).",
      es: "Si alguien no contesta el teléfono, imagino de inmediato escenarios catastróficos (un accidente grave o abandono definitivo).",
    },
  },
  // 11. Clinging, Testing & Protest
  {
    id: 11,
    subscale: "clinging_testing_protest",
    text: {
      en: "I over-adapt, silence my own needs, or become hyper-compliant because I believe conflict will result in immediate rejection.",
      id: "Aku menekan kebutuhanku sendiri dan menjadi sangat penurut karena percaya bahwa perselisihan kecil akan berujung pemutusan hubungan.",
      de: "Ich passe mich völlig an und unterdrücke eigene Wünsche, weil ich fürchte, jeder Konflikt führt zur sofortigen Trennung.",
      fr: "Je m'écrase et sur-adapte mes besoins par peur panique que le moindre désaccord entraîne mon rejet.",
      es: "Me adapto en exceso y reprimo mis necesidades porque temo que cualquier conflicto cause un rechazo inmediato.",
    },
  },
  // 12. Relational Fragility Conviction
  {
    id: 12,
    subscale: "relational_fragility_conviction",
    text: {
      en: "I feel an empty, aching vacuum in my chest when I am not directly interacting with or being validated by my primary attachment figure.",
      id: "Muncul rasa hampa dan ngilu di dada saat aku tidak sedang berinteraksi langsung atau divalidasi oleh pasangan/orang terdekatku.",
      de: "Ich spüre ein schmerzhaftes Vakuum in der Brust, wenn ich nicht im direkten Kontakt mit meiner wichtigsten Bezugsperson stehe.",
      fr: "Je ressens un vide douloureux dans la poitrine quand je ne suis pas en contact direct ou validé par mon partenaire.",
      es: "Siento un vacío doloroso en el pecho cuando no estoy interactuando directamente o siendo validado por mi figura de apego.",
    },
  },
];

export const ABANDONMENT_SCHEMA_RESULTS: AbandonmentSchemaResultLevel[] = [
  {
    level: "secure_relational_anchoring",
    scoreRange: [0, 8],
    title: {
      en: "Secure Relational Anchoring (Minimal Abandonment Schema)",
      id: "Jangkar Relasi Aman (Skema Pengabaian Sangat Rendah)",
      de: "Sichere Beziehungserdung (Minimales Verlassenheitsschema)",
      fr: "Ancrage Relationnel Sécure (Schéma d'Abandon Minime)",
      es: "Anclaje Relacional Seguro (Mínimo Esquema de Abandono)",
    },
    badge: {
      en: "Secure Attachment Core",
      id: "Pondasi Hubungan Aman",
      de: "Sicherer Bindungskern",
      fr: "Noyau Sécure",
      es: "Apego Seguro",
    },
    summary: {
      en: "You possess robust object constancy and secure attachment. Temporary silence, independent hobbies, or busy schedules from loved ones do not trigger somatic panic or fears of desertion.",
      id: "Kamu memiliki ketetapan objek (object constancy) yang kuat dan gaya kelekatan aman. Kesibukan atau keheningan sementara orang terdekat tidak memicu kepanikan batin.",
      de: "Sie verfügen über gesunde Objektkonstanz und sichere Bindung. Zeitweilige Stille oder getrennte Wege lösen keine Verlustpanik aus.",
      fr: "Vous possédez une excellente constance de l'objet et un attachement sécure. La distance temporaire ne déclenche pas d'angoisse d'abandon.",
      es: "Posees una sólida constancia de objeto y apego seguro. La distancia temporal o la falta de respuesta inmediata no provocan pánico.",
    },
    psychology: {
      en: "In Schema Therapy, you have high 'Healthy Adult' mode activation. You instinctively understand that physical absence or boundary-taking does not equate to emotional withdrawal.",
      id: "Dalam Terapi Skema, mode 'Dewasa Sehat' milikmu sangat aktif. Kamu memahami secara naluriah bahwa jeda fisik bukanlah penolakan cinta.",
      de: "Im Modus des 'Gesunden Erwachsenen' verstehen Sie instinktiv, dass Distanz nicht Liebesentzug bedeutet.",
      fr: "Votre mode 'Adulte Sain' est bien développé : vous comprenez que l'indépendance de l'autre ne signifie pas le désamour.",
      es: "En Terapia de Esquemas, tu modo 'Adulto Sano' está plenamente consolidado. Entiendes que la autonomía ajena no implica desamor.",
    },
    actionProtocol: {
      en: [
        "Continue celebrating mutual autonomy and separate friendships in relationships.",
        "Model open, non-defensive communication during occasional misunderstandings.",
        "Use private audio journaling for reflective self-expansion.",
      ],
      id: [
        "Terus jaga kemandirian dan persahabatan masing-masing dalam berpasangan.",
        "Terapkan komunikasi terbuka tanpa defensif saat terjadi salah paham kecil.",
        "Gunakan jurnal refleksi suara untuk merawat pertumbuhan pribadi.",
      ],
      de: [
        "Fördern Sie weiterhin gesunde gegenseitige Autonomie in Partnerschaften.",
        "Kommunizieren Sie offen und gelassen bei Meinungsverschiedenheiten.",
        "Nutzen Sie Selbstreflexion für emotionale Reifung.",
      ],
      fr: [
        "Continuez à cultiver l'autonomie et les espaces séparés dans le couple.",
        "Pratiquez une communication sereine lors des malentendus passagers.",
        "Utilisez le journal audio pour approfondir votre conscience de soi.",
      ],
      es: [
        "Sigue promoviendo la autonomía mutua y los espacios propios.",
        "Mantén una comunicación serena y abierta ante cualquier discrepancia.",
        "Usa la grabación privada para la introspección cotidiana.",
      ],
    },
  },

  {
    level: "mild_abandonment_sensitivity",
    scoreRange: [9, 16],
    title: {
      en: "Mild Attachment Sensitivity",
      id: "Sensitivitas Kelekatan Ringan",
      de: "Leichte Bindungssensibilität",
      fr: "Sensibilité d'Attachement Légère",
      es: "Sensibilidad de Apego Leve",
    },
    badge: {
      en: "Vulnerable Heart",
      id: "Hati Sensitif",
      de: "Verletzliches Herz",
      fr: "Cœur Sensible",
      es: "Corazón Sensible",
    },
    summary: {
      en: "You have an underlying sensitivity to feeling left out or deprioritized. While you generally manage it well, extended periods of distance or ambiguous communication cause brief flares of somatic insecurity.",
      id: "Kamu memiliki kepekaan terhadap rasa dikesampingkan. Meskipun umumnya bisa dikendalikan, jeda komunikasi yang ambigu kerap memicu rasa cemas sesaat.",
      de: "Sie reagieren empfindsam auf emotionale Distanz. Längere Funkstille löst vorübergehend Unsicherheit und innere Anspannung aus.",
      fr: "Vous êtes sensible au sentiment d'éloignement. Un silence prolongé éveille une brève insécurité corporelle.",
      es: "Tienes una sensibilidad latente al distanciamiento. Los silencios prolongados provocan ligeras oleadas de inseguridad.",
    },
    psychology: {
      en: "This reflects mild activation of the Abandonment Early Maladaptive Schema (EMS). The 'Vulnerable Child' part experiences sudden loneliness, but your adult reasoning quickly re-stabilizes equilibrium.",
      id: "Ini mencerminkan aktivasi ringan Skema Pengabaian. Sisi 'Anak Rentan' merasa cemas sesaat, tetapi logika dewasamu mampu menenangkan kembali.",
      de: "Das 'Verletzliche Kind' meldet sich kurz mit Einsamkeitsgefühlen, doch Ihr Erwachsenen-Ich fängt die Unsicherheit meist auf.",
      fr: "La part 'Enfant Vulnérable' s'active brièvement, mais votre esprit adulte parvient à rétablir l'équilibre.",
      es: "La parte del 'Niño Vulnerable' experimenta soledad fugaz, pero tu criterio adulto restablece el equilibrio.",
    },
    actionProtocol: {
      en: [
        "Pause before asking for reassurance: Take 3 long exhales to calm the vagus nerve first.",
        "Practice 'Object Permanence' visualization: Remind yourself that someone's love remains real even when unseen.",
        "Voice your temporary vulnerability into Nuju instead of sending double-texts.",
      ],
      id: [
        "Tunda meminta penegasan: Tarik napas panjang 3 kali untuk menenangkan sistem saraf terlebih dahulu.",
        "Latih visualisasi keberadaan cinta: Ingatkan diri bahwa kasih sayang pasangan tetap ada meski tidak sedang terlihat.",
        "Rekam kecemasan sesaatmu di Nuju daripada mengirim rentetan chat beruntun.",
      ],
      de: [
        "Innehalten vor Rückversicherungs-Fragen: Erst 3 lange Atemzüge nehmen.",
        "Visualisieren Sie emotionale Beständigkeit: Liebe existiert auch in der Abwesenheit.",
        "Sprechen Sie Ihre Unruhe in Nuju ein, anstatt ungeduldige Textnachrichten zu tippen.",
      ],
      fr: [
        "Faites une pause avant de demander à être rassuré : respirez profondément.",
        "Visualisez la permanence du lien : l'amour persiste même hors de vue.",
        "Déposez vos doutes passagers dans Nuju au lieu d'envoyer des messages répétés.",
      ],
      es: [
        "Pausa antes de pedir confirmación: respira hondo 3 veces.",
        "Visualiza la constancia afectiva: el amor sigue existiendo aunque no se vea.",
        "Graba tu inquietud en Nuju en lugar de mandar mensajes compulsivos.",
      ],
    },
  },

  {
    level: "moderate_schema_reactivity",
    scoreRange: [17, 24],
    title: {
      en: "Moderate Abandonment Schema Activation",
      id: "Reaktivitas Skema Pengabaian Sedang",
      de: "Moderate Aktivierung des Verlassenheitsschemas",
      fr: "Activation Modérée du Schéma d'Abandon",
      es: "Activación Moderada del Esquema de Abandono",
    },
    badge: {
      en: "Relational Hyper-Vigilance",
      id: "Hipervigilansi Hubungan",
      de: "Beziehungshypersensibilität",
      fr: "Hypervigilance Relationnelle",
      es: "Hipervigilancia Relacional",
    },
    summary: {
      en: "The fear of being abandoned frequently steers your romantic relationships. You engage in protest behaviors (testing partners, over-pleasing, or pulling away first) and experience palpable visceral distress when partners need space.",
      id: "Ketakutan ditinggalkan kerap mengendalikan dinamika asmaramu. Kamu melakukan 'protest behavior' (menguji pasangan, terlalu menyenangkan orang, atau menarik diri duluan) dan merasa tersiksa saat pasangan butuh ruang.",
      de: "Die Angst vor dem Verlassenwerden bestimmt Ihre Beziehungen. Sie neigen zu Protestverhalten (Partner testen, überanpassen oder vorab distanzieren) bei gefühlter Kälte.",
      fr: "La peur de l'abandon pilote souvent vos relations. Vous recourez à des comportements de protestation (tests, soumission ou fuite préventive).",
      es: "El miedo al abandono influye notablemente en tus vínculos. Recurres a conductas de protesta (poner a prueba, complacencia forzada o alejarte antes).",
    },
    psychology: {
      en: "Dr. Jeffrey Young showed that children who experienced unpredictable emotional availability develop a perpetual 'radar for desertion'. The body treats romantic space as a life-or-death survival threat.",
      id: "Dr. Jeffrey Young menemukan bahwa anak yang tumbuh dengan kasih sayang tak konsisten membentuk 'radar pengabaian' abadi. Tubuh memperlakukan jarak emosional sebagai ancaman kelangsungan hidup.",
      de: "Wer in der Kindheit unberechenbare Zuwendung erlebte, entwickelt ein Verlust-Radar: Autonomie des Partners wird als Bedrohung fehlinterpretiert.",
      fr: "Une affection imprévisible durant l'enfance forge un radar permanent d'abandon : la distance normale est perçue comme un péril vital.",
      es: "La disponibilidad afectiva impredecible en la infancia crea un radar perpetuo de abandono: el espacio normal se percibe como amenaza de muerte.",
    },
    actionProtocol: {
      en: [
        "Catch the 'Protest Impulse': Recognize testing behaviors as cries for safety, and communicate directly instead: 'I'm feeling a little disconnected right now.'",
        "Tolerate 24-Hour Independence: Practice spending an entire Saturday without needing validation to rebuild self-containment.",
        "Unload Attachment Panic into Nuju: When the burning urge to text repeatedly hits, speak the unedited panic into Nuju's encrypted diary.",
      ],
      id: [
        "Sadari Impuls Protes: Kenali perilaku menguji sebagai tangisan butuh rasa aman, dan gantilah dengan komunikasi jujur: 'Aku sedang merasa sedikit kurang terkoneksi hari ini.'",
        "Latih Kemandirian 24 Jam: Luangkan waktu tanpa menuntut validasi pasangan untuk membangun wadah emosional mandiri.",
        "Keluarkan Panik Kelekatan di Nuju: Saat dorongan chat beruntun membakar dada, tumpahkan seluruh ketakutanmu ke jurnal suara terenkripsi Nuju.",
      ],
      de: [
        "Protestverhalten stoppen: Sprechen Sie Bedürfnisse direkt an, statt Vorwürfe zu inszenieren.",
        "Üben Sie bewusste Alleinzeit ohne ständige Bestätigung.",
        "Entladen Sie Verlustpanik im Nuju Sprachjournal, um den Impuls abzufangen.",
      ],
      fr: [
        "Repérez les comportements de protestation et exprimez directement votre besoin de réassurance.",
        "Apprivoisez la solitude choisie pour fortifier votre sécurité interne.",
        "Exprimez votre angoisse dans le journal vocal Nuju pour désamorcer l'impulsivité.",
      ],
      es: [
        "Frena la conducta de protesta: comunica con calma 'Me siento algo inseguro hoy'.",
        "Tolera momentos de soledad deliberada para fortalecer tu autosuficiencia.",
        "Descarga el impulso de reclamo en el diario de voz privado Nuju.",
      ],
    },
  },

  {
    level: "severe_abandonment_panic",
    scoreRange: [25, 31],
    title: {
      en: "Severe Abandonment Schema & Attachment Panic",
      id: "Skema Pengabaian Berat & Panik Kelekatan",
      de: "Schweres Verlassenheitsschema & Bindungspanik",
      fr: "Schéma d'Abandon Sévère & Panique d'Attachement",
      es: "Esquema de Abandono Severo & Pánico de Apego",
    },
    badge: {
      en: "Acute Attachment Alarm",
      id: "Alarm Kelekatan Akut",
      de: "Akuter Bindungsalarm",
      fr: "Alerte d'Attachement Aiguë",
      es: "Alarma Aguda de Apego",
    },
    summary: {
      en: "Your nervous system lives in constant terror of romantic devastation. You either cling desperately, cycle through intense jealousy and rage, or sabotage great relationships by breaking up pre-emptively to escape the agony of being left.",
      id: "Sistem sarafmu hidup dalam teror kehancuran asmara terus-menerus. Kamu bergantung mati-matian, dilanda cemburu buta, atau menyabotase hubungan indah dengan memutuskan pasangan terlebih dahulu agar terhindar dari rasa sakit.",
      de: "Ihr Nervensystem befindet sich im Daueralarm vor Beziehungstragödien. Sie klammern verzweifelt, erleben quälende Eifersucht oder zerstören gesunde Bindungen präventiv.",
      fr: "Votre système nerveux vit dans la terreur de la rupture. Vous vous agrippez désespérément, oscillez entre jalousie et panique, ou sabotez vos relations pour fuir l'angoisse.",
      es: "Tu sistema nervioso vive en constante terror al abandono. Te aferras con desesperación, sufres celos intensos o saboteas vínculos sanos rompiendo antes por pánico.",
    },
    psychology: {
      en: "In Schema Therapy, the 'Vulnerable Child' is overwhelmed by intense dread, while a 'Protector' mode lashes out or pushes others away. The paradox of the abandonment schema is that the desperate efforts to prevent abandonment frequently push healthy partners away.",
      id: "Mode 'Anak Rentan' diliputi teror, sementara mode 'Pelindung' menyerang balik atau mengusir orang lain. Paradoksnya: upaya putus asa mencegah pengabaian justru mendorong pasangan menjauh.",
      de: "Das 'Verlassene Kind' ertrinkt in Panik, während Schutzmodi den Partner durch Klammern oder Attacken überfordern – eine sich selbst erfüllende Prophezeiung.",
      fr: "L'enfant intérieur est terrifié, déclenchant des réactions excessives qui finissent par provoquer la rupture redoutée.",
      es: "El niño vulnerable se desborda de pánico; los intentos desesperados por retener al otro terminan paradójicamente asfixiándolo y provocando el abandono.",
    },
    actionProtocol: {
      en: [
        "Reparenting Practice: In moments of panic, place a hand over your heart and repeat: 'I am here with you. Even if they leave, I will never abandon myself.'",
        "Stop Pre-emptive Breakups: Commit to a 48-hour cool-off rule before ending any relationship during an anxiety spike.",
        "Somatic Catharsis in Nuju: Speak your raw childhood fears into Nuju's zero-knowledge encrypted vault. Let the inner child cry out loud safely.",
      ],
      id: [
        "Latihan Reparenting Mandiri: Saat panik melanda, letakkan tangan di dada dan bisikkan: 'Aku ada di sini bersamamu. Bahkan jika orang lain pergi, aku tidak akan pernah meninggalkan diriku sendiri.'",
        "Hentikan Pemutusan Hubungan Sepihak: Buat komitmen jeda 48 jam sebelum mengambil keputusan putus saat cemas memuncak.",
        "Katarsis Suara di Nuju: Ungkapkan rasa takut masa kecilmu ke dalam brankas suara terenkripsi Nuju. Biarkan sisi anak rentan menangis bebas tanpa malu.",
      ],
      de: [
        "Selbstbeelterung: Hand aufs Herz legen: 'Ich verlasse mich niemals selbst.'",
        "48-Stunden-Sperre vor Trennungsentscheidungen in Panikzuständen.",
        "Sprechen Sie die unverarbeitete Angst in den verschlüsselten Nuju-Audiosafe.",
      ],
      fr: [
        "Pratique de reparentage : 'Même si l'autre s'éloigne, je ne m'abandonnerai jamais.'",
        "Règle des 48 heures avant toute décision de rupture prise sous l'angoisse.",
        "Déposez vos terreurs d'enfance dans le sanctuaire vocal Nuju pour apaiser l'enfant intérieur.",
      ],
      es: [
        "Práctica de reparentalización: 'Pase lo que pase, yo nunca me abandonaré a mí mismo.'",
        "Regla de espera de 48 horas antes de romper una relación en plena crisis de ansiedad.",
        "Expresa tus temores de la infancia en el refugio de audio encriptado de Nuju.",
      ],
    },
  },

  {
    level: "acute_attachment_terror_despair",
    scoreRange: [32, 36],
    title: {
      en: "Acute Abandonment Terror & Relational Collapse",
      id: "Teror Pengabaian Akut & Kehancuran Relasi",
      de: "Akuter Verlassenheitsterror & Bindungskollaps",
      fr: "Terreur d'Abandon Aiguë & Effondrement Relationnel",
      es: "Terror de Abandono Agudo & Colapso Relacional",
    },
    badge: {
      en: "Relational Trauma Emergency",
      id: "Trauma Pengabaian Ekstrem",
      de: "Bindungstrauma Notfall",
      fr: "Détresse d'Attachement Aiguë",
      es: "Emergencia de Trauma de Apego",
    },
    summary: {
      en: "You experience near-total emotional collapse when facing relational uncertainty. Life feels completely unlivable without an external person holding you together, triggering dissociation, self-harm impulses, or severe depressive freezes.",
      id: "Kamu mengalami kehancuran emosional total saat menghadapi ketidakpastian cinta. Hidup terasa mustahil dijalani tanpa orang lain yang menopangmu, memicu disosiasi, keputusasaan, dan kelumpuhan mental parah.",
      de: "Sie erleben einen existenziellen Zusammenbruch bei Beziehungskrisen. Ohne ständige Bindungssicherheit erscheint das Leben unerträglich.",
      fr: "Vous subissez un effondrement existentiel face au moindre doute amoureux. Vivre seul semble impossible et déclenche une souffrance insoutenable.",
      es: "Experimentas un colapso vital ante la incertidumbre afectiva. La existencia sin un vínculo seguro se vuelve intolerable, provocando desesperación extrema.",
    },
    psychology: {
      en: "This level is characterized by profound attachment trauma and Borderline/Anxious-Preoccupied fragmentation. The person feels they literally cease to exist without the other. Specialized Schema Therapy (Limited Reparenting) and DBT (Distress Tolerance) are crucial interventions.",
      id: "Tingkat ini dicirikan oleh trauma kelekatan mendalam (BPD/Anxious-Preoccupied). Penderita merasa lenyap tanpa orang lain. Terapi Skema terfokus dan DBT sangat dibutuhkan.",
      de: "Tiefes Bindungstrauma mit Borderline-Fragmentierung. Professionelle Schematherapie und DBT (Stresstoleranz) sind dringend geboten.",
      fr: "Ce stade relève d'un traumatisme d'attachement complexe. Une thérapie des schémas et la DBT sont indispensables pour retrouver une assise.",
      es: "Este nivel evidencia un trauma de apego profundo. La Terapia de Esquemas y el entrenamiento en DBT son cruciales para restablecer la estabilidad.",
    },
    actionProtocol: {
      en: [
        "Engage in Professional Schema Therapy: Seek a clinician trained in Limited Reparenting and EMDR for early abandonment wounds.",
        "Develop Non-Relational Grounding: Anchor yourself in physical senses (ice water, intense exercise, weighted blankets) when abandonment waves surge.",
        "Private Voice Lifeline in Nuju: Cry, scream, and pour out the unspeakable terror into Nuju's zero-knowledge encrypted vault without fearing rejection.",
      ],
      id: [
        "Ikuti Terapi Skema Profesional: Cari terapis berpengalaman dalam Limited Reparenting dan EMDR untuk memulihkan luka masa kecil.",
        "Latihan Grounding Fisik: Gunakan sensasi fisik nyata (air es, latihan fisik berat, selimut berbobot) saat gelombang panik melanda.",
        "Ruang Curhat Suara Darurat di Nuju: Menangis dan tumpahkan seluruh ketakutanmu ke brankas suara aman Nuju tanpa takut dihakimi atau ditolak.",
      ],
      de: [
        "Suchen Sie spezialisierte Schematherapie auf.",
        "Nutzen Sie sensorische Reize (Eiswasser, Bewegung), um die Panikwelle zu unterbrechen.",
        "Sprechen Sie Ihren Schmerz vertraulich in den Nuju-Safe.",
      ],
      fr: [
        "Consultez un psychothérapeute spécialisé en thérapie des schémas / EMDR.",
        "Pratiquez l'ancrage corporel immédiat face aux vagues de détresse.",
        "Confiez votre détresse au journal vocal chiffré de Nuju en toute confidentialité.",
      ],
      es: [
        "Inicia Terapia de Esquemas o EMDR con un profesional especializado.",
        "Usa anclajes sensoriales corporales intensos para surfear las olas de pánico.",
        "Descarga tu angustia en el santuario de audio seguro de Nuju sin miedo al juicio.",
      ],
    },
  },
];

export const ABANDONMENT_SCHEMA_OPTIONS = [
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

export const ABANDONMENT_SCHEMA_SUBSCALE_INFO = {
  anticipatory_desertion_terror: {
    name: {
      en: "Anticipatory Desertion Terror",
      id: "Teror Antisipasi Ditinggalkan",
      de: "Antizipatorische Verlustpanik",
      fr: "Terreur d'Abandon Anticipée",
      es: "Terror Anticipatorio al Abandono",
    },
    description: {
      en: "Acute panic triggered by delayed replies, micro-shifts in vocal tone, or temporary physical separations.",
      id: "Kepanikan hebat yang dipicu pesan lambat dibalas, perubahan nada bicara, atau perpisahan fisik sementara.",
      de: "Panikreaktion auf verzögerte Antworten, veränderten Tonfall oder zeitweilige Trennungen.",
      fr: "Panique déclenchée par un retard de message, un ton inhabituel ou une absence temporaire.",
      es: "Pánico agudo ante demoras en mensajes, cambios de tono o separaciones físicas pasajeras.",
    },
  },
  clinging_testing_protest: {
    name: {
      en: "Clinging, Testing & Protest",
      id: "Keterikatan Memaksa, Menguji & Protes",
      de: "Klammern, Testen & Protestverhalten",
      fr: "Agrippement, Tests & Protestation",
      es: "Aferramiento, Pruebas de Lealtad & Protesta",
    },
    description: {
      en: "Compulsive reassurance seeking, loyalty testing, creating drama, or pre-emptively breaking up first.",
      id: "Tuntutan penegasan cinta berulang, menguji pasangan, membuat drama, atau memutuskan hubungan duluan.",
      de: "Ständige Rückversicherung, Loyalitätstests, Streitsucht oder präventive Trennung.",
      fr: "Demandes répétées de réassurance, tests relationnels ou ruptures préventives.",
      es: "Búsqueda constante de confirmación, pruebas de lealtad o rupturas anticipadas por miedo.",
    },
  },
  relational_fragility_conviction: {
    name: {
      en: "Relational Fragility Conviction",
      id: "Keyakinan Kerapuhan Relasi",
      de: "Glaube an Beziehungsbrüchigkeit",
      fr: "Conviction de Fragilité Relationnelle",
      es: "Convicción de Fragilidad Relacional",
    },
    description: {
      en: "Deep-rooted core belief that love is inherently unstable and that anyone close will inevitably vanish.",
      id: "Keyakinan mendasar bahwa cinta itu rapuh dan semua orang yang dekat pasti akan menghilang.",
      de: "Tiefsitzender Glaube, dass Liebe vergänglich ist und jeder Nahestehende unweigerlich verschwindet.",
      fr: "Croyance enracinée que l'amour est instable et que tout lien est voué à se briser.",
      es: "Crecimiento profundo de que los vínculos son inestables y cualquiera terminará marchándose.",
    },
  },
};

export function getAbandonmentSchemaResult(totalScore: number): AbandonmentSchemaResultLevel {
  const clamped = Math.max(0, Math.min(36, totalScore));
  return (
    ABANDONMENT_SCHEMA_RESULTS.find(
      (r) => clamped >= r.scoreRange[0] && clamped <= r.scoreRange[1]
    ) || ABANDONMENT_SCHEMA_RESULTS[0]
  );
}

export function calculateAbandonmentSchemaSubscales(answers: Record<number, number>): {
  anticipatory_desertion_terror: number;
  clinging_testing_protest: number;
  relational_fragility_conviction: number;
} {
  let a = 0;
  let c = 0;
  let r = 0;

  ABANDONMENT_SCHEMA_QUESTIONS.forEach((q) => {
    const score = answers[q.id] ?? 0;
    if (q.subscale === "anticipatory_desertion_terror") a += score;
    if (q.subscale === "clinging_testing_protest") c += score;
    if (q.subscale === "relational_fragility_conviction") r += score;
  });

  return {
    anticipatory_desertion_terror: a,
    clinging_testing_protest: c,
    relational_fragility_conviction: r,
  };
}
