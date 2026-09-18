export type RocdCardLang = "en" | "id" | "de" | "fr" | "es";

export interface RocdQuestion {
  id: number;
  subscale: "feelings_and_rightness" | "partner_flaw_scrutiny" | "compulsive_checking";
  text: {
    en: string;
    id: string;
    de: string;
    fr: string;
    es: string;
  };
}

export interface RocdResultLevel {
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

export const ROCD_QUESTIONS: RocdQuestion[] = [
  // 1. Feelings and Relationship "Rightness" (Relationship-Centered ROCD)
  {
    id: 1,
    subscale: "feelings_and_rightness",
    text: {
      en: "I am plagued by intrusive, repetitive doubts asking: 'Do I really love my partner?', 'Is this the 'One'?', or 'Am I living a lie?'",
      id: "Saya terus-menerus dihantui keraguan mengganggu: 'Apakah saya benar-benar mencintai pasangan saya?', 'Apakah dia orang yang tepat?', atau 'Apakah saya membohongi diri sendiri?'",
      de: "Ich werde von quälenden, aufdringlichen Zweifeln heimgesucht: 'Liebe ich meinen Partner wirklich?', 'Ist er/sie der/die Richtige?' oder 'Mache ich mir etwas vor?'",
      fr: "Je suis tourmenté(e) par des doutes intrusifs incessants : 'Est-ce que j'aime vraiment mon/ma partenaire ?', 'Est-ce la bonne personne ?' ou 'Suis-je dans le faux ?'",
      es: "Me atormentan dudas intrusivas constantes: '¿Realmente amo a mi pareja?', '¿Es la persona correcta?' o '¿Me estoy engañando a mí mismo?'"
    }
  },
  {
    id: 2,
    subscale: "feelings_and_rightness",
    text: {
      en: "When kissing, being intimate, or holding hands, I hyper-monitor my emotional sensations, feeling panic if I don't feel intense butterflies or fireworks.",
      id: "Saat berciuman atau berpegangan tangan, saya mengawasi detak emosi saya secara berlebihan, dan panik jika tidak merasakan desiran cinta atau gairah yang meletup-letup.",
      de: "Beim Küssen oder bei Intimität beobachte ich meine Gefühle krampfhaft und gerate in Panik, wenn ich keine starken Schmetterlinge im Bauch spüre.",
      fr: "Lors de baisers ou de moments intimes, je surveille constamment mes émotions et panique si je ne ressens pas une passion ou des papillons intenses.",
      es: "Al besar o intimar, monitorizo obsesivamente mis sensaciones corporales y me asusto si no siento mariposas o pasión desbordante."
    }
  },
  {
    id: 3,
    subscale: "feelings_and_rightness",
    text: {
      en: "A momentary feeling of irritation, boredom, or emotional neutrality makes me conclude with terror that our entire relationship is fundamentally doomed.",
      id: "Rasa bosan, jenuh, atau emosi netral sesaat membuat saya langsung menyimpulkan dengan panik bahwa hubungan kami ditakdirkan hancur.",
      de: "Ein flüchtiges Gefühl von Langeweile oder Kälte lässt mich sofort in Panik schließen, dass unsere gesamte Beziehung zum Scheitern verurteilt ist.",
      fr: "Un moment passager d'ennui ou d'indifférence me pousse à conclure avec angoisse que notre relation est une erreur vouée à l'échec.",
      es: "Un momento pasajero de aburrimiento o desinterés me hace concluir con pánico que nuestra relación es un error y debe terminar."
    }
  },
  {
    id: 4,
    subscale: "feelings_and_rightness",
    text: {
      en: "I obsess over whether my partner loves me 'enough' or accurately reciprocates my exact emotional wavelength, dissecting every text tone and glance.",
      id: "Saya terobsesi memikirkan apakah pasangan mencintai saya 'cukup dalam', membedah nada teks dan tatapan matanya untuk mencari tanda ketidaktulusan.",
      de: "Ich grüble obsessiv darüber nach, ob mein Partner mich 'genug' liebt, und analysiere jeden Texttonfall und jeden Blick auf verborgene Zeichen.",
      fr: "J'analyse obsessionnellement si mon/ma partenaire m'aime 'suffisamment', disséquant chaque mot, regard ou temps de réponse par message.",
      es: "Me obsesiono con si mi pareja me ama 'lo suficiente', diseccionando cada mensaje, mirada o silencio en busca de frialdad."
    }
  },

  // 2. Partner Flaw Scrutiny (Partner-Focused ROCD)
  {
    id: 5,
    subscale: "partner_flaw_scrutiny",
    text: {
      en: "I find myself fixating compulsively on my partner's physical appearance (e.g. nose, smile, skin, hair, height, posture) and questioning if they are attractive enough.",
      id: "Saya sering terobsesi memeriksa kekurangan fisik pasangan (bentuk hidung, senyum, kulit, tinggi badan, postur) dan meragukan apakah dia cukup menarik.",
      de: "Ich fixiere mich zwanghaft auf körperliche Makel meines Partners (Nase, Lächeln, Haut, Größe) und zweifle daran, ob er/sie attraktiv genug ist.",
      fr: "Je focalise de manière compulsive sur les détails physiques de mon/ma partenaire (nez, sourire, posture) en doutant de son pouvoir d'attraction.",
      es: "Me obsesiono con rasgos físicos de mi pareja (nariz, sonrisa, piel, estatura) y dudo compulsivamente de si es lo bastante atractiva."
    }
  },
  {
    id: 6,
    subscale: "partner_flaw_scrutiny",
    text: {
      en: "I obsessively evaluate my partner's intelligence, humor, wit, or social status, feeling immense vicarious shame if they say something awkward in public.",
      id: "Saya secara obsesif menilai kecerdasan, selera humor, atau status sosial pasangan, merasa malu luar biasa jika dia canggung saat berbicara di depan umum.",
      de: "Ich bewerte pedantisch die Intelligenz, den Witz oder das Sozialverhalten meines Partners und empfinde heftige Fremdscham bei ungeschickten Äußerungen.",
      fr: "J'évalue obsessionnellement l'intelligence, l'humour ou l'éloquence de mon/ma partenaire, ressentant une honte intolérable s'il/elle est maladroit(e) en public.",
      es: "Examino con lupa la inteligencia, el humor o la cultura de mi pareja, sintiendo una vergüenza ajena insoportable si dice algo torpe en público."
    }
  },
  {
    id: 7,
    subscale: "partner_flaw_scrutiny",
    text: {
      en: "When I notice an irritating habit or perceived character flaw in my partner, my mind magnifies it into an unbearable proof that we are incompatible.",
      id: "Ketika melihat kebiasaan kecil atau kekurangan karakter pasangan, pikiran saya membesarkannya menjadi bukti mutlak bahwa kami tidak cocok.",
      de: "Wenn mir eine Macke oder Schwäche meines Partners auffällt, bläst mein Kopf sie zu einem unumstößlichen Beweis unserer Inkompatibilität auf.",
      fr: "Dès que je remarque un défaut ou une manie chez mon/ma partenaire, mon esprit l'amplifie pour en faire la preuve irréfutable de notre incompatibilité.",
      es: "Cuando noto una manía o defecto de mi pareja, mi mente lo magnifica como prueba irrefutable de que somos incompatibles."
    }
  },
  {
    id: 8,
    subscale: "partner_flaw_scrutiny",
    text: {
      en: "I compare my partner's looks, career, ambition, or affection to other people's partners or attractive strangers on social media, feeling sudden distress.",
      id: "Saya membandingkan fisik, karier, ambisi, atau perhatian pasangan dengan pasangan orang lain atau orang asing di medsos, lalu dilanda kecemasan mendadak.",
      de: "Ich vergleiche das Aussehen, den Erfolg oder die Liebe meines Partners mit den Partnern anderer oder Profilen auf Social Media und gerate in Not.",
      fr: "Je compare le physique, la réussite ou l'affection de mon/ma partenaire avec les couples sur les réseaux sociaux, ressentant une vive détresse.",
      es: "Comparo el físico, el éxito o la ternura de mi pareja con las parejas de otros en redes sociales, sintiendo una angustia inmediata."
    }
  },

  // 3. Compulsive Checking & Reassurance Seeking
  {
    id: 9,
    subscale: "compulsive_checking",
    text: {
      en: "I spend hours endlessly searching Google, Reddit, TikTok, or psychology forums for relationship clarity ('signs you're in the wrong relationship', 'how love feels').",
      id: "Saya menghabiskan berjam-jam menjelajahi Google, Reddit, TikTok, atau forum psikologi ('tanda kamu salah pilih pasangan', 'seperti apa rasa cinta sejati').",
      de: "Ich verbringe Stunden damit, Google, Reddit oder Foren nach Gewissheit zu durchsuchen ('Wann weiß man dass es Liebe ist', 'Falscher Partner Anzeichen').",
      fr: "Je passe des heures à fouiller Google, Reddit ou des forums pour trouver des certitudes ('signes qu'on est avec la mauvaise personne', 'définition du grand amour').",
      es: "Paso horas buscando certezas en Google, Reddit o foros ('señales de que estás con la persona equivocada', 'cómo saber si es amor verdadero')."
    }
  },
  {
    id: 10,
    subscale: "compulsive_checking",
    text: {
      en: "I repeatedly seek reassurance from close friends, family, or tarot/astrology about whether my partner is 'good enough' or if we should stay together.",
      id: "Saya berulang kali meminta kepastian dari teman dekat, keluarga, atau ramalan astrologi/tarot mengenai apakah pasangan saya cukup baik untuk dipertahankan.",
      de: "Ich hole mir ständig Rückversicherung bei Freunden, Familie oder Horoskopen, ob mein Partner 'gut genug' ist oder ob ich die Beziehung beenden sollte.",
      fr: "Je demande sans cesse l'avis de mes amis, de ma famille ou de tests en ligne pour me rassurer sur la viabilité de mon couple.",
      es: "Pido constantemente confirmación a amigos, familiares o tests sobre si mi pareja es 'suficiente' o si debería romper."
    }
  },
  {
    id: 11,
    subscale: "compulsive_checking",
    text: {
      en: "I compulsively compare my current relationship to past ex-partners, romantic movie ideals, or historical memories to test if I felt 'more' back then.",
      id: "Saya secara kompulsif membandingkan hubungan saat ini dengan mantan, film romantis, atau memori masa lalu untuk menguji apakah dulu saya merasa 'lebih cinta'.",
      de: "Ich vergleiche meine Beziehung zwanghaft mit Ex-Partnern oder Film-Idealen, um zu prüfen, ob ich früher 'intensiver' empfunden habe.",
      fr: "Je compare compulsivement ma relation actuelle avec mes ex ou des idéaux de films romantiques pour vérifier si j'aimais 'plus fort' auparavant.",
      es: "Comparo compulsivamente mi relación actual con exparejas o ideales románticos para comprobar si antes sentía 'más intensidad'."
    }
  },
  {
    id: 12,
    subscale: "compulsive_checking",
    text: {
      en: "I feel a relentless urge to confess my doubts to my partner or pick sudden fights to test their emotional commitment and reaction.",
      id: "Saya merasakan dorongan kuat untuk mengaku bahwa saya meragukan perasaan saya pada pasangan, atau sengaja memicu pertengkaran untuk menguji komitmennya.",
      de: "Ich spüre den quälenden Drang, meinem Partner meine Zweifel zu beichten oder Streit anzuzetteln, um seine/ihre Liebe auf die Probe zu stellen.",
      fr: "Je ressens le besoin compulsif d'avouer mes doutes à mon/ma partenaire ou de provoquer des disputes pour tester son attachement.",
      es: "Siento una necesidad compulsiva de confesar mis dudas a mi pareja o provocar discusiones para poner a prueba su compromiso."
    }
  }
];

export const ROCD_OPTIONS = [
  {
    value: 0,
    label: {
      en: "Not at all / Never",
      id: "Sama sekali tidak / Tidak pernah",
      de: "Überhaupt nicht / Nie",
      fr: "Pas du tout / Jamais",
      es: "En absoluto / Nunca"
    }
  },
  {
    value: 1,
    label: {
      en: "A little (Once a month)",
      id: "Sedikit (Sebulan sekali)",
      de: "Ein wenig (Einmal im Monat)",
      fr: "Un peu (Une fois par mois)",
      es: "Un poco (Una vez al mes)"
    }
  },
  {
    value: 2,
    label: {
      en: "Moderately (Weekly)",
      id: "Cukup sering (Mingguan)",
      de: "Mäßig (Wöchentlich)",
      fr: "Modérément (Chaque semaine)",
      es: "Moderadamente (Semanal)"
    }
  },
  {
    value: 3,
    label: {
      en: "Very much (Several times a week)",
      id: "Sangat sering (Beberapa kali seminggu)",
      de: "Sehr oft (Mehrmals pro Woche)",
      fr: "Beaucoup (Plusieurs fois par semaine)",
      es: "Mucho (Varias veces por semana)"
    }
  },
  {
    value: 4,
    label: {
      en: "Extremely / Daily Compulsion",
      id: "Ekstrem / Kompulsi Harian",
      de: "Extrem / Täglicher Zwang",
      fr: "Extrêmement / Obsession quotidienne",
      es: "Extremadamente / Obsesión diaria"
    }
  }
];

export const ROCD_RESULTS: RocdResultLevel[] = [
  {
    level: "relational_grounding",
    scoreRange: [0, 10],
    title: {
      en: "Relational Grounding (Secure Acceptance & Healthy Ambivalence)",
      id: "Fondasi Relasi Kokoh (Penerimaan Tenang & Ambivalensi Sehat)",
      de: "Beziehungssicherheit (Sichere Akzeptanz & gesunde Ambivalenz)",
      fr: "Ancrage Relationnel Sécurisant (Acceptation & Ambivalence Saine)",
      es: "Arraigo Relacional Seguro (Aceptación Serena y Ambivalencia Sana)"
    },
    summary: {
      en: "Your relationship thoughts reflect healthy human variation rather than obsessive-compulsive loops. You understand that love is not a 24/7 Hollywood adrenaline high, and you can tolerate minor partner flaws without catastrophic doubts.",
      id: "Pikiran Anda mencerminkan dinamika hubungan manusia yang wajar, bukan lingkaran obsesif-kompulsif. Anda memahami cinta sejati bukan desiran dopamin 24 jam nonstop, dan mampu menerima kekurangan kecil pasangan tanpa rasa panik.",
      de: "Ihre Beziehungsmuster spiegeln gesunde menschliche Schwankungen wider. Sie begreifen, dass Liebe kein 24/7-Hollywood-Rausch ist, und können kleine Eigenheiten Ihres Partners ohne Panik aushalten.",
      fr: "Vos pensées relèvent d'une variabilité normale du lien amoureux. Vous comprenez que l'amour n'est pas un feu d'artifice permanent et acceptez les imperfections de l'autre sans angoisse existentielle.",
      es: "Tus pensamientos sobre la pareja reflejan una flexibilidad sana. Entiendes que el amor real no es una película de euforia continua y aceptas los defectos cotidianos sin entrar en pánico."
    },
    neurobiology: {
      en: "Optimal fronto-striatal balance with balanced anterior cingulate cortex (ACC) monitoring. Intrusive relational doubts are dismissed as background noise without triggering anxiety spikes.",
      id: "Keseimbangan fronto-striatal yang optimal; anterior cingulate cortex (ACC) memfilter pikiran mengganggu sebagai sinyal latar belakang tanpa memicu alarm amigdala.",
      de: "Optimale Balance im fronto-striatalen Schaltkreis; flüchtige Zweifel werden vom anterioren cingulären Kortex gelassen als Hintergrundrauschen abgetan.",
      fr: "Équilibre fronto-striatal optimal ; le cortex cingulaire antérieur filtre les doutes passagers sans déclencher l'alarme de l'amygdale.",
      es: "Equilibrio frontoestriatal óptimo; la corteza cingulada anterior descarta dudas pasajeras como mero ruido sin disparar pánico."
    },
    actionProtocol: {
      en: [
        "Continue practicing realistic love: appreciating quiet companionship over constant drama.",
        "Reflect on values rather than fleeting emotional moods during voice check-ins.",
        "Celebrate your partner's quirks without perfectionistic demands."
      ],
      id: [
        "Pertahankan perspektif realistis: hargai ketenangan dan kebersamaan di atas drama.",
        "Fokus pada nilai-nilai hidup bersama saat merekam refleksi suara di Nuju.",
        "Terima keunikan pasangan tanpa tuntutan kesempurnaan yang tidak masuk akal."
      ],
      de: [
        "Bewahren Sie ein realistisches Liebesbild: stille Verbundenheit über Drama stellen.",
        "Reflektieren Sie gemeinsame Werte statt flüchtige Stimmungsschwankungen.",
        "Schätzen Sie Eigenheiten des Partners ohne Perfektionismusdruck."
      ],
      fr: [
        "Cultivez un amour réaliste : privilégiez la complicité sereine aux montagnes russes émotionnelles.",
        "Ancrez-vous dans vos valeurs partagées plutôt que dans vos humeurs passagères.",
        "Appréciez les particularités de l'autre sans exigence de perfection."
      ],
      es: [
        "Mantén una visión realista del amor: valora la complicidad tranquila sobre el drama.",
        "Reflexiona sobre valores mutuos en lugar de cambios de humor pasajeros.",
        "Acepta las manías de tu pareja sin caer en exigencias perfeccionistas."
      ]
    },
    badge: {
      en: "Secure Relationship Anchor",
      id: "Jangkar Relasi Aman",
      de: "Sicherer Beziehungsanker",
      fr: "Ancre Relationnelle Sûre",
      es: "Anclaje de Pareja Seguro"
    }
  },
  {
    level: "mild_doubt",
    scoreRange: [11, 20],
    title: {
      en: "Mild Relationship Insecurity (Occasional Scrutiny)",
      id: "Keraguan Relasi Ringan (Penelitian Pasangan Sesekali)",
      de: "Leichte Beziehungsunsicherheit (Gelegentliche Zweifel)",
      fr: "Insécurité de Couple Légère (Doutes Ponctuels)",
      es: "Inseguridad de Pareja Leve (Dudas Ocasionales)"
    },
    summary: {
      en: "You experience sporadic relationship questioning, particularly during stressful life transitions or after seeing idealized couples online. However, these doubts do not consume hours of your day or severely disrupt your intimacy.",
      id: "Anda sesekali meragukan hubungan, terutama saat stres kerja atau melihat pasangan 'sempurna' di media sosial. Namun keraguan ini belum menyita berjam-jam waktu Anda atau merusak keintiman secara drastis.",
      de: "Sie erleben gelegentliche Zweifel an Ihrer Beziehung, vor allem bei Stress oder dem Vergleich mit Social-Media-Paaren. Diese Gedanken dominieren Ihren Alltag jedoch noch nicht dauerhaft.",
      fr: "Vous traversez des doutes passagers, particulièrement lors de périodes de fatigue ou en vous comparant aux couples idéalisés sur internet. Ces pensées restent sous contrôle.",
      es: "Experimentas dudas puntuales, sobre todo en momentos de estrés o tras compararte con parejas ideales en redes sociales, sin llegar a paralizar tu rutina."
    },
    neurobiology: {
      en: "Mild hyper-reactivity in the orbital frontal cortex when comparing reality to perfectionistic romantic ideals, creating brief dopamine and oxytocin drops.",
      id: "Hiperaktivitas ringan di korteks orbitofrontal saat membandingkan kenyataan dengan ilusi romantis sempurna, memicu penurunan dopamin sesaat.",
      de: "Leichte Übererregung im orbitofrontalen Kortex beim Abgleich der Realität mit romantischen Mythen, was kurze Enttäuschungsschübe erzeugt.",
      fr: "Légère suractivation du cortex orbitofrontal face aux mythes romantiques, provoquant des chutes passagères d'ocytocine.",
      es: "Leve sobreactivación de la corteza orbitofrontal al confrontar la realidad con mitos románticos, generando desasosiego transitorio."
    },
    actionProtocol: {
      en: [
        "Limit doom-scrolling couple aesthetics and romantic 'relationship goals' media.",
        "Practice letting relationship doubts exist as neutral thoughts without solving them immediately.",
        "Voice journal your honest feelings for 2 minutes on Nuju without censoring or judging."
      ],
      id: [
        "Batasi konsumsi konten media sosial bertema 'couple goals' yang tidak realistis.",
        "Biarkan keraguan melintas sebagai pikiran netral tanpa harus buru-buru mencari jawaban.",
        "Gunakan voice journal Nuju selama 2 menit untuk meluapkan perasaan tanpa menyaringnya."
      ],
      de: [
        "Reduzieren Sie den Konsum unberechtigter 'Couple Goals'-Beiträge in sozialen Netzwerken.",
        "Lernen Sie, Beziehungszweifel als neutrale Gedanken vorbeiziehen zu lassen.",
        "Sprechen Sie Ihre Emotionen 2 Minuten unzensiert in Nuju ein, um Druck abzubauen."
      ],
      fr: [
        "Limitez l'exposition aux vidéos de couples idéalisés sur TikTok et Instagram.",
        "Entraînez-vous à tolérer une pensée de doute sans chercher à la résoudre d'urgence.",
        "Enregistrez vos émotions brutes 2 minutes sur Nuju sans filtre ni jugement."
      ],
      es: [
        "Reduce el consumo de contenido irreal de parejas perfectas en redes sociales.",
        "Aprende a observar las dudas como simples pensamientos sin necesidad de darles respuesta.",
        "Graba un desahogo de voz de 2 minutos en Nuju para drenar la mente sin juicios."
      ]
    },
    badge: {
      en: "Mild Romantic Uncertainty",
      id: "Keraguan Romantis Ringan",
      de: "Leichte romantische Skepsis",
      fr: "Incertitude Amoureuse Légère",
      es: "Incertidumbre Amorosa Leve"
    }
  },
  {
    level: "moderate_rocd",
    scoreRange: [21, 31],
    title: {
      en: "Moderate ROCD Intrusion (Frequent Hyper-Scrutiny & Checking)",
      id: "Intrusi ROCD Moderat (Sering Memeriksa & Membedah Pasangan)",
      de: "Moderate ROCD-Symptomatik (Häufiges Grübeln & Makel-Scannen)",
      fr: "Intrusions ROCD Modérées (Scrutin & Vérifications Fréquentes)",
      es: "Intrusión ROCD Moderada (Escrutinio Frecuente y Comprobación)"
    },
    summary: {
      en: "Intrusive relationship doubts are taking a significant toll on your peace of mind. You frequently get trapped inspecting your partner's flaws, monitoring your feelings during intimacy, or searching the internet for definitive proof of 'true love'.",
      id: "Keraguan hubungan mulai menguras kedamaian batin Anda. Anda kerap terjebak memeriksa kekurangan fisik pasangan, mengawasi getaran emosi saat intim, atau mencari kepastian di internet tentang apa itu 'cinta sejati'.",
      de: "Aufdringliche Beziehungszweifel belasten Ihr Wohlbefinden spürbar. Sie verfangen sich regelmäßig im Scannen von Schwächen des Partners, prüfen krampfhaft Ihre Gefühle und suchen online nach Beweisen für 'wahre Liebe'.",
      fr: "Les doutes obsessionnels commencent à parasiter votre quotidien. Vous vous retrouvez fréquemment à ausculter les défauts de votre partenaire, à guetter vos sensations physiques ou à chercher des réponses en ligne.",
      es: "Las dudas intrusivas desgastan tu bienestar. Te sorprendes analizando los defectos de tu pareja, examinando qué sientes en cada beso o buscando respuestas obsesivas en internet."
    },
    neurobiology: {
      en: "Hyperactive cortico-striatal-thalamo-cortical (CSTC) loops treat relational uncertainty as an existential threat, compelling you to perform mental checks to temporarily lower anxiety.",
      id: "Sirkuit cortico-striatal-thalamo-cortical (CSTC) yang hiperaktif membaca ketidakpastian cinta sebagai bahaya darurat, memaksa Anda melakukan pengecekan mental demi meredakan panik sesaat.",
      de: "Ein überaktiver kortiko-striataler Regelkreis stuft Ungewissheit als Bedrohung ein und treibt Sie zu mentalen Zwangshandlungen, um kurzfristig Erleichterung zu erlangen.",
      fr: "La boucle cortico-striato-thalamique hyperactive interprète l'incertitude sentimentale comme un danger vital, déclenchant des rituels de vérification compulsive.",
      es: "El circuito cortico-estriatal hiperactivo interpreta la duda afectiva como una catástrofe, empujándote a compulsiones mentales para calmar la ansiedad."
    },
    actionProtocol: {
      en: [
        "Implement Exposure and Response Prevention (ERP): when the urge to Google relationship questions strikes, delay it by 30 minutes.",
        "Stop testing your feelings during physical intimacy; focus purely on tactile sensory textures instead of 'measuring love'.",
        "Record uncensored doubts into Nuju's encrypted audio journal: 'Maybe they are the one, maybe they aren't, and I can tolerate not knowing right now.'"
      ],
      id: [
        "Terapkan ERP (Exposure and Response Prevention): saat dorongan browsing tanda cinta muncul, tunda minimal 30 menit.",
        "Hentikan tes emosi saat bermesraan; alihkan fokus ke sensasi sentuhan fisik, bukan mengukur kadar cinta.",
        "Rekam keraguan Anda di Nuju voice journal: 'Mungkin dia orang yang tepat, mungkin tidak, dan saya mampu mentoleransi ketidaktahuan ini saat ini.'"
      ],
      de: [
        "Reaktionsverhinderung (ERP) anwenden: Wenn der Drang zum Beziehungs-Googeln kommt, mindestens 30 Minuten abwarten.",
        "Hören Sie auf, Ihre Gefühle bei Umarmungen zu messen; konzentrieren Sie sich rein auf Sinneswahrnehmungen.",
        "Sprechen Sie den Satz in Nuju ein: 'Vielleicht passt es, vielleicht nicht – ich muss es jetzt nicht sofort entscheiden.'"
      ],
      fr: [
        "Pratiquez l'Exposition avec Prévention de la Réponse (ERP) : différez de 30 minutes vos recherches sur internet.",
        "Cessez d'évaluer vos ressentis lors des câlins ; concentrez-vous sur le contact physique sans analyser vos émotions.",
        "Déposez vos doutes dans Nuju : 'Peut-être que c'est la bonne personne, peut-être pas, et j'accepte de vivre avec ce doute aujourd'hui.'"
      ],
      es: [
        "Aplica Exposición y Prevención de Respuesta (EPR): pospone las búsquedas en internet al menos 30 minutos cuando surja la urgencia.",
        "Deja de medir lo que sientes al abrazar o besar; concéntrate en el contacto sensorial sin emitir juicios.",
        "Graba en el diario de voz de Nuju: 'Quizás sea la persona adecuada, quizás no; puedo tolerar la incertidumbre en este momento.'"
      ]
    },
    badge: {
      en: "Moderate ROCD Pattern",
      id: "Pola ROCD Moderat",
      de: "Moderate ROCD-Belastung",
      fr: "Profil ROCD Modéré",
      es: "Patrón ROCD Moderado"
    }
  },
  {
    level: "severe_rocd",
    scoreRange: [32, 40],
    title: {
      en: "Severe Relationship Obsessions (Exhausting Compulsive Checking)",
      id: "Obsesi Relasi Berat (Pengecekan Kompulsif yang Menguras Energi)",
      de: "Schwere Beziehungszwänge (Erschöpfende Kontrollschleifen)",
      fr: "Obsessions de Couple Sévères (Vérifications Compulsives Épuisantes)",
      es: "Obsesiones de Pareja Severas (Comprobación Compulsiva Agotadora)"
    },
    summary: {
      en: "Relationship OCD has deeply hijacked your partnership. You spend several hours daily trapped in obsessive loops: scrutinizing your partner's face, comparing them to exes, seeking confessions, and feeling intense guilt over not feeling '100% in love' at every second.",
      id: "ROCD telah menyandera hubungan Anda. Berjam-jam setiap hari dihabiskan dalam lingkaran obsesif: memeriksa wajah pasangan, membandingkan dengan mantan, menuntut kepastian, dan merasa bersalah karena tidak merasa '100% mabuk cinta' setiap detik.",
      de: "ROCD hat Ihre Partnerschaft fest im Griff. Sie verbringen täglich Stunden in Zwangsschleifen: Gesichtszüge scannen, Vergleiche mit Ex-Partnern anstellen, Geständnisse ablegen und Schuldgefühle erleiden, weil Sie nicht ununterbrochen Verliebtheit spüren.",
      fr: "Le TOC de couple a envahi votre relation. Vous passez des heures chaque jour à décortiquer le visage de votre partenaire, à le/la comparer à vos ex et à culpabiliser de ne pas ressentir un amour parfait à chaque instant.",
      es: "El TOC de amores ha secuestrado tu relación. Pasas horas al día atrapado en bucles mentales: analizando los rasgos de tu pareja, comparándola con exparejas y sintiendo culpa por no estar eufórico cada segundo."
    },
    neurobiology: {
      en: "Severe intolerance of uncertainty driven by an overactive caudate nucleus and hyper-vigilant insular cortex. The brain treats emotional ambiguity as an acute emergency, misinterpreting normal lulls in passion as immediate catastrophe.",
      id: "Intoleransi ketidakpastian parah yang dipicu nukleus kaudatus dan korteks insular yang hiperaktif. Otak memperlakukan jeda ketenangan cinta sebagai keadaan darurat yang mengancam.",
      de: "Akute Intoleranz gegenüber Ungewissheit durch Überaktivität im Nucleus caudatus. Das Gehirn interpretiert normale Ruhephasen in der Liebe als katastrophale Bedrohung.",
      fr: "Intolérance sévère à l'incertitude alimentée par le noyau caudé et l'insula. Le cerveau assimile le calme amoureux à une menace d'erreur impardonnable.",
      es: "Intolerancia aguda a la incertidumbre mediada por el núcleo caudado y la ínsula. El cerebro confunde la calma cotidiana con un peligro catastrófico."
    },
    actionProtocol: {
      en: [
        "Cease all relationship confession rituals immediately: confessing doubts only feeds the OCD monster for 10 minutes before anxiety doubles.",
        "Work with an OCD-specialized clinician trained in Exposure and Response Prevention (ERP) and ACT (Acceptance and Commitment Therapy).",
        "Use Nuju voice journaling strictly to sit with ambiguity ('I choose to stay today, even with this uncertainty, without making a permanent decision')."
      ],
      id: [
        "Hentikan segera semua ritual pengakuan keraguan ke pasangan: mengakui keraguan hanya memberi ketenangan semu 10 menit sebelum cemas meledak dua kali lipat.",
        "Konsultasikan dengan psikolog/terapis spesialis OCD dengan pendekatan ERP dan ACT (Acceptance and Commitment Therapy).",
        "Gunakan voice journal Nuju untuk merangkul ketidakpastian: 'Saya memilih tetap bersama hari ini, bersama keraguan ini, tanpa harus mengambil keputusan terburu-buru.'"
      ],
      de: [
        "Stoppen Sie sofort alle Beicht-Rituale: Dem Partner Zweifel mitzuteilen, füttert den Zwang nur für 10 Minuten, bevor er stärker zurückkehrt.",
        "Suchen Sie psychotherapeutische Unterstützung mit Fokus auf ERP und ACT (Akzeptanz- und Commitment-Therapie).",
        "Nutzen Sie Nuju-Sprachaufnahmen als Puffer: 'Ich bleibe heute, trotz der Zweifel, ohne eine endgültige Entscheidung erzwingen zu müssen.'"
      ],
      fr: [
        "Cessez immédiatement d'avouer vos doutes à votre partenaire : cela ne fait que nourrir le TOC après un répit éphémère de 10 minutes.",
        "Consultez un thérapeute spécialisé dans les TOC formé à l'ERP et à la thérapie ACT (Acceptation et Engagement).",
        "Utilisez le journal vocal Nuju pour apprivoiser l'incertitude : 'Je choisis d'être là aujourd'hui avec ce doute, sans prendre de décision irréversible.'"
      ],
      es: [
        "Detén de inmediato los rituales de confesión a tu pareja: confesar solo alivia la ansiedad 10 minutos antes de duplicarla.",
        "Busca apoyo profesional especializado en TOC mediante terapia EPR y ACT (Terapia de Aceptación y Compromiso).",
        "Usa el diario de voz de Nuju como espacio de tolerancia: 'Elijo estar presente hoy con esta duda, sin necesidad de tomar decisiones apresuradas.'"
      ]
    },
    badge: {
      en: "Severe ROCD Cycle",
      id: "Siklus ROCD Berat",
      de: "Schwerer ROCD-Zirkel",
      fr: "Spirale ROCD Sévère",
      es: "Espiral ROCD Severa"
    }
  },
  {
    level: "debilitating_rocd",
    scoreRange: [41, 48],
    title: {
      en: "Debilitating ROCD Spiral (Paralyzing Relationship Crisis)",
      id: "Spiral ROCD Melumpuhkan (Krisis Relasi yang Menghancurkan)",
      de: "Lähmende ROCD-Krise (Akute Beziehungs-Panikspirale)",
      fr: "Spirale ROCD Invalidante (Crise de Couple Paralysante)",
      es: "Espiral ROCD Invalidante (Crisis de Pareja Paralizante)"
    },
    summary: {
      en: "Your relationship has become an agonizing battlefield of compulsive checking, panic attacks, and emotional paralysis. You are on the verge of impulsively destroying a loving relationship just to stop the unbearable torture of doubt in your own head.",
      id: "Hubungan Anda telah menjadi medan tempur batin yang menyiksa: panik konstan, memeriksa kekurangan pasangan tanpa henti, dan kelumpuhan emosi. Anda berada di ambang menghancurkan hubungan yang sebenarnya sehat hanya demi menghentikan siksaan keraguan di kepala.",
      de: "Ihre Partnerschaft ist zu einem zermürbenden Schauplatz von Panikattacken und emotionaler Lähmung geworden. Sie stehen kurz davor, eine liebevolle Bindung impulsiv zu zerstören, nur um die unerträgliche Qual des Zweifelns im Kopf zu beenden.",
      fr: "Votre relation est devenue un calvaire d'angoisses quotidiennes et de paralysie affective. Vous êtes sur le point de rompre impulsivement avec une personne aimante uniquement pour faire cesser la torture mentale du doute.",
      es: "Tu relación se ha convertido en una pesadilla de comprobaciones constantes, ataques de pánico y parálisis emocional. Estás a punto de sabotear un vínculo sano solo para silenciar el tormento de la duda en tu mente."
    },
    neurobiology: {
      en: "Profound dopamine and serotonin dysregulation with chronic amygdala hijacking. The brain has welded romantic uncertainty to acute panic, creating cognitive tunnel vision that mislabels normal partnership safety as deceit or entrapment.",
      id: "Disregulasi dopamin dan serotonin parah disertai pembajakan amigdala kronis. Otak mengidentifikasi ambiguitas cinta sebagai bahaya darurat, menganggap ketenangan hubungan sebagai penipuan atau jebakan.",
      de: "Schwere vegetative Überlastung mit Amygdala-Hijacking; das Gehirn stuft das Fehlen von Verliebtheits-Adrenalin als akute Lebensgefahr ein.",
      fr: "Dérégulation sévère des neurotransmetteurs et prise de contrôle par l'amygdale. Le cerveau étiquette la sérénité du couple comme un piège intolérable.",
      es: "Desregulación severa del sistema de serotonina y secuestro amigdalino. El cerebro confunde la paz cotidiana de la pareja con una trampa peligrosa."
    },
    actionProtocol: {
      en: [
        "Commit to a 'Zero-Breakup Pact' for 60 days: agree with yourself not to make any permanent relationship decisions while in an acute OCD crisis.",
        "Seek immediate professional OCD evaluation with ERP specialists (consider medication consult if anxiety prevents basic functioning).",
        "Pour unedited panic into Nuju voice journal instead of dumping it onto your partner, preserving the bond while your nervous system de-escalates."
      ],
      id: [
        "Buat 'Perjanjian Nol Putus' selama 60 hari: jangan mengambil keputusan putus saat otak Anda sedang disandera krisis panik OCD.",
        "Segera cari bantuan psikiater/psikolog spesialis OCD untuk terapi ERP intensif.",
        "Tumpahkan kepanikan Anda ke Nuju voice journal alih-alih melampiaskannya ke pasangan, menjaga hubungan tetap utuh sementara saraf Anda ditenangkan."
      ],
      de: [
        "60-Tage-Trennungs-Moratorium vereinbaren: Keine folgenschweren Entscheidungen treffen, solange Sie sich im akuten Zwangsschub befinden.",
        "Dringende fachärztliche Konsultation bei einem Zwangsspezialisten (ggf. medikamentöse Unterstützung zur Dämpfung der Panikspitzen).",
        "Nutzen Sie das Nuju-Sprachtagebuch, um Gedanken abzuladen, anstatt den Partner damit zu überfluten."
      ],
      fr: [
        "Pacte de non-rupture de 60 jours : interdisez-vous toute décision définitive tant que votre système nerveux est en crise aiguë.",
        "Consultez d'urgence un psychiatre ou psychologue clinicien expert en TOC (thérapie ERP indispensable).",
        "Déversez votre panique dans le journal audio Nuju au lieu de submerger votre partenaire, pour préserver le lien."
      ],
      es: [
        "Pacto de no-ruptura de 60 días: prohíbete tomar decisiones drásticas mientras estés en plena crisis de angustia obsesiva.",
        "Busca ayuda especializada inmediata en TOC y terapia EPR (valora apoyo farmacológico si la ansiedad es invalidante).",
        "Vuelca el pánico en el diario de voz de Nuju en lugar de proyectarlo sobre tu pareja, protegiendo el vínculo."
      ]
    },
    badge: {
      en: "Acute ROCD Crisis",
      id: "Krisis ROCD Akut",
      de: "Akute ROCD-Krise",
      fr: "Crise ROCD Aiguë",
      es: "Crisis ROCD Aguda"
    }
  }
];

export const ROCD_SUBSCALE_INFO = {
  feelings_and_rightness: {
    name: {
      en: "Feelings & Relationship 'Rightness' Doubts",
      id: "Keraguan Perasaan & Ketepatan Hubungan",
      de: "Gefühlszweifel & Suche nach dem 'Richtigen'",
      fr: "Doutes sur les Sentiments & l'Idéal Amoureux",
      es: "Dudas sobre los Sentimientos y la 'Pareja Ideal'"
    },
    description: {
      en: "Obsessive intrusive thoughts asking 'Do I really love them?', panic over lack of fireworks, and fear of living a lie.",
      id: "Pikiran obsesif mempertanyakan 'Apakah saya benar-benar cinta?', panik saat tak ada desiran, dan takut membohongi diri.",
      de: "Quälendes Grübeln über die eigene Liebe, Angst vor fehlendem Herzklopfen und Furcht vor einem falschen Leben.",
      fr: "Pensées intrusives questionnant l'amour véritable, panique face à l'absence d'euphorie et peur de se mentir.",
      es: "Dudas intrusivas sobre si amas de verdad, pánico ante la falta de euforia y miedo a vivir una mentira."
    }
  },
  partner_flaw_scrutiny: {
    name: {
      en: "Partner Flaw Hyper-Scrutiny",
      id: "Pemeriksaan Kekurangan Pasangan yang Berlebihan",
      de: "Hyper-Fokus auf Makel des Partners",
      fr: "Hyper-Focalisation sur les Défauts du Partenaire",
      es: "Hiper-Escrutinio de Defectos de la Pareja"
    },
    description: {
      en: "Compulsive magnification of partner's physical appearance, intelligence, humor, sociability, or perceived shortcomings.",
      id: "Membesarkan kekurangan fisik, kecerdasan, selera humor, atau status sosial pasangan secara kompulsif.",
      de: "Zwanghaftes Sezieren des Aussehens, der Intelligenz, des Humors oder kleiner Angewohnheiten des Partners.",
      fr: "Focalisation démesurée sur l'apparence physique, l'intelligence, la répartie ou les manies du partenaire.",
      es: "Aumento desmedido de defectos físicos, inteligencia, humor o hábitos cotidianos de la pareja."
    }
  },
  compulsive_checking: {
    name: {
      en: "Compulsive Checking & Reassurance Seeking",
      id: "Pengecekan Kompulsif & Mencari Kepastian",
      de: "Zwanghaftes Vergleichen & Rückversicherung",
      fr: "Vérifications Compulsives & Quête de Rassurance",
      es: "Comprobación Compulsiva y Búsqueda de Certezas"
    },
    description: {
      en: "Endless Googling, comparison with exes, seeking confessions, and asking friends/tarot if the relationship is 'right'.",
      id: "Browsing Google tanpa henti, membandingkan dengan mantan, menuntut pengakuan, dan menanyakan ramalan.",
      de: "Stundenlanges Googeln, Vergleiche mit Verflossenen, Beichten und ständiges Einholen von Meinungen.",
      fr: "Recherches Google sans fin, comparaisons avec les ex, aveux compulsifs et consultations de voyance.",
      es: "Búsquedas continuas en internet, comparación con exparejas, confesiones urgentes y consulta de opiniones ajenas."
    }
  }
};

export function getRocdResult(totalScore: number): RocdResultLevel {
  const matched = ROCD_RESULTS.find(
    (lvl) => totalScore >= lvl.scoreRange[0] && totalScore <= lvl.scoreRange[1]
  );
  return matched || ROCD_RESULTS[ROCD_RESULTS.length - 1];
}

export function calculateRocdSubscales(answers: Record<number, number>): {
  feelings_and_rightness: number;
  partner_flaw_scrutiny: number;
  compulsive_checking: number;
} {
  let feelings_and_rightness = 0;
  let partner_flaw_scrutiny = 0;
  let compulsive_checking = 0;

  ROCD_QUESTIONS.forEach((q) => {
    const val = answers[q.id] || 0;
    if (q.subscale === "feelings_and_rightness") feelings_and_rightness += val;
    if (q.subscale === "partner_flaw_scrutiny") partner_flaw_scrutiny += val;
    if (q.subscale === "compulsive_checking") compulsive_checking += val;
  });

  return { feelings_and_rightness, partner_flaw_scrutiny, compulsive_checking };
}
