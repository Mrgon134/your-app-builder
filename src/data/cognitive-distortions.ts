export type CbtLang = "en" | "id" | "de" | "fr" | "es";

export type DistortionType =
  | "catastrophizing"
  | "all_or_nothing"
  | "mind_reading"
  | "emotional_reasoning"
  | "should_statements"
  | "mental_filter"
  | "fortune_telling"
  | "personalization"
  | "discounting_positive"
  | "labeling";

export interface DistortionInfo {
  id: DistortionType;
  badge: Record<CbtLang, string>;
  title: Record<CbtLang, string>;
  tagline: Record<CbtLang, string>;
  definition: Record<CbtLang, string>;
  reframeFormula: Record<CbtLang, string>;
  cbtThoughtRecord: Record<CbtLang, { trigger: string; automaticThought: string; rationalAlternative: string }>;
  color: string;
}

export interface CbtScenario {
  id: number;
  distortion: DistortionType;
  scenario: Record<CbtLang, string>;
  thought: Record<CbtLang, string>;
}

export const CBT_DISTORTIONS: Record<DistortionType, DistortionInfo> = {
  catastrophizing: {
    id: "catastrophizing",
    badge: {
      en: "Worst-Case Spiral",
      id: "Spiral Skenario Terburuk",
      de: "Worst-Case-Spirale",
      fr: "Spirale du pire scénario",
      es: "Espiral del peor escenario",
    },
    title: {
      en: "Catastrophizing (Magnification)",
      id: "Katastrofikasi (Membesarkan Masalah)",
      de: "Katastrophisieren (Vergrößerung)",
      fr: "Catastrophisation (Dramatisation)",
      es: "Catastrofización (Magnificación)",
    },
    tagline: {
      en: "Treating a single setback as the start of an irreversible total collapse.",
      id: "Menganggap satu hambatan kecil sebagai awal dari kehancuran total hidup.",
      de: "Ein einzelnes Hindernis als Beginn des unvermeidlichen Untergangs deuten.",
      fr: "Traiter un simple contretemps comme le début d'un effondrement irréversible.",
      es: "Interpretar un tropiezo menor como el comienzo de una ruina total e inevitable.",
    },
    definition: {
      en: "Catastrophizing occurs when your anxious brain leaps past statistical probability straight to the most devastating possible outcome, treating worst-case nightmares as imminent certainties.",
      id: "Katastrofikasi terjadi saat amigdala melompati probabilitas logis dan langsung membayangkan skenario paling hancur seolah-olah itu pasti terjadi dalam waktu dekat.",
      de: "Katastrophisieren tritt auf, wenn das Gehirn reale Wahrscheinlichkeiten ignoriert und direkt das schlimmstmögliche Horrorszenario als sicher annimmt.",
      fr: "La catastrophisation pousse le cerveau à ignorer les probabilités réelles pour sauter immédiatement vers l'issue la plus dramatique possible.",
      es: "Ocurre cuando la mente ansiosa ignora las probabilidades estadísticas y salta directamente al peor desenlace posible como si fuera inevitable.",
    },
    reframeFormula: {
      en: "Ask: 'What is the absolute worst that could happen? What is the best that could happen? What is the realistic middle ground?'",
      id: "Tanyakan pada diri: 'Apa skenario terburuknya? Apa skenario terbaiknya? Dan apa kemungkinan realistis di tengah-tengahnya?'",
      de: "Fragen Sie: 'Was ist das Schlimmste, was passieren kann? Was das Beste? Und was ist das realistische Mittelmaß?'",
      fr: "Demandez-vous : 'Quel est le pire qui puisse arriver ? Le meilleur ? Et le juste milieu le plus réaliste ?'",
      es: "Pregúntese: '¿Qué es lo peor que puede pasar? ¿Qué es lo mejor? ¿Y cuál es el punto medio más probable?'",
    },
    cbtThoughtRecord: {
      en: {
        trigger: "Boss emails: 'Do you have 5 minutes for a quick chat tomorrow morning?'",
        automaticThought: "I'm getting fired. I won't be able to pay rent. My career is completely ruined.",
        rationalAlternative: "Managers check in for hundreds of routine reasons. Even if there is feedback, it is an adjustment, not an instant termination.",
      },
      id: {
        trigger: "Atasan mengirim pesan: 'Bisa ngobrol 5 menit besok pagi?'",
        automaticThought: "Aku pasti mau dipecat. Karirku hancur dan aku tidak bisa bayar cicilan.",
        rationalAlternative: "Atasan sering mengajak diskusi untuk hal rutin. Sekalipun ada masukan, itu untuk perbaikan kerja, bukan pemecatan mendadak.",
      },
      de: {
        trigger: "Chef schreibt: 'Hast du morgen früh 5 Minuten Zeit für ein kurzes Gespräch?'",
        automaticThought: "Ich werde gefeuert. Meine Karriere ist ruiniert.",
        rationalAlternative: "Kurze Check-ins sind normal. Selbst wenn es Kritik gibt, ist das eine Anpassung, keine Entlassung.",
      },
      fr: {
        trigger: "Le manager écrit : 'As-tu 5 minutes pour échanger demain matin ?'",
        automaticThought: "Je vais être licencié(e). Ma carrière est anéantie.",
        rationalAlternative: "Les points rapides sont monnaie courante. Même s'il s'agit d'un recadrage, ce n'est pas un licenciement.",
      },
      es: {
        trigger: "El jefe escribe: '¿Tienes 5 minutos para hablar mañana?'",
        automaticThought: "Me van a despedir. Mi carrera está acabada.",
        rationalAlternative: "Las reuniones breves son habituales. Incluso si es para corregir algo, se trata de una mejora, no de un despido.",
      },
    },
    color: "#EF4444",
  },
  all_or_nothing: {
    id: "all_or_nothing",
    badge: {
      en: "Black & White Lens",
      id: "Pola Pikir Hitam-Putih",
      de: "Schwarz-Weiß-Denken",
      fr: "Pensée tout-ou-rien",
      es: "Pensamiento todo o nada",
    },
    title: {
      en: "All-or-Nothing Thinking (Dichotomous)",
      id: "Pemikiran Hitam-Putih (Semua atau Tidak Sama Sekali)",
      de: "Alles-oder-Nichts-Denken (Dichotom)",
      fr: "Pensée en Tout ou Rien (Binaire)",
      es: "Pensamiento Todo o Nada (Dicotómico)",
    },
    tagline: {
      en: "Viewing outcomes as either flawless perfection or complete, utter failure.",
      id: "Melihat hasil hanya dalam dua kutub: kesempurnaan mutlak atau kegagalan total.",
      de: "Dinge entweder als makellosen Erfolg oder als totalen Reinfall bewerten.",
      fr: "Voir les situations uniquement comme une réussite parfaite ou un échec cuisant.",
      es: "Juzgar las situaciones como una perfección absoluta o un fracaso devastador.",
    },
    definition: {
      en: "You view life in absolute binaries without shades of grey. If you deviate from your strict diet, you declare the entire month ruined and binge. If a presentation wasn't flawless, you deem it a disaster.",
      id: "Anda melihat dunia tanpa warna abu-abu. Jika melewatkan satu hari diet, Anda merasa seluruh usaha sebulan hancur. Jika pekerjaan tidak sempurna 100%, Anda merasa itu sampah.",
      de: "Sie denken in Extremen. Eine kleine Abweichung vom Plan wird als totaler Fehlschlag gewertet, als gäbe es keine Grautöne.",
      fr: "Vous classez vos expériences sans nuance : un petit écart de régime gâche tout le mois, un projet imparfait devient un désastre.",
      es: "Divide su vida en extremos rígidos. Si comete un error en su rutina, da por perdido todo el esfuerzo anterior.",
    },
    reframeFormula: {
      en: "Replace 'Either / Or' with 'Both / And'. Say: 'This effort was 80% effective, with 20% room to iterate.'",
      id: "Ganti kata 'Gagal Total' dengan skala kontinum: 'Hasil ini 80% berjalan baik, dan 20% sisanya bisa diperbaiki bertahap.'",
      de: "Ersetzen Sie 'Entweder / Oder' durch ein Spektrum: 'Das war zu 80 % solide und zu 20 % verbesserungsfähig.'",
      fr: "Passez du binaire au continuum : 'Ce travail était réussi à 80 %, avec 20 % de points d'amélioration.'",
      es: "Cambie los términos absolutos por una escala: 'Esto fue un 80% efectivo y hay un 20% que puedo pulir después.'",
    },
    cbtThoughtRecord: {
      en: {
        trigger: "I ate a slice of chocolate cake while on a healthy diet.",
        automaticThought: "I blew it. I have zero willpower. I might as well finish the entire cake.",
        rationalAlternative: "One slice of cake is just 300 calories in a week of 15,000 calories. My healthy habits remain intact.",
      },
      id: {
        trigger: "Makan sepotong kue cokelat saat sedang menjalani pola makan sehat.",
        automaticThought: "Dietku gagal total. Aku memang tidak punya disiplin. Mending kuhabiskan semuanya sekalian.",
        rationalAlternative: "Satu potong kue hanya bagian kecil dari ratusan makanan sehat minggu ini. Konsistensi tidak butuh kesempurnaan.",
      },
      de: {
        trigger: "Ein Stück Kuchen während einer Diät gegessen.",
        automaticThought: "Alles ruiniert. Ich habe keine Selbstdisziplin.",
        rationalAlternative: "Ein Stück Kuchen macht Wochen gesunder Ernährung nicht zunichte. Ich mache einfach normal weiter.",
      },
      fr: {
        trigger: "Manger une part de gâteau au cours d'un rééquilibrage alimentaire.",
        automaticThought: "J'ai tout gâché, je n'ai aucune volonté, autant tout abandonner.",
        rationalAlternative: "Un écart isolé ne détruit pas des semaines d'efforts. Mon équilibre général reste préservé.",
      },
      es: {
        trigger: "Comer un trozo de pastel durante una dieta saludable.",
        automaticThought: "Lo arruiné todo. No tengo fuerza de voluntad. Mejor como todo lo que haya.",
        rationalAlternative: "Un dulce no destruye semanas de hábitos saludables. Sigo adelante con mi siguiente comida sana.",
      },
    },
    color: "#8B5CF6",
  },
  mind_reading: {
    id: "mind_reading",
    badge: {
      en: "Telepathic Projection",
      id: "Proyeksi Baca Pikiran",
      de: "Gedankenlesen-Falle",
      fr: "Lecture de pensée anxieuse",
      es: "Lectura de pensamiento",
    },
    title: {
      en: "Mind Reading (Arbitrary Inference)",
      id: "Membaca Pikiran Orang Lain (Asumsi Tanpa Bukti)",
      de: "Gedankenlesen (Willkürliche Schlussfolgerung)",
      fr: "Lecture de Pensée (Inférence Arbitraire)",
      es: "Lectura de Pensamiento (Inferencia Arbitraria)",
    },
    tagline: {
      en: "Convinced you know what others think about you, and assuming it's always negative.",
      id: "Yakin tahu isi kepala orang lain, dan selalu berasumsi bahwa mereka sedang menilai Anda buruk.",
      de: "Fest davon überzeugt sein, die negativen Gedanken anderer über einen zu kennen.",
      fr: "Être certain(e) de deviner les pensées d'autrui, et présumer qu'elles sont toujours hostiles.",
      es: "Estar convencido de saber lo que otros piensan de usted, asumiendo siempre lo peor.",
    },
    definition: {
      en: "You conclude that someone is reacting negatively to you without bothering to check whether your assumption is based on factual evidence or your internal projection.",
      id: "Anda menarik kesimpulan sepihak bahwa seseorang membenci atau meremehkan Anda, tanpa memeriksa apakah ada bukti nyata atau hanya ilusi ketakutan Anda sendiri.",
      de: "Sie gehen felsenfest davon aus, dass andere negativ über Sie urteilen, ohne je nach Beweisen zu fragen.",
      fr: "Vous concluez que quelqu'un vous juge sévèrement, sans vérifier si cela repose sur des faits ou sur vos propres insécurités.",
      es: "Da por hecho que los demás le juzgan o desprecian, sin pararse a contrastar los hechos reales.",
    },
    reframeFormula: {
      en: "Remind yourself: 'I am not a psychic. What observable, courtroom-admissible evidence do I have for this thought?'",
      id: "Ingatkan diri: 'Aku bukan peramal pikiran. Bukti fisik dan nyata apa yang benar-benar ada di dunia nyata?'",
      de: "Fragen Sie sich: 'Bin ich Telepath? Welche handfesten Beweise habe ich wirklich für diese Annahme?'",
      fr: "Rappelez-vous : 'Je ne suis pas télépathe. Quelles preuves tangibles et vérifiables ai-je réellement ?'",
      es: "Dígase: 'No leo la mente. ¿Qué pruebas objetivas y comprobables tengo de lo que esa persona piensa?'",
    },
    cbtThoughtRecord: {
      en: {
        trigger: "A friend didn't make eye contact while passing in the hallway.",
        automaticThought: "They hate me. I must have said something offensive last week.",
        rationalAlternative: "They were looking down at their phone, lost in their own stress or running late for a meeting.",
      },
      id: {
        trigger: "Teman berpapasan di lorong tanpa menyapa atau menatap mata.",
        automaticThought: "Dia benci sama aku. Pasti ucapanku minggu lalu menyinggung perasaannya.",
        rationalAlternative: "Bisa jadi dia sedang terburu-buru, melamunkan masalahnya sendiri, atau sedang cemas akan hal lain.",
      },
      de: {
        trigger: "Ein Kollege grüßt auf dem Flur nur flüchtig ohne Blickkontakt.",
        automaticThought: "Er kann mich nicht leiden. Ich habe bestimmt etwas Falsches gesagt.",
        rationalAlternative: "Er war wahrscheinlich in Gedanken versunken, gestresst oder auf dem Weg zu einem wichtigen Termin.",
      },
      fr: {
        trigger: "Un ami passe sans croiser le regard dans le couloir.",
        automaticThought: "Il m'en veut. J'ai forcément dit quelque chose de déplacé récemment.",
        rationalAlternative: "Il était probablement préoccupé par ses propres soucis, fatigué ou pressé.",
      },
      es: {
        trigger: "Un conocido pasa por el pasillo sin mirarme a los ojos.",
        automaticThought: "Le caigo mal. Seguro dije algo inapropiado en la última conversación.",
        rationalAlternative: "Probablemente iba distraído con sus propios asuntos o tenía prisa para entrar a una cita.",
      },
    },
    color: "#EC4899",
  },
  emotional_reasoning: {
    id: "emotional_reasoning",
    badge: {
      en: "Feelings = Facts Illusion",
      id: "Ilusi Perasaan Jadi Kenyataan",
      de: "Gefühlslogik-Falle",
      fr: "Confusion émotion-réalité",
      es: "Razonamiento emocional",
    },
    title: {
      en: "Emotional Reasoning",
      id: "Penalaran Emosional (Emotional Reasoning)",
      de: "Emotionale Beweisführung (Emotional Reasoning)",
      fr: "Raisonnement Émotionnel",
      es: "Razonamiento Emocional",
    },
    tagline: {
      en: "Assuming that because you feel terrified or inadequate, it must objectively be true.",
      id: "Menganggap bahwa jika Anda merasa cemas atau gagal, maka kenyataannya memang demikian.",
      de: "Annehmen, dass ein Gefühl von Minderwertigkeit automatisch die objektive Wahrheit widerspiegelt.",
      fr: "Croire que parce qu'on se sent incompétent(e) ou menacé(e), cela correspond à la réalité.",
      es: "Creer que por sentirse inseguro o culpable, la realidad objetiva confirma ese sentimiento.",
    },
    definition: {
      en: "You take your emotions as evidence for objective reality: 'I feel like a fraud, therefore I must be an imposter.' 'I feel overwhelmed, therefore this challenge is impossible.'",
      id: "Menjadikan perasaan internal sebagai bukti kebenaran dunia luar: 'Karena aku merasa bodoh, berarti aku memang tidak kompeten.' Perasaan adalah reaksi kimia tubuh, bukan fakta pengadilan.",
      de: "Sie verwechseln Gefühle mit Fakten: 'Ich fühle mich unfähig, also bin ich es.' Gefühle sind jedoch neurochemische Signale, keine objektiven Wahrheiten.",
      fr: "Vous prenez votre ressenti pour une vérité incontestable : 'Je me sens coupable, donc j'ai mal agi.' Les émotions sont des signaux, pas des faits.",
      es: "Confunde emociones con hechos comprobados: 'Me siento incapaz, luego no sirvo para esto.' Las emociones son estados transitorios, no veredictos.",
    },
    reframeFormula: {
      en: "Affirm: 'A feeling is a weather pattern, not a forecast of reality. Just because I feel scared does not mean I am in danger.'",
      id: "Ucapkan: 'Perasaan adalah cuaca sementara, bukan fakta permanen. Merasa cemas bukan berarti situasinya benar-benar berbahaya.'",
      de: "Sagen Sie sich: 'Ein Gefühl ist wie das Wetter, keine Tatsache. Nur weil ich Angst spüre, bin ich nicht in Gefahr.'",
      fr: "Formule clé : 'Une émotion est une météo intérieure, pas un fait objectif. Avoir peur ne signifie pas être en danger.'",
      es: "Recuerde: 'Un sentimiento es un estado corporal pasajero, no un hecho. Sentir miedo no significa estar en peligro real.'",
    },
    cbtThoughtRecord: {
      en: {
        trigger: "Starting a new project with experienced colleagues.",
        automaticThought: "I feel so anxious and stupid, so everyone will inevitably realize I don't belong here.",
        rationalAlternative: "Anxiety is simply my brain adjusting to a learning curve. My track record and skills earned me this position.",
      },
      id: {
        trigger: "Memulai tugas baru di hadapan rekan-rekan senior.",
        automaticThought: "Aku merasa gugup dan bodoh, artinya aku memang tidak pantas berada di posisi ini.",
        rationalAlternative: "Rasa gugup adalah respons wajar terhadap hal baru. Riwayat pencapaian dan keahliankualah yang membawaku ke sini.",
      },
      de: {
        trigger: "Beginn eines anspruchsvollen Projekts im Team.",
        automaticThought: "Ich fühle mich überfordert, also bin ich der Aufgabe nicht gewachsen.",
        rationalAlternative: "Nervosität ist eine normale Reaktion auf Neues. Meine Qualifikationen sprechen für sich.",
      },
      fr: {
        trigger: "Prise en charge d'un nouveau dossier complexe.",
        automaticThought: "Je me sens dépassé(e), donc je ne suis pas à la hauteur.",
        rationalAlternative: "L'appréhension accompagne tout apprentissage. Mes compétences et mon parcours légitiment ma place.",
      },
      es: {
        trigger: "Liderar una iniciativa nueva con compañeros experimentados.",
        automaticThought: "Me siento inseguro, por tanto no tengo la capacidad para este rol.",
        rationalAlternative: "Sentir incertidumbre es natural ante un reto. Mis competencias pasadas justifican que esté aquí.",
      },
    },
    color: "#F59E0B",
  },
  should_statements: {
    id: "should_statements",
    badge: {
      en: "Moralistic Tyranny",
      id: "Tirani Keharusan (Should)",
      de: "Sollte-Muss-Tyrannei",
      fr: "Tyrannie des 'Je dois'",
      es: "Tiranía del 'Debería'",
    },
    title: {
      en: "'Should' and 'Must' Statements",
      id: "Jebakan Kata 'Harus' dan 'Mestinya' (Should Statements)",
      de: "'Ich muss / sollte'-Glaubenssätze",
      fr: "Injonctions Rigides ('Je devrais')",
      es: "Exigencias Rígidas ('Debería' y 'Tengo que')",
    },
    tagline: {
      en: "Whipping yourself with guilt through impossible, rigid perfectionist rules.",
      id: "Menghukum diri sendiri dengan rasa bersalah melalui aturan hidup yang tidak realistis.",
      de: "Sich selbst mit starren Erwartungen unter Druck setzen und mit Schuldgefühlen peitschen.",
      fr: "S'infliger une culpabilité permanente à coups d'exigences rigides et irréalistes.",
      es: "Castigarse con culpa constante mediante reglas rígidas e imposibles de cumplir.",
    },
    definition: {
      en: "You attempt to motivate yourself with 'shoulds', 'musts', and 'oughts'. When applied to yourself, it results in chronic guilt and inadequacy. When applied to others, it sparks bitter resentment.",
      id: "Anda memotivasi diri dengan kata 'harus' dan 'mestinya': 'Aku harus selalu produktif', 'Aku tidak boleh lelah'. Saat diarahkan ke diri sendiri menghasilkan rasa bersalah; saat diarahkan ke orang lain menghasilkan kemarahan.",
      de: "Sie versuchen sich mit 'Ich müsste' und 'Ich sollte' anzutreiben. Das führt zu permanenter Unzufriedenheit oder Frust über andere, die sich nicht an Ihre Regeln halten.",
      fr: "Vous vous motivez par la contrainte ('Je devrais être parfait', 'Il ne faut jamais fléchir'), ce qui engendre culpabilité et amertume envers autrui.",
      es: "Se exige mediante imperativos absolutistas ('Debería ser más fuerte', 'No debería cansarme'). Esto genera culpa crónica o rencor hacia los demás.",
    },
    reframeFormula: {
      en: "Replace 'I must / I should' with 'I prefer / It would be nice if, but it is okay that I am human.'",
      id: "Ganti kata 'Aku harus' dengan 'Aku memilih' atau 'Akan lebih baik jika..., namun tidak apa-apa aku manusia biasa.'",
      de: "Ersetzen Sie 'Ich muss' durch 'Ich möchte' oder 'Es wäre schön, aber ich darf menschlich sein.'",
      fr: "Remplacez 'Je dois' par 'Je préfère' ou 'J'aimerais bien, mais j'ai le droit d'être humain.'",
      es: "Cambie 'Tengo que' por 'Elijo' o 'Sería ideal, pero acepto mis límites humanos.'",
    },
    cbtThoughtRecord: {
      en: {
        trigger: "Taking a nap on a Sunday afternoon instead of cleaning the house.",
        automaticThought: "I should never waste time. I must always be productive. I am so lazy.",
        rationalAlternative: "Rest is a biological requirement, not a moral failure. Recharging now allows me to focus better tomorrow.",
      },
      id: {
        trigger: "Tidur siang di hari Minggu alih-alih membersihkan seluruh rumah.",
        automaticThought: "Aku mestinya tidak buang-buang waktu. Aku harus selalu produktif. Aku pemalas.",
        rationalAlternative: "Istirahat adalah kebutuhan biologis mendasar, bukan kegagalan moral. Memulihkan energi membuatku lebih sehat.",
      },
      de: {
        trigger: "Ein Mittagsschlaf am Sonntag anstatt die Wohnung zu putzen.",
        automaticThought: "Ich sollte nicht faul sein. Ich muss immer etwas Sinnvolles tun.",
        rationalAlternative: "Erholung ist ein biologisches Grundbedürfnis, kein Verbrechen. Ruhe tanken ist produktiv.",
      },
      fr: {
        trigger: "Faire une sieste le dimanche après-midi au lieu de faire le ménage.",
        automaticThought: "Je devrais être actif(ve). Je ne dois pas paresser ainsi.",
        rationalAlternative: "Le repos est un besoin vital, pas une faute morale. Recharger mes batteries est salutaire.",
      },
      es: {
        trigger: "Dormir la siesta el domingo en lugar de limpiar la casa.",
        automaticThought: "Debería ser más productivo. No tengo derecho a holgazanear.",
        rationalAlternative: "El descanso es una necesidad fisiológica, no una debilidad moral. Recuperar energía es saludable.",
      },
    },
    color: "#3B82F6",
  },
  mental_filter: {
    id: "mental_filter",
    badge: {
      en: "Drop of Ink Lens",
      id: "Lensa Tinta Hitam",
      de: "Negativfilter",
      fr: "Filtre négatif sélectif",
      es: "Filtro mental selectivo",
    },
    title: {
      en: "Mental Filter (Selective Abstraction)",
      id: "Filter Mental (Fokus Eksklusif pada Hal Negatif)",
      de: "Mentaler Filter (Selektive Wahrnehmung)",
      fr: "Filtre Mental (Abstraction Sélective)",
      es: "Filtro Mental (Abstracción Selectiva)",
    },
    tagline: {
      en: "Fixating on a single negative detail until your entire worldview is tainted dark.",
      id: "Terpaku pada satu detail buruk hingga melupakan puluhan hal baik yang terjadi.",
      de: "Sich an einem einzigen negativen Detail festbeißen, bis alles düster erscheint.",
      fr: "Focaliser sur un seul détail négatif au point d'en oublier tout le reste.",
      es: "Centrarse en un único aspecto negativo hasta oscurecer toda la experiencia.",
    },
    definition: {
      en: "Like a drop of ink discoloring an entire beaker of water, you dwell on one criticism or misstep, completely filtering out all positive achievements and compliments.",
      id: "Seperti setetes tinta yang menghitamkan segelas air, Anda terpaku pada satu kritik kecil dan menghapus semua apresiasi positif yang sudah diterima.",
      de: "Wie ein Tropfen Tinte das ganze Wasser färbt, zieht ein winziger Kritikpunkt Ihre gesamte Wahrnehmung ins Negative.",
      fr: "Comme une goutte d'encre teintant un verre d'eau, une micro-remarque négative efface tous les compliments reçus.",
      es: "Como una gota de tinta en un vaso de agua, una pequeña objeción nubla todos los elogios y logros cosechados.",
    },
    reframeFormula: {
      en: "Zoom out: 'What are 3 specific positive aspects of this experience that my brain is currently screening out?'",
      id: "Perlebar sudut pandang: 'Sebutkan 3 hal positif nyata yang saat ini sedang diabaikan oleh rasa cemas saya.'",
      de: "Blickwinkel weiten: 'Welche 3 positiven Aspekte blendet mein Verstand gerade aus?'",
      fr: "Élargir la perspective : 'Quels sont les 3 aspects positifs que mon cerveau occulte en ce moment ?'",
      es: "Ampliar la mirada: '¿Cuáles son 3 elementos positivos concretos que mi mente está ignorando ahora mismo?'",
    },
    cbtThoughtRecord: {
      en: {
        trigger: "Received 19 stellar reviews on a project and 1 mildly critical suggestion.",
        automaticThought: "The whole project was a joke. People only noticed the flaw.",
        rationalAlternative: "95% of people found tremendous value in this work. The single critique is a useful minor adjustment, not the headline.",
      },
      id: {
        trigger: "Mendapat 19 review bintang lima dan 1 komentar sedikit mengkritik.",
        automaticThought: "Proyek ini memalukan. Orang-orang cuma fokus pada kelemahannya.",
        rationalAlternative: "95% tanggapan sangat mengapresiasi karya ini. Satu masukan adalah bahan perbaikan yang wajar, bukan cerminan kegagalan.",
      },
      de: {
        trigger: "19 begeisterte Rückmeldungen und ein einziger Verbesserungsvorschlag.",
        automaticThought: "Das Projekt war peinlich. Alle sehen nur den Makel.",
        rationalAlternative: "95 % der Menschen waren begeistert. Der eine Hinweis ist nützliches Feedback, kein Scheitern.",
      },
      fr: {
        trigger: "19 retours très positifs et une seule remarque mitigée.",
        automaticThought: "Tout le projet est raté, on ne retient que l'erreur.",
        rationalAlternative: "95 % des avis sont excellents. Une suggestion d'amélioration est normale et constructive.",
      },
      es: {
        trigger: "19 valoraciones excelentes y una sugerencia con matiz crítico.",
        automaticThought: "El proyecto fue un fracaso, solo se fijaron en el fallo.",
        rationalAlternative: "El 95% de la valoración es magnífica. Una sugerencia sirve para afinar detalles, no para invalidar el trabajo.",
      },
    },
    color: "#06B6D4",
  },
  fortune_telling: {
    id: "fortune_telling",
    badge: {
      en: "Crystal Ball Bias",
      id: "Bias Ramalan Bola Kristal",
      de: "Wahrsager-Falle",
      fr: "Prédiction d'échec",
      es: "Adivinación del futuro",
    },
    title: {
      en: "Fortune Telling (Arbitrary Prediction)",
      id: "Meramal Masa Depan Buruk (Fortune Telling)",
      de: "Zukunftsprophezeiung (Negatives Wahrsagen)",
      fr: "Prédiction Négative de l'Avenir",
      es: "Adivinación del Futuro (Predicción Catastrófica)",
    },
    tagline: {
      en: "Predicting that things will turn out terribly, and acting as if that prediction is fact.",
      id: "Meramalkan bahwa segala sesuatu akan berakhir buruk, lalu bersikap seolah ramalan itu pasti terbukti.",
      de: "Sicher voraussagen, dass alles schiefgehen wird, und dies als Tatsache behandeln.",
      fr: "Prédire avec certitude que tout va mal tourner et agir en conséquence.",
      es: "Predecir que todo saldrá mal y actuar como si esa predicción fuera un hecho consumado.",
    },
    definition: {
      en: "You predict a negative outcome before events unfold: 'I know I will choke during the interview, so there's no point in applying.' This creates self-fulfilling prophecies.",
      id: "Anda meramalkan kegagalan sebelum acara dimulai: 'Aku tahu wawancara ini pasti kacau, mending aku tidak usah hadir.' Pikiran ini menciptakan ramalan yang mewujud dengan sendirinya.",
      de: "Sie sagen einen Misserfolg voraus, noch bevor es losgeht: 'Das Vorstellungsgespräch verhaue ich sowieso.' So entstehen selbsterfüllende Prophezeiungen.",
      fr: "Vous annoncez l'échec par avance : 'Je sais que je vais bafouiller en entretien, à quoi bon essayer.' Cela crée une prophétie autoréalisatrice.",
      es: "Anticipa el fracaso antes de que ocurra: 'Seguro que me bloqueo en la entrevista, mejor ni lo intento.' Crea profecías autocumplidas.",
    },
    reframeFormula: {
      en: "Say: 'I cannot see the future. What are two constructive actions I can take right now to tilt the odds in my favor?'",
      id: "Ucapkan: 'Aku tidak bisa melihat masa depan. Tindakan nyata apa yang bisa kulakukan sekarang untuk meningkatkan peluang berhasil?'",
      de: "Erinnern Sie sich: 'Ich kann nicht in die Zukunft sehen. Welche zwei Schritte kann ich jetzt tun, um meine Chancen zu verbessern?'",
      fr: "Formule clé : 'Je ne connais pas l'avenir. Quelles actions concrètes puis-je poser dès maintenant pour maximiser mes chances ?'",
      es: "Pregúntese: 'No puedo prever el porvenir. ¿Qué dos acciones prácticas puedo tomar hoy para mejorar las probabilidades?'",
    },
    cbtThoughtRecord: {
      en: {
        trigger: "Invited to a networking event with unfamiliar people.",
        automaticThought: "I will be awkward, nobody will speak to me, and I'll stand in the corner alone.",
        rationalAlternative: "I have had great conversations before. If I ask curious questions, people will enjoy talking with me.",
      },
      id: {
        trigger: "Diundang ke acara kumpul profesional dengan orang-orang baru.",
        automaticThought: "Aku pasti canggung, tidak ada yang mau ngobrol denganku, dan aku akan terisolasi di sudut ruangan.",
        rationalAlternative: "Aku sudah sering ngobrol hangat sebelumnya. Jika aku mendengarkan dan bertanya dengan tulus, percakapan akan mengalir alami.",
      },
      de: {
        trigger: "Einladung zu einem Networking-Event mit Fremden.",
        automaticThought: "Ich werde mich blamieren und allein in der Ecke stehen.",
        rationalAlternative: "Ich kann gute Gespräche führen. Wenn ich ehrliches Interesse zeige, verbinden sich Menschen gern mit mir.",
      },
      fr: {
        trigger: "Invitation à un événement professionnel avec des inconnus.",
        automaticThought: "Je serai mal à l'aise, personne ne viendra me parler et je resterai seul(e) dans un coin.",
        rationalAlternative: "J'ai déjà noué des contacts chaleureux. En posant des questions sincères, l'échange se fera naturellement.",
      },
      es: {
        trigger: "Invitación a un encuentro profesional con desconocidos.",
        automaticThought: "Estaré incómodo, nadie querrá hablarme y me quedaré apartado en un rincón.",
        rationalAlternative: "He tenido conversaciones enriquecedoras en el pasado. Si escucho con interés, la charla fluirá con naturalidad.",
      },
    },
    color: "#10B981",
  },
  personalization: {
    id: "personalization",
    badge: {
      en: "Center of the Blame",
      id: "Pusat Kesalahan Dunia",
      de: "Personalisierungsfalle",
      fr: "Personnalisation excessive",
      es: "Personalización",
    },
    title: {
      en: "Personalization (Excessive Responsibility)",
      id: "Personalisasi (Menanggung Semua Kesalahan)",
      de: "Personalisierung (Übertriebene Verantwortung)",
      fr: "Personnalisation (Culpabilité Excessiva)",
      es: "Personalización (Responsabilidad Excesiva)",
    },
    tagline: {
      en: "Believing that other people's negative moods or unfortunate events are solely your fault.",
      id: "Meyakini bahwa suasana hati buruk orang lain atau kejadian sial adalah salah Anda seorang.",
      de: "Glauben, dass die schlechte Laune anderer oder unglückliche Umstände Ihre Schuld sind.",
      fr: "Se sentir personnellement responsable de la mauvaise humeur ou des problèmes des autres.",
      es: "Creer que el mal humor de los demás o los imprevistos son culpa suya exclusivamente.",
    },
    definition: {
      en: "You hold yourself personally accountable for events that aren't entirely under your control. When your partner is quiet, you wonder what you did wrong. When a client cancels, you assume you were incompetent.",
      id: "Menjadikan diri sendiri sebagai penyebab tunggal dari kejadian di luar kendali. Saat pasangan sedang diam, Anda merasa Anda yang berbuat salah. Saat klien membatalkan proyek, Anda merasa diri Anda tidak becus.",
      de: "Sie übernehmen die Alleinschuld für Dinge außerhalb Ihrer Kontrolle. Schweigt der Partner, suchen Sie den Fehler sofort bei sich.",
      fr: "Vous portez le poids d'événements hors de votre contrôle : si un collègue est d'humeur maussade, vous supposez que c'est de votre faute.",
      es: "Se atribuye la culpa exclusiva de sucesos ajenos a su control. Si su pareja está callada, asume que ha hecho algo mal.",
    },
    reframeFormula: {
      en: "Draw the Responsibility Pie: 'What other factors contributed to this outcome (their workload, health, traffic, sleep, economy)?'",
      id: "Gambarkan Diagram Tanggung Jawab: 'Faktor eksternal apa saja yang berperan (pekerjaan mereka, kurang tidur, macet, masalah keluarga)?'",
      de: "Zeichnen Sie den Verantwortungs-Kuchen: 'Welche anderen Faktoren spielen eine Rolle (Müdigkeit, Stress, Stau)?'",
      fr: "Le camembert des responsabilités : 'Quels autres facteurs entrent en jeu (leur charge de travail, fatigue, météo, imprévus) ?'",
      es: "Haga la tarta de la responsabilidad: '¿Qué otros factores externos han influido (su carga laboral, cansancio, tráfico)?'",
    },
    cbtThoughtRecord: {
      en: {
        trigger: "Partner comes home from work and speaks in short, monosyllabic words.",
        automaticThought: "I must have upset them. I ruin every peaceful evening.",
        rationalAlternative: "They had a grueling 9-hour day with difficult clients. Their exhaustion has nothing to do with my worth.",
      },
      id: {
        trigger: "Pasangan pulang kerja dengan wajah lelah dan menjawab sangat singkat.",
        automaticThought: "Aku pasti berbuat salah. Aku selalu merusak ketenangan rumah.",
        rationalAlternative: "Dia baru saja melewati 9 jam kerja berat dengan klien sulit. Kelelahannya tidak ada hubungannya denganku.",
      },
      de: {
        trigger: "Partner kommt wortkarg und erschöpft nach Hause.",
        automaticThought: "Ich habe ihn verärgert. Ich mache immer alles kaputt.",
        rationalAlternative: "Er hatte einen extrem anstrengenden Arbeitstag. Seine Erschöpfung hat nichts mit mir zu tun.",
      },
      fr: {
        trigger: "Mon conjoint rentre du travail silencieux et tendu.",
        automaticThought: "J'ai encore fait quelque chose de travers. Je gâche toutes les soirées.",
        rationalAlternative: "Il a passé une journée harassante avec des clients difficiles. Sa fatigue ne me concerne pas directement.",
      },
      es: {
        trigger: "Mi pareja llega a casa seria y responde con monosílabos.",
        automaticThought: "Seguro hice algo mal. Siempre estropeo las veladas tranquilas.",
        rationalAlternative: "Viene de un día agotador en la oficina. Su cansancio no es un reflejo de mi comportamiento.",
      },
    },
    color: "#14B8A6",
  },
  discounting_positive: {
    id: "discounting_positive",
    badge: {
      en: "It Doesn't Count Trap",
      id: "Jebakan 'Itu Cuma Kebetulan'",
      de: "Positive Entwertung",
      fr: "Disqualification du positif",
      es: "Descalificación de lo positivo",
    },
    title: {
      en: "Discounting the Positive",
      id: "Mengesampingkan Hal Positif (Discounting the Positive)",
      de: "Entwertung des Positiven",
      fr: "Dévalorisation des Réussites",
      es: "Descalificación de lo Positivo",
    },
    tagline: {
      en: "Rejecting positive experiences by insisting they 'don't count' or were pure luck.",
      id: "Menolak pencapaian sendiri dengan dalih 'cuma kebetulan' atau 'orang lain cuma bersikap sopan'.",
      de: "Eigene Erfolge abtun, als seien sie reiner Zufall oder reine Höflichkeit.",
      fr: "Rejeter les réussites en affirmant qu'elles ne comptent pas ou relèvent de la simple chance.",
      es: "Rechazar los logros propios insistiendo en que 'no cuentan' o fueron fruto de la suerte.",
    },
    definition: {
      en: "You reject positive experiences, compliments, or accomplishments by insisting they were flukes, luck, or people just being polite. This maintains an illusion of worthlessness.",
      id: "Anda menolak pujian atau keberhasilan dengan alasan keberuntungan semata. Cara berpikir ini membuat Anda terus merasa rendah diri meskipun banyak bukti keberhasilan.",
      de: "Sie spielen Erfolge herunter und behaupten, es sei nur Glück gewesen, wodurch das negative Selbstbild krampfhaft aufrechterhalten wird.",
      fr: "Vous minimisez vos victoires en les attribuant au hasard ou à la politesse des autres, maintenant ainsi un sentiment d'illégitimité.",
      es: "Minimiza sus logros atribuyéndolos a la casualidad o a la cortesía ajena, manteniendo viva la sensación de fraude.",
    },
    reframeFormula: {
      en: "Say: 'I accept this compliment with grace. If someone else achieved this, I would recognize their hard work. I deserve the same respect.'",
      id: "Ucapkan: 'Aku menerima apresiasi ini dengan rasa syukur. Jika orang lain yang mencapainya, aku akan memuji mereka. Aku pun layak mendapatkannya.'",
      de: "Sagen Sie: 'Ich nehme dieses Lob dankbar an. Bei anderen würde ich diese Leistung auch anerkennen.'",
      fr: "Affirmez : 'J'accepte ce compliment avec gratitude. Si un ami avait réussi cela, je saluerais son travail. Je mérite le même regard.'",
      es: "Dígase: 'Acepto este reconocimiento con gratitud. Si otra persona lo hubiera logrado, admiraría su esfuerzo. Yo merezco lo mismo.'",
    },
    cbtThoughtRecord: {
      en: {
        trigger: "Receiving praise from an executive for a successful product launch.",
        automaticThought: "They are just being nice. Anyone could have done it. I just got lucky with timing.",
        rationalAlternative: "I spent months planning, solving technical hurdles, and executing this. Luck played a part, but my effort was real.",
      },
      id: {
        trigger: "Mendapat pujian dari direksi atas peluncuran produk yang sukses.",
        automaticThought: "Mereka cuma basa-basi. Siapa pun bisa melakukannya. Aku cuma kebetulan hoki.",
        rationalAlternative: "Aku bekerja keras berbulan-bulan mengatasi berbagai kendala. Keberuntungan ada, tapi kontribusi nyataku tidak terbantahkan.",
      },
      de: {
        trigger: "Lob von der Geschäftsleitung für ein erfolgreiches Projekt.",
        automaticThought: "Das war nur Glück. Jeder andere hätte das genauso hinbekommen.",
        rationalAlternative: "Ich habe monatelang vollen Einsatz gezeigt und Hürden gemeistert. Mein Erfolg basiert auf solider Arbeit.",
      },
      fr: {
        trigger: "Félicitations de la direction pour la réussite d'un lancement.",
        automaticThought: "C'est juste de la politesse. N'importe qui aurait fait aussi bien. C'est un coup de chance.",
        rationalAlternative: "J'ai consacré des mois d'efforts et résolu des problèmes ardus. Le résultat récompense mon travail.",
      },
      es: {
        trigger: "Felicitaciones de la dirección por el éxito de un proyecto.",
        automaticThought: "Solo están siendo amables. Cualquiera lo habría hecho. Fue mera casualidad.",
        rationalAlternative: "Dediqué meses de trabajo y resolví problemas complejos. La suerte ayuda, pero mi esfuerzo fue determinante.",
      },
    },
    color: "#6366F1",
  },
  labeling: {
    id: "labeling",
    badge: {
      en: "Permanent Identity Stamp",
      id: "Stempel Identitas Permanen",
      de: "Etikettierungsfalle",
      fr: "Étiquetage destructeur",
      es: "Etiquetado global",
    },
    title: {
      en: "Labeling (Global Overgeneralization)",
      id: "Memberi Label Buruk pada Diri Sendiri (Labeling)",
      de: "Etikettierung (Globale Überverallgemeinerung)",
      fr: "Étiquetage (Généralisation Identitaire)",
      es: "Etiquetado (Sobregeneralización Global)",
    },
    tagline: {
      en: "Attaching an absolute, negative global identity to yourself based on a single specific error.",
      id: "Menempelkan stempel identitas buruk permanen pada diri sendiri akibat satu kesalahan spesifik.",
      de: "Sich selbst wegen eines einzelnen Fehlers ein vernichtendes Etikett wie 'Versager' anheften.",
      fr: "S'attribuer une étiquette négative globale et définitive à partir d'une simple maladresse ponctuelle.",
      es: "Adherirse una etiqueta negativa y permanente a partir de un único fallo puntual.",
    },
    definition: {
      en: "Instead of describing a specific behavior ('I made a mistake on that budget report'), you attach a definitive identity label to yourself: 'I am a born loser.' 'I am fundamentally defective.'",
      id: "Alih-alih menjelaskan perilaku yang bisa diperbaiki ('Saya lupa mengecek data keuangan'), Anda memberi stempel harga diri: 'Saya memang orang bodoh yang cacat.'",
      de: "Statt ein konkretes Verhalten zu beschreiben ('Ich habe einen Fehler in der Tabelle gemacht'), definieren Sie sich selbst als 'Versager'.",
      fr: "Au lieu de décrire une erreur circonstanciée ('J'ai mal calculé ce chiffre'), vous vous définissez entièrement : 'Je suis nul(le) et incapable.'",
      es: "En vez de describir un error concreto ('Me equivoqué en este informe'), se etiqueta de forma destructiva: 'Soy un fracasado.'",
    },
    reframeFormula: {
      en: "Separate Action from Identity: 'I made a mistake, but I am not a mistake. Behavior is mutable; human worth is unconditional.'",
      id: "Pisahkan Perilaku dari Identitas: 'Saya berbuat salah, tapi saya bukan manusia gagal. Kesalahan bisa diperbaiki; nilai diri tidak berkurang.'",
      de: "Trennen Sie Handlung und Identität: 'Ich habe einen Fehler gemacht, aber ich bin kein Versager. Verhalten kann man ändern.'",
      fr: "Distinguer l'acte de l'être : 'J'ai commis une erreur, mais je ne SUIS pas une erreur. Un comportement se corrige, la valeur humaine reste intacte.'",
      es: "Separe la acción de su identidad: 'Cometí un error, pero no SOY un error. Las conductas se corrigen; el valor humano no cambia.'",
    },
    cbtThoughtRecord: {
      en: {
        trigger: "Tripped or stumbled while presenting in a team sync.",
        automaticThought: "I am completely useless and pathetic. A total laughingstock.",
        rationalAlternative: "I slipped on a sentence because I was speaking quickly. It was a momentary human glitch that everyone forgets in 2 minutes.",
      },
      id: {
        trigger: "Keseleo lidah saat sedang presentasi di rapat tim.",
        automaticThought: "Aku orang yang benar-benar memalukan dan menyedihkan.",
        rationalAlternative: "Aku salah ucap karena berbicara terlalu cepat. Itu hal wajar yang dialami semua manusia dan dilupakan orang dalam 2 menit.",
      },
      de: {
        trigger: "Ein Versprecher während einer Team-Präsentation.",
        automaticThought: "Ich bin ein peinlicher Versager, über den alle lachen.",
        rationalAlternative: "Ich habe mich kurz verhaspelt. Ein menschlicher Ausrutscher, den jeder nach zwei Minuten vergessen hat.",
      },
      fr: {
        trigger: "Bafouiller pendant une présentation d'équipe.",
        automaticThought: "Je suis ridicule et pathétique, la risée de tout le bureau.",
        rationalAlternative: "J'ai fourché parce que je parlais vite. C'est un incident anodin que tout le monde oubliera en deux minutes.",
      },
      es: {
        trigger: "Trastabillar con las palabras en una reunión de equipo.",
        automaticThought: "Soy un desastre total, una vergüenza de persona.",
        rationalAlternative: "Me trabé porque hablaba deprisa. Es un despiste humano que todos olvidan a los dos minutos.",
      },
    },
    color: "#E11D48",
  },
};

export interface CbtOption {
  value: number;
  label: Record<CbtLang, string>;
}

export const CBT_OPTIONS: CbtOption[] = [
  {
    value: 0,
    label: {
      en: "Not at all like me (I would not think this)",
      id: "Sama sekali bukan saya (Saya tidak berpikir begini)",
      de: "Trifft gar nicht zu (So würde ich nicht denken)",
      fr: "Pas du tout moi (Je ne penserais pas cela)",
      es: "Para nada como yo (No pensaría esto)",
    },
  },
  {
    value: 1,
    label: {
      en: "Rarely / Slightly relates to me",
      id: "Jarang / Sedikit terlintas di pikiran saya",
      de: "Selten / Trifft ansatzweise zu",
      fr: "Rarement / Me traverse un peu l'esprit",
      es: "Rara vez / Se parece un poco a lo que pienso",
    },
  },
  {
    value: 2,
    label: {
      en: "Often / Very relatable response",
      id: "Sering / Cukup akurat menggambarkan reaksi saya",
      de: "Oft / Ziemlich treffende Reaktion",
      fr: "Souvent / Correspond bien à ma réaction habituelle",
      es: "A menudo / Describe bastante bien mi reacción",
    },
  },
  {
    value: 3,
    label: {
      en: "Exactly how my mind instinctively reacts",
      id: "Sangat mirip / Pikiran otomatis saya persis seperti ini",
      de: "Exakt so reagiert mein Gehirn automatisch",
      fr: "Exactement comme mon cerveau réagit par automatisme",
      es: "Exactamente como mi mente reacciona en automático",
    },
  },
];

export const CBT_SCENARIOS: CbtScenario[] = [
  {
    id: 1,
    distortion: "catastrophizing",
    scenario: {
      en: "You feel a sudden slight flutter in your chest while drinking your morning coffee.",
      id: "Anda merasakan sedikit detak jantung berdebar saat menyeruput kopi pagi.",
      de: "Sie spüren ein leichtes Herzklopfen beim morgendlichen Kaffee.",
      fr: "Vous ressentez un léger battement de cœur accéléré en buvant votre café.",
      es: "Siente un leve aleteo en el pecho mientras toma su café matutino.",
    },
    thought: {
      en: "'This is a heart attack. I'm going to collapse and nobody will save me.'",
      id: "'Ini pasti serangan jantung. Aku bakal pingsan dan tidak ada yang menolongku.'",
      de: "'Das ist ein Herzinfarkt. Ich werde umkippen und niemand hilft mir.'",
      fr: "'C'est une crise cardiaque. Je vais m'effondrer et personne ne sera là.'",
      es: "'Es un infarto. Me voy a desplomar y nadie podrá salvarme.'",
    },
  },
  {
    id: 2,
    distortion: "all_or_nothing",
    scenario: {
      en: "You practiced playing piano for 25 minutes instead of your target 30 minutes.",
      id: "Anda latihan piano selama 25 menit alih-alih target 30 menit penuh.",
      de: "Sie üben 25 Minuten Klavier statt der geplanten 30 Minuten.",
      fr: "Vous pratiquez le piano pendant 25 minutes au lieu des 30 prévues.",
      es: "Practica el piano durante 25 minutos en lugar de los 30 planeados.",
    },
    thought: {
      en: "'I broke the rule. The whole session was pointless and wasted.'",
      id: "'Aturanku rusak. Sesi latihan hari ini jadi sia-sia dan tidak berguna.'",
      de: "'Ich habe das Ziel verfehlt. Die ganze Übung war komplett umsonst.'",
      fr: "'J'ai échoué. La séance entière n'a servi à rien, autant abandonner.'",
      es: "'Rompí la meta. La sesión entera fue una pérdida de tiempo.'",
    },
  },
  {
    id: 3,
    distortion: "mind_reading",
    scenario: {
      en: "You share an idea in a meeting and a colleague looks down at their notebook without smiling.",
      id: "Anda menyampaikan ide dalam rapat dan seorang rekan menunduk mencatat tanpa tersenyum.",
      de: "Sie schlagen eine Idee vor und ein Kollege blickt wortlos in sein Notizbuch.",
      fr: "Vous proposez une idée en réunion et un collègue baisse la tête sur son carnet sans sourire.",
      es: "Propone una idea en una reunión y un compañero baja la mirada a su libreta sin sonreír.",
    },
    thought: {
      en: "'They think my idea is idiotic and they are judging my intelligence.'",
      id: "'Dia pasti menganggap ideku bodoh dan sedang meremehkan kemampuanku.'",
      de: "'Er hält meine Idee für dumm und zweifelt an meiner Kompetenz.'",
      fr: "'Il trouve mon idée ridicule et me prend pour un(e) incapable.'",
      es: "'Piensa que mi propuesta es absurda y está cuestionando mi capacidad.'",
    },
  },
  {
    id: 4,
    distortion: "emotional_reasoning",
    scenario: {
      en: "You wake up on Sunday morning feeling an inexplicable tightness and dread in your stomach.",
      id: "Anda bangun di hari Minggu dengan rasa sesak dan firasat cemas tak beralasan di perut.",
      de: "Sie wachen am Sonntag mit einem diffusen Gefühl von Beklemmung auf.",
      fr: "Vous vous réveillez le dimanche avec une boule d'angoisse inexpliquée dans le ventre.",
      es: "Despierta el domingo con una extraña opresión y desasosiego en el estómago.",
    },
    thought: {
      en: "'Because I feel this dread, something terrible is definitely about to happen today.'",
      id: "'Karena aku merasa gelisah seperti ini, pasti ada musibah buruk yang akan terjadi hari ini.'",
      de: "'Weil ich diese Angst spüre, wird heute ganz sicher etwas Schreckliches geschehen.'",
      fr: "'Si je ressens cette angoisse, c'est forcément qu'un drame va se produire aujourd'hui.'",
      es: "'Como siento esta angustia, es seguro que hoy va a ocurrir algo espantoso.'",
    },
  },
  {
    id: 5,
    distortion: "should_statements",
    scenario: {
      en: "You feel fatigued after working 10 hours straight and want to order takeout instead of cooking.",
      id: "Anda merasa sangat lelah setelah bekerja 10 jam dan ingin pesan makanan alih-alih memasak.",
      de: "Sie sind nach 10 Stunden Arbeit erschöpft und möchten Essen bestellen statt zu kochen.",
      fr: "Vous êtes épuisé(e) après 10h de travail et voulez commander à manger plutôt que cuisiner.",
      es: "Está agotado tras 10 horas de trabajo y prefiere pedir comida a domicilio en lugar de cocinar.",
    },
    thought: {
      en: "'I must cook every single meal from scratch. I should never take shortcuts.'",
      id: "'Aku harus memasak makananku sendiri dari awal. Aku mestinya tidak boleh mencari jalan pintas.'",
      de: "'Ich muss jeden Tag frisch kochen. Ich sollte niemals faul sein.'",
      fr: "'Je devrais cuisiner sainement tous les soirs. Il ne faut jamais céder à la facilité.'",
      es: "'Tengo que cocinar siempre comida casera. No debería recurrir a atajos.'",
    },
  },
  {
    id: 6,
    distortion: "mental_filter",
    scenario: {
      en: "Your annual performance review notes 8 stellar strengths and suggests 1 communication improvement.",
      id: "Evaluasi kerja tahunan Anda memuji 8 pencapaian gemilang dan memberi 1 masukan cara komunikasi.",
      de: "Ihre Jahresbeurteilung lobt 8 Stärken und enthält einen kleinen Verbesserungsvorschlag.",
      fr: "Votre bilan annuel énumère 8 grandes réussites et suggère 1 axe d'amélioration.",
      es: "Su evaluación anual destaca 8 fortalezas brillantes y propone 1 sugerencia de comunicación.",
    },
    thought: {
      en: "'I completely failed this year. That one flaw ruins my entire standing.'",
      id: "'Tahun ini aku gagal total. Satu kekurangan itu menghancurkan seluruh reputasiku.'",
      de: "'Ich habe dieses Jahr versagt. Dieser eine Kritikpunkt wiegt schwerer als alles andere.'",
      fr: "'Mon année est ratée. Cette unique remarque prouve que je ne fais pas l'affaire.'",
      es: "'He fracasado este año. Ese único comentario invalida todo mi trabajo.'",
    },
  },
  {
    id: 7,
    distortion: "fortune_telling",
    scenario: {
      en: "You are preparing to submit an application for an internal promotion.",
      id: "Anda sedang bersiap mengirimkan berkas lamaran untuk promosi jabatan internal.",
      de: "Sie bereiten Ihre Bewerbung für eine interne Beförderung vor.",
      fr: "Vous préparez votre candidature pour une promotion interne.",
      es: "Prepara su postulación para un ascenso dentro de la empresa.",
    },
    thought: {
      en: "'I already know they will pick someone else, so working on this cover letter is a waste.'",
      id: "'Aku sudah tahu mereka pasti pilih orang lain, jadi bikin surat lamaran ini buang-buang waktu saja.'",
      de: "'Ich weiß jetzt schon, dass sie jemand anderen nehmen. Die Bewerbung lohnt sich gar nicht.'",
      fr: "'Je sais d'avance qu'ils choisiront quelqu'un d'autre, inutile de peaufiner ma lettre.'",
      es: "'Sé de antemano que elegirán a otro, así que redactar esta carta es inútil.'",
    },
  },
  {
    id: 8,
    distortion: "personalization",
    scenario: {
      en: "Your friend cancels dinner plans at the last minute citing an unexpected work deadline.",
      id: "Sahabat Anda membatalkan janji makan malam di menit terakhir karena lembur mendadak.",
      de: "Ein Freund sagt das Abendessen kurzfristig wegen einer dringenden Arbeitsaufgabe ab.",
      fr: "Un ami annule le dîner au dernier moment à cause d'une urgence professionnelle.",
      es: "Un amigo cancela la cena a última hora por una entrega imprevista del trabajo.",
    },
    thought: {
      en: "'They just didn't want to see me. I must be boring or unappealing to hang out with.'",
      id: "'Dia cuma mencari alasan karena malas bertemu denganku. Aku pasti membosankan.'",
      de: "'Er wollte mich einfach nicht sehen. Ich bin bestimmt anstrengend oder langweilig.'",
      fr: "'Il ne voulait tout simplement pas me voir. Je dois être ennuyeux(se) à fréquenter.'",
      es: "'En realidad no quería verme. Seguro le parezco aburrido y poco interesante.'",
    },
  },
  {
    id: 9,
    distortion: "discounting_positive",
    scenario: {
      en: "A neighbor praises your garden and asks for tips on how you keep your plants so healthy.",
      id: "Tetangga memuji kebun tanaman Anda yang subur dan meminta tips merawatnya.",
      de: "Ein Nachbar lobt Ihren gepflegten Garten und bittet um Pflegetipps.",
      fr: "Un voisin admire votre jardin et vous demande des conseils de jardinage.",
      es: "Un vecino elogia su jardín y le pide consejos para cuidar las plantas.",
    },
    thought: {
      en: "'It's just dumb luck with rainfall. Anyone with soil could do it; I have no green thumb.'",
      id: "'Ini cuma kebetulan karena curah hujan bagus. Siapa pun bisa; aku tidak punya keahlian apa pun.'",
      de: "'Das war nur das gute Wetter. Jeder könnte das, ich habe eigentlich keinen grünen Daumen.'",
      fr: "'C'est juste un coup de chance avec la pluie. N'importe qui ferait pareil, je n'y suis pour rien.'",
      es: "'Fue pura suerte con las lluvias. Cualquiera lo haría; yo no tengo ningún talento para esto.'",
    },
  },
  {
    id: 10,
    distortion: "labeling",
    scenario: {
      en: "You misplace your car keys and spend 10 minutes searching your apartment.",
      id: "Anda lupa menaruh kunci mobil dan mencarinya selama 10 menit di dalam rumah.",
      de: "Sie verlegen Ihren Autoschlüssel und suchen 10 Minuten danach in der Wohnung.",
      fr: "Vous égarez vos clés de voiture et passez 10 minutes à les chercher dans l'appartement.",
      es: "Pierde de vista las llaves del coche y pasa 10 minutos buscándolas por la casa.",
    },
    thought: {
      en: "'I am a hopeless, incompetent idiot who can't handle basic adulthood.'",
      id: "'Aku memang orang bodoh yang tidak becus dan tidak mampu mengurus hal sepele.'",
      de: "'Ich bin ein hoffnungsloser Idiot, der sein Leben nicht im Griff hat.'",
      fr: "'Je suis un(e) incapable irrécupérable, je ne sais rien gérer dans la vie.'",
      es: "'Soy un completo inútil que no sabe ni llevar una vida adulta básica.'",
    },
  },
];

export interface CbtScoreResult {
  answersCount: number;
  dominantDistortion: DistortionType;
  profile: DistortionInfo;
  frequency: Record<DistortionType, number>;
  totalReactivityScore: number;
}

export function calculateCbtScore(answers: Record<number, number>): CbtScoreResult {
  const frequency: Record<DistortionType, number> = {
    catastrophizing: 0,
    all_or_nothing: 0,
    mind_reading: 0,
    emotional_reasoning: 0,
    should_statements: 0,
    mental_filter: 0,
    fortune_telling: 0,
    personalization: 0,
    discounting_positive: 0,
    labeling: 0,
  };

  let totalReactivityScore = 0;

  CBT_SCENARIOS.forEach((s) => {
    const val = answers[s.id] ?? 0; // 0: Not like me, 1: Slightly, 2: Pretty accurate, 3: Exactly how I think
    frequency[s.distortion] = val;
    totalReactivityScore += val;
  });

  // Find distortion with highest score
  let maxVal = -1;
  let dominant: DistortionType = "catastrophizing";

  (Object.keys(frequency) as DistortionType[]).forEach((d) => {
    if (frequency[d] > maxVal) {
      maxVal = frequency[d];
      dominant = d;
    }
  });

  return {
    answersCount: Object.keys(answers).length,
    dominantDistortion: dominant,
    profile: CBT_DISTORTIONS[dominant],
    frequency,
    totalReactivityScore,
  };
}
