export type RsdLang = "en" | "id" | "de" | "fr" | "es";

export type RsdLevel = "resilient" | "mild" | "moderate" | "intense";

export type RsdDimension = "vigilance" | "criticism" | "catastrophizing";

export interface RsdQuestion {
  id: number;
  dimension: RsdDimension;
  text: Record<RsdLang, string>;
}

export const RSD_OPTIONS = [
  {
    value: 0,
    label: {
      en: "Rarely / Never",
      id: "Jarang / Tidak Pernah",
      de: "Selten / Nie",
      fr: "Rarement / Jamais",
      es: "Rara vez / Nunca",
    },
  },
  {
    value: 1,
    label: {
      en: "Sometimes",
      id: "Kadang-kadang",
      de: "Manchmal",
      fr: "Parfois",
      es: "A veces",
    },
  },
  {
    value: 2,
    label: {
      en: "Frequently / Often",
      id: "Seringkali",
      de: "Häufig / Oft",
      fr: "Souvent",
      es: "Frecuentemente",
    },
  },
  {
    value: 3,
    label: {
      en: "Almost Constantly / Severely",
      id: "Hampir Selalu / Sangat Intens",
      de: "Fast ständig / Extrem",
      fr: "Presque constamment / Sévère",
      es: "Casi constantemente / Severo",
    },
  },
];

export const RSD_QUESTIONS: RsdQuestion[] = [
  // Dimension 1: Hyper-Vigilance & Anticipated Rejection
  {
    id: 1,
    dimension: "vigilance",
    text: {
      en: "When someone responds with a short text or delayed reply, I immediately assume they are annoyed, disappointed, or pulling away from me.",
      id: "Saat seseorang membalas chat dengan singkat atau lama membalas, saya langsung berasumsi mereka kesal atau menjauh dari saya.",
      de: "Wenn jemand kurz angebunden antwortet oder spät reagiert, nehme ich sofort an, die Person sei verärgert oder ziehe sich zurück.",
      fr: "Quand quelqu'un répond brièvement ou tarde à répondre, je suppose immédiatement qu'il m'en veut ou s'éloigne.",
      es: "Si alguien me responde de forma cortante o tarda en contestar, asumo de inmediato que está molesto o distanciándose de mí.",
    },
  },
  {
    id: 2,
    dimension: "vigilance",
    text: {
      en: "I obsessively scan facial expressions, vocal micro-tones, and body language in conversations to detect any hint of subtle disapproval.",
      id: "Saya terbiasa membaca ekspresi wajah, nada suara, dan gestur orang lain secara berlebihan untuk mencari tanda ketidaksukaan.",
      de: "Ich analysiere Mimik, Tonfall und Körpersprache anderer penibel, um jedes Zeichen von Ablehnung zu erspüren.",
      fr: "J'analyse minutieusement les expressions du visage et le ton de voix des autres pour déceler le moindre signe de désapprobation.",
      es: "Analizo obsesivamente las miradas, tonos de voz y lenguaje corporal de los demás buscando señales de desaprobación.",
    },
  },
  {
    id: 3,
    dimension: "vigilance",
    text: {
      en: "I feel an intense, overwhelming urge to apologize repeatedly, even when I know rationally that I haven't done anything wrong.",
      id: "Saya merasakan dorongan kuat untuk meminta maaf berulang kali, meski secara rasional saya tidak berbuat salah apa pun.",
      de: "Ich habe den ständigen Drang, mich wiederholt zu entschuldigen, selbst wenn ich rational weiß, dass ich nichts falsch gemacht habe.",
      fr: "Je ressens le besoin compulsif de m'excuser sans cesse, même en sachant pertinemment que je n'ai rien fait de mal.",
      es: "Siento una necesidad abrumadora de disculparme una y otra vez, incluso sabiendo que no he hecho nada malo.",
    },
  },
  {
    id: 4,
    dimension: "vigilance",
    text: {
      en: "I hold back from expressing my authentic opinions or requests because the risk of being dismissed or judged feels unbearable.",
      id: "Saya sering menahan opini jujur atau keinginan pribadi karena takut ditolak atau dihakimi orang lain.",
      de: "Ich halte meine wahre Meinung zurück, weil sich das Risiko von Ablehnung oder Verurteilung unerträglich anfühlt.",
      fr: "Je retiens mes véritables opinions ou besoins car le risque d'être rejeté(e) ou jugé(e) me semble insupportable.",
      es: "Me guardo mis opiniones o deseos auténticos porque el riesgo de ser rechazado o juzgado me resulta insoportable.",
    },
  },

  // Dimension 2: Physical/Emotional Sensitivity to Criticism
  {
    id: 5,
    dimension: "criticism",
    text: {
      en: "Constructive feedback or minor criticism feels like a literal physical punch to the chest or stomach, leaving me winded or nauseous.",
      id: "Kritik atau masukan membangun terasa menyakitkan secara fisik seperti pukulan di dada atau mual di perut.",
      de: "Konstruktive Kritik fühlt sich wie ein körperlicher Schlag in die Magengrube an und raubt mir den Atem.",
      fr: "Une critique même constructive me frappe physiquement, comme un coup de poing dans la poitrine ou l'estomac.",
      es: "La crítica constructiva la siento como un golpe físico en el pecho o estómago, dejándome sin aliento.",
    },
  },
  {
    id: 6,
    dimension: "criticism",
    text: {
      en: "When I make a small mistake in public or work, a sudden wave of intense shame makes me want to instantly disappear or quit on the spot.",
      id: "Saat berbuat salah kecil di depan umum atau tempat kerja, rasa malu yang meluap membuat saya ingin lenyap atau langsung resign.",
      de: "Bei kleinen Fehlern vor anderen überrollt mich eine Schamwelle, sodass ich am liebsten sofort verschwinden oder kündigen würde.",
      fr: "Face à une petite erreur en public, une vague de honte intense me donne envie de disparaître ou de tout abandonner sur-le-champ.",
      es: "Al cometer un error mínimo en público, una ola de vergüenza extrema me hace desear desaparecer o renunciar en el acto.",
    },
  },
  {
    id: 7,
    dimension: "criticism",
    text: {
      en: "I am a chronic people-pleaser because maintaining everyone's explicit approval feels like the only shield against agonizing emotional pain.",
      id: "Saya sering menuruti semua orang (people-pleaser) karena merasa persetujuan mereka adalah satu-satunya perisai dari rasa sakit emosional.",
      de: "Ich bin ein chronischer People-Pleaser, weil die Zustimmung anderer mein einziger Schutzschild vor emotionalem Schmerz ist.",
      fr: "Je fais tout pour plaire aux autres, car leur approbation semble être mon unique bouclier contre une douleur émotionnelle atroce.",
      es: "Complazco a todos compulsivamente porque su aprobación parece mi único escudo contra un dolor emocional insoportable.",
    },
  },
  {
    id: 8,
    dimension: "criticism",
    text: {
      en: "I often abandon creative goals or new hobbies before starting, purely to protect myself from the possibility of falling short or being judged.",
      id: "Saya sering membatalkan rencana atau hobi baru sebelum memulainya, semata-mata agar terhindar dari potensi kegagalan atau dinilai buruk.",
      de: "Ich gebe Projekte oder Hobbys auf, noch bevor ich beginne, nur um mich vor möglichem Versagen oder Urteilen zu schützen.",
      fr: "J'abandonne des projets créatifs avant même de commencer, uniquement pour m'épargner l'échec ou le jugement.",
      es: "Abandono proyectos o pasatiempos antes de empezar, únicamente para protegerme del juicio o de no cumplir expectativas.",
    },
  },

  // Dimension 3: Catastrophic Rumination & Pre-emptive Withdrawal
  {
    id: 9,
    dimension: "catastrophizing",
    text: {
      en: "I replay brief social interactions or awkward pauses in my head for days, convinced that I embarrassed myself irrevocably.",
      id: "Saya memutar ulang percakapan canggung di kepala selama berhari-hari, yakin bahwa saya telah mempermalukan diri sendiri selamanya.",
      de: "Ich zergrüble peinliche Momente oder Gesprächspausen noch tagelang, überzeugt, mich unwiderruflich blamiert zu haben.",
      fr: "Je ressasse une conversation gênante pendant des jours, persuadé(e) d'avoir tout gâché irrémédiablement.",
      es: "Doy vueltas en mi cabeza a conversaciones incómodas durante días, convencido de haber hecho el ridículo por completo.",
    },
  },
  {
    id: 10,
    dimension: "catastrophizing",
    text: {
      en: "I have abruptly cut ties or ghosted people preemptively when I sensed even a minor shift in their warmth, before they could reject me first.",
      id: "Saya pernah tiba-tiba memutuskan kontak (ghosting) saat merasa ada perubahan sikap dari seseorang, demi menolak mereka duluan sebelum saya yang ditolak.",
      de: "Ich habe Beziehungen vorzeitig abgebrochen oder Menschen geghostet, um ihnen mit der Ablehnung zuvorzukommen.",
      fr: "J'ai déjà coupé les ponts ou ghosté des proches par anticipation dès que je sentais un léger froid, pour ne pas être rejeté(e) le premier.",
      es: "He cortado lazos o hecho 'ghosting' preventivo al percibir un distanciamiento, para evitar ser rechazado primero.",
    },
  },
  {
    id: 11,
    dimension: "catastrophizing",
    text: {
      en: "My moods can crash violently from optimistic to deeply despondent in a matter of seconds following an ambiguous social cue.",
      id: "Suasana hati saya bisa anjlok drastis dari optimis menjadi sangat terpuruk hanya dalam hitungan detik akibat sinyal sosial yang tidak jelas.",
      de: "Meine Stimmung kann nach einem unklaren sozialen Signal innerhalb von Sekunden von Optimismus in tiefe Verzweiflung stürzen.",
      fr: "Mon humeur peut s'effondrer en quelques secondes, passant de l'enthousiasme au désespoir après une simple remarque anodine.",
      es: "Mi estado de ánimo puede desplomarse en segundos tras una señal social ambigua, pasando de la alegría al desánimo total.",
    },
  },
  {
    id: 12,
    dimension: "catastrophizing",
    text: {
      en: "Even after dozens of compliments or victories, a single neutral or mild critique completely erases my self-worth.",
      id: "Meskipun menerima banyak pujian atau pencapaian, satu komentar netral atau sedikit kritik langsung menghancurkan harga diri saya.",
      de: "Selbst nach unzähligen Komplimenten reicht eine einzige neutrale oder kritische Bemerkung, um meinen Selbstwert zu vernichten.",
      fr: "Même après des dizaines d'éloges, une seule critique mineure anéantit instantanément toute ma confiance en moi.",
      es: "A pesar de recibir elogios constantes, una sola crítica leve basta para borrar por completo mi autoestima.",
    },
  },
];

export interface RsdProfile {
  level: RsdLevel;
  badge: Record<RsdLang, string>;
  title: Record<RsdLang, string>;
  tagline: Record<RsdLang, string>;
  description: Record<RsdLang, string>;
  deescalationKit: Record<RsdLang, string[]>;
  color: string;
}

export const RSD_PROFILES: Record<RsdLevel, RsdProfile> = {
  resilient: {
    level: "resilient",
    badge: {
      en: "Grounded Boundary Armor",
      id: "Perisai Emosional Kokoh",
      de: "Stabile emotionale Abgrenzung",
      fr: "Bouclier émotionnel solide",
      es: "Armadura emocional resiliente",
    },
    title: {
      en: "Secure Emotional Resilience",
      id: "Ketahanan Emosional Stabil",
      de: "Sichere emotionale Resilienz",
      fr: "Résilience émotionnelle saine",
      es: "Resiliencia emocional segura",
    },
    tagline: {
      en: "Feedback is processed as data, not as an existential threat to your identity.",
      id: "Kritik diproses sebagai data informasi, bukan ancaman terhadap harga diri.",
      de: "Feedback wird als Information verarbeitet, nicht als Bedrohung der Identität.",
      fr: "Les critiques sont traitées comme des informations, pas comme une menace vitale.",
      es: "La crítica se procesa como información útil, no como amenaza a su identidad.",
    },
    description: {
      en: "Your nervous system maintains strong self-soothing boundaries when faced with rejection or awkward social cues. You do not confuse another person's bad mood with your personal value.",
      id: "Sistem saraf Anda memiliki batas ego yang sehat. Anda mampu memisahkan antara suasana hati orang lain dengan nilai diri Anda tanpa panik.",
      de: "Ihr Nervensystem verfügt über gesunde emotionale Grenzen. Sie trennen das Verhalten anderer klar von Ihrem eigenen Selbstwert.",
      fr: "Votre système nerveux dispose de limites saines. Vous ne confondez pas l'humeur des autres avec votre valeur intrinsèque.",
      es: "Su sistema nervioso mantiene límites saludables. Sabe diferenciar el estado de los demás de su propio valor personal.",
    },
    deescalationKit: {
      en: [
        "Continue active validation rituals during stressful social negotiations.",
        "Maintain proactive voice journaling to discharge minor friction before sleep.",
        "Celebrate your grounded boundary system as a model for healthy relationships.",
      ],
      id: [
        "Lanjutkan kebiasaan validasi diri saat menghadapi situasi sosial yang menegangkan.",
        "Gunakan voice journaling rutin sebelum tidur untuk merilis sisa gesekan emosi harian.",
        "Pertahankan batasan emosional yang sehat dalam relasi kerja dan personal.",
      ],
      de: [
        "Behalten Sie Ihre gesunde Selbstvalidierung in sozialen Stresssituationen bei.",
        "Nutzen Sie abendliches Journaling, um kleine Spannungen direkt loszulassen.",
        "Schützen Sie Ihre gesunden Grenzen als Basis für erfüllende Beziehungen.",
      ],
      fr: [
        "Poursuivez vos rituels d'auto-validation lors des moments relationnels tendus.",
        "Pratiquez le journaling vocal régulier pour libérer les micro-tensions de la journée.",
        "Préservez vos limites saines pour cultiver des relations équilibrées.",
      ],
      es: [
        "Mantenga sus hábitos de autovalidación ante momentos de tensión social.",
        "Utilice el journaling de voz para liberar fricciones antes de dormir.",
        "Conserve sus límites saludables como cimiento de relaciones equilibradas.",
      ],
    },
    color: "#10B981", // Emerald
  },
  mild: {
    level: "mild",
    badge: {
      en: "Sensory Empath Vigilance",
      id: "Kewaspadaan Empati Sensorik",
      de: "Feinfühlige soziale Wachsamkeit",
      fr: "Vigilance empathique modérée",
      es: "Vigilancia empática moderada",
    },
    title: {
      en: "Mild Rejection Sensitivity",
      id: "Sensitivitas Penolakan Ringan",
      de: "Leichte Zurückweisungssensibilität",
      fr: "Sensibilité légère au rejet",
      es: "Sensibilidad leve al rechazo",
    },
    tagline: {
      en: "You register social shifts quickly, but regain equilibrium within a few hours.",
      id: "Peka terhadap perubahan sikap orang lain, namun mampu pulih dalam beberapa jam.",
      de: "Sie nehmen soziale Schwingungen schnell wahr, finden aber zügig wieder zur Ruhe.",
      fr: "Vous captez vite les changements d'ambiance, mais retrouvez votre calme en quelques heures.",
      es: "Capta rápido los cambios de humor ajenos, pero recupera la calma en pocas horas.",
    },
    description: {
      en: "You have a perceptive, empathetic nervous system. Delayed texts or lukewarm reactions occasionally trigger momentary overthinking, but you possess the cognitive tools to fact-check your catastrophic assumptions.",
      id: "Sistem saraf Anda sangat peka dan penuh empati. Balasan chat yang tertunda kadang memicu overthinking, namun Anda masih mampu meluruskan asumsi tersebut.",
      de: "Sie besitzen ein feines Gespür für Stimmungen. Späte Antworten lösen kurzzeitig Grübeln aus, doch Sie können Ihre Gedanken meist rationalisieren.",
      fr: "Votre système nerveux est réceptif et empathique. Un message sans réponse immédiate peut vous faire douter, mais vous parvenez à relativiser.",
      es: "Tiene un sistema nervioso perceptivo y empático. Un silencio temporal puede causarle dudas, pero logra reinterpretar la situación con lógica.",
    },
    deescalationKit: {
      en: [
        "The 15-Minute Reality-Check Rule: When a text triggers panic, write down 3 non-malicious reasons (they are driving, working, or tired).",
        "Name the bodily alarm: Say out loud, 'My nervous system is feeling a temporary echo of fear, but I am physically safe.'",
        "Avoid sending follow-up apology texts while your pulse is elevated.",
      ],
      id: [
        "Aturan Uji Realita 15 Menit: Tulis 3 alasan netral saat chat belum dibalas (mereka sedang menyetir, sibuk rapat, atau kelelahan).",
        "Validasi alarm tubuh: Katakan dengan tenang, 'Tubuhku merasa cemas sesaat, tapi aku saat ini aman.'",
        "Jangan mengirim chat permintaan maaf susulan saat detak jantung sedang berdebar kencang.",
      ],
      de: [
        "Die 15-Minuten-Realitätsprüfung: Notieren Sie 3 neutrale Gründe (z. B. im Verkehr, im Meeting, erschöpft).",
        "Körperalarm benennen: 'Mein Nervensystem schlägt Alarm, aber ich bin in Sicherheit.'",
        "Keine vorschnellen Entschuldigungsnachrichten senden, solange der Puls rast.",
      ],
      fr: [
        "Règle de vérification de 15 minutes : Notez 3 explications neutres (au volant, en réunion, batterie faible).",
        "Nommez la réaction corporelle : 'Mon système nerveux ressent une alerte, mais je suis en sécurité.'",
        "Ne renvoyez pas de message d'excuse tant que votre rythme cardiaque n'est pas apaisé.",
      ],
      es: [
        "Regla de 15 minutos: Anote 3 motivos neutros (conduciendo, en reunión de trabajo o agotado).",
        "Nombre la alarma física: 'Mi cuerpo siente una alerta temporal, pero estoy a salvo.'",
        "Evite enviar disculpas compulsivas mientras tenga taquicardia.",
      ],
    },
    color: "#3B82F6", // Blue
  },
  moderate: {
    level: "moderate",
    badge: {
      en: "Acute Criticism Wound",
      id: "Luka Sensitivitas Kritik",
      de: "Erhöhte Kritikempfindlichkeit",
      fr: "Sensibilité aiguë à la critique",
      es: "Sensibilidad aguda a la crítica",
    },
    title: {
      en: "Moderate Rejection Sensitivity (RSD)",
      id: "RSD Sensitivitas Sedang",
      de: "Mittelschwere Zurückweisungssensibilität (RSD)",
      fr: "Sensibilité au rejet marquée (RSD)",
      es: "Sensibilidad al rechazo marcada (RSD)",
    },
    tagline: {
      en: "Perceived criticism feels like physical pain, driving defensive withdrawal or perfectionism.",
      id: "Kritik kecil terasa seperti luka fisik, mendorong penarikan diri atau perfeksionisme ekstrem.",
      de: "Kritik schmerzt körperlich und führt zu Rückzug oder getriebenem Perfektionismus.",
      fr: "La critique fait mal physiquement, provoquant repli sur soi ou perfectionnisme épuisant.",
      es: "La crítica se experimenta como dolor físico, motivando aislamiento o perfeccionismo agotador.",
    },
    description: {
      en: "Your anterior cingulate cortex registers social evaluation with intense neurochemical distress. Even minor feedback or ambiguous body language sparks gut-wrenching shame, prompting you to people-please or abruptly retreat into isolation.",
      id: "Otak Anda memproses evaluasi sosial dengan rasa sakit yang sangat nyata. Masukan kecil atau bahasa tubuh yang dingin langsung memicu rasa malu mendalam, membuat Anda ingin membela diri atau menjauh.",
      de: "Ihr Gehirn verarbeitet Kritik mit starkem emotionalem Schmerz. Unklare Reaktionen wecken intensive Scham, was oft in People-Pleasing oder plötzliche Isolation mündet.",
      fr: "Votre cerveau traite l'évaluation d'autrui avec une intensité douloureuse. Un retour mitigé déclenche une honte viscérale, menant au repli ou au surinvestissement.",
      es: "Su cerebro procesa la crítica con una angustia física real. Un gesto ambiguo desata una intensa vergüenza, impulsando el servilismo o la retirada abrupta.",
    },
    deescalationKit: {
      en: [
        "Cold Water Dive Reflex: Splash ice water on your eyes and cheeks for 30 seconds to stimulate the vagal nerve brake and interrupt the adrenaline dump.",
        "Separate Fact from Story: Divide a page into 'What Actually Happened' vs 'What My Anxious Brain Is Telling Me'.",
        "Somatic Grounding: Practice the 5-4-3-2-1 Sensory Lab before reacting to difficult emails or messages.",
      ],
      id: [
        "Refleks Air Dingin (Mammalian Dive Reflex): Basuh wajah dengan air es selama 30 detik untuk mengaktifkan rem saraf vagus dan memotong lonjakan adrenalin.",
        "Pisahkan Fakta vs Cerita Fiksi: Tulis di kertas dua kolom: 'Apa yang Benar-Benar Terjadi' vs 'Apa yang Dikarang oleh Rasa Cemas Saya'.",
        "Latihan Grounding Somatik: Buka Laboratorium 5-4-3-2-1 sebelum membalas pesan yang membuat Anda tertekan.",
      ],
      de: [
        "Tauchreflex mit kaltem Wasser: Gesicht 30 Sekunden mit Eiswasser benetzen, um den Vagusnerv zu bremsen.",
        "Fakt von Fiktion trennen: Schreiben Sie auf: 'Was ist wirklich passiert?' vs. 'Was redet mir meine Angst ein?'.",
        "Somatisches Grounding: Nutzen Sie die 5-4-3-2-1 Übung, bevor Sie auf schwierige Nachrichten reagieren.",
      ],
      fr: [
        "Réflexe d'immersion à l'eau froide : Aspergez votre visage d'eau glacée 30 secondes pour calmer l'adrénaline via le nerf vague.",
        "Distinguer faits et fictions : Deux colonnes sur une feuille : 'Ce qui s'est réellement passé' vs 'Ce que mon anxiété imagine'.",
        "Ancrage sensoriel : Lancez l'exercice 5-4-3-2-1 avant de répondre à un message délicat.",
      ],
      es: [
        "Reflejo de inmersión con agua fría: Lave su rostro con agua helada durante 30 segundos para frenar la adrenalina mediante el nervio vago.",
        "Separar hechos de historias: Divida una hoja en 'Lo que ocurrió realmente' vs 'Lo que mi mente ansiosa inventa'.",
        "Anclaje sensorial: Realice el ejercicio 5-4-3-2-1 antes de responder a un mensaje difícil.",
      ],
    },
    color: "#F59E0B", // Amber
  },
  intense: {
    level: "intense",
    badge: {
      en: "Severe Dysregulation Storm",
      id: "Badai Disregulasi Ekstrem",
      de: "Schwere RSD & Emotionale Dysregulation",
      fr: "Tempête de dysrégulation sévère",
      es: "Tormenta de disregulación severa",
    },
    title: {
      en: "Severe Rejection Sensitive Dysphoria (RSD)",
      id: "RSD & Disregulasi Emosi Akut",
      de: "Akute Rejection Sensitive Dysphoria",
      fr: "Dysphorie Sensible au Rejet Aiguë (RSD)",
      es: "Disforia Sensible al Rechazo Aguda (RSD)",
    },
    tagline: {
      en: "Catastrophic emotional pain so severe it can trigger rage, panic, or complete shutdown.",
      id: "Rasa sakit emosional yang luar biasa hebat hingga dapat memicu amarah, panik, atau mati rasa total.",
      de: "Extremer seelischer Schmerz, der in Wutausbrüche, Panik oder völlige Erstarrung umschlagen kann.",
      fr: "Une douleur émotionnelle si fulgurante qu'elle peut provoquer colère noire, panique ou dissociation.",
      es: "Un dolor emocional tan desbordante que puede desencadenar rabia, pánico o parálisis total.",
    },
    description: {
      en: "You experience textbook Rejection Sensitive Dysphoria, common in neurodivergent and ADHD brains. An ambiguous comment or minor rejection feels like a catastrophic emotional trauma. You may oscillate between volcanic internal rage, deep despair, and preemptively abandoning relationships before anyone can hurt you.",
      id: "Anda mengalami Rejection Sensitive Dysphoria (RSD) akut, kondisi umum pada otak neurodivergen/ADHD. Kritik kecil terasa seperti luka trauma batin yang menghancurkan. Anda mungkin bergantian antara kemarahan tertahan, keputusasaan, dan dorongan memutus hubungan secara tiba-tiba.",
      de: "Sie erleben klassische Rejection Sensitive Dysphoria (RSD), wie sie häufig bei ADHS und Hochsensibilität vorkommt. Ablehnung fühlt sich vernichtend an. Oft schwanken Sie zwischen innerer Wut, tiefer Verzweiflung und präventivem Kontaktabbruch.",
      fr: "Vous traversez une Dysphorie Sensible au Rejet (RSD) aiguë, fréquente chez les profils TDAH ou neuroatypiques. Le moindre rejet est vécu comme une blessure dévastatrice, alternant entre rage sourde, détresse et abandon préventif de vos liens.",
      es: "Experimenta una Disforia Sensible al Rechazo (RSD) severa, habitual en mentes con TDAH o neurodivergencia. Cualquier rechazo se siente como un trauma desgarrador, alternando entre ira interna, desesperanza y ruptura preventiva de vínculos.",
    },
    deescalationKit: {
      en: [
        "Full Stop Protocol: Enforce a strict 24-hour moratorium on sending emails, making relationship decisions, or resigning when RSD is triggered.",
        "Bilateral Tapping / EMDR: Engage alternating physical bilateral taps on knees or shoulders to discharge sympathetic fight-or-flight energy.",
        "Safe Disclosure: Share with trusted loved ones: 'I have a neurobiological trait called RSD. When I hear criticism, my body hurts physically. Give me 30 minutes to reset before we talk.'",
      ],
      id: [
        "Protokol Gencatan Senjata 24 Jam: Terapkan jeda 24 jam sebelum membalas email, membuat keputusan asmara, atau resign saat tersulut badai emosi.",
        "Stimulasi Bilateral Somatik: Lakukan ketukan bergantian di lutut atau bahu (metode EMDR) untuk membuang kelebihan energi panik fight-or-flight.",
        "Komunikasi Edukatif: Katakan pada pasangan/rekan tepercaya: 'Sistem saraf saya memiliki sensitivitas RSD. Beri saya waktu tenang 30 menit agar tubuh saya rileks sebelum kita bicara.'",
      ],
      de: [
        "24-Stunden-Moratorium: Treffen Sie bei akuter RSD-Auslösung 24 Stunden lang keine Beziehungs- oder Berufsentscheidungen.",
        "Bilaterale Stimulation / EMDR: Nutzen Sie wechselseitiges Klopfen auf Knie oder Schultern, um das Alarmsystem zu entladen.",
        "Offene Klärung: Sagen Sie Vertrauten: 'Mein Nervensystem reagiert auf Kritik mit körperlichem Schmerz. Gebt mir 30 Minuten zum Regulieren.'",
      ],
      fr: [
        "Moratoire absolu de 24 heures : N'envoyez aucun message impulsif et ne prenez aucune décision relationnelle sous le coup de la crise.",
        "Stimulation bilatérale EMDR : Tapotez alternativement vos genoux ou épaules pour évacuer la panique du système nerveux.",
        "Communication protectrice : Expliquez à vos proches : 'Mon système nerveux amplifie la critique. Laissez-moi 30 minutes au calme avant d'en parler.'",
      ],
      es: [
        "Moratoria de 24 horas: No tome decisiones de ruptura ni envíe mensajes impulsivos durante el pico de activación de la RSD.",
        "Estimulación bilateral EMDR: Realice golpeteos alternados en rodillas u hombros para descargar la adrenalina de lucha o huida.",
        "Comunicación asertiva: Diga a sus seres queridos: 'Mi sistema nervioso experimenta dolor físico ante la crítica. Denme 30 minutos para regularme antes de hablar.'",
      ],
    },
    color: "#EF4444", // Red
  },
};

export interface RsdScoreResult {
  totalScore: number;
  maxScore: number;
  percentage: number;
  level: RsdLevel;
  profile: RsdProfile;
  subscales: {
    vigilance: { score: number; max: number; percentage: number };
    criticism: { score: number; max: number; percentage: number };
    catastrophizing: { score: number; max: number; percentage: number };
  };
}

export function calculateRsdScore(answers: Record<number, number>): RsdScoreResult {
  let totalScore = 0;
  let vigilanceScore = 0;
  let criticismScore = 0;
  let catastrophizingScore = 0;

  RSD_QUESTIONS.forEach((q) => {
    const val = answers[q.id] ?? 0;
    totalScore += val;
    if (q.dimension === "vigilance") vigilanceScore += val;
    if (q.dimension === "criticism") criticismScore += val;
    if (q.dimension === "catastrophizing") catastrophizingScore += val;
  });

  const maxScore = RSD_QUESTIONS.length * 3; // 36
  const percentage = Math.round((totalScore / maxScore) * 100);

  let level: RsdLevel = "resilient";
  if (totalScore >= 28) {
    level = "intense";
  } else if (totalScore >= 19) {
    level = "moderate";
  } else if (totalScore >= 10) {
    level = "mild";
  } else {
    level = "resilient";
  }

  const profile = RSD_PROFILES[level];

  return {
    totalScore,
    maxScore,
    percentage,
    level,
    profile,
    subscales: {
      vigilance: {
        score: vigilanceScore,
        max: 12,
        percentage: Math.round((vigilanceScore / 12) * 100),
      },
      criticism: {
        score: criticismScore,
        max: 12,
        percentage: Math.round((criticismScore / 12) * 100),
      },
      catastrophizing: {
        score: catastrophizingScore,
        max: 12,
        percentage: Math.round((catastrophizingScore / 12) * 100),
      },
    },
  };
}
