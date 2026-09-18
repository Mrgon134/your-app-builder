export type AnxiousAvoidantCardLang = "en" | "id" | "de" | "fr" | "es";

export interface AnxiousAvoidantQuestion {
  id: number;
  subscale: "anxious_pursuit" | "avoidant_distancing" | "cycle_dysregulation";
  text: {
    en: string;
    id: string;
    de: string;
    fr: string;
    es: string;
  };
}

export interface AnxiousAvoidantResultLevel {
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

export const ANXIOUS_AVOIDANT_QUESTIONS: AnxiousAvoidantQuestion[] = [
  // 1. Anxious Pursuit & Protest Behaviors
  {
    id: 1,
    subscale: "anxious_pursuit",
    text: {
      en: "When my partner pulls away or takes hours to reply, I spiral into visceral panic, obsessively checking my phone and feeling physically sick.",
      id: "Saat pasangan menjauh atau berjam-jam tidak membalas pesan, saya panik luar biasa, memeriksa ponsel tanpa henti, dan merasa mual.",
      de: "Wenn mein Partner sich zurückzieht oder stundenlang nicht antwortet, gerate ich in Panik, starre aufs Handy und fühle mich körperlich elend.",
      fr: "Quand mon partenaire prend ses distances ou tarde à répondre, je panique, je scrute mon téléphone avec angoisse et la boule au ventre.",
      es: "Cuando mi pareja se distancia o tarda horas en responder, entro en pánico, miro el móvil sin parar y siento un nudo en el estómago."
    }
  },
  {
    id: 2,
    subscale: "anxious_pursuit",
    text: {
      en: "I engage in frantic 'protest behaviors'—spam-calling, sending walls of texts, or threatening to leave just to force an emotional reaction.",
      id: "Saya melakukan 'protest behaviors'—menelpon berkali-kali, mengirim teks panjang lebar, atau mengancam putus hanya demi memancing respons emosional.",
      de: "Ich greife zu drastischem 'Protestverhalten': Telefon-Terror, ellenlange Nachrichten oder Drohungen mit Trennung, nur um eine Reaktion zu erzwingen.",
      fr: "J'adopte des comportements de protestation excessifs : appels répétés, pavés de messages ou menaces de rupture pour arracher une réaction.",
      es: "Recurro a conductas de protesta impulsivas: llamadas insistentes, párrafos eternos de mensajes o amenazas de ruptura solo para obtener una reacción."
    }
  },
  {
    id: 3,
    subscale: "anxious_pursuit",
    text: {
      en: "I feel an urgent, desperate compulsion to resolve conflicts immediately; sitting with unresolved tension for even an hour feels unbearable.",
      id: "Saya merasa harus menyelesaikan konflik saat itu juga; membiarkan ketegangan menggantung meski hanya satu jam terasa sangat menyiksa.",
      de: "Ich verspüre den quälenden Zwang, Streit sofort zu klären; ungeklärte Spannungen auch nur eine Stunde auszuhalten, ist unerträglich.",
      fr: "J'ai le besoin viscéral et immédiat de résoudre tout conflit sur-le-champ ; attendre ne serait-ce qu'une heure m'est intolérable.",
      es: "Siento la necesidad urgente de resolver cualquier conflicto al instante; tolerar la tensión sin aclarar por una hora me resulta insoportable."
    }
  },
  {
    id: 4,
    subscale: "anxious_pursuit",
    text: {
      en: "I constantly monitor my partner's micro-expressions, tone of voice, and body language, convinced they are losing interest or preparing to abandon me.",
      id: "Saya terus-menerus memantau mikroekspresi, nada bicara, dan bahasa tubuh pasangan, yakin bahwa dia mulai bosan atau berniat meninggalkan saya.",
      de: "Ich scanne jede Mimik, jeden Tonfall und jede Geste meines Partners, überzeugt davon, dass er das Interesse verliert oder mich verlassen will.",
      fr: "J'analyse constamment les micro-expressions et le ton de voix de mon partenaire, persuadé(e) qu'il se détache ou va m'abandonner.",
      es: "Analizo cada microexpresión, tono de voz y postura de mi pareja, convencido/a de que pierde el interés o planea dejarme."
    }
  },

  // 2. Avoidant Distancing & Deactivating Strategies
  {
    id: 5,
    subscale: "avoidant_distancing",
    text: {
      en: "When my partner demands deeper emotional intimacy or shows vulnerability, I feel an overwhelming sensation of suffocation and need to escape.",
      id: "Ketika pasangan menuntut keintiman emosional mendalam atau menunjukkan kerentanan, saya merasa seperti tercekik dan ingin segera melarikan diri.",
      de: "Wenn mein Partner tiefere emotionale Nähe oder Verletzlichkeit fordert, fühle ich mich erstickt und spüre den starken Drang zu fliehen.",
      fr: "Dès que mon partenaire réclame plus d'intimité ou s'épanche, je me sens étouffé(e) et j'éprouve le besoin irrépressible de fuir.",
      es: "Cuando mi pareja exige mayor intimidad emocional o vulnerabilidad, siento que me asfixio y experimento un impulso urgente de huir."
    }
  },
  {
    id: 6,
    subscale: "avoidant_distancing",
    text: {
      en: "During heated emotional conversations, I shut down, go emotionally numb, stare blankly, or physically walk out of the room.",
      id: "Selama percakapan emosional yang memanas, saya tiba-tiba mati rasa, membisu, menatap kosong, atau langsung meninggalkan ruangan.",
      de: "Bei hitzigen emotionalen Gesprächen schalte ich innerlich ab, werde taub, starre ins Leere oder verlasse wortlos den Raum.",
      fr: "Lors des conflits émotionnels intenses, je me coupe de mes émotions, je deviens froid(e), je fige mon regard ou je quitte la pièce.",
      es: "En discusiones emocionales intensas me desconecto, me quedo frío/a por dentro, miro al vacío o me marcho de la habitación."
    }
  },
  {
    id: 7,
    subscale: "avoidant_distancing",
    text: {
      en: "I use subtle 'deactivating strategies'—focusing on small flaws, romanticizing an ex, or prioritizing work/hobbies to keep emotional distance.",
      id: "Saya memakai 'deactivating strategies'—fokus pada kekurangan kecil pasangan, mengidealkan mantan, atau membenamkan diri di pekerjaan demi menjaga jarak.",
      de: "Ich nutze unbewusste Abwehrmechanismen: kleine Fehler aufblasen, den Ex idealisieren oder in Arbeit versinken, um Distanz zu wahren.",
      fr: "J'utilise des stratégies de désactivation : traquer les défauts, idéaliser un(e) ex ou m'abrutir de travail pour maintenir mes distances.",
      es: "Aplico estrategias de desactivación inconscientes: exagerar defectos mínimos, idealizar a una expareja o refugiarme en el trabajo para poner distancia."
    }
  },
  {
    id: 8,
    subscale: "avoidant_distancing",
    text: {
      en: "I pride myself on total emotional self-reliance and secretly view my partner's emotional needs as 'clingy', irrational, or weak.",
      id: "Saya bangga bisa mandiri secara emosional dan diam-diam menganggap kebutuhan pasangan sebagai sifat manja, berlebihan, atau lemah.",
      de: "Ich bilde mir viel auf meine emotionale Autarkie ein und werte die Nähebedürfnisse meines Partners heimlich als 'bedürftig' oder schwach ab.",
      fr: "Je tire fierté de mon indépendance émotionnelle et je juge secrètement les besoins d'attachement de mon partenaire comme faibles ou étouffants.",
      es: "Me enorgullezco de mi autosuficiencia emocional y en el fondo juzgo las necesidades afectivas de mi pareja como debilidad o dependencia."
    }
  },

  // 3. Cyclical Push-Pull Dysregulation & Relational Whiplash
  {
    id: 9,
    subscale: "cycle_dysregulation",
    text: {
      en: "Our relationship feels like an exhausting rollercoaster: intense passion and closeness followed immediately by sudden cold withdrawal and conflict.",
      id: "Hubungan kami terasa seperti rollercoaster yang melelahkan: gairah dan kedekatan intens seketika diikuti oleh sikap dingin dan pertengkaran.",
      de: "Unsere Beziehung ist eine emotionale Achterbahn: Intensive Leidenschaft und Nähe wechseln sich abrupt mit Kälte und Distanz ab.",
      fr: "Notre relation ressemble à des montagnes russes épuisantes : une proximité fusionnelle suivie immédiatement de retraits glacials et de disputes.",
      es: "Nuestra relación es una montaña rusa agotadora: momentos de pasión y conexión extrema seguidos de indiferencia helada y conflicto."
    }
  },
  {
    id: 10,
    subscale: "cycle_dysregulation",
    text: {
      en: "The moment the avoidant partner pulls away, the anxious partner chases; the moment the anxious partner gives up, the avoidant partner reconnects.",
      id: "Saat pihak yang menghindar menjauh, pihak yang cemas mengejar; saat pihak yang cemas menyerah, pihak yang menghindar tiba-tiba mendekat lagi.",
      de: "Sobald sich einer zurückzieht, klammert der andere; gibt der Klammernde auf, sucht der Vermeidende plötzlich wieder die Nähe.",
      fr: "Dès que l'un fuit, l'autre poursuit ; mais dès que le poursuivant abandonne, le fuyant revient soudainement chercher le lien.",
      es: "En cuanto uno se distancia, el otro persigue; en cuanto el perseguidor se cansa y se rinde, el evitativo vuelve a buscar afecto."
    }
  },
  {
    id: 11,
    subscale: "cycle_dysregulation",
    text: {
      en: "I feel emotionally addicted to the dopamine rush of post-fight reconciliations, mistaking trauma-bonded anxiety for profound passion.",
      id: "Saya merasa kecanduan secara emosional pada lonjakan dopamin saat baikan setelah bertengkar, mengira kecemasan trauma bond sebagai cinta sejati.",
      de: "Ich bin süchtig nach dem Dopamin-Kick der Versöhnung nach einem Drama und verwechsle nervöse Trauma-Bond-Anspannung mit wahrer Liebe.",
      fr: "Je suis dépendant(e) du rush de dopamine des réconciliations passionnées, confondant l'angoisse du lien traumatique avec le grand amour.",
      es: "Siento una adicción al subidón de dopamina de las reconciliaciones apasionadas, confundiendo la ansiedad del vínculo traumático con amor verdadero."
    }
  },
  {
    id: 12,
    subscale: "cycle_dysregulation",
    text: {
      en: "This chronic push-pull dynamic has completely exhausted my nervous system, leaving me burnt out, anxious, and questioning my sanity.",
      id: "Dinamika tarik-ulur yang kronis ini telah menguras habis energi sistem saraf saya, membuat saya burnout, cemas, dan meragukan kewarasan sendiri.",
      de: "Diese ständige Push-Pull-Dynamik hat mein Nervensystem ruiniert; ich fühle mich ausgelaugt, dauergestresst und zweifle an meinem Verstand.",
      fr: "Cette dynamique perpétuelle d'attraction-rejet a brisé mon système nerveux ; je suis épuisé(e), constamment anxieux/se et à bout.",
      es: "Este juego crónico de tira y afloja ha fundido mi sistema nervioso; vivo agotado/a, con ansiedad permanente y dudando de mi cordura."
    }
  }
];

export const ANXIOUS_AVOIDANT_OPTIONS = [
  {
    value: 0,
    label: {
      en: "Never / Does Not Apply",
      id: "Tidak Pernah / Tidak Terjadi",
      de: "Nie / Trifft gar nicht zu",
      fr: "Jamais / Ne s'applique pas",
      es: "Nunca / No aplica"
    }
  },
  {
    value: 1,
    label: {
      en: "Rarely (Once a month)",
      id: "Jarang (Sebulan sekali)",
      de: "Selten (Einmal im Monat)",
      fr: "Rarement (Une fois par mois)",
      es: "Raras veces (Una vez al mes)"
    }
  },
  {
    value: 2,
    label: {
      en: "Sometimes (Bi-weekly)",
      id: "Kadang-kadang (Dua minggu sekali)",
      de: "Manchmal (Alle zwei Wochen)",
      fr: "Parfois (Toutes les deux semaines)",
      es: "A veces (Cada dos semanas)"
    }
  },
  {
    value: 3,
    label: {
      en: "Often (Weekly conflicts)",
      id: "Sering (Konflik mingguan)",
      de: "Häufig (Wöchentliche Konflikte)",
      fr: "Souvent (Conflits hebdomadaires)",
      es: "A menudo (Conflictos semanales)"
    }
  },
  {
    value: 4,
    label: {
      en: "Constantly (Daily cycle)",
      id: "Selalu (Siklus harian)",
      de: "Ständig (Täglicher Teufelskreis)",
      fr: "Constamment (Cycle quotidien)",
      es: "Constantemente (Ciclo diario)"
    }
  }
];

export const ANXIOUS_AVOIDANT_RESULTS: AnxiousAvoidantResultLevel[] = [
  {
    level: "secure_grounding",
    scoreRange: [0, 11],
    title: {
      en: "Secure Relational Grounding · Low Push-Pull Friction",
      id: "Keterikatan Aman · Gesekan Tarik-Ulur Rendah",
      de: "Sichere Beziehungsbasis · Geringe Push-Pull-Spannung",
      fr: "Attachement Sécurisant · Faible Friction Fuite/Poursuite",
      es: "Base Relacional Segura · Mínima Fricción de Tira y Afloja"
    },
    badge: {
      en: "Secure Stability",
      id: "Stabilitas Aman",
      de: "Sichere Stabilität",
      fr: "Stabilité Sereine",
      es: "Estabilidad Segura"
    },
    summary: {
      en: "Your relationship dynamic operates largely within secure attachment boundaries. Conflict does not trigger visceral abandonment terror or severe emotional stonewalling. You and your partner are capable of co-regulating without falling into destructive pursue-withdraw spirals.",
      id: "Dinamika hubungan Anda beroperasi dalam batas keterikatan yang aman. Konflik tidak memicu teror ditinggalkan atau pembungkaman emosional parah. Anda dan pasangan mampu saling menenangkan tanpa terjebak spiral kejar-menghindar.",
      de: "Ihre Beziehungsmuster bewegen sich im sicheren Bereich. Konflikte lösen keine existenzielle Verlassensangst oder totales Mauern aus. Beide Partner können Nähe und Distanz gesund regulieren.",
      fr: "Votre relation repose sur une sécurité affective solide. Les désaccords ne déclenchent pas de panique d'abandon ni de mur de silence. La régulation mutuelle fonctionne sans dérive toxique.",
      es: "Tu dinámica de pareja se apoya en un apego seguro. Los desacuerdos no despiertan terror al abandono ni evasión hostil. Saben regularse sin caer en persecuciones destructivas."
    },
    neurobiology: {
      en: "Optimal vagal tone and balanced oxytocin-vasopressin receptor expression in the hypothalamus. Separation distress does not hijack the amygdala into sympathetic fight/flight or dorsal freeze.",
      id: "Tonus vagal optimal dan keseimbangan reseptor oksitosin di hipotalamus. Ketegangan konflik tidak membajak amigdala ke mode panik serang/lari atau beku.",
      de: "Ausgeglichener Vagustonus und harmonische Oxytocin-Ausschüttung. Kurze Distanzen aktivieren keine unkontrollierte Amygdala-Alarmreaktion.",
      fr: "Tonus vagal équilibré et circuits de l'ocytocine stables. La distance physique ne déclenche pas d'affolement de l'amygdale.",
      es: "Tono vagal óptimo y balance en los circuitos de oxitocina. La separación momentánea no secuestra la amígdala en pánico."
    },
    actionProtocol: {
      en: [
        "Maintain direct communication: Continue stating needs clearly without relying on mind-reading or passive withdrawal.",
        "Respect natural autonomy: Recognize that wanting personal space is not a sign of waning love.",
        "Daily micro-checkins: Use Nuju's voice journal to reflect on gratitude and articulate subtle emotional shifts before they build up."
      ],
      id: [
        "Pertahankan komunikasi lugas: Terus ungkapkan kebutuhan emosional secara jelas tanpa berharap pasangan membaca pikiran Anda.",
        "Hargai ruang pribadi: Pahami bahwa keinginan pasangan untuk menyendiri bukanlah tanda cintanya memudar.",
        "Check-in harian: Gunakan jurnal audio Nuju untuk merefleksikan rasa syukur dan mengurai riak emosi kecil sebelum menumpuk."
      ],
      de: [
        "Direkte Wünsche äußern: Eigene Bedürfnisse klar und ohne Vorwürfe oder Rückzug kommunizieren.",
        "Autonomie respektieren: Bedürfnis nach Freiraum nicht als Liebesentzug missverstehen.",
        "Tägliche Stimmpraxis: Im Nuju-Journal kleine emotionale Nuancen reflektieren, bevor Missverständnisse entstehen."
      ],
      fr: [
        "Communication transparente : Continuez à exprimer vos besoins clairement sans attendre que l'autre devine vos pensées.",
        "Respect de l'espace : Considérez le besoin de solitude comme une respiration saine et non un désamour.",
        "Micro-réflexions vocales : Enregistrez de courts mémos dans Nuju pour ancrer la clarté et dénouer les micro-tensions."
      ],
      es: [
        "Claridad directa: Sigue expresando tus necesidades afectivas sin juegos de adivinanzas ni silencios castigadores.",
        "Respeta el espacio individual: Entiende que el tiempo a solas es saludable y no implica desamor.",
        "Reflexión vocal periódica: Graba notas de voz en Nuju para procesar pequeñas dudas antes de que se vuelvan reclamos."
      ]
    }
  },

  {
    level: "mild_triggering",
    scoreRange: [12, 20],
    title: {
      en: "Mild Attachment Triggering · Occasional Pursue-Withdraw",
      id: "Pemicu Keterikatan Ringan · Tarik-Ulur Sesekali",
      de: "Leichte Trigger-Muster · Gelegentliche Flucht-Poursuite",
      fr: "Sensibilité d'Attachement Légère · Tiraillement Occasionnel",
      es: "Sensibilidad de Apego Leve · Episodios Ocasionales de Tira y Afloja"
    },
    badge: {
      en: "Trigger Sensitivity",
      id: "Sensitivitas Pemicu",
      de: "Trigger-Sensitivität",
      fr: "Sensibilité Réactive",
      es: "Reactividad Leve"
    },
    summary: {
      en: "You notice early signs of the anxious-avoidant friction. When stress peaks, one partner leans into anxious reassurance seeking while the other tends to pull into self-protective solitude. If unaddressed, these habits can solidify into chronic gridlock.",
      id: "Anda mulai merasakan tanda-tanda awal gesekan cemas-menghindar. Saat stres meningkat, salah satu pihak cenderung menuntut kepastian berlebih sementara pihak lain menarik diri untuk melindungi diri. Jika dibiarkan, pola ini bisa menjadi kebiasaan kronis.",
      de: "Erste Anzeichen der Angst-Vermeidungs-Schleife zeigen sich. Unter Stress sucht ein Partner vermehrt Rückversicherung, während der andere sich zurückzieht. Unbemerkt kann dies verkrusten.",
      fr: "Vous observez les premières étincelles de la dynamique poursuivant-fuyant. Sous pression, l'un réclame de la réassurance tandis que l'autre s'isole par réflexe de protection.",
      es: "Detectas indicios tempranos del patrón ansioso-evitativo. En momentos de estrés, uno busca reafirmación constante mientras el otro se aísla para no agobiarse."
    },
    neurobiology: {
      en: "Mild anterior cingulate cortex activation during delayed text messages or cool tones, registering brief attachment distress without full catecholamine flooding.",
      id: "Aktivasi ringan pada korteks singulata anterior saat pesan terlambat dibalas, memicu ketidaknyamanan tanpa membanjiri hormon stres secara ekstrem.",
      de: "Leichte Erregung im anterioren cingulären Kortex bei verspäteten Antworten, die jedoch noch kognitiv reguliert werden kann.",
      fr: "Activation légère du cortex cingulaire en cas de silence prolongé, créant une inquiétude gérable sans panique viscérale.",
      es: "Leve hiperreactividad en el córtex cingulado ante silencios o frialdad, aún controlable sin colapso emocional."
    },
    actionProtocol: {
      en: [
        "Adopt timed pauses: Agree on a 15-minute cool-down when a conversation turns defensive, promising a specific return time.",
        "Label the dynamic out loud: Instead of saying 'You don't care', say 'I feel the pursue-withdraw loop starting right now.'",
        "Somatic vocal check-in: Before texting in frustration, talk into Nuju's voice journal for 2 minutes to discharge nervous system urgency."
      ],
      id: [
        "Gunakan jeda berbatas waktu: Sepakati rehat 15 menit saat obrolan mulai tegang dengan janji waktu kembali yang pasti.",
        "Beri nama dinamika tersebut: Alih-alih berkata 'Kamu tidak peduli', katakan 'Pola kejar-menghindar kita sedang mulai terpicu.'",
        "Buang urgensi lewat suara: Sebelum mengirim pesan penuh amarah, bicaralah ke jurnal audio Nuju selama 2 menit untuk menenangkan sistem saraf."
      ],
      de: [
        "Verbindliche Auszeiten: Bei aufkommender Defensive eine 15-minütige Pause mit fester Rückkehrzeit vereinbaren.",
        "Das Muster benennen: Statt 'Dir ist alles egal' sagen: 'Wir geraten gerade wieder in unsere typische Flucht-Verfolgungs-Falle.'",
        "Nervöse Energie entladen: Vor dem Absenden impulsiver Textnachrichten 2 Minuten ins Nuju-Journal sprechen, um den Puls zu senken."
      ],
      fr: [
        "Pauses chronométrées : Instaurez une pause de 15 minutes avec heure de reprise fixe dès que la discussion s'envenime.",
        "Nommez le piège : Dites 'Nous entrons dans notre cercle poursuite-retrait habituel' plutôt que d'accuser l'autre.",
        "Désamorcez par la voix : Avant d'envoyer un message cinglant, parlez 2 minutes dans Nuju pour apaiser l'urgence corporelle."
      ],
      es: [
        "Pausas con hora fija: Acuerden 15 minutos de respiro con compromiso exacto de reanudar la charla cuando haya calma.",
        "Nombra el ciclo: En lugar de reprochar, di: 'Estamos cayendo en nuestro ciclo habitual de reclamo y retirada.'",
        "Filtro vocal previo: Antes de enviar mensajes cargados de reproche, desahógate en Nuju durante 2 minutos para bajar pulsaciones."
      ]
    }
  },

  {
    level: "moderate_trap",
    scoreRange: [21, 30],
    title: {
      en: "Moderate Anxious-Avoidant Trap · Active Pursue-Withdraw Dynamic",
      id: "Jebakan Anxious-Avoidant Moderat · Siklus Kejar-Menghindar Aktif",
      de: "Moderater Beziehungs-Strudel · Aktive Verfolgungs-Rückzugs-Spirale",
      fr: "Piège Anxieux-Évitant Modéré · Danse Fuite/Poursuite Installée",
      es: "Trampa Ansioso-Evitativa Moderada · Dinámica Activa de Persecución y Huida"
    },
    badge: {
      en: "The Dance Active",
      id: "Siklus Aktif",
      de: "Aktiver Strudel",
      fr: "Danse Active",
      es: "Ciclo Activo"
    },
    summary: {
      en: "You are locked in the classic Dr. Sue Johnson pursue-withdraw trap. The anxious partner's desperation triggers the avoidant partner's suffocation panic, which causes withdrawal, thereby intensifying the anxious partner's terror. Both partners are misinterpreting each other's trauma defenses as malice.",
      id: "Anda terkunci dalam jebakan kejar-menghindar klasik model Dr. Sue Johnson. Kepanikan pihak cemas memicu rasa tercekik pada pihak yang menghindar, yang kemudian menarik diri dan semakin melipatgandakan teror pihak cemas. Keduanya salah mengira mekanisme pertahanan trauma pasangan sebagai kejahatan sengaja.",
      de: "Sie stecken mitten in der klassischen EFT-Verfolgungs-Rückzugs-Falle. Das Nähe-Bohren des einen erstickt den anderen, dessen Flucht die Panik des Verfolgers potenziert. Beide deuten den Schutzreflex des Partners fälschlich als bösen Willen.",
      fr: "Vous êtes pris au piège de la danse classique de Sue Johnson. Les protestations de l'un étouffent l'autre, dont le retrait panique le premier. Chacun prend le mécanisme de défense de l'autre pour du désintérêt ou de l'hostilité.",
      es: "Están atrapados en el ciclo clásico de persecución y repliegue de Sue Johnson. La insistencia angustiada de uno asfixia al otro, cuya retirada multiplica el pánico del primero. Ambos confunden la defensa traumática de su pareja con falta de amor."
    },
    neurobiology: {
      en: "Bilateral amygdala hijack in the anxious partner triggering acute abandonment terror and elevated norepinephrine. The avoidant partner experiences dorsal vagal numbing and heart rate elevation (>100 bpm) characteristic of diffuse physiological flooding.",
      id: "Pembajakan amigdala pada pihak cemas memicu lonjakan norepinefrin. Pihak yang menghindar mengalami pembungkaman dorsal vagal dan detak jantung melonjak (>100 bpm) tanda kelebihan beban fisiologis.",
      de: "Amygdala-Alarm beim ängstlichen Partner mit massiver Noradrenalin-Ausschüttung. Der vermeidende Partner flieht in dorsale Vagus-Erstarrung bei Puls über 100 bpm.",
      fr: "Court-circuit de l'amygdale chez le partenaire anxieux (afflux de noradrénaline). Sidération vagale dorsale et tachycardie chez le partenaire évitant.",
      es: "Secuestro de la amígdala en el polo ansioso (noradrenalina disparada). Bloqueo vagal dorsal y taquicardia (>100 lpm) en el polo evitativo."
    },
    actionProtocol: {
      en: [
        "Reframe the cycle as the enemy: Stop attacking each other; name the loop 'our demon dance' and fight the pattern together.",
        "Avoidant reassurance obligation: When needing space, the avoidant partner must say: 'I love you, I am flooded, I need 30 minutes to calm down, and I will be back.'",
        "Anxious self-soothing containment: The anxious partner must step away from their phone. Record unfiltered panic into Nuju's encrypted audio journal to burn off cortisol without attacking the partner."
      ],
      id: [
        "Jadikan siklus ini sebagai musuh bersama: Berhentilah saling menyalahkan; namai pola ini 'tarian jebakan kita' dan lawan siklusnya bersama-sama.",
        "Kewajiban kepastian bagi pihak penghindar: Saat butuh waktu sendiri, pihak yang menghindar wajib berkata: 'Aku mencintaimu, aku sedang kewalahan, aku butuh 30 menit untuk tenang, dan aku pasti kembali.'",
        "Penenangan mandiri pihak cemas: Jauhkan ponsel Anda. Keluarkan semua kepanikan mentah ke jurnal audio Nuju untuk membakar kortisol tanpa menyerang pasangan."
      ],
      de: [
        "Das Muster als Feind begreifen: Nicht den Partner bekämpfen, sondern die Schleife gemeinsam als 'unseren Teufelskreis' identifizieren.",
        "Sicherheitsversprechen bei Rückzug: Der Vermeidende muss sagen: 'Ich liebe dich, bin aber überflutet. Ich brauche 30 Minuten und komme dann verlässlich wieder.'",
        "Selbstberuhigung fürs Handy-Fasten: Der ängstliche Partner spricht den inneren Panikmonolog ins Nuju-Audio-Journal, um Cortisol abzubauen, statt Vorwürfe zu tippen."
      ],
      fr: [
        "Faites du cycle l'ennemi commun : Cessez de vous attaquer mutuellement ; nommez le piège 'notre engrenage' et unissez-vous contre lui.",
        "Obligation de réassurance du fuyant : En cas de retrait, le fuyant doit formuler : 'Je t'aime, je suis submergé(e), j'ai besoin de 30 min et je reviens ensuite.'",
        "Contenance de l'angoisse : Le partenaire anxieux pose son téléphone et confie sa terreur brute à Nuju pour dissiper le cortisol sans agresser l'autre."
      ],
      es: [
        "El ciclo es el enemigo, no tu pareja: Dejen de atacarse; bauticen la dinámica como 'nuestro nudo' y luchen juntos contra ella.",
        "Compromiso de calma del evitativo: Si necesitas retirarte, debes decir: 'Te quiero, estoy saturado/a, necesito 30 minutos a solas y vuelvo a conversar.'",
        "Contención de la ansiedad: Quien persigue debe soltar el móvil. Graba tu desesperación en Nuju para quemar adrenalina sin lanzar reproches destructivos."
      ]
    }
  },

  {
    level: "severe_whiplash",
    scoreRange: [31, 39],
    title: {
      en: "Severe Relational Whiplash · Entrenched Trauma Bond & Dysregulation",
      id: "Whiplash Relasional Parah · Keterikatan Trauma Kronis & Disregulasi",
      de: "Schweres Beziehungs-Schleudertrauma · Chronischer Trauma-Bond",
      fr: "Coup du Lapin Émotionnel Sévère · Lien Traumatique Chronique",
      es: "Latigazo Relacional Severo · Vínculo Traumático y Desregulación Crónica"
    },
    badge: {
      en: "Trauma Bonded",
      id: "Terikat Trauma",
      de: "Trauma-Bond",
      fr: "Lien Traumatique",
      es: "Vínculo Traumático"
    },
    summary: {
      en: "Your relationship has degraded into an exhausting trauma-bonded addiction. Severe protest behaviors (spam calls, dramatic breakups) clash with brutal stonewalling and silent treatment. The intense intermittent reinforcement of passionate reconciliations keeps both nervous systems chronically fried.",
      id: "Hubungan Anda telah memburuk menjadi kecanduan trauma bond yang menguras fisik dan jiwa. Perilaku protes ekstrem (spam telpon, drama ancaman putus) berbenturan dengan silent treatment yang dingin. Siklus tarik-ulur ini membuat sistem saraf kedua belah pihak terbakar habis.",
      de: "Ihre Beziehung ist zu einer neurochemischen Sucht verkommen. Drama, Trennungsdrohungen und hysterische Vorwürfe prallen auf eiskaltes Schweigen und tagelange Ignoranz. Die intermittierende Verstärkung bei Versöhnungen verbrennt Ihre neuronalen Reserven.",
      fr: "Votre dynamique a muté en dépendance affective toxique. Crises de larmes, harcèlement téléphonique et menaces de rupture se heurtent au mépris et au silence de glace. Ce renforcement intermittent épuise littéralement votre organisme.",
      es: "La relación ha derivado en una adicción neuroquímica por vínculo traumático. Reclamos desmedidos y amenazas de ruptura chocan contra silencios castigadores de días. Este patrón intermitente tiene a ambos sistemas nerviosos al límite del colapso."
    },
    neurobiology: {
      en: "Intermittent dopamine reinforcement schedule mimicking substance dependency. Chronically elevated cortisol and flattened heart rate variability (HRV) indicative of autonomic nervous system exhaustion.",
      id: "Pola penguatan dopamin intermiten yang mirip dengan kecanduan zat terlarang. Kortisol tinggi berkepanjangan dan penurunan HRV yang menandakan kelelahan saraf otonom kronis.",
      de: "Intermittierende Dopamin-Ausschüttung wie bei Drogenabhängigkeit. Dauerhaft erhöhtes Cortisol und drastisch gesenkte Herzratenvariabilität (HRV).",
      fr: "Circuit dopaminergique intermittent analogue à l'addiction chimique. Taux de cortisol chroniquement haut et effondrement de la variabilité cardiaque (VRC).",
      es: "Refuerzo dopaminérgico intermitente idéntico al de las adicciones químicas. Cortisol permanentemente elevado y colapso de la variabilidad cardíaca (VFC)."
    },
    actionProtocol: {
      en: [
        "Immediate behavioral ceasefire: Agree to ban break-up threats and silent treatment under any circumstances for 30 days.",
        "Separate living/sleeping quarters during conflict: If arguments become dysregulated, physically sleep in separate rooms without hostility.",
        "Mandatory voice journal grounding: Whenever the impulse strikes to send a 20-paragraph text or disappear for days, speak into Nuju first. Only revisit the conversation once your resting heart rate drops below 75 bpm."
      ],
      id: [
        "Gencatan senjata perilaku segera: Buat kesepakatan tertulis untuk melarang ancaman putus dan silent treatment selama minimal 30 hari.",
        "Pisah kamar saat konflik memuncak: Jika pertengkaran mulai tidak terkontrol, tidurlah di ruangan terpisah tanpa permusuhan.",
        "Kewajiban grounding suara di Nuju: Setiap kali muncul dorongan untuk mengirim 20 paragraf teks atau kabur berhari-hari, bicaralah ke jurnal suara Nuju terlebih dahulu. Jangan lanjutkan pembicaraan sebelum detak jantung kembali normal."
      ],
      de: [
        "Sofortiger Waffenstillstand: Schriftliche Vereinbarung, für 30 Tage weder Trennungen anzudrohen noch das Schweigen als Strafe einzusetzen.",
        "Räumliche Trennung bei Eskalation: Bei extremer Überreizung getrennt schlafen, ohne Feindseligkeit.",
        "Verpflichtende Nuju-Stimmentlastung: Bevor endlose Texttiraden getippt oder tagelange Kontaktabbrüche gestartet werden, alles ungefiltert ins Nuju-Audio-Journal sprechen. Rückkehr erst bei Ruhepuls unter 75 bpm."
      ],
      fr: [
        "Cessez-le-feu immédiat : Bannissez formellement toute menace de rupture et tout silence punitif pendant 30 jours consécutifs.",
        "Chambres séparées en cas de crise : Si la dispute dégénère, dormez séparément sans rancœur pour désamorcer le système nerveux.",
        "Décharge vocale obligatoire : Avant d'écrire un roman de reproches ou de bloquer l'autre, parlez dans Nuju. Ne reprenez la discussion qu'après retour du calme cardiaque."
      ],
      es: [
        "Tregua obligatoria inmediata: Prohíban terminantemente amenazar con romper y aplicar la ley del hielo durante 30 días.",
        "Espacio físico separado en crisis: Si la discusión se desborda, duerman en cuartos separados sin hostilidad para frenar el estrés.",
        "Desahogo vocal previo en Nuju: Antes de enviar parrafadas incendiarias o desaparecer por días, habla en Nuju. No vuelvas a la conversación hasta que tus pulsaciones bajen de 75 lpm."
      ]
    }
  },

  {
    level: "catastrophic_collapse",
    scoreRange: [40, 48],
    title: {
      en: "Catastrophic Attachment Trap · Relational Burnout & Systemic Collapse",
      id: "Jebakan Keterikatan Katastropik · Burnout Relasional & Kolaps Sistemik",
      de: "Katastrophale Beziehungs-Falle · Totaler Burnout & Nervenzusammenbruch",
      fr: "Piège d'Attachement Catastrophique · Burnout Relational & Effondrement",
      es: "Colapso Relacional Catastrófico · Burnout Afectivo y Ruptura del Sistema Nervioso"
    },
    badge: {
      en: "Systemic Crisis",
      id: "Krisis Sistemik",
      de: "Systemische Krise",
      fr: "Crise Systémique",
      es: "Crisis Sistémica"
    },
    summary: {
      en: "You are experiencing maximum attachment-system failure. The relationship has become a toxic, destructive war zone causing panic attacks, physical illness, sleeplessness, and profound mental exhaustion. Both partners are entirely depleted, and continuing this dynamic without intensive clinical intervention or a structured separation will cause lasting psychological damage.",
      id: "Anda mengalami kegagalan sistem keterikatan maksimal. Hubungan telah berubah menjadi medan pertempuran yang memicu serangan panik, penyakit fisik, insomnia parah, dan keputusasaan mental mendalam. Melanjutkan dinamika ini tanpa bantuan terapis berlisensi atau jeda terstruktur akan menimbulkan trauma psikologis permanen.",
      de: "Maximaler Zusammenbruch des Bindungssystems. Die Beziehung gleicht einem toxischen Schlachtfeld, das Panikattacken, Schlafstörungen, Depressionen und körperliche Krankheiten auslöst. Ohne professionelle Paartherapie (EFT) oder eine geordnete Trennung drohen irreparable Traumafolgen.",
      fr: "Effondrement total du système d'attachement. La relation est devenue un champ de ruines toxique provoquant crises de panique, insomnies et somatisations sévères. Sans thérapie de couple spécialisée ou séparation protectrice, les séquelles psychologiques seront durables.",
      es: "Fallo catastrófico del sistema de apego. La relación se ha convertido en una zona de guerra destructiva que genera ataques de pánico, insomnio y deterioro físico evidente. Continuar sin terapia de pareja especializada (EFT) o una separación protectora dejará secuelas traumáticas graves."
    },
    neurobiology: {
      en: "Chronic neurotoxicity from sustained allostatic load. Downregulated serotonin transporter mechanisms, hippocampal volume strain, and persistent dorsal vagal shutdown interspersed with hypertensive sympathetic surges.",
      id: "Neurotoksisitas kronis akibat beban stres berkepanjangan. Penurunan fungsi transporter serotonin, tekanan pada hipokampus, dan kolaps dorsal vagal berulang yang diwarnai lonjakan tensi darah tinggi.",
      de: "Chronische Neurotoxizität durch Dauerstress. Gestörte Serotonin-Transmission, Belastung des Hippocampus und schwerer Zusammenbruch der autonomen Selbstregulation.",
      fr: "Neurotoxicité chronique liée à l'épuisement allostatique. Altération des transporteurs de sérotonine et dissociation vagale dorsale quasi-permanente.",
      es: "Neurotoxicidad crónica por sobrecarga alostática continuada. Alteración de los receptores de serotonina, afectación del hipocampo y agotamiento vegetativo total."
    },
    actionProtocol: {
      en: [
        "Implement an immediate 14-day structured contact hiatus: Cease all unstructured communication to allow neurobiological de-escalation.",
        "Engage an Emotionally Focused Therapist (EFT): Seek clinical help specialized in attachment injury and trauma de-escalation.",
        "Personal vocal sanctuary: Channel grief, anger, and betrayal into Nuju's encrypted voice journal every evening. Focus on regaining individual somatic stability before attempting any relational decisions."
      ],
      id: [
        "Terapkan jeda kontak terstruktur 14 hari: Hentikan semua komunikasi bebas untuk memberi kesempatan sistem saraf mendingin.",
        "Cari terapis pasangan berlisensi (EFT): Dapatkan bantuan klinis yang berspesialisasi dalam cedera keterikatan dan trauma relasional.",
        "Sanctuary audio pribadi di Nuju: Salurkan duka, kemarahan, dan rasa lelah ke jurnal suara terenkripsi Nuju setiap malam. Fokus pulihkan kestabilan fisik diri sendiri sebelum membuat keputusan akhir terkait hubungan."
      ],
      de: [
        "14 Tage strukturierte Kontaktsperre: Völlige Funkstille zur physiologischen Entgiftung des Nervensystems vereinbaren.",
        "Emotionsfokussierte Paartherapie (EFT): Professionelle Unterstützung bei Traumafolgen und Bindungsstörungen hinzuziehen.",
        "Tägliche Stimmentlastung: Trauer, Wut und Erschöpfung jeden Abend im privaten Nuju-Audio-Tagebuch verarbeiten. Erst die eigene Stabilität zurückgewinnen, bevor Beziehungsentscheidungen getroffen werden."
      ],
      fr: [
        "Période de retrait structuré de 14 jours : Stoppez tout échange informel pour permettre à la physiologie de redescendre.",
        "Consultez un thérapeute EFT certifié : Faites appel à un spécialiste des blessures d'attachement et des dynamiques de crise.",
        "Sanctuaire vocal quotidien : Videz votre chagrin et votre colère chaque soir dans le journal chiffré de Nuju. Retrouvez votre équilibre individuel avant toute décision définitive."
      ],
      es: [
        "Pausa estructurada de 14 días sin contacto: Detengan toda comunicación espontánea para permitir que el sistema nervioso se desintoxique.",
        "Terapia de pareja especializada (EFT): Busquen ayuda profesional cualificada en heridas de apego y dinámicas de trauma relacional.",
        "Sanctuario vocal en Nuju: Descarga el dolor, la rabia y el agotamiento cada noche en el diario cifrado de Nuju. Recupera primero tu estabilidad física antes de decidir sobre el futuro de la relación."
      ]
    }
  }
];

export const ANXIOUS_AVOIDANT_SUBSCALE_INFO = {
  anxious_pursuit: {
    name: {
      en: "Anxious Pursuit & Protest Behaviors",
      id: "Pengejaran Cemas & Perilaku Protes",
      de: "Ängstliche Verfolgung & Protestverhalten",
      fr: "Poursuite Anxieuse & Protestations",
      es: "Persecución Ansiosa y Conductas de Protesta"
    },
    description: {
      en: "Hypervigilant monitoring, texting storms, abandonment panic, and frantic demands for immediate emotional reassurance.",
      id: "Pemantauan hipervigilan, spam pesan, teror ditinggalkan, dan tuntutan kepastian emosional seketika.",
      de: "Hypervigilante Überwachung, Textnachrichten-Stürme, Verlassenspanik und drängende Forderung nach sofortiger Nähe.",
      fr: "Surveillance anxieuse, rafales de messages, terreur de l'abandon et quête désespérée de réassurance immédiate.",
      es: "Hipervigilancia, ráfagas de mensajes, terror al abandono y exigencia urgente de certeza afectiva."
    }
  },
  avoidant_distancing: {
    name: {
      en: "Avoidant Distancing & Deactivation",
      id: "Penghindaran Jarak & Deaktivasi Emosional",
      de: "Vermeidender Rückzug & Deaktivierung",
      fr: "Mise à Distance Évitante & Désactivation",
      es: "Distanciamiento Evitativo y Desactivación"
    },
    description: {
      en: "Suffocation sensations, emotional numbing, walking out mid-conflict, hyper-independence, and deactivating strategies.",
      id: "Rasa tercekik saat dekat, mati rasa, kabur saat konflik, kemandirian ekstrem, dan strategi peredaman rasa.",
      de: "Erstickungsgefühle bei Nähe, emotionale Betäubung, Flucht im Konflikt, Schein-Autonomie und Rückzug.",
      fr: "Sentiment d'étouffement, anesthésie émotionnelle, fuite en plein conflit, fausse indépendance et désactivation.",
      es: "Sensación de asfixia, frialdad súbita, escape durante el conflicto, hiperindependencia y estrategias de bloqueo."
    }
  },
  cycle_dysregulation: {
    name: {
      en: "Push-Pull Dysregulation & Trauma Whiplash",
      id: "Disregulasi Tarik-Ulur & Trauma Whiplash",
      de: "Push-Pull-Spannung & Trauma-Whiplash",
      fr: "Dérégulation Fuite/Poursuite & Usure Émotionnelle",
      es: "Desregulación de Tira y Afloja y Desgaste Traumático"
    },
    description: {
      en: "Exhausting emotional rollercoaster, intermittent reinforcement, addiction to reconciliation rushes, and nervous system burnout.",
      id: "Rollercoaster emosional melelahkan, penguatan dopamin intermiten, kecanduan baikan, dan kelelahan sistem saraf.",
      de: "Kräftezehrende Achterbahnfahrt, intermittierende Belohnung, Sucht nach Versöhnungs-Dopamin und Nerven-Burnout.",
      fr: "Montagnes russes épuisantes, renforcement intermittent, dépendance au soulagement de la réconciliation et burnout nerveux.",
      es: "Montaña rusa desgastante, refuerzo intermitente, adicción a la calma posconflicto y agotamiento nervioso severo."
    }
  }
};

export function getAnxiousAvoidantResult(totalScore: number): AnxiousAvoidantResultLevel {
  const matched = ANXIOUS_AVOIDANT_RESULTS.find(
    (lvl) => totalScore >= lvl.scoreRange[0] && totalScore <= lvl.scoreRange[1]
  );
  return matched || ANXIOUS_AVOIDANT_RESULTS[ANXIOUS_AVOIDANT_RESULTS.length - 1];
}

export function calculateAnxiousAvoidantSubscales(answers: Record<number, number>): {
  anxious_pursuit: number;
  avoidant_distancing: number;
  cycle_dysregulation: number;
} {
  let anxious_pursuit = 0;
  let avoidant_distancing = 0;
  let cycle_dysregulation = 0;

  ANXIOUS_AVOIDANT_QUESTIONS.forEach((q) => {
    const val = answers[q.id] || 0;
    if (q.subscale === "anxious_pursuit") anxious_pursuit += val;
    if (q.subscale === "avoidant_distancing") avoidant_distancing += val;
    if (q.subscale === "cycle_dysregulation") cycle_dysregulation += val;
  });

  return { anxious_pursuit, avoidant_distancing, cycle_dysregulation };
}
