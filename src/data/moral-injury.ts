export type MoralInjuryCardLang = "en" | "id" | "de" | "fr" | "es";

export interface MoralInjuryQuestion {
  id: number;
  subscale: "institutional_betrayal" | "transgression_guilt" | "existential_alienation";
  text: {
    en: string;
    id: string;
    de: string;
    fr: string;
    es: string;
  };
}

export interface MoralInjuryResultLevel {
  level: string;
  scoreRange: [number, number];
  title: {
    en: string;
    id: string;
    de: string;
    fr: string;
    es: string;
  };
  summary: {
    en: string;
    id: string;
    de: string;
    fr: string;
    es: string;
  };
  neurobiology: {
    en: string;
    id: string;
    de: string;
    fr: string;
    es: string;
  };
  actionProtocol: {
    en: string[];
    id: string[];
    de: string[];
    fr: string[];
    es: string[];
  };
  badge: {
    en: string;
    id: string;
    de: string;
    fr: string;
    es: string;
  };
}

export const MORAL_INJURY_QUESTIONS: MoralInjuryQuestion[] = [
  // 1. Institutional Betrayal & Broken Leadership Trust
  {
    id: 1,
    subscale: "institutional_betrayal",
    text: {
      en: "I feel profoundly betrayed by leaders, organizations, or institutions I once trusted, because they sacrificed human lives or integrity for profit, PR, or politics.",
      id: "Saya merasa sangat dikhianati oleh pemimpin, perusahaan, atau institusi yang dulu saya percayai, karena mereka mengorbankan nyawa atau integritas demi keuntungan, citra, atau politik.",
      de: "Ich fühle mich von Führungskräften oder Institutionen zutiefst verraten, weil sie für Profit oder Prestige Menschenleben und Integrität opferten.",
      fr: "Je me sens profondément trahi(e) par des dirigeants ou institutions auxquels je croyais, sacrifiant l'humain et l'éthique au profit du pouvoir ou de l'image.",
      es: "Me siento profundamente traicionado/a por líderes o instituciones en las que confiaba, al ver que sacrificaron vidas o integridad por dinero o imagen."
    }
  },
  {
    id: 2,
    subscale: "institutional_betrayal",
    text: {
      en: "When I reported ethical violations, dangerous conditions, or abuse of power, I was silenced, retaliated against, gaslighted, or made a scapegoat.",
      id: "Ketika saya melaporkan pelanggaran etika, kondisi berbahaya, atau penyalahgunaan wewenang, saya justru dibungkam, dimusuhi, atau dijadikan kambing hitam.",
      de: "Als ich Missstände oder Machtmissbrauch meldete, wurde ich mundtot gemacht, eingeschüchtert oder zum Sündenbock abgestempelt.",
      fr: "Lorsque j'ai signalé des manquements éthiques ou des abus, j'ai été réduit(e) au silence, discrédité(e) ou transformé(e) en bouc émissaire.",
      es: "Cuando señalé irregularidades éticas o abusos, me silenciaron, tomaron represalias en mi contra o me usaron como chivo expiatorio."
    }
  },
  {
    id: 3,
    subscale: "institutional_betrayal",
    text: {
      en: "I was forced to watch vulnerable people (patients, clients, subordinates) suffer harm because the system refused to allocate necessary resources.",
      id: "Saya terpaksa menyaksikan orang rentan (pasien, klien, bawahan) menderita karena sistem menolak mengalokasikan sumber daya yang layak.",
      de: "Ich musste tatenlos zusehen, wie schutzlose Menschen litten, weil das System sich weigerte, notwendige Ressourcen bereitzustellen.",
      fr: "J'ai dû assister impuissant(e) à la souffrance de personnes vulnérables parce que le système refusait de débloquer les moyens nécessaires.",
      es: "Tuve que presenciar cómo sufrían personas vulnerables porque el sistema se negaba a destinar los recursos necesarios."
    }
  },
  {
    id: 4,
    subscale: "institutional_betrayal",
    text: {
      en: "The hypocrisy of high-level authorities preaching moral values while practicing greed and cruelty makes my stomach churn with righteous fury.",
      id: "Kemunafikan para petinggi yang berkhotbah tentang nilai moral padahal mempraktikkan keserakahan membuat perut saya mual oleh amarah.",
      de: "Die Heuchelei von Autoritäten, die moralische Werte predigen, aber Gier praktizieren, erzeugt in mir eine Welle der Empörung und Übelkeit.",
      fr: "L'hypocrisie des dirigeants prêchant de belles valeurs tout en agissant par pure cupidité me soulève le cœur de dégoût et de colère.",
      es: "La hipocresía de superiores que predican valores morales mientras actúan con codicia y crueldad me revuelve las entrañas de indignación."
    }
  },

  // 2. Transgression Guilt & Moral Compromise
  {
    id: 5,
    subscale: "transgression_guilt",
    text: {
      en: "I acted in ways (or failed to speak up) that severely violated my personal moral code, and I cannot forgive myself for what I did or didn't do.",
      id: "Saya pernah bertindak (atau memilih diam) yang sangat melanggar kode moral saya sendiri, dan saya sulit memaafkan diri atas hal itu.",
      de: "Ich habe Dinge getan (oder geschwiegen), die meinen inneren Moralkodex verletzen, und kann mir das bis heute nicht verzeihen.",
      fr: "J'ai agi (ou suis resté(e) silencieux/se) en bafouant mes valeurs profondes, et je n'arrive pas à me pardonner cette lâcheté ou compromission.",
      es: "Hice cosas (o callé) que violaron por completo mi código moral, y me resulta casi imposible perdonarme por lo que hice o dejé de hacer."
    }
  },
  {
    id: 6,
    subscale: "transgression_guilt",
    text: {
      en: "To keep my job, salary, or safety, I was coerced into complying with unethical orders, cutting corners, or falsifying reality.",
      id: "Demi mempertahankan pekerjaan, gaji, atau keselamatan, saya terpaksa mematuhi perintah yang tidak etis atau memanipulasi kenyataan.",
      de: "Um Job oder Sicherheit nicht zu verlieren, sah ich mich gezwungen, unethische Anweisungen zu befolgen oder die Realität zu beschönigen.",
      fr: "Pour préserver mon emploi ou ma sécurité, j'ai été contraint(e) d'obéir à des directives contraires à l'éthique ou de maquiller la réalité.",
      es: "Por miedo a perder mi empleo o estabilidad, me vi forzado/a a acatar órdenes inmorales o maquillar la verdad."
    }
  },
  {
    id: 7,
    subscale: "transgression_guilt",
    text: {
      en: "I carry a secret, heavy burden of shame: if people truly knew what I was part of or witnessed without stopping, they would despise me.",
      id: "Saya memikul beban rasa malu yang dirahasiakan: jika orang lain tahu apa yang saya saksikan tanpa saya cegah, mereka akan memandang rendah saya.",
      de: "Ich trage eine schwere heimliche Scham: Wenn die Menschen wüssten, woran ich beteiligt war, würden sie mich verachten.",
      fr: "Je porte une honte secrète accablante : si les gens savaient ce dont j'ai été le témoin passif ou le complice, ils me mépriseraient.",
      es: "Cargo con una vergüenza secreta y asfixiante: si los demás supieran de qué formé parte o qué presencié sin frenarlo, me despreciarían."
    }
  },
  {
    id: 8,
    subscale: "transgression_guilt",
    text: {
      en: "I feel contaminated or morally tainted, feeling as though my innocence and ethical integrity have been permanently poisoned.",
      id: "Saya merasa diri saya tercemar atau ternoda secara moral, seolah-olah kepolosan dan integritas hidup saya telah rusak permanen.",
      de: "Ich fühle mich moralisch beschmutzt, als wäre meine innere Reinheit und persönliche Würde für immer vergiftet worden.",
      fr: "Je me sens souillé(e) moralement, comme si mon innocence et mon intégrité d'autrefois avaient été irrémédiablement brisées.",
      es: "Me siento manchado/a o corrompido/a moralmente, como si mi dignidad y pureza interior hubieran sido emponzoñadas para siempre."
    }
  },

  // 3. Existential Alienation & Shattered Trust
  {
    id: 9,
    subscale: "existential_alienation",
    text: {
      en: "My fundamental belief in a just, fair, or benevolent world has been completely shattered; I see human society as rigged and cynical.",
      id: "Keyakinan dasar saya bahwa dunia ini adil atau penuh kebajikan telah hancur total; saya memandang masyarakat manusia sebagai sistem yang korup dan manipulatif.",
      de: "Mein Glaube an eine gerechte Welt ist zerstört; ich betrachte gesellschaftliche Systeme nur noch als korrupt und zynisch.",
      fr: "Ma croyance en un monde juste ou bienveillant est brisée ; je perçois désormais la société humaine comme un système cruel et cynique.",
      es: "Mi fe en un mundo justo o bondadoso se derrumbó; veo la sociedad y las estructuras humanas como un juego cínico y corrupto."
    }
  },
  {
    id: 10,
    subscale: "existential_alienation",
    text: {
      en: "I have become intensely cynical and detached, struggling to trust coworkers, superiors, or even close friends and family.",
      id: "Saya menjadi sangat sinis dan menjaga jarak, sulit mempercayai rekan kerja, atasan, bahkan teman dekat dan keluarga sendiri.",
      de: "Ich bin extrem zynisch und distanziert geworden; es fällt mir schwer, Kollegen, Vorgesetzten oder gar Freunden noch zu vertrauen.",
      fr: "Je suis devenu(e) profondément cynique et distant(e), incapable de faire confiance à mes collègues, supérieurs ou même à mes proches.",
      es: "Me he vuelto extremadamente cínico/a y distante; me cuesta horrores confiar en compañeros, jefes e incluso en mis seres queridos."
    }
  },
  {
    id: 11,
    subscale: "existential_alienation",
    text: {
      en: "I feel an overwhelming sense of loneliness and spiritual homelessness, as if no ordinary person could ever understand what I have experienced.",
      id: "Saya merasa sangat kesepian dan kehilangan rumah batin, seolah-olah tidak ada orang biasa yang bisa memahami apa yang pernah saya lalui.",
      de: "Ich fühle eine erdrückende seelische Heimatlosigkeit, als könnte kein Außenstehender jemals verstehen, was ich durchgemacht habe.",
      fr: "J'éprouve un sentiment d'isolement et de déracinement spirituel absolu, comme si personne ne pouvait saisir ma souffrance.",
      es: "Siento una soledad existencial aplastante, como si nadie en la vida cotidiana pudiera comprender el abismo por el que pasé."
    }
  },
  {
    id: 12,
    subscale: "existential_alienation",
    text: {
      en: "I frequently ask: 'What is the point of living ethically when ruthlessness and dishonesty are consistently rewarded?'",
      id: "Saya sering bertanya: 'Apa gunanya hidup jujur dan beretika jika orang yang kejam dan manipulatif justru selalu menang dan dihargai?'",
      de: "Ich frage mich oft: 'Was nützt es, moralisch zu handeln, wenn Skrupellosigkeit und Lügen belohnt werden?'",
      fr: "Je me demande sans cesse : 'À quoi bon rester intègre quand le cynisme et la malhonnêteté sont systématiquement récompensés ?'",
      es: "Me pregunto a menudo: '¿De qué sirve actuar con ética si la falta de escrúpulos y la mentira siempre salen ganando?'"
    }
  }
];

export const MORAL_INJURY_OPTIONS = [
  {
    value: 0,
    label: {
      en: "Strongly Disagree / Never",
      id: "Sangat Tidak Setuju / Tidak Pernah",
      de: "Stimme überhaupt nicht zu / Nie",
      fr: "Pas du tout d'accord / Jamais",
      es: "Totalmente en desacuerdo / Nunca"
    }
  },
  {
    value: 1,
    label: {
      en: "Mildly Agree (Rarely)",
      id: "Agak Setuju (Jarang)",
      de: "Stimme eher selten zu",
      fr: "Plutôt d'accord (Rarement)",
      es: "Ligeramente de acuerdo (Raras veces)"
    }
  },
  {
    value: 2,
    label: {
      en: "Moderately Agree (Sometimes)",
      id: "Cukup Setuju (Kadang-kadang)",
      de: "Stimme mäßig zu (Manchmal)",
      fr: "Moyennement d'accord (Parfois)",
      es: "Moderadamente de acuerdo (A veces)"
    }
  },
  {
    value: 3,
    label: {
      en: "Strongly Agree (Often)",
      id: "Sangat Setuju (Sering)",
      de: "Stimme stark zu (Häufig)",
      fr: "Tout à fait d'accord (Souvent)",
      es: "Muy de acuerdo (A menudo)"
    }
  },
  {
    value: 4,
    label: {
      en: "Completely Resonates (Always)",
      id: "Sangat Menggambarkan Saya (Selalu)",
      de: "Trifft vollkommen zu (Ständig)",
      fr: "Résonne totalement (Constamment)",
      es: "Me describe por completo (Siempre)"
    }
  }
];

export const MORAL_INJURY_RESULTS: MoralInjuryResultLevel[] = [
  {
    level: "intact_equilibrium",
    scoreRange: [0, 11],
    title: {
      en: "Intact Moral Equilibrium · Low Ethical Distress",
      id: "Keseimbangan Moral Utuh · Beban Etis Rendah",
      de: "Intakte moralische Balance · Geringe ethische Belastung",
      fr: "Équilibre Moral Intact · Faible Détresse Éthique",
      es: "Equilibrio Moral Intacto · Mínima Angustia Ética"
    },
    badge: {
      en: "Moral Integrity",
      id: "Integritas Utuh",
      de: "Intakte Werte",
      fr: "Intégrité Préservée",
      es: "Integridad Moral"
    },
    summary: {
      en: "Your core values and ethical compass remain largely intact. While you may have witnessed occasional bureaucratic friction or unfairness, you have not sustained significant moral injury or institutional betrayal.",
      id: "Prinsip moral dan kompas etika Anda masih utuh. Meskipun Anda mungkin pernah melihat ketidakadilan sesekali, Anda tidak mengalami trauma moral injury atau pengkhianatan sistem yang mendalam.",
      de: "Ihr innerer ethischer Kompass ist stabil. Gelegentliche bürokratische Frustrationen haben bei Ihnen keine tiefe seelische Verwundung hinterlassen.",
      fr: "Vos repères éthiques demeurent solides. Vous n'avez pas subi de rupture traumatique de confiance avec vos valeurs ou les institutions.",
      es: "Tu brújula moral se mantiene firme. No presentas heridas éticas profundas ni desilusión existencial paralizante."
    },
    neurobiology: {
      en: "Preserved coherence between the medial prefrontal cortex (value alignment) and insula. Absence of chronic neuroendocrine guilt signaling or hyperactive autonomic alienation.",
      id: "Koherensi terjaga antara korteks prefrontal medial dan insula. Tidak ada sinyal rasa bersalah neuroendokrin kronis.",
      de: "Harmonische Aktivität im medialen präfrontalen Kortex ohne Anzeichen chronischer moralischer Dissonanz.",
      fr: "Cohérence neuronale préservée sans surcharge allostatique liée à la culpabilité.",
      es: "Actividad prefrontal equilibrada sin activación de dolor moral crónico en el córtex cingulado."
    },
    actionProtocol: {
      en: [
        "Strengthen value boundaries: Define non-negotiable ethical red lines in your career and relationships.",
        "Practice proactive transparency: Maintain open dialogue in your community before compromises arise.",
        "Daily grounding reflections: Use Nuju's voice journal to articulate your core moral intentions every week."
      ],
      id: [
        "Pertegas batasan nilai: Tentukan garis batas moral yang tidak bisa dinegosiasikan dalam karir dan pertemanan.",
        "Jaga transparansi: Bicarakan keresahan etika sejak dini sebelum kompromi berlarut-larut.",
        "Refleksi penguatan: Gunakan jurnal audio Nuju untuk merawat niat baik dan prinsip hidup Anda setiap minggu."
      ],
      de: [
        "Wertegrenzen festigen: Definieren Sie unantastbare rote Linien im Beruf und Privatleben.",
        "Transparenz leben: Ethische Zweifel frühzeitig im Team oder Umfeld ansprechen.",
        "Wöchentliche Stimmpraxis: Im Nuju-Journal persönliche Ideale und Haltungen verankern."
      ],
      fr: [
        "Définissez vos limites éthiques : Clarifiez vos lignes rouges non négociables dans votre vie professionnelle.",
        "Communication proactive : Exprimez vos doutes moraux dès qu'un malaise survient.",
        "Ancrage par la voix : Utilisez le journal vocal Nuju pour clarifier vos intentions hebdomadaires."
      ],
      es: [
        "Fija líneas rojas éticas: Establece límites claros que jamás tolerarás que se crucen en el trabajo.",
        "Transparencia activa: Expresa dudas morales antes de que las presiones te obliguen a ceder.",
        "Reflexión vocal periódica: Graba notas de voz en Nuju para reafirmar tus valores fundamentales."
      ]
    }
  },

  {
    level: "mild_distress",
    scoreRange: [12, 20],
    title: {
      en: "Mild Moral Distress · Early Value Dissonance",
      id: "Distres Moral Ringan · Gesekan Nilai Awal",
      de: "Leichte moralische Belastung · Frühe Wertedissonanz",
      fr: "Détresse Morale Légère · Dissonance Éthique Initiale",
      es: "Disfunción Moral Leve · Disonancia Ética Temprana"
    },
    badge: {
      en: "Ethical Friction",
      id: "Gesekan Etis",
      de: "Werte-Reibung",
      fr: "Friction Éthique",
      es: "Fricción Ética"
    },
    summary: {
      en: "You are experiencing uncomfortable ethical compromise or institutional disappointment. You notice rising frustration with workplace hypocrisy, but your existential trust in humanity has not collapsed.",
      id: "Anda mulai merasakan kompromi etika yang mengganjal atau kekecewaan terhadap sistem. Ada kejengkelan terhadap kemunafikan lingkungan kerja, namun kepercayaan dasar Anda terhadap kemanusiaan belum runtuh.",
      de: "Sie spüren wachsende Frustration über institutionelle Heuchelei oder unschöne Kompromisse. Ihre grundsätzliche Zuversicht ist jedoch noch nicht zerstört.",
      fr: "Vous ressentez des compromis éthiques inconfortables ou des déceptions professionnelles. Votre foi fondamentale en l'humain reste présente.",
      es: "Experimentas un malestar ético evidente por hipocresías del entorno. Tu confianza en la bondad humana aún no se ha quebrado del todo."
    },
    neurobiology: {
      en: "Intermittent anterior cingulate activation signalling cognitive dissonance between personal values and institutional demands. Mild sympathetic irritation without deep despair.",
      id: "Aktivasi intermiten korteks singulata anterior yang menandakan disonansi kognitif antara nilai pribadi dan tuntutan institusi.",
      de: "Gelegentliche Aktivierung des anterioren cingulären Kortex durch moralischen Zwiespalt.",
      fr: "Dissonance cognitive entre les injonctions extérieures et la conscience personnelle.",
      es: "Disonancia cognitiva moderada entre exigencias externas y conciencia individual."
    },
    actionProtocol: {
      en: [
        "Document boundary breaches: Keep an objective log of institutional actions that cross your ethical standards.",
        "Cultivate an ethical peer anchor: Discuss moral dilemmas with a trusted colleague outside the chain of command.",
        "Offload ethical exhaustion: Record uncensored reflections into Nuju's encrypted audio journal to clarify where you stand."
      ],
      id: [
        "Catat pelanggaran batas: Buat catatan objektif mengenai kebijakan kantor yang bertentangan dengan prinsip Anda.",
        "Cari teman berprinsip: Diskusikan dilema etika dengan sahabat di luar lingkaran komando atasan.",
        "Ventilasi beban batin: Rekam unek-unek Anda di jurnal audio Nuju untuk mengurai kekeruhan pikiran secara aman."
      ],
      de: [
        "Grenzüberschreitungen dokumentieren: Sachliche Notizen über bedenkliche Vorgänge führen.",
        "Ethische Vertrauensperson suchen: Dilemmata mit einer außenstehenden Bezugsperson besprechen.",
        "Druck im Nuju-Journal ablassen: Ethische Zweifel privat und verschlüsselt einsprechen."
      ],
      fr: [
        "Notez les dérives : Tenez un journal factuel des situations qui heurtent vos principes.",
        "Trouvez un allié d'intégrité : Échangez sur vos dilemmes avec un pair extérieur à la hiérarchie.",
        "Déchargez la tension : Confiez vos doutes moraux au journal audio chiffré de Nuju."
      ],
      es: [
        "Registra las faltas éticas: Lleva notas objetivas de las situaciones que violan tus principios.",
        "Busca un confidente íntegro: Habla de tus dilemmas con alguien fuera de la cadena de mando.",
        "Desahogo vocal seguro: Graba tus dudas éticas en el diario cifrado de Nuju sin temor a represalias."
      ]
    }
  },

  {
    level: "moderate_injury",
    scoreRange: [21, 30],
    title: {
      en: "Moderate Moral Injury · Active Existential Fracture",
      id: "Moral Injury Moderat · Retak Eksistensial & Pengkhianatan",
      de: "Moderates Moral Injury · Spürbarer seelischer Vertrauensbruch",
      fr: "Blessure Morale Modérée · Fêlure Existentielle Active",
      es: "Herida Moral Moderada · Fractura Existencial Activa"
    },
    badge: {
      en: "Moral Fracture",
      id: "Retak Moral",
      de: "Seelen-Riss",
      fr: "Fissure Morale",
      es: "Fractura Moral"
    },
    summary: {
      en: "You have sustained a significant moral wound according to Dr. Brett Litz criteria. You carry noticeable guilt from forced complicity or profound bitterness from institutional betrayal. Cynicism is beginning to color your daily outlook.",
      id: "Anda mengalami luka moral yang nyata menurut kriteria Dr. Brett Litz. Anda memikul rasa bersalah akibat keterpaksaan berkompromi atau kepahitan mendalam karena dikhianati sistem. Sikap sinis mulai mendominasi hidup Anda.",
      de: "Sie tragen eine spürbare moralische Wunde. Bitterkeit über institutionellen Verrat oder Schuldgefühle wegen erzwungenen Mitmachens prägen zunehmend Ihren Alltag.",
      fr: "Vous portez une blessure morale significative. La culpabilité d'avoir dû céder ou l'amertume face à la trahison d'une institution nourrit un cynisme grandissant.",
      es: "Presentas una herida moral considerable. La culpa por complicidades forzadas o la decepción ante sistemas corruptos están tiñendo tu vida de amargura."
    },
    neurobiology: {
      en: "Persistent fronto-insular dysregulation. Elevated inflammatory cytokines linked to chronic shame and suppressed outrage. The ventral vagal social engagement system is withdrawing into protective alienation.",
      id: "Disregulasi fronto-insular berkepanjangan. Sitokin inflamasi meningkat akibat rasa malu dan amarah tertahan.",
      de: "Anhaltende Dysregulation im Inselkortex und erhöhte Entzündungswerte durch chronische Scham und Bitterkeit.",
      fr: "Dysrégulation insulaire persistante liée à la honte et à la colère morale refoulée.",
      es: "Alteración persistente en la ínsula anterior por rencor acumulado y vergüenza ética crónica."
    },
    actionProtocol: {
      en: [
        "Differentiate guilt from responsibility: Identify what was genuinely under your control versus systemic coercion.",
        "Establish an exit or transition plan: Stop sacrificing your mental soul to an inherently corrupt institution.",
        "Safe audio confession & reclamation: Channel moral grief, anger, and loss of innocence into Nuju's voice journal every evening."
      ],
      id: [
        "Pisahkan rasa bersalah dari tanggung jawab: Petakan mana yang murni pilihan Anda dan mana yang paksaan sistem.",
        "Rancang rencana transisi/keluar: Berhentilah mengorbankan nurani Anda untuk organisasi yang korup.",
        "Reklamasi martabat batin di Nuju: Salurkan duka moral dan kemarahan ke jurnal suara pribadi Nuju setiap malam."
      ],
      de: [
        "Schuld von Sachzwang trennen: Erkennen, was eigene Entscheidung war und was systemischer Druck.",
        "Ausstiegsplan erarbeiten: Nicht weiter die eigene Seele für ein dysfunktionales System opfern.",
        "Seelische Entgiftung im Nuju-Journal: Trauer über verlorene Ideale und Wut abends unzensiert einsprechen."
      ],
      fr: [
        "Distinguez culpabilité et contrainte : Identifiez ce qui relevait de votre choix réel et ce qui était imposé.",
        "Préparez une porte de sortie : Ne sacrifiez plus votre santé morale à une organisation toxique.",
        "Réconciliation intérieure : Déposez vos tourments moraux chaque soir dans le journal vocal chiffré de Nuju."
      ],
      es: [
        "Distingue culpa de coacción: Reconoce qué estuvo bajo tu control y qué fue presión institucional forzada.",
        "Diseña una estrategia de salida: Deja de destruir tu paz interior por una estructura que no cambiará.",
        "Desahogo ético en Nuju: Expresa tu rabia y dolor moral cada noche en el diario de voz privado de Nuju."
      ]
    }
  },

  {
    level: "severe_injury",
    scoreRange: [31, 39],
    title: {
      en: "Severe Moral Injury · Deep Cynicism & Institutional Wound",
      id: "Moral Injury Berat · Sinisme Akut & Luka Pengkhianatan Mendalam",
      de: "Schweres Moral Injury · Tiefe Verbitterung & Seelentrauma",
      fr: "Blessure Morale Sévère · Cynisme Profond & Trahison Institutionnelle",
      es: "Herida Moral Severa · Cinismo Profundo y Trauma Institucional"
    },
    badge: {
      en: "Soul Wound",
      id: "Luka Jiwa",
      de: "Seelen-Trauma",
      fr: "Âme Blessée",
      es: "Herida del Alma"
    },
    summary: {
      en: "You are in a state of severe moral injury. The betrayal of trusted authorities has poisoned your ability to feel safe in human society. You experience deep existential alienation, persistent self-reproach, and pervasive bitterness toward systemic hypocrisy.",
      id: "Anda berada dalam kondisi moral injury tingkat berat. Pengkhianatan institusi meracuni rasa aman Anda hidup di tengah masyarakat. Anda mengalami keterasingan eksistensial, penyesalan mendalam, dan kepahitan kronis terhadap kemunafikan sistem.",
      de: "Sie leiden unter einem schweren Moral Injury. Der Vertrauensbruch von Autoritäten hat Ihre Fähigkeit vergiftet, sich in der Gesellschaft sicher zu fühlen. Tiefe seelische Entfremdung dominiert Ihr Erleben.",
      fr: "Vous souffrez d'une blessure morale sévère. La trahison subie a détruit votre sentiment de sécurité humaine. Vous vivez dans un exil intérieur teinté d'amertume et de culpabilité.",
      es: "Atraviesas una herida moral severa. La traición institucional destruyó tu sensación de seguridad en el mundo. Vives en un aislamiento existencial cargado de dolor y desconfianza."
    },
    neurobiology: {
      en: "Severe allostatic overload of the moral cognition network (ventromedial prefrontal cortex, precuneus, and amygdala). Chronic hyperarousal alternating with depressive apathy and loss of social bonding capacity.",
      id: "Beban stres alostatik berat pada jaringan kognisi moral otak. Kecemasan kronis bergantian dengan keputusasaan apatis.",
      de: "Chronische Überlastung der moralischen Gehirnnetzwerke. Ständiger Wechsel zwischen zorniger Erregung und apathischer Resignation.",
      fr: "Surcharge allostatique massive du réseau cérébral de la morale. Oscillation entre colère sourde et apathie résignée.",
      es: "Sobrecarga alostática severa en los circuitos cerebrales del juicio moral. Alternancia entre rabia y desconexión afectiva."
    },
    actionProtocol: {
      en: [
        "Cease toxic loyalty: Cut emotional and professional ties with corrupt leaders or organizations immediately.",
        "Join a moral injury survivor community: Connect with peers (healthcare, veterans, corporate whistleblowers) who share your reality.",
        "Private vocal grief practice: Speak your rawest feelings of contamination, rage, and grief into Nuju's voice sanctuary to discharge somatic tension."
      ],
      id: [
        "Hentikan loyalitas buta: Putuskan ikatan emosional dan profesional dengan pemimpin atau sistem yang korup.",
        "Cari komunitas sesama penyintas: Terhubunglah dengan orang-orang yang memahami pahitnya dikhianati oleh sistem.",
        "Keluarkan duka lewat suara: Tumpahkan amarah, rasa jijik, dan duka moral ke dalam jurnal suara Nuju tanpa rasa takut dihakimi."
      ],
      de: [
        "Falsche Loyalität kündigen: Emotionale und berufliche Bindungen zu toxischen Systemen radikal kappen.",
        "Gleichgesinnte suchen: Austausch mit anderen Betroffenen (Gesundheitswesen, Whistleblower) suchen.",
        "Stimmliche Entlastung in Nuju: Zorn, Ohnmacht und Ekel im Nuju-Audio-Journal unzensiert aussprechen."
      ],
      fr: [
        "Rompez les loyautés toxiques : Coupez les ponts avec les structures ou dirigeants défaillants.",
        "Rejoignez des pairs : Échangez avec d'autres personnes ayant vécu des trahisons éthiques comparables.",
        "Purge vocale intime : Déversez vos cris de colère et votre dégoût dans le sanctuaire audio de Nuju."
      ],
      es: [
        "Rompe lealtades dañinas: Corta de raíz tus vínculos con líderes o entidades que pisotean tu ética.",
        "Busca pares con vivencias similares: Conéctate con personas que hayan sufrido traiciones institucionales.",
        "Desahogo vocal sin censura: Graba tu dolor, indignación y asco en Nuju para liberar tu sistema nervioso."
      ]
    }
  },

  {
    level: "catastrophic_despair",
    scoreRange: [40, 48],
    title: {
      en: "Catastrophic Moral Injury · Shattered Worldview & Existential Collapse",
      id: "Moral Injury Katastropik · Kehancuran Pandangan Hidup & Keputusasaan",
      de: "Katastrophales Moral Injury · Totaler Zusammenbruch des Weltbilds",
      fr: "Blessure Morale Catastrophique · Effondrement du Sens & Désespoir",
      es: "Herida Moral Catastrófica · Colapso Existencial y Pérdida Total de Sentido"
    },
    badge: {
      en: "Existential Crisis",
      id: "Krisis Eksistensial",
      de: "Existenz-Krise",
      fr: "Crise Existentielle",
      es: "Crisis Existencial"
    },
    summary: {
      en: "You are in an acute spiritual and psychological emergency. Your foundational trust in humanity, justice, and self-worth has collapsed into profound despair. You feel completely alienated from normal life and need urgent, trauma-informed moral reconciliation support.",
      id: "Anda berada dalam kondisi darurat spiritual dan psikologis akut. Kepercayaan dasar Anda terhadap keadilan dan harga diri telah hancur. Anda merasa terasing total dari kehidupan normal dan membutuhkan pemulihan trauma moral segera.",
      de: "Sie befinden sich in einer akuten seelischen Notlage. Ihr Urvertrauen in Menschlichkeit und Gerechtigkeit ist komplett zerbrochen. Dringende traumasensible Unterstützung ist erforderlich.",
      fr: "Vous traversez une crise existentielle et éthique extrême. Votre confiance en la justice et en l'humanité a sombré dans un néant douloureux. Une aide thérapeutique spécialisée est impérative.",
      es: "Te encuentras en una emergencia psicológica y espiritual límite. Tu confianza en la justicia y en la especie humana se ha desplomado por completo. Necesitas apoyo terapéutico especializado de inmediato."
    },
    neurobiology: {
      en: "Maximal neurochemical and autonomic collapse. Extreme dorsal vagal dissociation, hyper-sensitized pain processing in the anterior cingulate cortex, and collapse of neurogenesis in the hippocampus due to chronic existential stress.",
      id: "Kolaps neurokimia dan otonom maksimal. Disosiasi dorsal vagal ekstrem dan rasa sakit emosional yang melumpuhkan otak.",
      de: "Vollständiger Zusammenbruch der autonomen Selbstregulation. Maximale dorsale Vagus-Erstarrung und tiefe existenzielle Hoffnungslosigkeit.",
      fr: "Effondrement neurochimique profond. Dissociation vagale dorsale maximale et souffrance morale insoutenable.",
      es: "Colapso autonómico total. Disociación vagal dorsal severa y dolor existencial paralizante."
    },
    actionProtocol: {
      en: [
        "Trauma-informed moral therapy: Seek a clinician experienced in Moral Injury (e.g. Cognitive Processing Therapy or Acceptance and Commitment Therapy for Moral Injury).",
        "Rebuild micro-connections: Avoid massive social demands; spend quiet time in nature or with animals where betrayal does not exist.",
        "Daily unburdening in Nuju: Whisper raw existential pain into Nuju's encrypted audio sanctuary every night to anchor your nervous system back to safety."
      ],
      id: [
        "Konseling trauma moral berlisensi: Dapatkan bantuan psikolog berpengalaman dalam menangani Moral Injury dan pengkhianatan sistem.",
        "Bangun koneksi mikro aman: Jauhi keramaian; habiskan waktu di alam terbuka atau bersama hewan peliharaan yang tulus.",
        "Bicara tanpa tuntutan di Nuju: Berbisiklah ke jurnal suara Nuju setiap malam untuk memulihkan rasa aman di dalam tubuh Anda."
      ],
      de: [
        "Traumaspezifische Psychotherapie: Professionelle Hilfe bei Therapeuten mit Erfahrung im Bereich Moral Injury suchen.",
        "Reizfreie Mikro-Verbindungen: Zeit in der Natur oder mit Tieren verbringen, wo kein Verrat existiert.",
        "Tägliche Stimmentlastung in Nuju: Flüstere deine existenzielle Not ins Nuju-Audio-Journal, um dich behutsam wieder zu erden."
      ],
      fr: [
        "Psychothérapie spécialisée en blessure morale : Consultez un praticien formé aux traumatismes éthiques et institutionnels.",
        "Reconnexion minimale et douce : Privilégiez le contact avec la nature et les animaux, à l'abri de toute trahison humaine.",
        "Sanctuaire audio bienveillant : Murmurez votre détresse dans Nuju chaque soir pour réancrer votre corps dans la sécurité."
      ],
      es: [
        "Terapia especializada en trauma moral: Acude a un profesional con experiencia en heridas éticas y traición institucional.",
        "Microconexiones seguras: Pasa tiempo en la naturaleza o con animales, lejos de falsedades e hipocresías humanas.",
        "Sanctuary vocal en Nuju: Susurra tu dolor más íntimo en el diario cifrado de Nuju cada noche para recuperar la calma interior."
      ]
    }
  }
];

export const MORAL_INJURY_SUBSCALE_INFO = {
  institutional_betrayal: {
    name: {
      en: "Institutional Betrayal & Broken Leadership",
      id: "Pengkhianatan Institusi & Pemimpin Munafik",
      de: "Institutioneller Vertrauensbruch & Führungsversagen",
      fr: "Trahison Institutionnelle & Faille Hiérarchique",
      es: "Traición Institucional y Quiebre de Liderazgo"
    },
    description: {
      en: "Sacrifice of human ethics for corporate profit, PR, gaslighting whistleblowers, and administrative negligence.",
      id: "Pengorbanan etika demi laba/citra, pembungkaman suara kritis, dan pengabaian kesejahteraan manusia oleh sistem.",
      de: "Opferung ethischer Werte für Profit, Mundtotmachen von Kritikern und systemisches Führungsversagen.",
      fr: "Sacrifice de l'humain au profit du pouvoir, mépris des lanceurs d'alerte et négligence administrative.",
      es: "Sacrificio de la ética por beneficio empresarial, silenciamiento de quejas y negligencia de superiores."
    }
  },
  transgression_guilt: {
    name: {
      en: "Transgression Guilt & Moral Compromise",
      id: "Rasa Bersalah & Kompromi Moral Terpaksa",
      de: "Schuldgefühle & Erzwungene Kompromisse",
      fr: "Culpabilité de Transgression & Compromission",
      es: "Culpa por Transgresión y Compromiso Ético"
    },
    description: {
      en: "Acts of commission or omission where one violated their own conscience under systemic coercion or self-preservation.",
      id: "Tindakan atau sikap diam yang melanggar nurani sendiri demi mengamankan pekerjaan atau keselamatan pribadi.",
      de: "Handlungen oder Schweigen entgegen dem eigenen Gewissen unter Druck oder aus Angst um den Arbeitsplatz.",
      fr: "Actes ou silences imposés par le système qui bafouent la conscience personnelle et nourrissent la honte.",
      es: "Acciones u omisiones que traicionaron la propia conciencia bajo coacción o necesidad de supervivencia."
    }
  },
  existential_alienation: {
    name: {
      en: "Existential Alienation & Shattered Trust",
      id: "Keterasingan Eksistensial & Hilangnya Kepercayaan",
      de: "Existenzielle Entfremdung & Verlorenes Urvertrauen",
      fr: "Aliénation Existentielle & Perte de Confiance",
      es: "Alienación Existencial y Quiebre de Confianza"
    },
    description: {
      en: "Collapse of faith in human justice, profound loneliness, cynicism toward authority, and questioning the value of integrity.",
      id: "Runtuhnya keyakinan pada keadilan, sinisme akut, rasa kesepian mendalam, dan meragukan arti hidup jujur.",
      de: "Zusammenbruch des Glaubens an Gerechtigkeit, erdrückende Einsamkeit und Zweifel am Sinn ehrlichen Handelns.",
      fr: "Perte totale de foi en la justice humaine, cynisme envers l'autorité et sentiment de solitude absolue.",
      es: "Derrumbe de la fe en la justicia del mundo, soledad profunda, cinismo y cuestionamiento del sentido de la honradez."
    }
  }
};

export function getMoralInjuryResult(totalScore: number): MoralInjuryResultLevel {
  const matched = MORAL_INJURY_RESULTS.find(
    (lvl) => totalScore >= lvl.scoreRange[0] && totalScore <= lvl.scoreRange[1]
  );
  return matched || MORAL_INJURY_RESULTS[MORAL_INJURY_RESULTS.length - 1];
}

export function calculateMoralInjurySubscales(answers: Record<number, number>): {
  institutional_betrayal: number;
  transgression_guilt: number;
  existential_alienation: number;
} {
  let institutional_betrayal = 0;
  let transgression_guilt = 0;
  let existential_alienation = 0;

  MORAL_INJURY_QUESTIONS.forEach((q) => {
    const val = answers[q.id] || 0;
    if (q.subscale === "institutional_betrayal") institutional_betrayal += val;
    if (q.subscale === "transgression_guilt") transgression_guilt += val;
    if (q.subscale === "existential_alienation") existential_alienation += val;
  });

  return { institutional_betrayal, transgression_guilt, existential_alienation };
}
