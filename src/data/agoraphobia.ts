export type AgoraphobiaCardLang = "en" | "id" | "de" | "fr" | "es";

export interface AgoraphobiaQuestion {
  id: number;
  subscale:
    | "spatial_escape_entrapment"
    | "fear_of_fear_interoception"
    | "safety_tether_constriction";
  text: Record<AgoraphobiaCardLang, string>;
}

export interface AgoraphobiaResultLevel {
  level:
    | "unrestricted_navigational_freedom"
    | "mild_avoidance_flutter"
    | "moderate_agoraphobic_constriction"
    | "severe_spatial_entrapment"
    | "acute_housebound_paralysis";
  scoreRange: [number, number];
  title: Record<AgoraphobiaCardLang, string>;
  badge: Record<AgoraphobiaCardLang, string>;
  summary: Record<AgoraphobiaCardLang, string>;
  psychology: Record<AgoraphobiaCardLang, string>;
  actionProtocol: Record<AgoraphobiaCardLang, string[]>;
}

export const AGORAPHOBIA_QUESTIONS: AgoraphobiaQuestion[] = [
  // 1. Spatial Escape Entrapment
  {
    id: 1,
    subscale: "spatial_escape_entrapment",
    text: {
      en: "I feel intense panic in places where quick escape or medical help would be difficult (traffic gridlocks, bridges, tunnels, airplanes, or crowded concerts).",
      id: "Aku merasakan panik luar biasa di tempat di mana kabur atau mencari bantuan medis terasa sulit (macet parah, jembatan, terowongan, pesawat, konser ramai).",
      de: "Ich verspüre Panik an Orten, an denen eine schnelle Flucht oder medizinische Hilfe schwer erreichbar wäre (Stau, Brücken, Tunnel, Flugzeuge, Konzerte).",
      fr: "Je panique dans les lieux où fuir rapidement ou recevoir de l'aide médicale semble impossible (embouteillages, ponts, tunnels, avions, foules).",
      es: "Siento pánico intenso en lugares donde escapar rápido o recibir ayuda médica sería difícil (atascos, puentes, túneles, aviones, multitudes).",
    },
  },
  // 2. Fear of Fear Interoception
  {
    id: 2,
    subscale: "fear_of_fear_interoception",
    text: {
      en: "I am terrified not of the physical location itself, but of having a sudden panic attack (racing heart, dizziness, faintness) in front of others.",
      id: "Yang paling kutakuti bukanlah tempatnya, melainkan mengalami serangan panik mendadak (jantung berdebar, pusing, mau pingsan) di hadapan orang lain.",
      de: "Ich fürchte mich nicht vor dem Ort selbst, sondern vor einer plötzlichen Panikattacke (Herzrasen, Schwindel, Ohnmachtsgefühl) vor Zeugen.",
      fr: "Ce n'est pas le lieu qui m'effraie, mais la terreur de faire une crise de panique soudaine (tachycardie, vertiges, malaise) sous le regard d'autrui.",
      es: "No temo al lugar en sí, sino a sufrir un ataque de pánico súbito (taquicardia, mareo, desmayo) delante de los demás.",
    },
  },
  // 3. Safety Tether Constriction
  {
    id: 3,
    subscale: "safety_tether_constriction",
    text: {
      en: "I cannot comfortably travel far from home without a 'safe person' (partner, parent, close friend) accompanying me.",
      id: "Aku tidak bisa bepergian jauh dari rumah dengan tenang tanpa ditemani 'safe person' (pasangan, orang tua, atau sahabat terdekat).",
      de: "Ich kann mich kaum weit von zu Hause entfernen, ohne dass mich eine 'Sicherheitsperson' (Partner, Elternteil, Freund) begleitet.",
      fr: "Je ne peux pas m'éloigner sereinement de chez moi sans être accompagné(e) d'une 'personne refuge' (conjoint, parent, ami proche).",
      es: "No puedo alejarme de casa con tranquilidad sin la compañía de una 'persona de seguridad' (pareja, madre/padre, amigo íntimo).",
    },
  },
  // 4. Spatial Escape Entrapment
  {
    id: 4,
    subscale: "spatial_escape_entrapment",
    text: {
      en: "Whenever I enter a supermarket, lecture hall, or cinema, my eyes immediately scan for the closest exit doors and I deliberately sit near the aisles.",
      id: "Setiap kali masuk supermarket, aula, atau bioskop, mataku langsung memindai pintu darurat terdekat dan sengaja memilih duduk di pinggir lorong.",
      de: "Beim Betreten von Supermärkten, Kinos oder Sälen scanne ich sofort die Notausgänge und setze mich demonstrativ an den Randgang.",
      fr: "Dès que j'entre dans un magasin, une salle ou un cinéma, je repère immédiatement les issues de secours et m'assois près de l'allée.",
      es: "Al entrar en un supermercado, cine o auditorio, mis ojos buscan de inmediato las salidas y me siento cerca del pasillo.",
    },
  },
  // 5. Fear of Fear Interoception
  {
    id: 5,
    subscale: "fear_of_fear_interoception",
    text: {
      en: "Slight bodily sensations while away from home (a sudden hot flush, mild lightheadedness, shortness of breath) immediately spark a catastrophic spiral.",
      id: "Sensasi tubuh ringan saat jauh dari rumah (tiba-tiba gerah, sedikit pusing, napas pendek) langsung menyalakan spiral panik katastrofik.",
      de: "Leichte Körpersensationen unterwegs (Hitzewallung, flauer Schwindel, Kurzatmigkeit) lösen sofort eine panische Gedankenspirale aus.",
      fr: "De légères sensations physiques hors de chez moi (bouffée de chaleur, vertige fugace) déclenchent aussitôt une spirale de panique.",
      es: "Sensaciones corporales leves lejos de casa (sofoco, mareo leve, falta de aire) desatan de inmediato un espiral de alarma.",
    },
  },
  // 6. Safety Tether Constriction
  {
    id: 6,
    subscale: "safety_tether_constriction",
    text: {
      en: "I rely heavily on 'safety props' (carrying a water bottle everywhere, emergency tranquilizers in my bag, sunglasses, or chewing gum) to leave the house.",
      id: "Aku sangat bergantung pada 'alat pengaman' (selalu bawa botol air, obat penenang di tas, kacamata hitam, atau permen karet) agar bisa keluar rumah.",
      de: "Ich verlasse das Haus kaum ohne 'Sicherheitskrücken' (Wasserflasche, Notfallmedikamente in der Tasche, Sonnenbrille oder Kaugummi).",
      fr: "J'ai absolument besoin d''objets de sécurité' (bouteille d'eau, anxiolytique dans le sac, lunettes de soleil) pour oser franchir ma porte.",
      es: "Dependo fuertemente de 'amuletos de seguridad' (botella de agua, ansiolítico en el bolso, gafas de sol o chicles) para salir a la calle.",
    },
  },
  // 7. Spatial Escape Entrapment
  {
    id: 7,
    subscale: "spatial_escape_entrapment",
    text: {
      en: "Standing in long checkout lines or waiting in standstill highway traffic fills me with overwhelming claustrophobic urgency to break free.",
      id: "Mengantre di kasir yang panjang atau terjebak macet total di jalan tol membuatku dilanda dorongan klaustrofobik hebat untuk meloloskan diri.",
      de: "Langes Anstehen an der Supermarktkasse oder Stillstand auf der Autobahn erzeugen ein quälendes, klaustrophobisches Fluchtbedürfnis.",
      fr: "Faire la queue à la caisse ou être bloqué(e) dans les bouchons sur l'autoroute provoque une envie claustrophobe irrépressible de m'enfuir.",
      es: "Estar en colas largas o atrapado en un atasco en la autopista me produce una necesidad claustrofóbica desesperada de escapar.",
    },
  },
  // 8. Fear of Fear Interoception
  {
    id: 8,
    subscale: "fear_of_fear_interoception",
    text: {
      en: "I fear that a public panic episode will make me lose complete control, go insane, vomit, or cause public humiliation.",
      id: "Aku takut serangan panik di tempat umum akan membuatku hilang kendali total, gila, muntah, atau mempermalukan diriku di depan orang banyak.",
      de: "Ich fürchte, bei einer Panikattacke in der Öffentlichkeit völlig die Kontrolle zu verlieren, durchzudrehen oder mich zu blamieren.",
      fr: "J'ai peur qu'une crise de panique en public me fasse perdre le contrôle, devenir fou/folle ou subir une honte destructrice.",
      es: "Temo que un ataque de pánico en público me haga perder el control por completo, enloquecer, vomitar o causar humillación pública.",
    },
  },
  // 9. Safety Tether Constriction
  {
    id: 9,
    subscale: "safety_tether_constriction",
    text: {
      en: "Over recent months, my 'safe territory' has progressively shrunk; there are neighborhoods, routes, or stores I completely refuse to visit.",
      id: "Selama beberapa bulan terakhir, 'wilayah aman' dalam hidupku semakin menyempit; ada rute, toko, atau area yang sama sekali menolak kukunjungi.",
      de: "In den letzten Monaten ist mein 'sicherer Radius' immer kleiner geworden; bestimmte Straßen oder Geschäfte meide ich strikt.",
      fr: "Ces derniers mois, mon 'périmètre de sécurité' s'est réduit comme peau de chagrin ; je refuse catégoriquement certains quartiers ou magasins.",
      es: "En los últimos meses, mi 'radio de seguridad' se ha encogido; hay barrios, rutas o tiendas que me niego rotundamente a visitar.",
    },
  },
  // 10. Spatial Escape Entrapment
  {
    id: 10,
    subscale: "spatial_escape_entrapment",
    text: {
      en: "Wide open, exposed spaces (empty vast parking lots, open fields, wide city squares) make me feel vulnerable, dizzy, or ungrounded.",
      id: "Ruang terbuka luas tanpa perlindungan (tempat parkir kosong luas, lapangan terbuka, alun-alun kota besar) membuatku limbung dan pusing.",
      de: "Weite, ungeschützte Freiflächen (riesige leere Parkplätze, offene Felder, Plätze) lösen Schwindel, Unsicherheit und Bodenverlust aus.",
      fr: "Les grands espaces ouverts et dégagés (immenses parkings vides, places ouvertes) me donnent le vertige et un sentiment d'insécurité.",
      es: "Los espacios abiertos e indefensos (grandes estacionamientos vacíos, explanadas, plazas amplias) me generan mareo y desprotección.",
    },
  },
  // 11. Fear of Fear Interoception
  {
    id: 11,
    subscale: "fear_of_fear_interoception",
    text: {
      en: "The mere thought of traveling alone to an unfamiliar city or taking a long flight triggers anticipatory anxiety days or weeks in advance.",
      id: "Baru sekadar membayangkan bepergian sendirian ke kota asing atau naik pesawat berjarak jauh sudah memicu cemas antisipasi berhari-hari sebelumnya.",
      de: "Allein der Gedanke an eine Reise in eine fremde Stadt oder einen Flug löst schon Tage oder Wochen zuvor quälende Angst aus.",
      fr: "La simple idée de voyager seul(e) dans une ville inconnue ou de prendre l'avion déclenche une angoisse anticipatoire des jours à l'avance.",
      es: "La sola idea de viajar solo a una ciudad desconocida o tomar un vuelo largo me desata ansiedad anticipatoria con días o semanas de antelación.",
    },
  },
  // 12. Safety Tether Constriction
  {
    id: 12,
    subscale: "safety_tether_constriction",
    text: {
      en: "Home feels like the only fortress where I am safe; stepping beyond the threshold requires intense psychological bargaining and courage.",
      id: "Rumah terasa seperti satu-satunya benteng pertahanan di mana aku aman; melangkah keluar pintu butuh negosiasi mental dan keberanian besar.",
      de: "Mein Zuhause ist die einzige Festung, in der ich mich sicher fühle; das Verlassen der Haustür erfordert enorme Überwindung.",
      fr: "Mon domicile est la seule forteresse où je suis en sécurité ; franchir le pas de la porte exige un combat psychologique épuisant.",
      es: "Mi hogar se siente como la única fortaleza donde estoy a salvo; cruzar la puerta requiere una agotadora negociación mental.",
    },
  },
];

export const AGORAPHOBIA_OPTIONS = [
  {
    value: 0,
    label: {
      en: "Never / Completely Untrue (I travel anywhere freely with zero panic)",
      id: "Tidak Pernah (Aku bepergian ke mana pun dengan bebas tanpa panik)",
      de: "Nie / Trifft gar nicht zu (Ich bewege mich völlig frei ohne Panik)",
      fr: "Jamais / Pas du tout (Je me déplace partout librement sans panique)",
      es: "Nunca / Para nada (Me desplazo libremente a cualquier lugar sin pánico)",
    },
  },
  {
    value: 1,
    label: {
      en: "Rarely / Mildly (Occasional discomfort in crowded places, easily handled)",
      id: "Jarang / Sedikit (Kadang tidak nyaman di tempat ramai, tapi mudah diatasi)",
      de: "Selten / Leicht (Gelegentlich unwohl in Menschenmengen, gut beherrschbar)",
      fr: "Rarement / Légèrement (Léger inconfort occasionnel dans la foule, bien géré)",
      es: "Rara vez / Leve (Incomodidad ocasional en multitudes, fácilmente manejable)",
    },
  },
  {
    value: 2,
    label: {
      en: "Often / Moderately (Noticeable avoidance of specific routes, stores, or transit)",
      id: "Sering / Cukup Parah (Jelas menghindari rute, toko, atau transportasi tertentu)",
      de: "Oft / Mäßig (Deutliche Vermeidung bestimmter Strecken, Läden oder Verkehrsmittel)",
      fr: "Souvent / Modérément (Évitement marqué de certains magasins ou transports)",
      es: "A menudo / Moderado (Evitación notable de ciertas rutas, tiendas o transporte)",
    },
  },
  {
    value: 3,
    label: {
      en: "Constantly / Severely (Severe spatial entrapment; life territory severely shrunken)",
      id: "Selalu / Sangat Parah (Terperangkap ruang gerak; wilayah hidup sangat menyusut)",
      de: "Ständig / Schwer (Massive Raumangst; Lebensradius extrem eingeschränkt)",
      fr: "Constamment / Sévère (Enfermement sévère ; périmètre de vie drastiquement réduit)",
      es: "Constantemente / Severo (Atrapamiento espacial grave; radio de vida sumamente reducido)",
    },
  },
];

export const AGORAPHOBIA_RESULTS: AgoraphobiaResultLevel[] = [
  {
    level: "unrestricted_navigational_freedom",
    scoreRange: [0, 6],
    title: {
      en: "Unrestricted Navigational Freedom (Healthy Spatial Safety)",
      id: "Kebebasan Navigasi Tanpa Hambatan (Rasa Aman Spasial Sehat)",
      de: "Uneingeschränkte Bewegungsfreiheit (Gesunde räumliche Sicherheit)",
      fr: "Liberté de Déplacement Totale (Sécurité Spatiale Saine)",
      es: "Libertad de Movimiento Plena (Seguridad Espacial Sana)",
    },
    badge: {
      en: "Full Spatial Autonomy",
      id: "Otonomi Spasial Penuh",
      de: "Volle Bewegungsautonomie",
      fr: "Autonomie Spatiale Complète",
      es: "Autonomía Espacial Total",
    },
    summary: {
      en: "Your nervous system navigates diverse environments—crowds, transit, highways, and unfamiliar cities—with robust interoceptive confidence. You do not construct mental safety perimeters or fear spatial entrapment.",
      id: "Sistem sarafmu mampu menavigasi berbagai lingkungan—keramaian, transportasi publik, jalan tol, dan kota asing—dengan keyakinan interoseptif yang kokoh tanpa takut terperangkap.",
      de: "Ihr Nervensystem bewegt sich mühelos durch Menschenmengen, Verkehr und fremde Umgebungen. Sie benötigen keine Sicherheitsbegleiter oder Fluchtrouten.",
      fr: "Votre système nerveux appréhende les foules, transports et espaces inconnus avec une solide confiance corporelle. Vous ne craignez pas l'enfermement.",
      es: "Tu sistema nervioso transita con soltura por multitudes, transporte y lugares desconocidos. No necesitas rutas de escape ni personas de seguridad.",
    },
    psychology: {
      en: "Dr. Borwin Bandelow's Panic and Agoraphobia Scale (PAS) benchmarks this as optimal territorial functioning. Your vestibular, visual, and interoceptive balance circuits do not misinterpret benign autonomic fluctuations as imminent medical emergencies.",
      id: "Berdasarkan skala PAS Dr. Borwin Bandelow, fungsi teritorialmu berada pada level optimal. Sirkuit vestibular dan interoseptifmu tidak salah mengartikan sensasi tubuh normal sebagai ancaman medis darurat.",
      de: "Nach der PAS-Skala von Dr. Borwin Bandelow liegt Ihre räumliche Autonomie im gesunden Idealbereich. Körpersignale werden nicht als Katastrophen fehlinterpretiert.",
      fr: "Selon l'échelle PAS du Dr Borwin Bandelow, votre fonctionnement spatial est optimal. Vos signaux corporels ne sont pas surinterprétés comme des urgences médicales.",
      es: "Según la escala PAS del Dr. Borwin Bandelow, tu autonomía espacial es óptima. Tus señales vestibulares y viscerales no se malinterpretan como emergencias médicas.",
    },
    actionProtocol: {
      en: [
        "Continuous Territorial Exploration: Maintain periodic solo travels and novel geographic excursions to keep neuroplastic confidence agile.",
        "Somatic Grounding: Practice body-scan grounding during long transit to maintain effortless vagal tone.",
        "Nuju Vocal Sanctuary: Use Nuju's voice journal for emotional check-ins after demanding work trips.",
      ],
      id: [
        "Eksplorasi Teritorial Rutin: Lakukan perjalanan solo berkala ke lokasi baru untuk menjaga kelenturan neuroplastisitas keberanian.",
        "Grounding Somatik: Latih kesadaran napas santai saat berada di kemacetan atau transportasi jarak jauh.",
        "Sanctuary Suara Nuju: Manfaatkan Nuju untuk refleksi emosional rutin seusai aktivitas perjalanan yang padat.",
      ],
      de: [
        "Regelmäßige Horizonterweiterung: Gelegentliche Solo-Reisen und neue Wege beibehalten, um die neuronale Flexibilität zu stärken.",
        "Somatische Erdung: Ruhige Atemfokussierung bei langen Fahrten praktizieren.",
        "Nuju Sprachnotizen: Nuju für entspannte Reflexionen nach anstrengenden Arbeitsreisen nutzen.",
      ],
      fr: [
        "Exploration géographique continue : Maintenez des sorties et voyages en solo pour stimuler votre plasticité cérébrale.",
        "Ancrage somatique : Pratiquez la respiration calme lors de trajets prolongés en transport.",
        "Journal vocal Nuju : Déposez vos bilans de voyage dans Nuju pour consolider votre sérénité.",
      ],
      es: [
        "Exploración Territorial Periódica: Realiza viajes en solitario y rutas nuevas para mantener ágil tu confianza neurológica.",
        "Anclaje Somático: Respira con calma y enraízate en trayectos largos o atascos viales.",
        "Diario Vocal Nuju: Usa Nuju para registrar tus reflexiones tras jornadas intensas fuera de casa.",
      ],
    },
  },
  {
    level: "mild_avoidance_flutter",
    scoreRange: [7, 14],
    title: {
      en: "Mild Avoidance Flutter (Subtle Comfort Zone Fringing)",
      id: "Kecemasan Spasial Ringan (Penyempitan Zona Nyaman Halus)",
      de: "Leichte Vermeidungstendenzen (Subtile Komfortzonen-Verengung)",
      fr: "Évitement Spatial Léger (Frémissement d'Inconfort)",
      es: "Evitación Espacial Leve (Tensión Discreta en Tránsitos)",
    },
    badge: {
      en: "Situational Discomfort",
      id: "Ketidaknyamanan Situasional",
      de: "Situatives Unbehagen",
      fr: "Inconfort Situationnel",
      es: "Incomodidad Situacional",
    },
    summary: {
      en: "You can travel and shop independently, but you occasionally experience butterflies, subtle claustrophobic tension, or an urge to leave when trapped in slow-moving checkout queues, packed elevators, or gridlocked traffic.",
      id: "Kamu masih bisa bepergian dan belanja mandiri, tetapi kadang merasakan ketegangan klaustrofobik ringan atau keinginan untuk segera keluar saat terjebak antrean kasir panjang, lift penuh, atau macet total.",
      de: "Sie sind weitgehend mobil, verspüren jedoch gelegentlich Beklemmung in zähen Schlangen, vollen Aufzügen oder im Autobahnstau.",
      fr: "Vous êtes autonome, mais ressentez parfois une gêne claustrophobe dans les files d'attente lentes, ascenseurs pleins ou embouteillages.",
      es: "Eres autónomo, pero ocasionalmente sientes opresión o ganas de salir al quedar atrapado en filas lentas, elevadores llenos o tráfico pesado.",
    },
    psychology: {
      en: "Under elevated baseline stress or tiredness, your amygdala becomes sensitized to constraints on physical mobility. While this does not stop you from functioning, you tend to quietly prefer aisle seats, carry a water bottle, or leave early to avoid crowds.",
      id: "Saat kelelahan atau stres menumpuk, amigdala menjadi peka terhadap pembatasan mobilitas fisik. Meski belum mengganggu fungsi hidup, kamu mulai diam-diam memilih kursi lorong atau membawa botol air sebagai penenang.",
      de: "Bei erhöhtem Stresspegel reagiert die Amygdala sensibel auf eingeschränkte Fluchtoptionen. Dies führt zu unbewussten Sicherheitsstrategien wie Randplätzen oder Wasserflaschen.",
      fr: "Sous l'effet de la fatigue, l'amygdale s'alarme face aux contraintes de mobilité, vous incitant discrètement à choisir les places près des sorties.",
      es: "Con el cansancio, tu amígdala se vuelve reactiva ante la falta de movilidad inmediata, llevándote a elegir asientos junto al pasillo de forma preventiva.",
    },
    actionProtocol: {
      en: [
        "Inhibit Micro-Avoidance: Deliberately stand in the middle of a checkout line or take the center seat occasionally to prevent avoidance behaviors from consolidating.",
        "Interoceptive Tolerance Drill: When feeling lightheaded in traffic, relax your shoulders and lengthen your exhale (4-second inhale, 7-second exhale) instead of frantically checking for exits.",
        "Nuju Somatic Grounding: Speak your travel fatigue into Nuju before and after challenging journeys to release anticipatory tension.",
      ],
      id: [
        "Cegah Penghindaran Mikro: Sesekali sengaja antre di tengah atau duduk di kursi tengah untuk melatih otak bahwa kamu tetap aman tanpa pintu darurat tepat di sebelahmu.",
        "Latihan Toleransi Interoseptif: Saat merasa agak pusing di kemacetan, turunkan bahu dan perpanjang hembusan napas (tarik 4 detik, buang 7 detik).",
        "Grounding Suara di Nuju: Bicarakan kekhawatiran perjalanan di Nuju sebelum dan sesudah bepergian agar ketegangan antisipatif tidak menumpuk.",
      ],
      de: [
        "Mikro-Vermeidung stoppen: Gezielt ab und zu in der Mitte der Schlange stehen, um dem Gehirn zu beweisen, dass keine unmittelbare Flucht nötig ist.",
        "Verlängerte Ausatmung: Bei Unruhe im Stau 4 Sekunden einatmen, 7 Sekunden langsam ausatmen, um den Parasympathikus zu aktivieren.",
        "Nuju-Entlastung: Reiseanspannungen im Nuju-Sprachjournal verbalisieren, um die Erwartungsangst abzubauen.",
      ],
      fr: [
        "Stopper les micro-évitements : Choisissez délibérément le centre d'une rangée ou d'une file pour prouver à votre cerveau que vous êtes en sécurité.",
        "Respiration 4-7 : Expirez lentement le double du temps d'inspiration pour calmer le système sympathique en voiture.",
        "Journal vocal Nuju : Déposez votre fatigue de transport dans Nuju avant et après les trajets stressants.",
      ],
      es: [
        "Frena las Microevitaciones: Quédate a propósito en medio de una fila para demostrarle a tu mente que no necesitas una salida inmediata.",
        "Respiración 4-7: Alarga la exhalación durante el tráfico para activar el tono vagal y relajar la musculatura.",
        "Desfogue Vocal en Nuju: Graba tus inquietudes de viaje en Nuju antes y después de trayectos tensos para disipar la alarma.",
      ],
    },
  },
  {
    level: "moderate_agoraphobic_constriction",
    scoreRange: [15, 22],
    title: {
      en: "Moderate Agoraphobic Constriction (Shrinking Territorial Perimeter)",
      id: "Penyempitan Agorafobia Menengah (Radius Wilayah Hidup Menyusut)",
      de: "Mittlere Agoraphobische Einengung (Schrumpfender Bewegungsradius)",
      fr: "Constriction Agoraphobique Modérée (Périmètre en Réduction)",
      es: "Restricción Agorafóbica Moderada (Pérdida de Territorio Vital)",
    },
    badge: {
      en: "Clinical Agoraphobic Pattern",
      id: "Pola Agorafobia Klinis",
      de: "Klinisches Agoraphobie-Muster",
      fr: "Profil Agoraphobique Clinique",
      es: "Patrón Agorafóbico Significativo",
    },
    summary: {
      en: "Agoraphobic avoidance is actively reshaping your daily life. You decline invitations, avoid public transit, rely on 'safe persons' to travel beyond your neighborhood, and experience intense anticipatory anxiety before trips.",
      id: "Penghindaran agorafobia mulai nyata mengubah rutinitas hidupmu. Kamu menolak undangan, menghindari transportasi umum, bergantung pada seseorang untuk bepergian jauh, dan mengalami panik antisipasi berhari-hari sebelumnya.",
      de: "Die Angst schränkt Ihren Alltag spürbar ein. Sie meiden öffentliche Verkehrsmittel, sagen Treffen ab, verlassen Ihre Nachbarschaft nur mit Begleitperson und leiden unter quälender Erwartungsangst.",
      fr: "L'évitement agoraphobique modifie votre quotidien. Vous fuyez les transports, déclinez des invitations, dépendez d'un proche pour sortir de votre quartier et souffrez d'angoisse d'anticipation.",
      es: "La evitación agorafóbica condiciona tus días. Evitas el transporte público, rechazas planes, dependes de acompañantes para salir de tu zona y padeces ansiedad anticipatoria.",
    },
    psychology: {
      en: "In Dr. David Barlow's cognitive model, agoraphobia is essentially 'fear of fear.' Panic attacks have become interoceptively conditioned to physical places. By avoiding the locations, you experience short-lived relief that paradoxically convinces the brain that the outside world is genuinely dangerous.",
      id: "Menurut model kognitif Dr. David Barlow, agorafobia pada dasarnya adalah 'ketakutan akan rasa takut itu sendiri'. Sensasi panik telah terkondisi pada lokasi tertentu. Menghindarinya memberi kelegaan sesaat yang justru meyakinkan otak bahwa dunia luar benar-benar berbahaya.",
      de: "Nach Dr. David Barlow ist Agoraphobie die 'Angst vor der Angst'. Panikattacken wurden interozeptiv an bestimmte Orte gekoppelt. Die Vermeidung verschafft kurzfristige Entlastung, verfestigt aber die neuronale Bedrohung.",
      fr: "Selon le Dr David Barlow, l'agoraphobie est 'la peur d'avoir peur'. Les crises ont été conditionnées à certains lieux. L'évitement soulage à court terme mais confirme au cerveau que le monde extérieur est hostile.",
      es: "Según el Dr. David Barlow, la agorafobia es 'el miedo al miedo'. El ataque de pánico quedó condicionado a lugares físicos. Evitarlos da alivio momentáneo pero confirma al cerebro que el exterior es peligroso.",
    },
    actionProtocol: {
      en: [
        "Graduated In-Vivo Exposure Hierarchy: Create a 5-step ladder of avoided situations (e.g., Step 1: Walk around the block alone; Step 2: Visit a small grocery store alone; Step 3: Ride one bus stop). Practice each step until anxiety drops by half.",
        "Drop Safety Props Gradually: Practice driving or walking without clutching emergency water or checking phone navigation obsessively.",
        "Nuju Somatic Audio Sanctuary: Process your frustration and panic fears out loud in Nuju. Speaking openly dismantles the shame of 'why am I trapped?'",
      ],
      id: [
        "Hierarki Paparan Bertahap (In-Vivo Exposure): Buat tangga 5 langkah (misal: Langkah 1 jalan keliling komplek sendiri; Langkah 2 ke minimarket dekat rumah; Langkah 3 naik angkutan 1 halte). Latih hingga cemas reda 50%.",
        "Tinggalkan 'Alat Pengaman' Perlahan: Belajarlah berjalan tanpa terus-menerus memegang botol air atau mengecek peta rute keluar di HP.",
        "Sanctuary Audio Nuju: Tumpahkan keputusasaan dan rasa takutmu di Nuju secara jujur. Bersuara melunturkan rasa malu karena merasa terkurung.",
      ],
      de: [
        "Gestufte In-Vivo-Exposition: Eine 5-Stufen-Leiter erstellen (z.B. 1. Block umrunden; 2. kleiner Supermarkt allein; 3. eine Station Bus fahren) und wiederholen, bis die Angst nachlässt.",
        "Sicherheitsrequisiten abbauen: Gezielt ohne Notfall-Wasserflasche oder ständigen Blick auf die Navigations-App spazieren gehen.",
        "Nuju-Sprachraum: Sprechen Sie die Ohnmacht und Frustration offen in Nuju aus, um die sekundäre Scham abzubauen.",
      ],
      fr: [
        "Hiérarchie d'exposition in vivo : Établissez une échelle en 5 étapes (ex. faire le tour du pâté de maisons seul, faire une course rapide, prendre le bus sur un arrêt) jusqu'à baisse de l'anxiété.",
        "Abandonner les béquilles de sécurité : Sortez progressivement sans bouteille d'eau fétiche ni vérification compulsive du téléphone.",
        "Sanctuaire vocal Nuju : Exprimez votre sentiment de captivité dans Nuju pour dissoudre la honte de l'évitement.",
      ],
      es: [
        "Jerarquía de Exposición Gradual: Crea una escalera de 5 peldaños (ej. caminar una manzana solo; ir a la tienda cercana; viajar una parada de autobús) hasta habituarte.",
        "Suelta las 'Muletas de Seguridad': Sal sin aferrarte a la botella de agua ni mirar obsesivamente las rutas de escape en el móvil.",
        "Espacio Seguro Nuju: Desahoga el dolor del encierro en el diario de voz de Nuju; hablar con sinceridad rompe la culpa.",
      ],
    },
  },
  {
    level: "severe_spatial_entrapment",
    scoreRange: [23, 30],
    title: {
      en: "Severe Spatial Entrapment (Severe Agoraphobic Impairment)",
      id: "Keterperangkapan Spasial Berat (Gangguan Agorafobia Berat)",
      de: "Schwere Räumliche Gefangenschaft (Massive Agoraphobische Störung)",
      fr: "Enfermement Spatial Sévère (Handicap Agoraphobique Lourd)",
      es: "Atrapamiento Espacial Severo (Afectación Agorafóbica Grave)",
    },
    badge: {
      en: "Severe Agoraphobic Crisis",
      id: "Krisis Agorafobia Berat",
      de: "Schwere Agoraphobie-Krise",
      fr: "Crise Agoraphobique Sévère",
      es: "Crisis Agorafóbica Severa",
    },
    summary: {
      en: "You are severely restricted. Leaving your home without a specific trusted person is virtually impossible. Supermarkets, highways, public transit, and crowded venues provoke overwhelming panic attacks, causing severe occupational and social impairment.",
      id: "Ruang gerakmu sangat terbatas. Keluar rumah tanpa orang tertentu yang kamu percaya terasa nyaris mustahil. Supermarket, jalan tol, dan kerumunan memicu serangan panik dahsyat, mengganggu pekerjaan dan hubungan sosial secara berat.",
      de: "Ihr Leben ist massiv eingeschränkt. Das Verlassen des Hauses ohne vertraute Begleitperson ist kaum möglich. Öffentliche Orte lösen lähmende Panik aus, was Beruf und Sozialleben stark beeinträchtigt.",
      fr: "Votre liberté est sévèrement compromise. Sortir sans une personne ressource est quasi impossible. Les lieux publics déclenchent des crises de panique massives, bloquant travail et vie sociale.",
      es: "Tu vida está fuertemente limitada. Salir sin una persona de confianza es casi imposible. Los lugares públicos desatan pánico abrumador, paralizando tu empleo y tus relaciones.",
    },
    psychology: {
      en: "Interoceptive conditioning has coupled benign bodily fluctuations (heart rate increases, vestibular tilts) with catastrophic interpretations ('I am dying or fainting'). The nervous system has entered an extreme state of territorial lock-in where safety is restricted to a tight perimeter.",
      id: "Pengkondisian interoseptif telah mengunci sensasi tubuh normal (denyut jantung naik, sedikit pusing) dengan kesimpulan katastrofik ('Aku sekarat atau mau pingsan'). Sistem sarafmu masuk ke mode penguncian teritorial ekstrem di mana rasa aman hanya ada di benteng rumah.",
      de: "Körpersensationen sind fest mit Katastrophengedanken ('Ich sterbe/werde ohnmächtig') verknüpft. Das Nervensystem hat einen extremen territorialen Schutzmodus aktiviert, der Sicherheit nur noch in den eigenen vier Wänden vermutet.",
      fr: "Le conditionnement interoceptif associe tout battement de cœur accéléré à la certitude d'une catastrophe ('Je vais m'évanouir ou mourir'). Le cerveau a verrouillé la zone de sécurité à la maison.",
      es: "El condicionamiento interoceptivo une cualquier palpitación a pensamientos de catástrofe ('Voy a morir o desmayarme'). El sistema nervioso ha restringido la seguridad casi exclusivamente al hogar.",
    },
    actionProtocol: {
      en: [
        "Professional Cognitive Behavioral Therapy (CBT-A): Seek a licensed therapist trained in interoceptive exposure (e.g., hyperventilation drills, spinning in a chair) to decouple bodily sensations from panic.",
        "Threshold Desensitization: Stand on your front porch or outside the front door for 10 minutes daily without safety items, letting autonomic arousal spike and naturally subside.",
        "Nuju Vocal Companion: When anxiety spikes during exposure, talk into Nuju. Vocalizing your real-time sensations grounds your prefrontal cortex in auditory reality.",
      ],
      id: [
        "CBT Klinis untuk Agorafobia: Bekerjasamalah dengan psikolog klinis yang terlatih dalam paparan interoseptif (latihan sengaja bernapas cepat atau memutar badan) untuk memutus rantai panik dan sensasi tubuh.",
        "Desensitisasi Ambang Pintu: Berdirilah di teras atau depan pagar rumah selama 10 menit setiap hari tanpa membawa obat atau botol air, biarkan rasa cemas naik lalu turun secara alami.",
        "Sahabat Suara Nuju: Saat merasa cemas selama latihan melangkah keluar, bicaralah di Nuju secara real-time untuk membumikan pikiran ke kenyataan audio.",
      ],
      de: [
        "Kognitive Verhaltenstherapie (KVT): Gezielte interozeptive Exposition mit einem Therapeuten (z.B. Drehübungen, Hyperventilationstest), um Körpersymptome von Todesangst zu entkoppeln.",
        "Türschwellen-Training: Täglich 10 Minuten ohne Sicherheitsobjekte vor die Haustür stellen und abwarten, bis die Panikwelle von selbst abebbt.",
        "Nuju als Audio-Begleiter: Während kleiner Gehversuche in Nuju sprechen, um die Gedanken über die eigene Stimme im Hier und Jetzt zu verankern.",
      ],
      fr: [
        "Thérapie TCC spécialisée : Entamez des expositions interoceptives guidées pour dissocier les sensations corporelles de la peur de mourir.",
        "Désensibilisation du seuil : Tenez-vous 10 minutes sur le pas de votre porte chaque jour sans aucun objet refuge, en laissant la vague anxieuse retomber d'elle-même.",
        "Compagnon vocal Nuju : Parlez dans Nuju pendant vos micro-sorties pour ancrer votre cortex préfrontal dans la réalité auditive.",
      ],
      es: [
        "Terapia Cognitivo-Conductual Especializada: Trabaja con un terapeuta en exposición interoceptiva para desacoplar las sensaciones corporales del pánico.",
        "Desensibilización en el Umbral: Permanece 10 minutos en la puerta o pórtico a diario sin amuletos, esperando a que la ola de ansiedad baje por sí sola.",
        "Compañero Vocal Nuju: Graba en voz alta tus sensaciones en Nuju durante los pasos de exposición para anclar tu mente a la realidad.",
      ],
    },
  },
  {
    level: "acute_housebound_paralysis",
    scoreRange: [31, 36],
    title: {
      en: "Acute Housebound Paralysis (Total Agoraphobic Confinement)",
      id: "Kelumpuhan Terkurung Rumah Akut (Kurungan Agorafobia Total)",
      de: "Akute Hausgebundenheit (Vollständige Agoraphobische Isolation)",
      fr: "Confinement à Domicile Aigu (Paralysie Agoraphobique Totale)",
      es: "Confinamiento Doméstico Agudo (Inmovilidad Agorafóbica Total)",
    },
    badge: {
      en: "Total Housebound Confinement",
      id: "Terkurung Rumah Total",
      de: "Vollständige Hausgebundenheit",
      fr: "Confinement Domiciliaire Total",
      es: "Confinamiento Domiciliario Total",
    },
    summary: {
      en: "You are completely housebound or unable to cross your front doorstep without paralyzing terror. Even the safety of home is increasingly invaded by anticipatory panic. Your world has contracted to a single room or building.",
      id: "Kamu terkurung total di dalam rumah atau tidak mampu melewati pintu gerbang tanpa teror yang melumpuhkan. Bahkan rasa aman di dalam rumah mulai terinvasi oleh panik antisipatif. Duniamu menyusut menjadi satu ruangan atau rumah saja.",
      de: "Sie können das Haus nicht mehr verlassen, ohne von panischem Terror überwältigt zu werden. Selbst innerhalb der eigenen vier Wände bricht Erwartungsangst ein. Ihre Welt ist auf einen einzigen Raum geschrumpft.",
      fr: "Vous êtes totalement confiné(e) chez vous, incapable de franchir le seuil sans une terreur absolue. Même votre domicile commence à être envahi par l'angoisse anticipatoire.",
      es: "Estás completamente confinado en casa, incapaz de salir a la calle sin un terror paralizante. Incluso la seguridad del hogar se ve amenazada por el pánico anticipatorio continuo.",
    },
    psychology: {
      en: "This extreme clinical presentation represents the culmination of untreated panic disorder with agoraphobia. The autonomic fight-or-flight threshold has collapsed to near zero, where any change in posture, temperature, or visual field is processed as catastrophic danger.",
      id: "Kondisi klinis ekstrem ini merupakan puncak dari gangguan panik dengan agorafobia tanpa penanganan. Ambang batas sistem lawan-atau-lari runtuh ke titik nol, di mana perubahan suhu atau posisi tubuh langsung dianggap bahaya kematian.",
      de: "Dieses Extrembild stellt den Endpunkt unbehandelter Panikstörungen dar. Die autonome Alarmschwelle ist zusammengebrochen; jede minimale vegetative Veränderung signalisiert Lebensgefahr.",
      fr: "Cet état représente l'aboutissement d'un trouble panique sévère non traité. Le seuil d'alarme s'est effondré, interprétant toute fluctuation physique comme un péril vital.",
      es: "Este cuadro extremo representa la culminación del trastorno de pánico no tratado con agorafobia. El umbral de alarma se ha quebrado, viviendo cualquier cambio corporal como una amenaza mortal.",
    },
    actionProtocol: {
      en: [
        "Telehealth Psychiatric & Psychological Care: Access remote telehealth psychotherapy and medical evaluation immediately. Effective treatments (SSRIs/SNRIs and exposure therapy) have very high success rates in agoraphobia recovery.",
        "Zero-Judgment Self-Compassion: Release the intense self-criticism. Agoraphobia is not weakness; it is an over-protective neurobiological reflex that can be systematically retrained.",
        "Nuju In-Room Vocal Expression: Start rebuilding safety from your bed or desk. Record your raw voice into Nuju without having to face external sensory bombardment.",
      ],
      id: [
        "Konsultasi Telemedis & Psikiatri: Akses psikoterapi online dan evaluasi medis dari rumah. Terapi perilaku kognitif terstruktur dan pengobatan memiliki tingkat keberhasilan pemulihan yang sangat tinggi pada agorafobia.",
        "Welas Asih Tanpa Syarat: Lepaskan caci maki pada diri sendiri. Agorafobia bukanlah kelemahan moral; ini adalah alarm saraf yang terlalu protektif yang bisa dilatih ulang secara bertahap.",
        "Ekspresi Suara di Ruangan Bersama Nuju: Mulai bangun rasa aman dari dalam kamar. Rekam suaramu yang jujur di Nuju tanpa harus menghadapi stimulus dunia luar yang membanjiri.",
      ],
      de: [
        "Telemedizinische Hilfe: Sofort Online-Psychotherapie und psychiatrische Unterstützung in Anspruch nehmen. Die Heilungschancen durch KVT und medikamentöse Stabilisierung sind wissenschaftlich exzellent.",
        "Radikales Selbstmitgefühl: Stoppen Sie Selbstvorwürfe. Agoraphobie ist keine Feigheit, sondern ein fehlgeleiteter Schutzreflex des Gehirns, der wieder verlernt werden kann.",
        "Sichere Stimme in Nuju: Beginnen Sie die emotionale Entlastung direkt vom Zimmer aus. Das Aussprechen der Ängste in Nuju schafft erste neuronale Stabilität.",
      ],
      fr: [
        "Téléconsultation psychiatrique et psychologique : Prenez rendez-vous en téléconsultation sans attendre. Les TCC associées aux traitements adaptés offrent d'excellents taux de rémission.",
        "Auto-compassion absolue : Cessez de vous juger. L'agoraphobie est une alarme neurobiologique déréglée, et non un manque de volonté.",
        "Refuge vocal sur Nuju : Initiez votre reconstruction depuis votre chambre. Parlez dans Nuju sans subir d'agression sensorielle extérieure.",
      ],
      es: [
        "Atención Médica por Teleconsulta: Contacta cuanto antes a profesionales de salud mental online. La terapia combinada con apoyo médico tiene altísimas tasas de recuperación.",
        "Autocompasión Radical: Abandona los autorreproches. La agorafobia no es cobardía, sino una alarma neurológica hiperreactiva que se puede reeducar paso a paso.",
        "Voz Segura en Nuju: Comienza tu desahogo desde la cama o habitación. Grabar tu voz en Nuju restablecerá la calma interna sin exponerte de golpe.",
      ],
    },
  },
];

export const AGORAPHOBIA_SUBSCALE_INFO = {
  spatial_escape_entrapment: {
    name: {
      en: "Spatial Escape & Entrapment Dread",
      id: "Kecemasan Terjebak & Kesulitan Meloloskan Diri",
      de: "Fluchtunfähigkeit & Räumliche Enge",
      fr: "Peur de l'Enfermement & Fuite Impossible",
      es: "Miedo al Atrapamiento y Falta de Escape",
    },
    description: {
      en: "Intense fear of being trapped in traffic, airplanes, supermarkets, crowds, or places where escape would be difficult or embarrassing.",
      id: "Ketakutan hebat berada di kemacetan, pesawat, supermarket, kerumunan, atau tempat di mana melarikan diri terasa sulit atau memalukan.",
      de: "Panische Angst vor Staus, Flugzeugen, Kassen, Menschenmengen und Orten mit schwer erreichbaren Notausgängen.",
      fr: "Angoisse vive d'être bloqué(e) dans les bouchons, avions, magasins ou foules sans issue de secours immédiate.",
      es: "Terror a quedar atrapado en atascos, aviones, supermercados o multitudes donde escapar sería complicado.",
    },
  },
  fear_of_fear_interoception: {
    name: {
      en: "Fear of Fear & Panic Interoception",
      id: "Ketakutan pada Rasa Takut (Interosepsi Panik)",
      de: "Angst vor der Angst & Körpersymptome",
      fr: "Peur de la Peur & Alerte Interoceptive",
      es: "Miedo al Miedo y Alerta Corporal",
    },
    description: {
      en: "Catastrophic misinterpretation of bodily sensations (heart racing, dizziness, faintness) as signs of fainting, dying, or public humiliation.",
      id: "Penafsiran katastrofik sensasi tubuh (jantung berdebar, pusing, kliyengan) sebagai tanda akan pingsan, mati, atau dipermalukan di depan umum.",
      de: "Fehlinterpretation von Schwindel, Herzklopfen oder Hitzewallungen als Vorboten von Ohnmacht, Herzinfarkt oder Kontrollverlust.",
      fr: "Interprétation catastrophique des battements de cœur ou vertiges comme les signes imminents d'un malaise ou de la folie.",
      es: "Interpretación alarmista de palpitaciones o mareos como señales inminentes de desmayo, muerte o humillación pública.",
    },
  },
  safety_tether_constriction: {
    name: {
      en: "Safety Tether & Territorial Constriction",
      id: "Ketergantungan Pengaman & Penyempitan Wilayah",
      de: "Sicherheitsankern & Territoriale Einengung",
      fr: "Béquilles de Sécurité & Réduction du Périmètre",
      es: "Muletas de Seguridad y Pérdida de Radio Vital",
    },
    description: {
      en: "Inability to leave home without a safe person or safety props, accompanied by progressive shrinkage of geographic comfort zones.",
      id: "Ketidakmampuan bepergian tanpa seseorang yang dipercaya atau alat pengaman, disertai menyusutnya wilayah aman dalam hidup.",
      de: "Abhängigkeit von Sicherheitspersonen und Krücken (Wasser, Medikamente), gepaart mit ständiger Verkleinerung des Lebensradius.",
      fr: "Impossibilité de sortir sans personne refuge ou objets de sécurité, accompagnée d'un rétrécissement continu de l'espace de vie.",
      es: "Incapacidad de salir sin una persona de apoyo o amuletos, junto con un repliegue territorial progresivo.",
    },
  },
};

export function getAgoraphobiaResult(totalScore: number): AgoraphobiaResultLevel {
  const clamped = Math.max(0, Math.min(36, totalScore));
  return (
    AGORAPHOBIA_RESULTS.find(
      (r) => clamped >= r.scoreRange[0] && clamped <= r.scoreRange[1]
    ) || AGORAPHOBIA_RESULTS[0]
  );
}

export function calculateAgoraphobiaSubscales(answers: Record<number, number>): {
  spatial_escape_entrapment: number;
  fear_of_fear_interoception: number;
  safety_tether_constriction: number;
} {
  let se = 0;
  let ff = 0;
  let st = 0;

  AGORAPHOBIA_QUESTIONS.forEach((q) => {
    const score = answers[q.id] ?? 0;
    if (q.subscale === "spatial_escape_entrapment") se += score;
    if (q.subscale === "fear_of_fear_interoception") ff += score;
    if (q.subscale === "safety_tether_constriction") st += score;
  });

  return {
    spatial_escape_entrapment: se,
    fear_of_fear_interoception: ff,
    safety_tether_constriction: st,
  };
}
