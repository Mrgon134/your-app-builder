export type PmddCardLang = "en" | "id" | "de" | "fr" | "es";

export interface PmddQuestion {
  id: number;
  subscale:
    | "luteal_affective_lability_rage"
    | "interpersonal_friction_rejection_pain"
    | "somatic_cognitive_exhaustion_rapid_remission";
  text: Record<PmddCardLang, string>;
}

export interface PmddResultLevel {
  level:
    | "stable_cyclical_equilibrium"
    | "mild_premenstrual_symptom_sensitivity"
    | "moderate_luteal_dysphoric_reactivity"
    | "high_clinical_pmdd_probability"
    | "acute_severe_neuroendocrine_pmdd_crisis";
  scoreRange: [number, number];
  title: Record<PmddCardLang, string>;
  badge: Record<PmddCardLang, string>;
  summary: Record<PmddCardLang, string>;
  psychology: Record<PmddCardLang, string>;
  actionProtocol: Record<PmddCardLang, string[]>;
}

export const PMDD_QUESTIONS: PmddQuestion[] = [
  // 1. Luteal Affective Lability & Rage
  {
    id: 1,
    subscale: "luteal_affective_lability_rage",
    text: {
      en: "In the 7 to 10 days before your menstrual period starts, you experience sudden, explosive rage, extreme irritability, or crying spells that feel completely out of proportion to the trigger.",
      id: "Dalam 7 hingga 10 hari sebelum menstruasi dimulai, kamu mengalami ledakan amarah tiba-tiba, iritabilitas ekstrem, atau tangisan hebat yang terasa sangat tidak sebanding dengan pemicunya.",
      de: "In den 7 bis 10 Tagen vor Beginn der Menstruation erleben Sie plötzliche, explosive Wutausbrüche, extreme Reizbarkeit oder Weinkrämpfe, die völlig außer Verhältnis zum Auslöser stehen.",
      fr: "Dans les 7 à 10 jours précédant vos règles, vous éprouvez des accès de rage soudains, une irritabilité explosive ou des crises de larmes disproportionnées par rapport à l'événement.",
      es: "En los 7 a 10 días previos a la menstruación, experimentas accesos repentinos de ira, irritabilidad extrema o llantos desconsolados desmesurados respecto al detonante.",
    },
  },
  // 2. Interpersonal Friction & Rejection Pain
  {
    id: 2,
    subscale: "interpersonal_friction_rejection_pain",
    text: {
      en: "During your premenstrual phase, you become intensely hyper-sensitive to perceived rejection, feeling convinced that your partner, friends, or colleagues secretly dislike or want to abandon you.",
      id: "Saat fase pramenstruasi, kamu menjadi sangat sensitif terhadap rasa penolakan, merasa yakin bahwa pasangan, sahabat, atau rekan kerjamu diam-diam membencimu atau ingin meninggalkanmu.",
      de: "Während der Lutealphase reagieren Sie extrem empfindlich auf Zurückweisung und sind überzeugt, dass Partner, Freunde oder Kollegen Sie insgeheim ablehnen.",
      fr: "Pendant la phase lutéale, vous devenez hypersensible au rejet, avec la conviction douloureuse que votre entourage ou vos collègues ne vous aiment plus et vont vous abandonner.",
      es: "Durante tu fase lútea te vuelves hipersensible al rechazo, convenciéndote de que tu pareja, amistades o compañeros te desprecian o desean alejarse de ti.",
    },
  },
  // 3. Somatic & Cognitive Exhaustion & Rapid Remission
  {
    id: 3,
    subscale: "somatic_cognitive_exhaustion_rapid_remission",
    text: {
      en: "Within 24 to 48 hours after your menstrual flow actually begins, the overwhelming mental fog, despair, and emotional rage vanish completely, leaving you feeling like yourself again.",
      id: "Dalam kurun 24 hingga 48 jam setelah darah haid benar-benar keluar, kabut otak yang pekat, keputusasaan, dan amarah mendadak lenyap total, membuatmu merasa normal kembali.",
      de: "Innerhalb von 24 bis 48 Stunden nach Einsetzen der Menstruationsblutung verschwinden die innere Schwärze, Gehirnnebel und Verzweiflung wie weggeblasen.",
      fr: "Dans les 24 à 48 heures suivant l'arrivée effective du flux menstruel, le brouillard mental, le désespoir et la rage s'évanouissent complètement, vous redonnant votre clarté habituelle.",
      es: "A las 24-48 horas de iniciarse el sangrado menstrual, la niebla mental, la desesperanza y la ira desaparecen por completo, devolviéndote la calma habitual.",
    },
  },
  // 4. Luteal Affective Lability & Rage
  {
    id: 4,
    subscale: "luteal_affective_lability_rage",
    text: {
      en: "You experience terrifying waves of hopelessness, intense worthlessness, self-hatred, or fleeting passive suicidal ideation that only occur during the week or two before your period.",
      id: "Kamu mengalami gelombang keputusasaan yang menakutkan, rasa tidak berharga, benci diri sendiri, atau pikiran ingin menghilang yang hanya muncul di 1-2 minggu sebelum haid.",
      de: "Sie erleben beängstigende Wellen von Hoffnungslosigkeit, Selbsthass oder Gedanken an Lebensmüdigkeit, die ausschließlich in den ein bis zwei Wochen vor der Periode auftreten.",
      fr: "Vous traversez des vagues angoissantes de désespoir, de dégoût de vous-même ou d'idées noires qui surviennent uniquement durant les deux semaines précédant vos règles.",
      es: "Sufres oleadas aterradoras de desesperanza, desprecio hacia ti misma o pensamientos pasivos de no querer existir que solo ocurren en las dos semanas previas a la regla.",
    },
  },
  // 5. Interpersonal Friction & Rejection Pain
  {
    id: 5,
    subscale: "interpersonal_friction_rejection_pain",
    text: {
      en: "You repeatedly have the intense urge to destroy your relationships, break up with your partner, or quit your job during your luteal phase, followed by remorse once your period starts.",
      id: "Kamu berulang kali merasakan dorongan kuat untuk merusak hubungan, memutuskan pasangan, atau mengundurkan diri dari pekerjaan saat fase luteal, lalu menyesal setelah haid datang.",
      de: "Sie verspüren vor der Periode den Drang, Beziehungen abzubrechen oder den Job zu kündigen, was Sie bitter bereuen, sobald die Blutung einsetzt.",
      fr: "Vous ressentez le besoin irrépressible de saboter vos relations, de rompre ou de démissionner en phase lutéale, avant d'éprouver des remords dès l'arrivée des règles.",
      es: "Sientes el impulso visceral de romper con tu pareja, distanciarte de todos o dejar tu trabajo en la fase lútea, arrepintiéndote en cuanto empieza el periodo.",
    },
  },
  // 6. Somatic & Cognitive Exhaustion & Rapid Remission
  {
    id: 6,
    subscale: "somatic_cognitive_exhaustion_rapid_remission",
    text: {
      en: "You suffer from crushing, debilitating fatigue and brain fog before your period where simple decisions, reading an email, or speaking require monumental physical effort.",
      id: "Kamu mengalami kelelahan fisik luar biasa dan kabut otak menjelang haid, hingga keputusan sederhana, membaca pesan, atau berbicara membutuhkan tenaga yang amat berat.",
      de: "Sie leiden vor der Periode unter lähmender Erschöpfung und Gehirnnebel, sodass einfache Entscheidungen oder das Lesen einer Nachricht monumentale Anstrengung kosten.",
      fr: "Vous souffrez d'un épuisement physique écrasant et d'un brouillard cognitif intense avant vos règles, rendant la moindre décision ou lecture d'e-mail harassante.",
      es: "Padeces una fatiga demoledora y niebla mental antes del periodo, donde tomar una simple decisión o leer un mensaje exige un esfuerzo sobrehumano.",
    },
  },
  // 7. Luteal Affective Lability & Rage
  {
    id: 7,
    subscale: "luteal_affective_lability_rage",
    text: {
      en: "You feel an excruciating internal tension or anxiety, like your nervous system is trapped on high alert, vibrating with panic or dread without any objective danger.",
      id: "Kamu merasakan ketegangan batin atau kecemasan yang menyiksa, seolah sistem sarafmu terjebak dalam mode siaga merah dengan debar panik tanpa bahaya nyata.",
      de: "Sie spüren eine unerträgliche innere Anspannung oder Angst, als befände sich Ihr Nervensystem im Ausnahmezustand ohne jede äußere Gefahr.",
      fr: "Vous ressentez une tension intérieure intenable, comme si votre système nerveux était bloqué en alerte maximale avec une anxiété sourde sans cause réelle.",
      es: "Sientes una tensión interna asfixiante o taquicardia ansiosa, como si tu sistema nervioso estuviese atrapado en alerta roja sin motivo aparente.",
    },
  },
  // 8. Interpersonal Friction & Rejection Pain
  {
    id: 8,
    subscale: "interpersonal_friction_rejection_pain",
    text: {
      en: "Small comments or constructive feedback from others that you would easily brush off during the rest of the month trigger devastating emotional agonizing or severe arguments.",
      id: "Kritik kecil atau komentar santai yang biasanya bisa kamu abaikan di hari-hari lain justru memicu rasa sakit hati yang menyiksa atau pertengkaran sengit.",
      de: "Kleine Bemerkungen oder Kritik, die Sie sonst gelassen nehmen, lösen vor der Menstruation tiefe Kränkung oder heftige Konflikte aus.",
      fr: "Des remarques anodines ou des conseils constructifs qui vous laisseraient d'ordinaire indifférente provoquent des blessures vives ou de violentes disputes.",
      es: "Comentarios intrascendentes o críticas constructivas que en otros momentos no te importarían desatan un dolor emocional desgarrador o discusiones encarnizadas.",
    },
  },
  // 9. Somatic & Cognitive Exhaustion & Rapid Remission
  {
    id: 9,
    subscale: "somatic_cognitive_exhaustion_rapid_remission",
    text: {
      en: "You experience extreme premenstrual physical symptoms: painful breast swelling, acute abdominal bloating, joint or muscle aches, or severe sleep disturbances (insomnia or hypersomnia).",
      id: "Kamu mengalami gejala fisik pramenstruasi yang ekstrem: payudara bengkak dan nyeri, kembung perut parah, nyeri sendi/otot, atau gangguan tidur hebat (insomnia atau tidur terus).",
      de: "Sie leiden unter schweren körperlichen Symptomen: schmerzhaftes Brustspannen, starkes Völlegefühl, Gliederschmerzen oder ausgeprägte Schlafstörungen.",
      fr: "Vous endurez des symptômes somatiques prononcés : seins très douloureux, ballonnement abdominal aigu, courbatures articulaires ou insomnie/hypersomnie sévère.",
      es: "Presentas síntomas físicos muy intensos: dolor e inflamación mamaria aguda, hinchazón abdominal pronunciada, dolores musculares o insomnio severo.",
    },
  },
  // 10. Luteal Affective Lability & Rage
  {
    id: 10,
    subscale: "luteal_affective_lability_rage",
    text: {
      en: "You feel like an entirely different person takes over your mind and body each month—a 'Dr. Jekyll and Mr. Hyde' transformation that leaves you frightened of your own emotional intensity.",
      id: "Kamu merasa seperti dirasuki kepribadian yang sama sekali berbeda setiap bulan—perubahan ala 'Dr. Jekyll and Mr. Hyde' yang membuatmu takut pada intensitas emosimu sendiri.",
      de: "Sie fühlen sich jeden Monat wie von einer fremden Person gesteuert – ein 'Dr. Jekyll und Mr. Hyde'-Zustand, der Ihnen selbst Angst macht.",
      fr: "Vous avez l'impression qu'une autre personne prend possession de votre corps chaque mois – un dédoublement 'Dr Jekyll et Mr Hyde' qui vous effraie vous-même.",
      es: "Sientes que una persona desconocida toma el control de tu mente cada mes: una transformación 'Dr. Jekyll y Mr. Hyde' que te asusta por su violencia emocional.",
    },
  },
  // 11. Interpersonal Friction & Rejection Pain
  {
    id: 11,
    subscale: "interpersonal_friction_rejection_pain",
    text: {
      en: "You consciously withdraw and isolate yourself completely from family, friends, or social media for days before your period because interacting feels painfully overstimulating or dangerous.",
      id: "Kamu secara sadar menarik diri dan mengisolasi diri total dari keluarga, sahabat, atau media sosial berhari-hari sebelum haid karena interaksi terasa terlalu bising dan menyakitkan.",
      de: "Sie ziehen sich vor der Menstruation komplett zurück und meiden soziale Kontakte, weil Interaktionen schmerzhaft überfordernd wirken.",
      fr: "Vous vous isolez délibérément de vos proches et coupez les réseaux sociaux avant vos règles car toute interaction devient une surstimulation insupportable.",
      es: "Te aíslas voluntariamente de tu familia, amigos o redes sociales durante días antes del periodo porque interactuar te sobrecarga dolorosamente.",
    },
  },
  // 12. Somatic & Cognitive Exhaustion & Rapid Remission
  {
    id: 12,
    subscale: "somatic_cognitive_exhaustion_rapid_remission",
    text: {
      en: "This cyclical pattern has occurred across most menstrual cycles over the past year, significantly damaging your career, romantic relationships, or maternal confidence.",
      id: "Pola siklus bulanan ini telah terjadi di hampir setiap siklus menstruasi selama setahun terakhir, merugikan karier, keharmonisan asmara, atau rasa percaya dirimu sebagai ibu/individu.",
      de: "Dieses zyklische Muster trat im vergangenen Jahr in den meisten Zyklen auf und hat Partnerschaft, Beruf oder Ihr Selbstwertgefühl spürbar geschädigt.",
      fr: "Ce schéma cyclique s'est reproduit sur la majorité de vos cycles l'année écoulée, perturbant lourdement votre vie professionnelle, affective ou familiale.",
      es: "Este patrón cíclico se ha repetido en casi todos tus ciclos del último año, perjudicando tu trayectoria laboral, tu vida de pareja o tu autoestima.",
    },
  },
];

export const PMDD_RESULT_LEVELS: PmddResultLevel[] = [
  {
    level: "stable_cyclical_equilibrium",
    scoreRange: [0, 7],
    title: {
      en: "Stable Cyclical Equilibrium & Normal Luteal Adaptation",
      id: "Keseimbangan Siklus Stabil & Adaptasi Luteal Alami",
      de: "Stabiles zyklisches Gleichgewicht & normale Lutealadaptation",
      fr: "Équilibre cyclique stable & adaptation lutéale physiologique",
      es: "Equilibrio cíclico estable y adaptación lútea natural",
    },
    badge: {
      en: "HEALTHY GABA-A ALLOPREGNANOLONE RESPONSE",
      id: "RESPON GABA-A & ALLOPREGNANOLON STABIL",
      de: "GESUNDE GABA-A-REZEPTORFUNKTION",
      fr: "RÉCEPTIVITÉ GABAERGIQUE ÉQUILIBRÉE",
      es: "SENSIBILIDAD GABA-A EQUILIBRADA",
    },
    summary: {
      en: "Your mood and emotional regulation remain remarkably stable across your menstrual cycle. While you may notice mild physical body cues before your period, your neuroendocrine system adapts smoothly without depressive crashes or rage.",
      id: "Suasana hati dan kendali emosimu sangat stabil di seluruh fase siklus menstruasi. Kamu mungkin merasakan sinyal fisik ringan sebelum haid, namun sistem neuroendokrinmu beradaptasi dengan mulus tanpa depresi atau ledakan amarah.",
      de: "Ihre Stimmung und emotionale Belastbarkeit bleiben über den gesamten Zyklus hinweg stabil. Vor der Menstruation bemerken Sie allenfalls normale körperliche Veränderungen ohne psychische Krisen.",
      fr: "Votre humeur et votre régulation émotionnelle demeurent très stables tout au long du cycle. Vous ressentez peut-être de légers signes physiques, mais sans rupture dépressive ni accès de rage.",
      es: "Tu estado de ánimo y templanza emocional se mantienen sólidos a lo largo de todo el ciclo. Percibes cambios corporales menores antes de la regla sin descompensación afectiva.",
    },
    psychology: {
      en: "Your GABA-A receptors adapt smoothly to late-luteal fluctuations in progesterone and allopregnanolone. The prefrontal cortex maintains inhibitory control over the amygdala without serotonergic transporter dysfunction.",
      id: "Reseptor GABA-A di otakmu mampu menyesuaikan diri dengan fluktuasi hormon progesteron dan allopregnanolon di fase akhir luteal. Korteks prefrontal tetap mengontrol amigdala dengan tenang tanpa gangguan transporter serotonin.",
      de: "Ihre GABA-A-Rezeptoren passen sich den lutealen Schwankungen von Progesteron und Allopregnanolon harmonisch an. Der präfrontale Kortex behält die Kontrolle über die Amygdala.",
      fr: "Vos récepteurs GABA-A s'ajustent avec souplesse aux variations de progestérone et d'allopregnanolone. Le cortex préfrontal préserve son contrôle inhibiteur sur l'amygdale.",
      es: "Tus receptores GABA-A procesan sin anomalías las caídas de progesterona y alopregnanolona. La corteza prefrontal modula la amígdala sin alteraciones de la recaptación de serotonina.",
    },
    actionProtocol: {
      en: [
        "Track your menstrual cycle using a simple calendar to predict low-energy days and honor your natural rhythmic ebb and flow.",
        "Maintain adequate magnesium glycinate and complex carbohydrates during your luteal phase to support natural serotonin synthesis.",
        "Engage in restorative somatic practices (gentle walks, restorative yoga) during the 3 days preceding menstruation.",
      ],
      id: [
        "Catat siklus menstruasimu di kalender sederhana untuk memetakan hari-hari berenergi rendah dan menghormati ritme alami tubuhmu.",
        "Pastikan asupan magnesium glisinat dan karbohidrat kompleks cukup di fase luteal untuk mendukung produksi alami serotonin.",
        "Lakukan relaksasi somatik ringan (jalan santai, yoga restoratif) dalam 3 hari menjelang dimulainya haid.",
      ],
      de: [
        "Nutzen Sie einen Zykluskalender, um Tage mit geringerer Energie einzuplanen und Ihrem biologischen Rhythmus Raum zu geben.",
        "Unterstützen Sie die Serotoninproduktion in der Lutealphase durch Magnesiumglycinat und vollwertige Kohlenhydrate.",
        "Gönnen Sie sich in den 3 Tagen vor der Periode regenerierende Bewegung wie Spaziergänge oder sanftes Dehnen.",
      ],
      fr: [
        "Notez vos cycles sur un calendrier pour anticiper les baisses naturelles d'énergie et respecter votre horloge biologique.",
        "Consommez du bisglycinate de magnésium et des glucides complets en phase lutéale pour soutenir la synthèse de sérotonine.",
        "Pratiquez des étirements doux ou de la marche en nature durant les 3 jours qui précèdent le flux.",
      ],
      es: [
        "Lleva un seguimiento de tu ciclo para respetar los días de menor energía y acompasarte a tu ritmo hormonal.",
        "Asegura magnesio y carbohidratos complejos en la fase lútea para favorecer la producción de serotonina.",
        "Dedica los 3 días previos al sangrado a paseos suaves o yoga restaurativo sin autoexigencias.",
      ],
    },
  },
  {
    level: "mild_premenstrual_symptom_sensitivity",
    scoreRange: [8, 14],
    title: {
      en: "Mild Premenstrual Syndrome (PMS) Sensitivity",
      id: "Sensitivitas Sindrom Pramenstruasi (PMS) Ringan",
      de: "Leichte prämenstruelle Sensitivität (PMS)",
      fr: "Sensibilité prémenstruelle modérée (SPM classique)",
      es: "Sensibilidad premenstrual leve (síndrome premenstrual común)",
    },
    badge: {
      en: "PHYSIOLOGICAL PMS SYMPTOM PROFILE",
      id: "PROFIL PMS FISIOLOGIS BIASA",
      de: "PHYSIOLOGISCHES PMS-PROFIL",
      fr: "PROFIL SPM PHYSIOLOGIQUE STANDARD",
      es: "PATRÓN DE SPM FISIOLÓGICO",
    },
    summary: {
      en: "You experience typical premenstrual symptoms: mild water retention, fatigue, transient sweet cravings, and slight irritability. These fluctuations cause brief discomfort but do not derail your relationships or cause despair.",
      id: "Kamu mengalami gejala umum sindrom pramenstruasi (PMS): sedikit retensi air, rasa lelah, keinginan makan manis, dan sedikit mudah tersinggung. Ini menimbulkan ketidaknyamanan sesaat, namun tidak merusak relasi atau menimbulkan keputusasaan.",
      de: "Sie erleben typische PMS-Symptome: leichte Wassereinlagerungen, Müdigkeit, Heißhunger und etwas Reizbarkeit. Dies ist lästig, beeinträchtigt aber nicht dauerhaft Ihre Beziehungen oder Leistungsfähigkeit.",
      fr: "Vous présentez les symptômes classiques du syndrome prémenstruel : rétention d'eau, fatigue, fringales sucrées et sensibilité passagère. Ces désagréments restent gérables au quotidien.",
      es: "Experimentas síntomas clásicos de SPM: retención de líquidos, cansancio, antojos de dulce e irritabilidad pasajera. Resulta molesto pero no compromete tus vínculos ni tu bienestar básico.",
    },
    psychology: {
      en: "Your nervous system senses the normal drop in luteal progesterone, causing a slight temporary dip in central GABAergic tone. However, prefrontal emotional circuits quickly compensate without pathological neuroinflammation.",
      id: "Sistem sarafmu merespons penurunan normal hormon progesteron di akhir siklus dengan sedikit penurunan tonus GABA. Meski begitu, sirkuit emosi otak depan dapat mengimbanginya tanpa memicu depresi patologis.",
      de: "Ihr Nervensystem reagiert auf das normale Absinken des Progesteronspiegels mit einer kurzen Senkung der GABAergen Dämpfung, die jedoch rasch kompensiert wird.",
      fr: "Votre système nerveux enregistre la baisse lutéale de progestérone par un léger fléchissement du tonus GABA, vite jugulé par vos ressources de régulation.",
      es: "Tu sistema nervioso acusa la caída fisiológica de progesterona con un leve bajón gabaérgico temporal que tus circuitos frontales compensan con normalidad.",
    },
    actionProtocol: {
      en: [
        "Reduce caffeine and excess sodium during the 5 days before your period to prevent irritability spikes and breast tenderness.",
        "Supplement with Vitamin B6 (pyridoxine) and Calcium, which clinical trials show alleviate physical PMS tension.",
        "Practice clear, gentle boundary-setting: Communicate to loved ones when you need a quiet evening to rest.",
      ],
      id: [
        "Kurangi kafein dan konsumsi garam berlebih selama 5 hari sebelum haid untuk mencegah ledakan sensitivitas dan nyeri payudara.",
        "Pertimbangkan asupan Vitamin B6 dan Kalsium yang terbukti secara klinis meredakan ketegangan fisik PMS.",
        "Komunikasikan batasan diri secara lembut: beri tahu pasangan atau keluarga saat kamu butuh waktu istirahat yang lebih tenang.",
      ],
      de: [
        "Reduzieren Sie Koffein und Kochsalz 5 Tage vor der Periode, um Reizbarkeit und Brustspannen vorzubeugen.",
        "Erwägen Sie Vitamin B6 und Calcium, die in Studien typische PMS-Beschwerden nachweislich lindern.",
        "Setzen Sie sanfte Grenzen und kündigen Sie Ihrem Umfeld an, wenn Sie abends Ruhe brauchen.",
      ],
      fr: [
        "Réduisez le café et l'excès de sel 5 jours avant les règles pour prévenir la tension mammaire et l'énervement.",
        "Pensez à un apport en vitamine B6 et calcium, dont l'efficacité sur le SPM est cliniquement documentée.",
        "Posez des limites sereines : prévenez vos proches lorsque vous avez besoin d'une soirée de décompression en solo.",
      ],
      es: [
        "Reduce el consumo de cafeína y exceso de sal 5 días antes de la regla para atenuar la tensión mamaria y la irritabilidad.",
        "Considera suplementar con vitamina B6 y calcio, con eficacia avalada en ensayos clínicos sobre el SPM.",
        "Comunica con asertividad y cariño a tu entorno que precisas noches más tranquilas para recargar energías.",
      ],
    },
  },
  {
    level: "moderate_luteal_dysphoric_reactivity",
    scoreRange: [15, 21],
    title: {
      en: "Moderate Luteal Dysphoric Reactivity & Borderline PMDD",
      id: "Reaktivitas Disforia Luteal Sedang & Batas Klinis PMDD",
      de: "Moderate luteale dysphorische Reaktivität & PMDD-Grenzbereich",
      fr: "Réactivité dysphorique lutéale modérée & zone limite de TDPM",
      es: "Reactividad disfórica lútea moderada y umbral de TDPM",
    },
    badge: {
      en: "SUB-CLINICAL LUTEAL DYSPHORIA",
      id: "DISFORIA LUTEAL SUB-KLINIS",
      de: "SUBKLINISCHE LUTEALE DYSPHORIE",
      fr: "DYSPHORIE LUTÉALE SUBCLINIQUE",
      es: "DISFORIA LÚTEA SUBCLÍNICA",
    },
    summary: {
      en: "Your premenstrual phase is accompanied by pronounced emotional shifts: sudden bouts of crying, acute irritability, hypervigilance to criticism, and heavy brain fog. While you manage to hold work together, your interpersonal peace and self-esteem suffer monthly.",
      id: "Fase pramenstruasimu disertai pergeseran emosi yang cukup tajam: mudah menangis tiba-tiba, amarah yang cepat tersulut, ketakutan berlebih terhadap penolakan, dan kabut otak pekat. Meski kamu berusaha tetap profesional, hubungan pribadi dan rasa percaya dirimu terluka setiap bulan.",
      de: "Ihre zweite Zyklushälfte ist von spürbaren emotionalen Turbulenzen geprägt: Weinerlichkeit, Reizbarkeit, Überempfindlichkeit und Gehirnnebel belasten monatlich Partnerschaft und Selbstwert.",
      fr: "Votre phase lutéale s'accompagne de secousses affectives marquées : crises de larmes, impatience vive, hypersensibilité aux critiques et brouillard mental qui altèrent vos relations.",
      es: "Tu fase lútea viene acompañada de turbulencias notorias: llanto repentino, ira a flor de piel, hipervigilancia a las críticas y niebla mental que resienten tus relaciones y tu autoestima.",
    },
    psychology: {
      en: "Unlike standard PMS, your brain exhibits heightened vulnerability to rapid drops in allopregnanolone. The amygdala becomes hyper-reactive to social stress cues during the late luteal phase, blunting normal cognitive inhibition from the dorsolateral prefrontal cortex.",
      id: "Berbeda dengan PMS biasa, otakmu memiliki kerentanan lebih tinggi terhadap penurunan drastis allopregnanolon. Amigdala menjadi sangat reaktif terhadap stres sosial di fase luteal akhir, melemahkan kemampuan kendali logis di korteks prefrontal.",
      de: "Im Unterschied zu normalem PMS reagiert Ihr Gehirn empfindlich auf allopregnanolonbedingte Umschaltungen. Die Amygdala feuert bei zwischenmenschlichen Reizen überaktiv.",
      fr: "Contrairement au simple SPM, votre cerveau manifeste une sensibilité accrue aux fluctuations d'allopregnanolone. L'amygdale s'emballe face aux micro-stress relationnels en fin de cycle.",
      es: "A diferencia del SPM convencional, tu cerebro muestra hipersensibilidad a las variaciones de alopregnanolona. La amígdala reacciona con desmesura ante estímulos sociales en la fase lútea tardía.",
    },
    actionProtocol: {
      en: [
        "Begin two full cycles of DRSP (Daily Record of Severity of Problems) symptom tracking to clinically document luteal vs. follicular mood differences.",
        "Schedule 'Luteal Buffer Days': Avoid major life decisions, relationship ultimatums, or intense social gatherings 3–5 days before your period.",
        "Discuss Chasteberry (Vitex agnus-castus) or targeted SSRI luteal-phase micro-dosing with your gynecologist or functional physician.",
      ],
      id: [
        "Mulai catat gejala harian menggunakan skala DRSP (Daily Record of Severity of Problems) selama 2 siklus penuh untuk mendokumentasikan perbedaan emosi fase luteal vs folikular.",
        "Terapkan 'Hari Penyangga Luteal': tunda keputusan hidup besar, pembicaraan asmara yang berat, atau acara sosial padat di 3–5 hari sebelum haid.",
        "Konsultasikan penggunaan Vitex (chasteberry) atau opsi medis khusus fase luteal dengan dokter kandungan atau spesialis kesehatan wanita.",
      ],
      de: [
        "Führen Sie zwei Zyklen lang ein DRSP-Symptomtagebuch, um den Unterschied zwischen Luteal- und Follikelphase exakt zu dokumentieren.",
        "Schaffen Sie 'Luteale Schutzzonen': Verschieben Sie wichtige Entscheidungen und Konfliktgespräche 3–5 Tage vor der Periode.",
        "Besprechen Sie mit Ihrer Gynäkologin Möglichkeiten wie Mönchspfeffer (Vitex agnus-castus) oder zyklusbegleitende Mikrodosierungen.",
      ],
      fr: [
        "Tenez un relevé quotidien DRSP sur 2 cycles complets pour objectiver la scission entre phase lutéale et folliculaire.",
        "Planifiez des 'jours tampons lutéaux' : évitez les décisions majeures et les discussions de couple explosives 3 à 5 jours avant les règles.",
        "Échangez avec votre gynécologue au sujet du gattilier (Vitex agnus-castus) ou d'une prise en charge médicale ciblée sur la phase lutéale.",
      ],
      es: [
        "Registra tus síntomas con la escala DRSP durante dos ciclos completos para constatar la brecha entre fase lútea y folicular.",
        "Crea 'días de amortiguación lútea': aplaza decisiones trascendentales, rupturas o eventos sociales intensos 3-5 días antes de la menstruación.",
        "Consulta con tu ginecólogo opciones fitoterápicas como el sauzgatillo (Vitex agnus-castus) o microdosis específicas para la fase lútea.",
      ],
    },
  },
  {
    level: "high_clinical_pmdd_probability",
    scoreRange: [22, 28],
    title: {
      en: "High Clinical Probability of Premenstrual Dysphoric Disorder (PMDD)",
      id: "Probabilitas Klinis Tinggi Premenstrual Dysphoric Disorder (PMDD)",
      de: "Hohe klinische Wahrscheinlichkeit für PMDD (Prämenstruelle Dysphorische Störung)",
      fr: "Forte probabilité clinique de trouble dysphorique prémenstruel (TDPM)",
      es: "Alta probabilidad clínica de Trastorno Disfórico Premenstrual (TDPM)",
    },
    badge: {
      en: "CLINICAL PMDD PROFILE (DSM-5 / STEINER DRSP)",
      id: "PROFIL PMDD KLINIS (KRITERIA DSM-5 & STEINER)",
      de: "KLINISCHES PMDD-PROFIL (DSM-5 / DRSP)",
      fr: "PROFIL TDPM CLINIQUE (DSM-5 / STEINER)",
      es: "PERFIL CLÍNICO DE TDPM (DSM-5 / STEINER)",
    },
    summary: {
      en: "Your scores strongly align with clinical criteria for Premenstrual Dysphoric Disorder (PMDD). Each month you endure debilitating mood swings, volcanic rage, severe rejection dysphoria, and crushing despair that evaporate almost miraculously within 24–48 hours of your period starting.",
      id: "Skormu sangat sesuai dengan kriteria klinis Premenstrual Dysphoric Disorder (PMDD). Setiap bulan kamu menahan derita perubahan emosi yang melumpuhkan, amarah meledak-ledak, keputusasaan pekat, yang secara ajaib lenyap seketika dalam kurun 24–48 jam setelah darah haid mengalir.",
      de: "Ihre Ergebnisse stimmen mit den klinischen Kriterien der Prämenstruellen Dysphorischen Störung (PMDD) überein. Sie durchleben monatlich lähmende Wut, Verzweiflung und Entfremdung, die kurz nach dem Einsetzen der Blutung schlagartig weichen.",
      fr: "Vos réponses correspondent aux critères diagnostiques du trouble dysphorique prémenstruel (TDPM). Chaque mois, vous subissez une rage destructrice, une angoisse d'abandon et une détresse profonde qui s'effacent comme par enchantement dès le début du flux.",
      es: "Tus puntuaciones coinciden con los criterios diagnósticos del Trastorno Disfórico Premenstrual (TDPM). Cada mes atraviesas ira volcánica, rechazo lacerante y desesperanza que se evaporan milagrosamente a las 24-48 horas de sangrar.",
    },
    psychology: {
      en: "PMDD is not an 'estrogen or progesterone deficiency'—your hormone levels are typical. Instead, it is an abnormal neurobiological cellular sensitivity to normal neurosteroid flux. When allopregnanolone drops, your GABA-A receptor alpha-4 subunits fail to down-regulate, inducing severe central neurochemical panic and serotonin transporter alterations.",
      id: "PMDD bukanlah 'kekurangan hormon'—kadar estrogen dan progesteronmu normal di laboratorium. PMDD adalah hipersensitivitas neurobiologis seluler abnormal terhadap fluktuasi neurosteroid alami. Saat allopregnanolon turun, subunit alfa-4 reseptor GABA-A gagal beradaptasi, memicu kepanikan neurokimiawi hebat di otak.",
      de: "PMDD ist kein einfacher Hormonmangel – Ihre Hormonspiegel sind laborchemisch normal. Es handelt sich um eine zelluläre Überempfindlichkeit des Gehirns gegenüber normalen Neurosteroid-Schwankungen, bei der GABA-A-Rezeptoren paradox reagieren.",
      fr: "Le TDPM n'est pas un déficit hormonal classique : vos dosages sont biologiquement normaux. Il s'agit d'une hypersensibilité cellulaire neurogénétique aux neurostéroïdes, où la chute d'allopregnanolone désynchronise les récepteurs GABA-A et la sérotonine.",
      es: "El TDPM no es una deficiencia hormonal común: tus niveles en analíticas son normales. Es una hipersensibilidad neurobiológica celular anómala ante la fluctuación de neuroesteroides, que bloquea los receptores GABA-A y desregula la serotonina.",
    },
    actionProtocol: {
      en: [
        "Take your DRSP tracking logs to an informed OB/GYN or reproductive psychiatrist (bring printouts of DSM-5 PMDD diagnostic criteria).",
        "Investigate evidence-based first-line treatments: Luteal-phase intermittent SSRI dosing (e.g., fluoxetine or sertraline taken only from ovulation to menses) or continuous monophasic oral contraceptives that suppress ovulation.",
        "Establish an absolute 'No Relationship Explosions' rule: Never send critical breakup texts or initiate confrontations during your symptomatic luteal days.",
      ],
      id: [
        "Bawa catatan gejala DRSP dan lembar kriteria diagnosis DSM-5 PMDD ke dokter spesialis kandungan (Sp.OG) atau psikiater yang memahami kesehatan reproduksi wanita.",
        "Diskusikan terapi lini pertama berbasis bukti: pemberian SSRI intermiten khusus fase luteal (diminum hanya sejak ovulasi hingga hari pertama haid) atau pil kontrasepsi penekan ovulasi.",
        "Buat aturan mutlak 'Anti-Keputusan Emosional': jangan pernah mengirim pesan putus, mengonfrontasi pasangan, atau membuat keputusan radikal di hari-hari lutealmu.",
      ],
      de: [
        "Suchen Sie mit Ihrem DRSP-Zyklusprotokoll eine gynäkologische oder psychiatrische Fachpraxis auf (unter Vorlage der DSM-5-Kriterien).",
        "Besprechen Sie evidenzbasierte Erstlinientherapien: Lutealphasen-spezifische SSRI-Gabe (nur zwischen Eisprung und Menstruation) oder ovulationsunterdrückende Präparate.",
        "Etablieren Sie die strikte Regel: Keine Kündigungen, Trennungen oder Beziehungsdramen in den kritischen Tagen vor der Periode einleiten.",
      ],
      fr: [
        "Présentez vos relevés DRSP à un gynécologue ou psychiatre formé aux troubles hormonaux (avec les critères DSM-5 du TDPM).",
        "Évaluez les traitements de première ligne : prise intermittente d'ISRS en phase lutéale uniquement (de l'ovulation aux règles) ou pilule monophasique en continu.",
        "Instaurez la règle d'or : aucune rupture sentimentale, aucune démission ni confrontation majeure durant vos jours lutéaux à risque.",
      ],
      es: [
        "Lleva tus registros del DRSP a una consulta de ginecología o psiquiatría reproductiva (con los criterios formales del DSM-5).",
        "Valora los tratamientos de primera línea: microdosis intermitente de ISRS durante la fase lútea (desde la ovulación hasta el sangrado) o anticonceptivos para frenar la ovulación.",
        "Establece una regla inquebrantable: prohibido romper relaciones, enviar reproches impulsivos o dimitir durante los días críticos de la fase lútea.",
      ],
    },
  },
  {
    level: "acute_severe_neuroendocrine_pmdd_crisis",
    scoreRange: [29, 36],
    title: {
      en: "Acute Severe Neuroendocrine PMDD Crisis & Cycle Trauma",
      id: "Krisis PMDD Neuroendokrin Akut & Trauma Siklus Berat",
      de: "Akute schwere neuroendokrine PMDD-Krise & Zyklustrauma",
      fr: "Crise aiguë de TDPM sévère & détresse neuroendocrinienne majeure",
      es: "Crisis de TDPM neuroendocrino severo y trauma cíclico agudo",
    },
    badge: {
      en: "ACUTE CYCLICAL PSYCHIATRIC CRISIS RISK",
      id: "RISIKO KRISIS PSIKIATRI SIKLIKAL AKUT",
      de: "AKUTE ZYKLISCHE KRISENINDIKATION",
      fr: "RISQUE DE CRISE PSYCHIATRIQUE CYCLIQUE AIGUË",
      es: "RIESGO DE CRISIS PSIQUIÁTRICA CÍCLICA AGUDA",
    },
    summary: {
      en: "You are experiencing an acute, agonizing manifestation of PMDD. The luteal phase plunges you into unmanageable rage, suicidal ideation, dissociation, or severe relationship rupture. The cyclical unpredictability is traumatic and requires immediate, specialized reproductive medical support.",
      id: "Kamu mengalami manifestasi PMDD yang sangat berat dan menyiksa. Fase luteal menenggelamkanmu ke dalam amarah tak terkendali, pikiran bunuh diri pasif/aktif, disosiasi, atau kehancuran relasi. Siklus yang terus berulang ini menimbulkan trauma dan menuntut penanganan medis khusus reproduksi segera.",
      de: "Sie durchleben eine quälende, hochgradige PMDD-Krise. Die Lutealphase stürzt Sie in unkontrollierbare Wut, akute Verzweiflung, Suizidgedanken oder Beziehungsbrüche. Diese zyklische Zerstörung erfordert unverzügliche fachärztliche Hilfe.",
      fr: "Vous traversez une forme aiguë et destructrice de TDPM. La seconde partie de votre cycle vous précipite dans des abîmes de rage, des idées suicidaires et une détresse relationnelle ingérable qui nécessitent un recours médical urgent.",
      es: "Padeces una forma aguda y desgarradora de TDPM. La fase lútea te precipita en accesos de furia incontrolable, pensamientos autolíticos, disociación y ruptura de vínculos vitales, lo que exige atención médica especializada urgente.",
    },
    psychology: {
      en: "This represents profound neuroendocrine intolerance: the allopregnanolone withdrawal phenomenon mimics severe substance withdrawal within the brain's emotional limbic circuits. Central serotonin transmission crashes, uncoupling the frontolimbic network and triggering involuntary amygdalar panic storms.",
      id: "Kondisi ini mencerminkan intoleransi neuroendokrin mendalam: fenomena penurunan allopregnanolon memicu reaksi serupa sakaw kimiawi di sirkuit limbik emosi otak. Transmisi serotonin anjlok drastis, memutus koordinasi otak depan dan memicu badai kepanikan amigdala di luar kendali.",
      de: "Dies spiegelt eine tiefgreifende neuroendokrine Intoleranz wider: Der Allopregnanolon-Abfall wirkt wie ein biochemischer Entzug in den limbischen Hirnregionen. Serotonin bricht ein und entkoppelt frontolimbische Regelkreise.",
      fr: "C'est la signature d'une intolérance neurostéroïdienne sévère : la baisse d'allopregnanolone agit comme un sevrage biochimique aigu dans les circuits limbiques, provoquant une chute brutale de sérotonine et des orages émotionnels involontaires.",
      es: "Refleja una intolerancia neuroendocrina extrema: la retirada de alopregnanolona produce un efecto similar a un síndrome de abstinencia en los circuitos límbicos, colapsando la serotonina y desatando tormentas de pánico incontrolables.",
    },
    actionProtocol: {
      en: [
        "Establish an urgent Safety Protocol: Share your cycle calendar with a trusted partner or ally; during luteal despair, remind yourself continuously: 'This is neurochemistry, not my true self, and it will end when bleeding starts.'",
        "Schedule an emergency consultation with a reproductive psychiatrist or gynecological endocrinologist to explore advanced interventions (such as GnRH agonists with add-back HRT to medically suppress the cycle).",
        "If you experience active suicidal thoughts, contact your local crisis hotline immediately (US: 988, UK: 111, ID: 119/Into The Light).",
      ],
      id: [
        "Buat Protokol Keamanan Darurat: bagikan kalender siklusmu kepada pasangan atau orang tepercaya. Saat keputusasaan melanda, bisikkan berulang kali: 'Ini murni badai neurokimia hormon, bukan diriku yang sebenarnya, dan ini pasti hilang begitu darah haid keluar.'",
        "Jadwalkan konsultasi segera dengan psikiater reproduksi atau endokrinologis ginekologi untuk mendiskusikan terapi lanjutan (seperti agonis GnRH dengan terapi hormon add-back).",
        "Jika kamu mengalami dorongan untuk menyakiti diri sendiri, segera hubungi layanan krisis (Indonesia: 119 ext 8 / Into The Light, US: 988, UK: 111).",
      ],
      de: [
        "Erstellen Sie einen Sicherheitsplan: Teilen Sie Ihren Kalender mit einer Vertrauensperson und erinnern Sie sich im Tief: 'Das ist Neurochemie, nicht mein wahres Ich – es endet mit der Blutung.'",
        "Suchen Sie dringend eine gynäkologische Endokrinologie oder spezialisierte Psychiatrie auf (Optionen wie GnRH-Analoga mit Add-back-Hormontherapie zur Zyklusruhigstellung).",
        "Bei akuten suizidalen Krisen kontaktieren Sie sofort die Telefonseelsorge (116 123 in DE/AT, 143 in CH) oder die nächste Notaufnahme.",
      ],
      fr: [
        "Mettez en place un protocole d'urgence : partagez votre calendrier avec un proche de confiance et répétez-vous : 'C'est une tempête biochimique, ce n'est pas qui je suis, et cela cessera avec le sang.'",
        "Consultez en urgence un centre expert en gynéco-psychiatrie (envisager des analogues de la GnRH avec hormonothérapie de substitution pour mettre les ovaires au repos).",
        "En cas d'idées suicidaires prégnantes, appelez sans délai le 3114 (numéro national de prévention du suicide en France) ou le 15/112.",
      ],
      es: [
        "Activa un protocolo de seguridad personal: comparte tu ciclo con alguien de máxima confianza y repítete como un mantra: 'Es una tormenta química celular, no soy yo, y se acabará en cuanto sangre'.",
        "Acude a una consulta preferente de ginecología endocrinológica o psiquiatría reproductiva (evaluar análogos de la GnRH con terapia hormonal de reemplazo).",
        "Si experimentas ideación autolítica activa, comunícate de inmediato con los servicios de emergencia (España: 024 o 112, EE. UU.: 988, México: 800 911 2000).",
      ],
    },
  },
];

export const PMDD_OPTIONS = [
  {
    value: 0,
    label: {
      en: "0 - Not at all / Normal (No luteal mood distortion)",
      id: "0 - Tidak Pernah / Normal (Suasana hati stabil)",
      de: "0 - Gar nicht / Normal (Keine zyklische Verstimmung)",
      fr: "0 - Pas du tout / Normal (Humeur stable tout le cycle)",
      es: "0 - En absoluto / Normal (Estado de ánimo estable)",
    },
  },
  {
    value: 1,
    label: {
      en: "1 - Mild / Noticeable (Noticeable premenstrual tension or sensitivity)",
      id: "1 - Ringan / Terasa (Sedikit lebih peka atau lelah sebelum haid)",
      de: "1 - Leicht / Spürbar (Leichte prämenstruelle Anspannung)",
      fr: "1 - Léger / Sensible (Sensibilité prémenstruelle modérée)",
      es: "1 - Leve / Perceptible (Sensibilidad o cansancio premestrual)",
    },
  },
  {
    value: 2,
    label: {
      en: "2 - Moderate / Disclosive (Frequent rage, crying spells, or relationship friction)",
      id: "2 - Sedang / Mengganggu (Sering marah, menangis, atau bertengkar)",
      de: "2 - Mäßig / Belastend (Häufige Wutausbrüche, Weinen, Beziehungskonflikte)",
      fr: "2 - Modéré / Perturbant (Accès de larmes, colère et tensions relationnelles)",
      es: "2 - Moderado / Disruptivo (Accesos de furia, llanto o discusiones)",
    },
  },
  {
    value: 3,
    label: {
      en: "3 - Severe / Incapacitating (Volcanic rage, despair, feeling like a different person)",
      id: "3 - Parah / Melumpuhkan (Kemarahan eksplosif, keputusasaan ekstrem, krisis relasi)",
      de: "3 - Schwer / Lähmend (Explosive Wut, Verzweiflung, Wesensveränderung)",
      fr: "3 - Sévère / Invalidant (Rage destructrice, désespoir, sensation d'être une autre)",
      es: "3 - Severo / Incapacitante (Furia incontrolable, desesperanza, desdoblamiento)",
    },
  },
];

export const PMDD_SUBSCALE_INFO = {
  luteal_affective_lability_rage: {
    name: {
      en: "Luteal Affective Lability & Rage",
      id: "Labilitas Afektif Luteal & Ledakan Amarah",
      de: "Luteale Affektlabilität & Wutausbrüche",
      fr: "Labilité affective lutéale & rage",
      es: "Labilidad afectiva lútea y furia",
    },
    description: {
      en: "Sudden volcanic rage, uncontrollable crying spells, overwhelming despair, and feeling like an unrecognizable, frightened person in the 7-10 days before bleeding.",
      id: "Ledakan amarah tak terbendung, tangisan histeris, keputusasaan pekat, dan merasa seperti orang asing yang menakutkan dalam 7-10 hari sebelum haid.",
      de: "Plötzliche Wutausbrüche, unkontrollierbare Weinkrämpfe, Verzweiflung und das Gefühl von Fremdsteuerung vor der Periode.",
      fr: "Rage soudaine, crises de larmes irrépressibles, désespoir noir et impression de dédoublement avant les règles.",
      es: "Explosiones de ira repentina, llanto inconsolable, desesperanza aguda y sensación de no reconocerse en los días previos al sangrado.",
    },
  },
  interpersonal_friction_rejection_pain: {
    name: {
      en: "Interpersonal Friction & Rejection Pain",
      id: "Gesekan Hubungan & Sakit Hati Penolakan (RSD)",
      de: "Zwischenmenschliche Konflikte & Zurückweisungsschmerz",
      fr: "Tensions relationnelles & douleur de rejet",
      es: "Fricción interpersonal y dolor por rechazo",
    },
    description: {
      en: "Extreme rejection sensitive dysphoria, paranoia that loved ones secretly resent you, urges to terminate romantic partnerships or jobs, and deliberate social isolation.",
      id: "Sensitivitas penolakan ekstrem, curiga orang lain membencimu, dorongan memutuskan pasangan atau keluar kerja, serta menarik diri dari lingkungan sosial.",
      de: "Extreme Zurückweisungsempfindlichkeit, Angst vor Verlassenwerden, Impuls zur Trennung oder Kündigung und sozialer Rückzug.",
      fr: "Hypersensibilité au rejet, angoisse d'abandon, envie de tout plaquer ou de rompre et repli social forcé.",
      es: "Hipersensibilidad al rechazo, sospecha de que te desprecian, impulsos de ruptura sentimental o laboral y aislamiento deliberado.",
    },
  },
  somatic_cognitive_exhaustion_rapid_remission: {
    name: {
      en: "Somatic Exhaustion & Rapid Flow Remission",
      id: "Kelelahan Somatik & Remisi Cepat Saat Haid",
      de: "Somatische Erschöpfung & rasche Remission bei Blutung",
      fr: "Épuisement somatique & rémission rapide aux règles",
      es: "Agotamiento somático y remisión rápida con el sangrado",
    },
    description: {
      en: "Crushing physical brain fog and lethargy, painful physical swelling, and the pathognomonic marker: instant total symptom remission within 24-48 hours of flow onset.",
      id: "Kabut otak yang melumpuhkan, kembung dan nyeri payudara parah, serta tanda klinis khas: lenyapnya seluruh gejala secara instan dalam 24-48 jam setelah darah haid keluar.",
      de: "Lähmender Gehirnnebel, schmerzhafte körperliche Schwellungen und das Kernmerkmal: schlagartiges Abklingen aller Symptome mit Beginn der Blutung.",
      fr: "Brouillard mental écrasant, douleurs corporelles et le marqueur distinctif : rémission complète et soudaine dès le début du flux.",
      es: "Niebla mental incapacitante, inflamación física dolorosa y el signo clínico distintivo: remisión absoluta y casi instantánea a las 24-48 horas de sangrar.",
    },
  },
};

export function calculatePmddScore(answers: Record<number, number>): number {
  return Object.values(answers).reduce((sum, val) => sum + val, 0);
}

export function calculatePmddSubscales(answers: Record<number, number>): {
  luteal_affective_lability_rage: number;
  interpersonal_friction_rejection_pain: number;
  somatic_cognitive_exhaustion_rapid_remission: number;
} {
  let lar = 0;
  let ifr = 0;
  let scr = 0;

  PMDD_QUESTIONS.forEach((q) => {
    const score = answers[q.id] ?? 0;
    if (q.subscale === "luteal_affective_lability_rage") lar += score;
    if (q.subscale === "interpersonal_friction_rejection_pain") ifr += score;
    if (q.subscale === "somatic_cognitive_exhaustion_rapid_remission") scr += score;
  });

  return {
    luteal_affective_lability_rage: lar,
    interpersonal_friction_rejection_pain: ifr,
    somatic_cognitive_exhaustion_rapid_remission: scr,
  };
}

export function getPmddResultLevel(score: number): PmddResultLevel {
  const match = PMDD_RESULT_LEVELS.find(
    (lvl) => score >= lvl.scoreRange[0] && score <= lvl.scoreRange[1]
  );
  return match || PMDD_RESULT_LEVELS[PMDD_RESULT_LEVELS.length - 1];
}

export const getPmddResult = getPmddResultLevel;
export const PMDD_RESULTS = PMDD_RESULT_LEVELS;
