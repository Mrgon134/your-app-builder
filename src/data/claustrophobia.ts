export type ClaustrophobiaCardLang = "en" | "id" | "de" | "fr" | "es";

export interface ClaustrophobiaQuestion {
  id: number;
  subscale:
    | "suffocation_fear_air_flow_panic"
    | "physical_restriction_entrapment_dread"
    | "anticipatory_avoidance_escape_monitoring";
  text: Record<ClaustrophobiaCardLang, string>;
}

export interface ClaustrophobiaResultLevel {
  level:
    | "spacious_grounded_calm"
    | "mild_situational_confinement_discomfort"
    | "moderate_claustrophobic_reactivity"
    | "high_clinical_claustrophobia_clq"
    | "severe_entrapment_suffocation_panic";
  scoreRange: [number, number];
  title: Record<ClaustrophobiaCardLang, string>;
  badge: Record<ClaustrophobiaCardLang, string>;
  summary: Record<ClaustrophobiaCardLang, string>;
  psychology: Record<ClaustrophobiaCardLang, string>;
  actionProtocol: Record<ClaustrophobiaCardLang, string[]>;
}

export const CLAUSTROPHOBIA_QUESTIONS: ClaustrophobiaQuestion[] = [
  // 1. Suffocation Fear & Air Flow Panic
  {
    id: 1,
    subscale: "suffocation_fear_air_flow_panic",
    text: {
      en: "In a windowless room, an overcrowded subway car, or an MRI machine, you feel an immediate panic that you will run out of breathable air and suffocate.",
      id: "Di ruangan tanpa jendela, gerbong kereta penuh sesak, atau mesin MRI, kamu langsung merasa panik kehabisan oksigen dan takut mati lemas.",
      de: "In einem fensterlosen Raum, einer überfüllten U-Bahn oder einer MRT-Röhre überkommt Sie sofort die panische Angst, dass der Sauerstoff ausgeht und Sie ersticken.",
      fr: "Dans une pièce sans fenêtre, une rame de métro bondée ou une IRM, vous ressentez une angoisse soudaine de manquer d'oxygène et d'étouffer.",
      es: "En una habitación sin ventanas, un vagón de metro lleno o un escáner de resonancia (IRM), sientes pánico inmediato de quedarte sin aire y asfixiarte.",
    },
  },
  // 2. Physical Restriction & Entrapment Dread
  {
    id: 2,
    subscale: "physical_restriction_entrapment_dread",
    text: {
      en: "The moment an elevator door closes, an airplane cabin door seals, or a car gets stuck in gridlock traffic, a surge of adrenaline hits because you cannot immediately get out.",
      id: "Saat pintu lift menutup rapat, pintu kabin pesawat dikunci, atau mobil terjebak macet total di lajur tengah, adrenalinmu langsung melonjak karena tidak bisa keluar seketika.",
      de: "Sobald sich die Türen eines Aufzugs oder Flugzeugs schließen oder Sie im Stau festsitzen, schießt Adrenalin ein, weil Sie nicht sofort entkommen können.",
      fr: "Dès que les portes d'un ascenseur ou d'un avion se ferment, ou lors d'un bouchon sur l'autoroute, une décharge d'adrénaline survient car vous ne pouvez pas sortir immédiatement.",
      es: "En cuanto se cierran las puertas del ascensor o del avión, o te quedas atascado en el tráfico, sufres un pico de adrenalina porque no puedes escapar al instante.",
    },
  },
  // 3. Anticipatory Avoidance & Escape Monitoring
  {
    id: 3,
    subscale: "anticipatory_avoidance_escape_monitoring",
    text: {
      en: "You routinely climb 5 to 10 flights of stairs or take lengthy detours specifically to avoid getting into elevators, crowded shuttles, or revolving doors.",
      id: "Kamu rela menaiki 5 hingga 10 lantai tangga darurat atau memutar jalan jauh hanya demi menghindari naik lift, shuttle bus yang padat, atau pintu putar.",
      de: "Sie nehmen lieber 5 bis 10 Stockwerke zu Fuß oder weite Umwege in Kauf, nur um keine Aufzüge, engen Shuttles oder Drehtüren nutzen zu müssen.",
      fr: "Vous préférez monter 5 à 10 étages à pied ou faire de longs détours simplement pour éviter d'emprunter des ascenseurs, des navettes bondées ou des portes tournantes.",
      es: "Prefieres subir 5 o 10 pisos por las escaleras o dar rodeos enormes con tal de no entrar en ascensores, autobuses atestados o puertas giratorias.",
    },
  },
  // 4. Suffocation Fear & Air Flow Panic
  {
    id: 4,
    subscale: "suffocation_fear_air_flow_panic",
    text: {
      en: "Wearing tight turtlenecks, scarves, snug face masks, or heavy blankets over your head triggers acute shortness of breath and an urge to rip them off.",
      id: "Mengenakan pakaian berkerah tinggi ketat, syal rapat, masker tebal, atau selimut yang menutupi kepala membuatmu sesak napas dan ingin merobeknya seketika.",
      de: "Eng anliegende Rollkragenpullover, Schals, Masken oder Decken über dem Gesicht lösen akute Atemnot und den drängenden Impuls aus, sie wegzureißen.",
      fr: "Porter un col roulé serré, une écharpe, un masque couvrant ou une couverture sur la tête déclenche une gêne respiratoire aiguë et l'envie frénétique de les arracher.",
      es: "Llevar cuellos altos apretados, bufandas, mascarillas ajustadas o mantas sobre la cabeza te produce ahogo agudo y el impulso de arrancártelos.",
    },
  },
  // 5. Physical Restriction & Entrapment Dread
  {
    id: 5,
    subscale: "physical_restriction_entrapment_dread",
    text: {
      en: "Being restrained in a dentist's chair, amusement park safety harness, or having someone hold your arms creates intense claustrophobic panic.",
      id: "Diposisikan telentang di kursi dokter gigi, dikunci sabuk pengaman wahana bermain, atau dipegangi lengannya oleh orang lain memicu panik terjebak yang intens.",
      de: "Im Zahnarztstuhl fixiert zu sein, Sicherheitsbügel in Fahrgeschäften oder festgehaltene Arme lösen intensive Klaustrophobie und Fluchtreflexe aus.",
      fr: "Être bloqué sur le fauteuil du dentiste, sanglé dans un manège ou avoir les bras immobilisés provoque une panique claustrophobique intense.",
      es: "Estar inmovilizado en el sillón del dentista, atado a un arnés de atracción o que te sujeten los brazos te desata un pánico claustrofóbico tremendo.",
    },
  },
  // 6. Anticipatory Avoidance & Escape Monitoring
  {
    id: 6,
    subscale: "anticipatory_avoidance_escape_monitoring",
    text: {
      en: "Whenever entering movie theaters, lecture halls, or concerts, you compulsively insist on sitting on the aisle near the emergency exit so you can bolt if needed.",
      id: "Setiap masuk bioskop, ruang seminar, atau konser, kamu selalu bersikeras duduk di pinggir lorong dekat pintu darurat agar bisa kabur sewaktu-waktu.",
      de: "Im Kino, Hörsaal oder bei Konzerten bestehen Sie stets darauf, am Gangplatz nahe dem Notausgang zu sitzen, um jederzeit flüchten zu können.",
      fr: "Au cinéma, dans un amphithéâtre ou en spectacle, vous exigez systématiquement une place côté couloir près de la sortie pour pouvoir vous enfuir en cas de crise.",
      es: "En cines, conferencias o conciertos, exiges siempre sentarte en el pasillo cerca de la salida de emergencia para poder escapar corriendo si lo necesitas.",
    },
  },
  // 7. Suffocation Fear & Air Flow Panic
  {
    id: 7,
    subscale: "suffocation_fear_air_flow_panic",
    text: {
      en: "If air conditioning stops in a closed vehicle or the air feels slightly warm and still, your heart pounds rapidly with fears of hyperventilating.",
      id: "Jika AC mati di kendaraan tertutup atau udara terasa pengap dan diam, jantungmu berdegup kencang karena ketakutan mengalami sesak napas/hiperventilasi.",
      de: "Wenn die Klimaanlage in einem geschlossenen Fahrzeug ausfällt oder die Luft stickig wirkt, rast Ihr Puls vor Angst vor einem Atemstillstand.",
      fr: "Si la climatisation s'arrête dans un véhicule fermé ou si l'air devient stagnant, votre cœur s'emballe de peur de faire de l'hyperventilation.",
      es: "Si se para el aire acondicionado en un vehículo cerrado o el aire se siente cargado y caliente, tu corazón se dispara temiendo hiperventilar.",
    },
  },
  // 8. Physical Restriction & Entrapment Dread
  {
    id: 8,
    subscale: "physical_restriction_entrapment_dread",
    text: {
      en: "Locked bathroom stalls, fitting rooms with latch locks, or public telephone booths cause a sudden apprehension that the lock will jam and trap you forever.",
      id: "Bilik toilet terkunci, kamar pas pakaian dengan slot kunci, atau ruang sempit tertutup memicu rasa waswas kunci macet dan kamu terjebak selamanya.",
      de: "Abgeschlossene Toilettenkabinen, Umkleiden oder kleine Räume wecken plötzliche Furcht, dass das Schloss klemmt und Sie für immer gefangen sind.",
      fr: "Les cabines de toilettes fermées à clé, les cabines d'essayage ou les sas étroits vous angoissent à l'idée que le verrou se bloque et vous piège.",
      es: "Los baños públicos cerrados, probadores o cabinas estrechas te generan temor repentino de que la cerradura se atasque y te quedes atrapado.",
    },
  },
  // 9. Anticipatory Avoidance & Escape Monitoring
  {
    id: 9,
    subscale: "anticipatory_avoidance_escape_monitoring",
    text: {
      en: "You have cancelled medical scans (like MRI or CT scans), missed flights, or declined social invitations solely because the space felt too enclosed.",
      id: "Kamu pernah membatalkan pemeriksaan medis (seperti MRI/CT scan), batal naik pesawat, atau menolak undangan karena tempatnya terlalu tertutup.",
      de: "Sie haben bereits medizinische Untersuchungen (wie MRTs), Flüge oder Einladungen abgesagt, nur weil die Räumlichkeiten zu eng wirkten.",
      fr: "Vous avez déjà annulé un examen médical (IRM), raté un vol ou décliné une invitation uniquement parce que l'espace était trop exigu ou fermé.",
      es: "Has llegado a cancelar resonancias médicas (IRM), vuelos o eventos sociales únicamente porque el espacio era demasiado cerrado o asfixiante.",
    },
  },
  // 10. Suffocation Fear & Air Flow Panic
  {
    id: 10,
    subscale: "suffocation_fear_air_flow_panic",
    text: {
      en: "Driving through underground highway tunnels or mountain passes brings on intense chest tightness, gasping for breath, and dread of structural collapse.",
      id: "Mengemudi menembus terowongan bawah tanah panjang atau terowongan gunung menimbulkan sesak dada parah, napas terengah-engah, dan panik runtuh.",
      de: "Die Fahrt durch lange Straßentunnel löst Engegefühl in der Brust, nach Luft schnappen und akute Katastrophengedanken aus.",
      fr: "Conduire sous de longs tunnels routiers ou souterrains provoque une oppression thoracique, des halètements et la peur d'un effondrement.",
      es: "Conducir por túneles largos o pasos subterráneos te provoca opresión en el pecho, falta de aire y terror a quedarte atrapado.",
    },
  },
  // 11. Physical Restriction & Entrapment Dread
  {
    id: 11,
    subscale: "physical_restriction_entrapment_dread",
    text: {
      en: "Being in the center of a densely packed crowd (like at a stadium, parade, or train platform) where you cannot physically move your arms triggers acute terror.",
      id: "Berada di tengah kerumunan padat (seperti di stadion, konser festival, atau peron stasiun) di mana lenganmu sulit digerakkan memicu teror panik hebat.",
      de: "Inmitten einer dichten Menschenmenge (Stadion, Konzert, Bahnsteig) festzustecken, ohne die Arme bewegen zu können, erzeugt panische Angst.",
      fr: "Être coincé au milieu d'une foule dense (stade, concert, quai) sans pouvoir bouger les bras déclenche une terreur claustrophobique absolue.",
      es: "Estar atrapado en medio de una multitud densa (estadios, conciertos o andenes) sin poder mover los brazos te desata un terror incontrolable.",
    },
  },
  // 12. Anticipatory Avoidance & Escape Monitoring
  {
    id: 12,
    subscale: "anticipatory_avoidance_escape_monitoring",
    text: {
      en: "Before you enter any unfamiliar building or basement, your mind automatically calculates exit paths, stairwell locations, and door latch mechanisms.",
      id: "Sebelum melangkah masuk ke gedung baru atau ruang bawah tanah, pikiranmu otomatis memetakan jalur evakuasi, tangga darurat, dan sistem grendel pintu.",
      de: "Bevor Sie ein fremdes Gebäude oder Keller betreten, berechnet Ihr Gehirn automatisch Fluchtwege, Treppenhäuser und Türentriegelungen.",
      fr: "Avant d'entrer dans un bâtiment inconnu ou un sous-sol, votre esprit repère instinctivement les sorties de secours et le mécanisme des verrous.",
      es: "Antes de entrar a un edificio nuevo o sótano, tu mente escanea de forma automática las rutas de escape, escaleras de emergencia y pestillos.",
    },
  },
];

export const CLAUSTROPHOBIA_OPTIONS = [
  {
    value: 0,
    label: {
      en: "Not at all (0)",
      id: "Sama sekali tidak (0)",
      de: "Überhaupt nicht (0)",
      fr: "Pas du tout (0)",
      es: "En absoluto (0)",
    },
  },
  {
    value: 1,
    label: {
      en: "Slightly / Occasionally (1)",
      id: "Sedikit / Kadang-kadang (1)",
      de: "Leicht / Gelegentlich (1)",
      fr: "Légèrement / Parfois (1)",
      es: "Ligeramente / A veces (1)",
    },
  },
  {
    value: 2,
    label: {
      en: "Moderately / Frequently (2)",
      id: "Cukup sering / Jelas terasa (2)",
      de: "Mäßig / Häufig (2)",
      fr: "Modérément / Fréquemment (2)",
      es: "Moderadamente / Frecuente (2)",
    },
  },
  {
    value: 3,
    label: {
      en: "Severely / Almost always (3)",
      id: "Sangat parah / Selalu panik (3)",
      de: "Extrem stark / Fast immer (3)",
      fr: "Sévèrement / Presque toujours (3)",
      es: "Gravemente / Casi siempre (3)",
    },
  },
];

export const CLAUSTROPHOBIA_RESULT_LEVELS: ClaustrophobiaResultLevel[] = [
  {
    level: "spacious_grounded_calm",
    scoreRange: [0, 7],
    title: {
      en: "Spacious & Grounded Calm",
      id: "Ketenangan Ruang Terbuka (Adaptif)",
      de: "Räumliche Gelassenheit & Freiheit",
      fr: "Sérénité Spatiale & Calme",
      es: "Serenidad Espacial & Calma",
    },
    badge: {
      en: "Minimal Confinement Sensitivity",
      id: "Sensitivitas Ruang Terbuka Minimal",
      de: "Minimale Enge-Empfindlichkeit",
      fr: "Sensibilité Spatiale Minimale",
      es: "Sensibilidad Espacial Mínima",
    },
    summary: {
      en: "You have natural resilience in enclosed spaces. Elevators, windowless rooms, tight crowds, and travel do not trigger suffocation dread or entrapment impulses.",
      id: "Kamu memiliki ketahanan fisiologis alami di ruang tertutup. Lift, ruangan tanpa jendela, kerumunan padat, dan kabin pesawat tidak memicu rasa tercekik atau panik.",
      de: "Sie besitzen eine gesunde Gelassenheit in geschlossenen Räumen. Aufzüge, fensterlose Räume oder dichte Menschenmengen lösen bei Ihnen keine Erstickungsangst aus.",
      fr: "Vous possédez une grande aisance dans les lieux clos. Les ascenseurs, pièces sans fenêtre et foules ne déclenchent aucune terreur d'étouffement chez vous.",
      es: "Muestras una tolerancia excelente a los espacios cerrados. Los ascensores, habitaciones sin ventanas y multitudes no te generan pánico de asfixia.",
    },
    psychology: {
      en: "Your autonomic nervous system accurately distinguishes between actual hypoxia and psychological confinement. Interoceptive signals remain grounded without catastrophic cognitive misinterpretations.",
      id: "Sistem saraf otonommu mampu membedakan dengan tepat antara hipoksia nyata dengan ruang sempit psikologis. Sinyal sensorik tubuh tetap tenang tanpa interpretasi bencana.",
      de: "Ihr vegetatives Nervensystem trennt zuverlässig zwischen tatsächlichem Sauerstoffmangel und räumlicher Enge. Fehlinterpretationen körperlicher Signale bleiben aus.",
      fr: "Votre système nerveux autonome distingue sans faille le manque réel d'oxygène de la restriction spatiale, sans dérive catastrophiste.",
      es: "Tu sistema nervioso autónomo discierne con precisión entre la hipoxia real y el encierro físico, manteniendo estables las señales propioceptivas.",
    },
    actionProtocol: {
      en: [
        "Maintain open-air and physical mobility confidence across high-stress environments.",
        "Model calm, regulated diaphragmatic breathing when companions express confinement distress.",
        "Utilize Nuju's voice journal for grounding during long commutes or turbulent travel.",
      ],
      id: [
        "Pertahankan ketenangan mobilitas di berbagai situasi ruang sempit atau mobilitas tinggi.",
        "Jadilah penenang dengan pernapasan teratur saat mendampingi teman yang cemas di dalam lift.",
        "Gunakan jurnal suara Nuju untuk menjaga kejernihan pikiran selama perjalanan jarak jauh.",
      ],
      de: [
        "Bewahren Sie Ihre natürliche Gelassenheit bei Reisen und in engen Verkehrsmitteln.",
        "Unterstützen Sie nervöse Mitmenschen in Aufzügen durch ruhige Bauchatmung.",
        "Nutzen Sie Nuju Voice Journaling für mentale Frische auf längeren Pendelstrecken.",
      ],
      fr: [
        "Conservez votre sérénité naturelle dans les transports et environnements confinés.",
        "Offrez une présence rassurante aux proches qui ressentent de l'anxiété dans les ascenseurs.",
        "Pratiquez le journal vocal Nuju pour clarifier vos pensées durant vos voyages.",
      ],
      es: [
        "Mantén tu calma en medios de transporte cerrados y situaciones de viaje.",
        "Apoya a personas cercanas con respiración diafragmática cuando sientan agobio.",
        "Usa el diario de voz Nuju para reflexionar serenamente durante trayectos largos.",
      ],
    },
  },
  {
    level: "mild_situational_confinement_discomfort",
    scoreRange: [8, 14],
    title: {
      en: "Mild Situational Confinement Discomfort",
      id: "Ketidaknyamanan Situasional Ringan",
      de: "Leichte situative Enge-Sensibilität",
      fr: "Inconfort Situationnel Léger",
      es: "Incomodidad Situacional Leve",
    },
    badge: {
      en: "Mild Claustrophobic Sensitivity",
      id: "Sensitivitas Ruang Sempit Ringan",
      de: "Leichte Raum-Sensitivität",
      fr: "Sensibilité d'Espace Légère",
      es: "Sensibilidad Espacial Leve",
    },
    summary: {
      en: "You experience fleeting discomfort in very tight environments (like MRI tubes, jammed elevators, or narrow crawl spaces), but your daily freedom remains intact.",
      id: "Kamu merasakan rasa tidak nyaman sesaat di situasi sangat sempit (seperti tabung MRI atau lift penuh sesak), namun belum sampai mengganggu mobilitas harianmu.",
      de: "Sie spüren in extrem engen Situationen (wie MRT-Röhren oder überfüllten Fahrstühlen) kurzzeitiges Unbehagen, Ihr Alltag bleibt jedoch weitgehend uneingeschränkt.",
      fr: "Vous ressentez une gêne passagère dans les lieux très confinés (IRM, ascenseur bondé), sans que cela n'entrave vos déplacements quotidiens.",
      es: "Sientes incomodidad puntual en entornos muy estrechos (como resonancias o ascensores llenos), pero tu rutina no se ve limitada.",
    },
    psychology: {
      en: "Your brain mounts a brief sympathetic alerting response to sensory restriction, but cortical down-regulation quickly restores emotional equilibrium without panic escalation.",
      id: "Otakmu memicu respons siaga simpatis singkat terhadap ruang terbatas, namun korteks prefrontal segera menenangkan amigdala sebelum menjadi serangan panik.",
      de: "Kurze vegetative Alarmzeichen bei Enge werden durch den präfrontalen Kortex zügig reguliert, sodass keine Panikspirale entsteht.",
      fr: "Une alerte sympathique brève apparaît face à la restriction d'espace, rapidement régulée par le cortex préfrontal sans escalade anxieuse.",
      es: "Tu cerebro activa una alerta simpática transitoria, pero la regulación cortical restablece la serenidad antes de que aparezca el pánico.",
    },
    actionProtocol: {
      en: [
        "Notice somatic tension (tight throat, shallow breath) without immediately fleeing the space.",
        "Focus your gaze on a fixed distant point or horizon line rather than walls.",
        "Practice 4-7-8 breathing when stuck in heavy traffic or delayed subway cars.",
      ],
      id: [
        "Kenali ketegangan tubuh (leher kaku, napas pendek) tanpa terburu-buru kabur dari ruangan.",
        "Arahkan pandangan ke titik terjauh atau garis horizontal ketimbang menatap dinding sempit.",
        "Terapkan teknik pernapasan 4-7-8 saat terjebak kemacetan atau kereta berhenti sejenak.",
      ],
      de: [
        "Beachten Sie körperliche Anspannung, ohne den Raum fluchtartig zu verlassen.",
        "Fixieren Sie einen weiten Blickpunkt statt der nahen Wände.",
        "Nutzen Sie die 4-7-8 Atemtechnik bei zähfließendem Verkehr oder Ampelstau.",
      ],
      fr: [
        "Observez vos tensions physiques sans chercher à fuir immédiatement le lieu.",
        "Fixez un point lointain ou l'horizon pour élargir votre champ visuel.",
        "Adoptez la respiration 4-7-8 en cas de ralentissement dans les transports.",
      ],
      es: [
        "Observa la tensión corporal sin ceder al impulso de salir corriendo.",
        "Enfoca tu mirada en un punto distante en lugar de mirar las paredes cercanas.",
        "Practica la respiración 4-7-8 si te quedas parado en un atasco o vagón de metro.",
      ],
    },
  },
  {
    level: "moderate_claustrophobic_reactivity",
    scoreRange: [15, 22],
    title: {
      en: "Moderate Claustrophobic Reactivity",
      id: "Reaktivitas Klaustrofobia Moderat",
      de: "Moderate klaustrophobische Reaktivität",
      fr: "Réactivité Claustrophobique Modérée",
      es: "Reactividad Claustrofóbica Moderada",
    },
    badge: {
      en: "Moderate CLQ Distress",
      id: "Kecemasan Ruang Sempit Moderat",
      de: "Moderat erhöhter CLQ-Score",
      fr: "Détresse CLQ Modérée",
      es: "Malestar CLQ Moderado",
    },
    summary: {
      en: "You have a pronounced sensitivity to physical confinement and air flow restriction. You frequently choose stairs over elevators and prefer aisle seats to avoid feeling trapped.",
      id: "Kamu memiliki sensitivitas nyata terhadap ruang tertutup dan keterbatasan sirkulasi udara. Kamu sering memilih tangga daripada lift dan wajib duduk di pinggir lorong.",
      de: "Sie reagieren deutlich auf Enge und stickige Luft. Oft weichen Sie auf Treppen aus und bestehen auf Gangplätze, um nicht eingesperrt zu sein.",
      fr: "Vous réagissez nettement aux espaces exigus et au manque d'air. Vous privilégiez souvent les escaliers et exigez une place côté couloir.",
      es: "Muestras una sensibilidad clara al confinamiento y al aire estancado. Sueles subir por escaleras y exigir asientos de pasillo.",
    },
    psychology: {
      en: "Jack Rachman's CLQ model highlights dual triggers: suffocation fear and restriction fear. You misinterpret normal respiratory sensations as impending asphyxiation, reinforcing safety habits.",
      id: "Model CLQ Jack Rachman mengidentifikasi dua pemicu: takut tercekik dan takut terkunci. Sensasi napas yang sedikit berat disalahartikan sebagai kekurangan oksigen yang mengancam jiwa.",
      de: "Nach Jack Rachmans CLQ-Modell wirken Erstickungs- und Bewegungseinschränkungsängste zusammen. Normale Atemwahrnehmungen werden fälschlicherweise als Erstickungsnotfall gedeutet.",
      fr: "Le modèle CLQ de Jack Rachman met en évidence la peur d'étouffement et la peur d'entrave. Vos sensations respiratoires normales sont interprétées comme une asphyxie imminente.",
      es: "El modelo CLQ de Jack Rachman resalta dos temores: asfixia y restricción motora. Malinterpretas la respiración pesada como amenaza letal de falta de oxígeno.",
    },
    actionProtocol: {
      en: [
        "Take elevators for 1 or 2 floors as deliberate behavioral micro-exposures with a friend.",
        "Gradually loosen collar and scarf tightness without immediately taking them off.",
        "Use Nuju's voice journal to talk through the physical sensation of panic until heart rate decelerates.",
      ],
      id: [
        "Lakukan latihan bertahap: coba naik lift hanya 1–2 lantai bersama teman yang dipercaya.",
        "Longgarkan pakaian atau masker secara perlahan tanpa langsung melepasnya secara panik.",
        "Buka jurnal suara Nuju untuk meluapkan sensasi deg-degan hingga detak jantung kembali stabil.",
      ],
      de: [
        "Fahren Sie bewusst mit Begleitpersonen 1–2 Stockwerke im Aufzug als sanfte Konfrontation.",
        "Lockern Sie Kleidung schrittweise, statt sie impulsiv abzureißen.",
        "Sprechen Sie Ihre körperlichen Symptome in Nuju ein, bis sich der Herzschlag beruhigt.",
      ],
      fr: [
        "Prenez l'ascenseur sur 1 ou 2 étages avec un proche pour une micro-exposition graduée.",
        "Desserrez vos vêtements lentement au lieu de les retirer dans la panique.",
        "Enregistrez votre ressenti sur le journal vocal Nuju jusqu'à ce que votre pouls ralentisse.",
      ],
      es: [
        "Usa el ascensor solo 1 o 2 plantas acompañado como microexposición progresiva.",
        "Afloja las prendas ajustadas poco a poco en vez de quitártelas de golpe con agobio.",
        "Graba lo que sientes en el diario de voz Nuju hasta que baje tu frecuencia cardíaca.",
      ],
    },
  },
  {
    level: "high_clinical_claustrophobia_clq",
    scoreRange: [23, 29],
    title: {
      en: "High Clinical Claustrophobia (CLQ)",
      id: "Klaustrofobia Klinis Tinggi (Model CLQ)",
      de: "Klinisch signifikante Klaustrophobie",
      fr: "Claustrophobie Clinique Élevée (CLQ)",
      es: "Claustrofobia Clínica Elevada (CLQ)",
    },
    badge: {
      en: "Clinical Phobic Threshold",
      id: "Ambang Fobia Klinis",
      de: "Klinische Phobieschwelle",
      fr: "Seuil Phobique Clinique",
      es: "Umbral Fóbico Clínico",
    },
    summary: {
      en: "You have intense, persistent fears of enclosed spaces. You consistently refuse elevators, dread tunnels, avoid public transit, and experience full panic when doors are locked or sealed.",
      id: "Kamu mengalami ketakutan intens dan menetap terhadap ruang tertutup. Kamu hampir selalu menolak lift, takut terowongan, menghindari transportasi umum, dan panik saat pintu dikunci.",
      de: "Sie leiden unter ausgeprägter Angst vor geschlossenen Räumen. Aufzüge werden strikt verweigert, Tunnel gefürchtet und verriegelte Türen lösen akute Panik aus.",
      fr: "Vous éprouvez une peur intense et invalidante des espaces clos. Refus des ascenseurs, terreur des tunnels et panique totale dès qu'une issue est verrouillée.",
      es: "Sufres un miedo intenso y constante a los espacios cerrados. Evitas ascensores, temes túneles y sientes pánico si las puertas están trabadas.",
    },
    psychology: {
      en: "Visceral hypervigilance creates a catastrophic feedback loop: perceiving restricted air circulation instantly triggers hyperventilation and sympathetic tachycardia, convincing you that suffocation is imminent.",
      id: "Hipersensitivitas viseral memicu lingkaran setan katastrofik: merasa sirkulasi udara terbatas langsung memicu hiperventilasi dan takikardia, meyakinkan otak bahwa kamu akan mati lemas.",
      de: "Ein Teufelskreis aus Hyperventilation und Panik: Das Gefühl geringerer Luftzirkulation aktiviert sofort das sympathische Nervensystem und erzeugt Todesangst.",
      fr: "Un cercle vicieux d'hyperventilation et d'angst : la sensation d'air confiné déclenche une tachycardie réflexe vous persuadant d'un étouffement imminent.",
      es: "Un bucle de hiperventilación y alarma : la sensación de poco aire provoca taquicardia inmediata, convenciéndote de una asfixia inminente.",
    },
    actionProtocol: {
      en: [
        "Consult a CBT clinician specializing in in-vivo and virtual reality (VR) exposure therapy.",
        "Learn interoceptive breathing retraining to prevent hyperventilation-induced CO2 drops.",
        "Deconstruct safety rituals: step into stationary elevators with doors held open, progressing to closed doors.",
        "Use Nuju audio reflections before confronting high-anxiety transit or medical scans.",
      ],
      id: [
        "Konsultasikan ke psikolog klinis untuk terapi CBT paparan bertahap (in-vivo atau VR).",
        "Latih pernapasan diafragma lambat untuk mencegah hipokapnia akibat napas terengah-engah.",
        "Urai perilaku protektif: berdiri di lift yang pintunya terbuka sebelum mencoba menutup pintu.",
        "Gunakan refleksi audio Nuju sebelum menghadapi perjalanan kereta atau pemeriksaan medis.",
      ],
      de: [
        "Konsultieren Sie einen Psychotherapeuten für kognitive Verhaltenstherapie mit Exposition (In-vivo/VR).",
        "Erlernen Sie Atemretraining, um Hyperventilation und Schwindelgefühle abzufangen.",
        "Bauen Sie Sicherheitsrituale schrittweise ab (z. B. im offenen Aufzug stehen, dann Türen kurz schließen).",
        "Nutzen Sie Nuju Audio-Journaling zur mentalen Vorbereitung auf Flüge oder MRTs.",
      ],
      fr: [
        "Consultez un thérapeute TCC expert en exposition graduée in vivo ou par réalité virtuelle.",
        "Apprenez le réentraînement respiratoire pour éviter la baisse de CO2 due à l'hyperventilation.",
        "Déconstruisez vos réflexes d'évitement : restez dans un ascenseur ouvert, puis fermez les portes quelques secondes.",
        "Préparez vos trajets anxiogènes grâce aux enregistrements audio de décompression Nuju.",
      ],
      es: [
        "Consulta con un terapeuta TCC especializado en exposición in vivo o realidad virtual.",
        "Aprende reentrenamiento respiratorio para evitar la hiperventilación y mareos.",
        "Desmonta los rituales de evitación: permanece en un ascensor con puertas abiertas y luego ciérralas brevemente.",
        "Haz una descarga de voz en Nuju antes de enfrentarte a viajes en avión o pruebas médicas.",
      ],
    },
  },
  {
    level: "severe_entrapment_suffocation_panic",
    scoreRange: [30, 36],
    title: {
      en: "Severe Entrapment & Suffocation Panic",
      id: "Klaustrofobia Parah & Panik Terjebak",
      de: "Schwere Panik-Klaustrophobie",
      fr: "Claustrophobie Sévère & Panique d'Enfermement",
      es: "Claustrofobia Severa & Pánico de Asfixia",
    },
    badge: {
      en: "Severe Incapacitating Confinement Phobia",
      id: "Fobia Ruang Tertutup Parah & Menghambat",
      de: "Schwere einschränkende Phobie",
      fr: "Phobie Handicapante Sévère",
      es: "Fobia Severa Incapacitante",
    },
    summary: {
      en: "Your life is profoundly constrained by terror of entrapment and suffocation. Elevators, airplanes, subway transit, locked doors, and medical machines trigger overwhelming fight-or-flight panic and emergency escape behaviors.",
      id: "Hidupmu sangat dibatasi oleh ketakutan ekstrem terjebak dan lemas. Lift, pesawat, KRL bawah tanah, pintu terkunci, dan mesin medis memicu serangan panik dahsyat serta dorongan nekat untuk melarikan diri.",
      de: "Ihr Leben ist massiv durch die Angst vor Enge und Ersticken eingeschränkt. Aufzüge, Flugzeuge, U-Bahnen und verriegelte Türen lösen lähmende Panikattacken und unkontrollierbare Fluchtreflexe aus.",
      fr: "Votre vie est profondément entravée par la terreur d'être piégé et d'étouffer. Ascenseurs, avions, métros et appareils médicaux provoquent des crises de panique paroxystiques.",
      es: "Tu vida cotidiana está gravemente limitada por el pánico a quedarte atrapado y asfixiarte. Ascensores, aviones, metros y salas cerradas te desatan crisis de angustia brutales.",
    },
    psychology: {
      en: "Severe amygdalar hypersensitivity completely overrides rational cognitive appraisals in confined settings. Even minimal sensory cues of restriction trigger primitive panic circuits, causing acute somatic terror and agoraphobic avoidance.",
      id: "Amigdala mengalami hipereksitabilitas ekstrem yang melumpuhkan kendali rasional di ruang tertutup. Rangsangan fisik terkecil sekalipun mengaktifkan sirkuit survival primitif dengan teror fisik akut.",
      de: "Eine schwere Übererregung der Amygdala setzt rationales Denken in engen Räumen vollkommen außer Kraft. Primitivste Überlebensreflexe erzwingen die sofortige Flucht.",
      fr: "L'hyperexcitabilité amygdalienne court-circuite totalement la régulation cognitive. Le moindre indice d'enfermement déclenche les circuits d'alarme archaïques avec une angoisse de mort.",
      es: "La hiperexcitabilidad de la amígdala anula el juicio racional en espacios cerrados. Los estímulos mínimos de encierro disparan alarmas primitivas de supervivencia con terror somático agudo.",
    },
    actionProtocol: {
      en: [
        "Prioritize comprehensive clinical treatment with a licensed psychiatrist and CBT specialist.",
        "Consider evidence-based pharmacotherapy alongside systematic desensitization for clinical stability.",
        "Practice emergency somatic grounding: tactile pressure, ice cubes, or vocal humming to stimulate vagal tone.",
        "Rely on Nuju's voice sanctuary as a private space to de-escalate without shame during panic attacks.",
      ],
      id: [
        "Segera cari bantuan komprehensif dari psikiater dan psikolog klinis spesialis fobia.",
        "Pertimbangkan terapi farmakoterapi jangka pendek bersama desensitisasi sistematis terstruktur.",
        "Gunakan teknik stimulasi vagus darurat: kompres es, tekanan taktil kuat, atau dengungan vokal (*vocal humming*).",
        "Jadikan ruang aman suara Nuju sebagai tempat dekompresi emosi tanpa rasa malu saat serangan panik melanda.",
      ],
      de: [
        "Suchen Sie dringend spezialisierte fachärztliche und psychotherapeutische Hilfe auf.",
        "Erwägen Sie eine medikamentöse Unterstützung zur Stabilisierung während der Expositionstherapie.",
        "Nutzen Sie Notfall-Skills: Eiswürfel, sensorische Erdung und stimmliches Summen zur Vagusnerv-Aktivierung.",
        "Nutzen Sie Nuju als geschützten Sprachraum zur Entlastung bei akuter Panik.",
      ],
      fr: [
        "Consultez sans tarder un psychiatre et un psychologue spécialisé dans les troubles phobiques.",
        "Envisagez une prise en charge combinée (médicamenteuse et TCC avec exposition) pour briser l'évitement.",
        "Appliquez des techniques somatiques d'urgence : froid intense, pression tactile et vocalises pour stimuler le nerf vague.",
        "Faites de l'espace vocal Nuju votre sanctuaire privé pour apaiser les crises de panique en toute bienveillance.",
      ],
      es: [
        "Busca ayuda especializada con un psiquiatra y psicólogo clínico experto en fobias específicas.",
        "Valora un tratamiento combinado (farmacoterapia y desensibilización sistemática) para recuperar autonomía.",
        "Usa herramientas somáticas de choque: hielo, estímulos táctiles firmes y vocalizaciones para regular el nervio vago.",
        "Apóyate en el espacio de voz de Nuju como refugio seguro para descargar el pánico sin juicio.",
      ],
    },
  },
];

export const CLAUSTROPHOBIA_SUBSCALE_INFO = {
  suffocation_fear_air_flow_panic: {
    title: {
      en: "Suffocation Fear & Air Flow Panic",
      id: "Ketakutan Tercekik & Panik Aliran Udara",
      de: "Erstickungsangst & Luftmangel",
      fr: "Peur d'étouffement & manque d'air",
      es: "Miedo a la asfixia y falta de aire",
    },
    description: {
      en: "Terror of running out of oxygen, hyperventilation, stuffy air, windowless spaces, MRI tunnels, and tight clothing around the neck.",
      id: "Ketakutan kehabisan oksigen, hiperventilasi, udara pengap, ruangan tanpa jendela, tabung MRI, dan pakaian ketat di leher.",
      de: "Panik vor Sauerstoffmangel, Hyperventilation, stickiger Luft, fensterlosen Räumen, MRT-Röhren und enger Kleidung.",
      fr: "Terreur de manquer d'oxygène, hyperventilation, pièces sans fenêtre, tunnels d'IRM et vêtements serrés au cou.",
      es: "Terror a quedarse sin oxígeno, hiperventilación, aire estancado, salas sin ventanas, resonancias y cuellos apretados.",
    },
  },
  physical_restriction_entrapment_dread: {
    title: {
      en: "Physical Restriction & Entrapment Dread",
      id: "Ketakutan Terjebak & Terbatas Gerak",
      de: "Bewegungseinschränkung & Furcht vor dem Eingesperrtsein",
      fr: "Entrave physique & peur d'être piégé",
      es: "Restricción física y temor a quedar atrapado",
    },
    description: {
      en: "Adrenaline spikes from closed elevator doors, locked bathroom stalls, traffic jams, sealed aircraft, dental chairs, and packed crowds.",
      id: "Lonjakan adrenalin saat pintu lift menutup rapat, bilik toilet terkunci, macet total di jalan, kabin pesawat tertutup, dan kerumunan padat.",
      de: "Adrenalinschübe bei geschlossenen Fahrstuhltüren, verriegelten Kabinen, Staus, Flugzeugkabinen und dichten Menschenmengen.",
      fr: "Décharges d'adrénaline lors de portes fermées, bouchons routiers, avions scellés, fauteuils de dentiste et foules denses.",
      es: "Picos de adrenalina con puertas cerradas de ascensores, atascos, cabinas de avión selladas y multitudes compactas.",
    },
  },
  anticipatory_avoidance_escape_monitoring: {
    title: {
      en: "Anticipatory Avoidance & Escape Monitoring",
      id: "Penghindaran Antisipatif & Pemetaan Jalur Keluar",
      de: "Vermeidungsverhalten & Fluchtwege-Scanning",
      fr: "Évitement anticipé & repérage des sorties",
      es: "Evitación anticipatoria y rastreo de salidas",
    },
    description: {
      en: "Climbing stairs to avoid elevators, sitting exclusively on aisle seats near emergency exits, and canceling medical scans or flights.",
      id: "Menaiki tangga untuk menghindari lift, wajib duduk di pinggir lorong dekat pintu darurat, dan membatalkan scan MRI atau penerbangan.",
      de: "Treppensteigen statt Aufzugfahren, Beharren auf Gangplätzen nahe Notausgängen sowie Absagen von Flügen und MRTs.",
      fr: "Prendre les escaliers pour fuir les ascenseurs, exiger des places côté couloir et annuler des examens médicaux ou voyages.",
      es: "Subir escaleras para evitar ascensores, exigir asientos de pasillo junto a salidas y cancelar resonancias o vuelos.",
    },
  },
};

export function calculateClaustrophobiaSubscales(answers: Record<number, number>) {
  let suffocation = 0;
  let restriction = 0;
  let avoidance = 0;

  CLAUSTROPHOBIA_QUESTIONS.forEach((q) => {
    const val = answers[q.id] ?? 0;
    if (q.subscale === "suffocation_fear_air_flow_panic") suffocation += val;
    if (q.subscale === "physical_restriction_entrapment_dread") restriction += val;
    if (q.subscale === "anticipatory_avoidance_escape_monitoring") avoidance += val;
  });

  return {
    suffocation_fear_air_flow_panic: suffocation,
    physical_restriction_entrapment_dread: restriction,
    anticipatory_avoidance_escape_monitoring: avoidance,
  };
}

export function getClaustrophobiaResult(score: number): ClaustrophobiaResultLevel {
  const match = CLAUSTROPHOBIA_RESULT_LEVELS.find(
    (lvl) => score >= lvl.scoreRange[0] && score <= lvl.scoreRange[1]
  );
  return match || CLAUSTROPHOBIA_RESULT_LEVELS[CLAUSTROPHOBIA_RESULT_LEVELS.length - 1];
}

export const CLAUSTROPHOBIA_RESULTS = CLAUSTROPHOBIA_RESULT_LEVELS;

export function calculateClaustrophobiaScore(answers: Record<number, number>) {
  let totalScore = 0;
  const subscales = calculateClaustrophobiaSubscales(answers);

  CLAUSTROPHOBIA_QUESTIONS.forEach((q) => {
    totalScore += answers[q.id] ?? 0;
  });

  const level = getClaustrophobiaResult(totalScore);

  return {
    totalScore,
    maxScore: CLAUSTROPHOBIA_QUESTIONS.length * 3, // 36
    level,
    subscales,
  };
}
