export type AcrophobiaCardLang = "en" | "id" | "de" | "fr" | "es";

export interface AcrophobiaQuestion {
  id: number;
  subscale:
    | "visual_height_intolerance_vertigo"
    | "catastrophic_fall_impulse_anxiety"
    | "anticipatory_elevation_avoidance";
  text: Record<AcrophobiaCardLang, string>;
}

export interface AcrophobiaResultLevel {
  level:
    | "grounded_altitude_confidence"
    | "mild_situational_height_caution"
    | "moderate_visual_height_intolerance"
    | "high_clinical_acrophobia_aq"
    | "severe_paralyzing_altitude_terror";
  scoreRange: [number, number];
  title: Record<AcrophobiaCardLang, string>;
  badge: Record<AcrophobiaCardLang, string>;
  summary: Record<AcrophobiaCardLang, string>;
  psychology: Record<AcrophobiaCardLang, string>;
  actionProtocol: Record<AcrophobiaCardLang, string[]>;
}

export const ACROPHOBIA_QUESTIONS: AcrophobiaQuestion[] = [
  // 1. Visual Height Intolerance & Postural Vertigo
  {
    id: 1,
    subscale: "visual_height_intolerance_vertigo",
    text: {
      en: "Looking down from high balconies, pedestrian overpasses, or multi-story atriums triggers sudden postural instability, spinning dizziness, and rubbery knees.",
      id: "Melihat ke bawah dari balkon lantai tinggi, jembatan penyeberangan, atau atrium mall memicu sensasi melayang, pusing vertigo, dan lutut lemas seketika.",
      de: "Der Blick von hohen Balkonen, Brücken oder offenen Galerien nach unten löst sofortige Standunsicherheit, Schwindel und weiche Knie aus.",
      fr: "Regarder en bas depuis un balcon élevé, une passerelle ou une mezzanine déclenche une instabilité posturale brutale et des jambes en coton.",
      es: "Mirar hacia abajo desde balcones altos, pasarelas o barandillas elevadas te provoca inestabilidad postural, mareo repentino y piernas temblorosas.",
    },
  },
  // 2. Catastrophic Fall & Impulse Anxiety
  {
    id: 2,
    subscale: "catastrophic_fall_impulse_anxiety",
    text: {
      en: "Near high edges or glass windows, your mind catastrophizes that the barrier will snap, or you experience intrusive dread of losing balance and plunging over.",
      id: "Di dekat tepi ketinggian atau dinding kaca, pikiranmu dipenuhi skenario horor pembatas akan patah, atau takut kehilangan kendali diri lalu jatuh ke bawah.",
      de: "In der Nähe von Geländern oder Glasfassaden befürchten Sie panisch, dass die Absicherung nachgibt oder Sie das Gleichgewicht verlieren und stürzen.",
      fr: "Près du vide, vous êtes hanté par l'idée que la barrière cède ou vous ressentez la peur panique de perdre l'équilibre et de basculer.",
      es: "Cerca de bordes altos o barandillas, temes con angustia que la estructura colapse o sientes el pánico irracional de perder el equilibrio y caer.",
    },
  },
  // 3. Anticipatory Elevation Avoidance
  {
    id: 3,
    subscale: "anticipatory_elevation_avoidance",
    text: {
      en: "You avoid glass elevators, outdoor observation decks, high scenic viewpoints, or step-ladders whenever possible to prevent acute panic.",
      id: "Kamu sebisa mungkin menghindari lift transparan, dek observasi gedung tinggi, jembatan gantung, atau menaiki tangga lipat demi mencegah kepanikan.",
      de: "Sie meiden gläserne Panoramaaufzüge, Aussichtsplattformen, Hängebrücken oder Haushaltsleitern konsequent, um Panik zu verhindern.",
      fr: "Vous évitez autant que possible les ascenseurs panoramiques, belvédères, ponts suspendus ou escabeaux par peur de la panique.",
      es: "Evitas a toda costa ascensores de cristal, miradores elevados, puentes colgantes o escaleras de mano para esquivar el pánico.",
    },
  },
  // 4. Visual Height Intolerance & Postural Vertigo
  {
    id: 4,
    subscale: "visual_height_intolerance_vertigo",
    text: {
      en: "When standing near a high drop-off, you feel an overwhelming physical instinct to drop to your knees, crouch down, or cling tightly to a solid wall or railing.",
      id: "Saat berdiri di dekat ketinggian, kamu merasakan dorongan fisik yang kuat untuk jongkok, merangkak, atau mencengkeram dinding/pegangan erat-erat.",
      de: "In der Höhe spüren Sie den reflexartigen Drang, in die Knie zu gehen, sich am Boden festzuklammern oder Geländer mit beiden Händen zu umklammern.",
      fr: "Face au vide, vous ressentez le besoin irrépressible de vous accroupir, de vous asseoir au sol ou de vous cramponner de toutes vos forces.",
      es: "Estando en una altura, sientes el impulso automático de agacharte, sentarte en el suelo o aferrarte desesperadamente a la barandilla.",
    },
  },
  // 5. Catastrophic Fall & Impulse Anxiety
  {
    id: 5,
    subscale: "catastrophic_fall_impulse_anxiety",
    text: {
      en: "You experience the chilling phenomenon known as 'The Call of the Void' (l'appel du vide)—an inexplicable intrusive urge or fear that you might suddenly jump.",
      id: "Kamu pernah merasakan fenomena 'Call of the Void' (*l'appel du vide*)—dorongan atau ketakutan aneh yang tiba-tiba melintas bahwa kamu bisa saja melompat.",
      de: "Sie erleben den 'Drang des Abgrunds' (L'appel du vide) – den beunruhigenden Gedanken oder Impuls, unvermittelt in die Tiefe springen zu können.",
      fr: "Vous ressentez 'l'appel du vide' – cette pensée intrusive troublante et angoissante que vous pourriez soudainement sauter sans raison.",
      es: "Experimentas la llamada del vacío ('l'appel du vide'): un pensamiento intrusivo inquietante de que podrías saltar de forma inexplicable.",
    },
  },
  // 6. Anticipatory Elevation Avoidance
  {
    id: 6,
    subscale: "anticipatory_elevation_avoidance",
    text: {
      en: "When booking hotels or apartments, you insist on staying on lower floors (1st to 3rd floor) because high balconies cause intolerable anxiety.",
      id: "Saat memesan kamar hotel atau apartemen, kamu meminta lantai rendah (lantai 1–3) karena balkon lantai tinggi memicu kecemasan yang tak tertahankan.",
      de: "Beim Buchen von Hotels oder Wohnungen bestehen Sie auf niedrige Stockwerke, da hohe Balkone für Sie unerträgliche Beklemmung bedeuten.",
      fr: "Lorsque vous réservez un hôtel, vous exigez les étages inférieurs car les balcons en hauteur vous sont insupportables.",
      es: "Al reservar hoteles o pisos, exiges plantas bajas (1º a 3º) porque los balcones a gran altura te provocan una ansiedad insoportable.",
    },
  },
  // 7. Visual Height Intolerance & Postural Vertigo
  {
    id: 7,
    subscale: "visual_height_intolerance_vertigo",
    text: {
      en: "Even looking at photos, drone videos, or cinema scenes shot from high cliffs or skyscrapers triggers physical stomach drops and sweaty palms.",
      id: "Bahkan hanya melihat foto, video drone, atau adegan film dari gedung pencakar langit memicu sensasi perut mual dan telapak tangan berkeringat dingin.",
      de: "Schon der Anblick von Drohnenvideos oder Filmszenen aus großer Höhe erzeugt bei Ihnen feuchte Hände und ein flaues Gefühl im Magen.",
      fr: "La simple vue de photos ou vidéos aériennes prises depuis des gratte-ciels vous donne des sueurs froides et un serrement au ventre.",
      es: "El mero hecho de ver vídeos o fotos de drones desde precipicios o rascacielos te eriza la piel y te hace sudar las manos.",
    },
  },
  // 8. Catastrophic Fall & Impulse Anxiety
  {
    id: 8,
    subscale: "catastrophic_fall_impulse_anxiety",
    text: {
      en: "You experience panic that wind gusts, unexpected jostling from pedestrians, or sudden muscle spasms will catapult you over the edge.",
      id: "Kamu panik membayangkan hembusan angin kencang, senggolan orang yang lewat, atau kram otot tiba-tiba akan melemparmu melewati pagar pembatas.",
      de: "Sie befürchten panisch, dass ein Windstoß, ein versehentliches Anrempeln oder ein Wadenkrampf Sie über den Abgrund stürzen lässt.",
      fr: "Vous redoutez qu'un coup de vent soudain, une bousculade fortuite ou un faux pas ne vous fasse basculer par-dessus la rambarde.",
      es: "Temes con angustia que una ráfaga de viento, un tropezón o un empujón accidental te precipiten al vacío sin remedio.",
    },
  },
  // 9. Anticipatory Elevation Avoidance
  {
    id: 9,
    subscale: "anticipatory_elevation_avoidance",
    text: {
      en: "Driving across high bridges, mountain cliff roads, or multi-level flyovers produces white-knuckle terror and urges to pull over.",
      id: "Mengemudi di atas jembatan layang yang tinggi, jalan tebing pegunungan, atau flyover memicu kepanikan mencengkeram setir dan ingin segera menepi.",
      de: "Das Befahren von Hochbrücken, Passstraßen oder Stelzenautobahnen erzeugt Panik, Schweißausbrüche und den Drang anzuhalten.",
      fr: "Conduire sur de hauts ponts ou des routes de montagne escarpées vous pétrifie et vous donne envie de vous arrêter immédiatement.",
      es: "Conducir sobre viaductos altos o carreteras de montaña con precipicio te hace apretar el volante con pánico y desear detenerte.",
    },
  },
  // 10. Visual Height Intolerance & Postural Vertigo
  {
    id: 10,
    subscale: "visual_height_intolerance_vertigo",
    text: {
      en: "Walking on see-through metal grates, glass skywalks, or open-tread staircases triggers acute paralysis and heart-racing panic.",
      id: "Berjalan di atas jembatan kaca transparan, tangga berongga, atau jeruji besi ketinggian memicu kelumpuhan gerak dan jantung berdegup kencang.",
      de: "Das Begehen von Glasbrücken, Gitterrosten oder offenen Treppenstufen löst bei Ihnen Schockstarre und Herzrasen aus.",
      fr: "Marcher sur des passerelles en verre transparent ou des escaliers ajourés provoque une tétanie immédiate et des palpitations.",
      es: "Caminar sobre suelos de cristal transparente, rejillas metálicas o escaleras abiertas te paraliza de espanto con taquicardia.",
    },
  },
  // 11. Catastrophic Fall & Impulse Anxiety
  {
    id: 11,
    subscale: "catastrophic_fall_impulse_anxiety",
    text: {
      en: "Watching family members, partners, or children stand near balcony railings triggers intense, visceral panic that they will suddenly fall.",
      id: "Melihat pasangan, teman, atau anak-anak berdiri di dekat pagar balkon memicu kepanikan luar biasa bahwa mereka akan jatuh sewaktu-waktu.",
      de: "Wenn nahestehende Personen oder Kinder an Geländern stehen, überkommt Sie panische Angst, sie könnten jeden Moment abstürzen.",
      fr: "Voir des proches ou des enfants s'approcher d'un garde-corps déclenche en vous une angoisse viscérale et le besoin de les agripper.",
      es: "Ver a familiares o niños cerca de una barandilla alta te desata un terror visceral de que caigan al vacío en cualquier instante.",
    },
  },
  // 12. Anticipatory Elevation Avoidance
  {
    id: 12,
    subscale: "anticipatory_elevation_avoidance",
    text: {
      en: "Fear of heights has caused you to decline rooftop parties, scenic hiking trails, ski chairlifts, monument climbs, or rollercoasters.",
      id: "Rasa takut ketinggian telah membuatmu menolak pesta di *rooftop*, pendakian gunung, kereta gantung (*cable car*), atau wahana *rollercoaster*.",
      de: "Höhenangst hat Sie dazu gebracht, Rooftop-Partys, Bergwanderungen, Seilbahnen oder Aussichtstürme konsequent abzusagen.",
      fr: "Votre peur du vide vous a poussé à renoncer à des soirées sur des toits, des randonnées panoramiques, des téléphériques ou des attractions.",
      es: "El miedo a las alturas te ha hecho rechazar eventos en azoteas, rutas de senderismo, teleféricos o miradores emblemáticos.",
    },
  },
];

export const ACROPHOBIA_OPTIONS = [
  {
    value: 0,
    label: {
      en: "Never / No anxiety (0)",
      id: "Tidak pernah / Tenang (0)",
      de: "Nie / Keine Angst (0)",
      fr: "Jamais / Aucune angoisse (0)",
      es: "Nunca / Sin ansiedad (0)",
    },
  },
  {
    value: 1,
    label: {
      en: "Rarely / Mild unease (1)",
      id: "Jarang / Sedikit waswas (1)",
      de: "Selten / Leichte Nervosität (1)",
      fr: "Rarement / Légère gêne (1)",
      es: "Rara vez / Leve inquietud (1)",
    },
  },
  {
    value: 2,
    label: {
      en: "Frequently / Noticeable distress (2)",
      id: "Sering / Sangat cemas & menghindar (2)",
      de: "Häufig / Deutliche Panik & Vermeidung (2)",
      fr: "Fréquemment / Détresse & évitement net (2)",
      es: "Frecuentemente / Ansiedad clara y evitación (2)",
    },
  },
  {
    value: 3,
    label: {
      en: "Always / Severe paralysis & terror (3)",
      id: "Selalu / Teror ekstrem & panik lumpuh (3)",
      de: "Immer / Lähmende Panik & Todesangst (3)",
      fr: "Toujours / Terreur tétanisante absolue (3)",
      es: "Siempre / Pánico paralizante extremo (3)",
    },
  },
];

export const ACROPHOBIA_RESULT_LEVELS: AcrophobiaResultLevel[] = [
  {
    level: "grounded_altitude_confidence",
    scoreRange: [0, 7],
    title: {
      en: "Grounded Altitude Confidence",
      id: "Keyakinan Ketinggian Stabil & Tenang (Adaptif)",
      de: "Souveräne Höhensicherheit",
      fr: "Assurance & Sérénité en Hauteur",
      es: "Confianza y Aplomo en Altura",
    },
    badge: {
      en: "Minimal Acrophobic Sensitivity",
      id: "Sensitivitas Akrofobia Minimal",
      de: "Minimale Höhenintoleranz",
      fr: "Sensibilité au Vertige Minimale",
      es: "Sensibilidad al Vértigo Mínima",
    },
    summary: {
      en: "You possess robust visual-vestibular integration. Looking down from balconies, glass elevators, suspension bridges, or mountains produces little to no postural vertigo or panic.",
      id: "Kamu memiliki integrasi sistem visual-vestibular yang kokoh. Melihat ke bawah dari balkon tinggi, lift kaca, atau pegunungan tidak memicu vertigo atau panik.",
      de: "Ihr Gleichgewichtssystem arbeitet stabil. Ausblicke von Hochhäusern, Brücken oder Klippen lösen bei Ihnen kein relevantes Schwindelgefühl aus.",
      fr: "Votre système vestibulaire et visuel est parfaitement équilibré. Regarder le vide depuis un belvédère ou un pont ne suscite aucune panique.",
      es: "Tu equilibrio visual-vestibular es excelente. Mirar hacia abajo desde rascacielos o puentes no te provoca vértigo ni alarma corporal.",
    },
    psychology: {
      en: "Your neurological balance centers (cerebellum and vestibular nuclei) correctly weight somatosensory and proprioceptive signals without relying excessively on distant ground vision for postural stability.",
      id: "Pusat keseimbangan sarafmu (serebelum dan inti vestibular) memproses sinyal proprioseptif tubuh dengan akurat tanpa bergantung berlebihan pada ilusi visual dasar tanah.",
      de: "Ihr Kleinhirn gleicht Höhenreize fehlerfrei ab, sodass keine Diskrepanz zwischen optischem Tiefenreiz und körperlicher Lage entsteht.",
      fr: "Votre système nerveux central pondère correctement les signaux proprioceptifs sans se laisser troubler par la distance visuelle du sol.",
      es: "Tu cerebro procesa la propiocepción con precisión sin sobredepender de referencias visuales lejanas para mantener el equilibrio.",
    },
    actionProtocol: {
      en: [
        "Continue enjoying panoramic views, mountain trails, and outdoor elevation sports.",
        "Be patient and supportive when hiking or traveling with companions who suffer from height vertigo.",
        "Use Nuju's voice journal for reflective decompression after exhilarating high-altitude adventures.",
      ],
      id: [
        "Pertahankan kenyamanan menikmati pemandangan alam tinggi dan wisata gedung pencakar langit.",
        "Berikan dukungan empati jika bepergian bersama kerabat yang mengalami fobia ketinggian.",
        "Manfaatkan jurnal suara Nuju untuk merekam rasa kagum setelah berpetualang di ketinggian.",
      ],
      de: [
        "Genießen Sie weiterhin Panoramablicke und Bergwanderungen ohne Einschränkungen.",
        "Begleiten Sie ängstliche Reisegefährten mit Ruhe und Verständnis in Höhenlagen.",
        "Nutzen Sie Nuju Voice Journaling für entspannte Reflexionen nach Reisen.",
      ],
      fr: [
        "Profitez sereinement des points de vue panoramiques et des randonnées d'altitude.",
        "Faites preuve de bienveillance envers vos proches sujets au vertige en voyage.",
        "Enregistrez vos émotions sur Nuju après des excursions en pleine nature.",
      ],
      es: [
        "Sigue disfrutando de miradores elevados y senderismo de montaña con libertad.",
        "Acompaña con calma y empatía a personas con miedo al vacío en tus viajes.",
        "Usa las notas de voz de Nuju para procesar tus experiencias en la naturaleza.",
      ],
    },
  },
  {
    level: "mild_situational_height_caution",
    scoreRange: [8, 14],
    title: {
      en: "Mild Situational Height Caution",
      id: "Kehati-hatian Ketinggian Situasional Ringan",
      de: "Leichte situative Höhenvorsicht",
      fr: "Prudence Situationnelle en Hauteur",
      es: "Cautela Situacional ante la Altura",
    },
    badge: {
      en: "Mild Visual Height Sensitivity",
      id: "Sensitivitas Ketinggian Ringan",
      de: "Leichte visuelle Höhenintoleranz",
      fr: "Sensibilité Légère au Vide",
      es: "Sensibilidad Leve a la Altura",
    },
    summary: {
      en: "You experience normal, evolutionary caution near open drops, sheer cliffs, or unstable ladders. Mild butterflies or heart flutters occur, but you remain functionally in control.",
      id: "Kamu merasakan kehati-hatian naluriah yang wajar di dekat tebing curam atau tangga lipat. Ada sedikit rasa waswas di perut, namun kamu tetap memegang kendali penuh.",
      de: "Sie spüren eine gesunde evolutionäre Vorsicht an ungesicherten Abhängen. Leichtes Bauchkribbeln ist spürbar, schränkt Ihren Alltag jedoch kaum ein.",
      fr: "Vous ressentez une appréhension normale face aux précipices non sécurisés, sans que cela n'entrave vos activités ou vos déplacements.",
      es: "Sientes una prudencia biológica natural al asomarte a precipicios. Notas un leve nudo en el estómago pero mantienes la calma funcional.",
    },
    psychology: {
      en: "This reflects functional physiological height awareness. The brain activates transient sympathetic alertness to ensure safe footing without collapsing into catastrophic avoidance.",
      id: "Ini mencerminkan kesadaran ketinggian fisiologis yang sehat. Otak menyalakan kewaspadaan simpatis sesaat demi menjaga langkah kaki tetap aman tanpa memicu fobia.",
      de: "Die Alarmierung dient dem evolutionären Schutz vor Stürzen, ohne in pathologische Vermeidungsreaktionen umzuschlagen.",
      fr: "Cette vigilance transitoire protège le corps des chutes sans déclencher d'affolement irrationnel.",
      es: "Es una alerta adaptativa que previene caídas accidentales sin convertirse en fobia limitante.",
    },
    actionProtocol: {
      en: [
        "Fix your gaze on the horizon line rather than looking straight down into the abyss.",
        "Maintain contact with stable surfaces (touching a railing lightly with fingertips).",
        "Take slow, grounding diaphragmatic breaths if you feel sudden stomach flutter.",
      ],
      id: [
        "Arahkan pandangan ke garis cakrawala di kejauhan daripada menatap lurus ke jurang bawah.",
        "Sentuh pegangan pagar dengan lembut untuk memberi sinyal kestabilan fisik ke otak.",
        "Tarik napas diafragma perlahan jika perut terasa melayang di tempat tinggi.",
      ],
      de: [
        "Richten Sie den Blick auf die Horizontlinie statt senkrecht nach unten in die Tiefe.",
        "Halten Sie leichten Tastkontakt zu einem Geländer für zusätzliche propriozeptive Sicherheit.",
        "Nutzen Sie langsame Bauchatmung gegen das Kribbeln im Magen.",
      ],
      fr: [
        "Fixez la ligne d'horizon plutôt que de regarder directement à la verticale du vide.",
        "Posez simplement une main sur la rambarde pour rassurer votre système vestibulaire.",
        "Respirez calmement par le ventre pour dissiper la sensation de vertige passager.",
      ],
      es: [
        "Mira hacia el horizonte lejano en lugar de mirar en vertical hacia el fondo del abismo.",
        "Apoya ligeramente una mano en la barandilla para afianzar la propiocepción.",
        "Haz respiraciones lentas si notas el cosquilleo característico en el estómago.",
      ],
    },
  },
  {
    level: "moderate_visual_height_intolerance",
    scoreRange: [15, 22],
    title: {
      en: "Moderate Visual Height Intolerance",
      id: "Intoleransi Ketinggian Visual Moderat",
      de: "Moderate visuelle Höhenintoleranz",
      fr: "Intolérance Visuelle au Vide Modérée",
      es: "Intolerancia Visual a la Altura Moderada",
    },
    badge: {
      en: "Moderate Acrophobia (AQ)",
      id: "Skor Akrofobia Moderat",
      de: "Moderat erhöhter AQ-Score",
      fr: "Indice AQ Modéré",
      es: "Nivel AQ Moderado",
    },
    summary: {
      en: "Heights noticeably distress you. You avoid transparent elevators, steep observation decks, footbridges, and climbing ladders. Near edges, you feel compelling urges to crouch or retreat.",
      id: "Ketinggian membuatmu sangat tidak nyaman. Kamu menghindari lift kaca, lantai dek observasi transparan, jembatan penyeberangan tipis, dan menaiki tangga. Di dekat pagar, kamu ingin segera mundur atau jongkok.",
      de: "Höhen belasten Sie spürbar. Glasaufzüge, Aussichtstürme und Hängebrücken werden gemieden. In Randnähe möchten Sie sich am liebsten ducken oder weggehen.",
      fr: "Le vide vous perturbe visiblement. Vous évitez les passerelles, ascenseurs en verre et escabeaux, avec l'envie immédiate de vous reculer.",
      es: "Las alturas te generan un malestar evidente. Evitas miradores de cristal, puentes elevados y escaleras altas, sintiendo la necesidad de apartarte del borde.",
    },
    psychology: {
      en: "Brandt & Daroff's Visual Height Intolerance model shows visual-vestibular mismatch: when distance to the ground exceeds 3 meters, visual sway cues become unreliable, triggering postural ataxia and adrenaline spikes.",
      id: "Model Visual Height Intolerance Brandt & Daroff menjelaskan disonansi visual-vestibular: ketika jarak ke tanah melebihi 3 meter, petunjuk visual goyang memicu ketidakseimbangan gerak dan lonjakan adrenalin.",
      de: "Das Gehirn verliert in großer Höhe seine optischen Nah-Referenzen zur Haltungsstabilisierung, was zu Schein-Schwankungen und Angstschüben führt.",
      fr: "La distance visuelle du sol perturbe les repères d'équilibre du cerveau, créant une illusion d'instabilité motrice et une décharge de panique.",
      es: "La lejanía visual del suelo priva al sistema postural de referencias estables, generando falsa sensación de balanceo y sobresalto autonómico.",
    },
    actionProtocol: {
      en: [
        "Practice graded visual exposure: spend 3 minutes looking through a high window while standing tall.",
        "Resist the immediate urge to crouch or crawl; plant both feet flat and feel the floor's solidity.",
        "Decompress height-triggered panic by whispering your experience into Nuju's voice journal.",
      ],
      id: [
        "Latih paparan visual bertahap: berdirilah tegak menatap ke luar jendela lantai 3 selama 3 menit.",
        "Tahan dorongan untuk langsung jongkok; rasakan pijakan kedua kaki yang kokoh di atas lantai.",
        "Redakan kepanikan ketinggian dengan meluapkan perasaan ke jurnal suara Nuju.",
      ],
      de: [
        "Üben Sie gestufte visuelle Konfrontation an sicheren Fenstern im 2. oder 3. Stockwerk.",
        "Widerstehen Sie dem Fluchtimpuls, in die Hocke zu gehen; spüren Sie den festen Untergrund.",
        "Sprechen Sie Ihre Höhenangst im Nuju Voice Journal aus, um die Anspannung abzubauen.",
      ],
      fr: [
        "Entraînez-vous à regarder par une fenêtre au 2e ou 3e étage en vous tenant bien droit pendant 3 minutes.",
        "Résistez à l'envie de vous accroupir ; ancrez fermement vos deux pieds dans le sol.",
        "Déposez vos angoisses sur le journal vocal Nuju pour désamorcer l'adrénaline.",
      ],
      es: [
        "Practica exposición visual progresiva: mantén la mirada desde una ventana alta durante 3 minutos de pie.",
        "Resiste el impulso de agacharte; siente la solidez del suelo bajo tus pies.",
        "Desahoga la tensión del vértigo grabando tus sensaciones en el diario de voz Nuju.",
      ],
    },
  },
  {
    level: "high_clinical_acrophobia_aq",
    scoreRange: [23, 29],
    title: {
      en: "High Clinical Acrophobia (AQ)",
      id: "Akrofobia Klinis Tinggi (Model AQ)",
      de: "Klinisch signifikante Akrophobie",
      fr: "Acrophobie Clinique Sévère (AQ)",
      es: "Acrofobia Clínica Severa (AQ)",
    },
    badge: {
      en: "Severe Height Panic Trigger",
      id: "Pemicu Panik Ketinggian Berat",
      de: "Klinische Höhenangst-Schwelle",
      fr: "Seuil Clinique d'Acrophobie",
      es: "Umbral Clínico de Acrofobia",
    },
    summary: {
      en: "Heights induce severe panic attacks, intense dizziness, rubbery motor paralysis, and terrifying intrusive thoughts of falling. You systematically restrict travel, architecture, and social events.",
      id: "Ketinggian memicu serangan panik hebat, pusing vertigo berat, kelumpuhan motorik, dan pikiran horor terjatuh. Kamu membatasi tempat tinggal, rute perjalanan, dan acara sosial.",
      de: "Höhen lösen bei Ihnen akute Panikattacken, Lähmungsgefühle und quälende Absturzgedanken aus. Sie schränken Reisen, Wohnortwahl und Freizeitaktivitäten massiv ein.",
      fr: "La hauteur déclenche des crises d'angoisse intenses, une tétanie motrice et la terreur obsédante de tomber. Vos choix de vie et de loisirs en sont fortement restreints.",
      es: "Las alturas te provocan ataques de pánico agudos, vértigo incapacitante y pensamientos aterradores de caída. Limitas tus viajes, viviendas y actividades sociales.",
    },
    psychology: {
      en: "Cohen & Marks Acrophobia model demonstrates phobic conditioning: the brain treats height cues as immediate mortal threats, producing severe sympathetic panic, hyperventilation, and catastrophic motor freezing.",
      id: "Model Akrofobia Cohen & Marks membuktikan pengondisian fobia: otak menganggap ketinggian sebagai ancaman maut seketika, memicu hiperventilasi, panik simpatis, dan kelumpuhan motorik.",
      de: "Die neuronale Alarmanlage koppelt den Reiz 'Höhe' reflexartig an Lebensgefahr, was zu Hyperventilation, Schockstarre und Kontrollverlustgefühlen führt.",
      fr: "Le cerveau limbique associe la hauteur à un péril mortel immédiat, déclenchant une sidération motrice et une hyperventilation réflexe.",
      es: "El condicionamiento fóbico equipara la elevación a una muerte segura, bloqueando los movimientos y desatando hiperventilación involuntaria.",
    },
    actionProtocol: {
      en: [
        "Engage with a CBT psychologist specializing in Virtual Reality Exposure Therapy (VRET) for acrophobia.",
        "Perform interoceptive balance exercises: standing on one foot or balance cushions with eyes open.",
        "Learn cognitive defusion techniques to detach from 'Call of the Void' intrusive thought loops.",
        "Use Nuju voice reflections as a grounding companion during elevated travel or transit.",
      ],
      id: [
        "Konsultasikan ke psikolog klinis untuk terapi perilaku kognitif berbasis Virtual Reality (*VRET*).",
        "Latih keseimbangan interoseptif: berdiri satu kaki di atas matras stabil dengan mata terbuka.",
        "Terapkan defusi kognitif untuk melepaskan pikiran intrusif *Call of the Void* tanpa panik.",
        "Gunakan jurnal suara Nuju untuk menenangkan sistem saraf saat harus melintasi jalan tinggi.",
      ],
      de: [
        "Suchen Sie psychotherapeutische Unterstützung (KVT mit Virtual-Reality-Exposition VRET).",
        "Trainieren Sie Ihr Gleichgewichtssystem durch propriozeptive Übungen (Einbeinstand auf Kissen).",
        "Erlernen Sie kognitive Entschärfung gegen aufdringliche 'Call of the Void'-Gedanken.",
        "Nutzen Sie Nuju als beruhigende Audio-Stütze bei unvermeidbaren Fahrten über Brücken.",
      ],
      fr: [
        "Consultez un thérapeute TCC spécialisé dans l'exposition par réalité virtuelle (TERV) au vertige.",
        "Pratiquez des exercices d'équilibre proprioceptif (rester sur un pied sur un coussin).",
        "Apprenez à défusionner des pensées intrusives de saut sans céder à la panique.",
        "Faites de Nuju votre point d'ancrage vocal lors des franchissements de viaducs ou ponts.",
      ],
      es: [
        "Acude a un psicólogo TCC experto en terapia de exposición con realidad virtual (VRET).",
        "Entrena el equilibrio propioceptivo con ejercicios sobre un pie en superficies seguras.",
        "Aprende defusión cognitiva para neutralizar los pensamientos intrusivos del vacío.",
        "Usa las notas de voz de Nuju como anclaje somático al cruzar puentes o carreteras altas.",
      ],
    },
  },
  {
    level: "severe_paralyzing_altitude_terror",
    scoreRange: [30, 36],
    title: {
      en: "Severe Paralyzing Altitude Terror",
      id: "Teror Ketinggian Melumpuhkan (Akrofobia Berat)",
      de: "Schwere immobilisierende Höhenphobie",
      fr: "Terreur du Vide Tétanisante & Invalidante",
      es: "Terror Paralizante a las Alturas (Acrofobia Severa)",
    },
    badge: {
      en: "Incapacitating Altitude Phobia",
      id: "Fobia Ketinggian Melumpuhkan",
      de: "Extrem einschränkende Phobie",
      fr: "Phobie de la Hauteur Majeure",
      es: "Fobia Extrema a las Alturas",
    },
    summary: {
      en: "You suffer from complete, incapacitating height terror. Even low elevations (2nd floor, small step-stools, pedestrian bridges) trigger violent panic, depersonalization, and complete motor collapse.",
      id: "Kamu mengalami teror ketinggian yang melumpuhkan secara total. Bahkan lantai 2, bangku kecil, atau jembatan penyeberangan memicu panik hebat, depersonalisasi, dan tubuh kaku tak berdaya.",
      de: "Sie leiden unter extremer, unkontrollierbarer Höhenpanik. Bereits 2. Stockwerke, Trittleitern oder Fußgängerbrücken lösen vegetative Schockzustände und motorische Blockaden aus.",
      fr: "Vous souffrez d'une terreur du vide invalidante. Le simple fait d'être au premier étage ou sur un escabeau provoque une panique violente et une sidération physique.",
      es: "Padeces una fobia a la altura totalmente invalidante. Incluso un segundo piso, una banqueta o un puente peatonal te causan colapso motor y despersonalización.",
    },
    psychology: {
      en: "The survival circuitry of the brain experiences catastrophic autonomic flooding at the mere perception of elevation. Inhibitory prefrontal control is completely overridden by amygdalar fear surges.",
      id: "Sirkuit bertahan hidup otak mengalami banjir otonomik ekstrem saat melihat ketinggian. Kontrol rasional prefrontal lumpuh total oleh amigdala yang menyalakan status darurat maut.",
      de: "Das vegetative Nervensystem wird von massiven Paniksignalen überflutet. Kognitive Beruhigung scheitert an der absoluten Dominanz der limbischen Fluchtimpulse.",
      fr: "Les circuits de survie submergent le cortex préfrontal d'une décharge d'adrénaline incontrôlable dès qu'un dénivelé est perçu.",
      es: "El sistema de alarma cerebral sufre una inundación simpática devastadora que anula cualquier intento de razonamiento lógico ante el vacío.",
    },
    actionProtocol: {
      en: [
        "Prioritize evidence-based psychiatric consultation and structured Cognitive Behavioral Therapy.",
        "Consider short-term pharmacotherapy to dampen sympathetic hyperactivity during initial therapy steps.",
        "Start micro-exposure: viewing 360-degree virtual photos of 2-story heights while seated on the floor.",
        "Rely on Nuju as a compassionate, safe harbor to process somatic panic sensations without judgment.",
      ],
      id: [
        "Segera konsultasikan ke psikiater dan psikolog klinis spesialis fobia spesifik.",
        "Pertimbangkan bantuan medis jangka pendek untuk meredam lonjakan adrenalin saat mulai terapi.",
        "Mulai dari mikro-eksposur: melihat foto 360 derajat lantai 2 sambil duduk nyaman di lantai.",
        "Jadikan Nuju sebagai tempat berlindung yang aman untuk meredakan kepanikan fisik secara bertahap.",
      ],
      de: [
        "Vereinbaren Sie eine fachärztliche psychiatrische und verhaltenstherapeutische Diagnostik.",
        "Erwägen Sie eine medikamentöse Unterstützung zur Dämpfung der akuten Panikbereitschaft.",
        "Beginnen Sie mit Mikroschritten: Betrachten Sie 360-Grad-Fotos aus niedrigen Höhen im Sitzen.",
        "Nutzen Sie Nuju als geschützten Raum, um seelische Erschütterung ohne Scham auszusprechen.",
      ],
      fr: [
        "Consultez sans attendre un psychiatre et un psychologue clinicien TCC pour un suivi adapté.",
        "Envisagez un accompagnement médical temporaire pour rendre la désensibilisation supportable.",
        "Démarrez par des micro-étapes : regarder des photos de balcons au calme en restant assis.",
        "Faites de Nuju votre sas vocal sécurisant pour libérer vos peurs somatiques sans jugement.",
      ],
      es: [
        "Solicita consulta con un psiquiatra y psicólogo clínico especializado en fobias específicas.",
        "Valora medicación de apoyo transitoria para facilitar los primeros pasos de desensibilización.",
        "Inicia microexposiciones: contemplar fotos panorámicas de poca altura sentado en un sillón.",
        "Refúgiate en el diario de voz Nuju para soltar la angustia física en un espacio seguro.",
      ],
    },
  },
];

export const ACROPHOBIA_SUBSCALE_INFO = {
  visual_height_intolerance_vertigo: {
    title: {
      en: "Visual Height Intolerance & Vertigo",
      id: "Intoleransi Ketinggian Visual & Vertigo",
      de: "Visuelle Höhenintoleranz & Schwindel",
      fr: "Intolérance visuelle & vertige",
      es: "Intolerancia visual al vacío y mareo",
    },
    description: {
      en: "Postural instability, spinning sensations, rubbery knees, and nausea when looking down from open elevated perches.",
      id: "Sensasi melayang, pusing vertigo, lutut lemas tak bertenaga, dan perut mual saat menatap ke bawah dari tempat tinggi.",
      de: "Standunsicherheit, Drehschwindel, weiche Knie und Übelkeit beim Blick von erhöhten Plattformen in die Tiefe.",
      fr: "Instabilité posturale, vertiges rotatoires, jambes tremblantes et nausées en regardant le vide.",
      es: "Inestabilidad postural, mareo, piernas de trapo y malestar estomacal al asomarse a alturas.",
    },
  },
  catastrophic_fall_impulse_anxiety: {
    title: {
      en: "Catastrophic Fall & Impulse Anxiety",
      id: "Kecemasan Katastrofik & Dorongan Impulsif",
      de: "Absturzangst & Impulsfurcht",
      fr: "Peur de la chute & appel du vide",
      es: "Miedo a la caída y llamada del vacío",
    },
    description: {
      en: "Fear of railings snapping, accidental slips, or the chilling 'Call of the Void' intrusive impulse to jump.",
      id: "Ketakutan pagar pembatas patah, terpeleset, atau dorongan aneh *Call of the Void* yang melintas di pikiran.",
      de: "Panik vor Geländerbruch, Ausrutschen oder dem beunruhigenden Phänomen des 'Drangs in die Tiefe'.",
      fr: "Crainte que la barrière cède, peur de glisser ou pensée intrusive angoissante de sauter.",
      es: "Terror a que ceda la barandilla, resbalar o el impulso intrusivo de arrojarse al vacío.",
    },
  },
  anticipatory_elevation_avoidance: {
    title: {
      en: "Anticipatory Elevation Avoidance",
      id: "Penghindaran Ketinggian Antisipatif",
      de: "Antizipatorische Höhenvermeidung",
      fr: "Évitement anticipé de la hauteur",
      es: "Evitación anticipada de la altura",
    },
    description: {
      en: "Systematic refusal to ride glass elevators, climb ladders, drive over mountain bridges, or visit high balconies.",
      id: "Penolakan rutin naik lift kaca, tangga lipat, jalan layang tebing, atau mengunjungi gedung lantai atas.",
      de: "Konsequentes Meiden von Glasaufzügen, Haushaltsleitern, Hochbrücken und Rooftop-Veranstaltungen.",
      fr: "Refus systématique des ascenseurs transparents, échelles, ponts élevés et toits-terrasses.",
      es: "Rechazo sistemático a usar ascensores acristalados, escaleras, viaductos o terrazas elevadas.",
    },
  },
};

export function calculateAcrophobiaSubscales(answers: Record<number, number>) {
  let vertigo = 0;
  let fall = 0;
  let avoidance = 0;

  ACROPHOBIA_QUESTIONS.forEach((q) => {
    const val = answers[q.id] ?? 0;
    if (q.subscale === "visual_height_intolerance_vertigo") vertigo += val;
    if (q.subscale === "catastrophic_fall_impulse_anxiety") fall += val;
    if (q.subscale === "anticipatory_elevation_avoidance") avoidance += val;
  });

  return {
    visual_height_intolerance_vertigo: vertigo,
    catastrophic_fall_impulse_anxiety: fall,
    anticipatory_elevation_avoidance: avoidance,
  };
}

export function getAcrophobiaResult(score: number): AcrophobiaResultLevel {
  const match = ACROPHOBIA_RESULT_LEVELS.find(
    (lvl) => score >= lvl.scoreRange[0] && score <= lvl.scoreRange[1]
  );
  return match || ACROPHOBIA_RESULT_LEVELS[ACROPHOBIA_RESULT_LEVELS.length - 1];
}

export const ACROPHOBIA_RESULTS = ACROPHOBIA_RESULT_LEVELS;

export function calculateAcrophobiaScore(answers: Record<number, number>) {
  let totalScore = 0;
  const subscales = calculateAcrophobiaSubscales(answers);

  ACROPHOBIA_QUESTIONS.forEach((q) => {
    totalScore += answers[q.id] ?? 0;
  });

  const level = getAcrophobiaResult(totalScore);

  return {
    totalScore,
    maxScore: ACROPHOBIA_QUESTIONS.length * 3, // 36
    level,
    subscales,
  };
}
