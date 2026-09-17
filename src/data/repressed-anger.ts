export interface RepressedAngerQuestion {
  id: number;
  subscale: 'somatic_rage' | 'fawn_resentment' | 'anger_inversion';
  text: {
    en: string;
    id: string;
    de: string;
    fr: string;
    es: string;
  };
}

export interface RepressedAngerResultLevel {
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

export const REPRESSED_ANGER_QUESTIONS: RepressedAngerQuestion[] = [
  {
    id: 1,
    subscale: 'somatic_rage',
    text: {
      en: "I habitually clench my jaw, grind my teeth (bruxism), or tighten my shoulders and neck without realizing it.",
      id: "Saya sering mengatupkan rahang kencang, menggertakkan gigi, atau menegangkan bahu dan leher tanpa saya sadari.",
      de: "Ich beiße unwillkürlich die Zähne zusammen (Bruxismus) oder spanne Schultern und Nacken an, ohne es zu merken.",
      fr: "Je serre souvent la mâchoire, grince des dents (bruxisme) ou crispe mes épaules et mon cou inconsciemment.",
      es: "Aprieto habitualmente la mandíbula, rechino los dientes o tenso los hombros y el cuello sin darme cuenta."
    }
  },
  {
    id: 2,
    subscale: 'fawn_resentment',
    text: {
      en: "I agree to requests or favor others with a polite smile, but later feel a deep, burning resentment and anger toward them.",
      id: "Saya menyetujui permintaan orang lain dengan senyuman ramah, tetapi kemudian merasa sangat dongkol, jengkel, dan marah kepada mereka.",
      de: "Ich stimme Bitten mit einem freundlichen Lächeln zu, verspüre danach aber eine tiefe, brodelnde Bitterkeit und Wut.",
      fr: "J'accepte des demandes avec un sourire poli, mais je ressens ensuite une rancœur profonde et bouillonnante envers eux.",
      es: "Acepto favores o peticiones con una sonrisa educada, pero luego siento un profundo y silencioso resentimiento hacia ellos."
    }
  },
  {
    id: 3,
    subscale: 'anger_inversion',
    text: {
      en: "Whenever someone violates my boundaries or mistreats me, my immediate reaction is guilt or self-blame instead of outward anger.",
      id: "Kapan pun seseorang melanggar batasan saya atau memperlakukan saya buruk, reaksi awal saya adalah merasa bersalah atau menyalahkan diri sendiri alih-alih marah.",
      de: "Wenn jemand meine Grenzen verletzt, reagiere ich sofort mit Schuldgefühlen und Selbstvorwürfen statt mit gesunder Wut.",
      fr: "Quand quelqu'un franchit mes limites ou me maltraite, ma réaction immédiate est la culpabilité plutôt que la saine colère.",
      es: "Cuando alguien vulnera mis límites, mi reacción inmediata es culparme a mí mismo en lugar de enfadarme con esa persona."
    }
  },
  {
    id: 4,
    subscale: 'somatic_rage',
    text: {
      en: "I feel a heat or tightness in my chest and throat, as if a scream or furious protest is physically trapped inside me.",
      id: "Saya merasakan panas atau sesak di dada dan tenggorokan, seolah-olah jeritan atau protes amarah tertahan secara fisik di dalam diri.",
      de: "Ich spüre Hitze oder Enge in Brust und Kehle, als wäre ein stummer Schrei oder Wutausbruch in mir eingesperrt.",
      fr: "Je ressens une chaleur ou un serrement dans la gorge et la poitrine, comme si un cri de fureur était emprisonné en moi.",
      es: "Siento calor o un nudo en el pecho y la garganta, como si un grito de rabia estuviera físicamente atrapado dentro de mí."
    }
  },
  {
    id: 5,
    subscale: 'fawn_resentment',
    text: {
      en: "I have vivid, violent, or intensely sarcastic arguments with people in my head that I would never dare express out loud.",
      id: "Saya sering berdebat sengit, penuh sindiran tajam, atau membalas kata-kata orang lain di dalam kepala yang tidak pernah berani saya ucapkan secara langsung.",
      de: "Ich führe im Kopf hitzige, zynische oder scharfe Wortgefechte mit Menschen, die ich mich niemals laut auszusprechen traue.",
      fr: "J'ai des disputes imaginaires très vives ou sarcastiques dans ma tête avec des gens, que je n'oserais jamais exprimer à voix haute.",
      es: "Tengo intensas discusiones imaginarias llenas de sarcasmo o reproches en mi mente que jamás me atrevería a decir en persona."
    }
  },
  {
    id: 6,
    subscale: 'anger_inversion',
    text: {
      en: "When I feel angry, I suddenly become exhausted, numb, depressed, or crave sugary/comfort foods to silence the feeling.",
      id: "Saat merasa marah, saya mendadak merasa sangat lelah, mati rasa, depresi, atau sangat ingin makan makanan manis untuk mematikan emosi tersebut.",
      de: "Wenn Wut aufkommt, werde ich plötzlich bleiern müde, apathisch, depressiv oder betäube das Gefühl mit Heißhunger.",
      fr: "Quand la colère monte, je me sens soudainement épuisé, engourdi, déprimé, ou je cherche du réconfort dans la nourriture pour l'étouffer.",
      es: "Cuando siento enojo, de repente me invade un cansancio aplastante, depresión o deseo de comer comida reconfortante para adormecerlo."
    }
  },
  {
    id: 7,
    subscale: 'somatic_rage',
    text: {
      en: "I suffer from chronic digestive issues, tension headaches, or unexplained body aches that doctors attribute to stress.",
      id: "Saya menderita gangguan pencernaan kronis, sakit kepala tegang, atau nyeri tubuh tak terjelaskan yang oleh dokter disebut akibat stres.",
      de: "Ich leide unter Magen-Darm-Problemen, Spannungskopfschmerzen oder diffusen Körperschmerzen, die als Stressfolge diagnostiziert werden.",
      fr: "Je souffre de troubles digestifs chroniques, de céphalées de tension ou de douleurs corporelles inexpliquées liées au stress.",
      es: "Sufro de problemas gastrointestinales crónicos, dolores de cabeza tensionales o molestias físicas que los médicos atribuyen al estrés."
    }
  },
  {
    id: 8,
    subscale: 'fawn_resentment',
    text: {
      en: "I pride myself on being the 'calm, patient, easygoing' person, but secretly feel exploited and unappreciated by everyone.",
      id: "Saya bangga dikenal sebagai orang yang 'sabar, santai, dan tidak pernah marah', tetapi diam-diam merasa dimanfaatkan dan tidak dihargai oleh siapa pun.",
      de: "Ich gelte als der 'geduldige, unkomplizierte' Mensch, fühle mich insgeheim aber von allen ausgenutzt und nicht gewürdigt.",
      fr: "Je tire fierté d'être la personne 'gentille et toujours calme', mais je me sens secrètement exploitée et méconnue de tous.",
      es: "Me enorgullece ser la persona 'tranquila y complaciente', pero en secreto me siento explotado y poco valorado por los demás."
    }
  },
  {
    id: 9,
    subscale: 'anger_inversion',
    text: {
      en: "I was punished, shamed, or emotionally abandoned in childhood whenever I cried loudly, shouted, or expressed anger.",
      id: "Semasa kecil saya dihukum, dipermalukan, atau diabaikan secara emosional setiap kali saya menangis kencang, berteriak, atau menunjukkan kemarahan.",
      de: "In meiner Kindheit wurde ich bestraft, beschämt oder ignoriert, wenn ich laut weinte, wütend wurde oder widersprach.",
      fr: "Enfant, j'étais puni, couvert de honte ou rejeté chaque fois que j'exprimais ma colère ou protestais vigoureusement.",
      es: "En mi infancia fui castigado, avergonzado o rechazado cada vez que lloraba fuerte, gritaba o mostraba desacuerdo y enfado."
    }
  },
  {
    id: 10,
    subscale: 'somatic_rage',
    text: {
      en: "Small, trivial inconveniences (traffic, a slow computer, a dropped item) trigger sudden, disproportionate internal fury.",
      id: "Hal-hal sepele yang menjengkelkan (macet, laptop lemot, barang jatuh) memicu amarah membara yang mendadak dan tidak proporsional di dalam diri.",
      de: "Kleine Nichtigkeiten (Stau, ein langsamer Computer, ein heruntergefallener Stift) lösen unverhältnismäßig heftige innere Wutwellen aus.",
      fr: "Des contrariétés mineures (embouteillage, lenteur d'un écran, objet qui tombe) déclenchent en moi une rage intérieure disproportionnée.",
      es: "Pequeñas molestias cotidianas (tráfico, lentitud de internet, un objeto que cae) desatan en mí una furia interna desmedida."
    }
  },
  {
    id: 11,
    subscale: 'fawn_resentment',
    text: {
      en: "I find it nearly impossible to say 'No' directly; instead I make up elaborate excuses, procrastinate, or ghost people.",
      id: "Saya merasa hampir mustahil untuk menolak secara langsung ('Tidak'); saya lebih memilih mencari alasan rumit, menunda-nunda, atau menghilang (ghosting).",
      de: "Es fällt mir unendlich schwer, direkt 'Nein' zu sagen; stattdessen erfinde ich Ausreden, schiebe Dinge auf oder ziehe mich zurück.",
      fr: "Il m'est presque impossible de dire 'Non' franchement ; j'invente des excuses complexes, je repousse ou je disparais silencieusement.",
      es: "Me resulta casi imposible decir 'No' directamente; suelo inventar excusas elaboradas, postergar o desaparecer para evitar confrontar."
    }
  },
  {
    id: 12,
    subscale: 'anger_inversion',
    text: {
      en: "I am terrified that if I ever truly let my genuine anger out, I would destroy my relationships or hurt people irreparably.",
      id: "Saya sangat takut bahwa jika saya benar-benar meluapkan amarah asli saya, saya akan menghancurkan hubungan saya atau menyakiti orang lain tanpa bisa diperbaiki.",
      de: "Ich habe panische Angst, dass meine echte Wut, falls sie einmal ausbricht, Beziehungen zerstören oder irreparablen Schaden anrichten würde.",
      fr: "J'ai la terreur que si je laissais exploser ma véritable colère, je détruirais mes relations ou blesserais les autres de façon irréparable.",
      es: "Tengo un pánico aterrador de que si libero mi verdadera rabia, destruiré mis relaciones y causaré un daño irreparable."
    }
  }
];

export const REPRESSED_ANGER_RESULTS: RepressedAngerResultLevel[] = [
  {
    level: "integrated_assertive",
    scoreRange: [0, 10],
    title: {
      en: "Integrated & Healthy Boundary Access",
      id: "Akses Batasan Sehat & Terintegrasi",
      de: "Integrierte Wut & Gesunde Grenzziehung",
      fr: "Colère Intégrée & Limites Saines",
      es: "Ira Integrada y Límites Saludables"
    },
    summary: {
      en: "You have a balanced relationship with anger. You recognize it as an informative boundary signal rather than a dangerous or shameful flaw.",
      id: "Anda memiliki relasi yang sehat dengan emosi amarah. Anda melihat amarah sebagai sinyal pelindung batasan diri, bukan aib atau kelemahan yang memalukan.",
      de: "Sie pflegen einen gesunden Bezug zu Ihrer Wut. Sie erkennen sie als wertvolles Schutzsignal und können Grenzen ohne Schuldgefühle setzen.",
      fr: "Vous entretenez une relation saine avec la colère. Vous la percevez comme un signal de protection légitime et savez poser vos limites sans culpabilité.",
      es: "Tienes una relación sana con el enojo. Lo reconoces como una señal útil para proteger tus límites sin sentir culpa ni necesidad de complacer."
    },
    neurobiology: {
      en: "Your sympathetic fight impulse is freely integrated with prefrontal cognitive regulation, preventing somatic retroflection and chronic fascial clamping.",
      id: "Respons fight simpatik Anda terintegrasi baik dengan regulasi korteks prefrontal, mencegah konversi amarah menjadi ketegangan otot fasia kronis.",
      de: "Ihr sympathischer Kampfimpuls ist im Einklang mit präfrontaler Steuerung; Wut wird nicht in den Körper somatisiert.",
      fr: "Vos circuits de défense sympathique sont harmonisés avec votre cortex préfrontal, évitant la somatisation musculaire.",
      es: "Tus circuitos de defensa simpáticos están en equilibrio con tu corteza frontal, evitando contracturas y somatización."
    },
    actionProtocol: {
      en: [
        "Continue expressing clear, compassionate 'No's when requests exceed your bandwidth.",
        "Practice somatic check-ins before high-stakes interpersonal conversations.",
        "Log boundary milestones in Nuju to reinforce assertiveness pathways."
      ],
      id: [
        "Teruslah mengatakan 'Tidak' secara tegas dan tenang ketika kapasitas energi Anda tidak mencukupi.",
        "Lakukan relaksasi rahang dan leher sebelum percakapan interpersonal yang menantang.",
        "Catat keberhasilan menjaga batasan diri di jurnal Nuju untuk memperkuat sirkuit ketegasan."
      ],
      de: [
        "Sagen Sie weiterhin gelassen 'Nein', wenn Anfragen Ihre Kapazitäten übersteigen.",
        "Nutzen Sie kurze Körperscans vor anspruchsvollen Gesprächen.",
        "Halten Sie Grenzsetzungen in Nuju fest, um selbstsichere Verhaltensmuster zu festigen."
      ],
      fr: [
        "Continuez d'exprimer des refus clairs et bienveillants quand votre énergie est limitée.",
        "Pratiquez un scan corporel avant des discussions difficiles.",
        "Consignez vos réussites d'affirmation dans Nuju pour ancrer ces réflexes protecteurs."
      ],
      es: [
        "Sigue diciendo 'No' con serenidad cuando las demandas superen tus energías.",
        "Realiza chequeos corporales antes de conversaciones difíciles.",
        "Registra tus límites saludables en Nuju para fortalecer tu asertividad."
      ]
    },
    badge: {
      en: "Assertive Anchor",
      id: "Penjaga Batasan Sehat",
      de: "Souveräner Grenzensetzer",
      fr: "Pilier d'Affirmation",
      es: "Ancla Asertiva"
    }
  },
  {
    level: "mild_holding",
    scoreRange: [11, 20],
    title: {
      en: "Mild Somatic Clamping & People-Pleasing Strain",
      id: "Ketegangan Somatik Ringan & Tekanan Menyenangkan Orang",
      de: "Leichte somatische Anspannung & Gefälligkeitsmuster",
      fr: "Tension Somatique Légère & Tendance à Complaire",
      es: "Tensión Somática Leve y Sobreesfuerzo Complaciente"
    },
    summary: {
      en: "You occasionally stifle your irritation to maintain harmony, leading to subtle jaw clenching, trapped shoulder tension, and delayed resentment.",
      id: "Anda sesekali menelan kejengkelan demi menjaga kedamaian semu, memicu rahang yang mengatup kencang, bahu kaku, dan rasa dongkol yang tertunda.",
      de: "Sie schlucken Irritationen gelegentlich herunter, um Harmonie zu wahren, was zu Zähneknirschen und aufgeschobener Bitterkeit führt.",
      fr: "Vous étouffez parfois vos agacements pour préserver l'harmonie, provoquant des crispations de la mâchoire et une rancœur silencieuse.",
      es: "A veces te tragas el enfado por no generar conflictos, provocando tensión en la mandíbula, hombros y resentimiento posterior."
    },
    neurobiology: {
      en: "Mild anterior cingulate suppression of the motor fight response. The nervous system directs unexpressed boundary defense into trapezius and masseter tone.",
      id: "Penekanan ringan impuls motorik oleh korteks cingulate anterior. Sistem saraf mengalihkan energi amarah yang tertahan ke otot leher dan rahang.",
      de: "Leichte motorische Hemmung des Kampfimpulses; Wutenergie staut sich im Kiefer- und Nackenbereich.",
      fr: "Inhibition motrice modérée du réflexe de lutte ; l'énergie de défense se stocke dans les mâchoires et les trapèzes.",
      es: "Inhibición motora leve del reflejo de lucha; la energía reprimida se acumula en la mandíbula y el cuello."
    },
    actionProtocol: {
      en: [
        "Implement a 10-second pause before saying 'Yes' to assess your body's authentic visceral response.",
        "Engage in jaw-unhinging exercises and lion's breath to release trapped masseter tension.",
        "Record 1 minute of raw, uncensored vocal journaling in Nuju when frustrated."
      ],
      id: [
        "Terapkan jeda 10 detik sebelum mengiyakan permintaan orang lain untuk memeriksa sinyal perut Anda.",
        "Lakukan peregangan rahang dan latihan napas singa (lion's breath) untuk melemaskan otot kunyah.",
        "Rekam 1 menit jurnal suara bebas sensor di Nuju saat merasakan bibit kekesalan."
      ],
      de: [
        "Warten Sie 10 Sekunden vor einer Zusage, um Ihr echtes Bauchgefühl zu spüren.",
        "Praktizieren Sie die Löwenatmung, um Kieferspannungen gezielt zu lockern.",
        "Nutzen Sie Nuju für 60 Sekunden ungefiltertes Sprachjournaling bei Verärgerung."
      ],
      fr: [
        "Prenez 10 secondes de recul avant de dire 'Oui' afin d'écouter vos sensations viscérales.",
        "Pratiquez le souffle du lion pour détendre la tension des mâchoires.",
        "Enregistrez 1 minute d'expression vocale sans filtre dans Nuju dès qu'une frustration émerge."
      ],
      es: [
        "Haz una pausa de 10 segundos antes de aceptar peticiones ajenas para sentir tu cuerpo.",
        "Practica la respiración del león para liberar la mandíbula apretada.",
        "Graba 1 minuto de diario de voz sin censura en Nuju cuando te sientas frustrado."
      ]
    },
    badge: {
      en: "Quiet Resenter",
      id: "Penahan Kejengkelan",
      de: "Stiller Dulder",
      fr: "Pacificateur Tendu",
      es: "Pacificador Tenso"
    }
  },
  {
    level: "moderate_retroflection",
    scoreRange: [21, 28],
    title: {
      en: "Moderate Anger Retroflection & Good Girl/Nice Guy Strain",
      id: "Retrofleksi Amarah Sedang & Sindrom Good Girl / Nice Guy",
      de: "Moderate Wutumkehr & Good-Girl-/Nice-Guy-Druck",
      fr: "Rétroflexion Modérée & Syndrome du Bon Élève",
      es: "Retroflectores de Ira y Síndrome de Complacencia Crónica"
    },
    summary: {
      en: "You have conditioned yourself to view your anger as dangerous or bad. Rather than directing it outward to protect yourself, you invert it into self-criticism, exhaustion, and chronic bodily tension.",
      id: "Anda terbiasa memandang kemarahan sebagai emosi yang jahat dan terlarang. Alih-alih mengarahkannya keluar sebagai perlindungan diri, Anda membalikkannya ke dalam menjadi kritik diri, kelelahan, dan ketegangan fisik menahun.",
      de: "Sie haben gelernt, Wut als Bedrohung zu sehen. Statt sich abzugrenzen, richten Sie die Wut nach innen: in Form von Selbstkritik, Erschöpfung und chronischen Schmerzen.",
      fr: "Vous avez appris à percevoir la colère comme dangereuse. Au lieu de vous défendre, vous la retournez contre vous-même : autocritique, fatigue et douleurs chroniques.",
      es: "Has aprendido a temer a tu enojo. En lugar de defenderte, lo diriges contra ti mismo: culpa, fatiga inexplicable y dolores corporales constantes."
    },
    neurobiology: {
      en: "Chronic fight impulse retroflection (Freud & Perls). High cortisol and suppressed vagal brake lead to gastrointestinal inflammation and bruxism.",
      id: "Retrofleksi impuls fight kronis. Lonjakan kortisol bersamaan dengan rem vagal yang tertahan memicu peradangan lambung dan kebiasaan menggertakkan gigi.",
      de: "Chronische Wutumkehr; erhöhter Cortisolspiegel und vegetative Dysregulation führen zu Magenbeschwerden und faszialer Erstarrung.",
      fr: "Rétroflexion chronique de la colère ; l'axe corticotrope hyperactif engendre des troubles digestifs et des tensions myofasciales.",
      es: "Retroflectores crónicos de la respuesta de lucha; cortisol elevado y rigidez miofascial con bruxismo nocturno."
    },
    actionProtocol: {
      en: [
        "Differentiate healthy protective anger from destructive rage: anger is the immune system of the psyche.",
        "Perform safe somatic motor discharging: punch pillows, towel-wringing, or stomp barefoot on a rug.",
        "Set a boundary quota: communicate one low-stakes boundary each week without apologizing.",
        "Voice-journal unexpressed boundary protests inside Nuju."
      ],
      id: [
        "Bedakan amarah pelindung yang sehat dari amukan destruktif: amarah adalah sistem imun psikis Anda.",
        "Lakukan pelepasan motorik somatik yang aman: memukul bantal, memelintir handuk kering, atau menghentak kaki di karpet.",
        "Terapkan kuota batasan: komunikasikan satu penolakan kecil setiap minggu tanpa meminta maaf berlebihan.",
        "Salurkan protes batasan yang selama ini tertelan ke dalam rekaman suara Nuju."
      ],
      de: [
        "Unterscheiden Sie schützende Wut von Zerstörung: Wut ist das seelische Immunsystem.",
        "Sichere körperliche Entladung: Kissen schlagen, Handtücher auswringen oder auf den Boden stampfen.",
        "Grenzen-Quote: Setzen Sie jede Woche eine kleine Grenze, ohne sich dafür zu entschuldigen.",
        "Sprechen Sie unterdrückten Protest ungefiltert in Ihr Nuju-Journal."
      ],
      fr: [
        "Distinguez la saine colère protectrice de la violence : la colère est le système immunitaire de l'esprit.",
        "Décharge motrice sécurisée : frapper un coussin, tordre une serviette ou taper des pieds au sol.",
        "Fixez une limite simple chaque semaine sans formuler d'excuses inutiles.",
        "Libérez vos protestations étouffées dans le journal vocal Nuju."
      ],
      es: [
        "Distingue el enojo protector de la agresión: la ira sana es el sistema inmune de la mente.",
        "Descarga motora segura: golpear almohadas, retorcer una toalla o pisar fuerte descalzo.",
        "Ponte una cuota de límites: di un 'no' pequeño cada semana sin justificarte ni pedir disculpas.",
        "Descarga tus protestas reprimidas mediante el diario por voz de Nuju."
      ]
    },
    badge: {
      en: "Swallowed Volcano",
      id: "Gunung Berapi Tertelan",
      de: "Unterdrückter Vulkan",
      fr: "Volcan Enfoui",
      es: "Volcán Tragado"
    }
  },
  {
    level: "severe_somatic_rage",
    scoreRange: [29, 36],
    title: {
      en: "Severe Somatic Rage & Chronic Emotional Suppression",
      id: "Amarah Somatik Parah & Represi Emosi Kronis",
      de: "Schwere somatisierte Wut & Chronische Emotionsblockade",
      fr: "Rage Somatique Sévère & Répression Émotionnelle Chronique",
      es: "Rabia Somática Severa y Supresión Emocional Profunda"
    },
    summary: {
      en: "Decades of suppressing natural boundary responses have locked intense, hot biological fury in your tissues. You experience frequent physical exhaustion, somatic ailments, and intense dread of losing control.",
      id: "Puluhan tahun menekan reaksi batasan alami telah mengunci amarah biologis yang membara di dalam jaringan tubuh Anda. Anda kerap mengalami kelelahan ekstrem, keluhan somatis, dan ketakutan mendalam akan lepas kendali.",
      de: "Jahrzehntelange Unterdrückung natürlicher Grenzen hat lodernde Wut in Ihrem Gewebe eingefroren. Sie leiden unter chronischer Erschöpfung und ständiger Angst vor Kontrollverlust.",
      fr: "Des années de refoulement ont verrouillé une fureur intense dans vos tissus corporels. Vous vivez dans un état d'épuisement permanent avec la peur viscérale d'exploser.",
      es: "Años reprimiendo tus límites han encerrado una furia profunda en tus tejidos corporales. Vives exhausto, con dolor crónico y pánico a perder los papeles."
    },
    neurobiology: {
      en: "Sympathetic hyper-arousal trapped in fascial armoring (Wilhelm Reich & Peter Levine). Extreme amygdala-periaqueductal gray suppression driving autoimmune vulnerability and central sensitization.",
      id: "Hiperarousal simpatik terperangkap dalam muscular armoring. Penekanan ekstrem sirkuit amygdala memicu kerentanan autoimun dan sensitisasi sentral nyeri.",
      de: "Im Fasziensystem gefangener Sympathikus-Hochtonus; extreme Hemmung des periaquäduktalen Graus begünstigt Entzündungen und chronische Schmerzsyndrome.",
      fr: "Hyper-activation sympathique figée dans les fascias ; la répression intense du système limbique favorise la vulnérabilité auto-immune et la douleur centrale.",
      es: "Hiperactivación simpática atrapada en las fascias; la supresión límbica profunda eleva la inflamación sistémica y la fatiga suprarrenal."
    },
    actionProtocol: {
      en: [
        "Engage with a trauma-informed somatic therapist (Somatic Experiencing or Hakomi).",
        "Graduated motor discharge: use vocal toning (deep growling/humming) in your car to release vocal cord clamping.",
        "Read 'When the Body Says No' by Dr. Gabor Maté to de-stigmatize boundary protection.",
        "Daily voice unloading: use Nuju in private to articulate the feelings you are terrified to admit to others."
      ],
      id: [
        "Pertimbangkan berkonsultasi dengan terapis somatik berorientasi trauma (Somatic Experiencing).",
        "Latihan pelepasan suara bertahap: gunakan vocal toning (mengeram dalam/humming) di ruangan privat untuk melepaskan cekatan pita suara.",
        "Baca buku 'When the Body Says No' karya Dr. Gabor Maté untuk memahami bahwa menolak bukanlah kejahatan.",
        "Kuras emosi harian: gunakan rekaman suara Nuju di tempat aman untuk menyuarakan hal-hal yang selama ini paling Anda takuti."
      ],
      de: [
        "Ziehen Sie einen traumabasierten somatischen Therapeuten (Somatic Experiencing) zu Rate.",
        "Stimmliche Entladung: Tiefes Brummen oder Knurren im Auto, um die Stimmbänder zu lockern.",
        "Lesen Sie 'Wenn der Körper nein sagt' von Dr. Gabor Maté, um Grenzziehung als Lebensrettung zu verstehen.",
        "Tägliche Audio-Entlastung: Sprechen Sie in Nuju das aus, was Sie sich vor anderen niemals zu sagen trauen."
      ],
      fr: [
        "Consultez un thérapeute somatique spécialisé dans le trauma (Somatic Experiencing).",
        "Décharge vocale progressive : pratiquez des grondements sourds en voiture pour libérer la gorge.",
        "Lisez 'Quand le corps dit non' du Dr Gabor Maté pour déculpabiliser la colère saine.",
        "Délestage vocal quotidien dans Nuju : exprimez les pensées brutes que vous n'osez avouer à personne."
      ],
      es: [
        "Considera acompañamiento con un terapeuta somático informado en trauma.",
        "Descarga vocal progresiva: ruge o emite tonos graves en el coche para desbloquear la garganta.",
        "Lee 'Cuando el cuerpo dice no' del Dr. Gabor Maté para validar la autoprotección.",
        "Vaciado vocal diario en Nuju para exteriorizar en privado todo lo que llevas años silenciando."
      ]
    },
    badge: {
      en: "Pressurized Armor",
      id: "Baju Zirah Bertekanan Tinggi",
      de: "Unter Hochdruck gepanzert",
      fr: "Armure sous Pression",
      es: "Armadura a Presión"
    }
  }
];

export const REPRESSED_ANGER_OPTIONS = [
  {
    score: 0,
    label: {
      en: "Never / Rarely",
      id: "Tidak Pernah / Jarang",
      de: "Nie / Selten",
      fr: "Jamais / Rarement",
      es: "Nunca / Raras veces"
    }
  },
  {
    score: 1,
    label: {
      en: "Sometimes (1-2 times/week)",
      id: "Kadang-kadang (1-2 kali/minggu)",
      de: "Manchmal (1-2 Mal/Woche)",
      fr: "Parfois (1-2 fois/semaine)",
      es: "A veces (1-2 veces/semana)"
    }
  },
  {
    score: 2,
    label: {
      en: "Often (3-4 times/week)",
      id: "Sering (3-4 kali/minggu)",
      de: "Oft (3-4 Mal/Woche)",
      fr: "Souvent (3-4 fois/semaine)",
      es: "A menudo (3-4 veces/semana)"
    }
  },
  {
    score: 3,
    label: {
      en: "Almost Constantly / Daily",
      id: "Hampir Selalu / Setiap Hari",
      de: "Fast ständig / Täglich",
      fr: "Presque constamment / Quotidien",
      es: "Casi constantemente / A diario"
    }
  }
];

export const REPRESSED_ANGER_SUBSCALE_INFO = {
  somatic_rage: {
    name: {
      en: "Somatic Rage & Fascial Clamping",
      id: "Amarah Somatik & Ketegangan Fasia",
      de: "Somatische Wut & Faszienspannung",
      fr: "Rage Somatique & Tensions Myofasciales",
      es: "Rabia Somática y Tensión Fascial"
    },
    description: {
      en: "Measures bruxism, jaw clenching, locked neck/traps, digestive distress, and heat in the chest from held-back fight impulses.",
      id: "Mengukur bruxismus, rahang kaku, bahu tegang, gangguan lambung, dan rasa panas di dada akibat impuls amarah yang ditahan.",
      de: "Misst Zähneknirschen, Kieferspannung, Nackenblockaden und Magenreaktionen durch blockierte Kampfreflexe.",
      fr: "Mesure le bruxisme, les mâchoires crispées, les trapèzes bloqués et les troubles digestifs liés à la colère contenue.",
      es: "Mide bruxismo, mandíbula rígida, espasmos cervicales y ardor estomacal por la contención de impulsos de lucha."
    }
  },
  fawn_resentment: {
    name: {
      en: "Fawn Response & Chronic Resentment",
      id: "Respons Fawn & Kejengkelan Kronis",
      de: "Gefälligkeitsfalle & Stille Bitterkeit",
      fr: "Réponse de Soumission & Rancœur Chronique",
      es: "Respuesta Complaciente y Resentimiento Crónico"
    },
    description: {
      en: "Measures habitual people-pleasing, inability to say 'No', followed by intense internal bitterness and imaginary arguments.",
      id: "Mengukur kebiasaan selalu menyenangkan orang lain, sulit menolak, yang disusul dendam diam-diam dan perdebatan imajiner di kepala.",
      de: "Misst übermäßige Gefälligkeit und Unfähigkeit 'Nein' zu sagen, gefolgt von nagender Bitterkeit und gedanklichen Streitgesprächen.",
      fr: "Mesure la complaisance excessive, la difficulté à refuser, suivie d'amertume et de disputes imaginaires.",
      es: "Mide la tendencia a complacer, incapacidad de decir 'No', seguida de amargura secreta y discusiones mentales."
    }
  },
  anger_inversion: {
    name: {
      en: "Anger Inversion & Retroflection",
      id: "Inversi Amarah & Menyalahkan Diri",
      de: "Wutumkehr & Selbstbeschuldigung",
      fr: "Rétroflexion & Inversion de la Colère",
      es: "Inversión de Ira y Autoculpa"
    },
    description: {
      en: "Evaluates the conversion of legitimate boundary violations into guilt, self-criticism, depressive exhaustion, and childhood fear of anger.",
      id: "Menilai pembalikan pelanggaran batasan menjadi rasa bersalah, kritik diri, kelelahan depresi, dan trauma masa kecil terhadap kemarahan.",
      de: "Erfasst das Umwandeln berechtigter Grenzverletzungen in Schuldgefühle, Selbstvorwürfe, Erschöpfung und kindliche Angst vor Wut.",
      fr: "Évalue la transformation d'une violation de limites en culpabilité, autocritique, fatigue dépressive et peur infantile de la colère.",
      es: "Evalúa la conversión de límites vulnerados en culpa, autocrítica despiadada, fatiga depresiva y miedo infantil a enfadarse."
    }
  }
};

export function getRepressedAngerResult(score: number): RepressedAngerResultLevel {
  const result = REPRESSED_ANGER_RESULTS.find(
    (r) => score >= r.scoreRange[0] && score <= r.scoreRange[1]
  );
  return result || REPRESSED_ANGER_RESULTS[REPRESSED_ANGER_RESULTS.length - 1];
}

export function calculateRepressedAngerSubscales(answers: Record<number, number>) {
  const subscales = {
    somatic_rage: 0,
    fawn_resentment: 0,
    anger_inversion: 0
  };

  REPRESSED_ANGER_QUESTIONS.forEach((q) => {
    const score = answers[q.id] ?? 0;
    subscales[q.subscale] += score;
  });

  return subscales;
}
