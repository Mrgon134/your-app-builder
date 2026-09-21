export type FamilyScapegoatCardLang = "en" | "id" | "de" | "fr" | "es";

export interface FamilyScapegoatQuestion {
  id: number;
  subscale:
    | "systemic_blame_projection"
    | "smear_campaign_gaslighting"
    | "internalized_defective_identity";
  text: Record<FamilyScapegoatCardLang, string>;
}

export interface FamilyScapegoatResultLevel {
  level:
    | "healthy_family_differentiation"
    | "mild_family_role_strain"
    | "moderate_scapegoat_identification"
    | "severe_family_scapegoat_syndrome"
    | "complex_systemic_scapegoat_trauma";
  scoreRange: [number, number];
  title: Record<FamilyScapegoatCardLang, string>;
  badge: Record<FamilyScapegoatCardLang, string>;
  summary: Record<FamilyScapegoatCardLang, string>;
  psychology: Record<FamilyScapegoatCardLang, string>;
  actionProtocol: Record<FamilyScapegoatCardLang, string[]>;
}

export const FAMILY_SCAPEGOAT_QUESTIONS: FamilyScapegoatQuestion[] = [
  // 1. Systemic Blame Projection
  {
    id: 1,
    subscale: "systemic_blame_projection",
    text: {
      en: "Whenever tension, financial trouble, or marital conflict flared up in my family, I was reflexively targeted or blamed as the root cause.",
      id: "Kapan pun ketegangan, masalah finansial, atau pertengkaran orang tua memuncak di keluarga, aku selalu dijadikan sasaran empuk atau disalahkan sebagai biang keroknya.",
      de: "Wann immer Spannungen, Geldnot oder Ehestreitigkeiten in der Familie eskalierten, wurde reflexartig mir die Schuld dafür zugeschoben.",
      fr: "Chaque fois que des tensions, des soucis financiers ou des disputes éclataient dans ma famille, on me désignait d'office comme le coupable idéal.",
      es: "Siempre que surgían tensiones, problemas de dinero o peleas en mi familia, se me señalaba automáticamente como el culpable de todo.",
    },
  },
  // 2. Smear Campaign Gaslighting
  {
    id: 2,
    subscale: "smear_campaign_gaslighting",
    text: {
      en: "Family members gossiped about me behind my back, spreading a toxic narrative to relatives that I was 'difficult, ungrateful, crazy, or rebellious'.",
      id: "Keluargaku menggunjingkanku di belakang, menyebarkan narasi beracun ke sanak saudara bahwa aku anak yang 'sulit diatur, durhaka, gila, atau pembangkang'.",
      de: "Familienmitglieder redeten hinter meinem Rücken schlecht über mich und verbreiteten bei Verwandten das Bild, ich sei 'schwierig, undankbar oder labil'.",
      fr: "Les membres de ma famille parlaient dans mon dos, répandant auprès des proches l'idée que j'étais 'difficile, ingrat, instable ou rebelle'.",
      es: "Mi familia murmuraba a mis espaldas, diciendo a otros parientes que yo era 'difícil, desagradecido, rebelde o problemático'.",
    },
  },
  // 3. Internalized Defective Identity
  {
    id: 3,
    subscale: "internalized_defective_identity",
    text: {
      en: "I carry a deep, agonizing belief that I am fundamentally broken, toxic, or an unwelcome burden to everyone who gets close to me.",
      id: "Aku memendam keyakinan mendalam yang menyiksa bahwa diriku pada dasarnya cacat, beracun, atau beban yang tidak diinginkan bagi siapa pun yang mendekat.",
      de: "Ich trage das quälende Grundgefühl in mir, grundlegend defekt, toxisch oder eine unerträgliche Last für jeden Menschen in meiner Nähe zu sein.",
      fr: "Je porte en moi la conviction douloureuse d'être fondamentalement défaillant, toxique ou un fardeau indésirable pour mon entourage.",
      es: "Cargo con la dolorosa creencia de que estoy intrínsecamente roto, soy tóxico o una carga molesta para cualquiera que se acerque a mí.",
    },
  },
  // 4. Systemic Blame Projection
  {
    id: 4,
    subscale: "systemic_blame_projection",
    text: {
      en: "A double standard was strictly enforced: my siblings' mistakes were excused or rationalized, while my smallest missteps triggered severe fury or punishment.",
      id: "Standar ganda diberlakukan secara nyata: kesalahan saudaraku dimaklumi atau dimaafkan, sementara kekeliruan kecilku memicu amukan dan hukuman berat.",
      de: "Es galt ein striktes Doppelmaß: Fehler meiner Geschwister wurden entschuldigt, während meine kleinsten Patzer Wutausbrüche und Bestrafung nach sich zogen.",
      fr: "Un double standard régnait : les erreurs de mes frères et sœurs étaient pardonnées, tandis que mes moindres faux pas déclenchaient colère et punitions.",
      es: "Había una doble vara de medir: los errores de mis hermanos se disculpaban, mientras que mis mínimos fallos provocaban ira y castigos severos.",
    },
  },
  // 5. Smear Campaign Gaslighting
  {
    id: 5,
    subscale: "smear_campaign_gaslighting",
    text: {
      en: "When I bravely pointed out unfair treatment, the family closed ranks to deny reality, calling me 'paranoid' and accusing me of attacking them.",
      id: "Ketika aku memberanikan diri menegur perlakuan tidak adil, keluarga bersekongkol menyangkal kenyataan, menyebutku 'berlebihan' dan menuduhku menyerang mereka.",
      de: "Wenn ich Ungerechtigkeiten ansprach, schloss sich die Familie zusammen, stritt alles ab, nannte mich 'überempfindlich' und stellte sich als Opfer dar.",
      fr: "Quand j'osais dénoncer une injustice, la famille faisait bloc pour nier les faits, me traitant de 'paranoïaque' et m'accusant d'agresser tout le monde.",
      es: "Al señalar un trato injusto, la familia cerraba filas para negar la realidad, llamándome 'paranoico' y acusándome de atacarlos.",
    },
  },
  // 6. Internalized Defective Identity
  {
    id: 6,
    subscale: "internalized_defective_identity",
    text: {
      en: "In romance or friendships, I instinctively over-apologize and brace myself for abandonment, expecting people to turn against me eventually.",
      id: "Dalam hubungan asmara atau pertemanan, aku terbiasa minta maaf berlebihan dan selalu bersiap ditinggalkan, yakin mereka akhirnya akan membenciku.",
      de: "In Partnerschaften und Freundschaften entschuldige ich mich ständig und rechne ununterbrochen damit, verstoßen oder fallengelassen zu werden.",
      fr: "En amour ou en amitié, je m'excuse pour tout et j'anticipe l'abandon, persuadé qu'on finira par me rejeter un jour ou l'autre.",
      es: "En mis relaciones o amistades, pido perdón por todo y me preparo para el abandono, convencido de que tarde o temprano me darán la espalda.",
    },
  },
  // 7. Systemic Blame Projection
  {
    id: 7,
    subscale: "systemic_blame_projection",
    text: {
      en: "Even after achieving independence or moving away, family members still blame my lifestyle, distance, or boundaries for their continuing problems.",
      id: "Bahkan setelah aku mandiri atau tinggal terpisah, keluargaku tetap menyalahkan pilihan hidup, jarak, atau batasan pribadiku atas kemalangan mereka.",
      de: "Selbst nach meinem Auszug und eigener Unabhängigkeit macht die Familie weiterhin meine Grenzen und Distanz für ihre anhaltenden Krisen verantwortlich.",
      fr: "Même après avoir pris mon indépendance et quitté le foyer, on continue d'accuser mes limites et mon éloignement d'être la cause de leurs malheurs.",
      es: "Incluso tras independizarme, mi familia sigue culpando a mis límites personales y a mi distancia de sus continuos problemas.",
    },
  },
  // 8. Smear Campaign Gaslighting
  {
    id: 8,
    subscale: "smear_campaign_gaslighting",
    text: {
      en: "My authentic achievements and successes were downplayed, ignored, or mocked, while any sign of struggle was gossiped about with contempt.",
      id: "Pencapaian dan prestasiku diremehkan, diabaikan, atau dicibir, sementara saat aku kesulitan, hal itu justru digunjingkan dengan nada menghina.",
      de: "Meine echten Erfolge wurden kleingeredet oder ignoriert, während jeder Stolperstein schadenfroh als Beweis meines 'Versagens' herumgereicht wurde.",
      fr: "Mes réussites étaient minimisées ou ignorées, alors que mes moments de doute étaient colportés avec mépris et délectation.",
      es: "Mis logros eran menospreciados o ignorados, mientras que cualquier tropiezo se aireaba con desdén como prueba de mi torpeza.",
    },
  },
  // 9. Internalized Defective Identity
  {
    id: 9,
    subscale: "internalized_defective_identity",
    text: {
      en: "I feel an intense, irrational dread when things go well, waiting for catastrophic punishment because I was conditioned to believe I don't deserve joy.",
      id: "Aku merasa cemas tak beralasan saat hidupku berjalan lancar, takut ada petaka yang akan menghukumku karena terbiasa percaya aku tak pantas bahagia.",
      de: "Ich empfinde panische Vorahnung, wenn etwas gut läuft – als müsste bald eine Strafe folgen, weil mir Glück und Ruhe angeblich nicht zustehen.",
      fr: "Je ressens une angoisse irrationnelle quand tout va bien, redoutant un retour de bâton car on m'a appris que je ne méritais pas le bonheur.",
      es: "Siento un temor irracional cuando las cosas van bien, esperando un castigo inminente porque me enseñaron que no merezco la alegría.",
    },
  },
  // 10. Systemic Blame Projection
  {
    id: 10,
    subscale: "systemic_blame_projection",
    text: {
      en: "I was expected to be the emotional sponge—absorbing family dysfunction silently—yet called 'selfish and disrespectful' the second I defended myself.",
      id: "Aku dituntut menjadi 'spons emosi' yang menampung kekacauan keluarga tanpa mengeluh, namun langsung dicap 'anak durhaka dan egois' begitu membela diri.",
      de: "Ich sollte der emotionale Mülleimer der Familie sein und alles schlucken – doch sobald ich mich wehrte, galt ich als 'respektlos und egoistisch'.",
      fr: "Je devais être l'éponge émotionnelle de la famille, mais dès que j'exprimais ma souffrance, on me traitait d'ingrat et d'égoïste.",
      es: "Se esperaba que fuera la esponja de los desahogos familiares, pero en cuanto me defendía, me tachaban de 'egoísta e irrespetuoso'.",
    },
  },
  // 11. Smear Campaign Gaslighting
  {
    id: 11,
    subscale: "smear_campaign_gaslighting",
    text: {
      en: "Relatives and family friends formed a united alliance or gave me the cold shoulder, acting as enablers to maintain the dominant parent's approval.",
      id: "Keluarga besar atau teman orang tua ikut-ikutan mendiamkan atau mengucilkanku, bersikap sebagai pembela demi menyenangkan orang tua yang dominan.",
      de: "Verwandte und Bekannte schlossen sich der Ausgrenzung an oder straften mich mit Schweigen, um der dominanten Elternfigur zu gefallen.",
      fr: "L'entourage familial s'est ligué contre moi ou m'a infligé le silence pour complaire au parent dominant et préserver l'illusion familiale.",
      es: "Otros parientes se sumaron al distanciamiento o a la ley del hielo para complacer a la figura parental dominante y no buscarse problemas.",
    },
  },
  // 12. Internalized Defective Identity
  {
    id: 12,
    subscale: "internalized_defective_identity",
    text: {
      en: "I find myself repeatedly stepping into the 'black sheep' or scapegoat role in friend groups or workplaces, unconsciously attracting unfair blame.",
      id: "Aku berulang kali mendapati diriku masuk ke peran 'kambing hitam' di tempat kerja atau pertemanan, tanpa sadar menarik tuduhan tak adil dari orang lain.",
      de: "Ich finde mich im Berufsleben oder Freundeskreis immer wieder in der 'Sündenbock'-Rolle wieder und ziehe unbewusst ungerechte Schuldzuweisungen an.",
      fr: "Je me retrouve souvent dans le rôle du 'mouton noir' au travail ou avec des amis, attirant inconsciemment les reproches injustes.",
      es: "Me descubro asumiendo una y otra vez el papel de 'chivo expiatorio' en el trabajo o con amigos, atrayendo culpas que no me corresponden.",
    },
  },
];

export const FAMILY_SCAPEGOAT_OPTIONS = [
  {
    value: 0,
    label: {
      en: "Never / Untrue (Family was fair, supportive, and accountable)",
      id: "Tidak Pernah / Tidak Benar (Keluarga adil, suportif, dan bertanggung jawab)",
      de: "Nie / Trifft nicht zu (Familie war fair, unterstützend und einsichtig)",
      fr: "Jamais / Faux (Famille équitable, bienveillante et responsable)",
      es: "Nunca / Falso (Familia justa, comprensiva y responsable)",
    },
  },
  {
    value: 1,
    label: {
      en: "Rarely / Mild (Occasional minor family favoritism or misunderstandings)",
      id: "Jarang / Ringan (Sesekali ada pilih kasih ringan atau salah paham biasa)",
      de: "Selten / Mild (Gelegentliche Bevorzugung oder normale Reibereien)",
      fr: "Rarement / Léger (Léger favoritisme ou désaccords passagers)",
      es: "Raras veces / Leve (Favoritismo menor o discrepancias comunes)",
    },
  },
  {
    value: 2,
    label: {
      en: "Frequently / Significant (Consistent scapegoating, blame-shifting, and role lock)",
      id: "Sering / Nyata (Kambing hitam yang konsisten, lempar salah, dan pelabelan)",
      de: "Häufig / Deutlich (Regelmäßige Schuldabwälzung und Sündenbock-Rolle)",
      fr: "Souvent / Marqué (Désignation fréquente comme coupable et étiquetage)",
      es: "Frecuentemente / Notorio (Señalamiento constante y etiqueta de culpable)",
    },
  },
  {
    value: 3,
    label: {
      en: "Always / Severe Systemic Abuse (Organized smear campaigns, complete alienation)",
      id: "Selalu / Sangat Parah (Kampanye fitnah terorganisir, pengucilan total dan trauma)",
      de: "Ständig / Schwerer systemischer Missbrauch (Gezielte Hetze, totale Verstoßung)",
      fr: "Toujours / Violence systémique sévère (Campagne de dénigrement, rejet total)",
      es: "Siempre / Abuso sistémico severo (Campaña de difamación y aislamiento total)",
    },
  },
];

export const FAMILY_SCAPEGOAT_RESULTS: FamilyScapegoatResultLevel[] = [
  {
    level: "healthy_family_differentiation",
    scoreRange: [0, 6],
    title: {
      en: "Healthy Family Differentiation (Secure Relational Origin)",
      id: "Diferensiasi Keluarga Sehat (Asal Relasional Aman)",
      de: "Gesunde familiäre Differenzierung (Sicheres Herkunftssystem)",
      fr: "Différenciation Familiale Saine (Origine Relationnelle Sécure)",
      es: "Diferenciación Familiar Sana (Vínculo de Origen Seguro)",
    },
    badge: {
      en: "Differentiated & Secure (0-16%)",
      id: "Mandiri & Aman (0-16%)",
      de: "Sicher differenziert",
      fr: "Différencié & Sécurisé",
      es: "Diferenciado y Seguro",
    },
    summary: {
      en: "Your family dynamics were characterized by emotional accountability, fair conflict resolution, and individual autonomy. You were not used as a psychological trash receptacle for parental dysfunction or sibling rivalry. You possess a sturdy sense of inherent self-worth.",
      id: "Dinamika keluargamu didasari tanggung jawab emosional, penyelesaian konflik yang adil, dan penghormatan atas batas pribadi. Kamu tidak dijadikan tong sampah emosi untuk masalah orang tua atau persaingan saudara. Kamu memiliki rasa keberhargaan diri yang kokoh.",
      de: "Ihre Herkunftsfamilie war geprägt von emotionaler Verantwortung und fairem Konfliktverhalten. Sie wurden nicht als Mülleimer für elterliche Frustration missbraucht und besitzen einen gesunden, stabilen Selbstwert.",
      fr: "Votre famille fonctionnait sur des bases de responsabilité et d'écoute équitable. Vous n'avez pas servi d'exutoire aux névroses parentales et votre estime personnelle repose sur des fondations solides.",
      es: "Tu entorno familiar contó con responsabilidad emocional y resolución equitativa de problemas. No fuiste el depositario de frustraciones ajenas y posees un sano sentido de valía personal.",
    },
    psychology: {
      en: "Murray Bowen's Family Systems Theory: High level of differentiation of self. Family members take responsibility for their own emotional reactivity rather than triangulating an innocent child into a scapegoat posture.",
      id: "Teori Sistem Keluarga Murray Bowen: Tingkat diferensiasi diri yang tinggi. Setiap anggota keluarga bertanggung jawab atas emosinya sendiri alih-alih melakukan triangulasi dan mengambinghitamkan anak.",
      de: "Bowens Systemtheorie: Hohe Selbstdifferenzierung. Eltern regulieren ihre eigenen Konflikte, statt ein Kind als Ventil zu funktionalisieren.",
      fr: "Théorie des systèmes de Murray Bowen : Différenciation élevée. Les adultes assument leurs émotions sans créer de bouc émissaire triangulé.",
      es: "Teoría de Murray Bowen: Alto nivel de diferenciación. La familia gestiona sus tensiones sin proyectarlas sobre un chivo expiatorio.",
    },
    actionProtocol: {
      en: [
        "Celebrate Healthy Relational Modeling: Acknowledge the emotional foundation you received and use it to nurture healthy friendships and partnerships.",
        "Practice Compassionate Empathy: Recognize that many peers carry invisible family scapegoat wounds and may struggle with chronic defensiveness.",
        "Reflective Mentorship in Nuju: Use Nuju voice journaling to deepen your gratitude and clarify values of relational integrity.",
      ],
      id: [
        "Syukuri Pondasi Emosional yang Sehat: Gunakan pengalaman positif ini untuk membangun kemitraan dan persahabatan yang suportif.",
        "Kembangkan Empati Mendalam: Pahami bahwa banyak teman membawa luka 'kambing hitam' keluarga dan sering merasa cemas ditolak.",
        "Refleksi Nilai di Nuju: Manfaatkan voice journal Nuju untuk memperkuat rasa syukur dan kompas integritas relasimu.",
      ],
      de: [
        "Stabile Werte weitertragen: Die gesunde Basis nutzen, um bewusste und faire Partnerschaften zu leben.",
        "Verständnis zeigen: Erkennen, dass viele Mitmenschen unter ungelösten familiären Sündenbock-Wunden leiden.",
        "Werte festigen mit Nuju: Dankbarkeit und Beziehungsziele im Sprachjournal reflektieren.",
      ],
      fr: [
        "Cultiver cette sécurité : S'appuyer sur ce modèle sain pour bâtir des relations équilibrées.",
        "Faire preuve d'empathie : Comprendre la méfiance de ceux qui ont grandi sous le blâme familial.",
        "Clarté intérieure Nuju : Ancrer sa gratitude et ses valeurs dans le journal vocal.",
      ],
      es: [
        "Honrar la base afectiva: Utiliza este patrón positivo para construir vínculos de confianza mutua.",
        "Empatía hacia los demás: Reconoce que muchas personas arrastran la herida invisible de la culpa familiar.",
        "Gratitud en Nuju: Profundiza en tus metas afectivas a través del diario de voz.",
      ],
    },
  },
  {
    level: "mild_family_role_strain",
    scoreRange: [7, 13],
    title: {
      en: "Mild Family Role Strain (Occasional Generational Friction)",
      id: "Ketegangan Peran Keluarga Ringan (Gesekan Antargenerasi)",
      de: "Milde familiäre Rollenbelastung (Gelegentliche Reibung)",
      fr: "Tension Familiale Légère (Friction Intergénérationnelle)",
      es: "Tensión de Rol Leve (Fricción Familiar Pasajera)",
    },
    badge: {
      en: "Mild Role Strain (19-36%)",
      id: "Gesekan Ringan (19-36%)",
      de: "Milde Rollenspannung",
      fr: "Tension Légère",
      es: "Tensión Leve",
    },
    summary: {
      en: "You experienced occasional unfair blame or subtle sibling favoritism, but you were not systematically targeted as the permanent family problem. You may occasionally feel guilty when setting boundaries, but your identity remains largely autonomous and intact.",
      id: "Kamu terkadang mengalami tuduhan tidak adil atau pilih kasih kecil antarsaudara, namun kamu tidak secara sistematis dijadikan target biang masalah keluarga. Kamu mungkin sesekali merasa bersalah saat memasang batas, namun identitas pribadimu tetap mandiri.",
      de: "Sie erlebten gelegentliche Ungerechtigkeiten oder Bevorzugungen von Geschwistern, wurden jedoch nicht dauerhaft als systemischer Problemfall abgestempelt. Ihre Identität ist weitgehend stabil geblieben.",
      fr: "Vous avez connu des moments d'injustice ou de préférence familiale passagère, sans pour autant devenir le paria officiel. Votre identité est autonome même si poser des limites suscite parfois un léger doute.",
      es: "Has vivido episodios de favoritismo o reproches injustos ocasionales, pero no fuiste etiquetado como el problema crónico de la familia. Tu identidad se mantiene firme y autónoma.",
    },
    psychology: {
      en: "Low-to-moderate family systemic reactivity. Occasional projection occurs during high-stress life events (divorce, bereavement, financial crisis) without congealing into chronic Family Scapegoat Abuse (FSA).",
      id: "Reaktivitas sistem keluarga rendah hingga sedang. Proyeksi kesalahan hanya terjadi saat krisis berat (perceraian, duka, kesulitan uang) tanpa menjadi pola pelecehan kambing hitam yang permanen.",
      de: "Temporäre Spannungen: Schuldzuweisungen traten primär in akuten Belastungsphasen auf, ohne sich zu einer chronischen Sündenbock-Dynamik zu verfestigen.",
      fr: "Tensions ponctuelles : Les reproches émergeaient lors de crises passagères sans se figer en maltraitance systémique durable.",
      es: "Reactividad familiar moderada: Las proyecciones surgían en épocas de estrés agudo sin consolidarse como un abuso crónico.",
    },
    actionProtocol: {
      en: [
        "Differentiate Guilt from Harm: Setting healthy boundaries with relatives is self-respect, not betrayal or cruelty.",
        "Clarify Generational Differences: Accept that older family members may have limited emotional vocabulary without absorbing their criticism.",
        "Voice Venting in Nuju: Debrief difficult family phone calls in Nuju to restore calm sovereignty before guilt spirals start.",
      ],
      id: [
        "Bedakan Rasa Bersalah dan Menyakiti: Memasang batasan sehat adalah bentuk harga diri, bukan pengkhianatan kepada keluarga.",
        "Pahami Keterbatasan Emosional Orang Tua: Sadari bahwa generasi terdahulu memiliki kosakata emosi terbatas tanpa perlu menelan kritik mereka.",
        "Luapkan di Nuju: Curhat lewat suara di Nuju setelah telepon keluarga yang melelahkan agar pikiran kembali jernih.",
      ],
      de: [
        "Schuld von Schaden trennen: Grenzen zu setzen ist Fürsorge, kein familiärer Verrat.",
        "Elterliche Grenzen sehen: Akzeptieren, dass ältere Generationen oft wenig emotionale Reife gelernt haben.",
        "Entlastung mit Nuju: Nach fordernden Familienkontakten kurz im Sprachjournal dekomprimieren.",
      ],
      fr: [
        "Distinguer culpabilité et nuisance : Poser des limites relève du respect de soi, non de la trahison.",
        "Prendre du recul : Admettre les faiblesses affectives de ses aînés sans faire siennes leurs critiques.",
        "Décompression Nuju : Déposer ses ressentis après un échange familial pesant.",
      ],
      es: [
        "Diferenciar culpa de daño: Poner límites firmes es amor propio, no egoísmo ni agresión.",
        "Comprender sin absorber: Acepta las limitaciones emocionales de tus padres sin hacer tuyos sus reproches.",
        "Desahogo en Nuju: Graba un audio en la app tras una llamada familiar incómoda para recuperar el centro.",
      ],
    },
  },
  {
    level: "moderate_scapegoat_identification",
    scoreRange: [14, 21],
    title: {
      en: "Moderate Scapegoat Identification (The Designated Black Sheep)",
      id: "Identifikasi Kambing Hitam Sedang (Si Anak 'Black Sheep')",
      de: "Moderate Sündenbock-Identifikation (Das schwarze Schaf)",
      fr: "Identification de Bouc Émissaire Modérée (Le Mouton Noir)",
      es: "Identificación Moderada de Chivo Expiatorio (La Oveja Negra)",
    },
    badge: {
      en: "Black Sheep Dynamic (39-58%)",
      id: "Dinamika Kambing Hitam (39-58%)",
      de: "Schwarzes Schaf",
      fr: "Mouton Noir",
      es: "Oveja Negra",
    },
    summary: {
      en: "You were assigned the official 'problem child' role in your family system. While the golden child could do no wrong, your career choices, emotions, and independence were continually pathologized. You struggle with chronic imposter syndrome and an urge to prove your innocence to people who misunderstand you.",
      id: "Kamu ditugaskan peran sebagai 'anak bermasalah' dalam sistem keluargamu. Saat anak emas selalu dianggap suci, pilihan karir, emosi, dan kemandirianmu selalu dicap salah. Kamu sering bergulat dengan imposter syndrome dan dorongan melelahkan untuk membuktikan dirimu tidak bersalah.",
      de: "Ihnen wurde die Rolle des 'schwierigen Kindes' zugewiesen. Während das 'goldene Kind' unantastbar war, wurden Ihre Wünsche und Emotionen pathologisiert. Sie leiden oft unter Imposter-Gefühlen und dem Zwang, sich ständig rechtfertigen zu müssen.",
      fr: "Vous avez incarné le rôle de l'enfant difficile. Alors que l'enfant prodigue était adulé, vos choix et votre sensibilité étaient dévalorisés. Vous gardez un syndrome de l'imposteur persistant et le besoin d'expliquer votre valeur.",
      es: "Te asignaron la etiqueta del 'hijo rebelde'. Mientras el hijo dorado era intocable, tus emociones e iniciativas eran blanco de críticas. Convives con el síndrome del impostor y el impulso desgastante de demostrar tu inocencia.",
    },
    psychology: {
      en: "Rebecca Mandeville's Family Scapegoat Abuse (FSA) Model: Scapegoating serves a systemic homeostasis function—projecting parental shame and marital discord onto one truth-telling child to preserve the illusion of a 'happy family'.",
      id: "Model Family Scapegoat Abuse (FSA) Rebecca Mandeville: Mengambinghitamkan anak berfungsi menjaga stabilitas palsu keluarga—memproyeksikan rasa malu orang tua ke anak yang jujur demi mempertahankan ilusi 'keluarga harmonis'.",
      de: "Rebecca Mandevilles FSA-Modell: Der Sündenbock dient der Aufrechterhaltung des Systems. Eigene Scham wird auf das Kind projiziert, das die ungeschminkte Wahrheit ausspricht.",
      fr: "Modèle FSA de Rebecca Mandeville : Le bouc émissaire absorbe la honte parentale pour maintenir l'illusion d'une famille unie et sans faille.",
      es: "Modelo FSA de Rebecca Mandeville: El chivo expiatorio cumple la función de absorber las sombras y frustraciones de los padres para sostener una imagen ficticia de perfección.",
    },
    actionProtocol: {
      en: [
        "Stop JADE-ing (Justify, Argue, Defend, Explain): Toxic family systems use your explanations as ammunition. Shift to neutral gray-rock responses.",
        "Recognize Scapegoat Inversion: Realize that the scapegoat is usually targeted because they are empathetic, intuitive, and unwilling to endorse lies.",
        "Voice Re-Parenting in Nuju: Use Nuju voice entries to remind yourself: 'I was never the broken one; I was the truth-teller in an unhealed system.'",
      ],
      id: [
        "Hentikan Sikap JADE (Justify, Argue, Defend, Explain): Keluarga beracun memakai penjelasanmu sebagai peluru. Gunakan teknik gray-rock yang tenang dan netral.",
        "Pahami Realitas Sebenarnya: Anak kambing hitam biasanya dipilih justru karena berempati tinggi, peka, dan menolak kepalsuan keluarga.",
        "Re-parenting Diri di Nuju: Gunakan voice journal Nuju untuk menegaskan: 'Aku bukan anak rusak; aku adalah penyuarakan kebenaran di tengah sistem yang sakit.'",
      ],
      de: [
        "Stoppe das Rechtfertigen: Toxische Familien nutzen Erklärungen als Angriffspunkt. Auf neutrale 'Grey Rock'-Kommunikation umstellen.",
        "Das wahre Motiv erkennen: Sündenböcke sind meist die feinfühligsten und ehrlichsten Mitglieder, die sich nicht verbiegen lassen.",
        "Selbstbestärkung in Nuju: Im Sprachjournal festhalten: 'Ich war nicht das Problem, sondern der Seismograph eines kranken Systems.'",
      ],
      fr: [
        "Arrêter de se justifier : Les explications servent d'armes aux manipulateurs. Adopter la technique du 'disque rayé' ou de la neutralité.",
        "Prendre conscience de sa force : Le bouc émissaire est généralement le membre le plus empathique et intègre du foyer.",
        "Reparentage vocal Nuju : Se répéter en audio : 'Je n'étais pas le problème, j'étais celui qui refusait l'hypocrisie.'",
      ],
      es: [
        "Dejar de justificarse: Tus explicaciones serán usadas en tu contra. Adopta la técnica de la piedra gris con respuestas breves y neutras.",
        "Comprender la raíz: El chivo expiatorio suele ser el integrante más intuitivo, compasivo e incapaz de tolerar farsas.",
        "Reparentalización en Nuju: Graba en la app: 'Yo no era el defecto; era el testigo incómodo en un sistema que no quería sanar.'",
      ],
    },
  },
  {
    level: "severe_family_scapegoat_syndrome",
    scoreRange: [22, 29],
    title: {
      en: "Severe Family Scapegoat Syndrome (Systemic Devaluation)",
      id: "Sindrom Kambing Hitam Parah (Devaluasi Sistemik Kronis)",
      de: "Schweres familiäres Sündenbock-Syndrom (Chronische Entwertung)",
      fr: "Syndrome Sévère de Bouc Émissaire (Dévaluation Systémique)",
      es: "Síndrome Severo de Chivo Expiatorio (Devaluación Crónica)",
    },
    badge: {
      en: "Severe Scapegoating (61-80%)",
      id: "Kambing Hitam Parah (61-80%)",
      de: "Schwere Entwertung",
      fr: "Dévaluation Sévère",
      es: "Devaluación Severa",
    },
    summary: {
      en: "You have endured relentless character assassination, coordinated family smear campaigns, and gaslighting engineered to make you doubt your sanity. The entire extended family was recruited to ostracize you whenever you set boundaries. You carry profound somatic trauma and hypervigilance.",
      id: "Kamu menanggung pembunuhan karakter tanpa henti, kampanye fitnah terkoordinasi, dan manipulasi (gaslighting) yang membuatmu meragukan kewarasanmu sendiri. Keluarga besar dimobilisasi untuk mengucilkanmu saat kamu membela diri. Kamu memendam trauma somatik dan kecemasan tinggi.",
      de: "Sie wurden Opfer gezielter Rufmordkampagnen, systematischer Entwertung und extremen Gaslightings, das Sie an Ihrem eigenen Verstand zweifeln ließ. Die Familie verbündete sich gegen Sie, sobald Sie Grenzen setzten. Sie tragen tiefes Bindungstrauma in sich.",
      fr: "Vous avez subi un véritable lynchage psychologique, des campagnes de dénigrement orchestrées et un gaslighting destructeur. L'entourage s'est allié pour vous rejeter au moindre sursaut de dignité, vous laissant avec un traumatisme somatique majeur.",
      es: "Has soportado difamación constante, campañas familiares de descrédito y una manipulación perversa que te hizo dudar de tu cordura. La familia se aliaba para castigarte con el ostracismo. Llevas contigo una profunda herida de hipervigilancia.",
    },
    psychology: {
      en: "Complex Relational Trauma (C-PTSD) derived from Family Scapegoat Abuse (FSA). The nervous system is conditioned into chronic dorsal vagal freeze or hypervigilant defense, anticipating betrayal and emotional ambush in all close relationships.",
      id: "Trauma Relasional Kompleks (C-PTSD) akibat Pelecehan Kambing Hitam Keluarga (FSA). Sistem saraf terkondisi dalam kewaspadaan ekstrem atau shutdown emosional, terus-menerus mengantisipasi pengkhianatan dan serangan mendadak.",
      de: "Komplexe posttraumatische Belastung (C-PTSD) durch FSA. Das Nervensystem verharrt in Daueranspannung und erwartet auch in neuen Bindungen unbewusst Verrat und Ausgrenzung.",
      fr: "Traumatisme relationnel complexe (C-PTSD) issu des violences psychologiques intrafamiliales. Le système nerveux reste en état d'alerte permanente, redoutant l'embuscade émotionnelle.",
      es: "Trauma relacional complejo (TEPT-C) por abuso sistémico familiar. Tu organismo vive en alerta continua, anticipando traiciones y reproches en cualquier vínculo íntimo.",
    },
    actionProtocol: {
      en: [
        "Initiate Strategic Low-Contact (or No-Contact): Drastically reduce exposure to family gatherings and group chats where smear narratives thrive.",
        "Build a Chosen Family: Consciously invest in friendships and communities that value your true self and practice mutual emotional reciprocity.",
        "Nervous System Somatic Reset in Nuju: Verbalize safety in Nuju voice journals to discharge the physiological tension of being the perpetual target.",
      ],
      id: [
        "Terapkan Batasan Low-Contact (atau No-Contact): Batasi secara tegas kehadiran di acara keluarga atau grup chat yang penuh racun gosip.",
        "Bangun 'Keluarga Pilihan' (Chosen Family): Investasikan energimu pada sahabat dan komunitas yang menghargai ketulusanmu dan saling mendukung.",
        "Pelepasan Beban Somatik di Nuju: Gunakan voice journal Nuju untuk meluapkan beban tubuh dan memprogram ulang rasa aman diri.",
      ],
      de: [
        "Konsequente Kontaktreduktion (Low/No Contact): Sich aus toxischen Chatgruppen und Familienfeiern befreien, die nur als Bühne für Anschuldigungen dienen.",
        "Gewählte Familie aufbauen: Freundschaften pflegen, die von gegenseitigem Respekt und Verlässlichkeit getragen sind.",
        "Somatische Entlastung in Nuju: Die chronische Anspannung des Sündenbocks durch geführte Sprachreflexion im Körper lösen.",
      ],
      fr: [
        "Mise à distance stratégique (Contact minime / Rupture) : Quitter les groupes de discussion et éviter les réunions propices aux attaques.",
        "Créer sa famille de cœur : Investir dans des relations réciproques qui reconnaissent votre valeur authentique.",
        "Régulation somatique Nuju : Extérioriser la rage et la tristesse par la voix pour libérer le corps de l'hypervigilance.",
      ],
      es: [
        "Contacto mínimo o cero estratégico: Aléjate de grupos de chat y reuniones familiares que operan como tribunales inquisitorios.",
        "Construir familia elegida: Rodéate de amistades que aprecien tu autenticidad y practiquen la reciprocidad afectiva.",
        "Descarga somática en Nuju: Desahoga en la app la tensión acumulada de haber sido el blanco de todas las culpas.",
      ],
    },
  },
  {
    level: "complex_systemic_scapegoat_trauma",
    scoreRange: [30, 36],
    title: {
      en: "Complex Systemic Scapegoat Trauma (Total Family Ostracization)",
      id: "Trauma Kambing Hitam Sistemik Kompleks (Pengucilan Total)",
      de: "Komplexes systemisches Sündenbock-Trauma (Vollständige Verstoßung)",
      fr: "Traumatisme Systémique de Bouc Émissaire (Rejet et Exil Familial)",
      es: "Trauma Sistémico Complejo por Expiación (Destierro Familiar Absoluto)",
    },
    badge: {
      en: "Complex Scapegoat Trauma (83-100%)",
      id: "Trauma Kambing Hitam Ekstrem (83-100%)",
      de: "Komplexes Trauma",
      fr: "Traumatisme Complexe",
      es: "Trauma Complejo",
    },
    summary: {
      en: "You have suffered catastrophic narcissistic family abuse where your entire identity was systematically attacked, defamed, and erased. You were expelled or coerced into complete estrangement as the sacrificial lamb for severe multi-generational pathology. The betrayal runs to the core of your soul.",
      id: "Kamu telah mengalami pelecehan narsistik keluarga yang katastropik di mana integritas dan kepribadianmu dihancurkan, difitnah, dan dihapus secara sistemik. Kamu dibuang atau terpaksa memutus kontak total sebagai domba korban atas patologi antargenerasi keluarga.",
      de: "Sie erlebten schwerste narzisstische Familienpathologie, bei der Ihre Existenz und Wahrnehmung systematisch vernichtet wurden. Sie dienten als ritueller Sündenbock für generationsübergreifende Toxizität und wurden letztlich verstoßen. Ein existenzieller Verrat.",
      fr: "Vous avez été la victime expiatoire d'une pathologie familiale narcissique dévastatrice. Votre parole et votre identité ont été méthodiquement détruites, vous contraignant à l'exil pour sauver votre vie psychique.",
      es: "Has sido el cordero del sacrificio de un sistema familiar narcisista destructivo. Tu identidad y tu verdad fueron sistemáticamente trituradas, obligándote al distanciamiento total para preservar tu supervivencia psicológica.",
    },
    psychology: {
      en: "Profound betrayal trauma, attachment shattering, and internalized toxic shame. When an entire family system colludes in psychological execution, recovery requires trauma-informed therapy, somatic experiencing, and grieving the parents/family you never actually had.",
      id: "Trauma pengkhianatan mendalam, kehancuran attachment, dan toxic shame yang terinternalisasi. Pemulihan membutuhkan terapi trauma klinis (EMDR/IFS), pelepasan somatik, dan proses berduka atas keluarga yang tidak pernah benar-benar ada.",
      de: "Tiefes Verratstrauma und verinnerlichte toxische Scham. Heilung erfordert traumasensible Therapie (EMDR, Somatic Experiencing) und das bewusste Trauern um Eltern, die man niemals wirklich hatte.",
      fr: "Traumatisme de trahison absolu et honte toxique profonde. La reconstruction nécessite un accompagnement spécialisé en psychotrauma (EMDR, IFS) et le deuil de la famille idéale.",
      es: "Trauma de traición extrema y vergüenza tóxica arraigada. La recuperación exige terapia especializada en trauma (EMDR, IFS) y elaborar el duelo por los padres que jamás estuvieron presentes.",
    },
    actionProtocol: {
      en: [
        "Trauma-Informed Professional Care: Seek specialized C-PTSD and narcissistic abuse therapy (EMDR, Internal Family Systems) to untangle the toxic shame web.",
        "Grieve the Illusion of Family: Allow yourself to mourn the loving family you deserved but never had, closing the door on seeking their validation.",
        "Sovereign Sanctuary with Nuju: Use Nuju as an unbreachable private sanctuary to speak your unvarnished truth without fear of retaliation or gaslighting.",
      ],
      id: [
        "Terapi Profesional Spesialis Trauma: Cari bantuan psikolog dengan keahlian trauma C-PTSD dan narcissistic abuse (EMDR / IFS) untuk membongkar jerat toxic shame.",
        "Berduka atas Ilusi Keluarga: Izinkan dirimu menangisi keluarga hangat yang pantas kamu dapatkan tapi tak pernah kamu miliki, dan berhentilah mengejar pengakuan mereka.",
        "Tempat Perlindungan Berdaulat di Nuju: Jadikan Nuju ruang rahasia yang aman untuk menyuarakan kebenaranmu tanpa takut dihakimi, difitnah, atau dibantah.",
      ],
      de: [
        "Traumatherapeutische Hilfe: Spezialisierte Begleitung (EMDR, IFS) in Anspruch nehmen, um die eingepflanzte Scham systematisch aufzulösen.",
        "Die Illusion betrauern: Zulassen, um die Familie zu weinen, die man verdient hätte, und die vergebliche Suche nach deren Anerkennung ein für alle Mal beenden.",
        "Unantastbarer Schutzraum Nuju: Die App als sicheren Zufluchtsort nutzen, um die eigene Wahrheit furchtlos auszusprechen.",
      ],
      fr: [
        "Suivi spécialisé en psychotrauma : Consulter un thérapeute expert en C-PTSD et violences narcissiques pour déconstruire la honte introjectée.",
        "Faire le deuil de la famille rêvée : Pleurer les parents bienveillants que vous n'avez jamais eus pour cesser d'attendre leur validation.",
        "Sanctuaire privé Nuju : Utiliser Nuju comme un journal intime inviolable pour poser votre vérité sans craindre le déni.",
      ],
      es: [
        "Terapia especializada en trauma: Acude a profesionales expertos en TEPT-C y abuso narcisista (EMDR, IFS) para sanar la vergüenza tóxica.",
        "Llorar la pérdida de la familia ideal: Permítete el duelo por la familia que merecías y no tuviste, cerrando la búsqueda de su aprobación.",
        "Santuario inviolable en Nuju: Haz de Nuju tu espacio sagrado para expresar tu verdad sin miedo a ser atacado o invalidado.",
      ],
    },
  },
];

export const FAMILY_SCAPEGOAT_SUBSCALE_INFO = {
  systemic_blame_projection: {
    name: {
      en: "Systemic Blame Projection",
      id: "Proyeksi Kesalahan Sistemik",
      de: "Systemische Schuldprojektion",
      fr: "Projection Systémique du Blâme",
      es: "Proyección Sistémica de Culpa",
    },
    description: {
      en: "Being reflexively assigned fault for family crises, parental marital unhappiness, or financial stress regardless of facts.",
      id: "Secara refleks dijadikan biang kesalahan atas krisis keluarga, ketidakbahagiaan pernikahan orang tua, atau masalah uang.",
      de: "Reflexartiges Zuweisen der Schuld für familiäre Krisen, elterliche Unzufriedenheit oder Geldnot.",
      fr: "Désignation automatique comme responsable des crises familiales, des déboires financiers ou du malheur parental.",
      es: "Asignación refleja de la culpa por los conflictos familiares, desdichas conyugales o crisis económicas.",
    },
  },
  smear_campaign_gaslighting: {
    name: {
      en: "Smear Campaign & Gaslighting",
      id: "Kampanye Fitnah & Manipulasi Gaslighting",
      de: "Rufmordkampagne & Gaslighting",
      fr: "Campagne de Dénigrement & Gaslighting",
      es: "Campaña de Difamación y Manipulación",
    },
    description: {
      en: "Relatives spreading toxic narratives behind your back, denying reality when confronted, and presenting you as the unstable one.",
      id: "Keluarga menyebarkan cerita miring di belakangmu, menyangkal kenyataan saat ditegur, dan mencapmu sebagai anak bermasalah.",
      de: "Verbreitung von Gerüchten hinter Ihrem Rücken, Leugnen von Tatsachen und Stigmatisierung als 'labiles' Familienmitglied.",
      fr: "Colportage de mensonges dans votre dos, déni de la réalité et étiquetage comme la personne instable de la famille.",
      es: "Difusión de falsedades a tus espaldas, negación de los hechos y etiquetado como el elemento desequilibrado.",
    },
  },
  internalized_defective_identity: {
    name: {
      en: "Internalized Defective Identity",
      id: "Keyakinan Diri Cacat & Toxic Shame",
      de: "Verinnerlichte Defekt-Identität",
      fr: "Identité Défaillante Intériorisée",
      es: "Identidad Defectuosa Interiorizada",
    },
    description: {
      en: "Chronic subconscious toxic shame that you are fundamentally broken, unworthy of joy, and destined to be rejected by everyone.",
      id: "Toxic shame bawah sadar bahwa dirimu cacat permanen, tak pantas bahagia, dan ditakdirkan untuk ditolak semua orang.",
      de: "Chronische Scham, grundlegend fehlerhaft zu sein, kein Glück zu verdienen und unweigerlich verlassen zu werden.",
      fr: "Honte toxique intériorisée dictant que vous êtes fondamentalement indigne d'amour et condamné à l'exclusion.",
      es: "Vergüenza tóxica profunda que te convence de que eres defectuoso, no mereces ser feliz y siempre serás rechazado.",
    },
  },
};

export function getFamilyScapegoatResult(totalScore: number): FamilyScapegoatResultLevel {
  const clamped = Math.max(0, Math.min(36, totalScore));
  return (
    FAMILY_SCAPEGOAT_RESULTS.find(
      (r) => clamped >= r.scoreRange[0] && clamped <= r.scoreRange[1]
    ) || FAMILY_SCAPEGOAT_RESULTS[0]
  );
}

export function calculateFamilyScapegoatSubscales(answers: Record<number, number>): {
  systemic_blame_projection: number;
  smear_campaign_gaslighting: number;
  internalized_defective_identity: number;
} {
  let sbp = 0;
  let scg = 0;
  let idi = 0;

  FAMILY_SCAPEGOAT_QUESTIONS.forEach((q) => {
    const score = answers[q.id] ?? 0;
    if (q.subscale === "systemic_blame_projection") sbp += score;
    if (q.subscale === "smear_campaign_gaslighting") scg += score;
    if (q.subscale === "internalized_defective_identity") idi += score;
  });

  return {
    systemic_blame_projection: sbp,
    smear_campaign_gaslighting: scg,
    internalized_defective_identity: idi,
  };
}
