export type AphantasiaCardLang = "en" | "id" | "de" | "fr" | "es";

export interface AphantasiaQuestion {
  id: number;
  subscale:
    | "visual_scene_vividness"
    | "facial_object_precision"
    | "multisensory_inner_simulation";
  text: Record<AphantasiaCardLang, string>;
}

export interface AphantasiaResultLevel {
  level:
    | "total_aphantasia_blind_minds_eye"
    | "hypophantasia_dim_silhouette"
    | "moderate_phantasic_visualization"
    | "vivid_multisensory_imagery"
    | "hyperphantasia_cinematic_clarity";
  scoreRange: [number, number];
  title: Record<AphantasiaCardLang, string>;
  badge: Record<AphantasiaCardLang, string>;
  summary: Record<AphantasiaCardLang, string>;
  psychology: Record<AphantasiaCardLang, string>;
  actionProtocol: Record<AphantasiaCardLang, string[]>;
}

export const APHANTASIA_QUESTIONS: AphantasiaQuestion[] = [
  // 1. Visual Scene Vividness
  {
    id: 1,
    subscale: "visual_scene_vividness",
    text: {
      en: "Think of a rising sun over the sea or mountains. Can you see the glowing horizon, the gradient of the sky, and light reflecting on waves in your mind?",
      id: "Bayangkan matahari terbit di atas laut atau pegunungan. Bisakah kamu melihat cakrawala bercahaya, gradasi warna langit, dan pantulan ombak di pikiranmu?",
      de: "Stellen Sie sich einen Sonnenaufgang über dem Meer vor. Sehen Sie den leuchtenden Horizont, den Himmel und das Licht auf den Wellen vor Ihrem inneren Auge?",
      fr: "Pensez à un lever de soleil sur la mer ou la montagne. Pouvez-vous voir l'horizon lumineux et le dégradé du ciel dans votre esprit ?",
      es: "Imagina un amanecer sobre el mar o las montañas. ¿Puedes ver el horizonte resplandeciente y el reflejo en las olas en tu mente?",
    },
  },
  {
    id: 2,
    subscale: "visual_scene_vividness",
    text: {
      en: "Picture a cozy room with a fireplace or candle. Can you visualize the arrangement of the furniture, the window, and the warm flickering glow?",
      id: "Bayangkan ruangan hangat dengan perapian atau lilin menyala. Bisakah kamu memvisualisasikan letak perabot, jendela, dan pendar hangat cahayanya?",
      de: "Stellen Sie sich ein gemütliches Zimmer mit Kamin oder Kerze vor. Können Sie die Möbel, das Fenster und den flackernden Schein visualisieren?",
      fr: "Visualisez une pièce chaleureuse avec une cheminée ou une bougie. Pouvez-vous voir la disposition des meubles et la lueur de la flamme ?",
      es: "Imagina una habitación acogedora con chimenea o velas. ¿Puedes visualizar la disposición de los muebles y el cálido resplandor de la luz?",
    },
  },
  {
    id: 3,
    subscale: "visual_scene_vividness",
    text: {
      en: "Imagine walking down a familiar street or childhood home. Can you visually navigate the corners, building facades, and sidewalk details in your mind's eye?",
      id: "Bayangkan berjalan di jalanan akrab atau rumah masa kecilmu. Bisakah kamu menavigasi belokan, fasad bangunan, dan trotoar dalam benakmu?",
      de: "Stellen Sie sich einen Spaziergang durch Ihr altes Viertel vor. Sehen Sie Hausecken, Fassaden und Gehwege bildhaft vor sich?",
      fr: "Imaginez marcher dans la rue de votre enfance. Pouvez-vous visualiser les façades des maisons et les détails du trottoir ?",
      es: "Imagina caminar por la calle de tu infancia. ¿Puedes visualizar con claridad las esquinas, fachadas y aceras en tu mente?",
    },
  },
  {
    id: 4,
    subscale: "visual_scene_vividness",
    text: {
      en: "When reading a descriptive fiction book, do scenes, fantasy kingdoms, or battles play out like a vivid movie on an internal screen behind your eyes?",
      id: "Saat membaca novel fiksi yang deskriptif, apakah adegan, kastil fantasi, atau pertempuran terputar seperti film nyata di layar benakmu?",
      de: "Wenn Sie einen Roman lesen, laufen Beschreibungen von Landschaften oder Schlachten wie ein bunter Film vor Ihrem inneren Auge ab?",
      fr: "En lisant un roman captivant, les paysages et batailles se déroulent-ils comme un véritable film sur un écran mental ?",
      es: "Al leer una novela descriptiva, ¿los escenarios y batallas se proyectan como una película vívida detrás de tus ojos?",
    },
  },

  // 2. Facial & Object Precision
  {
    id: 5,
    subscale: "facial_object_precision",
    text: {
      en: "Close your eyes and visualize a crisp red apple on a white plate. Can you see its curved shine, the stem, blemishes, and shadow?",
      id: "Tutup matamu dan bayangkan apel merah segar di piring putih. Bisakah kamu melihat kilau lengkungnya, tangkai, bintik kulitnya, dan bayangannya?",
      de: "Schließen Sie die Augen und visualisieren Sie einen roten Apfel auf einem weißen Teller. Sehen Sie Glanz, Stiel und Schatten?",
      fr: "Fermez les yeux et visualisez une pomme rouge sur une assiette blanche. Voyez-vous son reflet brillant, sa tige et son ombre ?",
      es: "Cierra los ojos y visualiza una manzana roja en un plato blanco. ¿Ves su brillo curvo, el tallo y la sombra proyectada?",
    },
  },
  {
    id: 6,
    subscale: "facial_object_precision",
    text: {
      en: "Picture the exact face of a loved one (partner, parent, or best friend). Can you clearly see their eyes, smile lines, hair texture, and skin tone?",
      id: "Bayangkan wajah seseorang yang kamu sayangi (pasangan, orang tua, sahabat). Bisakah kamu melihat jelas mata, garis senyum, dan tekstur rambutnya?",
      de: "Stellen Sie sich das Gesicht eines geliebten Menschen vor. Erkennen Sie Augen, Lachfalten, Haarfarbe und Hauttöne in klarem Bild?",
      fr: "Pensez au visage d'un être cher. Pouvez-vous voir distinctement ses yeux, les ridules de son sourire et la texture de ses cheveux ?",
      es: "Visualiza el rostro de un ser querido. ¿Puedes ver con total nitidez sus ojos, líneas de expresión y la textura de su cabello?",
    },
  },
  {
    id: 7,
    subscale: "facial_object_precision",
    text: {
      en: "Can you mentally rotate a 3D geometric object (like a Rubik's cube or pyramid) in your mind and inspect its different colored sides?",
      id: "Bisakah kamu memutar objek 3D secara mental (seperti kubus Rubik atau piramida) di kepalamu dan memeriksa sisi-sisi warnanya yang berbeda?",
      de: "Können Sie einen 3D-Körper (z.B. Zauberwürfel) im Kopf drehen und die farbigen Seiten aus verschiedenen Winkeln betrachten?",
      fr: "Pouvez-vous faire pivoter mentalement un objet 3D (comme un Rubik's Cube) et observer ses différentes faces colorées ?",
      es: "¿Puedes rotar mentalmente un objeto en 3D (como un cubo de Rubik) e inspeccionar sus caras de diferentes colores?",
    },
  },
  {
    id: 8,
    subscale: "facial_object_precision",
    text: {
      en: "Visualize a colorful bird in mid-flight. Can you distinguish the specific feather patterns, beak shape, and the motion of its flapping wings?",
      id: "Bayangkan seekor burung berwarna cerah sedang terbang. Bisakah kamu membedakan pola bulunya, bentuk paruh, dan kepakan sayapnya?",
      de: "Visualisieren Sie einen bunten Vogel im Flug. Erkennen Sie Gefiedermuster, Schnabelform und die flügelnde Bewegung bildgenau?",
      fr: "Visualisez un oiseau coloré en vol. Distinguez-vous le motif de ses plumes, la forme de son bec et le mouvement de ses ailes ?",
      es: "Visualiza un ave colorida en pleno vuelo. ¿Distingues el plumaje específico, el pico y el movimiento de sus alas?",
    },
  },

  // 3. Multisensory Inner Simulation
  {
    id: 9,
    subscale: "multisensory_inner_simulation",
    text: {
      en: "Can you replay a favorite song in your head with full acoustic fidelity—hearing the distinct instruments, bassline, and singer's exact vocal timbre?",
      id: "Bisakah kamu memutar lagu favorit di kepalamu dengan kejernihan akustik penuh—mendengar instrumen, bass, dan timbre vokal penyanyinya secara nyata?",
      de: "Können Sie einen Lieblingssong im Kopf mit vollem Klang abspielen – inklusive Basslinie, Instrumenten und Gesangsstimme?",
      fr: "Pouvez-vous rejouer une musique dans votre tête avec fidélité acoustique : entendre les instruments et le timbre exact du chanteur ?",
      es: "¿Puedes reproducir una canción en tu cabeza con total fidelidad acústica: distinguiendo bajo, instrumentos y la voz del cantante?",
    },
  },
  {
    id: 10,
    subscale: "multisensory_inner_simulation",
    text: {
      en: "When you imagine slicing a fresh lemon, can you almost taste the sharp sour acidity on your tongue or smell the citrus zest in your nostrils?",
      id: "Saat membayangkan mengiris lemon segar, bisakah kamu seolah mengecap rasa asam tajam di lidah atau mencium aroma sitrus di hidungmu?",
      de: "Wenn Sie sich vorstellen, eine Zitrone aufzuschneiden: Schmecken Sie fast die Säure auf der Zunge oder riechen die Schale?",
      fr: "En imaginant trancher un citron frais, pouvez-vous presque en goûter l'acidité sur votre langue ou en sentir le zeste ?",
      es: "Al imaginar cortar un limón fresco, ¿puedes casi saborear la acidez en la lengua u oler el aroma cítrico en tu nariz?",
    },
  },
  {
    id: 11,
    subscale: "multisensory_inner_simulation",
    text: {
      en: "When remembering past memories, do you re-experience them as sensory flashbacks (seeing the sunlight, feeling the breeze, hearing the laughter)?",
      id: "Saat mengingat kenangan masa lalu, apakah kamu mengalaminya kembali sebagai kilas balik sensorik (melihat sinar matahari, angin, tawa)?",
      de: "Erleben Sie vergangene Erinnerungen als sinnliche Zeitreise (Sonnenlicht sehen, Wind spüren, Stimmen hören)?",
      fr: "En vous remémorant un souvenir, le revivez-vous sensoriellement (revoir la lumière, sentir la brise, entendre les rires) ?",
      es: "Al recordar el pasado, ¿lo revives con riqueza sensorial (viendo la luz del sol, sintiendo el viento o escuchando risas)?",
    },
  },
  {
    id: 12,
    subscale: "multisensory_inner_simulation",
    text: {
      en: "When asked to 'picture something in your mind', does your brain immediately construct sensory imagery, or do you think solely in abstract facts and words?",
      id: "Ketika diminta 'membayangkan sesuatu', apakah otakmu langsung membentuk gambar visual, atau kamu murni berpikir lewat fakta dan konsep kata?",
      de: "Baut Ihr Gehirn bei der Aufforderung 'stell dir etwas vor' sofort Bilder auf, oder denken Sie rein in abstrakten Begriffen und Worten?",
      fr: "Quand on vous demande d'imaginer une chose, votre cerveau génère-t-il une image visuelle, ou pensez-vous uniquement en concepts abstraits ?",
      es: "Cuando te piden 'imaginar algo', ¿tu cerebro genera de inmediato una imagen visual, o piensas solo en conceptos abstractos y hechos?",
    },
  },
];

export const APHANTASIA_OPTIONS = [
  {
    value: 0,
    label: {
      en: "No Image at All (Pitch black / Purely conceptual fact-based thinking)",
      id: "Sama Sekali Tidak Ada Gambar (Gelap gulita / Berpikir murni lewat konsep dan fakta)",
      de: "Kein Bild (Völlig dunkel / Reines begriffliches, faktenbasiertes Denken)",
      fr: "Aucune image (Noir total / Pensée purement conceptuelle et factuelle)",
      es: "Sin imagen alguna (Negro total / Pensamiento puramente conceptual y lógico)",
    },
  },
  {
    value: 1,
    label: {
      en: "Dim & Fleeting (Vague silhouette, faint outline, lacks colors or stable form)",
      id: "Samar & Sekelebat (Siluet buram, garis samar tanpa warna atau bentuk stabil)",
      de: "Schwach & Flüchtig (Vage Umrisse, kaum Farbe, verblasst sofort wieder)",
      fr: "Faible & Fugace (Silhouette vague, contour flou, sans couleur stable)",
      es: "Tenue y fugaz (Silueta vaga, contorno borroso, sin color ni forma fija)",
    },
  },
  {
    value: 2,
    label: {
      en: "Moderately Clear (Recognizable shapes, identifiable colors, functional imagery)",
      id: "Cukup Jelas (Bentuk dapat dikenali, warna teridentifikasi, visualisasi fungsional)",
      de: "Mäßig klar (Erkennbare Formen, Farben vorhanden, funktionale Vorstellung)",
      fr: "Modérément clair (Formes identifiables, couleurs présentes, imagerie fonctionnelle)",
      es: "Moderadamente claro (Formas reconocibles, colores perceptibles, visualización útil)",
    },
  },
  {
    value: 3,
    label: {
      en: "Vivid & Photorealistic (Brilliant clarity, rich detail, almost as vivid as real vision)",
      id: "Sangat Jelas & Fotorealistik (Sangat tajam, detail kaya, hampir senyata melihat langsung)",
      de: "Lebhaft & Fotorealistisch (Brillante Klarheit, lebendige Farben, fast wie echte Sicht)",
      fr: "Vif & Photoréaliste (Clarté éclatante, détails riches, presque réel)",
      es: "Vívido y fotorrealista (Nitidez brillante, colores ricos, casi como verlo en la realidad)",
    },
  },
];

export const APHANTASIA_RESULTS: AphantasiaResultLevel[] = [
  {
    level: "total_aphantasia_blind_minds_eye",
    scoreRange: [0, 6],
    title: {
      en: "Total Aphantasia (The Blind Mind's Eye)",
      id: "Afantasia Total (Mata Batin Buta Visual)",
      de: "Totale Aphantasie (Das blinde innere Auge)",
      fr: "Aphantasie Totale (Cécité Mentale Visuelle)",
      es: "Afantasía Total (El Ojo Mental Ciego)",
    },
    badge: {
      en: "Complete Aphantasic (0% Visual)",
      id: "Afantasia Penuh (0% Visual)",
      de: "Vollständige Aphantasie",
      fr: "Aphantasique Complet",
      es: "Afantásico Completo",
    },
    summary: {
      en: "When you close your eyes to imagine something, your internal screen is completely pitch black. You do not experience visual images, colors, or mental shapes. Instead, your mind operates like a high-speed computer running pure semantic data, abstract concepts, spatial logic, and propositional knowledge.",
      id: "Saat kamu menutup mata untuk membayangkan sesuatu, layar pikiranmu gelap gulita tanpa gambar, warna, atau bentuk. Sebagai gantinya, otakmu memproses dunia lewat data semantik murni, konsep logis, dan penalaran faktual berkecepatan tinggi.",
      de: "Wenn Sie die Augen schließen, bleibt Ihr innerer Bildschirm vollkommen dunkel. Sie sehen keine Farben, Gesichter oder Landschaften. Ihr Gehirn denkt rein in Konzepten, Fakten, Worten und räumlichen Relationen – wie ein moderner Computer ohne Monitor.",
      fr: "Lorsque vous fermez les yeux pour imaginer, votre écran intérieur est noir complet. Vous ne visualisez aucune couleur ni forme. Votre esprit fonctionne sur un mode logique, sémantique et spatial d'une grande efficacité.",
      es: "Cuando cierras los ojos para imaginar, tu mente está en absoluta oscuridad. No ves colores ni rostros. Tu cerebro procesa la realidad a través de conceptos abstractos, lógica espacial y datos fácticos puros.",
    },
    psychology: {
      en: "Identified by Prof. Adam Zeman at the University of Exeter (2015). fMRI shows that the primary visual cortex (V1) is functional for optical vision, but fronto-parietal top-down feedback loops do not voluntarily reactivate sensory occipital areas. Aphantasics are remarkably resilient against visual trauma flashbacks (PTSD) and excel in analytical reasoning.",
      id: "Ditemukan oleh Prof. Adam Zeman (2015). Korteks visual bekerja normal saat melihat mata terbuka, tetapi otak tidak mengaktifkan kembali memori visual secara sukarela. Orang afantasia sangat tahan terhadap kilas balik trauma visual (PTSD) dan sangat unggul dalam logika analitis.",
      de: "Entdeckt von Prof. Adam Zeman (Universität Exeter). Die visuelle Großhirnrinde funktioniert normal bei offener Sicht, doch Top-down-Signale aus dem Frontalhirn aktivieren die Sehzentren nicht willkürlich. Ein großer evolutionärer Vorteil: Aphantasiker leiden selten unter visuellen PTSD-Flashbacks.",
      fr: "Modèle du Prof. Adam Zeman (Exeter, 2015). Le cortex visuel primaire ne se réactive pas de manière volontaire descendante. Les personnes aphantasiques sont particulièrement protégées contre les reviviscences traumatiques visuelles (SSPT).",
      es: "Modelo de Prof. Adam Zeman (2015). La corteza visual primaria no se reactiva voluntariamente en ausencia de estímulos externos. Los afantásicos muestran una notable protección natural frente a flashbacks traumáticos visuales.",
    },
    actionProtocol: {
      en: [
        "Embrace Semantic Thinking: Stop feeling 'defective'. Many world-class computer scientists, novelists, and mathematicians have total aphantasia.",
        "Externalize Visuals: Rely on diagrams, physical whiteboards, and photo references for design or art rather than trying to force internal imagery.",
        "Voice Journaling as Auditory Anchor: Use Nuju voice journaling to process narrative and conceptual thoughts where verbal clarity shines.",
      ],
      id: [
        "Rangkul Kekuatan Berpikir Semantik: Jangan merasa cacat; banyak programmer terbaik dunia, penulis fiksi, dan ilmuwan memiliki afantasia total.",
        "Gunakan Alat Visual Eksternal: Manfaatkan papan tulis, catatan sketsa, dan foto referensi untuk bekerja daripada memaksakan bayangan batin.",
        "Jurnal Suara di Nuju: Jadikan ruang suara Nuju sebagai jangkar pemrosesan narasi dan konsep logismu yang tajam.",
      ],
      de: [
        "Konzeptionelle Stärke anerkennen: Sie sind nicht mangelhaft; viele herausragende Software-Ingenieure und Autoren sind Aphantasiker.",
        "Visuelle Hilfsmittel nutzen: Whiteboards, Mindmaps und Skizzenblätter im Außen verwenden.",
        "Audio-Journaling in Nuju: Reflektieren Sie Ihre Gedanken auditiv im Nuju Sprachsanctuary.",
      ],
      fr: [
        "Valoriser votre mode de pensée sémantique : L'aphantasie libère de l'espace cognitif pour la logique et la résolution de problèmes.",
        "Externaliser les supports visuels : Utilisez des tableaux blancs, croquis et photos de référence.",
        "Journal vocal Nuju : Exprimez vos concepts et réflexions à voix haute dans l'application.",
      ],
      es: [
        "Reconocer tu fortaleza lógica: No es una discapacidad; muchos de los mejores ingenieros y escritores son afantásicos.",
        "Externalizar referencias visuales: Apóyate en bocetos, diagramas y notas visuales en tu entorno físico.",
        "Reflexión vocal en Nuju: Organiza tus ideas verbalmente en el santuario de voz.",
      ],
    },
  },
  {
    level: "hypophantasia_dim_silhouette",
    scoreRange: [7, 14],
    title: {
      en: "Hypophantasia (Dim Silhouettes & Faint Imagery)",
      id: "Hipofantasia (Siluet Redup & Visualisasi Samar)",
      de: "Hypophantasie (Schwache Umrisse & Flüchtige Bilder)",
      fr: "Hypophantasie (Silhouettes Faibles & Images Éphémères)",
      es: "Hipofantasía (Sombras Tenues e Imágenes Fugaces)",
    },
    badge: {
      en: "Hypophantasic (Low Imagery)",
      id: "Hipofantasia (Visual Rendah)",
      de: "Hypophantasie",
      fr: "Hypophantasique",
      es: "Hipofantasía",
    },
    summary: {
      en: "You have a faint, grainy, or fleeting 'mind's eye'. When trying to visualize, you catch momentary silhouettes, vague black-and-white forms, or transparent outlines that dissipate the moment you focus on them. You rely heavily on spatial awareness rather than rich pictures.",
      id: "Kamu memiliki mata batin yang samar dan berbintik redup. Kamu hanya melihat siluet sekelebat, garis hitam-putih transparan yang langsung pudar saat coba diamati. Kamu lebih mengandalkan intuisi spasial daripada gambar utuh.",
      de: "Ihre innere Bildwelt ist schemenhaft und flüchtig. Sie erhaschen für den Bruchteil einer Sekunde dunkle Silhouetten oder verwaschene Formen, die sofort wieder verschwinden.",
      fr: "Votre imagerie mentale est granuleuse ou fugace. Vous ne captez que de brèves silhouettes sans couleur stable, s'évanouissant dès que vous tentez de les fixer.",
      es: "Tu visualización mental es tenue y fragmentaria. Solo percibes siluetas fugaces en blanco y negro que desaparecen en cuanto intentas enfocarlas.",
    },
    psychology: {
      en: "Weak top-down neural recruitment between the fronto-parietal network and visual area V4 (color processing) and FFA (fusiform face area). Visual memory exists but struggles to sustain cognitive luminance.",
      id: "Konektivitas top-down yang lemah antara jaringan fronto-parietal dan area visual V4 (pemroses warna) serta FFA (pengenal wajah). Memori visual ada namun sulit mempertahankan kecerahan.",
      de: "Geringe Aktivierung des fusiformen Gesichtsareals (FFA) und der Farbzentren (V4) bei willkürlicher Imagination.",
      fr: "Faible recrutement neuronal des aires visuelles secondaires lors de la remémoration volontaire.",
      es: "Baja conectividad funcional entre el córtex frontal y las áreas occipitales encargadas del color y el reconocimiento facial.",
    },
    actionProtocol: {
      en: [
        "Spatial-Kinesthetic Priming: Touch textures or trace shapes in the air with your finger before closing your eyes to prime mental outlines.",
        "Image Streaming Practice: Describe whatever fleeting flash appears immediately into a voice recorder before it disappears.",
        "Voice Exploration in Nuju: Practice describing concepts aloud in Nuju to strengthen multimodal memory pathways.",
      ],
      id: [
        "Stimulasi Spasial-Kinestetik: Raba tekstur atau gambar garis di udara dengan jari sebelum menutup mata untuk memancing garis batin.",
        "Latihan 'Image Streaming': Ucapkan apa pun kilatan samar yang muncul langsung ke rekaman suara sebelum lenyap.",
        "Eksplorasi Suara di Nuju: Latih menjelaskan konsep secara lisan di Nuju untuk memperkuat jalur memori multimodal.",
      ],
      de: [
        "Haptische Vorbereitung: Formen mit den Fingern nachfahren, bevor Sie die Augen schließen.",
        "Image Streaming üben: Flüchtige Eindrücke sofort laut in Worte fassen.",
        "Stimme als Brücke in Nuju: Gedanken laut aussprechen, um Gedächtnispfade zu aktivieren.",
      ],
      fr: [
        "Amorçage kinesthésique : Tracez les formes dans l'espace avec vos doigts avant de fermer les yeux.",
        "Pratique du streaming mental : Décrivez instantanément les flashs perceptifs dès qu'ils surgissent.",
        "Sanctuaire vocal Nuju : Développez votre mémoire multimodale en formulant vos idées à haute voix.",
      ],
      es: [
        "Estimulación cinestésica: Dibuja las formas en el aire antes de cerrar los ojos para anclar los contornos.",
        "Técnica de Image Streaming: Narra en voz alta cualquier destello mental antes de que se disipe.",
        "Reflexión guiada en Nuju: Usa el diario de voz para conectar conceptos abstractos con palabras.",
      ],
    },
  },
  {
    level: "moderate_phantasic_visualization",
    scoreRange: [15, 22],
    title: {
      en: "Moderate Phantasia (Typical Human Mind's Eye)",
      id: "Fantasia Moderat (Mata Batin Rata-Rata)",
      de: "Moderate Phantasie (Durchschnittliche Vorstellungskraft)",
      fr: "Phantasie Modérée (Imagerie Mentale Typique)",
      es: "Fantasía Moderada (Visualización Humana Típica)",
    },
    badge: {
      en: "Standard Visualization",
      id: "Visualisasi Standar",
      de: "Typische Visualisierung",
      fr: "Visualisation Standard",
      es: "Visualización Estándar",
    },
    summary: {
      en: "You possess a healthy, typical human imagination. You can visualize rooms, familiar faces, and everyday objects with recognizable colors and contours. While not as crisp as high-definition cinema, your imagery is practical, flexible, and supportive of everyday navigation and memory.",
      id: "Kamu memiliki daya imajinasi manusia rata-rata yang sehat. Kamu bisa membayangkan ruangan, wajah orang dekat, dan benda sehari-hari dengan warna dan bentuk yang jelas.",
      de: "Sie verfügen über eine durchschnittliche, gesunde Vorstellungskraft. Sie können Gesichter, Zimmer und Gegenstände mit soliden Farben und Formen vor Ihrem geistigen Auge abrufen.",
      fr: "Vous possédez une imagerie mentale typique et équilibrée. Vous visualisez les visages familiers, les objets et les lieux avec des couleurs et contours reconnaissables.",
      es: "Posees una imaginación visual saludable y típica. Puedes evocar rostros conocidos, habitaciones y objetos con colores y formas funcionales.",
    },
    psychology: {
      en: "Standard baseline VVIQ scores. Balanced co-activation between sensory occipital cortex and executive parietal networks, allowing flexible cognitive control over mental representations.",
      id: "Skor dasar VVIQ standar. Aktivasi seimbang antara korteks oksipital sensorik dan jaringan parietal eksekutif.",
      de: "Ausgeglichene Aktivität zwischen visueller Rinde und parietalen Aufmerksamkeitsnetzwerken.",
      fr: "Activité équilibrée entre le cortex occipital sensoriel et les réseaux attentionnels pariétaux.",
      es: "Activación coordinada entre la corteza occipital visual y las redes frontoparietales de control cognitivo.",
    },
    actionProtocol: {
      en: [
        "Mindful Sensory Savoring: Spend 30 seconds consciously observing color contrasts in nature to enrich visual memory banks.",
        "Dual-Coding Integration: Combine visual sketching with written summaries when learning complex topics.",
        "Voice Mapping in Nuju: Verbalize both what you see and what you think into Nuju for balanced cognitive clarity.",
      ],
      id: [
        "Resapi Pengamatan Sadar: Luangkan waktu 30 detik mengamati gradasi warna di alam untuk memperkaya memori visual.",
        "Integrasi 'Dual-Coding': Gabungkan sketsa visual dengan catatan tertulis saat mempelajari hal baru.",
        "Pemetaan Suara di Nuju: Ungkapkan apa yang kamu lihat dan pikirkan di Nuju untuk kejernihan mental seimbang.",
      ],
      de: [
        "Achtsames Schauen: Details und Farbnuancen in der Natur bewusst betrachten.",
        "Duales Lernen: Skizzen mit Sprachnotizen kombinieren.",
        "Sprachreflexion in Nuju: Innere Vorstellungen im geschützten Audio-Journal sortieren.",
      ],
      fr: [
        "Observation attentive : Prenez le temps d'observer les contrastes visuels au quotidien.",
        "Double encodage : Associez schémas visuels et formulation verbale.",
        "Journal audio Nuju : Verbalisez vos pensées et représentations intérieures.",
      ],
      es: [
        "Observación consciente: Detente a contemplar luces y texturas para nutrir tu memoria visual.",
        "Doble codificación: Combina bocetos simples con reflexiones orales o escritas.",
        "Claridad vocal en Nuju: Narra tus proyectos en Nuju para alinear ideas e imágenes mentales.",
      ],
    },
  },
  {
    level: "vivid_multisensory_imagery",
    scoreRange: [23, 30],
    title: {
      en: "Vivid Multisensory Imagery (High-Definition Imagination)",
      id: "Imajinasi Multisensorik Tajam (Visual High-Definition)",
      de: "Lebhafte multisensorische Vorstellung (High-Definition)",
      fr: "Imagerie Multisensorielle Vive (Haute Définition)",
      es: "Imaginación Multisensorial Vívida (Alta Definición)",
    },
    badge: {
      en: "Vivid Visualizer",
      id: "Visualisator Tajam",
      de: "Lebhafte Vorstellung",
      fr: "Visualisation Riche",
      es: "Visualizador Vívido",
    },
    summary: {
      en: "Your mind's eye projects scenes in rich color, depth, and three-dimensional clarity. When you recall an event or read a book, the environment feels like a high-definition video. You can easily imagine sounds, textures, and spatial layouts with artistic precision.",
      id: "Mata batinmu memproyeksikan adegan dengan warna kaya, kedalaman ruang, dan kejernihan 3D. Saat membaca buku atau mengingat kenangan, gambaran muncul bak film HD yang hidup.",
      de: "Ihr inneres Auge erzeugt lebendige, farbintensive und detailreiche Szenarien. Beim Lesen läuft ein hochauflösender Film ab; Sie können Geräusche und Stimmungen mühelos innerlich nachempfinden.",
      fr: "Votre esprit projette des scènes en haute définition, riches en couleurs et en relief. La lecture d'un livre génère un film intérieur captivant et détaillé.",
      es: "Tu mente proyecta escenarios en alta definición, con colores vibrantes y profundidad tridimensional. Puedes evocar recuerdos casi como si volvieras a vivirlos.",
    },
    psychology: {
      en: "Elevated functional connectivity across visual areas V1-V4, the parahippocampal place area (PPA), and auditory temporal cortices. Enables superior spatial memory, architectural design capacity, and empathetic simulation.",
      id: "Konektivitas fungsional tinggi di area visual V1-V4, parahippocampal place area (PPA), dan korteks auditori. Menghasilkan ingatan spasial dan empati yang sangat kuat.",
      de: "Starke Vernetzung zwischen Sehrinde, Hippocampus und akustischen Arealen. Begünstigt kreative, räumliche und künstlerische Berufe.",
      fr: "Forte connectivité entre le cortex visuel, l'hippocampe et les aires temporales, facilitant la créativité et la conception spatiale.",
      es: "Alta conectividad entre la corteza occipital, el hipocampo y las áreas asociativas temporales, ideal para la creatividad artística.",
    },
    actionProtocol: {
      en: [
        "Harness for Creative Design: Channel your rich mental sandbox into writing, visual arts, architecture, or 3D prototyping.",
        "Guard Against Negative Catastrophizing: High visualizers can easily terrify themselves with vivid worst-case scenarios; actively switch mental channels.",
        "Voice Diary Journaling in Nuju: Dictate your rich mental imagery into Nuju's voice sanctuary to turn mental movies into tangible creative output.",
      ],
      id: [
        "Manfaatkan untuk Karya Kreatif: Salurkan imajinasi visualmu ke penulisan novel, desain, seni, atau arsitektur.",
        "Waspadai Katastrofisasi: Orang dengan visual tajam mudah cemas karena bisa memvisualisasikan skenario terburuk dengan sangat nyata; ganti saluran pikiran.",
        "Jurnal Suara di Nuju: Rekam bayangan ide dan visualmu ke Nuju untuk mengubah film batin menjadi karya nyata.",
      ],
      de: [
        "Kreativ nutzen: Ideal für Storytelling, Design, Architektur und visuelle Planung.",
        "Vor Katastrophenszenarien schützen: Lenken Sie die starke Bildkraft bei Angst aktiv auf neutrale Motive um.",
        "Audio-Notizen in Nuju: Halten Sie Ihre bildhaften Ideen im Sprachsanctuary fest.",
      ],
      fr: [
        "Canaliser dans la création : Exploitez cette richesse en écriture, design, architecture ou art.",
        "Attention aux scénarios anxiogènes : Ne laissez pas votre imagination visuelle dramatiser les peurs.",
        "Journal audio sur Nuju : Transformez vos projections intérieures en réalisations concrètes.",
      ],
      es: [
        "Canalizar en el arte o diseño: Aprovecha tu potente simulador mental para escribir, diseñar o crear.",
        "Evitar la catastrofización: No permitas que tu mente proyecte películas de terror sobre tus miedos.",
        "Desahogo creativo en Nuju: Graba tus visiones y proyectos en Nuju para darles forma.",
      ],
    },
  },
  {
    level: "hyperphantasia_cinematic_clarity",
    scoreRange: [31, 36],
    title: {
      en: "Hyperphantasia (Photorealistic Cinematic Mind)",
      id: "Hiperfantasia (Pikiran Sinematik Fotorealistik)",
      de: "Hyperphantasie (Fotorealistisches inneres Kino)",
      fr: "Hyperphantasie (Cinéma Mental Photoréaliste)",
      es: "Hiperfantasía (Cine Mental Fotorrealista)",
    },
    badge: {
      en: "Hyperphantasic (Top 2-3%)",
      id: "Hiperfantasia (2-3% Teratas)",
      de: "Hyperphantasie (Selten)",
      fr: "Hyperphantasique (Top 3%)",
      es: "Hiperfantásico (Top 3%)",
    },
    summary: {
      en: "Your imagination is indistinguishable from reality in sharpness, color saturation, lighting, and multisensory texture. You can virtually 'step inside' past memories or hypothetical worlds, rotate intricate machinery with microscopic precision, and experience music with synesthetic vividness.",
      id: "Daya imajinasimu hampir tak bisa dibedakan dari kenyataan dalam hal ketajaman, saturasi warna, pencahayaan, dan sensasi fisik. Kamu bisa seolah 'melangkah masuk' ke dalam kenangan, memutar mesin rumit secara presisi, dan merasakan musik bak pertunjukan nyata.",
      de: "Ihre geistige Welt steht dem echten Sehen in nichts nach. Sie können in Erinnerungen hineingehen, 3D-Modelle mikroskopisch genau drehen und innere Musik mit orchestraler Tiefe hören.",
      fr: "Votre imagination rivalise avec la réalité par sa netteté, son éclairage et sa richesse sensorielle. Vous pouvez littéralement vous immerger dans des mondes intérieurs photoréalistes.",
      es: "Tu mente genera imágenes con calidad hiperrealista, saturación de color y riqueza sensorial idéntica a la visión óptica. Puedes sumergirte por completo en recuerdos y mundos ficticios.",
    },
    psychology: {
      en: "Top 2-3% extreme high visual imagery trait (Prof. Adam Zeman). Exceptional hyper-synchrony between the prefrontal cortex, temporal lobes, and primary visual cortex V1. Can lead to involuntary daydream absorption or heightened vulnerability to visual intrusive thoughts if unchecked.",
      id: "Ciri langka 2-3% populasi (Prof. Adam Zeman). Sinkronisasi super antara korteks prefrontal, lobus temporal, dan korteks visual primer V1. Berisiko mengalami lamunan maladaptif jika tidak diarahkan.",
      de: "Seltene neuronale Höchstleistung des visuellen Kortex. Kann bei unregulierter Belastung zu Tagtraum-Verschmelzung oder quälenden optischen Flashbacks führen.",
      fr: "Condition rare (2 à 3 % de la population). Hyper-synchronisation des réseaux visuels et mnésiques, nécessitant une bonne gestion des pensées intrusives.",
      es: "Rasgo extraordinario presente en solo el 2-3% de la población. Hiperconectividad occipito-frontal que exige aprender a desconectar el simulador mental para descansar.",
    },
    actionProtocol: {
      en: [
        "Mental Off-Switch Routine: Practice grounding with real-world tactile sensations (cold water, barefoot walking) to pull yourself out of immersive inner paracosms.",
        "Elite Creative Output: Pursue professions that demand extraordinary spatial simulation—CGI animation, concept art, surgery, or complex engineering.",
        "Voice Grounding in Nuju: Anchor yourself in reality by speaking your stream of consciousness into Nuju's voice diary daily.",
      ],
      id: [
        "Rutinitas 'Saklar Mati' Mental: Latih grounding dengan sensasi nyata (air dingin, jalan tanpa alas kaki) agar tidak tersedot terlalu dalam ke dunia batin.",
        "Karier Visual Elite: Sangat cocok untuk animasi 3D, concept art, bedah medis, arsitektur, atau sutradara film.",
        "Jangkar Suara di Nuju: Seimbangkan sinematik kepalamu dengan berbicara jujur di jurnal suara Nuju agar tetap berpijak di dunia nyata.",
      ],
      de: [
        "Erdungs-Rituale: Kaltes Wasser, Barfußgehen zur Rückkehr in die physische Realität nutzen.",
        "Spitzenkreativität nutzen: Perfekt für Regie, 3D-Design, Chirurgie oder Erfindertum.",
        "Sprachanker in Nuju: Nutzen Sie Nuju als akustischen Anker in der realen Welt.",
      ],
      fr: [
        "Protocoles d'ancrage : Utilisez le contact direct avec la matière pour quitter les rêveries immersives.",
        "Excellence créative : Domaines idéaux : réalisation de films, modélisation 3D, chirurgie ou écriture.",
        "Ancrage vocal Nuju : Déposez vos flux d'images dans le sanctuaire audio pour garder les pieds sur terre.",
      ],
      es: [
        "Ritual de desconexión: Practica anclajes físicos (caminar descalzo, agua fría) para salir del cine mental.",
        "Carreras de alta simulación: Ideal para animación 3D, dirección de cine, arquitectura o cirugía.",
        "Anclaje vocal en Nuju: Graba tus reflexiones en Nuju para mantener un puente constante con la realidad.",
      ],
    },
  },
];

export const APHANTASIA_SUBSCALE_INFO = {
  visual_scene_vividness: {
    name: {
      en: "Visual Scene Vividness",
      id: "Kejelasan Pemandangan Visual",
      de: "Lebhaftigkeit von Szenen & Landschaften",
      fr: "Netteté des Scènes & Paysages",
      es: "Nitidez de Escenas y Paisajes",
    },
    description: {
      en: "Ability to project landscapes, horizons, rooms, lighting conditions, and environment details on an internal mental screen.",
      id: "Kemampuan memproyeksikan lanskap, horizon, ruangan, pencahayaan, dan detail lingkungan di layar mental batin.",
      de: "Fähigkeit, Horizonte, Räume, Lichtreflexe und Umgebungen vor dem geistigen Auge aufzubauen.",
      fr: "Capacité à projeter des paysages, des pièces et des effets de lumière sur son écran mental.",
      es: "Capacidad de proyectar paisajes, habitaciones, luces y detalles espaciales en la mente.",
    },
  },
  facial_object_precision: {
    name: {
      en: "Facial & Object Precision",
      id: "Presisi Wajah & Objek 3D",
      de: "Präzision von Gesichtern & 3D-Objekten",
      fr: "Précision des Visages & Objets 3D",
      es: "Precisión de Rostros y Objetos 3D",
    },
    description: {
      en: "Clarity in visualizing specific faces of loved ones, colors, textures, shadows, and mentally rotating 3D objects.",
      id: "Kejelasan memvisualisasikan wajah orang tercinta, warna, tekstur, bayangan, dan memutar objek 3D di benak.",
      de: "Exaktheit beim Abrufen vertrauter Gesichter, Farbnuancen und räumlicher Objektdrehung.",
      fr: "Clarté dans l'évocation des visages des proches, des textures et la rotation mentale d'objets 3D.",
      es: "Claridad al evocar rostros de seres queridos, texturas, sombras y rotar objetos en 3D.",
    },
  },
  multisensory_inner_simulation: {
    name: {
      en: "Multisensory Inner Simulation",
      id: "Simulasi Sensorik Batin (Audio & Rasa)",
      de: "Multisensorische innere Simulation",
      fr: "Simulation Sensorielle Interne (Son & Goût)",
      es: "Simulación Sensorial Interna (Audio y Gusto)",
    },
    description: {
      en: "Capacity to mentally hear musical arrangements, imagine taste and scent, and experience memory with sensory richness.",
      id: "Kemampuan memutar musik dalam kepala secara akustik, membayangkan rasa/aroma, dan mengenang masa lalu secara sensorik.",
      de: "Fähigkeit, Melodien innerlich zu hören, Geschmäcker abzurufen und Erinnerungen sinnlich zu durchleben.",
      fr: "Capacité à entendre fidèlement la musique dans sa tête, imaginer des goûts et revivre les souvenirs.",
      es: "Capacidad de reproducir música en la mente, recrear sabores u olores y revivir recuerdos con riqueza sensorial.",
    },
  },
};

export function getAphantasiaResult(totalScore: number): AphantasiaResultLevel {
  const clamped = Math.max(0, Math.min(36, totalScore));
  return (
    APHANTASIA_RESULTS.find(
      (r) => clamped >= r.scoreRange[0] && clamped <= r.scoreRange[1]
    ) || APHANTASIA_RESULTS[0]
  );
}

export function calculateAphantasiaSubscales(answers: Record<number, number>): {
  visual_scene_vividness: number;
  facial_object_precision: number;
  multisensory_inner_simulation: number;
} {
  let vsv = 0;
  let fop = 0;
  let mis = 0;

  APHANTASIA_QUESTIONS.forEach((q) => {
    const score = answers[q.id] ?? 0;
    if (q.subscale === "visual_scene_vividness") vsv += score;
    if (q.subscale === "facial_object_precision") fop += score;
    if (q.subscale === "multisensory_inner_simulation") mis += score;
  });

  return {
    visual_scene_vividness: vsv,
    facial_object_precision: fop,
    multisensory_inner_simulation: mis,
  };
}
