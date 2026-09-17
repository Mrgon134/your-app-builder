export interface EmotionalFlashbackQuestion {
  id: number;
  subscale: 'amygdala_hijack' | 'toxic_shame_critic' | 'truncated_defense';
  text: {
    en: string;
    id: string;
    de: string;
    fr: string;
    es: string;
  };
}

export interface EmotionalFlashbackResultLevel {
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

export const EMOTIONAL_FLASHBACK_QUESTIONS: EmotionalFlashbackQuestion[] = [
  {
    id: 1,
    subscale: 'amygdala_hijack',
    text: {
      en: "I suddenly get hit by an overwhelming wave of dread, panic, or feeling unsafe, even though nothing threatening happened in the room.",
      id: "Saya tiba-tiba dihantam gelombang rasa panik, cemas luar biasa, atau perasaan tidak aman, padahal tidak ada bahaya nyata di sekitar saya.",
      de: "Mich überrollt plötzlich eine Welle von Panik, diffuser Angst und Unsicherheit, obwohl im Raum keine reale Bedrohung vorliegt.",
      fr: "Une vague soudaine de panique, d'effroi ou d'insécurité m'envahit brutalement, alors qu'aucun danger réel n'est présent.",
      es: "De repente me invade una oleada abrumadora de pánico o inseguridad profunda, aunque no haya peligro real a mi alrededor."
    }
  },
  {
    id: 2,
    subscale: 'toxic_shame_critic',
    text: {
      en: "When something goes wrong, my internal voice attacks me with brutal contempt ('You are pathetic, disgusting, defective, and unlovable').",
      id: "Ketika terjadi kesalahan, suara hati saya menyerang dengan hinaan kejam ('Kamu menjijikkan, payah, cacat, dan tidak layak dicintai').",
      de: "Wenn etwas schiefgeht, attackiert mich mein innerer Kritiker mit brutaler Verachtung ('Du bist erbärmlich, defekt und unliebsam').",
      fr: "Quand quelque chose tourne mal, ma voix intérieure m'agresse avec un mépris cruel ('Tu es pitoyable, nul et indigne d'être aimé').",
      es: "Cuando algo sale mal, mi voz interna me ataca con desprecio feroz ('Eres patético, defectuoso y nadie puede quererte')."
    }
  },
  {
    id: 3,
    subscale: 'truncated_defense',
    text: {
      en: "During conflict, I feel like a terrified, helpless child facing an angry giant, losing my adult confidence and voice instantly.",
      id: "Saat terjadi konflik, saya mendadak merasa seperti anak kecil tak berdaya yang ketakutan, seketika kehilangan wibawa dan suara orang dewasa saya.",
      de: "Bei Konflikten fühle ich mich sofort wie ein verängstigtes, hilfloses Kind und verliere meine erwachsene Handlungsfähigkeit.",
      fr: "En cas de conflit, je me sens soudainement comme un enfant terrifié et impuissant, perdant instantanément ma voix d'adulte.",
      es: "Ante cualquier conflicto me siento de pronto como un niño pequeño e indefenso, perdiendo mi capacidad adulta de razonar y hablar."
    }
  },
  {
    id: 4,
    subscale: 'amygdala_hijack',
    text: {
      en: "A neutral look, slightly delayed text reply, or cold tone of voice from someone makes my stomach drop into sickening dread of abandonment.",
      id: "Ekspresi datar, balasan chat yang agak lama, atau nada suara dingin dari seseorang membuat perut saya mulas ketakutan akan ditinggalkan.",
      de: "Ein neutraler Blick, eine verspätete Nachricht oder ein kühler Tonfall lösen in mir sofortige Verlassenheitsangst aus.",
      fr: "Un regard neutre, un message sans réponse rapide ou un ton distant me plonge dans une angoisse d'abandon viscérale.",
      es: "Una mirada neutral, un mensaje tardío o un tono frío en otra persona me provocan un pánico visceral al rechazo o abandono."
    }
  },
  {
    id: 5,
    subscale: 'toxic_shame_critic',
    text: {
      en: "I feel an overwhelming urge to apologize repeatedly, even when I did nothing wrong or when someone else hurt me.",
      id: "Saya merasakan dorongan tak tertahankan untuk terus meminta maaf berulang kali, bahkan saat saya tidak salah atau justru saya yang disakiti.",
      de: "Ich verspüre den Zwang, mich ständig zu entschuldigen, selbst wenn ich keinen Fehler gemacht habe oder selbst verletzt wurde.",
      fr: "Je ressens le besoin compulsif de m'excuser sans cesse, même quand je n'ai rien fait de mal ou que l'on m'a blessé.",
      es: "Siento una necesidad imperiosa de disculparme una y otra vez, incluso cuando no he hecho nada malo o me han ofendido a mí."
    }
  },
  {
    id: 6,
    subscale: 'truncated_defense',
    text: {
      en: "Under stress, my default coping mechanism is to disappear: crawl into bed, hide under blankets, or wish I could evaporate from existence.",
      id: "Saat tertekan, respons alami saya adalah ingin menghilang: meringkuk di kasur, menarik selimut, atau berharap lenyap dari muka bumi.",
      de: "Unter Stress ist mein Hauptimpuls zu verschwinden: mich ins Bett zu verkriechen oder mir zu wünschen, mich in Luft aufzulösen.",
      fr: "Face au stress, mon réflexe est de disparaître : me cacher sous la couette ou souhaiter m'évaporer de l'existence.",
      es: "Bajo estrés, mi reacción instintiva es desaparecer: esconderme en la cama bajo la manta o desear evaporarme de la existencia."
    }
  },
  {
    id: 7,
    subscale: 'amygdala_hijack',
    text: {
      en: "I experience emotional storms with no pictures: intense sorrow, terror, or loneliness without knowing what event triggered it.",
      id: "Saya mengalami badai emosi tanpa gambaran visual: duka mendalam, teror, atau kesepian mencekam tanpa tahu apa yang memicunya.",
      de: "Ich erlebe gefühlsmäßige Stürme ohne Erinnerungsbilder: tiefe Trauer, Verlassenheit oder Schrecken ohne erkennbaren Grund.",
      fr: "Je traverse des tempêtes émotionnelles sans images visuelles : un désespoir ou une terreur intense sans en comprendre la cause.",
      es: "Sufro tormentas emocionales sin recuerdos claros: un dolor, terror o soledad devastadores sin saber qué los provocó."
    }
  },
  {
    id: 8,
    subscale: 'toxic_shame_critic',
    text: {
      en: "I believe that if people truly saw the real me behind my accomplishments, they would be repulsed and abandon me.",
      id: "Saya merasa yakin bahwa jika orang lain melihat diri saya yang sebenarnya di balik pencapaian saya, mereka akan jijik dan meninggalkan saya.",
      de: "Ich bin überzeugt, dass Menschen mich verachten und verlassen würden, wenn sie mein wahres Ich ohne Fassade sähen.",
      fr: "Je suis persuadé que si les gens voyaient qui je suis vraiment derrière mes réussites, ils seraient dégoûtés et me rejetteraient.",
      es: "Tengo la certeza de que si la gente viera quién soy en realidad detrás de mis logros, sentiría rechazo y se alejaría."
    }
  },
  {
    id: 9,
    subscale: 'truncated_defense',
    text: {
      en: "When someone seems displeased, I instantly over-accommodate, flatter them, or fawn to neutralize their anger and regain safety.",
      id: "Ketika seseorang terlihat tidak senang, saya refleks bersikap sangat manis, memuji, atau mengalah (fawn) demi meredam amarah mereka.",
      de: "Zeigt jemand Missfallen, reagiere ich sofort unterwürfig und schmeichelnd (Fawning), um mir Sicherheit zu erkaufen.",
      fr: "Dès que quelqu'un semble contrarié, j'adopte aussitôt une attitude de soumission ou de flatterie (fawn) pour apaiser le danger.",
      es: "Si alguien parece disgustado, de inmediato me vuelvo excesivamente complaciente y sumiso para calmar su enfado y sentirme a salvo."
    }
  },
  {
    id: 10,
    subscale: 'amygdala_hijack',
    text: {
      en: "My body reacts with intense physiological startle: racing heart, freezing breath, or trembling muscles at sudden sounds or raised voices.",
      id: "Tubuh saya bereaksi dengan kaget berlebihan: jantung berdegup kencang, napas tercekat, atau gemetar saat mendengar suara keras tiba-tiba.",
      de: "Mein Körper zeigt extreme Schreckreaktionen: Herzrasen, Atemstillstand oder Muskelzittern bei lauten Geräuschen oder lauter Stimme.",
      fr: "Mon corps sursaute violemment : cœur qui s'emballe, souffle coupé ou tremblements musculaires au moindre bruit soudain ou voix forte.",
      es: "Mi cuerpo reacciona con sobresaltos extremos: palpitaciones, respiración cortada o temblores ante ruidos imprevistos o voces alzadas."
    }
  },
  {
    id: 11,
    subscale: 'toxic_shame_critic',
    text: {
      en: "I hyper-scrutinize my past conversations for hours, convinced that I said something stupid, offensive, or embarrassing.",
      id: "Saya meneliti kembali percakapan masa lalu berjam-jam, merasa yakin bahwa saya telah mengatakan hal bodoh, memalukan, atau menyinggung.",
      de: "Ich analysiere vergangene Gespräche stundenlang, überzeugt davon, etwas Peinliches, Dummes oder Verletzendes gesagt zu haben.",
      fr: "Je dissèque mes conversations passées pendant des heures, persuadé d'avoir dit quelque chose de stupide, déplacé ou ridicule.",
      es: "Repaso mentalmente mis conversaciones durante horas, convencido de haber dicho algo estúpido, vergonzoso o inapropiado."
    }
  },
  {
    id: 12,
    subscale: 'truncated_defense',
    text: {
      en: "After an emotional trigger, I take days to recover; my nervous system remains in high alert, brain fog, or depressive exhaustion.",
      id: "Setelah terpantik emosi, saya butuh berhari-hari untuk pulih; saraf saya terus dalam siaga tinggi, kabut otak, atau kelelahan depresi.",
      de: "Nach einer emotionalen Erschütterung brauche ich Tage zur Erholung; mein Nervensystem bleibt in Dauer-Alarmbereitschaft oder Trance.",
      fr: "Après un déclencheur émotionnel, il me faut des jours pour récupérer ; mon système nerveux reste en état d'alerte maximale ou de brouillard.",
      es: "Tras un desencadenante emocional, tardo días en recuperarme; mi sistema nervioso permanece en alerta máxima, niebla mental o agotamiento."
    }
  }
];

export const EMOTIONAL_FLASHBACK_RESULTS: EmotionalFlashbackResultLevel[] = [
  {
    level: "grounded_resilient",
    scoreRange: [0, 10],
    title: {
      en: "Grounded & Stable Adult Ego State",
      id: "State Ego Dewasa yang Terhubung & Resilien",
      de: "Geerdet & Stabiler Erwachsenen-Zustand",
      fr: "Ancré & État Adulte Stable",
      es: "Anclado y Estado Adulto Resiliente"
    },
    summary: {
      en: "You have strong emotional grounding and a robust sense of self. Interpersonal friction rarely throws your nervous system into childhood survival regression.",
      id: "Anda memiliki kestabilan emosi yang baik dan rasa diri yang kokoh. Friksi interpersonal jarang menarik sistem saraf Anda ke regresi trauma masa kecil.",
      de: "Sie verfügen über eine stabile emotionale Verankerung. Zwischenmenschliche Spannungen werfen Ihr Nervensystem selten in kindliche Schutzreflexe zurück.",
      fr: "Vous possédez un bon ancrage émotionnel et une estime de vous solide. Les tensions relationnelles déclenchent rarement de régression traumatique.",
      es: "Posees un arraigo emocional sólido. Los roces interpersonales rara vez desencadenan regresiones a defensas infantiles de supervivencia."
    },
    neurobiology: {
      en: "Intact hippocampus-amygdala time tagging. Stressful events are accurately classified by the brain as present-moment occurrences rather than archaic danger.",
      id: "Koneksi hippocampus-amygdala bekerja optimal. Otak mampu membedakan peristiwa stres saat ini dari ancaman masa lalu tanpa bias disosiatif.",
      de: "Intakte Hippocampus-Amygdala-Kopplung. Stressoren werden präzise in der Gegenwart verortet und nicht mit Kindheitserfahrungen verwechselt.",
      fr: "Fonctionnement optimal de l'hippocampe ; les événements présents sont clairement distingués des souvenirs douloureux anciens.",
      es: "Conexión óptima entre hipocampo y amígdala; los estresores actuales se clasifican con precisión en el presente sin distorsión arcaica."
    },
    actionProtocol: {
      en: [
        "Maintain current emotional boundaries and healthy self-talk.",
        "Keep cultivating somatic awareness during minor stressful moments.",
        "Document resilience insights in Nuju to preserve emotional self-trust."
      ],
      id: [
        "Pertahankan batasan emosi yang sehat dan dialog internal yang penuh welas asih.",
        "Terus rawat kesadaran tubuh (somatic awareness) saat menghadapi ketegangan kerja.",
        "Dokumentasikan refleksi diri di Nuju untuk memperkuat kepercayaan diri."
      ],
      de: [
        "Behalten Sie gesunde Grenzziehungen und mitfühlende Selbstgespräche bei.",
        "Pflegen Sie Ihre körperliche Achtsamkeit auch bei kleineren Alltagsstressoren.",
        "Halten Sie stärkende Erkenntnisse in Nuju fest."
      ],
      fr: [
        "Conservez vos limites saines et votre dialogue intérieur bienveillant.",
        "Continuez de pratiquer la pleine conscience somatique au quotidien.",
        "Notez vos prises de conscience dans Nuju pour renforcer votre stabilité."
      ],
      es: [
        "Mantén tus límites protectores y un diálogo interno compasivo.",
        "Sigue cultivando la conciencia somática ante estresores menores.",
        "Registra tus aprendizajes en Nuju para afianzar tu autoconfianza."
      ]
    },
    badge: {
      en: "Anchored Adult",
      id: "Pribadi Dewasa Berakar",
      de: "Souveräner Erwachsener",
      fr: "Adulte Ancré",
      es: "Adulto Arraigado"
    }
  },
  {
    level: "mild_triggering",
    scoreRange: [11, 20],
    title: {
      en: "Mild Emotional Sensitivity & Rejection Vulnerability",
      id: "Sensitivitas Emosional Ringan & Kerentanan Penolakan",
      de: "Leichte emotionale Trigger & Ablehnungsempfindlichkeit",
      fr: "Sensibilité Émotionnelle Légère & Vulnérabilité au Rejet",
      es: "Sensibilidad Emocional Leve y Vulnerabilidad al Rechazo"
    },
    summary: {
      en: "Certain social cues (delayed replies, sharp tones) trigger brief surges of abandonment panic or self-doubt, but you can usually soothe yourself within a few hours.",
      id: "Sinyal sosial tertentu (chat lama dibalas, nada bicara ketus) memicu lonjakan cemas dan keraguan diri, namun Anda biasanya mampu menenangkan diri dalam beberapa jam.",
      de: "Bestimmte soziale Reize lösen vorübergehende Verunsicherung und Verlassenheitsängste aus, die Sie jedoch nach einiger Zeit selbst regulieren können.",
      fr: "Certains signaux relationnels réveillent de brèves montées d'insécurité, mais vous parvenez à retrouver votre équilibre en quelques heures.",
      es: "Ciertos estímulos relacionales despiertan dudas o pánico al rechazo, pero logras calmarte y recuperar el centro en cuestión de horas."
    },
    neurobiology: {
      en: "Occasional amygdala hypersensitivity to interpersonal ambiguity, prompting temporary cortisol elevation and mild fawn/appeasement behaviors.",
      id: "Hipersensitivitas amygdala sesekali terhadap ambiguitas relasi, memicu lonjakan kortisol sementara dan dorongan menyenangkan orang lain.",
      de: "Gelegentliche Amygdala-Überreaktion bei unklaren Beziehungssignalen mit kurzzeitiger Aktivierung des Beschwichtigungsreflexes (Fawn).",
      fr: "Hypersensibilité ponctuelle de l'amygdale face au doute relationnel, entraînant une brève tendance à la complaisance.",
      es: "Hipersensibilidad reactiva de la amígdala ante la ambigüedad social, provocando una activación leve del reflejo de complacencia."
    },
    actionProtocol: {
      en: [
        "Pete Walker Flashback Step 1: Tell yourself out loud: 'I am having an emotional flashback. I am an adult now, and I am safe.'",
        "Engage in 5-4-3-2-1 sensory grounding to anchor your visual and auditory cortex in the present room.",
        "Voice-record the feeling in Nuju rather than sending impulsive reassurance-seeking messages."
      ],
      id: [
        "Langkah 1 Pete Walker: Ucapkan dengan lantang pada diri: 'Saya sedang mengalami emotional flashback. Saya sudah dewasa dan saya aman sekarang.'",
        "Lakukan teknik grounding 5-4-3-2-1 untuk menarik indra kembali ke ruangan fisik saat ini.",
        "Gunakan perekam suara Nuju untuk meluapkan cemas daripada mengirim pesan memohon kepastian berulang kali."
      ],
      de: [
        "Schritt 1 nach Pete Walker: Sagen Sie sich laut: 'Ich habe einen emotionalen Flashback. Ich bin erwachsen und in Sicherheit.'",
        "Nutzen Sie die 5-4-3-2-1-Methode, um Ihre Sinne im gegenwärtigen Raum zu verankern.",
        "Sprechen Sie die Unsicherheit in Nuju ein, statt vorschnell nach Bestätigung zu suchen."
      ],
      fr: [
        "Étape 1 de Pete Walker : Dites-vous à voix haute : 'Je vis un flashback émotionnel. Je suis adulte et en sécurité ici.'",
        "Pratiquez l'ancrage 5-4-3-2-1 pour ramener votre attention dans votre environnement immédiat.",
        "Enregistrez ce que vous ressentez dans Nuju au lieu d'envoyer des messages paniqués."
      ],
      es: [
        "Paso 1 de Pete Walker: Dite en voz alta: 'Estoy teniendo un flashback emocional. Ahora soy adulto y estoy a salvo'.",
        "Aplica el anclaje sensorial 5-4-3-2-1 para situarte en el espacio presente.",
        "Graba lo que sientes en Nuju en lugar de enviar mensajes impulsivos buscando reafirmación."
      ]
    },
    badge: {
      en: "Cautious Feeler",
      id: "Penjelajah Sensitif",
      de: "Achtsamer Fühler",
      fr: "Cœur Sensible",
      es: "Sentidor Cauteloso"
    }
  },
  {
    level: "moderate_flashback_state",
    scoreRange: [21, 28],
    title: {
      en: "Moderate C-PTSD Emotional Flashbacks & Toxic Shame",
      id: "Emotional Flashback C-PTSD Sedang & Rasa Malu Toksik",
      de: "Moderate komplexe PTBS-Flashbacks & Toxische Scham",
      fr: "Flashbacks Émotionnels Modérés & Honte Toxique",
      es: "Flashbacks Emocionales Moderados y Vergüenza Tóxica"
    },
    summary: {
      en: "You frequently experience timeless emotional flashbacks where you suddenly feel tiny, helpless, humiliated, or defective. Your inner critic launches devastating assaults that make you want to hide.",
      id: "Anda sering mengalami kilas balik emosi tanpa gambaran nyata di mana Anda tiba-tiba merasa sangat kecil, tidak berdaya, terhina, atau cacat. Kritik batin Anda melancarkan serangan dahsyat yang membuat Anda ingin bersembunyi.",
      de: "Sie erleben regelmäßig zeitlose emotionale Flashbacks, bei denen Sie sich plötzlich klein, wertlos, beschämt oder defekt fühlen. Ihr innerer Kritiker greift Sie massiv an.",
      fr: "Vous subissez régulièrement des flashbacks émotionnels sans images : vous vous sentez soudain minuscule, coupable ou défectueux, submergé par les attaques de votre critique intérieur.",
      es: "Experimentas frecuentes flashbacks emocionales donde de repente te sientes pequeño, impotente y defectuoso. Tu crítico interno lanza ataques despiadados que te hacen desear desaparecer."
    },
    neurobiology: {
      en: "Amygdala hijack without visual episodic memory (implicit memory trigger). Deactivation of Broca's area (speech paralysis) coupled with hyper-active dorsal vagal freeze or fawn collapse.",
      id: "Pembajakan amygdala tanpa memori episodik visual (memori implisit terpantik). Penonaktifan area Broca (sulit bicara) dibarengi pembekuan dorsal vagal atau dorongan fawn.",
      de: "Amygdala-Hijack durch implizite Erinnerungen; vorübergehende Hemmung des Sprachzentrums (Broca) bei gleichzeitiger Erstarrung oder Unterwerfungsreflex.",
      fr: "Détournement limbique par mémoire implicite ; inhibition temporaire de l'aire de Broca (parole bloquée) et effondrement dans la soumission ou le figement.",
      es: "Secuestro amigdalino por memorias implícitas; parálisis temporal del habla (área de Broca) combinada con colapso en sumisión o congelación."
    },
    actionProtocol: {
      en: [
        "Memorize Pete Walker's 13 Steps for Managing Emotional Flashbacks (acknowledge trigger, reassure inner child, resist inner critic catastrophizing).",
        "Somatic containment: wrap yourself tightly in a heavy blanket to give tactile reassurance to your autonomic nervous system.",
        "Counter the Inner Critic: aggressively challenge toxic shame thoughts by labeling them as echoes of past abusers, not present facts.",
        "Voice journaling with Nuju: speak as the compassionate adult to the frightened inner child."
      ],
      id: [
        "Pahami 13 Langkah Penanganan Flashback Pete Walker (akui trigger, peluk anak batin, hentikan katastrofisasi kritik dalam).",
        "Somatic containment: bungkus tubuh Anda rapat dengan selimut tebal untuk memberikan sinyal taktil keselamatan pada saraf.",
        "Lawan Kritik Batin: beri label pada pikiran rasa malu sebagai gema masa lalu, bukan fakta diri Anda hari ini.",
        "Jurnal suara Nuju: bicaralah sebagai sosok dewasa penyayang kepada anak kecil yang sedang ketakutan di dalam batin."
      ],
      de: [
        "Wenden Sie die 13 Schritte nach Pete Walker an (Flashback anerkennen, inneres Kind trösten, inneren Kritiker stoppen).",
        "Körperliche Geborgenheit: Wickeln Sie sich fest in eine schwere Decke, um dem Nervensystem Halt zu geben.",
        "Entmachten Sie den inneren Kritiker: Entlarven Sie toxische Scham als alte Fremdstimmen, nicht als Ihre Identität.",
        "Sprechen Sie in Nuju als beschützender Erwachsener mit Ihrem verletzten inneren Kind."
      ],
      fr: [
        "Appliquez les 13 étapes de Pete Walker (reconnaître le flashback, rassurer l'enfant intérieur, faire taire le critique interne).",
        "Enveloppement somatique : enroulez-vous fermement dans un plaid lourd pour sécuriser votre corps.",
        "Combattez la honte toxique : identifiez ces pensées destructrices comme des échos anciens et non votre vérité.",
        "Pratiquez le journal vocal Nuju en vous parlant avec la tendresse d'un parent bienveillant."
      ],
      es: [
        "Aplica los 13 pasos de Pete Walker (reconocer el flashback, calmar al niño interior, silenciar al crítico).",
        "Contención somática: envuélvete firme en una manta pesada para dar seguridad táctil a tu sistema nervioso.",
        "Frena la vergüenza tóxica: etiqueta los pensamientos de inutilidad como ecos de heridas pasadas, no como tu realidad actual.",
        "Utiliza el diario de voz en Nuju hablándote a ti mismo como un adulto protector y compasivo."
      ]
    },
    badge: {
      en: "Wounded Child State",
      id: "State Anak Terluka",
      de: "Verletztes inneres Kind",
      fr: "Enfant Intérieur Blessé",
      es: "Niño Interior Herido"
    }
  },
  {
    level: "severe_cptsd_crisis",
    scoreRange: [29, 36],
    title: {
      en: "Severe Complex PTSD Flashback State & Identity Collapse",
      id: "Krisis Emotional Flashback C-PTSD Berat & Keruntuhan Identitas",
      de: "Schwere kPTBS-Flashback-Krisen & Identitätskollaps",
      fr: "Crise C-PTSD Sévère & Effondrement Identitaire",
      es: "Crisis Severa de Flashback C-PTSD y Colapso Identitario"
    },
    summary: {
      en: "You live in a state of near-constant neurobiological threat, experiencing debilitating emotional flashbacks, agonizing toxic shame, visceral terror, and protracted periods of dissociation or despair.",
      id: "Anda hidup dalam ancaman neurobiologis yang hampir konstan, mengalami emotional flashback yang melumpuhkan, rasa malu yang menyiksa, teror visceral, dan periode disosiasi atau keputusasaan panjang.",
      de: "Sie befinden sich in einem Zustand permanenter neurobiologischer Alarmbereitschaft mit quälenden Flashbacks, tiefer Scham und langanhaltender Dissoziation.",
      fr: "Vous vivez dans un état d'alerte traumatique quasi constant, subissant des flashbacks dévastateurs, une honte paralysante et de longs épisodes de dissociation.",
      es: "Vives en un estado de amenaza biológica casi constante, con dolorosos flashbacks emocionales, vergüenza tóxica paralizante y disociación prolongada."
    },
    neurobiology: {
      en: "Severe structural desynchronization between medial prefrontal cortex, insula, and amygdala. Chronic uncoupling of the dorsal vagal complex driving profound despair and somatic abandonment depression.",
      id: "Desinkronisasi struktural berat antara korteks prefrontal medial, insula, dan amygdala. Dominasi kompleks dorsal vagal memicu depresi abandonment yang mendalam.",
      de: "Tiefe Entkopplung zwischen präfrontalem Kortex und limbischem System; chronische Aktivierung des dorsalen Vaguskomplexes führt zu Erstarrung und Verlassenheitsdepression.",
      fr: "Désynchronisation neurobiologique profonde entre cortex frontal et amygdale ; domination du nerf vague dorsal provoquant effondrement et dépression d'abandon.",
      es: "Desincronización severa entre la corteza prefrontal y la amígdala; dominio del complejo vagal dorsal con depresión profunda por abandono."
    },
    actionProtocol: {
      en: [
        "Prioritize safety and consult a trauma specialist trained in EMDR, Somatic Experiencing, or IFS (Internal Family Systems).",
        "Physiological containment: lie on the floor with legs elevated on a chair (psoas release) to lower visceral sympathetic tone.",
        "Establish an Emergency Flashback Kit: grounding essential oils, textured objects, a written note from your adult self.",
        "Use Nuju's voice sanctuary to gently tether your floating mind back to physical breath and vocal vibration."
      ],
      id: [
        "Utamakan keselamatan diri dan cari terapis trauma bersertifikasi EMDR, Somatic Experiencing, atau IFS.",
        "Pelepasan psoas: berbaring di lantai dengan kedua kaki dinaikkan ke atas kursi untuk meredakan ketegangan panggul dan saraf simpatik.",
        "Siapkan 'Kotak Darurat Flashback': minyak aromaterapi, benda bertekstur, dan surat penenang yang Anda tulis sendiri saat kondisi tenang.",
        "Gunakan Nuju untuk melabuhkan pikiran yang melayang melalui getaran suara napas Anda sendiri."
      ],
      de: [
        "Suchen Sie Unterstützung bei einem spezialisierten Traumatherapeuten (EMDR, Somatic Experiencing oder IFS).",
        "Psoas-Entlastung: Flach auf den Boden legen und die Beine im 90-Grad-Winkel auf einen Stuhl lagern, um das Nervensystem zu beruhigen.",
        "Notfall-Kit anlegen: Beruhigende Düfte, haptische Gegenstände und ein Brief Ihres erwachsenen Ichs an sich selbst.",
        "Nutzen Sie Nuju, um Ihre Gedanken behutsam über die eigene Stimme im Hier und Jetzt zu verankern."
      ],
      fr: [
        "Consultez impérativement un spécialiste du trauma formé à l'EMDR, au Somatic Experiencing ou à l'IFS.",
        "Posture de décharge : allongez-vous au sol, jambes surélevées sur une chaise pour libérer le psoas et calmer l'angoisse viscérale.",
        "Constituez un kit d'urgence : huiles essentielles réconfortantes, objets texturés et lettre rassurante de vous-même.",
        "Utilisez le journal vocal Nuju pour vous reconnecter à votre présence physique par le son de votre voix."
      ],
      es: [
        "Busca acompañamiento profesional especializado en trauma complejo (EMDR, Somatic Experiencing o IFS).",
        "Liberación del psoas: túmbate en el suelo con las piernas elevadas en una silla para calmar el sistema simpático.",
        "Crea un kit de emergencia para crisis: aromas calmantes, objetos táctiles y una carta de tu yo adulto.",
        "Usa el espacio de voz de Nuju para devolver suavemente tu mente al momento presente a través del sonido."
      ]
    },
    badge: {
      en: "Trauma Survivor",
      id: "Penyintas Trauma Kuat",
      de: "Trauma-Überlebender",
      fr: "Résilient du C-PTSD",
      es: "Superviviente Resiliente"
    }
  }
];

export const EMOTIONAL_FLASHBACK_OPTIONS = [
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

export const EMOTIONAL_FLASHBACK_SUBSCALE_INFO = {
  amygdala_hijack: {
    name: {
      en: "Amygdala Hijack & Timeless Dread",
      id: "Pembajakan Amygdala & Teror Tanpa Waktu",
      de: "Amygdala-Hijack & Zeitlose Angst",
      fr: "Détournement Limbique & Angoisse Viscérale",
      es: "Secuestro Amigdalino y Pánico Atemporal"
    },
    description: {
      en: "Sudden overwhelming waves of terror, startle response, racing heart, and abandonment panic triggered by interpersonal micro-cues without visual memories.",
      id: "Gelombang panik mendadak, respons kaget ekstrem, jantung berdegup kencang, dan ketakutan ditinggalkan yang dipicu sinyal sosial halus tanpa memori visual.",
      de: "Plötzliche Wellen diffuser Panik, Schreckreaktionen und Verlassenheitsangst, ausgelöst durch subtile Beziehungssignale ohne konkrete Bilder.",
      fr: "Vagues soudaines de panique, sursauts intenses et angoisse d'abandon déclenchés par des détails relationnels sans souvenirs conscients.",
      es: "Oleadas súbitas de pánico, sobresaltos y miedo al abandono provocados por microseñales sociales sin recuerdos visuales específicos."
    }
  },
  toxic_shame_critic: {
    name: {
      en: "Toxic Shame & Savage Inner Critic",
      id: "Rasa Malu Toksik & Kritik Batin Kejam",
      de: "Toxische Scham & Innerer Kritiker",
      fr: "Honte Toxique & Critique Intérieur Féroce",
      es: "Vergüenza Tóxica y Crítico Interno Feroz"
    },
    description: {
      en: "Savage attacks from an internal voice claiming you are defective, disgusting, or worthy of abandonment, prompting obsessive post-conversation rumination.",
      id: "Serangan kejam suara batin yang menyebut Anda cacat, menjijikkan, atau pantas dibuang, memicu overthinking berjam-jam seusai berinteraksi.",
      de: "Heftige Angriffe der inneren Stimme ('Du bist wertlos, fehlerhaft'), gefolgt von stundenlangem Grübeln über vergangene Gespräche.",
      fr: "Attaques impitoyables de la voix intérieure vous jugeant nul ou honteux, suivies de ruminations obsessionnelles après chaque échange.",
      es: "Ataques brutales de la voz interior llamándote defectuoso o indigno, provocando horas de rumiación tras cualquier conversación."
    }
  },
  truncated_defense: {
    name: {
      en: "Truncated Defense & Regression",
      id: "Pertahanan Terputus & Regresi Anak Kecil",
      de: "Erstarrte Abwehr & Kindliche Regression",
      fr: "Défense Tronquée & Régression Infantile",
      es: "Defensa Truncada y Regresión Infantil"
    },
    description: {
      en: "Instantly feeling like a helpless, terrified child in conflict; collapsing into people-pleasing (fawn), hiding under blankets (freeze/flight), or prolonged recovery hangover.",
      id: "Seketika merasa seperti anak kecil tak berdaya saat konflik; roboh dalam fawning (mengalah), bersembunyi (freeze/flight), dan butuh berhari-hari untuk pulih.",
      de: "Das plötzliche Gefühl kindlicher Hilflosigkeit im Konfliktfall; Flucht in übermäßige Anpassung (Fawn) oder Rückzug ins Bett (Freeze).",
      fr: "Sentiment d'impuissance enfantine immédiat face au conflit ; réflexe de soumission aveugle (fawn) ou d'isolement complet (freeze).",
      es: "Sensación inmediata de desamparo infantil ante el conflicto; colapso en complacencia ciega (fawn) o encierro en la cama (freeze)."
    }
  }
};

export function getEmotionalFlashbackResult(score: number): EmotionalFlashbackResultLevel {
  const result = EMOTIONAL_FLASHBACK_RESULTS.find(
    (r) => score >= r.scoreRange[0] && score <= r.scoreRange[1]
  );
  return result || EMOTIONAL_FLASHBACK_RESULTS[EMOTIONAL_FLASHBACK_RESULTS.length - 1];
}

export function calculateEmotionalFlashbackSubscales(answers: Record<number, number>) {
  const subscales = {
    amygdala_hijack: 0,
    toxic_shame_critic: 0,
    truncated_defense: 0
  };

  EMOTIONAL_FLASHBACK_QUESTIONS.forEach((q) => {
    const score = answers[q.id] ?? 0;
    subscales[q.subscale] += score;
  });

  return subscales;
}
