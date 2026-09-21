export type OrthorexiaCardLang = "en" | "id" | "de" | "fr" | "es";

export interface OrthorexiaQuestion {
  id: number;
  subscale:
    | "dietary_moralization_guilt"
    | "obsessive_ingredient_vigilance"
    | "nutritional_social_isolation";
  text: Record<OrthorexiaCardLang, string>;
}

export interface OrthorexiaResultLevel {
  level:
    | "intuitive_balanced_nourishment"
    | "mild_clean_eating_rigidity"
    | "moderate_orthorexic_fixation"
    | "high_clinical_orthorexia_nervosa"
    | "acute_severe_orthorexic_restriction";
  scoreRange: [number, number];
  title: Record<OrthorexiaCardLang, string>;
  badge: Record<OrthorexiaCardLang, string>;
  summary: Record<OrthorexiaCardLang, string>;
  psychology: Record<OrthorexiaCardLang, string>;
  actionProtocol: Record<OrthorexiaCardLang, string[]>;
}

export const ORTHOREXIA_QUESTIONS: OrthorexiaQuestion[] = [
  // 1. Dietary Moralization & Guilt
  {
    id: 1,
    subscale: "dietary_moralization_guilt",
    text: {
      en: "You view foods strictly through a moral lens of 'pure vs. toxic' or 'clean vs. dirty', feeling spiritually or personally contaminated if you eat unapproved ingredients.",
      id: "Kamu memandang makanan secara kaku dengan lensa moral 'suci vs beracun' atau 'bersih vs kotor', merasa tercemar dan berdosa jika memakan bahan yang dilarang.",
      de: "Sie bewerten Lebensmittel streng moralisch in 'rein' vs. 'giftig' und fühlen sich innerlich beschmutzt oder schuldig, wenn Sie nicht genehmigte Zutaten essen.",
      fr: "Vous classez strictement les aliments selon une grille morale ('pur' vs 'toxique'), ressentant une culpabilité intense ou un dégoût de vous-même en cas d'écart.",
      es: "Clasificas la comida bajo un estricto prisma moral de 'pura vs tóxica' o 'limpia vs sucia', sintiéndote culpable o contaminado si ingieres algo no permitido.",
    },
  },
  // 2. Obsessive Ingredient Vigilance
  {
    id: 2,
    subscale: "obsessive_ingredient_vigilance",
    text: {
      en: "You spend more than 2–3 hours each day obsessively researching ingredients, scrutinizing labels, or planning upcoming meals to ensure absolute dietary purity.",
      id: "Kamu menghabiskan lebih dari 2–3 jam setiap hari membaca label kemasan secara obsesif, riset kandungan bahan, atau merencanakan menu demi memastikan kemurnian total.",
      de: "Sie verbringen täglich mehr als 2–3 Stunden damit, Zutatenlisten zu studieren, Nährstoffe zu analysieren und Mahlzeiten auf absolute Reinheit zu planen.",
      fr: "Vous passez plus de 2 à 3 heures par jour à scruter les étiquettes, analyser les origines et planifier vos repas pour garantir une pureté totale.",
      es: "Dedicas más de 2 o 3 horas al día a escudriñar etiquetas, investigar ingredientes o planificar tus platos para asegurar una pureza dietética absoluta.",
    },
  },
  // 3. Nutritional Social Isolation
  {
    id: 3,
    subscale: "nutritional_social_isolation",
    text: {
      en: "You avoid dining at restaurants, birthday parties, or family gatherings because you cannot verify or control the exact ingredients and cooking oils used.",
      id: "Kamu menghindari makan di restoran, pesta ulang tahun, atau kumpul keluarga karena tidak bisa mengontrol atau memastikan jenis bahan dan minyak yang dipakai.",
      de: "Sie meiden Restaurants, Familienfeiern oder Verabredungen mit Freunden, weil Sie die genauen Zutaten und Öle der Zubereitung nicht kontrollieren können.",
      fr: "Vous évitez les restaurants, les dîners entre amis ou les fêtes de famille par peur de ne pas pouvoir contrôler les ingrédients ou les huiles de cuisson.",
      es: "Evitas comer en restaurantes, reuniones familiares o fiestas con amigos porque no puedes controlar al milímetro los ingredientes ni los aceites empleados.",
    },
  },
  // 4. Dietary Moralization & Guilt
  {
    id: 4,
    subscale: "dietary_moralization_guilt",
    text: {
      en: "Consuming a 'forbidden' food (sugar, seed oils, gluten, processed snacks) triggers intense self-loathing, panic, or the immediate urge to fast or 'detox'.",
      id: "Mengonsumsi makanan yang 'diharamkan' (gula, minyak sawit, gluten, camilan kemasan) memicu rasa benci pada diri sendiri, panik, atau dorongan untuk langsung puasa/detoks.",
      de: "Der Verzehr 'verbotener' Speisen (Zucker, Pflanzenöle, Gluten) löst Panik, Selbstverachtung oder den Zwang zu sofortigem Fasten oder 'Detox' aus.",
      fr: "Manger un aliment 'interdit' (sucre, huiles transformées, gluten) déclenche un dégoût de soi, de l'angoisse ou le besoin urgent de jeûner ou de 'détoxifier'.",
      es: "Comer un alimento 'prohibido' (azúcar, ultraprocesados, aceites refinados) te genera angustia, autorrechazo o el impulso inmediato de ayunar o 'desintoxicarte'.",
    },
  },
  // 5. Obsessive Ingredient Vigilance
  {
    id: 5,
    subscale: "obsessive_ingredient_vigilance",
    text: {
      en: "You carry your own prepped food everywhere you go because you do not trust meals prepared by anyone else, including close friends or loved ones.",
      id: "Kamu membawa bekal makanan sendiri ke mana pun pergi karena tidak percaya pada makanan yang dimasak orang lain, termasuk keluarga atau sahabatmu.",
      de: "Sie nehmen überall eigenes Essen mit, weil Sie Mahlzeiten, die von anderen zubereitet wurden, grundsätzlich misstrauen.",
      fr: "Vous apportez vos propres boîtes repas partout où vous allez par méfiance totale envers la cuisine préparée par autrui, y compris vos proches.",
      es: "Llevas tus propios táperes de comida a todas partes porque desconfías por completo de cualquier plato preparado por otra persona.",
    },
  },
  // 6. Nutritional Social Isolation
  {
    id: 6,
    subscale: "nutritional_social_isolation",
    text: {
      en: "Your dietary rules have caused significant conflict, distance, or judgment in your romantic relationship, friendships, or family life.",
      id: "Aturan dietmu yang kaku telah memicu pertengkaran, jarak emosional, atau penilaian sinis dalam hubungan asmara, persahabatan, atau keluargamu.",
      de: "Ihre strikten Ernährungsregeln haben bereits zu spürbaren Konflikten, Entfremdung oder Unverständnis in Ihrer Partnerschaft oder Familie geführt.",
      fr: "Vos règles alimentaires strictes ont provoqué des tensions, de l'incompréhension ou de l'éloignement avec votre conjoint, vos amis ou vos proches.",
      es: "Tus rigideces con la comida han provocado discusiones, distanciamiento o roces en tu pareja, amistades o familia.",
    },
  },
  // 7. Dietary Moralization & Guilt
  {
    id: 7,
    subscale: "dietary_moralization_guilt",
    text: {
      en: "You look down with pity or quiet superiority on people who eat ordinary, conventional, or processed foods, viewing them as undisciplined or toxic.",
      id: "Kamu diam-diam memandang rendah atau merasa lebih superior dibanding orang yang memakan makanan biasa/olahan, menganggap mereka tidak berdisiplin.",
      de: "Sie blicken insgeheim mit Überlegenheit oder Mitleid auf Menschen herab, die herkömmliche Lebensmittel essen, und sehen diese als undiszipliniert an.",
      fr: "Vous éprouvez un sentiment de supériorité morale ou de pitié envers ceux qui mangent des aliments conventionnels, les jugeant négligents ou intoxiqués.",
      es: "Miras con cierta superioridad moral o desdén a quienes comen alimentos convencionales o procesados, viéndolos como indisciplinados.",
    },
  },
  // 8. Obsessive Ingredient Vigilance
  {
    id: 8,
    subscale: "obsessive_ingredient_vigilance",
    text: {
      en: "Thoughts about food, nutrient absorption, micronutrient ratios, and bodily purity occupy your mind even during work, movies, or social conversations.",
      id: "Pikiran tentang kandungan makanan, penyerapan nutrisi, dan detoksifikasi tubuh terus berputar di kepalamu bahkan saat kerja atau mengobrol santai.",
      de: "Gedanken an Nährstoffdichten, Entgiftung und Speisepläne drängen sich selbst bei der Arbeit, im Kino oder bei Gesprächen unweigerlich auf.",
      fr: "Les calculs de macronutriments, la peur des toxines et la planification alimentaire envahissent vos pensées même au travail ou en soirée.",
      es: "La obsesión por los nutrientes, toxinas y la pureza biológica invade tu cabeza incluso mientras trabajas, ves una película o conversas.",
    },
  },
  // 9. Nutritional Social Isolation
  {
    id: 9,
    subscale: "nutritional_social_isolation",
    text: {
      en: "Your list of 'acceptable' foods has become increasingly narrow over time, excluding entire food groups (grains, fats, cooked foods, animal products).",
      id: "Daftar makanan yang 'boleh' kamu makan semakin hari semakin sempit, mengeliminasi kelompok makanan utuh (karbohidrat, minyak, makanan matang, dsb).",
      de: "Ihre Liste 'erlaubter' Lebensmittel wird immer kürzer, da Sie fortlaufend ganze Lebensmittelgruppen (Kohlenhydrate, Fette, Gekochtes) ausschließen.",
      fr: "Votre liste d'aliments 'sûrs' rétrécit continuellement, éliminant des groupes entiers (féculents, lipides, produits cuits ou transformés).",
      es: "Tu lista de alimentos 'admisibles' se ha vuelto cada vez más reducida, eliminando grupos enteros (hidratos, grasas, cocinados o lácteos).",
    },
  },
  // 10. Dietary Moralization & Guilt
  {
    id: 10,
    subscale: "dietary_moralization_guilt",
    text: {
      en: "Your self-esteem, inner peace, and daily mood are almost completely contingent on whether you followed your dietary perfection standard today.",
      id: "Harga diri, kedamaian batin, dan suasana hatimu hancur atau bahagia semata-mata tergantung pada apakah dietmu 100% sempurna hari ini.",
      de: "Ihr Selbstwertgefühl und Ihre Tageslaune hängen fast ausschließlich davon ab, ob Sie Ihren rigiden Ernährungsplan fehlerfrei eingehalten haben.",
      fr: "Votre estime personnelle et votre sérénité dépendent presque exclusivement du respect sans faille de vos règles nutritionnelles du jour.",
      es: "Tu autoestima y estado de ánimo dependen casi en su totalidad de si has cumplido a la perfección tus reglas nutricionales del día.",
    },
  },
  // 11. Obsessive Ingredient Vigilance
  {
    id: 11,
    subscale: "obsessive_ingredient_vigilance",
    text: {
      en: "You experience intense somatic symptoms (bloating, headaches, phantom stomach pain) whenever you believe you accidentally ingested an unapproved ingredient.",
      id: "Kamu langsung merasakan gejala fisik (perut kembung, mual, sakit kepala) begitu menduga kamu tidak sengaja memakan bahan yang tidak higienis.",
      de: "Sie verspüren sofort psychosomatische Beschwerden (Blähungen, Unwohlsein, Kopfschmerzen), sobald Sie vermuten, eine 'unreine' Zutat erwischt zu haben.",
      fr: "Vous développez immédiatement des symptômes physiques (ballonnements, nausées, malaise) dès que vous soupçonnez avoir ingéré un ingrédient 'toxique'.",
      es: "Experimentas síntomas físicos inmediatos (hinchazón, dolor de cabeza o malestar) si sospechas haber comido por error algo no aprobado.",
    },
  },
  // 12. Nutritional Social Isolation
  {
    id: 12,
    subscale: "nutritional_social_isolation",
    text: {
      en: "Despite obsessing over 'health', you suffer from chronic physical fatigue, low energy, nutritional deficiencies, hair thinning, or extreme body chill.",
      id: "Meskipun terobsesi dengan 'kesehatan', tubuhmu justru mengalami lelah kronis, kurang energi, anemia/defisiensi gizi, rambut rontok, atau kedinginan konstan.",
      de: "Trotz Ihres Strebens nach 'Gesundheit' leiden Sie unter Erschöpfung, Mangelerscheinungen, Kälteempfindlichkeit oder Haarausfall.",
      fr: "Bien que vous visiez une santé parfaite, vous souffrez de fatigue chronique, de carences nutritionnelles, de frilosité ou de perte de cheveux.",
      es: "A pesar de buscar una salud impecable, padeces fatiga crónica, falta de energía, carencias nutricionales, frío constante o caída de cabello.",
    },
  },
];

export const ORTHOREXIA_OPTIONS = [
  {
    value: 0,
    label: {
      en: "Never / Rarely (Healthy flexibility, enjoy spontaneous dining)",
      id: "Tidak Pernah / Jarang (Fleksibel, menikmati makanan tanpa rasa bersalah)",
      de: "Nie / Selten (Gesunde Flexibilität, unbeschwertes Essen mit anderen)",
      fr: "Jamais / Rarement (Alimentation intuitive, flexibilité et convivialité)",
      es: "Nunca / Raras veces (Flexibilidad saludable, disfrute social de la comida)",
    },
  },
  {
    value: 1,
    label: {
      en: "Sometimes / Mild (Health-conscious, occasional worry about processed foods)",
      id: "Kadang-kadang / Ringan (Peduli kesehatan, sesekali memilih bahan organik)",
      de: "Manchmal / Mild (Gesundheitsbewusst, gelegentliche Sorgen um Zusätze)",
      fr: "Parfois / Léger (Sensible à la qualité, vigilance modérée sans angoisse)",
      es: "A veces / Leve (Interés por la salud, atención moderada a los ingredientes)",
    },
  },
  {
    value: 2,
    label: {
      en: "Frequently / Moderate (Noticeable dietary rigidity, guilt, avoiding social meals)",
      id: "Sering / Sedang (Pola makan kaku, rasa bersalah nyata, mulai enggan makan di luar)",
      de: "Häufig / Moderat (Spürbare Ernährungsstrenge, Schuldgefühle, Meiden von Lokalen)",
      fr: "Souvent / Modéré (Rigidité notable, culpabilité vive, évitement des repas partagés)",
      es: "Frecuentemente / Moderado (Rigidez dietética, culpa, evitar comer fuera de casa)",
    },
  },
  {
    value: 3,
    label: {
      en: "Constantly / Severe (Pathological obsession with food purity, extreme isolation)",
      id: "Hampir Selalu / Berat (Obsesi patologis makanan murni, isolasi sosial total)",
      de: "Ständig / Schwer (Pathologische Reinheitsbesessenheit, soziale Isolation, Mängel)",
      fr: "Constamment / Sévère (Obsession pathologique du 'pur', isolement et carences)",
      es: "Constantemente / Severo (Obsesión patológica por comer 'limpio', aislamiento y fatiga)",
    },
  },
];

export const ORTHOREXIA_RESULTS: OrthorexiaResultLevel[] = [
  {
    level: "intuitive_balanced_nourishment",
    scoreRange: [0, 7],
    title: {
      en: "Intuitive Balanced Nourishment (Flexible Food Relationship)",
      id: "Nutrisi Intuitif Seimbang (Relasi Sehat dengan Makanan)",
      de: "Intuitive ausgewogene Ernährung (Entspannte Beziehung zum Essen)",
      fr: "Nourriture Intuitive Équilibrée (Relation Sereine à l'Alimentation)",
      es: "Nutrición Intuitiva Equilibrada (Relación Libre y Flexible)",
    },
    badge: {
      en: "Flexible Nourishment (0-19%)",
      id: "Nutrisi Fleksibel (0-19%)",
      de: "Entspannte Ernährung",
      fr: "Alimentation Intuitive",
      es: "Nutrición Flexible",
    },
    summary: {
      en: "You have a balanced, intuitive relationship with food. You appreciate wholesome, nutritious meals for vitality, but you do not assign moral virtue to food choices or feel guilty after eating cake or restaurant meals. Food is a source of fuel and social connection, not a tool for existential purity.",
      id: "Kamu memiliki hubungan yang sehat dan fleksibel dengan makanan. Kamu menghargai makanan bergizi untuk energi tubuh, namun kamu tidak mengaitkan pilihan makanan dengan nilai moral atau merasa berdosa setelah makan martabak atau kue. Makanan bagimu adalah sumber nutrisi dan kebersamaan sosial, bukan simbol kesucian diri.",
      de: "Sie pflegen eine unbeschwerte und flexible Beziehung zum Essen. Sie schätzen gesunde Kost zur Energiegewinnung, verbinden Ernährung aber weder mit moralischer Überlegenheit noch mit quälenden Schuldgefühlen. Essen bedeutet für Sie Genuss und Gemeinschaft.",
      fr: "Vous entretenez un rapport sain et intuitif avec votre alimentation. Vous privilégiez les aliments nutritifs sans leur attribuer de valeur morale ni culpabiliser après un dessert convivial. La nourriture reste un plaisir et un lien social, non une quête de pureté obsessionnelle.",
      es: "Mantienes una relación libre y equilibrada con la comida. Buscas nutrir tu cuerpo con alimentos de calidad sin asignarles una carga moral ni sentirte culpable por disfrutar de una comida social. Comer es energía, placer y convivencia, no una religión.",
    },
    psychology: {
      en: "Bratman & ORTO-15 Benchmark: Low cognitive dietary restraint and zero food moralization. Psychological flexibility around nourishment preserves metabolic homeostasis and social well-being.",
      id: "Tolok Ukur Bratman & ORTO-15: Pengendalian kognitif makanan yang rendah dan ketiadaan moralisasi makanan. Fleksibilitas psikologis menjaga homeostasis metabolisme dan kesehatan sosial.",
      de: "Bratman-Referenz: Keine kognitive Zwangskontrolle und keine Moralisierung von Lebensmitteln. Psychologische Flexibilität schützt Stoffwechsel und Sozialleben.",
      fr: "Référence Bratman & ORTO-15 : Absence de contrôle cognitif rigide. La souplesse psychologique préserve la santé métabolique et la vie relationnelle.",
      es: "Referencia de Bratman y ORTO-15: Flexibilidad psicológica sin moralización de los alimentos, lo que favorece el equilibrio metabólico y los vínculos afectivos.",
    },
    actionProtocol: {
      en: [
        "Continue enjoying diverse meals with loved ones without over-analyzing microscopic ingredients.",
        "Maintain the principle of 80/20 balance: nourishment for the body and flexibility for the soul.",
        "Celebrate food as culture, tradition, and celebration rather than a biochemical calculation.",
      ],
      id: [
        "Terus nikmati hidangan beragam bersama keluarga dan teman tanpa overthinking membaca mikro-bahan.",
        "Pertahankan prinsip keseimbangan 80/20: nutrisi bergizi untuk tubuh dan kelonggaran santai untuk jiwa.",
        "Rayakan makanan sebagai sarana budaya, tradisi, dan kebahagiaan bersama, bukan rumus biokimia yang kaku.",
      ],
      de: [
        "Genießen Sie weiterhin gemeinsame Mahlzeiten ohne mikroskopische Zutatenanalyse.",
        "Behalten Sie das 80/20-Prinzip bei: Nährstoffe für die Vitalität und Gelassenheit für die Seele.",
        "Betrachten Sie Essen weiterhin als Kultur und Lebensfreude, nicht als biochemische Gleichung.",
      ],
      fr: [
        "Poursuivez le partage de repas variés sans disséquer le moindre additif.",
        "Conservez l'équilibre 80/20 : des nutriments pour la santé et de la souplesse pour l'esprit.",
        "Célébrez la cuisine comme un art de vivre et un vecteur de convivialité.",
      ],
      es: [
        "Sigue disfrutando de la gastronomía variada en compañía sin escudriñar cada componente.",
        "Mantén la regla del 80/20: nutrientes para el cuerpo y flexibilidad para el bienestar mental.",
        "Honra la comida como cultura, afecto y celebración colectiva.",
      ],
    },
  },
  {
    level: "mild_clean_eating_rigidity",
    scoreRange: [8, 14],
    title: {
      en: "Mild Clean Eating Rigidity (Occasional Ingredient Worry)",
      id: "Kekakuan Clean Eating Ringan (Kekhawatiran Bahan Sesekali)",
      de: "Milde Clean-Eating-Strenge (Gelegentliche Zutaten-Sorgen)",
      fr: "Rigidité Alimentaire Légère (Vigilance Accrue sur la Pureté)",
      es: "Rigidez Dietética Leve (Preocupación Ocasional por Ingredientes)",
    },
    badge: {
      en: "Mild Rigidity (20-39%)",
      id: "Kekakuan Ringan (20-39%)",
      de: "Milde Strenge",
      fr: "Rigidité Légère",
      es: "Rigidez Leve",
    },
    summary: {
      en: "You are highly health-conscious and follow current nutrition trends. However, clean eating is beginning to carry a subtle emotional charge: you feel uncomfortable when eating restaurant foods cooked in unverified oils, inspect labels thoroughly, and experience mild self-criticism after indulging in processed foods.",
      id: "Kamu sangat peduli dengan kesehatan dan rajin mengikuti tren nutrisi. Namun, konsep 'clean eating' mulai membawa beban emosional: kamu merasa tidak nyaman saat makan di restoran dengan minyak yang tidak jelas, memeriksa label dengan cermat, dan ada sedikit rasa bersalah setelah memakan makanan olahan.",
      de: "Sie achten sehr auf Ihre Gesundheit. Das Streben nach 'Clean Eating' beginnt jedoch, emotionalen Stress zu erzeugen: Sie fühlen sich unwohl bei unklaren Restaurant-Ölen und kritisieren sich selbst nach Ausnahmen.",
      fr: "Vous êtes très attentif à votre santé, mais l'obsession du 'manger propre' commence à générer de l'anxiété : malaise face aux plats de restaurant, lecture minutieuse des étiquettes et petite culpabilité en cas d'écart.",
      es: "Te preocupas mucho por la salud, pero la corriente de 'comer limpio' empieza a generar cierta tensión: te incomoda no conocer los aceites de los restaurantes y te juzgas levemente si comes algo procesado.",
    },
    psychology: {
      en: "Early Orthorexic Prodrome: The 'Health Halo' cognitive bias begins replacing somatic hunger cues. Wellness social media algorithms can accelerate this anxiety by categorizing everyday ingredients as toxic.",
      id: "Prodromal Awal Ortoreksia: Bias kognitif 'Health Halo' mulai menggantikan sinyal lapar tubuh. Algoritma media sosial tentang diet bersih mempercepat kecemasan ini dengan memberi label 'racun' pada bahan makanan biasa.",
      de: "Frühes orthorektisches Vorstadium: Kognitive Ernährungsregeln überlagern das natürliche Hungergefühl. 'Health-Influencer' verstärken die Angst vor alltäglichen Zutaten.",
      fr: "Stade prodromique : Les règles intellectuelles étouffent peu à peu les signaux corporels. Les réseaux sociaux accentuent la peur des ingrédients étiquetés 'toxiques'.",
      es: "Fase prodrómica: Las normas teóricas sustituyen la escucha del apetito. El contenido de redes sobre nutrición fomenta el miedo a ingredientes habituales.",
    },
    actionProtocol: {
      en: [
        "Practice 'Food Neutrality': Stop labeling foods as 'good/bad' or 'clean/dirty'; reframe them neutrally as 'dense nutrient sources' vs. 'quick energy & pleasure sources'.",
        "Curate Social Media Feeds: Unfollow biohacking and extreme diet accounts that promote fear-mongering around seed oils, gluten, or non-organic produce.",
        "Enforce One 'Imperfect' Meal Weekly: Eat out with friends once a week without asking the waiter about cooking oils or preparation methods.",
      ],
      id: [
        "Latih 'Netralitas Makanan': Berhenti memberi label 'makanan suci vs racun'; pandang makanan secara objektif sebagai 'sumber nutrisi padat' vs 'sumber energi cepat & rekreasi'.",
        "Kurasi Media Sosialmu: Unfollow akun biohacking atau influencer diet ekstrem yang menebar ketakutan berlebihan terhadap gluten, minyak, atau makanan non-organik.",
        "Wajibkan Satu Makanan 'Tidak Sempurna' Seminggu: Makanlah di luar bersama teman seminggu sekali tanpa menanyakan jenis minyak atau cara memasaknya pada pelayan.",
      ],
      de: [
        "Neutrale Bewertung üben: Ersetzen Sie 'gut/giftig' durch 'nährstoffreich' vs. 'Genuss- und Energieträger'.",
        "Social-Media-Detox: Entfolgen Sie Konten, die Panik vor herkömmlichen Lebensmitteln oder Saatölen schüren.",
        "Eine 'unperfekte' Mahlzeit pro Woche: Essen Sie entspannt im Restaurant, ohne das Personal nach Kochölen zu befragen.",
      ],
      fr: [
        "Pratiquer la neutralité alimentaire : Cessez de catégoriser les aliments en 'saints' ou 'toxiques' ; ils sont tous de l'énergie.",
        "Nettoyer vos réseaux sociaux : Désabonnez-vous des créateurs prônant la phobie des huiles, du gluten ou des aliments non bio.",
        "Un repas 'imparfait' hebdomadaire : Dînez au restaurant avec des amis sans interroger le serveur sur les modes de cuisson.",
      ],
      es: [
        "Practica la neutralidad alimentaria: Deja de usar términos como 'comida limpia' o 'veneno'; clasifícala como nutritiva o lúdica.",
        "Filtra tus redes sociales: Deja de seguir perfiles radicales que difunden pánico sobre aceites de semillas o aditivos comunes.",
        "Una comida 'imperfecta' por semana: Come fuera con amigos sin hacer preguntas al camarero sobre la elaboración del plato.",
      ],
    },
  },
  {
    level: "moderate_orthorexic_fixation",
    scoreRange: [15, 21],
    title: {
      en: "Moderate Orthorexic Fixation (Dietary Moralization & Anxiety)",
      id: "Fiksasi Ortoreksia Sedang (Moralisasi Makanan & Kecemasan Diet)",
      de: "Moderate orthorektische Fixierung (Ernährungsdogmatismus & Ängste)",
      fr: "Fixation Orthorexique Modérée (Moralisation & Anxiété Alimentaire)",
      es: "Fijación Ortoréxica Moderada (Dogmatismo y Ansiedad Nutricional)",
    },
    badge: {
      en: "Moderate Orthorexia (40-59%)",
      id: "Ortoreksia Sedang (40-59%)",
      de: "Moderate Orthorexie",
      fr: "Orthorexie Modérée",
      es: "Ortorexia Moderada",
    },
    summary: {
      en: "Your quest for clean eating has transformed into an obsessive, rigid dogma. You spend hours planning meals, feel profound guilt or disgust if you eat unapproved ingredients, and find yourself declining restaurant invitations or carrying your own food to social events. Dietary purity has become intricately tied to your moral self-worth.",
      id: "Pencarianmu akan makanan sehat telah berubah menjadi dogma yang kaku dan obsesif. Kamu menghabiskan berjam-jam merencanakan menu, merasa sangat bersalah atau jijik jika memakan bahan yang tidak terverifikasi, dan mulai menolak ajakan makan di luar atau membawa bekal sendiri ke acara sosial. Kemurnian diet telah melekat erat pada harga dirimu.",
      de: "Ihr Streben nach gesundem Essen ist zu einem starren Dogma erstarrt. Sie verbringen täglich Stunden mit Essensplanung, verspüren Ekel bei 'unreinen' Zutaten und bringen eigenes Essen zu Einladungen mit. Ernährung bestimmt Ihren seelischen Wert.",
      fr: "Votre quête du 'manger sain' s'est muée en dogme rigide. Vous consacrez des heures à la planification, ressentez une culpabilité étouffante au moindre faux pas et emportez vos propres plats en société. La pureté diététique définit votre valeur morale.",
      es: "Tu búsqueda de comer sano se ha convertido en un dogma rígido. Pasas horas planificando, sientes una profunda aversión ante ingredientes 'impuros' y llevas tu propia comida a eventos sociales. Tu valor personal se mide por la pureza de tu plato.",
    },
    psychology: {
      en: "Steven Bratman's Orthorexia Nervosa Formulation (1997): The individual transfers existential anxieties (illness, aging, loss of control) onto food purity. The illusion of complete biochemical control serves as an emotional shield against life's uncertainties.",
      id: "Formulasi Ortoreksia Nervosa Dr. Steven Bratman (1997): Individu mentransfer kecemasan eksistensial (takut sakit, penuaan, hilang kendali hidup) ke atas kemurnian makanan. Ilusi kendali biokimiawi menjadi perisai emosional dari ketidakpastian hidup.",
      de: "Bratmans Modell: Existenzielle Ängste (Krankheit, Kontrollverlust) werden auf die Reinheit des Essens projiziert. Die Illusion absoluter Kontrolle dient als seelischer Schutzschild.",
      fr: "Modèle de Steven Bratman : L'individu projette ses angoisses existentielles (maladie, vieillissement) sur la pureté alimentaire, cherchant un contrôle illusoire contre l'incertitude de la vie.",
      es: "Formulación de Steven Bratman: Se proyectan miedos existenciales (enfermedad, pérdida de control) en la pureza de los alimentos. El control dietético actúa como una armadura psicológica.",
    },
    actionProtocol: {
      en: [
        "Challenge the 'Toxicity Myth': Work with an anti-diet registered dietitian (RD) to understand that the human liver and kidneys detoxify the body continuously, not organic green juices.",
        "Expose Yourself to 'Fear Foods' in Graded Steps: Systematically reintroduce one forbidden food per week (e.g. regular pasta, restaurant salad with house dressing) without compensating through fasting.",
        "Separate Moral Value from Nutrition: Remind yourself daily: 'What I put into my stomach does not make me a better, purer, or more worthy human being.'",
      ],
      id: [
        "Runtuhkan 'Mitos Racun': Konsultasikan dengan ahli gizi bersertifikat bahwa organ hati dan ginjal manusialah yang mendetoksifikasi tubuh secara konstan, bukan jus hijau organik.",
        "Latihan 'Pajanan Makanan yang Ditakuti': Masukkan kembali satu makanan yang kamu takuti per minggu secara bertahap (misal pasta biasa, salad restoran) tanpa menebusnya dengan puasa detoks.",
        "Pisahkan Nilai Moral dari Makanan: Ingatkan dirimu setiap hari: 'Apa yang masuk ke perutku tidak membuatku menjadi manusia yang lebih suci, lebih mulia, atau lebih berharga.'",
      ],
      de: [
        "Den Gift-Mythos entzaubern: Leber und Nieren entgiften den Körper ununterbrochen, nicht teure Detox-Säfte.",
        "Konfrontation mit 'Angst-Lebensmitteln': Integrieren Sie schrittweise eine 'verbotene' Speise pro Woche (z.B. normale Nudeln), ohne Gegenmaßnahmen wie Fasten.",
        "Moral vom Teller trennen: Sagen Sie sich täglich: 'Mein Essen macht mich weder zu einem besseren noch zu einem reineren Menschen.'",
      ],
      fr: [
        "Démystifier le fantasme de la 'détox' : Vos reins et votre foie assurent naturellement l'élimination des déchets, sans besoin de pureté absolue.",
        "Exposition progressive aux aliments tabous : Réintroduisez un aliment 'interdit' par semaine (ex. pâtes classiques) sans compensation ultérieure.",
        "Déconnecter morale et nutrition : Répétez-vous : 'Ce que je mange ne fait pas de moi une personne supérieure ou plus digne.'",
      ],
      es: [
        "Desmonta el mito de la toxicidad: Recuerda que son el hígado y los riñones los que depuran el cuerpo, no los zumos detox ni los ayunos punitivos.",
        "Exposición gradual a 'alimentos temidos': Reintroduce un alimento prohibido por semana (pasta tradicional, aderezos de restaurante) sin compensar.",
        "Desvincula la moral del plato: Repítete a diario: 'Lo que como no me convierte en una persona más pura, superior ni más digna de afecto'.",
      ],
    },
  },
  {
    level: "high_clinical_orthorexia_nervosa",
    scoreRange: [22, 28],
    title: {
      en: "High Clinical Orthorexia Nervosa (Severe Restriction & Social Isolation)",
      id: "Ortoreksia Nervosa Klinis Tinggi (Restriksi Berat & Isolasi Sosial)",
      de: "Hohe klinische Orthorexia Nervosa (Schwere Restriktion & Isolation)",
      fr: "Orthorexie Nerveuse Clinique Élevée (Restriction Sévère & Rupture Sociale)",
      es: "Alta Ortorexia Nervosa Clínica (Restricción Severa y Aislamiento)",
    },
    badge: {
      en: "High Clinical Orthorexia (60-79%)",
      id: "Ortoreksia Klinis (60-79%)",
      de: "Klinische Orthorexie",
      fr: "Orthorexie Clinique",
      es: "Ortorexia Clínica",
    },
    summary: {
      en: "You are entrapped in severe Orthorexia Nervosa. Your diet has become dangerously restricted, excluding multiple essential food groups. Social meals are completely out of the question, causing damaged relationships. Despite intending to achieve peak health, you suffer from persistent fatigue, mood swings, nutrient deficiencies, or significant weight loss.",
      id: "Kamu terperangkap dalam Ortoreksia Nervosa tingkat berat. Pola makanmu menyusut drastis secara berbahaya, mengeliminasi kelompok nutrisi esensial. Makan bersama orang lain sudah mustahil dilakukan, merusak relasi personal. Meski berniat mencapai 'kesehatan puncak', tubuhmu justru mengalami kelelahan kronis, defisiensi gizi, atau penurunan berat badan tak terkontrol.",
      de: "Sie sind in einer ausgeprägten Orthorexia Nervosa gefangen. Ihre Ernährung ist hochgradig restriktiv, soziale Essen sind unmöglich geworden und Beziehungen leiden. Obwohl Sie 'Super-Gesundheit' anstreben, zeigen sich chronische Erschöpfung, Mängel und seelische Verarmung.",
      fr: "Vous êtes pris au piège d'une orthorexie clinique sévère. Vos restrictions alimentaires extrêmes compromettent vos liens sociaux et votre santé physique. Bien que visant la perfection biologique, vous souffrez d'épuisement, de carences et d'isolement affectif.",
      es: "Te encuentras inmerso en una ortorexia nervosa severa. Tu abanico dietético se ha reducido a extremos peligrosos, suprimiendo comidas sociales y dañando tus relaciones. Lejos de la salud prometida, experimentas fatiga crónica, desnutrición funcional y vacío emocional.",
    },
    psychology: {
      en: "CBT-E Eating Disorder & OCD Overlap: The condition mirrors anorexia nervosa in its cognitive rigidity and obsessive-compulsive traits, but focuses on the *quality* and *perceived purity* of food rather than sheer calorie quantity, leading to identical malnutrition pathology.",
      id: "Overlaps CBT-E Eating Disorder & OCD: Kondisi ini mencerminkan anoreksia nervosa dalam kekakuan kognitif dan obsesi kompulsinya, namun berfokus pada *kualitas* dan *kemurnian* makanan alih-alih jumlah kalori, menghasilkan patologi malnutrisi yang serupa.",
      de: "CBT-E-Modell: Überschneidung von Essstörung und Zwangsstörung. Der Fokus liegt nicht auf der Kalorienmenge, sondern auf der vermeintlichen 'Reinheit', führt jedoch zu denselben Mangelerscheinungen.",
      fr: "Modèle CBT-E : Chevauchement entre trouble du comportement alimentaire et TOC. La fixation porte sur la pureté qualitative plutôt que sur les calories, aboutissant à une dénutrition similaire.",
      es: "Modelo CBT-E: Fusión entre trastorno de la conducta alimentaria y TOC. La obsesión recae en la calidad y pureza ilusoria en vez de las calorías, generando desnutrición y deterioro psicofísico idéntico.",
    },
    actionProtocol: {
      en: [
        "Immediate Comprehensive Medical Workup: Request full blood panels (CBC, ferritin, B12, vitamin D, thyroid panel, electrolytes) from a physician to identify hidden nutritional deficiencies.",
        "Clinical CBT-E Protocol: Work with a psychologist specialized in Eating Disorders and OCD using Cognitive Behavioral Therapy for Eating Disorders (CBT-E).",
        "Stop Consuming Wellness Fear Content: Ban all nutrition podcasts, biohacking influencers, and clean-eating forums for at least 60 days.",
        "Rebuild Shared Commensality: Re-learn that the psychological benefits of eating warm food with loved ones far outweigh the theoretical biochemical 'risk' of non-organic butter or standard cooking oil.",
      ],
      id: [
        "Pemeriksaan Medis Menyeluruh Segera: Lakukan cek darah lengkap (feritin, B12, vitamin D, elektrolit, fungsi tiroid) ke dokter untuk memeriksa defisiensi nutrisi tersembunyi.",
        "Protokol Terapi CBT-E: Konsultasikan ke psikolog klinis spesialis Eating Disorder dan OCD dengan pendekatan Cognitive Behavioral Therapy for Eating Disorders (CBT-E).",
        "Hentikan Konsumsi Konten 'Fear-Mongering': Blokir atau puasa dari podcast diet, influencer biohacking, dan forum 'clean eating' setidaknya selama 60 hari.",
        "Bangun Kembali Kehangatan Meja Makan: Sadarilah bahwa manfaat psikologis makan bersama orang terkasih jauh lebih menyehatkan bagi umur panjang dibanding 'risiko' teoritis sepotong mentega biasa.",
      ],
      de: [
        "Medizinische Laboruntersuchung: Blutbild (Ferritin, B12, Vitamin D, Schilddrüse, Elektrolyte) beim Arzt erstellen lassen.",
        "Klinische CBT-E-Therapie: Psychotherapeutische Begleitung bei einem Therapeuten mit Schwerpunkt Essstörungen und Zwangserkrankungen.",
        "Radikaler Konsum-Stopp: Keine Ernährungs-Podcasts, Biohacking-Kanäle oder Diät-Foren für mindestens 60 Tage.",
        "Gemeinschaftliches Essen wiederentdecken: Das seelische Wohlbefinden beim Teilen einer Mahlzeit ist gesundheitlich wertvoller als theoretische Schadstoffe im Speiseöl.",
      ],
      fr: [
        "Bilan sanguin complet immédiat : Contrôlez le fer, la B12, la vitamine D, la thyroïde et les électrolytes auprès de votre médecin traitant.",
        "Psychothérapie spécialisée CBT-E : Entamez un suivi avec un psychologue formé aux troubles alimentaires et aux rituels obsessionnels.",
        "Cure de désintoxication médiatique : Coupez tout contenu lié au biohacking, aux régimes restrictifs et aux comptes 'healthy' pendant 60 jours.",
        "Retrouver le plaisir de la table : La chaleur humaine d'un repas partagé nourrit bien plus la santé globale que l'obsession d'un ingrédient parfait.",
      ],
      es: [
        "Analítica médica completa: Evalúa ferritina, B12, vitamina D, electrolitos y tiroides con tu médico para corregir carencias ocultas.",
        "Psicoterapia especializada CBT-E: Inicia tratamiento con un psicólogo experto en Trastornos de la Conducta Alimentaria y espectro obsesivo.",
        "Apagón informativo de nutrición: Deja de escuchar podcasts de biohacking y cuentas de alimentación limpia durante al menos 60 días.",
        "Recupera la comensalidad compartida: La calidez y conexión de compartir una mesa superan con creces el supuesto 'riesgo' biológico de un aceite común.",
      ],
    },
  },
  {
    level: "acute_severe_orthorexic_restriction",
    scoreRange: [29, 36],
    title: {
      en: "Acute Severe Orthorexic Crisis (Physical Malnutrition & Medical Risk)",
      id: "Krisis Ortoreksia Akut & Berat (Malnutrisi Fisik & Risiko Medis)",
      de: "Akute schwere orthorektische Krise (Physische Malnutrition & Medizinisches Risiko)",
      fr: "Crise Orthorexique Sévère Aiguë (Dénutrition & Risque Médical)",
      es: "Crisis Ortoréxica Aguda y Severa (Desnutrición y Riesgo Clínico)",
    },
    badge: {
      en: "Acute Severe Orthorexia (80-100%)",
      id: "Ortoreksia Berat Akut (80-100%)",
      de: "Akute Orthorexie",
      fr: "Orthorexie Sévère",
      es: "Ortorexia Severa",
    },
    summary: {
      en: "You are in an acute medical and psychological crisis driven by extreme orthorexia nervosa. Food terror has completely paralyzed your life. Extensive self-starvation in the name of 'health' has caused severe physiological consequences (amenorrhea, cardiac strain, severe hypothermia, immune collapse), alongside total social alienation.",
      id: "Kamu berada dalam krisis medis dan psikologis akut akibat ortoreksia nervosa ekstrem. Teror ketakutan terhadap makanan telah melumpuhkan hidupmu seutuhnya. Menahan lapar dan pembatasan ekstrem atas nama 'kesehatan' telah memicu konsekuensi fisiologis parah (gangguan menstruasi, kelemahan jantung, hipotermia, imunitas anjlok), serta alienasi sosial total.",
      de: "Sie befinden sich in einer lebensbedrohlichen orthorektischen Notlage. Die Angst vor Nahrung beherrscht jede Wachminute. Mangelernährung im Namen der 'Reinheit' hat schwere körperliche Schäden (Hormonstörungen, Herz-Kreislauf-Schwäche, Immunschwäche) und totale Einsamkeit verursacht.",
      fr: "Vous traversez une crise médicale et psychologique majeure liée à une orthorexie dévastatrice. La phobie des aliments paralyse votre existence. La sous-nutrition sous couvert de santé entraîne des risques physiologiques réels (aménorrhée, fragilité cardiaque, effondrement immunitaire) et une rupture relationnelle totale.",
      es: "Te encuentras en una emergencia médica y psicológica provocada por una ortorexia nervosa extrema. El pánico a la comida ha bloqueado tu vida. La desnutrición severa en nombre de la 'salud' ha desatado secuelas fisiológicas graves (alteraciones hormonales, sobrecarga cardíaca, debilidad inmunitaria) y aislamiento total.",
    },
    psychology: {
      en: "Life-Threatening Orthorexic Decompensation: Severe neurobiological starvation syndrome (Minnesota Starvation Study dynamics) where starvation itself heightens obsessive-compulsive traits, requiring urgent coordinated medical, psychiatric, and dietetic stabilization.",
      id: "Dekompenasi Ortoreksia yang Mengancam Jiwa: Sindrom kelaparan neurobiologis berat (dinamika Minnesota Starvation Study) di mana malnutrisi itu sendiri mempertajam gejala obsesif-kompulsif, menuntut stabilisasi medis, psikiatrik, dan nutrisi terpadu segera.",
      de: "Akutes medizinisches Gefahrenstadium: Biologische Hungerdynamiken verstärken die Zwangsgedanken im Sinne des Minnesota-Starvation-Effekts. Dringende interdisziplinäre Notfallversorgung erforderlich.",
      fr: "Décompensation orthorexique grave : L'état de dénutrition entretient et amplifie lui-même les obsessions (syndrome de famine de Minnesota). Une prise en charge médicale et psychiatrique coordonnée est vitale.",
      es: "Descompensación ortoréxica crítica: El estado de inanición biológica magnifica las obsesiones y la rigidez mental. Requiere estabilización urgente coordinada entre medicina interna, psiquiatría y nutrición clínica.",
    },
    actionProtocol: {
      en: [
        "Urgent Medical Intervention: Schedule an immediate appointment with an internal medicine physician or eating disorder clinic for vital signs, ECG, and refeeding assessment.",
        "Multidisciplinary Care Team: Form a specialized team including an eating disorder psychiatrist, a HAES (Health at Every Size) registered dietitian, and an individual therapist.",
        "Break the Orthorexic Silence: Acknowledge to a family member or close friend: 'My pursuit of clean eating has become a severe illness that is destroying my health and life.'",
        "Safe Renourishment Plan: Accept structured meal plans under clinical supervision to safely restore metabolic health and prefrontal cognitive function.",
      ],
      id: [
        "Intervensi Medis Darurat: Segera jadwalkan konsultasi ke dokter spesialis penyakit dalam atau klinik eating disorder untuk pemeriksaan tanda vital, EKG, dan evaluasi malnutrisi.",
        "Tim Perawatan Terpadu: Bentuk tim pendampingan medis yang terdiri dari psikiater spesialis eating disorder, ahli gizi berlisensi, dan psikolog klinis.",
        "Buka Kejujuran pada Orang Terdekat: Akui dengan jujur pada keluarga atau sahabat: 'Obsesiku terhadap makanan sehat telah menjadi penyakit berbahaya yang merusak fisik dan mentalku.'",
        "Rencana Nutrisi Pemulihan Aman: Ikuti rencana makan terstruktur di bawah pengawasan medis untuk memulihkan fungsi metabolik dan fungsi otak kognitifmu secara aman.",
      ],
      de: [
        "Dringende ärztliche Einweisung: Umgehende Vorstellung in einer Fachklinik für Essstörungen oder bei einem Internisten (EKG, Elektrolyte, Refeeding-Risiko).",
        "Interdisziplinäres Behandlungsteam: Begleitung durch Facharzt für Psychiatrie, erfahrene Ernährungstherapeuten und Psychotherapeuten.",
        "Das Schweigen brechen: Gestehen Sie Angehörigen ein: 'Mein Streben nach gesundem Essen ist zu einer lebensgefährlichen Krankheit geworden.'",
        "Strukturierte Wiederernährung: Schrittweiser, medizinisch überwachter Kostaufbau zur Wiederherstellung der Gehirn- und Organfunktion.",
      ],
      fr: [
        "Prise en charge médicale urgente : Consultez sans délai un médecin interniste ou un centre expert des troubles alimentaires (ECG, constantes, bilan biologique).",
        "Équipe pluridisciplinaire : Suivi coordonné par un psychiatre spécialisé, un diététicien clinicien et un psychothérapeute.",
        "Briser l'illusion : Dites à vos proches : 'Ce que je croyais être de la santé est devenu une maladie qui détruit mon corps et ma vie.'",
        "Renutrition progressive sécurisée : Suivez un programme nutritionnel encadré pour restaurer la clarté mentale et les fonctions vitales.",
      ],
      es: [
        "Intervención médica urgente: Acude de inmediato a un centro especializado en trastornos de la conducta alimentaria o a medicina interna (ECG, analítica y constantes).",
        "Equipo interdisciplinar: Coordina tu atención con un psiquiatra especialista, una nutricionista clínica no pesocentrista y un terapeuta.",
        "Pide ayuda a tu entorno: Reconoce ante un ser querido: 'Mi obsesión por comer sano se ha convertido en una enfermedad que está destruyendo mi cuerpo'.",
        "Plan de renutrición tutelado: Acepta un protocolo nutricional pautado para devolver la estabilidad metabólica y la lucidez a tu cerebro.",
      ],
    },
  },
];

export const ORTHOREXIA_SUBSCALE_INFO = {
  dietary_moralization_guilt: {
    name: {
      en: "Dietary Moralization & Guilt",
      id: "Moralisasi Makanan & Rasa Bersalah",
      de: "Moralisierung & Schuldgefühle",
      fr: "Moralisation & Culpabilité Alimentaire",
      es: "Moralización del Plato y Culpa",
    },
    description: {
      en: "Viewing foods as morally pure vs. toxic/dirty, and experiencing intense guilt, self-hatred, or panic after eating unapproved foods.",
      id: "Memandang makanan secara moral suci vs kotor/beracun, serta merasa sangat berdosa dan jijik pada diri sendiri setelah makan di luar aturan.",
      de: "Klassifizierung von Nahrungsmitteln in rein vs. giftig, begleitet von massiver Scham und Ekel nach kleinsten Abweichungen.",
      fr: "Perception des aliments comme vertueux ou souillés, générant un dégoût de soi et de l'angoisse en cas de dérogation.",
      es: "División moral entre alimentos limpios y dañinos, con intensa culpa, autorrechazo o pánico tras consumir algo no permitido.",
    },
  },
  obsessive_ingredient_vigilance: {
    name: {
      en: "Obsessive Ingredient Vigilance",
      id: "Kewaspadaan Bahan Obsesif",
      de: "Zwanghafte Zutatenkontrolle",
      fr: "Vigilance Obsessionnelle des Ingrédients",
      es: "Vigilancia Obsesiva de Ingredientes",
    },
    description: {
      en: "Hours spent scrutinizing labels, obsessing over cooking oils, carrying prepped meals everywhere, and intrusive food thoughts.",
      id: "Menghabiskan waktu berjam-jam membedah label kemasan, mencemaskan jenis minyak, membawa bekal sendiri, dan pikiran makanan terus-menerus.",
      de: "Stundenlanges Studieren von Inhaltsstoffen, Misstrauen gegenüber Speiseölen und ständige gedankliche Besetzung durch Nahrungsfragen.",
      fr: "Temps excessif passé à décortiquer les étiquettes, méfiance envers les modes de cuisson et pensées alimentaires envahissantes.",
      es: "Horas analizando etiquetas, obsesión por los aceites de cocinado, llevar fiambreras a todas partes e hipervigilancia mental continua.",
    },
  },
  nutritional_social_isolation: {
    name: {
      en: "Nutritional Social Isolation",
      id: "Isolasi Sosial & Malnutrisi",
      de: "Soziale Isolation & Mangelernährung",
      fr: "Isolement Social & Dénutrition",
      es: "Aislamiento Social y Desnutrición",
    },
    description: {
      en: "Avoiding shared dining, relationship friction over rigid rules, excluding entire food groups, and suffering chronic fatigue or deficiencies.",
      id: "Menghindari makan bersama, pertengkaran dengan orang terdekat, membuang kelompok makanan pokok, serta mengalami lelah kronis dan malnutrisi.",
      de: "Meiden von Restaurantbesuchen, Beziehungskonflikte durch Ernährungsstrenge, Verzicht auf Hauptnahrungsmittel und chronische Erschöpfung.",
      fr: "Refus des repas partagés, conflits relationnels, élimination de groupes entiers d'aliments et fatigue chronique consécutive.",
      es: "Evitación de comidas sociales, tensiones de pareja por la rigidez, eliminación de grupos básicos de alimentos y fatiga persistente.",
    },
  },
};

export function getOrthorexiaResult(totalScore: number): OrthorexiaResultLevel {
  const clamped = Math.max(0, Math.min(36, totalScore));
  return (
    ORTHOREXIA_RESULTS.find(
      (r) => clamped >= r.scoreRange[0] && clamped <= r.scoreRange[1]
    ) || ORTHOREXIA_RESULTS[0]
  );
}

export function calculateOrthorexiaSubscales(answers: Record<number, number>): {
  dietary_moralization_guilt: number;
  obsessive_ingredient_vigilance: number;
  nutritional_social_isolation: number;
} {
  let dmg = 0;
  let oiv = 0;
  let nsi = 0;

  ORTHOREXIA_QUESTIONS.forEach((q) => {
    const score = answers[q.id] ?? 0;
    if (q.subscale === "dietary_moralization_guilt") dmg += score;
    if (q.subscale === "obsessive_ingredient_vigilance") oiv += score;
    if (q.subscale === "nutritional_social_isolation") nsi += score;
  });

  return {
    dietary_moralization_guilt: dmg,
    obsessive_ingredient_vigilance: oiv,
    nutritional_social_isolation: nsi,
  };
}
